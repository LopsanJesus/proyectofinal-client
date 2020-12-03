import React, { useEffect, useRef, useState } from "react";
import "./LoginForm.scss";
import { useMutation } from "@apollo/client";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { saveUserInfo } from "../../actions/userInfo";

import { LOGIN_USER } from "../../queries/user";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useQuery from "../../helpers/paramHelper";

const LoginForm = ({ saveUserInfo }) => {
  const { t } = useTranslation();
  let history = useHistory();
  const params = useParams();
  let query = useQuery();
  // var queryEmail;
  // useEffect(() => {
  //   console.log(query.get('email'));
  //   queryEmail = query.get("email") ? query.get("email") : '';
  //   queryEmail = "aa"
  // }, []);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState("");

  const [loginMutation, { loading }] = useMutation(LOGIN_USER, {
    onError(error) {
      setFormError(error.message);
    },
    onCompleted(result) {
      localStorage.setItem("auth-token", result.login.token);
      saveUserInfo(result.login.user);
      if (params.redirect && params.redirect !== "/logout")
        history.push("/" + params.redirect);
      else history.push("/my-forest");
    },
  });

  const HandleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity()) {
      loginMutation({
        variables: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      });
    }
  };

  if (localStorage.getItem("auth-token")) return <Redirect to="/my-forest" />;

  return (
    <Container as={Col} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }}>
      <Form noValidate validated={validated} onSubmit={HandleSubmit}>
        {formError && <Alert variant="danger">{formError}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>{t('form.email')}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduzca su email"
            ref={emailRef}
            autoComplete="email@domain.com"
            defaultValue={query.get('email') ? query.get('email') : ""}
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
              <div>{t('form.login')}</div>
            )}
        </Button>

        <Form.Group controlId="checkRegistered">
          <Link to="/register">¿No tiene cuenta todavía?(Haga click aquí)</Link>
        </Form.Group>
      </Form>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveUserInfo: (user) => dispatch(saveUserInfo(user)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
