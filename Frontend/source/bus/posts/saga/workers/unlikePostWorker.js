//Core
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Actions
import { postsActions } from '../../actions';

export function* unlikePostWorker({ payload: postId }) {
    try {
        yield apply(api, api.posts.unlike, [ postId ]);

        const liker = yield select((state) => state.profile.getIn([ 'credentials', 'handle' ]));

        yield put(postsActions.unlikePost({
            postId,
            liker,
        }));
    } catch ({message}) {
        console.log('Unlike Post Worker Error: ', message);
    } finally {

    }
}
