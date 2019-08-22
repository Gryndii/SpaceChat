//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';

//Instruments
import { materialUiTheme } from '../theme/assets/materialUiTheme';

//Routes
import Public from './Public';
import Private from './Private';

//Components
import { withMaterialUiTheme } from '../components';

//Actions
import { authActions } from '../bus/auth/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps  = (dispatch) => ({
    actions: bindActionCreators({
        authenticateAsync: authActions.authenticateAsync,
    }, dispatch),
});

@hot(module)
@withMaterialUiTheme(materialUiTheme)
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    componentDidMount() {
        const { actions } = this.props;

        actions.authenticateAsync();
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            isAuthenticated
                ? <Private/>
                : <Public/>
        );
    }
}
