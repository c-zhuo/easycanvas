(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Button = _interopRequireDefault(__webpack_require__(/*! ./components/Button.js */ \"./src/components/Button.js\"));\n\nvar _Image = _interopRequireDefault(__webpack_require__(/*! ./components/Image.js */ \"./src/components/Image.js\"));\n\nvar _Scroll = _interopRequireDefault(__webpack_require__(/*! ./components/Scroll.js */ \"./src/components/Scroll.js\"));\n\nvar _Sequence = _interopRequireDefault(__webpack_require__(/*! ./components/Sequence.js */ \"./src/components/Sequence.js\"));\n\nvar _Text = _interopRequireDefault(__webpack_require__(/*! ./components/Text.js */ \"./src/components/Text.js\"));\n\nvar _RichText = _interopRequireDefault(__webpack_require__(/*! ./components/RichText */ \"./src/components/RichText.js\"));\n\nvar _View = _interopRequireDefault(__webpack_require__(/*! ./components/View.js */ \"./src/components/View.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n//# sourceURL=webpack:///./src/components.js?");

/***/ }),

/***/ "./src/components/Button.js":
/*!**********************************!*\
  !*** ./src/components/Button.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _text2image = _interopRequireDefault(__webpack_require__(/*! ./_text2image.js */ \"./src/components/_text2image.js\"));\n\nvar _browserRegister = _interopRequireDefault(__webpack_require__(/*! ./_browserRegister.js */ \"./src/components/_browserRegister.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/** ********** *\n *\n * Button\n * - TODO: Toggle state.\n *\n * ********** **/\nvar defaultStyle = {\n  padding: 0,\n  width: 300,\n  family: '\"Helvetica Neue\",Helvetica,Arial,sans-serif'\n};\n\nvar setStyle = function setStyle(buttonStyle, config) {\n  buttonStyle.buttonStyleNormal = Object.assign(defaultStyle, {\n    minWidth: config.style.width,\n    lineHeight: config.style.height,\n    padding: 0\n  }, config.props.normal);\n  buttonStyle.buttonStyleHovered = Object.assign({}, buttonStyle.buttonStyleNormal, config.props.hovered);\n  buttonStyle.buttonStylePressed = Object.assign({}, buttonStyle.buttonStyleNormal, config.props.pressed); // const buttonStyleToggled = Object.assign({}, buttonStyleNormal, opt.props.toggled);\n\n  buttonStyle.imageNormal = (0, _text2image[\"default\"])(config.props.text || '', buttonStyle.buttonStyleNormal);\n  buttonStyle.imageHovered = config.props.hovered && (0, _text2image[\"default\"])(config.props.text || '', buttonStyle.buttonStyleHovered);\n  buttonStyle.imagePressed = config.props.pressed && (0, _text2image[\"default\"])(config.props.text || '', buttonStyle.buttonStylePressed); // const imageToggled = text2image(opt.props.text || '', buttonStyleToggled);\n};\n\nvar component = function component(opt, Easycanvas) {\n  var $sprite;\n  var option = opt || {};\n  opt.props = opt.props || {};\n  var buttonStyle = {\n    buttonStyleNormal: undefined,\n    buttonStyleHovered: undefined,\n    buttonStylePressed: undefined,\n    imageNormal: undefined,\n    imageHovered: undefined,\n    imagePressed: undefined\n  };\n  setStyle(buttonStyle, opt);\n  var events = {};\n  opt.events = opt.events || {};\n\n  events.touchmove = events.mousemove = function () {\n    $sprite.content.img = buttonStyle.imageHovered || buttonStyle.imageNormal;\n  };\n\n  events.touchstart = events.mousedown = function () {\n    $sprite.content.img = buttonStyle.imagePressed || buttonStyle.imageHovered || buttonStyle.imageNormal;\n  };\n\n  events.touchend = events.touchout = events.mouseout = function () {\n    $sprite.content.img = buttonStyle.imageNormal;\n  };\n\n  events.mouseup = function () {\n    $sprite.content.img = buttonStyle.imageHovered || buttonStyle.imageNormal;\n  };\n\n  events.click = function (e) {\n    opt.events.click && opt.events.click.call($sprite, e);\n  };\n\n  $sprite = new Easycanvas.Sprite({\n    name: opt.name || 'button_' + opt.props.text,\n    content: {\n      img: buttonStyle.imageNormal\n    },\n    style: opt.style,\n    props: opt.props,\n    events: events,\n    hooks: opt.hooks\n  }); // $sprite.on('ticked', () => {\n  //     if (ec.utils.funcOrValue($sprite.props.toggled, $sprite)) {\n  //         $sprite.content.img = imageToggled;\n  //     } else {\n  //         $sprite.content.img = imageNormal;\n  //     }\n  // });\n\n  $sprite.update = function (obj) {\n    this.__proto__.update.call(this, obj);\n\n    setStyle(buttonStyle, opt);\n    $sprite.content.img = buttonStyle.imageNormal;\n  };\n\n  return $sprite;\n};\n\n(0, _browserRegister[\"default\"])(component, 'Button');\nvar _default = component;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/Button.js?");

