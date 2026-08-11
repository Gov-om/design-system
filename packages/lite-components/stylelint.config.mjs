// Lite Components reuse the web components' CSS rules, with the differences that come from shipping
// plain stylesheets for native elements instead of shadow-DOM CSS:
//
// - Class names are BEM (`gup-accordion-item__action-icon`). They are this package's public API, so
//   the kebab-case pattern is widened to allow the `__element` segment rather than renaming them.
// - Private custom properties are prefixed with an underscore (`--_bg-color`).
// - `-webkit-mask-*` prefixes are still required for Safari, so the vendor-prefix rule is off. It
//   must not merely be downgraded to a warning: stylelint --fix strips the prefix either way, which
//   silently drops the Safari fallback and leaves a duplicate unprefixed declaration behind.
// - The base config's overrides are web-component-specific (postcss-lit for CSS-in-JS, and the
//   shadow-DOM `:dir` warning), so they are dropped.
import base from '../components/stylelint.config.mjs';

const namePattern = '([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*';

/** @type {import('stylelint').Config} */
export default {
  ...base,
  rules: {
    ...base.rules,
    'selector-class-pattern': [
      `^${namePattern}(__${namePattern})*$`,
      {
        message: 'Expected class selector "%s" to be kebab-case, optionally with a BEM __element segment',
      },
    ],
    'custom-property-pattern': [
      `^_?${namePattern}$`,
      {
        message: 'Expected custom property name "%s" to be kebab-case, optionally prefixed with _ when private',
      },
    ],
    'property-no-vendor-prefix': null,
    'selector-not-notation': 'simple',
  },
  overrides: [],
};
