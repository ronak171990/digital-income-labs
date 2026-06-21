import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';

import App from './App.tsx';
import './index.css';

ReactGA.initialize('G-7J99GB543W');

ReactGA.send({
  hitType: 'pageview',
  page: window.location.pathname,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);