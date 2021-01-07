import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <>
      <h1>404 NotFound</h1>
      <br></br>
      <Button>
        <Link to="/">Take me out of here</Link>
      </Button>
    </>
  );
};

export default NotFound;
