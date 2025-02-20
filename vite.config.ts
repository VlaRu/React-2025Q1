import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    css: false,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    extension: ['.ts', '.tsx'],
    include: ['src/**/*'],
    provider: 'v8'
  }
});
