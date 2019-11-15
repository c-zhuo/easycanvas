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
  this.vertexIndices = []
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


PMD.prototype.valid = function() {
  return this.header.valid();
};


PMD.prototype.getParentBone = function(bone) {
  return this.bones[bone.parentIndex];
};


PMD.prototype.loadImages = function(baseURL, callback) {
  var loader = new PMDImageLoader(this, baseURL);
  loader.load(callback);
};


PMD.prototype.setup = function() {
  for(var i = 0; i < this.vertexCount; i++) {
    this.vertices[i].setup();
  }

  for(var i = 0; i < this.boneCount; i++) {
    this.bonesHash[this.bones[i].name] = this.bones[i];
  }

  for(var i = 0; i < this.faceCount; i++) {
    this.facesHash[this.faces[i].name] = this.faces[i];
  }
//  this.toRight();

  this._keepSomeBonesInfo();
};


PMD.prototype.toRight = function() {
  for(var i = 0; i < this.vertexCount; i++) {
    this.vertices[i].toRight();
  }

  for(var i = 0; i < this.boneCount; i++) {
    this.bones[i].toRight();
  }

  for(var i = 0; i < this.faceCount; i++) {
    this.faces[i].toRight();
  }

  for(var i = 0; i < this.rigidBodyCount; i++) {
    this.rigidBodies[i].toRight();
  }

  for(var i = 0; i < this.jointCount; i++) {
    this.joints[i].toRight();
  }
};


/**
 * TODO: change strings if sjis-lib is used
 */
PMD.prototype._keepSomeBonesInfo = function() {
  // �Z���^�[, ������, �E����, ����, �E��
  this._keepBoneInfo(this.centerBone,    '0x830x5a0x830x930x830x5e0x810x5b');
  this._keepBoneInfo(this.leftFootBone,  '0x8d0xb60x910xab0x8e0xf1');
  this._keepBoneInfo(this.rightFootBone, '0x890x450x910xab0x8e0xf1');
  this._keepBoneInfo(this.leftEyeBone,   '0x8d0xb60x960xda');
  this._keepBoneInfo(this.rightEyeBone,  '0x890x450x960xda');
};


