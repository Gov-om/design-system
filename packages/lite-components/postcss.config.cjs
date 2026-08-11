module.exports = {
  plugins: [require('autoprefixer'), require('postcss-dir-pseudo-class')({ shadow: true }), require('postcss-nested')],
};
