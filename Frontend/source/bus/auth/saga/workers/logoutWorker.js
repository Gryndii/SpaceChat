//Core 
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';
import { logout } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions'
import { clearProfile } from '../../../profile/actions'

export function* logoutWorker() {
  try {
    yield put(startFetching());

    const token = yield apply(localStorage, localStorage.getItem, ['token']);

    if (token) {
      yield apply(localStorage, localStorage.removeItem, ['token']);
      yield apply(api, api.auth.logout, [token]);
    }
    
  } catch (error) {
    console.log('logoutWorker', error);
  } finally {
    yield put(logout());
    yield put(stopFetching());
    yield put(clearProfile());
  }
};