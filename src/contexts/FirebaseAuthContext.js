import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../firebase";
import { useRouter } from "next/router";

const FirebaseAuthContext = React.createContext();
export function useAuth() {
  return useContext(FirebaseAuthContext);
}

const createUser = (cred) => {
  return db.collection("users").doc(cred.user.uid).set({
    email: cred.user.email,
  });
};

export function FirebaseAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signup = async (email, password) => {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    return createUser(cred);
  };

  async function loginPassword(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  }

  const setProfile = (data) => {
    setCurrentUser({ ...currentUser, ...data });
    return currentUser;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let data = await (
          await db.collection("users").doc(user.uid).get()
        ).data();
        if (data) {
          data = { ...user, ...data, registered: true };
          setProfile(data);
        } else {
          data = { ...user, registered: false };
          setProfile(data);
        }
      } else {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginPassword,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loginGoogle,
    setProfile,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
}