/***/ }),

/***/ "./src/components/Image.js":
/*!*********************************!*\
  !*** ./src/components/Image.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _browserRegister = _interopRequireDefault(__webpack_require__(/*! ./_browserRegister.js */ \"./src/components/_browserRegister.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/** ********** *\n *\n * Image\n *\n * ********** **/\nvar component = function component(opt, Easycanvas) {\n  var $sprite;\n  var option = opt || {};\n  option.name = option.name || 'Image';\n  $sprite = new Easycanvas.Sprite(option);\n  $sprite.content.img = option.src;\n  Object.defineProperty($sprite, 'src', {\n    get: function get() {\n      return $sprite.content.img ? $sprite.content.img.src : '';\n    },\n    set: function set(value) {\n      $sprite.content.img = value;\n    }\n  }); // $sprite.update = function (obj) {\n  //     this.__proto__.update.call(this, obj);\n  // };\n\n  return $sprite;\n};\n\n(0, _browserRegister[\"default\"])(component, 'Image');\nvar _default = component;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/Image.js?");

/***/ }),

/***/ "./src/components/RichText.js":
/*!************************************!*\
  !*** ./src/components/RichText.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _browserRegister = _interopRequireDefault(__webpack_require__(/*! ./_browserRegister.js */ \"./src/components/_browserRegister.js\"));\n\nvar _text2image = _interopRequireDefault(__webpack_require__(/*! ./_text2image.js */ \"./src/components/_text2image.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/** ********** *\n *\n * RichText\n * - Actually it is a image.\n *\n * ********** **/\nvar defaultStyle = {\n  padding: 0,\n  width: 300,\n  lineHeight: 100,\n  family: '\"Helvetica Neue\",Helvetica,Arial,sans-serif'\n};\n\nvar setImage = function setImage($sprite) {\n  $sprite.content.img = $sprite.text ? (0, _text2image[\"default\"])($sprite.text, Object.assign({}, defaultStyle, {\n    lineHeight: $sprite.style.fontSize,\n    textAlign: 'left'\n  }, $sprite.style)) : undefined;\n};\n\nvar component = function component(opt, Easycanvas) {\n  var $sprite;\n  opt.name = opt.name || 'Text';\n  $sprite = new Easycanvas.Sprite(opt); // $sprite.content.text = opt.text;\n\n  setImage($sprite);\n  Object.defineProperty($sprite, 'text', {\n    get: function get() {\n      return $sprite.content.text;\n    },\n    set: function set(value) {\n      $sprite.content.img = text;\n    }\n  });\n\n  $sprite.update = function (obj) {\n    this.__proto__.update.call(this, obj);\n\n    setImage(this);\n  };\n\n  return $sprite;\n};\n\n(0, _browserRegister[\"default\"])(component, 'RichText');\nvar _default = component;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/RichText.js?");

/***/ }),

