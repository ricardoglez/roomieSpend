import {firestore, firestoreDB } from './firebaseUtils';
import firebase from 'firebase';
const API = {
    checkUsernameAvailability: async ( username ) => {
        console.log('is Username Available...');
        return new Promise( (res, rej) => {
            try{
                const query = firestore.collection('users').where('name','==', username);
                query.get()
                .then( querySnapshot => {
                    res({ success:true , isAvailable: querySnapshot.docs.length === 0 });
                })
            }
            catch(error){
                console.error(error);
                rej({success: false, error:error, data:null})
            }
        } );    
    },
    getUserData: () => {
        console.log('Get user Data');
        return new Promise( (res, rej) => {
            try{
                firebase.auth()
                .onAuthStateChanged( (user) =>{
                    if( user ){
                        const userFormatted = {
                            uid: user.uid,
                            displayName: user.displayName,
                            lastLogin: user.metadata.lastSignInTime,
                            refreshToken: user.refreshToken,
                        }
                        res( { success: true , data:userFormatted });
                    }
                    else {
                        console.error('this Uer isnt auth', user);
                        rej( { success: false , error:{ message: 'User isnt auth'} });
                    }
                } )
                
            }
            catch(error){
                console.error(error);
                rej( { success: false ,error:error })
            }
        } )
    },
    fetchPurchases: () => {
        console.log('Fetch purchases...');
        return new Promise( (res, rej) => {
            try{
                let purchases = [];
                firestore.collection('purchase')
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
    logIn:( data ) => {
        console.log('LogIn this', data);
        return firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    },
    logOut:( ) => {
        console.log('LogOut this');
        return firebase.auth().signOut()
    },
    addSpent: async () => {
        console.log('Add Spent');
    },
    removeSpent: async () => {
        console.log('Remove Spent');
    }
};

export default API;