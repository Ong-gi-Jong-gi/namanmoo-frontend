import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      https:
        mode === 'production'
          ? {}
          : {
              key: fs.readFileSync(path.resolve('./cert', 'localhost-key.pem')),
              cert: fs.readFileSync(path.resolve('./cert', 'localhost.pem')),
            },
    },
    define: {
      global: {},
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
  };
});
