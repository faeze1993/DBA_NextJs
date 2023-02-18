import http from "./httpService";
import config from './config.json';

export const GetAboutPageAboutUs = () => {
    return http.post(`/PanelCustomValue/GetAboutPageAboutUs`)
}



