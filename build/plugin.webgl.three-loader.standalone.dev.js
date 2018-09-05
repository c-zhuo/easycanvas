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
            e.exports = r(89);
        },
        24: function(e, t, r) {
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
            var i = r(64);
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
                    var l = t.match(u);
                    if (l) {
                        var d = l[1];
                        var h = !!l[2];
                        var c = l[3];
                        c = window.decodeURIComponent(c);
                        if (h) c = window.atob(c);
                        try {
                            var v;
                            var p = (this.responseType || "").toLowerCase();
                            switch (p) {
                              case "arraybuffer":
                              case "blob":
                                var A = new Uint8Array(c.length);
                                for (var g = 0; g < c.length; g++) {
                                    A[g] = c.charCodeAt(g);
                                }
                                if (p === "blob") {
                                    v = new Blob([ A.buffer ], {
                                        type: d
                                    });
                                } else {
                                    v = A.buffer;
                                }
                                break;

                              case "document":
                                var m = new DOMParser();
                                v = m.parseFromString(c, d);
                                break;

                              case "json":
                                v = JSON.parse(c);
                                break;

                              default:
                                v = c;
                                break;
                            }
                            window.setTimeout(function() {
                                if (r) r(v);
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
        25: function(e, t) {
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
        26: function(e, t) {
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
            var n = r(24);
            var i = r(26);
            var o = r(25);
            var s = {
                FileLoader: n.FileLoader,
                LoaderUtils: i.LoaderUtils,
                Interpolant: o.Interpolant
            };
            e.exports = function() {
                s.FBXLoader = function(e) {
                    this.manager = e !== undefined ? e : s.DefaultLoadingManager;
                };
                a(s.FBXLoader.prototype, {
                    load: function e(t, r, a, n) {
                        var i = this;
                        var o = s.LoaderUtils.extractUrlBase(t);
                        var f = new s.FileLoader(this.manager);
                        f.setResponseType("arraybuffer");
                        f.load(t, function(e) {
                            try {
                                var a = i.parse(e, o);
                                r(a);
                            } catch (e) {
                                window.setTimeout(function() {
                                    if (n) n(e);
                                    i.manager.itemError(t);
                                }, 0);
                            }
                        }, a, n);
                    },
                    parse: function t(r, a) {
                        var s;
                        if (n(r)) {
                            s = new e().parse(r);
                        } else {
                            var f = l(r);
                            if (!i(f)) {
                                throw new Error("THREE.FBXLoader: Unknown format.");
                            }
                            if (o(f) < 7e3) {
                                throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + o(f));
                            }
                            s = new TextParser().parse(f);
                        }
                        return s;
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
                        for (var l = 0; l < i; l++) {
                            u.push(this.parseProperty(t));
                        }
                        var d = u.length > 0 ? u[0] : "";
                        var h = u.length > 1 ? u[1] : "";
                        var c = u.length > 2 ? u[2] : "";
                        a.singleProperty = i === 1 && t.getOffset() === n ? true : false;
                        while (n > t.getOffset()) {
                            var v = this.parseNode(t, r);
                            if (v !== null) this.parseSubNode(f, a, v);
                        }
                        a.propertyList = u;
                        if (typeof d === "number") a.id = d;
                        if (h !== "") a.attrName = h;
                        if (c !== "") a.attrType = c;
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
                            var l = a.propertyList[3];
                            var d;
                            if (s.indexOf("Lcl ") === 0) s = s.replace("Lcl ", "Lcl_");
                            if (f.indexOf("Lcl ") === 0) f = f.replace("Lcl ", "Lcl_");
                            if (f === "Color" || f === "ColorRGB" || f === "Vector" || f === "Vector3D" || f.indexOf("Lcl_") === 0) {
                                d = [ a.propertyList[4], a.propertyList[5], a.propertyList[6] ];
                            } else {
                                d = a.propertyList[4];
                            }
                            r[s] = {
                                type: f,
                                type2: u,
                                flag: l,
                                value: d
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
                        return s.LoaderUtils.decodeText(r);
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
                    return e.byteLength >= t.length && t === l(e, 0, t.length);
                }
                function i(e) {
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
                function o(e) {
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
                function l(e, t, r) {
                    if (t === undefined) t = 0;
                    if (r === undefined) r = e.byteLength;
                    return s.LoaderUtils.decodeText(new Uint8Array(e, t, r));
                }
                function d(e, t) {
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
                function c(e, t, r) {
                    return e.slice(0, t).concat(r).concat(e.slice(t));
                }
                return s.FBXLoader;
            }();
        },
        64: function(e, t) {
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
            var n = r(24);
            var i = r(26);
            var o = r(25);
            var s = {
                FileLoader: n.FileLoader,
                LoaderUtils: i.LoaderUtils,
                Interpolant: o.Interpolant
            };
            e.exports = function() {
                function e(e) {
                    this.manager = e !== undefined ? e : s.DefaultLoadingManager;
                    this.loader = new s.FileLoader(this.manager);
                    this.parser = null;
                    this.meshBuilder = new r(this.manager);
                    this.animationBuilder = new o();
                }
                e.prototype = {
                    constructor: e,
                    crossOrigin: undefined,
                    setCrossOrigin: function e(t) {
                        this.crossOrigin = t;
                        return this;
                    },
                    load: function e(t, r, a, n) {
                        var i = this._getParser();
                        var o = this.meshBuilder.setCrossOrigin(this.crossOrigin);
                        var f = s.LoaderUtils.extractUrlBase(t);
                        var u = this._extractExtension(t).toLowerCase();
                        if (u !== "pmd" && u !== "pmx") {
                            if (n) n(new Error("THREE.MMDLoader: Unknown model file extension ." + u + "."));
                            return;
                        }
                        this[u === "pmd" ? "loadPMD" : "loadPMX"](t, function(e) {
                            r(o.build(e, f, a, n));
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
                        for (var l = 0, d = i.length; l < d; l++) {
                            this.loader.load(i[l], function(e) {
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
                    this.materialBuilder = new i(e);
                }
                r.prototype = {
                    constructor: r,
                    crossOrigin: undefined,
                    setCrossOrigin: function e(t) {
                        this.crossOrigin = t;
                        return this;
                    },
                    build: function e(t, r, a, n) {
                        var i = this.geometryBuilder.build(t);
                        var o = this.materialBuilder.setCrossOrigin(this.crossOrigin).setTexturePath(r).build(t, i, a, n);
                        var f = new s.SkinnedMesh(i, o);
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
                        var i = [];
                        var o = [];
                        var f = [];
                        var u = [];
                        var l = [];
                        var d = [];
                        var h = [];
                        var c = [];
                        var v = [];
                        var p = [];
                        var A = [];
                        var g = 0;
                        var m = {};
                        for (var y = 0; y < t.metadata.vertexCount; y++) {
                            var b = t.vertices[y];
                            for (var x = 0, C = b.position.length; x < C; x++) {
                                r.push(b.position[x]);
                            }
                            for (var x = 0, C = b.normal.length; x < C; x++) {
                                n.push(b.normal[x]);
                            }
                            for (var x = 0, C = b.uv.length; x < C; x++) {
                                a.push(b.uv[x]);
                            }
                            for (var x = 0; x < 4; x++) {
                                u.push(b.skinIndices.length - 1 >= x ? b.skinIndices[x] : 0);
                            }
                            for (var x = 0; x < 4; x++) {
                                l.push(b.skinWeights.length - 1 >= x ? b.skinWeights[x] : 0);
                            }
                        }
                        for (var y = 0; y < t.metadata.faceCount; y++) {
                            var w = t.faces[y];
                            for (var x = 0, C = w.indices.length; x < C; x++) {
                                i.push(w.indices[x]);
                            }
                        }
                        for (var y = 0; y < t.metadata.materialCount; y++) {
                            var B = t.materials[y];
                            o.push({
                                offset: g * 3,
                                count: B.faceCount * 3
                            });
                            g += B.faceCount;
                        }
                        for (var y = 0; y < t.metadata.rigidBodyCount; y++) {
                            var E = t.rigidBodies[y];
                            var I = m[E.boneIndex];
                            I = I === undefined ? E.type : Math.max(E.type, I);
                            m[E.boneIndex] = I;
                        }
                        for (var y = 0; y < t.metadata.boneCount; y++) {
                            var T = t.bones[y];
                            var L = {
                                parent: T.parentIndex,
                                name: T.name,
                                pos: T.position.slice(0, 3),
                                rotq: [ 0, 0, 0, 1 ],
                                scl: [ 1, 1, 1 ],
                                rigidBodyType: m[y] !== undefined ? m[y] : -1
                            };
                            if (L.parent !== -1) {
                                L.pos[0] -= t.bones[L.parent].position[0];
                                L.pos[1] -= t.bones[L.parent].position[1];
                                L.pos[2] -= t.bones[L.parent].position[2];
                            }
                            f.push(L);
                        }
                        if (t.metadata.format === "pmd") {
                            for (var y = 0; y < t.metadata.ikCount; y++) {
                                var U = t.iks[y];
                                var R = {
                                    target: U.target,
                                    effector: U.effector,
                                    iteration: U.iteration,
                                    maxAngle: U.maxAngle * 4,
                                    links: []
                                };
                                for (var x = 0, C = U.links.length; x < C; x++) {
                                    var M = {};
                                    M.index = U.links[x].index;
                                    M.enabled = true;
                                    if (t.bones[M.index].name.indexOf("ひざ") >= 0) {
                                        M.limitation = new s.Vector3(1, 0, 0);
                                    }
                                    R.links.push(M);
                                }
                                c.push(R);
                            }
                        } else {
                            for (var y = 0; y < t.metadata.boneCount; y++) {
                                var U = t.bones[y].ik;
                                if (U === undefined) continue;
                                var R = {
                                    target: y,
                                    effector: U.effector,
                                    iteration: U.iteration,
                                    maxAngle: U.maxAngle,
                                    links: []
                                };
                                for (var x = 0, C = U.links.length; x < C; x++) {
                                    var M = {};
                                    M.index = U.links[x].index;
                                    M.enabled = true;
                                    if (U.links[x].angleLimitation === 1) {
                                        var k = U.links[x].lowerLimitationAngle;
                                        var O = U.links[x].upperLimitationAngle;
                                        var F = -O[0];
                                        var P = -O[1];
                                        O[0] = -k[0];
                                        O[1] = -k[1];
                                        k[0] = F;
                                        k[1] = P;
                                        M.rotationMin = new s.Vector3().fromArray(k);
                                        M.rotationMax = new s.Vector3().fromArray(O);
                                    }
                                    R.links.push(M);
                                }
                                c.push(R);
                            }
                        }
                        if (t.metadata.format === "pmx") {
                            for (var y = 0; y < t.metadata.boneCount; y++) {
                                var T = t.bones[y];
                                var S = T.grant;
                                if (S === undefined) continue;
                                var R = {
                                    index: y,
                                    parentIndex: S.parentIndex,
                                    ratio: S.ratio,
                                    isLocal: S.isLocal,
                                    affectRotation: S.affectRotation,
                                    affectPosition: S.affectPosition,
                                    transformationClass: T.transformationClass
                                };
                                v.push(R);
                            }
                            v.sort(function(e, t) {
                                return e.transformationClass - t.transformationClass;
                            });
                        }
                        function Q(e, r, a) {
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
                            var V = t.morphs[y];
                            var _ = {
                                name: V.name
                            };
                            var D = new s.Float32BufferAttribute(t.metadata.vertexCount * 3, 3);
                            D.name = V.name;
                            for (var x = 0; x < t.metadata.vertexCount * 3; x++) {
                                D.array[x] = r[x];
                            }
                            if (t.metadata.format === "pmd") {
                                if (y !== 0) {
                                    Q(D, V, 1);
                                }
                            } else {
                                if (V.type === 0) {
                                    for (var x = 0; x < V.elementCount; x++) {
                                        var N = t.morphs[V.elements[x].index];
                                        var z = V.elements[x].ratio;
                                        if (N.type === 1) {
                                            Q(D, N, z);
                                        } else {}
                                    }
                                } else if (V.type === 1) {
                                    Q(D, V, 1);
                                } else if (V.type === 2) {} else if (V.type === 3) {} else if (V.type === 4) {} else if (V.type === 5) {} else if (V.type === 6) {} else if (V.type === 7) {} else if (V.type === 8) {}
                            }
                            d.push(_);
                            h.push(D);
                        }
                        for (var y = 0; y < t.metadata.rigidBodyCount; y++) {
                            var j = t.rigidBodies[y];
                            var _ = {};
                            for (var Y in j) {
                                _[Y] = j[Y];
                            }
                            if (t.metadata.format === "pmx") {
                                if (_.boneIndex !== -1) {
                                    var L = t.bones[_.boneIndex];
                                    _.position[0] -= L.position[0];
                                    _.position[1] -= L.position[1];
                                    _.position[2] -= L.position[2];
                                }
                            }
                            p.push(_);
                        }
                        for (var y = 0; y < t.metadata.constraintCount; y++) {
                            var H = t.constraints[y];
                            var _ = {};
                            for (var Y in H) {
                                _[Y] = H[Y];
                            }
                            var X = p[_.rigidBodyIndex1];
                            var K = p[_.rigidBodyIndex2];
                            if (X.type !== 0 && K.type === 2) {
                                if (X.boneIndex !== -1 && K.boneIndex !== -1 && t.bones[K.boneIndex].parentIndex === X.boneIndex) {
                                    K.type = 1;
                                }
                            }
                            A.push(_);
                        }
                        var J = new s.BufferGeometry();
                        J.addAttribute("position", new s.Float32BufferAttribute(r, 3));
                        J.addAttribute("normal", new s.Float32BufferAttribute(n, 3));
                        J.addAttribute("uv", new s.Float32BufferAttribute(a, 2));
                        J.addAttribute("skinIndex", new s.Uint16BufferAttribute(u, 4));
                        J.addAttribute("skinWeight", new s.Float32BufferAttribute(l, 4));
                        J.setIndex(i);
                        for (var y = 0, W = o.length; y < W; y++) {
                            J.addGroup(o[y].offset, o[y].count, y);
                        }
                        J.bones = f;
                        J.morphTargets = d;
                        J.morphAttributes.position = h;
                        J.userData.MMD = {
                            bones: f,
                            iks: c,
                            grants: v,
                            rigidBodies: p,
                            constraints: A,
                            format: t.metadata.format
                        };
                        J.computeBoundingSphere();
                        return J;
                    }
                };
                function i(e) {
                    this.manager = e;
                    this.tgaLoader = null;
                }
                i.prototype = {
                    constructor: i,
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
                        var i = [];
                        var o = {};
                        this.textureLoader.setCrossOrigin(this.crossOrigin);
                        for (var f = 0; f < t.metadata.materialCount; f++) {
                            var u = t.materials[f];
                            var l = {
                                userData: {}
                            };
                            if (u.name !== undefined) l.name = u.name;
                            l.color = new s.Color().fromArray(u.diffuse);
                            l.opacity = u.diffuse[3];
                            l.specular = new s.Color().fromArray(u.specular);
                            l.emissive = new s.Color().fromArray(u.ambient);
                            l.shininess = Math.max(u.shininess, 1e-4);
                            l.transparent = l.opacity !== 1;
                            l.skinning = r.bones.length > 0 ? true : false;
                            l.morphTargets = r.morphTargets.length > 0 ? true : false;
                            l.lights = true;
                            l.fog = true;
                            l.blending = s.CustomBlending;
                            l.blendSrc = s.SrcAlphaFactor;
                            l.blendDst = s.OneMinusSrcAlphaFactor;
                            l.blendSrcAlpha = s.SrcAlphaFactor;
                            l.blendDstAlpha = s.DstAlphaFactor;
                            if (t.metadata.format === "pmx" && (u.flag & 1) === 1) {
                                l.side = s.DoubleSide;
                            } else {
                                l.side = l.opacity === 1 ? s.FrontSide : s.DoubleSide;
                            }
                            if (t.metadata.format === "pmd") {
                                if (u.fileName) {
                                    var d = u.fileName;
                                    var h = d.split("*");
                                    l.map = this._loadTexture(h[0], o);
                                    if (h.length > 1) {
                                        var c = h[1].slice(-4).toLowerCase();
                                        l.envMap = this._loadTexture(h[1], o, {
                                            sphericalReflectionMapping: true
                                        });
                                        l.combine = c === ".sph" ? s.MultiplyOperation : s.AddOperation;
                                    }
                                }
                                var v = u.toonIndex === -1 ? "toon00.bmp" : t.toonTextures[u.toonIndex].fileName;
                                l.gradientMap = this._loadTexture(v, o, {
                                    isToonTexture: true,
                                    isDefaultToonTexture: this._isDefaultToonTexture(v)
                                });
                                l.userData.outlineParameters = {
                                    thickness: u.edgeFlag === 1 ? .003 : 0,
                                    color: [ 0, 0, 0 ],
                                    alpha: 1,
                                    visible: u.edgeFlag === 1
                                };
                            } else {
                                if (u.textureIndex !== -1) {
                                    l.map = this._loadTexture(t.textures[u.textureIndex], o);
                                }
                                if (u.envTextureIndex !== -1 && (u.envFlag === 1 || u.envFlag == 2)) {
                                    l.envMap = this._loadTexture(t.textures[u.envTextureIndex], o, {
                                        sphericalReflectionMapping: true
                                    });
                                    l.combine = u.envFlag === 1 ? s.MultiplyOperation : s.AddOperation;
                                }
                                var v, p;
                                if (u.toonIndex === -1 || u.toonFlag !== 0) {
                                    v = "toon" + ("0" + (u.toonIndex + 1)).slice(-2) + ".bmp";
                                    p = true;
                                } else {
                                    v = t.textures[u.toonIndex];
                                    p = false;
                                }
                                l.gradientMap = this._loadTexture(v, o, {
                                    isToonTexture: true,
                                    isDefaultToonTexture: p
                                });
                                l.userData.outlineParameters = {
                                    thickness: u.edgeSize / 300,
                                    color: u.edgeColor.slice(0, 3),
                                    alpha: u.edgeColor[3],
                                    visible: (u.flag & 16) !== 0 && u.edgeSize > 0
                                };
                            }
                            if (l.map !== undefined) {
                                if (!l.transparent) {
                                    this._checkImageTransparency(l.map, r, f);
                                }
                                l.emissive.multiplyScalar(.2);
                            }
                            i.push(new s.MeshToonMaterial(l));
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
                                    for (var b = 0, x = y.length; b < x; b++) {
                                        var C = t.morphs[y[b].index];
                                        if (C.type !== 8) continue;
                                        A(C.elements, i);
                                    }
                                } else if (m.type === 8) {
                                    A(y, i);
                                }
                            }
                        }
                        return i;
                    },
                    _getTGALoader: function e() {
                        if (this.tgaLoader === null) {
                            if (s.TGALoader === undefined) {
                                throw new Error("THREE.MMDLoader: Import THREE.TGALoader");
                            }
                            this.tgaLoader = new s.TGALoader(this.manager);
                        }
                        return this.tgaLoader;
                    },
                    _isDefaultToonTexture: function e(t) {
                        if (t.length !== 10) return false;
                        return /toon(10|0[0-9])\.bmp/.test(t);
                    },
                    _loadTexture: function e(r, a, n, i, o) {
                        n = n || {};
                        var f = this;
                        var u;
                        if (n.isDefaultToonTexture === true) {
                            var l;
                            try {
                                l = parseInt(r.match("toon([0-9]{2}).bmp$")[1]);
                            } catch (e) {
                                console.warn("THREE.MMDLoader: " + r + " seems like a " + "not right default texture path. Using toon00.bmp instead.");
                                l = 0;
                            }
                            u = t[l];
                        } else {
                            u = this.texturePath + r;
                        }
                        if (a[u] !== undefined) return a[u];
                        var d = s.Loader.Handlers.get(u);
                        if (d === null) {
                            d = r.slice(-4).toLowerCase() === ".tga" ? this._getTGALoader() : this.textureLoader;
                        }
                        var h = d.load(u, function(e) {
                            if (n.isToonTexture === true) {
                                e.image = f._getRotatedImage(e.image);
                            }
                            e.flipY = false;
                            e.wrapS = s.RepeatWrapping;
                            e.wrapT = s.RepeatWrapping;
                            for (var t = 0; t < h.readyCallbacks.length; t++) {
                                h.readyCallbacks[t](h);
                            }
                            delete h.readyCallbacks;
                        }, i, o);
                        if (n.sphericalReflectionMapping === true) {
                            h.mapping = s.SphericalReflectionMapping;
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
                                    for (var l = 0; l < 3; l++) {
                                        var d = r[f * 3 + l];
                                        var h = {
                                            x: t[d * 2 + 0],
                                            y: t[d * 2 + 1]
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
                function o() {}
                o.prototype = {
                    constructor: o,
                    build: function e(t, r) {
                        var a = this.buildSkeletalAnimation(t, r).tracks;
                        var n = this.buildMorphAnimation(t, r).tracks;
                        for (var i = 0, o = n.length; i < o; i++) {
                            a.push(n[i]);
                        }
                        return new s.AnimationClip("", -1, a);
                    },
                    buildSkeletalAnimation: function e(t, r) {
                        function a(e, t, r) {
                            e.push(t[r + 0] / 127);
                            e.push(t[r + 8] / 127);
                            e.push(t[r + 4] / 127);
                            e.push(t[r + 12] / 127);
                        }
                        var n = [];
                        var i = {};
                        var o = r.skeleton.bones;
                        var f = {};
                        for (var u = 0, l = o.length; u < l; u++) {
                            f[o[u].name] = true;
                        }
                        for (var u = 0; u < t.metadata.motionCount; u++) {
                            var d = t.motions[u];
                            var h = d.boneName;
                            if (f[h] === undefined) continue;
                            i[h] = i[h] || [];
                            i[h].push(d);
                        }
                        for (var c in i) {
                            var v = i[c];
                            v.sort(function(e, t) {
                                return e.frameNum - t.frameNum;
                            });
                            var p = [];
                            var A = [];
                            var g = [];
                            var m = [];
                            var y = [];
                            var b = r.skeleton.getBoneByName(c).position.toArray();
                            for (var u = 0, l = v.length; u < l; u++) {
                                var x = v[u].frameNum / 30;
                                var C = v[u].position;
                                var w = v[u].rotation;
                                var B = v[u].interpolation;
                                p.push(x);
                                for (var E = 0; E < 3; E++) {
                                    A.push(b[E] + C[E]);
                                }
                                for (var E = 0; E < 4; E++) {
                                    g.push(w[E]);
                                }
                                for (var E = 0; E < 3; E++) {
                                    a(m, B, E);
                                }
                                a(y, B, 3);
                            }
                            var I = ".bones[" + c + "]";
                            n.push(this._createTrack(I + ".position", s.VectorKeyframeTrack, p, A, m));
                            n.push(this._createTrack(I + ".quaternion", s.QuaternionKeyframeTrack, p, g, y));
                        }
                        return new s.AnimationClip("", -1, n);
                    },
                    buildMorphAnimation: function e(t, r) {
                        var a = [];
                        var n = {};
                        var i = r.morphTargetDictionary;
                        for (var o = 0; o < t.metadata.morphCount; o++) {
                            var f = t.morphs[o];
                            var u = f.morphName;
                            if (i[u] === undefined) continue;
                            n[u] = n[u] || [];
                            n[u].push(f);
                        }
                        for (var l in n) {
                            var d = n[l];
                            d.sort(function(e, t) {
                                return e.frameNum - t.frameNum;
                            });
                            var h = [];
                            var c = [];
                            for (var o = 0, v = d.length; o < v; o++) {
                                h.push(d[o].frameNum / 30);
                                c.push(d[o].weight);
                            }
                            a.push(new s.NumberKeyframeTrack(".morphTargetInfluences[" + i[l] + "]", h, c));
                        }
                        return new s.AnimationClip("", -1, a);
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
                        var i = [];
                        var o = t.cameras === undefined ? [] : t.cameras.slice();
                        o.sort(function(e, t) {
                            return e.frameNum - t.frameNum;
                        });
                        var f = [];
                        var u = [];
                        var l = [];
                        var d = [];
                        var h = [];
                        var c = [];
                        var v = [];
                        var p = [];
                        var A = [];
                        var g = new s.Quaternion();
                        var m = new s.Euler();
                        var y = new s.Vector3();
                        var b = new s.Vector3();
                        for (var x = 0, C = o.length; x < C; x++) {
                            var w = o[x];
                            var B = w.frameNum / 30;
                            var E = w.position;
                            var I = w.rotation;
                            var T = w.distance;
                            var L = w.fov;
                            var U = w.interpolation;
                            f.push(B);
                            y.set(0, 0, -T);
                            b.set(E[0], E[1], E[2]);
                            m.set(-I[0], -I[1], -I[2]);
                            g.setFromEuler(m);
                            y.add(b);
                            y.applyQuaternion(g);
                            r(u, b);
                            a(l, g);
                            r(d, y);
                            h.push(L);
                            for (var R = 0; R < 3; R++) {
                                n(c, U, R);
                            }
                            n(v, U, 3);
                            for (var R = 0; R < 3; R++) {
                                n(p, U, 4);
                            }
                            n(A, U, 5);
                        }
                        var i = [];
                        i.push(this._createTrack("target.position", s.VectorKeyframeTrack, f, u, c));
                        i.push(this._createTrack(".quaternion", s.QuaternionKeyframeTrack, f, l, v));
                        i.push(this._createTrack(".position", s.VectorKeyframeTrack, f, d, p));
                        i.push(this._createTrack(".fov", s.NumberKeyframeTrack, f, h, A));
                        return new s.AnimationClip("", -1, i);
                    },
                    _createTrack: function e(t, r, a, n, i) {
                        if (a.length > 2) {
                            a = a.slice();
                            n = n.slice();
                            i = i.slice();
                            var o = n.length / a.length;
                            var s = i.length / a.length;
                            var u = 1;
                            for (var l = 2, d = a.length; l < d; l++) {
                                for (var h = 0; h < o; h++) {
                                    if (n[u * o + h] !== n[(u - 1) * o + h] || n[u * o + h] !== n[l * o + h]) {
                                        u++;
                                        break;
                                    }
                                }
                                if (l > u) {
                                    a[u] = a[l];
                                    for (var h = 0; h < o; h++) {
                                        n[u * o + h] = n[l * o + h];
                                    }
                                    for (var h = 0; h < s; h++) {
                                        i[u * s + h] = i[l * s + h];
                                    }
                                }
                            }
                            a.length = u + 1;
                            n.length = (u + 1) * o;
                            i.length = (u + 1) * s;
                        }
                        var c = new r(t, a, n);
                        c.createInterpolant = function e(t) {
                            return new f(this.times, this.values, this.getValueSize(), t, new Float32Array(i));
                        };
                        return c;
                    }
                };
                function f(e, t, r, a, n) {
                    s.Interpolant.call(this, e, t, r, a);
                    this.interpolationParams = n;
                }
                f.prototype = a(Object.create(s.Interpolant.prototype), {
                    constructor: f,
                    interpolate_: function e(t, r, a, n) {
                        var i = this.resultBuffer;
                        var o = this.sampleValues;
                        var f = this.valueSize;
                        var u = this.interpolationParams;
                        var l = t * f;
                        var d = l - f;
                        var h = n - r < 1 / 30 * 1.5 ? 0 : (a - r) / (n - r);
                        if (f === 4) {
                            var c = u[t * 4 + 0];
                            var v = u[t * 4 + 1];
                            var p = u[t * 4 + 2];
                            var A = u[t * 4 + 3];
                            var g = this._calculate(c, v, p, A, h);
                            s.Quaternion.slerpFlat(i, 0, o, d, o, l, g);
                        } else if (f === 3) {
                            for (var m = 0; m !== f; ++m) {
                                var c = u[t * 12 + m * 4 + 0];
                                var v = u[t * 12 + m * 4 + 1];
                                var p = u[t * 12 + m * 4 + 2];
                                var A = u[t * 12 + m * 4 + 3];
                                var g = this._calculate(c, v, p, A, h);
                                i[m] = o[d + m] * (1 - g) + o[l + m] * g;
                            }
                        } else {
                            var c = u[t * 4 + 0];
                            var v = u[t * 4 + 1];
                            var p = u[t * 4 + 2];
                            var A = u[t * 4 + 3];
                            var g = this._calculate(c, v, p, A, h);
                            i[0] = o[d] * (1 - g) + o[l] * g;
                        }
                        return i;
                    },
                    _calculate: function e(t, r, a, n, i) {
                        var o = .5;
                        var s = o;
                        var f = 1 - s;
                        var u = 15;
                        var l = 1e-5;
                        var d = Math;
                        var h, c, v;
                        for (var p = 0; p < u; p++) {
                            h = 3 * f * f * s;
                            c = 3 * f * s * s;
                            v = s * s * s;
                            var A = h * t + c * r + v - i;
                            if (d.abs(A) < l) break;
                            o /= 2;
                            s += A < 0 ? o : -o;
                            f = 1 - s;
                        }
                        return h * a + c * n + v;
                    }
                });
                return e;
            }();
        },
        89: function(e, t, r) {
            "use strict";
            var a = r(65);
            var n = s(a);
            var i = r(63);
            var o = s(i);
            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var f = typeof window !== "undefined";
            var u = {
                MMDLoader: n.default,
                FBXLoader: o.default
            };
            if (f && window.Easycanvas) {
                Easycanvas.threeLoaders = u;
            } else {
                e.exports = u;
            }
        }
    });
});

