// for postcss-simple-vars PostCSS plugin
const generateCSSBreakpoints = (breakpoints) => {
  const simpleVars = {};
  breakpoints.forEach((breakpoint) => {
    let { name, value } = breakpoint;
    name = 'bp-' + name;
    const maxValue = value - 1;

    // for use with @media (min-width)
    simpleVars[name + '-min'] = value + 'px';
    // for use with @media (max-width)
    simpleVars[name + '-max'] = maxValue + 'px';
  });
  // Actual variables will look like this:
  // 'bp-small-min': '420px',
  // 'bp-small-max': '419px',
  // 'bp-medium-min': '768px',
  // 'bp-medium-max': '767px'
  return simpleVars;
};

module.exports = generateCSSBreakpoints;
