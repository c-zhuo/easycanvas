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

	module.exports = __webpack_require__(48);


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	'use strict';

	var utils = {
	    isArray: Array.isArray || function (arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    },

	    funcOrValue: function funcOrValue(_funcOrValue, _this) {
	        if (typeof _funcOrValue === 'function') {
	            var res = _funcOrValue.call(_this);
	            return res;
	        }

	        return _funcOrValue;
	    },

	    // 执行钩子函数或者钩子函数队列
	    execFuncs: function execFuncs(funcOrArray, _this, _arg) {
	        if (funcOrArray) {
	            if (!utils.isArray(_arg)) {
	                _arg = [_arg];
	            }
	        }

	        if (typeof funcOrArray === 'function') {
	            return funcOrArray.apply(_this, _arg);
	        } else if (utils.isArray(funcOrArray)) {
	            var res = [];
	            funcOrArray.forEach(function (f) {
	                res.push(f && f.apply(_this, _arg));
	            });
	            return res;
	        }
	    },

	    blend: ['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],

	    pointInRect: function pointInRect(x, y, x1, x2, y1, y2) {
	        return !(x < x1 || x > x2 || y < y1 || y > y2);
	    },

	    firstValuable: function firstValuable(a, b, c) {
	        // 效率低
	        // for (let i = 0; i < arguments.length; i++) {
	        //     if (typeof arguments[i] !== 'undefined') {
	        //         return arguments[i];
	        //     }
	        // }
	        return typeof a === 'undefined' ? typeof b === 'undefined' ? c : b : a;
	    }
	};

	module.exports = utils;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

	"use strict";

	var PI = 3.141593;

	module.exports = function (x, y, rx0, ry0, d, returnArr) {
	    var deg = d ? -d / 180 * PI : 0;
	    var _x = (x - rx0) * Math.cos(deg) - (y - ry0) * Math.sin(deg) + rx0;
	    var _y = (x - rx0) * Math.sin(deg) + (y - ry0) * Math.cos(deg) + ry0;

	    if (returnArr) {
	        return [_x, _y];
	    }

	    return {
	        x: _x,
	        y: _y
	    };
	};

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _mathPointRotate = __webpack_require__(4);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var or = _utils2.default.firstValuable;

	var _ec = void 0;

	var shuttle = function shuttle(opt) {
	    var sprite = new _ec.sprite(opt);

	    sprite.style = opt.style;

	    var center = opt.center || {
	        x: opt.style.tw / 2,
	        y: opt.style.th / 2
	    };

	    var data = {
	        passByRotate: false,
	        speed: 2000
	    };

	    sprite.set = function (keys) {
	        for (var i in keys) {
	            data[i] = keys[i];
	        }
	    };

	    opt.background && sprite.add(new _ec.sprite({
	        content: {
	            img: opt.background
	        },
	        style: {
	            tx: 0,
	            ty: 0,
	            tw: opt.style.tw,
	            th: opt.style.th,
	            locate: 'lt'
	        }
	    }));

	    var longest = Math.max(opt.style.tw, opt.style.th) + 100;
	    var getResultPoint = function getResultPoint(deg) {
	        return (0, _mathPointRotate2.default)(longest, 0, 0, 0, deg);
	    };

	    sprite.hooks = {
	        ticked: function ticked() {
	            if (Math.random() < 0.8) return;

	            var deg = Math.random() * 360;
	            var result = getResultPoint(deg);
	            var randomImg = opt.passBy[Math.floor(deg) % opt.passBy.length];

	            if (randomImg) {
	                var child = new _ec.sprite({
	                    content: {
	                        img: randomImg
	                    },
	                    style: {
	                        tx: Easycanvas.transition.linear(center.x, center.x + result.x, data.speed),
	                        ty: Easycanvas.transition.linear(center.y, center.y + result.y, data.speed),
	                        rotate: deg - 90,
	                        tw: Easycanvas.transition.linear(1, randomImg.width * 2, data.speed),
	                        th: Easycanvas.transition.linear(1, randomImg.height * 2, data.speed)
	                    }
	                });

	                if (data.passByRotate) {
	                    child.style.rx = center.x;
	                    child.style.ry = center.y;
	                    child.style.rotate = Easycanvas.transition.linear(0, 360, data.speed);
	                }

	                sprite.add(child);
	                setTimeout(function () {
	                    child.remove();
	                }, data.speed);
	            }

	            if (Math.random() > data.passInRate) return;

	            var circle = new _ec.sprite({
	                content: {
	                    img: opt.passIn[0]
	                },
	                style: {
	                    tx: Easycanvas.transition.linear(center.x, center.x + result.x / 10, data.speed),
	                    ty: Easycanvas.transition.linear(center.y, center.y + result.y / 10, data.speed),
	                    rotate: deg,
	                    tw: Easycanvas.transition.linear(10, center.x * 4, data.speed),
	                    th: Easycanvas.transition.linear(10, center.x * 4, data.speed),
	                    opacity: Easycanvas.transition.linear(5, 0.15, data.speed)
	                }
	            });
	            sprite.add(circle);
	            setTimeout(function () {
	                circle.remove();
	            }, data.speed);
	        }
	    };

	    return sprite;
	};

	if (window && window.Easycanvas) {
	    _ec = window.Easycanvas;
	    _ec.class.shuttle = shuttle;
	}

	module.exports = function (ec) {
	    _ec = ec;
	    ec.class.shuttle = shuttle;
	};

/***/ })

/******/ })
});
;