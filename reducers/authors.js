export const authorsReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_AUTHORS":
            return [...action.payload]
        default:
            return state
    }
}

export const authorReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_AUTHOR":
            return {...action.payload}
        default:
            return state
    }
}