import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routers/Router';
import { RouterProvider } from 'react-router-dom';
import { ProductProvider } from './contexts/';
import { AuthProvider } from './contexts/auth.context';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
