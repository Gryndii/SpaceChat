//Core
import { takeEvery } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchPostsWorker } from './workers/fetchPostsWorker';
import { createPostWorker } from './workers/createPostWorker';

export function* watchWorkers() {
    yield takeEvery(types.FETCH_POSTS_ASYNC, fetchPostsWorker);
    yield takeEvery(types.CREATE_POST_ASYNC, createPostWorker);
}
