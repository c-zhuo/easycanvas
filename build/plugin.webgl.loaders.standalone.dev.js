(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var a = r();
        for (var n in a) (typeof exports === "object" ? exports : t)[n] = a[n];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function r(a) {
            if (t[a]) return t[a].exports;
            var n = t[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            e[a].call(n.exports, n, n.exports, r);
            n.loaded = true;
            return n.exports;
        }
        r.m = e;
        r.c = t;
        r.p = "";
        return r(0);
    }({
        0: function(e, t, r) {
            e.exports = r(91);
        },
        9: function(e, t, r) {
            "use strict";
            var a = r(25);
            var n = r(67);
            var i = r(66);
            var o = r(63);
            e.exports = {
                FileLoader: a.FileLoader,
                LoaderUtils: n.LoaderUtils,
                Interpolant: i.Interpolant,
                CompressedTextureLoader: o.CompressedTextureLoader,
                RGB_S3TC_DXT1_Format: 33776,
                RGBA_S3TC_DXT1_Format: 33777,
                RGBA_S3TC_DXT3_Format: 33778,
                RGBA_S3TC_DXT5_Format: 33779
            };
        },
        25: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.FileLoader = undefined;
            var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var a in r) {
                        if (Object.prototype.hasOwnProperty.call(r, a)) {
                            e[a] = r[a];
                        }
                    }
                }
                return e;
            };
            var n = r(62);
            var i = r(26);
            var o = {};
            function s(e) {
                this.manager = e !== undefined ? e : i.DefaultLoadingManager;
            }
            a(s.prototype, {
                load: function e(t, r, a, i) {
                    if (t === undefined) t = "";
                    if (this.path !== undefined) t = this.path + t;
                    t = this.manager.resolveURL(t);
                    var s = this;
                    var f = n.Cache.get(t);
                    if (f !== undefined) {
                        s.manager.itemStart(t);
                        setTimeout(function() {
                            if (r) r(f);
                            s.manager.itemEnd(t);
                        }, 0);
                        return f;
                    }
                    if (o[t] !== undefined) {
                        o[t].push({
                            onLoad: r,
                            onProgress: a,
                            onError: i
                        });
                        return;
                    }
                    var u = /^data:(.*?)(;base64)?,(.*)$/;
                    var d = t.match(u);
                    if (d) {
                        var l = d[1];
                        var h = !!d[2];
                        var v = d[3];
                        v = window.decodeURIComponent(v);
                        if (h) v = window.atob(v);
                        try {
                            var c;
                            var p = (this.responseType || "").toLowerCase();
                            switch (p) {
                              case "arraybuffer":
                              case "blob":
                                var A = new Uint8Array(v.length);
                                for (var g = 0; g < v.length; g++) {
                                    A[g] = v.charCodeAt(g);
                                }
                                if (p === "blob") {
                                    c = new Blob([ A.buffer ], {
                                        type: l
                                    });
                                } else {
                                    c = A.buffer;
                                }
                                break;

                              case "document":
                                var m = new DOMParser();
                                c = m.parseFromString(v, l);
                                break;

                              case "json":
                                c = JSON.parse(v);
                                break;

                              default:
                                c = v;
                                break;
                            }
                            window.setTimeout(function() {
                                if (r) r(c);
                                s.manager.itemEnd(t);
                            }, 0);
                        } catch (e) {
                            window.setTimeout(function() {
                                if (i) i(e);
                                s.manager.itemEnd(t);
                                s.manager.itemError(t);
                            }, 0);
                        }
                    } else {
                        o[t] = [];
                        o[t].push({
                            onLoad: r,
                            onProgress: a,
                            onError: i
                        });
                        var y = new XMLHttpRequest();
                        y.open("GET", t, true);
                        y.addEventListener("load", function(e) {
                            var r = this.response;
                            n.Cache.add(t, r);
                            var a = o[t];
                            delete o[t];
                            if (this.status === 200 || this.status === 0) {
                                if (this.status === 0) console.warn("THREE.FileLoader: HTTP Status 0 received.");
                                for (var i = 0, f = a.length; i < f; i++) {
                                    var u = a[i];
                                    if (u.onLoad) u.onLoad(r);
                                }
                                s.manager.itemEnd(t);
                            } else {
                                for (var i = 0, f = a.length; i < f; i++) {
                                    var u = a[i];
                                    if (u.onError) u.onError(e);
                                }
                                s.manager.itemEnd(t);
                                s.manager.itemError(t);
                            }
                        }, false);
                        y.addEventListener("progress", function(e) {
                            var r = o[t];
                            for (var a = 0, n = r.length; a < n; a++) {
                                var i = r[a];
                                if (i.onProgress) i.onProgress(e);
                            }
                        }, false);
                        y.addEventListener("error", function(e) {
                            var r = o[t];
                            delete o[t];
                            for (var a = 0, n = r.length; a < n; a++) {
                                var i = r[a];
                                if (i.onError) i.onError(e);
                            }
                            s.manager.itemEnd(t);
                            s.manager.itemError(t);
                        }, false);
                        if (this.responseType !== undefined) y.responseType = this.responseType;
                        if (this.withCredentials !== undefined) y.withCredentials = this.withCredentials;
                        if (y.overrideMimeType) y.overrideMimeType(this.mimeType !== undefined ? this.mimeType : "text/plain");
                        for (var b in this.requestHeader) {
                            y.setRequestHeader(b, this.requestHeader[b]);
                        }
                        y.send(null);
                    }
                    s.manager.itemStart(t);
                    return y;
                },
                setPath: function e(t) {
                    this.path = t;
                    return this;
                },
                setResponseType: function e(t) {
                    this.responseType = t;
                    return this;
                },
                setWithCredentials: function e(t) {
                    this.withCredentials = t;
                    return this;
                },
                setMimeType: function e(t) {
                    this.mimeType = t;
                    return this;
                },
                setRequestHeader: function e(t) {
                    this.requestHeader = t;
                    return this;
                }
            });
            t.FileLoader = s;
        },
        26: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            function r(e, t, r) {
                var a = this;
                var n = false;
                var i = 0;
                var o = 0;
                var s = undefined;
                this.onStart = undefined;
                this.onLoad = e;
                this.onProgress = t;
                this.onError = r;
                this.itemStart = function(e) {
                    o++;
                    if (n === false) {
                        if (a.onStart !== undefined) {
                            a.onStart(e, i, o);
                        }
                    }
                    n = true;
                };
                this.itemEnd = function(e) {
                    i++;
                    if (a.onProgress !== undefined) {
                        a.onProgress(e, i, o);
                    }
                    if (i === o) {
                        n = false;
                        if (a.onLoad !== undefined) {
                            a.onLoad();
                        }
                    }
                };
                this.itemError = function(e) {
                    if (a.onError !== undefined) {
                        a.onError(e);
                    }
                };
                this.resolveURL = function(e) {
                    if (s) {
                        return s(e);
                    }
                    return e;
                };
                this.setURLModifier = function(e) {
                    s = e;
                    return this;
                };
            }
            var a = new r();
            t.DefaultLoadingManager = a;
            t.LoadingManager = r;
        },
        62: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = {
                enabled: false,
                files: {},
                add: function e(t, r) {
                    if (this.enabled === false) return;
                    this.files[t] = r;
                },
                get: function e(t) {
                    if (this.enabled === false) return;
                    return this.files[t];
                },
                remove: function e(t) {
                    delete this.files[t];
                },
                clear: function e() {
                    this.files = {};
                }
            };
            t.Cache = r;
        },
        63: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.CompressedTextureLoader = undefined;
            var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var a in r) {
                        if (Object.prototype.hasOwnProperty.call(r, a)) {
                            e[a] = r[a];
                        }
                    }
                }
                return e;
            };
            var n = r(25);
            var i = r(26);
            var o = 1006;
            function s(e) {
                this.manager = e !== undefined ? e : i.DefaultLoadingManager;
                this._parser = null;
            }
            a(s.prototype, {
                load: function e(t, r, a, i) {
                    var s = this;
                    var f = [];
                    var u = {};
                    u.image = f;
                    var d = new n.FileLoader(this.manager);
                    d.setPath(this.path);
                    d.setResponseType("arraybuffer");
                    function l(e) {
                        d.load(t[e], function(t) {
                            var a = s._parser(t, true);
                            f[e] = {
                                width: a.width,
                                height: a.height,
                                format: a.format,
                                mipmaps: a.mipmaps
                            };
                            h += 1;
                            if (h === 6) {
                                if (a.mipmapCount === 1) u.minFilter = o;
                                u.format = a.format;
                                u.needsUpdate = true;
                                if (r) r(u);
                            }
                        }, a, i);
                    }
                    if (Array.isArray(t)) {
                        var h = 0;
                        for (var v = 0, c = t.length; v < c; ++v) {
                            l(v);
                        }
                    } else {
                        d.load(t, function(e) {
                            var t = s._parser(e, true);
                            if (t.isCubemap) {
                                var a = t.mipmaps.length / t.mipmapCount;
                                for (var n = 0; n < a; n++) {
                                    f[n] = {
                                        mipmaps: []
                                    };
                                    for (var i = 0; i < t.mipmapCount; i++) {
                                        f[n].mipmaps.push(t.mipmaps[n * t.mipmapCount + i]);
                                        f[n].format = t.format;
                                        f[n].width = t.width;
                                        f[n].height = t.height;
                                    }
                                }
                            } else {
                                u.image.width = t.width;
                                u.image.height = t.height;
                                u.mipmaps = t.mipmaps;
                            }
                            if (t.mipmapCount === 1) {
                                u.minFilter = o;
                            }
                            u.format = t.format;
                            u.needsUpdate = true;
                            if (r) r(u);
                        }, a, i);
                    }
                    return u;
                },
                setPath: function e(t) {
                    this.path = t;
                    return this;
                }
            });
            t.CompressedTextureLoader = s;
        },
        64: function(e, t, r) {
            "use strict";
            var a = r(9);
            var n = i(a);
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = n.default.DDSLoader = function() {
                this._parser = n.default.DDSLoader.parse;
            };
            n.default.DDSLoader.prototype = Object.create(n.default.CompressedTextureLoader.prototype);
            n.default.DDSLoader.prototype.constructor = n.default.DDSLoader;
            n.default.DDSLoader.parse = function(e, t) {
                var r = {
                    mipmaps: [],
                    width: 0,
                    height: 0,
                    format: null,
                    mipmapCount: 1
                };
                var a = 542327876;
                var i = 1, o = 2, s = 4, f = 8, u = 4096, d = 131072, l = 524288, h = 8388608;
                var v = 8, c = 4194304, p = 4096;
                var A = 512, g = 1024, m = 2048, y = 4096, b = 8192, C = 16384, x = 32768, E = 2097152;
                var w = 1, T = 2, B = 4, L = 64, I = 512, R = 131072;
                function U(e) {
                    return e.charCodeAt(0) + (e.charCodeAt(1) << 8) + (e.charCodeAt(2) << 16) + (e.charCodeAt(3) << 24);
                }
                function _(e) {
                    return String.fromCharCode(e & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255);
                }
                function M(e, t, r, a) {
                    var n = r * a * 4;
                    var i = new Uint8Array(e, t, n);
                    var o = new Uint8Array(n);
                    var s = 0;
                    var f = 0;
                    for (var u = 0; u < a; u++) {
                        for (var d = 0; d < r; d++) {
                            var l = i[f];
                            f++;
                            var h = i[f];
                            f++;
                            var v = i[f];
                            f++;
                            var c = i[f];
                            f++;
                            o[s] = v;
                            s++;
                            o[s] = h;
                            s++;
                            o[s] = l;
                            s++;
                            o[s] = c;
                            s++;
                        }
                    }
                    return o;
                }
                var D = U("DXT1");
                var k = U("DXT3");
                var S = U("DXT5");
                var F = U("ETC1");
                var O = 31;
                var P = 0;
                var Q = 1;
                var V = 2;
                var N = 3;
                var X = 4;
                var j = 7;
                var z = 20;
                var G = 21;
                var H = 22;
                var Y = 23;
                var K = 24;
                var W = 25;
                var J = 26;
                var q = 27;
                var Z = 28;
                var $ = 29;
                var ee = 30;
                var te = new Int32Array(e, 0, O);
                if (te[P] !== a) {
                    console.error("THREE.DDSLoader.parse: Invalid magic number in DDS header.");
                    return r;
                }
                if (!te[z] & B) {
                    console.error("THREE.DDSLoader.parse: Unsupported format, must contain a FourCC code.");
                    return r;
                }
                var re;
                var ae = te[G];
                var ne = false;
                switch (ae) {
                  case D:
                    re = 8;
                    r.format = n.default.RGB_S3TC_DXT1_Format;
                    break;

                  case k:
                    re = 16;
                    r.format = n.default.RGBA_S3TC_DXT3_Format;
                    break;

                  case S:
                    re = 16;
                    r.format = n.default.RGBA_S3TC_DXT5_Format;
                    break;

                  case F:
                    re = 8;
                    r.format = n.default.RGB_ETC1_Format;
                    break;

                  default:
                    if (te[H] === 32 && te[Y] & 16711680 && te[K] & 65280 && te[W] & 255 && te[J] & 4278190080) {
                        ne = true;
                        re = 64;
                        r.format = n.default.RGBAFormat;
                    } else {
                        console.error("THREE.DDSLoader.parse: Unsupported FourCC code ", _(ae));
                        return r;
                    }
                }
                r.mipmapCount = 1;
                if (te[V] & d && t !== false) {
                    r.mipmapCount = Math.max(1, te[j]);
                }
                var ie = te[Z];
                r.isCubemap = ie & A ? true : false;
                if (r.isCubemap && (!(ie & g) || !(ie & m) || !(ie & y) || !(ie & b) || !(ie & C) || !(ie & x))) {
                    console.error("THREE.DDSLoader.parse: Incomplete cubemap faces");
                    return r;
                }
                r.width = te[X];
                r.height = te[N];
                var oe = te[Q] + 4;
                var se = r.isCubemap ? 6 : 1;
                for (var fe = 0; fe < se; fe++) {
                    var ue = r.width;
                    var de = r.height;
                    for (var le = 0; le < r.mipmapCount; le++) {
                        if (ne) {
                            var he = M(e, oe, ue, de);
                            var ve = he.length;
                        } else {
                            var ve = Math.max(4, ue) / 4 * Math.max(4, de) / 4 * re;
                            var he = new Uint8Array(e, oe, ve);
                        }
                        var ce = {
                            data: he,
                            width: ue,
                            height: de
                        };
                        r.mipmaps.push(ce);
                        oe += ve;
                        ue = Math.max(ue >> 1, 1);
                        de = Math.max(de >> 1, 1);
                    }
                }
                return r;
            };
        },
        65: function(e, t, r) {
            "use strict";
            var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var a in r) {
                        if (Object.prototype.hasOwnProperty.call(r, a)) {
                            e[a] = r[a];
                        }
                    }
                }
                return e;
            };
            var n = r(9);
            var i = o(n);
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = function() {
                i.default.FBXLoader = function(e) {
                    this.manager = e !== undefined ? e : i.default.DefaultLoadingManager;
                };
                a(i.default.FBXLoader.prototype, {
                    load: function e(t, r, a, n) {
                        var o = this;
                        var s = i.default.LoaderUtils.extractUrlBase(t);
                        var f = new i.default.FileLoader(this.manager);
                        f.setResponseType("arraybuffer");
                        f.load(t, function(e) {
                            var t = o.parse(e, s);
                            r(t);
                        }, a, n);
                    },
                    parse: function t(r, a) {
                        var i;
                        if (n(r)) {
                            i = new e().parse(r);
                        } else {
                            var f = d(r);
                            if (!o(f)) {
                                throw new Error("THREE.FBXLoader: Unknown format.");
                            }
                            if (s(f) < 7e3) {
                                throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + s(f));
                            }
                            i = new TextParser().parse(f);
                        }
                        return i;
                    }
                });
                function e() {}
                a(e.prototype, {
                    parse: function e(a) {
                        var n = new t(a);
                        n.skip(23);
                        var i = n.getUint32();
                        console.log("THREE.FBXLoader: FBX binary version: " + i);
                        var o = new r();
                        while (!this.endOfContent(n)) {
                            var s = this.parseNode(n, i);
                            if (s !== null) o.add(s.name, s);
                        }
                        return o;
                    },
                    endOfContent: function e(t) {
                        if (t.size() % 16 === 0) {
                            return (t.getOffset() + 160 + 16 & ~15) >= t.size();
                        } else {
                            return t.getOffset() + 160 + 16 >= t.size();
                        }
                    },
                    parseNode: function e(t, r) {
                        var a = {};
                        var n = r >= 7500 ? t.getUint64() : t.getUint32();
                        var i = r >= 7500 ? t.getUint64() : t.getUint32();
                        var o = r >= 7500 ? t.getUint64() : t.getUint32();
                        var s = t.getUint8();
                        var f = t.getString(s);
                        if (n === 0) return null;
                        var u = [];
                        for (var d = 0; d < i; d++) {
                            u.push(this.parseProperty(t));
                        }
                        var l = u.length > 0 ? u[0] : "";
                        var h = u.length > 1 ? u[1] : "";
                        var v = u.length > 2 ? u[2] : "";
                        a.singleProperty = i === 1 && t.getOffset() === n ? true : false;
                        while (n > t.getOffset()) {
                            var c = this.parseNode(t, r);
                            if (c !== null) this.parseSubNode(f, a, c);
                        }
                        a.propertyList = u;
                        if (typeof l === "number") a.id = l;
                        if (h !== "") a.attrName = h;
                        if (v !== "") a.attrType = v;
                        if (f !== "") a.name = f;
                        return a;
                    },
                    parseSubNode: function e(t, r, a) {
                        if (a.singleProperty === true) {
                            var n = a.propertyList[0];
                            if (Array.isArray(n)) {
                                r[a.name] = a;
                                a.a = n;
                            } else {
                                r[a.name] = n;
                            }
                        } else if (t === "Connections" && a.name === "C") {
                            var i = [];
                            a.propertyList.forEach(function(e, t) {
                                if (t !== 0) i.push(e);
                            });
                            if (r.connections === undefined) {
                                r.connections = [];
                            }
                            r.connections.push(i);
                        } else if (a.name === "Properties70") {
                            var o = Object.keys(a);
                            o.forEach(function(e) {
                                r[e] = a[e];
                            });
                        } else if (t === "Properties70" && a.name === "P") {
                            var s = a.propertyList[0];
                            var f = a.propertyList[1];
                            var u = a.propertyList[2];
                            var d = a.propertyList[3];
                            var l;
                            if (s.indexOf("Lcl ") === 0) s = s.replace("Lcl ", "Lcl_");
                            if (f.indexOf("Lcl ") === 0) f = f.replace("Lcl ", "Lcl_");
                            if (f === "Color" || f === "ColorRGB" || f === "Vector" || f === "Vector3D" || f.indexOf("Lcl_") === 0) {
                                l = [ a.propertyList[4], a.propertyList[5], a.propertyList[6] ];
                            } else {
                                l = a.propertyList[4];
                            }
                            r[s] = {
                                type: f,
                                type2: u,
                                flag: d,
                                value: l
                            };
                        } else if (r[a.name] === undefined) {
                            if (typeof a.id === "number") {
                                r[a.name] = {};
                                r[a.name][a.id] = a;
                            } else {
                                r[a.name] = a;
                            }
                        } else {
                            if (a.name === "PoseNode") {
                                if (!Array.isArray(r[a.name])) {
                                    r[a.name] = [ r[a.name] ];
                                }
                                r[a.name].push(a);
                            } else if (r[a.name][a.id] === undefined) {
                                r[a.name][a.id] = a;
                            }
                        }
                    },
                    parseProperty: function e(r) {
                        var a = r.getString(1);
                        switch (a) {
                          case "C":
                            return r.getBoolean();

                          case "D":
                            return r.getFloat64();

                          case "F":
                            return r.getFloat32();

                          case "I":
                            return r.getInt32();

                          case "L":
                            return r.getInt64();

                          case "R":
                            var n = r.getUint32();
                            return r.getArrayBuffer(n);

                          case "S":
                            var n = r.getUint32();
                            return r.getString(n);

                          case "Y":
                            return r.getInt16();

                          case "b":
                          case "c":
                          case "d":
                          case "f":
                          case "i":
                          case "l":
                            var i = r.getUint32();
                            var o = r.getUint32();
                            var s = r.getUint32();
                            if (o === 0) {
                                switch (a) {
                                  case "b":
                                  case "c":
                                    return r.getBooleanArray(i);

                                  case "d":
                                    return r.getFloat64Array(i);

                                  case "f":
                                    return r.getFloat32Array(i);

                                  case "i":
                                    return r.getInt32Array(i);

                                  case "l":
                                    return r.getInt64Array(i);
                                }
                            }
                            if (window.Zlib === undefined) {
                                console.error("THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js");
                            }
                            var f = new Zlib.Inflate(new Uint8Array(r.getArrayBuffer(s)));
                            var u = new t(f.decompress().buffer);
                            switch (a) {
                              case "b":
                              case "c":
                                return u.getBooleanArray(i);

                              case "d":
                                return u.getFloat64Array(i);

                              case "f":
                                return u.getFloat32Array(i);

                              case "i":
                                return u.getInt32Array(i);

                              case "l":
                                return u.getInt64Array(i);
                            }

                          default:
                            throw new Error("THREE.FBXLoader: Unknown property type " + a);
                        }
                    }
                });
                function t(e, t) {
                    this.dv = new DataView(e);
                    this.offset = 0;
                    this.littleEndian = t !== undefined ? t : true;
                }
                a(t.prototype, {
                    getOffset: function e() {
                        return this.offset;
                    },
                    size: function e() {
                        return this.dv.buffer.byteLength;
                    },
                    skip: function e(t) {
                        this.offset += t;
                    },
                    getBoolean: function e() {
                        return (this.getUint8() & 1) === 1;
                    },
                    getBooleanArray: function e(t) {
                        var r = [];
                        for (var a = 0; a < t; a++) {
                            r.push(this.getBoolean());
                        }
                        return r;
                    },
                    getUint8: function e() {
                        var t = this.dv.getUint8(this.offset);
                        this.offset += 1;
                        return t;
                    },
                    getInt16: function e() {
                        var t = this.dv.getInt16(this.offset, this.littleEndian);
                        this.offset += 2;
                        return t;
                    },
                    getInt32: function e() {
                        var t = this.dv.getInt32(this.offset, this.littleEndian);
                        this.offset += 4;
                        return t;
                    },
                    getInt32Array: function e(t) {
                        var r = [];
                        for (var a = 0; a < t; a++) {
                            r.push(this.getInt32());
                        }
                        return r;
                    },
                    getUint32: function e() {
                        var t = this.dv.getUint32(this.offset, this.littleEndian);
                        this.offset += 4;
                        return t;
                    },
                    getInt64: function e() {
                        var t, r;
                        if (this.littleEndian) {
                            t = this.getUint32();
                            r = this.getUint32();
                        } else {
                            r = this.getUint32();
                            t = this.getUint32();
                        }
                        if (r & 2147483648) {
                            r = ~r & 4294967295;
                            t = ~t & 4294967295;
                            if (t === 4294967295) r = r + 1 & 4294967295;
                            t = t + 1 & 4294967295;
                            return -(r * 4294967296 + t);
                        }
                        return r * 4294967296 + t;
                    },
                    getInt64Array: function e(t) {
                        var r = [];
                        for (var a = 0; a < t; a++) {
                            r.push(this.getInt64());
                        }
                        return r;
                    },
                    getUint64: function e() {
                        var t, r;
                        if (this.littleEndian) {
                            t = this.getUint32();
                            r = this.getUint32();
                        } else {
                            r = this.getUint32();
                            t = this.getUint32();
                        }
                        return r * 4294967296 + t;
                    },
                    getFloat32: function e() {
                        var t = this.dv.getFloat32(this.offset, this.littleEndian);
                        this.offset += 4;
                        return t;
                    },
                    getFloat32Array: function e(t) {
                        var r = [];
                        for (var a = 0; a < t; a++) {
                            r.push(this.getFloat32());
                        }
                        return r;
                    },
                    getFloat64: function e() {
                        var t = this.dv.getFloat64(this.offset, this.littleEndian);
                        this.offset += 8;
                        return t;
                    },
                    getFloat64Array: function e(t) {
                        var r = [];
                        for (var a = 0; a < t; a++) {
                            r.push(this.getFloat64());
                        }
                        return r;
                    },
                    getArrayBuffer: function e(t) {
                        var r = this.dv.buffer.slice(this.offset, this.offset + t);
                        this.offset += t;
                        return r;
                    },
                    getString: function e(t) {
                        var r = new Uint8Array(t);
                        for (var a = 0; a < t; a++) {
                            r[a] = this.getUint8();
                        }
                        var n = r.indexOf(0);
                        if (n >= 0) r = r.slice(0, n);
                        return i.default.LoaderUtils.decodeText(r);
                    }
                });
                function r() {}
                a(r.prototype, {
                    add: function e(t, r) {
                        this[t] = r;
                    }
                });
                function n(e) {
                    var t = "Kaydara FBX Binary  \0";
                    return e.byteLength >= t.length && t === d(e, 0, t.length);
                }
                function o(e) {
                    var t = [ "K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\" ];
                    var r = 0;
                    function a(t) {
                        var a = e[t - 1];
                        e = e.slice(r + t);
                        r++;
                        return a;
                    }
                    for (var n = 0; n < t.length; ++n) {
                        var i = a(1);
                        if (i === t[n]) {
                            return false;
                        }
                    }
                    return true;
                }
                function s(e) {
                    var t = /FBXVersion: (\d+)/;
                    var r = e.match(t);
                    if (r) {
                        var a = parseInt(r[1]);
                        return a;
                    }
                    throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
                }
                function f(e) {
                    return e / 46186158e3;
                }
                function u(e) {
                    var t = e.split(",").map(function(e) {
                        return parseFloat(e);
                    });
                    return t;
                }
                function d(e, t, r) {
                    if (t === undefined) t = 0;
                    if (r === undefined) r = e.byteLength;
                    return i.default.LoaderUtils.decodeText(new Uint8Array(e, t, r));
                }
                function l(e, t) {
                    for (var r = 0, a = e.length, n = t.length; r < n; r++, a++) {
                        e[a] = t[r];
                    }
                }
                function h(e, t, r, a) {
                    for (var n = r, i = 0; n < a; n++, i++) {
                        e[i] = t[n];
                    }
                    return e;
                }
                function v(e, t, r) {
                    return e.slice(0, t).concat(r).concat(e.slice(t));
                }
                return i.default.FBXLoader;
            }();
        },
        66: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var a in r) {
                        if (Object.prototype.hasOwnProperty.call(r, a)) {
                            e[a] = r[a];
                        }
                    }
                }
                return e;
            };
            function a(e, t, r, a) {
                this.parameterPositions = e;
                this._cachedIndex = 0;
                this.resultBuffer = a !== undefined ? a : new t.constructor(r);
                this.sampleValues = t;
                this.valueSize = r;
            }
            r(a.prototype, {
                evaluate: function e(t) {
                    var r = this.parameterPositions, a = this._cachedIndex, n = r[a], i = r[a - 1];
                    e: {
                        t: {
                            var o;
                            r: {
                                a: if (!(t < n)) {
                                    for (var s = a + 2; ;) {
                                        if (n === undefined) {
                                            if (t < i) break a;
                                            a = r.length;
                                            this._cachedIndex = a;
                                            return this.afterEnd_(a - 1, t, i);
                                        }
                                        if (a === s) break;
                                        i = n;
                                        n = r[++a];
                                        if (t < n) {
                                            break t;
                                        }
                                    }
                                    o = r.length;
                                    break r;
                                }
                                if (!(t >= i)) {
                                    var f = r[1];
                                    if (t < f) {
                                        a = 2;
                                        i = f;
                                    }
                                    for (var s = a - 2; ;) {
                                        if (i === undefined) {
                                            this._cachedIndex = 0;
                                            return this.beforeStart_(0, t, n);
                                        }
                                        if (a === s) break;
                                        n = i;
                                        i = r[--a - 1];
                                        if (t >= i) {
                                            break t;
                                        }
                                    }
                                    o = a;
                                    a = 0;
                                    break r;
                                }
                                break e;
                            }
                            while (a < o) {
                                var u = a + o >>> 1;
                                if (t < r[u]) {
                                    o = u;
                                } else {
                                    a = u + 1;
                                }
                            }
                            n = r[a];
                            i = r[a - 1];
                            if (i === undefined) {
                                this._cachedIndex = 0;
                                return this.beforeStart_(0, t, n);
                            }
                            if (n === undefined) {
                                a = r.length;
                                this._cachedIndex = a;
                                return this.afterEnd_(a - 1, i, t);
                            }
                        }
                        this._cachedIndex = a;
                        this.intervalChanged_(a, i, n);
                    }
                    return this.interpolate_(a, i, t, n);
                },
                settings: null,
                DefaultSettings_: {},
                getSettings_: function e() {
                    return this.settings || this.DefaultSettings_;
                },
                copySampleValue_: function e(t) {
                    var r = this.resultBuffer, a = this.sampleValues, n = this.valueSize, i = t * n;
                    for (var o = 0; o !== n; ++o) {
                        r[o] = a[i + o];
                    }
                    return r;
                },
                interpolate_: function e() {
                    throw new Error("call to abstract method");
                },
                intervalChanged_: function e() {}
            });
            r(a.prototype, {
                beforeStart_: a.prototype.copySampleValue_,
                afterEnd_: a.prototype.copySampleValue_
            });
            t.Interpolant = a;
        },
        67: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = {
                decodeText: function e(t) {
                    if (typeof TextDecoder !== "undefined") {
                        return new TextDecoder().decode(t);
                    }
                    var r = "";
                    for (var a = 0, n = t.length; a < n; a++) {
                        r += String.fromCharCode(t[a]);
                    }
                    return decodeURIComponent(escape(r));
                },
                extractUrlBase: function e(t) {
                    var r = t.lastIndexOf("/");
                    if (r === -1) return "./";
                    return t.substr(0, r + 1);
                }
            };
            t.LoaderUtils = r;
        },
        68: function(e, t, r) {
            "use strict";
            var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var a in r) {
                        if (Object.prototype.hasOwnProperty.call(r, a)) {
                            e[a] = r[a];
                        }
                    }
                }
                return e;
            };
            var n = r(9);
            var i = o(n);
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = function() {
                function e(e) {
                    this.manager = e !== undefined ? e : i.default.DefaultLoadingManager;
                    this.loader = new i.default.FileLoader(this.manager);
                    this.parser = null;
                    this.meshBuilder = new r(this.manager);
                    this.animationBuilder = new s();
                }
                e.prototype = {
                    constructor: e,
                    crossOrigin: undefined,
                    setCrossOrigin: function e(t) {
                        this.crossOrigin = t;
                        return this;
                    },
                    load: function e(t, r, a, n) {
                        var o = this._getParser();
                        var s = this.meshBuilder.setCrossOrigin(this.crossOrigin);
                        var f = i.default.LoaderUtils.extractUrlBase(t);
                        var u = this._extractExtension(t).toLowerCase();
                        if (u !== "pmd" && u !== "pmx") {
                            if (n) n(new Error("THREE.MMDLoader: Unknown model file extension ." + u + "."));
                            return;
                        }
                        this[u === "pmd" ? "loadPMD" : "loadPMX"](t, function(e) {
                            r(s.build(e, f, a, n));
                        }, a, n);
                    },
                    loadAnimation: function e(t, r, a, n, i) {
                        var o = this.animationBuilder;
                        this.loadVMD(t, function(e) {
                            a(r.isCamera ? o.buildCameraAnimation(e) : o.build(e, r));
                        }, n, i);
                    },
                    loadWithAnimation: function e(t, r, a, n, i) {
                        var o = this;
                        this.load(t, function(e) {
                            o.loadAnimation(r, e, function(t) {
                                a({
                                    mesh: e,
                                    animation: t
                                });
                            }, n, i);
                        }, n, i);
                    },
                    loadPMD: function e(t, r, a, n) {
                        var i = this._getParser();
                        this.loader.setMimeType(undefined).setResponseType("arraybuffer").load(t, function(e) {
                            r(i.parsePmd(e, true));
                        }, a, n);
                    },
                    loadPMX: function e(t, r, a, n) {
                        var i = this._getParser();
                        this.loader.setMimeType(undefined).setResponseType("arraybuffer").load(t, function(e) {
                            r(i.parsePmx(e, true));
                        }, a, n);
                    },
                    loadVMD: function e(t, r, a, n) {
                        var i = Array.isArray(t) ? t : [ t ];
                        var o = [];
                        var s = i.length;
                        var f = this;
                        var u = this._getParser();
                        this.loader.setMimeType(undefined).setResponseType("arraybuffer");
                        for (var d = 0, l = i.length; d < l; d++) {
                            this.loader.load(i[d], function(e) {
                                o.push(u.parseVmd(e, true));
                                if (o.length === s) r(u.mergeVmds(o));
                            }, a, n);
                        }
                    },
                    loadVPD: function e(t, r, a, n, i, o) {
                        o = o || {};
                        var s = this._getParser();
                        this.loader.setMimeType(r ? undefined : "text/plain; charset=shift_jis").setResponseType("text").load(t, function(e) {
                            a(s.parseVpd(e, true));
                        }, n, i);
                    },
                    _extractExtension: function e(t) {
                        var r = t.lastIndexOf(".");
                        return r < 0 ? "" : t.slice(r + 1);
                    },
                    _getParser: function e() {
                        if (this.parser === null) {
                            if (typeof MMDParser === "undefined") {
                                throw new Error("THREE.MMDLoader: Import MMDParser https://github.com/takahirox/mmd-parser");
                            }
                            this.parser = new MMDParser.Parser();
                        }
                        return this.parser;
                    }
                };
                var t = [ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/bWiiMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh8aBHZBl14e8wAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOUlEQVRYR+3WMREAMAwDsYY/yoDI7MLwIiP40+RJklfcCCBAgAABAgTqArfb/QMCCBAgQIAAgbbAB3z/e0F3js2cAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/B5ilMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh81dWyx0gFwKAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYR+3WoREAMAwDsWb/UQtCy9wxTOQJ/oQ8SXKKGwEECBAgQIBAXeDt7f4BAQQIECBAgEBb4AOz8Hzx7WLY4wAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPUlEQVRYR+1XwW7CMAy1+f9fZOMysSEOEweEOPRNdm3HbdOyIhAcklPrOs/PLy9RygBALxzcCDQFmgJNgaZAU6Ap0BR4PwX8gsRMVLssMRH5HcpzJEaWL7EVg9F1IHRlyqQohgVr4FGUlUcMJSjcUlDw0zvjeun70cLWmneoyf7NgBTQSniBTQQSuJAZsOnnaczjIMb5hCiuHKxokCrJfVnrctyZL0PkJAJe1HMil4nxeyi3Ypfn1kX51jpPvo/JeCNC4PhVdHdJw2XjBR8brF8PEIhNVn12AgP7uHsTBguBn53MUZCqv7Lp07Pn5k1Ro+uWmUNn7D+M57rtk7aG0Vo73xyF/fbFf0bPJjDXngnGocDTdFhygZjwUQrMNrDcmZlQT50VJ/g/UwNyHpu778+yW+/ksOz/BFo54P4AsUXMfRq7XWsAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACMElEQVRYR+2Xv4pTQRTGf2dubhLdICiii2KnYKHVolhauKWPoGAnNr6BD6CvIVaihYuI2i1ia0BY0MZGRHQXjZj/mSPnnskfNWiWZUlzJ5k7M2cm833nO5Mziej2DWWJRUoCpQKlAntSQCqgw39/iUWAGmh37jrRnVsKlgpiqmkoGVABA7E57fvY+pJDdgKqF6HzFCSADkDq+F6AHABtQ+UMVE5D7zXod7fFNhTEckTbj5XQgHzNN+5tQvc5NG7C6BNkp6D3EmpXHDR+dQAjFLchW3VS9rlw3JBh+B7ys5Cf9z0GW1C/7P32AyBAOAz1q4jGliIH3YPuBnSfQX4OGreTIgEYQb/pBDtPnEQ4CivXYPAWBk13oHrB54yA9QuSn2H4AcKRpEILDt0BUzj+RLR1V5EqjD66NPRBVpLcQwjHoHYJOhsQv6U4mnzmrIXJCFr4LDwm/xBUoboG9XX4cc9VKdYoSA2yk5NQLJaKDUjTBoveG3Z2TElTxwjNK4M3LEZgUdDdruvcXzKBpStgp2NPiWi3ks9ZXxIoFVi+AvHLdc9TqtjL3/aYjpPlrzOcEnK62Szhimdd7xX232zFDTgtxezOu3WNMRLjiKgjtOhHVMd1loynVHvOgjuIIJMaELEqhJAV/RCSLbWTcfPFakFgFlALTRRvx+ok6Hlp/Q+v3fmx90bMyUzaEAhmM3KvHlXTL5DxnbGf/1M8RNNACLL5MNtPxP/mypJAqcDSFfgFhpYqWUzhTEAAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=" ];
                function r(e) {
                    this.geometryBuilder = new n();
                    this.materialBuilder = new o(e);
                }
                r.prototype = {
                    constructor: r,
                    crossOrigin: undefined,
                    setCrossOrigin: function e(t) {
                        this.crossOrigin = t;
                        return this;
                    },
                    build: function e(t, r, a, n) {
                        var o = this.geometryBuilder.build(t);
                        var s = this.materialBuilder.setCrossOrigin(this.crossOrigin).setTexturePath(r).build(t, o, a, n);
                        var f = new i.default.SkinnedMesh(o, s);
                        return f;
                    }
                };
                function n() {}
                n.prototype = {
                    constructor: n,
                    build: function e(t) {
                        var r = [];
                        var a = [];
                        var n = [];
                        var o = [];
                        var s = [];
                        var f = [];
                        var u = [];
                        var d = [];
                        var l = [];
                        var h = [];
                        var v = [];
                        var c = [];
                        var p = [];
                        var A = [];
                        var g = 0;
                        var m = {};
                        for (var y = 0; y < t.metadata.vertexCount; y++) {
                            var b = t.vertices[y];
                            for (var C = 0, x = b.position.length; C < x; C++) {
                                r.push(b.position[C]);
                            }
                            for (var C = 0, x = b.normal.length; C < x; C++) {
                                n.push(b.normal[C]);
                            }
                            for (var C = 0, x = b.uv.length; C < x; C++) {
                                a.push(b.uv[C]);
                            }
                            for (var C = 0; C < 4; C++) {
                                u.push(b.skinIndices.length - 1 >= C ? b.skinIndices[C] : 0);
                            }
                            for (var C = 0; C < 4; C++) {
                                d.push(b.skinWeights.length - 1 >= C ? b.skinWeights[C] : 0);
                            }
                        }
                        for (var y = 0; y < t.metadata.faceCount; y++) {
                            var E = t.faces[y];
                            for (var C = 0, x = E.indices.length; C < x; C++) {
                                o.push(E.indices[C]);
                            }
                        }
                        for (var y = 0; y < t.metadata.materialCount; y++) {
                            var w = t.materials[y];
                            s.push({
                                offset: g * 3,
                                count: w.faceCount * 3
                            });
                            g += w.faceCount;
                        }
                        for (var y = 0; y < t.metadata.rigidBodyCount; y++) {
                            var T = t.rigidBodies[y];
                            var B = m[T.boneIndex];
                            B = B === undefined ? T.type : Math.max(T.type, B);
                            m[T.boneIndex] = B;
                        }
                        for (var y = 0; y < t.metadata.boneCount; y++) {
                            var L = t.bones[y];
                            var I = {
                                parent: L.parentIndex,
                                name: L.name,
                                pos: L.position.slice(0, 3),
                                rotq: [ 0, 0, 0, 1 ],
                                scl: [ 1, 1, 1 ],
                                rigidBodyType: m[y] !== undefined ? m[y] : -1
                            };
                            if (I.parent !== -1) {
                                I.pos[0] -= t.bones[I.parent].position[0];
                                I.pos[1] -= t.bones[I.parent].position[1];
                                I.pos[2] -= t.bones[I.parent].position[2];
                            }
                            f.push(I);
                        }
                        if (t.metadata.format === "pmd") {
                            for (var y = 0; y < t.metadata.ikCount; y++) {
                                var R = t.iks[y];
                                var U = {
                                    target: R.target,
                                    effector: R.effector,
                                    iteration: R.iteration,
                                    maxAngle: R.maxAngle * 4,
                                    links: []
                                };
                                for (var C = 0, x = R.links.length; C < x; C++) {
                                    var _ = {};
                                    _.index = R.links[C].index;
                                    _.enabled = true;
                                    if (t.bones[_.index].name.indexOf("ひざ") >= 0) {
                                        _.limitation = new i.default.Vector3(1, 0, 0);
                                    }
                                    U.links.push(_);
                                }
                                v.push(U);
                            }
                        } else {
                            for (var y = 0; y < t.metadata.boneCount; y++) {
                                var R = t.bones[y].ik;
                                if (R === undefined) continue;
                                var U = {
                                    target: y,
                                    effector: R.effector,
                                    iteration: R.iteration,
                                    maxAngle: R.maxAngle,
                                    links: []
                                };
                                for (var C = 0, x = R.links.length; C < x; C++) {
                                    var _ = {};
                                    _.index = R.links[C].index;
                                    _.enabled = true;
                                    if (R.links[C].angleLimitation === 1) {
                                        var M = R.links[C].lowerLimitationAngle;
                                        var D = R.links[C].upperLimitationAngle;
                                        var k = -D[0];
                                        var S = -D[1];
                                        D[0] = -M[0];
                                        D[1] = -M[1];
                                        M[0] = k;
                                        M[1] = S;
                                        _.rotationMin = new i.default.Vector3().fromArray(M);
                                        _.rotationMax = new i.default.Vector3().fromArray(D);
                                    }
                                    U.links.push(_);
                                }
                                v.push(U);
                            }
                        }
                        if (t.metadata.format === "pmx") {
                            for (var y = 0; y < t.metadata.boneCount; y++) {
                                var L = t.bones[y];
                                var F = L.grant;
                                if (F === undefined) continue;
                                var U = {
                                    index: y,
                                    parentIndex: F.parentIndex,
                                    ratio: F.ratio,
                                    isLocal: F.isLocal,
                                    affectRotation: F.affectRotation,
                                    affectPosition: F.affectPosition,
                                    transformationClass: L.transformationClass
                                };
                                c.push(U);
                            }
                            c.sort(function(e, t) {
                                return e.transformationClass - t.transformationClass;
                            });
                        }
                        function O(e, r, a) {
                            for (var n = 0; n < r.elementCount; n++) {
                                var i = r.elements[n];
                                var o;
                                if (t.metadata.format === "pmd") {
                                    o = t.morphs[0].elements[i.index].index;
                                } else {
                                    o = i.index;
                                }
                                e.array[o * 3 + 0] += i.position[0] * a;
                                e.array[o * 3 + 1] += i.position[1] * a;
                                e.array[o * 3 + 2] += i.position[2] * a;
                            }
                        }
                        for (var y = 0; y < t.metadata.morphCount; y++) {
                            var P = t.morphs[y];
                            var Q = {
                                name: P.name
                            };
                            var V = new i.default.Float32BufferAttribute(t.metadata.vertexCount * 3, 3);
                            V.name = P.name;
                            for (var C = 0; C < t.metadata.vertexCount * 3; C++) {
                                V.array[C] = r[C];
                            }
                            if (t.metadata.format === "pmd") {
                                if (y !== 0) {
                                    O(V, P, 1);
                                }
                            } else {
                                if (P.type === 0) {
                                    for (var C = 0; C < P.elementCount; C++) {
                                        var N = t.morphs[P.elements[C].index];
                                        var X = P.elements[C].ratio;
                                        if (N.type === 1) {
                                            O(V, N, X);
                                        } else {}
                                    }
                                } else if (P.type === 1) {
                                    O(V, P, 1);
                                } else if (P.type === 2) {} else if (P.type === 3) {} else if (P.type === 4) {} else if (P.type === 5) {} else if (P.type === 6) {} else if (P.type === 7) {} else if (P.type === 8) {}
                            }
                            l.push(Q);
                            h.push(V);
                        }
                        for (var y = 0; y < t.metadata.rigidBodyCount; y++) {
                            var j = t.rigidBodies[y];
                            var Q = {};
                            for (var z in j) {
                                Q[z] = j[z];
                            }
                            if (t.metadata.format === "pmx") {
                                if (Q.boneIndex !== -1) {
                                    var I = t.bones[Q.boneIndex];
                                    Q.position[0] -= I.position[0];
                                    Q.position[1] -= I.position[1];
                                    Q.position[2] -= I.position[2];
                                }
                            }
                            p.push(Q);
                        }
                        for (var y = 0; y < t.metadata.constraintCount; y++) {
                            var G = t.constraints[y];
                            var Q = {};
                            for (var z in G) {
                                Q[z] = G[z];
                            }
                            var H = p[Q.rigidBodyIndex1];
                            var Y = p[Q.rigidBodyIndex2];
                            if (H.type !== 0 && Y.type === 2) {
                                if (H.boneIndex !== -1 && Y.boneIndex !== -1 && t.bones[Y.boneIndex].parentIndex === H.boneIndex) {
                                    Y.type = 1;
                                }
                            }
                            A.push(Q);
                        }
                        var K = new i.default.BufferGeometry();
                        K.addAttribute("position", new i.default.Float32BufferAttribute(r, 3));
                        K.addAttribute("normal", new i.default.Float32BufferAttribute(n, 3));
                        K.addAttribute("uv", new i.default.Float32BufferAttribute(a, 2));
                        K.addAttribute("skinIndex", new i.default.Uint16BufferAttribute(u, 4));
                        K.addAttribute("skinWeight", new i.default.Float32BufferAttribute(d, 4));
                        K.setIndex(o);
                        for (var y = 0, W = s.length; y < W; y++) {
                            K.addGroup(s[y].offset, s[y].count, y);
                        }
                        K.bones = f;
                        K.morphTargets = l;
                        K.morphAttributes.position = h;
                        K.userData.MMD = {
                            bones: f,
                            iks: v,
                            grants: c,
                            rigidBodies: p,
                            constraints: A,
                            format: t.metadata.format
                        };
                        K.computeBoundingSphere();
                        return K;
                    }
                };
                function o(e) {
                    this.manager = e;
                    this.tgaLoader = null;
                }
                o.prototype = {
                    constructor: o,
                    crossOrigin: undefined,
                    texturePath: undefined,
                    setCrossOrigin: function e(t) {
                        this.crossOrigin = t;
                        return this;
                    },
                    setTexturePath: function e(t) {
                        this.texturePath = t;
                        return this;
                    },
                    build: function e(t, r, a, n) {
                        var o = [];
                        var s = {};
                        this.textureLoader.setCrossOrigin(this.crossOrigin);
                        for (var f = 0; f < t.metadata.materialCount; f++) {
                            var u = t.materials[f];
                            var d = {
                                userData: {}
                            };
                            if (u.name !== undefined) d.name = u.name;
                            d.color = new i.default.Color().fromArray(u.diffuse);
                            d.opacity = u.diffuse[3];
                            d.specular = new i.default.Color().fromArray(u.specular);
                            d.emissive = new i.default.Color().fromArray(u.ambient);
                            d.shininess = Math.max(u.shininess, 1e-4);
                            d.transparent = d.opacity !== 1;
                            d.skinning = r.bones.length > 0 ? true : false;
                            d.morphTargets = r.morphTargets.length > 0 ? true : false;
                            d.lights = true;
                            d.fog = true;
                            d.blending = i.default.CustomBlending;
                            d.blendSrc = i.default.SrcAlphaFactor;
                            d.blendDst = i.default.OneMinusSrcAlphaFactor;
                            d.blendSrcAlpha = i.default.SrcAlphaFactor;
                            d.blendDstAlpha = i.default.DstAlphaFactor;
                            if (t.metadata.format === "pmx" && (u.flag & 1) === 1) {
                                d.side = i.default.DoubleSide;
                            } else {
                                d.side = d.opacity === 1 ? i.default.FrontSide : i.default.DoubleSide;
                            }
                            if (t.metadata.format === "pmd") {
                                if (u.fileName) {
                                    var l = u.fileName;
                                    var h = l.split("*");
                                    d.map = this._loadTexture(h[0], s);
                                    if (h.length > 1) {
                                        var v = h[1].slice(-4).toLowerCase();
                                        d.envMap = this._loadTexture(h[1], s, {
                                            sphericalReflectionMapping: true
                                        });
                                        d.combine = v === ".sph" ? i.default.MultiplyOperation : i.default.AddOperation;
                                    }
                                }
                                var c = u.toonIndex === -1 ? "toon00.bmp" : t.toonTextures[u.toonIndex].fileName;
                                d.gradientMap = this._loadTexture(c, s, {
                                    isToonTexture: true,
                                    isDefaultToonTexture: this._isDefaultToonTexture(c)
                                });
                                d.userData.outlineParameters = {
                                    thickness: u.edgeFlag === 1 ? .003 : 0,
                                    color: [ 0, 0, 0 ],
                                    alpha: 1,
                                    visible: u.edgeFlag === 1
                                };
                            } else {
                                if (u.textureIndex !== -1) {
                                    d.map = this._loadTexture(t.textures[u.textureIndex], s);
                                }
                                if (u.envTextureIndex !== -1 && (u.envFlag === 1 || u.envFlag == 2)) {
                                    d.envMap = this._loadTexture(t.textures[u.envTextureIndex], s, {
                                        sphericalReflectionMapping: true
                                    });
                                    d.combine = u.envFlag === 1 ? i.default.MultiplyOperation : i.default.AddOperation;
                                }
                                var c, p;
                                if (u.toonIndex === -1 || u.toonFlag !== 0) {
                                    c = "toon" + ("0" + (u.toonIndex + 1)).slice(-2) + ".bmp";
                                    p = true;
                                } else {
                                    c = t.textures[u.toonIndex];
                                    p = false;
                                }
                                d.gradientMap = this._loadTexture(c, s, {
                                    isToonTexture: true,
                                    isDefaultToonTexture: p
                                });
                                d.userData.outlineParameters = {
                                    thickness: u.edgeSize / 300,
                                    color: u.edgeColor.slice(0, 3),
                                    alpha: u.edgeColor[3],
                                    visible: (u.flag & 16) !== 0 && u.edgeSize > 0
                                };
                            }
                            if (d.map !== undefined) {
                                if (!d.transparent) {
                                    this._checkImageTransparency(d.map, r, f);
                                }
                                d.emissive.multiplyScalar(.2);
                            }
                            o.push(new i.default.MeshToonMaterial(d));
                        }
                        if (t.metadata.format === "pmx") {
                            var A = function e(t, r) {
                                for (var a = 0, n = t.length; a < n; a++) {
                                    var i = t[a];
                                    if (i.index === -1) continue;
                                    var o = r[i.index];
                                    if (o.opacity !== i.diffuse[3]) {
                                        o.transparent = true;
                                    }
                                }
                            };
                            for (var f = 0, g = t.morphs.length; f < g; f++) {
                                var m = t.morphs[f];
                                var y = m.elements;
                                if (m.type === 0) {
                                    for (var b = 0, C = y.length; b < C; b++) {
                                        var x = t.morphs[y[b].index];
                                        if (x.type !== 8) continue;
                                        A(x.elements, o);
                                    }
                                } else if (m.type === 8) {
                                    A(y, o);
                                }
                            }
                        }
                        return o;
                    },
                    _getTGALoader: function e() {
                        if (this.tgaLoader === null) {
                            if (i.default.TGALoader === undefined) {
                                throw new Error("THREE.MMDLoader: Import THREE.TGALoader");
                            }
                            this.tgaLoader = new i.default.TGALoader(this.manager);
                        }
                        return this.tgaLoader;
                    },
                    _isDefaultToonTexture: function e(t) {
                        if (t.length !== 10) return false;
                        return /toon(10|0[0-9])\.bmp/.test(t);
                    },
                    _loadTexture: function e(r, a, n, o, s) {
                        n = n || {};
                        var f = this;
                        var u;
                        if (n.isDefaultToonTexture === true) {
                            var d;
                            try {
                                d = parseInt(r.match("toon([0-9]{2}).bmp$")[1]);
                            } catch (e) {
                                console.warn("THREE.MMDLoader: " + r + " seems like a " + "not right default texture path. Using toon00.bmp instead.");
                                d = 0;
                            }
                            u = t[d];
                        } else {
                            u = this.texturePath + r;
                        }
                        if (a[u] !== undefined) return a[u];
                        var l = i.default.Loader.Handlers.get(u);
                        if (l === null) {
                            l = r.slice(-4).toLowerCase() === ".tga" ? this._getTGALoader() : this.textureLoader;
                        }
                        var h = l.load(u, function(e) {
                            if (n.isToonTexture === true) {
                                e.image = f._getRotatedImage(e.image);
                            }
                            e.flipY = false;
                            e.wrapS = i.default.RepeatWrapping;
                            e.wrapT = i.default.RepeatWrapping;
                            for (var t = 0; t < h.readyCallbacks.length; t++) {
                                h.readyCallbacks[t](h);
                            }
                            delete h.readyCallbacks;
                        }, o, s);
                        if (n.sphericalReflectionMapping === true) {
                            h.mapping = i.default.SphericalReflectionMapping;
                        }
                        h.readyCallbacks = [];
                        a[u] = h;
                        return h;
                    },
                    _getRotatedImage: function e(t) {
                        var r = document.createElement("canvas");
                        var a = r.getContext("2d");
                        var n = t.width;
                        var i = t.height;
                        r.width = n;
                        r.height = i;
                        a.clearRect(0, 0, n, i);
                        a.translate(n / 2, i / 2);
                        a.rotate(.5 * Math.PI);
                        a.translate(-n / 2, -i / 2);
                        a.drawImage(t, 0, 0);
                        return a.getImageData(0, 0, n, i);
                    },
                    _checkImageTransparency: function e(t, r, a) {
                        t.readyCallbacks.push(function(e) {
                            function n(e) {
                                var t = document.createElement("canvas");
                                t.width = e.width;
                                t.height = e.height;
                                var r = t.getContext("2d");
                                r.drawImage(e, 0, 0);
                                return r.getImageData(0, 0, t.width, t.height);
                            }
                            function i(e, t, r) {
                                var a = e.width;
                                var n = e.height;
                                var i = e.data;
                                var s = 253;
                                if (i.length / (a * n) !== 4) return false;
                                for (var f = 0; f < r.length; f += 3) {
                                    var u = {
                                        x: 0,
                                        y: 0
                                    };
                                    for (var d = 0; d < 3; d++) {
                                        var l = r[f * 3 + d];
                                        var h = {
                                            x: t[l * 2 + 0],
                                            y: t[l * 2 + 1]
                                        };
                                        if (o(e, h) < s) return true;
                                        u.x += h.x;
                                        u.y += h.y;
                                    }
                                    u.x /= 3;
                                    u.y /= 3;
                                    if (o(e, u) < s) return true;
                                }
                                return false;
                            }
                            function o(e, t) {
                                var r = e.width;
                                var a = e.height;
                                var n = Math.round(t.x * r) % r;
                                var i = Math.round(t.y * a) % a;
                                if (n < 0) n += r;
                                if (i < 0) i += a;
                                var o = i * r + n;
                                return e.data[o * 4 + 3];
                            }
                            var s = e.image.data !== undefined ? e.image : n(e.image);
                            var f = r.groups[a];
                            if (i(s, r.attributes.uv.array, r.index.array.slice(f.start, f.start + f.count))) {
                                t.transparent = true;
                            }
                        });
                    }
                };
                function s() {}
                s.prototype = {
                    constructor: s,
                    build: function e(t, r) {
                        var a = this.buildSkeletalAnimation(t, r).tracks;
                        var n = this.buildMorphAnimation(t, r).tracks;
                        for (var o = 0, s = n.length; o < s; o++) {
                            a.push(n[o]);
                        }
                        return new i.default.AnimationClip("", -1, a);
                    },
                    buildSkeletalAnimation: function e(t, r) {
                        function a(e, t, r) {
                            e.push(t[r + 0] / 127);
                            e.push(t[r + 8] / 127);
                            e.push(t[r + 4] / 127);
                            e.push(t[r + 12] / 127);
                        }
                        var n = [];
                        var o = {};
                        var s = r.skeleton.bones;
                        var f = {};
                        for (var u = 0, d = s.length; u < d; u++) {
                            f[s[u].name] = true;
                        }
                        for (var u = 0; u < t.metadata.motionCount; u++) {
                            var l = t.motions[u];
                            var h = l.boneName;
                            if (f[h] === undefined) continue;
                            o[h] = o[h] || [];
                            o[h].push(l);
                        }
                        for (var v in o) {
                            var c = o[v];
                            c.sort(function(e, t) {
                                return e.frameNum - t.frameNum;
                            });
                            var p = [];
                            var A = [];
                            var g = [];
                            var m = [];
                            var y = [];
                            var b = r.skeleton.getBoneByName(v).position.toArray();
                            for (var u = 0, d = c.length; u < d; u++) {
                                var C = c[u].frameNum / 30;
                                var x = c[u].position;
                                var E = c[u].rotation;
                                var w = c[u].interpolation;
                                p.push(C);
                                for (var T = 0; T < 3; T++) {
                                    A.push(b[T] + x[T]);
                                }
                                for (var T = 0; T < 4; T++) {
                                    g.push(E[T]);
                                }
                                for (var T = 0; T < 3; T++) {
                                    a(m, w, T);
                                }
                                a(y, w, 3);
                            }
                            var B = ".bones[" + v + "]";
                            n.push(this._createTrack(B + ".position", i.default.VectorKeyframeTrack, p, A, m));
                            n.push(this._createTrack(B + ".quaternion", i.default.QuaternionKeyframeTrack, p, g, y));
                        }
                        return new i.default.AnimationClip("", -1, n);
                    },
                    buildMorphAnimation: function e(t, r) {
                        var a = [];
                        var n = {};
                        var o = r.morphTargetDictionary;
                        for (var s = 0; s < t.metadata.morphCount; s++) {
                            var f = t.morphs[s];
                            var u = f.morphName;
                            if (o[u] === undefined) continue;
                            n[u] = n[u] || [];
                            n[u].push(f);
                        }
                        for (var d in n) {
                            var l = n[d];
                            l.sort(function(e, t) {
                                return e.frameNum - t.frameNum;
                            });
                            var h = [];
                            var v = [];
                            for (var s = 0, c = l.length; s < c; s++) {
                                h.push(l[s].frameNum / 30);
                                v.push(l[s].weight);
                            }
                            a.push(new i.default.NumberKeyframeTrack(".morphTargetInfluences[" + o[d] + "]", h, v));
                        }
                        return new i.default.AnimationClip("", -1, a);
                    },
                    buildCameraAnimation: function e(t) {
                        function r(e, t) {
                            e.push(t.x);
                            e.push(t.y);
                            e.push(t.z);
                        }
                        function a(e, t) {
                            e.push(t.x);
                            e.push(t.y);
                            e.push(t.z);
                            e.push(t.w);
                        }
                        function n(e, t, r) {
                            e.push(t[r * 4 + 0] / 127);
                            e.push(t[r * 4 + 1] / 127);
                            e.push(t[r * 4 + 2] / 127);
                            e.push(t[r * 4 + 3] / 127);
                        }
                        var o = [];
                        var s = t.cameras === undefined ? [] : t.cameras.slice();
                        s.sort(function(e, t) {
                            return e.frameNum - t.frameNum;
                        });
                        var f = [];
                        var u = [];
                        var d = [];
                        var l = [];
                        var h = [];
                        var v = [];
                        var c = [];
                        var p = [];
                        var A = [];
                        var g = new i.default.Quaternion();
                        var m = new i.default.Euler();
                        var y = new i.default.Vector3();
                        var b = new i.default.Vector3();
                        for (var C = 0, x = s.length; C < x; C++) {
                            var E = s[C];
                            var w = E.frameNum / 30;
                            var T = E.position;
                            var B = E.rotation;
                            var L = E.distance;
                            var I = E.fov;
                            var R = E.interpolation;
                            f.push(w);
                            y.set(0, 0, -L);
                            b.set(T[0], T[1], T[2]);
                            m.set(-B[0], -B[1], -B[2]);
                            g.setFromEuler(m);
                            y.add(b);
                            y.applyQuaternion(g);
                            r(u, b);
                            a(d, g);
                            r(l, y);
                            h.push(I);
                            for (var U = 0; U < 3; U++) {
                                n(v, R, U);
                            }
                            n(c, R, 3);
                            for (var U = 0; U < 3; U++) {
                                n(p, R, 4);
                            }
                            n(A, R, 5);
                        }
                        var o = [];
                        o.push(this._createTrack("target.position", i.default.VectorKeyframeTrack, f, u, v));
                        o.push(this._createTrack(".quaternion", i.default.QuaternionKeyframeTrack, f, d, c));
                        o.push(this._createTrack(".position", i.default.VectorKeyframeTrack, f, l, p));
                        o.push(this._createTrack(".fov", i.default.NumberKeyframeTrack, f, h, A));
                        return new i.default.AnimationClip("", -1, o);
                    },
                    _createTrack: function e(t, r, a, n, i) {
                        if (a.length > 2) {
                            a = a.slice();
                            n = n.slice();
                            i = i.slice();
                            var o = n.length / a.length;
                            var s = i.length / a.length;
                            var u = 1;
                            for (var d = 2, l = a.length; d < l; d++) {
                                for (var h = 0; h < o; h++) {
                                    if (n[u * o + h] !== n[(u - 1) * o + h] || n[u * o + h] !== n[d * o + h]) {
                                        u++;
                                        break;
                                    }
                                }
                                if (d > u) {
                                    a[u] = a[d];
                                    for (var h = 0; h < o; h++) {
                                        n[u * o + h] = n[d * o + h];
                                    }
                                    for (var h = 0; h < s; h++) {
                                        i[u * s + h] = i[d * s + h];
                                    }
                                }
                            }
                            a.length = u + 1;
                            n.length = (u + 1) * o;
                            i.length = (u + 1) * s;
                        }
                        var v = new r(t, a, n);
                        v.createInterpolant = function e(t) {
                            return new f(this.times, this.values, this.getValueSize(), t, new Float32Array(i));
                        };
                        return v;
                    }
                };
                function f(e, t, r, a, n) {
                    i.default.Interpolant.call(this, e, t, r, a);
                    this.interpolationParams = n;
                }
                f.prototype = a(Object.create(i.default.Interpolant.prototype), {
                    constructor: f,
                    interpolate_: function e(t, r, a, n) {
                        var o = this.resultBuffer;
                        var s = this.sampleValues;
                        var f = this.valueSize;
                        var u = this.interpolationParams;
                        var d = t * f;
                        var l = d - f;
                        var h = n - r < 1 / 30 * 1.5 ? 0 : (a - r) / (n - r);
                        if (f === 4) {
                            var v = u[t * 4 + 0];
                            var c = u[t * 4 + 1];
                            var p = u[t * 4 + 2];
                            var A = u[t * 4 + 3];
                            var g = this._calculate(v, c, p, A, h);
                            i.default.Quaternion.slerpFlat(o, 0, s, l, s, d, g);
                        } else if (f === 3) {
                            for (var m = 0; m !== f; ++m) {
                                var v = u[t * 12 + m * 4 + 0];
                                var c = u[t * 12 + m * 4 + 1];
                                var p = u[t * 12 + m * 4 + 2];
                                var A = u[t * 12 + m * 4 + 3];
                                var g = this._calculate(v, c, p, A, h);
                                o[m] = s[l + m] * (1 - g) + s[d + m] * g;
                            }
                        } else {
                            var v = u[t * 4 + 0];
                            var c = u[t * 4 + 1];
                            var p = u[t * 4 + 2];
                            var A = u[t * 4 + 3];
                            var g = this._calculate(v, c, p, A, h);
                            o[0] = s[l] * (1 - g) + s[d] * g;
                        }
                        return o;
                    },
                    _calculate: function e(t, r, a, n, i) {
                        var o = .5;
                        var s = o;
                        var f = 1 - s;
                        var u = 15;
                        var d = 1e-5;
                        var l = Math;
                        var h, v, c;
                        for (var p = 0; p < u; p++) {
                            h = 3 * f * f * s;
                            v = 3 * f * s * s;
                            c = s * s * s;
                            var A = h * t + v * r + c - i;
                            if (l.abs(A) < d) break;
                            o /= 2;
                            s += A < 0 ? o : -o;
                            f = 1 - s;
                        }
                        return h * a + v * n + c;
                    }
                });
                return e;
            }();
        },
        91: function(e, t, r) {
            "use strict";
            var a = r(68);
            var n = u(a);
            var i = r(65);
            var o = u(i);
            var s = r(64);
            var f = u(s);
            function u(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var d = typeof window !== "undefined";
            var l = {
                MMDLoader: function e(t, r, a, i) {
                    var o = new n.default();
                    o.load(t, function(e) {
                        r(e);
                    }, a, i);
                },
                FBXLoader: function e(t, r, a, n) {
                    var i = new o.default();
                    i.load(t, function(e) {
                        for (var t in e.Objects.Geometry) {
                            var a = e.Objects.Geometry[t];
                            a.PolygonVertexIndex.a = a.PolygonVertexIndex.a.map(function(e, t) {
                                if (e < 0) return -e - 1;
                                return e;
                            });
                        }
                        r(e);
                    }, a, n);
                },
                DDSLoader: f.default
            };
            var h = {
                onCreate: function e(t) {
                    if (this.$isWebgl) {
                        var r = this.$gl;
                        this.ddsLoader = function(e, t) {
                            if (!e) return;
                            var a = r.createTexture();
                            var n = r.getExtension("WEBGL_compressed_texture_s3tc") || r.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                            var i = {
                                width: 0,
                                height: 0
                            };
                            var o = new f.default();
                            o.load(e, function(e) {
                                r.bindTexture(r.TEXTURE_2D, a);
                                r.compressedTexImage2D(r.TEXTURE_2D, 0, e.format, e.image.width, e.image.height, 0, e.mipmaps[0].data);
                                r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR);
                                r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR);
                                i.width = e.image.width;
                                i.height = e.image.height;
                                i.texture = a;
                                t && t(e);
                            }, null, null);
                            return i;
                        };
                    }
                }
            };
            if (d && window.Easycanvas) {
                Easycanvas.loaders = l;
                Easycanvas.use(h);
            } else {
                e.exports = l;
            }
        }
    });
});

