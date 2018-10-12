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

	module.exports = __webpack_require__(88);


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FileLoader = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * @author mrdoob / http://mrdoob.com/
	                                                                                                                                                                                                                                                                   */

	var _Cache = __webpack_require__(60);

	var _LoadingManager = __webpack_require__(63);

	var loading = {};

	function FileLoader(manager) {

		this.manager = manager !== undefined ? manager : _LoadingManager.DefaultLoadingManager;
	}

	_extends(FileLoader.prototype, {

		load: function load(url, onLoad, onProgress, onError) {

			if (url === undefined) url = '';

			if (this.path !== undefined) url = this.path + url;

			url = this.manager.resolveURL(url);

			var scope = this;

			var cached = _Cache.Cache.get(url);

			if (cached !== undefined) {

				scope.manager.itemStart(url);

				setTimeout(function () {

					if (onLoad) onLoad(cached);

					scope.manager.itemEnd(url);
				}, 0);

				return cached;
			}

			// Check if request is duplicate

			if (loading[url] !== undefined) {

				loading[url].push({

					onLoad: onLoad,
					onProgress: onProgress,
					onError: onError

				});

				return;
			}

			// Check for data: URI
			var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
			var dataUriRegexResult = url.match(dataUriRegex);

			// Safari can not handle Data URIs through XMLHttpRequest so process manually
			if (dataUriRegexResult) {

				var mimeType = dataUriRegexResult[1];
				var isBase64 = !!dataUriRegexResult[2];
				var data = dataUriRegexResult[3];

				data = window.decodeURIComponent(data);

				if (isBase64) data = window.atob(data);

				try {

					var response;
					var responseType = (this.responseType || '').toLowerCase();

					switch (responseType) {

						case 'arraybuffer':
						case 'blob':

							var view = new Uint8Array(data.length);

							for (var i = 0; i < data.length; i++) {

								view[i] = data.charCodeAt(i);
							}

							if (responseType === 'blob') {

								response = new Blob([view.buffer], { type: mimeType });
							} else {

								response = view.buffer;
							}

							break;

						case 'document':

							var parser = new DOMParser();
							response = parser.parseFromString(data, mimeType);

							break;

						case 'json':

							response = JSON.parse(data);

							break;

						default:
							// 'text' or other

							response = data;

							break;

					}

					// Wait for next browser tick like standard XMLHttpRequest event dispatching does
					window.setTimeout(function () {

						if (onLoad) onLoad(response);

						scope.manager.itemEnd(url);
					}, 0);
				} catch (error) {

					// Wait for next browser tick like standard XMLHttpRequest event dispatching does
					window.setTimeout(function () {

						if (onError) onError(error);

						scope.manager.itemEnd(url);
						scope.manager.itemError(url);
					}, 0);
				}
			} else {

				// Initialise array for duplicate requests

				loading[url] = [];

				loading[url].push({

					onLoad: onLoad,
					onProgress: onProgress,
					onError: onError

				});

				var request = new XMLHttpRequest();

				request.open('GET', url, true);

				request.addEventListener('load', function (event) {

					var response = this.response;

					_Cache.Cache.add(url, response);

					var callbacks = loading[url];

					delete loading[url];

					if (this.status === 200 || this.status === 0) {

						// Some browsers return HTTP Status 0 when using non-http protocol
						// e.g. 'file://' or 'data://'. Handle as success.

						if (this.status === 0) console.warn('THREE.FileLoader: HTTP Status 0 received.');

						for (var i = 0, il = callbacks.length; i < il; i++) {

							var callback = callbacks[i];
							if (callback.onLoad) callback.onLoad(response);
						}

						scope.manager.itemEnd(url);
					} else {

						for (var i = 0, il = callbacks.length; i < il; i++) {

							var callback = callbacks[i];
							if (callback.onError) callback.onError(event);
						}

						scope.manager.itemEnd(url);
						scope.manager.itemError(url);
					}
				}, false);

				request.addEventListener('progress', function (event) {

					var callbacks = loading[url];

					for (var i = 0, il = callbacks.length; i < il; i++) {

						var callback = callbacks[i];
						if (callback.onProgress) callback.onProgress(event);
					}
				}, false);

				request.addEventListener('error', function (event) {

					var callbacks = loading[url];

					delete loading[url];

					for (var i = 0, il = callbacks.length; i < il; i++) {

						var callback = callbacks[i];
						if (callback.onError) callback.onError(event);
					}

					scope.manager.itemEnd(url);
					scope.manager.itemError(url);
				}, false);

				if (this.responseType !== undefined) request.responseType = this.responseType;
				if (this.withCredentials !== undefined) request.withCredentials = this.withCredentials;

				if (request.overrideMimeType) request.overrideMimeType(this.mimeType !== undefined ? this.mimeType : 'text/plain');

				for (var header in this.requestHeader) {

					request.setRequestHeader(header, this.requestHeader[header]);
				}

				request.send(null);
			}

			scope.manager.itemStart(url);

			return request;
		},

		setPath: function setPath(value) {

			this.path = value;
			return this;
		},

		setResponseType: function setResponseType(value) {

			this.responseType = value;
			return this;
		},

		setWithCredentials: function setWithCredentials(value) {

			this.withCredentials = value;
			return this;
		},

		setMimeType: function setMimeType(value) {

			this.mimeType = value;
			return this;
		},

		setRequestHeader: function setRequestHeader(value) {

			this.requestHeader = value;
			return this;
		}

	});

	exports.FileLoader = FileLoader;

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var Cache = {

		enabled: false,

		files: {},

		add: function add(key, file) {

			if (this.enabled === false) return;

			// console.log( 'THREE.Cache', 'Adding key:', key );

			this.files[key] = file;
		},

		get: function get(key) {

			if (this.enabled === false) return;

			// console.log( 'THREE.Cache', 'Checking key:', key );

			return this.files[key];
		},

		remove: function remove(key) {

			delete this.files[key];
		},

		clear: function clear() {

			this.files = {};
		}

	};

	exports.Cache = Cache;

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * Abstract base class of interpolants over parametric samples.
	 *
	 * The parameter domain is one dimensional, typically the time or a path
	 * along a curve defined by the data.
	 *
	 * The sample values can have any dimensionality and derived classes may
	 * apply special interpretations to the data.
	 *
	 * This class provides the interval seek in a Template Method, deferring
	 * the actual interpolation to derived classes.
	 *
	 * Time complexity is O(1) for linear access crossing at most two points
	 * and O(log N) for random access, where N is the number of positions.
	 *
	 * References:
	 *
	 * 		http://www.oodesign.com/template-method-pattern.html
	 *
	 * @author tschw
	 */

	function Interpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {

		this.parameterPositions = parameterPositions;
		this._cachedIndex = 0;

		this.resultBuffer = resultBuffer !== undefined ? resultBuffer : new sampleValues.constructor(sampleSize);
		this.sampleValues = sampleValues;
		this.valueSize = sampleSize;
	}

	_extends(Interpolant.prototype, {

		evaluate: function evaluate(t) {

			var pp = this.parameterPositions,
			    i1 = this._cachedIndex,
			    t1 = pp[i1],
			    t0 = pp[i1 - 1];

			validate_interval: {

				seek: {

					var right;

					linear_scan: {

						//- See http://jsperf.com/comparison-to-undefined/3
						//- slower code:
						//-
						//- 				if ( t >= t1 || t1 === undefined ) {
						forward_scan: if (!(t < t1)) {

							for (var giveUpAt = i1 + 2;;) {

								if (t1 === undefined) {

									if (t < t0) break forward_scan;

									// after end

									i1 = pp.length;
									this._cachedIndex = i1;
									return this.afterEnd_(i1 - 1, t, t0);
								}

								if (i1 === giveUpAt) break; // this loop

								t0 = t1;
								t1 = pp[++i1];

								if (t < t1) {

									// we have arrived at the sought interval
									break seek;
								}
							}

							// prepare binary search on the right side of the index
							right = pp.length;
							break linear_scan;
						}

						//- slower code:
						//-					if ( t < t0 || t0 === undefined ) {
						if (!(t >= t0)) {

							// looping?

							var t1global = pp[1];

							if (t < t1global) {

								i1 = 2; // + 1, using the scan for the details
								t0 = t1global;
							}

							// linear reverse scan

							for (var giveUpAt = i1 - 2;;) {

								if (t0 === undefined) {

									// before start

									this._cachedIndex = 0;
									return this.beforeStart_(0, t, t1);
								}

								if (i1 === giveUpAt) break; // this loop

								t1 = t0;
								t0 = pp[--i1 - 1];

								if (t >= t0) {

									// we have arrived at the sought interval
									break seek;
								}
							}

							// prepare binary search on the left side of the index
							right = i1;
							i1 = 0;
							break linear_scan;
						}

						// the interval is valid

						break validate_interval;
					} // linear scan

					// binary search

					while (i1 < right) {

						var mid = i1 + right >>> 1;

						if (t < pp[mid]) {

							right = mid;
						} else {

							i1 = mid + 1;
						}
					}

					t1 = pp[i1];
					t0 = pp[i1 - 1];

					// check boundary cases, again

					if (t0 === undefined) {

						this._cachedIndex = 0;
						return this.beforeStart_(0, t, t1);
					}

					if (t1 === undefined) {

						i1 = pp.length;
						this._cachedIndex = i1;
						return this.afterEnd_(i1 - 1, t0, t);
					}
				} // seek

				this._cachedIndex = i1;

				this.intervalChanged_(i1, t0, t1);
			} // validate_interval

			return this.interpolate_(i1, t0, t, t1);
		},

		settings: null, // optional, subclass-specific settings structure
		// Note: The indirection allows central control of many interpolants.

		// --- Protected interface

		DefaultSettings_: {},

		getSettings_: function getSettings_() {

			return this.settings || this.DefaultSettings_;
		},

		copySampleValue_: function copySampleValue_(index) {

			// copies a sample value to the result buffer

			var result = this.resultBuffer,
			    values = this.sampleValues,
			    stride = this.valueSize,
			    offset = index * stride;

			for (var i = 0; i !== stride; ++i) {

				result[i] = values[offset + i];
			}

			return result;
		},

		// Template methods for derived classes:

		interpolate_: function interpolate_() /* i1, t0, t, t1 */{

			throw new Error('call to abstract method');
			// implementations shall return this.resultBuffer
		},

		intervalChanged_: function intervalChanged_() /* i1, t0, t1 */{

			// empty

		}

	});

	//!\ DECLARE ALIAS AFTER assign prototype !
	_extends(Interpolant.prototype, {

		//( 0, t, t0 ), returns this.resultBuffer
		beforeStart_: Interpolant.prototype.copySampleValue_,

		//( N-1, tN-1, t ), returns this.resultBuffer
		afterEnd_: Interpolant.prototype.copySampleValue_

	});

	exports.Interpolant = Interpolant;

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @author Don McCurdy / https://www.donmccurdy.com
	 */

	var LoaderUtils = {

		decodeText: function decodeText(array) {

			if (typeof TextDecoder !== 'undefined') {

				return new TextDecoder().decode(array);
			}

			// Avoid the String.fromCharCode.apply(null, array) shortcut, which
			// throws a "maximum call stack size exceeded" error for large arrays.

			var s = '';

			for (var i = 0, il = array.length; i < il; i++) {

				// Implicitly assumes little-endian.
				s += String.fromCharCode(array[i]);
			}

			// Merges multi-byte utf-8 characters.
			return decodeURIComponent(escape(s));
		},

		extractUrlBase: function extractUrlBase(url) {

			var index = url.lastIndexOf('/');

			if (index === -1) return './';

			return url.substr(0, index + 1);
		}

	};

	exports.LoaderUtils = LoaderUtils;

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function LoadingManager(onLoad, onProgress, onError) {

		var scope = this;

		var isLoading = false;
		var itemsLoaded = 0;
		var itemsTotal = 0;
		var urlModifier = undefined;

		this.onStart = undefined;
		this.onLoad = onLoad;
		this.onProgress = onProgress;
		this.onError = onError;

		this.itemStart = function (url) {

			itemsTotal++;

			if (isLoading === false) {

				if (scope.onStart !== undefined) {

					scope.onStart(url, itemsLoaded, itemsTotal);
				}
			}

			isLoading = true;
		};

		this.itemEnd = function (url) {

			itemsLoaded++;

			if (scope.onProgress !== undefined) {

				scope.onProgress(url, itemsLoaded, itemsTotal);
			}

			if (itemsLoaded === itemsTotal) {

				isLoading = false;

				if (scope.onLoad !== undefined) {

					scope.onLoad();
				}
			}
		};

		this.itemError = function (url) {

			if (scope.onError !== undefined) {

				scope.onError(url);
			}
		};

		this.resolveURL = function (url) {

			if (urlModifier) {

				return urlModifier(url);
			}

			return url;
		};

		this.setURLModifier = function (transform) {

			urlModifier = transform;
			return this;
		};
	}

	var DefaultLoadingManager = new LoadingManager();

	exports.DefaultLoadingManager = DefaultLoadingManager;
	exports.LoadingManager = LoadingManager;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * MMD Loaders
	                                                                                                                                                                                                                                                                   * - Based on and modified from threejs loaders.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _FileLoader = __webpack_require__(25);

	var _LoaderUtils = __webpack_require__(62);

	var _Interpolant = __webpack_require__(61);

	// hacked the 'THREE' object
	var THREE = {
		FileLoader: _FileLoader.FileLoader,
		LoaderUtils: _LoaderUtils.LoaderUtils,
		Interpolant: _Interpolant.Interpolant
	};

	/**
	 * @author takahiro / https://github.com/takahirox
	 *
	 * Dependencies
	 *  - mmd-parser https://github.com/takahirox/mmd-parser
	 *  - THREE.TGALoader
	 *  - THREE.OutlineEffect
	 *
	 * MMDLoader creates Three.js Objects from MMD resources as
	 * PMD, PMX, VMD, and VPD files.
	 *
	 * PMD/PMX is a model data format, VMD is a motion data format
	 * VPD is a posing data format used in MMD(Miku Miku Dance).
	 *
	 * MMD official site
	 *  - http://www.geocities.jp/higuchuu4/index_e.htm
	 *
	 * PMD, VMD format (in Japanese)
	 *  - http://blog.goo.ne.jp/torisu_tetosuki/e/209ad341d3ece2b1b4df24abf619d6e4
	 *
	 * PMX format
	 *  - https://gist.github.com/felixjones/f8a06bd48f9da9a4539f
	 *
	 * TODO
	 *  - light motion in vmd support.
	 *  - SDEF support.
	 *  - uv/material/bone morphing support.
	 *  - more precise grant skinning support.
	 *  - shadow support.
	 */

	module.exports = function () {
		// THREE.MMDLoader = ( function () {

		/**
	  * @param {THREE.LoadingManager} manager
	  */
		function MMDLoader(manager) {

			this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;

			this.loader = new THREE.FileLoader(this.manager);

			this.parser = null; // lazy generation
			this.meshBuilder = new MeshBuilder(this.manager);
			this.animationBuilder = new AnimationBuilder();
		}

		MMDLoader.prototype = {

			constructor: MMDLoader,

			crossOrigin: undefined,

			/**
	   * @param {string} value
	   * @return {THREE.MMDLoader}
	   */
			setCrossOrigin: function setCrossOrigin(crossOrigin) {

				this.crossOrigin = crossOrigin;
				return this;
			},

			// Load MMD assets as Three.js Object

			/**
	   * Loads Model file (.pmd or .pmx) as a THREE.SkinnedMesh.
	   *
	   * @param {string} url - url to Model(.pmd or .pmx) file
	   * @param {function} onLoad
	   * @param {function} onProgress
	   * @param {function} onError
	   */
			load: function load(url, onLoad, onProgress, onError) {

				var parser = this._getParser();
				var builder = this.meshBuilder.setCrossOrigin(this.crossOrigin);

				var texturePath = THREE.LoaderUtils.extractUrlBase(url);
				var modelExtension = this._extractExtension(url).toLowerCase();

				// Should I detect by seeing header?
				if (modelExtension !== 'pmd' && modelExtension !== 'pmx') {

					if (onError) onError(new Error('THREE.MMDLoader: Unknown model file extension .' + modelExtension + '.'));

					return;
				}

				this[modelExtension === 'pmd' ? 'loadPMD' : 'loadPMX'](url, function (data) {

					onLoad(builder.build(data, texturePath, onProgress, onError));
				}, onProgress, onError);
			},

			/**
	   * Loads Motion file(s) (.vmd) as a THREE.AnimationClip.
	   * If two or more files are specified, they'll be merged.
	   *
	   * @param {string|Array<string>} url - url(s) to animation(.vmd) file(s)
	   * @param {THREE.SkinnedMesh|THREE.Camera} object - tracks will be fitting to this object
	   * @param {function} onLoad
	   * @param {function} onProgress
	   * @param {function} onError
	   */
			loadAnimation: function loadAnimation(url, object, onLoad, onProgress, onError) {

				var builder = this.animationBuilder;

				this.loadVMD(url, function (vmd) {

					onLoad(object.isCamera ? builder.buildCameraAnimation(vmd) : builder.build(vmd, object));
				}, onProgress, onError);
			},

			/**
	   * Loads mode file and motion file(s) as an object containing
	   * a THREE.SkinnedMesh and a THREE.AnimationClip.
	   * Tracks of THREE.AnimationClip are fitting to the model.
	   *
	   * @param {string} modelUrl - url to Model(.pmd or .pmx) file
	   * @param {string|Array{string}} vmdUrl - url(s) to animation(.vmd) file
	   * @param {function} onLoad
	   * @param {function} onProgress
	   * @param {function} onError
	   */
			loadWithAnimation: function loadWithAnimation(modelUrl, vmdUrl, onLoad, onProgress, onError) {

				var scope = this;

				this.load(modelUrl, function (mesh) {

					scope.loadAnimation(vmdUrl, mesh, function (animation) {

						onLoad({
							mesh: mesh,
							animation: animation
						});
					}, onProgress, onError);
				}, onProgress, onError);
			},

			// Load MMD assets as Object data parsed by MMDParser

			/**
	   * Loads .pmd file as an Object.
	   *
	   * @param {string} url - url to .pmd file
	   * @param {function} onLoad
	   * @param {function} onProgress
	   * @param {function} onError
	   */
			loadPMD: function loadPMD(url, onLoad, onProgress, onError) {

				var parser = this._getParser();

				this.loader.setMimeType(undefined).setResponseType('arraybuffer').load(url, function (buffer) {

					onLoad(parser.parsePmd(buffer, true));
				}, onProgress, onError);
			},

			/**
	   * Loads .pmx file as an Object.
	   *
	   * @param {string} url - url to .pmx file
	   * @param {function} onLoad
	   * @param {function} onProgress
	   * @param {function} onError
	   */
			loadPMX: function loadPMX(url, onLoad, onProgress, onError) {

				var parser = this._getParser();

				this.loader.setMimeType(undefined).setResponseType('arraybuffer').load(url, function (buffer) {

					onLoad(parser.parsePmx(buffer, true));
				}, onProgress, onError);
			},

			/**
	   * Loads .vmd file as an Object. If two or more files are specified
	   * they'll be merged.
	   *
	   * @param {string|Array<string>} url - url(s) to .vmd file(s)
	   * @param {function} onLoad
	   * @param {function} onProgress
	   * @param {function} onError
	   */
			loadVMD: function loadVMD(url, onLoad, onProgress, onError) {

				var urls = Array.isArray(url) ? url : [url];

				var vmds = [];
				var vmdNum = urls.length;

				var scope = this;
				var parser = this._getParser();

				this.loader.setMimeType(undefined).setResponseType('arraybuffer');

				for (var i = 0, il = urls.length; i < il; i++) {

					this.loader.load(urls[i], function (buffer) {

						vmds.push(parser.parseVmd(buffer, true));

						if (vmds.length === vmdNum) onLoad(parser.mergeVmds(vmds));
					}, onProgress, onError);
				}
			},

			/**
	   * Loads .vpd file as an Object.
	   *
	   * @param {string} url - url to .vpd file
	   * @param {boolean} isUnicode
	   * @param {function} onLoad
	   * @param {function} onProgress
	   * @param {function} onError
	   */
			loadVPD: function loadVPD(url, isUnicode, onLoad, onProgress, onError, params) {

				params = params || {};

				var parser = this._getParser();

				this.loader.setMimeType(isUnicode ? undefined : 'text/plain; charset=shift_jis').setResponseType('text').load(url, function (text) {

					onLoad(parser.parseVpd(text, true));
				}, onProgress, onError);
			},

			// private methods

			_extractExtension: function _extractExtension(url) {

				var index = url.lastIndexOf('.');
				return index < 0 ? '' : url.slice(index + 1);
			},

			_getParser: function _getParser() {

				if (this.parser === null) {

					if (typeof MMDParser === 'undefined') {

						throw new Error('THREE.MMDLoader: Import MMDParser https://github.com/takahirox/mmd-parser');
					}

					this.parser = new MMDParser.Parser();
				}

				return this.parser;
			}

		};

		// Utilities

		/*
	  * base64 encoded defalut toon textures toon00.bmp - toon10.bmp.
	  * We don't need to request external toon image files.
	  * This idea is from http://www20.atpages.jp/katwat/three.js_r58/examples/mytest37/mmd.three.js
	  */
		var DEFAULT_TOON_TEXTURES = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/bWiiMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh8aBHZBl14e8wAAAABJRU5ErkJggg==', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOUlEQVRYR+3WMREAMAwDsYY/yoDI7MLwIiP40+RJklfcCCBAgAABAgTqArfb/QMCCBAgQIAAgbbAB3z/e0F3js2cAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/B5ilMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh81dWyx0gFwKAAAAABJRU5ErkJggg==', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYR+3WoREAMAwDsWb/UQtCy9wxTOQJ/oQ8SXKKGwEECBAgQIBAXeDt7f4BAQQIECBAgEBb4AOz8Hzx7WLY4wAAAABJRU5ErkJggg==', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPUlEQVRYR+1XwW7CMAy1+f9fZOMysSEOEweEOPRNdm3HbdOyIhAcklPrOs/PLy9RygBALxzcCDQFmgJNgaZAU6Ap0BR4PwX8gsRMVLssMRH5HcpzJEaWL7EVg9F1IHRlyqQohgVr4FGUlUcMJSjcUlDw0zvjeun70cLWmneoyf7NgBTQSniBTQQSuJAZsOnnaczjIMb5hCiuHKxokCrJfVnrctyZL0PkJAJe1HMil4nxeyi3Ypfn1kX51jpPvo/JeCNC4PhVdHdJw2XjBR8brF8PEIhNVn12AgP7uHsTBguBn53MUZCqv7Lp07Pn5k1Ro+uWmUNn7D+M57rtk7aG0Vo73xyF/fbFf0bPJjDXngnGocDTdFhygZjwUQrMNrDcmZlQT50VJ/g/UwNyHpu778+yW+/ksOz/BFo54P4AsUXMfRq7XWsAAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACMElEQVRYR+2Xv4pTQRTGf2dubhLdICiii2KnYKHVolhauKWPoGAnNr6BD6CvIVaihYuI2i1ia0BY0MZGRHQXjZj/mSPnnskfNWiWZUlzJ5k7M2cm833nO5Mziej2DWWJRUoCpQKlAntSQCqgw39/iUWAGmh37jrRnVsKlgpiqmkoGVABA7E57fvY+pJDdgKqF6HzFCSADkDq+F6AHABtQ+UMVE5D7zXod7fFNhTEckTbj5XQgHzNN+5tQvc5NG7C6BNkp6D3EmpXHDR+dQAjFLchW3VS9rlw3JBh+B7ys5Cf9z0GW1C/7P32AyBAOAz1q4jGliIH3YPuBnSfQX4OGreTIgEYQb/pBDtPnEQ4CivXYPAWBk13oHrB54yA9QuSn2H4AcKRpEILDt0BUzj+RLR1V5EqjD66NPRBVpLcQwjHoHYJOhsQv6U4mnzmrIXJCFr4LDwm/xBUoboG9XX4cc9VKdYoSA2yk5NQLJaKDUjTBoveG3Z2TElTxwjNK4M3LEZgUdDdruvcXzKBpStgp2NPiWi3ks9ZXxIoFVi+AvHLdc9TqtjL3/aYjpPlrzOcEnK62Szhimdd7xX232zFDTgtxezOu3WNMRLjiKgjtOhHVMd1loynVHvOgjuIIJMaELEqhJAV/RCSLbWTcfPFakFgFlALTRRvx+ok6Hlp/Q+v3fmx90bMyUzaEAhmM3KvHlXTL5DxnbGf/1M8RNNACLL5MNtPxP/mypJAqcDSFfgFhpYqWUzhTEAAAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII='];

		// Builders. They build Three.js object from Object data parsed by MMDParser.

		/**
	  * @param {THREE.LoadingManager} manager
	  */
		function MeshBuilder(manager) {

			this.geometryBuilder = new GeometryBuilder();
			this.materialBuilder = new MaterialBuilder(manager);
		}

		MeshBuilder.prototype = {

			constructor: MeshBuilder,

			crossOrigin: undefined,

			/**
	   * @param {string} crossOrigin
	   * @return {MeshBuilder}
	   */
			setCrossOrigin: function setCrossOrigin(crossOrigin) {

				this.crossOrigin = crossOrigin;
				return this;
			},

			/**
	   * @param {Object} data - parsed PMD/PMX data
	   * @param {string} texturePath
	   * @param {function} onProgress
	   * @param {function} onError
	   * @return {THREE.SkinnedMesh}
	   */
			build: function build(data, texturePath, onProgress, onError) {

				var geometry = this.geometryBuilder.build(data);
				var material = this.materialBuilder.setCrossOrigin(this.crossOrigin).setTexturePath(texturePath).build(data, geometry, onProgress, onError);

				var mesh = new THREE.SkinnedMesh(geometry, material);

				// console.log( mesh ); // for console debug

				return mesh;
			}

		};

		//

		function GeometryBuilder() {}

		GeometryBuilder.prototype = {

			constructor: GeometryBuilder,

			/**
	   * @param {Object} data - parsed PMD/PMX data
	   * @return {THREE.BufferGeometry}
	   */
			build: function build(data) {

				// for geometry
				var positions = [];
				var uvs = [];
				var normals = [];

				var indices = [];

				var groups = [];

				var bones = [];
				var skinIndices = [];
				var skinWeights = [];

				var morphTargets = [];
				var morphPositions = [];

				var iks = [];
				var grants = [];

				var rigidBodies = [];
				var constraints = [];

				// for work
				var offset = 0;
				var boneTypeTable = {};

				// positions, normals, uvs, skinIndices, skinWeights

				for (var i = 0; i < data.metadata.vertexCount; i++) {

					var v = data.vertices[i];

					for (var j = 0, jl = v.position.length; j < jl; j++) {

						positions.push(v.position[j]);
					}

					for (var j = 0, jl = v.normal.length; j < jl; j++) {

						normals.push(v.normal[j]);
					}

					for (var j = 0, jl = v.uv.length; j < jl; j++) {

						uvs.push(v.uv[j]);
					}

					for (var j = 0; j < 4; j++) {

						skinIndices.push(v.skinIndices.length - 1 >= j ? v.skinIndices[j] : 0.0);
					}

					for (var j = 0; j < 4; j++) {

						skinWeights.push(v.skinWeights.length - 1 >= j ? v.skinWeights[j] : 0.0);
					}
				}

				// indices

				for (var i = 0; i < data.metadata.faceCount; i++) {

					var face = data.faces[i];

					for (var j = 0, jl = face.indices.length; j < jl; j++) {

						indices.push(face.indices[j]);
					}
				}

				// groups

				for (var i = 0; i < data.metadata.materialCount; i++) {

					var material = data.materials[i];

					groups.push({
						offset: offset * 3,
						count: material.faceCount * 3
					});

					offset += material.faceCount;
				}

				// bones

				for (var i = 0; i < data.metadata.rigidBodyCount; i++) {

					var body = data.rigidBodies[i];
					var value = boneTypeTable[body.boneIndex];

					// keeps greater number if already value is set without any special reasons
					value = value === undefined ? body.type : Math.max(body.type, value);

					boneTypeTable[body.boneIndex] = value;
				}

				for (var i = 0; i < data.metadata.boneCount; i++) {

					var boneData = data.bones[i];

					var bone = {
						parent: boneData.parentIndex,
						name: boneData.name,
						pos: boneData.position.slice(0, 3),
						rotq: [0, 0, 0, 1],
						scl: [1, 1, 1],
						rigidBodyType: boneTypeTable[i] !== undefined ? boneTypeTable[i] : -1
					};

					if (bone.parent !== -1) {

						bone.pos[0] -= data.bones[bone.parent].position[0];
						bone.pos[1] -= data.bones[bone.parent].position[1];
						bone.pos[2] -= data.bones[bone.parent].position[2];
					}

					bones.push(bone);
				}

				// iks

				// TODO: remove duplicated codes between PMD and PMX
				if (data.metadata.format === 'pmd') {

					for (var i = 0; i < data.metadata.ikCount; i++) {

						var ik = data.iks[i];

						var param = {
							target: ik.target,
							effector: ik.effector,
							iteration: ik.iteration,
							maxAngle: ik.maxAngle * 4,
							links: []
						};

						for (var j = 0, jl = ik.links.length; j < jl; j++) {

							var link = {};
							link.index = ik.links[j].index;
							link.enabled = true;

							if (data.bones[link.index].name.indexOf('ひざ') >= 0) {

								link.limitation = new THREE.Vector3(1.0, 0.0, 0.0);
							}

							param.links.push(link);
						}

						iks.push(param);
					}
				} else {

					for (var i = 0; i < data.metadata.boneCount; i++) {

						var ik = data.bones[i].ik;

						if (ik === undefined) continue;

						var param = {
							target: i,
							effector: ik.effector,
							iteration: ik.iteration,
							maxAngle: ik.maxAngle,
							links: []
						};

						for (var j = 0, jl = ik.links.length; j < jl; j++) {

							var link = {};
							link.index = ik.links[j].index;
							link.enabled = true;

							if (ik.links[j].angleLimitation === 1) {

								// Revert if rotationMin/Max doesn't work well
								// link.limitation = new THREE.Vector3( 1.0, 0.0, 0.0 );

								var rotationMin = ik.links[j].lowerLimitationAngle;
								var rotationMax = ik.links[j].upperLimitationAngle;

								// Convert Left to Right coordinate by myself because
								// MMDParser doesn't convert. It's a MMDParser's bug

								var tmp1 = -rotationMax[0];
								var tmp2 = -rotationMax[1];
								rotationMax[0] = -rotationMin[0];
								rotationMax[1] = -rotationMin[1];
								rotationMin[0] = tmp1;
								rotationMin[1] = tmp2;

								link.rotationMin = new THREE.Vector3().fromArray(rotationMin);
								link.rotationMax = new THREE.Vector3().fromArray(rotationMax);
							}

							param.links.push(link);
						}

						iks.push(param);
					}
				}

				// grants

				if (data.metadata.format === 'pmx') {

					for (var i = 0; i < data.metadata.boneCount; i++) {

						var boneData = data.bones[i];
						var grant = boneData.grant;

						if (grant === undefined) continue;

						var param = {
							index: i,
							parentIndex: grant.parentIndex,
							ratio: grant.ratio,
							isLocal: grant.isLocal,
							affectRotation: grant.affectRotation,
							affectPosition: grant.affectPosition,
							transformationClass: boneData.transformationClass
						};

						grants.push(param);
					}

					grants.sort(function (a, b) {

						return a.transformationClass - b.transformationClass;
					});
				}

				// morph

				function updateAttributes(attribute, morph, ratio) {

					for (var i = 0; i < morph.elementCount; i++) {

						var element = morph.elements[i];

						var index;

						if (data.metadata.format === 'pmd') {

							index = data.morphs[0].elements[element.index].index;
						} else {

							index = element.index;
						}

						attribute.array[index * 3 + 0] += element.position[0] * ratio;
						attribute.array[index * 3 + 1] += element.position[1] * ratio;
						attribute.array[index * 3 + 2] += element.position[2] * ratio;
					}
				}

				for (var i = 0; i < data.metadata.morphCount; i++) {

					var morph = data.morphs[i];
					var params = { name: morph.name };

					var attribute = new THREE.Float32BufferAttribute(data.metadata.vertexCount * 3, 3);
					attribute.name = morph.name;

					for (var j = 0; j < data.metadata.vertexCount * 3; j++) {

						attribute.array[j] = positions[j];
					}

					if (data.metadata.format === 'pmd') {

						if (i !== 0) {

							updateAttributes(attribute, morph, 1.0);
						}
					} else {

						if (morph.type === 0) {
							// group

							for (var j = 0; j < morph.elementCount; j++) {

								var morph2 = data.morphs[morph.elements[j].index];
								var ratio = morph.elements[j].ratio;

								if (morph2.type === 1) {

									updateAttributes(attribute, morph2, ratio);
								} else {

									// TODO: implement

								}
							}
						} else if (morph.type === 1) {
							// vertex

							updateAttributes(attribute, morph, 1.0);
						} else if (morph.type === 2) {// bone

							// TODO: implement

						} else if (morph.type === 3) {// uv

							// TODO: implement

						} else if (morph.type === 4) {// additional uv1

							// TODO: implement

						} else if (morph.type === 5) {// additional uv2

							// TODO: implement

						} else if (morph.type === 6) {// additional uv3

							// TODO: implement

						} else if (morph.type === 7) {// additional uv4

							// TODO: implement

						} else if (morph.type === 8) {// material

							// TODO: implement

						}
					}

					morphTargets.push(params);
					morphPositions.push(attribute);
				}

				// rigid bodies from rigidBodies field.

				for (var i = 0; i < data.metadata.rigidBodyCount; i++) {

					var rigidBody = data.rigidBodies[i];
					var params = {};

					for (var key in rigidBody) {

						params[key] = rigidBody[key];
					}

					/*
	     * RigidBody position parameter in PMX seems global position
	     * while the one in PMD seems offset from corresponding bone.
	     * So unify being offset.
	     */
					if (data.metadata.format === 'pmx') {

						if (params.boneIndex !== -1) {

							var bone = data.bones[params.boneIndex];
							params.position[0] -= bone.position[0];
							params.position[1] -= bone.position[1];
							params.position[2] -= bone.position[2];
						}
					}

					rigidBodies.push(params);
				}

				// constraints from constraints field.

				for (var i = 0; i < data.metadata.constraintCount; i++) {

					var constraint = data.constraints[i];
					var params = {};

					for (var key in constraint) {

						params[key] = constraint[key];
					}

					var bodyA = rigidBodies[params.rigidBodyIndex1];
					var bodyB = rigidBodies[params.rigidBodyIndex2];

					// Refer to http://www20.atpages.jp/katwat/wp/?p=4135
					if (bodyA.type !== 0 && bodyB.type === 2) {

						if (bodyA.boneIndex !== -1 && bodyB.boneIndex !== -1 && data.bones[bodyB.boneIndex].parentIndex === bodyA.boneIndex) {

							bodyB.type = 1;
						}
					}

					constraints.push(params);
				}

				// build BufferGeometry.

				var geometry = new THREE.BufferGeometry();

				geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
				geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
				geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
				geometry.addAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
				geometry.addAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
				geometry.setIndex(indices);

				for (var i = 0, il = groups.length; i < il; i++) {

					geometry.addGroup(groups[i].offset, groups[i].count, i);
				}

				geometry.bones = bones;

				geometry.morphTargets = morphTargets;
				geometry.morphAttributes.position = morphPositions;

				geometry.userData.MMD = {
					bones: bones,
					iks: iks,
					grants: grants,
					rigidBodies: rigidBodies,
					constraints: constraints,
					format: data.metadata.format
				};

				geometry.computeBoundingSphere();

				return geometry;
			}

		};

		//

		/**
	  * @param {THREE.LoadingManager} manager
	  */
		function MaterialBuilder(manager) {

			this.manager = manager;

			// hacked
			// this.textureLoader = new THREE.TextureLoader( this.manager );
			this.tgaLoader = null; // lazy generation
		}

		MaterialBuilder.prototype = {

			constructor: MaterialBuilder,

			crossOrigin: undefined,

			texturePath: undefined,

			/**
	   * @param {string} crossOrigin
	   * @return {MaterialBuilder}
	   */
			setCrossOrigin: function setCrossOrigin(crossOrigin) {

				this.crossOrigin = crossOrigin;
				return this;
			},

			/**
	   * @param {string} texturePath
	   * @return {MaterialBuilder}
	   */
			setTexturePath: function setTexturePath(texturePath) {

				this.texturePath = texturePath;
				return this;
			},

			/**
	   * @param {Object} data - parsed PMD/PMX data
	   * @param {THREE.BufferGeometry} geometry - some properties are dependend on geometry
	   * @param {function} onProgress
	   * @param {function} onError
	   * @return {Array<THREE.MeshToonMaterial>}
	   */
			build: function build(data, geometry, onProgress, onError) {

				var materials = [];

				var textures = {};

				this.textureLoader.setCrossOrigin(this.crossOrigin);

				// materials

				for (var i = 0; i < data.metadata.materialCount; i++) {

					var material = data.materials[i];

					var params = { userData: {} };

					if (material.name !== undefined) params.name = material.name;

					/*
	     * Color
	     *
	     * MMD         MeshToonMaterial
	     * diffuse  -  color
	     * specular -  specular
	     * ambient  -  emissive * a
	     *               (a = 1.0 without map texture or 0.2 with map texture)
	     *
	     * MeshToonMaterial doesn't have ambient. Set it to emissive instead.
	     * It'll be too bright if material has map texture so using coef 0.2.
	     */
					params.color = new THREE.Color().fromArray(material.diffuse);
					params.opacity = material.diffuse[3];
					params.specular = new THREE.Color().fromArray(material.specular);
					params.emissive = new THREE.Color().fromArray(material.ambient);
					params.shininess = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )
					params.transparent = params.opacity !== 1.0;

					// 

					params.skinning = geometry.bones.length > 0 ? true : false;
					params.morphTargets = geometry.morphTargets.length > 0 ? true : false;
					params.lights = true;
					params.fog = true;

					// blend

					params.blending = THREE.CustomBlending;
					params.blendSrc = THREE.SrcAlphaFactor;
					params.blendDst = THREE.OneMinusSrcAlphaFactor;
					params.blendSrcAlpha = THREE.SrcAlphaFactor;
					params.blendDstAlpha = THREE.DstAlphaFactor;

					// side

					if (data.metadata.format === 'pmx' && (material.flag & 0x1) === 1) {

						params.side = THREE.DoubleSide;
					} else {

						params.side = params.opacity === 1.0 ? THREE.FrontSide : THREE.DoubleSide;
					}

					if (data.metadata.format === 'pmd') {

						// map, envMap

						if (material.fileName) {

							var fileName = material.fileName;
							var fileNames = fileName.split('*');

							// fileNames[ 0 ]: mapFileName
							// fileNames[ 1 ]: envMapFileName( optional )

							params.map = this._loadTexture(fileNames[0], textures);

							if (fileNames.length > 1) {

								var extension = fileNames[1].slice(-4).toLowerCase();

								params.envMap = this._loadTexture(fileNames[1], textures, { sphericalReflectionMapping: true });

								params.combine = extension === '.sph' ? THREE.MultiplyOperation : THREE.AddOperation;
							}
						}

						// gradientMap

						var toonFileName = material.toonIndex === -1 ? 'toon00.bmp' : data.toonTextures[material.toonIndex].fileName;

						params.gradientMap = this._loadTexture(toonFileName, textures, {
							isToonTexture: true,
							isDefaultToonTexture: this._isDefaultToonTexture(toonFileName)
						});

						// parameters for OutlineEffect

						params.userData.outlineParameters = {
							thickness: material.edgeFlag === 1 ? 0.003 : 0.0,
							color: [0, 0, 0],
							alpha: 1.0,
							visible: material.edgeFlag === 1
						};
					} else {

						// map

						if (material.textureIndex !== -1) {

							params.map = this._loadTexture(data.textures[material.textureIndex], textures);
						}

						// envMap TODO: support m.envFlag === 3

						if (material.envTextureIndex !== -1 && (material.envFlag === 1 || material.envFlag == 2)) {

							params.envMap = this._loadTexture(data.textures[material.envTextureIndex], textures, { sphericalReflectionMapping: true });

							params.combine = material.envFlag === 1 ? THREE.MultiplyOperation : THREE.AddOperation;
						}

						// gradientMap

						var toonFileName, isDefaultToon;

						if (material.toonIndex === -1 || material.toonFlag !== 0) {

							toonFileName = 'toon' + ('0' + (material.toonIndex + 1)).slice(-2) + '.bmp';
							isDefaultToon = true;
						} else {

							toonFileName = data.textures[material.toonIndex];
							isDefaultToon = false;
						}

						params.gradientMap = this._loadTexture(toonFileName, textures, {
							isToonTexture: true,
							isDefaultToonTexture: isDefaultToon
						});

						// parameters for OutlineEffect
						params.userData.outlineParameters = {
							thickness: material.edgeSize / 300, // TODO: better calculation?
							color: material.edgeColor.slice(0, 3),
							alpha: material.edgeColor[3],
							visible: (material.flag & 0x10) !== 0 && material.edgeSize > 0.0
						};
					}

					if (params.map !== undefined) {

						if (!params.transparent) {

							this._checkImageTransparency(params.map, geometry, i);
						}

						params.emissive.multiplyScalar(0.2);
					}

					materials.push(new THREE.MeshToonMaterial(params));
				}

				if (data.metadata.format === 'pmx') {

					// set transparent true if alpha morph is defined.

					var checkAlphaMorph = function checkAlphaMorph(elements, materials) {

						for (var i = 0, il = elements.length; i < il; i++) {

							var element = elements[i];

							if (element.index === -1) continue;

							var material = materials[element.index];

							if (material.opacity !== element.diffuse[3]) {

								material.transparent = true;
							}
						}
					};

					for (var i = 0, il = data.morphs.length; i < il; i++) {

						var morph = data.morphs[i];
						var elements = morph.elements;

						if (morph.type === 0) {

							for (var j = 0, jl = elements.length; j < jl; j++) {

								var morph2 = data.morphs[elements[j].index];

								if (morph2.type !== 8) continue;

								checkAlphaMorph(morph2.elements, materials);
							}
						} else if (morph.type === 8) {

							checkAlphaMorph(elements, materials);
						}
					}
				}

				return materials;
			},

			// private methods

			_getTGALoader: function _getTGALoader() {

				if (this.tgaLoader === null) {

					if (THREE.TGALoader === undefined) {

						throw new Error('THREE.MMDLoader: Import THREE.TGALoader');
					}

					this.tgaLoader = new THREE.TGALoader(this.manager);
				}

				return this.tgaLoader;
			},

			_isDefaultToonTexture: function _isDefaultToonTexture(name) {

				if (name.length !== 10) return false;

				return (/toon(10|0[0-9])\.bmp/.test(name)
				);
			},

			_loadTexture: function _loadTexture(filePath, textures, params, onProgress, onError) {

				params = params || {};

				var scope = this;

				var fullPath;

				if (params.isDefaultToonTexture === true) {

					var index;

					try {

						index = parseInt(filePath.match('toon([0-9]{2})\.bmp$')[1]);
					} catch (e) {

						console.warn('THREE.MMDLoader: ' + filePath + ' seems like a ' + 'not right default texture path. Using toon00.bmp instead.');

						index = 0;
					}

					fullPath = DEFAULT_TOON_TEXTURES[index];
				} else {

					fullPath = this.texturePath + filePath;
				}

				if (textures[fullPath] !== undefined) return textures[fullPath];

				var loader = THREE.Loader.Handlers.get(fullPath);

				if (loader === null) {

					loader = filePath.slice(-4).toLowerCase() === '.tga' ? this._getTGALoader() : this.textureLoader;
				}

				var texture = loader.load(fullPath, function (t) {

					// MMD toon texture is Axis-Y oriented
					// but Three.js gradient map is Axis-X oriented.
					// So here replaces the toon texture image with the rotated one.
					if (params.isToonTexture === true) {

						t.image = scope._getRotatedImage(t.image);
					}

					t.flipY = false;
					t.wrapS = THREE.RepeatWrapping;
					t.wrapT = THREE.RepeatWrapping;

					for (var i = 0; i < texture.readyCallbacks.length; i++) {

						texture.readyCallbacks[i](texture);
					}

					delete texture.readyCallbacks;
				}, onProgress, onError);

				if (params.sphericalReflectionMapping === true) {

					texture.mapping = THREE.SphericalReflectionMapping;
				}

				texture.readyCallbacks = [];

				textures[fullPath] = texture;

				return texture;
			},

			_getRotatedImage: function _getRotatedImage(image) {

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');

				var width = image.width;
				var height = image.height;

				canvas.width = width;
				canvas.height = height;

				context.clearRect(0, 0, width, height);
				context.translate(width / 2.0, height / 2.0);
				context.rotate(0.5 * Math.PI); // 90.0 * Math.PI / 180.0
				context.translate(-width / 2.0, -height / 2.0);
				context.drawImage(image, 0, 0);

				return context.getImageData(0, 0, width, height);
			},

			// Check if the partial image area used by the texture is transparent.
			_checkImageTransparency: function _checkImageTransparency(map, geometry, groupIndex) {

				map.readyCallbacks.push(function (texture) {

					// Is there any efficient ways?
					function createImageData(image) {

						var canvas = document.createElement('canvas');
						canvas.width = image.width;
						canvas.height = image.height;

						var context = canvas.getContext('2d');
						context.drawImage(image, 0, 0);

						return context.getImageData(0, 0, canvas.width, canvas.height);
					}

					function detectImageTransparency(image, uvs, indices) {

						var width = image.width;
						var height = image.height;
						var data = image.data;
						var threshold = 253;

						if (data.length / (width * height) !== 4) return false;

						for (var i = 0; i < indices.length; i += 3) {

							var centerUV = { x: 0.0, y: 0.0 };

							for (var j = 0; j < 3; j++) {

								var index = indices[i * 3 + j];
								var uv = { x: uvs[index * 2 + 0], y: uvs[index * 2 + 1] };

								if (getAlphaByUv(image, uv) < threshold) return true;

								centerUV.x += uv.x;
								centerUV.y += uv.y;
							}

							centerUV.x /= 3;
							centerUV.y /= 3;

							if (getAlphaByUv(image, centerUV) < threshold) return true;
						}

						return false;
					}

					/*
	     * This method expects
	     *   texture.flipY = false
	     *   texture.wrapS = THREE.RepeatWrapping
	     *   texture.wrapT = THREE.RepeatWrapping
	     * TODO: more precise
	     */
					function getAlphaByUv(image, uv) {

						var width = image.width;
						var height = image.height;

						var x = Math.round(uv.x * width) % width;
						var y = Math.round(uv.y * height) % height;

						if (x < 0) x += width;
						if (y < 0) y += height;

						var index = y * width + x;

						return image.data[index * 4 + 3];
					}

					var imageData = texture.image.data !== undefined ? texture.image : createImageData(texture.image);

					var group = geometry.groups[groupIndex];

					if (detectImageTransparency(imageData, geometry.attributes.uv.array, geometry.index.array.slice(group.start, group.start + group.count))) {

						map.transparent = true;
					}
				});
			}

		};

		//

		function AnimationBuilder() {}

		AnimationBuilder.prototype = {

			constructor: AnimationBuilder,

			/**
	   * @param {Object} vmd - parsed VMD data
	   * @param {THREE.SkinnedMesh} mesh - tracks will be fitting to mesh
	   * @return {THREE.AnimationClip}
	   */
			build: function build(vmd, mesh) {

				// combine skeletal and morph animations

				var tracks = this.buildSkeletalAnimation(vmd, mesh).tracks;
				var tracks2 = this.buildMorphAnimation(vmd, mesh).tracks;

				for (var i = 0, il = tracks2.length; i < il; i++) {

					tracks.push(tracks2[i]);
				}

				return new THREE.AnimationClip('', -1, tracks);
			},

			/**
	   * @param {Object} vmd - parsed VMD data
	   * @param {THREE.SkinnedMesh} mesh - tracks will be fitting to mesh
	   * @return {THREE.AnimationClip}
	   */
			buildSkeletalAnimation: function buildSkeletalAnimation(vmd, mesh) {

				function pushInterpolation(array, interpolation, index) {

					array.push(interpolation[index + 0] / 127); // x1
					array.push(interpolation[index + 8] / 127); // x2
					array.push(interpolation[index + 4] / 127); // y1
					array.push(interpolation[index + 12] / 127); // y2
				};

				var tracks = [];

				var motions = {};
				var bones = mesh.skeleton.bones;
				var boneNameDictionary = {};

				for (var i = 0, il = bones.length; i < il; i++) {

					boneNameDictionary[bones[i].name] = true;
				}

				for (var i = 0; i < vmd.metadata.motionCount; i++) {

					var motion = vmd.motions[i];
					var boneName = motion.boneName;

					if (boneNameDictionary[boneName] === undefined) continue;

					motions[boneName] = motions[boneName] || [];
					motions[boneName].push(motion);
				}

				for (var key in motions) {

					var array = motions[key];

					array.sort(function (a, b) {

						return a.frameNum - b.frameNum;
					});

					var times = [];
					var positions = [];
					var rotations = [];
					var pInterpolations = [];
					var rInterpolations = [];

					var basePosition = mesh.skeleton.getBoneByName(key).position.toArray();

					for (var i = 0, il = array.length; i < il; i++) {

						var time = array[i].frameNum / 30;
						var position = array[i].position;
						var rotation = array[i].rotation;
						var interpolation = array[i].interpolation;

						times.push(time);

						for (var j = 0; j < 3; j++) {
							positions.push(basePosition[j] + position[j]);
						}for (var j = 0; j < 4; j++) {
							rotations.push(rotation[j]);
						}for (var j = 0; j < 3; j++) {
							pushInterpolation(pInterpolations, interpolation, j);
						}pushInterpolation(rInterpolations, interpolation, 3);
					}

					var targetName = '.bones[' + key + ']';

					tracks.push(this._createTrack(targetName + '.position', THREE.VectorKeyframeTrack, times, positions, pInterpolations));
					tracks.push(this._createTrack(targetName + '.quaternion', THREE.QuaternionKeyframeTrack, times, rotations, rInterpolations));
				}

				return new THREE.AnimationClip('', -1, tracks);
			},

			/**
	   * @param {Object} vmd - parsed VMD data
	   * @param {THREE.SkinnedMesh} mesh - tracks will be fitting to mesh
	   * @return {THREE.AnimationClip}
	   */
			buildMorphAnimation: function buildMorphAnimation(vmd, mesh) {

				var tracks = [];

				var morphs = {};
				var morphTargetDictionary = mesh.morphTargetDictionary;

				for (var i = 0; i < vmd.metadata.morphCount; i++) {

					var morph = vmd.morphs[i];
					var morphName = morph.morphName;

					if (morphTargetDictionary[morphName] === undefined) continue;

					morphs[morphName] = morphs[morphName] || [];
					morphs[morphName].push(morph);
				}

				for (var key in morphs) {

					var array = morphs[key];

					array.sort(function (a, b) {

						return a.frameNum - b.frameNum;
					});

					var times = [];
					var values = [];

					for (var i = 0, il = array.length; i < il; i++) {

						times.push(array[i].frameNum / 30);
						values.push(array[i].weight);
					}

					tracks.push(new THREE.NumberKeyframeTrack('.morphTargetInfluences[' + morphTargetDictionary[key] + ']', times, values));
				}

				return new THREE.AnimationClip('', -1, tracks);
			},

			/**
	   * @param {Object} vmd - parsed VMD data
	   * @return {THREE.AnimationClip}
	   */
			buildCameraAnimation: function buildCameraAnimation(vmd) {

				function pushVector3(array, vec) {

					array.push(vec.x);
					array.push(vec.y);
					array.push(vec.z);
				}

				function pushQuaternion(array, q) {

					array.push(q.x);
					array.push(q.y);
					array.push(q.z);
					array.push(q.w);
				}

				function pushInterpolation(array, interpolation, index) {

					array.push(interpolation[index * 4 + 0] / 127); // x1
					array.push(interpolation[index * 4 + 1] / 127); // x2
					array.push(interpolation[index * 4 + 2] / 127); // y1
					array.push(interpolation[index * 4 + 3] / 127); // y2
				};

				var tracks = [];

				var cameras = vmd.cameras === undefined ? [] : vmd.cameras.slice();

				cameras.sort(function (a, b) {

					return a.frameNum - b.frameNum;
				});

				var times = [];
				var centers = [];
				var quaternions = [];
				var positions = [];
				var fovs = [];

				var cInterpolations = [];
				var qInterpolations = [];
				var pInterpolations = [];
				var fInterpolations = [];

				var quaternion = new THREE.Quaternion();
				var euler = new THREE.Euler();
				var position = new THREE.Vector3();
				var center = new THREE.Vector3();

				for (var i = 0, il = cameras.length; i < il; i++) {

					var motion = cameras[i];

					var time = motion.frameNum / 30;
					var pos = motion.position;
					var rot = motion.rotation;
					var distance = motion.distance;
					var fov = motion.fov;
					var interpolation = motion.interpolation;

					times.push(time);

					position.set(0, 0, -distance);
					center.set(pos[0], pos[1], pos[2]);

					euler.set(-rot[0], -rot[1], -rot[2]);
					quaternion.setFromEuler(euler);

					position.add(center);
					position.applyQuaternion(quaternion);

					pushVector3(centers, center);
					pushQuaternion(quaternions, quaternion);
					pushVector3(positions, position);

					fovs.push(fov);

					for (var j = 0; j < 3; j++) {

						pushInterpolation(cInterpolations, interpolation, j);
					}

					pushInterpolation(qInterpolations, interpolation, 3);

					// use the same parameter for x, y, z axis.
					for (var j = 0; j < 3; j++) {

						pushInterpolation(pInterpolations, interpolation, 4);
					}

					pushInterpolation(fInterpolations, interpolation, 5);
				}

				var tracks = [];

				// I expect an object whose name 'target' exists under THREE.Camera
				tracks.push(this._createTrack('target.position', THREE.VectorKeyframeTrack, times, centers, cInterpolations));

				tracks.push(this._createTrack('.quaternion', THREE.QuaternionKeyframeTrack, times, quaternions, qInterpolations));
				tracks.push(this._createTrack('.position', THREE.VectorKeyframeTrack, times, positions, pInterpolations));
				tracks.push(this._createTrack('.fov', THREE.NumberKeyframeTrack, times, fovs, fInterpolations));

				return new THREE.AnimationClip('', -1, tracks);
			},

			// private method

			_createTrack: function _createTrack(node, typedKeyframeTrack, times, values, interpolations) {

				/*
	    * optimizes here not to let KeyframeTrackPrototype optimize
	    * because KeyframeTrackPrototype optimizes times and values but
	    * doesn't optimize interpolations.
	    */
				if (times.length > 2) {

					times = times.slice();
					values = values.slice();
					interpolations = interpolations.slice();

					var stride = values.length / times.length;
					var interpolateStride = interpolations.length / times.length;

					var index = 1;

					for (var aheadIndex = 2, endIndex = times.length; aheadIndex < endIndex; aheadIndex++) {

						for (var i = 0; i < stride; i++) {

							if (values[index * stride + i] !== values[(index - 1) * stride + i] || values[index * stride + i] !== values[aheadIndex * stride + i]) {

								index++;
								break;
							}
						}

						if (aheadIndex > index) {

							times[index] = times[aheadIndex];

							for (var i = 0; i < stride; i++) {

								values[index * stride + i] = values[aheadIndex * stride + i];
							}

							for (var i = 0; i < interpolateStride; i++) {

								interpolations[index * interpolateStride + i] = interpolations[aheadIndex * interpolateStride + i];
							}
						}
					}

					times.length = index + 1;
					values.length = (index + 1) * stride;
					interpolations.length = (index + 1) * interpolateStride;
				}

				var track = new typedKeyframeTrack(node, times, values);

				track.createInterpolant = function InterpolantFactoryMethodCubicBezier(result) {

					return new CubicBezierInterpolation(this.times, this.values, this.getValueSize(), result, new Float32Array(interpolations));
				};

				return track;
			}

		};

		// interpolation

		function CubicBezierInterpolation(parameterPositions, sampleValues, sampleSize, resultBuffer, params) {

			THREE.Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);

			this.interpolationParams = params;
		}

		CubicBezierInterpolation.prototype = _extends(Object.create(THREE.Interpolant.prototype), {

			constructor: CubicBezierInterpolation,

			interpolate_: function interpolate_(i1, t0, t, t1) {

				var result = this.resultBuffer;
				var values = this.sampleValues;
				var stride = this.valueSize;
				var params = this.interpolationParams;

				var offset1 = i1 * stride;
				var offset0 = offset1 - stride;

				// No interpolation if next key frame is in one frame in 30fps.
				// This is from MMD animation spec.
				// '1.5' is for precision loss. times are Float32 in Three.js Animation system.
				var weight1 = t1 - t0 < 1 / 30 * 1.5 ? 0.0 : (t - t0) / (t1 - t0);

				if (stride === 4) {
					// Quaternion

					var x1 = params[i1 * 4 + 0];
					var x2 = params[i1 * 4 + 1];
					var y1 = params[i1 * 4 + 2];
					var y2 = params[i1 * 4 + 3];

					var ratio = this._calculate(x1, x2, y1, y2, weight1);

					THREE.Quaternion.slerpFlat(result, 0, values, offset0, values, offset1, ratio);
				} else if (stride === 3) {
					// Vector3

					for (var i = 0; i !== stride; ++i) {

						var x1 = params[i1 * 12 + i * 4 + 0];
						var x2 = params[i1 * 12 + i * 4 + 1];
						var y1 = params[i1 * 12 + i * 4 + 2];
						var y2 = params[i1 * 12 + i * 4 + 3];

						var ratio = this._calculate(x1, x2, y1, y2, weight1);

						result[i] = values[offset0 + i] * (1 - ratio) + values[offset1 + i] * ratio;
					}
				} else {
					// Number

					var x1 = params[i1 * 4 + 0];
					var x2 = params[i1 * 4 + 1];
					var y1 = params[i1 * 4 + 2];
					var y2 = params[i1 * 4 + 3];

					var ratio = this._calculate(x1, x2, y1, y2, weight1);

					result[0] = values[offset0] * (1 - ratio) + values[offset1] * ratio;
				}

				return result;
			},

			_calculate: function _calculate(x1, x2, y1, y2, x) {

				/*
	    * Cubic Bezier curves
	    *   https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B.C3.A9zier_curves
	    *
	    * B(t) = ( 1 - t ) ^ 3 * P0
	    *      + 3 * ( 1 - t ) ^ 2 * t * P1
	    *      + 3 * ( 1 - t ) * t^2 * P2
	    *      + t ^ 3 * P3
	    *      ( 0 <= t <= 1 )
	    *
	    * MMD uses Cubic Bezier curves for bone and camera animation interpolation.
	    *   http://d.hatena.ne.jp/edvakf/20111016/1318716097
	    *
	    *    x = ( 1 - t ) ^ 3 * x0
	    *      + 3 * ( 1 - t ) ^ 2 * t * x1
	    *      + 3 * ( 1 - t ) * t^2 * x2
	    *      + t ^ 3 * x3
	    *    y = ( 1 - t ) ^ 3 * y0
	    *      + 3 * ( 1 - t ) ^ 2 * t * y1
	    *      + 3 * ( 1 - t ) * t^2 * y2
	    *      + t ^ 3 * y3
	    *      ( x0 = 0, y0 = 0 )
	    *      ( x3 = 1, y3 = 1 )
	    *      ( 0 <= t, x1, x2, y1, y2 <= 1 )
	    *
	    * Here solves this equation with Bisection method,
	    *   https://en.wikipedia.org/wiki/Bisection_method
	    * gets t, and then calculate y.
	    *
	    * f(t) = 3 * ( 1 - t ) ^ 2 * t * x1
	    *      + 3 * ( 1 - t ) * t^2 * x2
	    *      + t ^ 3 - x = 0
	    *
	    * (Another option: Newton's method
	    *    https://en.wikipedia.org/wiki/Newton%27s_method)
	    */

				var c = 0.5;
				var t = c;
				var s = 1.0 - t;
				var loop = 15;
				var eps = 1e-5;
				var math = Math;

				var sst3, stt3, ttt;

				for (var i = 0; i < loop; i++) {

					sst3 = 3.0 * s * s * t;
					stt3 = 3.0 * s * t * t;
					ttt = t * t * t;

					var ft = sst3 * x1 + stt3 * x2 + ttt - x;

					if (math.abs(ft) < eps) break;

					c /= 2.0;

					t += ft < 0 ? c : -c;
					s = 1.0 - t;
				}

				return sst3 * y1 + stt3 * y2 + ttt;
			}

		});

		return MMDLoader;
	}();

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _FileLoader = __webpack_require__(25);

	var _MMDLoader = __webpack_require__(64);

	var _MMDLoader2 = _interopRequireDefault(_MMDLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Support threejs loaders
	 * - Based on some modules in threejs.
	 *
	 * ********** **/

	var inBrowser = typeof window !== 'undefined';

	var loaders = {
	  FileLoader: _FileLoader.FileLoader,
	  MMDLoader: _MMDLoader2.default
	};

	if (inBrowser && window.Easycanvas) {
	  Easycanvas.threeLoaders = loaders;
	} else {
	  module.exports = loaders;
	}

/***/ })

/******/ })
});
;