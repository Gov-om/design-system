require('dotenv').config({ path: '.env' });
const fs = require('fs');

const personalAccessToken = process.env.FIGMA_API_TOKEN;
const fileKey = 'HcttwLakjPoIwdDskncUcE';
const url = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
const options = {
  headers: {
    'X-Figma-Token': personalAccessToken,
  },
};
async function fetchFigmaVariables() {
  try {
    const response = await fetch(url, options);
    const variables = await response.json();
    fs.writeFile('./utils/figma-variables.json', JSON.stringify(variables, null, 2), (err) => {
      if (err) {
        console.error('Error writing file: ', err);
      } else {
        console.log('Figma variables fetched and written to figma-variables.json successfully!');
      }
    });
  } catch (error) {
    console.error(`Error fetching Figma variables: ${error}`);
  }
}
fetchFigmaVariables();
