import { combineReducers } from 'redux';

import { uiReducer } from './reducers/uiReducer';
import { schedulerReducer } from './reducers/schedulerReducer';
import { postsReducer } from './reducers/postsReducer';

export const rootReducer = combineReducers({
    uiReducer,
    schedulerReducer,
    postsReducer,
});

