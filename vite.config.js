import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ── Security headers ──────────────────────────────────────────────────────────
const securityHeaders = {
  'X-Content-Type-Options':  'nosniff',
  'X-Frame-Options':         'DENY',
  'X-XSS-Protection':        '1; mode=block',
  'Referrer-Policy':         'strict-origin-when-cross-origin',
  'Permissions-Policy':      'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

export default defineConfig({
  plugins: [react()],

  server: {
    headers: {
      ...securityHeaders,
      'Cache-Control': 'public, max-age=3600',
    },
    hmr: {
      timeout: 30000,
      protocol: 'ws',
    },
  },

  preview: {
    headers: securityHeaders,
  },

  build: {
    // Alerte si un chunk dépasse 500kb
    chunkSizeWarningLimit: 500,

    // Minification agressive
    minify: 'esbuild',

    // Supprime les console.log en production
    esbuildOptions: {
      drop: ['console', 'debugger'],
    },

    // Source maps en prod désactivées (sécurité)
    sourcemap: false,

    rollupOptions: {
      output: {
        // Chunking manuel — sépare les vendors lourds
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          
          // Assure que React et React-DOM sont dans le même chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // Gestion spécifique de lodash s'il est présent
          if (id.includes('node_modules/lodash') || id.includes('node_modules/underscore')) {
            return 'lodash';
          }
          
          if (id.includes('firebase/auth'))      return 'firebase-auth';
          if (id.includes('firebase/firestore')) return 'firebase-firestore';
          if (id.includes('firebase'))           return 'firebase-core';
          if (id.includes('react-router'))       return 'react-router';
          if (id.includes('zustand'))            return 'zustand';
          
          return 'vendor';
        },
        // Nommage des assets avec hash pour cache busting
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'zustand'],
  },
  css: {
    devSourcemap: true,
  },
});