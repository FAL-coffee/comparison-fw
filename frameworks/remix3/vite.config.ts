import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',

  plugins: [react(), tailwindcss()],

  build: {
    outDir: 'public/assets',
    emptyOutDir: false,
    sourcemap: true,

    rollupOptions: {
      input: {
        main: 'app/entry.tsx',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },

  server: {
    port: 5173,
  },
})
