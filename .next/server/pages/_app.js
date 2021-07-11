(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/FirebaseAuthContext.js":
/*!*********************************************!*\
  !*** ./src/contexts/FirebaseAuthContext.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useAuth": function() { return /* binding */ useAuth; },
/* harmony export */   "FirebaseAuthProvider": function() { return /* binding */ FirebaseAuthProvider; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firebase */ "./src/firebase.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/auth */ "firebase/auth");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);

var _jsxFileName = "C:\\Users\\Shao En\\Desktop\\Top-Quark\\src\\contexts\\FirebaseAuthContext.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const FirebaseAuthContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext();
function useAuth() {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(FirebaseAuthContext);
}

const createUser = cred => {
  return _firebase__WEBPACK_IMPORTED_MODULE_2__.db.collection("users").doc(cred.user.uid).set({
    email: cred.user.email
  });
};

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
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();

  const signup = async (email, password) => {
    const cred = await _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.createUserWithEmailAndPassword(email, password);
    return createUser(cred);
  };

  async function loginPassword(email, password) {
    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.signOut();
  }

  function resetPassword(email) {
    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function loginGoogle() {
    const provider = new (firebase_app__WEBPACK_IMPORTED_MODULE_3___default().auth.GoogleAuthProvider)();
    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.signInWithPopup(provider);
  }

  const setProfile = data => {
    setCurrentUser(_objectSpread(_objectSpread({}, currentUser), data));
    return currentUser;
  };

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const unsubscribe = _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.onAuthStateChanged(async user => {
      if (user) {
        let data = await (await _firebase__WEBPACK_IMPORTED_MODULE_2__.db.collection("users").doc(user.uid).get()).data();

        if (data) {
          data = _objectSpread(_objectSpread(_objectSpread({}, user), data), {}, {
            registered: true
          });
          setProfile(data);
        } else {
          data = _objectSpread(_objectSpread({}, user), {}, {
            registered: false
          });
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
    setProfile
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FirebaseAuthContext.Provider, {
    value: value,
    children: !loading && children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 94,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./src/firebase.js":
/*!*************************!*\
  !*** ./src/firebase.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firebaseConfig": function() { return /* binding */ firebaseConfig; },
/* harmony export */   "app": function() { return /* binding */ app; },
/* harmony export */   "auth": function() { return /* binding */ auth; },
/* harmony export */   "db": function() { return /* binding */ db; }
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "firebase/firestore");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/analytics */ "firebase/analytics");
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_analytics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/auth */ "firebase/auth");
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

const analytics = () => firebase_app__WEBPACK_IMPORTED_MODULE_0___default().analytics();

const db = firebase_app__WEBPACK_IMPORTED_MODULE_0___default().firestore();

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_App_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/App.css */ "./src/css/App.css");
/* harmony import */ var _css_App_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_App_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_login_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/login.css */ "./src/css/login.css");
/* harmony import */ var _css_login_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_login_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _css_Footer_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/Footer.css */ "./src/css/Footer.css");
/* harmony import */ var _css_Footer_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_Footer_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _css_ToolsPage_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/ToolsPage.css */ "./src/css/ToolsPage.css");
/* harmony import */ var _css_ToolsPage_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_ToolsPage_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "@fortawesome/fontawesome-svg-core");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core/styles.css */ "./node_modules/@fortawesome/fontawesome-svg-core/styles.css");
/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _contexts_FirebaseAuthContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contexts/FirebaseAuthContext */ "./src/contexts/FirebaseAuthContext.js");

var _jsxFileName = "C:\\Users\\Shao En\\Desktop\\Top-Quark\\src\\pages\\_app.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import "../../styles/globals.css";





 // Import the CSS

_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__.config.autoAddCss = false;


function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_FirebaseAuthContext__WEBPACK_IMPORTED_MODULE_7__.FirebaseAuthProvider, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, this), ";"]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ "./node_modules/@fortawesome/fontawesome-svg-core/styles.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-svg-core/styles.css ***!
  \*******************************************************************/
