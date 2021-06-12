import firebase from "firebase";

let firebaseConfig = {
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

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

export default db;
