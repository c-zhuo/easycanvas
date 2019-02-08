(function e(t, i) {
    if (typeof exports === "object" && typeof module === "object") module.exports = i(); else if (typeof define === "function" && define.amd) define([], i); else {
        var r = i();
        for (var n in r) (typeof exports === "object" ? exports : t)[n] = r[n];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function i(r) {
            if (t[r]) return t[r].exports;
            var n = t[r] = {
                exports: {},
                id: r,
                loaded: false
            };
            e[r].call(n.exports, n, n.exports, i);
            n.loaded = true;
            return n.exports;
        }
        i.m = e;
        i.c = t;
        i.p = "";
        return i(0);
    }([ function(e, t, i) {
        e.exports = i(102);
    }, function(e, t) {
        "use strict";
        var i = {
            isArray: Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            },
            funcOrValue: function e(t, i) {
                if (typeof t === "function") {
                    return t.call(i);
                }
                return t;
            },
            execFuncs: function e(t, r, n) {
                if (t) {
                    if (!i.isArray(n)) {
                        n = [ n ];
                    }
                }
                if (typeof t === "function") {
                    t.apply(r, n);
                } else if (i.isArray(t)) {
                    t.length && t.forEach(function(e) {
                        e && e.apply(r, n);
                    });
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function e(t, i, r, n, a, o) {
                return !(t < r || t > n || i < a || i > o);
            },
            firstValuable: function e(t, i, r) {
                return typeof t === "undefined" ? typeof i === "undefined" ? r : i : t;
            }
        };
        e.exports = i;
    }, , function(e, t) {
        "use strict";
        var i = [ "cutLeft", "cutTop", "cutWidth", "cutHeight" ];
        var r = [ "left", "top", "width", "height" ];
        var n = i.concat(r);
        var a = n.concat([ "locate", "rx", "ry", "zIndex", "textFont", "textAlign", "textVerticalAlign", "color", "rotate", "scale", "opacity", "backgroundColor", "border", "overflow", "overflowX", "overflowY" ]);
        e.exports = {
            txywh: r,
            sxywh: i,
            xywh: n,
            styles: a,
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.7.4"
        };
    }, , function(e, t) {
        "use strict";
        var i = 3.141593;
        e.exports = function(e, t, r, n, a, o) {
            var l = a ? -a / 180 * i : 0;
            var f = e, s = t;
            if (a) {
                f = (e - r) * Math.cos(l) - (t - n) * Math.sin(l) + r;
                s = (e - r) * Math.sin(l) + (t - n) * Math.cos(l) + n;
            }
            if (o) {
                return [ f, s ];
            }
            return {
                x: f,
                y: s
            };
        };
    }, , function(e, t, i) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = i(1);
        var a = E(n);
        var o = i(3);
        var l = E(o);
        var f = i(29);
        var s = E(f);
        var c = i(28);
        var u = E(c);
        var d = i(18);
        var h = E(d);
        var v = i(19);
        var p = E(v);
        var g = i(31);
        var $ = E(g);
        var m = i(24);
        var y = E(m);
        var b = i(26);
        var w = E(b);
        var x = i(27);
        var S = E(x);
        var A = i(25);
        var k = E(A);
        var T = i(32);
        var M = E(T);
        var _ = i(30);
        var O = E(_);
        function E(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var C = 0;
        var F = function e(t) {
            if (t.children) {
                t.children.forEach(function(i, r) {
                    if (!i.$id) {
                        t.children[r] = new V(i);
                    }
                    if (t.$id && !t.$dom) {
                        t.children[r].$canvas = t.$canvas;
                        t.children[r].$parent = t;
                    } else {
                        t.children[r].$canvas = t;
                    }
                    e(t.children[r]);
                });
            }
        };
        var I = function e(t, i) {
            var r = t || {};
            if (!r.$id) {
                r.$id = Math.random().toString(36).substr(2);
            }
            r.$tickedTimes = r.$tickedTimes || 0;
            r.content = r.content || {};
            r.style = r.style || {};
            r.style.scale = a.default.firstValuable(r.style.scale, 1);
            r.style.opacity = a.default.firstValuable(r.style.opacity, 1);
            r.style.zIndex = r.style.zIndex || 0;
            r.style.locate = r.style.locate || "center";
            var n = a.default.funcOrValue(r.content.img);
            i.$cache = {};
            i.$render = {};
            i.$style = {};
            i.$needUpdate = {};
            r.hooks = r.hooks || {};
            l.default.styles.concat([ "visible" ]).forEach(function(e) {
                i.$cache[e] = undefined;
                i.$style[e] = r.style[e];
                if (typeof r.style[e] === "function") {
                    i.$style[e] = r.style[e].bind(i);
                }
                if (l.default.xywh.indexOf(e) > -1) {
                    i.$style[e] = i.$style[e] || 0;
                } else if ([ "opacity", "scale" ].indexOf(e) > -1) {
                    i.$style[e] = a.default.firstValuable(i.$style[e], 1);
                }
                i.$needUpdate[e] = 1;
                Object.defineProperty(r.style, e, {
                    get: function t() {
                        return i.$style[e];
                    },
                    set: function t(r) {
                        if (i.$style[e] === r) return;
                        i.$style[e] = r;
                        i.$needUpdate[e] = 1;
                    }
                });
            });
            r.events = r.events || {};
            if (true) {
                for (var o in r.events) {
                    if (typeof r.events[o] !== "function" && o !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + o + " is not a function.", r.events[o]);
                    }
                }
            }
            if (true) {
                r.$addIndex = C++;
            }
            r.events.eIndex = r.events.eIndex;
            if (true) {
                r.$perf = {};
            }
            if (true) {
                if (!r.name && r.content.img && r.content.img.src) {
                    var f = r.content.img.src.match(/.*\/([^\/]*)$/);
                    if (f && f[1]) {
                        r.name = f[1];
                    }
                }
                r.name = r.name || "Unnamed Sprite";
            }
            r.children = r.children || [];
            F(r);
            r.$styleCacheTime = {};
            return r;
        };
        var R = function e(t) {
            var i = this;
            this.$extendList.forEach(function(e) {
                e.call(i, t);
            });
        };
        var V = function e(t) {
            var i = I(t, this);
            for (var r in i) {
                if (Object.prototype.hasOwnProperty.call(i, r)) {
                    this[r] = i[r];
                }
            }
            R.call(this, i);
            return this;
        };
        V.prototype.$extendList = [];
        V.prototype.add = function(e) {
            if (!e) {
                return;
            }
            this.children.push(e);
            F(this);
            return this.children[this.children.length - 1];
        };
        V.prototype.getRect = function(e, t) {
            var i = this;
            var r = {};
            l.default.txywh.forEach(function(e) {
                r[e] = i.getStyle(e, t);
            });
            if (r.width === 0 && this.content.img && !e) {
                var n = a.default.funcOrValue(this.content.img, this);
                r.width = n.width;
                r.height = n.height;
            }
            var o = this.getStyle("locate");
            if (o === "lt") {} else if (o === "ld") {
                r.top -= r.height;
            } else if (o === "rt") {
                r.left -= r.width;
            } else if (o === "rd") {
                r.left -= r.width;
                r.top -= r.height;
            } else {
                r.left -= r.width >> 1;
                r.top -= r.height >> 1;
            }
            r.right = this.$canvas.width - r.left - r.width;
            r.bottom = this.$canvas.height - r.top - r.height;
            return r;
        };
        V.prototype.getSelfStyle = function(e) {
            var t = {};
            if (e) {
                return a.default.funcOrValue(this.style[e], this);
            }
            for (var i in this.style) {
                t[i] = a.default.funcOrValue(this.style[i], this);
            }
            return t;
        };
        V.prototype.getStyle = function(e, t) {
            var i = this;
            if (t && i.$cache[e] !== undefined) {
                return i.$cache[e];
            }
            var r = a.default.funcOrValue(i.$style[e], i);
            if (i.$parent) {
                var n = i.$parent.getStyle(e);
                if (e === "left" || e === "top") {
                    n = a.default.firstValuable(n, 0);
                    return n + a.default.firstValuable(r, 0);
                } else if (e === "scale" || e === "opacity") {
                    n = a.default.firstValuable(n, 1);
                    return n * a.default.firstValuable(r, 1);
                } else if (e === "visible") {
                    if (n === false) return false;
                    return r;
                }
            }
            return r;
        };
        V.prototype.remove = function(e) {
            if (e) {
                this.$canvas.remove(e);
                a.default.execFuncs(e.hooks.removed, e);
                return;
            }
            if (this.$parent) {
                this.$parent.remove(this);
            } else {
                this.$canvas.remove(this);
            }
            a.default.execFuncs(this.hooks.removed, this);
        };
        V.prototype.update = function(e) {
            if (!e) return;
            for (var t in e) {
                if (r(e[t]) === "object") {
                    for (var i in e[t]) {
                        if (!this[t]) {
                            this[t] = {};
                        }
                        this[t][i] = e[t][i];
                    }
                } else {
                    this[t] = e[t];
                }
            }
            this.recalculate(true);
        };
        V.prototype.getAllChildren = function(e) {
            var t = this;
            var i = e ? [ t ] : [];
            t.children.forEach(function(e) {
                i = i.concat(e.getAllChildren(true));
            });
            return i;
        };
        V.prototype.getAllVisibleChildren = function(e) {
            var t = this;
            if (a.default.funcOrValue(t.style.visible, t) === false) {
                return [];
            }
            var i = e ? [ t ] : [];
            t.children.forEach(function(e) {
                i = i.concat(e.getAllVisibleChildren(true));
            });
            return i;
        };
        V.prototype.getOuterRect = S.default;
        V.prototype.combine = k.default;
        V.prototype.uncombine = M.default;
        V.prototype.combineAsync = function() {
            if (this.$combine) return this;
            this.$combine = 9;
            this.off("ticked", this.combine);
            this.on("ticked", this.combine, 100);
            return this;
        };
        V.prototype.recalculate = O.default;
        V.prototype.refresh = function() {
            for (var e in $sprite.$style) {
                $sprite.$cache[e] = V.get($sprite.$style[e], $sprite);
            }
            return this;
        };
        V.prototype.nextTick = p.default;
        V.prototype.on = s.default;
        V.prototype.off = u.default;
        V.prototype.clear = h.default;
        V.prototype.trigger = $.default;
        V.prototype.broadcast = y.default;
        V.prototype.distribute = w.default;
        e.exports = V;
    }, , , , function(e, t, i) {
        "use strict";
        var r = i(5);
        var n = l(r);
        var a = i(16);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, i, r, n, a, l, f, s, c, u) {
            if (!u) {
                if (t > a + f) return false;
                if (a > t + r) return false;
                if (e > n + l) return false;
                if (n > e + i) return false;
            }
            var d = (0, o.default)(e, t, n, a, l, f, s, c, u) || (0, o.default)(e + i, t, n, a, l, f, s, c, u) || (0, 
            o.default)(e, t + r, n, a, l, f, s, c, u) || (0, o.default)(e + i, t + r, n, a, l, f, s, c, u);
            if (d) return true;
            var h = (0, o.default)(n, a, e, t, i, r, s, c, -u) || (0, o.default)(n + l, a, e, t, i, r, s, c, -u) || (0, 
            o.default)(n, a + f, e, t, i, r, s, c, -u) || (0, o.default)(n + l, a + f, e, t, i, r, s, c, -u);
            if (h) return true;
            if (t > a && t + r < a + f && e < n && e + i > n + l) return true;
            if (e > n && e + i < n + l && t < a && t + r > a + f) return true;
            return false;
        };
    }, , , , , function(e, t, i) {
        "use strict";
        var r = i(5);
        var n = a(r);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = 3.141593;
        e.exports = function(e, t, i, r, n, a, l, f, s) {
            var c = s ? -s / 180 * o : 0;
            if (c) {
                e = (e - l) * Math.cos(c) - (t - f) * Math.sin(c) + l;
                t = (e - l) * Math.sin(c) + (t - f) * Math.cos(c) + f;
            }
            return e >= i && e <= i + n && t >= r && t <= r + a;
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
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = Math.PI;
        var a = function e(t) {
            return t.$lastPaintTime || Date.now();
        };
        var o = {
            linear: function e(t, i, r) {
                var n = a(this);
                var o = false;
                var l = void 0;
                var f = function() {
                    var e = this.$lastPaintTime;
                    var a = (e - n) / r;
                    var s = (i - t) * a + t;
                    if (o) {
                        if (i > t) {
                            while (s > i) {
                                s -= i - t;
                            }
                        } else {
                            while (s < i) {
                                s += t - i;
                            }
                        }
                    } else {
                        if (i > t && s > i) {
                            f.$done = true;
                            s = i;
                        } else if (i < t && s < i) {
                            f.$done = true;
                            s = i;
                        }
                    }
                    if (a >= 1 && l) {
                        l.call(this, s);
                        l = null;
                    }
                    return s;
                }.bind(this);
                f.loop = function() {
                    o = true;
                    return f;
                };
                f.restart = function() {
                    n = a(this);
                    return f;
                };
                f.then = function(e) {
                    l = e;
                    return f;
                };
                return f;
            },
            pendulum: function e(t, i, r, o) {
                var l = a(this);
                var f = o || {};
                f.start = f.start || 0;
                var s = false;
                var c = void 0;
                var u = f.cycle || 1;
                var d = function() {
                    var e = a(this);
                    var o = (e - l) / r;
                    if (!s) {
                        if (u) {
                            if (o > u) {
                                o = u;
                                d.$done = true;
                                o = u;
                            }
                        } else if (o > 1) {
                            d.$done = true;
                            o = 1;
                        }
                    } else {
                        if (u) {
                            o %= u;
                        }
                    }
                    var h = o * n * 2 - n / 2 + f.start / 360 * n;
                    var v = (i - t) * (Math.sin(h) + 1) / 2 + t;
                    if (o >= u && c) {
                        c.call(this, v);
                        c = null;
                    }
                    return v;
                }.bind(this);
                d.loop = function() {
                    s = true;
                    return d;
                };
                d.restart = function() {
                    l = a(this);
                    return d;
                };
                d.then = function(e) {
                    c = e;
                    return d;
                };
                return d;
            },
            ease: function e(t, i, r) {
                return this.pendulum(t, i, r * 2, {
                    cycle: .5
                });
            },
            oneByOne: function e(t) {
                var i = t;
                var r = false;
                var n = function e() {
                    for (var t = 0; t < i.length; t++) {
                        if (!i[t].$done) {
                            return i[t]();
                        } else if (!i[t].$nextRestart) {
                            i[t].$nextRestart = true;
                            if (i[t + 1]) {
                                i[t + 1].restart();
                                return i[t + 1]();
                            }
                        }
                    }
                    if (r) {
                        for (var n = 0; n < i.length; n++) {
                            i[n].$done = false;
                            i[n].$nextRestart = false;
                            i[n].restart();
                        }
                        return i[0]();
                    }
                    return i[i.length - 1]();
                };
                n.loop = function() {
                    r = true;
                    return n;
                };
                return n;
            }
        };
        var l = function e(t, i, n, a, l) {
            var f = (0, r.funcOrValue)(t[i]);
            if (true) {
                if (typeof f === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            f = f || 0;
            t[i] = o[n].bind(e)(f, a, l);
        };
        for (var f in o) {
            l[f] = o[f];
        }
        e.exports = l;
    }, , , , function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
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
            var i = this.children;
            i && i.forEach(function(t) {
                t.broadcast.apply(t, e);
            });
        };
    }, function(e, t, i) {
        "use strict";
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var r in i) {
                    if (Object.prototype.hasOwnProperty.call(i, r)) {
                        e[r] = i[r];
                    }
                }
            }
            return e;
        };
        var n = i(1);
        var a = f(n);
        var o = i(3);
        var l = f(o);
        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = 9;
        var c = 1;
        var u = 2;
        var d = 3;
        e.exports = function() {
            var e = this;
            var t = this;
            if (t.$combine !== s) {
                return c;
            }
            setTimeout(function() {
                if (t.$combine !== s) {
                    return c;
                }
                if (t.getStyle("visible") === false) return d;
                var i = e.$canvas;
                var n = t.getRect(false, true);
                if (n.tw > i.width) return u;
                if (n.th > i.height) return u;
                var o = t.getAllChildren(true);
                for (var l = 0; l < o.length; l++) {
                    var f = o[l];
                    if (f.content.img && !f.$render._imgWidth) {
                        return d;
                    }
                    if (f.getStyle("scale") !== 1) {
                        return d;
                    }
                }
                var h = void 0;
                if (a.default.funcOrValue(t.style.overflow, t) !== "hidden") {
                    h = t.getOuterRect(false, true);
                    h.left = Math.floor(h.left);
                    h.top = Math.floor(h.top);
                    h.width = Math.round(h.width);
                    h.height = Math.round(h.height);
                    h.right = Math.round(h.right);
                    h.bottom = Math.round(h.bottom);
                    if (h.width > i.width) return u;
                    if (h.height > i.height) return u;
                } else {
                    h = n;
                }
                t.off("ticked", e.combine);
                var v = i.$children.filter(function(e) {
                    for (var t = 0; t < o.length; t++) {
                        if (o[t].$id === e.$id) return true;
                    }
                });
                var p = t.getStyle("opacity");
                v.forEach(function(e) {
                    if (!e.settings) return;
                    e.settings.$combineGlobalAlpha = e.settings.globalAlpha;
                    e.settings.globalAlpha = p > 0 ? e.settings.globalAlpha / p : 1;
                    if (!e.props.$moved) {
                        e.props.$moved = true;
                        e.props.left -= h.left;
                        e.props.top -= h.top;
                    }
                });
                var g = i.$combinerCanvas;
                if (!g) {
                    g = i.$combinerCanvas = document.createElement("canvas");
                    g.width = i.width;
                    g.height = i.height;
                }
                var $ = g.getContext("2d");
                $.clearRect(0, 0, i.width, i.height);
                i.$render($, v, true);
                v.forEach(function(e) {
                    if (!e.settings) return;
                    e.settings.globalAlpha = e.settings.$combineGlobalAlpha;
                });
                var m = document.createElement("canvas");
                m.width = h.width;
                m.height = h.height;
                var y = m.getContext("2d");
                y.drawImage(g, 0, 0, h.width, h.height, 0, 0, h.width, h.height);
                t.$combine = {
                    content: t.content,
                    children: t.children,
                    style: r({}, t.style)
                };
                t.children = [];
                t.content = {
                    img: m
                };
                var b = t.getSelfStyle("left") - (Math.floor(n.left) - h.left);
                var w = t.getSelfStyle("top") - (Math.floor(n.top) - h.top);
                r(t.style, {
                    scale: 1,
                    left: b,
                    top: w,
                    width: m.width,
                    height: m.height,
                    backgroundColor: undefined
                });
                return c;
            });
            return this;
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            e.unshift(t);
            var i = this.children;
            i && i.forEach(function(t) {
                t.broadcast.apply(t, e);
            });
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t) {
            var i = this;
            var r = i.getRect(e, t);
            r.right = r.left + r.width;
            r.bottom = r.top + r.height;
            this.children.forEach(function(i) {
                if (i.$cache.visible === false) return;
                var n = i.getOuterRect(e, t);
                if (n.left < r.left) r.left = n.left;
                if (n.top < r.top) r.top = n.top;
                if (n.right > r.right) r.right = n.right;
                if (n.bottom > r.bottom) r.bottom = n.bottom;
                r.width = r.right - r.left;
                r.height = r.bottom - r.top;
            });
            return r;
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
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
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, i) {
            var r = t;
            if (i) {
                var a = this;
                r = function e() {
                    var n = Date.now();
                    if (n > r.$lastTriggerTime + i) {
                        r.$lastTriggerTime = n;
                        var o = Array.prototype.slice.call(arguments);
                        t.apply(a, o);
                    }
                };
                r.$lastTriggerTime = -1;
                r.$handle = t;
            }
            if (!this.hooks[e]) {
                this.hooks[e] = r;
            } else if (n.default.isArray(this.hooks[e])) {
                this.hooks[e].push(r);
            } else {
                this.hooks[e] = [ this.hooks[e], r ];
            }
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = s(r);
        var a = i(11);
        var o = s(a);
        var l = i(3);
        var f = s(l);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var c = function e(t) {
            if (!t) return;
            var i = n.default.funcOrValue(t.$style.scale, t);
            if (i !== 1) return t;
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
                f.default.styles.forEach(function(e) {
                    t.$needUpdate[e] = 1;
                    t.$cache[e] = undefined;
                });
            }
            var i = Object.keys(t.$needUpdate).length;
            t.$lastUpdate = t.$needUpdate;
            if (i) {
                var r = {};
                var a = function e(i) {
                    var a = t.$cache[i];
                    if (typeof t.$style[i] === "function") {
                        r[i] = 1;
                        t.$cache[i] = t.$style[i].call(t);
                    } else {
                        t.$cache[i] = t.$style[i];
                    }
                    if (i === "left" || i === "top") {
                        var o = t.$parent;
                        if (o) {
                            t.$cache[i] += o.$cache[i] || 0;
                        }
                    } else if (i === "opacity" || i === "scale") {
                        var l = t.$parent;
                        if (l) {
                            t.$cache[i] *= n.default.firstValuable(l.$cache[i], 1);
                        }
                    }
                    if (a === t.$cache[i]) {
                        delete t.$needUpdate[i];
                    } else {
                        if (i === "left" || i === "top" || i === "opacity" || i === "scale") {
                            if (a !== t.$cache[i]) {
                                t.children.forEach(function(e) {
                                    e.$needUpdate[i] = 1;
                                });
                            }
                        }
                    }
                };
                for (var l in t.$needUpdate) {
                    a(l);
                }
                i = Object.keys(t.$needUpdate).length;
                t.$needUpdate = r;
            }
            !e && n.default.execFuncs(t.hooks.ticked, t, [ t.$canvas.$rafTime ]);
            var s = n.default.funcOrValue(t.content.text, t);
            var u = n.default.funcOrValue(t.content.img, t);
            if (i || t.$cache.text !== s || t.$cache.img !== u || t.content.img && !t.$render._imgWidth) {
                var d = t.$render;
                t.$cache.img = d.img = u = n.default.funcOrValue(t.content.img, t);
                t.$cache.text = d.text = s;
                if (typeof d.img === "string") {
                    d.img = t.content.img = t.$canvas.imgLoader(d.img);
                }
                if (u && u._complete === false) u = false;
                d.backgroundColor = t.$cache.backgroundColor;
                d.border = t.$cache.border;
                d.overflow = t.$cache.overflow;
                d.overflowX = t.$cache.overflowX;
                d.overflowY = t.$cache.overflowY;
                d.locate = t.$cache.locate;
                d.rotate = t.$cache.rotate;
                d.scale = t.$cache.scale;
                d.opacity = t.$cache.opacity;
                d.$moved = false;
                d.childrenInside = (d.overflow || d.overflowX || d.overflowY) && d.overflow !== "visible";
                d.left = t.$cache.left;
                d.top = t.$cache.top;
                d.width = t.$cache.width;
                d.height = t.$cache.height;
                d._imgWidth = 0;
                d._imgHeight = 0;
                if (u && u.width) {
                    d._imgWidth = u.width || 0;
                    d._imgHeight = u.height || 0;
                    d.cutLeft = t.$cache.cutLeft || 0;
                    d.cutTop = t.$cache.cutTop || 0;
                    d.cutWidth = t.$cache.cutWidth || d._imgWidth;
                    d.cutHeight = t.$cache.cutHeight || d._imgHeight;
                    d.cutLeft = Math.round(d.cutLeft);
                    d.cutTop = Math.round(d.cutTop);
                    d.cutWidth = Math.round(d.cutWidth);
                    d.cutHeight = Math.round(d.cutHeight);
                    d.width = d.width || d.cutWidth || 0;
                    d.height = d.height || d.cutHeight || 0;
                }
                if (d.locate === "lt") {} else if (d.locate === "ld") {
                    d.top -= d.height;
                } else if (d.locate === "rt") {
                    d.left -= d.width;
                } else if (d.locate === "rd") {
                    d.left -= d.width;
                    d.top -= d.height;
                } else {
                    d.left -= d.width >> 1;
                    d.top -= d.height >> 1;
                }
                d.left = Math.round(d.left);
                d.top = Math.round(d.top);
                d.width = Math.round(d.width);
                d.height = Math.round(d.height);
                var h = d.settings = {};
                h.globalAlpha = n.default.firstValuable(d.opacity, 1);
                if (d.childrenInside) {
                    h.clip = true;
                }
                if (t.$cache.scale !== 1) {
                    var v = d.scale;
                    var p = c(t);
                    if (p) {
                        var g = p.$render.left + p.$render.width / 2;
                        var $ = p.$render.top + p.$render.height / 2;
                        d.left -= (g - d.left) * (v - 1);
                        d.top -= ($ - d.top) * (v - 1);
                        d.width *= v;
                        d.height *= v;
                    }
                }
                if (d.fh || d.fv) {
                    d.fh = d.fh || 0;
                    d.fv = d.fv || 0;
                    d.fx = d.fx || 0;
                    d.fy = d.fy || 0;
                    h.transform = {
                        fh: d.fh,
                        fv: d.fv,
                        fx: -(d.top + (d.height >> 1)) * d.fv + d.fx,
                        fy: -(d.left + (d.width >> 1)) * d.fh + d.fy
                    };
                }
                if (d.blend) {
                    if (typeof d.blend === "string") {
                        h.globalCompositeOperation = d.blend;
                    } else {
                        h.globalCompositeOperation = blend[d.blend];
                    }
                }
                if (d.backgroundColor) {
                    h.fillRect = d.backgroundColor;
                }
                if (d.border) {
                    h.line = d.border;
                }
                if (d.mirrX) {
                    h.translate = [ $canvas.width, 0 ];
                    h.scale = [ -1, 1 ];
                    d.left = $canvas.width - d.left - d.width;
                    if (d.mirrY) {
                        h.translate = [ $canvas.width, $canvas.height ];
                        h.scale = [ -1, -1 ];
                        d.top = $canvas.height - d.top - d.height;
                    }
                } else if (d.mirrY) {
                    h.translate = [ 0, $canvas.height ];
                    h.scale = [ 1, -1 ];
                    d.top = $canvas.height - d.top - d.height;
                }
                if (d.rotate) {
                    d.rx = n.default.firstValuable(n.default.funcOrValue(t.$cache.rx, t), d.left + .5 * d.width);
                    d.ry = n.default.firstValuable(n.default.funcOrValue(t.$cache.ry, t), d.top + .5 * d.height);
                    var m = n.default.firstValuable(d.rx, d.left + .5 * d.width);
                    var y = n.default.firstValuable(d.ry, d.top + .5 * d.height);
                    h.beforeRotate = [ m, y ];
                    h.rotate = -d.rotate * Math.PI / 180;
                    h.rotate = Number(h.rotate.toFixed(4));
                    h.afterRotate = [ -m, -y ];
                }
                d.$insight = (0, o.default)(d.left, d.top, d.width, d.height, 0, 0, t.$canvas.width, t.$canvas.height, h.beforeRotate && h.beforeRotate[0], h.beforeRotate && h.beforeRotate[1], d.rotate);
            }
            t.children.forEach(function(t) {
                t.recalculate(e);
            });
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
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
    }, function(e, t, i) {
        "use strict";
        var r = i(3);
        var n = a(r);
        function a(e) {
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
    }, , , , function(e, t) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var r = {};
        var n = [];
        var a = "processing";
        var o = 0;
        var l = function e(t, a, l) {
            var f = l || {};
            var s = e.cacheCanvas;
            if ((typeof t === "undefined" ? "undefined" : i(t)) === "object") {
                var c = t;
                f.callbackArgs = f.callbackArgs || [];
                e(c.shift(), function(t) {
                    f.callbackArgs.push(t);
                    if (c.length > 1) {
                        e(c, a, f);
                    } else {
                        e(c[0], function(e) {
                            f.callbackArgs.push(e);
                            a(f.callbackArgs);
                        }, f);
                    }
                }, l);
                return;
            }
            var u = t + "_" + JSON.stringify(l) + "_" + s;
            if (r[u]) {
                if (a) {
                    if (r[u].width && a) {
                        a(r[u]);
                    } else {
                        setTimeout(function() {
                            e(t, a, l);
                        }, 100);
                    }
                    return;
                } else {
                    return r[u];
                }
            }
            var d = new Image();
            d._complete = false;
            if (f.block) {
                d.src = t;
                o++;
            } else if (o === 0) {
                d.src = t;
            } else {
                n.push({
                    imgObj: d,
                    src: t
                });
            }
            r[u] = d;
            var h = void 0;
            if (f.canvas || f.alphaColor || s) {
                h = document.createElement("canvas");
                h.width = h.height || 0;
                r[u] = h;
            }
            d.onload = function(e) {
                d._complete = true;
                if (d.src.substr(-3) === "jpg" || d.src.substr(-3) === "jpeg" || d.src.substr(-3) === "bmp") {
                    d.$noAlpha = true;
                } else if (d.src.indexOf("data:image/jpg;") === 0) {
                    d.$noAlpha = true;
                }
                if (f.block) {
                    o--;
                    if (o === 0) {
                        n.forEach(function(e) {
                            e.imgObj.src = e.src;
                        });
                        n.splice(0);
                    }
                }
                if (h && (f.canvas || f.alphaColor || s)) {
                    var t = h.getContext("2d");
                    h.width = d.width;
                    h.height = d.height;
                    h.$noAlpha = d.$noAlpha;
                    t.drawImage(d, 0, 0);
                    if (f.alphaColor) {
                        var i = t.getImageData(0, 0, d.width, d.height);
                        var r = [];
                        for (var l = 0; l < i.data.length; l += 4) {
                            var c = i.data[l] + i.data[l + 1] + i.data[l + 2];
                            var u = 1;
                            if (i.data[l] < u && i.data[l + 1] < u && i.data[l + 2] < u) {
                                i.data[l + 3] = Math.floor(c / 255);
                            }
                        }
                        t.putImageData(i, 0, 0);
                        h.$noAlpha = false;
                    }
                    d = h;
                }
                if (a) {
                    a(d);
                }
            };
            d.onerror = function() {
                r[u] = d;
            };
            return h || d;
        };
        l.cacheCanvas = false;
        e.exports = l;
    }, function(e, t) {
        "use strict";
        var i = "processing";
        var r = {};
        function n(e, t) {
            if (e && e.match(/^data:/)) {
                t && t(e);
                return;
            }
            if (r[e]) {
                if (r[e] !== i) {
                    t(r[e]);
                } else {
                    setTimeout(function() {
                        n(e, t);
                    }, 100);
                }
                return;
            }
            r[e] = i;
            var a = new XMLHttpRequest();
            a.onload = function() {
                var i = new FileReader();
                i.onloadend = function() {
                    r[e] = i.result;
                    t && t(i.result);
                };
                i.readAsDataURL(a.response);
            };
            a.open("GET", e);
            a.responseType = "blob";
            a.send();
        }
        e.exports = n;
    }, , , , , , , , , , , , , , , , , , , , , , function(e, t) {
        "use strict";
        var i = function e(t) {
            setTimeout(t, 1e3 / 60);
        };
        var r = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || i : i;
        e.exports = r;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, i) {
        "use strict";
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var r in i) {
                    if (Object.prototype.hasOwnProperty.call(i, r)) {
                        e[r] = i[r];
                    }
                }
            }
            return e;
        };
        var n = i(3);
        var a = f(n);
        var o = i(1);
        var l = f(o);
        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        if (true) {
            if (!window[a.default.devFlag]) {
                var s = window[a.default.devFlag] = {
                    isPaintRecording: false,
                    selectMode: false,
                    current: {},
                    version: a.default.version,
                    $canvas: {},
                    $plugin: null
                };
                var c = {
                    getSprite: function e(t) {
                        if (!s.isPaintRecording) return [];
                        var i = {};
                        if (t) {
                            var n = s.$canvas[t].children;
                            var o = s.$canvas[t].$children;
                            var f = function e(t) {
                                if (t.name === a.default.devFlag) return;
                                i[t.$id] = {
                                    name: t.name,
                                    $addIndex: t.$addIndex,
                                    parent: t.$parent && t.$parent.$id,
                                    style: {},
                                    children: t.children.filter(function(e) {
                                        return e.name !== a.default.devFlag;
                                    }).map(function(e) {
                                        return e.$id;
                                    }),
                                    rendered: t.$rendered
                                };
                                for (var r in t.style) {
                                    i[t.$id].style[r] = l.default.funcOrValue(t.style[r], t);
                                }
                                a.default.xywh.forEach(function(e) {
                                    i[t.$id].style[e] = Math.round(i[t.$id].style[e]);
                                });
                                [ "physics", "$perf" ].forEach(function(e) {
                                    i[t.$id][e] = t[e];
                                });
                                if (t.webgl) {
                                    i[t.$id].webgl = {};
                                    [ "rx", "ry", "rz", "x", "y", "z" ].forEach(function(e) {
                                        i[t.$id].webgl[e] = l.default.funcOrValue(t.webgl[e], t);
                                    });
                                }
                                if (t.children) {
                                    t.children.sort(function(e, t) {
                                        return e.$addIndex < t.$addIndex ? -1 : 1;
                                    }).forEach(e);
                                }
                            };
                            n.sort(function(e, t) {
                                return e.$addIndex < t.$addIndex ? -1 : 1;
                            }).forEach(f);
                        } else {
                            for (var c in s.$canvas) {
                                i = r(i, s.$plugin.getSprite(c));
                            }
                        }
                        return i;
                    },
                    selectSpriteById: function e(t, i) {
                        if (!i) {
                            for (var r in s.$canvas) {
                                var n = c.selectSpriteById(t, r);
                                if (n) {
                                    return {
                                        $sprite: n.$sprite || n,
                                        $canvas: s.$canvas[r]
                                    };
                                }
                            }
                            return false;
                        }
                        var a = function e(r) {
                            for (var n = 0; n < r.length; n++) {
                                if (r[n].$id === t) return r[n];
                                var a = e(r[n].children);
                                if (a) {
                                    return {
                                        $sprite: a.$sprite || a,
                                        $canvas: s.$canvas[i]
                                    };
                                }
                            }
                            return false;
                        };
                        var o = s.$canvas[i].children;
                        var l = a(o);
                        if (l) {
                            return {
                                $sprite: l.$sprite || l,
                                $canvas: s.$canvas[i]
                            };
                        }
                    },
                    updateSprite: function e(t) {
                        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "style";
                        var n = arguments[2];
                        var a = arguments[3];
                        var o = c.selectSpriteById(t, a).$sprite;
                        if (!o) console.warn("Sprite " + spriteId + " Not Found.");
                        r(o[i], n);
                    },
                    highlightSprite: function e(t, i, r) {
                        s.selectMode = Boolean(i);
                        var n = c.selectSpriteById(t, r);
                        var a = n.$sprite;
                        var o = n.$canvas;
                        if (i && o && a) {
                            o.$plugin.selectSprite(false, o, a);
                        } else if (o) {
                            o.$plugin.cancelSelectSprite(o);
                        }
                    },
                    sendGlobalHook: function e(t, i) {
                        var r = c.selectSpriteById(t, i);
                        var n = r.$sprite;
                        var a = r.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + n.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = n;
                        window.$1 = a;
                    },
                    pause: function e(t, i) {
                        var r = s.$canvas[t];
                        r.$pausing = typeof i !== "undefined" ? i : !r.$pausing;
                    },
                    getPerf: function e() {
                        var t = {
                            canvas: [],
                            navigator: {
                                clientWidth: document.body.clientWidth,
                                clientHeight: document.body.clientHeight,
                                devicePixelRatio: window.devicePixelRatio
                            }
                        };
                        if (!s.isPaintRecording) return t;
                        for (var i in s.$canvas) {
                            t.canvas.push({
                                $id: i,
                                name: s.$canvas[i].name,
                                perf: s.$canvas[i].$perf,
                                fps: s.$canvas[i].lastFps,
                                size: {
                                    styleWidth: s.$canvas[i].$dom.getBoundingClientRect().width || parseInt(s.$canvas[i].$dom.style.width) || s.$canvas[i].$dom.width,
                                    styleHeight: s.$canvas[i].$dom.getBoundingClientRect().height || parseInt(s.$canvas[i].$dom.style.height) || s.$canvas[i].$dom.height,
                                    canvasWidth: s.$canvas[i].$dom.width,
                                    canvasHeight: s.$canvas[i].$dom.height
                                }
                            });
                        }
                        return t;
                    }
                };
                s.$plugin = c;
            }
        }
    }, , , , , , , , function(e, t, i) {
        "use strict";
        var r = i(3);
        var n = k(r);
        var a = i(122);
        var o = k(a);
        var l = i(59);
        var f = k(l);
        var s = i(162);
        var c = k(s);
        var u = i(1);
        var d = k(u);
        var h = i(20);
        var v = k(h);
        var p = i(36);
        var g = k(p);
        var $ = i(161);
        var m = k($);
        var y = i(163);
        var b = k(y);
        var w = i(7);
        var x = k(w);
        var S = i(94);
        var A = k(S);
        function k(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var T = {
            painter: o.default,
            imgLoader: g.default,
            imgPretreat: m.default,
            multlineText: b.default,
            transition: v.default,
            tick: f.default,
            utils: d.default,
            mirror: c.default,
            class: {
                sprite: x.default
            },
            sprite: x.default,
            $version: n.default.version,
            env: "develop"
        };
        T.extend = function(e) {
            var t = T.sprite.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            t.push(e);
        };
        T.use = function(e) {
            var t = T.painter.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            if (e.onUse) {
                e.onUse(T);
            }
            t.push(e);
        };
        var M = typeof window !== "undefined";
        if (M) {
            if (window.Easycanvas) {
                console.warn("[Easycanvas] already loaded, it should be loaded only once.");
            } else {
                if (true) {
                    setTimeout(function() {
                        console.log("%c Easycanvas %c You are using the develop version " + n.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                    }, 500);
                }
                if (true) {
                    window.Easycanvas = T;
                }
            }
        }
        e.exports = T;
    }, , , , , function(e, t, i) {
        "use strict";
        var r = i(110);
        var n = u(r);
        var a = i(111);
        var o = u(a);
        var l = i(108);
        var f = u(l);
        var s = i(121);
        var c = u(s);
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var d = {
            $render: o.default,
            $eventHandler: f.default,
            $perPaint: n.default
        };
        if (true) {
            d.$plugin = (0, c.default)();
        }
        e.exports = d;
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = l(r);
        var a = i(3);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = typeof wx !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var s = function e(t) {
            return t.sort(function(e, t) {
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                        return n.default.funcOrValue(e.style.zIndex, e) < n.default.funcOrValue(t.style.zIndex, t) ? 1 : -1;
                    }
                }
                return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) < n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) ? 1 : -1;
            });
        };
        var c = function e(t, i) {
            var r = t.getRect();
            return n.default.pointInRect(i.canvasX, i.canvasY, r.left, r.left + r.width, r.top, r.top + r.height);
        };
        var u = function e(t, i, r) {
            if (!t || !t.length) return;
            if (i.$stopPropagation) return;
            var a = t.length;
            for (var l = 0; l < a; l++) {
                var f = t[l];
                if (n.default.funcOrValue(f.style.visible, f) === false) continue;
                if (f.events && f.events.pointerEvents === "none") continue;
                if (c(f, i)) {
                    var u = f.events.interceptor;
                    if (true) {
                        if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                            u = false;
                        }
                    }
                    if (u) {
                        var d = n.default.firstValuable(u.call(f, i), i);
                        if (!d || d.$stopPropagation) return;
                    }
                }
                var v = f.$combine && f.$combine.children ? f.$combine.children : f.children;
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                        v = f.children;
                    }
                }
                if (v.length) {
                    e(s(v.filter(function(e) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) >= 0;
                            }
                        }
                        return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0;
                    })), i, r);
                }
                if (i.$stopPropagation) break;
                if (c(f, i)) {
                    if (true) {
                        if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                            if (f.name !== o.default.devFlag) {
                                i.stopPropagation();
                                if (f.$canvas.$plugin.selectSprite(i.type === "click" || i.type === "touchend", f.$canvas, f)) {
                                    return;
                                }
                            }
                            continue;
                        }
                    }
                    h(f, i, r);
                    i.stopPropagation();
                    return;
                }
                if (v.length) {
                    e(s(v.filter(function(e) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) < 0;
                            }
                        }
                        return !(n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0);
                    })), i, r);
                }
            }
        };
        var d = function e(t, i) {
            var r = this;
            this.$extendList.forEach(function(e) {
                if (e.onEvent) {
                    e.onEvent.call(r, t, i);
                }
            });
        };
        var h = function e(t, i, r) {
            r && r.push(t);
            if (t.events[i.type]) {
                t.events[i.type].call(t, i);
                if (i.$stopPropagation) return;
            }
            if (t.$parent) {
                e(t.$parent, i, r);
            } else {
                if (t.$canvas && !i.$stopPropagation) {
                    e(t.$canvas, i);
                    i.stopPropagation();
                }
            }
        };
        var v = {
            x: 0,
            y: 0,
            timeStamp: 0
        };
        var p;
        p = function e(t, i) {
            var r = this;
            var a = void 0;
            var o = void 0;
            var l = 1;
            var c = 1;
            if (!i) {
                if (!t.layerX && t.targetTouches && t.targetTouches[0]) {
                    a = t.targetTouches[0].pageX - t.currentTarget.offsetLeft;
                    o = t.targetTouches[0].pageY - t.currentTarget.offsetTop;
                } else if (!t.layerX && t.changedTouches && t.changedTouches[0]) {
                    a = t.changedTouches[0].pageX - t.currentTarget.offsetLeft;
                    o = t.changedTouches[0].pageY - t.currentTarget.offsetTop;
                } else {
                    a = t.layerX;
                    o = t.layerY;
                }
                var h = false;
                if (this.$dom.getBoundingClientRect) {
                    var g = this.$dom.getBoundingClientRect();
                    g.width > g.height !== this.width > this.height;
                    l = Math.floor(g[h ? "height" : "width"]) / this.width;
                    c = Math.floor(g[h ? "width" : "height"]) / this.height;
                }
            }
            var $ = i || {
                type: t.type,
                canvasX: a / l,
                canvasY: o / c,
                event: t
            };
            if (f && r.fastclick) {
                if ($.type === "click" && !$.$fakeClick) {
                    return;
                } else if ($.type === "touchstart") {
                    v.x = $.canvasX;
                    v.y = $.canvasY;
                    v.timeStamp = Date.now();
                } else if ($.type === "touchend") {
                    if (Math.abs(v.x - $.canvasX) < 30 && Math.abs(v.y - $.canvasY) < 30 && Date.now() - v.timeStamp < 200) {
                        p.call(this, null, {
                            $fakeClick: true,
                            type: "click",
                            canvasX: v.x,
                            canvasY: v.y,
                            event: t
                        });
                    }
                }
            }
            $.stopPropagation = function() {
                $.$stopPropagation = true;
            };
            if (r.events.interceptor) {
                $ = n.default.firstValuable(r.events.interceptor.call(r, $), $);
                if (!$ || $.$stopPropagation) return;
            }
            var m = [];
            u(s(r.children), $, m);
            d.call(r, $, m);
            if (($.type === "mousemove" || $.type === "touchmove") && r.eLastMouseHover && m.indexOf(r.eLastMouseHover) === -1) {
                var y = r.eLastMouseHover["events"]["mouseout"] || r.eLastMouseHover["events"]["touchout"];
                if (y) {
                    y.call(r.eLastMouseHover, $);
                }
            }
            r.eLastMouseHover = m[0];
            if (!m.length && r.eLastMouseHover) {
                var b = r.eLastMouseHover["events"]["mouseout"];
                if (b) {
                    b.call(r.eLastMouseHover, $);
                }
                r.eLastMouseHover = null;
            }
            var w = r.events[$.type];
            if (w && !$.$stopPropagation) {
                if (w.call(r, $)) {
                    r.eHoldingFlag = false;
                    return true;
                }
            }
        };
        e.exports = p;
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, i) {
            t.filter(function(e) {
                var t = n.default.funcOrValue(e.style.zIndex, e);
                if (i < 0) {
                    return t < 0;
                }
                return t >= 0;
            }).sort(function(e, t) {
                var i = n.default.funcOrValue(e.style.zIndex, e);
                var r = n.default.funcOrValue(t.style.zIndex, t);
                if (i === r) return 0;
                return i > r ? 1 : -1;
            }).forEach(function(t, i) {
                e.$perPaint.call(e, t, i);
            });
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = u(r);
        var a = i(3);
        var o = u(a);
        var l = i(109);
        var f = u(l);
        var s = i(11);
        var c = u(s);
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var d = n.default.blend;
        var h = function e(t) {
            var i = /[^\u4e00-\u9fa5]/;
            return !i.test(t);
        };
        var v = function e() {
            var t = this;
            this.$canvas.$extendList.forEach(function(e) {
                if (e.onPaint) {
                    e.onPaint.call(t);
                }
            });
        };
        e.exports = function(e, t) {
            e.$rendered = false;
            if (e.$cache.visible === false) {
                return;
            }
            var i = this;
            v.call(e);
            var r = e.$render;
            var a = r.text;
            var o = r.img;
            var l = r.childrenInside;
            if (!o && !a && !r.backgroundColor && !r.border && !l) {
                e.$rendered = undefined;
                var s = e.children;
                if (s.length) {
                    (0, f.default)(i, s, -1);
                    (0, f.default)(i, s, 1);
                }
                return;
            }
            var c = e.children;
            var u = r.settings;
            if (u.clip) {
                var d = {
                    $id: e.$id,
                    type: "clip",
                    props: r
                };
                d.$origin = e;
                i.$children.push(d);
            }
            c.length && (0, f.default)(i, c, -1);
            if (u.fillRect) {
                e.$rendered = true;
                var p = {
                    $id: e.$id,
                    type: "fillRect",
                    settings: u,
                    props: r
                };
                p.$origin = e;
                i.$children.push(p);
            }
            if (r._imgWidth && r.opacity !== 0 && r.cutWidth && r.cutHeight) {
                e.$rendered = true;
                var g = {
                    $id: e.$id,
                    type: "img",
                    settings: u,
                    img: o,
                    props: r
                };
                g.$origin = e;
                i.$children.push(g);
            }
            if (a) {
                r.textFont = e.$cache.textFont;
                r.color = e.$cache.color;
                r.textAlign = e.$cache.textAlign;
                r.textVerticalAlign = e.$cache.textVerticalAlign;
                e.$rendered = true;
                var $ = r.left;
                var m = r.top;
                var y = r.align || r.textAlign || "left";
                var b = r.textFont || "14px Arial";
                var w = parseInt(b);
                var x = "top";
                var S = r.lineHeight || w;
                if (y === "center") {
                    $ += r.width / 2;
                } else if (y === "right") {
                    $ += r.width;
                }
                if (r.textVerticalAlign === "top") {
                    x = "top";
                } else if (r.textVerticalAlign === "bottom") {
                    x = "bottom";
                    m += r.height;
                } else if (r.textVerticalAlign === "middle") {
                    m += r.height >> 1;
                    x = "middle";
                }
                if (typeof a === "string" || typeof a === "number") {
                    i.$children.push({
                        $id: e.$id,
                        type: "text",
                        settings: u,
                        props: {
                            left: $,
                            top: m,
                            content: String(a),
                            fontsize: w,
                            align: y,
                            baseline: x,
                            font: b,
                            color: r.color,
                            type: r.textToppe
                        },
                        $origin: e
                    });
                } else if (a.length) {
                    a.forEach(function(t) {
                        i.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: u,
                            props: {
                                left: $ + n.default.funcOrValue(t.left, e),
                                top: m + n.default.funcOrValue(t.top, e),
                                content: n.default.funcOrValue(t.content, e),
                                fontsize: w,
                                baseline: x,
                                align: y,
                                font: b,
                                color: r.color,
                                type: r.textToppe
                            },
                            $origin: e
                        });
                    });
                } else if (a.toppe === "multline-text") {
                    var A = a.text.split(/\t|\n/);
                    var k = [];
                    A.forEach(function(e, t) {
                        e = String.prototype.trim.apply(e);
                        if (a.config.start) {
                            e = e.replace(a.config.start, "");
                        }
                        var i = 0;
                        var n = r.width;
                        while (e.length && i < e.length) {
                            if (n <= 0) {
                                n = r.width;
                                k.push(e.substr(0, i));
                                e = e.substr(i);
                                i = 0;
                            }
                            i++;
                            n -= w * (h(e[i]) ? 1.05 : .6);
                        }
                        if (e || t) {
                            k.push(e);
                        }
                    });
                    k.forEach(function(t) {
                        i.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: u,
                            props: {
                                left: $,
                                top: m,
                                fontsize: w,
                                content: t,
                                baseline: x,
                                align: y,
                                font: b,
                                color: r.color,
                                type: r.textToppe
                            },
                            $origin: e
                        });
                        m += S || w;
                    });
                }
            }
            if (!o && !a) {
                e.$rendered = undefined;
            }
            c.length && (0, f.default)(i, c, 1);
            if (u.clip) {
                var T = {
                    $id: e.$id,
                    type: "clipOver",
                    props: r
                };
                T.$origin = e;
                i.$children.push(T);
            }
            if (u.line) {
                e.$rendered = true;
                var M = {
                    $id: e.$id,
                    type: "line",
                    settings: u,
                    props: r
                };
                M.$origin = e;
                i.$children.push(M);
            }
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = function e(t, i) {
            var r = this;
            var n = false;
            this.$extendList.forEach(function(e) {
                if (e.onRender) {
                    var a = e.onRender.call(r, t, i);
                    if (a) {
                        n = a;
                    }
                }
            });
            return n;
        };
        e.exports = function(e, t, i) {
            var r = this;
            var a = t || r.$children;
            if (!i && !r.webgl) {
                a = a.filter(function(e) {
                    return e.props.$insight !== false;
                });
            }
            a.forEach(function(t, i) {
                var l = t.props;
                var f = void 0;
                if (l && t.type !== "clip" && t.type !== "text" && t.type !== "clipOver" && t.type !== "line") {
                    f = l.width * l.height;
                    if (f > 200 * 200 && !t.settings.transform && !t.settings.rotate) {
                        var s = a.length;
                        for (var c = i + 1; c < s; c++) {
                            var u = a[c];
                            if (u.$cannotCover) {
                                continue;
                            }
                            if (u.type === "clip") {
                                while (c < s && a[++c].type !== "clipOver") {}
                                continue;
                            }
                            var d = u.settings;
                            if (!u.type || u.type !== "img") {
                                if (!(u.type === "fillRect" && d.fillRect.indexOf("rgba") === -1)) {
                                    u.$cannotCover = true;
                                    continue;
                                }
                            }
                            var h = u.props;
                            if (h.width * h.height < 200 * 200) {
                                u.$cannotCover = true;
                                continue;
                            }
                            if (h.width * h.height < f) {
                                continue;
                            }
                            if (u.img && !u.img.$noAlpha) {
                                u.$cannotCover = true;
                                continue;
                            }
                            if (d.globalAlpha !== 1 || d.globalCompositeOperation || d.transform || d.rotate) {
                                u.$cannotCover = true;
                                continue;
                            }
                            if (n.default.pointInRect(l.left, l.top, h.left, h.left + h.width, h.top, h.top + h.height) && n.default.pointInRect(l.left + l.width, l.top + l.height, h.left, h.left + h.width, h.top, h.top + h.height)) {
                                if (true) {
                                    t.$origin.$useless = true;
                                }
                                return;
                            }
                        }
                    }
                }
                var v = t.settings || {};
                if (o.call(r, t, v)) {
                    return;
                }
                if (true) {
                    if (t.$origin) {
                        t.$origin.$useless = false;
                    }
                }
                var p = e || r.$paintContext;
                if (t.type === "clip") {
                    p.save();
                    p.beginPath();
                    p.moveTo(l.left, l.top);
                    p.lineTo(l.left + l.width, l.top);
                    p.lineTo(l.left + l.width, l.top + l.height);
                    p.lineTo(l.left, l.top + l.height);
                    p.lineTo(l.left, l.top);
                    p.closePath();
                    p.clip();
                }
                var g = false;
                if (v.globalCompositeOperation) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.globalCompositeOperation = v.globalCompositeOperation;
                }
                if (p.$globalAlpha !== v.globalAlpha) {
                    p.$globalAlpha = p.globalAlpha = v.globalAlpha;
                }
                if (v.translate) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.translate(v.translate[0] || 0, v.translate[1] || 0);
                }
                if (v.rotate) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.translate(v.beforeRotate[0] || 0, v.beforeRotate[1] || 0);
                    p.rotate(v.rotate || 0);
                    p.translate(v.afterRotate[0] || 0, v.afterRotate[1] || 0);
                }
                if (v.scale) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.scale(v.scale[0] || 1, v.scale[1] || 1);
                }
                if (v.transform) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.transform(1, v.transform.fh, v.transform.fv, 1, v.transform.fx, v.transform.fy);
                }
                if (t.type === "img") {
                    p.drawImage(t.img, l.cutLeft, l.cutTop, l.cutWidth, l.cutHeight, l.left, l.top, l.width, l.height);
                    if (true) {
                        if (r.$plugin) {
                            r.$plugin.drawImage(r, l);
                        }
                    }
                } else if (t.type === "text" && l.content) {
                    p.font = l.font;
                    p.fillStyle = l.color || "white";
                    p.textAlign = l.align;
                    p.textBaseline = l.baseline;
                    p[l.type || "fillText"](l.content, l.left, l.top);
                } else if (t.type === "fillRect") {
                    p.fillStyle = v.fillRect;
                    p.fillRect(l.left, l.top, l.width, l.height);
                } else if (t.type === "line") {
                    p.beginPath();
                    var $ = l.border.substr(l.border.indexOf(" ")) || "black";
                    p.strokeStyle = $;
                    p.lineWidth = l.border.split(" ")[0] || 1;
                    p.moveTo(l.left, l.top);
                    p.lineTo(l.left + l.width, l.top);
                    p.lineTo(l.left + l.width, l.top + l.height);
                    p.lineTo(l.left, l.top + l.height);
                    p.closePath();
                    p.stroke();
                } else if (t.type === "clipOver") {
                    p.restore();
                }
                if (g) {
                    p.$globalAlpha = false;
                    p.restore();
                }
            });
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(116);
        var n = k(r);
        var a = i(120);
        var o = k(a);
        var l = i(113);
        var f = k(l);
        var s = i(18);
        var c = k(s);
        var u = i(114);
        var d = k(u);
        var h = i(19);
        var v = k(h);
        var p = i(115);
        var g = k(p);
        var $ = i(117);
        var m = k($);
        var y = i(118);
        var b = k(y);
        var w = i(119);
        var x = k(w);
        var S = i(7);
        var A = k(S);
        function k(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var T = {
            start: o.default,
            paint: f.default,
            add: A.default.prototype.add,
            remove: n.default,
            register: g.default,
            clear: c.default,
            setFpsHandler: m.default,
            setMaxFps: b.default,
            pause: d.default,
            on: A.default.prototype.on,
            off: A.default.prototype.off,
            trigger: A.default.prototype.trigger,
            broadcast: A.default.prototype.broadcast,
            nextTick: v.default,
            getAllChildren: A.default.prototype.getAllChildren
        };
        if (true) {
            T.skeleton = x.default;
        }
        e.exports = T;
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = l(r);
        var a = i(3);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var e = this;
            if (true) {
                e.$plugin.timeCollect(e, "custom", "START");
            }
            n.default.execFuncs(e.hooks.beforeTick, e, [ e.$rafTime ]);
            if (true) {
                e.$plugin.timeCollect(e, "preprocessTimeSpend", "START");
            }
            e.children.forEach(function(e) {
                e.recalculate();
            });
            if (!e.$freezing) {
                e.$lastTickChildren = e.$children;
                e.$children = [];
                this.children.sort(function(e, t) {
                    var i = n.default.funcOrValue(e.style.zIndex, e);
                    var r = n.default.funcOrValue(t.style.zIndex, t);
                    if (i === r) return 0;
                    return i > r ? 1 : -1;
                }).forEach(function(t, i) {
                    e.$perPaint(t, i);
                });
            }
            if (true) {
                e.$plugin.timeCollect(e, "preprocessTimeSpend", "END");
            }
            if (true) {
                e.$plugin.timeCollect(e, "paintTimeSpend", "START");
            }
            if (e.$paintContext.clearRect) {
                e.$paintContext.clearRect(0, 0, this.width, this.height);
                e.$render();
            } else {
                e.$render();
            }
            if (true) {
                e.$plugin.timeCollect(e, "paintTimeSpend", "END");
            }
            n.default.execFuncs(e.hooks.ticked, e, [ e.$rafTime ]);
            if (e.hooks.nextTick) {
                n.default.execFuncs(e.hooks.nextTick, e, [ e.$rafTime ]);
                delete e.hooks.nextTick;
            }
            if (true) {
                e.$plugin.timeCollect(e, "custom", "END");
            }
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            this.$pausing = e === undefined ? true : e;
        };
    }, function(e, t, i) {
        "use strict";
        var r = function e(t) {
            var i = this;
            this.$extendList.forEach(function(e) {
                if (e.onCreate) {
                    e.onCreate.call(i, t);
                }
            });
        };
        e.exports = function(e, t) {
            var i = this;
            if (true) {
                this.fpsHandler = this.fpsHandler || function(e) {
                    if (this.maxFps > 0 && e < this.maxFps - 5 && e < 40) {
                        console.warn("[Easycanvas] Low FPS detected (" + e + "/" + this.maxFps + ").");
                    }
                };
            }
            var n = t || {};
            e = this.$dom = e || this.$dom;
            if (true) {
                if (!e) {
                    console.error('[Easycanvas] Not found <canvas> element in "register" function.');
                }
            }
            for (var a in n) {
                this[a] = n[a];
            }
            this.name = n.name || e.id || e.classList && e.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (n.fullScreen && typeof document !== "undefined") {
                e.width = e.style.width = document.body.clientWidth || document.documentElement.clientWidth;
                e.height = e.style.height = document.body.clientHeight || document.documentElement.clientHeight;
            }
            if (true) {
                if (n.width && e.attributes.width && n.width !== e.width || n.height && e.attributes.height && n.height !== e.height) {
                    console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
                }
            }
            e.width = this.width = this.width || n.width || e.width;
            e.height = this.height = this.height || n.height || e.height;
            if (true) {
                this.$plugin.register(this);
            }
            this.events = n.events || {};
            this.hooks = n.hooks || {};
            if (this.$inBrowser) {
                var o = [ "contextmenu", "mousewheel", "click", "dblclick", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove" ];
                o.forEach(function(t) {
                    e.addEventListener(t, i.$eventHandler.bind(i));
                });
            }
            if (true) {
                if (this.$paintContext) {
                    console.error("[Easycanvas] Current instance is already registered.");
                }
            }
            r.call(this, n);
            this.$paintContext = this.$paintContext || e.getContext("2d");
            return this;
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = a(r);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            n.default.execFuncs(e.hooks.beforeRemove, e, e.$tickedTimes++);
            e.style.visible = false;
            e.$removing = true;
            if (e.$parent) {
                e.$parent.children = e.$parent.children.filter(function(e) {
                    return e.$removing !== true;
                });
            } else {
                this.children = this.children.filter(function(e) {
                    return e.$removing !== true;
                });
            }
            if (e.$canvas) {
                e.$canvas = undefined;
                e.$parent = undefined;
                e.$tickedTimes = undefined;
                e.$cache = {};
                e.$rendered = false;
                if (true) {
                    e.$perf = undefined;
                }
                n.default.execFuncs(e.hooks.removed, e, e.$tickedTimes);
            }
            if (t) {
                this.children.splice(this.children.indexOf(e), 1);
            }
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            this.fpsHandler = e;
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            this.maxFps = e || -1;
        };
    }, function(e, t, i) {
        "use strict";
        if (true) {
            e.exports = function() {
                var e = this;
                e.children[0].__proto__.getAllChildren.call(e).forEach(function(e) {
                    e.uncombine();
                    e.$combine = true;
                });
                e.paint();
                e.children[0].__proto__.getAllChildren.call(e).forEach(function(e) {
                    e.$combine = false;
                });
                var t = "";
                t += "var $SKL=document.getElementsByTagName('canvas')[0];";
                t += "$SKL.width=" + e.width + ";$SKL.height=" + e.height + ";";
                t += "$SKL.style.width='100%';$SKL.style.width='100%';";
                t += "var SKLIMG=[];";
                t += "var SKL = function(){";
                t += "var _=$SKL.getContext('2d');";
                var i = e.$children;
                i.forEach(function(e) {
                    var i = e.props;
                    var r = e.settings;
                    if (e.type === "img") {
                        t += "_.globalAlpha=" + r.globalAlpha + ";";
                        if (e.img && e.img.$origin) {
                            t += e.img.$origin.join(";") + ";";
                            t += "_.drawImage(tempCanvas, " + i.cutLeft + ", " + i.cutTop + ", " + i.cutWidth + ", " + i.cutHeight + ", " + i.left + ", " + i.top + ", " + i.width + ", " + i.height + ");";
                        } else if (e.img && e.img.src) {
                            t += "var img = new Image();";
                            t += "var imgUrl='" + e.img.src + "';if(SKLIMG.indexOf(imgUrl)===-1){SKLIMG.push(imgUrl);img.onload=function(){_.clearRect(0,0,$SKL.width,$SKL.height);SKL();}};";
                            t += "img.src=imgUrl;";
                            t += "_.drawImage(img, " + i.cutLeft + ", " + i.cutTop + ", " + i.cutWidth + ", " + i.cutHeight + ", " + i.left + ", " + i.top + ", " + i.width + ", " + i.height + ");";
                        } else {
                            t += "_.fillStyle='#666';";
                            t += "_.fillRect(" + i.left + ", " + i.top + ", " + i.width + ", " + i.height + ");";
                        }
                    } else if (e.type === "fillRect") {
                        t += "_.globalAlpha=" + r.globalAlpha + ";";
                        t += "_.fillStyle='" + r.fillRect + "';";
                        t += "_.fillRect(" + i.left + ", " + i.top + ", " + i.width + ", " + i.height + ");";
                    }
                });
                t += "_.globalAlpha=1;";
                t += "};SKL($SKL);";
                console.log(t);
            };
        }
    }, function(e, t, i) {
        "use strict";
        var r = i(59);
        var n = l(r);
        var a = i(20);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = function e() {
            var t = Date.now();
            o.default.$lastPaintTime = this.$nextTickTime = t;
            if (t - this.fpsCalculateTime >= 1e3) {
                this.fpsCalculateTime = t;
                if (this.fpsHandler) {
                    this.fpsHandler.call(this, this.fps);
                }
                this.lastFps = this.fps;
                this.fps = 0;
            }
            (0, n.default)(s.bind(this));
        };
        var s = function e(t) {
            this.$rafTime = t;
            f.call(this);
            if (this.maxFps > 0 && this.maxFps < 60) {
                if (time - this.$lastPaintTime <= 1e3 / this.maxFps) {
                    return;
                }
                this.$lastPaintTime = time - (time - this.$lastPaintTime) % (1e3 / this.maxFps);
            } else {
                this.$lastPaintTime = Date.now();
            }
            this.fps++;
            this.paint();
        };
        e.exports = function() {
            this.fpsCalculateTime = Date.now();
            f.call(this);
            return this;
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(1);
        var n = l(r);
        var a = i(3);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (true) {
                var e = "__EASYCANVAS_BRIDGE_TOPANEL__";
                var t = function t(i) {
                    i.tabId = window[o.default.devFlag].tabId;
                    window.document.dispatchEvent(new CustomEvent(e, {
                        detail: JSON.parse(JSON.stringify(i))
                    }));
                };
                var i = "24px san-serif";
                var r = "18px san-serif";
                var n = function e(t, r) {
                    var n = document.createElement("canvas");
                    var a = n.getContext("2d");
                    a.font = r || i;
                    return a.measureText(t).width;
                };
                setTimeout(function() {
                    t({
                        name: "init"
                    });
                });
                var a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==";
                var l = function() {
                    var e = document.createElement("canvas");
                    e.width = 40;
                    e.height = 20;
                    var t = e.getContext("2d");
                    t.beginPath();
                    t.moveTo(0, 20);
                    t.lineTo(40, 20);
                    t.lineTo(20, 0);
                    t.closePath();
                    t.fill();
                    return e;
                }();
                var f = null;
                var s = null;
                var c = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "custom", "loadArea", "jumpArea" ];
                var u = {
                    drawImage: function e(t, i) {
                        if (!window[o.default.devFlag].isPaintRecording) return;
                        if (i) {
                            t.$perf.$paintArea += i[7] * i[8];
                            t.$perf.$loadArea += i[3] * i[4];
                        }
                        t.$perf.$paintTimes++;
                    },
                    jumpRender: function e(t, i) {
                        t.$perf.$jumpArea += i[7] * i[8];
                    },
                    register: function e(t) {
                        t.$id = Math.random().toString(36).substr(2);
                        t.$perf = {};
                        c.forEach(function(e) {
                            t.$perf[e] = 0;
                            t.$perf["$" + e] = 0;
                        });
                        setInterval(function() {
                            c.forEach(function(e) {
                                t.$perf[e] = t.$perf["$" + e];
                                t.$perf["$" + e] = 0;
                            });
                        }, 1e3);
                        if (!t.$flags.devtoolHanged) {
                            window[o.default.devFlag].$canvas[t.$id] = t;
                            t.$flags.devtoolHanged = true;
                        }
                    },
                    timeCollect: function e(t, i, r) {
                        t.$perf["$" + i] += (r === "START" || r === "PAUSE" ? -1 : 1) * (performance ? performance.now() : Date.now());
                    },
                    selectSprite: function e(c, d, h) {
                        window[o.default.devFlag].MaskCanvasBase64 = a;
                        if (!h || !window[o.default.devFlag].selectMode) {
                            u.cancelSelectSprite(d);
                            return false;
                        }
                        if (!f) {
                            var v = 0;
                            var p = {};
                            var g = {};
                            f = d.add({
                                name: o.default.devFlag,
                                content: {
                                    img: d.imgLoader(a)
                                },
                                style: {
                                    border: function e() {
                                        if (this.getStyle("width") < 2 && this.getStyle("height") < 2) {
                                            return "10 rgba(0, 0, 255, 0.5)";
                                        }
                                        return "1 blue";
                                    }
                                },
                                webgl: undefined,
                                children: !d.$paintContext.clearRect ? [] : [ {
                                    name: o.default.devFlag,
                                    data: {},
                                    style: {
                                        locate: "center",
                                        left: function e() {
                                            var t = p.left + p.width / 2;
                                            if (t - v / 2 < 10) {
                                                t = v / 2 + 10;
                                            } else if (t + v / 2 > this.$canvas.width - 10) {
                                                t = this.$canvas.width - v / 2 - 10;
                                            }
                                            return t - this.$parent.$cache.left;
                                        },
                                        top: function e() {
                                            var t = p.top + p.height + 30;
                                            if (this.data.above = t + 30 > this.$canvas.height) {
                                                t = p.top - 32;
                                            }
                                            return t - this.$parent.$cache.top;
                                        },
                                        width: function e() {
                                            return v;
                                        },
                                        height: 32,
                                        color: "orange",
                                        backgroundColor: "black",
                                        textVerticalAlign: "top",
                                        textAlign: "center",
                                        textFont: i
                                    },
                                    hooks: {
                                        beforeTick: function e() {
                                            p = this.$parent.getRect();
                                            this.content.text = "<" + h.name + "> | " + Math.round(this.$parent.getStyle("width")) + "×" + Math.round(this.$parent.getStyle("height"));
                                            v = n(this.content.text) + 20;
                                        }
                                    },
                                    children: [ {
                                        name: o.default.devFlag,
                                        content: {
                                            img: l
                                        },
                                        style: {
                                            left: function e() {
                                                return p.left + p.width / 2 - this.$parent.$cache.left;
                                            },
                                            top: function e() {
                                                return this.$parent.data.above ? 5 + 16 : -5 - 16;
                                            },
                                            width: 20,
                                            height: 10,
                                            rotate: function e() {
                                                return this.$parent.data.above ? 180 : 0;
                                            }
                                        }
                                    } ]
                                }, {
                                    name: o.default.devFlag,
                                    style: {
                                        visible: function e() {
                                            return this.getStyle("width") < this.data.value;
                                        },
                                        locate: "center",
                                        left: function e() {
                                            var t = g.left + (f.getSelfStyle("left") - s.getSelfStyle("left")) / 2;
                                            return t - this.$parent.$cache.left;
                                        },
                                        top: function e() {
                                            var t = f.getSelfStyle("top");
                                            return t - this.$parent.$cache.top;
                                        },
                                        width: function e() {
                                            return n(this.content.text, r) + 10;
                                        },
                                        height: 20,
                                        backgroundColor: "#ddd",
                                        color: "black",
                                        textVerticalAlign: "middle",
                                        textAlign: "center",
                                        textFont: r
                                    },
                                    data: {},
                                    hooks: {
                                        beforeTick: function e() {
                                            g = s.getRect();
                                            this.data.value = Math.round(f.getSelfStyle("left") - s.getSelfStyle("left"));
                                            this.content.text = "left: " + String(this.data.value);
                                        }
                                    }
                                }, {
                                    name: o.default.devFlag,
                                    style: {
                                        visible: function e() {
                                            return this.getStyle("height") < this.data.value;
                                        },
                                        locate: "center",
                                        left: function e() {
                                            var t = f.getSelfStyle("left");
                                            return t - this.$parent.$cache.left;
                                        },
                                        top: function e() {
                                            var t = g.top + (f.getSelfStyle("top") - s.getSelfStyle("top")) / 2;
                                            return t - this.$parent.$cache.top;
                                        },
                                        width: function e() {
                                            return n(this.content.text, r) + 10;
                                        },
                                        height: 20,
                                        backgroundColor: "#ddd",
                                        color: "black",
                                        textVerticalAlign: "middle",
                                        textAlign: "center",
                                        textFont: r
                                    },
                                    data: {},
                                    hooks: {
                                        beforeTick: function e() {
                                            g = s.getRect();
                                            this.data.value = Math.round(f.getSelfStyle("top") - s.getSelfStyle("top"));
                                            this.content.text = "top: " + String(this.data.value);
                                        }
                                    }
                                } ]
                            });
                            s = d.add({
                                name: o.default.devFlag,
                                style: {
                                    locate: "lt"
                                },
                                children: [ {
                                    name: o.default.devFlag,
                                    style: {
                                        locate: "lt",
                                        left: 0,
                                        top: 0,
                                        width: function e() {
                                            return f.getSelfStyle("left") - this.$parent.getStyle("left");
                                        },
                                        height: function e() {
                                            return f.getSelfStyle("top") - this.$parent.getStyle("top");
                                        },
                                        backgroundColor: "rgba(140, 205, 255, 0.1)",
                                        border: "1 rgba(80, 120, 200, 0.9)"
                                    }
                                } ]
                            });
                        }
                        [ "left", "top", "rotate", "rx", "ry", "scale", "width", "height", "locate" ].forEach(function(e) {
                            (function(e) {
                                f.style[e] = function() {
                                    if (e === "width" || e === "height") {
                                        return h.getStyle(e) || h.getRect()[e] || .1;
                                    }
                                    return h.getStyle(e);
                                };
                            })(e);
                        });
                        [ "left", "top" ].forEach(function(e) {
                            (function(e) {
                                s.style[e] = function() {
                                    if (!h.$parent) return 0;
                                    return h.$parent.getStyle(e);
                                };
                            })(e);
                        });
                        f.style.zIndex = Number.MAX_SAFE_INTEGER;
                        s.style.zIndex = Number.MAX_SAFE_INTEGER - 1;
                        f.style.visible = function() {
                            return window[o.default.devFlag].selectMode && h.$canvas;
                        };
                        s.style.visible = function() {
                            return window[o.default.devFlag].selectMode && h.$parent && h.$parent.$canvas;
                        };
                        f.style.opacity = .8;
                        f.webgl = h.webgl ? {} : undefined;
                        if (f.webgl) {
                            for (var $ in h.webgl) {
                                (function(e) {
                                    f.webgl[e] = function() {
                                        if (typeof h.webgl[e] === "function") {
                                            return h.webgl[e].call(h);
                                        }
                                        return h.webgl[e];
                                    };
                                })($);
                            }
                            f.webgl.img = d.imgLoader(a);
                            f.webgl.colors = false;
                            f.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (c) {
                            d.remove(f);
                            d.remove(s);
                            f = null;
                            t({
                                name: "selectSprite",
                                id: d.$id,
                                value: {
                                    sprite: h.$id,
                                    canvas: d.$id
                                }
                            });
                            window[o.default.devFlag].current = {
                                $sprite: h,
                                $canvas: d
                            };
                            window[o.default.devFlag].selectMode = false;
                        }
                        return true;
                    },
                    cancelSelectSprite: function e(t) {
                        if (!f) return;
                        t.remove(f);
                        t.remove(s);
                        f = null;
                    }
                };
                return u;
            }
        };
    }, function(e, t, i) {
        "use strict";
        var r = i(112);
        var n = u(r);
        var a = i(107);
        var o = u(a);
        var l = i(123);
        var f = u(l);
        var s = i(36);
        var c = u(s);
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var d = function e(t) {
            this.imgLoader = c.default;
            for (var i in f.default) {
                this[i] = this[i] || JSON.parse(JSON.stringify(f.default[i]));
            }
            if (!t) {
                return;
            }
            if (!t.el) {
                t = {
                    el: t
                };
            }
            if (t.el) {
                this.register(typeof t.el === "string" ? document.querySelector(t.el) : t.el, t);
            }
        };
        d.prototype.$extendList = [];
        for (var h in o.default) {
            if (Object.prototype.hasOwnProperty.call(o.default, h)) {
                d.prototype[h] = o.default[h];
            }
        }
        for (var v in n.default) {
            if (Object.prototype.hasOwnProperty.call(n.default, v)) {
                d.prototype[v] = n.default[v];
            }
        }
        e.exports = d;
    }, function(e, t) {
        "use strict";
        var i = {
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
        e.exports = i;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, i) {
        "use strict";
        var r = i(36);
        var n = l(r);
        var a = i(37);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var i;
            (0, o.default)(e, function(e) {
                return (0, n.default)(e, function(e) {
                    var r = e.width, n = e.height;
                    var a = e.getContext("2d").getImageData(0, 0, r, n);
                    var o = a.data;
                    for (var l = o.length - 1; l >= 0; l -= 4) {
                        if (t && t.conversion) {
                            var f = t.conversion({
                                r: o[l - 3],
                                g: o[l - 2],
                                b: o[l - 1],
                                a: o[l]
                            }, (l + 1 >> 2) % r, Math.floor((l + 1 >> 2) / r));
                            o[l - 3] = f.r;
                            o[l - 2] = f.g;
                            o[l - 1] = f.b;
                            o[l - 0] = f.a;
                        }
                    }
                    e.getContext("2d").clearRect(0, 0, r, n);
                    e.getContext("2d").putImageData(a, 0, 0);
                    i = e;
                }, {
                    canvas: true,
                    cacheFlag: Math.random()
                });
            });
            return function() {
                return i;
            };
        };
    }, function(e, t) {
        "use strict";
        e.exports = function e(t) {
            var i = t.width;
            var r = t.height;
            var n = document.createElement("canvas");
            n.width = i;
            n.height = r;
            var a = n.getContext("2d");
            a.scale(1, -1);
            a.translate(0, -r);
            a.drawImage(t, 0, 0);
            var o = a.getImageData(0, 0, i, r);
            return {
                canvas: a,
                img: o
            };
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t) {
            return {
                type: "multline-text",
                text: e,
                config: t
            };
        };
    } ]);
});

