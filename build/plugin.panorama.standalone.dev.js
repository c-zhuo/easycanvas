(function e(t, s) {
    if (typeof exports === "object" && typeof module === "object") module.exports = s(); else if (typeof define === "function" && define.amd) define([], s); else {
        var a = s();
        for (var n in a) (typeof exports === "object" ? exports : t)[n] = a[n];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function s(a) {
            if (t[a]) return t[a].exports;
            var n = t[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            e[a].call(n.exports, n, n.exports, s);
            n.loaded = true;
            return n.exports;
        }
        s.m = e;
        s.c = t;
        s.p = "";
        return s(0);
    }({
        0: function(e, t, s) {
<<<<<<< HEAD
            e.exports = s(92);
        },
        92: function(e, t) {
=======
            e.exports = s(89);
        },
        89: function(e, t) {
>>>>>>> 1a4fa5bcf63ef16aa4cd47591324d0e5665caa06
            "use strict";
            var s = void 0;
            var a = function e(t) {
                var s = t.painter;
                var a = t.img, n = t.dx, o = n === undefined ? .5 : n;
                var i = new Easycanvas.class.sprite(t);
                i.dx = o;
                var r = t.style.tw;
                var c = t.style.th;
                var l = t.style.sw;
                var f = t.style.sh;
                var y = 0;
                var p = new Easycanvas.class.sprite({
                    content: {
                        img: a
                    },
                    style: {
                        locate: "left",
                        sw: r,
                        th: c
                    }
                });
                var d = new Easycanvas.class.sprite({
                    content: {
                        img: a
                    },
                    style: {
                        locate: "left",
                        sw: r,
                        th: c,
                        sx: -r,
                        opacity: 0
                    }
                });
                i.add(p);
                i.add(d);
                var u = function e() {
                    if (y > l) {
                        y = -l;
                    }
                    if (y >= 0) {
                        d.style.sx = -l + y + 1;
                        if (y < l - r) {
                            d.style.opacity = 0;
                        } else {
                            if (l - y >= 0 && l - y <= 5) {
                                p.style.sw = 0;
                            } else {
                                p.style.sw = l - y;
                            }
                            d.style.opacity = 1;
                            d.style.sw = r - p.style.sw;
                        }
                    } else if (y >= -l) {
                        d.style.sx = l + y - 1;
                        if (y < -r) {
                            p.style.opacity = 0;
                        } else {
                            p.style.opacity = 1;
                            p.style.sw = r + y;
                            d.style.sw = -y;
                        }
                    }
                    p.style.sx = y;
                    y += i.dx;
                };
                i.start = function() {
                    i.on("ticked", u);
                };
                i.stop = function() {
                    i.off("ticked", u);
                };
                i.changeSpeed = function(e) {
                    o = e;
                };
                return i;
            };
            if (window && window.Easycanvas) {
                s = window.Easycanvas;
                s.class.panorama = a;
            }
            e.exports = function(e) {
                s = e;
                e.class.panorama = a;
            };
        }
    });
});

