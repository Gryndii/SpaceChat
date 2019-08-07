//Instruments
import { MAIN_URL } from "../config";

export default class Auth {
    async login( userData ) {
        const response = await fetch(`${ MAIN_URL }/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( userData ),
        });

        if ( response.status !== 200 ) {
            throw new Error( 'Login was not successful' );
        }

        console.log('Response: ', await response.json());

        const { data } = await response.json();

        return data;
    }
};
