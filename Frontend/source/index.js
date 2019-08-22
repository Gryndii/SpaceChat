// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

//Instruments
import './theme/init.css';
import { store, history } from './init/store';

//App
import App from './navigation/App';

render(
    <Provider store = { store }>
        <Router history = { history }>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app'),
);

