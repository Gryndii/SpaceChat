//Core
import React, {Component} from 'react';

//Instruments
import { Grid, Container } from '@material-ui/core';

//Components
import { Posts, PopularUsers } from '../components';

export default class Feed extends Component {
    render() {
        return (
            <Container className = 'contentPaddingTop'>
                <Grid
                    container
                    justify = 'center'
                    spacing = { 10 }>
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 6 }
                        md = { 5 }>
                        <Posts/>
                    </Grid>
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 6 }
                        md = { 4 }>
                        <PopularUsers/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
