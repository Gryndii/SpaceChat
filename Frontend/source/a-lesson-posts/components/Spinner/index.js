//Core
import React from 'react';
import  { connect } from 'react-redux';

//Instruments
import Styles from './styles.m.css';

const Spinner = (props) => {
    return (
        props.isFetching
            ? <div className = { Styles.spinner }>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            : null
    );
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.uiReducer.get('isFetching'),
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
