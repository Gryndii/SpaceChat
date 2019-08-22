//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { profileActions } from '../../actions';

export function* fillProfileWorker() {
    try {
        const userData = yield apply(api, api.profile.getProfileUser);

        yield put(profileActions.fillProfile(userData));
    } catch ({message}) {
        console.log('Fill Profile Worker Error: ', message);
    } finally {

    }
}