/***/ "./src/components/Scroll.js":
/*!**********************************!*\
  !*** ./src/components/Scroll.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _browserRegister = _interopRequireDefault(__webpack_require__(/*! ./_browserRegister.js */ \"./src/components/_browserRegister.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/** ********** *\n *\n * scroll\n * - Event listeners\n *\n * ********** **/\nvar funcOrValue;\nvar transition;\nvar mutipleScrollLock; // $sprite.$scroll.$wheeling用于在Chrome移动端下适配双指滑动的wheel事件\n\nvar absMin = function absMin(a, b) {\n  return Math.abs(a) < Math.abs(b) ? a : b;\n};\n\nvar scrollFuncs = {\n  loose: function loose($sprite) {\n    $sprite.$scroll.touching = false;\n  },\n  looper: function looper($sprite) {\n    if (!$sprite.$scroll || !$sprite.$scroll.$scrolling) return;\n\n    if (Math.abs($sprite.$scroll.speedX) > 1) {\n      $sprite.$scroll.speedX *= $sprite.scroll.smooth || 0.8;\n    } else {\n      $sprite.$scroll.speedX = 0;\n    }\n\n    if (Math.abs($sprite.$scroll.speedY) > 1) {\n      $sprite.$scroll.speedY *= $sprite.scroll.smooth || 0.8;\n    } else {\n      $sprite.$scroll.speedY = 0;\n    }\n\n    if (Math.abs($sprite.$scroll.speedX) <= 1 && Math.abs($sprite.$scroll.speedY) <= 1) {\n      $sprite.$scroll.$scrolling = false;\n      $sprite.$scroll.$wheeling = false;\n      return;\n    }\n\n    if ($sprite.$scroll.touching) {\n      // 已经有100毫秒没有touchmove事件了，认为停止移动，清空速度\n      // $sprite.$scroll.speedX *= 0.8;\n      // $sprite.$scroll.speedY *= 0.8;\n      return;\n    }\n\n    $sprite.scroll.scrollY -= $sprite.$scroll.speedY;\n    $sprite.scroll.scrollX -= $sprite.$scroll.speedX;\n\n    if (!$sprite.$scroll.touching && !$sprite.$scroll.$wheeling && Math.abs($sprite.$scroll.speedY) < 50 && $sprite.scroll.anchors && $sprite.scroll.anchors.length) {\n      var range = $sprite.scroll.anchorsRange || 400;\n\n      for (var i = 0; i < $sprite.scroll.anchors.length; i++) {\n        var m = $sprite.scroll.anchors[i];\n        var delta = $sprite.scroll.scrollY - m;\n\n        if (delta > 0 && delta < range && $sprite.$scroll.speedY > 0 || delta < 0 && delta > -range && $sprite.$scroll.speedY < 0) {\n          $sprite.trigger('scrollTo', m, 200);\n          $sprite.$scroll.speedY = 0;\n          break;\n        }\n      }\n    }\n\n    var minScrollX = funcOrValue($sprite.scroll.minScrollX, $sprite);\n    var maxScrollX = funcOrValue($sprite.scroll.maxScrollX, $sprite);\n    var minScrollY = funcOrValue($sprite.scroll.minScrollY, $sprite);\n    var maxScrollY = funcOrValue($sprite.scroll.maxScrollY, $sprite);\n\n    if (!isNaN(minScrollY) && $sprite.scroll.scrollY < minScrollY) {\n      $sprite.scroll.scrollY = minScrollY;\n    } else if (!isNaN(maxScrollY) && $sprite.scroll.scrollY > maxScrollY) {\n      $sprite.scroll.scrollY = maxScrollY;\n      $sprite.broadcast('scrolledToBottom');\n      $sprite.$scroll.speedY = 0;\n    }\n\n    if (!isNaN(minScrollX) && $sprite.scroll.scrollX < minScrollX) {\n      $sprite.scroll.scrollX = minScrollX;\n    } else if (!isNaN(maxScrollX) && $sprite.scroll.scrollX > maxScrollX) {\n      $sprite.scroll.scrollX = maxScrollX;\n    }\n  },\n  touch: function touch($sprite, $e) {\n    var now = Date.now();\n    $sprite.$scroll.$wheeling = false;\n\n    if (!$sprite.$scroll.touching) {\n      // start scroll\n      $sprite.$scroll.touching = now;\n      $sprite.$scroll.quickTouch = now;\n      $sprite.$scroll.lastTouchSpeed = 0;\n      $sprite.$scroll.startPos.x = $e.canvasX;\n      $sprite.$scroll.startPos.y = $e.canvasY;\n      $sprite.$scroll.lastScrollSpeed = $sprite.$scroll.speedX || $sprite.$scroll.speedY;\n      $sprite.$scroll.speedX = 0;\n      $sprite.$scroll.speedY = 0;\n    } else {\n      $sprite.$scroll.$scrolling = true;\n      var deltaX = $sprite.$scroll.startPos.x - $e.canvasX;\n      var deltaY = $sprite.$scroll.startPos.y - $e.canvasY;\n      var deltaTime = now - $sprite.$scroll.touching;\n      $sprite.$scroll.touching = now;\n      var minScrollX = funcOrValue($sprite.scroll.minScrollX, $sprite);\n      var maxScrollX = funcOrValue($sprite.scroll.maxScrollX, $sprite);\n      var minScrollY = funcOrValue($sprite.scroll.minScrollY, $sprite);\n      var maxScrollY = funcOrValue($sprite.scroll.maxScrollY, $sprite);\n\n      if ($sprite.scroll.scrollX + deltaX < minScrollX || $sprite.scroll.scrollX + deltaX > maxScrollX) {\n        if ($sprite.scroll.flexible || $sprite.scroll.flexibleX) deltaX >>= 3;else deltaX = 0;\n      }\n\n      if ($sprite.scroll.scrollY + deltaY < minScrollY || $sprite.scroll.scrollY + deltaY > maxScrollY) {\n        if ($sprite.scroll.flexible || $sprite.scroll.flexibleY) deltaY >>= 3;else deltaY = 0;\n      }\n\n      if (funcOrValue($sprite.scroll.scrollableX, $sprite) && Math.abs(deltaX) >= 1 && deltaTime > 1) {\n        var newSpeedX = ($e.canvasX - $sprite.$scroll.startPos.x) / deltaTime * 25;\n\n        if ($sprite.$scroll.lastScrollSpeed * newSpeedX > 0 && Math.abs(newSpeedX) > 15) {\n          // 连续同向滚动，速度增加\n          newSpeedX += absMin(newSpeedX, $sprite.$scroll.lastScrollSpeed);\n        }\n\n        $sprite.$scroll.speedX = ($sprite.$scroll.lastTouchSpeed + newSpeedX) / ($sprite.$scroll.lastTouchSpeed ? 2 : 1);\n        $sprite.$scroll.lastTouchSpeed = newSpeedX;\n        $sprite.scroll.scrollX += deltaX;\n      }\n\n      if (funcOrValue($sprite.scroll.scrollableY, $sprite) && Math.abs(deltaY) >= 1 && deltaTime > 1) {\n        var newSpeedY = ($e.canvasY - $sprite.$scroll.startPos.y) / deltaTime * 25;\n\n        if ($sprite.$scroll.lastScrollSpeed * newSpeedY > 0 && Math.abs(newSpeedY) > 15) {\n          // 连续同向滚动，速度增加\n          newSpeedY += absMin(newSpeedY, $sprite.$scroll.lastScrollSpeed);\n        }\n\n        $sprite.$scroll.speedY = ($sprite.$scroll.lastTouchSpeed + newSpeedY) / ($sprite.$scroll.lastTouchSpeed ? 2 : 1);\n        $sprite.$scroll.lastTouchSpeed = newSpeedY;\n        $sprite.scroll.scrollY += deltaY;\n      } // $sprite.$scroll.speedX = ($sprite.$scroll.speedX + ($e.canvasX - startPos.x) * 2) / 2;\n      // let curSpeed = ($e.canvasY - startPos.y) * 3;\n      // $sprite.$scroll.speedY = ($sprite.$scroll.speedY + curSpeed) / 2;\n\n\n      $sprite.$scroll.startPos.x = $e.canvasX;\n      $sprite.$scroll.startPos.y = $e.canvasY; // $e.event.preventDefault();\n\n      if (Math.abs(deltaX) > Math.abs(deltaY) + 1) return 1;else if (Math.abs(deltaX) < Math.abs(deltaY) - 1) return 2;\n    }\n  },\n  wheel: function wheel($sprite, $e) {\n    $sprite.$scroll.speedX = funcOrValue($sprite.scroll.scrollableX, $sprite) ? $e.event.wheelDeltaX : 0;\n    $sprite.$scroll.speedY = funcOrValue($sprite.scroll.scrollableY, $sprite) ? $e.event.wheelDeltaY : 0;\n    $sprite.$scroll.$scrolling = true;\n    $sprite.$scroll.$wheeling = true; // $e.event.preventDefault();\n\n    $e.stopPropagation();\n  }\n};\n\nvar component = function component(opt, Easycanvas) {\n  funcOrValue = Easycanvas.utils.funcOrValue;\n  transition = Easycanvas.Transition;\n  var autoScrollX = false;\n  var autoScrollY = false;\n  var option = opt || {};\n  option.scroll = Object.assign({\n    scrollX: 0,\n    scrollY: 0,\n    scrollableX: function scrollableX() {\n      return (this.style.overflowX || this.style.overflow) !== 'visible';\n    },\n    scrollableY: function scrollableY() {\n      return (this.style.overflowY || this.style.overflow) !== 'visible';\n    },\n    minScrollX: 0,\n    maxScrollX: function maxScrollX() {\n      var _this = this;\n\n      var max = 0;\n      this.getChildren().forEach(function (child) {\n        var currentMax = child.getSelfStyle('left') + child.getSelfStyle('width') - _this.getStyle('width');\n\n        if (currentMax > max) max = currentMax;\n      });\n      return max;\n    },\n    minScrollY: 0,\n    maxScrollY: function maxScrollY() {\n      var _this2 = this;\n\n      var max = 0;\n      this.getChildren().forEach(function (child) {\n        var currentMax = child.getSelfStyle('top') + child.getSelfStyle('height') - _this2.getStyle('height');\n\n        if (currentMax > max) max = currentMax;\n      });\n      return max;\n    },\n    propagationX: false,\n    propagationY: false\n  }, opt.scroll);\n\n  var autoScrollFunc = function autoScrollFunc() {\n    if (autoScrollX) {\n      $sprite.scroll.scrollX = autoScrollX();\n    }\n\n    if (autoScrollY) {\n      $sprite.scroll.scrollY = autoScrollY();\n    }\n\n    if (!autoScrollX && !autoScrollY) {\n      $sprite.off('ticked', autoScrollFunc);\n    }\n  }; // let handling = true;\n  // const handleToggle = () => {\n  //     handling = !handling;\n  // };\n\n\n  var started = false;\n  option.events = Object.assign({\n    touchstart: function touchstart($e) {\n      // 先结束，防止之前拖动时拖到外面，导致没触发loose\n      scrollFuncs.loose(this);\n      started = true;\n      mutipleScrollLock = false;\n      scrollFuncs.touch(this, $e); // scroll外面还有一个scroll的时候，让事件传递出去\n\n      if (!$sprite.scroll.propagationX && !$sprite.scroll.propagationY) {\n        $e.stopPropagation();\n      }\n    },\n    touchmove: function touchmove($e) {\n      if (!started) return; // console.log($e.canvasX)\n\n      if (mutipleScrollLock && this !== mutipleScrollLock) {\n        // console.log('rejected!', mutipleScrollLock);\n        return;\n      }\n\n      var moveDirect = scrollFuncs.touch(this, $e);\n\n      if (moveDirect === 1 && $sprite.scroll.propagationY) {\n        $e.stopPropagation();\n        mutipleScrollLock = this; // console.log('locked', mutipleScrollLock);\n      } else if (moveDirect === 2 && $sprite.scroll.propagationX) {\n        $e.stopPropagation();\n        mutipleScrollLock = this; // console.log('locked', mutipleScrollLock);\n      }\n    },\n    mousewheel: function mousewheel($e) {\n      started = true;\n      scrollFuncs.wheel(this, $e);\n      $e.stopPropagation();\n    },\n    touchend: function touchend() {\n      started = false;\n      scrollFuncs.loose(this);\n    },\n    mouseup: function mouseup() {\n      started = false;\n      scrollFuncs.loose(this);\n    }\n  }, option.events || {});\n\n  if (option.scroll.capture) {\n    option.events.interceptor = function ($e) {\n      if ($sprite.events[$e.type]) {\n        $sprite.events[$e.type].call($sprite, $e);\n        return false;\n      }\n\n      return $e;\n    };\n  }\n\n  var $sprite = new Easycanvas.Sprite(option);\n  $sprite.on('ticked', function () {\n    scrollFuncs.looper($sprite);\n  }); // $sprite.on('handleToggle', handleToggle);\n\n  $sprite.on('scrollTo', function (left, top, duration) {\n    var callback;\n    autoScrollX = transition.ease($sprite.scroll.scrollY, left, duration || 200, {\n      cycle: 0.5\n    }).then(function () {\n      autoScrollX = false;\n      callback && callback();\n      callback = false;\n    });\n    autoScrollY = transition.ease($sprite.scroll.scrollY, top, duration || 200, {\n      cycle: 0.5\n    }).then(function () {\n      autoScrollY = false;\n      callback && callback();\n      callback = false;\n    });\n    $sprite.on('ticked', autoScrollFunc);\n    return {\n      then: function then(cb) {\n        callback = cb;\n      }\n    };\n  });\n  $sprite.$scroll = {\n    speedX: 0,\n    speedY: 0,\n    touching: false,\n    startPos: {},\n    lastTouchSpeed: 0,\n    // 记录用户上一次touch产生的速度，用于平滑的速度计算\n    lastScrollSpeed: 0 // 记录用户上一次touch最终的速度，判断连续相同方向scroll时速度叠加\n\n  };\n  var $scrollingElement = $sprite.add({\n    name: 'scrolling-element',\n    style: {\n      left: function left() {\n        return -this.$parent.scroll.scrollX;\n      },\n      top: function top() {\n        return -this.$parent.scroll.scrollY;\n      }\n    }\n  });\n  $sprite.add = $scrollingElement.add.bind($scrollingElement);\n  $sprite.clear = $scrollingElement.clear.bind($scrollingElement);\n\n  $sprite.getChildren = function () {\n    return $scrollingElement.children;\n  };\n\n  return $sprite;\n};\n\n(0, _browserRegister[\"default\"])(component, 'Scroll');\nvar _default = component;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/Scroll.js?");

