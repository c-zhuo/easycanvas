import __inherit from './_Inherit.js';
import { vec3, quat4, mat4 } from 'lib/_glMatrix-0.9.5.min.js';

function PhysicsEntity() {
  this.workNum = 10;
  this.workTrs = [];
  this.workQs = [];
  this.workVs = [];
  for(var i = 0; i < this.workNum; i++) {
    this.workTrs[i] = new Ammo.btTransform();
    this.workQs[i] = new Ammo.btQuaternion();
    this.workVs[i] = new Ammo.btVector3();
  }
};


PhysicsEntity.prototype.allocTr = function() {
  var tr = this.workTrs[this.workTrs.length-1];
  this.workTrs.length--;
  return tr;
};


PhysicsEntity.prototype.freeTr = function(tr) {
  this.workTrs[this.workTrs.length] = tr;
};


PhysicsEntity.prototype.allocQ = function() {
  var q = this.workQs[this.workQs.length-1];
  this.workQs.length--;
  return q;
};


PhysicsEntity.prototype.freeQ = function(q) {
  this.workQs[this.workQs.length] = q;
};


PhysicsEntity.prototype.allocV = function() {
  var v = this.workVs[this.workVs.length-1];
  this.workVs.length--;
  return v;
};


PhysicsEntity.prototype.freeV = function(v) {
  this.workVs[this.workVs.length] = v;
};


/**
 * TODO: temporal
 * @return btTransform
 */
PhysicsEntity.prototype._newTransform = function() {
  return new Ammo.btTransform();
};


/**
 * TODO: temporal
 */
PhysicsEntity.prototype._setIdentity = function(tr) {
  tr.setIdentity();
};


/**
 * TODO: temporal
 * @param tr btTransform i
 */
PhysicsEntity.prototype._getBasis = function(tr) {
  var q = this.allocQ();
  tr.getBasis().getRotation(q);
  return q;
};


/**
 * TODO: temporal
 * @param tr btTransform i
 */
