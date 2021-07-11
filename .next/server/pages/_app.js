/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useAuth\": function() { return /* binding */ useAuth; },\n/* harmony export */   \"FirebaseAuthProvider\": function() { return /* binding */ FirebaseAuthProvider; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firebase */ \"./src/firebase.js\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _jsxFileName = \"/Users/tanjoen/Documents/top-quark/src/contexts/FirebaseAuthContext.js\";\n\n\n\n\nconst FirebaseAuthContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext();\nfunction useAuth() {\n  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(FirebaseAuthContext);\n}\nfunction FirebaseAuthProvider({\n  children\n}) {\n  const {\n    0: currentUser,\n    1: setCurrentUser\n  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n  const {\n    0: loading,\n    1: setLoading\n  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n\n  function signup(email, password) {\n    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.createUserWithEmailAndPassword(email, password);\n  }\n\n  function loginPassword(email, password) {\n    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.signInWithEmailAndPassword(email, password);\n  }\n\n  function logout() {\n    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.signOut();\n  }\n\n  function resetPassword(email) {\n    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.sendPasswordResetEmail(email);\n  }\n\n  function updateEmail(email) {\n    return currentUser.updateEmail(email);\n  }\n\n  function updatePassword(password) {\n    return currentUser.updatePassword(password);\n  }\n\n  function loginGoogle() {\n    const provider = new (firebase_app__WEBPACK_IMPORTED_MODULE_3___default().auth.GoogleAuthProvider)();\n    return _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.signInWithPopup(provider);\n  }\n\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    const unsubscribe = _firebase__WEBPACK_IMPORTED_MODULE_2__.auth.onAuthStateChanged(user => {\n      setCurrentUser(user);\n      setLoading(false);\n    });\n    return unsubscribe;\n  }, []);\n  const value = {\n    currentUser,\n    loginPassword,\n    signup,\n    logout,\n    resetPassword,\n    updateEmail,\n    updatePassword,\n    loginGoogle\n  };\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FirebaseAuthContext.Provider, {\n    value: value,\n    children: !loading && children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 65,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9zcmMvY29udGV4dHMvRmlyZWJhc2VBdXRoQ29udGV4dC5qcz9iZTVlIl0sIm5hbWVzIjpbIkZpcmViYXNlQXV0aENvbnRleHQiLCJSZWFjdCIsInVzZUF1dGgiLCJ1c2VDb250ZXh0IiwiRmlyZWJhc2VBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsImN1cnJlbnRVc2VyIiwic2V0Q3VycmVudFVzZXIiLCJ1c2VTdGF0ZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwic2lnbnVwIiwiZW1haWwiLCJwYXNzd29yZCIsImF1dGgiLCJsb2dpblBhc3N3b3JkIiwibG9nb3V0IiwicmVzZXRQYXNzd29yZCIsInVwZGF0ZUVtYWlsIiwidXBkYXRlUGFzc3dvcmQiLCJsb2dpbkdvb2dsZSIsInByb3ZpZGVyIiwiZmlyZWJhc2UiLCJ1c2VFZmZlY3QiLCJ1bnN1YnNjcmliZSIsInVzZXIiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsTUFBTUEsbUJBQW1CLGdCQUFHQywwREFBQSxFQUE1QjtBQUVPLFNBQVNDLE9BQVQsR0FBbUI7QUFDeEIsU0FBT0MsaURBQVUsQ0FBQ0gsbUJBQUQsQ0FBakI7QUFDRDtBQUVNLFNBQVNJLG9CQUFULENBQThCO0FBQUVDO0FBQUYsQ0FBOUIsRUFBNEM7QUFDakQsUUFBTTtBQUFBLE9BQUNDLFdBQUQ7QUFBQSxPQUFjQztBQUFkLE1BQWdDQywrQ0FBUSxFQUE5QztBQUNBLFFBQU07QUFBQSxPQUFDQyxPQUFEO0FBQUEsT0FBVUM7QUFBVixNQUF3QkYsK0NBQVEsQ0FBQyxJQUFELENBQXRDOztBQUVBLFdBQVNHLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCQyxRQUF2QixFQUFpQztBQUMvQixXQUFPQywwRUFBQSxDQUFvQ0YsS0FBcEMsRUFBMkNDLFFBQTNDLENBQVA7QUFDRDs7QUFFRCxXQUFTRSxhQUFULENBQXVCSCxLQUF2QixFQUE4QkMsUUFBOUIsRUFBd0M7QUFDdEMsV0FBT0Msc0VBQUEsQ0FBZ0NGLEtBQWhDLEVBQXVDQyxRQUF2QyxDQUFQO0FBQ0Q7O0FBRUQsV0FBU0csTUFBVCxHQUFrQjtBQUNoQixXQUFPRixtREFBQSxFQUFQO0FBQ0Q7O0FBRUQsV0FBU0csYUFBVCxDQUF1QkwsS0FBdkIsRUFBOEI7QUFDNUIsV0FBT0Usa0VBQUEsQ0FBNEJGLEtBQTVCLENBQVA7QUFDRDs7QUFFRCxXQUFTTSxXQUFULENBQXFCTixLQUFyQixFQUE0QjtBQUMxQixXQUFPTixXQUFXLENBQUNZLFdBQVosQ0FBd0JOLEtBQXhCLENBQVA7QUFDRDs7QUFFRCxXQUFTTyxjQUFULENBQXdCTixRQUF4QixFQUFrQztBQUNoQyxXQUFPUCxXQUFXLENBQUNhLGNBQVosQ0FBMkJOLFFBQTNCLENBQVA7QUFDRDs7QUFFRCxXQUFTTyxXQUFULEdBQXVCO0FBQ3JCLFVBQU1DLFFBQVEsR0FBRyxJQUFJQyw2RUFBSixFQUFqQjtBQUNBLFdBQU9SLDJEQUFBLENBQXFCTyxRQUFyQixDQUFQO0FBQ0Q7O0FBQ0RFLGtEQUFTLENBQUMsTUFBTTtBQUNkLFVBQU1DLFdBQVcsR0FBR1YsOERBQUEsQ0FBeUJXLElBQUQsSUFBVTtBQUNwRGxCLG9CQUFjLENBQUNrQixJQUFELENBQWQ7QUFDQWYsZ0JBQVUsQ0FBQyxLQUFELENBQVY7QUFDRCxLQUhtQixDQUFwQjtBQUtBLFdBQU9jLFdBQVA7QUFDRCxHQVBRLEVBT04sRUFQTSxDQUFUO0FBU0EsUUFBTUUsS0FBSyxHQUFHO0FBQ1pwQixlQURZO0FBRVpTLGlCQUZZO0FBR1pKLFVBSFk7QUFJWkssVUFKWTtBQUtaQyxpQkFMWTtBQU1aQyxlQU5ZO0FBT1pDLGtCQVBZO0FBUVpDO0FBUlksR0FBZDtBQVdBLHNCQUNFLDhEQUFDLG1CQUFELENBQXFCLFFBQXJCO0FBQThCLFNBQUssRUFBRU0sS0FBckM7QUFBQSxjQUNHLENBQUNqQixPQUFELElBQVlKO0FBRGY7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBS0QiLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvRmlyZWJhc2VBdXRoQ29udGV4dC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIi4uL2ZpcmViYXNlXCI7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvYXV0aFwiO1xuXG5jb25zdCBGaXJlYmFzZUF1dGhDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlQXV0aCgpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoRmlyZWJhc2VBdXRoQ29udGV4dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaXJlYmFzZUF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgW2N1cnJlbnRVc2VyLCBzZXRDdXJyZW50VXNlcl0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBmdW5jdGlvbiBzaWdudXAoZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dpblBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCkge1xuICAgIHJldHVybiBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgcmV0dXJuIGF1dGguc2lnbk91dCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRQYXNzd29yZChlbWFpbCkge1xuICAgIHJldHVybiBhdXRoLnNlbmRQYXNzd29yZFJlc2V0RW1haWwoZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRW1haWwoZW1haWwpIHtcbiAgICByZXR1cm4gY3VycmVudFVzZXIudXBkYXRlRW1haWwoZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFzc3dvcmQocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gY3VycmVudFVzZXIudXBkYXRlUGFzc3dvcmQocGFzc3dvcmQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW5Hb29nbGUoKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcbiAgICByZXR1cm4gYXV0aC5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpO1xuICB9XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xuICAgICAgc2V0Q3VycmVudFVzZXIodXNlcik7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB1bnN1YnNjcmliZTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHZhbHVlID0ge1xuICAgIGN1cnJlbnRVc2VyLFxuICAgIGxvZ2luUGFzc3dvcmQsXG4gICAgc2lnbnVwLFxuICAgIGxvZ291dCxcbiAgICByZXNldFBhc3N3b3JkLFxuICAgIHVwZGF0ZUVtYWlsLFxuICAgIHVwZGF0ZVBhc3N3b3JkLFxuICAgIGxvZ2luR29vZ2xlLFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZpcmViYXNlQXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT5cbiAgICAgIHshbG9hZGluZyAmJiBjaGlsZHJlbn1cbiAgICA8L0ZpcmViYXNlQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/contexts/FirebaseAuthContext.js\n");

