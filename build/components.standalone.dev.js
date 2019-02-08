(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var i = r();
        for (var n in i) (typeof exports === "object" ? exports : t)[n] = i[n];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function r(i) {
            if (t[i]) return t[i].exports;
            var n = t[i] = {
                exports: {},
                id: i,
                loaded: false
            };
            e[i].call(n.exports, n, n.exports, r);
            n.loaded = true;
            return n.exports;
        }
        r.m = e;
        r.c = t;
        r.p = "";
        return r(0);
    }([ function(e, t, r) {
        e.exports = r(95);
    }, function(e, t) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            },
            funcOrValue: function e(t, r) {
                if (typeof t === "function") {
                    return t.call(r);
                }
                return t;
            },
            execFuncs: function e(t, i, n) {
                if (t) {
                    if (!r.isArray(n)) {
                        n = [ n ];
                    }
                }
                if (typeof t === "function") {
                    t.apply(i, n);
                } else if (r.isArray(t)) {
                    t.length && t.forEach(function(e) {
                        e && e.apply(i, n);
                    });
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function e(t, r, i, n, o, a) {
                return !(t < i || t > n || r < o || r > a);
            },
            firstValuable: function e(t, r, i) {
                return typeof t === "undefined" ? typeof r === "undefined" ? i : r : t;
            }
        };
        e.exports = r;
    }, , function(e, t) {
        "use strict";
        var r = [ "cutLeft", "cutTop", "cutWidth", "cutHeight" ];
        var i = [ "left", "top", "width", "height" ];
        var n = r.concat(i);
        var o = n.concat([ "locate", "rx", "ry", "zIndex", "textFont", "textAlign", "textVerticalAlign", "color", "rotate", "scale", "opacity", "backgroundColor", "border", "overflow", "overflowX", "overflowY" ]);
        e.exports = {
            txywh: i,
            sxywh: r,
            xywh: n,
            styles: o,
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.7.4"
        };
    }, , function(e, t) {
        "use strict";
        var r = 3.141593;
        e.exports = function(e, t, i, n, o, a) {
            var l = o ? -o / 180 * r : 0;
            var s = e, c = t;
            if (o) {
                s = (e - i) * Math.cos(l) - (t - n) * Math.sin(l) + i;
                c = (e - i) * Math.sin(l) + (t - n) * Math.cos(l) + n;
            }
            if (a) {
                return [ s, c ];
            }
            return {
                x: s,
                y: c
            };
        };
    }, , function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = r(1);
        var o = V(n);
        var a = r(3);
        var l = V(a);
        var s = r(29);
        var c = V(s);
        var f = r(28);
        var u = V(f);
        var h = r(18);
        var d = V(h);
        var v = r(19);
        var p = V(v);
        var g = r(31);
        var m = V(g);
        var y = r(24);
        var $ = V(y);
        var b = r(26);
        var w = V(b);
        var x = r(27);
        var S = V(x);
        var k = r(25);
        var O = V(k);
        var M = r(32);
        var T = V(M);
        var _ = r(30);
        var Y = V(_);
        function V(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var C = 0;
        var X = function e(t) {
            if (t.children) {
                t.children.forEach(function(r, i) {
                    if (!r.$id) {
                        t.children[i] = new A(r);
                    }
                    if (t.$id && !t.$dom) {
                        t.children[i].$canvas = t.$canvas;
                        t.children[i].$parent = t;
                    } else {
                        t.children[i].$canvas = t;
                    }
                    e(t.children[i]);
                });
            }
        };
        var E = function e(t, r) {
            var i = t || {};
            if (!i.$id) {
                i.$id = Math.random().toString(36).substr(2);
            }
            i.$tickedTimes = i.$tickedTimes || 0;
            i.content = i.content || {};
            i.style = i.style || {};
            i.style.scale = o.default.firstValuable(i.style.scale, 1);
            i.style.opacity = o.default.firstValuable(i.style.opacity, 1);
            i.style.zIndex = i.style.zIndex || 0;
            i.style.locate = i.style.locate || "center";
            var n = o.default.funcOrValue(i.content.img);
            r.$cache = {};
            r.$render = {};
            r.$style = {};
            r.$needUpdate = {};
            i.hooks = i.hooks || {};
            l.default.styles.concat([ "visible" ]).forEach(function(e) {
                r.$cache[e] = undefined;
                r.$style[e] = i.style[e];
                if (typeof i.style[e] === "function") {
                    r.$style[e] = i.style[e].bind(r);
                }
                if (l.default.xywh.indexOf(e) > -1) {
                    r.$style[e] = r.$style[e] || 0;
                } else if ([ "opacity", "scale" ].indexOf(e) > -1) {
                    r.$style[e] = o.default.firstValuable(r.$style[e], 1);
                }
                r.$needUpdate[e] = 1;
                Object.defineProperty(i.style, e, {
                    get: function t() {
                        return r.$style[e];
                    },
                    set: function t(i) {
                        if (r.$style[e] === i) return;
                        r.$style[e] = i;
                        r.$needUpdate[e] = 1;
                    }
                });
            });
            i.events = i.events || {};
            if (true) {
                for (var a in i.events) {
                    if (typeof i.events[a] !== "function" && a !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + a + " is not a function.", i.events[a]);
                    }
                }
            }
            if (true) {
                i.$addIndex = C++;
            }
            i.events.eIndex = i.events.eIndex;
            if (true) {
                i.$perf = {};
            }
            if (true) {
                if (!i.name && i.content.img && i.content.img.src) {
                    var s = i.content.img.src.match(/.*\/([^\/]*)$/);
                    if (s && s[1]) {
                        i.name = s[1];
                    }
                }
                i.name = i.name || "Unnamed Sprite";
            }
            i.children = i.children || [];
            X(i);
            i.$styleCacheTime = {};
            return i;
        };
        var H = function e(t) {
            var r = this;
            this.$extendList.forEach(function(e) {
                e.call(r, t);
            });
        };
        var A = function e(t) {
            var r = E(t, this);
            for (var i in r) {
                if (Object.prototype.hasOwnProperty.call(r, i)) {
                    this[i] = r[i];
                }
            }
            H.call(this, r);
            return this;
        };
        A.prototype.$extendList = [];
        A.prototype.add = function(e) {
            if (!e) {
                return;
            }
            this.children.push(e);
            X(this);
            return this.children[this.children.length - 1];
        };
        A.prototype.getRect = function(e, t) {
            var r = this;
            var i = {};
            l.default.txywh.forEach(function(e) {
                i[e] = r.getStyle(e, t);
            });
            if (i.width === 0 && this.content.img && !e) {
                var n = o.default.funcOrValue(this.content.img, this);
                i.width = n.width;
                i.height = n.height;
            }
            var a = this.getStyle("locate");
            if (a === "lt") {} else if (a === "ld") {
                i.top -= i.height;
            } else if (a === "rt") {
                i.left -= i.width;
            } else if (a === "rd") {
                i.left -= i.width;
                i.top -= i.height;
            } else {
                i.left -= i.width >> 1;
                i.top -= i.height >> 1;
            }
            i.right = this.$canvas.width - i.left - i.width;
            i.bottom = this.$canvas.height - i.top - i.height;
            return i;
        };
        A.prototype.getSelfStyle = function(e) {
            var t = {};
            if (e) {
                return o.default.funcOrValue(this.style[e], this);
            }
            for (var r in this.style) {
                t[r] = o.default.funcOrValue(this.style[r], this);
            }
            return t;
        };
        A.prototype.getStyle = function(e, t) {
            var r = this;
            if (t && r.$cache[e] !== undefined) {
                return r.$cache[e];
            }
            var i = o.default.funcOrValue(r.$style[e], r);
            if (r.$parent) {
                var n = r.$parent.getStyle(e);
                if (e === "left" || e === "top") {
                    n = o.default.firstValuable(n, 0);
                    return n + o.default.firstValuable(i, 0);
                } else if (e === "scale" || e === "opacity") {
                    n = o.default.firstValuable(n, 1);
                    return n * o.default.firstValuable(i, 1);
                } else if (e === "visible") {
                    if (n === false) return false;
                    return i;
                }
            }
            return i;
        };
        A.prototype.remove = function(e) {
            if (e) {
                this.$canvas.remove(e);
                o.default.execFuncs(e.hooks.removed, e);
                return;
            }
            if (this.$parent) {
                this.$parent.remove(this);
            } else {
                this.$canvas.remove(this);
            }
            o.default.execFuncs(this.hooks.removed, this);
        };
        A.prototype.update = function(e) {
            if (!e) return;
            for (var t in e) {
                if (i(e[t]) === "object") {
                    for (var r in e[t]) {
                        if (!this[t]) {
                            this[t] = {};
                        }
                        this[t][r] = e[t][r];
                    }
                } else {
                    this[t] = e[t];
                }
            }
            this.recalculate(true);
        };
        A.prototype.getAllChildren = function(e) {
            var t = this;
            var r = e ? [ t ] : [];
            t.children.forEach(function(e) {
                r = r.concat(e.getAllChildren(true));
            });
            return r;
        };
        A.prototype.getAllVisibleChildren = function(e) {
            var t = this;
            if (o.default.funcOrValue(t.style.visible, t) === false) {
                return [];
            }
            var r = e ? [ t ] : [];
            t.children.forEach(function(e) {
                r = r.concat(e.getAllVisibleChildren(true));
            });
            return r;
        };
        A.prototype.getOuterRect = S.default;
        A.prototype.combine = O.default;
        A.prototype.uncombine = T.default;
        A.prototype.combineAsync = function() {
            if (this.$combine) return this;
            this.$combine = 9;
            this.off("ticked", this.combine);
            this.on("ticked", this.combine, 100);
            return this;
        };
        A.prototype.recalculate = Y.default;
        A.prototype.refresh = function() {
            for (var e in $sprite.$style) {
                $sprite.$cache[e] = A.get($sprite.$style[e], $sprite);
            }
            return this;
        };
        A.prototype.nextTick = p.default;
        A.prototype.on = c.default;
        A.prototype.off = u.default;
        A.prototype.clear = d.default;
        A.prototype.trigger = m.default;
        A.prototype.broadcast = $.default;
        A.prototype.distribute = w.default;
        e.exports = A;
    }, , , , function(e, t, r) {
        "use strict";
        var i = r(5);
        var n = l(i);
        var o = r(16);
        var a = l(o);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r, i, n, o, l, s, c, f, u) {
            if (!u) {
                if (t > o + s) return false;
                if (o > t + i) return false;
                if (e > n + l) return false;
                if (n > e + r) return false;
            }
            var h = (0, a.default)(e, t, n, o, l, s, c, f, u) || (0, a.default)(e + r, t, n, o, l, s, c, f, u) || (0, 
            a.default)(e, t + i, n, o, l, s, c, f, u) || (0, a.default)(e + r, t + i, n, o, l, s, c, f, u);
            if (h) return true;
            var d = (0, a.default)(n, o, e, t, r, i, c, f, -u) || (0, a.default)(n + l, o, e, t, r, i, c, f, -u) || (0, 
            a.default)(n, o + s, e, t, r, i, c, f, -u) || (0, a.default)(n + l, o + s, e, t, r, i, c, f, -u);
            if (d) return true;
            if (t > o && t + i < o + s && e < n && e + r > n + l) return true;
            if (e > n && e + r < n + l && t < o && t + i > o + s) return true;
            return false;
        };
    }, , , , , function(e, t, r) {
        "use strict";
        var i = r(5);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = 3.141593;
        e.exports = function(e, t, r, i, n, o, l, s, c) {
            var f = c ? -c / 180 * a : 0;
            if (f) {
                e = (e - l) * Math.cos(f) - (t - s) * Math.sin(f) + l;
                t = (e - l) * Math.sin(f) + (t - s) * Math.cos(f) + s;
            }
            return e >= r && e <= r + n && t >= i && t <= i + o;
        };
    }, , function(e, t) {
        "use strict";
        e.exports = function() {
            this.children.forEach(function(e) {
                e.remove();
            });
            this.children = [];
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            var t = function t() {
                e.apply(this, arguments);
                this.off("ticked", t);
            };
            this.on("ticked", t);
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = Math.PI;
        var o = function e(t) {
            return t.$lastPaintTime || Date.now();
        };
        var a = {
            linear: function e(t, r, i) {
                var n = o(this);
                var a = false;
                var l = void 0;
                var s = function() {
                    var e = this.$lastPaintTime;
                    var o = (e - n) / i;
                    var c = (r - t) * o + t;
                    if (a) {
                        if (r > t) {
                            while (c > r) {
                                c -= r - t;
                            }
                        } else {
                            while (c < r) {
                                c += t - r;
                            }
                        }
                    } else {
                        if (r > t && c > r) {
                            s.$done = true;
                            c = r;
                        } else if (r < t && c < r) {
                            s.$done = true;
                            c = r;
                        }
                    }
                    if (o >= 1 && l) {
                        l.call(this, c);
                        l = null;
                    }
                    return c;
                }.bind(this);
                s.loop = function() {
                    a = true;
                    return s;
                };
                s.restart = function() {
                    n = o(this);
                    return s;
                };
                s.then = function(e) {
                    l = e;
                    return s;
                };
                return s;
            },
            pendulum: function e(t, r, i, a) {
                var l = o(this);
                var s = a || {};
                s.start = s.start || 0;
                var c = false;
                var f = void 0;
                var u = s.cycle || 1;
                var h = function() {
                    var e = o(this);
                    var a = (e - l) / i;
                    if (!c) {
                        if (u) {
                            if (a > u) {
                                a = u;
                                h.$done = true;
                                a = u;
                            }
                        } else if (a > 1) {
                            h.$done = true;
                            a = 1;
                        }
                    } else {
                        if (u) {
                            a %= u;
                        }
                    }
                    var d = a * n * 2 - n / 2 + s.start / 360 * n;
                    var v = (r - t) * (Math.sin(d) + 1) / 2 + t;
                    if (a >= u && f) {
                        f.call(this, v);
                        f = null;
                    }
                    return v;
                }.bind(this);
                h.loop = function() {
                    c = true;
                    return h;
                };
                h.restart = function() {
                    l = o(this);
                    return h;
                };
                h.then = function(e) {
                    f = e;
                    return h;
                };
                return h;
            },
            ease: function e(t, r, i) {
                return this.pendulum(t, r, i * 2, {
                    cycle: .5
                });
            },
            oneByOne: function e(t) {
                var r = t;
                var i = false;
                var n = function e() {
                    for (var t = 0; t < r.length; t++) {
                        if (!r[t].$done) {
                            return r[t]();
                        } else if (!r[t].$nextRestart) {
                            r[t].$nextRestart = true;
                            if (r[t + 1]) {
                                r[t + 1].restart();
                                return r[t + 1]();
                            }
                        }
                    }
                    if (i) {
                        for (var n = 0; n < r.length; n++) {
                            r[n].$done = false;
                            r[n].$nextRestart = false;
                            r[n].restart();
                        }
                        return r[0]();
                    }
                    return r[r.length - 1]();
                };
                n.loop = function() {
                    i = true;
                    return n;
                };
                return n;
            }
        };
        var l = function e(t, r, n, o, l) {
            var s = (0, i.funcOrValue)(t[r]);
            if (true) {
                if (typeof s === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            s = s || 0;
            t[r] = a[n].bind(e)(s, o, l);
        };
        for (var s in a) {
            l[s] = a[s];
        }
        e.exports = l;
    }, , , , function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            if (this.hooks[t]) {
                n.default.execFuncs(this.hooks[t], this, e);
            }
            e.unshift(t);
            var r = this.children;
            r && r.forEach(function(t) {
                t.broadcast.apply(t, e);
            });
        };
    }, function(e, t, r) {
        "use strict";
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(1);
        var o = s(n);
        var a = r(3);
        var l = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var c = 9;
        var f = 1;
        var u = 2;
        var h = 3;
        e.exports = function() {
            var e = this;
            var t = this;
            if (t.$combine !== c) {
                return f;
            }
            setTimeout(function() {
                if (t.$combine !== c) {
                    return f;
                }
                if (t.getStyle("visible") === false) return h;
                var r = e.$canvas;
                var n = t.getRect(false, true);
                if (n.tw > r.width) return u;
                if (n.th > r.height) return u;
                var a = t.getAllChildren(true);
                for (var l = 0; l < a.length; l++) {
                    var s = a[l];
                    if (s.content.img && !s.$render._imgWidth) {
                        return h;
                    }
                    if (s.getStyle("scale") !== 1) {
                        return h;
                    }
                }
                var d = void 0;
                if (o.default.funcOrValue(t.style.overflow, t) !== "hidden") {
                    d = t.getOuterRect(false, true);
                    d.left = Math.floor(d.left);
                    d.top = Math.floor(d.top);
                    d.width = Math.round(d.width);
                    d.height = Math.round(d.height);
                    d.right = Math.round(d.right);
                    d.bottom = Math.round(d.bottom);
                    if (d.width > r.width) return u;
                    if (d.height > r.height) return u;
                } else {
                    d = n;
                }
                t.off("ticked", e.combine);
                var v = r.$children.filter(function(e) {
                    for (var t = 0; t < a.length; t++) {
                        if (a[t].$id === e.$id) return true;
                    }
                });
                var p = t.getStyle("opacity");
                v.forEach(function(e) {
                    if (!e.settings) return;
                    e.settings.$combineGlobalAlpha = e.settings.globalAlpha;
                    e.settings.globalAlpha = p > 0 ? e.settings.globalAlpha / p : 1;
                    if (!e.props.$moved) {
                        e.props.$moved = true;
                        e.props.left -= d.left;
                        e.props.top -= d.top;
                    }
                });
                var g = r.$combinerCanvas;
                if (!g) {
                    g = r.$combinerCanvas = document.createElement("canvas");
                    g.width = r.width;
                    g.height = r.height;
                }
                var m = g.getContext("2d");
                m.clearRect(0, 0, r.width, r.height);
                r.$render(m, v, true);
                v.forEach(function(e) {
                    if (!e.settings) return;
                    e.settings.globalAlpha = e.settings.$combineGlobalAlpha;
                });
                var y = document.createElement("canvas");
                y.width = d.width;
                y.height = d.height;
                var $ = y.getContext("2d");
                $.drawImage(g, 0, 0, d.width, d.height, 0, 0, d.width, d.height);
                t.$combine = {
                    content: t.content,
                    children: t.children,
                    style: i({}, t.style)
                };
                t.children = [];
                t.content = {
                    img: y
                };
                var b = t.getSelfStyle("left") - (Math.floor(n.left) - d.left);
                var w = t.getSelfStyle("top") - (Math.floor(n.top) - d.top);
                i(t.style, {
                    scale: 1,
                    left: b,
                    top: w,
                    width: y.width,
                    height: y.height,
                    backgroundColor: undefined
                });
                return f;
            });
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            e.unshift(t);
            var r = this.children;
            r && r.forEach(function(t) {
                t.broadcast.apply(t, e);
            });
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t) {
            var r = this;
            var i = r.getRect(e, t);
            i.right = i.left + i.width;
            i.bottom = i.top + i.height;
            this.children.forEach(function(r) {
                if (r.$cache.visible === false) return;
                var n = r.getOuterRect(e, t);
                if (n.left < i.left) i.left = n.left;
                if (n.top < i.top) i.top = n.top;
                if (n.right > i.right) i.right = n.right;
                if (n.bottom > i.bottom) i.bottom = n.bottom;
                i.width = i.right - i.left;
                i.height = i.bottom - i.top;
            });
            return i;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            if (!this.hooks[e]) return;
            if (this.hooks[e] === t || this.hooks[e].$handle === t || !t) {
                delete this.hooks[e];
            } else if (n.default.isArray(this.hooks[e])) {
                if (this.hooks[e].indexOf(t) >= 0) {
                    this.hooks[e][this.hooks[e].indexOf(t)] = undefined;
                } else if (this.hooks[e].indexOf(t.$handle) >= 0) {
                    this.hooks[e][this.hooks[e].indexOf(t.$handle)] = undefined;
                }
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            var i = t;
            if (r) {
                var o = this;
                i = function e() {
                    var n = Date.now();
                    if (n > i.$lastTriggerTime + r) {
                        i.$lastTriggerTime = n;
                        var a = Array.prototype.slice.call(arguments);
                        t.apply(o, a);
                    }
                };
                i.$lastTriggerTime = -1;
                i.$handle = t;
            }
            if (!this.hooks[e]) {
                this.hooks[e] = i;
            } else if (n.default.isArray(this.hooks[e])) {
                this.hooks[e].push(i);
            } else {
                this.hooks[e] = [ this.hooks[e], i ];
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = c(i);
        var o = r(11);
        var a = c(o);
        var l = r(3);
        var s = c(l);
        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = function e(t) {
            if (!t) return;
            var r = n.default.funcOrValue(t.$style.scale, t);
            if (r !== 1) return t;
            return e(t.$parent);
        };
        e.exports = function(e) {
            var t = this;
            !e && n.default.execFuncs(t.hooks.beforeTick, t, [ t.$canvas.$rafTime ]);
            if (n.default.funcOrValue(t.style.visible, t) === false) {
                t.$cache.visible = false;
                !e && n.default.execFuncs(t.hooks.ticked, t, [ t.$canvas.$rafTime ]);
                return;
            }
            t.$cache.visible = true;
            if (e) {
                t.$cache = {};
                s.default.styles.forEach(function(e) {
                    t.$needUpdate[e] = 1;
                    t.$cache[e] = undefined;
                });
            }
            var r = Object.keys(t.$needUpdate).length;
            t.$lastUpdate = t.$needUpdate;
            if (r) {
                var i = {};
                var o = function e(r) {
                    var o = t.$cache[r];
                    if (typeof t.$style[r] === "function") {
                        i[r] = 1;
                        t.$cache[r] = t.$style[r].call(t);
                    } else {
                        t.$cache[r] = t.$style[r];
                    }
                    if (r === "left" || r === "top") {
                        var a = t.$parent;
                        if (a) {
                            t.$cache[r] += a.$cache[r] || 0;
                        }
                    } else if (r === "opacity" || r === "scale") {
                        var l = t.$parent;
                        if (l) {
                            t.$cache[r] *= n.default.firstValuable(l.$cache[r], 1);
                        }
                    }
                    if (o === t.$cache[r]) {
                        delete t.$needUpdate[r];
                    } else {
                        if (r === "left" || r === "top" || r === "opacity" || r === "scale") {
                            if (o !== t.$cache[r]) {
                                t.children.forEach(function(e) {
                                    e.$needUpdate[r] = 1;
                                });
                            }
                        }
                    }
                };
                for (var l in t.$needUpdate) {
                    o(l);
                }
                r = Object.keys(t.$needUpdate).length;
                t.$needUpdate = i;
            }
            !e && n.default.execFuncs(t.hooks.ticked, t, [ t.$canvas.$rafTime ]);
            var c = n.default.funcOrValue(t.content.text, t);
            var u = n.default.funcOrValue(t.content.img, t);
            if (r || t.$cache.text !== c || t.$cache.img !== u || t.content.img && !t.$render._imgWidth) {
                var h = t.$render;
                t.$cache.img = h.img = u = n.default.funcOrValue(t.content.img, t);
                t.$cache.text = h.text = c;
                if (typeof h.img === "string") {
                    h.img = t.content.img = t.$canvas.imgLoader(h.img);
                }
                if (u && u._complete === false) u = false;
                h.backgroundColor = t.$cache.backgroundColor;
                h.border = t.$cache.border;
                h.overflow = t.$cache.overflow;
                h.overflowX = t.$cache.overflowX;
                h.overflowY = t.$cache.overflowY;
                h.locate = t.$cache.locate;
                h.rotate = t.$cache.rotate;
                h.scale = t.$cache.scale;
                h.opacity = t.$cache.opacity;
                h.$moved = false;
                h.childrenInside = (h.overflow || h.overflowX || h.overflowY) && h.overflow !== "visible";
                h.left = t.$cache.left;
                h.top = t.$cache.top;
                h.width = t.$cache.width;
                h.height = t.$cache.height;
                h._imgWidth = 0;
                h._imgHeight = 0;
                if (u && u.width) {
                    h._imgWidth = u.width || 0;
                    h._imgHeight = u.height || 0;
                    h.cutLeft = t.$cache.cutLeft || 0;
                    h.cutTop = t.$cache.cutTop || 0;
                    h.cutWidth = t.$cache.cutWidth || h._imgWidth;
                    h.cutHeight = t.$cache.cutHeight || h._imgHeight;
                    h.cutLeft = Math.round(h.cutLeft);
                    h.cutTop = Math.round(h.cutTop);
                    h.cutWidth = Math.round(h.cutWidth);
                    h.cutHeight = Math.round(h.cutHeight);
                    h.width = h.width || h.cutWidth || 0;
                    h.height = h.height || h.cutHeight || 0;
                }
                if (h.locate === "lt") {} else if (h.locate === "ld") {
                    h.top -= h.height;
                } else if (h.locate === "rt") {
                    h.left -= h.width;
                } else if (h.locate === "rd") {
                    h.left -= h.width;
                    h.top -= h.height;
                } else {
                    h.left -= h.width >> 1;
                    h.top -= h.height >> 1;
                }
                h.left = Math.round(h.left);
                h.top = Math.round(h.top);
                h.width = Math.round(h.width);
                h.height = Math.round(h.height);
                var d = h.settings = {};
                d.globalAlpha = n.default.firstValuable(h.opacity, 1);
                if (h.childrenInside) {
                    d.clip = true;
                }
                if (t.$cache.scale !== 1) {
                    var v = h.scale;
                    var p = f(t);
                    if (p) {
                        var g = p.$render.left + p.$render.width / 2;
                        var m = p.$render.top + p.$render.height / 2;
                        h.left -= (g - h.left) * (v - 1);
                        h.top -= (m - h.top) * (v - 1);
                        h.width *= v;
                        h.height *= v;
                    }
                }
                if (h.fh || h.fv) {
                    h.fh = h.fh || 0;
                    h.fv = h.fv || 0;
                    h.fx = h.fx || 0;
                    h.fy = h.fy || 0;
                    d.transform = {
                        fh: h.fh,
                        fv: h.fv,
                        fx: -(h.top + (h.height >> 1)) * h.fv + h.fx,
                        fy: -(h.left + (h.width >> 1)) * h.fh + h.fy
                    };
                }
                if (h.blend) {
                    if (typeof h.blend === "string") {
                        d.globalCompositeOperation = h.blend;
                    } else {
                        d.globalCompositeOperation = blend[h.blend];
                    }
                }
                if (h.backgroundColor) {
                    d.fillRect = h.backgroundColor;
                }
                if (h.border) {
                    d.line = h.border;
                }
                if (h.mirrX) {
                    d.translate = [ $canvas.width, 0 ];
                    d.scale = [ -1, 1 ];
                    h.left = $canvas.width - h.left - h.width;
                    if (h.mirrY) {
                        d.translate = [ $canvas.width, $canvas.height ];
                        d.scale = [ -1, -1 ];
                        h.top = $canvas.height - h.top - h.height;
                    }
                } else if (h.mirrY) {
                    d.translate = [ 0, $canvas.height ];
                    d.scale = [ 1, -1 ];
                    h.top = $canvas.height - h.top - h.height;
                }
                if (h.rotate) {
                    h.rx = n.default.firstValuable(n.default.funcOrValue(t.$cache.rx, t), h.left + .5 * h.width);
                    h.ry = n.default.firstValuable(n.default.funcOrValue(t.$cache.ry, t), h.top + .5 * h.height);
                    var y = n.default.firstValuable(h.rx, h.left + .5 * h.width);
                    var $ = n.default.firstValuable(h.ry, h.top + .5 * h.height);
                    d.beforeRotate = [ y, $ ];
                    d.rotate = -h.rotate * Math.PI / 180;
                    d.rotate = Number(d.rotate.toFixed(4));
                    d.afterRotate = [ -y, -$ ];
                }
                h.$insight = (0, a.default)(h.left, h.top, h.width, h.height, 0, 0, t.$canvas.width, t.$canvas.height, d.beforeRotate && d.beforeRotate[0], d.beforeRotate && d.beforeRotate[1], h.rotate);
            }
            t.children.forEach(function(t) {
                t.recalculate(e);
            });
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            if (this.hooks[t]) {
                return n.default.execFuncs(this.hooks[t], this, e);
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(3);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = this;
            if (!this.$combine) return;
            if (this.$combine === 9) {
                this.$combine = false;
                return;
            }
            this.content = this.$combine.content;
            this.children = this.$combine.children;
            Object.keys(this.style).forEach(function(t) {
                e.style[t] = undefined;
            });
            Object.keys(this.$combine.style).forEach(function(t) {
                e.style[t] = e.$combine.style[t];
            });
            this.$combine = false;
            this.recalculate(true);
        };
    }, , , , , , , , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = {};
        var n = "\n".slice(0, 1);
        var o = function e(t, r) {
            var o = String(t);
            var a = o + JSON.stringify(r);
            r.fontSize = r.fontSize || 16;
            if (i[a]) {
                return i[a];
            }
            var l;
            if (r.padding) {
                l = r.padding.split(" ");
                l = l.map(function(e) {
                    return parseInt(e);
                });
                l[1] = Number(l[1] || l[0]);
                l[2] = Number(l[2] || l[0]);
                l[3] = Number(l[3] || l[1]);
            } else {
                l = [ 0, 0, 0, 0 ];
            }
            var s = r.minWidth || r.width || (r.fontSize || 16) * o.length + l[1] + l[3] + 100;
            var c = o.split("\n").length;
            var f = r.fontSize * (Math.round(o.length) / s + c - 1) * (r.lineHeight || r.fontSize) + l[0] + l[2] + 100;
            var u = document.createElement("canvas");
            u.width = s;
            u.height = f;
            var h = u.getContext("2d");
            window.tempCanvas = u;
            window.tempCtx = h;
            h.textBaseline = "middle";
            h.font = (r.fontStyle ? r.fontStyle + " " : "") + r.fontSize + "px " + (r.family || "serif");
            h.fillStyle = r.color || "#000";
            h.textAlign = r.textAlign || "left";
            if (true) {
                var d = [];
                d.push("var tempCanvas = document.createElement('canvas')");
                d.push("tempCanvas.width=" + u.width);
                d.push("tempCanvas.height=" + u.height);
                d.push("var tempCtx = tempCanvas.getContext('2d')");
                d.push("tempCtx.textBaseline='" + h.textBaseline + "'");
                d.push("tempCtx.font='" + h.font + "'");
                d.push("tempCtx.fillStyle='" + h.fillStyle + "'");
                d.push("tempCtx.textAlign='" + h.textAlign + "'");
            }
            var v = 0;
            var p = r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0;
            var g = 0;
            var m = 1;
            var y = 0;
            var $ = 0;
            var b = 1;
            while (true) {
                $ = h.measureText(o.slice(g, m)).width;
                if ($ > r.width) {
                    if (r.textOverflow === "ellipsis") {
                        m -= 2;
                        h.fillText(o.slice(g, m) + "...", v, p + r.fontSize / 2);
                        if (true) {
                            d.push("tempCtx.fillText('" + o.slice(g, m) + "...', " + v + ", " + (p + r.fontSize / 2) + ")");
                        }
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0);
                        b++;
                        y = r.width - l[1] - l[3];
                        break;
                    } else {
                        m -= 1;
                        h.fillText(o.slice(g, m), v, p + r.fontSize / 2);
                        if (true) {
                            d.push("tempCtx.fillText('" + o.slice(g, m) + "', " + v + ", " + (p + r.fontSize / 2) + ")");
                        }
                        g = m;
                        m = g + 1;
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 10);
                        b++;
                    }
                } else {
                    if (m > o.length - 1) {
                        if ($ > y) y = $;
                        h.fillText(o.slice(g, m), v, p + r.fontSize / 2);
                        if (true) {
                            d.push("tempCtx.fillText('" + o.slice(g, m) + "', " + v + ", " + (p + r.fontSize / 2) + ")");
                        }
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0);
                        break;
                    } else if (o.slice(m, m + 1) === n) {
                        h.fillText(o.slice(g, m), v, p + r.fontSize / 2);
                        m += 1;
                        g = m;
                        m = g + 1;
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 10);
                        b++;
                    }
                    if ($ > y) y = $;
                    m++;
                }
            }
            var w = document.createElement("canvas");
            w.lastLineLeft = $;
            w.lineCount = b;
            w.width = Math.max(y + l[1] + l[3], r.minWidth || 0);
            w.height = p + l[0] + l[2];
            var x = w.getContext("2d");
            if (true) {
                d.push("var finalCanvas=document.createElement('canvas')");
                d.push("finalCanvas.width=" + w.width);
                d.push("finalCanvas.height=" + w.height);
                d.push("var finalCtx = finalCanvas.getContext('2d')");
            }
            if (r.backgroundColor) {
                x.fillStyle = r.backgroundColor;
                x.fillRect(0, 0, w.width, w.height);
                if (true) {
                    d.push("finalCtx.fillStyle=" + x.fillStyle);
                    d.push("finalCtx.fillRect(0, 0, " + w.width + ", " + w.height + ")");
                }
            }
            x.drawImage(u, (w.width - y) / 2, l[0]);
            if (r.border) {
                var S = r.border.split(" ");
                var k = S.pop();
                if (S[S.length - 1] === "solid") S.pop();
                var O = S[0];
                var M = S[1] || O;
                var T = S[2] || O;
                var _ = S[3] || M || O;
                O = parseInt(O);
                M = parseInt(M);
                T = parseInt(T);
                _ = parseInt(_);
                var Y = r.borderRadius || 0;
                x.beginPath();
                x.strokeStyle = k;
                if (O) {
                    x.lineWidth = O;
                    x.moveTo(_ ? Y : 0, 0);
                    x.lineTo(w.width - (M ? Y : 0), 0);
                }
                if (M) {
                    x.lineWidth = M;
                    x.moveTo(w.width, O ? Y : 0);
                    x.lineTo(w.width, w.height - (T ? Y : 0));
                }
                if (T) {
                    x.lineWidth = T;
                    x.moveTo(_ ? Y : 0, w.height);
                    x.lineTo(w.width - (M ? Y : 0), w.height);
                }
                if (_) {
                    x.lineWidth = _;
                    x.moveTo(0, O ? Y : 0);
                    x.lineTo(0, w.height - (T ? Y : 0));
                }
                x.stroke();
                if (Y) {
                    var V = document.createElement("canvas");
                    var C = Math.min(w.width, w.height);
                    V.width = V.height = C;
                    var X = V.getContext("2d");
                    X.beginPath();
                    X.strokeStyle = k;
                    X.arc(C >> 1, C >> 1, (C >> 1) - 1, 0, 2 * Math.PI);
                    X.stroke();
                    if (O && M) {
                        x.drawImage(V, C >> 1, 0, C >> 1, C >> 1, w.width - Y, 0, Y, Y);
                    }
                    if (T && M) {
                        x.drawImage(V, C >> 1, C >> 1, C >> 1, C >> 1, w.width - Y, w.height - Y, Y, Y);
                    }
                    if (O && _) {
                        x.drawImage(V, 0, 0, C >> 1, C >> 1, 0, 0, Y, Y);
                    }
                    if (T && _) {
                        x.drawImage(V, 0, C >> 1, C >> 1, C >> 1, 0, w.height - Y, Y, Y);
                    }
                }
            }
            if (true) {
                w.$origin = d;
            }
            i[a] = w;
            return w;
        };
        e.exports = o;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = r(96);
        var n = p(i);
        var o = r(97);
        var a = p(o);
        var l = r(98);
        var s = p(l);
        var c = r(99);
        var f = p(c);
        var u = r(100);
        var h = p(u);
        var d = r(101);
        var v = p(d);
        function p(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = {
            Button: n.default,
            Image: a.default,
            Scroll: s.default,
            Sequence: f.default,
            Text: h.default,
            View: v.default
        };
    }, function(e, t, r) {
        "use strict";
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(7);
        var o = s(n);
        var a = r(51);
        var l = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var c = {
            padding: 0,
            width: 300,
            family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
        };
        var f = function e(t, r) {
            t.buttonStyleNormal = i(c, {
                minWidth: r.style.width,
                lineHeight: r.style.height,
                padding: 0
            }, r.props.normal);
            t.buttonStyleHovered = i({}, t.buttonStyleNormal, r.props.hovered);
            t.buttonStylePressed = i({}, t.buttonStyleNormal, r.props.pressed);
            t.imageNormal = (0, l.default)(r.props.text || "", t.buttonStyleNormal);
            t.imageHovered = r.props.hovered && (0, l.default)(r.props.text || "", t.buttonStyleHovered);
            t.imagePressed = r.props.pressed && (0, l.default)(r.props.text || "", t.buttonStylePressed);
        };
        var u = function e(t) {
            var r = void 0;
            var i = t || {};
            t.props = t.props || {};
            var n = {
                buttonStyleNormal: undefined,
                buttonStyleHovered: undefined,
                buttonStylePressed: undefined,
                imageNormal: undefined,
                imageHovered: undefined,
                imagePressed: undefined
            };
            f(n, t);
            var a = {};
            t.events = t.events || {};
            a.touchmove = a.mousemove = function() {
                r.content.img = n.imageHovered || n.imageNormal;
            };
            a.touchstart = a.mousedown = function() {
                r.content.img = n.imagePressed || n.imageHovered || n.imageNormal;
            };
            a.touchend = a.touchout = a.mouseout = function() {
                r.content.img = n.imageNormal;
            };
            a.mouseup = function() {
                r.content.img = n.imageHovered || n.imageNormal;
            };
            a.click = function(e) {
                t.events.click && t.events.click.call(r, e);
            };
            r = new o.default({
                name: t.name || "button_" + t.props.text,
                content: {
                    img: n.imageNormal
                },
                style: t.style,
                props: t.props,
                events: a,
                hooks: t.hooks
            });
            r.update = function(e) {
                this.__proto__.update.call(this, e);
                f(n, t);
                r.content.img = n.imageNormal;
            };
            return r;
        };
        var h = typeof window !== "undefined";
        if (h && window.Easycanvas) {
            Easycanvas.class.Button = u;
        }
        e.exports = u;
    }, function(e, t, r) {
        "use strict";
        var i = r(7);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = function e(t) {
            var r = void 0;
            var i = t || {};
            i.name = i.name || "Image";
            r = new n.default(i);
            r.content.img = i.src;
            Object.defineProperty(r, "src", {
                get: function e() {
                    return r.content.img ? r.content.img.src : "";
                },
                set: function e(t) {
                    r.content.img = t;
                }
            });
            return r;
        };
        var l = typeof window !== "undefined";
        if (l && window.Easycanvas) {
            Easycanvas.class.Image = a;
        }
        e.exports = a;
    }, function(e, t, r) {
        "use strict";
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(7);
        var o = c(n);
        var a = r(1);
        var l = r(20);
        var s = c(l);
        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = void 0;
        var u = function e(t, r) {
            return Math.abs(t) < Math.abs(r) ? t : r;
        };
        var h = {
            loose: function e(t) {
                t.$scroll.touching = false;
            },
            looper: function e(t) {
                if (!t.$scroll || !t.$scroll.$scrolling) return;
                if (Math.abs(t.$scroll.speedX) > 1) {
                    t.$scroll.speedX *= t.scroll.smooth || .8;
                } else {
                    t.$scroll.speedX = 0;
                }
                if (Math.abs(t.$scroll.speedY) > 1) {
                    t.$scroll.speedY *= t.scroll.smooth || .8;
                } else {
                    t.$scroll.speedY = 0;
                }
                if (Math.abs(t.$scroll.speedX) <= 1 && Math.abs(t.$scroll.speedY) <= 1) {
                    t.$scroll.$scrolling = false;
                    t.$scroll.$wheeling = false;
                    return;
                }
                if (t.$scroll.touching) {
                    return;
                }
                t.scroll.scrollY -= t.$scroll.speedY;
                t.scroll.scrollX -= t.$scroll.speedX;
                if (!t.$scroll.touching && !t.$scroll.$wheeling && Math.abs(t.$scroll.speedY) < 50 && t.scroll.anchors && t.scroll.anchors.length) {
                    var r = t.scroll.anchorsRange || 400;
                    for (var i = 0; i < t.scroll.anchors.length; i++) {
                        var n = t.scroll.anchors[i];
                        var o = t.scroll.scrollY - n;
                        if (o > 0 && o < r && t.$scroll.speedY > 0 || o < 0 && o > -r && t.$scroll.speedY < 0) {
                            t.trigger("scrollTo", n, 200);
                            t.$scroll.speedY = 0;
                            break;
                        }
                    }
                }
                var l = (0, a.funcOrValue)(t.scroll.minScrollX, t);
                var s = (0, a.funcOrValue)(t.scroll.maxScrollX, t);
                var c = (0, a.funcOrValue)(t.scroll.minScrollY, t);
                var f = (0, a.funcOrValue)(t.scroll.maxScrollY, t);
                if (!isNaN(c) && t.scroll.scrollY < c) {
                    t.scroll.scrollY = c;
                } else if (!isNaN(f) && t.scroll.scrollY > f) {
                    t.scroll.scrollY = f;
                    t.broadcast("scrolledToBottom");
                    t.$scroll.speedY = 0;
                }
                if (!isNaN(l) && t.scroll.scrollX < l) {
                    t.scroll.scrollX = l;
                } else if (!isNaN(s) && t.scroll.scrollX > s) {
                    t.scroll.scrollX = s;
                }
            },
            touch: function e(t, r) {
                var i = Date.now();
                t.$scroll.$wheeling = false;
                if (!t.$scroll.touching) {
                    t.$scroll.touching = i;
                    t.$scroll.quickTouch = i;
                    t.$scroll.lastTouchSpeed = 0;
                    t.$scroll.startPos.x = r.canvasX;
                    t.$scroll.startPos.y = r.canvasY;
                    t.$scroll.lastScrollSpeed = t.$scroll.speedX || t.$scroll.speedY;
                    t.$scroll.speedX = 0;
                    t.$scroll.speedY = 0;
                } else {
                    t.$scroll.$scrolling = true;
                    var n = t.$scroll.startPos.x - r.canvasX;
                    var o = t.$scroll.startPos.y - r.canvasY;
                    var l = i - t.$scroll.touching;
                    t.$scroll.touching = i;
                    var s = (0, a.funcOrValue)(t.scroll.minScrollX, t);
                    var c = (0, a.funcOrValue)(t.scroll.maxScrollX, t);
                    var f = (0, a.funcOrValue)(t.scroll.minScrollY, t);
                    var h = (0, a.funcOrValue)(t.scroll.maxScrollY, t);
                    if (t.scroll.scrollX + n < s || t.scroll.scrollX + n > c) {
                        if (t.scroll.flexible || t.scroll.flexibleX) n >>= 3; else n = 0;
                    }
                    if (t.scroll.scrollY + o < f || t.scroll.scrollY + o > h) {
                        if (t.scroll.flexible || t.scroll.flexibleY) o >>= 3; else o = 0;
                    }
                    if ((0, a.funcOrValue)(t.scroll.scrollableX, t) && Math.abs(n) >= 1 && l > 1) {
                        var d = (r.canvasX - t.$scroll.startPos.x) / l * 25;
                        if (t.$scroll.lastScrollSpeed * d > 0 && Math.abs(d) > 15) {
                            d += u(d, t.$scroll.lastScrollSpeed);
                        }
                        t.$scroll.speedX = (t.$scroll.lastTouchSpeed + d) / (t.$scroll.lastTouchSpeed ? 2 : 1);
                        t.$scroll.lastTouchSpeed = d;
                        t.scroll.scrollX += n;
                    }
                    if ((0, a.funcOrValue)(t.scroll.scrollableY, t) && Math.abs(o) >= 1 && l > 1) {
                        var v = (r.canvasY - t.$scroll.startPos.y) / l * 25;
                        if (t.$scroll.lastScrollSpeed * v > 0 && Math.abs(v) > 15) {
                            v += u(v, t.$scroll.lastScrollSpeed);
                        }
                        t.$scroll.speedY = (t.$scroll.lastTouchSpeed + v) / (t.$scroll.lastTouchSpeed ? 2 : 1);
                        t.$scroll.lastTouchSpeed = v;
                        t.scroll.scrollY += o;
                    }
                    t.$scroll.startPos.x = r.canvasX;
                    t.$scroll.startPos.y = r.canvasY;
                    if (Math.abs(n) > Math.abs(o) + 1) return 1; else if (Math.abs(n) < Math.abs(o) - 1) return 2;
                }
            },
            wheel: function e(t, r) {
                t.$scroll.speedX = (0, a.funcOrValue)(t.scroll.scrollableX, t) ? r.event.wheelDeltaX : 0;
                t.$scroll.speedY = (0, a.funcOrValue)(t.scroll.scrollableY, t) ? r.event.wheelDeltaY : 0;
                t.$scroll.$scrolling = true;
                t.$scroll.$wheeling = true;
                r.stopPropagation();
            }
        };
        var d = function e(t) {
            var r = false;
            var n = false;
            var a = t || {};
            a.scroll = i({
                scrollX: 0,
                scrollY: 0,
                scrollableX: function e() {
                    return (this.style.overflowX || this.style.overflow) !== "visible";
                },
                scrollableY: function e() {
                    return (this.style.overflowY || this.style.overflow) !== "visible";
                },
                minScrollX: 0,
                maxScrollX: function e() {
                    var t = this;
                    var r = 0;
                    this.getChildren().forEach(function(e) {
                        var i = e.getSelfStyle("left") + e.getSelfStyle("width") - t.getStyle("width");
                        if (i > r) r = i;
                    });
                    return r;
                },
                minScrollY: 0,
                maxScrollY: function e() {
                    var t = this;
                    var r = 0;
                    this.getChildren().forEach(function(e) {
                        var i = e.getSelfStyle("top") + e.getSelfStyle("height") - t.getStyle("height");
                        if (i > r) r = i;
                    });
                    return r;
                },
                propagationX: false,
                propagationY: false
            }, t.scroll);
            var l = function e() {
                if (r) {
                    u.scroll.scrollX = r();
                }
                if (n) {
                    u.scroll.scrollY = n();
                }
                if (!r && !n) {
                    u.off("ticked", e);
                }
            };
            var c = false;
            a.events = i({
                touchstart: function e(t) {
                    h.loose(this);
                    c = true;
                    f = false;
                    h.touch(this, t);
                    if (!u.scroll.propagationX && !u.scroll.propagationY) {
                        t.stopPropagation();
                    }
                },
                touchmove: function e(t) {
                    if (!c) return;
                    if (f && this !== f) {
                        return;
                    }
                    var r = h.touch(this, t);
                    if (r === 1 && u.scroll.propagationY) {
                        t.stopPropagation();
                        f = this;
                    } else if (r === 2 && u.scroll.propagationX) {
                        t.stopPropagation();
                        f = this;
                    }
                },
                mousewheel: function e(t) {
                    c = true;
                    h.wheel(this, t);
                    t.stopPropagation();
                },
                touchend: function e() {
                    c = false;
                    h.loose(this);
                },
                mouseup: function e() {
                    c = false;
                    h.loose(this);
                }
            }, a.events || {});
            if (a.scroll.capture) {
                a.events.interceptor = function(e) {
                    if (u.events[e.type]) {
                        u.events[e.type].call(u, e);
                        return false;
                    }
                    return e;
                };
            }
            var u = new o.default(a);
            u.on("ticked", function() {
                h.looper(u);
            });
            u.on("scrollTo", function(e, t, i) {
                var o = void 0;
                r = s.default.ease(u.scroll.scrollY, e, i || 200, {
                    cycle: .5
                }).then(function() {
                    r = false;
                    o && o();
                    o = false;
                });
                n = s.default.ease(u.scroll.scrollY, t, i || 200, {
                    cycle: .5
                }).then(function() {
                    n = false;
                    o && o();
                    o = false;
                });
                u.on("ticked", l);
                return {
                    then: function e(t) {
                        o = t;
                    }
                };
            });
            u.$scroll = {
                speedX: 0,
                speedY: 0,
                touching: false,
                startPos: {},
                lastTouchSpeed: 0,
                lastScrollSpeed: 0
            };
            var d = u.add({
                name: "scrolling-element",
                style: {
                    left: function e() {
                        return -this.$parent.scroll.scrollX;
                    },
                    top: function e() {
                        return -this.$parent.scroll.scrollY;
                    }
                }
            });
            u.add = d.add.bind(d);
            u.clear = d.clear.bind(d);
            u.getChildren = function() {
                return d.children;
            };
            return u;
        };
        var v = typeof window !== "undefined";
        if (v && window.Easycanvas) {
            Easycanvas.class.Scroll = d;
        }
        e.exports = d;
    }, function(e, t, r) {
        "use strict";
        var i = r(7);
        var n = a(i);
        var o = r(1);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var l = function e(t) {
            var r = new n.default(t);
            t.props.index = t.props.index || 0;
            r.on("beforeTick", function() {
                var e = this.props;
                var t = (0, o.funcOrValue)(this.content.img, this);
                if (!t || !t.width) return;
                var r = e.index || 0;
                if (r < 0) r = 0;
                var i = void 0, n = void 0;
                if (e.frameWidth || e.frameHeight) {
                    if (e.frameWidth < 0) {
                        i = t.width / -e.frameWidth;
                    } else {
                        i = e.frameWidth;
                    }
                    if (e.frameHeight < 0) {
                        n = t.height / -e.frameHeight;
                    } else {
                        n = e.frameHeight;
                    }
                    var a = Math.floor(t.width / i);
                    var l = Math.floor(t.height / n);
                    this.style.cutLeft = r % a * i;
                    this.style.cutTop = Math.floor(r / a) % l * n;
                }
                if (!e.loop && r > 0 && this.style.cutLeft === 0 && this.style.cutTop === 0) {
                    this.style.img = undefined;
                    if (e.onOver) {
                        e.onOver.call(this);
                    } else {
                        this.remove();
                    }
                }
                e.lastFrameTime = e.lastFrameTime || 0;
                if (this.$canvas.$nextTickTime - e.lastFrameTime >= (0, o.funcOrValue)(e.interval, this)) {
                    e.lastFrameTime = this.$canvas.$nextTickTime;
                    e.index++;
                }
                this.style.cutWidth = this.style.cutWidth || i;
                this.style.cutHeight = this.style.cutHeight || n;
                this.style.width = this.style.width || i;
                this.style.height = this.style.height || n;
            });
            return r;
        };
        var s = typeof window !== "undefined";
        if (s && window.Easycanvas) {
            Easycanvas.class.Sequence = l;
        }
        e.exports = l;
    }, function(e, t, r) {
        "use strict";
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(7);
        var o = s(n);
        var a = r(51);
        var l = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var c = {
            padding: 0,
            width: 300,
            lineHeight: 100,
            family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
        };
        var f = function e(t) {
            t.content.img = t.text ? (0, l.default)(t.text, i({}, c, {
                lineHeight: t.style.fontSize
            }, t.style)) : undefined;
        };
        var u = function e(t) {
            var r = void 0;
            t.name = t.name || "Image";
            r = new o.default(t);
            f(r);
            Object.defineProperty(r, "text", {
                get: function e() {
                    return r.content.text;
                },
                set: function e(t) {
                    r.content.img = text;
                }
            });
            r.update = function(e) {
                this.__proto__.update.call(this, e);
                f(this);
            };
            return r;
        };
        var h = typeof window !== "undefined";
        if (h && window.Easycanvas) {
            Easycanvas.class.Text = u;
        }
        e.exports = u;
    }, function(e, t, r) {
        "use strict";
        var i = r(7);
        var n = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = function e(t) {
            var r = void 0;
            var i = t || {};
            i.name = i.name || "View";
            r = new n.default(i);
            return r;
        };
        var l = typeof window !== "undefined";
        if (l && window.Easycanvas) {
            Easycanvas.class.View = a;
        }
        e.exports = a;
    } ]);
});

