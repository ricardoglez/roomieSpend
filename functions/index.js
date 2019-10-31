const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
exports.addIdToPurchase = functions.firestore.document('purchase/{purchaseId}')
    .onCreate((snap, context) => {  
        const purchaseId = context.params.purchaseId;
        const newPurchase = snap.data();
        console.log('Add to purchaseId', purchaseId);
        console.log('newPurchase', newPurchase);
        newPurchase['purchaseId'] = purchaseId;
        db.collection('purchase').doc(purchaseId).set(newPurchase);
});

// exports.addToUsersCollection = functions.auth.user().onCreate((user,context) => {  
//     console.log('Add to UsersCollection', user);
//     console.log('Context ', context);
//     const uid = user.uid;
//     let newUser ={ debt:0, displayName:user.displayName, userId: uid, assignedPurchases: {} };
//     db.collection('users').doc(uid).set(newUser);
// });
// exports.modifyUserData = functions.firestore.document('users/{userId}').onUpdate((change, context) => {  
//     console.log('Modify UsersData');
//     console.log('Context', context);
//     const uid = params.userId;
//     const newValue = change.after.data();
//     const previousValue = change.before.data();
//     console.log('New Val', newValue);
//     console.log('PRevious Val', previousValue);
//     let newUser ={ debt:0, displayName:user.displayName, userId: uid, assignedPurchases: {} };
//     console.log('New User', newUser);
//     db.collection('users').doc(userId).set(newUser);
// });

