import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    // Essential for React Router - enables client-side routing in development
    historyApiFallback: true,
  },
  
  // Build configuration for production
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging in production
    sourcemap: false,
    // Optimize bundle size
    minify: 'terser',
    // Ensure proper asset handling
    rollupOptions: {
      output: {
        // Organize assets in production
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  
  // Preview server configuration (for production testing)
  preview: {
    port: 4173,
    host: true,
    // Essential for React Router - enables client-side routing in preview
    historyApiFallback: true,
  },
  
  // Dependency optimization
  optimizeDeps: {
    // Exclude problematic dependencies from pre-bundling
    exclude: ['lucide-react'],
    // Include dependencies that should be pre-bundled
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  // Base URL configuration (adjust if deploying to subdirectory)
  base: '/',
  
  // Define global constants
  define: {
    // Ensure proper environment variable handling
    'process.env': process.env,
  },
});