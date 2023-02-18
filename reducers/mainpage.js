export const mainpageReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_MAINPAGE":
            return { ...action.payload }
        default:
            return state
    }
}

export const logoImageReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_LOGOIMGE":
            return action.payload
        default:
            return state
    }
}

export const webSiteTitleReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_WEBSITETITLE":
            return action.payload
        default:
            return state
    }
}

export const mainPageKeyWordReduser = (state = [], action) => {
    switch (action.type) {
        case "GET_MAINPAGEKEYWORD":
            return action.payload;
        default:
            return state;
    }
}