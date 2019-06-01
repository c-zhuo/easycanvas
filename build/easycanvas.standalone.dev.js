(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var i = r();
        for (var n in i) (typeof exports === "object" ? exports : t)[n] = i[n];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function r(i) {
            if (t[i]) return t[i].exports;
            var n = t[i] = {
                exports: {},
                id: i,
                loaded: false
            };
            e[i].call(n.exports, n, n.exports, r);
            n.loaded = true;
            return n.exports;
        }
        r.m = e;
        r.c = t;
        r.p = "";
        return r(0);
    }([ function(e, t, r) {
        e.exports = r(102);
    }, function(e, t) {
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
            execFuncs: function e(t, i, n) {
                if (t) {
                    if (!r.isArray(n)) {
                        n = [ n ];
                    }
                }
                if (typeof t === "function") {
                    t.apply(i, n);
                } else if (r.isArray(t)) {
                    t.length && t.forEach(function(e) {
                        e && e.apply(i, n);
                    });
                }
            },
            blend: [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ],
            pointInRect: function e(t, r, i, n, a, o) {
                return !(t < i || t > n || r < a || r > o);
            },
            firstValuable: function e(t, r, i) {
                return typeof t === "undefined" ? typeof r === "undefined" ? i : r : t;
            }
        };
        e.exports = r;
    }, , function(e, t) {
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
    }, function(e, t) {
        "use strict";
        var r = [ "cutLeft", "cutTop", "cutWidth", "cutHeight" ];
        var i = [ "left", "top", "width", "height" ];
        var n = r.concat(i);
        var a = n.concat([ "locate", "rx", "ry", "zIndex", "textFont", "textAlign", "textVerticalAlign", "color", "rotate", "scale", "opacity", "backgroundColor", "border", "overflow", "overflowX", "overflowY" ]);
        e.exports = {
            txywh: i,
            sxywh: r,
            xywh: n,
            styles: a,
            devFlag: "__EASYCANVAS_DEVTOOL__",
            version: "0.7.4"
        };
    }, , , , , , function(e, t) {
        "use strict";
        var r = 3.141593;
        e.exports = function(e, t, i, n, a, o) {
            var l = a ? -a / 180 * r : 0;
            var s = e, c = t;
            if (a) {
                s = (e - i) * Math.cos(l) - (t - n) * Math.sin(l) + i;
                c = (e - i) * Math.sin(l) + (t - n) * Math.cos(l) + n;
            }
            if (o) {
                return [ s, c ];
            }
            return {
                x: s,
                y: c
            };
        };
    }, , , , , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = {};
        var n = "\n".slice(0, 1);
        var a = function e(t, r) {
            var a = String(t);
            var o = a + JSON.stringify(r);
            r.fontSize = r.fontSize || 16;
            if (i[o]) {
                return i[o];
            }
            var l;
            if (r.padding) {
                l = r.padding.split(" ");
                l = l.map(function(e) {
                    return parseInt(e);
                });
                l[1] = Number(l[1] || l[0]);
                l[2] = Number(l[2] || l[0]);
                l[3] = Number(l[3] || l[1]);
            } else {
                l = [ 0, 0, 0, 0 ];
            }
            var s = r.minWidth || r.width || (r.fontSize || 16) * a.length + l[1] + l[3] + 100;
            var c = a.split("\n").length;
            var f = r.fontSize * (Math.round(a.length) / s + c - 1) * (r.lineHeight || r.fontSize) + l[0] + l[2] + 100;
            var u = document.createElement("canvas");
            u.width = s;
            u.height = f;
            var d = u.getContext("2d");
            window.tempCanvas = u;
            window.tempCtx = d;
            d.textBaseline = "middle";
            d.font = (r.fontStyle ? r.fontStyle + " " : "") + r.fontSize + "px " + (r.family || "serif");
            d.fillStyle = r.color || "#000";
            d.textAlign = r.textAlign || "left";
            if (true) {
                var h = [];
                h.push("var tempCanvas = document.createElement('canvas')");
                h.push("tempCanvas.width=" + u.width);
                h.push("tempCanvas.height=" + u.height);
                h.push("var tempCtx = tempCanvas.getContext('2d')");
                h.push("tempCtx.textBaseline='" + d.textBaseline + "'");
                h.push("tempCtx.font='" + d.font + "'");
                h.push("tempCtx.fillStyle='" + d.fillStyle + "'");
                h.push("tempCtx.textAlign='" + d.textAlign + "'");
            }
            var v = 0;
            var p = r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0;
            var g = 0;
            var $ = 1;
            var m = 0;
            var y = 0;
            var b = 1;
            while (true) {
                y = d.measureText(a.slice(g, $)).width;
                if (y > r.width) {
                    if (r.textOverflow === "ellipsis") {
                        $ -= 2;
                        d.fillText(a.slice(g, $) + "...", v, p + r.fontSize / 2);
                        if (true) {
                            h.push("tempCtx.fillText('" + a.slice(g, $) + "...', " + v + ", " + (p + r.fontSize / 2) + ")");
                        }
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0);
                        b++;
                        m = r.width - l[1] - l[3];
                        break;
                    } else {
                        $ -= 1;
                        d.fillText(a.slice(g, $), v, p + r.fontSize / 2);
                        if (true) {
                            h.push("tempCtx.fillText('" + a.slice(g, $) + "', " + v + ", " + (p + r.fontSize / 2) + ")");
                        }
                        g = $;
                        $ = g + 1;
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 10);
                        b++;
                    }
                } else {
                    if ($ > a.length - 1) {
                        if (y > m) m = y;
                        d.fillText(a.slice(g, $), v, p + r.fontSize / 2);
                        if (true) {
                            h.push("tempCtx.fillText('" + a.slice(g, $) + "', " + v + ", " + (p + r.fontSize / 2) + ")");
                        }
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 0);
                        break;
                    } else if (a.slice($, $ + 1) === n) {
                        d.fillText(a.slice(g, $), v, p + r.fontSize / 2);
                        $ += 1;
                        g = $;
                        $ = g + 1;
                        p += r.fontSize + (r.lineHeight ? (r.lineHeight - r.fontSize) / 2 : 10);
                        b++;
                    }
                    if (y > m) m = y;
                    $++;
                }
            }
            var w = document.createElement("canvas");
            w.lastLineLeft = y;
            w.lineCount = b;
            w.width = Math.max(m + l[1] + l[3], r.minWidth || 0);
            w.height = p + l[0] + l[2];
            var x = w.getContext("2d");
            if (true) {
                h.push("var finalCanvas=document.createElement('canvas')");
                h.push("finalCanvas.width=" + w.width);
                h.push("finalCanvas.height=" + w.height);
                h.push("var finalCtx = finalCanvas.getContext('2d')");
            }
            if (r.backgroundColor) {
                x.fillStyle = r.backgroundColor;
                x.fillRect(0, 0, w.width, w.height);
                if (true) {
                    h.push("finalCtx.fillStyle=" + x.fillStyle);
                    h.push("finalCtx.fillRect(0, 0, " + w.width + ", " + w.height + ")");
                }
            }
            x.drawImage(u, (w.width - m) / 2, l[0]);
            if (r.border) {
                var S = r.border.split(" ");
                var T = S.pop();
                if (S[S.length - 1] === "solid") S.pop();
                var k = S[0];
                var _ = S[1] || k;
                var M = S[2] || k;
                var A = S[3] || _ || k;
                k = parseInt(k);
                _ = parseInt(_);
                M = parseInt(M);
                A = parseInt(A);
                var O = r.borderRadius || 0;
                x.beginPath();
                x.strokeStyle = T;
                if (k) {
                    x.lineWidth = k;
                    x.moveTo(A ? O : 0, 0);
                    x.lineTo(w.width - (_ ? O : 0), 0);
                }
                if (_) {
                    x.lineWidth = _;
                    x.moveTo(w.width, k ? O : 0);
                    x.lineTo(w.width, w.height - (M ? O : 0));
                }
                if (M) {
                    x.lineWidth = M;
                    x.moveTo(A ? O : 0, w.height);
                    x.lineTo(w.width - (_ ? O : 0), w.height);
                }
                if (A) {
                    x.lineWidth = A;
                    x.moveTo(0, k ? O : 0);
                    x.lineTo(0, w.height - (M ? O : 0));
                }
                x.stroke();
                if (O) {
                    var C = document.createElement("canvas");
                    var E = Math.min(w.width, w.height);
                    C.width = C.height = E;
                    var I = C.getContext("2d");
                    I.beginPath();
                    I.strokeStyle = T;
                    I.arc(E >> 1, E >> 1, (E >> 1) - 1, 0, 2 * Math.PI);
                    I.stroke();
                    if (k && _) {
                        x.drawImage(C, E >> 1, 0, E >> 1, E >> 1, w.width - O, 0, O, O);
                    }
                    if (M && _) {
                        x.drawImage(C, E >> 1, E >> 1, E >> 1, E >> 1, w.width - O, w.height - O, O, O);
                    }
                    if (k && A) {
                        x.drawImage(C, 0, 0, E >> 1, E >> 1, 0, 0, O, O);
                    }
                    if (M && A) {
                        x.drawImage(C, 0, E >> 1, E >> 1, E >> 1, 0, w.height - O, O, O);
                    }
                }
            }
            if (true) {
                w.$origin = h;
            }
            i[o] = w;
            return w;
        };
        t.default = a;
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = Math.PI;
        var a = function e(t) {
            return t.$lastPaintTime || Date.now();
        };
        var o = {
            linear: function e(t, r, i) {
                var n = a(this);
                var o = false;
                var l = void 0;
                var s = function() {
                    var e = this.$lastPaintTime;
                    var a = (e - n) / i;
                    var c = (r - t) * a + t;
                    if (o) {
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
                    if (a >= 1 && l) {
                        l.call(this, c);
                        l = null;
                    }
                    return c;
                }.bind(this);
                s.loop = function() {
                    o = true;
                    return s;
                };
                s.restart = function() {
                    n = a(this);
                    return s;
                };
                s.then = function(e) {
                    l = e;
                    return s;
                };
                return s;
            },
            pendulum: function e(t, r, i, o) {
                var l = a(this);
                var s = o || {};
                s.start = s.start || 0;
                var c = false;
                var f = void 0;
                var u = s.cycle || 1;
                var d = function() {
                    var e = a(this);
                    var o = (e - l) / i;
                    if (!c) {
                        if (u) {
                            if (o > u) {
                                o = u;
                                d.$done = true;
                                o = u;
                            }
                        } else if (o > 1) {
                            d.$done = true;
                            o = 1;
                        }
                    } else {
                        if (u) {
                            o %= u;
                        }
                    }
                    var h = o * n * 2 - n / 2 + s.start / 360 * n;
                    var v = (r - t) * (Math.sin(h) + 1) / 2 + t;
                    if (o >= u && f) {
                        f.call(this, v);
                        f = null;
                    }
                    return v;
                }.bind(this);
                d.loop = function() {
                    c = true;
                    return d;
                };
                d.restart = function() {
                    l = a(this);
                    return d;
                };
                d.then = function(e) {
                    f = e;
                    return d;
                };
                return d;
            },
            ease: function e(t, r, i) {
                return this.pendulum(t, r, i * 2, {
                    cycle: .5
                });
            },
            oneByOne: function e(t) {
                var r = t;
                var i = false;
                var n = function e() {
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
                    if (i) {
                        for (var n = 0; n < r.length; n++) {
                            r[n].$done = false;
                            r[n].$nextRestart = false;
                            r[n].restart();
                        }
                        return r[0]();
                    }
                    return r[r.length - 1]();
                };
                n.loop = function() {
                    i = true;
                    return n;
                };
                return n;
            }
        };
        var l = function e(t, r, n, a, l) {
            var s = (0, i.funcOrValue)(t[r]);
            if (true) {
                if (typeof s === "undefined") {
                    console.warn("[Easycanvas] start value in transition is undefined, using 0 instead.");
                }
            }
            s = s || 0;
            t[r] = o[n].bind(e)(s, a, l);
        };
        for (var s in o) {
            l[s] = o[s];
        }
        e.exports = l;
    }, , function(e, t, r) {
        "use strict";
        var i = r(10);
        var n = l(i);
        var a = r(33);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r, i, n, a, l, s, c, f, u) {
            if (!u) {
                if (t > a + s) return false;
                if (a > t + i) return false;
                if (e > n + l) return false;
                if (n > e + r) return false;
            }
            var d = (0, o.default)(e, t, n, a, l, s, c, f, u) || (0, o.default)(e + r, t, n, a, l, s, c, f, u) || (0, 
            o.default)(e, t + i, n, a, l, s, c, f, u) || (0, o.default)(e + r, t + i, n, a, l, s, c, f, u);
            if (d) return true;
            var h = (0, o.default)(n, a, e, t, r, i, c, f, -u) || (0, o.default)(n + l, a, e, t, r, i, c, f, -u) || (0, 
            o.default)(n, a + s, e, t, r, i, c, f, -u) || (0, o.default)(n + l, a + s, e, t, r, i, c, f, -u);
            if (h) return true;
            if (t > a && t + i < a + s && e < n && e + r > n + l) return true;
            if (e > n && e + r < n + l && t < a && t + i > a + s) return true;
            return false;
        };
    }, , , , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(15);
        var a = s(n);
        var o = r(3);
        var l = s(o);
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
        var f = function e(t, r) {
            t.buttonStyleNormal = i(c, {
                minWidth: r.style.width,
                lineHeight: r.style.height,
                padding: 0
            }, r.props.normal);
            t.buttonStyleHovered = i({}, t.buttonStyleNormal, r.props.hovered);
            t.buttonStylePressed = i({}, t.buttonStyleNormal, r.props.pressed);
            t.imageNormal = (0, a.default)(r.props.text || "", t.buttonStyleNormal);
            t.imageHovered = r.props.hovered && (0, a.default)(r.props.text || "", t.buttonStyleHovered);
            t.imagePressed = r.props.pressed && (0, a.default)(r.props.text || "", t.buttonStylePressed);
        };
        var u = function e(t, r) {
            var i = void 0;
            var n = r || {};
            r.props = r.props || {};
            var a = {
                buttonStyleNormal: undefined,
                buttonStyleHovered: undefined,
                buttonStylePressed: undefined,
                imageNormal: undefined,
                imageHovered: undefined,
                imagePressed: undefined
            };
            f(a, r);
            var o = {};
            r.events = r.events || {};
            o.touchmove = o.mousemove = function() {
                i.content.img = a.imageHovered || a.imageNormal;
            };
            o.touchstart = o.mousedown = function() {
                i.content.img = a.imagePressed || a.imageHovered || a.imageNormal;
            };
            o.touchend = o.touchout = o.mouseout = function() {
                i.content.img = a.imageNormal;
            };
            o.mouseup = function() {
                i.content.img = a.imageHovered || a.imageNormal;
            };
            o.click = function(e) {
                r.events.click && r.events.click.call(i, e);
            };
            i = new t({
                name: r.name || "button_" + r.props.text,
                content: {
                    img: a.imageNormal
                },
                style: r.style,
                props: r.props,
                events: o,
                hooks: r.hooks
            });
            i.update = function(e) {
                this.__proto__.update.call(this, e);
                f(a, r);
                i.content.img = a.imageNormal;
            };
            return i;
        };
        (0, l.default)(u, "button");
        t.default = u;
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = r(3);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = function e(t, r) {
            var i = void 0;
            var n = r || {};
            n.name = n.name || "Image";
            i = new t(n);
            i.content.img = n.src;
            Object.defineProperty(i, "src", {
                get: function e() {
                    return i.content.img ? i.content.img.src : "";
                },
                set: function e(t) {
                    i.content.img = t;
                }
            });
            return i;
        };
        (0, n.default)(o, "image");
        t.default = o;
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(1);
        var a = r(16);
        var o = c(a);
        var l = r(3);
        var s = c(l);
        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = void 0;
        var u = function e(t, r) {
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
                    for (var i = 0; i < t.scroll.anchors.length; i++) {
                        var a = t.scroll.anchors[i];
                        var o = t.scroll.scrollY - a;
                        if (o > 0 && o < r && t.$scroll.speedY > 0 || o < 0 && o > -r && t.$scroll.speedY < 0) {
                            t.trigger("scrollTo", a, 200);
                            t.$scroll.speedY = 0;
                            break;
                        }
                    }
                }
                var l = (0, n.funcOrValue)(t.scroll.minScrollX, t);
                var s = (0, n.funcOrValue)(t.scroll.maxScrollX, t);
                var c = (0, n.funcOrValue)(t.scroll.minScrollY, t);
                var f = (0, n.funcOrValue)(t.scroll.maxScrollY, t);
                if (!isNaN(c) && t.scroll.scrollY < c) {
                    t.scroll.scrollY = c;
                } else if (!isNaN(f) && t.scroll.scrollY > f) {
                    t.scroll.scrollY = f;
                    t.broadcast("scrolledToBottom");
                    t.$scroll.speedY = 0;
                }
                if (!isNaN(l) && t.scroll.scrollX < l) {
                    t.scroll.scrollX = l;
                } else if (!isNaN(s) && t.scroll.scrollX > s) {
                    t.scroll.scrollX = s;
                }
            },
            touch: function e(t, r) {
                var i = Date.now();
                t.$scroll.$wheeling = false;
                if (!t.$scroll.touching) {
                    t.$scroll.touching = i;
                    t.$scroll.quickTouch = i;
                    t.$scroll.lastTouchSpeed = 0;
                    t.$scroll.startPos.x = r.canvasX;
                    t.$scroll.startPos.y = r.canvasY;
                    t.$scroll.lastScrollSpeed = t.$scroll.speedX || t.$scroll.speedY;
                    t.$scroll.speedX = 0;
                    t.$scroll.speedY = 0;
                } else {
                    t.$scroll.$scrolling = true;
                    var a = t.$scroll.startPos.x - r.canvasX;
                    var o = t.$scroll.startPos.y - r.canvasY;
                    var l = i - t.$scroll.touching;
                    t.$scroll.touching = i;
                    var s = (0, n.funcOrValue)(t.scroll.minScrollX, t);
                    var c = (0, n.funcOrValue)(t.scroll.maxScrollX, t);
                    var f = (0, n.funcOrValue)(t.scroll.minScrollY, t);
                    var d = (0, n.funcOrValue)(t.scroll.maxScrollY, t);
                    if (t.scroll.scrollX + a < s || t.scroll.scrollX + a > c) {
                        if (t.scroll.flexible || t.scroll.flexibleX) a >>= 3; else a = 0;
                    }
                    if (t.scroll.scrollY + o < f || t.scroll.scrollY + o > d) {
                        if (t.scroll.flexible || t.scroll.flexibleY) o >>= 3; else o = 0;
                    }
                    if ((0, n.funcOrValue)(t.scroll.scrollableX, t) && Math.abs(a) >= 1 && l > 1) {
                        var h = (r.canvasX - t.$scroll.startPos.x) / l * 25;
                        if (t.$scroll.lastScrollSpeed * h > 0 && Math.abs(h) > 15) {
                            h += u(h, t.$scroll.lastScrollSpeed);
                        }
                        t.$scroll.speedX = (t.$scroll.lastTouchSpeed + h) / (t.$scroll.lastTouchSpeed ? 2 : 1);
                        t.$scroll.lastTouchSpeed = h;
                        t.scroll.scrollX += a;
                    }
                    if ((0, n.funcOrValue)(t.scroll.scrollableY, t) && Math.abs(o) >= 1 && l > 1) {
                        var v = (r.canvasY - t.$scroll.startPos.y) / l * 25;
                        if (t.$scroll.lastScrollSpeed * v > 0 && Math.abs(v) > 15) {
                            v += u(v, t.$scroll.lastScrollSpeed);
                        }
                        t.$scroll.speedY = (t.$scroll.lastTouchSpeed + v) / (t.$scroll.lastTouchSpeed ? 2 : 1);
                        t.$scroll.lastTouchSpeed = v;
                        t.scroll.scrollY += o;
                    }
                    t.$scroll.startPos.x = r.canvasX;
                    t.$scroll.startPos.y = r.canvasY;
                    if (Math.abs(a) > Math.abs(o) + 1) return 1; else if (Math.abs(a) < Math.abs(o) - 1) return 2;
                }
            },
            wheel: function e(t, r) {
                t.$scroll.speedX = (0, n.funcOrValue)(t.scroll.scrollableX, t) ? r.event.wheelDeltaX : 0;
                t.$scroll.speedY = (0, n.funcOrValue)(t.scroll.scrollableY, t) ? r.event.wheelDeltaY : 0;
                t.$scroll.$scrolling = true;
                t.$scroll.$wheeling = true;
                r.stopPropagation();
            }
        };
        var h = function e(t, r) {
            var n = false;
            var a = false;
            var l = r || {};
            l.scroll = i({
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
                        var i = e.getSelfStyle("left") + e.getSelfStyle("width") - t.getStyle("width");
                        if (i > r) r = i;
                    });
                    return r;
                },
                minScrollY: 0,
                maxScrollY: function e() {
                    var t = this;
                    var r = 0;
                    this.getChildren().forEach(function(e) {
                        var i = e.getSelfStyle("top") + e.getSelfStyle("height") - t.getStyle("height");
                        if (i > r) r = i;
                    });
                    return r;
                },
                propagationX: false,
                propagationY: false
            }, r.scroll);
            var s = function e() {
                if (n) {
                    u.scroll.scrollX = n();
                }
                if (a) {
                    u.scroll.scrollY = a();
                }
                if (!n && !a) {
                    u.off("ticked", e);
                }
            };
            var c = false;
            l.events = i({
                touchstart: function e(t) {
                    d.loose(this);
                    c = true;
                    f = false;
                    d.touch(this, t);
                    if (!u.scroll.propagationX && !u.scroll.propagationY) {
                        t.stopPropagation();
                    }
                },
                touchmove: function e(t) {
                    if (!c) return;
                    if (f && this !== f) {
                        return;
                    }
                    var r = d.touch(this, t);
                    if (r === 1 && u.scroll.propagationY) {
                        t.stopPropagation();
                        f = this;
                    } else if (r === 2 && u.scroll.propagationX) {
                        t.stopPropagation();
                        f = this;
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
            }, l.events || {});
            if (l.scroll.capture) {
                l.events.interceptor = function(e) {
                    if (u.events[e.type]) {
                        u.events[e.type].call(u, e);
                        return false;
                    }
                    return e;
                };
            }
            var u = new t(l);
            u.on("ticked", function() {
                d.looper(u);
            });
            u.on("scrollTo", function(e, t, r) {
                var i = void 0;
                n = o.default.ease(u.scroll.scrollY, e, r || 200, {
                    cycle: .5
                }).then(function() {
                    n = false;
                    i && i();
                    i = false;
                });
                a = o.default.ease(u.scroll.scrollY, t, r || 200, {
                    cycle: .5
                }).then(function() {
                    a = false;
                    i && i();
                    i = false;
                });
                u.on("ticked", s);
                return {
                    then: function e(t) {
                        i = t;
                    }
                };
            });
            u.$scroll = {
                speedX: 0,
                speedY: 0,
                touching: false,
                startPos: {},
                lastTouchSpeed: 0,
                lastScrollSpeed: 0
            };
            var h = u.add({
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
            u.add = h.add.bind(h);
            u.clear = h.clear.bind(h);
            u.getChildren = function() {
                return h.children;
            };
            return u;
        };
        (0, s.default)(h, "scroll");
        t.default = h;
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = r(1);
        var n = r(3);
        var a = o(n);
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var l = function e(t, r) {
            var n = new t(r);
            r.props.index = r.props.index || 0;
            n.on("beforeTick", function() {
                var e = this.props;
                var t = (0, i.funcOrValue)(this.content.img, this);
                if (!t || !t.width) return;
                var r = e.index || 0;
                if (r < 0) r = 0;
                var n = void 0, a = void 0;
                if (e.frameWidth || e.frameHeight) {
                    if (e.frameWidth < 0) {
                        n = t.width / -e.frameWidth;
                    } else {
                        n = e.frameWidth;
                    }
                    if (e.frameHeight < 0) {
                        a = t.height / -e.frameHeight;
                    } else {
                        a = e.frameHeight;
                    }
                    var o = Math.floor(t.width / n);
                    var l = Math.floor(t.height / a);
                    this.style.cutLeft = r % o * n;
                    this.style.cutTop = Math.floor(r / o) % l * a;
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
                if (this.$canvas.$nextTickTime - e.lastFrameTime >= (0, i.funcOrValue)(e.interval, this)) {
                    e.lastFrameTime = this.$canvas.$nextTickTime;
                    e.index++;
                }
                this.style.cutWidth = this.style.cutWidth || n;
                this.style.cutHeight = this.style.cutHeight || a;
                this.style.width = this.style.width || n;
                this.style.height = this.style.height || a;
            });
            return n;
        };
        (0, a.default)(l, "sequence");
        t.default = l;
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(15);
        var a = s(n);
        var o = r(3);
        var l = s(o);
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
        var f = function e(t) {
            t.content.img = t.text ? (0, a.default)(t.text, i({}, c, {
                lineHeight: t.style.fontSize
            }, t.style)) : undefined;
        };
        var u = function e(t, r) {
            var i = void 0;
            r.name = r.name || "Text";
            i = new t(r);
            f(i);
            Object.defineProperty(i, "text", {
                get: function e() {
                    return i.content.text;
                },
                set: function e(t) {
                    i.content.img = text;
                }
            });
            i.update = function(e) {
                this.__proto__.update.call(this, e);
                f(this);
            };
            return i;
        };
        (0, l.default)(u, "text");
        t.default = u;
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = r(3);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = function e(t, r) {
            var i = void 0;
            var n = r || {};
            n.name = n.name || "View";
            i = new t(n);
            return i;
        };
        (0, n.default)(o, "view");
        t.default = o;
    }, , , , function(e, t) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var i = {};
        var n = [];
        var a = "processing";
        var o = Image;
        var l = 0;
        var s = function e(t, a, s) {
            var c = s || {};
            var f = e.cacheCanvas;
            if ((typeof t === "undefined" ? "undefined" : r(t)) === "object") {
                var u = t;
                c.callbackArgs = c.callbackArgs || [];
                e(u.shift(), function(t) {
                    c.callbackArgs.push(t);
                    if (u.length > 1) {
                        e(u, a, c);
                    } else {
                        e(u[0], function(e) {
                            c.callbackArgs.push(e);
                            a(c.callbackArgs);
                        }, c);
                    }
                }, s);
                return;
            }
            var d = t + "_" + JSON.stringify(s) + "_" + f;
            if (i[d]) {
                if (a) {
                    if (i[d].width && a) {
                        a(i[d]);
                    } else {
                        setTimeout(function() {
                            e(t, a, s);
                        }, 100);
                    }
                    return;
                } else {
                    return i[d];
                }
            }
            var h = new o();
            h._complete = false;
            if (c.block) {
                h.src = t;
                l++;
            } else if (l === 0) {
                h.src = t;
            } else {
                n.push({
                    imgObj: h,
                    src: t
                });
            }
            i[d] = h;
            var v = void 0;
            if (c.canvas || c.alphaColor || f) {
                v = document.createElement("canvas");
                v.width = v.height || 0;
                i[d] = v;
            }
            h.onload = function(e) {
                h._complete = true;
                if (h.src.substr(-3) === "jpg" || h.src.substr(-3) === "jpeg" || h.src.substr(-3) === "bmp") {
                    h.$noAlpha = true;
                } else if (h.src.indexOf("data:image/jpg;") === 0) {
                    h.$noAlpha = true;
                }
                if (c.block) {
                    l--;
                    if (l === 0) {
                        n.forEach(function(e) {
                            e.imgObj.src = e.src;
                        });
                        n.splice(0);
                    }
                }
                if (v && (c.canvas || c.alphaColor || f)) {
                    var t = v.getContext("2d");
                    v.width = h.width;
                    v.height = h.height;
                    v.$noAlpha = h.$noAlpha;
                    t.drawImage(h, 0, 0);
                    if (c.alphaColor) {
                        var r = t.getImageData(0, 0, h.width, h.height);
                        var i = [];
                        for (var o = 0; o < r.data.length; o += 4) {
                            var s = r.data[o] + r.data[o + 1] + r.data[o + 2];
                            var u = 1;
                            if (r.data[o] < u && r.data[o + 1] < u && r.data[o + 2] < u) {
                                r.data[o + 3] = Math.floor(s / 255);
                            }
                        }
                        t.putImageData(r, 0, 0);
                        v.$noAlpha = false;
                    }
                    h = v;
                }
                if (a) {
                    a(h);
                }
            };
            h.onerror = function() {
                i[d] = h;
            };
            return v || h;
        };
        s.cacheCanvas = false;
        e.exports = s;
    }, function(e, t) {
        "use strict";
        var r = "processing";
        var i = {};
        function n(e, t) {
            if (e && e.match(/^data:/)) {
                t && t(e);
                return;
            }
            if (i[e]) {
                if (i[e] !== r) {
                    t(i[e]);
                } else {
                    setTimeout(function() {
                        n(e, t);
                    }, 100);
                }
                return;
            }
            i[e] = r;
            var a = new XMLHttpRequest();
            a.onload = function() {
                var r = new FileReader();
                r.onloadend = function() {
                    i[e] = r.result;
                    t && t(r.result);
                };
                r.readAsDataURL(a.response);
            };
            a.open("GET", e);
            a.responseType = "blob";
            a.send();
        }
        e.exports = n;
    }, function(e, t, r) {
        "use strict";
        var i = r(10);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = 3.141593;
        e.exports = function(e, t, r, i, n, a, l, s, c) {
            var f = c ? -c / 180 * o : 0;
            if (f) {
                e = (e - l) * Math.cos(f) - (t - s) * Math.sin(f) + l;
                t = (e - l) * Math.sin(f) + (t - s) * Math.cos(f) + s;
            }
            return e >= r && e <= r + n && t >= i && t <= i + a;
        };
    }, , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = r(1);
        var a = C(n);
        var o = r(4);
        var l = C(o);
        var s = r(97);
        var c = C(s);
        var f = r(96);
        var u = C(f);
        var d = r(47);
        var h = C(d);
        var v = r(48);
        var p = C(v);
        var g = r(99);
        var $ = C(g);
        var m = r(92);
        var y = C(m);
        var b = r(94);
        var w = C(b);
        var x = r(95);
        var S = C(x);
        var T = r(93);
        var k = C(T);
        var _ = r(100);
        var M = C(_);
        var A = r(98);
        var O = C(A);
        function C(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var E = 0;
        var I = function e(t) {
            if (t.children) {
                t.children.forEach(function(r, i) {
                    if (!r.$id) {
                        t.children[i] = new V(r);
                    }
                    if (t.$id && !t.$dom) {
                        t.children[i].$canvas = t.$canvas;
                        t.children[i].$parent = t;
                    } else {
                        t.children[i].$canvas = t;
                    }
                    e(t.children[i]);
                });
            }
        };
        var P = function e(t, r) {
            var i = t || {};
            if (!i.$id) {
                i.$id = Math.random().toString(36).substr(2);
            }
            i.$tickedTimes = i.$tickedTimes || 0;
            i.content = i.content || {};
            i.style = i.style || {};
            i.style.scale = a.default.firstValuable(i.style.scale, 1);
            i.style.opacity = a.default.firstValuable(i.style.opacity, 1);
            i.style.zIndex = i.style.zIndex || 0;
            i.style.locate = i.style.locate || "center";
            var n = a.default.funcOrValue(i.content.img);
            r.$cache = {};
            r.$render = {};
            r.$style = {};
            r.$needUpdate = {};
            i.hooks = i.hooks || {};
            l.default.styles.concat([ "visible" ]).forEach(function(e) {
                r.$cache[e] = undefined;
                r.$style[e] = i.style[e];
                if (typeof i.style[e] === "function") {
                    r.$style[e] = i.style[e].bind(r);
                }
                if (l.default.xywh.indexOf(e) > -1) {
                    r.$style[e] = r.$style[e] || 0;
                } else if ([ "opacity", "scale" ].indexOf(e) > -1) {
                    r.$style[e] = a.default.firstValuable(r.$style[e], 1);
                }
                r.$needUpdate[e] = 1;
                Object.defineProperty(i.style, e, {
                    get: function t() {
                        return r.$style[e];
                    },
                    set: function t(i) {
                        if (r.$style[e] === i) return;
                        r.$style[e] = i;
                        r.$needUpdate[e] = 1;
                    }
                });
            });
            i.events = i.events || {};
            if (true) {
                for (var o in i.events) {
                    if (typeof i.events[o] !== "function" && o !== "eIndex") {
                        console.warn("[Easycanvas] Handler " + o + " is not a function.", i.events[o]);
                    }
                }
            }
            if (true) {
                i.$addIndex = E++;
            }
            i.events.eIndex = i.events.eIndex;
            if (true) {
                i.$perf = {};
            }
            if (true) {
                if (!i.name && i.content.img && i.content.img.src) {
                    var s = i.content.img.src.match(/.*\/([^\/]*)$/);
                    if (s && s[1]) {
                        i.name = s[1];
                    }
                }
                i.name = i.name || "Unnamed Sprite";
            }
            i.children = i.children || [];
            I(i);
            i.$styleCacheTime = {};
            return i;
        };
        var F = function e(t) {
            var r = this;
            this.$extendList.forEach(function(e) {
                e.call(r, t);
            });
        };
        var V = function e(t) {
            var r = P(t, this);
            for (var i in r) {
                if (Object.prototype.hasOwnProperty.call(r, i)) {
                    this[i] = r[i];
                }
            }
            F.call(this, r);
            return this;
        };
        V.prototype.$extendList = [];
        V.prototype.add = function(e) {
            if (!e) {
                return;
            }
            this.children.push(e);
            I(this);
            return this.children[this.children.length - 1];
        };
        V.prototype.getRect = function(e, t) {
            var r = this;
            var i = {};
            l.default.txywh.forEach(function(e) {
                i[e] = r.getStyle(e, t);
            });
            if (i.width === 0 && this.content.img && !e) {
                var n = a.default.funcOrValue(this.content.img, this);
                i.width = n.width;
                i.height = n.height;
            }
            var o = this.getStyle("locate");
            if (o === "lt") {} else if (o === "ld") {
                i.top -= i.height;
            } else if (o === "rt") {
                i.left -= i.width;
            } else if (o === "rd") {
                i.left -= i.width;
                i.top -= i.height;
            } else {
                i.left -= i.width >> 1;
                i.top -= i.height >> 1;
            }
            i.right = this.$canvas.width - i.left - i.width;
            i.bottom = this.$canvas.height - i.top - i.height;
            return i;
        };
        V.prototype.getSelfStyle = function(e) {
            var t = {};
            if (e) {
                return a.default.funcOrValue(this.style[e], this);
            }
            for (var r in this.style) {
                t[r] = a.default.funcOrValue(this.style[r], this);
            }
            return t;
        };
        V.prototype.getStyle = function(e, t) {
            var r = this;
            if (t && r.$cache[e] !== undefined) {
                return r.$cache[e];
            }
            var i = a.default.funcOrValue(r.$style[e], r);
            if (r.$parent) {
                var n = r.$parent.getStyle(e);
                if (e === "left" || e === "top") {
                    n = a.default.firstValuable(n, 0);
                    return n + a.default.firstValuable(i, 0);
                } else if (e === "scale" || e === "opacity") {
                    n = a.default.firstValuable(n, 1);
                    return n * a.default.firstValuable(i, 1);
                } else if (e === "visible") {
                    if (n === false) return false;
                    return i;
                }
            }
            return i;
        };
        V.prototype.remove = function(e) {
            if (e) {
                this.$canvas.remove(e);
                a.default.execFuncs(e.hooks.removed, e);
                return;
            }
            if (this.$parent) {
                this.$parent.remove(this);
            } else {
                this.$canvas.remove(this);
            }
            a.default.execFuncs(this.hooks.removed, this);
        };
        V.prototype.update = function(e) {
            if (!e) return;
            for (var t in e) {
                if (i(e[t]) === "object") {
                    for (var r in e[t]) {
                        if (!this[t]) {
                            this[t] = {};
                        }
                        this[t][r] = e[t][r];
                    }
                } else {
                    this[t] = e[t];
                }
            }
            this.recalculate(true);
            return this;
        };
        V.prototype.hide = function() {
            this.style.display = "none";
            return this;
        };
        V.prototype.show = function() {
            this.style.display = undefined;
            return this;
        };
        V.prototype.getAllChildren = function(e) {
            var t = this;
            var r = e ? [ t ] : [];
            t.children.forEach(function(e) {
                r = r.concat(e.getAllChildren(true));
            });
            return r;
        };
        V.prototype.getAllVisibleChildren = function(e) {
            var t = this;
            if (a.default.funcOrValue(t.style.visible, t) === false) {
                return [];
            }
            var r = e ? [ t ] : [];
            t.children.forEach(function(e) {
                r = r.concat(e.getAllVisibleChildren(true));
            });
            return r;
        };
        V.prototype.getOuterRect = S.default;
        V.prototype.combine = k.default;
        V.prototype.uncombine = M.default;
        V.prototype.combineAsync = function() {
            if (this.$combine) return this;
            this.$combine = 9;
            this.off("ticked", this.combine);
            this.on("ticked", this.combine, 100);
            return this;
        };
        V.prototype.recalculate = O.default;
        V.prototype.refresh = function() {
            for (var e in $sprite.$style) {
                $sprite.$cache[e] = V.get($sprite.$style[e], $sprite);
            }
            return this;
        };
        V.prototype.nextTick = p.default;
        V.prototype.on = c.default;
        V.prototype.off = u.default;
        V.prototype.clear = h.default;
        V.prototype.trigger = $.default;
        V.prototype.broadcast = y.default;
        V.prototype.distribute = w.default;
        e.exports = V;
    }, function(e, t) {
        "use strict";
        e.exports = function() {
            this.children.forEach(function(e) {
                e.remove();
            });
            this.children = [];
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            var t = function t() {
                e.apply(this, arguments);
                this.off("ticked", t);
            };
            this.on("ticked", t);
        };
    }, , , , , , , , function(e, t) {
        "use strict";
        var r = function e(t) {
            setTimeout(t, 1e3 / 60);
        };
        var i = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || r : r;
        e.exports = i;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(4);
        var a = s(n);
        var o = r(1);
        var l = s(o);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        if (true) {
            if (!window[a.default.devFlag]) {
                var c = window[a.default.devFlag] = {
                    isPaintRecording: false,
                    selectMode: false,
                    current: {},
                    version: a.default.version,
                    $canvas: {},
                    $plugin: null
                };
                var f = {
                    getSprite: function e(t) {
                        if (!c.isPaintRecording) return [];
                        var r = {};
                        if (t) {
                            var n = c.$canvas[t].children;
                            var o = c.$canvas[t].$children;
                            var s = function e(t) {
                                if (t.name === a.default.devFlag) return;
                                r[t.$id] = {
                                    name: t.name,
                                    $addIndex: t.$addIndex,
                                    parent: t.$parent && t.$parent.$id,
                                    style: {},
                                    children: t.children.filter(function(e) {
                                        return e.name !== a.default.devFlag;
                                    }).map(function(e) {
                                        return e.$id;
                                    }),
                                    rendered: t.$rendered
                                };
                                for (var i in t.style) {
                                    r[t.$id].style[i] = l.default.funcOrValue(t.style[i], t);
                                }
                                a.default.xywh.forEach(function(e) {
                                    r[t.$id].style[e] = Math.round(r[t.$id].style[e]);
                                });
                                [ "physics", "$perf" ].forEach(function(e) {
                                    r[t.$id][e] = t[e];
                                });
                                if (t.webgl) {
                                    r[t.$id].webgl = {};
                                    [ "rx", "ry", "rz", "x", "y", "z" ].forEach(function(e) {
                                        r[t.$id].webgl[e] = l.default.funcOrValue(t.webgl[e], t);
                                    });
                                }
                                if (t.children) {
                                    t.children.sort(function(e, t) {
                                        return e.$addIndex < t.$addIndex ? -1 : 1;
                                    }).forEach(e);
                                }
                            };
                            n.sort(function(e, t) {
                                return e.$addIndex < t.$addIndex ? -1 : 1;
                            }).forEach(s);
                        } else {
                            for (var f in c.$canvas) {
                                r = i(r, c.$plugin.getSprite(f));
                            }
                        }
                        return r;
                    },
                    selectSpriteById: function e(t, r) {
                        if (!r) {
                            for (var i in c.$canvas) {
                                var n = f.selectSpriteById(t, i);
                                if (n) {
                                    return {
                                        $sprite: n.$sprite || n,
                                        $canvas: c.$canvas[i]
                                    };
                                }
                            }
                            return false;
                        }
                        var a = function e(i) {
                            for (var n = 0; n < i.length; n++) {
                                if (i[n].$id === t) return i[n];
                                var a = e(i[n].children);
                                if (a) {
                                    return {
                                        $sprite: a.$sprite || a,
                                        $canvas: c.$canvas[r]
                                    };
                                }
                            }
                            return false;
                        };
                        var o = c.$canvas[r].children;
                        var l = a(o);
                        if (l) {
                            return {
                                $sprite: l.$sprite || l,
                                $canvas: c.$canvas[r]
                            };
                        }
                    },
                    updateSprite: function e(t) {
                        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "style";
                        var n = arguments[2];
                        var a = arguments[3];
                        var o = f.selectSpriteById(t, a).$sprite;
                        if (!o) console.warn("Sprite " + spriteId + " Not Found.");
                        i(o[r], n);
                    },
                    highlightSprite: function e(t, r, i) {
                        c.selectMode = Boolean(r);
                        var n = f.selectSpriteById(t, i);
                        var a = n.$sprite;
                        var o = n.$canvas;
                        if (r && o && a) {
                            o.$plugin.selectSprite(false, o, a);
                        } else if (o) {
                            o.$plugin.cancelSelectSprite(o);
                        }
                    },
                    sendGlobalHook: function e(t, r) {
                        var i = f.selectSpriteById(t, r);
                        var n = i.$sprite;
                        var a = i.$canvas;
                        console.log("%c window.$0 = %c Current Sprite(" + n.name + ") %c ", "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                        window.$0 = n;
                        window.$1 = a;
                    },
                    pause: function e(t, r) {
                        var i = c.$canvas[t];
                        i.$pausing = typeof r !== "undefined" ? r : !i.$pausing;
                    },
                    getPerf: function e() {
                        var t = {
                            canvas: [],
                            navigator: {
                                clientWidth: document.body.clientWidth,
                                clientHeight: document.body.clientHeight,
                                devicePixelRatio: window.devicePixelRatio
                            }
                        };
                        if (!c.isPaintRecording) return t;
                        for (var r in c.$canvas) {
                            t.canvas.push({
                                $id: r,
                                name: c.$canvas[r].name,
                                perf: c.$canvas[r].$perf,
                                fps: c.$canvas[r].lastFps,
                                size: {
                                    styleWidth: c.$canvas[r].$dom.getBoundingClientRect().width || parseInt(c.$canvas[r].$dom.style.width) || c.$canvas[r].$dom.width,
                                    styleHeight: c.$canvas[r].$dom.getBoundingClientRect().height || parseInt(c.$canvas[r].$dom.style.height) || c.$canvas[r].$dom.height,
                                    canvasWidth: c.$canvas[r].$dom.width,
                                    canvasHeight: c.$canvas[r].$dom.height
                                }
                            });
                        }
                        return t;
                    }
                };
                c.$plugin = f;
            }
        }
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            if (this.hooks[t]) {
                n.default.execFuncs(this.hooks[t], this, e);
            }
            e.unshift(t);
            var r = this.children;
            r && r.forEach(function(t) {
                t.broadcast.apply(t, e);
            });
        };
    }, function(e, t, r) {
        "use strict";
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var i in r) {
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        e[i] = r[i];
                    }
                }
            }
            return e;
        };
        var n = r(1);
        var a = s(n);
        var o = r(4);
        var l = s(o);
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var c = 9;
        var f = 1;
        var u = 2;
        var d = 3;
        e.exports = function() {
            var e = this;
            var t = this;
            if (t.$combine !== c) {
                return f;
            }
            setTimeout(function() {
                if (t.$combine !== c) {
                    return f;
                }
                if (t.getStyle("visible") === false) return d;
                var r = e.$canvas;
                var n = t.getRect(false, true);
                if (n.tw > r.width) return u;
                if (n.th > r.height) return u;
                var o = t.getAllChildren(true);
                for (var l = 0; l < o.length; l++) {
                    var s = o[l];
                    if (s.content.img && !s.$render._imgWidth) {
                        return d;
                    }
                    if (s.getStyle("scale") !== 1) {
                        return d;
                    }
                }
                var h = void 0;
                if (a.default.funcOrValue(t.style.overflow, t) !== "hidden") {
                    h = t.getOuterRect(false, true);
                    h.left = Math.floor(h.left);
                    h.top = Math.floor(h.top);
                    h.width = Math.round(h.width);
                    h.height = Math.round(h.height);
                    h.right = Math.round(h.right);
                    h.bottom = Math.round(h.bottom);
                    if (h.width > r.width) return u;
                    if (h.height > r.height) return u;
                } else {
                    h = n;
                }
                t.off("ticked", e.combine);
                var v = r.$children.filter(function(e) {
                    for (var t = 0; t < o.length; t++) {
                        if (o[t].$id === e.$id) return true;
                    }
                });
                var p = t.getStyle("opacity");
                v.forEach(function(e) {
                    if (!e.settings) return;
                    e.settings.$combineGlobalAlpha = e.settings.globalAlpha;
                    e.settings.globalAlpha = p > 0 ? e.settings.globalAlpha / p : 1;
                    if (!e.props.$moved) {
                        e.props.$moved = true;
                        e.props.left -= h.left;
                        e.props.top -= h.top;
                    }
                });
                var g = r.$combinerCanvas;
                if (!g) {
                    g = r.$combinerCanvas = document.createElement("canvas");
                    g.width = r.width;
                    g.height = r.height;
                }
                var $ = g.getContext("2d");
                $.clearRect(0, 0, r.width, r.height);
                r.$render($, v, true);
                v.forEach(function(e) {
                    if (!e.settings) return;
                    e.settings.globalAlpha = e.settings.$combineGlobalAlpha;
                });
                var m = document.createElement("canvas");
                m.width = h.width;
                m.height = h.height;
                var y = m.getContext("2d");
                y.drawImage(g, 0, 0, h.width, h.height, 0, 0, h.width, h.height);
                t.$combine = {
                    content: t.content,
                    children: t.children,
                    style: i({}, t.style)
                };
                t.children = [];
                t.content = {
                    img: m
                };
                var b = t.getSelfStyle("left") - (Math.floor(n.left) - h.left);
                var w = t.getSelfStyle("top") - (Math.floor(n.top) - h.top);
                i(t.style, {
                    scale: 1,
                    left: b,
                    top: w,
                    width: m.width,
                    height: m.height,
                    backgroundColor: undefined
                });
                return f;
            });
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            e.unshift(t);
            var r = this.children;
            r && r.forEach(function(t) {
                t.broadcast.apply(t, e);
            });
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t) {
            var r = this;
            var i = r.getRect(e, t);
            i.right = i.left + i.width;
            i.bottom = i.top + i.height;
            this.children.forEach(function(r) {
                if (r.$cache.visible === false) return;
                var n = r.getOuterRect(e, t);
                if (n.left < i.left) i.left = n.left;
                if (n.top < i.top) i.top = n.top;
                if (n.right > i.right) i.right = n.right;
                if (n.bottom > i.bottom) i.bottom = n.bottom;
                i.width = i.right - i.left;
                i.height = i.bottom - i.top;
            });
            return i;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            if (!this.hooks[e]) return;
            if (this.hooks[e] === t || this.hooks[e].$handle === t || !t) {
                delete this.hooks[e];
            } else if (n.default.isArray(this.hooks[e])) {
                if (this.hooks[e].indexOf(t) >= 0) {
                    this.hooks[e][this.hooks[e].indexOf(t)] = undefined;
                } else if (this.hooks[e].indexOf(t.$handle) >= 0) {
                    this.hooks[e][this.hooks[e].indexOf(t.$handle)] = undefined;
                }
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            var i = t;
            if (r) {
                var a = this;
                i = function e() {
                    var n = Date.now();
                    if (n > i.$lastTriggerTime + r) {
                        i.$lastTriggerTime = n;
                        var o = Array.prototype.slice.call(arguments);
                        t.apply(a, o);
                    }
                };
                i.$lastTriggerTime = -1;
                i.$handle = t;
            }
            if (!this.hooks[e]) {
                this.hooks[e] = i;
            } else if (n.default.isArray(this.hooks[e])) {
                this.hooks[e].push(i);
            } else {
                this.hooks[e] = [ this.hooks[e], i ];
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = c(i);
        var a = r(18);
        var o = c(a);
        var l = r(4);
        var s = c(l);
        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var f = function e(t) {
            if (!t) return;
            var r = n.default.funcOrValue(t.$style.scale, t);
            if (r !== 1) return t;
            return e(t.$parent);
        };
        e.exports = function(e) {
            var t = this;
            !e && n.default.execFuncs(t.hooks.beforeTick, t, [ t.$canvas.$rafTime ]);
            if (n.default.funcOrValue(t.style.visible, t) === false) {
                t.$cache.visible = false;
                !e && n.default.execFuncs(t.hooks.ticked, t, [ t.$canvas.$rafTime ]);
                return;
            }
            t.$cache.visible = true;
            if (e) {
                t.$cache = {};
                s.default.styles.forEach(function(e) {
                    t.$needUpdate[e] = 1;
                    t.$cache[e] = undefined;
                });
            }
            var r = Object.keys(t.$needUpdate).length;
            t.$lastUpdate = t.$needUpdate;
            if (r) {
                var i = {};
                var a = function e(r) {
                    var a = t.$cache[r];
                    if (typeof t.$style[r] === "function") {
                        i[r] = 1;
                        t.$cache[r] = t.$style[r].call(t);
                    } else {
                        t.$cache[r] = t.$style[r];
                    }
                    if (r === "left" || r === "top") {
                        var o = t.$parent;
                        if (o) {
                            t.$cache[r] += o.$cache[r] || 0;
                        }
                    } else if (r === "opacity" || r === "scale") {
                        var l = t.$parent;
                        if (l) {
                            t.$cache[r] *= n.default.firstValuable(l.$cache[r], 1);
                        }
                    }
                    if (a === t.$cache[r]) {
                        delete t.$needUpdate[r];
                    } else {
                        if (r === "left" || r === "top" || r === "opacity" || r === "scale") {
                            if (a !== t.$cache[r]) {
                                t.children.forEach(function(e) {
                                    e.$needUpdate[r] = 1;
                                });
                            }
                        }
                    }
                };
                for (var l in t.$needUpdate) {
                    a(l);
                }
                r = Object.keys(t.$needUpdate).length;
                t.$needUpdate = i;
            }
            !e && n.default.execFuncs(t.hooks.ticked, t, [ t.$canvas.$rafTime ]);
            var c = n.default.funcOrValue(t.content.text, t);
            var u = n.default.funcOrValue(t.content.img, t);
            if (r || t.$cache.text !== c || t.$cache.img !== u || t.content.img && !t.$render._imgWidth) {
                var d = t.$render;
                t.$cache.img = d.img = u = n.default.funcOrValue(t.content.img, t);
                t.$cache.text = d.text = c;
                if (typeof d.img === "string") {
                    d.img = t.content.img = t.$canvas.imgLoader(d.img);
                }
                if (u && u._complete === false) u = false;
                d.backgroundColor = t.$cache.backgroundColor;
                d.border = t.$cache.border;
                d.overflow = t.$cache.overflow;
                d.overflowX = t.$cache.overflowX;
                d.overflowY = t.$cache.overflowY;
                d.locate = t.$cache.locate;
                d.rotate = t.$cache.rotate;
                d.scale = t.$cache.scale;
                d.opacity = t.$cache.opacity;
                d.$moved = false;
                d.childrenInside = (d.overflow || d.overflowX || d.overflowY) && d.overflow !== "visible";
                d.left = t.$cache.left;
                d.top = t.$cache.top;
                d.width = t.$cache.width;
                d.height = t.$cache.height;
                d._imgWidth = 0;
                d._imgHeight = 0;
                if (u && u.width) {
                    d._imgWidth = u.width || 0;
                    d._imgHeight = u.height || 0;
                    d.cutLeft = t.$cache.cutLeft || 0;
                    d.cutTop = t.$cache.cutTop || 0;
                    d.cutWidth = t.$cache.cutWidth || d._imgWidth;
                    d.cutHeight = t.$cache.cutHeight || d._imgHeight;
                    d.cutLeft = Math.round(d.cutLeft);
                    d.cutTop = Math.round(d.cutTop);
                    d.cutWidth = Math.round(d.cutWidth);
                    d.cutHeight = Math.round(d.cutHeight);
                    d.width = d.width || d.cutWidth || 0;
                    d.height = d.height || d.cutHeight || 0;
                }
                if (d.locate === "lt") {} else if (d.locate === "ld") {
                    d.top -= d.height;
                } else if (d.locate === "rt") {
                    d.left -= d.width;
                } else if (d.locate === "rd") {
                    d.left -= d.width;
                    d.top -= d.height;
                } else {
                    d.left -= d.width >> 1;
                    d.top -= d.height >> 1;
                }
                d.left = Math.round(d.left);
                d.top = Math.round(d.top);
                d.width = Math.round(d.width);
                d.height = Math.round(d.height);
                var h = d.settings = {};
                h.globalAlpha = n.default.firstValuable(d.opacity, 1);
                if (d.childrenInside) {
                    h.clip = true;
                }
                if (t.$cache.scale !== 1) {
                    var v = d.scale;
                    var p = f(t);
                    if (p) {
                        var g = p.$render.left + p.$render.width / 2;
                        var $ = p.$render.top + p.$render.height / 2;
                        d.left -= (g - d.left) * (v - 1);
                        d.top -= ($ - d.top) * (v - 1);
                        d.width *= v;
                        d.height *= v;
                    }
                }
                if (d.fh || d.fv) {
                    d.fh = d.fh || 0;
                    d.fv = d.fv || 0;
                    d.fx = d.fx || 0;
                    d.fy = d.fy || 0;
                    h.transform = {
                        fh: d.fh,
                        fv: d.fv,
                        fx: -(d.top + (d.height >> 1)) * d.fv + d.fx,
                        fy: -(d.left + (d.width >> 1)) * d.fh + d.fy
                    };
                }
                if (d.blend) {
                    if (typeof d.blend === "string") {
                        h.globalCompositeOperation = d.blend;
                    } else {
                        h.globalCompositeOperation = blend[d.blend];
                    }
                }
                if (d.backgroundColor) {
                    h.fillRect = d.backgroundColor;
                }
                if (d.border) {
                    h.line = d.border;
                }
                if (d.mirrX) {
                    h.translate = [ $canvas.width, 0 ];
                    h.scale = [ -1, 1 ];
                    d.left = $canvas.width - d.left - d.width;
                    if (d.mirrY) {
                        h.translate = [ $canvas.width, $canvas.height ];
                        h.scale = [ -1, -1 ];
                        d.top = $canvas.height - d.top - d.height;
                    }
                } else if (d.mirrY) {
                    h.translate = [ 0, $canvas.height ];
                    h.scale = [ 1, -1 ];
                    d.top = $canvas.height - d.top - d.height;
                }
                if (d.rotate) {
                    d.rx = n.default.firstValuable(n.default.funcOrValue(t.$cache.rx, t), d.left + .5 * d.width);
                    d.ry = n.default.firstValuable(n.default.funcOrValue(t.$cache.ry, t), d.top + .5 * d.height);
                    var m = n.default.firstValuable(d.rx, d.left + .5 * d.width);
                    var y = n.default.firstValuable(d.ry, d.top + .5 * d.height);
                    h.beforeRotate = [ m, y ];
                    h.rotate = -d.rotate * Math.PI / 180;
                    h.rotate = Number(h.rotate.toFixed(4));
                    h.afterRotate = [ -m, -y ];
                }
                d.$insight = (0, o.default)(d.left, d.top, d.width, d.height, 0, 0, t.$canvas.width, t.$canvas.height, h.beforeRotate && h.beforeRotate[0], h.beforeRotate && h.beforeRotate[1], d.rotate);
            }
            t.children.forEach(function(t) {
                t.recalculate(e);
            });
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = Array.prototype.slice.call(arguments);
            var t = e.shift();
            if (this.hooks[t]) {
                return n.default.execFuncs(this.hooks[t], this, e);
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(4);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            var e = this;
            if (!this.$combine) return;
            if (this.$combine === 9) {
                this.$combine = false;
                return;
            }
            this.content = this.$combine.content;
            this.children = this.$combine.children;
            Object.keys(this.style).forEach(function(t) {
                e.style[t] = undefined;
            });
            Object.keys(this.$combine.style).forEach(function(t) {
                e.style[t] = e.$combine.style[t];
            });
            this.$combine = false;
            this.recalculate(true);
        };
    }, , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = r(4);
        var n = H(i);
        var a = r(122);
        var o = H(a);
        var l = r(56);
        var s = H(l);
        var c = r(162);
        var f = H(c);
        var u = r(1);
        var d = H(u);
        var h = r(16);
        var v = H(h);
        var p = r(31);
        var g = H(p);
        var $ = r(161);
        var m = H($);
        var y = r(163);
        var b = H(y);
        var w = r(46);
        var x = H(w);
        var S = r(22);
        var T = H(S);
        var k = r(23);
        var _ = H(k);
        var M = r(24);
        var A = H(M);
        var O = r(25);
        var C = H(O);
        var E = r(26);
        var I = H(E);
        var P = r(27);
        var F = H(P);
        var V = r(91);
        var R = H(V);
        function H(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var Y = {
            painter: o.default,
            imgLoader: g.default,
            imgPretreat: m.default,
            multlineText: b.default,
            transition: v.default,
            tick: s.default,
            utils: d.default,
            mirror: f.default,
            class: {
                sprite: x.default
            },
            sprite: x.default,
            $version: n.default.version,
            env: "develop",
            Button: T.default,
            Image: _.default,
            Scroll: A.default,
            Sequence: C.default,
            Text: I.default,
            View: F.default
        };
        Y.extend = function(e) {
            var t = Y.sprite.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            t.push(e);
        };
        Y.use = function(e) {
            var t = Y.painter.prototype.$extendList;
            if (t.indexOf(e) >= 0) return;
            if (e.onUse) {
                e.onUse(Y);
            }
            t.push(e);
        };
        var L = typeof window !== "undefined";
        if (L) {
            if (window.Easycanvas) {
                console.warn("[Easycanvas] already loaded, it should be loaded only once.");
            } else {
                if (true) {
                    setTimeout(function() {
                        console.log("%c Easycanvas %c You are using the develop version " + n.default.version + " %c", "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
                    }, 500);
                }
                if (true) {
                    window.Easycanvas = Y;
                }
            }
        }
        t.default = Y;
    }, , , , , function(e, t, r) {
        "use strict";
        var i = r(110);
        var n = u(i);
        var a = r(111);
        var o = u(a);
        var l = r(108);
        var s = u(l);
        var c = r(121);
        var f = u(c);
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var d = {
            $render: o.default,
            $eventHandler: s.default,
            $perPaint: n.default
        };
        if (true) {
            d.$plugin = (0, f.default)();
        }
        e.exports = d;
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = l(i);
        var a = r(4);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = typeof wx !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var c = function e(t) {
            return t.sort(function(e, t) {
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                        return n.default.funcOrValue(e.style.zIndex, e) < n.default.funcOrValue(t.style.zIndex, t) ? 1 : -1;
                    }
                }
                return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) < n.default.funcOrValue(n.default.firstValuable(t.events.eIndex, t.style.zIndex), t) ? 1 : -1;
            });
        };
        var f = function e(t, r) {
            var i = t.getRect();
            return n.default.pointInRect(r.canvasX, r.canvasY, i.left, i.left + i.width, i.top, i.top + i.height);
        };
        var u = function e(t, r, i) {
            if (!t || !t.length) return;
            if (r.$stopPropagation) return;
            var a = t.length;
            for (var l = 0; l < a; l++) {
                var s = t[l];
                if (n.default.funcOrValue(s.style.visible, s) === false) continue;
                if (s.events && s.events.pointerEvents === "none") continue;
                if (f(s, r)) {
                    var u = s.events.interceptor;
                    if (true) {
                        if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                            u = false;
                        }
                    }
                    if (u) {
                        var d = n.default.firstValuable(u.call(s, r), r);
                        if (!d || d.$stopPropagation) return;
                    }
                }
                var v = s.$combine && s.$combine.children ? s.$combine.children : s.children;
                if (true) {
                    if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                        v = s.children;
                    }
                }
                if (v.length) {
                    e(c(v.filter(function(e) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) >= 0;
                            }
                        }
                        return n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0;
                    })), r, i);
                }
                if (r.$stopPropagation) break;
                if (f(s, r)) {
                    if (true) {
                        if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                            if (s.name !== o.default.devFlag) {
                                r.stopPropagation();
                                if (s.$canvas.$plugin.selectSprite(r.type === "click" || r.type === "touchend", s.$canvas, s)) {
                                    return;
                                }
                            }
                            continue;
                        }
                    }
                    h(s, r, i);
                    r.stopPropagation();
                    return;
                }
                if (v.length) {
                    e(c(v.filter(function(e) {
                        if (true) {
                            if (window[o.default.devFlag] && window[o.default.devFlag].selectMode) {
                                return n.default.funcOrValue(e.style.zIndex, e) < 0;
                            }
                        }
                        return !(n.default.funcOrValue(n.default.firstValuable(e.events.eIndex, e.style.zIndex), e) >= 0);
                    })), r, i);
                }
            }
        };
        var d = function e(t, r) {
            var i = this;
            this.$extendList.forEach(function(e) {
                if (e.onEvent) {
                    e.onEvent.call(i, t, r);
                }
            });
        };
        var h = function e(t, r, i) {
            i && i.push(t);
            if (t.events[r.type]) {
                t.events[r.type].call(t, r);
                if (r.$stopPropagation) return;
            }
            if (t.$parent) {
                e(t.$parent, r, i);
            } else {
                if (t.$canvas && !r.$stopPropagation) {
                    e(t.$canvas, r);
                    r.stopPropagation();
                }
            }
        };
        var v = {
            x: 0,
            y: 0,
            timeStamp: 0
        };
        var p;
        p = function e(t, r) {
            var i = this;
            var a = void 0;
            var o = void 0;
            var l = 1;
            var f = 1;
            if (!r) {
                if (!t.layerX && t.targetTouches && t.targetTouches[0]) {
                    a = t.targetTouches[0].pageX - t.currentTarget.offsetLeft;
                    o = t.targetTouches[0].pageY - t.currentTarget.offsetTop;
                } else if (!t.layerX && t.changedTouches && t.changedTouches[0]) {
                    a = t.changedTouches[0].pageX - t.currentTarget.offsetLeft;
                    o = t.changedTouches[0].pageY - t.currentTarget.offsetTop;
                } else {
                    a = t.layerX;
                    o = t.layerY;
                }
                var h = false;
                if (this.$dom.getBoundingClientRect) {
                    var g = this.$dom.getBoundingClientRect();
                    g.width > g.height !== this.width > this.height;
                    l = Math.floor(g[h ? "height" : "width"]) / this.width;
                    f = Math.floor(g[h ? "width" : "height"]) / this.height;
                }
            }
            var $ = r || {
                type: t.type,
                canvasX: a / l,
                canvasY: o / f,
                event: t
            };
            if (s && i.fastclick) {
                if ($.type === "click" && !$.$fakeClick) {
                    return;
                } else if ($.type === "touchstart") {
                    v.x = $.canvasX;
                    v.y = $.canvasY;
                    v.timeStamp = Date.now();
                } else if ($.type === "touchend") {
                    if (Math.abs(v.x - $.canvasX) < 30 && Math.abs(v.y - $.canvasY) < 30 && Date.now() - v.timeStamp < 200) {
                        p.call(this, null, {
                            $fakeClick: true,
                            type: "click",
                            canvasX: v.x,
                            canvasY: v.y,
                            event: t
                        });
                    }
                }
            }
            $.stopPropagation = function() {
                $.$stopPropagation = true;
            };
            if (i.events.interceptor) {
                $ = n.default.firstValuable(i.events.interceptor.call(i, $), $);
                if (!$ || $.$stopPropagation) return;
            }
            var m = [];
            u(c(i.children), $, m);
            d.call(i, $, m);
            if (($.type === "mousemove" || $.type === "touchmove") && i.eLastMouseHover && m.indexOf(i.eLastMouseHover) === -1) {
                var y = i.eLastMouseHover["events"]["mouseout"] || i.eLastMouseHover["events"]["touchout"];
                if (y) {
                    y.call(i.eLastMouseHover, $);
                }
            }
            i.eLastMouseHover = m[0];
            if (!m.length && i.eLastMouseHover) {
                var b = i.eLastMouseHover["events"]["mouseout"];
                if (b) {
                    b.call(i.eLastMouseHover, $);
                }
                i.eLastMouseHover = null;
            }
            var w = i.events[$.type];
            if (w && !$.$stopPropagation) {
                if (w.call(i, $)) {
                    i.eHoldingFlag = false;
                    return true;
                }
            }
        };
        e.exports = p;
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t, r) {
            t.filter(function(e) {
                var t = n.default.funcOrValue(e.style.zIndex, e);
                if (r < 0) {
                    return t < 0;
                }
                return t >= 0;
            }).sort(function(e, t) {
                var r = n.default.funcOrValue(e.style.zIndex, e);
                var i = n.default.funcOrValue(t.style.zIndex, t);
                if (r === i) return 0;
                return r > i ? 1 : -1;
            }).forEach(function(t, r) {
                e.$perPaint.call(e, t, r);
            });
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = u(i);
        var a = r(4);
        var o = u(a);
        var l = r(109);
        var s = u(l);
        var c = r(18);
        var f = u(c);
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var d = n.default.blend;
        var h = function e(t) {
            var r = /[^\u4e00-\u9fa5]/;
            return !r.test(t);
        };
        var v = function e() {
            var t = this;
            this.$canvas.$extendList.forEach(function(e) {
                if (e.onPaint) {
                    e.onPaint.call(t);
                }
            });
        };
        e.exports = function(e, t) {
            e.$rendered = false;
            if (e.$cache.visible === false) {
                return;
            }
            var r = this;
            v.call(e);
            var i = e.$render;
            var a = i.text;
            var o = i.img;
            var l = i.childrenInside;
            if (!o && !a && !i.backgroundColor && !i.border && !l) {
                e.$rendered = undefined;
                var c = e.children;
                if (c.length) {
                    (0, s.default)(r, c, -1);
                    (0, s.default)(r, c, 1);
                }
                return;
            }
            var f = e.children;
            var u = i.settings;
            if (u.clip) {
                var d = {
                    $id: e.$id,
                    type: "clip",
                    props: i
                };
                d.$origin = e;
                r.$children.push(d);
            }
            f.length && (0, s.default)(r, f, -1);
            if (u.fillRect) {
                e.$rendered = true;
                var p = {
                    $id: e.$id,
                    type: "fillRect",
                    settings: u,
                    props: i
                };
                p.$origin = e;
                r.$children.push(p);
            }
            if (i._imgWidth && i.opacity !== 0 && i.cutWidth && i.cutHeight) {
                e.$rendered = true;
                var g = {
                    $id: e.$id,
                    type: "img",
                    settings: u,
                    img: o,
                    props: i
                };
                g.$origin = e;
                r.$children.push(g);
            }
            if (a) {
                i.textFont = e.$cache.textFont;
                i.color = e.$cache.color;
                i.textAlign = e.$cache.textAlign;
                i.textVerticalAlign = e.$cache.textVerticalAlign;
                e.$rendered = true;
                var $ = i.left;
                var m = i.top;
                var y = i.align || i.textAlign || "left";
                var b = i.textFont || "14px Arial";
                var w = parseInt(b);
                var x = "top";
                var S = i.lineHeight || w;
                if (y === "center") {
                    $ += i.width / 2;
                } else if (y === "right") {
                    $ += i.width;
                }
                if (i.textVerticalAlign === "top") {
                    x = "top";
                } else if (i.textVerticalAlign === "bottom") {
                    x = "bottom";
                    m += i.height;
                } else if (i.textVerticalAlign === "middle") {
                    m += i.height >> 1;
                    x = "middle";
                }
                if (typeof a === "string" || typeof a === "number") {
                    r.$children.push({
                        $id: e.$id,
                        type: "text",
                        settings: u,
                        props: {
                            left: $,
                            top: m,
                            content: String(a),
                            fontsize: w,
                            align: y,
                            baseline: x,
                            font: b,
                            color: i.color,
                            type: i.textToppe
                        },
                        $origin: e
                    });
                } else if (a.length) {
                    a.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: u,
                            props: {
                                left: $ + n.default.funcOrValue(t.left, e),
                                top: m + n.default.funcOrValue(t.top, e),
                                content: n.default.funcOrValue(t.content, e),
                                fontsize: w,
                                baseline: x,
                                align: y,
                                font: b,
                                color: i.color,
                                type: i.textToppe
                            },
                            $origin: e
                        });
                    });
                } else if (a.toppe === "multline-text") {
                    var T = a.text.split(/\t|\n/);
                    var k = [];
                    T.forEach(function(e, t) {
                        e = String.prototype.trim.apply(e);
                        if (a.config.start) {
                            e = e.replace(a.config.start, "");
                        }
                        var r = 0;
                        var n = i.width;
                        while (e.length && r < e.length) {
                            if (n <= 0) {
                                n = i.width;
                                k.push(e.substr(0, r));
                                e = e.substr(r);
                                r = 0;
                            }
                            r++;
                            n -= w * (h(e[r]) ? 1.05 : .6);
                        }
                        if (e || t) {
                            k.push(e);
                        }
                    });
                    k.forEach(function(t) {
                        r.$children.push({
                            $id: e.$id,
                            type: "text",
                            settings: u,
                            props: {
                                left: $,
                                top: m,
                                fontsize: w,
                                content: t,
                                baseline: x,
                                align: y,
                                font: b,
                                color: i.color,
                                type: i.textToppe
                            },
                            $origin: e
                        });
                        m += S || w;
                    });
                }
            }
            if (!o && !a) {
                e.$rendered = undefined;
            }
            f.length && (0, s.default)(r, f, 1);
            if (u.clip) {
                var _ = {
                    $id: e.$id,
                    type: "clipOver",
                    props: i
                };
                _.$origin = e;
                r.$children.push(_);
            }
            if (u.line) {
                e.$rendered = true;
                var M = {
                    $id: e.$id,
                    type: "line",
                    settings: u,
                    props: i
                };
                M.$origin = e;
                r.$children.push(M);
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = function e(t, r) {
            var i = this;
            var n = false;
            this.$extendList.forEach(function(e) {
                if (e.onRender) {
                    var a = e.onRender.call(i, t, r);
                    if (a) {
                        n = a;
                    }
                }
            });
            return n;
        };
        e.exports = function(e, t, r) {
            var i = this;
            var a = t || i.$children;
            if (!r && !i.webgl) {
                a = a.filter(function(e) {
                    return e.props.$insight !== false;
                });
            }
            a.forEach(function(t, r) {
                var l = t.props;
                var s = void 0;
                if (l && t.type !== "clip" && t.type !== "text" && t.type !== "clipOver" && t.type !== "line") {
                    s = l.width * l.height;
                    if (s > 200 * 200 && !t.settings.transform && !t.settings.rotate) {
                        var c = a.length;
                        for (var f = r + 1; f < c; f++) {
                            var u = a[f];
                            if (u.$cannotCover) {
                                continue;
                            }
                            if (u.type === "clip") {
                                while (f < c && a[++f].type !== "clipOver") {}
                                continue;
                            }
                            var d = u.settings;
                            if (!u.type || u.type !== "img") {
                                if (!(u.type === "fillRect" && d.fillRect.indexOf("rgba") === -1)) {
                                    u.$cannotCover = true;
                                    continue;
                                }
                            }
                            var h = u.props;
                            if (h.width * h.height < 200 * 200) {
                                u.$cannotCover = true;
                                continue;
                            }
                            if (h.width * h.height < s) {
                                continue;
                            }
                            if (u.img && !u.img.$noAlpha) {
                                u.$cannotCover = true;
                                continue;
                            }
                            if (d.globalAlpha !== 1 || d.globalCompositeOperation || d.transform || d.rotate) {
                                u.$cannotCover = true;
                                continue;
                            }
                            if (n.default.pointInRect(l.left, l.top, h.left, h.left + h.width, h.top, h.top + h.height) && n.default.pointInRect(l.left + l.width, l.top + l.height, h.left, h.left + h.width, h.top, h.top + h.height)) {
                                if (true) {
                                    t.$origin.$useless = true;
                                }
                                return;
                            }
                        }
                    }
                }
                var v = t.settings || {};
                if (o.call(i, t, v)) {
                    return;
                }
                if (true) {
                    if (t.$origin) {
                        t.$origin.$useless = false;
                    }
                }
                var p = e || i.$paintContext;
                if (t.type === "clip") {
                    p.save();
                    p.beginPath();
                    p.moveTo(l.left, l.top);
                    p.lineTo(l.left + l.width, l.top);
                    p.lineTo(l.left + l.width, l.top + l.height);
                    p.lineTo(l.left, l.top + l.height);
                    p.lineTo(l.left, l.top);
                    p.closePath();
                    p.clip();
                }
                var g = false;
                if (v.globalCompositeOperation) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.globalCompositeOperation = v.globalCompositeOperation;
                }
                if (p.$globalAlpha !== v.globalAlpha) {
                    p.$globalAlpha = p.globalAlpha = v.globalAlpha;
                }
                if (v.translate) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.translate(v.translate[0] || 0, v.translate[1] || 0);
                }
                if (v.rotate) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.translate(v.beforeRotate[0] || 0, v.beforeRotate[1] || 0);
                    p.rotate(v.rotate || 0);
                    p.translate(v.afterRotate[0] || 0, v.afterRotate[1] || 0);
                }
                if (v.scale) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.scale(v.scale[0] || 1, v.scale[1] || 1);
                }
                if (v.transform) {
                    if (!g) {
                        p.save();
                        g = true;
                    }
                    p.transform(1, v.transform.fh, v.transform.fv, 1, v.transform.fx, v.transform.fy);
                }
                if (t.type === "img") {
                    p.drawImage(t.img, l.cutLeft, l.cutTop, l.cutWidth, l.cutHeight, l.left, l.top, l.width, l.height);
                    if (true) {
                        if (i.$plugin) {
                            i.$plugin.drawImage(i, l);
                        }
                    }
                } else if (t.type === "text" && l.content) {
                    p.font = l.font;
                    p.fillStyle = l.color || "white";
                    p.textAlign = l.align;
                    p.textBaseline = l.baseline;
                    p[l.type || "fillText"](l.content, l.left, l.top);
                } else if (t.type === "fillRect") {
                    p.fillStyle = v.fillRect;
                    p.fillRect(l.left, l.top, l.width, l.height);
                } else if (t.type === "line") {
                    p.beginPath();
                    var $ = l.border.substr(l.border.indexOf(" ")) || "black";
                    p.strokeStyle = $;
                    p.lineWidth = l.border.split(" ")[0] || 1;
                    p.moveTo(l.left, l.top);
                    p.lineTo(l.left + l.width, l.top);
                    p.lineTo(l.left + l.width, l.top + l.height);
                    p.lineTo(l.left, l.top + l.height);
                    p.closePath();
                    p.stroke();
                } else if (t.type === "clipOver") {
                    p.restore();
                }
                if (g) {
                    p.$globalAlpha = false;
                    p.restore();
                }
            });
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(116);
        var n = k(i);
        var a = r(120);
        var o = k(a);
        var l = r(113);
        var s = k(l);
        var c = r(47);
        var f = k(c);
        var u = r(114);
        var d = k(u);
        var h = r(48);
        var v = k(h);
        var p = r(115);
        var g = k(p);
        var $ = r(117);
        var m = k($);
        var y = r(118);
        var b = k(y);
        var w = r(119);
        var x = k(w);
        var S = r(46);
        var T = k(S);
        function k(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var _ = {
            start: o.default,
            paint: s.default,
            add: T.default.prototype.add,
            remove: n.default,
            register: g.default,
            clear: f.default,
            setFpsHandler: m.default,
            setMaxFps: b.default,
            pause: d.default,
            on: T.default.prototype.on,
            off: T.default.prototype.off,
            trigger: T.default.prototype.trigger,
            broadcast: T.default.prototype.broadcast,
            nextTick: v.default,
            getAllChildren: T.default.prototype.getAllChildren
        };
        if (true) {
            _.skeleton = x.default;
        }
        e.exports = _;
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = l(i);
        var a = r(4);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (this.$pausing || this.$inBrowser && document.hidden) return;
            var e = this;
            if (true) {
                e.$plugin.timeCollect(e, "custom", "START");
            }
            n.default.execFuncs(e.hooks.beforeTick, e, [ e.$rafTime ]);
            if (true) {
                e.$plugin.timeCollect(e, "preprocessTimeSpend", "START");
            }
            e.children.forEach(function(e) {
                e.recalculate();
            });
            if (!e.$freezing) {
                e.$lastTickChildren = e.$children;
                e.$children = [];
                this.children.sort(function(e, t) {
                    var r = n.default.funcOrValue(e.style.zIndex, e);
                    var i = n.default.funcOrValue(t.style.zIndex, t);
                    if (r === i) return 0;
                    return r > i ? 1 : -1;
                }).forEach(function(t, r) {
                    e.$perPaint(t, r);
                });
            }
            if (true) {
                e.$plugin.timeCollect(e, "preprocessTimeSpend", "END");
            }
            if (true) {
                e.$plugin.timeCollect(e, "paintTimeSpend", "START");
            }
            if (e.$paintContext.clearRect) {
                e.$paintContext.clearRect(0, 0, this.width, this.height);
                e.$render();
            } else {
                e.$render();
            }
            if (true) {
                e.$plugin.timeCollect(e, "paintTimeSpend", "END");
            }
            n.default.execFuncs(e.hooks.ticked, e, [ e.$rafTime ]);
            if (e.hooks.nextTick) {
                n.default.execFuncs(e.hooks.nextTick, e, [ e.$rafTime ]);
                delete e.hooks.nextTick;
            }
            if (true) {
                e.$plugin.timeCollect(e, "custom", "END");
            }
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            this.$pausing = e === undefined ? true : e;
        };
    }, function(e, t, r) {
        "use strict";
        var i = function e(t) {
            var r = this;
            this.$extendList.forEach(function(e) {
                if (e.onCreate) {
                    e.onCreate.call(r, t);
                }
            });
        };
        e.exports = function(e, t) {
            var r = this;
            if (true) {
                this.fpsHandler = this.fpsHandler || function(e) {
                    if (this.maxFps > 0 && e < this.maxFps - 5 && e < 40) {
                        console.warn("[Easycanvas] Low FPS detected (" + e + "/" + this.maxFps + ").");
                    }
                };
            }
            var n = t || {};
            e = this.$dom = e || this.$dom;
            if (true) {
                if (!e) {
                    console.error('[Easycanvas] Not found <canvas> element in "register" function.');
                }
            }
            for (var a in n) {
                this[a] = n[a];
            }
            this.name = n.name || e.id || e.classList && e.classList[0] || "Unnamed";
            this.$inBrowser = typeof window !== "undefined";
            if (n.fullScreen && typeof document !== "undefined") {
                e.width = e.style.width = document.body.clientWidth || document.documentElement.clientWidth;
                e.height = e.style.height = document.body.clientHeight || document.documentElement.clientHeight;
            }
            if (true) {
                if (n.width && e.attributes.width && n.width !== e.width || n.height && e.attributes.height && n.height !== e.height) {
                    console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
                }
            }
            e.width = this.width = this.width || n.width || e.width;
            e.height = this.height = this.height || n.height || e.height;
            if (true) {
                this.$plugin.register(this);
            }
            this.events = n.events || {};
            this.hooks = n.hooks || {};
            if (this.$inBrowser) {
                var o = [ "contextmenu", "mousewheel", "click", "dblclick", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove" ];
                o.forEach(function(t) {
                    e.addEventListener(t, r.$eventHandler.bind(r));
                });
            }
            if (true) {
                if (this.$paintContext) {
                    console.error("[Easycanvas] Current instance is already registered.");
                }
            }
            i.call(this, n);
            this.$paintContext = this.$paintContext || e.getContext("2d");
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = a(i);
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            n.default.execFuncs(e.hooks.beforeRemove, e, e.$tickedTimes++);
            e.style.visible = false;
            e.$removing = true;
            if (e.$parent) {
                e.$parent.children = e.$parent.children.filter(function(e) {
                    return e.$removing !== true;
                });
            } else {
                this.children = this.children.filter(function(e) {
                    return e.$removing !== true;
                });
            }
            if (e.$canvas) {
                e.$canvas = undefined;
                e.$parent = undefined;
                e.$tickedTimes = undefined;
                e.$cache = {};
                e.$rendered = false;
                if (true) {
                    e.$perf = undefined;
                }
                n.default.execFuncs(e.hooks.removed, e, e.$tickedTimes);
            }
            if (t) {
                this.children.splice(this.children.indexOf(e), 1);
            }
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            this.fpsHandler = e;
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            this.maxFps = e || -1;
        };
    }, function(e, t, r) {
        "use strict";
        if (true) {
            e.exports = function() {
                var e = this;
                e.children[0].__proto__.getAllChildren.call(e).forEach(function(e) {
                    e.uncombine();
                    e.$combine = true;
                });
                e.paint();
                e.children[0].__proto__.getAllChildren.call(e).forEach(function(e) {
                    e.$combine = false;
                });
                var t = "";
                t += "var $SKL=document.getElementsByTagName('canvas')[0];";
                t += "$SKL.width=" + e.width + ";$SKL.height=" + e.height + ";";
                t += "$SKL.style.width='100%';$SKL.style.width='100%';";
                t += "var SKLIMG=[];";
                t += "var SKL = function(){";
                t += "var _=$SKL.getContext('2d');";
                var r = e.$children;
                r.forEach(function(e) {
                    var r = e.props;
                    var i = e.settings;
                    if (e.type === "img") {
                        t += "_.globalAlpha=" + i.globalAlpha + ";";
                        if (e.img && e.img.$origin) {
                            t += e.img.$origin.join(";") + ";";
                            t += "_.drawImage(tempCanvas, " + r.cutLeft + ", " + r.cutTop + ", " + r.cutWidth + ", " + r.cutHeight + ", " + r.left + ", " + r.top + ", " + r.width + ", " + r.height + ");";
                        } else if (e.img && e.img.src) {
                            t += "var img = new Image();";
                            t += "var imgUrl='" + e.img.src + "';if(SKLIMG.indexOf(imgUrl)===-1){SKLIMG.push(imgUrl);img.onload=function(){_.clearRect(0,0,$SKL.width,$SKL.height);SKL();}};";
                            t += "img.src=imgUrl;";
                            t += "_.drawImage(img, " + r.cutLeft + ", " + r.cutTop + ", " + r.cutWidth + ", " + r.cutHeight + ", " + r.left + ", " + r.top + ", " + r.width + ", " + r.height + ");";
                        } else {
                            t += "_.fillStyle='#666';";
                            t += "_.fillRect(" + r.left + ", " + r.top + ", " + r.width + ", " + r.height + ");";
                        }
                    } else if (e.type === "fillRect") {
                        t += "_.globalAlpha=" + i.globalAlpha + ";";
                        t += "_.fillStyle='" + i.fillRect + "';";
                        t += "_.fillRect(" + r.left + ", " + r.top + ", " + r.width + ", " + r.height + ");";
                    }
                });
                t += "_.globalAlpha=1;";
                t += "};SKL($SKL);";
                console.log(t);
            };
        }
    }, function(e, t, r) {
        "use strict";
        var i = r(56);
        var n = l(i);
        var a = r(16);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = function e() {
            var t = Date.now();
            o.default.$lastPaintTime = this.$nextTickTime = t;
            if (t - this.fpsCalculateTime >= 1e3) {
                this.fpsCalculateTime = t;
                if (this.fpsHandler) {
                    this.fpsHandler.call(this, this.fps);
                }
                this.lastFps = this.fps;
                this.fps = 0;
            }
            (0, n.default)(c.bind(this));
        };
        var c = function e(t) {
            this.$rafTime = t;
            s.call(this);
            if (this.maxFps > 0 && this.maxFps < 60) {
                if (time - this.$lastPaintTime <= 1e3 / this.maxFps) {
                    return;
                }
                this.$lastPaintTime = time - (time - this.$lastPaintTime) % (1e3 / this.maxFps);
            } else {
                this.$lastPaintTime = Date.now();
            }
            this.fps++;
            this.paint();
        };
        e.exports = function() {
            this.fpsCalculateTime = Date.now();
            s.call(this);
            return this;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(1);
        var n = l(i);
        var a = r(4);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function() {
            if (true) {
                var e = "__EASYCANVAS_BRIDGE_TOPANEL__";
                var t = function t(r) {
                    r.tabId = window[o.default.devFlag].tabId;
                    window.document.dispatchEvent(new CustomEvent(e, {
                        detail: JSON.parse(JSON.stringify(r))
                    }));
                };
                var r = "24px san-serif";
                var i = "18px san-serif";
                var n = function e(t, i) {
                    var n = document.createElement("canvas");
                    var a = n.getContext("2d");
                    a.font = i || r;
                    return a.measureText(t).width;
                };
                setTimeout(function() {
                    t({
                        name: "init"
                    });
                });
                var a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==";
                var l = function() {
                    var e = document.createElement("canvas");
                    e.width = 40;
                    e.height = 20;
                    var t = e.getContext("2d");
                    t.beginPath();
                    t.moveTo(0, 20);
                    t.lineTo(40, 20);
                    t.lineTo(20, 0);
                    t.closePath();
                    t.fill();
                    return e;
                }();
                var s = null;
                var c = null;
                var f = [ "paintArea", "paintTimes", "paintTimeSpend", "preprocessTimeSpend", "custom", "loadArea", "jumpArea" ];
                var u = {
                    drawImage: function e(t, r) {
                        if (!window[o.default.devFlag].isPaintRecording) return;
                        if (r) {
                            t.$perf.$paintArea += r[7] * r[8];
                            t.$perf.$loadArea += r[3] * r[4];
                        }
                        t.$perf.$paintTimes++;
                    },
                    jumpRender: function e(t, r) {
                        t.$perf.$jumpArea += r[7] * r[8];
                    },
                    register: function e(t) {
                        t.$id = Math.random().toString(36).substr(2);
                        t.$perf = {};
                        f.forEach(function(e) {
                            t.$perf[e] = 0;
                            t.$perf["$" + e] = 0;
                        });
                        setInterval(function() {
                            f.forEach(function(e) {
                                t.$perf[e] = t.$perf["$" + e];
                                t.$perf["$" + e] = 0;
                            });
                        }, 1e3);
                        if (!t.$flags.devtoolHanged) {
                            window[o.default.devFlag].$canvas[t.$id] = t;
                            t.$flags.devtoolHanged = true;
                        }
                    },
                    timeCollect: function e(t, r, i) {
                        t.$perf["$" + r] += (i === "START" || i === "PAUSE" ? -1 : 1) * (performance ? performance.now() : Date.now());
                    },
                    selectSprite: function e(f, d, h) {
                        window[o.default.devFlag].MaskCanvasBase64 = a;
                        if (!h || !window[o.default.devFlag].selectMode) {
                            u.cancelSelectSprite(d);
                            return false;
                        }
                        if (!s) {
                            var v = 0;
                            var p = {};
                            var g = {};
                            s = d.add({
                                name: o.default.devFlag,
                                content: {
                                    img: d.imgLoader(a)
                                },
                                style: {
                                    border: function e() {
                                        if (this.getStyle("width") < 2 && this.getStyle("height") < 2) {
                                            return "10 rgba(0, 0, 255, 0.5)";
                                        }
                                        return "1 blue";
                                    }
                                },
                                webgl: undefined,
                                children: !d.$paintContext.clearRect ? [] : [ {
                                    name: o.default.devFlag,
                                    data: {},
                                    style: {
                                        locate: "center",
                                        left: function e() {
                                            var t = p.left + p.width / 2;
                                            if (t - v / 2 < 10) {
                                                t = v / 2 + 10;
                                            } else if (t + v / 2 > this.$canvas.width - 10) {
                                                t = this.$canvas.width - v / 2 - 10;
                                            }
                                            return t - this.$parent.$cache.left;
                                        },
                                        top: function e() {
                                            var t = p.top + p.height + 30;
                                            if (this.data.above = t + 30 > this.$canvas.height) {
                                                t = p.top - 32;
                                            }
                                            return t - this.$parent.$cache.top;
                                        },
                                        width: function e() {
                                            return v;
                                        },
                                        height: 32,
                                        color: "orange",
                                        backgroundColor: "black",
                                        textVerticalAlign: "top",
                                        textAlign: "center",
                                        textFont: r
                                    },
                                    hooks: {
                                        beforeTick: function e() {
                                            p = this.$parent.getRect();
                                            this.content.text = "<" + h.name + "> | " + Math.round(this.$parent.getStyle("width")) + "×" + Math.round(this.$parent.getStyle("height"));
                                            v = n(this.content.text) + 20;
                                        }
                                    },
                                    children: [ {
                                        name: o.default.devFlag,
                                        content: {
                                            img: l
                                        },
                                        style: {
                                            left: function e() {
                                                return p.left + p.width / 2 - this.$parent.$cache.left;
                                            },
                                            top: function e() {
                                                return this.$parent.data.above ? 5 + 16 : -5 - 16;
                                            },
                                            width: 20,
                                            height: 10,
                                            rotate: function e() {
                                                return this.$parent.data.above ? 180 : 0;
                                            }
                                        }
                                    } ]
                                }, {
                                    name: o.default.devFlag,
                                    style: {
                                        visible: function e() {
                                            return this.getStyle("width") < this.data.value;
                                        },
                                        locate: "center",
                                        left: function e() {
                                            var t = g.left + (s.getSelfStyle("left") - c.getSelfStyle("left")) / 2;
                                            return t - this.$parent.$cache.left;
                                        },
                                        top: function e() {
                                            var t = s.getSelfStyle("top");
                                            return t - this.$parent.$cache.top;
                                        },
                                        width: function e() {
                                            return n(this.content.text, i) + 10;
                                        },
                                        height: 20,
                                        backgroundColor: "#ddd",
                                        color: "black",
                                        textVerticalAlign: "middle",
                                        textAlign: "center",
                                        textFont: i
                                    },
                                    data: {},
                                    hooks: {
                                        beforeTick: function e() {
                                            g = c.getRect();
                                            this.data.value = Math.round(s.getSelfStyle("left") - c.getSelfStyle("left"));
                                            this.content.text = "left: " + String(this.data.value);
                                        }
                                    }
                                }, {
                                    name: o.default.devFlag,
                                    style: {
                                        visible: function e() {
                                            return this.getStyle("height") < this.data.value;
                                        },
                                        locate: "center",
                                        left: function e() {
                                            var t = s.getSelfStyle("left");
                                            return t - this.$parent.$cache.left;
                                        },
                                        top: function e() {
                                            var t = g.top + (s.getSelfStyle("top") - c.getSelfStyle("top")) / 2;
                                            return t - this.$parent.$cache.top;
                                        },
                                        width: function e() {
                                            return n(this.content.text, i) + 10;
                                        },
                                        height: 20,
                                        backgroundColor: "#ddd",
                                        color: "black",
                                        textVerticalAlign: "middle",
                                        textAlign: "center",
                                        textFont: i
                                    },
                                    data: {},
                                    hooks: {
                                        beforeTick: function e() {
                                            g = c.getRect();
                                            this.data.value = Math.round(s.getSelfStyle("top") - c.getSelfStyle("top"));
                                            this.content.text = "top: " + String(this.data.value);
                                        }
                                    }
                                } ]
                            });
                            c = d.add({
                                name: o.default.devFlag,
                                style: {
                                    locate: "lt"
                                },
                                children: [ {
                                    name: o.default.devFlag,
                                    style: {
                                        locate: "lt",
                                        left: 0,
                                        top: 0,
                                        width: function e() {
                                            return s.getSelfStyle("left") - this.$parent.getStyle("left");
                                        },
                                        height: function e() {
                                            return s.getSelfStyle("top") - this.$parent.getStyle("top");
                                        },
                                        backgroundColor: "rgba(140, 205, 255, 0.1)",
                                        border: "1 rgba(80, 120, 200, 0.9)"
                                    }
                                } ]
                            });
                        }
                        [ "left", "top", "rotate", "rx", "ry", "scale", "width", "height", "locate" ].forEach(function(e) {
                            (function(e) {
                                s.style[e] = function() {
                                    if (e === "width" || e === "height") {
                                        return h.getStyle(e) || h.getRect()[e] || .1;
                                    }
                                    return h.getStyle(e);
                                };
                            })(e);
                        });
                        [ "left", "top" ].forEach(function(e) {
                            (function(e) {
                                c.style[e] = function() {
                                    if (!h.$parent) return 0;
                                    return h.$parent.getStyle(e);
                                };
                            })(e);
                        });
                        s.style.zIndex = Number.MAX_SAFE_INTEGER;
                        c.style.zIndex = Number.MAX_SAFE_INTEGER - 1;
                        s.style.visible = function() {
                            return window[o.default.devFlag].selectMode && h.$canvas;
                        };
                        c.style.visible = function() {
                            return window[o.default.devFlag].selectMode && h.$parent && h.$parent.$canvas;
                        };
                        s.style.opacity = .8;
                        s.webgl = h.webgl ? {} : undefined;
                        if (s.webgl) {
                            for (var $ in h.webgl) {
                                (function(e) {
                                    s.webgl[e] = function() {
                                        if (typeof h.webgl[e] === "function") {
                                            return h.webgl[e].call(h);
                                        }
                                        return h.webgl[e];
                                    };
                                })($);
                            }
                            s.webgl.img = d.imgLoader(a);
                            s.webgl.colors = false;
                            s.style.zIndex = Number.MIN_SAFE_INTEGER;
                        }
                        if (f) {
                            d.remove(s);
                            d.remove(c);
                            s = null;
                            t({
                                name: "selectSprite",
                                id: d.$id,
                                value: {
                                    sprite: h.$id,
                                    canvas: d.$id
                                }
                            });
                            window[o.default.devFlag].current = {
                                $sprite: h,
                                $canvas: d
                            };
                            window[o.default.devFlag].selectMode = false;
                        }
                        return true;
                    },
                    cancelSelectSprite: function e(t) {
                        if (!s) return;
                        t.remove(s);
                        t.remove(c);
                        s = null;
                    }
                };
                return u;
            }
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(112);
        var n = u(i);
        var a = r(107);
        var o = u(a);
        var l = r(123);
        var s = u(l);
        var c = r(31);
        var f = u(c);
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var d = function e(t) {
            this.imgLoader = f.default;
            for (var r in s.default) {
                this[r] = this[r] || JSON.parse(JSON.stringify(s.default[r]));
            }
            if (!t) {
                return;
            }
            if (!t.el) {
                t = {
                    el: t
                };
            }
            if (t.el) {
                this.register(typeof t.el === "string" ? document.querySelector(t.el) : t.el, t);
            }
        };
        d.prototype.$extendList = [];
        for (var h in o.default) {
            if (Object.prototype.hasOwnProperty.call(o.default, h)) {
                d.prototype[h] = o.default[h];
            }
        }
        for (var v in n.default) {
            if (Object.prototype.hasOwnProperty.call(n.default, v)) {
                d.prototype[v] = n.default[v];
            }
        }
        e.exports = d;
    }, function(e, t) {
        "use strict";
        var r = {
            $dom: null,
            $paintContext: null,
            $nextTickTime: 0,
            $lastPaintTime: 0,
            $pausing: false,
            $freezing: false,
            name: "",
            fps: 0,
            lastFps: 0,
            fpsCalculateTime: 0,
            fpsHandler: null,
            width: 0,
            height: 0,
            events: {
                click: null
            },
            children: [],
            eHoldingFlag: false,
            eLastMouseHover: null,
            maxFps: -1,
            $flags: {}
        };
        e.exports = r;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = r(31);
        var n = l(i);
        var a = r(32);
        var o = l(a);
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e.exports = function(e, t) {
            var r;
            (0, o.default)(e, function(e) {
                return (0, n.default)(e, function(e) {
                    var i = e.width, n = e.height;
                    var a = e.getContext("2d").getImageData(0, 0, i, n);
                    var o = a.data;
                    for (var l = o.length - 1; l >= 0; l -= 4) {
                        if (t && t.conversion) {
                            var s = t.conversion({
                                r: o[l - 3],
                                g: o[l - 2],
                                b: o[l - 1],
                                a: o[l]
                            }, (l + 1 >> 2) % i, Math.floor((l + 1 >> 2) / i));
                            o[l - 3] = s.r;
                            o[l - 2] = s.g;
                            o[l - 1] = s.b;
                            o[l - 0] = s.a;
                        }
                    }
                    e.getContext("2d").clearRect(0, 0, i, n);
                    e.getContext("2d").putImageData(a, 0, 0);
                    r = e;
                }, {
                    canvas: true,
                    cacheFlag: Math.random()
                });
            });
            return function() {
                return r;
            };
        };
    }, function(e, t) {
        "use strict";
        e.exports = function e(t) {
            var r = t.width;
            var i = t.height;
            var n = document.createElement("canvas");
            n.width = r;
            n.height = i;
            var a = n.getContext("2d");
            a.scale(1, -1);
            a.translate(0, -i);
            a.drawImage(t, 0, 0);
            var o = a.getImageData(0, 0, r, i);
            return {
                canvas: a,
                img: o
            };
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e, t) {
            return {
                type: "multline-text",
                text: e,
                config: t
            };
        };
    } ]);
});

