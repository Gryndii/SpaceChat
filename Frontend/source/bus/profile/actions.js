//Types
import { types } from './types';

export const profileActions = {
    fillProfileAsync: () => {
        return {
            type: types.FILL_PROFILE_ASYNC,
        };
    },

    updateProfileAsync: (newData) => {
        return {
            type:    types.UPDATE_PROFILE_ASYNC,
            payload: newData,
        };
    },

    updateImageAsync: (newData) => {
        return {
            type:    types.UPDATE_PROFILE_IMAGE_ASYNC,
            payload: newData,
        };
    },

    fillProfile: (userData) => {
        return {
            type:    types.FILL_PROFILE,
            payload: userData,
        };
    },

    clearProfile: () => {
        return {
            type: types.CLEAR_PROFILE,
        };
    },
};
