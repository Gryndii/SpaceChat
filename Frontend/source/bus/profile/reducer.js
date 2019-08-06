//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
  id: '',
  firstName: '',
  lastName: '',
  token: '',
  avatar: '',
});

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILL_PROFILE:
      return state.merge(action.payload)

    case types.CLEAR_PROFILE:
      return initialState;

    default:
      return state;
  };
};