/***/ }),

/***/ "./src/components/Sequence.js":
/*!************************************!*\
  !*** ./src/components/Sequence.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _browserRegister = _interopRequireDefault(__webpack_require__(/*! ./_browserRegister.js */ \"./src/components/_browserRegister.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/** ********** *\n *\n * Sequence Sprite Animation\n *\n * ********** **/\nvar component = function component(opt, Easycanvas) {\n  var funcOrValue = Easycanvas.utils.funcOrValue;\n  var $sprite = new Easycanvas.Sprite(opt);\n  opt.props.index = opt.props.index || 0;\n  $sprite.on('beforeTick', function () {\n    var _props = this.props;\n    var img = funcOrValue(this.content.img, this);\n    if (!img || !img.width) return; // 确立index\n\n    var index = _props.index || 0;\n    if (index < 0) index = 0; // 计算每帧的宽高\n\n    var pw, ph;\n\n    if (_props.frameWidth || _props.frameHeight) {\n      if (_props.frameWidth < 0) {\n        pw = img.width / -_props.frameWidth;\n      } else {\n        pw = _props.frameWidth;\n      }\n\n      if (_props.frameHeight < 0) {\n        ph = img.height / -_props.frameHeight;\n      } else {\n        ph = _props.frameHeight;\n      }\n\n      var wTimes = Math.floor(img.width / pw);\n      var hTimes = Math.floor(img.height / ph);\n      this.style.cutLeft = index % wTimes * pw;\n      this.style.cutTop = Math.floor(index / wTimes) % hTimes * ph;\n    } // 不循环的精灵动画自动移除\n\n\n    if (!_props.loop && index > 0 && this.style.cutLeft === 0 && this.style.cutTop === 0) {\n      this.style.img = undefined;\n\n      if (_props.onOver) {\n        _props.onOver.call(this);\n      } else {\n        this.remove();\n      }\n    } // 判断是否应该下一帧\n\n\n    _props.lastFrameTime = _props.lastFrameTime || 0;\n\n    if (this.$canvas.$nextTickTime - _props.lastFrameTime >= funcOrValue(_props.interval, this)) {\n      _props.lastFrameTime = this.$canvas.$nextTickTime;\n      _props.index++;\n    } // 默认的读取和绘制尺寸等于每帧尺寸\n\n\n    this.style.cutWidth = this.style.cutWidth || pw;\n    this.style.cutHeight = this.style.cutHeight || ph;\n    this.style.width = this.style.width || pw;\n    this.style.height = this.style.height || ph;\n  });\n  return $sprite;\n};\n\n(0, _browserRegister[\"default\"])(component, 'Sequence');\nvar _default = component;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/Sequence.js?");

