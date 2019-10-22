
import firebase from 'firebase/app';
import 'firebase/firestore';
console.log('...:::Initialize firestore:::...');

const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATA_SET_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};
console.log(config);

firebase.initializeApp(config);

export default firebase.firestore();