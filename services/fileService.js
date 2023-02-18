import http from "./httpService";
import config from './config.json';

export const SaveFileOrFolder = (model) => {
    return http.post(`/FileInfo/SaveFileOrFolderDirectly`,model)
}

export const GetAllChildNodeOfDirectory = (stream_id,paginatemodel) => {
    var model = {
        Stream_id: stream_id,
        paginetedata: paginatemodel,
    }
    // console.info("model service", model);
    return http.post(`/FileInfo/GetAllChildNodeOfDirectory`, model)
}

export const GetFilesBySerach = (text) => {
    return http.post(`/FileInfo/GetFilesBySerach?fileSearchViewModel.SerachValue=${text}`)
}

export const GetBreadCrumbListOnStreamId= (stream_id) => {
    return http.post(`/FileInfo/GetBreadCrumbListOnStreamId?fileBreadCrumbViewModel.StreamId=${stream_id}`)
}

export const DeleteFileOrFolder= (stream_id) => {
    return http.post(`/FileInfo/DeleteFileOrFolder?fileManagementViewModel.Stream_id=${stream_id}`)
}
export const GetUserfileList= () => {
    return http.post(`/FileInfo/GetUserfileList`)
}

export const SaveUserFile= (model) => {
    return http.post(`/FileInfo/SaveUserFile`, model)
}

