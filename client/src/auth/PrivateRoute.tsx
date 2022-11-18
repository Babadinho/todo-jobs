import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../middlewares/auth';

const PrivateRoute = ({ children }: any) => {
  const { user, token } = isAuthenticated();

  if (!user && !token) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default PrivateRoute;
