//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types 
import { types } from '../types';

//Workers
import { signupWorker } from './workers/signupWorker';
import { loginWorker } from './workers/loginWorker';
import { authWorker } from './workers/authWorker';
import { initializeWorker } from './workers/initializeWorker';
import { logoutWorker } from './workers/logoutWorker';

export function* watchAuth() {
  yield takeEvery(types.SIGNUP_ASYNC, signupWorker);
  yield takeEvery(types.LOGIN_ASYNC, loginWorker);
  yield takeEvery(types.AUTHENTICATE_ASYNC, authWorker);
  yield takeEvery(types.LOGOUT_ASYNC, logoutWorker);
  yield call(initializeWorker);
};