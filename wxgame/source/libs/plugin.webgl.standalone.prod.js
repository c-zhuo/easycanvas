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

	module.exports = __webpack_require__(86);


/***/ }),

/***/ 1:
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

/***/ 2:
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

/***/ 4:
/***/ (function(module, exports) {

	'use strict';

	var arrayRepeat = function arrayRepeat(arr, n) {
	    var oldLength = arr.length;
	    var newArray = new Array(Math.round(oldLength * n));

	    for (var i = 0, l = newArray.length; i < l; i++) {
	        newArray[i] = arr[i % oldLength];
	    }

	    return newArray;
	};

	var degToRad = function degToRad(d) {
	    return d * Math.PI / 180;
	};

	var default0s = ['rx', 'ry', 'rz'];
	var default1s = ['scale', 'scaleX', 'scaleY', 'scaleZ'];
	var styleKeys = default0s.concat(default1s);

	var err = function err(msg) {
	    console.error('[Easycanvas-webgl] ' + msg);
	};

	module.exports = {
	    arrayRepeat: arrayRepeat,
	    degToRad: degToRad,
	    default0s: default0s,
	    default1s: default1s,
	    styleKeys: styleKeys,
	    err: err
	};

/***/ }),

/***/ 6:
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

/***/ 7:
/***/ (function(module, exports) {

	"use strict";

	/*
	 * Copyright 2014, Gregg Tavares.
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *     * Redistributions of source code must retain the above copyright
	 * notice, this list of conditions and the following disclaimer.
	 *     * Redistributions in binary form must reproduce the above
	 * copyright notice, this list of conditions and the following disclaimer
	 * in the documentation and/or other materials provided with the
	 * distribution.
	 *     * Neither the name of Gregg Tavares. nor the names of his
	 * contributors may be used to endorse or promote products derived from
	 * this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	/**
	 * Various 3d math functions.
	 *
	 * @module webgl-3d-math
	 */
	module.exports = function () {
	  "use strict";

	  /**
	   * An array or typed array with 3 values.
	   * @typedef {number[]|TypedArray} Vector3
	   * @memberOf module:webgl-3d-math
	   */

	  /**
	   * An array or typed array with 4 values.
	   * @typedef {number[]|TypedArray} Vector4
	   * @memberOf module:webgl-3d-math
	   */

	  /**
	   * An array or typed array with 16 values.
	   * @typedef {number[]|TypedArray} Matrix4
	   * @memberOf module:webgl-3d-math
	   */

	  /**
	   * Takes two 4-by-4 matrices, a and b, and computes the product in the order
	   * that pre-composes b with a.  In other words, the matrix returned will
	   * transform by b first and then a.  Note this is subtly different from just
	   * multiplying the matrices together.  For given a and b, this function returns
	   * the same object in both row-major and column-major mode.
	   * @param {Matrix4} a A matrix.
	   * @param {Matrix4} b A matrix.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   */

	  function multiply(a, b, dst) {
	    dst = dst || new Float32Array(16);
	    var b00 = b[0 * 4 + 0];
	    var b01 = b[0 * 4 + 1];
	    var b02 = b[0 * 4 + 2];
	    var b03 = b[0 * 4 + 3];
	    var b10 = b[1 * 4 + 0];
	    var b11 = b[1 * 4 + 1];
	    var b12 = b[1 * 4 + 2];
	    var b13 = b[1 * 4 + 3];
	    var b20 = b[2 * 4 + 0];
	    var b21 = b[2 * 4 + 1];
	    var b22 = b[2 * 4 + 2];
	    var b23 = b[2 * 4 + 3];
	    var b30 = b[3 * 4 + 0];
	    var b31 = b[3 * 4 + 1];
	    var b32 = b[3 * 4 + 2];
	    var b33 = b[3 * 4 + 3];
	    var a00 = a[0 * 4 + 0];
	    var a01 = a[0 * 4 + 1];
	    var a02 = a[0 * 4 + 2];
	    var a03 = a[0 * 4 + 3];
	    var a10 = a[1 * 4 + 0];
	    var a11 = a[1 * 4 + 1];
	    var a12 = a[1 * 4 + 2];
	    var a13 = a[1 * 4 + 3];
	    var a20 = a[2 * 4 + 0];
	    var a21 = a[2 * 4 + 1];
	    var a22 = a[2 * 4 + 2];
	    var a23 = a[2 * 4 + 3];
	    var a30 = a[3 * 4 + 0];
	    var a31 = a[3 * 4 + 1];
	    var a32 = a[3 * 4 + 2];
	    var a33 = a[3 * 4 + 3];
	    dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
	    dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
	    dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
	    dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
	    dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
	    dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
	    dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
	    dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
	    dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
	    dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
	    dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
	    dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
	    dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
	    dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
	    dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
	    dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
	    return dst;
	  }

	  /**
	   * adds 2 vectors3s
	   * @param {Vector3} a a
	   * @param {Vector3} b b
	   * @param {Vector3} dst optional vector3 to store result
	   * @return {Vector3} dst or new Vector3 if not provided
	   * @memberOf module:webgl-3d-math
	   */
	  function addVectors(a, b, dst) {
	    dst = dst || new Float32Array(3);
	    dst[0] = a[0] + b[0];
	    dst[1] = a[1] + b[1];
	    dst[2] = a[2] + b[2];
	    return dst;
	  }

	  /**
	   * subtracts 2 vectors3s
	   * @param {Vector3} a a
	   * @param {Vector3} b b
	   * @param {Vector3} dst optional vector3 to store result
	   * @return {Vector3} dst or new Vector3 if not provided
	   * @memberOf module:webgl-3d-math
	   */
	  function subtractVectors(a, b, dst) {
	    dst = dst || new Float32Array(3);
	    dst[0] = a[0] - b[0];
	    dst[1] = a[1] - b[1];
	    dst[2] = a[2] - b[2];
	    return dst;
	  }

	  /**
	   * normalizes a vector.
	   * @param {Vector3} v vector to normalzie
	   * @param {Vector3} dst optional vector3 to store result
	   * @return {Vector3} dst or new Vector3 if not provided
	   * @memberOf module:webgl-3d-math
	   */
	  function normalize(v, dst) {
	    dst = dst || new Float32Array(3);
	    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	    // make sure we don't divide by 0.
	    if (length > 0.00001) {
	      dst[0] = v[0] / length;
	      dst[1] = v[1] / length;
	      dst[2] = v[2] / length;
	    }
	    return dst;
	  }

	  /**
	   * Computes the cross product of 2 vectors3s
	   * @param {Vector3} a a
	   * @param {Vector3} b b
	   * @param {Vector3} dst optional vector3 to store result
	   * @return {Vector3} dst or new Vector3 if not provided
	   * @memberOf module:webgl-3d-math
	   */
	  function cross(a, b, dst) {
	    dst = dst || new Float32Array(3);
	    dst[0] = a[1] * b[2] - a[2] * b[1];
	    dst[1] = a[2] * b[0] - a[0] * b[2];
	    dst[2] = a[0] * b[1] - a[1] * b[0];
	    return dst;
	  }

	  /**
	   * Computes the dot product of two vectors; assumes both vectors have
	   * three entries.
	   * @param {Vector3} a Operand vector.
	   * @param {Vector3} b Operand vector.
	   * @return {number} dot product
	   * @memberOf module:webgl-3d-math
	   */
	  function dot(a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	  }

	  /**
	   * Computes the distance squared between 2 points
	   * @param {Vector3} a
	   * @param {Vector3} b
	   * @return {nubmer} distance squared between a and b
	   */
	  function distanceSq(a, b) {
	    var dx = a[0] - b[0];
	    var dy = a[1] - b[1];
	    var dz = a[2] - b[2];
	    return dx * dx + dy * dy + dz * dz;
	  }

	  /**
	   * Computes the distance between 2 points
	   * @param {Vector3} a
	   * @param {Vector3} b
	   * @return {nubmer} distance between a and b
	   */
	  function distance(a, b) {
	    return Math.sqrt(distanceSq(a, b));
	  }

	  /**
	   * Makes an identity matrix.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function identity(dst) {
	    dst = dst || new Float32Array(16);

	    dst[0] = 1;
	    dst[1] = 0;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = 1;
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = 0;
	    dst[9] = 0;
	    dst[10] = 1;
	    dst[11] = 0;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = 0;
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Transposes a matrix.
	   * @param {Matrix4} m matrix to transpose.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function transpose(m, dst) {
	    dst = dst || new Float32Array(16);

	    dst[0] = m[0];
	    dst[1] = m[4];
	    dst[2] = m[8];
	    dst[3] = m[12];
	    dst[4] = m[1];
	    dst[5] = m[5];
	    dst[6] = m[9];
	    dst[7] = m[13];
	    dst[8] = m[2];
	    dst[9] = m[6];
	    dst[10] = m[10];
	    dst[11] = m[14];
	    dst[12] = m[3];
	    dst[13] = m[7];
	    dst[14] = m[11];
	    dst[15] = m[15];

	    return dst;
	  }

	  /**
	   * Creates a lookAt matrix.
	   * This is a world matrix for a camera. In other words it will transform
	   * from the origin to a place and orientation in the world. For a view
	   * matrix take the inverse of this.
	   * @param {Vector3} cameraPosition position of the camera
	   * @param {Vector3} target position of the target
	   * @param {Vector3} up direction
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function lookAt(cameraPosition, target, up, dst) {
	    dst = dst || new Float32Array(16);
	    var zAxis = normalize(subtractVectors(cameraPosition, target));
	    var xAxis = normalize(cross(up, zAxis));
	    var yAxis = normalize(cross(zAxis, xAxis));

	    dst[0] = xAxis[0];
	    dst[1] = xAxis[1];
	    dst[2] = xAxis[2];
	    dst[3] = 0;
	    dst[4] = yAxis[0];
	    dst[5] = yAxis[1];
	    dst[6] = yAxis[2];
	    dst[7] = 0;
	    dst[8] = zAxis[0];
	    dst[9] = zAxis[1];
	    dst[10] = zAxis[2];
	    dst[11] = 0;
	    dst[12] = cameraPosition[0];
	    dst[13] = cameraPosition[1];
	    dst[14] = cameraPosition[2];
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Computes a 4-by-4 perspective transformation matrix given the angular height
	   * of the frustum, the aspect ratio, and the near and far clipping planes.  The
	   * arguments define a frustum extending in the negative z direction.  The given
	   * angle is the vertical angle of the frustum, and the horizontal angle is
	   * determined to produce the given aspect ratio.  The arguments near and far are
	   * the distances to the near and far clipping planes.  Note that near and far
	   * are not z coordinates, but rather they are distances along the negative
	   * z-axis.  The matrix generated sends the viewing frustum to the unit box.
	   * We assume a unit box extending from -1 to 1 in the x and y dimensions and
	   * from -1 to 1 in the z dimension.
	   * @param {number} fieldOfViewInRadians field of view in y axis.
	   * @param {number} aspect aspect of viewport (width / height)
	   * @param {number} near near Z clipping plane
	   * @param {number} far far Z clipping plane
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function perspective(fieldOfViewInRadians, aspect, near, far, dst) {
	    dst = dst || new Float32Array(16);
	    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
	    var rangeInv = 1.0 / (near - far);

	    dst[0] = f / aspect;
	    dst[1] = 0;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = f;
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = 0;
	    dst[9] = 0;
	    dst[10] = (near + far) * rangeInv;
	    dst[11] = -1;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = near * far * rangeInv * 2;
	    dst[15] = 0;

	    return dst;
	  }

	  /**
	   * Computes a 4-by-4 orthographic projection matrix given the coordinates of the
	   * planes defining the axis-aligned, box-shaped viewing volume.  The matrix
	   * generated sends that box to the unit box.  Note that although left and right
	   * are x coordinates and bottom and top are y coordinates, near and far
	   * are not z coordinates, but rather they are distances along the negative
	   * z-axis.  We assume a unit box extending from -1 to 1 in the x and y
	   * dimensions and from -1 to 1 in the z dimension.
	   * @param {number} left The x coordinate of the left plane of the box.
	   * @param {number} right The x coordinate of the right plane of the box.
	   * @param {number} bottom The y coordinate of the bottom plane of the box.
	   * @param {number} top The y coordinate of the right plane of the box.
	   * @param {number} near The negative z coordinate of the near plane of the box.
	   * @param {number} far The negative z coordinate of the far plane of the box.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function orthographic(left, right, bottom, top, near, far, dst) {
	    dst = dst || new Float32Array(16);

	    dst[0] = 2 / (right - left);
	    dst[1] = 0;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = 2 / (top - bottom);
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = 0;
	    dst[9] = 0;
	    dst[10] = 2 / (near - far);
	    dst[11] = 0;
	    dst[12] = (left + right) / (left - right);
	    dst[13] = (bottom + top) / (bottom - top);
	    dst[14] = (near + far) / (near - far);
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Computes a 4-by-4 perspective transformation matrix given the left, right,
	   * top, bottom, near and far clipping planes. The arguments define a frustum
	   * extending in the negative z direction. The arguments near and far are the
	   * distances to the near and far clipping planes. Note that near and far are not
	   * z coordinates, but rather they are distances along the negative z-axis. The
	   * matrix generated sends the viewing frustum to the unit box. We assume a unit
	   * box extending from -1 to 1 in the x and y dimensions and from -1 to 1 in the z
	   * dimension.
	   * @param {number} left The x coordinate of the left plane of the box.
	   * @param {number} right The x coordinate of the right plane of the box.
	   * @param {number} bottom The y coordinate of the bottom plane of the box.
	   * @param {number} top The y coordinate of the right plane of the box.
	   * @param {number} near The negative z coordinate of the near plane of the box.
	   * @param {number} far The negative z coordinate of the far plane of the box.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function frustum(left, right, bottom, top, near, far) {
	    var dx = right - left;
	    var dy = top - bottom;
	    var dz = far - near;

	    dst[0] = 2 * near / dx;
	    dst[1] = 0;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = 2 * near / dy;
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = (left + right) / dx;
	    dst[9] = (top + bottom) / dy;
	    dst[10] = -(far + near) / dz;
	    dst[11] = -1;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = -2 * near * far / dz;
	    dst[15] = 0;

	    return dst;
	  }

	  /**
	   * Makes a translation matrix
	   * @param {number} tx x translation.
	   * @param {number} ty y translation.
	   * @param {number} tz z translation.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function translation(tx, ty, tz, dst) {
	    dst = dst || new Float32Array(16);

	    dst[0] = 1;
	    dst[1] = 0;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = 1;
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = 0;
	    dst[9] = 0;
	    dst[10] = 1;
	    dst[11] = 0;
	    dst[12] = tx;
	    dst[13] = ty;
	    dst[14] = tz;
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Mutliply by translation matrix.
	   * @param {Matrix4} m matrix to multiply
	   * @param {number} tx x translation.
	   * @param {number} ty y translation.
	   * @param {number} tz z translation.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function translate(m, tx, ty, tz, dst) {
	    // This is the optimized version of
	    // return multiply(m, translation(tx, ty, tz), dst);
	    dst = dst || new Float32Array(16);

	    var m00 = m[0];
	    var m01 = m[1];
	    var m02 = m[2];
	    var m03 = m[3];
	    var m10 = m[1 * 4 + 0];
	    var m11 = m[1 * 4 + 1];
	    var m12 = m[1 * 4 + 2];
	    var m13 = m[1 * 4 + 3];
	    var m20 = m[2 * 4 + 0];
	    var m21 = m[2 * 4 + 1];
	    var m22 = m[2 * 4 + 2];
	    var m23 = m[2 * 4 + 3];
	    var m30 = m[3 * 4 + 0];
	    var m31 = m[3 * 4 + 1];
	    var m32 = m[3 * 4 + 2];
	    var m33 = m[3 * 4 + 3];

	    if (m !== dst) {
	      dst[0] = m00;
	      dst[1] = m01;
	      dst[2] = m02;
	      dst[3] = m03;
	      dst[4] = m10;
	      dst[5] = m11;
	      dst[6] = m12;
	      dst[7] = m13;
	      dst[8] = m20;
	      dst[9] = m21;
	      dst[10] = m22;
	      dst[11] = m23;
	    }

	    dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
	    dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
	    dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
	    dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

	    return dst;
	  }

	  /**
	   * Makes an x rotation matrix
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function xRotation(angleInRadians, dst) {
	    dst = dst || new Float32Array(16);
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);

	    dst[0] = 1;
	    dst[1] = 0;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = c;
	    dst[6] = s;
	    dst[7] = 0;
	    dst[8] = 0;
	    dst[9] = -s;
	    dst[10] = c;
	    dst[11] = 0;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = 0;
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Multiply by an x rotation matrix
	   * @param {Matrix4} m matrix to multiply
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function xRotate(m, angleInRadians, dst) {
	    // this is the optimized version of
	    // return multiply(m, xRotation(angleInRadians), dst);
	    dst = dst || new Float32Array(16);

	    var m10 = m[4];
	    var m11 = m[5];
	    var m12 = m[6];
	    var m13 = m[7];
	    var m20 = m[8];
	    var m21 = m[9];
	    var m22 = m[10];
	    var m23 = m[11];
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);

	    dst[4] = c * m10 + s * m20;
	    dst[5] = c * m11 + s * m21;
	    dst[6] = c * m12 + s * m22;
	    dst[7] = c * m13 + s * m23;
	    dst[8] = c * m20 - s * m10;
	    dst[9] = c * m21 - s * m11;
	    dst[10] = c * m22 - s * m12;
	    dst[11] = c * m23 - s * m13;

	    if (m !== dst) {
	      dst[0] = m[0];
	      dst[1] = m[1];
	      dst[2] = m[2];
	      dst[3] = m[3];
	      dst[12] = m[12];
	      dst[13] = m[13];
	      dst[14] = m[14];
	      dst[15] = m[15];
	    }

	    return dst;
	  }

	  /**
	   * Makes an y rotation matrix
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function yRotation(angleInRadians, dst) {
	    dst = dst || new Float32Array(16);
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);

	    dst[0] = c;
	    dst[1] = 0;
	    dst[2] = -s;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = 1;
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = s;
	    dst[9] = 0;
	    dst[10] = c;
	    dst[11] = 0;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = 0;
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Multiply by an y rotation matrix
	   * @param {Matrix4} m matrix to multiply
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function yRotate(m, angleInRadians, dst) {
	    // this is the optimized verison of
	    // return multiply(m, yRotation(angleInRadians), dst);
	    dst = dst || new Float32Array(16);

	    var m00 = m[0 * 4 + 0];
	    var m01 = m[0 * 4 + 1];
	    var m02 = m[0 * 4 + 2];
	    var m03 = m[0 * 4 + 3];
	    var m20 = m[2 * 4 + 0];
	    var m21 = m[2 * 4 + 1];
	    var m22 = m[2 * 4 + 2];
	    var m23 = m[2 * 4 + 3];
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);

	    dst[0] = c * m00 - s * m20;
	    dst[1] = c * m01 - s * m21;
	    dst[2] = c * m02 - s * m22;
	    dst[3] = c * m03 - s * m23;
	    dst[8] = c * m20 + s * m00;
	    dst[9] = c * m21 + s * m01;
	    dst[10] = c * m22 + s * m02;
	    dst[11] = c * m23 + s * m03;

	    if (m !== dst) {
	      dst[4] = m[4];
	      dst[5] = m[5];
	      dst[6] = m[6];
	      dst[7] = m[7];
	      dst[12] = m[12];
	      dst[13] = m[13];
	      dst[14] = m[14];
	      dst[15] = m[15];
	    }

	    return dst;
	  }

	  /**
	   * Makes an z rotation matrix
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function zRotation(angleInRadians, dst) {
	    dst = dst || new Float32Array(16);
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);

	    dst[0] = c;
	    dst[1] = s;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = -s;
	    dst[5] = c;
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = 0;
	    dst[9] = 0;
	    dst[10] = 1;
	    dst[11] = 0;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = 0;
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Multiply by an z rotation matrix
	   * @param {Matrix4} m matrix to multiply
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function zRotate(m, angleInRadians, dst) {
	    // This is the optimized verison of
	    // return multiply(m, zRotation(angleInRadians), dst);
	    dst = dst || new Float32Array(16);

	    var m00 = m[0 * 4 + 0];
	    var m01 = m[0 * 4 + 1];
	    var m02 = m[0 * 4 + 2];
	    var m03 = m[0 * 4 + 3];
	    var m10 = m[1 * 4 + 0];
	    var m11 = m[1 * 4 + 1];
	    var m12 = m[1 * 4 + 2];
	    var m13 = m[1 * 4 + 3];
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);

	    dst[0] = c * m00 + s * m10;
	    dst[1] = c * m01 + s * m11;
	    dst[2] = c * m02 + s * m12;
	    dst[3] = c * m03 + s * m13;
	    dst[4] = c * m10 - s * m00;
	    dst[5] = c * m11 - s * m01;
	    dst[6] = c * m12 - s * m02;
	    dst[7] = c * m13 - s * m03;

	    if (m !== dst) {
	      dst[8] = m[8];
	      dst[9] = m[9];
	      dst[10] = m[10];
	      dst[11] = m[11];
	      dst[12] = m[12];
	      dst[13] = m[13];
	      dst[14] = m[14];
	      dst[15] = m[15];
	    }

	    return dst;
	  }

	  /**
	   * Makes an rotation matrix around an arbitrary axis
	   * @param {Vector3} axis axis to rotate around
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function axisRotation(axis, angleInRadians, dst) {
	    dst = dst || new Float32Array(16);

	    var x = axis[0];
	    var y = axis[1];
	    var z = axis[2];
	    var n = Math.sqrt(x * x + y * y + z * z);
	    x /= n;
	    y /= n;
	    z /= n;
	    var xx = x * x;
	    var yy = y * y;
	    var zz = z * z;
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);
	    var oneMinusCosine = 1 - c;

	    dst[0] = xx + (1 - xx) * c;
	    dst[1] = x * y * oneMinusCosine + z * s;
	    dst[2] = x * z * oneMinusCosine - y * s;
	    dst[3] = 0;
	    dst[4] = x * y * oneMinusCosine - z * s;
	    dst[5] = yy + (1 - yy) * c;
	    dst[6] = y * z * oneMinusCosine + x * s;
	    dst[7] = 0;
	    dst[8] = x * z * oneMinusCosine + y * s;
	    dst[9] = y * z * oneMinusCosine - x * s;
	    dst[10] = zz + (1 - zz) * c;
	    dst[11] = 0;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = 0;
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Multiply by an axis rotation matrix
	   * @param {Matrix4} m matrix to multiply
	   * @param {Vector3} axis axis to rotate around
	   * @param {number} angleInRadians amount to rotate
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function axisRotate(m, axis, angleInRadians, dst) {
	    // This is the optimized verison of
	    // return multiply(m, axisRotation(axis, angleInRadians), dst);
	    dst = dst || new Float32Array(16);

	    var x = axis[0];
	    var y = axis[1];
	    var z = axis[2];
	    var n = Math.sqrt(x * x + y * y + z * z);
	    x /= n;
	    y /= n;
	    z /= n;
	    var xx = x * x;
	    var yy = y * y;
	    var zz = z * z;
	    var c = Math.cos(angleInRadians);
	    var s = Math.sin(angleInRadians);
	    var oneMinusCosine = 1 - c;

	    var r00 = xx + (1 - xx) * c;
	    var r01 = x * y * oneMinusCosine + z * s;
	    var r02 = x * z * oneMinusCosine - y * s;
	    var r10 = x * y * oneMinusCosine - z * s;
	    var r11 = yy + (1 - yy) * c;
	    var r12 = y * z * oneMinusCosine + x * s;
	    var r20 = x * z * oneMinusCosine + y * s;
	    var r21 = y * z * oneMinusCosine - x * s;
	    var r22 = zz + (1 - zz) * c;

	    var m00 = m[0];
	    var m01 = m[1];
	    var m02 = m[2];
	    var m03 = m[3];
	    var m10 = m[4];
	    var m11 = m[5];
	    var m12 = m[6];
	    var m13 = m[7];
	    var m20 = m[8];
	    var m21 = m[9];
	    var m22 = m[10];
	    var m23 = m[11];

	    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
	    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
	    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
	    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
	    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
	    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
	    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
	    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
	    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
	    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
	    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
	    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

	    if (m !== dst) {
	      dst[12] = m[12];
	      dst[13] = m[13];
	      dst[14] = m[14];
	      dst[15] = m[15];
	    }

	    return dst;
	  }

	  /**
	   * Makes a scale matrix
	   * @param {number} sx x scale.
	   * @param {number} sy y scale.
	   * @param {number} sz z scale.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function scaling(sx, sy, sz, dst) {
	    dst = dst || new Float32Array(16);

	    dst[0] = sx;
	    dst[1] = 0;
	    dst[2] = 0;
	    dst[3] = 0;
	    dst[4] = 0;
	    dst[5] = sy;
	    dst[6] = 0;
	    dst[7] = 0;
	    dst[8] = 0;
	    dst[9] = 0;
	    dst[10] = sz;
	    dst[11] = 0;
	    dst[12] = 0;
	    dst[13] = 0;
	    dst[14] = 0;
	    dst[15] = 1;

	    return dst;
	  }

	  /**
	   * Multiply by a scaling matrix
	   * @param {Matrix4} m matrix to multiply
	   * @param {number} sx x scale.
	   * @param {number} sy y scale.
	   * @param {number} sz z scale.
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function scale(m, sx, sy, sz, dst) {
	    // This is the optimized verison of
	    // return multiply(m, scaling(sx, sy, sz), dst);
	    dst = dst || new Float32Array(16);

	    dst[0] = sx * m[0 * 4 + 0];
	    dst[1] = sx * m[0 * 4 + 1];
	    dst[2] = sx * m[0 * 4 + 2];
	    dst[3] = sx * m[0 * 4 + 3];
	    dst[4] = sy * m[1 * 4 + 0];
	    dst[5] = sy * m[1 * 4 + 1];
	    dst[6] = sy * m[1 * 4 + 2];
	    dst[7] = sy * m[1 * 4 + 3];
	    dst[8] = sz * m[2 * 4 + 0];
	    dst[9] = sz * m[2 * 4 + 1];
	    dst[10] = sz * m[2 * 4 + 2];
	    dst[11] = sz * m[2 * 4 + 3];

	    if (m !== dst) {
	      dst[12] = m[12];
	      dst[13] = m[13];
	      dst[14] = m[14];
	      dst[15] = m[15];
	    }

	    return dst;
	  }

	  /**
	   * Computes the inverse of a matrix.
	   * @param {Matrix4} m matrix to compute inverse of
	   * @param {Matrix4} [dst] optional matrix to store result
	   * @return {Matrix4} dst or a new matrix if none provided
	   * @memberOf module:webgl-3d-math
	   */
	  function inverse(m, dst) {
	    dst = dst || new Float32Array(16);
	    var m00 = m[0 * 4 + 0];
	    var m01 = m[0 * 4 + 1];
	    var m02 = m[0 * 4 + 2];
	    var m03 = m[0 * 4 + 3];
	    var m10 = m[1 * 4 + 0];
	    var m11 = m[1 * 4 + 1];
	    var m12 = m[1 * 4 + 2];
	    var m13 = m[1 * 4 + 3];
	    var m20 = m[2 * 4 + 0];
	    var m21 = m[2 * 4 + 1];
	    var m22 = m[2 * 4 + 2];
	    var m23 = m[2 * 4 + 3];
	    var m30 = m[3 * 4 + 0];
	    var m31 = m[3 * 4 + 1];
	    var m32 = m[3 * 4 + 2];
	    var m33 = m[3 * 4 + 3];
	    var tmp_0 = m22 * m33;
	    var tmp_1 = m32 * m23;
	    var tmp_2 = m12 * m33;
	    var tmp_3 = m32 * m13;
	    var tmp_4 = m12 * m23;
	    var tmp_5 = m22 * m13;
	    var tmp_6 = m02 * m33;
	    var tmp_7 = m32 * m03;
	    var tmp_8 = m02 * m23;
	    var tmp_9 = m22 * m03;
	    var tmp_10 = m02 * m13;
	    var tmp_11 = m12 * m03;
	    var tmp_12 = m20 * m31;
	    var tmp_13 = m30 * m21;
	    var tmp_14 = m10 * m31;
	    var tmp_15 = m30 * m11;
	    var tmp_16 = m10 * m21;
	    var tmp_17 = m20 * m11;
	    var tmp_18 = m00 * m31;
	    var tmp_19 = m30 * m01;
	    var tmp_20 = m00 * m21;
	    var tmp_21 = m20 * m01;
	    var tmp_22 = m00 * m11;
	    var tmp_23 = m10 * m01;

	    var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
	    var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
	    var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
	    var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

	    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

	    dst[0] = d * t0;
	    dst[1] = d * t1;
	    dst[2] = d * t2;
	    dst[3] = d * t3;
	    dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
	    dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
	    dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
	    dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
	    dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
	    dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
	    dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
	    dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
	    dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
	    dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
	    dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
	    dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

	    return dst;
	  }

	  /**
	   * Takes a  matrix and a vector with 4 entries, transforms that vector by
	   * the matrix, and returns the result as a vector with 4 entries.
	   * @param {Matrix4} m The matrix.
	   * @param {Vector4} v The point in homogenous coordinates.
	   * @param {Vector4} dst optional vector4 to store result
	   * @return {Vector4} dst or new Vector4 if not provided
	   * @memberOf module:webgl-3d-math
	   */
	  function transformVector(m, v, dst) {
	    dst = dst || new Float32Array(4);
	    for (var i = 0; i < 4; ++i) {
	      dst[i] = 0.0;
	      for (var j = 0; j < 4; ++j) {
	        dst[i] += v[j] * m[j * 4 + i];
	      }
	    }
	    return dst;
	  }

	  /**
	   * Takes a 4-by-4 matrix and a vector with 3 entries,
	   * interprets the vector as a point, transforms that point by the matrix, and
	   * returns the result as a vector with 3 entries.
	   * @param {Matrix4} m The matrix.
	   * @param {Vector3} v The point.
	   * @param {Vector4} dst optional vector4 to store result
	   * @return {Vector4} dst or new Vector4 if not provided
	   * @memberOf module:webgl-3d-math
	   */
	  function transformPoint(m, v, dst) {
	    dst = dst || new Float32Array(3);
	    var v0 = v[0];
	    var v1 = v[1];
	    var v2 = v[2];
	    var d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

	    dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
	    dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
	    dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

	    return dst;
	  }

	  /**
	   * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
	   * direction, transforms that direction by the matrix, and returns the result;
	   * assumes the transformation of 3-dimensional space represented by the matrix
	   * is parallel-preserving, i.e. any combination of rotation, scaling and
	   * translation, but not a perspective distortion. Returns a vector with 3
	   * entries.
	   * @param {Matrix4} m The matrix.
	   * @param {Vector3} v The direction.
	   * @param {Vector4} dst optional vector4 to store result
	   * @return {Vector4} dst or new Vector4 if not provided
	   * @memberOf module:webgl-3d-math
	   */
	  function transformDirection(m, v, dst) {
	    dst = dst || new Float32Array(3);

	    var v0 = v[0];
	    var v1 = v[1];
	    var v2 = v[2];

	    dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
	    dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
	    dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

	    return dst;
	  }

	  /**
	   * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
	   * as a normal to a surface, and computes a vector which is normal upon
	   * transforming that surface by the matrix. The effect of this function is the
	   * same as transforming v (as a direction) by the inverse-transpose of m.  This
	   * function assumes the transformation of 3-dimensional space represented by the
	   * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
	   * translation, but not a perspective distortion.  Returns a vector with 3
	   * entries.
	   * @param {Matrix4} m The matrix.
	   * @param {Vector3} v The normal.
	   * @param {Vector3} [dst] The direction.
	   * @return {Vector3} The transformed direction.
	   * @memberOf module:webgl-3d-math
	   */
	  function transformNormal(m, v, dst) {
	    dst = dst || new Float32Array(3);
	    var mi = inverse(m);
	    var v0 = v[0];
	    var v1 = v[1];
	    var v2 = v[2];

	    dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
	    dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
	    dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

	    return dst;
	  }

	  function copy(src, dst) {
	    dst = dst || new Float32Array(16);

	    dst[0] = src[0];
	    dst[1] = src[1];
	    dst[2] = src[2];
	    dst[3] = src[3];
	    dst[4] = src[4];
	    dst[5] = src[5];
	    dst[6] = src[6];
	    dst[7] = src[7];
	    dst[8] = src[8];
	    dst[9] = src[9];
	    dst[10] = src[10];
	    dst[11] = src[11];
	    dst[12] = src[12];
	    dst[13] = src[13];
	    dst[14] = src[14];
	    dst[15] = src[15];

	    return dst;
	  }

	  return {
	    copy: copy,
	    lookAt: lookAt,
	    addVectors: addVectors,
	    subtractVectors: subtractVectors,
	    distance: distance,
	    distanceSq: distanceSq,
	    normalize: normalize,
	    cross: cross,
	    dot: dot,
	    identity: identity,
	    transpose: transpose,
	    orthographic: orthographic,
	    frustum: frustum,
	    perspective: perspective,
	    translation: translation,
	    translate: translate,
	    xRotation: xRotation,
	    yRotation: yRotation,
	    zRotation: zRotation,
	    xRotate: xRotate,
	    yRotate: yRotate,
	    zRotate: zRotate,
	    axisRotation: axisRotation,
	    axisRotate: axisRotate,
	    scaling: scaling,
	    scale: scale,
	    multiply: multiply,
	    inverse: inverse,
	    transformVector: transformVector,
	    transformPoint: transformPoint,
	    transformDirection: transformDirection,
	    transformNormal: transformNormal
	  };
	};

/***/ }),

