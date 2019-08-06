//Core 
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

//Instruments
import { api } from '../../../../API';
import { authenticate, initialize } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions'
import { fillProfile } from '../../../profile/actions'

export function* authWorker() {
  try {
    yield put(startFetching());

    const token = yield apply(localStorage, localStorage.getItem, ['token']);

    if (!token) {
      return null;
    }

    const profile = yield apply(api, api.auth.login, [{token}]);
  
    yield put(authenticate());
    yield put(fillProfile(profile));

    const { firstName, lastName } = profile;
    yield put(actions.merge('forms.user.profile', { firstName, lastName }));
  } catch (error) {
    console.log('authWorker', error);
  } finally {
    yield put(stopFetching());
    yield put(initialize());
  }
};