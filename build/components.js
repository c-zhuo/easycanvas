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
	var nextLine = '\n'.slice(0, 1);

	var textRendering = function textRendering(_text, config) {
	    var text = String(_text);
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
	    var minLines = text.split('\n').length;
	    var height = (config.size || 16) * (Math.round(text.length) / width + minLines - 1) * (config.lineHeight || config.size) + padding[0] + padding[2] + 100;
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
	    tempCtx.font = (config.style ? config.style + ' ' : '') + config.size + 'px ' + (config.family || 'serif');
	    tempCtx.fillStyle = config.color || '#000';
	    tempCtx.textAlign = config.textAlign || 'left';

	    if (process.env.NODE_ENV !== 'production') {
	        var context = [];
	        context.push('var tempCanvas = document.createElement(\'canvas\')');
	        context.push('tempCanvas.width=' + tempCanvas.width);
	        context.push('tempCanvas.height=' + tempCanvas.height);
	        context.push('var tempCtx = tempCanvas.getContext(\'2d\')');
	        context.push("tempCtx.textBaseline='" + tempCtx.textBaseline + "'");
	        context.push("tempCtx.font='" + tempCtx.font + "'");
	        context.push("tempCtx.fillStyle='" + tempCtx.fillStyle + "'");
	        context.push("tempCtx.textAlign='" + tempCtx.textAlign + "'");
	    }

	    var drawX = 0;
	    var drawY = config.lineHeight ? (config.lineHeight - config.size) / 2 : 0;

	    var startIndex = 0;
	    var endIndex = 1;

	    // 下次写完文本后换行标记
	    var needNextLine = false;
	    // 用-来替换空格
	    var realWidth = 0;

	    while (true) {
	        var _width = tempCtx.measureText(text.slice(startIndex, endIndex)).width;

	        if (_width > config.width) {
	            if (config.overflow === 'ellipsis') {
	                // 最后一个字换成三个点
	                endIndex -= 2;
	                tempCtx.fillText(text.slice(startIndex, endIndex) + '...', drawX, drawY + config.size / 2);
	                if (process.env.NODE_ENV !== 'production') {
	                    context.push('tempCtx.fillText(\'' + text.slice(startIndex, endIndex) + '...\', ' + drawX + ', ' + (drawY + config.size / 2) + ')');
	                }

	                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 0);

	                realWidth = config.width - padding[1] - padding[3];
	                break;
	            } else {
	                // 换行
	                endIndex -= 1;
	                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);
	                if (process.env.NODE_ENV !== 'production') {
	                    context.push('tempCtx.fillText(\'' + text.slice(startIndex, endIndex) + '\', ' + drawX + ', ' + (drawY + config.size / 2) + ')');
	                }

	                startIndex = endIndex;
	                endIndex = startIndex + 1;
	                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 10);
	            }
	        } else {
	            if (endIndex > text.length - 1) {
	                if (_width > realWidth) realWidth = _width;
	                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);
	                if (process.env.NODE_ENV !== 'production') {
	                    context.push('tempCtx.fillText(\'' + text.slice(startIndex, endIndex) + '\', ' + drawX + ', ' + (drawY + config.size / 2) + ')');
	                }
	                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 0);
	                break;
	            } else if (text.slice(endIndex, endIndex + 1) === nextLine) {
	                // 换行
	                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);
	                endIndex += 1;

	                startIndex = endIndex;
	                endIndex = startIndex + 1;
	                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 10);
	            }

	            if (_width > realWidth) realWidth = _width;
	            endIndex++;
	        }
	    }

	    // const firstValuable = (a, b) => {
	    //     return typeof a === 'undefined' ? b : a;
	    // },

	    var finalCanvas = document.createElement('canvas');
	    finalCanvas.width = Math.max(realWidth + padding[1] + padding[3], config.minWidth || 0);
	    finalCanvas.height = drawY + padding[0] + padding[2];
	    var finalCtx = finalCanvas.getContext('2d');

	    if (process.env.NODE_ENV !== 'production') {
	        context.push('var finalCanvas=document.createElement(\'canvas\')');
	        context.push('finalCanvas.width=' + finalCanvas.width);
	        context.push('finalCanvas.height=' + finalCanvas.height);
	        context.push('var finalCtx = finalCanvas.getContext(\'2d\')');
	    }

	    if (config.backgroundColor) {
	        finalCtx.fillStyle = config.backgroundColor;
	        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

	        if (process.env.NODE_ENV !== 'production') {
	            context.push('finalCtx.fillStyle=' + finalCtx.fillStyle);
	            context.push('finalCtx.fillRect(0, 0, ' + finalCanvas.width + ', ' + finalCanvas.height + ')');
	        }
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

	        // TODO
	        // if (process.env.NODE_ENV !== 'production') {
	        //     context.push(`finalCtx.fillStyle=${finalCtx.fillStyle}`);
	        //     context.push(`finalCtx.fillRect(0, 0, ${finalCanvas.width}, ${finalCanvas.height})`);
	        // }
	    }

	    // console.warn(Date.now() - now);

	    if (process.env.NODE_ENV !== 'production') {
	        finalCanvas.$origin = context;
	    }

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

	var _text = __webpack_require__(38);

	var _text2 = _interopRequireDefault(_text);

	var _button = __webpack_require__(35);

	var _button2 = _interopRequireDefault(_button);

	var _scroll = __webpack_require__(36);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _sequence = __webpack_require__(37);

	var _sequence2 = _interopRequireDefault(_sequence);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		button: _button2.default,
		scroll: _scroll2.default,
		text: _text2.default,
		sequence: _sequence2.default
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

	var setStyle = function setStyle(buttonStyle, config) {
	    buttonStyle.buttonStyleNormal = _extends(defaultStyle, {
	        minWidth: config.style.tw,
	        lineHeight: config.style.th,
	        padding: 0
	    }, config.props.normal);
	    buttonStyle.buttonStyleHovered = _extends({}, buttonStyle.buttonStyleNormal, config.props.hovered);
	    buttonStyle.buttonStylePressed = _extends({}, buttonStyle.buttonStyleNormal, config.props.pressed);
	    // const buttonStyleToggled = Object.assign({}, buttonStyleNormal, opt.props.toggled);

	    buttonStyle.imageNormal = (0, _text2image2.default)(config.props.text || '', buttonStyle.buttonStyleNormal);
	    buttonStyle.imageHovered = config.props.hovered && (0, _text2image2.default)(config.props.text || '', buttonStyle.buttonStyleHovered);
	    buttonStyle.imagePressed = config.props.pressed && (0, _text2image2.default)(config.props.text || '', buttonStyle.buttonStylePressed);
	    // const imageToggled = text2image(opt.props.text || '', buttonStyleToggled);
	};

	var component = function component(opt) {
	    var $sprite = void 0;

	    var option = opt || {};
	    opt.props = opt.props || {};

	    var buttonStyle = {
	        buttonStyleNormal: undefined,
	        buttonStyleHovered: undefined,
	        buttonStylePressed: undefined,
	        imageNormal: undefined,
	        imageHovered: undefined,
	        imagePressed: undefined
	    };

	    setStyle(buttonStyle, opt);

	    var events = {};
	    opt.events = opt.events || {};
	    events.touchmove = events.mousemove = function () {
	        $sprite.content.img = buttonStyle.imageHovered || buttonStyle.imageNormal;
	    };
	    events.touchstart = events.mousedown = function () {
	        $sprite.content.img = buttonStyle.imagePressed || buttonStyle.imageHovered || buttonStyle.imageNormal;
	    };
	    events.touchend = events.touchout = events.mouseout = function () {
	        $sprite.content.img = buttonStyle.imageNormal;
	    };
	    events.mouseup = function () {
	        $sprite.content.img = buttonStyle.imageHovered || buttonStyle.imageNormal;
	    };
	    events.click = function (e) {
	        opt.events.click && opt.events.click.call($sprite, e);
	    };

	    $sprite = new ec.class.sprite({
	        name: opt.name || 'button_' + opt.props.text,
	        content: {
	            img: buttonStyle.imageNormal
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

	    $sprite.update = function (obj) {
	        this.__proto__.update.call(this, obj);
	        setStyle(buttonStyle, opt);
	        $sprite.content.img = buttonStyle.imageNormal;
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

	var ec = void 0;
	var mutipleScrollLock = void 0;

	// $sprite.$scroll.$wheeling用于在Chrome移动端下适配双指滑动的wheel事件

	var absMin = function absMin(a, b) {
	    return Math.abs(a) < Math.abs(b) ? a : b;
	};

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

	        if (Math.abs($sprite.$scroll.speedX) <= 1 && Math.abs($sprite.$scroll.speedY) <= 1) {
	            $sprite.$scroll.$scrolling = false;
	            $sprite.$scroll.$wheeling = false;
	            return;
	        }

	        if ($sprite.$scroll.touching) {
	            // 已经有100毫秒没有touchmove事件了，认为停止移动，清空速度
	            // $sprite.$scroll.speedX *= 0.8;
	            // $sprite.$scroll.speedY *= 0.8;
	            return;
	        }

	        $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
	        $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

	        if (!$sprite.$scroll.touching && !$sprite.$scroll.$wheeling && Math.abs($sprite.$scroll.speedY) < 50 && $sprite.scroll.anchors && $sprite.scroll.anchors.length) {
	            var range = $sprite.scroll.anchorsRange || 400;
	            for (var i = 0; i < $sprite.scroll.anchors.length; i++) {
	                var m = $sprite.scroll.anchors[i];
	                var delta = $sprite.scroll.scrollY - m;
	                if (delta > 0 && delta < range && $sprite.$scroll.speedY > 0 || delta < 0 && delta > -range && $sprite.$scroll.speedY < 0) {
	                    $sprite.trigger('scrollTo', m, 200);
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

	        $sprite.$scroll.$wheeling = false;

	        if (!$sprite.$scroll.touching) {
	            // start scroll
	            $sprite.$scroll.touching = now;
	            $sprite.$scroll.quickTouch = now;
	            $sprite.$scroll.lastTouchSpeed = 0;

	            $sprite.$scroll.startPos.x = $e.canvasX;
	            $sprite.$scroll.startPos.y = $e.canvasY;

	            $sprite.$scroll.lastScrollSpeed = $sprite.$scroll.speedX || $sprite.$scroll.speedY;
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

	            if (ec.utils.funcOrValue($sprite.scroll.scrollableX, $sprite) && Math.abs(deltaX) >= 1 && deltaTime > 1) {
	                var newSpeedX = ($e.canvasX - $sprite.$scroll.startPos.x) / deltaTime * 25;

	                if ($sprite.$scroll.lastScrollSpeed * newSpeedX > 0 && Math.abs(newSpeedX) > 15) {
	                    // 连续同向滚动，速度增加
	                    newSpeedX += absMin(newSpeedX, $sprite.$scroll.lastScrollSpeed);
	                }

	                $sprite.$scroll.speedX = ($sprite.$scroll.lastTouchSpeed + newSpeedX) / ($sprite.$scroll.lastTouchSpeed ? 2 : 1);

	                $sprite.$scroll.lastTouchSpeed = newSpeedX;
	                $sprite.scroll.scrollX += deltaX;
	            }
	            if (ec.utils.funcOrValue($sprite.scroll.scrollableY, $sprite) && Math.abs(deltaY) >= 1 && deltaTime > 1) {
	                var newSpeedY = ($e.canvasY - $sprite.$scroll.startPos.y) / deltaTime * 25;

	                if ($sprite.$scroll.lastScrollSpeed * newSpeedY > 0 && Math.abs(newSpeedY) > 15) {
	                    // 连续同向滚动，速度增加
	                    newSpeedY += absMin(newSpeedY, $sprite.$scroll.lastScrollSpeed);
	                }

	                $sprite.$scroll.speedY = ($sprite.$scroll.lastTouchSpeed + newSpeedY) / ($sprite.$scroll.lastTouchSpeed ? 2 : 1);

	                $sprite.$scroll.lastTouchSpeed = newSpeedY;
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
	        $sprite.$scroll.$wheeling = true;

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
	            return (this.style.overflowX || this.style.overflow) !== 'visible';
	        },
	        scrollableY: function scrollableY() {
	            return (this.style.overflowY || this.style.overflow) !== 'visible';
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
	            // console.log($e.canvasX)

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
	        startPos: {},
	        lastTouchSpeed: 0, // 记录用户上一次touch产生的速度，用于平滑的速度计算
	        lastScrollSpeed: 0 // 记录用户上一次touch最终的速度，判断连续相同方向scroll时速度叠加
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
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Sequence Sprite Animation
	 *
	 * ********** **/

	var inBrowser = typeof window !== 'undefined';

	var ec = void 0;

	var component = function component(opt) {
	    var $sprite = new ec.class.sprite(opt);

	    opt.props.index = opt.props.index || 0;

	    $sprite.on('beforeTick', function () {
	        var _props = this.props;
	        var img = ec.utils.funcOrValue(this.content.img, this);

	        if (!img || !img.width) return;

	        // 确立index
	        var index = _props.index || 0;
	        if (index < 0) index = 0;

	        // 计算每帧的宽高
	        var pw = void 0,
	            ph = void 0;
	        if (_props.frameWidth || _props.frameHeight) {
	            if (_props.frameWidth < 0) {
	                pw = img.width / -_props.frameWidth;
	            } else {
	                pw = _props.frameWidth;
	            }
	            if (_props.frameHeight < 0) {
	                ph = img.height / -_props.frameHeight;
	            } else {
	                ph = _props.frameHeight;
	            }

	            var wTimes = Math.floor(img.width / pw);
	            var hTimes = Math.floor(img.height / ph);

	            this.style.sx = index % wTimes * pw;
	            this.style.sy = Math.floor(index / wTimes) % hTimes * ph;
	        }

	        // 不循环的精灵动画自动移除
	        if (!_props.loop && index > 0 && this.style.sx === 0 && this.style.sy === 0) {
	            this.style.img = undefined;
	            if (_props.onOver) {
	                _props.onOver.call(this);
	            } else {
	                this.remove();
	            }
	        }

	        // 判断是否应该下一帧
	        _props.lastFrameTime = _props.lastFrameTime || 0;
	        if (this.$canvas.$nextTickTime - _props.lastFrameTime >= ec.utils.funcOrValue(_props.interval, this)) {
	            _props.lastFrameTime = this.$canvas.$nextTickTime;
	            _props.index++;
	        }

	        // 默认的读取和绘制尺寸等于每帧尺寸
	        this.style.sw = this.style.sw || pw;
	        this.style.sh = this.style.sh || ph;
	        this.style.tw = this.style.tw || pw;
	        this.style.th = this.style.th || ph;
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
	    Easycanvas.class.sequence = component;
	} else {
	    module.exports = init;
	}

/***/ }),

/***/ 38:
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
	    family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
	};

	var ec = void 0;

	var setImage = function setImage($sprite) {
	    $sprite.content.img = $sprite.props ? (0, _text2image2.default)($sprite.props.text, _extends({}, defaultStyle, {
	        lineHeight: $sprite.props.size
	    }, $sprite.props)) : undefined;
	};

	var component = function component(config) {
	    var $sprite = void 0;

	    $sprite = new ec.class.sprite(config);

	    setImage($sprite);

	    $sprite.update = function (obj) {
	        this.__proto__.update.call(this, obj);
	        setImage(this);
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
	    Easycanvas.class.text = component;
	} else {
	    module.exports = init;
	}

/***/ })

/******/ })
});
;