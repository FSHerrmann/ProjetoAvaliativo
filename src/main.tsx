import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { PlacesProvider } from './contexts/PlacesContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PlacesProvider>
          <App />
        </PlacesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
