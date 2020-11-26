import { SELECT_CHARACTERS, RESET_CHARACTERS } from "../actions/characters"

const initialState = {
    characters: [],
}

const characters = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CHARACTERS:
            const characters = ["a", "b", "c"]
            return { ...state, characters: characters }

        case RESET_CHARACTERS:
            return { ...initialState }

        default:
            return state
    }
}

export default characters

export const getCharacters = state => state.characters

export const getCharactersLength = state => state.characters.characters.length