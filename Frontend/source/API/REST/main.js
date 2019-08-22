import Auth from './auth';
import Profile from './profile';
import User from './user';
import Posts from './posts';

export default new class api {
    get token () {
        if (localStorage.getItem('socialAppToken')) {
            return `Bearer ${localStorage.getItem('socialAppToken')}`;
        } else if (sessionStorage.getItem('socialAppToken')) {
            return `Bearer ${sessionStorage.getItem('socialAppToken')}`;
        }
    }

    set token ({remember, token}) {
        if (remember) {
            localStorage.setItem('socialAppToken', token);
            sessionStorage.removeItem('socialAppToken');
        } else {
            sessionStorage.setItem('socialAppToken', token);
            localStorage.removeItem('socialAppToken');
        }
    }

    removeToken () {
        sessionStorage.removeItem('socialAppToken');
        localStorage.removeItem('socialAppToken');
    }

    auth = new Auth();
    profile = new Profile();
    user = new User();
    posts = new Posts();
}();
