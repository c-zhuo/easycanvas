import __toString from './_Utility.js';

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
FileParser.prototype.parse = function() {
  return {};
};


FileParser.prototype._parseObject = function(obj, s) {
  var o = this.offset;
  for(var key in s) {
    obj[key] = this._getValue(s[key], this.offset);
    // TODO: this can waste time when this function is called in loop
    this.offset += this._sizeof(s[key]);
  }
};


FileParser.prototype._getValue = function(param, offset) {
  return (param.isArray === undefined)
           ? this._getValueScalar(param, offset)
           : this._getValueArray(param, offset);
};


/**
 * TODO: you may use DataView.
 */
FileParser.prototype._getValueScalar = function(param, offset) {
  switch(param.type) {
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


FileParser.prototype._getValueArray = function(param, offset) {
  if(param.type == 'char') {
    return this._getChars(offset, param.size);
  }

  if(param.type == 'strings') {
    return this._getStrings(offset, param.size);
  }

  var array = [];
  var size = this._sizeofScalar(param);
  for(var i = 0; i < param.size; i++) {
    array[i] = this._getValueScalar(param, offset);
    offset += size;
  }

  return array;
};


FileParser.prototype._sizeof = function(param) {
  return (param.isArray === undefined)
           ? this._sizeofScalar(param)
           : this._sizeofArray(param);
};


FileParser.prototype._sizeofScalar = function(param) {
  switch(param.type) {
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


FileParser.prototype._sizeofArray = function(param) {
  return this._sizeofScalar(param) * param.size;
};


FileParser.prototype._sizeofObject = function(o) {
  var size = 0;
  for(var key in o) {
    size += this._sizeof(o[key]);
  }
  return size;
};


FileParser.prototype._getUint8 = function(pos) {
  return this.uint8[pos];
};


FileParser.prototype._getUint16 = function(pos) {
  return this._getValueWithReverseByteOrder(pos, 2);
};


FileParser.prototype._getUint32 = function(pos) {
  return this._getValueWithReverseByteOrder(pos, 4);
};


FileParser.prototype._getFloat = function(pos) {
  return this._toBinary32(this._getValueWithReverseByteOrder(pos, 4));
};


FileParser.prototype._getValueWithReverseByteOrder = function(pos, size) {
  var value = 0;
  for(var i = 0; i < size; i++) {
    value = (value << 8) | this.uint8[pos+size-i-1];
  }
  return value;
};


FileParser.prototype._toBinary32 = function(uint32) {
  var sign = (uint32 >> 31) & 1;
  var exponent = (uint32 >> 23) & 0xFF;
  var fraction = uint32 & 0x7FFFFF;

  if(exponent == 0 && fraction == 0)
    return 0.0;

  if(exponent == 255 && fraction == 0)
    return Infinity;

  if(exponent == 255 && fraction != 0)
    return NaN;

  var tmp = 1;

  if(exponent == 0 && fraction != 0) {
    exponent = 1;
    tmp = 0;
  }

  for(var i = 0; i < 23; i++) {
    if((fraction >> (22-i)) & 1) {
      tmp += this.Math.pow(2, -(i+1));
    }
  }
  tmp = tmp * this.Math.pow(2, (exponent-127));
  if(sign)
    tmp = -tmp;
  return tmp;
};


FileParser.prototype._getChars = function(pos, size) {
  var str = '';
  for(var i = 0; i < size; i++) {
    var index = pos + i;
    if(this.uint8[index] == 0)
      break;
    // TODO: temporal
    str += String.fromCharCode(this.uint8[index]);
  }
  return str;
};


FileParser.prototype._getStrings = function(pos, size) {
  var str = '';
  for(var i = 0; i < size; i++) {
    var index = pos + i;
    if(this.uint8[index] == 0)
      break;
    // TODO: temporal
    str += __toString(16, this.uint8[index], 2);
  }
  return str;
};


FileParser.prototype.dump = function() {
  var array = this.uint8;

  var figure = 0;
  var tmp = array.length;
  while(tmp > 0) {
    figure++;
    tmp = (tmp/16) | 0;
  }

  var dump = '';
  var charDump = '';
  for(var i = 0; i < array.length; i++) {
    if(i%16 == 0) {
      dump += __toString(16, i, figure);
      dump += ' ';
    }

    dump += __toString(16, array[i], 2);
    dump += ' ';

    if(array[i] >= 0x20 && array[i] <= 0x7E)
      charDump += String.fromCharCode(array[i]);
    else
      charDump += '.';

    if(i%16 == 15) {
      dump += '  ';
      dump += charDump;
      dump += '\n';
      charDump = '';
    }
  }

  return dump;
};

module.exports = FileParser;
