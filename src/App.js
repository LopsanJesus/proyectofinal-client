import React from "react";
import "./App.scss";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AllUsers from "./AllUsers";
import About from "./components/about";
import Home from "./components/Home";
import Profile from "./components/profile";
import TopBar from "./components/TopBar";
import TreeList from "./components/TreeList";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
        <Router>
          <div className="router">
            <TopBar />

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div className="content">
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/users">
                  <AllUsers />
                  <br></br>
                  <br></br>
                  <Link to="/" className="back-home">
                    Back home
                  </Link>
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/my-trees">
                  <TreeList />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
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
