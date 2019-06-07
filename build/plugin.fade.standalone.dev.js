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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin.fade.js":
/*!****************************!*\
  !*** ./src/plugin.fade.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n *  fade插件: 淡出效果\n *  核心算法见下方transitions对象\n *  其中sprite.$fade.originImg是sprite的一个screenshot\n *\n */\nvar particleBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=';\nvar particleImage = new Image();\nparticleImage.src = particleBase64;\nvar utils;\n/*\n *  transitions: 算法函数集合\n *  @params transition: 当前渐变相关参数的集合，例如进度、原子图的base64\n *  @params ctx: 对应sprite.$fade.filterCxt, 取代原图片的convas对象，当前sprite呈现给用户的最终画面（一般通过screenshot变幻得来）\n *  @params ctx2: 对应sprite.$fade.middlewareCxt, 一些复杂的动画用到的临时对象，向ctx提供服务\n *\n */\n\nvar transitions = {\n  // 水滴效果\n  drip: function drip(transition, ctx, ctx2) {\n    var subtype = transition.subtype || 1; // ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';\n    // ctx.fillRect(0, 0, this.style.width, this.style.height);\n\n    ctx.clearRect(0, 0, this.style.width, this.style.height);\n    ctx.globalCompositeOperation = 'source-over';\n    ctx.globalAlpha = 1;\n    subtype === 1 && ctx.drawImage(particleImage, (this.style.width >> 1) - (this.style.width >> 1) * transition.progress * 2, (this.style.height >> 1) - (this.style.height >> 1) * transition.progress * 2, this.style.width * transition.progress * 2, this.style.height * transition.progress * 2);\n    subtype !== 1 && ctx.drawImage(particleImage, (this.style.width >> 1) - (this.style.width >> 1) * (1 - transition.progress) * 2, (this.style.height >> 1) - (this.style.height >> 1) * (1 - transition.progress) * 2, this.style.width * (1 - transition.progress) * 2, this.style.height * (1 - transition.progress) * 2);\n    ctx.globalCompositeOperation = subtype === 1 ? 'source-out' : 'source-in';\n    ctx.globalAlpha = Math.max(1 - transition.progress, 0);\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);\n  },\n  // 开门效果\n  door: function door(transition, ctx, ctx2) {\n    var subtype = transition.subtype || 1;\n    var rx = 0,\n        ry = 0; // 1234上右下左\n\n    if (subtype === 1) {\n      rx = this.style.width / 2;\n    } else if (subtype === 2) {\n      rx = this.style.width;\n      ry = this.style.height / 2;\n    } else if (subtype === 3) {\n      rx = this.style.width / 2;\n      ry = this.style.height;\n    } else if (subtype === 4) {\n      ry = this.style.height / 2;\n    }\n\n    ctx.clearRect(0, 0, this.style.width, this.style.height); // ctx.fillStyle = 'rgba(0,0,0, 0.1)';\n    // ctx.fillRect(0, 0, this.style.width, this.style.height);\n\n    ctx.save();\n    ctx.translate(rx, ry);\n    ctx.rotate((subtype < 3 ? 1 : -1) * 90 * 3.14 / 180 * transition.progress);\n    ctx.translate(-rx, -ry);\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0, rx || this.style.width, this.style.height - ry || ry, 0, 0, rx || this.style.width, this.style.height - ry || ry);\n    ctx.restore();\n    ctx.save();\n    ctx.translate(rx, ry);\n    ctx.rotate((subtype < 3 ? -1 : 1) * 90 * 3.14 / 180 * transition.progress);\n    ctx.translate(-rx, -ry);\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), subtype < 4 ? this.style.width - rx : 0, subtype < 3 ? ry : subtype < 4 ? 0 : ry, this.style.width - rx || rx, this.style.height - ry || ry, subtype < 4 ? this.style.width - rx : 0, subtype < 3 ? ry : subtype < 4 ? 0 : ry, this.style.width - rx || rx, this.style.height - ry || ry);\n    ctx.restore();\n  },\n  // 整体旋转\n  rotate: function rotate(transition, ctx, ctx2) {\n    var subtype = transition.subtype || 1;\n    var rx = 0,\n        ry = 0; // 1234上右下左\n\n    if (subtype === 1) {\n      rx = this.style.width;\n    } else if (subtype === 2) {\n      rx = this.style.width;\n      ry = this.style.height;\n    } else if (subtype === 3) {\n      ry = this.style.height;\n    }\n\n    ctx.clearRect(0, 0, this.style.width, this.style.height); // ctx.fillStyle = 'rgba(0,0,0, 0.1)';\n    // ctx.fillRect(0, 0, this.style.width, this.style.height);\n\n    ctx.save();\n    ctx.translate(rx, ry);\n    ctx.rotate(90 * 3.14 / 180 * transition.progress);\n    ctx.translate(-rx, -ry);\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);\n    ctx.restore();\n  },\n  // 印刷效果\n  print: function print(transition, ctx, ctx2) {\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0);\n    var subtype = transition.subtype || 1; // 1234 上左下右\n\n    subtype === 1 && ctx.clearRect(0, 0, this.style.width, transition.progress * this.style.height);\n    subtype === 2 && ctx.clearRect(0, 0, transition.progress * this.style.width, this.style.height);\n    subtype === 3 && ctx.clearRect(0, (1 - transition.progress) * this.style.height, this.style.width, this.style.height);\n    subtype === 4 && ctx.clearRect((1 - transition.progress) * this.style.width, 0, this.style.width, this.style.height);\n  },\n  // 带渐变的印刷效果\n  \"switch\": function _switch(transition, ctx, ctx2) {\n    var progress = transition.progress * 1.3;\n\n    if (progress === 0) {\n      ctx2.fillStyle = 'rgba(0, 0, 0, 1)';\n      ctx2.globalAlpha = 0.2;\n    }\n\n    var subtype = transition.subtype || 1; // 1234 上下左右\n\n    subtype === 1 && ctx2.fillRect(0, 0, this.style.width, progress * this.style.height);\n    subtype === 2 && ctx2.fillRect(0, 0, progress * this.style.width, this.style.height);\n    subtype === 3 && ctx2.fillRect(0, (1 - progress) * this.style.height, this.style.width, this.style.height);\n    subtype === 4 && ctx2.fillRect((1 - progress) * this.style.width, 0, this.style.width, this.style.height);\n    ctx.globalCompositeOperation = 'source-over';\n    ctx.clearRect(0, 0, this.style.width, this.style.height);\n    ctx.drawImage(ctx2.$canvas, 0, 0);\n    ctx.globalCompositeOperation = 'source-out';\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0); // let subtype = transition.subtype;\n    // // 1234 上下左右\n    // subtype === 1 && ctx.clearRect(0, 0, this.style.width, transition.progress * this.style.height);\n    // subtype === 2 && ctx.clearRect(0, (1 - transition.progress) * this.style.height, this.style.width, this.style.height);\n    // subtype === 3 && ctx.clearRect(0, 0, transition.progress * this.style.width, this.style.height);\n    // subtype === 4 && ctx.clearRect((1 - transition.progress) * this.style.width, 0, this.style.width, this.style.height);\n  },\n  // 笔划扩散效果\n  sweep: function sweep(transition, ctx, ctx2) {\n    if (!transition.particleData.length) {\n      var subtype = transition.subtype || 1;\n      var hwRate = this.style.height / this.style.width;\n\n      for (var i = 0; i < this.style.width / 50; i++) {\n        subtype === 1 && transition.particleData.push({\n          x: 50 * i + Math.random() * this.style.width / 5 / 2 - this.style.width / 5,\n          y: 50 * hwRate * i + Math.random() * this.style.height / 5 / 2 - this.style.height / 5,\n          size: 100 - i\n        });\n        subtype === 2 && transition.particleData.push({\n          x: this.style.width - (50 * i + Math.random() * this.style.width / 5 / 2 - this.style.width / 5),\n          y: 50 * hwRate * i + Math.random() * this.style.height / 5 / 2 - this.style.height / 5,\n          size: 100 - i\n        });\n        subtype === 3 && transition.particleData.push({\n          x: this.style.width / 2,\n          y: 50 * hwRate * i + Math.random() * this.style.height / 5 / 2 - this.style.height / 5,\n          size: 100 - i\n        });\n        subtype === 4 && transition.particleData.push({\n          x: 50 * hwRate * i + Math.random() * this.style.width / 5 / 2 - this.style.width / 5,\n          y: this.style.height / 2,\n          size: 100 - i\n        });\n      }\n    } // ctx2.fillStyle = 'rgba(0, 0, 0, 0)';\n\n\n    ctx2.fillStyle = 'rgba(0, 0, 0, 0.005)';\n    ctx2.fillRect(0, 0, this.style.width, this.style.height);\n    ctx2.globalAlpha = transition.progress * transition.progress;\n    transition.particleData.forEach(function (p, i) {\n      if (p.size > transition.size + transition.minsize) return;\n      ctx2.drawImage(particleImage, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);\n      p.size = transition.progress * transition.size * 1.3;\n    });\n    ctx.globalCompositeOperation = 'source-over';\n    ctx.clearRect(0, 0, this.style.width, this.style.height);\n    ctx.drawImage(ctx2.$canvas, 0, 0);\n    ctx.globalCompositeOperation = 'source-out';\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);\n  },\n  // 流淌淡出效果\n  flow: function flow(transition, ctx, ctx2) {\n    var _this = this;\n\n    if (!transition.particleData.length) {\n      for (var i = 0; i < this.style.width / 50; i++) {\n        transition.particleData.push({\n          x: -100 + i * 50 + Math.random() * 40 - 20,\n          y: -Math.random() * 200 - 300,\n          extra: Math.random() * 20\n        });\n      }\n    }\n\n    ctx2.fillStyle = 'rgba(0, 0, 0, 0.01)';\n    ctx2.fillRect(0, 0, this.style.width, this.style.height);\n    transition.particleData.forEach(function (p) {\n      ctx2.drawImage(particleImage, p.x, p.y, 200, 200);\n      p.y += 1 / transition.ticks * _this.style.height + p.extra;\n    });\n    ctx.globalCompositeOperation = 'source-over';\n    ctx.clearRect(0, 0, this.style.width, this.style.height);\n    ctx.drawImage(ctx2.$canvas, 0, 0);\n    ctx.globalCompositeOperation = 'source-out';\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);\n  },\n  // 螺旋渐变\n  spiral: function spiral(transition, ctx, ctx2) {\n    var subtype = transition.subtype || 1;\n    ctx2.translate(this.style.width / 2, this.style.height / 2);\n    ctx2.rotate(360 / transition.ticks * 3 * 3.14 / 180 * transition.progress);\n    ctx2.translate(-this.style.width / 2, -this.style.height / 2);\n    ctx2.globalAlpha = transition.progress * transition.progress;\n    ctx2.fillStyle = 'rgba(0, 0, 0, 1)';\n    ctx2.fillRect(this.style.width / 2 - transition.size * transition.progress / 2, this.style.height / 2 - transition.size * transition.progress / 2, transition.size * transition.progress, transition.size * transition.progress);\n    ctx.globalCompositeOperation = 'source-over';\n    ctx.clearRect(0, 0, this.style.width, this.style.height);\n    ctx.drawImage(ctx2.$canvas, 0, 0);\n    ctx.globalCompositeOperation = 'source-out';\n    ctx.drawImage(utils.funcOrValue(this.$fade.originImg, this), 0, 0);\n  }\n};\n\nvar fade = function fade(Easycanvas) {\n  utils = Easycanvas.utils;\n\n  Easycanvas.Sprite.prototype.fade = function (_ref) {\n    var type = _ref.type,\n        ticks = _ref.ticks,\n        subtype = _ref.subtype;\n    var sprite = this;\n\n    if (!sprite.$fade) {\n      sprite.$fade = {\n        originImg: sprite.content.img,\n        filterCanvas: document.createElement('canvas'),\n        middlewareCanvas: document.createElement('canvas')\n      }; // if (typeof sprite.$fade.originImg === 'string') {\n      //     sprite.$fade.originImg = Easycanvas.ImgLoader(sprite.$fade.originImg);\n      // }\n\n      sprite.$fade.filterCanvas.width = sprite.$fade.middlewareCanvas.width = sprite.style.width;\n      sprite.$fade.filterCanvas.height = sprite.$fade.middlewareCanvas.height = sprite.style.height;\n      sprite.$fade.filterCxt = sprite.$fade.filterCanvas.getContext('2d');\n      sprite.$fade.middlewareCxt = sprite.$fade.middlewareCanvas.getContext('2d');\n      sprite.$fade.filterCxt.$canvas = sprite.$fade.filterCanvas;\n      sprite.$fade.middlewareCxt.$canvas = sprite.$fade.middlewareCanvas;\n    } // debug\n    // let debugCanvasDom = sprite.$fade.middlewareCanvas;\n    // document.body.appendChild(debugCanvasDom);\n    // debugCanvasDom.style.position = 'fixed';\n    // debugCanvasDom.style.left = 0;\n    // debugCanvasDom.style.top = 0;\n    // debugCanvasDom.style.zIndex = 999;\n    // debugCanvasDom.style.width = '30%';\n    // debugCanvasDom.style.height = '30%';\n\n\n    var transition = {\n      ticks: 0,\n      progress: 0,\n      callback: false,\n      particleData: []\n    };\n    transition.ticks = ticks || 60;\n    transition.subtype = subtype;\n    transition.size = Math.max(sprite.style.width, sprite.style.height);\n    transition.minsize = Math.min(sprite.style.width, sprite.style.height); // screenshot\n\n    {\n      var screenshot = document.createElement('canvas');\n      screenshot.width = utils.funcOrValue(sprite.style.width, sprite);\n      screenshot.height = utils.funcOrValue(sprite.style.height, sprite);\n      var scrctx = screenshot.getContext('2d'); // scrctx.drawImage(sprite.$canvas.$dom, sprite.getStyle('tx'), sprite.getStyle('ty'), sprite.getStyle('tw'), sprite.getStyle('th'));\n      // scrctx.drawImage(sprite.$canvas.$dom, sprite.$props.tx, sprite.$props.ty);\n\n      scrctx.drawImage(sprite.$canvas.$dom, sprite.$props.tx, sprite.$props.ty, sprite.$props.tw, sprite.$props.th, 0, 0, sprite.$props.tw, sprite.$props.th);\n      sprite.$fade.originImg = screenshot;\n      sprite.children = []; // document.body.prepend(screenshot)\n    }\n    sprite.content.img = sprite.$fade.filterCanvas;\n    sprite.on('beforeTick', function beforeTick() {\n      if (!sprite.$fade) {\n        return;\n      }\n\n      transitions[type || 'drip'].call(sprite, transition, sprite.$fade.filterCxt, sprite.$fade.middlewareCxt);\n\n      if (transition.progress > 1) {\n        sprite.off('beforeTick', beforeTick);\n        sprite.style.opacity = 0; // delete sprite.content.img;\n\n        delete sprite.$fade;\n\n        if (transition.callback) {\n          sprite.$canvas.nextTick(function () {\n            transition.callback.call(sprite);\n          });\n        }\n\n        return;\n      }\n\n      transition.progress += 1 / (ticks || 100);\n    });\n    return {\n      then: function then(callback) {\n        transition.callback = callback;\n      }\n    };\n  };\n\n  Easycanvas.Sprite.prototype.fade.types = [];\n\n  for (var i in transitions) {\n    Easycanvas.Sprite.prototype.fade.types.push(i);\n  }\n}; // fade(Easycanvas);\n\n\nmodule.exports = fade;\n\n//# sourceURL=webpack:///./src/plugin.fade.js?");

/***/ }),

/***/ 2:
/*!**********************************!*\
  !*** multi ./src/plugin.fade.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/plugin.fade.js */\"./src/plugin.fade.js\");\n\n\n//# sourceURL=webpack:///multi_./src/plugin.fade.js?");

/***/ })

/******/ })));