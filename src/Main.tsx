import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Root from './Root'
import './index.css'
import { initWebVitals } from './utils/initWebVitals'

// Initialize Web Vitals tracking
initWebVitals()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)