PMD.prototype._keepBoneInfo = function(obj, name) {
  var boneNum = this._findBoneNumberByName(name);
  if(boneNum !== null) {
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


PMD.prototype._findBoneNumberByName = function(name) {
  for(var i = 0; i < this.boneCount; i++) {
    if(this.bones[i].name == name)
      return i;
  }
  return null;
};


/**
 * TODO: consider the algorithm again.
 */
PMD.prototype._getAveragePositionOfBone = function(bone) {
  var num = 0;
  var pos = [0, 0, 0];
  for(var i = 0; i < this.vertexCount; i++) {
    var v = this.vertices[i];
    // TODO: consider boneWeight?
    if(v.boneIndices[0] == bone.id || v.boneIndices[1] == bone.id) {
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
  if(num != 0) {
    pos[0] = pos[0] / num;
    pos[1] = pos[1] / num;
    pos[2] = pos[2] / num;
  }
  return pos;
};


PMD.prototype.getBoneNames = function() {
  var array = [];
  for(var i = 0; i < this.boneCount; i++) {
    array[i] = this.bones[i].name;
  }
  return array;
};


PMD.prototype.getFaceNames = function() {
  var array = [];
  for(var i = 0; i < this.faceCount; i++) {
    array[i] = this.faces[i].name;
  }
  return array;
};


PMD.prototype.dump = function() {
  var str = '';

  str += 'vertexCount: '        + this.vertexCount        + '\n';
  str += 'vertexIndexCount: '   + this.vertexIndexCount   + '\n';
  str += 'materialCount: '      + this.materialCount      + '\n';
  str += 'boneCount: '          + this.boneCount          + '\n';
  str += 'ikCount: '            + this.ikCount            + '\n';
  str += 'faceCount: '          + this.faceCount          + '\n';
  str += 'faceDisplayCount: '   + this.faceDisplayCount   + '\n';
  str += 'boneFrameNameCount: ' + this.boneFrameNameCount + '\n';
  str += 'boneDisplayCount: '   + this.boneDisplayCount   + '\n';
  str += 'toonTextureCount: '   + this.toonTextureCount   + '\n';
  str += 'rigidBodyCount: '     + this.rigidBodyCount     + '\n';
  str += 'jointCount: '         + this.jointCount         + '\n';
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


PMD.prototype.boneNumsOfMaterials = function() {
  var offset = 0;
  var result = [];
  for(var i = 0; i < this.materialCount; i++) {
    var array = [];
    for(var j = 0; j < this.boneCount; j++) {
      array[j] = 0;
    }

    var count = 0;
    var num = this.materials[i].vertexCount;
    for(var j = 0; j < num; j++) {
      var v = this.vertices[this.vertexIndices[offset + j].index];
      for(var k = 0; k < v.boneIndices.length; k++) {
        var index = v.boneIndices[k];
        if(array[index] == 0)
          count++;
        array[index]++;
      }
    }
    result.push(count);
    offset += num;
  }
  return result;
};


PMD.prototype._dumpHeader = function() {
  var str = '';
  str += '-- Header --\n';
  str += this.header.dump();
  str += '\n';
  return str;
};


PMD.prototype._dumpEnglishHeader = function() {
  var str = '';
  str += '-- Header(English) --\n';
  str += this.englishHeader.dump();
  str += '\n';
  return str;
};


PMD.prototype._dumpVertices = function() {
  var str = '';
  str += '-- Vertices --\n';
  for(var i = 0; i < this.vertexCount; i++) {
    str += this.vertices[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpVertexIndices = function() {
  var str = '';
  str += '-- VertexIndices --\n';
  for(var i = 0; i < this.vertexIndexCount; i++) {
    str += this.vertexIndices[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpMaterials = function() {
  var str = '';
  str += '-- Materials --\n';
  for(var i = 0; i < this.materialCount; i++) {
    str += this.materials[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpBones = function() {
  var str = '';
  str += '-- Bones --\n';
  for(var i = 0; i < this.boneCount; i++) {
    str += this.bones[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpIKs = function() {
  var str = '';
  str += '-- IKs --\n';
  for(var i = 0; i < this.ikCount; i++) {
    str += this.iks[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpFaces = function() {
  var str = '';
  str += '-- Faces --\n';
  for(var i = 0; i < this.faceCount; i++) {
    str += this.faces[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpFaceDisplays = function() {
  var str = '';
  str += '-- Face Displays --\n';
  for(var i = 0; i < this.faceDisplayCount; i++) {
    str += this.faceDisplays[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpBoneFrameNames = function() {
  var str = '';
  str += '-- Bone Frame Names --\n';
  for(var i = 0; i < this.boneFrameNameCount; i++) {
    str += this.boneFrameNames[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpBoneDisplays = function() {
  var str = '';
  str += '-- Bone Displays --\n';
  for(var i = 0; i < this.boneDisplayCount; i++) {
    str += this.boneDisplays[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpEnglishBoneNames = function() {
  var str = '';
  str += '-- Bone Names(English) --\n';
  for(var i = 0; i < this.boneCount; i++) {
    str += this.englishBoneNames[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpEnglishFaceNames = function() {
  var str = '';
  str += '-- Face Names(English) --\n';
  for(var i = 0; i < this.faceCount-1; i++) {
    str += this.englishFaceNames[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpEnglishBoneFrameNames = function() {
  var str = '';
  str += '-- Bone Frame Names(English) --\n';
  for(var i = 0; i < this.boneFrameNameCount; i++) {
    str += this.englishBoneFrameNames[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpToonTextures = function() {
  var str = '';
  str += '-- Toon Textures --\n';
  for(var i = 0; i < this.toonTextureCount; i++) {
    str += this.toonTextures[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpRigidBodies = function() {
  var str = '';
  str += '-- Rigid Bodies --\n';
  for(var i = 0; i < this.rigidBodyCount; i++) {
    str += this.rigidBodies[i].dump();
  }
  str += '\n';
  return str;
};


PMD.prototype._dumpJoints = function() {
  var str = '';
  str += '-- Joints --\n';
  for(var i = 0; i < this.jointCount; i++) {
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


PMDHeader.prototype.valid = function() {
  return (this.magic == 'Pmd');
};


PMDHeader.prototype.dump = function() {
  var str = '';
  str += 'magic: '      + this.magic     + '\n';
  str += 'version: '    + this.version   + '\n';
  str += 'model_name: ' + this.modelName + '\n';
  str += 'comment: '    + this.comment   + '\n';
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


PMDVertex.prototype.setup = function() {
  this.boneWeightFloat1 = this.boneWeight/100;
  this.boneWeightFloat2 = (100-this.boneWeight)/100;
};


PMDVertex.prototype.dump = function() {
  var str = '';
  str += 'id: '          + this.id          + '\n';
  str += 'position: '    + this.position    + '\n';
  str += 'normal: '      + this.normal      + '\n';
  str += 'uv: '          + this.uv          + '\n';
  str += 'boneIndices: ' + this.boneIndices + '\n';
  str += 'boneWeight: '  + this.boneWeight  + '\n';
  str += 'edgeFlag: '    + this.edgeFlag    + '\n';
  return str;
};


PMDVertex.prototype.toRight = function() {
  this.position[2] = -this.position[2];
  this.normal[2] = -this.normal[2];
};



function PMDVertexIndex(id) {
  this.id = id;
  this.index = null;
};


PMDVertexIndex.prototype.dump = function() {
  var str = '';
  str += 'id: '    + this.id    + '\n';
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
PMDMaterial.prototype.convertedFileName = function() {
  var filename = this.fileName.replace('.tga', '.png');

  // TODO: ignore sphere map so far
  var index;
  if((index = filename.lastIndexOf('*')) >= 0) {
    filename = filename.substring(0, index);
  }

  return filename;
};


/**
 * TODO: temporal
 */
PMDMaterial.prototype.hasSphereTexture = function() {
  if(this.fileName.lastIndexOf('.sph') >= 0 ||
     this.fileName.lastIndexOf('.spa') >= 0)
    return true;

  return false;
};


/**
 * TODO: temporal
 */
PMDMaterial.prototype.isSphereMapAddition = function() {
  var filename = this.fileName;

  if(filename.lastIndexOf('.spa') >= 0)
    return true;

  return false;
};


/**
 * TODO: temporal
 */
PMDMaterial.prototype.sphereMapFileName = function() {
  var filename = this.fileName;
  var index;
  if((index = filename.lastIndexOf('*')) >= 0) {
    filename = filename.slice(index+1);
  }
  if((index = filename.lastIndexOf('+')) >= 0) {
    filename = filename.slice(index+1);
  }
  return filename;
};


PMDMaterial.prototype.hasToon = function() {
  return this.tuneIndex >= 10 ? false : true;
};


PMDMaterial.prototype.dump = function() {
  var str = '';
  str += 'id: '            + this.id            + '\n';
  str += 'color: '         + this.color         + '\n';
  str += 'specularity: '   + this.specularity   + '\n';
  str += 'specularColor: ' + this.specularColor + '\n';
  str += 'mirrorColor: '   + this.mirrorColor   + '\n';
  str += 'tuneIndex: '     + this.tuneIndex     + '\n';
  str += 'edgeFlag: '      + this.edgeFlag      + '\n';
  str += 'vertexCount: '   + this.vertexCount   + '\n';
  str += 'fileName: '      + this.fileName      + '\n';
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


PMDBone.prototype.isKnee = function() {
  // TODO: change this parameter if name type changes.
  return this.name.indexOf('0x820xd00x820xb4') >= 0;
};


PMDBone.prototype.dump = function() {
  var str = '';
  str += 'id: '          + this.id          + '\n';
  str += 'name: '        + this.name        + '\n';
  str += 'parentIndex: ' + this.parentIndex + '\n';
  str += 'tailIndex: '   + this.tailIndex   + '\n';
  str += 'type: '        + this.type        + '\n';
  str += 'ikIndex: '     + this.ikIndex     + '\n';
  str += 'position: '    + this.position    + '\n';
  return str;
};


PMDBone.prototype.toRight = function() {
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


PMDIK.prototype.dump = function() {
  var str = '';
  str += 'id: '               + this.id               + '\n';
  str += 'index: '            + this.index            + '\n';
  str += 'targetBoneIndex: '  + this.targetBoneIndex  + '\n';
  str += 'chainLength: '      + this.chainLength      + '\n';
  str += 'iteration: '        + this.iteration        + '\n';
  str += 'limitation: '       + this.limitation       + '\n';
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


PMDFace.prototype.dump = function() {
  var str = '';
  str += 'id: ' + this.id + '\n';
  str += 'name: ' + this.name + '\n';
  str += 'vertexCount: ' + this.vertexCount + '\n';
  str += 'type: ' + this.type + '\n';

  for(var i = 0; i < this.vertices.length; i++) {
    str += this.vertices[i].dump();
  }

  return str;
};


PMDFace.prototype.toRight = function() {
  for(var i = 0; i < this.vertices.length; i++) {
    this.vertices[i].toRight();
  }
};



function PMDFaceVertex(id, type) {
  this.id = id;
  this.type = type;
  this.index = null;
  this.position = null;
};


PMDFaceVertex.prototype.dump = function() {
  var str = '';
  str += 'id: '       + this.id       + '\n';
//  str += 'type: '     + this.type     + '\n';
  str += 'index: '    + this.index    + '\n';
  str += 'position: ' + this.position + '\n';
  return str;
};


PMDFaceVertex.prototype.toRight = function() {
  this.position[2] = -this.position[2];
};



function PMDFaceDisplay(id) {
  this.id = id;
  this.index = null;
};


PMDFaceDisplay.prototype.dump = function() {
  var str = '';
  str += 'id: '    + this.id    + '\n';
  str += 'index: ' + this.index + '\n';
  return str;
};



function PMDBoneFrameName(id) {
  this.id = id;
  this.name = null;
};


PMDBoneFrameName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};



function PMDBoneDisplay(id) {
  this.id = id;
  this.index = null;
  this.frameIndex = null;
};


PMDBoneDisplay.prototype.dump = function() {
  var str = '';
  str += 'id: '         + this.id         + '\n';
  str += 'index: '      + this.index      + '\n';
  str += 'frameIndex: ' + this.frameIndex + '\n';
  return str;
};



function PMDEnglishHeader() {
  this.compatibility = null;
  this.modelName = null;
  this.comment = null;
};


PMDEnglishHeader.prototype.dump = function() {
  var str = '';
  str += 'compatibility: ' + this.compatibility + '\n';
  str += 'modelName:     ' + this.modelName     + '\n';
  str += 'comment: '       + this.comment       + '\n';
  return str;
};



function PMDEnglishBoneName(id) {
  this.id = id;
  this.name = null;
};


PMDEnglishBoneName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};



function PMDEnglishFaceName(id) {
  this.id = id;
  this.name = null;
};


PMDEnglishFaceName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};



function PMDEnglishBoneFrameName(id) {
  this.id = id;
  this.name = null;
};


PMDEnglishBoneFrameName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};



function PMDToonTexture(id) {
  this.id = id;
  this.fileName = null;
};


PMDToonTexture.prototype.dump = function() {
  var str = '';
  str += 'id: '       + this.id       + '\n';
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


PMDRigidBody.prototype.dump = function() {
  var str = '';
  str += 'id: '          + this.id          + '\n';
  str += 'name: '        + this.name        + '\n';
  str += 'boneIndex: '   + this.boneIndex   + '\n';
  str += 'groupIndex: '  + this.groupIndex  + '\n';
  str += 'groupTarget: ' + this.groupTarget + '\n';
  str += 'shapeType: '   + this.shapeType   + '\n';
  str += 'width: '       + this.width       + '\n';
  str += 'height: '      + this.height      + '\n';
  str += 'depth: '       + this.depth       + '\n';
  str += 'position: '    + this.position    + '\n';
  str += 'rotation: '    + this.rotation    + '\n';
  str += 'weight: '      + this.weight      + '\n';
  str += 'positionDim: ' + this.positionDim + '\n';
  str += 'rotationDim: ' + this.rotationDim + '\n';
  str += 'recoil: '      + this.recoil      + '\n';
  str += 'friction: '    + this.friction    + '\n';
  str += 'type: '        + this.type        + '\n';
  return str;
};


PMDRigidBody.prototype.toRight = function() {
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


PMDJoint.prototype.dump = function() {
  var str = '';
  str += 'id: '                     + this.id                     + '\n';
  str += 'name: '                   + this.name                   + '\n';
  str += 'rigidBody1: '             + this.rigidBody1             + '\n';
  str += 'rigidBody2: '             + this.rigidBody2             + '\n';
  str += 'position: '               + this.position               + '\n';
  str += 'rotation: '               + this.rotation               + '\n';
  str += 'translationLimitation1: ' + this.translationLimitation1 + '\n';
  str += 'translationLimitation2: ' + this.translationLimitation2 + '\n';
  str += 'rotationLimitation1: '    + this.rotationLimitation1    + '\n';
  str += 'rotationLimitation2: '    + this.rotationLimitation2    + '\n';
  str += 'springPosition: '         + this.springPosition         + '\n';
  str += 'springRotation: '         + this.springRotation         + '\n';
  return str;
};


PMDJoint.prototype.toRight = function() {
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
PMDImageLoader.prototype.load = function(callback) {
  this.pmd.images.length = 0;
  this.pmd.toonImages.length = 0;
  this.pmd.sphereImages.length = 0;

  this.errorImageNum = 0;
  this.loadedImageNum = 0;
  this.noImageNum = 0;

  for(var i = 0; i < this.pmd.materialCount; i++) {
    var fileName = this.pmd.materials[i].convertedFileName();
    if(fileName == '' ||
       fileName.indexOf('.spa') >= 0 ||
       fileName.indexOf('.sph') >= 0) {
      this.pmd.images[i] = this._generatePixelImage();
      this.noImageNum++;
      this._checkDone(callback);
      continue;
    }

    var self = this;
    this.pmd.images[i] = new Image();
    this.pmd.images[i].onerror = function(event) {
      self.errorImageNum++;
      self._checkDone(callback);
    }
    this.pmd.images[i].onload = function(event) {
      self.loadedImageNum++;
      self._checkDone(callback);
    }
    this.pmd.images[i].src = this.baseURL + '/' + fileName;
  }

  // TODO: duplicated code
  for(var i = 0; i < this.pmd.toonTextureCount; i++) {
    var fileName = this.pmd.toonTextures[i].fileName;
    if(fileName == '' ||
       fileName.indexOf('.spa') >= 0 ||
       fileName.indexOf('.sph') >= 0) {
      this.pmd.toonImages[i] = this._generatePixelImage();
      this.noImageNum++;
      this._checkDone(callback);
      continue;
    }

    var self = this;
    this.pmd.toonImages[i] = new Image();
    this.pmd.toonImages[i].onerror = function(event) {
      self.errorImageNum++;
      self._checkDone(callback);
    }
    this.pmd.toonImages[i].onload = function(event) {
      self.loadedImageNum++;
      self._checkDone(callback);
    }
    this.pmd.toonImages[i].src = this.baseURL + '/' + fileName;
  }

  // TODO: duplicated code
  for(var i = 0; i < this.pmd.materialCount; i++) {
    if(! this.pmd.materials[i].hasSphereTexture()) {
      this.pmd.sphereImages[i] = this._generatePixelImage();
      this.noImageNum++;
      this._checkDone(callback);
      continue;
    }

    var fileName = this.pmd.materials[i].sphereMapFileName();
    var self = this;
    this.pmd.sphereImages[i] = new Image();
    this.pmd.sphereImages[i].onerror = function(event) {
      self.errorImageNum++;
      self._checkDone(callback);
    }
    this.pmd.sphereImages[i].onload = function(event) {
      self.loadedImageNum++;
      self._checkDone(callback);
    }
    this.pmd.sphereImages[i].src = this.baseURL + '/' + fileName;
  }

};


PMDImageLoader.prototype._generatePixelImage = function() {
  var cvs = document.createElement('canvas');
  cvs.width = 1;
  cvs.height = 1;
  var ctx = cvs.getContext('2d');

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, 1, 1);
  return cvs;
};


PMDImageLoader.prototype._checkDone = function(callback) {
  if(this.loadedImageNum + this.noImageNum + this.errorImageNum
       >= this.pmd.materialCount * 2 + this.pmd.toonTextureCount) {
    callback(this.pmd);
  }
};

export default {
  PMD,
  PMDHeader,
  PMDVertex,
  PMDVertexIndex,
  PMDMaterial,
  PMDBone,
  PMDIK,
  PMDFace,
  PMDFaceVertex,
  PMDFaceDisplay,
  PMDBoneFrameName,
  PMDBoneDisplay,
  PMDEnglishHeader,
  PMDEnglishBoneName,
  PMDEnglishFaceName,
  PMDEnglishBoneFrameName,
  PMDToonTexture,
  PMDRigidBody,
  PMDJoint,
};
