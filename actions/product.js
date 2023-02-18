import { DeleteProduct, EditProduct, GetAllProduct,GetProductList, InsertProduct,GetAllProductsForPanel } from "../services/productService";
import { errorMessage, successMessage } from "../utils/message";


export const getAllProducts = () => {
    return async dispatch => {
        const { data } = await GetAllProduct();
        await dispatch({ type: "GET_AllPRODUCTS", payload: data });
    }
}

export const getProductList = () => {
    return async dispatch => {
        const { data } = await GetProductList();
        await dispatch({ type: "GET_PRODUCTVALUELABELLIST", payload: data });
    }
}

export const getAllProductsForPanel = (model) => {
    return async dispatch => {
        const { data } = await GetAllProductsForPanel(model);
        await dispatch({ type: "GET_AllPRODUCTSFORPANEL", payload: data });
    }
}


export const insertProduct = product => {
    return async (dispatch) => {
        const { data } = await InsertProduct(product);
        if (data.Status == "success") {
            successMessage("عملیات با موفقیت انجام شد");
            await dispatch(getAllProductsForPanel());
        } else {
            errorMessage("ثبت محصول با خطا مواجه شد");
        }

    }
}

export const editeProduct = (updatedProduct) => {
    return async (dispatch) => {
        try {
            const { data } = await EditProduct(updatedProduct);
            if (data.Status == "success") {
                successMessage("عملیات با موفقیت انجام شد");
                await dispatch(getAllProductsForPanel());
            }
            else {
                errorMessage("ثبت محصول با خطا مواجه شد");
            }

        } catch (ex) {
            
        }
    }
}

export const deleteProduct = productId => {
    return async (dispatch) => {
        try {

            const { status } = await DeleteProduct(productId);
            // console.info("status delete",status);
            if (status == 200) successMessage("عملیات با موفقیت انجام شد");
            await dispatch(getAllProductsForPanel());
        } catch (ex) {
            
        }
    }
}