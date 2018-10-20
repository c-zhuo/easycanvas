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

	module.exports = __webpack_require__(34);


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

	'use strict';

	// （多行）文本转图片
	// textRendering(String, {size: 30, width: 125, color: '#333'});
	// 返回图片（实际是<canvas>对象），包含.width/.height属性

	var cachePool = {};

	var textRendering = function textRendering(text, config) {
	    var cacheFlag = text + JSON.stringify(config);

	    if (cachePool[cacheFlag]) {
	        return cachePool[cacheFlag];
	    }

	    // var now = Date.now();

	    var padding;
	    if (config.padding) {
	        padding = config.padding.split(' ');
	        padding = padding.map(function (str) {
	            return parseInt(str);
	        });
	        padding[1] = Number(padding[1] || padding[0]);
	        padding[2] = Number(padding[2] || padding[0]);
	        padding[3] = Number(padding[3] || padding[1]);
	    } else {
	        padding = [0, 0, 0, 0];
	    }

	    var width = config.minWidth || config.width || (config.size || 16) * text.length + padding[1] + padding[3] + 100;
	    var height = (config.size || 16) * Math.round(text.length) / width * (config.lineHeight || config.size) + padding[0] + padding[2] + 100;
	    // console.warn(width, height);

	    var tempCanvas = document.createElement('canvas');
	    // document.body.appendChild(tempCanvas);
	    tempCanvas.width = width;
	    tempCanvas.height = height;
	    var tempCtx = tempCanvas.getContext('2d');

	    window.tempCanvas = tempCanvas;
	    window.tempCtx = tempCtx;

	    // 确保不支持hanging的手机也能用top
	    // 部分安卓和ios的textBaseline不同，巨坑，换成middle
	    // tempCtx.textBaseline = 'top';
	    // tempCtx.textBaseline = 'hanging';
	    tempCtx.textBaseline = 'middle';

	    tempCtx.font = config.size + 'px ' + (config.family || 'serif');
	    tempCtx.fillStyle = config.color || '#000';
	    tempCtx.textAlign = config.textAlign || 'left';

	    var drawX = 0;
	    var drawY = config.lineHeight ? (config.lineHeight - config.size) / 2 : 0;
	    // console.error(drawY);

	    var startIndex = 0;
	    var endIndex = 1;

	    // 下次写完文本后换行标记
	    var needNextLine = false;
	    // 用-来替换空格
	    var realWidth = 0;

	    while (true) {
	        var _width = tempCtx.measureText(text.slice(startIndex, endIndex)).width;

	        if (_width > config.width && text[endIndex] !== ' ') {
	            if (config.overflow === 'ellipsis') {
	                // 最后一个字换成三个点
	                endIndex -= 2;
	                tempCtx.fillText(text.slice(startIndex, endIndex) + '...', drawX, drawY + config.size / 2);
	                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 0);

	                realWidth = config.width - padding[1] - padding[3];
	                break;
	            } else {
	                // 换行
	                if (endIndex - startIndex <= 1) {
	                    console.error('Width not enough.');
	                    break;
	                }

	                endIndex -= 1;
	                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);

	                startIndex = endIndex;
	                // 第二行开始每行第一个字符如果是空格，则跳过
	                if (text[startIndex] === ' ') startIndex++;
	                endIndex = startIndex + 1;

	                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 10);
	            }
	        } else {
	            if (endIndex > text.length - 1) {
	                if (_width > realWidth) realWidth = _width;
	                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);
	                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 0);
	                break;
	            }

	            if (_width > realWidth) realWidth = _width;
	            endIndex++;
	        }
	    }
	    drawY += Math.floor(config.size * 0.1); // 部分文字会超出

	    // const firstValuable = (a, b) => {
	    //     return typeof a === 'undefined' ? b : a;
	    // },

	    var finalCanvas = document.createElement('canvas');
	    finalCanvas.width = Math.max(realWidth + padding[1] + padding[3], config.minWidth || 0);
	    finalCanvas.height = drawY + padding[0] + padding[2];
	    var finalCtx = finalCanvas.getContext('2d');

	    if (config.backgroundColor) {
	        finalCtx.fillStyle = config.backgroundColor;
	        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
	    }

	    // finalCtx.drawImage(tempCanvas, padding[3], padding[0]);
	    finalCtx.drawImage(tempCanvas, (finalCanvas.width - realWidth) / 2, padding[0]);
	    // document.body.prepend(finalCanvas);

	    if (config.border) {
	        var border = config.border.split(' ');
	        finalCtx.beginPath();
	        finalCtx.moveTo(0, 0);
	        finalCtx.lineWidth = parseInt(border[0]);
	        finalCtx.strokeStyle = border[2] || border[1];
	        finalCtx.lineTo(finalCanvas.width, 0);
	        finalCtx.lineTo(finalCanvas.width, finalCanvas.height);
	        finalCtx.lineTo(0, finalCanvas.height);
	        finalCtx.lineTo(0, 0);
	        finalCtx.stroke();
	    }

	    // console.warn(Date.now() - now);

	    // 这块内存不会释放，后面需要优化
	    cachePool[cacheFlag] = finalCanvas;

	    return finalCanvas;

	    // var image = new Image();
	    // image.src = finalCanvas.toDataURL();
	    // image.width = finalCanvas.width;
	    // image.height = finalCanvas.height;
	    // return image;
	};

	module.exports = textRendering;

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _button = __webpack_require__(35);

	var _button2 = _interopRequireDefault(_button);

	var _scroll = __webpack_require__(36);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _text = __webpack_require__(37);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		button: _button2.default,
		scroll: _scroll2.default,
		text: _text2.default
	};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Button
	                                                                                                                                                                                                                                                                   * - TODO: Toggle state.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _text2image = __webpack_require__(14);

	var _text2image2 = _interopRequireDefault(_text2image);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var inBrowser = typeof window !== 'undefined';

	var defaultStyle = {
	    padding: 0,
	    width: 300,
	    family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
	};

	var ec = void 0;

	var component = function component(opt) {
	    var $sprite = void 0;

	    var option = opt || {};
	    opt.props = opt.props || {};

	    var buttonStyleNormal = _extends(defaultStyle, {
	        minWidth: opt.style.tw,
	        lineHeight: opt.style.th,
	        padding: 0
	    }, opt.props.normal);
	    var buttonStyleHovered = _extends({}, buttonStyleNormal, opt.props.hovered);
	    var buttonStylePressed = _extends({}, buttonStyleNormal, opt.props.pressed);
	    // const buttonStyleToggled = Object.assign({}, buttonStyleNormal, opt.props.toggled);

	    var imageNormal = (0, _text2image2.default)(opt.props.text || '', buttonStyleNormal);
	    var imageHovered = opt.props.hovered && (0, _text2image2.default)(opt.props.text || '', buttonStyleHovered);
	    var imagePressed = opt.props.pressed && (0, _text2image2.default)(opt.props.text || '', buttonStylePressed);
	    // const imageToggled = text2image(opt.props.text || '', buttonStyleToggled);

	    var events = {};
	    opt.events = opt.events || {};
	    events.touchmove = events.mousemove = function () {
	        $sprite.content.img = imageHovered || imageNormal;
	    };
	    events.touchstart = events.mousedown = function () {
	        $sprite.content.img = imagePressed || imageHovered || imageNormal;
	    };
	    events.touchend = events.touchout = events.mouseout = function () {
	        $sprite.content.img = imageNormal;
	    };
	    events.mouseup = function () {
	        $sprite.content.img = imageHovered || imageNormal;
	    };
	    events.click = function (e) {
	        opt.events.click && opt.events.click.call($sprite, e);
	    };

	    $sprite = new ec.class.sprite({
	        name: opt.name || 'button',
	        content: {
	            img: imageNormal
	        },
	        style: opt.style,
	        props: opt.props,
	        events: events,
	        hooks: opt.hooks
	    });

	    // $sprite.on('ticked', () => {
	    //     if (ec.utils.funcOrValue($sprite.props.toggled, $sprite)) {
	    //         $sprite.content.img = imageToggled;
	    //     } else {
	    //         $sprite.content.img = imageNormal;
	    //     }
	    // });

	    return $sprite;
	};

	var init = function init(Easycanvas, namespace) {
	    ec = Easycanvas;
	    if (namespace) {
	        Easycanvas.class[namespace] = component;
	    }
	    return component;
	};

	if (inBrowser && window.Easycanvas) {
	    ec = Easycanvas;
	    Easycanvas.class.button = component;
	} else {
	    module.exports = init;
	}

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/** ********** *
	 *
	 * scroll
	 * - Event listeners
	 *
	 * ********** **/

	var inBrowser = typeof window !== 'undefined';
	var devicePixelRatio = window.devicePixelRatio || 1;

	var ec = void 0;
	var mutipleScrollLock = void 0;

	var scrollFuncs = {
	    loose: function loose($sprite) {
	        $sprite.$scroll.touching = false;
	    },

	    looper: function looper($sprite) {
	        if (!$sprite.$scroll || !$sprite.$scroll.$scrolling) return;

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

	        if (Math.abs($sprite.$scroll.speedX) <= 2 && Math.abs($sprite.$scroll.speedY) <= 2) {
	            $sprite.$scroll.$scrolling = false;
	            return;
	        }

	        if ($sprite.$scroll.touching) {
	            if (Date.now() - $sprite.$scroll.touching > 100) {
	                // 已经有100毫秒没有touchmove事件了，认为停止移动，清空速度
	                $sprite.$scroll.speedX *= 0.5;
	                $sprite.$scroll.speedY *= 0.5;
	            }
	            return;
	        }

	        $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
	        $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

	        if (!$sprite.$scroll.touching && Math.abs($sprite.$scroll.speedY) < 200 && $sprite.scroll.anchors && $sprite.scroll.anchors.length) {
	            var range = $sprite.scroll.anchorsRange || 400;
	            for (var i = 0; i < $sprite.scroll.anchors.length; i++) {
	                var m = $sprite.scroll.anchors[i];
	                var delta = $sprite.scroll.scrollY - m;
	                // if (delta < range && delta > range / 2 && $sprite.$scroll.speedY > 0) $sprite.$scroll.speedY *= 1.4;
	                // if (delta < range && delta > range / 2 && $sprite.$scroll.speedY > 0) $sprite.$scroll.speedY *= 1.4;
	                // if (delta < range / 2 && delta > 0 && $sprite.$scroll.speedY > 0) $sprite.$scroll.speedY *= 0.6;
	                // if (delta < range / 4 && delta > 0 && $sprite.$scroll.speedY > 0) $sprite.$scroll.speedY *= 0.4;
	                // if (delta > -range && delta < -range / 2 && $sprite.$scroll.speedY < 0) $sprite.$scroll.speedY *= 1.4;
	                // if (delta > -range / 2 && delta < 0 && $sprite.$scroll.speedY < 0) $sprite.$scroll.speedY *= 0.6;
	                // if (delta > -range / 4 && delta < 0 && $sprite.$scroll.speedY < 0) $sprite.$scroll.speedY *= 0.4;
	                if (delta > 0 && delta < range && $sprite.$scroll.speedY > 0 || delta < 0 && delta > -range && $sprite.$scroll.speedY < 0) {
	                    $sprite.trigger('scrollTo', m, 300);
	                    $sprite.$scroll.speedY = 0;
	                    break;
	                }
	            }
	        }

	        var minScrollX = ec.utils.funcOrValue($sprite.scroll.minScrollX, $sprite);
	        var maxScrollX = ec.utils.funcOrValue($sprite.scroll.maxScrollX, $sprite);
	        var minScrollY = ec.utils.funcOrValue($sprite.scroll.minScrollY, $sprite);
	        var maxScrollY = ec.utils.funcOrValue($sprite.scroll.maxScrollY, $sprite);

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
	    },

	    touch: function touch($sprite, $e) {
	        var now = Date.now();

	        if (!$sprite.$scroll.touching) {
	            // start scroll
	            $sprite.$scroll.touching = now;
	            $sprite.$scroll.quickTouch = now;

	            $sprite.$scroll.startPos.x = $e.canvasX;
	            $sprite.$scroll.startPos.y = $e.canvasY;

	            $sprite.$scroll.speedX = 0;
	            $sprite.$scroll.speedY = 0;
	        } else {
	            $sprite.$scroll.$scrolling = true;

	            var deltaX = $sprite.$scroll.startPos.x - $e.canvasX;
	            var deltaY = $sprite.$scroll.startPos.y - $e.canvasY;

	            var deltaTime = now - $sprite.$scroll.touching;
	            $sprite.$scroll.touching = now;

	            var minScrollX = ec.utils.funcOrValue($sprite.scroll.minScrollX, $sprite);
	            var maxScrollX = ec.utils.funcOrValue($sprite.scroll.maxScrollX, $sprite);
	            var minScrollY = ec.utils.funcOrValue($sprite.scroll.minScrollY, $sprite);
	            var maxScrollY = ec.utils.funcOrValue($sprite.scroll.maxScrollY, $sprite);

	            if ($sprite.scroll.scrollX + deltaX < minScrollX || $sprite.scroll.scrollX + deltaX > maxScrollX) {
	                if ($sprite.scroll.flexible || $sprite.scroll.flexibleX) deltaX >>= 3;else deltaX = 0;
	            }
	            if ($sprite.scroll.scrollY + deltaY < minScrollY || $sprite.scroll.scrollY + deltaY > maxScrollY) {
	                if ($sprite.scroll.flexible || $sprite.scroll.flexibleY) deltaY >>= 3;else deltaY = 0;
	            }

	            if (Math.abs(deltaX) >= 1 && deltaTime > 1) {
	                var newSpeedX = ($e.canvasX - $sprite.$scroll.startPos.x) * 9 / devicePixelRatio;
	                $sprite.$scroll.speedX = Math.abs(newSpeedX / 2) > Math.abs($sprite.$scroll.speedX) ? newSpeedX : $sprite.$scroll.speedX;
	                $sprite.scroll.scrollX += deltaX;
	            }
	            if (Math.abs(deltaY) >= 1 && deltaTime > 1) {
	                var newSpeedY = ($e.canvasY - $sprite.$scroll.startPos.y) * 9 / devicePixelRatio;
	                $sprite.$scroll.speedY = Math.abs(newSpeedY / 2) > Math.abs($sprite.$scroll.speedY) ? newSpeedY : $sprite.$scroll.speedY;
	                // $sprite.$scroll.speedY = newSpeedY;
	                $sprite.scroll.scrollY += deltaY;
	            }

	            // $sprite.$scroll.speedX = ($sprite.$scroll.speedX + ($e.canvasX - startPos.x) * 2) / 2;

	            // let curSpeed = ($e.canvasY - startPos.y) * 3;
	            // $sprite.$scroll.speedY = ($sprite.$scroll.speedY + curSpeed) / 2;

	            $sprite.$scroll.startPos.x = $e.canvasX;
	            $sprite.$scroll.startPos.y = $e.canvasY;

	            // $e.event.preventDefault();
	            if (Math.abs(deltaX) > Math.abs(deltaY) + 1) return 1;else if (Math.abs(deltaX) < Math.abs(deltaY) - 1) return 2;
	        }
	    },

	    wheel: function wheel($sprite, $e) {
	        $sprite.$scroll.speedX = ec.utils.funcOrValue($sprite.scroll.scrollableX, $sprite) ? $e.event.wheelDeltaX : 0;
	        $sprite.$scroll.speedY = ec.utils.funcOrValue($sprite.scroll.scrollableY, $sprite) ? $e.event.wheelDeltaY : 0;

	        $sprite.$scroll.$scrolling = true;

	        // $e.event.preventDefault();
	        $e.stopPropagation();
	    }
	};

	var component = function component(opt) {
	    var autoScroll = false;

	    var option = opt || {};

	    option.scroll = _extends({
	        scrollX: 0,
	        scrollY: 0,
	        scrollableX: function scrollableX() {
	            return (this.style.overflowX || this.style.overflow) !== 'hidden';
	        },
	        scrollableY: function scrollableY() {
	            return (this.style.overflowY || this.style.overflow) !== 'hidden';
	        },
	        minScrollX: 0,
	        maxScrollX: function maxScrollX() {
	            var _this = this;

	            var max = 0;
	            this.getChildren().forEach(function (child) {
	                var currentMax = child.getSelfStyle('tx') + child.getSelfStyle('tw') - _this.getStyle('tw');
	                if (currentMax > max) max = currentMax;
	            });
	            return max;
	        },
	        minScrollY: 0,
	        maxScrollY: function maxScrollY() {
	            var _this2 = this;

	            var max = 0;
	            this.getChildren().forEach(function (child) {
	                var currentMax = child.getSelfStyle('ty') + child.getSelfStyle('th') - _this2.getStyle('th');
	                if (currentMax > max) max = currentMax;
	            });
	            return max;
	        },
	        propagationX: false,
	        propagationY: false
	    }, opt.scroll);

	    var autoScrollFunc = function autoScrollFunc() {
	        if (autoScroll) {
	            $sprite.scroll.scrollY = autoScroll();
	        } else {
	            $sprite.off('ticked', autoScrollFunc);
	        }
	    };

	    // let handling = true;
	    // const handleToggle = () => {
	    //     handling = !handling;
	    // };

	    var started = false;

	    option.events = _extends({
	        touchstart: function touchstart($e) {
	            // 先结束，防止之前拖动时拖到外面，导致没触发loose
	            scrollFuncs.loose(this);

	            started = true;
	            mutipleScrollLock = false;

	            scrollFuncs.touch(this, $e);

	            // scroll外面还有一个scroll的时候，让事件传递出去
	            if (!$sprite.scroll.propagationX && !$sprite.scroll.propagationY) {
	                $e.stopPropagation();
	            }
	        },
	        touchmove: function touchmove($e) {
	            if (!started) return;

	            if (mutipleScrollLock && this !== mutipleScrollLock) {
	                // console.log('rejected!', mutipleScrollLock);
	                return;
	            }

	            var moveDirect = scrollFuncs.touch(this, $e);
	            if (moveDirect === 1 && $sprite.scroll.propagationY) {
	                $e.stopPropagation();
	                mutipleScrollLock = this;
	                // console.log('locked', mutipleScrollLock);
	            } else if (moveDirect === 2 && $sprite.scroll.propagationX) {
	                $e.stopPropagation();
	                mutipleScrollLock = this;
	                // console.log('locked', mutipleScrollLock);
	            }
	        },
	        mousewheel: function mousewheel($e) {
	            started = true;

	            scrollFuncs.wheel(this, $e);
	            $e.stopPropagation();
	        },
	        touchend: function touchend() {
	            started = false;
	            scrollFuncs.loose(this);
	        },
	        mouseup: function mouseup() {
	            started = false;
	            scrollFuncs.loose(this);
	        }
	    }, option.events || {});

	    if (option.scroll.capture) {
	        option.events.interceptor = function ($e) {
	            if ($sprite.events[$e.type]) {
	                $sprite.events[$e.type].call($sprite, $e);
	                return false;
	            }
	            return $e;
	        };
	    }

	    var $sprite = new ec.class.sprite(option);

	    $sprite.on('ticked', function () {
	        scrollFuncs.looper($sprite);
	    });

	    // $sprite.on('handleToggle', handleToggle);

	    $sprite.on('scrollTo', function (position, duration, callback) {
	        autoScroll = ec.transition.pendulum($sprite.scroll.scrollY, position, (duration || 200) * 2, {
	            cycle: 0.5
	        }).then(function () {
	            autoScroll = false;

	            callback && callback();
	        });

	        $sprite.on('ticked', autoScrollFunc);
	    });

	    $sprite.$scroll = {
	        speedX: 0,
	        speedY: 0,
	        touching: false,
	        startPos: {}
	    };

	    var $scrollingElement = $sprite.add({
	        name: 'scrolling-element',
	        style: {
	            tx: function tx() {
	                return -this.$parent.scroll.scrollX;
	            },
	            ty: function ty() {
	                return -this.$parent.scroll.scrollY;
	            }
	        }
	    });

	    $sprite.add = $scrollingElement.add.bind($scrollingElement);
	    $sprite.clear = $scrollingElement.clear.bind($scrollingElement);
	    $sprite.getChildren = function () {
	        return $scrollingElement.children;
	    };

	    return $sprite;
	};

	var init = function init(Easycanvas, namespace) {
	    ec = Easycanvas;
	    if (namespace) {
	        Easycanvas.class[namespace] = component;
	    }

	    return component;
	};

	if (inBrowser && window.Easycanvas) {
	    ec = Easycanvas;
	    Easycanvas.class.scroll = component;
	} else {
	    module.exports = init;
	}

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Text
	                                                                                                                                                                                                                                                                   * - TODO.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _text2image = __webpack_require__(14);

	var _text2image2 = _interopRequireDefault(_text2image);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var inBrowser = typeof window !== 'undefined';

	var defaultStyle = {
	    padding: 0,
	    width: 300,
	    lineHeight: 100,
	    height: 100,
	    family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
	};

	var ec = void 0;

	var component = function component(opt) {
	    var $sprite = void 0;

	    var option = opt || {};

	    $sprite = new ec.class.sprite({
	        name: opt.name || 'text',
	        content: {
	            img: (0, _text2image2.default)(opt.content.text, _extends({}, defaultStyle, {
	                lineHeight: opt.props.size
	            }, opt.props))
	        },
	        style: opt.style,
	        events: opt.events,
	        hooks: opt.hooks
	    });

	    return $sprite;
	};

	var init = function init(Easycanvas, namespace) {
	    ec = Easycanvas;
	    if (namespace) {
	        Easycanvas.class[namespace] = component;
	    }
	    return component;
	};

	if (inBrowser && window.Easycanvas) {
	    ec = Easycanvas;
	    Easycanvas.class.text = component;
	} else {
	    module.exports = init;
	}

/***/ })

/******/ })
});
;