/***/ }),

/***/ "./src/components/Text.js":
/*!********************************!*\
  !*** ./src/components/Text.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _browserRegister = _interopRequireDefault(__webpack_require__(/*! ./_browserRegister.js */ \"./src/components/_browserRegister.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/** ********** *\n *\n * Text\n * - TODO.\n *\n * ********** **/\nvar component = function component(opt, Easycanvas) {\n  var $sprite;\n  var option = opt || {};\n  option.name = option.name || 'Text';\n  option.content = option.content || {};\n  option.content.text = option.text;\n  $sprite = new Easycanvas.Sprite(option);\n  Object.defineProperty($sprite, 'text', {\n    get: function get() {\n      return $sprite.content.text || '';\n    },\n    set: function set(value) {\n      $sprite.content.text = value;\n    }\n  }); // $sprite.update = function (obj) {\n  //     this.__proto__.update.call(this, obj);\n  // };\n\n  return $sprite;\n};\n\n(0, _browserRegister[\"default\"])(component, 'Text');\nvar _default = component;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/Text.js?");

/***/ }),

/***/ "./src/components/View.js":
/*!********************************!*\
  !*** ./src/components/View.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _browserRegister = _interopRequireDefault(__webpack_require__(/*! ./_browserRegister.js */ \"./src/components/_browserRegister.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/** ********** *\n *\n * Image\n *\n * ********** **/\nvar component = function component(opt, Easycanvas) {\n  var $sprite;\n  var option = opt || {};\n  option.name = option.name || 'View';\n  $sprite = new Easycanvas.Sprite(option);\n  return $sprite;\n};\n\n(0, _browserRegister[\"default\"])(component, 'View');\nvar _default = component;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/View.js?");

