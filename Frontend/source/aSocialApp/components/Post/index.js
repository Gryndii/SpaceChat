//Core
import React, {Component} from 'react';
import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import cx from 'classnames';

//Instruments
import Styles from './styles.m.css';
import {
    Card,
    CardContent,
    CardHeader,
    Avatar,
    IconButton,
    Typography,
    CardActions,
    Collapse,
    Fab,
} from '@material-ui/core';
import {
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    ExpandMore as ExpandMoreIcon,
    MoreVert as MoreVertIcon,
    InsertComment as InsertCommentIcon,
} from '@material-ui/icons';

class Post extends Component {
    static propTypes = {
        postId: string.isRequired,
        userHandle:     string.isRequired,
        userImage:    string.isRequired,
        body:         string.isRequired,
        createdAt:    string.isRequired,
        commentCount: number.isRequired,
        likeCount:    number.isRequired,
    };

    state = {
        isExpanded: false,
    };

    _togglePostExpanding = () => {
        this.setState(({ isExpanded }) => ({
            isExpanded: !isExpanded,
        }));
    };

    render() {
        // //const classes = useStyles();
        // const [ expanded, setExpanded ] = React.useState(false);
        //
        // const handleExpandClick = () => {
        //     setExpanded(!expanded);
        // };
        const {
            postId,
            userHandle,
            userImage,
            body,
            createdAt,
            commentCount,
            likeCount
        } = this.props;
        const { isExpanded } = this.state;

        return (
            <Card className = { Styles.post }>
                <CardHeader
                    avatar = {
                        <Avatar
                            aria-label = 'recipe'
                            src = { userImage }
                        >
                            { userHandle[0] }
                        </Avatar>
                    }
                    action = {
                        <IconButton aria-label = 'settings'>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title = {
                        <Link to = { `/user/${ userHandle }` }>
                            { `@${ userHandle }` }
                        </Link>
                    }
                    subheader = { moment(createdAt).format('MMMM D h:mm:ss a') }
                />
                <CardContent>
                    <Typography
                        variant = 'body2'
                        color = 'textSecondary'
                        component = 'p'>
                        { body }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        className={ Styles.controlIcon }
                    >
                        <FavoriteIcon />
                        <Typography
                            variant = 'body2'
                            color = 'inherit'
                            component = 'span'
                            className={ Styles.iconCount }
                        >
                            { likeCount }
                        </Typography>
                    </Fab>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        // className={clsx(classes.expand, {
                        //     [classes.expandOpen]: expanded,
                        // })}
                        onClick = { this._togglePostExpanding }
                        aria-expanded = { isExpanded }
                        aria-label = 'show more'
                        className={ Styles.controlIcon }
                    >
                        <InsertCommentIcon/>
                        <Typography
                            variant = 'body2'
                            color = 'inherit'
                            component = 'span'
                            className={ Styles.iconCount }
                        >
                            { commentCount }
                        </Typography>
                    </Fab>
                </CardActions>
                <Collapse
                    in = { isExpanded }
                    timeout = 'auto'
                    unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                            again without stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default Post;
