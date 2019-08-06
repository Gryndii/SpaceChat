// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';

//Routes
import Public from './Public';
import Private from './Private';
import { Loading } from '../components';

//Actions
import { initializeAsync } from '../bus/auth/actions';
import { listenConnection, listenPosts } from '../bus/socket/actions';
//Socket
import { socket, joinSocketChannel } from '../init/socket';

const mapState = state => {
    return {
        isAuthenticated: state.auth.get('isAuthenticated'),
        isInitialized: state.auth.get('isInitialized'),
    };
};

@hot(module)
@withRouter
@connect(mapState, { initializeAsync, listenConnection, listenPosts })
export default class App extends Component {
    componentDidMount () {
        this.props.initializeAsync();
        this.props.listenConnection();
        joinSocketChannel();
    }

    render () {
        const { isAuthenticated, isInitialized, listenPosts } = this.props;

        if  (!isInitialized) {
            return <Loading />
        }

        return isAuthenticated ? <Private listenPosts = { listenPosts } socket = { socket } /> : <Public />
    }
}

