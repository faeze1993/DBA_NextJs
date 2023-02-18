// import { deleteCategory, editCategory, getAllCategory, newCategory } from "../services/categoryService";
// import { successMessage } from "../utils/message";


// export const getCategories = () => {
//     return async dispatch => {
//         const {data} = await getAllCategory();
//         await dispatch({type: "GET_AllCATEGORY", payload:data});
//     }
// }

// export const createNewCategory = category => {
//     console.info("createNewCategory actoin", category);
//     return async (dispatch, getState) => {
//         const { data } = await newCategory(category);
//         if (data.Status = "success") successMessage("عملیات با موفقیت انجام شد")
//         const token = localStorage.getItem("token");
//         await dispatch(getCategories(token));
//         await dispatch({
//             type: "ADD_CATEGORY",
//             payload: [...getState().categories]
//         })
//     }
// }

// export const updateCategory = ( updatedCategory) => {
//     return async (dispatch, getState) => {
//         const categories = [...getState().categories];

//         try {
//             const { data } = await editCategory(updatedCategory);
//             if (data.Status = "success") successMessage("عملیات با موفقیت انجام شد");
//             const token = localStorage.getItem("token");
//             await dispatch(getCategories(token));
//             await dispatch({
//                 type: "UPDATE_CATEGORY",
//                 payload: [...getState().categories]
//             })

//         } catch (ex) {
//             await dispatch({ type: "UPDATE_CATEGORY", payload: [...categories] })
//         }
//     }
// }

// export const handleCategoryDelete = categoryId => {
//     return async (dispatch, getState) => {
//         const categories = [...getState().categories];
//         const filteredCategories = categories.filter(category => category.Id != categoryId);

//         try {
           
//             const { status } = await deleteCategory(categoryId);
//             console.info("status delete", status);
//             if (status == 200) successMessage("عملیات با موفقیت انجام شد");
//             const token = localStorage.getItem("token");
//             await dispatch(getCategories(token));
//             await dispatch({ type: "DELETE_CATEGORY", payload: [...getState().categories] });
//         } catch (ex) {
//             await dispatch({ type: "DELETE_CATEGORY", payload: [...filteredCategories] })
//         }
//     }
// }