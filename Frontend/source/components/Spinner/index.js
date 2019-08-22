//Core
import React from 'react';
import { connect } from 'react-redux';

//Instruments
import spinnerImg from './spinner.svg';
import Styles from './styles.m.css';

const mapStateToProps = (state) => ({
    isFetching: state.ui.get('isFetching'),
});

const Spinner = (props) => {
    const { isFetching } = props;

    return (
        isFetching
            ? <div className = { Styles.spinner }>
                <img
                    src = { spinnerImg }
                    alt = ''
                />
            </div>
            : null
    );
};

export default connect(mapStateToProps)(Spinner);
