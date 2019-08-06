//Core
import React, {Component} from 'react';
import { connect } from 'react-redux';

//Instruments
import Styles from './styles.m.css';

//Actions
import { setNewPostData } from '../../redux/actions/schedulerActions';
import { createPostAsync } from '../../redux/actions/postsActions';

class Scheduler extends Component {
    _getNewPostData = (e) => {
        const {newPostTitle, newPostText} = this.props;
        const newPostData = {
            newPostTitle,
            newPostText,
            [e.target.name]: e.target.value,
        };

        this.props.setNewPostData(newPostData);
    };

    _handleSubmit = (event) => {
        event.preventDefault();

        const {newPostTitle, newPostText} = this.props;

        if(!newPostTitle || !newPostText) return;

        this.props.createPostAsync({
            title: newPostTitle,
            body: newPostText,
        });

        this.props.setNewPostData({
            newPostTitle: '',
            newPostText: '',
        });
    };

    render() {
        const {newPostTitle, newPostText} = this.props;

        return (
            <form
                className={Styles.scheduler}
                onSubmit={(event) => this._handleSubmit(event)}
            >
                <input
                    type="text"
                    placeholder='Post Title'
                    name='newPostTitle'
                    value={newPostTitle}
                    onChange={this._getNewPostData}
                />
                <textarea
                    placeholder='Post Text'
                    name='newPostText'
                    value={newPostText}
                    onChange={this._getNewPostData}
                />
                <button
                    type='submit'
                >
                    Create Post
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newPostTitle: state.schedulerReducer.newPostTitle,
        newPostText: state.schedulerReducer.newPostText,
    };
};

const mapDispatchToProps = {
    setNewPostData: setNewPostData,
    createPostAsync: createPostAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
