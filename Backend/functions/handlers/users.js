const { db, admin } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');

firebase.initializeApp(config);

//Validators
const { validateSignUpData, validateLoginData, reduceUserDetails } = require('../util/validators');

exports.signUp = (request, response) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        handle: request.body.handle,
    };

    const { valid, errors } = validateSignUpData(newUser);

    if (!valid) {
        return response.status(400).json(errors);
    }

    const noImg = 'no-img.png';

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then((doc) => {
            if(doc.exists) {
                return response.status(400).json({handle: 'This handle is already taken'});
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId,
            };
            db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return response.status(201).json({ token });
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                console.error(error);
                return response.status(400).json({ email: 'Email is already in use' });
            } else {
                console.error(error);
                return response.status(500).json({ error: error.code });
            }
        });
};

exports.login = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password,
    };

    //Validation
    const { valid, errors } = validateLoginData(user);

    if (!valid) {
        return response.status(400).json(errors);
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === 'auth/wrong-password') {
                response.status(403).json({ general: 'Wrong credentials' });
            } else {
                response.status(500).json({ error: error.code });
            }
        });
};

exports.uploadImage = (request, response) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    //response.json({message: 'wtf in uploadImage handler after imports'});

    const busboy = new BusBoy({ headers: request.headers });

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png' && mimetype !== 'image/gif') {
            return response.status(400).json({ message: 'Wrong file type submitted' });
        }

        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random() * 10000000000)}.${imageExtension}`;
        const filePath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filePath, mimetype };
        file.pipe(fs.createWriteStream(filePath));
    });

    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filePath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype,
                },
            },
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/users/${request.user.handle}`).update({ imageUrl });
        })
        .then(() => {
            return response.json({ message: 'Image uploaded successfully' });
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        });
    });

    busboy.end(request.rawBody);
};

exports.addUserDetails = (request, response) => {
    let userDetails = reduceUserDetails(request.body);

    db.doc(`users/${request.user.handle}`).update(userDetails)
        .then(() => {
            return response.json({ message: 'Details added successfully' });
        })
        .catch((error) => {
            console.error(error);
            response.json({ error: error.code });
        });
};

exports.getAuthenticatedUser = (request, response) => {
    let userData = {};
    db.doc(`users/${request.user.handle}`).get()
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db.collection('likes').where('userHandle', '==', request.user.handle).get();
            }
        })
        .then((data) => {
            userData.likes = [];
            data.forEach((doc) => {
                userData.likes.push(doc.data());
            });
            return db.collection('notifications')
                .where('recipient', '==', request.user.handle)
                .orderBy('createdAt', 'desc')
                .limit(10)
                .get();
        })
        .then((data) => {
            userData.notifications = [];
            data.forEach((doc) => {
                userData.notifications.push({
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    postId: doc.data().postId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationId: doc.id,
                });
            });
            return response.json(userData);
        })
        .catch((error) => {
           console.error(error);
           return response.status(500).json({ error: error.code });
        });
};

exports.getUserDetails = (request, response) => {
    let userData = {};
    db.doc(`/users/${request.params.handle}`).get()
        .then((doc) => {
            if (doc.exists) {
                userData.user = doc.data();
                return db
                    .collection('posts')
                    .where('userHandle', '==', request.params.handle)
                    .orderBy('createdAt', 'desc')
                    .get();
            } else {
                return response.status(404).json({ error: 'User does not exist'});
            }
        })
        .then((data) => {
            userData.posts = [];
            data.forEach((doc) => {
                userData.posts.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    postId: doc.id,
                });
            });
            return response.json(userData);
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        })
};

exports.markNotificationsRead = (request, response) => {
    let batch = db.batch();
    request.body.forEach((notificationId) => {
        const notification = db.doc(`/notifications/${notificationId}`);
        batch.update(notification, { read: true });
    });
    batch.commit()
        .then(() => {
            return response.json({ message: 'Notifications marked read' });
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        })
};
