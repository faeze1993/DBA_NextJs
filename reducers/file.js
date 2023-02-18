export const fileNodeListReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALLCHILDNODEOFDIRECTORY":
            return {...action.payload}
        default:
            return state
    }
}

export const fileBreadCrumbListReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_FILEBREADCRUMBLIST":
            localStorage.setItem("fileBreadCrumbList", JSON.stringify([...action.payload]))
            return [...action.payload]
        default:
            return state
    }
}