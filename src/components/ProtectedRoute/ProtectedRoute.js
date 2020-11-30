import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './ProtectedRoute.scss';
import { GET_ME } from '../../queries/login';
import { useQuery } from '@apollo/client';
import { saveUserInfo } from '../../actions/userInfo';

import Logout from "../Logout";

const ProtectedRoute = ({ user, saveUserInfo, children, location }) => {
  const { loading, error, data } = useQuery(GET_ME);

  if (!localStorage.getItem('auth-token')) {
    return <Redirect to={"/login" + location.pathname} />
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <Logout />;

  if (!user) {
    saveUserInfo({
      ...data.getMe
    });
  }

  return (
    <>
      {children}
    </>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user
  }
};

const mapDispatchToProps = (dispatch) => ({
  saveUserInfo: (user) => dispatch(saveUserInfo(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