PhysicsEntity.prototype._getBasisMatrix3 = function(tr) {
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
PhysicsEntity.prototype._setBasis = function(tr, q) {
  tr.setRotation(q);
//  var p = this._quaternionToEulerZYX(q);
//  tr.getBasis().setEulerZYX(p[0], p[1], p[2]);
};


/**
 * TODO: temporal
 * @param tr btTransform i/o
 * @param m array[9] i
 */
PhysicsEntity.prototype._setBasisMatrix3 = function(tr, m) {
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
PhysicsEntity.prototype._setBasisArray4 = function(tr, a) {
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
PhysicsEntity.prototype._setBasisArray4Left = function(tr, a) {
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
PhysicsEntity.prototype._setBasisArray3 = function(tr, a) {
  tr.getBasis().setEulerZYX(a[0], a[1], a[2]);
};


/**
 * TODO: temporal
 * Note: [x, y, z]
 * @param tr btTransform i/o
 * @param m array[3] i
 */
PhysicsEntity.prototype._setBasisArray3Left = function(tr, a) {
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
PhysicsEntity.prototype._getOrigin = function(tr) {
  return tr.getOrigin();
};


/**
 * TODO: temporal
 * @param tr btTransform i
 * @return array[3]
 */
PhysicsEntity.prototype._getOriginArray3 = function(tr) {
  var o = this._getOrigin(tr);
  return [o.x(), o.y(), o.z()];
};


/**
 * TODO: temporal
 * @param tr btTransform i/o
 * @param v btVector3 i
 */
PhysicsEntity.prototype._setOrigin = function(tr, v) {
  tr.getOrigin().setValue(v.x(), v.y(), v.z());
};


/**
 * TODO: temporal
 * @param tr btTransform i/o
 * @param a array[3] i
 */
PhysicsEntity.prototype._setOriginArray3 = function(tr, a) {
  tr.getOrigin().setValue(a[0], a[1], a[2]);
};


/**
 * TODO: temporal
 * @param tr btTransform i/o
 * @param a array[3] i
 */
PhysicsEntity.prototype._setOriginArray3Left = function(tr, a) {
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
PhysicsEntity.prototype._setOriginFloats = function(tr, x, y, z) {
  tr.getOrigin().setValue(x, y, z);
};


/**
 * TODO: temporal
 * @param tr1 btTransform i/o
 * @param tr2 btTransform i
 */
PhysicsEntity.prototype._copyOrigin = function(tr1, tr2) {
  var o = tr2.getOrigin();
  this._setOrigin(tr1, o);
};


/**
 * TODO: temporal
 * @param v1 btVector3 i
 * @param v2 btVector3 i
 * @return btVector3
 */
PhysicsEntity.prototype._addVector3 = function(v1, v2) {
  var v = this.allocV();
  v.setValue(v1.x() + v2.x(),
             v1.y() + v2.y(),
             v1.z() + v2.z());
  return v;
};


/**
 * TODO: temporal
 * @param v btVector3 i
 * @param a array[3]
 * @return btVector3
 */
PhysicsEntity.prototype._addVector3ByArray3 = function(v, a) {
  var v2 = this.allocV();
  v2.setValue(v.x() + a[0],
              v.y() + a[1],
              v.z() + a[2]);
  return v2;
};


/**
 * TODO: temporal
 * @param v1 btVector3 i
 * @param v2 btVector3 i
 * @return float
 */
PhysicsEntity.prototype._dotVectors3 = function(v1, v2) {
  return v1.x() * v2.x() +
         v1.y() * v2.y() +
         v1.z() * v2.z();
};


/**
 * TODO: temporal
 * @param m array[9] i
 * @param i int i
 * @return btVector3
 */
PhysicsEntity.prototype._rowOfMatrix3 = function(m, i) {
  var v = this.allocV();
  v.setValue(m[i*3+0], m[i*3+1], m[i*3+2]);
  return v;
};


/**
 * TODO: temporal
 * @param m array[9] i
 * @param i int i
 * @return btVector3
 */
PhysicsEntity.prototype._columnOfMatrix3 = function(m, i) {
  var v = this.allocV();
  v.setValue(m[i+0], m[i+3], m[i+6]);
  return v;
};


/**
 * TODO: temporal
 * @param v btVector3 i
 * @return btVector3
 */
PhysicsEntity.prototype._negativeVector3 = function(v) {
  var v2 = this.allocV();
  v2.setValue(-v.x(), -v.y(), -v.z());
  return v2;
};


/**
 * TODO: temporal
 * @param v btVector3 i
 * @return btVector3
 */
PhysicsEntity.prototype._cloneVector3 = function(v) {
  var v2 = this.allocV();
  v2.setValue(v.x(), v.y(), v.z());
  return v2;
};


/**
 * TODO: temporal
 * @param m array[9]
 * @return array[9]
 */
PhysicsEntity.prototype._cloneMatrix3 = function(m) {
  var m2 = [];
  for(var i = 0; i < 9; i++) {
    m2[i] = m[i];
  }
  return m2;
};


/**
 * TODO: temporal
 * @param a array[3] i
 * @return btVector3
 */
PhysicsEntity.prototype._array3ToVector3 = function(a) {
  var v = this.allocV();
  v.setValue(a[0], a[1], a[2]);
  return v;
};


/**
 * TODO: temporal
 * @param v btVector3 i
 * @return array[3]
 */
PhysicsEntity.prototype._vector3ToArray3 = function(v) {
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
PhysicsEntity.prototype._array4ToQuaternion = function(a) {
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
PhysicsEntity.prototype._quaternionToArray4 = function(q) {
  var a = [q.x(), q.y(), q.z(), q.w()];
  return a;
};


/**
 * TODO: implement correctly
 * TODO: temporal
 * @param q btQuaternion i
 * @return array[3]
 */
PhysicsEntity.prototype._quaternionToEulerZYX = function(q) {
  var qw = q.w();
  var qx = q.x();
  var qy = q.y();
  var qz = q.z();
  var qw2 = qw*qw;
  var qx2 = qx*qx;
  var qy2 = qy*qy;
  var qz2 = qz*qz;
  var test = qx*qy + qz*qw;

  var yaw, pitch, roll;


  if(test > 0.499) {
    roll  = 360/Math.PI*Math.atan2(qx,qw);
    pitch = 90;
    yaw   = 0;
  } else if (test < -0.499) {
    roll  = -360/Math.PI*Math.atan2(qx,qw)
    pitch = -90;
    roll  = 0;
  } else {
    var h = Math.atan2(2*qy*qw-2*qx*qz,1-2*qy2-2*qz);
    var a = Math.asin(2*qx*qy+2*qz*qw);
    var b = Math.atan2(2*qx*qw-2*qy*qz,1-2*qx2-2*qz);
    roll  = Math.round(h*180/Math.PI);
    pitch = Math.round(a*180/Math.PI);
    yaw   = Math.round(b*180/Math.PI);
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

  if (abcd > (0.5-eps)*len) {
    yaw = 2 * Math.atan2(q.y(), q.w());
    pitch = Math.PI;
    roll = 0;
  } else if (abcd < (-0.5+eps)*len) {
    yaw = -2 * Math.atan2(q.y(), q.w());
    pitch = -Math.PI;
    roll = 0;
  } else {
    var adbc = q.w()*q.z() - q.x()*q.y();
    var acbd = q.w()*q.y() - q.x()*q.z();
    yaw = Math.atan2(2*adbc, 1 - 2*(z2+x2));
    pitch = Math.asin(2*abcd/len);
    roll = Math.atan2(2*acbd, 1 - 2*(y2+x2));
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
PhysicsEntity.prototype._multiplyTransforms = function(tr1, tr2) {
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
PhysicsEntity.prototype._inverseTransform = function(tr) {
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
PhysicsEntity.prototype._multiplyTransformByVector3 = function(tr, v) {
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
PhysicsEntity.prototype._multiplyMatrix3ByVector3 = function(m, v) {
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
PhysicsEntity.prototype._multiplyMatrices3 = function(m1, m2) {
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
PhysicsEntity.prototype._transposeMatrix3 = function(m) {
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
PhysicsEntity.prototype._inverseMatrix3 = function(m) {
  var m00 = m[0];
  var m01 = m[1];
  var m02 = m[2];
  var m10 = m[3];
  var m11 = m[4];
  var m12 = m[5];
  var m20 = m[6];
  var m21 = m[7];
  var m22 = m[8];

  var det =   m00 * m11 * m22
            + m10 * m21 * m02
            + m20 * m01 * m12
            - m20 * m11 * m02
            - m10 * m01 * m22
            - m00 * m21 * m12;

  if(det == 0)
    return this._cloneMatrix3(m);

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
PhysicsEntity.prototype._quaternionToMatrix3 = function(q) {
  var q2 = quat4.create();
  q2[0] = q.x();
  q2[1] = q.y();
  q2[2] = q.z();
  q2[3] = q.w();
  return quat4.toMat3(q2);
};



/**
 * TODO: temporal
 * Note: 0 1 2   00 01 02
 *       3 4 5   10 11 12
 *       6 7 8   20 21 22
 * @param m array[9] i
 * @return btQuaternion
 */
PhysicsEntity.prototype._matrix3ToQuaternion = function(m) {
  var t = m[0] + m[4] + m[8];
  var s, x, y, z, w;
  if(t > 0) {
    s = Math.sqrt(t+1.0) * 2;
    w = 0.25 * s;
    x = (m[7] - m[5]) / s;
    y = (m[2] - m[6]) / s; 
    z = (m[3] - m[1]) / s; 
  } else if((m[0] > m[4]) && (m[0] > m[8])) {
    s = Math.sqrt(1.0 + m[0] - m[4] - m[8]) * 2;
    w = (m[7] - m[5]) / s;
    x = 0.25 * s;
    y = (m[1] + m[3]) / s; 
    z = (m[2] + m[6]) / s; 
  } else if(m[4] > m[8]) {
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


PhysicsEntity.prototype._dumpTransform = function(tr) {
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


PhysicsEntity.prototype._dumpMatrix3 = function(m) {
  var str = '';
  for(var i = 0; i < 3; i++) {
    str += [m[i*3+0], m[i*3+1], m[i*3+2]].toString() + ',\n';
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
__inherit(PhysicsRigidBody, PhysicsEntity);


/**
 * TODO: temporal
 */
PhysicsRigidBody.prototype._init = function() {
  var body = this.body;
  var bone = this.pmd.bones[body.boneIndex];

  var shape = this._generateShape(body);
  var weight = (body.type == 0) ? 0 : body.weight;
  var localInertia = this.allocV();
  localInertia.setValue(0, 0, 0);

  if(weight != 0)
    shape.calculateLocalInertia(weight, localInertia);

  var boneOffsetForm = this.allocTr();
  this._setIdentity(boneOffsetForm);
  this._setOriginArray3Left(boneOffsetForm, body.position);
  this._setBasisArray3Left(boneOffsetForm, body.rotation);

  var boneForm = this.allocTr();
  this._setIdentity(boneForm);
  // TODO: temporal workaround
  var pos = (this.body.boneIndex == 0xFFFF) ? [0, 0, 0] : bone.position;
  this._setOriginArray3Left(boneForm, pos);

  var form = this._multiplyTransforms(boneForm, boneOffsetForm);
  var state = new Ammo.btDefaultMotionState(form);

  var info = new Ammo.btRigidBodyConstructionInfo(
                   weight, state, shape, localInertia);
  info.set_m_friction(body.friction);
  info.set_m_restitution(body.recoil);

  var rb = new Ammo.btRigidBody(info);
  if(body.type == 0) {
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


PhysicsRigidBody.prototype._generateShape = function(b) {
  switch(b.shapeType) {
    case 0:
      return new Ammo.btSphereShape(b.width);
    case 1:
      return new Ammo.btBoxShape(
                   new Ammo.btVector3(b.width, b.height, b.depth));
    case 2:
      return new Ammo.btCapsuleShape(b.width, b.height);
    default:
      throw 'unknown shape type.' + b;
  }
};


PhysicsRigidBody.prototype.reset = function(motions) {
  this._setTransformFromBone(motions);
};


PhysicsRigidBody.prototype.preSimulation = function(motions) {
  // TODO: temporal workaround
  if(this.body.boneIndex == 0xFFFF)
    return;

  if(this.body.type == 0/* && this.body.boneIndex != 0*/)
    this._setTransformFromBone(motions);

  if(this.body.type == 2/* && this.body.boneIndex != 0*/)
    this._setPositionFromBone(motions);
};


PhysicsRigidBody.prototype._setTransformFromBone = function(motions) {
  var m = motions[this.body.boneIndex];

  // TODO: temporal workaround
  if(this.body.boneIndex == 0xFFFF) {
    m = {p: [0, 0, 0], r: [0, 0, 0, 1]}
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


PhysicsRigidBody.prototype._setPositionFromBone = function(motions) {
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


PhysicsRigidBody.prototype.postSimulation = function(motions) {
  // debugger;
  // TODO: temporal workaround
  if(this.body.type == 0 || this.body.boneIndex == 0xFFFF)
    return;

  var m = motions[this.body.boneIndex];

  var tr = this.allocTr();
  this.rb.getMotionState().getWorldTransform(tr);
  var tr2 = this._multiplyTransforms(tr, this.boneOffsetFormInverse);

  var q = this._getBasis(tr2);
  // Right to Left

  m.r[0] = -q.x(); // 新的速度? 
  m.r[1] = -q.y();
  m.r[2] =  q.z();
  m.r[3] =  q.w();

  // __pmdModelView.physics.bodies.forEach((b)=>{
  //   console.log(b.body.name === this.body.name);
  // })

  if(this.body.type == 1) {
    var o = this._getOrigin(tr2);
    // Right to Left
    m.p[0] =  o.x(); // 新的速度? 
    m.p[1] =  o.y();
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
__inherit(PhysicsConstraint, PhysicsEntity);


/**
 * TODO: temporal
 */
PhysicsConstraint.prototype._init = function() {
  var joint = this.joint;
  var rb1 = this.bodyA.rb;
  var rb2 = this.bodyB.rb;
  var body1 = this.bodyA.body;
  var body2 = this.bodyB.body;


  if(body1.type !== 0 && body2.type == 2) {
    if(body1.boneIndex > 0       && body2.boneIndex > 0 &&
       body1.boneIndex != 0xFFFF && body2.boneIndex != 0xFFFF) {
      var b1 = this.pmd.bones[body1.boneIndex];
      var b2 = this.pmd.bones[body2.boneIndex];
      if(b2.parentIndex == b1.id) {
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

  var constraint = new Ammo.btGeneric6DofSpringConstraint(
                         rb1, rb2, r1Form2, r2Form2, true);

  // Left to Right
  var lll = this.allocV();
  var lul = this.allocV();
  var all = this.allocV();
  var aul = this.allocV();

  lll.setValue( joint.translationLimitation1[0],
                joint.translationLimitation1[1],
               -joint.translationLimitation2[2]);
  lul.setValue( joint.translationLimitation2[0],
                joint.translationLimitation2[1],
               -joint.translationLimitation1[2]);
  all.setValue(-joint.rotationLimitation2[0],
               -joint.rotationLimitation2[1],
                joint.rotationLimitation1[2]);
  aul.setValue(-joint.rotationLimitation1[0],
               -joint.rotationLimitation1[1],
                joint.rotationLimitation2[2]);

  constraint.setLinearLowerLimit(lll);
  constraint.setLinearUpperLimit(lul);
  constraint.setAngularLowerLimit(all);
  constraint.setAngularUpperLimit(aul);

  for(var i = 0; i < 3; i++) {
    if(joint.springPosition[i] != 0) {
      constraint.enableSpring(i, true);
      constraint.setStiffness(i, joint.springPosition[i]);
    }
  }

  for(var i = 0; i < 3; i++) {
    if(joint.springRotation[i] != 0) {
      constraint.enableSpring(i+3, true);
      constraint.setStiffness(i+3, joint.springRotation[i]);
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


Physics.prototype._init = function() {

  this.world = this._generateWorld();
//  this.world.addRigidBody(this._generateGround());

  this.bodies.length = 0;
  for(var i = 0; i < this.pmd.rigidBodyCount; i++) {
    this.bodies.push(new PhysicsRigidBody(
                           this.pmd,
                           this.world,
                           this.pmd.rigidBodies[i]));
  }

  this.constraints.length = 0;
  for(var i = 0; i < this.pmd.jointCount; i++) {
    var joint = this.pmd.joints[i];
    var bodyA = this.bodies[joint.rigidBody1];
    var bodyB = this.bodies[joint.rigidBody2];
    this.constraints.push(new PhysicsConstraint(
                                this.pmd,
                                this.world,
                                joint,
                                bodyA,
                                bodyB));
  }
};


Physics.prototype._generateWorld = function() {
  var config = new Ammo.btDefaultCollisionConfiguration();
  var dispatcher = new Ammo.btCollisionDispatcher(config);
  var cache = new Ammo.btDbvtBroadphase();
  var solver = new Ammo.btSequentialImpulseConstraintSolver();
  var world = new Ammo.btDiscreteDynamicsWorld(dispatcher, cache,
                                               solver, config);
  world.setGravity(new Ammo.btVector3(0, -10*10, 0));
  return world;
};


Physics.prototype._generateGround = function() {
  var form = new Ammo.btTransform();
  form.setIdentity();
  form.setOrigin(new Ammo.btVector3(0, -1, 0));
  return new Ammo.btRigidBody(
    new Ammo.btRigidBodyConstructionInfo(
      0,
      new Ammo.btDefaultMotionState(form),
      new Ammo.btBoxShape(new Ammo.btVector3(5, 1, 5)),
      new Ammo.btVector3(0, 0, 0)
    )
  );
};


Physics.prototype.simulate = function(motions, dframe) {
  // !!!!
  this._preSimulation(motions); // 计算之前
  this.world.stepSimulation(1/60, 0, 1/60);
  this._postSimulation(motions); // 执行之后
};


/**
 * TODO: temporal
 */
Physics.prototype.simulateFrame = function(motions, dframe) {
  var g;
  var stepTime = 1/60*dframe;
  var maxStepNum = dframe;
  var unitStep = 1/60;

  // Note: sacrifice some precision for the performance
  if(dframe >= 3) {
    maxStepNum = 2;
    unitStep = 1/60*2;

    g = this.world.getGravity();
    g.setY(-10*10/(2));
    this.world.setGravity(g);
  }

  this._preSimulation(motions);
  this.world.stepSimulation(stepTime, maxStepNum, unitStep);
  this._postSimulation(motions);

  if(dframe >= 3) {
    g.setY(-10*10);
    this.world.setGravity(g);
    Ammo.destroy(g); // TODO: is this necessary?
  }
};


Physics.prototype._preSimulation = function(motions) {
  for(var i = 0; i < this.bodies.length; i++) {
    this.bodies[i].preSimulation(motions);
  }
};


Physics.prototype._postSimulation = function(motions) {
  for(var i = 0; i < this.bodies.length; i++) {
    this.bodies[i].postSimulation(motions);
  }
};


Physics.prototype.resetRigidBodies = function(motions) {
  for(var i = 0; i < this.bodies.length; i++) {
    this.bodies[i].reset(motions);
  }
};

export default Physics;
