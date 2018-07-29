(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var a = r();
        for (var n in a) (typeof exports === "object" ? exports : t)[n] = a[n];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function r(a) {
            if (t[a]) return t[a].exports;
            var n = t[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            e[a].call(n.exports, n, n.exports, r);
            n.loaded = true;
            return n.exports;
        }
        r.m = e;
        r.c = t;
        r.p = "";
        return r(0);
    }([ function(e, t, r) {
        e.exports = r(26);
    }, function(e, t) {
        "use strict";
        var r = {
            isArray: Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            },
            funcOrValue: function e(t, r) {
                if (typeof t === "function") {
                    var a = t.call(r);
                    return a;
                }
                return t;
            },
            execFuncs: function e(t, a, n) {
                if (t) {
                    if (!r.isArray(n)) {
                        n = [ n ];
                    }
                }
                if (typeof t === "function") {
                    return t.apply(a, n);
                } else if (r.isArray(t)) {
                    var i = [];
                    t.forEach(function(e) {
                        i.push(e && e.apply(a, n));
                    });
                    return i;
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function e(t, r, a, n, i, s) {
                return !(t < a || t > n || r < i || r > s);
            },
            firstValuable: function e(t, r, a) {
                return typeof t === "undefined" ? typeof r === "undefined" ? a : r : t;
            }
        };
        e.exports = r;
    }, function(e, t) {
        "use strict";
        var r = 3.141593;
        e.exports = function(e, t, a, n, i, s) {
            var o = i ? -i / 180 * r : 0;
            var l = e, f = t;
            if (i) {
                l = (e - a) * Math.cos(o) - (t - n) * Math.sin(o) + a;
                f = (e - a) * Math.sin(o) + (t - n) * Math.cos(o) + n;
            }
            if (s) {
                return [ l, f ];
            }
            return {
                x: l,
                y: f
            };
        };
    }, function(e, t) {
        "use strict";
        e.exports = {
            xywh: [ "sx", "sy", "sw", "sh", "tx", "ty", "tw", "th" ],
            txywh: [ "tx", "ty", "tw", "th" ],
            sxywh: [ "sx", "sy", "sw", "sh" ],
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.5.7"
        };
    }, , function(e, t) {
        "use strict";
        var r = "processing";
        var a = {};
        function n(e, t) {
            if (e && e.match(/^data:/)) {
                t && t(e);
                return;
            }
            if (a[e]) {
                if (a[e] !== r) {
                    t(a[e]);
                } else {
                    setTimeout(function() {
                        n(e, t);
                    }, 100);
                }
                return;
            }
            a[e] = r;
            var i = new XMLHttpRequest();
            i.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
                    a[e] = r.result;
                    t && t(r.result);
                };
                r.readAsDataURL(i.response);
            };
            i.open("GET", e);
            i.responseType = "blob";
            i.send();
        }
        e.exports = n;
    }, , function(e, t, r) {
        "use strict";
        var a = r(2);
        var n = i(a);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = 3.141593;
        e.exports = function(e, t, r, a, n, i, o, l, f) {
            var u = f ? -f / 180 * s : 0;
            if (f) {
                e = (e - o) * Math.cos(f) - (t - l) * Math.sin(f) + o;
                t = (e - o) * Math.sin(f) + (t - l) * Math.cos(f) + l;
            }
            return e >= r && e <= r + n && t >= a && t <= a + i;
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(2);
        var n = o(a);
        var i = r(7);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r, a, n, i, o, l, f, u, c) {
            var d = (0, s.default)(e, t, n, i, o, l, f, u, c) || (0, s.default)(e + r, t, n, i, o, l, f, u, c) || (0, 
            s.default)(e, t + a, n, i, o, l, f, u, c) || (0, s.default)(e + r, t + a, n, i, o, l, f, u, c);
            if (d) return true;
            var v = (0, s.default)(n, i, e, t, r, a, f, u, -c) || (0, s.default)(n + o, i, e, t, r, a, f, u, -c) || (0, 
            s.default)(n, i + l, e, t, r, a, f, u, -c) || (0, s.default)(n + o, i + l, e, t, r, a, f, u, -c);
            if (v) return true;
            return false;
        };
    }, function(e, t) {
        "use strict";
        var r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60);
        };
        e.exports = r;
    }, function(e, t, r) {
        "use strict";
        var a = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = r(1);
        var i = x(n);
        var s = r(3);
        var o = x(s);
        var l = r(16);
        var f = x(l);
        var u = r(15);
        var c = x(u);
        var d = r(14);
        var v = x(d);
        var h = r(17);
        var p = x(h);
        var g = r(13);
        var y = x(g);
        var m = r(11);
        var $ = x(m);
        function x(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var w = function e(t) {
            if (t.children) {
                t.children.forEach(function(r, a) {
                    if (!r.$id) {
                        t.children[a] = new k(r);
                    }
                    if (t.$id && !t.$dom) {
                        t.children[a].$canvas = t.$canvas;
                        t.children[a].$parent = t;
                    } else {
                        t.children[a].$canvas = t;
                    }
                    e(t.children[a]);
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
            r.style.zIndex = r.style.zIndex || 0;
            r.style.mirrX = r.style.mirrX || 0;
            r.style.opacity = i.default.firstValuable(r.style.opacity, 1);
            r.style.locate = r.style.locate || "center";
            r.style.scale = r.style.scale || 1;
            var a = i.default.funcOrValue(r.content.img);
            o.default.xywh.forEach(function(e) {
                r.style[e] = r.style[e] || 0;
            });
            r.inherit = r.inherit || [ "tx", "ty", "scale", "opacity" ];
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
            r.scroll = r.scroll || {};
            r.scroll.scrollX = r.scroll.scrollX || 0;
            r.scroll.scrollY = r.scroll.scrollY || 0;
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
            w(r);
            r.$scroll = {
                speedX: 0,
                speedY: 0
            };
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
            for (var a in r) {
                if (Object.prototype.hasOwnProperty.call(r, a)) {
                    this[a] = r[a];
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
            $.default.bind(this.children[this.children.length - 1]);
            return this.children[this.children.length - 1];
        };
        k.prototype.getRect = function() {
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
            var a = this.getStyle("locate");
            if (a === "lt") {} else if (a === "ld") {
                t.ty -= t.th;
            } else if (a === "rt") {
                t.tx -= t.tw;
            } else if (a === "rd") {
                t.tx -= t.tw;
                t.ty -= t.th;
            } else {
                t.tx -= t.tw >> 1;
                t.ty -= t.th >> 1;
            }
            return t;
        };
        k.prototype.getSelfStyle = function(e) {
            var t = e.locate;
            var r = {};
            for (var a in this.style) {
                r[a] = i.default.funcOrValue(this.style[a], this);
            }
            return r;
        };
        k.prototype.getStyle = function(e) {
            var t = this;
            var r = i.default.funcOrValue(t.style[e], t);
            if (t.$parent && t.inherit.indexOf(e) >= 0) {
                if (e === "tx") {
                    r -= t.$parent.scroll.scrollX || 0;
                } else if (e === "ty") {
                    r -= t.$parent.scroll.scrollY || 0;
                }
                if (e === "tw" || e === "th") {
                    return i.default.firstValuable(r, t.$parent.getStyle(e));
                } else if (e === "opacity" || e === "scale") {
                    return i.default.firstValuable(t.$parent.getStyle(e), 1) * i.default.firstValuable(r, 1);
                } else {
                    return i.default.firstValuable(t.$parent.getStyle(e), 0) + i.default.firstValuable(r, 0);
                }
            }
            return r;
        };
        k.prototype.remove = function(e) {
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
        k.prototype.update = function(e) {
            if (!e) return;
            for (var t in e) {
                if (a(e[t]) === "object") {
                    for (var r in e[t]) {
                        this[t][r] = e[t][r];
                    }
                } else {
                    this[t] = e[t];
                }
            }
        };
        k.prototype.nextTick = v.default;
        k.prototype.on = f.default;
        k.prototype.off = c.default;
        k.prototype.trigger = p.default;
        k.prototype.broadcast = y.default;
        e.exports = k;
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = i(a);
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
        var l = function e(t, r, a, n) {
            return t ? t.call(r, a) : n ? "drag" : false;
        };
        var f = typeof wx !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        e.exports = {
            bind: function e(t) {
                var r = {
                    x: 0,
                    y: 0
                };
                t.drag = t.drag || {};
                t.drag.draggingFlag = false;
                var a = t.events.mousedown || t.events.touchstart;
                t.events[f ? "touchstart" : "mousedown"] = function(e) {
                    if (t.drag.dragable) {
                        o(t, true);
                        var n = e.canvasX - this.getStyle("tx");
                        var i = e.canvasY - this.getStyle("ty");
                        r.x = e.canvasX;
                        r.y = e.canvasY;
                    }
                    return l(a, t, e, t.drag.dragable);
                }.bind(t);
                var n = t.events.mousemove || t.events.touchmove;
                t.events[f ? "touchmove" : "mousemove"] = function(e) {
                    var a = t.drag.draggingFlag && t.drag.dragable;
                    if (a) {
                        this.style.tx += e.canvasX - r.x;
                        this.style.ty += e.canvasY - r.y;
                        this.$canvas.$flags.dragging = this;
                        r.x = e.canvasX;
                        r.y = e.canvasY;
                    }
                    return l(n, t, e, a);
                }.bind(t);
                var i = t.events.mouseup || t.events.touchend;
                t.events[f ? "touchend" : "mouseup"] = function(e) {
                    var r = t.drag.draggingFlag && t.drag.dragable;
                    this.$canvas.$flags.dragging = undefined;
                    if (t.drag.draggingFlag && t.drag.dragable) {
                        o(t, false);
                    }
                    return l(i, t, e, r);
                };
                var s = t.events.mouseout;
                t.events.mouseout = function(e) {
                    var r = t.drag.draggingFlag && t.drag.dragable;
                    o(t, false);
                    return l(s, t, e, r);
                };
                var u = t.events.click;
                t.events.click = function(e) {
                    var r = t.drag.dragable;
                    if (r) {
                        var a = e.canvasX - t.getStyle("tx");
                        var n = e.canvasY - t.getStyle("ty");
                        return u ? u.call(t, e) : true;
                    }
                    return l(u, t, e, r);
                };
            }
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = o(a);
        var i = r(9);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var l = {};
        var f = false;
        var u = [];
        var c = {
            stop: function e() {
                f = false;
            },
            tick: function e() {
                (0, s.default)(c.looper);
            },
            looper: function e() {
                u.forEach(function(e, t) {
                    var r = e.$scroll.speedX;
                    var a = e.$scroll.speedY;
                    if (Math.abs(e.$scroll.speedX) > 1) {
                        e.$scroll.speedX *= e.scroll.smooth || .8;
                    } else {
                        e.$scroll.speedX = 0;
                    }
                    if (Math.abs(e.$scroll.speedY) > 1) {
                        e.$scroll.speedY *= e.scroll.smooth || .8;
                    } else {
                        e.$scroll.speedY = 0;
                    }
                    if (Math.abs(e.$scroll.speedX) <= 1 && Math.abs(e.$scroll.speedY) <= 1) {
                        u.splice(t, 1);
                        return;
                    }
                    e.scroll.scrollY -= e.$scroll.speedY;
                    e.scroll.scrollX -= e.$scroll.speedX;
                    var i = n.default.funcOrValue(e.scroll.minScrollX, e);
                    var s = n.default.funcOrValue(e.scroll.maxScrollX, e);
                    var o = n.default.funcOrValue(e.scroll.minScrollY, e);
                    var l = n.default.funcOrValue(e.scroll.maxScrollY, e);
                    if (!isNaN(o) && e.scroll.scrollY < o) {
                        e.scroll.scrollY = o;
                    } else if (!isNaN(l) && e.scroll.scrollY > l) {
                        e.scroll.scrollY = l;
                    }
                    if (!isNaN(i) && e.scroll.scrollX < i) {
                        e.scroll.scrollX = i;
                    } else if (!isNaN(s) && e.scroll.scrollX > s) {
                        e.scroll.scrollX = s;
                    }
                });
                c.tick();
            },
            touch: function e(t, r) {
                if (!t.scroll.scrollable) return false;
                if (!f) {
                    f = +new Date();
                    l.x = r.canvasX;
                    l.y = r.canvasY;
                } else {
                    if (u.indexOf(t) === -1) {
                        u.push(t);
                    }
                    var a = Math.abs(r.canvasX - l.x);
                    var n = Math.abs(r.canvasY - l.y);
                    var i = +new Date() - f;
                    f = +new Date();
                    i /= 10;
                    if (a / i > 1 && i > 1) {
                        t.$scroll.speedX += (r.canvasX - l.x) / i;
                    }
                    if (n / i > 1 && i > 1) {
                        t.$scroll.speedY += (r.canvasY - l.y) / i;
                    }
                    l.x = r.canvasX;
                    l.y = r.canvasY;
                    r.event.preventDefault();
                    return true;
                }
            },
            wheel: function e(t, r) {
                if (!t.scroll.scrollable) return false;
                if (u.indexOf(t) === -1) {
                    u.push(t);
                }
                t.$scroll.speedX = r.event.wheelDeltaX;
                t.$scroll.speedY = r.event.wheelDeltaY;
                r.event.preventDefault();
                return true;
            }
        };
        e.exports = c;
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = i(a);
        function i(e) {
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
        e.exports = function(e) {
            var t = function t() {
                e.apply(this, arguments);
                this.off("ticked", t);
            };
            this.on("ticked", t);
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = i(a);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            if (!this.hooks[e]) return;
            if (this.hooks[e] === t || !t) {
                delete this.hooks[e];
            } else if (n.default.isArray(this.hooks[e])) {
                this.hooks[e][this.hooks[e].indexOf(t)] = undefined;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = i(a);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            var a = t;
            if (r) {
                var i = this;
                a = function e() {
                    var n = Date.now();
                    if (n > a.$lastTriggerTime + r) {
                        a.$lastTriggerTime = n;
                        var s = Array.prototype.slice.call(arguments);
                        t.apply(i, s);
                    }
                };
                a.$lastTriggerTime = -1;
            }
            if (!this.hooks[e]) {
                this.hooks[e] = a;
            } else if (n.default.isArray(this.hooks[e])) {
                this.hooks[e].push(a);
            } else {
                this.hooks[e] = [ this.hooks[e], a ];
            }
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = i(a);
        function i(e) {
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
    }, , , , , , function(e, t) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var a = {};
        var n = [];
        var i = "processing";
        var s = 0;
        var o = function e(t, i, o) {
            var l = o || {};
            var f = e.cacheCanvas;
            if ((typeof t === "undefined" ? "undefined" : r(t)) === "object") {
                var u = t;
                l.callbackArgs = l.callbackArgs || [];
                e(u.shift(), function(t) {
                    l.callbackArgs.push(t);
                    if (u.length > 1) {
                        e(u, i, l);
                    } else {
                        e(u[0], function(e) {
                            l.callbackArgs.push(e);
                            i(l.callbackArgs);
                        }, l);
                    }
                }, o);
                return;
            }
            var c = t + "_" + JSON.stringify(o) + "_" + f;
            if (a[c]) {
                if (i) {
                    i(a[c]);
                }
                return a[c];
            }
            var d = new Image();
            if (l.block) {
                d.src = t;
                s++;
            } else if (s === 0) {
                d.src = t;
            } else {
                n.push({
                    imgObj: d,
                    src: t
                });
            }
            a[c] = d;
            var v = void 0;
            if (l.canvas || l.alphaColor || f) {
                v = document.createElement("canvas");
                v.width = v.height || 0;
                a[c] = v;
            }
            d.onload = function() {
                if (d.src.substr(-3) === "jpg" || d.src.substr(-3) === "jpeg" || d.src.substr(-3) === "bmp") {
                    d.$noAlpha = true;
                } else if (d.src.indexOf("data:image/jpg;") === 0) {
                    d.$noAlpha = true;
                }
                if (l.block) {
                    s--;
                    if (s === 0) {
                        n.forEach(function(e) {
                            e.imgObj.src = e.src;
                        });
                        n.splice(0);
                    }
                }
                if (v && (l.canvas || l.alphaColor || f)) {
                    var e = v.getContext("2d");
                    v.width = d.width;
                    v.height = d.height;
                    v.$noAlpha = d.$noAlpha;
                    e.drawImage(d, 0, 0);
                    if (l.alphaColor) {
                        var t = e.getImageData(0, 0, d.width, d.height);
                        var r = [];
                        for (var a = 0; a < t.data.length; a += 4) {
                            var o = t.data[a] + t.data[a + 1] + t.data[a + 2];
                            var u = 1;
                            if (t.data[a] < u && t.data[a + 1] < u && t.data[a + 2] < u) {
                                t.data[a + 3] = Math.floor(o / 255);
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
                a[c] = d;
            };
            return v || d;
        };
        o.cacheCanvas = false;
        e.exports = o;
    }, function(e, t) {
        "use strict";
        var r = 3.141593;
        var a = function e(t) {
            return t / 1e3 * 60;
        };
        var n = function e(t) {
            return t.$lastPaintTime || Date.now();
        };
        var i = {
            linear: function e(t, r, a) {
                if (t === r) return t;
                var i = n(this);
                var s = false;
                var o = function() {
                    var e = this.$lastPaintTime;
                    var n = (r - t) * (e - i) / a + t;
                    if (s) {
                        if (r > t) {
                            while (n > r) {
                                n -= r - t;
                            }
                        } else {
                            while (n < r) {
                                n += t - r;
                            }
                        }
                    } else {
                        if (r > t && n > r) {
                            o.$done = true;
                            n = r;
                        } else if (r < t && n < r) {
                            o.$done = true;
                            n = r;
                        }
                    }
                    return n;
                }.bind(this);
                o.loop = function() {
                    s = true;
                    return o;
                };
                o.restart = function() {
                    i = n(this);
                };
                return o;
            },
            pendulum: function e(t, a, i, s) {
                if (t === a) return t;
                var o = n(this);
                var l = s || {};
                l.start = l.start || 0;
                var f = false;
                var u = function() {
                    var e = n(this);
                    var s = (e - o) / i;
                    if (!f) {
                        if (l.cycle) {
                            if (l.cycle < s) {
                                u.$done = true;
                                s = l.cycle;
                            }
                        } else if (s > 1) {
                            u.$done = true;
                            s = 1;
                        }
                    } else {
                        if (l.cycle) {
                            s %= l.cycle;
                        }
                    }
                    var c = s * r * 2 - r / 2 + l.start / 360 * r;
                    var d = (a - t) * (Math.sin(c) + 1) / 2 + t;
                    return d;
                }.bind(this);
                u.loop = function() {
                    f = true;
                    return u;
                };
                u.restart = function() {
                    o = n(this);
                };
                return u;
            },
            ease: function e(t, r, a) {
                return this.pendulum(t, r, a, {
                    cycle: .5
                });
            },
            oneByOne: function e(t) {
                var r = t;
                var a = false;
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
                    if (a) {
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
                    a = true;
                    return n;
                };
                return n;
            }
        };
        e.exports = i;
    }, function(e, t, r) {
        "use strict";
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var a in r) {
                    if (Object.prototype.hasOwnProperty.call(r, a)) {
                        e[a] = r[a];
                    }
                }
            }
            return e;
        };
        var n = r(3);
        var i = l(n);
        var s = r(1);
        var o = l(s);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
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
                    getSprite: function e(t) {
                        if (!f.isPaintRecording) return [];
                        var r = {};
                        if (t) {
                            var n = f.$canvas[t].children;
                            var s = f.$canvas[t].$children;
                            var l = function e(t) {
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
                                for (var a in t.style) {
                                    r[t.$id].style[a] = o.default.funcOrValue(t.style[a], t);
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
                            n.forEach(l);
                        } else {
                            for (var u in f.$canvas) {
                                r = a(r, f.$plugin.getSprite(u));
                            }
                        }
                        return r;
                    },
                    selectSpriteById: function e(t, r) {
                        if (!r) {
                            for (var a in f.$canvas) {
                                var n = u.selectSpriteById(t, a);
                                if (n) {
                                    return {
                                        $sprite: n.$sprite || n,
                                        $canvas: f.$canvas[a]
                                    };
                                }
                            }
                            return false;
                        }
                        var i = function e(a) {
                            for (var n = 0; n < a.length; n++) {
                                if (a[n].$id === t) return a[n];
                                var i = e(a[n].children);
                                if (i) {
                                    return {
                                        $sprite: i.$sprite || i,
                                        $canvas: f.$canvas[r]
                                    };
                                }
                            }
                            return false;
                        };
                        var s = f.$canvas[r].children;
                        var o = i(s);
                        if (o) {
                            return {
                                $sprite: o.$sprite || o,
                                $canvas: f.$canvas[r]
                            };
                        }
                    },
                    updateSprite: function e(t) {
                        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "style";
                        var n = arguments[2];
                        var i = arguments[3];
                        var s = u.selectSpriteById(t, i).$sprite;
                        if (!s) console.warn("Sprite " + spriteId + " Not Found.");
                        a(s[r], n);
                    },
                    highlightSprite: function e(t, r, a) {
                        f.selectMode = Boolean(r);
                        var n = u.selectSpriteById(t, a);
                        var i = n.$sprite;
                        var s = n.$canvas;
                        if (r && s && i) {
                            s.$plugin.selectSprite(false, s, i);
                        } else if (s) {
                            s.$plugin.cancelSelectSprite(s);
                        }
                    },
                    sendGlobalHook: function e(t, r) {
                        var a = u.selectSpriteById(t, r);
                        var n = a.$sprite;
                        var i = a.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + n.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = n;
                        window.$1 = i;
                    },
                    pause: function e(t, r) {
                        var a = f.$canvas[t];
                        a.$pausing = typeof r !== "undefined" ? r : !a.$pausing;
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
                        if (!f.isPaintRecording) return t;
                        for (var r in f.$canvas) {
                            t.canvas.push({
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
                        return t;
                    }
                };
                f.$plugin = u;
            }
        }
    }, function(e, t, r) {
        "use strict";
        var a = r(3);
        var n = A(a);
        var i = r(50);
        var s = A(i);
        var o = r(9);
        var l = A(o);
        var f = r(72);
        var u = A(f);
        var c = r(1);
        var d = A(c);
        var v = r(24);
        var h = A(v);
        var p = r(23);
        var g = A(p);
        var y = r(71);
        var m = A(y);
        var $ = r(73);
        var x = A($);
        var w = r(10);
        var b = A(w);
        var T = r(25);
        var k = A(T);
        function A(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var S = {
            painter: s.default,
            imgLoader: g.default,
            imgPretreat: m.default,
            multlineText: x.default,
            transition: h.default,
            tick: l.default,
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
            S.sprite.prototype.$extendList.push(e);
        };
        S.use = function(e) {
            if (e.onUse) {
                e.onUse(S);
            }
            S.painter.prototype.$extendList.push(e);
        };
        if (window.Easycanvas) {
            console.warn("[Easycanvas] already loaded.");
        } else {
            if (true) {
                setTimeout(function() {
                    console.log("%c Easycanvas %c You are using the develop version " + n.default.version + " %c", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                }, 500);
            }
            window.Easycanvas = S;
        }
        e.exports = S;
    }, , , , , function(e, t, r) {
        "use strict";
        var a = r(36);
        var n = p(a);
        var i = r(38);
        var s = p(i);
        var o = r(32);
        var l = p(o);
        var f = r(11);
        var u = p(f);
        var c = r(37);
        var d = p(c);
        var v = r(49);
        var h = p(v);
        function p(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var g = {
            $render: s.default,
            $eventHandler: l.default,
            $perPaint: n.default,
            $bindDrag: u.default,
            $rAFer: d.default
        };
        if (true) {
            g.$plugin = (0, h.default)();
        }
        e.exports = g;
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = f(a);
        var i = r(3);
        var s = f(i);
        var o = r(12);
        var l = f(o);
        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var u = function e(t) {
            return t.sort(function(e, t) {
                if (true) {
                    if (window[s.default.devFlag] && window[s.default.devFlag].selectMode) {
                        return n.default.funcOrValue(e.style.zIndex, e) < n.default.funcOrValue(t.style.zIndex, t) ? 1 : -1;
                    }
                }
                return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) < n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) ? 1 : -1;
            });
        };
        var c = function e(t) {
            if (t.$parent && !e(t.$parent)) {
                return false;
            }
            return n.default.funcOrValue(t.style.visible, t) !== false;
        };
        var d = function e(t, r) {
            if (c(t) === false) {
                return false;
            }
            var a = t.getRect();
            return n.default.pointInRect(r.canvasX, r.canvasY, a.tx, a.tx + a.tw, a.ty, a.ty + a.th);
        };
        var v = function e(t, r, a) {
            if (!t || !t.length) return;
            for (var i = 0; i < t.length; i++) {
                var o = t[i];
                if (o.children.length) {
                    e(u(o.children.filter(function(e) {
                        if (true) {
                            if (window[s.default.devFlag] && window[s.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) >= 0;
                            }
                        }
                        return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0;
                    })), r, a);
                }
                if (d(o, r)) {
                    a.push(o);
                }
                if (o.children.length) {
                    e(u(o.children.filter(function(e) {
                        if (true) {
                            if (window[s.default.devFlag] && window[s.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) < 0;
                            }
                        }
                        return !(n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0);
                    })), r, a);
                }
            }
        };
        e.exports = function(e) {
            var t = this;
            if (!e.layerX && e.touches && e.touches[0]) {
                e.layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
                e.layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
            }
            if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
                e.layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
                e.layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
            }
            var r = this.$dom.getBoundingClientRect().width > this.$dom.getBoundingClientRect().height !== this.width > this.height;
            var a = Math.floor(this.$dom.getBoundingClientRect()[r ? "height" : "width"]) / this.width;
            var n = Math.floor(this.$dom.getBoundingClientRect()[r ? "width" : "height"]) / this.height;
            a = a || 1;
            n = n || 1;
            var i = {
                type: e.type,
                canvasX: e.layerX / a,
                canvasY: e.layerY / n,
                event: e
            };
            if (t.events.interceptor) {
                i = t.events.interceptor(i);
            }
            var o = [];
            if (t.$flags.dragging && t.$flags.dragging.$id) {
                o.push(t.$flags.dragging);
            }
            v(u(t.children), i, o);
            if (true) {
                if (window[s.default.devFlag] && window[s.default.devFlag].selectMode && o.length) {
                    var f = o[0];
                    if (f.name === s.default.devFlag) {
                        f = o[1];
                    }
                    if (f && t.$plugin.selectSprite(e.type === "click" || e.type === "touchend", t, f)) {
                        return;
                    }
                }
            }
            if (!t.eHoldingFlag && (i.type === "mousedown" || i.type === "touchstart")) {
                t.eHoldingFlag = e;
            } else if (t.eHoldingFlag && (i.type === "mouseup" || i.type === "touchend")) {
                t.eHoldingFlag = false;
                l.default.stop();
            } else if (t.eHoldingFlag && (i.type === "mousemove" || i.type === "touchmove")) {
                t.eHoldingFlag = e;
            }
            for (var c = 0; c < o.length; c++) {
                if ((i.type === "mousemove" || i.type === "touchmove") && t.eLastMouseHover && t.eLastMouseHover !== o[c] && o.indexOf(t.eLastMouseHover) === -1) {
                    var d = t.eLastMouseHover["events"]["mouseout"] || t.eLastMouseHover["events"]["touchout"];
                    if (d) {
                        d.call(t.eLastMouseHover, i);
                    }
                }
                if (i.type === "mousewheel") {
                    l.default.wheel(o[c], i);
                } else if (t.eHoldingFlag && i.type === "touchmove") {
                    if (l.default.touch(o[c], i)) {
                        return;
                    }
                }
                if (!o[c]["events"]) continue;
                var h = o[c]["events"][i.type];
                if (h) {
                    t.eLastMouseHover = o[c];
                    var p = h.call(o[c], i);
                    if (p === true) {
                        t.eHoldingFlag = false;
                        return p;
                    } else if (p === "drag") {
                        t.eHoldingFlag = false;
                        return p;
                    }
                }
                if (o[c].events.through === false) {
                    return;
                }
            }
            if (!o.length && t.eLastMouseHover) {
                var g = t.eLastMouseHover["events"]["mouseout"];
                if (g) {
                    g.call(t.eLastMouseHover, i);
                }
                t.eLastMouseHover = null;
            }
            var y = t.events[i.type];
            if (y) {
                if (y.call(t, i)) {
                    t.eHoldingFlag = false;
                    return true;
                }
            }
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t, r, a) {
            if (t.sx < 0 && t.sw) {
                var n = -t.sx / t.sw;
                t.tx += t.tw * n;
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
            if (a && t.sy + t.sh > a) {
                var o = (t.sy + t.sh - a) / t.sh;
                t.sh -= t.sh * o;
                t.th -= t.th * o;
            }
            if (t.tx < 0 && t.tw > -t.tx) {
                var l = -t.tx / t.tw;
                t.sx += t.sw * l;
                t.sw -= t.sw * l;
                t.tw = t.tw + t.tx;
                t.tx = 0;
            }
            if (t.ty < 0 && t.th > -t.ty) {
                var f = -t.ty / t.th;
                t.sy += t.sh * f;
                t.sh -= t.sh * f;
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
        var a = r(1);
        var n = i(a);
        function i(e) {
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
                    var a = n.default.funcOrValue(t.style.zIndex, t);
                    if (r === a) return 0;
                    return r > a ? 1 : -1;
                }).forEach(function(t, r) {
                    e.$perPaint.call(e, t, r);
                });
            }
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = o(a);
        var i = r(3);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r = {};
            for (var a in e.content) {
                r[a] = n.default.funcOrValue(e.content[a], e);
            }
            if (typeof r.img === "string") {
                r.img = e.content.img = t.imgLoader(r.img);
            }
            for (var i in e.style) {
                r[i] = e.getStyle(i);
            }
            e.inherit.forEach(function(t) {
                r[t] = e.getStyle(t);
            });
            if (r.sequence) {
                var s = r.img;
                var o = r.sequence;
                r.sequence.index = r.sequence.index || 0;
                var l = r.sequence.index || 0;
                if (l < 0) l = 0;
                var f = void 0, u = void 0;
                if (o.w || o.h) {
                    if (o.w < 0) {
                        f = s.width / (0 - o.w);
                    } else if (o.w > 0) {
                        f = o.w;
                    } else {
                        f = s.width;
                    }
                    if (o.h < 0) {
                        u = s.height / (0 - o.h);
                    } else if (o.h > 0) {
                        u = o.h;
                    } else {
                        u = s.height;
                    }
                    var c = Math.floor(s.width / f);
                    var d = Math.floor(s.height / u);
                    r.sx = l % c * f;
                    r.sy = Math.floor(l / c) % d * u;
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
                if (t.$nextTickTime - r.sequence.lastTickTime >= n.default.funcOrValue(r.sequence.interval, e)) {
                    o.lastTickTime = t.$nextTickTime;
                    r.sequence.index++;
                    r.sequence.lastTickTime = t.$nextTickTime;
                }
                r.sw = r.sw || f;
                r.sh = r.sh || u;
                r.tw = r.tw || f;
                r.th = r.th || u;
            }
            return r;
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = y(a);
        var i = r(5);
        var s = y(i);
        var o = r(3);
        var l = y(o);
        var f = r(35);
        var u = y(f);
        var c = r(33);
        var d = y(c);
        var v = r(34);
        var h = y(v);
        var p = r(8);
        var g = y(p);
        function y(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var m = n.default.blend;
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
            if (n.default.funcOrValue(e.style.visible, e) === false) {
                n.default.execFuncs(e.hooks.beforeTick, e, e.$tickedTimes);
                n.default.execFuncs(e.hooks.ticked, e, ++e.$tickedTimes);
                return;
            }
            n.default.execFuncs(e.hooks.beforeTick, e, e.$tickedTimes);
            var r = this;
            x.call(e);
            var a = (0, u.default)(e, r);
            var i = {
                globalAlpha: n.default.firstValuable(a.opacity, 1)
            };
            var s = a.text;
            var o = a.img;
            var f = n.default.funcOrValue(e.children, e);
            var c = o ? o.width || 0 : 0;
            var v = o ? o.height || 0 : 0;
            a.tw = a.tw || a.sw || c;
            a.th = a.th || a.sh || v;
            a.sw = a.sw || c;
            a.sh = a.sh || v;
            if (a.locate === "lt") {} else if (a.locate === "ld") {
                a.ty -= a.th;
            } else if (a.locate === "rt") {
                a.tx -= a.tw;
            } else if (a.locate === "rd") {
                a.tx -= a.tw;
                a.ty -= a.th;
            } else {
                a.tx -= a.tw >> 1;
                a.ty -= a.th >> 1;
            }
            if (a.fh || a.fv) {
                a.fh = a.fh || 0;
                a.fv = a.fv || 0;
                a.fx = a.fx || 0;
                a.fy = a.fy || 0;
                i.transform = {
                    fh: a.fh,
                    fv: a.fv,
                    fx: -(a.ty + (a.th >> 1)) * a.fv + a.fx,
                    fy: -(a.tx + (a.tw >> 1)) * a.fh + a.fy
                };
            }
            if (a.blend) {
                if (typeof a.blend === "string") {
                    i.globalCompositeOperation = a.blend;
                } else {
                    i.globalCompositeOperation = m[a.blend];
                }
            }
            if (a.rotate) {
                var p = n.default.firstValuable(a.rx, a.tx + .5 * a.tw);
                var y = n.default.firstValuable(a.ry, a.ty + .5 * a.th);
                i.beforeRotate = [ p, y ];
                i.rotate = -a.rotate * Math.PI / 180;
                i.rotate = Number(i.rotate.toFixed(4));
                i.afterRotate = [ -p, -y ];
            }
            if (a.scale !== 1) {
                var w = a.scale;
                a.tx -= (w - 1) * a.tw >> 1;
                a.ty -= (w - 1) * a.th >> 1;
                a.tw *= w;
                a.th *= w;
            }
            if (a.mirrX) {
                i.translate = [ r.width, 0 ];
                i.scale = [ -1, 1 ];
                a.tx = r.width - a.tx - a.tw;
                if (a.mirrY) {
                    i.translate = [ r.width, r.height ];
                    i.scale = [ -1, -1 ];
                    a.ty = r.height - a.ty - a.th;
                }
            } else if (a.mirrY) {
                i.translate = [ 0, r.height ];
                i.scale = [ 1, -1 ];
                a.ty = r.height - a.ty - a.th;
            }
            if (true) {
                if (c && v && a.sw && a.sh) {
                    var b = a.tw * a.th / (a.sw * a.sh);
                    if (!e.$perf.paintRate || b > e.$perf.paintRate) {
                        e.$perf.paintRate = b;
                    }
                }
            }
            if (!a.rotate && !s && c && o.src) {
                (0, d.default)(r, a, c, v);
            }
            if (c > 10 && v > 10) {
                l.default.xywh.forEach(function(e) {
                    a[e] = Math.round(a[e]);
                });
            }
            (0, h.default)(r, f, -1);
            if (o && c && a.opacity !== 0 && a.sw && a.sh) {
                if ((0, g.default)(a.tx, a.ty, a.tw, a.th, 0, 0, r.width, r.height, i.beforeRotate && i.beforeRotate[0], i.beforeRotate && i.beforeRotate[1], a.rotate)) {
                    e.$rendered = true;
                    var T = {
                        $id: e.$id,
                        type: "img",
                        settings: i,
                        props: [ o, a.sx, a.sy, a.sw, a.sh, a.tx, a.ty, a.tw, a.th ]
                    };
                    if (true) {
                        T.$origin = e;
                    }
                    r.$children.push(T);
                }
            }
            if (s) {
                e.$rendered = true;
                var k = a.tx;
                var A = a.ty;
                var S = a.align || a.textAlign || "left";
                var F = a.textFont || "14px Arial";
                var M = parseInt(F);
                var O = a.lineHeight || M;
                if (S === "center") {
                    k += a.tw / 2;
                } else if (S === "right") {
                    k += a.tw;
                }
                if (a.textVerticalAlign === "top") {
                    A += M + (O - M) / 2;
                } else if (a.textVerticalAlign === "bottom") {
                    A += a.th - (O - M) / 2;
                } else if (a.textVerticalAlign === "middle") {
                    A += a.th / 2 + M / 2;
                }
                if (typeof s === "string" || typeof s === "number") {
                    r.$children.push({
                        $id: e.$id,
                        type: "text",
                        settings: i,
                        props: {
                            tx: k,
                            ty: A,
                            content: String(s),
                            align: S,
                            font: F,
                            color: a.color,
                            type: a.textType
                        }
                    });
                } else if (s.length) {
                    s.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: i,
                            props: {
                                tx: k + n.default.funcOrValue(t.tx, e),
                                ty: A + n.default.funcOrValue(t.ty, e),
                                content: n.default.funcOrValue(t.content, e),
                                align: S,
                                font: F,
                                color: a.color,
                                type: a.textType
                            }
                        });
                    });
                } else if (s.type === "multline-text") {
                    var _ = s.text.split(/\t|\n/);
                    var E = [];
                    _.forEach(function(e, t) {
                        e = String.prototype.trim.apply(e);
                        if (s.config.start) {
                            e = e.replace(s.config.start, "");
                        }
                        var r = 0;
                        var n = a.tw;
                        while (e.length && r < e.length) {
                            if (n <= 0) {
                                n = a.tw;
                                E.push(e.substr(0, r));
                                e = e.substr(r);
                                r = 0;
                            }
                            r++;
                            n -= M * ($(e[r]) ? 1.05 : .6);
                        }
                        if (e || t) {
                            E.push(e);
                        }
                    });
                    E.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: i,
                            props: {
                                tx: k,
                                ty: A,
                                content: t,
                                align: S,
                                font: F,
                                color: a.color,
                                type: a.textType
                            }
                        });
                        A += O || M;
                    });
                }
            }
            if (!o && !s) {
                e.$rendered = undefined;
            }
            (0, h.default)(r, f, 1);
            n.default.execFuncs(e.hooks.ticked, e, ++e.$tickedTimes);
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(9);
        var n = o(a);
        var i = r(24);
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
        var a = r(1);
        var n = i(a);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = function e(t, r) {
            var a = this;
            var n = false;
            this.$extendList.forEach(function(e) {
                if (e.onRender) {
                    var i = e.onRender.call(a, t, r);
                    if (i) {
                        n = i;
                    }
                }
            });
            return n;
        };
        var o = function e(t, r) {
            var a = this;
            var i = t.props;
            var o = false;
            if (t.type === "img") {
                var l = i[7] * i[8];
                var f = a.$children;
                if (l > 200 * 200) {
                    for (var u = f.length - 1; u > r; u--) {
                        var c = f[u];
                        if (c.$cannotCover) {
                            continue;
                        }
                        var d = c.props;
                        if (!d || !d[0]) {
                            c.$cannotCover = true;
                            continue;
                        }
                        if (d[7] * d[8] < l) {
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
                        if (n.default.pointInRect(i[5], i[6], d[5], d[5] + d[7], d[6], d[6] + d[8]) && n.default.pointInRect(i[5] + i[7], i[6] + i[8], d[5], d[5] + d[7], d[6], d[6] + d[8])) {
                            if (true) {
                                t.$origin.$useless = true;
                                a.$plugin.jumpRender(a, i);
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
            if (s.call(a, t, h)) {
                return;
            }
            var p = false;
            var g = a.$paintContext;
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
                    a.$plugin.drawImage(a, i);
                }
            } else if (t.type === "text" && i.content) {
                g.font = i.font;
                g.fillStyle = g.strokeStyle = i.color || "white";
                g.textAlign = i.align;
                g[i.type || "fillText"](i.content, i.tx, i.ty);
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
        var a = r(40);
        var n = E(a);
        var i = r(45);
        var s = E(i);
        var o = r(48);
        var l = E(o);
        var f = r(42);
        var u = E(f);
        var c = r(41);
        var d = E(c);
        var v = r(43);
        var h = E(v);
        var p = r(16);
        var g = E(p);
        var y = r(15);
        var m = E(y);
        var $ = r(17);
        var x = E($);
        var w = r(13);
        var b = E(w);
        var T = r(14);
        var k = E(T);
        var A = r(44);
        var S = E(A);
        var F = r(46);
        var M = E(F);
        var O = r(47);
        var _ = E(O);
        function E(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var R = {
            start: l.default,
            paint: u.default,
            add: n.default,
            remove: s.default,
            register: S.default,
            clear: d.default,
            setFpsHandler: M.default,
            setMaxFps: _.default,
            pause: h.default,
            on: g.default,
            off: m.default,
            trigger: x.default,
            broadcast: b.default,
            nextTick: k.default
        };
        e.exports = R;
    }, function(e, t, r) {
        "use strict";
        var a = r(10);
        var n = i(a);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = n.default.prototype.add;
    }, function(e, t) {
        "use strict";
        e.exports = function() {
            this.children = [];
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = i(a);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (this.$pausing || document.hidden) return;
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
                    var a = n.default.funcOrValue(t.style.zIndex, t);
                    if (r === a) return 0;
                    return r > a ? 1 : -1;
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
        var a = r(12);
        var n = i(a);
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = function e(t) {
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
            var o = [ "contextmenu", "mousewheel", "click", "dblclick", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove" ];
            o.forEach(function(t) {
                e.addEventListener(t, r.$eventHandler.bind(r));
            });
            n.default.tick();
            s.call(this, a);
            this.$paintContext = this.$paintContext || e.getContext("2d");
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(1);
        var n = i(a);
        function i(e) {
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
        var a = r(1);
        var n = o(a);
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
                var a = null;
                var n = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "loadArea", "jumpArea" ];
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
                            window[s.default.devFlag].$canvas[t.$id] = t;
                            t.$flags.devtoolHanged = true;
                        }
                    },
                    timeCollect: function e(t, r, a) {
                        t.$perf["$" + r] += (a === "START" || a === "PAUSE" ? -1 : 1) * Date.now();
                    },
                    selectSprite: function e(n, o, l) {
                        if (!l || !window[s.default.devFlag].selectMode) {
                            i.cancelSelectSprite(o);
                            return false;
                        }
                        if (!a) {
                            a = o.add({
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
                                a.style[e] = function() {
                                    if (e === "tw" || e === "th") {
                                        return l.getStyle(e) || l.getRect()[e];
                                    }
                                    return l.getStyle(e);
                                };
                            })(e);
                        });
                        a.webgl = l.webgl ? {} : undefined;
                        if (a.webgl) {
                            for (var f in l.webgl) {
                                (function(e) {
                                    a.webgl[e] = function() {
                                        if (typeof l.webgl[e] === "function") {
                                            return l.webgl[e].call(l);
                                        }
                                        return l.webgl[e];
                                    };
                                })(f);
                            }
                            a.webgl.img = o.imgLoader(r);
                            delete a.webgl.colors;
                            a.webgl.opacity = 1;
                        }
                        a.style.zIndex = Number.MAX_SAFE_INTEGER;
                        a.style.visible = function() {
                            return window[s.default.devFlag].selectMode;
                        };
                        a.style.opacity = .8;
                        if (n) {
                            o.remove(a);
                            a = null;
                            t({
                                name: "selectSprite",
                                id: o.$id,
                                value: {
                                    sprite: l.$id,
                                    canvas: o.$id
                                }
                            });
                            window[s.default.devFlag].current = {
                                $sprite: l,
                                $canvas: o
                            };
                            window[s.default.devFlag].selectMode = false;
                        }
                        return true;
                    },
                    cancelSelectSprite: function e(t) {
                        if (!a) return;
                        t.remove(a);
                        a = null;
                    }
                };
                return i;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var a = r(39);
        var n = f(a);
        var i = r(31);
        var s = f(i);
        var o = r(51);
        var l = f(o);
        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var u = function e(t) {
            this.imgLoader = Easycanvas.imgLoader;
            for (var r in l.default) {
                this[r] = this[r] || JSON.parse(JSON.stringify(l.default[r]));
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
        u.prototype.$extendList = [];
        for (var c in s.default) {
            if (Object.prototype.hasOwnProperty.call(s.default, c)) {
                u.prototype[c] = s.default[c];
            }
        }
        for (var d in n.default) {
            if (Object.prototype.hasOwnProperty.call(n.default, d)) {
                u.prototype[d] = n.default[d];
            }
        }
        e.exports = u;
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
            scroll: {
                scrollable: false,
                scrollY: 0,
                minScrollY: undefined,
                maxScrollY: undefined
            },
            $flags: {
                dragging: false
            }
        };
        e.exports = r;
    }, , , , , , , , , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var a = r(23);
        var n = o(a);
        var i = r(5);
        var s = o(i);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r = undefined;
            (0, s.default)(e, function(e) {
                return (0, n.default)(e, function(e) {
                    var a = e.width, n = e.height;
                    var i = e.getContext("2d").getImageData(0, 0, a, n);
                    var s = i.data;
                    for (var o = s.length - 1; o >= 0; o -= 4) {
                        if (t && t.conversion) {
                            var l = t.conversion({
                                r: s[o - 3],
                                g: s[o - 2],
                                b: s[o - 1],
                                a: s[o]
                            }, (o + 1 >> 2) % a, Math.floor((o + 1 >> 2) / a));
                            s[o - 3] = l.r;
                            s[o - 2] = l.g;
                            s[o - 1] = l.b;
                            s[o - 0] = l.a;
                        }
                    }
                    e.getContext("2d").clearRect(0, 0, a, n);
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
            var a = t.height;
            var n = document.createElement("canvas");
            n.width = r;
            n.height = a;
            var i = n.getContext("2d");
            i.scale(1, -1);
            i.translate(0, -a);
            i.drawImage(t, 0, 0);
            var s = i.getImageData(0, 0, r, a);
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

