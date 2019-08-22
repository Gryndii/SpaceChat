//Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

//Reducers
import { authReducer as auth } from '../bus/auth/reducer';
import { profileReducer as profile } from '../bus/profile/reducer';
import { usersReducer as users } from '../bus/users/reducer';
import { postsReducer as posts } from '../bus/posts/reducer';
import { uiReducer as ui } from '../bus/ui/reducer';

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth,
    profile,
    users,
    posts,
    ui,
});
