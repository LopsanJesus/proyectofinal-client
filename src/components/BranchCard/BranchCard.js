import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import "./BranchCard.scss";
import { useTranslation } from "react-i18next";

const BranchCard = ({ user, branch, isImported }) => {
  const { t } = useTranslation();
  let numberOfApples = 0;

  user && branch.leaves.map((leaf) => {
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
              <span>{numberOfApples + " " + t('branch.apples') + " / " + branch.leaves.length + " " + t('branch.leaves')}</span>
              : <span>{branch.leaves.length + " " + t('branch.leaves')}</span>
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
