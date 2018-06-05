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

	module.exports = __webpack_require__(49);


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

/***/ 3:
/***/ (function(module, exports) {

	"use strict";

	var PI = 3.141593;

	module.exports = function (x, y, rx0, ry0, d, returnArr) {
	    var deg = d ? -d / 180 * PI : 0;
	    var _x = (x - rx0) * Math.cos(deg) - (y - ry0) * Math.sin(deg) + rx0;
	    var _y = (x - rx0) * Math.sin(deg) + (y - ry0) * Math.cos(deg) + ry0;

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

/***/ 20:
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

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _m = __webpack_require__(20);

	var _m2 = _interopRequireDefault(_m);

	var _webglShapes = __webpack_require__(50);

	var _webglShapes2 = _interopRequireDefault(_webglShapes);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _math = __webpack_require__(52);

	var _math2 = _interopRequireDefault(_math);

	var _img2base = __webpack_require__(4);

	var _img2base2 = _interopRequireDefault(_img2base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var m4 = (0, _m2.default)(); /** ********** *
	                              *
	                              * Support webgl rendering
	                              * - Usage: set {webgl: true} in config on registering your canvas instance.
	                              *
	                              * ********** **/

	var inBrowser = typeof window !== 'undefined';

	var err = function err(msg) {
	    console.error('[Easycanvas-webgl] ' + msg);
	};

	var Shader_Vertex_Color = '\n    attribute vec4 a_position;\n    attribute vec4 a_color;\n    uniform float u_fudgeFactor; // \u900F\u5C04\n\n    uniform mat4 u_matrix;\n\n    varying vec4 v_color;\n\n    void main() {\n        // Multiply the position by the matrix.\n        // gl_Position = u_matrix * a_position;\n\n        // \u900F\u5C04\n        // \u8C03\u6574\u9664\u6570\n        vec4 position = u_matrix * a_position;\n        // \u7531\u4E8E\u88C1\u51CF\u7A7A\u95F4\u4E2D\u7684 Z \u503C\u662F -1 \u5230 +1 \u7684\uFF0C\u6240\u4EE5 +1 \u662F\u4E3A\u4E86\u8BA9 zToDivideBy \u53D8\u6210 0 \u5230 +2 * fudgeFactor\n        float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // \u900F\u5C04\n        gl_Position = vec4(position.xy / zToDivideBy, position.zw);\n\n        v_color = a_color;\n    }\n';
	var Shader_Vertex_Textcoord = '\n    attribute vec4 a_position;\n    attribute vec2 a_texcoord;\n    uniform float u_fudgeFactor; // \u900F\u5C04\n\n    uniform mat4 u_matrix;\n\n    varying vec2 v_texcoord;\n\n    void main() {\n        // Multiply the position by the matrix.\n        // gl_Position = u_matrix * a_position;\n\n        // \u900F\u5C04\n        // \u8C03\u6574\u9664\u6570\n        vec4 position = u_matrix * a_position;\n        // \u7531\u4E8E\u88C1\u51CF\u7A7A\u95F4\u4E2D\u7684 Z \u503C\u662F -1 \u5230 +1 \u7684\uFF0C\u6240\u4EE5 +1 \u662F\u4E3A\u4E86\u8BA9 zToDivideBy \u53D8\u6210 0 \u5230 +2 * fudgeFactor\n        float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // \u900F\u5C04\n        gl_Position = vec4(position.xy / zToDivideBy, position.zw);\n\n        v_texcoord = a_texcoord;\n    }\n';

	var Shader_Fragment_Textcoord = '\n    precision mediump float;\n\n    varying vec2 v_texcoord;\n\n    uniform sampler2D u_texture;\n\n    void main() {\n       gl_FragColor = texture2D(u_texture, v_texcoord);\n    }\n';
	var Shader_Fragment_Color = '\n    precision mediump float;\n\n    varying vec4 v_color;\n\n    uniform sampler2D u_texture;\n\n    void main() {\n       gl_FragColor = v_color;\n    }\n';

	var createShader = function () {
	    var shaderCachePool = {};

	    return function (gl, sourceCode, type) {
	        if (shaderCachePool[sourceCode]) {
	            return shaderCachePool[sourceCode];
	        }

	        // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
	        var shader = gl.createShader(type);
	        gl.shaderSource(shader, sourceCode);
	        gl.compileShader(shader);

	        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	            var info = gl.getShaderInfoLog(shader);
	            throw 'Could not compile WebGL program. \n\n' + info;
	        }

	        shaderCachePool[sourceCode] = shader;
	        return shader;
	    };
	}();

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
	var toggleShader = function () {
	    var lastType;

	    return function (gl, type) {
	        if (lastType === type) return;

	        lastType = type;

	        var shaderVertexColor, shaderFragmentColor;
	        if (type === 0) {
	            shaderVertexColor = createShader(gl, Shader_Vertex_Color, gl.VERTEX_SHADER);
	            shaderFragmentColor = createShader(gl, Shader_Fragment_Color, gl.FRAGMENT_SHADER);
	        } else {
	            shaderVertexColor = createShader(gl, Shader_Vertex_Textcoord, gl.VERTEX_SHADER);
	            shaderFragmentColor = createShader(gl, Shader_Fragment_Textcoord, gl.FRAGMENT_SHADER);
	        }

	        gl.program = createProgram(gl, shaderVertexColor, shaderFragmentColor);

	        gl.useProgram(gl.program);

	        // look up where the vertex data needs to go.
	        gl.positionLocation = gl.getAttribLocation(gl.program, 'a_position');
	        if (type === 0) {
	            gl.colorLocation = gl.getAttribLocation(gl.program, 'a_color');
	        } else {
	            gl.texcoordLocation = gl.getAttribLocation(gl.program, 'a_texcoord');
	        }

	        // lookup uniforms
	        gl.matrixLocation = gl.getUniformLocation(gl.program, 'u_matrix');
	        if (type === 0) {
	            gl.textureLocation = gl.getUniformLocation(gl.program, 'u_texture');
	        } else {
	            gl.textureMatrixLocation = gl.getUniformLocation(gl.program, 'u_textureMatrix');
	        }

	        gl.enableVertexAttribArray(gl.positionLocation);
	        gl.enableVertexAttribArray(gl.texcoordLocation);
	        gl.enableVertexAttribArray(gl.colorLocation);
	    };
	}();

	var textCachePool = {};
	var webglRender = function webglRender($sprite, settings, $canvas) {
	    var props = $sprite.props;
	    var webgl = $sprite.webgl;
	    var gl = $canvas.$gl;

	    // if (process.env.NODE_ENV !== 'production') {
	    //     if (!props[0] || !props[0].texture) {
	    //         err('Texture not found, make sure using Painter.imgLoader instead of Easycanvas.imgLoader.')
	    //     }
	    // }

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
	            webglRender2d($canvas, props[0].texture, props[0].width, props[0].height, props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], settings);
	        }
	    } else if ($sprite.type === '3d' && (webgl.img || webgl.colors)) {
	        if (webgl.img && webgl.img.texture) {
	            gl.bindTexture(gl.TEXTURE_2D, webgl.img.texture);
	        }
	        // loading img
	        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
	        // 跳过绘制
	        var longSide = webgl.longSide * 1.8; // 三维根号3
	        var depth = $canvas.webgl.depth;
	        var meet = (0, _math2.default)(webgl.tx - longSide, webgl.ty - longSide, longSide * 2, longSide * 2, webgl.tz / depth * $canvas.width / 2, webgl.tz / depth * $canvas.height / 2, $canvas.width - webgl.tz / depth * $canvas.width / 2, $canvas.height - webgl.tz / depth * $canvas.height / 2, 0, 0, 0);
	        if (!meet) {
	            // console.log('miss');
	            return;
	        }

	        webglRender3d($canvas, webgl);
	    }
	};

	function degToRad(d) {
	    return d * Math.PI / 180;
	}

	var webglRender3d = function webglRender3d($canvas, webgl) {
	    if ((!webgl.colors || !webgl.colors.length) && (!webgl.textures || !webgl.textures.length)) return;

	    var gl = $canvas.$gl;

	    gl.disable(gl.BLEND);
	    gl.enable(gl.DEPTH_TEST);

	    var positionBuffer = webgl.vertices.$cacheBuffer,
	        colorBuffer,
	        texcoordBuffer,
	        indicesBuffer;

	    if (!positionBuffer) {
	        positionBuffer = gl.createBuffer();
	        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	        // Put the positions in the buffer
	        gl.bufferData(gl.ARRAY_BUFFER, webgl.vertices, gl.STATIC_DRAW);
	        webgl.vertices.$cacheBuffer = positionBuffer;
	    }

	    if (webgl.colors) {
	        colorBuffer = webgl.colors.$cacheBuffer;
	        if (!colorBuffer) {
	            colorBuffer = gl.createBuffer();
	            // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
	            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	            // color buffer
	            gl.bufferData(gl.ARRAY_BUFFER, webgl.colors, gl.STATIC_DRAW);
	            webgl.colors.$cacheBuffer = colorBuffer;
	        }
	    } else {
	        texcoordBuffer = webgl.textures.$cacheBuffer;
	        if (!texcoordBuffer) {
	            // provide texture coordinates for the rectangle.
	            texcoordBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	            // Set Texcoords.
	            gl.bufferData(gl.ARRAY_BUFFER, webgl.textures, gl.STATIC_DRAW);
	            webgl.textures.$cacheBuffer = texcoordBuffer;
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

	    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
	    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	    // gl.enable(gl.CULL_FACE);

	    if (colorBuffer) {
	        toggleShader(gl, 0);
	        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	        var size = 3; // 3 components per iteration
	        var type = gl.UNSIGNED_BYTE; // the data is 8bit unsigned values
	        var normalize = true; // normalize the data (convert from 0-255 to 0-1)
	        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
	        var offset = 0; // start at the beginning of the buffer
	        gl.vertexAttribPointer(gl.colorLocation, size, type, normalize, stride, offset);
	    } else if (texcoordBuffer) {
	        toggleShader(gl, 1);
	        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	        var size = 2; // 2 components per iteration
	        var type = gl.FLOAT; // the data is 32bit floats
	        var normalize = false; // don't normalize the data
	        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
	        var offset = 0; // start at the beginning of the buffer
	        gl.vertexAttribPointer(gl.texcoordLocation, size, type, normalize, stride, offset);
	    }

	    if (webgl.vertices) {
	        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	        var size = 3; // 3 components per iteration
	        var type = gl.FLOAT; // the data is 32bit floats
	        var normalize = false; // don't normalize the data
	        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
	        var offset = 0; // start at the beginning of the buffer
	        gl.vertexAttribPointer(gl.positionLocation, size, type, normalize, stride, offset);
	    }

	    if ($canvas.webgl.fudgeFactor) {
	        var fudgeLocation = gl.getUniformLocation(gl.program, "u_fudgeFactor");
	        var fudgeFactor = $canvas.webgl.fudgeFactor;
	        gl.uniform1f(fudgeLocation, fudgeFactor);
	    }

	    {
	        // // Compute the matrices
	        // var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 500);
	        var matrix = gl.orthographic;
	        matrix = m4.translate(matrix, webgl.tx || 0, webgl.ty || 0, webgl.tz || 0);
	        matrix = m4.xRotate(matrix, degToRad(webgl.rx) || 0);
	        matrix = m4.yRotate(matrix, degToRad(webgl.ry) || 0);
	        matrix = m4.zRotate(matrix, degToRad(webgl.rz) || 0);
	        matrix = m4.scale(matrix, webgl.scaleX || 1, webgl.scaleY || 1, webgl.scaleZ || 1);
	        var projectionMatrix = matrix;
	    }

	    if ($canvas.webgl.camera) {
	        // camera
	        var fieldOfViewRadians = degToRad(60);
	        var modelXRotationRadians = degToRad(0);
	        var modelYRotationRadians = degToRad(0);

	        // // Compute the projection matrix
	        // // 投射投影
	        // var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	        // var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

	        var cameraPosition = [degToRad(_utils2.default.funcOrValue($canvas.webgl.camera.rx || 0, $canvas)), degToRad(_utils2.default.funcOrValue($canvas.webgl.camera.ry || 0, $canvas)),
	        // utils.funcOrValue($canvas.webgl.camera.rz, $canvas),
	        1];
	        // cameraPosition = [degToRad(0), 0, 1];
	        var up = [0, 1, 0];

	        // // Compute the camera's matrix using look at.
	        var cameraMatrix = m4.lookAt(cameraPosition, projectionMatrix, up);

	        // // Make a view matrix from the camera matrix.
	        var viewMatrix = m4.inverse(cameraMatrix);

	        var projectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
	    }

	    // 耗性能
	    gl.uniformMatrix4fv(gl.matrixLocation, false, projectionMatrix);

	    // Tell the shader to use texture unit 0 for u_texture
	    gl.uniform1i(gl.textureLocation, 0);

	    if (indicesBuffer) {
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	        // gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
	        gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
	    } else {
	        gl.drawArrays(gl.TRIANGLES, 0, webgl.vertices.length / 3);
	    }
	};

	var cacheBuffer2d;
	var webglRender2d = function webglRender2d($canvas, texture, texWidth, texHeight, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, settings) {

	    var gl = $canvas.$gl;

	    gl.enable(gl.BLEND);
	    gl.disable(gl.DEPTH_TEST);

	    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

	    // // Tell WebGL how to convert from clip space to pixels
	    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	    toggleShader(gl, 1);

	    // Create a buffer.
	    if (!cacheBuffer2d) {
	        // if (1) {
	        cacheBuffer2d = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
	        // Put a unit quad in the buffer
	        var textureCoordinates = [
	        // 0, 0,
	        // 1, 0,
	        // 0, 1,
	        // 1, 1,
	        0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
	        // const textureCoordinates = [
	        //     // 0, 0,
	        //     // 1, 0,
	        //     // 0, 1,
	        //     // 1, 1,
	        //     srcX / texWidth, srcY / texHeight,
	        //     srcX / texWidth, srcHeight / texHeight + srcY / texHeight,
	        //     srcWidth / texWidth + srcX / texWidth, srcY / texHeight,
	        //     srcWidth / texWidth + srcX / texWidth, srcY / texHeight,
	        //     srcX / texWidth, srcHeight / texHeight + srcY / texHeight,
	        //     srcWidth / texWidth + srcX / texWidth, srcHeight / texHeight + srcY / texHeight,
	        // ];

	        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
	    }

	    gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
	    gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);
	    gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

	    // Create a buffer for texture coords
	    // gl.texcoordBuffer = gl.createBuffer();
	    // gl.bindBuffer(gl.ARRAY_BUFFER, gl.texcoordBuffer);

	    // this matirx will convert from pixels to clip space
	    var matrix = gl.orthographic;

	    // this matrix will translate our quad to dstX, dstY
	    matrix = m4.translate(matrix, dstX, dstY, 0);
	    // We need to pick a place to rotate around

	    // We'll move to the middle, rotate, then move back
	    if (settings.rotate) {
	        matrix = m4.translate(matrix, -dstX + settings.beforeRotate[0] || 0, -dstY + settings.beforeRotate[1] || 0, 0);
	        matrix = m4.zRotate(matrix, settings.rotate);
	        matrix = m4.translate(matrix, dstX + settings.afterRotate[0] || 0, dstY + settings.afterRotate[1] || 0, 0);
	    }

	    // this matrix will scale our 1 unit quad
	    // from 1 unit to texWidth, texHeight units
	    matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

	    // Set the matrix.
	    gl.uniformMatrix4fv(gl.matrixLocation, false, matrix);

	    // Because texture coordinates go from 0 to 1
	    // and because our texture coordinates are already a unit quad
	    // we can select an area of the texture by scaling the unit quad
	    // down
	    if (srcX || srcY || srcWidth !== texWidth || srcHeight !== texHeight) {
	        var texMatrix = m4.translation(srcX / texWidth, srcY / texHeight, 0);
	        texMatrix = m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);

	        // Set the texture matrix.
	        gl.uniformMatrix4fv(gl.textureMatrixLocation, false, texMatrix);
	    }

	    // Tell the shader to get the texture from texture unit 0
	    // gl.uniform1i(gl.textureLocation, 0);

	    // draw the quad (2 triangles, 6 vertices)
	    gl.drawArrays(gl.TRIANGLES, 0, 6);
	    // gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	};

	var webglRegister = function webglRegister($canvas, option) {
	    $canvas.$isWebgl = true;

	    $canvas.webgl = {
	        depth: option.webgl.depth || 10000,
	        fudgeFactor: option.webgl.fudgeFactor || 0,
	        camera: option.webgl.camera
	    };

	    var gl = $canvas.$gl = $canvas.$paintContext;

	    gl.orthographic = m4.orthographic(0, $canvas.width, $canvas.height, 0, -$canvas.webgl.depth, $canvas.webgl.depth);

	    gl.clearColor(0, 0, 0, 0);
	    // gl.clear(gl.COLOR_BUFFER_BIT);
	    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	    // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	    toggleShader(gl, 0);

	    {
	        $canvas.imgLoader = function (url, callback) {
	            var tex = gl.createTexture();

	            var textureInfo = {
	                width: 0, // we don't know the size until it loads
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

	var onCreate = function onCreate(_option) {
	    if (_option.webgl) {
	        this.$paintContext = this.$dom.getContext('webgl', {
	            alpha: true,
	            premultipliedAlpha: false
	        });

	        if (this.$paintContext) {
	            webglRegister(this, _option);
	        } else {
	            if (true) {
	                err('Webgl is not supported in current browser, using canvas2d instead.');
	            }

	            if (_option.webgl.fallback) {
	                _option.webgl.fallback.call(this);
	            }
	        }
	    }
	};

	var onPaint = function onPaint() {
	    var $sprite = this;
	    var $canvas = this.$canvas;

	    if ($sprite.webgl) {
	        $sprite.$rendered = true;

	        var _webgl = {
	            tx: $sprite.getStyle('tx'),
	            ty: $sprite.getStyle('ty'),
	            tz: _utils2.default.funcOrValue($sprite.webgl.tz, $sprite) || 0
	        };

	        for (var key in $sprite.webgl) {
	            // 耗性能
	            _webgl[key] = _utils2.default.funcOrValue($sprite.webgl[key], $sprite) || 0;
	        }

	        var $paintSprite = {
	            $id: $sprite.$id,
	            type: '3d',
	            webgl: _webgl
	        };

	        if (true) {
	            // 开发环境下，将元素挂载到$children里以供标记
	            $paintSprite.$origin = $sprite;
	        };

	        $canvas.$children.push($paintSprite);
	    }
	};

	var onRender = function onRender($sprite, settings) {
	    var $canvas = this;

	    if ($canvas.$isWebgl) {
	        webglRender($sprite, settings, $canvas);
	        return true;
	    }
	};

	var onUse = function onUse(easycanvas) {
	    easycanvas.webglShapes = _webglShapes2.default;
	};

	var plugin = {
	    onCreate: onCreate,
	    onPaint: onPaint,
	    onRender: onRender,
	    onUse: onUse
	};

	if (inBrowser && window.Easycanvas) {
	    Easycanvas.use(plugin);
	    onUse(Easycanvas);
	} else {
	    module.exports = plugin;
	}

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var blockIndices = new Uint16Array([0, 1, 2, 0, 2, 3, // front  
	4, 5, 6, 4, 6, 7, // right  
	8, 9, 10, 8, 10, 11, // up  
	12, 13, 14, 12, 14, 15, // left  
	16, 17, 18, 16, 18, 19, // down  
	20, 21, 22, 20, 22, 23]);

	var blockTextures = new Float32Array(arrayRepeat([0, 0, 0, 1, 1, 1, 1, 0], 6));

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

	function arrayRepeat(arr, n) {
	    var oldLength = arr.length;
	    var newArray = new Array(Math.round(oldLength * n));

	    for (var i = 0, l = newArray.length; i < l; i++) {
	        newArray[i] = arr[i % oldLength];
	    }

	    return newArray;
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
	                var colorRepeatTimes = (result.indices || result.vertices).length / colors.length * (result.indices ? 3 : 1);
	                result.colors = new Uint8Array(arrayRepeat(colors, Math.ceil(colorRepeatTimes)));

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

	var webglShapes = {
	    block: function block(opt) {
	        var structure = createShapeWithCachedArray('block', [opt.a, opt.b, opt.c], opt.colors);
	        return wrapper(structure, opt);
	    },

	    quadrilateral: function quadrilateral(opt) {
	        var structure = createShapeWithCachedArray('quadrilateral', [opt.a, opt.b, opt.c], opt.colors);
	        return wrapper(structure, opt);
	    },

	    ball: function ball(opt) {
	        var structure = createShapeWithCachedArray('ball', [opt.r, opt.b || opt.lat || 20, opt.b || opt.lng || 20], opt.colors);
	        return wrapper(structure, opt);
	    },

	    custom: function custom(opt) {
	        var res = _extends(opt, {
	            vertices: new Float32Array(opt.vertices),
	            indices: new Uint16Array(opt.indices),
	            textures: new Float32Array(opt.textures)
	        });

	        if (opt.colors && opt.colors.length) {
	            var colorRepeatTimes = (opt.indices || opt.vertices).length / opt.colors.length * (opt.indices ? 3 : 1);
	            res.colors = new Uint8Array(arrayRepeat(opt.colors, colorRepeatTimes));
	        }

	        return res;
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
	        return wrapper(structure, opt);
	    };
	};

	for (var shape in regularPolyhedron) {
	    _loop(shape);
	}

	module.exports = webglShapes;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _mathPointRotate = __webpack_require__(3);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (x1, y1) {
	    var w1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var h1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	    var x2 = arguments[4];
	    var y2 = arguments[5];
	    var w2 = arguments[6];
	    var h2 = arguments[7];
	    var rx = arguments[8];
	    var ry = arguments[9];
	    var deg = arguments[10];

	    var cx = x1 + w1 / 2;
	    var cy = y1 + h1 / 2;

	    var distance = Math.max(w1, h1) + Math.max(w2, h2);

	    if (deg) {
	        var newxy = (0, _mathPointRotate2.default)(cx, cy, rx, ry, deg);
	        cx = newxy.x, cy = newxy.y;
	    }

	    return Math.pow(cx - (x2 + w2 / 2), 2) + Math.pow(cy - (y2 + y2 / 2), 2) < Math.pow(distance, 2);
	}; // 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
	// 用于跳过绘制的判断
	// 用中心点模糊判断

/***/ })

/******/ })
});
;