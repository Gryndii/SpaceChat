//Core
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { profileActions } from '../../actions';
import { usersActions } from '../../../users/actions';

export function* updateProfileWorker({payload: newData}) {
    try {
        yield put(usersActions.setUsersFetchingState());

        yield apply(api, api.profile.updateProfile, [ newData ]);

        yield put(profileActions.fillProfileAsync());

        const profileUser = yield select(
            (state) => state.profile.getIn([ 'credentials', 'handle' ]),
        );

        yield put(usersActions.fetchUserAsync(profileUser));
    } catch ({message}) {
        console.log('Update Profile Worker Error: ', message);
    } finally {
        yield put(usersActions.disableUsersFetchingState());
    }
}
