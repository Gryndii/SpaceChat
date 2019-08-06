// Instruments
import { MAIN_URL } from '../config';

export class Users {
  async getById (userId) {
    const responce = await fetch(`${MAIN_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: this.token,
      }
    });

    const { data: user, message } = await responce.json();

    if (responce.status !== 200) {
      throw new Error(message);
    }

    return user;
  }
}