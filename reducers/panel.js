export const panelReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_PANELCUSTOMEVALUE":
            return {...action.payload }
        default:
            return state
    }
}

