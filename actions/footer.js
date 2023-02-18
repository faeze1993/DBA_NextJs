import { GetFooterContent } from "../services/footerService";

export const getFooterContent = () => {
    return async dispatch => {
        const { data } = await GetFooterContent();
        await dispatch({ type: "GET_FOOTER", payload: data });
    }
}