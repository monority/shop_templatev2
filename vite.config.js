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
  'Content-Security-Policy':  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.dummyjson.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://cdn.dummyjson.com https://*.dummyjson.com; frame-src https://www.youtube.com; connect-src 'self' https://*.dummyjson.com",
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
    // Augmenter la limite pour réduire les avertissements
    chunkSizeWarningLimit: 600,

    // Minification agressive
    minify: 'esbuild',

    // Remove dev-only code
    target: 'esnext',

    // Supprime les console.log en production
    esbuildOptions: {
      drop: ['console', 'debugger'],
      
      // Essayer d'éviter certains problèmes de minification
      keepNames: true,
    },

    // Source maps en prod désactivées (sécurité)
    sourcemap: false,

    rollupOptions: {
      output: {
        // Chunking manuel — sépare les vendors lourds
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          
          // Isoler les grosses bibliothèques pour éviter les conflits
          if (id.includes('node_modules/react/')) {
            return 'react';
          }
          
          if (id.includes('node_modules/react-dom/')) {
            return 'react-dom';
          }
          
          if (id.includes('node_modules/react-router/')) {
            return 'react-router';
          }
          
          if (id.includes('node_modules/zustand/')) {
            return 'zustand';
          }
          
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer-motion';
          }
          
          if (id.includes('node_modules/firebase/auth/')) {
            return 'firebase-auth';
          }
          
          if (id.includes('node_modules/firebase/firestore/')) {
            return 'firebase-firestore';
          }
          
          if (id.includes('node_modules/firebase/')) {
            return 'firebase-core';
          }
          
          // Isoler les bibliothèques utilitaires qui peuvent causer des conflits
          if (id.includes('node_modules/react-fast-compare')) {
            return 'fast-compare';
          }
          
          if (id.includes('node_modules/lodash') || 
              id.includes('node_modules/underscore')) {
            return 'lodash';
          }
          
          // Regrouper les autres petits modules ensemble
          return 'vendor';
        },
        // Nommage des assets avec hash pour cache busting
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
        
        // Désactiver le hoisting pour éviter les conflits de portée
        hoistTransitiveImports: false,
      },
    },
  },

  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'zustand',
      'framer-motion',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'react-fast-compare'
    ],
  },
  css: {
    devSourcemap: true,
  },
});