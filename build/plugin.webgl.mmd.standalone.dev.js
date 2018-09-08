(function t(e, i) {
    if (typeof exports === "object" && typeof module === "object") module.exports = i(); else if (typeof define === "function" && define.amd) define([], i); else {
        var r = i();
        for (var o in r) (typeof exports === "object" ? exports : e)[o] = r[o];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function i(r) {
            if (e[r]) return e[r].exports;
            var o = e[r] = {
                exports: {},
                id: r,
                loaded: false
            };
            t[r].call(o.exports, o, o.exports, i);
            o.loaded = true;
            return o.exports;
        }
        i.m = t;
        i.c = e;
        i.p = "";
        return i(0);
    }({
        0: function(t, e, i) {
            t.exports = i(91);
        },
        5: function(t, e) {
            "use strict";
            var i = {}, r = {}, o = {}, n = {};
            var s = typeof Float32Array != "undefined" ? Float32Array : typeof WebGLFloatArray != "undefined" ? WebGLFloatArray : Array;
            i.create = function(t) {
                var e = new s(3);
                if (t) {
                    e[0] = t[0];
                    e[1] = t[1];
                    e[2] = t[2];
                }
                return e;
            };
            i.set = function(t, e) {
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                return e;
            };
            i.add = function(t, e, i) {
                if (!i || t == i) {
                    t[0] += e[0];
                    t[1] += e[1];
                    t[2] += e[2];
                    return t;
                }
                i[0] = t[0] + e[0];
                i[1] = t[1] + e[1];
                i[2] = t[2] + e[2];
                return i;
            };
            i.subtract = function(t, e, i) {
                if (!i || t == i) {
                    t[0] -= e[0];
                    t[1] -= e[1];
                    t[2] -= e[2];
                    return t;
                }
                i[0] = t[0] - e[0];
                i[1] = t[1] - e[1];
                i[2] = t[2] - e[2];
                return i;
            };
            i.negate = function(t, e) {
                e || (e = t);
                e[0] = -t[0];
                e[1] = -t[1];
                e[2] = -t[2];
                return e;
            };
            i.scale = function(t, e, i) {
                if (!i || t == i) {
                    t[0] *= e;
                    t[1] *= e;
                    t[2] *= e;
                    return t;
                }
                i[0] = t[0] * e;
                i[1] = t[1] * e;
                i[2] = t[2] * e;
                return i;
            };
            i.normalize = function(t, e) {
                e || (e = t);
                var i = t[0], r = t[1], o = t[2], n = Math.sqrt(i * i + r * r + o * o);
                if (n) {
                    if (n == 1) {
                        e[0] = i;
                        e[1] = r;
                        e[2] = o;
                        return e;
                    }
                } else {
                    e[0] = 0;
                    e[1] = 0;
                    e[2] = 0;
                    return e;
                }
                n = 1 / n;
                e[0] = i * n;
                e[1] = r * n;
                e[2] = o * n;
                return e;
            };
            i.cross = function(t, e, i) {
                i || (i = t);
                var r = t[0], o = t[1];
                t = t[2];
                var n = e[0], s = e[1];
                e = e[2];
                i[0] = o * e - t * s;
                i[1] = t * n - r * e;
                i[2] = r * s - o * n;
                return i;
            };
            i.length = function(t) {
                var e = t[0], i = t[1];
                t = t[2];
                return Math.sqrt(e * e + i * i + t * t);
            };
            i.dot = function(t, e) {
                return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
            };
            i.direction = function(t, e, i) {
                i || (i = t);
                var r = t[0] - e[0], o = t[1] - e[1];
                t = t[2] - e[2];
                e = Math.sqrt(r * r + o * o + t * t);
                if (!e) {
                    i[0] = 0;
                    i[1] = 0;
                    i[2] = 0;
                    return i;
                }
                e = 1 / e;
                i[0] = r * e;
                i[1] = o * e;
                i[2] = t * e;
                return i;
            };
            i.lerp = function(t, e, i, r) {
                r || (r = t);
                r[0] = t[0] + i * (e[0] - t[0]);
                r[1] = t[1] + i * (e[1] - t[1]);
                r[2] = t[2] + i * (e[2] - t[2]);
                return r;
            };
            i.str = function(t) {
                return "[" + t[0] + ", " + t[1] + ", " + t[2] + "]";
            };
            r.create = function(t) {
                var e = new s(9);
                if (t) {
                    e[0] = t[0];
                    e[1] = t[1];
                    e[2] = t[2];
                    e[3] = t[3];
                    e[4] = t[4];
                    e[5] = t[5];
                    e[6] = t[6];
                    e[7] = t[7];
                    e[8] = t[8];
                    e[9] = t[9];
                }
                return e;
            };
            r.set = function(t, e) {
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = t[3];
                e[4] = t[4];
                e[5] = t[5];
                e[6] = t[6];
                e[7] = t[7];
                e[8] = t[8];
                return e;
            };
            r.identity = function(t) {
                t[0] = 1;
                t[1] = 0;
                t[2] = 0;
                t[3] = 0;
                t[4] = 1;
                t[5] = 0;
                t[6] = 0;
                t[7] = 0;
                t[8] = 1;
                return t;
            };
            r.transpose = function(t, e) {
                if (!e || t == e) {
                    var i = t[1], r = t[2], o = t[5];
                    t[1] = t[3];
                    t[2] = t[6];
                    t[3] = i;
                    t[5] = t[7];
                    t[6] = r;
                    t[7] = o;
                    return t;
                }
                e[0] = t[0];
                e[1] = t[3];
                e[2] = t[6];
                e[3] = t[1];
                e[4] = t[4];
                e[5] = t[7];
                e[6] = t[2];
                e[7] = t[5];
                e[8] = t[8];
                return e;
            };
            r.toMat4 = function(t, e) {
                e || (e = o.create());
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = 0;
                e[4] = t[3];
                e[5] = t[4];
                e[6] = t[5];
                e[7] = 0;
                e[8] = t[6];
                e[9] = t[7];
                e[10] = t[8];
                e[11] = 0;
                e[12] = 0;
                e[13] = 0;
                e[14] = 0;
                e[15] = 1;
                return e;
            };
            r.str = function(t) {
                return "[" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + "]";
            };
            var o = {};
            o.create = function(t) {
                var e = new s(16);
                if (t) {
                    e[0] = t[0];
                    e[1] = t[1];
                    e[2] = t[2];
                    e[3] = t[3];
                    e[4] = t[4];
                    e[5] = t[5];
                    e[6] = t[6];
                    e[7] = t[7];
                    e[8] = t[8];
                    e[9] = t[9];
                    e[10] = t[10];
                    e[11] = t[11];
                    e[12] = t[12];
                    e[13] = t[13];
                    e[14] = t[14];
                    e[15] = t[15];
                }
                return e;
            };
            o.set = function(t, e) {
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = t[3];
                e[4] = t[4];
                e[5] = t[5];
                e[6] = t[6];
                e[7] = t[7];
                e[8] = t[8];
                e[9] = t[9];
                e[10] = t[10];
                e[11] = t[11];
                e[12] = t[12];
                e[13] = t[13];
                e[14] = t[14];
                e[15] = t[15];
                return e;
            };
            o.identity = function(t) {
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
                t[12] = 0;
                t[13] = 0;
                t[14] = 0;
                t[15] = 1;
                return t;
            };
            o.transpose = function(t, e) {
                if (!e || t == e) {
                    var i = t[1], r = t[2], o = t[3], n = t[6], s = t[7], a = t[11];
                    t[1] = t[4];
                    t[2] = t[8];
                    t[3] = t[12];
                    t[4] = i;
                    t[6] = t[9];
                    t[7] = t[13];
                    t[8] = r;
                    t[9] = n;
                    t[11] = t[14];
                    t[12] = o;
                    t[13] = s;
                    t[14] = a;
                    return t;
                }
                e[0] = t[0];
                e[1] = t[4];
                e[2] = t[8];
                e[3] = t[12];
                e[4] = t[1];
                e[5] = t[5];
                e[6] = t[9];
                e[7] = t[13];
                e[8] = t[2];
                e[9] = t[6];
                e[10] = t[10];
                e[11] = t[14];
                e[12] = t[3];
                e[13] = t[7];
                e[14] = t[11];
                e[15] = t[15];
                return e;
            };
            o.determinant = function(t) {
                var e = t[0], i = t[1], r = t[2], o = t[3], n = t[4], s = t[5], a = t[6], h = t[7], u = t[8], p = t[9], f = t[10], l = t[11], c = t[12], m = t[13], _ = t[14];
                t = t[15];
                return c * p * a * o - u * m * a * o - c * s * f * o + n * m * f * o + u * s * _ * o - n * p * _ * o - c * p * r * h + u * m * r * h + c * i * f * h - e * m * f * h - u * i * _ * h + e * p * _ * h + c * s * r * l - n * m * r * l - c * i * a * l + e * m * a * l + n * i * _ * l - e * s * _ * l - u * s * r * t + n * p * r * t + u * i * a * t - e * p * a * t - n * i * f * t + e * s * f * t;
            };
            o.inverse = function(t, e) {
                e || (e = t);
                var i = t[0], r = t[1], o = t[2], n = t[3], s = t[4], a = t[5], h = t[6], u = t[7], p = t[8], f = t[9], l = t[10], c = t[11], m = t[12], _ = t[13], v = t[14], d = t[15], y = i * a - r * s, g = i * h - o * s, T = i * u - n * s, A = r * h - o * a, E = r * u - n * a, I = o * u - n * h, C = p * _ - f * m, M = p * v - l * m, x = p * d - c * m, b = f * v - l * _, F = f * d - c * _, N = l * d - c * v, R = 1 / (y * N - g * F + T * b + A * x - E * M + I * C);
                e[0] = (a * N - h * F + u * b) * R;
                e[1] = (-r * N + o * F - n * b) * R;
                e[2] = (_ * I - v * E + d * A) * R;
                e[3] = (-f * I + l * E - c * A) * R;
                e[4] = (-s * N + h * x - u * M) * R;
                e[5] = (i * N - o * x + n * M) * R;
                e[6] = (-m * I + v * T - d * g) * R;
                e[7] = (p * I - l * T + c * g) * R;
                e[8] = (s * F - a * x + u * C) * R;
                e[9] = (-i * F + r * x - n * C) * R;
                e[10] = (m * E - _ * T + d * y) * R;
                e[11] = (-p * E + f * T - c * y) * R;
                e[12] = (-s * b + a * M - h * C) * R;
                e[13] = (i * b - r * M + o * C) * R;
                e[14] = (-m * A + _ * g - v * y) * R;
                e[15] = (p * A - f * g + l * y) * R;
                return e;
            };
            o.toRotationMat = function(t, e) {
                e || (e = o.create());
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = t[3];
                e[4] = t[4];
                e[5] = t[5];
                e[6] = t[6];
                e[7] = t[7];
                e[8] = t[8];
                e[9] = t[9];
                e[10] = t[10];
                e[11] = t[11];
                e[12] = 0;
                e[13] = 0;
                e[14] = 0;
                e[15] = 1;
                return e;
            };
            o.toMat3 = function(t, e) {
                e || (e = r.create());
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = t[4];
                e[4] = t[5];
                e[5] = t[6];
                e[6] = t[8];
                e[7] = t[9];
                e[8] = t[10];
                return e;
            };
            o.toInverseMat3 = function(t, e) {
                var i = t[0], o = t[1], n = t[2], s = t[4], a = t[5], h = t[6], u = t[8], p = t[9], f = t[10], l = f * a - h * p, c = -f * s + h * u, m = p * s - a * u, _ = i * l + o * c + n * m;
                if (!_) return null;
                _ = 1 / _;
                e || (e = r.create());
                e[0] = l * _;
                e[1] = (-f * o + n * p) * _;
                e[2] = (h * o - n * a) * _;
                e[3] = c * _;
                e[4] = (f * i - n * u) * _;
                e[5] = (-h * i + n * s) * _;
                e[6] = m * _;
                e[7] = (-p * i + o * u) * _;
                e[8] = (a * i - o * s) * _;
                return e;
            };
            o.multiply = function(t, e, i) {
                i || (i = t);
                var r = t[0], o = t[1], n = t[2], s = t[3], a = t[4], h = t[5], u = t[6], p = t[7], f = t[8], l = t[9], c = t[10], m = t[11], _ = t[12], v = t[13], d = t[14];
                t = t[15];
                var y = e[0], g = e[1], T = e[2], A = e[3], E = e[4], I = e[5], C = e[6], M = e[7], x = e[8], b = e[9], F = e[10], N = e[11], R = e[12], S = e[13], B = e[14];
                e = e[15];
                i[0] = y * r + g * a + T * f + A * _;
                i[1] = y * o + g * h + T * l + A * v;
                i[2] = y * n + g * u + T * c + A * d;
                i[3] = y * s + g * p + T * m + A * t;
                i[4] = E * r + I * a + C * f + M * _;
                i[5] = E * o + I * h + C * l + M * v;
                i[6] = E * n + I * u + C * c + M * d;
                i[7] = E * s + I * p + C * m + M * t;
                i[8] = x * r + b * a + F * f + N * _;
                i[9] = x * o + b * h + F * l + N * v;
                i[10] = x * n + b * u + F * c + N * d;
                i[11] = x * s + b * p + F * m + N * t;
                i[12] = R * r + S * a + B * f + e * _;
                i[13] = R * o + S * h + B * l + e * v;
                i[14] = R * n + S * u + B * c + e * d;
                i[15] = R * s + S * p + B * m + e * t;
                return i;
            };
            o.multiplyVec3 = function(t, e, i) {
                i || (i = e);
                var r = e[0], o = e[1];
                e = e[2];
                i[0] = t[0] * r + t[4] * o + t[8] * e + t[12];
                i[1] = t[1] * r + t[5] * o + t[9] * e + t[13];
                i[2] = t[2] * r + t[6] * o + t[10] * e + t[14];
                return i;
            };
            o.multiplyVec4 = function(t, e, i) {
                i || (i = e);
                var r = e[0], o = e[1], n = e[2];
                e = e[3];
                i[0] = t[0] * r + t[4] * o + t[8] * n + t[12] * e;
                i[1] = t[1] * r + t[5] * o + t[9] * n + t[13] * e;
                i[2] = t[2] * r + t[6] * o + t[10] * n + t[14] * e;
                i[3] = t[3] * r + t[7] * o + t[11] * n + t[15] * e;
                return i;
            };
            o.translate = function(t, e, i) {
                var r = e[0], o = e[1];
                e = e[2];
                if (!i || t == i) {
                    t[12] = t[0] * r + t[4] * o + t[8] * e + t[12];
                    t[13] = t[1] * r + t[5] * o + t[9] * e + t[13];
                    t[14] = t[2] * r + t[6] * o + t[10] * e + t[14];
                    t[15] = t[3] * r + t[7] * o + t[11] * e + t[15];
                    return t;
                }
                var n = t[0], s = t[1], a = t[2], h = t[3], u = t[4], p = t[5], f = t[6], l = t[7], c = t[8], m = t[9], _ = t[10], v = t[11];
                i[0] = n;
                i[1] = s;
                i[2] = a;
                i[3] = h;
                i[4] = u;
                i[5] = p;
                i[6] = f;
                i[7] = l;
                i[8] = c;
                i[9] = m;
                i[10] = _;
                i[11] = v;
                i[12] = n * r + u * o + c * e + t[12];
                i[13] = s * r + p * o + m * e + t[13];
                i[14] = a * r + f * o + _ * e + t[14];
                i[15] = h * r + l * o + v * e + t[15];
                return i;
            };
            o.scale = function(t, e, i) {
                var r = e[0], o = e[1];
                e = e[2];
                if (!i || t == i) {
                    t[0] *= r;
                    t[1] *= r;
                    t[2] *= r;
                    t[3] *= r;
                    t[4] *= o;
                    t[5] *= o;
                    t[6] *= o;
                    t[7] *= o;
                    t[8] *= e;
                    t[9] *= e;
                    t[10] *= e;
                    t[11] *= e;
                    return t;
                }
                i[0] = t[0] * r;
                i[1] = t[1] * r;
                i[2] = t[2] * r;
                i[3] = t[3] * r;
                i[4] = t[4] * o;
                i[5] = t[5] * o;
                i[6] = t[6] * o;
                i[7] = t[7] * o;
                i[8] = t[8] * e;
                i[9] = t[9] * e;
                i[10] = t[10] * e;
                i[11] = t[11] * e;
                i[12] = t[12];
                i[13] = t[13];
                i[14] = t[14];
                i[15] = t[15];
                return i;
            };
            o.rotate = function(t, e, i, r) {
                var o = i[0], n = i[1];
                i = i[2];
                var s = Math.sqrt(o * o + n * n + i * i);
                if (!s) return null;
                if (s != 1) {
                    s = 1 / s;
                    o *= s;
                    n *= s;
                    i *= s;
                }
                var a = Math.sin(e), h = Math.cos(e), u = 1 - h;
                e = t[0];
                s = t[1];
                var p = t[2], f = t[3], l = t[4], c = t[5], m = t[6], _ = t[7], v = t[8], d = t[9], y = t[10], g = t[11], T = o * o * u + h, A = n * o * u + i * a, E = i * o * u - n * a, I = o * n * u - i * a, C = n * n * u + h, M = i * n * u + o * a, x = o * i * u + n * a;
                o = n * i * u - o * a;
                n = i * i * u + h;
                if (r) {
                    if (t != r) {
                        r[12] = t[12];
                        r[13] = t[13];
                        r[14] = t[14];
                        r[15] = t[15];
                    }
                } else r = t;
                r[0] = e * T + l * A + v * E;
                r[1] = s * T + c * A + d * E;
                r[2] = p * T + m * A + y * E;
                r[3] = f * T + _ * A + g * E;
                r[4] = e * I + l * C + v * M;
                r[5] = s * I + c * C + d * M;
                r[6] = p * I + m * C + y * M;
                r[7] = f * I + _ * C + g * M;
                r[8] = e * x + l * o + v * n;
                r[9] = s * x + c * o + d * n;
                r[10] = p * x + m * o + y * n;
                r[11] = f * x + _ * o + g * n;
                return r;
            };
            o.rotateX = function(t, e, i) {
                var r = Math.sin(e);
                e = Math.cos(e);
                var o = t[4], n = t[5], s = t[6], a = t[7], h = t[8], u = t[9], p = t[10], f = t[11];
                if (i) {
                    if (t != i) {
                        i[0] = t[0];
                        i[1] = t[1];
                        i[2] = t[2];
                        i[3] = t[3];
                        i[12] = t[12];
                        i[13] = t[13];
                        i[14] = t[14];
                        i[15] = t[15];
                    }
                } else i = t;
                i[4] = o * e + h * r;
                i[5] = n * e + u * r;
                i[6] = s * e + p * r;
                i[7] = a * e + f * r;
                i[8] = o * -r + h * e;
                i[9] = n * -r + u * e;
                i[10] = s * -r + p * e;
                i[11] = a * -r + f * e;
                return i;
            };
            o.rotateY = function(t, e, i) {
                var r = Math.sin(e);
                e = Math.cos(e);
                var o = t[0], n = t[1], s = t[2], a = t[3], h = t[8], u = t[9], p = t[10], f = t[11];
                if (i) {
                    if (t != i) {
                        i[4] = t[4];
                        i[5] = t[5];
                        i[6] = t[6];
                        i[7] = t[7];
                        i[12] = t[12];
                        i[13] = t[13];
                        i[14] = t[14];
                        i[15] = t[15];
                    }
                } else i = t;
                i[0] = o * e + h * -r;
                i[1] = n * e + u * -r;
                i[2] = s * e + p * -r;
                i[3] = a * e + f * -r;
                i[8] = o * r + h * e;
                i[9] = n * r + u * e;
                i[10] = s * r + p * e;
                i[11] = a * r + f * e;
                return i;
            };
            o.rotateZ = function(t, e, i) {
                var r = Math.sin(e);
                e = Math.cos(e);
                var o = t[0], n = t[1], s = t[2], a = t[3], h = t[4], u = t[5], p = t[6], f = t[7];
                if (i) {
                    if (t != i) {
                        i[8] = t[8];
                        i[9] = t[9];
                        i[10] = t[10];
                        i[11] = t[11];
                        i[12] = t[12];
                        i[13] = t[13];
                        i[14] = t[14];
                        i[15] = t[15];
                    }
                } else i = t;
                i[0] = o * e + h * r;
                i[1] = n * e + u * r;
                i[2] = s * e + p * r;
                i[3] = a * e + f * r;
                i[4] = o * -r + h * e;
                i[5] = n * -r + u * e;
                i[6] = s * -r + p * e;
                i[7] = a * -r + f * e;
                return i;
            };
            o.frustum = function(t, e, i, r, n, s, a) {
                a || (a = o.create());
                var h = e - t, u = r - i, p = s - n;
                a[0] = n * 2 / h;
                a[1] = 0;
                a[2] = 0;
                a[3] = 0;
                a[4] = 0;
                a[5] = n * 2 / u;
                a[6] = 0;
                a[7] = 0;
                a[8] = (e + t) / h;
                a[9] = (r + i) / u;
                a[10] = -(s + n) / p;
                a[11] = -1;
                a[12] = 0;
                a[13] = 0;
                a[14] = -(s * n * 2) / p;
                a[15] = 0;
                return a;
            };
            o.perspective = function(t, e, i, r, n) {
                t = i * Math.tan(t * Math.PI / 360);
                e = t * e;
                return o.frustum(-e, e, -t, t, i, r, n);
            };
            o.ortho = function(t, e, i, r, n, s, a) {
                a || (a = o.create());
                var h = e - t, u = r - i, p = s - n;
                a[0] = 2 / h;
                a[1] = 0;
                a[2] = 0;
                a[3] = 0;
                a[4] = 0;
                a[5] = 2 / u;
                a[6] = 0;
                a[7] = 0;
                a[8] = 0;
                a[9] = 0;
                a[10] = -2 / p;
                a[11] = 0;
                a[12] = -(t + e) / h;
                a[13] = -(r + i) / u;
                a[14] = -(s + n) / p;
                a[15] = 1;
                return a;
            };
            o.lookAt = function(t, e, i, r) {
                r || (r = o.create());
                var n = t[0], s = t[1];
                t = t[2];
                var a = i[0], h = i[1], u = i[2];
                i = e[1];
                var p = e[2];
                if (n == e[0] && s == i && t == p) return o.identity(r);
                var f, l, c, m;
                i = n - e[0];
                p = s - e[1];
                e = t - e[2];
                m = 1 / Math.sqrt(i * i + p * p + e * e);
                i *= m;
                p *= m;
                e *= m;
                f = h * e - u * p;
                u = u * i - a * e;
                a = a * p - h * i;
                if (m = Math.sqrt(f * f + u * u + a * a)) {
                    m = 1 / m;
                    f *= m;
                    u *= m;
                    a *= m;
                } else a = u = f = 0;
                h = p * a - e * u;
                l = e * f - i * a;
                c = i * u - p * f;
                if (m = Math.sqrt(h * h + l * l + c * c)) {
                    m = 1 / m;
                    h *= m;
                    l *= m;
                    c *= m;
                } else c = l = h = 0;
                r[0] = f;
                r[1] = h;
                r[2] = i;
                r[3] = 0;
                r[4] = u;
                r[5] = l;
                r[6] = p;
                r[7] = 0;
                r[8] = a;
                r[9] = c;
                r[10] = e;
                r[11] = 0;
                r[12] = -(f * n + u * s + a * t);
                r[13] = -(h * n + l * s + c * t);
                r[14] = -(i * n + p * s + e * t);
                r[15] = 1;
                return r;
            };
            o.str = function(t) {
                return "[" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + "]";
            };
            n = {};
            n.create = function(t) {
                var e = new s(4);
                if (t) {
                    e[0] = t[0];
                    e[1] = t[1];
                    e[2] = t[2];
                    e[3] = t[3];
                }
                return e;
            };
            n.set = function(t, e) {
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = t[3];
                return e;
            };
            n.calculateW = function(t, e) {
                var i = t[0], r = t[1], o = t[2];
                if (!e || t == e) {
                    t[3] = -Math.sqrt(Math.abs(1 - i * i - r * r - o * o));
                    return t;
                }
                e[0] = i;
                e[1] = r;
                e[2] = o;
                e[3] = -Math.sqrt(Math.abs(1 - i * i - r * r - o * o));
                return e;
            };
            n.inverse = function(t, e) {
                if (!e || t == e) {
                    t[0] *= 1;
                    t[1] *= 1;
                    t[2] *= 1;
                    return t;
                }
                e[0] = -t[0];
                e[1] = -t[1];
                e[2] = -t[2];
                e[3] = t[3];
                return e;
            };
            n.length = function(t) {
                var e = t[0], i = t[1], r = t[2];
                t = t[3];
                return Math.sqrt(e * e + i * i + r * r + t * t);
            };
            n.normalize = function(t, e) {
                e || (e = t);
                var i = t[0], r = t[1], o = t[2], n = t[3], s = Math.sqrt(i * i + r * r + o * o + n * n);
                if (s == 0) {
                    e[0] = 0;
                    e[1] = 0;
                    e[2] = 0;
                    e[3] = 0;
                    return e;
                }
                s = 1 / s;
                e[0] = i * s;
                e[1] = r * s;
                e[2] = o * s;
                e[3] = n * s;
                return e;
            };
            n.multiply = function(t, e, i) {
                i || (i = t);
                var r = t[0], o = t[1], n = t[2];
                t = t[3];
                var s = e[0], a = e[1], h = e[2];
                e = e[3];
                i[0] = r * e + t * s + o * h - n * a;
                i[1] = o * e + t * a + n * s - r * h;
                i[2] = n * e + t * h + r * a - o * s;
                i[3] = t * e - r * s - o * a - n * h;
                return i;
            };
            n.multiplyVec3 = function(t, e, i) {
                i || (i = e);
                var r = e[0], o = e[1], n = e[2];
                e = t[0];
                var s = t[1], a = t[2];
                t = t[3];
                var h = t * r + s * n - a * o, u = t * o + a * r - e * n, p = t * n + e * o - s * r;
                r = -e * r - s * o - a * n;
                i[0] = h * t + r * -e + u * -a - p * -s;
                i[1] = u * t + r * -s + p * -e - h * -a;
                i[2] = p * t + r * -a + h * -s - u * -e;
                return i;
            };
            n.toMat3 = function(t, e) {
                e || (e = r.create());
                var i = t[0], o = t[1], n = t[2], s = t[3], a = i + i, h = o + o, u = n + n, p = i * a, f = i * h;
                i = i * u;
                var l = o * h;
                o = o * u;
                n = n * u;
                a = s * a;
                h = s * h;
                s = s * u;
                e[0] = 1 - (l + n);
                e[1] = f - s;
                e[2] = i + h;
                e[3] = f + s;
                e[4] = 1 - (p + n);
                e[5] = o - a;
                e[6] = i - h;
                e[7] = o + a;
                e[8] = 1 - (p + l);
                return e;
            };
            n.toMat4 = function(t, e) {
                e || (e = o.create());
                var i = t[0], r = t[1], n = t[2], s = t[3], a = i + i, h = r + r, u = n + n, p = i * a, f = i * h;
                i = i * u;
                var l = r * h;
                r = r * u;
                n = n * u;
                a = s * a;
                h = s * h;
                s = s * u;
                e[0] = 1 - (l + n);
                e[1] = f - s;
                e[2] = i + h;
                e[3] = 0;
                e[4] = f + s;
                e[5] = 1 - (p + n);
                e[6] = r - a;
                e[7] = 0;
                e[8] = i - h;
                e[9] = r + a;
                e[10] = 1 - (p + l);
                e[11] = 0;
                e[12] = 0;
                e[13] = 0;
                e[14] = 0;
                e[15] = 1;
                return e;
            };
            n.slerp = function(t, e, i, r) {
                r || (r = t);
                var o = i;
                if (t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3] < 0) o = -1 * i;
                r[0] = 1 - i * t[0] + o * e[0];
                r[1] = 1 - i * t[1] + o * e[1];
                r[2] = 1 - i * t[2] + o * e[2];
                r[3] = 1 - i * t[3] + o * e[3];
                return r;
            };
            n.str = function(t) {
                return "[" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + "]";
            };
            t.exports = {
                vec3: i,
                mat3: r,
                mat4: o,
                quat4: n
            };
        },
        8: function(t, e) {
            "use strict";
            function i(t, e) {
                var i = function t(e) {
                    if (Object.create) {
                        return Object.create(e);
                    }
                    function i() {}
                    i.prototype = e;
                    return new i();
                };
                t.prototype = i(e.prototype);
                t.prototype.constructor = t;
            }
            t.exports = i;
        },
        21: function(t, e, i) {
            "use strict";
            var r = i(8);
            var o = s(r);
            var n = i(5);
            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function a() {
                this.workNum = 10;
                this.workTrs = [];
                this.workQs = [];
                this.workVs = [];
                for (var t = 0; t < this.workNum; t++) {
                    this.workTrs[t] = new Ammo.btTransform();
                    this.workQs[t] = new Ammo.btQuaternion();
                    this.workVs[t] = new Ammo.btVector3();
                }
            }
            a.prototype.allocTr = function() {
                var t = this.workTrs[this.workTrs.length - 1];
                this.workTrs.length--;
                return t;
            };
            a.prototype.freeTr = function(t) {
                this.workTrs[this.workTrs.length] = t;
            };
            a.prototype.allocQ = function() {
                var t = this.workQs[this.workQs.length - 1];
                this.workQs.length--;
                return t;
            };
            a.prototype.freeQ = function(t) {
                this.workQs[this.workQs.length] = t;
            };
            a.prototype.allocV = function() {
                var t = this.workVs[this.workVs.length - 1];
                this.workVs.length--;
                return t;
            };
            a.prototype.freeV = function(t) {
                this.workVs[this.workVs.length] = t;
            };
            a.prototype._newTransform = function() {
                return new Ammo.btTransform();
            };
            a.prototype._setIdentity = function(t) {
                t.setIdentity();
            };
            a.prototype._getBasis = function(t) {
                var e = this.allocQ();
                t.getBasis().getRotation(e);
                return e;
            };
            a.prototype._getBasisMatrix3 = function(t) {
                var e = this._getBasis(t);
                var i = this._quaternionToMatrix3(e);
                this.freeQ(e);
                return i;
            };
            a.prototype._setBasis = function(t, e) {
                t.setRotation(e);
            };
            a.prototype._setBasisMatrix3 = function(t, e) {
                var i = this._matrix3ToQuaternion(e);
                this._setBasis(t, i);
                this.freeQ(i);
            };
            a.prototype._setBasisArray4 = function(t, e) {
                var i = this._array4ToQuaternion(e);
                this._setBasis(t, i);
                this.freeQ(i);
            };
            a.prototype._setBasisArray4Left = function(t, e) {
                e[0] = -e[0];
                e[1] = -e[1];
                this._setBasisArray4(t, e);
                e[0] = -e[0];
                e[1] = -e[1];
            };
            a.prototype._setBasisArray3 = function(t, e) {
                t.getBasis().setEulerZYX(e[0], e[1], e[2]);
            };
            a.prototype._setBasisArray3Left = function(t, e) {
                e[0] = -e[0];
                e[1] = -e[1];
                this._setBasisArray3(t, e);
                e[0] = -e[0];
                e[1] = -e[1];
            };
            a.prototype._getOrigin = function(t) {
                return t.getOrigin();
            };
            a.prototype._getOriginArray3 = function(t) {
                var e = this._getOrigin(t);
                return [ e.x(), e.y(), e.z() ];
            };
            a.prototype._setOrigin = function(t, e) {
                t.getOrigin().setValue(e.x(), e.y(), e.z());
            };
            a.prototype._setOriginArray3 = function(t, e) {
                t.getOrigin().setValue(e[0], e[1], e[2]);
            };
            a.prototype._setOriginArray3Left = function(t, e) {
                e[2] = -e[2];
                this._setOriginArray3(t, e);
                e[2] = -e[2];
            };
            a.prototype._setOriginFloats = function(t, e, i, r) {
                t.getOrigin().setValue(e, i, r);
            };
            a.prototype._copyOrigin = function(t, e) {
                var i = e.getOrigin();
                this._setOrigin(t, i);
            };
            a.prototype._addVector3 = function(t, e) {
                var i = this.allocV();
                i.setValue(t.x() + e.x(), t.y() + e.y(), t.z() + e.z());
                return i;
            };
            a.prototype._addVector3ByArray3 = function(t, e) {
                var i = this.allocV();
                i.setValue(t.x() + e[0], t.y() + e[1], t.z() + e[2]);
                return i;
            };
            a.prototype._dotVectors3 = function(t, e) {
                return t.x() * e.x() + t.y() * e.y() + t.z() * e.z();
            };
            a.prototype._rowOfMatrix3 = function(t, e) {
                var i = this.allocV();
                i.setValue(t[e * 3 + 0], t[e * 3 + 1], t[e * 3 + 2]);
                return i;
            };
            a.prototype._columnOfMatrix3 = function(t, e) {
                var i = this.allocV();
                i.setValue(t[e + 0], t[e + 3], t[e + 6]);
                return i;
            };
            a.prototype._negativeVector3 = function(t) {
                var e = this.allocV();
                e.setValue(-t.x(), -t.y(), -t.z());
                return e;
            };
            a.prototype._cloneVector3 = function(t) {
                var e = this.allocV();
                e.setValue(t.x(), t.y(), t.z());
                return e;
            };
            a.prototype._cloneMatrix3 = function(t) {
                var e = [];
                for (var i = 0; i < 9; i++) {
                    e[i] = t[i];
                }
                return e;
            };
            a.prototype._array3ToVector3 = function(t) {
                var e = this.allocV();
                e.setValue(t[0], t[1], t[2]);
                return e;
            };
            a.prototype._vector3ToArray3 = function(t) {
                var e = [];
                e[0] = t.x();
                e[1] = t.y();
                e[2] = t.z();
                return e;
            };
            a.prototype._array4ToQuaternion = function(t) {
                var e = this.allocQ();
                e.setX(t[0]);
                e.setY(t[1]);
                e.setZ(t[2]);
                e.setW(t[3]);
                return e;
            };
            a.prototype._quaternionToArray4 = function(t) {
                var e = [ t.x(), t.y(), t.z(), t.w() ];
                return e;
            };
            a.prototype._quaternionToEulerZYX = function(t) {
                var e = t.w();
                var i = t.x();
                var r = t.y();
                var o = t.z();
                var n = e * e;
                var s = i * i;
                var a = r * r;
                var h = o * o;
                var u = i * r + o * e;
                var p, f, l;
                if (u > .499) {
                    l = 360 / Math.PI * Math.atan2(i, e);
                    f = 90;
                    p = 0;
                } else if (u < -.499) {
                    l = -360 / Math.PI * Math.atan2(i, e);
                    f = -90;
                    l = 0;
                } else {
                    var c = Math.atan2(2 * r * e - 2 * i * o, 1 - 2 * a - 2 * o);
                    var m = Math.asin(2 * i * r + 2 * o * e);
                    var _ = Math.atan2(2 * i * e - 2 * r * o, 1 - 2 * s - 2 * o);
                    l = Math.round(c * 180 / Math.PI);
                    f = Math.round(m * 180 / Math.PI);
                    p = Math.round(_ * 180 / Math.PI);
                }
                return [ p, l, f ];
                var v = t.x() * t.x();
                var d = t.y() * t.y();
                var y = t.z() * t.z();
                var g = t.w() * t.w();
                var T = v + d + y + g;
                var A = t.w() * t.x() + t.y() * t.z();
                var E = 1e-7;
                var p, f, l;
                if (A > (.5 - E) * T) {
                    p = 2 * Math.atan2(t.y(), t.w());
                    f = Math.PI;
                    l = 0;
                } else if (A < (-.5 + E) * T) {
                    p = -2 * Math.atan2(t.y(), t.w());
                    f = -Math.PI;
                    l = 0;
                } else {
                    var I = t.w() * t.z() - t.x() * t.y();
                    var C = t.w() * t.y() - t.x() * t.z();
                    p = Math.atan2(2 * I, 1 - 2 * (y + v));
                    f = Math.asin(2 * A / T);
                    l = Math.atan2(2 * C, 1 - 2 * (d + v));
                }
                return [ l, f, p ];
            };
            a.prototype._multiplyTransforms = function(t, e) {
                var i = this.allocTr();
                i.setIdentity();
                var r = this._getBasisMatrix3(t);
                var o = this._getBasisMatrix3(e);
                var n = this._getOrigin(t);
                var s = this._getOrigin(e);
                var a = this._multiplyMatrix3ByVector3(r, s);
                var h = this._addVector3(a, n);
                this._setOrigin(i, h);
                var u = this._multiplyMatrices3(r, o);
                this._setBasisMatrix3(i, u);
                this.freeV(a);
                this.freeV(h);
                return i;
            };
            a.prototype._inverseTransform = function(t) {
                var e = this.allocTr();
                var i = this._getBasisMatrix3(t);
                var r = this._getOrigin(t);
                var o = this._transposeMatrix3(i);
                var n = this._negativeVector3(r);
                var s = this._multiplyMatrix3ByVector3(o, n);
                this._setOrigin(e, s);
                this._setBasisMatrix3(e, o);
                this.freeV(n);
                this.freeV(s);
                return e;
            };
            a.prototype._multiplyTransformByVector3 = function(t, e) {
                var i = this._getBasisMatrix3(t);
                var r = this._getOrigin(t);
                var o = this._multiplyMatrix3ByVector3(i, e);
                var n = this._addVector3(o, r);
                this.freeV(o);
                return n;
            };
            a.prototype._multiplyMatrix3ByVector3 = function(t, e) {
                var i = this.allocV();
                var r = this._rowOfMatrix3(t, 0);
                var o = this._rowOfMatrix3(t, 1);
                var n = this._rowOfMatrix3(t, 2);
                var s = this._dotVectors3(r, e);
                var a = this._dotVectors3(o, e);
                var h = this._dotVectors3(n, e);
                i.setValue(s, a, h);
                this.freeV(r);
                this.freeV(o);
                this.freeV(n);
                return i;
            };
            a.prototype._multiplyMatrices3 = function(t, e) {
                var i = [];
                var r = this._rowOfMatrix3(t, 0);
                var o = this._rowOfMatrix3(t, 1);
                var n = this._rowOfMatrix3(t, 2);
                var s = this._columnOfMatrix3(e, 0);
                var a = this._columnOfMatrix3(e, 1);
                var h = this._columnOfMatrix3(e, 2);
                i[0] = this._dotVectors3(r, s);
                i[1] = this._dotVectors3(r, a);
                i[2] = this._dotVectors3(r, h);
                i[3] = this._dotVectors3(o, s);
                i[4] = this._dotVectors3(o, a);
                i[5] = this._dotVectors3(o, h);
                i[6] = this._dotVectors3(n, s);
                i[7] = this._dotVectors3(n, a);
                i[8] = this._dotVectors3(n, h);
                this.freeV(r);
                this.freeV(o);
                this.freeV(n);
                this.freeV(s);
                this.freeV(a);
                this.freeV(h);
                return i;
            };
            a.prototype._transposeMatrix3 = function(t) {
                var e = [];
                e[0] = t[0];
                e[1] = t[3];
                e[2] = t[6];
                e[3] = t[1];
                e[4] = t[4];
                e[5] = t[7];
                e[6] = t[2];
                e[7] = t[5];
                e[8] = t[8];
                return e;
            };
            a.prototype._inverseMatrix3 = function(t) {
                var e = t[0];
                var i = t[1];
                var r = t[2];
                var o = t[3];
                var n = t[4];
                var s = t[5];
                var a = t[6];
                var h = t[7];
                var u = t[8];
                var p = e * n * u + o * h * r + a * i * s - a * n * r - o * i * u - e * h * s;
                if (p == 0) return this._cloneMatrix3(t);
                var f = [];
                f[0] = (n * u - s * h) / p;
                f[1] = (r * h - i * u) / p;
                f[2] = (i * s - r * n) / p;
                f[3] = (s * a - o * u) / p;
                f[4] = (e * u - r * a) / p;
                f[5] = (r * o - e * s) / p;
                f[6] = (o * h - n * a) / p;
                f[7] = (i * a - e * h) / p;
                f[8] = (e * n - i * o) / p;
                return f;
            };
            a.prototype._quaternionToMatrix3 = function(t) {
                var e = n.quat4.create();
                e[0] = t.x();
                e[1] = t.y();
                e[2] = t.z();
                e[3] = t.w();
                return n.quat4.toMat3(e);
            };
            a.prototype._matrix3ToQuaternion = function(t) {
                var e = t[0] + t[4] + t[8];
                var i, r, o, n, s;
                if (e > 0) {
                    i = Math.sqrt(e + 1) * 2;
                    s = .25 * i;
                    r = (t[7] - t[5]) / i;
                    o = (t[2] - t[6]) / i;
                    n = (t[3] - t[1]) / i;
                } else if (t[0] > t[4] && t[0] > t[8]) {
                    i = Math.sqrt(1 + t[0] - t[4] - t[8]) * 2;
                    s = (t[7] - t[5]) / i;
                    r = .25 * i;
                    o = (t[1] + t[3]) / i;
                    n = (t[2] + t[6]) / i;
                } else if (t[4] > t[8]) {
                    i = Math.sqrt(1 + t[4] - t[0] - t[8]) * 2;
                    s = (t[2] - t[6]) / i;
                    r = (t[1] + t[3]) / i;
                    o = .25 * i;
                    n = (t[5] + t[7]) / i;
                } else {
                    i = Math.sqrt(1 + t[8] - t[0] - t[4]) * 2;
                    s = (t[3] - t[1]) / i;
                    r = (t[2] + t[6]) / i;
                    o = (t[5] + t[7]) / i;
                    n = .25 * i;
                }
                var a = this.allocQ();
                a.setX(r);
                a.setY(o);
                a.setZ(n);
                a.setW(s);
                return a;
            };
            a.prototype._dumpTransform = function(t) {
                var e = this._getBasis(t);
                var i = "";
                i += "-- origin --\n";
                i += this._getOriginArray3(t).toString() + "\n";
                i += "-- quaternion --\n";
                i += [ e.x(), e.y(), e.z(), e.w() ].toString() + "\n";
                i += "-- matrix --\n";
                i += this._dumpMatrix3(this._getBasisMatrix3(t));
                this.freeQ(e);
                return i;
            };
            a.prototype._dumpMatrix3 = function(t) {
                var e = "";
                for (var i = 0; i < 3; i++) {
                    e += [ t[i * 3 + 0], t[i * 3 + 1], t[i * 3 + 2] ].toString() + ",\n";
                }
                return e;
            };
            function h(t, e, i) {
                this.parent = a;
                this.parent.call(this);
                this.pmd = t;
                this.world = e;
                this.body = i;
                this.rb = null;
                this.bone = null;
                this.form = null;
                this.boneForm = null;
                this.boneOffsetForm = null;
                this.boneOffsetFormInverse = null;
                this._init();
            }
            (0, o.default)(h, a);
            h.prototype._init = function() {
                var t = this.body;
                var e = this.pmd.bones[t.boneIndex];
                var i = this._generateShape(t);
                var r = t.type == 0 ? 0 : t.weight;
                var o = this.allocV();
                o.setValue(0, 0, 0);
                if (r != 0) i.calculateLocalInertia(r, o);
                var n = this.allocTr();
                this._setIdentity(n);
                this._setOriginArray3Left(n, t.position);
                this._setBasisArray3Left(n, t.rotation);
                var s = this.allocTr();
                this._setIdentity(s);
                var a = this.body.boneIndex == 65535 ? [ 0, 0, 0 ] : e.position;
                this._setOriginArray3Left(s, a);
                var h = this._multiplyTransforms(s, n);
                var u = new Ammo.btDefaultMotionState(h);
                var p = new Ammo.btRigidBodyConstructionInfo(r, u, i, o);
                p.set_m_friction(t.friction);
                p.set_m_restitution(t.recoil);
                var f = new Ammo.btRigidBody(p);
                if (t.type == 0) {
                    f.setCollisionFlags(f.getCollisionFlags() | 2);
                    f.setActivationState(4);
                }
                f.setDamping(t.positionDim, t.rotationDim);
                f.setSleepingThresholds(0, 0);
                this.world.addRigidBody(f, 1 << t.groupIndex, t.groupTarget);
                this.rb = f;
                this.bone = e;
                this.boneOffsetForm = n;
                this.boneOffsetFormInverse = this._inverseTransform(n);
                this.freeV(o);
                this.freeTr(h);
                this.freeTr(s);
            };
            h.prototype._generateShape = function(t) {
                switch (t.shapeType) {
                  case 0:
                    return new Ammo.btSphereShape(t.width);

                  case 1:
                    return new Ammo.btBoxShape(new Ammo.btVector3(t.width, t.height, t.depth));

                  case 2:
                    return new Ammo.btCapsuleShape(t.width, t.height);

                  default:
                    throw "unknown shape type." + t;
                }
            };
            h.prototype.reset = function(t) {
                this._setTransformFromBone(t);
            };
            h.prototype.preSimulation = function(t) {
                if (this.body.boneIndex == 65535) return;
                if (this.body.type == 0) this._setTransformFromBone(t);
                if (this.body.type == 2) this._setPositionFromBone(t);
            };
            h.prototype._setTransformFromBone = function(t) {
                var e = t[this.body.boneIndex];
                if (this.body.boneIndex == 65535) {
                    e = {
                        p: [ 0, 0, 0 ],
                        r: [ 0, 0, 0, 1 ]
                    };
                }
                var i = this.allocTr();
                this._setOriginArray3Left(i, e.p);
                this._setBasisArray4Left(i, e.r);
                var r = this._multiplyTransforms(i, this.boneOffsetForm);
                this.rb.setCenterOfMassTransform(r);
                this.rb.getMotionState().setWorldTransform(r);
                this.freeTr(i);
                this.freeTr(r);
            };
            h.prototype._setPositionFromBone = function(t) {
                var e = t[this.body.boneIndex];
                var i = this.allocTr();
                this._setOriginArray3Left(i, e.p);
                this._setBasisArray4Left(i, e.r);
                var r = this._multiplyTransforms(i, this.boneOffsetForm);
                var o = this.allocTr();
                this.rb.getMotionState().getWorldTransform(o);
                this._copyOrigin(o, r);
                this.rb.setCenterOfMassTransform(o);
                this.rb.getMotionState().setWorldTransform(o);
                this.freeTr(i);
                this.freeTr(o);
                this.freeTr(r);
            };
            h.prototype.postSimulation = function(t) {
                if (this.body.type == 0 || this.body.boneIndex == 65535) return;
                var e = t[this.body.boneIndex];
                var i = this.allocTr();
                this.rb.getMotionState().getWorldTransform(i);
                var r = this._multiplyTransforms(i, this.boneOffsetFormInverse);
                var o = this._getBasis(r);
                e.r[0] = -o.x();
                e.r[1] = -o.y();
                e.r[2] = o.z();
                e.r[3] = o.w();
                if (this.body.type == 1) {
                    var n = this._getOrigin(r);
                    e.p[0] = n.x();
                    e.p[1] = n.y();
                    e.p[2] = -n.z();
                }
                this.freeQ(o);
                this.freeTr(i);
                this.freeTr(r);
            };
            function u(t, e, i, r, o) {
                this.parent = a;
                this.parent.call(this);
                this.pmd = t;
                this.world = e;
                this.joint = i;
                this.bodyA = r;
                this.bodyB = o;
                this.constraint = null;
                this.boneOffsetForm = null;
                this.boneOffsetFormInverse = null;
                this._init();
            }
            (0, o.default)(u, a);
            u.prototype._init = function() {
                var t = this.joint;
                var e = this.bodyA.rb;
                var i = this.bodyB.rb;
                var r = this.bodyA.body;
                var o = this.bodyB.body;
                if (r.type !== 0 && o.type == 2) {
                    if (r.boneIndex > 0 && o.boneIndex > 0 && r.boneIndex != 65535 && o.boneIndex != 65535) {
                        var n = this.pmd.bones[r.boneIndex];
                        var s = this.pmd.bones[o.boneIndex];
                        if (s.parentIndex == n.id) {
                            o.type = 1;
                        }
                    }
                }
                var a = this.allocTr();
                this._setOriginArray3Left(a, t.position);
                this._setBasisArray3Left(a, t.rotation);
                var h = e.getWorldTransform();
                var u = i.getWorldTransform();
                var p = this._inverseTransform(h);
                var f = this._inverseTransform(u);
                var l = this._multiplyTransforms(p, a);
                var c = this._multiplyTransforms(f, a);
                var m = new Ammo.btGeneric6DofSpringConstraint(e, i, l, c, true);
                var _ = this.allocV();
                var v = this.allocV();
                var d = this.allocV();
                var y = this.allocV();
                _.setValue(t.translationLimitation1[0], t.translationLimitation1[1], -t.translationLimitation2[2]);
                v.setValue(t.translationLimitation2[0], t.translationLimitation2[1], -t.translationLimitation1[2]);
                d.setValue(-t.rotationLimitation2[0], -t.rotationLimitation2[1], t.rotationLimitation1[2]);
                y.setValue(-t.rotationLimitation1[0], -t.rotationLimitation1[1], t.rotationLimitation2[2]);
                m.setLinearLowerLimit(_);
                m.setLinearUpperLimit(v);
                m.setAngularLowerLimit(d);
                m.setAngularUpperLimit(y);
                for (var g = 0; g < 3; g++) {
                    if (t.springPosition[g] != 0) {
                        m.enableSpring(g, true);
                        m.setStiffness(g, t.springPosition[g]);
                    }
                }
                for (var g = 0; g < 3; g++) {
                    if (t.springRotation[g] != 0) {
                        m.enableSpring(g + 3, true);
                        m.setStiffness(g + 3, t.springRotation[g]);
                    }
                }
                this.world.addConstraint(m, true);
                this.constraint = m;
                this.freeTr(a);
                Ammo.destroy(h);
                Ammo.destroy(u);
                this.freeTr(p);
                this.freeTr(f);
                this.freeTr(l);
                this.freeTr(c);
                this.freeV(_);
                this.freeV(v);
                this.freeV(d);
                this.freeV(y);
            };
            function p(t) {
                this.pmd = t;
                this.world = null;
                this.bodies = [];
                this.constraints = [];
                this.count = 0;
                this._init();
            }
            p.prototype._init = function() {
                this.world = this._generateWorld();
                this.bodies.length = 0;
                for (var t = 0; t < this.pmd.rigidBodyCount; t++) {
                    this.bodies.push(new h(this.pmd, this.world, this.pmd.rigidBodies[t]));
                }
                this.constraints.length = 0;
                for (var t = 0; t < this.pmd.jointCount; t++) {
                    var e = this.pmd.joints[t];
                    var i = this.bodies[e.rigidBody1];
                    var r = this.bodies[e.rigidBody2];
                    this.constraints.push(new u(this.pmd, this.world, e, i, r));
                }
            };
            p.prototype._generateWorld = function() {
                var t = new Ammo.btDefaultCollisionConfiguration();
                var e = new Ammo.btCollisionDispatcher(t);
                var i = new Ammo.btDbvtBroadphase();
                var r = new Ammo.btSequentialImpulseConstraintSolver();
                var o = new Ammo.btDiscreteDynamicsWorld(e, i, r, t);
                o.setGravity(new Ammo.btVector3(0, -10 * 10, 0));
                return o;
            };
            p.prototype._generateGround = function() {
                var t = new Ammo.btTransform();
                t.setIdentity();
                t.setOrigin(new Ammo.btVector3(0, -1, 0));
                return new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(0, new Ammo.btDefaultMotionState(t), new Ammo.btBoxShape(new Ammo.btVector3(5, 1, 5)), new Ammo.btVector3(0, 0, 0)));
            };
            p.prototype.simulate = function(t, e) {
                this._preSimulation(t);
                this.world.stepSimulation(1 / 60, 0, 1 / 60);
                this._postSimulation(t);
            };
            p.prototype.simulateFrame = function(t, e) {
                var i;
                var r = 1 / 60 * e;
                var o = e;
                var n = 1 / 60;
                if (e >= 3) {
                    o = 2;
                    n = 1 / 60 * 2;
                    i = this.world.getGravity();
                    i.setY(-10 * 10 / 2);
                    this.world.setGravity(i);
                }
                this._preSimulation(t);
                this.world.stepSimulation(r, o, n);
                this._postSimulation(t);
                if (e >= 3) {
                    i.setY(-10 * 10);
                    this.world.setGravity(i);
                    Ammo.destroy(i);
                }
            };
            p.prototype._preSimulation = function(t) {
                for (var e = 0; e < this.bodies.length; e++) {
                    this.bodies[e].preSimulation(t);
                }
            };
            p.prototype._postSimulation = function(t) {
                for (var e = 0; e < this.bodies.length; e++) {
                    this.bodies[e].postSimulation(t);
                }
            };
            p.prototype.resetRigidBodies = function(t) {
                for (var e = 0; e < this.bodies.length; e++) {
                    this.bodies[e].reset(t);
                }
            };
            t.exports = p;
        },
        22: function(t, e) {
            "use strict";
            function i() {
                this.header = null;
                this.englishHeader = null;
                this.vertexCount = null;
                this.vertexIndexCount = null;
                this.materialCount = null;
                this.boneCount = null;
                this.ikCount = null;
                this.faceCount = null;
                this.faceDisplayCount = null;
                this.boneFrameNameCount = null;
                this.boneDisplayCount = null;
                this.toonTextureCount = null;
                this.rigidBodyCount = null;
                this.jointCount = null;
                this.vertices = [];
                this.vertexIndices = [];
                this.materials = [];
                this.bones = [];
                this.iks = [];
                this.faces = [];
                this.faceDisplays = [];
                this.boneFrameNames = [];
                this.boneDisplays = [];
                this.englishBoneNames = [];
                this.englishFaceNames = [];
                this.englishBoneFrameNames = [];
                this.toonTextures = [];
                this.rigidBodies = [];
                this.joints = [];
                this.bonesHash = {};
                this.facesHash = {};
                this.images = [];
                this.toonImages = [];
                this.sphereImages = [];
                this.centerBone = {};
                this.leftFootBone = {};
                this.rightFootBone = {};
                this.leftEyeBone = {};
                this.rightEyeBone = {};
            }
            i.prototype.valid = function() {
                return this.header.valid();
            };
            i.prototype.getParentBone = function(t) {
                return this.bones[t.parentIndex];
            };
            i.prototype.loadImages = function(t, e) {
                var i = new A(this, t);
                i.load(e);
            };
            i.prototype.setup = function() {
                for (var t = 0; t < this.vertexCount; t++) {
                    this.vertices[t].setup();
                }
                for (var t = 0; t < this.boneCount; t++) {
                    this.bonesHash[this.bones[t].name] = this.bones[t];
                }
                for (var t = 0; t < this.faceCount; t++) {
                    this.facesHash[this.faces[t].name] = this.faces[t];
                }
                this._keepSomeBonesInfo();
            };
            i.prototype.toRight = function() {
                for (var t = 0; t < this.vertexCount; t++) {
                    this.vertices[t].toRight();
                }
                for (var t = 0; t < this.boneCount; t++) {
                    this.bones[t].toRight();
                }
                for (var t = 0; t < this.faceCount; t++) {
                    this.faces[t].toRight();
                }
                for (var t = 0; t < this.rigidBodyCount; t++) {
                    this.rigidBodies[t].toRight();
                }
                for (var t = 0; t < this.jointCount; t++) {
                    this.joints[t].toRight();
                }
            };
            i.prototype._keepSomeBonesInfo = function() {
                this._keepBoneInfo(this.centerBone, "0x830x5a0x830x930x830x5e0x810x5b");
                this._keepBoneInfo(this.leftFootBone, "0x8d0xb60x910xab0x8e0xf1");
                this._keepBoneInfo(this.rightFootBone, "0x890x450x910xab0x8e0xf1");
                this._keepBoneInfo(this.leftEyeBone, "0x8d0xb60x960xda");
                this._keepBoneInfo(this.rightEyeBone, "0x890x450x960xda");
            };
            i.prototype._keepBoneInfo = function(t, e) {
                var i = this._findBoneNumberByName(e);
                if (i !== null) {
                    var r = this.bones[i];
                    t.pos = this._getAveragePositionOfBone(r);
                    t.id = i;
                    t.bone = r;
                    t.posFromBone = [];
                    t.posFromBone[0] = t.pos[0] - r.position[0];
                    t.posFromBone[1] = t.pos[1] - r.position[1];
                    t.posFromBone[2] = t.pos[2] - r.position[2];
                } else {
                    t.pos = null;
                    t.id = null;
                    t.bone = null;
                    t.posFromBone = null;
                }
            };
            i.prototype._findBoneNumberByName = function(t) {
                for (var e = 0; e < this.boneCount; e++) {
                    if (this.bones[e].name == t) return e;
                }
                return null;
            };
            i.prototype._getAveragePositionOfBone = function(t) {
                var e = 0;
                var i = [ 0, 0, 0 ];
                for (var r = 0; r < this.vertexCount; r++) {
                    var o = this.vertices[r];
                    if (o.boneIndices[0] == t.id || o.boneIndices[1] == t.id) {
                        i[0] += o.position[0];
                        i[1] += o.position[1];
                        i[2] += o.position[2];
                        e++;
                    }
                }
                if (e != 0) {
                    i[0] = i[0] / e;
                    i[1] = i[1] / e;
                    i[2] = i[2] / e;
                }
                return i;
            };
            i.prototype.getBoneNames = function() {
                var t = [];
                for (var e = 0; e < this.boneCount; e++) {
                    t[e] = this.bones[e].name;
                }
                return t;
            };
            i.prototype.getFaceNames = function() {
                var t = [];
                for (var e = 0; e < this.faceCount; e++) {
                    t[e] = this.faces[e].name;
                }
                return t;
            };
            i.prototype.dump = function() {
                var t = "";
                t += "vertexCount: " + this.vertexCount + "\n";
                t += "vertexIndexCount: " + this.vertexIndexCount + "\n";
                t += "materialCount: " + this.materialCount + "\n";
                t += "boneCount: " + this.boneCount + "\n";
                t += "ikCount: " + this.ikCount + "\n";
                t += "faceCount: " + this.faceCount + "\n";
                t += "faceDisplayCount: " + this.faceDisplayCount + "\n";
                t += "boneFrameNameCount: " + this.boneFrameNameCount + "\n";
                t += "boneDisplayCount: " + this.boneDisplayCount + "\n";
                t += "toonTextureCount: " + this.toonTextureCount + "\n";
                t += "rigidBodyCount: " + this.rigidBodyCount + "\n";
                t += "jointCount: " + this.jointCount + "\n";
                t += "\n";
                t += this._dumpHeader();
                t += this._dumpVertices();
                t += this._dumpVertexIndices();
                t += this._dumpMaterials();
                t += this._dumpBones();
                t += this._dumpIKs();
                t += this._dumpFaces();
                t += this._dumpfaceDisplays();
                t += this._dumpBoneFrameNames();
                t += this._dumpBoneDisplays();
                t += this._dumpEnglishHeader();
                t += this._dumpEnglishBoneNames();
                t += this._dumpEnglishFaceNames();
                t += this._dumpToonTextures();
                t += this._dumpRigidBodies();
                t += this._dumpJoints();
                return t;
            };
            i.prototype.boneNumsOfMaterials = function() {
                var t = 0;
                var e = [];
                for (var i = 0; i < this.materialCount; i++) {
                    var r = [];
                    for (var o = 0; o < this.boneCount; o++) {
                        r[o] = 0;
                    }
                    var n = 0;
                    var s = this.materials[i].vertexCount;
                    for (var o = 0; o < s; o++) {
                        var a = this.vertices[this.vertexIndices[t + o].index];
                        for (var h = 0; h < a.boneIndices.length; h++) {
                            var u = a.boneIndices[h];
                            if (r[u] == 0) n++;
                            r[u]++;
                        }
                    }
                    e.push(n);
                    t += s;
                }
                return e;
            };
            i.prototype._dumpHeader = function() {
                var t = "";
                t += "-- Header --\n";
                t += this.header.dump();
                t += "\n";
                return t;
            };
            i.prototype._dumpEnglishHeader = function() {
                var t = "";
                t += "-- Header(English) --\n";
                t += this.englishHeader.dump();
                t += "\n";
                return t;
            };
            i.prototype._dumpVertices = function() {
                var t = "";
                t += "-- Vertices --\n";
                for (var e = 0; e < this.vertexCount; e++) {
                    t += this.vertices[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpVertexIndices = function() {
                var t = "";
                t += "-- VertexIndices --\n";
                for (var e = 0; e < this.vertexIndexCount; e++) {
                    t += this.vertexIndices[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpMaterials = function() {
                var t = "";
                t += "-- Materials --\n";
                for (var e = 0; e < this.materialCount; e++) {
                    t += this.materials[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpBones = function() {
                var t = "";
                t += "-- Bones --\n";
                for (var e = 0; e < this.boneCount; e++) {
                    t += this.bones[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpIKs = function() {
                var t = "";
                t += "-- IKs --\n";
                for (var e = 0; e < this.ikCount; e++) {
                    t += this.iks[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpFaces = function() {
                var t = "";
                t += "-- Faces --\n";
                for (var e = 0; e < this.faceCount; e++) {
                    t += this.faces[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpFaceDisplays = function() {
                var t = "";
                t += "-- Face Displays --\n";
                for (var e = 0; e < this.faceDisplayCount; e++) {
                    t += this.faceDisplays[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpBoneFrameNames = function() {
                var t = "";
                t += "-- Bone Frame Names --\n";
                for (var e = 0; e < this.boneFrameNameCount; e++) {
                    t += this.boneFrameNames[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpBoneDisplays = function() {
                var t = "";
                t += "-- Bone Displays --\n";
                for (var e = 0; e < this.boneDisplayCount; e++) {
                    t += this.boneDisplays[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpEnglishBoneNames = function() {
                var t = "";
                t += "-- Bone Names(English) --\n";
                for (var e = 0; e < this.boneCount; e++) {
                    t += this.englishBoneNames[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpEnglishFaceNames = function() {
                var t = "";
                t += "-- Face Names(English) --\n";
                for (var e = 0; e < this.faceCount - 1; e++) {
                    t += this.englishFaceNames[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpEnglishBoneFrameNames = function() {
                var t = "";
                t += "-- Bone Frame Names(English) --\n";
                for (var e = 0; e < this.boneFrameNameCount; e++) {
                    t += this.englishBoneFrameNames[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpToonTextures = function() {
                var t = "";
                t += "-- Toon Textures --\n";
                for (var e = 0; e < this.toonTextureCount; e++) {
                    t += this.toonTextures[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpRigidBodies = function() {
                var t = "";
                t += "-- Rigid Bodies --\n";
                for (var e = 0; e < this.rigidBodyCount; e++) {
                    t += this.rigidBodies[e].dump();
                }
                t += "\n";
                return t;
            };
            i.prototype._dumpJoints = function() {
                var t = "";
                t += "-- Joints --\n";
                for (var e = 0; e < this.jointCount; e++) {
                    t += this.joints[e].dump();
                }
                t += "\n";
                return t;
            };
            function r() {
                this.magic = null;
                this.version = null;
                this.modelName = null;
                this.comment = null;
            }
            r.prototype.valid = function() {
                return this.magic == "Pmd";
            };
            r.prototype.dump = function() {
                var t = "";
                t += "magic: " + this.magic + "\n";
                t += "version: " + this.version + "\n";
                t += "model_name: " + this.modelName + "\n";
                t += "comment: " + this.comment + "\n";
                return t;
            };
            function o(t) {
                this.id = t;
                this.position = null;
                this.normal = null;
                this.uv = null;
                this.boneIndices = null;
                this.boneWeight = null;
                this.edgeFlag = null;
                this.boneWeightFloat1 = null;
                this.boneWeightFloat2 = null;
            }
            o.prototype.setup = function() {
                this.boneWeightFloat1 = this.boneWeight / 100;
                this.boneWeightFloat2 = (100 - this.boneWeight) / 100;
            };
            o.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "position: " + this.position + "\n";
                t += "normal: " + this.normal + "\n";
                t += "uv: " + this.uv + "\n";
                t += "boneIndices: " + this.boneIndices + "\n";
                t += "boneWeight: " + this.boneWeight + "\n";
                t += "edgeFlag: " + this.edgeFlag + "\n";
                return t;
            };
            o.prototype.toRight = function() {
                this.position[2] = -this.position[2];
                this.normal[2] = -this.normal[2];
            };
            function n(t) {
                this.id = t;
                this.index = null;
            }
            n.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "index: " + this.index + "\n";
                return t;
            };
            function s(t) {
                this.id = t;
                this.color = null;
                this.specularity = null;
                this.specularColor = null;
                this.mirrorColor = null;
                this.tuneIndex = null;
                this.edgeFlag = null;
                this.vertexCount = null;
                this.fileName = null;
            }
            s.prototype.convertedFileName = function() {
                var t = this.fileName.replace(".tga", ".png");
                var e;
                if ((e = t.lastIndexOf("*")) >= 0) {
                    t = t.substring(0, e);
                }
                return t;
            };
            s.prototype.hasSphereTexture = function() {
                if (this.fileName.lastIndexOf(".sph") >= 0 || this.fileName.lastIndexOf(".spa") >= 0) return true;
                return false;
            };
            s.prototype.isSphereMapAddition = function() {
                var t = this.fileName;
                if (t.lastIndexOf(".spa") >= 0) return true;
                return false;
            };
            s.prototype.sphereMapFileName = function() {
                var t = this.fileName;
                var e;
                if ((e = t.lastIndexOf("*")) >= 0) {
                    t = t.slice(e + 1);
                }
                if ((e = t.lastIndexOf("+")) >= 0) {
                    t = t.slice(e + 1);
                }
                return t;
            };
            s.prototype.hasToon = function() {
                return this.tuneIndex >= 10 ? false : true;
            };
            s.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "color: " + this.color + "\n";
                t += "specularity: " + this.specularity + "\n";
                t += "specularColor: " + this.specularColor + "\n";
                t += "mirrorColor: " + this.mirrorColor + "\n";
                t += "tuneIndex: " + this.tuneIndex + "\n";
                t += "edgeFlag: " + this.edgeFlag + "\n";
                t += "vertexCount: " + this.vertexCount + "\n";
                t += "fileName: " + this.fileName + "\n";
                return t;
            };
            function a(t) {
                this.id = t;
                this.name = null;
                this.parentIndex = null;
                this.tailIndex = null;
                this.type = null;
                this.ikIndex = null;
                this.position = null;
                this.motionIndex = null;
            }
            a.prototype.isKnee = function() {
                return this.name.indexOf("0x820xd00x820xb4") >= 0;
            };
            a.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                t += "parentIndex: " + this.parentIndex + "\n";
                t += "tailIndex: " + this.tailIndex + "\n";
                t += "type: " + this.type + "\n";
                t += "ikIndex: " + this.ikIndex + "\n";
                t += "position: " + this.position + "\n";
                return t;
            };
            a.prototype.toRight = function() {
                this.position[2] = -this.position[2];
            };
            function h(t) {
                this.id = t;
                this.index = null;
                this.targetBoneIndex = null;
                this.chainLength = null;
                this.iteration = null;
                this.limitation = null;
                this.childBoneIndices = null;
            }
            h.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "index: " + this.index + "\n";
                t += "targetBoneIndex: " + this.targetBoneIndex + "\n";
                t += "chainLength: " + this.chainLength + "\n";
                t += "iteration: " + this.iteration + "\n";
                t += "limitation: " + this.limitation + "\n";
                t += "childBoneIndices: " + this.childBoneIndices + "\n";
                return t;
            };
            function u(t) {
                this.id = t;
                this.name = null;
                this.vertexCount = null;
                this.type = null;
                this.vertices = null;
                this.done = false;
                this.motionIndex = null;
            }
            u.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                t += "vertexCount: " + this.vertexCount + "\n";
                t += "type: " + this.type + "\n";
                for (var e = 0; e < this.vertices.length; e++) {
                    t += this.vertices[e].dump();
                }
                return t;
            };
            u.prototype.toRight = function() {
                for (var t = 0; t < this.vertices.length; t++) {
                    this.vertices[t].toRight();
                }
            };
            function p(t, e) {
                this.id = t;
                this.type = e;
                this.index = null;
                this.position = null;
            }
            p.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "index: " + this.index + "\n";
                t += "position: " + this.position + "\n";
                return t;
            };
            p.prototype.toRight = function() {
                this.position[2] = -this.position[2];
            };
            function f(t) {
                this.id = t;
                this.index = null;
            }
            f.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "index: " + this.index + "\n";
                return t;
            };
            function l(t) {
                this.id = t;
                this.name = null;
            }
            l.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                return t;
            };
            function c(t) {
                this.id = t;
                this.index = null;
                this.frameIndex = null;
            }
            c.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "index: " + this.index + "\n";
                t += "frameIndex: " + this.frameIndex + "\n";
                return t;
            };
            function m() {
                this.compatibility = null;
                this.modelName = null;
                this.comment = null;
            }
            m.prototype.dump = function() {
                var t = "";
                t += "compatibility: " + this.compatibility + "\n";
                t += "modelName:     " + this.modelName + "\n";
                t += "comment: " + this.comment + "\n";
                return t;
            };
            function _(t) {
                this.id = t;
                this.name = null;
            }
            _.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                return t;
            };
            function v(t) {
                this.id = t;
                this.name = null;
            }
            v.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                return t;
            };
            function d(t) {
                this.id = t;
                this.name = null;
            }
            d.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                return t;
            };
            function y(t) {
                this.id = t;
                this.fileName = null;
            }
            y.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "fileName: " + this.fileName + "\n";
                return t;
            };
            function g(t) {
                this.id = t;
                this.name = null;
                this.boneIndex = null;
                this.groupIndex = null;
                this.groupTarget = null;
                this.shapeType = null;
                this.width = null;
                this.height = null;
                this.depth = null;
                this.position = null;
                this.rotation = null;
                this.weight = null;
                this.positionDim = null;
                this.rotationDim = null;
                this.recoil = null;
                this.friction = null;
                this.type = null;
            }
            g.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                t += "boneIndex: " + this.boneIndex + "\n";
                t += "groupIndex: " + this.groupIndex + "\n";
                t += "groupTarget: " + this.groupTarget + "\n";
                t += "shapeType: " + this.shapeType + "\n";
                t += "width: " + this.width + "\n";
                t += "height: " + this.height + "\n";
                t += "depth: " + this.depth + "\n";
                t += "position: " + this.position + "\n";
                t += "rotation: " + this.rotation + "\n";
                t += "weight: " + this.weight + "\n";
                t += "positionDim: " + this.positionDim + "\n";
                t += "rotationDim: " + this.rotationDim + "\n";
                t += "recoil: " + this.recoil + "\n";
                t += "friction: " + this.friction + "\n";
                t += "type: " + this.type + "\n";
                return t;
            };
            g.prototype.toRight = function() {
                this.position[2] = -this.position[2];
                this.rotation[0] = -this.rotation[0];
                this.rotation[1] = -this.rotation[1];
            };
            function T(t) {
                this.id = t;
                this.name = null;
                this.rigidBody1 = null;
                this.rigidBody2 = null;
                this.position = null;
                this.rotation = null;
                this.translationLimitation1 = null;
                this.translationLimitation2 = null;
                this.rotationLimitation1 = null;
                this.rotationLimitation2 = null;
                this.springPosition = null;
                this.springRotation = null;
            }
            T.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                t += "rigidBody1: " + this.rigidBody1 + "\n";
                t += "rigidBody2: " + this.rigidBody2 + "\n";
                t += "position: " + this.position + "\n";
                t += "rotation: " + this.rotation + "\n";
                t += "translationLimitation1: " + this.translationLimitation1 + "\n";
                t += "translationLimitation2: " + this.translationLimitation2 + "\n";
                t += "rotationLimitation1: " + this.rotationLimitation1 + "\n";
                t += "rotationLimitation2: " + this.rotationLimitation2 + "\n";
                t += "springPosition: " + this.springPosition + "\n";
                t += "springRotation: " + this.springRotation + "\n";
                return t;
            };
            T.prototype.toRight = function() {
                this.position[2] = -this.position[2];
                this.rotation[0] = -this.rotation[0];
                this.rotation[1] = -this.rotation[1];
            };
            function A(t, e) {
                this.pmd = t;
                this.baseURL = e;
                this.errorImageNum = 0;
                this.loadedImageNum = 0;
                this.noImageNum = 0;
            }
            A.prototype.load = function(t) {
                this.pmd.images.length = 0;
                this.pmd.toonImages.length = 0;
                this.pmd.sphereImages.length = 0;
                this.errorImageNum = 0;
                this.loadedImageNum = 0;
                this.noImageNum = 0;
                for (var e = 0; e < this.pmd.materialCount; e++) {
                    var i = this.pmd.materials[e].convertedFileName();
                    if (i == "" || i.indexOf(".spa") >= 0 || i.indexOf(".sph") >= 0) {
                        this.pmd.images[e] = this._generatePixelImage();
                        this.noImageNum++;
                        this._checkDone(t);
                        continue;
                    }
                    var r = this;
                    this.pmd.images[e] = new Image();
                    this.pmd.images[e].onerror = function(e) {
                        r.errorImageNum++;
                        r._checkDone(t);
                    };
                    this.pmd.images[e].onload = function(e) {
                        r.loadedImageNum++;
                        r._checkDone(t);
                    };
                    this.pmd.images[e].src = this.baseURL + "/" + i;
                }
                for (var e = 0; e < this.pmd.toonTextureCount; e++) {
                    var i = this.pmd.toonTextures[e].fileName;
                    if (i == "" || i.indexOf(".spa") >= 0 || i.indexOf(".sph") >= 0) {
                        this.pmd.toonImages[e] = this._generatePixelImage();
                        this.noImageNum++;
                        this._checkDone(t);
                        continue;
                    }
                    var r = this;
                    this.pmd.toonImages[e] = new Image();
                    this.pmd.toonImages[e].onerror = function(e) {
                        r.errorImageNum++;
                        r._checkDone(t);
                    };
                    this.pmd.toonImages[e].onload = function(e) {
                        r.loadedImageNum++;
                        r._checkDone(t);
                    };
                    this.pmd.toonImages[e].src = this.baseURL + "/" + i;
                }
                for (var e = 0; e < this.pmd.materialCount; e++) {
                    if (!this.pmd.materials[e].hasSphereTexture()) {
                        this.pmd.sphereImages[e] = this._generatePixelImage();
                        this.noImageNum++;
                        this._checkDone(t);
                        continue;
                    }
                    var i = this.pmd.materials[e].sphereMapFileName();
                    var r = this;
                    this.pmd.sphereImages[e] = new Image();
                    this.pmd.sphereImages[e].onerror = function(e) {
                        r.errorImageNum++;
                        r._checkDone(t);
                    };
                    this.pmd.sphereImages[e].onload = function(e) {
                        r.loadedImageNum++;
                        r._checkDone(t);
                    };
                    this.pmd.sphereImages[e].src = this.baseURL + "/" + i;
                }
            };
            A.prototype._generatePixelImage = function() {
                var t = document.createElement("canvas");
                t.width = 1;
                t.height = 1;
                var e = t.getContext("2d");
                e.fillStyle = "rgb(255, 255, 255)";
                e.fillRect(0, 0, 1, 1);
                return t;
            };
            A.prototype._checkDone = function(t) {
                if (this.loadedImageNum + this.noImageNum + this.errorImageNum >= this.pmd.materialCount * 2 + this.pmd.toonTextureCount) {
                    t(this.pmd);
                }
            };
            t.exports = {
                PMD: i,
                PMDHeader: r,
                PMDVertex: o,
                PMDVertexIndex: n,
                PMDMaterial: s,
                PMDBone: a,
                PMDIK: h,
                PMDFace: u,
                PMDFaceVertex: p,
                PMDFaceDisplay: f,
                PMDBoneFrameName: l,
                PMDBoneDisplay: c,
                PMDEnglishHeader: m,
                PMDEnglishBoneName: _,
                PMDEnglishFaceName: v,
                PMDEnglishBoneFrameName: d,
                PMDToonTexture: y,
                PMDRigidBody: g,
                PMDJoint: T
            };
        },
        23: function(t, e, i) {
            "use strict";
            var r = i(5);
            function o() {
                this.header = null;
                this.motionCount = null;
                this.faceCount = null;
                this.cameraCount = null;
                this.lightCount = null;
                this.motions = [];
                this.faces = [];
                this.cameras = [];
                this.lights = [];
                this.frame = 0;
                this.orderedMotions = [];
                this.orderedFaces = [];
                this.orderedCameras = [];
                this.orderedLights = [];
                this.cameraIndex = -1;
                this.lightIndex = -1;
                this.stepMotions = [];
                this.stepFaces = [];
                this.stepCamera = {
                    location: [ 0, 0, 0 ],
                    rotation: [ 0, 0, 0 ],
                    length: 0,
                    angle: 0,
                    available: true
                };
                this.stepLight = {
                    color: [ 0, 0, 0 ],
                    location: [ 0, 0, 0 ],
                    available: true
                };
            }
            o.prototype.Object = Object;
            o.prototype.Math = Math;
            o.prototype.vec3 = r.vec3;
            o.prototype.quat4 = r.quat4;
            o.prototype.valid = function() {
                return this.header.valid();
            };
            o.prototype.supply = function() {
                for (var t = 0; t < this.motionCount; t++) {
                    this.motions[t].supply();
                }
                for (var t = 0; t < this.faceCount; t++) {
                    this.faces[t].supply();
                }
                for (var t = 0; t < this.cameraCount; t++) {
                    this.cameras[t].supply();
                }
                for (var t = 0; t < this.lightCount; t++) {
                    this.lights[t].supply();
                }
            };
            o.prototype.clone = function() {
                var t = new o();
                t.motionCount = this.motionCount;
                t.faceCount = this.faceCount;
                t.cameraCount = this.cameraCount;
                t.lightCount = this.lightCount;
                for (var e = 0; e < this.motionCount; e++) {
                    t.motions[e] = this.motions[e];
                }
                for (var e = 0; e < this.faceCount; e++) {
                    t.faces[e] = this.faces[e];
                }
                for (var e = 0; e < this.cameraCount; e++) {
                    t.cameras[e] = this.cameras[e];
                }
                for (var e = 0; e < this.lightCount; e++) {
                    t.lights[e] = this.lights[e];
                }
                return t;
            };
            o.prototype.setup = function(t) {
                this.frame = 0;
                this.cameraIndex = -1;
                this.lightIndex = -1;
                if (t) {
                    this._setupMotions(t);
                    this._setupFaces(t);
                }
                this._setupCameras();
                this._setupLights();
                this.step(1);
            };
            o.prototype._setupMotions = function(t) {
                var e = {};
                for (var i = 0; i < this.motionCount; i++) {
                    var r = this.motions[i];
                    if (t.bonesHash[r.boneName] === undefined) continue;
                    if (e[r.boneName] === undefined) {
                        e[r.boneName] = {};
                        e[r.boneName].motions = [];
                        e[r.boneName].index = -1;
                    }
                    e[r.boneName].motions.push(r);
                }
                for (var o in e) {
                    e[o].motions.sort(function(t, e) {
                        return t.frameNum - e.frameNum;
                    });
                }
                this.orderedMotions.length = 0;
                var n = this.Object.keys(e);
                for (var i = 0; i < n.length; i++) {
                    this.orderedMotions[i] = e[n[i]];
                }
                this.stepMotions.length = 0;
                for (var i = 0; i < t.boneCount; i++) {
                    var s = {};
                    s.location = [ 0, 0, 0 ];
                    s.rotation = [ 0, 0, 0, 1 ];
                    this._clearVec3(s.location);
                    this._clearQuat4(s.rotation);
                    this.stepMotions[i] = s;
                }
                var a = t.getBoneNames();
                var h = 0;
                for (var i = 0; i < t.bones.length; i++) {
                    var u = t.bones[i];
                    u.motionIndex = n.indexOf(u.name);
                    if (u.motionIndex == -1) {
                        u.motionIndex = n.length + h;
                        h++;
                    }
                }
            };
            o.prototype._setupFaces = function(t) {
                var e = {};
                for (var i = 0; i < this.faceCount; i++) {
                    var r = this.faces[i];
                    if (t.facesHash[r.name] === undefined) continue;
                    if (e[r.name] === undefined) {
                        e[r.name] = {};
                        e[r.name].faces = [];
                        e[r.name].index = -1;
                    }
                    e[r.name].faces.push(r);
                }
                for (var o in e) {
                    e[o].faces.sort(function(t, e) {
                        return t.frameNum - e.frameNum;
                    });
                }
                this.orderedFaces.length = 0;
                var n = this.Object.keys(e);
                for (var i = 0; i < n.length; i++) {
                    this.orderedFaces[i] = e[n[i]];
                }
                this.stepFaces.length = 0;
                for (var i = 0; i < t.faceCount; i++) {
                    var s = {};
                    s.weight = 0;
                    s.available = true;
                    this.stepFaces[i] = s;
                }
                var a = t.getFaceNames();
                var h = 0;
                for (var i = 0; i < t.faces.length; i++) {
                    var u = t.faces[i];
                    u.motionIndex = n.indexOf(u.name);
                    if (u.motionIndex == -1) {
                        u.motionIndex = n.length + h;
                        this.stepFaces[u.motionIndex].available = false;
                        h++;
                    }
                }
            };
            o.prototype._setupCameras = function() {
                this.orderedCameras.length = 0;
                for (var t = 0; t < this.cameraCount; t++) {
                    this.orderedCameras[t] = this.cameras[t];
                }
                this.orderedCameras.sort(function(t, e) {
                    return t.frameNum - e.frameNum;
                });
            };
            o.prototype._setupLights = function() {
                this.orderedLights.length = 0;
                for (var t = 0; t < this.lightCount; t++) {
                    this.orderedLights[t] = {};
                    this.orderedLights[t].light = this.lights[t];
                }
                this.orderedLights.sort(function(t, e) {
                    return t.light.frameNum - e.light.frameNum;
                });
            };
            o.prototype.step = function(t) {
                this._stepMotion();
                this._stepFace();
                this._stepCamera();
                this._stepLight();
                this.frame += t;
            };
            o.prototype._stepMotion = function() {
                for (var t = 0; t < this.orderedMotions.length; t++) {
                    var e = this.orderedMotions[t];
                    while (e.index + 1 < e.motions.length && e.motions[e.index + 1].frameNum <= this.frame) {
                        e.index++;
                    }
                }
            };
            o.prototype._stepFace = function() {
                for (var t = 0; t < this.orderedFaces.length; t++) {
                    var e = this.orderedFaces[t];
                    while (e.index + 1 < e.faces.length && e.faces[e.index + 1].frameNum <= this.frame) {
                        e.index++;
                    }
                }
            };
            o.prototype._stepCamera = function() {
                while (this.cameraIndex + 1 < this.cameras.length && this.orderedCameras[this.cameraIndex + 1].frameNum <= this.frame) {
                    this.cameraIndex++;
                }
            };
            o.prototype._stepLight = function() {
                while (this.lightIndex + 1 < this.lights.length && this.orderedLights[this.lightIndex + 1].light.frameNum <= this.frame) {
                    this.lightIndex++;
                }
            };
            o.prototype.merge = function(t) {
                this.motionCount += t.motionCount;
                this.faceCount += t.faceCount;
                this.cameraCount += t.cameraCount;
                this.lightCount += t.lightCount;
                for (var e = 0; e < t.motionCount; e++) {
                    this.motions.push(t.motions[e]);
                }
                for (var e = 0; e < t.faceCount; e++) {
                    this.faces.push(t.faces[e]);
                }
                for (var e = 0; e < t.cameraCount; e++) {
                    this.cameras.push(t.cameras[e]);
                }
                for (var e = 0; e < t.lightCount; e++) {
                    this.lights.push(t.lights[e]);
                }
            };
            o.prototype.addOffset = function(t) {
                for (var e = 0; e < this.motionCount; e++) {
                    this.motions[e].frameNum += t;
                }
                for (var e = 0; e < this.faceCount; e++) {
                    this.faces[e].frameNum += t;
                }
                for (var e = 0; e < this.cameraCount; e++) {
                    this.cameras[e].frameNum += t;
                }
                for (var e = 0; e < this.lightCount; e++) {
                    this.lights[e].frameNum += t;
                }
            };
            o.prototype.loadMotion = function() {
                for (var t = 0; t < this.orderedMotions.length; t++) {
                    var e = this.orderedMotions[t];
                    if (e.index == -1) continue;
                    var i = e.motions[e.index];
                    var r = e.motions[e.index + 1];
                    var o = this.stepMotions[t];
                    if (i.frameNum == this.frame || r === undefined || r.frameNum - i.frameNum <= 2) {
                        this._setVec3(i.location, o.location);
                        this._setQuat4(i.rotation, o.rotation);
                    } else {
                        var n = r.frameNum - i.frameNum;
                        var s = this.frame - i.frameNum;
                        var a = s / n;
                        this._slerpQuat4(i.rotation, r.rotation, a, o.rotation);
                        this._lerpVec3(i.location, r.location, a, o.location);
                    }
                }
                for (var t = this.orderedMotions.length; t < this.stepMotions.length; t++) {
                    var h = this.stepMotions[t];
                    this._clearVec3(h.location);
                    this._clearQuat4(h.rotation);
                }
            };
            o.prototype.loadFace = function() {
                for (var t = 0; t < this.orderedFaces.length; t++) {
                    var e = this.orderedFaces[t];
                    if (e.index == -1) continue;
                    var i = e.faces[e.index];
                    var r = e.faces[e.index + 1];
                    var o = this.stepFaces[t];
                    if (i.frameNum == this.frameNum || r === undefined || r.frameNum - i.frameNum <= 2) {
                        o.weight = i.weight;
                    } else {
                        var n = r.frameNum - i.frameNum;
                        var s = this.frame - i.frameNum;
                        var a = s / n;
                        o.weight = this._lerp(i.weight, r.weight, a);
                    }
                }
            };
            o.prototype.loadCamera = function() {
                var t = this.orderedCameras;
                var e = this.cameraIndex;
                this.stepCamera.available = false;
                if (e == -1) return;
                this.stepCamera.available = true;
                var i = t[e];
                var r = t[e + 1];
                if (i.frameNum == this.frame || r === undefined || r.frameNum - i.frameNum <= 2) {
                    this._setVec3(i.location, this.stepCamera.location);
                    this._setVec3(i.rotation, this.stepCamera.rotation);
                    this.stepCamera.length = i.length;
                    this.stepCamera.angle = i.angle;
                } else {
                    var o = r.frameNum - i.frameNum;
                    var n = this.frame - i.frameNum;
                    var s = n / o;
                    this._lerpVec3(i.location, r.location, s, this.stepCamera.location);
                    this._lerpVec3(i.rotation, r.rotation, s, this.stepCamera.rotation);
                    this.stepCamera.length = this._lerp(i.length, r.length, s);
                    this.stepCamera.angle = this._lerp(i.angle, r.angle, s);
                }
            };
            o.prototype.loadLight = function() {
                var t = this.orderedLights;
                var e = this.lightIndex;
                this.stepLight.available = false;
                if (e == -1) return;
                var i = t[e].light;
                this.stepLight.available = true;
                this._setVec3(i.color, this.stepLight.color);
                this._setVec3(i.location, this.stepLight.location);
            };
            o.prototype._setVec3 = function(t, e) {
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
            };
            o.prototype._setQuat4 = function(t, e) {
                e[0] = t[0];
                e[1] = t[1];
                e[2] = t[2];
                e[3] = t[3];
            };
            o.prototype._clearVec3 = function(t) {
                t[0] = 0;
                t[1] = 0;
                t[2] = 0;
            };
            o.prototype._clearQuat4 = function(t) {
                t[0] = 0;
                t[1] = 0;
                t[2] = 0;
                t[3] = 1;
            };
            o.prototype._lerp = function(t, e, i) {
                return t * (1 - i) + e * i;
            };
            o.prototype._lerpVec3 = function(t, e, i, r) {
                r[0] = this._lerp(t[0], e[0], i);
                r[1] = this._lerp(t[1], e[1], i);
                r[2] = this._lerp(t[2], e[2], i);
            };
            o.prototype._slerpQuat4 = function(t, e, i, r) {
                var o = t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3];
                if (o < 0) {
                    r[0] = -e[0];
                    r[1] = -e[1];
                    r[2] = -e[2];
                    r[3] = -e[3];
                    o = -o;
                } else {
                    r[0] = e[0];
                    r[1] = e[1];
                    r[2] = e[2];
                    r[3] = e[3];
                }
                if (this.Math.abs(o) >= 1) {
                    r[0] = t[0];
                    r[1] = t[1];
                    r[2] = t[2];
                    r[3] = t[3];
                    return r;
                }
                var n = this.Math.acos(o);
                var s = this.Math.sqrt(1 - o * o);
                if (this.Math.abs(s) < .001) {
                    r[0] = .5 * (t[0] + e[0]);
                    r[1] = .5 * (t[1] + e[1]);
                    r[2] = .5 * (t[2] + e[2]);
                    r[3] = .5 * (t[3] + e[3]);
                    return r;
                }
                var a = this.Math.sin((1 - i) * n) / s;
                var h = this.Math.sin(i * n) / s;
                r[0] = t[0] * a + r[0] * h;
                r[1] = t[1] * a + r[1] * h;
                r[2] = t[2] * a + r[2] * h;
                r[3] = t[3] * a + r[3] * h;
                return r;
            };
            r.vec3.rotateX = function(t, e, i) {
                var o = r.mat4.rotateX(r.mat4.identity(r.mat4.create()), e);
                return r.mat4.multiplyVec3(o, t, i);
            };
            r.vec3.rotateY = function(t, e, i) {
                var o = r.mat4.rotateY(r.mat4.identity(r.mat4.create()), e);
                return r.mat4.multiplyVec3(o, t, i);
            };
            r.vec3.rotateZ = function(t, e, i) {
                var o = r.mat4.rotateZ(r.mat4.identity(r.mat4.create()), e);
                return r.mat4.multiplyVec3(o, t, i);
            };
            o.prototype.getBoneMotion = function(t) {
                return this.stepMotions[t.motionIndex];
            };
            o.prototype.getFace = function(t) {
                return this.stepFaces[t.motionIndex];
            };
            o.prototype.getCamera = function() {
                return this.stepCamera;
            };
            o.prototype.getLight = function() {
                return this.stepLight;
            };
            o.prototype.getCalculatedCameraParams = function(t, e, i) {
                var r = 0;
                var o = this.getCamera();
                e[0] = o.location[0];
                e[1] = o.location[1] + r;
                e[2] = o.location[2];
                t[0] = 0;
                t[1] = 0 + r;
                t[2] = o.length;
                i[0] = 0;
                i[1] = 1;
                i[2] = 0;
                this.vec3.rotateX(t, o.rotation[0], t);
                this.vec3.rotateY(t, o.rotation[1], t);
                this.vec3.rotateZ(t, o.rotation[2], t);
                this.vec3.add(t, o.location, t);
                this.vec3.rotateX(i, o.rotation[0], i);
                this.vec3.rotateY(i, o.rotation[1], i);
                this.vec3.rotateZ(i, o.rotation[2], i);
            };
            o.prototype.dump = function() {
                var t = "";
                t += "motionCount: " + this.motionCount + "\n";
                t += "faceCount: " + this.faceCount + "\n";
                t += "cameraCount: " + this.cameraCount + "\n";
                t += "lightCount: " + this.lightCount + "\n";
                t += this._dumpMotions();
                t += this._dumpFaces();
                t += this._dumpCameras();
                t += this._dumpLights();
                return t;
            };
            o.prototype._dumpMotions = function() {
                var t = "";
                t += "-- Motions --\n";
                for (var e = 0; e < this.motionCount; e++) {
                    t += this.motions[e].dump();
                }
                t += "\n";
                return t;
            };
            o.prototype._dumpFaces = function() {
                var t = "";
                t += "-- Faces --\n";
                for (var e = 0; e < this.faceCount; e++) {
                    t += this.faces[e].dump();
                }
                t += "\n";
                return t;
            };
            o.prototype._dumpCameras = function() {
                var t = "";
                t += "-- Cameras --\n";
                for (var e = 0; e < this.cameraCount; e++) {
                    t += this.cameras[e].dump();
                }
                t += "\n";
                return t;
            };
            o.prototype._dumpLights = function() {
                var t = "";
                t += "-- Lights --\n";
                for (var e = 0; e < this.lightCount; e++) {
                    t += this.lights[e].dump();
                }
                t += "\n";
                return t;
            };
            function n() {
                this.magic = null;
                this.modelName = null;
            }
            n.prototype.valid = function() {
                return this.magic == "Vocaloid Motion Data 0002";
            };
            n.prototype.dump = function() {
                var t = "";
                t += "magic: " + this.magic + "\n";
                t += "modelName: " + this.modelName + "\n";
                return t;
            };
            function s(t) {
                this.id = t;
                this.boneName = null;
                this.frameNum = null;
                this.location = null;
                this.rotation = null;
                this.interpolation = null;
            }
            s.prototype.supply = function() {
                this.frameNum *= 2;
            };
            s.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "boneName: " + this.boneName + "\n";
                t += "frameNum: " + this.frameNum + "\n";
                t += "location: " + this.location + "\n";
                t += "rotation: " + this.rotation + "\n";
                t += "interpolation: " + this.interpolation + "\n";
                return t;
            };
            function a(t) {
                this.id = t;
                this.name = null;
                this.frameNum = null;
                this.weight = null;
            }
            a.prototype.supply = function() {
                this.frameNum *= 2;
            };
            a.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "name: " + this.name + "\n";
                t += "frameNum: " + this.frameNum + "\n";
                t += "weight: " + this.weight + "\n";
                return t;
            };
            function h(t) {
                this.id = t;
                this.frameNum = null;
                this.length = null;
                this.location = null;
                this.rotation = null;
                this.interpolation = null;
                this.angle = null;
                this.perspective = null;
            }
            h.prototype.supply = function() {
                this.frameNum *= 2;
            };
            h.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "frameNum: " + this.frameNum + "\n";
                t += "length: " + this.length + "\n";
                t += "location: " + this.location + "\n";
                t += "rotation: " + this.rotation + "\n";
                t += "interpolation: " + this.interpolation + "\n";
                t += "angle: " + this.angle + "\n";
                t += "perspective: " + this.perspective + "\n";
                return t;
            };
            function u(t) {
                this.id = t;
                this.frameNum = null;
                this.color = null;
                this.location = null;
            }
            u.prototype.supply = function() {
                this.frameNum *= 2;
            };
            u.prototype.dump = function() {
                var t = "";
                t += "id: " + this.id + "\n";
                t += "frameNum: " + this.frameNum + "\n";
                t += "color: " + this.color + "\n";
                t += "location: " + this.location + "\n";
                return t;
            };
            t.exports = {
                VMD: o,
                VMDLight: u,
                VMDHeader: n,
                VMDMotion: s,
                VMDFace: a,
                VMDCamera: h
            };
        },
        24: function(t, e, i) {
            "use strict";
            var r = i(61);
            var o = n(r);
            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function s(t) {
                this.uint8 = new Uint8Array(t);
                this.offset = 0;
            }
            s.prototype.Math = Math;
            s.prototype.parse = function() {
                return {};
            };
            s.prototype._parseObject = function(t, e) {
                var i = this.offset;
                for (var r in e) {
                    t[r] = this._getValue(e[r], this.offset);
                    this.offset += this._sizeof(e[r]);
                }
            };
            s.prototype._getValue = function(t, e) {
                return t.isArray === undefined ? this._getValueScalar(t, e) : this._getValueArray(t, e);
            };
            s.prototype._getValueScalar = function(t, e) {
                switch (t.type) {
                  case "char":
                    return this._getChars(e, 1);

                  case "strings":
                    return this._getStrings(e, 1);

                  case "uint8":
                    return this._getUint8(e);

                  case "uint16":
                    return this._getUint16(e);

                  case "uint32":
                    return this._getUint32(e);

                  case "float":
                    return this._getFloat(e);

                  default:
                    throw "error: undefined type" + t;
                }
            };
            s.prototype._getValueArray = function(t, e) {
                if (t.type == "char") {
                    return this._getChars(e, t.size);
                }
                if (t.type == "strings") {
                    return this._getStrings(e, t.size);
                }
                var i = [];
                var r = this._sizeofScalar(t);
                for (var o = 0; o < t.size; o++) {
                    i[o] = this._getValueScalar(t, e);
                    e += r;
                }
                return i;
            };
            s.prototype._sizeof = function(t) {
                return t.isArray === undefined ? this._sizeofScalar(t) : this._sizeofArray(t);
            };
            s.prototype._sizeofScalar = function(t) {
                switch (t.type) {
                  case "char":
                    return 1;

                  case "strings":
                    return 1;

                  case "uint8":
                    return 1;

                  case "uint16":
                    return 2;

                  case "uint32":
                    return 4;

                  case "float":
                    return 4;

                  default:
                    throw "error: undefined type " + t + " " + t.type;
                }
            };
            s.prototype._sizeofArray = function(t) {
                return this._sizeofScalar(t) * t.size;
            };
            s.prototype._sizeofObject = function(t) {
                var e = 0;
                for (var i in t) {
                    e += this._sizeof(t[i]);
                }
                return e;
            };
            s.prototype._getUint8 = function(t) {
                return this.uint8[t];
            };
            s.prototype._getUint16 = function(t) {
                return this._getValueWithReverseByteOrder(t, 2);
            };
            s.prototype._getUint32 = function(t) {
                return this._getValueWithReverseByteOrder(t, 4);
            };
            s.prototype._getFloat = function(t) {
                return this._toBinary32(this._getValueWithReverseByteOrder(t, 4));
            };
            s.prototype._getValueWithReverseByteOrder = function(t, e) {
                var i = 0;
                for (var r = 0; r < e; r++) {
                    i = i << 8 | this.uint8[t + e - r - 1];
                }
                return i;
            };
            s.prototype._toBinary32 = function(t) {
                var e = t >> 31 & 1;
                var i = t >> 23 & 255;
                var r = t & 8388607;
                if (i == 0 && r == 0) return 0;
                if (i == 255 && r == 0) return Infinity;
                if (i == 255 && r != 0) return NaN;
                var o = 1;
                if (i == 0 && r != 0) {
                    i = 1;
                    o = 0;
                }
                for (var n = 0; n < 23; n++) {
                    if (r >> 22 - n & 1) {
                        o += this.Math.pow(2, -(n + 1));
                    }
                }
                o = o * this.Math.pow(2, i - 127);
                if (e) o = -o;
                return o;
            };
            s.prototype._getChars = function(t, e) {
                var i = "";
                for (var r = 0; r < e; r++) {
                    var o = t + r;
                    if (this.uint8[o] == 0) break;
                    i += String.fromCharCode(this.uint8[o]);
                }
                return i;
            };
            s.prototype._getStrings = function(t, e) {
                var i = "";
                for (var r = 0; r < e; r++) {
                    var n = t + r;
                    if (this.uint8[n] == 0) break;
                    i += (0, o.default)(16, this.uint8[n], 2);
                }
                return i;
            };
            s.prototype.dump = function() {
                var t = this.uint8;
                var e = 0;
                var i = t.length;
                while (i > 0) {
                    e++;
                    i = i / 16 | 0;
                }
                var r = "";
                var n = "";
                for (var s = 0; s < t.length; s++) {
                    if (s % 16 == 0) {
                        r += (0, o.default)(16, s, e);
                        r += " ";
                    }
                    r += (0, o.default)(16, t[s], 2);
                    r += " ";
                    if (t[s] >= 32 && t[s] <= 126) n += String.fromCharCode(t[s]); else n += ".";
                    if (s % 16 == 15) {
                        r += "  ";
                        r += n;
                        r += "\n";
                        n = "";
                    }
                }
                return r;
            };
            t.exports = s;
        },
        56: function(t, e, i) {
            "use strict";
            var r = i(8);
            var o = h(r);
            var n = i(24);
            var s = h(n);
            var a = i(22);
            function h(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function u(t) {
                this.parent = s.default;
                this.parent.call(this, t);
                this.englishCompatibility = false;
            }
            (0, o.default)(u, s.default);
            u.prototype._HEADER_STRUCTURE = {
                magic: {
                    type: "char",
                    isArray: true,
                    size: 3
                },
                version: {
                    type: "float"
                },
                modelName: {
                    type: "char",
                    isArray: true,
                    size: 20
                },
                comment: {
                    type: "char",
                    isArray: true,
                    size: 256
                }
            };
            u.prototype._VERTICES_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                vertices: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._VERTEX_STRUCTURE = {
                position: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                normal: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                uv: {
                    type: "float",
                    isArray: true,
                    size: 2
                },
                boneIndices: {
                    type: "uint16",
                    isArray: true,
                    size: 2
                },
                boneWeight: {
                    type: "uint8"
                },
                edgeFlag: {
                    type: "uint8"
                }
            };
            u.prototype._VERTEX_INDICES_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                indices: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._VERTEX_INDEX_STRUCTURE = {
                index: {
                    type: "uint16"
                }
            };
            u.prototype._MATERIALS_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                materials: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._MATERIAL_STRUCTURE = {
                color: {
                    type: "float",
                    isArray: true,
                    size: 4
                },
                specularity: {
                    type: "float"
                },
                specularColor: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                mirrorColor: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                tuneIndex: {
                    type: "uint8"
                },
                edgeFlag: {
                    type: "uint8"
                },
                vertexCount: {
                    type: "uint32"
                },
                fileName: {
                    type: "char",
                    isArray: true,
                    size: 20
                }
            };
            u.prototype._BONES_STRUCTURE = {
                count: {
                    type: "uint16"
                },
                bones: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._BONE_STRUCTURE = {
                name: {
                    type: "strings",
                    isArray: true,
                    size: 20
                },
                parentIndex: {
                    type: "uint16"
                },
                tailIndex: {
                    type: "uint16"
                },
                type: {
                    type: "uint8"
                },
                ikIndex: {
                    type: "uint16"
                },
                position: {
                    type: "float",
                    isArray: true,
                    size: 3
                }
            };
            u.prototype._IKS_STRUCTURE = {
                count: {
                    type: "uint16"
                },
                iks: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._IK_STRUCTURE = {
                index: {
                    type: "uint16"
                },
                targetBoneIndex: {
                    type: "uint16"
                },
                chainLength: {
                    type: "uint8"
                },
                iteration: {
                    type: "uint16"
                },
                limitation: {
                    type: "float"
                },
                childBoneIndices: {
                    type: "uint16",
                    isArray: true,
                    size: "chainLength"
                }
            };
            u.prototype._FACES_STRUCTURE = {
                count: {
                    type: "uint16"
                },
                faces: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._FACE_STRUCTURE = {
                name: {
                    type: "strings",
                    isArray: true,
                    size: 20
                },
                vertexCount: {
                    type: "uint32"
                },
                type: {
                    type: "uint8"
                },
                vertices: {
                    type: "object",
                    isArray: true,
                    size: "vertexCount"
                }
            };
            u.prototype._FACE_VERTEX_STRUCTURE = {
                index: {
                    type: "uint32"
                },
                position: {
                    type: "float",
                    isArray: true,
                    size: 3
                }
            };
            u.prototype._FACE_DISPLAYS_STRUCTURE = {
                count: {
                    type: "uint8"
                },
                indices: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._FACE_DISPLAY_STRUCTURE = {
                index: {
                    type: "uint16"
                }
            };
            u.prototype._BONE_FRAME_NAMES_STRUCTURE = {
                count: {
                    type: "uint8"
                },
                names: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._BONE_FRAME_NAME_STRUCTURE = {
                name: {
                    type: "strings",
                    isArray: true,
                    size: 50
                }
            };
            u.prototype._BONE_DISPLAYS_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                displays: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._BONE_DISPLAY_STRUCTURE = {
                index: {
                    type: "uint16"
                },
                frameIndex: {
                    type: "uint8"
                }
            };
            u.prototype._ENGLISH_HEADER_STRUCTURE = {
                compatibility: {
                    type: "uint8"
                },
                modelName: {
                    type: "char",
                    isArray: true,
                    size: 20
                },
                comment: {
                    type: "char",
                    isArray: true,
                    size: 256
                }
            };
            u.prototype._ENGLISH_BONE_NAME_STRUCTURE = {
                name: {
                    type: "char",
                    isArray: true,
                    size: 20
                }
            };
            u.prototype._ENGLISH_FACE_NAME_STRUCTURE = {
                name: {
                    type: "char",
                    isArray: true,
                    size: 20
                }
            };
            u.prototype._ENGLISH_BONE_FRAME_NAME_STRUCTURE = {
                name: {
                    type: "char",
                    isArray: true,
                    size: 50
                }
            };
            u.prototype._TOON_TEXTURE_STRUCTURE = {
                fileName: {
                    type: "char",
                    isArray: true,
                    size: 100
                }
            };
            u.prototype._RIGID_BODIES_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                bodies: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._RIGID_BODY_STRUCTURE = {
                name: {
                    type: "strings",
                    isArray: true,
                    size: 20
                },
                boneIndex: {
                    type: "uint16"
                },
                groupIndex: {
                    type: "uint8"
                },
                groupTarget: {
                    type: "uint16"
                },
                shapeType: {
                    type: "uint8"
                },
                width: {
                    type: "float"
                },
                height: {
                    type: "float"
                },
                depth: {
                    type: "float"
                },
                position: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                rotation: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                weight: {
                    type: "float"
                },
                positionDim: {
                    type: "float"
                },
                rotationDim: {
                    type: "float"
                },
                recoil: {
                    type: "float"
                },
                friction: {
                    type: "float"
                },
                type: {
                    type: "uint8"
                }
            };
            u.prototype._JOINTS_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                joints: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._JOINT_STRUCTURE = {
                name: {
                    type: "strings",
                    isArray: true,
                    size: 20
                },
                rigidBody1: {
                    type: "uint32"
                },
                rigidBody2: {
                    type: "uint32"
                },
                position: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                rotation: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                translationLimitation1: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                translationLimitation2: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                rotationLimitation1: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                rotationLimitation2: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                springPosition: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                springRotation: {
                    type: "float",
                    isArray: true,
                    size: 3
                }
            };
            u.prototype.parse = function() {
                this.offset = 0;
                var t = new a.PMD();
                this._parseHeader(t);
                this._parseVertices(t);
                this._parseVertexIndices(t);
                this._parseMaterials(t);
                this._parseBones(t);
                this._parseIKs(t);
                this._parseFaces(t);
                this._parseFaceDisplays(t);
                this._parseBoneFrameNames(t);
                this._parseBoneDisplays(t);
                this._parseEnglishHeader(t);
                if (this.englishCompatibility) {
                    this._parseEnglishBoneNames(t);
                    this._parseEnglishFaceNames(t);
                    this._parseEnglishBoneFrameNames(t);
                }
                this._parseToonTextures(t);
                this._parseRigidBodies(t);
                this._parseJoints(t);
                return t;
            };
            u.prototype.valid = function() {
                var t = this.offset;
                this.offset = 0;
                var e = new a.PMD();
                this._parseHeader(e);
                this.offset = t;
                return e.valid();
            };
            u.prototype._parseHeader = function(t) {
                var e = this._HEADER_STRUCTURE;
                t.header = new a.PMDHeader();
                this._parseObject(t.header, e);
            };
            u.prototype._parseVertices = function(t) {
                var e = this._VERTICES_STRUCTURE;
                t.vertexCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.vertices.length = 0;
                for (var i = 0; i < t.vertexCount; i++) {
                    this._parseVertex(t, i);
                }
            };
            u.prototype._parseVertex = function(t, e) {
                var i = this._VERTEX_STRUCTURE;
                var r = new a.PMDVertex(e);
                this._parseObject(r, i);
                t.vertices[e] = r;
            };
            u.prototype._parseVertexIndices = function(t) {
                var e = this._VERTEX_INDICES_STRUCTURE;
                t.vertexIndexCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.vertexIndices.length = 0;
                for (var i = 0; i < t.vertexIndexCount; i++) {
                    this._parseVertexIndex(t, i);
                }
            };
            u.prototype._parseVertexIndex = function(t, e) {
                var i = this._VERTEX_INDEX_STRUCTURE;
                var r = new a.PMDVertexIndex(e);
                this._parseObject(r, i);
                t.vertexIndices[e] = r;
            };
            u.prototype._parseMaterials = function(t) {
                var e = this._MATERIALS_STRUCTURE;
                t.materialCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.materials.length = 0;
                for (var i = 0; i < t.materialCount; i++) {
                    this._parseMaterial(t, i);
                }
            };
            u.prototype._parseMaterial = function(t, e) {
                var i = this._MATERIAL_STRUCTURE;
                var r = new a.PMDMaterial(e);
                this._parseObject(r, i);
                t.materials[e] = r;
            };
            u.prototype._parseBones = function(t) {
                var e = this._BONES_STRUCTURE;
                t.boneCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.bones.length = 0;
                for (var i = 0; i < t.boneCount; i++) {
                    this._parseBone(t, i);
                }
            };
            u.prototype._parseBone = function(t, e) {
                var i = this._BONE_STRUCTURE;
                var r = new a.PMDBone(e);
                this._parseObject(r, i);
                t.bones[e] = r;
            };
            u.prototype._parseIKs = function(t) {
                var e = this._IKS_STRUCTURE;
                t.ikCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.iks.length = 0;
                for (var i = 0; i < t.ikCount; i++) {
                    this._parseIK(t, i);
                }
            };
            u.prototype._parseIK = function(t, e) {
                var i = this._IK_STRUCTURE;
                var r = new a.PMDIK(e);
                for (var o in i) {
                    if (o == "childBoneIndices") continue;
                    r[o] = this._getValue(i[o], this.offset);
                    this.offset += this._sizeof(i[o]);
                }
                r.childBoneIndices = [];
                var n = this._sizeofScalar(i.childBoneIndices);
                for (var s = 0; s < r.chainLength; s++) {
                    r.childBoneIndices[s] = this._getValueScalar(i.childBoneIndices, this.offset);
                    this.offset += n;
                }
                t.iks[e] = r;
            };
            u.prototype._parseFaces = function(t) {
                var e = this._FACES_STRUCTURE;
                t.faceCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.faces.length = 0;
                for (var i = 0; i < t.faceCount; i++) {
                    this._parseFace(t, i);
                }
            };
            u.prototype._parseFace = function(t, e) {
                var i = this._FACE_STRUCTURE;
                var r = new a.PMDFace(e);
                for (var o in i) {
                    if (o == "vertices") continue;
                    r[o] = this._getValue(i[o], this.offset);
                    this.offset += this._sizeof(i[o]);
                }
                r.vertices = [];
                for (var n = 0; n < r.vertexCount; n++) {
                    this._parseFaceVertex(r, n, r.type);
                }
                t.faces[e] = r;
            };
            u.prototype._parseFaceVertex = function(t, e, i) {
                var r = this._FACE_VERTEX_STRUCTURE;
                var o = new a.PMDFaceVertex(e, i);
                this._parseObject(o, r);
                t.vertices[e] = o;
            };
            u.prototype._parseFaceDisplays = function(t) {
                var e = this._FACE_DISPLAYS_STRUCTURE;
                t.faceDisplayCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.faceDisplays.length = 0;
                for (var i = 0; i < t.faceDisplayCount; i++) {
                    this._parseFaceDisplay(t, i);
                }
            };
            u.prototype._parseFaceDisplay = function(t, e) {
                var i = this._FACE_DISPLAY_STRUCTURE;
                var r = new a.PMDFaceDisplay(e);
                this._parseObject(r, i);
                t.faceDisplays[e] = r;
            };
            u.prototype._parseBoneFrameNames = function(t) {
                var e = this._BONE_FRAME_NAMES_STRUCTURE;
                t.boneFrameNameCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.boneFrameNames.length = 0;
                for (var i = 0; i < t.boneFrameNameCount; i++) {
                    this._parseBoneFrameName(t, i);
                }
            };
            u.prototype._parseBoneFrameName = function(t, e) {
                var i = this._BONE_FRAME_NAME_STRUCTURE;
                var r = new a.PMDBoneFrameName(e);
                this._parseObject(r, i);
                t.boneFrameNames[e] = r;
            };
            u.prototype._parseBoneDisplays = function(t) {
                var e = this._BONE_DISPLAYS_STRUCTURE;
                t.boneDisplayCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.boneDisplays.length = 0;
                for (var i = 0; i < t.boneDisplayCount; i++) {
                    this._parseBoneDisplay(t, i);
                }
            };
            u.prototype._parseBoneDisplay = function(t, e) {
                var i = this._BONE_DISPLAY_STRUCTURE;
                var r = new a.PMDBoneDisplay(e);
                this._parseObject(r, i);
                t.boneDisplays[e] = r;
            };
            u.prototype._parseEnglishHeader = function(t) {
                var e = this._ENGLISH_HEADER_STRUCTURE;
                t.englishHeader = new a.PMDEnglishHeader();
                this._parseObject(t.englishHeader, e);
                if (t.englishHeader.compatibility == 0) {
                    this.offset -= this._sizeofObject(e);
                    this.offset += this._sizeof(e.compatibility);
                    this.englishCompatibility = false;
                } else {
                    this.englishCompatibility = true;
                }
            };
            u.prototype._parseEnglishBoneNames = function(t) {
                var e = this._ENGLISH_BONE_NAME_STRUCTURE;
                t.englishBoneNames.length = 0;
                for (var i = 0; i < t.boneCount; i++) {
                    var r = new a.PMDEnglishBoneName(i);
                    this._parseObject(r, e);
                    t.englishBoneNames[i] = r;
                }
            };
            u.prototype._parseEnglishFaceNames = function(t) {
                var e = this._ENGLISH_FACE_NAME_STRUCTURE;
                t.englishFaceNames.length = 0;
                for (var i = 0; i < t.faceCount - 1; i++) {
                    var r = new a.PMDEnglishFaceName(i);
                    this._parseObject(r, e);
                    t.englishFaceNames[i] = r;
                }
            };
            u.prototype._parseEnglishBoneFrameNames = function(t) {
                var e = this._ENGLISH_BONE_FRAME_NAME_STRUCTURE;
                t.englishBoneFrameNames.length = 0;
                for (var i = 0; i < t.boneFrameNameCount; i++) {
                    var r = new a.PMDEnglishBoneFrameName(i);
                    this._parseObject(r, e);
                    t.englishBoneFrameNames[i] = r;
                }
            };
            u.prototype._parseToonTextures = function(t) {
                var e = this._TOON_TEXTURE_STRUCTURE;
                t.toonTextureCount = 10;
                t.toonTextures.length = 0;
                for (var i = 0; i < t.toonTextureCount; i++) {
                    var r = new a.PMDToonTexture(i);
                    this._parseObject(r, e);
                    t.toonTextures[i] = r;
                }
            };
            u.prototype._parseRigidBodies = function(t) {
                var e = this._RIGID_BODIES_STRUCTURE;
                t.rigidBodyCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.rigidBodies.length = 0;
                for (var i = 0; i < t.rigidBodyCount; i++) {
                    this._parseRigidBody(t, i);
                }
            };
            u.prototype._parseRigidBody = function(t, e) {
                var i = this._RIGID_BODY_STRUCTURE;
                var r = new a.PMDRigidBody(e);
                this._parseObject(r, i);
                t.rigidBodies[e] = r;
            };
            u.prototype._parseJoints = function(t) {
                var e = this._JOINTS_STRUCTURE;
                t.jointCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.joints.length = 0;
                for (var i = 0; i < t.jointCount; i++) {
                    this._parseJoint(t, i);
                }
            };
            u.prototype._parseJoint = function(t, e) {
                var i = this._JOINT_STRUCTURE;
                var r = new a.PMDJoint(e);
                this._parseObject(r, i);
                t.joints[e] = r;
            };
            t.exports = u;
        },
        57: function(t, e, i) {
            "use strict";
            var r = i(5);
            var o = i(60);
            var n = h(o);
            var s = i(21);
            var a = h(s);
            function h(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            var u = function t(e) {
                return new Float32Array(e);
            };
            var p = function t(e) {
                return new Uint16Array(e);
            };
            function f(t, e, i) {
                this.layer = t;
                this.pmd = e;
                this.view = i;
                this.vmd = null;
                this.audio = null;
                this.vArray = u(e.vertexCount * this._V_ITEM_SIZE);
                this.vArray1 = u(e.vertexCount * this._V_ITEM_SIZE);
                this.vArray2 = u(e.vertexCount * this._V_ITEM_SIZE);
                this.vmArray = u(e.vertexCount * this._V_ITEM_SIZE);
                this.veArray = u(e.vertexCount * this._VE_ITEM_SIZE);
                this.mtArray1 = u(e.vertexCount * this._MT_ITEM_SIZE);
                this.mtArray2 = u(e.vertexCount * this._MT_ITEM_SIZE);
                this.mrArray1 = u(e.vertexCount * this._MR_ITEM_SIZE);
                this.mrArray2 = u(e.vertexCount * this._MR_ITEM_SIZE);
                this.cArray = u(e.vertexCount * this._C_ITEM_SIZE);
                this.iArray = p(e.vertexIndexCount);
                this.biArray = u(e.vertexCount * this._BI_ITEM_SIZE);
                this.bwArray = u(e.vertexCount * this._BW_ITEM_SIZE);
                this.vnArray = u(e.vertexCount * this._VN_ITEM_SIZE);
                this.textures = [];
                this.toonTextures = [];
                this.sphereTextures = [];
                this.basePosition = [ 0, 0, 0 ];
                this.frame = 0;
                this.motions = [];
                this.originalMotions = {};
                this.posFromBone1 = [];
                this.posFromBone2 = [];
                this.dancing = false;
                this.physics = new a.default(this.pmd);
            }
            f.prototype.Math = Math;
            f.prototype.vec3 = r.vec3;
            f.prototype.quat4 = r.quat4;
            f.prototype.mat4 = r.mat4;
            f.prototype._V_ITEM_SIZE = 3;
            f.prototype._C_ITEM_SIZE = 2;
            f.prototype._I_ITEM_SIZE = 1;
            f.prototype._BW_ITEM_SIZE = 1;
            f.prototype._BI_ITEM_SIZE = 2;
            f.prototype._MT_ITEM_SIZE = 3;
            f.prototype._MR_ITEM_SIZE = 4;
            f.prototype._VN_ITEM_SIZE = 3;
            f.prototype._VE_ITEM_SIZE = 1;
            f.prototype.setup = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    for (var e = 0; e < this._MT_ITEM_SIZE; e++) {
                        this.mtArray1[t * this._MT_ITEM_SIZE + e] = 0;
                        this.mtArray2[t * this._MT_ITEM_SIZE + e] = 0;
                    }
                    for (var e = 0; e < this._MR_ITEM_SIZE; e++) {
                        this.mrArray1[t * this._MR_ITEM_SIZE + e] = 0;
                        this.mrArray2[t * this._MR_ITEM_SIZE + e] = 0;
                    }
                }
                this.layer = {};
                this.layer.pourArrayBuffer = function() {};
                this.layer.pourElementArrayBuffer = function() {};
                this._initArrays();
                this._initTextures();
            };
            f.prototype.setBasePosition = function(t, e, i) {
                this.basePosition[0] = t;
                this.basePosition[1] = e;
                this.basePosition[2] = i;
                this._initMotions2();
                for (var r = 0; r < this.pmd.boneCount; r++) {
                    this._getBoneMotion(r);
                }
                this.physics.resetRigidBodies(this.motions);
            };
            f.prototype.setVMD = function(t) {
                this.vmd = t;
            };
            f.prototype.startDance = function() {
                this.vmd.setup(this.pmd);
                this.dancing = true;
                this.frame = 0;
                this._initMotions2();
                this._moveBone(1);
                this.physics.resetRigidBodies(this.motions);
            };
            f.prototype._initArrays = function() {
                this._initVertices();
                this._initVerticesFromBones();
                this._initVertexMorphs();
                this._initVertexEdges();
                this._initCoordinates();
                this._initIndices();
                this._initBoneWeights();
                this._initBoneIndices();
                this._initVertexNormals();
                this._initMotions();
                this._initMotionArrays();
            };
            f.prototype._initVertices = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    var e = this.pmd.vertices[t].position;
                    var i = t * this._V_ITEM_SIZE;
                    for (var r = 0; r < this._V_ITEM_SIZE; r++) {
                        this.vArray[i + r] = e[r];
                    }
                }
            };
            f.prototype._initVerticesFromBones = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    var e = this.pmd.vertices[t].position;
                    var i = this.pmd.vertices[t].boneIndices[0];
                    var r = this.pmd.vertices[t].boneIndices[1];
                    var o = this.pmd.bones[i];
                    var n = this.pmd.bones[r];
                    var s = this.vec3.create();
                    var a = this.vec3.create();
                    for (var h = 0; h < this._V_ITEM_SIZE; h++) {
                        s[h] = e[h] - o.position[h];
                        a[h] = e[h] - n.position[h];
                    }
                    this.posFromBone1.push(s);
                    this.posFromBone2.push(a);
                    var u = t * this._V_ITEM_SIZE;
                    for (var h = 0; h < this._V_ITEM_SIZE; h++) {
                        this.vArray1[u + h] = e[h] - o.position[h];
                        this.vArray2[u + h] = e[h] - n.position[h];
                    }
                }
            };
            f.prototype._initVertexMorphs = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    var e = t * this._V_ITEM_SIZE;
                    for (var i = 0; i < this._V_ITEM_SIZE; i++) {
                        this.vmArray[e + i] = 0;
                    }
                }
            };
            f.prototype._initVertexEdges = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    this.veArray[t] = this.pmd.vertices[t].edgeFlag ? 0 : 1;
                }
            };
            f.prototype._initCoordinates = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    var e = t * this._C_ITEM_SIZE;
                    var i = this.pmd.vertices[t].uv;
                    for (var r = 0; r < this._C_ITEM_SIZE; r++) {
                        this.cArray[e + r] = i[r];
                    }
                }
            };
            f.prototype._initIndices = function() {
                for (var t = 0; t < this.pmd.vertexIndexCount; t++) {
                    this.iArray[t] = this.pmd.vertexIndices[t].index;
                }
            };
            f.prototype._initBoneWeights = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    this.bwArray[t] = this.pmd.vertices[t].boneWeight / 100;
                }
            };
            f.prototype._initBoneIndices = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    for (var e = 0; e < this._BI_ITEM_SIZE; e++) {
                        this.biArray[t * this._BI_ITEM_SIZE + e] = this.pmd.vertices[t].boneIndices[e];
                    }
                }
            };
            f.prototype._initVertexNormals = function() {
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    var e = this.pmd.vertices[t].normal;
                    var i = t * this._VN_ITEM_SIZE;
                    for (var r = 0; r < this._VN_ITEM_SIZE; r++) {
                        this.vnArray[i + r] = e[r];
                    }
                }
            };
            f.prototype._initMotionArrays = function() {
                if (this.view.skinningType == this.view._SKINNING_CPU) {
                    this._skinning();
                    return;
                }
                if (this.view.skinningType == this.view._SKINNING_GPU) {
                    this._pourVTF();
                    return;
                }
                for (var t = 0; t < this.pmd.vertexCount; t++) {
                    var e = this.pmd.vertices[t].boneIndices[0];
                    var i = this.pmd.vertices[t].boneIndices[1];
                    var r = this._getBoneMotion(e);
                    var o = this._getBoneMotion(i);
                    var s = t * this._MT_ITEM_SIZE;
                    for (var a = 0; a < this._MT_ITEM_SIZE; a++) {
                        this.mtArray1[s + a] = r.p[a];
                        this.mtArray2[s + a] = o.p[a];
                    }
                    s = t * this._MR_ITEM_SIZE;
                    for (var a = 0; a < this._MR_ITEM_SIZE; a++) {
                        this.mrArray1[s + a] = r.r[a];
                        this.mrArray2[s + a] = o.r[a];
                    }
                }
                f.prototype.getVerticals = function(t) {
                    var e = [ this.vArray1[t * 3 + 0] + this.vmArray[t * 3 + 0] + (((this.vArray1[t * 3 + 2] + this.vmArray[t * 3 + 2]) * this.mrArray1[t * 4 + 0] - (this.vArray1[t * 3 + 0] + this.vmArray[t * 3 + 0]) * this.mrArray1[t * 4 + 2] - (this.vArray1[t * 3 + 1] + this.vmArray[t * 3 + 1]) * this.mrArray1[t * 4 + 3]) * this.mrArray1[t * 4 + 2] - ((this.vArray1[t * 3 + 0] + this.vmArray[t * 3 + 0]) * this.mrArray1[t * 4 + 1] - (this.vArray1[t * 3 + 1] + this.vmArray[t * 3 + 1]) * this.mrArray1[t * 4 + 0] - (this.vArray1[t * 3 + 2] + this.vmArray[t * 3 + 2]) * this.mrArray1[t * 4 + 3]) * this.mrArray1[t * 4 + 1]) * 2 + this.mtArray1[t * 3 + 0], this.vArray1[t * 3 + 1] + this.vmArray[t * 3 + 1] + (((this.vArray1[t * 3 + 0] + this.vmArray[t * 3 + 0]) * this.mrArray1[t * 4 + 1] - (this.vArray1[t * 3 + 1] + this.vmArray[t * 3 + 1]) * this.mrArray1[t * 4 + 0] - (this.vArray1[t * 3 + 2] + this.vmArray[t * 3 + 2]) * this.mrArray1[t * 4 + 3]) * this.mrArray1[t * 4 + 0] - ((this.vArray1[t * 3 + 1] + this.vmArray[t * 3 + 1]) * this.mrArray1[t * 4 + 2] - (this.vArray1[t * 3 + 2] + this.vmArray[t * 3 + 2]) * this.mrArray1[t * 4 + 1] - (this.vArray1[t * 3 + 0] + this.vmArray[t * 3 + 0]) * this.mrArray1[t * 4 + 3]) * this.mrArray1[t * 4 + 2]) * 2 + this.mtArray1[t * 3 + 1], this.vArray1[t * 3 + 2] + this.vmArray[t * 3 + 2] + (((this.vArray1[t * 3 + 1] + this.vmArray[t * 3 + 1]) * this.mrArray1[t * 4 + 2] - (this.vArray1[t * 3 + 2] + this.vmArray[t * 3 + 2]) * this.mrArray1[t * 4 + 1] - (this.vArray1[t * 3 + 0] + this.vmArray[t * 3 + 0]) * this.mrArray1[t * 4 + 3]) * this.mrArray1[t * 4 + 1] - ((this.vArray1[t * 3 + 2] + this.vmArray[t * 3 + 2]) * this.mrArray1[t * 4 + 0] - (this.vArray1[t * 3 + 0] + this.vmArray[t * 3 + 0]) * this.mrArray1[t * 4 + 2] - (this.vArray1[t * 3 + 1] + this.vmArray[t * 3 + 1]) * this.mrArray1[t * 4 + 3]) * this.mrArray1[t * 4 + 0]) * 2 + this.mtArray1[t * 3 + 2] ];
                    if (this.bwArray[t] < .99) {
                        var i = n.default.arrayAdd([ this.vArray2[t * 3 + 0], this.vArray2[t * 3 + 1], this.vArray2[t * 3 + 2] ], [ this.vmArray[t * 3 + 0], this.vmArray[t * 3 + 1], this.vmArray[t * 3 + 2] ]);
                        i = n.default.arrayAdd(n.default.qtransform(i, [ this.mrArray2[t * 4 + 0], this.mrArray2[t * 4 + 1], this.mrArray2[t * 4 + 2], this.mrArray2[t * 4 + 3] ]), [ this.mtArray2[t * 3 + 0], this.mtArray2[t * 3 + 1], this.mtArray2[t * 3 + 2] ]);
                        e = n.default.mix(i, e, this.bwArray[t]);
                    }
                    return e;
                }.bind(this);
            };
            f.prototype._initTextures = function() {
                return;
                for (var t = 0; t < this.pmd.materialCount; t++) {
                    this.textures[t] = this.layer.generateTexture(this.pmd.images[t]);
                }
                for (var t = 0; t < this.pmd.toonTextureCount; t++) {
                    this.toonTextures[t] = this.layer.generateTexture(this.pmd.toonImages[t]);
                }
                for (var t = 0; t < this.pmd.materialCount; t++) {
                    this.sphereTextures[t] = this.layer.generateTexture(this.pmd.sphereImages[t]);
                }
            };
            f.prototype._initMotions = function() {
                for (var t = 0; t < this.pmd.boneCount; t++) {
                    this.motions[t] = {
                        r: this.quat4.create(),
                        p: this.vec3.create(),
                        done: false
                    };
                    var e = this.pmd.bones[t];
                    var i = {};
                    i.location = [ 0, 0, 0 ];
                    i.rotation = [ 0, 0, 0, 1 ];
                    this.originalMotions[e.name] = i;
                }
            };
            f.prototype._initMotions2 = function() {
                for (var t = 0; t < this.pmd.boneCount; t++) {
                    if (!this.motions[t]) continue;
                    this.quat4.clear(this.motions[t].r);
                    this.vec3.clear(this.motions[t].p);
                    this.motions[t].done = false;
                    var e = this.pmd.bones[t];
                    var i = this.originalMotions[e.name];
                    this.vec3.clear(i.location);
                    this.quat4.clear(i.rotation);
                }
            };
            f.prototype._packTo4Uint8 = function(t, e, i) {
                t = t * 1;
                var r = t < 0 ? 128 : 0;
                t = this.Math.abs(t);
                e[i + 0] = r | t & 127;
                e[i + 1] = t * 256 & 255;
                e[i + 2] = t * 256 * 256 & 255;
                e[i + 3] = t * 256 * 256 * 256 & 255;
            };
            f.prototype._pourVTF = function() {
                for (var t = 0; t < this.pmd.boneCount; t++) {
                    var e = 7 * t * 4;
                    var i = this._getBoneMotion(t);
                    this._packTo4Uint8(i.p[0], this.vtfUint8Array, e + 0);
                    this._packTo4Uint8(i.p[1], this.vtfUint8Array, e + 4);
                    this._packTo4Uint8(i.p[2], this.vtfUint8Array, e + 8);
                    this._packTo4Uint8(i.r[0], this.vtfUint8Array, e + 12);
                    this._packTo4Uint8(i.r[1], this.vtfUint8Array, e + 16);
                    this._packTo4Uint8(i.r[2], this.vtfUint8Array, e + 20);
                    this._packTo4Uint8(i.r[3], this.vtfUint8Array, e + 24);
                }
                this.layer.pourVTF(this.vtf, this.vtfUint8Array, this.vtfWidth);
            };
            f.prototype.skinningOneBone = function(t) {
                if (t.id === null) return null;
                var e = this._getBoneMotion(t.id);
                var i = t.posFromBone;
                var r = [ 0, 0, 0 ];
                this.quat4.multiplyVec3(e.r, i, r);
                this.vec3.add(r, e.p, r);
                return r;
            };
            f.prototype._skinning = function() {
                var t = this.vec3.create();
                var e = this.vec3.create();
                for (var i = 0; i < this.pmd.vertexCount; i++) {
                    var r = this.pmd.vertices[i];
                    var o = r.boneWeight;
                    var n = r.boneIndices[0];
                    var s = this.pmd.bones[n];
                    var a = this._getBoneMotion(n);
                    var h = this.posFromBone1[i];
                    this.quat4.multiplyVec3(a.r, h, t);
                    this.vec3.add(t, a.p, t);
                    var u = i * this._V_ITEM_SIZE;
                    if (o >= 99) {
                        this.vArray[u + 0] = t[0];
                        this.vArray[u + 1] = t[1];
                        this.vArray[u + 2] = t[2];
                    } else {
                        var p = r.boneIndices[1];
                        var f = this.pmd.bones[p];
                        var l = this._getBoneMotion(p);
                        var c = this.posFromBone2[i];
                        this.quat4.multiplyVec3(l.r, c, e);
                        this.vec3.add(e, l.p, e);
                        var m = r.boneWeightFloat1;
                        var _ = r.boneWeightFloat2;
                        this.vArray[u + 0] = t[0] * m + e[0] * _;
                        this.vArray[u + 1] = t[1] * m + e[1] * _;
                        this.vArray[u + 2] = t[2] * m + e[2] * _;
                    }
                }
                this.layer.pourArrayBuffer(this.vBuffer, this.vArray, this._V_ITEM_SIZE, this.pmd.vertexCount);
            };
            f.prototype._pourArrays = function() {
                var t = this.layer;
                t.pourArrayBuffer(this.vBuffer, this.vArray, this._V_ITEM_SIZE, this.pmd.vertexCount);
                t.pourArrayBuffer(this.vBuffer1, this.vArray1, this._V_ITEM_SIZE, this.pmd.vertexCount);
                t.pourArrayBuffer(this.vBuffer2, this.vArray2, this._V_ITEM_SIZE, this.pmd.vertexCount);
                t.pourArrayBuffer(this.vmBuffer, this.vmArray, this._V_ITEM_SIZE, this.pmd.vertexCount);
                t.pourArrayBuffer(this.cBuffer, this.cArray, this._C_ITEM_SIZE, this.pmd.vertexCount);
                t.pourElementArrayBuffer(this.iBuffer, this.iArray, this._I_ITEM_SIZE, this.pmd.vertexIndexCount);
                t.pourArrayBuffer(this.bwBuffer, this.bwArray, this._BW_ITEM_SIZE, this.pmd.vertexCount);
                t.pourArrayBuffer(this.biBuffer, this.biArray, this._BI_ITEM_SIZE, this.pmd.vertexCount);
                t.pourArrayBuffer(this.vnBuffer, this.vnArray, this._VN_ITEM_SIZE, this.pmd.vertexCount);
                t.pourArrayBuffer(this.veBuffer, this.veArray, this._VE_ITEM_SIZE, this.pmd.vertexCount);
            };
            f.prototype._bindBuffers = function() {
                var t = this.layer;
                var e = this.layer.gl;
                var i = this.layer.shader;
                e.bindBuffer(e.ARRAY_BUFFER, this.vBuffer);
                e.enableVertexAttribArray(i.vertexPositionAttribute);
                e.vertexAttribPointer(i.vertexPositionAttribute, this.vBuffer.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.vBuffer1);
                e.enableVertexAttribArray(i.vertexPositionAttribute1);
                e.vertexAttribPointer(i.vertexPositionAttribute1, this.vBuffer1.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.vBuffer2);
                e.enableVertexAttribArray(i.vertexPositionAttribute2);
                e.vertexAttribPointer(i.vertexPositionAttribute2, this.vBuffer2.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.vmBuffer);
                e.enableVertexAttribArray(i.vertexMorphAttribute);
                e.vertexAttribPointer(i.vertexMorphAttribute, this.vmBuffer.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.cBuffer);
                e.enableVertexAttribArray(i.textureCoordAttribute);
                e.vertexAttribPointer(i.textureCoordAttribute, this.cBuffer.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.bwBuffer);
                e.enableVertexAttribArray(i.boneWeightAttribute);
                e.vertexAttribPointer(i.boneWeightAttribute, this.bwBuffer.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.biBuffer);
                e.enableVertexAttribArray(i.boneIndicesAttribute);
                e.vertexAttribPointer(i.boneIndicesAttribute, this.biBuffer.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.vnBuffer);
                e.enableVertexAttribArray(i.vertexNormalAttribute);
                e.vertexAttribPointer(i.vertexNormalAttribute, this.vnBuffer.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.veBuffer);
                e.enableVertexAttribArray(i.vertexEdgeAttribute);
                e.vertexAttribPointer(i.vertexEdgeAttribute, this.veBuffer.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.mtBuffer1);
                e.enableVertexAttribArray(i.motionTranslationAttribute1);
                e.vertexAttribPointer(i.motionTranslationAttribute1, this.mtBuffer1.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.mtBuffer2);
                e.enableVertexAttribArray(i.motionTranslationAttribute2);
                e.vertexAttribPointer(i.motionTranslationAttribute2, this.mtBuffer2.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.mrBuffer1);
                e.enableVertexAttribArray(i.motionRotationAttribute1);
                e.vertexAttribPointer(i.motionRotationAttribute1, this.mrBuffer1.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, this.mrBuffer2);
                e.enableVertexAttribArray(i.motionRotationAttribute2);
                e.vertexAttribPointer(i.motionRotationAttribute2, this.mrBuffer2.itemSize, e.FLOAT, false, 0, 0);
                e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.iBuffer);
            };
            f.prototype._draw = function(t, e, i) {
                this.layer.draw(t, this.layer._BLEND_ALPHA, i, e);
            };
            f.prototype.update = function(t) {
                this._initMotions2();
                if (this.dancing) {
                    this._moveBone(t);
                    if (this.view.morphType == this.view._MORPH_ON) {
                        this._moveFace();
                    }
                }
                for (var e = 0; e < this.pmd.boneCount; e++) {
                    this._getBoneMotion(e);
                }
                if (this.view.physicsType == this.view._PHYSICS_ON) this._runPhysics(t);
                this._initMotionArrays();
            };
            f.prototype.draw = function() {
                var t = this.layer;
                var e = this.layer.gl;
                var i = this.layer.shader;
                this._bindBuffers();
                if (this.view.skinningType == this.view._SKINNING_GPU) {
                    e.activeTexture(e.TEXTURE1);
                    e.bindTexture(e.TEXTURE_2D, this.vtf);
                    e.uniform1i(i.uVTFUniform, 1);
                } else {
                    e.uniform1i(i.uVTFUniform, 0);
                }
                e.uniform1i(i.edgeUniform, 0);
                e.enable(e.BLEND);
                e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.SRC_ALPHA, e.DST_ALPHA);
                var r = 0;
                for (var o = 0; o < this.pmd.materialCount; o++) {
                    var n = this.pmd.materials[o];
                    if (n.edgeFlag) e.uniform1i(i.shadowUniform, 1); else e.uniform1i(i.shadowUniform, 0);
                    if (this.view.edgeType == this.view._EDGE_ON && n.color[3] == 1) {
                        e.enable(e.CULL_FACE);
                        e.cullFace(e.FRONT);
                    } else {
                        e.disable(e.CULL_FACE);
                        e.cullFace(e.FRONT);
                    }
                    e.uniform4fv(i.diffuseColorUniform, n.color);
                    e.uniform3fv(i.ambientColorUniform, n.mirrorColor);
                    e.uniform3fv(i.specularColorUniform, n.specularColor);
                    e.uniform1f(i.shininessUniform, n.specularity);
                    if (n.hasToon()) {
                        e.activeTexture(e.TEXTURE2);
                        e.bindTexture(e.TEXTURE_2D, this.toonTextures[n.tuneIndex]);
                        e.uniform1i(i.toonTextureUniform, 2);
                        e.uniform1i(i.useToonUniform, 1);
                    } else {
                        e.uniform1i(i.useToonUniform, 0);
                    }
                    if (this.view.sphereMapType == this.view._SPHERE_MAP_ON && n.hasSphereTexture()) {
                        e.activeTexture(e.TEXTURE3);
                        e.bindTexture(e.TEXTURE_2D, this.sphereTextures[o]);
                        e.uniform1i(i.sphereTextureUniform, 3);
                        e.uniform1i(i.useSphereMapUniform, 1);
                        if (n.isSphereMapAddition()) {
                            e.uniform1i(i.useSphereMapAdditionUniform, 1);
                        } else {
                            e.uniform1i(i.useSphereMapAdditionUniform, 0);
                        }
                    } else {
                        e.uniform1i(i.useSphereMapUniform, 0);
                    }
                    var s = this.pmd.materials[o].vertexCount;
                    this._draw(this.textures[o], r, s);
                    r += s;
                }
            };
            f.prototype.drawEdge = function() {
                var t = this.layer;
                var e = this.layer.gl;
                var i = this.layer.shader;
                e.uniform1i(i.edgeUniform, 1);
                e.uniform1i(i.useToonUniform, 0);
                e.cullFace(e.BACK);
                e.disable(e.BLEND);
                e.enable(e.CULL_FACE);
                var r = 0;
                var o = 0;
                var n = false;
                for (var s = 0; s < this.pmd.materialCount; s++) {
                    o += this.pmd.materials[s].vertexCount;
                    if (!this.pmd.materials[s].edgeFlag) {
                        if (n) this._draw(this.textures[0], r, o);
                        r += o;
                        o = 0;
                        n = false;
                    } else {
                        n = true;
                    }
                }
                if (n) this._draw(this.textures[0], r, o);
            };
            f.prototype.drawShadowMap = function() {
                var t = this.layer;
                var e = this.layer.gl;
                var i = this.layer.shader;
                this._bindBuffers();
                if (this.view.skinningType == this.view._SKINNING_GPU) {
                    e.activeTexture(e.TEXTURE1);
                    e.bindTexture(e.TEXTURE_2D, this.vtf);
                    e.uniform1i(i.uVTFUniform, 1);
                } else {
                    e.uniform1i(i.uVTFUniform, 0);
                }
                e.uniform1i(i.edgeUniform, 0);
                e.disable(e.BLEND);
                e.disable(e.CULL_FACE);
                e.cullFace(e.FRONT);
                this._draw(this.textures[0], 0, this.pmd.vertexIndexCount);
            };
            f.prototype._runPhysics = function(t) {
                if (t == 1) this.physics.simulate(this.motions); else this.physics.simulateFrame(this.motions, t);
            };
            f.prototype._loadFromVMD = function(t) {
                this.vmd.loadMotion();
                if (this.view.morphType == this.view._MORPH_ON) this.vmd.loadFace();
                this.vmd.step(t);
                this.frame += t;
            };
            f.prototype._moveFace = function() {
                var t = false;
                for (var e = 0; e < this.pmd.faceCount; e++) {
                    var i = this.vmd.getFace(this.pmd.faces[e]);
                    if (i.available) {
                        this._moveMorph(this.pmd.faces[e].id, i.weight);
                        t = true;
                    }
                }
                if (!t) return;
                var r = this.pmd.faces[0];
                for (var e = 0; e < r.vertexCount; e++) {
                    var o = r.vertices[e];
                    var n = o.index * this._V_ITEM_SIZE;
                    this.vmArray[n + 0] = 0;
                    this.vmArray[n + 1] = 0;
                    this.vmArray[n + 2] = 0;
                }
            };
            f.prototype._moveBone = function(t) {
                this._loadFromVMD(t);
                for (var e = 0; e < this.pmd.boneCount; e++) {
                    this._getBoneMotion(e);
                }
                if (this.view.ikType == this.view._IK_ON) this._resolveIK();
            };
            r.vec3.clear = function(t) {
                t[0] = 0;
                t[1] = 0;
                t[2] = 0;
            };
            r.quat4.clear = function(t) {
                t[0] = 0;
                t[1] = 0;
                t[2] = 0;
                t[3] = 1;
            };
            f.prototype._getOriginalBoneMotion = function(t) {
                return this.dancing ? this.vmd.getBoneMotion(t) : this.originalMotions[t.name];
            };
            f.prototype._getBoneMotion = function(t) {
                var e = this.motions[t];
                if (!e.done) {
                    this._resolveFK(e, t);
                }
                return e;
            };
            f.prototype._resolveFK = function(t, e) {
                var i = this._getOriginalBoneMotion(this.pmd.bones[e]);
                var r = this.pmd.bones[e];
                if (this.pmd.bones[e].parentIndex === 65535) {
                    this.vec3.add(r.position, i.location, t.p);
                    this.vec3.add(t.p, this.basePosition, t.p);
                    this.quat4.set(i.rotation, t.r);
                } else {
                    var o = this._getBoneMotion(r.parentIndex);
                    var n = this.pmd.bones[r.parentIndex];
                    this.quat4.multiply(o.r, i.rotation, t.r);
                    this.vec3.subtract(r.position, n.position, t.p);
                    this.vec3.add(t.p, i.location, t.p);
                    this.quat4.multiplyVec3(o.r, t.p, t.p);
                    this.vec3.add(t.p, o.p, t.p);
                }
                t.done = true;
            };
            f.prototype._resolveIK = function() {
                var t = this.vec3.create();
                var e = this.vec3.create();
                var i = this.vec3.create();
                var r = this.quat4.create();
                var o = this.quat4.create();
                for (var n = 0; n < this.pmd.ikCount; n++) {
                    var s = this.pmd.iks[n];
                    var a = this.pmd.bones[s.index];
                    var h = this.pmd.bones[s.targetBoneIndex];
                    var u = this.pmd.bones[h.parentIndex];
                    var p = this._getBoneMotion(s.index);
                    var f = this._getBoneMotion(s.targetBoneIndex);
                    var l = s.iteration;
                    var c = s.chainLength;
                    this.vec3.subtract(h.position, u.position, t);
                    var m = .1 * this.vec3.length(t);
                    for (var _ = 0; _ < l; _++) {
                        this.vec3.subtract(f.p, p.p, t);
                        if (m > this.vec3.length(t)) {
                            break;
                        }
                        for (var v = 0; v < c; v++) {
                            var d = s.childBoneIndices[v];
                            var y = this.pmd.bones[d];
                            var g = this._getBoneMotion(d);
                            f = this._getBoneMotion(s.targetBoneIndex);
                            this.vec3.subtract(f.p, g.p, e);
                            this.vec3.subtract(p.p, g.p, i);
                            this.vec3.cross(e, i, t);
                            var T = this.vec3.length(e);
                            var A = this.vec3.length(i);
                            var E = this.vec3.length(t);
                            var I = E / A / T;
                            if (isNaN(I)) {
                                continue;
                            }
                            if (T < m || A < m || I < .001) continue;
                            var C = (v + 1) * s.limitation * 4;
                            var M = this.Math.asin(I);
                            if (this.vec3.dot(e, i) < 0) {
                                M = 3.141592653589793 - M;
                            }
                            if (M > C) M = C;
                            this.vec3.scale(t, this.Math.sin(M / 2) / E, t);
                            this.vec3.set(t, r);
                            r[3] = this.Math.cos(M / 2);
                            var x = this._getBoneMotion(y.parentIndex).r;
                            this.quat4.inverse(x, o);
                            this.quat4.multiply(o, r, o);
                            this.quat4.multiply(o, g.r, o);
                            if (this.pmd.bones[d].isKnee()) {
                                var b = o[3] > 1 ? 1 : o[3];
                                this.quat4.set([ -this.Math.sqrt(1 - b * b), 0, 0, b ], o);
                                this.quat4.inverse(g.r, r);
                                this.quat4.multiply(o, r, r);
                                this.quat4.multiply(x, r, r);
                            }
                            this.quat4.normalize(o, this.vmd.getBoneMotion(y).rotation);
                            this.quat4.multiply(r, g.r, g.r);
                            this.motions[s.targetBoneIndex].done = false;
                            for (var F = 0; F <= v; F++) {
                                this.motions[s.childBoneIndices[F]].done = false;
                            }
                        }
                    }
                }
            };
            f.prototype._moveMorph = function(t, e) {
                if (t == 0) {
                    return;
                }
                var i = this.pmd.faces[t];
                var r = this.pmd.faces[0];
                for (var o = 0; o < i.vertexCount; o++) {
                    var n = r.vertices[i.vertices[o].index];
                    var s = n.index * this._V_ITEM_SIZE;
                    this.vmArray[s + 0] += i.vertices[o].position[0] * e;
                    this.vmArray[s + 1] += i.vertices[o].position[1] * e;
                    this.vmArray[s + 2] += i.vertices[o].position[2] * e;
                }
            };
            t.exports = f;
        },
        58: function(t, e, i) {
            "use strict";
            var r = i(5);
            function o(t) {
                this.layer = t;
                this.modelViews = [];
                this.vmd = null;
                this.audio = null;
                this.eye = [ 0, 0, 0 ];
                this.center = [ 0, 0, 0 ];
                this.up = [ 0, 1, 0 ];
                this.cameraTranslation = [ 0, 0, 0 ];
                this.cameraQuaternion = [ 0, 0, 0, 1 ];
                this.cameraDistance = 0;
                this.frame = 0;
                this.dframe = 1;
                this.camera = {};
                this.camera.location = [ 0, 0, 0 ];
                this.camera.rotation = [ 0, 0, 0 ];
                this.length = 0;
                this.angle = 0;
                this.oldDate = null;
                this.startDate = null;
                this.audioStart = false;
                this.dancing = false;
                this.elapsedTime = 0;
                this.skinningType = null;
                this.lightingType = null;
                this.ikType = null;
                this.edgeType = null;
                this.morphType = null;
                this.sphereMapType = null;
                this.shadowMappingType = null;
                this.lightColor = [ 0, 0, 0 ];
                this.runType = null;
                this.stageType = null;
                this.effectFlag = null;
                this.audioType = null;
                this.physicsType = null;
                this.setLightingType(this._LIGHTING_ON);
                this.setSkinningType(this._SKINNING_CPU_AND_GPU);
                this.setIKType(this._IK_ON);
                this.setMorphType(this._MORPH_ON);
                this.setSphereMapType(this._SPHERE_MAP_ON);
                this.setShadowMappingType(this._SHADOW_MAPPING_OFF);
                this.setEdgeType(this._EDGE_ON);
                this.setRunType(this._RUN_REALTIME_ORIENTED);
                this.setStageType(this._STAGE_2);
                this.setEffectFlag(this._EFFECT_OFF);
                this.setAudioType(this._AUDIO_ON);
                this.setPhysicsType(this._PHYSICS_ON);
                this.setLightColor(1);
            }
            o.prototype.Math = Math;
            o.prototype.vec3 = r.vec3;
            o.prototype.quat4 = r.quat4;
            o.prototype.mat4 = r.mat4;
            o.prototype._FRAME_S = 1 / 60;
            o.prototype._FRAME_MS = 1 / 60 * 1e3;
            o.prototype._PHYSICS_OFF = 0;
            o.prototype._PHYSICS_ON = 1;
            o.prototype._PHYSICS_WORKERS_ON = 2;
            o.prototype._SKINNING_CPU = 0;
            o.prototype._SKINNING_GPU = 1;
            o.prototype._SKINNING_CPU_AND_GPU = 2;
            o.prototype._LIGHTING_OFF = 0;
            o.prototype._LIGHTING_ON = 1;
            o.prototype._LIGHTING_ON_WITH_TOON = 2;
            o.prototype._IK_OFF = 0;
            o.prototype._IK_ON = 1;
            o.prototype._MORPH_OFF = 0;
            o.prototype._MORPH_ON = 1;
            o.prototype._SPHERE_MAP_OFF = 0;
            o.prototype._SPHERE_MAP_ON = 1;
            o.prototype._SHADOW_MAPPING_OFF = 0;
            o.prototype._SHADOW_MAPPING_ON = 1;
            o.prototype._SHADOW_MAPPING_ONLY = 2;
            o.prototype._RUN_FRAME_ORIENTED = 0;
            o.prototype._RUN_REALTIME_ORIENTED = 1;
            o.prototype._RUN_AUDIO_ORIENTED = 2;
            o.prototype._AUDIO_OFF = 0;
            o.prototype._AUDIO_ON = 1;
            o.prototype._EDGE_OFF = 0;
            o.prototype._EDGE_ON = 1;
            o.prototype._STAGE_OFF = 0;
            o.prototype._STAGE_1 = 1;
            o.prototype._STAGE_2 = 2;
            o.prototype._STAGE_3 = 3;
            o.prototype._EFFECT_OFF = 0;
            o.prototype._EFFECT_BLUR = 1;
            o.prototype._EFFECT_GAUSSIAN = 2;
            o.prototype._EFFECT_DIFFUSION = 4;
            o.prototype._EFFECT_DIVISION = 8;
            o.prototype._EFFECT_LOW_RESO = 16;
            o.prototype._EFFECT_FACE_MOSAIC = 32;
            o._PHYSICS_OFF = o.prototype._PHYSICS_OFF;
            o._PHYSICS_ON = o.prototype._PHYSICS_ON;
            o._PHYSICS_WORKERS_ON = o.prototype._PHYSICS_WORKERS_ON;
            o._SKINNING_CPU = o.prototype._SKINNING_CPU;
            o._SKINNING_GPU = o.prototype._SKINNING_GPU;
            o._SKINNING_CPU_AND_GPU = o.prototype._SKINNING_CPU_AND_GPU;
            o._LIGHTING_OFF = o.prototype._LIGHTING_OFF;
            o._LIGHTING_ON = o.prototype._LIGHTING_ON;
            o._LIGHTING_ON_WITH_TOON = o.prototype._LIGHTING_ON_WITH_TOON;
            o._IK_OFF = o.prototype._IK_OFF;
            o._IK_ON = o.prototype._IK_ON;
            o._MORPH_OFF = o.prototype._MORPH_OFF;
            o._MORPH_ON = o.prototype._MORPH_ON;
            o._SPHERE_MAP_OFF = o.prototype._SPHERE_MAP_OFF;
            o._SPHERE_MAP_ON = o.prototype._SPHERE_MAP_ON;
            o._SHADOW_MAPPING_OFF = o.prototype._SHADOW_MAPPING_OFF;
            o._SHADOW_MAPPING_ON = o.prototype._SHADOW_MAPPING_ON;
            o._SHADOW_MAPPING_ONLY = o.prototype._SHADOW_MAPPING_ONLY;
            o._RUN_FRAME_ORIENTED = o.prototype._RUN_FRAME_ORIENTED;
            o._RUN_REALTIME_ORIENTED = o.prototype._RUN_REALTIME_ORIENTED;
            o._RUN_AUDIO_ORIENTED = o.prototype._RUN_AUDIO_ORIENTED;
            o._AUDIO_OFF = o.prototype._AUDIO_OFF = 0;
            o._AUDIO_ON = o.prototype._AUDIO_ON = 1;
            o._EDGE_OFF = o.prototype._EDGE_OFF;
            o._EDGE_ON = o.prototype._EDGE_ON;
            o._STAGE_OFF = o.prototype._STAGE_OFF;
            o._STAGE_1 = o.prototype._STAGE_1;
            o._STAGE_2 = o.prototype._STAGE_2;
            o._STAGE_3 = o.prototype._STAGE_3;
            o._EFFECT_OFF = o.prototype._EFFECT_OFF;
            o._EFFECT_BLUR = o.prototype._EFFECT_BLUR;
            o._EFFECT_GAUSSIAN = o.prototype._EFFECT_GAUSSIAN;
            o._EFFECT_DIFFUSION = o.prototype._EFFECT_DIFFUSION;
            o._EFFECT_DIVISION = o.prototype._EFFECT_DIVISION;
            o._EFFECT_LOW_RESO = o.prototype._EFFECT_LOW_RESO;
            o._EFFECT_FACE_MOSAIC = o.prototype._EFFECT_FACE_MOSAIC;
            o.prototype.addModelView = function(t) {
                this.modelViews.push(t);
            };
            o.prototype.getModelView = function(t) {
                return this.modelViews[t];
            };
            o.prototype.getModelNum = function() {
                return this.modelViews.length;
            };
            o.prototype.setup = function() {
                for (var t = 0; t < this.modelViews.length; t++) {
                    this.modelViews[t].setup();
                }
                this.elapsedTime = 0;
            };
            o.prototype.setVMD = function(t) {
                this.vmd = t;
                this.vmd.supply();
            };
            o.prototype.setAudio = function(t, e) {
                this.audio = {};
                this.audio.audio = t;
                this.audio.offset = e;
            };
            o.prototype.startDance = function() {
                this.vmd.setup(this.modelViews[0].pmd);
                this.elapsedTime = 0;
                this.dancing = true;
                this.oldDate = null;
                this.startDate = Date.now();
                this.frame = 0;
                this.dframe = 0;
                for (var t = 0; t < this.modelViews.length; t++) {
                    this.modelViews[t].setVMD(this.vmd.clone());
                    this.modelViews[t].startDance();
                }
            };
            o.prototype.setEye = function(t) {
                for (var e = 0; e < this.eye.length; e++) {
                    this.eye[e] = t[e];
                }
                this.center[0] = t[0];
                this.center[1] = t[1];
                this.resetCameraMove();
            };
            o.prototype.setPhysicsType = function(t) {
                this.physicsType = t;
            };
            o.prototype.setSkinningType = function(t) {
                this.skinningType = t;
            };
            o.prototype.setLightingType = function(t) {
                this.lightingType = t;
            };
            o.prototype.setLightColor = function(t) {
                this.lightColor[0] = t;
                this.lightColor[1] = t;
                this.lightColor[2] = t;
            };
            o.prototype.setIKType = function(t) {
                this.ikType = t;
            };
            o.prototype.setMorphType = function(t) {
                this.morphType = t;
            };
            o.prototype.setSphereMapType = function(t) {
                this.sphereMapType = t;
            };
            o.prototype.setShadowMappingType = function(t) {
                this.shadowMappingType = t;
            };
            o.prototype.setRunType = function(t) {
                this.runType = t;
            };
            o.prototype.setStageType = function(t) {
                this.stageType = t;
            };
            o.prototype.setEffectFlag = function(t) {
                this.effectFlag = t;
            };
            o.prototype.setAudioType = function(t) {
                this.audioType = t;
            };
            o.prototype.setEdgeType = function(t) {
                this.edgeType = t;
            };
            o.prototype.moveCameraQuaternion = function(t) {
                this.quat4.multiply(this.cameraQuaternion, t, this.cameraQuaternion);
            };
            o.prototype.moveCameraQuaternionByXY = function(t, e) {
                t = -t;
                e = -e;
                var i = this.Math.sqrt(t * t + e * e);
                if (i != 0) {
                    var r = i * this.Math.PI;
                    var o = this.Math.sin(r) / i;
                    var n = this.quat4.create([ e * o, t * o, 0, this.Math.cos(r) ]);
                    this.moveCameraQuaternion(n);
                    return true;
                }
                return false;
            };
            o.prototype.moveCameraTranslation = function(t, e) {
                e = -e;
                this.cameraTranslation[0] += t * 50;
                this.cameraTranslation[1] += e * 50;
            };
            o.prototype.resetCameraMove = function() {
                this.cameraDistance = 0;
                this.cameraTranslation[0] = 0;
                this.cameraTranslation[1] = 0;
                this.cameraTranslation[2] = 0;
                this.cameraQuaternion[0] = 0;
                this.cameraQuaternion[1] = 0;
                this.cameraQuaternion[2] = 0;
                this.cameraQuaternion[3] = 1;
            };
            o.prototype.moveCameraForward = function(t) {
                if (t > 0) this.cameraDistance -= 25;
                if (t < 0) this.cameraDistance += 25;
                if (this.cameraDistance <= -100) this.cameraDistance = -99;
            };
            o.prototype._getCalculatedCameraParams = function(t, e, i) {
                this.vec3.set(this.eye, t);
                this.vec3.set(this.center, e);
                this.vec3.set(this.up, i);
                this.quat4.multiplyVec3(this.cameraQuaternion, t, t);
                this.quat4.multiplyVec3(this.cameraQuaternion, i, i);
                var r = [ 0, 0, 0 ];
                this.vec3.set(this.cameraTranslation, r);
                this.quat4.multiplyVec3(this.cameraQuaternion, r, r);
                this.vec3.add(t, r, t);
                this.vec3.add(e, r, e);
                var o = [ 0, 0, 0 ];
                this.vec3.subtract(t, e, o);
                t[0] += o[0] * this.cameraDistance * .01;
                t[1] += o[1] * this.cameraDistance * .01;
                t[2] += o[2] * this.cameraDistance * .01;
            };
            o.prototype._calculateDframe = function() {
                var t = Date.now();
                if (this.runType == this._RUN_FRAME_ORIENTED) {
                    this.dframe = 1;
                    this.elapsedTime += this._FRAME_MS;
                } else if (this.runType == this._RUN_REALTIME_ORIENTED || !this.dancing || this.audio === null) {
                    if (this.oldDate) {
                        var e = this.elapsedTime;
                        var i = this.elapsedTime / this._FRAME_MS | 0;
                        this.elapsedTime += t - this.oldDate;
                        var r = this.elapsedTime / this._FRAME_MS | 0;
                        var o = r - i;
                        if (o <= 0) {
                            t = this.oldDate;
                            o = 0;
                            this.elapsedTime = e;
                        }
                        this.dframe = o;
                    } else {
                        this.dframe = 0;
                    }
                } else {
                    if (this.audioStart) {
                        t = this.audio.audio.currentTime * 1e3 + this.startDate + this.audio.offset * this._FRAME_MS;
                    }
                    if (this.oldDate) {
                        var e = this.elapsedTime;
                        var i = this.elapsedTime / this._FRAME_MS | 0;
                        this.elapsedTime += t - this.oldDate;
                        var r = this.elapsedTime / this._FRAME_MS | 0;
                        var o = r - i;
                        if (o <= 0) {
                            t = this.oldDate;
                            o = 0;
                            this.elapsedTime = e;
                        }
                        this.dframe = o;
                    } else {
                        this.dframe = 0;
                    }
                }
                this.oldDate = t;
            };
            o.prototype._controlAudio = function() {
                if (!this.audio || this.audioStart || this.audioType == this._AUDIO_OFF) return;
                if (!this.audio.offset || this.frame >= this.audio.offset) {
                    this.audio.audio.play();
                    if (this.audio.offset < 0) {
                        this.audio.audio.currentTime = -this.audio.offset * this._FRAME_S;
                    }
                    this.audioStart = true;
                }
            };
            o.prototype.update = function() {
                this._controlAudio();
                this._calculateDframe();
                if (this.dframe == 0) return;
                if (this.dancing) {
                    this._loadFromVMD(this.dframe);
                }
                for (var t = 0; t < this.modelViews.length; t++) {
                    this.modelViews[t].update(this.dframe);
                }
            };
            o.prototype.draw = function() {
                if (this.dframe == 0) return;
                var t = this.layer;
                var e = t.gl;
                var i = t.shader;
                var r = this.effectFlag & this._EFFECT_BLUR ? t.postEffects["blur"] : this.effectFlag & this._EFFECT_GAUSSIAN ? t.postEffects["gaussian"] : this.effectFlag & this._EFFECT_DIFFUSION ? t.postEffects["diffusion"] : this.effectFlag & this._EFFECT_DIVISION ? t.postEffects["division"] : this.effectFlag & this._EFFECT_LOW_RESO ? t.postEffects["low_reso"] : this.effectFlag & this._EFFECT_FACE_MOSAIC ? t.postEffects["face_mosaic"] : null;
                if (this.shadowMappingType != this._SHADOW_MAPPING_OFF) {
                    if (this.shadowMappingType == this._SHADOW_MAPPING_ONLY) {
                        e.bindFramebuffer(e.FRAMEBUFFER, null);
                        t.viewport();
                        t.perspective(t.viewAngle);
                    } else {
                        e.bindFramebuffer(e.FRAMEBUFFER, t.shadowFrameBuffer.f);
                        e.viewport(0, 0, t.shadowFrameBufferSize, t.shadowFrameBufferSize);
                        this.mat4.perspective(t.viewAngle, 1, t.viewNear, t.viewFar, t.pMatrix);
                    }
                    t.identity();
                    t.lookAt(t.lightPosition, t.lightCenter, t.lightUpDirection);
                    t.registerLightMatrix();
                    e.uniform1i(i.shadowGenerationUniform, 1);
                    e.uniform1i(i.shadowTextureUniform, 0);
                    e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT);
                    for (var o = 0; o < this.modelViews.length; o++) {
                        this.modelViews[o].drawShadowMap();
                    }
                    e.flush();
                    e.bindFramebuffer(e.FRAMEBUFFER, null);
                    e.uniform1i(i.shadowMappingUniform, 1);
                    e.activeTexture(e.TEXTURE4);
                    e.bindTexture(e.TEXTURE_2D, this.layer.shadowFrameBuffer.t);
                    e.uniform1i(i.shadowTextureUniform, 4);
                    e.uniformMatrix4fv(i.lightMatrixUniform, false, t.lightMatrix);
                    if (this.shadowMappingType == this._SHADOW_MAPPING_ONLY) return;
                } else {
                    e.uniform1i(i.shadowMappingUniform, 0);
                }
                this._setCamera();
                this._setDrawParameters();
                e.uniform1i(i.shadowGenerationUniform, 0);
                var n = r === null ? null : r.shader;
                if (this.effectFlag != this._EFFECT_OFF) {
                    r.bindFrameBufferForScene();
                } else {
                    e.bindFramebuffer(e.FRAMEBUFFER, null);
                }
                e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT);
                for (var o = 0; o < this.modelViews.length; o++) {
                    this.modelViews[o].draw();
                    if (this.edgeType == this._EDGE_ON) {
                        this.modelViews[o].drawEdge();
                    }
                }
                if (this.stageType != this._STAGE_OFF) {
                    this._drawStage();
                    if (this.effectFlag == this._EFFECT_OFF) e.useProgram(i);
                }
                e.flush();
                if (this.effectFlag != this._EFFECT_OFF) {
                    e.useProgram(n);
                    n.frame = this.frame;
                    r.draw(this);
                    e.useProgram(i);
                }
            };
            o.prototype._setCamera = function() {
                var t = this.layer;
                var e = t.gl;
                var i = t.shader;
                t.viewport();
                var r = 60;
                if (this.dancing && this.vmd.getCamera().available) {
                    r = this.vmd.getCamera().angle;
                    this.vmd.getCalculatedCameraParams(this.eye, this.center, this.up);
                }
                t.perspective(r);
                t.identity();
                var o = [ 0, 0, 0 ];
                var n = [ 0, 0, 0 ];
                var s = [ 0, 0, 0 ];
                this._getCalculatedCameraParams(o, n, s);
                t.lookAt(o, n, s);
            };
            o.prototype._setDrawParameters = function() {
                var t = this.layer;
                var e = t.gl;
                var i = t.shader;
                e.uniform1i(i.uSkinningTypeUniform, this.skinningType);
                e.uniform1i(i.uLightingTypeUniform, this.lightingType);
                e.uniform3fv(i.lightColorUniform, this.lightColor);
                e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT);
            };
            o.prototype._drawStage = function() {
                var t = this.layer;
                var e = this.layer.gl;
                var i = this.layer.stageShaders[this.stageType - 1];
                var r = i.shader;
                var o = [];
                var n = [];
                var s = [];
                for (var a = 0; a < this.modelViews.length; a++) {
                    var h = this.modelViews[a];
                    o.push(h.skinningOneBone(h.pmd.centerBone));
                    n.push(h.skinningOneBone(h.pmd.leftFootBone));
                    s.push(h.skinningOneBone(h.pmd.rightFootBone));
                }
                o = [].concat.apply([], o);
                n = [].concat.apply([], n);
                s = [].concat.apply([], s);
                var u = false;
                if (this.shadowMappingType == this._SHADOW_MAPPING_ON) {
                    u = true;
                }
                i.draw(this.frame, this.modelViews.length, o, n, s, u, t.lightMatrix);
            };
            o.prototype._loadFromVMD = function(t) {
                this.vmd.loadCamera();
                this.vmd.loadLight();
                this.vmd.step(t);
                this.frame += t;
            };
            o.prototype._moveLight = function() {
                var t = this.vmd.getLight();
                if (!t.available) return;
                this.layer.gl.uniform3fv(this.layer.shader.lightColorUniform, t.color);
                this.layer.lightPosition = t.location;
            };
            t.exports = o;
        },
        59: function(t, e, i) {
            "use strict";
            var r = i(8);
            var o = h(r);
            var n = i(23);
            var s = i(24);
            var a = h(s);
            function h(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function u(t) {
                this.parent = a.default;
                this.parent.call(this, t);
            }
            (0, o.default)(u, a.default);
            u.prototype._HEADER_STRUCTURE = {
                magic: {
                    type: "char",
                    isArray: true,
                    size: 30
                },
                modelName: {
                    type: "char",
                    isArray: true,
                    size: 20
                }
            };
            u.prototype._MOTIONS_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                motions: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._MOTION_STRUCTURE = {
                boneName: {
                    type: "strings",
                    isArray: true,
                    size: 15
                },
                frameNum: {
                    type: "uint32"
                },
                location: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                rotation: {
                    type: "float",
                    isArray: true,
                    size: 4
                },
                interpolation: {
                    type: "uint8",
                    isArray: true,
                    size: 64
                }
            };
            u.prototype._FACES_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                faces: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._FACE_STRUCTURE = {
                name: {
                    type: "strings",
                    isArray: true,
                    size: 15
                },
                frameNum: {
                    type: "uint32"
                },
                weight: {
                    type: "float"
                }
            };
            u.prototype._CAMERAS_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                cameras: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._CAMERA_STRUCTURE = {
                frameNum: {
                    type: "uint32"
                },
                length: {
                    type: "float"
                },
                location: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                rotation: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                interpolation: {
                    type: "uint8",
                    isArray: true,
                    size: 24
                },
                angle: {
                    type: "uint32"
                },
                perspective: {
                    type: "uint8"
                }
            };
            u.prototype._LIGHTS_STRUCTURE = {
                count: {
                    type: "uint32"
                },
                lights: {
                    type: "object",
                    isArray: true,
                    size: "count"
                }
            };
            u.prototype._LIGHT_STRUCTURE = {
                frameNum: {
                    type: "uint32"
                },
                color: {
                    type: "float",
                    isArray: true,
                    size: 3
                },
                location: {
                    type: "float",
                    isArray: true,
                    size: 3
                }
            };
            u.prototype.parse = function() {
                this.offset = 0;
                var t = new n.VMD();
                this._parseHeader(t);
                this._parseMotions(t);
                this._parseFaces(t);
                this._parseCameras(t);
                this._parseLights(t);
                return t;
            };
            u.prototype.valid = function() {
                var t = this.offset;
                this.offset = 0;
                var e = new n.VMD();
                this._parseHeader(e);
                this.offset = t;
                return e.valid();
            };
            u.prototype._parseHeader = function(t) {
                var e = this._HEADER_STRUCTURE;
                t.header = new n.VMDHeader();
                this._parseObject(t.header, e);
            };
            u.prototype._parseMotions = function(t) {
                var e = this._MOTIONS_STRUCTURE;
                t.motionCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.motions.length = 0;
                for (var i = 0; i < t.motionCount; i++) {
                    this._parseMotion(t, i);
                }
            };
            u.prototype._parseMotion = function(t, e) {
                var i = this._MOTION_STRUCTURE;
                var r = new n.VMDMotion(e);
                this._parseObject(r, i);
                t.motions[e] = r;
            };
            u.prototype._parseFaces = function(t) {
                var e = this._FACES_STRUCTURE;
                t.faceCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.faces.length = 0;
                for (var i = 0; i < t.faceCount; i++) {
                    this._parseFace(t, i);
                }
            };
            u.prototype._parseFace = function(t, e) {
                var i = this._FACE_STRUCTURE;
                var r = new n.VMDFace(e);
                this._parseObject(r, i);
                t.faces[e] = r;
            };
            u.prototype._parseCameras = function(t) {
                var e = this._CAMERAS_STRUCTURE;
                t.cameraCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.cameras.length = 0;
                for (var i = 0; i < t.cameraCount; i++) {
                    this._parseCamera(t, i);
                }
            };
            u.prototype._parseCamera = function(t, e) {
                var i = this._CAMERA_STRUCTURE;
                var r = new n.VMDCamera(e);
                this._parseObject(r, i);
                t.cameras[e] = r;
            };
            u.prototype._parseLights = function(t) {
                var e = this._LIGHTS_STRUCTURE;
                t.lightCount = this._getValue(e.count, this.offset);
                this.offset += this._sizeof(e.count);
                t.lights.length = 0;
                for (var i = 0; i < t.lightCount; i++) {
                    this._parseLight(t, i);
                }
            };
            u.prototype._parseLight = function(t, e) {
                var i = this._LIGHT_STRUCTURE;
                var r = new n.VMDLight(e);
                this._parseObject(r, i);
                t.lights[e] = r;
            };
            t.exports = u;
        },
        60: function(t, e) {
            "use strict";
            var i = function t(e, i) {
                return [ e[1] * i[2] - e[2] * i[1], e[2] * i[0] - e[0] * i[2], e[0] * i[1] - e[1] * i[0] ];
            };
            var r = function t(e, r) {
                var a = o(e, s(i(n(i(e, [ r[0], r[1], r[2] ]), s(e, r[3])), [ r[0], r[1], r[2] ]), 2));
                return a;
            };
            var o = function t(e, i) {
                return [ e[0] + i[0], e[1] + i[1], e[2] + i[2] ];
            };
            var n = function t(e, i) {
                return [ e[0] - i[0], e[1] - i[1], e[2] - i[2] ];
            };
            var s = function t(e, i) {
                if (i.length) {
                    return [ e[0] * i[0], e[1] * i[1], e[2] * i[2] ];
                }
                return [ e[0] * i, e[1] * i, e[2] * i ];
            };
            var a = function t(e, i, r) {
                return o(s(e, n([ 1, 1, 1 ], [ r, r, r ])), s(i, [ r, r, r ]));
            };
            t.exports = {
                cross: i,
                qtransform: r,
                arrayAdd: o,
                arrayMns: n,
                arrayMuti: s,
                mix: a
            };
        },
        61: function(t, e) {
            "use strict";
            function i(t, e, i) {
                var r = "";
                var o = "";
                var n = "";
                if (t == 8) o = "0"; else if (t == 16) o = "0x";
                for (var s = 0; s < i; s++) {
                    r += "0";
                }
                return o + (r + e.toString(t)).substr(-1 * i);
            }
            t.exports = i;
        },
        91: function(t, e, i) {
            "use strict";
            var r = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var r in i) {
                        if (Object.prototype.hasOwnProperty.call(i, r)) {
                            t[r] = i[r];
                        }
                    }
                }
                return t;
            };
            var o = i(22);
            var n = y(o);
            var s = i(56);
            var a = y(s);
            var h = i(57);
            var u = y(h);
            var p = i(58);
            var f = y(p);
            var l = i(23);
            var c = y(l);
            var m = i(59);
            var _ = y(m);
            var v = i(21);
            var d = y(v);
            function y(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            var g = function t(e) {
                console.error("[Easycanvas-webgl] " + e);
            };
            var T = {};
            var A = "processing";
            var E = function t(e, i, r) {
                var o = new a.default(i);
                if (!o.valid()) {
                    g("PMD Parse Error.");
                    return;
                }
                var n = o.parse();
                n.setup();
                var s = n.vertices.map(function(t) {
                    return t.position;
                }).join(",").split(",").map(function(t) {
                    return Number(t);
                });
                var h = n.vertices.map(function(t) {
                    return t.normal;
                }).join(",").split(",");
                var u = n.vertices.map(function(t) {
                    return t.uv;
                }).join(",").split(",");
                var p = n.vertexIndices.map(function(t) {
                    return t.index;
                });
                var f = {
                    vertices: s,
                    normals: h,
                    textures: u,
                    indices: p
                };
                n.$vertices = s;
                T[e] = {
                    data: f,
                    pmd: n
                };
                r(f, n);
            };
            var I = function t(e, i) {
                var r = [];
                var o = [];
                for (var n = 0; n < e.length; n++) {
                    o[n] = new _.default(e[n]);
                    if (!o[n].valid()) {
                        g("VMD Parse Error.");
                        return;
                    }
                    r[n] = o[n].parse();
                }
                var s = r[0];
                var a = o[0];
                for (var n = 1; n < e.length; n++) {
                    s.merge(r[n]);
                }
                i({
                    start: function t(e, i) {
                        var r = new d.default(e);
                        var o = new f.default();
                        var n = new u.default(null, e, o);
                        n.setup();
                        n._initMotions();
                        o.setup();
                        o.addModelView(n);
                        o.setVMD(s);
                        o.startDance();
                        var a = n.getVerticals;
                        setInterval(function() {
                            o.update();
                            for (var t = 0, e = i.length / 3; t < e; t++) {
                                var r = a(t);
                                i[t * 3 + 0] = r[0];
                                i[t * 3 + 1] = r[1];
                                i[t * 3 + 2] = r[2];
                            }
                            i.$cacheBuffer = undefined;
                        }, 50);
                    }
                });
            };
            var C = function t(e, i) {
                var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
                if (r) {
                    if (T[e]) {
                        if (T[e] === A) {
                            setTimeout(function() {
                                t(e, i);
                            }, 100);
                        } else {
                            i(T[e].data, T[e].pmd);
                        }
                        return;
                    }
                    T[e] = A;
                }
                var o = e;
                var n = new XMLHttpRequest();
                n.responseType = "arraybuffer";
                n.onload = function() {
                    E(e, n.response, i);
                };
                n.onerror = function(t) {
                    g("PMD File Loaded Error.");
                };
                n.open("GET", o, true);
                n.send(null);
            };
            var M = function t(e, i, r, o) {
                r = r || 0;
                o = o || [];
                var n = e.pop ? e.length[r] : e;
                var s = new XMLHttpRequest();
                s.responseType = "arraybuffer";
                s.onload = function() {
                    o.push(s.response);
                    I(o, i);
                };
                s.onerror = function(t) {
                    g("VMD File Loaded Error.");
                };
                s.open("GET", n, true);
                s.send(null);
            };
            var x = function t(e) {
                if (!e.webgl || !e.webgl.pmd) {
                    return;
                }
                var i = e.webgl.pmd;
                var o = e.webgl.imgPath;
                var n = e.webgl.cache !== false;
                var s = this;
                var a = void 0;
                C(i, function(t, n) {
                    s.webgl = {};
                    var h = t.vertices;
                    var u = t.normals;
                    var p = t.textures;
                    var f = t.indices;
                    delete e.webgl.pmd;
                    delete e.webgl.imgPath;
                    delete e.webgl.cache;
                    var l = 0;
                    n.materials.forEach(function(t, n) {
                        var a = T[i]["currentIndices" + n] || f.slice(l, l + t.vertexCount);
                        T[i]["currentIndices" + n] = a;
                        s.add({
                            name: t.fileName,
                            webgl: r(window.Easycanvas.webglShapes.custom({
                                vertices: h,
                                normals: u,
                                indices: a,
                                textures: p,
                                img: t.fileName ? o + t.fileName : undefined,
                                colors: t.fileName ? undefined : t.color.map(function(t) {
                                    return t * 255;
                                }).slice(0, 3)
                            }), e.webgl)
                        });
                        l += t.vertexCount;
                    });
                    s.vmdStart = function(t) {
                        M(t, function(t) {
                            s.trigger("webgl-vmd-loaded");
                            t.start(n, s.children[0].webgl.vertices);
                        });
                    };
                    if (a) {
                        s.vmdStart(a);
                    }
                    s.trigger("webgl-pmd-loaded");
                }, n);
                s.vmdStart = function(t) {
                    a = t;
                };
            };
            var b = typeof window !== "undefined";
            if (b && window.Easycanvas) {
                Easycanvas.loaderPMD = C;
                Easycanvas.loaderVMD = M;
                Easycanvas.extend(x);
            } else {
                t.exports = {
                    loaderPMD: C,
                    loaderVMD: M,
                    classInit: x
                };
            }
        }
    });
});

