import { vec3, quat4, mat4 } from 'lib/_glMatrix-0.9.5.min.js';

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
  this.stepCamera = {location: [0, 0, 0],
                     rotation: [0, 0, 0],
                     length: 0,
                     angle: 0,
                     available: true};
  this.stepLight = {color: [0, 0, 0],
                    location: [0, 0, 0],
                    available: true};
};

// for reference
VMD.prototype.Object = Object;
VMD.prototype.Math = Math;
VMD.prototype.vec3 = vec3;
VMD.prototype.quat4 = quat4;


VMD.prototype.valid = function() {
  return this.header.valid();
};


VMD.prototype.supply = function() {
  for(var i = 0; i < this.motionCount; i++)
    this.motions[i].supply();

  for(var i = 0; i < this.faceCount; i++)
    this.faces[i].supply();

  for(var i = 0; i < this.cameraCount; i++)
    this.cameras[i].supply();

  for(var i = 0; i < this.lightCount; i++)
    this.lights[i].supply();
};


/**
 * TODO: temporal
 */
VMD.prototype.clone = function() {
  var v = new VMD();

  v.motionCount = this.motionCount;
  v.faceCount = this.faceCount;
  v.cameraCount = this.cameraCount;
  v.lightCount = this.lightCount;

  for(var i = 0; i < this.motionCount; i++) {
    v.motions[i] = this.motions[i];
  }

  for(var i = 0; i < this.faceCount; i++) {
    v.faces[i] = this.faces[i];
  }

  for(var i = 0; i < this.cameraCount; i++) {
    v.cameras[i] = this.cameras[i];
  }

  for(var i = 0; i < this.lightCount; i++) {
    v.lights[i] = this.lights[i];
  }

  return v;
};


