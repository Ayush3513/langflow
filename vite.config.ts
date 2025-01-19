import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {
      VITE_LANGFLOW_BASE_URL: '/lf',
      VITE_APPLICATION_TOKEN: "AstraCS:KHsgliOksMRwadpnlxhKIzsa:75da20a2a0a056d9e240102b4e0676c387b3dda1fa16419a6799b9ac59c8f430",
      VITE_GROQ_API_KEY: "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"
    }
  },
  server: {
    port: 5174,
    proxy: {
      '/lf': {
        target: 'https://api.langflow.astra.datastax.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/lf/, '/lf'),
        // Add the following line to allow access from the specified domain
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'https://langflow-flax.vercel.app');
          });
        }
      }
    }
  }
}));
