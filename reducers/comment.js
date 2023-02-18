export const commentReducer = (state = [], action) => {
    switch (action.type) {
        case "GET-ARTICLECOMMENT":
            return [...action.payload ]
        default:
            return state
    }
}

export const commentListReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET-COMMENTLIST":
            return {...action.payload }
        default:
            return state
    }
}