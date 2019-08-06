//Core 
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

//Instruments
import { api } from '../../../../API';
import { authenticate } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions'
import { fillProfile } from '../../../profile/actions'

export function* signupWorker(action) {
  try {
    yield put(startFetching());

    const profile = yield apply(api, api.auth.signup, [action.payload]);
  
    yield apply(localStorage, localStorage.setItem, ['token', profile.token]);
  
    yield put(authenticate());
    yield put(fillProfile(profile));

    const { firstName, lastName } = profile;
    yield put(actions.merge('forms.user.profile', { firstName, lastName }));
  } catch (error) {
    console.log('signupWorker', error);
  } finally {
    yield put(stopFetching());
  }

};