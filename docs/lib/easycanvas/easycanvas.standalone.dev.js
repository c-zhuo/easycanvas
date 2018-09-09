(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var n = r();
        for (var a in n) (typeof exports === "object" ? exports : t)[a] = n[a];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var a = t[n] = {
                exports: {},
                id: n,
                loaded: false
            };
            e[n].call(a.exports, a, a.exports, r);
            a.loaded = true;
            return a.exports;
        }
        r.m = e;
        r.c = t;
        r.p = "";
        return r(0);
    }([ function(e, t, r) {
        e.exports = r(32);
    }, function(e, t) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            },
            funcOrValue: function e(t, r) {
                if (typeof t === "function") {
                    var n = t.call(r);
                    return n;
                }
                return t;
            },
            execFuncs: function e(t, n, a) {
                if (t) {
                    if (!r.isArray(a)) {
                        a = [ a ];
                    }
                }
                if (typeof t === "function") {
                    return t.apply(n, a);
                } else if (r.isArray(t)) {
                    var i = [];
                    t.forEach(function(e) {
                        i.push(e && e.apply(n, a));
                    });
                    return i;
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function e(t, r, n, a, i, s) {
                return !(t < n || t > a || r < i || r > s);
            },
            firstValuable: function e(t, r, n) {
                return typeof t === "undefined" ? typeof r === "undefined" ? n : r : t;
            }
        };
        e.exports = r;
    }, function(e, t) {
        "use strict";
        var r = 3.141593;
        e.exports = function(e, t, n, a, i, s) {
            var o = i ? -i / 180 * r : 0;
            var f = e, l = t;
            if (i) {
                f = (e - n) * Math.cos(o) - (t - a) * Math.sin(o) + n;
                l = (e - n) * Math.sin(o) + (t - a) * Math.cos(o) + a;
            }
            if (s) {
                return [ f, l ];
            }
            return {
                x: f,
                y: l
            };
        };
    }, function(e, t) {
        "use strict";
        e.exports = {
            xywh: [ "sx", "sy", "sw", "sh", "tx", "ty", "tw", "th" ],
            txywh: [ "tx", "ty", "tw", "th" ],
            sxywh: [ "sx", "sy", "sw", "sh" ],
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.5.10"
        };
    }, , , function(e, t) {
        "use strict";
        var r = "processing";
        var n = {};
        function a(e, t) {
            if (e && e.match(/^data:/)) {
                t && t(e);
                return;
            }
            if (n[e]) {
                if (n[e] !== r) {
                    t(n[e]);
                } else {
                    setTimeout(function() {
                        a(e, t);
                    }, 100);
                }
                return;
            }
            n[e] = r;
            var i = new XMLHttpRequest();
            i.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
                    n[e] = r.result;
                    t && t(r.result);
                };
                r.readAsDataURL(i.response);
            };
            i.open("GET", e);
            i.responseType = "blob";
            i.send();
        }
        e.exports = a;
    }, , , , function(e, t) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = {};
        var a = [];
        var i = "processing";
        var s = 0;
        var o = function e(t, i, o) {
            var f = o || {};
            var l = e.cacheCanvas;
            if ((typeof t === "undefined" ? "undefined" : r(t)) === "object") {
                var u = t;
                f.callbackArgs = f.callbackArgs || [];
                e(u.shift(), function(t) {
                    f.callbackArgs.push(t);
                    if (u.length > 1) {
                        e(u, i, f);
                    } else {
                        e(u[0], function(e) {
                            f.callbackArgs.push(e);
                            i(f.callbackArgs);
                        }, f);
                    }
                }, o);
                return;
            }
            var c = t + "_" + JSON.stringify(o) + "_" + l;
            if (n[c]) {
                if (i) {
                    i(n[c]);
                }
                return n[c];
            }
            var d = new Image();
            if (f.block) {
                d.src = t;
                s++;
            } else if (s === 0) {
                d.src = t;
            } else {
                a.push({
                    imgObj: d,
                    src: t
                });
            }
            n[c] = d;
            var v = void 0;
            if (f.canvas || f.alphaColor || l) {
                v = document.createElement("canvas");
                v.width = v.height || 0;
                n[c] = v;
            }
            d.onload = function() {
                if (d.src.substr(-3) === "jpg" || d.src.substr(-3) === "jpeg" || d.src.substr(-3) === "bmp") {
                    d.$noAlpha = true;
                } else if (d.src.indexOf("data:image/jpg;") === 0) {
                    d.$noAlpha = true;
                }
                if (f.block) {
                    s--;
                    if (s === 0) {
                        a.forEach(function(e) {
                            e.imgObj.src = e.src;
                        });
                        a.splice(0);
                    }
                }
                if (v && (f.canvas || f.alphaColor || l)) {
                    var e = v.getContext("2d");
                    v.width = d.width;
                    v.height = d.height;
                    v.$noAlpha = d.$noAlpha;
                    e.drawImage(d, 0, 0);
                    if (f.alphaColor) {
                        var t = e.getImageData(0, 0, d.width, d.height);
                        var r = [];
                        for (var n = 0; n < t.data.length; n += 4) {
                            var o = t.data[n] + t.data[n + 1] + t.data[n + 2];
                            var u = 1;
                            if (t.data[n] < u && t.data[n + 1] < u && t.data[n + 2] < u) {
                                t.data[n + 3] = Math.floor(o / 255);
                            }
                        }
                        e.putImageData(t, 0, 0);
                        v.$noAlpha = false;
                    }
                    d = v;
                }
                if (i) {
                    i(d);
                }
            };
            d.onerror = function() {
                n[c] = d;
            };
            return v || d;
        };
        o.cacheCanvas = false;
        e.exports = o;
    }, function(e, t, r) {
        "use strict";
        var n = r(2);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = 3.141593;
        e.exports = function(e, t, r, n, a, i, o, f, l) {
            var u = l ? -l / 180 * s : 0;
            if (l) {
                e = (e - o) * Math.cos(l) - (t - f) * Math.sin(l) + o;
                t = (e - o) * Math.sin(l) + (t - f) * Math.cos(l) + f;
            }
            return e >= r && e <= r + a && t >= n && t <= n + i;
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(2);
        var a = o(n);
        var i = r(11);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r, n, a, i, o, f, l, u, c) {
            var d = (0, s.default)(e, t, a, i, o, f, l, u, c) || (0, s.default)(e + r, t, a, i, o, f, l, u, c) || (0, 
            s.default)(e, t + n, a, i, o, f, l, u, c) || (0, s.default)(e + r, t + n, a, i, o, f, l, u, c);
            if (d) return true;
            var v = (0, s.default)(a, i, e, t, r, n, l, u, -c) || (0, s.default)(a + o, i, e, t, r, n, l, u, -c) || (0, 
            s.default)(a, i + f, e, t, r, n, l, u, -c) || (0, s.default)(a + o, i + f, e, t, r, n, l, u, -c);
            if (v) return true;
            if (t > i && t + n < i + f && e < a && e + r > a + o) return true;
            if (e > a && e + r < a + o && t < i && t + n > i + f) return true;
            return false;
        };
    }, function(e, t, r) {
        "use strict";
        var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var a = r(1);
        var i = b(a);
        var s = r(3);
        var o = b(s);
        var f = r(19);
        var l = b(f);
        var u = r(18);
        var c = b(u);
        var d = r(16);
        var v = b(d);
        var h = r(17);
        var p = b(h);
        var g = r(20);
        var y = b(g);
        var m = r(15);
        var $ = b(m);
        var x = r(14);
        var w = b(x);
        function b(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var T = function e(t) {
            if (t.children) {
                t.children.forEach(function(r, n) {
                    if (!r.$id) {
                        t.children[n] = new F(r);
                    }
                    if (t.$id && !t.$dom) {
                        t.children[n].$canvas = t.$canvas;
                        t.children[n].$parent = t;
                    } else {
                        t.children[n].$canvas = t;
                    }
                    e(t.children[n]);
                });
            }
        };
        var k = function e(t) {
            var r = t || {};
            if (!r.$id) {
                r.$id = Math.random().toString(36).substr(2);
            }
            r.$tickedTimes = r.$tickedTimes || 0;
            r.content = r.content || {};
            r.style = r.style || {};
            r.style.zIndex = r.style.zIndex || 0;
            r.style.mirrX = r.style.mirrX || 0;
            r.style.opacity = i.default.firstValuable(r.style.opacity, 1);
            r.style.locate = r.style.locate || "center";
            r.style.scale = r.style.scale || 1;
            var n = i.default.funcOrValue(r.content.img);
            o.default.xywh.forEach(function(e) {
                r.style[e] = r.style[e] || 0;
            });
            r.inherit = r.inherit;
            r.drag = r.drag || {};
            r.events = r.events || {};
            if (true) {
                for (var a in r.events) {
                    if (typeof r.events[a] !== "function" && a !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + a + " is not a function.", r.events[a]);
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
                    var s = r.content.img.src.match(/.*\/([^\/]*)$/);
                    if (s && s[1]) {
                        r.name = s[1];
                    }
                }
                r.name = r.name || "Unnamed Easycanvas Object";
            }
            r.children = r.children || [];
            T(r);
            return r;
        };
        var A = function e(t) {
            var r = this;
            this.$extendList.forEach(function(e) {
                e.call(r, t);
            });
        };
        var F = function e(t) {
            var r = k(t);
            for (var n in r) {
                if (Object.prototype.hasOwnProperty.call(r, n)) {
                    this[n] = r[n];
                }
            }
            A.call(this, r);
            return this;
        };
        F.prototype.$extendList = [];
        F.prototype.add = function(e) {
            if (!e) {
                return;
            }
            this.children.push(e);
            T(this);
            return this.children[this.children.length - 1];
        };
        F.prototype.getRect = function() {
            var e = this;
            var t = {};
            o.default.txywh.forEach(function(r) {
                t[r] = e.getStyle(r);
            });
            if (t.tw === 0 && this.content.img) {
                var r = i.default.funcOrValue(this.content.img, this);
                t.tw = r.width;
                t.th = r.height;
            }
            var n = this.getStyle("locate");
            if (n === "lt") {} else if (n === "ld") {
                t.ty -= t.th;
            } else if (n === "rt") {
                t.tx -= t.tw;
            } else if (n === "rd") {
                t.tx -= t.tw;
                t.ty -= t.th;
            } else {
                t.tx -= t.tw >> 1;
                t.ty -= t.th >> 1;
            }
            return t;
        };
        F.prototype.getSelfStyle = function(e) {
            var t = {};
            if (e) {
                return i.default.funcOrValue(this.style[e], this);
            }
            for (var r in this.style) {
                t[r] = i.default.funcOrValue(this.style[r], this);
            }
            return t;
        };
        F.prototype.getStyle = function(e) {
            var t = this;
            var r = i.default.funcOrValue(t.style[e], t);
            if (t.$parent) {
                var n = void 0;
                if (t.inherit) {
                    n = t.inherit.indexOf(e) >= 0;
                } else {
                    n = e === "tx" || e === "ty" || e === "scale" || e === "opacity";
                }
                if (n) {
                    if (e === "tw" || e === "th") {
                        return i.default.firstValuable(r, t.$parent.getStyle(e));
                    } else if (e === "opacity" || e === "scale") {
                        return i.default.firstValuable(t.$parent.getStyle(e), 1) * i.default.firstValuable(r, 1);
                    } else {
                        return i.default.firstValuable(t.$parent.getStyle(e), 0) + i.default.firstValuable(r, 0);
                    }
                }
            }
            return r;
        };
        F.prototype.remove = function(e) {
            if (e) {
                this.$canvas.remove(e);
                i.default.execFuncs(e.hooks.removed, e);
                return;
            }
            if (this.$parent) {
                this.$parent.remove(this);
            } else {
                this.$canvas.remove(this);
            }
            i.default.execFuncs(this.hooks.removed, this);
        };
        F.prototype.update = function(e) {
            if (!e) return;
            for (var t in e) {
                if (n(e[t]) === "object") {
                    for (var r in e[t]) {
                        this[t][r] = e[t][r];
                    }
                } else {
                    this[t] = e[t];
                }
            }
        };
        F.prototype.nextTick = p.default;
        F.prototype.on = l.default;
        F.prototype.off = c.default;
        F.prototype.clear = v.default;
        F.prototype.trigger = y.default;
        F.prototype.broadcast = $.default;
        e.exports = F;
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = false;
        var o = function e(t, r) {
            t.drag.draggingFlag = r;
            s = r;
        };
        var f = function e(t, r, n, a) {
            return t ? t.call(r, n) : a ? "drag" : false;
        };
        var l = typeof wx !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        e.exports = {
            bind: function e(t) {
                var r = {
                    x: 0,
                    y: 0
                };
                t.drag = t.drag || {};
                t.drag.draggingFlag = false;
                var n = t.events.mousedown || t.events.touchstart;
                t.events[l ? "touchstart" : "mousedown"] = function(e) {
                    if (t.drag.dragable) {
                        o(t, true);
                        var a = e.canvasX - this.getStyle("tx");
                        var i = e.canvasY - this.getStyle("ty");
                        r.x = e.canvasX;
                        r.y = e.canvasY;
                    }
                    return f(n, t, e, t.drag.dragable);
                }.bind(t);
                var a = t.events.mousemove || t.events.touchmove;
                t.events[l ? "touchmove" : "mousemove"] = function(e) {
                    var n = t.drag.draggingFlag && t.drag.dragable;
                    if (n) {
                        this.style.tx += e.canvasX - r.x;
                        this.style.ty += e.canvasY - r.y;
                        this.$canvas.$flags.dragging = this;
                        r.x = e.canvasX;
                        r.y = e.canvasY;
                    }
                    return f(a, t, e, n);
                }.bind(t);
                var i = t.events.mouseup || t.events.touchend;
                t.events[l ? "touchend" : "mouseup"] = function(e) {
                    var r = t.drag.draggingFlag && t.drag.dragable;
                    this.$canvas.$flags.dragging = undefined;
                    if (t.drag.draggingFlag && t.drag.dragable) {
                        o(t, false);
                    }
                    return f(i, t, e, r);
                };
                var s = t.events.mouseout;
                t.events.mouseout = function(e) {
                    var r = t.drag.draggingFlag && t.drag.dragable;
                    o(t, false);
                    return f(s, t, e, r);
                };
                var u = t.events.click;
                t.events.click = function(e) {
                    var r = t.drag.dragable;
                    if (r) {
                        var n = e.canvasX - t.getStyle("tx");
                        var a = e.canvasY - t.getStyle("ty");
                        return u ? u.call(t, e) : true;
                    }
                    return f(u, t, e, r);
                };
            }
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            if (this.hooks[t]) {
                a.default.execFuncs(this.hooks[t], this, e);
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
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            if (!this.hooks[e]) return;
            if (this.hooks[e] === t || !t) {
                delete this.hooks[e];
            } else if (a.default.isArray(this.hooks[e])) {
                this.hooks[e][this.hooks[e].indexOf(t)] = undefined;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            var n = t;
            if (r) {
                var i = this;
                n = function e() {
                    var a = Date.now();
                    if (a > n.$lastTriggerTime + r) {
                        n.$lastTriggerTime = a;
                        var s = Array.prototype.slice.call(arguments);
                        t.apply(i, s);
                    }
                };
                n.$lastTriggerTime = -1;
            }
            if (!this.hooks[e]) {
                this.hooks[e] = n;
            } else if (a.default.isArray(this.hooks[e])) {
                this.hooks[e].push(n);
            } else {
                this.hooks[e] = [ this.hooks[e], n ];
            }
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            if (this.hooks[t]) {
                return a.default.execFuncs(this.hooks[t], this, e);
            }
        };
    }, , , , , , , , function(e, t) {
        "use strict";
        var r = function e(t) {
            setTimeout(t, 1e3 / 60);
        };
        var n = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || r : r;
        e.exports = n;
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = 3.141593;
        var i = function e(t) {
            return t.$lastPaintTime || Date.now();
        };
        var s = {
            linear: function e(t, r, n) {
                var a = i(this);
                var s = false;
                var o = void 0;
                var f = function() {
                    var e = this.$lastPaintTime;
                    var i = (e - a) / n;
                    var l = (r - t) * i + t;
                    if (s) {
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
                    if (i >= 1 && o) {
                        o.call(this, l);
                        o = null;
                    }
                    return l;
                }.bind(this);
                f.loop = function() {
                    s = true;
                    return f;
                };
                f.restart = function() {
                    a = i(this);
                    return f;
                };
                f.then = function(e) {
                    o = e;
                    return f;
                };
                return f;
            },
            pendulum: function e(t, r, n, s) {
                var o = i(this);
                var f = s || {};
                f.start = f.start || 0;
                var l = false;
                var u = void 0;
                var c = f.cycle || 1;
                var d = function() {
                    var e = i(this);
                    var s = (e - o) / n;
                    if (!l) {
                        if (c) {
                            if (s > c) {
                                s = c;
                                d.$done = true;
                                s = c;
                            }
                        } else if (s > 1) {
                            d.$done = true;
                            s = 1;
                        }
                    } else {
                        if (c) {
                            s %= c;
                        }
                    }
                    var v = s * a * 2 - a / 2 + f.start / 360 * a;
                    var h = (r - t) * (Math.sin(v) + 1) / 2 + t;
                    if (s >= c && u) {
                        u.call(this, h);
                        u = null;
                    }
                    return h;
                }.bind(this);
                d.loop = function() {
                    l = true;
                    return d;
                };
                d.restart = function() {
                    o = i(this);
                    return d;
                };
                d.then = function(e) {
                    u = e;
                    return d;
                };
                return d;
            },
            ease: function e(t, r, n) {
                return this.pendulum(t, r, n * 2, {
                    cycle: .5
                });
            },
            oneByOne: function e(t) {
                var r = t;
                var n = false;
                var a = function e() {
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
        var o = function e(t, r, a, i, o) {
            var f = (0, n.funcOrValue)(t[r]);
            if (true) {
                if (typeof f === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            f = f || 0;
            t[r] = s[a].bind(e)(f, i, o);
        };
        for (var f in s) {
            o[f] = s[f];
        }
        e.exports = o;
    }, function(e, t, r) {
        "use strict";
        var n = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) {
                    if (Object.prototype.hasOwnProperty.call(r, n)) {
                        e[n] = r[n];
                    }
                }
            }
            return e;
        };
        var a = r(3);
        var i = f(a);
        var s = r(1);
        var o = f(s);
        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        if (true) {
            if (!window[i.default.devFlag]) {
                var l = window[i.default.devFlag] = {
                    isPaintRecording: false,
                    selectMode: false,
                    current: {},
                    version: i.default.version,
                    $canvas: {},
                    $plugin: null
                };
                var u = {
                    getSprite: function e(t) {
                        if (!l.isPaintRecording) return [];
                        var r = {};
                        if (t) {
                            var a = l.$canvas[t].children;
                            var s = l.$canvas[t].$children;
                            var f = function e(t) {
                                if (t.name === i.default.devFlag) return;
                                r[t.$id] = {
                                    name: t.name,
                                    parent: t.$parent && t.$parent.$id,
                                    style: {},
                                    children: t.children.filter(function(e) {
                                        return e.name !== i.default.devFlag;
                                    }).map(function(e) {
                                        return e.$id;
                                    }),
                                    rendered: t.$rendered
                                };
                                for (var n in t.style) {
                                    r[t.$id].style[n] = o.default.funcOrValue(t.style[n], t);
                                }
                                i.default.xywh.forEach(function(e) {
                                    r[t.$id].style[e] = Math.round(r[t.$id].style[e]);
                                });
                                [ "physics", "$perf" ].forEach(function(e) {
                                    r[t.$id][e] = t[e];
                                });
                                if (t.webgl) {
                                    r[t.$id].webgl = {};
                                    [ "rx", "ry", "rz", "tx", "ty", "tz" ].forEach(function(e) {
                                        r[t.$id].webgl[e] = o.default.funcOrValue(t.webgl[e], t);
                                    });
                                }
                                if (t.children) {
                                    t.children.forEach(e);
                                }
                            };
                            a.forEach(f);
                        } else {
                            for (var u in l.$canvas) {
                                r = n(r, l.$plugin.getSprite(u));
                            }
                        }
                        return r;
                    },
                    selectSpriteById: function e(t, r) {
                        if (!r) {
                            for (var n in l.$canvas) {
                                var a = u.selectSpriteById(t, n);
                                if (a) {
                                    return {
                                        $sprite: a.$sprite || a,
                                        $canvas: l.$canvas[n]
                                    };
                                }
                            }
                            return false;
                        }
                        var i = function e(n) {
                            for (var a = 0; a < n.length; a++) {
                                if (n[a].$id === t) return n[a];
                                var i = e(n[a].children);
                                if (i) {
                                    return {
                                        $sprite: i.$sprite || i,
                                        $canvas: l.$canvas[r]
                                    };
                                }
                            }
                            return false;
                        };
                        var s = l.$canvas[r].children;
                        var o = i(s);
                        if (o) {
                            return {
                                $sprite: o.$sprite || o,
                                $canvas: l.$canvas[r]
                            };
                        }
                    },
                    updateSprite: function e(t) {
                        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "style";
                        var a = arguments[2];
                        var i = arguments[3];
                        var s = u.selectSpriteById(t, i).$sprite;
                        if (!s) console.warn("Sprite " + spriteId + " Not Found.");
                        n(s[r], a);
                    },
                    highlightSprite: function e(t, r, n) {
                        l.selectMode = Boolean(r);
                        var a = u.selectSpriteById(t, n);
                        var i = a.$sprite;
                        var s = a.$canvas;
                        if (r && s && i) {
                            s.$plugin.selectSprite(false, s, i);
                        } else if (s) {
                            s.$plugin.cancelSelectSprite(s);
                        }
                    },
                    sendGlobalHook: function e(t, r) {
                        var n = u.selectSpriteById(t, r);
                        var a = n.$sprite;
                        var i = n.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + a.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = a;
                        window.$1 = i;
                    },
                    pause: function e(t, r) {
                        var n = l.$canvas[t];
                        n.$pausing = typeof r !== "undefined" ? r : !n.$pausing;
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
    }, , function(e, t, r) {
        "use strict";
        var n = r(3);
        var a = A(n);
        var i = r(54);
        var s = A(i);
        var o = r(28);
        var f = A(o);
        var l = r(96);
        var u = A(l);
        var c = r(1);
        var d = A(c);
        var v = r(29);
        var h = A(v);
        var p = r(10);
        var g = A(p);
        var y = r(95);
        var m = A(y);
        var $ = r(97);
        var x = A($);
        var w = r(13);
        var b = A(w);
        var T = r(30);
        var k = A(T);
        function A(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var F = {
            painter: s.default,
            imgLoader: g.default,
            imgPretreat: m.default,
            multlineText: x.default,
            transition: h.default,
            tick: f.default,
            utils: d.default,
            mirror: u.default,
            class: {
                sprite: b.default
            },
            sprite: b.default,
            $version: a.default.version,
            env: "develop"
        };
        F.extend = function(e) {
            var t = F.sprite.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            t.push(e);
        };
        F.use = function(e) {
            var t = F.painter.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            if (e.onUse) {
                e.onUse(F);
            }
            t.push(e);
        };
        F.component = function(e, t) {
            e(F, t);
        };
        var S = typeof window !== "undefined";
        if (S) {
            if (window.Easycanvas) {
                console.warn("[Easycanvas] already loaded, it should be loaded only once.");
            } else {
                if (true) {
                    setTimeout(function() {
                        console.log("%c Easycanvas %c You are using the develop version " + a.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                    }, 500);
                }
                if (true) {
                    window.Easycanvas = F;
                }
            }
        }
        e.exports = F;
    }, , , , function(e, t, r) {
        "use strict";
        var n = r(41);
        var a = p(n);
        var i = r(43);
        var s = p(i);
        var o = r(37);
        var f = p(o);
        var l = r(14);
        var u = p(l);
        var c = r(42);
        var d = p(c);
        var v = r(53);
        var h = p(v);
        function p(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var g = {
            $render: s.default,
            $eventHandler: f.default,
            $perPaint: a.default,
            $bindDrag: u.default,
            $rAFer: d.default
        };
        if (true) {
            g.$plugin = (0, h.default)();
        }
        e.exports = g;
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = o(n);
        var i = r(3);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = function e(t) {
            return t.sort(function(e, t) {
                if (true) {
                    if (window[s.default.devFlag] && window[s.default.devFlag].selectMode) {
                        return a.default.funcOrValue(e.style.zIndex, e) < a.default.funcOrValue(t.style.zIndex, t) ? 1 : -1;
                    }
                }
                return a.default.funcOrValue(a.default.firstValuable(e.events.eIndex, e.style.zIndex), e) < a.default.funcOrValue(a.default.firstValuable(t.events.eIndex, t.style.zIndex), t) ? 1 : -1;
            });
        };
        var l = function e(t) {
            if (t.$parent && !e(t.$parent)) {
                return false;
            }
            return a.default.funcOrValue(t.style.visible, t) !== false;
        };
        var u = function e(t, r) {
            if (l(t) === false) {
                return false;
            }
            var n = t.getRect();
            return a.default.pointInRect(r.canvasX, r.canvasY, n.tx, n.tx + n.tw, n.ty, n.ty + n.th);
        };
        var c = function e(t, r, n) {
            if (!t || !t.length) return;
            var i = t.length;
            for (var o = 0; o < i; o++) {
                var l = t[o];
                if (u(l, r)) {
                    if (l.events.interceptor) {
                        var c = a.default.firstValuable(l.events.interceptor.call(l, r), r);
                        if (!c || c.$stopPropagation) continue;
                    }
                }
                if (l.children.length) {
                    e(f(l.children.filter(function(e) {
                        if (true) {
                            if (window[s.default.devFlag] && window[s.default.devFlag].selectMode) {
                                return a.default.funcOrValue(e.style.zIndex, e) >= 0;
                            }
                        }
                        return a.default.funcOrValue(a.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0;
                    })), r, n);
                }
                if (u(l, r)) {
                    n.push(l);
                }
                if (l.children.length) {
                    e(f(l.children.filter(function(e) {
                        if (true) {
                            if (window[s.default.devFlag] && window[s.default.devFlag].selectMode) {
                                return a.default.funcOrValue(e.style.zIndex, e) < 0;
                            }
                        }
                        return !(a.default.funcOrValue(a.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0);
                    })), r, n);
                }
            }
        };
        var d = function e(t, r) {
            var n = this;
            this.$extendList.forEach(function(e) {
                if (e.onEvent) {
                    e.onEvent.call(n, t, r);
                }
            });
        };
        e.exports = function(e) {
            var t = this;
            if (!e.layerX && e.targetTouches && e.targetTouches[0]) {
                e.layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
                e.layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
            }
            if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
                e.layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
                e.layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
            }
            var r = false;
            var n = 1;
            var i = 1;
            if (this.$dom.getBoundingClientRect) {
                this.$dom.getBoundingClientRect().width > this.$dom.getBoundingClientRect().height !== this.width > this.height;
                n = Math.floor(this.$dom.getBoundingClientRect()[r ? "height" : "width"]) / this.width;
                i = Math.floor(this.$dom.getBoundingClientRect()[r ? "width" : "height"]) / this.height;
            }
            var o = {
                type: e.type,
                canvasX: e.layerX / n,
                canvasY: e.layerY / i,
                event: e
            };
            if (t.events.interceptor) {
                o = a.default.firstValuable(t.events.interceptor.call(t, o), o);
                if (!o || o.$stopPropagation) return;
            }
            var l = [];
            if (t.$flags.dragging && t.$flags.dragging.$id) {
                l.push(t.$flags.dragging);
            }
            c(f(t.children), o, l);
            d.call(t, o, l);
            if (true) {
                if (window[s.default.devFlag] && window[s.default.devFlag].selectMode && l.length) {
                    var u = l[0];
                    if (u.name === s.default.devFlag) {
                        u = l[1];
                    }
                    if (u && t.$plugin.selectSprite(e.type === "click" || e.type === "touchend", t, u)) {
                        return;
                    }
                }
            }
            if (!t.eHoldingFlag && (o.type === "mousedown" || o.type === "touchstart")) {
                t.eHoldingFlag = e;
            } else if (t.eHoldingFlag && (o.type === "mouseup" || o.type === "touchend")) {
                t.eHoldingFlag = false;
            } else if (t.eHoldingFlag && (o.type === "mousemove" || o.type === "touchmove")) {
                t.eHoldingFlag = e;
            }
            for (var v = 0; v < l.length; v++) {
                if ((o.type === "mousemove" || o.type === "touchmove") && t.eLastMouseHover && t.eLastMouseHover !== l[v] && l.indexOf(t.eLastMouseHover) === -1) {
                    var h = t.eLastMouseHover["events"]["mouseout"] || t.eLastMouseHover["events"]["touchout"];
                    if (h) {
                        h.call(t.eLastMouseHover, o);
                    }
                }
                if (!l[v]["events"]) continue;
                var p = l[v]["events"][o.type];
                if (p) {
                    t.eLastMouseHover = l[v];
                    var g = p.call(l[v], o);
                    if (g === true) {
                        t.eHoldingFlag = false;
                        return g;
                    } else if (g === "drag") {
                        t.eHoldingFlag = false;
                        return g;
                    }
                }
                if (l[v].events.through === false) {
                    return;
                }
            }
            if (!l.length && t.eLastMouseHover) {
                var y = t.eLastMouseHover["events"]["mouseout"];
                if (y) {
                    y.call(t.eLastMouseHover, o);
                }
                t.eLastMouseHover = null;
            }
            var m = t.events[o.type];
            if (m) {
                if (m.call(t, o)) {
                    t.eHoldingFlag = false;
                    return true;
                }
            }
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t, r, n) {
            if (t.sx < 0 && t.sw) {
                var a = -t.sx / t.sw;
                t.tx += t.tw * a;
                t.sx = 0;
            }
            if (t.sy < 0 && t.sh) {
                var i = -t.sy / t.sh;
                t.ty += t.th * i;
                t.sy = 0;
            }
            if (r && t.sx + t.sw > r) {
                var s = (t.sx + t.sw - r) / t.sw;
                t.sw -= t.sw * s;
                t.tw -= t.tw * s;
            }
            if (n && t.sy + t.sh > n) {
                var o = (t.sy + t.sh - n) / t.sh;
                t.sh -= t.sh * o;
                t.th -= t.th * o;
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
            if (t.tx + t.tw > e.width && t.tw) {
                var u = (t.tx + t.tw - e.width) / t.tw;
                t.tw -= t.tw * u;
                t.sw -= t.sw * u;
            }
            if (t.ty + t.th > e.height && t.th) {
                var c = (t.ty + t.th - e.height) / t.th;
                t.th -= t.th * c;
                t.sh -= t.sh * c;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            if (t) {
                t.filter(function(e) {
                    var t = a.default.funcOrValue(e.style.zIndex, e);
                    if (r < 0) {
                        return t < 0;
                    }
                    return t >= 0;
                }).sort(function(e, t) {
                    var r = a.default.funcOrValue(e.style.zIndex, e);
                    var n = a.default.funcOrValue(t.style.zIndex, t);
                    if (r === n) return 0;
                    return r > n ? 1 : -1;
                }).forEach(function(t, r) {
                    e.$perPaint.call(e, t, r);
                });
            }
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = o(n);
        var i = r(3);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = [ "tx", "ty", "scale", "opacity" ];
        e.exports = function(e, t) {
            var r = {};
            for (var n in e.content) {
                r[n] = a.default.funcOrValue(e.content[n], e);
            }
            if (typeof r.img === "string") {
                r.img = e.content.img = t.imgLoader(r.img);
            }
            for (var i in e.style) {
                r[i] = e.getStyle(i);
            }
            if (e.inherit) {
                e.inherit.forEach(function(t) {
                    r[t] = e.getStyle(t);
                });
            } else {
                f.forEach(function(t) {
                    if (typeof r[t] === "undefined") {
                        r[t] = e.getStyle(t);
                    }
                });
            }
            if (r.sequence) {
                var s = r.img;
                var o = r.sequence;
                r.sequence.index = r.sequence.index || 0;
                var l = r.sequence.index || 0;
                if (l < 0) l = 0;
                var u = void 0, c = void 0;
                if (o.w || o.h) {
                    if (o.w < 0) {
                        u = s.width / (0 - o.w);
                    } else if (o.w > 0) {
                        u = o.w;
                    } else {
                        u = s.width;
                    }
                    if (o.h < 0) {
                        c = s.height / (0 - o.h);
                    } else if (o.h > 0) {
                        c = o.h;
                    } else {
                        c = s.height;
                    }
                    var d = Math.floor(s.width / u);
                    var v = Math.floor(s.height / c);
                    r.sx = l % d * u;
                    r.sy = Math.floor(l / d) % v * c;
                }
                if (!o.loop && l > 0 && r.sx === 0 && r.sy === 0) {
                    r.img = undefined;
                    if (o.onOver) {
                        o.onOver.call(e);
                    } else {
                        e.remove();
                    }
                }
                r.sequence.lastTickTime = r.sequence.lastTickTime || 0;
                if (t.$nextTickTime - r.sequence.lastTickTime >= a.default.funcOrValue(r.sequence.interval, e)) {
                    o.lastTickTime = t.$nextTickTime;
                    r.sequence.index++;
                    r.sequence.lastTickTime = t.$nextTickTime;
                }
                r.sw = r.sw || u;
                r.sh = r.sh || c;
                r.tw = r.tw || u;
                r.th = r.th || c;
            }
            return r;
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = y(n);
        var i = r(6);
        var s = y(i);
        var o = r(3);
        var f = y(o);
        var l = r(40);
        var u = y(l);
        var c = r(38);
        var d = y(c);
        var v = r(39);
        var h = y(v);
        var p = r(12);
        var g = y(p);
        function y(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var m = a.default.blend;
        var $ = function e(t) {
            var r = /[^\u4e00-\u9fa5]/;
            return !r.test(t);
        };
        var x = function e() {
            var t = this;
            this.$canvas.$extendList.forEach(function(e) {
                if (e.onPaint) {
                    e.onPaint.call(t);
                }
            });
        };
        e.exports = function(e, t) {
            e.$rendered = false;
            if (a.default.funcOrValue(e.style.visible, e) === false) {
                a.default.execFuncs(e.hooks.beforeTick, e, e.$tickedTimes);
                a.default.execFuncs(e.hooks.ticked, e, ++e.$tickedTimes);
                return;
            }
            a.default.execFuncs(e.hooks.beforeTick, e, e.$tickedTimes);
            var r = this;
            x.call(e);
            var n = (0, u.default)(e, r);
            var i = {
                globalAlpha: a.default.firstValuable(n.opacity, 1)
            };
            var s = n.text;
            var o = n.img;
            var l = a.default.funcOrValue(e.children, e);
            var c = o ? o.width || 0 : 0;
            var v = o ? o.height || 0 : 0;
            n.tw = n.tw || n.sw || c;
            n.th = n.th || n.sh || v;
            n.sw = n.sw || c;
            n.sh = n.sh || v;
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
                i.transform = {
                    fh: n.fh,
                    fv: n.fv,
                    fx: -(n.ty + (n.th >> 1)) * n.fv + n.fx,
                    fy: -(n.tx + (n.tw >> 1)) * n.fh + n.fy
                };
            }
            if (n.blend) {
                if (typeof n.blend === "string") {
                    i.globalCompositeOperation = n.blend;
                } else {
                    i.globalCompositeOperation = m[n.blend];
                }
            }
            if (n.rotate) {
                var p = a.default.firstValuable(n.rx, n.tx + .5 * n.tw);
                var y = a.default.firstValuable(n.ry, n.ty + .5 * n.th);
                i.beforeRotate = [ p, y ];
                i.rotate = -n.rotate * Math.PI / 180;
                i.rotate = Number(i.rotate.toFixed(4));
                i.afterRotate = [ -p, -y ];
            }
            if (n.backgroundColor) {
                i.fillRect = n.backgroundColor;
            }
            if (n.scale !== 1) {
                var w = n.scale;
                n.tx -= (w - 1) * n.tw >> 1;
                n.ty -= (w - 1) * n.th >> 1;
                n.tw *= w;
                n.th *= w;
            }
            if (n.mirrX) {
                i.translate = [ r.width, 0 ];
                i.scale = [ -1, 1 ];
                n.tx = r.width - n.tx - n.tw;
                if (n.mirrY) {
                    i.translate = [ r.width, r.height ];
                    i.scale = [ -1, -1 ];
                    n.ty = r.height - n.ty - n.th;
                }
            } else if (n.mirrY) {
                i.translate = [ 0, r.height ];
                i.scale = [ 1, -1 ];
                n.ty = r.height - n.ty - n.th;
            }
            if (true) {
                if (c && v && n.sw && n.sh) {
                    var b = n.tw * n.th / (n.sw * n.sh);
                    if (!e.$perf.paintRate || b > e.$perf.paintRate) {
                        e.$perf.paintRate = b;
                    }
                }
            }
            if (!n.rotate && !s && c && o.src) {
                (0, d.default)(r, n, c, v);
            }
            if (c > 10 && v > 10) {
                f.default.xywh.forEach(function(e) {
                    n[e] = Math.round(n[e]);
                });
            }
            (0, h.default)(r, l, -1);
            if (i.fillRect) {
                var T = (0, g.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width, r.height, i.beforeRotate && i.beforeRotate[0], i.beforeRotate && i.beforeRotate[1], n.rotate);
                if (T) {
                    e.$rendered = true;
                    var k = {
                        $id: e.$id,
                        type: "context",
                        settings: i,
                        props: [ o, n.sx, n.sy, n.sw, n.sh, n.tx, n.ty, n.tw, n.th ]
                    };
                    k.$origin = e;
                    r.$children.push(k);
                }
            }
            if (o && c && n.opacity !== 0 && n.sw && n.sh) {
                var T = (0, g.default)(n.tx, n.ty, n.tw, n.th, 0, 0, r.width, r.height, i.beforeRotate && i.beforeRotate[0], i.beforeRotate && i.beforeRotate[1], n.rotate);
                if (T) {
                    e.$rendered = true;
                    var A = {
                        $id: e.$id,
                        type: "img",
                        settings: i,
                        props: [ o, n.sx, n.sy, n.sw, n.sh, n.tx, n.ty, n.tw, n.th ]
                    };
                    A.$origin = e;
                    r.$children.push(A);
                }
            }
            if (s) {
                e.$rendered = true;
                var F = n.tx;
                var S = n.ty;
                var M = n.align || n.textAlign || "left";
                var O = n.textFont || "14px Arial";
                var E = parseInt(O);
                var R = n.lineHeight || E;
                if (M === "center") {
                    F += n.tw / 2;
                } else if (M === "right") {
                    F += n.tw;
                }
                if (n.textVerticalAlign === "top") {
                    i.textBaseline = "top";
                } else if (n.textVerticalAlign === "bottom") {
                    i.textBaseline = "bottom";
                    S += n.th;
                } else if (n.textVerticalAlign === "middle") {
                    S += n.th >> 1;
                    i.textBaseline = "middle";
                }
                if (typeof s === "string" || typeof s === "number") {
                    if (S + E * 2 > 0 && S - E * 2 < r.height) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: i,
                            props: {
                                tx: F,
                                ty: S,
                                content: String(s),
                                align: M,
                                font: O,
                                color: n.color,
                                type: n.textType
                            }
                        });
                    }
                } else if (s.length) {
                    s.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: i,
                            props: {
                                tx: F + a.default.funcOrValue(t.tx, e),
                                ty: S + a.default.funcOrValue(t.ty, e),
                                content: a.default.funcOrValue(t.content, e),
                                align: M,
                                font: O,
                                color: n.color,
                                type: n.textType
                            }
                        });
                    });
                } else if (s.type === "multline-text") {
                    var _ = s.text.split(/\t|\n/);
                    var I = [];
                    _.forEach(function(e, t) {
                        e = String.prototype.trim.apply(e);
                        if (s.config.start) {
                            e = e.replace(s.config.start, "");
                        }
                        var r = 0;
                        var a = n.tw;
                        while (e.length && r < e.length) {
                            if (a <= 0) {
                                a = n.tw;
                                I.push(e.substr(0, r));
                                e = e.substr(r);
                                r = 0;
                            }
                            r++;
                            a -= E * ($(e[r]) ? 1.05 : .6);
                        }
                        if (e || t) {
                            I.push(e);
                        }
                    });
                    I.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: i,
                            props: {
                                tx: F,
                                ty: S,
                                content: t,
                                align: M,
                                font: O,
                                color: n.color,
                                type: n.textType
                            }
                        });
                        S += R || E;
                    });
                }
            }
            if (!o && !s) {
                e.$rendered = undefined;
            }
            (0, h.default)(r, l, 1);
            a.default.execFuncs(e.hooks.ticked, e, ++e.$tickedTimes);
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(28);
        var a = o(n);
        var i = r(29);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e) {
            var t = Date.now();
            s.default.$lastPaintTime = this.$nextTickTime = t;
            if (t - this.fpsCalculateTime >= 1e3) {
                this.fpsCalculateTime = t;
                if (this.fpsHandler) {
                    this.fpsHandler.call(this, this.fps);
                }
                this.lastFps = this.fps;
                this.fps = 0;
            }
            (0, a.default)(function(r) {
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
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = function e(t, r) {
            var n = this;
            var a = false;
            this.$extendList.forEach(function(e) {
                if (e.onRender) {
                    var i = e.onRender.call(n, t, r);
                    if (i) {
                        a = i;
                    }
                }
            });
            return a;
        };
        var o = function e(t, r) {
            var n = this;
            var i = t.props;
            var o = false;
            if (t.type === "img") {
                var f = i[7] * i[8];
                var l = n.$children;
                if (f > 200 * 200) {
                    for (var u = l.length - 1; u > r; u--) {
                        var c = l[u];
                        if (c.$cannotCover) {
                            continue;
                        }
                        var d = c.props;
                        if (!d || !d[0]) {
                            c.$cannotCover = true;
                            continue;
                        }
                        if (d[7] * d[8] < f) {
                            continue;
                        }
                        if (!d[0].$noAlpha) {
                            c.$cannotCover = true;
                            continue;
                        }
                        var v = c.settings;
                        if (v.globalAlpha !== 1 || v.globalCompositeOperation || v.rotate) {
                            c.$cannotCover = true;
                            continue;
                        }
                        if (a.default.pointInRect(i[5], i[6], d[5], d[5] + d[7], d[6], d[6] + d[8]) && a.default.pointInRect(i[5] + i[7], i[6] + i[8], d[5], d[5] + d[7], d[6], d[6] + d[8])) {
                            if (true) {
                                t.$origin.$useless = true;
                                n.$plugin.jumpRender(n, i);
                            }
                            o = true;
                            return;
                        }
                    }
                }
            }
            if (true) {
                if (t.$origin) {
                    t.$origin.$useless = false;
                }
            }
            var h = t.settings || {};
            if (s.call(n, t, h)) {
                return;
            }
            var p = false;
            var g = n.$paintContext;
            if (h.globalCompositeOperation) {
                if (!p) {
                    g.save();
                    p = true;
                }
                g.globalCompositeOperation = h.globalCompositeOperation;
            }
            if (h.globalAlpha !== 1 && !isNaN(h.globalAlpha)) {
                if (!p) {
                    g.save();
                    p = true;
                }
                g.globalAlpha = h.globalAlpha;
            }
            if (h.textBaseline) {
                if (!p) {
                    g.save();
                    p = true;
                }
                g.textBaseline = h.textBaseline;
            }
            if (h.translate) {
                if (!p) {
                    g.save();
                    p = true;
                }
                g.translate(h.translate[0] || 0, h.translate[1] || 0);
            }
            if (h.rotate) {
                if (!p) {
                    g.save();
                    p = true;
                }
                g.translate(h.beforeRotate[0] || 0, h.beforeRotate[1] || 0);
                g.rotate(h.rotate || 0);
                g.translate(h.afterRotate[0] || 0, h.afterRotate[1] || 0);
            }
            if (h.scale) {
                if (!p) {
                    g.save();
                    p = true;
                }
                g.scale(h.scale[0] || 1, h.scale[1] || 1);
            }
            if (h.transform) {
                if (!p) {
                    g.save();
                    p = true;
                }
                g.transform(1, h.transform.fh, h.transform.fv, 1, h.transform.fx, h.transform.fy);
            }
            if (t.type === "img") {
                g.drawImage(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]);
                if (true) {
                    n.$plugin.drawImage(n, i);
                }
            } else if (t.type === "text" && i.content) {
                g.font = i.font;
                g.fillStyle = g.strokeStyle = i.color || "white";
                g.textAlign = i.align;
                g[i.type || "fillText"](i.content, i.tx, i.ty);
            } else if (h.fillRect) {
                g.fillStyle = h.fillRect;
                g.fillRect(i[5], i[6], i[7], i[8]);
            }
            if (p) {
                g.restore();
            }
        };
        e.exports = function() {
            var e = this;
            e.$children.forEach(o.bind(e));
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(45);
        var a = R(n);
        var i = r(49);
        var s = R(i);
        var o = r(52);
        var f = R(o);
        var l = r(46);
        var u = R(l);
        var c = r(16);
        var d = R(c);
        var v = r(47);
        var h = R(v);
        var p = r(19);
        var g = R(p);
        var y = r(18);
        var m = R(y);
        var $ = r(20);
        var x = R($);
        var w = r(15);
        var b = R(w);
        var T = r(17);
        var k = R(T);
        var A = r(48);
        var F = R(A);
        var S = r(50);
        var M = R(S);
        var O = r(51);
        var E = R(O);
        function R(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var _ = {
            start: f.default,
            paint: u.default,
            add: a.default,
            remove: s.default,
            register: F.default,
            clear: d.default,
            setFpsHandler: M.default,
            setMaxFps: E.default,
            pause: h.default,
            on: g.default,
            off: m.default,
            trigger: x.default,
            broadcast: b.default,
            nextTick: k.default
        };
        e.exports = _;
    }, function(e, t, r) {
        "use strict";
        var n = r(13);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = a.default.prototype.add;
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var e = this;
            a.default.execFuncs(e.hooks.beforeTick, e, [ e.$rafTime ]);
            if (e.$paintContext.clearRect) {
                e.$paintContext.clearRect(0, 0, this.width, this.height);
            }
            if (!e.$freezing) {
                e.$children = [];
                if (true) {
                    e.$plugin.timeCollect(e, "preprocessTimeSpend", "START");
                }
                this.children.sort(function(e, t) {
                    var r = a.default.funcOrValue(e.style.zIndex, e);
                    var n = a.default.funcOrValue(t.style.zIndex, t);
                    if (r === n) return 0;
                    return r > n ? 1 : -1;
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
            a.default.execFuncs(e.hooks.ticked, e, [ e.$rafTime ]);
            if (e.hooks.nextTick) {
                a.default.execFuncs(e.hooks.nextTick, e, [ e.$rafTime ]);
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
        var n = function e(t) {
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
            var a = t || {};
            e = this.$dom = e || this.$dom;
            for (var i in a) {
                this[i] = a[i];
            }
            this.name = a.name || e.id || e.classList && e.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (a.fullScreen && typeof document !== "undefined") {
                e.width = e.style.width = document.body.clientWidth || document.documentElement.clientWidth;
                e.height = e.style.height = document.body.clientHeight || document.documentElement.clientHeight;
            }
            if (true) {
                if (a.width && e.attributes.width && a.width !== e.width || a.height && e.attributes.height && a.height !== e.height) {
                    console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
                }
            }
            e.width = this.width = this.width || a.width || e.width;
            e.height = this.height = this.height || a.height || e.height;
            if (true) {
                this.$plugin.register(this);
            }
            this.events = a.events || {};
            this.hooks = a.hooks || {};
            if (this.$inBrowser) {
                var s = [ "contextmenu", "mousewheel", "click", "dblclick", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove" ];
                s.forEach(function(t) {
                    e.addEventListener(t, r.$eventHandler.bind(r));
                });
            }
            if (true) {
                if (this.$paintContext) {
                    console.error("[Easycanvas] Current instance is already registered.");
                }
            }
            n.call(this, a);
            this.$paintContext = this.$paintContext || e.getContext("2d");
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = i(n);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r = this;
            a.default.execFuncs(e.hooks.beforeRemove, e, e.$tickedTimes++);
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
                    a.default.execFuncs(e.hooks.removed, e, e.$tickedTimes);
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
                    e.$eventHandler.call(e, {
                        layerX: t.layerX,
                        layerY: t.layerY,
                        screenX: t.screenX || t.layerX,
                        screenY: t.screenY || t.layerY,
                        type: "hold"
                    });
                }
            }, 40);
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1);
        var a = o(n);
        var i = r(3);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (true) {
                var e = "__EASYCANVAS_BRIDGE_TOPANEL__";
                var t = function t(r) {
                    r.tabId = window[s.default.devFlag].tabId;
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
                var n = null;
                var a = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
                var i = {
                    drawImage: function e(t, r) {
                        if (!window[s.default.devFlag].isPaintRecording) return;
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
                        a.forEach(function(e) {
                            t.$perf[e] = 0;
                            t.$perf["$" + e] = 0;
                        });
                        setInterval(function() {
                            a.forEach(function(e) {
                                t.$perf[e] = t.$perf["$" + e];
                                t.$perf["$" + e] = 0;
                            });
                        }, 1e3);
                        if (!t.$flags.devtoolHanged) {
                            window[s.default.devFlag].$canvas[t.$id] = t;
                            t.$flags.devtoolHanged = true;
                        }
                    },
                    timeCollect: function e(t, r, n) {
                        t.$perf["$" + r] += (n === "START" || n === "PAUSE" ? -1 : 1) * Date.now();
                    },
                    selectSprite: function e(a, o, f) {
                        window[s.default.devFlag].MaskCanvasBase64 = r;
                        if (!f || !window[s.default.devFlag].selectMode) {
                            i.cancelSelectSprite(o);
                            return false;
                        }
                        if (!n) {
                            n = o.add({
                                name: s.default.devFlag,
                                content: {
                                    img: o.imgLoader(r)
                                },
                                style: {},
                                webgl: undefined
                            });
                        }
                        [ "tx", "ty", "rotate", "rx", "ry", "scale", "tw", "th", "locate" ].forEach(function(e) {
                            (function(e) {
                                n.style[e] = function() {
                                    if (e === "tw" || e === "th") {
                                        return f.getStyle(e) || f.getRect()[e];
                                    }
                                    return f.getStyle(e);
                                };
                            })(e);
                        });
                        n.style.zIndex = Number.MAX_SAFE_INTEGER;
                        n.style.visible = function() {
                            return window[s.default.devFlag].selectMode;
                        };
                        n.style.opacity = .8;
                        n.webgl = f.webgl ? {} : undefined;
                        if (n.webgl) {
                            for (var l in f.webgl) {
                                (function(e) {
                                    n.webgl[e] = function() {
                                        if (typeof f.webgl[e] === "function") {
                                            return f.webgl[e].call(f);
                                        }
                                        return f.webgl[e];
                                    };
                                })(l);
                            }
                            n.webgl.img = o.imgLoader(r);
                            n.webgl.colors = false;
                            n.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (a) {
                            o.remove(n);
                            n = null;
                            t({
                                name: "selectSprite",
                                id: o.$id,
                                value: {
                                    sprite: f.$id,
                                    canvas: o.$id
                                }
                            });
                            window[s.default.devFlag].current = {
                                $sprite: f,
                                $canvas: o
                            };
                            window[s.default.devFlag].selectMode = false;
                        }
                        return true;
                    },
                    cancelSelectSprite: function e(t) {
                        if (!n) return;
                        t.remove(n);
                        n = null;
                    }
                };
                return i;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(44);
        var a = c(n);
        var i = r(36);
        var s = c(i);
        var o = r(55);
        var f = c(o);
        var l = r(10);
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
        for (var v in s.default) {
            if (Object.prototype.hasOwnProperty.call(s.default, v)) {
                d.prototype[v] = s.default[v];
            }
        }
        for (var h in a.default) {
            if (Object.prototype.hasOwnProperty.call(a.default, h)) {
                d.prototype[h] = a.default[h];
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
            $flags: {
                dragging: false
            }
        };
        e.exports = r;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var n = r(10);
        var a = o(n);
        var i = r(6);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r = undefined;
            (0, s.default)(e, function(e) {
                return (0, a.default)(e, function(e) {
                    var n = e.width, a = e.height;
                    var i = e.getContext("2d").getImageData(0, 0, n, a);
                    var s = i.data;
                    for (var o = s.length - 1; o >= 0; o -= 4) {
                        if (t && t.conversion) {
                            var f = t.conversion({
                                r: s[o - 3],
                                g: s[o - 2],
                                b: s[o - 1],
                                a: s[o]
                            }, (o + 1 >> 2) % n, Math.floor((o + 1 >> 2) / n));
                            s[o - 3] = f.r;
                            s[o - 2] = f.g;
                            s[o - 1] = f.b;
                            s[o - 0] = f.a;
                        }
                    }
                    e.getContext("2d").clearRect(0, 0, n, a);
                    e.getContext("2d").putImageData(i, 0, 0);
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
            var n = t.height;
            var a = document.createElement("canvas");
            a.width = r;
            a.height = n;
            var i = a.getContext("2d");
            i.scale(1, -1);
            i.translate(0, -n);
            i.drawImage(t, 0, 0);
            var s = i.getImageData(0, 0, r, n);
            return {
                canvas: i,
                img: s
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

