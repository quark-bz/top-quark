exports.id = 163;
exports.ids = [163];
exports.modules = {

/***/ 2163:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": function() { return /* binding */ useAuth; },
/* harmony export */   "G": function() { return /* binding */ FirebaseAuthProvider; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7515);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9421);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5942);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_4__);





const FirebaseAuthContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext();
function useAuth() {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(FirebaseAuthContext);
}
function FirebaseAuthProvider({
  children
}) {
  const {
    0: currentUser,
    1: setCurrentUser
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);

  function signup(email, password) {
    return _firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth.createUserWithEmailAndPassword */ .I8.createUserWithEmailAndPassword(email, password);
  }

  function loginPassword(email, password) {
    return _firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth.signInWithEmailAndPassword */ .I8.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return _firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth.signOut */ .I8.signOut();
  }

  function resetPassword(email) {
    return _firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth.sendPasswordResetEmail */ .I8.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function loginGoogle() {
    const provider = new (firebase_app__WEBPACK_IMPORTED_MODULE_3___default().auth.GoogleAuthProvider)();
    return _firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth.signInWithPopup */ .I8.signInWithPopup(provider);
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const unsubscribe = _firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth.onAuthStateChanged */ .I8.onAuthStateChanged(user => {
      setCurrentUser(user);
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
    loginGoogle
  };
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FirebaseAuthContext.Provider, {
    value: value,
    children: !loading && children
  });
}

/***/ }),

/***/ 7515:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I8": function() { return /* binding */ auth; },
/* harmony export */   "db": function() { return /* binding */ db; }
/* harmony export */ });
/* unused harmony exports firebaseConfig, app */
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9421);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9714);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4285);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_analytics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5942);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_3__);




const firebaseConfig = {
  apiKey: "AIzaSyCzxkMTakEHWYPkKI39X0kDg_y8-KatQ1c",
  authDomain: "quark-6d7c5.firebaseapp.com",
  databaseURL: "https://quark-6d7c5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quark-6d7c5",
  storageBucket: "quark-6d7c5.appspot.com",
  messagingSenderId: "806913792334",
  appId: "1:806913792334:web:d218b4d5f7cb115f4ba61f",
  measurementId: "G-PCDNSZZLL6"
};
const app = (firebase_app__WEBPACK_IMPORTED_MODULE_0___default().apps.length) ? firebase_app__WEBPACK_IMPORTED_MODULE_0___default().app() : firebase_app__WEBPACK_IMPORTED_MODULE_0___default().initializeApp(firebaseConfig);
const auth = app.auth();

const analytics = () => firebase.analytics();

const db = firebase_app__WEBPACK_IMPORTED_MODULE_0___default().firestore();

/***/ })

};
;