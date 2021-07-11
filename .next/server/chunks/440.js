exports.id = 440;
exports.ids = [440];
exports.modules = {

/***/ 4109:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ TitleSubjectText; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


// import "../../css/App.css";
function TitleSubjectText(props) {
  let leanDirection = {};

  if (props.lean === "LEFT") {
    leanDirection = {
      textAlign: "left"
    };
  } else if (props.lean === "RIGHT") {
    leanDirection = {
      textAlign: "right"
    };
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "titleSubjectTextStyle",
    style: leanDirection,
    id: props.id,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
      children: props.subject
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
      children: props.description
    })]
  });
}

/***/ }),

/***/ 2166:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ TwoItemSubCont; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


// import "../../css/App.css";
function TwoItemSubCont(props) {
  let classString = `flexwrap ${props.class}`;
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    className: "subflex",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: classString,
      id: props.id,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "itemcontainer",
        children: props.oneItem
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "itemcontainer",
        children: props.twoItem
      })]
    })
  });
}

/***/ }),

/***/ 3537:
/***/ (function() {

"use strict";
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/image/src/assets/avocadoPastel.e7ede3cf8e3a75fb839ebbb608fdce24.jpg","height":2245,"width":1587,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgABgMBIgACEQEDEQH/xAAUAAEAAAAAAAAAAAAAAAAAAAAH/9oACAEBAAAAAEr/xAAUAQEAAAAAAAAAAAAAAAAAAAAF/9oACAECEAAAAGv/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/9oACAEDEAAAAD//xAAdEAABBAIDAAAAAAAAAAAAAAACAQMEEQAFEjFB/9oACAEBAAE/AJWylMstKYsRCoLWQdgSr4PG+s//xAAZEQACAwEAAAAAAAAAAAAAAAABAwIEEgD/2gAIAQIBAT8Ap1kPTuUADo9//8QAGREAAgMBAAAAAAAAAAAAAAAAATEAAiFR/9oACAEDAQE/ALBaV2f/2Q=="});

/***/ })

};
;