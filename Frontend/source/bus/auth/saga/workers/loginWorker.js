//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* loginWorker({ payload: loginCredentials }) {
    try {
        yield put(uiActions.startFetching());

        const token = yield apply(api, api.auth.login, [ loginCredentials ]);

        yield api.token = {
            remember: loginCredentials.remember,
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
        console.log('Login Worker Error: ', message);
    } finally {
        yield put(uiActions.stopFetching());
    }
}
