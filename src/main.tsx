import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (typeof window !== 'undefined') {
  console.info(
    '%c ⚡ Engineered by SHUNYA-LABS %c https://shunya-labs.com ',
    'background:#101010;color:#d2ff28;font-family:monospace;font-weight:700;padding:4px 8px;border:1px solid #d2ff28;border-radius:4px 0 0 4px;',
    'background:#181818;color:#ffffff;font-family:monospace;padding:4px 8px;border:1px solid #333333;border-left:none;border-radius:0 4px 4px 0;'
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
