
import { GetAllAuthors, GetPublisherProfileData } from "../services/authorService";

export const getAllAuthors = () => {
    return async dispatch => {
        const { data } = await GetAllAuthors();
        await dispatch({ type: "GET_AUTHORS", payload: data });
    }
}

export const getPublisherProfileData = (id) => {
    return async dispatch => {
        const { data } = await GetPublisherProfileData(id);
        await dispatch({ type: "GET_AUTHOR", payload: data });
    }
}