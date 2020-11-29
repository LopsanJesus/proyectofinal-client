import React from 'react';
import { Redirect } from 'react-router-dom';
import './ProtectedRoute.scss';

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem('auth-token')) {
    return <Redirect to="/login" />
  }
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
