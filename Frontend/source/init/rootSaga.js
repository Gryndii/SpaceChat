//Core
import { all, call } from 'redux-saga/effects';

//Watchers
import { watchAuth } from '../bus/auth/saga/watchers';
import { watchProfile } from '../bus/profile/saga/watchers';
import { watchPosts } from '../bus/posts/saga/watchers';
import { watchUsers } from '../bus/users/saga/watchers';

export function* rootSaga() {
    yield all([
        call(watchAuth),
        call(watchProfile),
        call(watchPosts),
        call(watchUsers),
    ]);
}
