import { vec3, quat4, mat4 } from 'lib/_glMatrix-0.9.5.min.js';

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
PMDView.prototype.vec3 = vec3;
PMDView.prototype.quat4 = quat4;
PMDView.prototype.mat4 = mat4;

PMDView.prototype._FRAME_S  = 1/60;
PMDView.prototype._FRAME_MS = 1/60*1000;

PMDView.prototype._PHYSICS_OFF        = 0;
PMDView.prototype._PHYSICS_ON         = 1;
PMDView.prototype._PHYSICS_WORKERS_ON = 2;

// Note: these skinning@parameters must correspond to vertex shader.
PMDView.prototype._SKINNING_CPU         = 0;
PMDView.prototype._SKINNING_GPU         = 1;
PMDView.prototype._SKINNING_CPU_AND_GPU = 2;

// Note: these lighting parameters must correspond to vertex shader.
PMDView.prototype._LIGHTING_OFF          = 0;
PMDView.prototype._LIGHTING_ON           = 1;
PMDView.prototype._LIGHTING_ON_WITH_TOON = 2;

PMDView.prototype._IK_OFF = 0;
PMDView.prototype._IK_ON  = 1;

PMDView.prototype._MORPH_OFF = 0;
PMDView.prototype._MORPH_ON  = 1;

PMDView.prototype._SPHERE_MAP_OFF = 0;
PMDView.prototype._SPHERE_MAP_ON  = 1;

PMDView.prototype._SHADOW_MAPPING_OFF  = 0;
PMDView.prototype._SHADOW_MAPPING_ON   = 1;
PMDView.prototype._SHADOW_MAPPING_ONLY = 2;

PMDView.prototype._RUN_FRAME_ORIENTED    = 0;
PMDView.prototype._RUN_REALTIME_ORIENTED = 1;
PMDView.prototype._RUN_AUDIO_ORIENTED    = 2;

PMDView.prototype._AUDIO_OFF = 0;
PMDView.prototype._AUDIO_ON  = 1;

PMDView.prototype._EDGE_OFF = 0;
PMDView.prototype._EDGE_ON  = 1;

PMDView.prototype._STAGE_OFF = 0;
PMDView.prototype._STAGE_1   = 1;
PMDView.prototype._STAGE_2   = 2;
PMDView.prototype._STAGE_3   = 3;

PMDView.prototype._EFFECT_OFF         = 0x0;
PMDView.prototype._EFFECT_BLUR        = 0x1;
PMDView.prototype._EFFECT_GAUSSIAN    = 0x2;
PMDView.prototype._EFFECT_DIFFUSION   = 0x4;
PMDView.prototype._EFFECT_DIVISION    = 0x8;
PMDView.prototype._EFFECT_LOW_RESO    = 0x10;
PMDView.prototype._EFFECT_FACE_MOSAIC = 0x20;

PMDView._PHYSICS_OFF        = PMDView.prototype._PHYSICS_OFF;
PMDView._PHYSICS_ON         = PMDView.prototype._PHYSICS_ON;
PMDView._PHYSICS_WORKERS_ON = PMDView.prototype._PHYSICS_WORKERS_ON;

PMDView._SKINNING_CPU         = PMDView.prototype._SKINNING_CPU;
PMDView._SKINNING_GPU         = PMDView.prototype._SKINNING_GPU;
PMDView._SKINNING_CPU_AND_GPU = PMDView.prototype._SKINNING_CPU_AND_GPU;

PMDView._LIGHTING_OFF           = PMDView.prototype._LIGHTING_OFF;
PMDView._LIGHTING_ON            = PMDView.prototype._LIGHTING_ON;
PMDView._LIGHTING_ON_WITH_TOON  = PMDView.prototype._LIGHTING_ON_WITH_TOON;

PMDView._IK_OFF = PMDView.prototype._IK_OFF;
PMDView._IK_ON  = PMDView.prototype._IK_ON;

PMDView._MORPH_OFF = PMDView.prototype._MORPH_OFF;
PMDView._MORPH_ON  = PMDView.prototype._MORPH_ON;

PMDView._SPHERE_MAP_OFF = PMDView.prototype._SPHERE_MAP_OFF;
PMDView._SPHERE_MAP_ON  = PMDView.prototype._SPHERE_MAP_ON;

PMDView._SHADOW_MAPPING_OFF  = PMDView.prototype._SHADOW_MAPPING_OFF;
PMDView._SHADOW_MAPPING_ON   = PMDView.prototype._SHADOW_MAPPING_ON;
PMDView._SHADOW_MAPPING_ONLY = PMDView.prototype._SHADOW_MAPPING_ONLY;

