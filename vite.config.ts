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
      VITE_APPLICATION_TOKEN: JSON.stringify(process.env.VITE_APPLICATION_TOKEN),
      VITE_GROQ_API_KEY: JSON.stringify(process.env.VITE_GROQ_API_KEY)
    }
  },
  server: {
    port: 5174,
    proxy: {
      '/lf': {
        target: 'https://api.langflow.astra.datastax.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/lf/, '/lf')
      }
    }
  }
}));
