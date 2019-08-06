//Core
import React, {Component} from 'react';
import { connect } from 'react-redux';

//Instruments
import Styles from './styles.m.css';

//Actions
import { fetchPostsAsync } from '../../redux/actions/postsActions';

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPostsAsync();
    }

    render() {
        const { posts } = this.props;
        console.log('POSTS COMPONENT`s post', posts);
        const postsJSX = posts.map((post) => {
            return(
                <div
                    key = { post.get('id') }
                    className = { Styles.post }
                >
                    <h2>{post.get('title')}</h2>
                    <p>{post.get('body')}</p>
                </div>
            );
        });

        return (
            <div className = { Styles.posts }>
                {postsJSX}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.postsReducer.get('posts'),
    };
};

const mapDispatchToProps = {
    fetchPostsAsync: fetchPostsAsync,
};

export default connect(mapStateToProps,  mapDispatchToProps)(Posts);
