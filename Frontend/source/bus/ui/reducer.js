//Core
import { fromJS, Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    isFetching: false,
    alertPopup: {
        isOpened: false,
        title:    '',
        message:  '',
    },
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.OPEN_ALERT_POPUP:
            return state.setIn([ 'alertPopup' ], fromJS({
                isOpened: true,
                title:    action.payload.title,
                message:  action.payload.message,
            }));

        case types.CLOSE_ALERT_POPUP:
            return state.setIn([ 'alertPopup' ], fromJS({
                isOpened: false,
                title:    '',
                message:  '',
            }));

        default:
            return state;
    }
};
