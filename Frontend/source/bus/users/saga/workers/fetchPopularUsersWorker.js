//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { usersActions } from '../../actions';

export function* fetchPopularUsersWorker() {
    try {
        yield put(usersActions.setUsersFetchingState());

        const userData = yield apply(api, api.user.getPopularUsers);

        yield put(usersActions.fillPopularUsers(userData));
    } catch ({message}) {
        console.log('Fetch Popular Users Worker Error: ', message);
    } finally {
        yield put(usersActions.disableUsersFetchingState());
    }
}
