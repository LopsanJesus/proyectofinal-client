import React from "react";
import { Redirect } from "react-router-dom";
import "./App.scss";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import About from "./components/About";
import Discover from "./components/Discover";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Branch from "./components/Branch";
import TopBar from "./components/TopBar";
import MyForest from "./components/MyForest";
import MyHistory from "./components/MyHistory";
import Practice from "./components/Practice";
import Tree from "./components/Tree";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import "./config/i18n";
import SafetyChecker from "./SafetyChecker";
import CreateTreeForm from "./components/CreateTreeForm";
import CreateBranchForm from "./components/CreateBranchForm";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      ...headers,
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
        <SafetyChecker>
          <Router>
            <div className="router">
              <TopBar />

              <div className="content">
                <Switch>
                  <ProtectedRoute path="/practice/:id">
                    <Practice />
                  </ProtectedRoute>

                  <Route path="/discover">
                    <Discover />
                  </Route>
                  <ProtectedRoute exact path="/my-forest">
                    <MyForest />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/my-history">
                    <MyHistory />
                  </ProtectedRoute>

                  <ProtectedRoute exact path="/create-tree">
                    <CreateTreeForm />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/create-branch/:treeId">
                    <CreateBranchForm />
                  </ProtectedRoute>

                  <Route path="/tree/:id">
                    <Tree />
                  </Route>
                  <Route path="/branch/:id">
                    <Branch />
                  </Route>

                  <ProtectedRoute exact path="/profile">
                    <Profile />
                  </ProtectedRoute>
                  <Route exact path="/about">
                    <About />
                  </Route>

                  <Route path="/login/:redirect?">
                    <LoginForm />
                  </Route>
                  <Route path="/register">
                    <RegisterForm />
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
            </div>
          </Router>
        </SafetyChecker>
      </div>
    </ApolloProvider>
  );
}

export default App;
