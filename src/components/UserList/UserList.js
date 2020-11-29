import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import './UserList.scss';

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


function UserList() {
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
          <div>Login</div>
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


export default UserList;