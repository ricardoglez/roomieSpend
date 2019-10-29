const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.addToUsersCollection = functions.auth.user().onCreate((user) => {  
    console.log('Add to UsersCollection', user);
    const uid = user.uid;
    let newUser ={ debt:0, name:'someName', userId: uid, assignedPurchases: {} };
    db.collection('users').doc(uid).set(newUser);
});

