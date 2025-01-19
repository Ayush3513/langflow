import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {
      VITE_API_BASE_URL: JSON.stringify('https://api.langflow.astra.datastax.com'),
      VITE_APPLICATION_TOKEN: JSON.stringify(process.env.VITE_APPLICATION_TOKEN)
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.langflow.astra.datastax.com',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    }
  }
});
