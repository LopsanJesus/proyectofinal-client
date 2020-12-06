import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import "./BranchCard.scss";
import { ProgressBar } from "react-bootstrap";

const BranchCard = ({ branch, isImported }) => {
  return (
    <Link to={"/branch/" + branch.id}>
      <Card className="branch">
        <Card.Body>
          <Card.Title>{branch.name}</Card.Title>
          {/* <Card.Text>
            {branch.apples}/{branch.leaves}
          </Card.Text> */}
          {isImported ?
            <ProgressBar now={branch.numberOfApples} max={branch.numberOfLeaves} label={`${branch.numberOfApples}/${branch.numberOfLeaves}`} />
            : <span>{branch.numberOfLeaves} number of leaves</span>
          }
        </Card.Body>
      </Card>
    </Link>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(BranchCard);
