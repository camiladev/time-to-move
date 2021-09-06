import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

import config from "./configFirebase"

const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebase.auth(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider();

export default {
  googleLogIn: async () => {
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await firebaseAuth.signInWithPopup(provider);

    return result;
  },

  googleLogOn: () => firebaseAuth.signOut(),
};