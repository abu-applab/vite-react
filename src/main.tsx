// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./i18n";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./lib/auth/masalnstance";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <MsalProvider instance={msalInstance} >
    <GoogleOAuthProvider clientId="878919019759-0mff0fib1a18jp3kvscvlvi96lohl2fc.apps.googleusercontent.com">
      <AppProvider>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>
  </MsalProvider>
  // </StrictMode>,
)
