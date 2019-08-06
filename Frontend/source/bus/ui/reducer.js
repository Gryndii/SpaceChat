//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
  isFetching: false,
  isOnline: false,
});

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_FETCHING:
      return state.set('isFetching', true);

    case types.STOP_FETCHING:
      return state.set('isFetching', false);

    case types.SET_ONLINE_STATE:
      return state.set('isOnline', true);

    case types.SET_OFLINE_STATE:
      return state.set('isOnline', false);

    default:
      return state;
  };
};