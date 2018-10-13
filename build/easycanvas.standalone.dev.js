(function t(e, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var n = r();
        for (var i in n) (typeof exports === "object" ? exports : e)[i] = n[i];
    }
})(this, function() {
    return function(t) {
        var e = {};
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
        }
        r.m = t;
        r.c = e;
        r.p = "";
        return r(0);
    }([ function(t, e, r) {
        t.exports = r(38);
    }, function(t, e) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(t) {
                return Object.prototype.toString.call(t) === "[object Array]";
            },
            funcOrValue: function t(e, r) {
                if (typeof e === "function") {
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
                    });
                    return a;
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function t(e, r, n, i, a, o) {
                return !(e < n || e > i || r < a || r > o);
            },
            firstValuable: function t(e, r, n) {
                return typeof e === "undefined" ? typeof r === "undefined" ? n : r : e;
            }
        };
        t.exports = r;
    }, function(t, e) {
        "use strict";
        var r = 3.141593;
        t.exports = function(t, e, n, i, a, o) {
            var s = a ? -a / 180 * r : 0;
            var f = t, l = e;
            if (a) {
                f = (t - n) * Math.cos(s) - (e - i) * Math.sin(s) + n;
                l = (t - n) * Math.sin(s) + (e - i) * Math.cos(s) + i;
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
        var n = {};
        var i = [];
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
            if (n[c]) {
                if (a) {
                    if (n[c].width && a) {
                        a(n[c]);
                    } else {
                        setTimeout(function() {
                            t(e, a, s);
                        }, 100);
                    }
                    return;
                } else {
                    return n[c];
                }
            }
            var d = new Image();
            if (f.block) {
                d.src = e;
                o++;
            } else if (o === 0) {
                d.src = e;
            } else {
                i.push({
                    imgObj: d,
                    src: e
                });
            }
            n[c] = d;
            var h = void 0;
            if (f.canvas || f.alphaColor || l) {
                h = document.createElement("canvas");
                h.width = h.height || 0;
                n[c] = h;
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
                        i.forEach(function(t) {
                            t.imgObj.src = t.src;
                        });
                        i.splice(0);
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
                        for (var n = 0; n < e.data.length; n += 4) {
                            var s = e.data[n] + e.data[n + 1] + e.data[n + 2];
                            var u = 1;
                            if (e.data[n] < u && e.data[n + 1] < u && e.data[n + 2] < u) {
                                e.data[n + 3] = Math.floor(s / 255);
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
                n[c] = d;
            };
            return h || d;
        };
        s.cacheCanvas = false;
        t.exports = s;
    }, function(t, e) {
        "use strict";
        var r = "processing";
        var n = {};
        function i(t, e) {
            if (t && t.match(/^data:/)) {
                e && e(t);
                return;
            }
            if (n[t]) {
                if (n[t] !== r) {
                    e(n[t]);
                } else {
                    setTimeout(function() {
                        i(t, e);
                    }, 100);
                }
                return;
            }
            n[t] = r;
            var a = new XMLHttpRequest();
            a.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
                    n[t] = r.result;
                    e && e(r.result);
                };
                r.readAsDataURL(a.response);
            };
            a.open("GET", t);
            a.responseType = "blob";
            a.send();
        }
        t.exports = i;
    }, function(t, e, r) {
        "use strict";
        var n = r(2);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = 3.141593;
        t.exports = function(t, e, r, n, i, a, s, f, l) {
            var u = l ? -l / 180 * o : 0;
            if (l) {
                t = (t - s) * Math.cos(l) - (e - f) * Math.sin(l) + s;
                e = (t - s) * Math.sin(l) + (e - f) * Math.cos(l) + f;
            }
            return t >= r && t <= r + i && e >= n && e <= n + a;
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(2);
        var i = s(n);
        var a = r(11);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r, n, i, a, s, f, l, u, c) {
            var d = (0, o.default)(t, e, i, a, s, f, l, u, c) || (0, o.default)(t + r, e, i, a, s, f, l, u, c) || (0, 
            o.default)(t, e + n, i, a, s, f, l, u, c) || (0, o.default)(t + r, e + n, i, a, s, f, l, u, c);
            if (d) return true;
            var h = (0, o.default)(i, a, t, e, r, n, l, u, -c) || (0, o.default)(i + s, a, t, e, r, n, l, u, -c) || (0, 
            o.default)(i, a + f, t, e, r, n, l, u, -c) || (0, o.default)(i + s, a + f, t, e, r, n, l, u, -c);
            if (h) return true;
            if (e > a && e + n < a + f && t < i && t + r > i + s) return true;
            if (t > i && t + r < i + s && e < a && e + n > a + f) return true;
            return false;
        };
    }, function(t, e, r) {
        "use strict";
        var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
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
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var S = 0;
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
            r.style.scale = a.default.firstValuable(r.style.scale, 1);
            r.style.opacity = a.default.firstValuable(r.style.opacity, 1);
            r.style.zIndex = r.style.zIndex || 0;
            r.style.mirrX = r.style.mirrX || 0;
            r.style.locate = r.style.locate || "center";
            var n = a.default.funcOrValue(r.content.img);
            s.default.xywh.forEach(function(t) {
                r.style[t] = r.style[t] || 0;
            });
            r.inherit = r.inherit;
            r.drag = r.drag || {};
            r.events = r.events || {};
            if (true) {
                for (var i in r.events) {
                    if (typeof r.events[i] !== "function" && i !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + i + " is not a function.", r.events[i]);
                    }
                }
            }
            if (true) {
                r.$addIndex = S++;
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
                r.name = r.name || "Unnamed Easycanvas Object";
            }
            r.children = r.children || [];
            M(r);
            r.$cache = {};
            r.$styleCacheTime = {};
            return r;
        };
        var E = function t(e) {
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
            E.call(this, r);
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
                e.tx -= e.tw;
                e.ty -= e.th;
            } else {
                e.tx -= e.tw >> 1;
                e.ty -= e.th >> 1;
            }
            return e;
        };
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
            var e = this;
            var r = e.$canvas.$lastPaintTime;
            if (e.$styleCacheTime[t] === r) {
                return e.$cache[t];
            }
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
                return;
            }
            if (this.$parent) {
                this.$parent.remove(this);
            } else {
                this.$canvas.remove(this);
            }
            a.default.execFuncs(this.hooks.removed, this);
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
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
                i.default.execFuncs(this.hooks[e], this, t);
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
        var n = r(1);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            if (!this.hooks[t]) return;
            if (this.hooks[t] === e || this.hooks[t].$handle === e || !e) {
                delete this.hooks[t];
            } else if (i.default.isArray(this.hooks[t])) {
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
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
            var n = e;
            if (r) {
                var a = this;
                n = function t() {
                    var i = Date.now();
                    if (i > n.$lastTriggerTime + r) {
                        n.$lastTriggerTime = i;
                        var o = Array.prototype.slice.call(arguments);
                        e.apply(a, o);
                    }
                };
                n.$lastTriggerTime = -1;
                n.$handle = e;
            }
            if (!this.hooks[t]) {
                this.hooks[t] = n;
            } else if (i.default.isArray(this.hooks[t])) {
                this.hooks[t].push(n);
            } else {
                this.hooks[t] = [ this.hooks[t], n ];
            }
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
                return i.default.execFuncs(this.hooks[e], this, t);
            }
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
        var i = 3.141593;
        var a = function t(e) {
            return e.$lastPaintTime || Date.now();
        };
        var o = {
            linear: function t(e, r, n) {
                var i = a(this);
                var o = false;
                var s = void 0;
                var f = function() {
                    var t = this.$lastPaintTime;
                    var a = (t - i) / n;
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
                    i = a(this);
                    return f;
                };
                f.then = function(t) {
                    s = t;
                    return f;
                };
                return f;
            },
            pendulum: function t(e, r, n, o) {
                var s = a(this);
                var f = o || {};
                f.start = f.start || 0;
                var l = false;
                var u = void 0;
                var c = f.cycle || 1;
                var d = function() {
                    var t = a(this);
                    var o = (t - s) / n;
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
                    var h = o * i * 2 - i / 2 + f.start / 360 * i;
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
            ease: function t(e, r, n) {
                return this.pendulum(e, r, n * 2, {
                    cycle: .5
                });
            },
            oneByOne: function t(e) {
                var r = e;
                var n = false;
                var i = function t() {
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
                        for (var i = 0; i < r.length; i++) {
                            r[i].$done = false;
                            r[i].$nextRestart = false;
                            r[i].restart();
                        }
                        return r[0]();
                    }
                    return r[r.length - 1]();
                };
                i.loop = function() {
                    n = true;
                    return i;
                };
                return i;
            }
        };
        var s = function t(e, r, i, a, s) {
            var f = (0, n.funcOrValue)(e[r]);
            if (true) {
                if (typeof f === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            f = f || 0;
            e[r] = o[i].bind(t)(f, a, s);
        };
        for (var f in o) {
            s[f] = o[f];
        }
        t.exports = s;
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
        var i = r(4);
        var a = f(i);
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
                            var i = l.$canvas[e].children;
                            var o = l.$canvas[e].$children;
                            var f = function t(e) {
                                if (e.name === a.default.devFlag) return;
                                r[e.$id] = {
                                    name: e.name,
                                    $addIndex: e.$addIndex,
                                    parent: e.$parent && e.$parent.$id,
                                    style: {},
                                    children: e.children.filter(function(t) {
                                        return t.name !== a.default.devFlag;
                                    }).map(function(t) {
                                        return t.$id;
                                    }),
                                    rendered: e.$rendered
                                };
                                for (var n in e.style) {
                                    r[e.$id].style[n] = s.default.funcOrValue(e.style[n], e);
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
                                    e.children.sort(function(t, e) {
                                        return t.$addIndex < e.$addIndex ? -1 : 1;
                                    }).forEach(t);
                                }
                            };
                            i.sort(function(t, e) {
                                return t.$addIndex < e.$addIndex ? -1 : 1;
                            }).forEach(f);
                        } else {
                            for (var u in l.$canvas) {
                                r = n(r, l.$plugin.getSprite(u));
                            }
                        }
                        return r;
                    },
                    selectSpriteById: function t(e, r) {
                        if (!r) {
                            for (var n in l.$canvas) {
                                var i = u.selectSpriteById(e, n);
                                if (i) {
                                    return {
                                        $sprite: i.$sprite || i,
                                        $canvas: l.$canvas[n]
                                    };
                                }
                            }
                            return false;
                        }
                        var a = function t(n) {
                            for (var i = 0; i < n.length; i++) {
                                if (n[i].$id === e) return n[i];
                                var a = t(n[i].children);
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
                        if (r && o && a) {
                            o.$plugin.selectSprite(false, o, a);
                        } else if (o) {
                            o.$plugin.cancelSelectSprite(o);
                        }
                    },
                    sendGlobalHook: function t(e, r) {
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
        var u = A(l);
        var c = r(1);
        var d = A(c);
        var h = r(29);
        var v = A(h);
        var p = r(9);
        var g = A(p);
        var y = r(101);
        var $ = A(y);
        var m = r(103);
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
            $version: i.default.version,
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
                        console.log("%c Easycanvas %c You are using the develop version " + i.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
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
        var n = r(47);
        var i = h(n);
        var a = r(49);
        var o = h(a);
        var s = r(43);
        var f = h(s);
        var l = r(48);
        var u = h(l);
        var c = r(59);
        var d = h(c);
        function h(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var v = {
            $render: o.default,
            $eventHandler: f.default,
            $perPaint: i.default,
            $rAFer: u.default
        };
        if (true) {
            v.$plugin = (0, d.default)();
        }
        t.exports = v;
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = s(n);
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
            if (!e || !e.length) return;
            if (r.$stopPropagation) return;
            var a = e.length;
            for (var s = 0; s < a; s++) {
                var u = e[s];
                if (i.default.funcOrValue(u.style.visible, u) === false) continue;
                if (l(u, r)) {
                    if (u.events.interceptor) {
                        var c = i.default.firstValuable(u.events.interceptor.call(u, r), r);
                        if (!c || c.$stopPropagation) continue;
                    }
                }
                if (u.children.length) {
                    t(f(u.children.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return i.default.funcOrValue(t.style.zIndex, t) >= 0;
                            }
                        }
                        return i.default.funcOrValue(i.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0;
                    })), r, n);
                }
                if (l(u, r)) {
                    n.push(u);
                    var h = d(u, r);
                    if (r.$stopPropagation) break;
                }
                if (u.children.length) {
                    t(f(u.children.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return i.default.funcOrValue(t.style.zIndex, t) < 0;
                            }
                        }
                        return !(i.default.funcOrValue(i.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0);
                    })), r, n);
                }
            }
        };
        var c = function t(e, r) {
            var n = this;
            this.$extendList.forEach(function(t) {
                if (t.onEvent) {
                    t.onEvent.call(n, e, r);
                }
            });
        };
        var d = function t(e, r) {
            if (!e.events || !e.events[r.type]) return;
            if (r.$stopPropagation) return;
            var n = e.events[r.type].call(e, r);
            if (n === true) {
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
            var n = this;
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
            if (n.fastclick) {
                if (y.type === "click" && !y.$fakeClick) {
                    return;
                } else if (y.type === "touchstart") {
                    h.x = y.canvasX;
                    h.y = y.canvasY;
                    h.timeStamp = Date.now();
                } else if (y.type === "touchend") {
                    if (Math.abs(h.x - y.canvasX) < 30 && Math.abs(h.y - y.canvasY) < 30 && Date.now() - h.timeStamp < 200) {
                        v.call(this, null, {
                            $fakeClick: true,
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
            if (n.events.interceptor) {
                y = i.default.firstValuable(n.events.interceptor.call(n, y), y);
                if (!y || y.$stopPropagation) return;
            }
            var $ = [];
            u(f(n.children), y, $);
            i.default.execFuncs(n.hooks.afterEvent, n, y);
            n.hooks.afterEvent = null;
            c.call(n, y, $);
            if (true) {
                if (window[o.default.devFlag] && window[o.default.devFlag].selectMode && $.length) {
                    var m = $[0];
                    if (m.name === o.default.devFlag) {
                        m = $[1];
                    }
                    if (m && m.name === o.default.devFlag) {
                        m = $[2];
                    }
                    if (m && n.$plugin.selectSprite(y.type === "click" || y.type === "touchend", n, m)) {
                        return;
                    }
                }
            }
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
                    return true;
                }
            }
        };
        t.exports = v;
    }, function(t, e) {
        "use strict";
        t.exports = function(t, e, r, n) {
            if (e.sx < 0 && e.sw) {
                var i = -e.sx / e.sw;
                e.tx += e.tw * i;
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
            if (n && e.sy + e.sh > n) {
                var s = (e.sy + e.sh - n) / e.sh;
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
        var n = r(1);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
            if (e) {
                e.filter(function(t) {
                    var e = i.default.funcOrValue(t.style.zIndex, t);
                    if (r < 0) {
                        return e < 0;
                    }
                    return e >= 0;
                }).sort(function(t, e) {
                    var r = i.default.funcOrValue(t.style.zIndex, t);
                    var n = i.default.funcOrValue(e.style.zIndex, e);
                    if (r === n) return 0;
                    return r > n ? 1 : -1;
                }).forEach(function(e, r) {
                    t.$perPaint.call(t, e, r);
                });
            }
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r = {};
            for (var n in t.content) {
                r[n] = i.default.funcOrValue(t.content[n], t);
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
                if (e.$nextTickTime - r.sequence.lastTickTime >= i.default.funcOrValue(r.sequence.interval, t)) {
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
        var n = r(1);
        var i = p(n);
        var a = r(4);
        var o = p(a);
        var s = r(46);
        var f = p(s);
        var l = r(44);
        var u = p(l);
        var c = r(45);
        var d = p(c);
        var h = r(12);
        var v = p(h);
        function p(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var g = i.default.blend;
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
            i.default.execFuncs(t.hooks.beforeTick, t, t.$tickedTimes);
            if (i.default.funcOrValue(t.style.visible, t) === false) {
                i.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
                return;
            }
            var r = this;
            $.call(t);
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
                    if (!t.$perf.paintRate || w > t.$perf.paintRate) {
                        t.$perf.paintRate = w;
                    }
                }
            }
            var b = (0, v.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], n.rotate);
            if (a.clip) {
                if (b) {
                    var T = {
                        $id: t.$id,
                        type: "clip",
                        settings: a,
                        img: s,
                        props: n
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
                        props: n
                    };
                    k.$origin = t;
                    r.$children.push(k);
                }
            }
            if (c && n.opacity !== 0 && n.sw && n.sh) {
                if (!n.rotate && !o) {
                    (0, u.default)(r, n, c, h);
                }
                var A = (0, v.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width - 1, r.height - 1, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], n.rotate);
                if (A) {
                    t.$rendered = true;
                    var O = {
                        $id: t.$id,
                        type: "img",
                        settings: a,
                        img: s,
                        props: n
                    };
                    O.$origin = t;
                    r.$children.push(O);
                }
            }
            if (o) {
                t.$rendered = true;
                var S = n.tx;
                var M = n.ty;
                var F = n.align || n.textAlign || "left";
                var E = n.textFont || "14px Arial";
                var R = parseInt(E);
                var I = void 0;
                var C = n.lineHeight || R;
                if (F === "center") {
                    S += n.tw / 2;
                } else if (F === "right") {
                    S += n.tw;
                }
                if (n.textVerticalAlign === "top") {
                    I = "top";
                } else if (n.textVerticalAlign === "bottom") {
                    I = "bottom";
                    M += n.th;
                } else if (n.textVerticalAlign === "middle") {
                    M += n.th >> 1;
                    I = "middle";
                }
                if (typeof o === "string" || typeof o === "number") {
                    if (M + R * 2 > 0 && M - R * 2 < r.height) {
                        r.$children.push({
                            $id: t.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: S,
                                ty: M,
                                content: String(o),
                                fontsize: R,
                                align: F,
                                baseline: I,
                                font: E,
                                color: n.color,
                                type: n.textType
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
                                tx: S + i.default.funcOrValue(e.tx, t),
                                ty: M + i.default.funcOrValue(e.ty, t),
                                content: i.default.funcOrValue(e.content, t),
                                fontsize: R,
                                baseline: I,
                                align: F,
                                font: E,
                                color: n.color,
                                type: n.textType
                            },
                            $origin: t
                        });
                    });
                } else if (o.type === "multline-text") {
                    var _ = o.text.split(/\t|\n/);
                    var V = [];
                    _.forEach(function(t, e) {
                        t = String.prototype.trim.apply(t);
                        if (o.config.start) {
                            t = t.replace(o.config.start, "");
                        }
                        var r = 0;
                        var i = n.tw;
                        while (t.length && r < t.length) {
                            if (i <= 0) {
                                i = n.tw;
                                V.push(t.substr(0, r));
                                t = t.substr(r);
                                r = 0;
                            }
                            r++;
                            i -= R * (y(t[r]) ? 1.05 : .6);
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
                                fontsize: R,
                                content: e,
                                baseline: I,
                                align: F,
                                font: E,
                                color: n.color,
                                type: n.textType
                            },
                            $origin: t
                        });
                        M += C || R;
                    });
                }
            }
            if (!s && !o) {
                t.$rendered = undefined;
            }
            (0, d.default)(r, l, 1);
            if (a.clip) {
                if (b) {
                    var P = {
                        $id: t.$id,
                        type: "clipOver",
                        settings: a,
                        img: s,
                        props: n
                    };
                    P.$origin = t;
                    r.$children.push(P);
                }
            }
            if (a.line) {
                if (b) {
                    t.$rendered = true;
                    var H = {
                        $id: t.$id,
                        type: "line",
                        settings: a,
                        img: s,
                        props: n
                    };
                    H.$origin = t;
                    r.$children.push(H);
                }
            }
            i.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(28);
        var i = s(n);
        var a = r(29);
        var o = s(a);
        function s(t) {
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
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = function t(e, r) {
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
                    if (a[5] + a[7] > n.width) a[7] = n.width - a[5];
                    a[8] = a.fontsize * 3;
                    if (a[6] + a[8] > n.height) a[8] = n.height - a[6];
                } else {
                    s = a.tw * a.th;
                }
                if ((s > 200 * 200 || f) && !e.settings.transform && !e.settings.rotate) {
                    var u = n.$children;
                    for (var c = u.length - 1; c > r; c--) {
                        var d = u[c];
                        if (d.$cannotCover) {
                            continue;
                        }
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
                            continue;
                        }
                        if (d.img && !d.img.$noAlpha) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (h.globalAlpha !== 1 || h.globalCompositeOperation || h.transform || h.rotate) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (i.default.pointInRect(a.tx, a.ty, v.tx, v.tx + v.tw, v.ty, v.ty + v.th) && i.default.pointInRect(a.tx + a.tw, a.ty + a.th, v.tx, v.tx + v.tw, v.ty, v.ty + v.th)) {
                            if (true) {
                                e.$origin.$useless = true;
                            }
                            return;
                        }
                    }
                }
            }
            var p = e.settings || {};
            if (o.call(n, e, p)) {
                return;
            }
            if (true) {
                if (e.$origin) {
                    e.$origin.$useless = false;
                }
            }
            var g = n.$paintContext;
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
                    n.$plugin.drawImage(n, a);
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
        var n = r(51);
        var i = R(n);
        var a = r(55);
        var o = R(a);
        var s = r(58);
        var f = R(s);
        var l = r(52);
        var u = R(l);
        var c = r(16);
        var d = R(c);
        var h = r(53);
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
        var A = r(54);
        var O = R(A);
        var S = r(56);
        var M = R(S);
        var F = r(57);
        var E = R(F);
        function R(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var I = {
            start: f.default,
            paint: u.default,
            add: i.default,
            remove: o.default,
            register: O.default,
            clear: d.default,
            setFpsHandler: M.default,
            setMaxFps: E.default,
            pause: v.default,
            on: g.default,
            off: $.default,
            trigger: x.default,
            broadcast: b.default,
            nextTick: k.default
        };
        t.exports = I;
    }, function(t, e, r) {
        "use strict";
        var n = r(13);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = i.default.prototype.add;
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var t = this;
            i.default.execFuncs(t.hooks.beforeTick, t, [ t.$rafTime ]);
            if (t.$paintContext.clearRect) {
                t.$paintContext.clearRect(0, 0, this.width, this.height);
            }
            if (!t.$freezing) {
                t.$children = [];
                if (true) {
                    t.$plugin.timeCollect(t, "preprocessTimeSpend", "START");
                }
                this.children.sort(function(t, e) {
                    var r = i.default.funcOrValue(t.style.zIndex, t);
                    var n = i.default.funcOrValue(e.style.zIndex, e);
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
            t.$render();
            if (true) {
                t.$plugin.timeCollect(t, "paintTimeSpend", "END");
            }
            i.default.execFuncs(t.hooks.ticked, t, [ t.$rafTime ]);
            if (t.hooks.nextTick) {
                i.default.execFuncs(t.hooks.nextTick, t, [ t.$rafTime ]);
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
            var i = e || {};
            t = this.$dom = t || this.$dom;
            for (var a in i) {
                this[a] = i[a];
            }
            this.name = i.name || t.id || t.classList && t.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (i.fullScreen && typeof document !== "undefined") {
                t.width = t.style.width = document.body.clientWidth || document.documentElement.clientWidth;
                t.height = t.style.height = document.body.clientHeight || document.documentElement.clientHeight;
            }
            if (true) {
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
            n.call(this, i);
            this.$paintContext = this.$paintContext || t.getContext("2d");
            return this;
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(1);
        var i = a(n);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r = this;
            i.default.execFuncs(t.hooks.beforeRemove, t, t.$tickedTimes++);
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
                    i.default.execFuncs(t.hooks.removed, t, t.$tickedTimes);
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
        var n = r(1);
        var i = s(n);
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
                var n = null;
                var i = null;
                var a = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
                var s = {
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
                        a.forEach(function(t) {
                            e.$perf[t] = 0;
                            e.$perf["$" + t] = 0;
                        });
                        setInterval(function() {
                            a.forEach(function(t) {
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
                    selectSprite: function t(a, f, l) {
                        window[o.default.devFlag].MaskCanvasBase64 = r;
                        if (!l || !window[o.default.devFlag].selectMode) {
                            s.cancelSelectSprite(f);
                            return false;
                        }
                        if (!n) {
                            n = f.add({
                                name: o.default.devFlag,
                                content: {
                                    img: f.imgLoader(r)
                                },
                                style: {},
                                webgl: undefined
                            });
                            i = f.add({
                                name: o.default.devFlag,
                                style: {
                                    border: "2px red",
                                    locate: "lt"
                                }
                            });
                        }
                        [ "tx", "ty", "rotate", "rx", "ry", "scale", "tw", "th", "locate" ].forEach(function(t) {
                            (function(t) {
                                n.style[t] = function() {
                                    if (t === "tw" || t === "th") {
                                        return l.getStyle(t) || l.getRect()[t];
                                    }
                                    return l.getStyle(t);
                                };
                            })(t);
                        });
                        [ "tx", "ty", "tw", "th" ].forEach(function(t) {
                            (function(t) {
                                i.style[t] = function() {
                                    return l.getOuterRect()[t];
                                };
                            })(t);
                        });
                        n.style.zIndex = Number.MAX_SAFE_INTEGER - 10;
                        i.style.zIndex = Number.MAX_SAFE_INTEGER;
                        n.style.visible = function() {
                            return window[o.default.devFlag].selectMode;
                        };
                        i.style.visible = function() {
                            return window[o.default.devFlag].selectMode;
                        };
                        n.style.opacity = .8;
                        n.webgl = l.webgl ? {} : undefined;
                        if (n.webgl) {
                            for (var u in l.webgl) {
                                (function(t) {
                                    n.webgl[t] = function() {
                                        if (typeof l.webgl[t] === "function") {
                                            return l.webgl[t].call(l);
                                        }
                                        return l.webgl[t];
                                    };
                                })(u);
                            }
                            n.webgl.img = f.imgLoader(r);
                            n.webgl.colors = false;
                            n.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (a) {
                            f.remove(n);
                            f.remove(i);
                            n = null;
                            e({
                                name: "selectSprite",
                                id: f.$id,
                                value: {
                                    sprite: l.$id,
                                    canvas: f.$id
                                }
                            });
                            window[o.default.devFlag].current = {
                                $sprite: l,
                                $canvas: f
                            };
                            window[o.default.devFlag].selectMode = false;
                        }
                        return true;
                    },
                    cancelSelectSprite: function t(e) {
                        if (!n) return;
                        e.remove(n);
                        e.remove(i);
                        n = null;
                    }
                };
                return s;
            }
        };
    }, function(t, e, r) {
        "use strict";
        var n = r(50);
        var i = c(n);
        var a = r(42);
        var o = c(a);
        var s = r(61);
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
        for (var v in i.default) {
            if (Object.prototype.hasOwnProperty.call(i.default, v)) {
                d.prototype[v] = i.default[v];
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
        var i = s(n);
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
                return (0, i.default)(t, function(t) {
                    var n = t.width, i = t.height;
                    var a = t.getContext("2d").getImageData(0, 0, n, i);
                    var o = a.data;
                    for (var s = o.length - 1; s >= 0; s -= 4) {
                        if (e && e.conversion) {
                            var f = e.conversion({
                                r: o[s - 3],
                                g: o[s - 2],
                                b: o[s - 1],
                                a: o[s]
                            }, (s + 1 >> 2) % n, Math.floor((s + 1 >> 2) / n));
                            o[s - 3] = f.r;
                            o[s - 2] = f.g;
                            o[s - 1] = f.b;
                            o[s - 0] = f.a;
                        }
                    }
                    t.getContext("2d").clearRect(0, 0, n, i);
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
            var n = e.height;
            var i = document.createElement("canvas");
            i.width = r;
            i.height = n;
            var a = i.getContext("2d");
            a.scale(1, -1);
            a.translate(0, -n);
            a.drawImage(e, 0, 0);
            var o = a.getImageData(0, 0, r, n);
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

