import Auth from './auth';
import Posts from './posts';

export default new class api {
    getToken () {
        return localStorage.getItem('SocialAppToken');
    };

    auth = new Auth();
    posts = new Posts();
}();
