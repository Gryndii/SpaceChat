//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    isAuthenticated: false,
});

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATE:
            return state.set('isAuthenticated', true);

        case types.LOGOUT:
            return state.set('isAuthenticated', false);

        default:
            return state;
    }
};
