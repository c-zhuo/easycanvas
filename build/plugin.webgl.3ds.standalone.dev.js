(function t(r, e) {
    if (typeof exports === "object" && typeof module === "object") module.exports = e(); else if (typeof define === "function" && define.amd) define([], e); else {
        var n = e();
        for (var i in n) (typeof exports === "object" ? exports : r)[i] = n[i];
    }
})(this, function() {
    return function(t) {
        var r = {};
        function e(n) {
            if (r[n]) return r[n].exports;
            var i = r[n] = {
                exports: {},
                id: n,
                loaded: false
            };
            t[n].call(i.exports, i, i.exports, e);
            i.loaded = true;
            return i.exports;
        }
        e.m = t;
        e.c = r;
        e.p = "";
        return e(0);
    }({
        0: function(t, r, e) {
            t.exports = e(95);
        },
        42: function(t, r, e) {
            (function(r) {
                "use strict";
                var e = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
                    return typeof t;
                } : function(t) {
                    return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                };
                var n = 0;
                var i = 19789;
                var a = 11565;
                var o = 11581;
                var s = 15786;
                var f = 15871;
                var u = 49725;
                var h = 2;
                var l = 5;
                var v = 16;
                var p = 17;
                var d = 18;
                var g = 19;
                var y = 48;
                var w = 49;
                var b = 15677;
                var _ = 15678;
                var m = 256;
                var A = 5120;
                var E = 5136;
                var B = 5152;
                var k = 5168;
                var R = 5184;
                var U = 5200;
                var C = 5216;
                var S = 5376;
                var T = 8448;
                var I = 4352;
                var P = 4608;
                var M = 4864;
                var L = 4353;
                var x = 4609;
                var D = 4865;
                var O = 8704;
                var Y = 8720;
                var N = 8962;
                var F = 8960;
                var j = 8976;
                var V = 8705;
                var z = 8963;
                var W = 8961;
                var G = 45055;
                var H = 40960;
                var X = 40976;
                var q = 40992;
                var J = 41008;
                var Z = 41024;
                var K = 41025;
                var Q = 41040;
                var $ = 41042;
                var tt = 41536;
                var rt = 41043;
                var et = 41216;
                var nt = 41552;
                var it = 41092;
                var at = 41089;
                var ot = 41090;
                var st = 41091;
                var ft = 41093;
                var ut = 41096;
                var ht = 41098;
                var lt = 41100;
                var ct = 41102;
                var vt = 41095;
                var pt = 41472;
                var dt = 41760;
                var gt = 41790;
                var yt = 41770;
                var wt = 41786;
                var bt = 41761;
                var _t = 41792;
                var mt = 41772;
                var At = 41488;
                var Et = 41762;
                var Bt = 41794;
                var kt = 41774;
                var Rt = 41520;
                var Ut = 41764;
                var Ct = 41796;
                var St = 41776;
                var Tt = 41476;
                var It = 41765;
                var Pt = 41800;
                var Mt = 41778;
                var Lt = 41788;
                var xt = 41766;
                var Dt = 41798;
                var Ot = 41780;
                var Yt = 41789;
                var Nt = 41768;
                var Ft = 41802;
                var jt = 41782;
                var Vt = 41504;
                var zt = 41804;
                var Wt = 41784;
                var Gt = 41744;
                var Ht = 41728;
                var Xt = 41809;
                var qt = 41811;
                var Jt = 41812;
                var Zt = 41814;
                var Kt = 41816;
                var Qt = 41818;
                var $t = 41820;
                var tr = 41824;
                var rr = 41826;
                var er = 41828;
                var nr = 41830;
                var ir = 41832;
                var ar = 16384;
                var or = 17920;
                var sr = 17952;
                var fr = 18010;
                var ur = 18009;
                var hr = 18011;
                var lr = 18004;
                var cr = 17957;
                var vr = 17936;
                var pr = 18006;
                var dr = 17968;
                var gr = 17985;
                var yr = 18e3;
                var wr = 18001;
                var br = 18007;
                var _r = 18003;
                var mr = 18002;
                var Ar = 18008;
                var Er = 17959;
                var Br = 18176;
                var kr = 18192;
                var Rr = 18208;
                var Ur = 16400;
                var Cr = 16401;
                var Sr = 16402;
                var Tr = 16407;
                var Ir = 16403;
                var Pr = 16404;
                var Mr = 16405;
                var Lr = 16406;
                var xr = 16640;
                var Dr = 16656;
                var Or = 16657;
                var Yr = 16672;
                var Nr = 16688;
                var Fr = 16720;
                var jr = 16784;
                var Vr = 16704;
                var zr = 16736;
                var Wr = 16741;
                var Gr = 16752;
                var Hr = 45056;
                var Xr = 45066;
                var qr = 45064;
                var Jr = 45065;
                var Zr = 45057;
                var Kr = 45058;
                var Qr = 45059;
                var $r = 45060;
                var te = 45061;
                var re = 45062;
                var ee = 45063;
                var ne = 45104;
                var ie = 45072;
                var ae = 45075;
                var oe = 45073;
                var se = 45077;
                var fe = 45076;
                var ue = 45088;
                var he = 45093;
                var le = 45089;
                var ce = 45090;
                var ve = 45094;
                var pe = 45091;
                var de = 45092;
                var ge = 45095;
                var ye = 45096;
                var we = 45097;
                var be = 20480;
                var _e = 20496;
                var me = 20497;
                var Ae = 20512;
                var Ee = 24576;
                var Be = 24581;
                var ke = 24592;
                var Re = 24608;
                var Ue = 24624;
                var Ce = 24640;
                var Se = 24656;
                var Te = 24672;
                var Ie = 24688;
                var Pe = 24704;
                var Me = 24720;
                var Le = 24736;
                var xe = 24832;
                var De = 24848;
                var Oe = 24864;
                var Ye = 24880;
                var Ne = 24896;
                var Fe = 24912;
                var je = 24928;
                var Ve = 12288;
                var ze = 12304;
                var We = 12320;
                var Ge = 12336;
                var He = 12352;
                var Xe = 12368;
                var qe = 12384;
                var Je = 12400;
                var Ze = 12416;
                var Ke = 12432;
                var Qe = 28672;
                var $e = 28688;
                var tn = 28673;
                var rn = 28689;
                var en = 28690;
                var nn = 28704;
                var an = 28720;
                var on = function t(r, e) {
                    this.element = r;
                    this.debug = e != undefined ? e : false;
                    this.position = 0;
                    this.meshes = [];
                    this.materials = {};
                };
                var sn;
                (function(t) {
                    var n = this;
                    var i = {
                        ArrayBuffer: typeof ArrayBuffer !== "undefined",
                        DataView: typeof DataView !== "undefined" && ("getFloat64" in DataView.prototype || "getFloat64" in new DataView(new ArrayBuffer(1))),
                        NodeBuffer: typeof r !== "undefined" && "readInt16LE" in r.prototype
                    };
                    var a = {
                        Int8: 1,
                        Int16: 2,
                        Int32: 4,
                        Uint8: 1,
                        Uint16: 2,
                        Uint32: 4,
                        Float32: 4,
                        Float64: 8
                    };
                    var o = {
                        Int8: "Int8",
                        Int16: "Int16",
                        Int32: "Int32",
                        Uint8: "UInt8",
                        Uint16: "UInt16",
                        Uint32: "UInt32",
                        Float32: "Float",
                        Float64: "Double"
                    };
                    sn = function t(e, s, f, u) {
                        if (!(this instanceof sn)) {
                            throw new Error("jDataView constructor may not be called as a function");
                        }
                        this.buffer = e = sn.wrapBuffer(e);
                        this._isArrayBuffer = i.ArrayBuffer && e instanceof ArrayBuffer;
                        this._isDataView = i.DataView && this._isArrayBuffer;
                        this._isNodeBuffer = i.NodeBuffer && e instanceof r;
                        if (!this._isNodeBuffer && !this._isArrayBuffer && !(e instanceof Array)) {
                            throw new TypeError("jDataView buffer has an incompatible type");
                        }
                        this._littleEndian = Boolean(u);
                        var h = this._isArrayBuffer ? e.byteLength : e.length;
                        if (s === undefined) {
                            s = 0;
                        }
                        this.byteOffset = s;
                        if (f === undefined) {
                            f = h - s;
                        }
                        this.byteLength = f;
                        if (!this._isDataView) {
                            if (typeof s !== "number") {
                                throw new TypeError("jDataView byteOffset is not a number");
                            }
                            if (typeof f !== "number") {
                                throw new TypeError("jDataView byteLength is not a number");
                            }
                            if (s < 0) {
                                throw new Error("jDataView byteOffset is negative");
                            }
                            if (f < 0) {
                                throw new Error("jDataView byteLength is negative");
                            }
                        }
                        if (this._isDataView) {
                            this._view = new DataView(e, s, f);
                        }
                        this._start = s;
                        if (s + f > h) {
                            throw new Error("jDataView (byteOffset + byteLength) value is out of bounds");
                        }
                        this._offset = 0;
                        if (this._isDataView) {
                            for (var l in a) {
                                if (!a.hasOwnProperty(l)) {
                                    continue;
                                }
                                (function(t, r) {
                                    var e = a[t];
                                    r["get" + t] = function(n, i) {
                                        if (i === undefined) {
                                            i = r._littleEndian;
                                        }
                                        if (n === undefined) {
                                            n = r._offset;
                                        }
                                        r._offset = n + e;
                                        return r._view["get" + t](n, i);
                                    };
                                    r["set" + t] = function(n, i, a) {
                                        if (a === undefined) {
                                            a = r._littleEndian;
                                        }
                                        if (n === undefined) {
                                            n = r._offset;
                                        }
                                        r._offset = n + e;
                                        r._view["set" + t](n, i, a);
                                    };
                                })(l, this);
                            }
                        } else if (this._isNodeBuffer) {
                            for (var l in a) {
                                if (!a.hasOwnProperty(l)) {
                                    continue;
                                }
                                (function(t, r) {
                                    var e = a[t];
                                    r["get" + t] = function(n, i) {
                                        if (i === undefined) {
                                            i = r._littleEndian;
                                        }
                                        if (n === undefined) {
                                            n = r._offset;
                                        }
                                        var a;
                                        if (t === "Int8" || t === "Uint8") {
                                            a = "read" + o[t];
                                        } else if (i) {
                                            a = "read" + o[t] + "LE";
                                        } else {
                                            a = "read" + o[t] + "BE";
                                        }
                                        r._offset = n + e;
                                        return r.buffer[a](r._start + n);
                                    };
                                    r["set" + t] = function(n, i, a) {
                                        if (a === undefined) {
                                            a = r._littleEndian;
                                        }
                                        if (n === undefined) {
                                            n = r._offset;
                                        }
                                        var s;
                                        if (t === "Int8" || t === "Uint8") {
                                            s = "write" + o[t];
                                        } else if (a) {
                                            s = "write" + o[t] + "LE";
                                        } else {
                                            s = "write" + o[t] + "BE";
                                        }
                                        r._offset = n + e;
                                        r.buffer[s](i, r._start + n);
                                    };
                                })(l, this);
                            }
                        } else if (this._isArrayBuffer) {
                            for (var l in a) {
                                if (!a.hasOwnProperty(l)) {
                                    continue;
                                }
                                (function(t, r) {
                                    var e = a[t];
                                    r["get" + t] = function(i, a) {
                                        if (a === undefined) {
                                            a = r._littleEndian;
                                        }
                                        if (i === undefined) {
                                            i = r._offset;
                                        }
                                        var o, s;
                                        if (e === 1 || (r._start + i) % e === 0 && a) {
                                            o = r.buffer;
                                            s = r._start + i;
                                            r._offset = i + e;
                                        } else {
                                            o = new Uint8Array(r.getBytes(e, i, a)).buffer;
                                            s = 0;
                                        }
                                        return new n[t + "Array"](o, s, 1)[0];
                                    };
                                    r["set" + t] = function(i, a, o) {
                                        if (o === undefined) {
                                            o = r._littleEndian;
                                        }
                                        if (i === undefined) {
                                            i = r._offset;
                                        }
                                        var s = n[t + "Array"];
                                        if (e === 1 || (r._start + i) % e === 0 && o) {
                                            new s(r.buffer, r._start + i, 1)[0] = a;
                                            r._offset = i + e;
                                        } else {
                                            var f = new Uint8Array(e);
                                            new s(f.buffer, 0, 1)[0] = a;
                                            r.setBytes(i, f, o);
                                        }
                                    };
                                })(l, this);
                            }
                        } else {
                            for (var l in a) {
                                if (!a.hasOwnProperty(l)) {
                                    continue;
                                }
                                (function(t, r) {
                                    var e = a[t];
                                    r["get" + t] = function(n, i) {
                                        if (i === undefined) {
                                            i = r._littleEndian;
                                        }
                                        if (n === undefined) {
                                            n = r._offset;
                                        }
                                        if (typeof n !== "number") {
                                            throw new TypeError("jDataView byteOffset is not a number");
                                        }
                                        if (n + e > r.byteLength) {
                                            throw new Error("jDataView (byteOffset + size) value is out of bounds");
                                        }
                                        return r["_get" + t](n, i);
                                    };
                                    r["set" + t] = function(n, i, a) {
                                        if (a === undefined) {
                                            a = r._littleEndian;
                                        }
                                        if (n === undefined) {
                                            n = r._offset;
                                        }
                                        r._offset = n + e;
                                        if (typeof n !== "number") {
                                            throw new TypeError("jDataView byteOffset is not a number");
                                        }
                                        if (n + e > r.byteLength) {
                                            throw new Error("jDataView (byteOffset + size) value is out of bounds");
                                        }
                                        r["_set" + t.replace("Uint", "Int")](n, i, a);
                                    };
                                })(l, this);
                            }
                        }
                        for (var l in a) {
                            if (!a.hasOwnProperty(l)) {
                                continue;
                            }
                            (function(t, r) {
                                r["write" + t] = function(r, e) {
                                    this["set" + t](undefined, r, e);
                                };
                            })(l, this);
                        }
                    };
                    sn.wrapBuffer = function(t) {
                        switch (typeof t === "undefined" ? "undefined" : e(t)) {
                          case "string":
                            t = Array.prototype.map.call(t, function(t) {
                                return t.charCodeAt(0) & 255;
                            });
                            break;

                          case "number":
                            t = {
                                length: t
                            };
                            break;
                        }
                        if ("length" in t && !(i.NodeBuffer && t instanceof r || i.ArrayBuffer && t instanceof ArrayBuffer)) {
                            if (i.NodeBuffer) {
                                t = new r(t);
                            } else if (i.ArrayBuffer) {
                                var n = t instanceof Uint8Array ? t : new Uint8Array(t);
                                t = n.buffer;
                            } else {
                                if (!(t instanceof Array)) {
                                    t = Array.prototype.slice.call(t);
                                }
                                for (var a = 0, o = t.length; a < o; a++) {
                                    t[a] &= 255;
                                }
                            }
                        }
                        return t;
                    };
                    sn.createBuffer = function() {
                        return sn.wrapBuffer(arguments);
                    };
                    sn.prototype = {
                        compatibility: i,
                        _getBytes: function t(r, e, n) {
                            var i;
                            if (n === undefined) {
                                n = this._littleEndian;
                            }
                            if (e === undefined) {
                                e = this._offset;
                            }
                            if (r === undefined) {
                                r = this.byteLength - e;
                            }
                            if (typeof e !== "number") {
                                throw new TypeError("jDataView byteOffset is not a number");
                            }
                            if (r < 0 || e + r > this.byteLength) {
                                throw new Error("jDataView length or (byteOffset+length) value is out of bounds");
                            }
                            e += this._start;
                            if (this._isArrayBuffer) {
                                i = new Uint8Array(this.buffer, e, r);
                            } else {
                                i = this.buffer.slice(e, e + r);
                            }
                            if (!n && r > 1) {
                                if (!(i instanceof Array)) {
                                    i = Array.prototype.slice.call(i);
                                }
                                i.reverse();
                            }
                            this._offset = e - this._start + r;
                            return i;
                        },
                        getBytes: function t(r, e, n) {
                            var i = this._getBytes.apply(this, arguments);
                            if (!(i instanceof Array)) {
                                i = Array.prototype.slice.call(i);
                            }
                            return i;
                        },
                        setBytes: function t(e, n, i) {
                            var a = n.length;
                            if (i === undefined) {
                                i = this._littleEndian;
                            }
                            if (e === undefined) {
                                e = this._offset;
                            }
                            if (typeof e !== "number") {
                                throw new TypeError("jDataView byteOffset is not a number");
                            }
                            if (a < 0 || e + a > this.byteLength) {
                                throw new Error("jDataView length or (byteOffset+length) value is out of bounds");
                            }
                            if (!i && a > 1) {
                                n = Array.prototype.slice.call(n).reverse();
                            }
                            e += this._start;
                            if (this._isArrayBuffer) {
                                new Uint8Array(this.buffer, e, a).set(n);
                            } else {
                                if (this._isNodeBuffer) {
                                    new r(n).copy(this.buffer, e);
                                } else {
                                    for (var o = 0; o < a; o++) {
                                        this.buffer[e + o] = n[o];
                                    }
                                }
                            }
                            this._offset = e - this._start + a;
                        },
                        writeBytes: function t(r, e) {
                            this.setBytes(undefined, r, e);
                        },
                        getString: function t(r, e) {
                            return String.fromCharCode.apply(null, this._getBytes(r, e, true));
                        },
                        setString: function t(r, e) {
                            this.setBytes(r, Array.prototype.map.call(e, function(t) {
                                return t.charCodeAt(0) & 255;
                            }), true);
                        },
                        writeString: function t(r) {
                            this.setString(undefined, r);
                        },
                        getChar: function t(r) {
                            return this.getString(1, r);
                        },
                        setChar: function t(r, e) {
                            this.setString.apply(this, arguments);
                        },
                        writeChar: function t(r) {
                            this.setChar(undefined, r);
                        },
                        tell: function t() {
                            return this._offset;
                        },
                        seek: function t(r) {
                            if (typeof r !== "number") {
                                throw new TypeError("jDataView byteOffset is not a number");
                            }
                            if (r < 0 || r > this.byteLength) {
                                throw new Error("jDataView byteOffset value is out of bounds");
                            }
                            return this._offset = r;
                        },
                        slice: function t(r, e, n) {
                            return n ? new sn(this.getBytes(e - r, r), undefined, undefined, true) : new sn(this.buffer, this._start + r, e - r, this._littleEndian);
                        },
                        _getFloat64: function t(r, e) {
                            var n = this._getBytes(8, r, e), i = 1 - 2 * (n[7] >> 7), a = ((n[7] << 1 & 255) << 3 | n[6] >> 4) - ((1 << 10) - 1), o = (n[6] & 15) * Math.pow(2, 48) + n[5] * Math.pow(2, 40) + n[4] * Math.pow(2, 32) + n[3] * Math.pow(2, 24) + n[2] * Math.pow(2, 16) + n[1] * Math.pow(2, 8) + n[0];
                            if (a === 1024) {
                                if (o !== 0) {
                                    return NaN;
                                } else {
                                    return i * Infinity;
                                }
                            }
                            if (a === -1023) {
                                return i * o * Math.pow(2, -1022 - 52);
                            }
                            return i * (1 + o * Math.pow(2, -52)) * Math.pow(2, a);
                        },
                        _getFloat32: function t(r, e) {
                            var n = this._getBytes(4, r, e), i = 1 - 2 * (n[3] >> 7), a = (n[3] << 1 & 255 | n[2] >> 7) - 127, o = (n[2] & 127) << 16 | n[1] << 8 | n[0];
                            if (a === 128) {
                                if (o !== 0) {
                                    return NaN;
                                } else {
                                    return i * Infinity;
                                }
                            }
                            if (a === -127) {
                                return i * o * Math.pow(2, -126 - 23);
                            }
                            return i * (1 + o * Math.pow(2, -23)) * Math.pow(2, a);
                        },
                        _getInt32: function t(r, e) {
                            var n = this._getBytes(4, r, e);
                            return n[3] << 24 | n[2] << 16 | n[1] << 8 | n[0];
                        },
                        _getUint32: function t(r, e) {
                            return this._getInt32(r, e) >>> 0;
                        },
                        _getInt16: function t(r, e) {
                            return this._getUint16(r, e) << 16 >> 16;
                        },
                        _getUint16: function t(r, e) {
                            var n = this._getBytes(2, r, e);
                            return n[1] << 8 | n[0];
                        },
                        _getInt8: function t(r) {
                            return this._getUint8(r) << 24 >> 24;
                        },
                        _getUint8: function t(r) {
                            return this._getBytes(1, r)[0];
                        },
                        _setBinaryFloat: function t(r, e, n, i, a) {
                            var o = e < 0 ? 1 : 0, s, f, u = ~(-1 << i - 1), h = 1 - u;
                            if (e < 0) {
                                e = -e;
                            }
                            if (e === 0) {
                                s = h - 1;
                                f = 0;
                            } else if (isNaN(e)) {
                                s = u + 1;
                                f = 1;
                            } else if (e === Infinity) {
                                s = u + 1;
                                f = 0;
                            } else {
                                s = Math.floor(Math.log(e) / Math.LN2);
                                if (s > h && s <= u) {
                                    f = Math.floor((e * Math.pow(2, -s) - 1) * Math.pow(2, n));
                                } else {
                                    f = Math.floor(e * Math.pow(2, n - h));
                                    s = h - 1;
                                }
                            }
                            s += u;
                            var l = [];
                            while (n >= 8) {
                                l.push(f % 256);
                                f = Math.floor(f / 256);
                                n -= 8;
                            }
                            s = s << n | f;
                            i += n;
                            while (i >= 8) {
                                l.push(s & 255);
                                s >>>= 8;
                                i -= 8;
                            }
                            l.push(o << i | s);
                            this.setBytes(r, l, a);
                        },
                        _setFloat32: function t(r, e, n) {
                            this._setBinaryFloat(r, e, 23, 8, n);
                        },
                        _setFloat64: function t(r, e, n) {
                            this._setBinaryFloat(r, e, 52, 11, n);
                        },
                        _setInt32: function t(r, e, n) {
                            this.setBytes(r, [ e & 255, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 ], n);
                        },
                        _setInt16: function t(r, e, n) {
                            this.setBytes(r, [ e & 255, e >>> 8 ], n);
                        },
                        _setInt8: function t(r, e) {
                            this.setBytes(r, [ e ]);
                        }
                    };
                })();
                (function() {
                    var t = on.prototype;
                    t.readFile = function(t) {
                        this.position = 0;
                        this.meshes = [];
                        this.materials = {};
                        var r = new sn(t, 0, undefined, true);
                        var e = this.readChunk(r);
                        var n = 0;
                        switch (e.id) {
                          case s:
                          case u:
                          case i:
                            n = this.nextChunk(r, e);
                            while (n != 0) {
                                switch (n) {
                                  case h:
                                    this.mesh_version = this.readDWord(r);
                                    this.log("M3D_VERSION " + this.mesh_version);
                                    break;

                                  case b:
                                    this.resetPosition(r);
                                    this.log("MDATA");
                                    this.readMDATA(r);
                                    break;

                                  case Hr:
                                  default:
                                    this.log("Unknown chunk: " + n.toString(16));
                                    break;
                                }
                                n = this.nextChunk(r, e);
                            }
                            break;

                          default:
                            this.log("Unknown main chunk: " + n.toString(16));
                            break;
                        }
                        this.log("parsed #" + this.meshes.length + " meshes!");
                    };
                    t.readMDATA = function(t) {
                        var r = this.readChunk(t);
                        var e = this.nextChunk(t, r);
                        while (e != 0) {
                            switch (e) {
                              case _:
                                this.mesh_version = this.readInt(t);
                                this.log("MESH_VERSION: " + this.mesh_version);
                                break;

                              case m:
                                this.master_scale = this.readFloat(t);
                                this.log("MASTER_SCALE: " + this.master_scale);
                                break;

                              case ar:
                                this.resetPosition(t);
                                this.log("NAMED OBJECT");
                                this.readNamedObject(t);
                                break;

                              case G:
                                this.resetPosition(t);
                                this.log("MATERIAL ENTRY");
                                this.readMaterialEntry(t);
                                break;

                              default:
                                this.log("Unknown MDATA chunk: " + e.toString(16));
                                break;
                            }
                            e = this.nextChunk(t, r);
                        }
                    };
                    t.readMaterialEntry = function(t) {
                        var r = this.readChunk(t);
                        var e = this.nextChunk(t, r);
                        var n = new ln();
                        while (e != 0) {
                            switch (e) {
                              case H:
                                n.name = this.readString(t, 64);
                                this.log(" -> name: " + n.name);
                                break;

                              case X:
                                n.ambientColor = this.readColor(t);
                                this.log(" -> ambientColor: " + n.ambientColor.toString(16));
                                break;

                              case q:
                                n.diffuseColor = this.readColor(t);
                                this.log(" -> diffuseColor: " + n.diffuseColor.toString(16));
                                break;

                              case J:
                                n.specularColor = this.readColor(t);
                                this.log(" -> specularColor: " + n.specularColor.toString(16));
                                break;

                              default:
                                this.log(" -> Unknown material chunk: " + e.toString(16));
                                break;
                            }
                            e = this.nextChunk(t, r);
                        }
                        this.endChunk(r);
                        this.materials[n.name] = n;
                    };
                    t.readColor = function(t) {
                        var r = this.readChunk(t);
                        var e = 0;
                        switch (r.id) {
                          case p:
                          case d:
                            var n = this.readByte(t);
                            var i = this.readByte(t);
                            var a = this.readByte(t);
                            e = n << 16 | i << 8 | a;
                            break;

                          case v:
                          case g:
                            var n = this.readFloat(t);
                            var i = this.readFloat(t);
                            var a = this.readFloat(t);
                            e = Math.floor(n * 255) << 16 | Math.floor(i * 255) << 8 | Math.floor(a * 255);
                            break;

                          default:
                            this.log("Unknown color chunk: " + c.toString(16));
                            break;
                        }
                        this.endChunk(r);
                        return e;
                    };
                    t.readMesh = function(t) {
                        var r = this.readChunk(t);
                        var e = this.nextChunk(t, r);
                        var n = new hn();
                        var i, a;
                        while (e != 0) {
                            switch (e) {
                              case Wr:
                                n.color = this.readByte(t);
                                this.log(" -> color: " + n.color);
                                break;

                              case Dr:
                                n.points = this.readWord(t);
                                n.pointL = [];
                                this.log(" -> #points: " + n.points + " " + this.position);
                                for (i = 0; i < n.points; i++) {
                                    var o = [];
                                    for (a = 0; a < 3; a++) {
                                        o.push(this.readFloat(t));
                                    }
                                    n.pointL.push(o);
                                }
                                break;

                              case Yr:
                                this.resetPosition(t);
                                this.readFaceArray(t, n);
                                break;

                              case Vr:
                                n.texels = this.readWord(t);
                                n.texelL = [];
                                this.log(" -> #texels: " + n.texels);
                                for (i = 0; i < n.texels; i++) {
                                    n.texelL.push([ this.readFloat(t), this.readFloat(t) ]);
                                }
                                break;

                              case zr:
                              case Or:
                              case Gr:
                              default:
                                this.log(" -> Unknown mesh chunk: " + e.toString(16));
                                break;
                            }
                            e = this.nextChunk(t, r);
                        }
                        this.endChunk(r);
                        return n;
                    };
                    t.readFaceArray = function(t, r) {
                        var e = this.readChunk(t);
                        var n, i;
                        r.faces = this.readWord(t);
                        r.faceL = [];
                        this.log(" -> #faces: " + r.faces);
                        for (n = 0; n < r.faces; ++n) {
                            var a = new un();
                            a.points = [];
                            a.points.push(this.readWord(t));
                            a.points.push(this.readWord(t));
                            a.points.push(this.readWord(t));
                            a.flags = this.readWord(t);
                            r.faceL.push(a);
                        }
                        while (this.position < e.end) {
                            var e = this.readChunk(t);
                            switch (e.id) {
                              case Nr:
                                this.log(" -> MATERIAL_GROUP");
                                this.resetPosition(t);
                                var o = this.readMaterialGroup(t);
                                var s = o.faceIdxs;
                                for (n = 0; n < s.length; n++) {
                                    var a = r.faceL[s[n]];
                                    a.material = o.name;
                                }
                                break;

                              case Fr:
                              default:
                                this.log(" -> Unknown face array chunk: " + c.toString(16));
                                break;
                            }
                            this.endChunk(e);
                        }
                        this.endChunk(e);
                    };
                    t.readMaterialGroup = function(t) {
                        var r = this.readChunk(t);
                        var e = this.readString(t, 64);
                        var n = this.readWord(t);
                        this.log(" --> material name: " + e);
                        this.log(" --> num faces: " + n);
                        var i = [];
                        for (var a = 0; a < n; ++a) {
                            i.push(this.readWord(t));
                        }
                        return {
                            name: e,
                            faceIdxs: i
                        };
                    };
                    t.readNamedObject = function(t) {
                        var r = this.readChunk(t);
                        var e = this.readString(t, 64);
                        this.log(" -> " + e);
                        r.cur = this.position;
                        var n = this.nextChunk(t, r);
                        while (n != 0) {
                            switch (n) {
                              case xr:
                                this.resetPosition(t);
                                var i = this.readMesh(t);
                                this.meshes.push(i);
                                break;

                              default:
                                this.log("Unknown named object chunk: " + n.toString(16));
                                break;
                            }
                            n = this.nextChunk(t, r);
                        }
                        this.endChunk(r);
                    };
                    t.readChunk = function(t) {
                        var r = new fn();
                        r.cur = this.position;
                        r.id = this.readWord(t);
                        r.size = this.readDWord(t);
                        r.end = r.cur + r.size;
                        r.cur += 6;
                        return r;
                    };
                    t.endChunk = function(t) {
                        this.position = t.end;
                    };
                    t.nextChunk = function(t, r) {
                        if (r.cur >= r.end) {
                            return 0;
                        }
                        this.position = r.cur;
                        try {
                            var e = this.readChunk(t);
                            r.cur += e.size;
                            return e.id;
                        } catch (t) {
                            this.log("Unable to read chunk at " + this.position);
                            return 0;
                        }
                    };
                    t.resetPosition = function(t, r) {
                        this.position -= 6;
                    };
                    t.readByte = function(t) {
                        var r = t.getUint8(this.position);
                        this.position += 1;
                        return r;
                    };
                    t.readFloat = function(t) {
                        try {
                            var r = t.getFloat32(this.position);
                            this.position += 4;
                            return r;
                        } catch (r) {
                            this.log("" + r + " " + this.position + " " + t.byteLength);
                        }
                    };
                    t.readInt = function(t) {
                        var r = t.getInt32(this.position);
                        this.position += 4;
                        return r;
                    };
                    t.readShort = function(t) {
                        var r = t.getInt16(this.position);
                        this.position += 2;
                        return r;
                    };
                    t.readDWord = function(t) {
                        var r = t.getUint32(this.position);
                        this.position += 4;
                        return r;
                    };
                    t.readWord = function(t) {
                        var r = t.getUint16(this.position);
                        this.position += 2;
                        return r;
                    };
                    t.readString = function(t, r) {
                        var e = "";
                        for (var n = 0; n < r; n++) {
                            var i = this.readByte(t);
                            if (!i) break;
                            e += String.fromCharCode(i);
                        }
                        return e;
                    };
                    t.log = function(t) {
                        if (this.debug) {
                            console.log(t);
                            if (this.element) {
                                this.element.innerHTML += t + "<br/>";
                            }
                        }
                    };
                })();
                var fn = function t() {
                    this.cur = 0;
                    this.id = 0;
                    this.size = 0;
                    this.end = 0;
                };
                var un = function t() {
                    this.flags = 0;
                    this.points = [];
                    this.material = "";
                };
                var hn = function t() {
                    this.next = null;
                    this.matrix = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
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
                var ln = function t() {
                    this.name = "";
                    this.ambientColor = 0;
                    this.diffuseColor = 0;
                    this.spectralColor = 0;
                };
                t.exports = on;
            }).call(r, e(105).Buffer);
        },
        95: function(t, r, e) {
            "use strict";
            var n = Object.assign || function(t) {
                for (var r = 1; r < arguments.length; r++) {
                    var e = arguments[r];
                    for (var n in e) {
                        if (Object.prototype.hasOwnProperty.call(e, n)) {
                            t[n] = e[n];
                        }
                    }
                }
                return t;
            };
            var i = e(42);
            var a = o(i);
            function o(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function s(t, r) {
                var e = new XMLHttpRequest();
                if (e.overrideMimeType) {
                    e.overrideMimeType("text/plain; charset=x-user-defined");
                }
                e.onreadystatechange = function() {
                    if (e.readyState == 4) {
                        if (e.status == 0 || e.status == 200) {
                            var t = new a.default(false, false);
                            t.readFile(e.responseText);
                            var n = [];
                            for (var i = 0; i < t.meshes.length; i++) {
                                var o = [];
                                var s = [];
                                var f = [];
                                var u = t.meshes[i];
                                for (var h = 0; h < u.points; h++) {
                                    var l = u.pointL[h];
                                    o.push(l[0]);
                                    o.push(l[1]);
                                    o.push(l[2]);
                                }
                                for (h = 0; h < u.faces; h++) {
                                    var c = u.faceL[h];
                                    var v = c.points[0];
                                    var p = c.points[1];
                                    var d = c.points[2];
                                    s.push(v);
                                    s.push(p);
                                    s.push(d);
                                }
                                for (h = 0; h < u.texels; h++) {
                                    var g = u.texelL[h];
                                    var y = g[0];
                                    var w = g[1];
                                    f.push(y);
                                    f.push(1 - w);
                                }
                                n.push({
                                    vertices: o,
                                    indices: s,
                                    textures: f,
                                    img: u.faceL[0] && u.faceL[0].material
                                });
                            }
                            r(n, t);
                        }
                    }
                };
                e.open("GET", t, true);
                e.send(null);
            }
            var f = function t(r) {
                if (!r.webgl || !r.webgl._3ds) {
                    return;
                }
                var e = r.webgl._3ds;
                var i = r.webgl._3dsImg;
                var a = r.webgl.cache !== false;
                var o = this;
                s(e, function(t) {
                    o.webgl = {};
                    delete r.webgl._3ds;
                    delete r.webgl.cache;
                    t.forEach(function(t) {
                        var e = i && i[t.img];
                        o.add({
                            name: t.img,
                            webgl: n(window.Easycanvas.webglShapes.custom({
                                vertices: t.vertices,
                                indices: t.indices,
                                img: !(e instanceof Array) && e,
                                textures: t.textures,
                                colors: e instanceof Array && e
                            }), r.webgl)
                        });
                    });
                    o.trigger("webgl-3ds-loaded");
                }, a);
            };
            var u = typeof window !== "undefined";
            if (u && window.Easycanvas) {
                window.Easycanvas.loader3DS = s;
                Easycanvas.extend(f);
            } else {
                t.exports = {
                    loader3DS: s,
                    classInit: f
                };
            }
        },
        104: function(t, r) {
            "use strict";
            r.byteLength = u;
            r.toByteArray = h;
            r.fromByteArray = v;
            var e = [];
            var n = [];
            var i = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
            var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (var o = 0, s = a.length; o < s; ++o) {
                e[o] = a[o];
                n[a.charCodeAt(o)] = o;
            }
            n["-".charCodeAt(0)] = 62;
            n["_".charCodeAt(0)] = 63;
            function f(t) {
                var r = t.length;
                if (r % 4 > 0) {
                    throw new Error("Invalid string. Length must be a multiple of 4");
                }
                return t[r - 2] === "=" ? 2 : t[r - 1] === "=" ? 1 : 0;
            }
            function u(t) {
                return t.length * 3 / 4 - f(t);
            }
            function h(t) {
                var r, e, a, o, s;
                var u = t.length;
                o = f(t);
                s = new i(u * 3 / 4 - o);
                e = o > 0 ? u - 4 : u;
                var h = 0;
                for (r = 0; r < e; r += 4) {
                    a = n[t.charCodeAt(r)] << 18 | n[t.charCodeAt(r + 1)] << 12 | n[t.charCodeAt(r + 2)] << 6 | n[t.charCodeAt(r + 3)];
                    s[h++] = a >> 16 & 255;
                    s[h++] = a >> 8 & 255;
                    s[h++] = a & 255;
                }
                if (o === 2) {
                    a = n[t.charCodeAt(r)] << 2 | n[t.charCodeAt(r + 1)] >> 4;
                    s[h++] = a & 255;
                } else if (o === 1) {
                    a = n[t.charCodeAt(r)] << 10 | n[t.charCodeAt(r + 1)] << 4 | n[t.charCodeAt(r + 2)] >> 2;
                    s[h++] = a >> 8 & 255;
                    s[h++] = a & 255;
                }
                return s;
            }
            function l(t) {
                return e[t >> 18 & 63] + e[t >> 12 & 63] + e[t >> 6 & 63] + e[t & 63];
            }
            function c(t, r, e) {
                var n;
                var i = [];
                for (var a = r; a < e; a += 3) {
                    n = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (t[a + 2] & 255);
                    i.push(l(n));
                }
                return i.join("");
            }
            function v(t) {
                var r;
                var n = t.length;
                var i = n % 3;
                var a = "";
                var o = [];
                var s = 16383;
                for (var f = 0, u = n - i; f < u; f += s) {
                    o.push(c(t, f, f + s > u ? u : f + s));
                }
                if (i === 1) {
                    r = t[n - 1];
                    a += e[r >> 2];
                    a += e[r << 4 & 63];
                    a += "==";
                } else if (i === 2) {
                    r = (t[n - 2] << 8) + t[n - 1];
                    a += e[r >> 10];
                    a += e[r >> 4 & 63];
                    a += e[r << 2 & 63];
                    a += "=";
                }
                o.push(a);
                return o.join("");
            }
        },
        105: function(t, r, e) {
            (function(t) {
                "use strict";
                var n = e(104);
                var i = e(107);
                var a = e(106);
                r.Buffer = u;
                r.SlowBuffer = b;
                r.INSPECT_MAX_BYTES = 50;
                u.TYPED_ARRAY_SUPPORT = t.TYPED_ARRAY_SUPPORT !== undefined ? t.TYPED_ARRAY_SUPPORT : o();
                r.kMaxLength = s();
                function o() {
                    try {
                        var t = new Uint8Array(1);
                        t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42;
                            }
                        };
                        return t.foo() === 42 && typeof t.subarray === "function" && t.subarray(1, 1).byteLength === 0;
                    } catch (t) {
                        return false;
                    }
                }
                function s() {
                    return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
                }
                function f(t, r) {
                    if (s() < r) {
                        throw new RangeError("Invalid typed array length");
                    }
                    if (u.TYPED_ARRAY_SUPPORT) {
                        t = new Uint8Array(r);
                        t.__proto__ = u.prototype;
                    } else {
                        if (t === null) {
                            t = new u(r);
                        }
                        t.length = r;
                    }
                    return t;
                }
                function u(t, r, e) {
                    if (!u.TYPED_ARRAY_SUPPORT && !(this instanceof u)) {
                        return new u(t, r, e);
                    }
                    if (typeof t === "number") {
                        if (typeof r === "string") {
                            throw new Error("If encoding is specified then the first argument must be a string");
                        }
                        return v(this, t);
                    }
                    return h(this, t, r, e);
                }
                u.poolSize = 8192;
                u._augment = function(t) {
                    t.__proto__ = u.prototype;
                    return t;
                };
                function h(t, r, e, n) {
                    if (typeof r === "number") {
                        throw new TypeError('"value" argument must not be a number');
                    }
                    if (typeof ArrayBuffer !== "undefined" && r instanceof ArrayBuffer) {
                        return g(t, r, e, n);
                    }
                    if (typeof r === "string") {
                        return p(t, r, e);
                    }
                    return y(t, r);
                }
                u.from = function(t, r, e) {
                    return h(null, t, r, e);
                };
                if (u.TYPED_ARRAY_SUPPORT) {
                    u.prototype.__proto__ = Uint8Array.prototype;
                    u.__proto__ = Uint8Array;
                    if (typeof Symbol !== "undefined" && Symbol.species && u[Symbol.species] === u) {
                        Object.defineProperty(u, Symbol.species, {
                            value: null,
                            configurable: true
                        });
                    }
                }
                function l(t) {
                    if (typeof t !== "number") {
                        throw new TypeError('"size" argument must be a number');
                    } else if (t < 0) {
                        throw new RangeError('"size" argument must not be negative');
                    }
                }
                function c(t, r, e, n) {
                    l(r);
                    if (r <= 0) {
                        return f(t, r);
                    }
                    if (e !== undefined) {
                        return typeof n === "string" ? f(t, r).fill(e, n) : f(t, r).fill(e);
                    }
                    return f(t, r);
                }
                u.alloc = function(t, r, e) {
                    return c(null, t, r, e);
                };
                function v(t, r) {
                    l(r);
                    t = f(t, r < 0 ? 0 : w(r) | 0);
                    if (!u.TYPED_ARRAY_SUPPORT) {
                        for (var e = 0; e < r; ++e) {
                            t[e] = 0;
                        }
                    }
                    return t;
                }
                u.allocUnsafe = function(t) {
                    return v(null, t);
                };
                u.allocUnsafeSlow = function(t) {
                    return v(null, t);
                };
                function p(t, r, e) {
                    if (typeof e !== "string" || e === "") {
                        e = "utf8";
                    }
                    if (!u.isEncoding(e)) {
                        throw new TypeError('"encoding" must be a valid string encoding');
                    }
                    var n = _(r, e) | 0;
                    t = f(t, n);
                    var i = t.write(r, e);
                    if (i !== n) {
                        t = t.slice(0, i);
                    }
                    return t;
                }
                function d(t, r) {
                    var e = r.length < 0 ? 0 : w(r.length) | 0;
                    t = f(t, e);
                    for (var n = 0; n < e; n += 1) {
                        t[n] = r[n] & 255;
                    }
                    return t;
                }
                function g(t, r, e, n) {
                    r.byteLength;
                    if (e < 0 || r.byteLength < e) {
                        throw new RangeError("'offset' is out of bounds");
                    }
                    if (r.byteLength < e + (n || 0)) {
                        throw new RangeError("'length' is out of bounds");
                    }
                    if (e === undefined && n === undefined) {
                        r = new Uint8Array(r);
                    } else if (n === undefined) {
                        r = new Uint8Array(r, e);
                    } else {
                        r = new Uint8Array(r, e, n);
                    }
                    if (u.TYPED_ARRAY_SUPPORT) {
                        t = r;
                        t.__proto__ = u.prototype;
                    } else {
                        t = d(t, r);
                    }
                    return t;
                }
                function y(t, r) {
                    if (u.isBuffer(r)) {
                        var e = w(r.length) | 0;
                        t = f(t, e);
                        if (t.length === 0) {
                            return t;
                        }
                        r.copy(t, 0, 0, e);
                        return t;
                    }
                    if (r) {
                        if (typeof ArrayBuffer !== "undefined" && r.buffer instanceof ArrayBuffer || "length" in r) {
                            if (typeof r.length !== "number" || rt(r.length)) {
                                return f(t, 0);
                            }
                            return d(t, r);
                        }
                        if (r.type === "Buffer" && a(r.data)) {
                            return d(t, r.data);
                        }
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                }
                function w(t) {
                    if (t >= s()) {
                        throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + s().toString(16) + " bytes");
                    }
                    return t | 0;
                }
                function b(t) {
                    if (+t != t) {
                        t = 0;
                    }
                    return u.alloc(+t);
                }
                u.isBuffer = function t(r) {
                    return !!(r != null && r._isBuffer);
                };
                u.compare = function t(r, e) {
                    if (!u.isBuffer(r) || !u.isBuffer(e)) {
                        throw new TypeError("Arguments must be Buffers");
                    }
                    if (r === e) return 0;
                    var n = r.length;
                    var i = e.length;
                    for (var a = 0, o = Math.min(n, i); a < o; ++a) {
                        if (r[a] !== e[a]) {
                            n = r[a];
                            i = e[a];
                            break;
                        }
                    }
                    if (n < i) return -1;
                    if (i < n) return 1;
                    return 0;
                };
                u.isEncoding = function t(r) {
                    switch (String(r).toLowerCase()) {
                      case "hex":
                      case "utf8":
                      case "utf-8":
                      case "ascii":
                      case "latin1":
                      case "binary":
                      case "base64":
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return true;

                      default:
                        return false;
                    }
                };
                u.concat = function t(r, e) {
                    if (!a(r)) {
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    }
                    if (r.length === 0) {
                        return u.alloc(0);
                    }
                    var n;
                    if (e === undefined) {
                        e = 0;
                        for (n = 0; n < r.length; ++n) {
                            e += r[n].length;
                        }
                    }
                    var i = u.allocUnsafe(e);
                    var o = 0;
                    for (n = 0; n < r.length; ++n) {
                        var s = r[n];
                        if (!u.isBuffer(s)) {
                            throw new TypeError('"list" argument must be an Array of Buffers');
                        }
                        s.copy(i, o);
                        o += s.length;
                    }
                    return i;
                };
                function _(t, r) {
                    if (u.isBuffer(t)) {
                        return t.length;
                    }
                    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) {
                        return t.byteLength;
                    }
                    if (typeof t !== "string") {
                        t = "" + t;
                    }
                    var e = t.length;
                    if (e === 0) return 0;
                    var n = false;
                    for (;;) {
                        switch (r) {
                          case "ascii":
                          case "latin1":
                          case "binary":
                            return e;

                          case "utf8":
                          case "utf-8":
                          case undefined:
                            return Z(t).length;

                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                            return e * 2;

                          case "hex":
                            return e >>> 1;

                          case "base64":
                            return $(t).length;

                          default:
                            if (n) return Z(t).length;
                            r = ("" + r).toLowerCase();
                            n = true;
                        }
                    }
                }
                u.byteLength = _;
                function m(t, r, e) {
                    var n = false;
                    if (r === undefined || r < 0) {
                        r = 0;
                    }
                    if (r > this.length) {
                        return "";
                    }
                    if (e === undefined || e > this.length) {
                        e = this.length;
                    }
                    if (e <= 0) {
                        return "";
                    }
                    e >>>= 0;
                    r >>>= 0;
                    if (e <= r) {
                        return "";
                    }
                    if (!t) t = "utf8";
                    while (true) {
                        switch (t) {
                          case "hex":
                            return O(this, r, e);

                          case "utf8":
                          case "utf-8":
                            return P(this, r, e);

                          case "ascii":
                            return x(this, r, e);

                          case "latin1":
                          case "binary":
                            return D(this, r, e);

                          case "base64":
                            return I(this, r, e);

                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                            return Y(this, r, e);

                          default:
                            if (n) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase();
                            n = true;
                        }
                    }
                }
                u.prototype._isBuffer = true;
                function A(t, r, e) {
                    var n = t[r];
                    t[r] = t[e];
                    t[e] = n;
                }
                u.prototype.swap16 = function t() {
                    var r = this.length;
                    if (r % 2 !== 0) {
                        throw new RangeError("Buffer size must be a multiple of 16-bits");
                    }
                    for (var e = 0; e < r; e += 2) {
                        A(this, e, e + 1);
                    }
                    return this;
                };
                u.prototype.swap32 = function t() {
                    var r = this.length;
                    if (r % 4 !== 0) {
                        throw new RangeError("Buffer size must be a multiple of 32-bits");
                    }
                    for (var e = 0; e < r; e += 4) {
                        A(this, e, e + 3);
                        A(this, e + 1, e + 2);
                    }
                    return this;
                };
                u.prototype.swap64 = function t() {
                    var r = this.length;
                    if (r % 8 !== 0) {
                        throw new RangeError("Buffer size must be a multiple of 64-bits");
                    }
                    for (var e = 0; e < r; e += 8) {
                        A(this, e, e + 7);
                        A(this, e + 1, e + 6);
                        A(this, e + 2, e + 5);
                        A(this, e + 3, e + 4);
                    }
                    return this;
                };
                u.prototype.toString = function t() {
                    var r = this.length | 0;
                    if (r === 0) return "";
                    if (arguments.length === 0) return P(this, 0, r);
                    return m.apply(this, arguments);
                };
                u.prototype.equals = function t(r) {
                    if (!u.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
                    if (this === r) return true;
                    return u.compare(this, r) === 0;
                };
                u.prototype.inspect = function t() {
                    var e = "";
                    var n = r.INSPECT_MAX_BYTES;
                    if (this.length > 0) {
                        e = this.toString("hex", 0, n).match(/.{2}/g).join(" ");
                        if (this.length > n) e += " ... ";
                    }
                    return "<Buffer " + e + ">";
                };
                u.prototype.compare = function t(r, e, n, i, a) {
                    if (!u.isBuffer(r)) {
                        throw new TypeError("Argument must be a Buffer");
                    }
                    if (e === undefined) {
                        e = 0;
                    }
                    if (n === undefined) {
                        n = r ? r.length : 0;
                    }
                    if (i === undefined) {
                        i = 0;
                    }
                    if (a === undefined) {
                        a = this.length;
                    }
                    if (e < 0 || n > r.length || i < 0 || a > this.length) {
                        throw new RangeError("out of range index");
                    }
                    if (i >= a && e >= n) {
                        return 0;
                    }
                    if (i >= a) {
                        return -1;
                    }
                    if (e >= n) {
                        return 1;
                    }
                    e >>>= 0;
                    n >>>= 0;
                    i >>>= 0;
                    a >>>= 0;
                    if (this === r) return 0;
                    var o = a - i;
                    var s = n - e;
                    var f = Math.min(o, s);
                    var h = this.slice(i, a);
                    var l = r.slice(e, n);
                    for (var c = 0; c < f; ++c) {
                        if (h[c] !== l[c]) {
                            o = h[c];
                            s = l[c];
                            break;
                        }
                    }
                    if (o < s) return -1;
                    if (s < o) return 1;
                    return 0;
                };
                function E(t, r, e, n, i) {
                    if (t.length === 0) return -1;
                    if (typeof e === "string") {
                        n = e;
                        e = 0;
                    } else if (e > 2147483647) {
                        e = 2147483647;
                    } else if (e < -2147483648) {
                        e = -2147483648;
                    }
                    e = +e;
                    if (isNaN(e)) {
                        e = i ? 0 : t.length - 1;
                    }
                    if (e < 0) e = t.length + e;
                    if (e >= t.length) {
                        if (i) return -1; else e = t.length - 1;
                    } else if (e < 0) {
                        if (i) e = 0; else return -1;
                    }
                    if (typeof r === "string") {
                        r = u.from(r, n);
                    }
                    if (u.isBuffer(r)) {
                        if (r.length === 0) {
                            return -1;
                        }
                        return B(t, r, e, n, i);
                    } else if (typeof r === "number") {
                        r = r & 255;
                        if (u.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
                            if (i) {
                                return Uint8Array.prototype.indexOf.call(t, r, e);
                            } else {
                                return Uint8Array.prototype.lastIndexOf.call(t, r, e);
                            }
                        }
                        return B(t, [ r ], e, n, i);
                    }
                    throw new TypeError("val must be string, number or Buffer");
                }
                function B(t, r, e, n, i) {
                    var a = 1;
                    var o = t.length;
                    var s = r.length;
                    if (n !== undefined) {
                        n = String(n).toLowerCase();
                        if (n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le") {
                            if (t.length < 2 || r.length < 2) {
                                return -1;
                            }
                            a = 2;
                            o /= 2;
                            s /= 2;
                            e /= 2;
                        }
                    }
                    function f(t, r) {
                        if (a === 1) {
                            return t[r];
                        } else {
                            return t.readUInt16BE(r * a);
                        }
                    }
                    var u;
                    if (i) {
                        var h = -1;
                        for (u = e; u < o; u++) {
                            if (f(t, u) === f(r, h === -1 ? 0 : u - h)) {
                                if (h === -1) h = u;
                                if (u - h + 1 === s) return h * a;
                            } else {
                                if (h !== -1) u -= u - h;
                                h = -1;
                            }
                        }
                    } else {
                        if (e + s > o) e = o - s;
                        for (u = e; u >= 0; u--) {
                            var l = true;
                            for (var c = 0; c < s; c++) {
                                if (f(t, u + c) !== f(r, c)) {
                                    l = false;
                                    break;
                                }
                            }
                            if (l) return u;
                        }
                    }
                    return -1;
                }
                u.prototype.includes = function t(r, e, n) {
                    return this.indexOf(r, e, n) !== -1;
                };
                u.prototype.indexOf = function t(r, e, n) {
                    return E(this, r, e, n, true);
                };
                u.prototype.lastIndexOf = function t(r, e, n) {
                    return E(this, r, e, n, false);
                };
                function k(t, r, e, n) {
                    e = Number(e) || 0;
                    var i = t.length - e;
                    if (!n) {
                        n = i;
                    } else {
                        n = Number(n);
                        if (n > i) {
                            n = i;
                        }
                    }
                    var a = r.length;
                    if (a % 2 !== 0) throw new TypeError("Invalid hex string");
                    if (n > a / 2) {
                        n = a / 2;
                    }
                    for (var o = 0; o < n; ++o) {
                        var s = parseInt(r.substr(o * 2, 2), 16);
                        if (isNaN(s)) return o;
                        t[e + o] = s;
                    }
                    return o;
                }
                function R(t, r, e, n) {
                    return tt(Z(r, t.length - e), t, e, n);
                }
                function U(t, r, e, n) {
                    return tt(K(r), t, e, n);
                }
                function C(t, r, e, n) {
                    return U(t, r, e, n);
                }
                function S(t, r, e, n) {
                    return tt($(r), t, e, n);
                }
                function T(t, r, e, n) {
                    return tt(Q(r, t.length - e), t, e, n);
                }
                u.prototype.write = function t(r, e, n, i) {
                    if (e === undefined) {
                        i = "utf8";
                        n = this.length;
                        e = 0;
                    } else if (n === undefined && typeof e === "string") {
                        i = e;
                        n = this.length;
                        e = 0;
                    } else if (isFinite(e)) {
                        e = e | 0;
                        if (isFinite(n)) {
                            n = n | 0;
                            if (i === undefined) i = "utf8";
                        } else {
                            i = n;
                            n = undefined;
                        }
                    } else {
                        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    }
                    var a = this.length - e;
                    if (n === undefined || n > a) n = a;
                    if (r.length > 0 && (n < 0 || e < 0) || e > this.length) {
                        throw new RangeError("Attempt to write outside buffer bounds");
                    }
                    if (!i) i = "utf8";
                    var o = false;
                    for (;;) {
                        switch (i) {
                          case "hex":
                            return k(this, r, e, n);

                          case "utf8":
                          case "utf-8":
                            return R(this, r, e, n);

                          case "ascii":
                            return U(this, r, e, n);

                          case "latin1":
                          case "binary":
                            return C(this, r, e, n);

                          case "base64":
                            return S(this, r, e, n);

                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                            return T(this, r, e, n);

                          default:
                            if (o) throw new TypeError("Unknown encoding: " + i);
                            i = ("" + i).toLowerCase();
                            o = true;
                        }
                    }
                };
                u.prototype.toJSON = function t() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    };
                };
                function I(t, r, e) {
                    if (r === 0 && e === t.length) {
                        return n.fromByteArray(t);
                    } else {
                        return n.fromByteArray(t.slice(r, e));
                    }
                }
                function P(t, r, e) {
                    e = Math.min(t.length, e);
                    var n = [];
                    var i = r;
                    while (i < e) {
                        var a = t[i];
                        var o = null;
                        var s = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
                        if (i + s <= e) {
                            var f, u, h, l;
                            switch (s) {
                              case 1:
                                if (a < 128) {
                                    o = a;
                                }
                                break;

                              case 2:
                                f = t[i + 1];
                                if ((f & 192) === 128) {
                                    l = (a & 31) << 6 | f & 63;
                                    if (l > 127) {
                                        o = l;
                                    }
                                }
                                break;

                              case 3:
                                f = t[i + 1];
                                u = t[i + 2];
                                if ((f & 192) === 128 && (u & 192) === 128) {
                                    l = (a & 15) << 12 | (f & 63) << 6 | u & 63;
                                    if (l > 2047 && (l < 55296 || l > 57343)) {
                                        o = l;
                                    }
                                }
                                break;

                              case 4:
                                f = t[i + 1];
                                u = t[i + 2];
                                h = t[i + 3];
                                if ((f & 192) === 128 && (u & 192) === 128 && (h & 192) === 128) {
                                    l = (a & 15) << 18 | (f & 63) << 12 | (u & 63) << 6 | h & 63;
                                    if (l > 65535 && l < 1114112) {
                                        o = l;
                                    }
                                }
                            }
                        }
                        if (o === null) {
                            o = 65533;
                            s = 1;
                        } else if (o > 65535) {
                            o -= 65536;
                            n.push(o >>> 10 & 1023 | 55296);
                            o = 56320 | o & 1023;
                        }
                        n.push(o);
                        i += s;
                    }
                    return L(n);
                }
                var M = 4096;
                function L(t) {
                    var r = t.length;
                    if (r <= M) {
                        return String.fromCharCode.apply(String, t);
                    }
                    var e = "";
                    var n = 0;
                    while (n < r) {
                        e += String.fromCharCode.apply(String, t.slice(n, n += M));
                    }
                    return e;
                }
                function x(t, r, e) {
                    var n = "";
                    e = Math.min(t.length, e);
                    for (var i = r; i < e; ++i) {
                        n += String.fromCharCode(t[i] & 127);
                    }
                    return n;
                }
                function D(t, r, e) {
                    var n = "";
                    e = Math.min(t.length, e);
                    for (var i = r; i < e; ++i) {
                        n += String.fromCharCode(t[i]);
                    }
                    return n;
                }
                function O(t, r, e) {
                    var n = t.length;
                    if (!r || r < 0) r = 0;
                    if (!e || e < 0 || e > n) e = n;
                    var i = "";
                    for (var a = r; a < e; ++a) {
                        i += J(t[a]);
                    }
                    return i;
                }
                function Y(t, r, e) {
                    var n = t.slice(r, e);
                    var i = "";
                    for (var a = 0; a < n.length; a += 2) {
                        i += String.fromCharCode(n[a] + n[a + 1] * 256);
                    }
                    return i;
                }
                u.prototype.slice = function t(r, e) {
                    var n = this.length;
                    r = ~~r;
                    e = e === undefined ? n : ~~e;
                    if (r < 0) {
                        r += n;
                        if (r < 0) r = 0;
                    } else if (r > n) {
                        r = n;
                    }
                    if (e < 0) {
                        e += n;
                        if (e < 0) e = 0;
                    } else if (e > n) {
                        e = n;
                    }
                    if (e < r) e = r;
                    var i;
                    if (u.TYPED_ARRAY_SUPPORT) {
                        i = this.subarray(r, e);
                        i.__proto__ = u.prototype;
                    } else {
                        var a = e - r;
                        i = new u(a, undefined);
                        for (var o = 0; o < a; ++o) {
                            i[o] = this[o + r];
                        }
                    }
                    return i;
                };
                function N(t, r, e) {
                    if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + r > e) throw new RangeError("Trying to access beyond buffer length");
                }
                u.prototype.readUIntLE = function t(r, e, n) {
                    r = r | 0;
                    e = e | 0;
                    if (!n) N(r, e, this.length);
                    var i = this[r];
                    var a = 1;
                    var o = 0;
                    while (++o < e && (a *= 256)) {
                        i += this[r + o] * a;
                    }
                    return i;
                };
                u.prototype.readUIntBE = function t(r, e, n) {
                    r = r | 0;
                    e = e | 0;
                    if (!n) {
                        N(r, e, this.length);
                    }
                    var i = this[r + --e];
                    var a = 1;
                    while (e > 0 && (a *= 256)) {
                        i += this[r + --e] * a;
                    }
                    return i;
                };
                u.prototype.readUInt8 = function t(r, e) {
                    if (!e) N(r, 1, this.length);
                    return this[r];
                };
                u.prototype.readUInt16LE = function t(r, e) {
                    if (!e) N(r, 2, this.length);
                    return this[r] | this[r + 1] << 8;
                };
                u.prototype.readUInt16BE = function t(r, e) {
                    if (!e) N(r, 2, this.length);
                    return this[r] << 8 | this[r + 1];
                };
                u.prototype.readUInt32LE = function t(r, e) {
                    if (!e) N(r, 4, this.length);
                    return (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
                };
                u.prototype.readUInt32BE = function t(r, e) {
                    if (!e) N(r, 4, this.length);
                    return this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
                };
                u.prototype.readIntLE = function t(r, e, n) {
                    r = r | 0;
                    e = e | 0;
                    if (!n) N(r, e, this.length);
                    var i = this[r];
                    var a = 1;
                    var o = 0;
                    while (++o < e && (a *= 256)) {
                        i += this[r + o] * a;
                    }
                    a *= 128;
                    if (i >= a) i -= Math.pow(2, 8 * e);
                    return i;
                };
                u.prototype.readIntBE = function t(r, e, n) {
                    r = r | 0;
                    e = e | 0;
                    if (!n) N(r, e, this.length);
                    var i = e;
                    var a = 1;
                    var o = this[r + --i];
                    while (i > 0 && (a *= 256)) {
                        o += this[r + --i] * a;
                    }
                    a *= 128;
                    if (o >= a) o -= Math.pow(2, 8 * e);
                    return o;
                };
                u.prototype.readInt8 = function t(r, e) {
                    if (!e) N(r, 1, this.length);
                    if (!(this[r] & 128)) return this[r];
                    return (255 - this[r] + 1) * -1;
                };
                u.prototype.readInt16LE = function t(r, e) {
                    if (!e) N(r, 2, this.length);
                    var n = this[r] | this[r + 1] << 8;
                    return n & 32768 ? n | 4294901760 : n;
                };
                u.prototype.readInt16BE = function t(r, e) {
                    if (!e) N(r, 2, this.length);
                    var n = this[r + 1] | this[r] << 8;
                    return n & 32768 ? n | 4294901760 : n;
                };
                u.prototype.readInt32LE = function t(r, e) {
                    if (!e) N(r, 4, this.length);
                    return this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
                };
                u.prototype.readInt32BE = function t(r, e) {
                    if (!e) N(r, 4, this.length);
                    return this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
                };
                u.prototype.readFloatLE = function t(r, e) {
                    if (!e) N(r, 4, this.length);
                    return i.read(this, r, true, 23, 4);
                };
                u.prototype.readFloatBE = function t(r, e) {
                    if (!e) N(r, 4, this.length);
                    return i.read(this, r, false, 23, 4);
                };
                u.prototype.readDoubleLE = function t(r, e) {
                    if (!e) N(r, 8, this.length);
                    return i.read(this, r, true, 52, 8);
                };
                u.prototype.readDoubleBE = function t(r, e) {
                    if (!e) N(r, 8, this.length);
                    return i.read(this, r, false, 52, 8);
                };
                function F(t, r, e, n, i, a) {
                    if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (r > i || r < a) throw new RangeError('"value" argument is out of bounds');
                    if (e + n > t.length) throw new RangeError("Index out of range");
                }
                u.prototype.writeUIntLE = function t(r, e, n, i) {
                    r = +r;
                    e = e | 0;
                    n = n | 0;
                    if (!i) {
                        var a = Math.pow(2, 8 * n) - 1;
                        F(this, r, e, n, a, 0);
                    }
                    var o = 1;
                    var s = 0;
                    this[e] = r & 255;
                    while (++s < n && (o *= 256)) {
                        this[e + s] = r / o & 255;
                    }
                    return e + n;
                };
                u.prototype.writeUIntBE = function t(r, e, n, i) {
                    r = +r;
                    e = e | 0;
                    n = n | 0;
                    if (!i) {
                        var a = Math.pow(2, 8 * n) - 1;
                        F(this, r, e, n, a, 0);
                    }
                    var o = n - 1;
                    var s = 1;
                    this[e + o] = r & 255;
                    while (--o >= 0 && (s *= 256)) {
                        this[e + o] = r / s & 255;
                    }
                    return e + n;
                };
                u.prototype.writeUInt8 = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 1, 255, 0);
                    if (!u.TYPED_ARRAY_SUPPORT) r = Math.floor(r);
                    this[e] = r & 255;
                    return e + 1;
                };
                function j(t, r, e, n) {
                    if (r < 0) r = 65535 + r + 1;
                    for (var i = 0, a = Math.min(t.length - e, 2); i < a; ++i) {
                        t[e + i] = (r & 255 << 8 * (n ? i : 1 - i)) >>> (n ? i : 1 - i) * 8;
                    }
                }
                u.prototype.writeUInt16LE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 2, 65535, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e] = r & 255;
                        this[e + 1] = r >>> 8;
                    } else {
                        j(this, r, e, true);
                    }
                    return e + 2;
                };
                u.prototype.writeUInt16BE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 2, 65535, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e] = r >>> 8;
                        this[e + 1] = r & 255;
                    } else {
                        j(this, r, e, false);
                    }
                    return e + 2;
                };
                function V(t, r, e, n) {
                    if (r < 0) r = 4294967295 + r + 1;
                    for (var i = 0, a = Math.min(t.length - e, 4); i < a; ++i) {
                        t[e + i] = r >>> (n ? i : 3 - i) * 8 & 255;
                    }
                }
                u.prototype.writeUInt32LE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 4, 4294967295, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e + 3] = r >>> 24;
                        this[e + 2] = r >>> 16;
                        this[e + 1] = r >>> 8;
                        this[e] = r & 255;
                    } else {
                        V(this, r, e, true);
                    }
                    return e + 4;
                };
                u.prototype.writeUInt32BE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 4, 4294967295, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e] = r >>> 24;
                        this[e + 1] = r >>> 16;
                        this[e + 2] = r >>> 8;
                        this[e + 3] = r & 255;
                    } else {
                        V(this, r, e, false);
                    }
                    return e + 4;
                };
                u.prototype.writeIntLE = function t(r, e, n, i) {
                    r = +r;
                    e = e | 0;
                    if (!i) {
                        var a = Math.pow(2, 8 * n - 1);
                        F(this, r, e, n, a - 1, -a);
                    }
                    var o = 0;
                    var s = 1;
                    var f = 0;
                    this[e] = r & 255;
                    while (++o < n && (s *= 256)) {
                        if (r < 0 && f === 0 && this[e + o - 1] !== 0) {
                            f = 1;
                        }
                        this[e + o] = (r / s >> 0) - f & 255;
                    }
                    return e + n;
                };
                u.prototype.writeIntBE = function t(r, e, n, i) {
                    r = +r;
                    e = e | 0;
                    if (!i) {
                        var a = Math.pow(2, 8 * n - 1);
                        F(this, r, e, n, a - 1, -a);
                    }
                    var o = n - 1;
                    var s = 1;
                    var f = 0;
                    this[e + o] = r & 255;
                    while (--o >= 0 && (s *= 256)) {
                        if (r < 0 && f === 0 && this[e + o + 1] !== 0) {
                            f = 1;
                        }
                        this[e + o] = (r / s >> 0) - f & 255;
                    }
                    return e + n;
                };
                u.prototype.writeInt8 = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 1, 127, -128);
                    if (!u.TYPED_ARRAY_SUPPORT) r = Math.floor(r);
                    if (r < 0) r = 255 + r + 1;
                    this[e] = r & 255;
                    return e + 1;
                };
                u.prototype.writeInt16LE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 2, 32767, -32768);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e] = r & 255;
                        this[e + 1] = r >>> 8;
                    } else {
                        j(this, r, e, true);
                    }
                    return e + 2;
                };
                u.prototype.writeInt16BE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 2, 32767, -32768);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e] = r >>> 8;
                        this[e + 1] = r & 255;
                    } else {
                        j(this, r, e, false);
                    }
                    return e + 2;
                };
                u.prototype.writeInt32LE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 4, 2147483647, -2147483648);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e] = r & 255;
                        this[e + 1] = r >>> 8;
                        this[e + 2] = r >>> 16;
                        this[e + 3] = r >>> 24;
                    } else {
                        V(this, r, e, true);
                    }
                    return e + 4;
                };
                u.prototype.writeInt32BE = function t(r, e, n) {
                    r = +r;
                    e = e | 0;
                    if (!n) F(this, r, e, 4, 2147483647, -2147483648);
                    if (r < 0) r = 4294967295 + r + 1;
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[e] = r >>> 24;
                        this[e + 1] = r >>> 16;
                        this[e + 2] = r >>> 8;
                        this[e + 3] = r & 255;
                    } else {
                        V(this, r, e, false);
                    }
                    return e + 4;
                };
                function z(t, r, e, n, i, a) {
                    if (e + n > t.length) throw new RangeError("Index out of range");
                    if (e < 0) throw new RangeError("Index out of range");
                }
                function W(t, r, e, n, a) {
                    if (!a) {
                        z(t, r, e, 4, 3.4028234663852886e38, -3.4028234663852886e38);
                    }
                    i.write(t, r, e, n, 23, 4);
                    return e + 4;
                }
                u.prototype.writeFloatLE = function t(r, e, n) {
                    return W(this, r, e, true, n);
                };
                u.prototype.writeFloatBE = function t(r, e, n) {
                    return W(this, r, e, false, n);
                };
                function G(t, r, e, n, a) {
                    if (!a) {
                        z(t, r, e, 8, 1.7976931348623157e308, -1.7976931348623157e308);
                    }
                    i.write(t, r, e, n, 52, 8);
                    return e + 8;
                }
                u.prototype.writeDoubleLE = function t(r, e, n) {
                    return G(this, r, e, true, n);
                };
                u.prototype.writeDoubleBE = function t(r, e, n) {
                    return G(this, r, e, false, n);
                };
                u.prototype.copy = function t(r, e, n, i) {
                    if (!n) n = 0;
                    if (!i && i !== 0) i = this.length;
                    if (e >= r.length) e = r.length;
                    if (!e) e = 0;
                    if (i > 0 && i < n) i = n;
                    if (i === n) return 0;
                    if (r.length === 0 || this.length === 0) return 0;
                    if (e < 0) {
                        throw new RangeError("targetStart out of bounds");
                    }
                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (i < 0) throw new RangeError("sourceEnd out of bounds");
                    if (i > this.length) i = this.length;
                    if (r.length - e < i - n) {
                        i = r.length - e + n;
                    }
                    var a = i - n;
                    var o;
                    if (this === r && n < e && e < i) {
                        for (o = a - 1; o >= 0; --o) {
                            r[o + e] = this[o + n];
                        }
                    } else if (a < 1e3 || !u.TYPED_ARRAY_SUPPORT) {
                        for (o = 0; o < a; ++o) {
                            r[o + e] = this[o + n];
                        }
                    } else {
                        Uint8Array.prototype.set.call(r, this.subarray(n, n + a), e);
                    }
                    return a;
                };
                u.prototype.fill = function t(r, e, n, i) {
                    if (typeof r === "string") {
                        if (typeof e === "string") {
                            i = e;
                            e = 0;
                            n = this.length;
                        } else if (typeof n === "string") {
                            i = n;
                            n = this.length;
                        }
                        if (r.length === 1) {
                            var a = r.charCodeAt(0);
                            if (a < 256) {
                                r = a;
                            }
                        }
                        if (i !== undefined && typeof i !== "string") {
                            throw new TypeError("encoding must be a string");
                        }
                        if (typeof i === "string" && !u.isEncoding(i)) {
                            throw new TypeError("Unknown encoding: " + i);
                        }
                    } else if (typeof r === "number") {
                        r = r & 255;
                    }
                    if (e < 0 || this.length < e || this.length < n) {
                        throw new RangeError("Out of range index");
                    }
                    if (n <= e) {
                        return this;
                    }
                    e = e >>> 0;
                    n = n === undefined ? this.length : n >>> 0;
                    if (!r) r = 0;
                    var o;
                    if (typeof r === "number") {
                        for (o = e; o < n; ++o) {
                            this[o] = r;
                        }
                    } else {
                        var s = u.isBuffer(r) ? r : Z(new u(r, i).toString());
                        var f = s.length;
                        for (o = 0; o < n - e; ++o) {
                            this[o + e] = s[o % f];
                        }
                    }
                    return this;
                };
                var H = /[^+\/0-9A-Za-z-_]/g;
                function X(t) {
                    t = q(t).replace(H, "");
                    if (t.length < 2) return "";
                    while (t.length % 4 !== 0) {
                        t = t + "=";
                    }
                    return t;
                }
                function q(t) {
                    if (t.trim) return t.trim();
                    return t.replace(/^\s+|\s+$/g, "");
                }
                function J(t) {
                    if (t < 16) return "0" + t.toString(16);
                    return t.toString(16);
                }
                function Z(t, r) {
                    r = r || Infinity;
                    var e;
                    var n = t.length;
                    var i = null;
                    var a = [];
                    for (var o = 0; o < n; ++o) {
                        e = t.charCodeAt(o);
                        if (e > 55295 && e < 57344) {
                            if (!i) {
                                if (e > 56319) {
                                    if ((r -= 3) > -1) a.push(239, 191, 189);
                                    continue;
                                } else if (o + 1 === n) {
                                    if ((r -= 3) > -1) a.push(239, 191, 189);
                                    continue;
                                }
                                i = e;
                                continue;
                            }
                            if (e < 56320) {
                                if ((r -= 3) > -1) a.push(239, 191, 189);
                                i = e;
                                continue;
                            }
                            e = (i - 55296 << 10 | e - 56320) + 65536;
                        } else if (i) {
                            if ((r -= 3) > -1) a.push(239, 191, 189);
                        }
                        i = null;
                        if (e < 128) {
                            if ((r -= 1) < 0) break;
                            a.push(e);
                        } else if (e < 2048) {
                            if ((r -= 2) < 0) break;
                            a.push(e >> 6 | 192, e & 63 | 128);
                        } else if (e < 65536) {
                            if ((r -= 3) < 0) break;
                            a.push(e >> 12 | 224, e >> 6 & 63 | 128, e & 63 | 128);
                        } else if (e < 1114112) {
                            if ((r -= 4) < 0) break;
                            a.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, e & 63 | 128);
                        } else {
                            throw new Error("Invalid code point");
                        }
                    }
                    return a;
                }
                function K(t) {
                    var r = [];
                    for (var e = 0; e < t.length; ++e) {
                        r.push(t.charCodeAt(e) & 255);
                    }
                    return r;
                }
                function Q(t, r) {
                    var e, n, i;
                    var a = [];
                    for (var o = 0; o < t.length; ++o) {
                        if ((r -= 2) < 0) break;
                        e = t.charCodeAt(o);
                        n = e >> 8;
                        i = e % 256;
                        a.push(i);
                        a.push(n);
                    }
                    return a;
                }
                function $(t) {
                    return n.toByteArray(X(t));
                }
                function tt(t, r, e, n) {
                    for (var i = 0; i < n; ++i) {
                        if (i + e >= r.length || i >= t.length) break;
                        r[i + e] = t[i];
                    }
                    return i;
                }
                function rt(t) {
                    return t !== t;
                }
            }).call(r, function() {
                return this;
            }());
        },
        106: function(t, r) {
            var e = {}.toString;
            t.exports = Array.isArray || function(t) {
                return e.call(t) == "[object Array]";
            };
        },
        107: function(t, r) {
            r.read = function(t, r, e, n, i) {
                var a, o;
                var s = i * 8 - n - 1;
                var f = (1 << s) - 1;
                var u = f >> 1;
                var h = -7;
                var l = e ? i - 1 : 0;
                var c = e ? -1 : 1;
                var v = t[r + l];
                l += c;
                a = v & (1 << -h) - 1;
                v >>= -h;
                h += s;
                for (;h > 0; a = a * 256 + t[r + l], l += c, h -= 8) {}
                o = a & (1 << -h) - 1;
                a >>= -h;
                h += n;
                for (;h > 0; o = o * 256 + t[r + l], l += c, h -= 8) {}
                if (a === 0) {
                    a = 1 - u;
                } else if (a === f) {
                    return o ? NaN : (v ? -1 : 1) * Infinity;
                } else {
                    o = o + Math.pow(2, n);
                    a = a - u;
                }
                return (v ? -1 : 1) * o * Math.pow(2, a - n);
            };
            r.write = function(t, r, e, n, i, a) {
                var o, s, f;
                var u = a * 8 - i - 1;
                var h = (1 << u) - 1;
                var l = h >> 1;
                var c = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                var v = n ? 0 : a - 1;
                var p = n ? 1 : -1;
                var d = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
                r = Math.abs(r);
                if (isNaN(r) || r === Infinity) {
                    s = isNaN(r) ? 1 : 0;
                    o = h;
                } else {
                    o = Math.floor(Math.log(r) / Math.LN2);
                    if (r * (f = Math.pow(2, -o)) < 1) {
                        o--;
                        f *= 2;
                    }
                    if (o + l >= 1) {
                        r += c / f;
                    } else {
                        r += c * Math.pow(2, 1 - l);
                    }
                    if (r * f >= 2) {
                        o++;
                        f /= 2;
                    }
                    if (o + l >= h) {
                        s = 0;
                        o = h;
                    } else if (o + l >= 1) {
                        s = (r * f - 1) * Math.pow(2, i);
                        o = o + l;
                    } else {
                        s = r * Math.pow(2, l - 1) * Math.pow(2, i);
                        o = 0;
                    }
                }
                for (;i >= 8; t[e + v] = s & 255, v += p, s /= 256, i -= 8) {}
                o = o << i | s;
                u += i;
                for (;u > 0; t[e + v] = o & 255, v += p, o /= 256, u -= 8) {}
                t[e + v - p] |= d * 128;
            };
        }
    });
});

