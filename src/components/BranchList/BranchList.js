import React from "react";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import BranchCard from "../BranchCard";

import "./BranchList.scss";

const BranchList = ({ branches, isImported }) => {
  return (
    <Container fluid className="BranchList">
      {branches.length > 0 ? branches.map((branch) => {
        return <BranchCard key={branch.id} branch={branch} isImported={isImported} />;
      }) :
        <Alert variant="info">No hay ramas que mostrar</Alert>
      }
    </Container>
  );
};

export default BranchList;
