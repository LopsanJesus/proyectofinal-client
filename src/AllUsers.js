import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const ALL_USERS = gql`
  {
    getMe {
      id
      name
      email
    }

    getAllUsers {
      id
      name
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

function AllUsers() {
  const [isLogged, setIsLogged] = useState(0);

  const setIsLoggedState = (val) => {
    setIsLogged(val);
  };

  return (
    <div>
      {isLogged || localStorage.getItem("token") ? (
        <>
          <GetMeInfo /> <LogoutControl func={setIsLoggedState} />
          <AllUsersList />
        </>
      ) : (
        <LoginControl func={setIsLoggedState} />
      )}
    </div>
  );
}

function AllUsersList() {
  const { loading, error, data } = useQuery(ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <p>Users:</p>
      {data.getAllUsers.map(({ id, name, email }) => {
        return (
          <div key={id}>
            <p>
              {name}: {email} (id: {id})
            </p>
          </div>
        );
      })}
    </>
  );
}

function GetMeInfo() {
  const { loading, error, data } = useQuery(ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <strong>You're logged as {data.getMe.name}</strong>;
}

function LoginControl(props) {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_USER, {
    onError(a) {
      console.log(a);
    },
    onCompleted(result) {
      localStorage.setItem("token", result.login.token);
      props.func(true);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>User: llizaz@media.com / password: jesuslo</p>
      <button onClick={() => funcLogin(loginMutation)}>Login</button>
    </div>
  );
}

function LogoutControl(props) {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        props.func(false);
      }}
    >
      Logout
    </button>
  );
}

function funcLogin(prueba) {
  prueba({ variables: { email: "llizaz@media.com", password: "jesuslo" } });
}

export default AllUsers;
