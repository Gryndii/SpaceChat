import {POSTS_URL} from '../config';

export const createPost = async (newPost) => {
    const response = await fetch(POSTS_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });

    const posts = await response.json();

    if(response.status !== 201) {
        throw new Error('Posts weren`t send');
    }


    console.log('Post createed in api', posts);
    return posts;
};




