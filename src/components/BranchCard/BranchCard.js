import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import "./BranchCard.scss";
// import { ProgressBar } from "react-bootstrap";

const BranchCard = ({ user, branch, isImported }) => {
  let numberOfApples = 0;
  branch.leaves.map((leaf) => {
    return numberOfApples += leaf.leafRecords.filter((record) =>
      record.isApple && record.importedTree.userId.id === user.id
    ).length;
  });



  return (
    <Link to={"/branch/" + branch.id}>
      <Card className="branch">
        <Card.Body>
          <Card.Title>{branch.name}</Card.Title>
          <Card.Text>
            {isImported ?
              // <ProgressBar now={numberOfApples} max={branch.leaves.length} label={`${numberOfApples}/${branch.leaves.length}`} />
              <span>{numberOfApples} apples / {branch.leaves.length} leaves</span>
              : <span>{branch.leaves.length} leaves</span>
            }
          </Card.Text>
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
