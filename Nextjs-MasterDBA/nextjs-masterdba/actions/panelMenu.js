import { GetPanelMenuList, GetPanelMenuOnUserRole, UpdatePanelMenu } from "../services/PanelMenuService";
import { errorMessage, successMessage } from "../utils/message";



export const getPanelMenuOnUserRole = () => {
    return async dispatch => {
        const {data} = await GetPanelMenuOnUserRole();
        await dispatch({type: "GET_PANELMENUONUSERROLE", payload:data});
    }
}

export const getPanelMenuListForTable = (model) => {
    return async dispatch => {
        const {data} = await GetPanelMenuList(model);
        await dispatch({type: "GET_PANELMENULIST", payload:data});
    }
}

export const updatePanelMenu = (model) => {
    return async (dispatch, getState) => {

        try {
            const { data } = await UpdatePanelMenu(model);
            if (data.Status == "success") {
                successMessage("عملیات با موفقیت انجام شد");
                const token = localStorage.getItem("token");
                await dispatch(getPanelMenuListForTable(token));
                await dispatch({
                    type: "UPDATE_SLIDER",
                    payload: [...getState().slider]
                })
            }
            else {
                errorMessage("ثبت منو با خطا مواجه شد");
            }

        } catch (ex) {
            errorMessage("ثبت منو با خطا مواجه شد");
        }
    }
}
