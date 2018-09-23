(function l(s, o) {
    if (typeof exports === "object" && typeof module === "object") module.exports = o(); else if (typeof define === "function" && define.amd) define([], o); else {
        var r = o();
        for (var e in r) (typeof exports === "object" ? exports : s)[e] = r[e];
    }
})(this, function() {
    return function(l) {
        var s = {};
        function o(r) {
            if (s[r]) return s[r].exports;
            var e = s[r] = {
                exports: {},
                id: r,
                loaded: false
            };
            l[r].call(e.exports, e, e.exports, o);
            e.loaded = true;
            return e.exports;
        }
        o.m = l;
        o.c = s;
        o.p = "";
        return o(0);
    }({
        0: function(l, s, o) {
            l.exports = o(30);
        },
        30: function(l, s) {
            "use strict";
            var o = Object.assign || function(l) {
                for (var s = 1; s < arguments.length; s++) {
                    var o = arguments[s];
                    for (var r in o) {
                        if (Object.prototype.hasOwnProperty.call(o, r)) {
                            l[r] = o[r];
                        }
                    }
                }
                return l;
            };
            var r = typeof window !== "undefined";
            var e = void 0;
            var c = void 0;
            var t = {
                loose: function l(s) {
                    s.$scroll.touching = false;
                },
                looper: function l(s) {
                    if (!s.$scroll || !s.$scroll.$scrolling) return;
                    if (Math.abs(s.$scroll.speedX) > 1) {
                        s.$scroll.speedX *= s.scroll.smooth || .8;
                    } else {
                        s.$scroll.speedX = 0;
                    }
                    if (Math.abs(s.$scroll.speedY) > 1) {
                        s.$scroll.speedY *= s.scroll.smooth || .8;
                    } else {
                        s.$scroll.speedY = 0;
                    }
                    if (Math.abs(s.$scroll.speedX) <= 2 && Math.abs(s.$scroll.speedY) <= 2) {
                        s.$scroll.$scrolling = false;
                        return;
                    }
                    if (s.$scroll.touching) return;
                    s.scroll.scrollY -= s.$scroll.speedY;
                    s.scroll.scrollX -= s.$scroll.speedX;
                    var o = e.utils.funcOrValue(s.scroll.minScrollX, s);
                    var r = e.utils.funcOrValue(s.scroll.maxScrollX, s);
                    var c = e.utils.funcOrValue(s.scroll.minScrollY, s);
                    var t = e.utils.funcOrValue(s.scroll.maxScrollY, s);
                    if (!isNaN(c) && s.scroll.scrollY < c) {
                        s.scroll.scrollY = c;
                    } else if (!isNaN(t) && s.scroll.scrollY > t) {
                        s.scroll.scrollY = t;
                    }
                    if (!isNaN(o) && s.scroll.scrollX < o) {
                        s.scroll.scrollX = o;
                    } else if (!isNaN(r) && s.scroll.scrollX > r) {
                        s.scroll.scrollX = r;
                    }
                },
                touch: function l(s, o) {
                    if (!s.scroll.scrollable) return false;
                    var r = Date.now();
                    if (!s.$scroll.touching) {
                        s.$scroll.touching = r;
                        s.$scroll.quickTouch = r;
                        s.$scroll.startPos.x = o.canvasX;
                        s.$scroll.startPos.y = o.canvasY;
                        s.$scroll.speedX = 0;
                        s.$scroll.speedY = 0;
                    } else {
                        s.$scroll.$scrolling = true;
                        var e = s.$scroll.startPos.x - o.canvasX;
                        var c = s.$scroll.startPos.y - o.canvasY;
                        var t = r - s.$scroll.touching;
                        s.$scroll.touching = r;
                        if (s.scroll.scrollX + e < s.scroll.minScrollX || s.scroll.scrollX + e > s.scroll.maxScrollX) {
                            if (s.scroll.flexibleX) e >>= 3; else e = 0;
                        }
                        if (s.scroll.scrollY + c < s.scroll.minScrollY || s.scroll.scrollY + c > s.scroll.maxScrollY) {
                            if (s.scroll.flexibleY) c >>= 3; else c = 0;
                        }
                        if (Math.abs(e) >= 1 && t > 1) {
                            s.$scroll.speedX = (o.canvasX - s.$scroll.startPos.x) * 3;
                            s.scroll.scrollX += e;
                        }
                        if (Math.abs(c) >= 1 && t > 1) {
                            s.$scroll.speedY = (o.canvasY - s.$scroll.startPos.y) * 3;
                            s.scroll.scrollY += c;
                        }
                        s.$scroll.startPos.x = o.canvasX;
                        s.$scroll.startPos.y = o.canvasY;
                        if (Math.abs(e) > Math.abs(c) + 1) return 1; else if (Math.abs(e) < Math.abs(c) - 1) return 2;
                    }
                },
                wheel: function l(s, o) {
                    if (!s.scroll.scrollable) return false;
                    s.$scroll.$scrolling = true;
                    s.$scroll.speedX = o.event.wheelDeltaX;
                    s.$scroll.speedY = o.event.wheelDeltaY;
                    o.stopPropagation();
                }
            };
            var a = function l(s) {
                var r = false;
                var a = s || {};
                a.scroll = o({
                    scrollX: 0,
                    scrollY: 0,
                    scrollable: true,
                    minScrollX: 0,
                    maxScrollX: 0,
                    minScrollY: 0,
                    maxScrollY: 0,
                    propagationX: false,
                    propagationY: false
                }, s.scroll);
                var n = function l() {
                    if (r) {
                        f.scroll.scrollY = r();
                    } else {
                        f.off("ticked", l);
                    }
                };
                var i = false;
                a.events = o({
                    touchstart: function l(s) {
                        t.loose(this);
                        i = true;
                        c = false;
                        t.touch(this, s);
                        if (!f.scroll.propagationX && !f.scroll.propagationY) {
                            s.stopPropagation();
                        }
                    },
                    touchmove: function l(s) {
                        if (!i) return;
                        if (c && this !== c) {
                            return;
                        }
                        var o = t.touch(this, s);
                        if (o === 1 && f.scroll.propagationY) {
                            s.stopPropagation();
                            c = this;
                        } else if (o === 2 && f.scroll.propagationX) {
                            s.stopPropagation();
                            c = this;
                        }
                    },
                    mousewheel: function l(s) {
                        i = true;
                        t.wheel(this, s);
                        s.stopPropagation();
                    },
                    touchend: function l() {
                        i = false;
                        t.loose(this);
                    },
                    mouseup: function l() {
                        i = false;
                        t.loose(this);
                    }
                }, a.events || {});
                var f = new e.class.sprite(a);
                f.on("ticked", function() {
                    t.looper(f);
                });
                f.on("scrollTo", function(l, s) {
                    r = e.transition.pendulum(f.scroll.scrollY, l, (s || 200) * 2, {
                        cycle: .5
                    }).then(function() {
                        r = false;
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
            var n = function l(s, o) {
                e = s;
                if (o) {
                    s.class[o] = a;
                }
                return a;
            };
            if (r && window.Easycanvas) {
                e = Easycanvas;
                Easycanvas.class.scroll = a;
            } else {
                l.exports = n;
            }
        }
    });
});

