export const aboutpageReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ABOUTPAGE":
            return { ...action.payload }
        default:
            return state
    }
}