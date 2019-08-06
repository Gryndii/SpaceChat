import {POSTS_URL} from '../config';

export const fetchPosts = async () => {
    const response = await fetch(POSTS_URL, {
        method: 'GET',
    });

    const posts = await response.json();

    if(response.status !== 200) {
        throw new Error('Posts weren`t fetched');
    }

    return posts;
};




