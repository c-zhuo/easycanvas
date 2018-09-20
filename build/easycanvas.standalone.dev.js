(function t(e, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var i = r();
        for (var n in i) (typeof exports === "object" ? exports : e)[n] = i[n];
    }
})(this, function() {
    return function(t) {
        var e = {};
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
        }
        r.m = t;
        r.c = e;
        r.p = "";
        return r(0);
    }([ function(t, e, r) {
        t.exports = r(31);
    }, function(t, e) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(t) {
                return Object.prototype.toString.call(t) === "[object Array]";
            },
            funcOrValue: function t(e, r) {
                if (typeof e === "function") {
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
                    });
                    return a;
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function t(e, r, i, n, a, o) {
                return !(e < i || e > n || r < a || r > o);
            },
            firstValuable: function t(e, r, i) {
                return typeof e === "undefined" ? typeof r === "undefined" ? i : r : e;
            }
        };
        t.exports = r;
    }, function(t, e) {
        "use strict";
        var r = 3.141593;
        t.exports = function(t, e, i, n, a, o) {
            var s = a ? -a / 180 * r : 0;
            var f = t, l = e;
            if (a) {
                f = (t - i) * Math.cos(s) - (e - n) * Math.sin(s) + i;
                l = (t - i) * Math.sin(s) + (e - n) * Math.cos(s) + n;
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
            version: "0.5.11"
        };
    }, , , , , function(t, e) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
        var i = {};
        var n = [];
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
            if (i[c]) {
                if (a) {
                    if (i[c].width && a) {
                        a(i[c]);
                    } else {
                        setTimeout(function() {
                            t(e, a, s);
                        }, 100);
                    }
                    return;
                } else {
                    return i[c];
                }
            }
            var d = new Image();
            if (f.block) {
                d.src = e;
                o++;
            } else if (o === 0) {
                d.src = e;
            } else {
                n.push({
                    imgObj: d,
                    src: e
                });
            }
            i[c] = d;
            var h = void 0;
            if (f.canvas || f.alphaColor || l) {
                h = document.createElement("canvas");
                h.width = h.height || 0;
                i[c] = h;
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
                        n.forEach(function(t) {
                            t.imgObj.src = t.src;
                        });
                        n.splice(0);
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
                        for (var i = 0; i < e.data.length; i += 4) {
                            var s = e.data[i] + e.data[i + 1] + e.data[i + 2];
                            var u = 1;
                            if (e.data[i] < u && e.data[i + 1] < u && e.data[i + 2] < u) {
                                e.data[i + 3] = Math.floor(s / 255);
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
                i[c] = d;
            };
            return h || d;
        };
        s.cacheCanvas = false;
        t.exports = s;
    }, function(t, e) {
        "use strict";
        var r = "processing";
        var i = {};
        function n(t, e) {
            if (t && t.match(/^data:/)) {
                e && e(t);
                return;
            }
            if (i[t]) {
                if (i[t] !== r) {
                    e(i[t]);
                } else {
                    setTimeout(function() {
                        n(t, e);
                    }, 100);
                }
                return;
            }
            i[t] = r;
            var a = new XMLHttpRequest();
            a.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
                    i[t] = r.result;
                    e && e(r.result);
                };
                r.readAsDataURL(a.response);
            };
            a.open("GET", t);
            a.responseType = "blob";
            a.send();
        }
        t.exports = n;
    }, function(t, e, r) {
        "use strict";
        var i = r(2);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = 3.141593;
        t.exports = function(t, e, r, i, n, a, s, f, l) {
            var u = l ? -l / 180 * o : 0;
            if (l) {
                t = (t - s) * Math.cos(l) - (e - f) * Math.sin(l) + s;
                e = (t - s) * Math.sin(l) + (e - f) * Math.cos(l) + f;
            }
            return t >= r && t <= r + n && e >= i && e <= i + a;
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(2);
        var n = s(i);
        var a = r(11);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r, i, n, a, s, f, l, u, c) {
            var d = (0, o.default)(t, e, n, a, s, f, l, u, c) || (0, o.default)(t + r, e, n, a, s, f, l, u, c) || (0, 
            o.default)(t, e + i, n, a, s, f, l, u, c) || (0, o.default)(t + r, e + i, n, a, s, f, l, u, c);
            if (d) return true;
            var h = (0, o.default)(n, a, t, e, r, i, l, u, -c) || (0, o.default)(n + s, a, t, e, r, i, l, u, -c) || (0, 
            o.default)(n, a + f, t, e, r, i, l, u, -c) || (0, o.default)(n + s, a + f, t, e, r, i, l, u, -c);
            if (h) return true;
            if (e > a && e + i < a + f && t < n && t + r > n + s) return true;
            if (t > n && t + r < n + s && e < a && e + i > a + f) return true;
            return false;
        };
    }, function(t, e, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
        var n = r(1);
        var a = x(n);
        var o = r(4);
        var s = x(o);
        var f = r(18);
        var l = x(f);
        var u = r(17);
        var c = x(u);
        var d = r(15);
        var h = x(d);
        var v = r(16);
        var p = x(v);
        var g = r(19);
        var y = x(g);
        var $ = r(14);
        var m = x($);
        function x(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var w = function t(e) {
            if (e.children) {
                e.children.forEach(function(r, i) {
                    if (!r.$id) {
                        e.children[i] = new k(r);
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
        var b = function t(e) {
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
            var i = a.default.funcOrValue(r.content.img);
            s.default.xywh.forEach(function(t) {
                r.style[t] = r.style[t] || 0;
            });
            r.inherit = r.inherit;
            r.drag = r.drag || {};
            r.events = r.events || {};
            if (true) {
                for (var n in r.events) {
                    if (typeof r.events[n] !== "function" && n !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + n + " is not a function.", r.events[n]);
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
                    var o = r.content.img.src.match(/.*\/([^\/]*)$/);
                    if (o && o[1]) {
                        r.name = o[1];
                    }
                }
                r.name = r.name || "Unnamed Easycanvas Object";
            }
            r.children = r.children || [];
            w(r);
            r.$cache = {};
            r.$styleCacheTime = {};
            return r;
        };
        var T = function t(e) {
            var r = this;
            this.$extendList.forEach(function(t) {
                t.call(r, e);
            });
        };
        var k = function t(e) {
            var r = b(e);
            for (var i in r) {
                if (Object.prototype.hasOwnProperty.call(r, i)) {
                    this[i] = r[i];
                }
            }
            T.call(this, r);
            return this;
        };
        k.prototype.$extendList = [];
        k.prototype.add = function(t) {
            if (!t) {
                return;
            }
            this.children.push(t);
            w(this);
            return this.children[this.children.length - 1];
        };
        k.prototype.getRect = function() {
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
            var i = this.getStyle("locate");
            if (i === "lt") {} else if (i === "ld") {
                e.ty -= e.th;
            } else if (i === "rt") {
                e.tx -= e.tw;
            } else if (i === "rd") {
                e.tx -= e.tw;
                e.ty -= e.th;
            } else {
                e.tx -= e.tw >> 1;
                e.ty -= e.th >> 1;
            }
            return e;
        };
        k.prototype.getSelfStyle = function(t) {
            var e = {};
            if (t) {
                return a.default.funcOrValue(this.style[t], this);
            }
            for (var r in this.style) {
                e[r] = a.default.funcOrValue(this.style[r], this);
            }
            return e;
        };
        k.prototype.getStyle = function(t) {
            var e = this;
            var r = e.$canvas.$lastPaintTime;
            if (e.$styleCacheTime[t] === r) {
                return e.$cache[t];
            }
            var i = a.default.funcOrValue(e.style[t], e);
            if (e.$parent) {
                var n = void 0;
                if (e.inherit) {
                    n = e.inherit.indexOf(t) >= 0;
                } else {
                    n = t === "tx" || t === "ty" || t === "scale" || t === "opacity";
                }
                if (n) {
                    var o = e.$parent.getStyle(t);
                    if (t === "opacity" || t === "scale") {
                        o = a.default.firstValuable(o, 1);
                        e.$parent.$styleCacheTime[t] = r;
                        e.$parent.$cache[t] = o;
                        return o * a.default.firstValuable(i, 1);
                    } else {
                        o = a.default.firstValuable(o, 0);
                        e.$parent.$styleCacheTime[t] = r;
                        e.$parent.$cache[t] = o;
                        return o + a.default.firstValuable(i, 0);
                    }
                }
            }
            return i;
        };
        k.prototype.remove = function(t) {
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
        k.prototype.update = function(t) {
            if (!t) return;
            for (var e in t) {
                if (i(t[e]) === "object") {
                    for (var r in t[e]) {
                        this[e][r] = t[e][r];
                    }
                } else {
                    this[e] = t[e];
                }
            }
        };
        k.prototype.nextTick = p.default;
        k.prototype.on = l.default;
        k.prototype.off = c.default;
        k.prototype.clear = h.default;
        k.prototype.trigger = y.default;
        k.prototype.broadcast = m.default;
        t.exports = k;
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
                n.default.execFuncs(this.hooks[e], this, t);
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
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            if (!this.hooks[t]) return;
            if (this.hooks[t] === e || !e) {
                delete this.hooks[t];
            } else if (n.default.isArray(this.hooks[t])) {
                this.hooks[t][this.hooks[t].indexOf(e)] = undefined;
            }
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
            var i = e;
            if (r) {
                var a = this;
                i = function t() {
                    var n = Date.now();
                    if (n > i.$lastTriggerTime + r) {
                        i.$lastTriggerTime = n;
                        var o = Array.prototype.slice.call(arguments);
                        e.apply(a, o);
                    }
                };
                i.$lastTriggerTime = -1;
            }
            if (!this.hooks[t]) {
                this.hooks[t] = i;
            } else if (n.default.isArray(this.hooks[t])) {
                this.hooks[t].push(i);
            } else {
                this.hooks[t] = [ this.hooks[t], i ];
            }
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            var t = Array.prototype.slice.call(arguments);
            var e = t.shift();
            if (this.hooks[e]) {
                return n.default.execFuncs(this.hooks[e], this, t);
            }
        };
    }, , , , , , , , function(t, e) {
        "use strict";
        var r = function t(e) {
            setTimeout(e, 1e3 / 60);
        };
        var i = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || r : r;
        t.exports = i;
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = 3.141593;
        var a = function t(e) {
            return e.$lastPaintTime || Date.now();
        };
        var o = {
            linear: function t(e, r, i) {
                var n = a(this);
                var o = false;
                var s = void 0;
                var f = function() {
                    var t = this.$lastPaintTime;
                    var a = (t - n) / i;
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
                    n = a(this);
                    return f;
                };
                f.then = function(t) {
                    s = t;
                    return f;
                };
                return f;
            },
            pendulum: function t(e, r, i, o) {
                var s = a(this);
                var f = o || {};
                f.start = f.start || 0;
                var l = false;
                var u = void 0;
                var c = f.cycle || 1;
                var d = function() {
                    var t = a(this);
                    var o = (t - s) / i;
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
                    var h = o * n * 2 - n / 2 + f.start / 360 * n;
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
            ease: function t(e, r, i) {
                return this.pendulum(e, r, i * 2, {
                    cycle: .5
                });
            },
            oneByOne: function t(e) {
                var r = e;
                var i = false;
                var n = function t() {
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
        var s = function t(e, r, n, a, s) {
            var f = (0, i.funcOrValue)(e[r]);
            if (true) {
                if (typeof f === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            f = f || 0;
            e[r] = o[n].bind(t)(f, a, s);
        };
        for (var f in o) {
            s[f] = o[f];
        }
        t.exports = s;
    }, function(t, e, r) {
        "use strict";
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
        var n = r(4);
        var a = f(n);
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
                            var n = l.$canvas[e].children;
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
                                for (var i in e.style) {
                                    r[e.$id].style[i] = s.default.funcOrValue(e.style[i], e);
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
                            n.forEach(f);
                        } else {
                            for (var u in l.$canvas) {
                                r = i(r, l.$plugin.getSprite(u));
                            }
                        }
                        return r;
                    },
                    selectSpriteById: function t(e, r) {
                        if (!r) {
                            for (var i in l.$canvas) {
                                var n = u.selectSpriteById(e, i);
                                if (n) {
                                    return {
                                        $sprite: n.$sprite || n,
                                        $canvas: l.$canvas[i]
                                    };
                                }
                            }
                            return false;
                        }
                        var a = function t(i) {
                            for (var n = 0; n < i.length; n++) {
                                if (i[n].$id === e) return i[n];
                                var a = t(i[n].children);
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
                        if (r && o && a) {
                            o.$plugin.selectSprite(false, o, a);
                        } else if (o) {
                            o.$plugin.cancelSelectSprite(o);
                        }
                    },
                    sendGlobalHook: function t(e, r) {
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
    }, , function(t, e, r) {
        "use strict";
        var i = r(4);
        var n = A(i);
        var a = r(53);
        var o = A(a);
        var s = r(27);
        var f = A(s);
        var l = r(95);
        var u = A(l);
        var c = r(1);
        var d = A(c);
        var h = r(28);
        var v = A(h);
        var p = r(9);
        var g = A(p);
        var y = r(94);
        var $ = A(y);
        var m = r(96);
        var x = A(m);
        var w = r(13);
        var b = A(w);
        var T = r(29);
        var k = A(T);
        function A(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var R = {
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
            $version: n.default.version,
            env: "develop"
        };
        R.extend = function(t) {
            var e = R.sprite.prototype.$extendList;
            if (e.indexOf(t) >= 0) return;
            e.push(t);
        };
        R.use = function(t) {
            var e = R.painter.prototype.$extendList;
            if (e.indexOf(t) >= 0) return;
            if (t.onUse) {
                t.onUse(R);
            }
            e.push(t);
        };
        R.component = function(t, e) {
            t(R, e);
        };
        var S = typeof window !== "undefined";
        if (S) {
            if (window.Easycanvas) {
                console.warn("[Easycanvas] already loaded, it should be loaded only once.");
            } else {
                if (true) {
                    setTimeout(function() {
                        console.log("%c Easycanvas %c You are using the develop version " + n.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                    }, 500);
                }
                if (true) {
                    window.Easycanvas = R;
                }
            }
        }
        t.exports = R;
    }, , , , function(t, e, r) {
        "use strict";
        var i = r(40);
        var n = h(i);
        var a = r(42);
        var o = h(a);
        var s = r(36);
        var f = h(s);
        var l = r(41);
        var u = h(l);
        var c = r(52);
        var d = h(c);
        function h(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var v = {
            $render: o.default,
            $eventHandler: f.default,
            $perPaint: n.default,
            $rAFer: u.default
        };
        if (true) {
            v.$plugin = (0, d.default)();
        }
        t.exports = v;
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = s(i);
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
            if (!e || !e.length) return;
            if (r.$stopPropagation) return;
            var a = e.length;
            for (var s = 0; s < a; s++) {
                var u = e[s];
                if (n.default.funcOrValue(u.style.visible, u) === false) continue;
                if (l(u, r)) {
                    if (u.events.interceptor) {
                        var c = n.default.firstValuable(u.events.interceptor.call(u, r), r);
                        if (!c || c.$stopPropagation) continue;
                    }
                }
                if (u.children.length) {
                    t(f(u.children.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(t.style.zIndex, t) >= 0;
                            }
                        }
                        return n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0;
                    })), r, i);
                }
                if (l(u, r)) {
                    i.push(u);
                    var h = d(u, r);
                    if (r.$stopPropagation) break;
                }
                if (u.children.length) {
                    t(f(u.children.filter(function(t) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(t.style.zIndex, t) < 0;
                            }
                        }
                        return !(n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) >= 0);
                    })), r, i);
                }
            }
        };
        var c = function t(e, r) {
            var i = this;
            this.$extendList.forEach(function(t) {
                if (t.onEvent) {
                    t.onEvent.call(i, e, r);
                }
            });
        };
        var d = function t(e, r) {
            if (!e.events || !e.events[r.type]) return;
            if (r.$stopPropagation) return;
            var i = e.events[r.type].call(e, r);
            if (i === true) {
                return true;
            }
            if (e.events.stopPropagation) {
                return true;
            }
        };
        t.exports = function(t, e) {
            var r = this;
            var i = void 0;
            var a = void 0;
            var s = 1;
            var l = 1;
            if (!e) {
                if (!t.layerX && t.targetTouches && t.targetTouches[0]) {
                    i = t.targetTouches[0].pageX - t.currentTarget.offsetLeft;
                    a = t.targetTouches[0].pageY - t.currentTarget.offsetTop;
                } else if (!t.layerX && t.changedTouches && t.changedTouches[0]) {
                    i = t.changedTouches[0].pageX - t.currentTarget.offsetLeft;
                    a = t.changedTouches[0].pageY - t.currentTarget.offsetTop;
                } else {
                    i = t.layerX;
                    a = t.layerY;
                }
                var d = false;
                if (this.$dom.getBoundingClientRect) {
                    var h = this.$dom.getBoundingClientRect();
                    h.width > h.height !== this.width > this.height;
                    s = Math.floor(h[d ? "height" : "width"]) / this.width;
                    l = Math.floor(h[d ? "width" : "height"]) / this.height;
                }
            }
            var v = e || {
                type: t.type,
                canvasX: i / s,
                canvasY: a / l,
                event: t
            };
            v.stopPropagation = function() {
                v.$stopPropagation = true;
            };
            if (r.events.interceptor) {
                v = n.default.firstValuable(r.events.interceptor.call(r, v), v);
                if (!v || v.$stopPropagation) return;
            }
            var p = [];
            u(f(r.children), v, p);
            c.call(r, v, p);
            if (true) {
                if (window[o.default.devFlag] && window[o.default.devFlag].selectMode && p.length) {
                    var g = p[0];
                    if (g.name === o.default.devFlag) {
                        g = p[1];
                    }
                    if (g && r.$plugin.selectSprite(t.type === "click" || t.type === "touchend", r, g)) {
                        return;
                    }
                }
            }
            if ((v.type === "mousemove" || v.type === "touchmove") && r.eLastMouseHover && p.indexOf(r.eLastMouseHover) === -1) {
                var y = r.eLastMouseHover["events"]["mouseout"] || r.eLastMouseHover["events"]["touchout"];
                if (y) {
                    y.call(r.eLastMouseHover, v);
                }
            }
            r.eLastMouseHover = p[0];
            if (!p.length && r.eLastMouseHover) {
                var $ = r.eLastMouseHover["events"]["mouseout"];
                if ($) {
                    $.call(r.eLastMouseHover, v);
                }
                r.eLastMouseHover = null;
            }
            var m = r.events[v.type];
            if (m) {
                if (m.call(r, v)) {
                    r.eHoldingFlag = false;
                    return true;
                }
            }
        };
    }, function(t, e) {
        "use strict";
        t.exports = function(t, e, r, i) {
            if (e.sx < 0 && e.sw) {
                var n = -e.sx / e.sw;
                e.tx += e.tw * n;
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
            if (i && e.sy + e.sh > i) {
                var s = (e.sy + e.sh - i) / e.sh;
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
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e, r) {
            if (e) {
                e.filter(function(t) {
                    var e = n.default.funcOrValue(t.style.zIndex, t);
                    if (r < 0) {
                        return e < 0;
                    }
                    return e >= 0;
                }).sort(function(t, e) {
                    var r = n.default.funcOrValue(t.style.zIndex, t);
                    var i = n.default.funcOrValue(e.style.zIndex, e);
                    if (r === i) return 0;
                    return r > i ? 1 : -1;
                }).forEach(function(e, r) {
                    t.$perPaint.call(t, e, r);
                });
            }
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r = {};
            for (var i in t.content) {
                r[i] = n.default.funcOrValue(t.content[i], t);
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
                if (e.$nextTickTime - r.sequence.lastTickTime >= n.default.funcOrValue(r.sequence.interval, t)) {
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
        var i = r(1);
        var n = p(i);
        var a = r(4);
        var o = p(a);
        var s = r(39);
        var f = p(s);
        var l = r(37);
        var u = p(l);
        var c = r(38);
        var d = p(c);
        var h = r(12);
        var v = p(h);
        function p(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var g = n.default.blend;
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
            if (n.default.funcOrValue(t.style.visible, t) === false) {
                n.default.execFuncs(t.hooks.beforeTick, t, t.$tickedTimes);
                n.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
                return;
            }
            n.default.execFuncs(t.hooks.beforeTick, t, t.$tickedTimes);
            var r = this;
            $.call(t);
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
            if (i.overflow && i.overflow === "hidden") {
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
                    if (!t.$perf.paintRate || w > t.$perf.paintRate) {
                        t.$perf.paintRate = w;
                    }
                }
            }
            if (a.clip) {
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    var T = {
                        $id: t.$id,
                        type: "clip",
                        settings: a,
                        img: s,
                        props: i
                    };
                    T.$origin = t;
                    r.$children.push(T);
                }
            }
            (0, d.default)(r, l, -1);
            if (a.fillRect) {
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    t.$rendered = true;
                    var k = {
                        $id: t.$id,
                        type: "fillRect",
                        settings: a,
                        img: s,
                        props: i
                    };
                    k.$origin = t;
                    r.$children.push(k);
                }
            }
            if (c && i.opacity !== 0 && i.sw && i.sh) {
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width - 1, r.height - 1, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    t.$rendered = true;
                    if (!i.rotate && !o) {
                        (0, u.default)(r, i, c, h);
                    }
                    var A = {
                        $id: t.$id,
                        type: "img",
                        settings: a,
                        img: s,
                        props: i
                    };
                    A.$origin = t;
                    r.$children.push(A);
                }
            }
            if (o) {
                t.$rendered = true;
                var R = i.tx;
                var S = i.ty;
                var F = i.align || i.textAlign || "left";
                var O = i.textFont || "14px Arial";
                var M = parseInt(O);
                var E = void 0;
                var _ = i.lineHeight || M;
                if (F === "center") {
                    R += i.tw / 2;
                } else if (F === "right") {
                    R += i.tw;
                }
                if (i.textVerticalAlign === "top") {
                    E = "top";
                } else if (i.textVerticalAlign === "bottom") {
                    E = "bottom";
                    S += i.th;
                } else if (i.textVerticalAlign === "middle") {
                    S += i.th >> 1;
                    E = "middle";
                }
                if (typeof o === "string" || typeof o === "number") {
                    if (S + M * 2 > 0 && S - M * 2 < r.height) {
                        r.$children.push({
                            $id: t.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: R,
                                ty: S,
                                content: String(o),
                                fontsize: M,
                                align: F,
                                baseline: E,
                                font: O,
                                color: i.color,
                                type: i.textType
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
                                tx: R + n.default.funcOrValue(e.tx, t),
                                ty: S + n.default.funcOrValue(e.ty, t),
                                content: n.default.funcOrValue(e.content, t),
                                fontsize: M,
                                baseline: E,
                                align: F,
                                font: O,
                                color: i.color,
                                type: i.textType
                            },
                            $origin: t
                        });
                    });
                } else if (o.type === "multline-text") {
                    var C = o.text.split(/\t|\n/);
                    var I = [];
                    C.forEach(function(t, e) {
                        t = String.prototype.trim.apply(t);
                        if (o.config.start) {
                            t = t.replace(o.config.start, "");
                        }
                        var r = 0;
                        var n = i.tw;
                        while (t.length && r < t.length) {
                            if (n <= 0) {
                                n = i.tw;
                                I.push(t.substr(0, r));
                                t = t.substr(r);
                                r = 0;
                            }
                            r++;
                            n -= M * (y(t[r]) ? 1.05 : .6);
                        }
                        if (t || e) {
                            I.push(t);
                        }
                    });
                    I.forEach(function(e) {
                        r.$children.push({
                            $id: t.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: R,
                                ty: S,
                                fontsize: M,
                                content: e,
                                baseline: E,
                                align: F,
                                font: O,
                                color: i.color,
                                type: i.textType
                            },
                            $origin: t
                        });
                        S += _ || M;
                    });
                }
            }
            if (!s && !o) {
                t.$rendered = undefined;
            }
            (0, d.default)(r, l, 1);
            if (a.clip) {
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    var V = {
                        $id: t.$id,
                        type: "clipOver",
                        settings: a,
                        img: s,
                        props: i
                    };
                    V.$origin = t;
                    r.$children.push(V);
                }
            }
            n.default.execFuncs(t.hooks.ticked, t, ++t.$tickedTimes);
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(27);
        var n = s(i);
        var a = r(28);
        var o = s(a);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t) {
            var e = Date.now();
            o.default.$lastPaintTime = this.$nextTickTime = e;
            if (e - this.fpsCalculateTime >= 1e3) {
                this.fpsCalculateTime = e;
                if (this.fpsHandler) {
                    this.fpsHandler.call(this, this.fps);
                }
                this.lastFps = this.fps;
                this.fps = 0;
            }
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
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = function t(e, r) {
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
            var a = e.props;
            var s = void 0;
            var f = e.type === "text";
            if (a && e.type !== "clip" && e.type !== "clipOver") {
                if (f) {
                    var l = a.content.length;
                    s = a.fontsize * a.fontsize * 9 * l;
                    a[5] = a.tx - a.fontsize * 1.5 * l;
                    if (a[5] < 0) a[5] = 0;
                    a[6] = a.ty - a.fontsize * 1.5;
                    if (a[6] < 0) a[6] = 0;
                    a[7] = a.fontsize * 3 * l;
                    if (a[5] + a[7] > i.width) a[7] = i.width - a[5];
                    a[8] = a.fontsize * 3;
                    if (a[6] + a[8] > i.height) a[8] = i.height - a[6];
                } else {
                    s = a.tw * a.th;
                }
                if ((s > 200 * 200 || f) && !e.settings.transform && !e.settings.rotate) {
                    var u = i.$children;
                    for (var c = u.length - 1; c > r; c--) {
                        var d = u[c];
                        if (d.$cannotCover) {
                            continue;
                        }
                        if (!d.type || d.type !== "img" || d.type !== "fillRect") {
                            d.$cannotCover = true;
                            continue;
                        }
                        var h = d.props;
                        if (h.tw * h.th < 200 * 200) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (h.tw * h.th < s) {
                            continue;
                        }
                        if (d.img && !d.img.$noAlpha) {
                            d.$cannotCover = true;
                            continue;
                        }
                        var v = d.settings;
                        if (v.globalAlpha !== 1 || v.globalCompositeOperation || v.transform || v.rotate) {
                            d.$cannotCover = true;
                            continue;
                        }
                        if (n.default.pointInRect(a.tx, a.ty, h.tx, h.tx + h.tw, h.ty, h.ty + h.th) && n.default.pointInRect(a.tx + a.tw, a.ty + a.th, h.tx, h.tx + h.tw, h.ty, h.ty + h.th)) {
                            if (true) {
                                e.$origin.$useless = true;
                            }
                            return;
                        }
                    }
                }
            }
            var p = e.settings || {};
            if (o.call(i, e, p)) {
                return;
            }
            if (true) {
                if (e.$origin) {
                    e.$origin.$useless = false;
                }
            }
            var g = i.$paintContext;
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
                    i.$plugin.drawImage(i, a);
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
        var i = r(44);
        var n = E(i);
        var a = r(48);
        var o = E(a);
        var s = r(51);
        var f = E(s);
        var l = r(45);
        var u = E(l);
        var c = r(15);
        var d = E(c);
        var h = r(46);
        var v = E(h);
        var p = r(18);
        var g = E(p);
        var y = r(17);
        var $ = E(y);
        var m = r(19);
        var x = E(m);
        var w = r(14);
        var b = E(w);
        var T = r(16);
        var k = E(T);
        var A = r(47);
        var R = E(A);
        var S = r(49);
        var F = E(S);
        var O = r(50);
        var M = E(O);
        function E(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var _ = {
            start: f.default,
            paint: u.default,
            add: n.default,
            remove: o.default,
            register: R.default,
            clear: d.default,
            setFpsHandler: F.default,
            setMaxFps: M.default,
            pause: v.default,
            on: g.default,
            off: $.default,
            trigger: x.default,
            broadcast: b.default,
            nextTick: k.default
        };
        t.exports = _;
    }, function(t, e, r) {
        "use strict";
        var i = r(13);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = n.default.prototype.add;
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var t = this;
            n.default.execFuncs(t.hooks.beforeTick, t, [ t.$rafTime ]);
            if (t.$paintContext.clearRect) {
                t.$paintContext.clearRect(0, 0, this.width, this.height);
            }
            if (!t.$freezing) {
                t.$children = [];
                if (true) {
                    t.$plugin.timeCollect(t, "preprocessTimeSpend", "START");
                }
                this.children.sort(function(t, e) {
                    var r = n.default.funcOrValue(t.style.zIndex, t);
                    var i = n.default.funcOrValue(e.style.zIndex, e);
                    if (r === i) return 0;
                    return r > i ? 1 : -1;
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
            this.fps++;
            n.default.execFuncs(t.hooks.ticked, t, [ t.$rafTime ]);
            if (t.hooks.nextTick) {
                n.default.execFuncs(t.hooks.nextTick, t, [ t.$rafTime ]);
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
        var i = function t(e) {
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
            var n = e || {};
            t = this.$dom = t || this.$dom;
            for (var a in n) {
                this[a] = n[a];
            }
            this.name = n.name || t.id || t.classList && t.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (n.fullScreen && typeof document !== "undefined") {
                t.width = t.style.width = document.body.clientWidth || document.documentElement.clientWidth;
                t.height = t.style.height = document.body.clientHeight || document.documentElement.clientHeight;
            }
            if (true) {
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
            i.call(this, n);
            this.$paintContext = this.$paintContext || t.getContext("2d");
            return this;
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        t.exports = function(t, e) {
            var r = this;
            n.default.execFuncs(t.hooks.beforeRemove, t, t.$tickedTimes++);
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
                    n.default.execFuncs(t.hooks.removed, t, t.$tickedTimes);
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
            }, 40);
            return this;
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        var n = s(i);
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
                var i = null;
                var n = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
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
                        n.forEach(function(t) {
                            e.$perf[t] = 0;
                            e.$perf["$" + t] = 0;
                        });
                        setInterval(function() {
                            n.forEach(function(t) {
                                e.$perf[t] = e.$perf["$" + t];
                                e.$perf["$" + t] = 0;
                            });
                        }, 1e3);
                        if (!e.$flags.devtoolHanged) {
                            window[o.default.devFlag].$canvas[e.$id] = e;
                            e.$flags.devtoolHanged = true;
                        }
                    },
                    timeCollect: function t(e, r, i) {
                        e.$perf["$" + r] += (i === "START" || i === "PAUSE" ? -1 : 1) * Date.now();
                    },
                    selectSprite: function t(n, s, f) {
                        window[o.default.devFlag].MaskCanvasBase64 = r;
                        if (!f || !window[o.default.devFlag].selectMode) {
                            a.cancelSelectSprite(s);
                            return false;
                        }
                        if (!i) {
                            i = s.add({
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
                                i.style[t] = function() {
                                    if (t === "tw" || t === "th") {
                                        return f.getStyle(t) || f.getRect()[t];
                                    }
                                    return f.getStyle(t);
                                };
                            })(t);
                        });
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
                                        if (typeof f.webgl[t] === "function") {
                                            return f.webgl[t].call(f);
                                        }
                                        return f.webgl[t];
                                    };
                                })(l);
                            }
                            i.webgl.img = s.imgLoader(r);
                            i.webgl.colors = false;
                            i.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (n) {
                            s.remove(i);
                            i = null;
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
                        if (!i) return;
                        e.remove(i);
                        i = null;
                    }
                };
                return a;
            }
        };
    }, function(t, e, r) {
        "use strict";
        var i = r(43);
        var n = c(i);
        var a = r(35);
        var o = c(a);
        var s = r(54);
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
        for (var v in n.default) {
            if (Object.prototype.hasOwnProperty.call(n.default, v)) {
                d.prototype[v] = n.default[v];
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
            $flags: {
                dragging: false
            }
        };
        t.exports = r;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, r) {
        "use strict";
        var i = r(9);
        var n = s(i);
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
                return (0, n.default)(t, function(t) {
                    var i = t.width, n = t.height;
                    var a = t.getContext("2d").getImageData(0, 0, i, n);
                    var o = a.data;
                    for (var s = o.length - 1; s >= 0; s -= 4) {
                        if (e && e.conversion) {
                            var f = e.conversion({
                                r: o[s - 3],
                                g: o[s - 2],
                                b: o[s - 1],
                                a: o[s]
                            }, (s + 1 >> 2) % i, Math.floor((s + 1 >> 2) / i));
                            o[s - 3] = f.r;
                            o[s - 2] = f.g;
                            o[s - 1] = f.b;
                            o[s - 0] = f.a;
                        }
                    }
                    t.getContext("2d").clearRect(0, 0, i, n);
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
            var i = e.height;
            var n = document.createElement("canvas");
            n.width = r;
            n.height = i;
            var a = n.getContext("2d");
            a.scale(1, -1);
            a.translate(0, -i);
            a.drawImage(e, 0, 0);
            var o = a.getImageData(0, 0, r, i);
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

