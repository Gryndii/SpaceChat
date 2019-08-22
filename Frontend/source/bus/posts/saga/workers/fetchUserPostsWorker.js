//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { postsActions } from '../../actions';

export function* fetchUserPostsWorker({payload: userId}) {
    try {
        yield put(postsActions.setPostsFetchingState());

        const posts = yield apply(api, api.posts.getUserPosts, [userId]);

        yield put(postsActions.fillPosts(posts));
    } catch ({message}) {
        console.log('Fetch User Posts Worker Error: ', message);
    } finally {
        yield put(postsActions.disablePostsFetchingState());
    }
}
