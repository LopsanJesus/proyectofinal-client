import React from 'react';
import { Redirect } from 'react-router-dom';
import './ProtectedRoute.scss';

const ProtectedRoute = ({ children, location }) => {
  console.log(children);
  if (!localStorage.getItem('auth-token')) {
    return <Redirect to={"/login" + location.pathname} />
  }
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