PMDView._RUN_FRAME_ORIENTED    = PMDView.prototype._RUN_FRAME_ORIENTED;
PMDView._RUN_REALTIME_ORIENTED = PMDView.prototype._RUN_REALTIME_ORIENTED;
PMDView._RUN_AUDIO_ORIENTED    = PMDView.prototype._RUN_AUDIO_ORIENTED;

PMDView._AUDIO_OFF = PMDView.prototype._AUDIO_OFF = 0;
PMDView._AUDIO_ON  = PMDView.prototype._AUDIO_ON  = 1;

PMDView._EDGE_OFF = PMDView.prototype._EDGE_OFF;
PMDView._EDGE_ON  = PMDView.prototype._EDGE_ON;

PMDView._STAGE_OFF = PMDView.prototype._STAGE_OFF;
PMDView._STAGE_1   = PMDView.prototype._STAGE_1;
PMDView._STAGE_2   = PMDView.prototype._STAGE_2;
PMDView._STAGE_3   = PMDView.prototype._STAGE_3;

PMDView._EFFECT_OFF         = PMDView.prototype._EFFECT_OFF;
PMDView._EFFECT_BLUR        = PMDView.prototype._EFFECT_BLUR;
PMDView._EFFECT_GAUSSIAN    = PMDView.prototype._EFFECT_GAUSSIAN;
PMDView._EFFECT_DIFFUSION   = PMDView.prototype._EFFECT_DIFFUSION;
PMDView._EFFECT_DIVISION    = PMDView.prototype._EFFECT_DIVISION;
PMDView._EFFECT_LOW_RESO    = PMDView.prototype._EFFECT_LOW_RESO;
PMDView._EFFECT_FACE_MOSAIC = PMDView.prototype._EFFECT_FACE_MOSAIC;


PMDView.prototype.addModelView = function(view) {
  this.modelViews.push(view);
};


PMDView.prototype.getModelView = function(index) {
  return this.modelViews[index];
};


PMDView.prototype.getModelNum = function() {
  return this.modelViews.length;
};


PMDView.prototype.setup = function() {
  for(var i = 0; i < this.modelViews.length; i++) {
    this.modelViews[i].setup();
  }
  this.elapsedTime = 0.0;
};


PMDView.prototype.setVMD = function(vmd) {
  this.vmd = vmd;
  this.vmd.supply();
};


PMDView.prototype.setAudio = function(audio, offset) {
  this.audio = {};
  this.audio.audio = audio;
  this.audio.offset = offset;
};


PMDView.prototype.startDance = function() {
  this.vmd.setup(this.modelViews[0].pmd);
  this.elapsedTime = 0.0;
  this.dancing = true;
  this.oldDate = null;
  this.startDate = Date.now();

  this.frame = 0;
  this.dframe = 0;

  for(var i = 0; i < this.modelViews.length; i++) {
    this.modelViews[i].setVMD(this.vmd.clone());
    this.modelViews[i].startDance();
  }
};


PMDView.prototype.setEye = function(eye) {
  for(var i = 0; i < this.eye.length; i++) {
    this.eye[i] = eye[i];
  }
  this.center[0] = eye[0];
  this.center[1] = eye[1];

  this.resetCameraMove();
};


PMDView.prototype.setPhysicsType = function(type) {
  this.physicsType = type;
};


PMDView.prototype.setSkinningType = function(type) {
  this.skinningType = type;
};


PMDView.prototype.setLightingType = function(type) {
  this.lightingType = type;
};


PMDView.prototype.setLightColor = function(color) {
  this.lightColor[0] = color;
  this.lightColor[1] = color;
  this.lightColor[2] = color;
};


PMDView.prototype.setIKType = function(type) {
  this.ikType = type;
};


PMDView.prototype.setMorphType = function(type) {
  this.morphType = type;
};


PMDView.prototype.setSphereMapType = function(type) {
  this.sphereMapType = type;
};


PMDView.prototype.setShadowMappingType = function(type) {
  this.shadowMappingType = type;
};


PMDView.prototype.setRunType = function(type) {
  this.runType = type;
};


PMDView.prototype.setStageType = function(type) {
  this.stageType = type;
};


/**
 * TODO: override so far
 */
PMDView.prototype.setEffectFlag = function(flag) {
  this.effectFlag = flag;
};


PMDView.prototype.setAudioType = function(type) {
  this.audioType = type;
};


PMDView.prototype.setEdgeType = function(type) {
  this.edgeType = type;
};


