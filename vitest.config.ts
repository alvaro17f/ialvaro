/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    environmentMatchGlobs: [["src/**", "happy-dom"]],
    include: ["**/*.{test,spec,test.integration}.?(c|m)[t|j]s?(x)"],
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
