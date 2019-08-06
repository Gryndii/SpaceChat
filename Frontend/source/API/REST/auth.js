// Instruments
import { MAIN_URL, groupId } from '../config';

export class Auth {
  async signup (userData) {
    const responce = await fetch(`${MAIN_URL}/user/${groupId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    });

    const { data, message } = await responce.json();

    if (responce.status !== 200) {
      throw new Error(message);
    }

    return data;
  }

  async login (credentials) {
    const responce = await fetch(`${MAIN_URL}/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    });

    const { data, message } = await responce.json();

    if (responce.status !== 200) {
      throw new Error(message);
    }

    return data;
  }

  async logout (token) {
    const responce = await fetch(`${MAIN_URL}/user/logout`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (responce.status !== 204) {
      const { message } = await responce.json();
      throw new Error(message);
    }
  }
}