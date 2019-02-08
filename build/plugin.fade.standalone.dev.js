(function t(e, s) {
    if (typeof exports === "object" && typeof module === "object") module.exports = s(); else if (typeof define === "function" && define.amd) define([], s); else {
        var i = s();
        for (var h in i) (typeof exports === "object" ? exports : e)[h] = i[h];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function s(i) {
            if (e[i]) return e[i].exports;
            var h = e[i] = {
                exports: {},
                id: i,
                loaded: false
            };
            t[i].call(h.exports, h, h.exports, s);
            h.loaded = true;
            return h.exports;
        }
        s.m = t;
        s.c = e;
        s.p = "";
        return s(0);
    }({
        0: function(t, e, s) {
            t.exports = s(151);
        },
        151: function(t, e) {
            "use strict";
            var s = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=";
            var i = new Image();
            i.src = s;
            var h;
            var a = {
                drip: function t(e, s, a) {
                    var r = e.subtype || 1;
                    s.clearRect(0, 0, this.style.width, this.style.height);
                    s.globalCompositeOperation = "source-over";
                    s.globalAlpha = 1;
                    r === 1 && s.drawImage(i, (this.style.width >> 1) - (this.style.width >> 1) * e.progress * 2, (this.style.height >> 1) - (this.style.height >> 1) * e.progress * 2, this.style.width * e.progress * 2, this.style.height * e.progress * 2);
                    r !== 1 && s.drawImage(i, (this.style.width >> 1) - (this.style.width >> 1) * (1 - e.progress) * 2, (this.style.height >> 1) - (this.style.height >> 1) * (1 - e.progress) * 2, this.style.width * (1 - e.progress) * 2, this.style.height * (1 - e.progress) * 2);
                    s.globalCompositeOperation = r === 1 ? "source-out" : "source-in";
                    s.globalAlpha = Math.max(1 - e.progress, 0);
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);
                },
                door: function t(e, s, i) {
                    var a = e.subtype || 1;
                    var r = 0, l = 0;
                    if (a === 1) {
                        r = this.style.width / 2;
                    } else if (a === 2) {
                        r = this.style.width;
                        l = this.style.height / 2;
                    } else if (a === 3) {
                        r = this.style.width / 2;
                        l = this.style.height;
                    } else if (a === 4) {
                        l = this.style.height / 2;
                    }
                    s.clearRect(0, 0, this.style.width, this.style.height);
                    s.save();
                    s.translate(r, l);
                    s.rotate((a < 3 ? 1 : -1) * 90 * 3.14 / 180 * e.progress);
                    s.translate(-r, -l);
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0, r || this.style.width, this.style.height - l || l, 0, 0, r || this.style.width, this.style.height - l || l);
                    s.restore();
                    s.save();
                    s.translate(r, l);
                    s.rotate((a < 3 ? -1 : 1) * 90 * 3.14 / 180 * e.progress);
                    s.translate(-r, -l);
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), a < 4 ? this.style.width - r : 0, a < 3 ? l : a < 4 ? 0 : l, this.style.width - r || r, this.style.height - l || l, a < 4 ? this.style.width - r : 0, a < 3 ? l : a < 4 ? 0 : l, this.style.width - r || r, this.style.height - l || l);
                    s.restore();
                },
                rotate: function t(e, s, i) {
                    var a = e.subtype || 1;
                    var r = 0, l = 0;
                    if (a === 1) {
                        r = this.style.width;
                    } else if (a === 2) {
                        r = this.style.width;
                        l = this.style.height;
                    } else if (a === 3) {
                        l = this.style.height;
                    }
                    s.clearRect(0, 0, this.style.width, this.style.height);
                    s.save();
                    s.translate(r, l);
                    s.rotate(90 * 3.14 / 180 * e.progress);
                    s.translate(-r, -l);
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);
                    s.restore();
                },
                print: function t(e, s, i) {
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0);
                    var a = e.subtype || 1;
                    a === 1 && s.clearRect(0, 0, this.style.width, e.progress * this.style.height);
                    a === 2 && s.clearRect(0, 0, e.progress * this.style.width, this.style.height);
                    a === 3 && s.clearRect(0, (1 - e.progress) * this.style.height, this.style.width, this.style.height);
                    a === 4 && s.clearRect((1 - e.progress) * this.style.width, 0, this.style.width, this.style.height);
                },
                switch: function t(e, s, i) {
                    var a = e.progress * 1.3;
                    if (a === 0) {
                        i.fillStyle = "rgba(0, 0, 0, 1)";
                        i.globalAlpha = .2;
                    }
                    var r = e.subtype || 1;
                    r === 1 && i.fillRect(0, 0, this.style.width, a * this.style.height);
                    r === 2 && i.fillRect(0, 0, a * this.style.width, this.style.height);
                    r === 3 && i.fillRect(0, (1 - a) * this.style.height, this.style.width, this.style.height);
                    r === 4 && i.fillRect((1 - a) * this.style.width, 0, this.style.width, this.style.height);
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.width, this.style.height);
                    s.drawImage(i.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0);
                },
                sweep: function t(e, s, a) {
                    if (!e.particleData.length) {
                        var r = e.subtype || 1;
                        var l = this.style.height / this.style.width;
                        for (var o = 0; o < this.style.width / 50; o++) {
                            r === 1 && e.particleData.push({
                                x: 50 * o + Math.random() * this.style.width / 5 / 2 - this.style.width / 5,
                                y: 50 * l * o + Math.random() * this.style.height / 5 / 2 - this.style.height / 5,
                                size: 100 - o
                            });
                            r === 2 && e.particleData.push({
                                x: this.style.width - (50 * o + Math.random() * this.style.width / 5 / 2 - this.style.width / 5),
                                y: 50 * l * o + Math.random() * this.style.height / 5 / 2 - this.style.height / 5,
                                size: 100 - o
                            });
                            r === 3 && e.particleData.push({
                                x: this.style.width / 2,
                                y: 50 * l * o + Math.random() * this.style.height / 5 / 2 - this.style.height / 5,
                                size: 100 - o
                            });
                            r === 4 && e.particleData.push({
                                x: 50 * l * o + Math.random() * this.style.width / 5 / 2 - this.style.width / 5,
                                y: this.style.height / 2,
                                size: 100 - o
                            });
                        }
                    }
                    a.fillStyle = "rgba(0, 0, 0, 0.005)";
                    a.fillRect(0, 0, this.style.width, this.style.height);
                    a.globalAlpha = e.progress * e.progress;
                    e.particleData.forEach(function(t, s) {
                        if (t.size > e.size + e.minsize) return;
                        a.drawImage(i, t.x - t.size / 2, t.y - t.size / 2, t.size, t.size);
                        t.size = e.progress * e.size * 1.3;
                    });
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.width, this.style.height);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);
                },
                flow: function t(e, s, a) {
                    var r = this;
                    if (!e.particleData.length) {
                        for (var l = 0; l < this.style.width / 50; l++) {
                            e.particleData.push({
                                x: -100 + l * 50 + Math.random() * 40 - 20,
                                y: -Math.random() * 200 - 300,
                                extra: Math.random() * 20
                            });
                        }
                    }
                    a.fillStyle = "rgba(0, 0, 0, 0.01)";
                    a.fillRect(0, 0, this.style.width, this.style.height);
                    e.particleData.forEach(function(t) {
                        a.drawImage(i, t.x, t.y, 200, 200);
                        t.y += 1 / e.ticks * r.style.height + t.extra;
                    });
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.width, this.style.height);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.width, this.style.height);
                },
                spiral: function t(e, s, i) {
                    var a = e.subtype || 1;
                    i.translate(this.style.width / 2, this.style.height / 2);
                    i.rotate(360 / e.ticks * 3 * 3.14 / 180 * e.progress);
                    i.translate(-this.style.width / 2, -this.style.height / 2);
                    i.globalAlpha = e.progress * e.progress;
                    i.fillStyle = "rgba(0, 0, 0, 1)";
                    i.fillRect(this.style.width / 2 - e.size * e.progress / 2, this.style.height / 2 - e.size * e.progress / 2, e.size * e.progress, e.size * e.progress);
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.width, this.style.height);
                    s.drawImage(i.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(h.funcOrValue(this.$fade.originImg, this), 0, 0);
                }
            };
            var r = function t(e) {
                h = e.utils;
                e.class.sprite.prototype.fade = function(t) {
                    var e = t.type, s = t.ticks, i = t.subtype;
                    var r = this;
                    if (!r.$fade) {
                        r.$fade = {
                            originImg: r.content.img,
                            filterCanvas: document.createElement("canvas"),
                            middlewareCanvas: document.createElement("canvas")
                        };
                        r.$fade.filterCanvas.width = r.$fade.middlewareCanvas.width = r.style.width;
                        r.$fade.filterCanvas.height = r.$fade.middlewareCanvas.height = r.style.height;
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
                    l.subtype = i;
                    l.size = Math.max(r.style.width, r.style.height);
                    l.minsize = Math.min(r.style.width, r.style.height);
                    {
                        var o = document.createElement("canvas");
                        o.width = h.funcOrValue(r.style.width, r);
                        o.height = h.funcOrValue(r.style.height, r);
                        var g = o.getContext("2d");
                        g.drawImage(r.$canvas.$dom, r.$props.tx, r.$props.ty, r.$props.tw, r.$props.th, 0, 0, r.$props.tw, r.$props.th);
                        r.$fade.originImg = o;
                        r.children = [];
                    }
                    r.content.img = r.$fade.filterCanvas;
                    r.on("beforeTick", function t() {
                        if (!r.$fade) {
                            return;
                        }
                        a[e || "drip"].call(r, l, r.$fade.filterCxt, r.$fade.middlewareCxt);
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
                e.class.sprite.prototype.fade.types = [];
                for (var s in a) {
                    e.class.sprite.prototype.fade.types.push(s);
                }
            };
            t.exports = r;
        }
    });
});

