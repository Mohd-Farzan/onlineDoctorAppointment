import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function CheckRoute({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname ==='/forgot-password' || location.pathname==='/reset-password') {
      return <>{children}</>;
    }
    return <Navigate to='/login' replace />;
  }
  if (isAuthenticated) {
    if (user?.role === 'admin'){

      if(location.pathname.includes('/signup')){
        return <>{children}</>;
      }
       
      if (location.pathname.includes('/home') ||location.pathname === '/login'){
        return <Navigate to='/admin/dashboard' />;
      }
    }
    if(user?.role === 'doctor'){
      if(location.pathname.includes('/admin') || location.pathname.includes('/user') || location.pathname === '/login'){
        return <Navigate to='/doctor/dashboard'/>;
      }
      if(location.pathname.includes('/doctor')){
        return <>{children}</>
      }
    }
    if (user?.role === 'user') {
      if (location.pathname.includes('/admin') || location.pathname === '/login' || location.pathname === '/signup') {
        return <Navigate to='/home/welcome' replace />;
        
      }
      if (location.pathname.includes('/home')) {
        return <>{children}</>;
      }
    }
  }
  return <>{children}</>;
}

export default CheckRoute;
