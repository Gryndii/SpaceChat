//Core 
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';
import { removePost } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions'
 
export function* removePostWorker({ payload: postId }) {
  try {
    yield put(startFetching());

    yield apply(api, api.posts.remove, [ postId ]);

    yield put(removePost(postId));
  } catch (error) {
    console.log(error)
  } finally {
    yield put(stopFetching());
  }
};