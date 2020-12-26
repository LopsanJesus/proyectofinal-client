import { combineReducers } from "redux";
import { USER_LOGOUT } from "../actions/root";

import userInfo from "./userInfo";

const appReducer = combineReducers({
  userInfo,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
