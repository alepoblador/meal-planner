import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Shim window.storage (used by the app) with localStorage for local dev.
// In the Claude.ai artifact environment this is provided natively.
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      const value = localStorage.getItem(key)
      if (value === null) throw new Error('not found')
      return { key, value }
    },
    set: async (key, value) => {
      localStorage.setItem(key, String(value))
      return { key, value }
    },
    delete: async (key) => {
      localStorage.removeItem(key)
      return { key, deleted: true }
    },
    list: async (prefix = '') => {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix))
      return { keys, prefix }
    },
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
