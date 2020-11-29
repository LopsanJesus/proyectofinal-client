import React from 'react';
import './LoginForm.scss';
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { saveUserInfo } from '../../actions/userInfo';


const LOGIN_USER_QUERY = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        email
      }
    }
  }
`;

function funcLogin(prueba) {
  prueba({ variables: { email: "llizaz@media.com", password: "jesuslo" } });
}

const LoginForm = ({ saveUserInfo }) => {
  //const [isL = 
  let history = useHistory();

  const [loginMutation, { loading, error }] = useMutation(LOGIN_USER_QUERY, {
    onError(a) {
      console.log(a);
    },
    onCompleted(result) {
      localStorage.setItem("auth-token", result.login.token);
      console.log("Usuario logado correctamente", result.login.user);
      saveUserInfo(result.login.user);
      history.push('/my-forest');
    },
  });

  const HandleSubmit = async (event) => {
    event.preventDefault();
    funcLogin(loginMutation);
  };

  return <div className="LoginForm">
    <Form noValidate /*validated={validated}*/ onSubmit={HandleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Introduzca su email" required />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Acceder
      </Button>
    </Form>
  </div>;
};

const mapDispatchToProps = (dispatch) => ({
  saveUserInfo: (user) => dispatch(saveUserInfo(user)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
