import { types } from '../types';

export const setNewPostData = (newPostData) => {
    return {
        type: types.SET_NEW_POST_DATA,
        payload: newPostData,
    };
};
