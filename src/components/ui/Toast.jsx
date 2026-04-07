import React, { useEffect, useRef, useState } from 'react';
import { useUI } from '../../store';

const ICONS = {
    success: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
        </svg>
    ),
    error: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    ),
    warning: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
    info: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
};

const STYLES = {
    success: { bg: 'bg-white', border: 'border-l-4 border-success', icon: 'text-success', progress: 'bg-success' },
    error: { bg: 'bg-white', border: 'border-l-4 border-error', icon: 'text-error', progress: 'bg-error' },
    warning: { bg: 'bg-white', border: 'border-l-4 border-warning', icon: 'text-warning', progress: 'bg-warning' },
    info: { bg: 'bg-white', border: 'border-l-4 border-brand', icon: 'text-brand', progress: 'bg-brand' },
};

const DURATION = 3000;

const Toast = () => {
    const { ui, hideToast } = useUI();
    const toast = ui?.toast;
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const timerRef = useRef(null);
    const frameRef = useRef(null);
    const startRef = useRef(null);

    useEffect(() => {
        if (!toast) {
            setVisible(false);
            return;
        }

        setVisible(true);
        setProgress(100);
        startRef.current = performance.now();

        const tick = (now) => {
            const elapsed = now - startRef.current;
            const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100);
            setProgress(remaining);
            if (elapsed < DURATION) {
                frameRef.current = requestAnimationFrame(tick);
            }
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
    }, [toast]);

    if (!toast) return null;

    const type = toast.type || 'info';
    const s = STYLES[type] || STYLES.info;

    return (
        <div
            role="status"
            aria-live="polite"
            className={`
        fixed bottom-6 right-6 z-[9999] min-w-[280px] max-w-[360px]
        rounded-xl shadow-2xl overflow-hidden
        transition-all duration-300 ease-out
        ${s.bg} ${s.border}
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
        >
            <div className="flex items-start gap-3 px-4 py-3">
                <span className={`flex-shrink-0 mt-0.5 ${s.icon}`}>{ICONS[type]}</span>
                <p className="flex-1 text-sm font-medium text-dark leading-snug">{toast.message}</p>
                <button
                    onClick={() => { setVisible(false); setTimeout(hideToast, 300); }}
                    aria-label="Dismiss notification"
                    className="flex-shrink-0 text-gray-400 hover:text-dark transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Progress bar */}
            <div className="h-[3px] bg-gray-100">
                <div
                    className={`h-full ${s.progress} transition-none`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default Toast;
