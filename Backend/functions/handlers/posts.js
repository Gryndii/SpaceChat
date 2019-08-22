const { db } = require('../util/admin');

//Validators
const { isEmpty } = require('../util/validators');

exports.getAllPosts = (request, response) => {
    db
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    ...doc.data(),
                });
            });
            return response.json(posts);
        })
        .catch((err) => console.error(err));
};

exports.getUserPosts = (request, response) => {
    db
        .collection('posts')
        .where('userHandle', '==', request.params.handle)
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    ...doc.data(),
                });
            });
            return response.json(posts);
        })
        .catch((err) => console.error(err));
};

exports.createPost = (request, response) => {
    if (isEmpty(request.body.body)) {
        return response.status(400).json({ body: 'Body must be not empty' });
    }

    const newPost = {
        body: request.body.body,
        userImage: request.user.imageUrl,
        userHandle: request.user.handle,
        createdAt: new Date().toISOString(),
        likers: [],
        comments: [],
        likeCount: 0,
        commentCount: 0,
    };

    db
        .collection('posts')
        .add(newPost)
        .then((doc) => {
            const responsePost = {
                ...newPost,
                postId: doc.id
            };
            response.json(responsePost);
        })
        .catch((err) => {
            response.status(500).json({error: 'Post wasn`t created'});
            console.error(err);
        });
};

exports.getOnePost = (request, response) => {
    let postData = {};
    db.doc(`/posts/${request.params.postId}`).get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Post is not found' });
            }
            postData = {
                postId: doc.id,
                ...doc.data(),
            };
            return db
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .where('postId', '==', postData.postId)
                .get();
        })
        .then((data) => {
            postData.comments = [];
            data.forEach((doc) => {
                postData.comments.push(doc.data());
            });
            return response.json(postData);
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: error.code });
        });
};

exports.deletePost = (request, response) => {
    const document = db.doc(`/posts/${request.params.postId}`);
    document.get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Post doesn`t exist' });
            } else if(doc.data().userHandle !== request.user.handle) {
                return response.status(403).json({ error: 'Unauthorized' });
            } else {
                return document.delete();
            }
        })
        .then(() => {
            response.json({ message: 'Post deleted successfully' });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: error.code });
        });
};

exports.createComment = (request, response) => {
    if (isEmpty(request.body.body)) {
        return response.status(400).json({ error: 'Comment must not be empty.' });
    }

    const newComment = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        postId: request.params.postId,
        userHandle: request.user.handle,
        userImage: request.user.imageUrl,
    };

    db.doc(`/posts/${request.params.postId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Post doesnt exist' });
            }
            return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
        })
        .then(() => {
            return db.collection('comments').add(newComment);
        })
        .then(() => {
            return response.json(newComment);
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: error.code });
        });
};

exports.likePost = (request, response) => {
    const likeDocument = db.collection('likes')
        .where('userHandle', '==', request.user.handle)
        .where('postId', '==', request.params.postId)
        .limit(1);

    const postDocument = db.doc(`/posts/${request.params.postId}`);

    let postData;

    postDocument.get()
        .then((doc) => {
            if (doc.exists) {
                postData = doc.data();
                postData.postId = doc.id;

                return likeDocument.get();
            } else {
                return response.status(404).json({ error: 'Post doesn`t exist' });
            }
        })
        .then((data) => {
            if(data.empty) {
                db.collection('likes').add({
                    postId: request.params.postId,
                    userHandle: request.user.handle,
                    recipient: postData.userHandle,
                })
                .then(() => {
                    postData.likeCount++;
                    postData.likers.push(request.user.handle);
                    postDocument.update({
                        likeCount: postData.likeCount,
                        likers: postData.likers,
                    });

                    return db.doc(`/users/${postData.userHandle}`).get();
                })
                .then((doc) => {
                    if (!doc.exists) {
                        return;
                    }
                    return doc.ref.update({ userRate: doc.data().userRate + 1 });
                })
                .then(() => {
                    return response.json(postData);
                })
            } else {
                 return response.status(400).json({ error: 'Post is already liked' });
            }
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: error.code });
        });
};

exports.unlikePost = (request, response) => {
    const likeDocument = db.collection('likes')
        .where('userHandle', '==', request.user.handle)
        .where('postId', '==', request.params.postId)
        .limit(1);

    const postDocument = db.doc(`/posts/${request.params.postId}`);

    let postData;

    postDocument.get()
        .then((doc) => {
            if (doc.exists) {
                postData = doc.data();
                postData.postId = doc.id;
                return likeDocument.get();
            } else {
                return response.status(404).json({ error: 'Post doesn`t exist' });
            }
        })
        .then((data) => {
            if(data.empty) {
                return response.status(400).json({ error: 'Post is not liked' });
            } else {
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        postData.likeCount--;
                        postData.likers = postData.likers.filter((liker) => {
                            return liker !== request.user.handle
                        });
                        postDocument.update({
                            likeCount: postData.likeCount,
                            likers: postData.likers,
                        });

                        return db.doc(`/users/${postData.userHandle}`).get();
                    })
                    .then((doc) => {
                        if (!doc.exists) {
                            return;
                        }
                        return doc.ref.update({ userRate: doc.data().userRate - 1 });
                    })
                    .then(() => {
                        return response.json(postData);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: error.code });
        });
};



