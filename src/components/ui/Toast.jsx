import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useUI } from '../../store';

const DURATION = 3000;

const ICONS = {
  success: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>,
  error:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  warning: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  info:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

const STYLES = {
  success: { border: 'border-l-4 border-success', icon: 'text-success', bar: 'bg-success' },
  error:   { border: 'border-l-4 border-error',   icon: 'text-error',   bar: 'bg-error'   },
  warning: { border: 'border-l-4 border-warning', icon: 'text-warning', bar: 'bg-warning' },
  info:    { border: 'border-l-4 border-brand',   icon: 'text-brand',   bar: 'bg-brand'   },
};

const Toast = () => {
  const { toast, hideToast } = useUI();

  const [visible,  setVisible]  = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!toast) { setVisible(false); return; }

    setVisible(true);
    setProgress(100);
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed   = now - startRef.current;
      const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setProgress(remaining);
      if (elapsed < DURATION) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(hideToast, 300);
    }, DURATION);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [toast, hideToast]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(hideToast, 300);
  }, [hideToast]);

  if (!toast) return null;

  const type = toast.type ?? 'info';
  const s    = STYLES[type] ?? STYLES.info;

  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`fixed bottom-6 right-6 z-[9999] min-w-[280px] max-w-[360px] bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${s.border} ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <span className={`flex-shrink-0 mt-0.5 ${s.icon}`}>{ICONS[type]}</span>
        <p className="flex-1 text-sm font-medium text-dark leading-snug">{toast.message}</p>
        <button onClick={dismiss} aria-label="Fermer la notification" className="flex-shrink-0 text-gray-400 hover:text-dark transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="h-[3px] bg-gray-100" aria-hidden="true">
        <div className={`h-full ${s.bar} transition-none`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Toast;
