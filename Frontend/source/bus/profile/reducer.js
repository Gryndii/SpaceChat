//Core
import { fromJS } from 'immutable';

//Types
import { types } from './types';

const initialState = fromJS({
    credentials: {
        handle:    '',
        email:     '',
        userId:    '',
        bio:       '',
        imageUrl:  '',
        createdAt: '',
        location:  '',
        website:   '',
    },
    likes:         [],
    notifications: [],
});

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return fromJS(action.payload);

        case types.CLEAR_PROFILE:
            return initialState;

        default:
            return state;
    }
};
