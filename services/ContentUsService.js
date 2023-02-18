import http from "./httpService";
import config from './config.json';

export const SaveConectUs = (model) => {
    return http.post(`/ContentUs/Save`,model)
}

export const UpdateConectISReplied = (id) => {
    return http.post(`/ContentUs/Update?ConectUsViewModel.Id=${id}`)
}

export const GetConectUsGridData = (model) => {
    return http.post(`/ContentUs/GetConectUsGridData`, model)
}

export const DeleteConectUs = (id) => {
    return http.post(`/ContentUs/Delete?ConectUsViewModel.Id=${id}`)
}