/***/ }),

/***/ "./src/components/_browserRegister.js":
/*!********************************************!*\
  !*** ./src/components/_browserRegister.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar inBrowser = typeof window !== 'undefined';\n\nvar _default = function _default(component, name) {\n  if (inBrowser && window.Easycanvas) {\n    Easycanvas[name] = function (opt) {\n      return component(opt, Easycanvas);\n    };\n  }\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/_browserRegister.js?");

/***/ }),

/***/ "./src/components/_text2image.js":
/*!***************************************!*\
  !*** ./src/components/_text2image.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n// （多行）文本转图片\n// textRendering(String, {fontSize: 30, width: 125, color: '#333'});\n// 返回图片（实际是<canvas>对象），包含.width/.height属性\nvar cachePool = {};\nvar nextLine = '\\n'.slice(0, 1);\n\nvar textRendering = function textRendering(_text, config) {\n  var text = String(_text);\n  var cacheFlag = text + JSON.stringify(config);\n  config.fontSize = config.fontSize || 16;\n\n  if (cachePool[cacheFlag]) {\n    return cachePool[cacheFlag];\n  } // var now = Date.now();\n\n\n  var padding;\n\n  if (config.padding) {\n    padding = config.padding.split(' ');\n    padding = padding.map(function (str) {\n      return parseInt(str);\n    });\n    padding[1] = Number(padding[1] || padding[0]);\n    padding[2] = Number(padding[2] || padding[0]);\n    padding[3] = Number(padding[3] || padding[1]);\n  } else {\n    padding = [0, 0, 0, 0];\n  }\n\n  var width = config.minWidth || config.width || (config.fontSize || 16) * text.length + padding[1] + padding[3] + 100;\n  var minLines = text.split('\\n').length;\n  var height = config.fontSize * (Math.round(text.length) / width + minLines - 1) * (config.lineHeight || config.fontSize) + padding[0] + padding[2] + 100; // console.warn(width, height);\n\n  var tempCanvas = document.createElement('canvas'); // document.body.appendChild(tempCanvas);\n\n  tempCanvas.width = width;\n  tempCanvas.height = height;\n  var tempCtx = tempCanvas.getContext('2d');\n  window.tempCanvas = tempCanvas;\n  window.tempCtx = tempCtx; // 确保不支持hanging的手机也能用top\n  // 部分安卓和ios的textBaseline不同，巨坑，换成middle\n  // tempCtx.textBaseline = 'top';\n  // tempCtx.textBaseline = 'hanging';\n\n  tempCtx.textBaseline = 'middle';\n  tempCtx.font = (config.fontStyle ? config.fontStyle + ' ' : '') + config.fontSize + 'px ' + (config.family || 'serif');\n  tempCtx.fillStyle = config.color || '#000';\n  tempCtx.textAlign = config.textAlign || 'left';\n\n  if (true) {\n    var context = [];\n    context.push(\"var tempCanvas = document.createElement('canvas')\");\n    context.push(\"tempCanvas.width=\".concat(tempCanvas.width));\n    context.push(\"tempCanvas.height=\".concat(tempCanvas.height));\n    context.push(\"var tempCtx = tempCanvas.getContext('2d')\");\n    context.push(\"tempCtx.textBaseline='\" + tempCtx.textBaseline + \"'\");\n    context.push(\"tempCtx.font='\" + tempCtx.font + \"'\");\n    context.push(\"tempCtx.fillStyle='\" + tempCtx.fillStyle + \"'\");\n    context.push(\"tempCtx.textAlign='\" + tempCtx.textAlign + \"'\");\n  }\n\n  var drawX = 0;\n  var drawY = config.lineHeight ? (config.lineHeight - config.fontSize) / 2 : 0;\n  var startIndex = 0;\n  var endIndex = 1; // 用-来替换空格\n\n  var realWidth = 0;\n  var lastLineLeft = 0;\n  var lineCount = 1;\n\n  while (true) {\n    lastLineLeft = tempCtx.measureText(text.slice(startIndex, endIndex)).width;\n\n    if (lastLineLeft > config.width) {\n      if (config.textOverflow === 'ellipsis') {\n        // 最后一个字换成三个点\n        endIndex -= 2;\n        tempCtx.fillText(text.slice(startIndex, endIndex) + '...', drawX, drawY + config.fontSize / 2);\n\n        if (true) {\n          context.push(\"tempCtx.fillText('\".concat(text.slice(startIndex, endIndex), \"...', \").concat(drawX, \", \").concat(drawY + config.fontSize / 2, \")\"));\n        }\n\n        drawY += config.fontSize + (config.lineHeight ? (config.lineHeight - config.fontSize) / 2 : 0);\n        lineCount++;\n        realWidth = config.width - padding[1] - padding[3];\n        break;\n      } else {\n        // 换行\n        endIndex -= 1;\n        tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.fontSize / 2);\n\n        if (true) {\n          context.push(\"tempCtx.fillText('\".concat(text.slice(startIndex, endIndex), \"', \").concat(drawX, \", \").concat(drawY + config.fontSize / 2, \")\"));\n        }\n\n        startIndex = endIndex;\n        endIndex = startIndex + 1;\n        drawY += config.fontSize + (config.lineHeight ? (config.lineHeight - config.fontSize) / 2 : 10);\n        lineCount++;\n      }\n    } else {\n      if (endIndex > text.length - 1) {\n        if (lastLineLeft > realWidth) realWidth = lastLineLeft;\n        tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.fontSize / 2);\n\n        if (true) {\n          context.push(\"tempCtx.fillText('\".concat(text.slice(startIndex, endIndex), \"', \").concat(drawX, \", \").concat(drawY + config.fontSize / 2, \")\"));\n        }\n\n        drawY += config.fontSize + (config.lineHeight ? (config.lineHeight - config.fontSize) / 2 : 0);\n        break;\n      } else if (text.slice(endIndex, endIndex + 1) === nextLine) {\n        // 换行\n        tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.fontSize / 2);\n        endIndex += 1;\n        startIndex = endIndex;\n        endIndex = startIndex + 1;\n        drawY += config.fontSize + (config.lineHeight ? (config.lineHeight - config.fontSize) / 2 : 10);\n        lineCount++;\n      }\n\n      if (lastLineLeft > realWidth) realWidth = lastLineLeft;\n      endIndex++;\n    }\n  } // const firstValuable = (a, b) => {\n  //     return typeof a === 'undefined' ? b : a;\n  // },\n\n\n  var finalCanvas = document.createElement('canvas');\n  finalCanvas.lastLineLeft = lastLineLeft;\n  finalCanvas.lineCount = lineCount;\n  finalCanvas.width = Math.max(realWidth + padding[1] + padding[3], config.minWidth || 0);\n  finalCanvas.height = drawY + padding[0] + padding[2];\n  var finalCtx = finalCanvas.getContext('2d');\n\n  if (true) {\n    context.push(\"var finalCanvas=document.createElement('canvas')\");\n    context.push(\"finalCanvas.width=\".concat(finalCanvas.width));\n    context.push(\"finalCanvas.height=\".concat(finalCanvas.height));\n    context.push(\"var finalCtx = finalCanvas.getContext('2d')\");\n  }\n\n  if (config.backgroundColor) {\n    finalCtx.fillStyle = config.backgroundColor;\n    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);\n\n    if (true) {\n      context.push(\"finalCtx.fillStyle=\".concat(finalCtx.fillStyle));\n      context.push(\"finalCtx.fillRect(0, 0, \".concat(finalCanvas.width, \", \").concat(finalCanvas.height, \")\"));\n    }\n  } // finalCtx.drawImage(tempCanvas, padding[3], padding[0]);\n\n\n  finalCtx.drawImage(tempCanvas, (finalCanvas.width - realWidth) / 2, padding[0]); // document.body.prepend(finalCanvas);\n\n  if (config.border) {\n    var border = config.border.split(' ');\n    var borderStyle = border.pop(); // ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/\n\n    if (border[border.length - 1] === 'solid') border.pop();\n    var borderTop = border[0];\n    var borderRight = border[1] || borderTop;\n    var borderBottom = border[2] || borderTop;\n    var borderLeft = border[3] || borderRight || borderTop;\n    borderTop = parseInt(borderTop);\n    borderRight = parseInt(borderRight);\n    borderBottom = parseInt(borderBottom);\n    borderLeft = parseInt(borderLeft);\n    var borderRadius = config.borderRadius || 0;\n    finalCtx.beginPath();\n    finalCtx.strokeStyle = borderStyle;\n\n    if (borderTop) {\n      finalCtx.lineWidth = borderTop;\n      finalCtx.moveTo(borderLeft ? borderRadius : 0, 0);\n      finalCtx.lineTo(finalCanvas.width - (borderRight ? borderRadius : 0), 0);\n    }\n\n    if (borderRight) {\n      finalCtx.lineWidth = borderRight;\n      finalCtx.moveTo(finalCanvas.width, borderTop ? borderRadius : 0);\n      finalCtx.lineTo(finalCanvas.width, finalCanvas.height - (borderBottom ? borderRadius : 0));\n    }\n\n    if (borderBottom) {\n      finalCtx.lineWidth = borderBottom;\n      finalCtx.moveTo(borderLeft ? borderRadius : 0, finalCanvas.height);\n      finalCtx.lineTo(finalCanvas.width - (borderRight ? borderRadius : 0), finalCanvas.height);\n    }\n\n    if (borderLeft) {\n      finalCtx.lineWidth = borderLeft;\n      finalCtx.moveTo(0, borderTop ? borderRadius : 0);\n      finalCtx.lineTo(0, finalCanvas.height - (borderBottom ? borderRadius : 0));\n    }\n\n    finalCtx.stroke();\n\n    if (borderRadius) {\n      var c = document.createElement('canvas');\n      var fontSize = Math.min(finalCanvas.width, finalCanvas.height);\n      c.width = c.height = fontSize;\n      var ctx = c.getContext('2d');\n      ctx.beginPath();\n      ctx.strokeStyle = borderStyle;\n      ctx.arc(fontSize >> 1, fontSize >> 1, (fontSize >> 1) - 1, 0, 2 * Math.PI);\n      ctx.stroke();\n\n      if (borderTop && borderRight) {\n        finalCtx.drawImage(c, fontSize >> 1, 0, fontSize >> 1, fontSize >> 1, finalCanvas.width - borderRadius, 0, borderRadius, borderRadius);\n      }\n\n      if (borderBottom && borderRight) {\n        finalCtx.drawImage(c, fontSize >> 1, fontSize >> 1, fontSize >> 1, fontSize >> 1, finalCanvas.width - borderRadius, finalCanvas.height - borderRadius, borderRadius, borderRadius);\n      }\n\n      if (borderTop && borderLeft) {\n        finalCtx.drawImage(c, 0, 0, fontSize >> 1, fontSize >> 1, 0, 0, borderRadius, borderRadius);\n      }\n\n      if (borderBottom && borderLeft) {\n        finalCtx.drawImage(c, 0, fontSize >> 1, fontSize >> 1, fontSize >> 1, 0, finalCanvas.height - borderRadius, borderRadius, borderRadius);\n      }\n    } // TODO\n    // if (process.env.NODE_ENV !== 'production') {\n    //     context.push(`finalCtx.fillStyle=${finalCtx.fillStyle}`);\n    //     context.push(`finalCtx.fillRect(0, 0, ${finalCanvas.width}, ${finalCanvas.height})`);\n    // }\n\n  } // console.warn(Date.now() - now);\n\n\n  if (true) {\n    finalCanvas.$origin = context;\n  }\n\n  cachePool[cacheFlag] = finalCanvas;\n  return finalCanvas; // var image = new Image();\n  // image.src = finalCanvas.toDataURL();\n  // image.width = finalCanvas.width;\n  // image.height = finalCanvas.height;\n  // return image;\n};\n\nvar _default = textRendering;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/_text2image.js?");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./src/components.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/components.js */\"./src/components.js\");\n\n\n//# sourceURL=webpack:///multi_./src/components.js?");

/***/ })

/******/ })));