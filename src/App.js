import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import config from "./config";
import { setContext } from "@apollo/client/link/context";
import AllUsers from "./AllUsers";
import About from "./About";
import Home from "./Home";
import Profile from "./components/profile";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  //const token = "eyJhbGciOiJIUzI1NiIsInR5cI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsbGl6YXpAbWVkaWEuY29tIiwiaWF0IjoxNjA1NzUwNjQ5LCJleHAiOjE2MDU4MzcwNDl9.83kcHbV-TcruZ3UFuEiXtl9jHwrTfOCK-uB7TY120wI";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      //authorization: token ? `Bearer ${token}` : "",
      Authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1 style={{ color: config.titleColor }}> {config.title} </h1>
        <Router>
          <div className="router">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <AllUsers />
                <br></br>
                <br></br>
                <Link to="/" className="back-home">Back home</Link>
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
