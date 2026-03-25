import React, { useEffect, useState } from 'react';
import './Toast.scss';

const Toast = ({ 
  message, 
  type = 'warning', 
  duration = 5000, 
  onClose, 
  showIcon = true,
  position = 'top-right',
  action = null 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Auto-dismiss after duration
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleDismiss = () => {
    setIsLeaving(true);
    
    // Wait for exit animation before calling onClose
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const handleAction = () => {
    if (action?.onClick) {
      action.onClick();
    }
    handleDismiss();
  };

  const getIcon = () => {
    const icons = {
      success: '✓',
      warning: '⚠️',
      error: '✕',
      info: 'ℹ',
      loading: '⟳'
    };
    return icons[type] || icons.info;
  };

  const toastClasses = [
    'toast',
    `toast--${type}`,
    `toast--${position}`,
    isVisible && 'toast--visible',
    isLeaving && 'toast--leaving'
  ].filter(Boolean).join(' ');

  return (
    <div className={toastClasses} role="alert" aria-live="polite">
      {showIcon && (
        <div className="toast__icon" aria-hidden="true">
          {type === 'loading' ? (
            <div className="toast__spinner"></div>
          ) : (
            getIcon()
          )}
        </div>
      )}
      
      <div className="toast__content">
        <div className="toast__message">{message}</div>
        {action && (
          <button 
            className="toast__action" 
            onClick={handleAction}
            type="button"
          >
            {action.label}
          </button>
        )}
      </div>
      
      <button 
        className="toast__close" 
        onClick={handleDismiss}
        aria-label="Close notification"
        type="button"
      >
        ×
      </button>
      
      {duration > 0 && (
        <div 
          className="toast__progress" 
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts = [], position = 'top-right' }) => {
  return (
    <div className={`toast-container toast-container--${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} position={position} />
      ))}
    </div>
  );
};

// Toast Hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (options) => {
    const id = Date.now() + Math.random();
    const newToast = { ...options, id };
    
    setToasts(prev => [...prev, newToast]);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, options = {}) => {
    return addToast({ message, type: 'success', ...options });
  };

  const showWarning = (message, options = {}) => {
    return addToast({ message, type: 'warning', ...options });
  };

  const showError = (message, options = {}) => {
    return addToast({ message, type: 'error', ...options });
  };

  const showInfo = (message, options = {}) => {
    return addToast({ message, type: 'info', ...options });
  };

  const showLoading = (message, options = {}) => {
    return addToast({ message, type: 'loading', duration: 0, ...options });
  };

  const clearAll = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showWarning,
    showError,
    showInfo,
    showLoading,
    clearAll
  };
};

export default Toast;
