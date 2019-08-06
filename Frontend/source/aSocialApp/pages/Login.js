//Core
import React, {Component} from 'react';

//Instruments
import { Grid, Container } from '@material-ui/core';

//Components
import { AnimatedBg, LoginForm } from '../components';

class Login extends Component {
    render() {
        return (
            <>
                <AnimatedBg/>
                <Container className = 'contentPaddingTop'>
                    <Grid
                        container
                        spacing = { 10 }
                        justify = 'center'>
                        <Grid
                            item
                            xs = { 12 }
                            sm = { 6 }
                            md = { 5 }
                        >
                            <LoginForm/>
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}

export default Login;
