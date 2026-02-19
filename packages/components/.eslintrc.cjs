module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:wc/recommended',
    'plugin:lit/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:lit-a11y/recommended',
    'plugin:jsdoc/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': ['@typescript-eslint', 'import', 'lit-a11y', 'jsdoc'],
  'rules': {
    'import/no-unresolved': 'error',
    'no-warning-comments': ['warn'],
    'jsdoc/check-tag-names': ['error', { definedTags: ['slot', 'cssprop', 'csspart', 'event', 'dependency'] }],
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-jsdoc': [
      'warn',
      {
        'contexts': [
          'Decorator[expression.callee.name="customElement"]',
          'PropertyDefinition > Decorator[expression.callee.name="property"]',
          // 'PropertyDefinition > Decorator[expression.callee.name="Event"]',
        ],
        'require': {
          'FunctionDeclaration': false,
        },
      },
    ],
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/tag-lines': ['warn', 'any', { 'startLines': 1, 'endLines': 0 }],
  },
  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'jsdoc': {
      'tagNamePreference': {
        'fires': {
          'message': 'Do not use @fires JSDoc tag. Use @event JSDoc instead.',
        },
        'attr': {
          'message': 'Do not use @attr JSDoc tag. Add a JSDoc comment to the @property decorator instead.',
        },
        'attribute': {
          'message': 'Do not use @attribute JSDoc tag. Add a JSDoc comment to the @property decorator instead.',
        },
        'prop': {
          'message': 'Do not use @prop JSDoc tag. Add a JSDoc comment to the @property decorator instead.',
        },
        'property': {
          'message': 'Do not use @property JSDoc tag. Add a JSDoc comment to the @property decorator instead.',
        },
        'tag': {
          'message': 'Do not use @tag',
        },
        'tagname': {
          'message': 'Do not use @tagname',
        },
      },
    },
    'import/resolver': {
      'typescript': {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`,
        'alwaysTryTypes': true,

        // use <root>/path/to/folder/tsconfig.json
        'project': './tsconfig.json',
      },
    },
  },
};
