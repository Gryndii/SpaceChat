//Core
import React from 'react';
import { Link } from 'react-router-dom';

//Instruments
import Styles from './styles.m.css';
import { Button, Typography } from '@material-ui/core';
import { book } from '../../navigation/book';

const WelcomeScreen = (props) => {
    return (
        <div className = { Styles.welcomeScreen } >

            <Typography
                className = { Styles.title }
                variant = 'h4'
                component = 'h3'>
                Welcome <br/> to SpaceChat
            </Typography>

            <Typography
                className = { Styles.subTitle }
                variant = 'h6'
                component = 'h3'
                color = 'textSecondary'>
                It seems that you`re not authorised
            </Typography>

            <div className = { Styles.buttons }>
                <Button
                    color = 'primary'
                    variant = 'contained'
                    size = 'large'
                    component = { Link }
                    to = { book.login }>
                    Login
                </Button>

                <Button
                    color = 'secondary'
                    variant = 'contained'
                    size = 'large'
                    component = { Link }
                    to = { book.signup }>
                    Sign up
                </Button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
