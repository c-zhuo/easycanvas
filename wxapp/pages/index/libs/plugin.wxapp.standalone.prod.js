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

	module.exports = __webpack_require__(89);


/***/ }),

/***/ 89:
/***/ (function(module, exports) {

	'use strict';

	var cache = {};
	var imgLoader = function imgLoader(str, callback) {
	    if (cache[str]) return cache[str];

	    var obj = {
	        width: 0,
	        height: 0
	    };

	    cache[str] = obj;

	    wx.getImageInfo({
	        src: str,
	        success: function success(data) {
	            console.log(data);
	            obj.width = data.width;
	            obj.height = data.height;
	            obj.url = data.path;
	            if (callback) callback(obj);
	        }
	    });

	    return obj;
	};

	var onUse = function onUse(Easycanvas) {
	    Easycanvas.imgLoader = imgLoader;
	};

	var onRender = function onRender($sprite, settings) {
	    if ($sprite.props[0]) {
	        $sprite.props[0] = $sprite.props[0].url;
	    }
	};

	var lastX, lastY;
	var clickAfterTouchend = false;

	var handle = function handle(e) {
	    // console.log(e);
	    lastX = e.touches[0] ? e.touches[0].x : lastX;
	    lastY = e.touches[0] ? e.touches[0].y : lastY;

	    var obj = {
	        type: e.type,
	        targetTouches: [{
	            pageX: lastX,
	            pageY: lastY
	        }],
	        currentTarget: {
	            offsetLeft: 0,
	            offsetTop: 0
	        },
	        preventDefault: function preventDefault() {}
	    };

	    clickAfterTouchend = e.type !== 'touchmove' && e.type !== 'longtap';
	    this.$eventHandler(obj);

	    if (e.type === 'touchend') {
	        var obj = {
	            type: 'click',
	            targetTouches: [{
	                pageX: lastX,
	                pageY: lastY
	            }],
	            currentTarget: {
	                offsetLeft: 0,
	                offsetTop: 0
	            },
	            preventDefault: function preventDefault() {
	                clickAfterTouchend = false;
	            }
	        };
	        this.$eventHandler(obj);
	    }
	};

	var onCreate = function onCreate() {
	    this.imgLoader = imgLoader;
	    this.handle = handle;
	};

	module.exports = {
	    onUse: onUse,
	    onRender: onRender,
	    onCreate: onCreate
	};

/***/ })

/******/ })
});
;