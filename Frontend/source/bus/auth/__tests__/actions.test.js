//Actions

import * as actions from '../actions';
import { types } from '../types';

// const testString = 'test';

describe('auth actions', () => {
  test('signupAsync', () => {
    expect(actions.signupAsync(__.userProfile)).toEqual({
      type: types.SIGNUP_ASYNC,
      payload: __.userProfile,
    });
  });

  test('loginAsync', () => {
    expect(actions.loginAsync(__.credentials)).toEqual({
      type: types.LOGIN_ASYNC,
      payload: __.credentials,
    });
  });

  test('authenticateAsync', () => {
    expect(actions.authenticateAsync()).toEqual({
      type: types.AUTHENTICATE_ASYNC,
    });
  });

  test('initializeAsync', () => {
    expect(actions.initializeAsync()).toEqual({
      type: types.INITIALIZE_ASYNC,
    });
  });

  test('logoutAsync', () => {
    expect(actions.logoutAsync()).toEqual({
      type: types.LOGOUT_ASYNC,
    });
  });

  test('authenticate', () => {
    expect(actions.authenticate()).toEqual({
      type: types.AUTHENTICATE,
    });
  });

  test('initialize', () => {
    expect(actions.initialize()).toEqual({
      type: types.INITIALIZE,
    });
  });

  test('logout', () => {
    expect(actions.logout()).toEqual({
      type: types.LOGOUT,
    });
  });
});