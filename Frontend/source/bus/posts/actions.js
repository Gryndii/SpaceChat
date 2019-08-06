//Types
import { types } from './types';

export const fetchPostsAsync = () => {
  return {
    type: types.FETCH_POSTS_ASYNC,
  };
};

export const likePostAsync = (postId) => {
  return {
    type: types.LIKE_POST_ASYNC,
    payload: postId,
  };
};

export const unlikePostAsync = (postId) => {
  return {
    type: types.UNLIKE_POST_ASYNC,
    payload: postId,
  };
};

export const createPostAsync = (comment) => {
  return {
    type: types.CREATE_POST_ASYNC,
    payload: comment,
  };
};

export const removePostAsync = (postId) => {
  return {
    type: types.REMOVE_POST_ASYNC,
    payload: postId,
  };
};

export const fillPosts = (posts) => {
  return {
    type: types.FILL_POSTS,
    payload: posts,
  };
};

export const likePost = (likePostData) => {
  return {
    type: types.LIKE_POST,
    payload: likePostData,
  };
};

export const unlikePost = (unlikePostData) => {
  return {
    type: types.UNLIKE_POST,
    payload: unlikePostData,
  };
};

export const createPost = (post) => {
  return {
    type: types.CREATE_POST,
    payload: post,
  };
};

export const removePost = (postId) => {
  return {
    type: types.REMOVE_POST,
    payload: postId,
  };
};