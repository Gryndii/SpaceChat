//Core 
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';
import { createPost } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions'
 
export function* createPostWorker({ payload: comment }) {
  try {
    yield put(startFetching());

    const post = yield apply(api, api.posts.create, [ comment ]);

    yield put(createPost(post));
  } catch (error) {
    console.log(error)
  } finally {
    yield put(stopFetching());
  }
};