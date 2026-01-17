var firebaseAdmin = require("firebase-admin");

var serviceAccount = require("./gusplant-c2bdd-firebase-adminsdk-fbsvc-29768b2ed3.json");

firebaseAdmin.initializeApp();

const firebaseDB = firebaseAdmin.database();
module.exports = firebaseDB;
