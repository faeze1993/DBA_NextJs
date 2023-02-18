import http from "./httpService";
import config from './config.json';

export const SaveArticleComment = (model) => {
    return http.post(`/Comment/SaveComment`,model)
}

export const GetArticleComment = (model) => {
    return http.post(`/Comment/GetArticleComment`, model)
}

export const GetCommentsGridData = (model) => {
    return http.post(`/Comment/GetCommentsGridData`,model)
}

export const DeleteComment = (id) => {
    return http.post(`/Comment/DeleteComment?CommentViewModel.Id=${id}`)
}

export const ToggleConfirm = (id) => {
    return http.post(`/Comment/ToggleConfirm?CommentViewModel.Id=${id}`)
}