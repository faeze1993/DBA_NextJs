export const userFileListReducer = (state = [], action) => {
    switch (action.type) {
        case "GET-USERFILELIST":
            return [...action.payload ]
        default:
            return state
    }
}