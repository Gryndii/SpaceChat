//Core
import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

//Instruments
import Styles from './styles.m.css';
import { book } from "../../navigation/book";
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';
import FlipMove from 'react-flip-move';

//Components
import { Post, TextComposer, PostCatcher, } from '../';

//Actions
import { postsActions } from "../../bus/posts/actions";

const mapStateToProps = (state) => {
    return {
        posts: state.posts.get('posts'),
        isPostsFetching: state.posts.get('isFetching'),
        activeUser: state.profile.getIn(['credentials', 'handle']),
        activeUserImage: state.profile.getIn(['credentials', 'imageUrl']),
        isAuthenticated: state.auth.get('isAuthenticated'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                fetchFeedPostsAsync: postsActions.fetchFeedPostsAsync,
                fetchUserPostsAsync: postsActions.fetchUserPostsAsync,
                createPostAsync: postsActions.createPostAsync,
                deletePostAsync: postsActions.deletePostAsync,
                likePostAsync: postsActions.likePostAsync,
                unlikePostAsync: postsActions.unlikePostAsync,
                fetchCommentsAsync: postsActions.fetchCommentsAsync,
                createCommentAsync: postsActions.createCommentAsync,
                clearPosts: postsActions.clearPosts,
            },
            dispatch
        ),
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Posts extends Component {
    componentDidMount() {
        const { actions, userId } = this.props;

        userId
            ? actions.fetchUserPostsAsync(userId)
            : actions.fetchFeedPostsAsync();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userId: prevUserId } = prevProps;
        const { userId: currentUserId, actions } = this.props;

        if(currentUserId && prevUserId !== currentUserId) {
            actions.clearPosts();
            actions.fetchUserPostsAsync(currentUserId);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;

        actions.clearPosts();
    }

    _handlePostSubmit = (postText) => {
        const { actions } = this.props;

        actions.createPostAsync(postText);
    };

    _handleLikeClick = (postId, isLiked) => {
        const { actions } = this.props;

        isLiked
            ? actions.unlikePostAsync(postId)
            : actions.likePostAsync(postId);
    };

    _handleCommentClick = (postId) => {
        const { actions } = this.props;

        actions.fetchCommentsAsync(postId);
    };

    _handleDeleteClick = (postId) => {
        const { actions } = this.props;

        actions.deletePostAsync(postId);
    };

    _handleCommentSubmit = (postId, comment) => {
        const { actions } = this.props;
        actions.createCommentAsync({
            postId,
            comment,
        });
    };

    render() {
        const { posts, userId, activeUser, activeUserImage, isPostsFetching } = this.props;
        const postsJsx = posts.map((post) => {
            const postId = post.get('postId');
            const isLiked = post.get('likers').some((liker) => liker === activeUser);
            return(
                <PostCatcher key = { postId }>
                    <Post
                        avatarImg={ post.get('userImage') }
                        userName={ post.get('userHandle') }
                        userLink={ `${book.user}/${post.get('userHandle')}` }
                        date={
                            moment(post.get('createdAt'))
                                .format('MMMM D h:mm:ss a')
                        }
                        text={post.get('body')}
                        likeCount={post.get('likeCount')}
                        commentCount = { post.get('commentCount') }
                        comments = { post.get('comments') }

                        showDelete = { activeUser === post.get('userHandle') }
                        isLiked = { isLiked }

                        handleLikeClick = { () => this._handleLikeClick(postId, isLiked) }
                        handleCommentClick = { () => this._handleCommentClick(postId) }
                        handleDeleteClick = { () => this._handleDeleteClick(postId) }

                        commentComposerAvatar = { activeUserImage }
                        commentComposerUrl = {`${book.user}/${activeUser}`}
                        commentComposerPlaceholder = 'What do you think about this?'
                        handleCommentSubmit = { (comment) => this._handleCommentSubmit(postId, comment) }
                    />
                </PostCatcher>
            );
        });

        return (
            <section className={Styles.posts}>
                {
                    !userId || userId === activeUser
                        ? <TextComposer
                            handleSubmit = { this._handlePostSubmit }
                            placeholder = 'What`s new in your space?'
                            avatarImg = {activeUserImage}
                            avatarUrl = {`${book.user}/${activeUser}`}
                         />
                        : null
                }

                {
                    isPostsFetching
                        ? <CircularProgress className={Styles.spinner}/>
                        : null
                }

                <FlipMove
                    duration = { 300 }
                    easing = "ease-out"
                    enterAnimation = "elevator"
                    leaveAnimation = { null }
                    typeName = { null }
                >
                    {
                        postsJsx
                    }
                </FlipMove>
            </section>
        );
    }
}
