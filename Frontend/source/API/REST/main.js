import { Posts } from './posts';
import { Auth } from './auth';
import { Users } from './users';

export default new class Api {
  get token () {
    return localStorage.getItem('token');
  };
  
  posts = new Posts();
  auth = new Auth();
  users = new Users();
}();