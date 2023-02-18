import { GetPanelCustomeValue } from "../services/PanelService";


export const getPanelCustomeValue = () => {
    return async dispatch => {
        const {data} = await GetPanelCustomeValue();
        await dispatch({type: "GET_PANELCUSTOMEVALUE", payload:data});
    }
}

