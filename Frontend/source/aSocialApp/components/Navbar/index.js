//Core
import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Instruments
import Styles from './styles.m.css';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { book } from '../../navigation/book';

class Navbar extends Component {
    render() {
        return (
            <AppBar position = 'fixed' className = { Styles.navbar }>
                <Toolbar className = { Styles.navbarContainer }>
                    <Button
                        color = 'inherit'
                        component = { Link }
                        to = { book.home }
                    >
                        Home
                    </Button>
                    <Button
                        color = 'inherit'
                        component = { Link }
                        to = { book.login }
                    >
                        Login
                    </Button>
                    <Button
                        color = 'inherit'
                        component = { Link }
                        to = { book.signup }
                    >
                        Signup
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;
