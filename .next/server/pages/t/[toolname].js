(function() {
var exports = {};
exports.id = 892;
exports.ids = [892];
exports.modules = {

/***/ 3319:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _toolname_; },
  "getStaticPaths": function() { return /* binding */ getStaticPaths; },
  "getStaticProps": function() { return /* binding */ getStaticProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: ./src/firebase.js
var firebase = __webpack_require__(7515);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: external "@material-ui/icons/Fullscreen"
var Fullscreen_namespaceObject = require("@material-ui/icons/Fullscreen");;
var Fullscreen_default = /*#__PURE__*/__webpack_require__.n(Fullscreen_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/SaveAlt"
var SaveAlt_namespaceObject = require("@material-ui/icons/SaveAlt");;
var SaveAlt_default = /*#__PURE__*/__webpack_require__.n(SaveAlt_namespaceObject);
// EXTERNAL MODULE: ./src/components/Header.js + 1 modules
var Header = __webpack_require__(9969);
// EXTERNAL MODULE: ./src/components/Footer.js
var Footer = __webpack_require__(5562);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./src/components/tool/BlurOff.js




/* eslint-disable @next/next/link-passhref */

function BlurOffPage() {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      id: "blurBlanket",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        id: "limitText",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
          children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/",
            children: "Quark"
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          id: "blurBlanketTextContainer",
          children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
            children: "Big ideas\uD83D\uDCA1 require bigger screens! Try again on a larger screen...\uD83D\uDE48Sorry!"
          }), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "blurOffDirText",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: "/",
              children: /*#__PURE__*/jsx_runtime_.jsx("u", {
                children: "Home"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "blurOffDirText",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: "/about",
              children: /*#__PURE__*/jsx_runtime_.jsx("u", {
                children: "About"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "blurOffDirText",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: "/develop",
              children: /*#__PURE__*/jsx_runtime_.jsx("u", {
                children: "Develop with Us"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "blurOffDirText",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: "/feedback",
              children: /*#__PURE__*/jsx_runtime_.jsx("u", {
                children: "Feedback"
              })
            })
          })]
        })]
      })
    })
  });
}
;// CONCATENATED MODULE: ./src/pages/t/[toolname].js











const getStaticPaths = async () => {
  const qs = await firebase.db.collection("tools").get(); //   const paths = qs.forEach((doc) => {
  //     return { params: { toolname: doc.name } };
  //   });

  const paths = qs.docs.map(doc => {
    return {
      params: {
        toolname: doc.data().name
      }
    };
  });
  return {
    paths,
    fallback: false
  };
};
const getStaticProps = async ({
  params
}) => {
  const qs = await firebase.db.collection("tools").where("name", "==", params.toolname).get();
  const tool = qs.docs.map(doc => {
    return doc.data();
  })[0];
  return {
    props: {
      tool
    }
  };
};

