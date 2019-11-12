const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
/**
 * This function updates the purchase after it has been craeted 
 * so it can be accessed with the id as a key 
 */
exports.addIdToPurchase = functions.firestore.document('purchase/{purchaseId}')
    .onCreate((snap, context) => {
        const purchaseId = context.params.purchaseId;
        const newPurchase = snap.data();
                console.log('Add to purchaseId', purchaseId);
                console.log('newPurchase', newPurchase);
                newPurchase['purchaseId'] = purchaseId;
                db.collection('purchase').doc(purchaseId).set(newPurchase);
});

/**
 * This function updates the userData to a certain user based on a userId
 * @param { Number } userId 
 * @param { Object } userData 
 */
const updateUserData = async ( userId , userData) => {
    return new Promise( (res , rej) => {
        db.collection('users').doc( userId ).set(userData)
        .then( response =>{
            console.log(response);
            return { success: true , data: response };
        })
        .catch( error => {
            console.error(error);
            return { success: false , data: response };
        })
    } )      
}
/**
 * When a purchase has been added, This functions updates the user involvedPurchases 
 * by adding a new purchase object to the purchase parent
 */
exports.assignDebtToInvolvedUsers = functions.firestore.document('purchase/{purchaseId}')
    .onCreate((snap, context) => {
        console.log('Assign Debt to involved users');
        const purchaseId = context.params.purchaseId;
        const newPurchase = snap.data();
        const involvedUsers = newPurchase.involvedUsers;
        console.log(involvedUsers);

        Object.keys(involvedUsers).forEach( userId => {
            db.collection('users').doc( userId ).get()
                .then( snap => {
                    userData = snap.data();
                    userData.assignedPurchases[purchaseId] = newPurchase;
                    return updateUserData(userId, userData);
                })
                .catch(error => {
                console.error(error)
                });
        });
} );

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

