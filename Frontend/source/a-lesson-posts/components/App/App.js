//Core
import React, {Component} from 'react';

//Components
import Scheduler from '../Scheduler';
import Posts from '../Posts';
import Spinner from '../Spinner';

//Instruments
import Styles from './styles.m.css';

export default class App extends Component {
    render() {
        return(
            <div className = { Styles.app }>
                <Scheduler/>
                <Spinner/>
                <Posts/>
            </div>
        );
    }
}
