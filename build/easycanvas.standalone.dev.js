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

	module.exports = __webpack_require__(17);


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
/* 3 */,
/* 4 */
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** ********** *
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

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _on = __webpack_require__(12);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(11);

	var _off2 = _interopRequireDefault(_off);

	var _nextTick = __webpack_require__(10);

	var _nextTick2 = _interopRequireDefault(_nextTick);

	var _trigger = __webpack_require__(13);

	var _trigger2 = _interopRequireDefault(_trigger);

	var _broadcast = __webpack_require__(9);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	var _bindDrag = __webpack_require__(7);

	var _bindDrag2 = _interopRequireDefault(_bindDrag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	    item.style.zIndex = item.style.zIndex || 0;
	    item.style.mirrX = item.style.mirrX || 0;

	    item.style.opacity = _utils2.default.firstValuable(item.style.opacity, 1);
	    item.style.locate = item.style.locate || 'center';
	    // item.style.rotate = item.style.rotate || 0;
	    item.style.scale = item.style.scale || 1;

	    var _img = _utils2.default.funcOrValue(item.content.img);

	    _constants2.default.xywh.forEach(function (key) {
	        item.style[key] = item.style[key] || 0;
	    });

	    item.inherit = item.inherit || ['tx', 'ty', 'scale', 'opacity'];
	    item.drag = item.drag || {};

	    item.events = item.events || {};
	    if (true) {
	        for (var i in item.events) {
	            if (typeof item.events[i] !== 'function' && i !== 'eIndex') {
	                console.warn('[Easycanvas] Handler ' + i + ' is not a function.', item.events[i]);
	            }
	        }
	    }

	    item.events.eIndex = item.events.eIndex;
	    // item.events.through = !!item.events.through;

	    item.scroll = item.scroll || {};
	    item.scroll.scrollX = item.scroll.scrollX || 0;
	    item.scroll.scrollY = item.scroll.scrollY || 0;

	    item.hooks = item.hooks || {};

	    if (true) {
	        item.$perf = {};
	    }

	    if (true) {
	        if (!item.name && item.content.img && item.content.img.src) {
	            var fileName = item.content.img.src.match(/.*\/([^\/]*)$/);
	            if (fileName && fileName[1]) {
	                item.name = fileName[1];
	            }
	        }
	        item.name = item.name || 'Unnamed Easycanvas Object';
	    }

	    item.children = item.children || [];

	    ChangeChildrenToSprite(item);

	    item.$cache = {};
	    item.$scroll = {
	        speedX: 0,
	        speedY: 0
	    };

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

	    _bindDrag2.default.bind(this.children[this.children.length - 1]);

	    return this.children[this.children.length - 1];
	};

	sprite.prototype.getRect = function () {
	    var _this2 = this;

	    var res = {};

	    _constants2.default.txywh.forEach(function (key) {
	        res[key] = _this2.getStyle(key);
	    });

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

	sprite.prototype.getSelfStyle = function (_ref) {
	    var locate = _ref.locate;

	    var res = {};
	    for (var key in this.style) {
	        res[key] = _utils2.default.funcOrValue(this.style[key], this);
	    }

	    return res;
	};

	sprite.prototype.getStyle = function (key) {
	    var $sprite = this;
	    var currentValue = _utils2.default.funcOrValue($sprite.style[key], $sprite);

	    if ($sprite.$parent && $sprite.inherit.indexOf(key) >= 0) {
	        // 额外处理滚动
	        if (key === 'tx') {
	            currentValue -= $sprite.$parent.scroll.scrollX || 0;
	        } else if (key === 'ty') {
	            currentValue -= $sprite.$parent.scroll.scrollY || 0;
	        }

	        if (key === 'tw' || key === 'th') {
	            return _utils2.default.firstValuable(currentValue, $sprite.$parent.getStyle(key));
	        } else if (key === 'opacity' || key === 'scale') {
	            return _utils2.default.firstValuable($sprite.$parent.getStyle(key), 1) * _utils2.default.firstValuable(currentValue, 1);
	        } else {
	            return _utils2.default.firstValuable($sprite.$parent.getStyle(key), 0) + _utils2.default.firstValuable(currentValue, 0);
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

	sprite.prototype.nextTick = _nextTick2.default;
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var draggingFlag = false; /** ********** *
	                           *
	                           * Bind drag events to EVERY SPRITE.
	                           * - Whether to trigger handlers, is decided by '$Sprite.scroll.scrollable'.
	                           * - Drag events FISRT, scroll events FOLLOWING. Drags will stop events' bubbling.
	                           * - TODO: Move 'bindings' to event handlers
	                           * - WARN: Hold will not trigger on draging
	                           *
	                           * ********** **/

	var setFlag = function setFlag($sprite, value) {
	    $sprite.drag.draggingFlag = value;
	    draggingFlag = value;
	};

	var dragHandler = function dragHandler(originHandler, item, e, dragEnabled) {
	    return originHandler ? originHandler.call(item, e) : dragEnabled ? 'drag' : false;
	};

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	module.exports = {
	    bind: function bind($sprite) {
	        var startDragPosition = {
	            x: 0,
	            y: 0
	        };

	        $sprite.drag = $sprite.drag || {};

	        $sprite.drag.draggingFlag = false;

	        var oMousedown = $sprite.events.mousedown || $sprite.events.touchstart;
	        $sprite.events[isMobile ? 'touchstart' : 'mousedown'] = function (e) {
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

	        var oMousemove = $sprite.events.mousemove || $sprite.events.touchmove;
	        $sprite.events[isMobile ? 'touchmove' : 'mousemove'] = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
	            if (worked) {
	                this.style.tx += e.canvasX - startDragPosition.x;
	                this.style.ty += e.canvasY - startDragPosition.y;

	                // 立即更新cache，否则拖拽太快可能触发跟不上
	                this.$canvas.$flags.dragging = this;

	                startDragPosition.x = e.canvasX;
	                startDragPosition.y = e.canvasY;
	            }
	            return dragHandler(oMousemove, $sprite, e, worked);
	        }.bind($sprite);

	        var oMouseup = $sprite.events.mouseup || $sprite.events.touchend;
	        $sprite.events[isMobile ? 'touchend' : 'mouseup'] = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;

	            this.$canvas.$flags.dragging = undefined;

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
/* 8 */
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

	    touch: function touch($sprite, $e) {
	        if (!$sprite.scroll.scrollable) return false;

	        if (!scrolling) {
	            // start scroll
	            scrolling = +new Date();
	            startPos.x = $e.canvasX;
	            startPos.y = $e.canvasY;
	        } else {
	            if (tickPool.indexOf($sprite) === -1) {
	                tickPool.push($sprite);
	            }

	            var absX = Math.abs($e.canvasX - startPos.x);
	            var absY = Math.abs($e.canvasY - startPos.y);
	            var deltaTime = +new Date() - scrolling;
	            scrolling = +new Date();
	            deltaTime /= 10;
	            if (absX / deltaTime > 1 && deltaTime > 1) {
	                $sprite.$scroll.speedX += ($e.canvasX - startPos.x) / deltaTime;
	            }
	            if (absY / deltaTime > 1 && deltaTime > 1) {
	                $sprite.$scroll.speedY += ($e.canvasY - startPos.y) / deltaTime;
	            }

	            startPos.x = $e.canvasX;
	            startPos.y = $e.canvasY;

	            $e.event.preventDefault();
	            return true;
	        }
	    },

	    wheel: function wheel($sprite, $e) {
	        if (!$sprite.scroll.scrollable) return false;

	        if (tickPool.indexOf($sprite) === -1) {
	            tickPool.push($sprite);
	        }

	        $sprite.$scroll.speedX = $e.event.wheelDeltaX;
	        $sprite.$scroll.speedY = $e.event.wheelDeltaY;

	        $e.event.preventDefault();
	        return true;
	    }
	};

	module.exports = scrollFuncs;

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (event, func) {
	    if (!this.hooks[event]) return;

	    if (this.hooks[event] === func || !func) {
	        delete this.hooks[event];
	    } else if (_utils2.default.isArray(this.hooks[event])) {
	        this.hooks[event][this.hooks[event].indexOf(func)] = undefined;
	    }
	}; /** ********** *
	    *
	    * Remove current hook
	    *
	    * ********** **/

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (name, func, debounce) {
	    var _handle = func;

	    if (debounce) {
	        var that = this;
	        _handle = function handle() {
	            var now = Date.now();

	            if (now > _handle.$lastTriggerTime + debounce) {
	                _handle.$lastTriggerTime = now;
	                var args = Array.prototype.slice.call(arguments);
	                func.apply(that, args);
	            }
	        };
	        _handle.$lastTriggerTime = -1;
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
/* 13 */
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
/* 14 */
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
	        // setTimeout(function () {
	        if (callback) {
	            callback(Cache[cacheNamespace]);
	        }
	        // });
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Preparing data for devtool.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (true) {
	    if (!window[_constants2.default.devFlag]) {
	        // init
	        var devData = window[_constants2.default.devFlag] = {
	            isPaintRecording: false,
	            selectMode: false,
	            current: {},

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
	                            parent: item.$parent && item.$parent.$id,
	                            style: {},
	                            children: item.children && item.children.map(function (child) {
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

	                        var attachList = ['blend', 'physics', '$perf'];

	                        attachList.forEach(function (key) {
	                            res[item.$id][key] = item[key];
	                        });

	                        if (item.children) {
	                            item.children.forEach(pusher);
	                        }
	                    };

	                    children.forEach(pusher);
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

	            updateSprite: function updateSprite($spriteId, map, $canvasId) {
	                var $sprite = BRIDGE.selectSpriteById($spriteId, $canvasId).$sprite;
	                if (!$sprite) console.warn('Sprite ' + spriteId + ' Not Found.');

	                _extends($sprite.style, map);
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

	                console.info('window.$ec = [Easycanvas ' + $canvas.$id + '], window.$es = [Easycanvas ' + $sprite.$id + ']');
	                window.$ec = $canvas;
	                window.$es = $sprite;
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _sprite = __webpack_require__(6);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    sprite: _sprite2.default
	};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(41);

	var _index2 = _interopRequireDefault(_index);

	var _tick = __webpack_require__(5);

	var _tick2 = _interopRequireDefault(_tick);

	var _mirror = __webpack_require__(51);

	var _mirror2 = _interopRequireDefault(_mirror);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _transition = __webpack_require__(53);

	var _transition2 = _interopRequireDefault(_transition);

	var _imgLoader = __webpack_require__(14);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	var _imgPretreat = __webpack_require__(49);

	var _imgPretreat2 = _interopRequireDefault(_imgPretreat);

	var _multlineText = __webpack_require__(52);

	var _multlineText2 = _interopRequireDefault(_multlineText);

	var _main = __webpack_require__(16);

	var _main2 = _interopRequireDefault(_main);

	var _chromeDevtool = __webpack_require__(15);

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
	    class: _main2.default,
	    $version: '0.5.1',
	    env: ("develop")
	};

	Easycanvas.extend = function (pluginHook) {
	    Easycanvas.class.sprite.prototype.$extendList.push(pluginHook);
	};

	if (true) {
	    Easycanvas.$warn = function () {
	        var lastConsoleTime = 0;
	        return function () {
	            var now = Date.now();
	            if (now - lastConsoleTime < 1000) {
	                // 防止连续警告
	                return;
	            }

	            var args = Array.prototype.slice.call(arguments);

	            lastConsoleTime = now;
	            console.warn.apply(this, args);
	        };
	    }();
	}

	if (window.Easycanvas) {
	    console.warn('[Easycanvas] already loaded.');
	} else {
	    if (true) {
	        console.warn('[Easycanvas] You are using the develop version.');
	    }
	    window.Easycanvas = Easycanvas;
	}

	module.exports = Easycanvas;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _perPaint = __webpack_require__(26);

	var _perPaint2 = _interopRequireDefault(_perPaint);

	var _render = __webpack_require__(28);

	var _render2 = _interopRequireDefault(_render);

	var _eventHandler = __webpack_require__(22);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _bindDrag = __webpack_require__(7);

	var _bindDrag2 = _interopRequireDefault(_bindDrag);

	var _rAFer = __webpack_require__(27);

	var _rAFer2 = _interopRequireDefault(_rAFer);

	var _apiPlugin = __webpack_require__(40);

	var _apiPlugin2 = _interopRequireDefault(_apiPlugin);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var apiInner = {
	    $render: _render2.default,
	    $eventHandler: _eventHandler2.default,
	    $perPaint: _perPaint2.default,
	    $bindDrag: _bindDrag2.default,
	    $rAFer: _rAFer2.default
	}; /** ********** *
	    *
	    * Inner apis of an easycanvas instance
	    * - Used for Easycanvas.js only normally.
	    * - Will be added to Easycanvas instance's prototype.
	    *
	    * ********** **/

	if (true) {
	    apiInner.$plugin = (0, _apiPlugin2.default)();
	}

	module.exports = apiInner;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _eventHandlerScroll = __webpack_require__(8);

	var _eventHandlerScroll2 = _interopRequireDefault(_eventHandlerScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Sort sprite
	 * - Order by eIndex dev-tool's in events' triggering
	 * - Order by zIndex in dev-tool's select mode
	 */
	var sortByIndex = function sortByIndex(arr) {
	    return arr.sort(function (a, b) {
	        if (true) {
	            if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                return _utils2.default.funcOrValue(a.style.zIndex, a) < _utils2.default.funcOrValue(b.style.zIndex, b) ? 1 : -1;
	            }
	        }

	        return _utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) < _utils2.default.funcOrValue(_utils2.default.firstValuable(b.events.eIndex, b.style.zIndex), b) ? 1 : -1;
	    });
	};

	/**
	 * Check whether the event hits certain sprite
	 * - Use $sprite.$cache to compare 
	 * - Sprite in first frame will not captrue any event [?]
	 */
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

	var isVisible = function isVisible($sprite) {
	    if ($sprite.$parent && !isVisible($sprite.$parent)) {
	        return false;
	    }
	    return _utils2.default.funcOrValue($sprite.style.visible, $sprite) !== false;
	};
	var hitSprite = function hitSprite($sprite, e) {
	    if (isVisible($sprite) === false) {
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

	    return _utils2.default.pointInRect(e.canvasX, e.canvasY, _tx, _tx + _tw, _ty, _ty + _th);
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
	                if (true) {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) >= 0;
	                    }
	                }

	                return _utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0;
	            })), e, caughts);
	        }
	        if (hitSprite(item, e)) {
	            caughts.push(item);
	        }
	        if (item.children.length) {
	            // Children below
	            looper(sortByIndex(item.children.filter(function (a) {
	                if (true) {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) < 0;
	                    }
	                }

	                return !(_utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0);
	            })), e, caughts);
	        }
	    }
	};

	module.exports = function (e) {
	    var $canvas = this;

	    if (!e.layerX && e.touches && e.touches[0]) {
	        e.layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
	        e.layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
	    }
	    if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
	        e.layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
	        e.layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
	    }

	    var isRotated = this.$dom.getBoundingClientRect().width > this.$dom.getBoundingClientRect().height !== this.width > this.height;

	    var scaleX = Math.floor(this.$dom.getBoundingClientRect()[isRotated ? 'height' : 'width']) / this.width;
	    var scaleY = Math.floor(this.$dom.getBoundingClientRect()[isRotated ? 'width' : 'height']) / this.height;

	    scaleX = scaleX || 1;
	    scaleY = scaleY || 1;

	    var $e = {
	        type: e.type,
	        canvasX: e.layerX / scaleX,
	        canvasY: e.layerY / scaleY,
	        event: e
	    };

	    if ($canvas.events.interceptor) {
	        $e = $canvas.events.interceptor($e);
	    }

	    var caughts = [];

	    if ($canvas.$flags.dragging && $canvas.$flags.dragging.$id) {
	        caughts.push($canvas.$flags.dragging);
	    }

	    looper(sortByIndex($canvas.children), $e, caughts);

	    if (true) {
	        // 开发者工具select模式下为选取元素
	        if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode && caughts.length) {
	            var chooseSprite = caughts[0];
	            if (chooseSprite.name === _constants2.default.devFlag) {
	                // 选中mask不算
	                chooseSprite = caughts[1];
	            }

	            if (chooseSprite && $canvas.$plugin.selectSprite(e.type === 'click' || e.type === 'touchend', $canvas, chooseSprite)) {
	                return;
	            }
	        }
	    }

	    // Create a new event: 'hold' (suits both mobile and pc)
	    if (!$canvas.eHoldingFlag && ($e.type === 'mousedown' || $e.type === 'touchstart')) {
	        $canvas.eHoldingFlag = e;
	    } else if ($canvas.eHoldingFlag && ($e.type === 'mouseup' || $e.type === 'touchend')) {
	        $canvas.eHoldingFlag = false;
	        _eventHandlerScroll2.default.stop();
	    } else if ($canvas.eHoldingFlag && ($e.type === 'mousemove' || $e.type === 'touchmove')) {
	        $canvas.eHoldingFlag = e;
	    } // else if (!$canvas.eHoldingFlag && e.type === 'contextmenu') {

	    for (var i = 0; i < caughts.length; i++) {
	        // trigger 'mouseout' or 'touchout' event 
	        if (($e.type === 'mousemove' || $e.type === 'touchmove') && $canvas.eLastMouseHover && $canvas.eLastMouseHover !== caughts[i] && caughts.indexOf($canvas.eLastMouseHover) === -1) {
	            // touchout待移除（目前可能不触发）
	            var eMouseout = $canvas.eLastMouseHover['events']['mouseout'] || $canvas.eLastMouseHover['events']['touchout'];
	            if (eMouseout) {
	                eMouseout.call($canvas.eLastMouseHover, $e);
	            }
	        }

	        if ($e.type === 'mousewheel') {
	            _eventHandlerScroll2.default.wheel(caughts[i], $e);
	        } else if ($canvas.eHoldingFlag && $e.type === 'touchmove') {
	            if (_eventHandlerScroll2.default.touch(caughts[i], $e)) {
	                return;
	            }
	        }

	        if (!caughts[i]['events']) continue; // TODO to remove

	        var _handler = caughts[i]['events'][$e.type];
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

	        if (caughts[i].events.through === false) {
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

	    var handler = $canvas.events[$e.type];
	    if (handler) {
	        if (handler.call($canvas, $e)) {
	            $canvas.eHoldingFlag = false;
	            return true;
	        }
	    }
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Fix border to improve performance
	 *
	 * ********** **/

	module.exports = function ($canvas, props, imgWidth, imgHeight) {
	    // source
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
	        props.sw -= props.sw * _cutRate2;
	        props.tw -= props.tw * _cutRate2;
	    }
	    if (imgHeight && props.sy + props.sh > imgHeight) {
	        var _cutRate3 = (props.sy + props.sh - imgHeight) / props.sh;
	        props.sh -= props.sh * _cutRate3;
	        props.th -= props.th * _cutRate3;
	    }

	    // target
	    if (props.tx < 0 && props.tw) {
	        var _cutRate4 = -props.tx / props.tw;
	        props.sx += props.sw * _cutRate4;
	        props.sw -= props.sw * _cutRate4;
	        props.tw = props.tw + props.tx;
	        props.tx = 0;
	    }
	    if (props.ty < 0 && props.th) {
	        var _cutRate5 = -props.ty / props.th;
	        props.sy += props.sh * _cutRate5;
	        props.sh -= props.sh * _cutRate5;
	        props.th = props.th + props.ty;
	        props.ty = 0;
	    }
	    if (props.tx + props.tw > $canvas.width && props.tw) {
	        var _cutRate6 = (props.tx + props.tw - $canvas.width) / props.tw;
	        props.tw -= props.tw * _cutRate6;
	        props.sw -= props.sw * _cutRate6;
	    }
	    if (props.ty + props.th > $canvas.height && props.th) {
	        var _cutRate7 = (props.ty + props.th - $canvas.height) / props.th;
	        props.th -= props.th * _cutRate7;
	        props.sh -= props.sh * _cutRate7;
	    }
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function ($canvas, children, part) {
	    if (children) {
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
	    }
	}; /** ********** *
	    *
	    * Send children to be painted
	    * - Children will be rendered above the parent, if zIndex >= 0
	    * - Even the same zIndex, chilren will be render in differrent orders
	    *   in different environments, like Chrome and PhantomJs.
	    *
	    * ********** **/

/***/ }),
/* 25 */
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
	    var _props = {};

	    for (var i in $sprite.content) {
	        _props[i] = _utils2.default.funcOrValue($sprite.content[i], $sprite);
	    }

	    // 正常情况下，add阶段会进行string2object的转换
	    // 此处是防止动态修改了某个img为string
	    if (typeof _props.img === 'string') {
	        _props.img = $sprite.content.img = $canvas.imgLoader(_props.img);
	    }

	    for (var _i in $sprite.style) {
	        _props[_i] = $sprite.getStyle(_i);
	    }
	    $sprite.inherit.forEach(function (i) {
	        _props[i] = $sprite.getStyle(i);
	    });

	    // Maybe a plgin is better ?
	    // @interval 可以是function，其它的必须常量
	    if (_props.sequence) {
	        var _img = _props.img;
	        var config = _props.sequence;

	        // 确立index
	        _props.sequence.index = _props.sequence.index || 0;
	        var index = _props.sequence.index || 0;
	        if (index < 0) index = 0;

	        // 计算每帧的宽高
	        var pw = void 0,
	            ph = void 0;
	        if (config.w || config.h) {
	            if (config.w < 0) {
	                pw = _img.width / (0 - config.w);
	            } else if (config.w > 0) {
	                pw = config.w;
	            } else {
	                pw = _img.width;
	            }
	            if (config.h < 0) {
	                ph = _img.height / (0 - config.h);
	            } else if (config.h > 0) {
	                ph = config.h;
	            } else {
	                ph = _img.height;
	            }

	            var wTimes = Math.floor(_img.width / pw);
	            var hTimes = Math.floor(_img.height / ph);

	            _props.sx = index % wTimes * pw;
	            _props.sy = Math.floor(index / wTimes) % hTimes * ph;
	        }

	        // 不循环的精灵动画自动移除
	        if (!config.loop && index > 0 && _props.sx === 0 && _props.sy === 0) {
	            _props.img = undefined;
	            if (config.onOver) {
	                config.onOver.call($sprite);
	            } else {
	                $sprite.remove();
	            }
	        }

	        // 判断是否应该下一帧
	        _props.sequence.lastTickTime = _props.sequence.lastTickTime || 0;
	        if ($canvas.$nextTickTime - _props.sequence.lastTickTime >= _utils2.default.funcOrValue(_props.sequence.interval, $sprite)) {
	            config.lastTickTime = $canvas.$nextTickTime;
	            _props.sequence.index++;
	            _props.sequence.lastTickTime = $canvas.$nextTickTime;
	        }

	        // 默认的读取和绘制尺寸等于每帧尺寸
	        _props.sw = _props.sw || pw;
	        _props.sh = _props.sh || ph;
	        _props.tw = _props.tw || pw;
	        _props.th = _props.th || ph;
	    }

	    return _props;
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _img2base = __webpack_require__(4);

	var _img2base2 = _interopRequireDefault(_img2base);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _perPaintGetComputedStyle = __webpack_require__(25);

	var _perPaintGetComputedStyle2 = _interopRequireDefault(_perPaintGetComputedStyle);

	var _perPaintCutOutside = __webpack_require__(23);

	var _perPaintCutOutside2 = _interopRequireDefault(_perPaintCutOutside);

	var _perPaintDeliverChildren = __webpack_require__(24);

	var _perPaintDeliverChildren2 = _interopRequireDefault(_perPaintDeliverChildren);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * CORE painting function
	 * - Calculates props of every sprite in children, then puts to $children.
	 * - Includes optimization.
	 * - NOT connecting to canvas's prototype functions.
	 *
	 * ********** **/

	var blend = _utils2.default.blend;

	var isChineseChar = function isChineseChar(temp) {
	    var re = /[^\u4e00-\u9fa5]/;
	    return !re.test(temp);
	};

	module.exports = function (i, index) {
	    i.$rendered = false;

	    if (_utils2.default.funcOrValue(i.style.visible, i) === false) {
	        _utils2.default.execFuncs(i.hooks.beforeTick, i, i.$tickedTimes);
	        _utils2.default.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
	        return;
	    }

	    _utils2.default.execFuncs(i.hooks.beforeTick, i, i.$tickedTimes);

	    var $canvas = this;

	    var settings = {};

	    var _props = (0, _perPaintGetComputedStyle2.default)(i, $canvas);
	    var _text = _props.text;
	    var _img = _props.img;

	    var _children = _utils2.default.funcOrValue(i.children, i);

	    var _imgWidth = _img ? _img.width || 0 : 0;
	    var _imgHeight = _img ? _img.height || 0 : 0;

	    _props.tw = _props.tw || _props.sw || _imgWidth;
	    _props.th = _props.th || _props.sh || _imgHeight;
	    _props.sw = _props.sw || _imgWidth;
	    _props.sh = _props.sh || _imgHeight;

	    if (_props.locate === 'lt') {
	        // _props.tx = _props.tx;
	        // _props.ty = _props.ty;
	    } else if (_props.locate === 'ld') {
	        // _props.tx = _props.tx;
	        _props.ty -= _props.th;
	    } else if (_props.locate === 'rt') {
	        _props.tx -= _props.tw;
	        // _props.ty = _props.ty;
	    } else if (_props.locate === 'rd') {
	        _props.tx -= _props.tw;
	        _props.ty -= _props.th;
	    } else {
	        // center
	        _props.tx -= _props.tw >> 1;
	        _props.ty -= _props.th >> 1;
	    }

	    if (i.webgl) {
	        i.$rendered = true;

	        var _webgl = {
	            tx: i.getStyle('tx'),
	            ty: i.getStyle('ty'),
	            tz: _utils2.default.funcOrValue(i.webgl.tz, i) || 0
	        };
	        for (var key in i.webgl) {
	            _webgl[key] = _utils2.default.funcOrValue(i.webgl[key], i) || 0;
	        }

	        var $paintSprite = {
	            $id: i.$id,
	            type: '3d',
	            webgl: _webgl
	        };

	        if (true) {
	            // 开发环境下，将元素挂载到$children里以供标记
	            $paintSprite.$origin = i;
	        };

	        $canvas.$children.push($paintSprite);
	    }

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

	    if (_props.rotate) {
	        // 定点旋转
	        var transX = _utils2.default.firstValuable(_props.rx, _props.tx + 0.5 * _props.tw);
	        var transY = _utils2.default.firstValuable(_props.ry, _props.ty + 0.5 * _props.th);
	        settings.beforeRotate = [transX, transY];
	        settings.rotate = -_props.rotate * Math.PI / 180;
	        settings.rotate = Number(settings.rotate.toFixed(4));
	        settings.afterRotate = [-transX, -transY];
	    }

	    var scale = _props.scale;
	    if (scale !== 1) {
	        _props.tx -= (scale - 1) * _props.tw >> 1;
	        _props.ty -= (scale - 1) * _props.th >> 1;
	        _props.tw *= scale;
	        _props.th *= scale;
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

	    /*
	     * 性能浪费检测
	     * 拿到最大的“绘制/源尺寸”比值，如果这个值过低，那么显然存在资源浪费
	     * 由于对象可能处于动画中，因此选用最大的绘制比
	     */
	    if (true) {
	        if (_imgWidth && _imgHeight && _props.sw && _props.sh) {
	            var paintRate = _props.tw * _props.th / (_props.sw * _props.sh);
	            if (!i.$perf.paintRate || paintRate > i.$perf.paintRate) {
	                i.$perf.paintRate = paintRate;
	                // i.$perf.paintProps = JSON.stringify(_props);
	            }
	        }
	    }

	    for (var _key in _props) {
	        i.$cache[_key] = _props[_key];
	    }

	    /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */
	    // 判断sw、sh是否存在只是从计算上防止js报错，其实上游决定了参数一定存在
	    if (!_props.rotate && !_text && _imgWidth) {
	        (0, _perPaintCutOutside2.default)($canvas, _props, _imgWidth, _imgHeight);
	    }

	    if (_imgWidth > 10 && _imgHeight > 10) {
	        // 太小的图不取整，以免“高1像素的图，在sx和sw均为0.5的情况下渲染不出来”
	        _constants2.default.xywh.forEach(function (key) {
	            _props[key] = Math.round(_props[key]);
	            // _props[key] >>= 0;
	        });
	    }

	    delete i.$cache.textBottom;

	    // if (process.env.NODE_ENV !== 'production') {
	    //     if (!i.$cache.base64 && _img && _img.src) {
	    //         i.$cache.base64 = 'processing';
	    //         img2base64(_img.src, function (data) {
	    //             i.$cache.base64 = data;
	    //         });
	    //     }
	    // }

	    (0, _perPaintDeliverChildren2.default)($canvas, _children, -1);

	    settings.globalAlpha = _utils2.default.firstValuable(_props.opacity, 1);

	    if (_img && _imgWidth && _props.opacity !== 0 && _props.sw && _props.sh && _props.tx >= 0 && _props.tx < $canvas.width && _props.ty >= 0 && _props.ty < $canvas.height) {
	        i.$rendered = true;

	        var _$paintSprite = {
	            $id: i.$id,
	            type: 'img',
	            settings: settings,
	            props: [_img, _props.sx, _props.sy, _props.sw, _props.sh, _props.tx, _props.ty, _props.tw, _props.th]
	        };

	        if (true) {
	            // 开发环境下，将元素挂载到$children里以供标记
	            _$paintSprite.$origin = i;
	        };

	        $canvas.$children.push(_$paintSprite);
	    }

	    // TODO: rewrite
	    if (_text) {
	        i.$rendered = true;

	        var textTx = _props.tx;
	        var textTy = _props.ty;
	        var textAlign = _props.align || _props.textAlign || 'left';
	        var textFont = _props.textFont || '14px Arial';
	        var textFontsize = parseInt(textFont);
	        var textLineHeight = _props.lineHeight || textFontsize;

	        // Change css-align to canvas-align style
	        if (textAlign === 'center') {
	            textTx += _props.tw / 2;
	        } else if (textAlign === 'right') {
	            textTx += _props.tw;
	        }

	        // Change css-align to canvas-align style
	        if (_props.textVerticalAlign === 'top') {
	            textTy += textFontsize + (textLineHeight - textFontsize) / 2;
	        } else if (_props.textVerticalAlign === 'bottom') {
	            textTy += _props.th - (textLineHeight - textFontsize) / 2;
	        } else if (_props.textVerticalAlign === 'middle') {
	            textTy += _props.th / 2 + textFontsize / 2;
	        }

	        if (typeof _text === 'string' || typeof _text === 'number') {
	            $canvas.$children.push({
	                $id: i.$id,
	                type: 'text',
	                settings: settings,
	                props: {
	                    tx: textTx,
	                    ty: textTy,
	                    content: String(_text),
	                    align: textAlign,
	                    font: textFont,
	                    color: _props.color,
	                    type: _props.textType
	                }
	            });
	        } else if (_text.length) {
	            _text.forEach(function (t) {
	                $canvas.$children.push({
	                    $id: i.$id,
	                    type: 'text',
	                    settings: settings,
	                    props: {
	                        tx: textTx + _utils2.default.funcOrValue(t.tx, i),
	                        ty: textTy + _utils2.default.funcOrValue(t.ty, i),
	                        content: _utils2.default.funcOrValue(t.content, i),
	                        align: textAlign,
	                        font: textFont,
	                        color: _props.color,
	                        type: _props.textType
	                    }
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
	                    $id: i.$id,
	                    type: 'text',
	                    settings: settings,
	                    props: {
	                        tx: textTx,
	                        ty: textTy,
	                        // tw: _props.tw,
	                        // th: _props.th,
	                        content: r,
	                        align: textAlign,
	                        font: textFont,
	                        color: _props.color,
	                        type: _props.textType
	                    }
	                });
	                textTy += textLineHeight || textFontsize;
	            });
	            // Record last line of this text
	            i.$cache.textBottom = textTy;
	        }
	    }

	    (0, _perPaintDeliverChildren2.default)($canvas, _children, 1);

	    _utils2.default.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _tick = __webpack_require__(5);

	var _tick2 = _interopRequireDefault(_tick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (f) {
	    var time = Date.now();
	    window.Easycanvas.transition.$lastPaintTime = this.$nextTickTime = time;

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
	        this.$rafTime = rafTime;
	        this.$rAFer(f);
	        if (this.maxFps > 0 && this.maxFps < 60) {
	            if (time - this.$lastPaintTime <= 1000 / this.maxFps) {
	                return;
	            }

	            // 让$lastPaintTime不带有小尾巴（101，199，202，298这种变成100，200，300，400）
	            // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
	            this.$lastPaintTime = time - (time - this.$lastPaintTime) % (1000 / this.maxFps);
	        } else {
	            this.$lastPaintTime = Date.now();
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    var isUseless = false;
	    if ($sprite.type === 'img') {
	        // 当前图层不太小的时候，判断是否可以跳过绘制
	        var currentImgSize = props[7] * props[8];
	        var $children = $canvas.$children;
	        if (currentImgSize > 200 * 200) {
	            for (var j = $children.length - 1; j > i; j--) {
	                var $tmpSprite = $children[j];

	                if ($tmpSprite.$cannotCover) {
	                    // 被判断为不能遮挡当前绘制的直接跳过
	                    continue;
	                }

	                var tmpProps = $tmpSprite.props;

	                if (!tmpProps || !tmpProps[0]) {
	                    // 不是图片
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                if (tmpProps[7] * tmpProps[8] < currentImgSize) {
	                    // 太小的图片不认为可以遮挡当前图片，不能跳过当前图片的绘制
	                    // 只是对于当前图片来说cannotCover，对其它图片有可能，所以不设置$cannotCover
	                    continue;
	                }

	                if (!tmpProps[0].$noAlpha) {
	                    // 带alpha通道的图片不会遮挡当前图片，不能跳过当前图片的绘制
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                var tmpSpriteSettings = $tmpSprite.settings;

	                // 带rotate的元素暂时不考虑，需要复杂的计算
	                if (tmpSpriteSettings.globalAlpha !== 1 || tmpSpriteSettings.globalCompositeOperation || tmpSpriteSettings.rotate) {
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                if (_utils2.default.pointInRect(props[5], props[6], tmpProps[5], tmpProps[5] + tmpProps[7], tmpProps[6], tmpProps[6] + tmpProps[8]) && _utils2.default.pointInRect(props[5] + props[7], props[6] + props[8], tmpProps[5], tmpProps[5] + tmpProps[7], tmpProps[6], tmpProps[6] + tmpProps[8])) {
	                    if (true) {
	                        $sprite.$origin.$useless = true;
	                        $canvas.$plugin.jumpRender($canvas, props);
	                    }

	                    isUseless = true;
	                    // console.log('useless');

	                    return;
	                }
	            }
	        }
	        // } else if ($sprite.type === 'text') {
	        // 文本绘制消耗性能较少，毋需优化
	    }

	    if (true) {
	        if ($sprite.$origin) {
	            $sprite.$origin.$useless = false;
	        }
	    }
	    // console.log('useful');

	    var settings = $sprite.settings || {};

	    if ($canvas.$isWebgl && window.Easycanvas.$webglPainter) {
	        window.Easycanvas.$webglPainter($sprite, settings, $canvas);
	        return;
	    }

	    /*
	        Rendering operation
	    */
	    var saved = false;
	    var cxt = $canvas.$paintContext;

	    if (settings.globalCompositeOperation) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.globalCompositeOperation = settings.globalCompositeOperation;
	    }

	    if (settings.globalAlpha !== 1 && !isNaN(settings.globalAlpha)) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.globalAlpha = settings.globalAlpha;
	    }

	    if (settings.translate) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.translate(settings.translate[0] || 0, settings.translate[1] || 0);
	    }

	    if (settings.rotate) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.translate(settings.beforeRotate[0] || 0, settings.beforeRotate[1] || 0);
	        cxt.rotate(settings.rotate || 0);
	        cxt.translate(settings.afterRotate[0] || 0, settings.afterRotate[1] || 0);
	    }

	    if (settings.scale) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.scale(settings.scale[0] || 1, settings.scale[1] || 1);
	    }

	    if (settings.transform) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.transform(1, settings.transform.fh, settings.transform.fv, 1, settings.transform.fx, settings.transform.fy);
	    }

	    if ($sprite.type === 'img') {
	        cxt.drawImage(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8]);
	        if (true) {
	            $canvas.$plugin.drawImage($canvas, props);
	        }
	    } else if ($sprite.type === 'text' && props.content) {
	        cxt.font = props.font;
	        cxt.fillStyle = cxt.strokeStyle = props.color || 'white';
	        cxt.textAlign = props.align;
	        cxt[props.type || 'fillText'](props.content, props.tx, props.ty);
	    }

	    if (saved) {
	        cxt.restore();
	    }
	}; /** ********** *
	    *
	    * CORE painting function
	    * - Controlling canvas context, Transfer $children to rendered sprite.
	    * - Includes some optimization.
	    *
	    * ********** **/

	module.exports = function () {
	    var $canvas = this;

	    $canvas.$children.forEach(render.bind($canvas));
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _add = __webpack_require__(30);

	var _add2 = _interopRequireDefault(_add);

	var _remove = __webpack_require__(36);

	var _remove2 = _interopRequireDefault(_remove);

	var _start = __webpack_require__(39);

	var _start2 = _interopRequireDefault(_start);

	var _paint = __webpack_require__(32);

	var _paint2 = _interopRequireDefault(_paint);

	var _clear = __webpack_require__(31);

	var _clear2 = _interopRequireDefault(_clear);

	var _pause = __webpack_require__(33);

	var _pause2 = _interopRequireDefault(_pause);

	var _on = __webpack_require__(12);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(11);

	var _off2 = _interopRequireDefault(_off);

	var _trigger = __webpack_require__(13);

	var _trigger2 = _interopRequireDefault(_trigger);

	var _broadcast = __webpack_require__(9);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	var _nextTick = __webpack_require__(10);

	var _nextTick2 = _interopRequireDefault(_nextTick);

	var _register = __webpack_require__(34);

	var _register2 = _interopRequireDefault(_register);

	var _setFpsHandler = __webpack_require__(37);

	var _setFpsHandler2 = _interopRequireDefault(_setFpsHandler);

	var _setMaxFps = __webpack_require__(38);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _sprite = __webpack_require__(6);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _sprite2.default.prototype.add; /** ********** *
	                                                  *
	                                                  * Add a child to instance or sprite
	                                                  * - If @item is not a Sprite, this will create a new sprite first.
	                                                  * - Using $id to judge whether @item is a instance of Sprite.
	                                                  *
	                                                  * ********** **/

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Clear children
	 *
	 * ********** **/

	module.exports = function () {
	  this.children = [];
	  // this.children.splice(0);
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    if (this.$pausing || document.hidden) return;

	    var $canvas = this;

	    _utils2.default.execFuncs($canvas.hooks.ticked, $canvas, [$canvas.$rafTime]);

	    if (this.$isWebgl) {
	        var gl = this.$gl;
	        // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
	        // Tell WebGL how to convert from clip space to pixels
	        // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	        // gl.colorMask(true, false, false, true);
	        gl.clear(gl.COLOR_BUFFER_BIT);
	    } else {
	        $canvas.$paintContext.clearRect(0, 0, this.width, this.height);
	        // $canvas.$paintContext.fillStyle = 'rgba(255, 0, 0, 0.1)';
	        // $canvas.$paintContext.fillRect(0, 0, this.width, this.height);
	    }

	    if (!$canvas.$freezing) {
	        $canvas.$children = [];

	        if (true) {
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

	        if (true) {
	            $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'END');
	        }
	    }

	    if (true) {
	        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'START');
	    }

	    $canvas.$render();

	    if (true) {
	        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'END');
	    }

	    this.fps++;

	    if ($canvas.hooks.nextTick) {
	        _utils2.default.execFuncs($canvas.hooks.beforeTick, $canvas, [$canvas.$rafTime]);
	        delete $canvas.hooks.nextTick;
	    }
	}; /** ********** *
	    *
	    * Sort the sprite and call inner functions
	    * - Will be called in each frame after the 'start' function called.
	    *
	    * ********** **/

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _eventHandlerScroll = __webpack_require__(8);

	var _eventHandlerScroll2 = _interopRequireDefault(_eventHandlerScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (dom, option) {
	    var _this = this;

	    if (true) {
	        this.fpsHandler = this.fpsHandler || function (fps) {
	            if (this.maxFps > 0 && fps < this.maxFps - 5 && fps < 40) {
	                console.warn('[Easycanvas] Low FPS detected (' + fps + '/' + this.maxFps + ').');
	            }
	        };
	    }

	    var _option = option || {};

	    this.$dom = dom || this.$dom;

	    for (var i in _option) {
	        this[i] = _option[i];
	    }

	    this.name = _option.name || 'Unnamed';

	    if (_option.fullScreen) {
	        dom.width = dom.style.width = document.body.clientWidth || document.documentElement.clientWidth;
	        dom.height = dom.style.height = document.body.clientHeight || document.documentElement.clientHeight;
	    }

	    if (true) {
	        if (_option.width && dom.attributes['width'] && _option.width !== dom.width || _option.height && dom.attributes['height'] && _option.height !== dom.height) {
	            console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
	        }
	    }

	    dom.width = this.width = this.width || _option.width || dom.width;
	    dom.height = this.height = this.height || _option.height || dom.height;

	    if (_option.webgl) {
	        this.$paintContext = dom.getContext('webgl', {
	            alpha: true,
	            premultipliedAlpha: false
	        });

	        if (this.$paintContext) {
	            this.$isWebgl = true;

	            if (true) {
	                if (!window.Easycanvas.$webglRegister) {
	                    console.warn('[Easycanvas] You has not imported the "Webgl" plugin of Easycanvas.');
	                }
	            }

	            window.Easycanvas.$webglRegister(this, _option);
	        } else {
	            if (true) {
	                console.warn('[Easycanvas] Webgl is not supported in current browser, using canvas2d instead.');
	            }
	        }
	    }

	    this.$paintContext = this.$paintContext || dom.getContext('2d');

	    if (true) {
	        this.$plugin.register(this);
	    }

	    this.events = _option.events || this.events || {};

	    // this.scroll = _option.scroll || {};
	    this.hooks = _option.hooks || this.hooks || {};

	    var eventList = ['contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'];
	    eventList.forEach(function (e) {
	        dom.addEventListener(e, _this.$eventHandler.bind(_this));
	    });

	    _eventHandlerScroll2.default.tick();
	    // this.$bindScroll.bind(_this);
	}; /** ********** *
	    *
	    * Create an Easycanvas instance on current dom
	    * - Start the 'hold' event judging interval(may includes a memory waste after destroyed).
	    *
	    * ********** **/

/***/ }),
/* 35 */
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

	module.exports = PROTOS;

