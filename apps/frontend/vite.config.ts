import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  build: {
    outDir: "../../packages/chrome-extension/build/frontend-bundle",
  },
});
