import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './context/AuthContext'
import { ThemeContextProvider } from './context/ThemeContext'
import { NotificationContextProvider } from './context/NotificationContext'
import App from './App.jsx'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <NotificationContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
