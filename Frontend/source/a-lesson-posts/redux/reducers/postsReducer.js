import { types } from '../types';
import { List, fromJS, Map } from 'immutable';

const initialState = fromJS({
    posts: [],
});

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_POSTS: {
            return state.update('posts', () => fromJS(action.payload));
        }
        case types.ADD_POST: {
            console.log('Add Podst Data', action.payload);
            return state.update('posts', (posts) => posts.unshift(Map({
                title: action.payload[0].title,
                body: action.payload[0].body,
                id: action.payload.id,
            })));
        }
        default: {
            return state;
        }
    }
};
