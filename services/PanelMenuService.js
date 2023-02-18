import http from "./httpService";

export const GetPanelMenuOnUserRole = () => {
    return http.post(`/PanelMenu/GetPanelMenuOnUserRole`);
}

export const GetPanelMenuList = (model) => {
    return http.post(`/PanelMenu/GetPanelMenuList`, model);
}

export const UpdatePanelMenu = (model) => {
    return http.post(`/PanelMenu/UpdatePanelMenu`, model);
}