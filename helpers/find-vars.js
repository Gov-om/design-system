const postcss = require('postcss');
const fs = require('fs');
const path = require('path');

// Function to extract variables from a CSS file
function extractVariables(cssFilePath) {
  const css = fs.readFileSync(cssFilePath, 'utf-8');
  const root = postcss.parse(css);
  const variables = new Set();
  const fallbackVariables = new Set();

  root.walkDecls(decl => {
    if (decl.prop.startsWith('--')) {
      variables.add(decl.prop);
    }

    // Check if the declaration value uses a variable
    const variableMatch = decl.value.match(/var\((--[^,)]+)(?:, ([^)]+))?\)/);
    if (variableMatch) {
      variables.add(variableMatch[1]);
      if (variableMatch[2]) {
        fallbackVariables.add(variableMatch[1]);
      }
    }
  });

  return { variables, fallbackVariables };
}

// Function to recursively get all CSS files in a directory
function getCssFiles(dirPath, arrayOfCssFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfCssFiles = getCssFiles(dirPath + "/" + file, arrayOfCssFiles);
    } else if (file.endsWith('.css')) {
      arrayOfCssFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfCssFiles;
}

// Extract variables from main CSS files
const mainCssFiles = [
  '../packages/components/src/styles/variables/colors.css',
  '../packages/components/src/styles/variables/typography.css',
  '../packages/components/src/styles/styles.css',
  '../packages/tokens/src/variables/color.css',
  '../packages/tokens/src/variables/float.css'
];

const mainVariables = {};

mainCssFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const relativePath = path.relative(__dirname, filePath);
  const { variables: fileVariables } = extractVariables(filePath);
  mainVariables[relativePath] = [...fileVariables];
});

// Extract variables from component CSS files
const componentsDir = path.join(__dirname, '../packages/components/src/components/');
const componentFiles = getCssFiles(componentsDir);
const componentVariables = {};
const fallbackVariables = {};

componentFiles.forEach(filePath => {
  const relativePath = path.relative(__dirname, filePath);
  const { variables: fileVariables, fallbackVariables: fileFallbackVariables } = extractVariables(filePath);
  componentVariables[relativePath] = [...fileVariables];
  fallbackVariables[relativePath] = [...fileFallbackVariables];
});

const undefinedVariables = {};

Object.entries(componentVariables).forEach(([filePath, variables]) => {
  undefinedVariables[filePath] = variables.filter(variable => {
    return !Object.values(mainVariables).flat().includes(variable) &&
      (variable.startsWith('--gup') || variable.startsWith('--color') || variable.startsWith('--typography') || variable.startsWith('--line')) &&
      !variable.includes('--', 2); // Exclude variables with a double dash in their name
  });
});

// Find variables that are defined in main CSS files but not used in components
const unusedVariables = {};

Object.entries(mainVariables).forEach(([filePath, variables]) => {
  unusedVariables[filePath] = variables.filter(variable => !Object.values(componentVariables).flat().includes(variable));
});

// Write the lists to a new JSON file
const output = [
  { name: 'undefinedVariables', data: undefinedVariables },
  { name: 'unusedVariables', data: unusedVariables },
  { name: 'fallbackVariables', data: fallbackVariables }
];

fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(output, null, 2));
console.log('Done! Check output.json for results.');