(function() {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./node_modules/next/dist/client/head-manager.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/head-manager.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.default = initHeadManager;
exports.DOMAttributeNames = void 0;
const DOMAttributeNames = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule'
};
exports.DOMAttributeNames = DOMAttributeNames;

function reactElementToDOM({
  type,
  props
}) {
  const el = document.createElement(type);

  for (const p in props) {
    if (!props.hasOwnProperty(p)) continue;
    if (p === 'children' || p === 'dangerouslySetInnerHTML') continue; // we don't render undefined props to the DOM

    if (props[p] === undefined) continue;
    const attr = DOMAttributeNames[p] || p.toLowerCase();

    if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
      ;
      el[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  const {
    children,
    dangerouslySetInnerHTML
  } = props;

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  }

  return el;
}

function updateElements(type, components) {
  const headEl = document.getElementsByTagName('head')[0];
  const headCountEl = headEl.querySelector('meta[name=next-head-count]');

  if (true) {
    if (!headCountEl) {
      console.error('Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing');
      return;
    }
  }

  const headCount = Number(headCountEl.content);
  const oldTags = [];

  for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = j.previousElementSibling) {
    if (j.tagName.toLowerCase() === type) {
      oldTags.push(j);
    }
  }

  const newTags = components.map(reactElementToDOM).filter(newTag => {
    for (let k = 0, len = oldTags.length; k < len; k++) {
      const oldTag = oldTags[k];

      if (oldTag.isEqualNode(newTag)) {
        oldTags.splice(k, 1);
        return false;
      }
    }

    return true;
  });
  oldTags.forEach(t => t.parentNode.removeChild(t));
  newTags.forEach(t => headEl.insertBefore(t, headCountEl));
  headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}

function initHeadManager() {
  let updatePromise = null;
  return {
    mountedInstances: new Set(),
    updateHead: head => {
      const promise = updatePromise = Promise.resolve().then(() => {
        if (promise !== updatePromise) return;
        updatePromise = null;
        const tags = {};
        head.forEach(h => {
          if ( // If the font tag is loaded only on client navigation
          // it won't be inlined. In this case revert to the original behavior
          h.type === 'link' && h.props['data-optimized-fonts'] && !document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
            h.props.href = h.props['data-href'];
            h.props['data-href'] = undefined;
          }

          const components = tags[h.type] || [];
          components.push(h);
          tags[h.type] = components;
        });
        const titleComponent = tags.title ? tags.title[0] : null;
        let title = '';

        if (titleComponent) {
          const {
            children
          } = titleComponent.props;
          title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        }

        if (title !== document.title) document.title = title;
        ['meta', 'base', 'link', 'style', 'script'].forEach(type => {
          updateElements(type, tags[type] || []);
        });
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/script.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/script.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.initScriptLoader = initScriptLoader;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _react = __webpack_require__(/*! react */ "react");

var _headManagerContext = __webpack_require__(/*! ../next-server/lib/head-manager-context */ "../next-server/lib/head-manager-context");

var _headManager = __webpack_require__(/*! ./head-manager */ "./node_modules/next/dist/client/head-manager.js");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = ['onLoad', 'dangerouslySetInnerHTML', 'children', 'onError', 'strategy'];

const loadScript = props => {
  const {
    src,
    id,
    onLoad = () => {},
    dangerouslySetInnerHTML,
    children = '',
    onError
  } = props;
  const cacheKey = id || src;

  if (ScriptCache.has(src)) {
    if (!LoadCache.has(cacheKey)) {
      LoadCache.add(cacheKey); // Execute onLoad since the script loading has begun

      ScriptCache.get(src).then(onLoad, onError);
    }

    return;
  }

  const el = document.createElement('script');
  const loadPromise = new Promise((resolve, reject) => {
    el.addEventListener('load', function () {
      resolve();

      if (onLoad) {
        onLoad.call(this);
      }
    });
    el.addEventListener('error', function () {
      reject();

      if (onError) {
        onError();
      }
    });
  });

  if (src) {
    ScriptCache.set(src, loadPromise);
    LoadCache.add(cacheKey);
  }

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  } else if (src) {
    el.src = src;
  }

  for (const [k, value] of Object.entries(props)) {
    if (value === undefined || ignoreProps.includes(k)) {
      continue;
    }

    const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
    el.setAttribute(attr, value);
  }

  document.body.appendChild(el);
};

function handleClientScriptLoad(props) {
  const {
    strategy = 'afterInteractive'
  } = props;

  if (strategy === 'afterInteractive') {
    loadScript(props);
  } else if (strategy === 'lazyOnload') {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback.requestIdleCallback)(() => loadScript(props));
    });
  }
}

function loadLazyScript(props) {
  if (document.readyState === 'complete') {
    (0, _requestIdleCallback.requestIdleCallback)(() => loadScript(props));
  } else {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback.requestIdleCallback)(() => loadScript(props));
    });
  }
}

function initScriptLoader(scriptLoaderItems) {
  scriptLoaderItems.forEach(handleClientScriptLoad);
}

function Script(props) {
  const {
    src = '',
    onLoad = () => {},
    strategy = 'afterInteractive',
    onError
  } = props,
        restProps = (0, _objectWithoutPropertiesLoose2.default)(props, ["src", "onLoad", "dangerouslySetInnerHTML", "strategy", "onError"]); // Context is available only during SSR

  const {
    updateScripts,
    scripts
  } = (0, _react.useContext)(_headManagerContext.HeadManagerContext);
  (0, _react.useEffect)(() => {
    if (strategy === 'afterInteractive') {
      loadScript(props);
    } else if (strategy === 'lazyOnload') {
      loadLazyScript(props);
    }
  }, [props, strategy]);

  if (strategy === 'beforeInteractive') {
    if (updateScripts) {
      scripts.beforeInteractive = (scripts.beforeInteractive || []).concat([(0, _extends2.default)({
        src,
        onLoad,
        onError
      }, restProps)]);
      updateScripts(scripts);
    }
  }

  return null;
}

var _default = Script;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/pages/_document.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/pages/_document.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

exports.__esModule = true;
exports.Html = Html;
exports.Main = Main;
exports.NextScript = exports.Head = exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../next-server/lib/constants */ "../next-server/lib/constants");

var _documentContext = __webpack_require__(/*! ../next-server/lib/document-context */ "../next-server/lib/document-context");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.DocumentContext = _utils.DocumentContext;
exports.DocumentInitialProps = _utils.DocumentInitialProps;
exports.DocumentProps = _utils.DocumentProps;

var _getPageFiles = __webpack_require__(/*! ../next-server/server/get-page-files */ "../next-server/server/get-page-files");

var _utils2 = __webpack_require__(/*! ../next-server/server/utils */ "../next-server/server/utils");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "./node_modules/next/dist/server/htmlescape.js");

var _script = _interopRequireDefault(__webpack_require__(/*! ../client/script */ "./node_modules/next/dist/client/script.js"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function getDocumentFiles(buildManifest, pathname, inAmpMode) {
  const sharedFiles = (0, _getPageFiles.getPageFiles)(buildManifest, '/_app');
  const pageFiles = inAmpMode ? [] : (0, _getPageFiles.getPageFiles)(buildManifest, pathname);
  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])]
  };
}

function getPolyfillScripts(context, props) {
  // polyfills.js has to be rendered as nomodule without async
  // It also has to be the first script to load
  const {
    assetPrefix,
    buildManifest,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return buildManifest.polyfillFiles.filter(polyfill => polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')).map(polyfill => /*#__PURE__*/_react.default.createElement("script", {
    key: polyfill,
    defer: !disableOptimizedLoading,
    nonce: props.nonce,
    crossOrigin: props.crossOrigin || undefined,
    noModule: true,
    src: `${assetPrefix}/_next/${polyfill}${devOnlyCacheBusterQueryString}`
  }));
}

function getPreNextScripts(context, props) {
  const {
    scriptLoader,
    disableOptimizedLoading
  } = context;
  return (scriptLoader.beforeInteractive || []).map(file => {
    const {
      strategy
    } = file,
          scriptProps = _objectWithoutProperties(file, ["strategy"]);

    return /*#__PURE__*/_react.default.createElement("script", Object.assign({}, scriptProps, {
      defer: !disableOptimizedLoading,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    }));
  });
}

