import http from "./httpService";
import config from './config.json';

export const GetBreadCrumbListOnArticleId = (id) => {
    return http.post(`/Article/GetBreadCrumbListOnArticleId?BreadCrumbViewModel.Id=${id}`)
}
