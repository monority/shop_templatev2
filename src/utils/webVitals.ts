export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

interface Gtag {
  (command: 'event', eventName: string, params?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export const reportWebVitals = (metric: WebVitalsMetric) => {
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    });
  }
};

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
  startTime: number;
}

export const getCLS = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  let clsValue = 0;
  const clsEntries: LayoutShiftEntry[] = [];
  let sessionValue = 0;
  const sessionEntries: LayoutShiftEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const lsEntry = entry as LayoutShiftEntry;
      if (lsEntry.hadRecentInput) continue;

      const firstSessionEntry = sessionEntries[0];
      const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

      if (
        sessionValue &&
        lsEntry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
        lsEntry.startTime - (firstSessionEntry?.startTime || 0) < 5000
      ) {
        sessionEntries.push(lsEntry);
        sessionValue += lsEntry.value;
      } else {
        if (sessionValue > clsValue) {
          clsValue = sessionValue;
          clsEntries.length = 0;
          clsEntries.push(...sessionEntries);
        }
        sessionEntries.length = 0;
        sessionEntries.push(lsEntry);
        sessionValue = lsEntry.value;
      }
    }
  });

  observer.observe({ type: 'layout-shift', buffered: true });

  const getRating = (value: number): 'good' | 'needs-improvement' | 'poor' => {
    return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      observer.disconnect();

      if (clsValue > 0) {
        onPerfEntry?.({
          name: 'CLS',
          value: clsValue,
          rating: getRating(clsValue),
          delta: clsValue,
          id: `v3-${Date.now()}`,
          navigationType: 'navigation',
        });
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    observer.disconnect();
  };
};

interface LCPEntry extends PerformanceEntry {
  renderTime: number;
  loadTime: number;
}

export const getLCP = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as LCPEntry;

    const getRating = (value: number): 'good' | 'needs-improvement' | 'poor' => {
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    };

    const value = lastEntry.renderTime || lastEntry.loadTime || 0;
    onPerfEntry?.({
      name: 'LCP',
      value,
      rating: getRating(value),
      delta: value,
      id: `v3-${Date.now()}`,
      navigationType: 'navigation',
    });
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      observer.disconnect();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    observer.disconnect();
  };
};

interface FIDEntry extends PerformanceEntry {
  processingDuration: number;
}

export const getFID = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fidEntry = entry as FIDEntry;
      const getRating = (value: number): 'good' | 'needs-improvement' | 'poor' => {
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      };

      onPerfEntry?.({
        name: 'FID',
        value: fidEntry.processingDuration,
        rating: getRating(fidEntry.processingDuration),
        delta: fidEntry.processingDuration,
        id: `v3-${Date.now()}`,
        navigationType: 'navigation',
      });
    }
  });

  observer.observe({ type: 'first-input', buffered: true });

  return () => {
    observer.disconnect();
  };
};