//Core
import React from 'react';

//Instruments
import Styles from './styles.m.css';

export const AnimatedBg = () => {
    return (
        <div className = { Styles.area }>
            <ul className = { Styles.circles }>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};
