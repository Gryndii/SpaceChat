//Core
import React, {Component} from 'react';
import { Formik, Form } from 'formik';
import { login } from '../../bus/forms/shapes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Instruments
import Styles from './styles.m.css';
import {TextField, Button, Typography, FormControlLabel, Checkbox, Link as MULink} from '@material-ui/core';

//Actions
import { authActions } from '../../bus/auth/actions';
import {Link} from "react-router-dom";
import {book} from "../../navigation/book";

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                loginAsync: authActions.loginAsync,
            },
            dispatch
        ),
    };
};

@connect(null, mapDispatchToProps)
export default class LoginForm extends Component {

    _handleLoginFormSubmit = (credentials, actions) => {
        this.props.actions.loginAsync(credentials);
        actions.setSubmitting(false);
    };

    render() {
        return (
            <Formik
                initialValues = { login.shape }
                validationSchema = { login.schema }
                onSubmit = { this._handleLoginFormSubmit }
                validateOnChange = { false }
                render = { (props) => {
                    const {
                        isSubmitting,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        values
                    } = props;

                    const emailError = touched.email && errors.email;
                    const passwordError = touched.password && errors.password;

                    return (
                        <Form className = { Styles.loginForm } >
                            <Typography
                                variant = 'h4'
                                component = 'h3'
                                className = { Styles.title }>
                                Welcome Back
                            </Typography>

                            <TextField
                                type = 'email'
                                name = 'email'
                                placeholder = 'Email'
                                className = { Styles.input }
                                fullWidth
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value={values.email}
                                error = { !!emailError }
                                helperText = { emailError }
                            />

                            <TextField
                                type = 'password'
                                name = 'password'
                                placeholder = 'Password'
                                className = { Styles.input }
                                fullWidth
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value={values.password}
                                error = { !!passwordError }
                                helperText = { passwordError }
                            />

                            <FormControlLabel
                                className={Styles.checkbox}
                                control={
                                    <Checkbox
                                        color='primary'
                                        name='remember'
                                        onChange={ handleChange }
                                        onBlur = { handleBlur }
                                        checked={values.remember}
                                    />
                                }
                                label="Remember Me"
                            />

                            <Button
                                type = 'submit'
                                className = { Styles.button }

                                color = 'primary'
                                variant = 'contained'
                                size='large'
                                disabled = { isSubmitting }>
                                Login
                            </Button>

                            <MULink
                                color='textSecondary'
                                component={Link}
                                to={book.signup}
                                className={Styles.footnote}
                            >
                                Or Signup
                            </MULink>
                        </Form>
                    );
                } }
            />
        );
    }
}
