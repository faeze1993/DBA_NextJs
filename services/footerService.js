import http from "./httpService";
import config from './config.json';

export const GetFooterContent = () => {
    return http.post(`/PanelCustomValue/GetFooterContent`)
}


