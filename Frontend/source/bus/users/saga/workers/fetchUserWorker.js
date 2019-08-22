//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { usersActions } from '../../actions';

export function* fetchUserWorker({payload}) {
    try {
        yield put(usersActions.setUsersFetchingState());

        const userData = yield apply(api, api.user.getUser, [payload]);

        yield put(usersActions.fillUser(userData));
    } catch ({message}) {
        console.log('Fetch User Worker Error: ', message);
    } finally {
        yield put(usersActions.disableUsersFetchingState());
    }
}
