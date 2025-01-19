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
   headers: {
          'Access-Control-Allow-Origin': 'https://langflow-flax.vercel.app/',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
  define: {
    'process.env': {
      VITE_API_BASE_URL: JSON.stringify('https://api.langflow.astra.datastax.com'),
      VITE_APPLICATION_TOKEN: JSON.stringify(process.env.VITE_APPLICATION_TOKEN)
    }
  },
  server: {
    proxy: {
      '/api-proxy': {
        target: 'https://api.langflow.astra.datastax.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
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
