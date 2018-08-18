<<<<<<< HEAD
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var s=e();for(var o in s)("object"==typeof exports?exports:t)[o]=s[o]}}(this,function(){return function(t){function e(o){if(s[o])return s[o].exports;var n=s[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var s={};return e.m=t,e.c=s,e.p="",e(0)}({0:function(t,e,s){t.exports=s(76)},76:function(t,e){"use strict";var s=void 0,o=function(t){var e=t.img,s=t.dx,o=void 0===s?.5:s,n=new Easycanvas.class.sprite(t);n.dx=o;var a=t.style.tw,c=t.style.th,i=t.style.sw,r=0,l=new Easycanvas.class.sprite({content:{img:e},style:{locate:"left",sw:a,th:c}}),y=new Easycanvas.class.sprite({content:{img:e},style:{locate:"left",sw:a,th:c,sx:-a,opacity:0}});n.add(l),n.add(y);var f=function(){r>i&&(r=-i),r>=0?(y.style.sx=-i+r+1,r<i-a?y.style.opacity=0:(l.style.sw=i-r>=0&&i-r<=5?0:i-r,y.style.opacity=1,y.style.sw=a-l.style.sw)):r>=-i&&(y.style.sx=i+r-1,r<-a?l.style.opacity=0:(l.style.opacity=1,l.style.sw=a+r,y.style.sw=-r)),l.style.sx=r,r+=n.dx};return n.start=function(){n.on("ticked",f)},n.stop=function(){n.off("ticked",f)},n.changeSpeed=function(t){o=t},n};window&&window.Easycanvas&&(s=window.Easycanvas,s.class.panorama=o),t.exports=function(t){s=t,t.class.panorama=o}}})});
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

	module.exports = __webpack_require__(76);


/***/ }),

/***/ 76:
/***/ (function(module, exports) {

	'use strict';

	var _ec = void 0;

	var panorama = function panorama(opt) {
	    var $Painter = opt.painter;
	    // dx 每帧移动距离
	    var img = opt.img,
	        _opt$dx = opt.dx,
	        dx = _opt$dx === undefined ? 0.5 : _opt$dx;


	    var sprite = new Easycanvas.class.sprite(opt);
	    sprite.dx = dx;

	    var xSize = opt.style.tw;
	    var ySize = opt.style.th;
	    var imgW = opt.style.sw;
	    var imgH = opt.style.sh;

	    var x = 0;

	    var img1 = new Easycanvas.class.sprite({
	        content: {
	            img: img
	        },
	        style: {
	            locate: 'left',
	            sw: xSize,
	            th: ySize
	        }
	    });
	    var img2 = new Easycanvas.class.sprite({
	        content: {
	            img: img
	        },
	        style: {
	            locate: 'left',
	            sw: xSize,
	            th: ySize,
	            sx: -xSize,
	            opacity: 0
	        }
	    });
	    sprite.add(img1);
	    sprite.add(img2);
	    var draw = function draw() {
	        if (x > imgW) {
	            x = -imgW;
	        }
	        if (x >= 0) {
	            img2.style.sx = -imgW + x + 1;
	            if (x < imgW - xSize) {
	                img2.style.opacity = 0;
	            } else {
	                if (imgW - x >= 0 && imgW - x <= 5) {
	                    img1.style.sw = 0;
	                } else {
	                    img1.style.sw = imgW - x;
	                }
	                img2.style.opacity = 1;
	                img2.style.sw = xSize - img1.style.sw;
	            }
	        } else if (x >= -imgW) {
	            img2.style.sx = imgW + x - 1;
	            if (x < -xSize) {
	                img1.style.opacity = 0;
	            } else {
	                img1.style.opacity = 1;
	                img1.style.sw = xSize + x;
	                img2.style.sw = -x;
	            }
	        }
	        img1.style.sx = x;
	        x += sprite.dx;
	    };

	    sprite.start = function () {
	        sprite.on('ticked', draw);
	    };
	    sprite.stop = function () {
	        sprite.off('ticked', draw);
	    };
	    sprite.changeSpeed = function (newDx) {
	        dx = newDx;
	    };

	    return sprite;
	};

	if (window && window.Easycanvas) {
	    _ec = window.Easycanvas;
	    _ec.class.panorama = panorama;
	}

	module.exports = function (ec) {
	    _ec = ec;
	    ec.class.panorama = panorama;
	};

/***/ })

/******/ })
});
;
>>>>>>> 44f9f938734159d0f29ab3a3aa631e48dcfabf92
