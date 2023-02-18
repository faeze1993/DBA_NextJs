export const ticketListReducer = (state = [], action) => {
    switch (action.type) {
        case "GET-TICKETLIST":
            return [...action.payload ]
        default:
            return state
    }
}

export const ticketListForPanelReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET-TICKETLISTFORPANEL":
            return {...action.payload }
        default:
            return state
    }
}