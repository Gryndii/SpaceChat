//Core 
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';
import { likePost } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions'
 
export function* likePostWorker({ payload: postId }) {
  try {
    yield put(startFetching());

    yield apply(api, api.posts.like, [ postId ]);

    const liker = yield select(state => state.profile.removeAll(['avatar', 'token']));

    yield put(likePost({ postId, liker }));
  } catch (error) {
    console.log(error)
  } finally {
    yield put(stopFetching());
  }
};