import React from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import rootReducer from "../reducers";

const wrapHoc = (component, initialState = {}, mocks = []) => {
  const store = createStore(rootReducer, initialState);
  return (
    <Provider store={store}>
      <MockedProvider mocks={mocks} addTypename={false}>
        {component}
      </MockedProvider>
    </Provider>
  );
};

export default wrapHoc;
