//Core
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

//Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// const preloadedState = JSON.parse(localStorage.getItem('postCreatorApp'));
const preloadedState = false;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [ sagaMiddleware ];

export const store = preloadedState
    ? createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)))
    : createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

const saveAppState = () => {
    const state = JSON.stringify(store.getState());
    localStorage.setItem('postCreatorApp', state);
};

store.subscribe(saveAppState);
