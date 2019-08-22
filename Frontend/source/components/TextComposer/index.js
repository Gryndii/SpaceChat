//Core
import React, {Component} from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { postCreator } from '../../bus/forms/shapes';
import { func, string } from 'prop-types';

//Instruments
import Styles from './styles.m.css';
import { Paper, IconButton, InputBase, Avatar } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

export default class TextComposer extends Component {
    static propTypes = {
        handleSubmit: func.isRequired,
        placeholder:  string.isRequired,
        avatarImg:    string.isRequired,
        avatarUrl:    string.isRequired,
    };

    _handleSubmit = ({text}, actions) => {
        this.props.handleSubmit(text);

        actions.resetForm();
    };

    render() {
        const { placeholder, avatarImg, avatarUrl } = this.props;

        return (
            <Formik
                initialValues = { postCreator.shape }
                validationSchema = { postCreator.schema }
                onSubmit = { this._handleSubmit }
                validateOnChange = { false }
                render = { (props) => {
                    const {
                        handleChange,
                        handleBlur,
                        values,
                    } = props;

                    return (
                        <Paper
                            className = { Styles.textComposer }
                            component = { Form }>
                            <IconButton
                                className = { Styles.avatar }
                                component = { Link }
                                to = { avatarUrl }>
                                <Avatar
                                    src = { avatarImg }>
                                </Avatar>
                            </IconButton>
                            <InputBase
                                className = { Styles.input }
                                placeholder = { placeholder }
                                name = 'text'
                                value = { values.text }
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                            />
                            <IconButton
                                className = { Styles.button }
                                type = 'submit'>
                                <SendIcon />
                            </IconButton>
                        </Paper>
                    );
                } }
            />
        );
    }
}
