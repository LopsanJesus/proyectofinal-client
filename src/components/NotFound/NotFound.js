import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <>
      <h1>404 NotFound</h1>
      <br></br>
      <Link to="/login">Login</Link>
    </>
  );
};

export default NotFound;
