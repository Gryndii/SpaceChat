//Core
import { put, call, apply } from 'redux-saga/effects';

//Instruments
import { startFetching, stopFetching } from '../../actions/uiActions';
import { fillPosts } from '../../actions/postsActions';
import { fetchPosts } from '../../../REST API';

export function* fetchPostsWorker () {
    yield put(startFetching());

    const posts = yield call(fetchPosts);

    yield put(fillPosts(posts));
    yield put(stopFetching());
}
