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

/***/ 19:
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

/***/ 20:
/***/ (function(module, exports) {

	"use strict";

	/*
	 * Copyright 2012, Gregg Tavares.
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

	module.exports = function () {
	  "use strict";

	  var topWindow = this || window;

	  /** @module webgl-utils */

	  function isInIFrame(w) {
	    w = w || topWindow;
	    return w !== w.top;
	  }

	  if (!isInIFrame()) {
	    console.log("%c%s", 'color:blue;font-weight:bold;', 'for more about webgl-utils.js see:'); // eslint-disable-line
	    console.log("%c%s", 'color:blue;font-weight:bold;', 'http://webglfundamentals.org/webgl/lessons/webgl-boilerplate.html'); // eslint-disable-line
	  }

	  /**
	   * Wrapped logging function.
	   * @param {string} msg The message to log.
	   */
	  function error(msg) {
	    if (topWindow.console) {
	      if (topWindow.console.error) {
	        topWindow.console.error(msg);
	      } else if (topWindow.console.log) {
	        topWindow.console.log(msg);
	      }
	    }
	  }

	  /**
	   * Error Callback
	   * @callback ErrorCallback
	   * @param {string} msg error message.
	   * @memberOf module:webgl-utils
	   */

	  /**
	   * Loads a shader.
	   * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	   * @param {string} shaderSource The shader source.
	   * @param {number} shaderType The type of shader.
	   * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors.
	   * @return {WebGLShader} The created shader.
	   */
	  function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
	    var errFn = opt_errorCallback || error;
	    // Create the shader object
	    var shader = gl.createShader(shaderType);

	    // Load the shader source
	    gl.shaderSource(shader, shaderSource);

	    // Compile the shader
	    gl.compileShader(shader);

	    // Check the compile status
	    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	    if (!compiled) {
	      // Something went wrong during compilation; get the error
	      var lastError = gl.getShaderInfoLog(shader);
	      errFn("*** Error compiling shader '" + shader + "':" + lastError);
	      gl.deleteShader(shader);
	      return null;
	    }

	    return shader;
	  }

	  /**
	   * Creates a program, attaches shaders, binds attrib locations, links the
	   * program and calls useProgram.
	   * @param {WebGLShader[]} shaders The shaders to attach
	   * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
	   * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
	   * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors. By default it just prints an error to the console
	   *        on error. If you want something else pass an callback. It's passed an error message.
	   * @memberOf module:webgl-utils
	   */
	  function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
	    var errFn = opt_errorCallback || error;
	    var program = gl.createProgram();
	    shaders.forEach(function (shader) {
	      gl.attachShader(program, shader);
	    });
	    if (opt_attribs) {
	      opt_attribs.forEach(function (attrib, ndx) {
	        gl.bindAttribLocation(program, opt_locations ? opt_locations[ndx] : ndx, attrib);
	      });
	    }
	    gl.linkProgram(program);

	    // Check the link status
	    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	    if (!linked) {
	      // something went wrong with the link
	      var lastError = gl.getProgramInfoLog(program);
	      errFn("Error in program linking:" + lastError);

	      gl.deleteProgram(program);
	      return null;
	    }
	    return program;
	  }

	  /**
	   * Loads a shader from a script tag.
	   * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	   * @param {string} scriptId The id of the script tag.
	   * @param {number} opt_shaderType The type of shader. If not passed in it will
	   *     be derived from the type of the script tag.
	   * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors.
	   * @return {WebGLShader} The created shader.
	   */
	  function createShaderFromScript(gl, scriptId, opt_shaderType, opt_errorCallback) {
	    var shaderSource = "";
	    var shaderType;
	    var shaderScript = document.getElementById(scriptId);
	    if (!shaderScript) {
	      throw "*** Error: unknown script element" + scriptId;
	    }
	    shaderSource = shaderScript.text;

	    if (!opt_shaderType) {
	      if (shaderScript.type === "x-shader/x-vertex") {
	        shaderType = gl.VERTEX_SHADER;
	      } else if (shaderScript.type === "x-shader/x-fragment") {
	        shaderType = gl.FRAGMENT_SHADER;
	      } else if (shaderType !== gl.VERTEX_SHADER && shaderType !== gl.FRAGMENT_SHADER) {
	        throw "*** Error: unknown shader type";
	      }
	    }

	    return loadShader(gl, shaderSource, opt_shaderType ? opt_shaderType : shaderType, opt_errorCallback);
	  }

	  var defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];

	  /**
	   * Creates a program from 2 script tags.
	   *
	   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	   *        to use.
	   * @param {string[]} shaderScriptIds Array of ids of the script
	   *        tags for the shaders. The first is assumed to be the
	   *        vertex shader, the second the fragment shader.
	   * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
	   * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
	   * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors. By default it just prints an error to the console
	   *        on error. If you want something else pass an callback. It's passed an error message.
	   * @return {WebGLProgram} The created program.
	   * @memberOf module:webgl-utils
	   */
	  function createProgramFromScripts(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
	    var shaders = [];
	    for (var ii = 0; ii < shaderScriptIds.length; ++ii) {
	      shaders.push(createShaderFromScript(gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], opt_errorCallback));
	    }
	    return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
	  }

	  /**
	   * Creates a program from 2 sources.
	   *
	   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	   *        to use.
	   * @param {string[]} shaderSourcess Array of sources for the
	   *        shaders. The first is assumed to be the vertex shader,
	   *        the second the fragment shader.
	   * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
	   * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
	   * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors. By default it just prints an error to the console
	   *        on error. If you want something else pass an callback. It's passed an error message.
	   * @return {WebGLProgram} The created program.
	   * @memberOf module:webgl-utils
	   */
	  function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
	    var shaders = [];
	    for (var ii = 0; ii < shaderSources.length; ++ii) {
	      shaders.push(loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]], opt_errorCallback));
	    }
	    return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
	  }

	  /**
	   * Returns the corresponding bind point for a given sampler type
	   */
	  function getBindPointForSamplerType(gl, type) {
	    if (type === gl.SAMPLER_2D) return gl.TEXTURE_2D; // eslint-disable-line
	    if (type === gl.SAMPLER_CUBE) return gl.TEXTURE_CUBE_MAP; // eslint-disable-line
	    return undefined;
	  }

	  /**
	   * @typedef {Object.<string, function>} Setters
	   */

	  /**
	   * Creates setter functions for all uniforms of a shader
	   * program.
	   *
	   * @see {@link module:webgl-utils.setUniforms}
	   *
	   * @param {WebGLProgram} program the program to create setters for.
	   * @returns {Object.<string, function>} an object with a setter by name for each uniform
	   * @memberOf module:webgl-utils
	   */
	  function createUniformSetters(gl, program) {
	    var textureUnit = 0;

	    /**
	     * Creates a setter for a uniform of the given program with it's
	     * location embedded in the setter.
	     * @param {WebGLProgram} program
	     * @param {WebGLUniformInfo} uniformInfo
	     * @returns {function} the created setter.
	     */
	    function createUniformSetter(program, uniformInfo) {
	      var location = gl.getUniformLocation(program, uniformInfo.name);
	      var type = uniformInfo.type;
	      // Check if this uniform is an array
	      var isArray = uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]";
	      if (type === gl.FLOAT && isArray) {
	        return function (v) {
	          gl.uniform1fv(location, v);
	        };
	      }
	      if (type === gl.FLOAT) {
	        return function (v) {
	          gl.uniform1f(location, v);
	        };
	      }
	      if (type === gl.FLOAT_VEC2) {
	        return function (v) {
	          gl.uniform2fv(location, v);
	        };
	      }
	      if (type === gl.FLOAT_VEC3) {
	        return function (v) {
	          gl.uniform3fv(location, v);
	        };
	      }
	      if (type === gl.FLOAT_VEC4) {
	        return function (v) {
	          gl.uniform4fv(location, v);
	        };
	      }
	      if (type === gl.INT && isArray) {
	        return function (v) {
	          gl.uniform1iv(location, v);
	        };
	      }
	      if (type === gl.INT) {
	        return function (v) {
	          gl.uniform1i(location, v);
	        };
	      }
	      if (type === gl.INT_VEC2) {
	        return function (v) {
	          gl.uniform2iv(location, v);
	        };
	      }
	      if (type === gl.INT_VEC3) {
	        return function (v) {
	          gl.uniform3iv(location, v);
	        };
	      }
	      if (type === gl.INT_VEC4) {
	        return function (v) {
	          gl.uniform4iv(location, v);
	        };
	      }
	      if (type === gl.BOOL) {
	        return function (v) {
	          gl.uniform1iv(location, v);
	        };
	      }
	      if (type === gl.BOOL_VEC2) {
	        return function (v) {
	          gl.uniform2iv(location, v);
	        };
	      }
	      if (type === gl.BOOL_VEC3) {
	        return function (v) {
	          gl.uniform3iv(location, v);
	        };
	      }
	      if (type === gl.BOOL_VEC4) {
	        return function (v) {
	          gl.uniform4iv(location, v);
	        };
	      }
	      if (type === gl.FLOAT_MAT2) {
	        return function (v) {
	          gl.uniformMatrix2fv(location, false, v);
	        };
	      }
	      if (type === gl.FLOAT_MAT3) {
	        return function (v) {
	          gl.uniformMatrix3fv(location, false, v);
	        };
	      }
	      if (type === gl.FLOAT_MAT4) {
	        return function (v) {
	          gl.uniformMatrix4fv(location, false, v);
	        };
	      }
	      if ((type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) && isArray) {
	        var units = [];
	        for (var ii = 0; ii < info.size; ++ii) {
	          units.push(textureUnit++);
	        }
	        return function (bindPoint, units) {
	          return function (textures) {
	            gl.uniform1iv(location, units);
	            textures.forEach(function (texture, index) {
	              gl.activeTexture(gl.TEXTURE0 + units[index]);
	              gl.bindTexture(bindPoint, texture);
	            });
	          };
	        }(getBindPointForSamplerType(gl, type), units);
	      }
	      if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
	        return function (bindPoint, unit) {
	          return function (texture) {
	            gl.uniform1i(location, unit);
	            gl.activeTexture(gl.TEXTURE0 + unit);
	            gl.bindTexture(bindPoint, texture);
	          };
	        }(getBindPointForSamplerType(gl, type), textureUnit++);
	      }
	      throw "unknown type: 0x" + type.toString(16); // we should never get here.
	    }

	    var uniformSetters = {};
	    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

	    for (var ii = 0; ii < numUniforms; ++ii) {
	      var uniformInfo = gl.getActiveUniform(program, ii);
	      if (!uniformInfo) {
	        break;
	      }
	      var name = uniformInfo.name;
	      // remove the array suffix.
	      if (name.substr(-3) === "[0]") {
	        name = name.substr(0, name.length - 3);
	      }
	      var setter = createUniformSetter(program, uniformInfo);
	      uniformSetters[name] = setter;
	    }
	    return uniformSetters;
	  }

	  /**
	   * Set uniforms and binds related textures.
	   *
	   * example:
	   *
	   *     var programInfo = createProgramInfo(
	   *         gl, ["some-vs", "some-fs");
	   *
	   *     var tex1 = gl.createTexture();
	   *     var tex2 = gl.createTexture();
	   *
	   *     ... assume we setup the textures with data ...
	   *
	   *     var uniforms = {
	   *       u_someSampler: tex1,
	   *       u_someOtherSampler: tex2,
	   *       u_someColor: [1,0,0,1],
	   *       u_somePosition: [0,1,1],
	   *       u_someMatrix: [
	   *         1,0,0,0,
	   *         0,1,0,0,
	   *         0,0,1,0,
	   *         0,0,0,0,
	   *       ],
	   *     };
	   *
	   *     gl.useProgram(program);
	   *
	   * This will automatically bind the textures AND set the
	   * uniforms.
	   *
	   *     setUniforms(programInfo.uniformSetters, uniforms);
	   *
	   * For the example above it is equivalent to
	   *
	   *     var texUnit = 0;
	   *     gl.activeTexture(gl.TEXTURE0 + texUnit);
	   *     gl.bindTexture(gl.TEXTURE_2D, tex1);
	   *     gl.uniform1i(u_someSamplerLocation, texUnit++);
	   *     gl.activeTexture(gl.TEXTURE0 + texUnit);
	   *     gl.bindTexture(gl.TEXTURE_2D, tex2);
	   *     gl.uniform1i(u_someSamplerLocation, texUnit++);
	   *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
	   *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
	   *     gl.uniformMatrix4fv(u_someMatrix, false, [
	   *         1,0,0,0,
	   *         0,1,0,0,
	   *         0,0,1,0,
	   *         0,0,0,0,
	   *       ]);
	   *
	   * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
	   *
	   *     var uniforms = {
	   *       u_someSampler: tex1,
	   *       u_someOtherSampler: tex2,
	   *     };
	   *
	   *     var moreUniforms {
	   *       u_someColor: [1,0,0,1],
	   *       u_somePosition: [0,1,1],
	   *       u_someMatrix: [
	   *         1,0,0,0,
	   *         0,1,0,0,
	   *         0,0,1,0,
	   *         0,0,0,0,
	   *       ],
	   *     };
	   *
	   *     setUniforms(programInfo.uniformSetters, uniforms);
	   *     setUniforms(programInfo.uniformSetters, moreUniforms);
	   *
	   * @param {Object.<string, function>|module:webgl-utils.ProgramInfo} setters the setters returned from
	   *        `createUniformSetters` or a ProgramInfo from {@link module:webgl-utils.createProgramInfo}.
	   * @param {Object.<string, value>} an object with values for the
	   *        uniforms.
	   * @memberOf module:webgl-utils
	   */
	  function setUniforms(setters, values) {
	    setters = setters.uniformSetters || setters;
	    Object.keys(values).forEach(function (name) {
	      var setter = setters[name];
	      if (setter) {
	        setter(values[name]);
	      }
	    });
	  }

	  /**
	   * Creates setter functions for all attributes of a shader
	   * program. You can pass this to {@link module:webgl-utils.setBuffersAndAttributes} to set all your buffers and attributes.
	   *
	   * @see {@link module:webgl-utils.setAttributes} for example
	   * @param {WebGLProgram} program the program to create setters for.
	   * @return {Object.<string, function>} an object with a setter for each attribute by name.
	   * @memberOf module:webgl-utils
	   */
	  function createAttributeSetters(gl, program) {
	    var attribSetters = {};

	    function createAttribSetter(index) {
	      return function (b) {
	        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
	        gl.enableVertexAttribArray(index);
	        gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
	      };
	    }

	    var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	    for (var ii = 0; ii < numAttribs; ++ii) {
	      var attribInfo = gl.getActiveAttrib(program, ii);
	      if (!attribInfo) {
	        break;
	      }
	      var index = gl.getAttribLocation(program, attribInfo.name);
	      attribSetters[attribInfo.name] = createAttribSetter(index);
	    }

	    return attribSetters;
	  }

	  /**
	   * Sets attributes and binds buffers (deprecated... use {@link module:webgl-utils.setBuffersAndAttributes})
	   *
	   * Example:
	   *
	   *     var program = createProgramFromScripts(
	   *         gl, ["some-vs", "some-fs");
	   *
	   *     var attribSetters = createAttributeSetters(program);
	   *
	   *     var positionBuffer = gl.createBuffer();
	   *     var texcoordBuffer = gl.createBuffer();
	   *
	   *     var attribs = {
	   *       a_position: {buffer: positionBuffer, numComponents: 3},
	   *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
	   *     };
	   *
	   *     gl.useProgram(program);
	   *
	   * This will automatically bind the buffers AND set the
	   * attributes.
	   *
	   *     setAttributes(attribSetters, attribs);
	   *
	   * Properties of attribs. For each attrib you can add
	   * properties:
	   *
	   * *   type: the type of data in the buffer. Default = gl.FLOAT
	   * *   normalize: whether or not to normalize the data. Default = false
	   * *   stride: the stride. Default = 0
	   * *   offset: offset into the buffer. Default = 0
	   *
	   * For example if you had 3 value float positions, 2 value
	   * float texcoord and 4 value uint8 colors you'd setup your
	   * attribs like this
	   *
	   *     var attribs = {
	   *       a_position: {buffer: positionBuffer, numComponents: 3},
	   *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
	   *       a_color: {
	   *         buffer: colorBuffer,
	   *         numComponents: 4,
	   *         type: gl.UNSIGNED_BYTE,
	   *         normalize: true,
	   *       },
	   *     };
	   *
	   * @param {Object.<string, function>|model:webgl-utils.ProgramInfo} setters Attribute setters as returned from createAttributeSetters or a ProgramInfo as returned {@link module:webgl-utils.createProgramInfo}
	   * @param {Object.<string, module:webgl-utils.AttribInfo>} attribs AttribInfos mapped by attribute name.
	   * @memberOf module:webgl-utils
	   * @deprecated use {@link module:webgl-utils.setBuffersAndAttributes}
	   */
	  function setAttributes(setters, attribs) {
	    setters = setters.attribSetters || setters;
	    Object.keys(attribs).forEach(function (name) {
	      var setter = setters[name];
	      if (setter) {
	        setter(attribs[name]);
	      }
	    });
	  }

	  /**
	   * Creates a vertex array object and then sets the attributes
	   * on it
	   *
	   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	   *        to use.
	   * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
	   * @param {Object.<string, module:webgl-utils.AttribInfo>} attribs AttribInfos mapped by attribute name.
	   * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
	   */
	  function createVAOAndSetAttributes(gl, setters, attribs, indices) {
	    var vao = gl.createVertexArray();
	    gl.bindVertexArray(vao);
	    setAttributes(setters, attribs);
	    if (indices) {
	      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
	    }
	    // We unbind this because otherwise any change to ELEMENT_ARRAY_BUFFER
	    // like when creating buffers for other stuff will mess up this VAO's binding
	    gl.bindVertexArray(null);
	    return vao;
	  }

	  /**
	   * Creates a vertex array object and then sets the attributes
	   * on it
	   *
	   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	   *        to use.
	   * @param {Object.<string, function>| module:webgl-utils.ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
	   * @param {module:webgl-utils:BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
	   * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
	   */
	  function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
	    return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
	  }

	  /**
	   * @typedef {Object} ProgramInfo
	   * @property {WebGLProgram} program A shader program
	   * @property {Object<string, function>} uniformSetters: object of setters as returned from createUniformSetters,
	   * @property {Object<string, function>} attribSetters: object of setters as returned from createAttribSetters,
	   * @memberOf module:webgl-utils
	   */

	  /**
	   * Creates a ProgramInfo from 2 sources.
	   *
	   * A ProgramInfo contains
	   *
	   *     programInfo = {
	   *        program: WebGLProgram,
	   *        uniformSetters: object of setters as returned from createUniformSetters,
	   *        attribSetters: object of setters as returned from createAttribSetters,
	   *     }
	   *
	   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	   *        to use.
	   * @param {string[]} shaderSourcess Array of sources for the
	   *        shaders or ids. The first is assumed to be the vertex shader,
	   *        the second the fragment shader.
	   * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
	   * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
	   * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors. By default it just prints an error to the console
	   *        on error. If you want something else pass an callback. It's passed an error message.
	   * @return {module:webgl-utils.ProgramInfo} The created program.
	   * @memberOf module:webgl-utils
	   */
	  function createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
	    shaderSources = shaderSources.map(function (source) {
	      var script = document.getElementById(source);
	      return script ? script.text : source;
	    });
	    var program = webglUtils.createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback);
	    if (!program) {
	      return null;
	    }
	    var uniformSetters = createUniformSetters(gl, program);
	    var attribSetters = createAttributeSetters(gl, program);
	    return {
	      program: program,
	      uniformSetters: uniformSetters,
	      attribSetters: attribSetters
	    };
	  }

	  /**
	   * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
	   *
	   * Example:
	   *
	   *     var programInfo = createProgramInfo(
	   *         gl, ["some-vs", "some-fs");
	   *
	   *     var arrays = {
	   *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
	   *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
	   *     };
	   *
	   *     var bufferInfo = createBufferInfoFromArrays(gl, arrays);
	   *
	   *     gl.useProgram(programInfo.program);
	   *
	   * This will automatically bind the buffers AND set the
	   * attributes.
	   *
	   *     setBuffersAndAttributes(programInfo.attribSetters, bufferInfo);
	   *
	   * For the example above it is equivilent to
	   *
	   *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	   *     gl.enableVertexAttribArray(a_positionLocation);
	   *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
	   *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	   *     gl.enableVertexAttribArray(a_texcoordLocation);
	   *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
	   *
	   * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
	   * @param {Object.<string, function>} setters Attribute setters as returned from `createAttributeSetters`
	   * @param {module:webgl-utils.BufferInfo} buffers a BufferInfo as returned from `createBufferInfoFromArrays`.
	   * @memberOf module:webgl-utils
	   */
	  function setBuffersAndAttributes(gl, setters, buffers) {
	    setAttributes(setters, buffers.attribs);
	    if (buffers.indices) {
	      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
	    }
	  }

	  // Add your prefix here.
	  var browserPrefixes = ["", "MOZ_", "OP_", "WEBKIT_"];

	  /**
	   * Given an extension name like WEBGL_compressed_texture_s3tc
	   * returns the supported version extension, like
	   * WEBKIT_WEBGL_compressed_teture_s3tc
	   * @param {string} name Name of extension to look for
	   * @return {WebGLExtension} The extension or undefined if not
	   *     found.
	   * @memberOf module:webgl-utils
	   */
	  function getExtensionWithKnownPrefixes(gl, name) {
	    for (var ii = 0; ii < browserPrefixes.length; ++ii) {
	      var prefixedName = browserPrefixes[ii] + name;
	      var ext = gl.getExtension(prefixedName);
	      if (ext) {
	        return ext;
	      }
	    }
	    return undefined;
	  }

	  /**
	   * Resize a canvas to match the size its displayed.
	   * @param {HTMLCanvasElement} canvas The canvas to resize.
	   * @param {number} [multiplier] amount to multiply by.
	   *    Pass in window.devicePixelRatio for native pixels.
	   * @return {boolean} true if the canvas was resized.
	   * @memberOf module:webgl-utils
	   */
	  function resizeCanvasToDisplaySize(canvas, multiplier) {
	    multiplier = multiplier || 1;
	    var width = canvas.clientWidth * multiplier | 0;
	    var height = canvas.clientHeight * multiplier | 0;
	    if (canvas.width !== width || canvas.height !== height) {
	      canvas.width = width;
	      canvas.height = height;
	      return true;
	    }
	    return false;
	  }

	  // Add `push` to a typed array. It just keeps a 'cursor'
	  // and allows use to `push` values into the array so we
	  // don't have to manually compute offsets
	  function augmentTypedArray(typedArray, numComponents) {
	    var cursor = 0;
	    typedArray.push = function () {
	      for (var ii = 0; ii < arguments.length; ++ii) {
	        var value = arguments[ii];
	        if (value instanceof Array || value.buffer && value.buffer instanceof ArrayBuffer) {
	          for (var jj = 0; jj < value.length; ++jj) {
	            typedArray[cursor++] = value[jj];
	          }
	        } else {
	          typedArray[cursor++] = value;
	        }
	      }
	    };
	    typedArray.reset = function (opt_index) {
	      cursor = opt_index || 0;
	    };
	    typedArray.numComponents = numComponents;
	    Object.defineProperty(typedArray, 'numElements', {
	      get: function get() {
	        return this.length / this.numComponents | 0;
	      }
	    });
	    return typedArray;
	  }

	  /**
	   * creates a typed array with a `push` function attached
	   * so that you can easily *push* values.
	   *
	   * `push` can take multiple arguments. If an argument is an array each element
	   * of the array will be added to the typed array.
	   *
	   * Example:
	   *
	   *     var array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
	   *     array.push(1, 2, 3);
	   *     array.push([4, 5, 6]);
	   *     // array now contains [1, 2, 3, 4, 5, 6]
	   *
	   * Also has `numComponents` and `numElements` properties.
	   *
	   * @param {number} numComponents number of components
	   * @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
	   * @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
	   * @return {ArrayBuffer} A typed array.
	   * @memberOf module:webgl-utils
	   */
	  function createAugmentedTypedArray(numComponents, numElements, opt_type) {
	    var Type = opt_type || Float32Array;
	    return augmentTypedArray(new Type(numComponents * numElements), numComponents);
	  }

	  function createBufferFromTypedArray(gl, array, type, drawType) {
	    type = type || gl.ARRAY_BUFFER;
	    var buffer = gl.createBuffer();
	    gl.bindBuffer(type, buffer);
	    gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
	    return buffer;
	  }

	  function allButIndices(name) {
	    return name !== "indices";
	  }

	  function createMapping(obj) {
	    var mapping = {};
	    Object.keys(obj).filter(allButIndices).forEach(function (key) {
	      mapping["a_" + key] = key;
	    });
	    return mapping;
	  }

	  function getGLTypeForTypedArray(gl, typedArray) {
	    if (typedArray instanceof Int8Array) {
	      return gl.BYTE;
	    } // eslint-disable-line
	    if (typedArray instanceof Uint8Array) {
	      return gl.UNSIGNED_BYTE;
	    } // eslint-disable-line
	    if (typedArray instanceof Int16Array) {
	      return gl.SHORT;
	    } // eslint-disable-line
	    if (typedArray instanceof Uint16Array) {
	      return gl.UNSIGNED_SHORT;
	    } // eslint-disable-line
	    if (typedArray instanceof Int32Array) {
	      return gl.INT;
	    } // eslint-disable-line
	    if (typedArray instanceof Uint32Array) {
	      return gl.UNSIGNED_INT;
	    } // eslint-disable-line
	    if (typedArray instanceof Float32Array) {
	      return gl.FLOAT;
	    } // eslint-disable-line
	    throw "unsupported typed array type";
	  }

	  // This is really just a guess. Though I can't really imagine using
	  // anything else? Maybe for some compression?
	  function getNormalizationForTypedArray(typedArray) {
	    if (typedArray instanceof Int8Array) {
	      return true;
	    } // eslint-disable-line
	    if (typedArray instanceof Uint8Array) {
	      return true;
	    } // eslint-disable-line
	    return false;
	  }

	  function isArrayBuffer(a) {
	    return a.buffer && a.buffer instanceof ArrayBuffer;
	  }

	  function guessNumComponentsFromName(name, length) {
	    var numComponents;
	    if (name.indexOf("coord") >= 0) {
	      numComponents = 2;
	    } else if (name.indexOf("color") >= 0) {
	      numComponents = 4;
	    } else {
	      numComponents = 3; // position, normals, indices ...
	    }

	    if (length % numComponents > 0) {
	      throw "can not guess numComponents. You should specify it.";
	    }

	    return numComponents;
	  }

	  function makeTypedArray(array, name) {
	    if (isArrayBuffer(array)) {
	      return array;
	    }

	    if (Array.isArray(array)) {
	      array = {
	        data: array
	      };
	    }

	    if (!array.numComponents) {
	      array.numComponents = guessNumComponentsFromName(name, array.length);
	    }

	    var type = array.type;
	    if (!type) {
	      if (name === "indices") {
	        type = Uint16Array;
	      }
	    }
	    var typedArray = createAugmentedTypedArray(array.numComponents, array.data.length / array.numComponents | 0, type);
	    typedArray.push(array.data);
	    return typedArray;
	  }

	  /**
	   * @typedef {Object} AttribInfo
	   * @property {number} [numComponents] the number of components for this attribute.
	   * @property {number} [size] the number of components for this attribute.
	   * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
	   * @property {boolean} [normalized] whether or not to normalize the data. Default = false
	   * @property {number} [offset] offset into buffer in bytes. Default = 0
	   * @property {number} [stride] the stride in bytes per element. Default = 0
	   * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
	   * @memberOf module:webgl-utils
	   */

	  /**
	   * Creates a set of attribute data and WebGLBuffers from set of arrays
	   *
	   * Given
	   *
	   *      var arrays = {
	   *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
	   *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
	   *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
	   *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
	   *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
	   *      };
	   *
	   * returns something like
	   *
	   *      var attribs = {
	   *        a_position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
	   *        a_texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
	   *        a_normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
	   *        a_color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
	   *      };
	   *
	   * @param {WebGLRenderingContext} gl The webgl rendering context.
	   * @param {Object.<string, array|typedarray>} arrays The arrays
	   * @param {Object.<string, string>} [opt_mapping] mapping from attribute name to array name.
	   *     if not specified defaults to "a_name" -> "name".
	   * @return {Object.<string, module:webgl-utils.AttribInfo>} the attribs
	   * @memberOf module:webgl-utils
	   */
	  function createAttribsFromArrays(gl, arrays, opt_mapping) {
	    var mapping = opt_mapping || createMapping(arrays);
	    var attribs = {};
	    Object.keys(mapping).forEach(function (attribName) {
	      var bufferName = mapping[attribName];
	      var array = makeTypedArray(arrays[bufferName], bufferName);
	      attribs[attribName] = {
	        buffer: createBufferFromTypedArray(gl, array),
	        numComponents: array.numComponents || guessNumComponentsFromName(bufferName),
	        type: getGLTypeForTypedArray(gl, array),
	        normalize: getNormalizationForTypedArray(array)
	      };
	    });
	    return attribs;
	  }

	  /**
	   * tries to get the number of elements from a set of arrays.
	   */
	  function getNumElementsFromNonIndexedArrays(arrays) {
	    var key = Object.keys(arrays)[0];
	    var array = arrays[key];
	    if (isArrayBuffer(array)) {
	      return array.numElements;
	    } else {
	      return array.data.length / array.numComponents;
	    }
	  }

	  /**
	   * @typedef {Object} BufferInfo
	   * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
	   * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
	   * @property {Object.<string, module:webgl-utils.AttribInfo>} attribs The attribs approriate to call `setAttributes`
	   * @memberOf module:webgl-utils
	   */

	  /**
	   * Creates a BufferInfo from an object of arrays.
	   *
	   * This can be passed to {@link module:webgl-utils.setBuffersAndAttributes} and to
	   * {@link module:webgl-utils:drawBufferInfo}.
	   *
	   * Given an object like
	   *
	   *     var arrays = {
	   *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
	   *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
	   *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
	   *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
	   *     };
	   *
	   *  Creates an BufferInfo like this
	   *
	   *     bufferInfo = {
	   *       numElements: 4,        // or whatever the number of elements is
	   *       indices: WebGLBuffer,  // this property will not exist if there are no indices
	   *       attribs: {
	   *         a_position: { buffer: WebGLBuffer, numComponents: 3, },
	   *         a_normal:   { buffer: WebGLBuffer, numComponents: 3, },
	   *         a_texcoord: { buffer: WebGLBuffer, numComponents: 2, },
	   *       },
	   *     };
	   *
	   *  The properties of arrays can be JavaScript arrays in which case the number of components
	   *  will be guessed.
	   *
	   *     var arrays = {
	   *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
	   *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
	   *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
	   *        indices:  [0, 1, 2, 1, 2, 3],
	   *     };
	   *
	   *  They can also by TypedArrays
	   *
	   *     var arrays = {
	   *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
	   *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
	   *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
	   *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
	   *     };
	   *
	   *  Or augmentedTypedArrays
	   *
	   *     var positions = createAugmentedTypedArray(3, 4);
	   *     var texcoords = createAugmentedTypedArray(2, 4);
	   *     var normals   = createAugmentedTypedArray(3, 4);
	   *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
	   *
	   *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
	   *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
	   *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
	   *     indices.push([0, 1, 2, 1, 2, 3]);
	   *
	   *     var arrays = {
	   *        position: positions,
	   *        texcoord: texcoords,
	   *        normal:   normals,
	   *        indices:  indices,
	   *     };
	   *
	   * For the last example it is equivalent to
	   *
	   *     var bufferInfo = {
	   *       attribs: {
	   *         a_position: { numComponents: 3, buffer: gl.createBuffer(), },
	   *         a_texcoods: { numComponents: 2, buffer: gl.createBuffer(), },
	   *         a_normals: { numComponents: 3, buffer: gl.createBuffer(), },
	   *       },
	   *       indices: gl.createBuffer(),
	   *       numElements: 6,
	   *     };
	   *
	   *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
	   *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
	   *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_texcoord.buffer);
	   *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
	   *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_normal.buffer);
	   *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
	   *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
	   *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
	   *
	   * @param {WebGLRenderingContext} gl A WebGLRenderingContext
	   * @param {Object.<string, array|object|typedarray>} arrays Your data
	   * @param {Object.<string, string>} [opt_mapping] an optional mapping of attribute to array name.
	   *    If not passed in it's assumed the array names will be mapped to an attibute
	   *    of the same name with "a_" prefixed to it. An other words.
	   *
	   *        var arrays = {
	   *           position: ...,
	   *           texcoord: ...,
	   *           normal:   ...,
	   *           indices:  ...,
	   *        };
	   *
	   *        bufferInfo = createBufferInfoFromArrays(gl, arrays);
	   *
	   *    Is the same as
	   *
	   *        var arrays = {
	   *           position: ...,
	   *           texcoord: ...,
	   *           normal:   ...,
	   *           indices:  ...,
	   *        };
	   *
	   *        var mapping = {
	   *          a_position: "position",
	   *          a_texcoord: "texcoord",
	   *          a_normal:   "normal",
	   *        };
	   *
	   *        bufferInfo = createBufferInfoFromArrays(gl, arrays, mapping);
	   *
	   * @return {module:webgl-utils.BufferInfo} A BufferInfo
	   * @memberOf module:webgl-utils
	   */
	  function createBufferInfoFromArrays(gl, arrays, opt_mapping) {
	    var bufferInfo = {
	      attribs: createAttribsFromArrays(gl, arrays, opt_mapping)
	    };
	    var indices = arrays.indices;
	    if (indices) {
	      indices = makeTypedArray(indices, "indices");
	      bufferInfo.indices = createBufferFromTypedArray(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
	      bufferInfo.numElements = indices.length;
	    } else {
	      bufferInfo.numElements = getNumElementsFromNonIndexedArrays(arrays);
	    }

	    return bufferInfo;
	  }

	  /**
	   * Creates buffers from typed arrays
	   *
	   * Given something like this
	   *
	   *     var arrays = {
	   *        positions: [1, 2, 3],
	   *        normals: [0, 0, 1],
	   *     }
	   *
	   * returns something like
	   *
	   *     buffers = {
	   *       positions: WebGLBuffer,
	   *       normals: WebGLBuffer,
	   *     }
	   *
	   * If the buffer is named 'indices' it will be made an ELEMENT_ARRAY_BUFFER.
	   *
	   * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
	   * @param {Object<string, array|typedarray>} arrays
	   * @return {Object<string, WebGLBuffer>} returns an object with one WebGLBuffer per array
	   * @memberOf module:webgl-utils
	   */
	  function createBuffersFromArrays(gl, arrays) {
	    var buffers = {};
	    Object.keys(arrays).forEach(function (key) {
	      var type = key === "indices" ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
	      var array = makeTypedArray(arrays[key], name);
	      buffers[key] = createBufferFromTypedArray(gl, array, type);
	    });

	    // hrm
	    if (arrays.indices) {
	      buffers.numElements = arrays.indices.length;
	    } else if (arrays.position) {
	      buffers.numElements = arrays.position.length / 3;
	    }

	    return buffers;
	  }

	  /**
	   * Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
	   *
	   * normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
	   * but calling this means if you switch from indexed data to non-indexed
	   * data you don't have to remember to update your draw call.
	   *
	   * @param {WebGLRenderingContext} gl A WebGLRenderingContext
	   * @param {module:webgl-utils.BufferInfo} bufferInfo as returned from createBufferInfoFromArrays
	   * @param {enum} [primitiveType] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...)
	   * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
	   * @param {number} [offset] An optional offset. Defaults to 0.
	   * @memberOf module:webgl-utils
	   */
	  function drawBufferInfo(gl, bufferInfo, primitiveType, count, offset) {
	    var indices = bufferInfo.indices;
	    primitiveType = primitiveType === undefined ? gl.TRIANGLES : primitiveType;
	    var numElements = count === undefined ? bufferInfo.numElements : count;
	    offset = offset === undefined ? offset : 0;
	    if (indices) {
	      gl.drawElements(primitiveType, numElements, gl.UNSIGNED_SHORT, offset);
	    } else {
	      gl.drawArrays(primitiveType, offset, numElements);
	    }
	  }

	  /**
	   * @typedef {Object} DrawObject
	   * @property {module:webgl-utils.ProgramInfo} programInfo A ProgramInfo as returned from createProgramInfo
	   * @property {module:webgl-utils.BufferInfo} bufferInfo A BufferInfo as returned from createBufferInfoFromArrays
	   * @property {Object<string, ?>} uniforms The values for the uniforms
	   * @memberOf module:webgl-utils
	   */

	  /**
	   * Draws a list of objects
	   * @param {WebGLRenderingContext} gl A WebGLRenderingContext
	   * @param {DrawObject[]} objectsToDraw an array of objects to draw.
	   * @memberOf module:webgl-utils
	   */
	  function drawObjectList(gl, objectsToDraw) {
	    var lastUsedProgramInfo = null;
	    var lastUsedBufferInfo = null;

	    objectsToDraw.forEach(function (object) {
	      var programInfo = object.programInfo;
	      var bufferInfo = object.bufferInfo;
	      var bindBuffers = false;

	      if (programInfo !== lastUsedProgramInfo) {
	        lastUsedProgramInfo = programInfo;
	        gl.useProgram(programInfo.program);
	        bindBuffers = true;
	      }

	      // Setup all the needed attributes.
	      if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
	        lastUsedBufferInfo = bufferInfo;
	        setBuffersAndAttributes(gl, programInfo.attribSetters, bufferInfo);
	      }

	      // Set the uniforms.
	      setUniforms(programInfo.uniformSetters, object.uniforms);

	      // Draw
	      drawBufferInfo(gl, bufferInfo);
	    });
	  }

	  var isIE = /*@cc_on!@*/false || !!document.documentMode;
	  // Edge 20+
	  var isEdge = !isIE && !!window.StyleMedia;
	  if (isEdge) {
	    // Hack for Edge. Edge's WebGL implmentation is crap still and so they
	    // only respond to "experimental-webgl". I don't want to clutter the
	    // examples with that so his hack works around it
	    HTMLCanvasElement.prototype.getContext = function (origFn) {
	      return function () {
	        var args = arguments;
	        var type = args[0];
	        if (type === "webgl") {
	          args = [].slice.call(arguments);
	          args[0] = "experimental-webgl";
	        }
	        return origFn.apply(this, args);
	      };
	    }(HTMLCanvasElement.prototype.getContext);
	  }

	  return {
	    createAugmentedTypedArray: createAugmentedTypedArray,
	    createAttribsFromArrays: createAttribsFromArrays,
	    createBuffersFromArrays: createBuffersFromArrays,
	    createBufferInfoFromArrays: createBufferInfoFromArrays,
	    createAttributeSetters: createAttributeSetters,
	    createProgram: createProgram,
	    createProgramFromScripts: createProgramFromScripts,
	    createProgramFromSources: createProgramFromSources,
	    createProgramInfo: createProgramInfo,
	    createUniformSetters: createUniformSetters,
	    createVAOAndSetAttributes: createVAOAndSetAttributes,
	    createVAOFromBufferInfo: createVAOFromBufferInfo,
	    drawBufferInfo: drawBufferInfo,
	    drawObjectList: drawObjectList,
	    getExtensionWithKnownPrefixes: getExtensionWithKnownPrefixes,
	    resizeCanvasToDisplaySize: resizeCanvasToDisplaySize,
	    setAttributes: setAttributes,
	    setBuffersAndAttributes: setBuffersAndAttributes,
	    setUniforms: setUniforms
	  };
	};

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _webglUtils = __webpack_require__(20);

	var _webglUtils2 = _interopRequireDefault(_webglUtils);

	var _m = __webpack_require__(19);

	var _m2 = _interopRequireDefault(_m);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Support webgl rendering
	 * - Usage: set {webgl: true} in config on registering your canvas instance.
	 *
	 * ********** **/

	var parentNode = document.body || document.head || document;

	var script1 = document.createElement('script');
	script1.id = 'drawImage-vertex-shader';
	script1.type = 'x-shader/x-vertex';
	script1.innerHTML = '\n\tattribute vec4 a_position;\n\tattribute vec2 a_texcoord;\n\n\tuniform mat4 u_matrix;\n\tuniform mat4 u_textureMatrix;\n\n\tvarying vec2 v_texcoord;\n\n\tvoid main() {\n\t   gl_Position = u_matrix * a_position;\n\t   v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;\n\t}\n';
	parentNode.appendChild(script1);

	var script2 = document.createElement('script');
	script2.id = 'drawImage-fragment-shader';
	script2.type = 'x-shader/x-fragment';
	script2.innerHTML = '\n\tprecision mediump float;\n\n\tvarying vec2 v_texcoord;\n\n\tuniform sampler2D u_texture;\n\n\tvoid main() {\n\t   gl_FragColor = texture2D(u_texture, v_texcoord);\n\t    // vec4 color = texture2D(u_texture, v_texcoord);\n\t    // gl_FragColor = vec4(color.rgb, 0.9 * color.b);\n\t}\n';
	parentNode.appendChild(script2);

	window.m4 = (0, _m2.default)();
	window.webglUtils = (0, _webglUtils2.default)();

/***/ })

/******/ })
});
;