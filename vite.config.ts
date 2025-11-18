import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/blueprint3d/' : '/',
  root: './example',
  publicDir: false,  // Disable default public dir handling
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'js/*',
          dest: 'js'
        },
        {
          src: 'models/*',
          dest: 'models'
        },
        {
          src: 'rooms/*',
          dest: 'rooms'
        }
      ]
    })
  ],
  server: {
    port: 3000,
    open: '/index.html',
    // Serve models directory as static files
    fs: {
      strict: false  // Allow serving files from outside root
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'example/index.html')
      }
    }
  }
});
