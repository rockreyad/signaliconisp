import express from "@repo/eslint-config/express.js";

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      ".turbo",
      ".next",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  express,
];
