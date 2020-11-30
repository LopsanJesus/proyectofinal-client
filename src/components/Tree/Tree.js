import React from "react";
import { useParams } from "react-router-dom";

import BranchList from "../BranchList";

import Container from "react-bootstrap/Container";

import "./Tree.scss";

const Tree = () => {
  const params = useParams();
  return (
    <Container fluid className="Tree">
      <h3>Tree with id {params.id}</h3>
      <BranchList />
    </Container>
  );
};

export default Tree;
