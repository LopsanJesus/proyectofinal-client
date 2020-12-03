import { combineReducers } from "redux"
import { USER_LOGOUT } from "../actions/root"

import userInfo from "./userInfo"
import forest from "./forest"

const appReducer = combineReducers({
    userInfo,
    forest
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT)
        state = undefined
    return appReducer(state, action)
}

export default rootReducer