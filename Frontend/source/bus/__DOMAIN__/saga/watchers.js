//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { exampleWorker } from './workers';

function* watchExample () {
    yield takeEvery(types.TYPE, exampleWorker);
}

export function* watchAuth() {
    yield all([
        call(watchExample),
    ]);
}
