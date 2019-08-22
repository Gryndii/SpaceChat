//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { postsActions } from '../../actions';

export function* fetchCommentsWorker({ payload }) {
    try {
        const {
            postId, comments, commentCount,
        } = yield apply(api, api.posts.getExtendedPost, [ payload ]);

        yield put(postsActions.fillComments({
            postId,
            comments,
            commentCount,
        }));
    } catch ({message}) {
        console.log('Fetch Comments Worker Error: ', message);
    } finally {

    }
}
