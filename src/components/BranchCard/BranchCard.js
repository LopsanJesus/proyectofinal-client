import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import "./BranchCard.scss";
import { ProgressBar } from "react-bootstrap";

const BranchCard = ({ branch }) => {
  return (
    <Link to={"/branch/" + branch.id}>
      <Card className="branch">
        <Card.Body>
          <Card.Title>{branch.name}</Card.Title>
          {/* <Card.Text>
            {branch.apples}/{branch.leaves}
          </Card.Text> */}
          <ProgressBar now={branch.apples} max={branch.leaves} label={`${branch.apples}/${branch.leaves}`} />
        </Card.Body>
      </Card>
    </Link>
  );
};

export default BranchCard;
