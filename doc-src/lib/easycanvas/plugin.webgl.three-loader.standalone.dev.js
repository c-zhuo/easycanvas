(function e(r, t) {
    if (typeof exports === "object" && typeof module === "object") module.exports = t(); else if (typeof define === "function" && define.amd) define([], t); else {
        var a = t();
        for (var n in a) (typeof exports === "object" ? exports : r)[n] = a[n];
    }
})(this, function() {
    return function(e) {
        var r = {};
        function t(a) {
            if (r[a]) return r[a].exports;
            var n = r[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            e[a].call(n.exports, n, n.exports, t);
            n.loaded = true;
            return n.exports;
        }
        t.m = e;
        t.c = r;
        t.p = "";
        return t(0);
    }({
        0: function(e, r, t) {
            e.exports = t(88);
        },
        23: function(e, r, t) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: true
            });
            r.FileLoader = undefined;
            var a = Object.assign || function(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = arguments[r];
                    for (var a in t) {
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            e[a] = t[a];
                        }
                    }
                }
                return e;
            };
            var n = t(60);
            var i = t(63);
            var o = {};
            function s(e) {
                this.manager = e !== undefined ? e : i.DefaultLoadingManager;
            }
            a(s.prototype, {
                load: function e(r, t, a, i) {
                    if (r === undefined) r = "";
                    if (this.path !== undefined) r = this.path + r;
                    r = this.manager.resolveURL(r);
                    var s = this;
                    var u = n.Cache.get(r);
                    if (u !== undefined) {
                        s.manager.itemStart(r);
                        setTimeout(function() {
                            if (t) t(u);
                            s.manager.itemEnd(r);
                        }, 0);
                        return u;
                    }
                    if (o[r] !== undefined) {
                        o[r].push({
                            onLoad: t,
                            onProgress: a,
                            onError: i
                        });
                        return;
                    }
                    var f = /^data:(.*?)(;base64)?,(.*)$/;
                    var d = r.match(f);
                    if (d) {
                        var l = d[1];
                        var A = !!d[2];
                        var h = d[3];
                        h = window.decodeURIComponent(h);
                        if (A) h = window.atob(h);
                        try {
                            var p;
                            var v = (this.responseType || "").toLowerCase();
                            switch (v) {
                              case "arraybuffer":
                              case "blob":
                                var c = new Uint8Array(h.length);
                                for (var g = 0; g < h.length; g++) {
                                    c[g] = h.charCodeAt(g);
                                }
                                if (v === "blob") {
                                    p = new Blob([ c.buffer ], {
                                        type: l
                                    });
                                } else {
                                    p = c.buffer;
                                }
                                break;

                              case "document":
                                var m = new DOMParser();
                                p = m.parseFromString(h, l);
                                break;

                              case "json":
                                p = JSON.parse(h);
                                break;

                              default:
                                p = h;
                                break;
                            }
                            window.setTimeout(function() {
                                if (t) t(p);
                                s.manager.itemEnd(r);
                            }, 0);
                        } catch (e) {
                            window.setTimeout(function() {
                                if (i) i(e);
                                s.manager.itemEnd(r);
                                s.manager.itemError(r);
                            }, 0);
                        }
                    } else {
                        o[r] = [];
                        o[r].push({
                            onLoad: t,
                            onProgress: a,
                            onError: i
                        });
                        var y = new XMLHttpRequest();
                        y.open("GET", r, true);
                        y.addEventListener("load", function(e) {
                            var t = this.response;
                            n.Cache.add(r, t);
                            var a = o[r];
                            delete o[r];
                            if (this.status === 200 || this.status === 0) {
                                if (this.status === 0) console.warn("THREE.FileLoader: HTTP Status 0 received.");
                                for (var i = 0, u = a.length; i < u; i++) {
                                    var f = a[i];
                                    if (f.onLoad) f.onLoad(t);
                                }
                                s.manager.itemEnd(r);
                            } else {
                                for (var i = 0, u = a.length; i < u; i++) {
                                    var f = a[i];
                                    if (f.onError) f.onError(e);
                                }
                                s.manager.itemEnd(r);
                                s.manager.itemError(r);
                            }
                        }, false);
                        y.addEventListener("progress", function(e) {
                            var t = o[r];
                            for (var a = 0, n = t.length; a < n; a++) {
                                var i = t[a];
                                if (i.onProgress) i.onProgress(e);
                            }
                        }, false);
                        y.addEventListener("error", function(e) {
                            var t = o[r];
                            delete o[r];
                            for (var a = 0, n = t.length; a < n; a++) {
                                var i = t[a];
                                if (i.onError) i.onError(e);
                            }
                            s.manager.itemEnd(r);
                            s.manager.itemError(r);
                        }, false);
                        if (this.responseType !== undefined) y.responseType = this.responseType;
                        if (this.withCredentials !== undefined) y.withCredentials = this.withCredentials;
                        if (y.overrideMimeType) y.overrideMimeType(this.mimeType !== undefined ? this.mimeType : "text/plain");
                        for (var b in this.requestHeader) {
                            y.setRequestHeader(b, this.requestHeader[b]);
                        }
                        y.send(null);
                    }
                    s.manager.itemStart(r);
                    return y;
                },
                setPath: function e(r) {
                    this.path = r;
                    return this;
                },
                setResponseType: function e(r) {
                    this.responseType = r;
                    return this;
                },
                setWithCredentials: function e(r) {
                    this.withCredentials = r;
                    return this;
                },
                setMimeType: function e(r) {
                    this.mimeType = r;
                    return this;
                },
                setRequestHeader: function e(r) {
                    this.requestHeader = r;
                    return this;
                }
            });
            r.FileLoader = s;
        },
        60: function(e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: true
            });
            var t = {
                enabled: false,
                files: {},
                add: function e(r, t) {
                    if (this.enabled === false) return;
                    this.files[r] = t;
                },
                get: function e(r) {
                    if (this.enabled === false) return;
                    return this.files[r];
                },
                remove: function e(r) {
                    delete this.files[r];
                },
                clear: function e() {
                    this.files = {};
                }
            };
            r.Cache = t;
        },
        61: function(e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: true
            });
            var t = Object.assign || function(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = arguments[r];
                    for (var a in t) {
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            e[a] = t[a];
                        }
                    }
                }
                return e;
            };
            function a(e, r, t, a) {
                this.parameterPositions = e;
                this._cachedIndex = 0;
                this.resultBuffer = a !== undefined ? a : new r.constructor(t);
                this.sampleValues = r;
                this.valueSize = t;
            }
            t(a.prototype, {
                evaluate: function e(r) {
                    var t = this.parameterPositions, a = this._cachedIndex, n = t[a], i = t[a - 1];
                    e: {
                        r: {
                            var o;
                            t: {
                                a: if (!(r < n)) {
                                    for (var s = a + 2; ;) {
                                        if (n === undefined) {
                                            if (r < i) break a;
                                            a = t.length;
                                            this._cachedIndex = a;
                                            return this.afterEnd_(a - 1, r, i);
                                        }
                                        if (a === s) break;
                                        i = n;
                                        n = t[++a];
                                        if (r < n) {
                                            break r;
                                        }
                                    }
                                    o = t.length;
                                    break t;
                                }
                                if (!(r >= i)) {
                                    var u = t[1];
                                    if (r < u) {
                                        a = 2;
                                        i = u;
                                    }
                                    for (var s = a - 2; ;) {
                                        if (i === undefined) {
                                            this._cachedIndex = 0;
                                            return this.beforeStart_(0, r, n);
                                        }
                                        if (a === s) break;
                                        n = i;
                                        i = t[--a - 1];
                                        if (r >= i) {
                                            break r;
                                        }
                                    }
                                    o = a;
                                    a = 0;
                                    break t;
                                }
                                break e;
                            }
                            while (a < o) {
                                var f = a + o >>> 1;
                                if (r < t[f]) {
                                    o = f;
                                } else {
                                    a = f + 1;
                                }
                            }
                            n = t[a];
                            i = t[a - 1];
                            if (i === undefined) {
                                this._cachedIndex = 0;
                                return this.beforeStart_(0, r, n);
                            }
                            if (n === undefined) {
                                a = t.length;
                                this._cachedIndex = a;
                                return this.afterEnd_(a - 1, i, r);
                            }
                        }
                        this._cachedIndex = a;
                        this.intervalChanged_(a, i, n);
                    }
                    return this.interpolate_(a, i, r, n);
                },
                settings: null,
                DefaultSettings_: {},
                getSettings_: function e() {
                    return this.settings || this.DefaultSettings_;
                },
                copySampleValue_: function e(r) {
                    var t = this.resultBuffer, a = this.sampleValues, n = this.valueSize, i = r * n;
                    for (var o = 0; o !== n; ++o) {
                        t[o] = a[i + o];
                    }
                    return t;
                },
                interpolate_: function e() {
                    throw new Error("call to abstract method");
                },
                intervalChanged_: function e() {}
            });
            t(a.prototype, {
                beforeStart_: a.prototype.copySampleValue_,
                afterEnd_: a.prototype.copySampleValue_
            });
            r.Interpolant = a;
        },
        62: function(e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: true
            });
            var t = {
                decodeText: function e(r) {
                    if (typeof TextDecoder !== "undefined") {
                        return new TextDecoder().decode(r);
                    }
                    var t = "";
                    for (var a = 0, n = r.length; a < n; a++) {
                        t += String.fromCharCode(r[a]);
                    }
                    return decodeURIComponent(escape(t));
                },
                extractUrlBase: function e(r) {
                    var t = r.lastIndexOf("/");
                    if (t === -1) return "./";
                    return r.substr(0, t + 1);
                }
            };
            r.LoaderUtils = t;
        },
        63: function(e, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: true
            });
            function t(e, r, t) {
                var a = this;
                var n = false;
                var i = 0;
                var o = 0;
                var s = undefined;
                this.onStart = undefined;
                this.onLoad = e;
                this.onProgress = r;
                this.onError = t;
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
            var a = new t();
            r.DefaultLoadingManager = a;
            r.LoadingManager = t;
        },
        64: function(e, r, t) {
            "use strict";
            var a = Object.assign || function(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = arguments[r];
                    for (var a in t) {
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            e[a] = t[a];
                        }
                    }
                }
                return e;
            };
            var n = t(23);
            var i = t(62);
            var o = t(61);
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
                    this.meshBuilder = new t(this.manager);
                    this.animationBuilder = new o();
                }
                e.prototype = {
                    constructor: e,
                    crossOrigin: undefined,
                    setCrossOrigin: function e(r) {
                        this.crossOrigin = r;
                        return this;
                    },
                    load: function e(r, t, a, n) {
                        var i = this._getParser();
                        var o = this.meshBuilder.setCrossOrigin(this.crossOrigin);
                        var u = s.LoaderUtils.extractUrlBase(r);
                        var f = this._extractExtension(r).toLowerCase();
                        if (f !== "pmd" && f !== "pmx") {
                            if (n) n(new Error("THREE.MMDLoader: Unknown model file extension ." + f + "."));
                            return;
                        }
                        this[f === "pmd" ? "loadPMD" : "loadPMX"](r, function(e) {
                            t(o.build(e, u, a, n));
                        }, a, n);
                    },
                    loadAnimation: function e(r, t, a, n, i) {
                        var o = this.animationBuilder;
                        this.loadVMD(r, function(e) {
                            a(t.isCamera ? o.buildCameraAnimation(e) : o.build(e, t));
                        }, n, i);
                    },
                    loadWithAnimation: function e(r, t, a, n, i) {
                        var o = this;
                        this.load(r, function(e) {
                            o.loadAnimation(t, e, function(r) {
                                a({
                                    mesh: e,
                                    animation: r
                                });
                            }, n, i);
                        }, n, i);
                    },
                    loadPMD: function e(r, t, a, n) {
                        var i = this._getParser();
                        this.loader.setMimeType(undefined).setResponseType("arraybuffer").load(r, function(e) {
                            t(i.parsePmd(e, true));
                        }, a, n);
                    },
                    loadPMX: function e(r, t, a, n) {
                        var i = this._getParser();
                        this.loader.setMimeType(undefined).setResponseType("arraybuffer").load(r, function(e) {
                            t(i.parsePmx(e, true));
                        }, a, n);
                    },
                    loadVMD: function e(r, t, a, n) {
                        var i = Array.isArray(r) ? r : [ r ];
                        var o = [];
                        var s = i.length;
                        var u = this;
                        var f = this._getParser();
                        this.loader.setMimeType(undefined).setResponseType("arraybuffer");
                        for (var d = 0, l = i.length; d < l; d++) {
                            this.loader.load(i[d], function(e) {
                                o.push(f.parseVmd(e, true));
                                if (o.length === s) t(f.mergeVmds(o));
                            }, a, n);
                        }
                    },
                    loadVPD: function e(r, t, a, n, i, o) {
                        o = o || {};
                        var s = this._getParser();
                        this.loader.setMimeType(t ? undefined : "text/plain; charset=shift_jis").setResponseType("text").load(r, function(e) {
                            a(s.parseVpd(e, true));
                        }, n, i);
                    },
                    _extractExtension: function e(r) {
                        var t = r.lastIndexOf(".");
                        return t < 0 ? "" : r.slice(t + 1);
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
                var r = [ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/bWiiMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh8aBHZBl14e8wAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOUlEQVRYR+3WMREAMAwDsYY/yoDI7MLwIiP40+RJklfcCCBAgAABAgTqArfb/QMCCBAgQIAAgbbAB3z/e0F3js2cAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/B5ilMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh81dWyx0gFwKAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYR+3WoREAMAwDsWb/UQtCy9wxTOQJ/oQ8SXKKGwEECBAgQIBAXeDt7f4BAQQIECBAgEBb4AOz8Hzx7WLY4wAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPUlEQVRYR+1XwW7CMAy1+f9fZOMysSEOEweEOPRNdm3HbdOyIhAcklPrOs/PLy9RygBALxzcCDQFmgJNgaZAU6Ap0BR4PwX8gsRMVLssMRH5HcpzJEaWL7EVg9F1IHRlyqQohgVr4FGUlUcMJSjcUlDw0zvjeun70cLWmneoyf7NgBTQSniBTQQSuJAZsOnnaczjIMb5hCiuHKxokCrJfVnrctyZL0PkJAJe1HMil4nxeyi3Ypfn1kX51jpPvo/JeCNC4PhVdHdJw2XjBR8brF8PEIhNVn12AgP7uHsTBguBn53MUZCqv7Lp07Pn5k1Ro+uWmUNn7D+M57rtk7aG0Vo73xyF/fbFf0bPJjDXngnGocDTdFhygZjwUQrMNrDcmZlQT50VJ/g/UwNyHpu778+yW+/ksOz/BFo54P4AsUXMfRq7XWsAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACMElEQVRYR+2Xv4pTQRTGf2dubhLdICiii2KnYKHVolhauKWPoGAnNr6BD6CvIVaihYuI2i1ia0BY0MZGRHQXjZj/mSPnnskfNWiWZUlzJ5k7M2cm833nO5Mziej2DWWJRUoCpQKlAntSQCqgw39/iUWAGmh37jrRnVsKlgpiqmkoGVABA7E57fvY+pJDdgKqF6HzFCSADkDq+F6AHABtQ+UMVE5D7zXod7fFNhTEckTbj5XQgHzNN+5tQvc5NG7C6BNkp6D3EmpXHDR+dQAjFLchW3VS9rlw3JBh+B7ys5Cf9z0GW1C/7P32AyBAOAz1q4jGliIH3YPuBnSfQX4OGreTIgEYQb/pBDtPnEQ4CivXYPAWBk13oHrB54yA9QuSn2H4AcKRpEILDt0BUzj+RLR1V5EqjD66NPRBVpLcQwjHoHYJOhsQv6U4mnzmrIXJCFr4LDwm/xBUoboG9XX4cc9VKdYoSA2yk5NQLJaKDUjTBoveG3Z2TElTxwjNK4M3LEZgUdDdruvcXzKBpStgp2NPiWi3ks9ZXxIoFVi+AvHLdc9TqtjL3/aYjpPlrzOcEnK62Szhimdd7xX232zFDTgtxezOu3WNMRLjiKgjtOhHVMd1loynVHvOgjuIIJMaELEqhJAV/RCSLbWTcfPFakFgFlALTRRvx+ok6Hlp/Q+v3fmx90bMyUzaEAhmM3KvHlXTL5DxnbGf/1M8RNNACLL5MNtPxP/mypJAqcDSFfgFhpYqWUzhTEAAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=" ];
                function t(e) {
                    this.geometryBuilder = new n();
                    this.materialBuilder = new i(e);
                }
                t.prototype = {
                    constructor: t,
                    crossOrigin: undefined,
                    setCrossOrigin: function e(r) {
                        this.crossOrigin = r;
                        return this;
                    },
                    build: function e(r, t, a, n) {
                        var i = this.geometryBuilder.build(r);
                        var o = this.materialBuilder.setCrossOrigin(this.crossOrigin).setTexturePath(t).build(r, i, a, n);
                        var u = new s.SkinnedMesh(i, o);
                        return u;
                    }
                };
                function n() {}
                n.prototype = {
                    constructor: n,
                    build: function e(r) {
                        var t = [];
                        var a = [];
                        var n = [];
                        var i = [];
                        var o = [];
                        var u = [];
                        var f = [];
                        var d = [];
                        var l = [];
                        var A = [];
                        var h = [];
                        var p = [];
                        var v = [];
                        var c = [];
                        var g = 0;
                        var m = {};
                        for (var y = 0; y < r.metadata.vertexCount; y++) {
                            var b = r.vertices[y];
                            for (var x = 0, C = b.position.length; x < C; x++) {
                                t.push(b.position[x]);
                            }
                            for (var x = 0, C = b.normal.length; x < C; x++) {
                                n.push(b.normal[x]);
                            }
                            for (var x = 0, C = b.uv.length; x < C; x++) {
                                a.push(b.uv[x]);
                            }
                            for (var x = 0; x < 4; x++) {
                                f.push(b.skinIndices.length - 1 >= x ? b.skinIndices[x] : 0);
                            }
                            for (var x = 0; x < 4; x++) {
                                d.push(b.skinWeights.length - 1 >= x ? b.skinWeights[x] : 0);
                            }
                        }
                        for (var y = 0; y < r.metadata.faceCount; y++) {
                            var B = r.faces[y];
                            for (var x = 0, C = B.indices.length; x < C; x++) {
                                i.push(B.indices[x]);
                            }
                        }
                        for (var y = 0; y < r.metadata.materialCount; y++) {
                            var E = r.materials[y];
                            o.push({
                                offset: g * 3,
                                count: E.faceCount * 3
                            });
                            g += E.faceCount;
                        }
                        for (var y = 0; y < r.metadata.rigidBodyCount; y++) {
                            var w = r.rigidBodies[y];
                            var T = m[w.boneIndex];
                            T = T === undefined ? w.type : Math.max(w.type, T);
                            m[w.boneIndex] = T;
                        }
                        for (var y = 0; y < r.metadata.boneCount; y++) {
                            var I = r.bones[y];
                            var M = {
                                parent: I.parentIndex,
                                name: I.name,
                                pos: I.position.slice(0, 3),
                                rotq: [ 0, 0, 0, 1 ],
                                scl: [ 1, 1, 1 ],
                                rigidBodyType: m[y] !== undefined ? m[y] : -1
                            };
                            if (M.parent !== -1) {
                                M.pos[0] -= r.bones[M.parent].position[0];
                                M.pos[1] -= r.bones[M.parent].position[1];
                                M.pos[2] -= r.bones[M.parent].position[2];
                            }
                            u.push(M);
                        }
                        if (r.metadata.format === "pmd") {
                            for (var y = 0; y < r.metadata.ikCount; y++) {
                                var R = r.iks[y];
                                var k = {
                                    target: R.target,
                                    effector: R.effector,
                                    iteration: R.iteration,
                                    maxAngle: R.maxAngle * 4,
                                    links: []
                                };
                                for (var x = 0, C = R.links.length; x < C; x++) {
                                    var L = {};
                                    L.index = R.links[x].index;
                                    L.enabled = true;
                                    if (r.bones[L.index].name.indexOf("ひざ") >= 0) {
                                        L.limitation = new s.Vector3(1, 0, 0);
                                    }
                                    k.links.push(L);
                                }
                                h.push(k);
                            }
                        } else {
                            for (var y = 0; y < r.metadata.boneCount; y++) {
                                var R = r.bones[y].ik;
                                if (R === undefined) continue;
                                var k = {
                                    target: y,
                                    effector: R.effector,
                                    iteration: R.iteration,
                                    maxAngle: R.maxAngle,
                                    links: []
                                };
                                for (var x = 0, C = R.links.length; x < C; x++) {
                                    var L = {};
                                    L.index = R.links[x].index;
                                    L.enabled = true;
                                    if (R.links[x].angleLimitation === 1) {
                                        var O = R.links[x].lowerLimitationAngle;
                                        var P = R.links[x].upperLimitationAngle;
                                        var Q = -P[0];
                                        var S = -P[1];
                                        P[0] = -O[0];
                                        P[1] = -O[1];
                                        O[0] = Q;
                                        O[1] = S;
                                        L.rotationMin = new s.Vector3().fromArray(O);
                                        L.rotationMax = new s.Vector3().fromArray(P);
                                    }
                                    k.links.push(L);
                                }
                                h.push(k);
                            }
                        }
                        if (r.metadata.format === "pmx") {
                            for (var y = 0; y < r.metadata.boneCount; y++) {
                                var I = r.bones[y];
                                var U = I.grant;
                                if (U === undefined) continue;
                                var k = {
                                    index: y,
                                    parentIndex: U.parentIndex,
                                    ratio: U.ratio,
                                    isLocal: U.isLocal,
                                    affectRotation: U.affectRotation,
                                    affectPosition: U.affectPosition,
                                    transformationClass: I.transformationClass
                                };
                                p.push(k);
                            }
                            p.sort(function(e, r) {
                                return e.transformationClass - r.transformationClass;
                            });
                        }
                        function V(e, t, a) {
                            for (var n = 0; n < t.elementCount; n++) {
                                var i = t.elements[n];
                                var o;
                                if (r.metadata.format === "pmd") {
                                    o = r.morphs[0].elements[i.index].index;
                                } else {
                                    o = i.index;
                                }
                                e.array[o * 3 + 0] += i.position[0] * a;
                                e.array[o * 3 + 1] += i.position[1] * a;
                                e.array[o * 3 + 2] += i.position[2] * a;
                            }
                        }
                        for (var y = 0; y < r.metadata.morphCount; y++) {
                            var _ = r.morphs[y];
                            var D = {
                                name: _.name
                            };
                            var F = new s.Float32BufferAttribute(r.metadata.vertexCount * 3, 3);
                            F.name = _.name;
                            for (var x = 0; x < r.metadata.vertexCount * 3; x++) {
                                F.array[x] = t[x];
                            }
                            if (r.metadata.format === "pmd") {
                                if (y !== 0) {
                                    V(F, _, 1);
                                }
                            } else {
                                if (_.type === 0) {
                                    for (var x = 0; x < _.elementCount; x++) {
                                        var N = r.morphs[_.elements[x].index];
                                        var z = _.elements[x].ratio;
                                        if (N.type === 1) {
                                            V(F, N, z);
                                        } else {}
                                    }
                                } else if (_.type === 1) {
                                    V(F, _, 1);
                                } else if (_.type === 2) {} else if (_.type === 3) {} else if (_.type === 4) {} else if (_.type === 5) {} else if (_.type === 6) {} else if (_.type === 7) {} else if (_.type === 8) {}
                            }
                            l.push(D);
                            A.push(F);
                        }
                        for (var y = 0; y < r.metadata.rigidBodyCount; y++) {
                            var Y = r.rigidBodies[y];
                            var D = {};
                            for (var j in Y) {
                                D[j] = Y[j];
                            }
                            if (r.metadata.format === "pmx") {
                                if (D.boneIndex !== -1) {
                                    var M = r.bones[D.boneIndex];
                                    D.position[0] -= M.position[0];
                                    D.position[1] -= M.position[1];
                                    D.position[2] -= M.position[2];
                                }
                            }
                            v.push(D);
                        }
                        for (var y = 0; y < r.metadata.constraintCount; y++) {
                            var K = r.constraints[y];
                            var D = {};
                            for (var j in K) {
                                D[j] = K[j];
                            }
                            var H = v[D.rigidBodyIndex1];
                            var J = v[D.rigidBodyIndex2];
                            if (H.type !== 0 && J.type === 2) {
                                if (H.boneIndex !== -1 && J.boneIndex !== -1 && r.bones[J.boneIndex].parentIndex === H.boneIndex) {
                                    J.type = 1;
                                }
                            }
                            c.push(D);
                        }
                        var W = new s.BufferGeometry();
                        W.addAttribute("position", new s.Float32BufferAttribute(t, 3));
                        W.addAttribute("normal", new s.Float32BufferAttribute(n, 3));
                        W.addAttribute("uv", new s.Float32BufferAttribute(a, 2));
                        W.addAttribute("skinIndex", new s.Uint16BufferAttribute(f, 4));
                        W.addAttribute("skinWeight", new s.Float32BufferAttribute(d, 4));
                        W.setIndex(i);
                        for (var y = 0, G = o.length; y < G; y++) {
                            W.addGroup(o[y].offset, o[y].count, y);
                        }
                        W.bones = u;
                        W.morphTargets = l;
                        W.morphAttributes.position = A;
                        W.userData.MMD = {
                            bones: u,
                            iks: h,
                            grants: p,
                            rigidBodies: v,
                            constraints: c,
                            format: r.metadata.format
                        };
                        W.computeBoundingSphere();
                        return W;
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
                    setCrossOrigin: function e(r) {
                        this.crossOrigin = r;
                        return this;
                    },
                    setTexturePath: function e(r) {
                        this.texturePath = r;
                        return this;
                    },
                    build: function e(r, t, a, n) {
                        var i = [];
                        var o = {};
                        this.textureLoader.setCrossOrigin(this.crossOrigin);
                        for (var u = 0; u < r.metadata.materialCount; u++) {
                            var f = r.materials[u];
                            var d = {
                                userData: {}
                            };
                            if (f.name !== undefined) d.name = f.name;
                            d.color = new s.Color().fromArray(f.diffuse);
                            d.opacity = f.diffuse[3];
                            d.specular = new s.Color().fromArray(f.specular);
                            d.emissive = new s.Color().fromArray(f.ambient);
                            d.shininess = Math.max(f.shininess, 1e-4);
                            d.transparent = d.opacity !== 1;
                            d.skinning = t.bones.length > 0 ? true : false;
                            d.morphTargets = t.morphTargets.length > 0 ? true : false;
                            d.lights = true;
                            d.fog = true;
                            d.blending = s.CustomBlending;
                            d.blendSrc = s.SrcAlphaFactor;
                            d.blendDst = s.OneMinusSrcAlphaFactor;
                            d.blendSrcAlpha = s.SrcAlphaFactor;
                            d.blendDstAlpha = s.DstAlphaFactor;
                            if (r.metadata.format === "pmx" && (f.flag & 1) === 1) {
                                d.side = s.DoubleSide;
                            } else {
                                d.side = d.opacity === 1 ? s.FrontSide : s.DoubleSide;
                            }
                            if (r.metadata.format === "pmd") {
                                if (f.fileName) {
                                    var l = f.fileName;
                                    var A = l.split("*");
                                    d.map = this._loadTexture(A[0], o);
                                    if (A.length > 1) {
                                        var h = A[1].slice(-4).toLowerCase();
                                        d.envMap = this._loadTexture(A[1], o, {
                                            sphericalReflectionMapping: true
                                        });
                                        d.combine = h === ".sph" ? s.MultiplyOperation : s.AddOperation;
                                    }
                                }
                                var p = f.toonIndex === -1 ? "toon00.bmp" : r.toonTextures[f.toonIndex].fileName;
                                d.gradientMap = this._loadTexture(p, o, {
                                    isToonTexture: true,
                                    isDefaultToonTexture: this._isDefaultToonTexture(p)
                                });
                                d.userData.outlineParameters = {
                                    thickness: f.edgeFlag === 1 ? .003 : 0,
                                    color: [ 0, 0, 0 ],
                                    alpha: 1,
                                    visible: f.edgeFlag === 1
                                };
                            } else {
                                if (f.textureIndex !== -1) {
                                    d.map = this._loadTexture(r.textures[f.textureIndex], o);
                                }
                                if (f.envTextureIndex !== -1 && (f.envFlag === 1 || f.envFlag == 2)) {
                                    d.envMap = this._loadTexture(r.textures[f.envTextureIndex], o, {
                                        sphericalReflectionMapping: true
                                    });
                                    d.combine = f.envFlag === 1 ? s.MultiplyOperation : s.AddOperation;
                                }
                                var p, v;
                                if (f.toonIndex === -1 || f.toonFlag !== 0) {
                                    p = "toon" + ("0" + (f.toonIndex + 1)).slice(-2) + ".bmp";
                                    v = true;
                                } else {
                                    p = r.textures[f.toonIndex];
                                    v = false;
                                }
                                d.gradientMap = this._loadTexture(p, o, {
                                    isToonTexture: true,
                                    isDefaultToonTexture: v
                                });
                                d.userData.outlineParameters = {
                                    thickness: f.edgeSize / 300,
                                    color: f.edgeColor.slice(0, 3),
                                    alpha: f.edgeColor[3],
                                    visible: (f.flag & 16) !== 0 && f.edgeSize > 0
                                };
                            }
                            if (d.map !== undefined) {
                                if (!d.transparent) {
                                    this._checkImageTransparency(d.map, t, u);
                                }
                                d.emissive.multiplyScalar(.2);
                            }
                            i.push(new s.MeshToonMaterial(d));
                        }
                        if (r.metadata.format === "pmx") {
                            var c = function e(r, t) {
                                for (var a = 0, n = r.length; a < n; a++) {
                                    var i = r[a];
                                    if (i.index === -1) continue;
                                    var o = t[i.index];
                                    if (o.opacity !== i.diffuse[3]) {
                                        o.transparent = true;
                                    }
                                }
                            };
                            for (var u = 0, g = r.morphs.length; u < g; u++) {
                                var m = r.morphs[u];
                                var y = m.elements;
                                if (m.type === 0) {
                                    for (var b = 0, x = y.length; b < x; b++) {
                                        var C = r.morphs[y[b].index];
                                        if (C.type !== 8) continue;
                                        c(C.elements, i);
                                    }
                                } else if (m.type === 8) {
                                    c(y, i);
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
                    _isDefaultToonTexture: function e(r) {
                        if (r.length !== 10) return false;
                        return /toon(10|0[0-9])\.bmp/.test(r);
                    },
                    _loadTexture: function e(t, a, n, i, o) {
                        n = n || {};
                        var u = this;
                        var f;
                        if (n.isDefaultToonTexture === true) {
                            var d;
                            try {
                                d = parseInt(t.match("toon([0-9]{2}).bmp$")[1]);
                            } catch (e) {
                                console.warn("THREE.MMDLoader: " + t + " seems like a " + "not right default texture path. Using toon00.bmp instead.");
                                d = 0;
                            }
                            f = r[d];
                        } else {
                            f = this.texturePath + t;
                        }
                        if (a[f] !== undefined) return a[f];
                        var l = s.Loader.Handlers.get(f);
                        if (l === null) {
                            l = t.slice(-4).toLowerCase() === ".tga" ? this._getTGALoader() : this.textureLoader;
                        }
                        var A = l.load(f, function(e) {
                            if (n.isToonTexture === true) {
                                e.image = u._getRotatedImage(e.image);
                            }
                            e.flipY = false;
                            e.wrapS = s.RepeatWrapping;
                            e.wrapT = s.RepeatWrapping;
                            for (var r = 0; r < A.readyCallbacks.length; r++) {
                                A.readyCallbacks[r](A);
                            }
                            delete A.readyCallbacks;
                        }, i, o);
                        if (n.sphericalReflectionMapping === true) {
                            A.mapping = s.SphericalReflectionMapping;
                        }
                        A.readyCallbacks = [];
                        a[f] = A;
                        return A;
                    },
                    _getRotatedImage: function e(r) {
                        var t = document.createElement("canvas");
                        var a = t.getContext("2d");
                        var n = r.width;
                        var i = r.height;
                        t.width = n;
                        t.height = i;
                        a.clearRect(0, 0, n, i);
                        a.translate(n / 2, i / 2);
                        a.rotate(.5 * Math.PI);
                        a.translate(-n / 2, -i / 2);
                        a.drawImage(r, 0, 0);
                        return a.getImageData(0, 0, n, i);
                    },
                    _checkImageTransparency: function e(r, t, a) {
                        r.readyCallbacks.push(function(e) {
                            function n(e) {
                                var r = document.createElement("canvas");
                                r.width = e.width;
                                r.height = e.height;
                                var t = r.getContext("2d");
                                t.drawImage(e, 0, 0);
                                return t.getImageData(0, 0, r.width, r.height);
                            }
                            function i(e, r, t) {
                                var a = e.width;
                                var n = e.height;
                                var i = e.data;
                                var s = 253;
                                if (i.length / (a * n) !== 4) return false;
                                for (var u = 0; u < t.length; u += 3) {
                                    var f = {
                                        x: 0,
                                        y: 0
                                    };
                                    for (var d = 0; d < 3; d++) {
                                        var l = t[u * 3 + d];
                                        var A = {
                                            x: r[l * 2 + 0],
                                            y: r[l * 2 + 1]
                                        };
                                        if (o(e, A) < s) return true;
                                        f.x += A.x;
                                        f.y += A.y;
                                    }
                                    f.x /= 3;
                                    f.y /= 3;
                                    if (o(e, f) < s) return true;
                                }
                                return false;
                            }
                            function o(e, r) {
                                var t = e.width;
                                var a = e.height;
                                var n = Math.round(r.x * t) % t;
                                var i = Math.round(r.y * a) % a;
                                if (n < 0) n += t;
                                if (i < 0) i += a;
                                var o = i * t + n;
                                return e.data[o * 4 + 3];
                            }
                            var s = e.image.data !== undefined ? e.image : n(e.image);
                            var u = t.groups[a];
                            if (i(s, t.attributes.uv.array, t.index.array.slice(u.start, u.start + u.count))) {
                                r.transparent = true;
                            }
                        });
                    }
                };
                function o() {}
                o.prototype = {
                    constructor: o,
                    build: function e(r, t) {
                        var a = this.buildSkeletalAnimation(r, t).tracks;
                        var n = this.buildMorphAnimation(r, t).tracks;
                        for (var i = 0, o = n.length; i < o; i++) {
                            a.push(n[i]);
                        }
                        return new s.AnimationClip("", -1, a);
                    },
                    buildSkeletalAnimation: function e(r, t) {
                        function a(e, r, t) {
                            e.push(r[t + 0] / 127);
                            e.push(r[t + 8] / 127);
                            e.push(r[t + 4] / 127);
                            e.push(r[t + 12] / 127);
                        }
                        var n = [];
                        var i = {};
                        var o = t.skeleton.bones;
                        var u = {};
                        for (var f = 0, d = o.length; f < d; f++) {
                            u[o[f].name] = true;
                        }
                        for (var f = 0; f < r.metadata.motionCount; f++) {
                            var l = r.motions[f];
                            var A = l.boneName;
                            if (u[A] === undefined) continue;
                            i[A] = i[A] || [];
                            i[A].push(l);
                        }
                        for (var h in i) {
                            var p = i[h];
                            p.sort(function(e, r) {
                                return e.frameNum - r.frameNum;
                            });
                            var v = [];
                            var c = [];
                            var g = [];
                            var m = [];
                            var y = [];
                            var b = t.skeleton.getBoneByName(h).position.toArray();
                            for (var f = 0, d = p.length; f < d; f++) {
                                var x = p[f].frameNum / 30;
                                var C = p[f].position;
                                var B = p[f].rotation;
                                var E = p[f].interpolation;
                                v.push(x);
                                for (var w = 0; w < 3; w++) {
                                    c.push(b[w] + C[w]);
                                }
                                for (var w = 0; w < 4; w++) {
                                    g.push(B[w]);
                                }
                                for (var w = 0; w < 3; w++) {
                                    a(m, E, w);
                                }
                                a(y, E, 3);
                            }
                            var T = ".bones[" + h + "]";
                            n.push(this._createTrack(T + ".position", s.VectorKeyframeTrack, v, c, m));
                            n.push(this._createTrack(T + ".quaternion", s.QuaternionKeyframeTrack, v, g, y));
                        }
                        return new s.AnimationClip("", -1, n);
                    },
                    buildMorphAnimation: function e(r, t) {
                        var a = [];
                        var n = {};
                        var i = t.morphTargetDictionary;
                        for (var o = 0; o < r.metadata.morphCount; o++) {
                            var u = r.morphs[o];
                            var f = u.morphName;
                            if (i[f] === undefined) continue;
                            n[f] = n[f] || [];
                            n[f].push(u);
                        }
                        for (var d in n) {
                            var l = n[d];
                            l.sort(function(e, r) {
                                return e.frameNum - r.frameNum;
                            });
                            var A = [];
                            var h = [];
                            for (var o = 0, p = l.length; o < p; o++) {
                                A.push(l[o].frameNum / 30);
                                h.push(l[o].weight);
                            }
                            a.push(new s.NumberKeyframeTrack(".morphTargetInfluences[" + i[d] + "]", A, h));
                        }
                        return new s.AnimationClip("", -1, a);
                    },
                    buildCameraAnimation: function e(r) {
                        function t(e, r) {
                            e.push(r.x);
                            e.push(r.y);
                            e.push(r.z);
                        }
                        function a(e, r) {
                            e.push(r.x);
                            e.push(r.y);
                            e.push(r.z);
                            e.push(r.w);
                        }
                        function n(e, r, t) {
                            e.push(r[t * 4 + 0] / 127);
                            e.push(r[t * 4 + 1] / 127);
                            e.push(r[t * 4 + 2] / 127);
                            e.push(r[t * 4 + 3] / 127);
                        }
                        var i = [];
                        var o = r.cameras === undefined ? [] : r.cameras.slice();
                        o.sort(function(e, r) {
                            return e.frameNum - r.frameNum;
                        });
                        var u = [];
                        var f = [];
                        var d = [];
                        var l = [];
                        var A = [];
                        var h = [];
                        var p = [];
                        var v = [];
                        var c = [];
                        var g = new s.Quaternion();
                        var m = new s.Euler();
                        var y = new s.Vector3();
                        var b = new s.Vector3();
                        for (var x = 0, C = o.length; x < C; x++) {
                            var B = o[x];
                            var E = B.frameNum / 30;
                            var w = B.position;
                            var T = B.rotation;
                            var I = B.distance;
                            var M = B.fov;
                            var R = B.interpolation;
                            u.push(E);
                            y.set(0, 0, -I);
                            b.set(w[0], w[1], w[2]);
                            m.set(-T[0], -T[1], -T[2]);
                            g.setFromEuler(m);
                            y.add(b);
                            y.applyQuaternion(g);
                            t(f, b);
                            a(d, g);
                            t(l, y);
                            A.push(M);
                            for (var k = 0; k < 3; k++) {
                                n(h, R, k);
                            }
                            n(p, R, 3);
                            for (var k = 0; k < 3; k++) {
                                n(v, R, 4);
                            }
                            n(c, R, 5);
                        }
                        var i = [];
                        i.push(this._createTrack("target.position", s.VectorKeyframeTrack, u, f, h));
                        i.push(this._createTrack(".quaternion", s.QuaternionKeyframeTrack, u, d, p));
                        i.push(this._createTrack(".position", s.VectorKeyframeTrack, u, l, v));
                        i.push(this._createTrack(".fov", s.NumberKeyframeTrack, u, A, c));
                        return new s.AnimationClip("", -1, i);
                    },
                    _createTrack: function e(r, t, a, n, i) {
                        if (a.length > 2) {
                            a = a.slice();
                            n = n.slice();
                            i = i.slice();
                            var o = n.length / a.length;
                            var s = i.length / a.length;
                            var f = 1;
                            for (var d = 2, l = a.length; d < l; d++) {
                                for (var A = 0; A < o; A++) {
                                    if (n[f * o + A] !== n[(f - 1) * o + A] || n[f * o + A] !== n[d * o + A]) {
                                        f++;
                                        break;
                                    }
                                }
                                if (d > f) {
                                    a[f] = a[d];
                                    for (var A = 0; A < o; A++) {
                                        n[f * o + A] = n[d * o + A];
                                    }
                                    for (var A = 0; A < s; A++) {
                                        i[f * s + A] = i[d * s + A];
                                    }
                                }
                            }
                            a.length = f + 1;
                            n.length = (f + 1) * o;
                            i.length = (f + 1) * s;
                        }
                        var h = new t(r, a, n);
                        h.createInterpolant = function e(r) {
                            return new u(this.times, this.values, this.getValueSize(), r, new Float32Array(i));
                        };
                        return h;
                    }
                };
                function u(e, r, t, a, n) {
                    s.Interpolant.call(this, e, r, t, a);
                    this.interpolationParams = n;
                }
                u.prototype = a(Object.create(s.Interpolant.prototype), {
                    constructor: u,
                    interpolate_: function e(r, t, a, n) {
                        var i = this.resultBuffer;
                        var o = this.sampleValues;
                        var u = this.valueSize;
                        var f = this.interpolationParams;
                        var d = r * u;
                        var l = d - u;
                        var A = n - t < 1 / 30 * 1.5 ? 0 : (a - t) / (n - t);
                        if (u === 4) {
                            var h = f[r * 4 + 0];
                            var p = f[r * 4 + 1];
                            var v = f[r * 4 + 2];
                            var c = f[r * 4 + 3];
                            var g = this._calculate(h, p, v, c, A);
                            s.Quaternion.slerpFlat(i, 0, o, l, o, d, g);
                        } else if (u === 3) {
                            for (var m = 0; m !== u; ++m) {
                                var h = f[r * 12 + m * 4 + 0];
                                var p = f[r * 12 + m * 4 + 1];
                                var v = f[r * 12 + m * 4 + 2];
                                var c = f[r * 12 + m * 4 + 3];
                                var g = this._calculate(h, p, v, c, A);
                                i[m] = o[l + m] * (1 - g) + o[d + m] * g;
                            }
                        } else {
                            var h = f[r * 4 + 0];
                            var p = f[r * 4 + 1];
                            var v = f[r * 4 + 2];
                            var c = f[r * 4 + 3];
                            var g = this._calculate(h, p, v, c, A);
                            i[0] = o[l] * (1 - g) + o[d] * g;
                        }
                        return i;
                    },
                    _calculate: function e(r, t, a, n, i) {
                        var o = .5;
                        var s = o;
                        var u = 1 - s;
                        var f = 15;
                        var d = 1e-5;
                        var l = Math;
                        var A, h, p;
                        for (var v = 0; v < f; v++) {
                            A = 3 * u * u * s;
                            h = 3 * u * s * s;
                            p = s * s * s;
                            var c = A * r + h * t + p - i;
                            if (l.abs(c) < d) break;
                            o /= 2;
                            s += c < 0 ? o : -o;
                            u = 1 - s;
                        }
                        return A * a + h * n + p;
                    }
                });
                return e;
            }();
        },
        88: function(e, r, t) {
            "use strict";
            var a = t(23);
            var n = t(64);
            var i = o(n);
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var s = typeof window !== "undefined";
            var u = {
                FileLoader: a.FileLoader,
                MMDLoader: i.default
            };
            if (s && window.Easycanvas) {
                Easycanvas.threeLoaders = u;
            } else {
                e.exports = u;
            }
        }
    });
});

