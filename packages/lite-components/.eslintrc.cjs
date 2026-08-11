// These files were linted by @govom/components:lint:eslint while they lived in that package's
// src/classes, so the same rules are reused here to keep that coverage after the extraction.
//
// The lit and lit-a11y rules still apply: the stories render with lit's `html` templates even though
// the package itself ships no web components. The jsdoc requirement in the base config is keyed to
// Lit's @customElement / @property decorators, so it simply never matches here.
const base = require('../components/.eslintrc.cjs');

module.exports = base;
