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
            r.exports = t(97);
        },
        1: function(r, e) {
            "use strict";
            var t = {
                isArray: Array.isArray || function(r) {
                    return Object.prototype.toString.call(r) === "[object Array]";
                },
                funcOrValue: function r(e, t) {
                    if (typeof e === "function") {
                        return e.call(t);
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
                        e.apply(a, n);
                    } else if (t.isArray(e)) {
                        e.length && e.forEach(function(r) {
                            r && r.apply(a, n);
                        });
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
                var u = i ? -i / 180 * t : 0;
                var l = r, c = e;
                if (i) {
                    l = (r - a) * Math.cos(u) - (e - n) * Math.sin(u) + a;
                    c = (r - a) * Math.sin(u) + (e - n) * Math.cos(u) + n;
                }
                if (o) {
                    return [ l, c ];
                }
                return {
                    x: l,
                    y: c
                };
            };
        },
        3: function(r, e) {
            "use strict";
            var t = function r(e, t) {
                var a = e.length;
                var n = new Array(Math.round(a * t));
                for (var i = 0, o = n.length; i < o; i++) {
                    n[i] = e[i % a];
                }
                return n;
            };
            var a = function r(e) {
                return e * Math.PI / 180;
            };
            var n = [ "rx", "ry", "rz" ];
            var i = [ "scale", "scaleX", "scaleY", "scaleZ" ];
            var o = n.concat(i);
            var u = function r(e) {
                console.error("[Easycanvas-webgl] " + e);
            };
            r.exports = {
                arrayRepeat: t,
                degToRad: a,
                default0s: n,
                default1s: i,
                styleKeys: o,
                err: u
            };
        },
        6: function(r, e) {
            "use strict";
            r.exports = function() {
                "use strict";
                function r(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = e[0 * 4 + 0];
                    var n = e[0 * 4 + 1];
                    var i = e[0 * 4 + 2];
                    var o = e[0 * 4 + 3];
                    var u = e[1 * 4 + 0];
                    var l = e[1 * 4 + 1];
                    var c = e[1 * 4 + 2];
                    var v = e[1 * 4 + 3];
                    var f = e[2 * 4 + 0];
                    var s = e[2 * 4 + 1];
                    var d = e[2 * 4 + 2];
                    var g = e[2 * 4 + 3];
                    var h = e[3 * 4 + 0];
                    var p = e[3 * 4 + 1];
                    var _ = e[3 * 4 + 2];
                    var m = e[3 * 4 + 3];
                    var x = r[0 * 4 + 0];
                    var b = r[0 * 4 + 1];
                    var A = r[0 * 4 + 2];
                    var R = r[0 * 4 + 3];
                    var T = r[1 * 4 + 0];
                    var w = r[1 * 4 + 1];
                    var y = r[1 * 4 + 2];
                    var E = r[1 * 4 + 3];
                    var F = r[2 * 4 + 0];
                    var L = r[2 * 4 + 1];
                    var M = r[2 * 4 + 2];
                    var U = r[2 * 4 + 3];
                    var B = r[3 * 4 + 0];
                    var D = r[3 * 4 + 1];
                    var S = r[3 * 4 + 2];
                    var P = r[3 * 4 + 3];
                    t[0] = a * x + n * T + i * F + o * B;
                    t[1] = a * b + n * w + i * L + o * D;
                    t[2] = a * A + n * y + i * M + o * S;
                    t[3] = a * R + n * E + i * U + o * P;
                    t[4] = u * x + l * T + c * F + v * B;
                    t[5] = u * b + l * w + c * L + v * D;
                    t[6] = u * A + l * y + c * M + v * S;
                    t[7] = u * R + l * E + c * U + v * P;
                    t[8] = f * x + s * T + d * F + g * B;
                    t[9] = f * b + s * w + d * L + g * D;
                    t[10] = f * A + s * y + d * M + g * S;
                    t[11] = f * R + s * E + d * U + g * P;
                    t[12] = h * x + p * T + _ * F + m * B;
                    t[13] = h * b + p * w + _ * L + m * D;
                    t[14] = h * A + p * y + _ * M + m * S;
                    t[15] = h * R + p * E + _ * U + m * P;
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
                function u(r, e) {
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
                function c(r, e) {
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
                function v(r, e, i, o) {
                    o = o || new Float32Array(16);
                    var u = a(t(r, e));
                    var l = a(n(i, u));
                    var c = a(n(u, l));
                    o[0] = l[0];
                    o[1] = l[1];
                    o[2] = l[2];
                    o[3] = 0;
                    o[4] = c[0];
                    o[5] = c[1];
                    o[6] = c[2];
                    o[7] = 0;
                    o[8] = u[0];
                    o[9] = u[1];
                    o[10] = u[2];
                    o[11] = 0;
                    o[12] = r[0];
                    o[13] = r[1];
                    o[14] = r[2];
                    o[15] = 1;
                    return o;
                }
                function f(r, e, t, a, n) {
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
                function s(r, e, t, a, n, i, o) {
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
                    var u = a - t;
                    var l = i - n;
                    dst[0] = 2 * n / o;
                    dst[1] = 0;
                    dst[2] = 0;
                    dst[3] = 0;
                    dst[4] = 0;
                    dst[5] = 2 * n / u;
                    dst[6] = 0;
                    dst[7] = 0;
                    dst[8] = (r + e) / o;
                    dst[9] = (a + t) / u;
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
                    var u = r[2];
                    var l = r[3];
                    var c = r[1 * 4 + 0];
                    var v = r[1 * 4 + 1];
                    var f = r[1 * 4 + 2];
                    var s = r[1 * 4 + 3];
                    var d = r[2 * 4 + 0];
                    var g = r[2 * 4 + 1];
                    var h = r[2 * 4 + 2];
                    var p = r[2 * 4 + 3];
                    var _ = r[3 * 4 + 0];
                    var m = r[3 * 4 + 1];
                    var x = r[3 * 4 + 2];
                    var b = r[3 * 4 + 3];
                    if (r !== n) {
                        n[0] = i;
                        n[1] = o;
                        n[2] = u;
                        n[3] = l;
                        n[4] = c;
                        n[5] = v;
                        n[6] = f;
                        n[7] = s;
                        n[8] = d;
                        n[9] = g;
                        n[10] = h;
                        n[11] = p;
                    }
                    n[12] = i * e + c * t + d * a + _;
                    n[13] = o * e + v * t + g * a + m;
                    n[14] = u * e + f * t + h * a + x;
                    n[15] = l * e + s * t + p * a + b;
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
                function _(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[4];
                    var n = r[5];
                    var i = r[6];
                    var o = r[7];
                    var u = r[8];
                    var l = r[9];
                    var c = r[10];
                    var v = r[11];
                    var f = Math.cos(e);
                    var s = Math.sin(e);
                    t[4] = f * a + s * u;
                    t[5] = f * n + s * l;
                    t[6] = f * i + s * c;
                    t[7] = f * o + s * v;
                    t[8] = f * u - s * a;
                    t[9] = f * l - s * n;
                    t[10] = f * c - s * i;
                    t[11] = f * v - s * o;
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
                function m(r, e) {
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
                function x(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[0 * 4 + 0];
                    var n = r[0 * 4 + 1];
                    var i = r[0 * 4 + 2];
                    var o = r[0 * 4 + 3];
                    var u = r[2 * 4 + 0];
                    var l = r[2 * 4 + 1];
                    var c = r[2 * 4 + 2];
                    var v = r[2 * 4 + 3];
                    var f = Math.cos(e);
                    var s = Math.sin(e);
                    t[0] = f * a - s * u;
                    t[1] = f * n - s * l;
                    t[2] = f * i - s * c;
                    t[3] = f * o - s * v;
                    t[8] = f * u + s * a;
                    t[9] = f * l + s * n;
                    t[10] = f * c + s * i;
                    t[11] = f * v + s * o;
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
                function b(r, e) {
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
                function A(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[0 * 4 + 0];
                    var n = r[0 * 4 + 1];
                    var i = r[0 * 4 + 2];
                    var o = r[0 * 4 + 3];
                    var u = r[1 * 4 + 0];
                    var l = r[1 * 4 + 1];
                    var c = r[1 * 4 + 2];
                    var v = r[1 * 4 + 3];
                    var f = Math.cos(e);
                    var s = Math.sin(e);
                    t[0] = f * a + s * u;
                    t[1] = f * n + s * l;
                    t[2] = f * i + s * c;
                    t[3] = f * o + s * v;
                    t[4] = f * u - s * a;
                    t[5] = f * l - s * n;
                    t[6] = f * c - s * i;
                    t[7] = f * v - s * o;
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
                function R(r, e, t) {
                    t = t || new Float32Array(16);
                    var a = r[0];
                    var n = r[1];
                    var i = r[2];
                    var o = Math.sqrt(a * a + n * n + i * i);
                    a /= o;
                    n /= o;
                    i /= o;
                    var u = a * a;
                    var l = n * n;
                    var c = i * i;
                    var v = Math.cos(e);
                    var f = Math.sin(e);
                    var s = 1 - v;
                    t[0] = u + (1 - u) * v;
                    t[1] = a * n * s + i * f;
                    t[2] = a * i * s - n * f;
                    t[3] = 0;
                    t[4] = a * n * s - i * f;
                    t[5] = l + (1 - l) * v;
                    t[6] = n * i * s + a * f;
                    t[7] = 0;
                    t[8] = a * i * s + n * f;
                    t[9] = n * i * s - a * f;
                    t[10] = c + (1 - c) * v;
                    t[11] = 0;
                    t[12] = 0;
                    t[13] = 0;
                    t[14] = 0;
                    t[15] = 1;
                    return t;
                }
                function T(r, e, t, a) {
                    a = a || new Float32Array(16);
                    var n = e[0];
                    var i = e[1];
                    var o = e[2];
                    var u = Math.sqrt(n * n + i * i + o * o);
                    n /= u;
                    i /= u;
                    o /= u;
                    var l = n * n;
                    var c = i * i;
                    var v = o * o;
                    var f = Math.cos(t);
                    var s = Math.sin(t);
                    var d = 1 - f;
                    var g = l + (1 - l) * f;
                    var h = n * i * d + o * s;
                    var p = n * o * d - i * s;
                    var _ = n * i * d - o * s;
                    var m = c + (1 - c) * f;
                    var x = i * o * d + n * s;
                    var b = n * o * d + i * s;
                    var A = i * o * d - n * s;
                    var R = v + (1 - v) * f;
                    var T = r[0];
                    var w = r[1];
                    var y = r[2];
                    var E = r[3];
                    var F = r[4];
                    var L = r[5];
                    var M = r[6];
                    var U = r[7];
                    var B = r[8];
                    var D = r[9];
                    var S = r[10];
                    var P = r[11];
                    a[0] = g * T + h * F + p * B;
                    a[1] = g * w + h * L + p * D;
                    a[2] = g * y + h * M + p * S;
                    a[3] = g * E + h * U + p * P;
                    a[4] = _ * T + m * F + x * B;
                    a[5] = _ * w + m * L + x * D;
                    a[6] = _ * y + m * M + x * S;
                    a[7] = _ * E + m * U + x * P;
                    a[8] = b * T + A * F + R * B;
                    a[9] = b * w + A * L + R * D;
                    a[10] = b * y + A * M + R * S;
                    a[11] = b * E + A * U + R * P;
                    if (r !== a) {
                        a[12] = r[12];
                        a[13] = r[13];
                        a[14] = r[14];
                        a[15] = r[15];
                    }
                    return a;
                }
                function w(r, e, t, a) {
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
                function y(r, e, t, a, n) {
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
                    var u = r[1 * 4 + 1];
                    var l = r[1 * 4 + 2];
                    var c = r[1 * 4 + 3];
                    var v = r[2 * 4 + 0];
                    var f = r[2 * 4 + 1];
                    var s = r[2 * 4 + 2];
                    var d = r[2 * 4 + 3];
                    var g = r[3 * 4 + 0];
                    var h = r[3 * 4 + 1];
                    var p = r[3 * 4 + 2];
                    var _ = r[3 * 4 + 3];
                    var m = s * _;
                    var x = p * d;
                    var b = l * _;
                    var A = p * c;
                    var R = l * d;
                    var T = s * c;
                    var w = n * _;
                    var y = p * i;
                    var E = n * d;
                    var F = s * i;
                    var L = n * c;
                    var M = l * i;
                    var U = v * h;
                    var B = g * f;
                    var D = o * h;
                    var S = g * u;
                    var P = o * f;
                    var $ = v * u;
                    var I = t * h;
                    var z = g * a;
                    var O = t * f;
                    var C = v * a;
                    var N = t * u;
                    var V = o * a;
                    var X = m * u + A * f + R * h - (x * u + b * f + T * h);
                    var G = x * a + w * f + F * h - (m * a + y * f + E * h);
                    var Y = b * a + y * u + L * h - (A * a + w * u + M * h);
                    var j = T * a + E * u + M * f - (R * a + F * u + L * f);
                    var W = 1 / (t * X + o * G + v * Y + g * j);
                    e[0] = W * X;
                    e[1] = W * G;
                    e[2] = W * Y;
                    e[3] = W * j;
                    e[4] = W * (x * o + b * v + T * g - (m * o + A * v + R * g));
                    e[5] = W * (m * t + y * v + E * g - (x * t + w * v + F * g));
                    e[6] = W * (A * t + w * o + M * g - (b * t + y * o + L * g));
                    e[7] = W * (R * t + F * o + L * v - (T * t + E * o + M * v));
                    e[8] = W * (U * c + S * d + P * _ - (B * c + D * d + $ * _));
                    e[9] = W * (B * i + I * d + C * _ - (U * i + z * d + O * _));
                    e[10] = W * (D * i + z * c + N * _ - (S * i + I * c + V * _));
                    e[11] = W * ($ * i + O * c + V * d - (P * i + C * c + N * d));
                    e[12] = W * (D * s + $ * p + B * l - (P * p + U * l + S * s));
                    e[13] = W * (O * p + U * n + z * s - (I * s + C * p + B * n));
                    e[14] = W * (I * l + V * p + S * n - (N * p + D * n + z * l));
                    e[15] = W * (N * s + P * n + C * l - (O * l + V * s + $ * n));
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
                function U(r, e, t) {
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
                function B(r, e) {
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
                    copy: B,
                    lookAt: v,
                    addVectors: e,
                    subtractVectors: t,
                    distance: u,
                    distanceSq: o,
                    normalize: a,
                    cross: n,
                    dot: i,
                    identity: l,
                    transpose: c,
                    orthographic: s,
                    frustum: d,
                    perspective: f,
                    translation: g,
                    translate: h,
                    xRotation: p,
                    yRotation: m,
                    zRotation: b,
                    xRotate: _,
                    yRotate: x,
                    zRotate: A,
                    axisRotation: R,
                    axisRotate: T,
                    scaling: w,
                    scale: y,
                    multiply: r,
                    inverse: E,
                    transformVector: F,
                    transformPoint: L,
                    transformDirection: M,
                    transformNormal: U
                };
            };
        },
        10: function(r, e) {
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
        11: function(r, e, t) {
            "use strict";
            var a = t(2);
            var n = i(a);
            function i(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var o = 3.141593;
            r.exports = function(r, e, t, a, n, i, u, l, c) {
                var v = c ? -c / 180 * o : 0;
                if (v) {
                    r = (r - u) * Math.cos(v) - (e - l) * Math.sin(v) + u;
                    e = (r - u) * Math.sin(v) + (e - l) * Math.cos(v) + l;
                }
                return r >= t && r <= t + n && e >= a && e <= a + i;
            };
        },
        12: function(r, e, t) {
            "use strict";
            var a = t(2);
            var n = u(a);
            var i = t(11);
            var o = u(i);
            function u(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            r.exports = function(r, e, t, a, n, i, u, l, c, v, f) {
                if (!f) {
                    if (e > i + l) return false;
                    if (i > e + a) return false;
                    if (r > n + u) return false;
                    if (n > r + t) return false;
                }
                var s = (0, o.default)(r, e, n, i, u, l, c, v, f) || (0, o.default)(r + t, e, n, i, u, l, c, v, f) || (0, 
                o.default)(r, e + a, n, i, u, l, c, v, f) || (0, o.default)(r + t, e + a, n, i, u, l, c, v, f);
                if (s) return true;
                var d = (0, o.default)(n, i, r, e, t, a, c, v, -f) || (0, o.default)(n + u, i, r, e, t, a, c, v, -f) || (0, 
                o.default)(n, i + l, r, e, t, a, c, v, -f) || (0, o.default)(n + u, i + l, r, e, t, a, c, v, -f);
                if (d) return true;
                if (e > i && e + a < i + l && r < n && r + t > n + u) return true;
                if (r > n && r + t < n + u && e < i && e + a > i + l) return true;
                return false;
            };
        },
        27: function(r, e, t) {
            "use strict";
            var a = t(87);
            var n = i(a);
            function i(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var o = function r(e, t, a) {
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
            var u = function() {
                var r = {};
                return function(e, t, a, i, o) {
                    var u = "" + t + a + i + o;
                    if (e.singleShader) {
                        u = "singleShader" + t;
                    }
                    if (r[u]) {
                        return r[u];
                    }
                    var l = n.default[e.singleShader ? "final" : "factory"](e, t)(a, i, o);
                    var c = e.createShader(t);
                    e.shaderSource(c, l);
                    e.compileShader(c);
                    if (!e.getShaderParameter(c, e.COMPILE_STATUS)) {
                        var v = e.getShaderInfoLog(c);
                        throw "Could not compile WebGL program. \n\n" + v;
                    }
                    r[u] = c;
                    return c;
                };
            }();
            var l;
            r.exports = function(r, e, t, a) {
                var n = "" + e + t + a;
                if (r.singleShader) {
                    n = "singleShader";
                }
                if (l === n) return;
                l = n;
                var i, c;
                i = u(r, r.VERTEX_SHADER, e, t, a);
                c = u(r, r.FRAGMENT_SHADER, e, t, a);
                r.program = o(r, i, c);
                r.useProgram(r.program);
                r.positionLocation = r.getAttribLocation(r.program, "a_position");
                r.normalLocation = r.getAttribLocation(r.program, "a_normal");
                if (e === 0) {
                    r.colorLocation = r.getAttribLocation(r.program, "a_color");
                } else {
                    r.texcoordLocation = r.getAttribLocation(r.program, "a_texcoord");
                }
                r.sizeLocation = r.getAttribLocation(r.program, "u_size");
                r.worldViewProjectionLocation = r.getUniformLocation(r.program, "u_worldViewProjection");
                r.worldInverseTransposeLocation = r.getUniformLocation(r.program, "u_worldInverseTranspose");
                r.reverseLightDirectionLocation = r.getUniformLocation(r.program, "u_reverseLightDirection");
                r.vShaderTypeLocation = r.getUniformLocation(r.program, "v_shaderType");
                r.fShaderTypeLocation = r.getUniformLocation(r.program, "f_shaderType");
                r.matrixLocation = r.getUniformLocation(r.program, "u_matrix");
                if (e === 0) {
                    r.textureLocation = r.getUniformLocation(r.program, "u_texture");
                } else {
                    r.textureMatrixLocation = r.getUniformLocation(r.program, "u_textureMatrix");
                }
                r.enableVertexAttribArray(r.positionLocation);
                t && r.enableVertexAttribArray(r.normalLocation);
                r.enableVertexAttribArray(r.texcoordLocation);
                r.enableVertexAttribArray(r.colorLocation);
            };
        },
        76: function(r, e, t) {
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
            var n = t(1);
            var i = f(n);
            var o = t(10);
            var u = f(o);
            var l = t(6);
            var c = f(l);
            var v = t(3);
            function f(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var s = (0, c.default)();
            var d = function r(e, t) {
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
                e.imgLoader = function(r, e) {
                    var t = n.createTexture();
                    var a = {
                        width: 0,
                        height: 0
                    };
                    (0, u.default)(r, function(r) {
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
            };
            r.exports = function(r) {
                var e = this;
                if (r.webgl) {
                    this.$paintContext = this.$dom.getContext("webgl", {
                        alpha: true,
                        premultipliedAlpha: false
                    });
                    if (this.$paintContext) {
                        d(this, r);
                        this.on("beforeTick", function() {
                            e.$paintContext.clear(e.$paintContext.COLOR_BUFFER_BIT | e.$paintContext.DEPTH_BUFFER_BIT);
                            e.webgl.$depth = i.default.funcOrValue(i.default.firstValuable(e.webgl.depth, 0), e);
                            e.webgl.$camera = e.webgl.camera.enable ? {} : false;
                            e.webgl.$fudgeFactor = i.default.funcOrValue(i.default.firstValuable(e.webgl.fudgeFactor, 0), e);
                            if (e.webgl.$camera) {
                                var r = e.webgl.camera;
                                var t = e.width / e.height;
                                var a = s.perspective((0, v.degToRad)(60), t, 1, 1e4);
                                var n = [ i.default.funcOrValue(r.current.x || 0, e), i.default.funcOrValue(r.current.y || 0, e), i.default.funcOrValue(r.current.z || 0, e) ];
                                var o = [ 0, -1, 0 ];
                                if (r.rotate) {
                                    o = [ i.default.funcOrValue(r.rotate.x, e), i.default.funcOrValue(r.rotate.y, e), i.default.funcOrValue(r.rotate.z, e) ];
                                }
                                var u = [ i.default.funcOrValue(r.target.x || 0, e), i.default.funcOrValue(r.target.y || 0, e), i.default.funcOrValue(r.target.z || 0, e) ];
                                var l = s.lookAt(n, u, o);
                                var c = s.inverse(l);
                                var f = s.multiply(a, c);
                                e.webgl.$camera.viewProjectionMatrix = f;
                            }
                            e.$paintContext.orthographic = s.orthographic(0, e.width, e.height, 0, e.webgl.$depth, -e.webgl.$depth);
                            e.$paintContext.singleShader = e.webgl.singleShader;
                        });
                    } else {
                        if (true) {
                            (0, v.err)("Webgl is not supported in current browser, using canvas2d instead.");
                        }
                        if (r.webgl.fallback) {
                            r.webgl.fallback.call(this);
                        }
                    }
                }
            };
        },
        77: function(r, e) {
            "use strict";
            var t = function r(e, t, a) {
                var n = e.createTexture();
                e.bindTexture(e.TEXTURE_2D, n);
                e.texImage2D(e.TEXTURE_2D, 0, e.RGB, t, a, 0, e.RGB, e.UNSIGNED_BYTE, null);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
                e.bindTexture(e.TEXTURE_2D, null);
                return n;
            };
            var a = function r(e, t) {
                return Math.abs(e - t) < 1;
            };
            var n = 0;
            var i = false;
            r.exports = function(r, e) {
                var o = this;
                var u = o.$gl;
                var l = u.createFramebuffer();
                if (o.$lastPaintTime === n) {
                    return i;
                }
                var c = t(u, o.width, o.height);
                u.bindTexture(u.TEXTURE_2D, c);
                u.texImage2D(u.TEXTURE_2D, 0, u.RGB, o.width, o.height, 0, u.RGB, u.UNSIGNED_BYTE, null);
                u.bindFramebuffer(u.FRAMEBUFFER, l);
                u.framebufferTexture2D(u.FRAMEBUFFER, u.COLOR_ATTACHMENT0, u.TEXTURE_2D, c, 0);
                u.eventing = true;
                o.paint();
                var v = new Uint8Array(3);
                u.readPixels(r.canvasX, o.height - r.canvasY, 1, 1, u.RGB, u.UNSIGNED_BYTE, v);
                u.bindFramebuffer(u.FRAMEBUFFER, null);
                u.eventing = false;
                var f = o.$children.filter(function(r) {
                    if (!r.webgl) return false;
                    var e = r.webgl.$eventFlag;
                    if (!e) return false;
                    return a(v[0], e[0]) && a(v[1], e[1]) && a(v[2], e[2]);
                })[0];
                n = o.$lastPaintTime;
                i = f;
                if (f) {
                    e.push(f.$origin);
                }
            };
        },
        78: function(r, e, t) {
            "use strict";
            var a = t(1);
            var n = o(a);
            var i = t(3);
            function o(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            r.exports = function() {
                var r = this;
                var e = this.$canvas;
                if (r.webgl && r.webgl.vertices) {
                    r.$rendered = true;
                    if (r.webgl.img) {
                        if (typeof r.webgl.img === "string") {
                            r.webgl.img = e.imgLoader(r.webgl.img);
                        } else if (r.webgl.img.src) {
                            r.webgl.img = e.imgLoader(r.webgl.img.src);
                        }
                    }
                    var t = {
                        tx: r.getStyle("tx"),
                        ty: r.getStyle("ty"),
                        tz: n.default.funcOrValue(r.webgl.tz, r) || 0
                    };
                    for (var a in r.webgl) {
                        t[a] = n.default.funcOrValue(r.webgl[a], r) || 0;
                    }
                    i.styleKeys.forEach(function(e) {
                        t[e] = r.getWebglStyle(e);
                    });
                    var o = {
                        $id: r.$id,
                        type: "3d",
                        webgl: t
                    };
                    o.$origin = r;
                    e.$children.push(o);
                }
                if (r.content.img) {
                    if (typeof r.content.img === "string") {
                        r.content.img = e.imgLoader(r.content.img);
                    } else if (r.content.img.src) {
                        r.content.img = e.imgLoader(r.content.img.src);
                    }
                }
            };
        },
        79: function(r, e, t) {
            "use strict";
            var a = t(1);
            var n = s(a);
            var i = t(12);
            var o = s(i);
            var u = t(3);
            var l = t(82);
            var c = s(l);
            var v = t(81);
            var f = s(v);
            function s(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var d = {};
            var g = function r(e, t, a) {
                var n = e.props;
                var i = e.webgl;
                var u = a.$gl;
                if (e.type !== "3d") {
                    if (!n[0] && n.content) {
                        var l = n.content + n.font + n.align + n.color;
                        var v = d[l];
                        if (!v) {
                            var s = u.createTexture();
                            var g = document.createElement("canvas").getContext("2d");
                            g.clearRect(0, 0, g.canvas.width, g.canvas.height);
                            g.canvas.width = n.content.length * parseInt(n.font) * 2;
                            g.canvas.height = parseInt(n.font) + 5;
                            g.font = n.font;
                            g.textAlign = n.align;
                            g.fillStyle = n.color;
                            g.fillText(n.content, n.align === "right" ? g.canvas.width : n.align === "center" ? g.canvas.width / 2 : 0, g.canvas.height - 5);
                            u.bindTexture(u.TEXTURE_2D, s);
                            u.texImage2D(u.TEXTURE_2D, 0, u.RGBA, u.RGBA, u.UNSIGNED_BYTE, g.canvas);
                            u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.LINEAR);
                            u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE);
                            u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE);
                            v = d[l] = {
                                texture: s,
                                width: g.canvas.width,
                                height: g.canvas.height,
                                img: g.canvas,
                                canvas: g.canvas
                            };
                        }
                        n = [ v, 0, 0, v.canvas.width, v.canvas.height, n.align === "right" ? n.tx - v.canvas.width : n.align === "center" ? n.tx - v.canvas.width / 2 : n.tx, n.ty - v.canvas.height + 5, v.canvas.width, v.canvas.height ];
                    }
                    if (n[0] && n[0].texture) {
                        var h = (0, o.default)(n[5], n[6], n[7], n[8], 0, 0, a.width, a.height, t.beforeRotate && t.beforeRotate[0], t.beforeRotate && t.beforeRotate[1], t.rotate);
                        if (!h) {
                            return;
                        }
                        if (n[0].img.width === 0) return;
                        u.bindTexture(u.TEXTURE_2D, n[0].texture);
                        (0, f.default)(a, n[0].texture, n[0].width, n[0].height, n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], t);
                    }
                } else if (e.type === "3d" && (i.img || i.colors)) {
                    if (i.img && i.img.texture) {
                        u.bindTexture(u.TEXTURE_2D, i.img.texture);
                    }
                    if (i.longSide && !a.webgl.$camera) {
                        var p = i.longSide * 1.8;
                        var _ = a.webgl.$depth;
                        var h = (0, o.default)(i.tx - p, i.ty - p, p * 2, p * 2, i.tz / _ * a.width / 2, i.tz / _ * a.height / 2, a.width - i.tz / _ * a.width / 2, a.height - i.tz / _ * a.height / 2, 0, 0, 0);
                        if (!h) {
                            return;
                        }
                    }
                    (0, c.default)(a, i);
                }
            };
            r.exports = function(r, e) {
                var t = this;
                if (t.$isWebgl) {
                    g(r, e, t);
                    if (true) {
                        t.$plugin.drawImage(t);
                    }
                    return true;
                }
            };
        },
        80: function(r, e, t) {
            "use strict";
            var a = t(1);
            var n = l(a);
            var i = t(88);
            var o = l(i);
            var u = t(3);
            function l(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            r.exports = function(r) {
                r.webglShapes = o.default;
                r.sprite.prototype.getWebglStyle = function(r) {
                    var e = this;
                    var t = void 0;
                    if (u.default1s.indexOf(r) >= 0) t = 1;
                    if (u.default0s.indexOf(r) >= 0) t = 0;
                    if (e.webgl) {
                        t = n.default.funcOrValue(e.webgl[r], e) || t;
                    }
                    if (e.$parent) {
                        if (u.default1s.indexOf(r) >= 0) {
                            t *= n.default.firstValuable(e.$parent.getWebglStyle(r), 1);
                        } else if (u.default0s.indexOf(r) >= 0) {
                            t += n.default.firstValuable(e.$parent.getWebglStyle(r), 0);
                        }
                    }
                    return t;
                };
                r.sprite.prototype.updateWebglStyle = function(r, e) {
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
        },
        81: function(r, e, t) {
            "use strict";
            var a = t(1);
            var n = v(a);
            var i = t(6);
            var o = v(i);
            var u = t(3);
            var l = t(27);
            var c = v(l);
            function v(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var f = (0, o.default)();
            var s;
            r.exports = function(r, e, t, a, n, i, o, u, l, v, d, g, h) {
                var p = r.$gl;
                p.enable(p.BLEND);
                p.disable(p.DEPTH_TEST);
                (0, c.default)(p, 1);
                if (!s) {
                    s = p.createBuffer();
                    p.bindBuffer(p.ARRAY_BUFFER, s);
                    var _ = [ 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1 ];
                    p.bufferData(p.ARRAY_BUFFER, new Float32Array(_), p.STATIC_DRAW);
                }
                p.bindBuffer(p.ARRAY_BUFFER, s);
                p.vertexAttribPointer(p.positionLocation, 2, p.FLOAT, false, 0, 0);
                p.vertexAttribPointer(p.texcoordLocation, 2, p.FLOAT, false, 0, 0);
                var m = p.orthographic;
                m = f.translate(m, l, v, 0);
                if (h.rotate) {
                    m = f.translate(m, -l + h.beforeRotate[0] || 0, -v + h.beforeRotate[1] || 0, 0);
                    m = f.zRotate(m, h.rotate);
                    m = f.translate(m, l + h.afterRotate[0] || 0, v + h.afterRotate[1] || 0, 0);
                }
                m = f.scale(m, d, g, 1);
                p.uniformMatrix4fv(p.matrixLocation, false, m);
                if (n || i || o !== t || u !== a) {
                    var x = f.translation(n / t, i / a, 0);
                    x = f.scale(x, o / t, u / a, 1);
                    p.uniformMatrix4fv(p.textureMatrixLocation, false, x);
                }
                p.drawArrays(p.TRIANGLES, 0, 6);
            };
        },
        82: function(r, e, t) {
            "use strict";
            var a = t(1);
            var n = v(a);
            var i = t(6);
            var o = v(i);
            var u = t(3);
            var l = t(27);
            var c = v(l);
            function v(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var f = (0, o.default)();
            r.exports = function(r, e) {
                if ((!e.colors || !e.colors.length) && (!e.textures || !e.textures.length)) return;
                var t = r.$gl;
                if (e.hasAlpha) {
                    t.enable(t.DEPTH_TEST);
                    t.enable(t.BLEND);
                } else {
                    t.enable(t.DEPTH_TEST);
                    t.disable(t.BLEND);
                }
                var a = e.vertices.$cacheBuffer, i, o, l, v, s;
                if (!a) {
                    a = t.createBuffer();
                    t.bindBuffer(t.ARRAY_BUFFER, a);
                    t.bufferData(t.ARRAY_BUFFER, e.vertices, t.STATIC_DRAW);
                    e.vertices.$cacheBuffer = a;
                }
                var d = t.eventing ? e.$eventFlag : e.colors;
                if (d) {
                    i = d.$cacheBuffer;
                    if (!i) {
                        i = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, i);
                        t.bufferData(t.ARRAY_BUFFER, d, t.STATIC_DRAW);
                        d.$cacheBuffer = i;
                    }
                } else {
                    o = e.textures.$cacheBuffer;
                    if (!o) {
                        o = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, o);
                        t.bufferData(t.ARRAY_BUFFER, e.textures, t.STATIC_DRAW);
                        e.textures.$cacheBuffer = o;
                    }
                }
                if (e.pointSizes) {
                    s = e.pointSizes.$cacheBuffer;
                    if (!s) {
                        s = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, s);
                        t.bufferData(t.ARRAY_BUFFER, e.pointSizes, t.STATIC_DRAW);
                        e.pointSizes.$cacheBuffer = s;
                    }
                }
                if (e.indices) {
                    l = e.indices.$cacheBuffer;
                    if (!l) {
                        l = t.createBuffer();
                        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, l);
                        t.bufferData(t.ELEMENT_ARRAY_BUFFER, e.indices, t.STATIC_DRAW);
                        e.indices.$cacheBuffer = l;
                    }
                }
                if (e.normals) {
                    v = e.normals.$cacheBuffer;
                    if (!v) {
                        v = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, v);
                        t.bufferData(t.ARRAY_BUFFER, e.normals, t.STATIC_DRAW);
                        e.normals.$cacheBuffer = v;
                    }
                }
                if (i) {
                    (0, c.default)(t, 0, r.webgl.light, e.primitive);
                    t.bindBuffer(t.ARRAY_BUFFER, i);
                    var g = e.hasAlpha && !t.eventing ? 4 : 3;
                    t.vertexAttribPointer(t.colorLocation, g, t.UNSIGNED_BYTE, true, 0, 0);
                } else if (o) {
                    (0, c.default)(t, 1, r.webgl.light, e.primitive);
                    t.bindBuffer(t.ARRAY_BUFFER, o);
                    t.vertexAttribPointer(t.texcoordLocation, 2, t.FLOAT, false, 0, 0);
                }
                if (e.pointSizes) {
                    t.bindBuffer(t.ARRAY_BUFFER, s);
                    t.vertexAttribPointer(t.sizeLocation, 1, t.FLOAT, false, 0, 0);
                }
                if (e.vertices) {
                    t.bindBuffer(t.ARRAY_BUFFER, a);
                    t.vertexAttribPointer(t.positionLocation, 3, t.FLOAT, false, 0, 0);
                }
                if (e.normals) {
                    t.bindBuffer(t.ARRAY_BUFFER, v);
                    t.vertexAttribPointer(t.normalLocation, 3, t.FLOAT, false, 0, 0);
                }
                if (r.webgl.$fudgeFactor) {
                    var h = t.getUniformLocation(t.program, "u_fudgeFactor");
                    var p = r.webgl.$fudgeFactor;
                    t.uniform1f(h, p);
                }
                var _;
                if (!r.webgl.$camera) {
                    _ = t.orthographic;
                } else {
                    _ = r.webgl.$camera.viewProjectionMatrix;
                }
                _ = f.translate(_, e.tx || 0, e.ty || 0, e.tz || 0);
                e.rx && (_ = f.xRotate(_, (0, u.degToRad)(e.rx)));
                e.ry && (_ = f.yRotate(_, (0, u.degToRad)(e.ry)));
                e.rz && (_ = f.zRotate(_, (0, u.degToRad)(e.rz)));
                _ = f.scale(_, (e.scaleX !== 1 ? e.scaleX : e.scale) || 1, (e.scaleY !== 1 ? e.scaleY : e.scale) || 1, (e.scaleZ !== 1 ? e.scaleZ : e.scale) || 1);
                if (r.webgl.light) {
                    t.uniformMatrix4fv(t.worldViewProjectionLocation, false, _);
                    t.uniformMatrix4fv(t.worldInverseTransposeLocation, false, f.transpose(_));
                }
                t.uniformMatrix4fv(t.matrixLocation, false, _);
                if (r.webgl.light) {
                    var m = t.getUniformLocation(t.program, "a_color");
                    t.uniform4fv(m, [ 1, 1, 1, 1 ]);
                    t.uniform3fv(t.reverseLightDirectionLocation, f.normalize([ 0, 1, 0 ]));
                }
                t.uniform1i(t.textureLocation, 0);
                var x = t.getUniformLocation(t.program, "f_shaderType");
                t.uniform1i(x, n.default.firstValuable(e.primitive, 2));
                var b = t.getUniformLocation(t.program, "v_shaderType");
                t.uniform1i(b, n.default.firstValuable(e.primitive, 2));
                if (l) {
                    t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, l);
                    t.drawElements(t.TRIANGLES, e.indices.length, t.UNSIGNED_SHORT, 0);
                } else {
                    t.drawArrays(e.primitive === 0 ? t.POINTS : t.TRIANGLES, 0, e.vertices.length / 3);
                }
            };
        },
        83: function(r, e) {
            "use strict";
            r.exports = function(r, e, t) {
                var a = "\n        precision mediump float;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        uniform sampler2D u_texture;\n\n        " + (e && "\n            varying vec3 v_normal;\n            uniform vec3 u_reverseLightDirection;\n        " || "") + "\n\n        void main() {\n            " + (e && "\n                vec3 normal = normalize(v_normal);\n                float light = dot(normal, u_reverseLightDirection);\n            " || "") + "\n\n            " + ([ "gl_FragColor = v_color;", "gl_FragColor = texture2D(u_texture, v_texcoord);" ][r] || "") + "\n\n            " + (t === 0 && "\n                float dist = distance( gl_PointCoord, vec2(0.5) );\n                float alpha = 1.0 - smoothstep(0.1,0.5,dist);\n                // float alpha = 1.0 - smoothstep(0.45,0.5,dist);\n                gl_FragColor.a *= alpha;\n            " || "") + "\n\n            " + (e && "\n                light += 2.0;\n                light *= 0.5;\n                gl_FragColor.rgb *= light;\n            " || "") + "\n        }\n    ";
                return a;
            };
        },
        84: function(r, e) {
            "use strict";
            r.exports = function(r, e) {
                var t = "\n        precision mediump float;\n\n        uniform int f_shaderType;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        uniform sampler2D u_texture;\n\n        " + (e && "\n            varying vec3 v_normal;\n            uniform vec3 u_reverseLightDirection;\n        " || "") + "\n\n        void main() {\n            " + (e && "\n                vec3 normal = normalize(v_normal);\n                float light = dot(normal, u_reverseLightDirection);\n            " || "") + "\n\n            " + ([ "gl_FragColor = v_color;", "gl_FragColor = texture2D(u_texture, v_texcoord);" ][r] || "") + "\n\n            if (f_shaderType == 0) {\n                float dist = distance( gl_PointCoord, vec2(0.5) );\n                float alpha = 1.0 - smoothstep(0.1,0.5,dist);\n                gl_FragColor.a *= alpha;\n            }\n\n            " + (e && "\n                light += 2.0;\n                light *= 0.5;\n                gl_FragColor.rgb *= light;\n            " || "") + "\n        }\n    ";
                return t;
            };
        },
        85: function(r, e) {
            "use strict";
            r.exports = function(r, e, t) {
                var a = "\n        precision mediump float;\n        attribute vec4 a_position;\n        " + ([ "attribute vec4 a_color;", "attribute vec2 a_texcoord;" ][r] || "") + "\n\n        " + (t === 0 && "\n            attribute float u_size; // 点精灵大小\n        " || "") + "\n\n        " + (e && "\n            attribute vec3 a_normal;\n            uniform mat4 u_worldViewProjection;\n            uniform mat4 u_worldInverseTranspose;\n        " || "") + "\n\n        uniform float u_fudgeFactor; // 透射\n\n        uniform mat4 u_matrix;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        " + (e && "\n            varying vec3 v_normal;\n        " || "") + "\n\n        void main() {\n            // Multiply the position by the matrix.\n            // gl_Position = u_matrix * a_position;\n\n            // 透射\n            // 调整除数\n            vec4 position = u_matrix * a_position;\n            // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor\n            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射\n\n            " + (e ? "gl_Position = u_worldViewProjection * a_position;" : "gl_Position = vec4(position.xy / zToDivideBy, position.zw);") + "\n\n            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);\n\n            " + ([ "v_color = a_color;", "v_texcoord = a_texcoord;" ][r] || "") + "\n\n            " + (t === 0 && "\n                gl_PointSize = u_size;\n            " || "") + "\n\n            " + (e && "\n                v_normal = mat3(u_worldInverseTranspose) * a_normal;\n            " || "") + "\n        }\n    ";
                return a;
            };
        },
        86: function(r, e) {
            "use strict";
            r.exports = function(r, e) {
                var t = "\n        precision mediump float;\n\n        uniform int v_shaderType;\n\n        attribute vec4 a_position;\n        " + ([ "attribute vec4 a_color;", "attribute vec2 a_texcoord;" ][r] || "") + "\n\n        attribute float u_size; // 点精灵大小\n\n        " + (e && "\n            attribute vec3 a_normal;\n            uniform mat4 u_worldViewProjection;\n            uniform mat4 u_worldInverseTranspose;\n        " || "") + "\n\n        uniform float u_fudgeFactor; // 透射\n\n        uniform mat4 u_matrix;\n\n        " + ([ "varying vec4 v_color;", "varying vec2 v_texcoord;" ][r] || "") + "\n\n        " + (e && "\n            varying vec3 v_normal;\n        " || "") + "\n\n        void main() {\n            // Multiply the position by the matrix.\n            // gl_Position = u_matrix * a_position;\n\n            // 透射\n            // 调整除数\n            vec4 position = u_matrix * a_position;\n            // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor\n            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射\n\n            " + (e ? "gl_Position = u_worldViewProjection * a_position;" : "gl_Position = vec4(position.xy / zToDivideBy, position.zw);") + "\n\n            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);\n\n            if (v_shaderType == 0) {\n                gl_PointSize = u_size;\n            } else {\n            }\n\n            " + ([ "v_color = a_color;", "v_texcoord = a_texcoord;" ][r] || "") + "\n\n            " + (e && "\n                v_normal = mat3(u_worldInverseTranspose) * a_normal;\n            " || "") + "\n        }\n    ";
                return t;
            };
        },
        87: function(r, e, t) {
            "use strict";
            var a = t(85);
            var n = f(a);
            var i = t(86);
            var o = f(i);
            var u = t(83);
            var l = f(u);
            var c = t(84);
            var v = f(c);
            function f(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            r.exports = {
                factory: function r(e, t) {
                    return t === e.FRAGMENT_SHADER ? l.default : n.default;
                },
                final: function r(e, t) {
                    return t === e.FRAGMENT_SHADER ? v.default : o.default;
                }
            };
        },
        88: function(r, e, t) {
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
            var n = t(3);
            var i = new Uint16Array([ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23 ]);
            var o = new Float32Array((0, n.arrayRepeat)([ 1, 0, 0, 0, 0, 1, 1, 1 ], 6));
            var u = 6;
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
            var c = function() {
                var r = {};
                return function(e, t) {
                    var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                    var u = e + t.join(",") + a.join(",");
                    var c = {};
                    if (e === "quadrilateral") {} else if (e === "block") {
                        var v = t[0] / 2;
                        var f = t[1] / 2;
                        var s = t[2] / 2;
                        var d = r[u + "v"] || new Float32Array([ v, f, s, -v, f, s, -v, -f, s, v, -f, s, v, f, s, v, -f, s, v, -f, -s, v, f, -s, v, f, s, v, f, -s, -v, f, -s, -v, f, s, -v, f, s, -v, f, -s, -v, -f, -s, -v, -f, s, -v, -f, -s, v, -f, -s, v, -f, s, -v, -f, s, v, -f, -s, -v, -f, -s, -v, f, -s, v, f, -s ]);
                        var g = r[u + "l"] || Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, d));
                        c.vertices = r[u + "v"] = d;
                        c.indices = i;
                        c.textures = o;
                        c.longSide = r[u + "l"] = g;
                    } else if (e === "ball") {
                        var h = r[u + "v"] || [];
                        var p = r[u + "i"] || [];
                        var _ = r[u + "t"] || [];
                        if (!h.length) {
                            var m = [];
                            var x = t[0];
                            var b = t[1], A = t[2];
                            for (var R = 0; R <= b; R++) {
                                var T = R * Math.PI / b;
                                var w = Math.sin(T);
                                var y = Math.cos(T);
                                for (var E = 0; E <= A; E++) {
                                    var F = E * 2 * Math.PI / A;
                                    var L = Math.sin(F);
                                    var M = Math.cos(F);
                                    var U = M * w;
                                    var B = y;
                                    var D = L * w;
                                    var S = 1 - E / A;
                                    var P = 1 - R / b;
                                    m.push(U);
                                    m.push(B);
                                    m.push(D);
                                    _.push(S);
                                    _.push(P);
                                    h.push(x * U);
                                    h.push(x * B);
                                    h.push(x * D);
                                }
                            }
                            for (var R = 0; R < b; R++) {
                                for (var E = 0; E < A; E++) {
                                    var $ = R * (A + 1) + E;
                                    var I = $ + A + 1;
                                    p.push($);
                                    p.push(I);
                                    p.push($ + 1);
                                    p.push(I);
                                    p.push(I + 1);
                                    p.push($ + 1);
                                }
                            }
                            r[u + "v"] = new Float32Array(h);
                            r[u + "i"] = new Uint16Array(p);
                            r[u + "t"] = new Float32Array(_);
                            r[u + "l"] = Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, h));
                        }
                        c.vertices = r[u + "v"];
                        c.indices = r[u + "i"];
                        c.textures = r[u + "t"];
                        c.longSide = r[u + "l"];
                    } else {
                        var d = r[u + "v"] || new Float32Array(l[e].vertices.map(function(r) {
                            return r * t[0] / 2;
                        }));
                        var g = r[u + "l"] || Math.max(Math.max.apply(undefined, d), -Math.min.apply(undefined, d));
                        c.vertices = r[u + "v"] = d;
                        c.indices = new Uint16Array(l[e].indices.join(",").split(","));
                        c.textures = r[u + "t"];
                        if (!c.textures) {
                            c.textures = [];
                            for (var z = 0; z < c.indices.length; z++) {
                                c.textures.push(Math.random().toFixed(2));
                            }
                            c.textures = r[u + "t"] = new Float32Array(c.textures);
                        }
                        c.longSide = r[u + "l"] = g;
                    }
                    if (a.length) {
                        c.colors = r[u + "c"];
                        if (!c.colors) {
                            var O = (c.indices || c.vertices).length * (c.indices ? 4 : 1) / a.length;
                            c.colors = new Uint8Array((0, n.arrayRepeat)(a, Math.ceil(O)));
                            r[u + "c"] = c.colors;
                        }
                    }
                    return c;
                };
            }();
            var v = function r(e, t) {
                for (var a in t) {
                    if (!e[a]) {
                        e[a] = t[a];
                    }
                }
                return e;
            };
            var f = function() {
                var r = 0;
                return function(e) {
                    if (!r) {
                        r++;
                    }
                    var t = (e.indices || e.vertices).length * (e.indices ? 4 : 1) / 4;
                    e.$eventFlag = new Uint8Array((0, n.arrayRepeat)([ r % 256, Math.floor(r / 256) % 256, Math.floor(r / 65536) % 256 ], Math.ceil(t)));
                    r++;
                    return e;
                };
            }();
            var s = function r(e) {
                console.error("[Easycanvas-webgl] " + e);
            };
            var d = {
                block: function r(e) {
                    var t = c("block", [ e.a, e.b, e.c ], e.colors);
                    return f(v(t, e));
                },
                quadrilateral: function r(e) {
                    var t = c("quadrilateral", [ e.a, e.b, e.c ], e.colors);
                    return f(v(t, e));
                },
                ball: function r(e) {
                    var t = c("ball", [ e.r, e.b || e.lat || 20, e.b || e.lng || 20 ], e.colors);
                    return f(v(t, e));
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
                    return f(i);
                }
            };
            var g = function r(e) {
                d[e] = function(r) {
                    var t = c(e, [ r.r ], r.colors);
                    t.type = u;
                    return f(v(t, r));
                };
            };
            for (var h in l) {
                g(h);
            }
            r.exports = d;
        },
        97: function(r, e, t) {
            "use strict";
            var a = t(77);
            var n = d(a);
            var i = t(80);
            var o = d(i);
            var u = t(76);
            var l = d(u);
            var c = t(78);
            var v = d(c);
            var f = t(79);
            var s = d(f);
            function d(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var g = typeof window !== "undefined";
            var h = {
                onCreate: l.default,
                onPaint: v.default,
                onRender: s.default,
                onUse: o.default
            };
            if (g && window.Easycanvas) {
                Easycanvas.use(h);
            } else {
                r.exports = h;
            }
        }
    });
});

