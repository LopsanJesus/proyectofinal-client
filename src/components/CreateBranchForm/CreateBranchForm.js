import React, { useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { useParams } from 'react-router-dom';
import appConfig from "../../config/app";

import './CreateBranchForm.scss';

const EmptyLine = () => {
  return (<Row>
    <Col>
      <Form.Control
        type="text"
        required
      />
    </Col>
    <Col>
      <Form.Control
        type="text"
        required
      />
    </Col>
  </Row>);
}

const CreateBranchForm = () => {
  // const { t } = useTranslation();
  // const params = useParams();

  const emailRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [formError, /*setFormError*/] = useState("");
  const [fields, setFields] = useState([]);

  const HandleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity()) {
      const confirmation = window.confirm("¿Está seguro? Esta acción no se puede deshacer.");
      return confirmation;
      // loginMutation({
      //   variables: {
      //     email: emailRef.current.value,
      //     password: passwordRef.current.value,
      //   },
      // });
    }
  };

  const addNewLine = () => {
    console.log(fields);
    const array = fields;
    array.push(<EmptyLine />);
    setFields(array);
  };

  for (let index = 0; index < appConfig.minimumNumberOfLeaves; index++) {
    fields.push(<EmptyLine />);
  }

  return (
    <Container as={Col} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>

      <Form noValidate validated={validated} onSubmit={HandleSubmit}>
        {formError && <Alert variant="danger">{formError}</Alert>}

        <Form.Group as={Row} controlId="formBasicName">
          <Form.Label>Nombre Nueva Rama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca el nombre"
            ref={emailRef}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor introduzca un nombre válido.
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} controlId="formBasicName">
          <Form.Label as={Col}>Palabra</Form.Label>
          <Form.Label as={Col}>Traducción</Form.Label>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          {
            fields.map((line) => {
              return line
            })
          }
        </Form.Group>

        <Form.Group as={Row}>
          <Col>
            <Button variant="secondary" onClick={addNewLine}>Añadir línea</Button>
          </Col>
        </Form.Group>

        <Form.Group>
          <Button variant="primary" type="submit">
            {/*loading*/false ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
                <div>Crear Rama</div>
              )}
          </Button>
        </Form.Group>

      </Form>
    </Container>
  );
};

export default CreateBranchForm;
