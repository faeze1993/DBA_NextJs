import { DeleteProductRequest, GetProductRequestGridData, SaveProductRequest, UpdateProductRequestISReplied } from "../services/productRequestService";
import { errorMessage, successMessage } from "../utils/message";

// export const saveProductRequest = () => {
//     return async dispatch => {
//         const { data } = await SaveProductRequest();
//     }
// }

export const getAllProductRequestsForPanel = (model) => {
    return async dispatch => {
        const { data } = await GetProductRequestGridData(model);
        await dispatch({ type: "GET_AllPRODUCTREQUESTSFORPANEL", payload: data });
    }
}

export const updateProductRequestISReplied = (id) => {
    return async dispatch => {
        const { data } = await UpdateProductRequestISReplied(id);
        // console.info("data UpdateConectISReplied", data)
        if (data.Status == 'success') {
            successMessage("عملیات با موفقیت انجام شد");
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0
            }
            dispatch(getAllProductRequestsForPanel(model));
        }
        else { errorMessage("خطایی رخ داده است") };
    }
}

export const deleteProductRequest = (id) => {

    return async (dispatch) => {
        try {
            const { status } = await DeleteProductRequest(id);
            if (status == 200) successMessage("عملیات با موفقیت انجام شد");
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0
            }
            await dispatch(getAllProductRequestsForPanel(model));;
        } catch (ex) {
            errorMessage("خطایی رخ داده است");
        }
    }
}