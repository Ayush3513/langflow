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
  headers: {
          'Access-Control-Allow-Origin': 'https://langflow-flax.vercel.app/',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
  define: {
    'process.env': {
      VITE_LANGFLOW_BASE_URL: 'https://api.langflow.astra.datastax.com', // Set the production API URL directly
      VITE_APPLICATION_TOKEN: JSON.stringify(process.env.VITE_APPLICATION_TOKEN),
      VITE_GROQ_API_KEY: JSON.stringify(process.env.VITE_GROQ_API_KEY)
    }
  },
  server: {
    port: 5174,
    // Removed proxy configuration for production
  }
}));

        
      
