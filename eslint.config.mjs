import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
      // "no-undef": "error"
    },
  },
  {
    ignores: ['**/dist/*'],
  },
];
