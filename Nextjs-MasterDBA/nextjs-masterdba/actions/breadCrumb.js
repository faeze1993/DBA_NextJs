import { GetBreadCrumbListOnArticleId } from "../services/breadCrumService";

export const setBreadCrumbList = (data) => {
    return async dispatch => {
        await dispatch({ type: "BREADCRUMB_LIST", payload: data });
    }
}

export const getBreadCrumbListOnArticleId = (id) => {
    return async dispatch => {
        const {data} = await GetBreadCrumbListOnArticleId(id);
        await dispatch({type: "BREADCRUMB_LIST", payload:data});
    }
}