export const productListReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_AllPRODUCTS":
            return [...action.payload ]
        default:
            return state
    }
}

export const productListForPanelReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_AllPRODUCTSFORPANEL":
            return [...action.payload ]
        default:
            return state
    }
}

export const productValueLabelListReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_PRODUCTVALUELABELLIST":
            return [...action.payload];
        default:
            return state;
    }
}