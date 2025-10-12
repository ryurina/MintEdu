import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Buffer } from 'buffer'

export default defineConfig({
  plugins: [vue()],
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
