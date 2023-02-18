import http from "./httpService";
import config from './config.json';

export const GetAllProduct = () => {
    return http.post(`/Product/GetAllProducts`)
}

export const GetProductList = () => {
    return http.post(`/Product/GetProductList`)
}

export const GetAllProductsForPanel = (model) => {
    return http.post(`/Product/GetAllProductsForPanel`, model)
}

export const GetProduct = (productId, token) => {
    return http.post(`/Product/GetProductDetail?ProductViewModel.Id=${productId}`)
}
export const InsertProduct = product => {
    return http.post(`/Product/InsertProduct`, product);
}

export const EditProduct = (product) => {
    return http.post(`/Product/EditProduct`, product);
}

export const DeleteProduct = (productId) => {
    return http.post(`/Product/DeleteProduct?ProductViewModel.Id=${productId}`);
}


