import React from "react";
import Container from "react-bootstrap/Container";

import BranchCard from "../BranchCard";

import "./BranchList.scss";

const branchList = [
  { id: 1, name: "branch1", apples: 12, leaves: 15 },
  { id: 2, name: "branch2", apples: 12, leaves: 15 },
  { id: 3, name: "branch3", apples: 12, leaves: 15 },
  { id: 4, name: "branch4", apples: 12, leaves: 15 },
];

const BranchList = () => {
  return (
    <Container fluid className="BranchList">
      {branchList.map((branch) => {
        return <BranchCard key={branch.id} branch={branch} />;
      })}
    </Container>
  );
};

export default BranchList;
