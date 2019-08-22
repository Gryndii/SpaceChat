//Core
import React, {Component} from 'react';
import { Formik, Form } from 'formik';
import { signup } from '../../bus/forms/shapes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

//Instruments
import Styles from './styles.m.css';
import {TextField, Button, Typography, Checkbox, FormControlLabel, Link as MULink} from '@material-ui/core';
import { book } from "../../navigation/book";

//Actions
import { authActions } from '../../bus/auth/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                signupAsync: authActions.signupAsync,
            },
            dispatch
        ),
    };
};

@connect(null, mapDispatchToProps)
export default class SignupForm extends Component {

    _handleFormSubmit = (credentials, actions) => {
        this.props.actions.signupAsync(credentials);
        actions.setSubmitting(false);
    };

    render() {
        return (
            <Formik
                initialValues = { signup.shape }
                validationSchema = { signup.schema }
                onSubmit = { this._handleFormSubmit }
                validateOnChange = { false }
                render = { (props) => {
                    const {
                        isValid,
                        isSubmitting,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        values,
                    } = props;

                    const handleError = touched.handle && errors.handle;
                    const emailError = touched.email && errors.email;
                    const passwordError = touched.password && errors.password;
                    const confirmPasswordError = touched.confirmPassword && errors.confirmPassword;

                    return (
                        <Form className = { Styles.loginForm } >

                            <Typography
                                variant = 'h4'
                                component = 'h3'
                                className = { Styles.title }>
                                Join Our Space
                            </Typography>

                            <TextField
                                type = 'text'
                                name = 'handle'
                                placeholder = 'Nickname'
                                className = { Styles.input }
                                fullWidth
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                error = { !!handleError }
                                helperText = { handleError }
                                value={values.handle}
                            />

                            <TextField
                                type = 'email'
                                name = 'email'
                                placeholder = 'Email'
                                className = { Styles.input }
                                fullWidth
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                error = { !!emailError }
                                helperText = { emailError }
                                value={values.email}
                            />

                            <TextField
                                type = 'password'
                                name = 'password'
                                placeholder = 'Password'
                                className = { Styles.input }
                                fullWidth
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                error = { !!passwordError }
                                helperText = { passwordError }
                                value={values.password}
                            />

                            <TextField
                                type = 'password'
                                name = 'confirmPassword'
                                placeholder = 'Confirm Password'
                                className = { Styles.input }
                                fullWidth
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                error = { !!confirmPasswordError }
                                helperText = { confirmPasswordError }
                                value={values.confirmPassword}
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
                                Sign Up
                            </Button>

                            <MULink
                                color='textSecondary'
                                component={Link}
                                to={book.login}
                                className={Styles.footnote}
                            >
                                Or Login
                            </MULink>
                        </Form>
                    );
                } }
            />
        );
    }
}
