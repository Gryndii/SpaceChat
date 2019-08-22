//Types
import { types } from './types';

export const usersActions = {
    fetchUserAsync: (userId) => {
        return {
            type:    types.FETCH_USER_ASYNC,
            payload: userId,
        };
    },

    fetchPopularUsersAsync: () => {
        return {
            type: types.FETCH_POPULAR_USERS_ASYNC,
        };
    },

    fillUser: (userData) => {
        return {
            type:    types.FILL_USER,
            payload: userData,
        };
    },

    fillPopularUsers: (userData) => {
        return {
            type:    types.FILL_POPULAR_USERS,
            payload: userData,
        };
    },

    clearUser: () => {
        return {
            type: types.CLEAR_USER,
        };
    },

    setUsersFetchingState: () => {
        return {
            type: types.SET_USERS_FETCHING_STATE,
        };
    },

    disableUsersFetchingState: () => {
        return {
            type: types.DISABLE_USERS_FETCHING_STATE,
        };
    },
};
