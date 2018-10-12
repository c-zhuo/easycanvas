(function e(t, n) {
    if (typeof exports === "object" && typeof module === "object") module.exports = n(); else if (typeof define === "function" && define.amd) define([], n); else {
        var r = n();
        for (var o in r) (typeof exports === "object" ? exports : t)[o] = r[o];
    }
})(this, function() {
    return function(e) {
        var t = {};
        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {
                exports: {},
                id: r,
                loaded: false
            };
            e[r].call(o.exports, o, o.exports, n);
            o.loaded = true;
            return o.exports;
        }
        n.m = e;
        n.c = t;
        n.p = "";
        return n(0);
    }({
        0: function(e, t, n) {
            e.exports = n(98);
        },
        86: function(e, t) {
            "use strict";
            var n = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) {
                        if (Object.prototype.hasOwnProperty.call(n, r)) {
                            e[r] = n[r];
                        }
                    }
                }
                return e;
            };
            var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
                return typeof e;
            } : function(e) {
                return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            };
            (function(e) {
                var t = {};
                function n(r) {
                    if (t[r]) return t[r].exports;
                    var o = t[r] = {
                        exports: {},
                        id: r,
                        loaded: false
                    };
                    e[r].call(o.exports, o, o.exports, n);
                    o.loaded = true;
                    return o.exports;
                }
                n.m = e;
                n.c = t;
                n.p = "";
                return n(0);
            })([ function(e, t, n) {
                "use strict";
                var r = n(1);
                var o = a(r);
                function a(e) {
                    if (e && e.__esModule) {
                        return e;
                    } else {
                        var t = {};
                        if (e != null) {
                            for (var n in e) {
                                if (Object.prototype.hasOwnProperty.call(e, n)) t[n] = e[n];
                            }
                        }
                        t.default = e;
                        return t;
                    }
                }
                var i = GameGlobal;
                function u() {
                    o.addEventListener = o.canvas.addEventListener = function(e, t) {
                        o.document.addEventListener(e, t);
                    };
                    o.removeEventListener = o.canvas.removeEventListener = function(e, t) {
                        o.document.removeEventListener(e, t);
                    };
                    var e = wx.getSystemInfoSync(), t = e.platform;
                    if (typeof __devtoolssubcontext === "undefined" && t === "devtools") {
                        for (var n in o) {
                            var r = Object.getOwnPropertyDescriptor(i, n);
                            if (!r || r.configurable === true) {
                                Object.defineProperty(window, n, {
                                    value: o[n]
                                });
                            }
                        }
                        for (var a in o.document) {
                            var u = Object.getOwnPropertyDescriptor(i.document, a);
                            if (!u || u.configurable === true) {
                                Object.defineProperty(i.document, a, {
                                    value: o.document[a]
                                });
                            }
                        }
                        window.parent = window;
                    } else {
                        for (var f in o) {
                            i[f] = o[f];
                        }
                        i.window = o;
                        window = i;
                        window.top = window.parent = window;
                    }
                }
                if (!GameGlobal.__isAdapterInjected) {
                    GameGlobal.__isAdapterInjected = true;
                    u();
                }
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                t.cancelAnimationFrame = t.requestAnimationFrame = t.clearInterval = t.clearTimeout = t.setInterval = t.setTimeout = t.canvas = t.location = t.localStorage = t.HTMLElement = t.FileReader = t.Audio = t.Image = t.WebSocket = t.XMLHttpRequest = t.navigator = t.document = undefined;
                var r = n(2);
                Object.keys(r).forEach(function(e) {
                    if (e === "default" || e === "__esModule") return;
                    Object.defineProperty(t, e, {
                        enumerable: true,
                        get: function t() {
                            return r[e];
                        }
                    });
                });
                var o = n(3);
                Object.keys(o).forEach(function(e) {
                    if (e === "default" || e === "__esModule") return;
                    Object.defineProperty(t, e, {
                        enumerable: true,
                        get: function t() {
                            return o[e];
                        }
                    });
                });
                var a = n(9);
                var i = k(a);
                var u = n(10);
                var f = k(u);
                var c = n(17);
                var s = k(c);
                var l = n(18);
                var d = k(l);
                var p = n(19);
                var v = k(p);
                var h = n(11);
                var y = k(h);
                var b = n(12);
                var g = k(b);
                var _ = n(20);
                var w = k(_);
                var m = n(4);
                var O = k(m);
                var E = n(21);
                var j = k(E);
                var T = n(22);
                var P = k(T);
                function k(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                t.document = f.default;
                t.navigator = s.default;
                t.XMLHttpRequest = d.default;
                t.WebSocket = v.default;
                t.Image = y.default;
                t.Audio = g.default;
                t.FileReader = w.default;
                t.HTMLElement = O.default;
                t.localStorage = j.default;
                t.location = P.default;
                var M = new i.default();
                t.canvas = M;
                t.setTimeout = setTimeout;
                t.setInterval = setInterval;
                t.clearTimeout = clearTimeout;
                t.clearInterval = clearInterval;
                t.requestAnimationFrame = requestAnimationFrame;
                t.cancelAnimationFrame = cancelAnimationFrame;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var n = wx.getSystemInfoSync(), r = n.screenWidth, o = n.screenHeight, a = n.devicePixelRatio;
                var i = t.innerWidth = r;
                var u = t.innerHeight = o;
                t.devicePixelRatio = a;
                var f = t.screen = {
                    availWidth: i,
                    availHeight: u
                };
                var c = t.performance = {
                    now: function e() {
                        return Date.now() / 1e3;
                    }
                };
                var s = t.ontouchstart = null;
                var l = t.ontouchmove = null;
                var d = t.ontouchend = null;
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                t.HTMLCanvasElement = t.HTMLImageElement = undefined;
                var o = n(4);
                var a = i(o);
                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function u(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function f(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return t && ((typeof t === "undefined" ? "undefined" : r(t)) === "object" || typeof t === "function") ? t : e;
                }
                function c(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : r(t)));
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
                }
                var s = t.HTMLImageElement = function(e) {
                    c(t, e);
                    function t() {
                        u(this, t);
                        return f(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "img"));
                    }
                    return t;
                }(a.default);
                var l = t.HTMLCanvasElement = function(e) {
                    c(t, e);
                    function t() {
                        u(this, t);
                        return f(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "canvas"));
                    }
                    return t;
                }(a.default);
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || false;
                            r.configurable = true;
                            if ("value" in r) r.writable = true;
                            Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function(t, n, r) {
                        if (n) e(t.prototype, n);
                        if (r) e(t, r);
                        return t;
                    };
                }();
                var a = n(5);
                var i = c(a);
                var u = n(8);
                var f = n(2);
                function c(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function s(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function l(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return t && ((typeof t === "undefined" ? "undefined" : r(t)) === "object" || typeof t === "function") ? t : e;
                }
                function d(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : r(t)));
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
                }
                var p = function(e) {
                    d(t, e);
                    function t() {
                        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                        s(this, t);
                        var n = l(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        n.className = "";
                        n.childern = [];
                        n.style = {
                            width: f.innerWidth + "px",
                            height: f.innerHeight + "px"
                        };
                        n.insertBefore = u.noop;
                        n.innerHTML = "";
                        n.tagName = e.toUpperCase();
                        return n;
                    }
                    o(t, [ {
                        key: "setAttribute",
                        value: function e(t, n) {
                            this[t] = n;
                        }
                    }, {
                        key: "getAttribute",
                        value: function e(t) {
                            return this[t];
                        }
                    }, {
                        key: "getBoundingClientRect",
                        value: function e() {
                            return {
                                top: 0,
                                left: 0,
                                width: f.innerWidth,
                                height: f.innerHeight
                            };
                        }
                    }, {
                        key: "focus",
                        value: function e() {}
                    }, {
                        key: "clientWidth",
                        get: function e() {
                            var t = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
                            return Number.isNaN(t) ? 0 : t;
                        }
                    }, {
                        key: "clientHeight",
                        get: function e() {
                            var t = parseInt(this.style.fontSize, 10);
                            return Number.isNaN(t) ? 0 : t;
                        }
                    } ]);
                    return t;
                }(i.default);
                t.default = p;
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var o = n(6);
                var a = i(o);
                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function u(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function f(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return t && ((typeof t === "undefined" ? "undefined" : r(t)) === "object" || typeof t === "function") ? t : e;
                }
                function c(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : r(t)));
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
                }
                var s = function(e) {
                    c(t, e);
                    function t() {
                        u(this, t);
                        var e = f(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        e.className = "";
                        e.children = [];
                        return e;
                    }
                    return t;
                }(a.default);
                t.default = s;
            }, function(e, t, o) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var a = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || false;
                            r.configurable = true;
                            if ("value" in r) r.writable = true;
                            Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function(t, n, r) {
                        if (n) e(t.prototype, n);
                        if (r) e(t, r);
                        return t;
                    };
                }();
                var i = o(7);
                var u = f(i);
                function f(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function c(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function s(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return t && ((typeof t === "undefined" ? "undefined" : r(t)) === "object" || typeof t === "function") ? t : e;
                }
                function l(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : r(t)));
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
                }
                var d = function(e) {
                    l(t, e);
                    function t() {
                        c(this, t);
                        var e = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        e.childNodes = [];
                        return e;
                    }
                    a(t, [ {
                        key: "appendChild",
                        value: function e(n) {
                            if (n instanceof t) {
                                this.childNodes.push(n);
                            } else {
                                throw new TypeError("Failed to executed 'appendChild' on 'Node': parameter 1 is not of type 'Node'.");
                            }
                        }
                    }, {
                        key: "cloneNode",
                        value: function e() {
                            var t = Object.create(this);
                            n(t, this);
                            return t;
                        }
                    }, {
                        key: "removeChild",
                        value: function e(t) {
                            var n = this.childNodes.findIndex(function(e) {
                                return e === t;
                            });
                            if (n > -1) {
                                return this.childNodes.splice(n, 1);
                            }
                            return null;
                        }
                    } ]);
                    return t;
                }(u.default);
                t.default = d;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var n = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || false;
                            r.configurable = true;
                            if ("value" in r) r.writable = true;
                            Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function(t, n, r) {
                        if (n) e(t.prototype, n);
                        if (r) e(t, r);
                        return t;
                    };
                }();
                function r(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                var o = new WeakMap();
                var a = function() {
                    function e() {
                        r(this, e);
                        o.set(this, {});
                    }
                    n(e, [ {
                        key: "addEventListener",
                        value: function e(t, n) {
                            var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                            var a = o.get(this);
                            if (!a) {
                                a = {};
                                o.set(this, a);
                            }
                            if (!a[t]) {
                                a[t] = [];
                            }
                            a[t].push(n);
                            if (r.capture) {
                                console.warn("EventTarget.addEventListener: options.capture is not implemented.");
                            }
                            if (r.once) {
                                console.warn("EventTarget.addEventListener: options.once is not implemented.");
                            }
                            if (r.passive) {
                                console.warn("EventTarget.addEventListener: options.passive is not implemented.");
                            }
                        }
                    }, {
                        key: "removeEventListener",
                        value: function e(t, n) {
                            var r = o.get(this)[t];
                            if (r && r.length > 0) {
                                for (var a = r.length; a--; a > 0) {
                                    if (r[a] === n) {
                                        r.splice(a, 1);
                                        break;
                                    }
                                }
                            }
                        }
                    }, {
                        key: "dispatchEvent",
                        value: function e() {
                            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                            var n = o.get(this)[t.type];
                            if (n) {
                                for (var r = 0; r < n.length; r++) {
                                    n[r](t);
                                }
                            }
                        }
                    } ]);
                    return e;
                }();
                t.default = a;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                t.noop = n;
                function n() {}
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                t.default = d;
                var r = n(3);
                var o = n(4);
                var a = f(o);
                var i = n(10);
                var u = f(i);
                function f(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                var c = false;
                var s = false;
                var l = false;
                function d() {
                    var e = wx.createCanvas();
                    e.type = "canvas";
                    e.__proto__.__proto__ = new a.default("canvas");
                    var t = e.getContext;
                    e.getBoundingClientRect = function() {
                        var e = {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        };
                        return e;
                    };
                    return e;
                }
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var r = n(1);
                var o = v(r);
                var a = n(4);
                var i = p(a);
                var u = n(11);
                var f = p(u);
                var c = n(12);
                var s = p(c);
                var l = n(9);
                var d = p(l);
                n(15);
                function p(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function v(e) {
                    if (e && e.__esModule) {
                        return e;
                    } else {
                        var t = {};
                        if (e != null) {
                            for (var n in e) {
                                if (Object.prototype.hasOwnProperty.call(e, n)) t[n] = e[n];
                            }
                        }
                        t.default = e;
                        return t;
                    }
                }
                var h = {};
                var y = {
                    readyState: "complete",
                    visibilityState: "visible",
                    documentElement: o,
                    hidden: false,
                    style: {},
                    location: o.location,
                    ontouchstart: null,
                    ontouchmove: null,
                    ontouchend: null,
                    head: new i.default("head"),
                    body: new i.default("body"),
                    createElement: function e(t) {
                        if (t === "canvas") {
                            return new d.default();
                        } else if (t === "audio") {
                            return new s.default();
                        } else if (t === "img") {
                            return new f.default();
                        }
                        return new i.default(t);
                    },
                    getElementById: function e(t) {
                        if (t === o.canvas.id) {
                            return o.canvas;
                        }
                        return null;
                    },
                    getElementsByTagName: function e(t) {
                        if (t === "head") {
                            return [ y.head ];
                        } else if (t === "body") {
                            return [ y.body ];
                        } else if (t === "canvas") {
                            return [ o.canvas ];
                        }
                        return [];
                    },
                    querySelector: function e(t) {
                        if (t === "head") {
                            return y.head;
                        } else if (t === "body") {
                            return y.body;
                        } else if (t === "canvas") {
                            return o.canvas;
                        } else if (t === "#" + o.canvas.id) {
                            return o.canvas;
                        }
                        return null;
                    },
                    querySelectorAll: function e(t) {
                        if (t === "head") {
                            return [ y.head ];
                        } else if (t === "body") {
                            return [ y.body ];
                        } else if (t === "canvas") {
                            return [ o.canvas ];
                        }
                        return [];
                    },
                    addEventListener: function e(t, n) {
                        if (!h[t]) {
                            h[t] = [];
                        }
                        h[t].push(n);
                    },
                    removeEventListener: function e(t, n) {
                        var r = h[t];
                        if (r && r.length > 0) {
                            for (var o = r.length; o--; o > 0) {
                                if (r[o] === n) {
                                    r.splice(o, 1);
                                    break;
                                }
                            }
                        }
                    },
                    dispatchEvent: function e(t) {
                        var n = h[t.type];
                        if (n) {
                            for (var r = 0; r < n.length; r++) {
                                n[r](t);
                            }
                        }
                    }
                };
                t.default = y;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                t.default = n;
                function n() {
                    var e = wx.createImage();
                    return e;
                }
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || false;
                            r.configurable = true;
                            if ("value" in r) r.writable = true;
                            Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function(t, n, r) {
                        if (n) e(t.prototype, n);
                        if (r) e(t, r);
                        return t;
                    };
                }();
                var a = n(13);
                var i = u(a);
                function u(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function f(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function c(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return t && ((typeof t === "undefined" ? "undefined" : r(t)) === "object" || typeof t === "function") ? t : e;
                }
                function s(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : r(t)));
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
                }
                var l = 0;
                var d = 1;
                var p = 2;
                var v = 3;
                var h = 4;
                var y = new WeakMap();
                var b = new WeakMap();
                var g = new WeakMap();
                var _ = new WeakMap();
                var w = function(e) {
                    s(t, e);
                    function t(e) {
                        f(this, t);
                        var n = c(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        n.HAVE_NOTHING = l;
                        n.HAVE_METADATA = d;
                        n.HAVE_CURRENT_DATA = p;
                        n.HAVE_FUTURE_DATA = v;
                        n.HAVE_ENOUGH_DATA = h;
                        n.readyState = l;
                        b.set(n, "");
                        var r = wx.createInnerAudioContext();
                        y.set(n, r);
                        r.onCanplay(function() {
                            n.dispatchEvent({
                                type: "load"
                            });
                            n.dispatchEvent({
                                type: "loadend"
                            });
                            n.dispatchEvent({
                                type: "canplay"
                            });
                            n.dispatchEvent({
                                type: "canplaythrough"
                            });
                            n.dispatchEvent({
                                type: "loadedmetadata"
                            });
                            n.readyState = p;
                        });
                        r.onPlay(function() {
                            n.dispatchEvent({
                                type: "play"
                            });
                        });
                        r.onPause(function() {
                            n.dispatchEvent({
                                type: "pause"
                            });
                        });
                        r.onEnded(function() {
                            n.dispatchEvent({
                                type: "ended"
                            });
                            n.readyState = h;
                        });
                        r.onError(function() {
                            n.dispatchEvent({
                                type: "error"
                            });
                        });
                        if (e) {
                            y.get(n).src = e;
                        }
                        return n;
                    }
                    o(t, [ {
                        key: "load",
                        value: function e() {
                            console.warn("HTMLAudioElement.load() is not implemented.");
                        }
                    }, {
                        key: "play",
                        value: function e() {
                            y.get(this).play();
                        }
                    }, {
                        key: "pause",
                        value: function e() {
                            y.get(this).pause();
                        }
                    }, {
                        key: "canPlayType",
                        value: function e() {
                            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                            if (typeof t !== "string") {
                                return "";
                            }
                            if (t.indexOf("audio/mpeg") > -1 || t.indexOf("audio/mp4")) {
                                return "probably";
                            }
                            return "";
                        }
                    }, {
                        key: "cloneNode",
                        value: function e() {
                            var n = new t();
                            n.loop = y.get(this).loop;
                            n.autoplay = y.get(this).loop;
                            n.src = this.src;
                            return n;
                        }
                    }, {
                        key: "currentTime",
                        get: function e() {
                            return y.get(this).currentTime;
                        },
                        set: function e(t) {
                            y.get(this).seek(t);
                        }
                    }, {
                        key: "src",
                        get: function e() {
                            return b.get(this);
                        },
                        set: function e(t) {
                            b.set(this, t);
                            y.get(this).src = t;
                        }
                    }, {
                        key: "loop",
                        get: function e() {
                            return y.get(this).loop;
                        },
                        set: function e(t) {
                            y.get(this).loop = t;
                        }
                    }, {
                        key: "autoplay",
                        get: function e() {
                            return y.get(this).autoplay;
                        },
                        set: function e(t) {
                            y.get(this).autoplay = t;
                        }
                    }, {
                        key: "paused",
                        get: function e() {
                            return y.get(this).paused;
                        }
                    } ]);
                    return t;
                }(i.default);
                t.default = w;
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var o = n(14);
                var a = i(o);
                function i(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function u(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function f(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return t && ((typeof t === "undefined" ? "undefined" : r(t)) === "object" || typeof t === "function") ? t : e;
                }
                function c(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : r(t)));
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
                }
                var s = function(e) {
                    c(t, e);
                    function t() {
                        u(this, t);
                        return f(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "audio"));
                    }
                    return t;
                }(a.default);
                t.default = s;
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || false;
                            r.configurable = true;
                            if ("value" in r) r.writable = true;
                            Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function(t, n, r) {
                        if (n) e(t.prototype, n);
                        if (r) e(t, r);
                        return t;
                    };
                }();
                var a = n(4);
                var i = u(a);
                function u(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function f(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function c(e, t) {
                    if (!e) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return t && ((typeof t === "undefined" ? "undefined" : r(t)) === "object" || typeof t === "function") ? t : e;
                }
                function s(e, t) {
                    if (typeof t !== "function" && t !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : r(t)));
                    }
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t;
                }
                var l = function(e) {
                    s(t, e);
                    function t(e) {
                        f(this, t);
                        return c(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    }
                    o(t, [ {
                        key: "addTextTrack",
                        value: function e() {}
                    }, {
                        key: "captureStream",
                        value: function e() {}
                    }, {
                        key: "fastSeek",
                        value: function e() {}
                    }, {
                        key: "load",
                        value: function e() {}
                    }, {
                        key: "pause",
                        value: function e() {}
                    }, {
                        key: "play",
                        value: function e() {}
                    } ]);
                    return t;
                }(i.default);
                t.default = l;
            }, function(e, t, n) {
                "use strict";
                n(16);
            }, function(e, t, n) {
                "use strict";
                var r = n(1);
                var o = c(r);
                var a = n(10);
                var i = f(a);
                var u = n(8);
                function f(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                function c(e) {
                    if (e && e.__esModule) {
                        return e;
                    } else {
                        var t = {};
                        if (e != null) {
                            for (var n in e) {
                                if (Object.prototype.hasOwnProperty.call(e, n)) t[n] = e[n];
                            }
                        }
                        t.default = e;
                        return t;
                    }
                }
                function s(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                var l = function e(t) {
                    s(this, e);
                    this.target = o.canvas;
                    this.currentTarget = o.canvas;
                    this.touches = [];
                    this.targetTouches = [];
                    this.changedTouches = [];
                    this.preventDefault = u.noop;
                    this.stopPropagation = u.noop;
                    this.type = t;
                };
                var d = 0;
                var p = 0;
                function v(e) {
                    return function(t) {
                        var n = new l(e);
                        n.touches = t.touches;
                        if (t.touches[0]) {
                            d = t.touches[0].clientX;
                            p = t.touches[0].clientY;
                        }
                        n.layerX = d;
                        n.layerY = p;
                        n.targetTouches = Array.prototype.slice.call(t.touches);
                        n.changedTouches = t.changedTouches;
                        n.timeStamp = t.timeStamp;
                        i.default.dispatchEvent(n);
                    };
                }
                wx.onTouchStart(v("touchstart"));
                wx.onTouchMove(v("touchmove"));
                wx.onTouchEnd(v("touchend"));
                wx.onTouchCancel(v("touchcancel"));
            }, function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var r = n(8);
                var o = wx.getSystemInfoSync(), a = o.platform;
                var i = {
                    platform: a,
                    language: "zh-cn",
                    appVersion: "5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
                    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/zh_CN",
                    onLine: true,
                    geolocation: {
                        getCurrentPosition: r.noop,
                        watchPosition: r.noop,
                        clearWatch: r.noop
                    }
                };
                t.default = i;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var n = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || false;
                            r.configurable = true;
                            if ("value" in r) r.writable = true;
                            Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function(t, n, r) {
                        if (n) e(t.prototype, n);
                        if (r) e(t, r);
                        return t;
                    };
                }();
                function r(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                var o = new WeakMap();
                var a = new WeakMap();
                var i = new WeakMap();
                var u = new WeakMap();
                var f = new WeakMap();
                function c(e) {
                    if (typeof this["on" + e] === "function") {
                        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
                            n[r - 1] = arguments[r];
                        }
                        this["on" + e].apply(this, n);
                    }
                }
                function s(e) {
                    this.readyState = e;
                    c.call(this, "readystatechange");
                }
                var l = function() {
                    function e() {
                        r(this, e);
                        this.onabort = null;
                        this.onerror = null;
                        this.onload = null;
                        this.onloadstart = null;
                        this.onprogress = null;
                        this.ontimeout = null;
                        this.onloadend = null;
                        this.onreadystatechange = null;
                        this.readyState = 0;
                        this.response = null;
                        this.responseText = null;
                        this.responseType = "";
                        this.responseXML = null;
                        this.status = 0;
                        this.statusText = "";
                        this.upload = {};
                        this.withCredentials = false;
                        i.set(this, {
                            "content-type": "application/x-www-form-urlencoded"
                        });
                        u.set(this, {});
                    }
                    n(e, [ {
                        key: "abort",
                        value: function e() {
                            var t = f.get(this);
                            if (t) {
                                t.abort();
                            }
                        }
                    }, {
                        key: "getAllResponseHeaders",
                        value: function e() {
                            var t = u.get(this);
                            return Object.keys(t).map(function(e) {
                                return e + ": " + t[e];
                            }).join("\n");
                        }
                    }, {
                        key: "getResponseHeader",
                        value: function e(t) {
                            return u.get(this)[t];
                        }
                    }, {
                        key: "open",
                        value: function t(n, r) {
                            a.set(this, n);
                            o.set(this, r);
                            s.call(this, e.OPENED);
                        }
                    }, {
                        key: "overrideMimeType",
                        value: function e() {}
                    }, {
                        key: "send",
                        value: function t() {
                            var n = this;
                            var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                            if (this.readyState !== e.OPENED) {
                                throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
                            } else {
                                wx.request({
                                    data: r,
                                    url: o.get(this),
                                    method: a.get(this),
                                    header: i.get(this),
                                    responseType: this.responseType,
                                    success: function t(r) {
                                        var o = r.data, a = r.statusCode, i = r.header;
                                        if (typeof o !== "string" && !(o instanceof ArrayBuffer)) {
                                            try {
                                                o = JSON.stringify(o);
                                            } catch (e) {
                                                o = o;
                                            }
                                        }
                                        n.status = a;
                                        u.set(n, i);
                                        c.call(n, "loadstart");
                                        s.call(n, e.HEADERS_RECEIVED);
                                        s.call(n, e.LOADING);
                                        n.response = o;
                                        if (o instanceof ArrayBuffer) {
                                            n.responseText = "";
                                            var f = new Uint8Array(o);
                                            var l = f.byteLength;
                                            for (var d = 0; d < l; d++) {
                                                n.responseText += String.fromCharCode(f[d]);
                                            }
                                        } else {
                                            n.responseText = o;
                                        }
                                        s.call(n, e.DONE);
                                        c.call(n, "load");
                                        c.call(n, "loadend");
                                    },
                                    fail: function e(t) {
                                        var r = t.errMsg;
                                        if (r.indexOf("abort") !== -1) {
                                            c.call(n, "abort");
                                        } else {
                                            c.call(n, "error", r);
                                        }
                                        c.call(n, "loadend");
                                    }
                                });
                            }
                        }
                    }, {
                        key: "setRequestHeader",
                        value: function e(t, n) {
                            var r = i.get(this);
                            r[t] = n;
                            i.set(this, r);
                        }
                    } ]);
                    return e;
                }();
                l.UNSEND = 0;
                l.OPENED = 1;
                l.HEADERS_RECEIVED = 2;
                l.LOADING = 3;
                l.DONE = 4;
                t.default = l;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var n = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || false;
                            r.configurable = true;
                            if ("value" in r) r.writable = true;
                            Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function(t, n, r) {
                        if (n) e(t.prototype, n);
                        if (r) e(t, r);
                        return t;
                    };
                }();
                function r(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                var o = new WeakMap();
                var a = function() {
                    function e(t) {
                        var n = this;
                        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                        r(this, e);
                        this.binaryType = "";
                        this.bufferedAmount = 0;
                        this.extensions = "";
                        this.onclose = null;
                        this.onerror = null;
                        this.onmessage = null;
                        this.onopen = null;
                        this.protocol = "";
                        this.readyState = 3;
                        if (typeof t !== "string" || !/(^ws:\/\/)|(^wss:\/\/)/.test(t)) {
                            throw new TypeError("Failed to construct 'WebSocket': The URL '" + t + "' is invalid");
                        }
                        this.url = t;
                        this.readyState = e.CONNECTING;
                        var i = wx.connectSocket({
                            url: t,
                            protocols: Array.isArray(a) ? a : [ a ]
                        });
                        o.set(this, i);
                        i.onClose(function(t) {
                            n.readyState = e.CLOSED;
                            if (typeof n.onclose === "function") {
                                n.onclose(t);
                            }
                        });
                        i.onMessage(function(e) {
                            if (typeof n.onmessage === "function") {
                                n.onmessage(e);
                            }
                        });
                        i.onOpen(function() {
                            n.readyState = e.OPEN;
                            if (typeof n.onopen === "function") {
                                n.onopen();
                            }
                        });
                        i.onError(function(e) {
                            if (typeof n.onerror === "function") {
                                n.onerror(new Error(e.errMsg));
                            }
                        });
                        return this;
                    }
                    n(e, [ {
                        key: "close",
                        value: function t(n, r) {
                            this.readyState = e.CLOSING;
                            var a = o.get(this);
                            a.close({
                                code: n,
                                reason: r
                            });
                        }
                    }, {
                        key: "send",
                        value: function e(t) {
                            if (typeof t !== "string" && !(t instanceof ArrayBuffer)) {
                                throw new TypeError("Failed to send message: The data " + t + " is invalid");
                            }
                            var n = o.get(this);
                            n.send({
                                data: t
                            });
                        }
                    } ]);
                    return e;
                }();
                a.CONNECTING = 0;
                a.OPEN = 1;
                a.CLOSING = 2;
                a.CLOSED = 3;
                t.default = a;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                function n(e, t) {
                    if (!(e instanceof t)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                var r = function e() {
                    n(this, e);
                };
                t.default = r;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var n = {
                    get length() {
                        var e = wx.getStorageInfoSync(), t = e.keys;
                        return t.length;
                    },
                    key: function e(t) {
                        var n = wx.getStorageInfoSync(), r = n.keys;
                        return r[t];
                    },
                    getItem: function e(t) {
                        return wx.getStorageSync(t);
                    },
                    setItem: function e(t, n) {
                        return wx.setStorageSync(t, n);
                    },
                    removeItem: function e(t) {
                        wx.removeStorageSync(t);
                    },
                    clear: function e() {
                        wx.clearStorageSync();
                    }
                };
                t.default = n;
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: true
                });
                var n = {
                    href: "game.js",
                    reload: function e() {}
                };
                t.default = n;
            } ]);
        },
        98: function(e, t, n) {
            "use strict";
            n(86);
        }
    });
});

