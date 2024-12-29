import globals from 'globals';
import pluginJs from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['apps/**/*'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
  {
    ignores: [
      'coverage',
      '**/public',
      '**/dist',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      '**/.env',
      '**/.env.local',
      '**/.DS_Store',
      '**/node_modules',
      '**/.eslintrc.js',
      '**/eslint.config.js',
      '**/.prettierrc.js',
      '**/.prettierignore',
      '**/.prettierrc.js',
      'apps/**/*',
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ['*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
