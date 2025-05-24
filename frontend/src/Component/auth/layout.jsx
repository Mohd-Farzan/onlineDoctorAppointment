import React from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from '../../../public/images/logo.jpeg';

function Authlayout() {
  return (
    <div className="flex min-h-screen w-full ">
      {/* Apply the correct background image class */}
      <div 
        className="hidden lg:flex items-center justify-center w-full bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }} 
      >
        <div className="max-m-md space-y-5 font-semibold text-4xl text-center">
          
        </div>
      </div>
      <div className="flex items-center justify-center bg-gray-100 w-full px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Authlayout;
