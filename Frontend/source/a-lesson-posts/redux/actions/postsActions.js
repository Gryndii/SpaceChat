import { types } from '../types';

export const fetchPostsAsync = () => {
    return {
        type: types.FETCH_POSTS_ASYNC,
    };
};

export const createPostAsync = (newPost) => {
    return {
        type: types.CREATE_POST_ASYNC,
        payload: newPost,
    };
};

export const addPost = (newPost) => {
    return {
        type: types.ADD_POST,
        payload: newPost,
    };
};

export const fillPosts = (posts) => {
    return {
        type: types.FILL_POSTS,
        payload: posts,
    };
};
