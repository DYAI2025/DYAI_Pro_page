import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr()
  ],
  root: './DYAI_Pro_page',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: './DYAI_Pro_page/index.html',
        philosophy: './DYAI_Pro_page/philosophy.html',
        services: './DYAI_Pro_page/services.html',
        insights: './DYAI_Pro_page/insights.html',
        contact: './DYAI_Pro_page/contact.html',
        impressum: './DYAI_Pro_page/impressum.html',
        privacy: './DYAI_Pro_page/privacy.html'
      },
      output: {
        manualChunks: {
          'vendor': ['lucide-react'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});