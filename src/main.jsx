import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

const redirectPath = new URLSearchParams(window.location.search).get('p');
if (redirectPath) {
  const cleanPath = redirectPath.startsWith('/') ? redirectPath.slice(1) : redirectPath;
  window.history.replaceState(null, '', `${import.meta.env.BASE_URL}${cleanPath}`);
}
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBase}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
