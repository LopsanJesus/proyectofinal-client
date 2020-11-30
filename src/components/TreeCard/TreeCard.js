import React from "react";
import { Link } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";

import Card from "react-bootstrap/Card";

import "./TreeCard.scss";

const TreeCard = ({ tree }) => {
  return (
    <Link to={"/tree/" + tree.id}>
      <Card className="tree">
        <Card.Body>
          <div className="tree-icon">
            <Card.Img variant="top" src="./tree-icon.png" />
          </div>
          <div className="title-and-flag">
            <Card.Title>{tree.customName}</Card.Title>
            <div className="country-flag">
              <ReactCountryFlag
                countryCode={tree.treeId.targetLang.code}
                svg
                style={{
                  width: "3em",
                  height: "3em",
                }}
              />
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted" title={tree.treeId.owner.email}>Creado por: {tree.treeId.owner.name}</small>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default TreeCard;
