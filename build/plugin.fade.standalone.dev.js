(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43);


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    funcOrValue: function funcOrValue(_funcOrValue, _this) {
	        if (typeof _funcOrValue === 'function') {
	            var res = _funcOrValue.call(_this);
	            return res;
	        }

	        return _funcOrValue;
	    },

	    // 执行钩子函数或者钩子函数队列
	    execFuncs: function execFuncs(funcOrArray, _this, _arg) {
	        if (typeof funcOrArray === 'function') {
	            funcOrArray.apply(_this, _arg);
	        } else if (Array.prototype.isPrototypeOf(funcOrArray)) {
	            funcOrArray.forEach(function (f) {
	                f && f.apply(_this);
	            });
	        }
	    },

	    blend: ['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],

	    pointInRect: function pointInRect(x, y, x1, x2, y1, y2) {
	        return !(x < x1 || x > x2 || y < y1 || y > y2);
	    },

	    firstValuable: function firstValuable(a, b) {
	        return typeof a === 'undefined' ? b : a;
	    }
	};

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var particleBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=';
	var particleImage = new Image();
	particleImage.src = particleBase64;

	var transitions = {
	    drip: function drip(transition, ctx, ctx2) {
	        // ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
	        // ctx.fillRect(0, 0, this.style.tw, this.style.th);
	        ctx.clearRect(0, 0, this.style.tw, this.style.th);

	        ctx.globalCompositeOperation = 'source-over';
	        ctx.globalAlpha = 1;
	        ctx.drawImage(particleImage, (this.style.tw >> 1) - (this.style.tw >> 1) * transition.progress * 2, (this.style.th >> 1) - (this.style.th >> 1) * transition.progress * 2, this.style.tw * transition.progress * 2, this.style.th * transition.progress * 2);

	        ctx.globalCompositeOperation = 'source-out';
	        ctx.globalAlpha = Math.max(1 - transition.progress, 0);
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
	    },

	    flow: function flow(transition, ctx, ctx2) {
	        var _this = this;

	        if (!transition.particleData.length) {
	            for (var i = 0; i < this.style.tw / 50; i++) {
	                transition.particleData.push({
	                    x: -100 + i * 50 + Math.random() * 40 - 20,
	                    y: -Math.random() * 200 - 300,
	                    extra: Math.random() * 20
	                });
	            }
	        }

	        ctx2.fillStyle = 'rgba(0, 0, 0, 0.01)';
	        ctx2.fillRect(0, 0, this.style.tw, this.style.th);
	        transition.particleData.forEach(function (p) {
	            ctx2.drawImage(particleImage, p.x, p.y, 200, 200);
	            p.y += 1 / transition.ticks * _this.style.th + p.extra;
	        });

	        ctx.globalCompositeOperation = 'source-over';
	        ctx.clearRect(0, 0, this.style.tw, this.style.th);
	        ctx.drawImage(ctx2.$canvas, 0, 0);
	        ctx.globalCompositeOperation = 'source-out';
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
	    }
	};

	window.Easycanvas.class.sprite.prototype.fade = function (_ref) {
	    var type = _ref.type,
	        ticks = _ref.ticks;

	    var sprite = this;

	    if (!sprite.$fade) {
	        sprite.$fade = {
	            originImg: sprite.content.img,
	            filterCanvas: document.createElement('canvas'),
	            middlewareCanvas: document.createElement('canvas')
	        };

	        // if (typeof sprite.$fade.originImg === 'string') {
	        //     sprite.$fade.originImg = Easycanvas.imgLoader(sprite.$fade.originImg);
	        // }

	        sprite.$fade.filterCanvas.width = sprite.$fade.middlewareCanvas.width = sprite.style.tw;
	        sprite.$fade.filterCanvas.height = sprite.$fade.middlewareCanvas.height = sprite.style.th;
	        sprite.$fade.filterCxt = sprite.$fade.filterCanvas.getContext('2d');
	        sprite.$fade.middlewareCxt = sprite.$fade.middlewareCanvas.getContext('2d');

	        sprite.$fade.filterCxt.$canvas = sprite.$fade.filterCanvas;
	        sprite.$fade.middlewareCxt.$canvas = sprite.$fade.middlewareCanvas;
	    }

	    var transition = {
	        ticks: 0,
	        progress: 0,
	        callback: false,
	        particleData: []
	    };

	    transition.ticks = ticks || 60;

	    // screenshot
	    {
	        var screenshot = document.createElement('canvas');
	        screenshot.width = _utils2.default.funcOrValue(sprite.style.tw, sprite);
	        screenshot.height = _utils2.default.funcOrValue(sprite.style.th, sprite);
	        var scrctx = screenshot.getContext('2d');
	        scrctx.drawImage(sprite.$canvas.$dom, sprite.$cache.tx, sprite.$cache.ty);
	        sprite.$fade.originImg = screenshot;
	        sprite.children = [];
	    }

	    sprite.content.img = sprite.$fade.filterCanvas;

	    sprite.on('beforeTick', function beforeTick() {
	        if (!sprite.$fade) {
	            return;
	        }

	        transitions[type || 'drip'].call(sprite, transition, sprite.$fade.filterCxt, sprite.$fade.middlewareCxt);

	        if (transition.progress > 1) {
	            sprite.off('beforeTick', beforeTick);
	            // delete sprite.content.img;
	            delete sprite.$fade;

	            if (transition.callback) {
	                sprite.$canvas.nextTick(function () {
	                    transition.callback(sprite);
	                });
	            }

	            return;
	        }

	        transition.progress += 1 / (ticks || 100);
	    });

	    return {
	        then: function then(callback) {
	            transition.callback = callback;
	        }
	    };
	};

/***/ })

/******/ })
});
;