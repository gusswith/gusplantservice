var firebaseAdmin = require("firebase-admin");

var serviceAccount = require("./gusplant-c2bdd-firebase-adminsdk-fbsvc-29768b2ed3.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://gusplant-c2bdd-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const firebaseDB = firebaseAdmin.database();
module.exports = firebaseDB;
