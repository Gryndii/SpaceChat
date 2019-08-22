//Instruments
import { MAIN_URL } from '../config';
import {ServerError} from '../../helpers';

export default class Posts {
    async getAllPosts() {
        const response = await fetch(`${ MAIN_URL }/posts`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Posts weren`t fetched');
        }
        const data = await response.json();

        return data;
    }

    async getUserPosts(userId) {
        const response = await fetch(`${ MAIN_URL }/posts/${userId}`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Posts weren`t fetched');
        }
        const data = await response.json();

        return data;
    }

    async create(postText) {
        const response = await fetch(`${ MAIN_URL }/post`, {
            method:  'POST',
            headers: {
                Authorization:  this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: postText,
            }),
        });

        if (response.status !== 200) {
            throw new Error('Post wasn`t created');
        }
        const data = await response.json();

        return data;
    }

    async delete(postId) {
        const response = await fetch(`${ MAIN_URL }/post/${postId}`, {
            method:  'DELETE',
            headers: {
                Authorization: this.token,
            },
        });

        if (response.status !== 200) {
            throw new ServerError('Post wasn`t deleted', await response.json());
        }

        const data = await response.json();

        return data;
    }

    async like(postId) {
        const response = await fetch(`${ MAIN_URL }/post/${postId}/like`, {
            method:  'GET',
            headers: {
                Authorization: this.token,
            },
        });

        if (response.status !== 200) {
            throw new Error('Post wasn`t liked');
        }
        const data = await response.json();

        return data;
    }

    async unlike(postId) {
        const response = await fetch(`${ MAIN_URL }/post/${postId}/unlike`, {
            method:  'GET',
            headers: {
                Authorization: this.token,
            },
        });

        if (response.status !== 200) {
            throw new Error('Post wasn`t unliked');
        }
        const data = await response.json();

        return data;
    }

    async getExtendedPost(postId) {
        const response = await fetch(`${ MAIN_URL }/post/${postId}`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Comments weren`t fetch');
        }
        const extended = await response.json();

        return extended;
    }

    async createComment(postId, commentText) {
        const response = await fetch(`${ MAIN_URL }/post/${postId}/comment`, {
            method:  'POST',
            headers: {
                Authorization:  this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: commentText,
            }),
        });

        if (response.status !== 200) {
            throw new Error('Comment wasn`t created');
        }
        const newComment = await response.json();

        return newComment;
    }
}
