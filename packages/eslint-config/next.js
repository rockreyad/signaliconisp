const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: ["next/core-web-vitals", "plugin:@tanstack/query/recommended"],
  plugins: [
    "@typescript-eslint",
    "only-warn",
    "simple-import-sort",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
    ecmaVersion: "latest",
    sourceType: "module",
    jsx: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    // TypeScript Rules - All as warnings
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "warn",

    // Import Rules
    "import/no-default-export": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",

    // React Rules
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",

    // Prettier Rules
    "prettier/prettier": [
      "warn",
      {
        singleQuote: false,
        trailingComma: "all",
        tabWidth: 2,
      },
    ],

    // General Rules
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-unused-vars": "off", // TypeScript handles this
    "prefer-const": "warn",
    "no-duplicate-imports": "off",
  },
};
