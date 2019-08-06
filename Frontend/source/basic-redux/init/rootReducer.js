//Core
import { combineReducers } from 'redux';

//Reducers
import { galleryReducer as gallery } from '../bus/gallery/reducer';

export const rootReducer = combineReducers({
  gallery,
});