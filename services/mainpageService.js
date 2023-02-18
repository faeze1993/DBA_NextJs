import http from "./httpService";
import config from './config.json';

export const GetMainPageSliderImage = () => {
    return http.post(`/PanelCustomValue/GetMainPageSliders`)
}

export const GetMainPageAboutUs = () => {
    return http.post(`/PanelCustomValue/GetMainPageAboutUs`)
}

export const GetLogImage = () => {
    return http.post(`/PanelCustomValue/GetLogImage`)
}

export const GetWebSiteTitle = () => {
    return http.post(`/PanelCustomValue/GetWebSiteTitle`)
}

export const GetMainPageKeyWord = () => {
    return http.post(`/PanelCustomValue/GetMainPageKeyWord`)
}




