import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./EmptyLine.scss";

const EmptyLine = ({ number }) => {
  return (
    <Row key={number}>
      <Col>
        <Form.Control type="text" required />
      </Col>
      <Col>
        <Form.Control type="text" required />
      </Col>
    </Row>
  );
};

export default EmptyLine;
