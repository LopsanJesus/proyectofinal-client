import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import "./BranchCard.scss";

const BranchCard = ({ branch }) => {
  return (
    <Link to={"/branch/" + branch.id}>
      <Card className="branch">
        <Card.Body>
          <Card.Title>{branch.name}</Card.Title>
          <Card.Text>
            {branch.apples}/{branch.leaves}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default BranchCard;
