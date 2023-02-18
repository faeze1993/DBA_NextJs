import { DeleteUser, GetAllUsersList, GetRoles } from "../services/userManagementService";
import { errorMessage, successMessage } from "../utils/message";

export const getAllUsersList = (model) => {
    return async dispatch => {
        const { data } = await GetAllUsersList(model);
        await dispatch({ type: "GET_USERSLIST", payload: data });
    }
}


export const getRoles = () => {
    return async dispatch => {
        const { data } = await GetRoles();
        // console.info("data", data);
        await dispatch({ type: "GET_ROLES", payload: data });
    }
}


export const handleDeleteUser = (id) => {
    return async dispatch => {
        const { data } = await DeleteUser(id);
        if (data.Status == "success"){
            successMessage("کاربر با موفقیت حذف شد")
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0,
            }
            await dispatch(getAllUsersList(model));
        } else {
            errorMessage(data.Message)
        }
    }
}
