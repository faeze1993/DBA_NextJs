import http from "./httpService";
import config from './config.json';

export const SaveTickets = (model) => {
    return http.post(`/Ticket/Save`,model)
}

export const UpdateTicketISReplied = (id) => {
    return http.post(`/Ticket/ToggleIsReplied?TicketViewModel.Id=${id}`)
}

export const GetTicketGridData = () => {
    return http.post(`/Ticket/GetTicketGridData`)
}

export const GetTicketGridDataForPanel = (model) => {
    return http.post(`/Ticket/GetTicketGridDataForPanel`,model)
}

export const DeleteTicket = (id) => {
    return http.post(`/Ticket/Delete?TicketViewModel.Id=${id}`)
}
