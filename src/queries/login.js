import { gql } from "@apollo/client";

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

export default LOGIN_USER_QUERY;