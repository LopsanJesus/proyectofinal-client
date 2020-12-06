import React from "react";
import Container from "react-bootstrap/Container";

import BranchCard from "../BranchCard";

import "./BranchList.scss";

const BranchList = ({ branches, isImported }) => {
  return (
    <Container fluid className="BranchList">
      {branches.map((branch) => {
        return <BranchCard key={branch.id} branch={branch} isImported={isImported} />;
      })}
    </Container>
  );
};

export default BranchList;
