(function e(t, o) {
    if (typeof exports === "object" && typeof module === "object") module.exports = o(); else if (typeof define === "function" && define.amd) define([], o); else {
        var r = o();
        for (var n in r) (typeof exports === "object" ? exports : t)[n] = r[n];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function o(r) {
            if (t[r]) return t[r].exports;
            var n = t[r] = {
                exports: {},
                id: r,
                loaded: false
            };
            e[r].call(n.exports, n, n.exports, o);
            n.loaded = true;
            return n.exports;
        }
        o.m = e;
        o.c = t;
        o.p = "";
        return o(0);
    }({
        0: function(e, t, o) {
            e.exports = o(89);
        },
        89: function(e, t) {
            "use strict";
            var o = {};
            var r = function e(t, r) {
                if (o[t]) return o[t];
                var n = {
                    width: 0,
                    height: 0
                };
                o[t] = n;
                wx.getImageInfo({
                    src: t,
                    success: function e(t) {
                        console.log(t);
                        n.width = t.width;
                        n.height = t.height;
                        n.url = t.path;
                        if (r) r(n);
                    }
                });
                return n;
            };
            var n = function e(t) {
                t.imgLoader = r;
            };
            var f = function e(t, o) {
                if (t.props[0]) {
                    t.props[0] = t.props[0].url;
                }
            };
            var i, s;
            var a = false;
            var u = function e(t) {
                i = t.touches[0] ? t.touches[0].x : i;
                s = t.touches[0] ? t.touches[0].y : s;
                var o = {
                    type: t.type,
                    targetTouches: [ {
                        pageX: i,
                        pageY: s
                    } ],
                    currentTarget: {
                        offsetLeft: 0,
                        offsetTop: 0
                    },
                    preventDefault: function e() {}
                };
                a = t.type !== "touchmove" && t.type !== "longtap";
                this.$eventHandler(o);
                if (t.type === "touchend") {
                    var o = {
                        type: "click",
                        targetTouches: [ {
                            pageX: i,
                            pageY: s
                        } ],
                        currentTarget: {
                            offsetLeft: 0,
                            offsetTop: 0
                        },
                        preventDefault: function e() {
                            a = false;
                        }
                    };
                    this.$eventHandler(o);
                }
            };
            var p = function e() {
                this.imgLoader = r;
                this.handle = u;
            };
            e.exports = {
                onUse: n,
                onRender: f,
                onCreate: p
            };
        }
    });
});

