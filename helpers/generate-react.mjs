import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getComponentsMetaCEM } from '../packages/components/.storybook/get-components-meta-cem.js';
//const { inspect } = require('util')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reactDir = path.join(__dirname, '../packages/react/src');

const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

// Clear build directory
if (fs.existsSync(reactDir)) {
  fs.rmSync(reactDir, { recursive: true });
}
fs.mkdirSync(reactDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join('packages/components/custom-elements.json'), 'utf8'));
const components = getComponentsMetaCEM(metadata);
const filteredComponents = components.filter((component) => component.tagName).filter((component) => component.tagName.indexOf('icon') === -1);
const index = [];
const indexImportTypes = [];
const indexExportTypes = [];
let i = 0;

for (const component of filteredComponents) {
  const tagWithoutPrefix = component.tagName.replace(/^gup-/, '');
  const componentDir = path.join(reactDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const events = (component.events || [])
    .map((event) => {
      return `on${camelize(event.name).replace(/^gup/, '')}: '${event.name}'`;
    })
    .join(',\n');

  fs.mkdirSync(componentDir, { recursive: true });

  const jsDoc = component.jsDoc || '';

  const formattedSource = `import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { ${component.name} } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';

${jsDoc}
const reactWrapper: ReactWebComponent<${component.name}> = createComponent({
  tagName: '${component.tagName}',
  elementClass: ${component.name} as unknown as Constructor<LitElement>,
  react: React,
  events: {
    ${events}
  },
  displayName: '${component.name}'
})

export default reactWrapper;
`;
  index.push(`export { default as ${component.name} } from './${tagWithoutPrefix}';`);
  indexImportTypes.push(`${component.name} as ${component.name}Component`);
  indexExportTypes.push(`export const ${component.name}: ReactWebComponent<${component.name}Component>;`);

  try {
    fs.writeFileSync(componentFile, formattedSource, 'utf8');
  } catch (error) {
    console.error(`Failed to write component file ${componentFile}:`, error);
  }

  i++;

  if (i === filteredComponents.length) {
    fs.writeFileSync(path.join(reactDir, 'index.js'), index.join('\n'), 'utf8');
    fs.writeFileSync(path.join(reactDir, 'index.d.ts'), `import type { ReactWebComponent } from '../utils/lit-react-type-utils';
import {\n  ${indexImportTypes.join(',\n  ')}\n} from '@govom/components';

declare module '@govom/react' {
  ${indexExportTypes.join('\n  ')}
}\n`, 'utf8');
  }
}
