import React from "react";

import Card from "react-bootstrap/Card";
import { PlusCircle } from "react-bootstrap-icons";

import "./CreateTreeButton.scss";

const CreateTreeButton = () => {
  return (
    <Card className="createTreeButton">
      <Card.Body>
        <PlusCircle size={30} className="plusIcon" />
        <Card.Title>Add Tree</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CreateTreeButton;
