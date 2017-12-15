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

	module.exports = __webpack_require__(16);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    funcOrValue: function funcOrValue(_funcOrValue, _this) {
	        if (typeof _funcOrValue === 'function') {
	            var res = _funcOrValue.call(_this);
	            return res && typeof res.$$value !== 'undefined' ? res.$$value : res;
	        }

	        return _funcOrValue;
	    },

	    execFuncs: function execFuncs(funcOrArray, _this, _arg) {
	        if (typeof funcOrArray === 'function') {
	            funcOrArray.apply(_this, _arg);
	        } else if (Array.prototype.isPrototypeOf(funcOrArray)) {
	            funcOrArray.forEach(function (f) {
	                f && f.apply(_this);
	            });
	        }
	    },

	    getMinFromArray: function getMinFromArray(arr) {
	        var res = arr[0];
	        arr.forEach(function (item) {
	            if (item < res) {
	                res = item;
	            }
	        });
	        return res;
	    },

	    getCharFromKey: function getCharFromKey(k) {
	        return k.key || String.fromCharCode(k.keyCode);
	    },

	    noop: function noop() {},

	    firstValuable: function firstValuable(a, b) {
	        return typeof a === 'undefined' ? b : a;
	    },

	    assign: function assign(target, source) {
	        for (var i in source) {
	            if (Object.prototype.hasOwnProperty.call(source, i)) {
	                target[i] = source[i];
	            }
	        }
	        return target;
	    }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    xywh: ['sx', 'sy', 'sw', 'sh', 'tx', 'ty', 'tw', 'th'],
	    txywh: ['tx', 'ty', 'tw', 'th'],
	    sxywh: ['sx', 'sy', 'sw', 'sh'],
	    devFlag: '__EASYCANVAS_DEVTOOL__'
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	var num = function num(x, y, sx, sy, diff) {
	    var _diff = diff || 1;

	    if (x - sx >= _diff) {
	        if (y - sy >= _diff) {
	            return 3;
	        } else if (y - sy <= -_diff) {
	            return 9;
	        }

	        return 6;
	    }

	    if (x - sx <= -_diff) {
	        if (y - sy >= _diff) {
	            return 1;
	        } else if (y - sy <= -_diff) {
	            return 7;
	        }

	        return 4;
	    }

	    if (y - sy >= _diff) {
	        return 2;
	    } else if (y - sy <= -_diff) {
	        return 8;
	    }

	    return 5;
	};

	var _NUM2XAY = {
	    '1': { x: -1, y: 1 },
	    '2': { x: 0, y: 1 },
	    '3': { x: 1, y: 1 },
	    '4': { x: -1, y: 0 },
	    '5': { x: 0, y: 0 },
	    '6': { x: 1, y: 0 },
	    '7': { x: -1, y: -1 },
	    '8': { x: 0, y: -1 },
	    '9': { x: 1, y: -1 }
	};

	module.exports = {
	    num: num,

	    xy: function xy() {
	        var _num = num.apply(this, arguments);
	        return JSON.parse(JSON.stringify(_NUM2XAY[_num] || {}));
	    },

	    NUM2XAY: function NUM2XAY(val) {
	        return JSON.parse(JSON.stringify(_NUM2XAY[val]));
	    },

	    pointInRect: function pointInRect(x, y, x1, x2, y1, y2) {
	        return !(x < x1 || x > x2 || y < y1 || y > y2);
	    },

	    getDistanceSq: function getDistanceSq(x1, y1, x2, y2) {
	        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	    },

	    enoughNear: function enoughNear(x1, y1, x2, y2, r) {
	        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= r * r;
	    }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _positionCompare = __webpack_require__(3);

	var _positionCompare2 = _interopRequireDefault(_positionCompare);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Bind drag events to EVERY SPRITE.
	 * - Whether to trigger handlers, is decided by '$Sprite.scroll.scrollable'.
	 * - Drag events FISRT, scroll events FOLLOWING. Drags will stop events' bubbling.
	 * - TODO: Move 'bindings' to event handlers
	 *
	 * ********** **/

	var draggingFlag = false;

	var setFlag = function setFlag($sprite, value) {
	    $sprite.drag.draggingFlag = value;
	    draggingFlag = value;
	};

	var dragHandler = function dragHandler(originHandler, item, e, dragEnabled) {
	    return originHandler ? originHandler.call(item, e) : dragEnabled ? 'drag' : false;
	};

	module.exports = {
	    bind: function bind($sprite) {
	        var startDragPosition = {
	            x: 0,
	            y: 0
	        };
	        $sprite.drag.draggingFlag = false;
	        var oMousedown = $sprite.events.mousedown || $sprite.events.touchstart;
	        $sprite.events.touchstart = $sprite.events.mousedown = function (e) {
	            // if dragable is a object, it means the range of dragable area
	            if ($sprite.drag.dragable) {
	                setFlag($sprite, true);
	                var relativeX = e.canvasX - this.$cache.tx;
	                var relativeY = e.canvasY - this.$cache.ty;

	                startDragPosition.x = e.canvasX;
	                startDragPosition.y = e.canvasY;
	            }

	            return dragHandler(oMousedown, $sprite, e, $sprite.drag.dragable);
	        }.bind($sprite);
	        var oMousehold = $sprite.events.hold || $sprite.events.mousemove; //TODO 不规范？
	        $sprite.events.touchmove = $sprite.events.mousemove = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
	            if (worked) {
	                this.style.tx += e.canvasX - startDragPosition.x;
	                this.style.ty += e.canvasY - startDragPosition.y;
	                // if (utils.funcOrValue(this.style.locate, this) === 'center') {
	                //     this.style.tx += (this.style.tw || this.content.img.width || 0) / 2;
	                //     this.style.ty += (this.style.th || this.content.img.height || 0) / 2;
	                // }

	                startDragPosition.x = e.canvasX;
	                startDragPosition.y = e.canvasY;
	            }
	            return dragHandler(oMousehold, $sprite, e, worked);
	        }.bind($sprite);
	        var oMouseup = $sprite.events.mouseup || $sprite.events.touchend;
	        $sprite.events.touchend = $sprite.events.mouseup = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
	            if ($sprite.drag.draggingFlag && $sprite.drag.dragable) {
	                setFlag($sprite, false);
	            }
	            return dragHandler(oMouseup, $sprite, e, worked);
	        };
	        var oMouseout = $sprite.events.mouseout;
	        $sprite.events.mouseout = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
	            setFlag($sprite, false);
	            return dragHandler(oMouseout, $sprite, e, worked);
	        };
	        var oClick = $sprite.events.click;
	        $sprite.events.click = function (e) {
	            var worked = $sprite.drag.dragable;
	            if (worked) {
	                var relativeX = e.canvasX - $sprite.$cache.tx;
	                var relativeY = e.canvasY - $sprite.$cache.ty;
	                return oClick ? oClick.call($sprite, e) : true;
	            }
	            return dragHandler(oClick, $sprite, e, worked);
	        };
	    }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	};

	module.exports = rAF;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _on = __webpack_require__(10);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(9);

	var _off2 = _interopRequireDefault(_off);

	var _trigger = __webpack_require__(11);

	var _trigger2 = _interopRequireDefault(_trigger);

	var _broadcast = __webpack_require__(8);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	var _bindDrag = __webpack_require__(4);

	var _bindDrag2 = _interopRequireDefault(_bindDrag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var preAdd = function preAdd(item) {
	    var $canvas = item.$canvas;

	    if (!item.$id) {
	        item.$id = Math.random().toString(36).substr(2);
	    }

	    item.content = item.content || {};

	    item.style = item.style || {};

	    item.style.zIndex = item.style.zIndex || 0;
	    item.style.mirrX = item.style.mirrX || 0;

	    item.style.opacity = item.style.opacity === undefined ? 1 : item.style.opacity;
	    item.style.locate = item.style.locate || 'center';
	    // item.style.rotate = item.style.rotate || 0;
	    item.style.scale = item.style.scale || 1;
	    // item.style.display = item.style.display;

	    var _img = _utils2.default.funcOrValue(item.content.img);
	    if (_img === undefined) {
	        _img = {
	            width: 0,
	            height: 0
	        };
	    }

	    _constants2.default.xywh.forEach(function (key) {
	        item.style[key] = item.style[key] || 0;
	    });

	    item.inherit = item.inherit || ['tx', 'ty', 'scale'];
	    item.drag = item.drag || {};

	    item.events = item.events || {};
	    item.events.eIndex = item.events.eIndex || 0;
	    item.events.through = !!item.events.through;

	    item.scroll = item.scroll || {};
	    item.scroll.scrollX = item.scroll.scrollX || 0;
	    item.scroll.scrollY = item.scroll.scrollY || 0;

	    item.hooks = item.hooks || {};

	    item.name = item.name;
	    if (!item.name && item.content.img && item.content.img.src) {
	        var fileName = item.content.img.src.match(/.*\/([^\/]*)$/);
	        if (fileName && fileName[1]) {
	            item.name = fileName[1];
	        }
	    }
	    item.name = item.name || 'Unnamed Easycanvas Object';

	    item.children = item.children || [];
	    item.children.forEach(function (c) {
	        c.$canvas = item.$canvas;
	        c.$parent = item;

	        c = new sprite(c);
	    });

	    item.$cache = {};
	    item.$scroll = {
	        speedX: 0,
	        speedY: 0
	    };

	    return item;
	}; /** ********** *
	    *
	    * Sprite Structure
	    * {
	    *     style: {
	    *         tx, ty, tw, th,
	    *         zIndex, opacity, scale, rotate, rx, ry,
	    *         sx, sy, sw, sh, locate, // useless for content.text
	    *         fh, fv, fx, fy, // transfrom
	    *         align, font, color, // useless for content.img
	    *         visible, // visible false equals inexistence
	    *         mirrX, mirrY, // visible false equals inexistence
	    *     },
	    *     content: {
	    *         img, // rich type eg: sequenceDiagram(img, {config})
	    *         text,
	    *     },
	    *     events: {
	    *         eIndex,
	    *         click / touchstart / contextmenu / ... / hold / touchout,
	    *         through,
	    *     },
	    *     children: [
	    *         { Sprite }, { Sprite } ...
	    *     ],
	    *     inherit: ['tx', 'ty', ...] // inherit from parent, default is ['tx', 'ty', 'scale']
	    *     hooks: {
	    *         created, mounted, painted, ticked
	    *     },
	    *
	    *     $parent: { Sprite },
	    *     $cache: {
	    *         tx, ty, tw, th, ...
	    *     },
	    *
	    * }
	    *
	    * ********** **/

	var sprite = function sprite(opt) {
	    var _opt = preAdd(opt);

	    for (var i in _opt) {
	        if (Object.prototype.hasOwnProperty.call(_opt, i)) {
	            this[i] = _opt[i];
	        }
	    }

	    return this;
	};

	sprite.prototype.add = function (child) {
	    this.children = this.children || [];

	    child.$canvas = this.$canvas;
	    child.$parent = this;

	    if (!child.$id) {
	        child = new sprite(child);
	    }

	    _bindDrag2.default.bind(child);

	    child.children.forEach(function (c, i) {
	        child.children[i] = new sprite(c);
	        child.children[i].$canvas = child.$canvas;
	        child.children[i].$parent = child;
	    });

	    this.children.push(child);

	    return child;
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

	sprite.prototype.on = _on2.default;
	sprite.prototype.off = _off2.default;
	sprite.prototype.trigger = _trigger2.default;
	sprite.prototype.broadcast = _broadcast2.default;

	module.exports = sprite;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _tick2 = __webpack_require__(5);

	var _tick3 = _interopRequireDefault(_tick2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Handle wheel events on canvas
	 * - Wheel events pass in from eventHandler.js.
	 * - Includes touch scroll and mouse wheel scroll.
	 *
	 * ********** **/

	var startPos = {};
	var scrolling = false;

	var tickPool = [];

	var scrollFuncs = {
	    stop: function stop() {
	        scrolling = false;
	    },

	    tick: function tick() {
	        (0, _tick3.default)(scrollFuncs.looper);
	    },

	    looper: function looper() {
	        tickPool.forEach(function ($sprite, index) {
	            var speedX = $sprite.$scroll.speedX;
	            var speedY = $sprite.$scroll.speedY;

	            if (Math.abs($sprite.$scroll.speedX) > 1) {
	                $sprite.$scroll.speedX *= $sprite.scroll.smooth || 0.8;
	            } else {
	                $sprite.$scroll.speedX = 0;
	            }
	            if (Math.abs($sprite.$scroll.speedY) > 1) {
	                $sprite.$scroll.speedY *= $sprite.scroll.smooth || 0.8;
	            } else {
	                $sprite.$scroll.speedY = 0;
	            }

	            if (Math.abs($sprite.$scroll.speedX) <= 1 && Math.abs($sprite.$scroll.speedY) <= 1) {
	                tickPool.splice(index, 1);
	                return;
	            }

	            $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
	            $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

	            var minScrollX = _utils2.default.funcOrValue($sprite.scroll.minScrollX, $sprite);
	            var maxScrollX = _utils2.default.funcOrValue($sprite.scroll.maxScrollX, $sprite);
	            var minScrollY = _utils2.default.funcOrValue($sprite.scroll.minScrollY, $sprite);
	            var maxScrollY = _utils2.default.funcOrValue($sprite.scroll.maxScrollY, $sprite);

	            if (!isNaN(minScrollY) && $sprite.scroll.scrollY < minScrollY) {
	                $sprite.scroll.scrollY = minScrollY;
	            } else if (!isNaN(maxScrollY) && $sprite.scroll.scrollY > maxScrollY) {
	                $sprite.scroll.scrollY = maxScrollY;
	            }

	            if (!isNaN(minScrollX) && $sprite.scroll.scrollX < minScrollX) {
	                $sprite.scroll.scrollX = minScrollX;
	            } else if (!isNaN(maxScrollX) && $sprite.scroll.scrollX > maxScrollX) {
	                $sprite.scroll.scrollX = maxScrollX;
	            }
	        });

	        scrollFuncs.tick();
	    },

	    touch: function touch($sprite, e) {
	        if (!$sprite.scroll.scrollable) return false;

	        if (!scrolling) {
	            // start scroll
	            scrolling = +new Date();
	            startPos.x = e.canvasX;
	            startPos.y = e.canvasY;
	        } else {
	            if (tickPool.indexOf($sprite) === -1) {
	                tickPool.push($sprite);
	            }

	            var absX = Math.abs(e.canvasX - startPos.x);
	            var absY = Math.abs(e.canvasY - startPos.y);
	            var deltaTime = +new Date() - scrolling;
	            scrolling = +new Date();
	            deltaTime /= 10;
	            if (absX / deltaTime > 1 && deltaTime > 1) {
	                $sprite.$scroll.speedX += (e.canvasX - startPos.x) / deltaTime;
	            }
	            if (absY / deltaTime > 1 && deltaTime > 1) {
	                $sprite.$scroll.speedY += (e.canvasY - startPos.y) / deltaTime;
	            }

	            startPos.x = e.canvasX;
	            startPos.y = e.canvasY;

	            return true;
	        }
	    },

	    wheel: function wheel($sprite, e) {
	        if (tickPool.indexOf($sprite) === -1) {
	            tickPool.push($sprite);
	        }

	        $sprite.$scroll.speedX = e.wheelDeltaX;
	        $sprite.$scroll.speedY = e.wheelDeltaY;
	    }
	};

	module.exports = scrollFuncs;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
		var arg = Array.prototype.slice.call(arguments);
		var name = arg.shift();

		if (this.hooks[name]) {
			this.hooks[name].apply(this, arg);
		}

		arg.unshift(name);

		this.children && this.children.forEach(function (child) {
			child.broadcast.apply(child, arg);
		});

		this.paintList && this.paintList.forEach(function (child) {
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (event, func) {
	    if (!this.hooks[event]) return;

	    if (this.hooks[event] === func || !func) {
	        delete this.hooks[event];
	    } else if (Array.prototype.isPrototypeOf(this.hooks[event])) {
	        this.hooks[event][this.hooks[event].indexOf(func)] = undefined;
	    }
	}; /** ********** *
	    *
	    * Remove current hook
	    *
	    * ********** **/

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (event, func) {
		if (!this.hooks[event]) {
			this.hooks[event] = func;
		} else if (Array.prototype.isPrototypeOf(this.hooks[event])) {
			this.hooks[event].push(func);
		} else {
			this.hooks[event] = [this.hooks[event], func];
		}
	}; /** ********** *
	    *
	    * Add current hook
	    *
	    * ********** **/

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	  var arg = Array.prototype.slice.call(arguments);
	  var name = arg.shift();

	  if (this.hooks[name]) {
	    this.hooks[name].apply(this, arg);
	  }
	}; /** ********** *
	    *
	    * Trigger event on current sprite without its children
	    * - Current sprite first, children following.
	    * - Can pass arguments.
	    *
	    * ********** **/

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** ********** *
	 *
	 * Load images
	 *
	 * ********** **/

	var Cache = {};
	var BlockingImgs = [];
	var ProcessingFlag = 'processing';

	var blockingAmount = 0;

	var loader = function loader(url, callback, option) {
	    var _option = option || {};

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
	    var cacheNamespace = url;

	    if (_option.alphaColor) cacheNamespace += alphaColor;

	    if (Cache[cacheNamespace] && Cache[cacheNamespace] !== ProcessingFlag) {
	        setTimeout(function () {
	            if (callback) {
	                callback(Cache[cacheNamespace]);
	            }
	        });
	        return Cache[cacheNamespace];
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

	    Cache[cacheNamespace] = ProcessingFlag;

	    // Use canvas (no different in performance on my test)
	    // if (_option.cache || true) {
	    //     let tempCavas = document.createElement('canvas');
	    //     let cts = tempCavas.getContext('2d');
	    //     i.onload = function () {
	    //         tempCavas.width = i.width;
	    //         tempCavas.height = i.height;
	    //         cts.drawImage(i, 0, 0);
	    //     };
	    //     return tempCavas;
	    // }

	    i.onload = function () {
	        if (_option.block) {
	            blockingAmount--;
	            if (blockingAmount === 0) {
	                BlockingImgs.forEach(function (blockingImg) {
	                    blockingImg.imgObj.src = blockingImg.src;
	                });
	                BlockingImgs.splice(0);
	            }
	        }

	        if (_option.cache) {
	            var tempCavas = document.createElement('canvas');
	            var cts = tempCavas.getContext('2d');
	            tempCavas.width = i.width;
	            tempCavas.height = i.height;
	            cts.drawImage(i, 0, 0);

	            if (_option.alphaColor) {
	                var data = cts.getImageData(0, 0, i.width, i.height);
	                var pixel = [];

	                for (var d = 0; d < data.data.length; d += 4) {
	                    var colorWeight = data.data[d] + data.data[d + 1] + data.data[d + 2];
	                    var blackLike = 1;
	                    if (data.data[d] < blackLike && data.data[d + 1] < blackLike && data.data[d + 2] < blackLike) {
	                        data.data[d + 3] = parseInt(colorWeight / 255);
	                    }
	                }
	                cts.putImageData(data, 0, 0);
	            }

	            i = tempCavas;
	        }
	        Cache[cacheNamespace] = i;

	        if (callback) {
	            callback(i);
	        }
	    };

	    i.onerror = function () {
	        Cache[cacheNamespace] = i;
	    };

	    return i;
	};

	module.exports = loader;

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (process.env.NODE_ENV !== 'production') {
		var PLUGIN_BRIDGE = {
			getSprite: function getSprite($canvasId) {
				if (!window[_constants2.default.devFlag].isPaintRecording) return [];

				var res = {};

				if ($canvasId) {
					var paintList = window[_constants2.default.devFlag].$canvas[$canvasId].$canvas.paintList;
					var $paintList = window[_constants2.default.devFlag].$canvas[$canvasId].$canvas.$paintList;

					var pusher = function pusher(item) {
						// Skip $mask in select mode
						if (item.name === _constants2.default.devFlag) return;

						res[item.$id] = {
							name: item.name,
							parent: item.$parent && item.$parent.$id,
							style: {},
							children: item.children && item.children.map(function (child) {
								return child.$id;
							})
						};

						if (item.content.img || item.content.text) {
							res[item.$id].rendered = false;
							for (var i = 0, l = $paintList.length; i < l; i++) {
								if ($paintList[i].$id === item.$id) {
									res[item.$id].rendered = true;
									break;
								}
							}
						} else {
							// res[item.$id].rendered = undefined;
						}

						for (var _i in item.style) {
							if (typeof item.style[_i] === 'function') {
								res[item.$id].style[_i] = item.$cache[_i];

								if (typeof item.$cache[_i] === 'function') {
									res[item.$id].style[_i] = 'function';
								}
							} else {
								res[item.$id].style[_i] = item.style[_i];
							}
						}

						if (item.physics) {
							res[item.$id].physics = item.physics;
						}

						if (item.children) {
							item.children.forEach(pusher);
						}
					};

					paintList.forEach(pusher);
				} else {
					for (var c in window[_constants2.default.devFlag].$canvas) {
						res = _extends(res, window[_constants2.default.devFlag].$plugin.getSprite(c));
					}
				}

				return res;
			},

			selectSpriteById: function selectSpriteById($spriteId, $canvasId) {
				if (!$canvasId) {
					for (var i in window[_constants2.default.devFlag].$canvas) {
						var _res = PLUGIN_BRIDGE.selectSpriteById($spriteId, i);
						if (_res) return {
							$sprite: _res.$sprite || _res,
							$canvas: window[_constants2.default.devFlag].$canvas[i].$canvas
						};
					}

					return false;
				}

				var paintList = window[_constants2.default.devFlag].$canvas[$canvasId].$canvas.paintList;

				var looper = function looper(array) {
					for (var _i2 = 0; _i2 < array.length; _i2++) {
						if (array[_i2].$id === $spriteId) return array[_i2];

						var _res2 = looper(array[_i2].children);
						if (_res2) {
							return {
								$sprite: _res2.$sprite || _res2,
								$canvas: window[_constants2.default.devFlag].$canvas[$canvasId].$canvas
							};
						}
					}

					return false;
				};

				var res = looper(paintList);
				if (res) return {
					$sprite: res.$sprite || res,
					$canvas: window[_constants2.default.devFlag].$canvas[$canvasId].$canvas
				};
			},

			updateSprite: function updateSprite($spriteId, map, $canvasId) {
				var $sprite = PLUGIN_BRIDGE.selectSpriteById($spriteId, $canvasId).$sprite;
				if (!$sprite) console.warn('Sprite ' + spriteId + ' Not Found.');

				_extends($sprite.style, map);
			},

			highlightSprite: function highlightSprite($spriteId, opt, $canvasId) {
				window[_constants2.default.devFlag].selectMode = Boolean(opt);

				var tmp = PLUGIN_BRIDGE.selectSpriteById($spriteId, $canvasId);
				var $sprite = tmp.$sprite;
				var $canvas = tmp.$canvas;

				if (opt && $canvas && $sprite) {
					$canvas.$plugin.hook.selectSprite(false, $canvas, $sprite);
				} else if ($canvas) {
					$canvas.$plugin.hook.cancelSelectSprite($canvas);
				}
			},

			sendGlobalHook: function sendGlobalHook($spriteId, $canvasId) {
				var tmp = PLUGIN_BRIDGE.selectSpriteById($spriteId, $canvasId);
				var $sprite = tmp.$sprite;
				var $canvas = tmp.$canvas;

				if (window.$ec === $canvas.$id && window.$es === $sprite.$id) return;

				console.warn('window.$ec = [Easycanvas ' + $canvas.$id + '], window.$es = [Easycanvas ' + $sprite.$id + ']');
				window.$ec = $canvas;
				window.$es = $sprite;
			},

			pause: function pause($canvasId, opt) {
				var $canvas = window[_constants2.default.devFlag].$canvas[$canvasId].$canvas;
				$canvas.$pausing = typeof opt !== 'undefined' ? opt : !$canvas.$pausing;
			}
		};

		window[_constants2.default.devFlag] = window[_constants2.default.devFlag] || {
			isPaintRecording: false,
			selectMode: false,

			peformance: {
				area: 0,
				times: 0
			},

			$plugin: PLUGIN_BRIDGE,

			$canvas: {},
			current: {}
		};
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _sprite = __webpack_require__(6);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		sprite: _sprite2.default
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(37);

	var _index2 = _interopRequireDefault(_index);

	var _tick = __webpack_require__(5);

	var _tick2 = _interopRequireDefault(_tick);

	var _mirror = __webpack_require__(13);

	var _mirror2 = _interopRequireDefault(_mirror);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _transition = __webpack_require__(41);

	var _transition2 = _interopRequireDefault(_transition);

	var _imgLoader = __webpack_require__(12);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	var _positionCompare = __webpack_require__(3);

	var _positionCompare2 = _interopRequireDefault(_positionCompare);

	var _sequenceDiagram = __webpack_require__(40);

	var _sequenceDiagram2 = _interopRequireDefault(_sequenceDiagram);

	var _multlineText = __webpack_require__(39);

	var _multlineText2 = _interopRequireDefault(_multlineText);

	var _main = __webpack_require__(15);

	var _main2 = _interopRequireDefault(_main);

	var _chromeDevtool = __webpack_require__(14);

	var _chromeDevtool2 = _interopRequireDefault(_chromeDevtool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Easycanvas = {
	    painter: _index2.default,
	    imgLoader: _imgLoader2.default,
	    sequenceDiagram: _sequenceDiagram2.default,
	    multlineText: _multlineText2.default,
	    posCompare: _positionCompare2.default,
	    transition: _transition2.default,
	    tick: _tick2.default,
	    utils: _utils2.default,
	    mirror: _mirror2.default,
	    class: _main2.default,
	    $version: '0.2.0'
	};

	window.Easycanvas = Easycanvas;
	module.exports = Easycanvas;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _perPaint = __webpack_require__(21);

	var _perPaint2 = _interopRequireDefault(_perPaint);

	var _paint = __webpack_require__(19);

	var _paint2 = _interopRequireDefault(_paint);

	var _write = __webpack_require__(23);

	var _write2 = _interopRequireDefault(_write);

	var _eventHandler = __webpack_require__(18);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _bindDrag = __webpack_require__(4);

	var _bindDrag2 = _interopRequireDefault(_bindDrag);

	var _rAFer = __webpack_require__(22);

	var _rAFer2 = _interopRequireDefault(_rAFer);

	var _apiPlugin = __webpack_require__(36);

	var _apiPlugin2 = _interopRequireDefault(_apiPlugin);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Inner apis of an easycanvas instance
	 * - Used for Easycanvas.js only normally.
	 * - Will be added to Easycanvas instance's prototype.
	 *
	 * ********** **/

	var apiInner = {
	    $paint: _paint2.default,
	    $eventHandler: _eventHandler2.default,
	    $write: _write2.default,
	    $perPaint: _perPaint2.default,
	    $bindDrag: _bindDrag2.default,
	    $rAFer: _rAFer2.default
	};

	if (process.env.NODE_ENV !== 'production') {
	    apiInner.$plugin = (0, _apiPlugin2.default)();
	}

	module.exports = apiInner;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _positionCompare = __webpack_require__(3);

	var _positionCompare2 = _interopRequireDefault(_positionCompare);

	var _eventHandlerScroll = __webpack_require__(7);

	var _eventHandlerScroll2 = _interopRequireDefault(_eventHandlerScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Sort sprite
	 * - Order by eIndex dev-tool's in events' triggering
	 * - Order by zIndex in dev-tool's select mode
	 */
	/** ********** *
	 *
	 * Handle events on canvas (Includes both user's events and debugging events)
	 * - Compare event's coordinate and the coordinate of every sprite in
	 *   Easycanvas.paintList, and check sprite's handlers one by one.
	 * - Events: mousedown, mousemove, mouseup, touchstart, touchmove, touchend,
	 *   click, contextmenu
	 * - Expanded events: hold, touchout
	 *
	 * ********** **/

	var sortByIndex = function sortByIndex(arr) {
	    return arr.sort(function (a, b) {
	        if (process.env.NODE_ENV !== 'production') {
	            if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                return _utils2.default.funcOrValue(a.style.zIndex, a) < _utils2.default.funcOrValue(b.style.zIndex, b) ? 1 : -1;
	            }
	        }

	        return _utils2.default.funcOrValue(a.events.eIndex, a) < _utils2.default.funcOrValue(b.events.eIndex, b) ? 1 : -1;
	    });
	};

	/**
	 * Check whether the event hits certain sprite
	 * - Use $sprite.$cache to compare 
	 * - Sprite in first frame will not captrue any event [?]
	 */
	var hitSprite = function hitSprite($sprite, e) {
	    if (_utils2.default.funcOrValue($sprite.style.visible, $sprite) === false) {
	        return false;
	    }

	    if (!$sprite.$cache) {
	        return;
	    }

	    var _tx = $sprite.$cache.tx;
	    var _ty = $sprite.$cache.ty;
	    var _tw = $sprite.$cache.tw;
	    var _th = $sprite.$cache.th;

	    // 第一帧没有$cache
	    if (typeof _tx === 'undefined') return false;

	    // 兼容 !!TODO!!
	    return _positionCompare2.default.pointInRect(e.canvasX, e.canvasY, _tx, _tx + _tw, _ty, _ty + _th);
	};

	/**
	 * Sort all the sprites(including children), then put to @caughts
	 * - Child is above the parent only if Index >= 0
	 */
	var looper = function looper(arr, e, caughts) {
	    if (!arr || !arr.length) return;

	    for (var i = 0; i < arr.length; i++) {
	        var item = arr[i];
	        if (item.children.length) {
	            // Children above
	            looper(sortByIndex(item.children.filter(function (a) {
	                if (process.env.NODE_ENV !== 'production') {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) >= 0;
	                    }
	                }

	                return _utils2.default.funcOrValue(a.events.eIndex, a) >= 0;
	            })), e, caughts);
	        }
	        if (hitSprite(item, e)) {
	            caughts.push(item);
	        }
	        if (item.children.length) {
	            // Children below
	            looper(sortByIndex(item.children.filter(function (a) {
	                if (process.env.NODE_ENV !== 'production') {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) < 0;
	                    }
	                }

	                return _utils2.default.funcOrValue(a.events.eIndex, a) < 0;
	            })), e, caughts);
	        }
	    }
	};

	module.exports = function (e) {
	    if (!e.layerX && e.touches && e.touches[0]) {
	        e.layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
	        e.layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
	    }
	    if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
	        e.layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
	        e.layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
	    }

	    var scaleX = parseInt(this.$dom.style.width) / this.contextWidth;
	    var scaleY = parseInt(this.$dom.style.height) / this.contextHeight;

	    scaleX = scaleX || 1;
	    scaleY = scaleY || 1;

	    var $e = {
	        type: e.type,
	        canvasX: e.layerX / scaleX,
	        canvasY: e.layerY / scaleY,
	        event: e
	    };

	    var $canvas = this;

	    var caughts = [];
	    looper(sortByIndex($canvas.paintList), $e, caughts);

	    if (process.env.NODE_ENV !== 'production') {
	        // 开发者工具select模式下为选取元素
	        if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode && caughts.length) {
	            var chooseSprite = caughts[0];
	            if (chooseSprite.name === _constants2.default.devFlag) {
	                // 选中mask不算
	                chooseSprite = caughts[1];
	            }

	            if (chooseSprite && $canvas.$plugin.hook.selectSprite(e.type === 'click', $canvas, chooseSprite)) {
	                return;
	            }
	        }
	    }

	    // Create a new event: 'hold' (suits both mobile and pc)
	    if (!$canvas.eHoldingFlag && (e.type === 'mousedown' || e.type === 'touchstart')) {
	        $canvas.eHoldingFlag = e;
	    } else if ($canvas.eHoldingFlag && (e.type === 'mouseup' || e.type === 'touchend')) {
	        $canvas.eHoldingFlag = false;
	        _eventHandlerScroll2.default.stop();
	    } else if ($canvas.eHoldingFlag && (e.type === 'mousemove' || e.type === 'touchmove')) {
	        $canvas.eHoldingFlag = e;
	    } // else if (!$canvas.eHoldingFlag && e.type === 'contextmenu') {

	    for (var i = 0; i < caughts.length; i++) {
	        // trigger 'mouseout' or 'touchout' event 
	        if ((e.type === 'mousemove' || e.type === 'touchmove') && $canvas.eLastMouseHover && $canvas.eLastMouseHover !== caughts[i] && caughts.indexOf($canvas.eLastMouseHover) === -1) {
	            var eMouseout = $canvas.eLastMouseHover['events']['mouseout'] || $canvas.eLastMouseHover['events']['touchout'];
	            if (eMouseout) {
	                eMouseout.call($canvas.eLastMouseHover, $e);
	            }
	        }

	        if ($e.type === 'mousewheel') {
	            _eventHandlerScroll2.default.wheel(caughts[i], e);
	        } else if ($canvas.eHoldingFlag && e.type === 'touchmove') {
	            if (_eventHandlerScroll2.default.touch(caughts[i], $e)) {
	                return;
	            }
	        }

	        if (!caughts[i]['events']) continue;

	        var _handler = caughts[i]['events'][e.type];
	        if (_handler) {
	            $canvas.eLastMouseHover = caughts[i];
	            var result = _handler.call(caughts[i], $e);
	            // stop then chain and cancel 'hold' event's flag
	            if (result === true) {
	                $canvas.eHoldingFlag = false;
	                return result;
	            } else if (result === 'drag') {
	                $canvas.eHoldingFlag = false;
	                return result;
	            }
	        }

	        if (caughts[i].through === false) {
	            return;
	        }
	    }

	    if (!caughts.length && $canvas.eLastMouseHover) {
	        // hover更替，触发mouseout
	        var _eMouseout = $canvas.eLastMouseHover['events']['mouseout'];
	        if (_eMouseout) {
	            _eMouseout.call($canvas.eLastMouseHover, $e);
	        }
	        $canvas.eLastMouseHover = null;
	    }

	    var handler = $canvas.events[e.type];
	    if (handler) {
	        if (handler($e)) {
	            $canvas.eHoldingFlag = false;
	            return true;
	        }
	    }
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _positionCompare = __webpack_require__(3);

	var _positionCompare2 = _interopRequireDefault(_positionCompare);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * CORE painting function
	 * - Controlling canvas context, Transfer $paintList to rendered sprite.
	 * - Includes some optimization.
	 *
	 * ********** **/

	var f = function f($sprite, i) {
	    var $canvas = this;

	    var isUseless = false;

	    var props = $sprite.props;
	    var settings = $sprite.settings;

	    if ($sprite.type === 'img') {
	        // 小图性能优化收益未必正向，200尺寸是否恰当待评估
	        if ($canvas.$paintList.length < 200 || props[7] * props[8] > 200 * 200) {
	            for (var j = i + 1, l = $canvas.$paintList.length; j < l; j++) {
	                var $tmpSprite = $canvas.$paintList[j];

	                if ($tmpSprite.type !== 'img') continue;

	                if ($tmpSprite.imgType !== '*') {
	                    // PNG元素不能作为是否跳过绘制的优化参考对象
	                    continue;
	                }

	                if ($tmpSprite.settings.globalAlpha !== 1) {
	                    // 带alpha的元素不能作为是否跳过绘制的优化参考对象
	                    continue;
	                }

	                if ($tmpSprite.settings.rotate) {
	                    // 带rotate的元素暂时不考虑，需要复杂的计算
	                    continue;
	                }

	                var tmpProps = $tmpSprite.props;

	                if (_positionCompare2.default.pointInRect(props[5], props[6], tmpProps[5], tmpProps[5] + tmpProps[7], tmpProps[6], tmpProps[6] + tmpProps[8]) && _positionCompare2.default.pointInRect(props[5] + props[7], props[6] + props[8], tmpProps[5], tmpProps[5] + tmpProps[7], tmpProps[6], tmpProps[6] + tmpProps[8])) {
	                    isUseless = true;
	                    return;
	                }
	            }
	        }
	        // } else if ($sprite.type === 'text') {
	        // 文本绘制消耗性能较少，毋需优化
	    }

	    // DOM渲染 - 由于Hilo.js有专利，此处只调研实现，不开放
	    // {
	    //     let newSprite = false;
	    //     if (!document.getElementById($sprite.$id)) {
	    //         newSprite = true;
	    //         let $dom = document.createElement('div');
	    //         $dom.style.position = 'fixed';
	    //         $dom.id = $sprite.$id;
	    //         $dom.className = 'XXXXX';
	    //         $dom.style['-webkit-transform'] = 'translateZ(0)';
	    //         $dom.style['transform'] = 'translateZ(0)';
	    //     } else {
	    //         let $dom = document.getElementById($sprite.$id);
	    //         $dom.toDelete = 0;
	    //     }
	    //     $dom.style.left = props[5] / $canvas.contextWidth * 100 + '%';
	    //     $dom.style.top = props[6] / $canvas.contextHeight * 100 + '%';
	    //     $dom.style.width = props[7] / $canvas.contextWidth * 100 + '%';
	    //     $dom.style.height = props[8] / $canvas.contextHeight * 100 + '%';
	    //     $dom.style['background-repeat'] = 'no-repeat';
	    //     $dom.style['background-image'] = 'url(' + props[0].src + ')';
	    //     $dom.style['background-position'] = (props[1] / props[0].$width * 100 + '%') + ' ' + (props[2] / $sprite.props[0].$height * 100 + '%')
	    //     $dom.style['background-position'] = -(props[1] / props[0].$width * ($sprite.props[0].$width / props[3] * props[7]) + 'px') + ' ' +
	    //         (-(props[2] / props[0].$height * ($sprite.props[0].$height / props[4] * props[8]) + 'px'));
	    //     $dom.style['background-size'] = ($sprite.props[0].$width / props[3] * props[7] + 'px') + ' ' + ($sprite.props[0].$height / props[4] * props[8] + 'px');
	    //     if (newSprite) {
	    //         document.body.appendChild($dom);
	    //     }
	    //     return;
	    // }

	    var saved = false;

	    if (settings.globalAlpha !== 1 && !isNaN(settings.globalAlpha)) {
	        if (!saved) {
	            $canvas.$paintContext.save();
	            saved = true;
	        }
	        $canvas.$paintContext.globalAlpha = settings.globalAlpha;
	    }

	    if (settings.translate) {
	        if (!saved) {
	            $canvas.$paintContext.save();
	            saved = true;
	        }
	        $canvas.$paintContext.translate(settings.translate[0] || 0, settings.translate[1] || 0);
	    }
	    if (settings.rotate) {
	        if (!saved) {
	            $canvas.$paintContext.save();
	            saved = true;
	        }
	        $canvas.$paintContext.translate(settings.translateBeforeRotate[0] || 0, settings.translateBeforeRotate[1] || 0);
	        $canvas.$paintContext.rotate(settings.rotate || 0);
	        $canvas.$paintContext.translate(settings.translateAfterRotate[0] || 0, settings.translateAfterRotate[1] || 0);
	    }
	    if (settings.scale) {
	        if (!saved) {
	            $canvas.$paintContext.save();
	            saved = true;
	        }
	        $canvas.$paintContext.scale(settings.scale[0] || 1, settings.scale[1] || 1);
	    }
	    if (settings.transform) {
	        if (!saved) {
	            $canvas.$paintContext.save();
	            saved = true;
	        }
	        $canvas.$paintContext.transform(1, settings.transform.fh, settings.transform.fv, 1, settings.transform.fx, settings.transform.fy);
	    }

	    if ($sprite.type === 'img') {
	        // area += props[7] * props[8];
	        // times++;
	        // props[0].src='test';
	        // console.log(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8]);
	        $canvas.$paintContext.drawImage(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8]);
	        if (process.env.NODE_ENV !== 'production') {
	            $canvas.$plugin.hook.drawImage($canvas, {
	                img: props[0],
	                tx: props[1],
	                ty: props[2],
	                tw: props[3],
	                th: props[4]
	            });
	        }
	    } else if ($sprite.type === 'text' && props.content) {
	        $canvas.$write.call($canvas, props);
	    }

	    if (saved) {
	        $canvas.$paintContext.restore();
	    }
	};

	module.exports = function () {
	    var $canvas = this;

	    $canvas.$paintList.forEach(f.bind($canvas));
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Get computed style of a sprite
	 * - Returns a COPY of current props.
	 * - Used in perPaint.js ONLY.
	 * - May waste some performance, but not much.
	 * - TODO: performace improving.
	 *
	 * ********** **/

	module.exports = function ($sprite, $canvas) {
	    var res = {};

	    for (var i in $sprite.content) {
	        res[i] = _utils2.default.funcOrValue($sprite.content[i], $sprite);
	    }

	    for (var _i in $sprite.style) {
	        res[_i] = _utils2.default.funcOrValue($sprite.style[_i], $sprite);
	    }

	    res.img = $sprite.content.img;

	    if (res.img && res.img.type === 'sequence-diagram') {
	        var config = res.img.config;
	        var index = res.img.index;

	        var pw = void 0,
	            ph = void 0;
	        if (config.w < 0) {
	            pw = res.img.img.width / (0 - config.w);
	        } else if (config.w > 0) {
	            pw = config.w;
	        } else {
	            pw = res.img.img.width;
	        }
	        if (config.h < 0) {
	            ph = res.img.img.height / (0 - config.h);
	        } else if (config.h > 0) {
	            ph = config.h;
	        } else {
	            ph = res.img.img.height;
	        }

	        var wTimes = parseInt(res.img.img.width / pw);
	        var hTimes = parseInt(res.img.img.height / ph);

	        if (config.h) {
	            res.sx = index % wTimes * pw;
	            res.sy = parseInt(index / wTimes) % hTimes * ph;
	        }

	        if (!config.loop && index > 0 && res.sx === 0 && res.sy === 0) {
	            res.img.img = {};
	            // $canvas.remove($sprite);
	        }

	        res.img.lastTickTime = res.img.lastTickTime || 0;
	        if ($canvas.$nextTickTime - res.img.lastTickTime >= _utils2.default.funcOrValue(config.interval, $sprite)) {
	            config.lastTickTime = $canvas.$nextTickTime;
	            res.img.index++;
	            res.img.lastTickTime = $canvas.$nextTickTime;
	        }

	        res.sw = pw || res.sw;
	        res.sh = ph || res.sh;
	        res.tw = res.tw || pw;
	        res.th = res.th || ph;

	        res.img = res.img.img;
	    }

	    $sprite.$tmp = res;

	    // debugger;
	    return res;
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _img2base = __webpack_require__(38);

	var _img2base2 = _interopRequireDefault(_img2base);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _perPaintGetComputedStyle = __webpack_require__(20);

	var _perPaintGetComputedStyle2 = _interopRequireDefault(_perPaintGetComputedStyle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * CORE painting function
	 * - Calculates props of every sprite in paintList, then puts to $paintList.
	 * - Includes inheriting, optimization.
	 * - NOT connecting to canvas's prototype functions.
	 *
	 * ********** **/

	module.exports = function (i, index) {
	    if (_utils2.default.funcOrValue(i.style.visible, i) === false) {
	        _utils2.default.execFuncs(i.hooks.ticked, i);
	        return;
	    }

	    var $canvas = this;

	    var settings = {};

	    var _props = (0, _perPaintGetComputedStyle2.default)(i, $canvas);
	    var _text = _props.text;
	    var _img = _props.img;

	    var inherits = i.inherit || [];
	    if (i.$parent) {
	        i.inherit.forEach(function (key) {
	            if (_constants2.default.xywh.indexOf(key) >= 0 || ['rotate'].indexOf(key) >= 0) {
	                _props[key] = _props[key] || 0;
	                // inherit from parent's style
	                _props[key] += _utils2.default.funcOrValue(i.$parent.style[key] || 0, i.$parent) || 0;
	            } else if (['opacity', 'scale'].indexOf(key) >= 0) {
	                _props[key] = _utils2.default.firstValuable(_props[key], 1);
	                if (!isNaN(i.$parent.$cache[key])) {
	                    _props[key] *= i.$parent.$cache[key];
	                }
	                // } else if (key === 'scroll') {
	                //     _props.ty -= $canvas.scroll.scrollY;
	            }
	        });

	        _props.ty -= i.$parent.scroll.scrollY;
	        _props.tx -= i.$parent.scroll.scrollX;
	    }

	    var _children = _utils2.default.funcOrValue(i.children, i);

	    var _imgWidth = _img ? _img.$width || _img.width || 0 : 0;
	    var _imgHeight = _img ? _img.$height || _img.height || 0 : 0;

	    if (_img && !_img.$width) {
	        _img.$width = _imgWidth;
	        _img.$height = _imgHeight;
	    }

	    _props.tw = _props.tw || _props.sw || _imgWidth;
	    _props.th = _props.th || _props.sh || _imgHeight;
	    _props.sw = _props.sw || _imgWidth;
	    _props.sh = _props.sh || _imgHeight;

	    if (_props.locate === 'center') {
	        _props.tx = _props.tx - 0.5 * _props.tw;
	        _props.ty = _props.ty - 0.5 * _props.th;
	    } else if (_props.locate === 'rd') {
	        _props.tx = _props.tx - 1 * _props.tw;
	        _props.ty = _props.ty - 1 * _props.th;
	    }

	    if (_props.fh || _props.fv) {
	        settings.transform = {
	            fh: _props.fh,
	            fv: _props.fv,
	            // fx: -_props.fv * _props.fx,
	            // fy: -_props.fh * _props.fy,
	            fx: (_props.ty + _props.th / 2) * _props.fv * -1 + _props.fx,
	            fy: (_props.tx + _props.tw / 2) * _props.fh * -1 + _props.fy
	        };
	    }

	    if (_props.rotate) {
	        // 定点旋转
	        var transX = _props.rx !== undefined ? _props.rx : _props.tx + 0.5 * _props.tw;
	        var transY = _props.ry !== undefined ? _props.ry : _props.ty + 0.5 * _props.th;
	        settings.translateBeforeRotate = [transX, transY];
	        settings.rotate = -_props.rotate * Math.PI / 180;
	        settings.rotate = Number(settings.rotate.toFixed(4));
	        settings.translateAfterRotate = [-transX, -transY];
	    }

	    if (_props.scale !== 1) {
	        _props.tx -= (_props.scale - 1) * 0.5 * _props.tw;
	        _props.ty -= (_props.scale - 1) * 0.5 * _props.th;
	        _props.tw *= _props.scale;
	        _props.th *= _props.scale;
	    }

	    if (_props.mirrX) {
	        settings.translate = [$canvas.contextWidth, 0];
	        settings.scale = [-1, 1];
	        _props.tx = $canvas.contextWidth - _props.tx - _props.tw;
	        if (_props.mirrY) {
	            settings.translate = [$canvas.contextWidth, $canvas.contextHeight];
	            settings.scale = [-1, -1];
	            _props.ty = $canvas.contextHeight - _props.ty - _props.th;
	        }
	    } else if (_props.mirrY) {
	        settings.translate = [0, $canvas.contextHeight];
	        settings.scale = [1, -1];
	        _props.ty = $canvas.contextHeight - _props.ty - _props.th;
	    }

	    /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */
	    // 判断sw、sh是否存在只是从计算上防止js报错，其实上游决定了参数一定存在
	    if (!_props.rotate && !_text) {
	        if (_props.sx < 0 && _props.sw) {
	            var cutRate = -_props.sx / _props.sw;
	            _props.tx += _props.tw * cutRate;
	            _props.sx = 0;
	        }
	        if (_props.sy < 0 && _props.sh) {
	            var _cutRate = -_props.sy / _props.sh;
	            _props.ty += _props.th * _cutRate;
	            _props.sy = 0;
	        }
	        if (_imgWidth && _props.sx + _props.sw > _imgWidth) {
	            var _cutRate2 = (_props.sx + _props.sw - _imgWidth) / _props.sw;
	            _props.sw -= _props.sw * _cutRate2;
	            _props.tw -= _props.tw * _cutRate2;
	        }
	        if (_imgHeight && _props.sy + _props.sh > _imgHeight) {
	            var _cutRate3 = (_props.sy + _props.sh - _imgHeight) / _props.sh;
	            _props.sh -= _props.sh * _cutRate3;
	            _props.th -= _props.th * _cutRate3;
	        }

	        if (_props.tx < 0 && _props.tw) {
	            var _cutRate4 = -_props.tx / _props.tw;
	            _props.sx += _props.sw * _cutRate4;
	            _props.sw -= _props.sw * _cutRate4;
	            _props.tw = _props.tw + _props.tx;
	            _props.tx = 0;
	        }
	        if (_props.ty < 0 && _props.th) {
	            var _cutRate5 = -_props.ty / _props.th;
	            _props.sy += _props.sh * _cutRate5;
	            _props.sh -= _props.sh * _cutRate5;
	            _props.th = _props.th + _props.ty;
	            _props.ty = 0;
	        }
	        if (_props.tx + _props.tw > $canvas.contextWidth && _props.tw) {
	            var _cutRate6 = (_props.tx + _props.tw - $canvas.contextWidth) / _props.tw;
	            _props.tw -= _props.tw * _cutRate6;
	            _props.sw -= _props.sw * _cutRate6;
	        }
	        if (_props.ty + _props.th > $canvas.contextHeight && _props.th) {
	            var _cutRate7 = (_props.ty + _props.th - $canvas.contextHeight) / _props.th;
	            _props.th -= _props.th * _cutRate7;
	            _props.sh -= _props.sh * _cutRate7;
	        }
	    }

	    if (typeof i.$cache.tx !== 'undefined') {
	        _constants2.default.xywh.forEach(function (key) {
	            // 如果元素每帧移动距离小于1像素，那么认为对象在缓动，此时不取整（避免引起抖动）
	            if (Math.abs(i.$cache[key] - _props[key]) > 1) {
	                _props[key] = parseInt(_props[key]);
	                // } else {
	                //     _props[key] = parseInt(_props[key]);
	                //     _props[key] = Number(_props[key].toFixed(1));
	            }
	        });
	    } else {
	        _constants2.default.xywh.forEach(function (key) {
	            // 首帧可以取整；不在forEach里进行if是为了降低每帧进行的判断次数，节约性能
	            _props[key] = parseInt(_props[key]);
	        });
	    }

	    for (var key in _props) {
	        i.$cache[key] = _props[key];
	    }
	    delete i.$cache.textBottom;

	    if (_img && typeof i.$cache.imgType === 'undefined') {
	        if (!_img.src) {
	            i.$cache.imgType = 'canvas';
	        } else if (_img.src.substr(-3) === 'png') {
	            i.$cache.imgType = 'png';
	        } else {
	            i.$cache.imgType = '*';
	        }
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        if (!i.$cache.base64 && _img && _img.src) {
	            i.$cache.base64 = 'processing';
	            (0, _img2base2.default)(_img.src, function (data) {
	                i.$cache.base64 = data;
	            });
	        }
	    }

	    if (_children) {
	        _children.filter(function (item) {
	            return item.style.zIndex < 0;
	        }).sort(function (a, b) {
	            if (a.style.zIndex === b.style.zIndex) return 0;
	            return a.style.zIndex > b.style.zIndex ? 1 : -1;
	        }).forEach(function (c, _index) {
	            $canvas.$perPaint.call($canvas, c, _index);
	        });
	    }

	    if (typeof _props.opacity !== 'undefined') {
	        settings.globalAlpha = _props.opacity;
	    } else {
	        settings.globalAlpha = 1;
	    }

	    // $canvas.$paintContext.fillRect(_props.tx, _props.ty, _props.tw, _props.th);
	    if (_img && _imgWidth && _props.opacity !== 0 && _props.sw && _props.sh && _props.tx < $canvas.contextWidth && _props.ty < $canvas.contextHeight) {
	        // // cache computed w/h
	        // i.style.tw = i.style.tw || _props.tw || _imgWidth;
	        // i.style.th = i.style.th || _props.th || _imgHeight;

	        $canvas.$paintList.push({
	            $id: i.$id,
	            type: 'img',
	            settings: settings,
	            imgType: i.$cache.imgType,
	            props: [_img, _props.sx, _props.sy, _props.sw, _props.sh, _props.tx, _props.ty, _props.tw, _props.th]
	        });
	    }
	    if (_text) {
	        var textTx = _props.tx;
	        var textTy = _props.ty;
	        var textAlign = i.style.align;
	        var textFont = _utils2.default.funcOrValue(i.style.font, i) || '14px Arial';
	        var textFontsize = parseInt(textFont);
	        var textLineHeight = i.style.lineHeight || textFontsize;

	        // Change css-align to canvas-align style
	        if (textAlign === 'center') {
	            textTx += _props.tw / 2;
	        } else if (textAlign === 'right') {
	            textTx += _props.tw;
	        }

	        // Change css-align to canvas-align style
	        if (i.style.textVerticalAlign === 'top') {
	            textTy += textFontsize + (textLineHeight - textFontsize) / 2;
	        } else if (i.style.textVerticalAlign === 'bottom') {
	            textTy += _props.th - (textLineHeight - textFontsize) / 2;
	        } else {
	            textTy += _props.th / 2 + textFontsize / 2;
	        }

	        if (typeof _text === 'string') {
	            $canvas.$paintList.push({
	                $id: i.$id,
	                type: 'text',
	                settings: settings,
	                props: {
	                    tx: textTx,
	                    ty: textTy,
	                    // tw: _props.tw,
	                    // th: _props.th,
	                    content: _text,
	                    align: textAlign || 'left',
	                    font: textFont,
	                    color: i.style.color || 'white',
	                    type: i.style.textType || 'fillText'
	                }
	            });
	        } else if (_text.type === 'multline-text') {
	            var textArr = _text.text.split(/\t|\n/);
	            var isChinese = function isChinese(temp) {
	                var re = /[^\u4e00-\u9fa5]/;
	                return !re.test(temp);
	            };
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
	                    length -= textFontsize * (isChinese(eachText[_i]) ? 1.05 : 0.6);
	                }
	                if (eachText || textIndex) {
	                    renderArr.push(eachText);
	                }
	            });
	            renderArr.forEach(function (r) {
	                $canvas.$paintList.push({
	                    $id: i.$id,
	                    type: 'text',
	                    settings: settings,
	                    props: {
	                        tx: textTx,
	                        ty: textTy,
	                        // tw: _props.tw,
	                        // th: _props.th,
	                        content: r,
	                        align: textAlign || 'left',
	                        font: textFont,
	                        color: i.style.color || 'white',
	                        type: i.style.textType || 'fillText'
	                    }
	                });
	                textTy += textLineHeight || textFontsize;
	            });
	            // Record last line of this text
	            i.$cache.textBottom = textTy;
	        }
	    }

	    if (_children) {
	        _children.filter(function (item) {
	            return !(item.style.zIndex < 0);
	        }).sort(function (a, b) {
	            if (a.style.zIndex === b.style.zIndex) return 0;
	            return a.style.zIndex > b.style.zIndex ? 1 : -1;
	        }).forEach(function (c, _index) {
	            $canvas.$perPaint.call($canvas, c, _index);
	        });
	    }

	    _utils2.default.execFuncs(i.hooks.ticked, i);
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _tick = __webpack_require__(5);

	var _tick2 = _interopRequireDefault(_tick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (f) {
	    var time = new Date().getTime();
	    this.$nextTickTime = time;

	    if (time - this.fpsCalculateTime >= 1000) {
	        this.fpsCalculateTime = time;
	        if (this.fpsHandler) {
	            this.fpsHandler.call(this, this.fps);
	        }
	        this.lastFps = this.fps;
	        this.fps = 0;
	    }

	    (0, _tick2.default)(function (rafTime) {
	        this.$rafTime = rafTime;
	        this.$rAFer(f);
	        if (this.maxFps > 0 && this.maxFps < 60) {
	            if (time - this.$lastPaintTime <= 1000 / this.maxFps) {
	                return;
	            }
	            // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
	            this.$lastPaintTime = time - (time - this.$lastPaintTime) % (1000 / this.maxFps);
	        }
	        f();
	    }.bind(this));
	}; /** ********** *
	    *
	    * Execute function(@f) in each frame
	    * - Limit by browsers, adjusting the time not being a multiple of RAF's interval (16.7ms).
	    * - See https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
	    *
	    * ********** **/

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Call canvas.prototype's text functions
	 * - Default type is fillText.
	 *
	 * ********** **/

	module.exports = function (text) {
	  this.$paintContext.font = text.font;
	  this.$paintContext.strokeStyle = text.color;
	  this.$paintContext.fillStyle = text.color;
	  this.$paintContext.textAlign = text.align;
	  this.$paintContext[text.type || 'fillText'](text.content, parseInt(text.tx), parseInt(text.ty));
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _add = __webpack_require__(25);

	var _add2 = _interopRequireDefault(_add);

	var _remove = __webpack_require__(32);

	var _remove2 = _interopRequireDefault(_remove);

	var _start = __webpack_require__(35);

	var _start2 = _interopRequireDefault(_start);

	var _paint = __webpack_require__(28);

	var _paint2 = _interopRequireDefault(_paint);

	var _clear = __webpack_require__(26);

	var _clear2 = _interopRequireDefault(_clear);

	var _pause = __webpack_require__(29);

	var _pause2 = _interopRequireDefault(_pause);

	var _on = __webpack_require__(10);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(9);

	var _off2 = _interopRequireDefault(_off);

	var _trigger = __webpack_require__(11);

	var _trigger2 = _interopRequireDefault(_trigger);

	var _broadcast = __webpack_require__(8);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	var _nextTick = __webpack_require__(27);

	var _nextTick2 = _interopRequireDefault(_nextTick);

	var _register = __webpack_require__(30);

	var _register2 = _interopRequireDefault(_register);

	var _setFpsHandler = __webpack_require__(33);

	var _setFpsHandler2 = _interopRequireDefault(_setFpsHandler);

	var _setMaxFps = __webpack_require__(34);

	var _setMaxFps2 = _interopRequireDefault(_setMaxFps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Inner apis of an easycanvas instance
	 * - Used for Easycanvas.js and the outsides.
	 * - Will be added to Easycanvas instance's prototype.
	 *
	 * ********** **/

	var apiOuter = {
	    start: _start2.default,
	    paint: _paint2.default,
	    add: _add2.default,
	    remove: _remove2.default,
	    register: _register2.default,
	    clear: _clear2.default,
	    setFpsHandler: _setFpsHandler2.default,
	    setMaxFps: _setMaxFps2.default,
	    pause: _pause2.default,
	    on: _on2.default,
	    off: _off2.default,
	    trigger: _trigger2.default,
	    broadcast: _broadcast2.default,
	    nextTick: _nextTick2.default
	};

	module.exports = apiOuter;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _sprite = __webpack_require__(6);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _bindDrag = __webpack_require__(4);

	var _bindDrag2 = _interopRequireDefault(_bindDrag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var add = function add(item) {
	    if (!item) return;

	    var $canvas = this;

	    var _item = item;

	    _item.$canvas = $canvas;

	    if (!_item.$id) {
	        _item = new _sprite2.default(_item);
	    }

	    _bindDrag2.default.bind(_item);

	    _item.children.forEach(function (c, i) {
	        _item.children[i] = new _sprite2.default(c);
	        _item.children[i].$canvas = $canvas;
	        _item.children[i].$parent = _item;
	    });

	    $canvas.paintList.push(_item);

	    if (process.env.NODE_ENV !== 'production') {
	        $canvas.$plugin.hook.updateTree($canvas);
	    }

	    return _item;
	}; /** ********** *
	    *
	    * Add a child to instance or sprite
	    * - If @item is not a Sprite, this will create a new sprite first.
	    * - Using $id to judge whether @item is a instance of Sprite.
	    *
	    * ********** **/

	module.exports = add;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Clear paintList
	 *
	 * ********** **/

	module.exports = function () {
	  this.paintList = [];
	  // this.paintList.splice(0);
	};

/***/ }),
/* 27 */
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
	    this.off('nextTick', _func);
	  };
	  this.on('nextTick', _func.bind(this));
	};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    if (this.$pausing) return;
	    if (document.hidden) return;

	    var $canvas = this;

	    _utils2.default.execFuncs($canvas.hooks.ticked, $canvas, [$canvas.$rafTime]);

	    $canvas.$paintContext.clearRect(0, 0, this.contextWidth, this.contextHeight);

	    if (!$canvas.$freezing) {
	        $canvas.$paintList = [];

	        this.paintList.sort(function (a, b) {
	            var za = _utils2.default.funcOrValue(a.style.zIndex, a);
	            var zb = _utils2.default.funcOrValue(b.style.zIndex, b);
	            if (za === zb) return 0;
	            return za > zb ? 1 : -1;
	        }).forEach(function (perItem, index) {
	            $canvas.$perPaint(perItem, index);
	        });
	    }

	    // let xxxx = document.getElementsByClassName('XXXXX');
	    // for (let i = 0; i < xxxx.length; i++) {
	    //     xxxx[i].toDelete = 1;
	    //     // xxxx[i].remove();
	    // }

	    $canvas.$paint();

	    // for (let i = 0; i < xxxx.length; i++) {
	    //     if (xxxx[i].toDelete)
	    //         xxxx[i].remove();
	    // }

	    this.fps++;

	    if ($canvas.hooks.nextTick) {
	        _utils2.default.execFuncs($canvas.hooks.nextTick, $canvas, [$canvas.$rafTime]);
	        delete $canvas.hooks.nextTick;
	    }
	}; /** ********** *
	    *
	    * Sort the sprite and call inner functions
	    * - Will be called in each frame after the 'start' function called.
	    *
	    * ********** **/

/***/ }),
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _registerProtoData = __webpack_require__(31);

	var _registerProtoData2 = _interopRequireDefault(_registerProtoData);

	var _eventHandlerScroll = __webpack_require__(7);

	var _eventHandlerScroll2 = _interopRequireDefault(_eventHandlerScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Create an Easycanvas instance on current dom
	 * - Start the 'hold' event judging interval(may includes a memory waste after destroyed).
	 *
	 * ********** **/

	module.exports = function (dom, option) {
	    var _this = this;

	    for (var i in _registerProtoData2.default) {
	        // this[i] = JSON.parse(JSON.stringify($protoData[i]));
	        this[i] = _registerProtoData2.default[i];
	    }

	    var _option = option || {};

	    this.$dom = dom;
	    this.$paintContext = dom.getContext('2d');
	    this.width = this.contextWidth = _option.width || dom.width;
	    this.height = this.contextHeight = _option.height || dom.height;

	    if (process.env.NODE_ENV !== 'production') {
	        this.$plugin.hook.register(this);
	    }

	    this.events = _option.events || {};

	    // this.scroll = _option.scroll || {};
	    this.hooks = _option.hooks || {};

	    var eventList = ['contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'];
	    eventList.forEach(function (e) {
	        dom.addEventListener(e, _this.$eventHandler.bind(_this));
	    });

	    _eventHandlerScroll2.default.tick();
	    // this.$bindScroll.bind(_this);

	    setInterval(function () {
	        if (_this.eHoldingFlag) {
	            var e = _this.eHoldingFlag;
	            _this.$eventHandler.call(_this, {
	                layerX: e.layerX,
	                layerY: e.layerY,
	                screenX: e.screenX || e.layerX,
	                screenY: e.screenY || e.layerY,
	                type: 'hold'
	            });
	        }
	    }, 40); // TODO
	};

/***/ }),
/* 31 */
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
	    $lastPaintTime: 0,
	    $pausing: false,
	    $freezing: false,

	    fps: 0,
	    lastFps: 0,
	    fpsCalculateTime: 0,
	    fpsHandler: null,
	    contextWidth: 0,
	    contextHeight: 0,
	    events: {
	        click: null
	    },
	    paintList: [],
	    eHoldingFlag: false,
	    eLastMouseHover: null,

	    maxFps: -1,

	    /* optimise */
	    // optimiser: {
	    //     blockSize: 100,
	    //     cacheMap: {},
	    // },

	    /* scroll */
	    scroll: {
	        scrollable: false,
	        scrollY: 0,
	        minScrollY: undefined,
	        maxScrollY: undefined
	    },

	    /* flags */
	    $flags: {
	        dragging: false
	    }
	};

	if (process.env.NODE_ENV !== 'production') {
	    PROTOS.fpsHandler = function (fps) {
	        if (this.maxFps > 0 && fps < this.maxFps * 0.5) {
	            console.warn('Low FPS detected(' + fps + '), max FPS in settings is ' + this.maxFps + '.');
	        }
	    };
	}

	module.exports = PROTOS;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Remove a sprite (async)
	 * - In develop mode, fps will throw warnings in low performance.
	 *
	 * ********** **/

	module.exports = function (item, del) {
	    item.style.visible = false;
	    item.removing = true;

	    setTimeout(function () {
	        if (item.$parent) {
	            item.$parent.children = item.$parent.children.filter(function (c) {
	                return c.removing !== true;
	            });
	        } else {
	            this.paintList = this.paintList.filter(function (c) {
	                return c.removing !== true;
	            });
	        }
	    }.bind(this));

	    if (del) {
	        this.paintList.splice(this.paintList.indexOf(item), 1);
	    }

	    if (process.env.NODE_ENV !== 'production') {
	        var $canvas = this;
	        $canvas.$plugin.hook.updateTree($canvas);
	    }
	};

