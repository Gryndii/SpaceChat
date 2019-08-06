//Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { actions } from 'react-redux-form';

//Instruments
import { api } from '../../../API';
import { authenticate, loginAsync } from '../actions';
import { startFetching, stopFetching } from '../../ui/actions';
import { fillProfile } from '../../profile/actions';

import { loginWorker } from '../saga/workers/loginWorker';

const action = loginAsync(__.credentials);

const { firstName, lastName } = __.userProfile;

describe('loginWorker saga:', () => {
  test('should complete scenario', async () => {
    await expectSaga(loginWorker, action)
      .put(startFetching())
      .provide([
        [apply(api, api.auth.login, [__.credentials]), __.userProfile]
      ])
      .apply(api, api.auth.login, [__.credentials])
      .apply(localStorage, localStorage.setItem, [ 'remember', true ])
      .apply(localStorage, localStorage.setItem, [ 'token', __.userProfile.token ])
      // .put(actions.merge('forms.user.profile', { firstName, lastName }))
      .put(authenticate())
      .put(stopFetching())
      .put(fillProfile(__.userProfile))
      .run();
  });
});