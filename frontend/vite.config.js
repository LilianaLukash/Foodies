import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, 'src');

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/Foodies/' : '/',
  resolve: {
    alias: {
      '@': srcDir,
      '@components': path.resolve(srcDir, 'components'),
      '@constants': path.resolve(srcDir, 'constants'),
      '@features': path.resolve(srcDir, 'features'),
      '@redux': path.resolve(srcDir, 'redux'),
      '@api': path.resolve(srcDir, 'api'),
      '@utils': path.resolve(srcDir, 'utils'),
    },
  },
});
