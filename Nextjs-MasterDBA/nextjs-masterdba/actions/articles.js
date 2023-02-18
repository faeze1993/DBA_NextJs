import { deleteArticle, editArticle, getAllArticlesForDashboard,GetArticlesForDashboardUsingSearch, 
    GetAllArticlesForArchive,GetArticlesForArchiveBySearch,SaveArticle ,GetArticleTypes, GetAllArticleMenu,
     GetAllArticlesForMainPage, GetAllArticlesOnAuthrId, GetAllArticlesForDropdown} from "../services/articleService"
import { errorMessage, successMessage } from "./../utils/message"

export const getArticlesForDashboard = (id, model) => {
    return async dispatch => {
        const { data } = await getAllArticlesForDashboard(id,model);
        await dispatch({ type: "GET-ARTICLESFORDASHBOARD", payload: data });
    };
};

export const getArticlesForDashboardUsingSearch = (text, paginatemodel) => {
    return async dispatch => {
        const { data } = await GetArticlesForDashboardUsingSearch(text,paginatemodel);
        await dispatch({ type: "GET-ARTICLESFORDASHBOARD", payload: data });
    };
};

export const getArticlesForArchive = (model) => {
    return async dispatch => {
        const { data } = await GetAllArticlesForArchive(model);
        await dispatch({ type: "INIT", payload: data });
    };
};

export const getAllArticlesForDropdown = (model) => {
    return async dispatch => {
        const { data } = await GetAllArticlesForDropdown(model);
        await dispatch({ type: "ARTICLEDROPDOWNLIST", payload: data });
    };
};

export const getArticlesForArchiveBySearch = (text) => {
    return async dispatch => {
        const { data } = await GetArticlesForArchiveBySearch(text);
        await dispatch({ type: "INIT", payload: data });
    };
};

export const getAllArticlesOnAuthrId = (model) => {
    return async dispatch => {
        const { data } = await GetAllArticlesOnAuthrId(model);
        await dispatch({ type: "GET_AUTHORARTICLES", payload: data });
        await dispatch({ type: "GET_RESPONSEFROMSERVER", payload: data.ResponsFromServer });
    };
}; 
export const getArticlesForMainPage = () => {
    return async dispatch => {
        const { data } = await GetAllArticlesForMainPage();
        await dispatch({ type: "GET-ARTICLESFORMAINPAGE", payload: data });
    };
};

export const getArticleTypes = () => {
    return async dispatch => {
        const { data } = await GetArticleTypes();
        await dispatch({ type: "GET_ARTICLETYPE", payload: data });
    };
};

export const saveArticle = (article,parentId) => {
    return async (dispatch, getState) => {
        const { data } = await SaveArticle(article);
        console.info("data 5555",data);
        if (data.Status == "success") successMessage("عملیات با موفقیت انجام شد")
        else errorMessage("خطایی رخ داده است")
        var model = {
            perpage: 10,
            currntpage: 1,
            skip: 0
        }
        await dispatch(getArticlesForDashboard(parentId,model));
        // await dispatch({
        //     type: "ADD_ARTICLE",
        //     payload: [...getState().articlesForDashboard]
        // })
    }
}

export const updateArticle = ( updatedArticle,parentId) => {
    return async (dispatch, getState) => {
        // const articles = [...getState().articlesForDashboard];
        // const filteredArticles = articles.filter(article => article.Id == articleId);

        try {
            const { data } = await editArticle(updatedArticle);
            if (data.Status == "success") successMessage("عملیات با موفقیت انجام شد");
            else errorMessage("خطایی رخ داده است");
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0
            }
            // console.info("updatedArticle",parentId);
            await dispatch(getArticlesForDashboard(parentId, model));
            // await dispatch({
            //     type: "UPDATE_ARTICLE",
            //     payload: [...getState().articlesForDashboard]
            // })

        } catch (ex) {
            // await dispatch({ type: "UPDATE_ARTICLE", payload: [...articles] })
        }
    }
}

export const handleArticleDelete = (articleId,parentId) => {
    return async (dispatch, getState) => {
        // const articles = [...getState().articlesForDashboard];
        // const filteredArticles = articles.filter(article => article.Id != articleId);

        try {
            // await dispatch({ type: "DELETE_ARTICLE", payload: [...filteredArticles] });
            const { data } = await deleteArticle(articleId);
            console.info("status delete",data)
            if (data.Status == 'success') successMessage("عملیات با موفقیت انجام شد");
            else errorMessage("خطایی رخ داده است")
            const token = localStorage.getItem("token");
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0
            }
            await dispatch(getArticlesForDashboard(parentId, model));
            // await dispatch({
            //     type: "DELETE_ARTICLE",
            //     payload: [...getState().articlesForDashboard]
            // })
        } catch (ex) {
            // await dispatch({ type: "DELETE_ARTICLE", payload: [...filteredArticles] })
        }
    }
}

export const getAllArticleMenu = () => {
    return async dispatch => {
        const { data } = await GetAllArticleMenu();
        await dispatch({ type: "GET_ALLARTICLEMENU", payload: data });
    };
};

