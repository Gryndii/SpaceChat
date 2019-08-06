//Core
import { put, call } from 'redux-saga/effects';

//Instruments
import { startFetching, stopFetching } from '../../actions/uiActions';
import { addPost } from '../../actions/postsActions';
import { createPost } from '../../../REST API';

export function* createPostWorker ({ payload }) {
    yield put(startFetching());

    const newPosts = yield call(createPost, [ payload ]);

    yield put(addPost(newPosts));

    yield put(stopFetching());
}
