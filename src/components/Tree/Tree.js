import React from "react";

import ReactCountryFlag from "react-country-flag";

import Card from "react-bootstrap/Card";

import "./Tree.scss";

const Tree = ({ tree }) => {
  return (
    <Card className="tree">
      <Card.Body>
        <div className="tree-icon">
          <Card.Img variant="top" src="./tree-icon.png" />
        </div>
        <div className="title-and-flag">
          <Card.Title>{tree.name}</Card.Title>
          <div className="country-flag">
            <ReactCountryFlag
              countryCode={tree.language}
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
        <small className="text-muted">Creado por: {tree.owner}</small>
      </Card.Footer>
    </Card>
  );
};

export default Tree;
