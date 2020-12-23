import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <>
      404 NotFound
      <br></br>
      <Link to="/login">Login</Link>
    </>
  );
};

export default NotFound;
