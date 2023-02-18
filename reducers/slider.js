export const sliderReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_AllSLIDERS":
            return [...action.payload ]
        default:
            return state
    }
}