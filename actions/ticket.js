import { DeleteTicket, GetTicketGridData, GetTicketGridDataForPanel, UpdateTicketISReplied } from "../services/ticketService";
import { errorMessage, successMessage } from "../utils/message";

export const getticketGridData = () => {
    return async dispatch => {
        const { data } = await GetTicketGridData();
        await dispatch({ type: "GET-TICKETLIST", payload: data });
    }
}

export const getTicketGridDataForPanel = (model) => {
    return async dispatch => {
        const { data } = await GetTicketGridDataForPanel(model);
        await dispatch({ type: "GET-TICKETLISTFORPANEL", payload: data });
    }
}

export const handleUpdateTicketSReplied = (id) => {
    return async dispatch => {
        const { data } = await UpdateTicketISReplied(id);
        if (data.Status == 'success') {
            successMessage("عملیات با موفقیت انجام شد");
            var model = {
                perpage: 10,
                currntpage: 1,
                skip: 0
            }
            dispatch(getTicketGridDataForPanel(model));
        }
        else { errorMessage("خطایی رخ داده است") };
    }
}

export const handleTicketDelete = (id) => {

    return async (dispatch) => {
        try {
            const { status } = await DeleteTicket(id);
            if (status == 200) successMessage("عملیات با موفقیت انجام شد");
            const token = localStorage.getItem("token");
            await dispatch(getticketGridData());
        } catch (ex) {
            errorMessage("خطایی رخ داده است");
        }
    }
}