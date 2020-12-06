import React from 'react';
import { Redirect } from 'react-router-dom';
import './Logout.scss';
import { connect } from "react-redux";
import { userLogout } from '../../actions/root';

const Logout = ({ userLogout }) => {
  console.log("Loggin out...")
  localStorage.removeItem("auth-token");
  userLogout();
  return <Redirect to="/login" />;
};

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatchToProps)(Logout);