//Core
import React, {Component} from 'react';

//Instruments
import {Container, Grid} from '@material-ui/core';

//Components
import { SignupForm } from '../components';

export default class Signup extends Component {
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
                        <SignupForm/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