/***/ (function() {



/***/ }),

/***/ "./src/css/App.css":
/*!*************************!*\
  !*** ./src/css/App.css ***!
  \*************************/
/***/ (function() {



/***/ }),

/***/ "./src/css/Footer.css":
/*!****************************!*\
  !*** ./src/css/Footer.css ***!
  \****************************/
/***/ (function() {



/***/ }),

/***/ "./src/css/ToolsPage.css":
/*!*******************************!*\
  !*** ./src/css/ToolsPage.css ***!
  \*******************************/
/***/ (function() {



/***/ }),

/***/ "./src/css/login.css":
/*!***************************!*\
  !*** ./src/css/login.css ***!
  \***************************/
/***/ (function() {



/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("@fortawesome/fontawesome-svg-core");;

/***/ }),

/***/ "firebase/analytics":
/*!*************************************!*\
  !*** external "firebase/analytics" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/analytics");;

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/firestore");;

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9zcmMvY29udGV4dHMvRmlyZWJhc2VBdXRoQ29udGV4dC5qcyIsIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9zcmMvZmlyZWJhc2UuanMiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrLy4vc3JjL3BhZ2VzL19hcHAuanMiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrL2V4dGVybmFsIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrL2V4dGVybmFsIFwiZmlyZWJhc2UvYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrL2V4dGVybmFsIFwiZmlyZWJhc2UvYXBwXCIiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrL2V4dGVybmFsIFwiZmlyZWJhc2UvYXV0aFwiIiwid2VicGFjazovL3RvcC1xdWFyay9leHRlcm5hbCBcImZpcmViYXNlL2ZpcmVzdG9yZVwiIiwid2VicGFjazovL3RvcC1xdWFyay9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly90b3AtcXVhcmsvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiJdLCJuYW1lcyI6WyJGaXJlYmFzZUF1dGhDb250ZXh0IiwiUmVhY3QiLCJ1c2VBdXRoIiwidXNlQ29udGV4dCIsImNyZWF0ZVVzZXIiLCJjcmVkIiwiZGIiLCJkb2MiLCJ1c2VyIiwidWlkIiwic2V0IiwiZW1haWwiLCJGaXJlYmFzZUF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwiY3VycmVudFVzZXIiLCJzZXRDdXJyZW50VXNlciIsInVzZVN0YXRlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJzaWdudXAiLCJwYXNzd29yZCIsImF1dGgiLCJsb2dpblBhc3N3b3JkIiwibG9nb3V0IiwicmVzZXRQYXNzd29yZCIsInVwZGF0ZUVtYWlsIiwidXBkYXRlUGFzc3dvcmQiLCJsb2dpbkdvb2dsZSIsInByb3ZpZGVyIiwiZmlyZWJhc2UiLCJzZXRQcm9maWxlIiwiZGF0YSIsInVzZUVmZmVjdCIsInVuc3Vic2NyaWJlIiwiZ2V0IiwicmVnaXN0ZXJlZCIsInZhbHVlIiwiZmlyZWJhc2VDb25maWciLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsIm1lYXN1cmVtZW50SWQiLCJhcHAiLCJhbmFseXRpY3MiLCJjb25maWciLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxtQkFBbUIsZ0JBQUdDLDBEQUFBLEVBQTVCO0FBQ08sU0FBU0MsT0FBVCxHQUFtQjtBQUN4QixTQUFPQyxpREFBVSxDQUFDSCxtQkFBRCxDQUFqQjtBQUNEOztBQUVELE1BQU1JLFVBQVUsR0FBSUMsSUFBRCxJQUFVO0FBQzNCLFNBQU9DLG9EQUFBLENBQWMsT0FBZCxFQUF1QkMsR0FBdkIsQ0FBMkJGLElBQUksQ0FBQ0csSUFBTCxDQUFVQyxHQUFyQyxFQUEwQ0MsR0FBMUMsQ0FBOEM7QUFDbkRDLFNBQUssRUFBRU4sSUFBSSxDQUFDRyxJQUFMLENBQVVHO0FBRGtDLEdBQTlDLENBQVA7QUFHRCxDQUpEOztBQU1PLFNBQVNDLG9CQUFULENBQThCO0FBQUVDO0FBQUYsQ0FBOUIsRUFBNEM7QUFDakQsUUFBTTtBQUFBLE9BQUNDLFdBQUQ7QUFBQSxPQUFjQztBQUFkLE1BQWdDQywrQ0FBUSxFQUE5QztBQUNBLFFBQU07QUFBQSxPQUFDQyxPQUFEO0FBQUEsT0FBVUM7QUFBVixNQUF3QkYsK0NBQVEsQ0FBQyxJQUFELENBQXRDO0FBQ0EsUUFBTUcsTUFBTSxHQUFHQyxzREFB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O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQiLCJmaWxlIjoicGFnZXMvX2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiLi4vZmlyZWJhc2VcIjtcclxuaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcclxuaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi9maXJlYmFzZVwiO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuXHJcbmNvbnN0IEZpcmViYXNlQXV0aENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KCk7XHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VBdXRoKCkge1xyXG4gIHJldHVybiB1c2VDb250ZXh0KEZpcmViYXNlQXV0aENvbnRleHQpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVVc2VyID0gKGNyZWQpID0+IHtcclxuICByZXR1cm4gZGIuY29sbGVjdGlvbihcInVzZXJzXCIpLmRvYyhjcmVkLnVzZXIudWlkKS5zZXQoe1xyXG4gICAgZW1haWw6IGNyZWQudXNlci5lbWFpbCxcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaXJlYmFzZUF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcclxuICBjb25zdCBbY3VycmVudFVzZXIsIHNldEN1cnJlbnRVc2VyXSA9IHVzZVN0YXRlKCk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIGNvbnN0IHNpZ251cCA9IGFzeW5jIChlbWFpbCwgcGFzc3dvcmQpID0+IHtcclxuICAgIGNvbnN0IGNyZWQgPSBhd2FpdCBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVVzZXIoY3JlZCk7XHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gbG9naW5QYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpIHtcclxuICAgIHJldHVybiBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBsb2dvdXQoKSB7XHJcbiAgICByZXR1cm4gYXV0aC5zaWduT3V0KCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldFBhc3N3b3JkKGVtYWlsKSB7XHJcbiAgICByZXR1cm4gYXV0aC5zZW5kUGFzc3dvcmRSZXNldEVtYWlsKGVtYWlsKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUVtYWlsKGVtYWlsKSB7XHJcbiAgICByZXR1cm4gY3VycmVudFVzZXIudXBkYXRlRW1haWwoZW1haWwpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlUGFzc3dvcmQocGFzc3dvcmQpIHtcclxuICAgIHJldHVybiBjdXJyZW50VXNlci51cGRhdGVQYXNzd29yZChwYXNzd29yZCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBsb2dpbkdvb2dsZSgpIHtcclxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICByZXR1cm4gYXV0aC5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2V0UHJvZmlsZSA9IChkYXRhKSA9PiB7XHJcbiAgICBzZXRDdXJyZW50VXNlcih7IC4uLmN1cnJlbnRVc2VyLCAuLi5kYXRhIH0pO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKGFzeW5jICh1c2VyKSA9PiB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCAoXHJcbiAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIikuZG9jKHVzZXIudWlkKS5nZXQoKVxyXG4gICAgICAgICkuZGF0YSgpO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICBkYXRhID0geyAuLi51c2VyLCAuLi5kYXRhLCByZWdpc3RlcmVkOiB0cnVlIH07XHJcbiAgICAgICAgICBzZXRQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXRhID0geyAuLi51c2VyLCByZWdpc3RlcmVkOiBmYWxzZSB9O1xyXG4gICAgICAgICAgc2V0UHJvZmlsZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0Q3VycmVudFVzZXIodXNlcik7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdW5zdWJzY3JpYmU7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCB2YWx1ZSA9IHtcclxuICAgIGN1cnJlbnRVc2VyLFxyXG4gICAgbG9naW5QYXNzd29yZCxcclxuICAgIHNpZ251cCxcclxuICAgIGxvZ291dCxcclxuICAgIHJlc2V0UGFzc3dvcmQsXHJcbiAgICB1cGRhdGVFbWFpbCxcclxuICAgIHVwZGF0ZVBhc3N3b3JkLFxyXG4gICAgbG9naW5Hb29nbGUsXHJcbiAgICBzZXRQcm9maWxlLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8RmlyZWJhc2VBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PlxyXG4gICAgICB7IWxvYWRpbmcgJiYgY2hpbGRyZW59XHJcbiAgICA8L0ZpcmViYXNlQXV0aENvbnRleHQuUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG4iLCJpbXBvcnQgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiO1xyXG5pbXBvcnQgXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcclxuaW1wb3J0IFwiZmlyZWJhc2UvYW5hbHl0aWNzXCI7XHJcbmltcG9ydCBcImZpcmViYXNlL2F1dGhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcclxuICBhcGlLZXk6IFwiQUl6YVN5Q3p4a01UYWtFSFdZUGtLSTM5WDBrRGdfeTgtS2F0UTFjXCIsXHJcbiAgYXV0aERvbWFpbjogXCJxdWFyay02ZDdjNS5maXJlYmFzZWFwcC5jb21cIixcclxuICBkYXRhYmFzZVVSTDpcclxuICAgIFwiaHR0cHM6Ly9xdWFyay02ZDdjNS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCIsXHJcbiAgcHJvamVjdElkOiBcInF1YXJrLTZkN2M1XCIsXHJcbiAgc3RvcmFnZUJ1Y2tldDogXCJxdWFyay02ZDdjNS5hcHBzcG90LmNvbVwiLFxyXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjgwNjkxMzc5MjMzNFwiLFxyXG4gIGFwcElkOiBcIjE6ODA2OTEzNzkyMzM0OndlYjpkMjE4YjRkNWY3Y2IxMTVmNGJhNjFmXCIsXHJcbiAgbWVhc3VyZW1lbnRJZDogXCJHLVBDRE5TWlpMTDZcIixcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhcHAgPSBmaXJlYmFzZS5hcHBzLmxlbmd0aFxyXG4gID8gZmlyZWJhc2UuYXBwKClcclxuICA6IGZpcmViYXNlLmluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGggPSBhcHAuYXV0aCgpO1xyXG5cclxuY29uc3QgYW5hbHl0aWNzID0gKCkgPT4gZmlyZWJhc2UuYW5hbHl0aWNzKCk7XHJcblxyXG5leHBvcnQgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuIiwiLy8gaW1wb3J0IFwiLi4vLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCI7XHJcbmltcG9ydCBcIi4uL2Nzcy9BcHAuY3NzXCI7XHJcbmltcG9ydCBcIi4uL2Nzcy9sb2dpbi5jc3NcIjtcclxuaW1wb3J0IFwiLi4vY3NzL0Zvb3Rlci5jc3NcIjtcclxuaW1wb3J0IFwiLi4vY3NzL1Rvb2xzUGFnZS5jc3NcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiO1xyXG5pbXBvcnQgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUvc3R5bGVzLmNzc1wiOyAvLyBJbXBvcnQgdGhlIENTU1xyXG5jb25maWcuYXV0b0FkZENzcyA9IGZhbHNlO1xyXG5cclxuaW1wb3J0IHsgRmlyZWJhc2VBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29udGV4dHMvRmlyZWJhc2VBdXRoQ29udGV4dFwiO1xyXG5cclxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxGaXJlYmFzZUF1dGhQcm92aWRlcj5cclxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cclxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcclxuICAgIDwvRmlyZWJhc2VBdXRoUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvYW5hbHl0aWNzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9hcHBcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2F1dGhcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2ZpcmVzdG9yZVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=