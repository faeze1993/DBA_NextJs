export const panelMenuReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_PANELMENUONUSERROLE":
            return [...action.payload]
        default:
            return state
    }
}

export const panelMenuListReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_PANELMENULIST":
            return [...action.payload]
        default:
            return state
    }
}