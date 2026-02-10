const generateCSSBreakpoints = require('./src/utils/generate-css-breakpoints.cjs');
const breakpoints = require('./src/styles/preprocessed/breakpoints.json');
const postcss = require('postcss');
const path = require('path');

module.exports = {
  // syntax: 'postcss-lit',
  plugins: [
    // require('stylelint'),
    // require('postcss-reporter')({
    //   clearReportedMessages: true,
    //   plugins: ['stylelint']
    // }),
    require('postcss-mixins')({
      mixinsFiles: './src/styles/preprocessed/mixins.css',
      mixins: {
        'scope-local-variables': (mixin) => {
          const fileName = path.basename(mixin.source.input.file, '.css?inline');
          const rule = postcss.rule({ selector: '&' });
          const addLocalPrefix = (prop) => '--_gup-' + fileName + prop;

          mixin.nodes.forEach((node) => {
            const declaration = {
              prop: node.prop.startsWith('--') ? addLocalPrefix(node.prop) : node.prop,
              value: node.prop.startsWith('--') ? node.value : node.value.replace(/var\(--(.+)$/g, 'var(' + addLocalPrefix('--$1')),
            };
            rule.append(declaration);
          });
          mixin.replaceWith(rule);
        },
      },
    }),
    require('postcss-simple-vars')({
      variables: function () {
        return generateCSSBreakpoints(breakpoints);
      },
    }),
    require('autoprefixer'),
    require('postcss-import')({
      path: './src/styles/styles.css',
    }),
    require('postcss-dir-pseudo-class')({ shadow: true }),
    require('postcss-nested'),
  ],
};