PMDView.prototype.moveCameraQuaternion = function(q) {
  this.quat4.multiply(this.cameraQuaternion, q, this.cameraQuaternion);
};


PMDView.prototype.moveCameraQuaternionByXY = function(dx, dy) {
  dx = -dx;
  dy = -dy;

  var length = this.Math.sqrt(dx * dx + dy * dy);

  if(length != 0.0) {
    var radian = length * this.Math.PI;
    var theta = this.Math.sin(radian) / length;
    var q = this.quat4.create([dy * theta,
                               dx * theta,
                               0.0,
                               this.Math.cos(radian)]);
    this.moveCameraQuaternion(q);
    return true;
  }
  return false;
};


PMDView.prototype.moveCameraTranslation = function(dx, dy) {
  dy = -dy;

  this.cameraTranslation[0] += dx * 50;
  this.cameraTranslation[1] += dy * 50;
};


PMDView.prototype.resetCameraMove = function() {
  this.cameraDistance = 0;
  this.cameraTranslation[0] = 0;
  this.cameraTranslation[1] = 0;
  this.cameraTranslation[2] = 0;
  this.cameraQuaternion[0] = 0;
  this.cameraQuaternion[1] = 0;
  this.cameraQuaternion[2] = 0;
  this.cameraQuaternion[3] = 1;
};


PMDView.prototype.moveCameraForward = function(d) {
  if(d > 0)
    this.cameraDistance -= 25;
  if(d < 0)
    this.cameraDistance += 25;

  if(this.cameraDistance <= -100)
    this.cameraDistance = -99;
};



