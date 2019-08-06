//Core
import React, {Component} from 'react';

//Instruments
import { Grid, Container } from '@material-ui/core';
import { api } from '../API';

//Components
import { Post } from '../components';

class Home extends Component {
    state = {
        posts:      [],
        isFetching: false,
    };

    _setFetchingState = (state = true) => {
        this.setState({
            isFetching: state,
        });
    };

    _getAllPostsAsync = async () => {
        try {
            this._setFetchingState();

            const posts = await api.posts.getAll();
            console.log('Posts: ', posts);

            this.setState({
                posts: posts,
            });
        } catch ({ message }) {
            console.log(message);
        } finally {
            this._setFetchingState(false);
        }
    };

    componentDidMount() {
        this._getAllPostsAsync();
    }

    render() {
        const { posts } = this.state;
        const postsJsx = posts.map((post) => {
            return (
                <Post
                    key = { post.postId }
                    { ...post }
                />
            );
        });

        return (
            <Container className = 'contentPaddingTop'>
                <Grid
                    container
                    spacing = { 10 }
                    justify = 'center'>
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 6 }
                        md = { 5 }>
                        { postsJsx }
                    </Grid>
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 6 }
                        md = { 4 }>
                        Sidebar...
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Home;
