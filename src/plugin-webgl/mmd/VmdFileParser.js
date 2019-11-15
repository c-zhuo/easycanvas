import __inherit from './_Inherit.js';
import { VMD, VMDLight, VMDHeader, VMDMotion, VMDFace, VMDCamera } from './Vmd.js';
import FileParser from './_FileParser.js';

function VMDFileParser(buffer) {
  this.parent = FileParser;
  this.parent.call(this, buffer);
};
__inherit(VMDFileParser, FileParser);

VMDFileParser.prototype._HEADER_STRUCTURE = {
  magic: {type: 'char', isArray: true, size: 30},
  modelName: {type: 'char', isArray: true, size: 20}
};

VMDFileParser.prototype._MOTIONS_STRUCTURE = {
  count: {type: 'uint32'},
  motions: {type: 'object', isArray: true, size: 'count'}
};

VMDFileParser.prototype._MOTION_STRUCTURE = {
  boneName: {type: 'strings', isArray: true, size: 15},
  frameNum: {type: 'uint32'},
  location: {type: 'float', isArray: true, size: 3},
  rotation: {type: 'float', isArray: true, size: 4},
  interpolation: {type: 'uint8', isArray: true, size: 64}
};

VMDFileParser.prototype._FACES_STRUCTURE = {
  count: {type: 'uint32'},
  faces: {type: 'object', isArray: true, size: 'count'}
};

VMDFileParser.prototype._FACE_STRUCTURE = {
  name: {type: 'strings', isArray: true, size: 15},
  frameNum: {type: 'uint32'},
  weight: {type: 'float'}
};

VMDFileParser.prototype._CAMERAS_STRUCTURE = {
  count: {type: 'uint32'},
  cameras: {type: 'object', isArray: true, size: 'count'}
};

VMDFileParser.prototype._CAMERA_STRUCTURE = {
  frameNum: {type: 'uint32'},
  length: {type: 'float'},
  location: {type: 'float', isArray: true, size: 3},
  rotation: {type: 'float', isArray: true, size: 3},
  interpolation: {type: 'uint8', isArray: true, size: 24},
  angle: {type: 'uint32'},
  perspective: {type: 'uint8'}
};

VMDFileParser.prototype._LIGHTS_STRUCTURE = {
  count: {type: 'uint32'},
  lights: {type: 'object', isArray: true, size: 'count'}
};

VMDFileParser.prototype._LIGHT_STRUCTURE = {
  frameNum: {type: 'uint32'},
  color: {type: 'float', isArray: true, size: 3},
  location: {type: 'float', isArray: true, size: 3},
};


VMDFileParser.prototype.parse = function() {
  this.offset = 0;

  var v = new VMD();
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
VMDFileParser.prototype.valid = function() {
  var tmp = this.offset;
  this.offset = 0;

  var v = new VMD();
  this._parseHeader(v);

  this.offset = tmp;

  return v.valid();
};


VMDFileParser.prototype._parseHeader = function(v) {
  var s = this._HEADER_STRUCTURE;
  v.header = new VMDHeader();
  this._parseObject(v.header, s);
};


VMDFileParser.prototype._parseMotions = function(v) {
  var s = this._MOTIONS_STRUCTURE;
  v.motionCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  v.motions.length = 0;
  for(var i = 0; i < v.motionCount; i++) {
    this._parseMotion(v, i);
  }
};


VMDFileParser.prototype._parseMotion = function(v, n) {
  var s = this._MOTION_STRUCTURE;
  var m = new VMDMotion(n);
  this._parseObject(m, s);
  v.motions[n] = m;
};


VMDFileParser.prototype._parseFaces = function(v) {
  var s = this._FACES_STRUCTURE;
  v.faceCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  v.faces.length = 0;
  for(var i = 0; i < v.faceCount; i++) {
    this._parseFace(v, i);
  }
};


VMDFileParser.prototype._parseFace = function(v, n) {
  var s = this._FACE_STRUCTURE;
  var f = new VMDFace(n);
  this._parseObject(f, s);
  v.faces[n] = f;
};


VMDFileParser.prototype._parseCameras = function(v) {
  var s = this._CAMERAS_STRUCTURE;
  v.cameraCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  v.cameras.length = 0;
  for(var i = 0; i < v.cameraCount; i++) {
    this._parseCamera(v, i);
  }
};


VMDFileParser.prototype._parseCamera = function(v, n) {
  var s = this._CAMERA_STRUCTURE;
  var c = new VMDCamera(n);
  this._parseObject(c, s);
  v.cameras[n] = c;
};


VMDFileParser.prototype._parseLights = function(v) {
  var s = this._LIGHTS_STRUCTURE;
  v.lightCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  v.lights.length = 0;
  for(var i = 0; i < v.lightCount; i++) {
    this._parseLight(v, i);
  }
};


VMDFileParser.prototype._parseLight = function(v, n) {
  var s = this._LIGHT_STRUCTURE;
  var l = new VMDLight(n);
  this._parseObject(l, s);
  v.lights[n] = l;
};

export default VMDFileParser;
