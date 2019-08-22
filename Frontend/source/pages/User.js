//Core
import React, {Component} from 'react';

//Instruments
import {Container, Grid} from '@material-ui/core';

//Components
import {UserCard, Posts } from '../components';

export default class User extends Component {
    render() {
        const userId = this.props.match.params.userId;

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
                        <Posts userId = { userId }/>
                    </Grid>
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 6 }
                        md = { 4 }>
                        <UserCard userId = { userId } />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
