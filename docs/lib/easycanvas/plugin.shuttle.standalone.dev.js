(function t(e, n) {
    if (typeof exports === "object" && typeof module === "object") module.exports = n(); else if (typeof define === "function" && define.amd) define([], n); else {
        var a = n();
        for (var r in a) (typeof exports === "object" ? exports : e)[r] = a[r];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function n(a) {
            if (e[a]) return e[a].exports;
            var r = e[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            t[a].call(r.exports, r, r.exports, n);
            r.loaded = true;
            return r.exports;
        }
        n.m = t;
        n.c = e;
        n.p = "";
        return n(0);
    }({
        0: function(t, e, n) {
            t.exports = n(84);
        },
        1: function(t, e) {
            "use strict";
            var n = {
                isArray: Array.isArray || function(t) {
                    return Object.prototype.toString.call(t) === "[object Array]";
                },
                funcOrValue: function t(e, n) {
                    if (typeof e === "function") {
                        var a = e.call(n);
                        return a;
                    }
                    return e;
                },
                execFuncs: function t(e, a, r) {
                    if (e) {
                        if (!n.isArray(r)) {
                            r = [ r ];
                        }
                    }
                    if (typeof e === "function") {
                        return e.apply(a, r);
                    } else if (n.isArray(e)) {
                        var s = [];
                        e.forEach(function(t) {
                            s.push(t && t.apply(a, r));
                        });
                        return s;
                    }
                },
                blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
                pointInRect: function t(e, n, a, r, s, i) {
                    return !(e < a || e > r || n < s || n > i);
                },
                firstValuable: function t(e, n, a) {
                    return typeof e === "undefined" ? typeof n === "undefined" ? a : n : e;
                }
            };
            t.exports = n;
        },
        2: function(t, e) {
            "use strict";
            var n = 3.141593;
            t.exports = function(t, e, a, r, s, i) {
                var o = s ? -s / 180 * n : 0;
                var c = t, u = e;
                if (s) {
                    c = (t - a) * Math.cos(o) - (e - r) * Math.sin(o) + a;
                    u = (t - a) * Math.sin(o) + (e - r) * Math.cos(o) + r;
                }
                if (i) {
                    return [ c, u ];
                }
                return {
                    x: c,
                    y: u
                };
            };
        },
        84: function(t, e, n) {
            "use strict";
            var a = n(1);
            var r = o(a);
            var s = n(2);
            var i = o(s);
            function o(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            var c = r.default.firstValuable;
            var u = void 0;
            var l = function t(e) {
                var n = new u.class.sprite(e);
                n.style = e.style;
                var a = e.center || {
                    x: e.style.tw / 2,
                    y: e.style.th / 2
                };
                var r = {
                    passByRotate: false,
                    speed: 2e3
                };
                n.set = function(t) {
                    for (var e in t) {
                        r[e] = t[e];
                    }
                };
                e.background && n.add(new u.class.sprite({
                    content: {
                        img: e.background
                    },
                    style: {
                        tx: 0,
                        ty: 0,
                        tw: e.style.tw,
                        th: e.style.th,
                        locate: "lt"
                    }
                }));
                var s = Math.max(e.style.tw, e.style.th) + 100;
                var o = function t(e) {
                    return (0, i.default)(s, 0, 0, 0, e);
                };
                n.hooks = {
                    ticked: function t() {
                        if (Math.random() < .8) return;
                        var s = Math.random() * 360;
                        var i = o(s);
                        var c = e.passBy[Math.floor(s) % e.passBy.length];
                        if (c) {
                            var l = new u.class.sprite({
                                content: {
                                    img: c
                                },
                                style: {
                                    tx: Easycanvas.transition.linear(a.x, a.x + i.x, r.speed),
                                    ty: Easycanvas.transition.linear(a.y, a.y + i.y, r.speed),
                                    rotate: s - 90,
                                    tw: Easycanvas.transition.linear(1, c.width * 2, r.speed),
                                    th: Easycanvas.transition.linear(1, c.height * 2, r.speed)
                                }
                            });
                            if (r.passByRotate) {
                                l.style.rx = a.x;
                                l.style.ry = a.y;
                                l.style.rotate = Easycanvas.transition.linear(0, 360, r.speed);
                            }
                            n.add(l);
                            setTimeout(function() {
                                l.remove();
                            }, r.speed);
                        }
                        if (Math.random() > r.passInRate) return;
                        var f = new u.class.sprite({
                            content: {
                                img: e.passIn[0]
                            },
                            style: {
                                tx: Easycanvas.transition.linear(a.x, a.x + i.x / 10, r.speed),
                                ty: Easycanvas.transition.linear(a.y, a.y + i.y / 10, r.speed),
                                rotate: s,
                                tw: Easycanvas.transition.linear(10, a.x * 4, r.speed),
                                th: Easycanvas.transition.linear(10, a.x * 4, r.speed),
                                opacity: Easycanvas.transition.linear(5, .15, r.speed)
                            }
                        });
                        n.add(f);
                        setTimeout(function() {
                            f.remove();
                        }, r.speed);
                    }
                };
                return n;
            };
            if (window && window.Easycanvas) {
                u = window.Easycanvas;
                u.class.shuttle = l;
            }
            t.exports = function(t) {
                u = t;
                t.class.shuttle = l;
            };
        }
    });
});

