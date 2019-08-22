//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchUserWorker, fetchPopularUsersWorker } from './workers';

function* watchFetchUser () {
    yield takeEvery(types.FETCH_USER_ASYNC, fetchUserWorker);
}

function* watchFetchPopularUsers () {
    yield takeEvery(types.FETCH_POPULAR_USERS_ASYNC, fetchPopularUsersWorker);
}

export function* watchUsers() {
    yield all([
        call(watchFetchUser),
        call(watchFetchPopularUsers),
    ]);
}
