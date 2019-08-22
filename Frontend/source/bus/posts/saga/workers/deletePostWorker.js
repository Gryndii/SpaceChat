//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { postsActions } from '../../actions';

export function* deletePostWorker({ payload: postId }) {
    try {
        yield apply(api, api.posts.delete, [ postId ]);

        yield put(postsActions.removePost(postId));
    } catch ({message, response}) {
        console.log('Delete Post Worker Error: ', message);
    } finally {

    }
}
