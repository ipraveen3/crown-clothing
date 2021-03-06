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

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;
    const userDocRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userDocRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdDate = new Date();
        try{
            await userDocRef.set({
                displayName,
                email,
                createdDate,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user',error.message);
        }
        
    }
    return userDocRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);
      console.log(collectionRef);

      const batch = firestore.batch();
      objectsToAdd.forEach(obj =>   {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef, obj);
      })

     return await batch.commit();
  }

export  const convertCollectionSnapshotToMap = (collections) => {
      const transformedCollection = collections.docs.map(
          doc => {
              const{ title, items } = doc.data();
              return {
                  routeName : encodeURI(title.toLowerCase()),
                  id: doc.id,
                  title,
                  items 
              }
          }
      )
    
    return transformedCollection.reduce((accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;  
      },{});
  };

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;
