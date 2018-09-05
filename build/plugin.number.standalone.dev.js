(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var n = r();
        for (var s in n) (typeof exports === "object" ? exports : t)[s] = n[s];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var s = t[n] = {
                exports: {},
                id: n,
                loaded: false
            };
            e[n].call(s.exports, s, s.exports, r);
            s.loaded = true;
            return s.exports;
        }
        r.m = e;
        r.c = t;
        r.p = "";
        return r(0);
    }({
        0: function(e, t, r) {
            e.exports = r(82);
        },
        82: function(e, t) {
            "use strict";
            var r = void 0;
            var n = function e(t) {
                var n = new r.class.sprite(t);
                n.style = t.style;
                n.content.img = t.number;
                n.style.sx = 0;
                n.style.sw = n.style.sw || t.number.width;
                n.style.sh = Math.floor(n.style.sh || t.number.height / 10);
                var s = 0;
                var o = {
                    tick: Math.floor((t.interval || 1e3) / 16.6),
                    heightRate: 1,
                    numberHeight: n.style.sh,
                    current: 0,
                    stop: false
                };
                n.set = function(e) {
                    for (var t in e) {
                        o[t] = e[t];
                    }
                };
                n.getCurrentValue = function() {
                    return o.current;
                };
                n.setCurrentValue = function(e) {
                    o.current = e;
                    n.style.sy = o.current * o.heightRate * o.numberHeight;
                };
                n.scrollToValue = function(e, t) {
                    o.current = e;
                    n.style.sy = r.transition.linear(n.getStyle("sy"), o.current * o.heightRate * o.numberHeight, t || 200);
                };
                n.stop = function() {
                    o.stop = true;
                };
                n.restart = function() {
                    o.stop = false;
                    o.current = 0;
                    n.style.sy = 0;
                    s = 0;
                };
                n.hooks = {
                    ticked: function e() {
                        if (o.stop || ++s <= o.tick) return;
                        s = 1;
                        o.current++;
                        n.style.sy = o.current * o.heightRate * o.numberHeight;
                        if (o.current > 9) {
                            n.style.sy = 0;
                            o.current = 0;
                        }
                    }
                };
                return n;
            };
            if (window && window.Easycanvas) {
                r = window.Easycanvas;
                r.class.number = n;
            }
            e.exports = function(e) {
                r = e;
                e.class.number = n;
            };
        }
    });
});

