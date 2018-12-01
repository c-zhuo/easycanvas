(function e(l, t) {
    if (typeof exports === "object" && typeof module === "object") module.exports = t(); else if (typeof define === "function" && define.amd) define([], t); else {
        var s = t();
        for (var r in s) (typeof exports === "object" ? exports : l)[r] = s[r];
    }
})(this, function() {
    return function(e) {
        var l = {};
        function t(s) {
            if (l[s]) return l[s].exports;
            var r = l[s] = {
                exports: {},
                id: s,
                loaded: false
            };
            e[s].call(r.exports, r, r.exports, t);
            r.loaded = true;
            return r.exports;
        }
        t.m = e;
        t.c = l;
        t.p = "";
        return t(0);
    }({
        0: function(e, l, t) {
            e.exports = t(34);
        },
        14: function(e, l, t) {
            "use strict";
            var s = {};
            var r = "\n".slice(0, 1);
            var o = function e(l, t) {
                var o = String(l);
                var i = o + JSON.stringify(t);
                if (s[i]) {
                    return s[i];
                }
                var a;
                if (t.padding) {
                    a = t.padding.split(" ");
                    a = a.map(function(e) {
                        return parseInt(e);
                    });
                    a[1] = Number(a[1] || a[0]);
                    a[2] = Number(a[2] || a[0]);
                    a[3] = Number(a[3] || a[1]);
                } else {
                    a = [ 0, 0, 0, 0 ];
                }
                var n = t.minWidth || t.width || (t.size || 16) * o.length + a[1] + a[3] + 100;
                var c = o.split("\n").length;
                var u = (t.size || 16) * (Math.round(o.length) / n + c - 1) * (t.lineHeight || t.size) + a[0] + a[2] + 100;
                var f = document.createElement("canvas");
                f.width = n;
                f.height = u;
                var h = f.getContext("2d");
                window.tempCanvas = f;
                window.tempCtx = h;
                h.textBaseline = "middle";
                h.font = (t.style ? t.style + " " : "") + t.size + "px " + (t.family || "serif");
                h.fillStyle = t.color || "#000";
                h.textAlign = t.textAlign || "left";
                if (true) {
                    var d = [];
                    d.push("var tempCanvas = document.createElement('canvas')");
                    d.push("tempCanvas.width=" + f.width);
                    d.push("tempCanvas.height=" + f.height);
                    d.push("var tempCtx = tempCanvas.getContext('2d')");
                    d.push("tempCtx.textBaseline='" + h.textBaseline + "'");
                    d.push("tempCtx.font='" + h.font + "'");
                    d.push("tempCtx.fillStyle='" + h.fillStyle + "'");
                    d.push("tempCtx.textAlign='" + h.textAlign + "'");
                }
                var v = 0;
                var p = t.lineHeight ? (t.lineHeight - t.size) / 2 : 0;
                var g = 0;
                var m = 1;
                var y = false;
                var w = 0;
                while (true) {
                    var x = h.measureText(o.slice(g, m)).width;
                    if (x > t.width) {
                        if (t.overflow === "ellipsis") {
                            m -= 2;
                            h.fillText(o.slice(g, m) + "...", v, p + t.size / 2);
                            if (true) {
                                d.push("tempCtx.fillText('" + o.slice(g, m) + "...', " + v + ", " + (p + t.size / 2) + ")");
                            }
                            p += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 0);
                            w = t.width - a[1] - a[3];
                            break;
                        } else {
                            m -= 1;
                            h.fillText(o.slice(g, m), v, p + t.size / 2);
                            if (true) {
                                d.push("tempCtx.fillText('" + o.slice(g, m) + "', " + v + ", " + (p + t.size / 2) + ")");
                            }
                            g = m;
                            m = g + 1;
                            p += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 10);
                        }
                    } else {
                        if (m > o.length - 1) {
                            if (x > w) w = x;
                            h.fillText(o.slice(g, m), v, p + t.size / 2);
                            if (true) {
                                d.push("tempCtx.fillText('" + o.slice(g, m) + "', " + v + ", " + (p + t.size / 2) + ")");
                            }
                            p += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 0);
                            break;
                        } else if (o.slice(m, m + 1) === r) {
                            h.fillText(o.slice(g, m), v, p + t.size / 2);
                            m += 1;
                            g = m;
                            m = g + 1;
                            p += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 10);
                        }
                        if (x > w) w = x;
                        m++;
                    }
                }
                var $ = document.createElement("canvas");
                $.width = Math.max(w + a[1] + a[3], t.minWidth || 0);
                $.height = p + a[0] + a[2];
                var b = $.getContext("2d");
                if (true) {
                    d.push("var finalCanvas=document.createElement('canvas')");
                    d.push("finalCanvas.width=" + $.width);
                    d.push("finalCanvas.height=" + $.height);
                    d.push("var finalCtx = finalCanvas.getContext('2d')");
                }
                if (t.backgroundColor) {
                    b.fillStyle = t.backgroundColor;
                    b.fillRect(0, 0, $.width, $.height);
                    if (true) {
                        d.push("finalCtx.fillStyle=" + b.fillStyle);
                        d.push("finalCtx.fillRect(0, 0, " + $.width + ", " + $.height + ")");
                    }
                }
                b.drawImage(f, ($.width - w) / 2, a[0]);
                if (t.border) {
                    var S = t.border.split(" ");
                    var Y = S.pop();
                    if (S[S.length - 1] === "solid") S.pop();
                    var X = S[0];
                    var T = S[1] || X;
                    var C = S[2] || X;
                    var H = S[3] || T || X;
                    X = parseInt(X);
                    T = parseInt(T);
                    C = parseInt(C);
                    H = parseInt(H);
                    var N = t.borderRadius || 0;
                    b.beginPath();
                    b.strokeStyle = Y;
                    if (X) {
                        b.lineWidth = X;
                        b.moveTo(H ? N : 0, 0);
                        b.lineTo($.width - (T ? N : 0), 0);
                    }
                    if (T) {
                        b.lineWidth = T;
                        b.moveTo($.width, X ? N : 0);
                        b.lineTo($.width, $.height - (C ? N : 0));
                    }
                    if (C) {
                        b.lineWidth = C;
                        b.moveTo(H ? N : 0, $.height);
                        b.lineTo($.width - (T ? N : 0), $.height);
                    }
                    if (H) {
                        b.lineWidth = H;
                        b.moveTo(0, X ? N : 0);
                        b.lineTo(0, $.height - (C ? N : 0));
                    }
                    b.stroke();
                    if (N) {
                        console.log(N);
                        var O = document.createElement("canvas");
                        var P = Math.min($.width, $.height);
                        O.width = O.height = P;
                        var M = O.getContext("2d");
                        M.beginPath();
                        M.strokeStyle = Y;
                        M.arc(P >> 1, P >> 1, (P >> 1) - 1, 0, 2 * Math.PI);
                        M.stroke();
                        if (X && T) {
                            b.drawImage(O, P >> 1, 0, P >> 1, P >> 1, $.width - N, 0, N, N);
                        }
                        if (C && T) {
                            b.drawImage(O, P >> 1, P >> 1, P >> 1, P >> 1, $.width - N, $.height - N, N, N);
                        }
                        if (X && H) {
                            b.drawImage(O, 0, 0, P >> 1, P >> 1, 0, 0, N, N);
                        }
                        if (C && H) {
                            b.drawImage(O, 0, P >> 1, P >> 1, P >> 1, 0, $.height - N, N, N);
                        }
                    }
                }
                if (true) {
                    $.$origin = d;
                }
                s[i] = $;
                return $;
            };
            e.exports = o;
        },
        34: function(e, l, t) {
            "use strict";
            var s = t(38);
            var r = f(s);
            var o = t(35);
            var i = f(o);
            var a = t(36);
            var n = f(a);
            var c = t(37);
            var u = f(c);
            function f(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = {
                button: i.default,
                scroll: n.default,
                text: r.default,
                sequence: u.default
            };
        },
        35: function(e, l, t) {
            "use strict";
            var s = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var t = arguments[l];
                    for (var s in t) {
                        if (Object.prototype.hasOwnProperty.call(t, s)) {
                            e[s] = t[s];
                        }
                    }
                }
                return e;
            };
            var r = t(14);
            var o = i(r);
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var a = typeof window !== "undefined";
            var n = {
                padding: 0,
                width: 300,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var u = function e(l, t) {
                l.buttonStyleNormal = s(n, {
                    minWidth: t.style.tw,
                    lineHeight: t.style.th,
                    padding: 0
                }, t.props.normal);
                l.buttonStyleHovered = s({}, l.buttonStyleNormal, t.props.hovered);
                l.buttonStylePressed = s({}, l.buttonStyleNormal, t.props.pressed);
                l.imageNormal = (0, o.default)(t.props.text || "", l.buttonStyleNormal);
                l.imageHovered = t.props.hovered && (0, o.default)(t.props.text || "", l.buttonStyleHovered);
                l.imagePressed = t.props.pressed && (0, o.default)(t.props.text || "", l.buttonStylePressed);
            };
            var f = function e(l) {
                var t = void 0;
                var s = l || {};
                l.props = l.props || {};
                var r = {
                    buttonStyleNormal: undefined,
                    buttonStyleHovered: undefined,
                    buttonStylePressed: undefined,
                    imageNormal: undefined,
                    imageHovered: undefined,
                    imagePressed: undefined
                };
                u(r, l);
                var o = {};
                l.events = l.events || {};
                o.touchmove = o.mousemove = function() {
                    t.content.img = r.imageHovered || r.imageNormal;
                };
                o.touchstart = o.mousedown = function() {
                    t.content.img = r.imagePressed || r.imageHovered || r.imageNormal;
                };
                o.touchend = o.touchout = o.mouseout = function() {
                    t.content.img = r.imageNormal;
                };
                o.mouseup = function() {
                    t.content.img = r.imageHovered || r.imageNormal;
                };
                o.click = function(e) {
                    l.events.click && l.events.click.call(t, e);
                };
                t = new c.class.sprite({
                    name: l.name || "button_" + l.props.text,
                    content: {
                        img: r.imageNormal
                    },
                    style: l.style,
                    props: l.props,
                    events: o,
                    hooks: l.hooks
                });
                t.update = function(e) {
                    this.__proto__.update.call(this, e);
                    u(r, l);
                    t.content.img = r.imageNormal;
                };
                return t;
            };
            var h = function e(l, t) {
                c = l;
                if (t) {
                    l.class[t] = f;
                }
                return f;
            };
            if (a && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.button = f;
            } else {
                e.exports = h;
            }
        },
        36: function(e, l) {
            "use strict";
            var t = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var t = arguments[l];
                    for (var s in t) {
                        if (Object.prototype.hasOwnProperty.call(t, s)) {
                            e[s] = t[s];
                        }
                    }
                }
                return e;
            };
            var s = typeof window !== "undefined";
            var r = void 0;
            var o = void 0;
            var i = function e(l, t) {
                return Math.abs(l) < Math.abs(t) ? l : t;
            };
            var a = {
                loose: function e(l) {
                    l.$scroll.touching = false;
                },
                looper: function e(l) {
                    if (!l.$scroll || !l.$scroll.$scrolling) return;
                    if (Math.abs(l.$scroll.speedX) > 1) {
                        l.$scroll.speedX *= l.scroll.smooth || .8;
                    } else {
                        l.$scroll.speedX = 0;
                    }
                    if (Math.abs(l.$scroll.speedY) > 1) {
                        l.$scroll.speedY *= l.scroll.smooth || .8;
                    } else {
                        l.$scroll.speedY = 0;
                    }
                    if (Math.abs(l.$scroll.speedX) <= 1 && Math.abs(l.$scroll.speedY) <= 1) {
                        l.$scroll.$scrolling = false;
                        l.$scroll.$wheeling = false;
                        return;
                    }
                    if (l.$scroll.touching) {
                        return;
                    }
                    l.scroll.scrollY -= l.$scroll.speedY;
                    l.scroll.scrollX -= l.$scroll.speedX;
                    if (!l.$scroll.touching && !l.$scroll.$wheeling && Math.abs(l.$scroll.speedY) < 50 && l.scroll.anchors && l.scroll.anchors.length) {
                        var t = l.scroll.anchorsRange || 400;
                        for (var s = 0; s < l.scroll.anchors.length; s++) {
                            var o = l.scroll.anchors[s];
                            var i = l.scroll.scrollY - o;
                            if (i > 0 && i < t && l.$scroll.speedY > 0 || i < 0 && i > -t && l.$scroll.speedY < 0) {
                                l.trigger("scrollTo", o, 200);
                                l.$scroll.speedY = 0;
                                break;
                            }
                        }
                    }
                    var a = r.utils.funcOrValue(l.scroll.minScrollX, l);
                    var n = r.utils.funcOrValue(l.scroll.maxScrollX, l);
                    var c = r.utils.funcOrValue(l.scroll.minScrollY, l);
                    var u = r.utils.funcOrValue(l.scroll.maxScrollY, l);
                    if (!isNaN(c) && l.scroll.scrollY < c) {
                        l.scroll.scrollY = c;
                    } else if (!isNaN(u) && l.scroll.scrollY > u) {
                        l.scroll.scrollY = u;
                        l.broadcast("scrolledToBottom");
                        l.$scroll.speedY = 0;
                    }
                    if (!isNaN(a) && l.scroll.scrollX < a) {
                        l.scroll.scrollX = a;
                    } else if (!isNaN(n) && l.scroll.scrollX > n) {
                        l.scroll.scrollX = n;
                    }
                },
                touch: function e(l, t) {
                    var s = Date.now();
                    l.$scroll.$wheeling = false;
                    if (!l.$scroll.touching) {
                        l.$scroll.touching = s;
                        l.$scroll.quickTouch = s;
                        l.$scroll.lastTouchSpeed = 0;
                        l.$scroll.startPos.x = t.canvasX;
                        l.$scroll.startPos.y = t.canvasY;
                        l.$scroll.lastScrollSpeed = l.$scroll.speedX || l.$scroll.speedY;
                        l.$scroll.speedX = 0;
                        l.$scroll.speedY = 0;
                    } else {
                        l.$scroll.$scrolling = true;
                        var o = l.$scroll.startPos.x - t.canvasX;
                        var a = l.$scroll.startPos.y - t.canvasY;
                        var n = s - l.$scroll.touching;
                        l.$scroll.touching = s;
                        var c = r.utils.funcOrValue(l.scroll.minScrollX, l);
                        var u = r.utils.funcOrValue(l.scroll.maxScrollX, l);
                        var f = r.utils.funcOrValue(l.scroll.minScrollY, l);
                        var h = r.utils.funcOrValue(l.scroll.maxScrollY, l);
                        if (l.scroll.scrollX + o < c || l.scroll.scrollX + o > u) {
                            if (l.scroll.flexible || l.scroll.flexibleX) o >>= 3; else o = 0;
                        }
                        if (l.scroll.scrollY + a < f || l.scroll.scrollY + a > h) {
                            if (l.scroll.flexible || l.scroll.flexibleY) a >>= 3; else a = 0;
                        }
                        if (r.utils.funcOrValue(l.scroll.scrollableX, l) && Math.abs(o) >= 1 && n > 1) {
                            var d = (t.canvasX - l.$scroll.startPos.x) / n * 25;
                            if (l.$scroll.lastScrollSpeed * d > 0 && Math.abs(d) > 15) {
                                d += i(d, l.$scroll.lastScrollSpeed);
                            }
                            l.$scroll.speedX = (l.$scroll.lastTouchSpeed + d) / (l.$scroll.lastTouchSpeed ? 2 : 1);
                            l.$scroll.lastTouchSpeed = d;
                            l.scroll.scrollX += o;
                        }
                        if (r.utils.funcOrValue(l.scroll.scrollableY, l) && Math.abs(a) >= 1 && n > 1) {
                            var v = (t.canvasY - l.$scroll.startPos.y) / n * 25;
                            if (l.$scroll.lastScrollSpeed * v > 0 && Math.abs(v) > 15) {
                                v += i(v, l.$scroll.lastScrollSpeed);
                            }
                            l.$scroll.speedY = (l.$scroll.lastTouchSpeed + v) / (l.$scroll.lastTouchSpeed ? 2 : 1);
                            l.$scroll.lastTouchSpeed = v;
                            l.scroll.scrollY += a;
                        }
                        l.$scroll.startPos.x = t.canvasX;
                        l.$scroll.startPos.y = t.canvasY;
                        if (Math.abs(o) > Math.abs(a) + 1) return 1; else if (Math.abs(o) < Math.abs(a) - 1) return 2;
                    }
                },
                wheel: function e(l, t) {
                    l.$scroll.speedX = r.utils.funcOrValue(l.scroll.scrollableX, l) ? t.event.wheelDeltaX : 0;
                    l.$scroll.speedY = r.utils.funcOrValue(l.scroll.scrollableY, l) ? t.event.wheelDeltaY : 0;
                    l.$scroll.$scrolling = true;
                    l.$scroll.$wheeling = true;
                    t.stopPropagation();
                }
            };
            var n = function e(l) {
                var s = false;
                var i = l || {};
                i.scroll = t({
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
                        var l = this;
                        var t = 0;
                        this.getChildren().forEach(function(e) {
                            var s = e.getSelfStyle("tx") + e.getSelfStyle("tw") - l.getStyle("tw");
                            if (s > t) t = s;
                        });
                        return t;
                    },
                    minScrollY: 0,
                    maxScrollY: function e() {
                        var l = this;
                        var t = 0;
                        this.getChildren().forEach(function(e) {
                            var s = e.getSelfStyle("ty") + e.getSelfStyle("th") - l.getStyle("th");
                            if (s > t) t = s;
                        });
                        return t;
                    },
                    propagationX: false,
                    propagationY: false
                }, l.scroll);
                var n = function e() {
                    if (s) {
                        u.scroll.scrollY = s();
                    } else {
                        u.off("ticked", e);
                    }
                };
                var c = false;
                i.events = t({
                    touchstart: function e(l) {
                        a.loose(this);
                        c = true;
                        o = false;
                        a.touch(this, l);
                        if (!u.scroll.propagationX && !u.scroll.propagationY) {
                            l.stopPropagation();
                        }
                    },
                    touchmove: function e(l) {
                        if (!c) return;
                        if (o && this !== o) {
                            return;
                        }
                        var t = a.touch(this, l);
                        if (t === 1 && u.scroll.propagationY) {
                            l.stopPropagation();
                            o = this;
                        } else if (t === 2 && u.scroll.propagationX) {
                            l.stopPropagation();
                            o = this;
                        }
                    },
                    mousewheel: function e(l) {
                        c = true;
                        a.wheel(this, l);
                        l.stopPropagation();
                    },
                    touchend: function e() {
                        c = false;
                        a.loose(this);
                    },
                    mouseup: function e() {
                        c = false;
                        a.loose(this);
                    }
                }, i.events || {});
                if (i.scroll.capture) {
                    i.events.interceptor = function(e) {
                        if (u.events[e.type]) {
                            u.events[e.type].call(u, e);
                            return false;
                        }
                        return e;
                    };
                }
                var u = new r.class.sprite(i);
                u.on("ticked", function() {
                    a.looper(u);
                });
                u.on("scrollTo", function(e, l, t) {
                    s = r.transition.pendulum(u.scroll.scrollY, e, (l || 200) * 2, {
                        cycle: .5
                    }).then(function() {
                        s = false;
                        t && t();
                    });
                    u.on("ticked", n);
                });
                u.$scroll = {
                    speedX: 0,
                    speedY: 0,
                    touching: false,
                    startPos: {},
                    lastTouchSpeed: 0,
                    lastScrollSpeed: 0
                };
                var f = u.add({
                    name: "scrolling-element",
                    style: {
                        tx: function e() {
                            return -this.$parent.scroll.scrollX;
                        },
                        ty: function e() {
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
            var c = function e(l, t) {
                r = l;
                if (t) {
                    l.class[t] = n;
                }
                return n;
            };
            if (s && window.Easycanvas) {
                r = Easycanvas;
                Easycanvas.class.scroll = n;
            } else {
                e.exports = c;
            }
        },
        37: function(e, l) {
            "use strict";
            var t = typeof window !== "undefined";
            var s = void 0;
            var r = function e(l) {
                var t = new s.class.sprite(l);
                l.props.index = l.props.index || 0;
                t.on("beforeTick", function() {
                    var e = this.props;
                    var l = s.utils.funcOrValue(this.content.img, this);
                    if (!l || !l.width) return;
                    var t = e.index || 0;
                    if (t < 0) t = 0;
                    var r = void 0, o = void 0;
                    if (e.frameWidth || e.frameHeight) {
                        if (e.frameWidth < 0) {
                            r = l.width / -e.frameWidth;
                        } else {
                            r = e.frameWidth;
                        }
                        if (e.frameHeight < 0) {
                            o = l.height / -e.frameHeight;
                        } else {
                            o = e.frameHeight;
                        }
                        var i = Math.floor(l.width / r);
                        var a = Math.floor(l.height / o);
                        this.style.sx = t % i * r;
                        this.style.sy = Math.floor(t / i) % a * o;
                    }
                    if (!e.loop && t > 0 && this.style.sx === 0 && this.style.sy === 0) {
                        this.style.img = undefined;
                        if (e.onOver) {
                            e.onOver.call(this);
                        } else {
                            this.remove();
                        }
                    }
                    e.lastFrameTime = e.lastFrameTime || 0;
                    if (this.$canvas.$nextTickTime - e.lastFrameTime >= s.utils.funcOrValue(e.interval, this)) {
                        e.lastFrameTime = this.$canvas.$nextTickTime;
                        e.index++;
                    }
                    this.style.sw = this.style.sw || r;
                    this.style.sh = this.style.sh || o;
                    this.style.tw = this.style.tw || r;
                    this.style.th = this.style.th || o;
                });
                return t;
            };
            var o = function e(l, t) {
                s = l;
                if (t) {
                    l.class[t] = r;
                }
                return r;
            };
            if (t && window.Easycanvas) {
                s = Easycanvas;
                Easycanvas.class.sequence = r;
            } else {
                e.exports = o;
            }
        },
        38: function(e, l, t) {
            "use strict";
            var s = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var t = arguments[l];
                    for (var s in t) {
                        if (Object.prototype.hasOwnProperty.call(t, s)) {
                            e[s] = t[s];
                        }
                    }
                }
                return e;
            };
            var r = t(14);
            var o = i(r);
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var a = typeof window !== "undefined";
            var n = {
                padding: 0,
                width: 300,
                lineHeight: 100,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var u = function e(l) {
                l.content.img = l.props ? (0, o.default)(l.props.text, s({}, n, {
                    lineHeight: l.props.size
                }, l.props)) : undefined;
            };
            var f = function e(l) {
                var t = void 0;
                t = new c.class.sprite(l);
                u(t);
                t.update = function(e) {
                    this.__proto__.update.call(this, e);
                    u(this);
                };
                return t;
            };
            var h = function e(l, t) {
                c = l;
                if (t) {
                    l.class[t] = f;
                }
                return f;
            };
            if (a && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.text = f;
            } else {
                e.exports = h;
            }
        }
    });
});

