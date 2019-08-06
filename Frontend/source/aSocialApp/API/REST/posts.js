//Instruments
import { MAIN_URL } from '../config';

export default class Posts {
    async getAll() {
        const response = await fetch(`${ MAIN_URL }/posts`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Posts weren`t fetched');
        }
        const data = await response.json();

        return data;
    }
}
