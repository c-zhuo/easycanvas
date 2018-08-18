<<<<<<< HEAD
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var s=r[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}({0:function(t,e,r){t.exports=r(75)},75:function(t,e){"use strict";var r=void 0,n=function(t){var e=new r.class.sprite(t);e.style=t.style,e.content.img=t.number,e.style.sx=0,e.style.sw=e.style.sw||t.number.width,e.style.sh=Math.floor(e.style.sh||t.number.height/10);var n=0,s={tick:Math.floor((t.interval||1e3)/16.6),heightRate:1,numberHeight:e.style.sh,current:0,stop:!1};return e.set=function(t){for(var e in t)s[e]=t[e]},e.getCurrentValue=function(){return s.current},e.setCurrentValue=function(t){s.current=t,e.style.sy=s.current*s.heightRate*s.numberHeight},e.scrollToValue=function(t,n){s.current=t,e.style.sy=r.transition.linear(e.getStyle("sy"),s.current*s.heightRate*s.numberHeight,n||200)},e.stop=function(){s.stop=!0},e.restart=function(){s.stop=!1,s.current=0,e.style.sy=0,n=0},e.hooks={ticked:function(){s.stop||++n<=s.tick||(n=1,s.current++,e.style.sy=s.current*s.heightRate*s.numberHeight,s.current>9&&(e.style.sy=0,s.current=0))}},e};window&&window.Easycanvas&&(r=window.Easycanvas,r.class.number=n),t.exports=function(t){r=t,t.class.number=n}}})});
=======
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

	module.exports = __webpack_require__(75);


/***/ }),

/***/ 75:
/***/ (function(module, exports) {

	'use strict';

	var _ec = void 0;

	var number = function number(opt) {
	    var sprite = new _ec.class.sprite(opt);

	    sprite.style = opt.style;
	    sprite.content.img = opt.number;

	    sprite.style.sx = 0;
	    sprite.style.sw = sprite.style.sw || opt.number.width;
	    sprite.style.sh = Math.floor(sprite.style.sh || opt.number.height / 10);

	    var tick = 0;

	    var data = {
	        tick: Math.floor((opt.interval || 1000) / 16.6),
	        heightRate: 1,
	        numberHeight: sprite.style.sh,
	        current: 0,
	        stop: false
	    };

	    sprite.set = function (keys) {
	        for (var i in keys) {
	            data[i] = keys[i];
	        }
	    };

	    sprite.getCurrentValue = function () {
	        return data.current;
	    };

	    sprite.setCurrentValue = function (value) {
	        data.current = value;
	        sprite.style.sy = data.current * data.heightRate * data.numberHeight;
	    };

	    sprite.scrollToValue = function (value, time) {
	        data.current = value;
	        sprite.style.sy = _ec.transition.linear(sprite.getStyle('sy'), data.current * data.heightRate * data.numberHeight, time || 200);
	    };

	    sprite.stop = function () {
	        data.stop = true;
	    };

	    sprite.restart = function () {
	        data.stop = false;
	        data.current = 0;
	        sprite.style.sy = 0;
	        tick = 0;
	    };

	    sprite.hooks = {
	        ticked: function ticked() {
	            if (data.stop || ++tick <= data.tick) return;
	            tick = 1;
	            data.current++;

	            sprite.style.sy = data.current * data.heightRate * data.numberHeight;
	            if (data.current > 9) {
	                sprite.style.sy = 0;
	                data.current = 0;
	            }
	        }
	    };

	    return sprite;
	};

	if (window && window.Easycanvas) {
	    _ec = window.Easycanvas;
	    _ec.class.number = number;
	}

	module.exports = function (ec) {
	    _ec = ec;
	    ec.class.number = number;
	};

/***/ })

/******/ })
});
;
>>>>>>> 44f9f938734159d0f29ab3a3aa631e48dcfabf92
