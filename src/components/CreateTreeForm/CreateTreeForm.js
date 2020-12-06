import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Spinner } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { useTranslation } from 'react-i18next';
import './CreateTreeForm.scss';

import { CREATE_TREE } from "../../queries/forest";

const languages = [
  { id: 1, name: "Español" },
  { id: 2, name: "Inglés" },
  { id: 3, name: "Aleman" },
]

const CreateTreeForm = () => {
  const { t, i18n } = useTranslation();
  let history = useHistory();

  const nameRef = useRef(null);
  const sourceLangRef = useRef(null);
  const targetLangRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState("");

  const [importTreeMutation, { loading }] = useMutation(CREATE_TREE, {
    onError(error) {
      setFormError(error.message);
    },
    onCompleted(result) {
      history.push("/my-forest");
    },
  });

  const HandleSubmit = async (event) => {
    setFormError("");
    event.preventDefault();
    event.stopPropagation();

    console.log(parseInt(sourceLangRef.current.value));
    console.log(parseInt(targetLangRef.current.value));

    const form = event.currentTarget;

    setValidated(true);

    if (sourceLangRef.current.value == targetLangRef.current.value) {
      setFormError("Los idiomas no pueden ser el mismo");
      return false;
    }

    if (form.checkValidity()) {
      importTreeMutation({
        variables: {
          name: nameRef.current.value,
          sourceLang: parseInt(sourceLangRef.current.value),
          targetLang: parseInt(targetLangRef.current.value),
        },
      });
    }
  };

  return (
    <Container as={Col} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }}>
      <h3>Crear Nuevo Árbol</h3>

      <Form noValidate validated={validated} onSubmit={HandleSubmit}>
        {formError && <Alert variant="danger">{formError}</Alert>}

        <Form.Group controlId="formBasicName">
          <Form.Label>{t('form.name')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('form.namePlaceholder')}
            ref={nameRef}
            autoComplete="email@domain.com"
            required
          />
          <Form.Control.Feedback type="invalid">
            {t('form.nameFeedback')}
            {/* Por favor introduzca un email válido. */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Idioma origen</Form.Label>
          <Form.Control
            as="select"
            name="sourceLang"
            placeholder="Lengua origen"
            defaultValue={i18n.language}
            ref={sourceLangRef}
            required
          >
            {languages.map((language) => {
              return <option value={language.id}>{language.name}</option>
            })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Por favor introduzca un email válido.
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Idioma a practicar</Form.Label>
          <Form.Control
            as="select"
            name="targetLang"
            placeholder="Lengua destino"
            defaultValue={i18n.language}
            ref={targetLangRef}
            required
          >
            {languages.map((language) => {
              return <option value={language.id}>{language.name}</option>
            })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Por favor introduzca un email válido.
        </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
              <div>Crear</div>
            )}
        </Button>

      </Form>
    </Container>
  );
};

export default CreateTreeForm;
