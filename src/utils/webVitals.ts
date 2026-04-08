export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

export const reportWebVitals = (metric: WebVitalsMetric) => {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    });
  }
};

export const getCLS = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];
  let sessionValue = 0;
  let sessionEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if ((entry as any).hadRecentInput) continue;

      const firstSessionEntry = sessionEntries[0];
      const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

      if (
        sessionValue &&
        entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
        entry.startTime - (firstSessionEntry?.startTime || 0) < 5000
      ) {
        sessionEntries.push(entry);
        sessionValue += (entry as any).value;
      } else {
        if (sessionValue > clsValue) {
          clsValue = sessionValue;
          clsEntries = sessionEntries;
        }
        sessionEntries = [entry];
        sessionValue = (entry as any).value;
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

export const getLCP = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    const getRating = (value: number): 'good' | 'needs-improvement' | 'poor' => {
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    };

    onPerfEntry?.({
      name: 'LCP',
      value: lastEntry.renderTime || lastEntry.loadTime,
      rating: getRating(lastEntry.renderTime || lastEntry.loadTime),
      delta: lastEntry.renderTime || lastEntry.loadTime,
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

export const getFID = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const getRating = (value: number): 'good' | 'needs-improvement' | 'poor' => {
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      };

      onPerfEntry?.({
        name: 'FID',
        value: (entry as any).processingDuration,
        rating: getRating((entry as any).processingDuration),
        delta: (entry as any).processingDuration,
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
