//Core
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { usersActions } from '../../../users/actions';

export function* updateImageWorker({payload: image}) {
    try {
        yield put(usersActions.setUsersFetchingState());

        yield apply(api, api.profile.updateProfileImage, [ image ]);

        const profileUser = yield select(
            (state) => state.profile.getIn([ 'credentials', 'handle' ]),
        );

        yield put(usersActions.fetchUserAsync(profileUser));
    } catch ({message}) {
        console.log('Update Image Worker Error: ', message);
    } finally {
        yield put(usersActions.disableUsersFetchingState());
    }
}
