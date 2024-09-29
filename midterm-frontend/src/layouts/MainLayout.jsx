import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const MainLayout = () => {
  const location = useLocation();
  const showSidebar = location.pathname === '/dashboard'; 

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>
      <main className="flex flex-1 mt-1 pt-16">
        {showSidebar && (
          <div className="fixed top-0 left-0 w-80 bg-gray-200 p-4 border-r border-gray-300 shadow-lg z-40">
            <Sidebar />
          </div>
        )}
        <div className={`flex-1 p-4 bg-gray-100 ${showSidebar ? 'ml-80' : ''}`}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;