//Core
import { all, call } from 'redux-saga/effects';

//Watchers 
import { watchPosts } from '../bus/posts/saga/watchers';
import { watchAuth } from '../bus/auth/saga/watchers';

export function* rootSaga() {
  yield all([ call(watchPosts), call(watchAuth) ]);
}