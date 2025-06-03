// AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from '../../../public/images/logo.jpeg';

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Left Side - Background Image */}
      <div 
        className="hidden lg:flex items-center justify-center w-1/2 relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-120 animate-zoom-pulse"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-blue-700/25"></div>
        </div>
        
        <div className="relative max-w-md space-y-5 p-8 mt-60 pt-40 z-10">
          <h2 className="text-5xl font-bold text-indigo-600/60 drop-shadow-lg animate-fade-in-down">
            Welcome to Pulse Care
          </h2>
          <p className="text-xl text-slate-100 font-light mt-4 animate-fade-in-down animate-delay-100">
            Your journey to better healthcare starts here
          </p>
        </div>
      </div>
      
      {/* Right Side - Form Content */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
          <div className="p-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;