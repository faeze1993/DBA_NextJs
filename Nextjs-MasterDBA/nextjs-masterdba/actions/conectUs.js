import { DeleteConectUs, GetConectUsGridData, UpdateConectISReplied } from "../services/ContentUsService";
import { errorMessage, successMessage } from "../utils/message";

export const getConectUsGridData = (model) => {
    return async dispatch => {
        const { data } = await GetConectUsGridData(model);
        await dispatch({ type: "GET-CONECTUSLIST", payload: data });
    }
}

export const handleUpdateConectISReplied = (id) => {
    return async dispatch => {
        const { data } = await UpdateConectISReplied(id);
        // console.info("data UpdateConectISReplied", data)
        if (data.Status == 'success') {
            successMessage("عملیات با موفقیت انجام شد");
            dispatch(getConectUsGridData());
        }
        else { errorMessage("خطایی رخ داده است") };
    }
}

export const handleConectUsDelete = (id) => {

    return async (dispatch) => {
        try {
            const { status } = await DeleteConectUs(id);
            if (status == 200) successMessage("عملیات با موفقیت انجام شد");
            const token = localStorage.getItem("token");
            await dispatch(getConectUsGridData(token));
        } catch (ex) {
            errorMessage("خطایی رخ داده است");
        }
    }
}