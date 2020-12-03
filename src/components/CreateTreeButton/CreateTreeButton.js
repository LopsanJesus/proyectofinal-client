import React from "react";

import Card from "react-bootstrap/Card";
import { PlusCircle } from "react-bootstrap-icons";

import "./CreateTreeButton.scss";
import { useTranslation } from "react-i18next";

const CreateTreeButton = () => {
  const { t } = useTranslation();

  return (
    <Card className="createTreeButton">
      <Card.Body>
        <PlusCircle size={30} className="plusIcon" />
        <Card.Title>{t('treeList.addTree')}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CreateTreeButton;
