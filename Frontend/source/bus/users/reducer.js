//Types
import { types } from './types';
import { fromJS, List } from 'immutable';

const initialState = fromJS({
    currentUser: {
        createdAt: '',
        location:  '',
        website:   '',
        handle:    '',
        email:     '',
        userId:    '',
        bio:       '',
        imageUrl:  '',
    },
    popularUsers: [],
    isFetching:   false,
});

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_USER:
            return state.set('currentUser', fromJS(action.payload));

        case types.CLEAR_USER:
            return state.set('currentUser', List());

        case types.FILL_POPULAR_USERS:
            return state.set('popularUsers', fromJS(action.payload));

        case types.SET_USERS_FETCHING_STATE:
            return state.set('isFetching', true);

        case types.DISABLE_USERS_FETCHING_STATE:
            return state.set('isFetching', false);

        default:
            return state;
    }
};
