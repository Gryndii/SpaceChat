//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fillProfileWorker, updateProfileWorker, updateImageWorker, } from './workers';

function* watchFillProfile () {
    yield takeEvery(types.FILL_PROFILE_ASYNC, fillProfileWorker);
}

function* watchUpdateProfile () {
    yield takeEvery(types.UPDATE_PROFILE_ASYNC, updateProfileWorker);
}

function* watchUpdateImage () {
    yield takeEvery(types.UPDATE_PROFILE_IMAGE_ASYNC, updateImageWorker);
}

export function* watchProfile() {
    yield all([
        call(watchFillProfile),
        call(watchUpdateProfile),
        call(watchUpdateImage),
    ]);
}
