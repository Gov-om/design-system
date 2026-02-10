const svgToTsConfig = {
  conversionType: 'files',
  // svg-to-ts fails when svg file name starts from number, so we exclude those
  srcFiles: ['../../node_modules/@material-design-icons/svg/filled/!([1234567890])*.svg', './custom/**/*.svg'],
  outputDirectory: './dist',
  interfaceName: 'GupIcon',
  typeName: 'GupIconName',
  prefix: 'gup',
  optimizeForLazyLoading: true,
  modelFileName: 'icons.model',
  delimiter: 'KEBAB',
  compileSources: true,
  exportCompleteIconSet: true,
  completeIconSetName: 'icons',
  enumName: 'GupIconNames',
  generateEnum: true,
  generateType: true,
  // see https://github.com/svg/svgo/issues/1141
  svgoConfig: {
    plugins: ['removeDimensions',
      {
        name: 'removeAttrs',
        params: {
          attrs: ['aria-label'],
        },
      }
    ],
  },
};

const svgToTsConfigFlagsCircle = {
  ...svgToTsConfig,
  srcFiles: ['../../node_modules/flag-icons/flags/1x1/!([1234567890])*.svg'],
  outputDirectory: './dist/flags/circle',
  interfaceName: 'GupFlagCircle',
  typeName: 'GupFlagCircleName',
  modelFileName: 'flags.circle.model',
  completeIconSetName: 'flagsCircle',
  enumName: 'GupFlagCircleNames',
  svgoConfig: {
    plugins: [
      'removeDimensions',
      {
        name: 'removeAttrs',
        params: {
          attrs: ['aria-label'],
        },
      },
    ],
  },
};

const svgToTsConfigFlagsRectangle = {
  ...svgToTsConfig,
  srcFiles: ['../../node_modules/flag-icons/flags/4x3/!([1234567890])*.svg'],
  outputDirectory: './dist/flags/rectangle',
  interfaceName: 'GupFlagRectangle',
  typeName: 'GupFlagRectangleName',
  modelFileName: 'flags.rectangle.model',
  completeIconSetName: 'flagsRectangle',
  enumName: 'GupFlagRectangleNames',
  svgoConfig: {
    plugins: [
      'removeDimensions',
      {
        name: 'removeAttrs',
        params: {
          attrs: ['aria-label'],
        },
      },
    ],
  },
};

module.exports = [svgToTsConfig, svgToTsConfigFlagsRectangle, svgToTsConfigFlagsCircle];
