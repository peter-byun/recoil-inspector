import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './build',
    lib: {
      entry: [path.resolve(__dirname, './src/main.ts')],
      name: 'RecoilInspector',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'recoil'],
    },
  },
});
