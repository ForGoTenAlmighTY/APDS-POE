// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './ssl/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './ssl/server.cert'))
    },
    proxy: {
      // Proxying API requests
      '/api': {
        target: 'http://localhost:5000', // The backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
