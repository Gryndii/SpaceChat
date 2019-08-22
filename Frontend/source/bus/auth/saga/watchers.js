//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { loginWorker, signupWorker, authWorker, logoutWorker } from './workers';

function* watchLogin () {
    yield takeEvery(types.LOGIN_ASYNC, loginWorker);
}

function* watchSignup () {
    yield takeEvery(types.SIGNUP_ASYNC, signupWorker);
}

function* watchAuthentication () {
    yield takeEvery(types.AUTHENTICATE_ASYNC, authWorker);
}

function* watchLogout () {
    yield takeEvery(types.LOGOUT_ASYNC, logoutWorker);
}

export function* watchAuth() {
    yield all([
        call(watchLogin),
        call(watchSignup),
        call(watchAuthentication),
        call(watchLogout),
    ]);
}
