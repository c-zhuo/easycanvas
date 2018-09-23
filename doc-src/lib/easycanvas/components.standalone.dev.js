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
            e.exports = r(31);
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
                var n = t.minWidth || t.width || (t.size || 16) * l.length + o[1] + o[3] + 100;
                var i = (t.size || 16) * Math.round(l.length) / n * (t.lineHeight || t.size) + o[0] + o[2] + 100;
                var a = document.createElement("canvas");
                a.width = n;
                a.height = i;
                var c = a.getContext("2d");
                window.tempCanvas = a;
                window.tempCtx = c;
                c.textBaseline = "middle";
                c.font = t.size + "px " + (t.family || "serif");
                c.fillStyle = t.color || "#000";
                c.textAlign = t.textAlign || "left";
                var f = 0;
                var u = t.lineHeight ? (t.lineHeight - t.size) / 2 : 0;
                var v = 0;
                var p = 1;
                var d = false;
                var h = 0;
                while (true) {
                    var g = c.measureText(l.slice(v, p)).width;
                    if (g > t.width && l[p] !== " ") {
                        if (t.overflow === "ellipsis") {
                            p -= 2;
                            c.fillText(l.slice(v, p) + "...", f, u + t.size / 2);
                            u += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 0);
                            h = t.width - o[1] - o[3];
                            break;
                        } else {
                            if (p - v <= 1) {
                                console.error("Width not enough.");
                                break;
                            }
                            p -= 1;
                            c.fillText(l.slice(v, p), f, u + t.size / 2);
                            v = p;
                            if (l[v] === " ") v++;
                            p = v + 1;
                            u += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 10);
                        }
                    } else {
                        if (p > l.length - 1) {
                            if (g > h) h = g;
                            c.fillText(l.slice(v, p), f, u + t.size / 2);
                            u += t.size + (t.lineHeight ? (t.lineHeight - t.size) / 2 : 0);
                            break;
                        }
                        if (g > h) h = g;
                        p++;
                    }
                }
                u += Math.floor(t.size * .1);
                var m = document.createElement("canvas");
                m.width = Math.max(h + o[1] + o[3], t.minWidth || 0);
                m.height = u + o[0] + o[2];
                var x = m.getContext("2d");
                if (t.backgroundColor) {
                    x.fillStyle = t.backgroundColor;
                    x.fillRect(0, 0, m.width, m.height);
                }
                x.drawImage(a, (m.width - h) / 2, o[0]);
                if (t.border) {
                    var w = t.border.split(" ");
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
                r[s] = m;
                return m;
            };
            e.exports = t;
        },
        31: function(e, l, r) {
            "use strict";
            var t = r(32);
            var s = c(t);
            var o = r(33);
            var n = c(o);
            var i = r(34);
            var a = c(i);
            function c(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            e.exports = {
                button: s.default,
                scroll: n.default,
                text: a.default
            };
        },
        32: function(e, l, r) {
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
            var o = n(s);
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var i = typeof window !== "undefined";
            var a = {
                padding: 0,
                width: 300,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var f = function e(l) {
                var r = void 0;
                var s = l || {};
                l.props = l.props || {};
                var n = t(a, {
                    minWidth: l.style.tw,
                    lineHeight: l.style.th,
                    padding: 0
                }, l.props.normal);
                var i = t({}, n, l.props.hovered);
                var f = t({}, n, l.props.pressed);
                var u = (0, o.default)(l.props.text || "", n);
                var v = l.props.hovered && (0, o.default)(l.props.text || "", i);
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
            if (i && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.button = f;
            } else {
                e.exports = u;
            }
        },
        33: function(e, l) {
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
            var s = void 0;
            var o = void 0;
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
                    var r = s.utils.funcOrValue(l.scroll.minScrollX, l);
                    var t = s.utils.funcOrValue(l.scroll.maxScrollX, l);
                    var o = s.utils.funcOrValue(l.scroll.minScrollY, l);
                    var n = s.utils.funcOrValue(l.scroll.maxScrollY, l);
                    if (!isNaN(o) && l.scroll.scrollY < o) {
                        l.scroll.scrollY = o;
                    } else if (!isNaN(n) && l.scroll.scrollY > n) {
                        l.scroll.scrollY = n;
                    }
                    if (!isNaN(r) && l.scroll.scrollX < r) {
                        l.scroll.scrollX = r;
                    } else if (!isNaN(t) && l.scroll.scrollX > t) {
                        l.scroll.scrollX = t;
                    }
                },
                touch: function e(l, r) {
                    if (!l.scroll.scrollable) return false;
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
                        var s = l.$scroll.startPos.x - r.canvasX;
                        var o = l.$scroll.startPos.y - r.canvasY;
                        var n = t - l.$scroll.touching;
                        l.$scroll.touching = t;
                        if (l.scroll.scrollX + s < l.scroll.minScrollX || l.scroll.scrollX + s > l.scroll.maxScrollX) {
                            if (l.scroll.flexibleX) s >>= 3; else s = 0;
                        }
                        if (l.scroll.scrollY + o < l.scroll.minScrollY || l.scroll.scrollY + o > l.scroll.maxScrollY) {
                            if (l.scroll.flexibleY) o >>= 3; else o = 0;
                        }
                        if (Math.abs(s) >= 1 && n > 1) {
                            l.$scroll.speedX = (r.canvasX - l.$scroll.startPos.x) * 3;
                            l.scroll.scrollX += s;
                        }
                        if (Math.abs(o) >= 1 && n > 1) {
                            l.$scroll.speedY = (r.canvasY - l.$scroll.startPos.y) * 3;
                            l.scroll.scrollY += o;
                        }
                        l.$scroll.startPos.x = r.canvasX;
                        l.$scroll.startPos.y = r.canvasY;
                        if (Math.abs(s) > Math.abs(o) + 1) return 1; else if (Math.abs(s) < Math.abs(o) - 1) return 2;
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
                var t = false;
                var i = l || {};
                i.scroll = r({
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
                var a = function e() {
                    if (t) {
                        f.scroll.scrollY = t();
                    } else {
                        f.off("ticked", e);
                    }
                };
                var c = false;
                i.events = r({
                    touchstart: function e(l) {
                        n.loose(this);
                        c = true;
                        o = false;
                        n.touch(this, l);
                        if (!f.scroll.propagationX && !f.scroll.propagationY) {
                            l.stopPropagation();
                        }
                    },
                    touchmove: function e(l) {
                        if (!c) return;
                        if (o && this !== o) {
                            return;
                        }
                        var r = n.touch(this, l);
                        if (r === 1 && f.scroll.propagationY) {
                            l.stopPropagation();
                            o = this;
                        } else if (r === 2 && f.scroll.propagationX) {
                            l.stopPropagation();
                            o = this;
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
                }, i.events || {});
                if (i.scroll.capture) {
                    i.events.interceptor = function(e) {
                        if (f.events[e.type]) {
                            f.events[e.type].call(f, e);
                            return false;
                        }
                        return e;
                    };
                }
                var f = new s.class.sprite(i);
                f.on("ticked", function() {
                    n.looper(f);
                });
                f.on("scrollTo", function(e, l, r) {
                    t = s.transition.pendulum(f.scroll.scrollY, e, (l || 200) * 2, {
                        cycle: .5
                    }).then(function() {
                        t = false;
                        r && r();
                    });
                    f.on("ticked", a);
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
            var a = function e(l, r) {
                s = l;
                if (r) {
                    l.class[r] = i;
                }
                return i;
            };
            if (t && window.Easycanvas) {
                s = Easycanvas;
                Easycanvas.class.scroll = i;
            } else {
                e.exports = a;
            }
        },
        34: function(e, l, r) {
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
            var o = n(s);
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var i = typeof window !== "undefined";
            var a = {
                padding: 0,
                width: 300,
                lineHeight: 100,
                height: 100,
                family: '"Helvetica Neue",Helvetica,Arial,sans-serif'
            };
            var c = void 0;
            var f = function e(l) {
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
            var u = function e(l, r) {
                c = l;
                if (r) {
                    l.class[r] = f;
                }
                return f;
            };
            if (i && window.Easycanvas) {
                c = Easycanvas;
                Easycanvas.class.text = f;
            } else {
                e.exports = u;
            }
        }
    });
});

