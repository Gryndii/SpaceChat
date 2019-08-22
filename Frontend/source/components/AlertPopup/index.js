//Core
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Instruments
import Styles from './styles.m.css';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

//Actions
import { uiActions } from '../../bus/ui/actions';

const mapStateToProps = (state) => ({
    isOpened: state.ui.getIn([ 'alertPopup', 'isOpened' ]),
    title:    state.ui.getIn([ 'alertPopup', 'title' ]),
    message:  state.ui.getIn([ 'alertPopup', 'message' ]),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        openAlertPopup:  uiActions.openAlertPopup,
        closeAlertPopup: uiActions.closeAlertPopup,
    }, dispatch),
});

const AlertPopup = (props) => {
    const { isOpened, title, message } = props;

    function handleOpen() {
        props.actions.openAlertPopup();
    }

    function handleClose() {
        props.actions.closeAlertPopup();
    }

    return (
        <Dialog
            className = { Styles.alertPopup }
            open = { isOpened }
            onClose = { handleClose }
            aria-labelledby = 'alert-dialog-title'
            aria-describedby = 'alert-dialog-description'>
            <DialogTitle id = 'alert-dialog-title'>
                {title}
                <IconButton
                    className = { Styles.close }
                    aria-label = 'close'
                    onClick = { handleClose }>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id = 'alert-dialog-description'>
                    { message }
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertPopup);
