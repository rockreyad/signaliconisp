/* eslint-env node */
/// <reference types="node" />

const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

const baseConfig = {
  files: ['**/*.ts', '**/*.js'],
  ignores: [
    'dist/**/*',
    'node_modules/**/*',
    'coverage/**/*',
    'build/**/*',
    'eslint.config.cjs',
  ],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
      // eslint-disable-next-line no-undef
      tsconfigRootDir: __dirname,
      sourceType: 'commonjs',
    },
    ecmaVersion: 2022,
    globals: {
      console: 'readonly',
      process: 'readonly',
      module: 'readonly',
      require: 'readonly',
      global: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-undef': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
};

module.exports = [
  js.configs.recommended,
  baseConfig,
  {
    ...baseConfig,
    files: [
      '**/utils/logger.ts',
      '**/scripts/**/*.ts',
      '**/middleware/**/*.ts',
      '**/prisma/seed.ts',
      'src/utils/env.ts',
      'src/utils/authHeader.ts',
      'src/utils/tokenManager.ts',
      '**/controllers/**/*.ts',
    ],
    rules: {
      ...baseConfig.rules,
      'no-console': 'off',
    },
  },
  eslintPluginPrettierRecommended,
];
