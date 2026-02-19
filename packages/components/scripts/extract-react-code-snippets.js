import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const componentNameMap = {};

const eventMappings = {};

async function loadReactWrappers() {
  const reactSrcPath = path.join(__dirname, '../../react/src');

  if (!fs.existsSync(reactSrcPath)) {
    console.warn('React package not found at', reactSrcPath);
    return;
  }

  const indexJsPath = path.join(reactSrcPath, 'index.js');
  if (!fs.existsSync(indexJsPath)) {
    console.warn('React index.js not found');
    return;
  }

  const indexContent = fs.readFileSync(indexJsPath, 'utf8');

  const exportMatches = indexContent.matchAll(/export\s*{\s*default\s+as\s+(\w+)\s*}\s*from\s*'\.\/([^']+)'/g);

  for (const match of exportMatches) {
    const reactName = match[1];
    const folderName = match[2];

    const wrapperPath = path.join(reactSrcPath, folderName, 'index.ts');
    if (fs.existsSync(wrapperPath)) {
      const wrapperContent = fs.readFileSync(wrapperPath, 'utf8');

      const tagMatch = wrapperContent.match(/tagName:\s*['"]([^'"]+)['"]/);
      if (tagMatch) {
        const tagName = tagMatch[1];
        componentNameMap[tagName] = reactName;

        const eventsMatch = wrapperContent.match(/events:\s*{([^}]*)}/s);
        if (eventsMatch) {
          const eventsBlock = eventsMatch[1];
          const eventPairs = eventsBlock.matchAll(/(\w+):\s*['"]([^'"]+)['"]/g);
          eventMappings[tagName] = {};
          for (const eventPair of eventPairs) {
            const reactEvent = eventPair[1];
            const gupEvent = eventPair[2];
            eventMappings[tagName][gupEvent] = reactEvent;
          }
        }
      }
    }
  }

  console.log(`Loaded ${Object.keys(componentNameMap).length} React component mappings`);
}

function convertHtmlToReact(htmlSnippet) {
  if (!htmlSnippet) return null;

  let jsx = htmlSnippet;

  const usedComponents = new Set();

  let hasIcons = false;
  const usedIcons = new Set();

  // Convert gup-icon to React SVG icon pattern
  const gupIconPattern = /<gup-icon\s+((?:[a-z-]+="[^"]*"\s*)+)(?:\/>|><\/gup-icon>)/gi;
  jsx = jsx.replace(gupIconPattern, (_, attrs) => {
    return convertGupIconToReact(attrs, usedIcons);
  });

  if (usedIcons.size > 0) {
    hasIcons = true;
  }

  jsx = jsx.replace(/<(gup-[\w-]+)([^>]*?)>/gi, (match, tagName, attrs) => {
    const reactName = componentNameMap[tagName];
    if (!reactName) {
      return match;
    }

    usedComponents.add(reactName);
    let convertedAttrs = convertAttributesForJsx(attrs);

    return `<${reactName}${convertedAttrs}>`;
  });

  jsx = jsx.replace(/<\/(gup-[\w-]+)>/gi, (match, tagName) => {
    const reactName = componentNameMap[tagName];
    if (!reactName) {
      return match;
    }
    return `</${reactName}>`;
  });

  jsx = jsx.replace(/<(gup-[\w-]+)([^>]*?)\/>/gi, (match, tagName, attrs) => {
    const reactName = componentNameMap[tagName];
    if (!reactName) {
      return match;
    }

    usedComponents.add(reactName);
    let convertedAttrs = convertAttributesForJsx(attrs);
    return `<${reactName}${convertedAttrs} />`;
  });

  const imports = [];

  if (usedComponents.size > 0) {
    imports.push(`import { ${Array.from(usedComponents).sort().join(', ')} } from '@gup-ds/react';`);
  }

  if (hasIcons && usedIcons.size > 0) {
    const iconImports = Array.from(usedIcons)
      .sort()
      .map((icon) => icon.componentName)
      .join(', ');
    imports.push(`// Icons: import from @material-design-icons/svg or use vite-plugin-svgr`);
    imports.push(`// import { ${iconImports} } from '@material-design-icons/svg/filled';`);
  }

  if (imports.length > 0) {
    jsx = imports.join('\n') + '\n\n' + jsx;
  }

  return jsx;
}

function convertGupIconToReact(attrs, usedIcons) {
  const iconNameMatch = attrs.match(/icon-name="([^"]*)"/);
  if (!iconNameMatch) {
    return '{/* Icon */}';
  }

  const iconName = iconNameMatch[1];

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/i.test(iconName)) {
    return '{/* Icon */}';
  }

  const componentName =
    iconName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('') + 'Icon';

  usedIcons.add({ iconName, componentName });

  const slotMatch = attrs.match(/slot="([^"]*)"/);
  const heightMatch = attrs.match(/height="([^"]*)"/);
  const widthMatch = attrs.match(/width="([^"]*)"/);

  let reactAttrs = [];

  if (slotMatch) {
    reactAttrs.push(`slot="${slotMatch[1]}"`);
  }

  const styles = [];
  if (heightMatch) {
    styles.push(`height: ${heightMatch[1]}`);
  }
  if (widthMatch) {
    styles.push(`width: ${widthMatch[1]}`);
  }

  if (styles.length > 0) {
    reactAttrs.push(`style={{ ${styles.join(', ')} }}`);
  }

  const attrsString = reactAttrs.length > 0 ? ' ' + reactAttrs.join(' ') : '';

  return `<${componentName}${attrsString} />`;
}

function convertAttributesForJsx(attrs) {
  if (!attrs || attrs.trim() === '') return '';

  let result = attrs;

  // Handle class -> className (standard JSX requirement)
  result = result.replace(/\sclass="/g, ' className="');

  // Handle for -> htmlFor (standard JSX requirement)
  result = result.replace(/\sfor="/g, ' htmlFor="');

  return result;
}

async function extractReactCodeSnippets() {
  try {
    const storybookStatic = path.join(__dirname, '../storybook-static');
    const htmlSnippetsPath = path.join(storybookStatic, 'code-snippets.json');
    const outputPath = path.join(storybookStatic, 'react-code-snippets.json');

    if (!fs.existsSync(htmlSnippetsPath)) {
      console.error('code-snippets.json not found. Run `npm run extract-code` first.');
      process.exit(1);
    }

    await loadReactWrappers();

    const htmlSnippets = JSON.parse(fs.readFileSync(htmlSnippetsPath, 'utf8'));

    console.log(`Converting ${Object.keys(htmlSnippets).length} HTML snippets to React...`);

    const reactSnippets = {};
    let successCount = 0;
    let skippedCount = 0;

    for (const [storyId, htmlSnippet] of Object.entries(htmlSnippets)) {
      try {
        const reactSnippet = convertHtmlToReact(htmlSnippet);
        if (reactSnippet) {
          reactSnippets[storyId] = reactSnippet;
          successCount++;
        } else {
          skippedCount++;
        }
      } catch (error) {
        console.warn(`Error converting story ${storyId}:`, error.message);
        skippedCount++;
      }
    }

    fs.writeFileSync(outputPath, JSON.stringify(reactSnippets, null, 2));
    console.log(`\n✓ Generated React code snippets for ${successCount} stories`);
    console.log(`  - Skipped: ${skippedCount}`);
    console.log(`  - Output: ${outputPath}`);
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

extractReactCodeSnippets().catch((error) => {
  console.error('Script execution failed:', error);
  process.exit(1);
});
