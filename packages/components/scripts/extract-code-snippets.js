import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function extractCodeFromDocs() {
  try {
    const storybookStatic = path.join(__dirname, '../storybook-static');
    const indexPath = path.join(storybookStatic, 'index.json');
    const outputPath = path.join(storybookStatic, 'code-snippets.json');

    if (!fs.existsSync(indexPath)) {
      console.error('index.json not found. Run `npm run build-storybook` first.');
      process.exit(1);
    }

    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const stories = index.entries || {};

    const storiesToProcess = Object.entries(stories).filter(([, story]) => story.type === 'story');

    console.log(`Processing ${storiesToProcess.length} stories...`);

    const codeSnippets = {};
    let successCount = 0;
    let fallbackCount = 0;

    for (const [id, story] of storiesToProcess) {
      try {
        let htmlSnippet = extractFromStoryParameters(story);

        if (!htmlSnippet) {
          htmlSnippet = await extractFromStoryFile(story);
        }

        if (!htmlSnippet) {
          htmlSnippet = generateFromArgs(story);
          fallbackCount++;
        } else {
          successCount++;
        }

        htmlSnippet = cleanupExtractedHtml(htmlSnippet);
        codeSnippets[id] = htmlSnippet;
      } catch (error) {
        console.warn(`Error processing story ${id}:`, error.message);
        codeSnippets[id] = generateFromArgs(story);
        fallbackCount++;
      }
    }

    const docSnippets = await extractFromDocumentationFiles();
    const docSnippetCount = Object.keys(docSnippets).length;

    Object.assign(codeSnippets, docSnippets);

    fs.writeFileSync(outputPath, JSON.stringify(codeSnippets, null, 2));
    console.log(`\n✓ Generated code snippets for ${Object.keys(codeSnippets).length} stories`);
    console.log(`  - Extracted from source: ${successCount}`);
    console.log(`  - Generated from args: ${fallbackCount}`);
    console.log(`  - Extracted from documentation: ${docSnippetCount}`);
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

function extractFromStoryParameters(story) {
  if (story.parameters?.docs?.source?.code) {
    return story.parameters.docs.source.code;
  }
  return null;
}

async function extractFromStoryFile(story) {
  try {
    if (!story.importPath) return null;

    const storyFilePath = path.join(__dirname, '..', story.importPath.replace('./src/', 'src/'));

    if (!fs.existsSync(storyFilePath)) {
      return null;
    }

    const storyContent = fs.readFileSync(storyFilePath, 'utf8');
    const storyName = story.name.replace(/\s+/g, '');

    const helperMatch = storyContent.match(/getWcStorybookHelpers\(['"`]([^'"`]+)['"`]\)/);
    const componentTag = helperMatch ? helperMatch[1] : null;

    if (!componentTag) {
      return null;
    }

    const storyArgs = extractStoryArgs(storyContent, storyName);

    const defaultArgs = extractDefaultArgs(storyContent);

    const allArgs = { ...defaultArgs, ...storyArgs };

    const hasCustomRender = hasCustomRenderFunction(storyContent, storyName);

    if (hasCustomRender) {
      const customHtml = extractFromCustomRender(storyContent, storyName, componentTag, allArgs);
      if (customHtml) return customHtml;
    }

    return generateHtmlFromArgs(componentTag, allArgs);
  } catch (error) {
    console.warn(`Error extracting from story file: ${error.message}`);
    return null;
  }
}

function extractDefaultArgs(storyContent) {
  const args = {};

  try {
    const defaultArgsMatch = storyContent.match(/export\s+default\s*{[^}]*args:\s*{([^}]+)}/s);
    if (defaultArgsMatch) {
      parseArgsFromBlock(defaultArgsMatch[1], args);
    }
  } catch {
    // fail
  }

  return args;
}

function extractStoryArgs(storyContent, storyName) {
  const args = {};

  try {
    const storyArgsPattern = new RegExp(`export\\s+const\\s+${storyName}[^{]*{[^}]*args:\\s*{([^}]+)}`, 's');
    const argsMatch = storyContent.match(storyArgsPattern);

    if (argsMatch) {
      parseArgsFromBlock(argsMatch[1], args);
    }

    const assignmentPattern = new RegExp(`${storyName}\\.args\\s*=\\s*{([^}]+)}`, 's');
    const assignmentMatch = storyContent.match(assignmentPattern);

    if (assignmentMatch) {
      parseArgsFromBlock(assignmentMatch[1], args);
    }
  } catch {
    // fail
  }

  return args;
}

function parseArgsFromBlock(argsBlock, args) {
  argsBlock = argsBlock.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');

  const patterns = [/['"]([^'"]+)['"]\s*:\s*['"]([^'"]*)['"]/g, /(\w+)\s*:\s*['"]([^'"]*)['"]/g, /(\w+)\s*:\s*(true|false|\d+)/g];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(argsBlock)) !== null) {
      const key = match[1];
      const value = match[2];

      if (value === 'true') args[key] = true;
      else if (value === 'false') args[key] = false;
      else if (!isNaN(value)) args[key] = Number(value);
      else args[key] = value;
    }
  }
}

function hasCustomRenderFunction(storyContent, storyName) {
  const renderPattern = new RegExp(`export\\s+const\\s+${storyName}[^{]*{[^}]*render:`, 's');
  return renderPattern.test(storyContent);
}

function extractFromCustomRender(storyContent, storyName, componentTag, args) {
  try {
    const renderPattern = new RegExp(`export\\s+const\\s+${storyName}[^{]*{[^}]*render:\\s*\\([^)]*\\)\\s*=>\\s*([\\s\\S]*?)(?=}\\s*;|$)`, 's');
    const renderMatch = storyContent.match(renderPattern);

    if (!renderMatch) return null;

    const renderBody = renderMatch[1];

    if (renderBody.trim().match(/^template\s*\(\s*args\s*\)\s*,?$/)) {
      return generateHtmlFromArgs(componentTag, args);
    }

    const templateWithSlotsMatch = renderBody.match(/template\s*\(\s*args\s*,\s*html`([^`]*)`\s*\)/s);
    if (templateWithSlotsMatch) {
      const slotContent = templateWithSlotsMatch[1];
      return generateHtmlWithSlots(componentTag, args, slotContent);
    }

    const wrappedMatch = renderBody.match(/html`([^`]*)\$\{template\s*\(\s*args(?:\s*,\s*html`([^`]*)`\s*)?\)\}([^`]*)`/s);
    if (wrappedMatch) {
      const slotContent = wrappedMatch[2] || '';
      const componentHtml = generateHtmlWithSlots(componentTag, args, slotContent);

      return componentHtml;
    }

    return null;
  } catch {
    return null;
  }
}

function generateHtmlFromArgs(componentTag, args) {
  const attributes = [];
  let defaultSlot = '';
  const slots = {};

  for (const [key, value] of Object.entries(args)) {
    if (key === 'default-slot') {
      defaultSlot = value;
      continue;
    }

    if (key.endsWith('-slot')) {
      const slotName = key.replace('-slot', '');
      slots[slotName] = value;
      continue;
    }

    if (key.startsWith('--') || key === 'data-story-id') {
      continue;
    }

    if (typeof value === 'boolean') {
      if (value) {
        attributes.push(key);
      }
      continue;
    }

    if (value !== undefined && value !== null && value !== '') {
      const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      attributes.push(`${attrName}="${value}"`);
    }
  }

  const attrString = attributes.length > 0 ? ' ' + attributes.join(' ') : '';
  const slotHtml = Object.entries(slots)
    .map(([name, content]) => `\n  <gup-icon slot="${name}" icon-name="${content}" height="24" width="24"></gup-icon>`)
    .join('');

  if (defaultSlot || slotHtml) {
    const content = defaultSlot ? `\n  ${defaultSlot}` : '';
    return `<${componentTag}${attrString}>${content}${slotHtml}\n</${componentTag}>`;
  } else {
    return `<${componentTag}${attrString}></${componentTag}>`;
  }
}

function generateHtmlWithSlots(componentTag, args, slotContent) {
  const attributes = [];
  let defaultSlot = '';
  const additionalSlots = [];

  for (const [key, value] of Object.entries(args)) {
    if (key === 'default-slot') {
      defaultSlot = value;
      continue;
    }

    if (key.startsWith('--') || key === 'data-story-id') {
      continue;
    }

    if (typeof value === 'boolean') {
      if (value) {
        attributes.push(key);
      }
      continue;
    }

    if (value !== undefined && value !== null && value !== '') {
      const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      attributes.push(`${attrName}="${value}"`);
    }
  }

  if (slotContent) {
    const slotMatches = slotContent.matchAll(/<gup-icon[^>]*slot="([^"]*)"[^>]*>/g);
    for (const match of slotMatches) {
      const fullTag = match[0];
      const slotName = match[1];

      const iconNameMatch = fullTag.match(/icon-name="([^"]*)"/);
      const iconName = iconNameMatch ? iconNameMatch[1] : 'add';

      additionalSlots.push(`\n  <gup-icon slot="${slotName}" icon-name="${iconName}" height="24" width="24"></gup-icon>`);
    }
  }

  const attrString = attributes.length > 0 ? ' ' + attributes.join(' ') : '';
  const content = defaultSlot ? `\n  ${defaultSlot}` : '';
  const slotsHtml = additionalSlots.join('');

  if (content || slotsHtml) {
    return `<${componentTag}${attrString}>${content}${slotsHtml}\n</${componentTag}>`;
  } else {
    return `<${componentTag}${attrString}></${componentTag}>`;
  }
}

function generateFromArgs(story) {
  const parts = story.title.split('/');
  const componentName = parts[parts.length - 1];

  const kebabName = componentName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/\s+/g, '-');

  const componentTag = `gup-${kebabName}`;

  const args = {};
  const storyName = story.name.toLowerCase();

  if (storyName.includes('secondary')) args.appearance = 'secondary';
  else if (storyName.includes('primary')) args.appearance = 'primary';
  else if (storyName.includes('danger')) args.appearance = 'danger';
  else if (storyName.includes('text')) args.appearance = 'text';

  if (storyName.includes('disabled')) args.disabled = true;
  if (storyName.includes('required')) args.required = true;
  if (storyName.includes('inverted')) args.inverted = true;

  if (kebabName.includes('button')) {
    args['default-slot'] = 'I am a button';
  }

  if (kebabName.includes('avatar')) {
    if (!storyName.includes('no') && !storyName.includes('without')) {
      args.label = 'User Name';
    }
    if (storyName.includes('status')) {
      args.status = 'online';
    }
    if (storyName.includes('picture')) {
      args.src = 'https://via.placeholder.com/150';
    }
    if (storyName.includes('small')) args.size = 'small';
    else if (storyName.includes('medium')) args.size = 'medium';
    else if (storyName.includes('large')) args.size = 'large';
  }

  if (kebabName.match(/input|field|textarea|select|dropdown/)) {
    args.label = 'Label';
    args.name = 'field';
  }

  return generateHtmlFromArgs(componentTag, args);
}

function cleanupExtractedHtml(html) {
  if (!html) return html;
  html = html.replace(/\s*data-story-id="[^"]*"/g, '');
  html = html.replace(/<storybook-comment>[\s\S]*?<\/storybook-comment>/gi, '');
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  html = html.replace(/\n\s*\n+/g, '\n').trim();

  return html;
}

async function extractFromDocumentationFiles() {
  const documentationDir = path.join(__dirname, '../src/stories/documentation');
  const snippets = {};

  try {
    const mdxFiles = await glob('**/*.mdx', { cwd: documentationDir });

    for (const file of mdxFiles) {
      const filePath = path.join(documentationDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      const fileSnippets = extractCodeBlocksFromMdx(content);
      Object.assign(snippets, fileSnippets);
    }
  } catch (error) {
    console.warn('Error extracting from documentation files:', error.message);
  }

  return snippets;
}

function extractCodeBlocksFromMdx(content) {
  const snippets = {};

  const metaTitleMatch = content.match(/<Meta\s+title=["']([^"']+)["']\s*\/?>/);
  if (!metaTitleMatch) {
    return snippets;
  }

  const mainTitle = metaTitleMatch[1];
  const baseId = mainTitle
    .toLowerCase()
    .replace(/[\s\u2013\u2014]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const lines = content.split('\n');
  let currentSection = '';
  let codeBlockBuffer = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockIndex = 0;

  for (const line of lines) {
    const normalizedLine = line.replace(/\r$/, '');

    const headingMatch = normalizedLine.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch && !inCodeBlock) {
      currentSection = headingMatch[1]
        .toLowerCase()
        .replace(/[\s\u2013\u2014]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      codeBlockIndex = 0;
      continue;
    }

    const codeBlockStartMatch = normalizedLine.match(/^\s*```(\w*)$/);
    if (codeBlockStartMatch && !inCodeBlock) {
      inCodeBlock = true;
      codeBlockLang = codeBlockStartMatch[1] || 'text';
      codeBlockBuffer = [];
      continue;
    }

    if (normalizedLine.trim() === '```' && inCodeBlock) {
      inCodeBlock = false;

      const sectionPart = currentSection ? `/${currentSection}` : '';
      const langPart = codeBlockLang ? `/${codeBlockLang}` : '';
      const indexPart = codeBlockIndex > 0 ? `-${codeBlockIndex}` : '';
      const snippetId = `docs/${baseId}${sectionPart}${langPart}${indexPart}`;

      snippets[snippetId] = codeBlockBuffer.join('\n');
      codeBlockIndex++;
      continue;
    }

    if (inCodeBlock) {
      codeBlockBuffer.push(normalizedLine);
    }
  }

  return snippets;
}

extractCodeFromDocs().catch((error) => {
  console.error('Script execution failed:', error);
  process.exit(1);
});
