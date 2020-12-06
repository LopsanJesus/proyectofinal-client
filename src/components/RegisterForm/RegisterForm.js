import React, { useRef, useState } from "react";
import "./RegisterForm.scss";
import { useMutation } from "@apollo/client";
import { Link, Redirect, useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { REGISTER_USER } from "../../queries/user";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();
  let history = useHistory();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState("");

  const [registerMutation, { loading }] = useMutation(REGISTER_USER, {
    onError(error) {
      setFormError(error.message);
    },
    onCompleted(result) {
      history.push("/login?email=" + result.register.email);
    },
  });

  const HandleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    setValidated(true);

    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      setFormError("Las contraseñas no coinciden");
      return false;
    }

    if (form.checkValidity()) {
      registerMutation({
        variables: {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      });
    }
  };

  if (localStorage.getItem("auth-token")) return <Redirect to="/my-forest" />;

  return (
    <Container as={Col} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }}>
      <h3>{t('registerTitle')}</h3>

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
          <Form.Label>{t('form.email')}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduzca su email"
            ref={emailRef}
            autoComplete="email@domain.com"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor introduzca un email válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>{t('form.password')}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            ref={passwordRef}
            autoComplete="a-strong-password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor introduzca su contraseña.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>{t('form.confirmPassword')}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmar contraseña"
            ref={confirmPasswordRef}
            autoComplete="a-strong-password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Contraseña diferente.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
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
                <div>{t('form.register')}</div>
              )}
          </Button>
        </Form.Group>

        <Form.Group controlId="checkRegistered">
          <Link to="/login">
            <Button variant="outline-primary">
              ¿Ya tiene cuenta?
            </Button>
          </Link>
        </Form.Group>

      </Form>
    </Container>
  );
};

export default RegisterForm;
