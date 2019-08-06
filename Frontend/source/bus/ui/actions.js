//Types
import { types } from './types';

export const startFetching = () => {
  return {
    type: types.START_FETCHING,
  };
};

export const stopFetching = () => {
  return {
    type: types.STOP_FETCHING,
  };
};

export const setOnlineState = () => {
  return {
    type: types.SET_ONLINE_STATE,
  };
};

export const setOflineState = () => {
  return {
    type: types.SET_OFLINE_STATE,
  };
};