import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initMobileOptimizations } from './utils/mobileUtils.js'

// Initialize mobile optimizations
initMobileOptimizations()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
