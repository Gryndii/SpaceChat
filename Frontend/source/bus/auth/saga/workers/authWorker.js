//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';
import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* authWorker() {
    try {
        yield put(uiActions.startFetching());

        const token = yield api.token;

        if (!token) { return; }

        const userData = yield apply(api, api.profile.getProfileUser);

        yield put(profileActions.fillProfile(userData));

        yield put(authActions.authenticate());
    } catch ({message}) {
        console.log('Authentication Worker Error: ', message);
    } finally {
        yield put(uiActions.stopFetching());
    }
}
