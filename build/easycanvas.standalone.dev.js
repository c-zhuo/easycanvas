(function t(e, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var n = r();
        for (var a in n) (typeof exports === "object" ? exports : e)[a] = n[a];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function r(n) {
            if (e[n]) return e[n].exports;
            var a = e[n] = {
                exports: {},
                id: n,
                loaded: false
            };
            t[n].call(a.exports, a, a.exports, r);
            a.loaded = true;
            return a.exports;
        }
        r.m = t;
        r.c = e;
        r.p = "";
        return r(0);
    }([ function(t, e, r) {
        t.exports = r(39);
    }, function(t, e) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(t) {
                return Object.prototype.toString.call(t) === "[object Array]";
            },
            funcOrValue: function t(e, r) {
                if (typeof e === "function") {
                    return e.call(r);
                }
                return e;
            },
            execFuncs: function t(e, n, a) {
                if (e) {
                    if (!r.isArray(a)) {
                        a = [ a ];
                    }
                }
                if (typeof e === "function") {
                    e.apply(n, a);
                } else if (r.isArray(e)) {
                    e.length && e.forEach(function(t) {
                        t && t.apply(n, a);
                    });
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function t(e, r, n, a, i, o) {
                return !(e < n || e > a || r < i || r > o);
            },
            firstValuable: function t(e, r, n) {
                return typeof e === "undefined" ? typeof r === "undefined" ? n : r : e;
            }
        };
        t.exports = r;
    }, function(t, e) {
        "use strict";
        var r = 3.141593;
        t.exports = function(t, e, n, a, i, o) {
            var l = i ? -i / 180 * r : 0;
            var s = t, f = e;
            if (i) {
                s = (t - n) * Math.cos(l) - (e - a) * Math.sin(l) + n;
                f = (t - n) * Math.sin(l) + (e - a) * Math.cos(l) + a;
            }
            if (o) {
                return [ s, f ];
            }
            return {
                x: s,
                y: f
            };
        };
    }, , function(t, e) {
        "use strict";
        t.exports = {
            xywh: [ "sx", "sy", "sw", "sh", "tx", "ty", "tw", "th" ],
            txywh: [ "tx", "ty", "tw", "th" ],
            sxywh: [ "sx", "sy", "sw", "sh" ],
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.7.3"
        };
    }, , , , , function(t, e) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
        var n = {};
        var a = [];
        var i = "processing";
        var o = 0;
        var l = function t(e, i, l) {
            var s = l || {};
            var f = t.cacheCanvas;
            if ((typeof e === "undefined" ? "undefined" : r(e)) === "object") {
                var u = e;
                s.callbackArgs = s.callbackArgs || [];
                t(u.shift(), function(e) {
                    s.callbackArgs.push(e);
                    if (u.length > 1) {
                        t(u, i, s);
                    } else {
                        t(u[0], function(t) {
                            s.callbackArgs.push(t);
                            i(s.callbackArgs);
                        }, s);
                    }
                }, l);
                return;
            }
            var c = e + "_" + JSON.stringify(l) + "_" + f;
            if (n[c]) {
                if (i) {
                    if (n[c].width && i) {
                        i(n[c]);
                    } else {
                        setTimeout(function() {
                            t(e, i, l);
                        }, 100);
                    }
                    return;
                } else {
                    return n[c];
                }
            }
            var d = new Image();
            d._complete = false;
            if (s.block) {
                d.src = e;
                o++;
            } else if (o === 0) {
                d.src = e;
            } else {
                a.push({
                    imgObj: d,
                    src: e
                });
            }
            n[c] = d;
            var h = void 0;
            if (s.canvas || s.alphaColor || f) {
                h = document.createElement("canvas");
                h.width = h.height || 0;
                n[c] = h;
            }
            d.onload = function(t) {
                d._complete = true;
                if (d.src.substr(-3) === "jpg" || d.src.substr(-3) === "jpeg" || d.src.substr(-3) === "bmp") {
                    d.$noAlpha = true;
                } else if (d.src.indexOf("data:image/jpg;") === 0) {
                    d.$noAlpha = true;
                }
                if (s.block) {
                    o--;
                    if (o === 0) {
                        a.forEach(function(t) {
                            t.imgObj.src = t.src;
                        });
                        a.splice(0);
                    }
                }
                if (h && (s.canvas || s.alphaColor || f)) {
                    var e = h.getContext("2d");
                    h.width = d.width;
                    h.height = d.height;
                    h.$noAlpha = d.$noAlpha;
                    e.drawImage(d, 0, 0);
                    if (s.alphaColor) {
                        var r = e.getImageData(0, 0, d.width, d.height);
                        var n = [];
                        for (var l = 0; l < r.data.length; l += 4) {
                            var u = r.data[l] + r.data[l + 1] + r.data[l + 2];
                            var c = 1;
                            if (r.data[l] < c && r.data[l + 1] < c && r.data[l + 2] < c) {
                                r.data[l + 3] = Math.floor(u / 255);
                            }
                        }
                        e.putImageData(r, 0, 0);
                        h.$noAlpha = false;
                    }
                    d = h;
                }
                if (i) {
                    i(d);
                }
            };
            d.onerror = function() {
                n[c] = d;
            };
            return h || d;
        };
        l.cacheCanvas = false;
        t.exports = l;
    }, function(t, e) {
        "use strict";
        var r = "processing";
        var n = {};
        function a(t, e) {
            if (t && t.match(/^data:/)) {
                e && e(t);
                return;
            }
            if (n[t]) {
                if (n[t] !== r) {
                    e(n[t]);
                } else {
                    setTimeout(function() {
                        a(t, e);
                    }, 100);
                }
                return;
            }
            n[t] = r;
            var i = new XMLHttpRequest();
            i.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
                    n[t] = r.result;
                    e && e(r.result);
                };
                r.readAsDataURL(i.response);
            };
            i.open("GET", t);
            i.responseType = "blob";
            i.send();
        }
        t.exports = a;
    }, function(t, e, r) {
        "use strict";
        var n = r(2);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = 3.141593;
        t.exports = function(t, e, r, n, a, i, l, s, f) {
            var u = f ? -f / 180 * o : 0;
            if (u) {
                t = (t - l) * Math.cos(u) - (e - s) * Math.sin(u) + l;
                e = (t - l) * Math.sin(u) + (e - s) * Math.cos(u) + s;
            }
            return t >= r && t <= r + a && e >= n && e <= n + i;
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(2);
        var a = l(n);
        var i = r(11);
        var o = l(i);
        function l(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r, n, a, i, l, s, f, u, c) {
            if (!c) {
                if (e > i + s) return false;
                if (i > e + n) return false;
                if (t > a + l) return false;
                if (a > t + r) return false;
            }
            var d = (0, o.default)(t, e, a, i, l, s, f, u, c) || (0, o.default)(t + r, e, a, i, l, s, f, u, c) || (0, 
            o.default)(t, e + n, a, i, l, s, f, u, c) || (0, o.default)(t + r, e + n, a, i, l, s, f, u, c);
            if (d) return true;
            var h = (0, o.default)(a, i, t, e, r, n, f, u, -c) || (0, o.default)(a + l, i, t, e, r, n, f, u, -c) || (0, 
            o.default)(a, i + s, t, e, r, n, f, u, -c) || (0, o.default)(a + l, i + s, t, e, r, n, f, u, -c);
            if (h) return true;
            if (e > i && e + n < i + s && t < a && t + r > a + l) return true;
            if (t > a && t + r < a + l && e < i && e + n > i + s) return true;
            return false;
        };
    }, function(t, e, r) {
        "use strict";
        var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
        var a = r(1);
        var i = T(a);
        var o = r(4);
        var l = T(o);
        var s = r(31);
        var f = T(s);
        var u = r(30);
        var c = T(u);
        var d = r(15);
        var h = T(d);
        var v = r(16);
        var p = T(v);
        var g = r(32);
        var y = T(g);
        var $ = r(27);
        var x = T($);
        var m = r(29);
        var w = T(m);
        var b = r(28);
        var S = T(b);
        var k = r(33);
        var A = T(k);
        function T(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var O = 0;
        var M = function t(e) {
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
        var F = function t(e) {
            var r = e || {};
            if (!r.$id) {
                r.$id = Math.random().toString(36).substr(2);
            }
            r.$tickedTimes = r.$tickedTimes || 0;
            r.content = r.content || {};
            r.style = r.style || {};
            r.style.tx = r.style.tx || 0;
            r.style.ty = r.style.ty || 0;
            r.style.scale = i.default.firstValuable(r.style.scale, 1);
            r.style.opacity = i.default.firstValuable(r.style.opacity, 1);
            r.style.zIndex = r.style.zIndex || 0;
            r.style.locate = r.style.locate || "center";
            var n = i.default.funcOrValue(r.content.img);
            l.default.xywh.forEach(function(t) {
                r.style[t] = r.style[t] || 0;
            });
            r.events = r.events || {};
            if (true) {
                for (var a in r.events) {
                    if (typeof r.events[a] !== "function" && a !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + a + " is not a function.", r.events[a]);
                    }
                }
            }
            if (true) {
                r.$addIndex = O++;
            }
            r.events.eIndex = r.events.eIndex;
            r.hooks = r.hooks || {};
            if (true) {
                r.$perf = {};
            }
            if (true) {
                if (!r.name && r.content.img && r.content.img.src) {
                    var o = r.content.img.src.match(/.*\/([^\/]*)$/);
                    if (o && o[1]) {
                        r.name = o[1];
                    }
                }
                r.name = r.name || "Unnamed Sprite";
            }
            r.children = r.children || [];
            M(r);
            r.$cache = {};
            r.$styleCacheTime = {};
            return r;
        };
        var _ = function t(e) {
            var r = this;
            this.$extendList.forEach(function(t) {
                t.call(r, e);
            });
        };
        var R = function t(e) {
            var r = F(e);
            for (var n in r) {
                if (Object.prototype.hasOwnProperty.call(r, n)) {
                    this[n] = r[n];
                }
            }
            _.call(this, r);
            return this;
        };
        R.prototype.$extendList = [];
        R.prototype.add = function(t) {
            if (!t) {
                return;
            }
            this.children.push(t);
            M(this);
            return this.children[this.children.length - 1];
        };
        R.prototype.getRect = function(t, e) {
            var r = this;
            var n = {};
            l.default.txywh.forEach(function(t) {
                n[t] = r.getStyle(t, e);
            });
            if (n.tw === 0 && this.content.img && !t) {
                var a = i.default.funcOrValue(this.content.img, this);
                n.tw = a.width;
                n.th = a.height;
            }
            var o = this.getStyle("locate");
            if (o === "lt") {} else if (o === "ld") {
                n.ty -= n.th;
            } else if (o === "rt") {
                n.tx -= n.tw;
            } else if (o === "rd") {
                n.tx -= n.tw;
                n.ty -= n.th;
            } else {
                n.tx -= n.tw >> 1;
                n.ty -= n.th >> 1;
            }
            return n;
        };
        R.prototype.getSelfStyle = function(t) {
            var e = {};
            if (t) {
                return i.default.funcOrValue(this.style[t], this);
            }
            for (var r in this.style) {
                e[r] = i.default.funcOrValue(this.style[r], this);
            }
            return e;
        };
        R.prototype.getStyle = function(t, e) {
            var r = this;
            if (e && r.$cache[t] !== undefined) {
                return r.$cache[t];
            }
            var n = i.default.funcOrValue(r.style[t], r);
            if (r.$parent) {
                var a = r.$parent.getStyle(t);
                if (t === "tx" || t === "ty") {
                    a = i.default.firstValuable(a, 0);
                    return a + i.default.firstValuable(n, 0);
                } else if (t === "scale" || t === "opacity") {
                    a = i.default.firstValuable(a, 1);
                    return a * i.default.firstValuable(n, 1);
                }
            }
            return n;
        };
        R.prototype.remove = function(t) {
            if (t) {
                this.$canvas.remove(t);
                i.default.execFuncs(t.hooks.removed, t);
                return;
            }
            if (this.$parent) {
                this.$parent.remove(this);
            } else {
                this.$canvas.remove(this);
            }
            i.default.execFuncs(this.hooks.removed, this);
        };
        R.prototype.update = function(t) {
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
        R.prototype.getAllChildren = function(t) {
            var e = this;
            var r = t ? [ e ] : [];
            e.children.forEach(function(t) {
                r = r.concat(t.getAllChildren(true));
            });
            return r;
        };
        R.prototype.getOuterRect = w.default;
        R.prototype.combine = S.default;
        R.prototype.uncombine = A.default;
        R.prototype.combineAsync = function() {
            if (this.$combine || this.$combine === 0) return this;
            this.$combine = 0;
            this.off("ticked", this.combine);
            this.on("ticked", this.combine, 100);
            return this;
        };
        R.prototype.nextTick = p.default;
        R.prototype.on = f.default;
        R.prototype.off = c.default;
        R.prototype.clear = h.default;
        R.prototype.trigger = y.default;
        R.prototype.broadcast = x.default;
        t.exports = R;
    }, , function(t, e) {
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
    }, , , , , , , , function(t, e) {
        "use strict";
        var r = function t(e) {
            setTimeout(e, 1e3 / 60);
        };
        var n = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || r : r;
        t.exports = n;
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = 3.141593;
        var i = function t(e) {
            return e.$lastPaintTime || Date.now();
        };
        var o = {
            linear: function t(e, r, n) {
                var a = i(this);
                var o = false;
                var l = void 0;
                var s = function() {
                    var t = this.$lastPaintTime;
                    var i = (t - a) / n;
                    var f = (r - e) * i + e;
                    if (o) {
                        if (r > e) {
                            while (f > r) {
                                f -= r - e;
                            }
                        } else {
                            while (f < r) {
                                f += e - r;
                            }
                        }
                    } else {
                        if (r > e && f > r) {
                            s.$done = true;
                            f = r;
                        } else if (r < e && f < r) {
                            s.$done = true;
                            f = r;
                        }
                    }
                    if (i >= 1 && l) {
                        l.call(this, f);
                        l = null;
                    }
                    return f;
                }.bind(this);
                s.loop = function() {
                    o = true;
                    return s;
                };
                s.restart = function() {
                    a = i(this);
                    return s;
                };
                s.then = function(t) {
                    l = t;
                    return s;
                };
                return s;
            },
            pendulum: function t(e, r, n, o) {
                var l = i(this);
                var s = o || {};
                s.start = s.start || 0;
                var f = false;
                var u = void 0;
                var c = s.cycle || 1;
                var d = function() {
                    var t = i(this);
                    var o = (t - l) / n;
                    if (!f) {
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
                    var h = o * a * 2 - a / 2 + s.start / 360 * a;
                    var v = (r - e) * (Math.sin(h) + 1) / 2 + e;
                    if (o >= c && u) {
                        u.call(this, v);
                        u = null;
                    }
                    return v;
                }.bind(this);
                d.loop = function() {
                    f = true;
                    return d;
                };
                d.restart = function() {
                    l = i(this);
                    return d;
                };
                d.then = function(t) {
                    u = t;
                    return d;
                };
                return d;
            },
            ease: function t(e, r, n) {
                return this.pendulum(e, r, n * 2, {
                    cycle: .5
                });
            },
            oneByOne: function t(e) {
                var r = e;
                var n = false;
                var a = function t() {
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
                    if (n) {
                        for (var a = 0; a < r.length; a++) {
                            r[a].$done = false;
                            r[a].$nextRestart = false;
                            r[a].restart();
                        }
                        return r[0]();
                    }
                    return r[r.length - 1]();
                };
                a.loop = function() {
                    n = true;
                    return a;
                };
                return a;
            }
        };
        var l = function t(e, r, a, i, l) {
            var s = (0, n.funcOrValue)(e[r]);
            if (true) {
                if (typeof s === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            s = s || 0;
            e[r] = o[a].bind(t)(s, i, l);
        };
        for (var s in o) {
            l[s] = o[s];
        }
        t.exports = l;
    }, function(t, e, r) {
        "use strict";
        var n = Object.assign || function(t) {
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
        var a = r(4);
        var i = s(a);
        var o = r(1);
        var l = s(o);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        if (true) {
            if (!window[i.default.devFlag]) {
                var f = window[i.default.devFlag] = {
                    isPaintRecording: false,
                    selectMode: false,
                    current: {},
                    version: i.default.version,
                    $canvas: {},
                    $plugin: null
                };
                var u = {
                    getSprite: function t(e) {
                        if (!f.isPaintRecording) return [];
                        var r = {};
                        if (e) {
                            var a = f.$canvas[e].children;
                            var o = f.$canvas[e].$children;
                            var s = function t(e) {
                                if (e.name === i.default.devFlag) return;
                                r[e.$id] = {
                                    name: e.name,
                                    $addIndex: e.$addIndex,
                                    parent: e.$parent && e.$parent.$id,
                                    style: {},
                                    children: e.children.filter(function(t) {
                                        return t.name !== i.default.devFlag;
                                    }).map(function(t) {
                                        return t.$id;
                                    }),
                                    rendered: e.$rendered
                                };
                                for (var n in e.style) {
                                    r[e.$id].style[n] = l.default.funcOrValue(e.style[n], e);
                                }
                                i.default.xywh.forEach(function(t) {
                                    r[e.$id].style[t] = Math.round(r[e.$id].style[t]);
                                });
                                [ "physics", "$perf" ].forEach(function(t) {
                                    r[e.$id][t] = e[t];
                                });
                                if (e.webgl) {
                                    r[e.$id].webgl = {};
                                    [ "rx", "ry", "rz", "tx", "ty", "tz" ].forEach(function(t) {
                                        r[e.$id].webgl[t] = l.default.funcOrValue(e.webgl[t], e);
                                    });
                                }
                                if (e.children) {
                                    e.children.sort(function(t, e) {
                                        return t.$addIndex < e.$addIndex ? -1 : 1;
                                    }).forEach(t);
                                }
                            };
                            a.sort(function(t, e) {
                                return t.$addIndex < e.$addIndex ? -1 : 1;
                            }).forEach(s);
                        } else {
                            for (var u in f.$canvas) {
                                r = n(r, f.$plugin.getSprite(u));
                            }
                        }
                        return r;
                    },
                    selectSpriteById: function t(e, r) {
                        if (!r) {
                            for (var n in f.$canvas) {
                                var a = u.selectSpriteById(e, n);
                                if (a) {
                                    return {
                                        $sprite: a.$sprite || a,
                                        $canvas: f.$canvas[n]
                                    };
                                }
                            }
                            return false;
                        }
                        var i = function t(n) {
                            for (var a = 0; a < n.length; a++) {
                                if (n[a].$id === e) return n[a];
                                var i = t(n[a].children);
                                if (i) {
                                    return {
                                        $sprite: i.$sprite || i,
                                        $canvas: f.$canvas[r]
                                    };
                                }
                            }
                            return false;
                        };
                        var o = f.$canvas[r].children;
                        var l = i(o);
                        if (l) {
                            return {
                                $sprite: l.$sprite || l,
                                $canvas: f.$canvas[r]
                            };
                        }
                    },
                    updateSprite: function t(e) {
                        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "style";
                        var a = arguments[2];
                        var i = arguments[3];
                        var o = u.selectSpriteById(e, i).$sprite;
                        if (!o) console.warn("Sprite " + spriteId + " Not Found.");
                        n(o[r], a);
                    },
                    highlightSprite: function t(e, r, n) {
                        f.selectMode = Boolean(r);
                        var a = u.selectSpriteById(e, n);
                        var i = a.$sprite;
                        var o = a.$canvas;
                        if (r && o && i) {
                            o.$plugin.selectSprite(false, o, i);
                        } else if (o) {
                            o.$plugin.cancelSelectSprite(o);
                        }
                    },
                    sendGlobalHook: function t(e, r) {
                        var n = u.selectSpriteById(e, r);
                        var a = n.$sprite;
                        var i = n.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + a.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = a;
                        window.$1 = i;
                    },
                    pause: function t(e, r) {
                        var n = f.$canvas[e];
                        n.$pausing = typeof r !== "undefined" ? r : !n.$pausing;
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
                        if (!f.isPaintRecording) return e;
                        for (var r in f.$canvas) {
                            e.canvas.push({
                                $id: r,
                                name: f.$canvas[r].name,
                                perf: f.$canvas[r].$perf,
                                fps: f.$canvas[r].lastFps,
                                size: {
                                    styleWidth: f.$canvas[r].$dom.getBoundingClientRect().width || parseInt(f.$canvas[r].$dom.style.width) || f.$canvas[r].$dom.width,
                                    styleHeight: f.$canvas[r].$dom.getBoundingClientRect().height || parseInt(f.$canvas[r].$dom.style.height) || f.$canvas[r].$dom.height,
                                    canvasWidth: f.$canvas[r].$dom.width,
                                    canvasHeight: f.$canvas[r].$dom.height
                                }
                            });
                        }
                        return e;
                    }
                };
                f.$plugin = u;
            }
        }
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
                a.default.execFuncs(this.hooks[e], this, t);
            }
            t.unshift(e);
            var r = this.children;
            r && r.forEach(function(e) {
                e.broadcast.apply(e, t);
            });
        };
    }, function(t, e, r) {
        "use strict";
        var n = Object.assign || function(t) {
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
        var a = r(1);
        var i = o(a);
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var l = 1;
        var s = 2;
        var f = 3;
        t.exports = function() {
            var t = this;
            var e = this;
            if (e.$combine) {
                return l;
            }
            setTimeout(function() {
                if (e.$combine) {
                    return l;
                }
                if (i.default.funcOrValue(e.style.visible, e) === false) return f;
                var r = t.$canvas;
                var a = e.getRect(false, true);
                if (a.tx < 0 || a.tx + a.tw > r.width) return s;
                if (a.ty < 0 || a.ty + a.th > r.height) return s;
                var o = e.getAllChildren(true);
                for (var u = 0; u < o.length; u++) {
                    var c = o[u];
                    var d = c.content.img;
                    if (d && d.src) {
                        if (!d.$painted || d.width === 0 || d.complete === false || d.naturalHeight === 0) {
                            return f;
                        }
                    }
                    if (c.getStyle("scale") !== 1) {
                        return f;
                    }
                }
                var h = void 0;
                if (i.default.funcOrValue(e.style.overflow, e) !== "hidden") {
                    h = e.getOuterRect(false, true);
                    h.tx = Math.floor(h.tx);
                    h.ty = Math.floor(h.ty);
                    h.tw = Math.round(h.tw);
                    h.th = Math.round(h.th);
                    h.tr = Math.round(h.tr);
                    h.tb = Math.round(h.tb);
                    if (h.tx < 0 || h.tr > r.width) return s;
                    if (h.ty < 0 || h.tb > r.height) return s;
                } else {
                    h = a;
                }
                e.off("ticked", t.combine);
                var v = r.$children.filter(function(t) {
                    for (var e = 0; e < o.length; e++) {
                        if (o[e].$id === t.$id) return true;
                    }
                });
                var p = r.$children;
                var g = e.getStyle("opacity");
                v.forEach(function(t) {
                    if (!t.settings) return;
                    t.settings.$combineGlobalAlpha = t.settings.globalAlpha;
                    t.settings.globalAlpha = g > 0 ? t.settings.globalAlpha / g : 1;
                });
                r.$children = v;
                r.$paintContext.clearRect(0, 0, r.width, r.height);
                r.$lastTickChildren = false;
                r.$render();
                v.forEach(function(t) {
                    if (!t.settings) return;
                    t.settings.globalAlpha = t.settings.$combineGlobalAlpha;
                });
                var y = document.createElement("canvas");
                y.width = h.tw;
                y.height = h.th;
                var $ = y.getContext("2d");
                $.drawImage(r.$dom, h.tx, h.ty, h.tw, h.th, 0, 0, h.tw, h.th);
                e.children.forEach(function(t) {
                    t.$cache = {};
                });
                e.$combine = {
                    content: e.content,
                    children: e.children,
                    style: e.style
                };
                e.children = [];
                e.content = {
                    img: y
                };
                var x = e.getSelfStyle("tx") - (Math.floor(a.tx) - h.tx);
                var m = e.getSelfStyle("ty") - (Math.floor(a.ty) - h.ty);
                e.style = n({}, e.style, {
                    scale: 1,
                    tx: x,
                    ty: m,
                    tw: y.width,
                    th: y.height,
                    backgroundColor: undefined
                });
                r.$children = p;
                r.$lastTickChildren = false;
                r.paint();
                return l;
            });
            return this;
        };
    }, function(t, e) {
        "use strict";
        t.exports = function(t, e) {
            var r = this;
            var n = r.getRect(t, e);
            n.tr = n.tx + n.tw;
            n.tb = n.ty + n.th;
            this.children.forEach(function(r) {
                if (r.$cache.visible === false) return;
                var a = r.getOuterRect(t, e);
                if (a.tx < n.tx) n.tx = a.tx;
                if (a.ty < n.ty) n.ty = a.ty;
                if (a.tr > n.tr) n.tr = a.tr;
                if (a.tb > n.tb) n.tb = a.tb;
                n.tw = n.tr - n.tx;
                n.th = n.tb - n.ty;
            });
            return n;
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            if (!this.hooks[t]) return;
            if (this.hooks[t] === e || this.hooks[t].$handle === e || !e) {
                delete this.hooks[t];
            } else if (a.default.isArray(this.hooks[t])) {
                if (this.hooks[t].indexOf(e) >= 0) {
                    this.hooks[t][this.hooks[t].indexOf(e)] = undefined;
                } else if (this.hooks[t].indexOf(e.$handle) >= 0) {
                    this.hooks[t][this.hooks[t].indexOf(e.$handle)] = undefined;
                }
            }
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
            var n = e;
            if (r) {
                var i = this;
                n = function t() {
                    var a = Date.now();
                    if (a > n.$lastTriggerTime + r) {
                        n.$lastTriggerTime = a;
                        var o = Array.prototype.slice.call(arguments);
                        e.apply(i, o);
                    }
                };
                n.$lastTriggerTime = -1;
                n.$handle = e;
            }
            if (!this.hooks[t]) {
                this.hooks[t] = n;
            } else if (a.default.isArray(this.hooks[t])) {
                this.hooks[t].push(n);
            } else {
                this.hooks[t] = [ this.hooks[t], n ];
            }
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
                return a.default.execFuncs(this.hooks[e], this, t);
            }
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
            if (!this.$combine) return;
            r(this, this.$combine);
            this.$combine = false;
        };
    }, , , , , , function(t, e, r) {
        "use strict";
        var n = r(4);
        var a = A(n);
        var i = r(60);
        var o = A(i);
        var l = r(24);
        var s = A(l);
        var f = r(102);
        var u = A(f);
        var c = r(1);
        var d = A(c);
        var h = r(25);
        var v = A(h);
        var p = r(9);
        var g = A(p);
        var y = r(101);
        var $ = A(y);
        var x = r(103);
        var m = A(x);
        var w = r(13);
        var b = A(w);
        var S = r(26);
        var k = A(S);
        function A(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var T = {
            painter: o.default,
            imgLoader: g.default,
            imgPretreat: $.default,
            multlineText: m.default,
            transition: v.default,
            tick: s.default,
            utils: d.default,
            mirror: u.default,
            class: {
                sprite: b.default
            },
            sprite: b.default,
            $version: a.default.version,
            env: "develop"
        };
        T.extend = function(t) {
            var e = T.sprite.prototype.$extendList;
            if (e.indexOf(t) >= 0) return;
            e.push(t);
        };
        T.use = function(t) {
            var e = T.painter.prototype.$extendList;
            if (e.indexOf(t) >= 0) return;
            if (t.onUse) {
                t.onUse(T);
            }
            e.push(t);
        };
        T.component = function(t, e) {
            t(T, e);
        };
        var O = typeof window !== "undefined";
        if (O) {
            if (window.Easycanvas) {
                console.warn("[Easycanvas] already loaded, it should be loaded only once.");
            } else {
                if (true) {
                    setTimeout(function() {
                        console.log("%c Easycanvas %c You are using the develop version " + a.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                    }, 500);
                }
                if (true) {
                    window.Easycanvas = T;
                }
            }
        }
        t.exports = T;
    }, , , , function(t, e, r) {
        "use strict";
        var n = r(47);
        var a = h(n);
        var i = r(49);
        var o = h(i);
        var l = r(44);
        var s = h(l);
        var f = r(48);
        var u = h(f);
        var c = r(59);
        var d = h(c);
        function h(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var v = {
            $render: o.default,
            $eventHandler: s.default,
            $perPaint: a.default,
            $rAFer: u.default
        };
        if (true) {
            v.$plugin = (0, d.default)();
        }
        t.exports = v;
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = l(n);
        var i = r(4);
        var o = l(i);
        function l(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var s = typeof wx !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var f = function t(e) {
            return e.sort(function(t, e) {
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                        return a.default.funcOrValue(t.style.zIndex, t) < a.default.funcOrValue(e.style.zIndex, e) ? 1 : -1;
                    }
                }
                return a.default.funcOrValue(a.default.firstValuable(t.events.eIndex, t.style.zIndex), t) < a.default.funcOrValue(a.default.firstValuable(e.events.eIndex, e.style.zIndex), e) ? 1 : -1;
            });
        };
        var u = function t(e, r) {
            var n = e.getRect();
            return a.default.pointInRect(r.canvasX, r.canvasY, n.tx, n.tx + n.tw, n.ty, n.ty + n.th);
        };
        var c = function t(e, r, n) {
            if (!e || !e.length) return;
            if (r.$stopPropagation) return;
            var i = e.length;
            for (var l = 0; l < i; l++) {
                var s = e[l];
                if (a.default.funcOrValue(s.style.visible, s) === false) continue;
                if (s.events && s.events.pointerEvents === "none") continue;
                if (u(s, r)) {
                    var c = s.events.interceptor;
                    if (true) {
                        if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                            c = false;
                        }
                    }
                    if (c) {
                        var d = a.default.firstValuable(c.call(s, r), r);
                        if (!d || d.$stopPropagation) return;
                    }
                }
                var v = s.$combine ? s.$combine.children : s.children;
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                        v = s.children;
                    }
                }
                if (v.length) {
                    t(f(v.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return a.default.funcOrValue(t.style.zIndex, t) >= 0;
                            }
                        }
                        return a.default.funcOrValue(a.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0;
                    })), r, n);
                }
                if (r.$stopPropagation) break;
                if (u(s, r)) {
                    if (true) {
                        if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                            if (s.name !== o.default.devFlag) {
                                r.stopPropagation();
                                if (s.$canvas.$plugin.selectSprite(r.type === "click" || r.type === "touchend", s.$canvas, s)) {
                                    return;
                                }
                            }
                            continue;
                        }
                    }
                    h(s, r, n);
                    r.stopPropagation();
                    return;
                }
                if (v.length) {
                    t(f(v.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return a.default.funcOrValue(t.style.zIndex, t) < 0;
                            }
                        }
                        return !(a.default.funcOrValue(a.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0);
                    })), r, n);
                }
            }
        };
        var d = function t(e, r) {
            var n = this;
            this.$extendList.forEach(function(t) {
                if (t.onEvent) {
                    t.onEvent.call(n, e, r);
                }
            });
        };
        var h = function t(e, r, n) {
            n && n.push(e);
            if (e.events[r.type]) {
                e.events[r.type].call(e, r);
                if (r.$stopPropagation) return;
            }
            if (e.$parent) {
                t(e.$parent, r, n);
            } else {
                if (e.$canvas && !r.$stopPropagation) {
                    t(e.$canvas, r);
                    r.stopPropagation();
                }
            }
        };
        var v = {
            x: 0,
            y: 0,
            timeStamp: 0
        };
        var p;
        p = function t(e, r) {
            var n = this;
            var i = void 0;
            var o = void 0;
            var l = 1;
            var u = 1;
            if (!r) {
                if (!e.layerX && e.targetTouches && e.targetTouches[0]) {
                    i = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
                    o = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
                } else if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
                    i = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
                    o = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
                } else {
                    i = e.layerX;
                    o = e.layerY;
                }
                var h = false;
                if (this.$dom.getBoundingClientRect) {
                    var g = this.$dom.getBoundingClientRect();
                    g.width > g.height !== this.width > this.height;
                    l = Math.floor(g[h ? "height" : "width"]) / this.width;
                    u = Math.floor(g[h ? "width" : "height"]) / this.height;
                }
            }
            var y = r || {
                type: e.type,
                canvasX: i / l,
                canvasY: o / u,
                event: e
            };
            if (s && n.fastclick) {
                if (y.type === "click" && !y.$fakeClick) {
                    return;
                } else if (y.type === "touchstart") {
                    v.x = y.canvasX;
                    v.y = y.canvasY;
                    v.timeStamp = Date.now();
                } else if (y.type === "touchend") {
                    if (Math.abs(v.x - y.canvasX) < 30 && Math.abs(v.y - y.canvasY) < 30 && Date.now() - v.timeStamp < 200) {
                        p.call(this, null, {
                            $fakeClick: true,
                            type: "click",
                            canvasX: v.x,
                            canvasY: v.y,
                            event: e
                        });
                    }
                }
            }
            y.stopPropagation = function() {
                y.$stopPropagation = true;
            };
            if (n.events.interceptor) {
                y = a.default.firstValuable(n.events.interceptor.call(n, y), y);
                if (!y || y.$stopPropagation) return;
            }
            var $ = [];
            c(f(n.children), y, $);
            d.call(n, y, $);
            if ((y.type === "mousemove" || y.type === "touchmove") && n.eLastMouseHover && $.indexOf(n.eLastMouseHover) === -1) {
                var x = n.eLastMouseHover["events"]["mouseout"] || n.eLastMouseHover["events"]["touchout"];
                if (x) {
                    x.call(n.eLastMouseHover, y);
                }
            }
            n.eLastMouseHover = $[0];
            if (!$.length && n.eLastMouseHover) {
                var m = n.eLastMouseHover["events"]["mouseout"];
                if (m) {
                    m.call(n.eLastMouseHover, y);
                }
                n.eLastMouseHover = null;
            }
            var w = n.events[y.type];
            if (w && !y.$stopPropagation) {
                if (w.call(n, y)) {
                    n.eHoldingFlag = false;
                    return true;
                }
            }
        };
        t.exports = p;
    }, function(t, e) {
        "use strict";
        t.exports = function(t, e, r, n) {
            if (e.sx < 0 && e.sw) {
                var a = -e.sx / e.sw;
                e.tx += e.tw * a;
                e.sx = 0;
            }
            if (e.sy < 0 && e.sh) {
                var i = -e.sy / e.sh;
                e.ty += e.th * i;
                e.sy = 0;
            }
            if (r && e.sx + e.sw > r) {
                var o = (e.sx + e.sw - r) / e.sw;
                e.sw -= e.sw * o;
                e.tw -= e.tw * o;
            }
            if (n && e.sy + e.sh > n) {
                var l = (e.sy + e.sh - n) / e.sh;
                e.sh -= e.sh * l;
                e.th -= e.th * l;
            }
            if (e.tx < 0 && e.tw > -e.tx) {
                var s = -e.tx / e.tw;
                e.sx += e.sw * s;
                e.sw -= e.sw * s;
                e.tw = e.tw + e.tx;
                e.tx = 0;
            }
            if (e.ty < 0 && e.th > -e.ty) {
                var f = -e.ty / e.th;
                e.sy += e.sh * f;
                e.sh -= e.sh * f;
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
        var n = r(1);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
            e.filter(function(t) {
                var e = a.default.funcOrValue(t.style.zIndex, t);
                if (r < 0) {
                    return e < 0;
                }
                return e >= 0;
            }).sort(function(t, e) {
                var r = a.default.funcOrValue(t.style.zIndex, t);
                var n = a.default.funcOrValue(e.style.zIndex, e);
                if (r === n) return 0;
                return r > n ? 1 : -1;
            }).forEach(function(e, r) {
                t.$perPaint.call(t, e, r);
            });
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = h(n);
        var i = r(4);
        var o = h(i);
        var l = r(45);
        var s = h(l);
        var f = r(46);
        var u = h(f);
        var c = r(12);
        var d = h(c);
        function h(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var v = a.default.blend;
        var p = function t(e) {
            var r = /[^\u4e00-\u9fa5]/;
            return !r.test(e);
        };
        var g = function t() {
            var e = this;
            this.$canvas.$extendList.forEach(function(t) {
                if (t.onPaint) {
                    t.onPaint.call(e);
                }
            });
        };
        var y = function t(e) {
            if (!e || !e.style) return;
            var r = a.default.funcOrValue(e.style.scale, e);
            if (r !== 1) return e;
            return t(e.$parent);
        };
        t.exports = function(t, e) {
            t.$rendered = false;
            a.default.execFuncs(t.hooks.beforeTick, t, t.$tickedTimes);
            if (a.default.funcOrValue(t.style.visible, t) === false) {
                t.$cache = {};
                t.$cache.visible = false;
                a.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
                return;
            }
            var r = this;
            g.call(t);
            var n = {};
            n.img = a.default.funcOrValue(t.content.img, t);
            if (t.content.text) {
                n.text = a.default.funcOrValue(t.content.text, t);
            }
            if (typeof n.img === "string") {
                n.img = t.content.img = r.imgLoader(n.img);
            }
            var i = n.text;
            var o = n.img;
            if (o && o._complete === false) o = false;
            n.tx = a.default.funcOrValue(t.style.tx, t) || 0;
            if (t.$parent) {
                n.tx += a.default.firstValuable(t.$parent.$cache.tx, 0);
            }
            t.$cache.tx = n.tx;
            n.ty = a.default.funcOrValue(t.style.ty, t) || 0;
            if (t.$parent) {
                n.ty += a.default.firstValuable(t.$parent.$cache.ty, 0);
            }
            t.$cache.ty = n.ty;
            var l = 0;
            var f = 0;
            if (o && o.width) {
                l = o.width || 0;
                f = o.height || 0;
                n.sx = a.default.funcOrValue(t.style.sx, t) || 0;
                n.sy = a.default.funcOrValue(t.style.sy, t) || 0;
                n.sw = a.default.funcOrValue(t.style.sw, t) || l;
                n.sh = a.default.funcOrValue(t.style.sh, t) || f;
                n.sx = Math.round(n.sx);
                n.sy = Math.round(n.sy);
                n.sw = Math.round(n.sw);
                n.sh = Math.round(n.sh);
            }
            n.tw = a.default.funcOrValue(t.style.tw, t) || n.sw || 0;
            n.th = a.default.funcOrValue(t.style.th, t) || n.sh || 0;
            n.locate = a.default.funcOrValue(t.style.locate, t);
            n.rotate = a.default.funcOrValue(t.style.rotate, t) || 0;
            n.overflow = a.default.funcOrValue(t.style.overflow, t) || 0;
            n.overflowX = a.default.funcOrValue(t.style.overflowX, t) || 0;
            n.overflowY = a.default.funcOrValue(t.style.overflowY, t) || 0;
            n.scale = a.default.funcOrValue(t.style.scale, t) || 1;
            if (t.$parent) {
                n.scale *= a.default.firstValuable(t.$parent.$cache.scale, 1);
            }
            t.$cache.scale = n.scale;
            var c = t.children;
            if (n.scale !== 1) {
                var h = n.scale;
                var $ = y(t);
                if ($) {
                    var x = $.getRect(t === $ ? false : true);
                    var m = x.tx + x.tw / 2;
                    var w = x.ty + x.th / 2;
                    n.tx -= (m - n.tx) * (h - 1);
                    n.ty -= (w - n.ty) * (h - 1);
                    n.tw *= h;
                    n.th *= h;
                }
            }
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
            n.tx = Math.round(n.tx);
            n.ty = Math.round(n.ty);
            n.tw = Math.round(n.tw);
            n.th = Math.round(n.th);
            var b = {};
            if (n.rotate) {
                n.rx = a.default.firstValuable(a.default.funcOrValue(t.style.rx, t), n.tx + .5 * n.tw);
                n.ry = a.default.firstValuable(a.default.funcOrValue(t.style.ry, t), n.ty + .5 * n.th);
                var S = a.default.firstValuable(n.rx, n.tx + .5 * n.tw);
                var k = a.default.firstValuable(n.ry, n.ty + .5 * n.th);
                b.beforeRotate = [ S, k ];
                b.rotate = -n.rotate * Math.PI / 180;
                b.rotate = Number(b.rotate.toFixed(4));
                b.afterRotate = [ -S, -k ];
            }
            var A = (0, d.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width, r.height, b.beforeRotate && b.beforeRotate[0], b.beforeRotate && b.beforeRotate[1], n.rotate);
            var T = (n.overflow || n.overflowX || n.overflowY) && n.overflow !== "visible";
            if (!A && !i) {
                if (!T) {
                    t.$rendered = undefined;
                    c.length && (0, u.default)(r, c, -1);
                    c.length && (0, u.default)(r, c, 1);
                }
                a.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
            } else {
                n.opacity = a.default.funcOrValue(t.style.opacity, t) || 0;
                if (t.$parent) {
                    n.opacity *= a.default.firstValuable(t.$parent.$cache.opacity, 1);
                }
                t.$cache.opacity = n.opacity;
                for (var O in t.style) {
                    if (typeof n[O] !== "undefined") continue;
                    n[O] = a.default.funcOrValue(t.style[O], t);
                }
                b.globalAlpha = a.default.firstValuable(n.opacity, 1);
                if (n.fh || n.fv) {
                    n.fh = n.fh || 0;
                    n.fv = n.fv || 0;
                    n.fx = n.fx || 0;
                    n.fy = n.fy || 0;
                    b.transform = {
                        fh: n.fh,
                        fv: n.fv,
                        fx: -(n.ty + (n.th >> 1)) * n.fv + n.fx,
                        fy: -(n.tx + (n.tw >> 1)) * n.fh + n.fy
                    };
                }
                if (n.blend) {
                    if (typeof n.blend === "string") {
                        b.globalCompositeOperation = n.blend;
                    } else {
                        b.globalCompositeOperation = v[n.blend];
                    }
                }
                if (n.backgroundColor) {
                    b.fillRect = n.backgroundColor;
                }
                if (n.border) {
                    b.line = n.border;
                }
                if (n.mirrX) {
                    b.translate = [ r.width, 0 ];
                    b.scale = [ -1, 1 ];
                    n.tx = r.width - n.tx - n.tw;
                    if (n.mirrY) {
                        b.translate = [ r.width, r.height ];
                        b.scale = [ -1, -1 ];
                        n.ty = r.height - n.ty - n.th;
                    }
                } else if (n.mirrY) {
                    b.translate = [ 0, r.height ];
                    b.scale = [ 1, -1 ];
                    n.ty = r.height - n.ty - n.th;
                }
                if (T) {
                    b.clip = true;
                }
                if (true) {
                    if (l && f) {
                        var M = n.tw * n.th / (n.sw * n.sh);
                        if (!t.$perf.paintRate || M > t.$perf.paintRate) {
                            t.$perf.paintRate = M;
                        }
                    }
                }
                if (b.clip) {
                    if (A) {
                        var F = {
                            $id: t.$id,
                            type: "clip",
                            props: n
                        };
                        F.$origin = t;
                        r.$children.push(F);
                    }
                }
                c.length && (0, u.default)(r, c, -1);
                if (b.fillRect) {
                    if (A) {
                        t.$rendered = true;
                        var _ = {
                            $id: t.$id,
                            type: "fillRect",
                            settings: b,
                            props: n
                        };
                        _.$origin = t;
                        r.$children.push(_);
                    }
                }
                if (l && n.opacity !== 0 && n.sw && n.sh) {
                    if (!n.rotate && !i) {
                        (0, s.default)(r, n, l, f);
                    }
                    var R = (0, d.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width - 1, r.height - 1, b.beforeRotate && b.beforeRotate[0], b.beforeRotate && b.beforeRotate[1], n.rotate);
                    if (R) {
                        t.$rendered = true;
                        var V = {
                            $id: t.$id,
                            type: "img",
                            settings: b,
                            img: o,
                            props: n
                        };
                        o.$painted = true;
                        V.$origin = t;
                        r.$children.push(V);
                    }
                }
                if (i) {
                    t.$rendered = true;
                    var E = n.tx;
                    var C = n.ty;
                    var I = n.align || n.textAlign || "left";
                    var P = n.textFont || "14px Arial";
                    var L = parseInt(P);
                    var H = "top";
                    var z = n.lineHeight || L;
                    if (I === "center") {
                        E += n.tw / 2;
                    } else if (I === "right") {
                        E += n.tw;
                    }
                    if (n.textVerticalAlign === "top") {
                        H = "top";
                    } else if (n.textVerticalAlign === "bottom") {
                        H = "bottom";
                        C += n.th;
                    } else if (n.textVerticalAlign === "middle") {
                        C += n.th >> 1;
                        H = "middle";
                    }
                    if (typeof i === "string" || typeof i === "number") {
                        if (C + L * 2 > 0 && C - L * 2 < r.height) {
                            r.$children.push({
                                $id: t.$id,
                                type: "text",
                                settings: b,
                                props: {
                                    tx: E,
                                    ty: C,
                                    content: String(i),
                                    fontsize: L,
                                    align: I,
                                    baseline: H,
                                    font: P,
                                    color: n.color,
                                    type: n.textType
                                },
                                $origin: t
                            });
                        }
                    } else if (i.length) {
                        i.forEach(function(e) {
                            r.$children.push({
                                $id: t.$id,
                                type: "text",
                                settings: b,
                                props: {
                                    tx: E + a.default.funcOrValue(e.tx, t),
                                    ty: C + a.default.funcOrValue(e.ty, t),
                                    content: a.default.funcOrValue(e.content, t),
                                    fontsize: L,
                                    baseline: H,
                                    align: I,
                                    font: P,
                                    color: n.color,
                                    type: n.textType
                                },
                                $origin: t
                            });
                        });
                    } else if (i.type === "multline-text") {
                        var j = i.text.split(/\t|\n/);
                        var N = [];
                        j.forEach(function(t, e) {
                            t = String.prototype.trim.apply(t);
                            if (i.config.start) {
                                t = t.replace(i.config.start, "");
                            }
                            var r = 0;
                            var a = n.tw;
                            while (t.length && r < t.length) {
                                if (a <= 0) {
                                    a = n.tw;
                                    N.push(t.substr(0, r));
                                    t = t.substr(r);
                                    r = 0;
                                }
                                r++;
                                a -= L * (p(t[r]) ? 1.05 : .6);
                            }
                            if (t || e) {
                                N.push(t);
                            }
                        });
                        N.forEach(function(e) {
                            r.$children.push({
                                $id: t.$id,
                                type: "text",
                                settings: b,
                                props: {
                                    tx: E,
                                    ty: C,
                                    fontsize: L,
                                    content: e,
                                    baseline: H,
                                    align: I,
                                    font: P,
                                    color: n.color,
                                    type: n.textType
                                },
                                $origin: t
                            });
                            C += z || L;
                        });
                    }
                }
                if (!o && !i) {
                    t.$rendered = undefined;
                }
                c.length && (0, u.default)(r, c, 1);
                if (b.clip) {
                    if (A) {
                        var B = {
                            $id: t.$id,
                            type: "clipOver",
                            props: n
                        };
                        B.$origin = t;
                        r.$children.push(B);
                    }
                }
                if (b.line) {
                    if (A) {
                        t.$rendered = true;
                        var D = {
                            $id: t.$id,
                            type: "line",
                            settings: b,
                            props: n
                        };
                        D.$origin = t;
                        r.$children.push(D);
                    }
                }
                a.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
            }
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(24);
        var a = l(n);
        var i = r(25);
        var o = l(i);
        function l(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t) {
            var e = this;
            var r = Date.now();
            o.default.$lastPaintTime = this.$nextTickTime = r;
            if (r - this.fpsCalculateTime >= 1e3) {
                this.fpsCalculateTime = r;
                if (this.fpsHandler) {
                    this.fpsHandler.call(this, this.fps);
                }
                this.lastFps = this.fps;
                this.fps = 0;
            }
            (0, a.default)(function(n) {
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
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = function t(e, r) {
            var n = this;
            var a = false;
            this.$extendList.forEach(function(t) {
                if (t.onRender) {
                    var i = t.onRender.call(n, e, r);
                    if (i) {
                        a = i;
                    }
                }
            });
            return a;
        };
        var l = function t(e, r) {
            var n = this;
            var i = e.props;
            var l = void 0;
            if (i && e.type !== "clip" && e.type !== "text" && e.type !== "clipOver" && e.type !== "line") {
                l = i.tw * i.th;
                if (l > 200 * 200 && !e.settings.transform && !e.settings.rotate) {
                    var s = n.$children;
                    var f = s.length;
                    for (var u = r + 1; u < f; u++) {
                        var c = s[u];
                        if (c.$cannotCover) {
                            continue;
                        }
                        if (c.type === "clip") {
                            while (u < f && s[++u].type !== "clipOver") {}
                            continue;
                        }
                        var d = c.settings;
                        if (!c.type || c.type !== "img") {
                            if (!(c.type === "fillRect" && d.fillRect.indexOf("rgba") === -1)) {
                                c.$cannotCover = true;
                                continue;
                            }
                        }
                        var h = c.props;
                        if (h.tw * h.th < 200 * 200) {
                            c.$cannotCover = true;
                            continue;
                        }
                        if (h.tw * h.th < l) {
                            continue;
                        }
                        if (c.img && !c.img.$noAlpha) {
                            c.$cannotCover = true;
                            continue;
                        }
                        if (d.globalAlpha !== 1 || d.globalCompositeOperation || d.transform || d.rotate) {
                            c.$cannotCover = true;
                            continue;
                        }
                        if (a.default.pointInRect(i.tx, i.ty, h.tx, h.tx + h.tw, h.ty, h.ty + h.th) && a.default.pointInRect(i.tx + i.tw, i.ty + i.th, h.tx, h.tx + h.tw, h.ty, h.ty + h.th)) {
                            if (true) {
                                e.$origin.$useless = true;
                            }
                            return;
                        }
                    }
                }
            }
            var v = e.settings || {};
            if (o.call(n, e, v)) {
                return;
            }
            if (true) {
                if (e.$origin) {
                    e.$origin.$useless = false;
                }
            }
            var p = n.$paintContext;
            if (e.type === "clip") {
                p.save();
                p.beginPath();
                p.moveTo(i.tx, i.ty);
                p.lineTo(i.tx + i.tw, i.ty);
                p.lineTo(i.tx + i.tw, i.ty + i.th);
                p.lineTo(i.tx, i.ty + i.th);
                p.lineTo(i.tx, i.ty);
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
            if (v.globalAlpha !== 1 && !isNaN(v.globalAlpha)) {
                if (!g) {
                    p.save();
                    g = true;
                }
                p.globalAlpha = v.globalAlpha;
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
            if (e.type === "img") {
                p.drawImage(e.img, i.sx, i.sy, i.sw, i.sh, i.tx, i.ty, i.tw, i.th);
                if (true) {
                    n.$plugin.drawImage(n, i);
                }
            } else if (e.type === "text" && i.content) {
                p.font = i.font;
                p.fillStyle = i.color || "white";
                p.textAlign = i.align;
                p.textBaseline = i.baseline;
                p[i.type || "fillText"](i.content, i.tx, i.ty);
            } else if (e.type === "fillRect") {
                p.fillStyle = v.fillRect;
                p.fillRect(i.tx, i.ty, i.tw, i.th);
            } else if (e.type === "line") {
                p.beginPath();
                p.strokeStyle = i.border.substr(i.border.indexOf(" ")) || "black";
                p.lineWidth = i.border.split(" ")[0] || 1;
                p.moveTo(i.tx, i.ty);
                p.lineTo(i.tx + i.tw, i.ty);
                p.lineTo(i.tx + i.tw, i.ty + i.th);
                p.lineTo(i.tx, i.ty + i.th);
                p.closePath();
                p.stroke();
            } else if (e.type === "clipOver") {
                p.restore();
            }
            if (g) {
                p.restore();
            }
        };
        t.exports = function() {
            var t = this;
            t.$children.forEach(l.bind(t));
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(54);
        var a = A(n);
        var i = r(58);
        var o = A(i);
        var l = r(51);
        var s = A(l);
        var f = r(15);
        var u = A(f);
        var c = r(52);
        var d = A(c);
        var h = r(16);
        var v = A(h);
        var p = r(53);
        var g = A(p);
        var y = r(55);
        var $ = A(y);
        var x = r(56);
        var m = A(x);
        var w = r(57);
        var b = A(w);
        var S = r(13);
        var k = A(S);
        function A(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var T = {
            start: o.default,
            paint: s.default,
            add: k.default.prototype.add,
            remove: a.default,
            register: g.default,
            clear: u.default,
            setFpsHandler: $.default,
            setMaxFps: m.default,
            pause: d.default,
            on: k.default.prototype.on,
            off: k.default.prototype.off,
            trigger: k.default.prototype.trigger,
            broadcast: k.default.prototype.broadcast,
            nextTick: v.default,
            getAllChildren: k.default.prototype.getAllChildren
        };
        if (true) {
            T.skeleton = b.default;
        }
        t.exports = T;
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = function t(e, r) {
            if (!e || e.length !== r.length) {
                return r;
            }
            for (var n = 0; n < e.length; n++) {
                var a = e[n];
                var i = r[n];
                if (a.$id !== i.$id || a.img !== i.img) return r;
                if (a.props && i.props) {
                    for (var o in i.props) {
                        if (i.props[o] !== a.props[o]) return r;
                    }
                }
            }
            return false;
        };
        t.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var t = this;
            a.default.execFuncs(t.hooks.beforeTick, t, [ t.$rafTime ]);
            if (!t.$freezing) {
                t.$lastTickChildren = t.$children;
                t.$children = [];
                if (true) {
                    t.$plugin.timeCollect(t, "preprocessTimeSpend", "START");
                }
                this.children.sort(function(t, e) {
                    var r = a.default.funcOrValue(t.style.zIndex, t);
                    var n = a.default.funcOrValue(e.style.zIndex, e);
                    if (r === n) return 0;
                    return r > n ? 1 : -1;
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
            if (t.$paintContext.clearRect) {
                var e = t.$nodiff ? t.$children : o(t.$lastTickChildren, t.$children);
                if (e) {
                    t.$paintContext.clearRect(0, 0, this.width, this.height);
                    t.$render();
                }
            } else {
                t.$render();
            }
            if (true) {
                t.$plugin.timeCollect(t, "paintTimeSpend", "END");
            }
            a.default.execFuncs(t.hooks.ticked, t, [ t.$rafTime ]);
            if (t.hooks.nextTick) {
                a.default.execFuncs(t.hooks.nextTick, t, [ t.$rafTime ]);
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
        var n = function t(e) {
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
            var a = e || {};
            t = this.$dom = t || this.$dom;
            if (true) {
                if (!t) {
                    console.error('[Easycanvas] Not found <canvas> element in "register" function.');
                }
            }
            for (var i in a) {
                this[i] = a[i];
            }
            this.name = a.name || t.id || t.classList && t.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (a.fullScreen && typeof document !== "undefined") {
                t.width = t.style.width = document.body.clientWidth || document.documentElement.clientWidth;
                t.height = t.style.height = document.body.clientHeight || document.documentElement.clientHeight;
            }
            if (true) {
                if (a.width && t.attributes.width && a.width !== t.width || a.height && t.attributes.height && a.height !== t.height) {
                    console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
                }
            }
            t.width = this.width = this.width || a.width || t.width;
            t.height = this.height = this.height || a.height || t.height;
            if (true) {
                this.$plugin.register(this);
            }
            this.events = a.events || {};
            this.hooks = a.hooks || {};
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
            n.call(this, a);
            this.$paintContext = this.$paintContext || t.getContext("2d");
            return this;
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r = this;
            a.default.execFuncs(t.hooks.beforeRemove, t, t.$tickedTimes++);
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
                    a.default.execFuncs(t.hooks.removed, t, t.$tickedTimes);
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
    }, function(t, e, r) {
        "use strict";
        if (true) {
            t.exports = function() {
                var t = this;
                t.children[0].__proto__.getAllChildren.call(t).forEach(function(t) {
                    t.uncombine();
                    t.$combine = true;
                });
                t.paint();
                t.children[0].__proto__.getAllChildren.call(t).forEach(function(t) {
                    t.$combine = false;
                });
                var e = "";
                e += "var $SKL=document.getElementsByTagName('canvas')[0];";
                e += "$SKL.width=" + t.width + ";$SKL.height=" + t.height + ";";
                e += "$SKL.style.width='100%';$SKL.style.width='100%';";
                e += "var SKLIMG=[];";
                e += "var SKL = function(){";
                e += "var _=$SKL.getContext('2d');";
                var r = t.$children;
                r.forEach(function(t) {
                    var r = t.props;
                    var n = t.settings;
                    if (t.type === "img") {
                        e += "_.globalAlpha=" + n.globalAlpha + ";";
                        if (t.img && t.img.$origin) {
                            e += t.img.$origin.join(";") + ";";
                            e += "_.drawImage(tempCanvas, " + r.sx + ", " + r.sy + ", " + r.sw + ", " + r.sh + ", " + r.tx + ", " + r.ty + ", " + r.tw + ", " + r.th + ");";
                        } else if (t.img && t.img.src) {
                            e += "var img = new Image();";
                            e += "var imgUrl='" + t.img.src + "';if(SKLIMG.indexOf(imgUrl)===-1){SKLIMG.push(imgUrl);img.onload=function(){_.clearRect(0,0,$SKL.width,$SKL.height);SKL();}};";
                            e += "img.src=imgUrl;";
                            e += "_.drawImage(img, " + r.sx + ", " + r.sy + ", " + r.sw + ", " + r.sh + ", " + r.tx + ", " + r.ty + ", " + r.tw + ", " + r.th + ");";
                        } else {
                            e += "_.fillStyle='#666';";
                            e += "_.fillRect(" + r.tx + ", " + r.ty + ", " + r.tw + ", " + r.th + ");";
                        }
                    } else if (t.type === "fillRect") {
                        e += "_.globalAlpha=" + n.globalAlpha + ";";
                        e += "_.fillStyle='" + n.fillRect + "';";
                        e += "_.fillRect(" + r.tx + ", " + r.ty + ", " + r.tw + ", " + r.th + ");";
                    }
                });
                e += "_.globalAlpha=1;";
                e += "};SKL($SKL);";
                console.log(e);
            };
        }
    }, function(t, e) {
        "use strict";
        t.exports = function() {
            this.fpsCalculateTime = Date.now();
            this.$rAFer(this.paint.bind(this));
            return this;
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var a = l(n);
        var i = r(4);
        var o = l(i);
        function l(t) {
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
                var r = "24px san-serif";
                var n = "18px san-serif";
                var a = function t(e, n) {
                    var a = document.createElement("canvas");
                    var i = a.getContext("2d");
                    i.font = n || r;
                    return i.measureText(e).width;
                };
                setTimeout(function() {
                    e({
                        name: "init"
                    });
                });
                var i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==";
                var l = function() {
                    var t = document.createElement("canvas");
                    t.width = 40;
                    t.height = 20;
                    var e = t.getContext("2d");
                    e.beginPath();
                    e.moveTo(0, 20);
                    e.lineTo(40, 20);
                    e.lineTo(20, 0);
                    e.closePath();
                    e.fill();
                    return t;
                }();
                var s = null;
                var f = null;
                var u = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
                var c = {
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
                        u.forEach(function(t) {
                            e.$perf[t] = 0;
                            e.$perf["$" + t] = 0;
                        });
                        setInterval(function() {
                            u.forEach(function(t) {
                                e.$perf[t] = e.$perf["$" + t];
                                e.$perf["$" + t] = 0;
                            });
                        }, 1e3);
                        if (!e.$flags.devtoolHanged) {
                            window[o.default.devFlag].$canvas[e.$id] = e;
                            e.$flags.devtoolHanged = true;
                        }
                    },
                    timeCollect: function t(e, r, n) {
                        e.$perf["$" + r] += (n === "START" || n === "PAUSE" ? -1 : 1) * Date.now();
                    },
                    selectSprite: function t(u, d, h) {
                        window[o.default.devFlag].MaskCanvasBase64 = i;
                        if (!h || !window[o.default.devFlag].selectMode) {
                            c.cancelSelectSprite(d);
                            return false;
                        }
                        if (!s) {
                            var v = 0;
                            var p = {};
                            var g = {};
                            s = d.add({
                                name: o.default.devFlag,
                                content: {
                                    img: d.imgLoader(i)
                                },
                                style: {
                                    border: function t() {
                                        if (this.getStyle("tw") < 2 && this.getStyle("th") < 2) {
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
                                        tx: function t() {
                                            var e = p.tx + p.tw / 2;
                                            if (e - v / 2 < 10) {
                                                e = v / 2 + 10;
                                            } else if (e + v / 2 > this.$canvas.width - 10) {
                                                e = this.$canvas.width - v / 2 - 10;
                                            }
                                            return e - this.$parent.$cache.tx;
                                        },
                                        ty: function t() {
                                            var e = p.ty + p.th + 30;
                                            if (this.data.above = e + 30 > this.$canvas.height) {
                                                e = p.ty - 32;
                                            }
                                            return e - this.$parent.$cache.ty;
                                        },
                                        tw: function t() {
                                            return v;
                                        },
                                        th: 32,
                                        color: "orange",
                                        backgroundColor: "black",
                                        textVerticalAlign: "top",
                                        textAlign: "center",
                                        textFont: r
                                    },
                                    hooks: {
                                        beforeTick: function t() {
                                            p = this.$parent.getRect();
                                            this.content.text = "<" + h.name + "> | " + Math.round(this.$parent.getStyle("tw")) + "×" + Math.round(this.$parent.getStyle("th"));
                                            v = a(this.content.text) + 20;
                                        }
                                    },
                                    children: [ {
                                        name: o.default.devFlag,
                                        content: {
                                            img: l
                                        },
                                        style: {
                                            tx: function t() {
                                                return p.tx + p.tw / 2 - this.$parent.$cache.tx;
                                            },
                                            ty: function t() {
                                                return this.$parent.data.above ? 5 + 16 : -5 - 16;
                                            },
                                            tw: 20,
                                            th: 10,
                                            rotate: function t() {
                                                return this.$parent.data.above ? 180 : 0;
                                            }
                                        }
                                    } ]
                                }, {
                                    name: o.default.devFlag,
                                    style: {
                                        visible: function t() {
                                            return this.getStyle("tw") < this.data.value;
                                        },
                                        locate: "center",
                                        tx: function t() {
                                            var e = g.tx + (s.getSelfStyle("tx") - f.getSelfStyle("tx")) / 2;
                                            return e - this.$parent.$cache.tx;
                                        },
                                        ty: function t() {
                                            var e = s.getSelfStyle("ty");
                                            return e - this.$parent.$cache.ty;
                                        },
                                        tw: function t() {
                                            return a(this.content.text, n) + 10;
                                        },
                                        th: 20,
                                        backgroundColor: "#ddd",
                                        color: "black",
                                        textVerticalAlign: "middle",
                                        textAlign: "center",
                                        textFont: n
                                    },
                                    data: {},
                                    hooks: {
                                        beforeTick: function t() {
                                            g = f.getRect();
                                            this.data.value = Math.round(s.getSelfStyle("tx") - f.getSelfStyle("tx"));
                                            this.content.text = "left: " + String(this.data.value);
                                        }
                                    }
                                }, {
                                    name: o.default.devFlag,
                                    style: {
                                        visible: function t() {
                                            return this.getStyle("th") < this.data.value;
                                        },
                                        locate: "center",
                                        tx: function t() {
                                            var e = s.getSelfStyle("tx");
                                            return e - this.$parent.$cache.tx;
                                        },
                                        ty: function t() {
                                            var e = g.ty + (s.getSelfStyle("ty") - f.getSelfStyle("ty")) / 2;
                                            return e - this.$parent.$cache.ty;
                                        },
                                        tw: function t() {
                                            return a(this.content.text, n) + 10;
                                        },
                                        th: 20,
                                        backgroundColor: "#ddd",
                                        color: "black",
                                        textVerticalAlign: "middle",
                                        textAlign: "center",
                                        textFont: n
                                    },
                                    data: {},
                                    hooks: {
                                        beforeTick: function t() {
                                            g = f.getRect();
                                            this.data.value = Math.round(s.getSelfStyle("ty") - f.getSelfStyle("ty"));
                                            this.content.text = "top: " + String(this.data.value);
                                        }
                                    }
                                } ]
                            });
                            f = d.add({
                                name: o.default.devFlag,
                                style: {
                                    locate: "lt"
                                },
                                children: [ {
                                    name: o.default.devFlag,
                                    style: {
                                        locate: "lt",
                                        tx: 0,
                                        ty: 0,
                                        tw: function t() {
                                            return s.getSelfStyle("tx") - this.$parent.getStyle("tx");
                                        },
                                        th: function t() {
                                            return s.getSelfStyle("ty") - this.$parent.getStyle("ty");
                                        },
                                        backgroundColor: "rgba(140, 205, 255, 0.1)",
                                        border: "1 rgba(80, 120, 200, 0.9)"
                                    }
                                } ]
                            });
                        }
                        [ "tx", "ty", "rotate", "rx", "ry", "scale", "tw", "th", "locate" ].forEach(function(t) {
                            (function(t) {
                                s.style[t] = function() {
                                    if (t === "tw" || t === "th") {
                                        return h.getStyle(t) || h.getRect()[t] || .1;
                                    }
                                    return h.getStyle(t);
                                };
                            })(t);
                        });
                        [ "tx", "ty" ].forEach(function(t) {
                            (function(t) {
                                f.style[t] = function() {
                                    if (!h.$parent) return 0;
                                    return h.$parent.getStyle(t);
                                };
                            })(t);
                        });
                        s.style.zIndex = Number.MAX_SAFE_INTEGER;
                        f.style.zIndex = Number.MAX_SAFE_INTEGER - 1;
                        s.style.visible = function() {
                            return window[o.default.devFlag].selectMode && h.$canvas;
                        };
                        f.style.visible = function() {
                            return window[o.default.devFlag].selectMode && h.$parent && h.$parent.$canvas;
                        };
                        s.style.opacity = .8;
                        s.webgl = h.webgl ? {} : undefined;
                        if (s.webgl) {
                            for (var y in h.webgl) {
                                (function(t) {
                                    s.webgl[t] = function() {
                                        if (typeof h.webgl[t] === "function") {
                                            return h.webgl[t].call(h);
                                        }
                                        return h.webgl[t];
                                    };
                                })(y);
                            }
                            s.webgl.img = d.imgLoader(i);
                            s.webgl.colors = false;
                            s.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (u) {
                            d.remove(s);
                            d.remove(f);
                            s = null;
                            e({
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
                    cancelSelectSprite: function t(e) {
                        if (!s) return;
                        e.remove(s);
                        e.remove(f);
                        s = null;
                    }
                };
                return c;
            }
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(50);
        var a = c(n);
        var i = r(43);
        var o = c(i);
        var l = r(61);
        var s = c(l);
        var f = r(9);
        var u = c(f);
        function c(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var d = function t(e) {
            this.imgLoader = u.default;
            for (var r in s.default) {
                this[r] = this[r] || JSON.parse(JSON.stringify(s.default[r]));
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
        for (var v in a.default) {
            if (Object.prototype.hasOwnProperty.call(a.default, v)) {
                d.prototype[v] = a.default[v];
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
        var n = r(9);
        var a = l(n);
        var i = r(10);
        var o = l(i);
        function l(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r;
            (0, o.default)(t, function(t) {
                return (0, a.default)(t, function(t) {
                    var n = t.width, a = t.height;
                    var i = t.getContext("2d").getImageData(0, 0, n, a);
                    var o = i.data;
                    for (var l = o.length - 1; l >= 0; l -= 4) {
                        if (e && e.conversion) {
                            var s = e.conversion({
                                r: o[l - 3],
                                g: o[l - 2],
                                b: o[l - 1],
                                a: o[l]
                            }, (l + 1 >> 2) % n, Math.floor((l + 1 >> 2) / n));
                            o[l - 3] = s.r;
                            o[l - 2] = s.g;
                            o[l - 1] = s.b;
                            o[l - 0] = s.a;
                        }
                    }
                    t.getContext("2d").clearRect(0, 0, n, a);
                    t.getContext("2d").putImageData(i, 0, 0);
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
            var n = e.height;
            var a = document.createElement("canvas");
            a.width = r;
            a.height = n;
            var i = a.getContext("2d");
            i.scale(1, -1);
            i.translate(0, -n);
            i.drawImage(e, 0, 0);
            var o = i.getImageData(0, 0, r, n);
            return {
                canvas: i,
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

