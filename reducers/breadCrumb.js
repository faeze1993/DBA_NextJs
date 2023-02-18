export const breadCrumbReducer = (state = [], action) => {
    switch (action.type) {
        case "BREADCRUMB_LIST":
            localStorage.setItem("breadCrumbList", JSON.stringify([...action.payload]))
            return [...action.payload]
        default:
            return state
    }
}