const admin = require('firebase-admin');

// Firebase Configuration
var serviceAccount = require('../../ichiklaus-ecommerce-shop-api-firebase-adminsdk-credentials.json');
let config = {
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(config);
const db = admin.firestore();

module.exports = db;