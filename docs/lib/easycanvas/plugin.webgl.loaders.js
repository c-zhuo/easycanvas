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

	module.exports = __webpack_require__(97);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _FileLoader = __webpack_require__(21);

	var _LoaderUtils = __webpack_require__(73);

	var _Interpolant = __webpack_require__(72);

	var _CompressedTextureLoader = __webpack_require__(69);

	/** ********** *
	 *
	 * Mock THREE Object
	 * - Based on and modified from threejs.
	 *
	 * ********** **/

	module.exports = {
	    FileLoader: _FileLoader.FileLoader,
	    LoaderUtils: _LoaderUtils.LoaderUtils,
	    Interpolant: _Interpolant.Interpolant,
	    CompressedTextureLoader: _CompressedTextureLoader.CompressedTextureLoader,

	    RGB_S3TC_DXT1_Format: 33776,
	    RGBA_S3TC_DXT1_Format: 33777,
	    RGBA_S3TC_DXT3_Format: 33778,
	    RGBA_S3TC_DXT5_Format: 33779
	};

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FileLoader = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * @author mrdoob / http://mrdoob.com/
	                                                                                                                                                                                                                                                                   */

	var _Cache = __webpack_require__(68);

	var _LoadingManager = __webpack_require__(22);

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

/***/ 22:
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

