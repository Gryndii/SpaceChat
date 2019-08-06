const admin = require('firebase-admin');

exports.admin = admin.initializeApp();

exports.db = admin.firestore();

