import { useCallback } from 'react';

// Placeholder SVG encodé en base64 — affiché si l'image source échoue
const FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f1f5f9'/%3E%3Cpath d='M160 200 L200 160 L240 200 L220 200 L220 240 L180 240 L180 200 Z' fill='%23cbd5e1'/%3E%3Ccircle cx='200' cy='200' r='60' fill='none' stroke='%23cbd5e1' stroke-width='2'/%3E%3C/svg%3E";

/**
 * Retourne un handler onError pour les images.
 * En cas d'échec de chargement, remplace par un placeholder neutre.
 */
const useImageFallback = () =>
  useCallback((e) => {
    if (e.currentTarget.src !== FALLBACK_SRC) {
      e.currentTarget.src = FALLBACK_SRC;
    }
  }, []);

export default useImageFallback;
