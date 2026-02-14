import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// CRITICAL: Import overflow fix BEFORE index.css
import './overflow-fix.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);