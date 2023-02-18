export const footerReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_FOOTER":
            return { ...action.payload }
        default:
            return state
    }
}