import React from 'react'
import ReactDOM from 'react-dom/client'
import AOS from 'aos'
import App from './App.jsx'
import './index.css'

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
