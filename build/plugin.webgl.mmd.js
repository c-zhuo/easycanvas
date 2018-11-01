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

	module.exports = __webpack_require__(98);


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

	"use strict";

	// glMatrix v0.9.5
	var vec3 = {},
	    mat3 = {},
	    mat4 = {},
	    quat4 = {};
	var glMatrixArrayType = typeof Float32Array != "undefined" ? Float32Array : typeof WebGLFloatArray != "undefined" ? WebGLFloatArray : Array;vec3.create = function (a) {
		var b = new glMatrixArrayType(3);if (a) {
			b[0] = a[0];b[1] = a[1];b[2] = a[2];
		}return b;
	};vec3.set = function (a, b) {
		b[0] = a[0];b[1] = a[1];b[2] = a[2];return b;
	};vec3.add = function (a, b, c) {
		if (!c || a == c) {
			a[0] += b[0];a[1] += b[1];a[2] += b[2];return a;
		}c[0] = a[0] + b[0];c[1] = a[1] + b[1];c[2] = a[2] + b[2];return c;
	};
	vec3.subtract = function (a, b, c) {
		if (!c || a == c) {
			a[0] -= b[0];a[1] -= b[1];a[2] -= b[2];return a;
		}c[0] = a[0] - b[0];c[1] = a[1] - b[1];c[2] = a[2] - b[2];return c;
	};vec3.negate = function (a, b) {
		b || (b = a);b[0] = -a[0];b[1] = -a[1];b[2] = -a[2];return b;
	};vec3.scale = function (a, b, c) {
		if (!c || a == c) {
			a[0] *= b;a[1] *= b;a[2] *= b;return a;
		}c[0] = a[0] * b;c[1] = a[1] * b;c[2] = a[2] * b;return c;
	};
	vec3.normalize = function (a, b) {
		b || (b = a);var c = a[0],
		    d = a[1],
		    e = a[2],
		    g = Math.sqrt(c * c + d * d + e * e);if (g) {
			if (g == 1) {
				b[0] = c;b[1] = d;b[2] = e;return b;
			}
		} else {
			b[0] = 0;b[1] = 0;b[2] = 0;return b;
		}g = 1 / g;b[0] = c * g;b[1] = d * g;b[2] = e * g;return b;
	};vec3.cross = function (a, b, c) {
		c || (c = a);var d = a[0],
		    e = a[1];a = a[2];var g = b[0],
		    f = b[1];b = b[2];c[0] = e * b - a * f;c[1] = a * g - d * b;c[2] = d * f - e * g;return c;
	};vec3.length = function (a) {
		var b = a[0],
		    c = a[1];a = a[2];return Math.sqrt(b * b + c * c + a * a);
	};vec3.dot = function (a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};
	vec3.direction = function (a, b, c) {
		c || (c = a);var d = a[0] - b[0],
		    e = a[1] - b[1];a = a[2] - b[2];b = Math.sqrt(d * d + e * e + a * a);if (!b) {
			c[0] = 0;c[1] = 0;c[2] = 0;return c;
		}b = 1 / b;c[0] = d * b;c[1] = e * b;c[2] = a * b;return c;
	};vec3.lerp = function (a, b, c, d) {
		d || (d = a);d[0] = a[0] + c * (b[0] - a[0]);d[1] = a[1] + c * (b[1] - a[1]);d[2] = a[2] + c * (b[2] - a[2]);return d;
	};vec3.str = function (a) {
		return "[" + a[0] + ", " + a[1] + ", " + a[2] + "]";
	};
	mat3.create = function (a) {
		var b = new glMatrixArrayType(9);if (a) {
			b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[3];b[4] = a[4];b[5] = a[5];b[6] = a[6];b[7] = a[7];b[8] = a[8];b[9] = a[9];
		}return b;
	};mat3.set = function (a, b) {
		b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[3];b[4] = a[4];b[5] = a[5];b[6] = a[6];b[7] = a[7];b[8] = a[8];return b;
	};mat3.identity = function (a) {
		a[0] = 1;a[1] = 0;a[2] = 0;a[3] = 0;a[4] = 1;a[5] = 0;a[6] = 0;a[7] = 0;a[8] = 1;return a;
	};
	mat3.transpose = function (a, b) {
		if (!b || a == b) {
			var c = a[1],
			    d = a[2],
			    e = a[5];a[1] = a[3];a[2] = a[6];a[3] = c;a[5] = a[7];a[6] = d;a[7] = e;return a;
		}b[0] = a[0];b[1] = a[3];b[2] = a[6];b[3] = a[1];b[4] = a[4];b[5] = a[7];b[6] = a[2];b[7] = a[5];b[8] = a[8];return b;
	};mat3.toMat4 = function (a, b) {
		b || (b = mat4.create());b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = 0;b[4] = a[3];b[5] = a[4];b[6] = a[5];b[7] = 0;b[8] = a[6];b[9] = a[7];b[10] = a[8];b[11] = 0;b[12] = 0;b[13] = 0;b[14] = 0;b[15] = 1;return b;
	};
	mat3.str = function (a) {
		return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + "]";
	};var mat4 = {};mat4.create = function (a) {
		var b = new glMatrixArrayType(16);if (a) {
			b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[3];b[4] = a[4];b[5] = a[5];b[6] = a[6];b[7] = a[7];b[8] = a[8];b[9] = a[9];b[10] = a[10];b[11] = a[11];b[12] = a[12];b[13] = a[13];b[14] = a[14];b[15] = a[15];
		}return b;
	};
	mat4.set = function (a, b) {
		b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[3];b[4] = a[4];b[5] = a[5];b[6] = a[6];b[7] = a[7];b[8] = a[8];b[9] = a[9];b[10] = a[10];b[11] = a[11];b[12] = a[12];b[13] = a[13];b[14] = a[14];b[15] = a[15];return b;
	};mat4.identity = function (a) {
		a[0] = 1;a[1] = 0;a[2] = 0;a[3] = 0;a[4] = 0;a[5] = 1;a[6] = 0;a[7] = 0;a[8] = 0;a[9] = 0;a[10] = 1;a[11] = 0;a[12] = 0;a[13] = 0;a[14] = 0;a[15] = 1;return a;
	};
	mat4.transpose = function (a, b) {
		if (!b || a == b) {
			var c = a[1],
			    d = a[2],
			    e = a[3],
			    g = a[6],
			    f = a[7],
			    h = a[11];a[1] = a[4];a[2] = a[8];a[3] = a[12];a[4] = c;a[6] = a[9];a[7] = a[13];a[8] = d;a[9] = g;a[11] = a[14];a[12] = e;a[13] = f;a[14] = h;return a;
		}b[0] = a[0];b[1] = a[4];b[2] = a[8];b[3] = a[12];b[4] = a[1];b[5] = a[5];b[6] = a[9];b[7] = a[13];b[8] = a[2];b[9] = a[6];b[10] = a[10];b[11] = a[14];b[12] = a[3];b[13] = a[7];b[14] = a[11];b[15] = a[15];return b;
	};
	mat4.determinant = function (a) {
		var b = a[0],
		    c = a[1],
		    d = a[2],
		    e = a[3],
		    g = a[4],
		    f = a[5],
		    h = a[6],
		    i = a[7],
		    j = a[8],
		    k = a[9],
		    l = a[10],
		    o = a[11],
		    m = a[12],
		    n = a[13],
		    p = a[14];a = a[15];return m * k * h * e - j * n * h * e - m * f * l * e + g * n * l * e + j * f * p * e - g * k * p * e - m * k * d * i + j * n * d * i + m * c * l * i - b * n * l * i - j * c * p * i + b * k * p * i + m * f * d * o - g * n * d * o - m * c * h * o + b * n * h * o + g * c * p * o - b * f * p * o - j * f * d * a + g * k * d * a + j * c * h * a - b * k * h * a - g * c * l * a + b * f * l * a;
	};
	mat4.inverse = function (a, b) {
		b || (b = a);var c = a[0],
		    d = a[1],
		    e = a[2],
		    g = a[3],
		    f = a[4],
		    h = a[5],
		    i = a[6],
		    j = a[7],
		    k = a[8],
		    l = a[9],
		    o = a[10],
		    m = a[11],
		    n = a[12],
		    p = a[13],
		    r = a[14],
		    s = a[15],
		    A = c * h - d * f,
		    B = c * i - e * f,
		    t = c * j - g * f,
		    u = d * i - e * h,
		    v = d * j - g * h,
		    w = e * j - g * i,
		    x = k * p - l * n,
		    y = k * r - o * n,
		    z = k * s - m * n,
		    C = l * r - o * p,
		    D = l * s - m * p,
		    E = o * s - m * r,
		    q = 1 / (A * E - B * D + t * C + u * z - v * y + w * x);b[0] = (h * E - i * D + j * C) * q;b[1] = (-d * E + e * D - g * C) * q;b[2] = (p * w - r * v + s * u) * q;b[3] = (-l * w + o * v - m * u) * q;b[4] = (-f * E + i * z - j * y) * q;b[5] = (c * E - e * z + g * y) * q;b[6] = (-n * w + r * t - s * B) * q;b[7] = (k * w - o * t + m * B) * q;b[8] = (f * D - h * z + j * x) * q;
		b[9] = (-c * D + d * z - g * x) * q;b[10] = (n * v - p * t + s * A) * q;b[11] = (-k * v + l * t - m * A) * q;b[12] = (-f * C + h * y - i * x) * q;b[13] = (c * C - d * y + e * x) * q;b[14] = (-n * u + p * B - r * A) * q;b[15] = (k * u - l * B + o * A) * q;return b;
	};mat4.toRotationMat = function (a, b) {
		b || (b = mat4.create());b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[3];b[4] = a[4];b[5] = a[5];b[6] = a[6];b[7] = a[7];b[8] = a[8];b[9] = a[9];b[10] = a[10];b[11] = a[11];b[12] = 0;b[13] = 0;b[14] = 0;b[15] = 1;return b;
	};
	mat4.toMat3 = function (a, b) {
		b || (b = mat3.create());b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[4];b[4] = a[5];b[5] = a[6];b[6] = a[8];b[7] = a[9];b[8] = a[10];return b;
	};mat4.toInverseMat3 = function (a, b) {
		var c = a[0],
		    d = a[1],
		    e = a[2],
		    g = a[4],
		    f = a[5],
		    h = a[6],
		    i = a[8],
		    j = a[9],
		    k = a[10],
		    l = k * f - h * j,
		    o = -k * g + h * i,
		    m = j * g - f * i,
		    n = c * l + d * o + e * m;if (!n) return null;n = 1 / n;b || (b = mat3.create());b[0] = l * n;b[1] = (-k * d + e * j) * n;b[2] = (h * d - e * f) * n;b[3] = o * n;b[4] = (k * c - e * i) * n;b[5] = (-h * c + e * g) * n;b[6] = m * n;b[7] = (-j * c + d * i) * n;b[8] = (f * c - d * g) * n;return b;
	};
	mat4.multiply = function (a, b, c) {
		c || (c = a);var d = a[0],
		    e = a[1],
		    g = a[2],
		    f = a[3],
		    h = a[4],
		    i = a[5],
		    j = a[6],
		    k = a[7],
		    l = a[8],
		    o = a[9],
		    m = a[10],
		    n = a[11],
		    p = a[12],
		    r = a[13],
		    s = a[14];a = a[15];var A = b[0],
		    B = b[1],
		    t = b[2],
		    u = b[3],
		    v = b[4],
		    w = b[5],
		    x = b[6],
		    y = b[7],
		    z = b[8],
		    C = b[9],
		    D = b[10],
		    E = b[11],
		    q = b[12],
		    F = b[13],
		    G = b[14];b = b[15];c[0] = A * d + B * h + t * l + u * p;c[1] = A * e + B * i + t * o + u * r;c[2] = A * g + B * j + t * m + u * s;c[3] = A * f + B * k + t * n + u * a;c[4] = v * d + w * h + x * l + y * p;c[5] = v * e + w * i + x * o + y * r;c[6] = v * g + w * j + x * m + y * s;c[7] = v * f + w * k + x * n + y * a;c[8] = z * d + C * h + D * l + E * p;c[9] = z * e + C * i + D * o + E * r;c[10] = z * g + C * j + D * m + E * s;c[11] = z * f + C * k + D * n + E * a;c[12] = q * d + F * h + G * l + b * p;c[13] = q * e + F * i + G * o + b * r;c[14] = q * g + F * j + G * m + b * s;c[15] = q * f + F * k + G * n + b * a;return c;
	};mat4.multiplyVec3 = function (a, b, c) {
		c || (c = b);var d = b[0],
		    e = b[1];b = b[2];c[0] = a[0] * d + a[4] * e + a[8] * b + a[12];c[1] = a[1] * d + a[5] * e + a[9] * b + a[13];c[2] = a[2] * d + a[6] * e + a[10] * b + a[14];return c;
	};
	mat4.multiplyVec4 = function (a, b, c) {
		c || (c = b);var d = b[0],
		    e = b[1],
		    g = b[2];b = b[3];c[0] = a[0] * d + a[4] * e + a[8] * g + a[12] * b;c[1] = a[1] * d + a[5] * e + a[9] * g + a[13] * b;c[2] = a[2] * d + a[6] * e + a[10] * g + a[14] * b;c[3] = a[3] * d + a[7] * e + a[11] * g + a[15] * b;return c;
	};
	mat4.translate = function (a, b, c) {
		var d = b[0],
		    e = b[1];b = b[2];if (!c || a == c) {
			a[12] = a[0] * d + a[4] * e + a[8] * b + a[12];a[13] = a[1] * d + a[5] * e + a[9] * b + a[13];a[14] = a[2] * d + a[6] * e + a[10] * b + a[14];a[15] = a[3] * d + a[7] * e + a[11] * b + a[15];return a;
		}var g = a[0],
		    f = a[1],
		    h = a[2],
		    i = a[3],
		    j = a[4],
		    k = a[5],
		    l = a[6],
		    o = a[7],
		    m = a[8],
		    n = a[9],
		    p = a[10],
		    r = a[11];c[0] = g;c[1] = f;c[2] = h;c[3] = i;c[4] = j;c[5] = k;c[6] = l;c[7] = o;c[8] = m;c[9] = n;c[10] = p;c[11] = r;c[12] = g * d + j * e + m * b + a[12];c[13] = f * d + k * e + n * b + a[13];c[14] = h * d + l * e + p * b + a[14];c[15] = i * d + o * e + r * b + a[15];return c;
	};
	mat4.scale = function (a, b, c) {
		var d = b[0],
		    e = b[1];b = b[2];if (!c || a == c) {
			a[0] *= d;a[1] *= d;a[2] *= d;a[3] *= d;a[4] *= e;a[5] *= e;a[6] *= e;a[7] *= e;a[8] *= b;a[9] *= b;a[10] *= b;a[11] *= b;return a;
		}c[0] = a[0] * d;c[1] = a[1] * d;c[2] = a[2] * d;c[3] = a[3] * d;c[4] = a[4] * e;c[5] = a[5] * e;c[6] = a[6] * e;c[7] = a[7] * e;c[8] = a[8] * b;c[9] = a[9] * b;c[10] = a[10] * b;c[11] = a[11] * b;c[12] = a[12];c[13] = a[13];c[14] = a[14];c[15] = a[15];return c;
	};
	mat4.rotate = function (a, b, c, d) {
		var e = c[0],
		    g = c[1];c = c[2];var f = Math.sqrt(e * e + g * g + c * c);if (!f) return null;if (f != 1) {
			f = 1 / f;e *= f;g *= f;c *= f;
		}var h = Math.sin(b),
		    i = Math.cos(b),
		    j = 1 - i;b = a[0];f = a[1];var k = a[2],
		    l = a[3],
		    o = a[4],
		    m = a[5],
		    n = a[6],
		    p = a[7],
		    r = a[8],
		    s = a[9],
		    A = a[10],
		    B = a[11],
		    t = e * e * j + i,
		    u = g * e * j + c * h,
		    v = c * e * j - g * h,
		    w = e * g * j - c * h,
		    x = g * g * j + i,
		    y = c * g * j + e * h,
		    z = e * c * j + g * h;e = g * c * j - e * h;g = c * c * j + i;if (d) {
			if (a != d) {
				d[12] = a[12];d[13] = a[13];d[14] = a[14];d[15] = a[15];
			}
		} else d = a;d[0] = b * t + o * u + r * v;d[1] = f * t + m * u + s * v;d[2] = k * t + n * u + A * v;d[3] = l * t + p * u + B * v;d[4] = b * w + o * x + r * y;d[5] = f * w + m * x + s * y;d[6] = k * w + n * x + A * y;d[7] = l * w + p * x + B * y;d[8] = b * z + o * e + r * g;d[9] = f * z + m * e + s * g;d[10] = k * z + n * e + A * g;d[11] = l * z + p * e + B * g;return d;
	};mat4.rotateX = function (a, b, c) {
		var d = Math.sin(b);b = Math.cos(b);var e = a[4],
		    g = a[5],
		    f = a[6],
		    h = a[7],
		    i = a[8],
		    j = a[9],
		    k = a[10],
		    l = a[11];if (c) {
			if (a != c) {
				c[0] = a[0];c[1] = a[1];c[2] = a[2];c[3] = a[3];c[12] = a[12];c[13] = a[13];c[14] = a[14];c[15] = a[15];
			}
		} else c = a;c[4] = e * b + i * d;c[5] = g * b + j * d;c[6] = f * b + k * d;c[7] = h * b + l * d;c[8] = e * -d + i * b;c[9] = g * -d + j * b;c[10] = f * -d + k * b;c[11] = h * -d + l * b;return c;
	};
	mat4.rotateY = function (a, b, c) {
		var d = Math.sin(b);b = Math.cos(b);var e = a[0],
		    g = a[1],
		    f = a[2],
		    h = a[3],
		    i = a[8],
		    j = a[9],
		    k = a[10],
		    l = a[11];if (c) {
			if (a != c) {
				c[4] = a[4];c[5] = a[5];c[6] = a[6];c[7] = a[7];c[12] = a[12];c[13] = a[13];c[14] = a[14];c[15] = a[15];
			}
		} else c = a;c[0] = e * b + i * -d;c[1] = g * b + j * -d;c[2] = f * b + k * -d;c[3] = h * b + l * -d;c[8] = e * d + i * b;c[9] = g * d + j * b;c[10] = f * d + k * b;c[11] = h * d + l * b;return c;
	};
	mat4.rotateZ = function (a, b, c) {
		var d = Math.sin(b);b = Math.cos(b);var e = a[0],
		    g = a[1],
		    f = a[2],
		    h = a[3],
		    i = a[4],
		    j = a[5],
		    k = a[6],
		    l = a[7];if (c) {
			if (a != c) {
				c[8] = a[8];c[9] = a[9];c[10] = a[10];c[11] = a[11];c[12] = a[12];c[13] = a[13];c[14] = a[14];c[15] = a[15];
			}
		} else c = a;c[0] = e * b + i * d;c[1] = g * b + j * d;c[2] = f * b + k * d;c[3] = h * b + l * d;c[4] = e * -d + i * b;c[5] = g * -d + j * b;c[6] = f * -d + k * b;c[7] = h * -d + l * b;return c;
	};
	mat4.frustum = function (a, b, c, d, e, g, f) {
		f || (f = mat4.create());var h = b - a,
		    i = d - c,
		    j = g - e;f[0] = e * 2 / h;f[1] = 0;f[2] = 0;f[3] = 0;f[4] = 0;f[5] = e * 2 / i;f[6] = 0;f[7] = 0;f[8] = (b + a) / h;f[9] = (d + c) / i;f[10] = -(g + e) / j;f[11] = -1;f[12] = 0;f[13] = 0;f[14] = -(g * e * 2) / j;f[15] = 0;return f;
	};mat4.perspective = function (a, b, c, d, e) {
		a = c * Math.tan(a * Math.PI / 360);b = a * b;return mat4.frustum(-b, b, -a, a, c, d, e);
	};
	mat4.ortho = function (a, b, c, d, e, g, f) {
		f || (f = mat4.create());var h = b - a,
		    i = d - c,
		    j = g - e;f[0] = 2 / h;f[1] = 0;f[2] = 0;f[3] = 0;f[4] = 0;f[5] = 2 / i;f[6] = 0;f[7] = 0;f[8] = 0;f[9] = 0;f[10] = -2 / j;f[11] = 0;f[12] = -(a + b) / h;f[13] = -(d + c) / i;f[14] = -(g + e) / j;f[15] = 1;return f;
	};
	mat4.lookAt = function (a, b, c, d) {
		d || (d = mat4.create());var e = a[0],
		    g = a[1];a = a[2];var f = c[0],
		    h = c[1],
		    i = c[2];c = b[1];var j = b[2];if (e == b[0] && g == c && a == j) return mat4.identity(d);var k, l, o, m;c = e - b[0];j = g - b[1];b = a - b[2];m = 1 / Math.sqrt(c * c + j * j + b * b);c *= m;j *= m;b *= m;k = h * b - i * j;i = i * c - f * b;f = f * j - h * c;if (m = Math.sqrt(k * k + i * i + f * f)) {
			m = 1 / m;k *= m;i *= m;f *= m;
		} else f = i = k = 0;h = j * f - b * i;l = b * k - c * f;o = c * i - j * k;if (m = Math.sqrt(h * h + l * l + o * o)) {
			m = 1 / m;h *= m;l *= m;o *= m;
		} else o = l = h = 0;d[0] = k;d[1] = h;d[2] = c;d[3] = 0;d[4] = i;d[5] = l;d[6] = j;d[7] = 0;d[8] = f;d[9] = o;d[10] = b;d[11] = 0;d[12] = -(k * e + i * g + f * a);d[13] = -(h * e + l * g + o * a);d[14] = -(c * e + j * g + b * a);d[15] = 1;return d;
	};mat4.str = function (a) {
		return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + "]";
	};quat4 = {};quat4.create = function (a) {
		var b = new glMatrixArrayType(4);if (a) {
			b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[3];
		}return b;
	};quat4.set = function (a, b) {
		b[0] = a[0];b[1] = a[1];b[2] = a[2];b[3] = a[3];return b;
	};
	quat4.calculateW = function (a, b) {
		var c = a[0],
		    d = a[1],
		    e = a[2];if (!b || a == b) {
			a[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));return a;
		}b[0] = c;b[1] = d;b[2] = e;b[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));return b;
	};quat4.inverse = function (a, b) {
		if (!b || a == b) {
			a[0] *= 1;a[1] *= 1;a[2] *= 1;return a;
		}b[0] = -a[0];b[1] = -a[1];b[2] = -a[2];b[3] = a[3];return b;
	};quat4.length = function (a) {
		var b = a[0],
		    c = a[1],
		    d = a[2];a = a[3];return Math.sqrt(b * b + c * c + d * d + a * a);
	};
	quat4.normalize = function (a, b) {
		b || (b = a);var c = a[0],
		    d = a[1],
		    e = a[2],
		    g = a[3],
		    f = Math.sqrt(c * c + d * d + e * e + g * g);if (f == 0) {
			b[0] = 0;b[1] = 0;b[2] = 0;b[3] = 0;return b;
		}f = 1 / f;b[0] = c * f;b[1] = d * f;b[2] = e * f;b[3] = g * f;return b;
	};quat4.multiply = function (a, b, c) {
		c || (c = a);var d = a[0],
		    e = a[1],
		    g = a[2];a = a[3];var f = b[0],
		    h = b[1],
		    i = b[2];b = b[3];c[0] = d * b + a * f + e * i - g * h;c[1] = e * b + a * h + g * f - d * i;c[2] = g * b + a * i + d * h - e * f;c[3] = a * b - d * f - e * h - g * i;return c;
	};
	quat4.multiplyVec3 = function (a, b, c) {
		c || (c = b);var d = b[0],
		    e = b[1],
		    g = b[2];b = a[0];var f = a[1],
		    h = a[2];a = a[3];var i = a * d + f * g - h * e,
		    j = a * e + h * d - b * g,
		    k = a * g + b * e - f * d;d = -b * d - f * e - h * g;c[0] = i * a + d * -b + j * -h - k * -f;c[1] = j * a + d * -f + k * -b - i * -h;c[2] = k * a + d * -h + i * -f - j * -b;return c;
	};quat4.toMat3 = function (a, b) {
		b || (b = mat3.create());var c = a[0],
		    d = a[1],
		    e = a[2],
		    g = a[3],
		    f = c + c,
		    h = d + d,
		    i = e + e,
		    j = c * f,
		    k = c * h;c = c * i;var l = d * h;d = d * i;e = e * i;f = g * f;h = g * h;g = g * i;b[0] = 1 - (l + e);b[1] = k - g;b[2] = c + h;b[3] = k + g;b[4] = 1 - (j + e);b[5] = d - f;b[6] = c - h;b[7] = d + f;b[8] = 1 - (j + l);return b;
	};
	quat4.toMat4 = function (a, b) {
		b || (b = mat4.create());var c = a[0],
		    d = a[1],
		    e = a[2],
		    g = a[3],
		    f = c + c,
		    h = d + d,
		    i = e + e,
		    j = c * f,
		    k = c * h;c = c * i;var l = d * h;d = d * i;e = e * i;f = g * f;h = g * h;g = g * i;b[0] = 1 - (l + e);b[1] = k - g;b[2] = c + h;b[3] = 0;b[4] = k + g;b[5] = 1 - (j + e);b[6] = d - f;b[7] = 0;b[8] = c - h;b[9] = d + f;b[10] = 1 - (j + l);b[11] = 0;b[12] = 0;b[13] = 0;b[14] = 0;b[15] = 1;return b;
	};quat4.slerp = function (a, b, c, d) {
		d || (d = a);var e = c;if (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] < 0) e = -1 * c;d[0] = 1 - c * a[0] + e * b[0];d[1] = 1 - c * a[1] + e * b[1];d[2] = 1 - c * a[2] + e * b[2];d[3] = 1 - c * a[3] + e * b[3];return d;
	};
	quat4.str = function (a) {
		return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + "]";
	};

	module.exports = {
		vec3: vec3,
		mat3: mat3,
		mat4: mat4,
		quat4: quat4
	};

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

	"use strict";

	/**
	 *
	 */
	function __inherit(child, parent) {
	  var getPrototype = function getPrototype(p) {
	    if (Object.create) {
	      return Object.create(p);
	    }
	    function f() {};
	    f.prototype = p;
	    return new f();
	  };
	  child.prototype = getPrototype(parent.prototype);
	  child.prototype.constructor = child;
	}

	// function __copyParentMethod(child, parent, methodName) {
	//   var parentName = parent.name;
	//   var name = parentName + '_' + 
	//                ((methodName[0] == '_') ? methodName.slice(1) : methodName);
	//   child.prototype[name] = parent.prototype[methodName];
	// }

	module.exports = __inherit;

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Inherit = __webpack_require__(7);

	var _Inherit2 = _interopRequireDefault(_Inherit);

	var _glMatrix095Min = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function PhysicsEntity() {
	  this.workNum = 10;
	  this.workTrs = [];
	  this.workQs = [];
	  this.workVs = [];
	  for (var i = 0; i < this.workNum; i++) {
	    this.workTrs[i] = new Ammo.btTransform();
	    this.workQs[i] = new Ammo.btQuaternion();
	    this.workVs[i] = new Ammo.btVector3();
	  }
	};

	PhysicsEntity.prototype.allocTr = function () {
	  var tr = this.workTrs[this.workTrs.length - 1];
	  this.workTrs.length--;
	  return tr;
	};

	PhysicsEntity.prototype.freeTr = function (tr) {
	  this.workTrs[this.workTrs.length] = tr;
	};

	PhysicsEntity.prototype.allocQ = function () {
	  var q = this.workQs[this.workQs.length - 1];
	  this.workQs.length--;
	  return q;
	};

	PhysicsEntity.prototype.freeQ = function (q) {
	  this.workQs[this.workQs.length] = q;
	};

	PhysicsEntity.prototype.allocV = function () {
	  var v = this.workVs[this.workVs.length - 1];
	  this.workVs.length--;
	  return v;
	};

	PhysicsEntity.prototype.freeV = function (v) {
	  this.workVs[this.workVs.length] = v;
	};

	/**
	 * TODO: temporal
	 * @return btTransform
	 */
	PhysicsEntity.prototype._newTransform = function () {
	  return new Ammo.btTransform();
	};

	/**
	 * TODO: temporal
	 */
	PhysicsEntity.prototype._setIdentity = function (tr) {
	  tr.setIdentity();
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i
	 */
	PhysicsEntity.prototype._getBasis = function (tr) {
	  var q = this.allocQ();
	  tr.getBasis().getRotation(q);
	  return q;
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i
	 */
	PhysicsEntity.prototype._getBasisMatrix3 = function (tr) {
	  var q = this._getBasis(tr);
	  var m = this._quaternionToMatrix3(q);
	  this.freeQ(q);
	  return m;
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i/o
	 * @param q btQuaternion i
	 */
	PhysicsEntity.prototype._setBasis = function (tr, q) {
	  tr.setRotation(q);
	  //  var p = this._quaternionToEulerZYX(q);
	  //  tr.getBasis().setEulerZYX(p[0], p[1], p[2]);
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i/o
	 * @param m array[9] i
	 */
	PhysicsEntity.prototype._setBasisMatrix3 = function (tr, m) {
	  var q = this._matrix3ToQuaternion(m);
	  this._setBasis(tr, q);
	  this.freeQ(q);
	};

	/**
	 * TODO: temporal
	 * Note: [x, y, z, w]
	 * @param tr btTransform i/o
	 * @param a array[4] i
	 */
	PhysicsEntity.prototype._setBasisArray4 = function (tr, a) {
	  var q = this._array4ToQuaternion(a);
	  this._setBasis(tr, q);
	  this.freeQ(q);
	};

	/**
	 * TODO: temporal
	 * Note: [x, y, z, w]
	 * @param tr btTransform i/o
	 * @param a array[4] i
	 */
	PhysicsEntity.prototype._setBasisArray4Left = function (tr, a) {
	  a[0] = -a[0];
	  a[1] = -a[1];
	  this._setBasisArray4(tr, a);
	  a[0] = -a[0];
	  a[1] = -a[1];
	};

	/**
	 * TODO: temporal
	 * Note: [x, y, z]
	 * @param tr btTransform i/o
	 * @param m array[3] i
	 */
	PhysicsEntity.prototype._setBasisArray3 = function (tr, a) {
	  tr.getBasis().setEulerZYX(a[0], a[1], a[2]);
	};

	/**
	 * TODO: temporal
	 * Note: [x, y, z]
	 * @param tr btTransform i/o
	 * @param m array[3] i
	 */
	PhysicsEntity.prototype._setBasisArray3Left = function (tr, a) {
	  a[0] = -a[0];
	  a[1] = -a[1];
	  this._setBasisArray3(tr, a);
	  a[0] = -a[0];
	  a[1] = -a[1];
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._getOrigin = function (tr) {
	  return tr.getOrigin();
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i
	 * @return array[3]
	 */
	PhysicsEntity.prototype._getOriginArray3 = function (tr) {
	  var o = this._getOrigin(tr);
	  return [o.x(), o.y(), o.z()];
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i/o
	 * @param v btVector3 i
	 */
	PhysicsEntity.prototype._setOrigin = function (tr, v) {
	  tr.getOrigin().setValue(v.x(), v.y(), v.z());
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i/o
	 * @param a array[3] i
	 */
	PhysicsEntity.prototype._setOriginArray3 = function (tr, a) {
	  tr.getOrigin().setValue(a[0], a[1], a[2]);
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i/o
	 * @param a array[3] i
	 */
	PhysicsEntity.prototype._setOriginArray3Left = function (tr, a) {
	  a[2] = -a[2];
	  this._setOriginArray3(tr, a);
	  a[2] = -a[2];
	};

	/**
	 * TODO: temporal
	 * @param tr btTransform i/o
	 * @param x float i
	 * @param y float i
	 * @param z float i
	 */
	PhysicsEntity.prototype._setOriginFloats = function (tr, x, y, z) {
	  tr.getOrigin().setValue(x, y, z);
	};

	/**
	 * TODO: temporal
	 * @param tr1 btTransform i/o
	 * @param tr2 btTransform i
	 */
	PhysicsEntity.prototype._copyOrigin = function (tr1, tr2) {
	  var o = tr2.getOrigin();
	  this._setOrigin(tr1, o);
	};

	/**
	 * TODO: temporal
	 * @param v1 btVector3 i
	 * @param v2 btVector3 i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._addVector3 = function (v1, v2) {
	  var v = this.allocV();
	  v.setValue(v1.x() + v2.x(), v1.y() + v2.y(), v1.z() + v2.z());
	  return v;
	};

	/**
	 * TODO: temporal
	 * @param v btVector3 i
	 * @param a array[3]
	 * @return btVector3
	 */
	PhysicsEntity.prototype._addVector3ByArray3 = function (v, a) {
	  var v2 = this.allocV();
	  v2.setValue(v.x() + a[0], v.y() + a[1], v.z() + a[2]);
	  return v2;
	};

	/**
	 * TODO: temporal
	 * @param v1 btVector3 i
	 * @param v2 btVector3 i
	 * @return float
	 */
	PhysicsEntity.prototype._dotVectors3 = function (v1, v2) {
	  return v1.x() * v2.x() + v1.y() * v2.y() + v1.z() * v2.z();
	};

	/**
	 * TODO: temporal
	 * @param m array[9] i
	 * @param i int i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._rowOfMatrix3 = function (m, i) {
	  var v = this.allocV();
	  v.setValue(m[i * 3 + 0], m[i * 3 + 1], m[i * 3 + 2]);
	  return v;
	};

	/**
	 * TODO: temporal
	 * @param m array[9] i
	 * @param i int i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._columnOfMatrix3 = function (m, i) {
	  var v = this.allocV();
	  v.setValue(m[i + 0], m[i + 3], m[i + 6]);
	  return v;
	};

	/**
	 * TODO: temporal
	 * @param v btVector3 i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._negativeVector3 = function (v) {
	  var v2 = this.allocV();
	  v2.setValue(-v.x(), -v.y(), -v.z());
	  return v2;
	};

	/**
	 * TODO: temporal
	 * @param v btVector3 i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._cloneVector3 = function (v) {
	  var v2 = this.allocV();
	  v2.setValue(v.x(), v.y(), v.z());
	  return v2;
	};

	/**
	 * TODO: temporal
	 * @param m array[9]
	 * @return array[9]
	 */
	PhysicsEntity.prototype._cloneMatrix3 = function (m) {
	  var m2 = [];
	  for (var i = 0; i < 9; i++) {
	    m2[i] = m[i];
	  }
	  return m2;
	};

	/**
	 * TODO: temporal
	 * @param a array[3] i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._array3ToVector3 = function (a) {
	  var v = this.allocV();
	  v.setValue(a[0], a[1], a[2]);
	  return v;
	};

	/**
	 * TODO: temporal
	 * @param v btVector3 i
	 * @return array[3]
	 */
	PhysicsEntity.prototype._vector3ToArray3 = function (v) {
	  var a = [];
	  a[0] = v.x();
	  a[1] = v.y();
	  a[2] = v.z();
	  return a;
	};

	/**
	 * Note: [x, y, z, w]
	 * TODO: temporal
	 * @param a array[4]
	 * @return btQuaternion
	 */
	PhysicsEntity.prototype._array4ToQuaternion = function (a) {
	  var q = this.allocQ();
	  q.setX(a[0]);
	  q.setY(a[1]);
	  q.setZ(a[2]);
	  q.setW(a[3]);
	  return q;
	};

	/**
	 * Note: [x, y, z, w]
	 * TODO: temporal
	 * @param q btQuaternion
	 * @return array[4]
	 */
	PhysicsEntity.prototype._quaternionToArray4 = function (q) {
	  var a = [q.x(), q.y(), q.z(), q.w()];
	  return a;
	};

	/**
	 * TODO: implement correctly
	 * TODO: temporal
	 * @param q btQuaternion i
	 * @return array[3]
	 */
	PhysicsEntity.prototype._quaternionToEulerZYX = function (q) {
	  var qw = q.w();
	  var qx = q.x();
	  var qy = q.y();
	  var qz = q.z();
	  var qw2 = qw * qw;
	  var qx2 = qx * qx;
	  var qy2 = qy * qy;
	  var qz2 = qz * qz;
	  var test = qx * qy + qz * qw;

	  var yaw, pitch, roll;

	  if (test > 0.499) {
	    roll = 360 / Math.PI * Math.atan2(qx, qw);
	    pitch = 90;
	    yaw = 0;
	  } else if (test < -0.499) {
	    roll = -360 / Math.PI * Math.atan2(qx, qw);
	    pitch = -90;
	    roll = 0;
	  } else {
	    var h = Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy2 - 2 * qz);
	    var a = Math.asin(2 * qx * qy + 2 * qz * qw);
	    var b = Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx2 - 2 * qz);
	    roll = Math.round(h * 180 / Math.PI);
	    pitch = Math.round(a * 180 / Math.PI);
	    yaw = Math.round(b * 180 / Math.PI);
	  }

	  return [yaw, roll, pitch];

	  var x2 = q.x() * q.x();
	  var y2 = q.y() * q.y();
	  var z2 = q.z() * q.z();
	  var w2 = q.w() * q.w();
	  var len = x2 + y2 + z2 + w2;
	  var abcd = q.w() * q.x() + q.y() * q.z();
	  var eps = 1e-7;

	  var yaw, pitch, roll;

	  if (abcd > (0.5 - eps) * len) {
	    yaw = 2 * Math.atan2(q.y(), q.w());
	    pitch = Math.PI;
	    roll = 0;
	  } else if (abcd < (-0.5 + eps) * len) {
	    yaw = -2 * Math.atan2(q.y(), q.w());
	    pitch = -Math.PI;
	    roll = 0;
	  } else {
	    var adbc = q.w() * q.z() - q.x() * q.y();
	    var acbd = q.w() * q.y() - q.x() * q.z();
	    yaw = Math.atan2(2 * adbc, 1 - 2 * (z2 + x2));
	    pitch = Math.asin(2 * abcd / len);
	    roll = Math.atan2(2 * acbd, 1 - 2 * (y2 + x2));
	  }
	  return [roll, pitch, yaw];
	  //  return [yaw, pitch, roll];
	};

	/**
	 * origin = tr1.basis * tr2.origin + tr1.origin
	 * basis = tr1.basis * tr2.basis
	 * TODO: temporal
	 * @param tr1 btTransform i
	 * @param tr2 btTransform i
	 * @return btTransform
	 */
	PhysicsEntity.prototype._multiplyTransforms = function (tr1, tr2) {
	  var tr = this.allocTr();
	  tr.setIdentity();

	  var m1 = this._getBasisMatrix3(tr1);
	  var m2 = this._getBasisMatrix3(tr2);

	  var o1 = this._getOrigin(tr1);
	  var o2 = this._getOrigin(tr2);

	  var v1 = this._multiplyMatrix3ByVector3(m1, o2);
	  var v2 = this._addVector3(v1, o1);
	  this._setOrigin(tr, v2);

	  var m3 = this._multiplyMatrices3(m1, m2);
	  this._setBasisMatrix3(tr, m3);

	  this.freeV(v1);
	  this.freeV(v2);

	  return tr;
	};

	/**
	 * origin = tr.basis.transpose * -tr.origin
	 * basis = tr.basis.transpose
	 * TODO: temporal
	 * @param tr btTransform i
	 * @return btTransform
	 */
	PhysicsEntity.prototype._inverseTransform = function (tr) {
	  var tr2 = this.allocTr();

	  var m1 = this._getBasisMatrix3(tr);
	  var o = this._getOrigin(tr);

	  var m2 = this._transposeMatrix3(m1);
	  var v1 = this._negativeVector3(o);
	  var v2 = this._multiplyMatrix3ByVector3(m2, v1);

	  this._setOrigin(tr2, v2);
	  this._setBasisMatrix3(tr2, m2);

	  this.freeV(v1);
	  this.freeV(v2);

	  return tr2;
	};

	/**
	 * tr.basis * v1 + tr.origin
	 * TODO: temporal
	 * @param tr btTransform i
	 * @param v btVector3 i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._multiplyTransformByVector3 = function (tr, v) {
	  var m = this._getBasisMatrix3(tr);
	  var o = this._getOrigin(tr);
	  var v2 = this._multiplyMatrix3ByVector3(m, v);
	  var v3 = this._addVector3(v2, o);

	  this.freeV(v2);

	  return v3;
	};

	/**
	 * TODO: temporal
	 * @param m array[9] i
	 * @param v btVector3 i
	 * @return btVector3
	 */
	PhysicsEntity.prototype._multiplyMatrix3ByVector3 = function (m, v) {
	  var v4 = this.allocV();

	  var v0 = this._rowOfMatrix3(m, 0);
	  var v1 = this._rowOfMatrix3(m, 1);
	  var v2 = this._rowOfMatrix3(m, 2);
	  var x = this._dotVectors3(v0, v);
	  var y = this._dotVectors3(v1, v);
	  var z = this._dotVectors3(v2, v);

	  v4.setValue(x, y, z);

	  this.freeV(v0);
	  this.freeV(v1);
	  this.freeV(v2);

	  return v4;
	};

	/**
	 * TODO: temporal
	 * @param m1 array[9] i
	 * @param m2 array[9] i
	 * @return array[9]
	 */
	PhysicsEntity.prototype._multiplyMatrices3 = function (m1, m2) {
	  var m3 = [];

	  var v10 = this._rowOfMatrix3(m1, 0);
	  var v11 = this._rowOfMatrix3(m1, 1);
	  var v12 = this._rowOfMatrix3(m1, 2);

	  var v20 = this._columnOfMatrix3(m2, 0);
	  var v21 = this._columnOfMatrix3(m2, 1);
	  var v22 = this._columnOfMatrix3(m2, 2);

	  m3[0] = this._dotVectors3(v10, v20);
	  m3[1] = this._dotVectors3(v10, v21);
	  m3[2] = this._dotVectors3(v10, v22);
	  m3[3] = this._dotVectors3(v11, v20);
	  m3[4] = this._dotVectors3(v11, v21);
	  m3[5] = this._dotVectors3(v11, v22);
	  m3[6] = this._dotVectors3(v12, v20);
	  m3[7] = this._dotVectors3(v12, v21);
	  m3[8] = this._dotVectors3(v12, v22);

	  this.freeV(v10);
	  this.freeV(v11);
	  this.freeV(v12);
	  this.freeV(v20);
	  this.freeV(v21);
	  this.freeV(v22);

	  return m3;
	};

	/**
	 * TODO: temporal
	 * Note: 0 1 2
	 *       3 4 5
	 *       6 7 8
	 * @param m array[9] i
	 * @return array[9]
	 */
	PhysicsEntity.prototype._transposeMatrix3 = function (m) {
	  var m2 = [];
	  m2[0] = m[0];
	  m2[1] = m[3];
	  m2[2] = m[6];
	  m2[3] = m[1];
	  m2[4] = m[4];
	  m2[5] = m[7];
	  m2[6] = m[2];
	  m2[7] = m[5];
	  m2[8] = m[8];
	  return m2;
	};

	/**
	 * TODO: temporal
	 * Note: 0 1 2  00 01 02  a b c
	 *       3 4 5  10 11 12  d e f
	 *       6 7 8  20 21 22  g h i
	 * @param m array[9] i
	 * @return array[9]
	 */
	PhysicsEntity.prototype._inverseMatrix3 = function (m) {
	  var m00 = m[0];
	  var m01 = m[1];
	  var m02 = m[2];
	  var m10 = m[3];
	  var m11 = m[4];
	  var m12 = m[5];
	  var m20 = m[6];
	  var m21 = m[7];
	  var m22 = m[8];

	  var det = m00 * m11 * m22 + m10 * m21 * m02 + m20 * m01 * m12 - m20 * m11 * m02 - m10 * m01 * m22 - m00 * m21 * m12;

	  if (det == 0) return this._cloneMatrix3(m);

	  var m2 = [];

	  m2[0] = (m11 * m22 - m12 * m21) / det;
	  m2[1] = (m02 * m21 - m01 * m22) / det;
	  m2[2] = (m01 * m12 - m02 * m11) / det;
	  m2[3] = (m12 * m20 - m10 * m22) / det;
	  m2[4] = (m00 * m22 - m02 * m20) / det;
	  m2[5] = (m02 * m10 - m00 * m12) / det;
	  m2[6] = (m10 * m21 - m11 * m20) / det;
	  m2[7] = (m01 * m20 - m00 * m21) / det;
	  m2[8] = (m00 * m11 - m01 * m10) / det;

	  return m2;
	};

	/**
	 * TODO: temporal
	 * Note: 0 1 2
	 *       3 4 5
	 *       6 7 8
	 * @param q btQuaternion i
	 * @return array[9]
	 */
	PhysicsEntity.prototype._quaternionToMatrix3 = function (q) {
	  var q2 = _glMatrix095Min.quat4.create();
	  q2[0] = q.x();
	  q2[1] = q.y();
	  q2[2] = q.z();
	  q2[3] = q.w();
	  return _glMatrix095Min.quat4.toMat3(q2);
	};

	/**
	 * TODO: temporal
	 * Note: 0 1 2   00 01 02
	 *       3 4 5   10 11 12
	 *       6 7 8   20 21 22
	 * @param m array[9] i
	 * @return btQuaternion
	 */
	PhysicsEntity.prototype._matrix3ToQuaternion = function (m) {
	  var t = m[0] + m[4] + m[8];
	  var s, x, y, z, w;
	  if (t > 0) {
	    s = Math.sqrt(t + 1.0) * 2;
	    w = 0.25 * s;
	    x = (m[7] - m[5]) / s;
	    y = (m[2] - m[6]) / s;
	    z = (m[3] - m[1]) / s;
	  } else if (m[0] > m[4] && m[0] > m[8]) {
	    s = Math.sqrt(1.0 + m[0] - m[4] - m[8]) * 2;
	    w = (m[7] - m[5]) / s;
	    x = 0.25 * s;
	    y = (m[1] + m[3]) / s;
	    z = (m[2] + m[6]) / s;
	  } else if (m[4] > m[8]) {
	    s = Math.sqrt(1.0 + m[4] - m[0] - m[8]) * 2;
	    w = (m[2] - m[6]) / s;
	    x = (m[1] + m[3]) / s;
	    y = 0.25 * s;
	    z = (m[5] + m[7]) / s;
	  } else {
	    s = Math.sqrt(1.0 + m[8] - m[0] - m[4]) * 2;
	    w = (m[3] - m[1]) / s;
	    x = (m[2] + m[6]) / s;
	    y = (m[5] + m[7]) / s;
	    z = 0.25 * s;
	  }

	  var q = this.allocQ();
	  q.setX(x);
	  q.setY(y);
	  q.setZ(z);
	  q.setW(w);
	  return q;
	};

	PhysicsEntity.prototype._dumpTransform = function (tr) {
	  var q = this._getBasis(tr);

	  var str = '';
	  str += '-- origin --\n';
	  str += this._getOriginArray3(tr).toString() + '\n';
	  str += '-- quaternion --\n';
	  str += [q.x(), q.y(), q.z(), q.w()].toString() + '\n';
	  str += '-- matrix --\n';
	  str += this._dumpMatrix3(this._getBasisMatrix3(tr));

	  this.freeQ(q);

	  return str;
	};

	PhysicsEntity.prototype._dumpMatrix3 = function (m) {
	  var str = '';
	  for (var i = 0; i < 3; i++) {
	    str += [m[i * 3 + 0], m[i * 3 + 1], m[i * 3 + 2]].toString() + ',\n';
	  }
	  return str;
	};

	function PhysicsRigidBody(pmd, world, body) {
	  this.parent = PhysicsEntity;
	  this.parent.call(this);

	  this.pmd = pmd;
	  this.world = world;
	  this.body = body;

	  this.rb = null;
	  this.bone = null;
	  this.form = null;
	  this.boneForm = null;
	  this.boneOffsetForm = null;
	  this.boneOffsetFormInverse = null;

	  this._init();
	};
	(0, _Inherit2.default)(PhysicsRigidBody, PhysicsEntity);

	/**
	 * TODO: temporal
	 */
	PhysicsRigidBody.prototype._init = function () {
	  var body = this.body;
	  var bone = this.pmd.bones[body.boneIndex];

	  var shape = this._generateShape(body);
	  var weight = body.type == 0 ? 0 : body.weight;
	  var localInertia = this.allocV();
	  localInertia.setValue(0, 0, 0);

	  if (weight != 0) shape.calculateLocalInertia(weight, localInertia);

	  var boneOffsetForm = this.allocTr();
	  this._setIdentity(boneOffsetForm);
	  this._setOriginArray3Left(boneOffsetForm, body.position);
	  this._setBasisArray3Left(boneOffsetForm, body.rotation);

	  var boneForm = this.allocTr();
	  this._setIdentity(boneForm);
	  // TODO: temporal workaround
	  var pos = this.body.boneIndex == 0xFFFF ? [0, 0, 0] : bone.position;
	  this._setOriginArray3Left(boneForm, pos);

	  var form = this._multiplyTransforms(boneForm, boneOffsetForm);
	  var state = new Ammo.btDefaultMotionState(form);

	  var info = new Ammo.btRigidBodyConstructionInfo(weight, state, shape, localInertia);
	  info.set_m_friction(body.friction);
	  info.set_m_restitution(body.recoil);

	  var rb = new Ammo.btRigidBody(info);
	  if (body.type == 0) {
	    rb.setCollisionFlags(rb.getCollisionFlags() | 2);
	    rb.setActivationState(4);
	  }
	  rb.setDamping(body.positionDim, body.rotationDim);
	  rb.setSleepingThresholds(0, 0);

	  this.world.addRigidBody(rb, 1 << body.groupIndex, body.groupTarget);

	  this.rb = rb;
	  this.bone = bone;
	  this.boneOffsetForm = boneOffsetForm;
	  this.boneOffsetFormInverse = this._inverseTransform(boneOffsetForm);

	  this.freeV(localInertia);
	  this.freeTr(form);
	  this.freeTr(boneForm);
	};

	PhysicsRigidBody.prototype._generateShape = function (b) {
	  switch (b.shapeType) {
	    case 0:
	      return new Ammo.btSphereShape(b.width);
	    case 1:
	      return new Ammo.btBoxShape(new Ammo.btVector3(b.width, b.height, b.depth));
	    case 2:
	      return new Ammo.btCapsuleShape(b.width, b.height);
	    default:
	      throw 'unknown shape type.' + b;
	  }
	};

	PhysicsRigidBody.prototype.reset = function (motions) {
	  this._setTransformFromBone(motions);
	};

	PhysicsRigidBody.prototype.preSimulation = function (motions) {
	  // TODO: temporal workaround
	  if (this.body.boneIndex == 0xFFFF) return;

	  if (this.body.type == 0 /* && this.body.boneIndex != 0*/) this._setTransformFromBone(motions);

	  if (this.body.type == 2 /* && this.body.boneIndex != 0*/) this._setPositionFromBone(motions);
	};

	PhysicsRigidBody.prototype._setTransformFromBone = function (motions) {
	  var m = motions[this.body.boneIndex];

	  // TODO: temporal workaround
	  if (this.body.boneIndex == 0xFFFF) {
	    m = { p: [0, 0, 0], r: [0, 0, 0, 1] };
	  }

	  var tr = this.allocTr();
	  this._setOriginArray3Left(tr, m.p);
	  this._setBasisArray4Left(tr, m.r);

	  var form = this._multiplyTransforms(tr, this.boneOffsetForm);

	  // TODO: temporal
	  //  this.rb.setWorldTransform(form);
	  this.rb.setCenterOfMassTransform(form);
	  this.rb.getMotionState().setWorldTransform(form);

	  this.freeTr(tr);
	  this.freeTr(form);
	};

	PhysicsRigidBody.prototype._setPositionFromBone = function (motions) {
	  var m = motions[this.body.boneIndex];

	  var tr = this.allocTr();
	  this._setOriginArray3Left(tr, m.p);
	  this._setBasisArray4Left(tr, m.r);

	  var form = this._multiplyTransforms(tr, this.boneOffsetForm);

	  var tr2 = this.allocTr();
	  this.rb.getMotionState().getWorldTransform(tr2);
	  this._copyOrigin(tr2, form);

	  // TODO: temporal
	  //  this.rb.setWorldTransform(tr2);
	  this.rb.setCenterOfMassTransform(tr2);
	  this.rb.getMotionState().setWorldTransform(tr2);

	  this.freeTr(tr);
	  this.freeTr(tr2);
	  this.freeTr(form);
	};

	PhysicsRigidBody.prototype.postSimulation = function (motions) {
	  // debugger;
	  // TODO: temporal workaround
	  if (this.body.type == 0 || this.body.boneIndex == 0xFFFF) return;

	  var m = motions[this.body.boneIndex];

	  var tr = this.allocTr();
	  this.rb.getMotionState().getWorldTransform(tr);
	  var tr2 = this._multiplyTransforms(tr, this.boneOffsetFormInverse);

	  var q = this._getBasis(tr2);
	  // Right to Left

	  m.r[0] = -q.x(); // 新的速度? 
	  m.r[1] = -q.y();
	  m.r[2] = q.z();
	  m.r[3] = q.w();

	  // __pmdModelView.physics.bodies.forEach((b)=>{
	  //   console.log(b.body.name === this.body.name);
	  // })

	  if (this.body.type == 1) {
	    var o = this._getOrigin(tr2);
	    // Right to Left
	    m.p[0] = o.x(); // 新的速度? 
	    m.p[1] = o.y();
	    m.p[2] = -o.z();
	  }

	  this.freeQ(q);
	  this.freeTr(tr);
	  this.freeTr(tr2);
	};

	function PhysicsConstraint(pmd, world, joint, bodyA, bodyB) {
	  this.parent = PhysicsEntity;
	  this.parent.call(this);

	  this.pmd = pmd;
	  this.world = world;
	  this.joint = joint;
	  this.bodyA = bodyA;
	  this.bodyB = bodyB;

	  this.constraint = null;
	  this.boneOffsetForm = null;
	  this.boneOffsetFormInverse = null;

	  this._init();
	};
	(0, _Inherit2.default)(PhysicsConstraint, PhysicsEntity);

	/**
	 * TODO: temporal
	 */
	PhysicsConstraint.prototype._init = function () {
	  var joint = this.joint;
	  var rb1 = this.bodyA.rb;
	  var rb2 = this.bodyB.rb;
	  var body1 = this.bodyA.body;
	  var body2 = this.bodyB.body;

	  if (body1.type !== 0 && body2.type == 2) {
	    if (body1.boneIndex > 0 && body2.boneIndex > 0 && body1.boneIndex != 0xFFFF && body2.boneIndex != 0xFFFF) {
	      var b1 = this.pmd.bones[body1.boneIndex];
	      var b2 = this.pmd.bones[body2.boneIndex];
	      if (b2.parentIndex == b1.id) {
	        body2.type = 1;
	      }
	    }
	  }

	  var form = this.allocTr();
	  this._setOriginArray3Left(form, joint.position);
	  this._setBasisArray3Left(form, joint.rotation);

	  var r1Form = rb1.getWorldTransform();
	  var r2Form = rb2.getWorldTransform();

	  var r1FormInverse = this._inverseTransform(r1Form);
	  var r2FormInverse = this._inverseTransform(r2Form);

	  var r1Form2 = this._multiplyTransforms(r1FormInverse, form);
	  var r2Form2 = this._multiplyTransforms(r2FormInverse, form);

	  var constraint = new Ammo.btGeneric6DofSpringConstraint(rb1, rb2, r1Form2, r2Form2, true);

	  // Left to Right
	  var lll = this.allocV();
	  var lul = this.allocV();
	  var all = this.allocV();
	  var aul = this.allocV();

	  lll.setValue(joint.translationLimitation1[0], joint.translationLimitation1[1], -joint.translationLimitation2[2]);
	  lul.setValue(joint.translationLimitation2[0], joint.translationLimitation2[1], -joint.translationLimitation1[2]);
	  all.setValue(-joint.rotationLimitation2[0], -joint.rotationLimitation2[1], joint.rotationLimitation1[2]);
	  aul.setValue(-joint.rotationLimitation1[0], -joint.rotationLimitation1[1], joint.rotationLimitation2[2]);

	  constraint.setLinearLowerLimit(lll);
	  constraint.setLinearUpperLimit(lul);
	  constraint.setAngularLowerLimit(all);
	  constraint.setAngularUpperLimit(aul);

	  for (var i = 0; i < 3; i++) {
	    if (joint.springPosition[i] != 0) {
	      constraint.enableSpring(i, true);
	      constraint.setStiffness(i, joint.springPosition[i]);
	    }
	  }

	  for (var i = 0; i < 3; i++) {
	    if (joint.springRotation[i] != 0) {
	      constraint.enableSpring(i + 3, true);
	      constraint.setStiffness(i + 3, joint.springRotation[i]);
	    }
	  }

	  this.world.addConstraint(constraint, true);
	  this.constraint = constraint;

	  this.freeTr(form);
	  Ammo.destroy(r1Form);
	  Ammo.destroy(r2Form);
	  this.freeTr(r1FormInverse);
	  this.freeTr(r2FormInverse);
	  this.freeTr(r1Form2);
	  this.freeTr(r2Form2);
	  this.freeV(lll);
	  this.freeV(lul);
	  this.freeV(all);
	  this.freeV(aul);
	};

	function Physics(pmd) {
	  this.pmd = pmd;

	  this.world = null;
	  this.bodies = [];
	  this.constraints = [];

	  this.count = 0;

	  this._init();
	};

	Physics.prototype._init = function () {

	  this.world = this._generateWorld();
	  //  this.world.addRigidBody(this._generateGround());

	  this.bodies.length = 0;
	  for (var i = 0; i < this.pmd.rigidBodyCount; i++) {
	    this.bodies.push(new PhysicsRigidBody(this.pmd, this.world, this.pmd.rigidBodies[i]));
	  }

	  this.constraints.length = 0;
	  for (var i = 0; i < this.pmd.jointCount; i++) {
	    var joint = this.pmd.joints[i];
	    var bodyA = this.bodies[joint.rigidBody1];
	    var bodyB = this.bodies[joint.rigidBody2];
	    this.constraints.push(new PhysicsConstraint(this.pmd, this.world, joint, bodyA, bodyB));
	  }
	};

	Physics.prototype._generateWorld = function () {
	  var config = new Ammo.btDefaultCollisionConfiguration();
	  var dispatcher = new Ammo.btCollisionDispatcher(config);
	  var cache = new Ammo.btDbvtBroadphase();
	  var solver = new Ammo.btSequentialImpulseConstraintSolver();
	  var world = new Ammo.btDiscreteDynamicsWorld(dispatcher, cache, solver, config);
	  world.setGravity(new Ammo.btVector3(0, -10 * 10, 0));
	  return world;
	};

	Physics.prototype._generateGround = function () {
	  var form = new Ammo.btTransform();
	  form.setIdentity();
	  form.setOrigin(new Ammo.btVector3(0, -1, 0));
	  return new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(0, new Ammo.btDefaultMotionState(form), new Ammo.btBoxShape(new Ammo.btVector3(5, 1, 5)), new Ammo.btVector3(0, 0, 0)));
	};

	Physics.prototype.simulate = function (motions, dframe) {
	  // !!!!
	  this._preSimulation(motions); // 计算之前
	  this.world.stepSimulation(1 / 60, 0, 1 / 60);
	  this._postSimulation(motions); // 执行之后
	};

	/**
	 * TODO: temporal
	 */
	Physics.prototype.simulateFrame = function (motions, dframe) {
	  var g;
	  var stepTime = 1 / 60 * dframe;
	  var maxStepNum = dframe;
	  var unitStep = 1 / 60;

	  // Note: sacrifice some precision for the performance
	  if (dframe >= 3) {
	    maxStepNum = 2;
	    unitStep = 1 / 60 * 2;

	    g = this.world.getGravity();
	    g.setY(-10 * 10 / 2);
	    this.world.setGravity(g);
	  }

	  this._preSimulation(motions);
	  this.world.stepSimulation(stepTime, maxStepNum, unitStep);
	  this._postSimulation(motions);

	  if (dframe >= 3) {
	    g.setY(-10 * 10);
	    this.world.setGravity(g);
	    Ammo.destroy(g); // TODO: is this necessary?
	  }
	};

	Physics.prototype._preSimulation = function (motions) {
	  for (var i = 0; i < this.bodies.length; i++) {
	    this.bodies[i].preSimulation(motions);
	  }
	};

	Physics.prototype._postSimulation = function (motions) {
	  for (var i = 0; i < this.bodies.length; i++) {
	    this.bodies[i].postSimulation(motions);
	  }
	};

	Physics.prototype.resetRigidBodies = function (motions) {
	  for (var i = 0; i < this.bodies.length; i++) {
	    this.bodies[i].reset(motions);
	  }
	};

	module.exports = Physics;

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

	'use strict';

	/**
	 * instance of classes in this file should be created and
	 * their fields should be set by PMDFileParser.
	 * TODO: rename fields to appropriate ones.
	 */
	function PMD() {
	  this.header = null;
	  this.englishHeader = null;
	  this.vertexCount = null;
	  this.vertexIndexCount = null;
	  this.materialCount = null;
	  this.boneCount = null;
	  this.ikCount = null;
	  this.faceCount = null;
	  this.faceDisplayCount = null;
	  this.boneFrameNameCount = null;
	  this.boneDisplayCount = null;
	  this.toonTextureCount = null;
	  this.rigidBodyCount = null;
	  this.jointCount = null;

	  this.vertices = [];
	  this.vertexIndices = [];
	  this.materials = [];
	  this.bones = [];
	  this.iks = [];
	  this.faces = [];
	  this.faceDisplays = [];
	  this.boneFrameNames = [];
	  this.boneDisplays = [];
	  this.englishBoneNames = [];
	  this.englishFaceNames = [];
	  this.englishBoneFrameNames = [];
	  this.toonTextures = [];
	  this.rigidBodies = [];
	  this.joints = [];

	  this.bonesHash = {};
	  this.facesHash = {};

	  this.images = [];
	  this.toonImages = [];
	  this.sphereImages = [];

	  this.centerBone = {};
	  this.leftFootBone = {};
	  this.rightFootBone = {};
	  this.leftEyeBone = {};
	  this.rightEyeBone = {};
	};

	PMD.prototype.valid = function () {
	  return this.header.valid();
	};

	PMD.prototype.getParentBone = function (bone) {
	  return this.bones[bone.parentIndex];
	};

	PMD.prototype.loadImages = function (baseURL, callback) {
	  var loader = new PMDImageLoader(this, baseURL);
	  loader.load(callback);
	};

	PMD.prototype.setup = function () {
	  for (var i = 0; i < this.vertexCount; i++) {
	    this.vertices[i].setup();
	  }

	  for (var i = 0; i < this.boneCount; i++) {
	    this.bonesHash[this.bones[i].name] = this.bones[i];
	  }

	  for (var i = 0; i < this.faceCount; i++) {
	    this.facesHash[this.faces[i].name] = this.faces[i];
	  }
	  //  this.toRight();

	  this._keepSomeBonesInfo();
	};

	PMD.prototype.toRight = function () {
	  for (var i = 0; i < this.vertexCount; i++) {
	    this.vertices[i].toRight();
	  }

	  for (var i = 0; i < this.boneCount; i++) {
	    this.bones[i].toRight();
	  }

	  for (var i = 0; i < this.faceCount; i++) {
	    this.faces[i].toRight();
	  }

	  for (var i = 0; i < this.rigidBodyCount; i++) {
	    this.rigidBodies[i].toRight();
	  }

	  for (var i = 0; i < this.jointCount; i++) {
	    this.joints[i].toRight();
	  }
	};

	/**
	 * TODO: change strings if sjis-lib is used
	 */
	PMD.prototype._keepSomeBonesInfo = function () {
	  // �Z���^�[, ������, �E����, ����, �E��
	  this._keepBoneInfo(this.centerBone, '0x830x5a0x830x930x830x5e0x810x5b');
	  this._keepBoneInfo(this.leftFootBone, '0x8d0xb60x910xab0x8e0xf1');
	  this._keepBoneInfo(this.rightFootBone, '0x890x450x910xab0x8e0xf1');
	  this._keepBoneInfo(this.leftEyeBone, '0x8d0xb60x960xda');
	  this._keepBoneInfo(this.rightEyeBone, '0x890x450x960xda');
	};

	PMD.prototype._keepBoneInfo = function (obj, name) {
	  var boneNum = this._findBoneNumberByName(name);
	  if (boneNum !== null) {
	    var bone = this.bones[boneNum];
	    obj.pos = this._getAveragePositionOfBone(bone);
	    obj.id = boneNum;
	    obj.bone = bone;
	    obj.posFromBone = [];
	    obj.posFromBone[0] = obj.pos[0] - bone.position[0];
	    obj.posFromBone[1] = obj.pos[1] - bone.position[1];
	    obj.posFromBone[2] = obj.pos[2] - bone.position[2];
	  } else {
	    obj.pos = null;
	    obj.id = null;
	    obj.bone = null;
	    obj.posFromBone = null;
	  }
	};

	PMD.prototype._findBoneNumberByName = function (name) {
	  for (var i = 0; i < this.boneCount; i++) {
	    if (this.bones[i].name == name) return i;
	  }
	  return null;
	};

	/**
	 * TODO: consider the algorithm again.
	 */
	PMD.prototype._getAveragePositionOfBone = function (bone) {
	  var num = 0;
	  var pos = [0, 0, 0];
	  for (var i = 0; i < this.vertexCount; i++) {
	    var v = this.vertices[i];
	    // TODO: consider boneWeight?
	    if (v.boneIndices[0] == bone.id || v.boneIndices[1] == bone.id) {
	      pos[0] += v.position[0];
	      pos[1] += v.position[1];
	      pos[2] += v.position[2];
	      num++;
	    }
	    /*
	        if(v.boneIndices[0] == bone.id) {
	          pos[0] += v.position[0] * (v.boneIndex / 100);
	          pos[1] += v.position[1] * (v.boneIndex / 100);
	          pos[2] += v.position[2] * (v.boneIndex / 100);
	          num++;
	        } else if(v.boneIndices[1] == bone.id) {
	          pos[0] += v.position[0] * ((100 - v.boneIndex) / 100);
	          pos[1] += v.position[1] * ((100 - v.boneIndex) / 100);
	          pos[2] += v.position[2] * ((100 - v.boneIndex) / 100);
	          num++;
	        }
	    */
	  }
	  if (num != 0) {
	    pos[0] = pos[0] / num;
	    pos[1] = pos[1] / num;
	    pos[2] = pos[2] / num;
	  }
	  return pos;
	};

	PMD.prototype.getBoneNames = function () {
	  var array = [];
	  for (var i = 0; i < this.boneCount; i++) {
	    array[i] = this.bones[i].name;
	  }
	  return array;
	};

	PMD.prototype.getFaceNames = function () {
	  var array = [];
	  for (var i = 0; i < this.faceCount; i++) {
	    array[i] = this.faces[i].name;
	  }
	  return array;
	};

	PMD.prototype.dump = function () {
	  var str = '';

	  str += 'vertexCount: ' + this.vertexCount + '\n';
	  str += 'vertexIndexCount: ' + this.vertexIndexCount + '\n';
	  str += 'materialCount: ' + this.materialCount + '\n';
	  str += 'boneCount: ' + this.boneCount + '\n';
	  str += 'ikCount: ' + this.ikCount + '\n';
	  str += 'faceCount: ' + this.faceCount + '\n';
	  str += 'faceDisplayCount: ' + this.faceDisplayCount + '\n';
	  str += 'boneFrameNameCount: ' + this.boneFrameNameCount + '\n';
	  str += 'boneDisplayCount: ' + this.boneDisplayCount + '\n';
	  str += 'toonTextureCount: ' + this.toonTextureCount + '\n';
	  str += 'rigidBodyCount: ' + this.rigidBodyCount + '\n';
	  str += 'jointCount: ' + this.jointCount + '\n';
	  str += '\n';

	  str += this._dumpHeader();
	  str += this._dumpVertices();
	  str += this._dumpVertexIndices();
	  str += this._dumpMaterials();
	  str += this._dumpBones();
	  str += this._dumpIKs();
	  str += this._dumpFaces();
	  str += this._dumpfaceDisplays();
	  str += this._dumpBoneFrameNames();
	  str += this._dumpBoneDisplays();
	  str += this._dumpEnglishHeader();
	  str += this._dumpEnglishBoneNames();
	  str += this._dumpEnglishFaceNames();
	  str += this._dumpToonTextures();
	  str += this._dumpRigidBodies();
	  str += this._dumpJoints();

	  return str;
	};

	PMD.prototype.boneNumsOfMaterials = function () {
	  var offset = 0;
	  var result = [];
	  for (var i = 0; i < this.materialCount; i++) {
	    var array = [];
	    for (var j = 0; j < this.boneCount; j++) {
	      array[j] = 0;
	    }

	    var count = 0;
	    var num = this.materials[i].vertexCount;
	    for (var j = 0; j < num; j++) {
	      var v = this.vertices[this.vertexIndices[offset + j].index];
	      for (var k = 0; k < v.boneIndices.length; k++) {
	        var index = v.boneIndices[k];
	        if (array[index] == 0) count++;
	        array[index]++;
	      }
	    }
	    result.push(count);
	    offset += num;
	  }
	  return result;
	};

	PMD.prototype._dumpHeader = function () {
	  var str = '';
	  str += '-- Header --\n';
	  str += this.header.dump();
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpEnglishHeader = function () {
	  var str = '';
	  str += '-- Header(English) --\n';
	  str += this.englishHeader.dump();
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpVertices = function () {
	  var str = '';
	  str += '-- Vertices --\n';
	  for (var i = 0; i < this.vertexCount; i++) {
	    str += this.vertices[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpVertexIndices = function () {
	  var str = '';
	  str += '-- VertexIndices --\n';
	  for (var i = 0; i < this.vertexIndexCount; i++) {
	    str += this.vertexIndices[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpMaterials = function () {
	  var str = '';
	  str += '-- Materials --\n';
	  for (var i = 0; i < this.materialCount; i++) {
	    str += this.materials[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpBones = function () {
	  var str = '';
	  str += '-- Bones --\n';
	  for (var i = 0; i < this.boneCount; i++) {
	    str += this.bones[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpIKs = function () {
	  var str = '';
	  str += '-- IKs --\n';
	  for (var i = 0; i < this.ikCount; i++) {
	    str += this.iks[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpFaces = function () {
	  var str = '';
	  str += '-- Faces --\n';
	  for (var i = 0; i < this.faceCount; i++) {
	    str += this.faces[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpFaceDisplays = function () {
	  var str = '';
	  str += '-- Face Displays --\n';
	  for (var i = 0; i < this.faceDisplayCount; i++) {
	    str += this.faceDisplays[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpBoneFrameNames = function () {
	  var str = '';
	  str += '-- Bone Frame Names --\n';
	  for (var i = 0; i < this.boneFrameNameCount; i++) {
	    str += this.boneFrameNames[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpBoneDisplays = function () {
	  var str = '';
	  str += '-- Bone Displays --\n';
	  for (var i = 0; i < this.boneDisplayCount; i++) {
	    str += this.boneDisplays[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpEnglishBoneNames = function () {
	  var str = '';
	  str += '-- Bone Names(English) --\n';
	  for (var i = 0; i < this.boneCount; i++) {
	    str += this.englishBoneNames[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpEnglishFaceNames = function () {
	  var str = '';
	  str += '-- Face Names(English) --\n';
	  for (var i = 0; i < this.faceCount - 1; i++) {
	    str += this.englishFaceNames[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpEnglishBoneFrameNames = function () {
	  var str = '';
	  str += '-- Bone Frame Names(English) --\n';
	  for (var i = 0; i < this.boneFrameNameCount; i++) {
	    str += this.englishBoneFrameNames[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpToonTextures = function () {
	  var str = '';
	  str += '-- Toon Textures --\n';
	  for (var i = 0; i < this.toonTextureCount; i++) {
	    str += this.toonTextures[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpRigidBodies = function () {
	  var str = '';
	  str += '-- Rigid Bodies --\n';
	  for (var i = 0; i < this.rigidBodyCount; i++) {
	    str += this.rigidBodies[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	PMD.prototype._dumpJoints = function () {
	  var str = '';
	  str += '-- Joints --\n';
	  for (var i = 0; i < this.jointCount; i++) {
	    str += this.joints[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	function PMDHeader() {
	  this.magic = null;
	  this.version = null;
	  this.modelName = null;
	  this.comment = null;
	};

	PMDHeader.prototype.valid = function () {
	  return this.magic == 'Pmd';
	};

	PMDHeader.prototype.dump = function () {
	  var str = '';
	  str += 'magic: ' + this.magic + '\n';
	  str += 'version: ' + this.version + '\n';
	  str += 'model_name: ' + this.modelName + '\n';
	  str += 'comment: ' + this.comment + '\n';
	  return str;
	};

	function PMDVertex(id) {
	  this.id = id;
	  this.position = null;
	  this.normal = null;
	  this.uv = null;
	  this.boneIndices = null;
	  this.boneWeight = null;
	  this.edgeFlag = null;
	  this.boneWeightFloat1 = null;
	  this.boneWeightFloat2 = null;
	};

	PMDVertex.prototype.setup = function () {
	  this.boneWeightFloat1 = this.boneWeight / 100;
	  this.boneWeightFloat2 = (100 - this.boneWeight) / 100;
	};

	PMDVertex.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'position: ' + this.position + '\n';
	  str += 'normal: ' + this.normal + '\n';
	  str += 'uv: ' + this.uv + '\n';
	  str += 'boneIndices: ' + this.boneIndices + '\n';
	  str += 'boneWeight: ' + this.boneWeight + '\n';
	  str += 'edgeFlag: ' + this.edgeFlag + '\n';
	  return str;
	};

	PMDVertex.prototype.toRight = function () {
	  this.position[2] = -this.position[2];
	  this.normal[2] = -this.normal[2];
	};

	function PMDVertexIndex(id) {
	  this.id = id;
	  this.index = null;
	};

	PMDVertexIndex.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'index: ' + this.index + '\n';
	  return str;
	};

	function PMDMaterial(id) {
	  this.id = id;
	  this.color = null;
	  this.specularity = null;
	  this.specularColor = null;
	  this.mirrorColor = null;
	  this.tuneIndex = null;
	  this.edgeFlag = null;
	  this.vertexCount = null;
	  this.fileName = null;
	};

	/**
	 * TODO: temporal
	 */
	PMDMaterial.prototype.convertedFileName = function () {
	  var filename = this.fileName.replace('.tga', '.png');

	  // TODO: ignore sphere map so far
	  var index;
	  if ((index = filename.lastIndexOf('*')) >= 0) {
	    filename = filename.substring(0, index);
	  }

	  return filename;
	};

	/**
	 * TODO: temporal
	 */
	PMDMaterial.prototype.hasSphereTexture = function () {
	  if (this.fileName.lastIndexOf('.sph') >= 0 || this.fileName.lastIndexOf('.spa') >= 0) return true;

	  return false;
	};

	/**
	 * TODO: temporal
	 */
	PMDMaterial.prototype.isSphereMapAddition = function () {
	  var filename = this.fileName;

	  if (filename.lastIndexOf('.spa') >= 0) return true;

	  return false;
	};

	/**
	 * TODO: temporal
	 */
	PMDMaterial.prototype.sphereMapFileName = function () {
	  var filename = this.fileName;
	  var index;
	  if ((index = filename.lastIndexOf('*')) >= 0) {
	    filename = filename.slice(index + 1);
	  }
	  if ((index = filename.lastIndexOf('+')) >= 0) {
	    filename = filename.slice(index + 1);
	  }
	  return filename;
	};

	PMDMaterial.prototype.hasToon = function () {
	  return this.tuneIndex >= 10 ? false : true;
	};

	PMDMaterial.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'color: ' + this.color + '\n';
	  str += 'specularity: ' + this.specularity + '\n';
	  str += 'specularColor: ' + this.specularColor + '\n';
	  str += 'mirrorColor: ' + this.mirrorColor + '\n';
	  str += 'tuneIndex: ' + this.tuneIndex + '\n';
	  str += 'edgeFlag: ' + this.edgeFlag + '\n';
	  str += 'vertexCount: ' + this.vertexCount + '\n';
	  str += 'fileName: ' + this.fileName + '\n';
	  return str;
	};

	function PMDBone(id) {
	  this.id = id;
	  this.name = null;
	  this.parentIndex = null;
	  this.tailIndex = null;
	  this.type = null;
	  this.ikIndex = null;
	  this.position = null;

	  this.motionIndex = null; // Note: be set by VMD;
	  // TODO: remove and use id in VMD
	  //       instead of motionIndex
	  //       not to have VMD related info here
	};

	PMDBone.prototype.isKnee = function () {
	  // TODO: change this parameter if name type changes.
	  return this.name.indexOf('0x820xd00x820xb4') >= 0;
	};

	PMDBone.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  str += 'parentIndex: ' + this.parentIndex + '\n';
	  str += 'tailIndex: ' + this.tailIndex + '\n';
	  str += 'type: ' + this.type + '\n';
	  str += 'ikIndex: ' + this.ikIndex + '\n';
	  str += 'position: ' + this.position + '\n';
	  return str;
	};

	PMDBone.prototype.toRight = function () {
	  this.position[2] = -this.position[2];
	};

	function PMDIK(id) {
	  this.id = id;
	  this.index = null;
	  this.targetBoneIndex = null;
	  this.chainLength = null;
	  this.iteration = null;
	  this.limitation = null;
	  this.childBoneIndices = null;
	};

	PMDIK.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'index: ' + this.index + '\n';
	  str += 'targetBoneIndex: ' + this.targetBoneIndex + '\n';
	  str += 'chainLength: ' + this.chainLength + '\n';
	  str += 'iteration: ' + this.iteration + '\n';
	  str += 'limitation: ' + this.limitation + '\n';
	  str += 'childBoneIndices: ' + this.childBoneIndices + '\n';
	  return str;
	};

	function PMDFace(id) {
	  this.id = id;
	  this.name = null;
	  this.vertexCount = null;
	  this.type = null;
	  this.vertices = null;
	  this.done = false;

	  this.motionIndex = null; // Note: be set by VMD;
	  // TODO: remove and use id in VMD
	  //       instead of motionIndex
	  //       not to have VMD related info here
	};

	PMDFace.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  str += 'vertexCount: ' + this.vertexCount + '\n';
	  str += 'type: ' + this.type + '\n';

	  for (var i = 0; i < this.vertices.length; i++) {
	    str += this.vertices[i].dump();
	  }

	  return str;
	};

	PMDFace.prototype.toRight = function () {
	  for (var i = 0; i < this.vertices.length; i++) {
	    this.vertices[i].toRight();
	  }
	};

	function PMDFaceVertex(id, type) {
	  this.id = id;
	  this.type = type;
	  this.index = null;
	  this.position = null;
	};

	PMDFaceVertex.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  //  str += 'type: '     + this.type     + '\n';
	  str += 'index: ' + this.index + '\n';
	  str += 'position: ' + this.position + '\n';
	  return str;
	};

	PMDFaceVertex.prototype.toRight = function () {
	  this.position[2] = -this.position[2];
	};

	function PMDFaceDisplay(id) {
	  this.id = id;
	  this.index = null;
	};

	PMDFaceDisplay.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'index: ' + this.index + '\n';
	  return str;
	};

	function PMDBoneFrameName(id) {
	  this.id = id;
	  this.name = null;
	};

	PMDBoneFrameName.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  return str;
	};

	function PMDBoneDisplay(id) {
	  this.id = id;
	  this.index = null;
	  this.frameIndex = null;
	};

	PMDBoneDisplay.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'index: ' + this.index + '\n';
	  str += 'frameIndex: ' + this.frameIndex + '\n';
	  return str;
	};

	function PMDEnglishHeader() {
	  this.compatibility = null;
	  this.modelName = null;
	  this.comment = null;
	};

	PMDEnglishHeader.prototype.dump = function () {
	  var str = '';
	  str += 'compatibility: ' + this.compatibility + '\n';
	  str += 'modelName:     ' + this.modelName + '\n';
	  str += 'comment: ' + this.comment + '\n';
	  return str;
	};

	function PMDEnglishBoneName(id) {
	  this.id = id;
	  this.name = null;
	};

	PMDEnglishBoneName.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  return str;
	};

	function PMDEnglishFaceName(id) {
	  this.id = id;
	  this.name = null;
	};

	PMDEnglishFaceName.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  return str;
	};

	function PMDEnglishBoneFrameName(id) {
	  this.id = id;
	  this.name = null;
	};

	PMDEnglishBoneFrameName.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  return str;
	};

	function PMDToonTexture(id) {
	  this.id = id;
	  this.fileName = null;
	};

	PMDToonTexture.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'fileName: ' + this.fileName + '\n';
	  return str;
	};

	function PMDRigidBody(id) {
	  this.id = id;
	  this.name = null;
	  this.boneIndex = null;
	  this.groupIndex = null;
	  this.groupTarget = null;
	  this.shapeType = null;
	  this.width = null;
	  this.height = null;
	  this.depth = null;
	  this.position = null;
	  this.rotation = null;
	  this.weight = null;
	  this.positionDim = null;
	  this.rotationDim = null;
	  this.recoil = null;
	  this.friction = null;
	  this.type = null;
	};

	PMDRigidBody.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  str += 'boneIndex: ' + this.boneIndex + '\n';
	  str += 'groupIndex: ' + this.groupIndex + '\n';
	  str += 'groupTarget: ' + this.groupTarget + '\n';
	  str += 'shapeType: ' + this.shapeType + '\n';
	  str += 'width: ' + this.width + '\n';
	  str += 'height: ' + this.height + '\n';
	  str += 'depth: ' + this.depth + '\n';
	  str += 'position: ' + this.position + '\n';
	  str += 'rotation: ' + this.rotation + '\n';
	  str += 'weight: ' + this.weight + '\n';
	  str += 'positionDim: ' + this.positionDim + '\n';
	  str += 'rotationDim: ' + this.rotationDim + '\n';
	  str += 'recoil: ' + this.recoil + '\n';
	  str += 'friction: ' + this.friction + '\n';
	  str += 'type: ' + this.type + '\n';
	  return str;
	};

	PMDRigidBody.prototype.toRight = function () {
	  this.position[2] = -this.position[2];
	  this.rotation[0] = -this.rotation[0];
	  this.rotation[1] = -this.rotation[1];
	};

	function PMDJoint(id) {
	  this.id = id;
	  this.name = null;
	  this.rigidBody1 = null;
	  this.rigidBody2 = null;
	  this.position = null;
	  this.rotation = null;
	  this.translationLimitation1 = null;
	  this.translationLimitation2 = null;
	  this.rotationLimitation1 = null;
	  this.rotationLimitation2 = null;
	  this.springPosition = null;
	  this.springRotation = null;
	};

	PMDJoint.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  str += 'rigidBody1: ' + this.rigidBody1 + '\n';
	  str += 'rigidBody2: ' + this.rigidBody2 + '\n';
	  str += 'position: ' + this.position + '\n';
	  str += 'rotation: ' + this.rotation + '\n';
	  str += 'translationLimitation1: ' + this.translationLimitation1 + '\n';
	  str += 'translationLimitation2: ' + this.translationLimitation2 + '\n';
	  str += 'rotationLimitation1: ' + this.rotationLimitation1 + '\n';
	  str += 'rotationLimitation2: ' + this.rotationLimitation2 + '\n';
	  str += 'springPosition: ' + this.springPosition + '\n';
	  str += 'springRotation: ' + this.springRotation + '\n';
	  return str;
	};

	PMDJoint.prototype.toRight = function () {
	  this.position[2] = -this.position[2];
	  this.rotation[0] = -this.rotation[0];
	  this.rotation[1] = -this.rotation[1];
	};

	function PMDImageLoader(pmd, baseURL) {
	  this.pmd = pmd;
	  this.baseURL = baseURL;

	  this.errorImageNum = 0;
	  this.loadedImageNum = 0;
	  this.noImageNum = 0;
	};

	/**
	 * TODO: temporal
	 */
	PMDImageLoader.prototype.load = function (callback) {
	  this.pmd.images.length = 0;
	  this.pmd.toonImages.length = 0;
	  this.pmd.sphereImages.length = 0;

	  this.errorImageNum = 0;
	  this.loadedImageNum = 0;
	  this.noImageNum = 0;

	  for (var i = 0; i < this.pmd.materialCount; i++) {
	    var fileName = this.pmd.materials[i].convertedFileName();
	    if (fileName == '' || fileName.indexOf('.spa') >= 0 || fileName.indexOf('.sph') >= 0) {
	      this.pmd.images[i] = this._generatePixelImage();
	      this.noImageNum++;
	      this._checkDone(callback);
	      continue;
	    }

	    var self = this;
	    this.pmd.images[i] = new Image();
	    this.pmd.images[i].onerror = function (event) {
	      self.errorImageNum++;
	      self._checkDone(callback);
	    };
	    this.pmd.images[i].onload = function (event) {
	      self.loadedImageNum++;
	      self._checkDone(callback);
	    };
	    this.pmd.images[i].src = this.baseURL + '/' + fileName;
	  }

	  // TODO: duplicated code
	  for (var i = 0; i < this.pmd.toonTextureCount; i++) {
	    var fileName = this.pmd.toonTextures[i].fileName;
	    if (fileName == '' || fileName.indexOf('.spa') >= 0 || fileName.indexOf('.sph') >= 0) {
	      this.pmd.toonImages[i] = this._generatePixelImage();
	      this.noImageNum++;
	      this._checkDone(callback);
	      continue;
	    }

	    var self = this;
	    this.pmd.toonImages[i] = new Image();
	    this.pmd.toonImages[i].onerror = function (event) {
	      self.errorImageNum++;
	      self._checkDone(callback);
	    };
	    this.pmd.toonImages[i].onload = function (event) {
	      self.loadedImageNum++;
	      self._checkDone(callback);
	    };
	    this.pmd.toonImages[i].src = this.baseURL + '/' + fileName;
	  }

	  // TODO: duplicated code
	  for (var i = 0; i < this.pmd.materialCount; i++) {
	    if (!this.pmd.materials[i].hasSphereTexture()) {
	      this.pmd.sphereImages[i] = this._generatePixelImage();
	      this.noImageNum++;
	      this._checkDone(callback);
	      continue;
	    }

	    var fileName = this.pmd.materials[i].sphereMapFileName();
	    var self = this;
	    this.pmd.sphereImages[i] = new Image();
	    this.pmd.sphereImages[i].onerror = function (event) {
	      self.errorImageNum++;
	      self._checkDone(callback);
	    };
	    this.pmd.sphereImages[i].onload = function (event) {
	      self.loadedImageNum++;
	      self._checkDone(callback);
	    };
	    this.pmd.sphereImages[i].src = this.baseURL + '/' + fileName;
	  }
	};

	PMDImageLoader.prototype._generatePixelImage = function () {
	  var cvs = document.createElement('canvas');
	  cvs.width = 1;
	  cvs.height = 1;
	  var ctx = cvs.getContext('2d');

	  ctx.fillStyle = 'rgb(255, 255, 255)';
	  ctx.fillRect(0, 0, 1, 1);
	  return cvs;
	};

	PMDImageLoader.prototype._checkDone = function (callback) {
	  if (this.loadedImageNum + this.noImageNum + this.errorImageNum >= this.pmd.materialCount * 2 + this.pmd.toonTextureCount) {
	    callback(this.pmd);
	  }
	};

	module.exports = {
	  PMD: PMD,
	  PMDHeader: PMDHeader,
	  PMDVertex: PMDVertex,
	  PMDVertexIndex: PMDVertexIndex,
	  PMDMaterial: PMDMaterial,
	  PMDBone: PMDBone,
	  PMDIK: PMDIK,
	  PMDFace: PMDFace,
	  PMDFaceVertex: PMDFaceVertex,
	  PMDFaceDisplay: PMDFaceDisplay,
	  PMDBoneFrameName: PMDBoneFrameName,
	  PMDBoneDisplay: PMDBoneDisplay,
	  PMDEnglishHeader: PMDEnglishHeader,
	  PMDEnglishBoneName: PMDEnglishBoneName,
	  PMDEnglishFaceName: PMDEnglishFaceName,
	  PMDEnglishBoneFrameName: PMDEnglishBoneFrameName,
	  PMDToonTexture: PMDToonTexture,
	  PMDRigidBody: PMDRigidBody,
	  PMDJoint: PMDJoint
	};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _glMatrix095Min = __webpack_require__(5);

	/**
	 * instance of classes in this file should be created and
	 * their fields should be set by VMDFileParser.
	 */
	function VMD() {
	  this.header = null;
	  this.motionCount = null;
	  this.faceCount = null;
	  this.cameraCount = null;
	  this.lightCount = null;

	  this.motions = [];
	  this.faces = [];
	  this.cameras = [];
	  this.lights = [];

	  this.frame = 0;
	  this.orderedMotions = [];
	  this.orderedFaces = [];
	  this.orderedCameras = [];
	  this.orderedLights = [];

	  this.cameraIndex = -1;
	  this.lightIndex = -1;

	  // TODO: rename
	  this.stepMotions = [];
	  this.stepFaces = [];
	  this.stepCamera = { location: [0, 0, 0],
	    rotation: [0, 0, 0],
	    length: 0,
	    angle: 0,
	    available: true };
	  this.stepLight = { color: [0, 0, 0],
	    location: [0, 0, 0],
	    available: true };
	};

	// for reference
	VMD.prototype.Object = Object;
	VMD.prototype.Math = Math;
	VMD.prototype.vec3 = _glMatrix095Min.vec3;
	VMD.prototype.quat4 = _glMatrix095Min.quat4;

	VMD.prototype.valid = function () {
	  return this.header.valid();
	};

	VMD.prototype.supply = function () {
	  for (var i = 0; i < this.motionCount; i++) {
	    this.motions[i].supply();
	  }for (var i = 0; i < this.faceCount; i++) {
	    this.faces[i].supply();
	  }for (var i = 0; i < this.cameraCount; i++) {
	    this.cameras[i].supply();
	  }for (var i = 0; i < this.lightCount; i++) {
	    this.lights[i].supply();
	  }
	};

	/**
	 * TODO: temporal
	 */
	VMD.prototype.clone = function () {
	  var v = new VMD();

	  v.motionCount = this.motionCount;
	  v.faceCount = this.faceCount;
	  v.cameraCount = this.cameraCount;
	  v.lightCount = this.lightCount;

	  for (var i = 0; i < this.motionCount; i++) {
	    v.motions[i] = this.motions[i];
	  }

	  for (var i = 0; i < this.faceCount; i++) {
	    v.faces[i] = this.faces[i];
	  }

	  for (var i = 0; i < this.cameraCount; i++) {
	    v.cameras[i] = this.cameras[i];
	  }

	  for (var i = 0; i < this.lightCount; i++) {
	    v.lights[i] = this.lights[i];
	  }

	  return v;
	};

	VMD.prototype.setup = function (pmd) {
	  this.frame = 0;
	  this.cameraIndex = -1;
	  this.lightIndex = -1;

	  if (pmd) {
	    this._setupMotions(pmd);
	    this._setupFaces(pmd);
	  }
	  this._setupCameras();
	  this._setupLights();

	  // TODO: temporal
	  this.step(1);
	};

	/**
	 * TODO: optimize
	 */
	VMD.prototype._setupMotions = function (pmd) {
	  var arrays = {};
	  for (var i = 0; i < this.motionCount; i++) {
	    var m = this.motions[i];

	    // Note: remove unnecessary element for PMD
	    if (pmd.bonesHash[m.boneName] === undefined) continue;

	    if (arrays[m.boneName] === undefined) {
	      arrays[m.boneName] = {};
	      arrays[m.boneName].motions = [];
	      arrays[m.boneName].index = -1;
	    }
	    arrays[m.boneName].motions.push(m);
	  }

	  for (var key in arrays) {
	    arrays[key].motions.sort(function (a, b) {
	      return a.frameNum - b.frameNum;
	    });
	  }

	  this.orderedMotions.length = 0;
	  var motionKeys = this.Object.keys(arrays);
	  for (var i = 0; i < motionKeys.length; i++) {
	    this.orderedMotions[i] = arrays[motionKeys[i]];
	  }

	  this.stepMotions.length = 0;
	  for (var i = 0; i < pmd.boneCount; i++) {
	    var a = {};
	    a.location = [0, 0, 0];
	    a.rotation = [0, 0, 0, 1];
	    this._clearVec3(a.location); // just in case
	    this._clearQuat4(a.rotation); // just in case
	    this.stepMotions[i] = a;
	  }

	  var boneNames = pmd.getBoneNames();
	  var tmp = 0;
	  for (var i = 0; i < pmd.bones.length; i++) {
	    var p = pmd.bones[i];
	    p.motionIndex = motionKeys.indexOf(p.name);
	    if (p.motionIndex == -1) {
	      p.motionIndex = motionKeys.length + tmp;
	      tmp++;
	    }
	  }
	};

	VMD.prototype._setupFaces = function (pmd) {
	  var arrays = {};
	  for (var i = 0; i < this.faceCount; i++) {
	    var f = this.faces[i];

	    if (pmd.facesHash[f.name] === undefined) continue;

	    if (arrays[f.name] === undefined) {
	      arrays[f.name] = {};
	      arrays[f.name].faces = [];
	      arrays[f.name].index = -1;
	    }
	    arrays[f.name].faces.push(f);
	  }

	  for (var key in arrays) {
	    arrays[key].faces.sort(function (a, b) {
	      return a.frameNum - b.frameNum;
	    });
	  }

	  this.orderedFaces.length = 0;
	  var faceKeys = this.Object.keys(arrays);
	  for (var i = 0; i < faceKeys.length; i++) {
	    this.orderedFaces[i] = arrays[faceKeys[i]];
	  }

	  this.stepFaces.length = 0;
	  for (var i = 0; i < pmd.faceCount; i++) {
	    var a = {};
	    a.weight = 0;
	    a.available = true;
	    this.stepFaces[i] = a;
	  }

	  var faceNames = pmd.getFaceNames();
	  var tmp = 0;
	  for (var i = 0; i < pmd.faces.length; i++) {
	    var p = pmd.faces[i];
	    p.motionIndex = faceKeys.indexOf(p.name);
	    if (p.motionIndex == -1) {
	      p.motionIndex = faceKeys.length + tmp;
	      this.stepFaces[p.motionIndex].available = false;
	      tmp++;
	    }
	  }
	};

	VMD.prototype._setupCameras = function () {
	  this.orderedCameras.length = 0;
	  for (var i = 0; i < this.cameraCount; i++) {
	    this.orderedCameras[i] = this.cameras[i];
	  }

	  this.orderedCameras.sort(function (a, b) {
	    return a.frameNum - b.frameNum;
	  });
	};

	VMD.prototype._setupLights = function () {
	  this.orderedLights.length = 0;
	  for (var i = 0; i < this.lightCount; i++) {
	    this.orderedLights[i] = {};
	    this.orderedLights[i].light = this.lights[i];
	  }

	  this.orderedLights.sort(function (a, b) {
	    return a.light.frameNum - b.light.frameNum;
	  });
	};

	VMD.prototype.step = function (dframe) {
	  this._stepMotion();
	  this._stepFace();
	  this._stepCamera();
	  this._stepLight();

	  //  this.frame++;
	  this.frame += dframe;
	};

	/**
	 * TODO: check the logic.
	 */
	VMD.prototype._stepMotion = function () {
	  for (var i = 0; i < this.orderedMotions.length; i++) {
	    var m = this.orderedMotions[i];
	    while (m.index + 1 < m.motions.length && m.motions[m.index + 1].frameNum <= this.frame) {
	      m.index++;
	    }
	  }
	};

	/**
	 * TODO: check the logic.
	 */
	VMD.prototype._stepFace = function () {
	  for (var i = 0; i < this.orderedFaces.length; i++) {
	    var f = this.orderedFaces[i];
	    while (f.index + 1 < f.faces.length && f.faces[f.index + 1].frameNum <= this.frame) {
	      f.index++;
	    }
	  }
	};

	/**
	 * TODO: check the logic.
	 */
	VMD.prototype._stepCamera = function () {
	  while (this.cameraIndex + 1 < this.cameras.length && this.orderedCameras[this.cameraIndex + 1].frameNum <= this.frame) {
	    this.cameraIndex++;
	  }
	};

	/**
	 * TODO: check the logic.
	 */
	VMD.prototype._stepLight = function () {
	  while (this.lightIndex + 1 < this.lights.length && this.orderedLights[this.lightIndex + 1].light.frameNum <= this.frame) {
	    this.lightIndex++;
	  }
	};

	VMD.prototype.merge = function (v) {
	  this.motionCount += v.motionCount;
	  this.faceCount += v.faceCount;
	  this.cameraCount += v.cameraCount;
	  this.lightCount += v.lightCount;

	  for (var i = 0; i < v.motionCount; i++) {
	    this.motions.push(v.motions[i]);
	  }
	  for (var i = 0; i < v.faceCount; i++) {
	    this.faces.push(v.faces[i]);
	  }
	  for (var i = 0; i < v.cameraCount; i++) {
	    this.cameras.push(v.cameras[i]);
	  }
	  for (var i = 0; i < v.lightCount; i++) {
	    this.lights.push(v.lights[i]);
	  }
	};

	VMD.prototype.addOffset = function (o) {
	  for (var i = 0; i < this.motionCount; i++) {
	    this.motions[i].frameNum += o;
	  }
	  for (var i = 0; i < this.faceCount; i++) {
	    this.faces[i].frameNum += o;
	  }
	  for (var i = 0; i < this.cameraCount; i++) {
	    this.cameras[i].frameNum += o;
	  }
	  for (var i = 0; i < this.lightCount; i++) {
	    this.lights[i].frameNum += o;
	  }
	};

	/**
	 * TODO: temporal
	 * TODO: calculate next frameNum at setup phase?
	 * TODO: check the logic
	 */
	VMD.prototype.loadMotion = function () {
	  for (var i = 0; i < this.orderedMotions.length; i++) {
	    var m = this.orderedMotions[i];

	    if (m.index == -1) continue;

	    var m1 = m.motions[m.index];
	    var m2 = m.motions[m.index + 1];
	    var m3 = this.stepMotions[i];

	    if (m1.frameNum == this.frame || m2 === undefined || m2.frameNum - m1.frameNum <= 2) {
	      this._setVec3(m1.location, m3.location);
	      this._setQuat4(m1.rotation, m3.rotation);
	    } else {
	      // Note: linear interpolation so far
	      var d = m2.frameNum - m1.frameNum;
	      var d2 = this.frame - m1.frameNum;
	      var r = d2 / d;
	      this._slerpQuat4(m1.rotation, m2.rotation, r, m3.rotation);
	      this._lerpVec3(m1.location, m2.location, r, m3.location);
	    }
	  }

	  for (var i = this.orderedMotions.length; i < this.stepMotions.length; i++) {
	    var s = this.stepMotions[i];
	    this._clearVec3(s.location);
	    this._clearQuat4(s.rotation);
	  }
	};

	/**
	 * TODO: temporal
	 * TODO: any ways to avoid update all morph Buffer?
	 * TODO: check the logic.
	 */
	VMD.prototype.loadFace = function () {
	  for (var i = 0; i < this.orderedFaces.length; i++) {
	    var f = this.orderedFaces[i];

	    if (f.index == -1) continue;

	    var f1 = f.faces[f.index];
	    var f2 = f.faces[f.index + 1];
	    var f3 = this.stepFaces[i];

	    if (f1.frameNum == this.frameNum || f2 === undefined || f2.frameNum - f1.frameNum <= 2) {
	      f3.weight = f1.weight;
	    } else {
	      var d = f2.frameNum - f1.frameNum;
	      var d2 = this.frame - f1.frameNum;
	      var r = d2 / d;
	      f3.weight = this._lerp(f1.weight, f2.weight, r);
	    }
	  }
	};

	/**
	 * TODO: check the logic
	 */
	VMD.prototype.loadCamera = function () {
	  var ocs = this.orderedCameras;
	  var index = this.cameraIndex;
	  this.stepCamera.available = false;

	  if (index == -1) return;

	  this.stepCamera.available = true;
	  var c1 = ocs[index];
	  var c2 = ocs[index + 1];

	  if (c1.frameNum == this.frame || c2 === undefined || c2.frameNum - c1.frameNum <= 2) {
	    this._setVec3(c1.location, this.stepCamera.location);
	    this._setVec3(c1.rotation, this.stepCamera.rotation);
	    this.stepCamera.length = c1.length;
	    this.stepCamera.angle = c1.angle;
	  } else {
	    // Note: linear interpolation so far
	    var d = c2.frameNum - c1.frameNum;
	    var d2 = this.frame - c1.frameNum;
	    var r = d2 / d;

	    this._lerpVec3(c1.location, c2.location, r, this.stepCamera.location);
	    this._lerpVec3(c1.rotation, c2.rotation, r, this.stepCamera.rotation);
	    this.stepCamera.length = this._lerp(c1.length, c2.length, r);
	    this.stepCamera.angle = this._lerp(c1.angle, c2.angle, r);
	  }
	};

	/**
	 * TODO: check the logic.
	 * TODO: implement correctly
	 */
	VMD.prototype.loadLight = function () {
	  var ols = this.orderedLights;
	  var index = this.lightIndex;
	  this.stepLight.available = false;

	  if (index == -1) return;

	  var light = ols[index].light;
	  this.stepLight.available = true;
	  this._setVec3(light.color, this.stepLight.color);
	  this._setVec3(light.location, this.stepLight.location);
	};

	VMD.prototype._setVec3 = function (a, b) {
	  b[0] = a[0];
	  b[1] = a[1];
	  b[2] = a[2];
	};

	VMD.prototype._setQuat4 = function (a, b) {
	  b[0] = a[0];
	  b[1] = a[1];
	  b[2] = a[2];
	  b[3] = a[3];
	};

	VMD.prototype._clearVec3 = function (a) {
	  a[0] = 0;
	  a[1] = 0;
	  a[2] = 0;
	};

	VMD.prototype._clearQuat4 = function (a) {
	  a[0] = 0;
	  a[1] = 0;
	  a[2] = 0;
	  a[3] = 1;
	};

	VMD.prototype._lerp = function (a, b, c) {
	  return a * (1 - c) + b * c;
	};

	VMD.prototype._lerpVec3 = function (a, b, c, d) {
	  d[0] = this._lerp(a[0], b[0], c);
	  d[1] = this._lerp(a[1], b[1], c);
	  d[2] = this._lerp(a[2], b[2], c);
	};

	/**
	 * copied from somewhere so far
	 * TODO: move this logic to general matrix class or somewhere
	 */
	VMD.prototype._slerpQuat4 = function (q, r, t, p) {
	  var cosHalfTheta = q[0] * r[0] + q[1] * r[1] + q[2] * r[2] + q[3] * r[3];
	  if (cosHalfTheta < 0) {
	    p[0] = -r[0];
	    p[1] = -r[1];
	    p[2] = -r[2];
	    p[3] = -r[3];
	    cosHalfTheta = -cosHalfTheta;
	  } else {
	    p[0] = r[0];
	    p[1] = r[1];
	    p[2] = r[2];
	    p[3] = r[3];
	  }

	  if (this.Math.abs(cosHalfTheta) >= 1.0) {
	    p[0] = q[0];
	    p[1] = q[1];
	    p[2] = q[2];
	    p[3] = q[3];
	    return p;
	  }

	  var halfTheta = this.Math.acos(cosHalfTheta);
	  var sinHalfTheta = this.Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

	  if (this.Math.abs(sinHalfTheta) < 0.001) {
	    p[0] = 0.5 * (q[0] + r[0]);
	    p[1] = 0.5 * (q[1] + r[1]);
	    p[2] = 0.5 * (q[2] + r[2]);
	    p[3] = 0.5 * (q[3] + r[3]);
	    return p;
	  }

	  var ratioA = this.Math.sin((1 - t) * halfTheta) / sinHalfTheta;
	  var ratioB = this.Math.sin(t * halfTheta) / sinHalfTheta;

	  p[0] = q[0] * ratioA + p[0] * ratioB;
	  p[1] = q[1] * ratioA + p[1] * ratioB;
	  p[2] = q[2] * ratioA + p[2] * ratioB;
	  p[3] = q[3] * ratioA + p[3] * ratioB;
	  return p;
	};

	/**
	 * just copied from MMD.js so far
	 */
	_glMatrix095Min.vec3.rotateX = function (vec, angle, dest) {
	  var rotation = _glMatrix095Min.mat4.rotateX(_glMatrix095Min.mat4.identity(_glMatrix095Min.mat4.create()), angle);
	  return _glMatrix095Min.mat4.multiplyVec3(rotation, vec, dest);
	};
	_glMatrix095Min.vec3.rotateY = function (vec, angle, dest) {
	  var rotation = _glMatrix095Min.mat4.rotateY(_glMatrix095Min.mat4.identity(_glMatrix095Min.mat4.create()), angle);
	  return _glMatrix095Min.mat4.multiplyVec3(rotation, vec, dest);
	};
	_glMatrix095Min.vec3.rotateZ = function (vec, angle, dest) {
	  var rotation = _glMatrix095Min.mat4.rotateZ(_glMatrix095Min.mat4.identity(_glMatrix095Min.mat4.create()), angle);
	  return _glMatrix095Min.mat4.multiplyVec3(rotation, vec, dest);
	};

	VMD.prototype.getBoneMotion = function (bone) {
	  return this.stepMotions[bone.motionIndex];
	};

	VMD.prototype.getFace = function (face) {
	  return this.stepFaces[face.motionIndex];
	};

	VMD.prototype.getCamera = function () {
	  return this.stepCamera;
	};

	VMD.prototype.getLight = function () {
	  return this.stepLight;
	};

	/**
	 * TODO: rename
	 */
	VMD.prototype.getCalculatedCameraParams = function (eye, center, up) {
	  var yOffset = 0.0;
	  var camera = this.getCamera();

	  center[0] = camera.location[0];
	  center[1] = camera.location[1] + yOffset;
	  center[2] = camera.location[2];

	  eye[0] = 0;
	  eye[1] = 0 + yOffset;
	  eye[2] = camera.length;

	  up[0] = 0;
	  up[1] = 1;
	  up[2] = 0;

	  this.vec3.rotateX(eye, camera.rotation[0], eye);
	  this.vec3.rotateY(eye, camera.rotation[1], eye);
	  this.vec3.rotateZ(eye, camera.rotation[2], eye);
	  this.vec3.add(eye, camera.location, eye);

	  this.vec3.rotateX(up, camera.rotation[0], up);
	  this.vec3.rotateY(up, camera.rotation[1], up);
	  this.vec3.rotateZ(up, camera.rotation[2], up);
	};

	VMD.prototype.dump = function () {
	  var str = '';

	  str += 'motionCount: ' + this.motionCount + '\n';
	  str += 'faceCount: ' + this.faceCount + '\n';
	  str += 'cameraCount: ' + this.cameraCount + '\n';
	  str += 'lightCount: ' + this.lightCount + '\n';

	  str += this._dumpMotions();
	  str += this._dumpFaces();
	  str += this._dumpCameras();
	  str += this._dumpLights();

	  return str;
	};

	VMD.prototype._dumpMotions = function () {
	  var str = '';
	  str += '-- Motions --\n';
	  for (var i = 0; i < this.motionCount; i++) {
	    str += this.motions[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	VMD.prototype._dumpFaces = function () {
	  var str = '';
	  str += '-- Faces --\n';
	  for (var i = 0; i < this.faceCount; i++) {
	    str += this.faces[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	VMD.prototype._dumpCameras = function () {
	  var str = '';
	  str += '-- Cameras --\n';
	  for (var i = 0; i < this.cameraCount; i++) {
	    str += this.cameras[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	VMD.prototype._dumpLights = function () {
	  var str = '';
	  str += '-- Lights --\n';
	  for (var i = 0; i < this.lightCount; i++) {
	    str += this.lights[i].dump();
	  }
	  str += '\n';
	  return str;
	};

	function VMDHeader() {
	  this.magic = null;
	  this.modelName = null;
	};

	VMDHeader.prototype.valid = function () {
	  return this.magic == 'Vocaloid Motion Data 0002';
	};

	VMDHeader.prototype.dump = function () {
	  var str = '';
	  str += 'magic: ' + this.magic + '\n';
	  str += 'modelName: ' + this.modelName + '\n';
	  return str;
	};

	function VMDMotion(id) {
	  this.id = id;
	  this.boneName = null;
	  this.frameNum = null;
	  this.location = null;
	  this.rotation = null;
	  this.interpolation = null;
	};

	VMDMotion.prototype.supply = function () {
	  this.frameNum *= 2;
	};

	VMDMotion.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'boneName: ' + this.boneName + '\n';
	  str += 'frameNum: ' + this.frameNum + '\n';
	  str += 'location: ' + this.location + '\n';
	  str += 'rotation: ' + this.rotation + '\n';
	  str += 'interpolation: ' + this.interpolation + '\n';
	  return str;
	};

	function VMDFace(id) {
	  this.id = id;
	  this.name = null;
	  this.frameNum = null;
	  this.weight = null;
	};

	VMDFace.prototype.supply = function () {
	  this.frameNum *= 2;
	};

	VMDFace.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'name: ' + this.name + '\n';
	  str += 'frameNum: ' + this.frameNum + '\n';
	  str += 'weight: ' + this.weight + '\n';
	  return str;
	};

	function VMDCamera(id) {
	  this.id = id;
	  this.frameNum = null;
	  this.length = null;
	  this.location = null;
	  this.rotation = null;
	  this.interpolation = null;
	  this.angle = null;
	  this.perspective = null;
	};

	VMDCamera.prototype.supply = function () {
	  this.frameNum *= 2;
	};

	VMDCamera.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'frameNum: ' + this.frameNum + '\n';
	  str += 'length: ' + this.length + '\n';
	  str += 'location: ' + this.location + '\n';
	  str += 'rotation: ' + this.rotation + '\n';
	  str += 'interpolation: ' + this.interpolation + '\n';
	  str += 'angle: ' + this.angle + '\n';
	  str += 'perspective: ' + this.perspective + '\n';
	  return str;
	};

	function VMDLight(id) {
	  this.id = id;
	  this.frameNum = null;
	  this.color = null;
	  this.location = null;
	};

	VMDLight.prototype.supply = function () {
	  this.frameNum *= 2;
	};

	VMDLight.prototype.dump = function () {
	  var str = '';
	  str += 'id: ' + this.id + '\n';
	  str += 'frameNum: ' + this.frameNum + '\n';
	  str += 'color: ' + this.color + '\n';
	  str += 'location: ' + this.location + '\n';
	  return str;
	};

	module.exports = {
	  VMD: VMD,
	  VMDLight: VMDLight,
	  VMDHeader: VMDHeader,
	  VMDMotion: VMDMotion,
	  VMDFace: VMDFace,
	  VMDCamera: VMDCamera
	};

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Utility = __webpack_require__(67);

	var _Utility2 = _interopRequireDefault(_Utility);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function FileParser(buffer) {
	  this.uint8 = new Uint8Array(buffer);
	  this.offset = 0;
	};
	FileParser.prototype.Math = Math;

	/**
	 * -- sample --
	 * FileParser.prototype._VERTEX_STRUCTURE = {
	 *   position: {type: 'float', isArray: true, size: 3},
	 *   normal: {type: 'float', isArray: true, size: 3},
	 *   uv: {type: 'float', isArray: true, size: 2},
	 *   boneIndices: {type: 'uint16', isArray: true, size: 2},
	 *   boneWeight: {type: 'uint8'},
	 *   edgeFlag: {type: 'uint8'}
	 * };
	 */

	/**
	 * Note: override this method in a child class
	 */
	FileParser.prototype.parse = function () {
	  return {};
	};

	FileParser.prototype._parseObject = function (obj, s) {
	  var o = this.offset;
	  for (var key in s) {
	    obj[key] = this._getValue(s[key], this.offset);
	    // TODO: this can waste time when this function is called in loop
	    this.offset += this._sizeof(s[key]);
	  }
	};

	FileParser.prototype._getValue = function (param, offset) {
	  return param.isArray === undefined ? this._getValueScalar(param, offset) : this._getValueArray(param, offset);
	};

	/**
	 * TODO: you may use DataView.
	 */
	FileParser.prototype._getValueScalar = function (param, offset) {
	  switch (param.type) {
	    case 'char':
	      return this._getChars(offset, 1);
	    case 'strings':
	      return this._getStrings(offset, 1);
	    case 'uint8':
	      return this._getUint8(offset);
	    case 'uint16':
	      return this._getUint16(offset);
	    case 'uint32':
	      return this._getUint32(offset);
	    case 'float':
	      return this._getFloat(offset);
	    default:
	      // TODO: to be specific
	      throw 'error: undefined type' + param;
	  }
	};

	FileParser.prototype._getValueArray = function (param, offset) {
	  if (param.type == 'char') {
	    return this._getChars(offset, param.size);
	  }

	  if (param.type == 'strings') {
	    return this._getStrings(offset, param.size);
	  }

	  var array = [];
	  var size = this._sizeofScalar(param);
	  for (var i = 0; i < param.size; i++) {
	    array[i] = this._getValueScalar(param, offset);
	    offset += size;
	  }

	  return array;
	};

	FileParser.prototype._sizeof = function (param) {
	  return param.isArray === undefined ? this._sizeofScalar(param) : this._sizeofArray(param);
	};

	FileParser.prototype._sizeofScalar = function (param) {
	  switch (param.type) {
	    case 'char':
	      return 1;
	    case 'strings':
	      return 1;
	    case 'uint8':
	      return 1;
	    case 'uint16':
	      return 2;
	    case 'uint32':
	      return 4;
	    case 'float':
	      return 4;
	    default:
	      // TODO: to be specific
	      throw 'error: undefined type ' + param + ' ' + param.type;
	  }
	};

	FileParser.prototype._sizeofArray = function (param) {
	  return this._sizeofScalar(param) * param.size;
	};

	FileParser.prototype._sizeofObject = function (o) {
	  var size = 0;
	  for (var key in o) {
	    size += this._sizeof(o[key]);
	  }
	  return size;
	};

	FileParser.prototype._getUint8 = function (pos) {
	  return this.uint8[pos];
	};

	FileParser.prototype._getUint16 = function (pos) {
	  return this._getValueWithReverseByteOrder(pos, 2);
	};

	FileParser.prototype._getUint32 = function (pos) {
	  return this._getValueWithReverseByteOrder(pos, 4);
	};

	FileParser.prototype._getFloat = function (pos) {
	  return this._toBinary32(this._getValueWithReverseByteOrder(pos, 4));
	};

	FileParser.prototype._getValueWithReverseByteOrder = function (pos, size) {
	  var value = 0;
	  for (var i = 0; i < size; i++) {
	    value = value << 8 | this.uint8[pos + size - i - 1];
	  }
	  return value;
	};

	FileParser.prototype._toBinary32 = function (uint32) {
	  var sign = uint32 >> 31 & 1;
	  var exponent = uint32 >> 23 & 0xFF;
	  var fraction = uint32 & 0x7FFFFF;

	  if (exponent == 0 && fraction == 0) return 0.0;

	  if (exponent == 255 && fraction == 0) return Infinity;

	  if (exponent == 255 && fraction != 0) return NaN;

	  var tmp = 1;

	  if (exponent == 0 && fraction != 0) {
	    exponent = 1;
	    tmp = 0;
	  }

	  for (var i = 0; i < 23; i++) {
	    if (fraction >> 22 - i & 1) {
	      tmp += this.Math.pow(2, -(i + 1));
	    }
	  }
	  tmp = tmp * this.Math.pow(2, exponent - 127);
	  if (sign) tmp = -tmp;
	  return tmp;
	};

	FileParser.prototype._getChars = function (pos, size) {
	  var str = '';
	  for (var i = 0; i < size; i++) {
	    var index = pos + i;
	    if (this.uint8[index] == 0) break;
	    // TODO: temporal
	    str += String.fromCharCode(this.uint8[index]);
	  }
	  return str;
	};

	FileParser.prototype._getStrings = function (pos, size) {
	  var str = '';
	  for (var i = 0; i < size; i++) {
	    var index = pos + i;
	    if (this.uint8[index] == 0) break;
	    // TODO: temporal
	    str += (0, _Utility2.default)(16, this.uint8[index], 2);
	  }
	  return str;
	};

	FileParser.prototype.dump = function () {
	  var array = this.uint8;

	  var figure = 0;
	  var tmp = array.length;
	  while (tmp > 0) {
	    figure++;
	    tmp = tmp / 16 | 0;
	  }

	  var dump = '';
	  var charDump = '';
	  for (var i = 0; i < array.length; i++) {
	    if (i % 16 == 0) {
	      dump += (0, _Utility2.default)(16, i, figure);
	      dump += ' ';
	    }

	    dump += (0, _Utility2.default)(16, array[i], 2);
	    dump += ' ';

	    if (array[i] >= 0x20 && array[i] <= 0x7E) charDump += String.fromCharCode(array[i]);else charDump += '.';

	    if (i % 16 == 15) {
	      dump += '  ';
	      dump += charDump;
	      dump += '\n';
	      charDump = '';
	    }
	  }

	  return dump;
	};

	module.exports = FileParser;

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Inherit = __webpack_require__(7);

	var _Inherit2 = _interopRequireDefault(_Inherit);

	var _FileParser = __webpack_require__(20);

	var _FileParser2 = _interopRequireDefault(_FileParser);

	var _Pmd = __webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function PMDFileParser(buffer) {
	  this.parent = _FileParser2.default;
	  this.parent.call(this, buffer);
	  this.englishCompatibility = false;
	};
	(0, _Inherit2.default)(PMDFileParser, _FileParser2.default);

	PMDFileParser.prototype._HEADER_STRUCTURE = {
	  magic: { type: 'char', isArray: true, size: 3 },
	  version: { type: 'float' },
	  modelName: { type: 'char', isArray: true, size: 20 },
	  comment: { type: 'char', isArray: true, size: 256 }
	};

	PMDFileParser.prototype._VERTICES_STRUCTURE = {
	  count: { type: 'uint32' },
	  vertices: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._VERTEX_STRUCTURE = {
	  position: { type: 'float', isArray: true, size: 3 },
	  normal: { type: 'float', isArray: true, size: 3 },
	  uv: { type: 'float', isArray: true, size: 2 },
	  boneIndices: { type: 'uint16', isArray: true, size: 2 },
	  boneWeight: { type: 'uint8' },
	  edgeFlag: { type: 'uint8' }
	};

	PMDFileParser.prototype._VERTEX_INDICES_STRUCTURE = {
	  count: { type: 'uint32' },
	  // Note: type can be 'uint16'
	  indices: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._VERTEX_INDEX_STRUCTURE = {
	  index: { type: 'uint16' }
	};

	PMDFileParser.prototype._MATERIALS_STRUCTURE = {
	  count: { type: 'uint32' },
	  materials: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._MATERIAL_STRUCTURE = {
	  color: { type: 'float', isArray: true, size: 4 },
	  specularity: { type: 'float' },
	  specularColor: { type: 'float', isArray: true, size: 3 },
	  mirrorColor: { type: 'float', isArray: true, size: 3 },
	  tuneIndex: { type: 'uint8' },
	  edgeFlag: { type: 'uint8' },
	  vertexCount: { type: 'uint32' },
	  fileName: { type: 'char', isArray: true, size: 20 }
	};

	PMDFileParser.prototype._BONES_STRUCTURE = {
	  count: { type: 'uint16' },
	  bones: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._BONE_STRUCTURE = {
	  name: { type: 'strings', isArray: true, size: 20 },
	  parentIndex: { type: 'uint16' },
	  tailIndex: { type: 'uint16' },
	  type: { type: 'uint8' },
	  ikIndex: { type: 'uint16' },
	  position: { type: 'float', isArray: true, size: 3 }
	};

	PMDFileParser.prototype._IKS_STRUCTURE = {
	  count: { type: 'uint16' },
	  iks: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._IK_STRUCTURE = {
	  index: { type: 'uint16' },
	  targetBoneIndex: { type: 'uint16' },
	  chainLength: { type: 'uint8' },
	  iteration: { type: 'uint16' },
	  limitation: { type: 'float' },
	  childBoneIndices: { type: 'uint16', isArray: true, size: 'chainLength' }
	};

	PMDFileParser.prototype._FACES_STRUCTURE = {
	  count: { type: 'uint16' },
	  faces: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._FACE_STRUCTURE = {
	  name: { type: 'strings', isArray: true, size: 20 },
	  vertexCount: { type: 'uint32' },
	  type: { type: 'uint8' },
	  vertices: { type: 'object', isArray: true, size: 'vertexCount' }
	};

	PMDFileParser.prototype._FACE_VERTEX_STRUCTURE = {
	  index: { type: 'uint32' },
	  position: { type: 'float', isArray: true, size: 3 }
	};

	PMDFileParser.prototype._FACE_DISPLAYS_STRUCTURE = {
	  count: { type: 'uint8' },
	  indices: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._FACE_DISPLAY_STRUCTURE = {
	  index: { type: 'uint16' }
	};

	PMDFileParser.prototype._BONE_FRAME_NAMES_STRUCTURE = {
	  count: { type: 'uint8' },
	  names: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._BONE_FRAME_NAME_STRUCTURE = {
	  name: { type: 'strings', isArray: true, size: 50 }
	};

	PMDFileParser.prototype._BONE_DISPLAYS_STRUCTURE = {
	  count: { type: 'uint32' },
	  displays: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._BONE_DISPLAY_STRUCTURE = {
	  index: { type: 'uint16' },
	  frameIndex: { type: 'uint8' }
	};

	PMDFileParser.prototype._ENGLISH_HEADER_STRUCTURE = {
	  compatibility: { type: 'uint8' },
	  modelName: { type: 'char', isArray: true, size: 20 },
	  comment: { type: 'char', isArray: true, size: 256 }
	};

	PMDFileParser.prototype._ENGLISH_BONE_NAME_STRUCTURE = {
	  name: { type: 'char', isArray: true, size: 20 }
	};

	PMDFileParser.prototype._ENGLISH_FACE_NAME_STRUCTURE = {
	  name: { type: 'char', isArray: true, size: 20 }
	};

	PMDFileParser.prototype._ENGLISH_BONE_FRAME_NAME_STRUCTURE = {
	  name: { type: 'char', isArray: true, size: 50 }
	};

	PMDFileParser.prototype._TOON_TEXTURE_STRUCTURE = {
	  fileName: { type: 'char', isArray: true, size: 100 }
	};

	PMDFileParser.prototype._RIGID_BODIES_STRUCTURE = {
	  count: { type: 'uint32' },
	  bodies: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._RIGID_BODY_STRUCTURE = {
	  name: { type: 'strings', isArray: true, size: 20 },
	  boneIndex: { type: 'uint16' },
	  groupIndex: { type: 'uint8' },
	  groupTarget: { type: 'uint16' },
	  shapeType: { type: 'uint8' },
	  width: { type: 'float' },
	  height: { type: 'float' },
	  depth: { type: 'float' },
	  position: { type: 'float', isArray: true, size: 3 },
	  rotation: { type: 'float', isArray: true, size: 3 },
	  weight: { type: 'float' },
	  positionDim: { type: 'float' },
	  rotationDim: { type: 'float' },
	  recoil: { type: 'float' },
	  friction: { type: 'float' },
	  type: { type: 'uint8' }
	};

	PMDFileParser.prototype._JOINTS_STRUCTURE = {
	  count: { type: 'uint32' },
	  joints: { type: 'object', isArray: true, size: 'count' }
	};

	PMDFileParser.prototype._JOINT_STRUCTURE = {
	  name: { type: 'strings', isArray: true, size: 20 },
	  rigidBody1: { type: 'uint32' },
	  rigidBody2: { type: 'uint32' },
	  position: { type: 'float', isArray: true, size: 3 },
	  rotation: { type: 'float', isArray: true, size: 3 },
	  translationLimitation1: { type: 'float', isArray: true, size: 3 },
	  translationLimitation2: { type: 'float', isArray: true, size: 3 },
	  rotationLimitation1: { type: 'float', isArray: true, size: 3 },
	  rotationLimitation2: { type: 'float', isArray: true, size: 3 },
	  springPosition: { type: 'float', isArray: true, size: 3 },
	  springRotation: { type: 'float', isArray: true, size: 3 }
	};

	PMDFileParser.prototype.parse = function () {
	  this.offset = 0;

	  var p = new _Pmd.PMD();
	  this._parseHeader(p);
	  this._parseVertices(p);
	  this._parseVertexIndices(p);
	  this._parseMaterials(p);
	  this._parseBones(p);
	  this._parseIKs(p);
	  this._parseFaces(p);
	  this._parseFaceDisplays(p);
	  this._parseBoneFrameNames(p);
	  this._parseBoneDisplays(p);
	  this._parseEnglishHeader(p);
	  if (this.englishCompatibility) {
	    this._parseEnglishBoneNames(p);
	    this._parseEnglishFaceNames(p);
	    this._parseEnglishBoneFrameNames(p);
	  }
	  this._parseToonTextures(p);
	  this._parseRigidBodies(p);
	  this._parseJoints(p);

	  return p;
	};

	/**
	 * TODO: be more strict.
	 */
	PMDFileParser.prototype.valid = function () {
	  var tmp = this.offset;
	  this.offset = 0;

	  var p = new _Pmd.PMD();
	  this._parseHeader(p);

	  this.offset = tmp;

	  return p.valid();
	};

	PMDFileParser.prototype._parseHeader = function (p) {
	  var s = this._HEADER_STRUCTURE;
	  p.header = new _Pmd.PMDHeader();
	  this._parseObject(p.header, s);
	};

	PMDFileParser.prototype._parseVertices = function (p) {
	  var s = this._VERTICES_STRUCTURE;
	  p.vertexCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.vertices.length = 0;
	  for (var i = 0; i < p.vertexCount; i++) {
	    this._parseVertex(p, i);
	  }
	};

	PMDFileParser.prototype._parseVertex = function (p, n) {
	  var s = this._VERTEX_STRUCTURE;
	  var v = new _Pmd.PMDVertex(n);
	  this._parseObject(v, s);
	  p.vertices[n] = v;
	};

	PMDFileParser.prototype._parseVertexIndices = function (p) {
	  var s = this._VERTEX_INDICES_STRUCTURE;
	  p.vertexIndexCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.vertexIndices.length = 0;
	  for (var i = 0; i < p.vertexIndexCount; i++) {
	    this._parseVertexIndex(p, i);
	  }
	};

	PMDFileParser.prototype._parseVertexIndex = function (p, n) {
	  var s = this._VERTEX_INDEX_STRUCTURE;
	  var v = new _Pmd.PMDVertexIndex(n);
	  this._parseObject(v, s);
	  p.vertexIndices[n] = v;
	};

	PMDFileParser.prototype._parseMaterials = function (p) {
	  var s = this._MATERIALS_STRUCTURE;
	  p.materialCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.materials.length = 0;
	  for (var i = 0; i < p.materialCount; i++) {
	    this._parseMaterial(p, i);
	  }
	};

	PMDFileParser.prototype._parseMaterial = function (p, n) {
	  var s = this._MATERIAL_STRUCTURE;
	  var m = new _Pmd.PMDMaterial(n);
	  this._parseObject(m, s);
	  p.materials[n] = m;
	};

	PMDFileParser.prototype._parseBones = function (p) {
	  var s = this._BONES_STRUCTURE;
	  p.boneCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.bones.length = 0;
	  for (var i = 0; i < p.boneCount; i++) {
	    this._parseBone(p, i);
	  }
	};

	PMDFileParser.prototype._parseBone = function (p, n) {
	  var s = this._BONE_STRUCTURE;
	  var b = new _Pmd.PMDBone(n);
	  this._parseObject(b, s);
	  p.bones[n] = b;
	};

	PMDFileParser.prototype._parseIKs = function (p) {
	  var s = this._IKS_STRUCTURE;
	  p.ikCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.iks.length = 0;
	  for (var i = 0; i < p.ikCount; i++) {
	    this._parseIK(p, i);
	  }
	};

	/**
	 * NOTE: specialized _parseObject() because IK has a variable length array
	 * TODO: be combined with general function _parseObject()
	 *       to remove duplicated code.
	 */
	PMDFileParser.prototype._parseIK = function (p, n) {
	  var s = this._IK_STRUCTURE;
	  var ik = new _Pmd.PMDIK(n);

	  for (var key in s) {
	    if (key == 'childBoneIndices') continue;

	    ik[key] = this._getValue(s[key], this.offset);
	    this.offset += this._sizeof(s[key]);
	  }

	  ik.childBoneIndices = [];
	  var size = this._sizeofScalar(s.childBoneIndices);
	  for (var i = 0; i < ik.chainLength; i++) {
	    ik.childBoneIndices[i] = this._getValueScalar(s.childBoneIndices, this.offset);
	    this.offset += size;
	  }
	  p.iks[n] = ik;
	};

	PMDFileParser.prototype._parseFaces = function (p) {
	  var s = this._FACES_STRUCTURE;
	  p.faceCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.faces.length = 0;
	  for (var i = 0; i < p.faceCount; i++) {
	    this._parseFace(p, i);
	  }
	};

	/**
	 * NOTE: specialized _parseObject() because Face has a variable length array
	 * TODO: be combined with general function _parseObject()
	 *       to remove duplicated code.
	 */
	PMDFileParser.prototype._parseFace = function (p, n) {
	  var s = this._FACE_STRUCTURE;
	  var f = new _Pmd.PMDFace(n);

	  for (var key in s) {
	    if (key == 'vertices') continue;

	    f[key] = this._getValue(s[key], this.offset);
	    this.offset += this._sizeof(s[key]);
	  }

	  f.vertices = [];
	  for (var i = 0; i < f.vertexCount; i++) {
	    this._parseFaceVertex(f, i, f.type);
	  }
	  p.faces[n] = f;
	};

	PMDFileParser.prototype._parseFaceVertex = function (f, n, type) {
	  var s = this._FACE_VERTEX_STRUCTURE;
	  var v = new _Pmd.PMDFaceVertex(n, type);
	  this._parseObject(v, s);
	  f.vertices[n] = v;
	};

	PMDFileParser.prototype._parseFaceDisplays = function (p) {
	  var s = this._FACE_DISPLAYS_STRUCTURE;
	  p.faceDisplayCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.faceDisplays.length = 0;
	  for (var i = 0; i < p.faceDisplayCount; i++) {
	    this._parseFaceDisplay(p, i);
	  }
	};

	PMDFileParser.prototype._parseFaceDisplay = function (p, n) {
	  var s = this._FACE_DISPLAY_STRUCTURE;
	  var d = new _Pmd.PMDFaceDisplay(n);
	  this._parseObject(d, s);
	  p.faceDisplays[n] = d;
	};

	PMDFileParser.prototype._parseBoneFrameNames = function (p) {
	  var s = this._BONE_FRAME_NAMES_STRUCTURE;
	  p.boneFrameNameCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.boneFrameNames.length = 0;
	  for (var i = 0; i < p.boneFrameNameCount; i++) {
	    this._parseBoneFrameName(p, i);
	  }
	};

	PMDFileParser.prototype._parseBoneFrameName = function (p, n) {
	  var s = this._BONE_FRAME_NAME_STRUCTURE;
	  var d = new _Pmd.PMDBoneFrameName(n);
	  this._parseObject(d, s);
	  p.boneFrameNames[n] = d;
	};

	PMDFileParser.prototype._parseBoneDisplays = function (p) {
	  var s = this._BONE_DISPLAYS_STRUCTURE;
	  p.boneDisplayCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.boneDisplays.length = 0;
	  for (var i = 0; i < p.boneDisplayCount; i++) {
	    this._parseBoneDisplay(p, i);
	  }
	};

	PMDFileParser.prototype._parseBoneDisplay = function (p, n) {
	  var s = this._BONE_DISPLAY_STRUCTURE;
	  var d = new _Pmd.PMDBoneDisplay(n);
	  this._parseObject(d, s);
	  p.boneDisplays[n] = d;
	};

	PMDFileParser.prototype._parseEnglishHeader = function (p) {
	  var s = this._ENGLISH_HEADER_STRUCTURE;
	  p.englishHeader = new _Pmd.PMDEnglishHeader();
	  this._parseObject(p.englishHeader, s);

	  if (p.englishHeader.compatibility == 0) {
	    this.offset -= this._sizeofObject(s);
	    this.offset += this._sizeof(s.compatibility);
	    this.englishCompatibility = false;
	  } else {
	    this.englishCompatibility = true;
	  }
	};

	PMDFileParser.prototype._parseEnglishBoneNames = function (p) {
	  var s = this._ENGLISH_BONE_NAME_STRUCTURE;
	  p.englishBoneNames.length = 0;
	  for (var i = 0; i < p.boneCount; i++) {
	    var b = new _Pmd.PMDEnglishBoneName(i);
	    this._parseObject(b, s);
	    p.englishBoneNames[i] = b;
	  }
	};

	PMDFileParser.prototype._parseEnglishFaceNames = function (p) {
	  var s = this._ENGLISH_FACE_NAME_STRUCTURE;
	  p.englishFaceNames.length = 0;
	  for (var i = 0; i < p.faceCount - 1; i++) {
	    var b = new _Pmd.PMDEnglishFaceName(i);
	    this._parseObject(b, s);
	    p.englishFaceNames[i] = b;
	  }
	};

	PMDFileParser.prototype._parseEnglishBoneFrameNames = function (p) {
	  var s = this._ENGLISH_BONE_FRAME_NAME_STRUCTURE;
	  p.englishBoneFrameNames.length = 0;
	  for (var i = 0; i < p.boneFrameNameCount; i++) {
	    var n = new _Pmd.PMDEnglishBoneFrameName(i);
	    this._parseObject(n, s);
	    p.englishBoneFrameNames[i] = n;
	  }
	};

	PMDFileParser.prototype._parseToonTextures = function (p) {
	  var s = this._TOON_TEXTURE_STRUCTURE;
	  p.toonTextureCount = 10;
	  p.toonTextures.length = 0;
	  for (var i = 0; i < p.toonTextureCount; i++) {
	    var t = new _Pmd.PMDToonTexture(i);
	    this._parseObject(t, s);
	    p.toonTextures[i] = t;
	  }
	};

	PMDFileParser.prototype._parseRigidBodies = function (p) {
	  var s = this._RIGID_BODIES_STRUCTURE;
	  p.rigidBodyCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.rigidBodies.length = 0;
	  for (var i = 0; i < p.rigidBodyCount; i++) {
	    this._parseRigidBody(p, i);
	  }
	};

	PMDFileParser.prototype._parseRigidBody = function (p, n) {
	  var s = this._RIGID_BODY_STRUCTURE;
	  var b = new _Pmd.PMDRigidBody(n);
	  this._parseObject(b, s);
	  p.rigidBodies[n] = b;
	};

	PMDFileParser.prototype._parseJoints = function (p) {
	  var s = this._JOINTS_STRUCTURE;
	  p.jointCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  p.joints.length = 0;
	  for (var i = 0; i < p.jointCount; i++) {
	    this._parseJoint(p, i);
	  }
	};

	PMDFileParser.prototype._parseJoint = function (p, n) {
	  var s = this._JOINT_STRUCTURE;
	  var j = new _Pmd.PMDJoint(n);
	  this._parseObject(j, s);
	  p.joints[n] = j;
	};

	module.exports = PMDFileParser;

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _glMatrix095Min = __webpack_require__(5);

	var _GlslFunctions = __webpack_require__(66);

	var _GlslFunctions2 = _interopRequireDefault(_GlslFunctions);

	var _Physics = __webpack_require__(17);

	var _Physics2 = _interopRequireDefault(_Physics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createFloatArray = function createFloatArray(num) {
	  return new Float32Array(num);
	};
	var createUintArray = function createUintArray(num) {
	  return new Uint16Array(num);
	};

	/**
	 * TODO: refactoring
	 */
	function PMDModelView(layer, pmd, pmdView) {
	  this.layer = layer;
	  this.pmd = pmd;
	  this.view = pmdView;
	  this.vmd = null;
	  this.audio = null;

	  // this.vtf = layer.generateTexture(document.createElement('img'));
	  // this.vtfWidth = layer.calculateVTFWidth(pmd.boneCount*7);
	  // var buffer = new ArrayBuffer(this.vtfWidth * this.vtfWidth * 4);
	  // this.vtfUint8Array = new Uint8Array(buffer);
	  // this.vtfFloatArray = new Float32Array(buffer);

	  // hack createFloatArray
	  this.vArray = createFloatArray(pmd.vertexCount * this._V_ITEM_SIZE);
	  this.vArray1 = createFloatArray(pmd.vertexCount * this._V_ITEM_SIZE);
	  this.vArray2 = createFloatArray(pmd.vertexCount * this._V_ITEM_SIZE);
	  this.vmArray = createFloatArray(pmd.vertexCount * this._V_ITEM_SIZE);
	  this.veArray = createFloatArray(pmd.vertexCount * this._VE_ITEM_SIZE);
	  this.mtArray1 = createFloatArray(pmd.vertexCount * this._MT_ITEM_SIZE);
	  this.mtArray2 = createFloatArray(pmd.vertexCount * this._MT_ITEM_SIZE);
	  this.mrArray1 = createFloatArray(pmd.vertexCount * this._MR_ITEM_SIZE);
	  this.mrArray2 = createFloatArray(pmd.vertexCount * this._MR_ITEM_SIZE);
	  this.cArray = createFloatArray(pmd.vertexCount * this._C_ITEM_SIZE);
	  this.iArray = createUintArray(pmd.vertexIndexCount);
	  this.biArray = createFloatArray(pmd.vertexCount * this._BI_ITEM_SIZE);
	  this.bwArray = createFloatArray(pmd.vertexCount * this._BW_ITEM_SIZE);
	  this.vnArray = createFloatArray(pmd.vertexCount * this._VN_ITEM_SIZE);

	  // this.vBuffer = layer.createBuffer();
	  // this.vBuffer1 = layer.createBuffer();
	  // this.vBuffer2 = layer.createBuffer();
	  // this.vmBuffer = layer.createBuffer();
	  // this.veBuffer = layer.createBuffer();
	  // this.mtBuffer1 = layer.createBuffer();
	  // this.mtBuffer2 = layer.createBuffer();
	  // this.mrBuffer1 = layer.createBuffer();
	  // this.mrBuffer2 = layer.createBuffer();
	  // this.cBuffer = layer.createBuffer();
	  // this.iBuffer = layer.createBuffer();
	  // this.biBuffer = layer.createBuffer();
	  // this.bwBuffer = layer.createBuffer();
	  // this.vnBuffer = layer.createBuffer();

	  this.textures = [];
	  this.toonTextures = [];
	  this.sphereTextures = [];

	  this.basePosition = [0, 0, 0];

	  this.frame = 0;

	  this.motions = [];
	  this.originalMotions = {};

	  this.posFromBone1 = [];
	  this.posFromBone2 = [];

	  this.dancing = false;

	  this.physics = new _Physics2.default(this.pmd);
	};

	// Note: for reference
	PMDModelView.prototype.Math = Math;
	PMDModelView.prototype.vec3 = _glMatrix095Min.vec3;
	PMDModelView.prototype.quat4 = _glMatrix095Min.quat4;
	PMDModelView.prototype.mat4 = _glMatrix095Min.mat4;

	PMDModelView.prototype._V_ITEM_SIZE = 3;
	PMDModelView.prototype._C_ITEM_SIZE = 2;
	PMDModelView.prototype._I_ITEM_SIZE = 1;
	PMDModelView.prototype._BW_ITEM_SIZE = 1;
	PMDModelView.prototype._BI_ITEM_SIZE = 2;
	PMDModelView.prototype._MT_ITEM_SIZE = 3;
	PMDModelView.prototype._MR_ITEM_SIZE = 4;
	PMDModelView.prototype._VN_ITEM_SIZE = 3;
	PMDModelView.prototype._VE_ITEM_SIZE = 1;

	PMDModelView.prototype.setup = function () {
	  // TODO: temporal
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    for (var j = 0; j < this._MT_ITEM_SIZE; j++) {
	      this.mtArray1[i * this._MT_ITEM_SIZE + j] = 0;
	      this.mtArray2[i * this._MT_ITEM_SIZE + j] = 0;
	    }
	    for (var j = 0; j < this._MR_ITEM_SIZE; j++) {
	      this.mrArray1[i * this._MR_ITEM_SIZE + j] = 0;
	      this.mrArray2[i * this._MR_ITEM_SIZE + j] = 0;
	    }
	  }

	  this.layer = {};
	  this.layer.pourArrayBuffer = function () {};
	  this.layer.pourElementArrayBuffer = function () {};
	  // var layer = this.layer;
	  // layer.pourArrayBuffer(this.mtBuffer1, this.mtArray1,
	  //                       this._MT_ITEM_SIZE, this.pmd.vertexCount);
	  // layer.pourArrayBuffer(this.mtBuffer2, this.mtArray2,
	  //                       this._MT_ITEM_SIZE, this.pmd.vertexCount);
	  // layer.pourArrayBuffer(this.mrBuffer1, this.mrArray1,
	  //                       this._MR_ITEM_SIZE, this.pmd.vertexCount);
	  // layer.pourArrayBuffer(this.mrBuffer2, this.mrArray2,
	  //                       this._MR_ITEM_SIZE, this.pmd.vertexCount);

	  this._initArrays();
	  this._initTextures();
	  // this._pourArrays();
	  // this._bindBuffers();
	};

	/**
	 * TODO: temporal
	 */
	PMDModelView.prototype.setBasePosition = function (x, y, z) {
	  this.basePosition[0] = x;
	  this.basePosition[1] = y;
	  this.basePosition[2] = z;

	  this._initMotions2();
	  for (var i = 0; i < this.pmd.boneCount; i++) {
	    this._getBoneMotion(i);
	  }
	  this.physics.resetRigidBodies(this.motions);
	};

	PMDModelView.prototype.setVMD = function (vmd) {
	  this.vmd = vmd;
	};

	PMDModelView.prototype.startDance = function () {
	  this.vmd.setup(this.pmd);
	  this.dancing = true;
	  this.frame = 0;

	  this._initMotions2();
	  this._moveBone(1);
	  this.physics.resetRigidBodies(this.motions);
	};

	PMDModelView.prototype._initArrays = function () {
	  this._initVertices();
	  this._initVerticesFromBones();
	  this._initVertexMorphs();
	  this._initVertexEdges();
	  this._initCoordinates();
	  this._initIndices();
	  this._initBoneWeights();
	  this._initBoneIndices();
	  this._initVertexNormals();
	  this._initMotions();
	  this._initMotionArrays();
	};

	PMDModelView.prototype._initVertices = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    var pos = this.pmd.vertices[i].position;
	    var index = i * this._V_ITEM_SIZE;

	    for (var j = 0; j < this._V_ITEM_SIZE; j++) {
	      this.vArray[index + j] = pos[j];
	    }
	  }
	};

	PMDModelView.prototype._initVerticesFromBones = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    var pos = this.pmd.vertices[i].position;
	    var bi1 = this.pmd.vertices[i].boneIndices[0];
	    var bi2 = this.pmd.vertices[i].boneIndices[1];
	    var b1 = this.pmd.bones[bi1];
	    var b2 = this.pmd.bones[bi2];

	    var v1 = this.vec3.create();
	    var v2 = this.vec3.create();
	    for (var j = 0; j < this._V_ITEM_SIZE; j++) {
	      v1[j] = pos[j] - b1.position[j];
	      v2[j] = pos[j] - b2.position[j];
	    }
	    this.posFromBone1.push(v1);
	    this.posFromBone2.push(v2);

	    var index = i * this._V_ITEM_SIZE;
	    for (var j = 0; j < this._V_ITEM_SIZE; j++) {
	      this.vArray1[index + j] = pos[j] - b1.position[j];
	      this.vArray2[index + j] = pos[j] - b2.position[j];
	    }
	  }
	};

	PMDModelView.prototype._initVertexMorphs = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    var index = i * this._V_ITEM_SIZE;

	    for (var j = 0; j < this._V_ITEM_SIZE; j++) {
	      this.vmArray[index + j] = 0;
	    }
	  }
	};

	PMDModelView.prototype._initVertexEdges = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    this.veArray[i] = this.pmd.vertices[i].edgeFlag ? 0.0 : 1.0;
	  }
	};

	PMDModelView.prototype._initCoordinates = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    var index = i * this._C_ITEM_SIZE;
	    var uv = this.pmd.vertices[i].uv;
	    for (var j = 0; j < this._C_ITEM_SIZE; j++) {
	      this.cArray[index + j] = uv[j];
	    }
	  }
	};

	PMDModelView.prototype._initIndices = function () {
	  for (var i = 0; i < this.pmd.vertexIndexCount; i++) {
	    this.iArray[i] = this.pmd.vertexIndices[i].index;
	  }
	};

	PMDModelView.prototype._initBoneWeights = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    this.bwArray[i] = this.pmd.vertices[i].boneWeight / 100;
	  }
	};

	PMDModelView.prototype._initBoneIndices = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    for (var j = 0; j < this._BI_ITEM_SIZE; j++) {
	      this.biArray[i * this._BI_ITEM_SIZE + j] = this.pmd.vertices[i].boneIndices[j];
	    }
	  }
	};

	PMDModelView.prototype._initVertexNormals = function () {
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    var nor = this.pmd.vertices[i].normal;
	    var index = i * this._VN_ITEM_SIZE;

	    for (var j = 0; j < this._VN_ITEM_SIZE; j++) {
	      this.vnArray[index + j] = nor[j];
	    }
	  }
	};

	PMDModelView.prototype._initMotionArrays = function () {
	  if (this.view.skinningType == this.view._SKINNING_CPU) {
	    this._skinning();
	    return;
	  }

	  if (this.view.skinningType == this.view._SKINNING_GPU) {
	    this._pourVTF();
	    return;
	  }

	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    var bn1 = this.pmd.vertices[i].boneIndices[0];
	    var bn2 = this.pmd.vertices[i].boneIndices[1];
	    var m1 = this._getBoneMotion(bn1);
	    var m2 = this._getBoneMotion(bn2);

	    var index = i * this._MT_ITEM_SIZE;
	    for (var j = 0; j < this._MT_ITEM_SIZE; j++) {
	      this.mtArray1[index + j] = m1.p[j];
	      this.mtArray2[index + j] = m2.p[j];
	    }

	    index = i * this._MR_ITEM_SIZE;
	    for (var j = 0; j < this._MR_ITEM_SIZE; j++) {
	      this.mrArray1[index + j] = m1.r[j];
	      this.mrArray2[index + j] = m2.r[j];
	    }
	  }

	  // vec3 v1 = aVertexPosition1 + aVertexMorph;\
	  // v1 = qtransform(v1, aMotionRotation1) + aMotionTranslation1;\
	  PMDModelView.prototype.getVerticals = function (n) {
	    // var v1 = __GlslFunctions.arrayAdd(
	    //   [
	    //     this.vArray1[n * 3 + 0],
	    //     this.vArray1[n * 3 + 1],
	    //     this.vArray1[n * 3 + 2]
	    //   ],
	    //   // this.pmd.vertices[n].position,
	    //   [
	    //     this.vmArray[n * 3 + 0],
	    //     this.vmArray[n * 3 + 1],
	    //     this.vmArray[n * 3 + 2],
	    //   ]
	    // );
	    // v1 = __GlslFunctions.arrayAdd(
	    //   __GlslFunctions.qtransform(
	    //     v1,
	    //     [
	    //       this.mrArray1[n * 4 + 0],
	    //       this.mrArray1[n * 4 + 1],
	    //       this.mrArray1[n * 4 + 2],
	    //       this.mrArray1[n * 4 + 3],
	    //     ]
	    //   ),
	    //   [
	    //     this.mtArray1[n * 3 + 0],
	    //     this.mtArray1[n * 3 + 1],
	    //     this.mtArray1[n * 3 + 2],
	    //   ]
	    // );

	    // var v1 = __GlslFunctions.arrayAdd(
	    //   [
	    //     'this.vArray1[n * 3 + 0]',
	    //     'this.vArray1[n * 3 + 1]',
	    //     'this.vArray1[n * 3 + 2]'
	    //   ],
	    //   [
	    //     'this.vmArray[n * 3 + 0]',
	    //     'this.vmArray[n * 3 + 1]',
	    //     'this.vmArray[n * 3 + 2]',
	    //   ]
	    // );
	    // v1 = __GlslFunctions.arrayAdd(
	    //   __GlslFunctions.qtransform(
	    //     v1,
	    //     [
	    //       'this.mrArray1[n * 4 + 0]',
	    //       'this.mrArray1[n * 4 + 1]',
	    //       'this.mrArray1[n * 4 + 2]',
	    //       'this.mrArray1[n * 4 + 3]',
	    //     ]
	    //   ),
	    //   [
	    //     'this.mtArray1[n * 3 + 0]',
	    //     'this.mtArray1[n * 3 + 1]',
	    //     'this.mtArray1[n * 3 + 2]',
	    //   ]
	    // );
	    // console.warn(JSON.stringify(v1));
	    var v1 = [this.vArray1[n * 3 + 0] + this.vmArray[n * 3 + 0] + (((this.vArray1[n * 3 + 2] + this.vmArray[n * 3 + 2]) * this.mrArray1[n * 4 + 0] - (this.vArray1[n * 3 + 0] + this.vmArray[n * 3 + 0]) * this.mrArray1[n * 4 + 2] - (this.vArray1[n * 3 + 1] + this.vmArray[n * 3 + 1]) * this.mrArray1[n * 4 + 3]) * this.mrArray1[n * 4 + 2] - ((this.vArray1[n * 3 + 0] + this.vmArray[n * 3 + 0]) * this.mrArray1[n * 4 + 1] - (this.vArray1[n * 3 + 1] + this.vmArray[n * 3 + 1]) * this.mrArray1[n * 4 + 0] - (this.vArray1[n * 3 + 2] + this.vmArray[n * 3 + 2]) * this.mrArray1[n * 4 + 3]) * this.mrArray1[n * 4 + 1]) * 2 + this.mtArray1[n * 3 + 0], this.vArray1[n * 3 + 1] + this.vmArray[n * 3 + 1] + (((this.vArray1[n * 3 + 0] + this.vmArray[n * 3 + 0]) * this.mrArray1[n * 4 + 1] - (this.vArray1[n * 3 + 1] + this.vmArray[n * 3 + 1]) * this.mrArray1[n * 4 + 0] - (this.vArray1[n * 3 + 2] + this.vmArray[n * 3 + 2]) * this.mrArray1[n * 4 + 3]) * this.mrArray1[n * 4 + 0] - ((this.vArray1[n * 3 + 1] + this.vmArray[n * 3 + 1]) * this.mrArray1[n * 4 + 2] - (this.vArray1[n * 3 + 2] + this.vmArray[n * 3 + 2]) * this.mrArray1[n * 4 + 1] - (this.vArray1[n * 3 + 0] + this.vmArray[n * 3 + 0]) * this.mrArray1[n * 4 + 3]) * this.mrArray1[n * 4 + 2]) * 2 + this.mtArray1[n * 3 + 1], this.vArray1[n * 3 + 2] + this.vmArray[n * 3 + 2] + (((this.vArray1[n * 3 + 1] + this.vmArray[n * 3 + 1]) * this.mrArray1[n * 4 + 2] - (this.vArray1[n * 3 + 2] + this.vmArray[n * 3 + 2]) * this.mrArray1[n * 4 + 1] - (this.vArray1[n * 3 + 0] + this.vmArray[n * 3 + 0]) * this.mrArray1[n * 4 + 3]) * this.mrArray1[n * 4 + 1] - ((this.vArray1[n * 3 + 2] + this.vmArray[n * 3 + 2]) * this.mrArray1[n * 4 + 0] - (this.vArray1[n * 3 + 0] + this.vmArray[n * 3 + 0]) * this.mrArray1[n * 4 + 2] - (this.vArray1[n * 3 + 1] + this.vmArray[n * 3 + 1]) * this.mrArray1[n * 4 + 3]) * this.mrArray1[n * 4 + 0]) * 2 + this.mtArray1[n * 3 + 2]];

	    if (this.bwArray[n] < 0.99) {
	      var v2 = _GlslFunctions2.default.arrayAdd([this.vArray2[n * 3 + 0], this.vArray2[n * 3 + 1], this.vArray2[n * 3 + 2]],
	      // this.pmd.vertices[n].position,
	      [this.vmArray[n * 3 + 0], this.vmArray[n * 3 + 1], this.vmArray[n * 3 + 2]]);

	      v2 = _GlslFunctions2.default.arrayAdd(_GlslFunctions2.default.qtransform(v2, [this.mrArray2[n * 4 + 0], this.mrArray2[n * 4 + 1], this.mrArray2[n * 4 + 2], this.mrArray2[n * 4 + 3]]), [this.mtArray2[n * 3 + 0], this.mtArray2[n * 3 + 1], this.mtArray2[n * 3 + 2]]);

	      v1 = _GlslFunctions2.default.mix(v2, v1, this.bwArray[n]);
	    }

	    return v1;
	  }.bind(this);
	};

	/**
	 * TODO: consider the case if images aren't loaded yet.
	 */
	PMDModelView.prototype._initTextures = function () {
	  return;
	  for (var i = 0; i < this.pmd.materialCount; i++) {
	    this.textures[i] = this.layer.generateTexture(this.pmd.images[i]);
	  }

	  for (var i = 0; i < this.pmd.toonTextureCount; i++) {
	    this.toonTextures[i] = this.layer.generateTexture(this.pmd.toonImages[i]);
	  }

	  for (var i = 0; i < this.pmd.materialCount; i++) {
	    this.sphereTextures[i] = this.layer.generateTexture(this.pmd.sphereImages[i]);
	  }
	};

	PMDModelView.prototype._initMotions = function () {
	  for (var i = 0; i < this.pmd.boneCount; i++) {
	    this.motions[i] = {
	      r: this.quat4.create(),
	      p: this.vec3.create(),
	      done: false
	    };

	    var b = this.pmd.bones[i];
	    var a = {};
	    a.location = [0, 0, 0];
	    a.rotation = [0, 0, 0, 1];
	    this.originalMotions[b.name] = a;
	  }
	};

	/**
	 * TODO: temporal
	 */
	PMDModelView.prototype._initMotions2 = function () {
	  for (var i = 0; i < this.pmd.boneCount; i++) {
	    if (!this.motions[i]) continue; // chenzhuo
	    this.quat4.clear(this.motions[i].r);
	    this.vec3.clear(this.motions[i].p);
	    this.motions[i].done = false;

	    var b = this.pmd.bones[i];
	    var a = this.originalMotions[b.name];
	    this.vec3.clear(a.location);
	    this.quat4.clear(a.rotation);
	  }
	};

	PMDModelView.prototype._packTo4Uint8 = function (f, uint8Array, offset) {
	  f = f * 1.0;
	  var sign = f < 0.0 ? 0x80 : 0x00;
	  f = this.Math.abs(f);
	  uint8Array[offset + 0] = sign | f & 0x7F;
	  uint8Array[offset + 1] = f * 256.0 & 0xFF;
	  uint8Array[offset + 2] = f * 256.0 * 256.0 & 0xFF;
	  uint8Array[offset + 3] = f * 256.0 * 256.0 * 256.0 & 0xFF;
	};

	PMDModelView.prototype._pourVTF = function () {
	  for (var i = 0; i < this.pmd.boneCount; i++) {
	    var offset = 7 * i * 4;

	    // Motion Translation x, y, z
	    var m = this._getBoneMotion(i);
	    this._packTo4Uint8(m.p[0], this.vtfUint8Array, offset + 0);
	    this._packTo4Uint8(m.p[1], this.vtfUint8Array, offset + 4);
	    this._packTo4Uint8(m.p[2], this.vtfUint8Array, offset + 8);

	    // Motion Rotation x, y, z, w
	    this._packTo4Uint8(m.r[0], this.vtfUint8Array, offset + 12);
	    this._packTo4Uint8(m.r[1], this.vtfUint8Array, offset + 16);
	    this._packTo4Uint8(m.r[2], this.vtfUint8Array, offset + 20);
	    this._packTo4Uint8(m.r[3], this.vtfUint8Array, offset + 24);
	  }
	  this.layer.pourVTF(this.vtf, this.vtfUint8Array, this.vtfWidth);
	};

	/**
	 * TODO: rename
	 */
	PMDModelView.prototype.skinningOneBone = function (b) {
	  if (b.id === null) return null;

	  var m = this._getBoneMotion(b.id);
	  var v = b.posFromBone;
	  var vd = [0, 0, 0];
	  this.quat4.multiplyVec3(m.r, v, vd);
	  this.vec3.add(vd, m.p, vd);
	  return vd;
	};

	PMDModelView.prototype._skinning = function () {
	  var vd1 = this.vec3.create();
	  var vd2 = this.vec3.create();
	  for (var i = 0; i < this.pmd.vertexCount; i++) {
	    var v = this.pmd.vertices[i];
	    var bw = v.boneWeight;

	    var b1Num = v.boneIndices[0];
	    var b1 = this.pmd.bones[b1Num];
	    var m1 = this._getBoneMotion(b1Num);
	    var v1 = this.posFromBone1[i];
	    this.quat4.multiplyVec3(m1.r, v1, vd1);
	    this.vec3.add(vd1, m1.p, vd1);

	    var index = i * this._V_ITEM_SIZE;
	    if (bw >= 99) {
	      this.vArray[index + 0] = vd1[0];
	      this.vArray[index + 1] = vd1[1];
	      this.vArray[index + 2] = vd1[2];
	    } else {
	      var b2Num = v.boneIndices[1];
	      var b2 = this.pmd.bones[b2Num];
	      var m2 = this._getBoneMotion(b2Num);
	      var v2 = this.posFromBone2[i];
	      this.quat4.multiplyVec3(m2.r, v2, vd2);
	      this.vec3.add(vd2, m2.p, vd2);

	      var bw1 = v.boneWeightFloat1;
	      var bw2 = v.boneWeightFloat2;
	      this.vArray[index + 0] = vd1[0] * bw1 + vd2[0] * bw2;
	      this.vArray[index + 1] = vd1[1] * bw1 + vd2[1] * bw2;
	      this.vArray[index + 2] = vd1[2] * bw1 + vd2[2] * bw2;
	    }
	  }

	  this.layer.pourArrayBuffer(this.vBuffer, this.vArray, this._V_ITEM_SIZE, this.pmd.vertexCount);
	};

	PMDModelView.prototype._pourArrays = function () {
	  var layer = this.layer;
	  layer.pourArrayBuffer(this.vBuffer, this.vArray, this._V_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourArrayBuffer(this.vBuffer1, this.vArray1, this._V_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourArrayBuffer(this.vBuffer2, this.vArray2, this._V_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourArrayBuffer(this.vmBuffer, this.vmArray, this._V_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourArrayBuffer(this.cBuffer, this.cArray, this._C_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourElementArrayBuffer(this.iBuffer, this.iArray, this._I_ITEM_SIZE, this.pmd.vertexIndexCount);
	  layer.pourArrayBuffer(this.bwBuffer, this.bwArray, this._BW_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourArrayBuffer(this.biBuffer, this.biArray, this._BI_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourArrayBuffer(this.vnBuffer, this.vnArray, this._VN_ITEM_SIZE, this.pmd.vertexCount);
	  layer.pourArrayBuffer(this.veBuffer, this.veArray, this._VE_ITEM_SIZE, this.pmd.vertexCount);
	};

	/**
	 * TODO: remove shader specific attribute names from this class.
	 */
	PMDModelView.prototype._bindBuffers = function () {
	  var layer = this.layer;
	  var gl = this.layer.gl;
	  var shader = this.layer.shader;

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
	  gl.enableVertexAttribArray(shader.vertexPositionAttribute);
	  gl.vertexAttribPointer(shader.vertexPositionAttribute, this.vBuffer.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer1);
	  gl.enableVertexAttribArray(shader.vertexPositionAttribute1);
	  gl.vertexAttribPointer(shader.vertexPositionAttribute1, this.vBuffer1.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer2);
	  gl.enableVertexAttribArray(shader.vertexPositionAttribute2);
	  gl.vertexAttribPointer(shader.vertexPositionAttribute2, this.vBuffer2.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.vmBuffer);
	  gl.enableVertexAttribArray(shader.vertexMorphAttribute);
	  gl.vertexAttribPointer(shader.vertexMorphAttribute, this.vmBuffer.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.cBuffer);
	  gl.enableVertexAttribArray(shader.textureCoordAttribute);
	  gl.vertexAttribPointer(shader.textureCoordAttribute, this.cBuffer.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.bwBuffer);
	  gl.enableVertexAttribArray(shader.boneWeightAttribute);
	  gl.vertexAttribPointer(shader.boneWeightAttribute, this.bwBuffer.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.biBuffer);
	  gl.enableVertexAttribArray(shader.boneIndicesAttribute);
	  gl.vertexAttribPointer(shader.boneIndicesAttribute, this.biBuffer.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.vnBuffer);
	  gl.enableVertexAttribArray(shader.vertexNormalAttribute);
	  gl.vertexAttribPointer(shader.vertexNormalAttribute, this.vnBuffer.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.veBuffer);
	  gl.enableVertexAttribArray(shader.vertexEdgeAttribute);
	  gl.vertexAttribPointer(shader.vertexEdgeAttribute, this.veBuffer.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.mtBuffer1);
	  gl.enableVertexAttribArray(shader.motionTranslationAttribute1);
	  gl.vertexAttribPointer(shader.motionTranslationAttribute1, this.mtBuffer1.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.mtBuffer2);
	  gl.enableVertexAttribArray(shader.motionTranslationAttribute2);
	  gl.vertexAttribPointer(shader.motionTranslationAttribute2, this.mtBuffer2.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.mrBuffer1);
	  gl.enableVertexAttribArray(shader.motionRotationAttribute1);
	  gl.vertexAttribPointer(shader.motionRotationAttribute1, this.mrBuffer1.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ARRAY_BUFFER, this.mrBuffer2);
	  gl.enableVertexAttribArray(shader.motionRotationAttribute2);
	  gl.vertexAttribPointer(shader.motionRotationAttribute2, this.mrBuffer2.itemSize, gl.FLOAT, false, 0, 0);

	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
	};

	PMDModelView.prototype._draw = function (texture, pos, num) {
	  this.layer.draw(texture, this.layer._BLEND_ALPHA, num, pos);
	};

	/**
	 * TODO: temporal
	 */
	PMDModelView.prototype.update = function (dframe) {
	  this._initMotions2();

	  if (this.dancing) {
	    this._moveBone(dframe);
	    if (this.view.morphType == this.view._MORPH_ON) {
	      this._moveFace();
	    }
	  }

	  for (var i = 0; i < this.pmd.boneCount; i++) {
	    this._getBoneMotion(i);
	  }

	  if (this.view.physicsType == this.view._PHYSICS_ON) this._runPhysics(dframe);

	  this._initMotionArrays();
	};

	/**
	 * TODO: temporal
	 * TODO: optimize
	 */
	PMDModelView.prototype.draw = function () {
	  var layer = this.layer;
	  var gl = this.layer.gl;
	  var shader = this.layer.shader;

	  this._bindBuffers();

	  // TODO: temporal
	  if (this.view.skinningType == this.view._SKINNING_GPU) {
	    gl.activeTexture(gl.TEXTURE1);
	    gl.bindTexture(gl.TEXTURE_2D, this.vtf);
	    gl.uniform1i(shader.uVTFUniform, 1);
	  } else {
	    gl.uniform1i(shader.uVTFUniform, 0);
	  }

	  gl.uniform1i(shader.edgeUniform, 0);
	  gl.enable(gl.BLEND);
	  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.DST_ALPHA);

	  var offset = 0;
	  for (var i = 0; i < this.pmd.materialCount; i++) {
	    var m = this.pmd.materials[i];

	    // TODO: temporal
	    if (m.edgeFlag) gl.uniform1i(shader.shadowUniform, 1);else gl.uniform1i(shader.shadowUniform, 0);

	    // TODO: temporal
	    if (this.view.edgeType == this.view._EDGE_ON && m.color[3] == 1.0) {
	      gl.enable(gl.CULL_FACE);
	      gl.cullFace(gl.FRONT);
	    } else {
	      gl.disable(gl.CULL_FACE);
	      gl.cullFace(gl.FRONT);
	    }

	    gl.uniform4fv(shader.diffuseColorUniform, m.color);
	    gl.uniform3fv(shader.ambientColorUniform, m.mirrorColor);
	    gl.uniform3fv(shader.specularColorUniform, m.specularColor);
	    gl.uniform1f(shader.shininessUniform, m.specularity);

	    // TODO: rename tune to toon
	    if (m.hasToon()) {
	      gl.activeTexture(gl.TEXTURE2);
	      gl.bindTexture(gl.TEXTURE_2D, this.toonTextures[m.tuneIndex]);
	      gl.uniform1i(shader.toonTextureUniform, 2);
	      gl.uniform1i(shader.useToonUniform, 1);
	    } else {
	      gl.uniform1i(shader.useToonUniform, 0);
	    }

	    if (this.view.sphereMapType == this.view._SPHERE_MAP_ON && m.hasSphereTexture()) {
	      gl.activeTexture(gl.TEXTURE3);
	      gl.bindTexture(gl.TEXTURE_2D, this.sphereTextures[i]);
	      gl.uniform1i(shader.sphereTextureUniform, 3);
	      gl.uniform1i(shader.useSphereMapUniform, 1);
	      if (m.isSphereMapAddition()) {
	        gl.uniform1i(shader.useSphereMapAdditionUniform, 1);
	      } else {
	        gl.uniform1i(shader.useSphereMapAdditionUniform, 0);
	      }
	    } else {
	      gl.uniform1i(shader.useSphereMapUniform, 0);
	    }

	    var num = this.pmd.materials[i].vertexCount;
	    this._draw(this.textures[i], offset, num); // textrue!!!!!  6=eye
	    offset += num;
	  }
	};

	PMDModelView.prototype.drawEdge = function () {
	  var layer = this.layer;
	  var gl = this.layer.gl;
	  var shader = this.layer.shader;

	  gl.uniform1i(shader.edgeUniform, 1);
	  gl.uniform1i(shader.useToonUniform, 0);
	  gl.cullFace(gl.BACK);
	  gl.disable(gl.BLEND);
	  gl.enable(gl.CULL_FACE);

	  // Note: attempt to call _draw() as less as possible
	  var offset = 0;
	  var num = 0;
	  var flag = false;
	  for (var i = 0; i < this.pmd.materialCount; i++) {
	    num += this.pmd.materials[i].vertexCount;
	    if (!this.pmd.materials[i].edgeFlag) {
	      if (flag) this._draw(this.textures[0], offset, num);
	      offset += num;
	      num = 0;
	      flag = false;
	    } else {
	      flag = true;
	    }
	  }
	  if (flag) this._draw(this.textures[0], offset, num);
	};

	PMDModelView.prototype.drawShadowMap = function () {
	  var layer = this.layer;
	  var gl = this.layer.gl;
	  var shader = this.layer.shader;

	  this._bindBuffers();

	  // TODO: temporal
	  if (this.view.skinningType == this.view._SKINNING_GPU) {
	    gl.activeTexture(gl.TEXTURE1);
	    gl.bindTexture(gl.TEXTURE_2D, this.vtf);
	    gl.uniform1i(shader.uVTFUniform, 1);
	  } else {
	    gl.uniform1i(shader.uVTFUniform, 0);
	  }

	  gl.uniform1i(shader.edgeUniform, 0);

	  gl.disable(gl.BLEND);
	  gl.disable(gl.CULL_FACE);
	  gl.cullFace(gl.FRONT);

	  this._draw(this.textures[0], 0, this.pmd.vertexIndexCount);
	};

	/**
	 * TODO: temporal
	 */
	PMDModelView.prototype._runPhysics = function (dframe) {
	  if (dframe == 1) this.physics.simulate(this.motions);else this.physics.simulateFrame(this.motions, dframe);
	};

	/**
	 * TODO: rename
	 */
	PMDModelView.prototype._loadFromVMD = function (dframe) {
	  this.vmd.loadMotion();

	  if (this.view.morphType == this.view._MORPH_ON) this.vmd.loadFace();

	  this.vmd.step(dframe);
	  this.frame += dframe;
	};

	/**
	 * TODO: temporal
	 * TODO: any ways to avoid update all morph Buffer?
	 */
	PMDModelView.prototype._moveFace = function () {
	  var done = false;
	  for (var i = 0; i < this.pmd.faceCount; i++) {
	    var f = this.vmd.getFace(this.pmd.faces[i]);
	    if (f.available) {
	      this._moveMorph(this.pmd.faces[i].id, f.weight);
	      done = true;
	    }
	  }

	  if (!done) return;

	  // !!!!!!
	  // this.layer.pourArrayBuffer(this.vmBuffer, this.vmArray,
	  //                            this._V_ITEM_SIZE, this.pmd.vertexCount);

	  var base = this.pmd.faces[0];
	  for (var i = 0; i < base.vertexCount; i++) {
	    var v = base.vertices[i];
	    var o = v.index * this._V_ITEM_SIZE;
	    this.vmArray[o + 0] = 0;
	    this.vmArray[o + 1] = 0;
	    this.vmArray[o + 2] = 0;
	  }
	};

	/**
	 * TODO: temporal
	 */
	PMDModelView.prototype._moveBone = function (dframe) {
	  this._loadFromVMD(dframe);

	  for (var i = 0; i < this.pmd.boneCount; i++) {
	    this._getBoneMotion(i);
	  }

	  if (this.view.ikType == this.view._IK_ON) this._resolveIK();
	};

	// TODO: move generic place
	_glMatrix095Min.vec3.clear = function (v) {
	  v[0] = 0;
	  v[1] = 0;
	  v[2] = 0;
	};

	_glMatrix095Min.quat4.clear = function (q) {
	  q[0] = 0;
	  q[1] = 0;
	  q[2] = 0;
	  q[3] = 1;
	};

	PMDModelView.prototype._getOriginalBoneMotion = function (bone) {
	  return this.dancing ? this.vmd.getBoneMotion(bone) : this.originalMotions[bone.name];
	};

	PMDModelView.prototype._getBoneMotion = function (index) {
	  var motion = this.motions[index];
	  if (!motion.done) {
	    this._resolveFK(motion, index);
	  }
	  return motion;
	};

	PMDModelView.prototype._resolveFK = function (motion, index) {
	  // TODO: temporal work around
	  var m = this._getOriginalBoneMotion(this.pmd.bones[index]);

	  var b = this.pmd.bones[index];

	  if (this.pmd.bones[index].parentIndex === 0xFFFF) {
	    this.vec3.add(b.position, m.location, motion.p);
	    this.vec3.add(motion.p, this.basePosition, motion.p);
	    this.quat4.set(m.rotation, motion.r);
	  } else {
	    var parentMotion = this._getBoneMotion(b.parentIndex);
	    var parentBone = this.pmd.bones[b.parentIndex];
	    this.quat4.multiply(parentMotion.r, m.rotation, motion.r);
	    this.vec3.subtract(b.position, parentBone.position, motion.p);
	    this.vec3.add(motion.p, m.location, motion.p);
	    this.quat4.multiplyVec3(parentMotion.r, motion.p, motion.p);
	    this.vec3.add(motion.p, parentMotion.p, motion.p);
	  }
	  motion.done = true;
	};

	/**
	 * copied from MMD.js so far
	 */
	PMDModelView.prototype._resolveIK = function () {
	  var axis = this.vec3.create();
	  var tbv = this.vec3.create();
	  var ikv = this.vec3.create();
	  var tmpQ = this.quat4.create();
	  var tmpR = this.quat4.create();

	  for (var i = 0; i < this.pmd.ikCount; i++) {
	    var ik = this.pmd.iks[i];
	    var ikb = this.pmd.bones[ik.index];
	    var tb = this.pmd.bones[ik.targetBoneIndex];
	    var tpb = this.pmd.bones[tb.parentIndex];
	    var ikm = this._getBoneMotion(ik.index);
	    var tbm = this._getBoneMotion(ik.targetBoneIndex);
	    var iterations = ik.iteration;
	    var chainLength = ik.chainLength;

	    this.vec3.subtract(tb.position, tpb.position, axis);
	    var minLength = 0.1 * this.vec3.length(axis);

	    for (var j = 0; j < iterations; j++) {
	      this.vec3.subtract(tbm.p, ikm.p, axis);
	      if (minLength > this.vec3.length(axis)) {
	        break;
	      }

	      for (var k = 0; k < chainLength; k++) {
	        var bn = ik.childBoneIndices[k];
	        var cb = this.pmd.bones[bn];
	        var cbm = this._getBoneMotion(bn);
	        tbm = this._getBoneMotion(ik.targetBoneIndex);

	        this.vec3.subtract(tbm.p, cbm.p, tbv);
	        this.vec3.subtract(ikm.p, cbm.p, ikv);
	        this.vec3.cross(tbv, ikv, axis);
	        var tbvl = this.vec3.length(tbv);
	        var ikvl = this.vec3.length(ikv);
	        var axisLen = this.vec3.length(axis);
	        var sinTheta = axisLen / ikvl / tbvl;

	        // Note: somehow tbm.p can be NaN and make sinTheta Nan.
	        // TODO: fix this problem because isNaN not so light function.
	        if (isNaN(sinTheta)) {
	          continue;
	        }

	        if (tbvl < minLength || ikvl < minLength || sinTheta < 0.001) continue;

	        var maxangle = (k + 1) * ik.limitation * 4;

	        var theta = this.Math.asin(sinTheta);
	        if (this.vec3.dot(tbv, ikv) < 0) {
	          theta = 3.141592653589793 - theta;
	        }
	        if (theta > maxangle) theta = maxangle;

	        this.vec3.scale(axis, this.Math.sin(theta / 2) / axisLen, axis);
	        this.vec3.set(axis, tmpQ);
	        tmpQ[3] = this.Math.cos(theta / 2);
	        var parentRotation = this._getBoneMotion(cb.parentIndex).r;
	        this.quat4.inverse(parentRotation, tmpR);
	        this.quat4.multiply(tmpR, tmpQ, tmpR);
	        this.quat4.multiply(tmpR, cbm.r, tmpR);

	        if (this.pmd.bones[bn].isKnee()) {
	          var c = tmpR[3] > 1.0 ? 1.0 : tmpR[3]; // Note: Not to be NaN
	          // TODO: is this negative x right?
	          this.quat4.set([-this.Math.sqrt(1 - c * c), 0, 0, c], tmpR);
	          this.quat4.inverse(cbm.r, tmpQ);
	          this.quat4.multiply(tmpR, tmpQ, tmpQ);
	          this.quat4.multiply(parentRotation, tmpQ, tmpQ);
	        }

	        this.quat4.normalize(tmpR, this.vmd.getBoneMotion(cb).rotation);
	        this.quat4.multiply(tmpQ, cbm.r, cbm.r);
	        this.motions[ik.targetBoneIndex].done = false;
	        for (var l = 0; l <= k; l++) {
	          this.motions[ik.childBoneIndices[l]].done = false;
	        }
	      }
	    }
	  }
	};

	/**
	 * TODO: temporal
	 */
	PMDModelView.prototype._moveMorph = function (index, weight) {
	  //  this._initVertexMorphs();

	  // TODO: temporal
	  if (index == 0) {
	    return;
	  }

	  var f = this.pmd.faces[index];
	  var base = this.pmd.faces[0];
	  for (var i = 0; i < f.vertexCount; i++) {
	    var v = base.vertices[f.vertices[i].index];
	    var o = v.index * this._V_ITEM_SIZE;
	    this.vmArray[o + 0] += f.vertices[i].position[0] * weight;
	    this.vmArray[o + 1] += f.vertices[i].position[1] * weight;
	    this.vmArray[o + 2] += f.vertices[i].position[2] * weight;
	  }
	};

	module.exports = PMDModelView;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _glMatrix095Min = __webpack_require__(5);

	/**
	 * TODO: refactoring
	 */
	function PMDView(layer) {
	  this.layer = layer;
	  this.modelViews = [];

	  this.vmd = null;
	  this.audio = null;

	  this.eye = [0, 0, 0];
	  this.center = [0, 0, 0];
	  this.up = [0, 1, 0];

	  this.cameraTranslation = [0, 0, 0];
	  this.cameraQuaternion = [0, 0, 0, 1];
	  this.cameraDistance = 0;

	  this.frame = 0;
	  this.dframe = 1;

	  this.camera = {};
	  this.camera.location = [0, 0, 0];
	  this.camera.rotation = [0, 0, 0];
	  this.length = 0;
	  this.angle = 0;

	  this.oldDate = null;
	  this.startDate = null;
	  this.audioStart = false;
	  this.dancing = false;
	  this.elapsedTime = 0.0;

	  this.skinningType = null;
	  this.lightingType = null;
	  this.ikType = null;
	  this.edgeType = null;
	  this.morphType = null;
	  this.sphereMapType = null;
	  this.shadowMappingType = null;
	  this.lightColor = [0, 0, 0];
	  this.runType = null;
	  this.stageType = null;
	  this.effectFlag = null;
	  this.audioType = null;
	  this.physicsType = null;

	  this.setLightingType(this._LIGHTING_ON);
	  this.setSkinningType(this._SKINNING_CPU_AND_GPU);
	  this.setIKType(this._IK_ON);
	  this.setMorphType(this._MORPH_ON);
	  this.setSphereMapType(this._SPHERE_MAP_ON);
	  this.setShadowMappingType(this._SHADOW_MAPPING_OFF);
	  this.setEdgeType(this._EDGE_ON);
	  this.setRunType(this._RUN_REALTIME_ORIENTED);
	  this.setStageType(this._STAGE_2);
	  this.setEffectFlag(this._EFFECT_OFF);
	  this.setAudioType(this._AUDIO_ON);
	  this.setPhysicsType(this._PHYSICS_ON);
	  this.setLightColor(1.0);
	};

	// Note: for reference
	PMDView.prototype.Math = Math;
	PMDView.prototype.vec3 = _glMatrix095Min.vec3;
	PMDView.prototype.quat4 = _glMatrix095Min.quat4;
	PMDView.prototype.mat4 = _glMatrix095Min.mat4;

	PMDView.prototype._FRAME_S = 1 / 60;
	PMDView.prototype._FRAME_MS = 1 / 60 * 1000;

	PMDView.prototype._PHYSICS_OFF = 0;
	PMDView.prototype._PHYSICS_ON = 1;
	PMDView.prototype._PHYSICS_WORKERS_ON = 2;

	// Note: these skinning@parameters must correspond to vertex shader.
	PMDView.prototype._SKINNING_CPU = 0;
	PMDView.prototype._SKINNING_GPU = 1;
	PMDView.prototype._SKINNING_CPU_AND_GPU = 2;

	// Note: these lighting parameters must correspond to vertex shader.
	PMDView.prototype._LIGHTING_OFF = 0;
	PMDView.prototype._LIGHTING_ON = 1;
	PMDView.prototype._LIGHTING_ON_WITH_TOON = 2;

	PMDView.prototype._IK_OFF = 0;
	PMDView.prototype._IK_ON = 1;

	PMDView.prototype._MORPH_OFF = 0;
	PMDView.prototype._MORPH_ON = 1;

	PMDView.prototype._SPHERE_MAP_OFF = 0;
	PMDView.prototype._SPHERE_MAP_ON = 1;

	PMDView.prototype._SHADOW_MAPPING_OFF = 0;
	PMDView.prototype._SHADOW_MAPPING_ON = 1;
	PMDView.prototype._SHADOW_MAPPING_ONLY = 2;

	PMDView.prototype._RUN_FRAME_ORIENTED = 0;
	PMDView.prototype._RUN_REALTIME_ORIENTED = 1;
	PMDView.prototype._RUN_AUDIO_ORIENTED = 2;

	PMDView.prototype._AUDIO_OFF = 0;
	PMDView.prototype._AUDIO_ON = 1;

	PMDView.prototype._EDGE_OFF = 0;
	PMDView.prototype._EDGE_ON = 1;

	PMDView.prototype._STAGE_OFF = 0;
	PMDView.prototype._STAGE_1 = 1;
	PMDView.prototype._STAGE_2 = 2;
	PMDView.prototype._STAGE_3 = 3;

	PMDView.prototype._EFFECT_OFF = 0x0;
	PMDView.prototype._EFFECT_BLUR = 0x1;
	PMDView.prototype._EFFECT_GAUSSIAN = 0x2;
	PMDView.prototype._EFFECT_DIFFUSION = 0x4;
	PMDView.prototype._EFFECT_DIVISION = 0x8;
	PMDView.prototype._EFFECT_LOW_RESO = 0x10;
	PMDView.prototype._EFFECT_FACE_MOSAIC = 0x20;

	PMDView._PHYSICS_OFF = PMDView.prototype._PHYSICS_OFF;
	PMDView._PHYSICS_ON = PMDView.prototype._PHYSICS_ON;
	PMDView._PHYSICS_WORKERS_ON = PMDView.prototype._PHYSICS_WORKERS_ON;

	PMDView._SKINNING_CPU = PMDView.prototype._SKINNING_CPU;
	PMDView._SKINNING_GPU = PMDView.prototype._SKINNING_GPU;
	PMDView._SKINNING_CPU_AND_GPU = PMDView.prototype._SKINNING_CPU_AND_GPU;

	PMDView._LIGHTING_OFF = PMDView.prototype._LIGHTING_OFF;
	PMDView._LIGHTING_ON = PMDView.prototype._LIGHTING_ON;
	PMDView._LIGHTING_ON_WITH_TOON = PMDView.prototype._LIGHTING_ON_WITH_TOON;

	PMDView._IK_OFF = PMDView.prototype._IK_OFF;
	PMDView._IK_ON = PMDView.prototype._IK_ON;

	PMDView._MORPH_OFF = PMDView.prototype._MORPH_OFF;
	PMDView._MORPH_ON = PMDView.prototype._MORPH_ON;

	PMDView._SPHERE_MAP_OFF = PMDView.prototype._SPHERE_MAP_OFF;
	PMDView._SPHERE_MAP_ON = PMDView.prototype._SPHERE_MAP_ON;

	PMDView._SHADOW_MAPPING_OFF = PMDView.prototype._SHADOW_MAPPING_OFF;
	PMDView._SHADOW_MAPPING_ON = PMDView.prototype._SHADOW_MAPPING_ON;
	PMDView._SHADOW_MAPPING_ONLY = PMDView.prototype._SHADOW_MAPPING_ONLY;

	PMDView._RUN_FRAME_ORIENTED = PMDView.prototype._RUN_FRAME_ORIENTED;
	PMDView._RUN_REALTIME_ORIENTED = PMDView.prototype._RUN_REALTIME_ORIENTED;
	PMDView._RUN_AUDIO_ORIENTED = PMDView.prototype._RUN_AUDIO_ORIENTED;

	PMDView._AUDIO_OFF = PMDView.prototype._AUDIO_OFF = 0;
	PMDView._AUDIO_ON = PMDView.prototype._AUDIO_ON = 1;

	PMDView._EDGE_OFF = PMDView.prototype._EDGE_OFF;
	PMDView._EDGE_ON = PMDView.prototype._EDGE_ON;

	PMDView._STAGE_OFF = PMDView.prototype._STAGE_OFF;
	PMDView._STAGE_1 = PMDView.prototype._STAGE_1;
	PMDView._STAGE_2 = PMDView.prototype._STAGE_2;
	PMDView._STAGE_3 = PMDView.prototype._STAGE_3;

	PMDView._EFFECT_OFF = PMDView.prototype._EFFECT_OFF;
	PMDView._EFFECT_BLUR = PMDView.prototype._EFFECT_BLUR;
	PMDView._EFFECT_GAUSSIAN = PMDView.prototype._EFFECT_GAUSSIAN;
	PMDView._EFFECT_DIFFUSION = PMDView.prototype._EFFECT_DIFFUSION;
	PMDView._EFFECT_DIVISION = PMDView.prototype._EFFECT_DIVISION;
	PMDView._EFFECT_LOW_RESO = PMDView.prototype._EFFECT_LOW_RESO;
	PMDView._EFFECT_FACE_MOSAIC = PMDView.prototype._EFFECT_FACE_MOSAIC;

	PMDView.prototype.addModelView = function (view) {
	  this.modelViews.push(view);
	};

	PMDView.prototype.getModelView = function (index) {
	  return this.modelViews[index];
	};

	PMDView.prototype.getModelNum = function () {
	  return this.modelViews.length;
	};

	PMDView.prototype.setup = function () {
	  for (var i = 0; i < this.modelViews.length; i++) {
	    this.modelViews[i].setup();
	  }
	  this.elapsedTime = 0.0;
	};

	PMDView.prototype.setVMD = function (vmd) {
	  this.vmd = vmd;
	  this.vmd.supply();
	};

	PMDView.prototype.setAudio = function (audio, offset) {
	  this.audio = {};
	  this.audio.audio = audio;
	  this.audio.offset = offset;
	};

	PMDView.prototype.startDance = function () {
	  this.vmd.setup(this.modelViews[0].pmd);
	  this.elapsedTime = 0.0;
	  this.dancing = true;
	  this.oldDate = null;
	  this.startDate = Date.now();

	  this.frame = 0;
	  this.dframe = 0;

	  for (var i = 0; i < this.modelViews.length; i++) {
	    this.modelViews[i].setVMD(this.vmd.clone());
	    this.modelViews[i].startDance();
	  }
	};

	PMDView.prototype.setEye = function (eye) {
	  for (var i = 0; i < this.eye.length; i++) {
	    this.eye[i] = eye[i];
	  }
	  this.center[0] = eye[0];
	  this.center[1] = eye[1];

	  this.resetCameraMove();
	};

	PMDView.prototype.setPhysicsType = function (type) {
	  this.physicsType = type;
	};

	PMDView.prototype.setSkinningType = function (type) {
	  this.skinningType = type;
	};

	PMDView.prototype.setLightingType = function (type) {
	  this.lightingType = type;
	};

	PMDView.prototype.setLightColor = function (color) {
	  this.lightColor[0] = color;
	  this.lightColor[1] = color;
	  this.lightColor[2] = color;
	};

	PMDView.prototype.setIKType = function (type) {
	  this.ikType = type;
	};

	PMDView.prototype.setMorphType = function (type) {
	  this.morphType = type;
	};

	PMDView.prototype.setSphereMapType = function (type) {
	  this.sphereMapType = type;
	};

	PMDView.prototype.setShadowMappingType = function (type) {
	  this.shadowMappingType = type;
	};

	PMDView.prototype.setRunType = function (type) {
	  this.runType = type;
	};

	PMDView.prototype.setStageType = function (type) {
	  this.stageType = type;
	};

	/**
	 * TODO: override so far
	 */
	PMDView.prototype.setEffectFlag = function (flag) {
	  this.effectFlag = flag;
	};

	PMDView.prototype.setAudioType = function (type) {
	  this.audioType = type;
	};

	PMDView.prototype.setEdgeType = function (type) {
	  this.edgeType = type;
	};

	PMDView.prototype.moveCameraQuaternion = function (q) {
	  this.quat4.multiply(this.cameraQuaternion, q, this.cameraQuaternion);
	};

	PMDView.prototype.moveCameraQuaternionByXY = function (dx, dy) {
	  dx = -dx;
	  dy = -dy;

	  var length = this.Math.sqrt(dx * dx + dy * dy);

	  if (length != 0.0) {
	    var radian = length * this.Math.PI;
	    var theta = this.Math.sin(radian) / length;
	    var q = this.quat4.create([dy * theta, dx * theta, 0.0, this.Math.cos(radian)]);
	    this.moveCameraQuaternion(q);
	    return true;
	  }
	  return false;
	};

	PMDView.prototype.moveCameraTranslation = function (dx, dy) {
	  dy = -dy;

	  this.cameraTranslation[0] += dx * 50;
	  this.cameraTranslation[1] += dy * 50;
	};

	PMDView.prototype.resetCameraMove = function () {
	  this.cameraDistance = 0;
	  this.cameraTranslation[0] = 0;
	  this.cameraTranslation[1] = 0;
	  this.cameraTranslation[2] = 0;
	  this.cameraQuaternion[0] = 0;
	  this.cameraQuaternion[1] = 0;
	  this.cameraQuaternion[2] = 0;
	  this.cameraQuaternion[3] = 1;
	};

	PMDView.prototype.moveCameraForward = function (d) {
	  if (d > 0) this.cameraDistance -= 25;
	  if (d < 0) this.cameraDistance += 25;

	  if (this.cameraDistance <= -100) this.cameraDistance = -99;
	};

	PMDView.prototype._getCalculatedCameraParams = function (eye, center, up) {
	  this.vec3.set(this.eye, eye);
	  this.vec3.set(this.center, center);
	  this.vec3.set(this.up, up);
	  this.quat4.multiplyVec3(this.cameraQuaternion, eye, eye);
	  this.quat4.multiplyVec3(this.cameraQuaternion, up, up);

	  var t = [0, 0, 0];
	  this.vec3.set(this.cameraTranslation, t);
	  this.quat4.multiplyVec3(this.cameraQuaternion, t, t);

	  this.vec3.add(eye, t, eye);
	  this.vec3.add(center, t, center);

	  var d = [0, 0, 0];
	  this.vec3.subtract(eye, center, d);
	  eye[0] += d[0] * this.cameraDistance * 0.01;
	  eye[1] += d[1] * this.cameraDistance * 0.01;
	  eye[2] += d[2] * this.cameraDistance * 0.01;
	};

	/**
	 * TODO: temporal
	 * TODO: optimize
	 */
	PMDView.prototype._calculateDframe = function () {
	  var newDate = Date.now();
	  if (this.runType == this._RUN_FRAME_ORIENTED) {
	    this.dframe = 1;
	    this.elapsedTime += this._FRAME_MS;
	  } else if (this.runType == this._RUN_REALTIME_ORIENTED || !this.dancing || this.audio === null) {
	    if (this.oldDate) {
	      var prevElapsedTime = this.elapsedTime;
	      var oldFrame = this.elapsedTime / this._FRAME_MS | 0;
	      this.elapsedTime += newDate - this.oldDate;
	      var newFrame = this.elapsedTime / this._FRAME_MS | 0;
	      var dframe = newFrame - oldFrame;
	      if (dframe <= 0) {
	        newDate = this.oldDate;
	        dframe = 0;
	        this.elapsedTime = prevElapsedTime;
	      }
	      this.dframe = dframe;
	    } else {
	      this.dframe = 0;
	    }
	  } else {
	    // TODO: temporal logic
	    if (this.audioStart) {
	      newDate = this.audio.audio.currentTime * 1000 + this.startDate + this.audio.offset * this._FRAME_MS;
	    }
	    if (this.oldDate) {
	      var prevElapsedTime = this.elapsedTime;
	      var oldFrame = this.elapsedTime / this._FRAME_MS | 0;
	      this.elapsedTime += newDate - this.oldDate;
	      var newFrame = this.elapsedTime / this._FRAME_MS | 0;
	      var dframe = newFrame - oldFrame;
	      if (dframe <= 0) {
	        newDate = this.oldDate;
	        dframe = 0;
	        this.elapsedTime = prevElapsedTime;
	      }
	      this.dframe = dframe;
	    } else {
	      this.dframe = 0;
	    }
	  }
	  this.oldDate = newDate;
	};

	/**
	 * TODO: temporal
	 * TODO: maybe better to avoid dom operation to improve the performance
	 */
	PMDView.prototype._controlAudio = function () {
	  if (!this.audio || this.audioStart || this.audioType == this._AUDIO_OFF) return;

	  if (!this.audio.offset || this.frame >= this.audio.offset) {
	    this.audio.audio.play();
	    if (this.audio.offset < 0) {
	      this.audio.audio.currentTime = -this.audio.offset * this._FRAME_S;
	    }
	    this.audioStart = true;
	  }
	};

	/**
	 * TODO: temporal
	 */
	PMDView.prototype.update = function () {
	  // 每个step !!!!
	  this._controlAudio();
	  this._calculateDframe(); // 物理?

	  if (this.dframe == 0) return;

	  if (this.dancing) {
	    this._loadFromVMD(this.dframe); // 物理?
	  }

	  for (var i = 0; i < this.modelViews.length; i++) {
	    this.modelViews[i].update(this.dframe); // 物理?
	  }
	};

	/**
	 * TODO: multiple post effect support.
	 * TODO: optimize
	 */
	PMDView.prototype.draw = function () {
	  if (this.dframe == 0) return;

	  var layer = this.layer;
	  var gl = layer.gl;
	  var shader = layer.shader;

	  // TODO: temmporal
	  var postEffect = this.effectFlag & this._EFFECT_BLUR ? layer.postEffects['blur'] : this.effectFlag & this._EFFECT_GAUSSIAN ? layer.postEffects['gaussian'] : this.effectFlag & this._EFFECT_DIFFUSION ? layer.postEffects['diffusion'] : this.effectFlag & this._EFFECT_DIVISION ? layer.postEffects['division'] : this.effectFlag & this._EFFECT_LOW_RESO ? layer.postEffects['low_reso'] : this.effectFlag & this._EFFECT_FACE_MOSAIC ? layer.postEffects['face_mosaic'] : null;

	  if (this.shadowMappingType != this._SHADOW_MAPPING_OFF) {
	    if (this.shadowMappingType == this._SHADOW_MAPPING_ONLY) {
	      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	      layer.viewport();
	      layer.perspective(layer.viewAngle);
	    } else {
	      gl.bindFramebuffer(gl.FRAMEBUFFER, layer.shadowFrameBuffer.f);
	      gl.viewport(0, 0, layer.shadowFrameBufferSize, layer.shadowFrameBufferSize);
	      this.mat4.perspective(layer.viewAngle, 1, layer.viewNear, layer.viewFar, layer.pMatrix);
	    }

	    layer.identity();
	    layer.lookAt(layer.lightPosition, layer.lightCenter, layer.lightUpDirection);
	    layer.registerLightMatrix();

	    gl.uniform1i(shader.shadowGenerationUniform, 1);
	    gl.uniform1i(shader.shadowTextureUniform, 0);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	    for (var i = 0; i < this.modelViews.length; i++) {
	      this.modelViews[i].drawShadowMap();
	    }
	    gl.flush();
	    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

	    gl.uniform1i(shader.shadowMappingUniform, 1);
	    gl.activeTexture(gl.TEXTURE4);
	    gl.bindTexture(gl.TEXTURE_2D, this.layer.shadowFrameBuffer.t);
	    gl.uniform1i(shader.shadowTextureUniform, 4);
	    gl.uniformMatrix4fv(shader.lightMatrixUniform, false, layer.lightMatrix);

	    if (this.shadowMappingType == this._SHADOW_MAPPING_ONLY) return;
	  } else {
	    gl.uniform1i(shader.shadowMappingUniform, 0);
	  }

	  this._setCamera();
	  this._setDrawParameters();

	  gl.uniform1i(shader.shadowGenerationUniform, 0);

	  var postShader = postEffect === null ? null : postEffect.shader;

	  if (this.effectFlag != this._EFFECT_OFF) {
	    postEffect.bindFrameBufferForScene();
	  } else {
	    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	  }

	  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	  for (var i = 0; i < this.modelViews.length; i++) {
	    this.modelViews[i].draw();
	    if (this.edgeType == this._EDGE_ON) {
	      this.modelViews[i].drawEdge();
	    }
	  }

	  if (this.stageType != this._STAGE_OFF) {
	    this._drawStage();
	    if (this.effectFlag == this._EFFECT_OFF) gl.useProgram(shader);
	  }
	  gl.flush();

	  if (this.effectFlag != this._EFFECT_OFF) {
	    gl.useProgram(postShader);
	    postShader.frame = this.frame;
	    postEffect.draw(this);
	    gl.useProgram(shader);
	  }
	};

	PMDView.prototype._setCamera = function () {
	  var layer = this.layer;
	  var gl = layer.gl;
	  var shader = layer.shader;

	  layer.viewport();

	  var angle = 60;
	  if (this.dancing && this.vmd.getCamera().available) {
	    angle = this.vmd.getCamera().angle;
	    this.vmd.getCalculatedCameraParams(this.eye, this.center, this.up);
	  }

	  layer.perspective(angle);
	  layer.identity();

	  var eye = [0, 0, 0];
	  var center = [0, 0, 0];
	  var up = [0, 0, 0];
	  this._getCalculatedCameraParams(eye, center, up);
	  layer.lookAt(eye, center, up);
	  //  layer.lookAt(this.eye, this.center, this.up);
	};

	PMDView.prototype._setDrawParameters = function () {
	  var layer = this.layer;
	  var gl = layer.gl;
	  var shader = layer.shader;

	  gl.uniform1i(shader.uSkinningTypeUniform, this.skinningType);
	  gl.uniform1i(shader.uLightingTypeUniform, this.lightingType);
	  gl.uniform3fv(shader.lightColorUniform, this.lightColor);

	  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	};

	/**
	 * TODO: temporal
	 * TODO: optimize
	 */
	PMDView.prototype._drawStage = function () {
	  var layer = this.layer;
	  var gl = this.layer.gl;
	  var stage = this.layer.stageShaders[this.stageType - 1];
	  var shader = stage.shader;

	  var cPos = [];
	  var lfPos = [];
	  var rfPos = [];
	  for (var i = 0; i < this.modelViews.length; i++) {
	    var v = this.modelViews[i];
	    cPos.push(v.skinningOneBone(v.pmd.centerBone));
	    lfPos.push(v.skinningOneBone(v.pmd.leftFootBone));
	    rfPos.push(v.skinningOneBone(v.pmd.rightFootBone));
	  }
	  cPos = [].concat.apply([], cPos);
	  lfPos = [].concat.apply([], lfPos);
	  rfPos = [].concat.apply([], rfPos);

	  var sFlag = false;
	  if (this.shadowMappingType == this._SHADOW_MAPPING_ON) {
	    sFlag = true;
	  }

	  stage.draw(this.frame, this.modelViews.length, cPos, lfPos, rfPos, sFlag, layer.lightMatrix);
	};

	/**
	 * TODO: rename
	 */
	PMDView.prototype._loadFromVMD = function (dframe) {
	  this.vmd.loadCamera();
	  this.vmd.loadLight();

	  this.vmd.step(dframe);
	  this.frame += dframe;
	};

	/**
	 * TODO: implement correctly
	 */
	PMDView.prototype._moveLight = function () {
	  var light = this.vmd.getLight();
	  if (!light.available) return;

	  this.layer.gl.uniform3fv(this.layer.shader.lightColorUniform, light.color);
	  this.layer.lightPosition = light.location;
	};

	module.exports = PMDView;

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Inherit = __webpack_require__(7);

	var _Inherit2 = _interopRequireDefault(_Inherit);

	var _Vmd = __webpack_require__(19);

	var _FileParser = __webpack_require__(20);

	var _FileParser2 = _interopRequireDefault(_FileParser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function VMDFileParser(buffer) {
	  this.parent = _FileParser2.default;
	  this.parent.call(this, buffer);
	};
	(0, _Inherit2.default)(VMDFileParser, _FileParser2.default);

	VMDFileParser.prototype._HEADER_STRUCTURE = {
	  magic: { type: 'char', isArray: true, size: 30 },
	  modelName: { type: 'char', isArray: true, size: 20 }
	};

	VMDFileParser.prototype._MOTIONS_STRUCTURE = {
	  count: { type: 'uint32' },
	  motions: { type: 'object', isArray: true, size: 'count' }
	};

	VMDFileParser.prototype._MOTION_STRUCTURE = {
	  boneName: { type: 'strings', isArray: true, size: 15 },
	  frameNum: { type: 'uint32' },
	  location: { type: 'float', isArray: true, size: 3 },
	  rotation: { type: 'float', isArray: true, size: 4 },
	  interpolation: { type: 'uint8', isArray: true, size: 64 }
	};

	VMDFileParser.prototype._FACES_STRUCTURE = {
	  count: { type: 'uint32' },
	  faces: { type: 'object', isArray: true, size: 'count' }
	};

	VMDFileParser.prototype._FACE_STRUCTURE = {
	  name: { type: 'strings', isArray: true, size: 15 },
	  frameNum: { type: 'uint32' },
	  weight: { type: 'float' }
	};

	VMDFileParser.prototype._CAMERAS_STRUCTURE = {
	  count: { type: 'uint32' },
	  cameras: { type: 'object', isArray: true, size: 'count' }
	};

	VMDFileParser.prototype._CAMERA_STRUCTURE = {
	  frameNum: { type: 'uint32' },
	  length: { type: 'float' },
	  location: { type: 'float', isArray: true, size: 3 },
	  rotation: { type: 'float', isArray: true, size: 3 },
	  interpolation: { type: 'uint8', isArray: true, size: 24 },
	  angle: { type: 'uint32' },
	  perspective: { type: 'uint8' }
	};

	VMDFileParser.prototype._LIGHTS_STRUCTURE = {
	  count: { type: 'uint32' },
	  lights: { type: 'object', isArray: true, size: 'count' }
	};

	VMDFileParser.prototype._LIGHT_STRUCTURE = {
	  frameNum: { type: 'uint32' },
	  color: { type: 'float', isArray: true, size: 3 },
	  location: { type: 'float', isArray: true, size: 3 }
	};

	VMDFileParser.prototype.parse = function () {
	  this.offset = 0;

	  var v = new _Vmd.VMD();
	  this._parseHeader(v);
	  this._parseMotions(v);
	  this._parseFaces(v);
	  this._parseCameras(v);
	  this._parseLights(v);

	  return v;
	};

	/**
	 * TODO: be more strict.
	 */
	VMDFileParser.prototype.valid = function () {
	  var tmp = this.offset;
	  this.offset = 0;

	  var v = new _Vmd.VMD();
	  this._parseHeader(v);

	  this.offset = tmp;

	  return v.valid();
	};

	VMDFileParser.prototype._parseHeader = function (v) {
	  var s = this._HEADER_STRUCTURE;
	  v.header = new _Vmd.VMDHeader();
	  this._parseObject(v.header, s);
	};

	VMDFileParser.prototype._parseMotions = function (v) {
	  var s = this._MOTIONS_STRUCTURE;
	  v.motionCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  v.motions.length = 0;
	  for (var i = 0; i < v.motionCount; i++) {
	    this._parseMotion(v, i);
	  }
	};

	VMDFileParser.prototype._parseMotion = function (v, n) {
	  var s = this._MOTION_STRUCTURE;
	  var m = new _Vmd.VMDMotion(n);
	  this._parseObject(m, s);
	  v.motions[n] = m;
	};

	VMDFileParser.prototype._parseFaces = function (v) {
	  var s = this._FACES_STRUCTURE;
	  v.faceCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  v.faces.length = 0;
	  for (var i = 0; i < v.faceCount; i++) {
	    this._parseFace(v, i);
	  }
	};

	VMDFileParser.prototype._parseFace = function (v, n) {
	  var s = this._FACE_STRUCTURE;
	  var f = new _Vmd.VMDFace(n);
	  this._parseObject(f, s);
	  v.faces[n] = f;
	};

	VMDFileParser.prototype._parseCameras = function (v) {
	  var s = this._CAMERAS_STRUCTURE;
	  v.cameraCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  v.cameras.length = 0;
	  for (var i = 0; i < v.cameraCount; i++) {
	    this._parseCamera(v, i);
	  }
	};

	VMDFileParser.prototype._parseCamera = function (v, n) {
	  var s = this._CAMERA_STRUCTURE;
	  var c = new _Vmd.VMDCamera(n);
	  this._parseObject(c, s);
	  v.cameras[n] = c;
	};

	VMDFileParser.prototype._parseLights = function (v) {
	  var s = this._LIGHTS_STRUCTURE;
	  v.lightCount = this._getValue(s.count, this.offset);
	  this.offset += this._sizeof(s.count);

	  v.lights.length = 0;
	  for (var i = 0; i < v.lightCount; i++) {
	    this._parseLight(v, i);
	  }
	};

	VMDFileParser.prototype._parseLight = function (v, n) {
	  var s = this._LIGHT_STRUCTURE;
	  var l = new _Vmd.VMDLight(n);
	  this._parseObject(l, s);
	  v.lights[n] = l;
	};

	module.exports = VMDFileParser;

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

	"use strict";

	var cross = function cross(a, b) {
	  // return [
	  //   '(' + String(a[1]) + '*' + String(b[2]) + '-' + String(a[2]) + '*' + String(b[1]) + ')',
	  //   '(' + String(a[2]) + '*' + String(b[0]) + '-' + String(a[0]) + '*' + String(b[2]) + ')',
	  //   '(' + String(a[0]) + '*' + String(b[1]) + '-' + String(a[1]) + '*' + String(b[0]) + ')',
	  // ];

	  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
	};

	// var mat = [1.299038052558899, 0, 0, 0, 0, 1.7320507764816284, 0, 0, 0, 0, 1.000100016593933, 1, 0, -17.320507049560547, 21.80219078063965, 22];
	var qtransform = function qtransform(v, q) {
	  // v + 2.0 * cross(cross(v, q.xyz) - q.w*v, q.xyz);
	  var res = arrayAdd(v, arrayMuti(cross(arrayMns(cross(v, [q[0], q[1], q[2]]), arrayMuti(v, q[3])), [q[0], q[1], q[2]]), 2));

	  return res;
	};

	var arrayAdd = function arrayAdd(a, b) {
	  // return ['(' + String(a[0]) + '+' + String(b[0]) + ')', '(' + String(a[1]) + '+' + String(b[1]) + ')', '(' + String(a[2] + '+' + b[2]) + ')'];
	  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
	  // return a.map((v, index) => {
	  //   return v + b[index];
	  // });
	};
	var arrayMns = function arrayMns(a, b) {
	  // return ['(' + String(a[0]) + '-' + String(b[0]) + ')', '(' + String(a[1]) + '-' + String(b[1]) + ')', '(' + String(a[2] + '-' + b[2]) + ')'];
	  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
	  // return a.map((v, index) => {
	  //   return v - b[index];
	  // });
	};

	var arrayMuti = function arrayMuti(a, b) {
	  // if (b.push) {
	  //     return ['(' + String(a[0]) + '*' + String(b[0]) + ')', '(' + String(a[1]) + '*' + String(b[1]) + ')', '(' + String(a[2] + '*' + b[2]) + ')'];
	  // }
	  // return ['(' + String(a[0]) + '*' + String(b) + ')', '(' + String(a[1]) + '*' + String(b) + ')', '(' + String(a[2] + '*' + b) + ')'];
	  if (b.length) {
	    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
	  }
	  return [a[0] * b, a[1] * b, a[2] * b];

	  // return a.map((v, index) => {
	  //   return v * (b.length ? b[index] : b);
	  // });
	};

	// mix only https://en.wikibooks.org/wiki/GLSL_Programming/Vector_and_Matrix_Operations
	var mix = function mix(a, b, wb) {
	  // a * (TYPE(1.0) - wb) + b * wb
	  return arrayAdd(arrayMuti(a, arrayMns([1, 1, 1], [wb, wb, wb])), arrayMuti(b, [wb, wb, wb]));
	};

	module.exports = {
	  cross: cross,
	  qtransform: qtransform,
	  arrayAdd: arrayAdd,
	  arrayMns: arrayMns,
	  arrayMuti: arrayMuti,
	  mix: mix
	};

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

	'use strict';

	/**
	 * @param {Integer} type bin->2, oct->8, degit->10, hex->16
	 * @param {Integer} num
	 * @param {Integer} figures
	 */
	function __toString(type, num, figure) {

	  var base = '';
	  var prefix = '';
	  var minus = '';

	  if (type == 8) prefix = '0';else if (type == 16) prefix = '0x';

	  for (var i = 0; i < figure; i++) {
	    base += '0';
	  }return prefix + (base + num.toString(type)).substr(-1 * figure);
	};

	module.exports = __toString;

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Based on mmd-viewer-js, Ammo.js
	                                                                                                                                                                                                                                                                   * - https://github.com/takahirox/mmd-viewer-js
	                                                                                                                                                                                                                                                                   * - https://github.com/kripken/ammo.js
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _Pmd = __webpack_require__(18);

	var _Pmd2 = _interopRequireDefault(_Pmd);

	var _PmdFileParser = __webpack_require__(62);

	var _PmdFileParser2 = _interopRequireDefault(_PmdFileParser);

	var _PmdModelView_easycanvas = __webpack_require__(63);

	var _PmdModelView_easycanvas2 = _interopRequireDefault(_PmdModelView_easycanvas);

	var _PmdView_easycanvas = __webpack_require__(64);

	var _PmdView_easycanvas2 = _interopRequireDefault(_PmdView_easycanvas);

	var _Vmd = __webpack_require__(19);

	var _Vmd2 = _interopRequireDefault(_Vmd);

	var _VmdFileParser = __webpack_require__(65);

	var _VmdFileParser2 = _interopRequireDefault(_VmdFileParser);

	var _Physics = __webpack_require__(17);

	var _Physics2 = _interopRequireDefault(_Physics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var err = function err(msg) {
	    console.error('[Easycanvas-webgl] ' + msg);
	};

	var pmdCache = {};
	var ProcessingFlag = 'processing';

	var __analyzePMD = function __analyzePMD(url, buffer, callback) {
	    var pfp = new _PmdFileParser2.default(buffer);

	    if (!pfp.valid()) {
	        err('PMD Parse Error.');
	        return;
	    }

	    var pmd = pfp.parse();
	    pmd.setup();

	    var vertices = pmd.vertices.map(function (a) {
	        return a.position;
	    }).join(',').split(',').map(function (a) {
	        return Number(a);
	    });
	    var normals = pmd.vertices.map(function (a) {
	        return a.normal;
	    }).join(',').split(',');
	    var textures = pmd.vertices.map(function (a) {
	        return a.uv;
	    }).join(',').split(',');
	    var indices = pmd.vertexIndices.map(function (a) {
	        return a.index;
	    });

	    var data = {
	        vertices: vertices,
	        normals: normals,
	        textures: textures,
	        indices: indices
	    };

	    pmd.$vertices = vertices;

	    pmdCache[url] = {
	        data: data,
	        pmd: pmd
	    };

	    callback(data, pmd);
	};

	var __analyzeVMD = function __analyzeVMD(buffers, callback) {
	    var vmds = [];
	    var vfps = [];
	    for (var i = 0; i < buffers.length; i++) {
	        vfps[i] = new _VmdFileParser2.default(buffers[i]);

	        if (!vfps[i].valid()) {
	            err('VMD Parse Error.');
	            return;
	        }

	        vmds[i] = vfps[i].parse();
	    }

	    var vmd = vmds[0];
	    var vfp = vfps[0];
	    // __vfp = vfps[0]; // for console debug.
	    // __vmd = vmds[0]; // for console debug.

	    for (var i = 1; i < buffers.length; i++) {
	        vmd.merge(vmds[i]);
	    }

	    // if(__selectedMotion.music) {
	    //   __loadMusicFile();
	    // } else {
	    callback({
	        start: function start(pmd, vertices) {
	            var p = new _Physics2.default(pmd);
	            var v = new _PmdView_easycanvas2.default();
	            var mv = new _PmdModelView_easycanvas2.default(null, pmd, v);
	            mv.setup(); // 
	            mv._initMotions();
	            v.setup();
	            v.addModelView(mv);

	            // TODO: has accessed pmdView
	            v.setVMD(vmd);
	            // pmdView.setEye(__selectedMotion.eye);
	            v.startDance();

	            var getVerticals = mv.getVerticals;

	            // window.getVerticals=getVerticals;

	            setInterval(function () {
	                v.update();
	                for (var _i = 0, l = vertices.length / 3; _i < l; _i++) {
	                    // 这块比较耗性能，需要修改
	                    var temp = getVerticals(_i);
	                    vertices[_i * 3 + 0] = temp[0];
	                    vertices[_i * 3 + 1] = temp[1];
	                    vertices[_i * 3 + 2] = temp[2];
	                }
	                vertices.$cacheBuffer = undefined;
	            }, 50);
	        }
	    });
	    // }
	};

	var loaderPMD = function loaderPMD(url, callback) {
	    var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    if (useCache) {
	        if (pmdCache[url]) {
	            if (pmdCache[url] === ProcessingFlag) {
	                setTimeout(function () {
	                    loaderPMD(url, callback);
	                }, 100);
	            } else {
	                callback(pmdCache[url].data, pmdCache[url].pmd);
	            }
	            return;
	        }
	        pmdCache[url] = ProcessingFlag;
	    }

	    var modelURL = url;

	    var request = new XMLHttpRequest();
	    request.responseType = 'arraybuffer';
	    request.onload = function () {
	        __analyzePMD(url, request.response, callback);
	    };
	    request.onerror = function (error) {
	        err('PMD File Loaded Error.');
	    };
	    request.open('GET', modelURL, true);
	    request.send(null);
	};

	var loaderVMD = function loaderVMD(urls, callback, index, buffers) {
	    // 这俩参数暂时没发现有多大用
	    index = index || 0;
	    buffers = buffers || [];

	    var url = urls.pop ? urls.length[index] : urls;

	    var request = new XMLHttpRequest();
	    request.responseType = 'arraybuffer';
	    request.onload = function () {
	        buffers.push(request.response);
	        // if (index + 1 >= urls.length) {
	        __analyzeVMD(buffers, callback);
	        // } else {
	        //     loaderVMD(urls, index+1, buffers);
	        // }
	    };
	    request.onerror = function (error) {
	        err('VMD File Loaded Error.');
	    };
	    request.open('GET', url, true);
	    request.send(null);
	};

	var classInit = function classInit(opt) {
	    if (!opt.webgl || !opt.webgl.pmd) {
	        return;
	    }

	    var pmdUrl = opt.webgl.pmd;
	    var imgPath = opt.webgl.imgPath;
	    var useCache = opt.webgl.cache !== false;
	    var sprite = this;

	    var vmdQueue = void 0;

	    loaderPMD(pmdUrl, function (data, pmd) {
	        sprite.webgl = {};

	        var vertices = data.vertices;
	        var normals = data.normals;
	        var textures = data.textures;
	        var indices = data.indices;

	        delete opt.webgl.pmd;
	        delete opt.webgl.imgPath;
	        delete opt.webgl.cache;

	        var lastCount = 0;

	        pmd.materials.forEach(function (mt, i) {
	            var currentIndices = pmdCache[pmdUrl]['currentIndices' + i] || indices.slice(lastCount, lastCount + mt.vertexCount);
	            pmdCache[pmdUrl]['currentIndices' + i] = currentIndices;

	            sprite.add({
	                name: mt.fileName,
	                // 这块如果属性是function的话assign过去会有坑，需要改成非function的再assign过去，todo
	                webgl: _extends(window.Easycanvas.webglShapes.custom({
	                    vertices: vertices,
	                    normals: normals,
	                    indices: currentIndices,
	                    textures: textures,
	                    img: mt.fileName ? imgPath + mt.fileName : undefined,
	                    colors: mt.fileName ? undefined : mt.color.map(function (num) {
	                        return num * 255;
	                    }).slice(0, 3) // mirrorColor
	                }), opt.webgl)
	            });
	            lastCount += mt.vertexCount;
	        });

	        sprite.vmdStart = function (vmdUrl) {
	            loaderVMD(vmdUrl, function (vmd) {
	                sprite.trigger('webgl-vmd-loaded');
	                vmd.start(pmd, sprite.children[0].webgl.vertices);
	            });
	        };

	        if (vmdQueue) {
	            sprite.vmdStart(vmdQueue);
	        }

	        sprite.trigger('webgl-pmd-loaded');
	    }, useCache);

	    sprite.vmdStart = function (vmdUrl) {
	        vmdQueue = vmdUrl;
	    };
	};

	var inBrowser = typeof window !== 'undefined';

	if (inBrowser && window.Easycanvas) {
	    Easycanvas.loaderPMD = loaderPMD;
	    Easycanvas.loaderVMD = loaderVMD;
	    Easycanvas.extend(classInit);
	} else {
	    module.exports = {
	        loaderPMD: loaderPMD,
	        loaderVMD: loaderVMD,
	        classInit: classInit
	    };
	}

/***/ })

/******/ })
});
;