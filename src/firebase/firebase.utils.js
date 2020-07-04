import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBPFw-hiCx6hwvQED2o5YyIsK_1EN50EbA",
  authDomain: "crwn-db-1f0e1.firebaseapp.com",
  databaseURL: "https://crwn-db-1f0e1.firebaseio.com",
  projectId: "crwn-db-1f0e1",
  storageBucket: "crwn-db-1f0e1.appspot.com",
  messagingSenderId: "329843973880",
  appId: "1:329843973880:web:9da98a268c506e13c0e50d",
  measurementId: "G-F1Z7GQ8EGV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
