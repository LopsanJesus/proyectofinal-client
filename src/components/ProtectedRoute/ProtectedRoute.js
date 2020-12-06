import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import "./ProtectedRoute.scss";

const ProtectedRoute = ({
  user,
  children,
  location,
  ...props
}) => {

  if (!user) {
    console.log("if1 de protectedRouyte");
    return <Redirect to={"/login" + location.pathname} />;
  }

  return <Route {...props}>{children}</Route>;
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(ProtectedRoute);
