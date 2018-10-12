(function t(e, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
<<<<<<< HEAD
        var n = r();
        for (var i in n) (typeof exports === "object" ? exports : e)[i] = n[i];
=======
        var i = r();
        for (var n in i) (typeof exports === "object" ? exports : e)[n] = i[n];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
    }
})(this, function() {
    return function(t) {
        var e = {};
<<<<<<< HEAD
        function r(n) {
            if (e[n]) return e[n].exports;
            var i = e[n] = {
                exports: {},
                id: n,
                loaded: false
            };
            t[n].call(i.exports, i, i.exports, r);
            i.loaded = true;
            return i.exports;
=======
        function r(i) {
            if (e[i]) return e[i].exports;
            var n = e[i] = {
                exports: {},
                id: i,
                loaded: false
            };
            t[i].call(n.exports, n, n.exports, r);
            n.loaded = true;
            return n.exports;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        }
        r.m = t;
        r.c = e;
        r.p = "";
        return r(0);
    }([ function(t, e, r) {
<<<<<<< HEAD
        t.exports = r(38);
=======
        t.exports = r(35);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
    }, function(t, e) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(t) {
                return Object.prototype.toString.call(t) === "[object Array]";
            },
            funcOrValue: function t(e, r) {
                if (typeof e === "function") {
<<<<<<< HEAD
                    var n = e.call(r);
                    return n;
                }
                return e;
            },
            execFuncs: function t(e, n, i) {
                if (e) {
                    if (!r.isArray(i)) {
                        i = [ i ];
                    }
                }
                if (typeof e === "function") {
                    return e.apply(n, i);
                } else if (r.isArray(e)) {
                    var a = [];
                    e.forEach(function(t) {
                        a.push(t && t.apply(n, i));
=======
                    var i = e.call(r);
                    return i;
                }
                return e;
            },
            execFuncs: function t(e, i, n) {
                if (e) {
                    if (!r.isArray(n)) {
                        n = [ n ];
                    }
                }
                if (typeof e === "function") {
                    return e.apply(i, n);
                } else if (r.isArray(e)) {
                    var a = [];
                    e.forEach(function(t) {
                        a.push(t && t.apply(i, n));
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    });
                    return a;
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
<<<<<<< HEAD
            pointInRect: function t(e, r, n, i, a, o) {
                return !(e < n || e > i || r < a || r > o);
            },
            firstValuable: function t(e, r, n) {
                return typeof e === "undefined" ? typeof r === "undefined" ? n : r : e;
=======
            pointInRect: function t(e, r, i, n, a, o) {
                return !(e < i || e > n || r < a || r > o);
            },
            firstValuable: function t(e, r, i) {
                return typeof e === "undefined" ? typeof r === "undefined" ? i : r : e;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
        };
        t.exports = r;
    }, function(t, e) {
        "use strict";
        var r = 3.141593;
<<<<<<< HEAD
        t.exports = function(t, e, n, i, a, o) {
            var s = a ? -a / 180 * r : 0;
            var f = t, l = e;
            if (a) {
                f = (t - n) * Math.cos(s) - (e - i) * Math.sin(s) + n;
                l = (t - n) * Math.sin(s) + (e - i) * Math.cos(s) + i;
=======
        t.exports = function(t, e, i, n, a, o) {
            var s = a ? -a / 180 * r : 0;
            var f = t, l = e;
            if (a) {
                f = (t - i) * Math.cos(s) - (e - n) * Math.sin(s) + i;
                l = (t - i) * Math.sin(s) + (e - n) * Math.cos(s) + n;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
            if (o) {
                return [ f, l ];
            }
            return {
                x: f,
                y: l
            };
        };
    }, , function(t, e) {
        "use strict";
        t.exports = {
            xywh: [ "sx", "sy", "sw", "sh", "tx", "ty", "tw", "th" ],
            txywh: [ "tx", "ty", "tw", "th" ],
            sxywh: [ "sx", "sy", "sw", "sh" ],
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.6.0"
        };
    }, , , , , function(t, e) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
<<<<<<< HEAD
        var n = {};
        var i = [];
=======
        var i = {};
        var n = [];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var a = "processing";
        var o = 0;
        var s = function t(e, a, s) {
            var f = s || {};
            var l = t.cacheCanvas;
            if ((typeof e === "undefined" ? "undefined" : r(e)) === "object") {
                var u = e;
                f.callbackArgs = f.callbackArgs || [];
                t(u.shift(), function(e) {
                    f.callbackArgs.push(e);
                    if (u.length > 1) {
                        t(u, a, f);
                    } else {
                        t(u[0], function(t) {
                            f.callbackArgs.push(t);
                            a(f.callbackArgs);
                        }, f);
                    }
                }, s);
                return;
            }
            var c = e + "_" + JSON.stringify(s) + "_" + l;
<<<<<<< HEAD
            if (n[c]) {
                if (a) {
                    if (n[c].width && a) {
                        a(n[c]);
=======
            if (i[c]) {
                if (a) {
                    if (i[c].width && a) {
                        a(i[c]);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    } else {
                        setTimeout(function() {
                            t(e, a, s);
                        }, 100);
                    }
                    return;
                } else {
<<<<<<< HEAD
                    return n[c];
=======
                    return i[c];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                }
            }
            var d = new Image();
            if (f.block) {
                d.src = e;
                o++;
            } else if (o === 0) {
                d.src = e;
            } else {
<<<<<<< HEAD
                i.push({
=======
                n.push({
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    imgObj: d,
                    src: e
                });
            }
<<<<<<< HEAD
            n[c] = d;
=======
            i[c] = d;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var h = void 0;
            if (f.canvas || f.alphaColor || l) {
                h = document.createElement("canvas");
                h.width = h.height || 0;
<<<<<<< HEAD
                n[c] = h;
=======
                i[c] = h;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
            d.onload = function() {
                if (d.src.substr(-3) === "jpg" || d.src.substr(-3) === "jpeg" || d.src.substr(-3) === "bmp") {
                    d.$noAlpha = true;
                } else if (d.src.indexOf("data:image/jpg;") === 0) {
                    d.$noAlpha = true;
                }
                if (f.block) {
                    o--;
                    if (o === 0) {
<<<<<<< HEAD
                        i.forEach(function(t) {
                            t.imgObj.src = t.src;
                        });
                        i.splice(0);
=======
                        n.forEach(function(t) {
                            t.imgObj.src = t.src;
                        });
                        n.splice(0);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    }
                }
                if (h && (f.canvas || f.alphaColor || l)) {
                    var t = h.getContext("2d");
                    h.width = d.width;
                    h.height = d.height;
                    h.$noAlpha = d.$noAlpha;
                    t.drawImage(d, 0, 0);
                    if (f.alphaColor) {
                        var e = t.getImageData(0, 0, d.width, d.height);
                        var r = [];
<<<<<<< HEAD
                        for (var n = 0; n < e.data.length; n += 4) {
                            var s = e.data[n] + e.data[n + 1] + e.data[n + 2];
                            var u = 1;
                            if (e.data[n] < u && e.data[n + 1] < u && e.data[n + 2] < u) {
                                e.data[n + 3] = Math.floor(s / 255);
=======
                        for (var i = 0; i < e.data.length; i += 4) {
                            var s = e.data[i] + e.data[i + 1] + e.data[i + 2];
                            var u = 1;
                            if (e.data[i] < u && e.data[i + 1] < u && e.data[i + 2] < u) {
                                e.data[i + 3] = Math.floor(s / 255);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            }
                        }
                        t.putImageData(e, 0, 0);
                        h.$noAlpha = false;
                    }
                    d = h;
                }
                if (a) {
                    a(d);
                }
            };
            d.onerror = function() {
<<<<<<< HEAD
                n[c] = d;
=======
                i[c] = d;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            };
            return h || d;
        };
        s.cacheCanvas = false;
        t.exports = s;
    }, function(t, e) {
        "use strict";
        var r = "processing";
<<<<<<< HEAD
        var n = {};
        function i(t, e) {
=======
        var i = {};
        function n(t, e) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (t && t.match(/^data:/)) {
                e && e(t);
                return;
            }
<<<<<<< HEAD
            if (n[t]) {
                if (n[t] !== r) {
                    e(n[t]);
                } else {
                    setTimeout(function() {
                        i(t, e);
=======
            if (i[t]) {
                if (i[t] !== r) {
                    e(i[t]);
                } else {
                    setTimeout(function() {
                        n(t, e);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    }, 100);
                }
                return;
            }
<<<<<<< HEAD
            n[t] = r;
=======
            i[t] = r;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var a = new XMLHttpRequest();
            a.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
<<<<<<< HEAD
                    n[t] = r.result;
=======
                    i[t] = r.result;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    e && e(r.result);
                };
                r.readAsDataURL(a.response);
            };
            a.open("GET", t);
            a.responseType = "blob";
            a.send();
        }
<<<<<<< HEAD
        t.exports = i;
    }, function(t, e, r) {
        "use strict";
        var n = r(2);
        var i = a(n);
=======
        t.exports = n;
    }, function(t, e, r) {
        "use strict";
        var i = r(2);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = 3.141593;
<<<<<<< HEAD
        t.exports = function(t, e, r, n, i, a, s, f, l) {
=======
        t.exports = function(t, e, r, i, n, a, s, f, l) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var u = l ? -l / 180 * o : 0;
            if (l) {
                t = (t - s) * Math.cos(l) - (e - f) * Math.sin(l) + s;
                e = (t - s) * Math.sin(l) + (e - f) * Math.cos(l) + f;
            }
<<<<<<< HEAD
            return t >= r && t <= r + i && e >= n && e <= n + a;
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(2);
        var i = s(n);
=======
            return t >= r && t <= r + n && e >= i && e <= i + a;
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(2);
        var n = s(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var a = r(11);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
<<<<<<< HEAD
        t.exports = function(t, e, r, n, i, a, s, f, l, u, c) {
            var d = (0, o.default)(t, e, i, a, s, f, l, u, c) || (0, o.default)(t + r, e, i, a, s, f, l, u, c) || (0, 
            o.default)(t, e + n, i, a, s, f, l, u, c) || (0, o.default)(t + r, e + n, i, a, s, f, l, u, c);
            if (d) return true;
            var h = (0, o.default)(i, a, t, e, r, n, l, u, -c) || (0, o.default)(i + s, a, t, e, r, n, l, u, -c) || (0, 
            o.default)(i, a + f, t, e, r, n, l, u, -c) || (0, o.default)(i + s, a + f, t, e, r, n, l, u, -c);
            if (h) return true;
            if (e > a && e + n < a + f && t < i && t + r > i + s) return true;
            if (t > i && t + r < i + s && e < a && e + n > a + f) return true;
=======
        t.exports = function(t, e, r, i, n, a, s, f, l, u, c) {
            var d = (0, o.default)(t, e, n, a, s, f, l, u, c) || (0, o.default)(t + r, e, n, a, s, f, l, u, c) || (0, 
            o.default)(t, e + i, n, a, s, f, l, u, c) || (0, o.default)(t + r, e + i, n, a, s, f, l, u, c);
            if (d) return true;
            var h = (0, o.default)(n, a, t, e, r, i, l, u, -c) || (0, o.default)(n + s, a, t, e, r, i, l, u, -c) || (0, 
            o.default)(n, a + f, t, e, r, i, l, u, -c) || (0, o.default)(n + s, a + f, t, e, r, i, l, u, -c);
            if (h) return true;
            if (e > a && e + i < a + f && t < n && t + r > n + s) return true;
            if (t > n && t + r < n + s && e < a && e + i > a + f) return true;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            return false;
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
=======
        var i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        t[i] = r[i];
                    }
                }
            }
            return t;
        };
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
<<<<<<< HEAD
        var i = r(1);
        var a = O(i);
        var o = r(4);
        var s = O(o);
        var f = r(19);
        var l = O(f);
        var u = r(18);
        var c = O(u);
        var d = r(16);
        var h = O(d);
        var v = r(17);
        var p = O(v);
        var g = r(20);
        var y = O(g);
        var $ = r(15);
        var m = O($);
        var x = r(32);
        var w = O(x);
        var b = r(31);
        var T = O(b);
        var k = r(33);
        var A = O(k);
        function O(t) {
=======
        var a = r(1);
        var o = w(a);
        var s = r(4);
        var f = w(s);
        var l = r(19);
        var u = w(l);
        var c = r(18);
        var d = w(c);
        var h = r(16);
        var v = w(h);
        var p = r(17);
        var g = w(p);
        var y = r(20);
        var $ = w(y);
        var m = r(15);
        var x = w(m);
        function w(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            return t && t.__esModule ? t : {
                default: t
            };
        }
<<<<<<< HEAD
        var S = function t(e) {
            if (e.children) {
                e.children.forEach(function(r, n) {
                    if (!r.$id) {
                        e.children[n] = new R(r);
                    }
                    if (e.$id && !e.$dom) {
                        e.children[n].$canvas = e.$canvas;
                        e.children[n].$parent = e;
                    } else {
                        e.children[n].$canvas = e;
                    }
                    t(e.children[n]);
                });
            }
        };
        var M = function t(e) {
=======
        var b = function t(e) {
            if (e.children) {
                e.children.forEach(function(r, i) {
                    if (!r.$id) {
                        e.children[i] = new A(r);
                    }
                    if (e.$id && !e.$dom) {
                        e.children[i].$canvas = e.$canvas;
                        e.children[i].$parent = e;
                    } else {
                        e.children[i].$canvas = e;
                    }
                    t(e.children[i]);
                });
            }
        };
        var T = function t(e) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var r = e || {};
            if (!r.$id) {
                r.$id = Math.random().toString(36).substr(2);
            }
            r.$tickedTimes = r.$tickedTimes || 0;
            r.content = r.content || {};
            r.style = r.style || {};
            r.style.tx = r.style.tx || 0;
            r.style.ty = r.style.ty || 0;
<<<<<<< HEAD
            r.style.scale = a.default.firstValuable(r.style.scale, 1);
            r.style.opacity = a.default.firstValuable(r.style.opacity, 1);
            r.style.zIndex = r.style.zIndex || 0;
            r.style.mirrX = r.style.mirrX || 0;
            r.style.locate = r.style.locate || "center";
            var n = a.default.funcOrValue(r.content.img);
            s.default.xywh.forEach(function(t) {
=======
            r.style.scale = o.default.firstValuable(r.style.scale, 1);
            r.style.opacity = o.default.firstValuable(r.style.opacity, 1);
            r.style.zIndex = r.style.zIndex || 0;
            r.style.mirrX = r.style.mirrX || 0;
            r.style.locate = r.style.locate || "center";
            var i = o.default.funcOrValue(r.content.img);
            f.default.xywh.forEach(function(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                r.style[t] = r.style[t] || 0;
            });
            r.inherit = r.inherit;
            r.drag = r.drag || {};
            r.events = r.events || {};
            if (true) {
<<<<<<< HEAD
                for (var i in r.events) {
                    if (typeof r.events[i] !== "function" && i !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + i + " is not a function.", r.events[i]);
=======
                for (var n in r.events) {
                    if (typeof r.events[n] !== "function" && n !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + n + " is not a function.", r.events[n]);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    }
                }
            }
            r.events.eIndex = r.events.eIndex;
            r.hooks = r.hooks || {};
            if (true) {
                r.$perf = {};
            }
            if (true) {
                if (!r.name && r.content.img && r.content.img.src) {
<<<<<<< HEAD
                    var o = r.content.img.src.match(/.*\/([^\/]*)$/);
                    if (o && o[1]) {
                        r.name = o[1];
=======
                    var a = r.content.img.src.match(/.*\/([^\/]*)$/);
                    if (a && a[1]) {
                        r.name = a[1];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    }
                }
                r.name = r.name || "Unnamed Easycanvas Object";
            }
            r.children = r.children || [];
<<<<<<< HEAD
            S(r);
=======
            b(r);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            r.$cache = {};
            r.$styleCacheTime = {};
            return r;
        };
<<<<<<< HEAD
        var F = function t(e) {
=======
        var k = function t(e) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var r = this;
            this.$extendList.forEach(function(t) {
                t.call(r, e);
            });
        };
<<<<<<< HEAD
        var R = function t(e) {
            var r = M(e);
            for (var n in r) {
                if (Object.prototype.hasOwnProperty.call(r, n)) {
                    this[n] = r[n];
                }
            }
            F.call(this, r);
            return this;
        };
        R.prototype.$extendList = [];
        R.prototype.add = function(t) {
=======
        var A = function t(e) {
            var r = T(e);
            for (var i in r) {
                if (Object.prototype.hasOwnProperty.call(r, i)) {
                    this[i] = r[i];
                }
            }
            k.call(this, r);
            return this;
        };
        A.prototype.$extendList = [];
        A.prototype.add = function(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (!t) {
                return;
            }
            this.children.push(t);
<<<<<<< HEAD
            S(this);
            return this.children[this.children.length - 1];
        };
        R.prototype.getRect = function() {
            var t = this;
            var e = {};
            s.default.txywh.forEach(function(r) {
                e[r] = t.getStyle(r);
            });
            if (e.tw === 0 && this.content.img) {
                var r = a.default.funcOrValue(this.content.img, this);
                e.tw = r.width;
                e.th = r.height;
            }
            var n = this.getStyle("locate");
            if (n === "lt") {} else if (n === "ld") {
                e.ty -= e.th;
            } else if (n === "rt") {
                e.tx -= e.tw;
            } else if (n === "rd") {
=======
            b(this);
            return this.children[this.children.length - 1];
        };
        A.prototype.getRect = function() {
            var t = this;
            var e = {};
            f.default.txywh.forEach(function(r) {
                e[r] = t.getStyle(r);
            });
            if (e.tw === 0 && this.content.img) {
                var r = o.default.funcOrValue(this.content.img, this);
                e.tw = r.width;
                e.th = r.height;
            }
            var i = this.getStyle("locate");
            if (i === "lt") {} else if (i === "ld") {
                e.ty -= e.th;
            } else if (i === "rt") {
                e.tx -= e.tw;
            } else if (i === "rd") {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                e.tx -= e.tw;
                e.ty -= e.th;
            } else {
                e.tx -= e.tw >> 1;
                e.ty -= e.th >> 1;
            }
            return e;
        };
<<<<<<< HEAD
        R.prototype.getSelfStyle = function(t) {
            var e = {};
            if (t) {
                return a.default.funcOrValue(this.style[t], this);
            }
            for (var r in this.style) {
                e[r] = a.default.funcOrValue(this.style[r], this);
            }
            return e;
        };
        R.prototype.getStyle = function(t) {
=======
        A.prototype.getSelfStyle = function(t) {
            var e = {};
            if (t) {
                return o.default.funcOrValue(this.style[t], this);
            }
            for (var r in this.style) {
                e[r] = o.default.funcOrValue(this.style[r], this);
            }
            return e;
        };
        A.prototype.getStyle = function(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var e = this;
            var r = e.$canvas.$lastPaintTime;
            if (e.$styleCacheTime[t] === r) {
                return e.$cache[t];
            }
<<<<<<< HEAD
            var n = a.default.funcOrValue(e.style[t], e);
            if (e.$parent) {
                var i = void 0;
                if (e.inherit) {
                    i = e.inherit.indexOf(t) >= 0;
                } else {
                    i = t === "tx" || t === "ty" || t === "scale" || t === "opacity";
                }
                if (i) {
                    var o = e.$parent.getStyle(t);
                    if (t === "opacity" || t === "scale") {
                        o = a.default.firstValuable(o, 1);
                        e.$parent.$styleCacheTime[t] = r;
                        e.$parent.$cache[t] = o;
                        return o * a.default.firstValuable(n, 1);
                    } else {
                        o = a.default.firstValuable(o, 0);
                        e.$parent.$styleCacheTime[t] = r;
                        e.$parent.$cache[t] = o;
                        return o + a.default.firstValuable(n, 0);
                    }
                }
            }
            return n;
        };
        R.prototype.remove = function(t) {
            if (t) {
                this.$canvas.remove(t);
                a.default.execFuncs(t.hooks.removed, t);
=======
            var i = o.default.funcOrValue(e.style[t], e);
            if (e.$parent) {
                var n = void 0;
                if (e.inherit) {
                    n = e.inherit.indexOf(t) >= 0;
                } else {
                    n = t === "tx" || t === "ty" || t === "scale" || t === "opacity";
                }
                if (n) {
                    var a = e.$parent.getStyle(t);
                    if (t === "opacity" || t === "scale") {
                        a = o.default.firstValuable(a, 1);
                        e.$parent.$styleCacheTime[t] = r;
                        e.$parent.$cache[t] = a;
                        return a * o.default.firstValuable(i, 1);
                    } else {
                        a = o.default.firstValuable(a, 0);
                        e.$parent.$styleCacheTime[t] = r;
                        e.$parent.$cache[t] = a;
                        return a + o.default.firstValuable(i, 0);
                    }
                }
            }
            return i;
        };
        A.prototype.remove = function(t) {
            if (t) {
                this.$canvas.remove(t);
                o.default.execFuncs(t.hooks.removed, t);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                return;
            }
            if (this.$parent) {
                this.$parent.remove(this);
            } else {
                this.$canvas.remove(this);
            }
<<<<<<< HEAD
            a.default.execFuncs(this.hooks.removed, this);
        };
        R.prototype.update = function(t) {
=======
            o.default.execFuncs(this.hooks.removed, this);
        };
        A.prototype.update = function(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (!t) return;
            for (var e in t) {
                if (n(t[e]) === "object") {
                    for (var r in t[e]) {
                        this[e][r] = t[e][r];
                    }
                } else {
                    this[e] = t[e];
                }
            }
        };
<<<<<<< HEAD
        R.prototype.getAllChildren = function(t) {
=======
        A.prototype.getAllChildren = function(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var e = this;
            var r = t ? [ e ] : [];
            e.children.forEach(function(t) {
                r = r.concat(t.getAllChildren(true));
            });
            return r;
        };
<<<<<<< HEAD
        R.prototype.getOuterRect = w.default;
        R.prototype.combine = T.default;
        R.prototype.uncombine = A.default;
        R.prototype.combineAsync = function() {
            this.on("ticked", this.combine, 200);
            return this;
        };
        R.prototype.nextTick = p.default;
        R.prototype.on = l.default;
        R.prototype.off = c.default;
        R.prototype.clear = h.default;
        R.prototype.trigger = y.default;
        R.prototype.broadcast = m.default;
        t.exports = R;
    }, , function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = a(n);
=======
        A.prototype.getOuterRect = function() {
            var t = this;
            var e = t.getRect();
            e.tr = e.tx + e.tw;
            e.tb = e.ty + e.th;
            this.children.forEach(function(t) {
                var r = t.getOuterRect();
                if (r.tx < e.tx) e.tx = r.tx;
                if (r.ty < e.ty) e.ty = r.ty;
                if (r.tr > e.tr) e.tr = r.tr;
                if (r.tb > e.tb) e.tb = r.tb;
                e.tw = e.tr - e.tx;
                e.th = e.tb - e.ty;
            });
            return e;
        };
        var O = 1;
        var S = 2;
        var M = 3;
        A.prototype.combine = function(t) {
            if (this.$combine) return O;
            var e = this;
            var r = this.$canvas;
            var n = e.getAllChildren(true);
            for (var a = 0; a < n.length; a++) {
                var o = n[a];
                var s = o.content.img;
                if (s && s.src) {
                    if (o.content.img.width === 0 || s.complete === false || s.naturalHeight === 0) {
                        return M;
                    }
                }
            }
            var f = e.getRect();
            var l = e.getOuterRect();
            l.tx = Math.floor(l.tx);
            l.ty = Math.floor(l.ty);
            l.tw = Math.round(l.tw);
            l.th = Math.round(l.th);
            l.tr = Math.round(l.tr);
            l.tb = Math.round(l.tb);
            if (!t) {
                if (l.tx < 0 || l.tr > r.width) return S;
                if (l.ty < 0 || l.tb > r.height) return S;
            }
            r.paint();
            var u = r.$children.filter(function(t) {
                for (var e = 0; e < n.length; e++) {
                    if (n[e].$id === t.$id) return true;
                }
            });
            var c = r.$children;
            r.$children = u;
            r.$paintContext.clearRect(0, 0, r.width, r.height);
            r.$render();
            var d = document.createElement("canvas");
            d.width = l.tw;
            d.height = l.th;
            var h = d.getContext("2d");
            h.drawImage(r.$dom, l.tx, l.ty, l.tw, l.th, 0, 0, l.tw, l.th);
            e.$combine = {
                content: e.content,
                children: e.children,
                style: e.style
            };
            e.children = [];
            e.content = {
                img: d
            };
            var v = e.getSelfStyle("tx") - (Math.floor(f.tx) - l.tx);
            var p = e.getSelfStyle("ty") - (Math.floor(f.ty) - l.ty);
            e.style = i({}, e.style, {
                opacity: 1,
                scale: 1,
                tx: v,
                ty: p,
                tw: d.width,
                th: d.height
            });
            e.events.interceptor = function(t) {
                e.children = e.$combine.children;
                r.on("afterEvent", function() {
                    e.children = [];
                });
                return t;
            };
            r.$children = c;
            r.$render();
            e.off("ticked", tryToCombine);
            return O;
        };
        A.prototype.uncombine = function() {
            i(this, this.$combine);
            this.$combine = false;
        };
        A.prototype.nextTick = g.default;
        A.prototype.on = u.default;
        A.prototype.off = d.default;
        A.prototype.clear = v.default;
        A.prototype.trigger = $.default;
        A.prototype.broadcast = x.default;
        t.exports = A;
    }, , function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
<<<<<<< HEAD
                i.default.execFuncs(this.hooks[e], this, t);
=======
                n.default.execFuncs(this.hooks[e], this, t);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
            t.unshift(e);
            this.children && this.children.forEach(function(e) {
                e.broadcast.apply(e, t);
            });
        };
    }, function(t, e) {
        "use strict";
        t.exports = function() {
            this.children.forEach(function(t) {
                t.remove();
            });
            this.children = [];
        };
    }, function(t, e) {
        "use strict";
        t.exports = function(t) {
            var e = function e() {
                t.apply(this, arguments);
                this.off("ticked", e);
            };
            this.on("ticked", e);
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = a(n);
=======
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            if (!this.hooks[t]) return;
            if (this.hooks[t] === e || this.hooks[t].$handle === e || !e) {
                delete this.hooks[t];
<<<<<<< HEAD
            } else if (i.default.isArray(this.hooks[t])) {
=======
            } else if (n.default.isArray(this.hooks[t])) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                if (this.hooks[t].indexOf(e) >= 0) {
                    this.hooks[t][this.hooks[t].indexOf(e)] = undefined;
                } else if (this.hooks[t].indexOf(e.$handle) >= 0) {
                    this.hooks[t][this.hooks[t].indexOf(e.$handle)] = undefined;
                }
            }
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = a(n);
=======
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
<<<<<<< HEAD
            var n = e;
            if (r) {
                var a = this;
                n = function t() {
                    var i = Date.now();
                    if (i > n.$lastTriggerTime + r) {
                        n.$lastTriggerTime = i;
=======
            var i = e;
            if (r) {
                var a = this;
                i = function t() {
                    var n = Date.now();
                    if (n > i.$lastTriggerTime + r) {
                        i.$lastTriggerTime = n;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        var o = Array.prototype.slice.call(arguments);
                        e.apply(a, o);
                    }
                };
<<<<<<< HEAD
                n.$lastTriggerTime = -1;
                n.$handle = e;
            }
            if (!this.hooks[t]) {
                this.hooks[t] = n;
            } else if (i.default.isArray(this.hooks[t])) {
                this.hooks[t].push(n);
            } else {
                this.hooks[t] = [ this.hooks[t], n ];
=======
                i.$lastTriggerTime = -1;
                i.$handle = e;
            }
            if (!this.hooks[t]) {
                this.hooks[t] = i;
            } else if (n.default.isArray(this.hooks[t])) {
                this.hooks[t].push(i);
            } else {
                this.hooks[t] = [ this.hooks[t], i ];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = a(n);
=======
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
<<<<<<< HEAD
                return i.default.execFuncs(this.hooks[e], this, t);
=======
                return n.default.execFuncs(this.hooks[e], this, t);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
        };
    }, , , , , , , , function(t, e) {
        "use strict";
        var r = function t(e) {
            setTimeout(e, 1e3 / 60);
        };
<<<<<<< HEAD
        var n = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || r : r;
        t.exports = n;
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = 3.141593;
=======
        var i = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || r : r;
        t.exports = i;
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = 3.141593;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var a = function t(e) {
            return e.$lastPaintTime || Date.now();
        };
        var o = {
<<<<<<< HEAD
            linear: function t(e, r, n) {
                var i = a(this);
=======
            linear: function t(e, r, i) {
                var n = a(this);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                var o = false;
                var s = void 0;
                var f = function() {
                    var t = this.$lastPaintTime;
<<<<<<< HEAD
                    var a = (t - i) / n;
=======
                    var a = (t - n) / i;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    var l = (r - e) * a + e;
                    if (o) {
                        if (r > e) {
                            while (l > r) {
                                l -= r - e;
                            }
                        } else {
                            while (l < r) {
                                l += e - r;
                            }
                        }
                    } else {
                        if (r > e && l > r) {
                            f.$done = true;
                            l = r;
                        } else if (r < e && l < r) {
                            f.$done = true;
                            l = r;
                        }
                    }
                    if (a >= 1 && s) {
                        s.call(this, l);
                        s = null;
                    }
                    return l;
                }.bind(this);
                f.loop = function() {
                    o = true;
                    return f;
                };
                f.restart = function() {
<<<<<<< HEAD
                    i = a(this);
=======
                    n = a(this);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    return f;
                };
                f.then = function(t) {
                    s = t;
                    return f;
                };
                return f;
            },
<<<<<<< HEAD
            pendulum: function t(e, r, n, o) {
=======
            pendulum: function t(e, r, i, o) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                var s = a(this);
                var f = o || {};
                f.start = f.start || 0;
                var l = false;
                var u = void 0;
                var c = f.cycle || 1;
                var d = function() {
                    var t = a(this);
<<<<<<< HEAD
                    var o = (t - s) / n;
=======
                    var o = (t - s) / i;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    if (!l) {
                        if (c) {
                            if (o > c) {
                                o = c;
                                d.$done = true;
                                o = c;
                            }
                        } else if (o > 1) {
                            d.$done = true;
                            o = 1;
                        }
                    } else {
                        if (c) {
                            o %= c;
                        }
                    }
<<<<<<< HEAD
                    var h = o * i * 2 - i / 2 + f.start / 360 * i;
=======
                    var h = o * n * 2 - n / 2 + f.start / 360 * n;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    var v = (r - e) * (Math.sin(h) + 1) / 2 + e;
                    if (o >= c && u) {
                        u.call(this, v);
                        u = null;
                    }
                    return v;
                }.bind(this);
                d.loop = function() {
                    l = true;
                    return d;
                };
                d.restart = function() {
                    s = a(this);
                    return d;
                };
                d.then = function(t) {
                    u = t;
                    return d;
                };
                return d;
            },
<<<<<<< HEAD
            ease: function t(e, r, n) {
                return this.pendulum(e, r, n * 2, {
=======
            ease: function t(e, r, i) {
                return this.pendulum(e, r, i * 2, {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    cycle: .5
                });
            },
            oneByOne: function t(e) {
                var r = e;
<<<<<<< HEAD
                var n = false;
                var i = function t() {
=======
                var i = false;
                var n = function t() {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    for (var e = 0; e < r.length; e++) {
                        if (!r[e].$done) {
                            return r[e]();
                        } else if (!r[e].$nextRestart) {
                            r[e].$nextRestart = true;
                            if (r[e + 1]) {
                                r[e + 1].restart();
                                return r[e + 1]();
                            }
                        }
                    }
<<<<<<< HEAD
                    if (n) {
                        for (var i = 0; i < r.length; i++) {
                            r[i].$done = false;
                            r[i].$nextRestart = false;
                            r[i].restart();
=======
                    if (i) {
                        for (var n = 0; n < r.length; n++) {
                            r[n].$done = false;
                            r[n].$nextRestart = false;
                            r[n].restart();
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        }
                        return r[0]();
                    }
                    return r[r.length - 1]();
                };
<<<<<<< HEAD
                i.loop = function() {
                    n = true;
                    return i;
                };
                return i;
            }
        };
        var s = function t(e, r, i, a, s) {
            var f = (0, n.funcOrValue)(e[r]);
=======
                n.loop = function() {
                    i = true;
                    return n;
                };
                return n;
            }
        };
        var s = function t(e, r, n, a, s) {
            var f = (0, i.funcOrValue)(e[r]);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (true) {
                if (typeof f === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            f = f || 0;
<<<<<<< HEAD
            e[r] = o[i].bind(t)(f, a, s);
=======
            e[r] = o[n].bind(t)(f, a, s);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        };
        for (var f in o) {
            s[f] = o[f];
        }
        t.exports = s;
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                for (var n in r) {
                    if (Object.prototype.hasOwnProperty.call(r, n)) {
                        t[n] = r[n];
=======
        var i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        t[i] = r[i];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    }
                }
            }
            return t;
        };
<<<<<<< HEAD
        var i = r(4);
        var a = f(i);
=======
        var n = r(4);
        var a = f(n);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var o = r(1);
        var s = f(o);
        function f(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        if (true) {
            if (!window[a.default.devFlag]) {
                var l = window[a.default.devFlag] = {
                    isPaintRecording: false,
                    selectMode: false,
                    current: {},
                    version: a.default.version,
                    $canvas: {},
                    $plugin: null
                };
                var u = {
                    getSprite: function t(e) {
                        if (!l.isPaintRecording) return [];
                        var r = {};
                        if (e) {
<<<<<<< HEAD
                            var i = l.$canvas[e].children;
=======
                            var n = l.$canvas[e].children;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            var o = l.$canvas[e].$children;
                            var f = function t(e) {
                                if (e.name === a.default.devFlag) return;
                                r[e.$id] = {
                                    name: e.name,
                                    parent: e.$parent && e.$parent.$id,
                                    style: {},
                                    children: e.children.filter(function(t) {
                                        return t.name !== a.default.devFlag;
                                    }).map(function(t) {
                                        return t.$id;
                                    }),
                                    rendered: e.$rendered
                                };
<<<<<<< HEAD
                                for (var n in e.style) {
                                    r[e.$id].style[n] = s.default.funcOrValue(e.style[n], e);
=======
                                for (var i in e.style) {
                                    r[e.$id].style[i] = s.default.funcOrValue(e.style[i], e);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                }
                                a.default.xywh.forEach(function(t) {
                                    r[e.$id].style[t] = Math.round(r[e.$id].style[t]);
                                });
                                [ "physics", "$perf" ].forEach(function(t) {
                                    r[e.$id][t] = e[t];
                                });
                                if (e.webgl) {
                                    r[e.$id].webgl = {};
                                    [ "rx", "ry", "rz", "tx", "ty", "tz" ].forEach(function(t) {
                                        r[e.$id].webgl[t] = s.default.funcOrValue(e.webgl[t], e);
                                    });
                                }
                                if (e.children) {
                                    e.children.forEach(t);
                                }
                            };
<<<<<<< HEAD
                            i.forEach(f);
                        } else {
                            for (var u in l.$canvas) {
                                r = n(r, l.$plugin.getSprite(u));
=======
                            n.forEach(f);
                        } else {
                            for (var u in l.$canvas) {
                                r = i(r, l.$plugin.getSprite(u));
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            }
                        }
                        return r;
                    },
                    selectSpriteById: function t(e, r) {
                        if (!r) {
<<<<<<< HEAD
                            for (var n in l.$canvas) {
                                var i = u.selectSpriteById(e, n);
                                if (i) {
                                    return {
                                        $sprite: i.$sprite || i,
                                        $canvas: l.$canvas[n]
=======
                            for (var i in l.$canvas) {
                                var n = u.selectSpriteById(e, i);
                                if (n) {
                                    return {
                                        $sprite: n.$sprite || n,
                                        $canvas: l.$canvas[i]
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                    };
                                }
                            }
                            return false;
                        }
<<<<<<< HEAD
                        var a = function t(n) {
                            for (var i = 0; i < n.length; i++) {
                                if (n[i].$id === e) return n[i];
                                var a = t(n[i].children);
=======
                        var a = function t(i) {
                            for (var n = 0; n < i.length; n++) {
                                if (i[n].$id === e) return i[n];
                                var a = t(i[n].children);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                if (a) {
                                    return {
                                        $sprite: a.$sprite || a,
                                        $canvas: l.$canvas[r]
                                    };
                                }
                            }
                            return false;
                        };
                        var o = l.$canvas[r].children;
                        var s = a(o);
                        if (s) {
                            return {
                                $sprite: s.$sprite || s,
                                $canvas: l.$canvas[r]
                            };
                        }
                    },
                    updateSprite: function t(e) {
                        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "style";
<<<<<<< HEAD
                        var i = arguments[2];
                        var a = arguments[3];
                        var o = u.selectSpriteById(e, a).$sprite;
                        if (!o) console.warn("Sprite " + spriteId + " Not Found.");
                        n(o[r], i);
                    },
                    highlightSprite: function t(e, r, n) {
                        l.selectMode = Boolean(r);
                        var i = u.selectSpriteById(e, n);
                        var a = i.$sprite;
                        var o = i.$canvas;
=======
                        var n = arguments[2];
                        var a = arguments[3];
                        var o = u.selectSpriteById(e, a).$sprite;
                        if (!o) console.warn("Sprite " + spriteId + " Not Found.");
                        i(o[r], n);
                    },
                    highlightSprite: function t(e, r, i) {
                        l.selectMode = Boolean(r);
                        var n = u.selectSpriteById(e, i);
                        var a = n.$sprite;
                        var o = n.$canvas;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        if (r && o && a) {
                            o.$plugin.selectSprite(false, o, a);
                        } else if (o) {
                            o.$plugin.cancelSelectSprite(o);
                        }
                    },
                    sendGlobalHook: function t(e, r) {
<<<<<<< HEAD
                        var n = u.selectSpriteById(e, r);
                        var i = n.$sprite;
                        var a = n.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + i.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = i;
                        window.$1 = a;
                    },
                    pause: function t(e, r) {
                        var n = l.$canvas[e];
                        n.$pausing = typeof r !== "undefined" ? r : !n.$pausing;
=======
                        var i = u.selectSpriteById(e, r);
                        var n = i.$sprite;
                        var a = i.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + n.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = n;
                        window.$1 = a;
                    },
                    pause: function t(e, r) {
                        var i = l.$canvas[e];
                        i.$pausing = typeof r !== "undefined" ? r : !i.$pausing;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    },
                    getPerf: function t() {
                        var e = {
                            canvas: [],
                            navigator: {
                                clientWidth: document.body.clientWidth,
                                clientHeight: document.body.clientHeight,
                                devicePixelRatio: window.devicePixelRatio
                            }
                        };
                        if (!l.isPaintRecording) return e;
                        for (var r in l.$canvas) {
                            e.canvas.push({
                                $id: r,
                                name: l.$canvas[r].name,
                                perf: l.$canvas[r].$perf,
                                fps: l.$canvas[r].lastFps,
                                size: {
                                    styleWidth: l.$canvas[r].$dom.getBoundingClientRect().width || parseInt(l.$canvas[r].$dom.style.width) || l.$canvas[r].$dom.width,
                                    styleHeight: l.$canvas[r].$dom.getBoundingClientRect().height || parseInt(l.$canvas[r].$dom.style.height) || l.$canvas[r].$dom.height,
                                    canvasWidth: l.$canvas[r].$dom.width,
                                    canvasHeight: l.$canvas[r].$dom.height
                                }
                            });
                        }
                        return e;
                    }
                };
                l.$plugin = u;
            }
        }
<<<<<<< HEAD
    }, function(t, e) {
        "use strict";
        var r = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                for (var n in r) {
                    if (Object.prototype.hasOwnProperty.call(r, n)) {
                        t[n] = r[n];
                    }
                }
            }
            return t;
        };
        var n = 1;
        var i = 2;
        var a = 3;
        t.exports = function() {
            if (this.$combine) return n;
            var t = this;
            var e = this.$canvas;
            var o = t.getAllChildren(true);
            for (var s = 0; s < o.length; s++) {
                var f = o[s];
                var l = f.content.img;
                if (l && l.src) {
                    if (f.content.img.width === 0 || l.complete === false || l.naturalHeight === 0) {
                        return a;
                    }
                }
            }
            var u = t.getRect();
            var c = t.getOuterRect();
            c.tx = Math.floor(c.tx);
            c.ty = Math.floor(c.ty);
            c.tw = Math.round(c.tw);
            c.th = Math.round(c.th);
            c.tr = Math.round(c.tr);
            c.tb = Math.round(c.tb);
            if (c.tx < 0 || c.tr > e.width) return i;
            if (c.ty < 0 || c.tb > e.height) return i;
            e.paint();
            var d = e.$children.filter(function(t) {
                for (var e = 0; e < o.length; e++) {
                    if (o[e].$id === t.$id) return true;
                }
            });
            var h = e.$children;
            e.$children = d;
            e.$paintContext.clearRect(0, 0, e.width, e.height);
            e.$render();
            var v = document.createElement("canvas");
            v.width = c.tw;
            v.height = c.th;
            var p = v.getContext("2d");
            p.drawImage(e.$dom, c.tx, c.ty, c.tw, c.th, 0, 0, c.tw, c.th);
            t.$combine = {
                content: t.content,
                children: t.children,
                style: t.style
            };
            t.children = [];
            t.content = {
                img: v
            };
            var g = t.getSelfStyle("tx") - (Math.floor(u.tx) - c.tx);
            var y = t.getSelfStyle("ty") - (Math.floor(u.ty) - c.ty);
            t.style = r({}, t.style, {
                opacity: 1,
                scale: 1,
                tx: g,
                ty: y,
                tw: v.width,
                th: v.height
            });
            t.events.$interceptor = t.events.interceptor;
            t.events.interceptor = function(r) {
                t.children = t.$combine.children;
                e.on("afterEvent", function() {
                    t.children = [];
                });
                if (t.events.$interceptor) {
                    return t.events.$interceptor(r);
                }
                return r;
            };
            e.$children = h;
            e.$render();
            t.off("ticked", this.combine);
            return n;
        };
    }, function(t, e) {
        "use strict";
        t.exports = function() {
            var t = this;
            var e = t.getRect();
            e.tr = e.tx + e.tw;
            e.tb = e.ty + e.th;
            this.children.forEach(function(t) {
                var r = t.getOuterRect();
                if (r.tx < e.tx) e.tx = r.tx;
                if (r.ty < e.ty) e.ty = r.ty;
                if (r.tr > e.tr) e.tr = r.tr;
                if (r.tb > e.tb) e.tb = r.tb;
                e.tw = e.tr - e.tx;
                e.th = e.tb - e.ty;
            });
            return e;
        };
    }, function(t, e) {
        "use strict";
        var r = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                for (var n in r) {
                    if (Object.prototype.hasOwnProperty.call(r, n)) {
                        t[n] = r[n];
                    }
                }
            }
            return t;
        };
        t.exports = function() {
            r(this, this.$combine);
            this.$combine = false;
            this.events.$interceptor = false;
        };
    }, , , , , function(t, e, r) {
        "use strict";
        var n = r(4);
        var i = A(n);
        var a = r(60);
        var o = A(a);
        var s = r(28);
        var f = A(s);
        var l = r(102);
=======
    }, , , , , function(t, e, r) {
        "use strict";
        var i = r(4);
        var n = A(i);
        var a = r(57);
        var o = A(a);
        var s = r(28);
        var f = A(s);
        var l = r(99);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var u = A(l);
        var c = r(1);
        var d = A(c);
        var h = r(29);
        var v = A(h);
        var p = r(9);
        var g = A(p);
<<<<<<< HEAD
        var y = r(101);
        var $ = A(y);
        var m = r(103);
=======
        var y = r(98);
        var $ = A(y);
        var m = r(100);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var x = A(m);
        var w = r(13);
        var b = A(w);
        var T = r(30);
        var k = A(T);
        function A(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var O = {
            painter: o.default,
            imgLoader: g.default,
            imgPretreat: $.default,
            multlineText: x.default,
            transition: v.default,
            tick: f.default,
            utils: d.default,
            mirror: u.default,
            class: {
                sprite: b.default
            },
            sprite: b.default,
<<<<<<< HEAD
            $version: i.default.version,
=======
            $version: n.default.version,
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            env: "develop"
        };
        O.extend = function(t) {
            var e = O.sprite.prototype.$extendList;
            if (e.indexOf(t) >= 0) return;
            e.push(t);
        };
        O.use = function(t) {
            var e = O.painter.prototype.$extendList;
            if (e.indexOf(t) >= 0) return;
            if (t.onUse) {
                t.onUse(O);
            }
            e.push(t);
        };
        O.component = function(t, e) {
            t(O, e);
        };
        var S = typeof window !== "undefined";
        if (S) {
            if (window.Easycanvas) {
                console.warn("[Easycanvas] already loaded, it should be loaded only once.");
            } else {
                if (true) {
                    setTimeout(function() {
<<<<<<< HEAD
                        console.log("%c Easycanvas %c You are using the develop version " + i.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
=======
                        console.log("%c Easycanvas %c You are using the develop version " + n.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    }, 500);
                }
                if (true) {
                    window.Easycanvas = O;
                }
            }
        }
        t.exports = O;
    }, , , , function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(47);
        var i = h(n);
        var a = r(49);
        var o = h(a);
        var s = r(43);
        var f = h(s);
        var l = r(48);
        var u = h(l);
        var c = r(59);
=======
        var i = r(44);
        var n = h(i);
        var a = r(46);
        var o = h(a);
        var s = r(40);
        var f = h(s);
        var l = r(45);
        var u = h(l);
        var c = r(56);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var d = h(c);
        function h(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var v = {
            $render: o.default,
            $eventHandler: f.default,
<<<<<<< HEAD
            $perPaint: i.default,
=======
            $perPaint: n.default,
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            $rAFer: u.default
        };
        if (true) {
            v.$plugin = (0, d.default)();
        }
        t.exports = v;
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = s(n);
=======
        var i = r(1);
        var n = s(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var a = r(4);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var f = function t(e) {
            return e.sort(function(t, e) {
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
<<<<<<< HEAD
                        return i.default.funcOrValue(t.style.zIndex, t) < i.default.funcOrValue(e.style.zIndex, e) ? 1 : -1;
                    }
                }
                return i.default.funcOrValue(i.default.firstValuable(t.events.eIndex, t.style.zIndex), t) < i.default.funcOrValue(i.default.firstValuable(e.events.eIndex, e.style.zIndex), e) ? 1 : -1;
            });
        };
        var l = function t(e, r) {
            var n = e.getRect();
            return i.default.pointInRect(r.canvasX, r.canvasY, n.tx, n.tx + n.tw, n.ty, n.ty + n.th);
        };
        var u = function t(e, r, n) {
=======
                        return n.default.funcOrValue(t.style.zIndex, t) < n.default.funcOrValue(e.style.zIndex, e) ? 1 : -1;
                    }
                }
                return n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) < n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) ? 1 : -1;
            });
        };
        var l = function t(e, r) {
            var i = e.getRect();
            return n.default.pointInRect(r.canvasX, r.canvasY, i.tx, i.tx + i.tw, i.ty, i.ty + i.th);
        };
        var u = function t(e, r, i) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (!e || !e.length) return;
            if (r.$stopPropagation) return;
            var a = e.length;
            for (var s = 0; s < a; s++) {
                var u = e[s];
<<<<<<< HEAD
                if (i.default.funcOrValue(u.style.visible, u) === false) continue;
                if (l(u, r)) {
                    if (u.events.interceptor) {
                        var c = i.default.firstValuable(u.events.interceptor.call(u, r), r);
=======
                if (n.default.funcOrValue(u.style.visible, u) === false) continue;
                if (l(u, r)) {
                    if (u.events.interceptor) {
                        var c = n.default.firstValuable(u.events.interceptor.call(u, r), r);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        if (!c || c.$stopPropagation) continue;
                    }
                }
                if (u.children.length) {
                    t(f(u.children.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
<<<<<<< HEAD
                                return i.default.funcOrValue(t.style.zIndex, t) >= 0;
                            }
                        }
                        return i.default.funcOrValue(i.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0;
                    })), r, n);
                }
                if (l(u, r)) {
                    n.push(u);
=======
                                return n.default.funcOrValue(t.style.zIndex, t) >= 0;
                            }
                        }
                        return n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0;
                    })), r, i);
                }
                if (l(u, r)) {
                    i.push(u);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    var h = d(u, r);
                    if (r.$stopPropagation) break;
                }
                if (u.children.length) {
                    t(f(u.children.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
<<<<<<< HEAD
                                return i.default.funcOrValue(t.style.zIndex, t) < 0;
                            }
                        }
                        return !(i.default.funcOrValue(i.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0);
                    })), r, n);
=======
                                return n.default.funcOrValue(t.style.zIndex, t) < 0;
                            }
                        }
                        return !(n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0);
                    })), r, i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                }
            }
        };
        var c = function t(e, r) {
<<<<<<< HEAD
            var n = this;
            this.$extendList.forEach(function(t) {
                if (t.onEvent) {
                    t.onEvent.call(n, e, r);
=======
            var i = this;
            this.$extendList.forEach(function(t) {
                if (t.onEvent) {
                    t.onEvent.call(i, e, r);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                }
            });
        };
        var d = function t(e, r) {
            if (!e.events || !e.events[r.type]) return;
            if (r.$stopPropagation) return;
<<<<<<< HEAD
            var n = e.events[r.type].call(e, r);
            if (n === true) {
=======
            var i = e.events[r.type].call(e, r);
            if (i === true) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                return true;
            }
            if (e.events.stopPropagation) {
                return true;
            }
        };
        var h = {
            x: 0,
            y: 0,
            timeStamp: 0
        };
        var v;
        v = function t(e, r) {
<<<<<<< HEAD
            var n = this;
=======
            var i = this;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var a = void 0;
            var s = void 0;
            var l = 1;
            var d = 1;
            if (!r) {
                if (!e.layerX && e.targetTouches && e.targetTouches[0]) {
                    a = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
                    s = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
                } else if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
                    a = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
                    s = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
                } else {
                    a = e.layerX;
                    s = e.layerY;
                }
                var p = false;
                if (this.$dom.getBoundingClientRect) {
                    var g = this.$dom.getBoundingClientRect();
                    g.width > g.height !== this.width > this.height;
                    l = Math.floor(g[p ? "height" : "width"]) / this.width;
                    d = Math.floor(g[p ? "width" : "height"]) / this.height;
                }
            }
            var y = r || {
                type: e.type,
                canvasX: a / l,
                canvasY: s / d,
                event: e
            };
<<<<<<< HEAD
            if (n.fastclick) {
                if (y.type === "click" && !y.$fakeClick) {
=======
            if (i.fastclick) {
                if (y.type === "click" && !y.fakeClick) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    return;
                } else if (y.type === "touchstart") {
                    h.x = y.canvasX;
                    h.y = y.canvasY;
                    h.timeStamp = Date.now();
                } else if (y.type === "touchend") {
                    if (Math.abs(h.x - y.canvasX) < 30 && Math.abs(h.y - y.canvasY) < 30 && Date.now() - h.timeStamp < 200) {
                        v.call(this, null, {
<<<<<<< HEAD
                            $fakeClick: true,
=======
                            fakeClick: true,
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            type: "click",
                            canvasX: h.x,
                            canvasY: h.y,
                            event: e
                        });
                    }
                }
            }
            y.stopPropagation = function() {
                y.$stopPropagation = true;
            };
<<<<<<< HEAD
            if (n.events.interceptor) {
                y = i.default.firstValuable(n.events.interceptor.call(n, y), y);
                if (!y || y.$stopPropagation) return;
            }
            var $ = [];
            u(f(n.children), y, $);
            i.default.execFuncs(n.hooks.afterEvent, n, y);
            n.hooks.afterEvent = null;
            c.call(n, y, $);
=======
            if (i.events.interceptor) {
                y = n.default.firstValuable(i.events.interceptor.call(i, y), y);
                if (!y || y.$stopPropagation) return;
            }
            var $ = [];
            u(f(i.children), y, $);
            n.default.execFuncs(i.hooks.afterEvent, i, y);
            i.hooks.afterEvent = null;
            c.call(i, y, $);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (true) {
                if (window[o.default.devFlag] && window[o.default.devFlag].selectMode && $.length) {
                    var m = $[0];
                    if (m.name === o.default.devFlag) {
                        m = $[1];
                    }
<<<<<<< HEAD
                    if (m && n.$plugin.selectSprite(y.type === "click" || y.type === "touchend", n, m)) {
=======
                    if (m && i.$plugin.selectSprite(y.type === "click" || y.type === "touchend", i, m)) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        return;
                    }
                }
            }
<<<<<<< HEAD
            if ((y.type === "mousemove" || y.type === "touchmove") && n.eLastMouseHover && $.indexOf(n.eLastMouseHover) === -1) {
                var x = n.eLastMouseHover["events"]["mouseout"] || n.eLastMouseHover["events"]["touchout"];
                if (x) {
                    x.call(n.eLastMouseHover, y);
                }
            }
            n.eLastMouseHover = $[0];
            if (!$.length && n.eLastMouseHover) {
                var w = n.eLastMouseHover["events"]["mouseout"];
                if (w) {
                    w.call(n.eLastMouseHover, y);
                }
                n.eLastMouseHover = null;
            }
            var b = n.events[y.type];
            if (b) {
                if (b.call(n, y)) {
                    n.eHoldingFlag = false;
=======
            if ((y.type === "mousemove" || y.type === "touchmove") && i.eLastMouseHover && $.indexOf(i.eLastMouseHover) === -1) {
                var x = i.eLastMouseHover["events"]["mouseout"] || i.eLastMouseHover["events"]["touchout"];
                if (x) {
                    x.call(i.eLastMouseHover, y);
                }
            }
            i.eLastMouseHover = $[0];
            if (!$.length && i.eLastMouseHover) {
                var w = i.eLastMouseHover["events"]["mouseout"];
                if (w) {
                    w.call(i.eLastMouseHover, y);
                }
                i.eLastMouseHover = null;
            }
            var b = i.events[y.type];
            if (b) {
                if (b.call(i, y)) {
                    i.eHoldingFlag = false;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    return true;
                }
            }
        };
        t.exports = v;
    }, function(t, e) {
        "use strict";
<<<<<<< HEAD
        t.exports = function(t, e, r, n) {
            if (e.sx < 0 && e.sw) {
                var i = -e.sx / e.sw;
                e.tx += e.tw * i;
=======
        t.exports = function(t, e, r, i) {
            if (e.sx < 0 && e.sw) {
                var n = -e.sx / e.sw;
                e.tx += e.tw * n;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                e.sx = 0;
            }
            if (e.sy < 0 && e.sh) {
                var a = -e.sy / e.sh;
                e.ty += e.th * a;
                e.sy = 0;
            }
            if (r && e.sx + e.sw > r) {
                var o = (e.sx + e.sw - r) / e.sw;
                e.sw -= e.sw * o;
                e.tw -= e.tw * o;
            }
<<<<<<< HEAD
            if (n && e.sy + e.sh > n) {
                var s = (e.sy + e.sh - n) / e.sh;
=======
            if (i && e.sy + e.sh > i) {
                var s = (e.sy + e.sh - i) / e.sh;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                e.sh -= e.sh * s;
                e.th -= e.th * s;
            }
            if (e.tx < 0 && e.tw > -e.tx) {
                var f = -e.tx / e.tw;
                e.sx += e.sw * f;
                e.sw -= e.sw * f;
                e.tw = e.tw + e.tx;
                e.tx = 0;
            }
            if (e.ty < 0 && e.th > -e.ty) {
                var l = -e.ty / e.th;
                e.sy += e.sh * l;
                e.sh -= e.sh * l;
                e.th = e.th + e.ty;
                e.ty = 0;
            }
            if (e.tw && e.tx + e.tw > t.width) {
                var u = (e.tx + e.tw - t.width) / e.tw;
                e.tw -= e.tw * u;
                e.sw -= e.sw * u;
            }
            if (e.th && e.ty + e.th > t.height) {
                var c = (e.ty + e.th - t.height) / e.th;
                e.th -= e.th * c;
                e.sh -= e.sh * c;
            }
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = a(n);
=======
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
            if (e) {
                e.filter(function(t) {
<<<<<<< HEAD
                    var e = i.default.funcOrValue(t.style.zIndex, t);
=======
                    var e = n.default.funcOrValue(t.style.zIndex, t);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    if (r < 0) {
                        return e < 0;
                    }
                    return e >= 0;
                }).sort(function(t, e) {
<<<<<<< HEAD
                    var r = i.default.funcOrValue(t.style.zIndex, t);
                    var n = i.default.funcOrValue(e.style.zIndex, e);
                    if (r === n) return 0;
                    return r > n ? 1 : -1;
=======
                    var r = n.default.funcOrValue(t.style.zIndex, t);
                    var i = n.default.funcOrValue(e.style.zIndex, e);
                    if (r === i) return 0;
                    return r > i ? 1 : -1;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                }).forEach(function(e, r) {
                    t.$perPaint.call(t, e, r);
                });
            }
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = a(n);
=======
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r = {};
<<<<<<< HEAD
            for (var n in t.content) {
                r[n] = i.default.funcOrValue(t.content[n], t);
=======
            for (var i in t.content) {
                r[i] = n.default.funcOrValue(t.content[i], t);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
            if (typeof r.img === "string") {
                r.img = t.content.img = e.imgLoader(r.img);
            }
            for (var a in t.style) {
                r[a] = t.getStyle(a);
            }
            if (t.inherit) {
                t.inherit.forEach(function(e) {
                    r[e] = t.getStyle(e);
                });
            }
            if (r.sequence) {
                var o = r.img;
                var s = r.sequence;
                r.sequence.index = r.sequence.index || 0;
                var f = r.sequence.index || 0;
                if (f < 0) f = 0;
                var l = void 0, u = void 0;
                if (s.w || s.h) {
                    if (s.w < 0) {
                        l = o.width / (0 - s.w);
                    } else if (s.w > 0) {
                        l = s.w;
                    } else {
                        l = o.width;
                    }
                    if (s.h < 0) {
                        u = o.height / (0 - s.h);
                    } else if (s.h > 0) {
                        u = s.h;
                    } else {
                        u = o.height;
                    }
                    var c = Math.floor(o.width / l);
                    var d = Math.floor(o.height / u);
                    r.sx = f % c * l;
                    r.sy = Math.floor(f / c) % d * u;
                }
                if (!s.loop && f > 0 && r.sx === 0 && r.sy === 0) {
                    r.img = undefined;
                    if (s.onOver) {
                        s.onOver.call(t);
                    } else {
                        t.remove();
                    }
                }
                r.sequence.lastTickTime = r.sequence.lastTickTime || 0;
<<<<<<< HEAD
                if (e.$nextTickTime - r.sequence.lastTickTime >= i.default.funcOrValue(r.sequence.interval, t)) {
=======
                if (e.$nextTickTime - r.sequence.lastTickTime >= n.default.funcOrValue(r.sequence.interval, t)) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    s.lastTickTime = e.$nextTickTime;
                    r.sequence.index++;
                    r.sequence.lastTickTime = e.$nextTickTime;
                }
                r.sw = r.sw || l;
                r.sh = r.sh || u;
                r.tw = r.tw || l;
                r.th = r.th || u;
            }
            return r;
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = p(n);
        var a = r(4);
        var o = p(a);
        var s = r(46);
        var f = p(s);
        var l = r(44);
        var u = p(l);
        var c = r(45);
=======
        var i = r(1);
        var n = p(i);
        var a = r(4);
        var o = p(a);
        var s = r(43);
        var f = p(s);
        var l = r(41);
        var u = p(l);
        var c = r(42);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var d = p(c);
        var h = r(12);
        var v = p(h);
        function p(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
<<<<<<< HEAD
        var g = i.default.blend;
=======
        var g = n.default.blend;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var y = function t(e) {
            var r = /[^\u4e00-\u9fa5]/;
            return !r.test(e);
        };
        var $ = function t() {
            var e = this;
            this.$canvas.$extendList.forEach(function(t) {
                if (t.onPaint) {
                    t.onPaint.call(e);
                }
            });
        };
        t.exports = function(t, e) {
            t.$rendered = false;
<<<<<<< HEAD
            i.default.execFuncs(t.hooks.beforeTick, t, t.$tickedTimes);
            if (i.default.funcOrValue(t.style.visible, t) === false) {
                i.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
=======
            n.default.execFuncs(t.hooks.beforeTick, t, t.$tickedTimes);
            if (n.default.funcOrValue(t.style.visible, t) === false) {
                n.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                return;
            }
            var r = this;
            $.call(t);
<<<<<<< HEAD
            var n = (0, f.default)(t, r);
            var a = {
                globalAlpha: i.default.firstValuable(n.opacity, 1)
            };
            var o = n.text;
            var s = n.img;
            var l = i.default.funcOrValue(t.children, t);
            var c = s ? s.width || 0 : 0;
            var h = s ? s.height || 0 : 0;
            n.tw = n.tw || n.sw || c;
            n.th = n.th || n.sh || h;
            n.sw = n.sw || c;
            n.sh = n.sh || h;
            if (n.locate === "lt") {} else if (n.locate === "ld") {
                n.ty -= n.th;
            } else if (n.locate === "rt") {
                n.tx -= n.tw;
            } else if (n.locate === "rd") {
                n.tx -= n.tw;
                n.ty -= n.th;
            } else {
                n.tx -= n.tw >> 1;
                n.ty -= n.th >> 1;
            }
            if (n.fh || n.fv) {
                n.fh = n.fh || 0;
                n.fv = n.fv || 0;
                n.fx = n.fx || 0;
                n.fy = n.fy || 0;
                a.transform = {
                    fh: n.fh,
                    fv: n.fv,
                    fx: -(n.ty + (n.th >> 1)) * n.fv + n.fx,
                    fy: -(n.tx + (n.tw >> 1)) * n.fh + n.fy
                };
            }
            if (n.blend) {
                if (typeof n.blend === "string") {
                    a.globalCompositeOperation = n.blend;
                } else {
                    a.globalCompositeOperation = g[n.blend];
                }
            }
            if (n.rotate) {
                var p = i.default.firstValuable(n.rx, n.tx + .5 * n.tw);
                var m = i.default.firstValuable(n.ry, n.ty + .5 * n.th);
                a.beforeRotate = [ p, m ];
                a.rotate = -n.rotate * Math.PI / 180;
                a.rotate = Number(a.rotate.toFixed(4));
                a.afterRotate = [ -p, -m ];
            }
            if (n.backgroundColor) {
                a.fillRect = n.backgroundColor;
            }
            if (n.border) {
                a.line = n.border;
            }
            if (n.overflow === "hidden") {
                a.clip = true;
            }
            if (n.scale !== 1) {
                var x = n.scale;
                n.tx -= (x - 1) * n.tw >> 1;
                n.ty -= (x - 1) * n.th >> 1;
                n.tw *= x;
                n.th *= x;
            }
            if (n.mirrX) {
                a.translate = [ r.width, 0 ];
                a.scale = [ -1, 1 ];
                n.tx = r.width - n.tx - n.tw;
                if (n.mirrY) {
                    a.translate = [ r.width, r.height ];
                    a.scale = [ -1, -1 ];
                    n.ty = r.height - n.ty - n.th;
                }
            } else if (n.mirrY) {
                a.translate = [ 0, r.height ];
                a.scale = [ 1, -1 ];
                n.ty = r.height - n.ty - n.th;
            }
            if (true) {
                if (c && h) {
                    var w = n.tw * n.th / (n.sw * n.sh);
=======
            var i = (0, f.default)(t, r);
            var a = {
                globalAlpha: n.default.firstValuable(i.opacity, 1)
            };
            var o = i.text;
            var s = i.img;
            var l = n.default.funcOrValue(t.children, t);
            var c = s ? s.width || 0 : 0;
            var h = s ? s.height || 0 : 0;
            i.tw = i.tw || i.sw || c;
            i.th = i.th || i.sh || h;
            i.sw = i.sw || c;
            i.sh = i.sh || h;
            if (i.locate === "lt") {} else if (i.locate === "ld") {
                i.ty -= i.th;
            } else if (i.locate === "rt") {
                i.tx -= i.tw;
            } else if (i.locate === "rd") {
                i.tx -= i.tw;
                i.ty -= i.th;
            } else {
                i.tx -= i.tw >> 1;
                i.ty -= i.th >> 1;
            }
            if (i.fh || i.fv) {
                i.fh = i.fh || 0;
                i.fv = i.fv || 0;
                i.fx = i.fx || 0;
                i.fy = i.fy || 0;
                a.transform = {
                    fh: i.fh,
                    fv: i.fv,
                    fx: -(i.ty + (i.th >> 1)) * i.fv + i.fx,
                    fy: -(i.tx + (i.tw >> 1)) * i.fh + i.fy
                };
            }
            if (i.blend) {
                if (typeof i.blend === "string") {
                    a.globalCompositeOperation = i.blend;
                } else {
                    a.globalCompositeOperation = g[i.blend];
                }
            }
            if (i.rotate) {
                var p = n.default.firstValuable(i.rx, i.tx + .5 * i.tw);
                var m = n.default.firstValuable(i.ry, i.ty + .5 * i.th);
                a.beforeRotate = [ p, m ];
                a.rotate = -i.rotate * Math.PI / 180;
                a.rotate = Number(a.rotate.toFixed(4));
                a.afterRotate = [ -p, -m ];
            }
            if (i.backgroundColor) {
                a.fillRect = i.backgroundColor;
            }
            if (i.border) {
                a.line = i.border;
            }
            if (i.overflow === "hidden") {
                a.clip = true;
            }
            if (i.scale !== 1) {
                var x = i.scale;
                i.tx -= (x - 1) * i.tw >> 1;
                i.ty -= (x - 1) * i.th >> 1;
                i.tw *= x;
                i.th *= x;
            }
            if (i.mirrX) {
                a.translate = [ r.width, 0 ];
                a.scale = [ -1, 1 ];
                i.tx = r.width - i.tx - i.tw;
                if (i.mirrY) {
                    a.translate = [ r.width, r.height ];
                    a.scale = [ -1, -1 ];
                    i.ty = r.height - i.ty - i.th;
                }
            } else if (i.mirrY) {
                a.translate = [ 0, r.height ];
                a.scale = [ 1, -1 ];
                i.ty = r.height - i.ty - i.th;
            }
            if (true) {
                if (c && h) {
                    var w = i.tw * i.th / (i.sw * i.sh);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    if (!t.$perf.paintRate || w > t.$perf.paintRate) {
                        t.$perf.paintRate = w;
                    }
                }
            }
<<<<<<< HEAD
            var b = (0, v.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], n.rotate);
=======
            var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (a.clip) {
                if (b) {
                    var T = {
                        $id: t.$id,
                        type: "clip",
                        settings: a,
                        img: s,
<<<<<<< HEAD
                        props: n
=======
                        props: i
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    };
                    T.$origin = t;
                    r.$children.push(T);
                }
            }
            (0, d.default)(r, l, -1);
            if (a.fillRect) {
                if (b) {
                    t.$rendered = true;
                    var k = {
                        $id: t.$id,
                        type: "fillRect",
                        settings: a,
                        img: s,
<<<<<<< HEAD
                        props: n
=======
                        props: i
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    };
                    k.$origin = t;
                    r.$children.push(k);
                }
            }
<<<<<<< HEAD
            if (c && n.opacity !== 0 && n.sw && n.sh) {
                if (!n.rotate && !o) {
                    (0, u.default)(r, n, c, h);
                }
                var A = (0, v.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width - 1, r.height - 1, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], n.rotate);
=======
            if (c && i.opacity !== 0 && i.sw && i.sh) {
                if (!i.rotate && !o) {
                    (0, u.default)(r, i, c, h);
                }
                var A = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width - 1, r.height - 1, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                if (A) {
                    t.$rendered = true;
                    var O = {
                        $id: t.$id,
                        type: "img",
                        settings: a,
                        img: s,
<<<<<<< HEAD
                        props: n
=======
                        props: i
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    };
                    O.$origin = t;
                    r.$children.push(O);
                }
            }
            if (o) {
                t.$rendered = true;
<<<<<<< HEAD
                var S = n.tx;
                var M = n.ty;
                var F = n.align || n.textAlign || "left";
                var R = n.textFont || "14px Arial";
                var E = parseInt(R);
                var C = void 0;
                var _ = n.lineHeight || E;
                if (F === "center") {
                    S += n.tw / 2;
                } else if (F === "right") {
                    S += n.tw;
                }
                if (n.textVerticalAlign === "top") {
                    C = "top";
                } else if (n.textVerticalAlign === "bottom") {
                    C = "bottom";
                    M += n.th;
                } else if (n.textVerticalAlign === "middle") {
                    M += n.th >> 1;
                    C = "middle";
                }
                if (typeof o === "string" || typeof o === "number") {
                    if (M + E * 2 > 0 && M - E * 2 < r.height) {
=======
                var S = i.tx;
                var M = i.ty;
                var F = i.align || i.textAlign || "left";
                var E = i.textFont || "14px Arial";
                var R = parseInt(E);
                var C = void 0;
                var _ = i.lineHeight || R;
                if (F === "center") {
                    S += i.tw / 2;
                } else if (F === "right") {
                    S += i.tw;
                }
                if (i.textVerticalAlign === "top") {
                    C = "top";
                } else if (i.textVerticalAlign === "bottom") {
                    C = "bottom";
                    M += i.th;
                } else if (i.textVerticalAlign === "middle") {
                    M += i.th >> 1;
                    C = "middle";
                }
                if (typeof o === "string" || typeof o === "number") {
                    if (M + R * 2 > 0 && M - R * 2 < r.height) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        r.$children.push({
                            $id: t.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: S,
                                ty: M,
                                content: String(o),
<<<<<<< HEAD
                                fontsize: E,
                                align: F,
                                baseline: C,
                                font: R,
                                color: n.color,
                                type: n.textType
=======
                                fontsize: R,
                                align: F,
                                baseline: C,
                                font: E,
                                color: i.color,
                                type: i.textType
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            },
                            $origin: t
                        });
                    }
                } else if (o.length) {
                    o.forEach(function(e) {
                        r.$children.push({
                            $id: t.$id,
                            type: "text",
                            settings: a,
                            props: {
<<<<<<< HEAD
                                tx: S + i.default.funcOrValue(e.tx, t),
                                ty: M + i.default.funcOrValue(e.ty, t),
                                content: i.default.funcOrValue(e.content, t),
                                fontsize: E,
                                baseline: C,
                                align: F,
                                font: R,
                                color: n.color,
                                type: n.textType
=======
                                tx: S + n.default.funcOrValue(e.tx, t),
                                ty: M + n.default.funcOrValue(e.ty, t),
                                content: n.default.funcOrValue(e.content, t),
                                fontsize: R,
                                baseline: C,
                                align: F,
                                font: E,
                                color: i.color,
                                type: i.textType
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            },
                            $origin: t
                        });
                    });
                } else if (o.type === "multline-text") {
                    var I = o.text.split(/\t|\n/);
                    var V = [];
                    I.forEach(function(t, e) {
                        t = String.prototype.trim.apply(t);
                        if (o.config.start) {
                            t = t.replace(o.config.start, "");
                        }
                        var r = 0;
<<<<<<< HEAD
                        var i = n.tw;
                        while (t.length && r < t.length) {
                            if (i <= 0) {
                                i = n.tw;
=======
                        var n = i.tw;
                        while (t.length && r < t.length) {
                            if (n <= 0) {
                                n = i.tw;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                V.push(t.substr(0, r));
                                t = t.substr(r);
                                r = 0;
                            }
                            r++;
<<<<<<< HEAD
                            i -= E * (y(t[r]) ? 1.05 : .6);
=======
                            n -= R * (y(t[r]) ? 1.05 : .6);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        }
                        if (t || e) {
                            V.push(t);
                        }
                    });
                    V.forEach(function(e) {
                        r.$children.push({
                            $id: t.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: S,
                                ty: M,
<<<<<<< HEAD
                                fontsize: E,
                                content: e,
                                baseline: C,
                                align: F,
                                font: R,
                                color: n.color,
                                type: n.textType
                            },
                            $origin: t
                        });
                        M += _ || E;
=======
                                fontsize: R,
                                content: e,
                                baseline: C,
                                align: F,
                                font: E,
                                color: i.color,
                                type: i.textType
                            },
                            $origin: t
                        });
                        M += _ || R;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    });
                }
            }
            if (a.line) {
                if (b) {
                    t.$rendered = true;
                    var P = {
                        $id: t.$id,
                        type: "line",
                        settings: a,
                        img: s,
<<<<<<< HEAD
                        props: n
=======
                        props: i
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    };
                    P.$origin = t;
                    r.$children.push(P);
                }
            }
            if (!s && !o) {
                t.$rendered = undefined;
            }
            (0, d.default)(r, l, 1);
            if (a.clip) {
                if (b) {
                    var H = {
                        $id: t.$id,
                        type: "clipOver",
                        settings: a,
                        img: s,
<<<<<<< HEAD
                        props: n
=======
                        props: i
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    };
                    H.$origin = t;
                    r.$children.push(H);
                }
            }
<<<<<<< HEAD
            i.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(28);
        var i = s(n);
=======
            n.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(28);
        var n = s(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var a = r(29);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t) {
<<<<<<< HEAD
            var e = this;
            var r = Date.now();
            o.default.$lastPaintTime = this.$nextTickTime = r;
            if (r - this.fpsCalculateTime >= 1e3) {
                this.fpsCalculateTime = r;
=======
            var e = Date.now();
            o.default.$lastPaintTime = this.$nextTickTime = e;
            if (e - this.fpsCalculateTime >= 1e3) {
                this.fpsCalculateTime = e;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                if (this.fpsHandler) {
                    this.fpsHandler.call(this, this.fps);
                }
                this.lastFps = this.fps;
                this.fps = 0;
            }
<<<<<<< HEAD
            (0, i.default)(function(n) {
                e.$rafTime = n;
                e.$rAFer(t);
                if (e.maxFps > 0 && e.maxFps < 60) {
                    if (r - e.$lastPaintTime <= 1e3 / e.maxFps) {
                        return;
                    }
                    e.$lastPaintTime = r - (r - e.$lastPaintTime) % (1e3 / e.maxFps);
                } else {
                    e.$lastPaintTime = Date.now();
                }
                e.fps++;
                t();
            });
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = a(n);
=======
            (0, n.default)(function(r) {
                this.$rafTime = r;
                this.$rAFer(t);
                if (this.maxFps > 0 && this.maxFps < 60) {
                    if (e - this.$lastPaintTime <= 1e3 / this.maxFps) {
                        return;
                    }
                    this.$lastPaintTime = e - (e - this.$lastPaintTime) % (1e3 / this.maxFps);
                } else {
                    this.$lastPaintTime = Date.now();
                }
                t();
            }.bind(this));
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = function t(e, r) {
<<<<<<< HEAD
            var n = this;
            var i = false;
            this.$extendList.forEach(function(t) {
                if (t.onRender) {
                    var a = t.onRender.call(n, e, r);
                    if (a) {
                        i = a;
                    }
                }
            });
            return i;
        };
        var s = function t(e, r) {
            var n = this;
=======
            var i = this;
            var n = false;
            this.$extendList.forEach(function(t) {
                if (t.onRender) {
                    var a = t.onRender.call(i, e, r);
                    if (a) {
                        n = a;
                    }
                }
            });
            return n;
        };
        var s = function t(e, r) {
            var i = this;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var a = e.props;
            var s = void 0;
            var f = e.type === "text";
            if (a && e.type !== "clip" && e.type !== "clipOver" && e.type !== "line") {
                if (f) {
                    var l = a.content.length;
                    s = a.fontsize * a.fontsize * 9 * l;
                    a[5] = a.tx - a.fontsize * 1.5 * l;
                    if (a[5] < 0) a[5] = 0;
                    a[6] = a.ty - a.fontsize * 1.5;
                    if (a[6] < 0) a[6] = 0;
                    a[7] = a.fontsize * 3 * l;
<<<<<<< HEAD
                    if (a[5] + a[7] > n.width) a[7] = n.width - a[5];
                    a[8] = a.fontsize * 3;
                    if (a[6] + a[8] > n.height) a[8] = n.height - a[6];
=======
                    if (a[5] + a[7] > i.width) a[7] = i.width - a[5];
                    a[8] = a.fontsize * 3;
                    if (a[6] + a[8] > i.height) a[8] = i.height - a[6];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                } else {
                    s = a.tw * a.th;
                }
                if ((s > 200 * 200 || f) && !e.settings.transform && !e.settings.rotate) {
<<<<<<< HEAD
                    var u = n.$children;
=======
                    var u = i.$children;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    for (var c = u.length - 1; c > r; c--) {
                        var d = u[c];
                        if (d.$cannotCover) {
                            continue;
                        }
<<<<<<< HEAD
                        var h = d.settings;
                        if (!d.type || d.type !== "img") {
                            if (!(d.type === "fillRect" && h.fillRect.indexOf("rgba") === -1)) {
                                d.$cannotCover = true;
                                continue;
                            }
                        }
                        var v = d.props;
                        if (v.tw * v.th < 200 * 200) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (v.tw * v.th < s) {
=======
                        if (!d.type || d.type !== "img") {
                            d.$cannotCover = true;
                            continue;
                        }
                        var h = d.props;
                        if (h.tw * h.th < 200 * 200) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (h.tw * h.th < s) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            continue;
                        }
                        if (d.img && !d.img.$noAlpha) {
                            d.$cannotCover = true;
                            continue;
                        }
<<<<<<< HEAD
                        if (h.globalAlpha !== 1 || h.globalCompositeOperation || h.transform || h.rotate) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (i.default.pointInRect(a.tx, a.ty, v.tx, v.tx + v.tw, v.ty, v.ty + v.th) && i.default.pointInRect(a.tx + a.tw, a.ty + a.th, v.tx, v.tx + v.tw, v.ty, v.ty + v.th)) {
=======
                        var v = d.settings;
                        if (v.globalAlpha !== 1 || v.globalCompositeOperation || v.transform || v.rotate) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (n.default.pointInRect(a.tx, a.ty, h.tx, h.tx + h.tw, h.ty, h.ty + h.th) && n.default.pointInRect(a.tx + a.tw, a.ty + a.th, h.tx, h.tx + h.tw, h.ty, h.ty + h.th)) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            if (true) {
                                e.$origin.$useless = true;
                            }
                            return;
                        }
                    }
                }
            }
            var p = e.settings || {};
<<<<<<< HEAD
            if (o.call(n, e, p)) {
=======
            if (o.call(i, e, p)) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                return;
            }
            if (true) {
                if (e.$origin) {
                    e.$origin.$useless = false;
                }
            }
<<<<<<< HEAD
            var g = n.$paintContext;
=======
            var g = i.$paintContext;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (e.type === "clip") {
                g.save();
                g.beginPath();
                g.moveTo(a.tx, a.ty);
                g.lineTo(a.tx + a.tw, a.ty);
                g.lineTo(a.tx + a.tw, a.ty + a.th);
                g.lineTo(a.tx, a.ty + a.th);
                g.lineTo(a.tx, a.ty);
                g.closePath();
                g.clip();
            }
            var y = false;
            if (p.globalCompositeOperation) {
                if (!y) {
                    g.save();
                    y = true;
                }
                g.globalCompositeOperation = p.globalCompositeOperation;
            }
            if (p.globalAlpha !== 1 && !isNaN(p.globalAlpha)) {
                if (!y) {
                    g.save();
                    y = true;
                }
                g.globalAlpha = p.globalAlpha;
            }
            if (p.translate) {
                if (!y) {
                    g.save();
                    y = true;
                }
                g.translate(p.translate[0] || 0, p.translate[1] || 0);
            }
            if (p.rotate) {
                if (!y) {
                    g.save();
                    y = true;
                }
                g.translate(p.beforeRotate[0] || 0, p.beforeRotate[1] || 0);
                g.rotate(p.rotate || 0);
                g.translate(p.afterRotate[0] || 0, p.afterRotate[1] || 0);
            }
            if (p.scale) {
                if (!y) {
                    g.save();
                    y = true;
                }
                g.scale(p.scale[0] || 1, p.scale[1] || 1);
            }
            if (p.transform) {
                if (!y) {
                    g.save();
                    y = true;
                }
                g.transform(1, p.transform.fh, p.transform.fv, 1, p.transform.fx, p.transform.fy);
            }
            if (e.type === "img") {
                g.drawImage(e.img, a.sx, a.sy, a.sw, a.sh, a.tx, a.ty, a.tw, a.th);
                if (true) {
<<<<<<< HEAD
                    n.$plugin.drawImage(n, a);
=======
                    i.$plugin.drawImage(i, a);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                }
            } else if (e.type === "text" && a.content) {
                g.font = a.font;
                g.fillStyle = a.color || "white";
                g.textAlign = a.align;
                g.textBaseline = a.baseline;
                g[a.type || "fillText"](a.content, a.tx, a.ty);
            } else if (e.type === "fillRect") {
                g.fillStyle = p.fillRect;
                g.fillRect(a.tx, a.ty, a.tw, a.th);
            } else if (e.type === "line") {
                g.beginPath();
                g.strokeStyle = a.border.substr(a.border.indexOf(" ")) || "black";
                g.lineWidth = a.border.split(" ")[0] || 1;
                g.moveTo(a.tx, a.ty);
                g.lineTo(a.tx + a.tw, a.ty);
                g.lineTo(a.tx + a.tw, a.ty + a.th);
                g.lineTo(a.tx, a.ty + a.th);
                g.lineTo(a.tx, a.ty);
                g.stroke();
            } else if (e.type === "clipOver") {
                g.restore();
            }
            if (y) {
                g.restore();
            }
        };
        t.exports = function() {
            var t = this;
            t.$children.forEach(s.bind(t));
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(51);
        var i = E(n);
        var a = r(55);
        var o = E(a);
        var s = r(58);
        var f = E(s);
        var l = r(52);
        var u = E(l);
        var c = r(16);
        var d = E(c);
        var h = r(53);
        var v = E(h);
        var p = r(19);
        var g = E(p);
        var y = r(18);
        var $ = E(y);
        var m = r(20);
        var x = E(m);
        var w = r(15);
        var b = E(w);
        var T = r(17);
        var k = E(T);
        var A = r(54);
        var O = E(A);
        var S = r(56);
        var M = E(S);
        var F = r(57);
        var R = E(F);
        function E(t) {
=======
        var i = r(48);
        var n = R(i);
        var a = r(52);
        var o = R(a);
        var s = r(55);
        var f = R(s);
        var l = r(49);
        var u = R(l);
        var c = r(16);
        var d = R(c);
        var h = r(50);
        var v = R(h);
        var p = r(19);
        var g = R(p);
        var y = r(18);
        var $ = R(y);
        var m = r(20);
        var x = R(m);
        var w = r(15);
        var b = R(w);
        var T = r(17);
        var k = R(T);
        var A = r(51);
        var O = R(A);
        var S = r(53);
        var M = R(S);
        var F = r(54);
        var E = R(F);
        function R(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var C = {
            start: f.default,
            paint: u.default,
<<<<<<< HEAD
            add: i.default,
=======
            add: n.default,
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            remove: o.default,
            register: O.default,
            clear: d.default,
            setFpsHandler: M.default,
<<<<<<< HEAD
            setMaxFps: R.default,
=======
            setMaxFps: E.default,
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            pause: v.default,
            on: g.default,
            off: $.default,
            trigger: x.default,
            broadcast: b.default,
            nextTick: k.default
        };
        t.exports = C;
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(13);
        var i = a(n);
=======
        var i = r(13);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
<<<<<<< HEAD
        t.exports = i.default.prototype.add;
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = a(n);
=======
        t.exports = n.default.prototype.add;
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var t = this;
<<<<<<< HEAD
            i.default.execFuncs(t.hooks.beforeTick, t, [ t.$rafTime ]);
=======
            n.default.execFuncs(t.hooks.beforeTick, t, [ t.$rafTime ]);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (t.$paintContext.clearRect) {
                t.$paintContext.clearRect(0, 0, this.width, this.height);
            }
            if (!t.$freezing) {
                t.$children = [];
                if (true) {
                    t.$plugin.timeCollect(t, "preprocessTimeSpend", "START");
                }
                this.children.sort(function(t, e) {
<<<<<<< HEAD
                    var r = i.default.funcOrValue(t.style.zIndex, t);
                    var n = i.default.funcOrValue(e.style.zIndex, e);
                    if (r === n) return 0;
                    return r > n ? 1 : -1;
=======
                    var r = n.default.funcOrValue(t.style.zIndex, t);
                    var i = n.default.funcOrValue(e.style.zIndex, e);
                    if (r === i) return 0;
                    return r > i ? 1 : -1;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                }).forEach(function(e, r) {
                    t.$perPaint(e, r);
                });
                if (true) {
                    t.$plugin.timeCollect(t, "preprocessTimeSpend", "END");
                }
            }
            if (true) {
                t.$plugin.timeCollect(t, "paintTimeSpend", "START");
            }
            t.$render();
            if (true) {
                t.$plugin.timeCollect(t, "paintTimeSpend", "END");
            }
<<<<<<< HEAD
            i.default.execFuncs(t.hooks.ticked, t, [ t.$rafTime ]);
            if (t.hooks.nextTick) {
                i.default.execFuncs(t.hooks.nextTick, t, [ t.$rafTime ]);
=======
            this.fps++;
            n.default.execFuncs(t.hooks.ticked, t, [ t.$rafTime ]);
            if (t.hooks.nextTick) {
                n.default.execFuncs(t.hooks.nextTick, t, [ t.$rafTime ]);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                delete t.hooks.nextTick;
            }
        };
    }, function(t, e) {
        "use strict";
        t.exports = function(t) {
            this.$pausing = t === undefined ? true : t;
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = function t(e) {
=======
        var i = function t(e) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            var r = this;
            this.$extendList.forEach(function(t) {
                if (t.onCreate) {
                    t.onCreate.call(r, e);
                }
            });
        };
        t.exports = function(t, e) {
            var r = this;
            if (true) {
                this.fpsHandler = this.fpsHandler || function(t) {
                    if (this.maxFps > 0 && t < this.maxFps - 5 && t < 40) {
                        console.warn("[Easycanvas] Low FPS detected (" + t + "/" + this.maxFps + ").");
                    }
                };
            }
<<<<<<< HEAD
            var i = e || {};
            t = this.$dom = t || this.$dom;
            for (var a in i) {
                this[a] = i[a];
            }
            this.name = i.name || t.id || t.classList && t.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (i.fullScreen && typeof document !== "undefined") {
=======
            var n = e || {};
            t = this.$dom = t || this.$dom;
            for (var a in n) {
                this[a] = n[a];
            }
            this.name = n.name || t.id || t.classList && t.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (n.fullScreen && typeof document !== "undefined") {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                t.width = t.style.width = document.body.clientWidth || document.documentElement.clientWidth;
                t.height = t.style.height = document.body.clientHeight || document.documentElement.clientHeight;
            }
            if (true) {
<<<<<<< HEAD
                if (i.width && t.attributes.width && i.width !== t.width || i.height && t.attributes.height && i.height !== t.height) {
                    console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
                }
            }
            t.width = this.width = this.width || i.width || t.width;
            t.height = this.height = this.height || i.height || t.height;
            if (true) {
                this.$plugin.register(this);
            }
            this.events = i.events || {};
            this.hooks = i.hooks || {};
=======
                if (n.width && t.attributes.width && n.width !== t.width || n.height && t.attributes.height && n.height !== t.height) {
                    console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
                }
            }
            t.width = this.width = this.width || n.width || t.width;
            t.height = this.height = this.height || n.height || t.height;
            if (true) {
                this.$plugin.register(this);
            }
            this.events = n.events || {};
            this.hooks = n.hooks || {};
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            if (this.$inBrowser) {
                var o = [ "contextmenu", "mousewheel", "click", "dblclick", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove" ];
                o.forEach(function(e) {
                    t.addEventListener(e, r.$eventHandler.bind(r));
                });
            }
            if (true) {
                if (this.$paintContext) {
                    console.error("[Easycanvas] Current instance is already registered.");
                }
            }
<<<<<<< HEAD
            n.call(this, i);
=======
            i.call(this, n);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            this.$paintContext = this.$paintContext || t.getContext("2d");
            return this;
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = a(n);
=======
        var i = r(1);
        var n = a(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r = this;
<<<<<<< HEAD
            i.default.execFuncs(t.hooks.beforeRemove, t, t.$tickedTimes++);
=======
            n.default.execFuncs(t.hooks.beforeRemove, t, t.$tickedTimes++);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            t.style.visible = false;
            t.$removing = true;
            setTimeout(function() {
                if (t.$parent) {
                    t.$parent.children = t.$parent.children.filter(function(t) {
                        return t.$removing !== true;
                    });
                } else {
                    r.children = r.children.filter(function(t) {
                        return t.$removing !== true;
                    });
                }
                if (t.$canvas) {
                    t.$canvas = undefined;
                    t.$parent = undefined;
                    t.$tickedTimes = undefined;
                    t.$cache = undefined;
                    t.$rendered = false;
                    if (true) {
                        t.$perf = undefined;
                    }
<<<<<<< HEAD
                    i.default.execFuncs(t.hooks.removed, t, t.$tickedTimes);
=======
                    n.default.execFuncs(t.hooks.removed, t, t.$tickedTimes);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                }
            });
            if (e) {
                this.children.splice(this.children.indexOf(t), 1);
            }
        };
    }, function(t, e) {
        "use strict";
        t.exports = function(t) {
            this.fpsHandler = t;
        };
    }, function(t, e) {
        "use strict";
        t.exports = function(t) {
            this.maxFps = t || -1;
        };
    }, function(t, e) {
        "use strict";
        t.exports = function() {
            var t = this;
            this.fpsCalculateTime = Date.now();
            this.$rAFer(this.paint.bind(this));
            setInterval(function() {
                if (t.eHoldingFlag) {
                    var e = t.eHoldingFlag;
                    e.type = "hold";
                    t.$eventHandler.call(t, null, e);
                }
            }, 100);
            return this;
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(1);
        var i = s(n);
=======
        var i = r(1);
        var n = s(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var a = r(4);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            if (true) {
                var t = "__EASYCANVAS_BRIDGE_TOPANEL__";
                var e = function e(r) {
                    r.tabId = window[o.default.devFlag].tabId;
                    window.document.dispatchEvent(new CustomEvent(t, {
                        detail: JSON.parse(JSON.stringify(r))
                    }));
                };
                setTimeout(function() {
                    e({
                        name: "init"
                    });
                });
                var r = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==";
<<<<<<< HEAD
                var n = null;
                var i = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
=======
                var i = null;
                var n = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                var a = {
                    drawImage: function t(e, r) {
                        if (!window[o.default.devFlag].isPaintRecording) return;
                        if (r) {
                            e.$perf.$paintArea += r[7] * r[8];
                            e.$perf.$loadArea += r[3] * r[4];
                        }
                        e.$perf.$paintTimes++;
                    },
                    jumpRender: function t(e, r) {
                        e.$perf.$jumpArea += r[7] * r[8];
                    },
                    register: function t(e) {
                        e.$id = Math.random().toString(36).substr(2);
                        e.$perf = {};
<<<<<<< HEAD
                        i.forEach(function(t) {
=======
                        n.forEach(function(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            e.$perf[t] = 0;
                            e.$perf["$" + t] = 0;
                        });
                        setInterval(function() {
<<<<<<< HEAD
                            i.forEach(function(t) {
=======
                            n.forEach(function(t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                e.$perf[t] = e.$perf["$" + t];
                                e.$perf["$" + t] = 0;
                            });
                        }, 1e3);
                        if (!e.$flags.devtoolHanged) {
                            window[o.default.devFlag].$canvas[e.$id] = e;
                            e.$flags.devtoolHanged = true;
                        }
                    },
<<<<<<< HEAD
                    timeCollect: function t(e, r, n) {
                        e.$perf["$" + r] += (n === "START" || n === "PAUSE" ? -1 : 1) * Date.now();
                    },
                    selectSprite: function t(i, s, f) {
=======
                    timeCollect: function t(e, r, i) {
                        e.$perf["$" + r] += (i === "START" || i === "PAUSE" ? -1 : 1) * Date.now();
                    },
                    selectSprite: function t(n, s, f) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                        window[o.default.devFlag].MaskCanvasBase64 = r;
                        if (!f || !window[o.default.devFlag].selectMode) {
                            a.cancelSelectSprite(s);
                            return false;
                        }
<<<<<<< HEAD
                        if (!n) {
                            n = s.add({
=======
                        if (!i) {
                            i = s.add({
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                name: o.default.devFlag,
                                content: {
                                    img: s.imgLoader(r)
                                },
                                style: {},
                                webgl: undefined
                            });
                        }
                        [ "tx", "ty", "rotate", "rx", "ry", "scale", "tw", "th", "locate" ].forEach(function(t) {
                            (function(t) {
<<<<<<< HEAD
                                n.style[t] = function() {
=======
                                i.style[t] = function() {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                    if (t === "tw" || t === "th") {
                                        return f.getStyle(t) || f.getRect()[t];
                                    }
                                    return f.getStyle(t);
                                };
                            })(t);
                        });
<<<<<<< HEAD
                        n.style.zIndex = Number.MAX_SAFE_INTEGER;
                        n.style.visible = function() {
                            return window[o.default.devFlag].selectMode;
                        };
                        n.style.opacity = .8;
                        n.webgl = f.webgl ? {} : undefined;
                        if (n.webgl) {
                            for (var l in f.webgl) {
                                (function(t) {
                                    n.webgl[t] = function() {
=======
                        i.style.zIndex = Number.MAX_SAFE_INTEGER;
                        i.style.visible = function() {
                            return window[o.default.devFlag].selectMode;
                        };
                        i.style.opacity = .8;
                        i.webgl = f.webgl ? {} : undefined;
                        if (i.webgl) {
                            for (var l in f.webgl) {
                                (function(t) {
                                    i.webgl[t] = function() {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                                        if (typeof f.webgl[t] === "function") {
                                            return f.webgl[t].call(f);
                                        }
                                        return f.webgl[t];
                                    };
                                })(l);
                            }
<<<<<<< HEAD
                            n.webgl.img = s.imgLoader(r);
                            n.webgl.colors = false;
                            n.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (i) {
                            s.remove(n);
                            n = null;
=======
                            i.webgl.img = s.imgLoader(r);
                            i.webgl.colors = false;
                            i.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (n) {
                            s.remove(i);
                            i = null;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            e({
                                name: "selectSprite",
                                id: s.$id,
                                value: {
                                    sprite: f.$id,
                                    canvas: s.$id
                                }
                            });
                            window[o.default.devFlag].current = {
                                $sprite: f,
                                $canvas: s
                            };
                            window[o.default.devFlag].selectMode = false;
                        }
                        return true;
                    },
                    cancelSelectSprite: function t(e) {
<<<<<<< HEAD
                        if (!n) return;
                        e.remove(n);
                        n = null;
=======
                        if (!i) return;
                        e.remove(i);
                        i = null;
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    }
                };
                return a;
            }
        };
    }, function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(50);
        var i = c(n);
        var a = r(42);
        var o = c(a);
        var s = r(61);
=======
        var i = r(47);
        var n = c(i);
        var a = r(39);
        var o = c(a);
        var s = r(58);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var f = c(s);
        var l = r(9);
        var u = c(l);
        function c(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var d = function t(e) {
            this.imgLoader = u.default;
            for (var r in f.default) {
                this[r] = this[r] || JSON.parse(JSON.stringify(f.default[r]));
            }
            if (!e) {
                return;
            }
            if (!e.el) {
                e = {
                    el: e
                };
            }
            if (e.el) {
                this.register(typeof e.el === "string" ? document.querySelector(e.el) : e.el, e);
            }
        };
        d.prototype.$extendList = [];
        for (var h in o.default) {
            if (Object.prototype.hasOwnProperty.call(o.default, h)) {
                d.prototype[h] = o.default[h];
            }
        }
<<<<<<< HEAD
        for (var v in i.default) {
            if (Object.prototype.hasOwnProperty.call(i.default, v)) {
                d.prototype[v] = i.default[v];
=======
        for (var v in n.default) {
            if (Object.prototype.hasOwnProperty.call(n.default, v)) {
                d.prototype[v] = n.default[v];
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            }
        }
        t.exports = d;
    }, function(t, e) {
        "use strict";
        var r = {
            $dom: null,
            $paintContext: null,
            $nextTickTime: 0,
            $lastPaintTime: 0,
            $pausing: false,
            $freezing: false,
            name: "",
            fps: 0,
            lastFps: 0,
            fpsCalculateTime: 0,
            fpsHandler: null,
            width: 0,
            height: 0,
            events: {
                click: null
            },
            children: [],
            eHoldingFlag: false,
            eLastMouseHover: null,
            maxFps: -1,
            $flags: {}
        };
        t.exports = r;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, r) {
        "use strict";
<<<<<<< HEAD
        var n = r(9);
        var i = s(n);
=======
        var i = r(9);
        var n = s(i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
        var a = r(10);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r;
            (0, o.default)(t, function(t) {
<<<<<<< HEAD
                return (0, i.default)(t, function(t) {
                    var n = t.width, i = t.height;
                    var a = t.getContext("2d").getImageData(0, 0, n, i);
=======
                return (0, n.default)(t, function(t) {
                    var i = t.width, n = t.height;
                    var a = t.getContext("2d").getImageData(0, 0, i, n);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    var o = a.data;
                    for (var s = o.length - 1; s >= 0; s -= 4) {
                        if (e && e.conversion) {
                            var f = e.conversion({
                                r: o[s - 3],
                                g: o[s - 2],
                                b: o[s - 1],
                                a: o[s]
<<<<<<< HEAD
                            }, (s + 1 >> 2) % n, Math.floor((s + 1 >> 2) / n));
=======
                            }, (s + 1 >> 2) % i, Math.floor((s + 1 >> 2) / i));
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                            o[s - 3] = f.r;
                            o[s - 2] = f.g;
                            o[s - 1] = f.b;
                            o[s - 0] = f.a;
                        }
                    }
<<<<<<< HEAD
                    t.getContext("2d").clearRect(0, 0, n, i);
=======
                    t.getContext("2d").clearRect(0, 0, i, n);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
                    t.getContext("2d").putImageData(a, 0, 0);
                    r = t;
                }, {
                    canvas: true,
                    cacheFlag: Math.random()
                });
            });
            return function() {
                return r;
            };
        };
    }, function(t, e) {
        "use strict";
        t.exports = function t(e) {
            var r = e.width;
<<<<<<< HEAD
            var n = e.height;
            var i = document.createElement("canvas");
            i.width = r;
            i.height = n;
            var a = i.getContext("2d");
            a.scale(1, -1);
            a.translate(0, -n);
            a.drawImage(e, 0, 0);
            var o = a.getImageData(0, 0, r, n);
=======
            var i = e.height;
            var n = document.createElement("canvas");
            n.width = r;
            n.height = i;
            var a = n.getContext("2d");
            a.scale(1, -1);
            a.translate(0, -i);
            a.drawImage(e, 0, 0);
            var o = a.getImageData(0, 0, r, i);
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            return {
                canvas: a,
                img: o
            };
        };
    }, function(t, e) {
        "use strict";
        t.exports = function(t, e) {
            return {
                type: "multline-text",
                text: t,
                config: e
            };
        };
    } ]);
});