VMD.prototype.setup = function(pmd) {
  this.frame = 0;
  this.cameraIndex = -1;
  this.lightIndex = -1;

  if(pmd) {
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
VMD.prototype._setupMotions = function(pmd) {
  var arrays = {};
  for(var i = 0; i < this.motionCount; i++) {
    var m = this.motions[i];

    // Note: remove unnecessary element for PMD
    if(pmd.bonesHash[m.boneName] === undefined)
      continue;

    if(arrays[m.boneName] === undefined) {
      arrays[m.boneName] = {};
      arrays[m.boneName].motions = [];
      arrays[m.boneName].index = -1;
    }
    arrays[m.boneName].motions.push(m);
  }

  for(var key in arrays) {
    arrays[key].motions.sort(function(a, b) {
      return a.frameNum - b.frameNum;
    });
  }

  this.orderedMotions.length = 0;
  var motionKeys = this.Object.keys(arrays);
  for(var i = 0; i < motionKeys.length; i++) {
    this.orderedMotions[i] = arrays[motionKeys[i]];
  }

  this.stepMotions.length = 0;
  for(var i = 0; i < pmd.boneCount; i++) {
    var a = {};
    a.location = [0, 0, 0];
    a.rotation = [0, 0, 0, 1];
    this._clearVec3(a.location);   // just in case
    this._clearQuat4(a.rotation);  // just in case
    this.stepMotions[i] = a;
  }

  var boneNames = pmd.getBoneNames();
  var tmp = 0;
  for(var i = 0; i < pmd.bones.length; i++) {
    var p = pmd.bones[i];
    p.motionIndex = motionKeys.indexOf(p.name);
    if(p.motionIndex == -1) {
      p.motionIndex = motionKeys.length + tmp;
      tmp++;
    }
  }
};


VMD.prototype._setupFaces = function(pmd) {
  var arrays = {};
  for(var i = 0; i < this.faceCount; i++) {
    var f = this.faces[i];

    if(pmd.facesHash[f.name] === undefined)
      continue;

    if(arrays[f.name] === undefined) {
      arrays[f.name] = {};
      arrays[f.name].faces = [];
      arrays[f.name].index = -1;
    }
    arrays[f.name].faces.push(f);
  }

  for(var key in arrays) {
    arrays[key].faces.sort(function(a, b) {
      return a.frameNum - b.frameNum;
    });
  }

  this.orderedFaces.length = 0;
  var faceKeys = this.Object.keys(arrays);
  for(var i = 0; i < faceKeys.length; i++) {
    this.orderedFaces[i] = arrays[faceKeys[i]];
  }

  this.stepFaces.length = 0;
  for(var i = 0; i < pmd.faceCount; i++) {
    var a = {};
    a.weight = 0;
    a.available = true;
    this.stepFaces[i] = a;
  }

  var faceNames = pmd.getFaceNames();
  var tmp = 0;
  for(var i = 0; i < pmd.faces.length; i++) {
    var p = pmd.faces[i];
    p.motionIndex = faceKeys.indexOf(p.name);
    if(p.motionIndex == -1) {
      p.motionIndex = faceKeys.length + tmp;
      this.stepFaces[p.motionIndex].available = false;
      tmp++;
    }
  }

};


VMD.prototype._setupCameras = function() {
  this.orderedCameras.length = 0;
  for(var i = 0; i < this.cameraCount; i++) {
    this.orderedCameras[i] = this.cameras[i];
  }

  this.orderedCameras.sort(function(a, b) {
      return a.frameNum - b.frameNum;
  });
};


VMD.prototype._setupLights = function() {
  this.orderedLights.length = 0;
  for(var i = 0; i < this.lightCount; i++) {
    this.orderedLights[i] = {};
    this.orderedLights[i].light = this.lights[i];
  }

  this.orderedLights.sort(function(a, b) {
      return a.light.frameNum - b.light.frameNum;
  });
};


VMD.prototype.step = function(dframe) {
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
VMD.prototype._stepMotion = function() {
  for(var i = 0; i < this.orderedMotions.length; i++) {
    var m = this.orderedMotions[i];
    while(m.index+1 < m.motions.length &&
          m.motions[m.index+1].frameNum <= this.frame) {
      m.index++;
    }
  }
};


/**
 * TODO: check the logic.
 */
VMD.prototype._stepFace = function() {
  for(var i = 0; i < this.orderedFaces.length; i++) {
    var f = this.orderedFaces[i];
    while(f.index+1 < f.faces.length &&
          f.faces[f.index+1].frameNum <= this.frame) {
      f.index++;
    }
  }
};


/**
 * TODO: check the logic.
 */
VMD.prototype._stepCamera = function() {
  while(this.cameraIndex+1 < this.cameras.length &&
        this.orderedCameras[this.cameraIndex+1].frameNum <= this.frame) {
    this.cameraIndex++;
  }
};


/**
 * TODO: check the logic.
 */
VMD.prototype._stepLight = function() {
  while(this.lightIndex+1 < this.lights.length &&
        this.orderedLights[this.lightIndex+1].light.frameNum <= this.frame) {
    this.lightIndex++;
  }
};


VMD.prototype.merge = function(v) {
  this.motionCount += v.motionCount;
  this.faceCount += v.faceCount;
  this.cameraCount += v.cameraCount;
  this.lightCount += v.lightCount;

  for(var i = 0; i < v.motionCount; i++) {
    this.motions.push(v.motions[i]);
  }
  for(var i = 0; i < v.faceCount; i++) {
    this.faces.push(v.faces[i]);
  }
  for(var i = 0; i < v.cameraCount; i++) {
    this.cameras.push(v.cameras[i]);
  }
  for(var i = 0; i < v.lightCount; i++) {
    this.lights.push(v.lights[i]);
  }
};


VMD.prototype.addOffset = function(o) {
  for(var i = 0; i < this.motionCount; i++) {
    this.motions[i].frameNum += o;
  }
  for(var i = 0; i < this.faceCount; i++) {
    this.faces[i].frameNum += o;
  }
  for(var i = 0; i < this.cameraCount; i++) {
    this.cameras[i].frameNum += o;
  }
  for(var i = 0; i < this.lightCount; i++) {
    this.lights[i].frameNum += o;
  }
};


/**
 * TODO: temporal
 * TODO: calculate next frameNum at setup phase?
 * TODO: check the logic
 */
VMD.prototype.loadMotion = function() {
  for(var i = 0; i < this.orderedMotions.length; i++) {
    var m = this.orderedMotions[i];

    if(m.index == -1)
      continue;

    var m1 = m.motions[m.index];
    var m2 = m.motions[m.index+1];
    var m3 = this.stepMotions[i];

    if(m1.frameNum == this.frame
         || m2 === undefined
         || m2.frameNum - m1.frameNum <= 2) {
      this._setVec3(m1.location, m3.location);
      this._setQuat4(m1.rotation, m3.rotation);
    } else {
      // Note: linear interpolation so far
      var d = m2.frameNum - m1.frameNum;
      var d2 = this.frame - m1.frameNum;
      var r = d2/d;
      this._slerpQuat4(m1.rotation, m2.rotation, r, m3.rotation);
      this._lerpVec3(m1.location, m2.location, r, m3.location);
    }
  }

  for(var i = this.orderedMotions.length;
          i < this.stepMotions.length;
          i++) {
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
VMD.prototype.loadFace = function() {
  for(var i = 0; i < this.orderedFaces.length; i++) {
    var f = this.orderedFaces[i];

    if(f.index == -1)
      continue;

    var f1 = f.faces[f.index];
    var f2 = f.faces[f.index+1];
    var f3 = this.stepFaces[i];

    if(f1.frameNum == this.frameNum
         || f2 === undefined
         || f2.frameNum - f1.frameNum <= 2) {
      f3.weight = f1.weight;
    } else {
      var d = f2.frameNum - f1.frameNum;
      var d2 = this.frame - f1.frameNum;
      var r = d2/d;
      f3.weight = this._lerp(f1.weight, f2.weight, r);
    }
  }
};


/**
 * TODO: check the logic
 */
VMD.prototype.loadCamera = function() {
  var ocs = this.orderedCameras;
  var index = this.cameraIndex;
  this.stepCamera.available = false;

  if(index == -1)
    return;

  this.stepCamera.available = true;
  var c1 = ocs[index];
  var c2 = ocs[index+1];

  if(c1.frameNum == this.frame
       || c2 === undefined
       || c2.frameNum - c1.frameNum <= 2) {
    this._setVec3(c1.location, this.stepCamera.location);
    this._setVec3(c1.rotation, this.stepCamera.rotation);
    this.stepCamera.length = c1.length;
    this.stepCamera.angle = c1.angle;
  } else {
    // Note: linear interpolation so far
    var d = c2.frameNum - c1.frameNum;
    var d2 = this.frame - c1.frameNum;
    var r = d2/d;

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
VMD.prototype.loadLight = function() {
  var ols = this.orderedLights;
  var index = this.lightIndex;
  this.stepLight.available = false;

  if(index == -1)
    return;

  var light = ols[index].light;
  this.stepLight.available = true;
  this._setVec3(light.color,    this.stepLight.color);
  this._setVec3(light.location, this.stepLight.location);
};


VMD.prototype._setVec3 = function(a, b) {
  b[0] = a[0];
  b[1] = a[1];
  b[2] = a[2];
};


VMD.prototype._setQuat4 = function(a, b) {
  b[0] = a[0];
  b[1] = a[1];
  b[2] = a[2];
  b[3] = a[3];
};


VMD.prototype._clearVec3 = function(a) {
  a[0] = 0;
  a[1] = 0;
  a[2] = 0;
};


VMD.prototype._clearQuat4 = function(a) {
  a[0] = 0;
  a[1] = 0;
  a[2] = 0;
  a[3] = 1;
};


VMD.prototype._lerp = function(a, b, c) {
  return a * (1-c) + b * c;
};


VMD.prototype._lerpVec3 = function(a, b, c, d) {
  d[0] = this._lerp(a[0], b[0], c);
  d[1] = this._lerp(a[1], b[1], c);
  d[2] = this._lerp(a[2], b[2], c);
};


/**
 * copied from somewhere so far
 * TODO: move this logic to general matrix class or somewhere
 */
VMD.prototype._slerpQuat4 = function(q, r, t, p) {
  var cosHalfTheta = q[0]*r[0] + q[1]*r[1] + q[2]*r[2] + q[3]*r[3];
  if(cosHalfTheta < 0) {
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

  if(this.Math.abs(cosHalfTheta) >= 1.0) {
    p[0] = q[0];
    p[1] = q[1];
    p[2] = q[2];
    p[3] = q[3];
    return p;
  }

  var halfTheta = this.Math.acos(cosHalfTheta);
  var sinHalfTheta = this.Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

  if(this.Math.abs(sinHalfTheta) < 0.001) {
    p[0] = 0.5 * (q[0]+r[0]);
    p[1] = 0.5 * (q[1]+r[1]);
    p[2] = 0.5 * (q[2]+r[2]);
    p[3] = 0.5 * (q[3]+r[3]);
    return p;
  }

  var ratioA = this.Math.sin((1-t) * halfTheta) / sinHalfTheta;
  var ratioB = this.Math.sin(t * halfTheta) / sinHalfTheta;

  p[0] = (q[0] * ratioA + p[0] * ratioB);
  p[1] = (q[1] * ratioA + p[1] * ratioB);
  p[2] = (q[2] * ratioA + p[2] * ratioB);
  p[3] = (q[3] * ratioA + p[3] * ratioB);
  return p;
};


/**
 * just copied from MMD.js so far
 */
vec3.rotateX = function(vec, angle, dest) {
  var rotation = mat4.rotateX(mat4.identity(mat4.create()), angle);
  return mat4.multiplyVec3(rotation, vec, dest);
};
vec3.rotateY = function(vec, angle, dest) {
  var rotation = mat4.rotateY(mat4.identity(mat4.create()), angle);
  return mat4.multiplyVec3(rotation, vec, dest);
};
vec3.rotateZ = function(vec, angle, dest) {
  var rotation = mat4.rotateZ(mat4.identity(mat4.create()), angle);
  return mat4.multiplyVec3(rotation, vec, dest);
};


VMD.prototype.getBoneMotion = function(bone) {
  return this.stepMotions[bone.motionIndex];
};


VMD.prototype.getFace = function(face) {
  return this.stepFaces[face.motionIndex];
};


VMD.prototype.getCamera = function() {
  return this.stepCamera;
};


VMD.prototype.getLight = function() {
  return this.stepLight;
};


/**
 * TODO: rename
 */
VMD.prototype.getCalculatedCameraParams = function(eye, center, up) {
  var yOffset = 0.0;
  var camera = this.getCamera();

  center[0] = camera.location[0];
  center[1] = camera.location[1]+yOffset;
  center[2] = camera.location[2];

  eye[0] = 0;
  eye[1] = 0+yOffset;
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


VMD.prototype.dump = function() {
  var str = '';

  str += 'motionCount: ' + this.motionCount + '\n';
  str += 'faceCount: '   + this.faceCount   + '\n';
  str += 'cameraCount: ' + this.cameraCount + '\n';
  str += 'lightCount: '  + this.lightCount  + '\n';

  str += this._dumpMotions();
  str += this._dumpFaces();
  str += this._dumpCameras();
  str += this._dumpLights();

  return str;
};


VMD.prototype._dumpMotions = function() {
  var str = '';
  str += '-- Motions --\n';
  for(var i = 0; i < this.motionCount; i++) {
    str += this.motions[i].dump();
  }
  str += '\n';
  return str;
};


VMD.prototype._dumpFaces = function() {
  var str = '';
  str += '-- Faces --\n';
  for(var i = 0; i < this.faceCount; i++) {
    str += this.faces[i].dump();
  }
  str += '\n';
  return str;
};


VMD.prototype._dumpCameras = function() {
  var str = '';
  str += '-- Cameras --\n';
  for(var i = 0; i < this.cameraCount; i++) {
    str += this.cameras[i].dump();
  }
  str += '\n';
  return str;
};


VMD.prototype._dumpLights = function() {
  var str = '';
  str += '-- Lights --\n';
  for(var i = 0; i < this.lightCount; i++) {
    str += this.lights[i].dump();
  }
  str += '\n';
  return str;
};



function VMDHeader() {
  this.magic = null;
  this.modelName = null;
};


VMDHeader.prototype.valid = function() {
  return (this.magic == 'Vocaloid Motion Data 0002');
};


VMDHeader.prototype.dump = function() {
  var str = '';
  str += 'magic: '     + this.magic     + '\n';
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


VMDMotion.prototype.supply = function() {
  this.frameNum *= 2;
};


VMDMotion.prototype.dump = function() {
  var str = '';
  str += 'id: '            + this.id            + '\n';
  str += 'boneName: '      + this.boneName      + '\n';
  str += 'frameNum: '      + this.frameNum      + '\n';
  str += 'location: '      + this.location      + '\n';
  str += 'rotation: '      + this.rotation      + '\n';
  str += 'interpolation: ' + this.interpolation + '\n';
  return str;
};



function VMDFace(id) {
  this.id = id;
  this.name = null;
  this.frameNum = null;
  this.weight = null;
};


VMDFace.prototype.supply = function() {
  this.frameNum *= 2;
};


VMDFace.prototype.dump = function() {
  var str = '';
  str += 'id: '       + this.id       + '\n';
  str += 'name: '     + this.name     + '\n';
  str += 'frameNum: ' + this.frameNum + '\n';
  str += 'weight: '   + this.weight   + '\n';
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


VMDCamera.prototype.supply = function() {
  this.frameNum *= 2;
};


VMDCamera.prototype.dump = function() {
  var str = '';
  str += 'id: '            + this.id            + '\n';
  str += 'frameNum: '      + this.frameNum      + '\n';
  str += 'length: '        + this.length        + '\n';
  str += 'location: '      + this.location      + '\n';
  str += 'rotation: '      + this.rotation      + '\n';
  str += 'interpolation: ' + this.interpolation + '\n';
  str += 'angle: '         + this.angle         + '\n';
  str += 'perspective: '   + this.perspective   + '\n';
  return str;
};



function VMDLight(id) {
  this.id = id;
  this.frameNum = null;
  this.color = null;
  this.location = null;
};


VMDLight.prototype.supply = function() {
  this.frameNum *= 2;
};


VMDLight.prototype.dump = function() {
  var str = '';
  str += 'id: '       + this.id       + '\n';
  str += 'frameNum: ' + this.frameNum + '\n';
  str += 'color: '    + this.color    + '\n';
  str += 'location: ' + this.location + '\n';
  return str;
};

export default {
  VMD,
  VMDLight,
  VMDHeader,
  VMDMotion,
  VMDFace,
  VMDCamera,
};
