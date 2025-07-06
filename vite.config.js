import { defineConfig } from 'vite'

export default defineConfig({
  // Base URL for your app
  base: '/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: true,
    sourcemap: false
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true
  }
})
