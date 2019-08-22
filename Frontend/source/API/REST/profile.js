//Instruments
import { MAIN_URL } from '../config';

export default class Profile {
    async getProfileUser() {
        const response = await fetch(`${ MAIN_URL }/user`, {
            method:  'GET',
            headers: {
                Authorization: this.token,
            },
        });

        if (response.status !== 200) {
            throw new Error('Profile user data wasn`t recieved');
        }

        const data = await response.json();

        return data;
    }

    async updateProfile(newData) {
        const response = await fetch(`${ MAIN_URL }/user`, {
            method:  'POST',
            headers: {
                Authorization: this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (response.status !== 200) {
            throw new Error('Profile user data wasn`t changed');
        }

        const data = await response.json();

        return data;
    }

    async updateProfileImage(newImage) {
        const response = await fetch(`${ MAIN_URL }/user/image`, {
            method:  'POST',
            headers: {
                Authorization: this.token,
            },
            body: newImage,
        });

        if (response.status !== 200) {
            throw new Error('Profile image wasn`t updated');
        }

        const data = await response.json();

        return data;
    }
}
