import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ── Required env vars ─────────────────────────────────────────────────────────
const REQUIRED = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const;

// Detect unconfigured placeholders
const PLACEHOLDER_PATTERNS = ['your-', 'YOUR_', 'xxx', ''];

const isPlaceholder = (val: string | undefined) =>
  !val || PLACEHOLDER_PATTERNS.some((p) => val.startsWith(p));

const missing = REQUIRED.filter((k) => isPlaceholder(import.meta.env[k]));

if (missing.length > 0) {
  if (import.meta.env.DEV) {
    console.warn(
      `%c[HORLOGÉ] Firebase not configured\n` +
      `Copy .env.example → .env.local and fill in your Firebase credentials.\n` +
      `Missing / placeholder: ${missing.join(', ')}\n` +
      `Auth and Firestore features will be disabled.`,
      'color: #f59e0b; font-weight: bold;'
    );
  }
}

// ── Initialisation (singleton) ────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);

/** True when Firebase is properly configured (not placeholder values) */
export const isFirebaseConfigured = missing.length === 0;
