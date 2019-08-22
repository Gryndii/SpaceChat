//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { postsActions } from '../../actions';

export function* createCommentWorker({ payload: {postId, comment} }) {
    try {
        const newComment = yield apply(api, api.posts.createComment, [ postId, comment ]);

        yield put(postsActions.addComment(newComment));
    } catch ({message}) {
        console.log('Create Comment Worker Error: ', message);
    } finally {

    }
}
