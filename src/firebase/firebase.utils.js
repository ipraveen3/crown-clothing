import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDyW5ns-4v7l5Uy9btO84YF-IM02eMgw8c",
    authDomain: "crown-db-d9e39.firebaseapp.com",
    projectId: "crown-db-d9e39",
    storageBucket: "crown-db-d9e39.appspot.com",
    messagingSenderId: "65141547168",
    appId: "1:65141547168:web:276b3730f704e161de29c5",
    measurementId: "G-DJEHPJ9FZ4"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
