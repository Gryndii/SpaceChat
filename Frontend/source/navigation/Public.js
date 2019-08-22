//Core
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Instruments
import { book } from './book';

//Pages
import { Welcome, Login, Signup } from '../pages';

//Components
import {AlertPopup, AnimatedBg, Spinner} from '../components';

export default class Public extends Component {
    render() {
        return (
            <>
                <AnimatedBg/>
                <Spinner/>
                <AlertPopup/>
                <Switch>
                    <Route
                        exact
                        path = { book.welcome }
                        component = { Welcome }
                    />

                    <Route
                        exact
                        path = { book.login }
                        component = { Login }
                    />

                    <Route
                        exact
                        path = { book.signup }
                        component = { Signup }
                    />

                    <Redirect to = { book.welcome }/>
                </Switch>
            </>
        );
    }
}
