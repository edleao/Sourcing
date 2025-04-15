// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // garante que a raiz é o mesmo lugar que index.html
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
