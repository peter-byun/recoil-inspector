import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  build: {
    outDir: './build',
    emptyOutDir: true,
    lib: {
      entry: [path.resolve(__dirname, './src/index.ts')],
      name: 'RecoilInspector',
    },
    rollupOptions: {
      external: ['React', 'react-dom', 'recoil'],
    },
  },
});
