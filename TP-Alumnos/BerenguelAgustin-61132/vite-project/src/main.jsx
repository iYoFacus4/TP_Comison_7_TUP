import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Importa el BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// 2. Envuelve tu componente <App /> con <BrowserRouter>
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);