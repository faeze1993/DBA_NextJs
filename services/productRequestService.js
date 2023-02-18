import http from "./httpService";

export const SaveProductRequest = (model) => {
    return http.post(`/ProductRequest/Save`, model)
}

export const GetProductRequestGridData = (model) => {
    return http.post(`/ProductRequest/GetProductRequestGridData`, model)
}

export const DeleteProductRequest = (id) => {
    return http.post(`/ProductRequest/Delete?ProductRequestViewModel.Id=${id}`)
}

export const UpdateProductRequestISReplied = (id) => {
    return http.post(`/ProductRequest/Update?ProductRequestViewModel.Id=${id}`)
}