PMDView.prototype._getCalculatedCameraParams = function(eye, center, up) {
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
PMDView.prototype._calculateDframe = function() {
  var newDate = Date.now();
  if(this.runType == this._RUN_FRAME_ORIENTED) {
    this.dframe = 1;
    this.elapsedTime += this._FRAME_MS;
  } else if(this.runType == this._RUN_REALTIME_ORIENTED ||
            ! this.dancing ||
            this.audio === null) {
    if(this.oldDate) {
      var prevElapsedTime = this.elapsedTime;
      var oldFrame = (this.elapsedTime / this._FRAME_MS) | 0;
      this.elapsedTime += (newDate - this.oldDate);
      var newFrame = (this.elapsedTime / this._FRAME_MS) | 0;
      var dframe = (newFrame - oldFrame);
      if(dframe <= 0) {
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
    if(this.audioStart) {
      newDate = this.audio.audio.currentTime * 1000 + this.startDate
                  + this.audio.offset * this._FRAME_MS;
    }
    if(this.oldDate) {
      var prevElapsedTime = this.elapsedTime;
      var oldFrame = (this.elapsedTime / this._FRAME_MS) | 0;
      this.elapsedTime += (newDate - this.oldDate);
      var newFrame = (this.elapsedTime / this._FRAME_MS) | 0;
      var dframe = (newFrame - oldFrame);
      if(dframe <= 0) {
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
PMDView.prototype._controlAudio = function() {
  if(! this.audio || this.audioStart ||
     this.audioType == this._AUDIO_OFF)
    return;

  if(! this.audio.offset || this.frame >= this.audio.offset) {
    this.audio.audio.play();
    if(this.audio.offset < 0) {
      this.audio.audio.currentTime = -this.audio.offset * this._FRAME_S;
    }
    this.audioStart = true;
  }
};


/**
 * TODO: temporal
 */
PMDView.prototype.update = function() {
  // 每个step !!!!
  this._controlAudio();
  this._calculateDframe();  // 物理?

  if(this.dframe == 0)
    return;

  if(this.dancing) {
    this._loadFromVMD(this.dframe); // 物理?
  }

  for(var i = 0; i < this.modelViews.length; i++) {
    this.modelViews[i].update(this.dframe); // 物理?
  }
};


/**
 * TODO: multiple post effect support.
 * TODO: optimize
 */
PMDView.prototype.draw = function() {
  if(this.dframe == 0)
    return;

  var layer = this.layer;
  var gl = layer.gl;
  var shader = layer.shader;

  // TODO: temmporal
  var postEffect =
   (this.effectFlag & this._EFFECT_BLUR)      ? layer.postEffects['blur'] :
   (this.effectFlag & this._EFFECT_GAUSSIAN)  ? layer.postEffects['gaussian'] :
   (this.effectFlag & this._EFFECT_DIFFUSION) ? layer.postEffects['diffusion'] :
   (this.effectFlag & this._EFFECT_DIVISION)  ? layer.postEffects['division'] :
   (this.effectFlag & this._EFFECT_LOW_RESO)  ? layer.postEffects['low_reso'] :
   (this.effectFlag & this._EFFECT_FACE_MOSAIC) ? layer.postEffects['face_mosaic'] :
                                                null;

  if(this.shadowMappingType != this._SHADOW_MAPPING_OFF) {
    if(this.shadowMappingType == this._SHADOW_MAPPING_ONLY) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      layer.viewport();
      layer.perspective(layer.viewAngle);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, layer.shadowFrameBuffer.f);
      gl.viewport(0, 0,
                  layer.shadowFrameBufferSize, layer.shadowFrameBufferSize);
      this.mat4.perspective(layer.viewAngle, 1,
                            layer.viewNear, layer.viewFar, layer.pMatrix);
    }

    layer.identity();
    layer.lookAt(layer.lightPosition, layer.lightCenter,
                 layer.lightUpDirection);
    layer.registerLightMatrix();

    gl.uniform1i(shader.shadowGenerationUniform, 1);
    gl.uniform1i(shader.shadowTextureUniform, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for(var i = 0; i < this.modelViews.length; i++) {
      this.modelViews[i].drawShadowMap();
    }
    gl.flush();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.uniform1i(shader.shadowMappingUniform, 1);
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, this.layer.shadowFrameBuffer.t);
    gl.uniform1i(shader.shadowTextureUniform, 4);
    gl.uniformMatrix4fv(shader.lightMatrixUniform, false, layer.lightMatrix);

    if(this.shadowMappingType == this._SHADOW_MAPPING_ONLY)
      return;

  } else {
    gl.uniform1i(shader.shadowMappingUniform, 0);
  }

  this._setCamera();
  this._setDrawParameters();

  gl.uniform1i(shader.shadowGenerationUniform, 0);

  var postShader = (postEffect === null) ? null : postEffect.shader;

  if(this.effectFlag != this._EFFECT_OFF) {
    postEffect.bindFrameBufferForScene();
  } else {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  for(var i = 0; i < this.modelViews.length; i++) {
    this.modelViews[i].draw();
    if(this.edgeType == this._EDGE_ON) {
      this.modelViews[i].drawEdge();
    }
  }

  if(this.stageType != this._STAGE_OFF) {
    this._drawStage();
    if(this.effectFlag == this._EFFECT_OFF)
      gl.useProgram(shader);
  }
  gl.flush();

  if(this.effectFlag != this._EFFECT_OFF) {
    gl.useProgram(postShader);
    postShader.frame = this.frame;
    postEffect.draw(this);
    gl.useProgram(shader);
  }
};


PMDView.prototype._setCamera = function() {
  var layer = this.layer;
  var gl = layer.gl;
  var shader = layer.shader;

  layer.viewport();

  var angle = 60;
  if(this.dancing && this.vmd.getCamera().available) {
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


PMDView.prototype._setDrawParameters = function() {
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
PMDView.prototype._drawStage = function() {
  var layer = this.layer;
  var gl = this.layer.gl;
  var stage = this.layer.stageShaders[this.stageType-1];
  var shader = stage.shader;

  var cPos = [];
  var lfPos = [];
  var rfPos = [];
  for(var i = 0; i < this.modelViews.length; i++) {
    var v = this.modelViews[i];
    cPos.push(v.skinningOneBone(v.pmd.centerBone));
    lfPos.push(v.skinningOneBone(v.pmd.leftFootBone));
    rfPos.push(v.skinningOneBone(v.pmd.rightFootBone));
  }
  cPos = [].concat.apply([], cPos);
  lfPos = [].concat.apply([], lfPos);
  rfPos = [].concat.apply([], rfPos);

  var sFlag = false;
  if(this.shadowMappingType == this._SHADOW_MAPPING_ON) {
    sFlag = true;
  }

  stage.draw(this.frame, this.modelViews.length, cPos, lfPos, rfPos,
             sFlag, layer.lightMatrix);
};


/**
 * TODO: rename
 */
PMDView.prototype._loadFromVMD = function(dframe) {
  this.vmd.loadCamera();
  this.vmd.loadLight();

  this.vmd.step(dframe);
  this.frame += dframe;
};


/**
 * TODO: implement correctly
 */
PMDView.prototype._moveLight = function() {
  var light = this.vmd.getLight();
  if(! light.available)
    return;

  this.layer.gl.uniform3fv(this.layer.shader.lightColorUniform,
                           light.color);
  this.layer.lightPosition = light.location;
};

module.exports = PMDView;