function getDynamicChunks(context, props, files) {
  const {
    dynamicImports,
    assetPrefix,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return dynamicImports.map(file => {
    if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
    return /*#__PURE__*/_react.default.createElement("script", {
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

function getScripts(context, props, files) {
  var _buildManifest$lowPri;

  const {
    assetPrefix,
    buildManifest,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  const normalScripts = files.allFiles.filter(file => file.endsWith('.js'));
  const lowPriorityScripts = (_buildManifest$lowPri = buildManifest.lowPriorityFiles) == null ? void 0 : _buildManifest$lowPri.filter(file => file.endsWith('.js'));
  return [...normalScripts, ...lowPriorityScripts].map(file => {
    return /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}
/**
* `Document` component handles the initial `document` markup and renders only on the server side.
* Commonly used for implementing server side rendering for `css-in-js` libraries.
*/


class Document extends _react.Component {
  /**
  * `getInitialProps` hook returns the context object with the addition of `renderPage`.
  * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
  */
  static async getInitialProps(ctx) {
    const enhanceApp = App => {
      return props => /*#__PURE__*/_react.default.createElement(App, props);
    };

    const {
      html,
      head
    } = await ctx.renderPage({
      enhanceApp
    });
    const styles = [...(0, _server.default)()];
    return {
      html,
      head,
      styles
    };
  }

  static renderDocument(DocumentComponent, props) {
    return /*#__PURE__*/_react.default.createElement(_documentContext.DocumentContext.Provider, {
      value: props
    }, /*#__PURE__*/_react.default.createElement(DocumentComponent, props));
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(Html, null, /*#__PURE__*/_react.default.createElement(Head, null), /*#__PURE__*/_react.default.createElement("body", null, /*#__PURE__*/_react.default.createElement(Main, null), /*#__PURE__*/_react.default.createElement(NextScript, null)));
  }

}

exports.default = Document;

function Html(props) {
  const {
    inAmpMode,
    docComponentsRendered,
    locale
  } = (0, _react.useContext)(_documentContext.DocumentContext);
  docComponentsRendered.Html = true;
  return /*#__PURE__*/_react.default.createElement("html", Object.assign({}, props, {
    lang: props.lang || locale || undefined,
    amp: inAmpMode ? '' : undefined,
    "data-ampdevmode": inAmpMode && true ? '' : undefined
  }));
}

class Head extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getCssLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports
    } = this.context;
    const cssFiles = files.allFiles.filter(f => f.endsWith('.css'));
    const sharedFiles = new Set(files.sharedFiles); // Unmanaged files are CSS files that will be handled directly by the
    // webpack runtime (`mini-css-extract-plugin`).

    let unmangedFiles = new Set([]);
    let dynamicCssFiles = Array.from(new Set(dynamicImports.filter(file => file.endsWith('.css'))));

    if (dynamicCssFiles.length) {
      const existing = new Set(cssFiles);
      dynamicCssFiles = dynamicCssFiles.filter(f => !(existing.has(f) || sharedFiles.has(f)));
      unmangedFiles = new Set(dynamicCssFiles);
      cssFiles.push(...dynamicCssFiles);
    }

    let cssLinkElements = [];
    cssFiles.forEach(file => {
      const isSharedFile = sharedFiles.has(file);

      if (true) {
        cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
          key: `${file}-preload`,
          nonce: this.props.nonce,
          rel: "preload",
          href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
          as: "style",
          crossOrigin: this.props.crossOrigin || undefined
        }));
      }

      const isUnmanagedFile = unmangedFiles.has(file);
      cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "stylesheet",
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
        "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
      }));
    });

    if (false) {}

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix,
      devOnlyCacheBusterQueryString
    } = this.context;
    return dynamicImports.map(file => {
      if (!file.endsWith('.js')) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("link", {
        rel: "preload",
        key: file,
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        as: "script",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    }) // Filter out nulled scripts
    .filter(Boolean);
  }

  getPreloadMainLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      scriptLoader
    } = this.context;
    const preloadFiles = files.allFiles.filter(file => {
      return file.endsWith('.js');
    });
    return [...(scriptLoader.beforeInteractive || []).map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file.src,
      nonce: this.props.nonce,
      rel: "preload",
      href: file.src,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    })), ...preloadFiles.map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file,
      nonce: this.props.nonce,
      rel: "preload",
      href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    }))];
  }

  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  handleDocumentScriptLoaderItems(children) {
    const {
      scriptLoader
    } = this.context;
    const scriptLoaderItems = [];
    const filteredChildren = [];

    _react.default.Children.forEach(children, child => {
      if (child.type === _script.default) {
        if (child.props.strategy === 'beforeInteractive') {
          scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([_objectSpread({}, child.props)]);
          return;
        } else if (['lazyOnload', 'afterInteractive'].includes(child.props.strategy)) {
          scriptLoaderItems.push(child.props);
          return;
        }
      }

      filteredChildren.push(child);
    });

    this.context.__NEXT_DATA__.scriptLoader = scriptLoaderItems;
    return filteredChildren;
  }

  makeStylesheetInert(node) {
    return _react.default.Children.map(node, c => {
      if (c.type === 'link' && c.props['href'] && _constants.OPTIMIZED_FONT_PROVIDERS.some(({
        url
      }) => c.props['href'].startsWith(url))) {
        const newProps = _objectSpread({}, c.props || {});

        newProps['data-href'] = newProps['href'];
        newProps['href'] = undefined;
        return /*#__PURE__*/_react.default.cloneElement(c, newProps);
      } else if (c.props && c.props['children']) {
        c.props['children'] = this.makeStylesheetInert(c.props['children']);
      }

      return c;
    });
  }

  render() {
    var _this$props$nonce, _this$props$nonce2;

    const {
      styles,
      ampPath,
      inAmpMode,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags,
      unstable_runtimeJS,
      unstable_JsPreload,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    const disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
    this.context.docComponentsRendered.Head = true;
    let {
      head
    } = this.context;
    let cssPreloads = [];
    let otherHeadElements = [];

    if (head) {
      head.forEach(c => {
        if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
          cssPreloads.push(c);
        } else {
          c && otherHeadElements.push(c);
        }
      });
      head = cssPreloads.concat(otherHeadElements);
    }

    let children = _react.default.Children.toArray(this.props.children).filter(Boolean); // show a warning if Head contains <title> (only in development)


    if (true) {
      children = _react.default.Children.map(children, child => {
        var _child$props;

        const isReactHelmet = child == null ? void 0 : (_child$props = child.props) == null ? void 0 : _child$props['data-react-helmet'];

        if (!isReactHelmet) {
          var _child$props2;

          if ((child == null ? void 0 : child.type) === 'title') {
            console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");
          } else if ((child == null ? void 0 : child.type) === 'meta' && (child == null ? void 0 : (_child$props2 = child.props) == null ? void 0 : _child$props2.name) === 'viewport') {
            console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta");
          }
        }

        return child;
      });
      if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    if (false) {}

    children = this.handleDocumentScriptLoaderItems(children);
    let hasAmphtmlRel = false;
    let hasCanonicalRel = false; // show warning and remove conflicting amp head tags

    head = _react.default.Children.map(head || [], child => {
      if (!child) return child;
      const {
        type,
        props
      } = child;

      if (inAmpMode) {
        let badProp = '';

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"';
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true;
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
            badProp = '<script';
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`;
            });
            badProp += '/>';
          }
        }

        if (badProp) {
          console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://nextjs.org/docs/messages/conflicting-amp-tag`);
          return null;
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true;
        }
      }

      return child;
    }); // try to parse styles from fragment for backwards compat

    const curStyles = Array.isArray(styles) ? styles : [];

    if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
    styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
    Array.isArray(styles.props.children)) {
      const hasStyles = el => {
        var _el$props, _el$props$dangerously;

        return el == null ? void 0 : (_el$props = el.props) == null ? void 0 : (_el$props$dangerously = _el$props.dangerouslySetInnerHTML) == null ? void 0 : _el$props$dangerously.__html;
      }; // @ts-ignore Property 'props' does not exist on type ReactElement


      styles.props.children.forEach(child => {
        if (Array.isArray(child)) {
          child.forEach(el => hasStyles(el) && curStyles.push(el));
        } else if (hasStyles(child)) {
          curStyles.push(child);
        }
      });
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement("head", this.props, this.context.isDevelopment && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined,
      dangerouslySetInnerHTML: {
        __html: `body{display:none}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined
    }, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `body{display:block}`
      }
    }))), children,  false && /*#__PURE__*/0, head, /*#__PURE__*/_react.default.createElement("meta", {
      name: "next-head-count",
      content: _react.default.Children.count(head || []).toString()
    }), inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,minimum-scale=1,initial-scale=1"
    }), !hasCanonicalRel && /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: canonicalBase + (0, _utils2.cleanAmpPath)(dangerousAsPath)
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "preload",
      as: "script",
      href: "https://cdn.ampproject.org/v0.js"
    }), styles && /*#__PURE__*/_react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: curStyles.map(style => style.props.dangerouslySetInnerHTML.__html).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
      }
    }), /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
      }
    })), /*#__PURE__*/_react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js"
    })), !inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/_react.default.createElement("link", {
      rel: "amphtml",
      href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
    }),  true && this.getCssLinks(files),  true && /*#__PURE__*/_react.default.createElement("noscript", {
      "data-n-css": (_this$props$nonce = this.props.nonce) != null ? _this$props$nonce : ''
    }),  false && /*#__PURE__*/0, !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files),  false && 0,  false && /*#__PURE__*/0, this.context.isDevelopment &&
    /*#__PURE__*/
    // this element is used to mount development styles so the
    // ordering matches production
    // (by default, style-loader injects at the bottom of <head />)
    _react.default.createElement("noscript", {
      id: "__next_css__DO_NOT_USE__"
    }), styles || null), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {}, ...(headTags || [])));
  }

}

exports.Head = Head;
Head.contextType = _documentContext.DocumentContext;
Head.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};

function Main() {
  const {
    inAmpMode,
    html,
    docComponentsRendered
  } = (0, _react.useContext)(_documentContext.DocumentContext);
  docComponentsRendered.Main = true;
  if (inAmpMode) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _constants.AMP_RENDER_TARGET);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "__next",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}

class NextScript extends _react.Component {
  constructor(...args) {
    super(...args);
    this.context = void 0;
  }

  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  static getInlineScriptSource(documentProps) {
    const {
      __NEXT_DATA__
    } = documentProps;

    try {
      const data = JSON.stringify(__NEXT_DATA__);
      return (0, _htmlescape.htmlEscapeJsonString)(data);
    } catch (err) {
      if (err.message.indexOf('circular structure')) {
        throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://nextjs.org/docs/messages/circular-structure`);
      }

      throw err;
    }
  }

  render() {
    const {
      assetPrefix,
      inAmpMode,
      buildManifest,
      unstable_runtimeJS,
      docComponentsRendered,
      devOnlyCacheBusterQueryString,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    docComponentsRendered.NextScript = true;

    if (inAmpMode) {
      if (false) {}

      const ampDevFiles = [...buildManifest.devFiles, ...buildManifest.polyfillFiles, ...buildManifest.ampDevFiles];
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context)
        },
        "data-ampdevmode": true
      }), ampDevFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${file}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-ampdevmode": true
      })));
    }

    if (true) {
      if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    })) : null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
      id: "__NEXT_DATA__",
      type: "application/json",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context)
      }
    }), disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files));
  }

}

