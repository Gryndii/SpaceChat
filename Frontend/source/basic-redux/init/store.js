//Core
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

//Reducer
import { rootReducer } from './rootReducer';

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

const presistedState = JSON.parse(localStorage.getItem('gallery'));
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools ? devtools : compose;
const enhancedStore = composeEnhancers(applyMiddleware(logger));

export const store = presistedState 
  ? createStore(rootReducer, presistedState, enhancedStore)
  : createStore(rootReducer, enhancedStore);

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('gallery', JSON.stringify(state));
});