/***/ }),
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Start rAF loop
	 * - Cannot called twice on same instance
	 *
	 * ********** **/

	module.exports = function () {
	  this.fpsCalculateTime = new Date().getTime();
	  this.$rAFer(this.paint.bind(this));
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Send message to chrome devtools, by emitting events to the document
	 * - Will add a 'mask' sprite to show the active sprite.
	 * - Only works in develop mode.
	 * - The handlers are in /plugin/index.js file.
	 *
	 * ********** **/

	module.exports = function () {
	    if (process.env.NODE_ENV !== 'production') {
	        var TO_PANEL_EVENT_NAME = '__EASYCANVAS_BRIDGE_TOPANEL__';
	        window.document.addEventListener('__EASYCANVAS_BRIDGE_TODOC__', function (recieveData) {
	            var data = recieveData.detail;

	            if (data.action = 'code') {
	                console.log(data.content);
	                eval(data.content);
	            }
	        });

	        var $emit = function $emit(passData) {
	            passData.tabId = window[_constants2.default.devFlag].tabId;

	            window.document.dispatchEvent(new CustomEvent(TO_PANEL_EVENT_NAME, {
	                //  filtering special types
	                detail: JSON.parse(JSON.stringify(passData))
	                // bubbles: true,
	                // cancelable: true
	            }));
	        };

	        setTimeout(function () {
	            $emit({
	                name: 'init'
	            });
	        });

	        var $selectMask = null;
	        var maskCanvas = document.createElement('img');
	        maskCanvas.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

	        return {
	            hook: {
	                drawImage: function drawImage($canvas, _props) {
	                    if (!window[_constants2.default.devFlag].isPaintRecording) return;

	                    // $emit({
	                    //     name: 'drawImage',
	                    //     id: $canvas.$id,
	                    //     value: _props
	                    // });

	                    window[_constants2.default.devFlag].peformance.area += _props.tw * _props.th;
	                    window[_constants2.default.devFlag].peformance.times++;
	                },
	                updateTree: function updateTree($canvas) {
	                    if (!window[_constants2.default.devFlag].isPaintRecording) return;

	                    $emit({
	                        name: 'updateTree',
	                        id: $canvas.$id
	                    });
	                },
	                register: function register($canvas) {
	                    $canvas.$id = Math.random().toString(36).substr(2);

	                    if (!$canvas.$flags.devtoolHanged) {
	                        if (!window[_constants2.default.devFlag].$canvas[$canvas.$id]) {
	                            window[_constants2.default.devFlag].$canvas[$canvas.$id] = {
	                                $canvas: $canvas
	                            };
	                            $canvas.$flags.devtoolHanged = true;
	                        }
	                    }
	                },
	                selectSprite: function selectSprite(isChoosing, $canvas, $sprite) {
	                    if (!$sprite || !window[_constants2.default.devFlag].selectMode) return false;

	                    if (!$selectMask) {
	                        $selectMask = $canvas.add({
	                            name: _constants2.default.devFlag,
	                            content: {
	                                img: maskCanvas
	                            },
	                            style: {}
	                        });
	                    }

	                    // Has NOT decided which is better
	                    // for (let key in $sprite.style) {
	                    //     (function (_key) {
	                    //         $selectMask.style[_key] = function () {
	                    //             return $sprite.style[_key] || 0;
	                    //         };
	                    //         // $selectMask.style[_key] = $sprite.style[_key] || 0;
	                    //     })(key);
	                    // }
	                    // $sprite.inherit.forEach((key) => {
	                    //     (function (_key) {
	                    //         $selectMask.style[_key] = function () {
	                    //             return $sprite.$cache[_key] || 0;
	                    //         };
	                    //         // $selectMask.style[_key] = $sprite.$cache[_key] || 0;
	                    //     })(key);
	                    // });

	                    var _loop = function _loop(key) {
	                        (function (_key) {
	                            if (_constants2.default.sxywh.indexOf(key) >= 0) {
	                                return;
	                            }
	                            $selectMask.style[_key] = function () {
	                                return $sprite.$cache[_key] || 0;
	                            };
	                        })(key);
	                    };

	                    for (var key in $sprite.$cache) {
	                        _loop(key);
	                    }

	                    // $sprite.$cache has calculated the 'scale' and 'locate'
	                    // Here uses the default values
	                    $selectMask.style.scale = 1;
	                    $selectMask.style.locate = 'lt';

	                    $selectMask.style.zIndex = Number.MAX_SAFE_INTEGER;
	                    $selectMask.style.visible = function () {
	                        return window[_constants2.default.devFlag].selectMode;
	                    };
	                    $selectMask.style.opacity = 0.8;

	                    if (isChoosing) {
	                        $canvas.remove($selectMask);
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
	                    $canvas.remove($selectMask);
	                    $selectMask = null;
	                }
	            }
	        };
	    }
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _apiOuter = __webpack_require__(24);

	var _apiOuter2 = _interopRequireDefault(_apiOuter);

	var _apiInner = __webpack_require__(17);

	var _apiInner2 = _interopRequireDefault(_apiInner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Exports an Easycanvas Prototype
	 * - Merge apis to its prototypes.
	 *
	 * ********** **/

	var painter = function painter() {};

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
/* 38 */
/***/ (function(module, exports) {

	'use strict';

	var ProcessingFlag = 'processing';
	var ProcessingPool = {};

	function toDataUR(url, callback) {
	    if (url && url.match(/^data:/)) {
	        callback && callback(url);
	        return;
	    }

	    if (ProcessingPool[url]) {
	        if (ProcessingPool[url] !== ProcessingFlag) {
	            callback(ProcessingPool[url]);
	        } else {
	            setTimeout(function () {
	                toDataUR(url, callback);
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

	module.exports = toDataUR;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function (text, config) {
	    return {
	        type: 'multline-text',
	        text: text,
	        config: config
	    };
	};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function (img, config) {
	    return {
	        type: 'sequence-diagram',
	        index: 0,
	        img: img,
	        config: config
	    };
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var transitions = [];

	// Math.PI wastes some performace
	var PI = 3.141593;

	var second2frame = function second2frame(second) {
	    return second / 1000 * 60;
	};

	var transFuncs = {
	    linear: function linear(a, b, duration) {
	        var l = transitions.length;
	        transitions.push(a);

	        var loop = false;

	        var resFunc = function resFunc() {
	            var current = transitions[l];
	            if (current >= a && current < b || current > b && current <= a) {
	                transitions[l] += (b - a) / second2frame(duration);
	            } else {
	                if (loop) {
	                    transitions[l] = a;
	                }

	                return {
	                    $$value: b,
	                    $$over: true,
	                    $$loop: function $$loop() {
	                        transitions[l] = a;
	                    }
	                };
	            }
	            return {
	                $$value: current,
	                $$over: false
	            };
	        };

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        return resFunc;
	    },

	    pendulum: function pendulum(a, b, duration, _config) {
	        var config = _config || {};
	        config.start = _utils2.default.firstValuable(config.start, -PI);
	        config.end = _utils2.default.firstValuable(config.end, PI);
	        config.cycle = _utils2.default.firstValuable(config.cycle, 2 * PI);

	        var l = transitions.length;
	        transitions.push(config.start);

	        var loop = false;
	        var stay = false;

	        var resFunc = function resFunc() {
	            var current = Math.cos(transitions[l]) + 1; // 0 ~ 2
	            transitions[l] += PI / second2frame(duration);

	            if (transitions[l] > config.end) {
	                if (loop) {
	                    transitions[l] -= config.cycle;
	                } else {
	                    transitions[l] = config.end;
	                }
	            }

	            return {
	                $$value: _utils2.default.funcOrValue(a) + (_utils2.default.funcOrValue(b) - _utils2.default.funcOrValue(a)) * current / 2,
	                $$over: !stay && transitions[l] >= config.end,
	                $$loop: function $$loop() {
	                    transitions[l] = -PI;
	                }
	            };
	        };

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };
	        resFunc.stay = function () {
	            stay = true;
	            return resFunc;
	        };

	        return resFunc;
	    },

	    halfPendulum: function halfPendulum(a, b, duration) {
	        return transFuncs.pendulum(a, b, duration, {
	            start: -PI,
	            end: 0,
	            cycle: PI
	        });
	    },

	    oneByOne: function oneByOne(_arr) {
	        var arr = _arr;
	        var loop = false;

	        var resFunc = function resFunc() {
	            for (var i = 0; i < arr.length; i++) {
	                var res = arr[i]();
	                if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) === 'object') {
	                    if (!res.$$over) {
	                        return res.$$value;
	                    }
	                } else if (res !== false) {
	                    return res;
	                }
	            }

	            if (loop) {
	                var _res = void 0;
	                for (var _i = 0; _i < arr.length; _i++) {
	                    var tmp = arr[_i]();
	                    if (tmp && tmp.$$loop) {
	                        tmp.$$loop();
	                        _res = _res || arr[_i]();
	                    }
	                }
	                return _res;
	            }
	        };

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        return resFunc;
	    }
	};

	module.exports = transFuncs;

/***/ })
/******/ ])
});
;