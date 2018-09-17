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

	module.exports = __webpack_require__(30);


/***/ }),

/***/ 30:
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

	        if ($sprite.$scroll.touching) return;

	        $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
	        $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

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
	        if (!$sprite.scroll.scrollable) return false;

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

	            if ($sprite.scroll.scrollX + deltaX < $sprite.scroll.minScrollX || $sprite.scroll.scrollX + deltaX > $sprite.scroll.maxScrollX) {
	                if ($sprite.scroll.flexibleX) deltaX >>= 3;else deltaX = 0;
	            }
	            if ($sprite.scroll.scrollY + deltaY < $sprite.scroll.minScrollY || $sprite.scroll.scrollY + deltaY > $sprite.scroll.maxScrollY) {
	                if ($sprite.scroll.flexibleY) deltaY >>= 3;else deltaY = 0;
	            }

	            if (Math.abs(deltaX) >= 1 && deltaTime > 1) {
	                $sprite.$scroll.speedX = ($e.canvasX - $sprite.$scroll.startPos.x) * 4;
	                $sprite.scroll.scrollX += deltaX;
	            }
	            if (Math.abs(deltaY) >= 1 && deltaTime > 1) {
	                $sprite.$scroll.speedY = ($e.canvasY - $sprite.$scroll.startPos.y) * 4;
	                $sprite.scroll.scrollY += deltaY;
	            }

	            // $sprite.$scroll.speedX = ($sprite.$scroll.speedX + ($e.canvasX - startPos.x) * 2) / 2;

	            // let curSpeed = ($e.canvasY - startPos.y) * 3;
	            // $sprite.$scroll.speedY = ($sprite.$scroll.speedY + curSpeed) / 2;

	            $sprite.$scroll.startPos.x = $e.canvasX;
	            $sprite.$scroll.startPos.y = $e.canvasY;

	            // $e.event.preventDefault();
	            $e.stopPropagation();
	        }
	    },

	    wheel: function wheel($sprite, $e) {
	        if (!$sprite.scroll.scrollable) return false;

	        $sprite.$scroll.$scrolling = true;

	        $sprite.$scroll.speedX = $e.event.wheelDeltaX;
	        $sprite.$scroll.speedY = $e.event.wheelDeltaY;

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
	        scrollable: true,
	        minScrollX: 0,
	        maxScrollX: 0,
	        minScrollY: 0,
	        maxScrollY: 0
	    }, opt.scroll);

	    var autoScrollFunc = function autoScrollFunc() {
	        if (autoScroll) {
	            $sprite.scroll.scrollY = autoScroll();
	        }
	    };

	    var handling = true;
	    var handleToggle = function handleToggle() {
	        handling = !handling;
	    };

	    option.events = _extends({
	        interceptor: function interceptor($e) {
	            if (!handling) {
	                return $e;
	            }

	            if ($e.type === 'touchmove') {
	                scrollFuncs.touch(this, $e);
	                $e.$stopPropagation = true;
	            } else if ($e.type === 'mousewheel') {
	                scrollFuncs.wheel(this, $e);
	            } else if ($e.type === 'touchend' || $e.type === 'mouseup') {
	                scrollFuncs.loose(this);
	            } else if ($e.type === 'hold') {
	                $e.$stopPropagation = true;
	            }

	            if (autoScroll) {
	                $sprite.off('ticked', autoScrollFunc);
	                autoScroll = false;
	            }
	            return $e;
	        }
	    }, option.events || {});

	    var $sprite = new ec.class.sprite(option);

	    $sprite.on('ticked', function () {
	        scrollFuncs.looper($sprite);
	    });

	    $sprite.on('handleToggle', handleToggle);

	    $sprite.on('scrollTo', function (position, duration) {
	        autoScroll = ec.transition.pendulum($sprite.scroll.scrollY, position, (duration || 200) * 2, {
	            cycle: 0.5
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

/***/ })

/******/ })
});
;