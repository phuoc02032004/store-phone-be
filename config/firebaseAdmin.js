const admin = require('firebase-admin');

// Replace this with the path to your Firebase service account key file
// You can generate this file from your Firebase project settings:
// Project settings -> Service accounts -> Generate new private key
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;