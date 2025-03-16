import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
/*AuthProvider lo ponemos aqui para que envuelva toda la app y desde cualquier punto los componentes pueden
usar el useContext AuthProvider */