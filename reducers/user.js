export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...action.payload };
        case "CLEAR-USER":
            return { ...action.payload };
        default:
            return state;
    }
} 

export const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_USERSLIST":
            return {...action.payload};
        default:
            return state;
    }
}

export const rolesReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_ROLES":
            return [...action.payload];
        default:
            return state;
    }
}

