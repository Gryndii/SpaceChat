//Core
import { createStore } from 'redux';
import { connectRouter } from 'connected-react-router';

//Reducer
import { rootReducer } from './rootReducer';

//RootSaga
import { rootSaga } from './rootSaga';

//Middlewear 
import { enhancedStore, history, sagaMiddleware } from './middlewear/core';

export const store = createStore(
  connectRouter(history)(rootReducer), 
  enhancedStore
);

export { history };

sagaMiddleware.run(rootSaga);