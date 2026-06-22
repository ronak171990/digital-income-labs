import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';

import App from './App.tsx';
import './index.css';

// Google Analytics
ReactGA.initialize('G-7J99GB543W');

ReactGA.send({
  hitType: 'pageview',
  page: window.location.pathname,
});

// Render App only once
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);