import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss({
      entry: ['./src/index.ts'],
    }),
  ],
  build: {
    outDir: './build',
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: [path.resolve(__dirname, './src/index.ts')],
      name: 'RecoilInspector',
    },
    rollupOptions: {
      external: ['react-dom', 'recoil', 'react'],
    },
  },
});
