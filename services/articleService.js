import http from "./httpService";
import config from './config.json';

export const getAllArticlesForDashboard = (id,paginatemodel) => {
    var model =  {
        Id: id,
        paginetedata:paginatemodel
    }
    return http.post(`/Article/GetAllArticlesForDashboard`,model)
}

export const GetAllArticlesForDropdown = (model) => {
   
    return http.post(`/Article/GetAllArticlesForDropdown`,model)
}

export const GetAllArticlesForArchive = (model) => {
    return http.post(`/Article/GetAllArticlesForArchiveWithPaginate`, model)
}

export const GetArticlesForEdit = (articleId) => {
    return http.post(`/Article/GetArticlesForEdit?ArticleViewModel.Id=${articleId}`)
}

export const GetArticlesForDashboardUsingSearch = (serachValue,paginatemodel) => {
    var model = {
        SerachValue: serachValue,
        paginetedata: paginatemodel
    }
    return http.post(`/Article/GetAllArticlesForDashboardUsingSearch`,model)
}

export const GetAllArticleTrees = () => {
    return http.post(`/Article/GetAllArticleTrees`)
}

export const GetAllArticleforArticlePath = () => {
    return http.post(`/Article/GetAllArticleforArticlePath`)
}

export const GetAllArticles2 = (id) => {
    return http.get(`/Article/GetAllArticles2?articleId=${id}`)
}


export const GetAllArticlesOnAuthrId = (model) => {
    return http.post(`/Article/GetAllArticlesOnAuthrId`, model)
}

export const GetArticlesForArchiveBySearch = (serachValue) => {
    return http.post(`/Article/GetArticleUsingSearch?ArticleSearchViewModel.SerachValue=${serachValue}`)
}

export const GetAllArticlesForMainPage = () => {
    return http.post(`/Article/GetAllArticlesForMainPage`)
}

export const GetArticle = (articleId) => {
    return http.post(`/Article/GetArticleDetail?ArticleViewModel.Id=${articleId}`)
}

export const GetArticleTypes = () => {
    return http.post(`/Article/GetArticleTypes`);
}
export const SaveArticle = article => {
    return http.post(`/Article/Save`, article);
}

export const editArticle = (article) => {
    return http.post(`/Article/Save`, article);
}

export const deleteArticle = (articleId) => {
    return http.post(`/Article/DeleteArticle?ArticleViewModel.Id=${articleId}`);
}

export const saveImageFile  = (formData) => {
    return http.post(`/FileInfo/SaveSingleFile`,formData);
}

export const GetRelativeUrl = (streamId) => {
    return http.post(`/FileInfo/GetRelativeUrl`, {stream_id: streamId});
}

export const GetAllArticleMenu = () => {
    return http.post(`/Article/GetAllArticleMenu`);
}


export const GetAllArticlesKeyWord = () => {
    return http.post(`/Article/GetAllArticlesKeyWord`);
}

export const SaveArticleVisit = (articleId) => {
    return http.post(`/Article/SaveArticleVisit?ArticleViewModel.Id=${articleId}`);
}

export const ToggleEnable = (articleId) => {
    return http.post(`/Article/ToggleEnable?ArticleViewModel.Id=${articleId}`);
}