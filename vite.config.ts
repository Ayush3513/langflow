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
      VITE_LANGFLOW_BASE_URL: JSON.stringify(process.env.VITE_LANGFLOW_BASE_URL || '/lf'),
      VITE_APPLICATION_TOKEN: JSON.stringify(process.env.VITE_APPLICATION_TOKEN),
      VITE_GROQ_API_KEY: JSON.stringify(process.env.VITE_GROQ_API_KEY)
    }
  },
  server: {
    proxy: {
      '/lf': {
        target: process.env.VITE_API_TARGET || 'https://api.langflow.astra.datastax.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/lf/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            if (req.headers.authorization) {
              proxyReq.setHeader('Authorization', req.headers.authorization);
            }
          });
        }
      }
    }
  }
});
