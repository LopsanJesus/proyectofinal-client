import React, { useRef, useState } from "react";
import "./LoginForm.scss";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useQuery from "../../helpers/paramHelper";

import { connect } from "react-redux";
import { saveUserInfo } from "../../actions/userInfo";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/user";

import { Alert, Spinner, Col, Container, Form, Button } from "react-bootstrap";

const LoginForm = ({ user, saveUserInfo }) => {
  const { t } = useTranslation();
  let history = useHistory();
  const params = useParams();
  let query = useQuery();

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

  if (user) return <Redirect to="/my-forest" />;

  return (
    <Container as={Col} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }}>
      <Form noValidate validated={validated} onSubmit={HandleSubmit}>
        {formError && <Alert variant="danger">{formError}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>{t("form.email")}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduzca su email"
            ref={emailRef}
            autoComplete="email@domain.com"
            defaultValue={query.get("email") ? query.get("email") : ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor introduzca un email válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>{t("form.password")}</Form.Label>
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
              <div>{t("form.login")}</div>
            )}
          </Button>
        </Form.Group>

        <Form.Group controlId="needAccount" className="needAccount">
          <Link to="/register">
            <Button variant="outline-primary">¿No tiene cuenta todavía?</Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveUserInfo: (user) => dispatch(saveUserInfo(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
