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
      NEXT_PUBLIC_LANGFLOW_BASE_URL: '/lf',
      NEXT_PUBLIC_APPLICATION_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_APPLICATION_TOKEN),
      NEXT_PUBLIC_GROQ_API_KEY: JSON.stringify(process.env.NEXT_PUBLIC_GROQ_API_KEY)
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