/***/ 10:
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

	    if (deg) {
	        x = (x - rx) * Math.cos(deg) - (y - ry) * Math.sin(deg) + rx;
	        y = (x - rx) * Math.sin(deg) + (y - ry) * Math.cos(deg) + ry;
	    }

	    return x >= x2 && x <= x2 + w2 && y >= y2 && y <= y2 + h2;
	};

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _mathPointRotate = __webpack_require__(2);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	var _mathPointInRect = __webpack_require__(10);

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

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _webglShaders = __webpack_require__(76);

	var _webglShaders2 = _interopRequireDefault(_webglShaders);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createProgram = function createProgram(gl, vertexShader, fragmentShader) {
	    var program = gl.createProgram();

	    // Attach pre-existing shaders
	    gl.attachShader(program, vertexShader);
	    gl.attachShader(program, fragmentShader);

	    gl.linkProgram(program);

	    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	        var info = gl.getProgramInfoLog(program);
	        throw 'Could not compile WebGL program. \n\n' + info;
	    }

	    return program;
	};

	// 0-color 1-textcoord
	var createShader = function () {
	    var shaderCachePool = {};

	    return function (gl, type, colorOrTex, light, primitive) {
	        var cacheKey = '' + type + colorOrTex + light + primitive;
	        if (gl.singleShader) {
	            cacheKey = 'singleShader' + type;
	        }

	        if (shaderCachePool[cacheKey]) {
	            return shaderCachePool[cacheKey];
	        }

	        // let sourceCode = webglShaders.factory(gl, type)(colorOrTex, light, primitive);
	        var sourceCode = _webglShaders2.default[gl.singleShader ? 'final' : 'factory'](gl, type)(colorOrTex, light, primitive);

	        // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
	        var shader = gl.createShader(type);
	        gl.shaderSource(shader, sourceCode);
	        gl.compileShader(shader);

	        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	            var info = gl.getShaderInfoLog(shader);
	            throw 'Could not compile WebGL program. \n\n' + info;
	        }

	        shaderCachePool[cacheKey] = shader;

	        return shader;
	    };
	}();

	var lastType;

	module.exports = function (gl, type, light, primitive) {
	    var lastFlag = '' + type + light + primitive;
	    if (gl.singleShader) {
	        lastFlag = 'singleShader';
	    }

	    if (lastType === lastFlag) return;
	    lastType = lastFlag;

	    var shaderVertexColor, shaderFragmentColor;
	    shaderVertexColor = createShader(gl, gl.VERTEX_SHADER, type, light, primitive);
	    shaderFragmentColor = createShader(gl, gl.FRAGMENT_SHADER, type, light, primitive);

	    gl.program = createProgram(gl, shaderVertexColor, shaderFragmentColor);

	    gl.useProgram(gl.program);

	    // look up where the vertex data needs to go.
	    gl.positionLocation = gl.getAttribLocation(gl.program, 'a_position');
	    gl.normalLocation = gl.getAttribLocation(gl.program, "a_normal");
	    if (type === 0) {
	        gl.colorLocation = gl.getAttribLocation(gl.program, 'a_color');
	    } else {
	        gl.texcoordLocation = gl.getAttribLocation(gl.program, 'a_texcoord');
	    }

	    gl.sizeLocation = gl.getAttribLocation(gl.program, "u_size");

	    // light
	    gl.worldViewProjectionLocation = gl.getUniformLocation(gl.program, "u_worldViewProjection");
	    gl.worldInverseTransposeLocation = gl.getUniformLocation(gl.program, "u_worldInverseTranspose");
	    gl.reverseLightDirectionLocation = gl.getUniformLocation(gl.program, "u_reverseLightDirection");
	    gl.vShaderTypeLocation = gl.getUniformLocation(gl.program, "v_shaderType");
	    gl.fShaderTypeLocation = gl.getUniformLocation(gl.program, "f_shaderType");

	    // lookup uniforms
	    gl.matrixLocation = gl.getUniformLocation(gl.program, 'u_matrix');
	    if (type === 0) {
	        gl.textureLocation = gl.getUniformLocation(gl.program, 'u_texture');
	    } else {
	        gl.textureMatrixLocation = gl.getUniformLocation(gl.program, 'u_textureMatrix');
	    }

	    gl.enableVertexAttribArray(gl.positionLocation);
	    light && gl.enableVertexAttribArray(gl.normalLocation);
	    gl.enableVertexAttribArray(gl.texcoordLocation);
	    gl.enableVertexAttribArray(gl.colorLocation);

	    // disableVertexAttribArray // todo
	};

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _img2base = __webpack_require__(6);

	var _img2base2 = _interopRequireDefault(_img2base);

	var _m = __webpack_require__(7);

	var _m2 = _interopRequireDefault(_m);

	var _webglUtils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import toggleShader from './webgl-shader-toggle.js';

	var m4 = (0, _m2.default)();

	var webglRegister = function webglRegister($canvas, option) {
	    $canvas.$isWebgl = true;

	    $canvas.webgl = {};
	    _extends($canvas.webgl, option.webgl);
	    $canvas.webgl.depth = $canvas.webgl.depth || 10000;
	    $canvas.webgl.singleShader = $canvas.webgl.singleShader || 0;
	    $canvas.webgl.camera = $canvas.webgl.camera || {};
	    $canvas.webgl.camera.current = $canvas.webgl.camera.current || {};
	    $canvas.webgl.camera.target = $canvas.webgl.camera.target || {};

	    var gl = $canvas.$gl = $canvas.$paintContext;

	    gl.clearColor(0, 0, 0, 0);
	    // gl.clear(gl.COLOR_BUFFER_BIT);
	    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	    // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

	    // toggleShader(gl, 0);

	    {
	        $canvas.imgLoader = function (url, callback) {
	            var tex = gl.createTexture();

	            var textureInfo = {
	                width: 0,
	                height: 0
	            };

	            (0, _img2base2.default)(url, function (base64url) {
	                function loadImageAndCreateTextureInfo(url) {
	                    var img = new Image();
	                    img.addEventListener('load', function () {
	                        textureInfo.width = img.width;
	                        textureInfo.height = img.height;
	                        textureInfo.texture = tex;
	                        textureInfo.img = img;

	                        gl.bindTexture(gl.TEXTURE_2D, tex);
	                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

	                        callback && callback(textureInfo);
	                    });
	                    img.src = url;
	                }
	                loadImageAndCreateTextureInfo(base64url, callback);
	            });

	            return textureInfo;
	        };
	    }
	};

	module.exports = function (_option) {
	    var _this = this;

	    if (_option.webgl) {
	        // 获取webgl对象
	        this.$paintContext = this.$dom.getContext('webgl', {
	            alpha: true,
	            premultipliedAlpha: false
	        });

	        // 检测是否支持webgl
	        if (this.$paintContext) {
	            webglRegister(this, _option);

	            // 挂载每帧的事件监听
	            this.on('beforeTick', function () {
	                _this.$paintContext.clear(_this.$paintContext.COLOR_BUFFER_BIT | _this.$paintContext.DEPTH_BUFFER_BIT);

	                // 把每帧只需要计算一次的属性放到钩子里
	                // 后面可以增加camera.rx、light等参数，进一步优化性能

	                // webgl configs
	                _this.webgl.$depth = _utils2.default.funcOrValue(_utils2.default.firstValuable(_this.webgl.depth, 0), _this);
	                _this.webgl.$camera = _this.webgl.camera.enable ? {} : false;
	                _this.webgl.$fudgeFactor = _utils2.default.funcOrValue(_utils2.default.firstValuable(_this.webgl.fudgeFactor, 0), _this);

	                if (_this.webgl.$camera) {
	                    // camera
	                    var camera = _this.webgl.camera;
	                    var aspect = _this.width / _this.height;
	                    // var cameraAngleRadians = 60;
	                    var projectionMatrix = m4.perspective((0, _webglUtils.degToRad)(60), aspect, 1, 10000);

	                    var cameraPosition = [_utils2.default.funcOrValue(camera.current.x || 0, _this), _utils2.default.funcOrValue(camera.current.y || 0, _this), _utils2.default.funcOrValue(camera.current.z || 0, _this)];

	                    var up = [0, -1, 0];
	                    if (camera.rotate) {
	                        up = [_utils2.default.funcOrValue(camera.rotate.x, _this), _utils2.default.funcOrValue(camera.rotate.y, _this), _utils2.default.funcOrValue(camera.rotate.z, _this)];
	                    }

	                    var fPosition = [_utils2.default.funcOrValue(camera.target.x || 0, _this), _utils2.default.funcOrValue(camera.target.y || 0, _this), _utils2.default.funcOrValue(camera.target.z || 0, _this)];

	                    var cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);
	                    var viewMatrix = m4.inverse(cameraMatrix);
	                    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

	                    _this.webgl.$camera.viewProjectionMatrix = viewProjectionMatrix;
	                }

	                // gl props
	                _this.$paintContext.orthographic = m4.orthographic(0, _this.width, _this.height, 0, _this.webgl.$depth, -_this.webgl.$depth);
	                _this.$paintContext.singleShader = _this.webgl.singleShader;
	            });
	        } else {
	            if (false) {
	                (0, _webglUtils.err)('Webgl is not supported in current browser, using canvas2d instead.');
	            }

	            if (_option.webgl.fallback) {
	                _option.webgl.fallback.call(this);
	            }
	        }
	    }
	};

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

	"use strict";

	var createFloatTexture = function createFloatTexture(gl, width, height) {
	    var texture = gl.createTexture();
	    gl.bindTexture(gl.TEXTURE_2D, texture);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    gl.bindTexture(gl.TEXTURE_2D, null);
	    return texture;
	};

	var floatEqual = function floatEqual(a, b) {
	    return Math.abs(a - b) < 1;
	};

	module.exports = function ($e, caughts) {
	    var $canvas = this;
	    var gl = $canvas.$gl;
	    var fbo = gl.createFramebuffer();

	    var eventedTimestamp = 0;
	    var eventedResult = false;

	    if ($canvas.$lastPaintTime === eventedTimestamp) {
	        return eventedResult;
	    }

	    var renderTexture = createFloatTexture(gl, $canvas.width, $canvas.height);
	    gl.bindTexture(gl.TEXTURE_2D, renderTexture);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, $canvas.width, $canvas.height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);

	    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	    gl.framebufferTexture2D(
	    // First argument is always gl.FRAMEBUFFER
	    gl.FRAMEBUFFER,
	    // The second argument indicates the "attachment slot" of the FBO.
	    // Basically, it indicates the function of the texture that you are attaching.
	    // gl.COLOR_ATTACHMENT0 means that the texture will serve as the zeroth color buffer.
	    // By default, this is the only color buffer attachment slot of that you can use in vanially gl.
	    // To use other color buffer attachment slot, you need an extension.  (We will cover this later.)
	    gl.COLOR_ATTACHMENT0,
	    // The third argument indicates the kind of texture we are attaching.
	    // Since we are attaching a TEXTURE_2D, we give it gl.TEXTURE_2D
	    gl.TEXTURE_2D,
	    // The fourth argument is the texture that you want to attach.
	    // Of course, this must be created before hand.
	    renderTexture,
	    // The fifth argument is the mipmap level of the texture.
	    // This is always 0.
	    0);
	    gl.clearColor(0, 0, 0, 0);
	    gl.clear(gl.COLOR_BUFFER_BIT);
	    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	    gl.enable(gl.DEPTH_TEST);
	    gl.disable(gl.BLEND);

	    gl.eventing = true;
	    $canvas.$render();

	    // console.log($e.type)

	    var readout = new Uint8Array(3);
	    gl.readPixels($e.canvasX, $canvas.height - $e.canvasY, 1, 1, gl.RGB, gl.UNSIGNED_BYTE, readout);

	    // window.imageData = new ImageData($canvas.width, $canvas.height);
	    // for (var i = 0; i < imageData.data.length / 4; i++) {
	    //     imageData.data[i * 4 + 0] = readout[0];
	    //     imageData.data[i * 4 + 1] = readout[1];
	    //     imageData.data[i * 4 + 2] = readout[2];
	    //     // imageData.data[i * 4 + 3] = readout[3];
	    // }
	    // console.log(readout);
	    // $foo.$paintContext.putImageData(imageData, 0, 0);

	    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	    gl.eventing = false;

	    var $hit = $canvas.$children.filter(function ($sprite) {
	        if (!$sprite.webgl) return false;

	        var flag = $sprite.webgl.$eventFlag;
	        if (!flag) return false;

	        return floatEqual(readout[0], flag[0]) && floatEqual(readout[1], flag[1]) && floatEqual(readout[2], flag[2]);
	    })[0];

	    eventedTimestamp = $canvas.$lastPaintTime;
	    eventedResult = $hit;

	    console.log($hit);
	};

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _webglUtils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    var $sprite = this;
	    var $canvas = this.$canvas;

	    if ($sprite.webgl && $sprite.webgl.vertices) {
	        $sprite.$rendered = true;

	        if ($sprite.webgl.img) {
	            if (typeof $sprite.webgl.img === 'string') {
	                $sprite.webgl.img = $canvas.imgLoader($sprite.webgl.img);
	            } else if ($sprite.webgl.img.src) {
	                $sprite.webgl.img = $canvas.imgLoader($sprite.webgl.img.src);
	            }
	        }

	        var _webgl = {
	            tx: $sprite.getStyle('tx'),
	            ty: $sprite.getStyle('ty'),
	            tz: _utils2.default.funcOrValue($sprite.webgl.tz, $sprite) || 0
	        };

	        for (var key in $sprite.webgl) {
	            _webgl[key] = _utils2.default.funcOrValue($sprite.webgl[key], $sprite) || 0;
	        }

	        _webglUtils.styleKeys.forEach(function (key) {
	            _webgl[key] = $sprite.getWebglStyle(key);
	        });

	        var $paintSprite = {
	            $id: $sprite.$id,
	            type: '3d',
	            webgl: _webgl
	        };

	        // if (process.env.NODE_ENV !== 'production') {
	        //     // 开发环境下，将元素挂载到$children里以供标记
	        $paintSprite.$origin = $sprite;
	        // };

	        $canvas.$children.push($paintSprite);
	    }

	    if ($sprite.content.img) {
	        if (typeof $sprite.content.img === 'string') {
	            $sprite.content.img = $canvas.imgLoader($sprite.content.img);
	        } else if ($sprite.content.img.src) {
	            $sprite.content.img = $canvas.imgLoader($sprite.content.img.src);
	        }
	    }
	};

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _math = __webpack_require__(11);

	var _math2 = _interopRequireDefault(_math);

	var _webglUtils = __webpack_require__(4);

	var _webglRender3d = __webpack_require__(71);

	var _webglRender3d2 = _interopRequireDefault(_webglRender3d);

	var _webglRender2d = __webpack_require__(70);

	var _webglRender2d2 = _interopRequireDefault(_webglRender2d);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var textCachePool = {};
	var webglRender = function webglRender($sprite, settings, $canvas) {
	    var props = $sprite.props;
	    var webgl = $sprite.webgl;
	    var gl = $canvas.$gl;

	    if ($sprite.type !== '3d') {
	        if (!props[0] && props.content) {
	            var cacheKey = props.content + props.font + props.align + props.color;
	            var cacheValue = textCachePool[cacheKey];

	            if (!cacheValue) {
	                // text
	                var tex = gl.createTexture();
	                var textCtx = document.createElement('canvas').getContext('2d');
	                textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);

	                textCtx.canvas.width = props.content.length * parseInt(props.font) * 2;
	                textCtx.canvas.height = parseInt(props.font) + 5;
	                textCtx.font = props.font;
	                textCtx.textAlign = props.align;
	                textCtx.fillStyle = props.color;
	                textCtx.fillText(props.content, props.align === 'right' ? textCtx.canvas.width : props.align === 'center' ? textCtx.canvas.width / 2 : 0, textCtx.canvas.height - 5);

	                gl.bindTexture(gl.TEXTURE_2D, tex);
	                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCtx.canvas);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	                cacheValue = textCachePool[cacheKey] = {
	                    texture: tex,
	                    width: textCtx.canvas.width,
	                    height: textCtx.canvas.height,
	                    img: textCtx.canvas,
	                    canvas: textCtx.canvas
	                };
	            }

	            props = [cacheValue, 0, 0, cacheValue.canvas.width, cacheValue.canvas.height, props.align === 'right' ? props.tx - cacheValue.canvas.width : props.align === 'center' ? props.tx - cacheValue.canvas.width / 2 : props.tx, props.ty - cacheValue.canvas.height + 5, cacheValue.canvas.width, cacheValue.canvas.height];
	        }

	        if (props[0] && props[0].texture) {
	            // 跳过绘制
	            var meet = (0, _math2.default)(props[5], props[6], props[7], props[8], 0, 0, $canvas.width, $canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], settings.rotate);
	            if (!meet) {
	                // console.log('miss 2d');
	                return;
	            }

	            if (props[0].img.width === 0) return;

	            // 2d
	            gl.bindTexture(gl.TEXTURE_2D, props[0].texture);
	            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, props[0].img);

	            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            (0, _webglRender2d2.default)($canvas, props[0].texture, props[0].width, props[0].height, props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], settings);
	        }
	    } else if ($sprite.type === '3d' && (webgl.img || webgl.colors)) {
	        if (webgl.img && webgl.img.texture) {
	            gl.bindTexture(gl.TEXTURE_2D, webgl.img.texture);
	        }
	        // loading img
	        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
	        // 跳过绘制

	        if (webgl.longSide && !$canvas.webgl.$camera) {
	            var longSide = webgl.longSide * 1.8; // ~三维根号3
	            var depth = $canvas.webgl.$depth;
	            var meet = (0, _math2.default)(webgl.tx - longSide, webgl.ty - longSide, longSide * 2, longSide * 2, webgl.tz / depth * $canvas.width / 2, webgl.tz / depth * $canvas.height / 2, $canvas.width - webgl.tz / depth * $canvas.width / 2, $canvas.height - webgl.tz / depth * $canvas.height / 2, 0, 0, 0);
	            if (!meet) {
	                // console.log('miss');
	                return;
	            }
	        }

	        (0, _webglRender3d2.default)($canvas, webgl);
	    }
	};

	module.exports = function ($sprite, settings) {
	    var $canvas = this;

	    if ($canvas.$isWebgl) {
	        webglRender($sprite, settings, $canvas);

	        if (false) {
	            $canvas.$plugin.drawImage($canvas);
	        }

	        return true;
	    }
	};

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _webglShapes = __webpack_require__(77);

	var _webglShapes2 = _interopRequireDefault(_webglShapes);

	var _webglUtils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (easycanvas) {
	    easycanvas.webglShapes = _webglShapes2.default;

	    easycanvas.sprite.prototype.getWebglStyle = function (key) {
	        var $sprite = this;
	        var currentValue = void 0;

	        if (_webglUtils.default1s.indexOf(key) >= 0) currentValue = 1;
	        if (_webglUtils.default0s.indexOf(key) >= 0) currentValue = 0;

	        if ($sprite.webgl) {
	            currentValue = _utils2.default.funcOrValue($sprite.webgl[key], $sprite) || currentValue;
	        }

	        if ($sprite.$parent) {
	            if (_webglUtils.default1s.indexOf(key) >= 0) {
	                currentValue *= _utils2.default.firstValuable($sprite.$parent.getWebglStyle(key), 1);
	            } else if (_webglUtils.default0s.indexOf(key) >= 0) {
	                // rx, ry, rz
	                currentValue += _utils2.default.firstValuable($sprite.$parent.getWebglStyle(key), 0);
	            }
	        }

	        return currentValue;
	    };

	    easycanvas.sprite.prototype.updateWebglStyle = function (key, value) {
	        var $sprite = this;

	        if ($sprite.webgl && $sprite.webgl[key]) {
	            $sprite.webgl[key].$cacheBuffer = undefined;

	            if (key === 'colors' && value) {
	                var repeatTimes = $sprite.webgl.vertices.length / value.length;
	                $sprite.webgl.colors = new Uint8Array((0, _webglUtils.arrayRepeat)(value, repeatTimes));
	            }
	        }
	    };
	};

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _m = __webpack_require__(7);

	var _m2 = _interopRequireDefault(_m);

	var _webglUtils = __webpack_require__(4);

	var _webglShaderToggle = __webpack_require__(26);

	var _webglShaderToggle2 = _interopRequireDefault(_webglShaderToggle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var m4 = (0, _m2.default)();

	var cacheBuffer2d;

	module.exports = function ($canvas, texture, texWidth, texHeight, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, settings) {

	    var gl = $canvas.$gl;

	    gl.enable(gl.BLEND);
	    gl.disable(gl.DEPTH_TEST);

	    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
	    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	    (0, _webglShaderToggle2.default)(gl, 1);

	    if (!cacheBuffer2d) {
	        cacheBuffer2d = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
	        var textureCoordinates = [
	        // 0, 0,
	        // 1, 0,
	        // 0, 1,
	        // 1, 1,
	        0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

	        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
	    }

	    gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
	    gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);
	    gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

	    var matrix = gl.orthographic;

	    matrix = m4.translate(matrix, dstX, dstY, 0);

	    if (settings.rotate) {
	        matrix = m4.translate(matrix, -dstX + settings.beforeRotate[0] || 0, -dstY + settings.beforeRotate[1] || 0, 0);
	        matrix = m4.zRotate(matrix, settings.rotate);
	        matrix = m4.translate(matrix, dstX + settings.afterRotate[0] || 0, dstY + settings.afterRotate[1] || 0, 0);
	    }

	    matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

	    gl.uniformMatrix4fv(gl.matrixLocation, false, matrix);

	    if (srcX || srcY || srcWidth !== texWidth || srcHeight !== texHeight) {
	        var texMatrix = m4.translation(srcX / texWidth, srcY / texHeight, 0);
	        texMatrix = m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);
	        gl.uniformMatrix4fv(gl.textureMatrixLocation, false, texMatrix);
	    }

	    // gl.uniform1i(gl.textureLocation, 0);

	    gl.drawArrays(gl.TRIANGLES, 0, 6);
	};

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _m = __webpack_require__(7);

	var _m2 = _interopRequireDefault(_m);

	var _webglUtils = __webpack_require__(4);

	var _webglShaderToggle = __webpack_require__(26);

	var _webglShaderToggle2 = _interopRequireDefault(_webglShaderToggle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var m4 = (0, _m2.default)();

	module.exports = function ($canvas, webgl) {
	    if ((!webgl.colors || !webgl.colors.length) && (!webgl.textures || !webgl.textures.length)) return;

	    var gl = $canvas.$gl;

	    if (webgl.hasAlpha) {
	        gl.disable(gl.DEPTH_TEST);
	        gl.enable(gl.BLEND);
	    } else {
	        gl.enable(gl.DEPTH_TEST);
	        gl.disable(gl.BLEND);
	    }

	    var positionBuffer = webgl.vertices.$cacheBuffer,
	        colorBuffer,
	        texcoordBuffer,
	        indicesBuffer,
	        normalsBuffer,
	        sizeBuffer;

	    if (!positionBuffer) {
	        positionBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, webgl.vertices, gl.STATIC_DRAW);
	        webgl.vertices.$cacheBuffer = positionBuffer;
	    }

	    var colors = gl.eventing ? webgl.$eventFlag : webgl.colors;

	    if (colors) {
	        colorBuffer = colors.$cacheBuffer;
	        if (!colorBuffer) {
	            colorBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
	            colors.$cacheBuffer = colorBuffer;
	        }
	    } else {
	        texcoordBuffer = webgl.textures.$cacheBuffer;
	        if (!texcoordBuffer) {
	            texcoordBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	            gl.bufferData(gl.ARRAY_BUFFER, webgl.textures, gl.STATIC_DRAW);
	            webgl.textures.$cacheBuffer = texcoordBuffer;
	        }
	    }

	    if (webgl.pointSizes) {
	        sizeBuffer = webgl.pointSizes.$cacheBuffer;
	        if (!sizeBuffer) {
	            sizeBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
	            gl.bufferData(gl.ARRAY_BUFFER, webgl.pointSizes, gl.STATIC_DRAW);
	            webgl.pointSizes.$cacheBuffer = sizeBuffer;
	        }
	    }

	    if (webgl.indices) {
	        indicesBuffer = webgl.indices.$cacheBuffer;
	        if (!indicesBuffer) {
	            indicesBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, webgl.indices, gl.STATIC_DRAW);
	            webgl.indices.$cacheBuffer = indicesBuffer;
	        }
	    }

	    if (webgl.normals) {
	        normalsBuffer = webgl.normals.$cacheBuffer;
	        if (!normalsBuffer) {
	            normalsBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
	            gl.bufferData(gl.ARRAY_BUFFER, webgl.normals, gl.STATIC_DRAW);
	            webgl.normals.$cacheBuffer = normalsBuffer;
	        }
	    }

	    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
	    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	    // gl.enable(gl.CULL_FACE);

	    if (colorBuffer) {
	        (0, _webglShaderToggle2.default)(gl, 0, $canvas.webgl.light, webgl.primitive);
	        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	        var step = webgl.hasAlpha && !gl.eventing ? 4 : 3;
	        gl.vertexAttribPointer(gl.colorLocation, step, gl.UNSIGNED_BYTE, true, 0, 0);
	    } else if (texcoordBuffer) {
	        (0, _webglShaderToggle2.default)(gl, 1, $canvas.webgl.light, webgl.primitive);
	        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	        gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);
	    }

	    if (webgl.pointSizes) {
	        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
	        // var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
	        // var offset = 0;        // start at the beginning of the buffer
	        gl.vertexAttribPointer(gl.sizeLocation, 1, gl.FLOAT, false, 0, 0);
	    }

	    if (webgl.vertices) {
	        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	        gl.vertexAttribPointer(gl.positionLocation, 3, gl.FLOAT, false, 0, 0);
	    }

	    if (webgl.normals) {
	        gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
	        gl.vertexAttribPointer(gl.normalLocation, 3, gl.FLOAT, false, 0, 0);
	    }

	    // fudgeFactor改到tick钩子里
	    if ($canvas.webgl.$fudgeFactor) {
	        var fudgeLocation = gl.getUniformLocation(gl.program, "u_fudgeFactor");
	        var fudgeFactor = $canvas.webgl.$fudgeFactor;
	        gl.uniform1f(fudgeLocation, fudgeFactor);
	    }

	    var projectMatrix;

	    if (!$canvas.webgl.$camera) {
	        projectMatrix = gl.orthographic;
	    } else {
	        projectMatrix = $canvas.webgl.$camera.viewProjectionMatrix;
	    }

	    projectMatrix = m4.translate(projectMatrix, webgl.tx || 0, webgl.ty || 0, webgl.tz || 0);
	    webgl.rx && (projectMatrix = m4.xRotate(projectMatrix, (0, _webglUtils.degToRad)(webgl.rx)));
	    webgl.ry && (projectMatrix = m4.yRotate(projectMatrix, (0, _webglUtils.degToRad)(webgl.ry)));
	    webgl.rz && (projectMatrix = m4.zRotate(projectMatrix, (0, _webglUtils.degToRad)(webgl.rz)));
	    projectMatrix = m4.scale(projectMatrix, (webgl.scaleX !== 1 ? webgl.scaleX : webgl.scale) || 1, (webgl.scaleY !== 1 ? webgl.scaleY : webgl.scale) || 1, (webgl.scaleZ !== 1 ? webgl.scaleZ : webgl.scale) || 1);

	    if ($canvas.webgl.light) {
	        // 光照变换
	        gl.uniformMatrix4fv(gl.worldViewProjectionLocation, false, projectMatrix);
	        gl.uniformMatrix4fv(gl.worldInverseTransposeLocation, false, m4.transpose(projectMatrix));
	    }

	    gl.uniformMatrix4fv(gl.matrixLocation, false, projectMatrix);

	    if ($canvas.webgl.light) {
	        var colorLocation = gl.getUniformLocation(gl.program, "a_color");
	        gl.uniform4fv(colorLocation, [1, 1, 1, 1]); // color
	        gl.uniform3fv(gl.reverseLightDirectionLocation, m4.normalize([0, 1, 0]));
	    }

	    // Tell the shader to use texture unit 0 for u_texture
	    gl.uniform1i(gl.textureLocation, 0);

	    var fShaderTypeLocation = gl.getUniformLocation(gl.program, "f_shaderType");
	    gl.uniform1i(fShaderTypeLocation, _utils2.default.firstValuable(webgl.primitive, 2));
	    var vShaderTypeLocation = gl.getUniformLocation(gl.program, "v_shaderType");
	    gl.uniform1i(vShaderTypeLocation, _utils2.default.firstValuable(webgl.primitive, 2));

	    if (indicesBuffer) {
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	        // gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
	        gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
	    } else {
	        gl.drawArrays(webgl.primitive === 0 ? gl.POINTS : gl.TRIANGLES, 0, webgl.vertices.length / 3);
	    }
	};

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	'use strict';

	// @primitive: 0-points
	module.exports = function (type, useLight, primitive) {
	    var shaderString = '\n        precision mediump float;\n\n        ' + (['varying vec4 v_color;', 'varying vec2 v_texcoord;'][type] || '') + '\n\n        uniform sampler2D u_texture;\n\n        ' + (useLight && '\n            varying vec3 v_normal;\n            uniform vec3 u_reverseLightDirection;\n        ' || '') + '\n\n        void main() {\n            ' + (useLight && '\n                vec3 normal = normalize(v_normal);\n                float light = dot(normal, u_reverseLightDirection);\n            ' || '') + '\n\n            ' + (['gl_FragColor = v_color;', 'gl_FragColor = texture2D(u_texture, v_texcoord);'][type] || '') + '\n\n            ' + (primitive === 0 && '\n                float dist = distance( gl_PointCoord, vec2(0.5) );\n                float alpha = 1.0 - smoothstep(0.45,0.5,dist);\n                gl_FragColor.a *= alpha;\n            ' || '') + '\n\n            ' + (useLight && '\n                light += 2.0;\n                light *= 0.5;\n                gl_FragColor.rgb *= light;\n            ' || '') + '\n        }\n    ';

	    return shaderString;
	};

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

	'use strict';

	module.exports = function (type, useLight) {
	    var shaderString = '\n        precision mediump float;\n\n        uniform int f_shaderType;\n\n        ' + (['varying vec4 v_color;', 'varying vec2 v_texcoord;'][type] || '') + '\n\n        uniform sampler2D u_texture;\n\n        ' + (useLight && '\n            varying vec3 v_normal;\n            uniform vec3 u_reverseLightDirection;\n        ' || '') + '\n\n        void main() {\n            ' + (useLight && '\n                vec3 normal = normalize(v_normal);\n                float light = dot(normal, u_reverseLightDirection);\n            ' || '') + '\n\n            ' + (['gl_FragColor = v_color;', 'gl_FragColor = texture2D(u_texture, v_texcoord);'][type] || '') + '\n\n            if (f_shaderType == 0) {\n                float dist = distance( gl_PointCoord, vec2(0.5) );\n                float alpha = 1.0 - smoothstep(0.1,0.5,dist);\n                gl_FragColor.a *= alpha;\n            }\n\n            ' + (useLight && '\n                light += 2.0;\n                light *= 0.5;\n                gl_FragColor.rgb *= light;\n            ' || '') + '\n        }\n    ';

	    return shaderString;
	};

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

	'use strict';

	// @type: 0-color 1-textcoord
	// @primitive: 0-points
	module.exports = function (type, useLight, primitive) {
	    var shaderString = '\n        precision mediump float;\n        attribute vec4 a_position;\n        ' + (['attribute vec4 a_color;', 'attribute vec2 a_texcoord;'][type] || '') + '\n\n        ' + (primitive === 0 && '\n            attribute float u_size; // \u70B9\u7CBE\u7075\u5927\u5C0F\n        ' || '') + '\n\n        ' + (useLight && '\n            attribute vec3 a_normal;\n            uniform mat4 u_worldViewProjection;\n            uniform mat4 u_worldInverseTranspose;\n        ' || '') + '\n\n        uniform float u_fudgeFactor; // \u900F\u5C04\n\n        uniform mat4 u_matrix;\n\n        ' + (['varying vec4 v_color;', 'varying vec2 v_texcoord;'][type] || '') + '\n\n        ' + (useLight && '\n            varying vec3 v_normal;\n        ' || '') + '\n\n        void main() {\n            // Multiply the position by the matrix.\n            // gl_Position = u_matrix * a_position;\n\n            // \u900F\u5C04\n            // \u8C03\u6574\u9664\u6570\n            vec4 position = u_matrix * a_position;\n            // \u7531\u4E8E\u88C1\u51CF\u7A7A\u95F4\u4E2D\u7684 Z \u503C\u662F -1 \u5230 +1 \u7684\uFF0C\u6240\u4EE5 +1 \u662F\u4E3A\u4E86\u8BA9 zToDivideBy \u53D8\u6210 0 \u5230 +2 * fudgeFactor\n            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // \u900F\u5C04\n\n            ' + (useLight ? 'gl_Position = u_worldViewProjection * a_position;' : // 和投射冲突了 TODO
	    'gl_Position = vec4(position.xy / zToDivideBy, position.zw);') + '\n\n            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);\n\n            ' + (['v_color = a_color;', 'v_texcoord = a_texcoord;'][type] || '') + '\n\n            ' + (primitive === 0 && '\n                gl_PointSize = u_size;\n            ' || '') + '\n\n            ' + (useLight && '\n                v_normal = mat3(u_worldInverseTranspose) * a_normal;\n            ' || '') + '\n        }\n    ';

	    return shaderString;
	};

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

	'use strict';

	// @type: 0-color 1-textcoord
	module.exports = function (type, useLight) {
	    var shaderString = '\n        precision mediump float;\n\n        uniform int v_shaderType;\n\n        attribute vec4 a_position;\n        ' + (['attribute vec4 a_color;', 'attribute vec2 a_texcoord;'][type] || '') + '\n\n        attribute float u_size; // \u70B9\u7CBE\u7075\u5927\u5C0F\n\n        ' + (useLight && '\n            attribute vec3 a_normal;\n            uniform mat4 u_worldViewProjection;\n            uniform mat4 u_worldInverseTranspose;\n        ' || '') + '\n\n        uniform float u_fudgeFactor; // \u900F\u5C04\n\n        uniform mat4 u_matrix;\n\n        ' + (['varying vec4 v_color;', 'varying vec2 v_texcoord;'][type] || '') + '\n\n        ' + (useLight && '\n            varying vec3 v_normal;\n        ' || '') + '\n\n        void main() {\n            // Multiply the position by the matrix.\n            // gl_Position = u_matrix * a_position;\n\n            // \u900F\u5C04\n            // \u8C03\u6574\u9664\u6570\n            vec4 position = u_matrix * a_position;\n            // \u7531\u4E8E\u88C1\u51CF\u7A7A\u95F4\u4E2D\u7684 Z \u503C\u662F -1 \u5230 +1 \u7684\uFF0C\u6240\u4EE5 +1 \u662F\u4E3A\u4E86\u8BA9 zToDivideBy \u53D8\u6210 0 \u5230 +2 * fudgeFactor\n            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // \u900F\u5C04\n\n            ' + (useLight ? 'gl_Position = u_worldViewProjection * a_position;' : // 和投射冲突了 TODO
	    'gl_Position = vec4(position.xy / zToDivideBy, position.zw);') + '\n\n            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);\n\n            if (v_shaderType == 0) {\n                gl_PointSize = u_size;\n            } else {\n            }\n\n            ' + (['v_color = a_color;', 'v_texcoord = a_texcoord;'][type] || '') + '\n\n            ' + (useLight && '\n                v_normal = mat3(u_worldInverseTranspose) * a_normal;\n            ' || '') + '\n        }\n    ';

	    return shaderString;
	};

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _webglShadersVertexFactory = __webpack_require__(74);

	var _webglShadersVertexFactory2 = _interopRequireDefault(_webglShadersVertexFactory);

	var _webglShadersVertexFinal = __webpack_require__(75);

	var _webglShadersVertexFinal2 = _interopRequireDefault(_webglShadersVertexFinal);

	var _webglShadersFragmentFactory = __webpack_require__(72);

	var _webglShadersFragmentFactory2 = _interopRequireDefault(_webglShadersFragmentFactory);

	var _webglShadersFragmentFinal = __webpack_require__(73);

	var _webglShadersFragmentFinal2 = _interopRequireDefault(_webglShadersFragmentFinal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    factory: function factory(gl, type) {
	        return type === gl.FRAGMENT_SHADER ? _webglShadersFragmentFactory2.default : _webglShadersVertexFactory2.default;
	    },
	    final: function final(gl, type) {
	        return type === gl.FRAGMENT_SHADER ? _webglShadersFragmentFinal2.default : _webglShadersVertexFinal2.default;
	    }
	};

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _webglUtils = __webpack_require__(4);

	var blockIndices = new Uint16Array([0, 1, 2, 0, 2, 3, // front  
	4, 5, 6, 4, 6, 7, // right  
	8, 9, 10, 8, 10, 11, // up  
	12, 13, 14, 12, 14, 15, // left  
	16, 17, 18, 16, 18, 19, // down  
	20, 21, 22, 20, 22, 23]);

	var blockTextures = new Float32Array((0, _webglUtils.arrayRepeat)([1, 0, 0, 0, 0, 1, 1, 1], 6));

	var TRIANGLE_FAN = 6;

	var regularPolyhedron = {
	    icosahedron: {
	        vertices: [0, 0, -1.902, 0, 0, 1.902, -1.701, 0, -0.8507, 1.701, 0, 0.8507, 1.376, -1.000, -0.8507, 1.376, 1.000, -0.8507, -1.376, -1.000, 0.8507, -1.376, 1.000, 0.8507, -0.5257, -1.618, -0.8507, -0.5257, 1.618, -0.8507, 0.5257, -1.618, 0.8507, 0.5257, 1.618, 0.8507],
	        indices: [[1, 11, 7], [1, 7, 6], [1, 6, 10], [1, 10, 3], [1, 3, 11], [4, 8, 0], [5, 4, 0], [9, 5, 0], [2, 9, 0], [8, 2, 0], [11, 9, 7], [7, 2, 6], [6, 8, 10], [10, 4, 3], [3, 5, 11], [4, 10, 8], [5, 3, 4], [9, 11, 5], [2, 7, 9], [8, 6, 2]]
	    },
	    tetrahedron: {
	        vertices: [0, 0, 1.225, -0.5774, -1.000, -0.4082, -0.5774, 1.000, -0.4082, 1.155, 0, -0.4082],
	        indices: [[1, 2, 3], [2, 1, 0], [3, 0, 1], [0, 3, 2]]
	    },
	    octahedron: { "vertices": [1, 1, 0, 0, 1, 0, 0.9510565162951535, 1, 0.3090169943749474, 0.9510565162951535, 1, 0.3090169943749474, 0, 1, 0, 0.8090169943749475, 1, 0.5877852522924731, 0.8090169943749475, 1, 0.5877852522924731, 0, 1, 0, 0.5877852522924731, 1, 0.8090169943749475, 0.5877852522924731, 1, 0.8090169943749475, 0, 1, 0, 0.30901699437494745, 1, 0.9510565162951535, 0.30901699437494745, 1, 0.9510565162951535, 0, 1, 0, 6.123233995736766e-17, 1, 1, 6.123233995736766e-17, 1, 1, 0, 1, 0, -0.30901699437494734, 1, 0.9510565162951536, -0.30901699437494734, 1, 0.9510565162951536, 0, 1, 0, -0.587785252292473, 1, 0.8090169943749475, -0.587785252292473, 1, 0.8090169943749475, 0, 1, 0, -0.8090169943749473, 1, 0.5877852522924732, -0.8090169943749473, 1, 0.5877852522924732, 0, 1, 0, -0.9510565162951535, 1, 0.3090169943749475, -0.9510565162951535, 1, 0.3090169943749475, 0, 1, 0, -1, 1, 1.2246467991473532e-16, -1, 1, 1.2246467991473532e-16, 0, 1, 0, -0.9510565162951536, 1, -0.3090169943749473, -0.9510565162951536, 1, -0.3090169943749473, 0, 1, 0, -0.8090169943749475, 1, -0.587785252292473, -0.8090169943749475, 1, -0.587785252292473, 0, 1, 0, -0.5877852522924732, 1, -0.8090169943749473, -0.5877852522924732, 1, -0.8090169943749473, 0, 1, 0, -0.30901699437494756, 1, -0.9510565162951535, -0.30901699437494756, 1, -0.9510565162951535, 0, 1, 0, -1.8369701987210297e-16, 1, -1, -1.8369701987210297e-16, 1, -1, 0, 1, 0, 0.30901699437494723, 1, -0.9510565162951536, 0.30901699437494723, 1, -0.9510565162951536, 0, 1, 0, 0.5877852522924729, 1, -0.8090169943749476, 0.5877852522924729, 1, -0.8090169943749476, 0, 1, 0, 0.8090169943749473, 1, -0.5877852522924734, 0.8090169943749473, 1, -0.5877852522924734, 0, 1, 0, 0.9510565162951535, 1, -0.3090169943749476, 0.9510565162951535, 1, -0.3090169943749476, 0, 1, 0, 1, 1, -2.4492935982947064e-16, 0.9510565162951535, -1, 0.3090169943749474, 0, -1, 0, 1, -1, 0, 0.8090169943749475, -1, 0.5877852522924731, 0, -1, 0, 0.9510565162951535, -1, 0.3090169943749474, 0.5877852522924731, -1, 0.8090169943749475, 0, -1, 0, 0.8090169943749475, -1, 0.5877852522924731, 0.30901699437494745, -1, 0.9510565162951535, 0, -1, 0, 0.5877852522924731, -1, 0.8090169943749475, 6.123233995736766e-17, -1, 1, 0, -1, 0, 0.30901699437494745, -1, 0.9510565162951535, -0.30901699437494734, -1, 0.9510565162951536, 0, -1, 0, 6.123233995736766e-17, -1, 1, -0.587785252292473, -1, 0.8090169943749475, 0, -1, 0, -0.30901699437494734, -1, 0.9510565162951536, -0.8090169943749473, -1, 0.5877852522924732, 0, -1, 0, -0.587785252292473, -1, 0.8090169943749475, -0.9510565162951535, -1, 0.3090169943749475, 0, -1, 0, -0.8090169943749473, -1, 0.5877852522924732, -1, -1, 1.2246467991473532e-16, 0, -1, 0, -0.9510565162951535, -1, 0.3090169943749475, -0.9510565162951536, -1, -0.3090169943749473, 0, -1, 0, -1, -1, 1.2246467991473532e-16, -0.8090169943749475, -1, -0.587785252292473, 0, -1, 0, -0.9510565162951536, -1, -0.3090169943749473, -0.5877852522924732, -1, -0.8090169943749473, 0, -1, 0, -0.8090169943749475, -1, -0.587785252292473, -0.30901699437494756, -1, -0.9510565162951535, 0, -1, 0, -0.5877852522924732, -1, -0.8090169943749473, -1.8369701987210297e-16, -1, -1, 0, -1, 0, -0.30901699437494756, -1, -0.9510565162951535, 0.30901699437494723, -1, -0.9510565162951536, 0, -1, 0, -1.8369701987210297e-16, -1, -1, 0.5877852522924729, -1, -0.8090169943749476, 0, -1, 0, 0.30901699437494723, -1, -0.9510565162951536, 0.8090169943749473, -1, -0.5877852522924734, 0, -1, 0, 0.5877852522924729, -1, -0.8090169943749476, 0.9510565162951535, -1, -0.3090169943749476, 0, -1, 0, 0.8090169943749473, -1, -0.5877852522924734, 1, -1, -2.4492935982947064e-16, 0, -1, 0, 0.9510565162951535, -1, -0.3090169943749476, 1, 1, 0, 0.9510565162951535, 1, 0.3090169943749474, 0.9510565162951535, -1, 0.3090169943749474, 1, 1, 0, 0.9510565162951535, -1, 0.3090169943749474, 1, -1, 0, 0.9510565162951535, 1, 0.3090169943749474, 0.8090169943749475, 1, 0.5877852522924731, 0.8090169943749475, -1, 0.5877852522924731, 0.9510565162951535, 1, 0.3090169943749474, 0.8090169943749475, -1, 0.5877852522924731, 0.9510565162951535, -1, 0.3090169943749474, 0.8090169943749475, 1, 0.5877852522924731, 0.5877852522924731, 1, 0.8090169943749475, 0.5877852522924731, -1, 0.8090169943749475, 0.8090169943749475, 1, 0.5877852522924731, 0.5877852522924731, -1, 0.8090169943749475, 0.8090169943749475, -1, 0.5877852522924731, 0.5877852522924731, 1, 0.8090169943749475, 0.30901699437494745, 1, 0.9510565162951535, 0.30901699437494745, -1, 0.9510565162951535, 0.5877852522924731, 1, 0.8090169943749475, 0.30901699437494745, -1, 0.9510565162951535, 0.5877852522924731, -1, 0.8090169943749475, 0.30901699437494745, 1, 0.9510565162951535, 6.123233995736766e-17, 1, 1, 6.123233995736766e-17, -1, 1, 0.30901699437494745, 1, 0.9510565162951535, 6.123233995736766e-17, -1, 1, 0.30901699437494745, -1, 0.9510565162951535, 6.123233995736766e-17, 1, 1, -0.30901699437494734, 1, 0.9510565162951536, -0.30901699437494734, -1, 0.9510565162951536, 6.123233995736766e-17, 1, 1, -0.30901699437494734, -1, 0.9510565162951536, 6.123233995736766e-17, -1, 1, -0.30901699437494734, 1, 0.9510565162951536, -0.587785252292473, 1, 0.8090169943749475, -0.587785252292473, -1, 0.8090169943749475, -0.30901699437494734, 1, 0.9510565162951536, -0.587785252292473, -1, 0.8090169943749475, -0.30901699437494734, -1, 0.9510565162951536, -0.587785252292473, 1, 0.8090169943749475, -0.8090169943749473, 1, 0.5877852522924732, -0.8090169943749473, -1, 0.5877852522924732, -0.587785252292473, 1, 0.8090169943749475, -0.8090169943749473, -1, 0.5877852522924732, -0.587785252292473, -1, 0.8090169943749475, -0.8090169943749473, 1, 0.5877852522924732, -0.9510565162951535, 1, 0.3090169943749475, -0.9510565162951535, -1, 0.3090169943749475, -0.8090169943749473, 1, 0.5877852522924732, -0.9510565162951535, -1, 0.3090169943749475, -0.8090169943749473, -1, 0.5877852522924732, -0.9510565162951535, 1, 0.3090169943749475, -1, 1, 1.2246467991473532e-16, -1, -1, 1.2246467991473532e-16, -0.9510565162951535, 1, 0.3090169943749475, -1, -1, 1.2246467991473532e-16, -0.9510565162951535, -1, 0.3090169943749475, -1, 1, 1.2246467991473532e-16, -0.9510565162951536, 1, -0.3090169943749473, -0.9510565162951536, -1, -0.3090169943749473, -1, 1, 1.2246467991473532e-16, -0.9510565162951536, -1, -0.3090169943749473, -1, -1, 1.2246467991473532e-16, -0.9510565162951536, 1, -0.3090169943749473, -0.8090169943749475, 1, -0.587785252292473, -0.8090169943749475, -1, -0.587785252292473, -0.9510565162951536, 1, -0.3090169943749473, -0.8090169943749475, -1, -0.587785252292473, -0.9510565162951536, -1, -0.3090169943749473, -0.8090169943749475, 1, -0.587785252292473, -0.5877852522924732, 1, -0.8090169943749473, -0.5877852522924732, -1, -0.8090169943749473, -0.8090169943749475, 1, -0.587785252292473, -0.5877852522924732, -1, -0.8090169943749473, -0.8090169943749475, -1, -0.587785252292473, -0.5877852522924732, 1, -0.8090169943749473, -0.30901699437494756, 1, -0.9510565162951535, -0.30901699437494756, -1, -0.9510565162951535, -0.5877852522924732, 1, -0.8090169943749473, -0.30901699437494756, -1, -0.9510565162951535, -0.5877852522924732, -1, -0.8090169943749473, -0.30901699437494756, 1, -0.9510565162951535, -1.8369701987210297e-16, 1, -1, -1.8369701987210297e-16, -1, -1, -0.30901699437494756, 1, -0.9510565162951535, -1.8369701987210297e-16, -1, -1, -0.30901699437494756, -1, -0.9510565162951535, -1.8369701987210297e-16, 1, -1, 0.30901699437494723, 1, -0.9510565162951536, 0.30901699437494723, -1, -0.9510565162951536, -1.8369701987210297e-16, 1, -1, 0.30901699437494723, -1, -0.9510565162951536, -1.8369701987210297e-16, -1, -1, 0.30901699437494723, 1, -0.9510565162951536, 0.5877852522924729, 1, -0.8090169943749476, 0.5877852522924729, -1, -0.8090169943749476, 0.30901699437494723, 1, -0.9510565162951536, 0.5877852522924729, -1, -0.8090169943749476, 0.30901699437494723, -1, -0.9510565162951536, 0.5877852522924729, 1, -0.8090169943749476, 0.8090169943749473, 1, -0.5877852522924734, 0.8090169943749473, -1, -0.5877852522924734, 0.5877852522924729, 1, -0.8090169943749476, 0.8090169943749473, -1, -0.5877852522924734, 0.5877852522924729, -1, -0.8090169943749476, 0.8090169943749473, 1, -0.5877852522924734, 0.9510565162951535, 1, -0.3090169943749476, 0.9510565162951535, -1, -0.3090169943749476, 0.8090169943749473, 1, -0.5877852522924734, 0.9510565162951535, -1, -0.3090169943749476, 0.8090169943749473, -1, -0.5877852522924734, 0.9510565162951535, 1, -0.3090169943749476, 1, 1, -2.4492935982947064e-16, 1, -1, -2.4492935982947064e-16, 0.9510565162951535, 1, -0.3090169943749476, 1, -1, -2.4492935982947064e-16, 0.9510565162951535, -1, -0.3090169943749476], "indices": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239], "normals": [0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997885, 0, 0, -3.2360679774997885, 0, 0, -3.2360679774997885, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 1.578437878668761, 0, 0.2500000000000002, 1.578437878668761, 0, 0.2500000000000002, 1.578437878668761, 0, 0.2500000000000002, 1.578437878668761, 0, 0.2500000000000002, 1.578437878668761, 0, 0.2500000000000002, 1.578437878668761, 0, 0.2500000000000002, 1.4239293814812872, 0, 0.7255282581475765, 1.4239293814812872, 0, 0.7255282581475765, 1.4239293814812872, 0, 0.7255282581475765, 1.4239293814812872, 0, 0.7255282581475765, 1.4239293814812872, 0, 0.7255282581475765, 1.4239293814812872, 0, 0.7255282581475765, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 0.7255282581475766, 0, 1.4239293814812874, 0.7255282581475766, 0, 1.4239293814812874, 0.7255282581475766, 0, 1.4239293814812874, 0.7255282581475766, 0, 1.4239293814812874, 0.7255282581475766, 0, 1.4239293814812874, 0.7255282581475766, 0, 1.4239293814812874, 0.2500000000000002, 0, 1.578437878668761, 0.2500000000000002, 0, 1.578437878668761, 0.2500000000000002, 0, 1.578437878668761, 0.2500000000000002, 0, 1.578437878668761, 0.2500000000000002, 0, 1.578437878668761, 0.2500000000000002, 0, 1.578437878668761, -0.2499999999999997, 0, 1.578437878668761, -0.2499999999999997, 0, 1.578437878668761, -0.2499999999999997, 0, 1.578437878668761, -0.2499999999999997, 0, 1.578437878668761, -0.2499999999999997, 0, 1.578437878668761, -0.2499999999999997, 0, 1.578437878668761, -0.725528258147577, 0, 1.423929381481287, -0.725528258147577, 0, 1.423929381481287, -0.725528258147577, 0, 1.423929381481287, -0.725528258147577, 0, 1.423929381481287, -0.725528258147577, 0, 1.423929381481287, -0.725528258147577, 0, 1.423929381481287, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.4239293814812868, 0, 0.7255282581475768, -1.4239293814812868, 0, 0.7255282581475768, -1.4239293814812868, 0, 0.7255282581475768, -1.4239293814812868, 0, 0.7255282581475768, -1.4239293814812868, 0, 0.7255282581475768, -1.4239293814812868, 0, 0.7255282581475768, -1.578437878668761, 0, 0.2500000000000002, -1.578437878668761, 0, 0.2500000000000002, -1.578437878668761, 0, 0.2500000000000002, -1.578437878668761, 0, 0.2500000000000002, -1.578437878668761, 0, 0.2500000000000002, -1.578437878668761, 0, 0.2500000000000002, -1.578437878668761, 0, -0.2499999999999997, -1.578437878668761, 0, -0.2499999999999997, -1.578437878668761, 0, -0.2499999999999997, -1.578437878668761, 0, -0.2499999999999997, -1.578437878668761, 0, -0.2499999999999997, -1.578437878668761, 0, -0.2499999999999997, -1.4239293814812868, 0, -0.7255282581475768, -1.4239293814812868, 0, -0.7255282581475768, -1.4239293814812868, 0, -0.7255282581475768, -1.4239293814812868, 0, -0.7255282581475768, -1.4239293814812868, 0, -0.7255282581475768, -1.4239293814812868, 0, -0.7255282581475768, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -0.725528258147577, 0, -1.423929381481287, -0.725528258147577, 0, -1.423929381481287, -0.725528258147577, 0, -1.423929381481287, -0.725528258147577, 0, -1.423929381481287, -0.725528258147577, 0, -1.423929381481287, -0.725528258147577, 0, -1.423929381481287, -0.2500000000000002, 0, -1.578437878668761, -0.2500000000000002, 0, -1.578437878668761, -0.2500000000000002, 0, -1.578437878668761, -0.2500000000000002, 0, -1.578437878668761, -0.2500000000000002, 0, -1.578437878668761, -0.2500000000000002, 0, -1.578437878668761, 0.2499999999999997, 0, -1.578437878668761, 0.2499999999999997, 0, -1.578437878668761, 0.2499999999999997, 0, -1.578437878668761, 0.2499999999999997, 0, -1.578437878668761, 0.2499999999999997, 0, -1.578437878668761, 0.2499999999999997, 0, -1.578437878668761, 0.7255282581475766, 0, -1.4239293814812874, 0.7255282581475766, 0, -1.4239293814812874, 0.7255282581475766, 0, -1.4239293814812874, 0.7255282581475766, 0, -1.4239293814812874, 0.7255282581475766, 0, -1.4239293814812874, 0.7255282581475766, 0, -1.4239293814812874, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.4239293814812868, 0, -0.7255282581475768, 1.4239293814812868, 0, -0.7255282581475768, 1.4239293814812868, 0, -0.7255282581475768, 1.4239293814812868, 0, -0.7255282581475768, 1.4239293814812868, 0, -0.7255282581475768, 1.4239293814812868, 0, -0.7255282581475768, 1.578437878668761, 0, -0.2500000000000002, 1.578437878668761, 0, -0.2500000000000002, 1.578437878668761, 0, -0.2500000000000002, 1.578437878668761, 0, -0.2500000000000002, 1.578437878668761, 0, -0.2500000000000002, 1.578437878668761, 0, -0.2500000000000002] },
	    cube: {
	        vertices: [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1],
	        indices: [[7, 3, 1, 5], [7, 5, 4, 6], [7, 6, 2, 3], [3, 2, 0, 1], [0, 2, 6, 4], [1, 0, 4, 5]]
	    }

	};

	var createShapeWithCachedArray = function () {
	    var cachePool = {};

	    return function (shape, args) {
	        var colors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	        var key = shape + args.join(',') + colors.join(',');

	        var result = {};

	        if (shape === 'quadrilateral') {
	            // var vertices = cachePool[key + 'v'] || new Float32Array([
	            //     0, 0, 0,
	            //     200, 0, 0,
	            //     0, 100, 0,

	            //     0, 100, 0,
	            //     200, 0, 0,
	            //     400, 100, 0,
	            // ]);

	            // var longSide = cachePool[key + 'l'] || Math.max(Math.max.apply(this, vertices), -Math.min.apply(this, vertices));

	            // result.vertices = cachePool[key + 'v'] = vertices;
	            // result.textures = new Float32Array(arrayRepeat([
	            //     0, 0,
	            //     1, 0,
	            //     0, 1,
	            //     0, 1,
	            //     1, 0,
	            //     1, 1,
	            // ], 1));
	            // result.longSide = cachePool[key + 'l'] = longSide;
	        } else if (shape === 'block') {
	            var a = args[0] / 2;
	            var b = args[1] / 2;
	            var c = args[2] / 2;

	            var vertices = cachePool[key + 'v'] || new Float32Array([a, b, c, -a, b, c, -a, -b, c, a, -b, c, a, b, c, a, -b, c, a, -b, -c, a, b, -c, a, b, c, a, b, -c, -a, b, -c, -a, b, c, -a, b, c, -a, b, -c, -a, -b, -c, -a, -b, c, -a, -b, -c, a, -b, -c, a, -b, c, -a, -b, c, a, -b, -c, -a, -b, -c, -a, b, -c, a, b, -c]);

	            var longSide = cachePool[key + 'l'] || Math.max(Math.max.apply(undefined, vertices), -Math.min.apply(undefined, vertices));

	            result.vertices = cachePool[key + 'v'] = vertices;
	            result.indices = blockIndices;
	            result.textures = blockTextures;
	            result.longSide = cachePool[key + 'l'] = longSide;
	        } else if (shape === 'ball') {
	            // ball
	            var vertexPositionData = cachePool[key + 'v'] || [];
	            var indexData = cachePool[key + 'i'] || [];
	            var textureCoordData = cachePool[key + 't'] || [];

	            if (!vertexPositionData.length) {
	                var normalData = [];
	                var radius = args[0];
	                var latitudeBands = args[1],
	                    longitudeBands = args[2];

	                for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
	                    var theta = latNumber * Math.PI / latitudeBands;
	                    var sinTheta = Math.sin(theta);
	                    var cosTheta = Math.cos(theta);

	                    for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
	                        var phi = longNumber * 2 * Math.PI / longitudeBands;
	                        var sinPhi = Math.sin(phi);
	                        var cosPhi = Math.cos(phi);

	                        var x = cosPhi * sinTheta;
	                        var y = cosTheta;
	                        var z = sinPhi * sinTheta;
	                        var u = 1 - longNumber / longitudeBands;
	                        var v = 1 - latNumber / latitudeBands;

	                        normalData.push(x);
	                        normalData.push(y);
	                        normalData.push(z);
	                        textureCoordData.push(u);
	                        textureCoordData.push(v);
	                        vertexPositionData.push(radius * x);
	                        vertexPositionData.push(radius * y);
	                        vertexPositionData.push(radius * z);
	                    }
	                }

	                for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
	                    for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
	                        var first = latNumber * (longitudeBands + 1) + longNumber;
	                        var second = first + longitudeBands + 1;
	                        indexData.push(first);
	                        indexData.push(second);
	                        indexData.push(first + 1);

	                        indexData.push(second);
	                        indexData.push(second + 1);
	                        indexData.push(first + 1);
	                    }
	                }

	                cachePool[key + 'v'] = new Float32Array(vertexPositionData);
	                cachePool[key + 'i'] = new Uint16Array(indexData);
	                cachePool[key + 't'] = new Float32Array(textureCoordData);
	                cachePool[key + 'l'] = Math.max(Math.max.apply(undefined, vertices), -Math.min.apply(undefined, vertexPositionData));
	            }

	            result.vertices = cachePool[key + 'v'];
	            result.indices = cachePool[key + 'i'];
	            result.textures = cachePool[key + 't'];
	            result.longSide = cachePool[key + 'l'];
	            // } else if (shape === 'icosahedron') {
	        } else {
	            var vertices = cachePool[key + 'v'] || new Float32Array(regularPolyhedron[shape].vertices.map(function (v) {
	                return v * args[0] / 2;
	            }));

	            var longSide = cachePool[key + 'l'] || Math.max(Math.max.apply(undefined, vertices), -Math.min.apply(undefined, vertices));

	            result.vertices = cachePool[key + 'v'] = vertices;
	            result.indices = new Uint16Array(regularPolyhedron[shape].indices.join(',').split(','));

	            result.textures = cachePool[key + 't'];
	            if (!result.textures) {
	                result.textures = [];
	                for (var i = 0; i < result.indices.length; i++) {
	                    result.textures.push(Math.random().toFixed(2));
	                }
	                result.textures = cachePool[key + 't'] = new Float32Array(result.textures);
	            }

	            result.longSide = cachePool[key + 'l'] = longSide;
	        }

	        if (colors.length) {
	            // 优先走缓存
	            result.colors = cachePool[key + 'c'];

	            if (!result.colors) {
	                // var colorRepeatTimes = result.vertices.length / colors.length;
	                var colorRepeatTimes = (result.indices || result.vertices).length * (result.indices ? 3 : 1) / colors.length;
	                result.colors = new Uint8Array((0, _webglUtils.arrayRepeat)(colors, Math.ceil(colorRepeatTimes)));

	                cachePool[key + 'c'] = result.colors;
	            }
	        }

	        return result;
	    };
	}();

	var wrapper = function wrapper(structure, opt) {
	    for (var key in opt) {
	        if (!structure[key]) {
	            structure[key] = opt[key];
	        }
	    }

	    return structure;
	};

	var appendEventFlag = function () {
	    var current = 0;

	    return function (shape) {
	        if (!current) {
	            current++;
	        }

	        var colorRepeatTimes = (shape.indices || shape.vertices).length * (shape.indices ? 3 : 1) / 3;
	        shape.$eventFlag = new Uint8Array((0, _webglUtils.arrayRepeat)([current % 256, Math.floor(current / 256) % 256, Math.floor(current / 65536) % 256], Math.ceil(colorRepeatTimes)));

	        current++;

	        return shape;
	    };
	}();

	var err = function err(msg) {
	    console.error('[Easycanvas-webgl] ' + msg);
	};

	var webglShapes = {
	    block: function block(opt) {
	        var structure = createShapeWithCachedArray('block', [opt.a, opt.b, opt.c], opt.colors);
	        return appendEventFlag(wrapper(structure, opt));
	    },

	    quadrilateral: function quadrilateral(opt) {
	        var structure = createShapeWithCachedArray('quadrilateral', [opt.a, opt.b, opt.c], opt.colors);
	        return appendEventFlag(wrapper(structure, opt));
	    },

	    ball: function ball(opt) {
	        var structure = createShapeWithCachedArray('ball', [opt.r, opt.b || opt.lat || 20, opt.b || opt.lng || 20], opt.colors);
	        return appendEventFlag(wrapper(structure, opt));
	    },

	    custom: function custom(opt) {
	        // if (process.env.NODE_ENV !== 'production') {
	        //     if (!opt.vertices || !opt.vertices.length) {
	        //         err('No vertices provided on custom shape.');
	        //         // console.log(opt);
	        //         // return;
	        //     }
	        // }

	        if (!opt.vertices.$cache) {
	            // 确保复用Float32Array类型的vertices
	            // 一个模型含有多个children时，使用相同的vertices的Buffer，提升效率
	            opt.vertices.$cache = new Float32Array(opt.vertices);
	        }

	        if (opt.normals && opt.normals.length) {
	            if (!opt.normals.$cache) {
	                opt.normals.$cache = new Float32Array(opt.normals);
	            }
	        }

	        if (opt.indices && opt.indices.length) {
	            if (!opt.indices.$cache) {
	                opt.indices.$cache = new Uint16Array(opt.indices);
	            }
	        }

	        if (opt.textures && opt.textures.length) {
	            if (!opt.textures.$cache) {
	                var repeatTimes = opt.vertices.length / opt.textures.length / 1.5;
	                opt.textures.$cache = new Float32Array((0, _webglUtils.arrayRepeat)(opt.textures, repeatTimes));
	            }
	        }

	        if (opt.colors && opt.colors.length) {
	            if (!opt.colors.$cache) {
	                // 没有透明度时，colors和vertices都是长度为3的数组，一一对应，总长度相同
	                var repeatTimes = opt.vertices.length / opt.colors.length;

	                if (opt.hasAlpha) {
	                    repeatTimes = repeatTimes / 3 * 4;
	                }

	                opt.colors.$cache = new Uint8Array((0, _webglUtils.arrayRepeat)(opt.colors, repeatTimes));
	            }
	        }

	        var res = _extends(opt, {
	            vertices: opt.vertices.$cache,
	            normals: opt.normals ? opt.normals.$cache : undefined,
	            indices: opt.indices ? opt.indices.$cache : undefined,
	            textures: opt.textures ? opt.textures.$cache : undefined,
	            colors: opt.colors ? opt.colors.$cache : undefined
	        });

	        return appendEventFlag(res);
	    }

	    // icosahedron: function (opt) {
	    //     var structure = createShapeWithCachedArray('icosahedron', [opt.r], opt.colors);
	    //     return wrapper(structure, opt);
	    // },
	};

	var _loop = function _loop(shape) {
	    webglShapes[shape] = function (opt) {
	        var structure = createShapeWithCachedArray(shape, [opt.r], opt.colors);
	        structure.type = TRIANGLE_FAN;
	        return appendEventFlag(wrapper(structure, opt));
	    };
	};

	for (var shape in regularPolyhedron) {
	    _loop(shape);
	}

	module.exports = webglShapes;

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _webglInitOnEvent = __webpack_require__(66);

	var _webglInitOnEvent2 = _interopRequireDefault(_webglInitOnEvent);

	var _webglInitOnUse = __webpack_require__(69);

	var _webglInitOnUse2 = _interopRequireDefault(_webglInitOnUse);

	var _webglInitOnCreate = __webpack_require__(65);

	var _webglInitOnCreate2 = _interopRequireDefault(_webglInitOnCreate);

	var _webglInitOnPaint = __webpack_require__(67);

	var _webglInitOnPaint2 = _interopRequireDefault(_webglInitOnPaint);

	var _webglInitOnRender = __webpack_require__(68);

	var _webglInitOnRender2 = _interopRequireDefault(_webglInitOnRender);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var inBrowser = typeof window !== 'undefined'; /** ********** *
	                                                *
	                                                * Support webgl rendering
	                                                * - Usage: set {webgl: true} in config on registering your canvas instance.
	                                                *
	                                                * ********** **/

	var plugin = {
	    onCreate: _webglInitOnCreate2.default,
	    onPaint: _webglInitOnPaint2.default,
	    onRender: _webglInitOnRender2.default,
	    onUse: _webglInitOnUse2.default,
	    onEvent: _webglInitOnEvent2.default
	};

	if (inBrowser && window.Easycanvas) {
	    Easycanvas.use(plugin);
	} else {
	    module.exports = plugin;
	}

/***/ })

/******/ })
});
;