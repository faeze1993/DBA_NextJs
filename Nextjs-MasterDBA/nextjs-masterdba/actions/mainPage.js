import { GetLogImage, GetMainPageAboutUs, GetMainPageKeyWord, GetWebSiteTitle } from "../services/mainpageService";

export const getMainPageAboutUs = () => {
    return async dispatch => {
        const {data} = await GetMainPageAboutUs();
        await dispatch({type: "GET_MAINPAGE", payload:data});
    }
}

export const getLogImage = () => {
    return async dispatch => {
        const {data} = await GetLogImage();
        await dispatch({type: "GET_LOGOIMGE", payload:data});
    }
}

export const getWebSiteTitle = () => {
    return async dispatch => {
        const {data} = await GetWebSiteTitle();
        await dispatch({type: "GET_WEBSITETITLE", payload:data});
    }
}

export const getMainPageKeyWord = () => {
    return async dispatch => {
        const { data } = await GetMainPageKeyWord();
        await dispatch({ type: "GET_MAINPAGEKEYWORD", payload: data });
    };
};