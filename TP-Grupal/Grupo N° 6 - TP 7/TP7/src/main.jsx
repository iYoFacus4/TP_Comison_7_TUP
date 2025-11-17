import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthStore } from './store/auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
useAuthStore.getState().hydrate();
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <App />
      
    </BrowserRouter>
  </React.StrictMode>
);