/***/ }),

/***/ "./src/firebase.js":
/*!*************************!*\
  !*** ./src/firebase.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"firebaseConfig\": function() { return /* binding */ firebaseConfig; },\n/* harmony export */   \"app\": function() { return /* binding */ app; },\n/* harmony export */   \"auth\": function() { return /* binding */ auth; },\n/* harmony export */   \"db\": function() { return /* binding */ db; }\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/analytics */ \"firebase/analytics\");\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_analytics__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst firebaseConfig = {\n  apiKey: \"AIzaSyCzxkMTakEHWYPkKI39X0kDg_y8-KatQ1c\",\n  authDomain: \"quark-6d7c5.firebaseapp.com\",\n  databaseURL: \"https://quark-6d7c5-default-rtdb.asia-southeast1.firebasedatabase.app\",\n  projectId: \"quark-6d7c5\",\n  storageBucket: \"quark-6d7c5.appspot.com\",\n  messagingSenderId: \"806913792334\",\n  appId: \"1:806913792334:web:d218b4d5f7cb115f4ba61f\",\n  measurementId: \"G-PCDNSZZLL6\"\n};\nconst app = (firebase_app__WEBPACK_IMPORTED_MODULE_0___default().apps.length) ? firebase_app__WEBPACK_IMPORTED_MODULE_0___default().app() : firebase_app__WEBPACK_IMPORTED_MODULE_0___default().initializeApp(firebaseConfig);\nconst auth = app.auth();\n\nconst analytics = () => firebase_app__WEBPACK_IMPORTED_MODULE_0___default().analytics();\n\nconst db = firebase_app__WEBPACK_IMPORTED_MODULE_0___default().firestore();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9zcmMvZmlyZWJhc2UuanM/ZGM1OSJdLCJuYW1lcyI6WyJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsImFwcCIsImZpcmViYXNlIiwiYXV0aCIsImFuYWx5dGljcyIsImRiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLE1BQU1BLGNBQWMsR0FBRztBQUM1QkMsUUFBTSxFQUFFLHlDQURvQjtBQUU1QkMsWUFBVSxFQUFFLDZCQUZnQjtBQUc1QkMsYUFBVyxFQUNULHVFQUowQjtBQUs1QkMsV0FBUyxFQUFFLGFBTGlCO0FBTTVCQyxlQUFhLEVBQUUseUJBTmE7QUFPNUJDLG1CQUFpQixFQUFFLGNBUFM7QUFRNUJDLE9BQUssRUFBRSwyQ0FScUI7QUFTNUJDLGVBQWEsRUFBRTtBQVRhLENBQXZCO0FBWUEsTUFBTUMsR0FBRyxHQUFHQyxpRUFBQSxHQUNmQSx1REFBQSxFQURlLEdBRWZBLGlFQUFBLENBQXVCVixjQUF2QixDQUZHO0FBSUEsTUFBTVcsSUFBSSxHQUFHRixHQUFHLENBQUNFLElBQUosRUFBYjs7QUFFUCxNQUFNQyxTQUFTLEdBQUcsTUFBTUYsNkRBQUEsRUFBeEI7O0FBRU8sTUFBTUcsRUFBRSxHQUFHSCw2REFBQSxFQUFYIiwiZmlsZSI6Ii4vc3JjL2ZpcmViYXNlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbmltcG9ydCBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IFwiZmlyZWJhc2UvYW5hbHl0aWNzXCI7XG5pbXBvcnQgXCJmaXJlYmFzZS9hdXRoXCI7XG5cbmV4cG9ydCBjb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUN6eGtNVGFrRUhXWVBrS0kzOVgwa0RnX3k4LUthdFExY1wiLFxuICBhdXRoRG9tYWluOiBcInF1YXJrLTZkN2M1LmZpcmViYXNlYXBwLmNvbVwiLFxuICBkYXRhYmFzZVVSTDpcbiAgICBcImh0dHBzOi8vcXVhcmstNmQ3YzUtZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiLFxuICBwcm9qZWN0SWQ6IFwicXVhcmstNmQ3YzVcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJxdWFyay02ZDdjNS5hcHBzcG90LmNvbVwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCI4MDY5MTM3OTIzMzRcIixcbiAgYXBwSWQ6IFwiMTo4MDY5MTM3OTIzMzQ6d2ViOmQyMThiNGQ1ZjdjYjExNWY0YmE2MWZcIixcbiAgbWVhc3VyZW1lbnRJZDogXCJHLVBDRE5TWlpMTDZcIixcbn07XG5cbmV4cG9ydCBjb25zdCBhcHAgPSBmaXJlYmFzZS5hcHBzLmxlbmd0aFxuICA/IGZpcmViYXNlLmFwcCgpXG4gIDogZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gYXBwLmF1dGgoKTtcblxuY29uc3QgYW5hbHl0aWNzID0gKCkgPT4gZmlyZWJhc2UuYW5hbHl0aWNzKCk7XG5cbmV4cG9ydCBjb25zdCBkYiA9IGZpcmViYXNlLmZpcmVzdG9yZSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/firebase.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_App_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/App.css */ \"./src/css/App.css\");\n/* harmony import */ var _css_App_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_App_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _css_login_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/login.css */ \"./src/css/login.css\");\n/* harmony import */ var _css_login_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_login_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _css_Footer_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/Footer.css */ \"./src/css/Footer.css\");\n/* harmony import */ var _css_Footer_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_Footer_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _css_ToolsPage_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/ToolsPage.css */ \"./src/css/ToolsPage.css\");\n/* harmony import */ var _css_ToolsPage_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_ToolsPage_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ \"@fortawesome/fontawesome-svg-core\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core/styles.css */ \"./node_modules/@fortawesome/fontawesome-svg-core/styles.css\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _contexts_FirebaseAuthContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contexts/FirebaseAuthContext */ \"./src/contexts/FirebaseAuthContext.js\");\n\nvar _jsxFileName = \"/Users/tanjoen/Documents/top-quark/src/pages/_app.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// import \"../../styles/globals.css\";\n\n\n\n\n\n // Import the CSS\n\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__.config.autoAddCss = false;\n\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_FirebaseAuthContext__WEBPACK_IMPORTED_MODULE_7__.FirebaseAuthProvider, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n      name: \"viewport\",\n      content: \"width=device-width, initial-scale=1\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n      name: \"viewport\",\n      content: \"width=device-width, initial-scale=1\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 16,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 7\n    }, this), \";\"]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 14,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9zcmMvcGFnZXMvX2FwcC5qcz8yMjU0Il0sIm5hbWVzIjpbImNvbmZpZyIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBQ3VEOztBQUN2REEsZ0ZBQUEsR0FBb0IsS0FBcEI7QUFFQTs7QUFFQSxTQUFTQyxLQUFULENBQWU7QUFBRUMsV0FBRjtBQUFhQztBQUFiLENBQWYsRUFBeUM7QUFDdkMsc0JBQ0UsOERBQUMsK0VBQUQ7QUFBQSw0QkFDRTtBQUFNLFVBQUksRUFBQyxVQUFYO0FBQXNCLGFBQU8sRUFBQztBQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUFNLFVBQUksRUFBQyxVQUFYO0FBQXNCLGFBQU8sRUFBQztBQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkYsZUFHRSw4REFBQyxTQUFELG9CQUFlQSxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFIRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQU9EOztBQUVELCtEQUFlRixLQUFmIiwiZmlsZSI6Ii4vc3JjL3BhZ2VzL19hcHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCBcIi4uL2Nzcy9BcHAuY3NzXCI7XG5pbXBvcnQgXCIuLi9jc3MvbG9naW4uY3NzXCI7XG5pbXBvcnQgXCIuLi9jc3MvRm9vdGVyLmNzc1wiO1xuaW1wb3J0IFwiLi4vY3NzL1Rvb2xzUGFnZS5jc3NcIjtcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIjtcbmltcG9ydCBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZS9zdHlsZXMuY3NzXCI7IC8vIEltcG9ydCB0aGUgQ1NTXG5jb25maWcuYXV0b0FkZENzcyA9IGZhbHNlO1xuXG5pbXBvcnQgeyBGaXJlYmFzZUF1dGhQcm92aWRlciB9IGZyb20gXCIuLi9jb250ZXh0cy9GaXJlYmFzZUF1dGhDb250ZXh0XCI7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaXJlYmFzZUF1dGhQcm92aWRlcj5cbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiIC8+XG4gICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcbiAgICA8L0ZpcmViYXNlQXV0aFByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

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