import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseConfig = {
  files: ['**/*.ts', '**/*.js'],
  ignores: [
    'dist/**/*',
    'node_modules/**/*',
    'coverage/**/*',
    'build/**/*',
    'eslint.config.js',
  ],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
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
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
};

export default [
  js.configs.recommended,
  baseConfig,
  {
    ...baseConfig,
    files: [
      '**/utils/logger.ts',
      '**/scripts/**/*.ts',
      '**/middleware/**/*.ts',
    ],
    rules: {
      ...baseConfig.rules,
      'no-console': 'off',
    },
  },
  eslintPluginPrettierRecommended,
];