/***/ 68:
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

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CompressedTextureLoader = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	// import { CompressedTexture } from '../textures/CompressedTexture.js';


	var _FileLoader = __webpack_require__(21);

	var _LoadingManager = __webpack_require__(22);

	// import { LinearFilter } from '../constants.js';
	var LinearFilter = 1006;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 *
	 * Abstract Base class to block based textures loader (dds, pvr, ...)
	 */

	function CompressedTextureLoader(manager) {

		this.manager = manager !== undefined ? manager : _LoadingManager.DefaultLoadingManager;

		// override in sub classes
		this._parser = null;
	}

	_extends(CompressedTextureLoader.prototype, {

		load: function load(url, onLoad, onProgress, onError) {

			var scope = this;

			var images = [];

			// var texture = new CompressedTexture();
			var texture = {};
			texture.image = images;

			var loader = new _FileLoader.FileLoader(this.manager);
			loader.setPath(this.path);
			loader.setResponseType('arraybuffer');

			function loadTexture(i) {

				loader.load(url[i], function (buffer) {
					// debugger;
					var texDatas = scope._parser(buffer, true);

					images[i] = {
						width: texDatas.width,
						height: texDatas.height,
						format: texDatas.format,
						mipmaps: texDatas.mipmaps
					};

					loaded += 1;

					if (loaded === 6) {

						if (texDatas.mipmapCount === 1) texture.minFilter = LinearFilter;

						texture.format = texDatas.format;
						texture.needsUpdate = true;

						if (onLoad) onLoad(texture);
					}
				}, onProgress, onError);
			}

			if (Array.isArray(url)) {

				var loaded = 0;

				for (var i = 0, il = url.length; i < il; ++i) {

					loadTexture(i);
				}
			} else {

				// compressed cubemap texture stored in a single DDS file

				loader.load(url, function (buffer) {

					var texDatas = scope._parser(buffer, true);

					if (texDatas.isCubemap) {

						var faces = texDatas.mipmaps.length / texDatas.mipmapCount;

						for (var f = 0; f < faces; f++) {

							images[f] = { mipmaps: [] };

							for (var i = 0; i < texDatas.mipmapCount; i++) {

								images[f].mipmaps.push(texDatas.mipmaps[f * texDatas.mipmapCount + i]);
								images[f].format = texDatas.format;
								images[f].width = texDatas.width;
								images[f].height = texDatas.height;
							}
						}
					} else {

						texture.image.width = texDatas.width;
						texture.image.height = texDatas.height;
						texture.mipmaps = texDatas.mipmaps;
					}

					if (texDatas.mipmapCount === 1) {

						texture.minFilter = LinearFilter;
					}

					texture.format = texDatas.format;
					texture.needsUpdate = true;
					// debugger;
					if (onLoad) onLoad(texture);
				}, onProgress, onError);
			}

			return texture;
		},

		setPath: function setPath(value) {

			this.path = value;
			return this;
		}

	});

	exports.CompressedTextureLoader = CompressedTextureLoader;

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _mockThree = __webpack_require__(8);

	var _mockThree2 = _interopRequireDefault(_mockThree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * @author mrdoob / http://mrdoob.com/
	 */

	module.exports = _mockThree2.default.DDSLoader = function () {

		this._parser = _mockThree2.default.DDSLoader.parse;
	}; /** ********** *
	    *
	    * DDS Loaders
	    * - Based on and modified from threejs loaders.
	    *
	    * ********** **/

	_mockThree2.default.DDSLoader.prototype = Object.create(_mockThree2.default.CompressedTextureLoader.prototype);
	_mockThree2.default.DDSLoader.prototype.constructor = _mockThree2.default.DDSLoader;

	_mockThree2.default.DDSLoader.parse = function (buffer, loadMipmaps) {

		var dds = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };

		// Adapted from @toji's DDS utils
		// https://github.com/toji/webgl-texture-utils/blob/master/texture-util/dds.js

		// All values and structures referenced from:
		// http://msdn.microsoft.com/en-us/library/bb943991.aspx/

		var DDS_MAGIC = 0x20534444;

		var DDSD_CAPS = 0x1,
		    DDSD_HEIGHT = 0x2,
		    DDSD_WIDTH = 0x4,
		    DDSD_PITCH = 0x8,
		    DDSD_PIXELFORMAT = 0x1000,
		    DDSD_MIPMAPCOUNT = 0x20000,
		    DDSD_LINEARSIZE = 0x80000,
		    DDSD_DEPTH = 0x800000;

		var DDSCAPS_COMPLEX = 0x8,
		    DDSCAPS_MIPMAP = 0x400000,
		    DDSCAPS_TEXTURE = 0x1000;

		var DDSCAPS2_CUBEMAP = 0x200,
		    DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,
		    DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,
		    DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,
		    DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,
		    DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,
		    DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,
		    DDSCAPS2_VOLUME = 0x200000;

		var DDPF_ALPHAPIXELS = 0x1,
		    DDPF_ALPHA = 0x2,
		    DDPF_FOURCC = 0x4,
		    DDPF_RGB = 0x40,
		    DDPF_YUV = 0x200,
		    DDPF_LUMINANCE = 0x20000;

		function fourCCToInt32(value) {

			return value.charCodeAt(0) + (value.charCodeAt(1) << 8) + (value.charCodeAt(2) << 16) + (value.charCodeAt(3) << 24);
		}

		function int32ToFourCC(value) {

			return String.fromCharCode(value & 0xff, value >> 8 & 0xff, value >> 16 & 0xff, value >> 24 & 0xff);
		}

		function loadARGBMip(buffer, dataOffset, width, height) {

			var dataLength = width * height * 4;
			var srcBuffer = new Uint8Array(buffer, dataOffset, dataLength);
			var byteArray = new Uint8Array(dataLength);
			var dst = 0;
			var src = 0;
			for (var y = 0; y < height; y++) {

				for (var x = 0; x < width; x++) {

					var b = srcBuffer[src];src++;
					var g = srcBuffer[src];src++;
					var r = srcBuffer[src];src++;
					var a = srcBuffer[src];src++;
					byteArray[dst] = r;dst++; //r
					byteArray[dst] = g;dst++; //g
					byteArray[dst] = b;dst++; //b
					byteArray[dst] = a;dst++; //a
				}
			}
			return byteArray;
		}

		var FOURCC_DXT1 = fourCCToInt32("DXT1");
		var FOURCC_DXT3 = fourCCToInt32("DXT3");
		var FOURCC_DXT5 = fourCCToInt32("DXT5");
		var FOURCC_ETC1 = fourCCToInt32("ETC1");

		var headerLengthInt = 31; // The header length in 32 bit ints

		// Offsets into the header array

		var off_magic = 0;

		var off_size = 1;
		var off_flags = 2;
		var off_height = 3;
		var off_width = 4;

		var off_mipmapCount = 7;

		var off_pfFlags = 20;
		var off_pfFourCC = 21;
		var off_RGBBitCount = 22;
		var off_RBitMask = 23;
		var off_GBitMask = 24;
		var off_BBitMask = 25;
		var off_ABitMask = 26;

		var off_caps = 27;
		var off_caps2 = 28;
		var off_caps3 = 29;
		var off_caps4 = 30;

		// Parse header

		var header = new Int32Array(buffer, 0, headerLengthInt);

		if (header[off_magic] !== DDS_MAGIC) {

			console.error('THREE.DDSLoader.parse: Invalid magic number in DDS header.');
			return dds;
		}

		if (!header[off_pfFlags] & DDPF_FOURCC) {

			console.error('THREE.DDSLoader.parse: Unsupported format, must contain a FourCC code.');
			return dds;
		}

		var blockBytes;

		var fourCC = header[off_pfFourCC];

		var isRGBAUncompressed = false;

		switch (fourCC) {

			case FOURCC_DXT1:

				blockBytes = 8;
				dds.format = _mockThree2.default.RGB_S3TC_DXT1_Format;
				break;

			case FOURCC_DXT3:

				blockBytes = 16;
				dds.format = _mockThree2.default.RGBA_S3TC_DXT3_Format;
				break;

			case FOURCC_DXT5:

				blockBytes = 16;
				dds.format = _mockThree2.default.RGBA_S3TC_DXT5_Format;
				break;

			case FOURCC_ETC1:

				blockBytes = 8;
				dds.format = _mockThree2.default.RGB_ETC1_Format;
				break;

			default:

				if (header[off_RGBBitCount] === 32 && header[off_RBitMask] & 0xff0000 && header[off_GBitMask] & 0xff00 && header[off_BBitMask] & 0xff && header[off_ABitMask] & 0xff000000) {

					isRGBAUncompressed = true;
					blockBytes = 64;
					dds.format = _mockThree2.default.RGBAFormat;
				} else {

					console.error('THREE.DDSLoader.parse: Unsupported FourCC code ', int32ToFourCC(fourCC));
					return dds;
				}

		}

		dds.mipmapCount = 1;

		if (header[off_flags] & DDSD_MIPMAPCOUNT && loadMipmaps !== false) {

			dds.mipmapCount = Math.max(1, header[off_mipmapCount]);
		}

		var caps2 = header[off_caps2];
		dds.isCubemap = caps2 & DDSCAPS2_CUBEMAP ? true : false;
		if (dds.isCubemap && (!(caps2 & DDSCAPS2_CUBEMAP_POSITIVEX) || !(caps2 & DDSCAPS2_CUBEMAP_NEGATIVEX) || !(caps2 & DDSCAPS2_CUBEMAP_POSITIVEY) || !(caps2 & DDSCAPS2_CUBEMAP_NEGATIVEY) || !(caps2 & DDSCAPS2_CUBEMAP_POSITIVEZ) || !(caps2 & DDSCAPS2_CUBEMAP_NEGATIVEZ))) {

			console.error('THREE.DDSLoader.parse: Incomplete cubemap faces');
			return dds;
		}

		dds.width = header[off_width];
		dds.height = header[off_height];

		var dataOffset = header[off_size] + 4;

		// Extract mipmaps buffers

		var faces = dds.isCubemap ? 6 : 1;

		for (var face = 0; face < faces; face++) {

			var width = dds.width;
			var height = dds.height;

			for (var i = 0; i < dds.mipmapCount; i++) {

				if (isRGBAUncompressed) {

					var byteArray = loadARGBMip(buffer, dataOffset, width, height);
					var dataLength = byteArray.length;
				} else {

					var dataLength = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockBytes;
					var byteArray = new Uint8Array(buffer, dataOffset, dataLength);
				}

				var mipmap = { "data": byteArray, "width": width, "height": height };
				dds.mipmaps.push(mipmap);

				dataOffset += dataLength;

				width = Math.max(width >> 1, 1);
				height = Math.max(height >> 1, 1);
			}
		}

		return dds;
	};

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * FBX Loaders
	                                                                                                                                                                                                                                                                   * - Based on and modified from threejs loaders.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _mockThree = __webpack_require__(8);

	var _mockThree2 = _interopRequireDefault(_mockThree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {

		_mockThree2.default.FBXLoader = function (manager) {

			this.manager = manager !== undefined ? manager : _mockThree2.default.DefaultLoadingManager;
		};

		_extends(_mockThree2.default.FBXLoader.prototype, {

			load: function load(url, onLoad, onProgress, onError) {

				var self = this;

				var resourceDirectory = _mockThree2.default.LoaderUtils.extractUrlBase(url);

				var loader = new _mockThree2.default.FileLoader(this.manager);
				loader.setResponseType('arraybuffer');
				loader.load(url, function (buffer) {

					// try {

					var scene = self.parse(buffer, resourceDirectory);
					onLoad(scene);

					// } catch ( error ) {

					// 	window.setTimeout( function () {

					// 		if ( onError ) onError( error );

					// 		self.manager && self.manager.itemError( url );

					// 	}, 0 );

					// }
				}, onProgress, onError);
			},

			parse: function parse(FBXBuffer, resourceDirectory) {

				var FBXTree;

				if (isFbxFormatBinary(FBXBuffer)) {

					FBXTree = new BinaryParser().parse(FBXBuffer);
				} else {

					var FBXText = convertArrayBufferToString(FBXBuffer);

					if (!isFbxFormatASCII(FBXText)) {

						throw new Error('THREE.FBXLoader: Unknown format.');
					}

					if (getFbxVersion(FBXText) < 7000) {

						throw new Error('THREE.FBXLoader: FBX version not supported, FileVersion: ' + getFbxVersion(FBXText));
					}

					FBXTree = new TextParser().parse(FBXText);
				}

				// console.log( FBXTree );
				return FBXTree;
			}

		});

		// Parse an FBX file in Binary format
		function BinaryParser() {}

		_extends(BinaryParser.prototype, {

			parse: function parse(buffer) {

				var reader = new BinaryReader(buffer);
				reader.skip(23); // skip magic 23 bytes

				var version = reader.getUint32();

				console.log('THREE.FBXLoader: FBX binary version: ' + version);

				var allNodes = new FBXTree();

				while (!this.endOfContent(reader)) {

					var node = this.parseNode(reader, version);
					if (node !== null) allNodes.add(node.name, node);
				}

				return allNodes;
			},

			// Check if reader has reached the end of content.
			endOfContent: function endOfContent(reader) {

				// footer size: 160bytes + 16-byte alignment padding
				// - 16bytes: magic
				// - padding til 16-byte alignment (at least 1byte?)
				//	(seems like some exporters embed fixed 15 or 16bytes?)
				// - 4bytes: magic
				// - 4bytes: version
				// - 120bytes: zero
				// - 16bytes: magic
				if (reader.size() % 16 === 0) {

					return (reader.getOffset() + 160 + 16 & ~0xf) >= reader.size();
				} else {

					return reader.getOffset() + 160 + 16 >= reader.size();
				}
			},

			// recursively parse nodes until the end of the file is reached
			parseNode: function parseNode(reader, version) {

				var node = {};

				// The first three data sizes depends on version.
				var endOffset = version >= 7500 ? reader.getUint64() : reader.getUint32();
				var numProperties = version >= 7500 ? reader.getUint64() : reader.getUint32();

				// note: do not remove this even if you get a linter warning as it moves the buffer forward
				var propertyListLen = version >= 7500 ? reader.getUint64() : reader.getUint32();

				var nameLen = reader.getUint8();
				var name = reader.getString(nameLen);

				// Regards this node as NULL-record if endOffset is zero
				if (endOffset === 0) return null;

				var propertyList = [];

				for (var i = 0; i < numProperties; i++) {

					propertyList.push(this.parseProperty(reader));
				}

				// Regards the first three elements in propertyList as id, attrName, and attrType
				var id = propertyList.length > 0 ? propertyList[0] : '';
				var attrName = propertyList.length > 1 ? propertyList[1] : '';
				var attrType = propertyList.length > 2 ? propertyList[2] : '';

				// check if this node represents just a single property
				// like (name, 0) set or (name2, [0, 1, 2]) set of {name: 0, name2: [0, 1, 2]}
				node.singleProperty = numProperties === 1 && reader.getOffset() === endOffset ? true : false;

				while (endOffset > reader.getOffset()) {

					var subNode = this.parseNode(reader, version);

					if (subNode !== null) this.parseSubNode(name, node, subNode);
				}

				node.propertyList = propertyList; // raw property list used by parent

				if (typeof id === 'number') node.id = id;
				if (attrName !== '') node.attrName = attrName;
				if (attrType !== '') node.attrType = attrType;
				if (name !== '') node.name = name;

				return node;
			},

			parseSubNode: function parseSubNode(name, node, subNode) {

				// special case: child node is single property
				if (subNode.singleProperty === true) {

					var value = subNode.propertyList[0];

					if (Array.isArray(value)) {

						node[subNode.name] = subNode;

						subNode.a = value;
					} else {

						node[subNode.name] = value;
					}
				} else if (name === 'Connections' && subNode.name === 'C') {

					var array = [];

					subNode.propertyList.forEach(function (property, i) {

						// first Connection is FBX type (OO, OP, etc.). We'll discard these
						if (i !== 0) array.push(property);
					});

					if (node.connections === undefined) {

						node.connections = [];
					}

					node.connections.push(array);
				} else if (subNode.name === 'Properties70') {

					var keys = Object.keys(subNode);

					keys.forEach(function (key) {

						node[key] = subNode[key];
					});
				} else if (name === 'Properties70' && subNode.name === 'P') {

					var innerPropName = subNode.propertyList[0];
					var innerPropType1 = subNode.propertyList[1];
					var innerPropType2 = subNode.propertyList[2];
					var innerPropFlag = subNode.propertyList[3];
					var innerPropValue;

					if (innerPropName.indexOf('Lcl ') === 0) innerPropName = innerPropName.replace('Lcl ', 'Lcl_');
					if (innerPropType1.indexOf('Lcl ') === 0) innerPropType1 = innerPropType1.replace('Lcl ', 'Lcl_');

					if (innerPropType1 === 'Color' || innerPropType1 === 'ColorRGB' || innerPropType1 === 'Vector' || innerPropType1 === 'Vector3D' || innerPropType1.indexOf('Lcl_') === 0) {

						innerPropValue = [subNode.propertyList[4], subNode.propertyList[5], subNode.propertyList[6]];
					} else {

						innerPropValue = subNode.propertyList[4];
					}

					// this will be copied to parent, see above
					node[innerPropName] = {

						'type': innerPropType1,
						'type2': innerPropType2,
						'flag': innerPropFlag,
						'value': innerPropValue

					};
				} else if (node[subNode.name] === undefined) {

					if (typeof subNode.id === 'number') {

						node[subNode.name] = {};
						node[subNode.name][subNode.id] = subNode;
					} else {

						node[subNode.name] = subNode;
					}
				} else {

					if (subNode.name === 'PoseNode') {

						if (!Array.isArray(node[subNode.name])) {

							node[subNode.name] = [node[subNode.name]];
						}

						node[subNode.name].push(subNode);
					} else if (node[subNode.name][subNode.id] === undefined) {

						node[subNode.name][subNode.id] = subNode;
					}
				}
			},

			parseProperty: function parseProperty(reader) {

				var type = reader.getString(1);

				switch (type) {

					case 'C':
						return reader.getBoolean();

					case 'D':
						return reader.getFloat64();

					case 'F':
						return reader.getFloat32();

					case 'I':
						return reader.getInt32();

					case 'L':
						return reader.getInt64();

					case 'R':
						var length = reader.getUint32();
						return reader.getArrayBuffer(length);

					case 'S':
						var length = reader.getUint32();
						return reader.getString(length);

					case 'Y':
						return reader.getInt16();

					case 'b':
					case 'c':
					case 'd':
					case 'f':
					case 'i':
					case 'l':

						var arrayLength = reader.getUint32();
						var encoding = reader.getUint32(); // 0: non-compressed, 1: compressed
						var compressedLength = reader.getUint32();

						if (encoding === 0) {

							switch (type) {

								case 'b':
								case 'c':
									return reader.getBooleanArray(arrayLength);

								case 'd':
									return reader.getFloat64Array(arrayLength);

								case 'f':
									return reader.getFloat32Array(arrayLength);

								case 'i':
									return reader.getInt32Array(arrayLength);

								case 'l':
									return reader.getInt64Array(arrayLength);

							}
						}

						if (window.Zlib === undefined) {

							console.error('THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js');
						}

						var inflate = new Zlib.Inflate(new Uint8Array(reader.getArrayBuffer(compressedLength))); // eslint-disable-line no-undef
						var reader2 = new BinaryReader(inflate.decompress().buffer);

						switch (type) {

							case 'b':
							case 'c':
								return reader2.getBooleanArray(arrayLength);

							case 'd':
								return reader2.getFloat64Array(arrayLength);

							case 'f':
								return reader2.getFloat32Array(arrayLength);

							case 'i':
								return reader2.getInt32Array(arrayLength);

							case 'l':
								return reader2.getInt64Array(arrayLength);

						}

					default:
						throw new Error('THREE.FBXLoader: Unknown property type ' + type);

				}
			}

		});

		function BinaryReader(buffer, littleEndian) {

			this.dv = new DataView(buffer);
			this.offset = 0;
			this.littleEndian = littleEndian !== undefined ? littleEndian : true;
		}

		_extends(BinaryReader.prototype, {

			getOffset: function getOffset() {

				return this.offset;
			},

			size: function size() {

				return this.dv.buffer.byteLength;
			},

			skip: function skip(length) {

				this.offset += length;
			},

			// seems like true/false representation depends on exporter.
			// true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
			// then sees LSB.
			getBoolean: function getBoolean() {

				return (this.getUint8() & 1) === 1;
			},

			getBooleanArray: function getBooleanArray(size) {

				var a = [];

				for (var i = 0; i < size; i++) {

					a.push(this.getBoolean());
				}

				return a;
			},

			getUint8: function getUint8() {

				var value = this.dv.getUint8(this.offset);
				this.offset += 1;
				return value;
			},

			getInt16: function getInt16() {

				var value = this.dv.getInt16(this.offset, this.littleEndian);
				this.offset += 2;
				return value;
			},

			getInt32: function getInt32() {

				var value = this.dv.getInt32(this.offset, this.littleEndian);
				this.offset += 4;
				return value;
			},

			getInt32Array: function getInt32Array(size) {

				var a = [];

				for (var i = 0; i < size; i++) {

					a.push(this.getInt32());
				}

				return a;
			},

			getUint32: function getUint32() {

				var value = this.dv.getUint32(this.offset, this.littleEndian);
				this.offset += 4;
				return value;
			},

			// JavaScript doesn't support 64-bit integer so calculate this here
			// 1 << 32 will return 1 so using multiply operation instead here.
			// There's a possibility that this method returns wrong value if the value
			// is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
			// TODO: safely handle 64-bit integer
			getInt64: function getInt64() {

				var low, high;

				if (this.littleEndian) {

					low = this.getUint32();
					high = this.getUint32();
				} else {

					high = this.getUint32();
					low = this.getUint32();
				}

				// calculate negative value
				if (high & 0x80000000) {

					high = ~high & 0xFFFFFFFF;
					low = ~low & 0xFFFFFFFF;

					if (low === 0xFFFFFFFF) high = high + 1 & 0xFFFFFFFF;

					low = low + 1 & 0xFFFFFFFF;

					return -(high * 0x100000000 + low);
				}

				return high * 0x100000000 + low;
			},

			getInt64Array: function getInt64Array(size) {

				var a = [];

				for (var i = 0; i < size; i++) {

					a.push(this.getInt64());
				}

				return a;
			},

			// Note: see getInt64() comment
			getUint64: function getUint64() {

				var low, high;

				if (this.littleEndian) {

					low = this.getUint32();
					high = this.getUint32();
				} else {

					high = this.getUint32();
					low = this.getUint32();
				}

				return high * 0x100000000 + low;
			},

			getFloat32: function getFloat32() {

				var value = this.dv.getFloat32(this.offset, this.littleEndian);
				this.offset += 4;
				return value;
			},

			getFloat32Array: function getFloat32Array(size) {

				var a = [];

				for (var i = 0; i < size; i++) {

					a.push(this.getFloat32());
				}

				return a;
			},

			getFloat64: function getFloat64() {

				var value = this.dv.getFloat64(this.offset, this.littleEndian);
				this.offset += 8;
				return value;
			},

			getFloat64Array: function getFloat64Array(size) {

				var a = [];

				for (var i = 0; i < size; i++) {

					a.push(this.getFloat64());
				}

				return a;
			},

			getArrayBuffer: function getArrayBuffer(size) {

				var value = this.dv.buffer.slice(this.offset, this.offset + size);
				this.offset += size;
				return value;
			},

			getString: function getString(size) {

				var a = new Uint8Array(size);

				for (var i = 0; i < size; i++) {

					a[i] = this.getUint8();
				}

				var nullByte = a.indexOf(0);
				if (nullByte >= 0) a = a.slice(0, nullByte);

				return _mockThree2.default.LoaderUtils.decodeText(a);
			}

		});

		// FBXTree holds a representation of the FBX data, returned by the TextParser ( FBX ASCII format)
		// and BinaryParser( FBX Binary format)
		function FBXTree() {}

		_extends(FBXTree.prototype, {

			add: function add(key, val) {

				this[key] = val;
			}

		});

		function isFbxFormatBinary(buffer) {

			var CORRECT = 'Kaydara FBX Binary  \0';

			return buffer.byteLength >= CORRECT.length && CORRECT === convertArrayBufferToString(buffer, 0, CORRECT.length);
		}

		function isFbxFormatASCII(text) {

			var CORRECT = ['K', 'a', 'y', 'd', 'a', 'r', 'a', '\\', 'F', 'B', 'X', '\\', 'B', 'i', 'n', 'a', 'r', 'y', '\\', '\\'];

			var cursor = 0;

			function read(offset) {

				var result = text[offset - 1];
				text = text.slice(cursor + offset);
				cursor++;
				return result;
			}

			for (var i = 0; i < CORRECT.length; ++i) {

				var num = read(1);
				if (num === CORRECT[i]) {

					return false;
				}
			}

			return true;
		}

		function getFbxVersion(text) {

			var versionRegExp = /FBXVersion: (\d+)/;
			var match = text.match(versionRegExp);
			if (match) {

				var version = parseInt(match[1]);
				return version;
			}
			throw new Error('THREE.FBXLoader: Cannot find the version number for the file given.');
		}

		// Converts FBX ticks into real time seconds.
		function convertFBXTimeToSeconds(time) {

			return time / 46186158000;
		}

		// Parses comma separated list of numbers and returns them an array.
		// Used internally by the TextParser
		function parseNumberArray(value) {

			var array = value.split(',').map(function (val) {

				return parseFloat(val);
			});

			return array;
		}

		function convertArrayBufferToString(buffer, from, to) {

			if (from === undefined) from = 0;
			if (to === undefined) to = buffer.byteLength;

			return _mockThree2.default.LoaderUtils.decodeText(new Uint8Array(buffer, from, to));
		}

		function append(a, b) {

			for (var i = 0, j = a.length, l = b.length; i < l; i++, j++) {

				a[j] = b[i];
			}
		}

		function slice(a, b, from, to) {

			for (var i = from, j = 0; i < to; i++, j++) {

				a[j] = b[i];
			}

			return a;
		}

		// inject array a2 into array a1 at index
		function inject(a1, index, a2) {

			return a1.slice(0, index).concat(a2).concat(a1.slice(index));
		}

		return _mockThree2.default.FBXLoader;
	}();

/***/ }),

