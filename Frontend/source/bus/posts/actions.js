//Types
import { types } from './types';

export const postsActions = {
    fetchFeedPostsAsync: () => {
        return {
            type: types.FETCH_FEED_POSTS_ASYNC,
        };
    },

    fetchUserPostsAsync: (userId) => {
        return {
            type:    types.FETCH_USER_POSTS_ASYNC,
            payload: userId,
        };
    },

    createPostAsync: (postText) => {
        return {
            type:    types.CREATE_POST_ASYNC,
            payload: postText,
        };
    },

    deletePostAsync: (postId) => {
        return {
            type:    types.DELETE_POST_ASYNC,
            payload: postId,
        };
    },

    likePostAsync: (postId) => {
        return {
            type:    types.LIKE_POST_ASYNC,
            payload: postId,
        };
    },

    unlikePostAsync: (postId) => {
        return {
            type:    types.UNLIKE_POST_ASYNC,
            payload: postId,
        };
    },

    fetchCommentsAsync: (postId) => {
        return {
            type:    types.FETCH_COMMENTS_ASYNC,
            payload: postId,
        };
    },

    createCommentAsync: (commentInfo) => {
        return {
            type:    types.CREATE_COMMENT_ASYNC,
            payload: commentInfo,
        };
    },

    fillPosts: (posts) => {
        return {
            type:    types.FILL_POSTS,
            payload: posts,
        };
    },

    addPosts: (post) => {
        return {
            type:    types.ADD_POST,
            payload: post,
        };
    },

    removePost: (postId) => {
        return {
            type:    types.REMOVE_POST,
            payload: postId,
        };
    },

    clearPosts: () => {
        return {
            type: types.CLEAR_POSTS,
        };
    },

    likePost: (likeInfo) => {
        return {
            type:    types.LIKE_POST,
            payload: likeInfo,
        };
    },

    unlikePost: (likeInfo) => {
        return {
            type:    types.UNLIKE_POST,
            payload: likeInfo,
        };
    },

    fillComments: (extendedPost) => {
        return {
            type:    types.FILL_COMMENTS,
            payload: extendedPost,
        };
    },

    addComment: (newComment) => {
        return {
            type:    types.ADD_COMMENT,
            payload: newComment,
        };
    },

    setPostsFetchingState: () => {
        return {
            type: types.SET_POSTS_FETCHING_STATE,
        };
    },

    disablePostsFetchingState: () => {
        return {
            type: types.DISABLE_POSTS_FETCHING_STATE,
        };
    },
};
