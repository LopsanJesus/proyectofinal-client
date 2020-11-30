import { gql } from "@apollo/client";

export const LOGIN_USER_QUERY = gql`
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

export const GET_ME = gql`
  {
    getMe {
      name
      email
    }
  }
`;
