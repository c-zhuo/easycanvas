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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var utils = {
	    isArray: Array.isArray || function (arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    },

	    funcOrValue: function funcOrValue(_funcOrValue, _this) {
	        if (typeof _funcOrValue === 'function') {
	            return _funcOrValue.call(_this);
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
	            // return funcOrArray.apply(_this, _arg);
	            funcOrArray.apply(_this, _arg);
	        } else if (utils.isArray(funcOrArray)) {
	            // 返回值没用到
	            // let res = [];
	            // funcOrArray.length && funcOrArray.forEach((f) => {
	            //     res.push(f && f.apply(_this, _arg));
	            // });
	            // return res;

	            funcOrArray.length && funcOrArray.forEach(function (f) {
	                f && f.apply(_this, _arg);
	            });
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
	        // return a === undefined ? (b === undefined ? c : b) : a;
	        return typeof a === 'undefined' ? typeof b === 'undefined' ? c : b : a;
	    }
	};

	module.exports = utils;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	var PI = 3.141593;

	module.exports = function (x, y, rx0, ry0, d, returnArr) {
	    var deg = d ? -d / 180 * PI : 0;
	    var _x = x,
	        _y = y;

	    if (d) {
	        _x = (x - rx0) * Math.cos(deg) - (y - ry0) * Math.sin(deg) + rx0;
	        _y = (x - rx0) * Math.sin(deg) + (y - ry0) * Math.cos(deg) + ry0;
	    }

	    if (returnArr) {
	        return [_x, _y];
	    }

	    return {
	        x: _x,
	        y: _y
	    };
	};

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    xywh: ['sx', 'sy', 'sw', 'sh', 'tx', 'ty', 'tw', 'th'],
	    txywh: ['tx', 'ty', 'tw', 'th'],
	    sxywh: ['sx', 'sy', 'sw', 'sh'],
	    devFlag: '__EASYCANVAS_DEVTOOL__',
	    version: '0.7.2'
	};

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** ********** *
	 *
	 * Load images
	 * - Easycanvas.imgLoader.cacheCanvas
	 *
	 * ********** **/

	var Cache = {};
	var BlockingImgs = [];
	var ProcessingFlag = 'processing';

	var blockingAmount = 0;

	var loader = function loader(url, callback, option) {
	    var _option = option || {};
	    var cacheCanvas = loader.cacheCanvas;

	    if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
	        var imgs = url;
	        _option.callbackArgs = _option.callbackArgs || [];
	        loader(imgs.shift(), function (perImg) {
	            _option.callbackArgs.push(perImg);
	            if (imgs.length > 1) {
	                loader(imgs, callback, _option);
	            } else {
	                loader(imgs[0], function (lastImg) {
	                    _option.callbackArgs.push(lastImg);
	                    callback(_option.callbackArgs);
	                }, _option);
	            }
	        }, option);
	        return;
	    }

	    var cacheNamespace = url + '_' + JSON.stringify(option) + '_' + cacheCanvas;

	    if (Cache[cacheNamespace]) {
	        if (callback) {
	            if (Cache[cacheNamespace].width && callback) {
	                callback(Cache[cacheNamespace]);
	            } else {
	                setTimeout(function () {
	                    loader(url, callback, option);
	                }, 100);
	            }
	            return;
	        } else {
	            return Cache[cacheNamespace];
	        }
	    }
	    // todo: 多个loader加载同一图片，目前只触发一个callback；待补充

	    var i = new Image();

	    if (_option.block) {
	        i.src = url;
	        blockingAmount++;
	    } else if (blockingAmount === 0) {
	        i.src = url;
	    } else {
	        BlockingImgs.push({
	            imgObj: i,
	            src: url
	        });
	    }

	    Cache[cacheNamespace] = i;

	    var tempCanvas = void 0;
	    if (_option.canvas || _option.alphaColor || cacheCanvas) {
	        tempCanvas = document.createElement('canvas');
	        tempCanvas.width = tempCanvas.height || 0;
	        Cache[cacheNamespace] = tempCanvas;
	    }

	    i.onload = function () {
	        if (i.src.substr(-3) === 'jpg' || i.src.substr(-3) === 'jpeg' || i.src.substr(-3) === 'bmp') {
	            i.$noAlpha = true;
	        } else if (i.src.indexOf('data:image/jpg;') === 0) {
	            i.$noAlpha = true;
	        }

	        if (_option.block) {
	            blockingAmount--;
	            if (blockingAmount === 0) {
	                BlockingImgs.forEach(function (blockingImg) {
	                    blockingImg.imgObj.src = blockingImg.src;
	                });
	                BlockingImgs.splice(0);
	            }
	        }

	        if (tempCanvas && (_option.canvas || _option.alphaColor || cacheCanvas)) {
	            var cts = tempCanvas.getContext('2d');
	            tempCanvas.width = i.width;
	            tempCanvas.height = i.height;
	            tempCanvas.$noAlpha = i.$noAlpha;
	            cts.drawImage(i, 0, 0);

	            if (_option.alphaColor) {
	                var data = cts.getImageData(0, 0, i.width, i.height);
	                var pixel = [];

	                for (var d = 0; d < data.data.length; d += 4) {
	                    var colorWeight = data.data[d] + data.data[d + 1] + data.data[d + 2];
	                    var blackLike = 1;
	                    if (data.data[d] < blackLike && data.data[d + 1] < blackLike && data.data[d + 2] < blackLike) {
	                        data.data[d + 3] = Math.floor(colorWeight / 255);
	                    }
	                }
	                cts.putImageData(data, 0, 0);
	                tempCanvas.$noAlpha = false;
	            }

	            i = tempCanvas;
	        }

	        if (callback) {
	            callback(i);
	        }
	    };

	    i.onerror = function () {
	        Cache[cacheNamespace] = i;
	    };

	    return tempCanvas || i;
	};

	loader.cacheCanvas = false;

	module.exports = loader;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	var ProcessingFlag = 'processing';
	var ProcessingPool = {};

	function toDataURL(url, callback) {
	    if (url && url.match(/^data:/)) {
	        callback && callback(url);
	        return;
	    }

	    if (ProcessingPool[url]) {
	        if (ProcessingPool[url] !== ProcessingFlag) {
	            callback(ProcessingPool[url]);
	        } else {
	            setTimeout(function () {
	                toDataURL(url, callback);
	            }, 100);
	        }
	        return;
	    }

	    ProcessingPool[url] = ProcessingFlag;

	    var xhr = new XMLHttpRequest();
	    xhr.onload = function () {
	        var reader = new FileReader();
	        reader.onloadend = function () {
	            ProcessingPool[url] = reader.result;
	            callback && callback(reader.result);
	        };
	        reader.readAsDataURL(xhr.response);
	    };
	    xhr.open('GET', url);
	    xhr.responseType = 'blob';
	    xhr.send();
	}

	module.exports = toDataURL;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _mathPointRotate = __webpack_require__(2);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PI = 3.141593; // 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
	// 用于跳过绘制的判断
	// 用中心点距离+上下左右分离的方式模糊判断

	module.exports = function (x, y, x2, y2, w2, h2, rx, ry, deg) {
	    var _deg = deg ? -deg / 180 * PI : 0;

	    if (_deg) {
	        x = (x - rx) * Math.cos(_deg) - (y - ry) * Math.sin(_deg) + rx;
	        y = (x - rx) * Math.sin(_deg) + (y - ry) * Math.cos(_deg) + ry;
	    }

	    return x >= x2 && x <= x2 + w2 && y >= y2 && y <= y2 + h2;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _mathPointRotate = __webpack_require__(2);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	var _mathPointInRect = __webpack_require__(11);

	var _mathPointInRect2 = _interopRequireDefault(_mathPointInRect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// module.exports = function (x1, y1, w1, h1, x2, y2, w2, h2, rx, ry, deg) {
	//     var cx = x1 + w1 / 2;
	//     var cy = y1 + h1 / 2;

	//     var distance = Math.max(w1, h1) + Math.max(w2, h2);

	//     if (deg) {
	//         var newxy = pointRotate(cx, cy, rx, ry, deg);
	//         cx = newxy.x, cy = newxy.y;
	//     }

	//     // 中心点距离太远一定不meet
	//     var meet = Math.pow((cx - (x2 + w2 / 2)), 2) + Math.pow((cy - (y2 + y2 / 2)), 2) < Math.pow(distance, 2);
	//     if (!meet) return false;

	//     if (deg) {
	//         // 没必要计算4个点
	//         var point1 = pointRotate(x1, y1, rx, ry, deg);
	//         // var point2 = pointRotate(x1 + w1, y1, rx, ry, deg);
	//         var point3 = pointRotate(x1, y1 + h1, rx, ry, deg);
	//         // var point4 = pointRotate(x1 + w1, y1 + h1, rx, ry, deg);
	//         meet = Math.max(point1.x, point3) > x2 &&
	//             Math.min(point1.x, point3.x) < x2 + w2 &&
	//             Math.max(point1.y, point3.y) > y2 &&
	//             Math.min(point1.y, point3.y) < y2 + h2;
	//         // meet = Math.max(point1.x, point2.x, point3.x, point4.x) > x2 &&
	//         //  Math.min(point1.x, point2.x, point3.x, point4.x) < x2 + w2 &&
	//         //  Math.max(point1.y, point2.y, point3.y, point4.y) > y2 &&
	//         //  Math.min(point1.y, point2.y, point3.y, point4.y) < y2 + h2;

	//     } else {
	//         meet = Math.max(x1 + w1, x2 + w2) - Math.min(x1, x2) < w1 + w2 &&
	//             Math.max(y1 + h1, y2 + h2) - Math.min(y1, y2) < h1 + h2;
	//     }

	//     return meet;
	// };

	// 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
	// 用于跳过绘制的判断
	// 用中心点距离+上下左右分离的方式模糊判断

	module.exports = function (x1, y1, w1, h1, x2, y2, w2, h2, rx, ry, deg) {
	    if (!deg) {
	        // 先快速判断几个明显不相交的场景，提升性能
	        if (y1 > y2 + h2) return false;
	        if (y2 > y1 + h1) return false;
	        if (x1 > x2 + w2) return false;
	        if (x2 > x1 + w1) return false;
	    }

	    var aMeetB = (0, _mathPointInRect2.default)(x1, y1, x2, y2, w2, h2, rx, ry, deg) || (0, _mathPointInRect2.default)(x1 + w1, y1, x2, y2, w2, h2, rx, ry, deg) || (0, _mathPointInRect2.default)(x1, y1 + h1, x2, y2, w2, h2, rx, ry, deg) || (0, _mathPointInRect2.default)(x1 + w1, y1 + h1, x2, y2, w2, h2, rx, ry, deg);

	    if (aMeetB) return true;

	    // 将矩形1设置为原点，矩形2的xywh为：
	    var bMeetA = (0, _mathPointInRect2.default)(x2, y2, x1, y1, w1, h1, rx, ry, -deg) || (0, _mathPointInRect2.default)(x2 + w2, y2, x1, y1, w1, h1, rx, ry, -deg) || (0, _mathPointInRect2.default)(x2, y2 + h2, x1, y1, w1, h1, rx, ry, -deg) || (0, _mathPointInRect2.default)(x2 + w2, y2 + h2, x1, y1, w1, h1, rx, ry, -deg);

	    if (bMeetA) return true;

	    // 十字形
	    if (y1 > y2 && y1 + h1 < y2 + h2 && x1 < x2 && x1 + w1 > x2 + w2) return true;
	    if (x1 > x2 && x1 + w1 < x2 + w2 && y1 < y2 && y1 + h1 > y2 + h2) return true;

	    return false;
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** ********** *
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * Sprite Structure
	                                                                                                                                                                                                                                                                               * {
	                                                                                                                                                                                                                                                                               *     style: {
	                                                                                                                                                                                                                                                                               *         tx, ty, tw, th,
	                                                                                                                                                                                                                                                                               *         zIndex, opacity, scale, rotate, rx, ry,
	                                                                                                                                                                                                                                                                               *         sx, sy, sw, sh, locate, // useless for content.text
	                                                                                                                                                                                                                                                                               *         fh, fv, fx, fy, // transform
	                                                                                                                                                                                                                                                                               *         textAlign, textFont, color, // useless for content.img
	                                                                                                                                                                                                                                                                               *         visible, // visible false equals inexistence
	                                                                                                                                                                                                                                                                               *         mirrX, mirrY,
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *     content: {
	                                                                                                                                                                                                                                                                               *         img,
	                                                                                                                                                                                                                                                                               *         text,
	                                                                                                                                                                                                                                                                               *         sequence: {} // for animate sprite
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *     events: {
	                                                                                                                                                                                                                                                                               *         eIndex,
	                                                                                                                                                                                                                                                                               *         click / touchstart / contextmenu / ... / hold / touchout,
	                                                                                                                                                                                                                                                                               *         through,
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *     children: [
	                                                                                                                                                                                                                                                                               *         { Sprite }, { Sprite } ...
	                                                                                                                                                                                                                                                                               *     ],
	                                                                                                                                                                                                                                                                               *     hooks: {
	                                                                                                                                                                                                                                                                               *         created, mounted, painted, ticked
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               *     $parent: { Sprite },
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * }
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * ********** **/

	// import bindDrag from '../painter/apiInner/bindDrag.js';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _apiOn = __webpack_require__(31);

	var _apiOn2 = _interopRequireDefault(_apiOn);

	var _apiOff = __webpack_require__(30);

	var _apiOff2 = _interopRequireDefault(_apiOff);

	var _clear = __webpack_require__(15);

	var _clear2 = _interopRequireDefault(_clear);

	var _nextTick = __webpack_require__(16);

	var _nextTick2 = _interopRequireDefault(_nextTick);

	var _apiTrigger = __webpack_require__(32);

	var _apiTrigger2 = _interopRequireDefault(_apiTrigger);

	var _apiBroadcast = __webpack_require__(27);

	var _apiBroadcast2 = _interopRequireDefault(_apiBroadcast);

	var _apiGetOuterRect = __webpack_require__(29);

	var _apiGetOuterRect2 = _interopRequireDefault(_apiGetOuterRect);

	var _apiCombine = __webpack_require__(28);

	var _apiCombine2 = _interopRequireDefault(_apiCombine);

	var _apiUncombine = __webpack_require__(33);

	var _apiUncombine2 = _interopRequireDefault(_apiUncombine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 记录sprite创建的顺序，用于调试工具的排序
	var $addIndex = 0;

	var ChangeChildrenToSprite = function ChangeChildrenToSprite($parent) {
	    if ($parent.children) {
	        $parent.children.forEach(function (child, i) {
	            if (!child.$id) {
	                $parent.children[i] = new sprite(child);
	            }
	            if ($parent.$id && !$parent.$dom) {
	                $parent.children[i].$canvas = $parent.$canvas;
	                $parent.children[i].$parent = $parent;
	            } else {
	                $parent.children[i].$canvas = $parent;
	            }

	            // if (typeof $parent.children[i].content.img === 'string') {
	            //     $parent.children[i].content.img = $parent.children[i].$canvas.imgLoader($parent.children[i].content.img);
	            // }

	            ChangeChildrenToSprite($parent.children[i]);
	        });
	    }
	};

	// Set default values to sprite
	var preAdd = function preAdd(_item) {
	    var item = _item || {};

	    if (!item.$id) {
	        item.$id = Math.random().toString(36).substr(2);
	    }

	    item.$tickedTimes = item.$tickedTimes || 0;

	    item.content = item.content || {};

	    item.style = item.style || {};

	    item.style.tx = item.style.tx || 0;
	    item.style.ty = item.style.ty || 0;
	    item.style.scale = _utils2.default.firstValuable(item.style.scale, 1);
	    item.style.opacity = _utils2.default.firstValuable(item.style.opacity, 1);

	    item.style.zIndex = item.style.zIndex || 0;
	    // item.style.mirrX = item.style.mirrX || 0;

	    item.style.locate = item.style.locate || 'center';
	    // item.style.rotate = item.style.rotate || 0;

	    var _img = _utils2.default.funcOrValue(item.content.img);

	    _constants2.default.xywh.forEach(function (key) {
	        item.style[key] = item.style[key] || 0;
	    });

	    // item.inherit = item.inherit || ['tx', 'ty', 'scale', 'opacity'];

	    item.events = item.events || {};
	    if (process.env.NODE_ENV !== 'production') {
	        for (var i in item.events) {
	            if (typeof item.events[i] !== 'function' && i !== 'eIndex') {
	                console.warn('[Easycanvas] Handler ' + i + ' is not a function.', item.events[i]);
	            }
	        }
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        item.$addIndex = $addIndex++;
	    }

	    item.events.eIndex = item.events.eIndex;

	    item.hooks = item.hooks || {};

	    if (process.env.NODE_ENV !== 'production') {
	        item.$perf = {};
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        if (!item.name && item.content.img && item.content.img.src) {
	            var fileName = item.content.img.src.match(/.*\/([^\/]*)$/);
	            if (fileName && fileName[1]) {
	                item.name = fileName[1];
	            }
	        }
	        item.name = item.name || 'Unnamed Sprite';
	    }

	    item.children = item.children || [];

	    ChangeChildrenToSprite(item);

	    item.$cache = {};
	    item.$styleCacheTime = {};

	    return item;
	};

	var extend = function extend(opt) {
	    var _this = this;

	    this.$extendList.forEach(function (plugin) {
	        plugin.call(_this, opt);
	    });
	};

	var sprite = function sprite(opt) {
	    var _opt = preAdd(opt);

	    for (var i in _opt) {
	        if (Object.prototype.hasOwnProperty.call(_opt, i)) {
	            this[i] = _opt[i];
	        }
	    }

	    extend.call(this, _opt);

	    return this;
	};

	sprite.prototype.$extendList = [];

	sprite.prototype.add = function (child) {
	    if (!child) {
	        return;
	    }

	    this.children.push(child);

	    ChangeChildrenToSprite(this);

	    // bindDrag.bind(this.children[this.children.length - 1]);

	    return this.children[this.children.length - 1];
	};

	sprite.prototype.getRect = function (notImg, fromCache) {
	    var _this2 = this;

	    var res = {};

	    _constants2.default.txywh.forEach(function (key) {
	        res[key] = _this2.getStyle(key, fromCache);
	    });

	    if (res.tw === 0 && this.content.img && !notImg) {
	        var img = _utils2.default.funcOrValue(this.content.img, this);
	        res.tw = img.width;
	        res.th = img.height;
	    }

	    var locate = this.getStyle('locate');
	    if (locate === 'lt') {} else if (locate === 'ld') {
	        res.ty -= res.th;
	    } else if (locate === 'rt') {
	        res.tx -= res.tw;
	    } else if (locate === 'rd') {
	        res.tx -= res.tw;
	        res.ty -= res.th;
	    } else {
	        // center
	        res.tx -= res.tw >> 1;
	        res.ty -= res.th >> 1;
	    }

	    return res;
	};

	// sprite.prototype.getRender = function () {

	//     if (!this.$canvas) return {};

	//     let res = this.$canvas.$children.filter(($children) => {
	//         return $children.$id === this.$id;
	//     });

	//     return res && res[0];
	// };

	sprite.prototype.getSelfStyle = function (key) {
	    var res = {};

	    if (key) {
	        return _utils2.default.funcOrValue(this.style[key], this);
	    }

	    for (var _key in this.style) {
	        res[_key] = _utils2.default.funcOrValue(this.style[_key], this);
	    }

	    return res;
	};

	sprite.prototype.getStyle = function (key, fromCache) {
	    var $sprite = this;
	    // let lastPaintTime = $sprite.$canvas.$lastPaintTime;

	    // if ($sprite.$styleCacheTime[key] === lastPaintTime) {
	    //     return $sprite.$cache[key];
	    // }

	    if (fromCache && $sprite.$cache[key] !== undefined) {
	        return $sprite.$cache[key];
	    }

	    var currentValue = _utils2.default.funcOrValue($sprite.style[key], $sprite);

	    if ($sprite.$parent) {
	        var parentValue = $sprite.$parent.getStyle(key);

	        if (key === 'tx' || key === 'ty') {
	            parentValue = _utils2.default.firstValuable(parentValue, 0);

	            // $sprite.$parent.$styleCacheTime[key] = lastPaintTime;
	            // $sprite.$parent.$cache[key] = parentValue;

	            return parentValue + _utils2.default.firstValuable(currentValue, 0);
	        } else if (key === 'scale' || key === 'opacity') {
	            parentValue = _utils2.default.firstValuable(parentValue, 1);

	            // $sprite.$parent.$styleCacheTime[key] = lastPaintTime;
	            // $sprite.$parent.$cache[key] = parentValue;

	            return parentValue * _utils2.default.firstValuable(currentValue, 1);
	        }
	    }

	    return currentValue;
	};

	sprite.prototype.remove = function (child) {
	    if (child) {
	        this.$canvas.remove(child);
	        _utils2.default.execFuncs(child.hooks.removed, child);
	        return;
	    }

	    if (this.$parent) {
	        this.$parent.remove(this);
	    } else {
	        this.$canvas.remove(this);
	    }
	    _utils2.default.execFuncs(this.hooks.removed, this);
	};

	sprite.prototype.update = function (opt) {
	    if (!opt) return;

	    for (var i in opt) {
	        if (_typeof(opt[i]) === 'object') {
	            for (var j in opt[i]) {
	                this[i][j] = opt[i][j];
	            }
	        } else {
	            this[i] = opt[i];
	        }
	    }
	};

	sprite.prototype.getAllChildren = function (includeSelf) {
	    var $sprite = this;

	    var childrenSet = includeSelf ? [$sprite] : [];

	    $sprite.children.forEach(function (child) {
	        childrenSet = childrenSet.concat(child.getAllChildren(true));
	    });

	    return childrenSet;
	};

	sprite.prototype.getOuterRect = _apiGetOuterRect2.default;

	sprite.prototype.combine = _apiCombine2.default;

	sprite.prototype.uncombine = _apiUncombine2.default;

	sprite.prototype.combineAsync = function () {
	    this.on('ticked', this.combine, 100);

	    return this;
	};

	sprite.prototype.nextTick = _nextTick2.default;
	sprite.prototype.on = _apiOn2.default;
	sprite.prototype.off = _apiOff2.default;
	sprite.prototype.clear = _clear2.default;
	sprite.prototype.trigger = _apiTrigger2.default;
	sprite.prototype.broadcast = _apiBroadcast2.default;

	module.exports = sprite;

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Clear children
	 *
	 * ********** **/

	module.exports = function () {
	    this.children.forEach(function (child) {
	        child.remove();
	    });

	    this.children = [];
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Trigger event only once on next painting-tick
	 * - Removed after triggering.
	 *
	 * ********** **/

	module.exports = function (func) {
	    var _func = function _func() {
	        func.apply(this, arguments);
	        this.off('ticked', _func);
	    };

	    this.on('ticked', _func);
	};

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	var fallback = function fallback(callback) {
	    setTimeout(callback, 1000 / 60);
	};

	var rAF = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || fallback : fallback;

	module.exports = rAF;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	// Math.PI wastes some performace
	var PI = 3.141593;

	var getLastPaintTime = function getLastPaintTime(transitions) {
	    return transitions.$lastPaintTime || Date.now();
	};

	var types = {
	    linear: function linear(a, b, duration) {
	        var startTime = getLastPaintTime(this);

	        var loop = false;
	        var callback = void 0;

	        var resFunc = function () {
	            var currentTime = this.$lastPaintTime;
	            var progress = (currentTime - startTime) / duration;
	            var result = (b - a) * progress + a;

	            if (loop) {
	                if (b > a) {
	                    while (result > b) {
	                        result -= b - a;
	                    }
	                } else {
	                    while (result < b) {
	                        result += a - b;
	                    }
	                }
	            } else {
	                if (b > a && result > b) {
	                    resFunc.$done = true;
	                    result = b;
	                } else if (b < a && result < b) {
	                    resFunc.$done = true;
	                    result = b;
	                }
	            }

	            if (progress >= 1 && callback) {
	                callback.call(this, result);
	                callback = null;
	            }

	            return result;
	        }.bind(this);

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        resFunc.restart = function () {
	            startTime = getLastPaintTime(this);
	            return resFunc;
	        };

	        resFunc.then = function (cb) {
	            callback = cb;
	            return resFunc;
	        };

	        return resFunc;
	    },

	    pendulum: function pendulum(a, b, duration, _config) {
	        var startTime = getLastPaintTime(this);

	        var config = _config || {};
	        config.start = config.start || 0;

	        var loop = false;
	        var callback = void 0;
	        var cycle = config.cycle || 1;

	        var resFunc = function () {
	            var currentTime = getLastPaintTime(this);
	            var progress = (currentTime - startTime) / duration;

	            if (!loop) {
	                if (cycle) {
	                    if (progress > cycle) {
	                        progress = cycle;
	                        resFunc.$done = true;
	                        progress = cycle;
	                    }
	                } else if (progress > 1) {
	                    resFunc.$done = true;
	                    progress = 1;
	                }
	            } else {
	                if (cycle) {
	                    progress %= cycle;
	                }
	            }

	            var deg = progress * PI * 2 - PI / 2 + config.start / 360 * PI;
	            var result = (b - a) * (Math.sin(deg) + 1) / 2 + a;

	            if (progress >= cycle && callback) {
	                callback.call(this, result);
	                callback = null;
	            }

	            return result;
	        }.bind(this);

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        resFunc.restart = function () {
	            startTime = getLastPaintTime(this);
	            return resFunc;
	        };

	        resFunc.then = function (cb) {
	            callback = cb;
	            return resFunc;
	        };

	        return resFunc;
	    },

	    ease: function ease(a, b, duration) {
	        return this.pendulum(a, b, duration * 2, {
	            cycle: 0.5
	        });
	    },

	    oneByOne: function oneByOne(_arr) {
	        var arr = _arr;
	        var loop = false;

	        var resFunc = function resFunc() {
	            for (var _i = 0; _i < arr.length; _i++) {
	                if (!arr[_i].$done) {
	                    return arr[_i]();
	                } else if (!arr[_i].$nextRestart) {
	                    arr[_i].$nextRestart = true;
	                    if (arr[_i + 1]) {
	                        arr[_i + 1].restart();
	                        return arr[_i + 1]();
	                    }
	                }
	            }

	            if (loop) {
	                for (var _i2 = 0; _i2 < arr.length; _i2++) {
	                    arr[_i2].$done = false;
	                    arr[_i2].$nextRestart = false;
	                    arr[_i2].restart();
	                }
	                return arr[0]();
	            }

	            return arr[arr.length - 1]();
	        };

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        return resFunc;
	    }
	};

	var transition = function transition(sprite, key, type, end, duration) {
	    var current = (0, _utils.funcOrValue)(sprite[key]);

	    if (process.env.NODE_ENV !== 'production') {
	        if (typeof current === 'undefined') {
	            console.warn('[Easycanvas] start value in transition is undefined, using 0 instead.');
	        }
	    }

	    current = current || 0;

	    sprite[key] = types[type].bind(transition)(current, end, duration);
	};

	for (var i in types) {
	    transition[i] = types[i];
	}

	module.exports = transition;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Preparing data for devtool.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (process.env.NODE_ENV !== 'production') {
	    if (!window[_constants2.default.devFlag]) {
	        // init
	        var devData = window[_constants2.default.devFlag] = {
	            isPaintRecording: false,
	            selectMode: false,
	            current: {},
	            version: _constants2.default.version,
	            $canvas: {},
	            $plugin: null
	        };

	        var BRIDGE = {
	            getSprite: function getSprite($canvasId) {
	                if (!devData.isPaintRecording) return [];

	                var res = {};

	                if ($canvasId) {
	                    var children = devData.$canvas[$canvasId].children;
	                    var $children = devData.$canvas[$canvasId].$children;

	                    var pusher = function pusher(item) {
	                        // Skip $mask in select mode
	                        if (item.name === _constants2.default.devFlag) return;

	                        res[item.$id] = {
	                            name: item.name,
	                            $addIndex: item.$addIndex,
	                            parent: item.$parent && item.$parent.$id,
	                            style: {},
	                            children: item.children.filter(function (child) {
	                                return child.name !== _constants2.default.devFlag;
	                            }).map(function (child) {
	                                return child.$id;
	                            }),
	                            rendered: item.$rendered
	                        };

	                        // if (item.content.img || item.content.text) {
	                        //     res[item.$id].rendered = false;
	                        //     for (let i = 0, l = $children.length; i < l; i++) {
	                        //         if ($children[i].$id === item.$id) {
	                        //             res[item.$id].rendered = true;
	                        //             break;
	                        //         }
	                        //     }
	                        // }

	                        for (var i in item.style) {
	                            res[item.$id].style[i] = _utils2.default.funcOrValue(item.style[i], item);
	                        }

	                        _constants2.default.xywh.forEach(function (key) {
	                            res[item.$id].style[key] = Math.round(res[item.$id].style[key]);
	                        });

	                        ['physics', '$perf'].forEach(function (key) {
	                            res[item.$id][key] = item[key];
	                        });

	                        if (item.webgl) {
	                            res[item.$id].webgl = {};
	                            ['rx', 'ry', 'rz', 'tx', 'ty', 'tz'].forEach(function (key) {
	                                res[item.$id].webgl[key] = _utils2.default.funcOrValue(item.webgl[key], item);
	                            });
	                        }

	                        if (item.children) {
	                            item.children.sort(function (a, b) {
	                                return a.$addIndex < b.$addIndex ? -1 : 1;
	                            }).forEach(pusher);
	                        }
	                    };

	                    children.sort(function (a, b) {
	                        return a.$addIndex < b.$addIndex ? -1 : 1;
	                    }).forEach(pusher);
	                } else {
	                    for (var c in devData.$canvas) {
	                        res = _extends(res, devData.$plugin.getSprite(c));
	                    }
	                }

	                return res;
	            },

	            selectSpriteById: function selectSpriteById($spriteId, $canvasId) {
	                if (!$canvasId) {
	                    for (var i in devData.$canvas) {
	                        var _res = BRIDGE.selectSpriteById($spriteId, i);
	                        if (_res) {
	                            return {
	                                $sprite: _res.$sprite || _res,
	                                $canvas: devData.$canvas[i]
	                            };
	                        }
	                    }

	                    return false;
	                }

	                var looper = function looper(array) {
	                    for (var _i = 0; _i < array.length; _i++) {
	                        if (array[_i].$id === $spriteId) return array[_i];

	                        var _res2 = looper(array[_i].children);
	                        if (_res2) {
	                            return {
	                                $sprite: _res2.$sprite || _res2,
	                                $canvas: devData.$canvas[$canvasId]
	                            };
	                        }
	                    }

	                    return false;
	                };

	                var children = devData.$canvas[$canvasId].children;
	                var res = looper(children);
	                if (res) {
	                    return {
	                        $sprite: res.$sprite || res,
	                        $canvas: devData.$canvas[$canvasId]
	                    };
	                }
	            },

	            updateSprite: function updateSprite($spriteId) {
	                var groupName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'style';
	                var keys = arguments[2];
	                var $canvasId = arguments[3];

	                var $sprite = BRIDGE.selectSpriteById($spriteId, $canvasId).$sprite;
	                if (!$sprite) console.warn('Sprite ' + spriteId + ' Not Found.');

	                _extends($sprite[groupName], keys);
	            },

	            highlightSprite: function highlightSprite($spriteId, opt, $canvasId) {
	                devData.selectMode = Boolean(opt);

	                var tmp = BRIDGE.selectSpriteById($spriteId, $canvasId);
	                var $sprite = tmp.$sprite;
	                var $canvas = tmp.$canvas;

	                if (opt && $canvas && $sprite) {
	                    $canvas.$plugin.selectSprite(false, $canvas, $sprite);
	                } else if ($canvas) {
	                    $canvas.$plugin.cancelSelectSprite($canvas);
	                }
	            },

	            sendGlobalHook: function sendGlobalHook($spriteId, $canvasId) {
	                var tmp = BRIDGE.selectSpriteById($spriteId, $canvasId);
	                var $sprite = tmp.$sprite;
	                var $canvas = tmp.$canvas;

	                console.log('%c window.$0 = %c Current Sprite(' + $sprite.name + ') %c ', "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
	                // console.log(`%c window.$1 = %c Current Painter %c`,
	                //     "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff",
	                //     "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff",
	                //     "background:transparent");

	                window.$0 = $sprite;
	                window.$1 = $canvas;
	            },

	            pause: function pause($canvasId, opt) {
	                var $canvas = devData.$canvas[$canvasId];
	                $canvas.$pausing = typeof opt !== 'undefined' ? opt : !$canvas.$pausing;
	            },

	            getPerf: function getPerf() {
	                var perfData = {
	                    canvas: [],
	                    navigator: {
	                        clientWidth: document.body.clientWidth,
	                        clientHeight: document.body.clientHeight,
	                        devicePixelRatio: window.devicePixelRatio
	                    }
	                };

	                if (!devData.isPaintRecording) return perfData;

	                for (var c in devData.$canvas) {
	                    perfData.canvas.push({
	                        $id: c,
	                        name: devData.$canvas[c].name,
	                        perf: devData.$canvas[c].$perf,
	                        fps: devData.$canvas[c].lastFps,
	                        size: {
	                            styleWidth: devData.$canvas[c].$dom.getBoundingClientRect().width || parseInt(devData.$canvas[c].$dom.style.width) || devData.$canvas[c].$dom.width,
	                            styleHeight: devData.$canvas[c].$dom.getBoundingClientRect().height || parseInt(devData.$canvas[c].$dom.style.height) || devData.$canvas[c].$dom.height,
	                            canvasWidth: devData.$canvas[c].$dom.width,
	                            canvasHeight: devData.$canvas[c].$dom.height
	                        }
	                    });
	                }

	                return perfData;
	            }
	        };

	        devData.$plugin = BRIDGE;
	    }
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    var arg = Array.prototype.slice.call(arguments);
	    var name = arg.shift();

	    if (this.hooks[name]) {
	        _utils2.default.execFuncs(this.hooks[name], this, arg);
	        // this.hooks[name].apply(this, arg);
	    }

	    arg.unshift(name);

	    this.children && this.children.forEach(function (child) {
	        child.broadcast.apply(child, arg);
	    });
	}; /** ********** *
	    *
	    * Trigger event on current sprite and its children
	    * - Current sprite first, children following.
	    * - Can pass arguments.
	    *
	    * ********** **/

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var COMBINE_DONE = 1;
	var COMBINE_FAIL = 2;
	var COMBINE_DELAY = 3;

	module.exports = function () {
	    var _this = this;

	    // module.exports = function (force) {
	    setTimeout(function () {
	        var $sprite = _this;

	        if ($sprite.$combine) return COMBINE_DONE;

	        if (_utils2.default.funcOrValue($sprite.style.visible, $sprite) === false) return COMBINE_DELAY;

	        var $canvas = _this.$canvas;

	        var rect = $sprite.getRect(false, true);

	        if (rect.tx < 0 || rect.tr > $canvas.width) return COMBINE_FAIL;
	        if (rect.ty < 0 || rect.tb > $canvas.height) return COMBINE_FAIL;

	        var allChildrenInCombine = $sprite.getAllChildren(true);

	        for (var i = 0; i < allChildrenInCombine.length; i++) {
	            var $child = allChildrenInCombine[i];
	            var img = $child.content.img;
	            if (img && img.src) {
	                // 兼容性TODO
	                if (!img.$painted || img.width === 0 || img.complete === false || img.naturalHeight === 0) {
	                    // 存在未加载完的子对象，不进行合并
	                    return COMBINE_DELAY;
	                }
	            }
	            if ($child.getStyle('scale') !== 1) {
	                return COMBINE_DELAY;
	            }
	        }

	        var outerRect = $sprite.getOuterRect(false, true);

	        outerRect.tx = Math.floor(outerRect.tx);
	        outerRect.ty = Math.floor(outerRect.ty);
	        outerRect.tw = Math.round(outerRect.tw);
	        outerRect.th = Math.round(outerRect.th);
	        outerRect.tr = Math.round(outerRect.tr);
	        outerRect.tb = Math.round(outerRect.tb);

	        // if (!force) {
	        if (outerRect.tx < 0 || outerRect.tr > $canvas.width) return COMBINE_FAIL;
	        if (outerRect.ty < 0 || outerRect.tb > $canvas.height) return COMBINE_FAIL;
	        // }

	        // 修改：这块不能绘制，paint有可能导致位置变动
	        // 绘制一帧，清除连续combine时，前一个combine新产生的对象没有进入$canvas.$children，导致下一个combine获取不到的问题
	        // $canvas.$lastTickChildren = false;
	        // $canvas.paint();

	        var $renders = $canvas.$children.filter(function ($child) {
	            for (var _i = 0; _i < allChildrenInCombine.length; _i++) {
	                if (allChildrenInCombine[_i].$id === $child.$id) return true;
	            }
	        });
	        // if ($sprite.name === 'intro') {
	        //     console.warn('length', $renders.length);
	        // }

	        var originChildren = $canvas.$children;
	        var spriteOpacity = $sprite.getStyle('opacity');
	        $renders.forEach(function ($render) {
	            $render.settings.$combineGlobalAlpha = $render.settings.globalAlpha;
	            $render.settings.globalAlpha = spriteOpacity > 0 ? $render.settings.globalAlpha / spriteOpacity : 1;
	        });
	        $canvas.$children = $renders;
	        $canvas.$paintContext.clearRect(0, 0, $canvas.width, $canvas.height);
	        $canvas.$lastTickChildren = false;
	        $canvas.$render();

	        $renders.forEach(function ($render) {
	            $render.settings.globalAlpha = $render.settings.$combineGlobalAlpha;
	        });

	        var canvas = document.createElement('canvas');
	        // document.body.prepend(canvas);
	        canvas.width = outerRect.tw;
	        canvas.height = outerRect.th;
	        var ctx = canvas.getContext('2d');
	        ctx.drawImage($canvas.$dom, outerRect.tx, outerRect.ty, outerRect.tw, outerRect.th, 0, 0, outerRect.tw, outerRect.th);

	        $sprite.children.forEach(function (child) {
	            // 清空$cache，以免后续使用时（如事件处理）拿到了老的坐标
	            child.$cache = {};
	        });

	        $sprite.$combine = {
	            content: $sprite.content,
	            children: $sprite.children,
	            style: $sprite.style
	        };
	        $sprite.children = [];
	        $sprite.content = {
	            img: canvas
	        };

	        var newTx = $sprite.getSelfStyle('tx') - (Math.floor(rect.tx) - outerRect.tx);
	        var newTy = $sprite.getSelfStyle('ty') - (Math.floor(rect.ty) - outerRect.ty);
	        $sprite.style = _extends({}, $sprite.style, {
	            // opacity: 1,
	            scale: 1,
	            tx: newTx,
	            ty: newTy,
	            tw: canvas.width,
	            th: canvas.height,
	            backgroundColor: undefined
	        });

	        // $canvas.paint();
	        $canvas.$children = originChildren;
	        // $canvas.$paintContext.clearRect(0, 0, $canvas.width, $canvas.height);
	        // $canvas.$lastTickChildren = false;
	        // $canvas.$render();

	        // 绘制一帧，清除连续combine时，前一个combine新产生的对象没有进入$canvas.$children，导致下一个combine获取不到的问题
	        $canvas.$lastTickChildren = false;
	        $canvas.paint();

	        // $canvas.$lastTickChildren = false;
	        // $canvas.paint();

	        $sprite.off('ticked', _this.combine);

	        return COMBINE_DONE;
	    });

	    return this;
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (notImg, fromCache) {
	    var $sprite = this;

	    var rect = $sprite.getRect(notImg, fromCache);
	    rect.tr = rect.tx + rect.tw;
	    rect.tb = rect.ty + rect.th;

	    this.children.forEach(function (child) {
	        var childRect = child.getOuterRect(notImg, fromCache);
	        if (childRect.tx < rect.tx) rect.tx = childRect.tx;
	        if (childRect.ty < rect.ty) rect.ty = childRect.ty;
	        if (childRect.tr > rect.tr) rect.tr = childRect.tr;
	        if (childRect.tb > rect.tb) rect.tb = childRect.tb;

	        rect.tw = rect.tr - rect.tx;
	        rect.th = rect.tb - rect.ty;
	    });

	    return rect;
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (event, func) {
	    if (!this.hooks[event]) return;

	    if (this.hooks[event] === func || this.hooks[event].$handle === func || !func) {
	        delete this.hooks[event];
	    } else if (_utils2.default.isArray(this.hooks[event])) {
	        if (this.hooks[event].indexOf(func) >= 0) {
	            this.hooks[event][this.hooks[event].indexOf(func)] = undefined;
	        } else if (this.hooks[event].indexOf(func.$handle) >= 0) {
	            this.hooks[event][this.hooks[event].indexOf(func.$handle)] = undefined;
	        }
	    }
	}; /** ********** *
	    *
	    * Remove current hook
	    *
	    * ********** **/

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (name, func, throttle) {
	    var _handle = func;

	    if (throttle) {
	        var that = this;
	        _handle = function handle() {
	            var now = Date.now();

	            if (now > _handle.$lastTriggerTime + throttle) {
	                _handle.$lastTriggerTime = now;
	                var args = Array.prototype.slice.call(arguments);
	                func.apply(that, args);
	            }
	        };
	        _handle.$lastTriggerTime = -1;
	        _handle.$handle = func;
	    }

	    if (!this.hooks[name]) {
	        this.hooks[name] = _handle;
	    } else if (_utils2.default.isArray(this.hooks[name])) {
	        this.hooks[name].push(_handle);
	    } else {
	        this.hooks[name] = [this.hooks[name], _handle];
	    }
	}; /** ********** *
	    *
	    * Add current hook
	    *
	    * ********** **/

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    var arg = Array.prototype.slice.call(arguments);
	    var name = arg.shift();

	    if (this.hooks[name]) {
	        return _utils2.default.execFuncs(this.hooks[name], this, arg);
	        // this.hooks[name].apply(this, arg);
	    }
	}; /** ********** *
	    *
	    * Trigger event on current sprite without its children
	    * - Current sprite first, children following.
	    * - Can pass arguments.
	    *
	    * ********** **/

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	module.exports = function () {
	    _extends(this, this.$combine);

	    this.$combine = false;
	    // this.events.interceptor = this.events.$interceptor;
	    // this.events.$interceptor = false;
	};

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _index = __webpack_require__(60);

	var _index2 = _interopRequireDefault(_index);

	var _tick = __webpack_require__(24);

	var _tick2 = _interopRequireDefault(_tick);

	var _mirror = __webpack_require__(102);

	var _mirror2 = _interopRequireDefault(_mirror);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _transition = __webpack_require__(25);

	var _transition2 = _interopRequireDefault(_transition);

	var _imgLoader = __webpack_require__(9);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	var _imgPretreat = __webpack_require__(101);

	var _imgPretreat2 = _interopRequireDefault(_imgPretreat);

	var _multlineText = __webpack_require__(103);

	var _multlineText2 = _interopRequireDefault(_multlineText);

	var _sprite = __webpack_require__(13);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _chromeDevtool = __webpack_require__(26);

	var _chromeDevtool2 = _interopRequireDefault(_chromeDevtool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Easycanvas = {
	    painter: _index2.default,
	    imgLoader: _imgLoader2.default,
	    imgPretreat: _imgPretreat2.default,
	    multlineText: _multlineText2.default,
	    transition: _transition2.default,
	    tick: _tick2.default,
	    utils: _utils2.default,
	    mirror: _mirror2.default,
	    // 这个class只是为了兼容老版本写法“new Easycanvas.class.sprite(opt);”
	    class: {
	        sprite: _sprite2.default
	    },
	    sprite: _sprite2.default,
	    $version: _constants2.default.version,
	    env: process.env.NODE_ENV
	};

	Easycanvas.extend = function (pluginHook) {
	    var $extendList = Easycanvas.sprite.prototype.$extendList;

	    if ($extendList.indexOf(pluginHook) >= 0) return;

	    $extendList.push(pluginHook);
	};

	Easycanvas.use = function (pluginHook) {
	    var $extendList = Easycanvas.painter.prototype.$extendList;

	    if ($extendList.indexOf(pluginHook) >= 0) return;

	    if (pluginHook.onUse) {
	        pluginHook.onUse(Easycanvas);
	    }

	    $extendList.push(pluginHook);
	};

	Easycanvas.component = function (componentInit, namespace) {
	    componentInit(Easycanvas, namespace);
	};

	// if (process.env.NODE_ENV !== 'production') {
	//     Easycanvas.$warn = (() => {
	//         let lastConsoleTime = 0;
	//         return function () {
	//             let now = Date.now();
	//             if (now - lastConsoleTime < 1000) {
	//                 // 防止连续警告
	//                 return;
	//             }

	//             let args = Array.prototype.slice.call(arguments);

	//             lastConsoleTime = now;
	//             console.warn.apply(this, args);
	//         };
	//     })();
	// }

	var inBrowser = typeof window !== 'undefined';

	if (inBrowser) {
	    if (window.Easycanvas) {
	        console.warn('[Easycanvas] already loaded, it should be loaded only once.');
	    } else {
	        if (process.env.NODE_ENV !== 'production') {
	            setTimeout(function () {
	                console.log('%c Easycanvas %c You are using the develop version ' + _constants2.default.version + ' %c', "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
	            }, 500);
	        }
	        if (false) {
	            window.Easycanvas = Easycanvas;
	        }
	    }
	}

	module.exports = Easycanvas;

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _perPaint = __webpack_require__(47);

	var _perPaint2 = _interopRequireDefault(_perPaint);

	var _render = __webpack_require__(49);

	var _render2 = _interopRequireDefault(_render);

	var _eventHandler = __webpack_require__(44);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _rAFer = __webpack_require__(48);

	var _rAFer2 = _interopRequireDefault(_rAFer);

	var _apiPlugin = __webpack_require__(59);

	var _apiPlugin2 = _interopRequireDefault(_apiPlugin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import $bindDrag from './apiInner/bindDrag.js';
	var apiInner = {
	    $render: _render2.default,
	    $eventHandler: _eventHandler2.default,
	    $perPaint: _perPaint2.default,
	    // $bindDrag,
	    $rAFer: _rAFer2.default
	}; /** ********** *
	    *
	    * Inner apis of an easycanvas instance
	    * - Used for Easycanvas.js only normally.
	    * - Will be added to Easycanvas instance's prototype.
	    *
	    * ********** **/

	if (process.env.NODE_ENV !== 'production') {
	    apiInner.$plugin = (0, _apiPlugin2.default)();
	}

	module.exports = apiInner;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Handle events on canvas (Includes both user's events and debugging events)
	 * - Compare event's coordinate and the coordinate of every sprite in
	 *   Easycanvas.children, and check sprite's handlers one by one.
	 * - Events: mousedown, mousemove, mouseup, touchstart, touchmove, touchend,
	 *   click, contextmenu
	 * - Expanded events: hold, touchout
	 *
	 * ********** **/

	var isMobile = typeof wx !== 'undefined' || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	/**
	 * Sort sprite
	 * - Order by eIndex dev-tool's in events' triggering
	 * - Order by zIndex in dev-tool's select mode
	 */
	var sortByIndex = function sortByIndex(arr) {
	    return arr.sort(function (a, b) {
	        if (process.env.NODE_ENV !== 'production') {
	            if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                return _utils2.default.funcOrValue(a.style.zIndex, a) < _utils2.default.funcOrValue(b.style.zIndex, b) ? 1 : -1;
	            }
	        }

	        return _utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) < _utils2.default.funcOrValue(_utils2.default.firstValuable(b.events.eIndex, b.style.zIndex), b) ? 1 : -1;
	    });
	};

	/**
	 * Check whether the event hits certain sprite
	 */
	var hitSprite = function hitSprite($sprite, e) {
	    var rect = $sprite.getRect();

	    return _utils2.default.pointInRect(e.canvasX, e.canvasY, rect.tx, rect.tx + rect.tw, rect.ty, rect.ty + rect.th);
	};

	/**
	 * Sort all the sprites(including children), then put to @caughts
	 * - Child is above the parent only if Index >= 0
	 */
	var looper = function looper(arr, e, caughts) {
	    if (!arr || !arr.length) return;
	    if (e.$stopPropagation) return;

	    var l = arr.length;
	    for (var i = 0; i < l; i++) {
	        var item = arr[i];
	        if (_utils2.default.funcOrValue(item.style.visible, item) === false) continue;
	        if (item.events && item.events.pointerEvents === 'none') continue;

	        if (hitSprite(item, e)) {
	            var interceptor = item.events.interceptor;

	            if (process.env.NODE_ENV !== 'production') {
	                if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                    // 选取Sprite时禁掉捕获，以免事件被阻止，导致无法选中
	                    interceptor = false;
	                }
	            }

	            if (interceptor) {
	                var result = _utils2.default.firstValuable(interceptor.call(item, e), e);
	                if (!result || result.$stopPropagation) return;
	            }
	        }

	        var children = item.$combine ? item.$combine.children : item.children;

	        if (children.length) {
	            // Children above
	            looper(sortByIndex(children.filter(function (a) {
	                if (process.env.NODE_ENV !== 'production') {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) >= 0;
	                    }
	                }

	                return _utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0;
	            })), e, caughts);
	        }

	        if (e.$stopPropagation) break;

	        if (hitSprite(item, e)) {
	            if (process.env.NODE_ENV !== 'production') {
	                // 开发者工具select模式下为选取元素
	                if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                    if (item.name !== _constants2.default.devFlag) {
	                        e.stopPropagation();
	                        if (item.$canvas.$plugin.selectSprite(e.type === 'click' || e.type === 'touchend', item.$canvas, item)) {
	                            return;
	                        }
	                    }
	                    continue;
	                }
	            }

	            triggerEventOnSprite(item, e, caughts);
	            e.stopPropagation();
	            return;
	        }

	        if (children.length) {
	            // Children below
	            looper(sortByIndex(children.filter(function (a) {
	                if (process.env.NODE_ENV !== 'production') {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) < 0;
	                    }
	                }

	                return !(_utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0);
	            })), e, caughts);
	        }
	    }
	};

	var extend = function extend($e, caughts) {
	    var _this = this;

	    this.$extendList.forEach(function (plugin) {
	        if (plugin.onEvent) {
	            plugin.onEvent.call(_this, $e, caughts);
	        }
	    });
	};

	var triggerEventOnSprite = function triggerEventOnSprite($sprite, $e, caughts) {
	    caughts && caughts.push($sprite);

	    if ($sprite.events[$e.type]) {
	        $sprite.events[$e.type].call($sprite, $e);
	        if ($e.$stopPropagation) return;
	    }

	    if ($sprite.$parent) {
	        triggerEventOnSprite($sprite.$parent, $e, caughts);
	    }
	};

	var fastclick = {
	    x: 0, y: 0, timeStamp: 0
	};

	var _eventHandler;
	_eventHandler = function eventHandler(e, _$e) {
	    var $canvas = this;

	    var layerX = void 0;
	    var layerY = void 0;
	    var scaleX = 1;
	    var scaleY = 1;

	    if (!_$e) {
	        if (!e.layerX && e.targetTouches && e.targetTouches[0]) {
	            layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
	            layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
	        } else if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
	            layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
	            layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
	        } else {
	            layerX = e.layerX;
	            layerY = e.layerY;
	        }

	        var isRotated = false; // TODO

	        if (this.$dom.getBoundingClientRect) {
	            var bcr = this.$dom.getBoundingClientRect();
	            bcr.width > bcr.height !== this.width > this.height;

	            scaleX = Math.floor(bcr[isRotated ? 'height' : 'width']) / this.width;
	            scaleY = Math.floor(bcr[isRotated ? 'width' : 'height']) / this.height;
	        }
	    }

	    var $e = _$e || {
	        type: e.type,
	        canvasX: layerX / scaleX,
	        canvasY: layerY / scaleY,
	        event: e
	    };

	    if (isMobile && $canvas.fastclick) {
	        if ($e.type === 'click' && !$e.$fakeClick) {
	            return;
	        } else if ($e.type === 'touchstart') {
	            fastclick.x = $e.canvasX;
	            fastclick.y = $e.canvasY;
	            fastclick.timeStamp = Date.now();
	        } else if ($e.type === 'touchend') {
	            if (Math.abs(fastclick.x - $e.canvasX) < 30 && Math.abs(fastclick.y - $e.canvasY) < 30 && Date.now() - fastclick.timeStamp < 200) {
	                _eventHandler.call(this, null, {
	                    $fakeClick: true,
	                    type: 'click',
	                    canvasX: fastclick.x,
	                    canvasY: fastclick.y,
	                    event: e
	                });
	            }
	        }
	    }

	    $e.stopPropagation = function () {
	        $e.$stopPropagation = true;
	    };

	    if ($canvas.events.interceptor) {
	        $e = _utils2.default.firstValuable($canvas.events.interceptor.call($canvas, $e), $e);
	        if (!$e || $e.$stopPropagation) return;
	    }

	    var caughts = [];

	    // if ($canvas.$flags.dragging && $canvas.$flags.dragging.$id) {
	    //     // 拖拽状态下，拖拽中的sprite优先触发事件
	    //     caughts.push($canvas.$flags.dragging);
	    // }

	    looper(sortByIndex($canvas.children), $e, caughts);
	    if ($e && !$e.$stopPropagation) {
	        triggerEventOnSprite($canvas, $e);
	    }

	    // utils.execFuncs($canvas.hooks.afterEvent, $canvas, $e);
	    // $canvas.hooks.afterEvent = null;

	    extend.call($canvas, $e, caughts);

	    // Create a new event: 'hold' (suits both mobile and pc)
	    // if (!$canvas.eHoldingFlag && ($e.type === 'mousedown' || $e.type === 'touchstart')) {
	    //     $canvas.eHoldingFlag = $e;
	    // } else if ($canvas.eHoldingFlag && ($e.type === 'mouseup' || $e.type === 'touchend')) {
	    //     $canvas.eHoldingFlag = false;
	    // } else if ($canvas.eHoldingFlag && ($e.type === 'mousemove' || $e.type === 'touchmove')) {
	    //     $canvas.eHoldingFlag = $e;
	    // }// else if (!$canvas.eHoldingFlag && e.type === 'contextmenu') {

	    // trigger 'mouseout' or 'touchout' event 
	    if (($e.type === 'mousemove' || $e.type === 'touchmove') && $canvas.eLastMouseHover && caughts.indexOf($canvas.eLastMouseHover) === -1) {
	        // touchout待移除（目前可能不触发）
	        var eMouseout = $canvas.eLastMouseHover['events']['mouseout'] || $canvas.eLastMouseHover['events']['touchout'];
	        if (eMouseout) {
	            eMouseout.call($canvas.eLastMouseHover, $e);
	        }
	    }
	    $canvas.eLastMouseHover = caughts[0];

	    if (!caughts.length && $canvas.eLastMouseHover) {
	        // hover更替，触发mouseout
	        var _eMouseout = $canvas.eLastMouseHover['events']['mouseout'];
	        if (_eMouseout) {
	            _eMouseout.call($canvas.eLastMouseHover, $e);
	        }
	        $canvas.eLastMouseHover = null;
	    }

	    // let handler = $canvas.events[$e.type];
	    // if (handler) {
	    //     if (handler.call($canvas, $e)) {
	    //         $canvas.eHoldingFlag = false;
	    //         return true;
	    //     }
	    // }
	};

	module.exports = _eventHandler;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Fix border to improve performance
	 *
	 * ********** **/

	module.exports = function ($canvas, props, imgWidth, imgHeight) {
	    // source在图片外
	    if (props.sx < 0 && props.sw) {
	        var cutRate = -props.sx / props.sw;
	        props.tx += props.tw * cutRate;
	        props.sx = 0;
	    }
	    if (props.sy < 0 && props.sh) {
	        var _cutRate = -props.sy / props.sh;
	        props.ty += props.th * _cutRate;
	        props.sy = 0;
	    }
	    if (imgWidth && props.sx + props.sw > imgWidth) {
	        var _cutRate2 = (props.sx + props.sw - imgWidth) / props.sw;
	        // if (cutRate < 1) {
	        props.sw -= props.sw * _cutRate2;
	        props.tw -= props.tw * _cutRate2;
	        // }
	    }
	    if (imgHeight && props.sy + props.sh > imgHeight) {
	        var _cutRate3 = (props.sy + props.sh - imgHeight) / props.sh;
	        props.sh -= props.sh * _cutRate3;
	        props.th -= props.th * _cutRate3;
	    }

	    // target在画布外
	    // TODO
	    if (props.tx < 0 && props.tw > -props.tx) {
	        var _cutRate4 = -props.tx / props.tw;
	        props.sx += props.sw * _cutRate4;
	        props.sw -= props.sw * _cutRate4;
	        props.tw = props.tw + props.tx;
	        props.tx = 0;
	    }
	    if (props.ty < 0 && props.th > -props.ty) {
	        var _cutRate5 = -props.ty / props.th;
	        props.sy += props.sh * _cutRate5;
	        props.sh -= props.sh * _cutRate5;
	        props.th = props.th + props.ty;
	        props.ty = 0;
	    }
	    if (props.tw && props.tx + props.tw > $canvas.width) {
	        var _cutRate6 = (props.tx + props.tw - $canvas.width) / props.tw;
	        props.tw -= props.tw * _cutRate6;
	        props.sw -= props.sw * _cutRate6;
	    }
	    if (props.th && props.ty + props.th > $canvas.height) {
	        var _cutRate7 = (props.ty + props.th - $canvas.height) / props.th;
	        props.th -= props.th * _cutRate7;
	        props.sh -= props.sh * _cutRate7;
	    }
	};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function ($canvas, children, part) {
	    children.filter(function (item) {
	        var zIndex = _utils2.default.funcOrValue(item.style.zIndex, item);
	        if (part < 0) {
	            return zIndex < 0;
	        }
	        return zIndex >= 0;
	    }).sort(function (a, b) {
	        var za = _utils2.default.funcOrValue(a.style.zIndex, a);
	        var zb = _utils2.default.funcOrValue(b.style.zIndex, b);
	        if (za === zb) return 0;
	        return za > zb ? 1 : -1;
	    }).forEach(function (c, _index) {
	        $canvas.$perPaint.call($canvas, c, _index);
	    });
	}; /** ********** *
	    *
	    * Send children to be painted
	    * - Children will be rendered above the parent, if zIndex >= 0
	    * - Even the same zIndex, chilren will be render in differrent orders
	    *   in different environments, like Chrome and PhantomJs.
	    *
	    * ********** **/

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _perPaintCutOutside = __webpack_require__(45);

	var _perPaintCutOutside2 = _interopRequireDefault(_perPaintCutOutside);

	var _perPaintDeliverChildren = __webpack_require__(46);

	var _perPaintDeliverChildren2 = _interopRequireDefault(_perPaintDeliverChildren);

	var _math = __webpack_require__(12);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import img2base64 from 'utils/img2base64.js';

	var blend = _utils2.default.blend;
	// import getComputedStyle from './perPaint.getComputedStyle.js';
	/** ********** *
	 *
	 * CORE painting function
	 * - Calculates props of every sprite in children, then puts to $children.
	 * - Includes optimization.
	 * - NOT connecting to canvas's prototype functions.
	 *
	 * ********** **/

	var isChineseChar = function isChineseChar(temp) {
	    var re = /[^\u4e00-\u9fa5]/;
	    return !re.test(temp);
	};

	var extend = function extend() {
	    var _this = this;

	    this.$canvas.$extendList.forEach(function (plugin) {
	        if (plugin.onPaint) {
	            plugin.onPaint.call(_this);
	        }
	    });
	};

	var getScaledParent = function getScaledParent($sprite) {
	    if (!$sprite || !$sprite.style) return;

	    var scale = _utils2.default.funcOrValue($sprite.style.scale, $sprite);

	    if (scale !== 1) return $sprite;
	    return getScaledParent($sprite.$parent);
	};

	module.exports = function ($sprite, index) {
	    $sprite.$rendered = false;

	    _utils2.default.execFuncs($sprite.hooks.beforeTick, $sprite, $sprite.$tickedTimes);

	    if (_utils2.default.funcOrValue($sprite.style.visible, $sprite) === false) {
	        _utils2.default.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
	        return;
	    }

	    var $canvas = this;

	    extend.call($sprite);

	    // getComputedStyle(i, $canvas);

	    var _props = $sprite.$props = {};

	    _props.img = _utils2.default.funcOrValue($sprite.content.img, $sprite);
	    if ($sprite.content.text) {
	        // text大部分sprite没有，if一下提升效率
	        _props.text = _utils2.default.funcOrValue($sprite.content.text, $sprite);
	    }

	    if (typeof _props.img === 'string') {
	        _props.img = $sprite.content.img = $canvas.imgLoader(_props.img);
	    }

	    var _text = _props.text;
	    var _img = _props.img;

	    _props.tx = _utils2.default.funcOrValue($sprite.style.tx, $sprite) || 0;
	    if ($sprite.$parent) {
	        _props.tx += _utils2.default.firstValuable($sprite.$parent.$cache.tx, 0);
	    }
	    $sprite.$cache.tx = _props.tx;

	    _props.ty = _utils2.default.funcOrValue($sprite.style.ty, $sprite) || 0;
	    if ($sprite.$parent) {
	        _props.ty += _utils2.default.firstValuable($sprite.$parent.$cache.ty, 0);
	    }
	    $sprite.$cache.ty = _props.ty;

	    // 这块写的比较恶心，原因是forEach等写法的性能开销较大(长列表时每帧能浪费一倍的性能)
	    // 一个一个赋值虽然代码烦琐，但是性能最快
	    // 后面考虑构建时处理或者初始化时批量动态生成函数

	    var _imgWidth = 0;
	    var _imgHeight = 0;

	    if (_img && _img.width) {
	        _imgWidth = _img.width || 0;
	        _imgHeight = _img.height || 0;
	        _props.sx = _utils2.default.funcOrValue($sprite.style.sx, $sprite) || 0;
	        _props.sy = _utils2.default.funcOrValue($sprite.style.sy, $sprite) || 0;
	        _props.sw = _utils2.default.funcOrValue($sprite.style.sw, $sprite) || _imgWidth;
	        _props.sh = _utils2.default.funcOrValue($sprite.style.sh, $sprite) || _imgHeight;

	        // 太小的图其实应该不取整，以免“高1像素的图，在sx和sw均为0.5的情况下渲染不出来”
	        _props.sx = Math.round(_props.sx);
	        _props.sy = Math.round(_props.sy);
	        _props.sw = Math.round(_props.sw);
	        _props.sh = Math.round(_props.sh);
	    }

	    _props.tw = _utils2.default.funcOrValue($sprite.style.tw, $sprite) || _props.sw || 0;
	    _props.th = _utils2.default.funcOrValue($sprite.style.th, $sprite) || _props.sh || 0;
	    _props.locate = _utils2.default.funcOrValue($sprite.style.locate, $sprite); // undefined和'center'效果一样;
	    _props.rotate = _utils2.default.funcOrValue($sprite.style.rotate, $sprite) || 0;

	    _props.overflow = _utils2.default.funcOrValue($sprite.style.overflow, $sprite) || 0;
	    _props.overflowX = _utils2.default.funcOrValue($sprite.style.overflowX, $sprite) || 0;
	    _props.overflowY = _utils2.default.funcOrValue($sprite.style.overflowY, $sprite) || 0;

	    _props.scale = _utils2.default.funcOrValue($sprite.style.scale, $sprite) || 1;
	    if ($sprite.$parent) {
	        _props.scale *= _utils2.default.firstValuable($sprite.$parent.$cache.scale, 1);
	    }
	    $sprite.$cache.scale = _props.scale;

	    var _children = $sprite.children;

	    if (_props.scale !== 1) {
	        var scale = _props.scale;
	        var scaledParent = getScaledParent($sprite);

	        if (scaledParent) {
	            var scaledParentRect = scaledParent.getRect($sprite === scaledParent ? false : true);
	            var scaleCenterX = scaledParentRect.tx + scaledParentRect.tw / 2;
	            var scaleCenterY = scaledParentRect.ty + scaledParentRect.th / 2;

	            _props.tx -= (scaleCenterX - _props.tx) * (scale - 1);
	            _props.ty -= (scaleCenterY - _props.ty) * (scale - 1);

	            _props.tw *= scale;
	            _props.th *= scale;
	        }
	    }

	    if (_props.locate === 'lt') {} else if (_props.locate === 'ld') {
	        _props.ty -= _props.th;
	    } else if (_props.locate === 'rt') {
	        _props.tx -= _props.tw;
	    } else if (_props.locate === 'rd') {
	        _props.tx -= _props.tw;
	        _props.ty -= _props.th;
	    } else {
	        // center
	        _props.tx -= _props.tw >> 1;
	        _props.ty -= _props.th >> 1;
	    }

	    // 不能干掉，否则combine的时候可能模糊
	    _props.tx = Math.round(_props.tx);
	    _props.ty = Math.round(_props.ty);
	    _props.tw = Math.round(_props.tw);
	    _props.th = Math.round(_props.th);

	    var settings = {};

	    if (_props.rotate) {
	        // 定点旋转
	        _props.rx = _utils2.default.firstValuable(_utils2.default.funcOrValue($sprite.style.rx, $sprite), _props.tx + 0.5 * _props.tw);
	        _props.ry = _utils2.default.firstValuable(_utils2.default.funcOrValue($sprite.style.ry, $sprite), _props.ty + 0.5 * _props.th);

	        var transX = _utils2.default.firstValuable(_props.rx, _props.tx + 0.5 * _props.tw);
	        var transY = _utils2.default.firstValuable(_props.ry, _props.ty + 0.5 * _props.th);

	        settings.beforeRotate = [transX, transY];
	        settings.rotate = -_props.rotate * Math.PI / 180;
	        settings.rotate = Number(settings.rotate.toFixed(4));
	        settings.afterRotate = [-transX, -transY];
	    }

	    var meetResult = (0, _math2.default)(_props.tx, _props.ty, _props.tw, _props.th, 0, 0, $canvas.width, $canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);
	    var childrenInside = (_props.overflow || _props.overflowX || _props.overflowY) && _props.overflow !== 'visible';

	    if (!meetResult && !_text) {
	        if (!childrenInside) {
	            $sprite.$rendered = undefined;
	            _children.length && (0, _perPaintDeliverChildren2.default)($canvas, _children, -1);
	            _children.length && (0, _perPaintDeliverChildren2.default)($canvas, _children, 1);
	        }
	        _utils2.default.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
	    } else {
	        _props.opacity = _utils2.default.funcOrValue($sprite.style.opacity, $sprite) || 0;
	        if ($sprite.$parent) {
	            _props.opacity *= _utils2.default.firstValuable($sprite.$parent.$cache.opacity, 1);
	        }
	        $sprite.$cache.opacity = _props.opacity;

	        for (var key in $sprite.style) {
	            if (typeof _props[key] !== 'undefined') continue;
	            _props[key] = _utils2.default.funcOrValue($sprite.style[key], $sprite);
	        }

	        settings.globalAlpha = _utils2.default.firstValuable(_props.opacity, 1);

	        if (_props.fh || _props.fv) {
	            _props.fh = _props.fh || 0;
	            _props.fv = _props.fv || 0;
	            _props.fx = _props.fx || 0;
	            _props.fy = _props.fy || 0;
	            settings.transform = {
	                fh: _props.fh,
	                fv: _props.fv,
	                fx: -(_props.ty + (_props.th >> 1)) * _props.fv + _props.fx,
	                fy: -(_props.tx + (_props.tw >> 1)) * _props.fh + _props.fy
	            };
	        }

	        if (_props.blend) {
	            if (typeof _props.blend === 'string') {
	                settings.globalCompositeOperation = _props.blend;
	            } else {
	                settings.globalCompositeOperation = blend[_props.blend];
	            }
	        }

	        if (_props.backgroundColor) {
	            settings.fillRect = _props.backgroundColor;
	        }

	        if (_props.border) {
	            // TODO：导致width扩大，判断是否超出范围时需要调整算法
	            settings.line = _props.border;
	        }

	        if (_props.mirrX) {
	            settings.translate = [$canvas.width, 0];
	            settings.scale = [-1, 1];
	            _props.tx = $canvas.width - _props.tx - _props.tw;
	            if (_props.mirrY) {
	                settings.translate = [$canvas.width, $canvas.height];
	                settings.scale = [-1, -1];
	                _props.ty = $canvas.height - _props.ty - _props.th;
	            }
	        } else if (_props.mirrY) {
	            settings.translate = [0, $canvas.height];
	            settings.scale = [1, -1];
	            _props.ty = $canvas.height - _props.ty - _props.th;
	        }

	        if (childrenInside) {
	            settings.clip = true;
	        }

	        /*
	         * 性能浪费检测
	         * 拿到最大的“绘制/源尺寸”比值，如果这个值过低，那么显然存在资源浪费
	         * 由于对象可能处于动画中，因此选用最大的绘制比
	         */
	        if (process.env.NODE_ENV !== 'production') {
	            if (_imgWidth && _imgHeight) {
	                var paintRate = _props.tw * _props.th / (_props.sw * _props.sh);
	                if (!$sprite.$perf.paintRate || paintRate > $sprite.$perf.paintRate) {
	                    $sprite.$perf.paintRate = paintRate;
	                    // $sprite.$perf.paintProps = JSON.stringify(_props);
	                }
	            }
	        }

	        // if (process.env.NODE_ENV !== 'production') {
	        //     if (!$sprite.$cache.base64 && _img && _img.src) {
	        //         $sprite.$cache.base64 = 'processing';
	        //         img2base64(_img.src, function (data) {
	        //             $sprite.$cache.base64 = data;
	        //         });
	        //     }
	        // }

	        if (settings.clip) {
	            if (meetResult) {
	                var $paintSprite = {
	                    $id: $sprite.$id,
	                    type: 'clip',
	                    // settings: settings,
	                    props: _props
	                };

	                // if (process.env.NODE_ENV !== 'production') {
	                //     // 开发环境下，将元素挂载到$children里以供标记
	                $paintSprite.$origin = $sprite;
	                // };

	                $canvas.$children.push($paintSprite);
	            }
	        }

	        _children.length && (0, _perPaintDeliverChildren2.default)($canvas, _children, -1);

	        if (settings.fillRect) {
	            if (meetResult) {
	                $sprite.$rendered = true;

	                var _$paintSprite = {
	                    $id: $sprite.$id,
	                    type: 'fillRect',
	                    settings: settings,
	                    props: _props
	                };

	                // if (process.env.NODE_ENV !== 'production') {
	                //     // 开发环境下，将元素挂载到$children里以供标记
	                _$paintSprite.$origin = $sprite;
	                // };

	                $canvas.$children.push(_$paintSprite);
	            }
	        }

	        if (_imgWidth && _props.opacity !== 0 && _props.sw && _props.sh) {
	            if (!_props.rotate && !_text) {
	                (0, _perPaintCutOutside2.default)($canvas, _props, _imgWidth, _imgHeight);
	                // cut的结果没有取整，要看是否需要
	            }

	            var meetResultAfterCut = (0, _math2.default)(_props.tx, _props.ty, _props.tw, _props.th, 0, 0, $canvas.width - 1, $canvas.height - 1, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);
	            if (meetResultAfterCut) {
	                $sprite.$rendered = true;

	                /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */

	                var _$paintSprite2 = {
	                    $id: $sprite.$id,
	                    type: 'img',
	                    settings: settings,
	                    img: _img,
	                    props: _props
	                };

	                _img.$painted = true;

	                // if (process.env.NODE_ENV !== 'production') {
	                //     // 开发环境下，将元素挂载到$children里以供标记
	                _$paintSprite2.$origin = $sprite;
	                // };

	                $canvas.$children.push(_$paintSprite2);
	            }
	        }

	        // TODO: rewrite
	        if (_text) {
	            $sprite.$rendered = true;

	            var textTx = _props.tx;
	            var textTy = _props.ty;
	            var textAlign = _props.align || _props.textAlign || 'left';
	            var textFont = _props.textFont || '14px Arial';
	            var textFontsize = parseInt(textFont);
	            var textBaseline = 'top';
	            // let textFontsize = parseInt(textFont) * _props.scale;
	            // textFont = textFontsize + 'px Arial';
	            var textLineHeight = _props.lineHeight || textFontsize;

	            // Change css-align to canvas-align style
	            if (textAlign === 'center') {
	                textTx += _props.tw / 2;
	            } else if (textAlign === 'right') {
	                textTx += _props.tw;
	            }

	            // Change css-align to canvas-align style
	            if (_props.textVerticalAlign === 'top') {
	                textBaseline = 'top';
	            } else if (_props.textVerticalAlign === 'bottom') {
	                textBaseline = 'bottom';
	                textTy += _props.th;
	            } else if (_props.textVerticalAlign === 'middle') {
	                textTy += _props.th >> 1;
	                textBaseline = 'middle';
	            }

	            if (typeof _text === 'string' || typeof _text === 'number') {
	                if (textTy + textFontsize * 2 > 0 && textTy - textFontsize * 2 < $canvas.height) {
	                    $canvas.$children.push({
	                        $id: $sprite.$id,
	                        type: 'text',
	                        settings: settings,
	                        props: {
	                            tx: textTx,
	                            ty: textTy,
	                            content: String(_text),
	                            fontsize: textFontsize,
	                            align: textAlign,
	                            baseline: textBaseline,
	                            font: textFont,
	                            color: _props.color,
	                            type: _props.textType
	                        },
	                        $origin: $sprite
	                    });
	                }
	            } else if (_text.length) {
	                _text.forEach(function (t) {
	                    $canvas.$children.push({
	                        $id: $sprite.$id,
	                        type: 'text',
	                        settings: settings,
	                        props: {
	                            tx: textTx + _utils2.default.funcOrValue(t.tx, $sprite),
	                            ty: textTy + _utils2.default.funcOrValue(t.ty, $sprite),
	                            content: _utils2.default.funcOrValue(t.content, $sprite),
	                            fontsize: textFontsize,
	                            baseline: textBaseline,
	                            align: textAlign,
	                            font: textFont,
	                            color: _props.color,
	                            type: _props.textType
	                        },
	                        $origin: $sprite
	                    });
	                });
	            } else if (_text.type === 'multline-text') {
	                var textArr = _text.text.split(/\t|\n/);
	                var renderArr = [];
	                textArr.forEach(function (eachText, textIndex) {
	                    eachText = String.prototype.trim.apply(eachText);
	                    if (_text.config.start) {
	                        eachText = eachText.replace(_text.config.start, '');
	                    }
	                    var _i = 0;
	                    var length = _props.tw;
	                    while (eachText.length && _i < eachText.length) {
	                        if (length <= 0) {
	                            length = _props.tw;
	                            renderArr.push(eachText.substr(0, _i));
	                            eachText = eachText.substr(_i);
	                            _i = 0;
	                        }
	                        _i++;
	                        length -= textFontsize * (isChineseChar(eachText[_i]) ? 1.05 : 0.6);
	                    }
	                    if (eachText || textIndex) {
	                        renderArr.push(eachText);
	                    }
	                });
	                renderArr.forEach(function (r) {
	                    $canvas.$children.push({
	                        $id: $sprite.$id,
	                        type: 'text',
	                        settings: settings,
	                        props: {
	                            tx: textTx,
	                            ty: textTy,
	                            // tw: _props.tw,
	                            // th: _props.th,
	                            fontsize: textFontsize,
	                            content: r,
	                            baseline: textBaseline,
	                            align: textAlign,
	                            font: textFont,
	                            color: _props.color,
	                            type: _props.textType
	                        },
	                        $origin: $sprite
	                    });
	                    textTy += textLineHeight || textFontsize;
	                });
	            }
	        }

	        if (!_img && !_text) {
	            $sprite.$rendered = undefined;
	        }

	        _children.length && (0, _perPaintDeliverChildren2.default)($canvas, _children, 1);

	        if (settings.clip) {
	            if (meetResult) {
	                var _$paintSprite3 = {
	                    $id: $sprite.$id,
	                    type: 'clipOver',
	                    // settings: settings,
	                    props: _props
	                };

	                // if (process.env.NODE_ENV !== 'production') {
	                //     // 开发环境下，将元素挂载到$children里以供标记
	                _$paintSprite3.$origin = $sprite;
	                // };

	                $canvas.$children.push(_$paintSprite3);
	            }
	        }

	        if (settings.line) {
	            if (meetResult) {
	                $sprite.$rendered = true;

	                var _$paintSprite4 = {
	                    $id: $sprite.$id,
	                    type: 'line',
	                    settings: settings,
	                    props: _props
	                };

	                // if (process.env.NODE_ENV !== 'production') {
	                //     // 开发环境下，将元素挂载到$children里以供标记
	                _$paintSprite4.$origin = $sprite;
	                // };

	                $canvas.$children.push(_$paintSprite4);
	            }
	        }

	        _utils2.default.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
	    }
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _tick = __webpack_require__(24);

	var _tick2 = _interopRequireDefault(_tick);

	var _transition = __webpack_require__(25);

	var _transition2 = _interopRequireDefault(_transition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Execute function(@f) in each frame
	 * - Limit by browsers, adjusting the time not being a multiple of RAF's interval (16.7ms).
	 * - See https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
	 *
	 * ********** **/

	module.exports = function (f) {
	    var _this = this;

	    var time = Date.now();
	    _transition2.default.$lastPaintTime = this.$nextTickTime = time;

	    // calculating fps
	    if (time - this.fpsCalculateTime >= 1000) {
	        this.fpsCalculateTime = time;
	        if (this.fpsHandler) {
	            this.fpsHandler.call(this, this.fps);
	        }
	        this.lastFps = this.fps;
	        this.fps = 0;
	    }

	    (0, _tick2.default)(function (rafTime) {
	        _this.$rafTime = rafTime;
	        _this.$rAFer(f);
	        if (_this.maxFps > 0 && _this.maxFps < 60) {
	            if (time - _this.$lastPaintTime <= 1000 / _this.maxFps) {
	                return;
	            }

	            // 让$lastPaintTime不带有小尾巴（101，199，202，298这种变成100，200，300，400）
	            // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
	            _this.$lastPaintTime = time - (time - _this.$lastPaintTime) % (1000 / _this.maxFps);
	        } else {
	            _this.$lastPaintTime = Date.now();
	        }
	        _this.fps++;
	        f();
	    });
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var extend = function extend($sprite, settings) {
	    var _this = this;

	    var stopDefault = false;

	    this.$extendList.forEach(function (plugin) {
	        if (plugin.onRender) {
	            var res = plugin.onRender.call(_this, $sprite, settings);
	            if (res) {
	                stopDefault = res;
	            }
	        }
	    });

	    return stopDefault;
	}; /** ********** *
	    *
	    * CORE painting function
	    * - Controlling canvas context, Transfer $children to rendered sprite.
	    * - Includes some optimization.
	    *
	    * ********** **/

	var render = function render($sprite, i) {
	    var $canvas = this;

	    /*
	        props(Array)
	        @0    image/canvas Object
	        @1~4  source x, y, w, h
	        @5~8  target x, y, w, h
	    */
	    var props = $sprite.props;

	    /*
	        Jump useless paintings, by calculating border size
	    */
	    var currentSize = void 0;
	    var isText = $sprite.type === 'text';

	    // 一些扩展插件的绘制可能没有props
	    if (props && $sprite.type !== 'clip' && $sprite.type !== 'clipOver' && $sprite.type !== 'line') {
	        if (isText) {
	            var length = props.content.length;

	            currentSize = props.fontsize * props.fontsize * 9 * length;

	            props[5] = props.tx - props.fontsize * 1.5 * length;
	            if (props[5] < 0) props[5] = 0;
	            props[6] = props.ty - props.fontsize * 1.5;
	            if (props[6] < 0) props[6] = 0;
	            props[7] = props.fontsize * 3 * length;
	            if (props[5] + props[7] > $canvas.width) props[7] = $canvas.width - props[5];
	            props[8] = props.fontsize * 3;
	            if (props[6] + props[8] > $canvas.height) props[8] = $canvas.height - props[6];
	        } else {
	            currentSize = props.tw * props.th;
	        }

	        // 当前图层不太小的时候，判断是否可以跳过绘制
	        if ((currentSize > 200 * 200 || isText) && !$sprite.settings.transform && !$sprite.settings.rotate) {
	            var $children = $canvas.$children;
	            var l = $children.length;

	            for (var j = i + 1; j < l; j++) {
	                var $tmpSprite = $children[j];

	                if ($tmpSprite.$cannotCover) {
	                    // 被判断为不能遮挡当前绘制的直接跳过
	                    continue;
	                }

	                if ($tmpSprite.type === 'clip') {
	                    // clip到clipOver之间的不进行判断
	                    // 这些sprite可能无法遮挡当前要绘制的sprite
	                    while (j < l && $children[++j].type !== 'clipOver') {
	                        // do nothing
	                        // 仅仅是j自增1
	                    }
	                    continue;
	                }

	                var tmpSpriteSettings = $tmpSprite.settings;

	                if (!$tmpSprite.type || $tmpSprite.type !== 'img') {
	                    // 不是图片
	                    // 但fillRect可能还有透明度
	                    if (!($tmpSprite.type === 'fillRect' && tmpSpriteSettings.fillRect.indexOf('rgba') === -1)) {
	                        $tmpSprite.$cannotCover = true;
	                        continue;
	                    }
	                }

	                var tmpProps = $tmpSprite.props;

	                if (tmpProps.tw * tmpProps.th < 200 * 200) {
	                    // 太小的图片不认为可以遮挡
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                if (tmpProps.tw * tmpProps.th < currentSize) {
	                    continue;
	                }

	                if ($tmpSprite.img && !$tmpSprite.img.$noAlpha) {
	                    // 带alpha通道的图片不会遮挡当前图片，不能跳过当前图片的绘制
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                // 带rotate的元素暂时不考虑，需要复杂的计算
	                if (tmpSpriteSettings.globalAlpha !== 1 || tmpSpriteSettings.globalCompositeOperation || tmpSpriteSettings.transform || tmpSpriteSettings.rotate) {
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                if (_utils2.default.pointInRect(props.tx, props.ty, tmpProps.tx, tmpProps.tx + tmpProps.tw, tmpProps.ty, tmpProps.ty + tmpProps.th) && _utils2.default.pointInRect(props.tx + props.tw, props.ty + props.th, tmpProps.tx, tmpProps.tx + tmpProps.tw, tmpProps.ty, tmpProps.ty + tmpProps.th)) {
	                    if (process.env.NODE_ENV !== 'production') {
	                        $sprite.$origin.$useless = true;
	                        // props格式换了
	                        // $canvas.$plugin.jumpRender($canvas, props);
	                    }

	                    // console.log('useless');

	                    return;
	                }
	            }
	        }
	    }

	    var settings = $sprite.settings || {};

	    if (extend.call($canvas, $sprite, settings)) {
	        return;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        if ($sprite.$origin) {
	            $sprite.$origin.$useless = false;
	        }
	    }

	    var ctx = $canvas.$paintContext;

	    // if ($sprite.type === 'clip') { 
	    //     ctx.save();
	    //     // rect会导致FPS逐渐降低，怀疑未清理导致
	    //     // ctx.rect(props.tx, props.ty, props.tw, props.th);
	    //     ctx.beginPath();
	    //     ctx.moveTo(props.tx, props.ty);
	    //     ctx.lineTo(props.tx + props.tw, props.ty);
	    //     ctx.lineTo(props.tx + props.tw, props.ty + props.th);
	    //     ctx.lineTo(props.tx, props.ty + props.th);
	    //     ctx.lineTo(props.tx, props.ty);
	    //     ctx.closePath();
	    //     ctx.clip();
	    // }

	    /*
	        Rendering operation
	    */
	    var saved = false;

	    if (settings.globalCompositeOperation) {
	        if (!saved) {
	            ctx.save();
	            saved = true;
	        }
	        ctx.globalCompositeOperation = settings.globalCompositeOperation;
	    }

	    if (settings.globalAlpha !== 1 && !isNaN(settings.globalAlpha)) {
	        if (!saved) {
	            ctx.save();
	            saved = true;
	        }
	        ctx.globalAlpha = settings.globalAlpha;
	    }

	    if (settings.translate) {
	        if (!saved) {
	            ctx.save();
	            saved = true;
	        }
	        ctx.translate(settings.translate[0] || 0, settings.translate[1] || 0);
	    }

	    if (settings.rotate) {
	        if (!saved) {
	            ctx.save();
	            saved = true;
	        }
	        ctx.translate(settings.beforeRotate[0] || 0, settings.beforeRotate[1] || 0);
	        ctx.rotate(settings.rotate || 0);
	        ctx.translate(settings.afterRotate[0] || 0, settings.afterRotate[1] || 0);
	    }

	    if (settings.scale) {
	        if (!saved) {
	            ctx.save();
	            saved = true;
	        }
	        ctx.scale(settings.scale[0] || 1, settings.scale[1] || 1);
	    }

	    if (settings.transform) {
	        if (!saved) {
	            ctx.save();
	            saved = true;
	        }
	        ctx.transform(1, settings.transform.fh, settings.transform.fv, 1, settings.transform.fx, settings.transform.fy);
	    }

	    if ($sprite.type === 'img') {
	        ctx.drawImage($sprite.img, props.sx, props.sy, props.sw, props.sh, props.tx, props.ty, props.tw, props.th);
	        if (process.env.NODE_ENV !== 'production') {
	            $canvas.$plugin.drawImage($canvas, props);
	        }
	    } else if ($sprite.type === 'text' && props.content) {
	        ctx.font = props.font;
	        ctx.fillStyle = props.color || 'white';
	        ctx.textAlign = props.align;
	        ctx.textBaseline = props.baseline;
	        ctx[props.type || 'fillText'](props.content, props.tx, props.ty);
	    } else if ($sprite.type === 'fillRect') {
	        ctx.fillStyle = settings.fillRect;
	        ctx.fillRect(props.tx, props.ty, props.tw, props.th);
	    } else if ($sprite.type === 'line') {
	        ctx.beginPath();
	        ctx.strokeStyle = props.border.substr(props.border.indexOf(' ')) || 'black';

	        ctx.lineWidth = props.border.split(' ')[0] || 1;
	        ctx.moveTo(props.tx, props.ty);
	        ctx.lineTo(props.tx + props.tw, props.ty);
	        ctx.lineTo(props.tx + props.tw, props.ty + props.th);
	        ctx.lineTo(props.tx, props.ty + props.th);
	        // ctx.lineTo(props.tx, props.ty);

	        // let lineWidth = props.border.split(' ')[0] || 1;
	        // ctx.lineWidth = lineWidth;
	        // ctx.moveTo(props.tx - lineWidth, props.ty - lineWidth);
	        // ctx.lineTo(props.tx + props.tw + lineWidth, props.ty - lineWidth);
	        // ctx.lineTo(props.tx + props.tw + lineWidth, props.ty + props.th + lineWidth);
	        // ctx.lineTo(props.tx - lineWidth, props.ty + props.th + lineWidth);
	        // // ctx.lineTo(props.tx - lineWidth, props.ty - lineWidth);

	        ctx.closePath();
	        ctx.stroke();
	    } else if ($sprite.type === 'clipOver') {
	        // ctx.restore();
	    }

	    if (saved) {
	        ctx.restore();
	    }
	};

	module.exports = function () {
	    var $canvas = this;

	    $canvas.$children.forEach(render.bind($canvas));
	};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _remove = __webpack_require__(54);

	var _remove2 = _interopRequireDefault(_remove);

	var _start = __webpack_require__(58);

	var _start2 = _interopRequireDefault(_start);

	var _paint = __webpack_require__(51);

	var _paint2 = _interopRequireDefault(_paint);

	var _clear = __webpack_require__(15);

	var _clear2 = _interopRequireDefault(_clear);

	var _pause = __webpack_require__(52);

	var _pause2 = _interopRequireDefault(_pause);

	var _nextTick = __webpack_require__(16);

	var _nextTick2 = _interopRequireDefault(_nextTick);

	var _register = __webpack_require__(53);

	var _register2 = _interopRequireDefault(_register);

	var _setFpsHandler = __webpack_require__(55);

	var _setFpsHandler2 = _interopRequireDefault(_setFpsHandler);

	var _setMaxFps = __webpack_require__(56);

	var _setMaxFps2 = _interopRequireDefault(_setMaxFps);

	var _skeleton = __webpack_require__(57);

	var _skeleton2 = _interopRequireDefault(_skeleton);

	var _sprite = __webpack_require__(13);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import on from './apiOuter/on.js';
	// import off from './apiOuter/off.js';
	// import trigger from './apiOuter/trigger.js';
	// import broadcast from './apiOuter/broadcast.js';
	var apiOuter = {
	    start: _start2.default,
	    paint: _paint2.default,
	    add: _sprite2.default.prototype.add,
	    remove: _remove2.default,
	    register: _register2.default,
	    clear: _clear2.default,
	    setFpsHandler: _setFpsHandler2.default,
	    setMaxFps: _setMaxFps2.default,
	    pause: _pause2.default,
	    on: _sprite2.default.prototype.on,
	    off: _sprite2.default.prototype.off,
	    trigger: _sprite2.default.prototype.trigger,
	    broadcast: _sprite2.default.prototype.broadcast,
	    nextTick: _nextTick2.default,
	    getAllChildren: _sprite2.default.prototype.getAllChildren
	}; /** ********** *
	    *
	    * Inner apis of an easycanvas instance
	    * - Used for Easycanvas.js and the outsides.
	    * - Will be added to Easycanvas instance's prototype.
	    *
	    * ********** **/

	// import add from './apiOuter/add.js';


	if (process.env.NODE_ENV !== 'production') {
	    apiOuter.skeleton = _skeleton2.default;
	}

	module.exports = apiOuter;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// var c = document.createElement('canvas');
	// c.height = 1334;
	// c.width = 750;
	// var d = c.getContext('2d');

	var diffRender = function diffRender(olds, news) {
	    if (!olds || olds.length !== news.length) {
	        return news;
	    }

	    for (var i = 0; i < olds.length; i++) {
	        var o = olds[i];
	        var n = news[i];

	        if (o.$id !== n.$id || o.img !== n.img) return news;
	        if (o.props && n.props) {
	            // if (o.props.opacity !== n.props.opacity) return news;
	            // if (o.props.rotate !== n.props.rotate) return news;
	            // if (o.props.sh !== n.props.sh) return news;
	            // if (o.props.sw !== n.props.sw) return news;
	            // if (o.props.sx !== n.props.sx) return news;
	            // if (o.props.sy !== n.props.sy) return news;
	            // if (o.props.th !== n.props.th) return news;
	            // if (o.props.tw !== n.props.tw) return news;
	            // if (o.props.tx !== n.props.tx) return news;
	            // if (o.props.ty !== n.props.ty) return news;
	            // if (o.props.text !== n.props.text) return news;
	            // if (o.props.align !== n.props.align) return news;
	            // if (o.props.baseline !== n.props.baseline) return news;
	            // if (o.props.color !== n.props.color) return news;
	            // if (o.props.type !== n.props.type) return news;
	            // if (o.props.font !== n.props.font) return news;

	            for (var prop in n.props) {
	                if (n.props[prop] !== o.props[prop]) return news;
	            }
	        }
	    }

	    return false;
	}; /** ********** *
	    *
	    * Sort the sprite and call inner functions
	    * - Will be called in each frame after the 'start' function called.
	    *
	    * ********** **/

	module.exports = function () {
	    if (this.$pausing || this.$inBrowser && document.hidden) return;

	    var $canvas = this;

	    _utils2.default.execFuncs($canvas.hooks.beforeTick, $canvas, [$canvas.$rafTime]);

	    if (!$canvas.$freezing) {
	        $canvas.$lastTickChildren = $canvas.$children;
	        $canvas.$children = [];

	        if (process.env.NODE_ENV !== 'production') {
	            $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'START');
	        }

	        this.children.sort(function (a, b) {
	            var za = _utils2.default.funcOrValue(a.style.zIndex, a);
	            var zb = _utils2.default.funcOrValue(b.style.zIndex, b);
	            if (za === zb) return 0;
	            return za > zb ? 1 : -1;
	        }).forEach(function (perItem, index) {
	            $canvas.$perPaint(perItem, index);
	        });

	        if (process.env.NODE_ENV !== 'production') {
	            $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'END');
	        }
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'START');
	    }

	    if ($canvas.$paintContext.clearRect) {
	        var diffs = $canvas.$nodiff ? $canvas.$children : diffRender($canvas.$lastTickChildren, $canvas.$children);
	        if (diffs) {
	            // d.globalAlpha = 0.3;
	            // d.clearRect(0, 0, this.width, this.height);
	            // d.globalAlpha = 0.7;
	            // d.drawImage($canvas.$dom, 0,0);
	            $canvas.$paintContext.clearRect(0, 0, this.width, this.height);
	            $canvas.$render();
	        }
	    } else {
	        $canvas.$render();
	    }
	    // $canvas.$paintContext.globalAlpha = 0.3;
	    // $canvas.$paintContext.drawImage(c,0,0);
	    // $canvas.$paintContext.globalAlpha = 1;

	    if (process.env.NODE_ENV !== 'production') {
	        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'END');
	    }

	    _utils2.default.execFuncs($canvas.hooks.ticked, $canvas, [$canvas.$rafTime]);

	    if ($canvas.hooks.nextTick) {
	        _utils2.default.execFuncs($canvas.hooks.nextTick, $canvas, [$canvas.$rafTime]);
	        delete $canvas.hooks.nextTick;
	    }
	};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Stop painting in paint function.
	 *
	 * ********** **/

	module.exports = function (val) {
	  this.$pausing = val === undefined ? true : val;
	};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Create an Easycanvas instance on current dom
	 * - Start the 'hold' event judging interval(may includes a memory waste after destroyed).
	 *
	 * ********** **/

	var extend = function extend(opt) {
	    var _this = this;

	    this.$extendList.forEach(function (plugin) {
	        if (plugin.onCreate) {
	            plugin.onCreate.call(_this, opt);
	        }
	    });
	};

	module.exports = function (dom, option) {
	    var _this2 = this;

	    if (process.env.NODE_ENV !== 'production') {
	        this.fpsHandler = this.fpsHandler || function (fps) {
	            if (this.maxFps > 0 && fps < this.maxFps - 5 && fps < 40) {
	                console.warn('[Easycanvas] Low FPS detected (' + fps + '/' + this.maxFps + ').');
	            }
	        };
	    }

	    var _option = option || {};

	    dom = this.$dom = dom || this.$dom;

	    if (process.env.NODE_ENV !== 'production') {
	        if (!dom) {
	            console.error('[Easycanvas] Not found <canvas> element in "register" function.');
	        }
	    }

	    // 修复iOS下click时闪烁
	    // https://stackoverflow.com/questions/9526719/ipad-canvas-flickers-when-tapped
	    // dom.style['webkitTapHighlightColor'] = 'rgba(0,0,0,0);';

	    for (var i in _option) {
	        this[i] = _option[i];
	    }

	    this.name = _option.name || dom.id || dom.classList && dom.classList[0] || 'Unnamed';
	    this.$inBrowser = typeof window !== 'undefined';

	    if (_option.fullScreen && typeof document !== 'undefined') {
	        dom.width = dom.style.width = document.body.clientWidth || document.documentElement.clientWidth;
	        dom.height = dom.style.height = document.body.clientHeight || document.documentElement.clientHeight;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        if (_option.width && dom.attributes.width && _option.width !== dom.width || _option.height && dom.attributes.height && _option.height !== dom.height) {
	            console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
	        }
	    }

	    dom.width = this.width = this.width || _option.width || dom.width;
	    dom.height = this.height = this.height || _option.height || dom.height;

	    if (process.env.NODE_ENV !== 'production') {
	        this.$plugin.register(this);
	    }

	    this.events = _option.events || {};

	    this.hooks = _option.hooks || {};

	    if (this.$inBrowser) {
	        var eventList = ['contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'];
	        eventList.forEach(function (e) {
	            dom.addEventListener(e, _this2.$eventHandler.bind(_this2));
	        });
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        if (this.$paintContext) {
	            console.error('[Easycanvas] Current instance is already registered.');
	        }
	    }

	    extend.call(this, _option);

	    this.$paintContext = this.$paintContext || dom.getContext('2d');

	    return this;
	};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function ($sprite, sync) {
	    var _this = this;

	    _utils2.default.execFuncs($sprite.hooks.beforeRemove, $sprite, $sprite.$tickedTimes++);

	    $sprite.style.visible = false;
	    $sprite.$removing = true;

	    setTimeout(function () {
	        if ($sprite.$parent) {
	            $sprite.$parent.children = $sprite.$parent.children.filter(function (child) {
	                return child.$removing !== true;
	            });
	        } else {
	            _this.children = _this.children.filter(function (child) {
	                return child.$removing !== true;
	            });
	        }

	        if ($sprite.$canvas) {
	            $sprite.$canvas = undefined;
	            $sprite.$parent = undefined;
	            $sprite.$tickedTimes = undefined;
	            $sprite.$cache = undefined;
	            $sprite.$rendered = false;
	            if (process.env.NODE_ENV !== 'production') {
	                $sprite.$perf = undefined;
	            }
	            _utils2.default.execFuncs($sprite.hooks.removed, $sprite, $sprite.$tickedTimes);
	        }
	    });

	    if (sync) {
	        this.children.splice(this.children.indexOf($sprite), 1);
	    }
	}; /** ********** *
	    *
	    * Remove a sprite (async)
	    * - In develop mode, fps will throw warnings in low performance.
	    *
	    * ********** **/

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Set fps handler
	 * - Same to new Easycanvas.painter().fpsHandler = callback
	 *
	 * ********** **/

	module.exports = function (callback) {
	  this.fpsHandler = callback;
	};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Set max fps
	 * - @fps -1 means Infinity
	 *
	 * ********** **/

	module.exports = function (fps) {
	  this.maxFps = fps || -1;
	};

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	    module.exports = function () {
	        var $canvas = this;

	        $canvas.children[0].__proto__.getAllChildren.call($canvas).forEach(function (child) {
	            child.uncombine();
	            child.$combine = true;
	        });

	        $canvas.paint();

	        $canvas.children[0].__proto__.getAllChildren.call($canvas).forEach(function (child) {
	            child.$combine = false;
	        });

	        var sekeletonString = '';
	        sekeletonString += "var $SKL=document.getElementsByTagName('canvas')[0];";
	        sekeletonString += '$SKL.width=' + $canvas.width + ';$SKL.height=' + $canvas.height + ';';
	        sekeletonString += "$SKL.style.width='100%';$SKL.style.width='100%';";
	        sekeletonString += "var SKLIMG=[];";
	        sekeletonString += "var SKL = function(){";
	        sekeletonString += "var _=$SKL.getContext('2d');";

	        var $children = $canvas.$children;
	        $children.forEach(function ($child) {
	            var props = $child.props;
	            var settings = $child.settings;

	            if ($child.type === 'img') {
	                sekeletonString += '_.globalAlpha=' + settings.globalAlpha + ';';

	                if ($child.img && $child.img.$origin) {
	                    // is canvas
	                    sekeletonString += $child.img.$origin.join(';') + ';';
	                    sekeletonString += '_.drawImage(tempCanvas, ' + props.sx + ', ' + props.sy + ', ' + props.sw + ', ' + props.sh + ', ' + props.tx + ', ' + props.ty + ', ' + props.tw + ', ' + props.th + ');';
	                } else if ($child.img && $child.img.src) {
	                    sekeletonString += 'var img = new Image();';
	                    sekeletonString += 'var imgUrl=\'' + $child.img.src + '\';if(SKLIMG.indexOf(imgUrl)===-1){SKLIMG.push(imgUrl);img.onload=function(){_.clearRect(0,0,$SKL.width,$SKL.height);SKL();}};';
	                    sekeletonString += 'img.src=imgUrl;';
	                    sekeletonString += '_.drawImage(img, ' + props.sx + ', ' + props.sy + ', ' + props.sw + ', ' + props.sh + ', ' + props.tx + ', ' + props.ty + ', ' + props.tw + ', ' + props.th + ');';
	                } else {
	                    sekeletonString += '_.fillStyle=\'#666\';';
	                    sekeletonString += '_.fillRect(' + props.tx + ', ' + props.ty + ', ' + props.tw + ', ' + props.th + ');';
	                }
	            } else if ($child.type === 'fillRect') {
	                sekeletonString += '_.globalAlpha=' + settings.globalAlpha + ';';

	                sekeletonString += '_.fillStyle=\'' + settings.fillRect + '\';';
	                sekeletonString += '_.fillRect(' + props.tx + ', ' + props.ty + ', ' + props.tw + ', ' + props.th + ');';
	            }
	        });

	        sekeletonString += '_.globalAlpha=1;';
	        sekeletonString += '};SKL($SKL);';

	        console.log(sekeletonString);
	    };
	}

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Start rAF loop
	 * - Cannot called twice on same instance
	 *
	 * ********** **/

	module.exports = function () {
	    this.fpsCalculateTime = Date.now();
	    this.$rAFer(this.paint.bind(this));

	    // setInterval(() => {
	    //     if (this.eHoldingFlag) {
	    //         let $e = this.eHoldingFlag;
	    //         $e.type = 'hold';

	    //         this.$eventHandler.call(this, null, $e);
	    //     }
	    // }, 100); // TODO

	    return this;
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Plugined to each canvas instance
	 * - Will add a 'mask' sprite to show the active sprite.
	 * - Only works in develop mode.
	 * - The handlers are in /plugin/panel/index.js file.
	 *
	 * ********** **/

	module.exports = function () {
	    if (process.env.NODE_ENV !== 'production') {
	        var TO_PANEL_EVENT_NAME = '__EASYCANVAS_BRIDGE_TOPANEL__';

	        // 不再通过事件来监听了devTool了，直接从devTool来inspectedWindow.eval
	        // window.document.addEventListener('__EASYCANVAS_BRIDGE_TODOC__', function (recieveData) {
	        //     let data = recieveData.detail;

	        //     if (data.action = 'code') {
	        //         // console.log(data.content);
	        //         eval(data.content);
	        //     }
	        // });

	        var $emit = function $emit(passData) {
	            passData.tabId = window[_constants2.default.devFlag].tabId;

	            window.document.dispatchEvent(new CustomEvent(TO_PANEL_EVENT_NAME, {
	                //  filtering special types
	                detail: JSON.parse(JSON.stringify(passData))
	                // bubbles: true,
	                // cancelable: true
	            }));
	        };

	        var textFont = '24px san-serif';
	        var textFontSmall = '18px san-serif';
	        var measureText = function measureText(text, size) {
	            var tempCanvas = document.createElement('canvas');
	            var tempCtx = tempCanvas.getContext('2d');
	            tempCtx.font = size || textFont;
	            return tempCtx.measureText(text).width;
	        };

	        setTimeout(function () {
	            $emit({
	                name: 'init'
	            });
	        });

	        var MaskCanvasBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

	        var MaskTriangleCanvas = function () {
	            var canvas = document.createElement('canvas');
	            canvas.width = 40;
	            canvas.height = 20;
	            var ctx = canvas.getContext('2d');
	            ctx.beginPath();
	            ctx.moveTo(0, 20);
	            ctx.lineTo(40, 20);
	            ctx.lineTo(20, 0);
	            ctx.closePath(); // draws last line of the triangle
	            ctx.fill();
	            return canvas;
	        }();

	        var $selectMask = null;
	        var $selectMaskParent = null;

	        var PerSecondCollects = ['paintArea', 'paintTimes', 'paintTimeSpend', 'preprocessTimeSpend', 'loadArea', 'jumpArea'];

	        var ApiPlugin = {
	            drawImage: function drawImage($canvas, _props) {
	                if (!window[_constants2.default.devFlag].isPaintRecording) return;

	                if (_props) {
	                    $canvas.$perf.$paintArea += _props[7] * _props[8];
	                    $canvas.$perf.$loadArea += _props[3] * _props[4];
	                }

	                $canvas.$perf.$paintTimes++;
	            },
	            jumpRender: function jumpRender($canvas, _props) {
	                $canvas.$perf.$jumpArea += _props[7] * _props[8];
	            },
	            register: function register($canvas) {
	                $canvas.$id = Math.random().toString(36).substr(2);

	                // 性能打点
	                // 带$是临时值，否则为每秒的快照值；临时值每秒快照一次
	                // 因此开发工具只需要使用快照进行分析即可
	                $canvas.$perf = {};
	                PerSecondCollects.forEach(function (key) {
	                    $canvas.$perf[key] = 0;
	                    $canvas.$perf['$' + key] = 0;
	                });

	                setInterval(function () {
	                    PerSecondCollects.forEach(function (key) {
	                        $canvas.$perf[key] = $canvas.$perf['$' + key];
	                        $canvas.$perf['$' + key] = 0;
	                    });
	                }, 1000);

	                if (!$canvas.$flags.devtoolHanged) {
	                    window[_constants2.default.devFlag].$canvas[$canvas.$id] = $canvas;
	                    $canvas.$flags.devtoolHanged = true;
	                }
	            },
	            timeCollect: function timeCollect($canvas, type, startOrEnd) {
	                // START与END必须在同一个event loop中，且位于相同的微任务队列中
	                // 否则会影响指标收集
	                $canvas.$perf['$' + type] += (startOrEnd === 'START' || startOrEnd === 'PAUSE' ? -1 : 1) * Date.now();
	            },
	            selectSprite: function selectSprite(isChoosing, $canvas, $sprite) {
	                window[_constants2.default.devFlag].MaskCanvasBase64 = MaskCanvasBase64;

	                if (!$sprite || !window[_constants2.default.devFlag].selectMode) {
	                    ApiPlugin.cancelSelectSprite($canvas);
	                    return false;
	                }

	                if (!$selectMask) {
	                    var tipsWidth = 0;
	                    var maskRect = {};
	                    var maskParentRect = {};

	                    $selectMask = $canvas.add({
	                        // 高亮
	                        name: _constants2.default.devFlag,
	                        content: {
	                            img: $canvas.imgLoader(MaskCanvasBase64)
	                        },
	                        style: {
	                            border: function border() {
	                                if (this.getStyle('tw') < 2 && this.getStyle('th') < 2) {
	                                    return '10 rgba(0, 0, 255, 0.5)';
	                                }
	                                return '1 blue';
	                            }
	                        },
	                        webgl: undefined,
	                        children: !$canvas.$paintContext.clearRect ? [] : [{
	                            // sprite名字
	                            name: _constants2.default.devFlag,
	                            data: {},
	                            style: {
	                                locate: 'center',
	                                tx: function tx() {
	                                    var res = maskRect.tx + maskRect.tw / 2;

	                                    if (res - tipsWidth / 2 < 10) {
	                                        res = tipsWidth / 2 + 10;
	                                    } else if (res + tipsWidth / 2 > this.$canvas.width - 10) {
	                                        res = this.$canvas.width - tipsWidth / 2 - 10;
	                                    }

	                                    return res - this.$parent.$cache.tx;
	                                },
	                                ty: function ty() {
	                                    var res = maskRect.ty + maskRect.th + 30;
	                                    if (this.data.above = res + 30 > this.$canvas.height) {
	                                        res = maskRect.ty - 32;
	                                    }

	                                    return res - this.$parent.$cache.ty;
	                                },
	                                tw: function tw() {
	                                    return tipsWidth;
	                                },

	                                th: 32,
	                                color: 'orange',
	                                backgroundColor: 'black',
	                                textVerticalAlign: 'top',
	                                textAlign: 'center',
	                                textFont: textFont
	                            },
	                            hooks: {
	                                beforeTick: function beforeTick() {
	                                    maskRect = this.$parent.getRect();
	                                    this.content.text = '<' + $sprite.name + '> | ' + Math.round(this.$parent.getStyle('tw')) + '×' + Math.round(this.$parent.getStyle('th'));
	                                    tipsWidth = measureText(this.content.text) + 20;
	                                }
	                            },
	                            children: [{
	                                name: _constants2.default.devFlag,
	                                content: {
	                                    img: MaskTriangleCanvas
	                                },
	                                style: {
	                                    tx: function tx() {
	                                        return maskRect.tx + maskRect.tw / 2 - this.$parent.$cache.tx;
	                                    },
	                                    ty: function ty() {
	                                        return this.$parent.data.above ? 5 + 16 : -5 - 16;
	                                    },

	                                    tw: 20, th: 10,
	                                    rotate: function rotate() {
	                                        return this.$parent.data.above ? 180 : 0;
	                                    }
	                                }
	                            }]
	                        }, {
	                            // 距离parent的距离标注
	                            name: _constants2.default.devFlag,
	                            style: {
	                                visible: function visible() {
	                                    return this.getStyle('tw') < this.data.value;
	                                },

	                                locate: 'center',
	                                tx: function tx() {
	                                    var res = maskParentRect.tx + ($selectMask.getSelfStyle('tx') - $selectMaskParent.getSelfStyle('tx')) / 2;
	                                    return res - this.$parent.$cache.tx;
	                                },
	                                ty: function ty() {
	                                    var res = $selectMask.getSelfStyle('ty');
	                                    return res - this.$parent.$cache.ty;
	                                },
	                                tw: function tw() {
	                                    return measureText(this.content.text, textFontSmall) + 10;
	                                },

	                                th: 20,
	                                backgroundColor: '#ddd',
	                                color: 'black',
	                                textVerticalAlign: 'middle',
	                                textAlign: 'center',
	                                textFont: textFontSmall
	                            },
	                            data: {},
	                            hooks: {
	                                beforeTick: function beforeTick() {
	                                    maskParentRect = $selectMaskParent.getRect();
	                                    this.data.value = Math.round($selectMask.getSelfStyle('tx') - $selectMaskParent.getSelfStyle('tx'));
	                                    this.content.text = 'left: ' + String(this.data.value);
	                                }
	                            }
	                        }, {
	                            // 距离parent的距离标注
	                            name: _constants2.default.devFlag,
	                            style: {
	                                visible: function visible() {
	                                    return this.getStyle('th') < this.data.value;
	                                },

	                                locate: 'center',
	                                tx: function tx() {
	                                    var res = $selectMask.getSelfStyle('tx');
	                                    return res - this.$parent.$cache.tx;
	                                },
	                                ty: function ty() {
	                                    var res = maskParentRect.ty + ($selectMask.getSelfStyle('ty') - $selectMaskParent.getSelfStyle('ty')) / 2;
	                                    return res - this.$parent.$cache.ty;
	                                },
	                                tw: function tw() {
	                                    return measureText(this.content.text, textFontSmall) + 10;
	                                },

	                                th: 20,
	                                backgroundColor: '#ddd',
	                                color: 'black',
	                                textVerticalAlign: 'middle',
	                                textAlign: 'center',
	                                textFont: textFontSmall
	                            },
	                            data: {},
	                            hooks: {
	                                beforeTick: function beforeTick() {
	                                    maskParentRect = $selectMaskParent.getRect();
	                                    this.data.value = Math.round($selectMask.getSelfStyle('ty') - $selectMaskParent.getSelfStyle('ty'));
	                                    this.content.text = 'top: ' + String(this.data.value);
	                                }
	                            }
	                        }]
	                    });

	                    $selectMaskParent = $canvas.add({
	                        name: _constants2.default.devFlag,
	                        style: {
	                            // backgroundColor: 'yellow',
	                            locate: 'lt'
	                        },
	                        children: [{
	                            name: _constants2.default.devFlag,
	                            style: {
	                                locate: 'lt',
	                                tx: 0, ty: 0,
	                                tw: function tw() {
	                                    return $selectMask.getSelfStyle('tx') - this.$parent.getStyle('tx');
	                                },
	                                th: function th() {
	                                    return $selectMask.getSelfStyle('ty') - this.$parent.getStyle('ty');
	                                },

	                                backgroundColor: 'rgba(140, 205, 255, 0.1)',
	                                border: '1 rgba(80, 120, 200, 0.9)'
	                            }
	                        }]
	                    });
	                }

	                ['tx', 'ty', 'rotate', 'rx', 'ry', 'scale', 'tw', 'th', 'locate'].forEach(function (key) {
	                    (function (_key) {
	                        $selectMask.style[_key] = function () {
	                            if (_key === 'tw' || _key === 'th') {
	                                return $sprite.getStyle(_key) || $sprite.getRect()[_key] || 0.1; // 如果尺寸为0，会使用mask的图片尺寸，变成1
	                            }
	                            return $sprite.getStyle(_key);
	                        };
	                    })(key);
	                });

	                ['tx', 'ty'].forEach(function (key) {
	                    (function (_key) {
	                        $selectMaskParent.style[_key] = function () {
	                            if (!$sprite.$parent) return 0;

	                            return $sprite.$parent.getStyle(_key);
	                        };
	                    })(key);
	                });

	                $selectMask.style.zIndex = Number.MAX_SAFE_INTEGER;
	                $selectMaskParent.style.zIndex = Number.MAX_SAFE_INTEGER - 1;
	                $selectMask.style.visible = function () {
	                    return window[_constants2.default.devFlag].selectMode && $sprite.$canvas;
	                };
	                $selectMaskParent.style.visible = function () {
	                    return window[_constants2.default.devFlag].selectMode && $sprite.$parent && $sprite.$parent.$canvas;
	                };
	                $selectMask.style.opacity = 0.8;

	                // mask of webgl
	                $selectMask.webgl = $sprite.webgl ? {} : undefined;
	                if ($selectMask.webgl) {
	                    for (var key in $sprite.webgl) {
	                        (function (_key) {
	                            $selectMask.webgl[_key] = function () {
	                                if (typeof $sprite.webgl[_key] === 'function') {
	                                    return $sprite.webgl[_key].call($sprite);
	                                }
	                                return $sprite.webgl[_key];
	                            };
	                        })(key);
	                    }

	                    $selectMask.webgl.img = $canvas.imgLoader(MaskCanvasBase64);
	                    $selectMask.webgl.colors = false;
	                    $selectMask.style.zIndex = Number.MIN_SAFE_INTEGER;
	                }

	                if (isChoosing) {
	                    $canvas.remove($selectMask);
	                    $canvas.remove($selectMaskParent);
	                    $selectMask = null;
	                    $emit({
	                        name: 'selectSprite',
	                        id: $canvas.$id,
	                        value: {
	                            sprite: $sprite.$id,
	                            canvas: $canvas.$id
	                        }
	                    });
	                    window[_constants2.default.devFlag].current = {
	                        $sprite: $sprite,
	                        $canvas: $canvas
	                    };
	                    window[_constants2.default.devFlag].selectMode = false;
	                }

	                return true;
	            },
	            cancelSelectSprite: function cancelSelectSprite($canvas) {
	                if (!$selectMask) return;

	                $canvas.remove($selectMask);
	                $canvas.remove($selectMaskParent);
	                $selectMask = null;
	            }
	        };

	        return ApiPlugin;
	    }
	};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _apiOuter = __webpack_require__(50);

	var _apiOuter2 = _interopRequireDefault(_apiOuter);

	var _apiInner = __webpack_require__(43);

	var _apiInner2 = _interopRequireDefault(_apiInner);

	var _prototype = __webpack_require__(61);

	var _prototype2 = _interopRequireDefault(_prototype);

	var _imgLoader = __webpack_require__(9);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Exports an Easycanvas Prototype
	 * - Merge apis to its prototypes.
	 *
	 * ********** **/

	var painter = function painter(config) {
	    this.imgLoader = _imgLoader2.default;

	    for (var i in _prototype2.default) {
	        // Avoid muti instances from sharing data
	        this[i] = this[i] || JSON.parse(JSON.stringify(_prototype2.default[i]));
	    }

	    if (!config) {
	        return;
	    }

	    if (!config.el) {
	        config = {
	            el: config
	        };
	    }

	    if (config.el) {
	        this.register(typeof config.el === 'string' ? document.querySelector(config.el) : config.el, config);
	    }
	};

	painter.prototype.$extendList = [];

	for (var i in _apiInner2.default) {
	    if (Object.prototype.hasOwnProperty.call(_apiInner2.default, i)) {
	        painter.prototype[i] = _apiInner2.default[i];
	    }
	}

	for (var _i in _apiOuter2.default) {
	    if (Object.prototype.hasOwnProperty.call(_apiOuter2.default, _i)) {
	        painter.prototype[_i] = _apiOuter2.default[_i];
	    }
	}

	module.exports = painter;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Prototype of canvas instance
	 * - In develop mode, fps will throw warnings in low performance.
	 *
	 * ********** **/

	var PROTOS = {
	    $dom: null,
	    $paintContext: null,
	    $nextTickTime: 0,
	    $lastPaintTime: 0, // 只有当maxFps位于1～59时才不为0
	    $pausing: false,
	    $freezing: false,

	    name: '',
	    fps: 0,
	    lastFps: 0,
	    fpsCalculateTime: 0,
	    fpsHandler: null,
	    width: 0,
	    height: 0,
	    events: {
	        click: null
	    },
	    children: [],
	    eHoldingFlag: false,
	    eLastMouseHover: null,

	    maxFps: -1,

	    /* optimise */
	    // optimiser: {
	    //     blockSize: 100,
	    //     cacheMap: {},
	    // },

	    /* flags */
	    $flags: {
	        // dragging: false
	    }
	};

	module.exports = PROTOS;

/***/ }),
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _imgLoader = __webpack_require__(9);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	var _img2base = __webpack_require__(10);

	var _img2base2 = _interopRequireDefault(_img2base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (url, option) {
	    var result;

	    (0, _img2base2.default)(url, function (base64) {
	        return (0, _imgLoader2.default)(base64, function (canvas) {
	            // let t0 = new Date() * 1;
	            var cw = canvas.width,
	                ch = canvas.height;
	            var imageData = canvas.getContext('2d').getImageData(0, 0, cw, ch);
	            var data = imageData.data;

	            for (var i = data.length - 1; i >= 0; i -= 4) {
	                if (option && option.conversion) {
	                    var pixel = option.conversion({
	                        r: data[i - 3],
	                        g: data[i - 2],
	                        b: data[i - 1],
	                        a: data[i]
	                    }, (i + 1 >> 2) % cw, Math.floor((i + 1 >> 2) / cw));
	                    data[i - 3] = pixel.r;
	                    data[i - 2] = pixel.g;
	                    data[i - 1] = pixel.b;
	                    data[i - 0] = pixel.a;
	                }
	            }

	            canvas.getContext('2d').clearRect(0, 0, cw, ch);
	            canvas.getContext('2d').putImageData(imageData, 0, 0);
	            result = canvas;
	            // console.log(new Date() * 1 - t0);
	        }, {
	            canvas: true,
	            cacheFlag: Math.random()
	        });
	    });

	    return function () {
	        return result;
	    };
	};

/***/ }),
/* 102 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function mirrorImage(orgImage) {
	  var imageWidth = orgImage.width;
	  var imageHeight = orgImage.height;

	  var tempCanvas = document.createElement('canvas');
	  tempCanvas.width = imageWidth;
	  tempCanvas.height = imageHeight;

	  var context = tempCanvas.getContext("2d");
	  context.scale(1, -1);
	  context.translate(0, -imageHeight);
	  context.drawImage(orgImage, 0, 0);
	  var flipImage = context.getImageData(0, 0, imageWidth, imageHeight);

	  return {
	    canvas: context,
	    img: flipImage
	  };
	};

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function (text, config) {
	    return {
	        type: 'multline-text',
	        text: text,
	        config: config
	    };
	};

/***/ })
/******/ ])
});
;