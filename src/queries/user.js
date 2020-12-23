import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

export const GET_ME = gql`
  {
    getMe {
      id
      name
      email
    }
  }
`;
