import __inherit from './_Inherit.js';
import FileParser from './_FileParser.js';
import {
  PMD, PMDHeader, PMDVertex, PMDVertexIndex, PMDMaterial,
  PMDBone, PMDIK, PMDFace, PMDFaceVertex, PMDFaceDisplay,
  PMDBoneFrameName, PMDBoneDisplay, PMDEnglishHeader,
  PMDEnglishBoneName, PMDEnglishFaceName, PMDEnglishBoneFrameName,
  PMDToonTexture, PMDRigidBody, PMDJoint,
} from './Pmd.js';

function PMDFileParser(buffer) {
  this.parent = FileParser;
  this.parent.call(this, buffer);
  this.englishCompatibility = false;
};
__inherit(PMDFileParser, FileParser);

PMDFileParser.prototype._HEADER_STRUCTURE = {
  magic: {type: 'char', isArray: true, size: 3},
  version: {type: 'float'},
  modelName: {type: 'char', isArray: true, size: 20},
  comment: {type: 'char', isArray: true, size: 256}
};

PMDFileParser.prototype._VERTICES_STRUCTURE = {
  count: {type: 'uint32'},
  vertices: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._VERTEX_STRUCTURE = {
  position: {type: 'float', isArray: true, size: 3},
  normal: {type: 'float', isArray: true, size: 3},
  uv: {type: 'float', isArray: true, size: 2},
  boneIndices: {type: 'uint16', isArray: true, size: 2},
  boneWeight: {type: 'uint8'},
  edgeFlag: {type: 'uint8'}
};

PMDFileParser.prototype._VERTEX_INDICES_STRUCTURE = {
  count: {type: 'uint32'},
  // Note: type can be 'uint16'
  indices: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._VERTEX_INDEX_STRUCTURE = {
  index: {type: 'uint16'}
};


PMDFileParser.prototype._MATERIALS_STRUCTURE = {
  count: {type: 'uint32'},
  materials: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._MATERIAL_STRUCTURE = {
  color: {type: 'float', isArray: true, size: 4},
  specularity: {type: 'float'},
  specularColor: {type: 'float', isArray: true, size: 3},
  mirrorColor: {type: 'float', isArray: true, size: 3},
  tuneIndex: {type: 'uint8'},
  edgeFlag: {type: 'uint8'},
  vertexCount: {type: 'uint32'},
  fileName: {type: 'char', isArray: true, size: 20}
};

PMDFileParser.prototype._BONES_STRUCTURE = {
  count: {type: 'uint16'},
  bones: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._BONE_STRUCTURE = {
  name: {type: 'strings', isArray: true, size: 20},
  parentIndex: {type: 'uint16'},
  tailIndex: {type: 'uint16'},
  type: {type: 'uint8'},
  ikIndex: {type: 'uint16'},
  position: {type: 'float', isArray: true, size: 3}
};

PMDFileParser.prototype._IKS_STRUCTURE = {
  count: {type: 'uint16'},
  iks: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._IK_STRUCTURE = {
  index: {type: 'uint16'},
  targetBoneIndex: {type: 'uint16'},
  chainLength: {type: 'uint8'},
  iteration: {type: 'uint16'},
  limitation: {type: 'float'},
  childBoneIndices: {type: 'uint16', isArray: true, size: 'chainLength'}
};

PMDFileParser.prototype._FACES_STRUCTURE = {
  count: {type: 'uint16'},
  faces: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._FACE_STRUCTURE = {
  name: {type: 'strings', isArray: true, size: 20},
  vertexCount: {type: 'uint32'},
  type: {type: 'uint8'},
  vertices: {type: 'object', isArray: true, size: 'vertexCount'}
};

PMDFileParser.prototype._FACE_VERTEX_STRUCTURE = {
  index: {type: 'uint32'},
  position: {type: 'float', isArray: true, size: 3}
};

PMDFileParser.prototype._FACE_DISPLAYS_STRUCTURE = {
  count: {type: 'uint8'},
  indices: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._FACE_DISPLAY_STRUCTURE = {
  index: {type: 'uint16'}
};

PMDFileParser.prototype._BONE_FRAME_NAMES_STRUCTURE = {
  count: {type: 'uint8'},
  names: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._BONE_FRAME_NAME_STRUCTURE = {
  name: {type: 'strings', isArray: true, size: 50}
};

PMDFileParser.prototype._BONE_DISPLAYS_STRUCTURE = {
  count: {type: 'uint32'},
  displays: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._BONE_DISPLAY_STRUCTURE = {
  index: {type: 'uint16'},
  frameIndex: {type: 'uint8'}
};

PMDFileParser.prototype._ENGLISH_HEADER_STRUCTURE = {
  compatibility: {type: 'uint8'},
  modelName: {type: 'char', isArray: true, size: 20},
  comment: {type: 'char', isArray: true, size: 256}
};

PMDFileParser.prototype._ENGLISH_BONE_NAME_STRUCTURE = {
  name: {type: 'char', isArray: true, size: 20}
};

PMDFileParser.prototype._ENGLISH_FACE_NAME_STRUCTURE = {
  name: {type: 'char', isArray: true, size: 20}
};

PMDFileParser.prototype._ENGLISH_BONE_FRAME_NAME_STRUCTURE = {
  name: {type: 'char', isArray: true, size: 50}
};

PMDFileParser.prototype._TOON_TEXTURE_STRUCTURE = {
  fileName: {type: 'char', isArray: true, size: 100}
};

PMDFileParser.prototype._RIGID_BODIES_STRUCTURE = {
  count: {type: 'uint32'},
  bodies: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._RIGID_BODY_STRUCTURE = {
  name: {type: 'strings', isArray: true, size: 20},
  boneIndex: {type: 'uint16'},
  groupIndex: {type: 'uint8'},
  groupTarget: {type: 'uint16'},
  shapeType: {type: 'uint8'},
  width: {type: 'float'},
  height: {type: 'float'},
  depth: {type: 'float'},
  position: {type: 'float', isArray: true, size: 3},
  rotation: {type: 'float', isArray: true, size: 3},
  weight: {type: 'float'},
  positionDim: {type: 'float'},
  rotationDim: {type: 'float'},
  recoil: {type: 'float'},
  friction: {type: 'float'},
  type: {type: 'uint8'}
};

PMDFileParser.prototype._JOINTS_STRUCTURE = {
  count: {type: 'uint32'},
  joints: {type: 'object', isArray: true, size: 'count'}
};

PMDFileParser.prototype._JOINT_STRUCTURE = {
  name: {type: 'strings', isArray: true, size: 20},
  rigidBody1: {type: 'uint32'},
  rigidBody2: {type: 'uint32'},
  position: {type: 'float', isArray: true, size: 3},
  rotation: {type: 'float', isArray: true, size: 3},
  translationLimitation1: {type: 'float', isArray: true, size: 3},
  translationLimitation2: {type: 'float', isArray: true, size: 3},
  rotationLimitation1: {type: 'float', isArray: true, size: 3},
  rotationLimitation2: {type: 'float', isArray: true, size: 3},
  springPosition: {type: 'float', isArray: true, size: 3},
  springRotation: {type: 'float', isArray: true, size: 3}
};


PMDFileParser.prototype.parse = function() {
  this.offset = 0;

  var p = new PMD();
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
  if(this.englishCompatibility) {
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
PMDFileParser.prototype.valid = function() {
  var tmp = this.offset;
  this.offset = 0;

  var p = new PMD();
  this._parseHeader(p);

  this.offset = tmp;

  return p.valid();
};


PMDFileParser.prototype._parseHeader = function(p) {
  var s = this._HEADER_STRUCTURE;
  p.header = new PMDHeader();
  this._parseObject(p.header, s);
};


PMDFileParser.prototype._parseVertices = function(p) {
  var s = this._VERTICES_STRUCTURE;
  p.vertexCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.vertices.length = 0;
  for(var i = 0; i < p.vertexCount; i++) {
    this._parseVertex(p, i);
  }
};


PMDFileParser.prototype._parseVertex = function(p, n) {
  var s = this._VERTEX_STRUCTURE;
  var v = new PMDVertex(n);
  this._parseObject(v, s);
  p.vertices[n] = v;
};


PMDFileParser.prototype._parseVertexIndices = function(p) {
  var s = this._VERTEX_INDICES_STRUCTURE;
  p.vertexIndexCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.vertexIndices.length = 0;
  for(var i = 0; i < p.vertexIndexCount; i++) {
    this._parseVertexIndex(p, i);
  }
};


PMDFileParser.prototype._parseVertexIndex = function(p, n) {
  var s = this._VERTEX_INDEX_STRUCTURE;
  var v = new PMDVertexIndex(n);
  this._parseObject(v, s);
  p.vertexIndices[n] = v;
};


PMDFileParser.prototype._parseMaterials = function(p) {
  var s = this._MATERIALS_STRUCTURE;
  p.materialCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.materials.length = 0;
  for(var i = 0; i < p.materialCount; i++) {
    this._parseMaterial(p, i);
  }
};


PMDFileParser.prototype._parseMaterial = function(p, n) {
  var s = this._MATERIAL_STRUCTURE;
  var m = new PMDMaterial(n);
  this._parseObject(m, s);
  p.materials[n] = m;
};


PMDFileParser.prototype._parseBones = function(p) {
  var s = this._BONES_STRUCTURE;
  p.boneCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.bones.length = 0;
  for(var i = 0; i < p.boneCount; i++) {
    this._parseBone(p, i);
  }
};


PMDFileParser.prototype._parseBone = function(p, n) {
  var s = this._BONE_STRUCTURE;
  var b = new PMDBone(n);
  this._parseObject(b, s);
  p.bones[n] = b;
};


PMDFileParser.prototype._parseIKs = function(p) {
  var s = this._IKS_STRUCTURE;
  p.ikCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.iks.length = 0;
  for(var i = 0; i < p.ikCount; i++) {
    this._parseIK(p, i);
  }
};


/**
 * NOTE: specialized _parseObject() because IK has a variable length array
 * TODO: be combined with general function _parseObject()
 *       to remove duplicated code.
 */
PMDFileParser.prototype._parseIK = function(p, n) {
  var s = this._IK_STRUCTURE;
  var ik = new PMDIK(n);

  for(var key in s) {
    if(key == 'childBoneIndices')
      continue;

    ik[key] = this._getValue(s[key], this.offset);
    this.offset += this._sizeof(s[key]);
  }

  ik.childBoneIndices = [];
  var size = this._sizeofScalar(s.childBoneIndices);
  for(var i = 0; i < ik.chainLength; i++) {
    ik.childBoneIndices[i] =
      this._getValueScalar(s.childBoneIndices, this.offset);
    this.offset += size;
  }
  p.iks[n] = ik;
};


PMDFileParser.prototype._parseFaces = function(p) {
  var s = this._FACES_STRUCTURE;
  p.faceCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.faces.length = 0;
  for(var i = 0; i < p.faceCount; i++) {
    this._parseFace(p, i);
  }
};


/**
 * NOTE: specialized _parseObject() because Face has a variable length array
 * TODO: be combined with general function _parseObject()
 *       to remove duplicated code.
 */
PMDFileParser.prototype._parseFace = function(p, n) {
  var s = this._FACE_STRUCTURE;
  var f = new PMDFace(n);

  for(var key in s) {
    if(key == 'vertices')
      continue;

    f[key] = this._getValue(s[key], this.offset);
    this.offset += this._sizeof(s[key]);
  }

  f.vertices = [];
  for(var i = 0; i < f.vertexCount; i++) {
    this._parseFaceVertex(f, i, f.type);
  }
  p.faces[n] = f;
};


PMDFileParser.prototype._parseFaceVertex = function(f, n, type) {
  var s = this._FACE_VERTEX_STRUCTURE;
  var v = new PMDFaceVertex(n, type);
  this._parseObject(v, s);
  f.vertices[n] = v;
};


PMDFileParser.prototype._parseFaceDisplays = function(p) {
  var s = this._FACE_DISPLAYS_STRUCTURE;
  p.faceDisplayCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.faceDisplays.length = 0;
  for(var i = 0; i < p.faceDisplayCount; i++) {
    this._parseFaceDisplay(p, i);
  }
};


PMDFileParser.prototype._parseFaceDisplay = function(p, n) {
  var s = this._FACE_DISPLAY_STRUCTURE;
  var d = new PMDFaceDisplay(n);
  this._parseObject(d, s);
  p.faceDisplays[n] = d;
};


PMDFileParser.prototype._parseBoneFrameNames = function(p) {
  var s = this._BONE_FRAME_NAMES_STRUCTURE;
  p.boneFrameNameCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.boneFrameNames.length = 0;
  for(var i = 0; i < p.boneFrameNameCount; i++) {
    this._parseBoneFrameName(p, i);
  }
};


PMDFileParser.prototype._parseBoneFrameName = function(p, n) {
  var s = this._BONE_FRAME_NAME_STRUCTURE;
  var d = new PMDBoneFrameName(n);
  this._parseObject(d, s);
  p.boneFrameNames[n] = d;
};


PMDFileParser.prototype._parseBoneDisplays = function(p) {
  var s = this._BONE_DISPLAYS_STRUCTURE;
  p.boneDisplayCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.boneDisplays.length = 0;
  for(var i = 0; i < p.boneDisplayCount; i++) {
    this._parseBoneDisplay(p, i);
  }
};


PMDFileParser.prototype._parseBoneDisplay = function(p, n) {
  var s = this._BONE_DISPLAY_STRUCTURE;
  var d = new PMDBoneDisplay(n);
  this._parseObject(d, s);
  p.boneDisplays[n] = d;
};


PMDFileParser.prototype._parseEnglishHeader = function(p) {
  var s = this._ENGLISH_HEADER_STRUCTURE;
  p.englishHeader = new PMDEnglishHeader();
  this._parseObject(p.englishHeader, s);

  if(p.englishHeader.compatibility == 0) {
    this.offset -= this._sizeofObject(s);
    this.offset += this._sizeof(s.compatibility);
    this.englishCompatibility = false;
  } else {
    this.englishCompatibility = true;
  }
};


PMDFileParser.prototype._parseEnglishBoneNames = function(p) {
  var s = this._ENGLISH_BONE_NAME_STRUCTURE;
  p.englishBoneNames.length = 0;
  for(var i = 0; i < p.boneCount; i++) {
    var b = new PMDEnglishBoneName(i);
    this._parseObject(b, s);
    p.englishBoneNames[i] = b;
  }
};


PMDFileParser.prototype._parseEnglishFaceNames = function(p) {
  var s = this._ENGLISH_FACE_NAME_STRUCTURE;
  p.englishFaceNames.length = 0;
  for(var i = 0; i < p.faceCount-1; i++) {
    var b = new PMDEnglishFaceName(i);
    this._parseObject(b, s);
    p.englishFaceNames[i] = b;
  }
};


PMDFileParser.prototype._parseEnglishBoneFrameNames = function(p) {
  var s = this._ENGLISH_BONE_FRAME_NAME_STRUCTURE;
  p.englishBoneFrameNames.length = 0;
  for(var i = 0; i < p.boneFrameNameCount; i++) {
    var n = new PMDEnglishBoneFrameName(i);
    this._parseObject(n, s);
    p.englishBoneFrameNames[i] = n;
  }
};


PMDFileParser.prototype._parseToonTextures = function(p) {
  var s = this._TOON_TEXTURE_STRUCTURE;
  p.toonTextureCount = 10;
  p.toonTextures.length = 0;
  for(var i = 0; i < p.toonTextureCount; i++) {
    var t = new PMDToonTexture(i);
    this._parseObject(t, s);
    p.toonTextures[i] = t;
  }
};


PMDFileParser.prototype._parseRigidBodies = function(p) {
  var s = this._RIGID_BODIES_STRUCTURE;
  p.rigidBodyCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.rigidBodies.length = 0;
  for(var i = 0; i < p.rigidBodyCount; i++) {
    this._parseRigidBody(p, i);
  }
};


PMDFileParser.prototype._parseRigidBody = function(p, n) {
  var s = this._RIGID_BODY_STRUCTURE;
  var b = new PMDRigidBody(n);
  this._parseObject(b, s);
  p.rigidBodies[n] = b;
};


PMDFileParser.prototype._parseJoints = function(p) {
  var s = this._JOINTS_STRUCTURE;
  p.jointCount = this._getValue(s.count, this.offset);
  this.offset += this._sizeof(s.count);

  p.joints.length = 0;
  for(var i = 0; i < p.jointCount; i++) {
    this._parseJoint(p, i);
  }
};


PMDFileParser.prototype._parseJoint = function(p, n) {
  var s = this._JOINT_STRUCTURE;
  var j = new PMDJoint(n);
  this._parseObject(j, s);
  p.joints[n] = j;
};

export default PMDFileParser;

