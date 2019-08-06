//Core
import { all, call } from "redux-saga/effects";

//Watchers
import { watchWorkers } from "./redux-saga/watchers";

export function* rootSaga() {
    yield all([ call(watchWorkers) ]);
}
