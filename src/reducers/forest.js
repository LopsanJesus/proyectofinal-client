import { SAVE_USER_FOREST } from "../actions/forest"

const initialState = {
    trees: [],
}

const forest = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_FOREST:
            return { ...state, trees: action.trees }
        default:
            return state
    }
}

export default forest