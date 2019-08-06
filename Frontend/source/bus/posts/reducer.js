//Core
import { List, fromJS } from 'immutable';

//Types
import { types } from './types';

const initialState = List();

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILL_POSTS: {
      return fromJS(action.payload);
    }

    case types.CREATE_POST: {
      return state.unshift(fromJS(action.payload));
    }

    case types.REMOVE_POST: {
      return state.filter(post => post.get('id') !== action.payload);
    }

    case types.LIKE_POST: {
      const index = state.findLastIndex(post => post.get('id') === action.payload.postId);

      return state.updateIn([index, 'likes'], likes => likes.unshift(action.payload.liker));
    }

    case types.UNLIKE_POST: {
      const index = state.findIndex(post => post.get('id') === action.payload.postId);
    

      return state.updateIn([index, 'likes'], likes => {
        return likes.filter(like => like.get('id') !== action.payload.userId)
      });
    }

    default: {
      return state;
    }
  };
};