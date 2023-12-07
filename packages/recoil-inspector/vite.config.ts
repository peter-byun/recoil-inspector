import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
    emptyOutDir: true,
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
