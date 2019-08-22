//Core
import { put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* logoutWorker() {
    try {
        yield put(uiActions.startFetching());

        yield api.removeToken();

        yield put(profileActions.clearProfile());

        yield put(authActions.logout());
    } catch ({message}) {
        console.log('Logout Worker Error: ', message);
    } finally {
        yield put(uiActions.stopFetching());
    }
}
