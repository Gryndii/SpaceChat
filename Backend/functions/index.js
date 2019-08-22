//Core
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

const { db } = require('./util/admin');

//Handlers
const {
    getAllPosts,
    getUserPosts,
    createPost,
    getOnePost,
    deletePost,
    createComment,
    likePost,
    unlikePost
} = require('./handlers/posts');

const {
    signUp,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    getPopularUsers,
    markNotificationsRead
} = require('./handlers/users');

//Firebase authorization
const FBAuth = require('./util/firebaseAuth');

//User Routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.get('/users/popular', getPopularUsers);
app.post('/notifications', FBAuth, markNotificationsRead);

//Post Routes
app.get('/posts', getAllPosts);
app.get('/posts/:handle', getUserPosts);
app.post('/post', FBAuth, createPost);
app.get('/post/:postId', getOnePost);
app.delete('/post/:postId', FBAuth, deletePost);
app.post('/post/:postId/comment', FBAuth, createComment);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions
    .firestore
    .document('likes/{id}')
    .onCreate((snapshot) => {
        db.doc(`/posts/${snapshot.data().postId}`)
            .get()
            .then((doc) => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: doc.data().userHandle,
                        type: 'like',
                        read: false,
                        postId: doc.id,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

exports.deleteNotificationOnUnlike = functions
    .firestore
    .document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch((error) => {
                console.error(error);
            });
    });

exports.createNotificationOnComment = functions
    .firestore
    .document('comments/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then((doc) => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: doc.data().userHandle,
                        type: 'comment',
                        read: false,
                        postId: doc.id,
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

exports.onUserImageChange = functions.firestore.document('/users/{userId}')
    .onUpdate((change) => {
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            const batch = db.batch();
            return db.collection('posts').where('userHandle', '==', change.before.data().handle).get()
                .then((data) => {
                    data.forEach((doc) => {
                        const post = db.doc(`/posts/${doc.id}`);
                        batch.update(post, { userImage: change.after.data().imageUrl });
                    });
                    return batch.commit();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            return true;
        }
    });

exports.onPostDelete = functions.firestore.document('/posts/{postId}')
    .onDelete((snapshot, context) => {
        const postId = context.params.postId;
        const batch = db.batch();
        return db.collection('comments').where('postId', '==', postId).get()
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                });
                return db.collection('likes').where('postId', '==', postId).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db.collection('notifications').where('postId', '==', postId).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch((error) => {
                console.error(error);
            });
    });
