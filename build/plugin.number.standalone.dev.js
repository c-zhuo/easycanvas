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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin.number.js":
/*!******************************!*\
  !*** ./src/plugin.number.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _ec;\n\nvar number = function number(opt) {\n  var sprite = new _ec[\"class\"].sprite(opt);\n  sprite.style = opt.style;\n  sprite.content.img = opt.number;\n  sprite.style.cutLeft = 0;\n  sprite.style.cutWidth = sprite.style.cutWidth || opt.number.width;\n  sprite.style.cutHeight = Math.floor(sprite.cutHeight || opt.number.height / 10);\n  var tick = 0;\n  var data = {\n    tick: Math.floor((opt.interval || 1000) / 16.6),\n    heightRate: 1,\n    numberHeight: sprite.cutHeight,\n    current: 0,\n    stop: false\n  };\n\n  sprite.set = function (keys) {\n    for (var i in keys) {\n      data[i] = keys[i];\n    }\n  };\n\n  sprite.getCurrentValue = function () {\n    return data.current;\n  };\n\n  sprite.setCurrentValue = function (value) {\n    data.current = value;\n    sprite.style.cutTop = data.current * data.heightRate * data.numberHeight;\n  };\n\n  sprite.scrollToValue = function (value, time) {\n    data.current = value;\n    sprite.style.cutTop = _ec.transition.linear(sprite.getStyle('sy'), data.current * data.heightRate * data.numberHeight, time || 200);\n  };\n\n  sprite.stop = function () {\n    data.stop = true;\n  };\n\n  sprite.restart = function () {\n    data.stop = false;\n    data.current = 0;\n    sprite.style.cutTop = 0;\n    tick = 0;\n  };\n\n  sprite.hooks = {\n    ticked: function ticked() {\n      if (data.stop || ++tick <= data.tick) return;\n      tick = 1;\n      data.current++;\n      sprite.style.cutTop = data.current * data.heightRate * data.numberHeight;\n\n      if (data.current > 9) {\n        sprite.style.cutTop = 0;\n        data.current = 0;\n      }\n    }\n  };\n  return sprite;\n};\n\nif (window && window.Easycanvas) {\n  _ec = window.Easycanvas;\n  _ec[\"class\"].number = number;\n}\n\nmodule.exports = function (ec) {\n  _ec = ec;\n  ec[\"class\"].number = number;\n};\n\n//# sourceURL=webpack:///./src/plugin.number.js?");

/***/ }),

/***/ 5:
/*!************************************!*\
  !*** multi ./src/plugin.number.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/plugin.number.js */\"./src/plugin.number.js\");\n\n\n//# sourceURL=webpack:///multi_./src/plugin.number.js?");

/***/ })

/******/ })));