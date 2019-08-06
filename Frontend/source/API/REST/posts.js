// Instruments
import { MAIN_URL, groupId } from '../config';

export class Posts {
  async get () {
    const result = await fetch(`${MAIN_URL}/feed`, {
      method: "GET",
      headers: {
        'x-no-auth': groupId,
      }
    });

    const { data } = await result.json();

    if (result.status !== 200) {
      throw new Error(message);
    }

    return data;
  }

  async like (postId) {
    const result = await fetch(`${MAIN_URL}/feed/like/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: this.token,
      }
    });

    if (result.status !== 204) {
      const { message } = await result.json();
      throw new Error(message);
    }
  }

  async create (comment) {
    const result = await fetch(`${MAIN_URL}/feed`, {
      method: 'POST',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comment}),
    });

    const { data: post, message } = await result.json();

    if (result.status !== 200) {
      throw new Error(message);
    }

    return post;
  }

  async remove (postId) {
    const result = await fetch(`${MAIN_URL}/feed/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.token,
      },
    });

    if (result.status !== 204) {
      const { message } = await result.json();
      throw new Error(message);
    }
  }
}