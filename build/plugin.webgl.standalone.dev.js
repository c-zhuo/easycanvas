(function r(e, t) {
    if (typeof exports === "object" && typeof module === "object") module.exports = t(); else if (typeof define === "function" && define.amd) define([], t); else {
        var a = t();
        for (var n in a) (typeof exports === "object" ? exports : e)[n] = a[n];
    }
})(this, function() {
    return function(r) {
        var e = {};
        function t(a) {
            if (e[a]) return e[a].exports;
            var n = e[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            r[a].call(n.exports, n, n.exports, t);
            n.loaded = true;
            return n.exports;
        }
        t.m = r;
        t.c = e;
        t.p = "";
        return t(0);
    }({
        0: function(r, e, t) {
            r.exports = t(59);
        },
        1: function(r, e) {
            "use strict";
            var t = {
                isArray: Array.isArray || function(r) {
                    return Object.prototype.toString.call(r) === "[object Array]";
                },
                funcOrValue: function r(e, t) {
                    if (typeof e === "function") {
                        var a = e.call(t);
                        return a;
                    }
                    return e;
                },
                execFuncs: function r(e, a, n) {
                    if (e) {
                        if (!t.isArray(n)) {
                            n = [ n ];
                        }
                    }
                    if (typeof e === "function") {
                        return e.apply(a, n);
                    } else if (t.isArray(e)) {
                        var i = [];
                        e.forEach(function(r) {
                            i.push(r && r.apply(a, n));
                        });
                        return i;
                    }
                },
                blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
                pointInRect: function r(e, t, a, n, i, o) {
                    return !(e < a || e > n || t < i || t > o);
                },
                firstValuable: function r(e, t, a) {
                    return typeof e === "undefined" ? typeof t === "undefined" ? a : t : e;
                }
            };
            r.exports = t;
        },
        2: function(r, e) {
            "use strict";
            var t = 3.141593;
            r.exports = function(r, e, a, n, i, o) {
                var c = i ? -i / 180 * t : 0;
                var l = r, v = e;
                if (i) {
                    l = (r - a) * Math.cos(c) - (e - n) * Math.sin(c) + a;
                    v = (r - a) * Math.sin(c) + (e - n) * Math.cos(c) + n;
                }
                if (o) {
                    return [ l, v ];
                }
                return {
                    x: l,
                    y: v
                };
            };
        },
        5: function(r, e) {
            "use strict";
            var t = "processing";
            var a = {};
            function n(r, e) {
                if (r && r.match(/^data:/)) {
                    e && e(r);
                    return;
                }
                if (a[r]) {
                    if (a[r] !== t) {
                        e(a[r]);
                    } else {
                        setTimeout(function() {
                            n(r, e);
                        }, 100);
                    }
                    return;
                }
                a[r] = t;
                var i = new XMLHttpRequest();
                i.onload = function() {
                    var t = new FileReader();
                    t.onloadend = function() {
                        a[r] = t.result;
                        e && e(t.result);
                    };
                    t.readAsDataURL(i.response);
                };
                i.open("GET", r);
                i.responseType = "blob";
                i.send();
            }
            r.exports = n;
        },
        7: function(r, e, t) {
            "use strict";
            var a = t(2);
            var n = i(a);
            function i(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var o = 3.141593;
            r.exports = function(r, e, t, a, n, i, c, l, v) {
                var u = v ? -v / 180 * o : 0;
                if (v) {
                    r = (r - c) * Math.cos(v) - (e - l) * Math.sin(v) + c;
                    e = (r - c) * Math.sin(v) + (e - l) * Math.cos(v) + l;
                }
                return r >= t && r <= t + n && e >= a && e <= a + i;
            };
        },
        8: function(r, e, t) {
            "use strict";
            var a = t(2);
            var n = c(a);
            var i = t(7);
            var o = c(i);
            function c(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            r.exports = function(r, e, t, a, n, i, c, l, v, u, s) {
                var f = (0, o.default)(r, e, n, i, c, l, v, u, s) || (0, o.default)(r + t, e, n, i, c, l, v, u, s) || (0, 
                o.default)(r, e + a, n, i, c, l, v, u, s) || (0, o.default)(r + t, e + a, n, i, c, l, v, u, s);
                if (f) return true;
                var d = (0, o.default)(n, i, r, e, t, a, v, u, -s) || (0, o.default)(n + c, i, r, e, t, a, v, u, -s) || (0, 
                o.default)(n, i + l, r, e, t, a, v, u, -s) || (0, o.default)(n + c, i + l, r, e, t, a, v, u, -s);
                if (d) return true;
                return false;
            };
        },
        21: function(r, e) {
            "use strict";
            var t = function r(e, t) {
                var a = e.length;
                var n = new Array(Math.round(a * t));
                for (var i = 0, o = n.length; i < o; i++) {
                    n[i] = e[i % a];
                }
                return n;
            };
            r.exports = {
                arrayRepeat: t
            };
        },
        29: function(r, e) {
            "use strict";
            r.exports = function() {
                "use strict";
                function r(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = e[0 * 4 + 0];
                    var n = e[0 * 4 + 1];
                    var i = e[0 * 4 + 2];
                    var o = e[0 * 4 + 3];
                    var c = e[1 * 4 + 0];
                    var l = e[1 * 4 + 1];
                    var v = e[1 * 4 + 2];
                    var u = e[1 * 4 + 3];
                    var s = e[2 * 4 + 0];
                    var f = e[2 * 4 + 1];
                    var d = e[2 * 4 + 2];
                    var g = e[2 * 4 + 3];
                    var h = e[3 * 4 + 0];
                    var p = e[3 * 4 + 1];
                    var m = e[3 * 4 + 2];
                    var _ = e[3 * 4 + 3];
                    var b = r[0 * 4 + 0];
                    var x = r[0 * 4 + 1];
                    var w = r[0 * 4 + 2];
                    var A = r[0 * 4 + 3];
                    var y = r[1 * 4 + 0];
                    var R = r[1 * 4 + 1];
                    var T = r[1 * 4 + 2];
                    var E = r[1 * 4 + 3];
                    var F = r[2 * 4 + 0];
                    var L = r[2 * 4 + 1];
                    var M = r[2 * 4 + 2];
                    var B = r[2 * 4 + 3];
                    var S = r[3 * 4 + 0];
                    var U = r[3 * 4 + 1];
                    var D = r[3 * 4 + 2];
                    var P = r[3 * 4 + 3];
                    t[0] = a * b + n * y + i * F + o * S;
                    t[1] = a * x + n * R + i * L + o * U;
                    t[2] = a * w + n * T + i * M + o * D;
                    t[3] = a * A + n * E + i * B + o * P;
                    t[4] = c * b + l * y + v * F + u * S;
                    t[5] = c * x + l * R + v * L + u * U;
                    t[6] = c * w + l * T + v * M + u * D;
                    t[7] = c * A + l * E + v * B + u * P;
                    t[8] = s * b + f * y + d * F + g * S;
                    t[9] = s * x + f * R + d * L + g * U;
                    t[10] = s * w + f * T + d * M + g * D;
                    t[11] = s * A + f * E + d * B + g * P;
                    t[12] = h * b + p * y + m * F + _ * S;
                    t[13] = h * x + p * R + m * L + _ * U;
                    t[14] = h * w + p * T + m * M + _ * D;
                    t[15] = h * A + p * E + m * B + _ * P;
                    return t;
                }
                function e(r, e, t) {
                    t = t || new Float32Array(3);
                    t[0] = r[0] + e[0];
                    t[1] = r[1] + e[1];
                    t[2] = r[2] + e[2];
                    return t;
                }
                function t(r, e, t) {
                    t = t || new Float32Array(3);
                    t[0] = r[0] - e[0];
                    t[1] = r[1] - e[1];
                    t[2] = r[2] - e[2];
                    return t;
                }
                function a(r, e) {
                    e = e || new Float32Array(3);
                    var t = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
                    if (t > 1e-5) {
                        e[0] = r[0] / t;
                        e[1] = r[1] / t;
                        e[2] = r[2] / t;
                    }
                    return e;
                }
                function n(r, e, t) {
                    t = t || new Float32Array(3);
                    t[0] = r[1] * e[2] - r[2] * e[1];
                    t[1] = r[2] * e[0] - r[0] * e[2];
                    t[2] = r[0] * e[1] - r[1] * e[0];
                    return t;
                }
                function i(r, e) {
                    return r[0] * e[0] + r[1] * e[1] + r[2] * e[2];
                }
                function o(r, e) {
                    var t = r[0] - e[0];
                    var a = r[1] - e[1];
                    var n = r[2] - e[2];
                    return t * t + a * a + n * n;
                }
                function c(r, e) {
                    return Math.sqrt(o(r, e));
                }
                function l(r) {
                    r = r || new Float32Array(16);
                    r[0] = 1;
                    r[1] = 0;
                    r[2] = 0;
                    r[3] = 0;
                    r[4] = 0;
                    r[5] = 1;
                    r[6] = 0;
                    r[7] = 0;
                    r[8] = 0;
                    r[9] = 0;
                    r[10] = 1;
                    r[11] = 0;
                    r[12] = 0;
                    r[13] = 0;
                    r[14] = 0;
                    r[15] = 1;
                    return r;
                }
                function v(r, e) {
                    e = e || new Float32Array(16);
                    e[0] = r[0];
                    e[1] = r[4];
                    e[2] = r[8];
                    e[3] = r[12];
                    e[4] = r[1];
                    e[5] = r[5];
                    e[6] = r[9];
                    e[7] = r[13];
                    e[8] = r[2];
                    e[9] = r[6];
                    e[10] = r[10];
                    e[11] = r[14];
                    e[12] = r[3];
                    e[13] = r[7];
                    e[14] = r[11];
                    e[15] = r[15];
                    return e;
                }
                function u(r, e, i, o) {
                    o = o || new Float32Array(16);
                    var c = a(t(r, e));
                    var l = a(n(i, c));
                    var v = a(n(c, l));
                    o[0] = l[0];
                    o[1] = l[1];
                    o[2] = l[2];
                    o[3] = 0;
                    o[4] = v[0];
                    o[5] = v[1];
                    o[6] = v[2];
                    o[7] = 0;
                    o[8] = c[0];
                    o[9] = c[1];
                    o[10] = c[2];
                    o[11] = 0;
                    o[12] = r[0];
                    o[13] = r[1];
                    o[14] = r[2];
                    o[15] = 1;
                    return o;
                }
                function s(r, e, t, a, n) {
                    n = n || new Float32Array(16);
                    var i = Math.tan(Math.PI * .5 - .5 * r);
                    var o = 1 / (t - a);
                    n[0] = i / e;
                    n[1] = 0;
                    n[2] = 0;
                    n[3] = 0;
                    n[4] = 0;
                    n[5] = i;
                    n[6] = 0;
                    n[7] = 0;
                    n[8] = 0;
                    n[9] = 0;
                    n[10] = (t + a) * o;
                    n[11] = -1;
                    n[12] = 0;
                    n[13] = 0;
                    n[14] = t * a * o * 2;
                    n[15] = 0;
                    return n;
                }
                function f(r, e, t, a, n, i, o) {
                    o = o || new Float32Array(16);
                    o[0] = 2 / (e - r);
                    o[1] = 0;
                    o[2] = 0;
                    o[3] = 0;
                    o[4] = 0;
                    o[5] = 2 / (a - t);
                    o[6] = 0;
                    o[7] = 0;
                    o[8] = 0;
                    o[9] = 0;
                    o[10] = 2 / (n - i);
                    o[11] = 0;
                    o[12] = (r + e) / (r - e);
                    o[13] = (t + a) / (t - a);
                    o[14] = (n + i) / (n - i);
                    o[15] = 1;
                    return o;
                }
                function d(r, e, t, a, n, i) {
                    var o = e - r;
                    var c = a - t;
                    var l = i - n;
                    dst[0] = 2 * n / o;
                    dst[1] = 0;
                    dst[2] = 0;
                    dst[3] = 0;
                    dst[4] = 0;
                    dst[5] = 2 * n / c;
                    dst[6] = 0;
                    dst[7] = 0;
                    dst[8] = (r + e) / o;
                    dst[9] = (a + t) / c;
                    dst[10] = -(i + n) / l;
                    dst[11] = -1;
                    dst[12] = 0;
                    dst[13] = 0;
                    dst[14] = -2 * n * i / l;
                    dst[15] = 0;
                    return dst;
                }
                function g(r, e, t, a) {
                    a = a || new Float32Array(16);
                    a[0] = 1;
                    a[1] = 0;
                    a[2] = 0;
                    a[3] = 0;
                    a[4] = 0;
                    a[5] = 1;
                    a[6] = 0;
                    a[7] = 0;
                    a[8] = 0;
                    a[9] = 0;
                    a[10] = 1;
                    a[11] = 0;
                    a[12] = r;
                    a[13] = e;
                    a[14] = t;
                    a[15] = 1;
                    return a;
                }
                function h(r, e, t, a, n) {
                    n = n || new Float32Array(16);
                    var i = r[0];
                    var o = r[1];
                    var c = r[2];
                    var l = r[3];
                    var v = r[1 * 4 + 0];
                    var u = r[1 * 4 + 1];
                    var s = r[1 * 4 + 2];
                    var f = r[1 * 4 + 3];
                    var d = r[2 * 4 + 0];
                    var g = r[2 * 4 + 1];
                    var h = r[2 * 4 + 2];
                    var p = r[2 * 4 + 3];
                    var m = r[3 * 4 + 0];
                    var _ = r[3 * 4 + 1];
                    var b = r[3 * 4 + 2];
                    var x = r[3 * 4 + 3];
                    if (r !== n) {
                        n[0] = i;
                        n[1] = o;
                        n[2] = c;
                        n[3] = l;
                        n[4] = v;
                        n[5] = u;
                        n[6] = s;
                        n[7] = f;
                        n[8] = d;
                        n[9] = g;
                        n[10] = h;
                        n[11] = p;
                    }
                    n[12] = i * e + v * t + d * a + m;
                    n[13] = o * e + u * t + g * a + _;
                    n[14] = c * e + s * t + h * a + b;
                    n[15] = l * e + f * t + p * a + x;
                    return n;
                }
                function p(r, e) {
                    e = e || new Float32Array(16);
                    var t = Math.cos(r);
                    var a = Math.sin(r);
                    e[0] = 1;
                    e[1] = 0;
                    e[2] = 0;
                    e[3] = 0;
                    e[4] = 0;
                    e[5] = t;
                    e[6] = a;
                    e[7] = 0;
                    e[8] = 0;
                    e[9] = -a;
                    e[10] = t;
                    e[11] = 0;
                    e[12] = 0;
                    e[13] = 0;
                    e[14] = 0;
                    e[15] = 1;
                    return e;
                }
                function m(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[4];
                    var n = r[5];
                    var i = r[6];
                    var o = r[7];
                    var c = r[8];
                    var l = r[9];
                    var v = r[10];
                    var u = r[11];
                    var s = Math.cos(e);
                    var f = Math.sin(e);
                    t[4] = s * a + f * c;
                    t[5] = s * n + f * l;
                    t[6] = s * i + f * v;
                    t[7] = s * o + f * u;
                    t[8] = s * c - f * a;
                    t[9] = s * l - f * n;
                    t[10] = s * v - f * i;
                    t[11] = s * u - f * o;
                    if (r !== t) {
                        t[0] = r[0];
                        t[1] = r[1];
                        t[2] = r[2];
                        t[3] = r[3];
                        t[12] = r[12];
                        t[13] = r[13];
                        t[14] = r[14];
                        t[15] = r[15];
                    }
                    return t;
                }
                function _(r, e) {
                    e = e || new Float32Array(16);
                    var t = Math.cos(r);
                    var a = Math.sin(r);
                    e[0] = t;
                    e[1] = 0;
                    e[2] = -a;
                    e[3] = 0;
                    e[4] = 0;
                    e[5] = 1;
                    e[6] = 0;
                    e[7] = 0;
                    e[8] = a;
                    e[9] = 0;
                    e[10] = t;
                    e[11] = 0;
                    e[12] = 0;
                    e[13] = 0;
                    e[14] = 0;
                    e[15] = 1;
                    return e;
                }
                function b(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[0 * 4 + 0];
                    var n = r[0 * 4 + 1];
                    var i = r[0 * 4 + 2];
                    var o = r[0 * 4 + 3];
                    var c = r[2 * 4 + 0];
                    var l = r[2 * 4 + 1];
                    var v = r[2 * 4 + 2];
                    var u = r[2 * 4 + 3];
                    var s = Math.cos(e);
                    var f = Math.sin(e);
                    t[0] = s * a - f * c;
                    t[1] = s * n - f * l;
                    t[2] = s * i - f * v;
                    t[3] = s * o - f * u;
                    t[8] = s * c + f * a;
                    t[9] = s * l + f * n;
                    t[10] = s * v + f * i;
                    t[11] = s * u + f * o;
                    if (r !== t) {
                        t[4] = r[4];
                        t[5] = r[5];
                        t[6] = r[6];
                        t[7] = r[7];
                        t[12] = r[12];
                        t[13] = r[13];
                        t[14] = r[14];
                        t[15] = r[15];
                    }
                    return t;
                }
                function x(r, e) {
                    e = e || new Float32Array(16);
                    var t = Math.cos(r);
                    var a = Math.sin(r);
                    e[0] = t;
                    e[1] = a;
                    e[2] = 0;
                    e[3] = 0;
                    e[4] = -a;
                    e[5] = t;
                    e[6] = 0;
                    e[7] = 0;
                    e[8] = 0;
                    e[9] = 0;
                    e[10] = 1;
                    e[11] = 0;
                    e[12] = 0;
                    e[13] = 0;
                    e[14] = 0;
                    e[15] = 1;
                    return e;
                }
                function w(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[0 * 4 + 0];
                    var n = r[0 * 4 + 1];
                    var i = r[0 * 4 + 2];
                    var o = r[0 * 4 + 3];
                    var c = r[1 * 4 + 0];
                    var l = r[1 * 4 + 1];
                    var v = r[1 * 4 + 2];
                    var u = r[1 * 4 + 3];
                    var s = Math.cos(e);
                    var f = Math.sin(e);
                    t[0] = s * a + f * c;
                    t[1] = s * n + f * l;
                    t[2] = s * i + f * v;
                    t[3] = s * o + f * u;
                    t[4] = s * c - f * a;
                    t[5] = s * l - f * n;
                    t[6] = s * v - f * i;
                    t[7] = s * u - f * o;
                    if (r !== t) {
                        t[8] = r[8];
                        t[9] = r[9];
                        t[10] = r[10];
                        t[11] = r[11];
                        t[12] = r[12];
                        t[13] = r[13];
                        t[14] = r[14];
                        t[15] = r[15];
                    }
                    return t;
                }
                function A(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[0];
                    var n = r[1];
                    var i = r[2];
                    var o = Math.sqrt(a * a + n * n + i * i);
                    a /= o;
                    n /= o;
                    i /= o;
                    var c = a * a;
                    var l = n * n;
                    var v = i * i;
                    var u = Math.cos(e);
                    var s = Math.sin(e);
                    var f = 1 - u;
                    t[0] = c + (1 - c) * u;
                    t[1] = a * n * f + i * s;
                    t[2] = a * i * f - n * s;
                    t[3] = 0;
                    t[4] = a * n * f - i * s;
                    t[5] = l + (1 - l) * u;
                    t[6] = n * i * f + a * s;
                    t[7] = 0;
                    t[8] = a * i * f + n * s;
                    t[9] = n * i * f - a * s;
                    t[10] = v + (1 - v) * u;
                    t[11] = 0;
                    t[12] = 0;
                    t[13] = 0;
                    t[14] = 0;
                    t[15] = 1;
                    return t;
                }
                function y(r, e, t, a) {
                    a = a || new Float32Array(16);
                    var n = e[0];
                    var i = e[1];
                    var o = e[2];
                    var c = Math.sqrt(n * n + i * i + o * o);
                    n /= c;
                    i /= c;
                    o /= c;
                    var l = n * n;
                    var v = i * i;
                    var u = o * o;
                    var s = Math.cos(t);
                    var f = Math.sin(t);
                    var d = 1 - s;
                    var g = l + (1 - l) * s;
                    var h = n * i * d + o * f;
                    var p = n * o * d - i * f;
                    var m = n * i * d - o * f;
                    var _ = v + (1 - v) * s;
                    var b = i * o * d + n * f;
                    var x = n * o * d + i * f;
                    var w = i * o * d - n * f;
                    var A = u + (1 - u) * s;
                    var y = r[0];
                    var R = r[1];
                    var T = r[2];
                    var E = r[3];
                    var F = r[4];
                    var L = r[5];
                    var M = r[6];
                    var B = r[7];
                    var S = r[8];
                    var U = r[9];
                    var D = r[10];
                    var P = r[11];
                    a[0] = g * y + h * F + p * S;
                    a[1] = g * R + h * L + p * U;
                    a[2] = g * T + h * M + p * D;
                    a[3] = g * E + h * B + p * P;
                    a[4] = m * y + _ * F + b * S;
                    a[5] = m * R + _ * L + b * U;
                    a[6] = m * T + _ * M + b * D;
                    a[7] = m * E + _ * B + b * P;
                    a[8] = x * y + w * F + A * S;
                    a[9] = x * R + w * L + A * U;
                    a[10] = x * T + w * M + A * D;
                    a[11] = x * E + w * B + A * P;
                    if (r !== a) {
                        a[12] = r[12];
                        a[13] = r[13];
                        a[14] = r[14];
                        a[15] = r[15];
                    }
                    return a;
                }
                function R(r, e, t, a) {
                    a = a || new Float32Array(16);
                    a[0] = r;
                    a[1] = 0;
                    a[2] = 0;
                    a[3] = 0;
                    a[4] = 0;
                    a[5] = e;
                    a[6] = 0;
                    a[7] = 0;
                    a[8] = 0;
                    a[9] = 0;
                    a[10] = t;
                    a[11] = 0;
                    a[12] = 0;
                    a[13] = 0;
                    a[14] = 0;
                    a[15] = 1;
                    return a;
                }
                function T(r, e, t, a, n) {
                    n = n || new Float32Array(16);
                    n[0] = e * r[0 * 4 + 0];
                    n[1] = e * r[0 * 4 + 1];
                    n[2] = e * r[0 * 4 + 2];
                    n[3] = e * r[0 * 4 + 3];
                    n[4] = t * r[1 * 4 + 0];
                    n[5] = t * r[1 * 4 + 1];
                    n[6] = t * r[1 * 4 + 2];
                    n[7] = t * r[1 * 4 + 3];
                    n[8] = a * r[2 * 4 + 0];
                    n[9] = a * r[2 * 4 + 1];
                    n[10] = a * r[2 * 4 + 2];
                    n[11] = a * r[2 * 4 + 3];
                    if (r !== n) {
                        n[12] = r[12];
                        n[13] = r[13];
                        n[14] = r[14];
                        n[15] = r[15];
                    }
                    return n;
                }
                function E(r, e) {
                    e = e || new Float32Array(16);
                    var t = r[0 * 4 + 0];
                    var a = r[0 * 4 + 1];
                    var n = r[0 * 4 + 2];
                    var i = r[0 * 4 + 3];
                    var o = r[1 * 4 + 0];
                    var c = r[1 * 4 + 1];
                    var l = r[1 * 4 + 2];
                    var v = r[1 * 4 + 3];
                    var u = r[2 * 4 + 0];
                    var s = r[2 * 4 + 1];
                    var f = r[2 * 4 + 2];
                    var d = r[2 * 4 + 3];
                    var g = r[3 * 4 + 0];
                    var h = r[3 * 4 + 1];
                    var p = r[3 * 4 + 2];
                    var m = r[3 * 4 + 3];
                    var _ = f * m;
                    var b = p * d;
                    var x = l * m;
                    var w = p * v;
                    var A = l * d;
                    var y = f * v;
                    var R = n * m;
                    var T = p * i;
                    var E = n * d;
                    var F = f * i;
                    var L = n * v;
                    var M = l * i;
                    var B = u * h;
                    var S = g * s;
                    var U = o * h;
                    var D = g * c;
                    var P = o * s;
                    var $ = u * c;
                    var z = t * h;
                    var I = g * a;
                    var O = t * s;
                    var C = u * a;
                    var V = t * c;
                    var N = o * a;
                    var Y = _ * c + w * s + A * h - (b * c + x * s + y * h);
                    var j = b * a + R * s + F * h - (_ * a + T * s + E * h);
                    var X = x * a + T * c + L * h - (w * a + R * c + M * h);
                    var G = y * a + E * c + M * s - (A * a + F * c + L * s);
                    var W = 1 / (t * Y + o * j + u * X + g * G);
                    e[0] = W * Y;
                    e[1] = W * j;
                    e[2] = W * X;
                    e[3] = W * G;
                    e[4] = W * (b * o + x * u + y * g - (_ * o + w * u + A * g));
                    e[5] = W * (_ * t + T * u + E * g - (b * t + R * u + F * g));
                    e[6] = W * (w * t + R * o + M * g - (x * t + T * o + L * g));
                    e[7] = W * (A * t + F * o + L * u - (y * t + E * o + M * u));
                    e[8] = W * (B * v + D * d + P * m - (S * v + U * d + $ * m));
                    e[9] = W * (S * i + z * d + C * m - (B * i + I * d + O * m));
                    e[10] = W * (U * i + I * v + V * m - (D * i + z * v + N * m));
                    e[11] = W * ($ * i + O * v + N * d - (P * i + C * v + V * d));
                    e[12] = W * (U * f + $ * p + S * l - (P * p + B * l + D * f));
                    e[13] = W * (O * p + B * n + I * f - (z * f + C * p + S * n));
                    e[14] = W * (z * l + N * p + D * n - (V * p + U * n + I * l));
                    e[15] = W * (V * f + P * n + C * l - (O * l + N * f + $ * n));
                    return e;
                }
                function F(r, e, t) {
                    t = t || new Float32Array(4);
                    for (var a = 0; a < 4; ++a) {
                        t[a] = 0;
                        for (var n = 0; n < 4; ++n) {
                            t[a] += e[n] * r[n * 4 + a];
                        }
                    }
                    return t;
                }
                function L(r, e, t) {
                    t = t || new Float32Array(3);
                    var a = e[0];
                    var n = e[1];
                    var i = e[2];
                    var o = a * r[0 * 4 + 3] + n * r[1 * 4 + 3] + i * r[2 * 4 + 3] + r[3 * 4 + 3];
                    t[0] = (a * r[0 * 4 + 0] + n * r[1 * 4 + 0] + i * r[2 * 4 + 0] + r[3 * 4 + 0]) / o;
                    t[1] = (a * r[0 * 4 + 1] + n * r[1 * 4 + 1] + i * r[2 * 4 + 1] + r[3 * 4 + 1]) / o;
                    t[2] = (a * r[0 * 4 + 2] + n * r[1 * 4 + 2] + i * r[2 * 4 + 2] + r[3 * 4 + 2]) / o;
                    return t;
                }
                function M(r, e, t) {
                    t = t || new Float32Array(3);
                    var a = e[0];
                    var n = e[1];
                    var i = e[2];
                    t[0] = a * r[0 * 4 + 0] + n * r[1 * 4 + 0] + i * r[2 * 4 + 0];
                    t[1] = a * r[0 * 4 + 1] + n * r[1 * 4 + 1] + i * r[2 * 4 + 1];
                    t[2] = a * r[0 * 4 + 2] + n * r[1 * 4 + 2] + i * r[2 * 4 + 2];
                    return t;
                }
                function B(r, e, t) {
                    t = t || new Float32Array(3);
                    var a = E(r);
                    var n = e[0];
                    var i = e[1];
                    var o = e[2];
                    t[0] = n * a[0 * 4 + 0] + i * a[0 * 4 + 1] + o * a[0 * 4 + 2];
                    t[1] = n * a[1 * 4 + 0] + i * a[1 * 4 + 1] + o * a[1 * 4 + 2];
                    t[2] = n * a[2 * 4 + 0] + i * a[2 * 4 + 1] + o * a[2 * 4 + 2];
                    return t;
                }
                function S(r, e) {
                    e = e || new Float32Array(16);
                    e[0] = r[0];
                    e[1] = r[1];
                    e[2] = r[2];
                    e[3] = r[3];
                    e[4] = r[4];
                    e[5] = r[5];
                    e[6] = r[6];
                    e[7] = r[7];
                    e[8] = r[8];
                    e[9] = r[9];
                    e[10] = r[10];
                    e[11] = r[11];
                    e[12] = r[12];
                    e[13] = r[13];
                    e[14] = r[14];
                    e[15] = r[15];
                    return e;
                }
                return {
                    copy: S,
                    lookAt: u,
                    addVectors: e,
                    subtractVectors: t,
                    distance: c,
                    distanceSq: o,
                    normalize: a,
                    cross: n,
                    dot: i,
                    identity: l,
                    transpose: v,
                    orthographic: f,
                    frustum: d,
                    perspective: s,
                    translation: g,
                    translate: h,
                    xRotation: p,
                    yRotation: _,
                    zRotation: x,
                    xRotate: m,
                    yRotate: b,
                    zRotate: w,
                    axisRotation: A,
                    axisRotate: y,
                    scaling: R,
                    scale: T,
                    multiply: r,
                    inverse: E,
                    transformVector: F,
                    transformPoint: L,
                    transformDirection: M,
                    transformNormal: B
                };
            };
        },
        59: function(r, e, t) {
            "use strict";
            var a = Object.assign || function(r) {
                for (var e = 1; e < arguments.length; e++) {
                    var t = arguments[e];
                    for (var a in t) {
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            r[a] = t[a];
                        }
                    }
                }
                return r;
            };
            var n = t(29);
            var i = m(n);
            var o = t(73);
            var c = m(o);
            var l = t(72);
            var v = m(l);
            var u = t(21);
            var s = t(1);
            var f = m(s);
            var d = t(8);
            var g = m(d);
            var h = t(5);
            var p = m(h);
            function m(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var _ = (0, i.default)();
            var b = typeof window !== "undefined";
            var x = function r(e) {
                console.error("[Easycanvas-webgl] " + e);
            };
            var w = function() {
                var r = {};
                return function(e, t, a, n, i) {
                    var o = "" + t + a + n + i;
                    if (e.singleShader) {
                        o = "singleShader" + t;
                    }
                    if (r[o]) {
                        return r[o];
                    }
                    var c = v.default[e.singleShader ? "final" : "factory"](e, t)(a, n, i);
                    var l = e.createShader(t);
                    e.shaderSource(l, c);
                    e.compileShader(l);
                    if (!e.getShaderParameter(l, e.COMPILE_STATUS)) {
                        var u = e.getShaderInfoLog(l);
                        throw "Could not compile WebGL program. \n\n" + u;
                    }
                    r[o] = l;
                    return l;
                };
            }();
            var A = function r(e, t, a) {
                var n = e.createProgram();
                e.attachShader(n, t);
                e.attachShader(n, a);
                e.linkProgram(n);
                if (!e.getProgramParameter(n, e.LINK_STATUS)) {
                    var i = e.getProgramInfoLog(n);
                    throw "Could not compile WebGL program. \n\n" + i;
                }
                return n;
            };
            var y = function() {
                var r;
                return function(e, t, a, n) {
                    var i = "" + t + a + n;
                    if (e.singleShader) {
                        i = "singleShader";
                    }
                    if (r === i) return;
                    r = i;
                    var o, c;
                    o = w(e, e.VERTEX_SHADER, t, a, n);
                    c = w(e, e.FRAGMENT_SHADER, t, a, n);
                    e.program = A(e, o, c);
                    e.useProgram(e.program);
                    e.positionLocation = e.getAttribLocation(e.program, "a_position");
                    e.normalLocation = e.getAttribLocation(e.program, "a_normal");
                    if (t === 0) {
                        e.colorLocation = e.getAttribLocation(e.program, "a_color");
                    } else {
                        e.texcoordLocation = e.getAttribLocation(e.program, "a_texcoord");
                    }
                    e.sizeLocation = e.getAttribLocation(e.program, "u_size");
                    e.worldViewProjectionLocation = e.getUniformLocation(e.program, "u_worldViewProjection");
                    e.worldInverseTransposeLocation = e.getUniformLocation(e.program, "u_worldInverseTranspose");
                    e.reverseLightDirectionLocation = e.getUniformLocation(e.program, "u_reverseLightDirection");
                    e.vShaderTypeLocation = e.getUniformLocation(e.program, "v_shaderType");
                    e.fShaderTypeLocation = e.getUniformLocation(e.program, "f_shaderType");
                    e.matrixLocation = e.getUniformLocation(e.program, "u_matrix");
                    if (t === 0) {
                        e.textureLocation = e.getUniformLocation(e.program, "u_texture");
                    } else {
                        e.textureMatrixLocation = e.getUniformLocation(e.program, "u_textureMatrix");
                    }
                    e.enableVertexAttribArray(e.positionLocation);
                    a && e.enableVertexAttribArray(e.normalLocation);
                    e.enableVertexAttribArray(e.texcoordLocation);
                    e.enableVertexAttribArray(e.colorLocation);
                };
            }();
            var R = {};
            var T = function r(e, t, a) {
                var n = e.props;
                var i = e.webgl;
                var o = a.$gl;
                if (e.type !== "3d") {
                    if (!n[0] && n.content) {
                        var c = n.content + n.font + n.align + n.color;
                        var l = R[c];
                        if (!l) {
                            var v = o.createTexture();
                            var u = document.createElement("canvas").getContext("2d");
                            u.clearRect(0, 0, u.canvas.width, u.canvas.height);
                            u.canvas.width = n.content.length * parseInt(n.font) * 2;
                            u.canvas.height = parseInt(n.font) + 5;
                            u.font = n.font;
                            u.textAlign = n.align;
                            u.fillStyle = n.color;
                            u.fillText(n.content, n.align === "right" ? u.canvas.width : n.align === "center" ? u.canvas.width / 2 : 0, u.canvas.height - 5);
                            o.bindTexture(o.TEXTURE_2D, v);
                            o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, u.canvas);
                            o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR);
                            o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE);
                            o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
                            l = R[c] = {
                                texture: v,
                                width: u.canvas.width,
                                height: u.canvas.height,
                                img: u.canvas,
                                canvas: u.canvas
                            };
                        }
                        n = [ l, 0, 0, l.canvas.width, l.canvas.height, n.align === "right" ? n.tx - l.canvas.width : n.align === "center" ? n.tx - l.canvas.width / 2 : n.tx, n.ty - l.canvas.height + 5, l.canvas.width, l.canvas.height ];
                    }
                    if (n[0] && n[0].texture) {
                        var s = (0, g.default)(n[5], n[6], n[7], n[8], 0, 0, a.width, a.height, t.beforeRotate && t.beforeRotate[0], t.beforeRotate && t.beforeRotate[1], t.rotate);
                        if (!s) {
                            return;
                        }
                        if (n[0].img.width === 0) return;
                        o.bindTexture(o.TEXTURE_2D, n[0].texture);
                        M(a, n[0].texture, n[0].width, n[0].height, n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], t);
                    }
                } else if (e.type === "3d" && (i.img || i.colors)) {
                    if (i.img && i.img.texture) {
                        o.bindTexture(o.TEXTURE_2D, i.img.texture);
                    }
                    if (i.longSide && !a.webgl.$camera) {
                        var f = i.longSide * 1.8;
                        var d = a.webgl.$depth;
                        var s = (0, g.default)(i.tx - f, i.ty - f, f * 2, f * 2, i.tz / d * a.width / 2, i.tz / d * a.height / 2, a.width - i.tz / d * a.width / 2, a.height - i.tz / d * a.height / 2, 0, 0, 0);
                        if (!s) {
                            return;
                        }
                    }
                    F(a, i);
                }
            };
            function E(r) {
                return r * Math.PI / 180;
            }
            var F = function r(e, t) {
                if ((!t.colors || !t.colors.length) && (!t.textures || !t.textures.length)) return;
                var a = e.$gl;
                if (t.hasAlpha) {
                    a.disable(a.DEPTH_TEST);
                    a.enable(a.BLEND);
                } else {
                    a.enable(a.DEPTH_TEST);
                    a.disable(a.BLEND);
                }
                var n = t.vertices.$cacheBuffer, i, o, c, l, v;
                if (!n) {
                    n = a.createBuffer();
                    a.bindBuffer(a.ARRAY_BUFFER, n);
                    a.bufferData(a.ARRAY_BUFFER, t.vertices, a.STATIC_DRAW);
                    t.vertices.$cacheBuffer = n;
                }
                if (t.colors) {
                    i = t.colors.$cacheBuffer;
                    if (!i) {
                        i = a.createBuffer();
                        a.bindBuffer(a.ARRAY_BUFFER, i);
                        a.bufferData(a.ARRAY_BUFFER, t.colors, a.STATIC_DRAW);
                        t.colors.$cacheBuffer = i;
                    }
                } else {
                    o = t.textures.$cacheBuffer;
                    if (!o) {
                        o = a.createBuffer();
                        a.bindBuffer(a.ARRAY_BUFFER, o);
                        a.bufferData(a.ARRAY_BUFFER, t.textures, a.STATIC_DRAW);
                        t.textures.$cacheBuffer = o;
                    }
                }
                if (t.pointSizes) {
                    v = t.pointSizes.$cacheBuffer;
                    if (!v) {
                        v = a.createBuffer();
                        a.bindBuffer(a.ARRAY_BUFFER, v);
                        a.bufferData(a.ARRAY_BUFFER, t.pointSizes, a.STATIC_DRAW);
                        t.pointSizes.$cacheBuffer = v;
                    }
                }
                if (t.indices) {
                    c = t.indices.$cacheBuffer;
                    if (!c) {
                        c = a.createBuffer();
                        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, c);
                        a.bufferData(a.ELEMENT_ARRAY_BUFFER, t.indices, a.STATIC_DRAW);
                        t.indices.$cacheBuffer = c;
                    }
                }
                if (t.normals) {
                    l = t.normals.$cacheBuffer;
                    if (!l) {
                        l = a.createBuffer();
                        a.bindBuffer(a.ARRAY_BUFFER, l);
                        a.bufferData(a.ARRAY_BUFFER, t.normals, a.STATIC_DRAW);
                        t.normals.$cacheBuffer = l;
                    }
                }
                if (i) {
                    y(a, 0, e.webgl.light, t.primitive);
                    a.bindBuffer(a.ARRAY_BUFFER, i);
                    a.vertexAttribPointer(a.colorLocation, t.hasAlpha ? 4 : 3, a.UNSIGNED_BYTE, true, 0, 0);
                } else if (o) {
                    y(a, 1, e.webgl.light, t.primitive);
                    a.bindBuffer(a.ARRAY_BUFFER, o);
                    a.vertexAttribPointer(a.texcoordLocation, 2, a.FLOAT, false, 0, 0);
                }
                if (t.pointSizes) {
                    a.bindBuffer(a.ARRAY_BUFFER, v);
                    a.vertexAttribPointer(a.sizeLocation, 1, a.FLOAT, false, 0, 0);
                }
                if (t.vertices) {
                    a.bindBuffer(a.ARRAY_BUFFER, n);
                    a.vertexAttribPointer(a.positionLocation, 3, a.FLOAT, false, 0, 0);
                }
                if (t.normals) {
                    a.bindBuffer(a.ARRAY_BUFFER, l);
                    a.vertexAttribPointer(a.normalLocation, 3, a.FLOAT, false, 0, 0);
                }
                if (e.webgl.$fudgeFactor) {
                    var u = a.getUniformLocation(a.program, "u_fudgeFactor");
                    var s = e.webgl.$fudgeFactor;
                    a.uniform1f(u, s);
                }
                var d;
                if (!e.webgl.$camera) {
                    d = a.orthographic;
                } else {
                    d = e.webgl.$camera.viewProjectionMatrix;
                }
                d = _.translate(d, t.tx || 0, t.ty || 0, t.tz || 0);
                t.rx && (d = _.xRotate(d, E(t.rx)));
                t.ry && (d = _.yRotate(d, E(t.ry)));
                t.rz && (d = _.zRotate(d, E(t.rz)));
                d = _.scale(d, (t.scaleX !== 1 ? t.scaleX : t.scale) || 1, (t.scaleY !== 1 ? t.scaleY : t.scale) || 1, (t.scaleZ !== 1 ? t.scaleZ : t.scale) || 1);
                if (e.webgl.light) {
                    a.uniformMatrix4fv(a.worldViewProjectionLocation, false, d);
                    a.uniformMatrix4fv(a.worldInverseTransposeLocation, false, _.transpose(d));
                }
                a.uniformMatrix4fv(a.matrixLocation, false, d);
                if (e.webgl.light) {
                    var g = a.getUniformLocation(a.program, "a_color");
                    a.uniform4fv(g, [ 1, 1, 1, 1 ]);
                    a.uniform3fv(a.reverseLightDirectionLocation, _.normalize([ 0, 1, 0 ]));
                }
                a.uniform1i(a.textureLocation, 0);
                var h = a.getUniformLocation(a.program, "f_shaderType");
                a.uniform1i(h, f.default.firstValuable(t.primitive, 2));
                var p = a.getUniformLocation(a.program, "v_shaderType");
                a.uniform1i(p, f.default.firstValuable(t.primitive, 2));
                if (c) {
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, c);
                    a.drawElements(a.TRIANGLES, t.indices.length, a.UNSIGNED_SHORT, 0);
                } else {
                    a.drawArrays(t.primitive === 0 ? a.POINTS : a.TRIANGLES, 0, t.vertices.length / 3);
                }
            };
            var L;
            var M = function r(e, t, a, n, i, o, c, l, v, u, s, f, d) {
                var g = e.$gl;
                g.enable(g.BLEND);
                g.disable(g.DEPTH_TEST);
                y(g, 1);
                if (!L) {
                    L = g.createBuffer();
                    g.bindBuffer(g.ARRAY_BUFFER, L);
                    var h = [ 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1 ];
                    g.bufferData(g.ARRAY_BUFFER, new Float32Array(h), g.STATIC_DRAW);
                }
                g.bindBuffer(g.ARRAY_BUFFER, L);
                g.vertexAttribPointer(g.positionLocation, 2, g.FLOAT, false, 0, 0);
                g.vertexAttribPointer(g.texcoordLocation, 2, g.FLOAT, false, 0, 0);
                var p = g.orthographic;
                p = _.translate(p, v, u, 0);
                if (d.rotate) {
                    p = _.translate(p, -v + d.beforeRotate[0] || 0, -u + d.beforeRotate[1] || 0, 0);
                    p = _.zRotate(p, d.rotate);
                    p = _.translate(p, v + d.afterRotate[0] || 0, u + d.afterRotate[1] || 0, 0);
                }
                p = _.scale(p, s, f, 1);
                g.uniformMatrix4fv(g.matrixLocation, false, p);
                if (i || o || c !== a || l !== n) {
                    var m = _.translation(i / a, o / n, 0);
                    m = _.scale(m, c / a, l / n, 1);
                    g.uniformMatrix4fv(g.textureMatrixLocation, false, m);
                }
                g.drawArrays(g.TRIANGLES, 0, 6);
            };
            var B = function r(e, t) {
                e.$isWebgl = true;
                e.webgl = {};
                a(e.webgl, t.webgl);
                e.webgl.depth = e.webgl.depth || 1e4;
                e.webgl.singleShader = e.webgl.singleShader || 0;
                e.webgl.camera = e.webgl.camera || {};
                e.webgl.camera.current = e.webgl.camera.current || {};
                e.webgl.camera.target = e.webgl.camera.target || {};
                var n = e.$gl = e.$paintContext;
                n.clearColor(0, 0, 0, 0);
                n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
                y(n, 0);
                {
                    e.imgLoader = function(r, e) {
                        var t = n.createTexture();
                        var a = {
                            width: 0,
                            height: 0
                        };
                        (0, p.default)(r, function(r) {
                            function i(r) {
                                var i = new Image();
                                i.addEventListener("load", function() {
                                    a.width = i.width;
                                    a.height = i.height;
                                    a.texture = t;
                                    a.img = i;
                                    n.bindTexture(n.TEXTURE_2D, t);
                                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR);
                                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE);
                                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
                                    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, i);
                                    e && e(a);
                                });
                                i.src = r;
                            }
                            i(r, e);
                        });
                        return a;
                    };
                }
            };
            var S = function r(e) {
                var t = this;
                if (e.webgl) {
                    this.$paintContext = this.$dom.getContext("webgl", {
                        alpha: true,
                        premultipliedAlpha: false
                    });
                    if (this.$paintContext) {
                        B(this, e);
                        this.on("beforeTick", function() {
                            t.$paintContext.clear(t.$paintContext.COLOR_BUFFER_BIT | t.$paintContext.DEPTH_BUFFER_BIT);
                            t.webgl.$depth = f.default.funcOrValue(f.default.firstValuable(t.webgl.depth, 0), t);
                            t.webgl.$camera = t.webgl.camera.enable ? {} : false;
                            t.webgl.$fudgeFactor = f.default.funcOrValue(f.default.firstValuable(t.webgl.fudgeFactor, 0), t);
                            if (t.webgl.$camera) {
                                var r = t.webgl.camera;
                                var e = t.width / t.height;
                                var a = _.perspective(E(60), e, 1, 1e4);
                                var n = [ f.default.funcOrValue(r.current.x || 0, t), f.default.funcOrValue(r.current.y || 0, t), f.default.funcOrValue(r.current.z || 0, t) ];
                                var i = [ 0, -1, 0 ];
                                if (r.rotate) {
                                    i = [ f.default.funcOrValue(r.rotate.x, t), f.default.funcOrValue(r.rotate.y, t), f.default.funcOrValue(r.rotate.z, t) ];
                                }
                                var o = [ f.default.funcOrValue(r.target.x || 0, t), f.default.funcOrValue(r.target.y || 0, t), f.default.funcOrValue(r.target.z || 0, t) ];
                                var c = _.lookAt(n, o, i);
                                var l = _.inverse(c);
                                var v = _.multiply(a, l);
                                t.webgl.$camera.viewProjectionMatrix = v;
                            }
                            t.$paintContext.orthographic = _.orthographic(0, t.width, t.height, 0, t.webgl.$depth, -t.webgl.$depth);
                            t.$paintContext.singleShader = t.webgl.singleShader;
                        });
                    } else {
                        if (true) {
                            x("Webgl is not supported in current browser, using canvas2d instead.");
                        }
                        if (e.webgl.fallback) {
                            e.webgl.fallback.call(this);
                        }
                    }
                }
            };
            var U = [ "rx", "ry", "rz" ];
            var D = [ "scale", "scaleX", "scaleY", "scaleZ" ];
            var P = U.concat(D);
            var $ = function r() {
                var e = this;
                var t = this.$canvas;
                if (e.webgl && e.webgl.vertices) {
                    e.$rendered = true;
                    if (e.webgl.img) {
                        if (typeof e.webgl.img === "string") {
                            e.webgl.img = t.imgLoader(e.webgl.img);
                        } else if (e.webgl.img.src) {
                            e.webgl.img = t.imgLoader(e.webgl.img.src);
                        }
                    }
                    var a = {
                        tx: e.getStyle("tx"),
                        ty: e.getStyle("ty"),
                        tz: f.default.funcOrValue(e.webgl.tz, e) || 0
                    };
                    for (var n in e.webgl) {
                        a[n] = f.default.funcOrValue(e.webgl[n], e) || 0;
                    }
                    P.forEach(function(r) {
                        a[r] = e.getWebglStyle(r);
                    });
                    var i = {
                        $id: e.$id,
                        type: "3d",
                        webgl: a
                    };
                    if (true) {
                        i.$origin = e;
                    }
                    t.$children.push(i);
                }
            };
            var z = function r(e, t) {
                var a = this;
                if (a.$isWebgl) {
                    T(e, t, a);
                    if (true) {
                        a.$plugin.drawImage(a);
                    }
                    return true;
                }
            };
            var I = function r(e) {
                e.webglShapes = c.default;
                e.sprite.prototype.getWebglStyle = function(r) {
                    var e = this;
                    var t = void 0;
                    if (D.indexOf(r) >= 0) t = 1;
                    if (U.indexOf(r) >= 0) t = 0;
                    if (e.webgl) {
                        t = f.default.funcOrValue(e.webgl[r], e) || t;
                    }
                    if (e.$parent) {
                        if (D.indexOf(r) >= 0) {
                            t *= f.default.firstValuable(e.$parent.getWebglStyle(r), 1);
                        } else if (U.indexOf(r) >= 0) {
                            t += f.default.firstValuable(e.$parent.getWebglStyle(r), 0);
                        }
                    }
                    return t;
                };
                e.sprite.prototype.updateWebglStyle = function(r, e) {
                    var t = this;
                    if (t.webgl && t.webgl[r]) {
                        t.webgl[r].$cacheBuffer = undefined;
                        if (r === "colors" && e) {
                            var a = t.webgl.vertices.length / e.length;
                            t.webgl.colors = new Uint8Array((0, u.arrayRepeat)(e, a));
                        }
                    }
                };
            };
            var O = {
                onCreate: S,
                onPaint: $,
                onRender: z,
                onUse: I
            };
            if (b && window.Easycanvas) {
                Easycanvas.use(O);
            } else {
                r.exports = O;
            }
        },
        68: function(r, e) {
            "use strict";
            r.exports = function(r, e, t) {
                var a = "\n        precision mediump float;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        uniform sampler2D u_texture;\n\n        " + (e && "\n            varying vec3 v_normal;\n            uniform vec3 u_reverseLightDirection;\n        " || "") + "\n\n        void main() {\n            " + (e && "\n                vec3 normal = normalize(v_normal);\n                float light = dot(normal, u_reverseLightDirection);\n            " || "") + "\n\n            " + ([ "gl_FragColor = v_color;", "gl_FragColor = texture2D(u_texture, v_texcoord);" ][r] || "") + "\n\n            " + (t === 0 && "\n                float dist = distance( gl_PointCoord, vec2(0.5) );\n                float alpha = 1.0 - smoothstep(0.45,0.5,dist);\n                gl_FragColor.a *= alpha;\n            " || "") + "\n\n            " + (e && "\n                light += 2.0;\n                light *= 0.5;\n                gl_FragColor.rgb *= light;\n            " || "") + "\n        }\n    ";
                return a;
            };
        },
        69: function(r, e) {
            "use strict";
            r.exports = function(r, e) {
                var t = "\n        precision mediump float;\n\n        uniform int f_shaderType;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        uniform sampler2D u_texture;\n\n        " + (e && "\n            varying vec3 v_normal;\n            uniform vec3 u_reverseLightDirection;\n        " || "") + "\n\n        void main() {\n            " + (e && "\n                vec3 normal = normalize(v_normal);\n                float light = dot(normal, u_reverseLightDirection);\n            " || "") + "\n\n            " + ([ "gl_FragColor = v_color;", "gl_FragColor = texture2D(u_texture, v_texcoord);" ][r] || "") + "\n\n            if (f_shaderType == 0) {\n                float dist = distance( gl_PointCoord, vec2(0.5) );\n                float alpha = 1.0 - smoothstep(0.1,0.5,dist);\n                gl_FragColor.a *= alpha;\n            }\n\n            " + (e && "\n                light += 2.0;\n                light *= 0.5;\n                gl_FragColor.rgb *= light;\n            " || "") + "\n        }\n    ";
                return t;
            };
        },
        70: function(r, e) {
            "use strict";
            r.exports = function(r, e, t) {
                var a = "\n        precision mediump float;\n        attribute vec4 a_position;\n        " + ([ "attribute vec4 a_color;", "attribute vec2 a_texcoord;" ][r] || "") + "\n\n        " + (t === 0 && "\n            attribute float u_size; // 点精灵大小\n        " || "") + "\n\n        " + (e && "\n            attribute vec3 a_normal;\n            uniform mat4 u_worldViewProjection;\n            uniform mat4 u_worldInverseTranspose;\n        " || "") + "\n\n        uniform float u_fudgeFactor; // 透射\n\n        uniform mat4 u_matrix;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        " + (e && "\n            varying vec3 v_normal;\n        " || "") + "\n\n        void main() {\n            // Multiply the position by the matrix.\n            // gl_Position = u_matrix * a_position;\n\n            // 透射\n            // 调整除数\n            vec4 position = u_matrix * a_position;\n            // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor\n            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射\n\n            " + (e ? "gl_Position = u_worldViewProjection * a_position;" : "gl_Position = vec4(position.xy / zToDivideBy, position.zw);") + "\n\n            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);\n\n            " + ([ "v_color = a_color;", "v_texcoord = a_texcoord;" ][r] || "") + "\n\n            " + (t === 0 && "\n                gl_PointSize = u_size;\n            " || "") + "\n\n            " + (e && "\n                v_normal = mat3(u_worldInverseTranspose) * a_normal;\n            " || "") + "\n        }\n    ";
                return a;
            };
        },
        71: function(r, e) {
            "use strict";
            r.exports = function(r, e) {
                var t = "\n        precision mediump float;\n\n        uniform int v_shaderType;\n\n        attribute vec4 a_position;\n        " + ([ "attribute vec4 a_color;", "attribute vec2 a_texcoord;" ][r] || "") + "\n\n        attribute float u_size; // 点精灵大小\n\n        " + (e && "\n            attribute vec3 a_normal;\n            uniform mat4 u_worldViewProjection;\n            uniform mat4 u_worldInverseTranspose;\n        " || "") + "\n\n        uniform float u_fudgeFactor; // 透射\n\n        uniform mat4 u_matrix;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        " + (e && "\n            varying vec3 v_normal;\n        " || "") + "\n\n        void main() {\n            // Multiply the position by the matrix.\n            // gl_Position = u_matrix * a_position;\n\n            // 透射\n            // 调整除数\n            vec4 position = u_matrix * a_position;\n            // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor\n            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射\n\n            " + (e ? "gl_Position = u_worldViewProjection * a_position;" : "gl_Position = vec4(position.xy / zToDivideBy, position.zw);") + "\n\n            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);\n\n            if (v_shaderType == 0) {\n                gl_PointSize = u_size;\n            } else {\n            }\n\n            " + ([ "v_color = a_color;", "v_texcoord = a_texcoord;" ][r] || "") + "\n\n            " + (e && "\n                v_normal = mat3(u_worldInverseTranspose) * a_normal;\n            " || "") + "\n        }\n    ";
                return t;
            };
        },
        72: function(r, e, t) {
            "use strict";
            var a = t(70);
            var n = s(a);
            var i = t(71);
            var o = s(i);
            var c = t(68);
            var l = s(c);
            var v = t(69);
            var u = s(v);
            function s(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            r.exports = {
                factory: function r(e, t) {
                    return t === e.FRAGMENT_SHADER ? l.default : n.default;
                },
                final: function r(e, t) {
                    return t === e.FRAGMENT_SHADER ? u.default : o.default;
                }
            };
        },
        73: function(r, e, t) {
            "use strict";
            var a = Object.assign || function(r) {
                for (var e = 1; e < arguments.length; e++) {
                    var t = arguments[e];
                    for (var a in t) {
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            r[a] = t[a];
                        }
                    }
                }
                return r;
            };
            var n = t(21);
            var i = new Uint16Array([ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23 ]);
            var o = new Float32Array((0, n.arrayRepeat)([ 1, 0, 0, 0, 0, 1, 1, 1 ], 6));
            var c = 6;
            var l = {
                icosahedron: {
                    vertices: [ 0, 0, -1.902, 0, 0, 1.902, -1.701, 0, -.8507, 1.701, 0, .8507, 1.376, -1, -.8507, 1.376, 1, -.8507, -1.376, -1, .8507, -1.376, 1, .8507, -.5257, -1.618, -.8507, -.5257, 1.618, -.8507, .5257, -1.618, .8507, .5257, 1.618, .8507 ],
                    indices: [ [ 1, 11, 7 ], [ 1, 7, 6 ], [ 1, 6, 10 ], [ 1, 10, 3 ], [ 1, 3, 11 ], [ 4, 8, 0 ], [ 5, 4, 0 ], [ 9, 5, 0 ], [ 2, 9, 0 ], [ 8, 2, 0 ], [ 11, 9, 7 ], [ 7, 2, 6 ], [ 6, 8, 10 ], [ 10, 4, 3 ], [ 3, 5, 11 ], [ 4, 10, 8 ], [ 5, 3, 4 ], [ 9, 11, 5 ], [ 2, 7, 9 ], [ 8, 6, 2 ] ]
                },
                tetrahedron: {
                    vertices: [ 0, 0, 1.225, -.5774, -1, -.4082, -.5774, 1, -.4082, 1.155, 0, -.4082 ],
                    indices: [ [ 1, 2, 3 ], [ 2, 1, 0 ], [ 3, 0, 1 ], [ 0, 3, 2 ] ]
                },
                octahedron: {
                    vertices: [ 1, 1, 0, 0, 1, 0, .9510565162951535, 1, .3090169943749474, .9510565162951535, 1, .3090169943749474, 0, 1, 0, .8090169943749475, 1, .5877852522924731, .8090169943749475, 1, .5877852522924731, 0, 1, 0, .5877852522924731, 1, .8090169943749475, .5877852522924731, 1, .8090169943749475, 0, 1, 0, .30901699437494745, 1, .9510565162951535, .30901699437494745, 1, .9510565162951535, 0, 1, 0, 6.123233995736766e-17, 1, 1, 6.123233995736766e-17, 1, 1, 0, 1, 0, -.30901699437494734, 1, .9510565162951536, -.30901699437494734, 1, .9510565162951536, 0, 1, 0, -.587785252292473, 1, .8090169943749475, -.587785252292473, 1, .8090169943749475, 0, 1, 0, -.8090169943749473, 1, .5877852522924732, -.8090169943749473, 1, .5877852522924732, 0, 1, 0, -.9510565162951535, 1, .3090169943749475, -.9510565162951535, 1, .3090169943749475, 0, 1, 0, -1, 1, 1.2246467991473532e-16, -1, 1, 1.2246467991473532e-16, 0, 1, 0, -.9510565162951536, 1, -.3090169943749473, -.9510565162951536, 1, -.3090169943749473, 0, 1, 0, -.8090169943749475, 1, -.587785252292473, -.8090169943749475, 1, -.587785252292473, 0, 1, 0, -.5877852522924732, 1, -.8090169943749473, -.5877852522924732, 1, -.8090169943749473, 0, 1, 0, -.30901699437494756, 1, -.9510565162951535, -.30901699437494756, 1, -.9510565162951535, 0, 1, 0, -1.8369701987210297e-16, 1, -1, -1.8369701987210297e-16, 1, -1, 0, 1, 0, .30901699437494723, 1, -.9510565162951536, .30901699437494723, 1, -.9510565162951536, 0, 1, 0, .5877852522924729, 1, -.8090169943749476, .5877852522924729, 1, -.8090169943749476, 0, 1, 0, .8090169943749473, 1, -.5877852522924734, .8090169943749473, 1, -.5877852522924734, 0, 1, 0, .9510565162951535, 1, -.3090169943749476, .9510565162951535, 1, -.3090169943749476, 0, 1, 0, 1, 1, -2.4492935982947064e-16, .9510565162951535, -1, .3090169943749474, 0, -1, 0, 1, -1, 0, .8090169943749475, -1, .5877852522924731, 0, -1, 0, .9510565162951535, -1, .3090169943749474, .5877852522924731, -1, .8090169943749475, 0, -1, 0, .8090169943749475, -1, .5877852522924731, .30901699437494745, -1, .9510565162951535, 0, -1, 0, .5877852522924731, -1, .8090169943749475, 6.123233995736766e-17, -1, 1, 0, -1, 0, .30901699437494745, -1, .9510565162951535, -.30901699437494734, -1, .9510565162951536, 0, -1, 0, 6.123233995736766e-17, -1, 1, -.587785252292473, -1, .8090169943749475, 0, -1, 0, -.30901699437494734, -1, .9510565162951536, -.8090169943749473, -1, .5877852522924732, 0, -1, 0, -.587785252292473, -1, .8090169943749475, -.9510565162951535, -1, .3090169943749475, 0, -1, 0, -.8090169943749473, -1, .5877852522924732, -1, -1, 1.2246467991473532e-16, 0, -1, 0, -.9510565162951535, -1, .3090169943749475, -.9510565162951536, -1, -.3090169943749473, 0, -1, 0, -1, -1, 1.2246467991473532e-16, -.8090169943749475, -1, -.587785252292473, 0, -1, 0, -.9510565162951536, -1, -.3090169943749473, -.5877852522924732, -1, -.8090169943749473, 0, -1, 0, -.8090169943749475, -1, -.587785252292473, -.30901699437494756, -1, -.9510565162951535, 0, -1, 0, -.5877852522924732, -1, -.8090169943749473, -1.8369701987210297e-16, -1, -1, 0, -1, 0, -.30901699437494756, -1, -.9510565162951535, .30901699437494723, -1, -.9510565162951536, 0, -1, 0, -1.8369701987210297e-16, -1, -1, .5877852522924729, -1, -.8090169943749476, 0, -1, 0, .30901699437494723, -1, -.9510565162951536, .8090169943749473, -1, -.5877852522924734, 0, -1, 0, .5877852522924729, -1, -.8090169943749476, .9510565162951535, -1, -.3090169943749476, 0, -1, 0, .8090169943749473, -1, -.5877852522924734, 1, -1, -2.4492935982947064e-16, 0, -1, 0, .9510565162951535, -1, -.3090169943749476, 1, 1, 0, .9510565162951535, 1, .3090169943749474, .9510565162951535, -1, .3090169943749474, 1, 1, 0, .9510565162951535, -1, .3090169943749474, 1, -1, 0, .9510565162951535, 1, .3090169943749474, .8090169943749475, 1, .5877852522924731, .8090169943749475, -1, .5877852522924731, .9510565162951535, 1, .3090169943749474, .8090169943749475, -1, .5877852522924731, .9510565162951535, -1, .3090169943749474, .8090169943749475, 1, .5877852522924731, .5877852522924731, 1, .8090169943749475, .5877852522924731, -1, .8090169943749475, .8090169943749475, 1, .5877852522924731, .5877852522924731, -1, .8090169943749475, .8090169943749475, -1, .5877852522924731, .5877852522924731, 1, .8090169943749475, .30901699437494745, 1, .9510565162951535, .30901699437494745, -1, .9510565162951535, .5877852522924731, 1, .8090169943749475, .30901699437494745, -1, .9510565162951535, .5877852522924731, -1, .8090169943749475, .30901699437494745, 1, .9510565162951535, 6.123233995736766e-17, 1, 1, 6.123233995736766e-17, -1, 1, .30901699437494745, 1, .9510565162951535, 6.123233995736766e-17, -1, 1, .30901699437494745, -1, .9510565162951535, 6.123233995736766e-17, 1, 1, -.30901699437494734, 1, .9510565162951536, -.30901699437494734, -1, .9510565162951536, 6.123233995736766e-17, 1, 1, -.30901699437494734, -1, .9510565162951536, 6.123233995736766e-17, -1, 1, -.30901699437494734, 1, .9510565162951536, -.587785252292473, 1, .8090169943749475, -.587785252292473, -1, .8090169943749475, -.30901699437494734, 1, .9510565162951536, -.587785252292473, -1, .8090169943749475, -.30901699437494734, -1, .9510565162951536, -.587785252292473, 1, .8090169943749475, -.8090169943749473, 1, .5877852522924732, -.8090169943749473, -1, .5877852522924732, -.587785252292473, 1, .8090169943749475, -.8090169943749473, -1, .5877852522924732, -.587785252292473, -1, .8090169943749475, -.8090169943749473, 1, .5877852522924732, -.9510565162951535, 1, .3090169943749475, -.9510565162951535, -1, .3090169943749475, -.8090169943749473, 1, .5877852522924732, -.9510565162951535, -1, .3090169943749475, -.8090169943749473, -1, .5877852522924732, -.9510565162951535, 1, .3090169943749475, -1, 1, 1.2246467991473532e-16, -1, -1, 1.2246467991473532e-16, -.9510565162951535, 1, .3090169943749475, -1, -1, 1.2246467991473532e-16, -.9510565162951535, -1, .3090169943749475, -1, 1, 1.2246467991473532e-16, -.9510565162951536, 1, -.3090169943749473, -.9510565162951536, -1, -.3090169943749473, -1, 1, 1.2246467991473532e-16, -.9510565162951536, -1, -.3090169943749473, -1, -1, 1.2246467991473532e-16, -.9510565162951536, 1, -.3090169943749473, -.8090169943749475, 1, -.587785252292473, -.8090169943749475, -1, -.587785252292473, -.9510565162951536, 1, -.3090169943749473, -.8090169943749475, -1, -.587785252292473, -.9510565162951536, -1, -.3090169943749473, -.8090169943749475, 1, -.587785252292473, -.5877852522924732, 1, -.8090169943749473, -.5877852522924732, -1, -.8090169943749473, -.8090169943749475, 1, -.587785252292473, -.5877852522924732, -1, -.8090169943749473, -.8090169943749475, -1, -.587785252292473, -.5877852522924732, 1, -.8090169943749473, -.30901699437494756, 1, -.9510565162951535, -.30901699437494756, -1, -.9510565162951535, -.5877852522924732, 1, -.8090169943749473, -.30901699437494756, -1, -.9510565162951535, -.5877852522924732, -1, -.8090169943749473, -.30901699437494756, 1, -.9510565162951535, -1.8369701987210297e-16, 1, -1, -1.8369701987210297e-16, -1, -1, -.30901699437494756, 1, -.9510565162951535, -1.8369701987210297e-16, -1, -1, -.30901699437494756, -1, -.9510565162951535, -1.8369701987210297e-16, 1, -1, .30901699437494723, 1, -.9510565162951536, .30901699437494723, -1, -.9510565162951536, -1.8369701987210297e-16, 1, -1, .30901699437494723, -1, -.9510565162951536, -1.8369701987210297e-16, -1, -1, .30901699437494723, 1, -.9510565162951536, .5877852522924729, 1, -.8090169943749476, .5877852522924729, -1, -.8090169943749476, .30901699437494723, 1, -.9510565162951536, .5877852522924729, -1, -.8090169943749476, .30901699437494723, -1, -.9510565162951536, .5877852522924729, 1, -.8090169943749476, .8090169943749473, 1, -.5877852522924734, .8090169943749473, -1, -.5877852522924734, .5877852522924729, 1, -.8090169943749476, .8090169943749473, -1, -.5877852522924734, .5877852522924729, -1, -.8090169943749476, .8090169943749473, 1, -.5877852522924734, .9510565162951535, 1, -.3090169943749476, .9510565162951535, -1, -.3090169943749476, .8090169943749473, 1, -.5877852522924734, .9510565162951535, -1, -.3090169943749476, .8090169943749473, -1, -.5877852522924734, .9510565162951535, 1, -.3090169943749476, 1, 1, -2.4492935982947064e-16, 1, -1, -2.4492935982947064e-16, .9510565162951535, 1, -.3090169943749476, 1, -1, -2.4492935982947064e-16, .9510565162951535, -1, -.3090169943749476 ],
                    indices: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239 ],
                    normals: [ 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997907, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997894, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.2360679774997885, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, 3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997907, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997894, 0, 0, -3.2360679774997885, 0, 0, -3.2360679774997885, 0, 0, -3.2360679774997885, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 0, -3.23606797749979, 0, 1.578437878668761, 0, .2500000000000002, 1.578437878668761, 0, .2500000000000002, 1.578437878668761, 0, .2500000000000002, 1.578437878668761, 0, .2500000000000002, 1.578437878668761, 0, .2500000000000002, 1.578437878668761, 0, .2500000000000002, 1.4239293814812872, 0, .7255282581475765, 1.4239293814812872, 0, .7255282581475765, 1.4239293814812872, 0, .7255282581475765, 1.4239293814812872, 0, .7255282581475765, 1.4239293814812872, 0, .7255282581475765, 1.4239293814812872, 0, .7255282581475765, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, 1.1300367553350505, 0, 1.1300367553350505, .7255282581475766, 0, 1.4239293814812874, .7255282581475766, 0, 1.4239293814812874, .7255282581475766, 0, 1.4239293814812874, .7255282581475766, 0, 1.4239293814812874, .7255282581475766, 0, 1.4239293814812874, .7255282581475766, 0, 1.4239293814812874, .2500000000000002, 0, 1.578437878668761, .2500000000000002, 0, 1.578437878668761, .2500000000000002, 0, 1.578437878668761, .2500000000000002, 0, 1.578437878668761, .2500000000000002, 0, 1.578437878668761, .2500000000000002, 0, 1.578437878668761, -.2499999999999997, 0, 1.578437878668761, -.2499999999999997, 0, 1.578437878668761, -.2499999999999997, 0, 1.578437878668761, -.2499999999999997, 0, 1.578437878668761, -.2499999999999997, 0, 1.578437878668761, -.2499999999999997, 0, 1.578437878668761, -.725528258147577, 0, 1.423929381481287, -.725528258147577, 0, 1.423929381481287, -.725528258147577, 0, 1.423929381481287, -.725528258147577, 0, 1.423929381481287, -.725528258147577, 0, 1.423929381481287, -.725528258147577, 0, 1.423929381481287, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.1300367553350503, 0, 1.130036755335051, -1.4239293814812868, 0, .7255282581475768, -1.4239293814812868, 0, .7255282581475768, -1.4239293814812868, 0, .7255282581475768, -1.4239293814812868, 0, .7255282581475768, -1.4239293814812868, 0, .7255282581475768, -1.4239293814812868, 0, .7255282581475768, -1.578437878668761, 0, .2500000000000002, -1.578437878668761, 0, .2500000000000002, -1.578437878668761, 0, .2500000000000002, -1.578437878668761, 0, .2500000000000002, -1.578437878668761, 0, .2500000000000002, -1.578437878668761, 0, .2500000000000002, -1.578437878668761, 0, -.2499999999999997, -1.578437878668761, 0, -.2499999999999997, -1.578437878668761, 0, -.2499999999999997, -1.578437878668761, 0, -.2499999999999997, -1.578437878668761, 0, -.2499999999999997, -1.578437878668761, 0, -.2499999999999997, -1.4239293814812868, 0, -.7255282581475768, -1.4239293814812868, 0, -.7255282581475768, -1.4239293814812868, 0, -.7255282581475768, -1.4239293814812868, 0, -.7255282581475768, -1.4239293814812868, 0, -.7255282581475768, -1.4239293814812868, 0, -.7255282581475768, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -1.130036755335051, 0, -1.1300367553350503, -.725528258147577, 0, -1.423929381481287, -.725528258147577, 0, -1.423929381481287, -.725528258147577, 0, -1.423929381481287, -.725528258147577, 0, -1.423929381481287, -.725528258147577, 0, -1.423929381481287, -.725528258147577, 0, -1.423929381481287, -.2500000000000002, 0, -1.578437878668761, -.2500000000000002, 0, -1.578437878668761, -.2500000000000002, 0, -1.578437878668761, -.2500000000000002, 0, -1.578437878668761, -.2500000000000002, 0, -1.578437878668761, -.2500000000000002, 0, -1.578437878668761, .2499999999999997, 0, -1.578437878668761, .2499999999999997, 0, -1.578437878668761, .2499999999999997, 0, -1.578437878668761, .2499999999999997, 0, -1.578437878668761, .2499999999999997, 0, -1.578437878668761, .2499999999999997, 0, -1.578437878668761, .7255282581475766, 0, -1.4239293814812874, .7255282581475766, 0, -1.4239293814812874, .7255282581475766, 0, -1.4239293814812874, .7255282581475766, 0, -1.4239293814812874, .7255282581475766, 0, -1.4239293814812874, .7255282581475766, 0, -1.4239293814812874, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.1300367553350499, 0, -1.130036755335051, 1.4239293814812868, 0, -.7255282581475768, 1.4239293814812868, 0, -.7255282581475768, 1.4239293814812868, 0, -.7255282581475768, 1.4239293814812868, 0, -.7255282581475768, 1.4239293814812868, 0, -.7255282581475768, 1.4239293814812868, 0, -.7255282581475768, 1.578437878668761, 0, -.2500000000000002, 1.578437878668761, 0, -.2500000000000002, 1.578437878668761, 0, -.2500000000000002, 1.578437878668761, 0, -.2500000000000002, 1.578437878668761, 0, -.2500000000000002, 1.578437878668761, 0, -.2500000000000002 ]
                },
                cube: {
                    vertices: [ -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1 ],
                    indices: [ [ 7, 3, 1, 5 ], [ 7, 5, 4, 6 ], [ 7, 6, 2, 3 ], [ 3, 2, 0, 1 ], [ 0, 2, 6, 4 ], [ 1, 0, 4, 5 ] ]
                }
            };
            var v = function() {
                var r = {};
                return function(e, t) {
                    var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                    var c = e + t.join(",") + a.join(",");
                    var v = {};
                    if (e === "quadrilateral") {} else if (e === "block") {
                        var u = t[0] / 2;
                        var s = t[1] / 2;
                        var f = t[2] / 2;
                        var d = r[c + "v"] || new Float32Array([ u, s, f, -u, s, f, -u, -s, f, u, -s, f, u, s, f, u, -s, f, u, -s, -f, u, s, -f, u, s, f, u, s, -f, -u, s, -f, -u, s, f, -u, s, f, -u, s, -f, -u, -s, -f, -u, -s, f, -u, -s, -f, u, -s, -f, u, -s, f, -u, -s, f, u, -s, -f, -u, -s, -f, -u, s, -f, u, s, -f ]);
                        var g = r[c + "l"] || Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, d));
                        v.vertices = r[c + "v"] = d;
                        v.indices = i;
                        v.textures = o;
                        v.longSide = r[c + "l"] = g;
                    } else if (e === "ball") {
                        var h = r[c + "v"] || [];
                        var p = r[c + "i"] || [];
                        var m = r[c + "t"] || [];
                        if (!h.length) {
                            var _ = [];
                            var b = t[0];
                            var x = t[1], w = t[2];
                            for (var A = 0; A <= x; A++) {
                                var y = A * Math.PI / x;
                                var R = Math.sin(y);
                                var T = Math.cos(y);
                                for (var E = 0; E <= w; E++) {
                                    var F = E * 2 * Math.PI / w;
                                    var L = Math.sin(F);
                                    var M = Math.cos(F);
                                    var B = M * R;
                                    var S = T;
                                    var U = L * R;
                                    var D = 1 - E / w;
                                    var P = 1 - A / x;
                                    _.push(B);
                                    _.push(S);
                                    _.push(U);
                                    m.push(D);
                                    m.push(P);
                                    h.push(b * B);
                                    h.push(b * S);
                                    h.push(b * U);
                                }
                            }
                            for (var A = 0; A < x; A++) {
                                for (var E = 0; E < w; E++) {
                                    var $ = A * (w + 1) + E;
                                    var z = $ + w + 1;
                                    p.push($);
                                    p.push(z);
                                    p.push($ + 1);
                                    p.push(z);
                                    p.push(z + 1);
                                    p.push($ + 1);
                                }
                            }
                            r[c + "v"] = new Float32Array(h);
                            r[c + "i"] = new Uint16Array(p);
                            r[c + "t"] = new Float32Array(m);
                            r[c + "l"] = Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, h));
                        }
                        v.vertices = r[c + "v"];
                        v.indices = r[c + "i"];
                        v.textures = r[c + "t"];
                        v.longSide = r[c + "l"];
                    } else {
                        var d = r[c + "v"] || new Float32Array(l[e].vertices.map(function(r) {
                            return r * t[0] / 2;
                        }));
                        var g = r[c + "l"] || Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, d));
                        v.vertices = r[c + "v"] = d;
                        v.indices = new Uint16Array(l[e].indices.join(",").split(","));
                        v.textures = r[c + "t"];
                        if (!v.textures) {
                            v.textures = [];
                            for (var I = 0; I < v.indices.length; I++) {
                                v.textures.push(Math.random().toFixed(2));
                            }
                            v.textures = r[c + "t"] = new Float32Array(v.textures);
                        }
                        v.longSide = r[c + "l"] = g;
                    }
                    if (a.length) {
                        v.colors = r[c + "c"];
                        if (!v.colors) {
                            var O = (v.indices || v.vertices).length / a.length * (v.indices ? 3 : 1);
                            v.colors = new Uint8Array((0, n.arrayRepeat)(a, Math.ceil(O)));
                            r[c + "c"] = v.colors;
                        }
                    }
                    return v;
                };
            }();
            var u = function r(e, t) {
                for (var a in t) {
                    if (!e[a]) {
                        e[a] = t[a];
                    }
                }
                return e;
            };
            var s = function r(e) {
                console.error("[Easycanvas-webgl] " + e);
            };
            var f = {
                block: function r(e) {
                    var t = v("block", [ e.a, e.b, e.c ], e.colors);
                    return u(t, e);
                },
                quadrilateral: function r(e) {
                    var t = v("quadrilateral", [ e.a, e.b, e.c ], e.colors);
                    return u(t, e);
                },
                ball: function r(e) {
                    var t = v("ball", [ e.r, e.b || e.lat || 20, e.b || e.lng || 20 ], e.colors);
                    return u(t, e);
                },
                custom: function r(e) {
                    if (!e.vertices.$cache) {
                        e.vertices.$cache = new Float32Array(e.vertices);
                    }
                    if (e.normals && e.normals.length) {
                        if (!e.normals.$cache) {
                            e.normals.$cache = new Float32Array(e.normals);
                        }
                    }
                    if (e.indices && e.indices.length) {
                        if (!e.indices.$cache) {
                            e.indices.$cache = new Uint16Array(e.indices);
                        }
                    }
                    if (e.textures && e.textures.length) {
                        if (!e.textures.$cache) {
                            var t = e.vertices.length / e.textures.length / 1.5;
                            e.textures.$cache = new Float32Array((0, n.arrayRepeat)(e.textures, t));
                        }
                    }
                    if (e.colors && e.colors.length) {
                        if (!e.colors.$cache) {
                            var t = e.vertices.length / e.colors.length;
                            if (e.hasAlpha) {
                                t = t / 3 * 4;
                            }
                            e.colors.$cache = new Uint8Array((0, n.arrayRepeat)(e.colors, t));
                        }
                    }
                    var i = a(e, {
                        vertices: e.vertices.$cache,
                        normals: e.normals ? e.normals.$cache : undefined,
                        indices: e.indices ? e.indices.$cache : undefined,
                        textures: e.textures ? e.textures.$cache : undefined,
                        colors: e.colors ? e.colors.$cache : undefined
                    });
                    return i;
                }
            };
            var d = function r(e) {
                f[e] = function(r) {
                    var t = v(e, [ r.r ], r.colors);
                    t.type = c;
                    return u(t, r);
                };
            };
            for (var g in l) {
                d(g);
            }
            r.exports = f;
        }
    });
});

