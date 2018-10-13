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
                var a = s.minWidth || s.width || (s.size || 16) * l.length + o[1] + o[3] + 100;
                var n = (s.size || 16) * Math.round(l.length) / a * (s.lineHeight || s.size) + o[0] + o[2] + 100;
                var i = document.createElement("canvas");
                i.width = a;
                i.height = n;
                var c = i.getContext("2d");
                window.tempCanvas = i;
                window.tempCtx = c;
                c.textBaseline = "middle";
                c.font = s.size + "px " + (s.family || "serif");
                c.fillStyle = s.color || "#000";
                c.textAlign = s.textAlign || "left";
                var f = 0;
                var u = s.lineHeight ? (s.lineHeight - s.size) / 2 : 0;
                var v = 0;
                var p = 1;
                var d = false;
                var h = 0;
                while (true) {
                    var g = c.measureText(l.slice(v, p)).width;
                    if (g > s.width && l[p] !== " ") {
                        if (s.overflow === "ellipsis") {
                            p -= 2;
                            c.fillText(l.slice(v, p) + "...", f, u + s.size / 2);
                            u += s.size + (s.lineHeight ? (s.lineHeight - s.size) / 2 : 0);
                            h = s.width - o[1] - o[3];
                            break;
                        } else {
                            if (p - v <= 1) {
                                console.error("Width not enough.");
                                break;
                            }
                            p -= 1;
                            c.fillText(l.slice(v, p), f, u + s.size / 2);
                            v = p;
                            if (l[v] === " ") v++;
                            p = v + 1;
                            u += s.size + (s.lineHeight ? (s.lineHeight - s.size) / 2 : 10);
                        }
                    } else {
                        if (p > l.length - 1) {
                            if (g > h) h = g;
                            c.fillText(l.slice(v, p), f, u + s.size / 2);
                            u += s.size + (s.lineHeight ? (s.lineHeight - s.size) / 2 : 0);
                            break;
                        }
                        if (g > h) h = g;
                        p++;
                    }
                }
                u += Math.floor(s.size * .1);
                var m = document.createElement("canvas");
                m.width = Math.max(h + o[1] + o[3], s.minWidth || 0);
                m.height = u + o[0] + o[2];
                var x = m.getContext("2d");
                if (s.backgroundColor) {
                    x.fillStyle = s.backgroundColor;
                    x.fillRect(0, 0, m.width, m.height);
                }
                x.drawImage(i, (m.width - h) / 2, o[0]);
                if (s.border) {
                    var w = s.border.split(" ");
                    x.beginPath();
                    x.moveTo(0, 0);
                    x.lineWidth = parseInt(w[0]);
                    x.strokeStyle = w[2] || w[1];
                    x.lineTo(m.width, 0);
                    x.lineTo(m.width, m.height);
                    x.lineTo(0, m.height);
                    x.lineTo(0, 0);
                    x.stroke();
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
            var a = c(o);
            var n = r(37);
            var i = c(n);
            function c(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = {
                button: t.default,
                scroll: a.default,
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
            var o = a(t);
            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var n = typeof window !== "undefined";
            var i = {
                padding: 0,
                width: 300,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var f = function e(l) {
                var r = void 0;
                var t = l || {};
                l.props = l.props || {};
                var a = s(i, {
                    minWidth: l.style.tw,
                    lineHeight: l.style.th,
                    padding: 0
                }, l.props.normal);
                var n = s({}, a, l.props.hovered);
                var f = s({}, a, l.props.pressed);
                var u = (0, o.default)(l.props.text || "", a);
                var v = l.props.hovered && (0, o.default)(l.props.text || "", n);
                var p = l.props.pressed && (0, o.default)(l.props.text || "", f);
                var d = {};
                l.events = l.events || {};
                d.touchmove = d.mousemove = function() {
                    r.content.img = v || u;
                };
                d.touchstart = d.mousedown = function() {
                    r.content.img = p || v || u;
                };
                d.touchend = d.touchout = d.mouseout = function() {
                    r.content.img = u;
                };
                d.mouseup = function() {
                    r.content.img = v || u;
                };
                d.click = function(e) {
                    l.events.click && l.events.click.call(r, e);
                };
                r = new c.class.sprite({
                    name: l.name || "button",
                    content: {
                        img: u
                    },
                    style: l.style,
                    props: l.props,
                    events: d,
                    hooks: l.hooks
                });
                return r;
            };
            var u = function e(l, r) {
                c = l;
                if (r) {
                    l.class[r] = f;
                }
                return f;
            };
            if (n && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.button = f;
            } else {
                e.exports = u;
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
            var a = void 0;
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
                    if (l.$scroll.touching) return;
                    l.scroll.scrollY -= l.$scroll.speedY;
                    l.scroll.scrollX -= l.$scroll.speedX;
                    var r = o.utils.funcOrValue(l.scroll.minScrollX, l);
                    var s = o.utils.funcOrValue(l.scroll.maxScrollX, l);
                    var t = o.utils.funcOrValue(l.scroll.minScrollY, l);
                    var a = o.utils.funcOrValue(l.scroll.maxScrollY, l);
                    if (!isNaN(t) && l.scroll.scrollY < t) {
                        l.scroll.scrollY = t;
                    } else if (!isNaN(a) && l.scroll.scrollY > a) {
                        l.scroll.scrollY = a;
                    }
                    if (!isNaN(r) && l.scroll.scrollX < r) {
                        l.scroll.scrollX = r;
                    } else if (!isNaN(s) && l.scroll.scrollX > s) {
                        l.scroll.scrollX = s;
                    }
                },
                touch: function e(l, r) {
                    if (!l.scroll.scrollable) return false;
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
                        var o = l.$scroll.startPos.x - r.canvasX;
                        var a = l.$scroll.startPos.y - r.canvasY;
                        var n = s - l.$scroll.touching;
                        l.$scroll.touching = s;
                        if (l.scroll.scrollX + o < l.scroll.minScrollX || l.scroll.scrollX + o > l.scroll.maxScrollX) {
                            if (l.scroll.flexibleX) o >>= 3; else o = 0;
                        }
                        if (l.scroll.scrollY + a < l.scroll.minScrollY || l.scroll.scrollY + a > l.scroll.maxScrollY) {
                            if (l.scroll.flexibleY) a >>= 3; else a = 0;
                        }
                        if (Math.abs(o) >= 1 && n > 1) {
                            var i = (r.canvasX - l.$scroll.startPos.x) * 6 / t;
                            l.$scroll.speedY = Math.abs(i / 2) > Math.abs(l.$scroll.speedX) ? i : l.$scroll.speedX;
                            l.scroll.scrollX += o;
                        }
                        if (Math.abs(a) >= 1 && n > 1) {
                            var c = (r.canvasY - l.$scroll.startPos.y) * 6 / t;
                            l.$scroll.speedY = Math.abs(c / 2) > Math.abs(l.$scroll.speedY) ? c : l.$scroll.speedY;
                            l.scroll.scrollY += a;
                        }
                        l.$scroll.startPos.x = r.canvasX;
                        l.$scroll.startPos.y = r.canvasY;
                        if (Math.abs(o) > Math.abs(a) + 1) return 1; else if (Math.abs(o) < Math.abs(a) - 1) return 2;
                    }
                },
                wheel: function e(l, r) {
                    if (!l.scroll.scrollable) return false;
                    l.$scroll.$scrolling = true;
                    l.$scroll.speedX = r.event.wheelDeltaX;
                    l.$scroll.speedY = r.event.wheelDeltaY;
                    r.stopPropagation();
                }
            };
            var i = function e(l) {
                var s = false;
                var t = l || {};
                t.scroll = r({
                    scrollX: 0,
                    scrollY: 0,
                    scrollable: true,
                    minScrollX: 0,
                    maxScrollX: 0,
                    minScrollY: 0,
                    maxScrollY: 0,
                    propagationX: false,
                    propagationY: false
                }, l.scroll);
                var i = function e() {
                    if (s) {
                        f.scroll.scrollY = s();
                    } else {
                        f.off("ticked", e);
                    }
                };
                var c = false;
                t.events = r({
                    touchstart: function e(l) {
                        n.loose(this);
                        c = true;
                        a = false;
                        n.touch(this, l);
                        if (!f.scroll.propagationX && !f.scroll.propagationY) {
                            l.stopPropagation();
                        }
                    },
                    touchmove: function e(l) {
                        if (!c) return;
                        if (a && this !== a) {
                            return;
                        }
                        var r = n.touch(this, l);
                        if (r === 1 && f.scroll.propagationY) {
                            l.stopPropagation();
                            a = this;
                        } else if (r === 2 && f.scroll.propagationX) {
                            l.stopPropagation();
                            a = this;
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
                }, t.events || {});
                if (t.scroll.capture) {
                    t.events.interceptor = function(e) {
                        if (f.events[e.type]) {
                            f.events[e.type].call(f, e);
                            return false;
                        }
                        return e;
                    };
                }
                var f = new o.class.sprite(t);
                f.on("ticked", function() {
                    n.looper(f);
                });
                f.on("scrollTo", function(e, l, r) {
                    s = o.transition.pendulum(f.scroll.scrollY, e, (l || 200) * 2, {
                        cycle: .5
                    }).then(function() {
                        s = false;
                        r && r();
                    });
                    f.on("ticked", i);
                });
                f.$scroll = {
                    speedX: 0,
                    speedY: 0,
                    touching: false,
                    startPos: {}
                };
                var u = f.add({
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
                f.add = u.add.bind(u);
                f.clear = u.clear.bind(u);
                f.getChildren = function() {
                    return u.children;
                };
                return f;
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
            var o = a(t);
            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var n = typeof window !== "undefined";
            var i = {
                padding: 0,
                width: 300,
                lineHeight: 100,
                height: 100,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var f = function e(l) {
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
            var u = function e(l, r) {
                c = l;
                if (r) {
                    l.class[r] = f;
                }
                return f;
            };
            if (n && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.text = f;
            } else {
                e.exports = u;
            }
        }
    });
});

