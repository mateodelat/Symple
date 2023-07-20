import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["**/node_modules/**", "*.skip.*"],
    setupFiles: [resolve(__dirname, "./vitest.setup.js")],
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./"),
    },
  },
});
