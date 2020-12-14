import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from 'react-i18next';
import './CreateTreeForm.scss';

import { CREATE_TREE, GET_ALL_LANGUAGES } from "../../queries/forest";

const CreateTreeForm = () => {
  const { t, i18n } = useTranslation();
  let history = useHistory();

  const nameRef = useRef(null);
  const sourceLangRef = useRef(null);
  const targetLangRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState("");

  const { loading: loadingLanguages, error, data } = useQuery(GET_ALL_LANGUAGES);

  const [importTreeMutation, { loading }] = useMutation(CREATE_TREE, {
    onError(error) {
      setFormError(error.message);
    },
    onCompleted() {
      history.push("/my-forest");
    },
  });

  if (loadingLanguages) return <div>Loading languages...</div>;
  if (error) return <div>Error obtaining languages</div>;

  const HandleSubmit = async (event) => {
    setFormError("");
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    setValidated(true);

    if (sourceLangRef.current.value === targetLangRef.current.value) {
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

        {data &&
          <>
            <Form.Group controlId="formBasicSourceLang">
              <Form.Label>Idioma origen</Form.Label>
              <Form.Control
                as="select"
                name="sourceLang"
                placeholder="Lengua origen"
                defaultValue={i18n.language}
                ref={sourceLangRef}
                required
              >
                {data.getAllLanguages.map((language) => {
                  return <option key={language.id} value={language.id}>{t('languages.codes.' + language.code)}</option>
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor introduzca un email válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicTargetLang">
              <Form.Label>Idioma a practicar</Form.Label>
              <Form.Control
                as="select"
                name="targetLang"
                placeholder="Lengua destino"
                defaultValue={i18n.language}
                ref={targetLangRef}
                required
              >
                {data && data.getAllLanguages.map((language) => {
                  return <option key={language.id} value={language.id}>{t('languages.codes.' + language.code)}</option>
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
          </>
        }
      </Form>
    </Container>
  );
};

export default CreateTreeForm;
