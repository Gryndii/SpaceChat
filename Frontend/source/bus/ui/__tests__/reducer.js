//Reducer
import { uiReducer } from '../reducer';

//Actions
import * as uiActions from '../actions';

describe('ui reducer:', () => {
  test('should return state by default', () => {
    expect(uiReducer(void 0, {type: 'TEST_ACTION'})).toMatchSnapshot()
  });

  test('should toggle isFetching to true', () => {
    expect(uiReducer(void 0, {type: 'START_FETCHING'})).toMatchSnapshot()
  });

  test('should toggle isFetching to false', () => {
    expect(uiReducer(void 0, {type: 'STOP_FETCHING'})).toMatchSnapshot()
  });

  test('should toggle isOnline to true', () => {
    expect(uiReducer(void 0, {type: 'SET_ONLINE_STATE'})).toMatchSnapshot()
  });

  test('should toggle isOnline to false', () => {
    expect(uiReducer(void 0, {type: 'SET_OFLINE_STATE'})).toMatchSnapshot()
  });
});