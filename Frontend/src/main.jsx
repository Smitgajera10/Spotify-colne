
import { createRoot } from 'react-dom/client'
import {CookiesProvider} from "react-cookie"
import './index.css'
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  
  <CookiesProvider>
    <App />
  </CookiesProvider>
)
