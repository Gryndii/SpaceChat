//Core
import React, {Component} from 'react';

//Instruments
import {object} from 'prop-types';
import Styles from './styles.m.css';
import { Card, Typography } from '@material-ui/core';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch(error, errorInfo) {
        console.log('ERROR: ', error);
        console.log('STACKTRACE', errorInfo.componentStack);

        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return (
                <Card className = { Styles.postCatcher }>
                    <Typography
                        component = 'h5'
                        variant = 'h5'
                        color = 'textSecondary'
                        className = { Styles.title }>
                        Oops, error occured in this post =(
                    </Typography>
                </Card>
            );
        }

        return this.props.children;
    }
}

