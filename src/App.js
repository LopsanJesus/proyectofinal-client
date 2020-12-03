import React from "react";
import { Redirect } from "react-router-dom";
import "./App.scss";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import About from "./components/About";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Branch from "./components/Branch";
import TopBar from "./components/TopBar";
import TreeList from "./components/TreeList";
import Tree from "./components/Tree";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import "./config/i18n";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("auth-token");
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
        <Router>
          <div className="router">
            <TopBar />

            <div className="content">
              <Switch>
                <ProtectedRoute exact path="/my-forest">
                  <TreeList />
                </ProtectedRoute>
                <ProtectedRoute path="/tree/:id">
                  <Tree />
                </ProtectedRoute>
                <ProtectedRoute path="/branch/:id">
                  <Branch />
                </ProtectedRoute>
                <ProtectedRoute exact path="/profile">
                  <Profile />
                </ProtectedRoute>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route path="/login/:redirect?">
                  <LoginForm />
                </Route>
                <ProtectedRoute exact path="/logout">
                  <Logout />
                </ProtectedRoute>
                <Route exact path="/">
                  <Home />
                </Route>
                <NotFound />
                <Redirect to="/" />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