/***/ }),
/* 36 */
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
	            $sprite.$parent.children = $sprite.$parent.children.filter(function (c) {
	                return c.$removing !== true;
	            });
	        } else {
	            _this.children = _this.children.filter(function (c) {
	                return c.$removing !== true;
	            });
	        }

	        if ($sprite.$canvas) {
	            $sprite.$canvas = undefined;
	            $sprite.$parent = undefined;
	            $sprite.$tickedTimes = undefined;
	            $sprite.$cache = undefined;
	            $sprite.$rendered = false;
	            if (true) {
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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Start rAF loop
	 * - Cannot called twice on same instance
	 *
	 * ********** **/

	module.exports = function () {
	    var _this = this;

	    this.fpsCalculateTime = Date.now();
	    this.$rAFer(this.paint.bind(this));

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(2);

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
	    if (true) {
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

	        setTimeout(function () {
	            $emit({
	                name: 'init'
	            });
	        });

	        var MaskCanvasBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

	        var $selectMask = null;

	        var PerSecondCollects = ['paintArea', 'paintTimes', 'paintTimeSpend', 'preprocessTimeSpend', 'loadArea', 'jumpArea'];

	        var ApiPlugin = {
	            drawImage: function drawImage($canvas, _props) {
	                if (!window[_constants2.default.devFlag].isPaintRecording) return;

	                $canvas.$perf.$paintArea += _props[7] * _props[8];
	                $canvas.$perf.$loadArea += _props[3] * _props[4];
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
	                $canvas.$perf['$' + type] += (startOrEnd === 'START' ? -1 : 1) * Date.now();
	            },
	            selectSprite: function selectSprite(isChoosing, $canvas, $sprite) {
	                if (!$sprite || !window[_constants2.default.devFlag].selectMode) {
	                    ApiPlugin.cancelSelectSprite($canvas);
	                    return false;
	                }

	                if (!$selectMask) {
	                    $selectMask = $canvas.add({
	                        name: _constants2.default.devFlag,
	                        content: {
	                            img: $canvas.imgLoader(MaskCanvasBase64)
	                        },
	                        style: {}
	                    });
	                }

	                ['tx', 'ty', 'tw', 'th', 'rotate', 'rx', 'ry'].forEach(function (key) {
	                    (function (_key) {
	                        $selectMask.style[_key] = function () {
	                            return $sprite.$cache && $sprite.$cache[_key];
	                        };
	                    })(key);
	                });

	                // mask of webgl
	                $selectMask.webgl = $sprite.webgl ? {} : false;
	                if ($selectMask.webgl) {
	                    for (var key in $sprite.webgl) {
	                        $selectMask.webgl[key] = $sprite.webgl[key];
	                    }
	                    $selectMask.webgl.img = $canvas.imgLoader(MaskCanvasBase64);
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
	                if (!$selectMask) return;

	                $canvas.remove($selectMask);
	                $selectMask = null;
	            }
	        };

	        return ApiPlugin;
	    }
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _apiOuter = __webpack_require__(29);

	var _apiOuter2 = _interopRequireDefault(_apiOuter);

	var _apiInner = __webpack_require__(21);

	var _apiInner2 = _interopRequireDefault(_apiInner);

	var _registerProtoData = __webpack_require__(35);

	var _registerProtoData2 = _interopRequireDefault(_registerProtoData);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var painter = function painter(config) {
	    this.imgLoader = Easycanvas.imgLoader;

	    for (var i in _registerProtoData2.default) {
	        // Avoid muti instances from sharing data
	        this[i] = this[i] || JSON.parse(JSON.stringify(_registerProtoData2.default[i]));
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
	}; /** ********** *
	    *
	    * Exports an Easycanvas Prototype
	    * - Merge apis to its prototypes.
	    *
	    * ********** **/

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
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _imgLoader = __webpack_require__(14);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	var _img2base = __webpack_require__(4);

	var _img2base2 = _interopRequireDefault(_img2base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (url, option) {
	    var result = undefined;

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
/* 50 */,
/* 51 */
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
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Math.PI wastes some performace
	var PI = 3.141593;

	var second2frame = function second2frame(second) {
	    return second / 1000 * 60;
	};

	var getLastPaintTime = function getLastPaintTime(transitions) {
	    return transitions.$lastPaintTime || Date.now();
	};

	var transFuncs = {
	    linear: function linear(a, b, duration) {
	        if (a === b) return a;

	        var startTime = getLastPaintTime(this);

	        var loop = false;

	        var resFunc = function () {
	            var currentTime = this.$lastPaintTime;
	            var result = (b - a) * (currentTime - startTime) / duration + a;

	            if (loop) {
	                if (b > a) {
	                    while (result > b) {
	                        result -= b - a;
	                    }
	                } else {
	                    while (result < b) {
	                        result += b - a;
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

	            return result;
	        }.bind(this);

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        resFunc.restart = function () {
	            startTime = getLastPaintTime(this);
	        };

	        return resFunc;
	    },

	    pendulum: function pendulum(a, b, duration, _config) {
	        if (a === b) return a;

	        var startTime = getLastPaintTime(this);

	        var config = _config || {};
	        config.start = config.start || 0;

	        var loop = false;

	        var resFunc = function () {
	            var currentTime = getLastPaintTime(this);
	            var passTime = (currentTime - startTime) / duration;

	            if (!loop) {
	                if (config.cycle) {
	                    if (config.cycle < passTime) {
	                        resFunc.$done = true;
	                        passTime = config.cycle;
	                    }
	                } else if (passTime > 1) {
	                    resFunc.$done = true;
	                    passTime = 1;
	                }
	            } else {
	                if (config.cycle) {
	                    passTime %= config.cycle;
	                }
	            }

	            var deg = passTime * PI * 2 - PI / 2 + config.start / 360 * PI;
	            var result = (b - a) * (Math.sin(deg) + 1) / 2 + a;

	            return result;
	        }.bind(this);

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        resFunc.restart = function () {
	            startTime = getLastPaintTime(this);
	        };

	        return resFunc;
	    },

	    ease: function ease(a, b, duration) {
	        return this.pendulum(a, b, duration, {
	            cycle: 0.5
	        });
	    },

	    oneByOne: function oneByOne(_arr) {
	        var arr = _arr;
	        var loop = false;

	        var resFunc = function resFunc() {
	            for (var i = 0; i < arr.length; i++) {
	                if (!arr[i].$done) {
	                    return arr[i]();
	                } else if (!arr[i].$nextRestart) {
	                    arr[i].$nextRestart = true;
	                    if (arr[i + 1]) {
	                        arr[i + 1].restart();
	                        return arr[i + 1]();
	                    }
	                }
	            }

	            if (loop) {
	                for (var _i = 0; _i < arr.length; _i++) {
	                    arr[_i].$done = false;
	                    arr[_i].$nextRestart = false;
	                    arr[_i].restart();
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

	module.exports = transFuncs;

/***/ })
/******/ ])
});
;