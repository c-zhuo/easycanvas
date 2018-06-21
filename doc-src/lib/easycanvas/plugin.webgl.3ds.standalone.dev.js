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

	module.exports = __webpack_require__(48);


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** ********** *
	 *
	 * Based on lib3ds.js, transform *.3ds files to JSON structrue
	 * - https://github.com/timknip/js3ds/blob/master/js/lib3ds.js.
	 *
	 * ********** **/

	var NULL_CHUNK = 0x0000;
	var M3DMAGIC = 0x4D4D; /*3DS file*/
	var SMAGIC = 0x2D2D;
	var LMAGIC = 0x2D3D;
	var MLIBMAGIC = 0x3DAA; /*MLI file*/
	var MATMAGIC = 0x3DFF;
	var CMAGIC = 0xC23D; /*PRJ file*/
	var M3D_VERSION = 0x0002;
	var M3D_KFVERSION = 0x0005;
	var COLOR_F = 0x0010;
	var COLOR_24 = 0x0011;
	var LIN_COLOR_24 = 0x0012;
	var LIN_COLOR_F = 0x0013;
	var INT_PERCENTAGE = 0x0030;
	var FLOAT_PERCENTAGE = 0x0031;
	var MDATA = 0x3D3D;
	var MESH_VERSION = 0x3D3E;
	var MASTER_SCALE = 0x0100;
	var LO_SHADOW_BIAS = 0x1400;
	var HI_SHADOW_BIAS = 0x1410;
	var SHADOW_MAP_SIZE = 0x1420;
	var SHADOW_SAMPLES = 0x1430;
	var SHADOW_RANGE = 0x1440;
	var SHADOW_FILTER = 0x1450;
	var RAY_BIAS = 0x1460;
	var O_CONSTS = 0x1500;
	var AMBIENT_LIGHT = 0x2100;
	var BIT_MAP = 0x1100;
	var SOLID_BGND = 0x1200;
	var V_GRADIENT = 0x1300;
	var USE_BIT_MAP = 0x1101;
	var USE_SOLID_BGND = 0x1201;
	var USE_V_GRADIENT = 0x1301;
	var FOG = 0x2200;
	var FOG_BGND = 0x2210;
	var LAYER_FOG = 0x2302;
	var DISTANCE_CUE = 0x2300;
	var DCUE_BGND = 0x2310;
	var USE_FOG = 0x2201;
	var USE_LAYER_FOG = 0x2303;
	var USE_DISTANCE_CUE = 0x2301;
	var MAT_ENTRY = 0xAFFF;
	var MAT_NAME = 0xA000;
	var MAT_AMBIENT = 0xA010;
	var MAT_DIFFUSE = 0xA020;
	var MAT_SPECULAR = 0xA030;
	var MAT_SHININESS = 0xA040;
	var MAT_SHIN2PCT = 0xA041;
	var MAT_TRANSPARENCY = 0xA050;
	var MAT_XPFALL = 0xA052;
	var MAT_USE_XPFALL = 0xA240;
	var MAT_REFBLUR = 0xA053;
	var MAT_SHADING = 0xA100;
	var MAT_USE_REFBLUR = 0xA250;
	var MAT_SELF_ILLUM = 0xA084;
	var MAT_TWO_SIDE = 0xA081;
	var MAT_DECAL = 0xA082;
	var MAT_ADDITIVE = 0xA083;
	var MAT_WIRE = 0xA085;
	var MAT_FACEMAP = 0xA088;
	var MAT_TRANSFALLOFF_IN = 0xA08A;
	var MAT_PHONGSOFT = 0xA08C;
	var MAT_WIREABS = 0xA08E;
	var MAT_WIRE_SIZE = 0xA087;
	var MAT_TEXMAP = 0xA200;
	var MAT_SXP_TEXT_DATA = 0xA320;
	var MAT_TEXMASK = 0xA33E;
	var MAT_SXP_TEXTMASK_DATA = 0xA32A;
	var MAT_TEX2MAP = 0xA33A;
	var MAT_SXP_TEXT2_DATA = 0xA321;
	var MAT_TEX2MASK = 0xA340;
	var MAT_SXP_TEXT2MASK_DATA = 0xA32C;
	var MAT_OPACMAP = 0xA210;
	var MAT_SXP_OPAC_DATA = 0xA322;
	var MAT_OPACMASK = 0xA342;
	var MAT_SXP_OPACMASK_DATA = 0xA32E;
	var MAT_BUMPMAP = 0xA230;
	var MAT_SXP_BUMP_DATA = 0xA324;
	var MAT_BUMPMASK = 0xA344;
	var MAT_SXP_BUMPMASK_DATA = 0xA330;
	var MAT_SPECMAP = 0xA204;
	var MAT_SXP_SPEC_DATA = 0xA325;
	var MAT_SPECMASK = 0xA348;
	var MAT_SXP_SPECMASK_DATA = 0xA332;
	var MAT_SHINMAP = 0xA33C;
	var MAT_SXP_SHIN_DATA = 0xA326;
	var MAT_SHINMASK = 0xA346;
	var MAT_SXP_SHINMASK_DATA = 0xA334;
	var MAT_SELFIMAP = 0xA33D;
	var MAT_SXP_SELFI_DATA = 0xA328;
	var MAT_SELFIMASK = 0xA34A;
	var MAT_SXP_SELFIMASK_DATA = 0xA336;
	var MAT_REFLMAP = 0xA220;
	var MAT_REFLMASK = 0xA34C;
	var MAT_SXP_REFLMASK_DATA = 0xA338;
	var MAT_ACUBIC = 0xA310;
	var MAT_MAPNAME = 0xA300;
	var MAT_MAP_TILING = 0xA351;
	var MAT_MAP_TEXBLUR = 0xA353;
	var MAT_MAP_USCALE = 0xA354;
	var MAT_MAP_VSCALE = 0xA356;
	var MAT_MAP_UOFFSET = 0xA358;
	var MAT_MAP_VOFFSET = 0xA35A;
	var MAT_MAP_ANG = 0xA35C;
	var MAT_MAP_COL1 = 0xA360;
	var MAT_MAP_COL2 = 0xA362;
	var MAT_MAP_RCOL = 0xA364;
	var MAT_MAP_GCOL = 0xA366;
	var MAT_MAP_BCOL = 0xA368;
	var NAMED_OBJECT = 0x4000;
	var N_DIRECT_LIGHT = 0x4600;
	var DL_OFF = 0x4620;
	var DL_OUTER_RANGE = 0x465A;
	var DL_INNER_RANGE = 0x4659;
	var DL_MULTIPLIER = 0x465B;
	var DL_EXCLUDE = 0x4654;
	var DL_ATTENUATE = 0x4625;
	var DL_SPOTLIGHT = 0x4610;
	var DL_SPOT_ROLL = 0x4656;
	var DL_SHADOWED = 0x4630;
	var DL_LOCAL_SHADOW2 = 0x4641;
	var DL_SEE_CONE = 0x4650;
	var DL_SPOT_RECTANGULAR = 0x4651;
	var DL_SPOT_ASPECT = 0x4657;
	var DL_SPOT_PROJECTOR = 0x4653;
	var DL_SPOT_OVERSHOOT = 0x4652;
	var DL_RAY_BIAS = 0x4658;
	var DL_RAYSHAD = 0x4627;
	var N_CAMERA = 0x4700;
	var CAM_SEE_CONE = 0x4710;
	var CAM_RANGES = 0x4720;
	var OBJ_HIDDEN = 0x4010;
	var OBJ_VIS_LOFTER = 0x4011;
	var OBJ_DOESNT_CAST = 0x4012;
	var OBJ_DONT_RECVSHADOW = 0x4017;
	var OBJ_MATTE = 0x4013;
	var OBJ_FAST = 0x4014;
	var OBJ_PROCEDURAL = 0x4015;
	var OBJ_FROZEN = 0x4016;
	var N_TRI_OBJECT = 0x4100;
	var POINT_ARRAY = 0x4110;
	var POINT_FLAG_ARRAY = 0x4111;
	var FACE_ARRAY = 0x4120;
	var MSH_MAT_GROUP = 0x4130;
	var SMOOTH_GROUP = 0x4150;
	var MSH_BOXMAP = 0x4190;
	var TEX_VERTS = 0x4140;
	var MESH_MATRIX = 0x4160;
	var MESH_COLOR = 0x4165;
	var MESH_TEXTURE_INFO = 0x4170;
	var KFDATA = 0xB000;
	var KFHDR = 0xB00A;
	var KFSEG = 0xB008;
	var KFCURTIME = 0xB009;
	var AMBIENT_NODE_TAG = 0xB001;
	var OBJECT_NODE_TAG = 0xB002;
	var CAMERA_NODE_TAG = 0xB003;
	var TARGET_NODE_TAG = 0xB004;
	var LIGHT_NODE_TAG = 0xB005;
	var L_TARGET_NODE_TAG = 0xB006;
	var SPOTLIGHT_NODE_TAG = 0xB007;
	var NODE_ID = 0xB030;
	var NODE_HDR = 0xB010;
	var PIVOT = 0xB013;
	var INSTANCE_NAME = 0xB011;
	var MORPH_SMOOTH = 0xB015;
	var BOUNDBOX = 0xB014;
	var POS_TRACK_TAG = 0xB020;
	var COL_TRACK_TAG = 0xB025;
	var ROT_TRACK_TAG = 0xB021;
	var SCL_TRACK_TAG = 0xB022;
	var MORPH_TRACK_TAG = 0xB026;
	var FOV_TRACK_TAG = 0xB023;
	var ROLL_TRACK_TAG = 0xB024;
	var HOT_TRACK_TAG = 0xB027;
	var FALL_TRACK_TAG = 0xB028;
	var HIDE_TRACK_TAG = 0xB029;
	var POLY_2D = 0x5000;
	var SHAPE_OK = 0x5010;
	var SHAPE_NOT_OK = 0x5011;
	var SHAPE_HOOK = 0x5020;
	var PATH_3D = 0x6000;
	var PATH_MATRIX = 0x6005;
	var SHAPE_2D = 0x6010;
	var M_SCALE = 0x6020;
	var M_TWIST = 0x6030;
	var M_TEETER = 0x6040;
	var M_FIT = 0x6050;
	var M_BEVEL = 0x6060;
	var XZ_CURVE = 0x6070;
	var YZ_CURVE = 0x6080;
	var INTERPCT = 0x6090;
	var DEFORM_LIMIT = 0x60A0;
	var USE_CONTOUR = 0x6100;
	var USE_TWEEN = 0x6110;
	var USE_SCALE = 0x6120;
	var USE_TWIST = 0x6130;
	var USE_TEETER = 0x6140;
	var USE_FIT = 0x6150;
	var USE_BEVEL = 0x6160;
	var DEFAULT_VIEW = 0x3000;
	var VIEW_TOP = 0x3010;
	var VIEW_BOTTOM = 0x3020;
	var VIEW_LEFT = 0x3030;
	var VIEW_RIGHT = 0x3040;
	var VIEW_FRONT = 0x3050;
	var VIEW_BACK = 0x3060;
	var VIEW_USER = 0x3070;
	var VIEW_CAMERA = 0x3080;
	var VIEW_WINDOW = 0x3090;
	var VIEWPORT_LAYOUT_OLD = 0x7000;
	var VIEWPORT_DATA_OLD = 0x7010;
	var VIEWPORT_LAYOUT = 0x7001;
	var VIEWPORT_DATA = 0x7011;
	var VIEWPORT_DATA_3 = 0x7012;
	var VIEWPORT_SIZE = 0x7020;
	var NETWORK_VIEW = 0x7030;

	var Lib3ds = function Lib3ds(element, debug) {
	    this.element = element;
	    this.debug = debug != undefined ? debug : false;
	    this.position = 0;
	    this.meshes = [];
	    this.materials = {};
	};

	var _jDataView;

	(function (exports) {

	    var global = this;

	    var compatibility = {
	        ArrayBuffer: typeof ArrayBuffer !== 'undefined',
	        DataView: typeof DataView !== 'undefined' && ('getFloat64' in DataView.prototype || // Chrome
	        'getFloat64' in new DataView(new ArrayBuffer(1))), // Node
	        // NodeJS Buffer in v0.5.5 and newer
	        NodeBuffer: typeof Buffer !== 'undefined' && 'readInt16LE' in Buffer.prototype
	    };

	    var dataTypes = {
	        'Int8': 1,
	        'Int16': 2,
	        'Int32': 4,
	        'Uint8': 1,
	        'Uint16': 2,
	        'Uint32': 4,
	        'Float32': 4,
	        'Float64': 8
	    };

	    var nodeNaming = {
	        'Int8': 'Int8',
	        'Int16': 'Int16',
	        'Int32': 'Int32',
	        'Uint8': 'UInt8',
	        'Uint16': 'UInt16',
	        'Uint32': 'UInt32',
	        'Float32': 'Float',
	        'Float64': 'Double'
	    };

	    _jDataView = function jDataView(buffer, byteOffset, byteLength, littleEndian) {
	        if (!(this instanceof _jDataView)) {
	            throw new Error("jDataView constructor may not be called as a function");
	        }

	        this.buffer = buffer = _jDataView.wrapBuffer(buffer);

	        // Check parameters and existing functionnalities
	        this._isArrayBuffer = compatibility.ArrayBuffer && buffer instanceof ArrayBuffer;
	        this._isDataView = compatibility.DataView && this._isArrayBuffer;
	        this._isNodeBuffer = compatibility.NodeBuffer && buffer instanceof Buffer;

	        // Handle Type Errors
	        if (!this._isNodeBuffer && !this._isArrayBuffer && !(buffer instanceof Array)) {
	            throw new TypeError('jDataView buffer has an incompatible type');
	        }

	        // Default Values
	        this._littleEndian = Boolean(littleEndian);

	        var bufferLength = this._isArrayBuffer ? buffer.byteLength : buffer.length;
	        if (byteOffset === undefined) {
	            byteOffset = 0;
	        }
	        this.byteOffset = byteOffset;

	        if (byteLength === undefined) {
	            byteLength = bufferLength - byteOffset;
	        }
	        this.byteLength = byteLength;

	        if (!this._isDataView) {
	            // Do additional checks to simulate DataView
	            if (typeof byteOffset !== 'number') {
	                throw new TypeError('jDataView byteOffset is not a number');
	            }
	            if (typeof byteLength !== 'number') {
	                throw new TypeError('jDataView byteLength is not a number');
	            }
	            if (byteOffset < 0) {
	                throw new Error('jDataView byteOffset is negative');
	            }
	            if (byteLength < 0) {
	                throw new Error('jDataView byteLength is negative');
	            }
	        }

	        // Instanciate
	        if (this._isDataView) {
	            this._view = new DataView(buffer, byteOffset, byteLength);
	        }
	        this._start = byteOffset;
	        if (byteOffset + byteLength > bufferLength) {
	            throw new Error("jDataView (byteOffset + byteLength) value is out of bounds");
	        }

	        this._offset = 0;

	        // Create uniform reading methods (wrappers) for the following data types

	        if (this._isDataView) {
	            // DataView: we use the direct method
	            for (var type in dataTypes) {
	                if (!dataTypes.hasOwnProperty(type)) {
	                    continue;
	                }
	                (function (type, view) {
	                    var size = dataTypes[type];
	                    view['get' + type] = function (byteOffset, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        // Move the internal offset forward
	                        view._offset = byteOffset + size;

	                        return view._view['get' + type](byteOffset, littleEndian);
	                    };
	                    view['set' + type] = function (byteOffset, value, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        // Move the internal offset forward
	                        view._offset = byteOffset + size;

	                        view._view['set' + type](byteOffset, value, littleEndian);
	                    };
	                })(type, this);
	            }
	        } else if (this._isNodeBuffer) {
	            for (var type in dataTypes) {
	                if (!dataTypes.hasOwnProperty(type)) {
	                    continue;
	                }
	                (function (type, view) {
	                    var size = dataTypes[type];
	                    view['get' + type] = function (byteOffset, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        var name;
	                        if (type === 'Int8' || type === 'Uint8') {
	                            name = 'read' + nodeNaming[type];
	                        } else if (littleEndian) {
	                            name = 'read' + nodeNaming[type] + 'LE';
	                        } else {
	                            name = 'read' + nodeNaming[type] + 'BE';
	                        }

	                        // Move the internal offset forward
	                        view._offset = byteOffset + size;

	                        return view.buffer[name](view._start + byteOffset);
	                    };
	                    view['set' + type] = function (byteOffset, value, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        var name;
	                        if (type === 'Int8' || type === 'Uint8') {
	                            name = 'write' + nodeNaming[type];
	                        } else if (littleEndian) {
	                            name = 'write' + nodeNaming[type] + 'LE';
	                        } else {
	                            name = 'write' + nodeNaming[type] + 'BE';
	                        }

	                        // Move the internal offset forward
	                        view._offset = byteOffset + size;

	                        view.buffer[name](value, view._start + byteOffset);
	                    };
	                })(type, this);
	            }
	        } else if (this._isArrayBuffer) {
	            for (var type in dataTypes) {
	                if (!dataTypes.hasOwnProperty(type)) {
	                    continue;
	                }
	                (function (type, view) {
	                    var size = dataTypes[type];
	                    view['get' + type] = function (byteOffset, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        // ArrayBuffer: we use a typed array of size 1 from original buffer if alignment is good and from slice when it's not
	                        var buffer, offset;
	                        if (size === 1 || (view._start + byteOffset) % size === 0 && littleEndian) {
	                            buffer = view.buffer;
	                            offset = view._start + byteOffset;
	                            view._offset = byteOffset + size;
	                        } else {
	                            // standard decoding functions are still faster than JS implementations, so let's use them via hack
	                            buffer = new Uint8Array(view.getBytes(size, byteOffset, littleEndian)).buffer;
	                            offset = 0;
	                        }

	                        return new global[type + 'Array'](buffer, offset, 1)[0];
	                    };
	                    view['set' + type] = function (byteOffset, value, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        // ArrayBuffer: we use a typed array of size 1 from original buffer if alignment is good and from slice when it's not
	                        var TypedArray = global[type + 'Array'];
	                        if (size === 1 || (view._start + byteOffset) % size === 0 && littleEndian) {
	                            new TypedArray(view.buffer, view._start + byteOffset, 1)[0] = value;
	                            view._offset = byteOffset + size;
	                        } else {
	                            // standard encoding functions are still faster than JS implementations, so let's use them via hack
	                            var bytes = new Uint8Array(size);
	                            new TypedArray(bytes.buffer, 0, 1)[0] = value;
	                            view.setBytes(byteOffset, bytes, littleEndian);
	                        }
	                    };
	                })(type, this);
	            }
	        } else {
	            for (var type in dataTypes) {
	                if (!dataTypes.hasOwnProperty(type)) {
	                    continue;
	                }
	                (function (type, view) {
	                    var size = dataTypes[type];
	                    view['get' + type] = function (byteOffset, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        // Error checking:
	                        if (typeof byteOffset !== 'number') {
	                            throw new TypeError('jDataView byteOffset is not a number');
	                        }
	                        if (byteOffset + size > view.byteLength) {
	                            throw new Error('jDataView (byteOffset + size) value is out of bounds');
	                        }

	                        return view['_get' + type](byteOffset, littleEndian);
	                    };
	                    view['set' + type] = function (byteOffset, value, littleEndian) {
	                        // Handle the lack of endianness
	                        if (littleEndian === undefined) {
	                            littleEndian = view._littleEndian;
	                        }

	                        // Handle the lack of byteOffset
	                        if (byteOffset === undefined) {
	                            byteOffset = view._offset;
	                        }

	                        // Move the internal offset forward
	                        view._offset = byteOffset + size;

	                        // Error checking:
	                        if (typeof byteOffset !== 'number') {
	                            throw new TypeError('jDataView byteOffset is not a number');
	                        }
	                        if (byteOffset + size > view.byteLength) {
	                            throw new Error('jDataView (byteOffset + size) value is out of bounds');
	                        }

	                        view['_set' + type.replace('Uint', 'Int')](byteOffset, value, littleEndian);
	                    };
	                })(type, this);
	            }
	        }

	        for (var type in dataTypes) {
	            if (!dataTypes.hasOwnProperty(type)) {
	                continue;
	            }
	            (function (type, view) {
	                view['write' + type] = function (value, littleEndian) {
	                    this['set' + type](undefined, value, littleEndian);
	                };
	            })(type, this);
	        }
	    };

	    // mostly internal function for wrapping any supported input (String or Array-like) to best suitable buffer format
	    _jDataView.wrapBuffer = function (buffer) {
	        switch (typeof buffer === 'undefined' ? 'undefined' : _typeof(buffer)) {
	            case 'string':
	                buffer = Array.prototype.map.call(buffer, function (char) {
	                    return char.charCodeAt(0) & 0xff;
	                });
	                break;

	            case 'number':
	                buffer = { length: buffer };
	                break;
	        }

	        if ('length' in buffer && !(compatibility.NodeBuffer && buffer instanceof Buffer || compatibility.ArrayBuffer && buffer instanceof ArrayBuffer)) {
	            if (compatibility.NodeBuffer) {
	                buffer = new Buffer(buffer);
	            } else if (compatibility.ArrayBuffer) {
	                var bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
	                buffer = bytes.buffer;
	            } else {
	                if (!(buffer instanceof Array)) {
	                    buffer = Array.prototype.slice.call(buffer);
	                }
	                // as simple Array may contain non-byte values (incl. undefined)
	                for (var i = 0, length = buffer.length; i < length; i++) {
	                    buffer[i] &= 0xff;
	                }
	            }
	        }

	        return buffer;
	    };

	    // left for backward compatibility
	    _jDataView.createBuffer = function () {
	        return _jDataView.wrapBuffer(arguments);
	    };

	    _jDataView.prototype = {
	        compatibility: compatibility,

	        // Helpers

	        _getBytes: function _getBytes(length, byteOffset, littleEndian) {
	            var result;

	            // Handle the lack of endianness
	            if (littleEndian === undefined) {
	                littleEndian = this._littleEndian;
	            }

	            // Handle the lack of byteOffset
	            if (byteOffset === undefined) {
	                byteOffset = this._offset;
	            }

	            if (length === undefined) {
	                length = this.byteLength - byteOffset;
	            }

	            // Error Checking
	            if (typeof byteOffset !== 'number') {
	                throw new TypeError('jDataView byteOffset is not a number');
	            }
	            if (length < 0 || byteOffset + length > this.byteLength) {
	                throw new Error('jDataView length or (byteOffset+length) value is out of bounds');
	            }

	            byteOffset += this._start;

	            if (this._isArrayBuffer) {
	                result = new Uint8Array(this.buffer, byteOffset, length);
	            } else {
	                result = this.buffer.slice(byteOffset, byteOffset + length);
	            }

	            if (!littleEndian && length > 1) {
	                if (!(result instanceof Array)) {
	                    result = Array.prototype.slice.call(result);
	                }

	                result.reverse();
	            }

	            this._offset = byteOffset - this._start + length;

	            return result;
	        },

	        // wrapper for external calls (do not return inner buffer directly to prevent it's modifying)
	        getBytes: function getBytes(length, byteOffset, littleEndian) {
	            var result = this._getBytes.apply(this, arguments);

	            if (!(result instanceof Array)) {
	                result = Array.prototype.slice.call(result);
	            }

	            return result;
	        },

	        setBytes: function setBytes(byteOffset, bytes, littleEndian) {
	            var length = bytes.length;

	            // Handle the lack of endianness
	            if (littleEndian === undefined) {
	                littleEndian = this._littleEndian;
	            }

	            // Handle the lack of byteOffset
	            if (byteOffset === undefined) {
	                byteOffset = this._offset;
	            }

	            // Error Checking
	            if (typeof byteOffset !== 'number') {
	                throw new TypeError('jDataView byteOffset is not a number');
	            }
	            if (length < 0 || byteOffset + length > this.byteLength) {
	                throw new Error('jDataView length or (byteOffset+length) value is out of bounds');
	            }

	            if (!littleEndian && length > 1) {
	                bytes = Array.prototype.slice.call(bytes).reverse();
	            }

	            byteOffset += this._start;

	            if (this._isArrayBuffer) {
	                new Uint8Array(this.buffer, byteOffset, length).set(bytes);
	            } else {
	                if (this._isNodeBuffer) {
	                    new Buffer(bytes).copy(this.buffer, byteOffset);
	                } else {
	                    for (var i = 0; i < length; i++) {
	                        this.buffer[byteOffset + i] = bytes[i];
	                    }
	                }
	            }

	            this._offset = byteOffset - this._start + length;
	        },

	        writeBytes: function writeBytes(bytes, littleEndian) {
	            this.setBytes(undefined, bytes, littleEndian);
	        },

	        getString: function getString(length, byteOffset) {
	            return String.fromCharCode.apply(null, this._getBytes(length, byteOffset, true));
	        },

	        setString: function setString(byteOffset, subString) {
	            this.setBytes(byteOffset, Array.prototype.map.call(subString, function (char) {
	                return char.charCodeAt(0) & 0xff;
	            }), true);
	        },

	        writeString: function writeString(subString) {
	            this.setString(undefined, subString);
	        },

	        getChar: function getChar(byteOffset) {
	            return this.getString(1, byteOffset);
	        },

	        setChar: function setChar(byteOffset, char) {
	            this.setString.apply(this, arguments);
	        },

	        writeChar: function writeChar(char) {
	            this.setChar(undefined, char);
	        },

	        tell: function tell() {
	            return this._offset;
	        },

	        seek: function seek(byteOffset) {
	            if (typeof byteOffset !== 'number') {
	                throw new TypeError('jDataView byteOffset is not a number');
	            }
	            if (byteOffset < 0 || byteOffset > this.byteLength) {
	                throw new Error('jDataView byteOffset value is out of bounds');
	            }

	            return this._offset = byteOffset;
	        },

	        slice: function slice(start, end, forceCopy) {
	            return forceCopy ? new _jDataView(this.getBytes(end - start, start), undefined, undefined, true) : new _jDataView(this.buffer, this._start + start, end - start, this._littleEndian);
	        },

	        // Compatibility functions on a String Buffer

	        _getFloat64: function _getFloat64(byteOffset, littleEndian) {
	            var b = this._getBytes(8, byteOffset, littleEndian),
	                sign = 1 - 2 * (b[7] >> 7),
	                exponent = ((b[7] << 1 & 0xff) << 3 | b[6] >> 4) - ((1 << 10) - 1),


	            // Binary operators such as | and << operate on 32 bit values, using + and Math.pow(2) instead
	            mantissa = (b[6] & 0x0f) * Math.pow(2, 48) + b[5] * Math.pow(2, 40) + b[4] * Math.pow(2, 32) + b[3] * Math.pow(2, 24) + b[2] * Math.pow(2, 16) + b[1] * Math.pow(2, 8) + b[0];

	            if (exponent === 1024) {
	                if (mantissa !== 0) {
	                    return NaN;
	                } else {
	                    return sign * Infinity;
	                }
	            }

	            if (exponent === -1023) {
	                // Denormalized
	                return sign * mantissa * Math.pow(2, -1022 - 52);
	            }

	            return sign * (1 + mantissa * Math.pow(2, -52)) * Math.pow(2, exponent);
	        },

	        _getFloat32: function _getFloat32(byteOffset, littleEndian) {
	            var b = this._getBytes(4, byteOffset, littleEndian),
	                sign = 1 - 2 * (b[3] >> 7),
	                exponent = (b[3] << 1 & 0xff | b[2] >> 7) - 127,
	                mantissa = (b[2] & 0x7f) << 16 | b[1] << 8 | b[0];

	            if (exponent === 128) {
	                if (mantissa !== 0) {
	                    return NaN;
	                } else {
	                    return sign * Infinity;
	                }
	            }

	            if (exponent === -127) {
	                // Denormalized
	                return sign * mantissa * Math.pow(2, -126 - 23);
	            }

	            return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
	        },

	        _getInt32: function _getInt32(byteOffset, littleEndian) {
	            var b = this._getBytes(4, byteOffset, littleEndian);
	            return b[3] << 24 | b[2] << 16 | b[1] << 8 | b[0];
	        },

	        _getUint32: function _getUint32(byteOffset, littleEndian) {
	            return this._getInt32(byteOffset, littleEndian) >>> 0;
	        },

	        _getInt16: function _getInt16(byteOffset, littleEndian) {
	            return this._getUint16(byteOffset, littleEndian) << 16 >> 16;
	        },

	        _getUint16: function _getUint16(byteOffset, littleEndian) {
	            var b = this._getBytes(2, byteOffset, littleEndian);
	            return b[1] << 8 | b[0];
	        },

	        _getInt8: function _getInt8(byteOffset) {
	            return this._getUint8(byteOffset) << 24 >> 24;
	        },

	        _getUint8: function _getUint8(byteOffset) {
	            return this._getBytes(1, byteOffset)[0];
	        },

	        _setBinaryFloat: function _setBinaryFloat(byteOffset, value, mantSize, expSize, littleEndian) {
	            var signBit = value < 0 ? 1 : 0,
	                exponent,
	                mantissa,
	                eMax = ~(-1 << expSize - 1),
	                eMin = 1 - eMax;

	            if (value < 0) {
	                value = -value;
	            }

	            if (value === 0) {
	                exponent = eMin - 1;
	                mantissa = 0;
	            } else if (isNaN(value)) {
	                exponent = eMax + 1;
	                mantissa = 1;
	            } else if (value === Infinity) {
	                exponent = eMax + 1;
	                mantissa = 0;
	            } else {
	                exponent = Math.floor(Math.log(value) / Math.LN2);
	                if (exponent > eMin && exponent <= eMax) {
	                    mantissa = Math.floor((value * Math.pow(2, -exponent) - 1) * Math.pow(2, mantSize));
	                } else {
	                    mantissa = Math.floor(value * Math.pow(2, mantSize - eMin));
	                    exponent = eMin - 1;
	                }
	            }

	            exponent += eMax;

	            var b = [];
	            while (mantSize >= 8) {
	                b.push(mantissa % 256);
	                mantissa = Math.floor(mantissa / 256);
	                mantSize -= 8;
	            }
	            exponent = exponent << mantSize | mantissa;
	            expSize += mantSize;
	            while (expSize >= 8) {
	                b.push(exponent & 0xff);
	                exponent >>>= 8;
	                expSize -= 8;
	            }
	            b.push(signBit << expSize | exponent);

	            this.setBytes(byteOffset, b, littleEndian);
	        },

	        _setFloat32: function _setFloat32(byteOffset, value, littleEndian) {
	            this._setBinaryFloat(byteOffset, value, 23, 8, littleEndian);
	        },

	        _setFloat64: function _setFloat64(byteOffset, value, littleEndian) {
	            this._setBinaryFloat(byteOffset, value, 52, 11, littleEndian);
	        },

	        _setInt32: function _setInt32(byteOffset, value, littleEndian) {
	            this.setBytes(byteOffset, [value & 0xff, value >>> 8 & 0xff, value >>> 16 & 0xff, value >>> 24], littleEndian);
	        },

	        _setInt16: function _setInt16(byteOffset, value, littleEndian) {
	            this.setBytes(byteOffset, [value & 0xff, value >>> 8], littleEndian);
	        },

	        _setInt8: function _setInt8(byteOffset, value) {
	            this.setBytes(byteOffset, [value]);
	        }
	    };
	})();

	(function () {
	    var p = Lib3ds.prototype;

	    p.readFile = function (fileContents) {
	        this.position = 0;
	        this.meshes = [];
	        this.materials = {};

	        var data = new _jDataView(fileContents, 0, // offset
	        undefined, // byte length. let the library calculate that.
	        true); // little endian
	        var chunk = this.readChunk(data);
	        var c = 0;

	        switch (chunk.id) {
	            case MLIBMAGIC:
	            case CMAGIC:
	            case M3DMAGIC:
	                c = this.nextChunk(data, chunk);
	                while (c != 0) {
	                    switch (c) {
	                        case M3D_VERSION:
	                            this.mesh_version = this.readDWord(data);
	                            this.log("M3D_VERSION " + this.mesh_version);
	                            break;
	                        case MDATA:
	                            // Model data
	                            this.resetPosition(data);
	                            this.log("MDATA");
	                            this.readMDATA(data);
	                            break;
	                        case KFDATA: // Keyframe data
	                        default:
	                            this.log("Unknown chunk: " + c.toString(16));
	                            break;
	                    }
	                    c = this.nextChunk(data, chunk);
	                }
	                break;
	            default:
	                this.log("Unknown main chunk: " + c.toString(16));
	                break;
	        }
	        this.log("parsed #" + this.meshes.length + " meshes!");
	    };

	    p.readMDATA = function (data) {
	        var chunk = this.readChunk(data);
	        var c = this.nextChunk(data, chunk);

	        while (c != 0) {
	            switch (c) {
	                case MESH_VERSION:
	                    this.mesh_version = this.readInt(data);
	                    this.log("MESH_VERSION: " + this.mesh_version);
	                    break;
	                case MASTER_SCALE:
	                    this.master_scale = this.readFloat(data);
	                    this.log("MASTER_SCALE: " + this.master_scale);
	                    break;
	                case NAMED_OBJECT:
	                    this.resetPosition(data);
	                    this.log("NAMED OBJECT");
	                    this.readNamedObject(data);
	                    break;
	                case MAT_ENTRY:
	                    this.resetPosition(data);
	                    this.log("MATERIAL ENTRY");
	                    this.readMaterialEntry(data);
	                    break;
	                default:
	                    this.log("Unknown MDATA chunk: " + c.toString(16));
	                    break;
	            }
	            c = this.nextChunk(data, chunk);
	        }
	    };

	    p.readMaterialEntry = function (data) {
	        var chunk = this.readChunk(data);
	        var c = this.nextChunk(data, chunk);

	        var material = new Lib3dsMaterial();

	        while (c != 0) {
	            switch (c) {
	                case MAT_NAME:
	                    material.name = this.readString(data, 64);
	                    this.log(" -> name: " + material.name);
	                    break;
	                case MAT_AMBIENT:
	                    material.ambientColor = this.readColor(data);
	                    this.log(" -> ambientColor: " + material.ambientColor.toString(16));
	                    break;
	                case MAT_DIFFUSE:
	                    material.diffuseColor = this.readColor(data);
	                    this.log(" -> diffuseColor: " + material.diffuseColor.toString(16));
	                    break;
	                case MAT_SPECULAR:
	                    material.specularColor = this.readColor(data);
	                    this.log(" -> specularColor: " + material.specularColor.toString(16));
	                    break;
	                default:
	                    this.log(" -> Unknown material chunk: " + c.toString(16));
	                    break;
	            }
	            c = this.nextChunk(data, chunk);
	        }

	        this.endChunk(chunk);
	        this.materials[material.name] = material;
	    };

	    p.readColor = function (data) {
	        var chunk = this.readChunk(data);

	        var color = 0;
	        switch (chunk.id) {
	            case COLOR_24:
	            case LIN_COLOR_24:
	                var r = this.readByte(data);
	                var g = this.readByte(data);
	                var b = this.readByte(data);
	                color = r << 16 | g << 8 | b;
	                break;
	            case COLOR_F:
	            case LIN_COLOR_F:
	                var r = this.readFloat(data);
	                var g = this.readFloat(data);
	                var b = this.readFloat(data);
	                color = Math.floor(r * 255) << 16 | Math.floor(g * 255) << 8 | Math.floor(b * 255);
	                break;
	            default:
	                this.log("Unknown color chunk: " + c.toString(16));
	                break;
	        }

	        this.endChunk(chunk);
	        return color;
	    };

	    p.readMesh = function (data) {
	        var chunk = this.readChunk(data);
	        var c = this.nextChunk(data, chunk);
	        var mesh = new Lib3dsMesh();
	        var i, j;

	        while (c != 0) {
	            switch (c) {
	                case MESH_COLOR:
	                    mesh.color = this.readByte(data);
	                    this.log(" -> color: " + mesh.color);
	                    break;
	                case POINT_ARRAY:
	                    mesh.points = this.readWord(data);
	                    mesh.pointL = [];
	                    this.log(" -> #points: " + mesh.points + " " + this.position);
	                    for (i = 0; i < mesh.points; i++) {
	                        var vec = [];
	                        for (j = 0; j < 3; j++) {
	                            vec.push(this.readFloat(data));
	                        }
	                        mesh.pointL.push(vec);
	                    }
	                    break;
	                case FACE_ARRAY:
	                    this.resetPosition(data);
	                    this.readFaceArray(data, mesh);
	                    break;
	                case TEX_VERTS:
	                    mesh.texels = this.readWord(data);
	                    mesh.texelL = [];
	                    this.log(" -> #texels: " + mesh.texels);
	                    for (i = 0; i < mesh.texels; i++) {
	                        mesh.texelL.push([this.readFloat(data), this.readFloat(data)]);
	                    }
	                    break;
	                case MESH_MATRIX:
	                case POINT_FLAG_ARRAY:
	                case MESH_TEXTURE_INFO:
	                default:
	                    this.log(" -> Unknown mesh chunk: " + c.toString(16));
	                    break;
	            }
	            c = this.nextChunk(data, chunk);
	        }

	        this.endChunk(chunk);

	        return mesh;
	    };

	    p.readFaceArray = function (data, mesh) {
	        var chunk = this.readChunk(data);
	        var i, j;

	        mesh.faces = this.readWord(data);
	        mesh.faceL = [];

	        this.log(" -> #faces: " + mesh.faces);

	        for (i = 0; i < mesh.faces; ++i) {
	            var face = new Lib3dsFace();

	            face.points = [];
	            face.points.push(this.readWord(data));
	            face.points.push(this.readWord(data));
	            face.points.push(this.readWord(data));

	            // visibility I believe (0 or 1)
	            face.flags = this.readWord(data);

	            mesh.faceL.push(face);
	        }

	        // Thr rest of the FACE_ARRAY chunk is subchunks
	        while (this.position < chunk.end) {
	            var chunk = this.readChunk(data);

	            switch (chunk.id) {
	                case MSH_MAT_GROUP:
	                    this.log(" -> MATERIAL_GROUP");
	                    this.resetPosition(data);
	                    var materialGroup = this.readMaterialGroup(data);

	                    var faceIdxs = materialGroup.faceIdxs;
	                    for (i = 0; i < faceIdxs.length; i++) {
	                        var face = mesh.faceL[faceIdxs[i]];
	                        face.material = materialGroup.name;
	                    }
	                    break;
	                case SMOOTH_GROUP:
	                default:
	                    this.log(" -> Unknown face array chunk: " + c.toString(16));
	                    break;
	            }

	            this.endChunk(chunk);
	        }

	        this.endChunk(chunk);
	    };

	    p.readMaterialGroup = function (data) {
	        var chunk = this.readChunk(data);

	        var materialName = this.readString(data, 64);
	        var numFaces = this.readWord(data);

	        this.log(" --> material name: " + materialName);
	        this.log(" --> num faces: " + numFaces);

	        var faceIdxs = [];
	        for (var i = 0; i < numFaces; ++i) {
	            faceIdxs.push(this.readWord(data));
	        }
	        return { name: materialName, faceIdxs: faceIdxs };
	    };

	    p.readNamedObject = function (data) {
	        var chunk = this.readChunk(data);

	        var name = this.readString(data, 64);

	        this.log(" -> " + name);

	        chunk.cur = this.position;

	        var c = this.nextChunk(data, chunk);

	        while (c != 0) {
	            switch (c) {
	                case N_TRI_OBJECT:
	                    this.resetPosition(data);
	                    var mesh = this.readMesh(data);
	                    this.meshes.push(mesh);
	                    break;
	                default:
	                    this.log("Unknown named object chunk: " + c.toString(16));
	                    break;
	            }
	            c = this.nextChunk(data, chunk);
	        }

	        this.endChunk(chunk);
	    };

	    p.readChunk = function (data) {
	        var chunk = new Lib3dsChunk();
	        chunk.cur = this.position;
	        chunk.id = this.readWord(data);
	        chunk.size = this.readDWord(data);
	        chunk.end = chunk.cur + chunk.size;
	        chunk.cur += 6;
	        return chunk;
	    };

	    p.endChunk = function (chunk) {
	        this.position = chunk.end;
	    };

	    p.nextChunk = function (data, chunk) {
	        if (chunk.cur >= chunk.end) {
	            return 0;
	        }
	        this.position = chunk.cur;
	        try {
	            var next = this.readChunk(data);
	            chunk.cur += next.size;
	            return next.id;
	        } catch (e) {
	            this.log('Unable to read chunk at ' + this.position);
	            return 0;
	        }
	    };

	    p.resetPosition = function (data, chunk) {
	        this.position -= 6;
	    };

	    p.readByte = function (data) {
	        var v = data.getUint8(this.position);
	        this.position += 1;
	        return v;
	    };

	    p.readFloat = function (data) {
	        try {
	            var v = data.getFloat32(this.position);
	            this.position += 4;
	            return v;
	        } catch (e) {
	            this.log("" + e + " " + this.position + " " + data.byteLength);
	        }
	    };

	    p.readInt = function (data) {
	        var v = data.getInt32(this.position);
	        this.position += 4;
	        return v;
	    };

	    p.readShort = function (data) {
	        var v = data.getInt16(this.position);
	        this.position += 2;
	        return v;
	    };

	    p.readDWord = function (data) {
	        var v = data.getUint32(this.position);
	        this.position += 4;
	        return v;
	    };

	    p.readWord = function (data) {
	        var v = data.getUint16(this.position);
	        this.position += 2;
	        return v;
	    };

	    p.readString = function (data, maxLength) {
	        var s = "";
	        for (var i = 0; i < maxLength; i++) {
	            var c = this.readByte(data);
	            if (!c) break;
	            s += String.fromCharCode(c);
	        }
	        return s;
	    };

	    p.log = function (msg) {
	        if (this.debug) {
	            console.log(msg);
	            if (this.element) {
	                this.element.innerHTML += msg + "<br/>";
	            }
	        }
	    };
	})();

	var Lib3dsChunk = function Lib3dsChunk() {
	    this.cur = 0;
	    this.id = 0;
	    this.size = 0;
	    this.end = 0;
	};

	var Lib3dsFace = function Lib3dsFace() {
	    this.flags = 0;
	    this.points = [];
	    this.material = "";
	};

	var Lib3dsMesh = function Lib3dsMesh() {
	    this.next = null;
	    this.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	    this.name = "";
	    this.color = 0;
	    this.points = 0;
	    this.pointL = [];
	    this.flags = 0;
	    this.flagL = [];
	    this.texels = 0;
	    this.texelL = [];
	    this.faces = 0;
	    this.faceL = [];
	};

	var Lib3dsMaterial = function Lib3dsMaterial() {
	    this.name = "";
	    this.ambientColor = 0;
	    this.diffuseColor = 0;
	    this.spectralColor = 0;
	};

	function loadFile(url, callback) {
	    var req = new XMLHttpRequest();

	    if (req.overrideMimeType) {
	        req.overrideMimeType("text/plain; charset=x-user-defined"); // urgh, that took a while to google
	    }

	    req.onreadystatechange = function () {
	        if (req.readyState == 4) {
	            if (req.status == 0 || req.status == 200) {
	                var res = new Lib3ds(false, false);
	                res.readFile(req.responseText);
	                // @debugDiv is some div to log some stuff, ie: document.getElementById("myDebugDiv")
	                // @bDebugging is a boolean indicating whether to log

	                var data = [];

	                // loop over the parsed meshes
	                var i, j;
	                for (i = 0; i < res.meshes.length; i++) {
	                    var vertices = [];
	                    var indices = [];
	                    var textures = [];
	                    // var colors = [];

	                    var mesh = res.meshes[i]; // a mesh is of type Lib3dsMesh

	                    // vertices
	                    for (j = 0; j < mesh.points; j++) {
	                        var vert = mesh.pointL[j]; // a vert is an Array(3)
	                        vertices.push(vert[0]);
	                        vertices.push(vert[1]);
	                        vertices.push(vert[2]);
	                    }

	                    // faces
	                    for (j = 0; j < mesh.faces; j++) {
	                        var face = mesh.faceL[j]; // a face is of type Lib3dsFace

	                        // indices into the vert array above
	                        var idx0 = face.points[0];
	                        var idx1 = face.points[1];
	                        var idx2 = face.points[2];
	                        indices.push(idx0);
	                        indices.push(idx1);
	                        indices.push(idx2);

	                        // so the face vertices are:
	                        // var v0 = mesh.pointL[ idx0 ];
	                        // var v1 = mesh.pointL[ idx1 ];
	                        // var v2 = mesh.pointL[ idx2 ];

	                        // and the material for the face is:
	                        // var materialName = face.material;
	                        // var material = res.materials[materialName];
	                        // if (material) {
	                        //     // var useColor = material.ambientColor;
	                        //     // var useColor = material.specularColor;
	                        //     var useColor = material.diffuseColor;
	                        //     if (useColor !== undefined) {
	                        //         var current = '000000' + Number(useColor).toString(16);
	                        //         colors.push(parseInt(current.substr(-6,2), 16));
	                        //         colors.push(parseInt(current.substr(-4,2), 16));
	                        //         colors.push(parseInt(current.substr(-2,2), 16));
	                        //     }
	                        // }
	                    }

	                    // texels / uv: guess you can use the face indices above
	                    for (j = 0; j < mesh.texels; j++) {
	                        var uv = mesh.texelL[j];
	                        var u = uv[0];
	                        var v = uv[1];
	                        textures.push(v);
	                        textures.push(u);
	                    }

	                    data.push({
	                        vertices: vertices,
	                        indices: indices,
	                        textures: textures,
	                        img: mesh.faceL[0] && mesh.faceL[0].material
	                    });
	                }

	                callback(data, res);
	            }
	        }
	    };
	    req.open("GET", url, true);
	    req.send(null);
	};

	var inBrowser = typeof window !== 'undefined';

	if (inBrowser && window.Easycanvas) {
	    window.Easycanvas.loader3ds = loadFile;
	} else {
	    module.exports = plugin;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56).Buffer))

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return (b64.length * 3 / 4) - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr((len * 3 / 4) - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0; i < l; i += 4) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(55)
	var ieee754 = __webpack_require__(58)
	var isArray = __webpack_require__(57)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ })

/******/ })
});
;