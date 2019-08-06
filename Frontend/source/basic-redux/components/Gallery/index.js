// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Instruments
import Styles from './styles.m.css';
import cx from 'classnames'

//Store
import { store } from '../../init/store';

import { showNextPhoto, showPreviousPhoto, showIndexPhoto } from '../../bus/gallery/actions';

window.x = store;

@hot(module)
export default class Gallery extends Component {
    componentDidMount () {
        this.subscription = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount () {
        this.subscription();
    }

    _showNextPhoto = () => {
        store.dispatch(showNextPhoto());
    }

    _showPreviousPhoto = () => {
        store.dispatch(showPreviousPhoto());
    }

    _showIndexPhoto = (e) => {
        store.dispatch(showIndexPhoto(e.target.value));
    }

    render () {
        const { gallery } = store.getState();
        const { url } = gallery.photos.find(
            (_, photoIndex) => photoIndex === gallery.selectedPhotoIndex,
        );

        const buttonActiveStyle1 = cx({
            [Styles.buttonActive]: gallery.selectedPhotoIndex === 0,
        });

        const buttonActiveStyle2 = cx({
            [Styles.buttonActive]: gallery.selectedPhotoIndex === 1,
        });

        const buttonActiveStyle3 = cx({
            [Styles.buttonActive]: gallery.selectedPhotoIndex === 2,
        });

        const buttonActiveStyle4 = cx({
            [Styles.buttonActive]: gallery.selectedPhotoIndex === 3,
        });

        return (
            <section className = { Styles.gallery }>
                <img src = { url } />
                <div>
                    <button onClick = { this._showPreviousPhoto }>←</button>
                    <button onClick = { this._showIndexPhoto } className = { buttonActiveStyle1 } value = '0'>1</button>
                    <button onClick = { this._showIndexPhoto } className = { buttonActiveStyle2 } value = '1'>2</button>
                    <button onClick = { this._showIndexPhoto } className = { buttonActiveStyle3 } value = '2'>3</button>
                    <button onClick = { this._showIndexPhoto } className = { buttonActiveStyle4 } value = '3'>4</button>
                    <button onClick = { this._showNextPhoto }>→</button>
                </div>
            </section>
        );
    }
}
