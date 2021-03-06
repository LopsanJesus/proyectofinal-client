import React from "react";

import Card from "react-bootstrap/Card";
import { PlusCircle } from "react-bootstrap-icons";

import "./CreateTreeButton.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CreateTreeButton = () => {
  const { t } = useTranslation();

  return (
    <Card className="createTreeButton">
      <Link to="/create-tree">
        <Card.Body>
          <PlusCircle size={30} className="plusIcon" />
          <Card.Title>{t("treeList.addTree")}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CreateTreeButton;
