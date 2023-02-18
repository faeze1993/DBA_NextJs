import { deleteSlider, editSlider, GetAllSliders, newSlider } from "../services/sliderService";
import { errorMessage, successMessage } from "../utils/message";


export const getSliders = (model) => {
    return async dispatch => {
        const { data } = await GetAllSliders(model);
        await dispatch({ type: "GET_AllSLIDERS", payload: data });
    }
}

export const createNewSlider = slider => {
    return async (dispatch, getState) => {
        const { data } = await newSlider(slider);
        if (data.Status == "success") {
            successMessage("عملیات با موفقیت انجام شد");
            await dispatch(getSliders());
            await dispatch({
                type: "ADD_SLIDER",
                payload: [...getState().slider]
            })
        } else {
            errorMessage("ثبت اسلایدر با خطا مواجه شد");
        }

    }
}

export const updateSlider = (updatedSlider) => {
    return async (dispatch, getState) => {
        const sliders = [...getState().slider];

        try {
            const { data } = await editSlider(updatedSlider);
            if (data.Status == "success") {
                successMessage("عملیات با موفقیت انجام شد");
                await dispatch(getSliders());
                await dispatch({
                    type: "UPDATE_SLIDER",
                    payload: [...getState().slider]
                })
            }
            else {
                errorMessage("ثبت اسلایدر با خطا مواجه شد");
            }

        } catch (ex) {
            await dispatch({ type: "UPDATE_SLIDER", payload: [...sliders] })
        }
    }
}

export const handleSliderDelete = sliderId => {
    return async (dispatch, getState) => {
        const sliders = [...getState().slider];
        const filteredSliders = sliders.filter(slider => slider.Id != sliderId);

        try {

            const { status } = await deleteSlider(sliderId);
            if (status == 200) successMessage("عملیات با موفقیت انجام شد");
            await dispatch(getSliders());
            await dispatch({ type: "DELETE_SLIDER", payload: [...getState().slider] });
        } catch (ex) {
            await dispatch({ type: "DELETE_SLIDER", payload: [...filteredSliders] })
        }
    }
}