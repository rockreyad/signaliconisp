import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/auth.ts",
    "src/common.ts",
    "src/user.ts",
    "src/api.ts",
    "src/package.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  outDir: "dist",
});
