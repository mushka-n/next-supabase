import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import * as pluginHooks from 'eslint-plugin-react-hooks';
import pluginRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'components/**',
      '.next/**',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginRefresh.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': pluginHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...pluginHooks.configs.recommended.rules,
    },
  },
];
