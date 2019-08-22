//Core
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { postsActions } from '../../actions';

export function* likePostWorker({ payload: postId }) {
    try {
        yield apply(api, api.posts.like, [ postId ]);

        const liker = yield select((state) => state.profile.getIn([ 'credentials', 'handle' ]));

        yield put(postsActions.likePost({
            postId,
            liker,
        }));
    } catch ({message}) {
        console.log('Like Post Worker Error: ', message);
    } finally {

    }
}
