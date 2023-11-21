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
    lib: {
      entry: [path.resolve(__dirname, './src/main.tsx')],
      name: 'RecoilInspector',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'recoil'],
    },
  },
});
