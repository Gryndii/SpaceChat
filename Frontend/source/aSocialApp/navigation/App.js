//Core
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Instruments
import { book } from './book';
import { materialUiTheme } from '../theme/assets/materialUiTheme';

//Pages
import { Home, Login, Signup } from '../pages';

//Components
import { Navbar, withMaterialUiTheme } from '../components';

class App extends Component {
    render() {
        return (
            <Router>
                <Navbar/>
                <Switch>
                    <Route
                        exact
                        component = { Home }
                        path = { book.home }
                    />
                    <Route
                        exact
                        component = { Login }
                        path = { book.login }
                    />
                    <Route
                        exact
                        component = { Signup }
                        path = { book.signup }
                    />
                </Switch>
            </Router>
        );
    }
}

export default withMaterialUiTheme(materialUiTheme)(App);
