import http from "./httpService";
import config from './config.json';

export const GetAllSliders = (model) => {
    return http.post(`/Slider/GetAllSliders`,model)
}

export const getSlider = (sliderId, token) => {
    return http.get(`/Slider/GetSliderDetail?SliderViewModel.Id=${sliderId}`, {
        headers: {
            "Authorization": `bearer ${token}`
        }
    })
}
export const newSlider = slider => {
    return http.post(`/Slider/InsertSlider`, slider);
}

export const editSlider = (slider) => {
    return http.post(`/Slider/EditSlider`, slider);
}

export const deleteSlider = (sliderId) => {
    return http.post(`/Slider/DeleteSlider?SliderViewModel.Id=${sliderId}`);
}


