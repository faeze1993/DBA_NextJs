import http from "./httpService";
import config from './config.json';

export const GetAllAuthors = () => {
    return http.post(`/User/GetAllAuthorList`)
}

export const GetPublisherProfileData = (id) => {
    return http.post(`/User/GetPublisherProfileData?userViewModel.ID=${id}`)
}

