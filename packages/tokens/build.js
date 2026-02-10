const StyleDictionaryPackage = require('style-dictionary');

StyleDictionaryPackage.registerTransform({
  name: 'color/css',
  type: 'value',
  transformer: function (prop) {
    const { r, g, b, a } = prop.value;

    const red = Math.round(r * 255);
    const green = Math.round(g * 255);
    const blue = Math.round(b * 255);

    if (a !== undefined && a < 1) {
      const alphaPercentage = Math.round(a * 100);
      return `rgba(${red} ${green} ${blue} / ${alphaPercentage}%)`;
    } else {
      let rHex = red.toString(16).padStart(2, '0');
      let gHex = green.toString(16).padStart(2, '0');
      let bHex = blue.toString(16).padStart(2, '0');
      return `#${rHex}${gHex}${bHex}`;
    }
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'name/prefix',
  type: 'name',
  transformer: function (prop) {
    if (prop.path[0] === 'color') {
      let newPath = ['gup', ...prop.path[1].split('/').slice(1)];
      return `${newPath.join('-')}`;
    } else if (prop.path[0] === 'float') {
      return `${prop.path.slice(1).join('-').replace(/\//g, '-')}`;
    }
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'value/px',
  type: 'value',
  transformer: function (prop) {
    return prop.value + 'px';
  },
});

function getStyleDictionaryConfig(type) {
  let transforms = ['attribute/cti', 'name/cti/kebab', 'name/prefix'];
  if (type === 'color') {
    transforms.push('color/css');
  } else if (type === 'float') {
    transforms.push('value/px');
  }
  return {
    source: [`src/transformed-tokens/${type}.json`],
    platforms: {
      web: {
        transformGroup: 'css',
        buildPath: 'src/variables/',
        files: [
          {
            destination: `${type}.css`,
            format: 'css/variables',
          },
        ],
        transforms: transforms,
      },
    },
  };
}

const types = ['color', 'float'];
const platforms = ['web'];

types.map(function (type) {
  platforms.map(function (platform) {
    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(type));

    StyleDictionary.buildPlatform(platform);
  });
});
