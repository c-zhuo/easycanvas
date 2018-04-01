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

	module.exports = __webpack_require__(46);


/***/ }),

/***/ 46:
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