import { useEffect, useRef, useCallback, useState } from 'react';
import { useUI } from '../../store';

const DURATION = 3500;

const ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
};

const ACCENT = {
  success: 'bg-success',
  error:   'bg-accent',
  warning: 'bg-warning',
  info:    'bg-white/40',
};

const Toast = () => {
  const { toast, hideToast } = useUI();
  const [visible,  setVisible]  = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!toast) { setVisible(false); return; }

    setVisible(true);
    setProgress(100);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      setProgress(Math.max(0, 100 - (elapsed / DURATION) * 100));
      if (elapsed < DURATION) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(hideToast, 300);
    }, DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [toast, hideToast]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(hideToast, 300);
  }, [hideToast]);

  if (!toast) return null;

  const type = (toast.type ?? 'info') as keyof typeof ICONS;
  const accent = ACCENT[type] ?? ACCENT.info;

  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`fixed bottom-6 right-6 z-[9999] min-w-[260px] max-w-[340px] bg-[#1a1a1a] border border-white/[0.08] overflow-hidden transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <span className="flex-shrink-0 mt-0.5 text-white/60">{ICONS[type]}</span>
        <p className="flex-1 text-sm text-white/80 leading-snug">{toast.message}</p>
        <button
          onClick={dismiss}
          aria-label="Dismiss notification"
          className="flex-shrink-0 text-white/25 hover:text-white transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-px bg-white/5" aria-hidden="true">
        <div className={`h-full ${accent} transition-none`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Toast;
