//Core
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Instruments
import { book } from './book';

//Pages
import { Feed, User } from '../pages';

//Components
import { Navbar, Spinner, AlertPopup, AnimatedBg } from '../components';

export default class Private extends Component {
    render() {
        return (
            <>
                <Navbar/>
                <Spinner/>
                <AlertPopup/>
                <AnimatedBg/>
                <Switch>
                    <Route
                        exact
                        path = { book.feed }
                        component = { Feed }
                    />

                    <Route
                        eact
                        path = { `${book.user}/:userId` }
                        component = { User }
                    />

                    <Redirect
                        to = { book.feed }
                    />
                </Switch>
            </>
        );
    }
}
