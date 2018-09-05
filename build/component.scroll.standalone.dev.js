(function l(e, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var s = r();
        for (var o in s) (typeof exports === "object" ? exports : e)[o] = s[o];
    }
})(this, function() {
    return function(l) {
        var e = {};
        function r(s) {
            if (e[s]) return e[s].exports;
            var o = e[s] = {
                exports: {},
                id: s,
                loaded: false
            };
            l[s].call(o.exports, o, o.exports, r);
            o.loaded = true;
            return o.exports;
        }
        r.m = l;
        r.c = e;
        r.p = "";
        return r(0);
    }({
        0: function(l, e, r) {
            l.exports = r(31);
        },
        31: function(l, e) {
            "use strict";
            var r = Object.assign || function(l) {
                for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var s in r) {
                        if (Object.prototype.hasOwnProperty.call(r, s)) {
                            l[s] = r[s];
                        }
                    }
                }
                return l;
            };
            var s = typeof window !== "undefined";
            var o = {};
            var c = false;
            var t = void 0;
            var a = {
                loose: function l(e) {
                    c = false;
                },
                looper: function l(e) {
                    if (!e.$scroll || !e.$scroll.$scrolling) return;
                    if (c) return;
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
                    if (Math.abs(e.$scroll.speedX) <= 2 && Math.abs(e.$scroll.speedY) <= 2) {
                        e.$scroll.$scrolling = false;
                        return;
                    }
                    e.scroll.scrollY -= e.$scroll.speedY;
                    e.scroll.scrollX -= e.$scroll.speedX;
                    var r = t.utils.funcOrValue(e.scroll.minScrollX, e);
                    var s = t.utils.funcOrValue(e.scroll.maxScrollX, e);
                    var o = t.utils.funcOrValue(e.scroll.minScrollY, e);
                    var a = t.utils.funcOrValue(e.scroll.maxScrollY, e);
                    if (!isNaN(o) && e.scroll.scrollY < o) {
                        e.scroll.scrollY = o;
                    } else if (!isNaN(a) && e.scroll.scrollY > a) {
                        e.scroll.scrollY = a;
                    }
                    if (!isNaN(r) && e.scroll.scrollX < r) {
                        e.scroll.scrollX = r;
                    } else if (!isNaN(s) && e.scroll.scrollX > s) {
                        e.scroll.scrollX = s;
                    }
                },
                touch: function l(e, r) {
                    if (!e.scroll.scrollable) return false;
                    var s = Date.now();
                    if (!c) {
                        c = s;
                        o.x = r.canvasX;
                        o.y = r.canvasY;
                        e.$scroll.speedX = 0;
                        e.$scroll.speedY = 0;
                    } else {
                        e.$scroll.$scrolling = true;
                        var t = Math.abs(r.canvasX - o.x);
                        var a = Math.abs(r.canvasY - o.y);
                        var n = s - c;
                        c = s;
                        if (t >= 1 && n > 1) {
                            e.$scroll.speedX += (r.canvasX - o.x) / n * 10;
                        }
                        if (a >= 1 && n > 1) {
                            e.$scroll.speedY = (r.canvasY - o.y) / n * 50;
                            e.scroll.scrollY += o.y - r.canvasY;
                        }
                        o.x = r.canvasX;
                        o.y = r.canvasY;
                        return true;
                    }
                },
                wheel: function l(e, r) {
                    if (!e.scroll.scrollable) return false;
                    e.$scroll.$scrolling = true;
                    e.$scroll.speedX = r.event.wheelDeltaX;
                    e.$scroll.speedY = r.event.wheelDeltaY;
                    return true;
                }
            };
            var n = function l(e) {
                var s = e || {};
                s.scroll = r({
                    scrollX: 0,
                    scrollY: 0,
                    scrollable: true,
                    minScrollX: 0,
                    maxScrollX: 0,
                    minScrollY: 0,
                    maxScrollY: 0
                }, e.scroll);
                s.events = {
                    interceptor: function l(e) {
                        if (e.type === "touchmove") {
                            a.touch(this, e);
                        } else if (e.type === "mousewheel") {
                            a.wheel(this, e);
                        } else if (e.type === "touchend" || e.type === "mouseup") {
                            a.loose(this);
                        } else if (e.type === "hold") {}
                        e.$stopPropagation = true;
                        return e;
                    }
                };
                var o = new t.class.sprite(s);
                o.on("ticked", function() {
                    a.looper(o);
                });
                o.$scroll = {
                    speedX: 0,
                    speedY: 0
                };
                var c = o.add({
                    name: "scrolling-element",
                    style: {
                        tx: function l() {
                            return -this.$parent.scroll.scrollX;
                        },
                        ty: function l() {
                            return -this.$parent.scroll.scrollY;
                        }
                    }
                });
                o.add = c.add.bind(c);
                return o;
            };
            var i = function l(e, r) {
                t = e;
                e.class[r] = n;
            };
            if (s && window.Easycanvas) {
                t = Easycanvas;
                Easycanvas.class.scroll = n;
            } else {
                l.exports = i;
            }
        }
    });
});

