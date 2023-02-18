import { GetUserfileList } from "../services/fileService";

export const getUserfileList = () => {
    return async dispatch => {
        const { data } = await GetUserfileList();
        await dispatch({ type: "GET-USERFILELIST", payload: data });
    }
}
