const admin = require('firebase-admin');
const serviceAccount = require("./localhostAuthKey.json");
const config = require("./config");


exports.admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:  config.databaseURL,
});

exports.db = admin.firestore();

