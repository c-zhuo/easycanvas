(function e(l, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var s = r();
        for (var t in s) (typeof exports === "object" ? exports : l)[t] = s[t];
    }
})(this, function() {
    return function(e) {
        var l = {};
        function r(s) {
            if (l[s]) return l[s].exports;
            var t = l[s] = {
                exports: {},
                id: s,
                loaded: false
            };
            e[s].call(t.exports, t, t.exports, r);
            t.loaded = true;
            return t.exports;
        }
        r.m = e;
        r.c = l;
        r.p = "";
        return r(0);
    }({
        0: function(e, l, r) {
            e.exports = r(34);
        },
        14: function(e, l) {
            "use strict";
            var r = {};
            var s = function e(l, s) {
                var t = l + JSON.stringify(s);
                if (r[t]) {
                    return r[t];
                }
                var o;
                if (s.padding) {
                    o = s.padding.split(" ");
                    o = o.map(function(e) {
                        return parseInt(e);
                    });
                    o[1] = Number(o[1] || o[0]);
                    o[2] = Number(o[2] || o[0]);
                    o[3] = Number(o[3] || o[1]);
                } else {
                    o = [ 0, 0, 0, 0 ];
                }
                var n = s.minWidth || s.width || (s.size || 16) * l.length + o[1] + o[3] + 100;
                var a = (s.size || 16) * Math.round(l.length) / n * (s.lineHeight || s.size) + o[0] + o[2] + 100;
                var i = document.createElement("canvas");
                i.width = n;
                i.height = a;
                var c = i.getContext("2d");
                window.tempCanvas = i;
                window.tempCtx = c;
                c.textBaseline = "middle";
                c.font = s.size + "px " + (s.family || "serif");
                c.fillStyle = s.color || "#000";
                c.textAlign = s.textAlign || "left";
                var u = 0;
                var f = s.lineHeight ? (s.lineHeight - s.size) / 2 : 0;
                var v = 0;
                var h = 1;
                var d = false;
                var p = 0;
                while (true) {
                    var g = c.measureText(l.slice(v, h)).width;
                    if (g > s.width && l[h] !== " ") {
                        if (s.overflow === "ellipsis") {
                            h -= 2;
                            c.fillText(l.slice(v, h) + "...", u, f + s.size / 2);
                            f += s.size + (s.lineHeight ? (s.lineHeight - s.size) / 2 : 0);
                            p = s.width - o[1] - o[3];
                            break;
                        } else {
                            if (h - v <= 1) {
                                console.error("Width not enough.");
                                break;
                            }
                            h -= 1;
                            c.fillText(l.slice(v, h), u, f + s.size / 2);
                            v = h;
                            if (l[v] === " ") v++;
                            h = v + 1;
                            f += s.size + (s.lineHeight ? (s.lineHeight - s.size) / 2 : 10);
                        }
                    } else {
                        if (h > l.length - 1) {
                            if (g > p) p = g;
                            c.fillText(l.slice(v, h), u, f + s.size / 2);
                            f += s.size + (s.lineHeight ? (s.lineHeight - s.size) / 2 : 0);
                            break;
                        }
                        if (g > p) p = g;
                        h++;
                    }
                }
                f += Math.floor(s.size * .1);
                var m = document.createElement("canvas");
                m.width = Math.max(p + o[1] + o[3], s.minWidth || 0);
                m.height = f + o[0] + o[2];
                var y = m.getContext("2d");
                if (s.backgroundColor) {
                    y.fillStyle = s.backgroundColor;
                    y.fillRect(0, 0, m.width, m.height);
                }
                y.drawImage(i, (m.width - p) / 2, o[0]);
                if (s.border) {
                    var $ = s.border.split(" ");
                    y.beginPath();
                    y.moveTo(0, 0);
                    y.lineWidth = parseInt($[0]);
                    y.strokeStyle = $[2] || $[1];
                    y.lineTo(m.width, 0);
                    y.lineTo(m.width, m.height);
                    y.lineTo(0, m.height);
                    y.lineTo(0, 0);
                    y.stroke();
                }
                r[t] = m;
                return m;
            };
            e.exports = s;
        },
        34: function(e, l, r) {
            "use strict";
            var s = r(35);
            var t = c(s);
            var o = r(36);
            var n = c(o);
            var a = r(37);
            var i = c(a);
            function c(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = {
                button: t.default,
                scroll: n.default,
                text: i.default
            };
        },
        35: function(e, l, r) {
            "use strict";
            var s = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var r = arguments[l];
                    for (var s in r) {
                        if (Object.prototype.hasOwnProperty.call(r, s)) {
                            e[s] = r[s];
                        }
                    }
                }
                return e;
            };
            var t = r(14);
            var o = n(t);
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var a = typeof window !== "undefined";
            var i = {
                padding: 0,
                width: 300,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var u = function e(l) {
                var r = void 0;
                var t = l || {};
                l.props = l.props || {};
                var n = s(i, {
                    minWidth: l.style.tw,
                    lineHeight: l.style.th,
                    padding: 0
                }, l.props.normal);
                var a = s({}, n, l.props.hovered);
                var u = s({}, n, l.props.pressed);
                var f = (0, o.default)(l.props.text || "", n);
                var v = l.props.hovered && (0, o.default)(l.props.text || "", a);
                var h = l.props.pressed && (0, o.default)(l.props.text || "", u);
                var d = {};
                l.events = l.events || {};
                d.touchmove = d.mousemove = function() {
                    r.content.img = v || f;
                };
                d.touchstart = d.mousedown = function() {
                    r.content.img = h || v || f;
                };
                d.touchend = d.touchout = d.mouseout = function() {
                    r.content.img = f;
                };
                d.mouseup = function() {
                    r.content.img = v || f;
                };
                d.click = function(e) {
                    l.events.click && l.events.click.call(r, e);
                };
                r = new c.class.sprite({
                    name: l.name || "button",
                    content: {
                        img: f
                    },
                    style: l.style,
                    props: l.props,
                    events: d,
                    hooks: l.hooks
                });
                return r;
            };
            var f = function e(l, r) {
                c = l;
                if (r) {
                    l.class[r] = u;
                }
                return u;
            };
            if (a && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.button = u;
            } else {
                e.exports = f;
            }
        },
        36: function(e, l) {
            "use strict";
            var r = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var r = arguments[l];
                    for (var s in r) {
                        if (Object.prototype.hasOwnProperty.call(r, s)) {
                            e[s] = r[s];
                        }
                    }
                }
                return e;
            };
            var s = typeof window !== "undefined";
            var t = window.devicePixelRatio || 1;
            var o = void 0;
            var n = void 0;
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
                    if (Math.abs(l.$scroll.speedX) <= 2 && Math.abs(l.$scroll.speedY) <= 2) {
                        l.$scroll.$scrolling = false;
                        return;
                    }
                    if (l.$scroll.touching) {
                        if (Date.now() - l.$scroll.touching > 100) {
                            l.$scroll.speedX *= .5;
                            l.$scroll.speedY *= .5;
                        }
                        return;
                    }
                    l.scroll.scrollY -= l.$scroll.speedY;
                    l.scroll.scrollX -= l.$scroll.speedX;
                    if (!l.$scroll.touching && Math.abs(l.$scroll.speedY) < 200 && l.scroll.anchors && l.scroll.anchors.length) {
                        var r = l.scroll.anchorsRange || 400;
                        for (var s = 0; s < l.scroll.anchors.length; s++) {
                            var t = l.scroll.anchors[s];
                            var n = l.scroll.scrollY - t;
                            if (n > 0 && n < r && l.$scroll.speedY > 0 || n < 0 && n > -r && l.$scroll.speedY < 0) {
                                l.trigger("scrollTo", t, 300);
                                l.$scroll.speedY = 0;
                                break;
                            }
                        }
                    }
                    var a = o.utils.funcOrValue(l.scroll.minScrollX, l);
                    var i = o.utils.funcOrValue(l.scroll.maxScrollX, l);
                    var c = o.utils.funcOrValue(l.scroll.minScrollY, l);
                    var u = o.utils.funcOrValue(l.scroll.maxScrollY, l);
                    if (!isNaN(c) && l.scroll.scrollY < c) {
                        l.scroll.scrollY = c;
                    } else if (!isNaN(u) && l.scroll.scrollY > u) {
                        l.scroll.scrollY = u;
                    }
                    if (!isNaN(a) && l.scroll.scrollX < a) {
                        l.scroll.scrollX = a;
                    } else if (!isNaN(i) && l.scroll.scrollX > i) {
                        l.scroll.scrollX = i;
                    }
                },
                touch: function e(l, r) {
                    var s = Date.now();
                    if (!l.$scroll.touching) {
                        l.$scroll.touching = s;
                        l.$scroll.quickTouch = s;
                        l.$scroll.startPos.x = r.canvasX;
                        l.$scroll.startPos.y = r.canvasY;
                        l.$scroll.speedX = 0;
                        l.$scroll.speedY = 0;
                    } else {
                        l.$scroll.$scrolling = true;
                        var n = l.$scroll.startPos.x - r.canvasX;
                        var a = l.$scroll.startPos.y - r.canvasY;
                        var i = s - l.$scroll.touching;
                        l.$scroll.touching = s;
                        var c = o.utils.funcOrValue(l.scroll.minScrollX, l);
                        var u = o.utils.funcOrValue(l.scroll.maxScrollX, l);
                        var f = o.utils.funcOrValue(l.scroll.minScrollY, l);
                        var v = o.utils.funcOrValue(l.scroll.maxScrollY, l);
                        if (l.scroll.scrollX + n < c || l.scroll.scrollX + n > u) {
                            if (l.scroll.flexible || l.scroll.flexibleX) n >>= 3; else n = 0;
                        }
                        if (l.scroll.scrollY + a < f || l.scroll.scrollY + a > v) {
                            if (l.scroll.flexible || l.scroll.flexibleY) a >>= 3; else a = 0;
                        }
                        if (Math.abs(n) >= 1 && i > 1) {
                            var h = (r.canvasX - l.$scroll.startPos.x) * 9 / t;
                            l.$scroll.speedX = Math.abs(h / 2) > Math.abs(l.$scroll.speedX) ? h : l.$scroll.speedX;
                            l.scroll.scrollX += n;
                        }
                        if (Math.abs(a) >= 1 && i > 1) {
                            var d = (r.canvasY - l.$scroll.startPos.y) * 9 / t;
                            l.$scroll.speedY = Math.abs(d / 2) > Math.abs(l.$scroll.speedY) ? d : l.$scroll.speedY;
                            l.scroll.scrollY += a;
                        }
                        l.$scroll.startPos.x = r.canvasX;
                        l.$scroll.startPos.y = r.canvasY;
                        if (Math.abs(n) > Math.abs(a) + 1) return 1; else if (Math.abs(n) < Math.abs(a) - 1) return 2;
                    }
                },
                wheel: function e(l, r) {
                    l.$scroll.speedX = o.utils.funcOrValue(l.scroll.scrollableX, l) ? r.event.wheelDeltaX : 0;
                    l.$scroll.speedY = o.utils.funcOrValue(l.scroll.scrollableY, l) ? r.event.wheelDeltaY : 0;
                    l.$scroll.$scrolling = true;
                    r.stopPropagation();
                }
            };
            var i = function e(l) {
                var s = false;
                var t = l || {};
                t.scroll = r({
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
                        var l = this;
                        var r = 0;
                        this.getChildren().forEach(function(e) {
                            var s = e.getSelfStyle("tx") + e.getSelfStyle("tw") - l.getStyle("tw");
                            if (s > r) r = s;
                        });
                        return r;
                    },
                    minScrollY: 0,
                    maxScrollY: function e() {
                        var l = this;
                        var r = 0;
                        this.getChildren().forEach(function(e) {
                            var s = e.getSelfStyle("ty") + e.getSelfStyle("th") - l.getStyle("th");
                            if (s > r) r = s;
                        });
                        return r;
                    },
                    propagationX: false,
                    propagationY: false
                }, l.scroll);
                var i = function e() {
                    if (s) {
                        u.scroll.scrollY = s();
                    } else {
                        u.off("ticked", e);
                    }
                };
                var c = false;
                t.events = r({
                    touchstart: function e(l) {
                        a.loose(this);
                        c = true;
                        n = false;
                        a.touch(this, l);
                        if (!u.scroll.propagationX && !u.scroll.propagationY) {
                            l.stopPropagation();
                        }
                    },
                    touchmove: function e(l) {
                        if (!c) return;
                        if (n && this !== n) {
                            return;
                        }
                        var r = a.touch(this, l);
                        if (r === 1 && u.scroll.propagationY) {
                            l.stopPropagation();
                            n = this;
                        } else if (r === 2 && u.scroll.propagationX) {
                            l.stopPropagation();
                            n = this;
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
                }, t.events || {});
                if (t.scroll.capture) {
                    t.events.interceptor = function(e) {
                        if (u.events[e.type]) {
                            u.events[e.type].call(u, e);
                            return false;
                        }
                        return e;
                    };
                }
                var u = new o.class.sprite(t);
                u.on("ticked", function() {
                    a.looper(u);
                });
                u.on("scrollTo", function(e, l, r) {
                    s = o.transition.pendulum(u.scroll.scrollY, e, (l || 200) * 2, {
                        cycle: .5
                    }).then(function() {
                        s = false;
                        r && r();
                    });
                    u.on("ticked", i);
                });
                u.$scroll = {
                    speedX: 0,
                    speedY: 0,
                    touching: false,
                    startPos: {}
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
            var c = function e(l, r) {
                o = l;
                if (r) {
                    l.class[r] = i;
                }
                return i;
            };
            if (s && window.Easycanvas) {
                o = Easycanvas;
                Easycanvas.class.scroll = i;
            } else {
                e.exports = c;
            }
        },
        37: function(e, l, r) {
            "use strict";
            var s = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var r = arguments[l];
                    for (var s in r) {
                        if (Object.prototype.hasOwnProperty.call(r, s)) {
                            e[s] = r[s];
                        }
                    }
                }
                return e;
            };
            var t = r(14);
            var o = n(t);
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var a = typeof window !== "undefined";
            var i = {
                padding: 0,
                width: 300,
                lineHeight: 100,
                height: 100,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var u = function e(l) {
                var r = void 0;
                var t = l || {};
                r = new c.class.sprite({
                    name: l.name || "text",
                    content: {
                        img: (0, o.default)(l.content.text, s({}, i, {
                            lineHeight: l.props.size
                        }, l.props))
                    },
                    style: l.style,
                    events: l.events,
                    hooks: l.hooks
                });
                return r;
            };
            var f = function e(l, r) {
                c = l;
                if (r) {
                    l.class[r] = u;
                }
                return u;
            };
            if (a && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.text = u;
            } else {
                e.exports = f;
            }
        }
    });
});

