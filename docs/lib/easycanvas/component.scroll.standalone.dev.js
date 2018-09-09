(function l(r, e) {
    if (typeof exports === "object" && typeof module === "object") module.exports = e(); else if (typeof define === "function" && define.amd) define([], e); else {
        var s = e();
        for (var o in s) (typeof exports === "object" ? exports : r)[o] = s[o];
    }
})(this, function() {
    return function(l) {
        var r = {};
        function e(s) {
            if (r[s]) return r[s].exports;
            var o = r[s] = {
                exports: {},
                id: s,
                loaded: false
            };
            l[s].call(o.exports, o, o.exports, e);
            o.loaded = true;
            return o.exports;
        }
        e.m = l;
        e.c = r;
        e.p = "";
        return e(0);
    }({
        0: function(l, r, e) {
            l.exports = e(31);
        },
        31: function(l, r) {
            "use strict";
            var e = Object.assign || function(l) {
                for (var r = 1; r < arguments.length; r++) {
                    var e = arguments[r];
                    for (var s in e) {
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            l[s] = e[s];
                        }
                    }
                }
                return l;
            };
            var s = typeof window !== "undefined";
            var o = {};
            var c = false;
            var t = false;
            var n = void 0;
            var a = {
                loose: function l(r) {
                    c = false;
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
                    if (c) return;
                    r.scroll.scrollY -= r.$scroll.speedY;
                    r.scroll.scrollX -= r.$scroll.speedX;
                    var e = n.utils.funcOrValue(r.scroll.minScrollX, r);
                    var s = n.utils.funcOrValue(r.scroll.maxScrollX, r);
                    var o = n.utils.funcOrValue(r.scroll.minScrollY, r);
                    var t = n.utils.funcOrValue(r.scroll.maxScrollY, r);
                    if (!isNaN(o) && r.scroll.scrollY < o) {
                        r.scroll.scrollY = o;
                    } else if (!isNaN(t) && r.scroll.scrollY > t) {
                        r.scroll.scrollY = t;
                    }
                    if (!isNaN(e) && r.scroll.scrollX < e) {
                        r.scroll.scrollX = e;
                    } else if (!isNaN(s) && r.scroll.scrollX > s) {
                        r.scroll.scrollX = s;
                    }
                },
                touch: function l(r, e) {
                    if (!r.scroll.scrollable) return false;
                    var s = Date.now();
                    if (!c) {
                        c = s;
                        o.x = e.canvasX;
                        o.y = e.canvasY;
                        r.$scroll.speedX = 0;
                        r.$scroll.speedY = 0;
                    } else {
                        r.$scroll.$scrolling = true;
                        var t = Math.abs(e.canvasX - o.x);
                        var n = Math.abs(e.canvasY - o.y);
                        var a = s - c;
                        c = s;
                        if (t >= 1 && a > 1) {
                            r.$scroll.speedX += (e.canvasX - o.x) / a * 10;
                        }
                        if (n >= 1 && a > 1) {
                            r.$scroll.speedY = (e.canvasY - o.y) * 3;
                            r.scroll.scrollY += o.y - e.canvasY;
                        }
                        o.x = e.canvasX;
                        o.y = e.canvasY;
                        return true;
                    }
                },
                wheel: function l(r, e) {
                    if (!r.scroll.scrollable) return false;
                    r.$scroll.$scrolling = true;
                    r.$scroll.speedX = e.event.wheelDeltaX;
                    r.$scroll.speedY = e.event.wheelDeltaY;
                    return true;
                }
            };
            var i = function l(r) {
                var s = r || {};
                s.scroll = e({
                    scrollX: 0,
                    scrollY: 0,
                    scrollable: true,
                    minScrollX: 0,
                    maxScrollX: 0,
                    minScrollY: 0,
                    maxScrollY: 0
                }, r.scroll);
                var o = function l() {
                    u.scroll.scrollY = t();
                };
                var c = true;
                var i = function l() {
                    c = !c;
                };
                s.events = {
                    interceptor: function l(r) {
                        if (!c) return r;
                        if (r.type === "touchmove") {
                            a.touch(this, r);
                            r.$stopPropagation = true;
                        } else if (r.type === "mousewheel") {
                            a.wheel(this, r);
                        } else if (r.type === "touchend" || r.type === "mouseup") {
                            a.loose(this);
                        } else if (r.type === "hold") {
                            r.$stopPropagation = true;
                        }
                        if (t) {
                            u.off("ticked", o);
                            t = false;
                        }
                        return r;
                    }
                };
                var u = new n.class.sprite(s);
                u.on("ticked", function() {
                    a.looper(u);
                });
                u.on("handleToggle", i);
                u.on("scrollTo", function(l, r) {
                    t = n.transition.pendulum(u.scroll.scrollY, l, (r || 200) * 2, {
                        cycle: .5
                    });
                    u.on("ticked", o);
                });
                u.$scroll = {
                    speedX: 0,
                    speedY: 0
                };
                var f = u.add({
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
                u.add = f.add.bind(f);
                u.clear = f.clear.bind(f);
                u.getChildren = function() {
                    return f.children;
                };
                return u;
            };
            var u = function l(r, e) {
                n = r;
                r.class[e] = i;
            };
            if (s && window.Easycanvas) {
                n = Easycanvas;
                Easycanvas.class.scroll = i;
            } else {
                l.exports = u;
            }
        }
    });
});

