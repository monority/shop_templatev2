import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks':    reactHooks,
      'react-refresh':  reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Variables inutilisées — ignore les constantes en UPPER_CASE et les vars préfixées _
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^[A-Z_]|^_',
        argsIgnorePattern: '^_',
      }],

      // React Refresh — warn si export non-composant
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Qualité
      'no-console':          ['warn', { allow: ['warn', 'error'] }],
      'no-debugger':         'error',
      'no-duplicate-imports': 'error',
      'prefer-const':        'warn',
      'no-var':              'error',
      'eqeqeq':              ['error', 'always'],
    },
  },
];
