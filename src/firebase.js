import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCzxkMTakEHWYPkKI39X0kDg_y8-KatQ1c",
  authDomain: "quark-6d7c5.firebaseapp.com",
  databaseURL:
    "https://quark-6d7c5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quark-6d7c5",
  storageBucket: "quark-6d7c5.appspot.com",
  messagingSenderId: "806913792334",
  appId: "1:806913792334:web:d218b4d5f7cb115f4ba61f",
  measurementId: "G-PCDNSZZLL6",
};

export const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

const analytics = () => firebase.analytics();

export const db = firebase.firestore();
export const firestore = firebase.firestore;

