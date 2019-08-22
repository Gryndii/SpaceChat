//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';
import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* signupWorker({ payload: signupCredentials }) {
    try {
        yield put(uiActions.startFetching());

        const token = yield apply(api, api.auth.signup, [ signupCredentials ]);

        yield api.token = {
            remember: signupCredentials.remember,
            token,
        };

        const userData = yield apply(api, api.profile.getProfileUser);

        yield put(profileActions.fillProfile(userData));

        yield put(authActions.authenticate());
    } catch ({name, message, response}) {
        if (name === 'ServerError') {
            yield put(uiActions.openAlertPopup({
                title:   'Server Error',
                message: response[ Object.keys(response)[ 0 ] ],
            }));
        }
        console.log('Signup Worker Error: ', message);
    } finally {
        yield put(uiActions.stopFetching());
    }
}
