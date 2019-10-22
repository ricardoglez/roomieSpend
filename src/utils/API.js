import firebaseUtils from './firebaseUtils';
import firebase from 'firebase';
const API = {
    fetchPurchases: () => {
        console.log('Fetch purchases');
        return new Promise( (res, rej) => {
            try{
                let purchases = [];
                firebaseUtils.collection('purchase')
                    .onSnapshot( ( snapshot) => {
                    snapshot.forEach( doc => { 
                        purchases.push( doc.data());
                    });
                    res( {success: true , data: purchases} );

                } );
            }
            catch(error){
                rej({success: false, error:error, data:null})
            }
        } );    
    },
    signIn:( data ) => {
        console.log('SignIn this', data);
        return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    },
    addSpent: async () => {
        console.log('Add Spent');
    },
    removeSpent: async () => {
        console.log('Remove Spent');
    }
};

export default API;