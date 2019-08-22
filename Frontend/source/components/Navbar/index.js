//Core
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Instruments
import Styles from './styles.m.css';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import {
    ChatBubble as CommentIcon,
    Home as HomeIcon,
    Input as ExitIcon,
} from '@material-ui/icons';
import { book } from '../../navigation/book';

//Actions
import { authActions } from "../../bus/auth/actions";


const mapStateToProps = (state) => ({
    userUrl: state.profile.getIn(['credentials', 'handle'])
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        logoutAsync: authActions.logoutAsync,
    }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Navbar extends Component {
    render() {
        const { actions, userUrl } = this.props;
        const NavLinkRef = React.forwardRef((props, ref) => <div ref={ref}><NavLink {...props} /></div>);

        return (
            <AppBar position = 'fixed' className = { Styles.navbar }>
                <Toolbar className = { Styles.navbarContainer }>
                    <Button
                        className = { Styles.navbarBtn }
                        color = 'inherit'
                        component = { NavLinkRef }
                        activeClassName = { Styles.activeBtn }
                        to = { book.feed }
                    >
                        Feed
                        <CommentIcon/>
                    </Button>

                    <Button
                        className = { Styles.navbarBtn }
                        color = 'inherit'
                        component = { NavLinkRef }
                        activeClassName = { Styles.activeBtn }
                        to = { `${book.user}/${ userUrl }` }
                    >
                        My Page
                        <HomeIcon size = 'small'/>
                    </Button>

                    <Button
                        className = { Styles.navbarBtn }
                        color = 'inherit'
                        onClick={ actions.logoutAsync }
                    >
                        Logout
                        <ExitIcon/>
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}
