import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    css: false,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests',
    /*     extension: ['.ts', '.tsx'],
     */ include: ['src/**'],
    coverage: {
      provider: 'v8'
    }
  },
  json: {
    stringify: true
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      external: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx']
    }
  }
});
