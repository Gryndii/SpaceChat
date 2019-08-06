let db = {
    users: [
        {
            userId: 'ePD62JLLWtXHoWzIrDo2b3joo062',
            email: 'user@mail.com',
            handle: 'user',
            createdAt: '2019-07-28T08:15:19.136Z',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/socialapp-f98e1.appspot.com/o/9632925882.jpg?alt=media',
            bio: 'Hello, my name is',
            website: 'https//:website.com',
            location: 'Kyiv, UA',
        }
    ],
    posts: [
        {
            userHandle: 'user',
            body: 'This is the sample post',
            createdAt: '2019-07-28T08:15:19.136Z',
            likeCount: 5,
            commentCount: 3,
        },
    ]
};

const userDetails = {
    //Redux Data
    credentials: {
        userId: 'ePD62JLLWtXHoWzIrDo2b3joo062',
        email: 'user@mail.com',
        handle: 'user',
        createdAt: '2019-07-28T08:15:19.136Z',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/socialapp-f98e1.appspot.com/o/9632925882.jpg?alt=media',
        bio: 'Hello)',
        website: 'site.com',
        location: 'Kyiv'
    },
    likes: [
        {
            userHandle: 'user',
            postId: 'UoBnAsplkJ07UO5thfyd',

        },
    ]
};
