//Types
import { types } from './types';

export const signupAsync = (userData) => {
  return {
    type: types.SIGNUP_ASYNC,
    payload: userData,
  };
};

export const loginAsync = (credentials) => {
  return {
    type: types.LOGIN_ASYNC,
    payload: credentials,
  };
};

export const authenticateAsync = () => {
  return {
    type: types.AUTHENTICATE_ASYNC,
  };
};

export const initializeAsync = () => {
  return {
    type: types.INITIALIZE_ASYNC,
  };
};

export const logoutAsync = () => {
  return {
    type: types.LOGOUT_ASYNC,
  };
};

export const authenticate = () => {
  return {
    type: types.AUTHENTICATE,
  };
};

export const initialize = () => {
  return {
    type: types.INITIALIZE,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};