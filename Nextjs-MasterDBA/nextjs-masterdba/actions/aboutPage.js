import { GetAboutPageAboutUs } from "../services/aboutpageService";

export const getAboutPageAboutUs = () => {
    return async dispatch => {
        const { data } = await GetAboutPageAboutUs();
        await dispatch({ type: "GET_ABOUTPAGE", payload: data });
    }
}