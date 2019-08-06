//Core 
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';
import { unlikePost } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions'
 
export function* unlikePostWorker({ payload: postId }) {
  try {
    yield put(startFetching());

    yield apply(api, api.posts.like, [ postId ]);

    const userId = yield select(state => state.profile.get('id'));

    yield put(unlikePost({ postId, userId }));
  } catch (error) {
    console.log(error)
  } finally {
    yield put(stopFetching());
  }
};