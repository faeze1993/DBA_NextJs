// import http from "./httpService";
// import config from './config.json';

// export const getAllCategory = () => {
//     return http.post(`${http.sqllearningapi}/Category/GetAllCategory`)
// }

// export const getCategory = (categoryId, token) => {
//     console.info("categoryId", categoryId);
//     return http.get(`${http.sqllearningapi}/Category/GetCategoryDetail?CategoryViewModel.Id=${categoryId}`, {
//         headers: {
//             "Authorization": `bearer ${token}`
//         }
//     })
// }
// export const newCategory = category => {
//     console.info("InsertCategory **", category);
//     return http.post(`${http.sqllearningapi}/Category/InsertCategory`, category);
// }

// export const editCategory = (category) => {
//     console.info("EditCategory **", category);
//     return http.post(`${http.sqllearningapi}/Category/EditCategory`, category);
// }

// export const deleteCategory = (categoryId) => {
//     return http.post(`${http.sqllearningapi}/Category/DeleteCategory?CategoryViewModel.Id=${categoryId}`);
// }


