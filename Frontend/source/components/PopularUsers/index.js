//Core
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

//Instruments
import { book } from '../../navigation/book';
import Styles from './styles.m.css';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Link as MULink,
    CircularProgress,
    Divider,
} from '@material-ui/core';
import {
    FavoriteRounded as FavoriteIcon
} from '@material-ui/icons';

//Actions
import { usersActions } from "../../bus/users/actions";

const mapStateToProps = (state) => ({
    popularUsers: state.users.get('popularUsers'),
    isFetching: state.users.get('isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        fetchPopularUsersAsync: usersActions.fetchPopularUsersAsync,
    }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class PopularUsers extends Component {
    componentDidMount() {
        const { actions } = this.props;

        actions.fetchPopularUsersAsync();
    }

    render() {
        const { popularUsers, isFetching } = this.props;
        const popularUsersJsx = popularUsers.map((user) => (
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        component={ Link }
                        to={`${book.user}/${user.get('handle')}`}
                        src={user.get('imageUrl')}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <MULink
                            component={Link}
                            to={`${book.user}/${user.get('handle')}`}
                        >
                            { user.get('handle') }
                        </MULink>
                    }
                />
                <ListItemSecondaryAction
                    className={Styles.likeCount}
                >
                    <Typography
                        color = 'textSecondary'
                        component = 'span'
                    >
                        { user.get('userRate') }
                    </Typography>
                    <FavoriteIcon htmlColor = '#fb8383' className={Styles.likeIcon}/>
                </ListItemSecondaryAction>
            </ListItem>
        ));

        return (
            <Card className={Styles.popularUsers}>
                {
                    isFetching
                        ? <div className={Styles.spinner}>
                             <CircularProgress/>
                         </div>
                        : null
                }

                <CardContent>
                    <Typography
                        variant='h5'
                        className={Styles.title}
                        color='textSecondary'
                    >
                        Popular Users
                    </Typography>

                    <Divider/>

                    <List className={Styles.list}>

                        { popularUsersJsx }

                    </List>
                </CardContent>
            </Card>
        );
    }
}

