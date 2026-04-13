import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/**/*.ts",
  dts: {
    tsgo: true,
  },
  exports: true,
  format: {
    esm: {
      target: ["es2015"],
    },
    cjs: {
      target: ["node20"],
    },
  },
});
