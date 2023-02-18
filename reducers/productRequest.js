export const productRequestListForPanelReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_AllPRODUCTREQUESTSFORPANEL":
            return {...action.payload }
        default:
            return state
    }
}