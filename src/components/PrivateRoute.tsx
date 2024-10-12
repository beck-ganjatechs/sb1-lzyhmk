import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;