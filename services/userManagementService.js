import http from './httpService';
import config from './config.json';

export const GetAllUsersList = (model) => {
    return http.post(`/User/GetAllUsersList`,model);
}

export const GetRoles = () => {
    return http.post(`/User/GetRoles`);
}

export const DeleteUser = (id) => {
    return http.post(`/User/DeleteUser?UserViewModel.ID=${id}`);
}

export const EditUserByAdmin = (model) => {
    // console.info("model EditUserByAdmin",model);
    return http.post(`/User/EditUserByAdmin`, model);
}

