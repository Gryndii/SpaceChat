//Core
import { combineReducers } from 'redux';

//Reducers
import { postsReducer as posts } from '../bus/posts/reducer';
import { uiReducer as ui } from '../bus/ui/reducer';
import { authReducer as auth } from '../bus/auth/reducer';
import { profileReducer as profile } from '../bus/profile/reducer';
import { formsReducer as form } from '../bus/forms/reducer';

export const rootReducer = combineReducers({
  posts,
  ui,
  auth,
  profile,
  form,
});