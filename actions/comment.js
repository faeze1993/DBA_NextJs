import { DeleteComment, GetArticleComment, GetCommentsGridData, ToggleConfirm } from "../services/commentService";
import { errorMessage, successMessage } from "../utils/message";

export const getCommentsGridData = (model) => {
    return async dispatch => {
        const {data} = await GetCommentsGridData(model);
        await dispatch({type: "GET-COMMENTLIST", payload:data});
    }
}

export const getArticleComment = (model) => {
    return async dispatch => {
        const {data} = await GetArticleComment(model);
        await dispatch({type: "GET-ARTICLECOMMENT", payload:data});
    }
}

export const handleToggleConfirm = (id) => {
    return async dispatch => {
        const {status} = await ToggleConfirm(id);
        if (status == 200) successMessage("عملیات با موفقیت انجام شد");
        var model = {
            perpage: 10,
            currntpage: 1,
            skip: 0
        }
        await  dispatch(getCommentsGridData(model));
    }
}

export const handleCommentDelete = (id) => {

    return async (dispatch) => {
        try {
            const { status } = await DeleteComment(id);
            if (status == 200) successMessage("عملیات با موفقیت انجام شد");
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0
            }
            await dispatch(getCommentsGridData(model));
        } catch (ex) {
            errorMessage("خطایی رخ داده است");
        }
    }
}