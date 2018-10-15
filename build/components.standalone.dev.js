(function e(l, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else {
        var t = r();
        for (var s in t) (typeof exports === "object" ? exports : l)[s] = t[s];
    }
})(this, function() {
    return function(e) {
        var l = {};
        function r(t) {
            if (l[t]) return l[t].exports;
            var s = l[t] = {
                exports: {},
                id: t,
                loaded: false
            };
            e[t].call(s.exports, s, s.exports, r);
            s.loaded = true;
            return s.exports;
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
            var t = function e(l, t) {
                var s = l + JSON.stringify(t);
                if (r[s]) {
                    return r[s];
                }
                var o;
                if (t.padding) {
                    o = t.padding.split(" ");
                    o = o.map(function(e) {
                        return parseInt(e);
                    });
                    o[1] = Number(o[1] || o[0]);
                    o[2] = Number(o[2] || o[0]);
                    o[3] = Number(o[3] || o[1]);
                } else {
                    o = [ 0, 0, 0, 0 ];
                }
                var i = t.minWidth || t.width || (t.size || 16) * l.length + o[1] + o[3] + 100;
                var n = (t.size || 16) * Math.round(l.length) / i * (t.lineHeight || t.size) + o[0] + o[2] + 100;
                var a = document.createElement("canvas");
                a.width = i;
                a.height = n;
                var c = a.getContext("2d");
                window.tempCanvas = a;
                window.tempCtx = c;
                c.textBaseline = "middle";
                c.font = t.size + "px " + (t.family || "serif");
                c.fillStyle = t.color || "#000";
                c.textAlign = t.textAlign || "left";
                var u = 0;
                var f = t.lineHeight ? (t.lineHeight - t.size) / 2 : 0;
                var v = 0;
                var d = 1;
                var p = false;
                var h = 0;
                while (true) {
                    var g = c.measureText(l.slice(v, d)).width;
                    if (g > t.width && l[d] !== " ") {
                        if (t.overflow === "ellipsis") {
                            d -= 2;
                            c.fillText(l.slice(v, d) + "...", u, f + t.size / 2);
                            f += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 0);
                            h = t.width - o[1] - o[3];
                            break;
                        } else {
                            if (d - v <= 1) {
                                console.error("Width not enough.");
                                break;
                            }
                            d -= 1;
                            c.fillText(l.slice(v, d), u, f + t.size / 2);
                            v = d;
                            if (l[v] === " ") v++;
                            d = v + 1;
                            f += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 10);
                        }
                    } else {
                        if (d > l.length - 1) {
                            if (g > h) h = g;
                            c.fillText(l.slice(v, d), u, f + t.size / 2);
                            f += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 0);
                            break;
                        }
                        if (g > h) h = g;
                        d++;
                    }
                }
                f += Math.floor(t.size * .1);
                var m = document.createElement("canvas");
                m.width = Math.max(h + o[1] + o[3], t.minWidth || 0);
                m.height = f + o[0] + o[2];
                var y = m.getContext("2d");
                if (t.backgroundColor) {
                    y.fillStyle = t.backgroundColor;
                    y.fillRect(0, 0, m.width, m.height);
                }
                y.drawImage(a, (m.width - h) / 2, o[0]);
                if (t.border) {
                    var w = t.border.split(" ");
                    y.beginPath();
                    y.moveTo(0, 0);
                    y.lineWidth = parseInt(w[0]);
                    y.strokeStyle = w[2] || w[1];
                    y.lineTo(m.width, 0);
                    y.lineTo(m.width, m.height);
                    y.lineTo(0, m.height);
                    y.lineTo(0, 0);
                    y.stroke();
                }
                r[s] = m;
                return m;
            };
            e.exports = t;
        },
        34: function(e, l, r) {
            "use strict";
            var t = r(35);
            var s = c(t);
            var o = r(36);
            var i = c(o);
            var n = r(37);
            var a = c(n);
            function c(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = {
                button: s.default,
                scroll: i.default,
                text: a.default
            };
        },
        35: function(e, l, r) {
            "use strict";
            var t = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var r = arguments[l];
                    for (var t in r) {
                        if (Object.prototype.hasOwnProperty.call(r, t)) {
                            e[t] = r[t];
                        }
                    }
                }
                return e;
            };
            var s = r(14);
            var o = i(s);
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var n = typeof window !== "undefined";
            var a = {
                padding: 0,
                width: 300,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var u = function e(l) {
                var r = void 0;
                var s = l || {};
                l.props = l.props || {};
                var i = t(a, {
                    minWidth: l.style.tw,
                    lineHeight: l.style.th,
                    padding: 0
                }, l.props.normal);
                var n = t({}, i, l.props.hovered);
                var u = t({}, i, l.props.pressed);
                var f = (0, o.default)(l.props.text || "", i);
                var v = l.props.hovered && (0, o.default)(l.props.text || "", n);
                var d = l.props.pressed && (0, o.default)(l.props.text || "", u);
                var p = {};
                l.events = l.events || {};
                p.touchmove = p.mousemove = function() {
                    r.content.img = v || f;
                };
                p.touchstart = p.mousedown = function() {
                    r.content.img = d || v || f;
                };
                p.touchend = p.touchout = p.mouseout = function() {
                    r.content.img = f;
                };
                p.mouseup = function() {
                    r.content.img = v || f;
                };
                p.click = function(e) {
                    l.events.click && l.events.click.call(r, e);
                };
                r = new c.class.sprite({
                    name: l.name || "button",
                    content: {
                        img: f
                    },
                    style: l.style,
                    props: l.props,
                    events: p,
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
            if (n && window.Easycanvas) {
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
                    for (var t in r) {
                        if (Object.prototype.hasOwnProperty.call(r, t)) {
                            e[t] = r[t];
                        }
                    }
                }
                return e;
            };
            var t = typeof window !== "undefined";
            var s = window.devicePixelRatio || 1;
            var o = void 0;
            var i = void 0;
            var n = {
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
                    var r = o.utils.funcOrValue(l.scroll.minScrollX, l);
                    var t = o.utils.funcOrValue(l.scroll.maxScrollX, l);
                    var s = o.utils.funcOrValue(l.scroll.minScrollY, l);
                    var i = o.utils.funcOrValue(l.scroll.maxScrollY, l);
                    if (!isNaN(s) && l.scroll.scrollY < s) {
                        l.scroll.scrollY = s;
                    } else if (!isNaN(i) && l.scroll.scrollY > i) {
                        l.scroll.scrollY = i;
                    }
                    if (!isNaN(r) && l.scroll.scrollX < r) {
                        l.scroll.scrollX = r;
                    } else if (!isNaN(t) && l.scroll.scrollX > t) {
                        l.scroll.scrollX = t;
                    }
                },
                touch: function e(l, r) {
                    var t = Date.now();
                    if (!l.$scroll.touching) {
                        l.$scroll.touching = t;
                        l.$scroll.quickTouch = t;
                        l.$scroll.startPos.x = r.canvasX;
                        l.$scroll.startPos.y = r.canvasY;
                        l.$scroll.speedX = 0;
                        l.$scroll.speedY = 0;
                    } else {
                        l.$scroll.$scrolling = true;
                        var i = l.$scroll.startPos.x - r.canvasX;
                        var n = l.$scroll.startPos.y - r.canvasY;
                        var a = t - l.$scroll.touching;
                        l.$scroll.touching = t;
                        var c = o.utils.funcOrValue(l.scroll.minScrollX, l);
                        var u = o.utils.funcOrValue(l.scroll.maxScrollX, l);
                        var f = o.utils.funcOrValue(l.scroll.minScrollY, l);
                        var v = o.utils.funcOrValue(l.scroll.maxScrollY, l);
                        if (l.scroll.scrollX + i < c || l.scroll.scrollX + i > u) {
                            if (l.scroll.flexible || l.scroll.flexibleX) i >>= 3; else i = 0;
                        }
                        if (l.scroll.scrollY + n < f || l.scroll.scrollY + n > v) {
                            if (l.scroll.flexible || l.scroll.flexibleY) n >>= 3; else n = 0;
                        }
                        if (Math.abs(i) >= 1 && a > 1) {
                            var d = (r.canvasX - l.$scroll.startPos.x) * 9 / s;
                            l.$scroll.speedX = Math.abs(d / 2) > Math.abs(l.$scroll.speedX) ? d : l.$scroll.speedX;
                            l.scroll.scrollX += i;
                        }
                        if (Math.abs(n) >= 1 && a > 1) {
                            var p = (r.canvasY - l.$scroll.startPos.y) * 9 / s;
                            l.$scroll.speedY = Math.abs(p / 2) > Math.abs(l.$scroll.speedY) ? p : l.$scroll.speedY;
                            l.scroll.scrollY += n;
                        }
                        l.$scroll.startPos.x = r.canvasX;
                        l.$scroll.startPos.y = r.canvasY;
                        if (Math.abs(i) > Math.abs(n) + 1) return 1; else if (Math.abs(i) < Math.abs(n) - 1) return 2;
                    }
                },
                wheel: function e(l, r) {
                    l.$scroll.speedX = o.utils.funcOrValue(l.scroll.scrollableX, l) ? r.event.wheelDeltaX : 0;
                    l.$scroll.speedY = o.utils.funcOrValue(l.scroll.scrollableY, l) ? r.event.wheelDeltaY : 0;
                    l.$scroll.$scrolling = true;
                    r.stopPropagation();
                }
            };
            var a = function e(l) {
                var t = false;
                var s = l || {};
                s.scroll = r({
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
                            var t = e.getSelfStyle("tx") + e.getSelfStyle("tw") - l.getStyle("tw");
                            if (t > r) r = t;
                        });
                        return r;
                    },
                    minScrollY: 0,
                    maxScrollY: function e() {
                        var l = this;
                        var r = 0;
                        this.getChildren().forEach(function(e) {
                            var t = e.getSelfStyle("ty") + e.getSelfStyle("th") - l.getStyle("th");
                            if (t > r) r = t;
                        });
                        return r;
                    },
                    propagationX: false,
                    propagationY: false
                }, l.scroll);
                var a = function e() {
                    if (t) {
                        u.scroll.scrollY = t();
                    } else {
                        u.off("ticked", e);
                    }
                };
                var c = false;
                s.events = r({
                    touchstart: function e(l) {
                        n.loose(this);
                        c = true;
                        i = false;
                        n.touch(this, l);
                        if (!u.scroll.propagationX && !u.scroll.propagationY) {
                            l.stopPropagation();
                        }
                    },
                    touchmove: function e(l) {
                        if (!c) return;
                        if (i && this !== i) {
                            return;
                        }
                        var r = n.touch(this, l);
                        if (r === 1 && u.scroll.propagationY) {
                            l.stopPropagation();
                            i = this;
                        } else if (r === 2 && u.scroll.propagationX) {
                            l.stopPropagation();
                            i = this;
                        }
                    },
                    mousewheel: function e(l) {
                        c = true;
                        n.wheel(this, l);
                        l.stopPropagation();
                    },
                    touchend: function e() {
                        c = false;
                        n.loose(this);
                    },
                    mouseup: function e() {
                        c = false;
                        n.loose(this);
                    }
                }, s.events || {});
                if (s.scroll.capture) {
                    s.events.interceptor = function(e) {
                        if (u.events[e.type]) {
                            u.events[e.type].call(u, e);
                            return false;
                        }
                        return e;
                    };
                }
                var u = new o.class.sprite(s);
                u.on("ticked", function() {
                    n.looper(u);
                });
                u.on("scrollTo", function(e, l, r) {
                    t = o.transition.pendulum(u.scroll.scrollY, e, (l || 200) * 2, {
                        cycle: .5
                    }).then(function() {
                        t = false;
                        r && r();
                    });
                    u.on("ticked", a);
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
                    l.class[r] = a;
                }
                return a;
            };
            if (t && window.Easycanvas) {
                o = Easycanvas;
                Easycanvas.class.scroll = a;
            } else {
                e.exports = c;
            }
        },
        37: function(e, l, r) {
            "use strict";
            var t = Object.assign || function(e) {
                for (var l = 1; l < arguments.length; l++) {
                    var r = arguments[l];
                    for (var t in r) {
                        if (Object.prototype.hasOwnProperty.call(r, t)) {
                            e[t] = r[t];
                        }
                    }
                }
                return e;
            };
            var s = r(14);
            var o = i(s);
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var n = typeof window !== "undefined";
            var a = {
                padding: 0,
                width: 300,
                lineHeight: 100,
                height: 100,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var u = function e(l) {
                var r = void 0;
                var s = l || {};
                r = new c.class.sprite({
                    name: l.name || "text",
                    content: {
                        img: (0, o.default)(l.content.text, t({}, a, {
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
            if (n && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.text = u;
            } else {
                e.exports = f;
            }
        }
    });
});

