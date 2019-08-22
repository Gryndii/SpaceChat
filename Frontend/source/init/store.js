//Core
import { createStore } from 'redux';

//Roots
import { createRootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

//Middleware
import { enhancedStore, sagaMiddleware, history } from './middleware';

const store = createStore(
    createRootReducer(history),
    enhancedStore,
);

export { store, history };

sagaMiddleware.run(rootSaga);
