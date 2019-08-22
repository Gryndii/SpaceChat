//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { postsActions } from '../../actions';

export function* createPostWorker({ payload: postText }) {
    try {
        yield put(postsActions.setPostsFetchingState());

        const newPost = yield apply(api, api.posts.create, [ postText ]);

        yield put(postsActions.addPosts(newPost));
    } catch ({message}) {
        console.log('Create Posts Worker Error: ', message);
    } finally {
        yield put(postsActions.disablePostsFetchingState());
    }
}
