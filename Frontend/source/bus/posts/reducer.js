//Core
import { fromJS, List } from 'immutable';

//Types
import { types } from './types';

const initialState = fromJS({
    posts:      [],
    isFetching: false,
});

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_POSTS:
            return state.set('posts', fromJS(action.payload));

        case types.ADD_POST:
            return state.update('posts', (posts) => posts.unshift(fromJS(action.payload)));

        case types.REMOVE_POST:
            return state.update('posts', (posts) => {
                return posts.filter((post) => post.get('postId') !== action.payload);
            });

        case types.CLEAR_POSTS:
            return state.set('posts', List());

        case types.LIKE_POST: {
            const index = state.get('posts').findIndex((post) => post.get('postId') === action.payload.postId);

            return state.updateIn([ 'posts', index ], (post) => {
                return post
                    .update('likeCount', (likeCount) => likeCount + 1)
                    .update('likers', (likers) => likers.unshift(action.payload.liker));
            });
        }

        case types.UNLIKE_POST: {
            const index = state.get('posts').findIndex((post) => post.get('postId') === action.payload.postId);

            return state.updateIn([ 'posts', index ], (post) => {
                return post
                    .update('likeCount', (likeCount) => likeCount - 1)
                    .update('likers', (likers) => likers.filter((liker) => liker !== action.payload.liker));
            });
        }

        case types.FILL_COMMENTS: {
            const index = state.get('posts').findIndex((post) => post.get('postId') === action.payload.postId);

            return state.updateIn([ 'posts', index ], (post) => {
                return post
                    .set('commentCount', action.payload.commentCount)
                    .set('comments', fromJS(action.payload.comments));
            });
        }

        case types.ADD_COMMENT: {
            const index = state.get('posts').findIndex((post) => post.get('postId') === action.payload.postId);

            return state.updateIn([ 'posts', index ], (post) => {
                return post
                    .update('commentCount', (commentCount) => commentCount + 1)
                    .update('comments', (comments) => comments.unshift(fromJS(action.payload)));
            });
        }

        case types.SET_POSTS_FETCHING_STATE:
            return state.set('isFetching', true);

        case types.DISABLE_POSTS_FETCHING_STATE:
            return state.set('isFetching', false);

        default:
            return state;
    }
};
