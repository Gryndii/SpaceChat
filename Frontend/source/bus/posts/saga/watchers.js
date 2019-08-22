//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import {
    fetchFeedPostsWorker,
    fetchUserPostsWorker,
    createPostWorker,
    deletePostWorker,
    likePostWorker,
    unlikePostWorker,
    fetchCommentsWorker,
    createCommentWorker,
} from './workers';

function* watchFetchFeedPosts () {
    yield takeEvery(types.FETCH_FEED_POSTS_ASYNC, fetchFeedPostsWorker);
}

function* watchFetchUserPosts () {
    yield takeEvery(types.FETCH_USER_POSTS_ASYNC, fetchUserPostsWorker);
}

function* watchCreatePost () {
    yield takeEvery(types.CREATE_POST_ASYNC, createPostWorker);
}

function* watchDeletePost () {
    yield takeEvery(types.DELETE_POST_ASYNC, deletePostWorker);
}

function* watchLikePost () {
    yield takeEvery(types.LIKE_POST_ASYNC, likePostWorker);
}

function* watchUnlikePost () {
    yield takeEvery(types.UNLIKE_POST_ASYNC, unlikePostWorker);
}

function* watchFetchComments () {
    yield takeEvery(types.FETCH_COMMENTS_ASYNC, fetchCommentsWorker);
}

function* watchCreateComment () {
    yield takeEvery(types.CREATE_COMMENT_ASYNC, createCommentWorker);
}

export function* watchPosts() {
    yield all([
        call(watchFetchFeedPosts),
        call(watchFetchUserPosts),
        call(watchCreatePost),
        call(watchDeletePost),
        call(watchLikePost),
        call(watchUnlikePost),
        call(watchFetchComments),
        call(watchCreateComment),
    ]);
}
