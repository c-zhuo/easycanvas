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
        e.exports = r(35);
    }, function(e, t) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            },
            funcOrValue: function e(t, r) {
                if (typeof t === "function") {
                    var i = t.call(r);
                    return i;
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
                    return t.apply(i, n);
                } else if (r.isArray(t)) {
                    var a = [];
                    t.forEach(function(e) {
                        a.push(e && e.apply(i, n));
                    });
                    return a;
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function e(t, r, i, n, a, o) {
                return !(t < i || t > n || r < a || r > o);
            },
            firstValuable: function e(t, r, i) {
                return typeof t === "undefined" ? typeof r === "undefined" ? i : r : t;
            }
        };
        e.exports = r;
    }, function(e, t) {
        "use strict";
        var r = 3.141593;
        e.exports = function(e, t, i, n, a, o) {
            var s = a ? -a / 180 * r : 0;
            var f = e, l = t;
            if (a) {
                f = (e - i) * Math.cos(s) - (t - n) * Math.sin(s) + i;
                l = (e - i) * Math.sin(s) + (t - n) * Math.cos(s) + n;
            }
            if (o) {
                return [ f, l ];
            }
            return {
                x: f,
                y: l
            };
        };
    }, , function(e, t) {
        "use strict";
        e.exports = {
            xywh: [ "sx", "sy", "sw", "sh", "tx", "ty", "tw", "th" ],
            txywh: [ "tx", "ty", "tw", "th" ],
            sxywh: [ "sx", "sy", "sw", "sh" ],
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.6.0"
        };
    }, , , , , function(e, t) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var i = {};
        var n = [];
        var a = "processing";
        var o = 0;
        var s = function e(t, a, s) {
            var f = s || {};
            var l = e.cacheCanvas;
            if ((typeof t === "undefined" ? "undefined" : r(t)) === "object") {
                var u = t;
                f.callbackArgs = f.callbackArgs || [];
                e(u.shift(), function(t) {
                    f.callbackArgs.push(t);
                    if (u.length > 1) {
                        e(u, a, f);
                    } else {
                        e(u[0], function(e) {
                            f.callbackArgs.push(e);
                            a(f.callbackArgs);
                        }, f);
                    }
                }, s);
                return;
            }
            var c = t + "_" + JSON.stringify(s) + "_" + l;
            if (i[c]) {
                if (a) {
                    if (i[c].width && a) {
                        a(i[c]);
                    } else {
                        setTimeout(function() {
                            e(t, a, s);
                        }, 100);
                    }
                    return;
                } else {
                    return i[c];
                }
            }
            var d = new Image();
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
                        n.forEach(function(e) {
                            e.imgObj.src = e.src;
                        });
                        n.splice(0);
                    }
                }
                if (h && (f.canvas || f.alphaColor || l)) {
                    var e = h.getContext("2d");
                    h.width = d.width;
                    h.height = d.height;
                    h.$noAlpha = d.$noAlpha;
                    e.drawImage(d, 0, 0);
                    if (f.alphaColor) {
                        var t = e.getImageData(0, 0, d.width, d.height);
                        var r = [];
                        for (var i = 0; i < t.data.length; i += 4) {
                            var s = t.data[i] + t.data[i + 1] + t.data[i + 2];
                            var u = 1;
                            if (t.data[i] < u && t.data[i + 1] < u && t.data[i + 2] < u) {
                                t.data[i + 3] = Math.floor(s / 255);
                            }
                        }
                        e.putImageData(t, 0, 0);
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
        e.exports = s;
    }, function(e, t) {
        "use strict";
        var r = "processing";
        var i = {};
        function n(e, t) {
            if (e && e.match(/^data:/)) {
                t && t(e);
                return;
            }
            if (i[e]) {
                if (i[e] !== r) {
                    t(i[e]);
                } else {
                    setTimeout(function() {
                        n(e, t);
                    }, 100);
                }
                return;
            }
            i[e] = r;
            var a = new XMLHttpRequest();
            a.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
                    i[e] = r.result;
                    t && t(r.result);
                };
                r.readAsDataURL(a.response);
            };
            a.open("GET", e);
            a.responseType = "blob";
            a.send();
        }
        e.exports = n;
    }, function(e, t, r) {
        "use strict";
        var i = r(2);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = 3.141593;
        e.exports = function(e, t, r, i, n, a, s, f, l) {
            var u = l ? -l / 180 * o : 0;
            if (l) {
                e = (e - s) * Math.cos(l) - (t - f) * Math.sin(l) + s;
                t = (e - s) * Math.sin(l) + (t - f) * Math.cos(l) + f;
            }
            return e >= r && e <= r + n && t >= i && t <= i + a;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(2);
        var n = s(i);
        var a = r(11);
        var o = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r, i, n, a, s, f, l, u, c) {
            var d = (0, o.default)(e, t, n, a, s, f, l, u, c) || (0, o.default)(e + r, t, n, a, s, f, l, u, c) || (0, 
            o.default)(e, t + i, n, a, s, f, l, u, c) || (0, o.default)(e + r, t + i, n, a, s, f, l, u, c);
            if (d) return true;
            var h = (0, o.default)(n, a, e, t, r, i, l, u, -c) || (0, o.default)(n + s, a, e, t, r, i, l, u, -c) || (0, 
            o.default)(n, a + f, e, t, r, i, l, u, -c) || (0, o.default)(n + s, a + f, e, t, r, i, l, u, -c);
            if (h) return true;
            if (t > a && t + i < a + f && e < n && e + r > n + s) return true;
            if (e > n && e + r < n + s && t < a && t + i > a + f) return true;
            return false;
        };
    }, function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = r(1);
        var a = x(n);
        var o = r(4);
        var s = x(o);
        var f = r(19);
        var l = x(f);
        var u = r(18);
        var c = x(u);
        var d = r(16);
        var h = x(d);
        var v = r(17);
        var p = x(v);
        var g = r(20);
        var y = x(g);
        var $ = r(15);
        var m = x($);
        function x(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var w = function e(t) {
            if (t.children) {
                t.children.forEach(function(r, i) {
                    if (!r.$id) {
                        t.children[i] = new k(r);
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
        var b = function e(t) {
            var r = t || {};
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
            s.default.xywh.forEach(function(e) {
                r.style[e] = r.style[e] || 0;
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
        var T = function e(t) {
            var r = this;
            this.$extendList.forEach(function(e) {
                e.call(r, t);
            });
        };
        var k = function e(t) {
            var r = b(t);
            for (var i in r) {
                if (Object.prototype.hasOwnProperty.call(r, i)) {
                    this[i] = r[i];
                }
            }
            T.call(this, r);
            return this;
        };
        k.prototype.$extendList = [];
        k.prototype.add = function(e) {
            if (!e) {
                return;
            }
            this.children.push(e);
            w(this);
            return this.children[this.children.length - 1];
        };
        k.prototype.getRect = function() {
            var e = this;
            var t = {};
            s.default.txywh.forEach(function(r) {
                t[r] = e.getStyle(r);
            });
            if (t.tw === 0 && this.content.img) {
                var r = a.default.funcOrValue(this.content.img, this);
                t.tw = r.width;
                t.th = r.height;
            }
            var i = this.getStyle("locate");
            if (i === "lt") {} else if (i === "ld") {
                t.ty -= t.th;
            } else if (i === "rt") {
                t.tx -= t.tw;
            } else if (i === "rd") {
                t.tx -= t.tw;
                t.ty -= t.th;
            } else {
                t.tx -= t.tw >> 1;
                t.ty -= t.th >> 1;
            }
            return t;
        };
        k.prototype.getSelfStyle = function(e) {
            var t = {};
            if (e) {
                return a.default.funcOrValue(this.style[e], this);
            }
            for (var r in this.style) {
                t[r] = a.default.funcOrValue(this.style[r], this);
            }
            return t;
        };
        k.prototype.getStyle = function(e) {
            var t = this;
            var r = t.$canvas.$lastPaintTime;
            if (t.$styleCacheTime[e] === r) {
                return t.$cache[e];
            }
            var i = a.default.funcOrValue(t.style[e], t);
            if (t.$parent) {
                var n = void 0;
                if (t.inherit) {
                    n = t.inherit.indexOf(e) >= 0;
                } else {
                    n = e === "tx" || e === "ty" || e === "scale" || e === "opacity";
                }
                if (n) {
                    var o = t.$parent.getStyle(e);
                    if (e === "opacity" || e === "scale") {
                        o = a.default.firstValuable(o, 1);
                        t.$parent.$styleCacheTime[e] = r;
                        t.$parent.$cache[e] = o;
                        return o * a.default.firstValuable(i, 1);
                    } else {
                        o = a.default.firstValuable(o, 0);
                        t.$parent.$styleCacheTime[e] = r;
                        t.$parent.$cache[e] = o;
                        return o + a.default.firstValuable(i, 0);
                    }
                }
            }
            return i;
        };
        k.prototype.remove = function(e) {
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
        k.prototype.update = function(e) {
            if (!e) return;
            for (var t in e) {
                if (i(e[t]) === "object") {
                    for (var r in e[t]) {
                        this[t][r] = e[t][r];
                    }
                } else {
                    this[t] = e[t];
                }
            }
        };
        k.prototype.nextTick = p.default;
        k.prototype.on = l.default;
        k.prototype.off = c.default;
        k.prototype.clear = h.default;
        k.prototype.trigger = y.default;
        k.prototype.broadcast = m.default;
        e.exports = k;
    }, , function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
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
            this.children && this.children.forEach(function(t) {
                t.broadcast.apply(t, e);
            });
        };
    }, function(e, t) {
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
        var n = a(i);
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
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            var i = t;
            if (r) {
                var a = this;
                i = function e() {
                    var n = Date.now();
                    if (n > i.$lastTriggerTime + r) {
                        i.$lastTriggerTime = n;
                        var o = Array.prototype.slice.call(arguments);
                        t.apply(a, o);
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
        var n = a(i);
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
    }, , , , , , , , function(e, t) {
        "use strict";
        var r = function e(t) {
            setTimeout(t, 1e3 / 60);
        };
        var i = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || r : r;
        e.exports = i;
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = 3.141593;
        var a = function e(t) {
            return t.$lastPaintTime || Date.now();
        };
        var o = {
            linear: function e(t, r, i) {
                var n = a(this);
                var o = false;
                var s = void 0;
                var f = function() {
                    var e = this.$lastPaintTime;
                    var a = (e - n) / i;
                    var l = (r - t) * a + t;
                    if (o) {
                        if (r > t) {
                            while (l > r) {
                                l -= r - t;
                            }
                        } else {
                            while (l < r) {
                                l += t - r;
                            }
                        }
                    } else {
                        if (r > t && l > r) {
                            f.$done = true;
                            l = r;
                        } else if (r < t && l < r) {
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
                f.then = function(e) {
                    s = e;
                    return f;
                };
                return f;
            },
            pendulum: function e(t, r, i, o) {
                var s = a(this);
                var f = o || {};
                f.start = f.start || 0;
                var l = false;
                var u = void 0;
                var c = f.cycle || 1;
                var d = function() {
                    var e = a(this);
                    var o = (e - s) / i;
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
                    var v = (r - t) * (Math.sin(h) + 1) / 2 + t;
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
                d.then = function(e) {
                    u = e;
                    return d;
                };
                return d;
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
        var s = function e(t, r, n, a, s) {
            var f = (0, i.funcOrValue)(t[r]);
            if (true) {
                if (typeof f === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            f = f || 0;
            t[r] = o[n].bind(e)(f, a, s);
        };
        for (var f in o) {
            s[f] = o[f];
        }
        e.exports = s;
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
        var n = r(4);
        var a = f(n);
        var o = r(1);
        var s = f(o);
        function f(e) {
            return e && e.__esModule ? e : {
                default: e
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
                    getSprite: function e(t) {
                        if (!l.isPaintRecording) return [];
                        var r = {};
                        if (t) {
                            var n = l.$canvas[t].children;
                            var o = l.$canvas[t].$children;
                            var f = function e(t) {
                                if (t.name === a.default.devFlag) return;
                                r[t.$id] = {
                                    name: t.name,
                                    parent: t.$parent && t.$parent.$id,
                                    style: {},
                                    children: t.children.filter(function(e) {
                                        return e.name !== a.default.devFlag;
                                    }).map(function(e) {
                                        return e.$id;
                                    }),
                                    rendered: t.$rendered
                                };
                                for (var i in t.style) {
                                    r[t.$id].style[i] = s.default.funcOrValue(t.style[i], t);
                                }
                                a.default.xywh.forEach(function(e) {
                                    r[t.$id].style[e] = Math.round(r[t.$id].style[e]);
                                });
                                [ "physics", "$perf" ].forEach(function(e) {
                                    r[t.$id][e] = t[e];
                                });
                                if (t.webgl) {
                                    r[t.$id].webgl = {};
                                    [ "rx", "ry", "rz", "tx", "ty", "tz" ].forEach(function(e) {
                                        r[t.$id].webgl[e] = s.default.funcOrValue(t.webgl[e], t);
                                    });
                                }
                                if (t.children) {
                                    t.children.forEach(e);
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
                    selectSpriteById: function e(t, r) {
                        if (!r) {
                            for (var i in l.$canvas) {
                                var n = u.selectSpriteById(t, i);
                                if (n) {
                                    return {
                                        $sprite: n.$sprite || n,
                                        $canvas: l.$canvas[i]
                                    };
                                }
                            }
                            return false;
                        }
                        var a = function e(i) {
                            for (var n = 0; n < i.length; n++) {
                                if (i[n].$id === t) return i[n];
                                var a = e(i[n].children);
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
                    updateSprite: function e(t) {
                        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "style";
                        var n = arguments[2];
                        var a = arguments[3];
                        var o = u.selectSpriteById(t, a).$sprite;
                        if (!o) console.warn("Sprite " + spriteId + " Not Found.");
                        i(o[r], n);
                    },
                    highlightSprite: function e(t, r, i) {
                        l.selectMode = Boolean(r);
                        var n = u.selectSpriteById(t, i);
                        var a = n.$sprite;
                        var o = n.$canvas;
                        if (r && o && a) {
                            o.$plugin.selectSprite(false, o, a);
                        } else if (o) {
                            o.$plugin.cancelSelectSprite(o);
                        }
                    },
                    sendGlobalHook: function e(t, r) {
                        var i = u.selectSpriteById(t, r);
                        var n = i.$sprite;
                        var a = i.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + n.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = n;
                        window.$1 = a;
                    },
                    pause: function e(t, r) {
                        var i = l.$canvas[t];
                        i.$pausing = typeof r !== "undefined" ? r : !i.$pausing;
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
                        if (!l.isPaintRecording) return t;
                        for (var r in l.$canvas) {
                            t.canvas.push({
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
                        return t;
                    }
                };
                l.$plugin = u;
            }
        }
    }, , , , , function(e, t, r) {
        "use strict";
        var i = r(4);
        var n = A(i);
        var a = r(57);
        var o = A(a);
        var s = r(28);
        var f = A(s);
        var l = r(99);
        var u = A(l);
        var c = r(1);
        var d = A(c);
        var h = r(29);
        var v = A(h);
        var p = r(9);
        var g = A(p);
        var y = r(98);
        var $ = A(y);
        var m = r(100);
        var x = A(m);
        var w = r(13);
        var b = A(w);
        var T = r(30);
        var k = A(T);
        function A(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var S = {
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
        S.extend = function(e) {
            var t = S.sprite.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            t.push(e);
        };
        S.use = function(e) {
            var t = S.painter.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            if (e.onUse) {
                e.onUse(S);
            }
            t.push(e);
        };
        S.component = function(e, t) {
            e(S, t);
        };
        var O = typeof window !== "undefined";
        if (O) {
            if (window.Easycanvas) {
                console.warn("[Easycanvas] already loaded, it should be loaded only once.");
            } else {
                if (true) {
                    setTimeout(function() {
                        console.log("%c Easycanvas %c You are using the develop version " + n.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                    }, 500);
                }
                if (true) {
                    window.Easycanvas = S;
                }
            }
        }
        e.exports = S;
    }, , , , function(e, t, r) {
        "use strict";
        var i = r(44);
        var n = h(i);
        var a = r(46);
        var o = h(a);
        var s = r(40);
        var f = h(s);
        var l = r(45);
        var u = h(l);
        var c = r(56);
        var d = h(c);
        function h(e) {
            return e && e.__esModule ? e : {
                default: e
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
        e.exports = v;
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = s(i);
        var a = r(4);
        var o = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = function e(t) {
            return t.sort(function(e, t) {
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                        return n.default.funcOrValue(e.style.zIndex, e) < n.default.funcOrValue(t.style.zIndex, t) ? 1 : -1;
                    }
                }
                return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) < n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) ? 1 : -1;
            });
        };
        var l = function e(t, r) {
            var i = t.getRect();
            return n.default.pointInRect(r.canvasX, r.canvasY, i.tx, i.tx + i.tw, i.ty, i.ty + i.th);
        };
        var u = function e(t, r, i) {
            if (!t || !t.length) return;
            if (r.$stopPropagation) return;
            var a = t.length;
            for (var s = 0; s < a; s++) {
                var u = t[s];
                if (n.default.funcOrValue(u.style.visible, u) === false) continue;
                if (l(u, r)) {
                    if (u.events.interceptor) {
                        var c = n.default.firstValuable(u.events.interceptor.call(u, r), r);
                        if (!c || c.$stopPropagation) continue;
                    }
                }
                if (u.children.length) {
                    e(f(u.children.filter(function(e) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) >= 0;
                            }
                        }
                        return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0;
                    })), r, i);
                }
                if (l(u, r)) {
                    i.push(u);
                    var h = d(u, r);
                    if (r.$stopPropagation) break;
                }
                if (u.children.length) {
                    e(f(u.children.filter(function(e) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) < 0;
                            }
                        }
                        return !(n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0);
                    })), r, i);
                }
            }
        };
        var c = function e(t, r) {
            var i = this;
            this.$extendList.forEach(function(e) {
                if (e.onEvent) {
                    e.onEvent.call(i, t, r);
                }
            });
        };
        var d = function e(t, r) {
            if (!t.events || !t.events[r.type]) return;
            if (r.$stopPropagation) return;
            var i = t.events[r.type].call(t, r);
            if (i === true) {
                return true;
            }
            if (t.events.stopPropagation) {
                return true;
            }
        };
        var h = {
            x: 0,
            y: 0,
            timeStamp: 0
        };
        var v;
        v = function e(t, r) {
            var i = this;
            var a = void 0;
            var s = void 0;
            var l = 1;
            var d = 1;
            if (!r) {
                if (!t.layerX && t.targetTouches && t.targetTouches[0]) {
                    a = t.targetTouches[0].pageX - t.currentTarget.offsetLeft;
                    s = t.targetTouches[0].pageY - t.currentTarget.offsetTop;
                } else if (!t.layerX && t.changedTouches && t.changedTouches[0]) {
                    a = t.changedTouches[0].pageX - t.currentTarget.offsetLeft;
                    s = t.changedTouches[0].pageY - t.currentTarget.offsetTop;
                } else {
                    a = t.layerX;
                    s = t.layerY;
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
                type: t.type,
                canvasX: a / l,
                canvasY: s / d,
                event: t
            };
            if (i.fastclick) {
                if (y.type === "click" && !y.fakeClick) {
                    return;
                } else if (y.type === "touchstart") {
                    h.x = y.canvasX;
                    h.y = y.canvasY;
                    h.timeStamp = Date.now();
                } else if (y.type === "touchend") {
                    if (Math.abs(h.x - y.canvasX) < 30 && Math.abs(h.y - y.canvasY) < 30 && Date.now() - h.timeStamp < 200) {
                        v.call(this, null, {
                            fakeClick: true,
                            type: "click",
                            canvasX: h.x,
                            canvasY: h.y,
                            event: t
                        });
                    }
                }
            }
            y.stopPropagation = function() {
                y.$stopPropagation = true;
            };
            if (i.events.interceptor) {
                y = n.default.firstValuable(i.events.interceptor.call(i, y), y);
                if (!y || y.$stopPropagation) return;
            }
            var $ = [];
            u(f(i.children), y, $);
            n.default.execFuncs(i.hooks.afterEvent, i, y);
            i.hooks.afterEvent = null;
            c.call(i, y, $);
            if (true) {
                if (window[o.default.devFlag] && window[o.default.devFlag].selectMode && $.length) {
                    var m = $[0];
                    if (m.name === o.default.devFlag) {
                        m = $[1];
                    }
                    if (m && i.$plugin.selectSprite(y.type === "click" || y.type === "touchend", i, m)) {
                        return;
                    }
                }
            }
            if ((y.type === "mousemove" || y.type === "touchmove") && i.eLastMouseHover && $.indexOf(i.eLastMouseHover) === -1) {
                var x = i.eLastMouseHover["events"]["mouseout"] || i.eLastMouseHover["events"]["touchout"];
                if (x) {
                    x.call(i.eLastMouseHover, y);
                }
            }
            i.eLastMouseHover = $[0];
            if (!$.length && i.eLastMouseHover) {
                var w = i.eLastMouseHover["events"]["mouseout"];
                if (w) {
                    w.call(i.eLastMouseHover, y);
                }
                i.eLastMouseHover = null;
            }
            var b = i.events[y.type];
            if (b) {
                if (b.call(i, y)) {
                    i.eHoldingFlag = false;
                    return true;
                }
            }
        };
        e.exports = v;
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t, r, i) {
            if (t.sx < 0 && t.sw) {
                var n = -t.sx / t.sw;
                t.tx += t.tw * n;
                t.sx = 0;
            }
            if (t.sy < 0 && t.sh) {
                var a = -t.sy / t.sh;
                t.ty += t.th * a;
                t.sy = 0;
            }
            if (r && t.sx + t.sw > r) {
                var o = (t.sx + t.sw - r) / t.sw;
                t.sw -= t.sw * o;
                t.tw -= t.tw * o;
            }
            if (i && t.sy + t.sh > i) {
                var s = (t.sy + t.sh - i) / t.sh;
                t.sh -= t.sh * s;
                t.th -= t.th * s;
            }
            if (t.tx < 0 && t.tw > -t.tx) {
                var f = -t.tx / t.tw;
                t.sx += t.sw * f;
                t.sw -= t.sw * f;
                t.tw = t.tw + t.tx;
                t.tx = 0;
            }
            if (t.ty < 0 && t.th > -t.ty) {
                var l = -t.ty / t.th;
                t.sy += t.sh * l;
                t.sh -= t.sh * l;
                t.th = t.th + t.ty;
                t.ty = 0;
            }
            if (t.tw && t.tx + t.tw > e.width) {
                var u = (t.tx + t.tw - e.width) / t.tw;
                t.tw -= t.tw * u;
                t.sw -= t.sw * u;
            }
            if (t.th && t.ty + t.th > e.height) {
                var c = (t.ty + t.th - e.height) / t.th;
                t.th -= t.th * c;
                t.sh -= t.sh * c;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            if (t) {
                t.filter(function(e) {
                    var t = n.default.funcOrValue(e.style.zIndex, e);
                    if (r < 0) {
                        return t < 0;
                    }
                    return t >= 0;
                }).sort(function(e, t) {
                    var r = n.default.funcOrValue(e.style.zIndex, e);
                    var i = n.default.funcOrValue(t.style.zIndex, t);
                    if (r === i) return 0;
                    return r > i ? 1 : -1;
                }).forEach(function(t, r) {
                    e.$perPaint.call(e, t, r);
                });
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r = {};
            for (var i in e.content) {
                r[i] = n.default.funcOrValue(e.content[i], e);
            }
            if (typeof r.img === "string") {
                r.img = e.content.img = t.imgLoader(r.img);
            }
            for (var a in e.style) {
                r[a] = e.getStyle(a);
            }
            if (e.inherit) {
                e.inherit.forEach(function(t) {
                    r[t] = e.getStyle(t);
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
                        s.onOver.call(e);
                    } else {
                        e.remove();
                    }
                }
                r.sequence.lastTickTime = r.sequence.lastTickTime || 0;
                if (t.$nextTickTime - r.sequence.lastTickTime >= n.default.funcOrValue(r.sequence.interval, e)) {
                    s.lastTickTime = t.$nextTickTime;
                    r.sequence.index++;
                    r.sequence.lastTickTime = t.$nextTickTime;
                }
                r.sw = r.sw || l;
                r.sh = r.sh || u;
                r.tw = r.tw || l;
                r.th = r.th || u;
            }
            return r;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = p(i);
        var a = r(4);
        var o = p(a);
        var s = r(43);
        var f = p(s);
        var l = r(41);
        var u = p(l);
        var c = r(42);
        var d = p(c);
        var h = r(12);
        var v = p(h);
        function p(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var g = n.default.blend;
        var y = function e(t) {
            var r = /[^\u4e00-\u9fa5]/;
            return !r.test(t);
        };
        var $ = function e() {
            var t = this;
            this.$canvas.$extendList.forEach(function(e) {
                if (e.onPaint) {
                    e.onPaint.call(t);
                }
            });
        };
        e.exports = function(e, t) {
            e.$rendered = false;
            if (n.default.funcOrValue(e.style.visible, e) === false) {
                n.default.execFuncs(e.hooks.beforeTick, e, e.$tickedTimes);
                n.default.execFuncs(e.hooks.ticked, e, ++e.$tickedTimes);
                return;
            }
            n.default.execFuncs(e.hooks.beforeTick, e, e.$tickedTimes);
            var r = this;
            $.call(e);
            var i = (0, f.default)(e, r);
            var a = {
                globalAlpha: n.default.firstValuable(i.opacity, 1)
            };
            var o = i.text;
            var s = i.img;
            var l = n.default.funcOrValue(e.children, e);
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
                    if (!e.$perf.paintRate || w > e.$perf.paintRate) {
                        e.$perf.paintRate = w;
                    }
                }
            }
            if (a.clip) {
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    var T = {
                        $id: e.$id,
                        type: "clip",
                        settings: a,
                        img: s,
                        props: i
                    };
                    T.$origin = e;
                    r.$children.push(T);
                }
            }
            (0, d.default)(r, l, -1);
            if (a.fillRect) {
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    e.$rendered = true;
                    var k = {
                        $id: e.$id,
                        type: "fillRect",
                        settings: a,
                        img: s,
                        props: i
                    };
                    k.$origin = e;
                    r.$children.push(k);
                }
            }
            if (c && i.opacity !== 0 && i.sw && i.sh) {
                if (!i.rotate && !o) {
                    (0, u.default)(r, i, c, h);
                }
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width - 1, r.height - 1, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    e.$rendered = true;
                    var A = {
                        $id: e.$id,
                        type: "img",
                        settings: a,
                        img: s,
                        props: i
                    };
                    A.$origin = e;
                    r.$children.push(A);
                }
            }
            if (o) {
                e.$rendered = true;
                var S = i.tx;
                var O = i.ty;
                var F = i.align || i.textAlign || "left";
                var R = i.textFont || "14px Arial";
                var M = parseInt(R);
                var E = void 0;
                var _ = i.lineHeight || M;
                if (F === "center") {
                    S += i.tw / 2;
                } else if (F === "right") {
                    S += i.tw;
                }
                if (i.textVerticalAlign === "top") {
                    E = "top";
                } else if (i.textVerticalAlign === "bottom") {
                    E = "bottom";
                    O += i.th;
                } else if (i.textVerticalAlign === "middle") {
                    O += i.th >> 1;
                    E = "middle";
                }
                if (typeof o === "string" || typeof o === "number") {
                    if (O + M * 2 > 0 && O - M * 2 < r.height) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: S,
                                ty: O,
                                content: String(o),
                                fontsize: M,
                                align: F,
                                baseline: E,
                                font: R,
                                color: i.color,
                                type: i.textType
                            },
                            $origin: e
                        });
                    }
                } else if (o.length) {
                    o.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: S + n.default.funcOrValue(t.tx, e),
                                ty: O + n.default.funcOrValue(t.ty, e),
                                content: n.default.funcOrValue(t.content, e),
                                fontsize: M,
                                baseline: E,
                                align: F,
                                font: R,
                                color: i.color,
                                type: i.textType
                            },
                            $origin: e
                        });
                    });
                } else if (o.type === "multline-text") {
                    var C = o.text.split(/\t|\n/);
                    var I = [];
                    C.forEach(function(e, t) {
                        e = String.prototype.trim.apply(e);
                        if (o.config.start) {
                            e = e.replace(o.config.start, "");
                        }
                        var r = 0;
                        var n = i.tw;
                        while (e.length && r < e.length) {
                            if (n <= 0) {
                                n = i.tw;
                                I.push(e.substr(0, r));
                                e = e.substr(r);
                                r = 0;
                            }
                            r++;
                            n -= M * (y(e[r]) ? 1.05 : .6);
                        }
                        if (e || t) {
                            I.push(e);
                        }
                    });
                    I.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: a,
                            props: {
                                tx: S,
                                ty: O,
                                fontsize: M,
                                content: t,
                                baseline: E,
                                align: F,
                                font: R,
                                color: i.color,
                                type: i.textType
                            },
                            $origin: e
                        });
                        O += _ || M;
                    });
                }
            }
            if (!s && !o) {
                e.$rendered = undefined;
            }
            (0, d.default)(r, l, 1);
            if (a.clip) {
                var b = (0, v.default)(i.tx, i.ty, i.tw, i.th, 0, 0, r.width, r.height, a.beforeRotate && a.beforeRotate[0], a.beforeRotate && a.beforeRotate[1], i.rotate);
                if (b) {
                    var V = {
                        $id: e.$id,
                        type: "clipOver",
                        settings: a,
                        img: s,
                        props: i
                    };
                    V.$origin = e;
                    r.$children.push(V);
                }
            }
            n.default.execFuncs(e.hooks.ticked, e, ++e.$tickedTimes);
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(28);
        var n = s(i);
        var a = r(29);
        var o = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e) {
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
            (0, n.default)(function(r) {
                this.$rafTime = r;
                this.$rAFer(e);
                if (this.maxFps > 0 && this.maxFps < 60) {
                    if (t - this.$lastPaintTime <= 1e3 / this.maxFps) {
                        return;
                    }
                    this.$lastPaintTime = t - (t - this.$lastPaintTime) % (1e3 / this.maxFps);
                } else {
                    this.$lastPaintTime = Date.now();
                }
                e();
            }.bind(this));
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = function e(t, r) {
            var i = this;
            var n = false;
            this.$extendList.forEach(function(e) {
                if (e.onRender) {
                    var a = e.onRender.call(i, t, r);
                    if (a) {
                        n = a;
                    }
                }
            });
            return n;
        };
        var s = function e(t, r) {
            var i = this;
            var a = t.props;
            var s = void 0;
            var f = t.type === "text";
            if (a && t.type !== "clip" && t.type !== "clipOver") {
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
                if ((s > 200 * 200 || f) && !t.settings.transform && !t.settings.rotate) {
                    var u = i.$children;
                    for (var c = u.length - 1; c > r; c--) {
                        var d = u[c];
                        if (d.$cannotCover) {
                            continue;
                        }
                        if (!d.type || d.type !== "img") {
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
                                t.$origin.$useless = true;
                            }
                            return;
                        }
                    }
                }
            }
            var p = t.settings || {};
            if (o.call(i, t, p)) {
                return;
            }
            if (true) {
                if (t.$origin) {
                    t.$origin.$useless = false;
                }
            }
            var g = i.$paintContext;
            if (t.type === "clip") {
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
            if (t.type === "img") {
                g.drawImage(t.img, a.sx, a.sy, a.sw, a.sh, a.tx, a.ty, a.tw, a.th);
                if (true) {
                    i.$plugin.drawImage(i, a);
                }
            } else if (t.type === "text" && a.content) {
                g.font = a.font;
                g.fillStyle = a.color || "white";
                g.textAlign = a.align;
                g.textBaseline = a.baseline;
                g[a.type || "fillText"](a.content, a.tx, a.ty);
            } else if (t.type === "fillRect") {
                g.fillStyle = p.fillRect;
                g.fillRect(a.tx, a.ty, a.tw, a.th);
            } else if (t.type === "clipOver") {
                g.restore();
            }
            if (y) {
                g.restore();
            }
        };
        e.exports = function() {
            var e = this;
            e.$children.forEach(s.bind(e));
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(48);
        var n = E(i);
        var a = r(52);
        var o = E(a);
        var s = r(55);
        var f = E(s);
        var l = r(49);
        var u = E(l);
        var c = r(16);
        var d = E(c);
        var h = r(50);
        var v = E(h);
        var p = r(19);
        var g = E(p);
        var y = r(18);
        var $ = E(y);
        var m = r(20);
        var x = E(m);
        var w = r(15);
        var b = E(w);
        var T = r(17);
        var k = E(T);
        var A = r(51);
        var S = E(A);
        var O = r(53);
        var F = E(O);
        var R = r(54);
        var M = E(R);
        function E(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var _ = {
            start: f.default,
            paint: u.default,
            add: n.default,
            remove: o.default,
            register: S.default,
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
        e.exports = _;
    }, function(e, t, r) {
        "use strict";
        var i = r(13);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = n.default.prototype.add;
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var e = this;
            n.default.execFuncs(e.hooks.beforeTick, e, [ e.$rafTime ]);
            if (e.$paintContext.clearRect) {
                e.$paintContext.clearRect(0, 0, this.width, this.height);
            }
            if (!e.$freezing) {
                e.$children = [];
                if (true) {
                    e.$plugin.timeCollect(e, "preprocessTimeSpend", "START");
                }
                this.children.sort(function(e, t) {
                    var r = n.default.funcOrValue(e.style.zIndex, e);
                    var i = n.default.funcOrValue(t.style.zIndex, t);
                    if (r === i) return 0;
                    return r > i ? 1 : -1;
                }).forEach(function(t, r) {
                    e.$perPaint(t, r);
                });
                if (true) {
                    e.$plugin.timeCollect(e, "preprocessTimeSpend", "END");
                }
            }
            if (true) {
                e.$plugin.timeCollect(e, "paintTimeSpend", "START");
            }
            e.$render();
            if (true) {
                e.$plugin.timeCollect(e, "paintTimeSpend", "END");
            }
            this.fps++;
            n.default.execFuncs(e.hooks.ticked, e, [ e.$rafTime ]);
            if (e.hooks.nextTick) {
                n.default.execFuncs(e.hooks.nextTick, e, [ e.$rafTime ]);
                delete e.hooks.nextTick;
            }
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            this.$pausing = e === undefined ? true : e;
        };
    }, function(e, t, r) {
        "use strict";
        var i = function e(t) {
            var r = this;
            this.$extendList.forEach(function(e) {
                if (e.onCreate) {
                    e.onCreate.call(r, t);
                }
            });
        };
        e.exports = function(e, t) {
            var r = this;
            if (true) {
                this.fpsHandler = this.fpsHandler || function(e) {
                    if (this.maxFps > 0 && e < this.maxFps - 5 && e < 40) {
                        console.warn("[Easycanvas] Low FPS detected (" + e + "/" + this.maxFps + ").");
                    }
                };
            }
            var n = t || {};
            e = this.$dom = e || this.$dom;
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
                    e.addEventListener(t, r.$eventHandler.bind(r));
                });
            }
            if (true) {
                if (this.$paintContext) {
                    console.error("[Easycanvas] Current instance is already registered.");
                }
            }
            i.call(this, n);
            this.$paintContext = this.$paintContext || e.getContext("2d");
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r = this;
            n.default.execFuncs(e.hooks.beforeRemove, e, e.$tickedTimes++);
            e.style.visible = false;
            e.$removing = true;
            setTimeout(function() {
                if (e.$parent) {
                    e.$parent.children = e.$parent.children.filter(function(e) {
                        return e.$removing !== true;
                    });
                } else {
                    r.children = r.children.filter(function(e) {
                        return e.$removing !== true;
                    });
                }
                if (e.$canvas) {
                    e.$canvas = undefined;
                    e.$parent = undefined;
                    e.$tickedTimes = undefined;
                    e.$cache = undefined;
                    e.$rendered = false;
                    if (true) {
                        e.$perf = undefined;
                    }
                    n.default.execFuncs(e.hooks.removed, e, e.$tickedTimes);
                }
            });
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
    }, function(e, t) {
        "use strict";
        e.exports = function() {
            var e = this;
            this.fpsCalculateTime = Date.now();
            this.$rAFer(this.paint.bind(this));
            setInterval(function() {
                if (e.eHoldingFlag) {
                    var t = e.eHoldingFlag;
                    t.type = "hold";
                    e.$eventHandler.call(e, null, t);
                }
            }, 100);
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = s(i);
        var a = r(4);
        var o = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (true) {
                var e = "__EASYCANVAS_BRIDGE_TOPANEL__";
                var t = function t(r) {
                    r.tabId = window[o.default.devFlag].tabId;
                    window.document.dispatchEvent(new CustomEvent(e, {
                        detail: JSON.parse(JSON.stringify(r))
                    }));
                };
                setTimeout(function() {
                    t({
                        name: "init"
                    });
                });
                var r = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==";
                var i = null;
                var n = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
                var a = {
                    drawImage: function e(t, r) {
                        if (!window[o.default.devFlag].isPaintRecording) return;
                        if (r) {
                            t.$perf.$paintArea += r[7] * r[8];
                            t.$perf.$loadArea += r[3] * r[4];
                        }
                        t.$perf.$paintTimes++;
                    },
                    jumpRender: function e(t, r) {
                        t.$perf.$jumpArea += r[7] * r[8];
                    },
                    register: function e(t) {
                        t.$id = Math.random().toString(36).substr(2);
                        t.$perf = {};
                        n.forEach(function(e) {
                            t.$perf[e] = 0;
                            t.$perf["$" + e] = 0;
                        });
                        setInterval(function() {
                            n.forEach(function(e) {
                                t.$perf[e] = t.$perf["$" + e];
                                t.$perf["$" + e] = 0;
                            });
                        }, 1e3);
                        if (!t.$flags.devtoolHanged) {
                            window[o.default.devFlag].$canvas[t.$id] = t;
                            t.$flags.devtoolHanged = true;
                        }
                    },
                    timeCollect: function e(t, r, i) {
                        t.$perf["$" + r] += (i === "START" || i === "PAUSE" ? -1 : 1) * Date.now();
                    },
                    selectSprite: function e(n, s, f) {
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
                        [ "tx", "ty", "rotate", "rx", "ry", "scale", "tw", "th", "locate" ].forEach(function(e) {
                            (function(e) {
                                i.style[e] = function() {
                                    if (e === "tw" || e === "th") {
                                        return f.getStyle(e) || f.getRect()[e];
                                    }
                                    return f.getStyle(e);
                                };
                            })(e);
                        });
                        i.style.zIndex = Number.MAX_SAFE_INTEGER;
                        i.style.visible = function() {
                            return window[o.default.devFlag].selectMode;
                        };
                        i.style.opacity = .8;
                        i.webgl = f.webgl ? {} : undefined;
                        if (i.webgl) {
                            for (var l in f.webgl) {
                                (function(e) {
                                    i.webgl[e] = function() {
                                        if (typeof f.webgl[e] === "function") {
                                            return f.webgl[e].call(f);
                                        }
                                        return f.webgl[e];
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
                            t({
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
                    cancelSelectSprite: function e(t) {
                        if (!i) return;
                        t.remove(i);
                        i = null;
                    }
                };
                return a;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(47);
        var n = c(i);
        var a = r(39);
        var o = c(a);
        var s = r(58);
        var f = c(s);
        var l = r(9);
        var u = c(l);
        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var d = function e(t) {
            this.imgLoader = u.default;
            for (var r in f.default) {
                this[r] = this[r] || JSON.parse(JSON.stringify(f.default[r]));
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
        e.exports = r;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = r(9);
        var n = s(i);
        var a = r(10);
        var o = s(a);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r;
            (0, o.default)(e, function(e) {
                return (0, n.default)(e, function(e) {
                    var i = e.width, n = e.height;
                    var a = e.getContext("2d").getImageData(0, 0, i, n);
                    var o = a.data;
                    for (var s = o.length - 1; s >= 0; s -= 4) {
                        if (t && t.conversion) {
                            var f = t.conversion({
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
                    e.getContext("2d").clearRect(0, 0, i, n);
                    e.getContext("2d").putImageData(a, 0, 0);
                    r = e;
                }, {
                    canvas: true,
                    cacheFlag: Math.random()
                });
            });
            return function() {
                return r;
            };
        };
    }, function(e, t) {
        "use strict";
        e.exports = function e(t) {
            var r = t.width;
            var i = t.height;
            var n = document.createElement("canvas");
            n.width = r;
            n.height = i;
            var a = n.getContext("2d");
            a.scale(1, -1);
            a.translate(0, -i);
            a.drawImage(t, 0, 0);
            var o = a.getImageData(0, 0, r, i);
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

