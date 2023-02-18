import { get } from "lodash";
import { DeleteFileOrFolder, GetAllChildNodeOfDirectory, GetBreadCrumbListOnStreamId,GetFilesBySerach } from "../services/fileService";
import { errorMessage, successMessage } from "../utils/message";


export const getAllChildNodeOfDirectory = (id,model) => {
    return async dispatch => {
        const { data } = await GetAllChildNodeOfDirectory(id,model);
        await dispatch({ type: "GET_ALLCHILDNODEOFDIRECTORY", payload: data });
    }
}

export const getFilesBySerach = (text) => {
    return async dispatch => {
        const { data } = await GetFilesBySerach(text);
        console.info("GET_ALLCHILDNODEOFDIRECTORY", data);
        await dispatch({ type: "GET_ALLCHILDNODEOFDIRECTORY", payload: data });
    }
}


export const getBreadCrumbListOnStreamId = (id) => {
    return async dispatch => {
        const { data } = await GetBreadCrumbListOnStreamId(id);
        await dispatch({ type: "GET_FILEBREADCRUMBLIST", payload: data });
    }
}

export const handleFileOrFolderDelete = (id,parentId) => {
    return async dispatch => {
        const { data } = await DeleteFileOrFolder(id);
        if (data.Status == "success") {
            successMessage(data.Message);
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0
            }
            await dispatch(getAllChildNodeOfDirectory(parentId,model))
            await dispatch({ type: "DELETE-FILEORFOLDER", payload: data });
        } else {
            errorMessage(data.Message);
        }

    }
}
