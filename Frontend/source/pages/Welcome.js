//Core
import React, {Component} from 'react';

//Instruments
import { Grid, Container } from '@material-ui/core';

//Components
import { WelcomeScreen } from '../components';

export default class Welcome extends Component {
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
                        <WelcomeScreen/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
