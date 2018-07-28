(function r(e, a) {
    if (typeof exports === "object" && typeof module === "object") module.exports = a(); else if (typeof define === "function" && define.amd) define([], a); else {
        var t = a();
        for (var n in t) (typeof exports === "object" ? exports : e)[n] = t[n];
    }
})(this, function() {
    return function(r) {
        var e = {};
        function a(t) {
            if (e[t]) return e[t].exports;
            var n = e[t] = {
                exports: {},
                id: t,
                loaded: false
            };
            r[t].call(n.exports, n, n.exports, a);
            n.loaded = true;
            return n.exports;
        }
        a.m = r;
        a.c = e;
        a.p = "";
        return a(0);
    }({
        0: function(r, e, a) {
            r.exports = a(59);
        },
        1: function(r, e) {
            "use strict";
            var a = {
                isArray: Array.isArray || function(r) {
                    return Object.prototype.toString.call(r) === "[object Array]";
                },
                funcOrValue: function r(e, a) {
                    if (typeof e === "function") {
                        var t = e.call(a);
                        return t;
                    }
                    return e;
                },
                execFuncs: function r(e, t, n) {
                    if (e) {
                        if (!a.isArray(n)) {
                            n = [ n ];
                        }
                    }
                    if (typeof e === "function") {
                        return e.apply(t, n);
                    } else if (a.isArray(e)) {
                        var o = [];
                        e.forEach(function(r) {
                            o.push(r && r.apply(t, n));
                        });
                        return o;
                    }
                },
                blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
                pointInRect: function r(e, a, t, n, o, i) {
                    return !(e < t || e > n || a < o || a > i);
                },
                firstValuable: function r(e, a, t) {
                    return typeof e === "undefined" ? typeof a === "undefined" ? t : a : e;
                }
            };
            r.exports = a;
        },
        2: function(r, e) {
            "use strict";
            var a = 3.141593;
            r.exports = function(r, e, t, n, o, i) {
                var v = o ? -o / 180 * a : 0;
                var c = r, u = e;
                if (o) {
                    c = (r - t) * Math.cos(v) - (e - n) * Math.sin(v) + t;
                    u = (r - t) * Math.sin(v) + (e - n) * Math.cos(v) + n;
                }
                if (i) {
                    return [ c, u ];
                }
                return {
                    x: c,
                    y: u
                };
            };
        },
        5: function(r, e) {
            "use strict";
            var a = "processing";
            var t = {};
            function n(r, e) {
                if (r && r.match(/^data:/)) {
                    e && e(r);
                    return;
                }
                if (t[r]) {
                    if (t[r] !== a) {
                        e(t[r]);
                    } else {
                        setTimeout(function() {
                            n(r, e);
                        }, 100);
                    }
                    return;
                }
                t[r] = a;
                var o = new XMLHttpRequest();
                o.onload = function() {
                    var a = new FileReader();
                    a.onloadend = function() {
                        t[r] = a.result;
                        e && e(a.result);
                    };
                    a.readAsDataURL(o.response);
                };
                o.open("GET", r);
                o.responseType = "blob";
                o.send();
            }
            r.exports = n;
        },
        7: function(r, e, a) {
            "use strict";
            var t = a(2);
            var n = o(t);
            function o(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var i = 3.141593;
            r.exports = function(r, e, a, t, n, o, v, c, u) {
                var l = u ? -u / 180 * i : 0;
                if (u) {
                    r = (r - v) * Math.cos(u) - (e - c) * Math.sin(u) + v;
                    e = (r - v) * Math.sin(u) + (e - c) * Math.cos(u) + c;
                }
                return r >= a && r <= a + n && e >= t && e <= t + o;
            };
        },
        8: function(r, e, a) {
            "use strict";
            var t = a(2);
            var n = v(t);
            var o = a(7);
            var i = v(o);
            function v(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            r.exports = function(r, e, a, t, n, o, v, c, u, l, s) {
                var f = (0, i.default)(r, e, n, o, v, c, u, l, s) || (0, i.default)(r + a, e, n, o, v, c, u, l, s) || (0, 
                i.default)(r, e + t, n, o, v, c, u, l, s) || (0, i.default)(r + a, e + t, n, o, v, c, u, l, s);
                if (f) return true;
                var d = (0, i.default)(n, o, r, e, a, t, u, l, -s) || (0, i.default)(n + v, o, r, e, a, t, u, l, -s) || (0, 
                i.default)(n, o + c, r, e, a, t, u, l, -s) || (0, i.default)(n + v, o + c, r, e, a, t, u, l, -s);
                if (d) return true;
                return false;
            };
        },
        22: function(r, e) {
            "use strict";
            var a = function r(e, a) {
                var t = e.length;
                var n = new Array(Math.round(t * a));
                for (var o = 0, i = n.length; o < i; o++) {
                    n[o] = e[o % t];
                }
                return n;
            };
            r.exports = {
                arrayRepeat: a
            };
        },
        30: function(r, e) {
            "use strict";
            r.exports = function() {
                "use strict";
                function r(r, e, a) {
                    a = a || new Float32Array(16);
                    var t = e[0 * 4 + 0];
                    var n = e[0 * 4 + 1];
                    var o = e[0 * 4 + 2];
                    var i = e[0 * 4 + 3];
                    var v = e[1 * 4 + 0];
                    var c = e[1 * 4 + 1];
                    var u = e[1 * 4 + 2];
                    var l = e[1 * 4 + 3];
                    var s = e[2 * 4 + 0];
                    var f = e[2 * 4 + 1];
                    var d = e[2 * 4 + 2];
                    var h = e[2 * 4 + 3];
                    var g = e[3 * 4 + 0];
                    var p = e[3 * 4 + 1];
                    var m = e[3 * 4 + 2];
                    var A = e[3 * 4 + 3];
                    var x = r[0 * 4 + 0];
                    var b = r[0 * 4 + 1];
                    var w = r[0 * 4 + 2];
                    var y = r[0 * 4 + 3];
                    var _ = r[1 * 4 + 0];
                    var R = r[1 * 4 + 1];
                    var E = r[1 * 4 + 2];
                    var T = r[1 * 4 + 3];
                    var F = r[2 * 4 + 0];
                    var L = r[2 * 4 + 1];
                    var M = r[2 * 4 + 2];
                    var B = r[2 * 4 + 3];
                    var U = r[3 * 4 + 0];
                    var D = r[3 * 4 + 1];
                    var $ = r[3 * 4 + 2];
                    var P = r[3 * 4 + 3];
                    a[0] = t * x + n * _ + o * F + i * U;
                    a[1] = t * b + n * R + o * L + i * D;
                    a[2] = t * w + n * E + o * M + i * $;
                    a[3] = t * y + n * T + o * B + i * P;
                    a[4] = v * x + c * _ + u * F + l * U;
                    a[5] = v * b + c * R + u * L + l * D;
                    a[6] = v * w + c * E + u * M + l * $;
                    a[7] = v * y + c * T + u * B + l * P;
                    a[8] = s * x + f * _ + d * F + h * U;
                    a[9] = s * b + f * R + d * L + h * D;
                    a[10] = s * w + f * E + d * M + h * $;
                    a[11] = s * y + f * T + d * B + h * P;
                    a[12] = g * x + p * _ + m * F + A * U;
                    a[13] = g * b + p * R + m * L + A * D;
                    a[14] = g * w + p * E + m * M + A * $;
                    a[15] = g * y + p * T + m * B + A * P;
                    return a;
                }
                function e(r, e, a) {
                    a = a || new Float32Array(3);
                    a[0] = r[0] + e[0];
                    a[1] = r[1] + e[1];
                    a[2] = r[2] + e[2];
                    return a;
                }
                function a(r, e, a) {
                    a = a || new Float32Array(3);
                    a[0] = r[0] - e[0];
                    a[1] = r[1] - e[1];
                    a[2] = r[2] - e[2];
                    return a;
                }
                function t(r, e) {
                    e = e || new Float32Array(3);
                    var a = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
                    if (a > 1e-5) {
                        e[0] = r[0] / a;
                        e[1] = r[1] / a;
                        e[2] = r[2] / a;
                    }
                    return e;
                }
                function n(r, e, a) {
                    a = a || new Float32Array(3);
                    a[0] = r[1] * e[2] - r[2] * e[1];
                    a[1] = r[2] * e[0] - r[0] * e[2];
                    a[2] = r[0] * e[1] - r[1] * e[0];
                    return a;
                }
                function o(r, e) {
                    return r[0] * e[0] + r[1] * e[1] + r[2] * e[2];
                }
                function i(r, e) {
                    var a = r[0] - e[0];
                    var t = r[1] - e[1];
                    var n = r[2] - e[2];
                    return a * a + t * t + n * n;
                }
                function v(r, e) {
                    return Math.sqrt(i(r, e));
                }
                function c(r) {
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
                function u(r, e) {
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
                function l(r, e, o, i) {
                    i = i || new Float32Array(16);
                    var v = t(a(r, e));
                    var c = t(n(o, v));
                    var u = t(n(v, c));
                    i[0] = c[0];
                    i[1] = c[1];
                    i[2] = c[2];
                    i[3] = 0;
                    i[4] = u[0];
                    i[5] = u[1];
                    i[6] = u[2];
                    i[7] = 0;
                    i[8] = v[0];
                    i[9] = v[1];
                    i[10] = v[2];
                    i[11] = 0;
                    i[12] = r[0];
                    i[13] = r[1];
                    i[14] = r[2];
                    i[15] = 1;
                    return i;
                }
                function s(r, e, a, t, n) {
                    n = n || new Float32Array(16);
                    var o = Math.tan(Math.PI * .5 - .5 * r);
                    var i = 1 / (a - t);
                    n[0] = o / e;
                    n[1] = 0;
                    n[2] = 0;
                    n[3] = 0;
                    n[4] = 0;
                    n[5] = o;
                    n[6] = 0;
                    n[7] = 0;
                    n[8] = 0;
                    n[9] = 0;
                    n[10] = (a + t) * i;
                    n[11] = -1;
                    n[12] = 0;
                    n[13] = 0;
                    n[14] = a * t * i * 2;
                    n[15] = 0;
                    return n;
                }
                function f(r, e, a, t, n, o, i) {
                    i = i || new Float32Array(16);
                    i[0] = 2 / (e - r);
                    i[1] = 0;
                    i[2] = 0;
                    i[3] = 0;
                    i[4] = 0;
                    i[5] = 2 / (t - a);
                    i[6] = 0;
                    i[7] = 0;
                    i[8] = 0;
                    i[9] = 0;
                    i[10] = 2 / (n - o);
                    i[11] = 0;
                    i[12] = (r + e) / (r - e);
                    i[13] = (a + t) / (a - t);
                    i[14] = (n + o) / (n - o);
                    i[15] = 1;
                    return i;
                }
                function d(r, e, a, t, n, o) {
                    var i = e - r;
                    var v = t - a;
                    var c = o - n;
                    dst[0] = 2 * n / i;
                    dst[1] = 0;
                    dst[2] = 0;
                    dst[3] = 0;
                    dst[4] = 0;
                    dst[5] = 2 * n / v;
                    dst[6] = 0;
                    dst[7] = 0;
                    dst[8] = (r + e) / i;
                    dst[9] = (t + a) / v;
                    dst[10] = -(o + n) / c;
                    dst[11] = -1;
                    dst[12] = 0;
                    dst[13] = 0;
                    dst[14] = -2 * n * o / c;
                    dst[15] = 0;
                    return dst;
                }
                function h(r, e, a, t) {
                    t = t || new Float32Array(16);
                    t[0] = 1;
                    t[1] = 0;
                    t[2] = 0;
                    t[3] = 0;
                    t[4] = 0;
                    t[5] = 1;
                    t[6] = 0;
                    t[7] = 0;
                    t[8] = 0;
                    t[9] = 0;
                    t[10] = 1;
                    t[11] = 0;
                    t[12] = r;
                    t[13] = e;
                    t[14] = a;
                    t[15] = 1;
                    return t;
                }
                function g(r, e, a, t, n) {
                    n = n || new Float32Array(16);
                    var o = r[0];
                    var i = r[1];
                    var v = r[2];
                    var c = r[3];
                    var u = r[1 * 4 + 0];
                    var l = r[1 * 4 + 1];
                    var s = r[1 * 4 + 2];
                    var f = r[1 * 4 + 3];
                    var d = r[2 * 4 + 0];
                    var h = r[2 * 4 + 1];
                    var g = r[2 * 4 + 2];
                    var p = r[2 * 4 + 3];
                    var m = r[3 * 4 + 0];
                    var A = r[3 * 4 + 1];
                    var x = r[3 * 4 + 2];
                    var b = r[3 * 4 + 3];
                    if (r !== n) {
                        n[0] = o;
                        n[1] = i;
                        n[2] = v;
                        n[3] = c;
                        n[4] = u;
                        n[5] = l;
                        n[6] = s;
                        n[7] = f;
                        n[8] = d;
                        n[9] = h;
                        n[10] = g;
                        n[11] = p;
                    }
                    n[12] = o * e + u * a + d * t + m;
                    n[13] = i * e + l * a + h * t + A;
                    n[14] = v * e + s * a + g * t + x;
                    n[15] = c * e + f * a + p * t + b;
                    return n;
                }
                function p(r, e) {
                    e = e || new Float32Array(16);
                    var a = Math.cos(r);
                    var t = Math.sin(r);
                    e[0] = 1;
                    e[1] = 0;
                    e[2] = 0;
                    e[3] = 0;
                    e[4] = 0;
                    e[5] = a;
                    e[6] = t;
                    e[7] = 0;
                    e[8] = 0;
                    e[9] = -t;
                    e[10] = a;
                    e[11] = 0;
                    e[12] = 0;
                    e[13] = 0;
                    e[14] = 0;
                    e[15] = 1;
                    return e;
                }
                function m(r, e, a) {
                    a = a || new Float32Array(16);
                    var t = r[4];
                    var n = r[5];
                    var o = r[6];
                    var i = r[7];
                    var v = r[8];
                    var c = r[9];
                    var u = r[10];
                    var l = r[11];
                    var s = Math.cos(e);
                    var f = Math.sin(e);
                    a[4] = s * t + f * v;
                    a[5] = s * n + f * c;
                    a[6] = s * o + f * u;
                    a[7] = s * i + f * l;
                    a[8] = s * v - f * t;
                    a[9] = s * c - f * n;
                    a[10] = s * u - f * o;
                    a[11] = s * l - f * i;
                    if (r !== a) {
                        a[0] = r[0];
                        a[1] = r[1];
                        a[2] = r[2];
                        a[3] = r[3];
                        a[12] = r[12];
                        a[13] = r[13];
                        a[14] = r[14];
                        a[15] = r[15];
                    }
                    return a;
                }
                function A(r, e) {
                    e = e || new Float32Array(16);
                    var a = Math.cos(r);
                    var t = Math.sin(r);
                    e[0] = a;
                    e[1] = 0;
                    e[2] = -t;
                    e[3] = 0;
                    e[4] = 0;
                    e[5] = 1;
                    e[6] = 0;
                    e[7] = 0;
                    e[8] = t;
                    e[9] = 0;
                    e[10] = a;
                    e[11] = 0;
                    e[12] = 0;
                    e[13] = 0;
                    e[14] = 0;
                    e[15] = 1;
                    return e;
                }
                function x(r, e, a) {
                    a = a || new Float32Array(16);
                    var t = r[0 * 4 + 0];
                    var n = r[0 * 4 + 1];
                    var o = r[0 * 4 + 2];
                    var i = r[0 * 4 + 3];
                    var v = r[2 * 4 + 0];
                    var c = r[2 * 4 + 1];
                    var u = r[2 * 4 + 2];
                    var l = r[2 * 4 + 3];
                    var s = Math.cos(e);
                    var f = Math.sin(e);
                    a[0] = s * t - f * v;
                    a[1] = s * n - f * c;
                    a[2] = s * o - f * u;
                    a[3] = s * i - f * l;
                    a[8] = s * v + f * t;
                    a[9] = s * c + f * n;
                    a[10] = s * u + f * o;
                    a[11] = s * l + f * i;
                    if (r !== a) {
                        a[4] = r[4];
                        a[5] = r[5];
                        a[6] = r[6];
                        a[7] = r[7];
                        a[12] = r[12];
                        a[13] = r[13];
                        a[14] = r[14];
                        a[15] = r[15];
                    }
                    return a;
                }
                function b(r, e) {
                    e = e || new Float32Array(16);
                    var a = Math.cos(r);
                    var t = Math.sin(r);
                    e[0] = a;
                    e[1] = t;
                    e[2] = 0;
                    e[3] = 0;
                    e[4] = -t;
                    e[5] = a;
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
                function w(r, e, a) {
                    a = a || new Float32Array(16);
                    var t = r[0 * 4 + 0];
                    var n = r[0 * 4 + 1];
                    var o = r[0 * 4 + 2];
                    var i = r[0 * 4 + 3];
                    var v = r[1 * 4 + 0];
                    var c = r[1 * 4 + 1];
                    var u = r[1 * 4 + 2];
                    var l = r[1 * 4 + 3];
                    var s = Math.cos(e);
                    var f = Math.sin(e);
                    a[0] = s * t + f * v;
                    a[1] = s * n + f * c;
                    a[2] = s * o + f * u;
                    a[3] = s * i + f * l;
                    a[4] = s * v - f * t;
                    a[5] = s * c - f * n;
                    a[6] = s * u - f * o;
                    a[7] = s * l - f * i;
                    if (r !== a) {
                        a[8] = r[8];
                        a[9] = r[9];
                        a[10] = r[10];
                        a[11] = r[11];
                        a[12] = r[12];
                        a[13] = r[13];
                        a[14] = r[14];
                        a[15] = r[15];
                    }
                    return a;
                }
                function y(r, e, a) {
                    a = a || new Float32Array(16);
                    var t = r[0];
                    var n = r[1];
                    var o = r[2];
                    var i = Math.sqrt(t * t + n * n + o * o);
                    t /= i;
                    n /= i;
                    o /= i;
                    var v = t * t;
                    var c = n * n;
                    var u = o * o;
                    var l = Math.cos(e);
                    var s = Math.sin(e);
                    var f = 1 - l;
                    a[0] = v + (1 - v) * l;
                    a[1] = t * n * f + o * s;
                    a[2] = t * o * f - n * s;
                    a[3] = 0;
                    a[4] = t * n * f - o * s;
                    a[5] = c + (1 - c) * l;
                    a[6] = n * o * f + t * s;
                    a[7] = 0;
                    a[8] = t * o * f + n * s;
                    a[9] = n * o * f - t * s;
                    a[10] = u + (1 - u) * l;
                    a[11] = 0;
                    a[12] = 0;
                    a[13] = 0;
                    a[14] = 0;
                    a[15] = 1;
                    return a;
                }
                function _(r, e, a, t) {
                    t = t || new Float32Array(16);
                    var n = e[0];
                    var o = e[1];
                    var i = e[2];
                    var v = Math.sqrt(n * n + o * o + i * i);
                    n /= v;
                    o /= v;
                    i /= v;
                    var c = n * n;
                    var u = o * o;
                    var l = i * i;
                    var s = Math.cos(a);
                    var f = Math.sin(a);
                    var d = 1 - s;
                    var h = c + (1 - c) * s;
                    var g = n * o * d + i * f;
                    var p = n * i * d - o * f;
                    var m = n * o * d - i * f;
                    var A = u + (1 - u) * s;
                    var x = o * i * d + n * f;
                    var b = n * i * d + o * f;
                    var w = o * i * d - n * f;
                    var y = l + (1 - l) * s;
                    var _ = r[0];
                    var R = r[1];
                    var E = r[2];
                    var T = r[3];
                    var F = r[4];
                    var L = r[5];
                    var M = r[6];
                    var B = r[7];
                    var U = r[8];
                    var D = r[9];
                    var $ = r[10];
                    var P = r[11];
                    t[0] = h * _ + g * F + p * U;
                    t[1] = h * R + g * L + p * D;
                    t[2] = h * E + g * M + p * $;
                    t[3] = h * T + g * B + p * P;
                    t[4] = m * _ + A * F + x * U;
                    t[5] = m * R + A * L + x * D;
                    t[6] = m * E + A * M + x * $;
                    t[7] = m * T + A * B + x * P;
                    t[8] = b * _ + w * F + y * U;
                    t[9] = b * R + w * L + y * D;
                    t[10] = b * E + w * M + y * $;
                    t[11] = b * T + w * B + y * P;
                    if (r !== t) {
                        t[12] = r[12];
                        t[13] = r[13];
                        t[14] = r[14];
                        t[15] = r[15];
                    }
                    return t;
                }
                function R(r, e, a, t) {
                    t = t || new Float32Array(16);
                    t[0] = r;
                    t[1] = 0;
                    t[2] = 0;
                    t[3] = 0;
                    t[4] = 0;
                    t[5] = e;
                    t[6] = 0;
                    t[7] = 0;
                    t[8] = 0;
                    t[9] = 0;
                    t[10] = a;
                    t[11] = 0;
                    t[12] = 0;
                    t[13] = 0;
                    t[14] = 0;
                    t[15] = 1;
                    return t;
                }
                function E(r, e, a, t, n) {
                    n = n || new Float32Array(16);
                    n[0] = e * r[0 * 4 + 0];
                    n[1] = e * r[0 * 4 + 1];
                    n[2] = e * r[0 * 4 + 2];
                    n[3] = e * r[0 * 4 + 3];
                    n[4] = a * r[1 * 4 + 0];
                    n[5] = a * r[1 * 4 + 1];
                    n[6] = a * r[1 * 4 + 2];
                    n[7] = a * r[1 * 4 + 3];
                    n[8] = t * r[2 * 4 + 0];
                    n[9] = t * r[2 * 4 + 1];
                    n[10] = t * r[2 * 4 + 2];
                    n[11] = t * r[2 * 4 + 3];
                    if (r !== n) {
                        n[12] = r[12];
                        n[13] = r[13];
                        n[14] = r[14];
                        n[15] = r[15];
                    }
                    return n;
                }
                function T(r, e) {
                    e = e || new Float32Array(16);
                    var a = r[0 * 4 + 0];
                    var t = r[0 * 4 + 1];
                    var n = r[0 * 4 + 2];
                    var o = r[0 * 4 + 3];
                    var i = r[1 * 4 + 0];
                    var v = r[1 * 4 + 1];
                    var c = r[1 * 4 + 2];
                    var u = r[1 * 4 + 3];
                    var l = r[2 * 4 + 0];
                    var s = r[2 * 4 + 1];
                    var f = r[2 * 4 + 2];
                    var d = r[2 * 4 + 3];
                    var h = r[3 * 4 + 0];
                    var g = r[3 * 4 + 1];
                    var p = r[3 * 4 + 2];
                    var m = r[3 * 4 + 3];
                    var A = f * m;
                    var x = p * d;
                    var b = c * m;
                    var w = p * u;
                    var y = c * d;
                    var _ = f * u;
                    var R = n * m;
                    var E = p * o;
                    var T = n * d;
                    var F = f * o;
                    var L = n * u;
                    var M = c * o;
                    var B = l * g;
                    var U = h * s;
                    var D = i * g;
                    var $ = h * v;
                    var P = i * s;
                    var S = l * v;
                    var I = a * g;
                    var O = h * t;
                    var V = a * s;
                    var C = l * t;
                    var N = a * v;
                    var Y = i * t;
                    var z = A * v + w * s + y * g - (x * v + b * s + _ * g);
                    var X = x * t + R * s + F * g - (A * t + E * s + T * g);
                    var G = b * t + E * v + L * g - (w * t + R * v + M * g);
                    var W = _ * t + T * v + M * s - (y * t + F * v + L * s);
                    var j = 1 / (a * z + i * X + l * G + h * W);
                    e[0] = j * z;
                    e[1] = j * X;
                    e[2] = j * G;
                    e[3] = j * W;
                    e[4] = j * (x * i + b * l + _ * h - (A * i + w * l + y * h));
                    e[5] = j * (A * a + E * l + T * h - (x * a + R * l + F * h));
                    e[6] = j * (w * a + R * i + M * h - (b * a + E * i + L * h));
                    e[7] = j * (y * a + F * i + L * l - (_ * a + T * i + M * l));
                    e[8] = j * (B * u + $ * d + P * m - (U * u + D * d + S * m));
                    e[9] = j * (U * o + I * d + C * m - (B * o + O * d + V * m));
                    e[10] = j * (D * o + O * u + N * m - ($ * o + I * u + Y * m));
                    e[11] = j * (S * o + V * u + Y * d - (P * o + C * u + N * d));
                    e[12] = j * (D * f + S * p + U * c - (P * p + B * c + $ * f));
                    e[13] = j * (V * p + B * n + O * f - (I * f + C * p + U * n));
                    e[14] = j * (I * c + Y * p + $ * n - (N * p + D * n + O * c));
                    e[15] = j * (N * f + P * n + C * c - (V * c + Y * f + S * n));
                    return e;
                }
                function F(r, e, a) {
                    a = a || new Float32Array(4);
                    for (var t = 0; t < 4; ++t) {
                        a[t] = 0;
                        for (var n = 0; n < 4; ++n) {
                            a[t] += e[n] * r[n * 4 + t];
                        }
                    }
                    return a;
                }
                function L(r, e, a) {
                    a = a || new Float32Array(3);
                    var t = e[0];
                    var n = e[1];
                    var o = e[2];
                    var i = t * r[0 * 4 + 3] + n * r[1 * 4 + 3] + o * r[2 * 4 + 3] + r[3 * 4 + 3];
                    a[0] = (t * r[0 * 4 + 0] + n * r[1 * 4 + 0] + o * r[2 * 4 + 0] + r[3 * 4 + 0]) / i;
                    a[1] = (t * r[0 * 4 + 1] + n * r[1 * 4 + 1] + o * r[2 * 4 + 1] + r[3 * 4 + 1]) / i;
                    a[2] = (t * r[0 * 4 + 2] + n * r[1 * 4 + 2] + o * r[2 * 4 + 2] + r[3 * 4 + 2]) / i;
                    return a;
                }
                function M(r, e, a) {
                    a = a || new Float32Array(3);
                    var t = e[0];
                    var n = e[1];
                    var o = e[2];
                    a[0] = t * r[0 * 4 + 0] + n * r[1 * 4 + 0] + o * r[2 * 4 + 0];
                    a[1] = t * r[0 * 4 + 1] + n * r[1 * 4 + 1] + o * r[2 * 4 + 1];
                    a[2] = t * r[0 * 4 + 2] + n * r[1 * 4 + 2] + o * r[2 * 4 + 2];
                    return a;
                }
                function B(r, e, a) {
                    a = a || new Float32Array(3);
                    var t = T(r);
                    var n = e[0];
                    var o = e[1];
                    var i = e[2];
                    a[0] = n * t[0 * 4 + 0] + o * t[0 * 4 + 1] + i * t[0 * 4 + 2];
                    a[1] = n * t[1 * 4 + 0] + o * t[1 * 4 + 1] + i * t[1 * 4 + 2];
                    a[2] = n * t[2 * 4 + 0] + o * t[2 * 4 + 1] + i * t[2 * 4 + 2];
                    return a;
                }
                function U(r, e) {
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
                    copy: U,
                    lookAt: l,
                    addVectors: e,
                    subtractVectors: a,
                    distance: v,
                    distanceSq: i,
                    normalize: t,
                    cross: n,
                    dot: o,
                    identity: c,
                    transpose: u,
                    orthographic: f,
                    frustum: d,
                    perspective: s,
                    translation: h,
                    translate: g,
                    xRotation: p,
                    yRotation: A,
                    zRotation: b,
                    xRotate: m,
                    yRotate: x,
                    zRotate: w,
                    axisRotation: y,
                    axisRotate: _,
                    scaling: R,
                    scale: E,
                    multiply: r,
                    inverse: T,
                    transformVector: F,
                    transformPoint: L,
                    transformDirection: M,
                    transformNormal: B
                };
            };
        },
        59: function(r, e, a) {
            "use strict";
            var t = Object.assign || function(r) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = arguments[e];
                    for (var t in a) {
                        if (Object.prototype.hasOwnProperty.call(a, t)) {
                            r[t] = a[t];
                        }
                    }
                }
                return r;
            };
            var n = a(30);
            var o = m(n);
            var i = a(69);
            var v = m(i);
            var c = a(68);
            var u = m(c);
            var l = a(22);
            var s = a(1);
            var f = m(s);
            var d = a(8);
            var h = m(d);
            var g = a(5);
            var p = m(g);
            function m(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var A = (0, o.default)();
            var x = typeof window !== "undefined";
            var b = function r(e) {
                console.error("[Easycanvas-webgl] " + e);
            };
            var w = function() {
                var r = {};
                return function(e, a, t, n) {
                    var o = "" + a + t + n;
                    if (r[o]) {
                        return r[o];
                    }
                    var i = u.default.factory(e, a)(t, n);
                    var v = e.createShader(a);
                    e.shaderSource(v, i);
                    e.compileShader(v);
                    if (!e.getShaderParameter(v, e.COMPILE_STATUS)) {
                        var c = e.getShaderInfoLog(v);
                        throw "Could not compile WebGL program. \n\n" + c;
                    }
                    r[o] = v;
                    return v;
                };
            }();
            var y = function r(e, a, t) {
                var n = e.createProgram();
                e.attachShader(n, a);
                e.attachShader(n, t);
                e.linkProgram(n);
                if (!e.getProgramParameter(n, e.LINK_STATUS)) {
                    var o = e.getProgramInfoLog(n);
                    throw "Could not compile WebGL program. \n\n" + o;
                }
                return n;
            };
            var _ = function() {
                var r;
                return function(e, a, t) {
                    if (r === a) return;
                    r = a;
                    var n, o;
                    n = w(e, e.VERTEX_SHADER, a, t);
                    o = w(e, e.FRAGMENT_SHADER, a, t);
                    e.program = y(e, n, o);
                    e.useProgram(e.program);
                    e.positionLocation = e.getAttribLocation(e.program, "a_position");
                    e.normalLocation = e.getAttribLocation(e.program, "a_normal");
                    if (a === 0) {
                        e.colorLocation = e.getAttribLocation(e.program, "a_color");
                    } else {
                        e.texcoordLocation = e.getAttribLocation(e.program, "a_texcoord");
                    }
                    e.worldViewProjectionLocation = e.getUniformLocation(e.program, "u_worldViewProjection");
                    e.worldInverseTransposeLocation = e.getUniformLocation(e.program, "u_worldInverseTranspose");
                    e.reverseLightDirectionLocation = e.getUniformLocation(e.program, "u_reverseLightDirection");
                    e.matrixLocation = e.getUniformLocation(e.program, "u_matrix");
                    if (a === 0) {
                        e.textureLocation = e.getUniformLocation(e.program, "u_texture");
                    } else {
                        e.textureMatrixLocation = e.getUniformLocation(e.program, "u_textureMatrix");
                    }
                    e.enableVertexAttribArray(e.positionLocation);
                    t && e.enableVertexAttribArray(e.normalLocation);
                    e.enableVertexAttribArray(e.texcoordLocation);
                    e.enableVertexAttribArray(e.colorLocation);
                };
            }();
            var R = {};
            var E = function r(e, a, t) {
                var n = e.props;
                var o = e.webgl;
                var i = t.$gl;
                if (true) {
                    if (n && n[0] && !n[0].texture && n[0].src) {
                        b("Texture not found, make sure using Painter.imgLoader instead of Easycanvas.imgLoader.");
                    }
                }
                if (e.type !== "3d") {
                    if (!n[0] && n.content) {
                        var v = n.content + n.font + n.align + n.color;
                        var c = R[v];
                        if (!c) {
                            var u = i.createTexture();
                            var l = document.createElement("canvas").getContext("2d");
                            l.clearRect(0, 0, l.canvas.width, l.canvas.height);
                            l.canvas.width = n.content.length * parseInt(n.font) * 2;
                            l.canvas.height = parseInt(n.font) + 5;
                            l.font = n.font;
                            l.textAlign = n.align;
                            l.fillStyle = n.color;
                            l.fillText(n.content, n.align === "right" ? l.canvas.width : n.align === "center" ? l.canvas.width / 2 : 0, l.canvas.height - 5);
                            i.bindTexture(i.TEXTURE_2D, u);
                            i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, l.canvas);
                            i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR);
                            i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE);
                            i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
                            c = R[v] = {
                                texture: u,
                                width: l.canvas.width,
                                height: l.canvas.height,
                                img: l.canvas,
                                canvas: l.canvas
                            };
                        }
                        n = [ c, 0, 0, c.canvas.width, c.canvas.height, n.align === "right" ? n.tx - c.canvas.width : n.align === "center" ? n.tx - c.canvas.width / 2 : n.tx, n.ty - c.canvas.height + 5, c.canvas.width, c.canvas.height ];
                    }
                    if (n[0] && n[0].texture) {
                        var s = (0, h.default)(n[5], n[6], n[7], n[8], 0, 0, t.width, t.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], a.rotate);
                        if (!s) {
                            return;
                        }
                        if (n[0].img.width === 0) return;
                        i.bindTexture(i.TEXTURE_2D, n[0].texture);
                        M(t, n[0].texture, n[0].width, n[0].height, n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], a);
                    }
                } else if (e.type === "3d" && (o.img || o.colors)) {
                    if (o.img && o.img.texture) {
                        i.bindTexture(i.TEXTURE_2D, o.img.texture);
                    }
                    if (o.longSide) {
                        var f = o.longSide * 1.8;
                        var d = t.webgl.$depth;
                        var s = (0, h.default)(o.tx - f, o.ty - f, f * 2, f * 2, o.tz / d * t.width / 2, o.tz / d * t.height / 2, t.width - o.tz / d * t.width / 2, t.height - o.tz / d * t.height / 2, 0, 0, 0);
                        if (!s) {
                            return;
                        }
                    }
                    F(t, o);
                }
            };
            function T(r) {
                return r * Math.PI / 180;
            }
            var F = function r(e, a) {
                if ((!a.colors || !a.colors.length) && (!a.textures || !a.textures.length)) return;
                var t = e.$gl;
                t.enable(t.BLEND);
                t.enable(t.DEPTH_TEST);
                if (a.opacity) {
                    t.disable(t.DEPTH_TEST);
                }
                var n = a.vertices.$cacheBuffer, o, i, v, c;
                if (!n) {
                    n = t.createBuffer();
                    t.bindBuffer(t.ARRAY_BUFFER, n);
                    t.bufferData(t.ARRAY_BUFFER, a.vertices, t.STATIC_DRAW);
                    a.vertices.$cacheBuffer = n;
                }
                if (a.colors) {
                    o = a.colors.$cacheBuffer;
                    if (!o) {
                        o = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, o);
                        t.bufferData(t.ARRAY_BUFFER, a.colors, t.STATIC_DRAW);
                        a.colors.$cacheBuffer = o;
                    }
                } else {
                    i = a.textures.$cacheBuffer;
                    if (!i) {
                        i = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, i);
                        t.bufferData(t.ARRAY_BUFFER, a.textures, t.STATIC_DRAW);
                        a.textures.$cacheBuffer = i;
                    }
                }
                if (a.indices) {
                    v = a.indices.$cacheBuffer;
                    if (!v) {
                        v = t.createBuffer();
                        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v);
                        t.bufferData(t.ELEMENT_ARRAY_BUFFER, a.indices, t.STATIC_DRAW);
                        a.indices.$cacheBuffer = v;
                    }
                }
                if (a.normals) {
                    c = a.normals.$cacheBuffer;
                    if (!c) {
                        c = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, c);
                        t.bufferData(t.ARRAY_BUFFER, a.normals, t.STATIC_DRAW);
                        a.normals.$cacheBuffer = c;
                    }
                }
                if (o) {
                    _(t, 0, e.webgl.light);
                    t.bindBuffer(t.ARRAY_BUFFER, o);
                    var u = 3;
                    var l = t.UNSIGNED_BYTE;
                    var s = true;
                    var d = 0;
                    var h = 0;
                    t.vertexAttribPointer(t.colorLocation, u, l, s, d, h);
                } else if (i) {
                    _(t, 1, e.webgl.light);
                    t.bindBuffer(t.ARRAY_BUFFER, i);
                    var u = 2;
                    var l = t.FLOAT;
                    var s = false;
                    var d = 0;
                    var h = 0;
                    t.vertexAttribPointer(t.texcoordLocation, u, l, s, d, h);
                }
                if (a.vertices) {
                    t.bindBuffer(t.ARRAY_BUFFER, n);
                    var u = 3;
                    var l = t.FLOAT;
                    var s = false;
                    var d = 0;
                    var h = 0;
                    t.vertexAttribPointer(t.positionLocation, u, l, s, d, h);
                }
                if (a.normals) {
                    t.bindBuffer(t.ARRAY_BUFFER, c);
                    var u = 3;
                    var l = t.FLOAT;
                    var s = false;
                    var d = 0;
                    var h = 0;
                    t.vertexAttribPointer(t.normalLocation, u, l, s, d, h);
                }
                if (e.webgl.$fudgeFactor) {
                    var g = t.getUniformLocation(t.program, "u_fudgeFactor");
                    var p = e.webgl.$fudgeFactor;
                    t.uniform1f(g, p);
                }
                {
                    var m = t.orthographic;
                    m = A.translate(m, a.tx || 0, a.ty || 0, a.tz || 0);
                    m = A.xRotate(m, T(a.rx) || 0);
                    m = A.yRotate(m, T(a.ry) || 0);
                    m = A.zRotate(m, T(a.rz) || 0);
                    m = A.scale(m, (a.scaleX !== 1 ? a.scaleX : a.scale) || 1, (a.scaleY !== 1 ? a.scaleY : a.scale) || 1, (a.scaleZ !== 1 ? a.scaleZ : a.scale) || 1);
                    var x = m;
                }
                if (e.webgl.camera) {
                    var b = [ T(f.default.funcOrValue(e.webgl.camera.rx || 0, e)), T(f.default.funcOrValue(e.webgl.camera.ry || 0, e)), 1 ];
                    var w = [ 0, 1, 0 ];
                    var y = A.lookAt(b, x, w);
                    var R = A.inverse(y);
                    var x = A.multiply(x, R);
                }
                if (e.webgl.light) {
                    t.uniformMatrix4fv(t.worldViewProjectionLocation, false, m);
                    t.uniformMatrix4fv(t.worldInverseTransposeLocation, false, A.transpose(x));
                }
                t.uniformMatrix4fv(t.matrixLocation, false, x);
                if (e.webgl.light) {
                    var E = t.getUniformLocation(t.program, "a_color");
                    t.uniform4fv(E, [ 1, 1, 1, 1 ]);
                    t.uniform3fv(t.reverseLightDirectionLocation, A.normalize([ 0, 1, 0 ]));
                }
                t.uniform1i(t.textureLocation, 0);
                if (v) {
                    t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v);
                    t.drawElements(t.TRIANGLES, a.indices.length, t.UNSIGNED_SHORT, 0);
                } else {
                    t.drawArrays(t.TRIANGLES, 0, a.vertices.length / 3);
                }
            };
            var L;
            var M = function r(e, a, t, n, o, i, v, c, u, l, s, f, d) {
                var h = e.$gl;
                h.enable(h.BLEND);
                h.disable(h.DEPTH_TEST);
                _(h, 1);
                if (!L) {
                    L = h.createBuffer();
                    h.bindBuffer(h.ARRAY_BUFFER, L);
                    var g = [ 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1 ];
                    h.bufferData(h.ARRAY_BUFFER, new Float32Array(g), h.STATIC_DRAW);
                }
                h.bindBuffer(h.ARRAY_BUFFER, L);
                h.vertexAttribPointer(h.positionLocation, 2, h.FLOAT, false, 0, 0);
                h.vertexAttribPointer(h.texcoordLocation, 2, h.FLOAT, false, 0, 0);
                var p = h.orthographic;
                p = A.translate(p, u, l, 0);
                if (d.rotate) {
                    p = A.translate(p, -u + d.beforeRotate[0] || 0, -l + d.beforeRotate[1] || 0, 0);
                    p = A.zRotate(p, d.rotate);
                    p = A.translate(p, u + d.afterRotate[0] || 0, l + d.afterRotate[1] || 0, 0);
                }
                p = A.scale(p, s, f, 1);
                h.uniformMatrix4fv(h.matrixLocation, false, p);
                if (o || i || v !== t || c !== n) {
                    var m = A.translation(o / t, i / n, 0);
                    m = A.scale(m, v / t, c / n, 1);
                    h.uniformMatrix4fv(h.textureMatrixLocation, false, m);
                }
                h.drawArrays(h.TRIANGLES, 0, 6);
            };
            var B = function r(e, a) {
                e.$isWebgl = true;
                e.webgl = {};
                t(e.webgl, a.webgl);
                e.webgl.depth = e.webgl.depth || 1e4;
                var n = e.$gl = e.$paintContext;
                n.clearColor(0, 0, 0, 0);
                n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
                _(n, 0);
                {
                    e.imgLoader = function(r, e) {
                        var a = n.createTexture();
                        var t = {
                            width: 0,
                            height: 0
                        };
                        (0, p.default)(r, function(r) {
                            function o(r) {
                                var o = new Image();
                                o.addEventListener("load", function() {
                                    t.width = o.width;
                                    t.height = o.height;
                                    t.texture = a;
                                    t.img = o;
                                    n.bindTexture(n.TEXTURE_2D, a);
                                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR);
                                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE);
                                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
                                    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, o);
                                    e && e(t);
                                });
                                o.src = r;
                            }
                            o(r, e);
                        });
                        return t;
                    };
                }
            };
            var U = function r(e) {
                var a = this;
                if (e.webgl) {
                    this.$paintContext = this.$dom.getContext("webgl", {
                        alpha: true,
                        premultipliedAlpha: false
                    });
                    if (this.$paintContext) {
                        B(this, e);
                        this.on("beforeTick", function() {
                            a.webgl.$depth = f.default.funcOrValue(f.default.firstValuable(a.webgl.depth, 0), a);
                            a.webgl.$fudgeFactor = f.default.funcOrValue(f.default.firstValuable(a.webgl.fudgeFactor, 0), a);
                            a.$paintContext.orthographic = A.orthographic(0, a.width, a.height, 0, -a.webgl.$depth, a.webgl.$depth);
                        });
                    } else {
                        if (true) {
                            b("Webgl is not supported in current browser, using canvas2d instead.");
                        }
                        if (e.webgl.fallback) {
                            e.webgl.fallback.call(this);
                        }
                    }
                }
            };
            var D = [ "rx", "ry", "rz" ];
            var $ = [ "scale", "scaleX", "scaleY", "scaleZ" ];
            var P = D.concat($);
            var S = function r() {
                var e = this;
                var a = this.$canvas;
                if (e.webgl && e.webgl.vertices) {
                    e.$rendered = true;
                    if (e.webgl.img) {
                        if (typeof e.webgl.img === "string") {
                            e.webgl.img = a.imgLoader(e.webgl.img);
                        } else if (e.webgl.img.src) {
                            e.webgl.img = a.imgLoader(e.webgl.img.src);
                        }
                    }
                    var t = {
                        tx: e.getStyle("tx"),
                        ty: e.getStyle("ty"),
                        tz: f.default.funcOrValue(e.webgl.tz, e) || 0
                    };
                    for (var n in e.webgl) {
                        t[n] = f.default.funcOrValue(e.webgl[n], e) || 0;
                    }
                    P.forEach(function(r) {
                        t[r] = e.getWebglStyle(r);
                    });
                    var o = {
                        $id: e.$id,
                        type: "3d",
                        webgl: t
                    };
                    if (true) {
                        o.$origin = e;
                    }
                    a.$children.push(o);
                }
            };
            var I = function r(e, a) {
                var t = this;
                if (t.$isWebgl) {
                    E(e, a, t);
                    if (true) {
                        t.$plugin.drawImage(t);
                    }
                    return true;
                }
            };
            var O = function r(e) {
                e.webglShapes = v.default;
                e.sprite.prototype.getWebglStyle = function(r) {
                    var e = this;
                    var a = void 0;
                    if ($.indexOf(r) >= 0) a = 1;
                    if (D.indexOf(r) >= 0) a = 0;
                    if (e.webgl) {
                        a = f.default.funcOrValue(e.webgl[r], e) || a;
                    }
                    if (e.$parent) {
                        if ($.indexOf(r) >= 0) {
                            a *= f.default.firstValuable(e.$parent.getWebglStyle(r), 1);
                        } else if (D.indexOf(r) >= 0) {
                            a += f.default.firstValuable(e.$parent.getWebglStyle(r), 0);
                        }
                    }
                    return a;
                };
                e.sprite.prototype.updateWebglStyle = function(r, e) {
                    var a = this;
                    if (a.webgl && a.webgl[r]) {
                        a.webgl[r].$cacheBuffer = undefined;
                        if (r === "colors" && e) {
                            var t = a.webgl.vertices.length / e.length;
                            a.webgl.colors = new Uint8Array((0, l.arrayRepeat)(e, t));
                        }
                    }
                };
            };
            var V = {
                onCreate: U,
                onPaint: S,
                onRender: I,
                onUse: O
            };
            if (x && window.Easycanvas) {
                Easycanvas.use(V);
            } else {
                r.exports = V;
            }
        },
        68: function(r, e) {
            "use strict";
            var a = function r(e, a) {
                var t = "\n        attribute vec4 a_position;\n        " + (e === 0 ? "attribute vec4 a_color;" : "attribute vec2 a_texcoord;") + "\n        " + (a && "\n            attribute vec3 a_normal;\n            uniform mat4 u_worldViewProjection;\n            uniform mat4 u_worldInverseTranspose;\n        " || "") + "\n        uniform float u_fudgeFactor; // 透射\n\n        uniform mat4 u_matrix;\n\n        " + (e === 0 ? "varying vec4 v_color;" : "varying vec2 v_texcoord;") + "\n        " + (a && "\n            varying vec3 v_normal;\n        " || "") + "\n\n        void main() {\n            // Multiply the position by the matrix.\n            // gl_Position = u_matrix * a_position;\n\n            // 透射\n            // 调整除数\n            vec4 position = u_matrix * a_position;\n            // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor\n            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射\n\n            " + (a ? "gl_Position = u_worldViewProjection * a_position;" : "gl_Position = vec4(position.xy / zToDivideBy, position.zw);") + "\n\n            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);\n\n            " + (e === 0 ? "v_color = a_color;" : "v_texcoord = a_texcoord;") + "\n\n                " + (a && "\n                    v_normal = mat3(u_worldInverseTranspose) * a_normal;\n                " || "") + "\n        }\n    ";
                return t;
            };
            var t = function r(e, a) {
                var t = "\n        precision mediump float;\n\n        " + (e === 0 ? "varying vec4 v_color;" : "varying vec2 v_texcoord;") + "\n\n        uniform sampler2D u_texture;\n\n        " + (a && "\n            varying vec3 v_normal;\n            uniform vec3 u_reverseLightDirection;\n        " || "") + "\n\n        void main() {\n            " + (a && "\n                vec3 normal = normalize(v_normal);\n                float light = dot(normal, u_reverseLightDirection);\n            " || "") + "\n\n            " + (e === 0 ? "gl_FragColor = v_color;" : "gl_FragColor = texture2D(u_texture, v_texcoord);") + "\n\n            " + (a && "\n                light += 2.0;\n                light *= 0.5;\n                gl_FragColor.rgb *= light;\n            " || "") + "\n        }\n    ";
                return t;
            };
            r.exports = {
                shaderVertexFactory: a,
                shaderFragmentFactory: t,
                factory: function r(e, n) {
                    return n === e.FRAGMENT_SHADER ? t : a;
                }
            };
        },
        69: function(r, e, a) {
            "use strict";
            var t = Object.assign || function(r) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = arguments[e];
                    for (var t in a) {
                        if (Object.prototype.hasOwnProperty.call(a, t)) {
                            r[t] = a[t];
                        }
                    }
                }
                return r;
            };
            var n = a(22);
            var o = new Uint16Array([ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23 ]);
            var i = new Float32Array((0, n.arrayRepeat)([ 0, 0, 0, 1, 1, 1, 1, 0 ], 6));
            var v = 6;
            var c = {
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
            var u = function() {
                var r = {};
                return function(e, a) {
                    var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                    var v = e + a.join(",") + t.join(",");
                    var u = {};
                    if (e === "quadrilateral") {} else if (e === "block") {
                        var l = a[0] / 2;
                        var s = a[1] / 2;
                        var f = a[2] / 2;
                        var d = r[v + "v"] || new Float32Array([ l, s, f, -l, s, f, -l, -s, f, l, -s, f, l, s, f, l, -s, f, l, -s, -f, l, s, -f, l, s, f, l, s, -f, -l, s, -f, -l, s, f, -l, s, f, -l, s, -f, -l, -s, -f, -l, -s, f, -l, -s, -f, l, -s, -f, l, -s, f, -l, -s, f, l, -s, -f, -l, -s, -f, -l, s, -f, l, s, -f ]);
                        var h = r[v + "l"] || Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, d));
                        u.vertices = r[v + "v"] = d;
                        u.indices = o;
                        u.textures = i;
                        u.longSide = r[v + "l"] = h;
                    } else if (e === "ball") {
                        var g = r[v + "v"] || [];
                        var p = r[v + "i"] || [];
                        var m = r[v + "t"] || [];
                        if (!g.length) {
                            var A = [];
                            var x = a[0];
                            var b = a[1], w = a[2];
                            for (var y = 0; y <= b; y++) {
                                var _ = y * Math.PI / b;
                                var R = Math.sin(_);
                                var E = Math.cos(_);
                                for (var T = 0; T <= w; T++) {
                                    var F = T * 2 * Math.PI / w;
                                    var L = Math.sin(F);
                                    var M = Math.cos(F);
                                    var B = M * R;
                                    var U = E;
                                    var D = L * R;
                                    var $ = 1 - T / w;
                                    var P = 1 - y / b;
                                    A.push(B);
                                    A.push(U);
                                    A.push(D);
                                    m.push($);
                                    m.push(P);
                                    g.push(x * B);
                                    g.push(x * U);
                                    g.push(x * D);
                                }
                            }
                            for (var y = 0; y < b; y++) {
                                for (var T = 0; T < w; T++) {
                                    var S = y * (w + 1) + T;
                                    var I = S + w + 1;
                                    p.push(S);
                                    p.push(I);
                                    p.push(S + 1);
                                    p.push(I);
                                    p.push(I + 1);
                                    p.push(S + 1);
                                }
                            }
                            r[v + "v"] = new Float32Array(g);
                            r[v + "i"] = new Uint16Array(p);
                            r[v + "t"] = new Float32Array(m);
                            r[v + "l"] = Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, g));
                        }
                        u.vertices = r[v + "v"];
                        u.indices = r[v + "i"];
                        u.textures = r[v + "t"];
                        u.longSide = r[v + "l"];
                    } else {
                        var d = r[v + "v"] || new Float32Array(c[e].vertices.map(function(r) {
                            return r * a[0] / 2;
                        }));
                        var h = r[v + "l"] || Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, d));
                        u.vertices = r[v + "v"] = d;
                        u.indices = new Uint16Array(c[e].indices.join(",").split(","));
                        u.textures = r[v + "t"];
                        if (!u.textures) {
                            u.textures = [];
                            for (var O = 0; O < u.indices.length; O++) {
                                u.textures.push(Math.random().toFixed(2));
                            }
                            u.textures = r[v + "t"] = new Float32Array(u.textures);
                        }
                        u.longSide = r[v + "l"] = h;
                    }
                    if (t.length) {
                        u.colors = r[v + "c"];
                        if (!u.colors) {
                            var V = (u.indices || u.vertices).length / t.length * (u.indices ? 3 : 1);
                            u.colors = new Uint8Array((0, n.arrayRepeat)(t, Math.ceil(V)));
                            r[v + "c"] = u.colors;
                        }
                    }
                    return u;
                };
            }();
            var l = function r(e, a) {
                for (var t in a) {
                    if (!e[t]) {
                        e[t] = a[t];
                    }
                }
                return e;
            };
            var s = function r(e) {
                console.error("[Easycanvas-webgl] " + e);
            };
            var f = {
                block: function r(e) {
                    var a = u("block", [ e.a, e.b, e.c ], e.colors);
                    return l(a, e);
                },
                quadrilateral: function r(e) {
                    var a = u("quadrilateral", [ e.a, e.b, e.c ], e.colors);
                    return l(a, e);
                },
                ball: function r(e) {
                    var a = u("ball", [ e.r, e.b || e.lat || 20, e.b || e.lng || 20 ], e.colors);
                    return l(a, e);
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
                            var a = e.vertices.length / e.textures.length / 1.5;
                            e.textures.$cache = new Float32Array((0, n.arrayRepeat)(e.textures, a));
                        }
                    }
                    if (e.colors && e.colors.length) {
                        if (!e.colors.$cache) {
                            var a = e.vertices.length / e.colors.length;
                            e.colors.$cache = new Uint8Array((0, n.arrayRepeat)(e.colors, a));
                        }
                    }
                    var o = t(e, {
                        vertices: e.vertices.$cache,
                        normals: e.normals ? e.normals.$cache : undefined,
                        indices: e.indices ? e.indices.$cache : undefined,
                        textures: e.textures ? e.textures.$cache : undefined,
                        colors: e.colors ? e.colors.$cache : undefined
                    });
                    return o;
                }
            };
            var d = function r(e) {
                f[e] = function(r) {
                    var a = u(e, [ r.r ], r.colors);
                    a.type = v;
                    return l(a, r);
                };
            };
            for (var h in c) {
                d(h);
            }
            r.exports = f;
        }
    });
});

