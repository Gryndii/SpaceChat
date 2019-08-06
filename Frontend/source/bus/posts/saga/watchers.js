//Core
import { takeEvery } from 'redux-saga/effects';

//Types 
import { types } from '../types';

//Workers
import { fetchPostsWorker } from './workers/fetchPostsWorker';
import { likePostWorker } from './workers/likePostWorker';
import { unlikePostWorker } from './workers/unlikePostWorker';
import { createPostWorker } from './workers/createPostWorker';
import { removePostWorker } from './workers/removePostWorker';

export function* watchPosts() {
  yield takeEvery(types.FETCH_POSTS_ASYNC, fetchPostsWorker)
  yield takeEvery(types.LIKE_POST_ASYNC, likePostWorker)
  yield takeEvery(types.UNLIKE_POST_ASYNC, unlikePostWorker)
  yield takeEvery(types.CREATE_POST_ASYNC, createPostWorker)
  yield takeEvery(types.REMOVE_POST_ASYNC, removePostWorker)
};