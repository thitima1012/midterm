import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Dashbord from '../pages/Dashbord';
import Register from '../pages/Register';
import Login from '../pages/Login';
import EditProduct from '../pages/Edit';
import AddProduct from '../pages/AddPd';
import { ProductProvider } from '../contexts/financial.context';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'dashbord',
                element: (
                  <ProductProvider>
                    <Dashbord />
                  </ProductProvider>
                ),
              },
            {
                path: 'About',
                element: <About />,
            },
            {
                path: 'register',
                element: <Register />,
            },

            {
                path: 'login',
                element: <Login />,
            },

            
            {
                path: 'profile',
                element: <UserProfilePage />,
            },

            {
                path: 'edit/:id',
                element: <EditProduct />,
            },
            {
                path: 'AddProduct',
                element: <AddProduct />,
            },
            {
                path: 'product/:id',
                element: <Product />,
            },
        ],
    },
]);

export default router;