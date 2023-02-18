export const conectUsListReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET-CONECTUSLIST":
            return {...action.payload }
        default:
            return state
    }
}