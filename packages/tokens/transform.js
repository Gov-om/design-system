const fs = require('fs');
const path = require('path');

const inputData = require('./utils/figma-variables.json');
const outputDirectory = './src/transformed-tokens';

const getResolvedValue = (variableId, modeId) => {
  let variable = inputData.meta.variables[variableId];

  if (!variable) {
    console.error(`No variable found with id ${variableId}`);
    return null;
  }

  let modeValue = variable.valuesByMode && variable.valuesByMode[modeId];

  if (!modeValue) {
    const { defaultModeId } = inputData.meta.variableCollections[variable.variableCollectionId];
    modeValue = variable.valuesByMode && variable.valuesByMode[defaultModeId];
  }

  if (modeValue && modeValue.type === 'VARIABLE_ALIAS') {
    return getResolvedValue(modeValue.id, modeId);
  }

  return modeValue;
};

const transformFigmaVariables = async () => {
  if (!inputData.meta.variables) {
    console.log('Wrong data structure in figma-variables.json. Exiting...');
    return;
  }

  const transformedData = {};

  Object.values(inputData.meta.variables).forEach((variable) => {
    const { name, variableCollectionId, resolvedType } = variable;

    if (!name.startsWith('gup')) {
      return;
    }

    Object.values(inputData.meta.variableCollections[variableCollectionId].modes).forEach((mode) => {
      const { id: modeId, name: modeName } = mode;
      const modeValue = getResolvedValue(variable.id, modeId);

      if (modeValue === null) {
        return;
      }

      if (!transformedData[modeName]) {
        transformedData[modeName] = {};
      }

      if (!transformedData[modeName][resolvedType]) {
        transformedData[modeName][resolvedType] = {};
      }

      transformedData[modeName][resolvedType][name.toLowerCase()] = {
        value: modeValue,
      };
    });
  });

  await Promise.all(
    Object.entries(transformedData).map(async ([modeName, modeData]) => {
      await Promise.all(
        Object.entries(modeData).map(async ([resolvedType, data]) => {
          const resolvedTypeTitle = resolvedType.toLowerCase();
          const outputFilePath = path.join(outputDirectory, `${resolvedTypeTitle}.json`);
          fs.writeFile(
            outputFilePath,
            JSON.stringify(
              {
                [resolvedTypeTitle]: { ...data },
              },
              null,
              2
            ),
            (err) => {
              if (err) throw err;
              console.log(`${resolvedTypeTitle}.json file has been updated!`);
            }
          );
        })
      );
    })
  );
};

transformFigmaVariables();
