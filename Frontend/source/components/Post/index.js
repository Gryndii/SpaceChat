//Core
import React, {Component} from 'react';
import { number, string, shape, bool, func } from 'prop-types';
import { Link } from 'react-router-dom';

//Instruments
import Styles from './styles.m.css';
import {
    Card, CardContent, CardHeader, Avatar, IconButton,
    Typography, CardActions, Collapse, Fab, Link as MULink,
    List, ListItem, ListItemText, ListItemAvatar, Divider,
} from '@material-ui/core';
import {
    Favorite as FavoriteIcon,
    Delete as DeleteIcon,
    InsertComment as InsertCommentIcon,
} from '@material-ui/icons';

//Components
import { TextComposer } from '../';


export default class Post extends Component {
    state = {
        isExpanded: false,
    };

    static propTypes = {
        avatarImg:    string.isRequired,
        userName:     string.isRequired,
        userLink:     string.isRequired,
        date:         string.isRequired,
        text:         string.isRequired,
        likeCount:    number.isRequired,
        commentCount: number.isRequired,
        comments:     shape([
            {
                userHandle: string.isRequired,
                userImage:  string.isRequired,
                body:       string.isRequired,
            },
        ]).isRequired,
        handleLikeClick:            func.isRequired,
        handleCommentClick:         func.isRequired,
        handleDeleteClick:          func.isRequired,
        showDelete:                 bool.isRequired,
        isLiked:                    bool.isRequired,
        commentComposerAvatar:      string.isRequired,
        commentComposerUrl:         string.isRequired,
        commentComposerPlaceholder: string.isRequired,
        handleCommentSubmit:        func.isRequired,
    };

    _togglePostExpanding = () => {
        this.setState(({ isExpanded }) => ({
            isExpanded: !isExpanded,
        }));
    };

    _handleLikeClick = () => {
        this.props.handleLikeClick();
    };

    _handleCommentClick = () => {
        const { isExpanded } = this.state;

        if (!isExpanded) { this.props.handleCommentClick(); }

        this._togglePostExpanding();
    };

    _handleDeleteClick = () => {
        this.props.handleDeleteClick();
    };

    render() {
        const { isExpanded } = this.state;
        const {
            avatarImg, userLink, userName, date, text, comments,
            commentCount, likeCount, isLiked, showDelete,
            commentComposerAvatar, commentComposerUrl, commentComposerPlaceholder,
            handleCommentSubmit,
        } = this.props;

        const commentsJsx = comments.map((comment) => (
            <ListItem alignItems = 'flex-start'>
                <ListItemAvatar>
                    <Avatar
                        alt = { comment.get('userHandle') }
                        src = { comment.get('userImage') }
                    />
                </ListItemAvatar>
                <ListItemText
                    primary = { comment.get('userHandle') }
                    secondary = {
                        <React.Fragment>
                            <Typography
                                component = 'span'
                                variant = 'body2'
                                color = 'textPrimary'>
                                { `${userName}, ` }
                            </Typography>
                            {comment.get('body') }
                        </React.Fragment>
                    }
                />
            </ListItem>
        ));

        return (
            <Card className = { Styles.post }>
                <CardHeader
                    avatar = {
                        <Link to = { userLink }>
                            <Avatar
                                src = { avatarImg }>
                            </Avatar>
                        </Link>
                    }
                    action = {
                        showDelete
                            ? <IconButton onClick = { this._handleDeleteClick }>
                                <DeleteIcon />
                              </IconButton>
                            : null
                    }
                    title = {
                        <MULink
                            component = { Link }
                            to = { userLink }>
                            { userName }
                        </MULink>
                    }
                    subheader = { date }
                />

                <CardContent>
                    <Typography
                        variant = 'body2'
                        color = 'textSecondary'
                        component = 'p'>
                        { text }
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <Fab
                        variant = 'extended'
                        size = 'medium'
                        color = 'primary'
                        aria-label = 'add'
                        className = { Styles.controlIcon }
                        onClick = { this._handleLikeClick }>
                        <FavoriteIcon htmlColor = { isLiked ? '#ff5168' : '#fff' } />
                        <Typography
                            variant = 'body2'
                            color = 'inherit'
                            component = 'span'
                            className = { Styles.iconCount }>
                            { likeCount }
                        </Typography>
                    </Fab>

                    <Fab
                        variant = 'extended'
                        size = 'medium'
                        color = 'primary'
                        onClick = { this._handleCommentClick }
                        aria-expanded = { isExpanded }
                        aria-label = 'show more'
                        className = { Styles.controlIcon }>
                        <InsertCommentIcon/>
                        <Typography
                            variant = 'body2'
                            color = 'inherit'
                            component = 'span'
                            className = { Styles.iconCount }>
                            { commentCount }
                        </Typography>
                    </Fab>
                </CardActions>

                <Collapse
                    in = { isExpanded }
                    timeout = 'auto'
                    unmountOnExit>
                    <CardContent>
                        <TextComposer
                            handleSubmit = { handleCommentSubmit }
                            placeholder = { commentComposerPlaceholder }
                            avatarImg = { commentComposerAvatar }
                            avatarUrl = { commentComposerUrl }
                        />

                        <List>
                            <Divider
                                variant = 'fullWidth'
                                component = 'li'
                            />
                            { commentsJsx }
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}
