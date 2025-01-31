import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/deepSeek/app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
