(function l(r, s) {
    if (typeof exports === "object" && typeof module === "object") module.exports = s(); else if (typeof define === "function" && define.amd) define([], s); else {
        var o = s();
        for (var e in o) (typeof exports === "object" ? exports : r)[e] = o[e];
    }
})(this, function() {
    return function(l) {
        var r = {};
        function s(o) {
            if (r[o]) return r[o].exports;
            var e = r[o] = {
                exports: {},
                id: o,
                loaded: false
            };
            l[o].call(e.exports, e, e.exports, s);
            e.loaded = true;
            return e.exports;
        }
        s.m = l;
        s.c = r;
        s.p = "";
        return s(0);
    }({
        0: function(l, r, s) {
            l.exports = s(30);
        },
        30: function(l, r) {
            "use strict";
            var s = Object.assign || function(l) {
                for (var r = 1; r < arguments.length; r++) {
                    var s = arguments[r];
                    for (var o in s) {
                        if (Object.prototype.hasOwnProperty.call(s, o)) {
                            l[o] = s[o];
                        }
                    }
                }
                return l;
            };
            var o = typeof window !== "undefined";
            var e = void 0;
            var c = {
                loose: function l(r) {
                    r.$scroll.touching = false;
                },
                looper: function l(r) {
                    if (!r.$scroll || !r.$scroll.$scrolling) return;
                    if (Math.abs(r.$scroll.speedX) > 1) {
                        r.$scroll.speedX *= r.scroll.smooth || .8;
                    } else {
                        r.$scroll.speedX = 0;
                    }
                    if (Math.abs(r.$scroll.speedY) > 1) {
                        r.$scroll.speedY *= r.scroll.smooth || .8;
                    } else {
                        r.$scroll.speedY = 0;
                    }
                    if (Math.abs(r.$scroll.speedX) <= 2 && Math.abs(r.$scroll.speedY) <= 2) {
                        r.$scroll.$scrolling = false;
                        return;
                    }
                    if (r.$scroll.touching) return;
                    r.scroll.scrollY -= r.$scroll.speedY;
                    r.scroll.scrollX -= r.$scroll.speedX;
                    var s = e.utils.funcOrValue(r.scroll.minScrollX, r);
                    var o = e.utils.funcOrValue(r.scroll.maxScrollX, r);
                    var c = e.utils.funcOrValue(r.scroll.minScrollY, r);
                    var t = e.utils.funcOrValue(r.scroll.maxScrollY, r);
                    if (!isNaN(c) && r.scroll.scrollY < c) {
                        r.scroll.scrollY = c;
                    } else if (!isNaN(t) && r.scroll.scrollY > t) {
                        r.scroll.scrollY = t;
                    }
                    if (!isNaN(s) && r.scroll.scrollX < s) {
                        r.scroll.scrollX = s;
                    } else if (!isNaN(o) && r.scroll.scrollX > o) {
                        r.scroll.scrollX = o;
                    }
                },
                touch: function l(r, s) {
                    if (!r.scroll.scrollable) return false;
                    var o = Date.now();
                    if (!r.$scroll.touching) {
                        r.$scroll.touching = o;
                        r.$scroll.quickTouch = o;
                        r.$scroll.startPos.x = s.canvasX;
                        r.$scroll.startPos.y = s.canvasY;
                        r.$scroll.speedX = 0;
                        r.$scroll.speedY = 0;
                    } else {
                        r.$scroll.$scrolling = true;
                        var e = r.$scroll.startPos.x - s.canvasX;
                        var c = r.$scroll.startPos.y - s.canvasY;
                        var t = o - r.$scroll.touching;
                        r.$scroll.touching = o;
                        if (r.scroll.scrollX + e < r.scroll.minScrollX || r.scroll.scrollX + e > r.scroll.maxScrollX) {
                            if (r.scroll.flexibleX) e >>= 3; else e = 0;
                        }
                        if (r.scroll.scrollY + c < r.scroll.minScrollY || r.scroll.scrollY + c > r.scroll.maxScrollY) {
                            if (r.scroll.flexibleY) c >>= 3; else c = 0;
                        }
                        if (Math.abs(e) >= 1 && t > 1) {
                            r.$scroll.speedX = (s.canvasX - r.$scroll.startPos.x) * 4;
                            r.scroll.scrollX += e;
                        }
                        if (Math.abs(c) >= 1 && t > 1) {
                            r.$scroll.speedY = (s.canvasY - r.$scroll.startPos.y) * 4;
                            r.scroll.scrollY += c;
                        }
                        r.$scroll.startPos.x = s.canvasX;
                        r.$scroll.startPos.y = s.canvasY;
                        s.stopPropagation();
                    }
                },
                wheel: function l(r, s) {
                    if (!r.scroll.scrollable) return false;
                    r.$scroll.$scrolling = true;
                    r.$scroll.speedX = s.event.wheelDeltaX;
                    r.$scroll.speedY = s.event.wheelDeltaY;
                    s.stopPropagation();
                }
            };
            var t = function l(r) {
                var o = false;
                var t = r || {};
                t.scroll = s({
                    scrollX: 0,
                    scrollY: 0,
                    scrollable: true,
                    minScrollX: 0,
                    maxScrollX: 0,
                    minScrollY: 0,
                    maxScrollY: 0
                }, r.scroll);
                var n = function l() {
                    if (o) {
                        f.scroll.scrollY = o();
                    }
                };
                var a = true;
                var i = function l() {
                    a = !a;
                };
                t.events = s({
                    interceptor: function l(r) {
                        if (!a) {
                            return r;
                        }
                        if (r.type === "touchmove") {
                            c.touch(this, r);
                            r.$stopPropagation = true;
                        } else if (r.type === "mousewheel") {
                            c.wheel(this, r);
                        } else if (r.type === "touchend" || r.type === "mouseup") {
                            c.loose(this);
                        } else if (r.type === "hold") {
                            r.$stopPropagation = true;
                        }
                        if (o) {
                            f.off("ticked", n);
                            o = false;
                        }
                        return r;
                    }
                }, t.events || {});
                var f = new e.class.sprite(t);
                f.on("ticked", function() {
                    c.looper(f);
                });
                f.on("handleToggle", i);
                f.on("scrollTo", function(l, r) {
                    o = e.transition.pendulum(f.scroll.scrollY, l, (r || 200) * 2, {
                        cycle: .5
                    });
                    f.on("ticked", n);
                });
                f.$scroll = {
                    speedX: 0,
                    speedY: 0,
                    touching: false,
                    startPos: {}
                };
                var u = f.add({
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
                f.add = u.add.bind(u);
                f.clear = u.clear.bind(u);
                f.getChildren = function() {
                    return u.children;
                };
                return f;
            };
            var n = function l(r, s) {
                e = r;
                if (s) {
                    r.class[s] = t;
                }
                return t;
            };
            if (o && window.Easycanvas) {
                e = Easycanvas;
                Easycanvas.class.scroll = t;
            } else {
                l.exports = n;
            }
        }
    });
});

