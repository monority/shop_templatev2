import { reportWebVitals, getCLS, getLCP, getFID } from './webVitals';

export const initWebVitals = () => {
  if (import.meta.env.PROD) {
    getCLS(reportWebVitals);
    getLCP(reportWebVitals);
    getFID(reportWebVitals);
  }
};
