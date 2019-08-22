//Core
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { string } from 'prop-types';
import { Formik, Form } from 'formik';
import { updateUserForm } from '../../bus/forms/shapes';

//Instruments
import Styles from './styles.m.css';
import {
    Input, Card, CardContent, Typography, Avatar, List,
    ListItem, ListItemAvatar, ListItemText, Button, CircularProgress,
} from '@material-ui/core';
import {
    EditRounded as EditIcon,
    PersonOutlined as BioIcon,
    LocationCityOutlined as LocationIcon,
    WebOutlined as WebsiteIcon,
} from '@material-ui/icons';

//Actions
import { usersActions } from "../../bus/users/actions";
import { profileActions } from "../../bus/profile/actions";


const mapStateToProps = (state) => ({
    profileUser: state.profile.getIn(['credentials', 'handle']),
    currentUser: state.users.get('currentUser'),
    isFetching: state.users.get('isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        fetchUserAsync: usersActions.fetchUserAsync,
        clearUser: usersActions.clearUser,
        updateProfileAsync: profileActions.updateProfileAsync,
        updateProfileImageAsync: profileActions.updateImageAsync,
    }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class UserCard extends Component {
    static propTypes = {
        userId: string.isRequired,
    };

    state = {
        isEditing: false,
    };

    componentDidMount() {
        const { actions, userId } = this.props;

        actions.fetchUserAsync(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userId: prevUserId } = prevProps;
        const { userId: currentUserId, actions } = this.props;

        if(prevUserId !== currentUserId) {
            actions.clearUser();
            actions.fetchUserAsync(currentUserId);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;

        actions.clearUser();
    }

    _handleButtonClick = () => {
        this.setState(({isEditing}) => ({
            isEditing: !isEditing,
        }))
    };

    _handleSubmit = (credentials) => {
        const { actions } = this.props;
        actions.updateProfileAsync(credentials);
    };

    _handleImageUploading = (e) => {
        const { actions } = this.props;
        const image = e.target.files[0];
        const formData = new FormData();

        formData.append('image', image, image.name);

        actions.updateProfileImageAsync(formData);
    };

    render() {
        const { currentUser, profileUser, isFetching } = this.props;
        const { isEditing } = this.state;
        const isMine = currentUser.get('handle') === profileUser;

        return (
            <Card className = { Styles.userCard } >
                {
                    isFetching
                        ? <div className={Styles.spinner}>
                            <CircularProgress/>
                        </div>
                        : null
                }

                <CardContent Alignment='center'>
                    <div className = { Styles.header }>
                        <div className={Styles.avatarWrapper}>
                            {
                                isMine
                                    ? <div className = { Styles.avatarBtn }>
                                          <input type="file" onChange={ this._handleImageUploading }/>
                                          <EditIcon  fontSize = '30px' />
                                      </div>
                                    : null
                            }

                            <Avatar
                                className = { Styles.avatar }
                                src = { currentUser.get('imageUrl') }
                            >
                            </Avatar>
                        </div>
                        <Typography
                            className = { Styles.nickname }
                            variant = 'h5'
                            color = 'textSecondary'>
                            {`@${currentUser.get('handle')}`}
                        </Typography>
                    </div>

                    <Formik
                        initialValues = {{
                            bio: currentUser.get('bio') ? currentUser.get('bio') : '',
                            location: currentUser.get('location') ? currentUser.get('location') : '',
                            website: currentUser.get('website') ? currentUser.get('website') : '',
                        }}
                        validationSchema={ updateUserForm.schema }
                        enableReinitialize={true}
                        onSubmit={this._handleSubmit}
                        render={ (props) => {
                            const {
                                handleChange,
                                handleBlur,
                                values,
                            } = props;

                            return (
                                <Form>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <BioIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary = 'Biography'
                                                secondary = {
                                                    <Input
                                                        name='bio'
                                                        value={values.bio}
                                                        onChange = { handleChange }
                                                        onBlur = { handleBlur }
                                                        disabled={ !isEditing }
                                                    />
                                                }
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <LocationIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary = 'Location'
                                                secondary = {
                                                    <Input
                                                        name='location'
                                                        value={values.location}
                                                        onChange = { handleChange }
                                                        onBlur = { handleBlur }
                                                        disabled={ !isEditing }
                                                    />
                                                }
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <WebsiteIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary = 'Website'
                                                secondary = {
                                                    <Input
                                                        name='website'
                                                        value={values.website}
                                                        onChange = { handleChange }
                                                        onBlur = { handleBlur }
                                                        disabled={ !isEditing }
                                                    />
                                                }
                                            />
                                        </ListItem>
                                    </List>

                                    {
                                        isMine
                                            ? <Button
                                                className={Styles.editBtn}
                                                color='primary'
                                                variant = 'outlined'
                                                size = 'medium'
                                                type = { !isEditing ? 'submit' : 'button' }
                                                onClick={ this._handleButtonClick }
                                            >
                                                <EditIcon/>
                                                { isEditing ? 'Save' : 'Edit' }
                                            </Button>
                                            : null
                                    }
                                </Form>
                            );
                        } }
                    />
                </CardContent>
            </Card>
        );
    }
}
