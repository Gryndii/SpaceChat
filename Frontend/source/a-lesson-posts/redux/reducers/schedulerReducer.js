import { types } from '../types';

const initialState = {
    newPostTitle: '',
    newPostText: '',
};

export const schedulerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_NEW_POST_DATA: {
            console.log('SET_NEW_POST_DATA REDUCER, data: ', action.payload);
            return {
                ...state,
                ...action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
