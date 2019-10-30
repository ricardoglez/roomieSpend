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
        return new Promise( (res, rej) => {
            try{
                firebase.auth()
                .onAuthStateChanged( (user) =>{
                    if( user ){
                        firestore.collection('users').doc(user.uid).get()
                        .then( userData => {
                            const uD = userData.data()
                            const userFormatted = {
                                uid: user.uid,
                                displayName: user.displayName,
                                teamId: uD.teamId,
                                debt: uD.debt,
                                assignedPurchases: uD.assignedPurchases,
                                lastLogin: user.metadata.lastSignInTime,
                                refreshToken: user.refreshToken,
                            };
                            res( { success: true , data:userFormatted });
                        })                        
                    }
                    else {
                        console.error('this User isnt auth', user);
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
        return new Promise( (res, rej) => {
            try{
                const user = firebase.auth().currentUser;
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
    fetchTeams: () => {
        console.log('Fetch teams...');
        return new Promise( (res, rej) => {
            try{
                let teams = [];
                firestore.collection('teams')
                    .onSnapshot( (snapshot) => {
                    snapshot.forEach( doc => { 
                        teams.push( doc.data());
                    });
                    res( {success: true , data: teams} );

                } );
            }
            catch(error){
                rej({success: false, error:error, data:null})
            }
        } );    
    },
    fetchTeammates: ( teamId ) => {
        console.log('----Fetch Teammates----');
        console.log(teamId);
        return new Promise((res, rej) => {
            try{
                let teammates = [];
                const refTeams = firestore.collection('teams');

                refTeams.doc(teamId).get()
                    .then( team => {
                        if(!team){
                            rej({success: false , error: new Error('The associated team doesnt exist') })
                        }
                        let teamMembers = team.data().teamMembers;
                        firestore.collection('users')
                            .get()
                            .then( usersData => {
                                usersData.forEach( user => {
                                    console.log(user.data().userId);
                                    if( teamMembers.includes( user.data().userId ) ){
                                        teammates.push(user.data());
                                    }
                                })
                                console.log('Result:', teammates);
                                res({success:true , data: teammates })
                            });
                    } );
            }
            catch(error ){
                console.log(error);
                rej({success: false , error:error})   
            }
        });
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

            const newMemberRef = firestore.collection('teams')
                            .doc(data.teamId);
                            console.log(newMemberRef);
                            newMemberRef.get()
                            .then( r => {
                                let teamData = r.data();
                                console.log(teamData);
                                if( !teamData || teamData.teamMembers.length > teamData.maxMembers){
                                    rej({success:false, type:'team-error', message:`Este equipo tiene un maximo de ${teamData.maxMembers} miembros`  ,error: new Error(`This team only allows ${teamData.maxMembers}`)})    
                                }
                                else {
                                    
                                    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                                    .then( response => {
                                        const userObj = {
                                            debt: 0 , 
                                            displayName:data.username, 
                                            userId: response.user.uid, 
                                            assignedPurchases: {},
                                            teamId: data.teamId
                                        };
                                        
                                        response.user.updateProfile({ displayName: data.username , teamId: data.teamId })
                                            .then( () => {
                                                newMemberRef.update({
                                                    teamMembers: firebase.firestore.FieldValue.arrayUnion( userObj.userId )
                                                });
                                                firestore.collection('users').doc(userObj.userId).set(userObj);
                                                res({
                                                    success: true, 
                                                    data:{
                                                        teamId: userObj.teamId, 
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
                                }
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