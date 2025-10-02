/**
 * Application entry point.
 * Renders the root <App /> component inside React's <StrictMode>.
 * Wraps the app with <AuthProvider> to supply authentication context globally.
 * The app is mounted to the DOM element with id="root".
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/Auth/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
