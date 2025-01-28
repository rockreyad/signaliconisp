const { resolve } = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use server side
 * typescript packages.
 */

module.exports = {
  files: ["**/*.ts"],
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      project,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    "only-warn": require("eslint-plugin-only-warn"),
    "simple-import-sort": require("eslint-plugin-simple-import-sort"),
    prettier: require("eslint-plugin-prettier"),
    import: require("eslint-plugin-import"),
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    // TypeScript Rules
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "error",

    // Import Rules
    "import/no-default-export": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    // Prettier Rules
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "all",
        tabWidth: 2,
      },
    ],

    // General Rules
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-unused-vars": "off", // TypeScript handles this
    "prefer-const": "error",
    "no-duplicate-imports": "error",
  },
};
