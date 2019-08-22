//Instruments
import { MAIN_URL } from '../config';

export default class Profile {
    async getUser(userId) {
        const response = await fetch(`${ MAIN_URL }/user/${userId}`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('User data wasn`t recieved');
        }

        const data = await response.json();

        return data;
    }

    async getPopularUsers() {
        const response = await fetch(`${ MAIN_URL }/users/popular`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Popular Users weren`t recieved');
        }

        const data = await response.json();

        return data;
    }
}
