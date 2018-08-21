(function t(i, e) {
    if (typeof exports === "object" && typeof module === "object") module.exports = e(); else if (typeof define === "function" && define.amd) define([], e); else {
        var r = e();
        for (var s in r) (typeof exports === "object" ? exports : i)[s] = r[s];
    }
})(this, function() {
    return function(t) {
        var i = {};
        function e(r) {
            if (i[r]) return i[r].exports;
            var s = i[r] = {
                exports: {},
                id: r,
                loaded: false
            };
            t[r].call(s.exports, s, s.exports, e);
            s.loaded = true;
            return s.exports;
        }
        e.m = t;
        e.c = i;
        e.p = "";
        return e(0);
    }({
        0: function(t, i, e) {
            t.exports = e(83);
        },
        1: function(t, i) {
            "use strict";
            var e = {
                isArray: Array.isArray || function(t) {
                    return Object.prototype.toString.call(t) === "[object Array]";
                },
                funcOrValue: function t(i, e) {
                    if (typeof i === "function") {
                        var r = i.call(e);
                        return r;
                    }
                    return i;
                },
                execFuncs: function t(i, r, s) {
                    if (i) {
                        if (!e.isArray(s)) {
                            s = [ s ];
                        }
                    }
                    if (typeof i === "function") {
                        return i.apply(r, s);
                    } else if (e.isArray(i)) {
                        var n = [];
                        i.forEach(function(t) {
                            n.push(t && t.apply(r, s));
                        });
                        return n;
                    }
                },
                blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
                pointInRect: function t(i, e, r, s, n, a) {
                    return !(i < r || i > s || e < n || e > a);
                },
                firstValuable: function t(i, e, r) {
                    return typeof i === "undefined" ? typeof e === "undefined" ? r : e : i;
                }
            };
            t.exports = e;
        },
        2: function(t, i) {
            "use strict";
            var e = 3.141593;
            t.exports = function(t, i, r, s, n, a) {
                var o = n ? -n / 180 * e : 0;
                var h = t, c = i;
                if (n) {
                    h = (t - r) * Math.cos(o) - (i - s) * Math.sin(o) + r;
                    c = (t - r) * Math.sin(o) + (i - s) * Math.cos(o) + s;
                }
                if (a) {
                    return [ h, c ];
                }
                return {
                    x: h,
                    y: c
                };
            };
        },
        30: function(t, i, e) {
            "use strict";
            var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
                return typeof t;
            } : function(t) {
                return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            };
            (function() {
                Object.create = Object.create || function(t) {
                    function i() {}
                    i.prototype = t;
                    return new i();
                };
                var t;
                if (false) {
                    t = {};
                    if ((typeof window === "undefined" ? "undefined" : r(window)) === "object") {
                        window.cp = t;
                    }
                } else {
                    t = i;
                }
                var e = function t(i, e) {
                    return;
                    if (!i) {
                        throw new Error("Assertion failed: " + e);
                    }
                };
                var s = function t(i, e) {
                    return;
                    if (!i && console && console.warn) {
                        console.warn("ASSERTION FAILED: " + e);
                        if (console.trace) {
                            console.trace();
                        }
                    }
                };
                var n = function t(i, e) {
                    return i < e ? i : e;
                };
                var a = function t(i, e) {
                    return i > e ? i : e;
                };
                var o, h;
                if ((typeof window === "undefined" ? "undefined" : r(window)) === "object" && window.navigator.userAgent.indexOf("Firefox") > -1) {
                    o = Math.min;
                    h = Math.max;
                } else {
                    o = n;
                    h = a;
                }
                var c = function t(i, e) {
                    return i < e ? i + " " + e : e + " " + i;
                };
                var p = function t(i, e) {
                    for (var r = 0; r < i.length; r++) {
                        if (i[r] === e) {
                            i[r] = i[i.length - 1];
                            i.length--;
                            return;
                        }
                    }
                };
                var v = function t(i, e, r) {
                    var s = M(e, r);
                    var n = _(S(s, M(i, r)) / Q(s));
                    return C(r, P(s, n));
                };
                var u = function t(i, e, r, s, n, a) {
                    var o = r - n;
                    var h = s - a;
                    var c = _(A(o, h, i - n, e - a) / O(o, h));
                    return new m(n + o * c, a + h * c);
                };
                t.momentForCircle = function(t, i, e, r) {
                    return t * (.5 * (i * i + e * e) + Q(r));
                };
                t.areaForCircle = function(t, i) {
                    return Math.PI * Math.abs(t * t - i * i);
                };
                t.momentForSegment = function(t, i, e) {
                    var r = P(C(i, e), .5);
                    return t * (W(e, i) / 12 + Q(r));
                };
                t.areaForSegment = function(t, i, e) {
                    return e * (Math.PI * e + 2 * G(t, i));
                };
                t.momentForPoly = function(t, i, e) {
                    var r = 0;
                    var s = 0;
                    var n = i.length;
                    for (var a = 0; a < n; a += 2) {
                        var o = i[a] + e.x;
                        var h = i[a + 1] + e.y;
                        var c = i[(a + 2) % n] + e.x;
                        var p = i[(a + 3) % n] + e.y;
                        var v = $(c, p, o, h);
                        var u = A(o, h, o, h) + A(o, h, c, p) + A(c, p, c, p);
                        r += v * u;
                        s += v;
                    }
                    return t * r / (6 * s);
                };
                t.areaForPoly = function(t) {
                    var i = 0;
                    for (var e = 0, r = t.length; e < r; e += 2) {
                        i += L(new m(t[e], t[e + 1]), new m(t[(e + 2) % r], t[(e + 3) % r]));
                    }
                    return -i / 2;
                };
                t.centroidForPoly = function(t) {
                    var i = 0;
                    var e = new m(0, 0);
                    for (var r = 0, s = t.length; r < s; r += 2) {
                        var n = new m(t[r], t[r + 1]);
                        var a = new m(t[(r + 2) % s], t[(r + 3) % s]);
                        var o = L(n, a);
                        i += o;
                        e = C(e, P(C(n, a), o));
                    }
                    return P(e, 1 / (3 * i));
                };
                t.recenterPoly = function(i) {
                    var e = t.centroidForPoly(i);
                    for (var r = 0; r < i.length; r += 2) {
                        i[r] -= e.x;
                        i[r + 1] -= e.y;
                    }
                };
                t.momentForBox = function(t, i, e) {
                    return t * (i * i + e * e) / 12;
                };
                t.momentForBox2 = function(i, e) {
                    var r = e.r - e.l;
                    var s = e.t - e.b;
                    var n = P([ e.l + e.r, e.b + e.t ], .5);
                    return t.momentForBox(i, r, s) + i * Q(n);
                };
                var l = t.loopIndexes = function(t) {
                    var i = 0, e = 0;
                    var r, s, n, a;
                    r = n = t[0];
                    s = a = t[1];
                    var o = t.length >> 1;
                    for (var h = 1; h < o; h++) {
                        var c = t[h * 2];
                        var p = t[h * 2 + 1];
                        if (c < r || c == r && p < s) {
                            r = c;
                            s = p;
                            i = h;
                        } else if (c > n || c == n && p > a) {
                            n = c;
                            a = p;
                            e = h;
                        }
                    }
                    return [ i, e ];
                };
                var y = function t(i, e, r) {
                    var s = i[e * 2];
                    i[e * 2] = i[r * 2];
                    i[r * 2] = s;
                    s = i[e * 2 + 1];
                    i[e * 2 + 1] = i[r * 2 + 1];
                    i[r * 2 + 1] = s;
                };
                var f = function t(i, e, r, s, n, a) {
                    if (r === 0) return 0;
                    var o = 0;
                    var h = e;
                    var c = M(n, s);
                    var p = a * j(c);
                    var v = e;
                    for (var u = e + r - 1; v <= u; ) {
                        var l = new m(i[v * 2], i[v * 2 + 1]);
                        var f = L(c, M(l, s));
                        if (f > p) {
                            if (f > o) {
                                o = f;
                                h = v;
                            }
                            v++;
                        } else {
                            y(i, v, u);
                            u--;
                        }
                    }
                    if (h != e) y(i, e, h);
                    return v - e;
                };
                var b = function t(i, e, r, s, n, a, o, h) {
                    if (s < 0) {
                        return 0;
                    } else if (s == 0) {
                        e[h * 2] = a.x;
                        e[h * 2 + 1] = a.y;
                        return 1;
                    } else {
                        var c = f(e, r, s, n, a, i);
                        var p = new m(e[r * 2], e[r * 2 + 1]);
                        var v = t(i, e, r + 1, c - 1, n, p, a, h);
                        var u = h + v++;
                        e[u * 2] = a.x;
                        e[u * 2 + 1] = a.y;
                        var l = f(e, r + c, s - c, a, o, i);
                        var y = new m(e[(r + c) * 2], e[(r + c) * 2 + 1]);
                        return v + t(i, e, r + c + 1, l - 1, a, y, o, h + v);
                    }
                };
                t.convexHull = function(t, i, e) {
                    if (i) {
                        for (var r = 0; r < t.length; r++) {
                            i[r] = t[r];
                        }
                    } else {
                        i = t;
                    }
                    var n = l(t);
                    var a = n[0], o = n[1];
                    if (a == o) {
                        i.length = 2;
                        return i;
                    }
                    y(i, 0, a);
                    y(i, 1, o == 0 ? a : o);
                    var h = new m(i[0], i[1]);
                    var c = new m(i[2], i[3]);
                    var p = t.length >> 1;
                    var v = b(e, i, 2, p - 2, h, c, h, 1) + 1;
                    i.length = v * 2;
                    s(Bt(i), "Internal error: cpConvexHull() and cpPolyValidate() did not agree." + "Please report this error with as much info as you can.");
                    return i;
                };
                var d = function t(i, e, r) {
                    return o(h(i, e), r);
                };
                var _ = function t(i) {
                    return h(0, o(i, 1));
                };
                var x = function t(i, e, r) {
                    return i * (1 - r) + e * r;
                };
                var g = function t(i, e, r) {
                    return i + d(e - i, -r, r);
                };
                var m = t.Vect = function(t, i) {
                    this.x = t;
                    this.y = i;
                };
                t.v = function(t, i) {
                    return new m(t, i);
                };
                var w = t.vzero = new m(0, 0);
                var S = t.v.dot = function(t, i) {
                    return t.x * i.x + t.y * i.y;
                };
                var A = function t(i, e, r, s) {
                    return i * r + e * s;
                };
                var j = t.v.len = function(t) {
                    return Math.sqrt(S(t, t));
                };
                var B = t.v.len2 = function(t, i) {
                    return Math.sqrt(t * t + i * i);
                };
                var I = t.v.eql = function(t, i) {
                    return t.x === i.x && t.y === i.y;
                };
                var C = t.v.add = function(t, i) {
                    return new m(t.x + i.x, t.y + i.y);
                };
                m.prototype.add = function(t) {
                    this.x += t.x;
                    this.y += t.y;
                    return this;
                };
                var M = t.v.sub = function(t, i) {
                    return new m(t.x - i.x, t.y - i.y);
                };
                m.prototype.sub = function(t) {
                    this.x -= t.x;
                    this.y -= t.y;
                    return this;
                };
                var k = t.v.neg = function(t) {
                    return new m(-t.x, -t.y);
                };
                m.prototype.neg = function() {
                    this.x = -this.x;
                    this.y = -this.y;
                    return this;
                };
                var P = t.v.mult = function(t, i) {
                    return new m(t.x * i, t.y * i);
                };
                m.prototype.mult = function(t) {
                    this.x *= t;
                    this.y *= t;
                    return this;
                };
                var L = t.v.cross = function(t, i) {
                    return t.x * i.y - t.y * i.x;
                };
                var $ = function t(i, e, r, s) {
                    return i * s - e * r;
                };
                var R = t.v.perp = function(t) {
                    return new m(-t.y, t.x);
                };
                var F = t.v.pvrperp = function(t) {
                    return new m(t.y, -t.x);
                };
                var V = t.v.project = function(t, i) {
                    return P(i, S(t, i) / Q(i));
                };
                m.prototype.project = function(t) {
                    this.mult(S(this, t) / Q(t));
                    return this;
                };
                var N = t.v.rotate = function(t, i) {
                    return new m(t.x * i.x - t.y * i.y, t.x * i.y + t.y * i.x);
                };
                m.prototype.rotate = function(t) {
                    this.x = this.x * t.x - this.y * t.y;
                    this.y = this.x * t.y + this.y * t.x;
                    return this;
                };
                var T = t.v.unrotate = function(t, i) {
                    return new m(t.x * i.x + t.y * i.y, t.y * i.x - t.x * i.y);
                };
                var Q = t.v.lengthsq = function(t) {
                    return S(t, t);
                };
                var O = t.v.lengthsq2 = function(t, i) {
                    return t * t + i * i;
                };
                var q = t.v.lerp = function(t, i, e) {
                    return C(P(t, 1 - e), P(i, e));
                };
                var E = t.v.normalize = function(t) {
                    return P(t, 1 / j(t));
                };
                var H = t.v.normalize_safe = function(t) {
                    return t.x === 0 && t.y === 0 ? w : E(t);
                };
                var D = t.v.clamp = function(t, i) {
                    return S(t, t) > i * i ? P(E(t), i) : t;
                };
                var z = t.v.lerpconst = function(t, i, e) {
                    return C(t, D(M(i, t), e));
                };
                var G = t.v.dist = function(t, i) {
                    return j(M(t, i));
                };
                var W = t.v.distsq = function(t, i) {
                    return Q(M(t, i));
                };
                var J = t.v.near = function(t, i, e) {
                    return W(t, i) < e * e;
                };
                var Y = t.v.slerp = function(t, i, e) {
                    var r = Math.acos(S(t, i));
                    if (r) {
                        var s = 1 / Math.sin(r);
                        return C(P(t, Math.sin((1 - e) * r) * s), P(i, Math.sin(e * r) * s));
                    } else {
                        return t;
                    }
                };
                var U = t.v.slerpconst = function(t, i, e) {
                    var r = Math.acos(S(t, i));
                    return Y(t, i, o(e, r) / r);
                };
                var K = t.v.forangle = function(t) {
                    return new m(Math.cos(t), Math.sin(t));
                };
                var X = t.v.toangle = function(t) {
                    return Math.atan2(t.y, t.x);
                };
                var Z = t.v.str = function(t) {
                    return "(" + t.x.toFixed(3) + ", " + t.y.toFixed(3) + ")";
                };
                var tt = 0;
                var it = t.BB = function(t, i, e, r) {
                    this.l = t;
                    this.b = i;
                    this.r = e;
                    this.t = r;
                    tt++;
                };
                t.bb = function(t, i, e, r) {
                    return new it(t, i, e, r);
                };
                var et = function t(i, e) {
                    return new it(i.x - e, i.y - e, i.x + e, i.y + e);
                };
                var rt = function t(i, e) {
                    return i.l <= e.r && e.l <= i.r && i.b <= e.t && e.b <= i.t;
                };
                var st = function t(i, e, r, s, n) {
                    return i.l <= s && e <= i.r && i.b <= n && r <= i.t;
                };
                var nt = function t(i, e) {
                    return i.l <= e.l && i.r >= e.r && i.b <= e.b && i.t >= e.t;
                };
                var at = function t(i, e) {
                    return i.l <= e.x && i.r >= e.x && i.b <= e.y && i.t >= e.y;
                };
                var ot = function t(i, e, r, s, n) {
                    return i <= n.x && r >= n.x && e <= n.y && s >= n.y;
                };
                var ht = function t(i, e) {
                    return new it(o(i.l, e.l), o(i.b, e.b), h(i.r, e.r), h(i.t, e.t));
                };
                var ct = function t(i, e) {
                    return new it(o(i.l, e.x), o(i.b, e.y), h(i.r, e.x), h(i.t, e.y));
                };
                var pt = function t(i) {
                    return (i.r - i.l) * (i.t - i.b);
                };
                var vt = function t(i, e) {
                    return (h(i.r, e.r) - o(i.l, e.l)) * (h(i.t, e.t) - o(i.b, e.b));
                };
                var ut = function t(i, e, r, s, n) {
                    return (h(i.r, s) - o(i.l, e)) * (h(i.t, n) - o(i.b, r));
                };
                var lt = function t(i, e, r) {
                    return bbSegmentQuery(i, e, r) != Infinity;
                };
                var yt = function t(i, e) {
                    var r = o(h(i.l, e.x), i.r);
                    var s = o(h(i.b, e.y), i.t);
                    return new m(r, s);
                };
                var ft = function t(i, e) {
                    var r = Math.abs(i.r - i.l);
                    var s = (e.x - i.l) % r;
                    var n = s > 0 ? s : s + r;
                    var a = Math.abs(i.t - i.b);
                    var o = (e.y - i.b) % a;
                    var h = o > 0 ? o : o + a;
                    return new m(n + i.l, h + i.b);
                };
                var bt = 0;
                var dt = t.NO_GROUP = 0;
                var _t = t.ALL_LAYERS = ~0;
                t.resetShapeIdCounter = function() {
                    bt = 0;
                };
                var xt = t.Shape = function(t) {
                    this.body = t;
                    this.bb_l = this.bb_b = this.bb_r = this.bb_t = 0;
                    this.hashid = bt++;
                    this.sensor = false;
                    this.e = 0;
                    this.u = 0;
                    this.surface_v = w;
                    this.collision_type = 0;
                    this.group = 0;
                    this.layers = _t;
                    this.space = null;
                    this.collisionCode = this.collisionCode;
                };
                xt.prototype.setElasticity = function(t) {
                    this.e = t;
                };
                xt.prototype.setFriction = function(t) {
                    this.body.activate();
                    this.u = t;
                };
                xt.prototype.setLayers = function(t) {
                    this.body.activate();
                    this.layers = t;
                };
                xt.prototype.setSensor = function(t) {
                    this.body.activate();
                    this.sensor = t;
                };
                xt.prototype.setCollisionType = function(t) {
                    this.body.activate();
                    this.collision_type = t;
                };
                xt.prototype.getBody = function() {
                    return this.body;
                };
                xt.prototype.active = function() {
                    return this.body && this.body.shapeList.indexOf(this) !== -1;
                };
                xt.prototype.setBody = function(t) {
                    e(!this.active(), "You cannot change the body on an active shape. You must remove the shape from the space before changing the body.");
                    this.body = t;
                };
                xt.prototype.cacheBB = function() {
                    return this.update(this.body.p, this.body.rot);
                };
                xt.prototype.update = function(t, i) {
                    e(!isNaN(i.x), "Rotation is NaN");
                    e(!isNaN(t.x), "Position is NaN");
                    this.cacheData(t, i);
                };
                xt.prototype.pointQuery = function(t) {
                    var i = this.nearestPointQuery(t);
                    if (i.d < 0) return i;
                };
                xt.prototype.getBB = function() {
                    return new it(this.bb_l, this.bb_b, this.bb_r, this.bb_t);
                };
                var gt = function t(i) {
                    this.shape = i;
                    this.d = Infinity;
                    this.n = w;
                };
                var mt = function t(i, e, r) {
                    this.shape = i;
                    this.p = e;
                    this.d = r;
                };
                var wt = function t(i, e, r) {
                    this.shape = i;
                    this.t = e;
                    this.n = r;
                };
                wt.prototype.hitPoint = function(t, i) {
                    return q(t, i, this.t);
                };
                wt.prototype.hitDist = function(t, i) {
                    return G(t, i) * this.t;
                };
                var St = t.CircleShape = function(t, i, e) {
                    this.c = this.tc = e;
                    this.r = i;
                    this.type = "circle";
                    xt.call(this, t);
                };
                St.prototype = Object.create(xt.prototype);
                St.prototype.cacheData = function(t, i) {
                    var e = this.tc = N(this.c, i).add(t);
                    var r = this.r;
                    this.bb_l = e.x - r;
                    this.bb_b = e.y - r;
                    this.bb_r = e.x + r;
                    this.bb_t = e.y + r;
                };
                St.prototype.nearestPointQuery = function(t) {
                    var i = t.x - this.tc.x;
                    var e = t.y - this.tc.y;
                    var r = B(i, e);
                    var s = this.r;
                    var n = new m(this.tc.x + i * s / r, this.tc.y + e * s / r);
                    return new mt(this, n, r - s);
                };
                var At = function t(i, e, r, s, n, a) {
                    s = M(s, e);
                    n = M(n, e);
                    var o = S(s, s) - 2 * S(s, n) + S(n, n);
                    var h = -2 * S(s, s) + 2 * S(s, n);
                    var c = S(s, s) - r * r;
                    var p = h * h - 4 * o * c;
                    if (p >= 0) {
                        var v = (-h - Math.sqrt(p)) / (2 * o);
                        if (0 <= v && v <= 1) {
                            return new wt(i, v, E(q(s, n, v)));
                        }
                    }
                };
                St.prototype.segmentQuery = function(t, i) {
                    return At(this, this.tc, this.r, t, i);
                };
                var jt = t.SegmentShape = function(t, i, e, r) {
                    this.a = i;
                    this.b = e;
                    this.n = R(E(M(e, i)));
                    this.ta = this.tb = this.tn = null;
                    this.r = r;
                    this.a_tangent = w;
                    this.b_tangent = w;
                    this.type = "segment";
                    xt.call(this, t);
                };
                jt.prototype = Object.create(xt.prototype);
                jt.prototype.cacheData = function(t, i) {
                    this.ta = C(t, N(this.a, i));
                    this.tb = C(t, N(this.b, i));
                    this.tn = N(this.n, i);
                    var e, r, s, n;
                    if (this.ta.x < this.tb.x) {
                        e = this.ta.x;
                        r = this.tb.x;
                    } else {
                        e = this.tb.x;
                        r = this.ta.x;
                    }
                    if (this.ta.y < this.tb.y) {
                        s = this.ta.y;
                        n = this.tb.y;
                    } else {
                        s = this.tb.y;
                        n = this.ta.y;
                    }
                    var a = this.r;
                    this.bb_l = e - a;
                    this.bb_b = s - a;
                    this.bb_r = r + a;
                    this.bb_t = n + a;
                };
                jt.prototype.nearestPointQuery = function(t) {
                    var i = v(t, this.ta, this.tb);
                    var e = t.x - i.x;
                    var r = t.y - i.y;
                    var s = B(e, r);
                    var n = this.r;
                    var a = s ? C(i, P(new m(e, r), n / s)) : i;
                    return new mt(this, a, s - n);
                };
                jt.prototype.segmentQuery = function(t, i) {
                    var e = this.tn;
                    var r = S(M(this.ta, t), e);
                    var s = this.r;
                    var n = r > 0 ? k(e) : e;
                    var a = M(P(n, s), t);
                    var o = C(this.ta, a);
                    var h = C(this.tb, a);
                    var c = M(i, t);
                    if (L(c, o) * L(c, h) <= 0) {
                        var p = r + (r > 0 ? -s : s);
                        var v = -p;
                        var u = S(c, e) - p;
                        if (v * u < 0) {
                            return new wt(this, v / (v - u), n);
                        }
                    } else if (s !== 0) {
                        var l = At(this, this.ta, this.r, t, i);
                        var y = At(this, this.tb, this.r, t, i);
                        if (l) {
                            return y && y.t < l.t ? y : l;
                        } else {
                            return y;
                        }
                    }
                };
                jt.prototype.setNeighbors = function(t, i) {
                    this.a_tangent = M(t, this.a);
                    this.b_tangent = M(i, this.b);
                };
                jt.prototype.setEndpoints = function(t, i) {
                    this.a = t;
                    this.b = i;
                    this.n = R(E(M(i, t)));
                };
                var Bt = function t(i) {
                    var e = i.length;
                    for (var r = 0; r < e; r += 2) {
                        var s = i[r];
                        var n = i[r + 1];
                        var a = i[(r + 2) % e];
                        var o = i[(r + 3) % e];
                        var h = i[(r + 4) % e];
                        var c = i[(r + 5) % e];
                        if ($(a - s, o - n, h - a, c - o) > 0) {
                            return false;
                        }
                    }
                    return true;
                };
                var It = t.PolyShape = function(t, i, e) {
                    this.setVerts(i, e);
                    this.type = "poly";
                    xt.call(this, t);
                };
                It.prototype = Object.create(xt.prototype);
                var Ct = function t(i, e) {
                    this.n = i;
                    this.d = e;
                };
                Ct.prototype.compare = function(t) {
                    return S(this.n, t) - this.d;
                };
                It.prototype.setVerts = function(t, i) {
                    e(t.length >= 4, "Polygons require some verts");
                    e(typeof t[0] === "number", "Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])");
                    e(Bt(t), "Polygon is concave or has a reversed winding. Consider using cpConvexHull()");
                    var r = t.length;
                    var s = r >> 1;
                    this.verts = new Array(r);
                    this.tVerts = new Array(r);
                    this.planes = new Array(s);
                    this.tPlanes = new Array(s);
                    for (var n = 0; n < r; n += 2) {
                        var a = t[n] + i.x;
                        var o = t[n + 1] + i.y;
                        var h = t[(n + 2) % r] + i.x;
                        var c = t[(n + 3) % r] + i.y;
                        var p = E(R(new m(h - a, c - o)));
                        this.verts[n] = a;
                        this.verts[n + 1] = o;
                        this.planes[n >> 1] = new Ct(p, A(p.x, p.y, a, o));
                        this.tPlanes[n >> 1] = new Ct(new m(0, 0), 0);
                    }
                };
                var Mt = t.BoxShape = function(t, i, e) {
                    var r = i / 2;
                    var s = e / 2;
                    return kt(t, new it(-r, -s, r, s));
                };
                var kt = t.BoxShape2 = function(t, i) {
                    var e = [ i.l, i.b, i.l, i.t, i.r, i.t, i.r, i.b ];
                    return new It(t, e, w);
                };
                It.prototype.transformVerts = function(t, i) {
                    var e = this.verts;
                    var r = this.tVerts;
                    var s = Infinity, n = -Infinity;
                    var a = Infinity, c = -Infinity;
                    for (var p = 0; p < e.length; p += 2) {
                        var v = e[p];
                        var u = e[p + 1];
                        var l = t.x + v * i.x - u * i.y;
                        var y = t.y + v * i.y + u * i.x;
                        r[p] = l;
                        r[p + 1] = y;
                        s = o(s, l);
                        n = h(n, l);
                        a = o(a, y);
                        c = h(c, y);
                    }
                    this.bb_l = s;
                    this.bb_b = a;
                    this.bb_r = n;
                    this.bb_t = c;
                };
                It.prototype.transformAxes = function(t, i) {
                    var e = this.planes;
                    var r = this.tPlanes;
                    for (var s = 0; s < e.length; s++) {
                        var n = N(e[s].n, i);
                        r[s].n = n;
                        r[s].d = S(t, n) + e[s].d;
                    }
                };
                It.prototype.cacheData = function(t, i) {
                    this.transformAxes(t, i);
                    this.transformVerts(t, i);
                };
                It.prototype.nearestPointQuery = function(t) {
                    var i = this.tPlanes;
                    var e = this.tVerts;
                    var r = e[e.length - 2];
                    var s = e[e.length - 1];
                    var n = Infinity;
                    var a = w;
                    var o = false;
                    for (var h = 0; h < i.length; h++) {
                        if (i[h].compare(t) > 0) o = true;
                        var c = e[h * 2];
                        var p = e[h * 2 + 1];
                        var v = u(t.x, t.y, r, s, c, p);
                        var l = G(t, v);
                        if (l < n) {
                            n = l;
                            a = v;
                        }
                        r = c;
                        s = p;
                    }
                    return new mt(this, a, o ? n : -n);
                };
                It.prototype.segmentQuery = function(t, i) {
                    var e = this.tPlanes;
                    var r = this.tVerts;
                    var s = e.length;
                    var n = s * 2;
                    for (var a = 0; a < s; a++) {
                        var o = e[a].n;
                        var h = S(t, o);
                        if (e[a].d > h) continue;
                        var c = S(i, o);
                        var p = (e[a].d - h) / (c - h);
                        if (p < 0 || 1 < p) continue;
                        var v = q(t, i, p);
                        var u = -L(o, v);
                        var l = -$(o.x, o.y, r[a * 2], r[a * 2 + 1]);
                        var y = -$(o.x, o.y, r[(a * 2 + 2) % n], r[(a * 2 + 3) % n]);
                        if (l <= u && u <= y) {
                            return new wt(this, p, o);
                        }
                    }
                };
                It.prototype.valueOnAxis = function(t, i) {
                    var e = this.tVerts;
                    var r = A(t.x, t.y, e[0], e[1]);
                    for (var s = 2; s < e.length; s += 2) {
                        r = o(r, A(t.x, t.y, e[s], e[s + 1]));
                    }
                    return r - i;
                };
                It.prototype.containsVert = function(t, i) {
                    var e = this.tPlanes;
                    for (var r = 0; r < e.length; r++) {
                        var s = e[r].n;
                        var n = A(s.x, s.y, t, i) - e[r].d;
                        if (n > 0) return false;
                    }
                    return true;
                };
                It.prototype.containsVertPartial = function(t, i, e) {
                    var r = this.tPlanes;
                    for (var s = 0; s < r.length; s++) {
                        var n = r[s].n;
                        if (S(n, e) < 0) continue;
                        var a = A(n.x, n.y, t, i) - r[s].d;
                        if (a > 0) return false;
                    }
                    return true;
                };
                It.prototype.getNumVerts = function() {
                    return this.verts.length / 2;
                };
                It.prototype.getVert = function(t) {
                    return new m(this.verts[t * 2], this.verts[t * 2 + 1]);
                };
                var Pt = t.Body = function(t, i) {
                    this.p = new m(0, 0);
                    this.vx = this.vy = 0;
                    this.f = new m(0, 0);
                    this.w = 0;
                    this.t = 0;
                    this.v_limit = Infinity;
                    this.w_limit = Infinity;
                    this.v_biasx = this.v_biasy = 0;
                    this.w_bias = 0;
                    this.space = null;
                    this.shapeList = [];
                    this.arbiterList = null;
                    this.constraintList = null;
                    this.nodeRoot = null;
                    this.nodeNext = null;
                    this.nodeIdleTime = 0;
                    this.setMass(t);
                    this.setMoment(i);
                    this.rot = new m(0, 0);
                    this.setAngle(0);
                };
                var Lt = function t() {
                    var i = new Pt(Infinity, Infinity);
                    i.nodeIdleTime = Infinity;
                    return i;
                };
                if (false) {
                    var $t = function t(i, r) {
                        e(i.x == i.x && i.y == i.y, r);
                    };
                    var Rt = function t(i, r) {
                        e(Math.abs(i.x) !== Infinity && Math.abs(i.y) !== Infinity, r);
                    };
                    var Ft = function t(i, e) {
                        $t(i, e);
                        Rt(i, e);
                    };
                    Pt.prototype.sanityCheck = function() {
                        e(this.m === this.m && this.m_inv === this.m_inv, "Body's mass is invalid.");
                        e(this.i === this.i && this.i_inv === this.i_inv, "Body's moment is invalid.");
                        Ft(this.p, "Body's position is invalid.");
                        Ft(this.f, "Body's force is invalid.");
                        e(this.vx === this.vx && Math.abs(this.vx) !== Infinity, "Body's velocity is invalid.");
                        e(this.vy === this.vy && Math.abs(this.vy) !== Infinity, "Body's velocity is invalid.");
                        e(this.a === this.a && Math.abs(this.a) !== Infinity, "Body's angle is invalid.");
                        e(this.w === this.w && Math.abs(this.w) !== Infinity, "Body's angular velocity is invalid.");
                        e(this.t === this.t && Math.abs(this.t) !== Infinity, "Body's torque is invalid.");
                        Ft(this.rot, "Body's rotation vector is invalid.");
                        e(this.v_limit === this.v_limit, "Body's velocity limit is invalid.");
                        e(this.w_limit === this.w_limit, "Body's angular velocity limit is invalid.");
                    };
                } else {
                    Pt.prototype.sanityCheck = function() {};
                }
                Pt.prototype.getPos = function() {
                    return this.p;
                };
                Pt.prototype.getVel = function() {
                    return new m(this.vx, this.vy);
                };
                Pt.prototype.getAngVel = function() {
                    return this.w;
                };
                Pt.prototype.isSleeping = function() {
                    return this.nodeRoot !== null;
                };
                Pt.prototype.isStatic = function() {
                    return this.nodeIdleTime === Infinity;
                };
                Pt.prototype.isRogue = function() {
                    return this.space === null;
                };
                Pt.prototype.setMass = function(t) {
                    e(t > 0, "Mass must be positive and non-zero.");
                    this.activate();
                    this.m = t;
                    this.m_inv = 1 / t;
                };
                Pt.prototype.setMoment = function(t) {
                    e(t > 0, "Moment of Inertia must be positive and non-zero.");
                    this.activate();
                    this.i = t;
                    this.i_inv = 1 / t;
                };
                Pt.prototype.addShape = function(t) {
                    this.shapeList.push(t);
                };
                Pt.prototype.removeShape = function(t) {
                    p(this.shapeList, t);
                };
                var Vt = function t(i, e, r) {
                    if (i === r) {
                        return i.next(e);
                    } else if (i.a === e) {
                        i.next_a = t(i.next_a, e, r);
                    } else {
                        i.next_b = t(i.next_b, e, r);
                    }
                    return i;
                };
                Pt.prototype.removeConstraint = function(t) {
                    this.constraintList = Vt(this.constraintList, this, t);
                };
                Pt.prototype.setPos = function(i) {
                    this.activate();
                    this.sanityCheck();
                    if (i === w) {
                        i = t.v(0, 0);
                    }
                    this.p = i;
                };
                Pt.prototype.setVel = function(t) {
                    this.activate();
                    this.vx = t.x;
                    this.vy = t.y;
                };
                Pt.prototype.setAngVel = function(t) {
                    this.activate();
                    this.w = t;
                };
                Pt.prototype.setAngleInternal = function(t) {
                    e(!isNaN(t), "Internal Error: Attempting to set body's angle to NaN");
                    this.a = t;
                    this.rot.x = Math.cos(t);
                    this.rot.y = Math.sin(t);
                };
                Pt.prototype.setAngle = function(t) {
                    this.activate();
                    this.sanityCheck();
                    this.setAngleInternal(t);
                };
                Pt.prototype.velocity_func = function(t, i, e) {
                    var r = this.vx * i + (t.x + this.f.x * this.m_inv) * e;
                    var s = this.vy * i + (t.y + this.f.y * this.m_inv) * e;
                    var n = this.v_limit;
                    var a = r * r + s * s;
                    var o = a > n * n ? n / Math.sqrt(a) : 1;
                    this.vx = r * o;
                    this.vy = s * o;
                    var h = this.w_limit;
                    this.w = d(this.w * i + this.t * this.i_inv * e, -h, h);
                    this.sanityCheck();
                };
                Pt.prototype.position_func = function(t) {
                    this.p.x += (this.vx + this.v_biasx) * t;
                    this.p.y += (this.vy + this.v_biasy) * t;
                    this.setAngleInternal(this.a + (this.w + this.w_bias) * t);
                    this.v_biasx = this.v_biasy = 0;
                    this.w_bias = 0;
                    this.sanityCheck();
                };
                Pt.prototype.resetForces = function() {
                    this.activate();
                    this.f = new m(0, 0);
                    this.t = 0;
                };
                Pt.prototype.applyForce = function(t, i) {
                    this.activate();
                    this.f = C(this.f, t);
                    this.t += L(i, t);
                };
                Pt.prototype.applyImpulse = function(t, i) {
                    this.activate();
                    Qi(this, t.x, t.y, i);
                };
                Pt.prototype.getVelAtPoint = function(t) {
                    return C(new m(this.vx, this.vy), P(R(t), this.w));
                };
                Pt.prototype.getVelAtWorldPoint = function(t) {
                    return this.getVelAtPoint(M(t, this.p));
                };
                Pt.prototype.getVelAtLocalPoint = function(t) {
                    return this.getVelAtPoint(N(t, this.rot));
                };
                Pt.prototype.eachShape = function(t) {
                    for (var i = 0, e = this.shapeList.length; i < e; i++) {
                        t(this.shapeList[i]);
                    }
                };
                Pt.prototype.eachConstraint = function(t) {
                    var i = this.constraintList;
                    while (i) {
                        var e = i.next(this);
                        t(i);
                        i = e;
                    }
                };
                Pt.prototype.eachArbiter = function(t) {
                    var i = this.arbiterList;
                    while (i) {
                        var e = i.next(this);
                        i.swappedColl = this === i.body_b;
                        t(i);
                        i = e;
                    }
                };
                Pt.prototype.local2World = function(t) {
                    return C(this.p, N(t, this.rot));
                };
                Pt.prototype.world2Local = function(t) {
                    return T(M(t, this.p), this.rot);
                };
                Pt.prototype.kineticEnergy = function() {
                    var t = this.vx * this.vx + this.vy * this.vy;
                    var i = this.w * this.w;
                    return (t ? t * this.m : 0) + (i ? i * this.i : 0);
                };
                var Nt = t.SpatialIndex = function(t) {
                    this.staticIndex = t;
                    if (t) {
                        if (t.dynamicIndex) {
                            throw new Error("This static index is already associated with a dynamic index.");
                        }
                        t.dynamicIndex = this;
                    }
                };
                Nt.prototype.collideStatic = function(t, i) {
                    if (t.count > 0) {
                        var e = t.query;
                        this.each(function(t) {
                            e.call(t, new it(t.bb_l, t.bb_b, t.bb_r, t.bb_t), i);
                        });
                    }
                };
                var Tt = t.BBTree = function(t) {
                    Nt.call(this, t);
                    this.velocityFunc = null;
                    this.leaves = {};
                    this.count = 0;
                    this.root = null;
                    this.pooledNodes = null;
                    this.pooledPairs = null;
                    this.stamp = 0;
                };
                Tt.prototype = Object.create(Nt.prototype);
                var Qt = 0;
                var Ot = function t(i, e, r) {
                    this.obj = null;
                    this.bb_l = o(e.bb_l, r.bb_l);
                    this.bb_b = o(e.bb_b, r.bb_b);
                    this.bb_r = h(e.bb_r, r.bb_r);
                    this.bb_t = h(e.bb_t, r.bb_t);
                    this.parent = null;
                    this.setA(e);
                    this.setB(r);
                };
                Tt.prototype.makeNode = function(t, i) {
                    var e = this.pooledNodes;
                    if (e) {
                        this.pooledNodes = e.parent;
                        e.constructor(this, t, i);
                        return e;
                    } else {
                        Qt++;
                        return new Ot(this, t, i);
                    }
                };
                var qt = 0;
                var Et = function t(i, e) {
                    this.obj = e;
                    i.getBB(e, this);
                    this.parent = null;
                    this.stamp = 1;
                    this.pairs = null;
                    qt++;
                };
                Tt.prototype.getBB = function(t, i) {
                    var e = this.velocityFunc;
                    if (e) {
                        var r = .1;
                        var s = (t.bb_r - t.bb_l) * r;
                        var n = (t.bb_t - t.bb_b) * r;
                        var a = P(e(t), .1);
                        i.bb_l = t.bb_l + o(-s, a.x);
                        i.bb_b = t.bb_b + o(-n, a.y);
                        i.bb_r = t.bb_r + h(s, a.x);
                        i.bb_t = t.bb_t + h(n, a.y);
                    } else {
                        i.bb_l = t.bb_l;
                        i.bb_b = t.bb_b;
                        i.bb_r = t.bb_r;
                        i.bb_t = t.bb_t;
                    }
                };
                Tt.prototype.getStamp = function() {
                    var t = this.dynamicIndex;
                    return t && t.stamp ? t.stamp : this.stamp;
                };
                Tt.prototype.incrementStamp = function() {
                    if (this.dynamicIndex && this.dynamicIndex.stamp) {
                        this.dynamicIndex.stamp++;
                    } else {
                        this.stamp++;
                    }
                };
                var Ht = 0;
                var Dt = function t(i, e, r, s) {
                    this.prevA = null;
                    this.leafA = i;
                    this.nextA = e;
                    this.prevB = null;
                    this.leafB = r;
                    this.nextB = s;
                };
                Tt.prototype.makePair = function(t, i, e, r) {
                    var s = this.pooledPairs;
                    if (s) {
                        this.pooledPairs = s.prevA;
                        s.prevA = null;
                        s.leafA = t;
                        s.nextA = i;
                        s.prevB = null;
                        s.leafB = e;
                        s.nextB = r;
                        return s;
                    } else {
                        Ht++;
                        return new Dt(t, i, e, r);
                    }
                };
                Dt.prototype.recycle = function(t) {
                    this.prevA = t.pooledPairs;
                    t.pooledPairs = this;
                };
                var zt = function t(i, e, r) {
                    if (r) {
                        if (r.leafA === e) r.prevA = i; else r.prevB = i;
                    }
                    if (i) {
                        if (i.leafA === e) i.nextA = r; else i.nextB = r;
                    } else {
                        e.pairs = r;
                    }
                };
                Et.prototype.clearPairs = function(t) {
                    var i = this.pairs, e;
                    this.pairs = null;
                    while (i) {
                        if (i.leafA === this) {
                            e = i.nextA;
                            zt(i.prevB, i.leafB, i.nextB);
                        } else {
                            e = i.nextB;
                            zt(i.prevA, i.leafA, i.nextA);
                        }
                        i.recycle(t);
                        i = e;
                    }
                };
                var Gt = function t(i, e, r) {
                    var s = i.pairs, n = e.pairs;
                    var a = r.makePair(i, s, e, n);
                    i.pairs = e.pairs = a;
                    if (s) {
                        if (s.leafA === i) s.prevA = a; else s.prevB = a;
                    }
                    if (n) {
                        if (n.leafA === e) n.prevA = a; else n.prevB = a;
                    }
                };
                Ot.prototype.recycle = function(t) {
                    this.parent = t.pooledNodes;
                    t.pooledNodes = this;
                };
                Et.prototype.recycle = function(t) {};
                Ot.prototype.setA = function(t) {
                    this.A = t;
                    t.parent = this;
                };
                Ot.prototype.setB = function(t) {
                    this.B = t;
                    t.parent = this;
                };
                Et.prototype.isLeaf = true;
                Ot.prototype.isLeaf = false;
                Ot.prototype.otherChild = function(t) {
                    return this.A == t ? this.B : this.A;
                };
                Ot.prototype.replaceChild = function(t, i, e) {
                    s(t == this.A || t == this.B, "Node is not a child of parent.");
                    if (this.A == t) {
                        this.A.recycle(e);
                        this.setA(i);
                    } else {
                        this.B.recycle(e);
                        this.setB(i);
                    }
                    for (var r = this; r; r = r.parent) {
                        var n = r.A;
                        var a = r.B;
                        r.bb_l = o(n.bb_l, a.bb_l);
                        r.bb_b = o(n.bb_b, a.bb_b);
                        r.bb_r = h(n.bb_r, a.bb_r);
                        r.bb_t = h(n.bb_t, a.bb_t);
                    }
                };
                Ot.prototype.bbArea = Et.prototype.bbArea = function() {
                    return (this.bb_r - this.bb_l) * (this.bb_t - this.bb_b);
                };
                var Wt = function t(i, e) {
                    return (h(i.bb_r, e.bb_r) - o(i.bb_l, e.bb_l)) * (h(i.bb_t, e.bb_t) - o(i.bb_b, e.bb_b));
                };
                var Jt = function t(i, e) {
                    return Math.abs(i.bb_l + i.bb_r - e.bb_l - e.bb_r) + Math.abs(i.bb_b + i.bb_t - e.bb_b - e.bb_t);
                };
                var Yt = function t(i, e, r) {
                    if (i == null) {
                        return e;
                    } else if (i.isLeaf) {
                        return r.makeNode(e, i);
                    } else {
                        var s = i.B.bbArea() + Wt(i.A, e);
                        var n = i.A.bbArea() + Wt(i.B, e);
                        if (s === n) {
                            s = Jt(i.A, e);
                            n = Jt(i.B, e);
                        }
                        if (n < s) {
                            i.setB(t(i.B, e, r));
                        } else {
                            i.setA(t(i.A, e, r));
                        }
                        i.bb_l = o(i.bb_l, e.bb_l);
                        i.bb_b = o(i.bb_b, e.bb_b);
                        i.bb_r = h(i.bb_r, e.bb_r);
                        i.bb_t = h(i.bb_t, e.bb_t);
                        return i;
                    }
                };
                Ot.prototype.intersectsBB = Et.prototype.intersectsBB = function(t) {
                    return this.bb_l <= t.r && t.l <= this.bb_r && this.bb_b <= t.t && t.b <= this.bb_t;
                };
                var Ut = function t(i, e, r) {
                    if (i.intersectsBB(e)) {
                        if (i.isLeaf) {
                            r(i.obj);
                        } else {
                            t(i.A, e, r);
                            t(i.B, e, r);
                        }
                    }
                };
                var Kt = function t(i, e, r) {
                    var s = 1 / (r.x - e.x);
                    var n = i.bb_l == e.x ? -Infinity : (i.bb_l - e.x) * s;
                    var a = i.bb_r == e.x ? Infinity : (i.bb_r - e.x) * s;
                    var c = o(n, a);
                    var p = h(n, a);
                    var v = 1 / (r.y - e.y);
                    var u = i.bb_b == e.y ? -Infinity : (i.bb_b - e.y) * v;
                    var l = i.bb_t == e.y ? Infinity : (i.bb_t - e.y) * v;
                    var y = o(u, l);
                    var f = h(u, l);
                    if (y <= p && c <= f) {
                        var b = h(c, y);
                        var d = o(p, f);
                        if (0 <= d && b <= 1) return h(b, 0);
                    }
                    return Infinity;
                };
                var Xt = function t(i, e, r, s, n) {
                    if (i.isLeaf) {
                        return n(i.obj);
                    } else {
                        var a = Kt(i.A, e, r);
                        var h = Kt(i.B, e, r);
                        if (a < h) {
                            if (a < s) s = o(s, t(i.A, e, r, s, n));
                            if (h < s) s = o(s, t(i.B, e, r, s, n));
                        } else {
                            if (h < s) s = o(s, t(i.B, e, r, s, n));
                            if (a < s) s = o(s, t(i.A, e, r, s, n));
                        }
                        return s;
                    }
                };
                Tt.prototype.subtreeRecycle = function(t) {
                    if (t.isLeaf) {
                        this.subtreeRecycle(t.A);
                        this.subtreeRecycle(t.B);
                        t.recycle(this);
                    }
                };
                var Zt = function t(i, e, r) {
                    if (e == i) {
                        return null;
                    } else {
                        var s = e.parent;
                        if (s == i) {
                            var n = i.otherChild(e);
                            n.parent = i.parent;
                            i.recycle(r);
                            return n;
                        } else {
                            s.parent.replaceChild(s, s.otherChild(e), r);
                            return i;
                        }
                    }
                };
                var ti = function t(i, e) {
                    return i.bb_l <= e.bb_r && e.bb_l <= i.bb_r && i.bb_b <= e.bb_t && e.bb_b <= i.bb_t;
                };
                Et.prototype.markLeafQuery = function(t, i, e, r) {
                    if (ti(t, this)) {
                        if (i) {
                            Gt(t, this, e);
                        } else {
                            if (this.stamp < t.stamp) Gt(this, t, e);
                            if (r) r(t.obj, this.obj);
                        }
                    }
                };
                Ot.prototype.markLeafQuery = function(t, i, e, r) {
                    if (ti(t, this)) {
                        this.A.markLeafQuery(t, i, e, r);
                        this.B.markLeafQuery(t, i, e, r);
                    }
                };
                Et.prototype.markSubtree = function(t, i, e) {
                    if (this.stamp == t.getStamp()) {
                        if (i) i.markLeafQuery(this, false, t, e);
                        for (var r = this; r.parent; r = r.parent) {
                            if (r == r.parent.A) {
                                r.parent.B.markLeafQuery(this, true, t, e);
                            } else {
                                r.parent.A.markLeafQuery(this, false, t, e);
                            }
                        }
                    } else {
                        var s = this.pairs;
                        while (s) {
                            if (this === s.leafB) {
                                if (e) e(s.leafA.obj, this.obj);
                                s = s.nextB;
                            } else {
                                s = s.nextA;
                            }
                        }
                    }
                };
                Ot.prototype.markSubtree = function(t, i, e) {
                    this.A.markSubtree(t, i, e);
                    this.B.markSubtree(t, i, e);
                };
                Et.prototype.containsObj = function(t) {
                    return this.bb_l <= t.bb_l && this.bb_r >= t.bb_r && this.bb_b <= t.bb_b && this.bb_t >= t.bb_t;
                };
                Et.prototype.update = function(t) {
                    var i = t.root;
                    var e = this.obj;
                    if (!this.containsObj(e)) {
                        t.getBB(this.obj, this);
                        i = Zt(i, this, t);
                        t.root = Yt(i, this, t);
                        this.clearPairs(t);
                        this.stamp = t.getStamp();
                        return true;
                    }
                    return false;
                };
                Et.prototype.addPairs = function(t) {
                    var i = t.dynamicIndex;
                    if (i) {
                        var e = i.root;
                        if (e) {
                            e.markLeafQuery(this, true, i, null);
                        }
                    } else {
                        var r = t.staticIndex.root;
                        this.markSubtree(t, r, null);
                    }
                };
                Tt.prototype.insert = function(t, i) {
                    var e = new Et(this, t);
                    this.leaves[i] = e;
                    this.root = Yt(this.root, e, this);
                    this.count++;
                    e.stamp = this.getStamp();
                    e.addPairs(this);
                    this.incrementStamp();
                };
                Tt.prototype.remove = function(t, i) {
                    var e = this.leaves[i];
                    delete this.leaves[i];
                    this.root = Zt(this.root, e, this);
                    this.count--;
                    e.clearPairs(this);
                    e.recycle(this);
                };
                Tt.prototype.contains = function(t, i) {
                    return this.leaves[i] != null;
                };
                var ii = function t(i, e) {};
                Tt.prototype.reindexQuery = function(t) {
                    if (!this.root) return;
                    var i, e = this.leaves;
                    for (i in e) {
                        e[i].update(this);
                    }
                    var r = this.staticIndex;
                    var s = r && r.root;
                    this.root.markSubtree(this, s, t);
                    if (r && !s) this.collideStatic(this, r, t);
                    this.incrementStamp();
                };
                Tt.prototype.reindex = function() {
                    this.reindexQuery(ii);
                };
                Tt.prototype.reindexObject = function(t, i) {
                    var e = this.leaves[i];
                    if (e) {
                        if (e.update(this)) e.addPairs(this);
                        this.incrementStamp();
                    }
                };
                Tt.prototype.pointQuery = function(t, i) {
                    this.query(new it(t.x, t.y, t.x, t.y), i);
                };
                Tt.prototype.segmentQuery = function(t, i, e, r) {
                    if (this && this.root) Xt(this.root, t, i, e, r);
                };
                Tt.prototype.query = function(t, i) {
                    if (this.root) Ut(this.root, t, i);
                };
                Tt.prototype.count = function() {
                    return this.count;
                };
                Tt.prototype.each = function(t) {
                    var i;
                    for (i in this.leaves) {
                        t(this.leaves[i].obj);
                    }
                };
                var ei = function t(i, e, r, s, n) {
                    return (h(i.bb_r, s) - o(i.bb_l, e)) * (h(i.bb_t, n) - o(i.bb_b, r));
                };
                var ri = function t(i, e, r, s) {
                    if (s == 1) {
                        return e[r];
                    } else if (s == 2) {
                        return i.makeNode(e[r], e[r + 1]);
                    }
                    var n = e[r];
                    var a = n.bb_l, c = n.bb_b, p = n.bb_r, v = n.bb_t;
                    var u = r + s;
                    for (var l = r + 1; l < u; l++) {
                        n = e[l];
                        a = o(a, n.bb_l);
                        c = o(c, n.bb_b);
                        p = h(p, n.bb_r);
                        v = h(v, n.bb_t);
                    }
                    var y = p - a > v - c;
                    var f = new Array(s * 2);
                    if (y) {
                        for (var l = r; l < u; l++) {
                            f[2 * l + 0] = e[l].bb_l;
                            f[2 * l + 1] = e[l].bb_r;
                        }
                    } else {
                        for (var l = r; l < u; l++) {
                            f[2 * l + 0] = e[l].bb_b;
                            f[2 * l + 1] = e[l].bb_t;
                        }
                    }
                    f.sort(function(t, i) {
                        return t - i;
                    });
                    var b = (f[s - 1] + f[s]) * .5;
                    var d = a, _ = c, x = p, g = v;
                    var m = a, w = c, S = p, A = v;
                    if (y) x = m = b; else g = w = b;
                    var j = u;
                    for (var B = r; B < j; ) {
                        var n = e[B];
                        if (ei(n, m, w, S, A) < ei(n, d, _, x, g)) {
                            j--;
                            e[B] = e[j];
                            e[j] = n;
                        } else {
                            B++;
                        }
                    }
                    if (j == s) {
                        var n = null;
                        for (var l = r; l < u; l++) {
                            n = Yt(n, e[l], i);
                        }
                        return n;
                    }
                    return NodeNew(i, t(i, e, r, j - r), t(i, e, j, u - j));
                };
                Tt.prototype.optimize = function() {
                    var t = new Array(this.count);
                    var i = 0;
                    for (var e in this.leaves) {
                        t[i++] = this.nodes[e];
                    }
                    tree.subtreeRecycle(root);
                    this.root = ri(tree, t, t.length);
                };
                var si = function t(i, e) {
                    if (!i.isLeaf && e <= 10) {
                        t(i.A, e + 1);
                        t(i.B, e + 1);
                    }
                    var r = "";
                    for (var s = 0; s < e; s++) {
                        r += " ";
                    }
                    console.log(r + i.bb_b + " " + i.bb_t);
                };
                Tt.prototype.log = function() {
                    if (this.root) si(this.root, 0);
                };
                var ni = t.CollisionHandler = function() {
                    this.a = this.b = 0;
                };
                ni.prototype.begin = function(t, i) {
                    return true;
                };
                ni.prototype.preSolve = function(t, i) {
                    return true;
                };
                ni.prototype.postSolve = function(t, i) {};
                ni.prototype.separate = function(t, i) {};
                var ai = 4;
                var oi = function t(i, e) {
                    this.e = 0;
                    this.u = 0;
                    this.surface_vr = w;
                    this.a = i;
                    this.body_a = i.body;
                    this.b = e;
                    this.body_b = e.body;
                    this.thread_a_next = this.thread_a_prev = null;
                    this.thread_b_next = this.thread_b_prev = null;
                    this.contacts = null;
                    this.stamp = 0;
                    this.handler = null;
                    this.swappedColl = false;
                    this.state = "first coll";
                };
                oi.prototype.getShapes = function() {
                    if (this.swappedColl) {
                        return [ this.b, this.a ];
                    } else {
                        return [ this.a, this.b ];
                    }
                };
                oi.prototype.totalImpulse = function() {
                    var t = this.contacts;
                    var i = new m(0, 0);
                    for (var e = 0, r = t.length; e < r; e++) {
                        var s = t[e];
                        i.add(P(s.n, s.jnAcc));
                    }
                    return this.swappedColl ? i : i.neg();
                };
                oi.prototype.totalImpulseWithFriction = function() {
                    var t = this.contacts;
                    var i = new m(0, 0);
                    for (var e = 0, r = t.length; e < r; e++) {
                        var s = t[e];
                        i.add(new m(s.jnAcc, s.jtAcc).rotate(s.n));
                    }
                    return this.swappedColl ? i : i.neg();
                };
                oi.prototype.totalKE = function() {
                    var t = (1 - this.e) / (1 + this.e);
                    var i = 0;
                    var e = this.contacts;
                    for (var r = 0, s = e.length; r < s; r++) {
                        var n = e[r];
                        var a = n.jnAcc;
                        var o = n.jtAcc;
                        i += t * a * a / n.nMass + o * o / n.tMass;
                    }
                    return i;
                };
                oi.prototype.ignore = function() {
                    this.state = "ignore";
                };
                oi.prototype.getA = function() {
                    return this.swappedColl ? this.b : this.a;
                };
                oi.prototype.getB = function() {
                    return this.swappedColl ? this.a : this.b;
                };
                oi.prototype.isFirstContact = function() {
                    return this.state === "first coll";
                };
                var hi = function t(i, e, r) {
                    this.point = i;
                    this.normal = e;
                    this.dist = r;
                };
                oi.prototype.getContactPointSet = function() {
                    var t = new Array(this.contacts.length);
                    var i;
                    for (i = 0; i < t.length; i++) {
                        t[i] = new hi(this.contacts[i].p, this.contacts[i].n, this.contacts[i].dist);
                    }
                    return t;
                };
                oi.prototype.getNormal = function(t) {
                    var i = this.contacts[t].n;
                    return this.swappedColl ? k(i) : i;
                };
                oi.prototype.getPoint = function(t) {
                    return this.contacts[t].p;
                };
                oi.prototype.getDepth = function(t) {
                    return this.contacts[t].dist;
                };
                var ci = function t(i, e, r, s) {
                    if (r) {
                        if (r.body_a === e) {
                            r.thread_a_next = s;
                        } else {
                            r.thread_b_next = s;
                        }
                    } else if (e.arbiterList === i) {
                        e.arbiterList = s;
                    }
                    if (s) {
                        if (s.body_a === e) {
                            s.thread_a_prev = r;
                        } else {
                            s.thread_b_prev = r;
                        }
                    }
                };
                oi.prototype.unthread = function() {
                    ci(this, this.body_a, this.thread_a_prev, this.thread_a_next);
                    ci(this, this.body_b, this.thread_b_prev, this.thread_b_next);
                    this.thread_a_prev = this.thread_a_next = null;
                    this.thread_b_prev = this.thread_b_next = null;
                };
                oi.prototype.update = function(t, i, e, r) {
                    if (this.contacts) {
                        for (var s = 0; s < this.contacts.length; s++) {
                            var n = this.contacts[s];
                            for (var a = 0; a < t.length; a++) {
                                var o = t[a];
                                if (o.hash === n.hash) {
                                    o.jnAcc = n.jnAcc;
                                    o.jtAcc = n.jtAcc;
                                }
                            }
                        }
                    }
                    this.contacts = t;
                    this.handler = i;
                    this.swappedColl = e.collision_type !== i.a;
                    this.e = e.e * r.e;
                    this.u = e.u * r.u;
                    this.surface_vr = M(e.surface_v, r.surface_v);
                    this.a = e;
                    this.body_a = e.body;
                    this.b = r;
                    this.body_b = r.body;
                    if (this.state == "cached") this.state = "first coll";
                };
                oi.prototype.preStep = function(t, i, e) {
                    var r = this.body_a;
                    var s = this.body_b;
                    for (var n = 0; n < this.contacts.length; n++) {
                        var a = this.contacts[n];
                        a.r1 = M(a.p, r.p);
                        a.r2 = M(a.p, s.p);
                        a.nMass = 1 / Hi(r, s, a.r1, a.r2, a.n);
                        a.tMass = 1 / Hi(r, s, a.r1, a.r2, R(a.n));
                        a.bias = -e * o(0, a.dist + i) / t;
                        a.jBias = 0;
                        a.bounce = Ti(r, s, a.r1, a.r2, a.n) * this.e;
                    }
                };
                oi.prototype.applyCachedImpulse = function(t) {
                    if (this.isFirstContact()) return;
                    var i = this.body_a;
                    var e = this.body_b;
                    for (var r = 0; r < this.contacts.length; r++) {
                        var s = this.contacts[r];
                        var n = s.n.x;
                        var a = s.n.y;
                        var o = n * s.jnAcc - a * s.jtAcc;
                        var h = n * s.jtAcc + a * s.jnAcc;
                        Oi(i, e, s.r1, s.r2, o * t, h * t);
                    }
                };
                var pi = 0;
                var vi = 0;
                oi.prototype.applyImpulse = function() {
                    pi++;
                    var t = this.body_a;
                    var i = this.body_b;
                    var e = this.surface_vr;
                    var r = this.u;
                    for (var s = 0; s < this.contacts.length; s++) {
                        vi++;
                        var n = this.contacts[s];
                        var a = n.nMass;
                        var o = n.n;
                        var c = n.r1;
                        var p = n.r2;
                        var v = i.vx - p.y * i.w - (t.vx - c.y * t.w);
                        var u = i.vy + p.x * i.w - (t.vy + c.x * t.w);
                        var l = o.x * (i.v_biasx - p.y * i.w_bias - t.v_biasx + c.y * t.w_bias) + o.y * (p.x * i.w_bias + i.v_biasy - c.x * t.w_bias - t.v_biasy);
                        var y = A(v, u, o.x, o.y);
                        var f = A(v + e.x, u + e.y, -o.y, o.x);
                        var b = (n.bias - l) * a;
                        var _ = n.jBias;
                        n.jBias = h(_ + b, 0);
                        var x = -(n.bounce + y) * a;
                        var g = n.jnAcc;
                        n.jnAcc = h(g + x, 0);
                        var m = r * n.jnAcc;
                        var w = -f * n.tMass;
                        var S = n.jtAcc;
                        n.jtAcc = d(S + w, -m, m);
                        var j = o.x * (n.jBias - _);
                        var B = o.y * (n.jBias - _);
                        qi(t, -j, -B, c);
                        qi(i, j, B, p);
                        var I = n.jnAcc - g;
                        var C = n.jtAcc - S;
                        Oi(t, i, c, p, o.x * I - o.y * C, o.x * C + o.y * I);
                    }
                };
                oi.prototype.callSeparate = function(t) {
                    var i = t.lookupHandler(this.a.collision_type, this.b.collision_type);
                    i.separate(this, t);
                };
                oi.prototype.next = function(t) {
                    return this.body_a == t ? this.thread_a_next : this.thread_b_next;
                };
                var ui = 0;
                var li = function t(i, e, r, s) {
                    this.p = i;
                    this.n = e;
                    this.dist = r;
                    this.r1 = this.r2 = w;
                    this.nMass = this.tMass = this.bounce = this.bias = 0;
                    this.jnAcc = this.jtAcc = this.jBias = 0;
                    this.hash = s;
                    ui++;
                };
                var yi = [];
                var fi = function t(i, e, r, s) {
                    var n = r + s;
                    var a = M(e, i);
                    var o = Q(a);
                    if (o >= n * n) return;
                    var h = Math.sqrt(o);
                    return new li(C(i, P(a, .5 + (r - .5 * n) / (h ? h : Infinity))), h ? P(a, 1 / h) : new m(1, 0), h - n, 0);
                };
                var bi = function t(i, e) {
                    var r = fi(i.tc, e.tc, i.r, e.r);
                    return r ? [ r ] : yi;
                };
                var di = function t(i, e) {
                    var r = e.ta;
                    var s = e.tb;
                    var n = i.tc;
                    var a = M(s, r);
                    var o = _(S(a, M(n, r)) / Q(a));
                    var h = C(r, P(a, o));
                    var c = fi(n, h, i.r, e.r);
                    if (c) {
                        var p = c.n;
                        return o === 0 && S(p, e.a_tangent) < 0 || o === 1 && S(p, e.b_tangent) < 0 ? yi : [ c ];
                    } else {
                        return yi;
                    }
                };
                var _i = 0;
                var xi = function t(i, e) {
                    var r = 0;
                    var s = i.valueOnAxis(e[0].n, e[0].d);
                    if (s > 0) return -1;
                    for (var n = 1; n < e.length; n++) {
                        var a = i.valueOnAxis(e[n].n, e[n].d);
                        if (a > 0) {
                            return -1;
                        } else if (a > s) {
                            s = a;
                            r = n;
                        }
                    }
                    _i = s;
                    return r;
                };
                var gi = function t(i, e, r, s) {
                    var n = [];
                    var a = i.tVerts;
                    for (var o = 0; o < a.length; o += 2) {
                        var h = a[o];
                        var p = a[o + 1];
                        if (e.containsVertPartial(h, p, k(r))) {
                            n.push(new li(new m(h, p), r, s, c(i.hashid, o)));
                        }
                    }
                    var v = e.tVerts;
                    for (var o = 0; o < v.length; o += 2) {
                        var h = v[o];
                        var p = v[o + 1];
                        if (i.containsVertPartial(h, p, r)) {
                            n.push(new li(new m(h, p), r, s, c(e.hashid, o)));
                        }
                    }
                    return n;
                };
                var mi = function t(i, e, r, s) {
                    var n = [];
                    var a = i.tVerts;
                    for (var o = 0; o < a.length; o += 2) {
                        var h = a[o];
                        var p = a[o + 1];
                        if (e.containsVert(h, p)) {
                            n.push(new li(new m(h, p), r, s, c(i.hashid, o >> 1)));
                        }
                    }
                    var v = e.tVerts;
                    for (var o = 0; o < v.length; o += 2) {
                        var h = v[o];
                        var p = v[o + 1];
                        if (i.containsVert(h, p)) {
                            n.push(new li(new m(h, p), r, s, c(e.hashid, o >> 1)));
                        }
                    }
                    return n.length ? n : gi(i, e, r, s);
                };
                var wi = function t(i, e) {
                    var r = xi(e, i.tPlanes);
                    if (r == -1) return yi;
                    var s = _i;
                    var n = xi(i, e.tPlanes);
                    if (n == -1) return yi;
                    var a = _i;
                    if (s > a) return mi(i, e, i.tPlanes[r].n, s); else return mi(i, e, k(e.tPlanes[n].n), a);
                };
                var Si = function t(i, e, r) {
                    var s = S(e, i.ta) - i.r;
                    var n = S(e, i.tb) - i.r;
                    return o(s, n) - r;
                };
                var Ai = function t(i, e, r, s, n) {
                    var a = L(e.tn, e.ta);
                    var o = L(e.tn, e.tb);
                    var h = P(e.tn, n);
                    var p = r.tVerts;
                    for (var v = 0; v < p.length; v += 2) {
                        var u = p[v];
                        var l = p[v + 1];
                        if (A(u, l, h.x, h.y) < S(e.tn, e.ta) * n + e.r) {
                            var y = $(e.tn.x, e.tn.y, u, l);
                            if (a >= y && y >= o) {
                                i.push(new li(new m(u, l), h, s, c(r.hashid, v)));
                            }
                        }
                    }
                };
                var ji = function t(i, e) {
                    var r = [];
                    var s = e.tPlanes;
                    var n = s.length;
                    var a = S(i.tn, i.ta);
                    var o = e.valueOnAxis(i.tn, a) - i.r;
                    var h = e.valueOnAxis(k(i.tn), -a) - i.r;
                    if (h > 0 || o > 0) return yi;
                    var p = 0;
                    var v = Si(i, s[0].n, s[0].d);
                    if (v > 0) return yi;
                    for (var u = 0; u < n; u++) {
                        var l = Si(i, s[u].n, s[u].d);
                        if (l > 0) {
                            return yi;
                        } else if (l > v) {
                            v = l;
                            p = u;
                        }
                    }
                    var y = k(s[p].n);
                    var f = C(i.ta, P(y, i.r));
                    var b = C(i.tb, P(y, i.r));
                    if (e.containsVert(f.x, f.y)) r.push(new li(f, y, v, c(i.hashid, 0)));
                    if (e.containsVert(b.x, b.y)) r.push(new li(b, y, v, c(i.hashid, 1)));
                    if (o >= v || h >= v) {
                        if (o > h) Ai(r, i, e, o, 1); else Ai(r, i, e, h, -1);
                    }
                    if (r.length === 0) {
                        var d = p * 2;
                        var _ = e.tVerts;
                        var x = new m(_[d], _[d + 1]);
                        var g;
                        if (g = fi(i.ta, x, i.r, 0, r)) return [ g ];
                        if (g = fi(i.tb, x, i.r, 0, r)) return [ g ];
                        var w = n * 2;
                        var A = new m(_[(d + 2) % w], _[(d + 3) % w]);
                        if (g = fi(i.ta, A, i.r, 0, r)) return [ g ];
                        if (g = fi(i.tb, A, i.r, 0, r)) return [ g ];
                    }
                    return r;
                };
                var Bi = function t(i, e) {
                    var r = e.tPlanes;
                    var s = 0;
                    var n = S(r[0].n, i.tc) - r[0].d - i.r;
                    for (var a = 0; a < r.length; a++) {
                        var o = S(r[a].n, i.tc) - r[a].d - i.r;
                        if (o > 0) {
                            return yi;
                        } else if (o > n) {
                            n = o;
                            s = a;
                        }
                    }
                    var h = r[s].n;
                    var c = e.tVerts;
                    var p = c.length;
                    var v = s << 1;
                    var u = c[v];
                    var l = c[v + 1];
                    var y = c[(v + 2) % p];
                    var f = c[(v + 3) % p];
                    var b = $(h.x, h.y, u, l);
                    var d = $(h.x, h.y, y, f);
                    var _ = L(h, i.tc);
                    if (_ < d) {
                        var x = fi(i.tc, new m(y, f), i.r, 0, x);
                        return x ? [ x ] : yi;
                    } else if (_ < b) {
                        return [ new li(M(i.tc, P(h, i.r + n / 2)), k(h), n, 0) ];
                    } else {
                        var x = fi(i.tc, new m(u, l), i.r, 0, x);
                        return x ? [ x ] : yi;
                    }
                };
                St.prototype.collisionCode = 0;
                jt.prototype.collisionCode = 1;
                It.prototype.collisionCode = 2;
                St.prototype.collisionTable = [ bi, di, Bi ];
                jt.prototype.collisionTable = [ null, function(t, i) {
                    return yi;
                }, ji ];
                It.prototype.collisionTable = [ null, null, wi ];
                var Ii = t.collideShapes = function(t, i) {
                    e(t.collisionCode <= i.collisionCode, "Collided shapes must be sorted by type");
                    return t.collisionTable[i.collisionCode](t, i);
                };
                var Ci = new ni();
                var Mi = t.Space = function() {
                    this.stamp = 0;
                    this.curr_dt = 0;
                    this.bodies = [];
                    this.rousedBodies = [];
                    this.sleepingComponents = [];
                    this.staticShapes = new Tt(null);
                    this.activeShapes = new Tt(this.staticShapes);
                    this.arbiters = [];
                    this.contactBuffersHead = null;
                    this.cachedArbiters = {};
                    this.constraints = [];
                    this.locked = 0;
                    this.collisionHandlers = {};
                    this.defaultHandler = Ci;
                    this.postStepCallbacks = [];
                    this.iterations = 10;
                    this.gravity = w;
                    this.damping = 1;
                    this.idleSpeedThreshold = 0;
                    this.sleepTimeThreshold = Infinity;
                    this.collisionSlop = .1;
                    this.collisionBias = Math.pow(1 - .1, 60);
                    this.collisionPersistence = 3;
                    this.enableContactGraph = false;
                    this.staticBody = new Pt(Infinity, Infinity);
                    this.staticBody.nodeIdleTime = Infinity;
                    this.collideShapes = this.makeCollideShapes();
                };
                Mi.prototype.getCurrentTimeStep = function() {
                    return this.curr_dt;
                };
                Mi.prototype.setIterations = function(t) {
                    this.iterations = t;
                };
                Mi.prototype.isLocked = function() {
                    return this.locked;
                };
                var ki = function t(i) {
                    e(!i.locked, "This addition/removal cannot be done safely during a call to cpSpaceStep() \t or during a query. Put these calls into a post-step callback.");
                };
                Mi.prototype.addCollisionHandler = function(t, i, e, r, s, n) {
                    ki(this);
                    this.removeCollisionHandler(t, i);
                    var a = new ni();
                    a.a = t;
                    a.b = i;
                    if (e) a.begin = e;
                    if (r) a.preSolve = r;
                    if (s) a.postSolve = s;
                    if (n) a.separate = n;
                    this.collisionHandlers[c(t, i)] = a;
                };
                Mi.prototype.removeCollisionHandler = function(t, i) {
                    ki(this);
                    delete this.collisionHandlers[c(t, i)];
                };
                Mi.prototype.setDefaultCollisionHandler = function(t, i, e, r) {
                    ki(this);
                    var s = new ni();
                    if (t) s.begin = t;
                    if (i) s.preSolve = i;
                    if (e) s.postSolve = e;
                    if (r) s.separate = r;
                    this.defaultHandler = s;
                };
                Mi.prototype.lookupHandler = function(t, i) {
                    return this.collisionHandlers[c(t, i)] || this.defaultHandler;
                };
                Mi.prototype.addShape = function(t) {
                    var i = t.body;
                    if (i.isStatic()) return this.addStaticShape(t);
                    e(!t.space, "This shape is already added to a space and cannot be added to another.");
                    ki(this);
                    i.activate();
                    i.addShape(t);
                    t.update(i.p, i.rot);
                    this.activeShapes.insert(t, t.hashid);
                    t.space = this;
                    return t;
                };
                Mi.prototype.addStaticShape = function(t) {
                    e(!t.space, "This shape is already added to a space and cannot be added to another.");
                    ki(this);
                    var i = t.body;
                    i.addShape(t);
                    t.update(i.p, i.rot);
                    this.staticShapes.insert(t, t.hashid);
                    t.space = this;
                    return t;
                };
                Mi.prototype.addBody = function(t) {
                    e(!t.isStatic(), "Static bodies cannot be added to a space as they are not meant to be simulated.");
                    e(!t.space, "This body is already added to a space and cannot be added to another.");
                    ki(this);
                    this.bodies.push(t);
                    t.space = this;
                    return t;
                };
                Mi.prototype.addConstraint = function(t) {
                    e(!t.space, "This shape is already added to a space and cannot be added to another.");
                    ki(this);
                    var i = t.a, r = t.b;
                    i.activate();
                    r.activate();
                    this.constraints.push(t);
                    t.next_a = i.constraintList;
                    i.constraintList = t;
                    t.next_b = r.constraintList;
                    r.constraintList = t;
                    t.space = this;
                    return t;
                };
                Mi.prototype.filterArbiters = function(t, i) {
                    for (var e in this.cachedArbiters) {
                        var r = this.cachedArbiters[e];
                        if (t === r.body_a && (i === r.a || i === null) || t === r.body_b && (i === r.b || i === null)) {
                            if (i && r.state !== "cached") r.callSeparate(this);
                            r.unthread();
                            p(this.arbiters, r);
                            delete this.cachedArbiters[e];
                        }
                    }
                };
                Mi.prototype.removeShape = function(t) {
                    var i = t.body;
                    if (i.isStatic()) {
                        this.removeStaticShape(t);
                    } else {
                        e(this.containsShape(t), "Cannot remove a shape that was not added to the space. (Removed twice maybe?)");
                        ki(this);
                        i.activate();
                        i.removeShape(t);
                        this.filterArbiters(i, t);
                        this.activeShapes.remove(t, t.hashid);
                        t.space = null;
                    }
                };
                Mi.prototype.removeStaticShape = function(t) {
                    e(this.containsShape(t), "Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)");
                    ki(this);
                    var i = t.body;
                    if (i.isStatic()) i.activateStatic(t);
                    i.removeShape(t);
                    this.filterArbiters(i, t);
                    this.staticShapes.remove(t, t.hashid);
                    t.space = null;
                };
                Mi.prototype.removeBody = function(t) {
                    e(this.containsBody(t), "Cannot remove a body that was not added to the space. (Removed twice maybe?)");
                    ki(this);
                    t.activate();
                    p(this.bodies, t);
                    t.space = null;
                };
                Mi.prototype.removeConstraint = function(t) {
                    e(this.containsConstraint(t), "Cannot remove a constraint that was not added to the space. (Removed twice maybe?)");
                    ki(this);
                    t.a.activate();
                    t.b.activate();
                    p(this.constraints, t);
                    t.a.removeConstraint(t);
                    t.b.removeConstraint(t);
                    t.space = null;
                };
                Mi.prototype.containsShape = function(t) {
                    return t.space === this;
                };
                Mi.prototype.containsBody = function(t) {
                    return t.space == this;
                };
                Mi.prototype.containsConstraint = function(t) {
                    return t.space == this;
                };
                Mi.prototype.uncacheArbiter = function(t) {
                    delete this.cachedArbiters[c(t.a.hashid, t.b.hashid)];
                    p(this.arbiters, t);
                };
                Mi.prototype.eachBody = function(t) {
                    this.lock();
                    {
                        var i = this.bodies;
                        for (var e = 0; e < i.length; e++) {
                            t(i[e]);
                        }
                        var r = this.sleepingComponents;
                        for (var e = 0; e < r.length; e++) {
                            var s = r[e];
                            var n = s;
                            while (n) {
                                var a = n.nodeNext;
                                t(n);
                                n = a;
                            }
                        }
                    }
                    this.unlock(true);
                };
                Mi.prototype.eachShape = function(t) {
                    this.lock();
                    {
                        this.activeShapes.each(t);
                        this.staticShapes.each(t);
                    }
                    this.unlock(true);
                };
                Mi.prototype.eachConstraint = function(t) {
                    this.lock();
                    {
                        var i = this.constraints;
                        for (var e = 0; e < i.length; e++) {
                            t(i[e]);
                        }
                    }
                    this.unlock(true);
                };
                Mi.prototype.reindexStatic = function() {
                    e(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
                    this.staticShapes.each(function(t) {
                        var i = t.body;
                        t.update(i.p, i.rot);
                    });
                    this.staticShapes.reindex();
                };
                Mi.prototype.reindexShape = function(t) {
                    e(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
                    var i = t.body;
                    t.update(i.p, i.rot);
                    this.activeShapes.reindexObject(t, t.hashid);
                    this.staticShapes.reindexObject(t, t.hashid);
                };
                Mi.prototype.reindexShapesForBody = function(t) {
                    for (var i = t.shapeList; i; i = i.next) {
                        this.reindexShape(i);
                    }
                };
                Mi.prototype.useSpatialHash = function(t, i) {
                    throw new Error("Spatial Hash not implemented.");
                    var e = new SpaceHash(t, i, null);
                    var r = new SpaceHash(t, i, e);
                    this.staticShapes.each(function(t) {
                        e.insert(t, t.hashid);
                    });
                    this.activeShapes.each(function(t) {
                        r.insert(t, t.hashid);
                    });
                    this.staticShapes = e;
                    this.activeShapes = r;
                };
                Mi.prototype.activateBody = function(t) {
                    e(!t.isRogue(), "Internal error: Attempting to activate a rogue body.");
                    if (this.locked) {
                        if (this.rousedBodies.indexOf(t) === -1) this.rousedBodies.push(t);
                    } else {
                        this.bodies.push(t);
                        for (var i = 0; i < t.shapeList.length; i++) {
                            var r = t.shapeList[i];
                            this.staticShapes.remove(r, r.hashid);
                            this.activeShapes.insert(r, r.hashid);
                        }
                        for (var s = t.arbiterList; s; s = s.next(t)) {
                            var n = s.body_a;
                            if (t === n || n.isStatic()) {
                                var a = s.a, o = s.b;
                                this.cachedArbiters[c(a.hashid, o.hashid)] = s;
                                s.stamp = this.stamp;
                                s.handler = this.lookupHandler(a.collision_type, o.collision_type);
                                this.arbiters.push(s);
                            }
                        }
                        for (var h = t.constraintList; h; h = h.nodeNext) {
                            var n = h.a;
                            if (t === n || n.isStatic()) this.constraints.push(h);
                        }
                    }
                };
                Mi.prototype.deactivateBody = function(t) {
                    e(!t.isRogue(), "Internal error: Attempting to deactivate a rogue body.");
                    p(this.bodies, t);
                    for (var i = 0; i < t.shapeList.length; i++) {
                        var r = t.shapeList[i];
                        this.activeShapes.remove(r, r.hashid);
                        this.staticShapes.insert(r, r.hashid);
                    }
                    for (var s = t.arbiterList; s; s = s.next(t)) {
                        var n = s.body_a;
                        if (t === n || n.isStatic()) {
                            this.uncacheArbiter(s);
                        }
                    }
                    for (var a = t.constraintList; a; a = a.nodeNext) {
                        var n = a.a;
                        if (t === n || n.isStatic()) p(this.constraints, a);
                    }
                };
                var Pi = function t(i) {
                    return i ? i.nodeRoot : null;
                };
                var Li = function t(i) {
                    if (!i || !i.isSleeping(i)) return;
                    e(!i.isRogue(), "Internal Error: componentActivate() called on a rogue body.");
                    var r = i.space;
                    var s = i;
                    while (s) {
                        var n = s.nodeNext;
                        s.nodeIdleTime = 0;
                        s.nodeRoot = null;
                        s.nodeNext = null;
                        r.activateBody(s);
                        s = n;
                    }
                    p(r.sleepingComponents, i);
                };
                Pt.prototype.activate = function() {
                    if (!this.isRogue()) {
                        this.nodeIdleTime = 0;
                        Li(Pi(this));
                    }
                };
                Pt.prototype.activateStatic = function(t) {
                    e(this.isStatic(), "Body.activateStatic() called on a non-static body.");
                    for (var i = this.arbiterList; i; i = i.next(this)) {
                        if (!t || t == i.a || t == i.b) {
                            (i.body_a == this ? i.body_b : i.body_a).activate();
                        }
                    }
                };
                Pt.prototype.pushArbiter = function(t) {
                    s((t.body_a === this ? t.thread_a_next : t.thread_b_next) === null, "Internal Error: Dangling contact graph pointers detected. (A)");
                    s((t.body_a === this ? t.thread_a_prev : t.thread_b_prev) === null, "Internal Error: Dangling contact graph pointers detected. (B)");
                    var i = this.arbiterList;
                    s(i === null || (i.body_a === this ? i.thread_a_prev : i.thread_b_prev) === null, "Internal Error: Dangling contact graph pointers detected. (C)");
                    if (t.body_a === this) {
                        t.thread_a_next = i;
                    } else {
                        t.thread_b_next = i;
                    }
                    if (i) {
                        if (i.body_a === this) {
                            i.thread_a_prev = t;
                        } else {
                            i.thread_b_prev = t;
                        }
                    }
                    this.arbiterList = t;
                };
                var $i = function t(i, e) {
                    e.nodeRoot = i;
                    if (e !== i) {
                        e.nodeNext = i.nodeNext;
                        i.nodeNext = e;
                    }
                };
                var Ri = function t(i, e) {
                    if (!e.isRogue()) {
                        var r = Pi(e);
                        if (r == null) {
                            $i(i, e);
                            for (var n = e.arbiterList; n; n = n.next(e)) {
                                t(i, e == n.body_a ? n.body_b : n.body_a);
                            }
                            for (var a = e.constraintList; a; a = a.next(e)) {
                                t(i, e == a.a ? a.b : a.a);
                            }
                        } else {
                            s(r === i, "Internal Error: Inconsistency detected in the contact graph.");
                        }
                    }
                };
                var Fi = function t(i, e) {
                    for (var r = i; r; r = r.nodeNext) {
                        if (r.nodeIdleTime < e) return true;
                    }
                    return false;
                };
                Mi.prototype.processComponents = function(t) {
                    var i = this.sleepTimeThreshold !== Infinity;
                    var e = this.bodies;
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        s(n.nodeNext === null, "Internal Error: Dangling next pointer detected in contact graph.");
                        s(n.nodeRoot === null, "Internal Error: Dangling root pointer detected in contact graph.");
                    }
                    if (i) {
                        var a = this.idleSpeedThreshold;
                        var o = a ? a * a : Q(this.gravity) * t * t;
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            var h = o ? n.m * o : 0;
                            n.nodeIdleTime = n.kineticEnergy() > h ? 0 : n.nodeIdleTime + t;
                        }
                    }
                    var c = this.arbiters;
                    for (var r = 0, p = c.length; r < p; r++) {
                        var v = c[r];
                        var u = v.body_a, l = v.body_b;
                        if (i) {
                            if (l.isRogue() && !l.isStatic() || u.isSleeping()) u.activate();
                            if (u.isRogue() && !u.isStatic() || l.isSleeping()) l.activate();
                        }
                        u.pushArbiter(v);
                        l.pushArbiter(v);
                    }
                    if (i) {
                        var y = this.constraints;
                        for (var r = 0; r < y.length; r++) {
                            var f = y[r];
                            var u = f.a, l = f.b;
                            if (l.isRogue() && !l.isStatic()) u.activate();
                            if (u.isRogue() && !u.isStatic()) l.activate();
                        }
                        for (var r = 0; r < e.length; ) {
                            var n = e[r];
                            if (Pi(n) === null) {
                                Ri(n, n);
                                if (!Fi(n, this.sleepTimeThreshold)) {
                                    this.sleepingComponents.push(n);
                                    for (var b = n; b; b = b.nodeNext) {
                                        this.deactivateBody(b);
                                    }
                                    continue;
                                }
                            }
                            r++;
                            n.nodeRoot = null;
                            n.nodeNext = null;
                        }
                    }
                };
                Pt.prototype.sleep = function() {
                    this.sleepWithGroup(null);
                };
                Pt.prototype.sleepWithGroup = function(t) {
                    e(!this.isStatic() && !this.isRogue(), "Rogue and static bodies cannot be put to sleep.");
                    var i = this.space;
                    e(i, "Cannot put a rogue body to sleep.");
                    e(!i.locked, "Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback.");
                    e(t === null || t.isSleeping(), "Cannot use a non-sleeping body as a group identifier.");
                    if (this.isSleeping()) {
                        e(Pi(this) === Pi(t), "The body is already sleeping and it's group cannot be reassigned.");
                        return;
                    }
                    for (var r = 0; r < this.shapeList.length; r++) {
                        this.shapeList[r].update(this.p, this.rot);
                    }
                    i.deactivateBody(this);
                    if (t) {
                        var s = Pi(t);
                        this.nodeRoot = s;
                        this.nodeNext = s.nodeNext;
                        this.nodeIdleTime = 0;
                        s.nodeNext = this;
                    } else {
                        this.nodeRoot = this;
                        this.nodeNext = null;
                        this.nodeIdleTime = 0;
                        i.sleepingComponents.push(this);
                    }
                    p(i.bodies, this);
                };
                Mi.prototype.activateShapesTouchingShape = function(t) {
                    if (this.sleepTimeThreshold !== Infinity) {
                        this.shapeQuery(t, function(t, i) {
                            t.body.activate();
                        });
                    }
                };
                Mi.prototype.pointQuery = function(t, i, e, r) {
                    var s = function s(n) {
                        if (!(n.group && e === n.group) && i & n.layers && n.pointQuery(t)) {
                            r(n);
                        }
                    };
                    var n = new it(t.x, t.y, t.x, t.y);
                    this.lock();
                    {
                        this.activeShapes.query(n, s);
                        this.staticShapes.query(n, s);
                    }
                    this.unlock(true);
                };
                Mi.prototype.pointQueryFirst = function(t, i, e) {
                    var r = null;
                    this.pointQuery(t, i, e, function(t) {
                        if (!t.sensor) r = t;
                    });
                    return r;
                };
                Mi.prototype.nearestPointQuery = function(t, i, e, r, s) {
                    var n = function n(a) {
                        if (!(a.group && r === a.group) && e & a.layers) {
                            var o = a.nearestPointQuery(t);
                            if (o.d < i) s(a, o.d, o.p);
                        }
                    };
                    var a = et(t, i);
                    this.lock();
                    {
                        this.activeShapes.query(a, n);
                        this.staticShapes.query(a, n);
                    }
                    this.unlock(true);
                };
                Mi.prototype.nearestPointQueryNearest = function(t, i, e, r) {
                    var s;
                    var n = function n(a) {
                        if (!(a.group && r === a.group) && e & a.layers && !a.sensor) {
                            var o = a.nearestPointQuery(t);
                            if (o.d < i && (!s || o.d < s.d)) s = o;
                        }
                    };
                    var a = et(t, i);
                    this.activeShapes.query(a, n);
                    this.staticShapes.query(a, n);
                    return s;
                };
                Mi.prototype.segmentQuery = function(t, i, e, r, s) {
                    var n = function n(a) {
                        var o;
                        if (!(a.group && r === a.group) && e & a.layers && (o = a.segmentQuery(t, i))) {
                            s(a, o.t, o.n);
                        }
                        return 1;
                    };
                    this.lock();
                    {
                        this.staticShapes.segmentQuery(t, i, 1, n);
                        this.activeShapes.segmentQuery(t, i, 1, n);
                    }
                    this.unlock(true);
                };
                Mi.prototype.segmentQueryFirst = function(t, i, e, r) {
                    var s = null;
                    var n = function n(a) {
                        var o;
                        if (!(a.group && r === a.group) && e & a.layers && !a.sensor && (o = a.segmentQuery(t, i)) && (s === null || o.t < s.t)) {
                            s = o;
                        }
                        return s ? s.t : 1;
                    };
                    this.staticShapes.segmentQuery(t, i, 1, n);
                    this.activeShapes.segmentQuery(t, i, s ? s.t : 1, n);
                    return s;
                };
                Mi.prototype.bbQuery = function(t, i, e, r) {
                    var s = function s(n) {
                        if (!(n.group && e === n.group) && i & n.layers && st(t, n.bb_l, n.bb_b, n.bb_r, n.bb_t)) {
                            r(n);
                        }
                    };
                    this.lock();
                    {
                        this.activeShapes.query(t, s);
                        this.staticShapes.query(t, s);
                    }
                    this.unlock(true);
                };
                Mi.prototype.shapeQuery = function(t, i) {
                    var e = t.body;
                    if (e) {
                        t.update(e.p, e.rot);
                    }
                    var r = new it(t.bb_l, t.bb_b, t.bb_r, t.bb_t);
                    var s = false;
                    var n = function e(r) {
                        var n = t;
                        if (n.group && n.group === r.group || !(n.layers & r.layers) || n === r) return;
                        var a;
                        if (n.collisionCode <= r.collisionCode) {
                            a = Ii(n, r);
                        } else {
                            a = Ii(r, n);
                            for (var o = 0; o < a.length; o++) {
                                a[o].n = k(a[o].n);
                            }
                        }
                        if (a.length) {
                            s = !(n.sensor || r.sensor);
                            if (i) {
                                var h = new Array(a.length);
                                for (var o = 0; o < a.length; o++) {
                                    h[o] = new hi(a[o].p, a[o].n, a[o].dist);
                                }
                                i(r, h);
                            }
                        }
                    };
                    this.lock();
                    {
                        this.activeShapes.query(r, n);
                        this.staticShapes.query(r, n);
                    }
                    this.unlock(true);
                    return s;
                };
                Mi.prototype.addPostStepCallback = function(t) {
                    s(this.locked, "Adding a post-step callback when the space is not locked is unnecessary. " + "Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query.");
                    this.postStepCallbacks.push(t);
                };
                Mi.prototype.runPostStepCallbacks = function() {
                    for (var t = 0; t < this.postStepCallbacks.length; t++) {
                        this.postStepCallbacks[t]();
                    }
                    this.postStepCallbacks = [];
                };
                Mi.prototype.lock = function() {
                    this.locked++;
                };
                Mi.prototype.unlock = function(t) {
                    this.locked--;
                    e(this.locked >= 0, "Internal Error: Space lock underflow.");
                    if (this.locked === 0 && t) {
                        var i = this.rousedBodies;
                        for (var r = 0; r < i.length; r++) {
                            this.activateBody(i[r]);
                        }
                        i.length = 0;
                        this.runPostStepCallbacks();
                    }
                };
                Mi.prototype.makeCollideShapes = function() {
                    var t = this;
                    return function(i, e) {
                        var r = t;
                        if (!(i.bb_l <= e.bb_r && e.bb_l <= i.bb_r && i.bb_b <= e.bb_t && e.bb_b <= i.bb_t) || i.body === e.body || i.group && i.group === e.group || !(i.layers & e.layers)) return;
                        var s = r.lookupHandler(i.collision_type, e.collision_type);
                        var n = i.sensor || e.sensor;
                        if (n && s === Ci) return;
                        if (i.collisionCode > e.collisionCode) {
                            var a = i;
                            i = e;
                            e = a;
                        }
                        var o = Ii(i, e);
                        if (o.length === 0) return;
                        var h = c(i.hashid, e.hashid);
                        var p = r.cachedArbiters[h];
                        if (!p) {
                            p = r.cachedArbiters[h] = new oi(i, e);
                        }
                        p.update(o, s, i, e);
                        if (p.state == "first coll" && !s.begin(p, r)) {
                            p.ignore();
                        }
                        if (p.state !== "ignore" && s.preSolve(p, r) && !n) {
                            r.arbiters.push(p);
                        } else {
                            p.contacts = null;
                            if (p.state !== "ignore") p.state = "normal";
                        }
                        p.stamp = r.stamp;
                    };
                };
                Mi.prototype.arbiterSetFilter = function(t) {
                    var i = this.stamp - t.stamp;
                    var e = t.body_a, r = t.body_b;
                    if ((e.isStatic() || e.isSleeping()) && (r.isStatic() || r.isSleeping())) {
                        return true;
                    }
                    if (i >= 1 && t.state != "cached") {
                        t.callSeparate(this);
                        t.state = "cached";
                    }
                    if (i >= this.collisionPersistence) {
                        t.contacts = null;
                        return false;
                    }
                    return true;
                };
                var Vi = function t(i) {
                    var e = i.body;
                    i.update(e.p, e.rot);
                };
                Mi.prototype.step = function(t) {
                    if (t === 0) return;
                    e(w.x === 0 && w.y === 0, "vzero is invalid");
                    this.stamp++;
                    var i = this.curr_dt;
                    this.curr_dt = t;
                    var r;
                    var s;
                    var n;
                    var a = this.bodies;
                    var o = this.constraints;
                    var h = this.arbiters;
                    for (r = 0; r < h.length; r++) {
                        var c = h[r];
                        c.state = "normal";
                        if (!c.body_a.isSleeping() && !c.body_b.isSleeping()) {
                            c.unthread();
                        }
                    }
                    h.length = 0;
                    this.lock();
                    {
                        for (r = 0; r < a.length; r++) {
                            a[r].position_func(t);
                        }
                        this.activeShapes.each(Vi);
                        this.activeShapes.reindexQuery(this.collideShapes);
                    }
                    this.unlock(false);
                    this.processComponents(t);
                    this.lock();
                    {
                        for (n in this.cachedArbiters) {
                            if (!this.arbiterSetFilter(this.cachedArbiters[n])) {
                                delete this.cachedArbiters[n];
                            }
                        }
                        var p = this.collisionSlop;
                        var v = 1 - Math.pow(this.collisionBias, t);
                        for (r = 0; r < h.length; r++) {
                            h[r].preStep(t, p, v);
                        }
                        for (r = 0; r < o.length; r++) {
                            var u = o[r];
                            u.preSolve(this);
                            u.preStep(t);
                        }
                        var l = Math.pow(this.damping, t);
                        var y = this.gravity;
                        for (r = 0; r < a.length; r++) {
                            a[r].velocity_func(y, l, t);
                        }
                        var f = i === 0 ? 0 : t / i;
                        for (r = 0; r < h.length; r++) {
                            h[r].applyCachedImpulse(f);
                        }
                        for (r = 0; r < o.length; r++) {
                            o[r].applyCachedImpulse(f);
                        }
                        for (r = 0; r < this.iterations; r++) {
                            for (s = 0; s < h.length; s++) {
                                h[s].applyImpulse();
                            }
                            for (s = 0; s < o.length; s++) {
                                o[s].applyImpulse();
                            }
                        }
                        for (r = 0; r < o.length; r++) {
                            o[r].postSolve(this);
                        }
                        for (r = 0; r < h.length; r++) {
                            h[r].handler.postSolve(h[r], this);
                        }
                    }
                    this.unlock(true);
                };
                var Ni = function t(i, e, r, s) {
                    var n = i.vx + -r.y * i.w;
                    var a = i.vy + r.x * i.w;
                    var o = e.vx + -s.y * e.w;
                    var h = e.vy + s.x * e.w;
                    return new m(o - n, h - a);
                };
                var Ti = function t(i, e, r, s, n) {
                    var a = i.vx + -r.y * i.w;
                    var o = i.vy + r.x * i.w;
                    var h = e.vx + -s.y * e.w;
                    var c = e.vy + s.x * e.w;
                    return A(h - a, c - o, n.x, n.y);
                };
                var Qi = function t(i, e, r, s) {
                    i.vx += e * i.m_inv;
                    i.vy += r * i.m_inv;
                    i.w += i.i_inv * (s.x * r - s.y * e);
                };
                var Oi = function t(i, e, r, s, n, a) {
                    Qi(i, -n, -a, r);
                    Qi(e, n, a, s);
                };
                var qi = function t(i, e, r, s) {
                    i.v_biasx += e * i.m_inv;
                    i.v_biasy += r * i.m_inv;
                    i.w_bias += i.i_inv * $(s.x, s.y, e, r);
                };
                var Ei = function t(i, e, r) {
                    var s = L(e, r);
                    return i.m_inv + i.i_inv * s * s;
                };
                var Hi = function t(i, e, r, n, a) {
                    var o = Ei(i, r, a) + Ei(e, n, a);
                    s(o !== 0, "Unsolvable collision or constraint.");
                    return o;
                };
                var Di = function t(i, e, r, n, a, o) {
                    var h, c, p, v;
                    var u = i.m_inv + e.m_inv;
                    h = u;
                    c = 0;
                    p = 0;
                    v = u;
                    var l = i.i_inv;
                    var y = r.x * r.x * l;
                    var f = r.y * r.y * l;
                    var b = -r.x * r.y * l;
                    h += f;
                    c += b;
                    p += b;
                    v += y;
                    var d = e.i_inv;
                    var _ = n.x * n.x * d;
                    var x = n.y * n.y * d;
                    var g = -n.x * n.y * d;
                    h += x;
                    c += g;
                    p += g;
                    v += _;
                    var m = h * v - c * p;
                    s(m !== 0, "Unsolvable constraint.");
                    var w = 1 / m;
                    a.x = v * w;
                    a.y = -c * w;
                    o.x = -p * w;
                    o.y = h * w;
                };
                var zi = function t(i, e, r) {
                    return new m(S(i, e), S(i, r));
                };
                var Gi = function t(i, e) {
                    return 1 - Math.pow(i, e);
                };
                var Wi = t.Constraint = function(t, i) {
                    this.a = t;
                    this.b = i;
                    this.space = null;
                    this.next_a = null;
                    this.next_b = null;
                    this.maxForce = Infinity;
                    this.errorBias = Math.pow(1 - .1, 60);
                    this.maxBias = Infinity;
                };
                Wi.prototype.activateBodies = function() {
                    if (this.a) this.a.activate();
                    if (this.b) this.b.activate();
                };
                Wi.prototype.preStep = function(t) {};
                Wi.prototype.applyCachedImpulse = function(t) {};
                Wi.prototype.applyImpulse = function() {};
                Wi.prototype.getImpulse = function() {
                    return 0;
                };
                Wi.prototype.preSolve = function(t) {};
                Wi.prototype.postSolve = function(t) {};
                Wi.prototype.next = function(t) {
                    return this.a === t ? this.next_a : this.next_b;
                };
                var Ji = t.PinJoint = function(t, i, e, r) {
                    Wi.call(this, t, i);
                    this.anchr1 = e;
                    this.anchr2 = r;
                    var n = t ? C(t.p, N(e, t.rot)) : e;
                    var a = i ? C(i.p, N(r, i.rot)) : r;
                    this.dist = j(M(a, n));
                    s(this.dist > 0, "You created a 0 length pin joint. A pivot joint will be much more stable.");
                    this.r1 = this.r2 = null;
                    this.n = null;
                    this.nMass = 0;
                    this.jnAcc = this.jnMax = 0;
                    this.bias = 0;
                };
                Ji.prototype = Object.create(Wi.prototype);
                Ji.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    this.r1 = N(this.anchr1, i.rot);
                    this.r2 = N(this.anchr2, e.rot);
                    var r = M(C(e.p, this.r2), C(i.p, this.r1));
                    var s = j(r);
                    this.n = P(r, 1 / (s ? s : Infinity));
                    this.nMass = 1 / Hi(i, e, this.r1, this.r2, this.n);
                    var n = this.maxBias;
                    this.bias = d(-Gi(this.errorBias, t) * (s - this.dist) / t, -n, n);
                    this.jnMax = this.maxForce * t;
                };
                Ji.prototype.applyCachedImpulse = function(t) {
                    var i = P(this.n, this.jnAcc * t);
                    Oi(this.a, this.b, this.r1, this.r2, i.x, i.y);
                };
                Ji.prototype.applyImpulse = function() {
                    var t = this.a;
                    var i = this.b;
                    var e = this.n;
                    var r = Ti(t, i, this.r1, this.r2, e);
                    var s = (this.bias - r) * this.nMass;
                    var n = this.jnAcc;
                    this.jnAcc = d(n + s, -this.jnMax, this.jnMax);
                    s = this.jnAcc - n;
                    Oi(t, i, this.r1, this.r2, e.x * s, e.y * s);
                };
                Ji.prototype.getImpulse = function() {
                    return Math.abs(this.jnAcc);
                };
                var Yi = t.SlideJoint = function(t, i, e, r, s, n) {
                    Wi.call(this, t, i);
                    this.anchr1 = e;
                    this.anchr2 = r;
                    this.min = s;
                    this.max = n;
                    this.r1 = this.r2 = this.n = null;
                    this.nMass = 0;
                    this.jnAcc = this.jnMax = 0;
                    this.bias = 0;
                };
                Yi.prototype = Object.create(Wi.prototype);
                Yi.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    this.r1 = N(this.anchr1, i.rot);
                    this.r2 = N(this.anchr2, e.rot);
                    var r = M(C(e.p, this.r2), C(i.p, this.r1));
                    var s = j(r);
                    var n = 0;
                    if (s > this.max) {
                        n = s - this.max;
                        this.n = H(r);
                    } else if (s < this.min) {
                        n = this.min - s;
                        this.n = k(H(r));
                    } else {
                        this.n = w;
                        this.jnAcc = 0;
                    }
                    this.nMass = 1 / Hi(i, e, this.r1, this.r2, this.n);
                    var a = this.maxBias;
                    this.bias = d(-Gi(this.errorBias, t) * n / t, -a, a);
                    this.jnMax = this.maxForce * t;
                };
                Yi.prototype.applyCachedImpulse = function(t) {
                    var i = this.jnAcc * t;
                    Oi(this.a, this.b, this.r1, this.r2, this.n.x * i, this.n.y * i);
                };
                Yi.prototype.applyImpulse = function() {
                    if (this.n.x === 0 && this.n.y === 0) return;
                    var t = this.a;
                    var i = this.b;
                    var e = this.n;
                    var r = this.r1;
                    var s = this.r2;
                    var n = Ni(t, i, r, s);
                    var a = S(n, e);
                    var o = (this.bias - a) * this.nMass;
                    var h = this.jnAcc;
                    this.jnAcc = d(h + o, -this.jnMax, 0);
                    o = this.jnAcc - h;
                    Oi(t, i, this.r1, this.r2, e.x * o, e.y * o);
                };
                Yi.prototype.getImpulse = function() {
                    return Math.abs(this.jnAcc);
                };
                var Ui = t.PivotJoint = function(t, i, e, r) {
                    Wi.call(this, t, i);
                    if (typeof r === "undefined") {
                        var s = e;
                        e = t ? t.world2Local(s) : s;
                        r = i ? i.world2Local(s) : s;
                    }
                    this.anchr1 = e;
                    this.anchr2 = r;
                    this.r1 = this.r2 = w;
                    this.k1 = new m(0, 0);
                    this.k2 = new m(0, 0);
                    this.jAcc = w;
                    this.jMaxLen = 0;
                    this.bias = w;
                };
                Ui.prototype = Object.create(Wi.prototype);
                Ui.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    this.r1 = N(this.anchr1, i.rot);
                    this.r2 = N(this.anchr2, e.rot);
                    Di(i, e, this.r1, this.r2, this.k1, this.k2);
                    this.jMaxLen = this.maxForce * t;
                    var r = M(C(e.p, this.r2), C(i.p, this.r1));
                    this.bias = D(P(r, -Gi(this.errorBias, t) / t), this.maxBias);
                };
                Ui.prototype.applyCachedImpulse = function(t) {
                    Oi(this.a, this.b, this.r1, this.r2, this.jAcc.x * t, this.jAcc.y * t);
                };
                Ui.prototype.applyImpulse = function() {
                    var t = this.a;
                    var i = this.b;
                    var e = this.r1;
                    var r = this.r2;
                    var s = Ni(t, i, e, r);
                    var n = zi(M(this.bias, s), this.k1, this.k2);
                    var a = this.jAcc;
                    this.jAcc = D(C(this.jAcc, n), this.jMaxLen);
                    Oi(t, i, this.r1, this.r2, this.jAcc.x - a.x, this.jAcc.y - a.y);
                };
                Ui.prototype.getImpulse = function() {
                    return j(this.jAcc);
                };
                var Ki = t.GrooveJoint = function(t, i, e, r, s) {
                    Wi.call(this, t, i);
                    this.grv_a = e;
                    this.grv_b = r;
                    this.grv_n = R(E(M(r, e)));
                    this.anchr2 = s;
                    this.grv_tn = null;
                    this.clamp = 0;
                    this.r1 = this.r2 = null;
                    this.k1 = new m(0, 0);
                    this.k2 = new m(0, 0);
                    this.jAcc = w;
                    this.jMaxLen = 0;
                    this.bias = null;
                };
                Ki.prototype = Object.create(Wi.prototype);
                Ki.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = i.local2World(this.grv_a);
                    var s = i.local2World(this.grv_b);
                    var n = N(this.grv_n, i.rot);
                    var a = S(r, n);
                    this.grv_tn = n;
                    this.r2 = N(this.anchr2, e.rot);
                    var o = L(C(e.p, this.r2), n);
                    if (o <= L(r, n)) {
                        this.clamp = 1;
                        this.r1 = M(r, i.p);
                    } else if (o >= L(s, n)) {
                        this.clamp = -1;
                        this.r1 = M(s, i.p);
                    } else {
                        this.clamp = 0;
                        this.r1 = M(C(P(R(n), -o), P(n, a)), i.p);
                    }
                    Di(i, e, this.r1, this.r2, this.k1, this.k2);
                    this.jMaxLen = this.maxForce * t;
                    var h = M(C(e.p, this.r2), C(i.p, this.r1));
                    this.bias = D(P(h, -Gi(this.errorBias, t) / t), this.maxBias);
                };
                Ki.prototype.applyCachedImpulse = function(t) {
                    Oi(this.a, this.b, this.r1, this.r2, this.jAcc.x * t, this.jAcc.y * t);
                };
                Ki.prototype.grooveConstrain = function(t) {
                    var i = this.grv_tn;
                    var e = this.clamp * L(t, i) > 0 ? t : V(t, i);
                    return D(e, this.jMaxLen);
                };
                Ki.prototype.applyImpulse = function() {
                    var t = this.a;
                    var i = this.b;
                    var e = this.r1;
                    var r = this.r2;
                    var s = Ni(t, i, e, r);
                    var n = zi(M(this.bias, s), this.k1, this.k2);
                    var a = this.jAcc;
                    this.jAcc = this.grooveConstrain(C(a, n));
                    Oi(t, i, this.r1, this.r2, this.jAcc.x - a.x, this.jAcc.y - a.y);
                };
                Ki.prototype.getImpulse = function() {
                    return j(this.jAcc);
                };
                Ki.prototype.setGrooveA = function(t) {
                    this.grv_a = t;
                    this.grv_n = R(E(M(this.grv_b, t)));
                    this.activateBodies();
                };
                Ki.prototype.setGrooveB = function(t) {
                    this.grv_b = t;
                    this.grv_n = R(E(M(t, this.grv_a)));
                    this.activateBodies();
                };
                var Xi = function t(i, e) {
                    return (i.restLength - e) * i.stiffness;
                };
                var Zi = t.DampedSpring = function(t, i, e, r, s, n, a) {
                    Wi.call(this, t, i);
                    this.anchr1 = e;
                    this.anchr2 = r;
                    this.restLength = s;
                    this.stiffness = n;
                    this.damping = a;
                    this.springForceFunc = Xi;
                    this.target_vrn = this.v_coef = 0;
                    this.r1 = this.r2 = null;
                    this.nMass = 0;
                    this.n = null;
                };
                Zi.prototype = Object.create(Wi.prototype);
                Zi.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    this.r1 = N(this.anchr1, i.rot);
                    this.r2 = N(this.anchr2, e.rot);
                    var r = M(C(e.p, this.r2), C(i.p, this.r1));
                    var n = j(r);
                    this.n = P(r, 1 / (n ? n : Infinity));
                    var a = Hi(i, e, this.r1, this.r2, this.n);
                    s(a !== 0, "Unsolvable this.");
                    this.nMass = 1 / a;
                    this.target_vrn = 0;
                    this.v_coef = 1 - Math.exp(-this.damping * t * a);
                    var o = this.springForceFunc(this, n);
                    Oi(i, e, this.r1, this.r2, this.n.x * o * t, this.n.y * o * t);
                };
                Zi.prototype.applyCachedImpulse = function(t) {};
                Zi.prototype.applyImpulse = function() {
                    var t = this.a;
                    var i = this.b;
                    var e = this.n;
                    var r = this.r1;
                    var s = this.r2;
                    var n = Ti(t, i, r, s, e);
                    var a = (this.target_vrn - n) * this.v_coef;
                    this.target_vrn = n + a;
                    a *= this.nMass;
                    Oi(t, i, this.r1, this.r2, this.n.x * a, this.n.y * a);
                };
                Zi.prototype.getImpulse = function() {
                    return 0;
                };
                var te = function t(i, e) {
                    return (e - i.restAngle) * i.stiffness;
                };
                var ie = t.DampedRotarySpring = function(t, i, e, r, s) {
                    Wi.call(this, t, i);
                    this.restAngle = e;
                    this.stiffness = r;
                    this.damping = s;
                    this.springTorqueFunc = te;
                    this.target_wrn = 0;
                    this.w_coef = 0;
                    this.iSum = 0;
                };
                ie.prototype = Object.create(Wi.prototype);
                ie.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = i.i_inv + e.i_inv;
                    s(r !== 0, "Unsolvable spring.");
                    this.iSum = 1 / r;
                    this.w_coef = 1 - Math.exp(-this.damping * t * r);
                    this.target_wrn = 0;
                    var n = this.springTorqueFunc(this, i.a - e.a) * t;
                    i.w -= n * i.i_inv;
                    e.w += n * e.i_inv;
                };
                ie.prototype.applyImpulse = function() {
                    var t = this.a;
                    var i = this.b;
                    var e = t.w - i.w;
                    var r = (this.target_wrn - e) * this.w_coef;
                    this.target_wrn = e + r;
                    var s = r * this.iSum;
                    t.w += s * t.i_inv;
                    i.w -= s * i.i_inv;
                };
                var ee = t.RotaryLimitJoint = function(t, i, e, r) {
                    Wi.call(this, t, i);
                    this.min = e;
                    this.max = r;
                    this.jAcc = 0;
                    this.iSum = this.bias = this.jMax = 0;
                };
                ee.prototype = Object.create(Wi.prototype);
                ee.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = e.a - i.a;
                    var s = 0;
                    if (r > this.max) {
                        s = this.max - r;
                    } else if (r < this.min) {
                        s = this.min - r;
                    }
                    this.iSum = 1 / (1 / i.i + 1 / e.i);
                    var n = this.maxBias;
                    this.bias = d(-Gi(this.errorBias, t) * s / t, -n, n);
                    this.jMax = this.maxForce * t;
                    if (!this.bias) this.jAcc = 0;
                };
                ee.prototype.applyCachedImpulse = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = this.jAcc * t;
                    i.w -= r * i.i_inv;
                    e.w += r * e.i_inv;
                };
                ee.prototype.applyImpulse = function() {
                    if (!this.bias) return;
                    var t = this.a;
                    var i = this.b;
                    var e = i.w - t.w;
                    var r = -(this.bias + e) * this.iSum;
                    var s = this.jAcc;
                    if (this.bias < 0) {
                        this.jAcc = d(s + r, 0, this.jMax);
                    } else {
                        this.jAcc = d(s + r, -this.jMax, 0);
                    }
                    r = this.jAcc - s;
                    t.w -= r * t.i_inv;
                    i.w += r * i.i_inv;
                };
                ee.prototype.getImpulse = function() {
                    return Math.abs(joint.jAcc);
                };
                var re = t.RatchetJoint = function(t, i, e, r) {
                    Wi.call(this, t, i);
                    this.angle = 0;
                    this.phase = e;
                    this.ratchet = r;
                    this.angle = (i ? i.a : 0) - (t ? t.a : 0);
                    this.iSum = this.bias = this.jAcc = this.jMax = 0;
                };
                re.prototype = Object.create(Wi.prototype);
                re.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = this.angle;
                    var s = this.phase;
                    var n = this.ratchet;
                    var a = e.a - i.a;
                    var o = r - a;
                    var h = 0;
                    if (o * n > 0) {
                        h = o;
                    } else {
                        this.angle = Math.floor((a - s) / n) * n + s;
                    }
                    this.iSum = 1 / (i.i_inv + e.i_inv);
                    var c = this.maxBias;
                    this.bias = d(-Gi(this.errorBias, t) * h / t, -c, c);
                    this.jMax = this.maxForce * t;
                    if (!this.bias) this.jAcc = 0;
                };
                re.prototype.applyCachedImpulse = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = this.jAcc * t;
                    i.w -= r * i.i_inv;
                    e.w += r * e.i_inv;
                };
                re.prototype.applyImpulse = function() {
                    if (!this.bias) return;
                    var t = this.a;
                    var i = this.b;
                    var e = i.w - t.w;
                    var r = this.ratchet;
                    var s = -(this.bias + e) * this.iSum;
                    var n = this.jAcc;
                    this.jAcc = d((n + s) * r, 0, this.jMax * Math.abs(r)) / r;
                    s = this.jAcc - n;
                    t.w -= s * t.i_inv;
                    i.w += s * i.i_inv;
                };
                re.prototype.getImpulse = function(t) {
                    return Math.abs(t.jAcc);
                };
                var se = t.GearJoint = function(t, i, e, r) {
                    Wi.call(this, t, i);
                    this.phase = e;
                    this.ratio = r;
                    this.ratio_inv = 1 / r;
                    this.jAcc = 0;
                    this.iSum = this.bias = this.jMax = 0;
                };
                se.prototype = Object.create(Wi.prototype);
                se.prototype.preStep = function(t) {
                    var i = this.a;
                    var e = this.b;
                    this.iSum = 1 / (i.i_inv * this.ratio_inv + this.ratio * e.i_inv);
                    var r = this.maxBias;
                    this.bias = d(-Gi(this.errorBias, t) * (e.a * this.ratio - i.a - this.phase) / t, -r, r);
                    this.jMax = this.maxForce * t;
                };
                se.prototype.applyCachedImpulse = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = this.jAcc * t;
                    i.w -= r * i.i_inv * this.ratio_inv;
                    e.w += r * e.i_inv;
                };
                se.prototype.applyImpulse = function() {
                    var t = this.a;
                    var i = this.b;
                    var e = i.w * this.ratio - t.w;
                    var r = (this.bias - e) * this.iSum;
                    var s = this.jAcc;
                    this.jAcc = d(s + r, -this.jMax, this.jMax);
                    r = this.jAcc - s;
                    t.w -= r * t.i_inv * this.ratio_inv;
                    i.w += r * i.i_inv;
                };
                se.prototype.getImpulse = function() {
                    return Math.abs(this.jAcc);
                };
                se.prototype.setRatio = function(t) {
                    this.ratio = t;
                    this.ratio_inv = 1 / t;
                    this.activateBodies();
                };
                var ne = t.SimpleMotor = function(t, i, e) {
                    Wi.call(this, t, i);
                    this.rate = e;
                    this.jAcc = 0;
                    this.iSum = this.jMax = 0;
                };
                ne.prototype = Object.create(Wi.prototype);
                ne.prototype.preStep = function(t) {
                    this.iSum = 1 / (this.a.i_inv + this.b.i_inv);
                    this.jMax = this.maxForce * t;
                };
                ne.prototype.applyCachedImpulse = function(t) {
                    var i = this.a;
                    var e = this.b;
                    var r = this.jAcc * t;
                    i.w -= r * i.i_inv;
                    e.w += r * e.i_inv;
                };
                ne.prototype.applyImpulse = function() {
                    var t = this.a;
                    var i = this.b;
                    var e = i.w - t.w + this.rate;
                    var r = -e * this.iSum;
                    var s = this.jAcc;
                    this.jAcc = d(s + r, -this.jMax, this.jMax);
                    r = this.jAcc - s;
                    t.w -= r * t.i_inv;
                    i.w += r * i.i_inv;
                };
                ne.prototype.getImpulse = function() {
                    return Math.abs(this.jAcc);
                };
            })();
        },
        83: function(t, i, e) {
            "use strict";
            var r = e(30);
            var s = c(r);
            var n = e(1);
            var a = c(n);
            var o = e(2);
            var h = c(o);
            function c(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            var p = a.default.firstValuable;
            var v = typeof window !== "undefined";
            var u = function t(i, e, r) {
                return p(i[e][r], i[e]);
            };
            var l = function t(i) {
                console.error("[Easycanvas-physics] " + i);
            };
            var y = s.default;
            var f = function t(i) {
                if (!i.physics) return;
                var e = this;
                e.physics = e.physics || {};
                e.physics.shape = e.physics.shape || [];
                e.physics.gravity = p(e.physics.gravity, 2);
                e.physics.accuracy = p(e.physics.accuracy, 2);
                e.physics.friction = p(e.physics.friction, 0);
                e.physics.elasticity = p(e.physics.elasticity, 0);
                e.physics.group = p(e.physics.group, 0);
                e.physics.collisionType = p(e.physics.collisionType, 0);
                if (!e.physics.static && e.physics.shape.length) {
                    e.physics.mass = p(e.physics.mass, 0);
                    var r = void 0;
                    if (e.physics.shape[0].length === 3) {
                        r = y.momentForCircle(e.physics.mass, 0, e.physics.shape[0][2], y.vzero);
                    } else {
                        var s = e.physics.shape.join(",").split(",").map(function(t, i) {
                            var e = Number(t);
                            var r = i % 2 ? -e : e;
                            return r ? r : 0;
                        });
                        r = y.momentForPoly(e.physics.mass, s, y.vzero);
                    }
                    e.physics.moment = p(e.physics.moment, r);
                }
                e.launch = _.bind(e);
                e.physicsOff = function() {
                    if (!e.$physics) return this;
                    e.$physics.inSpace = false;
                    if (e.$physics.body) {
                        e.$physics.space.removeBody(e.$physics.body);
                    }
                    e.$physics.shape.forEach(function(t) {
                        e.$physics.space.removeShape(t);
                    });
                    e.$physics = null;
                    return this;
                };
                e.physicsOn = function() {
                    var t = this;
                    if (!this.$physics) {
                        g(this);
                    }
                    if (!this.$physics) return this;
                    this.$physics.inSpace = true;
                    if (this.$physics.body) {
                        this.$physics.body.setPos(new y.Vect(this.getRect().tx + this.getRect().tw / 2, -this.getRect().ty - this.getRect().th / 2));
                    }
                    this.$physics.body && this.$physics.space.addBody(this.$physics.body);
                    this.$physics.shape && this.$physics.shape.forEach(function(i) {
                        t.$physics.space[t.physics.static ? "addStaticShape" : "addShape"](i);
                    });
                    this.children.forEach(function(i) {
                        t.physicsOn.call(i);
                    });
                    return this;
                };
                e.physicsSetVelocity = function(t) {
                    if (!e.$physics) return;
                    if (!e.$physics.body) {
                        if (true) {
                            l("Can not set velocity to static sprite.");
                        }
                        return this;
                    }
                    e.$physics.body.setVel({
                        x: t.x,
                        y: -t.y
                    });
                    return this;
                };
                e.physicsGetVelocity = function() {
                    if (!e.$physics) return;
                    if (!e.$physics.body) {
                        if (true) {
                            l("Can not get velocity of static sprite.");
                        }
                        return this;
                    }
                    var t = e.$physics.body.getVel();
                    t.y = -t.y;
                    return t;
                };
                e.physicsApplyImpulse = function() {
                    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
                        x: 0,
                        y: 0
                    };
                    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                        x: 0,
                        y: 0
                    };
                    if (!e.$physics) return;
                    if (!e.$physics.body) {
                        if (true) {
                            l("Can not apply impulse to static sprite.");
                        }
                        return this;
                    }
                    t.y = -t.y;
                    i.y = -i.y;
                    e.$physics.body.applyImpulse(t, i);
                    return this;
                };
                e.physicsGetAngelVelocity = function() {
                    if (!e.$physics) return;
                    if (!e.$physics.body) {
                        if (true) {
                            l("Can not get angel velocity of static sprite.");
                        }
                        return this;
                    }
                    return e.$physics.body.getAngVel();
                };
                e.physicsSetAngelVelocity = function(t) {
                    if (!e.$physics) return;
                    if (!e.$physics.body) {
                        if (true) {
                            l("Can not set angel velocity to static sprite.");
                        }
                        return this;
                    }
                    e.$physics.body.setVel(t);
                    return this;
                };
                e.physicsApplyForce = function(t) {
                    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                        x: 0,
                        y: 0
                    };
                    if (!e.$physics) return this;
                    if (!e.$physics.body) return this;
                    e.$physics.body.applyForce({
                        x: t.x,
                        y: -t.y
                    }, {
                        x: t.x,
                        y: t.y
                    });
                    return this;
                };
                e.physicsResetForces = function() {
                    e.$physics.body.resetForces();
                    return this;
                };
                e.on("beforeTick", function(t) {
                    if (!e.$physics || !e.physics) return;
                    if (e.physics.static) return;
                    if (e.$physics.inSpace === false) return;
                    e.$physics.body && d(e.$physics.body, e);
                });
            };
            var b = function t(i) {
                return new y.Vect(i.x, i.y ? -i.y : 0);
            };
            var d = function t(i, e) {
                var r = i.getPos();
                var s = i.getVel();
                e.style.rotate = i.a * 180 / Math.PI;
                e.style.tx = r.x;
                e.style.ty = -r.y;
                if (e.style.locate === "lt") {
                    e.style.tx -= e.getRect().tw / 2;
                    e.style.ty -= e.getRect().th / 2;
                } else if (e.style.locate === "ld") {
                    e.style.tx -= e.getRect().tw / 2;
                    e.style.ty += e.getRect().th / 2;
                } else if (e.style.locate === "rd") {
                    e.style.tx += e.getRect().tw / 2;
                    e.style.ty += e.getRect().th / 2;
                } else if (e.style.locate === "rt") {
                    e.style.tx += e.getRect().tw / 2;
                    e.style.ty -= e.getRect().th / 2;
                }
            };
            function _() {
                var t = new y.Space();
                t.gravity = new y.Vect(0, this.physics.gravity * -500);
                if (true) {
                    if (!this.$canvas) {
                        l("Sprite must be added to an instance before lanuching physics.");
                    }
                }
                this.on("beforeTick", function(i) {
                    var e = .01 * (this.$canvas.maxFps > 0 ? this.$canvas.maxFps : 60) / 60;
                    for (var r = 0; r < this.physics.accuracy; r++) {
                        t.step(e);
                    }
                });
                this.$physics = {
                    space: t
                };
                var i = function i(e) {
                    return function(i) {
                        var r = i.a.$sprite.trigger(e, i.b.$sprite, i.b.$sprite.physics.collisionType, i, t);
                        var s = i.b.$sprite.trigger(e, i.a.$sprite, i.a.$sprite.physics.collisionType, i, t);
                        return !(r || s);
                    };
                };
                t.setDefaultCollisionHandler(i("physicsCollisionBegin"), i("physicsCollisionPreSolve"), i("physicsCollisionPostSolve"), i("physicsCollisionSeparate"));
                t.$sprite = this;
                return t;
            }
            function x(t) {
                if (t.$parent) {
                    if (t.$parent.$physics && t.$parent.$physics.space) {
                        return t.$parent;
                    }
                    return x(t.$parent);
                }
                return null;
            }
            function g(t) {
                var i = t.physics;
                if (i) {
                    var e = x(t);
                    if (!e) {
                        l("No physics container found launched.");
                        return;
                    }
                    var r = e.$physics.space;
                    t.$physics = {
                        space: r
                    };
                    if (!i.shape.length) return;
                    var s = i.shape;
                    var n = void 0;
                    var a = [];
                    if (!i.static) {
                        n = new y.Body(i.mass, i.moment);
                    }
                    s.forEach(function(s, o) {
                        var c = void 0;
                        var p = t.getStyle("tx"), v = t.getStyle("ty"), l = e.getStyle("tx"), f = e.getStyle("ty");
                        if (s.length === 3 && !s[0].length) {
                            var d = n ? y.vzero : {
                                x: p - l,
                                y: -v + f
                            };
                            c = new y.CircleShape(n || r.staticBody, s[2], d);
                        } else if (s.length >= 3) {
                            var _ = t.style.rx || t.getRect().tx + t.getRect().tw / 2;
                            var x = t.style.ry || t.getRect().ty + t.getRect().th / 2;
                            var g = s.map(function(i) {
                                var e = (0, h.default)(i[0] + p - l, i[1] + v + f, _ - l, x + f, t.style.rotate || 0);
                                return [ e.x - p, e.y - v ];
                            }).join(",").split(",").map(function(t, i) {
                                var e = Number(t);
                                var r = i % 2 ? -e : e;
                                return r ? r : 0;
                            });
                            var m = n ? y.vzero : {
                                x: p - l,
                                y: -v + f
                            };
                            c = new y.PolyShape(n || r.staticBody, g, m);
                        } else if (s.length === 2) {
                            var w = t.style.rx || t.getRect().tx + t.getRect().tw / 2;
                            var S = t.style.ry || t.getRect().ty + t.getRect().th / 2;
                            var A = (0, h.default)(s[0][0] + p - l, s[0][1] + v + f, w - l, S + f, t.style.rotate || 0);
                            var j = (0, h.default)(s[1][0] + p - l, s[1][1] + v + f, w - l, S + f, t.style.rotate || 0);
                            A.x -= p;
                            A.y -= v;
                            j.x -= p;
                            j.y -= v;
                            c = new y.SegmentShape(r.staticBody, b(A), b(j), 0);
                        }
                        c.setFriction(u(i, "friction", o));
                        c.setElasticity(u(i, "elasticity", o));
                        c.setCollisionType(u(i, "collisionType", o));
                        c.group = u(i, "group", o);
                        c.$sprite = t;
                        a.push(c);
                    });
                    t.$physics.body = n;
                    t.$physics.shape = a;
                    if (n) {
                        n.$sprite = t;
                    }
                }
            }
            if (v && window.Easycanvas) {
                Easycanvas.extend(f);
            } else {
                t.exports = f;
            }
        }
    });
});

