import { GetArticle,GetArticlesForEdit, SaveArticleVisit, ToggleEnable } from "../services/articleService"
import { successMessage } from "../utils/message";
import { getArticlesForDashboard } from "./articles";

export const getSingleArticle = (articleId) => {
    return async dispatch => {
        const { data } = await GetArticle(articleId);
        // console.info("data-action", data);
        await dispatch({ type: "GET_ARTICLE", payload: data.Article });
        await dispatch({ type: "GET_RESPONSEFROMSERVER", payload: data.testfromserver });
    }
}

export const getArticlesForEdit = (articleId) => {
    return async dispatch => {
        const { data } = await GetArticlesForEdit(articleId);
        // console.info("data-action", data);
        await dispatch({ type: "GET_ARTICLE", payload: data });
    }
}

export const saveArticleVisit = (articleId) => {
    return async dispatch => {
        await SaveArticleVisit(articleId);
    }
}

export const setSearchValue = (text) => {
    return async dispatch => {
        await dispatch({ type: "SET_SEARCHVALUE", payload: text });
    }
}

export const toggleEnable = (id, parentId, paginatModel) => {
    return async dispatch => {
        const {data} =  await ToggleEnable(id);
        if (data == 200) successMessage("عملیات با موفقیت انجام شد");
        await  dispatch(getArticlesForDashboard(parentId,paginatModel));
    }
}