const ToolPage = ({
  tool
}) => {
  (0,external_react_.useEffect)(() => {
    // window.onbeforeunload = function () {
    //   return "Are you sure you want to leave?";
    // };
    window.addEventListener("message", event => {
      console.log("response received");
      let API_obj = event.data;

      if (API_obj["type"] === "downloadPNG") {
        let titleOfDrawing = document.getElementById("titleInputMain").value;
        console.log("hello there");
        downloadPNG(API_obj["uri"], titleOfDrawing);
      } else {
        return;
      }
    }, false);
  }, []);
  const colorPaletteSubj = {
    chemistry: [{
      color: "rgb(67,40,102)"
    }, {
      background: "rgb(214,198,248)"
    }],
    economics: [{
      color: "rgb(183,115,53)"
    }, {
      background: "rgb(247,230,211"
    }],
    icons: {
      economics: "fas fa-line-chart",
      chemistry: "fas fa-flask"
    }
  };
  let currPalette = colorPaletteSubj[tool.subject][0]; //   let currBodyBG = colorPaletteSubj[props.subj][1];

  let currIcon = colorPaletteSubj["icons"][tool.subject];

  const API_downloadPNG = e => {
    e.preventDefault();
    let iframeEl = document.getElementById("iframeFit");
    iframeEl.contentWindow.postMessage("downloadPNG", iframeEl.src);
  };

  const downloadPNG = (href, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.style.opacity = "0";
    link.href = href;
    link.click();
    link.remove();
  };

  const openFull = () => {
    let frameElem = document.getElementById("isPage");

    if (frameElem.requestFullscreen) {
      frameElem.requestFullscreen();
    } else if (frameElem.webkitRequestFullscreen) {
      /* Safari */
      frameElem.webkitRequestFullscreen();
    } else if (frameElem.msRequestFullscreen) {
      /* IE11 */
      frameElem.msRequestFullscreen();
    }
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(BlurOffPage, {}), /*#__PURE__*/jsx_runtime_.jsx(Header/* default */.Z, {
      subj: tool.subject
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      id: "horizontal",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        id: "headerTool",
        style: currPalette
      }), /*#__PURE__*/jsx_runtime_.jsx("span", {
        id: "dirButton"
      }), /*#__PURE__*/jsx_runtime_.jsx("span", {
        id: "inputBar",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          id: "isPage",
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
            id: "textInputTitle",
            children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
              id: "titleInputMain",
              type: "text",
              placeholder: "Untitled Drawing"
            }), /*#__PURE__*/jsx_runtime_.jsx("div", {
              id: "funcButton",
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                id: "funcButtonContainer",
                children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
                  style: currPalette,
                  onClick: API_downloadPNG,
                  children: /*#__PURE__*/jsx_runtime_.jsx((SaveAlt_default()), {})
                }), /*#__PURE__*/jsx_runtime_.jsx("button", {
                  style: currPalette,
                  onClick: openFull,
                  children: /*#__PURE__*/jsx_runtime_.jsx((Fullscreen_default()), {})
                })]
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("div", {
              id: "toolTitleText",
              style: currPalette,
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("h1", {
                children: [tool.name, " ", /*#__PURE__*/jsx_runtime_.jsx("i", {
                  className: currIcon
                })]
              })
            })]
          }), /*#__PURE__*/jsx_runtime_.jsx("iframe", {
            className: "iframeFit",
            id: "iframeFit",
            title: "tool",
            src: tool.url
          })]
        })
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer/* default */.Z, {
      id: "footerAll"
    })]
  });
};

/* harmony default export */ var _toolname_ = (ToolPage);

/***/ }),

/***/ 799:
/***/ (function(module) {

"use strict";
module.exports = require("@fortawesome/react-fontawesome");;

/***/ }),

/***/ 5775:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/icons/Code");;

/***/ }),

/***/ 9603:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/icons/EmojiObjects");;

/***/ }),

/***/ 8443:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/icons/Feedback");;

/***/ }),

/***/ 8237:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/icons/Home");;

/***/ }),

/***/ 1358:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/icons/Menu");;

/***/ }),

/***/ 4047:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/styles");;

/***/ }),

/***/ 9137:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/system");;

/***/ }),

/***/ 2958:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/utils");;

/***/ }),

/***/ 3536:
/***/ (function(module) {

"use strict";
module.exports = require("clsx");;

/***/ }),

/***/ 4285:
/***/ (function(module) {

"use strict";
module.exports = require("firebase/analytics");;

/***/ }),

/***/ 9421:
/***/ (function(module) {

"use strict";
module.exports = require("firebase/app");;

/***/ }),

/***/ 5942:
/***/ (function(module) {

"use strict";
module.exports = require("firebase/auth");;

/***/ }),

/***/ 9714:
/***/ (function(module) {

"use strict";
module.exports = require("firebase/firestore");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 6731:
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ 4229:
/***/ (function(module) {

"use strict";
module.exports = require("prop-types");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 9226:
/***/ (function(module) {

"use strict";
module.exports = require("react-bootstrap");;

/***/ }),

/***/ 2268:
/***/ (function(module) {

"use strict";
module.exports = require("react-dom");;

/***/ }),

/***/ 3810:
/***/ (function(module) {

"use strict";
module.exports = require("react-transition-group");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [843,769,163,242], function() { return __webpack_exec__(3319); });
module.exports = __webpack_exports__;

})();