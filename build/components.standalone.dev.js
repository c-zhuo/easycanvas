(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var l = r();
        for (var o in l) (typeof exports === "object" ? exports : t)[o] = l[o];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function r(l) {
            if (t[l]) return t[l].exports;
            var o = t[l] = {
                exports: {},
                id: l,
                loaded: false
            };
            e[l].call(o.exports, o, o.exports, r);
            o.loaded = true;
            return o.exports;
        }
        r.m = e;
        r.c = t;
        r.p = "";
        return r(0);
    }({
        0: function(e, t, r) {
            e.exports = r(101);
        },
        1: function(e, t) {
            "use strict";
            var r = {
                isArray: Array.isArray || function(e) {
                    return Object.prototype.toString.call(e) === "[object Array]";
                },
                funcOrValue: function e(t, r) {
                    if (typeof t === "function") {
                        return t.call(r);
                    }
                    return t;
                },
                execFuncs: function e(t, l, o) {
                    if (t) {
                        if (!r.isArray(o)) {
                            o = [ o ];
                        }
                    }
                    if (typeof t === "function") {
                        t.apply(l, o);
                    } else if (r.isArray(t)) {
                        t.length && t.forEach(function(e) {
                            e && e.apply(l, o);
                        });
                    }
                },
                blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
                pointInRect: function e(t, r, l, o, n, i) {
                    return !(t < l || t > o || r < n || r > i);
                },
                firstValuable: function e(t, r, l) {
                    return typeof t === "undefined" ? typeof r === "undefined" ? l : r : t;
                }
            };
            e.exports = r;
        },
        3: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var r = typeof window !== "undefined";
            t.default = function(e, t) {
                if (r && window.Easycanvas) {
                    Easycanvas.class[t] = function(t) {
                        return e(Easycanvas.sprite, t);
                    };
                }
            };
        },
        15: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var l = {};
            var o = "\n".slice(0, 1);
            var n = function e(t, r) {
                var n = String(t);
                var i = n + JSON.stringify(r);
                r.fontSize = r.fontSize || 16;
                if (l[i]) {
                    return l[i];
                }
                var a;
                if (r.padding) {
                    a = r.padding.split(" ");
                    a = a.map(function(e) {
                        return parseInt(e);
                    });
                    a[1] = Number(a[1] || a[0]);
                    a[2] = Number(a[2] || a[0]);
                    a[3] = Number(a[3] || a[1]);
                } else {
                    a = [ 0, 0, 0, 0 ];
                }
                var s = r.minWidth || r.width || (r.fontSize || 16) * n.length + a[1] + a[3] + 100;
                var c = n.split("\n").length;
                var u = r.fontSize * (Math.round(n.length) / s + c - 1) * (r.lineHeight || r.fontSize) + a[0] + a[2] + 100;
                var f = document.createElement("canvas");
                f.width = s;
                f.height = u;
                var d = f.getContext("2d");
                window.tempCanvas = f;
                window.tempCtx = d;
                d.textBaseline = "middle";
                d.font = (r.fontStyle ? r.fontStyle + " " : "") + r.fontSize + "px " + (r.family || "serif");
                d.fillStyle = r.color || "#000";
                d.textAlign = r.textAlign || "left";
                if (true) {
                    var h = [];
                    h.push("var tempCanvas = document.createElement('canvas')");
                    h.push("tempCanvas.width=" + f.width);
                    h.push("tempCanvas.height=" + f.height);
                    h.push("var tempCtx = tempCanvas.getContext('2d')");
                    h.push("tempCtx.textBaseline='" + d.textBaseline + "'");
                    h.push("tempCtx.font='" + d.font + "'");
                    h.push("tempCtx.fillStyle='" + d.fillStyle + "'");
                    h.push("tempCtx.textAlign='" + d.textAlign + "'");
                }
                var v = 0;
                var p = r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0;
                var g = 0;
                var m = 1;
                var y = 0;
                var S = 0;
                var $ = 1;
                while (true) {
                    S = d.measureText(n.slice(g, m)).width;
                    if (S > r.width) {
                        if (r.textOverflow === "ellipsis") {
                            m -= 2;
                            d.fillText(n.slice(g, m) + "...", v, p + r.fontSize / 2);
                            if (true) {
                                h.push("tempCtx.fillText('" + n.slice(g, m) + "...', " + v + ", " + (p + r.fontSize / 2) + ")");
                            }
                            p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0);
                            $++;
                            y = r.width - a[1] - a[3];
                            break;
                        } else {
                            m -= 1;
                            d.fillText(n.slice(g, m), v, p + r.fontSize / 2);
                            if (true) {
                                h.push("tempCtx.fillText('" + n.slice(g, m) + "', " + v + ", " + (p + r.fontSize / 2) + ")");
                            }
                            g = m;
                            m = g + 1;
                            p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 10);
                            $++;
                        }
                    } else {
                        if (m > n.length - 1) {
                            if (S > y) y = S;
                            d.fillText(n.slice(g, m), v, p + r.fontSize / 2);
                            if (true) {
                                h.push("tempCtx.fillText('" + n.slice(g, m) + "', " + v + ", " + (p + r.fontSize / 2) + ")");
                            }
                            p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0);
                            break;
                        } else if (n.slice(m, m + 1) === o) {
                            d.fillText(n.slice(g, m), v, p + r.fontSize / 2);
                            m += 1;
                            g = m;
                            m = g + 1;
                            p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 10);
                            $++;
                        }
                        if (S > y) y = S;
                        m++;
                    }
                }
                var x = document.createElement("canvas");
                x.lastLineLeft = S;
                x.lineCount = $;
                x.width = Math.max(y + a[1] + a[3], r.minWidth || 0);
                x.height = p + a[0] + a[2];
                var b = x.getContext("2d");
                if (true) {
                    h.push("var finalCanvas=document.createElement('canvas')");
                    h.push("finalCanvas.width=" + x.width);
                    h.push("finalCanvas.height=" + x.height);
                    h.push("var finalCtx = finalCanvas.getContext('2d')");
                }
                if (r.backgroundColor) {
                    b.fillStyle = r.backgroundColor;
                    b.fillRect(0, 0, x.width, x.height);
                    if (true) {
                        h.push("finalCtx.fillStyle=" + b.fillStyle);
                        h.push("finalCtx.fillRect(0, 0, " + x.width + ", " + x.height + ")");
                    }
                }
                b.drawImage(f, (x.width - y) / 2, a[0]);
                if (r.border) {
                    var w = r.border.split(" ");
                    var Y = w.pop();
                    if (w[w.length - 1] === "solid") w.pop();
                    var T = w[0];
                    var O = w[1] || T;
                    var _ = w[2] || T;
                    var M = w[3] || O || T;
                    T = parseInt(T);
                    O = parseInt(O);
                    _ = parseInt(_);
                    M = parseInt(M);
                    var P = r.borderRadius || 0;
                    b.beginPath();
                    b.strokeStyle = Y;
                    if (T) {
                        b.lineWidth = T;
                        b.moveTo(M ? P : 0, 0);
                        b.lineTo(x.width - (O ? P : 0), 0);
                    }
                    if (O) {
                        b.lineWidth = O;
                        b.moveTo(x.width, T ? P : 0);
                        b.lineTo(x.width, x.height - (_ ? P : 0));
                    }
                    if (_) {
                        b.lineWidth = _;
                        b.moveTo(M ? P : 0, x.height);
                        b.lineTo(x.width - (O ? P : 0), x.height);
                    }
                    if (M) {
                        b.lineWidth = M;
                        b.moveTo(0, T ? P : 0);
                        b.lineTo(0, x.height - (_ ? P : 0));
                    }
                    b.stroke();
                    if (P) {
                        var X = document.createElement("canvas");
                        var C = Math.min(x.width, x.height);
                        X.width = X.height = C;
                        var H = X.getContext("2d");
                        H.beginPath();
                        H.strokeStyle = Y;
                        H.arc(C >> 1, C >> 1, (C >> 1) - 1, 0, 2 * Math.PI);
                        H.stroke();
                        if (T && O) {
                            b.drawImage(X, C >> 1, 0, C >> 1, C >> 1, x.width - P, 0, P, P);
                        }
                        if (_ && O) {
                            b.drawImage(X, C >> 1, C >> 1, C >> 1, C >> 1, x.width - P, x.height - P, P, P);
                        }
                        if (T && M) {
                            b.drawImage(X, 0, 0, C >> 1, C >> 1, 0, 0, P, P);
                        }
                        if (_ && M) {
                            b.drawImage(X, 0, C >> 1, C >> 1, C >> 1, 0, x.height - P, P, P);
                        }
                    }
                }
                if (true) {
                    x.$origin = h;
                }
                l[i] = x;
                return x;
            };
            t.default = n;
        },
        16: function(e, t, r) {
            "use strict";
            var l = r(1);
            var o = Math.PI;
            var n = function e(t) {
                return t.$lastPaintTime || Date.now();
            };
            var i = {
                linear: function e(t, r, l) {
                    var o = n(this);
                    var i = false;
                    var a = void 0;
                    var s = function() {
                        var e = this.$lastPaintTime;
                        var n = (e - o) / l;
                        var c = (r - t) * n + t;
                        if (i) {
                            if (r > t) {
                                while (c > r) {
                                    c -= r - t;
                                }
                            } else {
                                while (c < r) {
                                    c += t - r;
                                }
                            }
                        } else {
                            if (r > t && c > r) {
                                s.$done = true;
                                c = r;
                            } else if (r < t && c < r) {
                                s.$done = true;
                                c = r;
                            }
                        }
                        if (n >= 1 && a) {
                            a.call(this, c);
                            a = null;
                        }
                        return c;
                    }.bind(this);
                    s.loop = function() {
                        i = true;
                        return s;
                    };
                    s.restart = function() {
                        o = n(this);
                        return s;
                    };
                    s.then = function(e) {
                        a = e;
                        return s;
                    };
                    return s;
                },
                pendulum: function e(t, r, l, i) {
                    var a = n(this);
                    var s = i || {};
                    s.start = s.start || 0;
                    var c = false;
                    var u = void 0;
                    var f = s.cycle || 1;
                    var d = function() {
                        var e = n(this);
                        var i = (e - a) / l;
                        if (!c) {
                            if (f) {
                                if (i > f) {
                                    i = f;
                                    d.$done = true;
                                    i = f;
                                }
                            } else if (i > 1) {
                                d.$done = true;
                                i = 1;
                            }
                        } else {
                            if (f) {
                                i %= f;
                            }
                        }
                        var h = i * o * 2 - o / 2 + s.start / 360 * o;
                        var v = (r - t) * (Math.sin(h) + 1) / 2 + t;
                        if (i >= f && u) {
                            u.call(this, v);
                            u = null;
                        }
                        return v;
                    }.bind(this);
                    d.loop = function() {
                        c = true;
                        return d;
                    };
                    d.restart = function() {
                        a = n(this);
                        return d;
                    };
                    d.then = function(e) {
                        u = e;
                        return d;
                    };
                    return d;
                },
                ease: function e(t, r, l) {
                    return this.pendulum(t, r, l * 2, {
                        cycle: .5
                    });
                },
                oneByOne: function e(t) {
                    var r = t;
                    var l = false;
                    var o = function e() {
                        for (var t = 0; t < r.length; t++) {
                            if (!r[t].$done) {
                                return r[t]();
                            } else if (!r[t].$nextRestart) {
                                r[t].$nextRestart = true;
                                if (r[t + 1]) {
                                    r[t + 1].restart();
                                    return r[t + 1]();
                                }
                            }
                        }
                        if (l) {
                            for (var o = 0; o < r.length; o++) {
                                r[o].$done = false;
                                r[o].$nextRestart = false;
                                r[o].restart();
                            }
                            return r[0]();
                        }
                        return r[r.length - 1]();
                    };
                    o.loop = function() {
                        l = true;
                        return o;
                    };
                    return o;
                }
            };
            var a = function e(t, r, o, n, a) {
                var s = (0, l.funcOrValue)(t[r]);
                if (true) {
                    if (typeof s === "undefined") {
                        console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                    }
                }
                s = s || 0;
                t[r] = i[o].bind(e)(s, n, a);
            };
            for (var s in i) {
                a[s] = i[s];
            }
            e.exports = a;
        },
        22: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var l = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var l in r) {
                        if (Object.prototype.hasOwnProperty.call(r, l)) {
                            e[l] = r[l];
                        }
                    }
                }
                return e;
            };
            var o = r(15);
            var n = s(o);
            var i = r(3);
            var a = s(i);
            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var c = {
                padding: 0,
                width: 300,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var u = function e(t, r) {
                t.buttonStyleNormal = l(c, {
                    minWidth: r.style.width,
                    lineHeight: r.style.height,
                    padding: 0
                }, r.props.normal);
                t.buttonStyleHovered = l({}, t.buttonStyleNormal, r.props.hovered);
                t.buttonStylePressed = l({}, t.buttonStyleNormal, r.props.pressed);
                t.imageNormal = (0, n.default)(r.props.text || "", t.buttonStyleNormal);
                t.imageHovered = r.props.hovered && (0, n.default)(r.props.text || "", t.buttonStyleHovered);
                t.imagePressed = r.props.pressed && (0, n.default)(r.props.text || "", t.buttonStylePressed);
            };
            var f = function e(t, r) {
                var l = void 0;
                var o = r || {};
                r.props = r.props || {};
                var n = {
                    buttonStyleNormal: undefined,
                    buttonStyleHovered: undefined,
                    buttonStylePressed: undefined,
                    imageNormal: undefined,
                    imageHovered: undefined,
                    imagePressed: undefined
                };
                u(n, r);
                var i = {};
                r.events = r.events || {};
                i.touchmove = i.mousemove = function() {
                    l.content.img = n.imageHovered || n.imageNormal;
                };
                i.touchstart = i.mousedown = function() {
                    l.content.img = n.imagePressed || n.imageHovered || n.imageNormal;
                };
                i.touchend = i.touchout = i.mouseout = function() {
                    l.content.img = n.imageNormal;
                };
                i.mouseup = function() {
                    l.content.img = n.imageHovered || n.imageNormal;
                };
                i.click = function(e) {
                    r.events.click && r.events.click.call(l, e);
                };
                l = new t({
                    name: r.name || "button_" + r.props.text,
                    content: {
                        img: n.imageNormal
                    },
                    style: r.style,
                    props: r.props,
                    events: i,
                    hooks: r.hooks
                });
                l.update = function(e) {
                    this.__proto__.update.call(this, e);
                    u(n, r);
                    l.content.img = n.imageNormal;
                };
                return l;
            };
            (0, a.default)(f, "button");
            t.default = f;
        },
        23: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var l = r(3);
            var o = n(l);
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var i = function e(t, r) {
                var l = void 0;
                var o = r || {};
                o.name = o.name || "Image";
                l = new t(o);
                l.content.img = o.src;
                Object.defineProperty(l, "src", {
                    get: function e() {
                        return l.content.img ? l.content.img.src : "";
                    },
                    set: function e(t) {
                        l.content.img = t;
                    }
                });
                return l;
            };
            (0, o.default)(i, "image");
            t.default = i;
        },
        24: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var l = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var l in r) {
                        if (Object.prototype.hasOwnProperty.call(r, l)) {
                            e[l] = r[l];
                        }
                    }
                }
                return e;
            };
            var o = r(1);
            var n = r(16);
            var i = c(n);
            var a = r(3);
            var s = c(a);
            function c(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var u = void 0;
            var f = function e(t, r) {
                return Math.abs(t) < Math.abs(r) ? t : r;
            };
            var d = {
                loose: function e(t) {
                    t.$scroll.touching = false;
                },
                looper: function e(t) {
                    if (!t.$scroll || !t.$scroll.$scrolling) return;
                    if (Math.abs(t.$scroll.speedX) > 1) {
                        t.$scroll.speedX *= t.scroll.smooth || .8;
                    } else {
                        t.$scroll.speedX = 0;
                    }
                    if (Math.abs(t.$scroll.speedY) > 1) {
                        t.$scroll.speedY *= t.scroll.smooth || .8;
                    } else {
                        t.$scroll.speedY = 0;
                    }
                    if (Math.abs(t.$scroll.speedX) <= 1 && Math.abs(t.$scroll.speedY) <= 1) {
                        t.$scroll.$scrolling = false;
                        t.$scroll.$wheeling = false;
                        return;
                    }
                    if (t.$scroll.touching) {
                        return;
                    }
                    t.scroll.scrollY -= t.$scroll.speedY;
                    t.scroll.scrollX -= t.$scroll.speedX;
                    if (!t.$scroll.touching && !t.$scroll.$wheeling && Math.abs(t.$scroll.speedY) < 50 && t.scroll.anchors && t.scroll.anchors.length) {
                        var r = t.scroll.anchorsRange || 400;
                        for (var l = 0; l < t.scroll.anchors.length; l++) {
                            var n = t.scroll.anchors[l];
                            var i = t.scroll.scrollY - n;
                            if (i > 0 && i < r && t.$scroll.speedY > 0 || i < 0 && i > -r && t.$scroll.speedY < 0) {
                                t.trigger("scrollTo", n, 200);
                                t.$scroll.speedY = 0;
                                break;
                            }
                        }
                    }
                    var a = (0, o.funcOrValue)(t.scroll.minScrollX, t);
                    var s = (0, o.funcOrValue)(t.scroll.maxScrollX, t);
                    var c = (0, o.funcOrValue)(t.scroll.minScrollY, t);
                    var u = (0, o.funcOrValue)(t.scroll.maxScrollY, t);
                    if (!isNaN(c) && t.scroll.scrollY < c) {
                        t.scroll.scrollY = c;
                    } else if (!isNaN(u) && t.scroll.scrollY > u) {
                        t.scroll.scrollY = u;
                        t.broadcast("scrolledToBottom");
                        t.$scroll.speedY = 0;
                    }
                    if (!isNaN(a) && t.scroll.scrollX < a) {
                        t.scroll.scrollX = a;
                    } else if (!isNaN(s) && t.scroll.scrollX > s) {
                        t.scroll.scrollX = s;
                    }
                },
                touch: function e(t, r) {
                    var l = Date.now();
                    t.$scroll.$wheeling = false;
                    if (!t.$scroll.touching) {
                        t.$scroll.touching = l;
                        t.$scroll.quickTouch = l;
                        t.$scroll.lastTouchSpeed = 0;
                        t.$scroll.startPos.x = r.canvasX;
                        t.$scroll.startPos.y = r.canvasY;
                        t.$scroll.lastScrollSpeed = t.$scroll.speedX || t.$scroll.speedY;
                        t.$scroll.speedX = 0;
                        t.$scroll.speedY = 0;
                    } else {
                        t.$scroll.$scrolling = true;
                        var n = t.$scroll.startPos.x - r.canvasX;
                        var i = t.$scroll.startPos.y - r.canvasY;
                        var a = l - t.$scroll.touching;
                        t.$scroll.touching = l;
                        var s = (0, o.funcOrValue)(t.scroll.minScrollX, t);
                        var c = (0, o.funcOrValue)(t.scroll.maxScrollX, t);
                        var u = (0, o.funcOrValue)(t.scroll.minScrollY, t);
                        var d = (0, o.funcOrValue)(t.scroll.maxScrollY, t);
                        if (t.scroll.scrollX + n < s || t.scroll.scrollX + n > c) {
                            if (t.scroll.flexible || t.scroll.flexibleX) n >>= 3; else n = 0;
                        }
                        if (t.scroll.scrollY + i < u || t.scroll.scrollY + i > d) {
                            if (t.scroll.flexible || t.scroll.flexibleY) i >>= 3; else i = 0;
                        }
                        if ((0, o.funcOrValue)(t.scroll.scrollableX, t) && Math.abs(n) >= 1 && a > 1) {
                            var h = (r.canvasX - t.$scroll.startPos.x) / a * 25;
                            if (t.$scroll.lastScrollSpeed * h > 0 && Math.abs(h) > 15) {
                                h += f(h, t.$scroll.lastScrollSpeed);
                            }
                            t.$scroll.speedX = (t.$scroll.lastTouchSpeed + h) / (t.$scroll.lastTouchSpeed ? 2 : 1);
                            t.$scroll.lastTouchSpeed = h;
                            t.scroll.scrollX += n;
                        }
                        if ((0, o.funcOrValue)(t.scroll.scrollableY, t) && Math.abs(i) >= 1 && a > 1) {
                            var v = (r.canvasY - t.$scroll.startPos.y) / a * 25;
                            if (t.$scroll.lastScrollSpeed * v > 0 && Math.abs(v) > 15) {
                                v += f(v, t.$scroll.lastScrollSpeed);
                            }
                            t.$scroll.speedY = (t.$scroll.lastTouchSpeed + v) / (t.$scroll.lastTouchSpeed ? 2 : 1);
                            t.$scroll.lastTouchSpeed = v;
                            t.scroll.scrollY += i;
                        }
                        t.$scroll.startPos.x = r.canvasX;
                        t.$scroll.startPos.y = r.canvasY;
                        if (Math.abs(n) > Math.abs(i) + 1) return 1; else if (Math.abs(n) < Math.abs(i) - 1) return 2;
                    }
                },
                wheel: function e(t, r) {
                    t.$scroll.speedX = (0, o.funcOrValue)(t.scroll.scrollableX, t) ? r.event.wheelDeltaX : 0;
                    t.$scroll.speedY = (0, o.funcOrValue)(t.scroll.scrollableY, t) ? r.event.wheelDeltaY : 0;
                    t.$scroll.$scrolling = true;
                    t.$scroll.$wheeling = true;
                    r.stopPropagation();
                }
            };
            var h = function e(t, r) {
                var o = false;
                var n = false;
                var a = r || {};
                a.scroll = l({
                    scrollX: 0,
                    scrollY: 0,
                    scrollableX: function e() {
                        return (this.style.overflowX || this.style.overflow) !== "visible";
                    },
                    scrollableY: function e() {
                        return (this.style.overflowY || this.style.overflow) !== "visible";
                    },
                    minScrollX: 0,
                    maxScrollX: function e() {
                        var t = this;
                        var r = 0;
                        this.getChildren().forEach(function(e) {
                            var l = e.getSelfStyle("left") + e.getSelfStyle("width") - t.getStyle("width");
                            if (l > r) r = l;
                        });
                        return r;
                    },
                    minScrollY: 0,
                    maxScrollY: function e() {
                        var t = this;
                        var r = 0;
                        this.getChildren().forEach(function(e) {
                            var l = e.getSelfStyle("top") + e.getSelfStyle("height") - t.getStyle("height");
                            if (l > r) r = l;
                        });
                        return r;
                    },
                    propagationX: false,
                    propagationY: false
                }, r.scroll);
                var s = function e() {
                    if (o) {
                        f.scroll.scrollX = o();
                    }
                    if (n) {
                        f.scroll.scrollY = n();
                    }
                    if (!o && !n) {
                        f.off("ticked", e);
                    }
                };
                var c = false;
                a.events = l({
                    touchstart: function e(t) {
                        d.loose(this);
                        c = true;
                        u = false;
                        d.touch(this, t);
                        if (!f.scroll.propagationX && !f.scroll.propagationY) {
                            t.stopPropagation();
                        }
                    },
                    touchmove: function e(t) {
                        if (!c) return;
                        if (u && this !== u) {
                            return;
                        }
                        var r = d.touch(this, t);
                        if (r === 1 && f.scroll.propagationY) {
                            t.stopPropagation();
                            u = this;
                        } else if (r === 2 && f.scroll.propagationX) {
                            t.stopPropagation();
                            u = this;
                        }
                    },
                    mousewheel: function e(t) {
                        c = true;
                        d.wheel(this, t);
                        t.stopPropagation();
                    },
                    touchend: function e() {
                        c = false;
                        d.loose(this);
                    },
                    mouseup: function e() {
                        c = false;
                        d.loose(this);
                    }
                }, a.events || {});
                if (a.scroll.capture) {
                    a.events.interceptor = function(e) {
                        if (f.events[e.type]) {
                            f.events[e.type].call(f, e);
                            return false;
                        }
                        return e;
                    };
                }
                var f = new t(a);
                f.on("ticked", function() {
                    d.looper(f);
                });
                f.on("scrollTo", function(e, t, r) {
                    var l = void 0;
                    o = i.default.ease(f.scroll.scrollY, e, r || 200, {
                        cycle: .5
                    }).then(function() {
                        o = false;
                        l && l();
                        l = false;
                    });
                    n = i.default.ease(f.scroll.scrollY, t, r || 200, {
                        cycle: .5
                    }).then(function() {
                        n = false;
                        l && l();
                        l = false;
                    });
                    f.on("ticked", s);
                    return {
                        then: function e(t) {
                            l = t;
                        }
                    };
                });
                f.$scroll = {
                    speedX: 0,
                    speedY: 0,
                    touching: false,
                    startPos: {},
                    lastTouchSpeed: 0,
                    lastScrollSpeed: 0
                };
                var h = f.add({
                    name: "scrolling-element",
                    style: {
                        left: function e() {
                            return -this.$parent.scroll.scrollX;
                        },
                        top: function e() {
                            return -this.$parent.scroll.scrollY;
                        }
                    }
                });
                f.add = h.add.bind(h);
                f.clear = h.clear.bind(h);
                f.getChildren = function() {
                    return h.children;
                };
                return f;
            };
            (0, s.default)(h, "scroll");
            t.default = h;
        },
        25: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var l = r(1);
            var o = r(3);
            var n = i(o);
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var a = function e(t, r) {
                var o = new t(r);
                r.props.index = r.props.index || 0;
                o.on("beforeTick", function() {
                    var e = this.props;
                    var t = (0, l.funcOrValue)(this.content.img, this);
                    if (!t || !t.width) return;
                    var r = e.index || 0;
                    if (r < 0) r = 0;
                    var o = void 0, n = void 0;
                    if (e.frameWidth || e.frameHeight) {
                        if (e.frameWidth < 0) {
                            o = t.width / -e.frameWidth;
                        } else {
                            o = e.frameWidth;
                        }
                        if (e.frameHeight < 0) {
                            n = t.height / -e.frameHeight;
                        } else {
                            n = e.frameHeight;
                        }
                        var i = Math.floor(t.width / o);
                        var a = Math.floor(t.height / n);
                        this.style.cutLeft = r % i * o;
                        this.style.cutTop = Math.floor(r / i) % a * n;
                    }
                    if (!e.loop && r > 0 && this.style.cutLeft === 0 && this.style.cutTop === 0) {
                        this.style.img = undefined;
                        if (e.onOver) {
                            e.onOver.call(this);
                        } else {
                            this.remove();
                        }
                    }
                    e.lastFrameTime = e.lastFrameTime || 0;
                    if (this.$canvas.$nextTickTime - e.lastFrameTime >= (0, l.funcOrValue)(e.interval, this)) {
                        e.lastFrameTime = this.$canvas.$nextTickTime;
                        e.index++;
                    }
                    this.style.cutWidth = this.style.cutWidth || o;
                    this.style.cutHeight = this.style.cutHeight || n;
                    this.style.width = this.style.width || o;
                    this.style.height = this.style.height || n;
                });
                return o;
            };
            (0, n.default)(a, "sequence");
            t.default = a;
        },
        26: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var l = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var l in r) {
                        if (Object.prototype.hasOwnProperty.call(r, l)) {
                            e[l] = r[l];
                        }
                    }
                }
                return e;
            };
            var o = r(15);
            var n = s(o);
            var i = r(3);
            var a = s(i);
            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var c = {
                padding: 0,
                width: 300,
                lineHeight: 100,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var u = function e(t) {
                t.content.img = t.text ? (0, n.default)(t.text, l({}, c, {
                    lineHeight: t.style.fontSize
                }, t.style)) : undefined;
            };
            var f = function e(t, r) {
                var l = void 0;
                r.name = r.name || "Text";
                l = new t(r);
                u(l);
                Object.defineProperty(l, "text", {
                    get: function e() {
                        return l.content.text;
                    },
                    set: function e(t) {
                        l.content.img = text;
                    }
                });
                l.update = function(e) {
                    this.__proto__.update.call(this, e);
                    u(this);
                };
                return l;
            };
            (0, a.default)(f, "text");
            t.default = f;
        },
        27: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            var l = r(3);
            var o = n(l);
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var i = function e(t, r) {
                var l = void 0;
                var o = r || {};
                o.name = o.name || "View";
                l = new t(o);
                return l;
            };
            (0, o.default)(i, "view");
            t.default = i;
        },
        101: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.View = t.Text = t.Sequence = t.Scroll = t.Image = t.Button = undefined;
            var l = r(22);
            var o = p(l);
            var n = r(23);
            var i = p(n);
            var a = r(24);
            var s = p(a);
            var c = r(25);
            var u = p(c);
            var f = r(26);
            var d = p(f);
            var h = r(27);
            var v = p(h);
            function p(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            t.Button = o.default;
            t.Image = i.default;
            t.Scroll = s.default;
            t.Sequence = u.default;
            t.Text = d.default;
            t.View = v.default;
        }
    });
});

