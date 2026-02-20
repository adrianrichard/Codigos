import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Verificar roles si se especificaron
  if (roles.length > 0 && user && !roles.includes(user.rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;