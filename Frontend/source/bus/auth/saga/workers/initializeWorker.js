//Core 
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { authenticateAsync, initialize } from '../../actions';

export function* initializeWorker() {
  try {
    const remember = yield apply(localStorage, localStorage.getItem, ['remember']);

    yield delay(1000);

    if (remember) {
      yield put(authenticateAsync());
    } else {
      yield put(initialize());
    }

  } catch (error) {
    console.log('initializeWorker', error);
  }
};