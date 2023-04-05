import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "./build",
    lib: {
      entry: [
        path.resolve(__dirname, "./src/background.ts"),
        path.resolve(__dirname, "./src/content-script.ts"),
      ],
    },
  },
});
