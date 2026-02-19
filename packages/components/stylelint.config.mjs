/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-use-logical', 'stylelint-no-unsupported-browser-features'],
  rules: {
    'media-query-no-invalid': null,
    'media-feature-name-value-allowed-list': [
      {
        'min-width': ['$bp-xsmall-min', '$bp-small-min', '$bp-medium-min', '$bp-large-min'],
        'max-width': ['$bp-xsmall-max', '$bp-small-max', '$bp-medium-max', '$bp-large-max'],
      },
    ],
    'rule-empty-line-before': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'define-mixin'],
        severity: 'warning',
      },
    ],
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*$',
      {
        message: 'Expected custom property name "%s" to be kebab-case',
      },
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*$',
      {
        message: 'Expected class selector "%s" to be kebab-case',
      },
    ],
    'comment-word-disallowed-list': [
      ['/^TODO:/'],
      {
        severity: 'warning',
        message: 'A todo comment was found. Consider resolving the issue in future',
      },
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        severity: 'warning',
        ignoreShorthands: ['/flex/', '/grid-template/', 'margin-inline', 'margin-block', 'padding-inline', 'padding-block', 'gap'],
      },
    ],
    'no-descending-specificity': null,
    'import-notation': null,
    'color-hex-length': 'long',
    'block-no-empty': [
      true,
      {
        severity: 'warning',
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        'camelCaseSvgKeywords': true,
        'ignoreProperties': ['--font-base', '--font-highlight', '--font-base-ltr', '--font-base-rtl'],
        'ignoreKeywords': ['/^\\{|.*[\\.]+.*|.*\\}+.*|\\}$/'],
        'ignoreFunctions': ['color-mix'],
        'severity': 'warning',
      },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        ignore: ['intrinsic-width', 'css-appearance', 'css-nesting', 'css-resize', 'css-dir-pseudo', 'css3-cursors'],
        ignorePartialSupport: true,
      },
    ],
    'csstools/use-logical': [
      'always',
      {
        severity: 'warning',
        except: [
          'padding',
          'margin',
          'padding-bottom',
          'padding-top',
          'margin-bottom',
          'margin-top',
          'bottom',
          'top',
          'left',
          'width',
          'height',
          'min-width',
          'min-height',
          'max-width',
          'max-height',
          'border-bottom',
          'border-top',
          'border-top-color',
          'border-bottom-color',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      customSyntax: 'postcss-lit',
    },
    {
      files: ['src/components/**/*.css'],
      rules: {
        'selector-pseudo-class-disallowed-list': [
          ['dir'],
          {
            severity: 'warning',
            message: 'Try to avoid using the :dir pseudo-class – it is poorly supported in Safari when found inside Shadow DOM',
          },
        ],
      },
    },
  ],
};