exports.NextScript = NextScript;
NextScript.contextType = _documentContext.DocumentContext;
NextScript.propTypes = {
  nonce: _propTypes.default.string,
  crossOrigin: _propTypes.default.string
};
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath || `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
}

/***/ }),

/***/ "./src/pages/_document.js":
/*!********************************!*\
  !*** ./src/pages/_document.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ "./node_modules/next/document.js");
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Users\\Shao En\\Desktop\\Top-Quark\\src\\pages\\_document.js";


class MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {
  render() {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
          charSet: "utf-8"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 8,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
          rel: "icon",
          href: "./FAVICON-QUARK.png"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 9,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
          name: "theme-color",
          content: "#000000"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 10,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
          name: "google",
          content: "notranslate"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 11,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
          name: "author",
          content: "Joen Tan & Lim Shao En"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 12,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
          name: "description",
          content: "Create, edit & export diagrams, graphs for Economics & Chemistry homework. "
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 13,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
          rel: "apple-touch-icon",
          href: "./FAVICON-QUARK.png"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 17,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
          rel: "manifest",
          href: "./manifest.json"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,900;1,900&display=swap",
          rel: "stylesheet"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
          href: "https://fonts.googleapis.com/css2?family=Nunito&display=swap",
          rel: "stylesheet"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 7,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("body", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }, this);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MyDocument);

/***/ }),

/***/ "./node_modules/next/dist/server/htmlescape.js":
/*!*****************************************************!*\
  !*** ./node_modules/next/dist/server/htmlescape.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
exports.__esModule=true;exports.htmlEscapeJsonString=htmlEscapeJsonString;// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
const ESCAPE_LOOKUP={'&':'\\u0026','>':'\\u003e','<':'\\u003c','\u2028':'\\u2028','\u2029':'\\u2029'};const ESCAPE_REGEX=/[&><\u2028\u2029]/g;function htmlEscapeJsonString(str){return str.replace(ESCAPE_REGEX,match=>ESCAPE_LOOKUP[match]);}
//# sourceMappingURL=htmlescape.js.map

/***/ }),

/***/ "./node_modules/next/document.js":
/*!***************************************!*\
  !*** ./node_modules/next/document.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_document */ "./node_modules/next/dist/pages/_document.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js":
/*!**************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/extends.js ***!
  \**************************************************************************/
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***********************************************************************************************/
/***/ (function(module) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "../next-server/lib/constants":
/*!*********************************************************!*\
  !*** external "next/dist/next-server/lib/constants.js" ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/constants.js");;

/***/ }),

/***/ "../next-server/lib/document-context":
/*!****************************************************************!*\
  !*** external "next/dist/next-server/lib/document-context.js" ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/document-context.js");;

/***/ }),

/***/ "../next-server/lib/head-manager-context":
/*!********************************************************************!*\
  !*** external "next/dist/next-server/lib/head-manager-context.js" ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head-manager-context.js");;

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ "../next-server/server/get-page-files":
/*!*****************************************************************!*\
  !*** external "next/dist/next-server/server/get-page-files.js" ***!
  \*****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/get-page-files.js");;

/***/ }),

/***/ "../next-server/server/utils":
/*!********************************************************!*\
  !*** external "next/dist/next-server/server/utils.js" ***!
  \********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/utils.js");;

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = require("prop-types");;

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

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-jsx/server");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./src/pages/_document.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9oZWFkLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvcmVxdWVzdC1pZGxlLWNhbGxiYWNrLmpzIiwid2VicGFjazovL3RvcC1xdWFyay8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3NjcmlwdC5qcyIsIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9zcmMvcGFnZXMvX2RvY3VtZW50LmpzIiwid2VicGFjazovL3RvcC1xdWFyay8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3Qvc2VydmVyL2h0bWxlc2NhcGUuanMiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrLy4vbm9kZV9tb2R1bGVzL25leHQvZG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly90b3AtcXVhcmsvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly90b3AtcXVhcmsvZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2NvbnN0YW50cy5qc1wiIiwid2VicGFjazovL3RvcC1xdWFyay9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvZG9jdW1lbnQtY29udGV4dC5qc1wiIiwid2VicGFjazovL3RvcC1xdWFyay9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHQuanNcIiIsIndlYnBhY2s6Ly90b3AtcXVhcmsvZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9nZXQtcGFnZS1maWxlcy5qc1wiIiwid2VicGFjazovL3RvcC1xdWFyay9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly90b3AtcXVhcmsvZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCIiLCJ3ZWJwYWNrOi8vdG9wLXF1YXJrL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly90b3AtcXVhcmsvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly90b3AtcXVhcmsvZXh0ZXJuYWwgXCJzdHlsZWQtanN4L3NlcnZlclwiIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJpbml0SGVhZE1hbmFnZXIiLCJET01BdHRyaWJ1dGVOYW1lcyIsImFjY2VwdENoYXJzZXQiLCJjbGFzc05hbWUiLCJodG1sRm9yIiwiaHR0cEVxdWl2Iiwibm9Nb2R1bGUiLCJyZWFjdEVsZW1lbnRUb0RPTSIsInR5cGUiLCJwcm9wcyIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicCIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiYXR0ciIsInRvTG93ZXJDYXNlIiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsImlubmVySFRNTCIsIl9faHRtbCIsInRleHRDb250ZW50IiwiQXJyYXkiLCJpc0FycmF5Iiwiam9pbiIsInVwZGF0ZUVsZW1lbnRzIiwiY29tcG9uZW50cyIsImhlYWRFbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaGVhZENvdW50RWwiLCJxdWVyeVNlbGVjdG9yIiwiY29uc29sZSIsImVycm9yIiwiaGVhZENvdW50IiwiTnVtYmVyIiwiY29udGVudCIsIm9sZFRhZ3MiLCJpIiwiaiIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJ0YWdOYW1lIiwicHVzaCIsIm5ld1RhZ3MiLCJtYXAiLCJmaWx0ZXIiLCJuZXdUYWciLCJrIiwibGVuIiwibGVuZ3RoIiwib2xkVGFnIiwiaXNFcXVhbE5vZGUiLCJzcGxpY2UiLCJmb3JFYWNoIiwidCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImluc2VydEJlZm9yZSIsInRvU3RyaW5nIiwidXBkYXRlUHJvbWlzZSIsIm1vdW50ZWRJbnN0YW5jZXMiLCJTZXQiLCJ1cGRhdGVIZWFkIiwiaGVhZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJ0YWdzIiwiaCIsImhyZWYiLCJ0aXRsZUNvbXBvbmVudCIsInRpdGxlIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInNlbGYiLCJjYiIsInN0YXJ0IiwiRGF0ZSIsIm5vdyIsInNldFRpbWVvdXQiLCJkaWRUaW1lb3V0IiwidGltZVJlbWFpbmluZyIsIk1hdGgiLCJtYXgiLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJpZCIsImNsZWFyVGltZW91dCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiaW5pdFNjcmlwdExvYWRlciIsIl9leHRlbmRzMiIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMiIsIl9yZWFjdCIsIl9oZWFkTWFuYWdlckNvbnRleHQiLCJfaGVhZE1hbmFnZXIiLCJfcmVxdWVzdElkbGVDYWxsYmFjayIsIlNjcmlwdENhY2hlIiwiTWFwIiwiTG9hZENhY2hlIiwiaWdub3JlUHJvcHMiLCJsb2FkU2NyaXB0Iiwic3JjIiwib25Mb2FkIiwib25FcnJvciIsImNhY2hlS2V5IiwiaGFzIiwiYWRkIiwiZ2V0IiwibG9hZFByb21pc2UiLCJyZWplY3QiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FsbCIsInNldCIsInZhbHVlIiwiT2JqZWN0IiwiZW50cmllcyIsImluY2x1ZGVzIiwiYm9keSIsImFwcGVuZENoaWxkIiwiaGFuZGxlQ2xpZW50U2NyaXB0TG9hZCIsInN0cmF0ZWd5Iiwid2luZG93IiwibG9hZExhenlTY3JpcHQiLCJyZWFkeVN0YXRlIiwic2NyaXB0TG9hZGVySXRlbXMiLCJTY3JpcHQiLCJyZXN0UHJvcHMiLCJkZWZhdWx0IiwidXBkYXRlU2NyaXB0cyIsInNjcmlwdHMiLCJ1c2VDb250ZXh0IiwiSGVhZE1hbmFnZXJDb250ZXh0IiwidXNlRWZmZWN0IiwiYmVmb3JlSW50ZXJhY3RpdmUiLCJjb25jYXQiLCJfZGVmYXVsdCIsIkh0bWwiLCJNYWluIiwiX3Byb3BUeXBlcyIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwiX3NlcnZlciIsIl9jb25zdGFudHMiLCJfZG9jdW1lbnRDb250ZXh0IiwiX3V0aWxzIiwiRG9jdW1lbnRDb250ZXh0IiwiRG9jdW1lbnRJbml0aWFsUHJvcHMiLCJEb2N1bWVudFByb3BzIiwiX2dldFBhZ2VGaWxlcyIsIl91dGlsczIiLCJfaHRtbGVzY2FwZSIsIl9zY3JpcHQiLCJfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUiLCJXZWFrTWFwIiwiY2FjaGUiLCJvYmoiLCJfX2VzTW9kdWxlIiwibmV3T2JqIiwiaGFzUHJvcGVydHlEZXNjcmlwdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJrZXkiLCJwcm90b3R5cGUiLCJkZXNjIiwiZ2V0RG9jdW1lbnRGaWxlcyIsImJ1aWxkTWFuaWZlc3QiLCJwYXRobmFtZSIsImluQW1wTW9kZSIsInNoYXJlZEZpbGVzIiwiZ2V0UGFnZUZpbGVzIiwicGFnZUZpbGVzIiwiYWxsRmlsZXMiLCJnZXRQb2x5ZmlsbFNjcmlwdHMiLCJjb250ZXh0IiwiYXNzZXRQcmVmaXgiLCJkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyIsImRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nIiwicG9seWZpbGxGaWxlcyIsInBvbHlmaWxsIiwiZW5kc1dpdGgiLCJkZWZlciIsIm5vbmNlIiwiY3Jvc3NPcmlnaW4iLCJwcm9jZXNzIiwiZ2V0UHJlTmV4dFNjcmlwdHMiLCJzY3JpcHRMb2FkZXIiLCJmaWxlIiwic2NyaXB0UHJvcHMiLCJhc3NpZ24iLCJfX05FWFRfQ1JPU1NfT1JJR0lOIiwiZ2V0RHluYW1pY0NodW5rcyIsImZpbGVzIiwiZHluYW1pY0ltcG9ydHMiLCJpc0RldmVsb3BtZW50IiwiYXN5bmMiLCJlbmNvZGVVUkkiLCJnZXRTY3JpcHRzIiwiX2J1aWxkTWFuaWZlc3QkbG93UHJpIiwibm9ybWFsU2NyaXB0cyIsImxvd1ByaW9yaXR5U2NyaXB0cyIsImxvd1ByaW9yaXR5RmlsZXMiLCJEb2N1bWVudCIsIkNvbXBvbmVudCIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsImVuaGFuY2VBcHAiLCJBcHAiLCJodG1sIiwicmVuZGVyUGFnZSIsInN0eWxlcyIsInJlbmRlckRvY3VtZW50IiwiRG9jdW1lbnRDb21wb25lbnQiLCJQcm92aWRlciIsInJlbmRlciIsIkhlYWQiLCJOZXh0U2NyaXB0IiwiZG9jQ29tcG9uZW50c1JlbmRlcmVkIiwibG9jYWxlIiwibGFuZyIsImFtcCIsImNvbnN0cnVjdG9yIiwiYXJncyIsImdldENzc0xpbmtzIiwiY3NzRmlsZXMiLCJmIiwidW5tYW5nZWRGaWxlcyIsImR5bmFtaWNDc3NGaWxlcyIsImZyb20iLCJleGlzdGluZyIsImNzc0xpbmtFbGVtZW50cyIsImlzU2hhcmVkRmlsZSIsInJlbCIsImFzIiwiaXNVbm1hbmFnZWRGaWxlIiwiZ2V0UHJlbG9hZER5bmFtaWNDaHVua3MiLCJCb29sZWFuIiwiZ2V0UHJlbG9hZE1haW5MaW5rcyIsInByZWxvYWRGaWxlcyIsImhhbmRsZURvY3VtZW50U2NyaXB0TG9hZGVySXRlbXMiLCJmaWx0ZXJlZENoaWxkcmVuIiwiQ2hpbGRyZW4iLCJjaGlsZCIsIl9fTkVYVF9EQVRBX18iLCJtYWtlU3R5bGVzaGVldEluZXJ0Iiwibm9kZSIsImMiLCJPUFRJTUlaRURfRk9OVF9QUk9WSURFUlMiLCJzb21lIiwidXJsIiwic3RhcnRzV2l0aCIsIm5ld1Byb3BzIiwiY2xvbmVFbGVtZW50IiwiX3RoaXMkcHJvcHMkbm9uY2UiLCJfdGhpcyRwcm9wcyRub25jZTIiLCJhbXBQYXRoIiwiaHlicmlkQW1wIiwiY2Fub25pY2FsQmFzZSIsImRhbmdlcm91c0FzUGF0aCIsImhlYWRUYWdzIiwidW5zdGFibGVfcnVudGltZUpTIiwidW5zdGFibGVfSnNQcmVsb2FkIiwiZGlzYWJsZVJ1bnRpbWVKUyIsImRpc2FibGVKc1ByZWxvYWQiLCJjc3NQcmVsb2FkcyIsIm90aGVySGVhZEVsZW1lbnRzIiwidG9BcnJheSIsIl9jaGlsZCRwcm9wcyIsImlzUmVhY3RIZWxtZXQiLCJfY2hpbGQkcHJvcHMyIiwid2FybiIsIm5hbWUiLCJoYXNBbXBodG1sUmVsIiwiaGFzQ2Fub25pY2FsUmVsIiwiYmFkUHJvcCIsImluZGV4T2YiLCJrZXlzIiwicHJvcCIsInBhZ2UiLCJjdXJTdHlsZXMiLCJoYXNTdHlsZXMiLCJfZWwkcHJvcHMiLCJfZWwkcHJvcHMkZGFuZ2Vyb3VzbHkiLCJGcmFnbWVudCIsImNvdW50IiwiY2xlYW5BbXBQYXRoIiwic3R5bGUiLCJyZXBsYWNlIiwiZ2V0QW1wUGF0aCIsImNvbnRleHRUeXBlIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiQU1QX1JFTkRFUl9UQVJHRVQiLCJnZXRJbmxpbmVTY3JpcHRTb3VyY2UiLCJkb2N1bWVudFByb3BzIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJodG1sRXNjYXBlSnNvblN0cmluZyIsImVyciIsIm1lc3NhZ2UiLCJFcnJvciIsImFtcERldkZpbGVzIiwiZGV2RmlsZXMiLCJzYWZhcmlOb21vZHVsZUZpeCIsImFzUGF0aCIsIk15RG9jdW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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OztBQ0FsRDtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0M7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0M7Ozs7Ozs7Ozs7O0FDZkEsb0U7Ozs7Ozs7Ozs7O0FDQUEsMkU7Ozs7Ozs7Ozs7O0FDQUEsK0U7Ozs7Ozs7Ozs7O0FDQUEsZ0U7Ozs7Ozs7Ozs7O0FDQUEsNEU7Ozs7Ozs7Ozs7O0FDQUEsbUU7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsK0MiLCJmaWxlIjoicGFnZXMvX2RvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5kZWZhdWx0PWluaXRIZWFkTWFuYWdlcjtleHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzPXZvaWQgMDtjb25zdCBET01BdHRyaWJ1dGVOYW1lcz17YWNjZXB0Q2hhcnNldDonYWNjZXB0LWNoYXJzZXQnLGNsYXNzTmFtZTonY2xhc3MnLGh0bWxGb3I6J2ZvcicsaHR0cEVxdWl2OidodHRwLWVxdWl2Jyxub01vZHVsZTonbm9Nb2R1bGUnfTtleHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzPURPTUF0dHJpYnV0ZU5hbWVzO2Z1bmN0aW9uIHJlYWN0RWxlbWVudFRvRE9NKHt0eXBlLHByb3BzfSl7Y29uc3QgZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtmb3IoY29uc3QgcCBpbiBwcm9wcyl7aWYoIXByb3BzLmhhc093blByb3BlcnR5KHApKWNvbnRpbnVlO2lmKHA9PT0nY2hpbGRyZW4nfHxwPT09J2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyljb250aW51ZTsvLyB3ZSBkb24ndCByZW5kZXIgdW5kZWZpbmVkIHByb3BzIHRvIHRoZSBET01cbmlmKHByb3BzW3BdPT09dW5kZWZpbmVkKWNvbnRpbnVlO2NvbnN0IGF0dHI9RE9NQXR0cmlidXRlTmFtZXNbcF18fHAudG9Mb3dlckNhc2UoKTtpZih0eXBlPT09J3NjcmlwdCcmJihhdHRyPT09J2FzeW5jJ3x8YXR0cj09PSdkZWZlcid8fGF0dHI9PT0nbm9Nb2R1bGUnKSl7O2VsW2F0dHJdPSEhcHJvcHNbcF07fWVsc2V7ZWwuc2V0QXR0cmlidXRlKGF0dHIscHJvcHNbcF0pO319Y29uc3R7Y2hpbGRyZW4sZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUx9PXByb3BzO2lmKGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKXtlbC5pbm5lckhUTUw9ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sfHwnJzt9ZWxzZSBpZihjaGlsZHJlbil7ZWwudGV4dENvbnRlbnQ9dHlwZW9mIGNoaWxkcmVuPT09J3N0cmluZyc/Y2hpbGRyZW46QXJyYXkuaXNBcnJheShjaGlsZHJlbik/Y2hpbGRyZW4uam9pbignJyk6Jyc7fXJldHVybiBlbDt9ZnVuY3Rpb24gdXBkYXRlRWxlbWVudHModHlwZSxjb21wb25lbnRzKXtjb25zdCBoZWFkRWw9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtjb25zdCBoZWFkQ291bnRFbD1oZWFkRWwucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPW5leHQtaGVhZC1jb3VudF0nKTtpZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7aWYoIWhlYWRDb3VudEVsKXtjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBuZXh0LWhlYWQtY291bnQgaXMgbWlzc2luZy4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbmV4dC1oZWFkLWNvdW50LW1pc3NpbmcnKTtyZXR1cm47fX1jb25zdCBoZWFkQ291bnQ9TnVtYmVyKGhlYWRDb3VudEVsLmNvbnRlbnQpO2NvbnN0IG9sZFRhZ3M9W107Zm9yKGxldCBpPTAsaj1oZWFkQ291bnRFbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO2k8aGVhZENvdW50O2krKyxqPWoucHJldmlvdXNFbGVtZW50U2libGluZyl7aWYoai50YWdOYW1lLnRvTG93ZXJDYXNlKCk9PT10eXBlKXtvbGRUYWdzLnB1c2goaik7fX1jb25zdCBuZXdUYWdzPWNvbXBvbmVudHMubWFwKHJlYWN0RWxlbWVudFRvRE9NKS5maWx0ZXIobmV3VGFnPT57Zm9yKGxldCBrPTAsbGVuPW9sZFRhZ3MubGVuZ3RoO2s8bGVuO2srKyl7Y29uc3Qgb2xkVGFnPW9sZFRhZ3Nba107aWYob2xkVGFnLmlzRXF1YWxOb2RlKG5ld1RhZykpe29sZFRhZ3Muc3BsaWNlKGssMSk7cmV0dXJuIGZhbHNlO319cmV0dXJuIHRydWU7fSk7b2xkVGFncy5mb3JFYWNoKHQ9PnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KSk7bmV3VGFncy5mb3JFYWNoKHQ9PmhlYWRFbC5pbnNlcnRCZWZvcmUodCxoZWFkQ291bnRFbCkpO2hlYWRDb3VudEVsLmNvbnRlbnQ9KGhlYWRDb3VudC1vbGRUYWdzLmxlbmd0aCtuZXdUYWdzLmxlbmd0aCkudG9TdHJpbmcoKTt9ZnVuY3Rpb24gaW5pdEhlYWRNYW5hZ2VyKCl7bGV0IHVwZGF0ZVByb21pc2U9bnVsbDtyZXR1cm57bW91bnRlZEluc3RhbmNlczpuZXcgU2V0KCksdXBkYXRlSGVhZDpoZWFkPT57Y29uc3QgcHJvbWlzZT11cGRhdGVQcm9taXNlPVByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PntpZihwcm9taXNlIT09dXBkYXRlUHJvbWlzZSlyZXR1cm47dXBkYXRlUHJvbWlzZT1udWxsO2NvbnN0IHRhZ3M9e307aGVhZC5mb3JFYWNoKGg9PntpZigvLyBJZiB0aGUgZm9udCB0YWcgaXMgbG9hZGVkIG9ubHkgb24gY2xpZW50IG5hdmlnYXRpb25cbi8vIGl0IHdvbid0IGJlIGlubGluZWQuIEluIHRoaXMgY2FzZSByZXZlcnQgdG8gdGhlIG9yaWdpbmFsIGJlaGF2aW9yXG5oLnR5cGU9PT0nbGluaycmJmgucHJvcHNbJ2RhdGEtb3B0aW1pemVkLWZvbnRzJ10mJiFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzdHlsZVtkYXRhLWhyZWY9XCIke2gucHJvcHNbJ2RhdGEtaHJlZiddfVwiXWApKXtoLnByb3BzLmhyZWY9aC5wcm9wc1snZGF0YS1ocmVmJ107aC5wcm9wc1snZGF0YS1ocmVmJ109dW5kZWZpbmVkO31jb25zdCBjb21wb25lbnRzPXRhZ3NbaC50eXBlXXx8W107Y29tcG9uZW50cy5wdXNoKGgpO3RhZ3NbaC50eXBlXT1jb21wb25lbnRzO30pO2NvbnN0IHRpdGxlQ29tcG9uZW50PXRhZ3MudGl0bGU/dGFncy50aXRsZVswXTpudWxsO2xldCB0aXRsZT0nJztpZih0aXRsZUNvbXBvbmVudCl7Y29uc3R7Y2hpbGRyZW59PXRpdGxlQ29tcG9uZW50LnByb3BzO3RpdGxlPXR5cGVvZiBjaGlsZHJlbj09PSdzdHJpbmcnP2NoaWxkcmVuOkFycmF5LmlzQXJyYXkoY2hpbGRyZW4pP2NoaWxkcmVuLmpvaW4oJycpOicnO31pZih0aXRsZSE9PWRvY3VtZW50LnRpdGxlKWRvY3VtZW50LnRpdGxlPXRpdGxlO1snbWV0YScsJ2Jhc2UnLCdsaW5rJywnc3R5bGUnLCdzY3JpcHQnXS5mb3JFYWNoKHR5cGU9Pnt1cGRhdGVFbGVtZW50cyh0eXBlLHRhZ3NbdHlwZV18fFtdKTt9KTt9KTt9fTt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWFkLW1hbmFnZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2s9ZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrPXZvaWQgMDtjb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrPXR5cGVvZiBzZWxmIT09J3VuZGVmaW5lZCcmJnNlbGYucmVxdWVzdElkbGVDYWxsYmFja3x8ZnVuY3Rpb24oY2Ipe2xldCBzdGFydD1EYXRlLm5vdygpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Y2Ioe2RpZFRpbWVvdXQ6ZmFsc2UsdGltZVJlbWFpbmluZzpmdW5jdGlvbigpe3JldHVybiBNYXRoLm1heCgwLDUwLShEYXRlLm5vdygpLXN0YXJ0KSk7fX0pO30sMSk7fTtleHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2s9cmVxdWVzdElkbGVDYWxsYmFjaztjb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2s9dHlwZW9mIHNlbGYhPT0ndW5kZWZpbmVkJyYmc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2t8fGZ1bmN0aW9uKGlkKXtyZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTt9O2V4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrPWNhbmNlbElkbGVDYWxsYmFjaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcXVlc3QtaWRsZS1jYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjt2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdD1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5pbml0U2NyaXB0TG9hZGVyPWluaXRTY3JpcHRMb2FkZXI7ZXhwb3J0cy5kZWZhdWx0PXZvaWQgMDt2YXIgX2V4dGVuZHMyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiKSk7dmFyIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIikpO3ZhciBfcmVhY3Q9cmVxdWlyZShcInJlYWN0XCIpO3ZhciBfaGVhZE1hbmFnZXJDb250ZXh0PXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHRcIik7dmFyIF9oZWFkTWFuYWdlcj1yZXF1aXJlKFwiLi9oZWFkLW1hbmFnZXJcIik7dmFyIF9yZXF1ZXN0SWRsZUNhbGxiYWNrPXJlcXVpcmUoXCIuL3JlcXVlc3QtaWRsZS1jYWxsYmFja1wiKTtjb25zdCBTY3JpcHRDYWNoZT1uZXcgTWFwKCk7Y29uc3QgTG9hZENhY2hlPW5ldyBTZXQoKTtjb25zdCBpZ25vcmVQcm9wcz1bJ29uTG9hZCcsJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJywnY2hpbGRyZW4nLCdvbkVycm9yJywnc3RyYXRlZ3knXTtjb25zdCBsb2FkU2NyaXB0PXByb3BzPT57Y29uc3R7c3JjLGlkLG9uTG9hZD0oKT0+e30sZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsY2hpbGRyZW49Jycsb25FcnJvcn09cHJvcHM7Y29uc3QgY2FjaGVLZXk9aWR8fHNyYztpZihTY3JpcHRDYWNoZS5oYXMoc3JjKSl7aWYoIUxvYWRDYWNoZS5oYXMoY2FjaGVLZXkpKXtMb2FkQ2FjaGUuYWRkKGNhY2hlS2V5KTsvLyBFeGVjdXRlIG9uTG9hZCBzaW5jZSB0aGUgc2NyaXB0IGxvYWRpbmcgaGFzIGJlZ3VuXG5TY3JpcHRDYWNoZS5nZXQoc3JjKS50aGVuKG9uTG9hZCxvbkVycm9yKTt9cmV0dXJuO31jb25zdCBlbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtjb25zdCBsb2FkUHJvbWlzZT1uZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57ZWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsZnVuY3Rpb24oKXtyZXNvbHZlKCk7aWYob25Mb2FkKXtvbkxvYWQuY2FsbCh0aGlzKTt9fSk7ZWwuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLGZ1bmN0aW9uKCl7cmVqZWN0KCk7aWYob25FcnJvcil7b25FcnJvcigpO319KTt9KTtpZihzcmMpe1NjcmlwdENhY2hlLnNldChzcmMsbG9hZFByb21pc2UpO0xvYWRDYWNoZS5hZGQoY2FjaGVLZXkpO31pZihkYW5nZXJvdXNseVNldElubmVySFRNTCl7ZWwuaW5uZXJIVE1MPWRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLl9faHRtbHx8Jyc7fWVsc2UgaWYoY2hpbGRyZW4pe2VsLnRleHRDb250ZW50PXR5cGVvZiBjaGlsZHJlbj09PSdzdHJpbmcnP2NoaWxkcmVuOkFycmF5LmlzQXJyYXkoY2hpbGRyZW4pP2NoaWxkcmVuLmpvaW4oJycpOicnO31lbHNlIGlmKHNyYyl7ZWwuc3JjPXNyYzt9Zm9yKGNvbnN0W2ssdmFsdWVdb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKXtpZih2YWx1ZT09PXVuZGVmaW5lZHx8aWdub3JlUHJvcHMuaW5jbHVkZXMoaykpe2NvbnRpbnVlO31jb25zdCBhdHRyPV9oZWFkTWFuYWdlci5ET01BdHRyaWJ1dGVOYW1lc1trXXx8ay50b0xvd2VyQ2FzZSgpO2VsLnNldEF0dHJpYnV0ZShhdHRyLHZhbHVlKTt9ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7fTtmdW5jdGlvbiBoYW5kbGVDbGllbnRTY3JpcHRMb2FkKHByb3BzKXtjb25zdHtzdHJhdGVneT0nYWZ0ZXJJbnRlcmFjdGl2ZSd9PXByb3BzO2lmKHN0cmF0ZWd5PT09J2FmdGVySW50ZXJhY3RpdmUnKXtsb2FkU2NyaXB0KHByb3BzKTt9ZWxzZSBpZihzdHJhdGVneT09PSdsYXp5T25sb2FkJyl7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCgpPT57KDAsX3JlcXVlc3RJZGxlQ2FsbGJhY2sucmVxdWVzdElkbGVDYWxsYmFjaykoKCk9PmxvYWRTY3JpcHQocHJvcHMpKTt9KTt9fWZ1bmN0aW9uIGxvYWRMYXp5U2NyaXB0KHByb3BzKXtpZihkb2N1bWVudC5yZWFkeVN0YXRlPT09J2NvbXBsZXRlJyl7KDAsX3JlcXVlc3RJZGxlQ2FsbGJhY2sucmVxdWVzdElkbGVDYWxsYmFjaykoKCk9PmxvYWRTY3JpcHQocHJvcHMpKTt9ZWxzZXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsKCk9PnsoMCxfcmVxdWVzdElkbGVDYWxsYmFjay5yZXF1ZXN0SWRsZUNhbGxiYWNrKSgoKT0+bG9hZFNjcmlwdChwcm9wcykpO30pO319ZnVuY3Rpb24gaW5pdFNjcmlwdExvYWRlcihzY3JpcHRMb2FkZXJJdGVtcyl7c2NyaXB0TG9hZGVySXRlbXMuZm9yRWFjaChoYW5kbGVDbGllbnRTY3JpcHRMb2FkKTt9ZnVuY3Rpb24gU2NyaXB0KHByb3BzKXtjb25zdHtzcmM9Jycsb25Mb2FkPSgpPT57fSxzdHJhdGVneT0nYWZ0ZXJJbnRlcmFjdGl2ZScsb25FcnJvcn09cHJvcHMscmVzdFByb3BzPSgwLF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMi5kZWZhdWx0KShwcm9wcyxbXCJzcmNcIixcIm9uTG9hZFwiLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIixcInN0cmF0ZWd5XCIsXCJvbkVycm9yXCJdKTsvLyBDb250ZXh0IGlzIGF2YWlsYWJsZSBvbmx5IGR1cmluZyBTU1JcbmNvbnN0e3VwZGF0ZVNjcmlwdHMsc2NyaXB0c309KDAsX3JlYWN0LnVzZUNvbnRleHQpKF9oZWFkTWFuYWdlckNvbnRleHQuSGVhZE1hbmFnZXJDb250ZXh0KTsoMCxfcmVhY3QudXNlRWZmZWN0KSgoKT0+e2lmKHN0cmF0ZWd5PT09J2FmdGVySW50ZXJhY3RpdmUnKXtsb2FkU2NyaXB0KHByb3BzKTt9ZWxzZSBpZihzdHJhdGVneT09PSdsYXp5T25sb2FkJyl7bG9hZExhenlTY3JpcHQocHJvcHMpO319LFtwcm9wcyxzdHJhdGVneV0pO2lmKHN0cmF0ZWd5PT09J2JlZm9yZUludGVyYWN0aXZlJyl7aWYodXBkYXRlU2NyaXB0cyl7c2NyaXB0cy5iZWZvcmVJbnRlcmFjdGl2ZT0oc2NyaXB0cy5iZWZvcmVJbnRlcmFjdGl2ZXx8W10pLmNvbmNhdChbKDAsX2V4dGVuZHMyLmRlZmF1bHQpKHtzcmMsb25Mb2FkLG9uRXJyb3J9LHJlc3RQcm9wcyldKTt1cGRhdGVTY3JpcHRzKHNjcmlwdHMpO319cmV0dXJuIG51bGw7fXZhciBfZGVmYXVsdD1TY3JpcHQ7ZXhwb3J0cy5kZWZhdWx0PV9kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NyaXB0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuSHRtbD1IdG1sO2V4cG9ydHMuTWFpbj1NYWluO2V4cG9ydHMuTmV4dFNjcmlwdD1leHBvcnRzLkhlYWQ9ZXhwb3J0cy5kZWZhdWx0PXZvaWQgMDt2YXIgX3Byb3BUeXBlcz1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTt2YXIgX3JlYWN0PV9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7dmFyIF9zZXJ2ZXI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWpzeC9zZXJ2ZXJcIikpO3ZhciBfY29uc3RhbnRzPXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvY29uc3RhbnRzXCIpO3ZhciBfZG9jdW1lbnRDb250ZXh0PXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvZG9jdW1lbnQtY29udGV4dFwiKTt2YXIgX3V0aWxzPXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvdXRpbHNcIik7ZXhwb3J0cy5Eb2N1bWVudENvbnRleHQ9X3V0aWxzLkRvY3VtZW50Q29udGV4dDtleHBvcnRzLkRvY3VtZW50SW5pdGlhbFByb3BzPV91dGlscy5Eb2N1bWVudEluaXRpYWxQcm9wcztleHBvcnRzLkRvY3VtZW50UHJvcHM9X3V0aWxzLkRvY3VtZW50UHJvcHM7dmFyIF9nZXRQYWdlRmlsZXM9cmVxdWlyZShcIi4uL25leHQtc2VydmVyL3NlcnZlci9nZXQtcGFnZS1maWxlc1wiKTt2YXIgX3V0aWxzMj1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvc2VydmVyL3V0aWxzXCIpO3ZhciBfaHRtbGVzY2FwZT1yZXF1aXJlKFwiLi4vc2VydmVyL2h0bWxlc2NhcGVcIik7dmFyIF9zY3JpcHQ9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vY2xpZW50L3NjcmlwdFwiKSk7ZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCl7aWYodHlwZW9mIFdlYWtNYXAhPT1cImZ1bmN0aW9uXCIpcmV0dXJuIG51bGw7dmFyIGNhY2hlPW5ldyBXZWFrTWFwKCk7X2dldFJlcXVpcmVXaWxkY2FyZENhY2hlPWZ1bmN0aW9uKCl7cmV0dXJuIGNhY2hlO307cmV0dXJuIGNhY2hlO31mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmope2lmKG9iaiYmb2JqLl9fZXNNb2R1bGUpe3JldHVybiBvYmo7fWlmKG9iaj09PW51bGx8fHR5cGVvZiBvYmohPT1cIm9iamVjdFwiJiZ0eXBlb2Ygb2JqIT09XCJmdW5jdGlvblwiKXtyZXR1cm57ZGVmYXVsdDpvYmp9O312YXIgY2FjaGU9X2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCk7aWYoY2FjaGUmJmNhY2hlLmhhcyhvYmopKXtyZXR1cm4gY2FjaGUuZ2V0KG9iaik7fXZhciBuZXdPYmo9e307dmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvcj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBrZXkgaW4gb2JqKXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLGtleSkpe3ZhciBkZXNjPWhhc1Byb3BlcnR5RGVzY3JpcHRvcj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaixrZXkpOm51bGw7aWYoZGVzYyYmKGRlc2MuZ2V0fHxkZXNjLnNldCkpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosa2V5LGRlc2MpO31lbHNle25ld09ialtrZXldPW9ialtrZXldO319fW5ld09iai5kZWZhdWx0PW9iajtpZihjYWNoZSl7Y2FjaGUuc2V0KG9iaixuZXdPYmopO31yZXR1cm4gbmV3T2JqO31mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian07fWZ1bmN0aW9uIGdldERvY3VtZW50RmlsZXMoYnVpbGRNYW5pZmVzdCxwYXRobmFtZSxpbkFtcE1vZGUpe2NvbnN0IHNoYXJlZEZpbGVzPSgwLF9nZXRQYWdlRmlsZXMuZ2V0UGFnZUZpbGVzKShidWlsZE1hbmlmZXN0LCcvX2FwcCcpO2NvbnN0IHBhZ2VGaWxlcz1pbkFtcE1vZGU/W106KDAsX2dldFBhZ2VGaWxlcy5nZXRQYWdlRmlsZXMpKGJ1aWxkTWFuaWZlc3QscGF0aG5hbWUpO3JldHVybntzaGFyZWRGaWxlcyxwYWdlRmlsZXMsYWxsRmlsZXM6Wy4uLm5ldyBTZXQoWy4uLnNoYXJlZEZpbGVzLC4uLnBhZ2VGaWxlc10pXX07fWZ1bmN0aW9uIGdldFBvbHlmaWxsU2NyaXB0cyhjb250ZXh0LHByb3BzKXsvLyBwb2x5ZmlsbHMuanMgaGFzIHRvIGJlIHJlbmRlcmVkIGFzIG5vbW9kdWxlIHdpdGhvdXQgYXN5bmNcbi8vIEl0IGFsc28gaGFzIHRvIGJlIHRoZSBmaXJzdCBzY3JpcHQgdG8gbG9hZFxuY29uc3R7YXNzZXRQcmVmaXgsYnVpbGRNYW5pZmVzdCxkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxkaXNhYmxlT3B0aW1pemVkTG9hZGluZ309Y29udGV4dDtyZXR1cm4gYnVpbGRNYW5pZmVzdC5wb2x5ZmlsbEZpbGVzLmZpbHRlcihwb2x5ZmlsbD0+cG9seWZpbGwuZW5kc1dpdGgoJy5qcycpJiYhcG9seWZpbGwuZW5kc1dpdGgoJy5tb2R1bGUuanMnKSkubWFwKHBvbHlmaWxsPT4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtrZXk6cG9seWZpbGwsZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLG5vbmNlOnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLG5vTW9kdWxlOnRydWUsc3JjOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke3BvbHlmaWxsfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YH0pKTt9ZnVuY3Rpb24gZ2V0UHJlTmV4dFNjcmlwdHMoY29udGV4dCxwcm9wcyl7Y29uc3R7c2NyaXB0TG9hZGVyLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nfT1jb250ZXh0O3JldHVybihzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmV8fFtdKS5tYXAoZmlsZT0+e2NvbnN0e3N0cmF0ZWd5LC4uLnNjcmlwdFByb3BzfT1maWxlO3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsT2JqZWN0LmFzc2lnbih7fSxzY3JpcHRQcm9wcyx7ZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLG5vbmNlOnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSkpO30pO31mdW5jdGlvbiBnZXREeW5hbWljQ2h1bmtzKGNvbnRleHQscHJvcHMsZmlsZXMpe2NvbnN0e2R5bmFtaWNJbXBvcnRzLGFzc2V0UHJlZml4LGlzRGV2ZWxvcG1lbnQsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PWNvbnRleHQ7cmV0dXJuIGR5bmFtaWNJbXBvcnRzLm1hcChmaWxlPT57aWYoIWZpbGUuZW5kc1dpdGgoJy5qcycpfHxmaWxlcy5hbGxGaWxlcy5pbmNsdWRlcyhmaWxlKSlyZXR1cm4gbnVsbDtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHthc3luYzohaXNEZXZlbG9wbWVudCYmZGlzYWJsZU9wdGltaXplZExvYWRpbmcsZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLGtleTpmaWxlLHNyYzpgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLG5vbmNlOnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSk7fSk7fWZ1bmN0aW9uIGdldFNjcmlwdHMoY29udGV4dCxwcm9wcyxmaWxlcyl7dmFyIF9idWlsZE1hbmlmZXN0JGxvd1ByaTtjb25zdHthc3NldFByZWZpeCxidWlsZE1hbmlmZXN0LGlzRGV2ZWxvcG1lbnQsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PWNvbnRleHQ7Y29uc3Qgbm9ybWFsU2NyaXB0cz1maWxlcy5hbGxGaWxlcy5maWx0ZXIoZmlsZT0+ZmlsZS5lbmRzV2l0aCgnLmpzJykpO2NvbnN0IGxvd1ByaW9yaXR5U2NyaXB0cz0oX2J1aWxkTWFuaWZlc3QkbG93UHJpPWJ1aWxkTWFuaWZlc3QubG93UHJpb3JpdHlGaWxlcyk9PW51bGw/dm9pZCAwOl9idWlsZE1hbmlmZXN0JGxvd1ByaS5maWx0ZXIoZmlsZT0+ZmlsZS5lbmRzV2l0aCgnLmpzJykpO3JldHVyblsuLi5ub3JtYWxTY3JpcHRzLC4uLmxvd1ByaW9yaXR5U2NyaXB0c10ubWFwKGZpbGU9PntyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtrZXk6ZmlsZSxzcmM6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxub25jZTpwcm9wcy5ub25jZSxhc3luYzohaXNEZXZlbG9wbWVudCYmZGlzYWJsZU9wdGltaXplZExvYWRpbmcsZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSk7fSk7fS8qKlxuICogYERvY3VtZW50YCBjb21wb25lbnQgaGFuZGxlcyB0aGUgaW5pdGlhbCBgZG9jdW1lbnRgIG1hcmt1cCBhbmQgcmVuZGVycyBvbmx5IG9uIHRoZSBzZXJ2ZXIgc2lkZS5cbiAqIENvbW1vbmx5IHVzZWQgZm9yIGltcGxlbWVudGluZyBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcgZm9yIGBjc3MtaW4tanNgIGxpYnJhcmllcy5cbiAqL2NsYXNzIERvY3VtZW50IGV4dGVuZHMgX3JlYWN0LkNvbXBvbmVudHsvKipcbiAgICogYGdldEluaXRpYWxQcm9wc2AgaG9vayByZXR1cm5zIHRoZSBjb250ZXh0IG9iamVjdCB3aXRoIHRoZSBhZGRpdGlvbiBvZiBgcmVuZGVyUGFnZWAuXG4gICAqIGByZW5kZXJQYWdlYCBjYWxsYmFjayBleGVjdXRlcyBgUmVhY3RgIHJlbmRlcmluZyBsb2dpYyBzeW5jaHJvbm91c2x5IHRvIHN1cHBvcnQgc2VydmVyLXJlbmRlcmluZyB3cmFwcGVyc1xuICAgKi9zdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eCl7Y29uc3QgZW5oYW5jZUFwcD1BcHA9PntyZXR1cm4gcHJvcHM9Pi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEFwcCxwcm9wcyk7fTtjb25zdHtodG1sLGhlYWR9PWF3YWl0IGN0eC5yZW5kZXJQYWdlKHtlbmhhbmNlQXBwfSk7Y29uc3Qgc3R5bGVzPVsuLi4oMCxfc2VydmVyLmRlZmF1bHQpKCldO3JldHVybntodG1sLGhlYWQsc3R5bGVzfTt9c3RhdGljIHJlbmRlckRvY3VtZW50KERvY3VtZW50Q29tcG9uZW50LHByb3BzKXtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dC5Qcm92aWRlcix7dmFsdWU6cHJvcHN9LC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERvY3VtZW50Q29tcG9uZW50LHByb3BzKSk7fXJlbmRlcigpe3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEh0bWwsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChIZWFkLG51bGwpLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYm9keVwiLG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWFpbixudWxsKSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChOZXh0U2NyaXB0LG51bGwpKSk7fX1leHBvcnRzLmRlZmF1bHQ9RG9jdW1lbnQ7ZnVuY3Rpb24gSHRtbChwcm9wcyl7Y29uc3R7aW5BbXBNb2RlLGRvY0NvbXBvbmVudHNSZW5kZXJlZCxsb2NhbGV9PSgwLF9yZWFjdC51c2VDb250ZXh0KShfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dCk7ZG9jQ29tcG9uZW50c1JlbmRlcmVkLkh0bWw9dHJ1ZTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImh0bWxcIixPYmplY3QuYXNzaWduKHt9LHByb3BzLHtsYW5nOnByb3BzLmxhbmd8fGxvY2FsZXx8dW5kZWZpbmVkLGFtcDppbkFtcE1vZGU/Jyc6dW5kZWZpbmVkLFwiZGF0YS1hbXBkZXZtb2RlXCI6aW5BbXBNb2RlJiZwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJz8nJzp1bmRlZmluZWR9KSk7fWNsYXNzIEhlYWQgZXh0ZW5kcyBfcmVhY3QuQ29tcG9uZW50e2NvbnN0cnVjdG9yKC4uLmFyZ3Mpe3N1cGVyKC4uLmFyZ3MpO3RoaXMuY29udGV4dD12b2lkIDA7fWdldENzc0xpbmtzKGZpbGVzKXtjb25zdHthc3NldFByZWZpeCxkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxkeW5hbWljSW1wb3J0c309dGhpcy5jb250ZXh0O2NvbnN0IGNzc0ZpbGVzPWZpbGVzLmFsbEZpbGVzLmZpbHRlcihmPT5mLmVuZHNXaXRoKCcuY3NzJykpO2NvbnN0IHNoYXJlZEZpbGVzPW5ldyBTZXQoZmlsZXMuc2hhcmVkRmlsZXMpOy8vIFVubWFuYWdlZCBmaWxlcyBhcmUgQ1NTIGZpbGVzIHRoYXQgd2lsbCBiZSBoYW5kbGVkIGRpcmVjdGx5IGJ5IHRoZVxuLy8gd2VicGFjayBydW50aW1lIChgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5gKS5cbmxldCB1bm1hbmdlZEZpbGVzPW5ldyBTZXQoW10pO2xldCBkeW5hbWljQ3NzRmlsZXM9QXJyYXkuZnJvbShuZXcgU2V0KGR5bmFtaWNJbXBvcnRzLmZpbHRlcihmaWxlPT5maWxlLmVuZHNXaXRoKCcuY3NzJykpKSk7aWYoZHluYW1pY0Nzc0ZpbGVzLmxlbmd0aCl7Y29uc3QgZXhpc3Rpbmc9bmV3IFNldChjc3NGaWxlcyk7ZHluYW1pY0Nzc0ZpbGVzPWR5bmFtaWNDc3NGaWxlcy5maWx0ZXIoZj0+IShleGlzdGluZy5oYXMoZil8fHNoYXJlZEZpbGVzLmhhcyhmKSkpO3VubWFuZ2VkRmlsZXM9bmV3IFNldChkeW5hbWljQ3NzRmlsZXMpO2Nzc0ZpbGVzLnB1c2goLi4uZHluYW1pY0Nzc0ZpbGVzKTt9bGV0IGNzc0xpbmtFbGVtZW50cz1bXTtjc3NGaWxlcy5mb3JFYWNoKGZpbGU9Pntjb25zdCBpc1NoYXJlZEZpbGU9c2hhcmVkRmlsZXMuaGFzKGZpbGUpO2lmKCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTKXtjc3NMaW5rRWxlbWVudHMucHVzaCgvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7a2V5OmAke2ZpbGV9LXByZWxvYWRgLG5vbmNlOnRoaXMucHJvcHMubm9uY2UscmVsOlwicHJlbG9hZFwiLGhyZWY6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxhczpcInN0eWxlXCIsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTn0pKTt9Y29uc3QgaXNVbm1hbmFnZWRGaWxlPXVubWFuZ2VkRmlsZXMuaGFzKGZpbGUpO2Nzc0xpbmtFbGVtZW50cy5wdXNoKC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtrZXk6ZmlsZSxub25jZTp0aGlzLnByb3BzLm5vbmNlLHJlbDpcInN0eWxlc2hlZXRcIixocmVmOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixcImRhdGEtbi1nXCI6aXNVbm1hbmFnZWRGaWxlP3VuZGVmaW5lZDppc1NoYXJlZEZpbGU/Jyc6dW5kZWZpbmVkLFwiZGF0YS1uLXBcIjppc1VubWFuYWdlZEZpbGU/dW5kZWZpbmVkOmlzU2hhcmVkRmlsZT91bmRlZmluZWQ6Jyd9KSk7fSk7aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0nZGV2ZWxvcG1lbnQnJiZwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfRk9OVFMpe2Nzc0xpbmtFbGVtZW50cz10aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoY3NzTGlua0VsZW1lbnRzKTt9cmV0dXJuIGNzc0xpbmtFbGVtZW50cy5sZW5ndGg9PT0wP251bGw6Y3NzTGlua0VsZW1lbnRzO31nZXRQcmVsb2FkRHluYW1pY0NodW5rcygpe2NvbnN0e2R5bmFtaWNJbXBvcnRzLGFzc2V0UHJlZml4LGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfT10aGlzLmNvbnRleHQ7cmV0dXJuIGR5bmFtaWNJbXBvcnRzLm1hcChmaWxlPT57aWYoIWZpbGUuZW5kc1dpdGgoJy5qcycpKXtyZXR1cm4gbnVsbDt9cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse3JlbDpcInByZWxvYWRcIixrZXk6ZmlsZSxocmVmOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsYXM6XCJzY3JpcHRcIixub25jZTp0aGlzLnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnRoaXMucHJvcHMuY3Jvc3NPcmlnaW58fHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU59KTt9KS8vIEZpbHRlciBvdXQgbnVsbGVkIHNjcmlwdHNcbi5maWx0ZXIoQm9vbGVhbik7fWdldFByZWxvYWRNYWluTGlua3MoZmlsZXMpe2NvbnN0e2Fzc2V0UHJlZml4LGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nLHNjcmlwdExvYWRlcn09dGhpcy5jb250ZXh0O2NvbnN0IHByZWxvYWRGaWxlcz1maWxlcy5hbGxGaWxlcy5maWx0ZXIoZmlsZT0+e3JldHVybiBmaWxlLmVuZHNXaXRoKCcuanMnKTt9KTtyZXR1cm5bLi4uKHNjcmlwdExvYWRlci5iZWZvcmVJbnRlcmFjdGl2ZXx8W10pLm1hcChmaWxlPT4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7a2V5OmZpbGUuc3JjLG5vbmNlOnRoaXMucHJvcHMubm9uY2UscmVsOlwicHJlbG9hZFwiLGhyZWY6ZmlsZS5zcmMsYXM6XCJzY3JpcHRcIixjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSkpLC4uLnByZWxvYWRGaWxlcy5tYXAoZmlsZT0+LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse2tleTpmaWxlLG5vbmNlOnRoaXMucHJvcHMubm9uY2UscmVsOlwicHJlbG9hZFwiLGhyZWY6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxhczpcInNjcmlwdFwiLGNyb3NzT3JpZ2luOnRoaXMucHJvcHMuY3Jvc3NPcmlnaW58fHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU59KSldO31nZXREeW5hbWljQ2h1bmtzKGZpbGVzKXtyZXR1cm4gZ2V0RHluYW1pY0NodW5rcyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyxmaWxlcyk7fWdldFByZU5leHRTY3JpcHRzKCl7cmV0dXJuIGdldFByZU5leHRTY3JpcHRzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzKTt9Z2V0U2NyaXB0cyhmaWxlcyl7cmV0dXJuIGdldFNjcmlwdHModGhpcy5jb250ZXh0LHRoaXMucHJvcHMsZmlsZXMpO31nZXRQb2x5ZmlsbFNjcmlwdHMoKXtyZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzKTt9aGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyhjaGlsZHJlbil7Y29uc3R7c2NyaXB0TG9hZGVyfT10aGlzLmNvbnRleHQ7Y29uc3Qgc2NyaXB0TG9hZGVySXRlbXM9W107Y29uc3QgZmlsdGVyZWRDaGlsZHJlbj1bXTtfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5mb3JFYWNoKGNoaWxkcmVuLGNoaWxkPT57aWYoY2hpbGQudHlwZT09PV9zY3JpcHQuZGVmYXVsdCl7aWYoY2hpbGQucHJvcHMuc3RyYXRlZ3k9PT0nYmVmb3JlSW50ZXJhY3RpdmUnKXtzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmU9KHNjcmlwdExvYWRlci5iZWZvcmVJbnRlcmFjdGl2ZXx8W10pLmNvbmNhdChbey4uLmNoaWxkLnByb3BzfV0pO3JldHVybjt9ZWxzZSBpZihbJ2xhenlPbmxvYWQnLCdhZnRlckludGVyYWN0aXZlJ10uaW5jbHVkZXMoY2hpbGQucHJvcHMuc3RyYXRlZ3kpKXtzY3JpcHRMb2FkZXJJdGVtcy5wdXNoKGNoaWxkLnByb3BzKTtyZXR1cm47fX1maWx0ZXJlZENoaWxkcmVuLnB1c2goY2hpbGQpO30pO3RoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnNjcmlwdExvYWRlcj1zY3JpcHRMb2FkZXJJdGVtcztyZXR1cm4gZmlsdGVyZWRDaGlsZHJlbjt9bWFrZVN0eWxlc2hlZXRJbmVydChub2RlKXtyZXR1cm4gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKG5vZGUsYz0+e2lmKGMudHlwZT09PSdsaW5rJyYmYy5wcm9wc1snaHJlZiddJiZfY29uc3RhbnRzLk9QVElNSVpFRF9GT05UX1BST1ZJREVSUy5zb21lKCh7dXJsfSk9PmMucHJvcHNbJ2hyZWYnXS5zdGFydHNXaXRoKHVybCkpKXtjb25zdCBuZXdQcm9wcz17Li4uKGMucHJvcHN8fHt9KX07bmV3UHJvcHNbJ2RhdGEtaHJlZiddPW5ld1Byb3BzWydocmVmJ107bmV3UHJvcHNbJ2hyZWYnXT11bmRlZmluZWQ7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNsb25lRWxlbWVudChjLG5ld1Byb3BzKTt9ZWxzZSBpZihjLnByb3BzJiZjLnByb3BzWydjaGlsZHJlbiddKXtjLnByb3BzWydjaGlsZHJlbiddPXRoaXMubWFrZVN0eWxlc2hlZXRJbmVydChjLnByb3BzWydjaGlsZHJlbiddKTt9cmV0dXJuIGM7fSk7fXJlbmRlcigpe3ZhciBfdGhpcyRwcm9wcyRub25jZSxfdGhpcyRwcm9wcyRub25jZTI7Y29uc3R7c3R5bGVzLGFtcFBhdGgsaW5BbXBNb2RlLGh5YnJpZEFtcCxjYW5vbmljYWxCYXNlLF9fTkVYVF9EQVRBX18sZGFuZ2Vyb3VzQXNQYXRoLGhlYWRUYWdzLHVuc3RhYmxlX3J1bnRpbWVKUyx1bnN0YWJsZV9Kc1ByZWxvYWQsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PXRoaXMuY29udGV4dDtjb25zdCBkaXNhYmxlUnVudGltZUpTPXVuc3RhYmxlX3J1bnRpbWVKUz09PWZhbHNlO2NvbnN0IGRpc2FibGVKc1ByZWxvYWQ9dW5zdGFibGVfSnNQcmVsb2FkPT09ZmFsc2V8fCFkaXNhYmxlT3B0aW1pemVkTG9hZGluZzt0aGlzLmNvbnRleHQuZG9jQ29tcG9uZW50c1JlbmRlcmVkLkhlYWQ9dHJ1ZTtsZXR7aGVhZH09dGhpcy5jb250ZXh0O2xldCBjc3NQcmVsb2Fkcz1bXTtsZXQgb3RoZXJIZWFkRWxlbWVudHM9W107aWYoaGVhZCl7aGVhZC5mb3JFYWNoKGM9PntpZihjJiZjLnR5cGU9PT0nbGluaycmJmMucHJvcHNbJ3JlbCddPT09J3ByZWxvYWQnJiZjLnByb3BzWydhcyddPT09J3N0eWxlJyl7Y3NzUHJlbG9hZHMucHVzaChjKTt9ZWxzZXtjJiZvdGhlckhlYWRFbGVtZW50cy5wdXNoKGMpO319KTtoZWFkPWNzc1ByZWxvYWRzLmNvbmNhdChvdGhlckhlYWRFbGVtZW50cyk7fWxldCBjaGlsZHJlbj1fcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pLmZpbHRlcihCb29sZWFuKTsvLyBzaG93IGEgd2FybmluZyBpZiBIZWFkIGNvbnRhaW5zIDx0aXRsZT4gKG9ubHkgaW4gZGV2ZWxvcG1lbnQpXG5pZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7Y2hpbGRyZW49X3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLGNoaWxkPT57dmFyIF9jaGlsZCRwcm9wcztjb25zdCBpc1JlYWN0SGVsbWV0PWNoaWxkPT1udWxsP3ZvaWQgMDooX2NoaWxkJHByb3BzPWNoaWxkLnByb3BzKT09bnVsbD92b2lkIDA6X2NoaWxkJHByb3BzWydkYXRhLXJlYWN0LWhlbG1ldCddO2lmKCFpc1JlYWN0SGVsbWV0KXt2YXIgX2NoaWxkJHByb3BzMjtpZigoY2hpbGQ9PW51bGw/dm9pZCAwOmNoaWxkLnR5cGUpPT09J3RpdGxlJyl7Y29uc29sZS53YXJuKFwiV2FybmluZzogPHRpdGxlPiBzaG91bGQgbm90IGJlIHVzZWQgaW4gX2RvY3VtZW50LmpzJ3MgPEhlYWQ+LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uby1kb2N1bWVudC10aXRsZVwiKTt9ZWxzZSBpZigoY2hpbGQ9PW51bGw/dm9pZCAwOmNoaWxkLnR5cGUpPT09J21ldGEnJiYoY2hpbGQ9PW51bGw/dm9pZCAwOihfY2hpbGQkcHJvcHMyPWNoaWxkLnByb3BzKT09bnVsbD92b2lkIDA6X2NoaWxkJHByb3BzMi5uYW1lKT09PSd2aWV3cG9ydCcpe2NvbnNvbGUud2FybihcIldhcm5pbmc6IHZpZXdwb3J0IG1ldGEgdGFncyBzaG91bGQgbm90IGJlIHVzZWQgaW4gX2RvY3VtZW50LmpzJ3MgPEhlYWQ+LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uby1kb2N1bWVudC12aWV3cG9ydC1tZXRhXCIpO319cmV0dXJuIGNoaWxkO30pO2lmKHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4pY29uc29sZS53YXJuKCdXYXJuaW5nOiBgSGVhZGAgYXR0cmlidXRlIGBjcm9zc09yaWdpbmAgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZG9jLWNyb3Nzb3JpZ2luLWRlcHJlY2F0ZWQnKTt9aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0nZGV2ZWxvcG1lbnQnJiZwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfRk9OVFMmJiFpbkFtcE1vZGUpe2NoaWxkcmVuPXRoaXMubWFrZVN0eWxlc2hlZXRJbmVydChjaGlsZHJlbik7fWNoaWxkcmVuPXRoaXMuaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyhjaGlsZHJlbik7bGV0IGhhc0FtcGh0bWxSZWw9ZmFsc2U7bGV0IGhhc0Nhbm9uaWNhbFJlbD1mYWxzZTsvLyBzaG93IHdhcm5pbmcgYW5kIHJlbW92ZSBjb25mbGljdGluZyBhbXAgaGVhZCB0YWdzXG5oZWFkPV9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChoZWFkfHxbXSxjaGlsZD0+e2lmKCFjaGlsZClyZXR1cm4gY2hpbGQ7Y29uc3R7dHlwZSxwcm9wc309Y2hpbGQ7aWYoaW5BbXBNb2RlKXtsZXQgYmFkUHJvcD0nJztpZih0eXBlPT09J21ldGEnJiZwcm9wcy5uYW1lPT09J3ZpZXdwb3J0Jyl7YmFkUHJvcD0nbmFtZT1cInZpZXdwb3J0XCInO31lbHNlIGlmKHR5cGU9PT0nbGluaycmJnByb3BzLnJlbD09PSdjYW5vbmljYWwnKXtoYXNDYW5vbmljYWxSZWw9dHJ1ZTt9ZWxzZSBpZih0eXBlPT09J3NjcmlwdCcpey8vIG9ubHkgYmxvY2sgaWZcbi8vIDEuIGl0IGhhcyBhIHNyYyBhbmQgaXNuJ3QgcG9pbnRpbmcgdG8gYW1wcHJvamVjdCdzIENETlxuLy8gMi4gaXQgaXMgdXNpbmcgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgd2l0aG91dCBhIHR5cGUgb3Jcbi8vIGEgdHlwZSBvZiB0ZXh0L2phdmFzY3JpcHRcbmlmKHByb3BzLnNyYyYmcHJvcHMuc3JjLmluZGV4T2YoJ2FtcHByb2plY3QnKTwtMXx8cHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwmJighcHJvcHMudHlwZXx8cHJvcHMudHlwZT09PSd0ZXh0L2phdmFzY3JpcHQnKSl7YmFkUHJvcD0nPHNjcmlwdCc7T2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2gocHJvcD0+e2JhZFByb3ArPWAgJHtwcm9wfT1cIiR7cHJvcHNbcHJvcF19XCJgO30pO2JhZFByb3ArPScvPic7fX1pZihiYWRQcm9wKXtjb25zb2xlLndhcm4oYEZvdW5kIGNvbmZsaWN0aW5nIGFtcCB0YWcgXCIke2NoaWxkLnR5cGV9XCIgd2l0aCBjb25mbGljdGluZyBwcm9wICR7YmFkUHJvcH0gaW4gJHtfX05FWFRfREFUQV9fLnBhZ2V9LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9jb25mbGljdGluZy1hbXAtdGFnYCk7cmV0dXJuIG51bGw7fX1lbHNley8vIG5vbi1hbXAgbW9kZVxuaWYodHlwZT09PSdsaW5rJyYmcHJvcHMucmVsPT09J2FtcGh0bWwnKXtoYXNBbXBodG1sUmVsPXRydWU7fX1yZXR1cm4gY2hpbGQ7fSk7Ly8gdHJ5IHRvIHBhcnNlIHN0eWxlcyBmcm9tIGZyYWdtZW50IGZvciBiYWNrd2FyZHMgY29tcGF0XG5jb25zdCBjdXJTdHlsZXM9QXJyYXkuaXNBcnJheShzdHlsZXMpP3N0eWxlczpbXTtpZihpbkFtcE1vZGUmJnN0eWxlcyYmLy8gQHRzLWlnbm9yZSBQcm9wZXJ0eSAncHJvcHMnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgUmVhY3RFbGVtZW50XG5zdHlsZXMucHJvcHMmJi8vIEB0cy1pZ25vcmUgUHJvcGVydHkgJ3Byb3BzJyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlIFJlYWN0RWxlbWVudFxuQXJyYXkuaXNBcnJheShzdHlsZXMucHJvcHMuY2hpbGRyZW4pKXtjb25zdCBoYXNTdHlsZXM9ZWw9Pnt2YXIgX2VsJHByb3BzLF9lbCRwcm9wcyRkYW5nZXJvdXNseTtyZXR1cm4gZWw9PW51bGw/dm9pZCAwOihfZWwkcHJvcHM9ZWwucHJvcHMpPT1udWxsP3ZvaWQgMDooX2VsJHByb3BzJGRhbmdlcm91c2x5PV9lbCRwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCk9PW51bGw/dm9pZCAwOl9lbCRwcm9wcyRkYW5nZXJvdXNseS5fX2h0bWw7fTsvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcbnN0eWxlcy5wcm9wcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT57aWYoQXJyYXkuaXNBcnJheShjaGlsZCkpe2NoaWxkLmZvckVhY2goZWw9Pmhhc1N0eWxlcyhlbCkmJmN1clN0eWxlcy5wdXNoKGVsKSk7fWVsc2UgaWYoaGFzU3R5bGVzKGNoaWxkKSl7Y3VyU3R5bGVzLnB1c2goY2hpbGQpO319KTt9Y29uc3QgZmlsZXM9Z2V0RG9jdW1lbnRGaWxlcyh0aGlzLmNvbnRleHQuYnVpbGRNYW5pZmVzdCx0aGlzLmNvbnRleHQuX19ORVhUX0RBVEFfXy5wYWdlLGluQW1wTW9kZSk7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkXCIsdGhpcy5wcm9wcyx0aGlzLmNvbnRleHQuaXNEZXZlbG9wbWVudCYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIse1wiZGF0YS1uZXh0LWhpZGUtZm91Y1wiOnRydWUsXCJkYXRhLWFtcGRldm1vZGVcIjppbkFtcE1vZGU/J3RydWUnOnVuZGVmaW5lZCxkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOmBib2R5e2Rpc3BsYXk6bm9uZX1gfX0pLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIix7XCJkYXRhLW5leHQtaGlkZS1mb3VjXCI6dHJ1ZSxcImRhdGEtYW1wZGV2bW9kZVwiOmluQW1wTW9kZT8ndHJ1ZSc6dW5kZWZpbmVkfSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIse2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6YGJvZHl7ZGlzcGxheTpibG9ja31gfX0pKSksY2hpbGRyZW4scHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIix7bmFtZTpcIm5leHQtZm9udC1wcmVjb25uZWN0XCJ9KSxoZWFkLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLHtuYW1lOlwibmV4dC1oZWFkLWNvdW50XCIsY29udGVudDpfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5jb3VudChoZWFkfHxbXSkudG9TdHJpbmcoKX0pLGluQW1wTW9kZSYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIix7bmFtZTpcInZpZXdwb3J0XCIsY29udGVudDpcIndpZHRoPWRldmljZS13aWR0aCxtaW5pbXVtLXNjYWxlPTEsaW5pdGlhbC1zY2FsZT0xXCJ9KSwhaGFzQ2Fub25pY2FsUmVsJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7cmVsOlwiY2Fub25pY2FsXCIsaHJlZjpjYW5vbmljYWxCYXNlKygwLF91dGlsczIuY2xlYW5BbXBQYXRoKShkYW5nZXJvdXNBc1BhdGgpfSksLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse3JlbDpcInByZWxvYWRcIixhczpcInNjcmlwdFwiLGhyZWY6XCJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC5qc1wifSksc3R5bGVzJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIse1wiYW1wLWN1c3RvbVwiOlwiXCIsZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpjdXJTdHlsZXMubWFwKHN0eWxlPT5zdHlsZS5wcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWwpLmpvaW4oJycpLnJlcGxhY2UoL1xcL1xcKiMgc291cmNlTWFwcGluZ1VSTD0uKlxcKlxcLy9nLCcnKS5yZXBsYWNlKC9cXC9cXCpAIHNvdXJjZVVSTD0uKj9cXCpcXC8vZywnJyl9fSksLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLHtcImFtcC1ib2lsZXJwbGF0ZVwiOlwiXCIsZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpgYm9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fWB9fSksLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLHtcImFtcC1ib2lsZXJwbGF0ZVwiOlwiXCIsZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpgYm9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfWB9fSkpLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIse2FzeW5jOnRydWUsc3JjOlwiaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanNcIn0pKSwhaW5BbXBNb2RlJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCxudWxsLCFoYXNBbXBodG1sUmVsJiZoeWJyaWRBbXAmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtyZWw6XCJhbXBodG1sXCIsaHJlZjpjYW5vbmljYWxCYXNlK2dldEFtcFBhdGgoYW1wUGF0aCxkYW5nZXJvdXNBc1BhdGgpfSksIXByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MmJnRoaXMuZ2V0Q3NzTGlua3MoZmlsZXMpLCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIse1wiZGF0YS1uLWNzc1wiOihfdGhpcyRwcm9wcyRub25jZT10aGlzLnByb3BzLm5vbmNlKSE9bnVsbD9fdGhpcyRwcm9wcyRub25jZTonJ30pLHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9JTUFHRVMmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLHtuYW1lOlwibmV4dC1pbWFnZS1wcmVsb2FkXCJ9KSwhZGlzYWJsZVJ1bnRpbWVKUyYmIWRpc2FibGVKc1ByZWxvYWQmJnRoaXMuZ2V0UHJlbG9hZER5bmFtaWNDaHVua3MoKSwhZGlzYWJsZVJ1bnRpbWVKUyYmIWRpc2FibGVKc1ByZWxvYWQmJnRoaXMuZ2V0UHJlbG9hZE1haW5MaW5rcyhmaWxlcyksIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXRQb2x5ZmlsbFNjcmlwdHMoKSwhZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldFByZU5leHRTY3JpcHRzKCksIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXREeW5hbWljQ2h1bmtzKGZpbGVzKSwhZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldFNjcmlwdHMoZmlsZXMpLHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MmJnRoaXMuZ2V0Q3NzTGlua3MoZmlsZXMpLHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIix7XCJkYXRhLW4tY3NzXCI6KF90aGlzJHByb3BzJG5vbmNlMj10aGlzLnByb3BzLm5vbmNlKSE9bnVsbD9fdGhpcyRwcm9wcyRub25jZTI6Jyd9KSx0aGlzLmNvbnRleHQuaXNEZXZlbG9wbWVudCYmLyojX19QVVJFX18qLyAvLyB0aGlzIGVsZW1lbnQgaXMgdXNlZCB0byBtb3VudCBkZXZlbG9wbWVudCBzdHlsZXMgc28gdGhlXG4vLyBvcmRlcmluZyBtYXRjaGVzIHByb2R1Y3Rpb25cbi8vIChieSBkZWZhdWx0LCBzdHlsZS1sb2FkZXIgaW5qZWN0cyBhdCB0aGUgYm90dG9tIG9mIDxoZWFkIC8+KVxuX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIse2lkOlwiX19uZXh0X2Nzc19fRE9fTk9UX1VTRV9fXCJ9KSxzdHlsZXN8fG51bGwpLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LHt9LC4uLihoZWFkVGFnc3x8W10pKSk7fX1leHBvcnRzLkhlYWQ9SGVhZDtIZWFkLmNvbnRleHRUeXBlPV9kb2N1bWVudENvbnRleHQuRG9jdW1lbnRDb250ZXh0O0hlYWQucHJvcFR5cGVzPXtub25jZTpfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLGNyb3NzT3JpZ2luOl9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmd9O2Z1bmN0aW9uIE1haW4oKXtjb25zdHtpbkFtcE1vZGUsaHRtbCxkb2NDb21wb25lbnRzUmVuZGVyZWR9PSgwLF9yZWFjdC51c2VDb250ZXh0KShfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dCk7ZG9jQ29tcG9uZW50c1JlbmRlcmVkLk1haW49dHJ1ZTtpZihpbkFtcE1vZGUpcmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCxfY29uc3RhbnRzLkFNUF9SRU5ERVJfVEFSR0VUKTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtpZDpcIl9fbmV4dFwiLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6aHRtbH19KTt9Y2xhc3MgTmV4dFNjcmlwdCBleHRlbmRzIF9yZWFjdC5Db21wb25lbnR7Y29uc3RydWN0b3IoLi4uYXJncyl7c3VwZXIoLi4uYXJncyk7dGhpcy5jb250ZXh0PXZvaWQgMDt9Z2V0RHluYW1pY0NodW5rcyhmaWxlcyl7cmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LHRoaXMucHJvcHMsZmlsZXMpO31nZXRQcmVOZXh0U2NyaXB0cygpe3JldHVybiBnZXRQcmVOZXh0U2NyaXB0cyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyk7fWdldFNjcmlwdHMoZmlsZXMpe3JldHVybiBnZXRTY3JpcHRzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzLGZpbGVzKTt9Z2V0UG9seWZpbGxTY3JpcHRzKCl7cmV0dXJuIGdldFBvbHlmaWxsU2NyaXB0cyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyk7fXN0YXRpYyBnZXRJbmxpbmVTY3JpcHRTb3VyY2UoZG9jdW1lbnRQcm9wcyl7Y29uc3R7X19ORVhUX0RBVEFfX309ZG9jdW1lbnRQcm9wczt0cnl7Y29uc3QgZGF0YT1KU09OLnN0cmluZ2lmeShfX05FWFRfREFUQV9fKTtyZXR1cm4oMCxfaHRtbGVzY2FwZS5odG1sRXNjYXBlSnNvblN0cmluZykoZGF0YSk7fWNhdGNoKGVycil7aWYoZXJyLm1lc3NhZ2UuaW5kZXhPZignY2lyY3VsYXIgc3RydWN0dXJlJykpe3Rocm93IG5ldyBFcnJvcihgQ2lyY3VsYXIgc3RydWN0dXJlIGluIFwiZ2V0SW5pdGlhbFByb3BzXCIgcmVzdWx0IG9mIHBhZ2UgXCIke19fTkVYVF9EQVRBX18ucGFnZX1cIi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvY2lyY3VsYXItc3RydWN0dXJlYCk7fXRocm93IGVycjt9fXJlbmRlcigpe2NvbnN0e2Fzc2V0UHJlZml4LGluQW1wTW9kZSxidWlsZE1hbmlmZXN0LHVuc3RhYmxlX3J1bnRpbWVKUyxkb2NDb21wb25lbnRzUmVuZGVyZWQsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PXRoaXMuY29udGV4dDtjb25zdCBkaXNhYmxlUnVudGltZUpTPXVuc3RhYmxlX3J1bnRpbWVKUz09PWZhbHNlO2RvY0NvbXBvbmVudHNSZW5kZXJlZC5OZXh0U2NyaXB0PXRydWU7aWYoaW5BbXBNb2RlKXtpZihwcm9jZXNzLmVudi5OT0RFX0VOVj09PSdwcm9kdWN0aW9uJyl7cmV0dXJuIG51bGw7fWNvbnN0IGFtcERldkZpbGVzPVsuLi5idWlsZE1hbmlmZXN0LmRldkZpbGVzLC4uLmJ1aWxkTWFuaWZlc3QucG9seWZpbGxGaWxlcywuLi5idWlsZE1hbmlmZXN0LmFtcERldkZpbGVzXTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCxudWxsLGRpc2FibGVSdW50aW1lSlM/bnVsbDovKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtpZDpcIl9fTkVYVF9EQVRBX19cIix0eXBlOlwiYXBwbGljYXRpb24vanNvblwiLG5vbmNlOnRoaXMucHJvcHMubm9uY2UsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOk5leHRTY3JpcHQuZ2V0SW5saW5lU2NyaXB0U291cmNlKHRoaXMuY29udGV4dCl9LFwiZGF0YS1hbXBkZXZtb2RlXCI6dHJ1ZX0pLGFtcERldkZpbGVzLm1hcChmaWxlPT4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtrZXk6ZmlsZSxzcmM6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZmlsZX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLFwiZGF0YS1hbXBkZXZtb2RlXCI6dHJ1ZX0pKSk7fWlmKHByb2Nlc3MuZW52Lk5PREVfRU5WIT09J3Byb2R1Y3Rpb24nKXtpZih0aGlzLnByb3BzLmNyb3NzT3JpZ2luKWNvbnNvbGUud2FybignV2FybmluZzogYE5leHRTY3JpcHRgIGF0dHJpYnV0ZSBgY3Jvc3NPcmlnaW5gIGlzIGRlcHJlY2F0ZWQuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2RvYy1jcm9zc29yaWdpbi1kZXByZWNhdGVkJyk7fWNvbnN0IGZpbGVzPWdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsdGhpcy5jb250ZXh0Ll9fTkVYVF9EQVRBX18ucGFnZSxpbkFtcE1vZGUpO3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LG51bGwsIWRpc2FibGVSdW50aW1lSlMmJmJ1aWxkTWFuaWZlc3QuZGV2RmlsZXM/YnVpbGRNYW5pZmVzdC5kZXZGaWxlcy5tYXAoZmlsZT0+LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIix7a2V5OmZpbGUsc3JjOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSkpOm51bGwsZGlzYWJsZVJ1bnRpbWVKUz9udWxsOi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIse2lkOlwiX19ORVhUX0RBVEFfX1wiLHR5cGU6XCJhcHBsaWNhdGlvbi9qc29uXCIsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6TmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KX19KSxkaXNhYmxlT3B0aW1pemVkTG9hZGluZyYmIWRpc2FibGVSdW50aW1lSlMmJnRoaXMuZ2V0UG9seWZpbGxTY3JpcHRzKCksZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldFByZU5leHRTY3JpcHRzKCksZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldER5bmFtaWNDaHVua3MoZmlsZXMpLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXRTY3JpcHRzKGZpbGVzKSk7fX1leHBvcnRzLk5leHRTY3JpcHQ9TmV4dFNjcmlwdDtOZXh0U2NyaXB0LmNvbnRleHRUeXBlPV9kb2N1bWVudENvbnRleHQuRG9jdW1lbnRDb250ZXh0O05leHRTY3JpcHQucHJvcFR5cGVzPXtub25jZTpfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLGNyb3NzT3JpZ2luOl9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmd9O05leHRTY3JpcHQuc2FmYXJpTm9tb2R1bGVGaXg9JyFmdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LHQ9ZS5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2lmKCEoXCJub01vZHVsZVwiaW4gdCkmJlwib25iZWZvcmVsb2FkXCJpbiB0KXt2YXIgbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmVsb2FkXCIsZnVuY3Rpb24oZSl7aWYoZS50YXJnZXQ9PT10KW49ITA7ZWxzZSBpZighZS50YXJnZXQuaGFzQXR0cmlidXRlKFwibm9tb2R1bGVcIil8fCFuKXJldHVybjtlLnByZXZlbnREZWZhdWx0KCl9LCEwKSx0LnR5cGU9XCJtb2R1bGVcIix0LnNyYz1cIi5cIixlLmhlYWQuYXBwZW5kQ2hpbGQodCksdC5yZW1vdmUoKX19KCk7JztmdW5jdGlvbiBnZXRBbXBQYXRoKGFtcFBhdGgsYXNQYXRoKXtyZXR1cm4gYW1wUGF0aHx8YCR7YXNQYXRofSR7YXNQYXRoLmluY2x1ZGVzKCc/Jyk/JyYnOic/J31hbXA9MWA7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9X2RvY3VtZW50LmpzLm1hcCIsImltcG9ydCBEb2N1bWVudCwgeyBIdG1sLCBIZWFkLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSBcIm5leHQvZG9jdW1lbnRcIjtcclxuXHJcbmNsYXNzIE15RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEh0bWw+XHJcbiAgICAgICAgPEhlYWQ+XHJcbiAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxyXG4gICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIuL0ZBVklDT04tUVVBUksucG5nXCIgLz5cclxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjMDAwMDAwXCIgLz5cclxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJnb29nbGVcIiBjb250ZW50PVwibm90cmFuc2xhdGVcIiAvPlxyXG4gICAgICAgICAgPG1ldGEgbmFtZT1cImF1dGhvclwiIGNvbnRlbnQ9XCJKb2VuIFRhbiAmIExpbSBTaGFvIEVuXCIgLz5cclxuICAgICAgICAgIDxtZXRhXHJcbiAgICAgICAgICAgIG5hbWU9XCJkZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICAgIGNvbnRlbnQ9XCJDcmVhdGUsIGVkaXQgJiBleHBvcnQgZGlhZ3JhbXMsIGdyYXBocyBmb3IgRWNvbm9taWNzICYgQ2hlbWlzdHJ5IGhvbWV3b3JrLiBcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiLi9GQVZJQ09OLVFVQVJLLnBuZ1wiIC8+XHJcblxyXG4gICAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiLi9tYW5pZmVzdC5qc29uXCIgLz5cclxuICAgICAgICAgIDxsaW5rXHJcbiAgICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxyXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPGxpbmtcclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCw5MDA7MSw5MDAmZGlzcGxheT1zd2FwXCJcclxuICAgICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPGxpbmtcclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TnVuaXRvJmRpc3BsYXk9c3dhcFwiXHJcbiAgICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0hlYWQ+XHJcbiAgICAgICAgPGJvZHk+XHJcbiAgICAgICAgICA8TWFpbiAvPlxyXG4gICAgICAgICAgPE5leHRTY3JpcHQgLz5cclxuICAgICAgICA8L2JvZHk+XHJcbiAgICAgIDwvSHRtbD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeURvY3VtZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLmh0bWxFc2NhcGVKc29uU3RyaW5nPWh0bWxFc2NhcGVKc29uU3RyaW5nOy8vIFRoaXMgdXRpbGl0eSBpcyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9odG1sZXNjYXBlXG4vLyBMaWNlbnNlOiBodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9odG1sZXNjYXBlL2Jsb2IvMDUyN2NhNzE1NmE1MjRkMjU2MTAxYmIzMTBhOWY5NzBmNjMwNzhhZC9MSUNFTlNFXG5jb25zdCBFU0NBUEVfTE9PS1VQPXsnJic6J1xcXFx1MDAyNicsJz4nOidcXFxcdTAwM2UnLCc8JzonXFxcXHUwMDNjJywnXFx1MjAyOCc6J1xcXFx1MjAyOCcsJ1xcdTIwMjknOidcXFxcdTIwMjknfTtjb25zdCBFU0NBUEVfUkVHRVg9L1smPjxcXHUyMDI4XFx1MjAyOV0vZztmdW5jdGlvbiBodG1sRXNjYXBlSnNvblN0cmluZyhzdHIpe3JldHVybiBzdHIucmVwbGFjZShFU0NBUEVfUkVHRVgsbWF0Y2g9PkVTQ0FQRV9MT09LVVBbbWF0Y2hdKTt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZXNjYXBlLmpzLm1hcCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L3BhZ2VzL19kb2N1bWVudCcpXG4iLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2NvbnN0YW50cy5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9kb2N1bWVudC1jb250ZXh0LmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2hlYWQtbWFuYWdlci1jb250ZXh0LmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL2dldC1wYWdlLWZpbGVzLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL3V0aWxzLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtanN4L3NlcnZlclwiKTs7Il0sInNvdXJjZVJvb3QiOiIifQ==