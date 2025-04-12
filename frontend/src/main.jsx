import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { HeroUIProvider } from '@heroui/react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <HeroUIProvider>

      <App />    

      </HeroUIProvider>
      </BrowserRouter>
    

  </StrictMode>,
)
