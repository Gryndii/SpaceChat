//Types
import { types } from './types';

export const uiActions = {
    startFetching: () => {
        return {
            type: types.START_FETCHING,
        };
    },
    stopFetching: () => {
        return {
            type: types.STOP_FETCHING,
        };
    },
    openAlertPopup: (content) => {
        return {
            type:    types.OPEN_ALERT_POPUP,
            payload: content,
        };
    },
    closeAlertPopup: () => {
        return {
            type: types.CLOSE_ALERT_POPUP,
        };
    },
};
