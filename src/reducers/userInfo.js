import { SAVE_USER_INFO } from "../actions/userInfo"

const initialState = {
    user: null,
}

const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_INFO:
            return { ...state, user: action.user }
        default:
            return state
    }
}

export default userInfo