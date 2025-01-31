import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function CheckRoute({ isAuthenticated, user, children }) {
  const location = useLocation();
  const navigate=useNavigate

  if (!isAuthenticated) {
    // Allow unauthenticated users to access login or signup pages
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname==='/forgotPassword') {
      return <>{children}</>;
    }
    // Redirect all other unauthenticated users to the login page
    return <Navigate to='/login' replace />;
  }

  // If user is authenticated
  if (isAuthenticated) {
    // Admin-specific route handling
    if (user?.role === 'admin') {
      // Redirect admins from home or auth pages to admin dashboard
      if (location.pathname.includes('/home') || location.pathname === '/login' || location.pathname === '/signup') {
        return <Navigate to='/admin/dashboard' replace />;
      }
    }
    
    // User-specific route handling
    if (user?.role === 'user') {
      // Redirect users from admin routes or auth pages to home
      if (location.pathname.includes('/admin') || location.pathname === '/login' || location.pathname === '/signup') {
        return <Navigate to='/home/welcome' replace />;
        
      }
      // Allow users to access home routes
      if (location.pathname.includes('/home')) {
        return <>{children}</>;
      }
    }
  }

  // If the route is allowed, render children
  return <>{children}</>;
}

export default CheckRoute;
