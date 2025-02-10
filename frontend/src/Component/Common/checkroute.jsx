import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function CheckRoute({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname==='/forgotPassword') {
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
