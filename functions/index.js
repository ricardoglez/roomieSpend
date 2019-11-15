const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
/**
 * This function updates the purchase after it has been craeted 
 * It initializes the values related to the debt and assignes the debt to selected users 
 */
exports.addIdToPurchase = functions.firestore.document('purchase/{purchaseId}')
    .onCreate((snap, context) => {
        const purchaseId = context.params.purchaseId;
        const newPurchase = snap.data();
        const currentUser = newPurchase.createdBy;
        newPurchase['purchaseId'] = purchaseId;
        const involvedUsersIds = Object.keys(newPurchase.involvedUsers);
                
        involvedUsersIds.forEach( userId => {
            delete newPurchase.involvedUsers[userId].assignedPurchases;
            delete newPurchase.involvedUsers[userId].isSelected;

            newPurchase.involvedUsers[userId]['payed'] = currentUser === userId ? true : false;
            newPurchase.involvedUsers[userId].debt = newPurchase.totalCost / involvedUsersIds.length ;
            console.log( userId );
            db.collection('users').doc( userId ).get()
                .then((snap) => {
                    userData = snap.data();
                    console.log(userData);
                    const isPurchasedByUser = newPurchase.purchasedBy === userData.userId;
                    userData.assignedPurchases[purchaseId] = newPurchase;
                    if( userData.debt[newPurchase.purchasedBy] ){
                        console.log('Update debt of', newPurchase.purchasedBy);
                        userData.debt[newPurchase.purchasedBy].debtQnty += newPurchase.involvedUsers[userData.userId].debt; 
                        userData.debt[newPurchase.purchasedBy].payed = isPurchasedByUser;
                    } else {
                        console.log('New debt of', newPurchase.purchasedBy);
                        userData.debt[newPurchase.purchasedBy] = {
                            debtQnty: newPurchase.involvedUsers[userData.userId].debt,
                            debtTo: newPurchase.purchasedBy,
                            payed: isPurchasedByUser ,
                        }
                    }
                    return updateUserData(userId, userData);
                })
                .catch(error => {
                console.error(error)
                });
        });

        db.collection('purchase').doc(purchaseId).set(newPurchase);
});

/**
 * Create a function to run after a purchase object ahs been deleted
 * So it will delete the assigned purchases of the user involved and the debt related to the users
 * @param {*} userId 
 * @param {*} userData 
 */
// exports.removeRelatedPurchases = functions.firestore.document('purchase/{purchaseId}')
//     .onDelete((snap, context) => {
//         const purchaseId = context.params.purchaseId;
//         const removedPurchase = snap.data();
//         const involvedUsersIds = Object.keys(removedPurchase.involvedUsers);
                
//         involvedUsersIds.forEach( userId => {
//             db.collection('users').doc( userId ).get()
//                 .then((snap) => {
//                     userData = snap.data();
                    
//                     return updateUserData(userId, userData);
//                 })
//                 .catch(error => {
//                 console.error(error)
//                 });
//         });

//         db.collection('purchase').doc(purchaseId).set(newPurchase);
// });

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

