(function t(e, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var n = r();
        for (var o in n) (typeof exports === "object" ? exports : e)[o] = n[o];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function r(n) {
            if (e[n]) return e[n].exports;
            var o = e[n] = {
                exports: {},
                id: n,
                loaded: false
            };
            t[n].call(o.exports, o, o.exports, r);
            o.loaded = true;
            return o.exports;
        }
        r.m = t;
        r.c = e;
        r.p = "";
        return r(0);
    }({
        0: function(t, e, r) {
            t.exports = r(153);
        },
        153: function(t, e) {
            "use strict";
            var r = void 0;
            var n = function t(e) {
                var n = new r.class.sprite(e);
                n.style = e.style;
                n.content.img = e.number;
                n.style.cutLeft = 0;
                n.style.cutWidth = n.style.cutWidth || e.number.width;
                n.style.cutHeight = Math.floor(n.cutHeight || e.number.height / 10);
                var o = 0;
                var u = {
                    tick: Math.floor((e.interval || 1e3) / 16.6),
                    heightRate: 1,
                    numberHeight: n.cutHeight,
                    current: 0,
                    stop: false
                };
                n.set = function(t) {
                    for (var e in t) {
                        u[e] = t[e];
                    }
                };
                n.getCurrentValue = function() {
                    return u.current;
                };
                n.setCurrentValue = function(t) {
                    u.current = t;
                    n.style.cutTop = u.current * u.heightRate * u.numberHeight;
                };
                n.scrollToValue = function(t, e) {
                    u.current = t;
                    n.style.cutTop = r.transition.linear(n.getStyle("sy"), u.current * u.heightRate * u.numberHeight, e || 200);
                };
                n.stop = function() {
                    u.stop = true;
                };
                n.restart = function() {
                    u.stop = false;
                    u.current = 0;
                    n.style.cutTop = 0;
                    o = 0;
                };
                n.hooks = {
                    ticked: function t() {
                        if (u.stop || ++o <= u.tick) return;
                        o = 1;
                        u.current++;
                        n.style.cutTop = u.current * u.heightRate * u.numberHeight;
                        if (u.current > 9) {
                            n.style.cutTop = 0;
                            u.current = 0;
                        }
                    }
                };
                return n;
            };
            if (window && window.Easycanvas) {
                r = window.Easycanvas;
                r.class.number = n;
            }
            t.exports = function(t) {
                r = t;
                t.class.number = n;
            };
        }
    });
});

