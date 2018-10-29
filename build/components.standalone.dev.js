(function e(t, l) {
    if (typeof exports === "object" && typeof module === "object") module.exports = l(); else if (typeof define === "function" && define.amd) define([], l); else {
        var s = l();
        for (var r in s) (typeof exports === "object" ? exports : t)[r] = s[r];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function l(s) {
            if (t[s]) return t[s].exports;
            var r = t[s] = {
                exports: {},
                id: s,
                loaded: false
            };
            e[s].call(r.exports, r, r.exports, l);
            r.loaded = true;
            return r.exports;
        }
        l.m = e;
        l.c = t;
        l.p = "";
        return l(0);
    }({
        0: function(e, t, l) {
            e.exports = l(34);
        },
        14: function(e, t, l) {
            "use strict";
            var s = {};
            var r = "\n".slice(0, 1);
            var i = function e(t, l) {
                var i = String(t);
                var o = i + JSON.stringify(l);
                if (s[o]) {
                    return s[o];
                }
                var a;
                if (l.padding) {
                    a = l.padding.split(" ");
                    a = a.map(function(e) {
                        return parseInt(e);
                    });
                    a[1] = Number(a[1] || a[0]);
                    a[2] = Number(a[2] || a[0]);
                    a[3] = Number(a[3] || a[1]);
                } else {
                    a = [ 0, 0, 0, 0 ];
                }
                var n = l.minWidth || l.width || (l.size || 16) * i.length + a[1] + a[3] + 100;
                var c = i.split("\n").length;
                var u = (l.size || 16) * (Math.round(i.length) / n + c - 1) * (l.lineHeight || l.size) + a[0] + a[2] + 100;
                var f = document.createElement("canvas");
                f.width = n;
                f.height = u;
                var h = f.getContext("2d");
                window.tempCanvas = f;
                window.tempCtx = h;
                h.textBaseline = "middle";
                h.font = (l.style ? l.style + " " : "") + l.size + "px " + (l.family || "serif");
                h.fillStyle = l.color || "#000";
                h.textAlign = l.textAlign || "left";
                if (true) {
                    var v = [];
                    v.push("var tempCanvas = document.createElement('canvas')");
                    v.push("tempCanvas.width=" + f.width);
                    v.push("tempCanvas.height=" + f.height);
                    v.push("var tempCtx = tempCanvas.getContext('2d')");
                    v.push("tempCtx.textBaseline='" + h.textBaseline + "'");
                    v.push("tempCtx.font='" + h.font + "'");
                    v.push("tempCtx.fillStyle='" + h.fillStyle + "'");
                    v.push("tempCtx.textAlign='" + h.textAlign + "'");
                }
                var d = 0;
                var p = l.lineHeight ? (l.lineHeight - l.size) / 2 : 0;
                var g = 0;
                var m = 1;
                var y = false;
                var x = 0;
                while (true) {
                    var w = h.measureText(i.slice(g, m)).width;
                    if (w > l.width) {
                        if (l.overflow === "ellipsis") {
                            m -= 2;
                            h.fillText(i.slice(g, m) + "...", d, p + l.size / 2);
                            if (true) {
                                v.push("tempCtx.fillText('" + i.slice(g, m) + "...', " + d + ", " + (p + l.size / 2) + ")");
                            }
                            p += l.size + (l.lineHeight ? (l.lineHeight - l.size) / 2 : 0);
                            x = l.width - a[1] - a[3];
                            break;
                        } else {
                            m -= 1;
                            h.fillText(i.slice(g, m), d, p + l.size / 2);
                            if (true) {
                                v.push("tempCtx.fillText('" + i.slice(g, m) + "', " + d + ", " + (p + l.size / 2) + ")");
                            }
                            g = m;
                            m = g + 1;
                            p += l.size + (l.lineHeight ? (l.lineHeight - l.size) / 2 : 10);
                        }
                    } else {
                        if (m > i.length - 1) {
                            if (w > x) x = w;
                            h.fillText(i.slice(g, m), d, p + l.size / 2);
                            if (true) {
                                v.push("tempCtx.fillText('" + i.slice(g, m) + "', " + d + ", " + (p + l.size / 2) + ")");
                            }
                            p += l.size + (l.lineHeight ? (l.lineHeight - l.size) / 2 : 0);
                            break;
                        } else if (i.slice(m, m + 1) === r) {
                            h.fillText(i.slice(g, m), d, p + l.size / 2);
                            m += 1;
                            g = m;
                            m = g + 1;
                            p += l.size + (l.lineHeight ? (l.lineHeight - l.size) / 2 : 10);
                        }
                        if (w > x) x = w;
                        m++;
                    }
                }
                var $ = document.createElement("canvas");
                $.width = Math.max(x + a[1] + a[3], l.minWidth || 0);
                $.height = p + a[0] + a[2];
                var b = $.getContext("2d");
                if (true) {
                    v.push("var finalCanvas=document.createElement('canvas')");
                    v.push("finalCanvas.width=" + $.width);
                    v.push("finalCanvas.height=" + $.height);
                    v.push("var finalCtx = finalCanvas.getContext('2d')");
                }
                if (l.backgroundColor) {
                    b.fillStyle = l.backgroundColor;
                    b.fillRect(0, 0, $.width, $.height);
                    if (true) {
                        v.push("finalCtx.fillStyle=" + b.fillStyle);
                        v.push("finalCtx.fillRect(0, 0, " + $.width + ", " + $.height + ")");
                    }
                }
                b.drawImage(f, ($.width - x) / 2, a[0]);
                if (l.border) {
                    var S = l.border.split(" ");
                    b.beginPath();
                    b.moveTo(0, 0);
                    b.lineWidth = parseInt(S[0]);
                    b.strokeStyle = S[2] || S[1];
                    b.lineTo($.width, 0);
                    b.lineTo($.width, $.height);
                    b.lineTo(0, $.height);
                    b.lineTo(0, 0);
                    b.stroke();
                }
                if (true) {
                    $.$origin = v;
                }
                s[o] = $;
                return $;
            };
            e.exports = i;
        },
        34: function(e, t, l) {
            "use strict";
            var s = l(38);
            var r = f(s);
            var i = l(35);
            var o = f(i);
            var a = l(36);
            var n = f(a);
            var c = l(37);
            var u = f(c);
            function f(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = {
                button: o.default,
                scroll: n.default,
                text: r.default,
                sequence: u.default
            };
        },
        35: function(e, t, l) {
            "use strict";
            var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var l = arguments[t];
                    for (var s in l) {
                        if (Object.prototype.hasOwnProperty.call(l, s)) {
                            e[s] = l[s];
                        }
                    }
                }
                return e;
            };
            var r = l(14);
            var i = o(r);
            function o(e) {
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
            var u = function e(t, l) {
                t.buttonStyleNormal = s(n, {
                    minWidth: l.style.tw,
                    lineHeight: l.style.th,
                    padding: 0
                }, l.props.normal);
                t.buttonStyleHovered = s({}, t.buttonStyleNormal, l.props.hovered);
                t.buttonStylePressed = s({}, t.buttonStyleNormal, l.props.pressed);
                t.imageNormal = (0, i.default)(l.props.text || "", t.buttonStyleNormal);
                t.imageHovered = l.props.hovered && (0, i.default)(l.props.text || "", t.buttonStyleHovered);
                t.imagePressed = l.props.pressed && (0, i.default)(l.props.text || "", t.buttonStylePressed);
            };
            var f = function e(t) {
                var l = void 0;
                var s = t || {};
                t.props = t.props || {};
                var r = {
                    buttonStyleNormal: undefined,
                    buttonStyleHovered: undefined,
                    buttonStylePressed: undefined,
                    imageNormal: undefined,
                    imageHovered: undefined,
                    imagePressed: undefined
                };
                u(r, t);
                var i = {};
                t.events = t.events || {};
                i.touchmove = i.mousemove = function() {
                    l.content.img = r.imageHovered || r.imageNormal;
                };
                i.touchstart = i.mousedown = function() {
                    l.content.img = r.imagePressed || r.imageHovered || r.imageNormal;
                };
                i.touchend = i.touchout = i.mouseout = function() {
                    l.content.img = r.imageNormal;
                };
                i.mouseup = function() {
                    l.content.img = r.imageHovered || r.imageNormal;
                };
                i.click = function(e) {
                    t.events.click && t.events.click.call(l, e);
                };
                l = new c.class.sprite({
                    name: t.name || "button_" + t.props.text,
                    content: {
                        img: r.imageNormal
                    },
                    style: t.style,
                    props: t.props,
                    events: i,
                    hooks: t.hooks
                });
                l.update = function(e) {
                    this.__proto__.update.call(this, e);
                    u(r, t);
                    l.content.img = r.imageNormal;
                };
                return l;
            };
            var h = function e(t, l) {
                c = t;
                if (l) {
                    t.class[l] = f;
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
        36: function(e, t) {
            "use strict";
            var l = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var l = arguments[t];
                    for (var s in l) {
                        if (Object.prototype.hasOwnProperty.call(l, s)) {
                            e[s] = l[s];
                        }
                    }
                }
                return e;
            };
            var s = typeof window !== "undefined";
            var r = void 0;
            var i = void 0;
            var o = {
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
                        var l = t.scroll.anchorsRange || 400;
                        for (var s = 0; s < t.scroll.anchors.length; s++) {
                            var i = t.scroll.anchors[s];
                            var o = t.scroll.scrollY - i;
                            if (o > 0 && o < l && t.$scroll.speedY > 0 || o < 0 && o > -l && t.$scroll.speedY < 0) {
                                t.trigger("scrollTo", i, 200);
                                t.$scroll.speedY = 0;
                                break;
                            }
                        }
                    }
                    var a = r.utils.funcOrValue(t.scroll.minScrollX, t);
                    var n = r.utils.funcOrValue(t.scroll.maxScrollX, t);
                    var c = r.utils.funcOrValue(t.scroll.minScrollY, t);
                    var u = r.utils.funcOrValue(t.scroll.maxScrollY, t);
                    if (!isNaN(c) && t.scroll.scrollY < c) {
                        t.scroll.scrollY = c;
                    } else if (!isNaN(u) && t.scroll.scrollY > u) {
                        t.scroll.scrollY = u;
                    }
                    if (!isNaN(a) && t.scroll.scrollX < a) {
                        t.scroll.scrollX = a;
                    } else if (!isNaN(n) && t.scroll.scrollX > n) {
                        t.scroll.scrollX = n;
                    }
                },
                touch: function e(t, l) {
                    var s = Date.now();
                    t.$scroll.$wheeling = false;
                    if (!t.$scroll.touching) {
                        t.$scroll.touching = s;
                        t.$scroll.quickTouch = s;
                        t.$scroll.lastTouchSpeed = 0;
                        t.$scroll.startPos.x = l.canvasX;
                        t.$scroll.startPos.y = l.canvasY;
                        t.$scroll.speedX = 0;
                        t.$scroll.speedY = 0;
                    } else {
                        t.$scroll.$scrolling = true;
                        var i = t.$scroll.startPos.x - l.canvasX;
                        var o = t.$scroll.startPos.y - l.canvasY;
                        var a = s - t.$scroll.touching;
                        t.$scroll.touching = s;
                        var n = r.utils.funcOrValue(t.scroll.minScrollX, t);
                        var c = r.utils.funcOrValue(t.scroll.maxScrollX, t);
                        var u = r.utils.funcOrValue(t.scroll.minScrollY, t);
                        var f = r.utils.funcOrValue(t.scroll.maxScrollY, t);
                        if (t.scroll.scrollX + i < n || t.scroll.scrollX + i > c) {
                            if (t.scroll.flexible || t.scroll.flexibleX) i >>= 3; else i = 0;
                        }
                        if (t.scroll.scrollY + o < u || t.scroll.scrollY + o > f) {
                            if (t.scroll.flexible || t.scroll.flexibleY) o >>= 3; else o = 0;
                        }
                        if (Math.abs(i) >= 1 && a > 1) {
                            var h = (l.canvasX - t.$scroll.startPos.x) / a * 20;
                            t.$scroll.speedX = h;
                            t.scroll.scrollX += i;
                        }
                        if (Math.abs(o) >= 1 && a > 1) {
                            var v = (l.canvasY - t.$scroll.startPos.y) / a * 20;
                            t.$scroll.speedY = (t.$scroll.lastTouchSpeed + v) / (t.$scroll.lastTouchSpeed ? 2 : 1);
                            t.$scroll.lastTouchSpeed = v;
                            t.scroll.scrollY += o;
                        }
                        t.$scroll.startPos.x = l.canvasX;
                        t.$scroll.startPos.y = l.canvasY;
                        if (Math.abs(i) > Math.abs(o) + 1) return 1; else if (Math.abs(i) < Math.abs(o) - 1) return 2;
                    }
                },
                wheel: function e(t, l) {
                    t.$scroll.speedX = r.utils.funcOrValue(t.scroll.scrollableX, t) ? l.event.wheelDeltaX : 0;
                    t.$scroll.speedY = r.utils.funcOrValue(t.scroll.scrollableY, t) ? l.event.wheelDeltaY : 0;
                    t.$scroll.$scrolling = true;
                    t.$scroll.$wheeling = true;
                    l.stopPropagation();
                }
            };
            var a = function e(t) {
                var s = false;
                var a = t || {};
                a.scroll = l({
                    scrollX: 0,
                    scrollY: 0,
                    scrollableX: function e() {
                        return (this.style.overflowX || this.style.overflow) !== "hidden";
                    },
                    scrollableY: function e() {
                        return (this.style.overflowY || this.style.overflow) !== "hidden";
                    },
                    minScrollX: 0,
                    maxScrollX: function e() {
                        var t = this;
                        var l = 0;
                        this.getChildren().forEach(function(e) {
                            var s = e.getSelfStyle("tx") + e.getSelfStyle("tw") - t.getStyle("tw");
                            if (s > l) l = s;
                        });
                        return l;
                    },
                    minScrollY: 0,
                    maxScrollY: function e() {
                        var t = this;
                        var l = 0;
                        this.getChildren().forEach(function(e) {
                            var s = e.getSelfStyle("ty") + e.getSelfStyle("th") - t.getStyle("th");
                            if (s > l) l = s;
                        });
                        return l;
                    },
                    propagationX: false,
                    propagationY: false
                }, t.scroll);
                var n = function e() {
                    if (s) {
                        u.scroll.scrollY = s();
                    } else {
                        u.off("ticked", e);
                    }
                };
                var c = false;
                a.events = l({
                    touchstart: function e(t) {
                        o.loose(this);
                        c = true;
                        i = false;
                        o.touch(this, t);
                        if (!u.scroll.propagationX && !u.scroll.propagationY) {
                            t.stopPropagation();
                        }
                    },
                    touchmove: function e(t) {
                        if (!c) return;
                        if (i && this !== i) {
                            return;
                        }
                        var l = o.touch(this, t);
                        if (l === 1 && u.scroll.propagationY) {
                            t.stopPropagation();
                            i = this;
                        } else if (l === 2 && u.scroll.propagationX) {
                            t.stopPropagation();
                            i = this;
                        }
                    },
                    mousewheel: function e(t) {
                        c = true;
                        o.wheel(this, t);
                        t.stopPropagation();
                    },
                    touchend: function e() {
                        c = false;
                        o.loose(this);
                    },
                    mouseup: function e() {
                        c = false;
                        o.loose(this);
                    }
                }, a.events || {});
                if (a.scroll.capture) {
                    a.events.interceptor = function(e) {
                        if (u.events[e.type]) {
                            u.events[e.type].call(u, e);
                            return false;
                        }
                        return e;
                    };
                }
                var u = new r.class.sprite(a);
                u.on("ticked", function() {
                    o.looper(u);
                });
                u.on("scrollTo", function(e, t, l) {
                    s = r.transition.pendulum(u.scroll.scrollY, e, (t || 200) * 2, {
                        cycle: .5
                    }).then(function() {
                        s = false;
                        l && l();
                    });
                    u.on("ticked", n);
                });
                u.$scroll = {
                    speedX: 0,
                    speedY: 0,
                    touching: false,
                    startPos: {},
                    lastTouchSpeed: 0
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
            var n = function e(t, l) {
                r = t;
                if (l) {
                    t.class[l] = a;
                }
                return a;
            };
            if (s && window.Easycanvas) {
                r = Easycanvas;
                Easycanvas.class.scroll = a;
            } else {
                e.exports = n;
            }
        },
        37: function(e, t) {
            "use strict";
            var l = typeof window !== "undefined";
            var s = void 0;
            var r = function e(t) {
                var l = new s.class.sprite(t);
                t.props.index = t.props.index || 0;
                l.on("beforeTick", function() {
                    var e = this.props;
                    var t = s.utils.funcOrValue(this.content.img, this);
                    if (!t || !t.width) return;
                    var l = e.index || 0;
                    if (l < 0) l = 0;
                    var r = void 0, i = void 0;
                    if (e.frameWidth || e.frameHeight) {
                        if (e.frameWidth < 0) {
                            r = t.width / -e.frameWidth;
                        } else {
                            r = e.frameWidth;
                        }
                        if (e.frameHeight < 0) {
                            i = t.height / -e.frameHeight;
                        } else {
                            i = e.frameHeight;
                        }
                        var o = Math.floor(t.width / r);
                        var a = Math.floor(t.height / i);
                        this.style.sx = l % o * r;
                        this.style.sy = Math.floor(l / o) % a * i;
                    }
                    if (!e.loop && l > 0 && this.style.sx === 0 && this.style.sy === 0) {
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
                    this.style.sh = this.style.sh || i;
                    this.style.tw = this.style.tw || r;
                    this.style.th = this.style.th || i;
                });
                return l;
            };
            var i = function e(t, l) {
                s = t;
                if (l) {
                    t.class[l] = r;
                }
                return r;
            };
            if (l && window.Easycanvas) {
                s = Easycanvas;
                Easycanvas.class.sequence = r;
            } else {
                e.exports = i;
            }
        },
        38: function(e, t, l) {
            "use strict";
            var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var l = arguments[t];
                    for (var s in l) {
                        if (Object.prototype.hasOwnProperty.call(l, s)) {
                            e[s] = l[s];
                        }
                    }
                }
                return e;
            };
            var r = l(14);
            var i = o(r);
            function o(e) {
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
            var u = function e(t) {
                t.content.img = t.props ? (0, i.default)(t.props.text, s({}, n, {
                    lineHeight: t.props.size
                }, t.props)) : undefined;
            };
            var f = function e(t) {
                var l = void 0;
                l = new c.class.sprite(t);
                u(l);
                l.update = function(e) {
                    this.__proto__.update.call(this, e);
                    u(this);
                };
                return l;
            };
            var h = function e(t, l) {
                c = t;
                if (l) {
                    t.class[l] = f;
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

