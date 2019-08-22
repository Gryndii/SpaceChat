//Core
import React, {Component} from 'react';

//Instruments
import { Grid, Container } from '@material-ui/core';

//Components
import {LoginForm } from '../components';

export default class Login extends Component {
    render() {
        return (
            <Container>
                <Grid
                    container
                    spacing = { 0 }
                    direction = 'column'
                    alignItems = 'center'
                    justify = 'center'
                    style = {{ minHeight: '100vh' }}>
                    <Grid item>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
