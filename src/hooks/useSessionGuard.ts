import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../cfg/firebase/firebaseCfg';
import { useAppStore } from '../store';

/**
 * Surveille le token Firebase.
 * Si la session expire pendant la navigation, déconnecte l'utilisateur
 * et le redirige vers /login avec un message explicite.
 */
const useSessionGuard = (): void => {
  const navigate   = useNavigate();
  const setUser    = useAppStore((s) => s.setUser);
  const clearCart  = useAppStore((s) => s.clearCart);
  const showToast  = useAppStore((s) => s.showToast);

  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (fbUser) => {
      if (!fbUser) return; // pas connecté, rien à faire

      try {
        // Force le refresh du token — lève une erreur si expiré/révoqué
        await fbUser.getIdToken(true);
      } catch (err: any) {
        console.warn('[SessionGuard] Token invalide, déconnexion.', err.code);
        setUser(null);
        clearCart();
        showToast('Your session has expired. Please sign in again.', 'warning');
        navigate('/login', { replace: true });
      }
    });

    return () => unsub();
  }, [navigate, setUser, clearCart, showToast]);
};

export default useSessionGuard;
