export const SAVE_USER_FOREST = "SAVE_USER_FOREST"

export const saveUserForest = trees => {
    return {
        type: SAVE_USER_FOREST,
        trees,
    }
};