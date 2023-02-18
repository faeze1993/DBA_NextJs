import http from "./httpService";
import config from './config.json';


export const SavePanel = formData => {
    return http.post(`/PanelCustomValue/Save`, formData);
}

export const GetPanelCustomeValue = () => {
    return http.post(`/PanelCustomValue/GetPanelCustomeValue`);
}



