import {firestore, firestoreDB } from './firebaseUtils';
import firebase from 'firebase';

import {userModel} from './common';

const API = {
    checkUsernameAvailability: async ( username ) => {
        console.log('is Username Available...');
        return new Promise( (res, rej) => {
            try{
                const query = firestore.collection('users').where('displayName','==', username);
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
    updateUser:(updatedUser) => {
        const user = firebase.auth().currentUser;
        console.log('Modify data of user', updatedUser, user);
        return user.updateProfile(updatedUser)
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
    postPurchase:( data ) => {
        console.log('Add purchase', data);
        return firestore.collection('purchase').add(data)
    },
    fetchPurchases: () => {
        console.log('Fetch purchases...');
        return new Promise( (res, rej) => {
            try{
                const user = firebase.auth().currentUser;
                console.log(user.uid);
                let purchases = [];
                firestore.collection('purchase').where('involvedUsers','array-contains',user.uid)
                    .onSnapshot( ( snapshot) => {
                    snapshot.forEach( doc => { 
                        console.log(doc.data());
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
    fetchUsers: () => {
        console.log('Fetch users...');
        return new Promise( (res, rej) => {
            try{
                let users = [];
                firestore.collection('users')
                    .onSnapshot( ( snapshot) => {
                    snapshot.forEach( doc => { 
                        users.push( doc.data());
                    });
                    res( {success: true , data: users} );

                } );
            }
            catch(error){
                rej({success: false, error:error, data:null})
            }
        } );    
    },
    signIn:( data ) => {
        console.log('SignIn this', data);
        return new Promise( (res, rej)=> {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then( response => {
                console.log(response);
                const userObj = { debt: 0 , displayName:data.username, userId: response.user.uid, assignedPurchases: {} };
                
                response.user.updateProfile({ displayName: data.username })
                    .then( () => {
                        firestore.collection('users').doc(userObj.userId).set(userObj);
                        res({
                            success: true, 
                            data:{ 
                                user: userObj,
                                updatedProfile: firebase.auth().currentUser
                            }
                        });
                    })
                    .catch( error => {
                        console.error(error);
                        rej({ error});
                    });
            })
            .catch(error => {
                console.error(error);
                rej({ error});
            })
        } );
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