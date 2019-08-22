//Instruments
import { MAIN_URL } from '../config';
import { ServerError } from '../../helpers';

export default class Auth {
    async login(userData) {
        const response = await fetch(`${ MAIN_URL }/login`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.status !== 200) {
            throw new ServerError('Login was not successful', await response.json());
        }

        const { token } = await response.json();

        return token;
    }

    async signup(userData) {
        const response = await fetch(`${ MAIN_URL }/signup`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.status !== 201) {
            throw new ServerError('Signup was not successful', await response.json());
        }

        const { token } = await response.json();

        return token;
    }
}
