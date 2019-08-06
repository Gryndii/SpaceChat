//Core
import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouteMiddleWare } from 'connected-react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

//Custom
import { customThunk } from './customThunk';

const logger = createLogger({
  duration:  true,
  collapsed: true,
  colors:    {
      title: (action) => {
          return action.error ? 'firebrick' : 'deepskyblue';
      },
      prevState: () => 'dodgerblue',
      action:    () => 'greenyellow',
      nextState: () => 'olivedrab',
      error:     () => 'firebrick',
  },
});

const history = createBrowserHistory();
const routerMiddleware = createRouteMiddleWare(history);
const sagaMiddleware = createSagaMiddleware();
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = __DEV__ && devtools ? devtools : compose;
const middleware = [ customThunk, routerMiddleware, sagaMiddleware ];

if (__DEV__) {
  middleware.push(logger);
}

const enhancedStore = composeEnhancers(applyMiddleware(...middleware));

export { enhancedStore, history, sagaMiddleware};