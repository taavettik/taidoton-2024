import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,
    port: 8080,
    hmr:{
      clientPort: 8080,
    },
  }
})