/***/ 72:
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

/***/ 73:
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

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * MMD Loaders
	                                                                                                                                                                                                                                                                   * - Based on and modified from threejs loaders.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _mockThree = __webpack_require__(8);

	var _mockThree2 = _interopRequireDefault(_mockThree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

			this.manager = manager !== undefined ? manager : _mockThree2.default.DefaultLoadingManager;

			this.loader = new _mockThree2.default.FileLoader(this.manager);

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

				var texturePath = _mockThree2.default.LoaderUtils.extractUrlBase(url);
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

				var mesh = new _mockThree2.default.SkinnedMesh(geometry, material);

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

								link.limitation = new _mockThree2.default.Vector3(1.0, 0.0, 0.0);
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

								link.rotationMin = new _mockThree2.default.Vector3().fromArray(rotationMin);
								link.rotationMax = new _mockThree2.default.Vector3().fromArray(rotationMax);
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

					var attribute = new _mockThree2.default.Float32BufferAttribute(data.metadata.vertexCount * 3, 3);
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

				var geometry = new _mockThree2.default.BufferGeometry();

				geometry.addAttribute('position', new _mockThree2.default.Float32BufferAttribute(positions, 3));
				geometry.addAttribute('normal', new _mockThree2.default.Float32BufferAttribute(normals, 3));
				geometry.addAttribute('uv', new _mockThree2.default.Float32BufferAttribute(uvs, 2));
				geometry.addAttribute('skinIndex', new _mockThree2.default.Uint16BufferAttribute(skinIndices, 4));
				geometry.addAttribute('skinWeight', new _mockThree2.default.Float32BufferAttribute(skinWeights, 4));
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
					params.color = new _mockThree2.default.Color().fromArray(material.diffuse);
					params.opacity = material.diffuse[3];
					params.specular = new _mockThree2.default.Color().fromArray(material.specular);
					params.emissive = new _mockThree2.default.Color().fromArray(material.ambient);
					params.shininess = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )
					params.transparent = params.opacity !== 1.0;

					// 

					params.skinning = geometry.bones.length > 0 ? true : false;
					params.morphTargets = geometry.morphTargets.length > 0 ? true : false;
					params.lights = true;
					params.fog = true;

					// blend

					params.blending = _mockThree2.default.CustomBlending;
					params.blendSrc = _mockThree2.default.SrcAlphaFactor;
					params.blendDst = _mockThree2.default.OneMinusSrcAlphaFactor;
					params.blendSrcAlpha = _mockThree2.default.SrcAlphaFactor;
					params.blendDstAlpha = _mockThree2.default.DstAlphaFactor;

					// side

					if (data.metadata.format === 'pmx' && (material.flag & 0x1) === 1) {

						params.side = _mockThree2.default.DoubleSide;
					} else {

						params.side = params.opacity === 1.0 ? _mockThree2.default.FrontSide : _mockThree2.default.DoubleSide;
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

								params.combine = extension === '.sph' ? _mockThree2.default.MultiplyOperation : _mockThree2.default.AddOperation;
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

							params.combine = material.envFlag === 1 ? _mockThree2.default.MultiplyOperation : _mockThree2.default.AddOperation;
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

					materials.push(new _mockThree2.default.MeshToonMaterial(params));
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

					if (_mockThree2.default.TGALoader === undefined) {

						throw new Error('THREE.MMDLoader: Import THREE.TGALoader');
					}

					this.tgaLoader = new _mockThree2.default.TGALoader(this.manager);
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

				var loader = _mockThree2.default.Loader.Handlers.get(fullPath);

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
					t.wrapS = _mockThree2.default.RepeatWrapping;
					t.wrapT = _mockThree2.default.RepeatWrapping;

					for (var i = 0; i < texture.readyCallbacks.length; i++) {

						texture.readyCallbacks[i](texture);
					}

					delete texture.readyCallbacks;
				}, onProgress, onError);

				if (params.sphericalReflectionMapping === true) {

					texture.mapping = _mockThree2.default.SphericalReflectionMapping;
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

				return new _mockThree2.default.AnimationClip('', -1, tracks);
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

					tracks.push(this._createTrack(targetName + '.position', _mockThree2.default.VectorKeyframeTrack, times, positions, pInterpolations));
					tracks.push(this._createTrack(targetName + '.quaternion', _mockThree2.default.QuaternionKeyframeTrack, times, rotations, rInterpolations));
				}

				return new _mockThree2.default.AnimationClip('', -1, tracks);
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

					tracks.push(new _mockThree2.default.NumberKeyframeTrack('.morphTargetInfluences[' + morphTargetDictionary[key] + ']', times, values));
				}

				return new _mockThree2.default.AnimationClip('', -1, tracks);
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

				var quaternion = new _mockThree2.default.Quaternion();
				var euler = new _mockThree2.default.Euler();
				var position = new _mockThree2.default.Vector3();
				var center = new _mockThree2.default.Vector3();

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
				tracks.push(this._createTrack('target.position', _mockThree2.default.VectorKeyframeTrack, times, centers, cInterpolations));

				tracks.push(this._createTrack('.quaternion', _mockThree2.default.QuaternionKeyframeTrack, times, quaternions, qInterpolations));
				tracks.push(this._createTrack('.position', _mockThree2.default.VectorKeyframeTrack, times, positions, pInterpolations));
				tracks.push(this._createTrack('.fov', _mockThree2.default.NumberKeyframeTrack, times, fovs, fInterpolations));

				return new _mockThree2.default.AnimationClip('', -1, tracks);
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

			_mockThree2.default.Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);

			this.interpolationParams = params;
		}

		CubicBezierInterpolation.prototype = _extends(Object.create(_mockThree2.default.Interpolant.prototype), {

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

					_mockThree2.default.Quaternion.slerpFlat(result, 0, values, offset0, values, offset1, ratio);
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

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _MMDLoader2 = __webpack_require__(74);

	var _MMDLoader3 = _interopRequireDefault(_MMDLoader2);

	var _FBXLoader2 = __webpack_require__(71);

	var _FBXLoader3 = _interopRequireDefault(_FBXLoader2);

	var _DDSLoader = __webpack_require__(70);

	var _DDSLoader2 = _interopRequireDefault(_DDSLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var inBrowser = typeof window !== 'undefined'; /** ********** *
	                                                *
	                                                * Support threejs loaders
	                                                * - Based on some modules in threejs.
	                                                *
	                                                * ********** **/

	// import { FileLoader } from './plugin-webgl/threeLoaders/FileLoader.js';


	var loaders = {
	    // FileLoader,
	    MMDLoader: function MMDLoader(url, onLoad, onProgress, onError) {
	        var loader = new _MMDLoader3.default();
	        loader.load(url, function (data) {
	            onLoad(data);
	        }, onProgress, onError);
	    },
	    FBXLoader: function FBXLoader(url, onLoad, onProgress, onError) {
	        var loader = new _FBXLoader3.default();
	        loader.load(url, function (data) {
	            for (var i in data.Objects.Geometry) {
	                var item = data.Objects.Geometry[i];

	                item.PolygonVertexIndex.a = item.PolygonVertexIndex.a.map(function (number, index) {
	                    if (number < 0) return -number - 1;
	                    return number;
	                });
	            }

	            onLoad(data);
	        }, onProgress, onError);
	    },
	    DDSLoader: _DDSLoader2.default
	};

	var plugin = {
	    onCreate: function onCreate(option) {
	        if (this.$isWebgl) {
	            var gl = this.$gl;

	            this.ddsLoader = function (url, callback) {
	                if (!url) return;

	                var tex = gl.createTexture();

	                var ext = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');

	                var textureInfo = {
	                    width: 0,
	                    height: 0
	                };

	                var DDSloader = new _DDSLoader2.default();

	                DDSloader.load(url, function (map) {
	                    gl.bindTexture(gl.TEXTURE_2D, tex);
	                    gl.compressedTexImage2D(gl.TEXTURE_2D, 0, map.format, map.image.width, map.image.height, 0, map.mipmaps[0].data);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	                    textureInfo.width = map.image.width;
	                    textureInfo.height = map.image.height;
	                    textureInfo.texture = tex;

	                    callback && callback(map);
	                }, null, null);

	                return textureInfo;
	            };
	        }
	    }
	};

	// fileloader usage
	// var f = new Easycanvas.threeLoaders.FileLoader();
	// f.load('../resource/fbxdds/mx.fbx', function (object) {
	//     console.log(object); // unreadable
	// }, console.log, console.warn);

	if (inBrowser && window.Easycanvas) {
	    Easycanvas.loaders = loaders;
	    Easycanvas.use(plugin);
	} else {
	    module.exports = loaders;
	}

/***/ })

/******/ })
});
;