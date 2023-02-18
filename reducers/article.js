export const articleReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ARTICLE":
            return { ...action.payload }
        default:
            return state
    }
}

export const searchValueReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_SEARCHVALUE":
            return action.payload
        default:
            return state
    }
}

export const responseFromServer = (state = false, action) => {
    switch (action.type) {
        case "GET_RESPONSEFROMSERVER":
            return action.payload
        default:
            return state
    }
}