(function t(e, s) {
    if (typeof exports === "object" && typeof module === "object") module.exports = s(); else if (typeof define === "function" && define.amd) define([], s); else {
        var a = s();
        for (var i in a) (typeof exports === "object" ? exports : e)[i] = a[i];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function s(a) {
            if (e[a]) return e[a].exports;
            var i = e[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            t[a].call(i.exports, i, i.exports, s);
            i.loaded = true;
            return i.exports;
        }
        s.m = t;
        s.c = e;
        s.p = "";
        return s(0);
    }({
        0: function(t, e, s) {
            t.exports = s(52);
        },
        1: function(t, e) {
            "use strict";
            var s = {
                isArray: Array.isArray || function(t) {
                    return Object.prototype.toString.call(t) === "[object Array]";
                },
                funcOrValue: function t(e, s) {
                    if (typeof e === "function") {
                        var a = e.call(s);
                        return a;
                    }
                    return e;
                },
                execFuncs: function t(e, a, i) {
                    if (e) {
                        if (!s.isArray(i)) {
                            i = [ i ];
                        }
                    }
                    if (typeof e === "function") {
                        return e.apply(a, i);
                    } else if (s.isArray(e)) {
                        var r = [];
                        e.forEach(function(t) {
                            r.push(t && t.apply(a, i));
                        });
                        return r;
                    }
                },
                blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
                pointInRect: function t(e, s, a, i, r, l) {
                    return !(e < a || e > i || s < r || s > l);
                },
                firstValuable: function t(e, s, a) {
                    return typeof e === "undefined" ? typeof s === "undefined" ? a : s : e;
                }
            };
            t.exports = s;
        },
        52: function(t, e, s) {
            "use strict";
            var a = s(1);
            var i = r(a);
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            var l = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=";
            var o = new Image();
            o.src = l;
            var h = {
                drip: function t(e, s, a) {
                    var r = e.subtype || 1;
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.globalCompositeOperation = "source-over";
                    s.globalAlpha = 1;
                    r === 1 && s.drawImage(o, (this.style.tw >> 1) - (this.style.tw >> 1) * e.progress * 2, (this.style.th >> 1) - (this.style.th >> 1) * e.progress * 2, this.style.tw * e.progress * 2, this.style.th * e.progress * 2);
                    r !== 1 && s.drawImage(o, (this.style.tw >> 1) - (this.style.tw >> 1) * (1 - e.progress) * 2, (this.style.th >> 1) - (this.style.th >> 1) * (1 - e.progress) * 2, this.style.tw * (1 - e.progress) * 2, this.style.th * (1 - e.progress) * 2);
                    s.globalCompositeOperation = r === 1 ? "source-out" : "source-in";
                    s.globalAlpha = Math.max(1 - e.progress, 0);
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                },
                door: function t(e, s, a) {
                    var r = e.subtype || 1;
                    var l = 0, o = 0;
                    if (r === 1) {
                        l = this.style.tw / 2;
                    } else if (r === 2) {
                        l = this.style.tw;
                        o = this.style.th / 2;
                    } else if (r === 3) {
                        l = this.style.tw / 2;
                        o = this.style.th;
                    } else if (r === 4) {
                        o = this.style.th / 2;
                    }
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.save();
                    s.translate(l, o);
                    s.rotate((r < 3 ? 1 : -1) * 90 * 3.14 / 180 * e.progress);
                    s.translate(-l, -o);
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0, l || this.style.tw, this.style.th - o || o, 0, 0, l || this.style.tw, this.style.th - o || o);
                    s.restore();
                    s.save();
                    s.translate(l, o);
                    s.rotate((r < 3 ? -1 : 1) * 90 * 3.14 / 180 * e.progress);
                    s.translate(-l, -o);
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), r < 4 ? this.style.tw - l : 0, r < 3 ? o : r < 4 ? 0 : o, this.style.tw - l || l, this.style.th - o || o, r < 4 ? this.style.tw - l : 0, r < 3 ? o : r < 4 ? 0 : o, this.style.tw - l || l, this.style.th - o || o);
                    s.restore();
                },
                rotate: function t(e, s, a) {
                    var r = e.subtype || 1;
                    var l = 0, o = 0;
                    if (r === 1) {
                        l = this.style.tw;
                    } else if (r === 2) {
                        l = this.style.tw;
                        o = this.style.th;
                    } else if (r === 3) {
                        o = this.style.th;
                    }
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.save();
                    s.translate(l, o);
                    s.rotate(90 * 3.14 / 180 * e.progress);
                    s.translate(-l, -o);
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                    s.restore();
                },
                print: function t(e, s, a) {
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0);
                    var r = e.subtype || 1;
                    r === 1 && s.clearRect(0, 0, this.style.tw, e.progress * this.style.th);
                    r === 2 && s.clearRect(0, 0, e.progress * this.style.tw, this.style.th);
                    r === 3 && s.clearRect(0, (1 - e.progress) * this.style.th, this.style.tw, this.style.th);
                    r === 4 && s.clearRect((1 - e.progress) * this.style.tw, 0, this.style.tw, this.style.th);
                },
                switch: function t(e, s, a) {
                    var r = e.progress * 1.3;
                    if (r === 0) {
                        a.fillStyle = "rgba(0, 0, 0, 1)";
                        a.globalAlpha = .2;
                    }
                    var l = e.subtype || 1;
                    l === 1 && a.fillRect(0, 0, this.style.tw, r * this.style.th);
                    l === 2 && a.fillRect(0, 0, r * this.style.tw, this.style.th);
                    l === 3 && a.fillRect(0, (1 - r) * this.style.th, this.style.tw, this.style.th);
                    l === 4 && a.fillRect((1 - r) * this.style.tw, 0, this.style.tw, this.style.th);
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0);
                },
                sweep: function t(e, s, a) {
                    if (!e.particleData.length) {
                        var r = e.subtype || 1;
                        var l = this.style.th / this.style.tw;
                        for (var h = 0; h < this.style.tw / 50; h++) {
                            r === 1 && e.particleData.push({
                                x: 50 * h + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5,
                                y: 50 * l * h + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
                                size: 100 - h
                            });
                            r === 2 && e.particleData.push({
                                x: this.style.tw - (50 * h + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5),
                                y: 50 * l * h + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
                                size: 100 - h
                            });
                            r === 3 && e.particleData.push({
                                x: this.style.tw / 2,
                                y: 50 * l * h + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
                                size: 100 - h
                            });
                            r === 4 && e.particleData.push({
                                x: 50 * l * h + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5,
                                y: this.style.th / 2,
                                size: 100 - h
                            });
                        }
                    }
                    a.fillStyle = "rgba(0, 0, 0, 0.005)";
                    a.fillRect(0, 0, this.style.tw, this.style.th);
                    a.globalAlpha = e.progress * e.progress;
                    e.particleData.forEach(function(t, s) {
                        if (t.size > e.size + e.minsize) return;
                        a.drawImage(o, t.x - t.size / 2, t.y - t.size / 2, t.size, t.size);
                        t.size = e.progress * e.size * 1.3;
                    });
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                },
                flow: function t(e, s, a) {
                    var r = this;
                    if (!e.particleData.length) {
                        for (var l = 0; l < this.style.tw / 50; l++) {
                            e.particleData.push({
                                x: -100 + l * 50 + Math.random() * 40 - 20,
                                y: -Math.random() * 200 - 300,
                                extra: Math.random() * 20
                            });
                        }
                    }
                    a.fillStyle = "rgba(0, 0, 0, 0.01)";
                    a.fillRect(0, 0, this.style.tw, this.style.th);
                    e.particleData.forEach(function(t) {
                        a.drawImage(o, t.x, t.y, 200, 200);
                        t.y += 1 / e.ticks * r.style.th + t.extra;
                    });
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                },
                spiral: function t(e, s, a) {
                    var r = e.subtype || 1;
                    a.translate(this.style.tw / 2, this.style.th / 2);
                    a.rotate(360 / e.ticks * 3 * 3.14 / 180 * e.progress);
                    a.translate(-this.style.tw / 2, -this.style.th / 2);
                    a.globalAlpha = e.progress * e.progress;
                    a.fillStyle = "rgba(0, 0, 0, 1)";
                    a.fillRect(this.style.tw / 2 - e.size * e.progress / 2, this.style.th / 2 - e.size * e.progress / 2, e.size * e.progress, e.size * e.progress);
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.default.funcOrValue(this.$fade.originImg, this), 0, 0);
                }
            };
            window.Easycanvas.class.sprite.prototype.fade = function(t) {
                var e = t.type, s = t.ticks, a = t.subtype;
                var r = this;
                if (!r.$fade) {
                    r.$fade = {
                        originImg: r.content.img,
                        filterCanvas: document.createElement("canvas"),
                        middlewareCanvas: document.createElement("canvas")
                    };
                    r.$fade.filterCanvas.width = r.$fade.middlewareCanvas.width = r.style.tw;
                    r.$fade.filterCanvas.height = r.$fade.middlewareCanvas.height = r.style.th;
                    r.$fade.filterCxt = r.$fade.filterCanvas.getContext("2d");
                    r.$fade.middlewareCxt = r.$fade.middlewareCanvas.getContext("2d");
                    r.$fade.filterCxt.$canvas = r.$fade.filterCanvas;
                    r.$fade.middlewareCxt.$canvas = r.$fade.middlewareCanvas;
                }
                var l = {
                    ticks: 0,
                    progress: 0,
                    callback: false,
                    particleData: []
                };
                l.ticks = s || 60;
                l.subtype = a;
                l.size = Math.max(r.style.tw, r.style.th);
                l.minsize = Math.min(r.style.tw, r.style.th);
                {
                    var o = document.createElement("canvas");
                    o.width = i.default.funcOrValue(r.style.tw, r);
                    o.height = i.default.funcOrValue(r.style.th, r);
                    var n = o.getContext("2d");
                    n.drawImage(r.$canvas.$dom, r.getStyle("tx"), r.getStyle("ty"));
                    r.$fade.originImg = o;
                    r.children = [];
                }
                r.content.img = r.$fade.filterCanvas;
                r.on("beforeTick", function t() {
                    if (!r.$fade) {
                        return;
                    }
                    h[e || "drip"].call(r, l, r.$fade.filterCxt, r.$fade.middlewareCxt);
                    if (l.progress > 1) {
                        r.off("beforeTick", t);
                        r.style.opacity = 0;
                        delete r.$fade;
                        if (l.callback) {
                            r.$canvas.nextTick(function() {
                                l.callback.call(r);
                            });
                        }
                        return;
                    }
                    l.progress += 1 / (s || 100);
                });
                return {
                    then: function t(e) {
                        l.callback = e;
                    }
                };
            };
            window.Easycanvas.class.sprite.prototype.fade.types = [];
            for (var n in h) {
                window.Easycanvas.class.sprite.prototype.fade.types.push(n);
            }
        }
    });
});

