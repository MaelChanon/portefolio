import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/global.scss'
import './css/index.scss'
import '@fontsource/rubik/400.css' // Loads weight 400
import '@fontsource/rubik/700.css' // Loads weight 700
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
