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
        e.exports = r(106);
    }, , function(e, t) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var i = Array.prototype;
        var n = i.slice;
        var s = i.map;
        var a = i.forEach;
        var o = Object.prototype;
        var u = o.toString;
        var l = u.call(function() {});
        var c = u.call("");
        var h = o.hasOwnProperty;
        e.exports = function() {
            var e = {};
            function t(e, r) {
                var i = this;
                if (!(i instanceof t)) {
                    throw new Error("Type constructor cannot be invoked without 'new'");
                }
                if (u.call(e) !== l) {
                    throw new Error(e + " is not a function");
                }
                var n = u.call(r);
                if (!(n === l || n === c)) {
                    throw new Error(r + " is neither a function nor a string");
                }
                Object.defineProperties(i, {
                    name: {
                        value: r
                    },
                    check: {
                        value: function t(r, n) {
                            var s = e.call(i, r, n);
                            if (!s && n && u.call(n) === l) n(i, r);
                            return s;
                        }
                    }
                });
            }
            var i = t.prototype;
            e.Type = t;
            i.assert = function(e, t) {
                if (!this.check(e, t)) {
                    var r = s(e);
                    throw new Error(r + " does not match type " + this);
                }
                return true;
            };
            function s(e) {
                if (y.check(e)) return "{" + Object.keys(e).map(function(t) {
                    return t + ": " + e[t];
                }).join(", ") + "}";
                if (v.check(e)) return "[" + e.map(s).join(", ") + "]";
                return JSON.stringify(e);
            }
            i.toString = function() {
                var e = this.name;
                if (d.check(e)) return e;
                if (m.check(e)) return e.call(this) + "";
                return e + " type";
            };
            var a = [];
            var o = [];
            var p = {};
            e.builtInTypes = p;
            function f(e, r) {
                var i = u.call(e);
                var n = new t(function(e) {
                    return u.call(e) === i;
                }, r);
                p[r] = n;
                if (e && typeof e.constructor === "function") {
                    a.push(e.constructor);
                    o.push(n);
                }
                return n;
            }
            var d = f("truthy", "string");
            var m = f(function() {}, "function");
            var v = f([], "array");
            var y = f({}, "object");
            var x = f(/./, "RegExp");
            var g = f(new Date(), "Date");
            var b = f(3, "number");
            var E = f(true, "boolean");
            var S = f(null, "null");
            var D = f(void 0, "undefined");
            function C(e, r) {
                if (e instanceof t) return e;
                if (e instanceof T) return e.type;
                if (v.check(e)) return t.fromArray(e);
                if (y.check(e)) return t.fromObject(e);
                if (m.check(e)) {
                    var i = a.indexOf(e);
                    if (i >= 0) {
                        return o[i];
                    }
                    return new t(e, r);
                }
                return new t(function(t) {
                    return t === e;
                }, D.check(r) ? function() {
                    return e + "";
                } : r);
            }
            t.or = function() {
                var e = [];
                var r = arguments.length;
                for (var i = 0; i < r; ++i) {
                    e.push(C(arguments[i]));
                }
                return new t(function(t, i) {
                    for (var n = 0; n < r; ++n) {
                        if (e[n].check(t, i)) return true;
                    }
                    return false;
                }, function() {
                    return e.join(" | ");
                });
            };
            t.fromArray = function(e) {
                if (!v.check(e)) {
                    throw new Error("");
                }
                if (e.length !== 1) {
                    throw new Error("only one element type is permitted for typed arrays");
                }
                return C(e[0]).arrayOf();
            };
            i.arrayOf = function() {
                var e = this;
                return new t(function(t, r) {
                    return v.check(t) && t.every(function(t) {
                        return e.check(t, r);
                    });
                }, function() {
                    return "[" + e + "]";
                });
            };
            t.fromObject = function(e) {
                var r = Object.keys(e).map(function(t) {
                    return new A(t, e[t]);
                });
                return new t(function(e, t) {
                    return y.check(e) && r.every(function(r) {
                        return r.type.check(e[r.name], t);
                    });
                }, function() {
                    return "{ " + r.join(", ") + " }";
                });
            };
            function A(e, t, r, i) {
                var n = this;
                if (!(n instanceof A)) {
                    throw new Error("Field constructor cannot be invoked without 'new'");
                }
                d.assert(e);
                t = C(t);
                var s = {
                    name: {
                        value: e
                    },
                    type: {
                        value: t
                    },
                    hidden: {
                        value: !!i
                    }
                };
                if (m.check(r)) {
                    s.defaultFn = {
                        value: r
                    };
                }
                Object.defineProperties(n, s);
            }
            var k = A.prototype;
            k.toString = function() {
                return JSON.stringify(this.name) + ": " + this.type;
            };
            k.getValue = function(e) {
                var t = e[this.name];
                if (!D.check(t)) return t;
                if (this.defaultFn) t = this.defaultFn.call(e);
                return t;
            };
            t.def = function(e) {
                d.assert(e);
                return h.call(w, e) ? w[e] : w[e] = new T(e);
            };
            var w = Object.create(null);
            function T(e) {
                var r = this;
                if (!(r instanceof T)) {
                    throw new Error("Def constructor cannot be invoked without 'new'");
                }
                Object.defineProperties(r, {
                    typeName: {
                        value: e
                    },
                    baseNames: {
                        value: []
                    },
                    ownFields: {
                        value: Object.create(null)
                    },
                    allSupertypes: {
                        value: Object.create(null)
                    },
                    supertypeList: {
                        value: []
                    },
                    allFields: {
                        value: Object.create(null)
                    },
                    fieldNames: {
                        value: []
                    },
                    type: {
                        value: new t(function(e, t) {
                            return r.check(e, t);
                        }, e)
                    }
                });
            }
            T.fromValue = function(e) {
                if (e && (typeof e === "undefined" ? "undefined" : r(e)) === "object") {
                    var t = e.type;
                    if (typeof t === "string" && h.call(w, t)) {
                        var i = w[t];
                        if (i.finalized) {
                            return i;
                        }
                    }
                }
                return null;
            };
            var F = T.prototype;
            F.isSupertypeOf = function(e) {
                if (e instanceof T) {
                    if (this.finalized !== true || e.finalized !== true) {
                        throw new Error("");
                    }
                    return h.call(e.allSupertypes, this.typeName);
                } else {
                    throw new Error(e + " is not a Def");
                }
            };
            e.getSupertypeNames = function(e) {
                if (!h.call(w, e)) {
                    throw new Error("");
                }
                var t = w[e];
                if (t.finalized !== true) {
                    throw new Error("");
                }
                return t.supertypeList.slice(1);
            };
            e.computeSupertypeLookupTable = function(e) {
                var t = {};
                var r = Object.keys(w);
                var i = r.length;
                for (var n = 0; n < i; ++n) {
                    var s = r[n];
                    var a = w[s];
                    if (a.finalized !== true) {
                        throw new Error("" + s);
                    }
                    for (var o = 0; o < a.supertypeList.length; ++o) {
                        var u = a.supertypeList[o];
                        if (h.call(e, u)) {
                            t[s] = u;
                            break;
                        }
                    }
                }
                return t;
            };
            F.checkAllFields = function(e, t) {
                var r = this.allFields;
                if (this.finalized !== true) {
                    throw new Error("" + this.typeName);
                }
                function i(i) {
                    var n = r[i];
                    var s = n.type;
                    var a = n.getValue(e);
                    return s.check(a, t);
                }
                return y.check(e) && Object.keys(r).every(i);
            };
            F.check = function(e, t) {
                if (this.finalized !== true) {
                    throw new Error("prematurely checking unfinalized type " + this.typeName);
                }
                if (!y.check(e)) return false;
                var r = T.fromValue(e);
                if (!r) {
                    if (this.typeName === "SourceLocation" || this.typeName === "Position") {
                        return this.checkAllFields(e, t);
                    }
                    return false;
                }
                if (t && r === this) return this.checkAllFields(e, t);
                if (!this.isSupertypeOf(r)) return false;
                if (!t) return true;
                return r.checkAllFields(e, t) && this.checkAllFields(e, false);
            };
            F.bases = function() {
                var e = n.call(arguments);
                var t = this.baseNames;
                if (this.finalized) {
                    if (e.length !== t.length) {
                        throw new Error("");
                    }
                    for (var r = 0; r < e.length; r++) {
                        if (e[r] !== t[r]) {
                            throw new Error("");
                        }
                    }
                    return this;
                }
                e.forEach(function(e) {
                    d.assert(e);
                    if (t.indexOf(e) < 0) t.push(e);
                });
                return this;
            };
            Object.defineProperty(F, "buildable", {
                value: false
            });
            var P = {};
            e.builders = P;
            var N = {};
            e.defineMethod = function(e, t) {
                var r = N[e];
                if (D.check(t)) {
                    delete N[e];
                } else {
                    m.assert(t);
                    Object.defineProperty(N, e, {
                        enumerable: true,
                        configurable: true,
                        value: t
                    });
                }
                return r;
            };
            var I = d.arrayOf();
            F.build = function() {
                var e = this;
                var t = n.call(arguments);
                I.assert(t);
                Object.defineProperty(e, "buildParams", {
                    value: t,
                    writable: false,
                    enumerable: false,
                    configurable: true
                });
                if (e.buildable) {
                    return e;
                }
                e.field("type", String, function() {
                    return e.typeName;
                });
                Object.defineProperty(e, "buildable", {
                    value: true
                });
                function r(t, r, i, n) {
                    if (h.call(t, r)) return;
                    var a = e.allFields;
                    if (!h.call(a, r)) {
                        throw new Error("" + r);
                    }
                    var o = a[r];
                    var u = o.type;
                    var l;
                    if (n) {
                        l = i;
                    } else if (o.defaultFn) {
                        l = o.defaultFn.call(t);
                    } else {
                        var c = "no value or default function given for field " + JSON.stringify(r) + " of " + e.typeName + "(" + e.buildParams.map(function(e) {
                            return a[e];
                        }).join(", ") + ")";
                        throw new Error(c);
                    }
                    if (!u.check(l)) {
                        throw new Error(s(l) + " does not match field " + o + " of type " + e.typeName);
                    }
                    t[r] = l;
                }
                function i() {
                    var t = arguments;
                    var i = t.length;
                    if (!e.finalized) {
                        throw new Error("attempting to instantiate unfinalized type " + e.typeName);
                    }
                    var n = Object.create(N);
                    e.buildParams.forEach(function(e, s) {
                        if (s < i) {
                            r(n, e, t[s], true);
                        } else {
                            r(n, e, null, false);
                        }
                    });
                    Object.keys(e.allFields).forEach(function(e) {
                        r(n, e, null, false);
                    });
                    if (n.type !== e.typeName) {
                        throw new Error("");
                    }
                    return n;
                }
                i.from = function(t) {
                    if (!e.finalized) {
                        throw new Error("attempting to instantiate unfinalized type " + e.typeName);
                    }
                    var i = Object.create(N);
                    Object.keys(e.allFields).forEach(function(e) {
                        if (h.call(t, e)) {
                            r(i, e, t[e], true);
                        } else {
                            r(i, e, null, false);
                        }
                    });
                    if (i.type !== e.typeName) {
                        throw new Error("");
                    }
                    return i;
                };
                Object.defineProperty(P, _(e.typeName), {
                    enumerable: true,
                    value: i
                });
                return e;
            };
            function _(e) {
                return e.replace(/^[A-Z]+/, function(e) {
                    var t = e.length;
                    switch (t) {
                      case 0:
                        return "";

                      case 1:
                        return e.toLowerCase();

                      default:
                        return e.slice(0, t - 1).toLowerCase() + e.charAt(t - 1);
                    }
                });
            }
            e.getBuilderName = _;
            function B(e) {
                e = _(e);
                return e.replace(/(Expression)?$/, "Statement");
            }
            e.getStatementBuilderName = B;
            F.field = function(e, t, r, i) {
                if (this.finalized) {
                    console.error("Ignoring attempt to redefine field " + JSON.stringify(e) + " of finalized type " + JSON.stringify(this.typeName));
                    return this;
                }
                this.ownFields[e] = new A(e, t, r, i);
                return this;
            };
            var L = {};
            e.namedTypes = L;
            function M(e) {
                var t = T.fromValue(e);
                if (t) {
                    return t.fieldNames.slice(0);
                }
                if ("type" in e) {
                    throw new Error("did not recognize object of type " + JSON.stringify(e.type));
                }
                return Object.keys(e);
            }
            e.getFieldNames = M;
            function O(e, t) {
                var r = T.fromValue(e);
                if (r) {
                    var i = r.allFields[t];
                    if (i) {
                        return i.getValue(e);
                    }
                }
                return e && e[t];
            }
            e.getFieldValue = O;
            e.eachField = function(e, t, r) {
                M(e).forEach(function(r) {
                    t.call(this, r, O(e, r));
                }, r);
            };
            e.someField = function(e, t, r) {
                return M(e).some(function(r) {
                    return t.call(this, r, O(e, r));
                }, r);
            };
            Object.defineProperty(F, "finalized", {
                value: false
            });
            F.finalize = function() {
                var e = this;
                if (!e.finalized) {
                    var t = e.allFields;
                    var r = e.allSupertypes;
                    e.baseNames.forEach(function(i) {
                        var n = w[i];
                        if (n instanceof T) {
                            n.finalize();
                            X(t, n.allFields);
                            X(r, n.allSupertypes);
                        } else {
                            var s = "unknown supertype name " + JSON.stringify(i) + " for subtype " + JSON.stringify(e.typeName);
                            throw new Error(s);
                        }
                    });
                    X(t, e.ownFields);
                    r[e.typeName] = e;
                    e.fieldNames.length = 0;
                    for (var i in t) {
                        if (h.call(t, i) && !t[i].hidden) {
                            e.fieldNames.push(i);
                        }
                    }
                    Object.defineProperty(L, e.typeName, {
                        enumerable: true,
                        value: e.type
                    });
                    Object.defineProperty(e, "finalized", {
                        value: true
                    });
                    R(e.typeName, e.supertypeList);
                    if (e.buildable && e.supertypeList.lastIndexOf("Expression") >= 0) {
                        j(e.typeName);
                    }
                }
            };
            function j(e) {
                var t = B(e);
                if (P[t]) return;
                var r = P[_(e)];
                if (!r) return;
                P[t] = function() {
                    return P.expressionStatement(r.apply(P, arguments));
                };
            }
            function R(e, t) {
                t.length = 0;
                t.push(e);
                var r = Object.create(null);
                for (var i = 0; i < t.length; ++i) {
                    e = t[i];
                    var n = w[e];
                    if (n.finalized !== true) {
                        throw new Error("");
                    }
                    if (h.call(r, e)) {
                        delete t[r[e]];
                    }
                    r[e] = i;
                    t.push.apply(t, n.baseNames);
                }
                for (var s = 0, a = s, o = t.length; a < o; ++a) {
                    if (h.call(t, a)) {
                        t[s++] = t[a];
                    }
                }
                t.length = s;
            }
            function X(e, t) {
                Object.keys(t).forEach(function(r) {
                    e[r] = t[r];
                });
                return e;
            }
            e.finalize = function() {
                Object.keys(w).forEach(function(e) {
                    w[e].finalize();
                });
            };
            return e;
        };
    }, , function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        e.exports = function(e) {
            var t = {};
            var n = e.use(r(2));
            var s = n.Type;
            var a = n.builtInTypes;
            var o = a.number;
            t.geq = function(e) {
                return new s(function(t) {
                    return o.check(t) && t >= e;
                }, o + " >= " + e);
            };
            t.defaults = {
                null: function e() {
                    return null;
                },
                emptyArray: function e() {
                    return [];
                },
                false: function e() {
                    return false;
                },
                true: function e() {
                    return true;
                },
                undefined: function e() {}
            };
            var u = s.or(a.string, a.number, a.boolean, a.null, a.undefined);
            t.isPrimitive = new s(function(e) {
                if (e === null) return true;
                var t = typeof e === "undefined" ? "undefined" : i(e);
                return !(t === "object" || t === "function");
            }, u.toString());
            return t;
        };
    }, , function(e, t, r) {
        "use strict";
        e.exports = r(76);
    }, , function(e, t, r) {
        (function(t) {
            "use strict";
            var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
                return typeof e;
            } : function(e) {
                return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            };
            function n(e, t) {
                if (e === t) {
                    return 0;
                }
                var r = e.length;
                var i = t.length;
                for (var n = 0, s = Math.min(r, i); n < s; ++n) {
                    if (e[n] !== t[n]) {
                        r = e[n];
                        i = t[n];
                        break;
                    }
                }
                if (r < i) {
                    return -1;
                }
                if (i < r) {
                    return 1;
                }
                return 0;
            }
            function s(e) {
                if (t.Buffer && typeof t.Buffer.isBuffer === "function") {
                    return t.Buffer.isBuffer(e);
                }
                return !!(e != null && e._isBuffer);
            }
            var a = r(64);
            var o = Object.prototype.hasOwnProperty;
            var u = Array.prototype.slice;
            var l = function() {
                return function e() {}.name === "foo";
            }();
            function c(e) {
                return Object.prototype.toString.call(e);
            }
            function h(e) {
                if (s(e)) {
                    return false;
                }
                if (typeof t.ArrayBuffer !== "function") {
                    return false;
                }
                if (typeof ArrayBuffer.isView === "function") {
                    return ArrayBuffer.isView(e);
                }
                if (!e) {
                    return false;
                }
                if (e instanceof DataView) {
                    return true;
                }
                if (e.buffer && e.buffer instanceof ArrayBuffer) {
                    return true;
                }
                return false;
            }
            var p = e.exports = g;
            var f = /\s*function\s+([^\(\s]*)\s*/;
            function d(e) {
                if (!a.isFunction(e)) {
                    return;
                }
                if (l) {
                    return e.name;
                }
                var t = e.toString();
                var r = t.match(f);
                return r && r[1];
            }
            p.AssertionError = function e(t) {
                this.name = "AssertionError";
                this.actual = t.actual;
                this.expected = t.expected;
                this.operator = t.operator;
                if (t.message) {
                    this.message = t.message;
                    this.generatedMessage = false;
                } else {
                    this.message = y(this);
                    this.generatedMessage = true;
                }
                var r = t.stackStartFunction || x;
                if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, r);
                } else {
                    var i = new Error();
                    if (i.stack) {
                        var n = i.stack;
                        var s = d(r);
                        var a = n.indexOf("\n" + s);
                        if (a >= 0) {
                            var o = n.indexOf("\n", a + 1);
                            n = n.substring(o + 1);
                        }
                        this.stack = n;
                    }
                }
            };
            a.inherits(p.AssertionError, Error);
            function m(e, t) {
                if (typeof e === "string") {
                    return e.length < t ? e : e.slice(0, t);
                } else {
                    return e;
                }
            }
            function v(e) {
                if (l || !a.isFunction(e)) {
                    return a.inspect(e);
                }
                var t = d(e);
                var r = t ? ": " + t : "";
                return "[Function" + r + "]";
            }
            function y(e) {
                return m(v(e.actual), 128) + " " + e.operator + " " + m(v(e.expected), 128);
            }
            function x(e, t, r, i, n) {
                throw new p.AssertionError({
                    message: r,
                    actual: e,
                    expected: t,
                    operator: i,
                    stackStartFunction: n
                });
            }
            p.fail = x;
            function g(e, t) {
                if (!e) x(e, true, t, "==", p.ok);
            }
            p.ok = g;
            p.equal = function e(t, r, i) {
                if (t != r) x(t, r, i, "==", p.equal);
            };
            p.notEqual = function e(t, r, i) {
                if (t == r) {
                    x(t, r, i, "!=", p.notEqual);
                }
            };
            p.deepEqual = function e(t, r, i) {
                if (!b(t, r, false)) {
                    x(t, r, i, "deepEqual", p.deepEqual);
                }
            };
            p.deepStrictEqual = function e(t, r, i) {
                if (!b(t, r, true)) {
                    x(t, r, i, "deepStrictEqual", p.deepStrictEqual);
                }
            };
            function b(e, t, r, o) {
                if (e === t) {
                    return true;
                } else if (s(e) && s(t)) {
                    return n(e, t) === 0;
                } else if (a.isDate(e) && a.isDate(t)) {
                    return e.getTime() === t.getTime();
                } else if (a.isRegExp(e) && a.isRegExp(t)) {
                    return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;
                } else if ((e === null || (typeof e === "undefined" ? "undefined" : i(e)) !== "object") && (t === null || (typeof t === "undefined" ? "undefined" : i(t)) !== "object")) {
                    return r ? e === t : e == t;
                } else if (h(e) && h(t) && c(e) === c(t) && !(e instanceof Float32Array || e instanceof Float64Array)) {
                    return n(new Uint8Array(e.buffer), new Uint8Array(t.buffer)) === 0;
                } else if (s(e) !== s(t)) {
                    return false;
                } else {
                    o = o || {
                        actual: [],
                        expected: []
                    };
                    var u = o.actual.indexOf(e);
                    if (u !== -1) {
                        if (u === o.expected.indexOf(t)) {
                            return true;
                        }
                    }
                    o.actual.push(e);
                    o.expected.push(t);
                    return S(e, t, r, o);
                }
            }
            function E(e) {
                return Object.prototype.toString.call(e) == "[object Arguments]";
            }
            function S(e, t, r, i) {
                if (e === null || e === undefined || t === null || t === undefined) return false;
                if (a.isPrimitive(e) || a.isPrimitive(t)) return e === t;
                if (r && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return false;
                var n = E(e);
                var s = E(t);
                if (n && !s || !n && s) return false;
                if (n) {
                    e = u.call(e);
                    t = u.call(t);
                    return b(e, t, r);
                }
                var o = w(e);
                var l = w(t);
                var c, h;
                if (o.length !== l.length) return false;
                o.sort();
                l.sort();
                for (h = o.length - 1; h >= 0; h--) {
                    if (o[h] !== l[h]) return false;
                }
                for (h = o.length - 1; h >= 0; h--) {
                    c = o[h];
                    if (!b(e[c], t[c], r, i)) return false;
                }
                return true;
            }
            p.notDeepEqual = function e(t, r, i) {
                if (b(t, r, false)) {
                    x(t, r, i, "notDeepEqual", p.notDeepEqual);
                }
            };
            p.notDeepStrictEqual = D;
            function D(e, t, r) {
                if (b(e, t, true)) {
                    x(e, t, r, "notDeepStrictEqual", D);
                }
            }
            p.strictEqual = function e(t, r, i) {
                if (t !== r) {
                    x(t, r, i, "===", p.strictEqual);
                }
            };
            p.notStrictEqual = function e(t, r, i) {
                if (t === r) {
                    x(t, r, i, "!==", p.notStrictEqual);
                }
            };
            function C(e, t) {
                if (!e || !t) {
                    return false;
                }
                if (Object.prototype.toString.call(t) == "[object RegExp]") {
                    return t.test(e);
                }
                try {
                    if (e instanceof t) {
                        return true;
                    }
                } catch (e) {}
                if (Error.isPrototypeOf(t)) {
                    return false;
                }
                return t.call({}, e) === true;
            }
            function A(e) {
                var t;
                try {
                    e();
                } catch (e) {
                    t = e;
                }
                return t;
            }
            function k(e, t, r, i) {
                var n;
                if (typeof t !== "function") {
                    throw new TypeError('"block" argument must be a function');
                }
                if (typeof r === "string") {
                    i = r;
                    r = null;
                }
                n = A(t);
                i = (r && r.name ? " (" + r.name + ")." : ".") + (i ? " " + i : ".");
                if (e && !n) {
                    x(n, r, "Missing expected exception" + i);
                }
                var s = typeof i === "string";
                var o = !e && a.isError(n);
                var u = !e && n && !r;
                if (o && s && C(n, r) || u) {
                    x(n, r, "Got unwanted exception" + i);
                }
                if (e && n && r && !C(n, r) || !e && n) {
                    throw n;
                }
            }
            p.throws = function(e, t, r) {
                k(true, e, t, r);
            };
            p.doesNotThrow = function(e, t, r) {
                k(false, e, t, r);
            };
            p.ifError = function(e) {
                if (e) throw e;
            };
            var w = Object.keys || function(e) {
                var t = [];
                for (var r in e) {
                    if (o.call(e, r)) t.push(r);
                }
                return t;
            };
        }).call(t, function() {
            return this;
        }());
    }, function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = r(8);
        var s = r(6);
        var a = s.getFieldValue;
        var o = s.namedTypes;
        var u = r(23);
        var l = u.SourceMapConsumer;
        var c = u.SourceMapGenerator;
        var h = Object.prototype.hasOwnProperty;
        var p = t;
        function f(e, t, r) {
            if (e && h.call(e, t)) {
                return e[t];
            }
            return r;
        }
        p.getOption = f;
        function d() {
            var e = {};
            var t = arguments.length;
            for (var r = 0; r < t; ++r) {
                var i = Object.keys(arguments[r]);
                var n = i.length;
                for (var s = 0; s < n; ++s) {
                    e[i[s]] = true;
                }
            }
            return e;
        }
        p.getUnionOfKeys = d;
        function m(e, t) {
            return e.line - t.line || e.column - t.column;
        }
        p.comparePos = m;
        function v(e) {
            return {
                line: e.line,
                column: e.column
            };
        }
        p.copyPos = v;
        p.composeSourceMaps = function(e, t) {
            if (e) {
                if (!t) {
                    return e;
                }
            } else {
                return t || null;
            }
            var r = new l(e);
            var i = new l(t);
            var n = new c({
                file: t.file,
                sourceRoot: t.sourceRoot
            });
            var s = {};
            i.eachMapping(function(e) {
                var t = r.originalPositionFor({
                    line: e.originalLine,
                    column: e.originalColumn
                });
                var i = t.source;
                if (i === null) {
                    return;
                }
                n.addMapping({
                    source: i,
                    original: v(t),
                    generated: {
                        line: e.generatedLine,
                        column: e.generatedColumn
                    },
                    name: e.name
                });
                var a = r.sourceContentFor(i);
                if (a && !h.call(s, i)) {
                    s[i] = a;
                    n.setSourceContent(i, a);
                }
            });
            return n.toJSON();
        };
        p.getTrueLoc = function(e, t) {
            if (!e.loc) {
                return null;
            }
            var r = {
                start: e.loc.start,
                end: e.loc.end
            };
            function i(e) {
                y(r, e.loc);
            }
            if (e.declaration && e.declaration.decorators && p.isExportDeclaration(e)) {
                e.declaration.decorators.forEach(i);
            }
            if (m(r.start, r.end) < 0) {
                r.start = v(r.start);
                t.skipSpaces(r.start, false, true);
                if (m(r.start, r.end) < 0) {
                    r.end = v(r.end);
                    t.skipSpaces(r.end, true, true);
                }
            }
            if (e.comments) {
                e.comments.forEach(i);
            }
            return r;
        };
        function y(e, t) {
            if (e && t) {
                if (m(t.start, e.start) < 0) {
                    e.start = t.start;
                }
                if (m(e.end, t.end) < 0) {
                    e.end = t.end;
                }
            }
        }
        p.fixFaultyLocations = function(e, t) {
            var r = e.loc;
            if (r) {
                if (r.start.line < 1) {
                    r.start.line = 1;
                }
                if (r.end.line < 1) {
                    r.end.line = 1;
                }
            }
            if (e.type === "File") {
                r.start = t.firstPos();
                r.end = t.lastPos();
            }
            x(e, t);
            g(e, t);
            if (r && e.decorators) {
                e.decorators.forEach(function(e) {
                    y(r, e.loc);
                });
            } else if (e.declaration && p.isExportDeclaration(e)) {
                e.declaration.loc = null;
                var i = e.declaration.decorators;
                if (i) {
                    i.forEach(function(e) {
                        y(r, e.loc);
                    });
                }
            } else if (o.MethodDefinition && o.MethodDefinition.check(e) || o.Property.check(e) && (e.method || e.shorthand)) {
                e.value.loc = null;
                if (o.FunctionExpression.check(e.value)) {
                    e.value.id = null;
                }
            } else if (e.type === "ObjectTypeProperty") {
                var r = e.loc;
                var n = r && r.end;
                if (n) {
                    n = v(n);
                    if (t.prevPos(n) && t.charAt(n) === ",") {
                        if (n = t.skipSpaces(n, true, true)) {
                            r.end = n;
                        }
                    }
                }
            }
        };
        function x(e, t) {
            if (e.type !== "ForStatement") {
                return;
            }
            function r(e) {
                var r = e && e.loc;
                var i = r && r.start;
                var n = r && v(r.end);
                while (i && n && m(i, n) < 0) {
                    t.prevPos(n);
                    if (t.charAt(n) === ";") {
                        r.end.line = n.line;
                        r.end.column = n.column;
                    } else {
                        break;
                    }
                }
            }
            r(e.init);
            r(e.test);
            r(e.update);
        }
        function g(e, t) {
            if (e.type !== "TemplateLiteral") {
                return;
            }
            if (e.quasis.length === 0) {
                return;
            }
            var r = v(e.loc.start);
            n.strictEqual(t.charAt(r), "`");
            n.ok(t.nextPos(r));
            var i = e.quasis[0];
            if (m(i.loc.start, r) < 0) {
                i.loc.start = r;
            }
            var s = v(e.loc.end);
            n.ok(t.prevPos(s));
            n.strictEqual(t.charAt(s), "`");
            var a = e.quasis[e.quasis.length - 1];
            if (m(s, a.loc.end) < 0) {
                a.loc.end = s;
            }
            e.expressions.forEach(function(r, i) {
                var s = t.skipSpaces(r.loc.start, true, false);
                if (t.prevPos(s) && t.charAt(s) === "{" && t.prevPos(s) && t.charAt(s) === "$") {
                    var a = e.quasis[i];
                    if (m(s, a.loc.end) < 0) {
                        a.loc.end = s;
                    }
                }
                var o = t.skipSpaces(r.loc.end, false, false);
                if (t.charAt(o) === "}") {
                    n.ok(t.nextPos(o));
                    var u = e.quasis[i + 1];
                    if (m(u.loc.start, o) < 0) {
                        u.loc.start = o;
                    }
                }
            });
        }
        p.isExportDeclaration = function(e) {
            if (e) switch (e.type) {
              case "ExportDeclaration":
              case "ExportDefaultDeclaration":
              case "ExportDefaultSpecifier":
              case "DeclareExportDeclaration":
              case "ExportNamedDeclaration":
              case "ExportAllDeclaration":
                return true;
            }
            return false;
        };
        p.getParentExportDeclaration = function(e) {
            var t = e.getParentNode();
            if (e.getName() === "declaration" && p.isExportDeclaration(t)) {
                return t;
            }
            return null;
        };
        p.isTrailingCommaEnabled = function(e, t) {
            var r = e.trailingComma;
            if ((typeof r === "undefined" ? "undefined" : i(r)) === "object") {
                return !!r[t];
            }
            return !!r;
        };
    }, , , function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            var t = e.use(r(2));
            var i = t.Type;
            var n = i.def;
            var s = i.or;
            var a = e.use(r(4));
            var o = a.defaults;
            var u = a.geq;
            n("Printable").field("loc", s(n("SourceLocation"), null), o["null"], true);
            n("Node").bases("Printable").field("type", String).field("comments", s([ n("Comment") ], null), o["null"], true);
            n("SourceLocation").build("start", "end", "source").field("start", n("Position")).field("end", n("Position")).field("source", s(String, null), o["null"]);
            n("Position").build("line", "column").field("line", u(1)).field("column", u(0));
            n("File").bases("Node").build("program", "name").field("program", n("Program")).field("name", s(String, null), o["null"]);
            n("Program").bases("Node").build("body").field("body", [ n("Statement") ]);
            n("Function").bases("Node").field("id", s(n("Identifier"), null), o["null"]).field("params", [ n("Pattern") ]).field("body", n("BlockStatement"));
            n("Statement").bases("Node");
            n("EmptyStatement").bases("Statement").build();
            n("BlockStatement").bases("Statement").build("body").field("body", [ n("Statement") ]);
            n("ExpressionStatement").bases("Statement").build("expression").field("expression", n("Expression"));
            n("IfStatement").bases("Statement").build("test", "consequent", "alternate").field("test", n("Expression")).field("consequent", n("Statement")).field("alternate", s(n("Statement"), null), o["null"]);
            n("LabeledStatement").bases("Statement").build("label", "body").field("label", n("Identifier")).field("body", n("Statement"));
            n("BreakStatement").bases("Statement").build("label").field("label", s(n("Identifier"), null), o["null"]);
            n("ContinueStatement").bases("Statement").build("label").field("label", s(n("Identifier"), null), o["null"]);
            n("WithStatement").bases("Statement").build("object", "body").field("object", n("Expression")).field("body", n("Statement"));
            n("SwitchStatement").bases("Statement").build("discriminant", "cases", "lexical").field("discriminant", n("Expression")).field("cases", [ n("SwitchCase") ]).field("lexical", Boolean, o["false"]);
            n("ReturnStatement").bases("Statement").build("argument").field("argument", s(n("Expression"), null));
            n("ThrowStatement").bases("Statement").build("argument").field("argument", n("Expression"));
            n("TryStatement").bases("Statement").build("block", "handler", "finalizer").field("block", n("BlockStatement")).field("handler", s(n("CatchClause"), null), function() {
                return this.handlers && this.handlers[0] || null;
            }).field("handlers", [ n("CatchClause") ], function() {
                return this.handler ? [ this.handler ] : [];
            }, true).field("guardedHandlers", [ n("CatchClause") ], o.emptyArray).field("finalizer", s(n("BlockStatement"), null), o["null"]);
            n("CatchClause").bases("Node").build("param", "guard", "body").field("param", s(n("Pattern"), null), o["null"]).field("guard", s(n("Expression"), null), o["null"]).field("body", n("BlockStatement"));
            n("WhileStatement").bases("Statement").build("test", "body").field("test", n("Expression")).field("body", n("Statement"));
            n("DoWhileStatement").bases("Statement").build("body", "test").field("body", n("Statement")).field("test", n("Expression"));
            n("ForStatement").bases("Statement").build("init", "test", "update", "body").field("init", s(n("VariableDeclaration"), n("Expression"), null)).field("test", s(n("Expression"), null)).field("update", s(n("Expression"), null)).field("body", n("Statement"));
            n("ForInStatement").bases("Statement").build("left", "right", "body").field("left", s(n("VariableDeclaration"), n("Expression"))).field("right", n("Expression")).field("body", n("Statement"));
            n("DebuggerStatement").bases("Statement").build();
            n("Declaration").bases("Statement");
            n("FunctionDeclaration").bases("Function", "Declaration").build("id", "params", "body").field("id", n("Identifier"));
            n("FunctionExpression").bases("Function", "Expression").build("id", "params", "body");
            n("VariableDeclaration").bases("Declaration").build("kind", "declarations").field("kind", s("var", "let", "const")).field("declarations", [ n("VariableDeclarator") ]);
            n("VariableDeclarator").bases("Node").build("id", "init").field("id", n("Pattern")).field("init", s(n("Expression"), null));
            n("Expression").bases("Node", "Pattern");
            n("ThisExpression").bases("Expression").build();
            n("ArrayExpression").bases("Expression").build("elements").field("elements", [ s(n("Expression"), null) ]);
            n("ObjectExpression").bases("Expression").build("properties").field("properties", [ n("Property") ]);
            n("Property").bases("Node").build("kind", "key", "value").field("kind", s("init", "get", "set")).field("key", s(n("Literal"), n("Identifier"))).field("value", n("Expression"));
            n("SequenceExpression").bases("Expression").build("expressions").field("expressions", [ n("Expression") ]);
            var l = s("-", "+", "!", "~", "typeof", "void", "delete");
            n("UnaryExpression").bases("Expression").build("operator", "argument", "prefix").field("operator", l).field("argument", n("Expression")).field("prefix", Boolean, o["true"]);
            var c = s("==", "!=", "===", "!==", "<", "<=", ">", ">=", "<<", ">>", ">>>", "+", "-", "*", "/", "%", "**", "&", "|", "^", "in", "instanceof", "..");
            n("BinaryExpression").bases("Expression").build("operator", "left", "right").field("operator", c).field("left", n("Expression")).field("right", n("Expression"));
            var h = s("=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "|=", "^=", "&=");
            n("AssignmentExpression").bases("Expression").build("operator", "left", "right").field("operator", h).field("left", n("Pattern")).field("right", n("Expression"));
            var p = s("++", "--");
            n("UpdateExpression").bases("Expression").build("operator", "argument", "prefix").field("operator", p).field("argument", n("Expression")).field("prefix", Boolean);
            var f = s("||", "&&");
            n("LogicalExpression").bases("Expression").build("operator", "left", "right").field("operator", f).field("left", n("Expression")).field("right", n("Expression"));
            n("ConditionalExpression").bases("Expression").build("test", "consequent", "alternate").field("test", n("Expression")).field("consequent", n("Expression")).field("alternate", n("Expression"));
            n("NewExpression").bases("Expression").build("callee", "arguments").field("callee", n("Expression")).field("arguments", [ n("Expression") ]);
            n("CallExpression").bases("Expression").build("callee", "arguments").field("callee", n("Expression")).field("arguments", [ n("Expression") ]);
            n("MemberExpression").bases("Expression").build("object", "property", "computed").field("object", n("Expression")).field("property", s(n("Identifier"), n("Expression"))).field("computed", Boolean, function() {
                var e = this.property.type;
                if (e === "Literal" || e === "MemberExpression" || e === "BinaryExpression") {
                    return true;
                }
                return false;
            });
            n("Pattern").bases("Node");
            n("SwitchCase").bases("Node").build("test", "consequent").field("test", s(n("Expression"), null)).field("consequent", [ n("Statement") ]);
            n("Identifier").bases("Node", "Expression", "Pattern").build("name").field("name", String).field("optional", Boolean, o["false"]);
            n("Literal").bases("Node", "Expression").build("value").field("value", s(String, Boolean, null, Number, RegExp)).field("regex", s({
                pattern: String,
                flags: String
            }, null), function() {
                if (this.value instanceof RegExp) {
                    var e = "";
                    if (this.value.ignoreCase) e += "i";
                    if (this.value.multiline) e += "m";
                    if (this.value.global) e += "g";
                    return {
                        pattern: this.value.source,
                        flags: e
                    };
                }
                return null;
            });
            n("Comment").bases("Printable").field("value", String).field("leading", Boolean, o["true"]).field("trailing", Boolean, o["false"]);
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(40));
            var t = e.use(r(2));
            var i = t.Type.def;
            var n = t.Type.or;
            var s = t.builtInTypes;
            var a = e.use(r(4)).defaults;
            i("Function").field("async", Boolean, a["false"]);
            i("SpreadProperty").bases("Node").build("argument").field("argument", i("Expression"));
            i("ObjectExpression").field("properties", [ n(i("Property"), i("SpreadProperty"), i("SpreadElement")) ]);
            i("SpreadPropertyPattern").bases("Pattern").build("argument").field("argument", i("Pattern"));
            i("ObjectPattern").field("properties", [ n(i("Property"), i("PropertyPattern"), i("SpreadPropertyPattern")) ]);
            i("AwaitExpression").bases("Expression").build("argument", "all").field("argument", n(i("Expression"), null)).field("all", Boolean, a["false"]);
        };
    }, function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = r(8);
        var s = r(23);
        var a = r(22).normalize;
        var o = r(44).makeUniqueKey();
        var u = r(6);
        var l = u.builtInTypes.string;
        var c = r(9).comparePos;
        var h = r(82);
        var p = typeof Symbol === "function";
        var o = "recastLinesSecret";
        if (p) {
            o = Symbol.for(o);
        }
        function f(e) {
            return e[o];
        }
        function d(e, t) {
            n.ok(this instanceof d);
            n.ok(e.length > 0);
            if (t) {
                l.assert(t);
            } else {
                t = null;
            }
            m(this, o, {
                infos: e,
                mappings: [],
                name: t,
                cachedSourceMap: null
            });
            this.length = e.length;
            this.name = t;
            if (t) {
                f(this).mappings.push(new h(this, {
                    start: this.firstPos(),
                    end: this.lastPos()
                }));
            }
        }
        function m(e, t, r) {
            if (p) {
                return e[t] = r;
            }
            Object.defineProperty(e, t, {
                value: r,
                enumerable: false,
                writable: false,
                configurable: true
            });
            return r;
        }
        t.Lines = d;
        var v = d.prototype;
        function y(e) {
            return {
                line: e.line,
                indent: e.indent,
                locked: e.locked,
                sliceStart: e.sliceStart,
                sliceEnd: e.sliceEnd
            };
        }
        var x = {};
        var g = x.hasOwnProperty;
        var b = 10;
        function E(e, t) {
            var r = 0;
            var s = e.length;
            for (var a = 0; a < s; ++a) {
                switch (e.charCodeAt(a)) {
                  case 9:
                    n.strictEqual(typeof t === "undefined" ? "undefined" : i(t), "number");
                    n.ok(t > 0);
                    var o = Math.ceil(r / t) * t;
                    if (o === r) {
                        r += t;
                    } else {
                        r = o;
                    }
                    break;

                  case 11:
                  case 12:
                  case 13:
                  case 65279:
                    break;

                  case 32:
                  default:
                    r += 1;
                    break;
                }
            }
            return r;
        }
        t.countSpaces = E;
        var S = /^\s*/;
        var D = /\u000D\u000A|\u000D(?!\u000A)|\u000A|\u2028|\u2029/;
        function C(e, t) {
            if (e instanceof d) return e;
            e += "";
            var r = t && t.tabWidth;
            var i = e.indexOf("\t") < 0;
            var s = !!(t && t.locked);
            var o = !t && i && e.length <= b;
            n.ok(r || i, "No tab width specified but encountered tabs in string\n" + e);
            if (o && g.call(x, e)) return x[e];
            var u = new d(e.split(D).map(function(e) {
                var t = S.exec(e)[0];
                return {
                    line: e,
                    indent: E(t, r),
                    locked: s,
                    sliceStart: t.length,
                    sliceEnd: e.length
                };
            }), a(t).sourceFileName);
            if (o) x[e] = u;
            return u;
        }
        t.fromString = C;
        function A(e) {
            return !/\S/.test(e);
        }
        v.toString = function(e) {
            return this.sliceString(this.firstPos(), this.lastPos(), e);
        };
        v.getSourceMap = function(e, t) {
            if (!e) {
                return null;
            }
            var r = this;
            function i(r) {
                r = r || {};
                l.assert(e);
                r.file = e;
                if (t) {
                    l.assert(t);
                    r.sourceRoot = t;
                }
                return r;
            }
            var a = f(r);
            if (a.cachedSourceMap) {
                return i(a.cachedSourceMap.toJSON());
            }
            var o = new s.SourceMapGenerator(i());
            var u = {};
            a.mappings.forEach(function(e) {
                var t = e.sourceLines.skipSpaces(e.sourceLoc.start) || e.sourceLines.lastPos();
                var i = r.skipSpaces(e.targetLoc.start) || r.lastPos();
                while (c(t, e.sourceLoc.end) < 0 && c(i, e.targetLoc.end) < 0) {
                    var s = e.sourceLines.charAt(t);
                    var a = r.charAt(i);
                    n.strictEqual(s, a);
                    var l = e.sourceLines.name;
                    o.addMapping({
                        source: l,
                        original: {
                            line: t.line,
                            column: t.column
                        },
                        generated: {
                            line: i.line,
                            column: i.column
                        }
                    });
                    if (!g.call(u, l)) {
                        var h = e.sourceLines.toString();
                        o.setSourceContent(l, h);
                        u[l] = h;
                    }
                    r.nextPos(i, true);
                    e.sourceLines.nextPos(t, true);
                }
            });
            a.cachedSourceMap = o;
            return o.toJSON();
        };
        v.bootstrapCharAt = function(e) {
            n.strictEqual(typeof e === "undefined" ? "undefined" : i(e), "object");
            n.strictEqual(i(e.line), "number");
            n.strictEqual(i(e.column), "number");
            var t = e.line, r = e.column, s = this.toString().split(D), a = s[t - 1];
            if (typeof a === "undefined") return "";
            if (r === a.length && t < s.length) return "\n";
            if (r >= a.length) return "";
            return a.charAt(r);
        };
        v.charAt = function(e) {
            n.strictEqual(typeof e === "undefined" ? "undefined" : i(e), "object");
            n.strictEqual(i(e.line), "number");
            n.strictEqual(i(e.column), "number");
            var t = e.line, r = e.column, s = f(this), a = s.infos, o = a[t - 1], u = r;
            if (typeof o === "undefined" || u < 0) return "";
            var l = this.getIndentAt(t);
            if (u < l) return " ";
            u += o.sliceStart - l;
            if (u === o.sliceEnd && t < this.length) return "\n";
            if (u >= o.sliceEnd) return "";
            return o.line.charAt(u);
        };
        v.stripMargin = function(e, t) {
            if (e === 0) return this;
            n.ok(e > 0, "negative margin: " + e);
            if (t && this.length === 1) return this;
            var r = f(this);
            var i = new d(r.infos.map(function(r, i) {
                if (r.line && (i > 0 || !t)) {
                    r = y(r);
                    r.indent = Math.max(0, r.indent - e);
                }
                return r;
            }));
            if (r.mappings.length > 0) {
                var s = f(i).mappings;
                n.strictEqual(s.length, 0);
                r.mappings.forEach(function(r) {
                    s.push(r.indent(e, t, true));
                });
            }
            return i;
        };
        v.indent = function(e) {
            if (e === 0) return this;
            var t = f(this);
            var r = new d(t.infos.map(function(t) {
                if (t.line && !t.locked) {
                    t = y(t);
                    t.indent += e;
                }
                return t;
            }));
            if (t.mappings.length > 0) {
                var i = f(r).mappings;
                n.strictEqual(i.length, 0);
                t.mappings.forEach(function(t) {
                    i.push(t.indent(e));
                });
            }
            return r;
        };
        v.indentTail = function(e) {
            if (e === 0) return this;
            if (this.length < 2) return this;
            var t = f(this);
            var r = new d(t.infos.map(function(t, r) {
                if (r > 0 && t.line && !t.locked) {
                    t = y(t);
                    t.indent += e;
                }
                return t;
            }));
            if (t.mappings.length > 0) {
                var i = f(r).mappings;
                n.strictEqual(i.length, 0);
                t.mappings.forEach(function(t) {
                    i.push(t.indent(e, true));
                });
            }
            return r;
        };
        v.lockIndentTail = function() {
            if (this.length < 2) {
                return this;
            }
            var e = f(this).infos;
            return new d(e.map(function(e, t) {
                e = y(e);
                e.locked = t > 0;
                return e;
            }));
        };
        v.getIndentAt = function(e) {
            n.ok(e >= 1, "no line " + e + " (line numbers start from 1)");
            var t = f(this), r = t.infos[e - 1];
            return Math.max(r.indent, 0);
        };
        v.guessTabWidth = function() {
            var e = f(this);
            if (g.call(e, "cachedTabWidth")) {
                return e.cachedTabWidth;
            }
            var t = [];
            var r = 0;
            for (var i = 1, n = this.length; i <= n; ++i) {
                var s = e.infos[i - 1];
                var a = s.line.slice(s.sliceStart, s.sliceEnd);
                if (A(a)) {
                    continue;
                }
                var o = Math.abs(s.indent - r);
                t[o] = ~~t[o] + 1;
                r = s.indent;
            }
            var u = -1;
            var l = 2;
            for (var c = 1; c < t.length; c += 1) {
                if (g.call(t, c) && t[c] > u) {
                    u = t[c];
                    l = c;
                }
            }
            return e.cachedTabWidth = l;
        };
        v.startsWithComment = function() {
            var e = f(this);
            if (e.infos.length === 0) {
                return false;
            }
            var t = e.infos[0], r = t.sliceStart, i = t.sliceEnd, n = t.line.slice(r, i).trim();
            return n.length === 0 || n.slice(0, 2) === "//" || n.slice(0, 2) === "/*";
        };
        v.isOnlyWhitespace = function() {
            return A(this.toString());
        };
        v.isPrecededOnlyByWhitespace = function(e) {
            var t = f(this);
            var r = t.infos[e.line - 1];
            var i = Math.max(r.indent, 0);
            var n = e.column - i;
            if (n <= 0) {
                return true;
            }
            var s = r.sliceStart;
            var a = Math.min(s + n, r.sliceEnd);
            var o = r.line.slice(s, a);
            return A(o);
        };
        v.getLineLength = function(e) {
            var t = f(this), r = t.infos[e - 1];
            return this.getIndentAt(e) + r.sliceEnd - r.sliceStart;
        };
        v.nextPos = function(e, t) {
            var r = Math.max(e.line, 0), i = Math.max(e.column, 0);
            if (i < this.getLineLength(r)) {
                e.column += 1;
                return t ? !!this.skipSpaces(e, false, true) : true;
            }
            if (r < this.length) {
                e.line += 1;
                e.column = 0;
                return t ? !!this.skipSpaces(e, false, true) : true;
            }
            return false;
        };
        v.prevPos = function(e, t) {
            var r = e.line, i = e.column;
            if (i < 1) {
                r -= 1;
                if (r < 1) return false;
                i = this.getLineLength(r);
            } else {
                i = Math.min(i - 1, this.getLineLength(r));
            }
            e.line = r;
            e.column = i;
            return t ? !!this.skipSpaces(e, true, true) : true;
        };
        v.firstPos = function() {
            return {
                line: 1,
                column: 0
            };
        };
        v.lastPos = function() {
            return {
                line: this.length,
                column: this.getLineLength(this.length)
            };
        };
        v.skipSpaces = function(e, t, r) {
            if (e) {
                e = r ? e : {
                    line: e.line,
                    column: e.column
                };
            } else if (t) {
                e = this.lastPos();
            } else {
                e = this.firstPos();
            }
            if (t) {
                while (this.prevPos(e)) {
                    if (!A(this.charAt(e)) && this.nextPos(e)) {
                        return e;
                    }
                }
                return null;
            } else {
                while (A(this.charAt(e))) {
                    if (!this.nextPos(e)) {
                        return null;
                    }
                }
                return e;
            }
        };
        v.trimLeft = function() {
            var e = this.skipSpaces(this.firstPos(), false, true);
            return e ? this.slice(e) : w;
        };
        v.trimRight = function() {
            var e = this.skipSpaces(this.lastPos(), true, true);
            return e ? this.slice(this.firstPos(), e) : w;
        };
        v.trim = function() {
            var e = this.skipSpaces(this.firstPos(), false, true);
            if (e === null) return w;
            var t = this.skipSpaces(this.lastPos(), true, true);
            n.notStrictEqual(t, null);
            return this.slice(e, t);
        };
        v.eachPos = function(e, t, r) {
            var i = this.firstPos();
            if (t) {
                i.line = t.line, i.column = t.column;
            }
            if (r && !this.skipSpaces(i, false, true)) {
                return;
            }
            do {
                e.call(this, i);
            } while (this.nextPos(i, r));
        };
        v.bootstrapSlice = function(e, t) {
            var r = this.toString().split(D).slice(e.line - 1, t.line);
            r.push(r.pop().slice(0, t.column));
            r[0] = r[0].slice(e.column);
            return C(r.join("\n"));
        };
        v.slice = function(e, t) {
            if (!t) {
                if (!e) {
                    return this;
                }
                t = this.lastPos();
            }
            var r = f(this);
            var i = r.infos.slice(e.line - 1, t.line);
            if (e.line === t.line) {
                i[0] = k(i[0], e.column, t.column);
            } else {
                n.ok(e.line < t.line);
                i[0] = k(i[0], e.column);
                i.push(k(i.pop(), 0, t.column));
            }
            var s = new d(i);
            if (r.mappings.length > 0) {
                var a = f(s).mappings;
                n.strictEqual(a.length, 0);
                r.mappings.forEach(function(r) {
                    var i = r.slice(this, e, t);
                    if (i) {
                        a.push(i);
                    }
                }, this);
            }
            return s;
        };
        function k(e, t, r) {
            var i = e.sliceStart;
            var s = e.sliceEnd;
            var a = Math.max(e.indent, 0);
            var o = a + s - i;
            if (typeof r === "undefined") {
                r = o;
            }
            t = Math.max(t, 0);
            r = Math.min(r, o);
            r = Math.max(r, t);
            if (r < a) {
                a = r;
                s = i;
            } else {
                s -= o - r;
            }
            o = r;
            o -= t;
            if (t < a) {
                a -= t;
            } else {
                t -= a;
                a = 0;
                i += t;
            }
            n.ok(a >= 0);
            n.ok(i <= s);
            n.strictEqual(o, a + s - i);
            if (e.indent === a && e.sliceStart === i && e.sliceEnd === s) {
                return e;
            }
            return {
                line: e.line,
                indent: a,
                locked: false,
                sliceStart: i,
                sliceEnd: s
            };
        }
        v.bootstrapSliceString = function(e, t, r) {
            return this.slice(e, t).toString(r);
        };
        v.sliceString = function(e, t, r) {
            if (!t) {
                if (!e) {
                    return this;
                }
                t = this.lastPos();
            }
            r = a(r);
            var i = f(this).infos;
            var n = [];
            var s = r.tabWidth;
            for (var o = e.line; o <= t.line; ++o) {
                var u = i[o - 1];
                if (o === e.line) {
                    if (o === t.line) {
                        u = k(u, e.column, t.column);
                    } else {
                        u = k(u, e.column);
                    }
                } else if (o === t.line) {
                    u = k(u, 0, t.column);
                }
                var l = Math.max(u.indent, 0);
                var c = u.line.slice(0, u.sliceStart);
                if (r.reuseWhitespace && A(c) && E(c, r.tabWidth) === l) {
                    n.push(u.line.slice(0, u.sliceEnd));
                    continue;
                }
                var h = 0;
                var p = l;
                if (r.useTabs) {
                    h = Math.floor(l / s);
                    p -= h * s;
                }
                var d = "";
                if (h > 0) {
                    d += new Array(h + 1).join("\t");
                }
                if (p > 0) {
                    d += new Array(p + 1).join(" ");
                }
                d += u.line.slice(u.sliceStart, u.sliceEnd);
                n.push(d);
            }
            return n.join(r.lineTerminator);
        };
        v.isEmpty = function() {
            return this.length < 2 && this.getLineLength(1) < 1;
        };
        v.join = function(e) {
            var t = this;
            var r = f(t);
            var i = [];
            var n = [];
            var s;
            function a(e) {
                if (e === null) return;
                if (s) {
                    var t = e.infos[0];
                    var r = new Array(t.indent + 1).join(" ");
                    var a = i.length;
                    var o = Math.max(s.indent, 0) + s.sliceEnd - s.sliceStart;
                    s.line = s.line.slice(0, s.sliceEnd) + r + t.line.slice(t.sliceStart, t.sliceEnd);
                    s.locked = s.locked || t.locked;
                    s.sliceEnd = s.line.length;
                    if (e.mappings.length > 0) {
                        e.mappings.forEach(function(e) {
                            n.push(e.add(a, o));
                        });
                    }
                } else if (e.mappings.length > 0) {
                    n.push.apply(n, e.mappings);
                }
                e.infos.forEach(function(e, t) {
                    if (!s || t > 0) {
                        s = y(e);
                        i.push(s);
                    }
                });
            }
            function o(e, t) {
                if (t > 0) a(r);
                a(e);
            }
            e.map(function(e) {
                var t = C(e);
                if (t.isEmpty()) return null;
                return f(t);
            }).forEach(t.isEmpty() ? a : o);
            if (i.length < 1) return w;
            var u = new d(i);
            f(u).mappings = n;
            return u;
        };
        t.concat = function(e) {
            return w.join(e);
        };
        v.concat = function(e) {
            var t = arguments, r = [ this ];
            r.push.apply(r, t);
            n.strictEqual(r.length, t.length + 1);
            return w.join(r);
        };
        var w = C("");
    }, function(e, t) {
        "use strict";
        function r(e, t, r) {
            if (t in e) {
                return e[t];
            } else if (arguments.length === 3) {
                return r;
            } else {
                throw new Error('"' + t + '" is a required argument.');
            }
        }
        t.getArg = r;
        var i = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
        var n = /^data:.+\,.+$/;
        function s(e) {
            var t = e.match(i);
            if (!t) {
                return null;
            }
            return {
                scheme: t[1],
                auth: t[2],
                host: t[3],
                port: t[4],
                path: t[5]
            };
        }
        t.urlParse = s;
        function a(e) {
            var t = "";
            if (e.scheme) {
                t += e.scheme + ":";
            }
            t += "//";
            if (e.auth) {
                t += e.auth + "@";
            }
            if (e.host) {
                t += e.host;
            }
            if (e.port) {
                t += ":" + e.port;
            }
            if (e.path) {
                t += e.path;
            }
            return t;
        }
        t.urlGenerate = a;
        function o(e) {
            var r = e;
            var i = s(e);
            if (i) {
                if (!i.path) {
                    return e;
                }
                r = i.path;
            }
            var n = t.isAbsolute(r);
            var o = r.split(/\/+/);
            for (var u, l = 0, c = o.length - 1; c >= 0; c--) {
                u = o[c];
                if (u === ".") {
                    o.splice(c, 1);
                } else if (u === "..") {
                    l++;
                } else if (l > 0) {
                    if (u === "") {
                        o.splice(c + 1, l);
                        l = 0;
                    } else {
                        o.splice(c, 2);
                        l--;
                    }
                }
            }
            r = o.join("/");
            if (r === "") {
                r = n ? "/" : ".";
            }
            if (i) {
                i.path = r;
                return a(i);
            }
            return r;
        }
        t.normalize = o;
        function u(e, t) {
            if (e === "") {
                e = ".";
            }
            if (t === "") {
                t = ".";
            }
            var r = s(t);
            var i = s(e);
            if (i) {
                e = i.path || "/";
            }
            if (r && !r.scheme) {
                if (i) {
                    r.scheme = i.scheme;
                }
                return a(r);
            }
            if (r || t.match(n)) {
                return t;
            }
            if (i && !i.host && !i.path) {
                i.host = t;
                return a(i);
            }
            var u = t.charAt(0) === "/" ? t : o(e.replace(/\/+$/, "") + "/" + t);
            if (i) {
                i.path = u;
                return a(i);
            }
            return u;
        }
        t.join = u;
        t.isAbsolute = function(e) {
            return e.charAt(0) === "/" || i.test(e);
        };
        function l(e, t) {
            if (e === "") {
                e = ".";
            }
            e = e.replace(/\/$/, "");
            var r = 0;
            while (t.indexOf(e + "/") !== 0) {
                var i = e.lastIndexOf("/");
                if (i < 0) {
                    return t;
                }
                e = e.slice(0, i);
                if (e.match(/^([^\/]+:\/)?\/*$/)) {
                    return t;
                }
                ++r;
            }
            return Array(r + 1).join("../") + t.substr(e.length + 1);
        }
        t.relative = l;
        var c = function() {
            var e = Object.create(null);
            return !("__proto__" in e);
        }();
        function h(e) {
            return e;
        }
        function p(e) {
            if (d(e)) {
                return "$" + e;
            }
            return e;
        }
        t.toSetString = c ? h : p;
        function f(e) {
            if (d(e)) {
                return e.slice(1);
            }
            return e;
        }
        t.fromSetString = c ? h : f;
        function d(e) {
            if (!e) {
                return false;
            }
            var t = e.length;
            if (t < 9) {
                return false;
            }
            if (e.charCodeAt(t - 1) !== 95 || e.charCodeAt(t - 2) !== 95 || e.charCodeAt(t - 3) !== 111 || e.charCodeAt(t - 4) !== 116 || e.charCodeAt(t - 5) !== 111 || e.charCodeAt(t - 6) !== 114 || e.charCodeAt(t - 7) !== 112 || e.charCodeAt(t - 8) !== 95 || e.charCodeAt(t - 9) !== 95) {
                return false;
            }
            for (var r = t - 10; r >= 0; r--) {
                if (e.charCodeAt(r) !== 36) {
                    return false;
                }
            }
            return true;
        }
        function m(e, t, r) {
            var i = y(e.source, t.source);
            if (i !== 0) {
                return i;
            }
            i = e.originalLine - t.originalLine;
            if (i !== 0) {
                return i;
            }
            i = e.originalColumn - t.originalColumn;
            if (i !== 0 || r) {
                return i;
            }
            i = e.generatedColumn - t.generatedColumn;
            if (i !== 0) {
                return i;
            }
            i = e.generatedLine - t.generatedLine;
            if (i !== 0) {
                return i;
            }
            return y(e.name, t.name);
        }
        t.compareByOriginalPositions = m;
        function v(e, t, r) {
            var i = e.generatedLine - t.generatedLine;
            if (i !== 0) {
                return i;
            }
            i = e.generatedColumn - t.generatedColumn;
            if (i !== 0 || r) {
                return i;
            }
            i = y(e.source, t.source);
            if (i !== 0) {
                return i;
            }
            i = e.originalLine - t.originalLine;
            if (i !== 0) {
                return i;
            }
            i = e.originalColumn - t.originalColumn;
            if (i !== 0) {
                return i;
            }
            return y(e.name, t.name);
        }
        t.compareByGeneratedPositionsDeflated = v;
        function y(e, t) {
            if (e === t) {
                return 0;
            }
            if (e === null) {
                return 1;
            }
            if (t === null) {
                return -1;
            }
            if (e > t) {
                return 1;
            }
            return -1;
        }
        function x(e, t) {
            var r = e.generatedLine - t.generatedLine;
            if (r !== 0) {
                return r;
            }
            r = e.generatedColumn - t.generatedColumn;
            if (r !== 0) {
                return r;
            }
            r = y(e.source, t.source);
            if (r !== 0) {
                return r;
            }
            r = e.originalLine - t.originalLine;
            if (r !== 0) {
                return r;
            }
            r = e.originalColumn - t.originalColumn;
            if (r !== 0) {
                return r;
            }
            return y(e.name, t.name);
        }
        t.compareByGeneratedPositionsInflated = x;
        function g(e) {
            return JSON.parse(e.replace(/^\)]}'[^\n]*\n/, ""));
        }
        t.parseSourceMapInput = g;
        function b(e, t, r) {
            t = t || "";
            if (e) {
                if (e[e.length - 1] !== "/" && t[0] !== "/") {
                    e += "/";
                }
                t = e + t;
            }
            if (r) {
                var i = s(r);
                if (!i) {
                    throw new Error("sourceMapURL could not be parsed");
                }
                if (i.path) {
                    var n = i.path.lastIndexOf("/");
                    if (n >= 0) {
                        i.path = i.path.substring(0, n + 1);
                    }
                }
                t = u(a(i), t);
            }
            return o(t);
        }
        t.computeSourceURL = b;
    }, , , , , , function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            var t = e.use(r(2));
            var i = t.namedTypes;
            var n = t.builders;
            var s = t.builtInTypes.number;
            var a = t.builtInTypes.array;
            var o = e.use(r(42));
            var u = e.use(r(75));
            function l(e, t, r) {
                if (!(this instanceof l)) {
                    throw new Error("NodePath constructor cannot be invoked without 'new'");
                }
                o.call(this, e, t, r);
            }
            var c = l.prototype = Object.create(o.prototype, {
                constructor: {
                    value: l,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            Object.defineProperties(c, {
                node: {
                    get: function e() {
                        Object.defineProperty(this, "node", {
                            configurable: true,
                            value: this._computeNode()
                        });
                        return this.node;
                    }
                },
                parent: {
                    get: function e() {
                        Object.defineProperty(this, "parent", {
                            configurable: true,
                            value: this._computeParent()
                        });
                        return this.parent;
                    }
                },
                scope: {
                    get: function e() {
                        Object.defineProperty(this, "scope", {
                            configurable: true,
                            value: this._computeScope()
                        });
                        return this.scope;
                    }
                }
            });
            c.replace = function() {
                delete this.node;
                delete this.parent;
                delete this.scope;
                return o.prototype.replace.apply(this, arguments);
            };
            c.prune = function() {
                var e = this.parent;
                this.replace();
                return v(e);
            };
            c._computeNode = function() {
                var e = this.value;
                if (i.Node.check(e)) {
                    return e;
                }
                var t = this.parentPath;
                return t && t.node || null;
            };
            c._computeParent = function() {
                var e = this.value;
                var t = this.parentPath;
                if (!i.Node.check(e)) {
                    while (t && !i.Node.check(t.value)) {
                        t = t.parentPath;
                    }
                    if (t) {
                        t = t.parentPath;
                    }
                }
                while (t && !i.Node.check(t.value)) {
                    t = t.parentPath;
                }
                return t || null;
            };
            c._computeScope = function() {
                var e = this.value;
                var t = this.parentPath;
                var r = t && t.scope;
                if (i.Node.check(e) && u.isEstablishedBy(e)) {
                    r = new u(this, r);
                }
                return r || null;
            };
            c.getValueProperty = function(e) {
                return t.getFieldValue(this.value, e);
            };
            c.needsParens = function(e) {
                var t = this.parentPath;
                if (!t) {
                    return false;
                }
                var r = this.value;
                if (!i.Expression.check(r)) {
                    return false;
                }
                if (r.type === "Identifier") {
                    return false;
                }
                while (!i.Node.check(t.value)) {
                    t = t.parentPath;
                    if (!t) {
                        return false;
                    }
                }
                var n = t.value;
                switch (r.type) {
                  case "UnaryExpression":
                  case "SpreadElement":
                  case "SpreadProperty":
                    return n.type === "MemberExpression" && this.name === "object" && n.object === r;

                  case "BinaryExpression":
                  case "LogicalExpression":
                    switch (n.type) {
                      case "CallExpression":
                        return this.name === "callee" && n.callee === r;

                      case "UnaryExpression":
                      case "SpreadElement":
                      case "SpreadProperty":
                        return true;

                      case "MemberExpression":
                        return this.name === "object" && n.object === r;

                      case "BinaryExpression":
                      case "LogicalExpression":
                        var a = n.operator;
                        var t = f[a];
                        var o = r.operator;
                        var u = f[o];
                        if (t > u) {
                            return true;
                        }
                        if (t === u && this.name === "right") {
                            if (n.right !== r) {
                                throw new Error("Nodes must be equal");
                            }
                            return true;
                        }

                      default:
                        return false;
                    }

                  case "SequenceExpression":
                    switch (n.type) {
                      case "ForStatement":
                        return false;

                      case "ExpressionStatement":
                        return this.name !== "expression";

                      default:
                        return true;
                    }

                  case "YieldExpression":
                    switch (n.type) {
                      case "BinaryExpression":
                      case "LogicalExpression":
                      case "UnaryExpression":
                      case "SpreadElement":
                      case "SpreadProperty":
                      case "CallExpression":
                      case "MemberExpression":
                      case "NewExpression":
                      case "ConditionalExpression":
                      case "YieldExpression":
                        return true;

                      default:
                        return false;
                    }

                  case "Literal":
                    return n.type === "MemberExpression" && s.check(r.value) && this.name === "object" && n.object === r;

                  case "AssignmentExpression":
                  case "ConditionalExpression":
                    switch (n.type) {
                      case "UnaryExpression":
                      case "SpreadElement":
                      case "SpreadProperty":
                      case "BinaryExpression":
                      case "LogicalExpression":
                        return true;

                      case "CallExpression":
                        return this.name === "callee" && n.callee === r;

                      case "ConditionalExpression":
                        return this.name === "test" && n.test === r;

                      case "MemberExpression":
                        return this.name === "object" && n.object === r;

                      default:
                        return false;
                    }

                  default:
                    if (n.type === "NewExpression" && this.name === "callee" && n.callee === r) {
                        return d(r);
                    }
                }
                if (e !== true && !this.canBeFirstInStatement() && this.firstInStatement()) return true;
                return false;
            };
            function h(e) {
                return i.BinaryExpression.check(e) || i.LogicalExpression.check(e);
            }
            function p(e) {
                return i.UnaryExpression.check(e) || i.SpreadElement && i.SpreadElement.check(e) || i.SpreadProperty && i.SpreadProperty.check(e);
            }
            var f = {};
            [ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "%" ] ].forEach(function(e, t) {
                e.forEach(function(e) {
                    f[e] = t;
                });
            });
            function d(e) {
                if (i.CallExpression.check(e)) {
                    return true;
                }
                if (a.check(e)) {
                    return e.some(d);
                }
                if (i.Node.check(e)) {
                    return t.someField(e, function(e, t) {
                        return d(t);
                    });
                }
                return false;
            }
            c.canBeFirstInStatement = function() {
                var e = this.node;
                return !i.FunctionExpression.check(e) && !i.ObjectExpression.check(e);
            };
            c.firstInStatement = function() {
                return m(this);
            };
            function m(e) {
                for (var t, r; e.parent; e = e.parent) {
                    t = e.node;
                    r = e.parent.node;
                    if (i.BlockStatement.check(r) && e.parent.name === "body" && e.name === 0) {
                        if (r.body[0] !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        return true;
                    }
                    if (i.ExpressionStatement.check(r) && e.name === "expression") {
                        if (r.expression !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        return true;
                    }
                    if (i.SequenceExpression.check(r) && e.parent.name === "expressions" && e.name === 0) {
                        if (r.expressions[0] !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        continue;
                    }
                    if (i.CallExpression.check(r) && e.name === "callee") {
                        if (r.callee !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        continue;
                    }
                    if (i.MemberExpression.check(r) && e.name === "object") {
                        if (r.object !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        continue;
                    }
                    if (i.ConditionalExpression.check(r) && e.name === "test") {
                        if (r.test !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        continue;
                    }
                    if (h(r) && e.name === "left") {
                        if (r.left !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        continue;
                    }
                    if (i.UnaryExpression.check(r) && !r.prefix && e.name === "argument") {
                        if (r.argument !== t) {
                            throw new Error("Nodes must be equal");
                        }
                        continue;
                    }
                    return false;
                }
                return true;
            }
            function v(e) {
                if (i.VariableDeclaration.check(e.node)) {
                    var t = e.get("declarations").value;
                    if (!t || t.length === 0) {
                        return e.prune();
                    }
                } else if (i.ExpressionStatement.check(e.node)) {
                    if (!e.get("expression").value) {
                        return e.prune();
                    }
                } else if (i.IfStatement.check(e.node)) {
                    y(e);
                }
                return e;
            }
            function y(e) {
                var t = e.get("test").value;
                var r = e.get("alternate").value;
                var s = e.get("consequent").value;
                if (!s && !r) {
                    var a = n.expressionStatement(t);
                    e.replace(a);
                } else if (!s && r) {
                    var o = n.unaryExpression("!", t, true);
                    if (i.UnaryExpression.check(t) && t.operator === "!") {
                        o = t.argument;
                    }
                    e.get("test").replace(o);
                    e.get("consequent").replace(r);
                    e.get("alternate").replace();
                }
            }
            return l;
        };
    }, function(e, t, r) {
        "use strict";
        var i = {
            parser: r(92),
            tabWidth: 4,
            useTabs: false,
            reuseWhitespace: true,
            lineTerminator: r(81).EOL || "\n",
            wrapColumn: 74,
            sourceFileName: null,
            sourceMapName: null,
            sourceRoot: null,
            inputSourceMap: null,
            range: false,
            tolerant: true,
            quote: null,
            trailingComma: false,
            arrayBracketSpacing: false,
            objectCurlySpacing: true,
            arrowParensAlways: false,
            flowObjectCommas: true,
            tokens: true
        }, n = i.hasOwnProperty;
        t.normalize = function(e) {
            e = e || i;
            function t(t) {
                return n.call(e, t) ? e[t] : i[t];
            }
            return {
                tabWidth: +t("tabWidth"),
                useTabs: !!t("useTabs"),
                reuseWhitespace: !!t("reuseWhitespace"),
                lineTerminator: t("lineTerminator"),
                wrapColumn: Math.max(t("wrapColumn"), 0),
                sourceFileName: t("sourceFileName"),
                sourceMapName: t("sourceMapName"),
                sourceRoot: t("sourceRoot"),
                inputSourceMap: t("inputSourceMap"),
                parser: t("esprima") || t("parser"),
                range: t("range"),
                tolerant: t("tolerant"),
                quote: t("quote"),
                trailingComma: t("trailingComma"),
                arrayBracketSpacing: t("arrayBracketSpacing"),
                objectCurlySpacing: t("objectCurlySpacing"),
                arrowParensAlways: t("arrowParensAlways"),
                flowObjectCommas: t("flowObjectCommas"),
                tokens: !!t("tokens")
            };
        };
    }, function(e, t, r) {
        "use strict";
        t.SourceMapGenerator = r(50).SourceMapGenerator;
        t.SourceMapConsumer = r(90).SourceMapConsumer;
        t.SourceNode = r(91).SourceNode;
    }, , , , , , , , , , , , , , , function(e, t, r) {
        var i, n, s;
        "use strict";
        var a = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        (function(r, o) {
            (false ? "undefined" : a(t)) === "object" && typeof e !== "undefined" ? o(t) : true ? !(n = [ t ], 
            i = o, s = typeof i === "function" ? i.apply(t, n) : i, s !== undefined && (e.exports = s)) : o(r.acorn = {});
        })(undefined, function(e) {
            "use strict";
            var t = {
                3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
                5: "class enum extends super const export import",
                6: "enum",
                strict: "implements interface let package private protected public static yield",
                strictBind: "eval arguments"
            };
            var r = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
            var i = {
                5: r,
                6: r + " const class extends export import super"
            };
            var n = /^in(stanceof)?$/;
            var s = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿯ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞹꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
            var a = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
            var o = new RegExp("[" + s + "]");
            var u = new RegExp("[" + s + a + "]");
            s = a = null;
            var l = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 477, 28, 11, 0, 9, 21, 190, 52, 76, 44, 33, 24, 27, 35, 30, 0, 12, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 26, 230, 43, 117, 63, 32, 0, 257, 0, 11, 39, 8, 0, 22, 0, 12, 39, 3, 3, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 270, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 68, 12, 0, 67, 12, 65, 1, 31, 6129, 15, 754, 9486, 286, 82, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60, 67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541 ];
            var c = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 525, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 280, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239 ];
            function h(e, t) {
                var r = 65536;
                for (var i = 0; i < t.length; i += 2) {
                    r += t[i];
                    if (r > e) {
                        return false;
                    }
                    r += t[i + 1];
                    if (r >= e) {
                        return true;
                    }
                }
            }
            function p(e, t) {
                if (e < 65) {
                    return e === 36;
                }
                if (e < 91) {
                    return true;
                }
                if (e < 97) {
                    return e === 95;
                }
                if (e < 123) {
                    return true;
                }
                if (e <= 65535) {
                    return e >= 170 && o.test(String.fromCharCode(e));
                }
                if (t === false) {
                    return false;
                }
                return h(e, l);
            }
            function f(e, t) {
                if (e < 48) {
                    return e === 36;
                }
                if (e < 58) {
                    return true;
                }
                if (e < 65) {
                    return false;
                }
                if (e < 91) {
                    return true;
                }
                if (e < 97) {
                    return e === 95;
                }
                if (e < 123) {
                    return true;
                }
                if (e <= 65535) {
                    return e >= 170 && u.test(String.fromCharCode(e));
                }
                if (t === false) {
                    return false;
                }
                return h(e, l) || h(e, c);
            }
            var d = function e(t, r) {
                if (r === void 0) r = {};
                this.label = t;
                this.keyword = r.keyword;
                this.beforeExpr = !!r.beforeExpr;
                this.startsExpr = !!r.startsExpr;
                this.isLoop = !!r.isLoop;
                this.isAssign = !!r.isAssign;
                this.prefix = !!r.prefix;
                this.postfix = !!r.postfix;
                this.binop = r.binop || null;
                this.updateContext = null;
            };
            function m(e, t) {
                return new d(e, {
                    beforeExpr: true,
                    binop: t
                });
            }
            var v = {
                beforeExpr: true
            };
            var y = {
                startsExpr: true
            };
            var x = {};
            function g(e, t) {
                if (t === void 0) t = {};
                t.keyword = e;
                return x[e] = new d(e, t);
            }
            var b = {
                num: new d("num", y),
                regexp: new d("regexp", y),
                string: new d("string", y),
                name: new d("name", y),
                eof: new d("eof"),
                bracketL: new d("[", {
                    beforeExpr: true,
                    startsExpr: true
                }),
                bracketR: new d("]"),
                braceL: new d("{", {
                    beforeExpr: true,
                    startsExpr: true
                }),
                braceR: new d("}"),
                parenL: new d("(", {
                    beforeExpr: true,
                    startsExpr: true
                }),
                parenR: new d(")"),
                comma: new d(",", v),
                semi: new d(";", v),
                colon: new d(":", v),
                dot: new d("."),
                question: new d("?", v),
                arrow: new d("=>", v),
                template: new d("template"),
                invalidTemplate: new d("invalidTemplate"),
                ellipsis: new d("...", v),
                backQuote: new d("`", y),
                dollarBraceL: new d("${", {
                    beforeExpr: true,
                    startsExpr: true
                }),
                eq: new d("=", {
                    beforeExpr: true,
                    isAssign: true
                }),
                assign: new d("_=", {
                    beforeExpr: true,
                    isAssign: true
                }),
                incDec: new d("++/--", {
                    prefix: true,
                    postfix: true,
                    startsExpr: true
                }),
                prefix: new d("!/~", {
                    beforeExpr: true,
                    prefix: true,
                    startsExpr: true
                }),
                logicalOR: m("||", 1),
                logicalAND: m("&&", 2),
                bitwiseOR: m("|", 3),
                bitwiseXOR: m("^", 4),
                bitwiseAND: m("&", 5),
                equality: m("==/!=/===/!==", 6),
                relational: m("</>/<=/>=", 7),
                bitShift: m("<</>>/>>>", 8),
                plusMin: new d("+/-", {
                    beforeExpr: true,
                    binop: 9,
                    prefix: true,
                    startsExpr: true
                }),
                modulo: m("%", 10),
                star: m("*", 10),
                slash: m("/", 10),
                starstar: new d("**", {
                    beforeExpr: true
                }),
                _break: g("break"),
                _case: g("case", v),
                _catch: g("catch"),
                _continue: g("continue"),
                _debugger: g("debugger"),
                _default: g("default", v),
                _do: g("do", {
                    isLoop: true,
                    beforeExpr: true
                }),
                _else: g("else", v),
                _finally: g("finally"),
                _for: g("for", {
                    isLoop: true
                }),
                _function: g("function", y),
                _if: g("if"),
                _return: g("return", v),
                _switch: g("switch"),
                _throw: g("throw", v),
                _try: g("try"),
                _var: g("var"),
                _const: g("const"),
                _while: g("while", {
                    isLoop: true
                }),
                _with: g("with"),
                _new: g("new", {
                    beforeExpr: true,
                    startsExpr: true
                }),
                _this: g("this", y),
                _super: g("super", y),
                _class: g("class", y),
                _extends: g("extends", v),
                _export: g("export"),
                _import: g("import"),
                _null: g("null", y),
                _true: g("true", y),
                _false: g("false", y),
                _in: g("in", {
                    beforeExpr: true,
                    binop: 7
                }),
                _instanceof: g("instanceof", {
                    beforeExpr: true,
                    binop: 7
                }),
                _typeof: g("typeof", {
                    beforeExpr: true,
                    prefix: true,
                    startsExpr: true
                }),
                _void: g("void", {
                    beforeExpr: true,
                    prefix: true,
                    startsExpr: true
                }),
                _delete: g("delete", {
                    beforeExpr: true,
                    prefix: true,
                    startsExpr: true
                })
            };
            var E = /\r\n?|\n|\u2028|\u2029/;
            var S = new RegExp(E.source, "g");
            function D(e, t) {
                return e === 10 || e === 13 || !t && (e === 8232 || e === 8233);
            }
            var C = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
            var A = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
            var k = Object.prototype;
            var w = k.hasOwnProperty;
            var T = k.toString;
            function F(e, t) {
                return w.call(e, t);
            }
            var P = Array.isArray || function(e) {
                return T.call(e) === "[object Array]";
            };
            var N = function e(t, r) {
                this.line = t;
                this.column = r;
            };
            N.prototype.offset = function e(t) {
                return new N(this.line, this.column + t);
            };
            var I = function e(t, r, i) {
                this.start = r;
                this.end = i;
                if (t.sourceFile !== null) {
                    this.source = t.sourceFile;
                }
            };
            function _(e, t) {
                for (var r = 1, i = 0; ;) {
                    S.lastIndex = i;
                    var n = S.exec(e);
                    if (n && n.index < t) {
                        ++r;
                        i = n.index + n[0].length;
                    } else {
                        return new N(r, t - i);
                    }
                }
            }
            var B = {
                ecmaVersion: 9,
                sourceType: "script",
                onInsertedSemicolon: null,
                onTrailingComma: null,
                allowReserved: null,
                allowReturnOutsideFunction: false,
                allowImportExportEverywhere: false,
                allowAwaitOutsideFunction: false,
                allowHashBang: false,
                locations: false,
                onToken: null,
                onComment: null,
                ranges: false,
                program: null,
                sourceFile: null,
                directSourceFile: null,
                preserveParens: false
            };
            function L(e) {
                var t = {};
                for (var r in B) {
                    t[r] = e && F(e, r) ? e[r] : B[r];
                }
                if (t.ecmaVersion >= 2015) {
                    t.ecmaVersion -= 2009;
                }
                if (t.allowReserved == null) {
                    t.allowReserved = t.ecmaVersion < 5;
                }
                if (P(t.onToken)) {
                    var i = t.onToken;
                    t.onToken = function(e) {
                        return i.push(e);
                    };
                }
                if (P(t.onComment)) {
                    t.onComment = M(t, t.onComment);
                }
                return t;
            }
            function M(e, t) {
                return function(r, i, n, s, a, o) {
                    var u = {
                        type: r ? "Block" : "Line",
                        value: i,
                        start: n,
                        end: s
                    };
                    if (e.locations) {
                        u.loc = new I(this, a, o);
                    }
                    if (e.ranges) {
                        u.range = [ n, s ];
                    }
                    t.push(u);
                };
            }
            var O = 1;
            var j = 2;
            var R = O | j;
            var X = 4;
            var V = 8;
            var U = 16;
            var J = 32;
            var z = 64;
            var q = 128;
            function W(e, t) {
                return j | (e ? X : 0) | (t ? V : 0);
            }
            var K = 0;
            var G = 1;
            var H = 2;
            var Y = 3;
            var $ = 4;
            var Q = 5;
            function Z(e) {
                return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$");
            }
            var ee = function e(r, n, s) {
                this.options = r = L(r);
                this.sourceFile = r.sourceFile;
                this.keywords = Z(i[r.ecmaVersion >= 6 ? 6 : 5]);
                var a = "";
                if (!r.allowReserved) {
                    for (var o = r.ecmaVersion; ;o--) {
                        if (a = t[o]) {
                            break;
                        }
                    }
                    if (r.sourceType === "module") {
                        a += " await";
                    }
                }
                this.reservedWords = Z(a);
                var u = (a ? a + " " : "") + t.strict;
                this.reservedWordsStrict = Z(u);
                this.reservedWordsStrictBind = Z(u + " " + t.strictBind);
                this.input = String(n);
                this.containsEsc = false;
                if (s) {
                    this.pos = s;
                    this.lineStart = this.input.lastIndexOf("\n", s - 1) + 1;
                    this.curLine = this.input.slice(0, this.lineStart).split(E).length;
                } else {
                    this.pos = this.lineStart = 0;
                    this.curLine = 1;
                }
                this.type = b.eof;
                this.value = null;
                this.start = this.end = this.pos;
                this.startLoc = this.endLoc = this.curPosition();
                this.lastTokEndLoc = this.lastTokStartLoc = null;
                this.lastTokStart = this.lastTokEnd = this.pos;
                this.context = this.initialContext();
                this.exprAllowed = true;
                this.inModule = r.sourceType === "module";
                this.strict = this.inModule || this.strictDirective(this.pos);
                this.potentialArrowAt = -1;
                this.yieldPos = this.awaitPos = 0;
                this.labels = [];
                if (this.pos === 0 && r.allowHashBang && this.input.slice(0, 2) === "#!") {
                    this.skipLineComment(2);
                }
                this.scopeStack = [];
                this.enterScope(O);
                this.regexpState = null;
            };
            var te = {
                inFunction: {
                    configurable: true
                },
                inGenerator: {
                    configurable: true
                },
                inAsync: {
                    configurable: true
                },
                allowSuper: {
                    configurable: true
                },
                allowDirectSuper: {
                    configurable: true
                }
            };
            ee.prototype.parse = function e() {
                var t = this.options.program || this.startNode();
                this.nextToken();
                return this.parseTopLevel(t);
            };
            te.inFunction.get = function() {
                return (this.currentVarScope().flags & j) > 0;
            };
            te.inGenerator.get = function() {
                return (this.currentVarScope().flags & V) > 0;
            };
            te.inAsync.get = function() {
                return (this.currentVarScope().flags & X) > 0;
            };
            te.allowSuper.get = function() {
                return (this.currentThisScope().flags & z) > 0;
            };
            te.allowDirectSuper.get = function() {
                return (this.currentThisScope().flags & q) > 0;
            };
            ee.prototype.inNonArrowFunction = function e() {
                return (this.currentThisScope().flags & j) > 0;
            };
            ee.extend = function e() {
                var t = [], r = arguments.length;
                while (r--) {
                    t[r] = arguments[r];
                }
                var i = this;
                for (var n = 0; n < t.length; n++) {
                    i = t[n](i);
                }
                return i;
            };
            ee.parse = function e(t, r) {
                return new this(r, t).parse();
            };
            ee.parseExpressionAt = function e(t, r, i) {
                var n = new this(i, t, r);
                n.nextToken();
                return n.parseExpression();
            };
            ee.tokenizer = function e(t, r) {
                return new this(r, t);
            };
            Object.defineProperties(ee.prototype, te);
            var re = ee.prototype;
            var ie = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/;
            re.strictDirective = function(e) {
                var t = this;
                for (;;) {
                    A.lastIndex = e;
                    e += A.exec(t.input)[0].length;
                    var r = ie.exec(t.input.slice(e));
                    if (!r) {
                        return false;
                    }
                    if ((r[1] || r[2]) === "use strict") {
                        return true;
                    }
                    e += r[0].length;
                }
            };
            re.eat = function(e) {
                if (this.type === e) {
                    this.next();
                    return true;
                } else {
                    return false;
                }
            };
            re.isContextual = function(e) {
                return this.type === b.name && this.value === e && !this.containsEsc;
            };
            re.eatContextual = function(e) {
                if (!this.isContextual(e)) {
                    return false;
                }
                this.next();
                return true;
            };
            re.expectContextual = function(e) {
                if (!this.eatContextual(e)) {
                    this.unexpected();
                }
            };
            re.canInsertSemicolon = function() {
                return this.type === b.eof || this.type === b.braceR || E.test(this.input.slice(this.lastTokEnd, this.start));
            };
            re.insertSemicolon = function() {
                if (this.canInsertSemicolon()) {
                    if (this.options.onInsertedSemicolon) {
                        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
                    }
                    return true;
                }
            };
            re.semicolon = function() {
                if (!this.eat(b.semi) && !this.insertSemicolon()) {
                    this.unexpected();
                }
            };
            re.afterTrailingComma = function(e, t) {
                if (this.type === e) {
                    if (this.options.onTrailingComma) {
                        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
                    }
                    if (!t) {
                        this.next();
                    }
                    return true;
                }
            };
            re.expect = function(e) {
                this.eat(e) || this.unexpected();
            };
            re.unexpected = function(e) {
                this.raise(e != null ? e : this.start, "Unexpected token");
            };
            function ne() {
                this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
            }
            re.checkPatternErrors = function(e, t) {
                if (!e) {
                    return;
                }
                if (e.trailingComma > -1) {
                    this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
                }
                var r = t ? e.parenthesizedAssign : e.parenthesizedBind;
                if (r > -1) {
                    this.raiseRecoverable(r, "Parenthesized pattern");
                }
            };
            re.checkExpressionErrors = function(e, t) {
                if (!e) {
                    return false;
                }
                var r = e.shorthandAssign;
                var i = e.doubleProto;
                if (!t) {
                    return r >= 0 || i >= 0;
                }
                if (r >= 0) {
                    this.raise(r, "Shorthand property assignments are valid only in destructuring patterns");
                }
                if (i >= 0) {
                    this.raiseRecoverable(i, "Redefinition of __proto__ property");
                }
            };
            re.checkYieldAwaitInDefaultParams = function() {
                if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
                    this.raise(this.yieldPos, "Yield expression cannot be a default value");
                }
                if (this.awaitPos) {
                    this.raise(this.awaitPos, "Await expression cannot be a default value");
                }
            };
            re.isSimpleAssignTarget = function(e) {
                if (e.type === "ParenthesizedExpression") {
                    return this.isSimpleAssignTarget(e.expression);
                }
                return e.type === "Identifier" || e.type === "MemberExpression";
            };
            var se = ee.prototype;
            se.parseTopLevel = function(e) {
                var t = this;
                var r = {};
                if (!e.body) {
                    e.body = [];
                }
                while (this.type !== b.eof) {
                    var i = t.parseStatement(null, true, r);
                    e.body.push(i);
                }
                this.adaptDirectivePrologue(e.body);
                this.next();
                if (this.options.ecmaVersion >= 6) {
                    e.sourceType = this.options.sourceType;
                }
                return this.finishNode(e, "Program");
            };
            var ae = {
                kind: "loop"
            };
            var oe = {
                kind: "switch"
            };
            se.isLet = function() {
                if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
                    return false;
                }
                A.lastIndex = this.pos;
                var e = A.exec(this.input);
                var t = this.pos + e[0].length, r = this.input.charCodeAt(t);
                if (r === 123 && !E.test(this.input.slice(this.end, t)) || r === 91) {
                    return true;
                }
                if (p(r, true)) {
                    var i = t + 1;
                    while (f(this.input.charCodeAt(i), true)) {
                        ++i;
                    }
                    var s = this.input.slice(t, i);
                    if (!n.test(s)) {
                        return true;
                    }
                }
                return false;
            };
            se.isAsyncFunction = function() {
                if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
                    return false;
                }
                A.lastIndex = this.pos;
                var e = A.exec(this.input);
                var t = this.pos + e[0].length;
                return !E.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !f(this.input.charAt(t + 8)));
            };
            se.parseStatement = function(e, t, r) {
                var i = this.type, n = this.startNode(), s;
                if (this.isLet()) {
                    i = b._var;
                    s = "let";
                }
                switch (i) {
                  case b._break:
                  case b._continue:
                    return this.parseBreakContinueStatement(n, i.keyword);

                  case b._debugger:
                    return this.parseDebuggerStatement(n);

                  case b._do:
                    return this.parseDoStatement(n);

                  case b._for:
                    return this.parseForStatement(n);

                  case b._function:
                    if (e && (this.strict || e !== "if") && this.options.ecmaVersion >= 6) {
                        this.unexpected();
                    }
                    return this.parseFunctionStatement(n, false, !e);

                  case b._class:
                    if (e) {
                        this.unexpected();
                    }
                    return this.parseClass(n, true);

                  case b._if:
                    return this.parseIfStatement(n);

                  case b._return:
                    return this.parseReturnStatement(n);

                  case b._switch:
                    return this.parseSwitchStatement(n);

                  case b._throw:
                    return this.parseThrowStatement(n);

                  case b._try:
                    return this.parseTryStatement(n);

                  case b._const:
                  case b._var:
                    s = s || this.value;
                    if (e && s !== "var") {
                        this.unexpected();
                    }
                    return this.parseVarStatement(n, s);

                  case b._while:
                    return this.parseWhileStatement(n);

                  case b._with:
                    return this.parseWithStatement(n);

                  case b.braceL:
                    return this.parseBlock(true, n);

                  case b.semi:
                    return this.parseEmptyStatement(n);

                  case b._export:
                  case b._import:
                    if (!this.options.allowImportExportEverywhere) {
                        if (!t) {
                            this.raise(this.start, "'import' and 'export' may only appear at the top level");
                        }
                        if (!this.inModule) {
                            this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
                        }
                    }
                    return i === b._import ? this.parseImport(n) : this.parseExport(n, r);

                  default:
                    if (this.isAsyncFunction()) {
                        if (e) {
                            this.unexpected();
                        }
                        this.next();
                        return this.parseFunctionStatement(n, true, !e);
                    }
                    var a = this.value, o = this.parseExpression();
                    if (i === b.name && o.type === "Identifier" && this.eat(b.colon)) {
                        return this.parseLabeledStatement(n, a, o, e);
                    } else {
                        return this.parseExpressionStatement(n, o);
                    }
                }
            };
            se.parseBreakContinueStatement = function(e, t) {
                var r = this;
                var i = t === "break";
                this.next();
                if (this.eat(b.semi) || this.insertSemicolon()) {
                    e.label = null;
                } else if (this.type !== b.name) {
                    this.unexpected();
                } else {
                    e.label = this.parseIdent();
                    this.semicolon();
                }
                var n = 0;
                for (;n < this.labels.length; ++n) {
                    var s = r.labels[n];
                    if (e.label == null || s.name === e.label.name) {
                        if (s.kind != null && (i || s.kind === "loop")) {
                            break;
                        }
                        if (e.label && i) {
                            break;
                        }
                    }
                }
                if (n === this.labels.length) {
                    this.raise(e.start, "Unsyntactic " + t);
                }
                return this.finishNode(e, i ? "BreakStatement" : "ContinueStatement");
            };
            se.parseDebuggerStatement = function(e) {
                this.next();
                this.semicolon();
                return this.finishNode(e, "DebuggerStatement");
            };
            se.parseDoStatement = function(e) {
                this.next();
                this.labels.push(ae);
                e.body = this.parseStatement("do");
                this.labels.pop();
                this.expect(b._while);
                e.test = this.parseParenExpression();
                if (this.options.ecmaVersion >= 6) {
                    this.eat(b.semi);
                } else {
                    this.semicolon();
                }
                return this.finishNode(e, "DoWhileStatement");
            };
            se.parseForStatement = function(e) {
                this.next();
                var t = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) && this.eatContextual("await") ? this.lastTokStart : -1;
                this.labels.push(ae);
                this.enterScope(0);
                this.expect(b.parenL);
                if (this.type === b.semi) {
                    if (t > -1) {
                        this.unexpected(t);
                    }
                    return this.parseFor(e, null);
                }
                var r = this.isLet();
                if (this.type === b._var || this.type === b._const || r) {
                    var i = this.startNode(), n = r ? "let" : this.value;
                    this.next();
                    this.parseVar(i, true, n);
                    this.finishNode(i, "VariableDeclaration");
                    if ((this.type === b._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && i.declarations.length === 1 && !(n !== "var" && i.declarations[0].init)) {
                        if (this.options.ecmaVersion >= 9) {
                            if (this.type === b._in) {
                                if (t > -1) {
                                    this.unexpected(t);
                                }
                            } else {
                                e.await = t > -1;
                            }
                        }
                        return this.parseForIn(e, i);
                    }
                    if (t > -1) {
                        this.unexpected(t);
                    }
                    return this.parseFor(e, i);
                }
                var s = new ne();
                var a = this.parseExpression(true, s);
                if (this.type === b._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
                    if (this.options.ecmaVersion >= 9) {
                        if (this.type === b._in) {
                            if (t > -1) {
                                this.unexpected(t);
                            }
                        } else {
                            e.await = t > -1;
                        }
                    }
                    this.toAssignable(a, false, s);
                    this.checkLVal(a);
                    return this.parseForIn(e, a);
                } else {
                    this.checkExpressionErrors(s, true);
                }
                if (t > -1) {
                    this.unexpected(t);
                }
                return this.parseFor(e, a);
            };
            se.parseFunctionStatement = function(e, t, r) {
                this.next();
                return this.parseFunction(e, le | (r ? 0 : ce), false, t);
            };
            se.parseIfStatement = function(e) {
                this.next();
                e.test = this.parseParenExpression();
                e.consequent = this.parseStatement("if");
                e.alternate = this.eat(b._else) ? this.parseStatement("if") : null;
                return this.finishNode(e, "IfStatement");
            };
            se.parseReturnStatement = function(e) {
                if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
                    this.raise(this.start, "'return' outside of function");
                }
                this.next();
                if (this.eat(b.semi) || this.insertSemicolon()) {
                    e.argument = null;
                } else {
                    e.argument = this.parseExpression();
                    this.semicolon();
                }
                return this.finishNode(e, "ReturnStatement");
            };
            se.parseSwitchStatement = function(e) {
                var t = this;
                this.next();
                e.discriminant = this.parseParenExpression();
                e.cases = [];
                this.expect(b.braceL);
                this.labels.push(oe);
                this.enterScope(0);
                var r;
                for (var i = false; this.type !== b.braceR; ) {
                    if (t.type === b._case || t.type === b._default) {
                        var n = t.type === b._case;
                        if (r) {
                            t.finishNode(r, "SwitchCase");
                        }
                        e.cases.push(r = t.startNode());
                        r.consequent = [];
                        t.next();
                        if (n) {
                            r.test = t.parseExpression();
                        } else {
                            if (i) {
                                t.raiseRecoverable(t.lastTokStart, "Multiple default clauses");
                            }
                            i = true;
                            r.test = null;
                        }
                        t.expect(b.colon);
                    } else {
                        if (!r) {
                            t.unexpected();
                        }
                        r.consequent.push(t.parseStatement(null));
                    }
                }
                this.exitScope();
                if (r) {
                    this.finishNode(r, "SwitchCase");
                }
                this.next();
                this.labels.pop();
                return this.finishNode(e, "SwitchStatement");
            };
            se.parseThrowStatement = function(e) {
                this.next();
                if (E.test(this.input.slice(this.lastTokEnd, this.start))) {
                    this.raise(this.lastTokEnd, "Illegal newline after throw");
                }
                e.argument = this.parseExpression();
                this.semicolon();
                return this.finishNode(e, "ThrowStatement");
            };
            var ue = [];
            se.parseTryStatement = function(e) {
                this.next();
                e.block = this.parseBlock();
                e.handler = null;
                if (this.type === b._catch) {
                    var t = this.startNode();
                    this.next();
                    if (this.eat(b.parenL)) {
                        t.param = this.parseBindingAtom();
                        var r = t.param.type === "Identifier";
                        this.enterScope(r ? J : 0);
                        this.checkLVal(t.param, r ? $ : H);
                        this.expect(b.parenR);
                    } else {
                        if (this.options.ecmaVersion < 10) {
                            this.unexpected();
                        }
                        t.param = null;
                        this.enterScope(0);
                    }
                    t.body = this.parseBlock(false);
                    this.exitScope();
                    e.handler = this.finishNode(t, "CatchClause");
                }
                e.finalizer = this.eat(b._finally) ? this.parseBlock() : null;
                if (!e.handler && !e.finalizer) {
                    this.raise(e.start, "Missing catch or finally clause");
                }
                return this.finishNode(e, "TryStatement");
            };
            se.parseVarStatement = function(e, t) {
                this.next();
                this.parseVar(e, false, t);
                this.semicolon();
                return this.finishNode(e, "VariableDeclaration");
            };
            se.parseWhileStatement = function(e) {
                this.next();
                e.test = this.parseParenExpression();
                this.labels.push(ae);
                e.body = this.parseStatement("while");
                this.labels.pop();
                return this.finishNode(e, "WhileStatement");
            };
            se.parseWithStatement = function(e) {
                if (this.strict) {
                    this.raise(this.start, "'with' in strict mode");
                }
                this.next();
                e.object = this.parseParenExpression();
                e.body = this.parseStatement("with");
                return this.finishNode(e, "WithStatement");
            };
            se.parseEmptyStatement = function(e) {
                this.next();
                return this.finishNode(e, "EmptyStatement");
            };
            se.parseLabeledStatement = function(e, t, r, i) {
                var n = this;
                for (var s = 0, a = n.labels; s < a.length; s += 1) {
                    var o = a[s];
                    if (o.name === t) {
                        n.raise(r.start, "Label '" + t + "' is already declared");
                    }
                }
                var u = this.type.isLoop ? "loop" : this.type === b._switch ? "switch" : null;
                for (var l = this.labels.length - 1; l >= 0; l--) {
                    var c = n.labels[l];
                    if (c.statementStart === e.start) {
                        c.statementStart = n.start;
                        c.kind = u;
                    } else {
                        break;
                    }
                }
                this.labels.push({
                    name: t,
                    kind: u,
                    statementStart: this.start
                });
                e.body = this.parseStatement(i);
                if (e.body.type === "ClassDeclaration" || e.body.type === "VariableDeclaration" && e.body.kind !== "var" || e.body.type === "FunctionDeclaration" && (this.strict || e.body.generator || e.body.async)) {
                    this.raiseRecoverable(e.body.start, "Invalid labeled declaration");
                }
                this.labels.pop();
                e.label = r;
                return this.finishNode(e, "LabeledStatement");
            };
            se.parseExpressionStatement = function(e, t) {
                e.expression = t;
                this.semicolon();
                return this.finishNode(e, "ExpressionStatement");
            };
            se.parseBlock = function(e, t) {
                var r = this;
                if (e === void 0) e = true;
                if (t === void 0) t = this.startNode();
                t.body = [];
                this.expect(b.braceL);
                if (e) {
                    this.enterScope(0);
                }
                while (!this.eat(b.braceR)) {
                    var i = r.parseStatement(null);
                    t.body.push(i);
                }
                if (e) {
                    this.exitScope();
                }
                return this.finishNode(t, "BlockStatement");
            };
            se.parseFor = function(e, t) {
                e.init = t;
                this.expect(b.semi);
                e.test = this.type === b.semi ? null : this.parseExpression();
                this.expect(b.semi);
                e.update = this.type === b.parenR ? null : this.parseExpression();
                this.expect(b.parenR);
                this.exitScope();
                e.body = this.parseStatement("for");
                this.labels.pop();
                return this.finishNode(e, "ForStatement");
            };
            se.parseForIn = function(e, t) {
                var r = this.type === b._in ? "ForInStatement" : "ForOfStatement";
                this.next();
                if (r === "ForInStatement") {
                    if (t.type === "AssignmentPattern" || t.type === "VariableDeclaration" && t.declarations[0].init != null && (this.strict || t.declarations[0].id.type !== "Identifier")) {
                        this.raise(t.start, "Invalid assignment in for-in loop head");
                    }
                }
                e.left = t;
                e.right = r === "ForInStatement" ? this.parseExpression() : this.parseMaybeAssign();
                this.expect(b.parenR);
                this.exitScope();
                e.body = this.parseStatement("for");
                this.labels.pop();
                return this.finishNode(e, r);
            };
            se.parseVar = function(e, t, r) {
                var i = this;
                e.declarations = [];
                e.kind = r;
                for (;;) {
                    var n = i.startNode();
                    i.parseVarId(n, r);
                    if (i.eat(b.eq)) {
                        n.init = i.parseMaybeAssign(t);
                    } else if (r === "const" && !(i.type === b._in || i.options.ecmaVersion >= 6 && i.isContextual("of"))) {
                        i.unexpected();
                    } else if (n.id.type !== "Identifier" && !(t && (i.type === b._in || i.isContextual("of")))) {
                        i.raise(i.lastTokEnd, "Complex binding patterns require an initialization value");
                    } else {
                        n.init = null;
                    }
                    e.declarations.push(i.finishNode(n, "VariableDeclarator"));
                    if (!i.eat(b.comma)) {
                        break;
                    }
                }
                return e;
            };
            se.parseVarId = function(e, t) {
                e.id = this.parseBindingAtom(t);
                this.checkLVal(e.id, t === "var" ? G : H, false);
            };
            var le = 1;
            var ce = 2;
            var he = 4;
            se.parseFunction = function(e, t, r, i) {
                this.initFunction(e);
                if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !i) {
                    e.generator = this.eat(b.star);
                }
                if (this.options.ecmaVersion >= 8) {
                    e.async = !!i;
                }
                if (t & le) {
                    e.id = t & he && this.type !== b.name ? null : this.parseIdent();
                    if (e.id && !(t & ce)) {
                        this.checkLVal(e.id, this.inModule && !this.inFunction ? H : Y);
                    }
                }
                var n = this.yieldPos, s = this.awaitPos;
                this.yieldPos = 0;
                this.awaitPos = 0;
                this.enterScope(W(e.async, e.generator));
                if (!(t & le)) {
                    e.id = this.type === b.name ? this.parseIdent() : null;
                }
                this.parseFunctionParams(e);
                this.parseFunctionBody(e, r);
                this.yieldPos = n;
                this.awaitPos = s;
                return this.finishNode(e, t & le ? "FunctionDeclaration" : "FunctionExpression");
            };
            se.parseFunctionParams = function(e) {
                this.expect(b.parenL);
                e.params = this.parseBindingList(b.parenR, false, this.options.ecmaVersion >= 8);
                this.checkYieldAwaitInDefaultParams();
            };
            se.parseClass = function(e, t) {
                var r = this;
                this.next();
                this.parseClassId(e, t);
                this.parseClassSuper(e);
                var i = this.startNode();
                var n = false;
                i.body = [];
                this.expect(b.braceL);
                while (!this.eat(b.braceR)) {
                    var s = r.parseClassElement(e.superClass !== null);
                    if (s) {
                        i.body.push(s);
                        if (s.type === "MethodDefinition" && s.kind === "constructor") {
                            if (n) {
                                r.raise(s.start, "Duplicate constructor in the same class");
                            }
                            n = true;
                        }
                    }
                }
                e.body = this.finishNode(i, "ClassBody");
                return this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
            };
            se.parseClassElement = function(e) {
                var t = this;
                if (this.eat(b.semi)) {
                    return null;
                }
                var r = this.startNode();
                var i = function e(i, n) {
                    if (n === void 0) n = false;
                    var s = t.start, a = t.startLoc;
                    if (!t.eatContextual(i)) {
                        return false;
                    }
                    if (t.type !== b.parenL && (!n || !t.canInsertSemicolon())) {
                        return true;
                    }
                    if (r.key) {
                        t.unexpected();
                    }
                    r.computed = false;
                    r.key = t.startNodeAt(s, a);
                    r.key.name = i;
                    t.finishNode(r.key, "Identifier");
                    return false;
                };
                r.kind = "method";
                r.static = i("static");
                var n = this.eat(b.star);
                var s = false;
                if (!n) {
                    if (this.options.ecmaVersion >= 8 && i("async", true)) {
                        s = true;
                        n = this.options.ecmaVersion >= 9 && this.eat(b.star);
                    } else if (i("get")) {
                        r.kind = "get";
                    } else if (i("set")) {
                        r.kind = "set";
                    }
                }
                if (!r.key) {
                    this.parsePropertyName(r);
                }
                var a = r.key;
                var o = false;
                if (!r.computed && !r.static && (a.type === "Identifier" && a.name === "constructor" || a.type === "Literal" && a.value === "constructor")) {
                    if (r.kind !== "method") {
                        this.raise(a.start, "Constructor can't have get/set modifier");
                    }
                    if (n) {
                        this.raise(a.start, "Constructor can't be a generator");
                    }
                    if (s) {
                        this.raise(a.start, "Constructor can't be an async method");
                    }
                    r.kind = "constructor";
                    o = e;
                } else if (r.static && a.type === "Identifier" && a.name === "prototype") {
                    this.raise(a.start, "Classes may not have a static property named prototype");
                }
                this.parseClassMethod(r, n, s, o);
                if (r.kind === "get" && r.value.params.length !== 0) {
                    this.raiseRecoverable(r.value.start, "getter should have no params");
                }
                if (r.kind === "set" && r.value.params.length !== 1) {
                    this.raiseRecoverable(r.value.start, "setter should have exactly one param");
                }
                if (r.kind === "set" && r.value.params[0].type === "RestElement") {
                    this.raiseRecoverable(r.value.params[0].start, "Setter cannot use rest params");
                }
                return r;
            };
            se.parseClassMethod = function(e, t, r, i) {
                e.value = this.parseMethod(t, r, i);
                return this.finishNode(e, "MethodDefinition");
            };
            se.parseClassId = function(e, t) {
                e.id = this.type === b.name ? this.parseIdent() : t === true ? this.unexpected() : null;
            };
            se.parseClassSuper = function(e) {
                e.superClass = this.eat(b._extends) ? this.parseExprSubscripts() : null;
            };
            se.parseExport = function(e, t) {
                var r = this;
                this.next();
                if (this.eat(b.star)) {
                    this.expectContextual("from");
                    if (this.type !== b.string) {
                        this.unexpected();
                    }
                    e.source = this.parseExprAtom();
                    this.semicolon();
                    return this.finishNode(e, "ExportAllDeclaration");
                }
                if (this.eat(b._default)) {
                    this.checkExport(t, "default", this.lastTokStart);
                    var i;
                    if (this.type === b._function || (i = this.isAsyncFunction())) {
                        var n = this.startNode();
                        this.next();
                        if (i) {
                            this.next();
                        }
                        e.declaration = this.parseFunction(n, le | he, false, i, true);
                    } else if (this.type === b._class) {
                        var s = this.startNode();
                        e.declaration = this.parseClass(s, "nullableID");
                    } else {
                        e.declaration = this.parseMaybeAssign();
                        this.semicolon();
                    }
                    return this.finishNode(e, "ExportDefaultDeclaration");
                }
                if (this.shouldParseExportStatement()) {
                    e.declaration = this.parseStatement(null);
                    if (e.declaration.type === "VariableDeclaration") {
                        this.checkVariableExport(t, e.declaration.declarations);
                    } else {
                        this.checkExport(t, e.declaration.id.name, e.declaration.id.start);
                    }
                    e.specifiers = [];
                    e.source = null;
                } else {
                    e.declaration = null;
                    e.specifiers = this.parseExportSpecifiers(t);
                    if (this.eatContextual("from")) {
                        if (this.type !== b.string) {
                            this.unexpected();
                        }
                        e.source = this.parseExprAtom();
                    } else {
                        for (var a = 0, o = e.specifiers; a < o.length; a += 1) {
                            var u = o[a];
                            r.checkUnreserved(u.local);
                        }
                        e.source = null;
                    }
                    this.semicolon();
                }
                return this.finishNode(e, "ExportNamedDeclaration");
            };
            se.checkExport = function(e, t, r) {
                if (!e) {
                    return;
                }
                if (F(e, t)) {
                    this.raiseRecoverable(r, "Duplicate export '" + t + "'");
                }
                e[t] = true;
            };
            se.checkPatternExport = function(e, t) {
                var r = this;
                var i = t.type;
                if (i === "Identifier") {
                    this.checkExport(e, t.name, t.start);
                } else if (i === "ObjectPattern") {
                    for (var n = 0, s = t.properties; n < s.length; n += 1) {
                        var a = s[n];
                        r.checkPatternExport(e, a);
                    }
                } else if (i === "ArrayPattern") {
                    for (var o = 0, u = t.elements; o < u.length; o += 1) {
                        var l = u[o];
                        if (l) {
                            r.checkPatternExport(e, l);
                        }
                    }
                } else if (i === "Property") {
                    this.checkPatternExport(e, t.value);
                } else if (i === "AssignmentPattern") {
                    this.checkPatternExport(e, t.left);
                } else if (i === "RestElement") {
                    this.checkPatternExport(e, t.argument);
                } else if (i === "ParenthesizedExpression") {
                    this.checkPatternExport(e, t.expression);
                }
            };
            se.checkVariableExport = function(e, t) {
                var r = this;
                if (!e) {
                    return;
                }
                for (var i = 0, n = t; i < n.length; i += 1) {
                    var s = n[i];
                    r.checkPatternExport(e, s.id);
                }
            };
            se.shouldParseExportStatement = function() {
                return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
            };
            se.parseExportSpecifiers = function(e) {
                var t = this;
                var r = [], i = true;
                this.expect(b.braceL);
                while (!this.eat(b.braceR)) {
                    if (!i) {
                        t.expect(b.comma);
                        if (t.afterTrailingComma(b.braceR)) {
                            break;
                        }
                    } else {
                        i = false;
                    }
                    var n = t.startNode();
                    n.local = t.parseIdent(true);
                    n.exported = t.eatContextual("as") ? t.parseIdent(true) : n.local;
                    t.checkExport(e, n.exported.name, n.exported.start);
                    r.push(t.finishNode(n, "ExportSpecifier"));
                }
                return r;
            };
            se.parseImport = function(e) {
                this.next();
                if (this.type === b.string) {
                    e.specifiers = ue;
                    e.source = this.parseExprAtom();
                } else {
                    e.specifiers = this.parseImportSpecifiers();
                    this.expectContextual("from");
                    e.source = this.type === b.string ? this.parseExprAtom() : this.unexpected();
                }
                this.semicolon();
                return this.finishNode(e, "ImportDeclaration");
            };
            se.parseImportSpecifiers = function() {
                var e = this;
                var t = [], r = true;
                if (this.type === b.name) {
                    var i = this.startNode();
                    i.local = this.parseIdent();
                    this.checkLVal(i.local, H);
                    t.push(this.finishNode(i, "ImportDefaultSpecifier"));
                    if (!this.eat(b.comma)) {
                        return t;
                    }
                }
                if (this.type === b.star) {
                    var n = this.startNode();
                    this.next();
                    this.expectContextual("as");
                    n.local = this.parseIdent();
                    this.checkLVal(n.local, H);
                    t.push(this.finishNode(n, "ImportNamespaceSpecifier"));
                    return t;
                }
                this.expect(b.braceL);
                while (!this.eat(b.braceR)) {
                    if (!r) {
                        e.expect(b.comma);
                        if (e.afterTrailingComma(b.braceR)) {
                            break;
                        }
                    } else {
                        r = false;
                    }
                    var s = e.startNode();
                    s.imported = e.parseIdent(true);
                    if (e.eatContextual("as")) {
                        s.local = e.parseIdent();
                    } else {
                        e.checkUnreserved(s.imported);
                        s.local = s.imported;
                    }
                    e.checkLVal(s.local, H);
                    t.push(e.finishNode(s, "ImportSpecifier"));
                }
                return t;
            };
            se.adaptDirectivePrologue = function(e) {
                for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) {
                    e[t].directive = e[t].expression.raw.slice(1, -1);
                }
            };
            se.isDirectiveCandidate = function(e) {
                return e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value === "string" && (this.input[e.start] === '"' || this.input[e.start] === "'");
            };
            var pe = ee.prototype;
            pe.toAssignable = function(e, t, r) {
                var i = this;
                if (this.options.ecmaVersion >= 6 && e) {
                    switch (e.type) {
                      case "Identifier":
                        if (this.inAsync && e.name === "await") {
                            this.raise(e.start, "Can not use 'await' as identifier inside an async function");
                        }
                        break;

                      case "ObjectPattern":
                      case "ArrayPattern":
                      case "RestElement":
                        break;

                      case "ObjectExpression":
                        e.type = "ObjectPattern";
                        if (r) {
                            this.checkPatternErrors(r, true);
                        }
                        for (var n = 0, s = e.properties; n < s.length; n += 1) {
                            var a = s[n];
                            i.toAssignable(a, t);
                            if (a.type === "RestElement" && (a.argument.type === "ArrayPattern" || a.argument.type === "ObjectPattern")) {
                                i.raise(a.argument.start, "Unexpected token");
                            }
                        }
                        break;

                      case "Property":
                        if (e.kind !== "init") {
                            this.raise(e.key.start, "Object pattern can't contain getter or setter");
                        }
                        this.toAssignable(e.value, t);
                        break;

                      case "ArrayExpression":
                        e.type = "ArrayPattern";
                        if (r) {
                            this.checkPatternErrors(r, true);
                        }
                        this.toAssignableList(e.elements, t);
                        break;

                      case "SpreadElement":
                        e.type = "RestElement";
                        this.toAssignable(e.argument, t);
                        if (e.argument.type === "AssignmentPattern") {
                            this.raise(e.argument.start, "Rest elements cannot have a default value");
                        }
                        break;

                      case "AssignmentExpression":
                        if (e.operator !== "=") {
                            this.raise(e.left.end, "Only '=' operator can be used for specifying default value.");
                        }
                        e.type = "AssignmentPattern";
                        delete e.operator;
                        this.toAssignable(e.left, t);

                      case "AssignmentPattern":
                        break;

                      case "ParenthesizedExpression":
                        this.toAssignable(e.expression, t, r);
                        break;

                      case "MemberExpression":
                        if (!t) {
                            break;
                        }

                      default:
                        this.raise(e.start, "Assigning to rvalue");
                    }
                } else if (r) {
                    this.checkPatternErrors(r, true);
                }
                return e;
            };
            pe.toAssignableList = function(e, t) {
                var r = this;
                var i = e.length;
                for (var n = 0; n < i; n++) {
                    var s = e[n];
                    if (s) {
                        r.toAssignable(s, t);
                    }
                }
                if (i) {
                    var a = e[i - 1];
                    if (this.options.ecmaVersion === 6 && t && a && a.type === "RestElement" && a.argument.type !== "Identifier") {
                        this.unexpected(a.argument.start);
                    }
                }
                return e;
            };
            pe.parseSpread = function(e) {
                var t = this.startNode();
                this.next();
                t.argument = this.parseMaybeAssign(false, e);
                return this.finishNode(t, "SpreadElement");
            };
            pe.parseRestBinding = function() {
                var e = this.startNode();
                this.next();
                if (this.options.ecmaVersion === 6 && this.type !== b.name) {
                    this.unexpected();
                }
                e.argument = this.parseBindingAtom();
                return this.finishNode(e, "RestElement");
            };
            pe.parseBindingAtom = function() {
                if (this.options.ecmaVersion >= 6) {
                    switch (this.type) {
                      case b.bracketL:
                        var e = this.startNode();
                        this.next();
                        e.elements = this.parseBindingList(b.bracketR, true, true);
                        return this.finishNode(e, "ArrayPattern");

                      case b.braceL:
                        return this.parseObj(true);
                    }
                }
                return this.parseIdent();
            };
            pe.parseBindingList = function(e, t, r) {
                var i = this;
                var n = [], s = true;
                while (!this.eat(e)) {
                    if (s) {
                        s = false;
                    } else {
                        i.expect(b.comma);
                    }
                    if (t && i.type === b.comma) {
                        n.push(null);
                    } else if (r && i.afterTrailingComma(e)) {
                        break;
                    } else if (i.type === b.ellipsis) {
                        var a = i.parseRestBinding();
                        i.parseBindingListItem(a);
                        n.push(a);
                        if (i.type === b.comma) {
                            i.raise(i.start, "Comma is not permitted after the rest element");
                        }
                        i.expect(e);
                        break;
                    } else {
                        var o = i.parseMaybeDefault(i.start, i.startLoc);
                        i.parseBindingListItem(o);
                        n.push(o);
                    }
                }
                return n;
            };
            pe.parseBindingListItem = function(e) {
                return e;
            };
            pe.parseMaybeDefault = function(e, t, r) {
                r = r || this.parseBindingAtom();
                if (this.options.ecmaVersion < 6 || !this.eat(b.eq)) {
                    return r;
                }
                var i = this.startNodeAt(e, t);
                i.left = r;
                i.right = this.parseMaybeAssign();
                return this.finishNode(i, "AssignmentPattern");
            };
            pe.checkLVal = function(e, t, r) {
                var i = this;
                if (t === void 0) t = K;
                switch (e.type) {
                  case "Identifier":
                    if (this.strict && this.reservedWordsStrictBind.test(e.name)) {
                        this.raiseRecoverable(e.start, (t ? "Binding " : "Assigning to ") + e.name + " in strict mode");
                    }
                    if (r) {
                        if (F(r, e.name)) {
                            this.raiseRecoverable(e.start, "Argument name clash");
                        }
                        r[e.name] = true;
                    }
                    if (t !== K && t !== Q) {
                        this.declareName(e.name, t, e.start);
                    }
                    break;

                  case "MemberExpression":
                    if (t) {
                        this.raiseRecoverable(e.start, "Binding member expression");
                    }
                    break;

                  case "ObjectPattern":
                    for (var n = 0, s = e.properties; n < s.length; n += 1) {
                        var a = s[n];
                        i.checkLVal(a, t, r);
                    }
                    break;

                  case "Property":
                    this.checkLVal(e.value, t, r);
                    break;

                  case "ArrayPattern":
                    for (var o = 0, u = e.elements; o < u.length; o += 1) {
                        var l = u[o];
                        if (l) {
                            i.checkLVal(l, t, r);
                        }
                    }
                    break;

                  case "AssignmentPattern":
                    this.checkLVal(e.left, t, r);
                    break;

                  case "RestElement":
                    this.checkLVal(e.argument, t, r);
                    break;

                  case "ParenthesizedExpression":
                    this.checkLVal(e.expression, t, r);
                    break;

                  default:
                    this.raise(e.start, (t ? "Binding" : "Assigning to") + " rvalue");
                }
            };
            var fe = ee.prototype;
            fe.checkPropClash = function(e, t, r) {
                if (this.options.ecmaVersion >= 9 && e.type === "SpreadElement") {
                    return;
                }
                if (this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand)) {
                    return;
                }
                var i = e.key;
                var n;
                switch (i.type) {
                  case "Identifier":
                    n = i.name;
                    break;

                  case "Literal":
                    n = String(i.value);
                    break;

                  default:
                    return;
                }
                var s = e.kind;
                if (this.options.ecmaVersion >= 6) {
                    if (n === "__proto__" && s === "init") {
                        if (t.proto) {
                            if (r && r.doubleProto < 0) {
                                r.doubleProto = i.start;
                            } else {
                                this.raiseRecoverable(i.start, "Redefinition of __proto__ property");
                            }
                        }
                        t.proto = true;
                    }
                    return;
                }
                n = "$" + n;
                var a = t[n];
                if (a) {
                    var o;
                    if (s === "init") {
                        o = this.strict && a.init || a.get || a.set;
                    } else {
                        o = a.init || a[s];
                    }
                    if (o) {
                        this.raiseRecoverable(i.start, "Redefinition of property");
                    }
                } else {
                    a = t[n] = {
                        init: false,
                        get: false,
                        set: false
                    };
                }
                a[s] = true;
            };
            fe.parseExpression = function(e, t) {
                var r = this;
                var i = this.start, n = this.startLoc;
                var s = this.parseMaybeAssign(e, t);
                if (this.type === b.comma) {
                    var a = this.startNodeAt(i, n);
                    a.expressions = [ s ];
                    while (this.eat(b.comma)) {
                        a.expressions.push(r.parseMaybeAssign(e, t));
                    }
                    return this.finishNode(a, "SequenceExpression");
                }
                return s;
            };
            fe.parseMaybeAssign = function(e, t, r) {
                if (this.isContextual("yield")) {
                    if (this.inGenerator) {
                        return this.parseYield();
                    } else {
                        this.exprAllowed = false;
                    }
                }
                var i = false, n = -1, s = -1, a = -1;
                if (t) {
                    n = t.parenthesizedAssign;
                    s = t.trailingComma;
                    a = t.shorthandAssign;
                    t.parenthesizedAssign = t.trailingComma = t.shorthandAssign = -1;
                } else {
                    t = new ne();
                    i = true;
                }
                var o = this.start, u = this.startLoc;
                if (this.type === b.parenL || this.type === b.name) {
                    this.potentialArrowAt = this.start;
                }
                var l = this.parseMaybeConditional(e, t);
                if (r) {
                    l = r.call(this, l, o, u);
                }
                if (this.type.isAssign) {
                    var c = this.startNodeAt(o, u);
                    c.operator = this.value;
                    c.left = this.type === b.eq ? this.toAssignable(l, false, t) : l;
                    if (!i) {
                        ne.call(t);
                    }
                    t.shorthandAssign = -1;
                    this.checkLVal(l);
                    this.next();
                    c.right = this.parseMaybeAssign(e);
                    return this.finishNode(c, "AssignmentExpression");
                } else {
                    if (i) {
                        this.checkExpressionErrors(t, true);
                    }
                }
                if (n > -1) {
                    t.parenthesizedAssign = n;
                }
                if (s > -1) {
                    t.trailingComma = s;
                }
                if (a > -1) {
                    t.shorthandAssign = a;
                }
                return l;
            };
            fe.parseMaybeConditional = function(e, t) {
                var r = this.start, i = this.startLoc;
                var n = this.parseExprOps(e, t);
                if (this.checkExpressionErrors(t)) {
                    return n;
                }
                if (this.eat(b.question)) {
                    var s = this.startNodeAt(r, i);
                    s.test = n;
                    s.consequent = this.parseMaybeAssign();
                    this.expect(b.colon);
                    s.alternate = this.parseMaybeAssign(e);
                    return this.finishNode(s, "ConditionalExpression");
                }
                return n;
            };
            fe.parseExprOps = function(e, t) {
                var r = this.start, i = this.startLoc;
                var n = this.parseMaybeUnary(t, false);
                if (this.checkExpressionErrors(t)) {
                    return n;
                }
                return n.start === r && n.type === "ArrowFunctionExpression" ? n : this.parseExprOp(n, r, i, -1, e);
            };
            fe.parseExprOp = function(e, t, r, i, n) {
                var s = this.type.binop;
                if (s != null && (!n || this.type !== b._in)) {
                    if (s > i) {
                        var a = this.type === b.logicalOR || this.type === b.logicalAND;
                        var o = this.value;
                        this.next();
                        var u = this.start, l = this.startLoc;
                        var c = this.parseExprOp(this.parseMaybeUnary(null, false), u, l, s, n);
                        var h = this.buildBinary(t, r, e, c, o, a);
                        return this.parseExprOp(h, t, r, i, n);
                    }
                }
                return e;
            };
            fe.buildBinary = function(e, t, r, i, n, s) {
                var a = this.startNodeAt(e, t);
                a.left = r;
                a.operator = n;
                a.right = i;
                return this.finishNode(a, s ? "LogicalExpression" : "BinaryExpression");
            };
            fe.parseMaybeUnary = function(e, t) {
                var r = this;
                var i = this.start, n = this.startLoc, s;
                if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction)) {
                    s = this.parseAwait();
                    t = true;
                } else if (this.type.prefix) {
                    var a = this.startNode(), o = this.type === b.incDec;
                    a.operator = this.value;
                    a.prefix = true;
                    this.next();
                    a.argument = this.parseMaybeUnary(null, true);
                    this.checkExpressionErrors(e, true);
                    if (o) {
                        this.checkLVal(a.argument);
                    } else if (this.strict && a.operator === "delete" && a.argument.type === "Identifier") {
                        this.raiseRecoverable(a.start, "Deleting local variable in strict mode");
                    } else {
                        t = true;
                    }
                    s = this.finishNode(a, o ? "UpdateExpression" : "UnaryExpression");
                } else {
                    s = this.parseExprSubscripts(e);
                    if (this.checkExpressionErrors(e)) {
                        return s;
                    }
                    while (this.type.postfix && !this.canInsertSemicolon()) {
                        var u = r.startNodeAt(i, n);
                        u.operator = r.value;
                        u.prefix = false;
                        u.argument = s;
                        r.checkLVal(s);
                        r.next();
                        s = r.finishNode(u, "UpdateExpression");
                    }
                }
                if (!t && this.eat(b.starstar)) {
                    return this.buildBinary(i, n, s, this.parseMaybeUnary(null, false), "**", false);
                } else {
                    return s;
                }
            };
            fe.parseExprSubscripts = function(e) {
                var t = this.start, r = this.startLoc;
                var i = this.parseExprAtom(e);
                var n = i.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
                if (this.checkExpressionErrors(e) || n) {
                    return i;
                }
                var s = this.parseSubscripts(i, t, r);
                if (e && s.type === "MemberExpression") {
                    if (e.parenthesizedAssign >= s.start) {
                        e.parenthesizedAssign = -1;
                    }
                    if (e.parenthesizedBind >= s.start) {
                        e.parenthesizedBind = -1;
                    }
                }
                return s;
            };
            fe.parseSubscripts = function(e, t, r, i) {
                var n = this;
                var s = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && this.input.slice(e.start, e.end) === "async";
                for (var a = void 0; ;) {
                    if ((a = n.eat(b.bracketL)) || n.eat(b.dot)) {
                        var o = n.startNodeAt(t, r);
                        o.object = e;
                        o.property = a ? n.parseExpression() : n.parseIdent(true);
                        o.computed = !!a;
                        if (a) {
                            n.expect(b.bracketR);
                        }
                        e = n.finishNode(o, "MemberExpression");
                    } else if (!i && n.eat(b.parenL)) {
                        var u = new ne(), l = n.yieldPos, c = n.awaitPos;
                        n.yieldPos = 0;
                        n.awaitPos = 0;
                        var h = n.parseExprList(b.parenR, n.options.ecmaVersion >= 8, false, u);
                        if (s && !n.canInsertSemicolon() && n.eat(b.arrow)) {
                            n.checkPatternErrors(u, false);
                            n.checkYieldAwaitInDefaultParams();
                            n.yieldPos = l;
                            n.awaitPos = c;
                            return n.parseArrowExpression(n.startNodeAt(t, r), h, true);
                        }
                        n.checkExpressionErrors(u, true);
                        n.yieldPos = l || n.yieldPos;
                        n.awaitPos = c || n.awaitPos;
                        var p = n.startNodeAt(t, r);
                        p.callee = e;
                        p.arguments = h;
                        e = n.finishNode(p, "CallExpression");
                    } else if (n.type === b.backQuote) {
                        var f = n.startNodeAt(t, r);
                        f.tag = e;
                        f.quasi = n.parseTemplate({
                            isTagged: true
                        });
                        e = n.finishNode(f, "TaggedTemplateExpression");
                    } else {
                        return e;
                    }
                }
            };
            fe.parseExprAtom = function(e) {
                if (this.type === b.slash) {
                    this.readRegexp();
                }
                var t, r = this.potentialArrowAt === this.start;
                switch (this.type) {
                  case b._super:
                    if (!this.allowSuper) {
                        this.raise(this.start, "'super' keyword outside a method");
                    }
                    t = this.startNode();
                    this.next();
                    if (this.type === b.parenL && !this.allowDirectSuper) {
                        this.raise(t.start, "super() call outside constructor of a subclass");
                    }
                    if (this.type !== b.dot && this.type !== b.bracketL && this.type !== b.parenL) {
                        this.unexpected();
                    }
                    return this.finishNode(t, "Super");

                  case b._this:
                    t = this.startNode();
                    this.next();
                    return this.finishNode(t, "ThisExpression");

                  case b.name:
                    var i = this.start, n = this.startLoc, s = this.containsEsc;
                    var a = this.parseIdent(this.type !== b.name);
                    if (this.options.ecmaVersion >= 8 && !s && a.name === "async" && !this.canInsertSemicolon() && this.eat(b._function)) {
                        return this.parseFunction(this.startNodeAt(i, n), 0, false, true);
                    }
                    if (r && !this.canInsertSemicolon()) {
                        if (this.eat(b.arrow)) {
                            return this.parseArrowExpression(this.startNodeAt(i, n), [ a ], false);
                        }
                        if (this.options.ecmaVersion >= 8 && a.name === "async" && this.type === b.name && !s) {
                            a = this.parseIdent();
                            if (this.canInsertSemicolon() || !this.eat(b.arrow)) {
                                this.unexpected();
                            }
                            return this.parseArrowExpression(this.startNodeAt(i, n), [ a ], true);
                        }
                    }
                    return a;

                  case b.regexp:
                    var o = this.value;
                    t = this.parseLiteral(o.value);
                    t.regex = {
                        pattern: o.pattern,
                        flags: o.flags
                    };
                    return t;

                  case b.num:
                  case b.string:
                    return this.parseLiteral(this.value);

                  case b._null:
                  case b._true:
                  case b._false:
                    t = this.startNode();
                    t.value = this.type === b._null ? null : this.type === b._true;
                    t.raw = this.type.keyword;
                    this.next();
                    return this.finishNode(t, "Literal");

                  case b.parenL:
                    var u = this.start, l = this.parseParenAndDistinguishExpression(r);
                    if (e) {
                        if (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(l)) {
                            e.parenthesizedAssign = u;
                        }
                        if (e.parenthesizedBind < 0) {
                            e.parenthesizedBind = u;
                        }
                    }
                    return l;

                  case b.bracketL:
                    t = this.startNode();
                    this.next();
                    t.elements = this.parseExprList(b.bracketR, true, true, e);
                    return this.finishNode(t, "ArrayExpression");

                  case b.braceL:
                    return this.parseObj(false, e);

                  case b._function:
                    t = this.startNode();
                    this.next();
                    return this.parseFunction(t, 0);

                  case b._class:
                    return this.parseClass(this.startNode(), false);

                  case b._new:
                    return this.parseNew();

                  case b.backQuote:
                    return this.parseTemplate();

                  default:
                    this.unexpected();
                }
            };
            fe.parseLiteral = function(e) {
                var t = this.startNode();
                t.value = e;
                t.raw = this.input.slice(this.start, this.end);
                this.next();
                return this.finishNode(t, "Literal");
            };
            fe.parseParenExpression = function() {
                this.expect(b.parenL);
                var e = this.parseExpression();
                this.expect(b.parenR);
                return e;
            };
            fe.parseParenAndDistinguishExpression = function(e) {
                var t = this;
                var r = this.start, i = this.startLoc, n, s = this.options.ecmaVersion >= 8;
                if (this.options.ecmaVersion >= 6) {
                    this.next();
                    var a = this.start, o = this.startLoc;
                    var u = [], l = true, c = false;
                    var h = new ne(), p = this.yieldPos, f = this.awaitPos, d;
                    this.yieldPos = 0;
                    this.awaitPos = 0;
                    while (this.type !== b.parenR) {
                        l ? l = false : t.expect(b.comma);
                        if (s && t.afterTrailingComma(b.parenR, true)) {
                            c = true;
                            break;
                        } else if (t.type === b.ellipsis) {
                            d = t.start;
                            u.push(t.parseParenItem(t.parseRestBinding()));
                            if (t.type === b.comma) {
                                t.raise(t.start, "Comma is not permitted after the rest element");
                            }
                            break;
                        } else {
                            u.push(t.parseMaybeAssign(false, h, t.parseParenItem));
                        }
                    }
                    var m = this.start, v = this.startLoc;
                    this.expect(b.parenR);
                    if (e && !this.canInsertSemicolon() && this.eat(b.arrow)) {
                        this.checkPatternErrors(h, false);
                        this.checkYieldAwaitInDefaultParams();
                        this.yieldPos = p;
                        this.awaitPos = f;
                        return this.parseParenArrowList(r, i, u);
                    }
                    if (!u.length || c) {
                        this.unexpected(this.lastTokStart);
                    }
                    if (d) {
                        this.unexpected(d);
                    }
                    this.checkExpressionErrors(h, true);
                    this.yieldPos = p || this.yieldPos;
                    this.awaitPos = f || this.awaitPos;
                    if (u.length > 1) {
                        n = this.startNodeAt(a, o);
                        n.expressions = u;
                        this.finishNodeAt(n, "SequenceExpression", m, v);
                    } else {
                        n = u[0];
                    }
                } else {
                    n = this.parseParenExpression();
                }
                if (this.options.preserveParens) {
                    var y = this.startNodeAt(r, i);
                    y.expression = n;
                    return this.finishNode(y, "ParenthesizedExpression");
                } else {
                    return n;
                }
            };
            fe.parseParenItem = function(e) {
                return e;
            };
            fe.parseParenArrowList = function(e, t, r) {
                return this.parseArrowExpression(this.startNodeAt(e, t), r);
            };
            var de = [];
            fe.parseNew = function() {
                var e = this.startNode();
                var t = this.parseIdent(true);
                if (this.options.ecmaVersion >= 6 && this.eat(b.dot)) {
                    e.meta = t;
                    var r = this.containsEsc;
                    e.property = this.parseIdent(true);
                    if (e.property.name !== "target" || r) {
                        this.raiseRecoverable(e.property.start, "The only valid meta property for new is new.target");
                    }
                    if (!this.inNonArrowFunction()) {
                        this.raiseRecoverable(e.start, "new.target can only be used in functions");
                    }
                    return this.finishNode(e, "MetaProperty");
                }
                var i = this.start, n = this.startLoc;
                e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, true);
                if (this.eat(b.parenL)) {
                    e.arguments = this.parseExprList(b.parenR, this.options.ecmaVersion >= 8, false);
                } else {
                    e.arguments = de;
                }
                return this.finishNode(e, "NewExpression");
            };
            fe.parseTemplateElement = function(e) {
                var t = e.isTagged;
                var r = this.startNode();
                if (this.type === b.invalidTemplate) {
                    if (!t) {
                        this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
                    }
                    r.value = {
                        raw: this.value,
                        cooked: null
                    };
                } else {
                    r.value = {
                        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
                        cooked: this.value
                    };
                }
                this.next();
                r.tail = this.type === b.backQuote;
                return this.finishNode(r, "TemplateElement");
            };
            fe.parseTemplate = function(e) {
                var t = this;
                if (e === void 0) e = {};
                var r = e.isTagged;
                if (r === void 0) r = false;
                var i = this.startNode();
                this.next();
                i.expressions = [];
                var n = this.parseTemplateElement({
                    isTagged: r
                });
                i.quasis = [ n ];
                while (!n.tail) {
                    if (t.type === b.eof) {
                        t.raise(t.pos, "Unterminated template literal");
                    }
                    t.expect(b.dollarBraceL);
                    i.expressions.push(t.parseExpression());
                    t.expect(b.braceR);
                    i.quasis.push(n = t.parseTemplateElement({
                        isTagged: r
                    }));
                }
                this.next();
                return this.finishNode(i, "TemplateLiteral");
            };
            fe.isAsyncProp = function(e) {
                return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === b.name || this.type === b.num || this.type === b.string || this.type === b.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === b.star) && !E.test(this.input.slice(this.lastTokEnd, this.start));
            };
            fe.parseObj = function(e, t) {
                var r = this;
                var i = this.startNode(), n = true, s = {};
                i.properties = [];
                this.next();
                while (!this.eat(b.braceR)) {
                    if (!n) {
                        r.expect(b.comma);
                        if (r.afterTrailingComma(b.braceR)) {
                            break;
                        }
                    } else {
                        n = false;
                    }
                    var a = r.parseProperty(e, t);
                    if (!e) {
                        r.checkPropClash(a, s, t);
                    }
                    i.properties.push(a);
                }
                return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression");
            };
            fe.parseProperty = function(e, t) {
                var r = this.startNode(), i, n, s, a;
                if (this.options.ecmaVersion >= 9 && this.eat(b.ellipsis)) {
                    if (e) {
                        r.argument = this.parseIdent(false);
                        if (this.type === b.comma) {
                            this.raise(this.start, "Comma is not permitted after the rest element");
                        }
                        return this.finishNode(r, "RestElement");
                    }
                    if (this.type === b.parenL && t) {
                        if (t.parenthesizedAssign < 0) {
                            t.parenthesizedAssign = this.start;
                        }
                        if (t.parenthesizedBind < 0) {
                            t.parenthesizedBind = this.start;
                        }
                    }
                    r.argument = this.parseMaybeAssign(false, t);
                    if (this.type === b.comma && t && t.trailingComma < 0) {
                        t.trailingComma = this.start;
                    }
                    return this.finishNode(r, "SpreadElement");
                }
                if (this.options.ecmaVersion >= 6) {
                    r.method = false;
                    r.shorthand = false;
                    if (e || t) {
                        s = this.start;
                        a = this.startLoc;
                    }
                    if (!e) {
                        i = this.eat(b.star);
                    }
                }
                var o = this.containsEsc;
                this.parsePropertyName(r);
                if (!e && !o && this.options.ecmaVersion >= 8 && !i && this.isAsyncProp(r)) {
                    n = true;
                    i = this.options.ecmaVersion >= 9 && this.eat(b.star);
                    this.parsePropertyName(r, t);
                } else {
                    n = false;
                }
                this.parsePropertyValue(r, e, i, n, s, a, t, o);
                return this.finishNode(r, "Property");
            };
            fe.parsePropertyValue = function(e, t, r, i, n, s, a, o) {
                if ((r || i) && this.type === b.colon) {
                    this.unexpected();
                }
                if (this.eat(b.colon)) {
                    e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, a);
                    e.kind = "init";
                } else if (this.options.ecmaVersion >= 6 && this.type === b.parenL) {
                    if (t) {
                        this.unexpected();
                    }
                    e.kind = "init";
                    e.method = true;
                    e.value = this.parseMethod(r, i);
                } else if (!t && !o && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== b.comma && this.type !== b.braceR) {
                    if (r || i) {
                        this.unexpected();
                    }
                    e.kind = e.key.name;
                    this.parsePropertyName(e);
                    e.value = this.parseMethod(false);
                    var u = e.kind === "get" ? 0 : 1;
                    if (e.value.params.length !== u) {
                        var l = e.value.start;
                        if (e.kind === "get") {
                            this.raiseRecoverable(l, "getter should have no params");
                        } else {
                            this.raiseRecoverable(l, "setter should have exactly one param");
                        }
                    } else {
                        if (e.kind === "set" && e.value.params[0].type === "RestElement") {
                            this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
                        }
                    }
                } else if (this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier") {
                    this.checkUnreserved(e.key);
                    e.kind = "init";
                    if (t) {
                        e.value = this.parseMaybeDefault(n, s, e.key);
                    } else if (this.type === b.eq && a) {
                        if (a.shorthandAssign < 0) {
                            a.shorthandAssign = this.start;
                        }
                        e.value = this.parseMaybeDefault(n, s, e.key);
                    } else {
                        e.value = e.key;
                    }
                    e.shorthand = true;
                } else {
                    this.unexpected();
                }
            };
            fe.parsePropertyName = function(e) {
                if (this.options.ecmaVersion >= 6) {
                    if (this.eat(b.bracketL)) {
                        e.computed = true;
                        e.key = this.parseMaybeAssign();
                        this.expect(b.bracketR);
                        return e.key;
                    } else {
                        e.computed = false;
                    }
                }
                return e.key = this.type === b.num || this.type === b.string ? this.parseExprAtom() : this.parseIdent(true);
            };
            fe.initFunction = function(e) {
                e.id = null;
                if (this.options.ecmaVersion >= 6) {
                    e.generator = e.expression = false;
                }
                if (this.options.ecmaVersion >= 8) {
                    e.async = false;
                }
            };
            fe.parseMethod = function(e, t, r) {
                var i = this.startNode(), n = this.yieldPos, s = this.awaitPos;
                this.initFunction(i);
                if (this.options.ecmaVersion >= 6) {
                    i.generator = e;
                }
                if (this.options.ecmaVersion >= 8) {
                    i.async = !!t;
                }
                this.yieldPos = 0;
                this.awaitPos = 0;
                this.enterScope(W(t, i.generator) | z | (r ? q : 0));
                this.expect(b.parenL);
                i.params = this.parseBindingList(b.parenR, false, this.options.ecmaVersion >= 8);
                this.checkYieldAwaitInDefaultParams();
                this.parseFunctionBody(i, false);
                this.yieldPos = n;
                this.awaitPos = s;
                return this.finishNode(i, "FunctionExpression");
            };
            fe.parseArrowExpression = function(e, t, r) {
                var i = this.yieldPos, n = this.awaitPos;
                this.enterScope(W(r, false) | U);
                this.initFunction(e);
                if (this.options.ecmaVersion >= 8) {
                    e.async = !!r;
                }
                this.yieldPos = 0;
                this.awaitPos = 0;
                e.params = this.toAssignableList(t, true);
                this.parseFunctionBody(e, true);
                this.yieldPos = i;
                this.awaitPos = n;
                return this.finishNode(e, "ArrowFunctionExpression");
            };
            fe.parseFunctionBody = function(e, t) {
                var r = t && this.type !== b.braceL;
                var i = this.strict, n = false;
                if (r) {
                    e.body = this.parseMaybeAssign();
                    e.expression = true;
                    this.checkParams(e, false);
                } else {
                    var s = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
                    if (!i || s) {
                        n = this.strictDirective(this.end);
                        if (n && s) {
                            this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list");
                        }
                    }
                    var a = this.labels;
                    this.labels = [];
                    if (n) {
                        this.strict = true;
                    }
                    this.checkParams(e, !i && !n && !t && this.isSimpleParamList(e.params));
                    e.body = this.parseBlock(false);
                    e.expression = false;
                    this.adaptDirectivePrologue(e.body.body);
                    this.labels = a;
                }
                this.exitScope();
                if (this.strict && e.id) {
                    this.checkLVal(e.id, Q);
                }
                this.strict = i;
            };
            fe.isSimpleParamList = function(e) {
                for (var t = 0, r = e; t < r.length; t += 1) {
                    var i = r[t];
                    if (i.type !== "Identifier") {
                        return false;
                    }
                }
                return true;
            };
            fe.checkParams = function(e, t) {
                var r = this;
                var i = {};
                for (var n = 0, s = e.params; n < s.length; n += 1) {
                    var a = s[n];
                    r.checkLVal(a, G, t ? null : i);
                }
            };
            fe.parseExprList = function(e, t, r, i) {
                var n = this;
                var s = [], a = true;
                while (!this.eat(e)) {
                    if (!a) {
                        n.expect(b.comma);
                        if (t && n.afterTrailingComma(e)) {
                            break;
                        }
                    } else {
                        a = false;
                    }
                    var o = void 0;
                    if (r && n.type === b.comma) {
                        o = null;
                    } else if (n.type === b.ellipsis) {
                        o = n.parseSpread(i);
                        if (i && n.type === b.comma && i.trailingComma < 0) {
                            i.trailingComma = n.start;
                        }
                    } else {
                        o = n.parseMaybeAssign(false, i);
                    }
                    s.push(o);
                }
                return s;
            };
            fe.checkUnreserved = function(e) {
                var t = e.start;
                var r = e.end;
                var i = e.name;
                if (this.inGenerator && i === "yield") {
                    this.raiseRecoverable(t, "Can not use 'yield' as identifier inside a generator");
                }
                if (this.inAsync && i === "await") {
                    this.raiseRecoverable(t, "Can not use 'await' as identifier inside an async function");
                }
                if (this.keywords.test(i)) {
                    this.raise(t, "Unexpected keyword '" + i + "'");
                }
                if (this.options.ecmaVersion < 6 && this.input.slice(t, r).indexOf("\\") !== -1) {
                    return;
                }
                var n = this.strict ? this.reservedWordsStrict : this.reservedWords;
                if (n.test(i)) {
                    if (!this.inAsync && i === "await") {
                        this.raiseRecoverable(t, "Can not use keyword 'await' outside an async function");
                    }
                    this.raiseRecoverable(t, "The keyword '" + i + "' is reserved");
                }
            };
            fe.parseIdent = function(e, t) {
                var r = this.startNode();
                if (e && this.options.allowReserved === "never") {
                    e = false;
                }
                if (this.type === b.name) {
                    r.name = this.value;
                } else if (this.type.keyword) {
                    r.name = this.type.keyword;
                    if ((r.name === "class" || r.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
                        this.context.pop();
                    }
                } else {
                    this.unexpected();
                }
                this.next();
                this.finishNode(r, "Identifier");
                if (!e) {
                    this.checkUnreserved(r);
                }
                return r;
            };
            fe.parseYield = function() {
                if (!this.yieldPos) {
                    this.yieldPos = this.start;
                }
                var e = this.startNode();
                this.next();
                if (this.type === b.semi || this.canInsertSemicolon() || this.type !== b.star && !this.type.startsExpr) {
                    e.delegate = false;
                    e.argument = null;
                } else {
                    e.delegate = this.eat(b.star);
                    e.argument = this.parseMaybeAssign();
                }
                return this.finishNode(e, "YieldExpression");
            };
            fe.parseAwait = function() {
                if (!this.awaitPos) {
                    this.awaitPos = this.start;
                }
                var e = this.startNode();
                this.next();
                e.argument = this.parseMaybeUnary(null, true);
                return this.finishNode(e, "AwaitExpression");
            };
            var me = ee.prototype;
            me.raise = function(e, t) {
                var r = _(this.input, e);
                t += " (" + r.line + ":" + r.column + ")";
                var i = new SyntaxError(t);
                i.pos = e;
                i.loc = r;
                i.raisedAt = this.pos;
                throw i;
            };
            me.raiseRecoverable = me.raise;
            me.curPosition = function() {
                if (this.options.locations) {
                    return new N(this.curLine, this.pos - this.lineStart);
                }
            };
            var ve = ee.prototype;
            var ye = function e(t) {
                this.flags = t;
                this.var = [];
                this.lexical = [];
            };
            ve.enterScope = function(e) {
                this.scopeStack.push(new ye(e));
            };
            ve.exitScope = function() {
                this.scopeStack.pop();
            };
            ve.declareName = function(e, t, r) {
                var i = this;
                var n = false;
                if (t === H) {
                    var s = this.currentScope();
                    n = s.lexical.indexOf(e) > -1 || s.var.indexOf(e) > -1;
                    s.lexical.push(e);
                } else if (t === $) {
                    var a = this.currentScope();
                    a.lexical.push(e);
                } else if (t === Y) {
                    var o = this.currentScope();
                    n = o.lexical.indexOf(e) > -1;
                    o.var.push(e);
                } else {
                    for (var u = this.scopeStack.length - 1; u >= 0; --u) {
                        var l = i.scopeStack[u];
                        if (l.lexical.indexOf(e) > -1 && !(l.flags & J) && l.lexical[0] === e) {
                            n = true;
                        }
                        l.var.push(e);
                        if (l.flags & R) {
                            break;
                        }
                    }
                }
                if (n) {
                    this.raiseRecoverable(r, "Identifier '" + e + "' has already been declared");
                }
            };
            ve.currentScope = function() {
                return this.scopeStack[this.scopeStack.length - 1];
            };
            ve.currentVarScope = function() {
                var e = this;
                for (var t = this.scopeStack.length - 1; ;t--) {
                    var r = e.scopeStack[t];
                    if (r.flags & R) {
                        return r;
                    }
                }
            };
            ve.currentThisScope = function() {
                var e = this;
                for (var t = this.scopeStack.length - 1; ;t--) {
                    var r = e.scopeStack[t];
                    if (r.flags & R && !(r.flags & U)) {
                        return r;
                    }
                }
            };
            var xe = function e(t, r, i) {
                this.type = "";
                this.start = r;
                this.end = 0;
                if (t.options.locations) {
                    this.loc = new I(t, i);
                }
                if (t.options.directSourceFile) {
                    this.sourceFile = t.options.directSourceFile;
                }
                if (t.options.ranges) {
                    this.range = [ r, 0 ];
                }
            };
            var ge = ee.prototype;
            ge.startNode = function() {
                return new xe(this, this.start, this.startLoc);
            };
            ge.startNodeAt = function(e, t) {
                return new xe(this, e, t);
            };
            function be(e, t, r, i) {
                e.type = t;
                e.end = r;
                if (this.options.locations) {
                    e.loc.end = i;
                }
                if (this.options.ranges) {
                    e.range[1] = r;
                }
                return e;
            }
            ge.finishNode = function(e, t) {
                return be.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
            };
            ge.finishNodeAt = function(e, t, r, i) {
                return be.call(this, e, t, r, i);
            };
            var Ee = function e(t, r, i, n, s) {
                this.token = t;
                this.isExpr = !!r;
                this.preserveSpace = !!i;
                this.override = n;
                this.generator = !!s;
            };
            var Se = {
                b_stat: new Ee("{", false),
                b_expr: new Ee("{", true),
                b_tmpl: new Ee("${", false),
                p_stat: new Ee("(", false),
                p_expr: new Ee("(", true),
                q_tmpl: new Ee("`", true, true, function(e) {
                    return e.tryReadTemplateToken();
                }),
                f_stat: new Ee("function", false),
                f_expr: new Ee("function", true),
                f_expr_gen: new Ee("function", true, false, null, true),
                f_gen: new Ee("function", false, false, null, true)
            };
            var De = ee.prototype;
            De.initialContext = function() {
                return [ Se.b_stat ];
            };
            De.braceIsBlock = function(e) {
                var t = this.curContext();
                if (t === Se.f_expr || t === Se.f_stat) {
                    return true;
                }
                if (e === b.colon && (t === Se.b_stat || t === Se.b_expr)) {
                    return !t.isExpr;
                }
                if (e === b._return || e === b.name && this.exprAllowed) {
                    return E.test(this.input.slice(this.lastTokEnd, this.start));
                }
                if (e === b._else || e === b.semi || e === b.eof || e === b.parenR || e === b.arrow) {
                    return true;
                }
                if (e === b.braceL) {
                    return t === Se.b_stat;
                }
                if (e === b._var || e === b._const || e === b.name) {
                    return false;
                }
                return !this.exprAllowed;
            };
            De.inGeneratorContext = function() {
                var e = this;
                for (var t = this.context.length - 1; t >= 1; t--) {
                    var r = e.context[t];
                    if (r.token === "function") {
                        return r.generator;
                    }
                }
                return false;
            };
            De.updateContext = function(e) {
                var t, r = this.type;
                if (r.keyword && e === b.dot) {
                    this.exprAllowed = false;
                } else if (t = r.updateContext) {
                    t.call(this, e);
                } else {
                    this.exprAllowed = r.beforeExpr;
                }
            };
            b.parenR.updateContext = b.braceR.updateContext = function() {
                if (this.context.length === 1) {
                    this.exprAllowed = true;
                    return;
                }
                var e = this.context.pop();
                if (e === Se.b_stat && this.curContext().token === "function") {
                    e = this.context.pop();
                }
                this.exprAllowed = !e.isExpr;
            };
            b.braceL.updateContext = function(e) {
                this.context.push(this.braceIsBlock(e) ? Se.b_stat : Se.b_expr);
                this.exprAllowed = true;
            };
            b.dollarBraceL.updateContext = function() {
                this.context.push(Se.b_tmpl);
                this.exprAllowed = true;
            };
            b.parenL.updateContext = function(e) {
                var t = e === b._if || e === b._for || e === b._with || e === b._while;
                this.context.push(t ? Se.p_stat : Se.p_expr);
                this.exprAllowed = true;
            };
            b.incDec.updateContext = function() {};
            b._function.updateContext = b._class.updateContext = function(e) {
                if (e.beforeExpr && e !== b.semi && e !== b._else && !(e === b._return && E.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === b.colon || e === b.braceL) && this.curContext() === Se.b_stat)) {
                    this.context.push(Se.f_expr);
                } else {
                    this.context.push(Se.f_stat);
                }
                this.exprAllowed = false;
            };
            b.backQuote.updateContext = function() {
                if (this.curContext() === Se.q_tmpl) {
                    this.context.pop();
                } else {
                    this.context.push(Se.q_tmpl);
                }
                this.exprAllowed = false;
            };
            b.star.updateContext = function(e) {
                if (e === b._function) {
                    var t = this.context.length - 1;
                    if (this.context[t] === Se.f_expr) {
                        this.context[t] = Se.f_expr_gen;
                    } else {
                        this.context[t] = Se.f_gen;
                    }
                }
                this.exprAllowed = true;
            };
            b.name.updateContext = function(e) {
                var t = false;
                if (this.options.ecmaVersion >= 6 && e !== b.dot) {
                    if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
                        t = true;
                    }
                }
                this.exprAllowed = t;
            };
            var Ce = {
                $LONE: [ "ASCII", "ASCII_Hex_Digit", "AHex", "Alphabetic", "Alpha", "Any", "Assigned", "Bidi_Control", "Bidi_C", "Bidi_Mirrored", "Bidi_M", "Case_Ignorable", "CI", "Cased", "Changes_When_Casefolded", "CWCF", "Changes_When_Casemapped", "CWCM", "Changes_When_Lowercased", "CWL", "Changes_When_NFKC_Casefolded", "CWKCF", "Changes_When_Titlecased", "CWT", "Changes_When_Uppercased", "CWU", "Dash", "Default_Ignorable_Code_Point", "DI", "Deprecated", "Dep", "Diacritic", "Dia", "Emoji", "Emoji_Component", "Emoji_Modifier", "Emoji_Modifier_Base", "Emoji_Presentation", "Extender", "Ext", "Grapheme_Base", "Gr_Base", "Grapheme_Extend", "Gr_Ext", "Hex_Digit", "Hex", "IDS_Binary_Operator", "IDSB", "IDS_Trinary_Operator", "IDST", "ID_Continue", "IDC", "ID_Start", "IDS", "Ideographic", "Ideo", "Join_Control", "Join_C", "Logical_Order_Exception", "LOE", "Lowercase", "Lower", "Math", "Noncharacter_Code_Point", "NChar", "Pattern_Syntax", "Pat_Syn", "Pattern_White_Space", "Pat_WS", "Quotation_Mark", "QMark", "Radical", "Regional_Indicator", "RI", "Sentence_Terminal", "STerm", "Soft_Dotted", "SD", "Terminal_Punctuation", "Term", "Unified_Ideograph", "UIdeo", "Uppercase", "Upper", "Variation_Selector", "VS", "White_Space", "space", "XID_Continue", "XIDC", "XID_Start", "XIDS" ],
                General_Category: [ "Cased_Letter", "LC", "Close_Punctuation", "Pe", "Connector_Punctuation", "Pc", "Control", "Cc", "cntrl", "Currency_Symbol", "Sc", "Dash_Punctuation", "Pd", "Decimal_Number", "Nd", "digit", "Enclosing_Mark", "Me", "Final_Punctuation", "Pf", "Format", "Cf", "Initial_Punctuation", "Pi", "Letter", "L", "Letter_Number", "Nl", "Line_Separator", "Zl", "Lowercase_Letter", "Ll", "Mark", "M", "Combining_Mark", "Math_Symbol", "Sm", "Modifier_Letter", "Lm", "Modifier_Symbol", "Sk", "Nonspacing_Mark", "Mn", "Number", "N", "Open_Punctuation", "Ps", "Other", "C", "Other_Letter", "Lo", "Other_Number", "No", "Other_Punctuation", "Po", "Other_Symbol", "So", "Paragraph_Separator", "Zp", "Private_Use", "Co", "Punctuation", "P", "punct", "Separator", "Z", "Space_Separator", "Zs", "Spacing_Mark", "Mc", "Surrogate", "Cs", "Symbol", "S", "Titlecase_Letter", "Lt", "Unassigned", "Cn", "Uppercase_Letter", "Lu" ],
                Script: [ "Adlam", "Adlm", "Ahom", "Anatolian_Hieroglyphs", "Hluw", "Arabic", "Arab", "Armenian", "Armn", "Avestan", "Avst", "Balinese", "Bali", "Bamum", "Bamu", "Bassa_Vah", "Bass", "Batak", "Batk", "Bengali", "Beng", "Bhaiksuki", "Bhks", "Bopomofo", "Bopo", "Brahmi", "Brah", "Braille", "Brai", "Buginese", "Bugi", "Buhid", "Buhd", "Canadian_Aboriginal", "Cans", "Carian", "Cari", "Caucasian_Albanian", "Aghb", "Chakma", "Cakm", "Cham", "Cherokee", "Cher", "Common", "Zyyy", "Coptic", "Copt", "Qaac", "Cuneiform", "Xsux", "Cypriot", "Cprt", "Cyrillic", "Cyrl", "Deseret", "Dsrt", "Devanagari", "Deva", "Duployan", "Dupl", "Egyptian_Hieroglyphs", "Egyp", "Elbasan", "Elba", "Ethiopic", "Ethi", "Georgian", "Geor", "Glagolitic", "Glag", "Gothic", "Goth", "Grantha", "Gran", "Greek", "Grek", "Gujarati", "Gujr", "Gurmukhi", "Guru", "Han", "Hani", "Hangul", "Hang", "Hanunoo", "Hano", "Hatran", "Hatr", "Hebrew", "Hebr", "Hiragana", "Hira", "Imperial_Aramaic", "Armi", "Inherited", "Zinh", "Qaai", "Inscriptional_Pahlavi", "Phli", "Inscriptional_Parthian", "Prti", "Javanese", "Java", "Kaithi", "Kthi", "Kannada", "Knda", "Katakana", "Kana", "Kayah_Li", "Kali", "Kharoshthi", "Khar", "Khmer", "Khmr", "Khojki", "Khoj", "Khudawadi", "Sind", "Lao", "Laoo", "Latin", "Latn", "Lepcha", "Lepc", "Limbu", "Limb", "Linear_A", "Lina", "Linear_B", "Linb", "Lisu", "Lycian", "Lyci", "Lydian", "Lydi", "Mahajani", "Mahj", "Malayalam", "Mlym", "Mandaic", "Mand", "Manichaean", "Mani", "Marchen", "Marc", "Masaram_Gondi", "Gonm", "Meetei_Mayek", "Mtei", "Mende_Kikakui", "Mend", "Meroitic_Cursive", "Merc", "Meroitic_Hieroglyphs", "Mero", "Miao", "Plrd", "Modi", "Mongolian", "Mong", "Mro", "Mroo", "Multani", "Mult", "Myanmar", "Mymr", "Nabataean", "Nbat", "New_Tai_Lue", "Talu", "Newa", "Nko", "Nkoo", "Nushu", "Nshu", "Ogham", "Ogam", "Ol_Chiki", "Olck", "Old_Hungarian", "Hung", "Old_Italic", "Ital", "Old_North_Arabian", "Narb", "Old_Permic", "Perm", "Old_Persian", "Xpeo", "Old_South_Arabian", "Sarb", "Old_Turkic", "Orkh", "Oriya", "Orya", "Osage", "Osge", "Osmanya", "Osma", "Pahawh_Hmong", "Hmng", "Palmyrene", "Palm", "Pau_Cin_Hau", "Pauc", "Phags_Pa", "Phag", "Phoenician", "Phnx", "Psalter_Pahlavi", "Phlp", "Rejang", "Rjng", "Runic", "Runr", "Samaritan", "Samr", "Saurashtra", "Saur", "Sharada", "Shrd", "Shavian", "Shaw", "Siddham", "Sidd", "SignWriting", "Sgnw", "Sinhala", "Sinh", "Sora_Sompeng", "Sora", "Soyombo", "Soyo", "Sundanese", "Sund", "Syloti_Nagri", "Sylo", "Syriac", "Syrc", "Tagalog", "Tglg", "Tagbanwa", "Tagb", "Tai_Le", "Tale", "Tai_Tham", "Lana", "Tai_Viet", "Tavt", "Takri", "Takr", "Tamil", "Taml", "Tangut", "Tang", "Telugu", "Telu", "Thaana", "Thaa", "Thai", "Tibetan", "Tibt", "Tifinagh", "Tfng", "Tirhuta", "Tirh", "Ugaritic", "Ugar", "Vai", "Vaii", "Warang_Citi", "Wara", "Yi", "Yiii", "Zanabazar_Square", "Zanb" ]
            };
            Array.prototype.push.apply(Ce.$LONE, Ce.General_Category);
            Ce.gc = Ce.General_Category;
            Ce.sc = Ce.Script_Extensions = Ce.scx = Ce.Script;
            var Ae = ee.prototype;
            var ke = function e(t) {
                this.parser = t;
                this.validFlags = "gim" + (t.options.ecmaVersion >= 6 ? "uy" : "") + (t.options.ecmaVersion >= 9 ? "s" : "");
                this.source = "";
                this.flags = "";
                this.start = 0;
                this.switchU = false;
                this.switchN = false;
                this.pos = 0;
                this.lastIntValue = 0;
                this.lastStringValue = "";
                this.lastAssertionIsQuantifiable = false;
                this.numCapturingParens = 0;
                this.maxBackReference = 0;
                this.groupNames = [];
                this.backReferenceNames = [];
            };
            ke.prototype.reset = function e(t, r, i) {
                var n = i.indexOf("u") !== -1;
                this.start = t | 0;
                this.source = r + "";
                this.flags = i;
                this.switchU = n && this.parser.options.ecmaVersion >= 6;
                this.switchN = n && this.parser.options.ecmaVersion >= 9;
            };
            ke.prototype.raise = function e(t) {
                this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + t);
            };
            ke.prototype.at = function e(t) {
                var r = this.source;
                var i = r.length;
                if (t >= i) {
                    return -1;
                }
                var n = r.charCodeAt(t);
                if (!this.switchU || n <= 55295 || n >= 57344 || t + 1 >= i) {
                    return n;
                }
                return (n << 10) + r.charCodeAt(t + 1) - 56613888;
            };
            ke.prototype.nextIndex = function e(t) {
                var r = this.source;
                var i = r.length;
                if (t >= i) {
                    return i;
                }
                var n = r.charCodeAt(t);
                if (!this.switchU || n <= 55295 || n >= 57344 || t + 1 >= i) {
                    return t + 1;
                }
                return t + 2;
            };
            ke.prototype.current = function e() {
                return this.at(this.pos);
            };
            ke.prototype.lookahead = function e() {
                return this.at(this.nextIndex(this.pos));
            };
            ke.prototype.advance = function e() {
                this.pos = this.nextIndex(this.pos);
            };
            ke.prototype.eat = function e(t) {
                if (this.current() === t) {
                    this.advance();
                    return true;
                }
                return false;
            };
            function we(e) {
                if (e <= 65535) {
                    return String.fromCharCode(e);
                }
                e -= 65536;
                return String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320);
            }
            Ae.validateRegExpFlags = function(e) {
                var t = this;
                var r = e.validFlags;
                var i = e.flags;
                for (var n = 0; n < i.length; n++) {
                    var s = i.charAt(n);
                    if (r.indexOf(s) === -1) {
                        t.raise(e.start, "Invalid regular expression flag");
                    }
                    if (i.indexOf(s, n + 1) > -1) {
                        t.raise(e.start, "Duplicate regular expression flag");
                    }
                }
            };
            Ae.validateRegExpPattern = function(e) {
                this.regexp_pattern(e);
                if (!e.switchN && this.options.ecmaVersion >= 9 && e.groupNames.length > 0) {
                    e.switchN = true;
                    this.regexp_pattern(e);
                }
            };
            Ae.regexp_pattern = function(e) {
                e.pos = 0;
                e.lastIntValue = 0;
                e.lastStringValue = "";
                e.lastAssertionIsQuantifiable = false;
                e.numCapturingParens = 0;
                e.maxBackReference = 0;
                e.groupNames.length = 0;
                e.backReferenceNames.length = 0;
                this.regexp_disjunction(e);
                if (e.pos !== e.source.length) {
                    if (e.eat(41)) {
                        e.raise("Unmatched ')'");
                    }
                    if (e.eat(93) || e.eat(125)) {
                        e.raise("Lone quantifier brackets");
                    }
                }
                if (e.maxBackReference > e.numCapturingParens) {
                    e.raise("Invalid escape");
                }
                for (var t = 0, r = e.backReferenceNames; t < r.length; t += 1) {
                    var i = r[t];
                    if (e.groupNames.indexOf(i) === -1) {
                        e.raise("Invalid named capture referenced");
                    }
                }
            };
            Ae.regexp_disjunction = function(e) {
                var t = this;
                this.regexp_alternative(e);
                while (e.eat(124)) {
                    t.regexp_alternative(e);
                }
                if (this.regexp_eatQuantifier(e, true)) {
                    e.raise("Nothing to repeat");
                }
                if (e.eat(123)) {
                    e.raise("Lone quantifier brackets");
                }
            };
            Ae.regexp_alternative = function(e) {
                while (e.pos < e.source.length && this.regexp_eatTerm(e)) {}
            };
            Ae.regexp_eatTerm = function(e) {
                if (this.regexp_eatAssertion(e)) {
                    if (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e)) {
                        if (e.switchU) {
                            e.raise("Invalid quantifier");
                        }
                    }
                    return true;
                }
                if (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) {
                    this.regexp_eatQuantifier(e);
                    return true;
                }
                return false;
            };
            Ae.regexp_eatAssertion = function(e) {
                var t = e.pos;
                e.lastAssertionIsQuantifiable = false;
                if (e.eat(94) || e.eat(36)) {
                    return true;
                }
                if (e.eat(92)) {
                    if (e.eat(66) || e.eat(98)) {
                        return true;
                    }
                    e.pos = t;
                }
                if (e.eat(40) && e.eat(63)) {
                    var r = false;
                    if (this.options.ecmaVersion >= 9) {
                        r = e.eat(60);
                    }
                    if (e.eat(61) || e.eat(33)) {
                        this.regexp_disjunction(e);
                        if (!e.eat(41)) {
                            e.raise("Unterminated group");
                        }
                        e.lastAssertionIsQuantifiable = !r;
                        return true;
                    }
                }
                e.pos = t;
                return false;
            };
            Ae.regexp_eatQuantifier = function(e, t) {
                if (t === void 0) t = false;
                if (this.regexp_eatQuantifierPrefix(e, t)) {
                    e.eat(63);
                    return true;
                }
                return false;
            };
            Ae.regexp_eatQuantifierPrefix = function(e, t) {
                return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
            };
            Ae.regexp_eatBracedQuantifier = function(e, t) {
                var r = e.pos;
                if (e.eat(123)) {
                    var i = 0, n = -1;
                    if (this.regexp_eatDecimalDigits(e)) {
                        i = e.lastIntValue;
                        if (e.eat(44) && this.regexp_eatDecimalDigits(e)) {
                            n = e.lastIntValue;
                        }
                        if (e.eat(125)) {
                            if (n !== -1 && n < i && !t) {
                                e.raise("numbers out of order in {} quantifier");
                            }
                            return true;
                        }
                    }
                    if (e.switchU && !t) {
                        e.raise("Incomplete quantifier");
                    }
                    e.pos = r;
                }
                return false;
            };
            Ae.regexp_eatAtom = function(e) {
                return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
            };
            Ae.regexp_eatReverseSolidusAtomEscape = function(e) {
                var t = e.pos;
                if (e.eat(92)) {
                    if (this.regexp_eatAtomEscape(e)) {
                        return true;
                    }
                    e.pos = t;
                }
                return false;
            };
            Ae.regexp_eatUncapturingGroup = function(e) {
                var t = e.pos;
                if (e.eat(40)) {
                    if (e.eat(63) && e.eat(58)) {
                        this.regexp_disjunction(e);
                        if (e.eat(41)) {
                            return true;
                        }
                        e.raise("Unterminated group");
                    }
                    e.pos = t;
                }
                return false;
            };
            Ae.regexp_eatCapturingGroup = function(e) {
                if (e.eat(40)) {
                    if (this.options.ecmaVersion >= 9) {
                        this.regexp_groupSpecifier(e);
                    } else if (e.current() === 63) {
                        e.raise("Invalid group");
                    }
                    this.regexp_disjunction(e);
                    if (e.eat(41)) {
                        e.numCapturingParens += 1;
                        return true;
                    }
                    e.raise("Unterminated group");
                }
                return false;
            };
            Ae.regexp_eatExtendedAtom = function(e) {
                return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
            };
            Ae.regexp_eatInvalidBracedQuantifier = function(e) {
                if (this.regexp_eatBracedQuantifier(e, true)) {
                    e.raise("Nothing to repeat");
                }
                return false;
            };
            Ae.regexp_eatSyntaxCharacter = function(e) {
                var t = e.current();
                if (Te(t)) {
                    e.lastIntValue = t;
                    e.advance();
                    return true;
                }
                return false;
            };
            function Te(e) {
                return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
            }
            Ae.regexp_eatPatternCharacters = function(e) {
                var t = e.pos;
                var r = 0;
                while ((r = e.current()) !== -1 && !Te(r)) {
                    e.advance();
                }
                return e.pos !== t;
            };
            Ae.regexp_eatExtendedPatternCharacter = function(e) {
                var t = e.current();
                if (t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124) {
                    e.advance();
                    return true;
                }
                return false;
            };
            Ae.regexp_groupSpecifier = function(e) {
                if (e.eat(63)) {
                    if (this.regexp_eatGroupName(e)) {
                        if (e.groupNames.indexOf(e.lastStringValue) !== -1) {
                            e.raise("Duplicate capture group name");
                        }
                        e.groupNames.push(e.lastStringValue);
                        return;
                    }
                    e.raise("Invalid group");
                }
            };
            Ae.regexp_eatGroupName = function(e) {
                e.lastStringValue = "";
                if (e.eat(60)) {
                    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) {
                        return true;
                    }
                    e.raise("Invalid capture group name");
                }
                return false;
            };
            Ae.regexp_eatRegExpIdentifierName = function(e) {
                e.lastStringValue = "";
                if (this.regexp_eatRegExpIdentifierStart(e)) {
                    e.lastStringValue += we(e.lastIntValue);
                    while (this.regexp_eatRegExpIdentifierPart(e)) {
                        e.lastStringValue += we(e.lastIntValue);
                    }
                    return true;
                }
                return false;
            };
            Ae.regexp_eatRegExpIdentifierStart = function(e) {
                var t = e.pos;
                var r = e.current();
                e.advance();
                if (r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e)) {
                    r = e.lastIntValue;
                }
                if (Fe(r)) {
                    e.lastIntValue = r;
                    return true;
                }
                e.pos = t;
                return false;
            };
            function Fe(e) {
                return p(e, true) || e === 36 || e === 95;
            }
            Ae.regexp_eatRegExpIdentifierPart = function(e) {
                var t = e.pos;
                var r = e.current();
                e.advance();
                if (r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e)) {
                    r = e.lastIntValue;
                }
                if (Pe(r)) {
                    e.lastIntValue = r;
                    return true;
                }
                e.pos = t;
                return false;
            };
            function Pe(e) {
                return f(e, true) || e === 36 || e === 95 || e === 8204 || e === 8205;
            }
            Ae.regexp_eatAtomEscape = function(e) {
                if (this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e)) {
                    return true;
                }
                if (e.switchU) {
                    if (e.current() === 99) {
                        e.raise("Invalid unicode escape");
                    }
                    e.raise("Invalid escape");
                }
                return false;
            };
            Ae.regexp_eatBackReference = function(e) {
                var t = e.pos;
                if (this.regexp_eatDecimalEscape(e)) {
                    var r = e.lastIntValue;
                    if (e.switchU) {
                        if (r > e.maxBackReference) {
                            e.maxBackReference = r;
                        }
                        return true;
                    }
                    if (r <= e.numCapturingParens) {
                        return true;
                    }
                    e.pos = t;
                }
                return false;
            };
            Ae.regexp_eatKGroupName = function(e) {
                if (e.eat(107)) {
                    if (this.regexp_eatGroupName(e)) {
                        e.backReferenceNames.push(e.lastStringValue);
                        return true;
                    }
                    e.raise("Invalid named reference");
                }
                return false;
            };
            Ae.regexp_eatCharacterEscape = function(e) {
                return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
            };
            Ae.regexp_eatCControlLetter = function(e) {
                var t = e.pos;
                if (e.eat(99)) {
                    if (this.regexp_eatControlLetter(e)) {
                        return true;
                    }
                    e.pos = t;
                }
                return false;
            };
            Ae.regexp_eatZero = function(e) {
                if (e.current() === 48 && !Me(e.lookahead())) {
                    e.lastIntValue = 0;
                    e.advance();
                    return true;
                }
                return false;
            };
            Ae.regexp_eatControlEscape = function(e) {
                var t = e.current();
                if (t === 116) {
                    e.lastIntValue = 9;
                    e.advance();
                    return true;
                }
                if (t === 110) {
                    e.lastIntValue = 10;
                    e.advance();
                    return true;
                }
                if (t === 118) {
                    e.lastIntValue = 11;
                    e.advance();
                    return true;
                }
                if (t === 102) {
                    e.lastIntValue = 12;
                    e.advance();
                    return true;
                }
                if (t === 114) {
                    e.lastIntValue = 13;
                    e.advance();
                    return true;
                }
                return false;
            };
            Ae.regexp_eatControlLetter = function(e) {
                var t = e.current();
                if (Ne(t)) {
                    e.lastIntValue = t % 32;
                    e.advance();
                    return true;
                }
                return false;
            };
            function Ne(e) {
                return e >= 65 && e <= 90 || e >= 97 && e <= 122;
            }
            Ae.regexp_eatRegExpUnicodeEscapeSequence = function(e) {
                var t = e.pos;
                if (e.eat(117)) {
                    if (this.regexp_eatFixedHexDigits(e, 4)) {
                        var r = e.lastIntValue;
                        if (e.switchU && r >= 55296 && r <= 56319) {
                            var i = e.pos;
                            if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
                                var n = e.lastIntValue;
                                if (n >= 56320 && n <= 57343) {
                                    e.lastIntValue = (r - 55296) * 1024 + (n - 56320) + 65536;
                                    return true;
                                }
                            }
                            e.pos = i;
                            e.lastIntValue = r;
                        }
                        return true;
                    }
                    if (e.switchU && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && Ie(e.lastIntValue)) {
                        return true;
                    }
                    if (e.switchU) {
                        e.raise("Invalid unicode escape");
                    }
                    e.pos = t;
                }
                return false;
            };
            function Ie(e) {
                return e >= 0 && e <= 1114111;
            }
            Ae.regexp_eatIdentityEscape = function(e) {
                if (e.switchU) {
                    if (this.regexp_eatSyntaxCharacter(e)) {
                        return true;
                    }
                    if (e.eat(47)) {
                        e.lastIntValue = 47;
                        return true;
                    }
                    return false;
                }
                var t = e.current();
                if (t !== 99 && (!e.switchN || t !== 107)) {
                    e.lastIntValue = t;
                    e.advance();
                    return true;
                }
                return false;
            };
            Ae.regexp_eatDecimalEscape = function(e) {
                e.lastIntValue = 0;
                var t = e.current();
                if (t >= 49 && t <= 57) {
                    do {
                        e.lastIntValue = 10 * e.lastIntValue + (t - 48);
                        e.advance();
                    } while ((t = e.current()) >= 48 && t <= 57);
                    return true;
                }
                return false;
            };
            Ae.regexp_eatCharacterClassEscape = function(e) {
                var t = e.current();
                if (_e(t)) {
                    e.lastIntValue = -1;
                    e.advance();
                    return true;
                }
                if (e.switchU && this.options.ecmaVersion >= 9 && (t === 80 || t === 112)) {
                    e.lastIntValue = -1;
                    e.advance();
                    if (e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125)) {
                        return true;
                    }
                    e.raise("Invalid property name");
                }
                return false;
            };
            function _e(e) {
                return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
            }
            Ae.regexp_eatUnicodePropertyValueExpression = function(e) {
                var t = e.pos;
                if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
                    var r = e.lastStringValue;
                    if (this.regexp_eatUnicodePropertyValue(e)) {
                        var i = e.lastStringValue;
                        this.regexp_validateUnicodePropertyNameAndValue(e, r, i);
                        return true;
                    }
                }
                e.pos = t;
                if (this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
                    var n = e.lastStringValue;
                    this.regexp_validateUnicodePropertyNameOrValue(e, n);
                    return true;
                }
                return false;
            };
            Ae.regexp_validateUnicodePropertyNameAndValue = function(e, t, r) {
                if (!Ce.hasOwnProperty(t) || Ce[t].indexOf(r) === -1) {
                    e.raise("Invalid property name");
                }
            };
            Ae.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
                if (Ce.$LONE.indexOf(t) === -1) {
                    e.raise("Invalid property name");
                }
            };
            Ae.regexp_eatUnicodePropertyName = function(e) {
                var t = 0;
                e.lastStringValue = "";
                while (Be(t = e.current())) {
                    e.lastStringValue += we(t);
                    e.advance();
                }
                return e.lastStringValue !== "";
            };
            function Be(e) {
                return Ne(e) || e === 95;
            }
            Ae.regexp_eatUnicodePropertyValue = function(e) {
                var t = 0;
                e.lastStringValue = "";
                while (Le(t = e.current())) {
                    e.lastStringValue += we(t);
                    e.advance();
                }
                return e.lastStringValue !== "";
            };
            function Le(e) {
                return Be(e) || Me(e);
            }
            Ae.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
                return this.regexp_eatUnicodePropertyValue(e);
            };
            Ae.regexp_eatCharacterClass = function(e) {
                if (e.eat(91)) {
                    e.eat(94);
                    this.regexp_classRanges(e);
                    if (e.eat(93)) {
                        return true;
                    }
                    e.raise("Unterminated character class");
                }
                return false;
            };
            Ae.regexp_classRanges = function(e) {
                var t = this;
                while (this.regexp_eatClassAtom(e)) {
                    var r = e.lastIntValue;
                    if (e.eat(45) && t.regexp_eatClassAtom(e)) {
                        var i = e.lastIntValue;
                        if (e.switchU && (r === -1 || i === -1)) {
                            e.raise("Invalid character class");
                        }
                        if (r !== -1 && i !== -1 && r > i) {
                            e.raise("Range out of order in character class");
                        }
                    }
                }
            };
            Ae.regexp_eatClassAtom = function(e) {
                var t = e.pos;
                if (e.eat(92)) {
                    if (this.regexp_eatClassEscape(e)) {
                        return true;
                    }
                    if (e.switchU) {
                        var r = e.current();
                        if (r === 99 || Re(r)) {
                            e.raise("Invalid class escape");
                        }
                        e.raise("Invalid escape");
                    }
                    e.pos = t;
                }
                var i = e.current();
                if (i !== 93) {
                    e.lastIntValue = i;
                    e.advance();
                    return true;
                }
                return false;
            };
            Ae.regexp_eatClassEscape = function(e) {
                var t = e.pos;
                if (e.eat(98)) {
                    e.lastIntValue = 8;
                    return true;
                }
                if (e.switchU && e.eat(45)) {
                    e.lastIntValue = 45;
                    return true;
                }
                if (!e.switchU && e.eat(99)) {
                    if (this.regexp_eatClassControlLetter(e)) {
                        return true;
                    }
                    e.pos = t;
                }
                return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
            };
            Ae.regexp_eatClassControlLetter = function(e) {
                var t = e.current();
                if (Me(t) || t === 95) {
                    e.lastIntValue = t % 32;
                    e.advance();
                    return true;
                }
                return false;
            };
            Ae.regexp_eatHexEscapeSequence = function(e) {
                var t = e.pos;
                if (e.eat(120)) {
                    if (this.regexp_eatFixedHexDigits(e, 2)) {
                        return true;
                    }
                    if (e.switchU) {
                        e.raise("Invalid escape");
                    }
                    e.pos = t;
                }
                return false;
            };
            Ae.regexp_eatDecimalDigits = function(e) {
                var t = e.pos;
                var r = 0;
                e.lastIntValue = 0;
                while (Me(r = e.current())) {
                    e.lastIntValue = 10 * e.lastIntValue + (r - 48);
                    e.advance();
                }
                return e.pos !== t;
            };
            function Me(e) {
                return e >= 48 && e <= 57;
            }
            Ae.regexp_eatHexDigits = function(e) {
                var t = e.pos;
                var r = 0;
                e.lastIntValue = 0;
                while (Oe(r = e.current())) {
                    e.lastIntValue = 16 * e.lastIntValue + je(r);
                    e.advance();
                }
                return e.pos !== t;
            };
            function Oe(e) {
                return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
            }
            function je(e) {
                if (e >= 65 && e <= 70) {
                    return 10 + (e - 65);
                }
                if (e >= 97 && e <= 102) {
                    return 10 + (e - 97);
                }
                return e - 48;
            }
            Ae.regexp_eatLegacyOctalEscapeSequence = function(e) {
                if (this.regexp_eatOctalDigit(e)) {
                    var t = e.lastIntValue;
                    if (this.regexp_eatOctalDigit(e)) {
                        var r = e.lastIntValue;
                        if (t <= 3 && this.regexp_eatOctalDigit(e)) {
                            e.lastIntValue = t * 64 + r * 8 + e.lastIntValue;
                        } else {
                            e.lastIntValue = t * 8 + r;
                        }
                    } else {
                        e.lastIntValue = t;
                    }
                    return true;
                }
                return false;
            };
            Ae.regexp_eatOctalDigit = function(e) {
                var t = e.current();
                if (Re(t)) {
                    e.lastIntValue = t - 48;
                    e.advance();
                    return true;
                }
                e.lastIntValue = 0;
                return false;
            };
            function Re(e) {
                return e >= 48 && e <= 55;
            }
            Ae.regexp_eatFixedHexDigits = function(e, t) {
                var r = e.pos;
                e.lastIntValue = 0;
                for (var i = 0; i < t; ++i) {
                    var n = e.current();
                    if (!Oe(n)) {
                        e.pos = r;
                        return false;
                    }
                    e.lastIntValue = 16 * e.lastIntValue + je(n);
                    e.advance();
                }
                return true;
            };
            var Xe = function e(t) {
                this.type = t.type;
                this.value = t.value;
                this.start = t.start;
                this.end = t.end;
                if (t.options.locations) {
                    this.loc = new I(t, t.startLoc, t.endLoc);
                }
                if (t.options.ranges) {
                    this.range = [ t.start, t.end ];
                }
            };
            var Ve = ee.prototype;
            Ve.next = function() {
                if (this.options.onToken) {
                    this.options.onToken(new Xe(this));
                }
                this.lastTokEnd = this.end;
                this.lastTokStart = this.start;
                this.lastTokEndLoc = this.endLoc;
                this.lastTokStartLoc = this.startLoc;
                this.nextToken();
            };
            Ve.getToken = function() {
                this.next();
                return new Xe(this);
            };
            if (typeof Symbol !== "undefined") {
                Ve[Symbol.iterator] = function() {
                    var e = this;
                    return {
                        next: function t() {
                            var r = e.getToken();
                            return {
                                done: r.type === b.eof,
                                value: r
                            };
                        }
                    };
                };
            }
            Ve.curContext = function() {
                return this.context[this.context.length - 1];
            };
            Ve.nextToken = function() {
                var e = this.curContext();
                if (!e || !e.preserveSpace) {
                    this.skipSpace();
                }
                this.start = this.pos;
                if (this.options.locations) {
                    this.startLoc = this.curPosition();
                }
                if (this.pos >= this.input.length) {
                    return this.finishToken(b.eof);
                }
                if (e.override) {
                    return e.override(this);
                } else {
                    this.readToken(this.fullCharCodeAtPos());
                }
            };
            Ve.readToken = function(e) {
                if (p(e, this.options.ecmaVersion >= 6) || e === 92) {
                    return this.readWord();
                }
                return this.getTokenFromCode(e);
            };
            Ve.fullCharCodeAtPos = function() {
                var e = this.input.charCodeAt(this.pos);
                if (e <= 55295 || e >= 57344) {
                    return e;
                }
                var t = this.input.charCodeAt(this.pos + 1);
                return (e << 10) + t - 56613888;
            };
            Ve.skipBlockComment = function() {
                var e = this;
                var t = this.options.onComment && this.curPosition();
                var r = this.pos, i = this.input.indexOf("*/", this.pos += 2);
                if (i === -1) {
                    this.raise(this.pos - 2, "Unterminated comment");
                }
                this.pos = i + 2;
                if (this.options.locations) {
                    S.lastIndex = r;
                    var n;
                    while ((n = S.exec(this.input)) && n.index < this.pos) {
                        ++e.curLine;
                        e.lineStart = n.index + n[0].length;
                    }
                }
                if (this.options.onComment) {
                    this.options.onComment(true, this.input.slice(r + 2, i), r, this.pos, t, this.curPosition());
                }
            };
            Ve.skipLineComment = function(e) {
                var t = this;
                var r = this.pos;
                var i = this.options.onComment && this.curPosition();
                var n = this.input.charCodeAt(this.pos += e);
                while (this.pos < this.input.length && !D(n)) {
                    n = t.input.charCodeAt(++t.pos);
                }
                if (this.options.onComment) {
                    this.options.onComment(false, this.input.slice(r + e, this.pos), r, this.pos, i, this.curPosition());
                }
            };
            Ve.skipSpace = function() {
                var e = this;
                e: while (this.pos < this.input.length) {
                    var t = e.input.charCodeAt(e.pos);
                    switch (t) {
                      case 32:
                      case 160:
                        ++e.pos;
                        break;

                      case 13:
                        if (e.input.charCodeAt(e.pos + 1) === 10) {
                            ++e.pos;
                        }

                      case 10:
                      case 8232:
                      case 8233:
                        ++e.pos;
                        if (e.options.locations) {
                            ++e.curLine;
                            e.lineStart = e.pos;
                        }
                        break;

                      case 47:
                        switch (e.input.charCodeAt(e.pos + 1)) {
                          case 42:
                            e.skipBlockComment();
                            break;

                          case 47:
                            e.skipLineComment(2);
                            break;

                          default:
                            break e;
                        }
                        break;

                      default:
                        if (t > 8 && t < 14 || t >= 5760 && C.test(String.fromCharCode(t))) {
                            ++e.pos;
                        } else {
                            break e;
                        }
                    }
                }
            };
            Ve.finishToken = function(e, t) {
                this.end = this.pos;
                if (this.options.locations) {
                    this.endLoc = this.curPosition();
                }
                var r = this.type;
                this.type = e;
                this.value = t;
                this.updateContext(r);
            };
            Ve.readToken_dot = function() {
                var e = this.input.charCodeAt(this.pos + 1);
                if (e >= 48 && e <= 57) {
                    return this.readNumber(true);
                }
                var t = this.input.charCodeAt(this.pos + 2);
                if (this.options.ecmaVersion >= 6 && e === 46 && t === 46) {
                    this.pos += 3;
                    return this.finishToken(b.ellipsis);
                } else {
                    ++this.pos;
                    return this.finishToken(b.dot);
                }
            };
            Ve.readToken_slash = function() {
                var e = this.input.charCodeAt(this.pos + 1);
                if (this.exprAllowed) {
                    ++this.pos;
                    return this.readRegexp();
                }
                if (e === 61) {
                    return this.finishOp(b.assign, 2);
                }
                return this.finishOp(b.slash, 1);
            };
            Ve.readToken_mult_modulo_exp = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                var r = 1;
                var i = e === 42 ? b.star : b.modulo;
                if (this.options.ecmaVersion >= 7 && e === 42 && t === 42) {
                    ++r;
                    i = b.starstar;
                    t = this.input.charCodeAt(this.pos + 2);
                }
                if (t === 61) {
                    return this.finishOp(b.assign, r + 1);
                }
                return this.finishOp(i, r);
            };
            Ve.readToken_pipe_amp = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                if (t === e) {
                    return this.finishOp(e === 124 ? b.logicalOR : b.logicalAND, 2);
                }
                if (t === 61) {
                    return this.finishOp(b.assign, 2);
                }
                return this.finishOp(e === 124 ? b.bitwiseOR : b.bitwiseAND, 1);
            };
            Ve.readToken_caret = function() {
                var e = this.input.charCodeAt(this.pos + 1);
                if (e === 61) {
                    return this.finishOp(b.assign, 2);
                }
                return this.finishOp(b.bitwiseXOR, 1);
            };
            Ve.readToken_plus_min = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                if (t === e) {
                    if (t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || E.test(this.input.slice(this.lastTokEnd, this.pos)))) {
                        this.skipLineComment(3);
                        this.skipSpace();
                        return this.nextToken();
                    }
                    return this.finishOp(b.incDec, 2);
                }
                if (t === 61) {
                    return this.finishOp(b.assign, 2);
                }
                return this.finishOp(b.plusMin, 1);
            };
            Ve.readToken_lt_gt = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                var r = 1;
                if (t === e) {
                    r = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
                    if (this.input.charCodeAt(this.pos + r) === 61) {
                        return this.finishOp(b.assign, r + 1);
                    }
                    return this.finishOp(b.bitShift, r);
                }
                if (t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
                    this.skipLineComment(4);
                    this.skipSpace();
                    return this.nextToken();
                }
                if (t === 61) {
                    r = 2;
                }
                return this.finishOp(b.relational, r);
            };
            Ve.readToken_eq_excl = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                if (t === 61) {
                    return this.finishOp(b.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
                }
                if (e === 61 && t === 62 && this.options.ecmaVersion >= 6) {
                    this.pos += 2;
                    return this.finishToken(b.arrow);
                }
                return this.finishOp(e === 61 ? b.eq : b.prefix, 1);
            };
            Ve.getTokenFromCode = function(e) {
                switch (e) {
                  case 46:
                    return this.readToken_dot();

                  case 40:
                    ++this.pos;
                    return this.finishToken(b.parenL);

                  case 41:
                    ++this.pos;
                    return this.finishToken(b.parenR);

                  case 59:
                    ++this.pos;
                    return this.finishToken(b.semi);

                  case 44:
                    ++this.pos;
                    return this.finishToken(b.comma);

                  case 91:
                    ++this.pos;
                    return this.finishToken(b.bracketL);

                  case 93:
                    ++this.pos;
                    return this.finishToken(b.bracketR);

                  case 123:
                    ++this.pos;
                    return this.finishToken(b.braceL);

                  case 125:
                    ++this.pos;
                    return this.finishToken(b.braceR);

                  case 58:
                    ++this.pos;
                    return this.finishToken(b.colon);

                  case 63:
                    ++this.pos;
                    return this.finishToken(b.question);

                  case 96:
                    if (this.options.ecmaVersion < 6) {
                        break;
                    }
                    ++this.pos;
                    return this.finishToken(b.backQuote);

                  case 48:
                    var t = this.input.charCodeAt(this.pos + 1);
                    if (t === 120 || t === 88) {
                        return this.readRadixNumber(16);
                    }
                    if (this.options.ecmaVersion >= 6) {
                        if (t === 111 || t === 79) {
                            return this.readRadixNumber(8);
                        }
                        if (t === 98 || t === 66) {
                            return this.readRadixNumber(2);
                        }
                    }

                  case 49:
                  case 50:
                  case 51:
                  case 52:
                  case 53:
                  case 54:
                  case 55:
                  case 56:
                  case 57:
                    return this.readNumber(false);

                  case 34:
                  case 39:
                    return this.readString(e);

                  case 47:
                    return this.readToken_slash();

                  case 37:
                  case 42:
                    return this.readToken_mult_modulo_exp(e);

                  case 124:
                  case 38:
                    return this.readToken_pipe_amp(e);

                  case 94:
                    return this.readToken_caret();

                  case 43:
                  case 45:
                    return this.readToken_plus_min(e);

                  case 60:
                  case 62:
                    return this.readToken_lt_gt(e);

                  case 61:
                  case 33:
                    return this.readToken_eq_excl(e);

                  case 126:
                    return this.finishOp(b.prefix, 1);
                }
                this.raise(this.pos, "Unexpected character '" + Ue(e) + "'");
            };
            Ve.finishOp = function(e, t) {
                var r = this.input.slice(this.pos, this.pos + t);
                this.pos += t;
                return this.finishToken(e, r);
            };
            Ve.readRegexp = function() {
                var e = this;
                var t, r, i = this.pos;
                for (;;) {
                    if (e.pos >= e.input.length) {
                        e.raise(i, "Unterminated regular expression");
                    }
                    var n = e.input.charAt(e.pos);
                    if (E.test(n)) {
                        e.raise(i, "Unterminated regular expression");
                    }
                    if (!t) {
                        if (n === "[") {
                            r = true;
                        } else if (n === "]" && r) {
                            r = false;
                        } else if (n === "/" && !r) {
                            break;
                        }
                        t = n === "\\";
                    } else {
                        t = false;
                    }
                    ++e.pos;
                }
                var s = this.input.slice(i, this.pos);
                ++this.pos;
                var a = this.pos;
                var o = this.readWord1();
                if (this.containsEsc) {
                    this.unexpected(a);
                }
                var u = this.regexpState || (this.regexpState = new ke(this));
                u.reset(i, s, o);
                this.validateRegExpFlags(u);
                this.validateRegExpPattern(u);
                var l = null;
                try {
                    l = new RegExp(s, o);
                } catch (e) {}
                return this.finishToken(b.regexp, {
                    pattern: s,
                    flags: o,
                    value: l
                });
            };
            Ve.readInt = function(e, t) {
                var r = this;
                var i = this.pos, n = 0;
                for (var s = 0, a = t == null ? Infinity : t; s < a; ++s) {
                    var o = r.input.charCodeAt(r.pos), u = void 0;
                    if (o >= 97) {
                        u = o - 97 + 10;
                    } else if (o >= 65) {
                        u = o - 65 + 10;
                    } else if (o >= 48 && o <= 57) {
                        u = o - 48;
                    } else {
                        u = Infinity;
                    }
                    if (u >= e) {
                        break;
                    }
                    ++r.pos;
                    n = n * e + u;
                }
                if (this.pos === i || t != null && this.pos - i !== t) {
                    return null;
                }
                return n;
            };
            Ve.readRadixNumber = function(e) {
                this.pos += 2;
                var t = this.readInt(e);
                if (t == null) {
                    this.raise(this.start + 2, "Expected number in radix " + e);
                }
                if (p(this.fullCharCodeAtPos())) {
                    this.raise(this.pos, "Identifier directly after number");
                }
                return this.finishToken(b.num, t);
            };
            Ve.readNumber = function(e) {
                var t = this.pos;
                if (!e && this.readInt(10) === null) {
                    this.raise(t, "Invalid number");
                }
                var r = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
                if (r && this.strict) {
                    this.raise(t, "Invalid number");
                }
                if (r && /[89]/.test(this.input.slice(t, this.pos))) {
                    r = false;
                }
                var i = this.input.charCodeAt(this.pos);
                if (i === 46 && !r) {
                    ++this.pos;
                    this.readInt(10);
                    i = this.input.charCodeAt(this.pos);
                }
                if ((i === 69 || i === 101) && !r) {
                    i = this.input.charCodeAt(++this.pos);
                    if (i === 43 || i === 45) {
                        ++this.pos;
                    }
                    if (this.readInt(10) === null) {
                        this.raise(t, "Invalid number");
                    }
                }
                if (p(this.fullCharCodeAtPos())) {
                    this.raise(this.pos, "Identifier directly after number");
                }
                var n = this.input.slice(t, this.pos);
                var s = r ? parseInt(n, 8) : parseFloat(n);
                return this.finishToken(b.num, s);
            };
            Ve.readCodePoint = function() {
                var e = this.input.charCodeAt(this.pos), t;
                if (e === 123) {
                    if (this.options.ecmaVersion < 6) {
                        this.unexpected();
                    }
                    var r = ++this.pos;
                    t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
                    ++this.pos;
                    if (t > 1114111) {
                        this.invalidStringToken(r, "Code point out of bounds");
                    }
                } else {
                    t = this.readHexChar(4);
                }
                return t;
            };
            function Ue(e) {
                if (e <= 65535) {
                    return String.fromCharCode(e);
                }
                e -= 65536;
                return String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320);
            }
            Ve.readString = function(e) {
                var t = this;
                var r = "", i = ++this.pos;
                for (;;) {
                    if (t.pos >= t.input.length) {
                        t.raise(t.start, "Unterminated string constant");
                    }
                    var n = t.input.charCodeAt(t.pos);
                    if (n === e) {
                        break;
                    }
                    if (n === 92) {
                        r += t.input.slice(i, t.pos);
                        r += t.readEscapedChar(false);
                        i = t.pos;
                    } else {
                        if (D(n, t.options.ecmaVersion >= 10)) {
                            t.raise(t.start, "Unterminated string constant");
                        }
                        ++t.pos;
                    }
                }
                r += this.input.slice(i, this.pos++);
                return this.finishToken(b.string, r);
            };
            var Je = {};
            Ve.tryReadTemplateToken = function() {
                this.inTemplateElement = true;
                try {
                    this.readTmplToken();
                } catch (e) {
                    if (e === Je) {
                        this.readInvalidTemplateToken();
                    } else {
                        throw e;
                    }
                }
                this.inTemplateElement = false;
            };
            Ve.invalidStringToken = function(e, t) {
                if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
                    throw Je;
                } else {
                    this.raise(e, t);
                }
            };
            Ve.readTmplToken = function() {
                var e = this;
                var t = "", r = this.pos;
                for (;;) {
                    if (e.pos >= e.input.length) {
                        e.raise(e.start, "Unterminated template");
                    }
                    var i = e.input.charCodeAt(e.pos);
                    if (i === 96 || i === 36 && e.input.charCodeAt(e.pos + 1) === 123) {
                        if (e.pos === e.start && (e.type === b.template || e.type === b.invalidTemplate)) {
                            if (i === 36) {
                                e.pos += 2;
                                return e.finishToken(b.dollarBraceL);
                            } else {
                                ++e.pos;
                                return e.finishToken(b.backQuote);
                            }
                        }
                        t += e.input.slice(r, e.pos);
                        return e.finishToken(b.template, t);
                    }
                    if (i === 92) {
                        t += e.input.slice(r, e.pos);
                        t += e.readEscapedChar(true);
                        r = e.pos;
                    } else if (D(i)) {
                        t += e.input.slice(r, e.pos);
                        ++e.pos;
                        switch (i) {
                          case 13:
                            if (e.input.charCodeAt(e.pos) === 10) {
                                ++e.pos;
                            }

                          case 10:
                            t += "\n";
                            break;

                          default:
                            t += String.fromCharCode(i);
                            break;
                        }
                        if (e.options.locations) {
                            ++e.curLine;
                            e.lineStart = e.pos;
                        }
                        r = e.pos;
                    } else {
                        ++e.pos;
                    }
                }
            };
            Ve.readInvalidTemplateToken = function() {
                var e = this;
                for (;this.pos < this.input.length; this.pos++) {
                    switch (e.input[e.pos]) {
                      case "\\":
                        ++e.pos;
                        break;

                      case "$":
                        if (e.input[e.pos + 1] !== "{") {
                            break;
                        }

                      case "`":
                        return e.finishToken(b.invalidTemplate, e.input.slice(e.start, e.pos));
                    }
                }
                this.raise(this.start, "Unterminated template");
            };
            Ve.readEscapedChar = function(e) {
                var t = this.input.charCodeAt(++this.pos);
                ++this.pos;
                switch (t) {
                  case 110:
                    return "\n";

                  case 114:
                    return "\r";

                  case 120:
                    return String.fromCharCode(this.readHexChar(2));

                  case 117:
                    return Ue(this.readCodePoint());

                  case 116:
                    return "\t";

                  case 98:
                    return "\b";

                  case 118:
                    return "\v";

                  case 102:
                    return "\f";

                  case 13:
                    if (this.input.charCodeAt(this.pos) === 10) {
                        ++this.pos;
                    }

                  case 10:
                    if (this.options.locations) {
                        this.lineStart = this.pos;
                        ++this.curLine;
                    }
                    return "";

                  default:
                    if (t >= 48 && t <= 55) {
                        var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
                        var i = parseInt(r, 8);
                        if (i > 255) {
                            r = r.slice(0, -1);
                            i = parseInt(r, 8);
                        }
                        this.pos += r.length - 1;
                        t = this.input.charCodeAt(this.pos);
                        if ((r !== "0" || t === 56 || t === 57) && (this.strict || e)) {
                            this.invalidStringToken(this.pos - 1 - r.length, e ? "Octal literal in template string" : "Octal literal in strict mode");
                        }
                        return String.fromCharCode(i);
                    }
                    return String.fromCharCode(t);
                }
            };
            Ve.readHexChar = function(e) {
                var t = this.pos;
                var r = this.readInt(16, e);
                if (r === null) {
                    this.invalidStringToken(t, "Bad character escape sequence");
                }
                return r;
            };
            Ve.readWord1 = function() {
                var e = this;
                this.containsEsc = false;
                var t = "", r = true, i = this.pos;
                var n = this.options.ecmaVersion >= 6;
                while (this.pos < this.input.length) {
                    var s = e.fullCharCodeAtPos();
                    if (f(s, n)) {
                        e.pos += s <= 65535 ? 1 : 2;
                    } else if (s === 92) {
                        e.containsEsc = true;
                        t += e.input.slice(i, e.pos);
                        var a = e.pos;
                        if (e.input.charCodeAt(++e.pos) !== 117) {
                            e.invalidStringToken(e.pos, "Expecting Unicode escape sequence \\uXXXX");
                        }
                        ++e.pos;
                        var o = e.readCodePoint();
                        if (!(r ? p : f)(o, n)) {
                            e.invalidStringToken(a, "Invalid Unicode escape");
                        }
                        t += Ue(o);
                        i = e.pos;
                    } else {
                        break;
                    }
                    r = false;
                }
                return t + this.input.slice(i, this.pos);
            };
            Ve.readWord = function() {
                var e = this.readWord1();
                var t = b.name;
                if (this.keywords.test(e)) {
                    if (this.containsEsc) {
                        this.raiseRecoverable(this.start, "Escape sequence in keyword " + e);
                    }
                    t = x[e];
                }
                return this.finishToken(t, e);
            };
            var ze = "6.0.5";
            function qe(e, t) {
                return ee.parse(e, t);
            }
            function We(e, t, r) {
                return ee.parseExpressionAt(e, t, r);
            }
            function Ke(e, t) {
                return ee.tokenizer(e, t);
            }
            e.version = ze;
            e.parse = qe;
            e.parseExpressionAt = We;
            e.tokenizer = Ke;
            e.Parser = ee;
            e.defaultOptions = B;
            e.Position = N;
            e.SourceLocation = I;
            e.getLineInfo = _;
            e.Node = xe;
            e.TokenType = d;
            e.tokTypes = b;
            e.keywordTypes = x;
            e.TokContext = Ee;
            e.tokContexts = Se;
            e.isIdentifierChar = f;
            e.isIdentifierStart = p;
            e.Token = Xe;
            e.isNewLine = D;
            e.lineBreak = E;
            e.lineBreakG = S;
            e.nonASCIIwhitespace = C;
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        });
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(13));
            var t = e.use(r(2));
            var i = e.use(r(4)).defaults;
            var n = t.Type.def;
            var s = t.Type.or;
            n("Noop").bases("Statement").build();
            n("DoExpression").bases("Expression").build("body").field("body", [ n("Statement") ]);
            n("Super").bases("Expression").build();
            n("BindExpression").bases("Expression").build("object", "callee").field("object", s(n("Expression"), null)).field("callee", n("Expression"));
            n("Decorator").bases("Node").build("expression").field("expression", n("Expression"));
            n("Property").field("decorators", s([ n("Decorator") ], null), i["null"]);
            n("MethodDefinition").field("decorators", s([ n("Decorator") ], null), i["null"]);
            n("MetaProperty").bases("Expression").build("meta", "property").field("meta", n("Identifier")).field("property", n("Identifier"));
            n("ParenthesizedExpression").bases("Expression").build("expression").field("expression", n("Expression"));
            n("ImportSpecifier").bases("ModuleSpecifier").build("imported", "local").field("imported", n("Identifier"));
            n("ImportDefaultSpecifier").bases("ModuleSpecifier").build("local");
            n("ImportNamespaceSpecifier").bases("ModuleSpecifier").build("local");
            n("ExportDefaultDeclaration").bases("Declaration").build("declaration").field("declaration", s(n("Declaration"), n("Expression")));
            n("ExportNamedDeclaration").bases("Declaration").build("declaration", "specifiers", "source").field("declaration", s(n("Declaration"), null)).field("specifiers", [ n("ExportSpecifier") ], i.emptyArray).field("source", s(n("Literal"), null), i["null"]);
            n("ExportSpecifier").bases("ModuleSpecifier").build("local", "exported").field("exported", n("Identifier"));
            n("ExportNamespaceSpecifier").bases("Specifier").build("exported").field("exported", n("Identifier"));
            n("ExportDefaultSpecifier").bases("Specifier").build("exported").field("exported", n("Identifier"));
            n("ExportAllDeclaration").bases("Declaration").build("exported", "source").field("exported", s(n("Identifier"), null)).field("source", n("Literal"));
            n("CommentBlock").bases("Comment").build("value", "leading", "trailing");
            n("CommentLine").bases("Comment").build("value", "leading", "trailing");
            n("Directive").bases("Node").build("value").field("value", n("DirectiveLiteral"));
            n("DirectiveLiteral").bases("Node", "Expression").build("value").field("value", String, i["use strict"]);
            n("BlockStatement").bases("Statement").build("body").field("body", [ n("Statement") ]).field("directives", [ n("Directive") ], i.emptyArray);
            n("Program").bases("Node").build("body").field("body", [ n("Statement") ]).field("directives", [ n("Directive") ], i.emptyArray);
            n("StringLiteral").bases("Literal").build("value").field("value", String);
            n("NumericLiteral").bases("Literal").build("value").field("value", Number).field("raw", s(String, null), i["null"]).field("extra", {
                rawValue: Number,
                raw: String
            }, function e() {
                return {
                    rawValue: this.value,
                    raw: this.value + ""
                };
            });
            n("BigIntLiteral").bases("Literal").build("value").field("value", s(String, Number)).field("extra", {
                rawValue: String,
                raw: String
            }, function e() {
                return {
                    rawValue: String(this.value),
                    raw: this.value + "n"
                };
            });
            n("NullLiteral").bases("Literal").build().field("value", null, i["null"]);
            n("BooleanLiteral").bases("Literal").build("value").field("value", Boolean);
            n("RegExpLiteral").bases("Literal").build("pattern", "flags").field("pattern", String).field("flags", String).field("value", RegExp, function() {
                return new RegExp(this.pattern, this.flags);
            });
            var a = s(n("Property"), n("ObjectMethod"), n("ObjectProperty"), n("SpreadProperty"), n("SpreadElement"));
            n("ObjectExpression").bases("Expression").build("properties").field("properties", [ a ]);
            n("ObjectMethod").bases("Node", "Function").build("kind", "key", "params", "body", "computed").field("kind", s("method", "get", "set")).field("key", s(n("Literal"), n("Identifier"), n("Expression"))).field("params", [ n("Pattern") ]).field("body", n("BlockStatement")).field("computed", Boolean, i["false"]).field("generator", Boolean, i["false"]).field("async", Boolean, i["false"]).field("accessibility", s(n("Literal"), null), i["null"]).field("decorators", s([ n("Decorator") ], null), i["null"]);
            n("ObjectProperty").bases("Node").build("key", "value").field("key", s(n("Literal"), n("Identifier"), n("Expression"))).field("value", s(n("Expression"), n("Pattern"))).field("accessibility", s(n("Literal"), null), i["null"]).field("computed", Boolean, i["false"]);
            var o = s(n("MethodDefinition"), n("VariableDeclarator"), n("ClassPropertyDefinition"), n("ClassProperty"), n("ClassMethod"));
            n("ClassBody").bases("Declaration").build("body").field("body", [ o ]);
            n("ClassMethod").bases("Declaration", "Function").build("kind", "key", "params", "body", "computed", "static").field("kind", s("get", "set", "method", "constructor")).field("key", s(n("Literal"), n("Identifier"), n("Expression"))).field("params", [ n("Pattern") ]).field("body", n("BlockStatement")).field("computed", Boolean, i["false"]).field("static", Boolean, i["false"]).field("generator", Boolean, i["false"]).field("async", Boolean, i["false"]).field("decorators", s([ n("Decorator") ], null), i["null"]);
            var u = s(n("Property"), n("PropertyPattern"), n("SpreadPropertyPattern"), n("SpreadProperty"), n("ObjectProperty"), n("RestProperty"));
            n("ObjectPattern").bases("Pattern").build("properties").field("properties", [ u ]).field("decorators", s([ n("Decorator") ], null), i["null"]);
            n("SpreadProperty").bases("Node").build("argument").field("argument", n("Expression"));
            n("RestProperty").bases("Node").build("argument").field("argument", n("Expression"));
            n("ForAwaitStatement").bases("Statement").build("left", "right", "body").field("left", s(n("VariableDeclaration"), n("Expression"))).field("right", n("Expression")).field("body", n("Statement"));
            n("Import").bases("Expression").build();
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(12));
            var t = e.use(r(2));
            var i = t.Type.def;
            var n = t.Type.or;
            var s = e.use(r(4)).defaults;
            i("Function").field("generator", Boolean, s["false"]).field("expression", Boolean, s["false"]).field("defaults", [ n(i("Expression"), null) ], s.emptyArray).field("rest", n(i("Identifier"), null), s["null"]);
            i("RestElement").bases("Pattern").build("argument").field("argument", i("Pattern")).field("typeAnnotation", n(i("TypeAnnotation"), i("TSTypeAnnotation"), null), s["null"]);
            i("SpreadElementPattern").bases("Pattern").build("argument").field("argument", i("Pattern"));
            i("FunctionDeclaration").build("id", "params", "body", "generator", "expression");
            i("FunctionExpression").build("id", "params", "body", "generator", "expression");
            i("ArrowFunctionExpression").bases("Function", "Expression").build("params", "body", "expression").field("id", null, s["null"]).field("body", n(i("BlockStatement"), i("Expression"))).field("generator", false, s["false"]);
            i("ForOfStatement").bases("Statement").build("left", "right", "body").field("left", n(i("VariableDeclaration"), i("Pattern"))).field("right", i("Expression")).field("body", i("Statement"));
            i("YieldExpression").bases("Expression").build("argument", "delegate").field("argument", n(i("Expression"), null)).field("delegate", Boolean, s["false"]);
            i("GeneratorExpression").bases("Expression").build("body", "blocks", "filter").field("body", i("Expression")).field("blocks", [ i("ComprehensionBlock") ]).field("filter", n(i("Expression"), null));
            i("ComprehensionExpression").bases("Expression").build("body", "blocks", "filter").field("body", i("Expression")).field("blocks", [ i("ComprehensionBlock") ]).field("filter", n(i("Expression"), null));
            i("ComprehensionBlock").bases("Node").build("left", "right", "each").field("left", i("Pattern")).field("right", i("Expression")).field("each", Boolean);
            i("Property").field("key", n(i("Literal"), i("Identifier"), i("Expression"))).field("value", n(i("Expression"), i("Pattern"))).field("method", Boolean, s["false"]).field("shorthand", Boolean, s["false"]).field("computed", Boolean, s["false"]);
            i("PropertyPattern").bases("Pattern").build("key", "pattern").field("key", n(i("Literal"), i("Identifier"), i("Expression"))).field("pattern", i("Pattern")).field("computed", Boolean, s["false"]);
            i("ObjectPattern").bases("Pattern").build("properties").field("properties", [ n(i("PropertyPattern"), i("Property")) ]);
            i("ArrayPattern").bases("Pattern").build("elements").field("elements", [ n(i("Pattern"), null) ]);
            i("MethodDefinition").bases("Declaration").build("kind", "key", "value", "static").field("kind", n("constructor", "method", "get", "set")).field("key", i("Expression")).field("value", i("Function")).field("computed", Boolean, s["false"]).field("static", Boolean, s["false"]);
            i("SpreadElement").bases("Node").build("argument").field("argument", i("Expression"));
            i("ArrayExpression").field("elements", [ n(i("Expression"), i("SpreadElement"), i("RestElement"), null) ]);
            i("NewExpression").field("arguments", [ n(i("Expression"), i("SpreadElement")) ]);
            i("CallExpression").field("arguments", [ n(i("Expression"), i("SpreadElement")) ]);
            i("AssignmentPattern").bases("Pattern").build("left", "right").field("left", i("Pattern")).field("right", i("Expression"));
            var a = n(i("MethodDefinition"), i("VariableDeclarator"), i("ClassPropertyDefinition"), i("ClassProperty"));
            i("ClassProperty").bases("Declaration").build("key").field("key", n(i("Literal"), i("Identifier"), i("Expression"))).field("computed", Boolean, s["false"]);
            i("ClassPropertyDefinition").bases("Declaration").build("definition").field("definition", a);
            i("ClassBody").bases("Declaration").build("body").field("body", [ a ]);
            i("ClassDeclaration").bases("Declaration").build("id", "body", "superClass").field("id", n(i("Identifier"), null)).field("body", i("ClassBody")).field("superClass", n(i("Expression"), null), s["null"]);
            i("ClassExpression").bases("Expression").build("id", "body", "superClass").field("id", n(i("Identifier"), null), s["null"]).field("body", i("ClassBody")).field("superClass", n(i("Expression"), null), s["null"]);
            i("Specifier").bases("Node");
            i("ModuleSpecifier").bases("Specifier").field("local", n(i("Identifier"), null), s["null"]).field("id", n(i("Identifier"), null), s["null"]).field("name", n(i("Identifier"), null), s["null"]);
            i("ImportSpecifier").bases("ModuleSpecifier").build("id", "name");
            i("ImportNamespaceSpecifier").bases("ModuleSpecifier").build("id");
            i("ImportDefaultSpecifier").bases("ModuleSpecifier").build("id");
            i("ImportDeclaration").bases("Declaration").build("specifiers", "source", "importKind").field("specifiers", [ n(i("ImportSpecifier"), i("ImportNamespaceSpecifier"), i("ImportDefaultSpecifier")) ], s.emptyArray).field("source", i("Literal")).field("importKind", n("value", "type"), function() {
                return "value";
            });
            i("TaggedTemplateExpression").bases("Expression").build("tag", "quasi").field("tag", i("Expression")).field("quasi", i("TemplateLiteral"));
            i("TemplateLiteral").bases("Expression").build("quasis", "expressions").field("quasis", [ i("TemplateElement") ]).field("expressions", [ i("Expression") ]);
            i("TemplateElement").bases("Node").build("value", "tail").field("value", {
                cooked: String,
                raw: String
            }).field("tail", Boolean);
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(13));
            var t = e.use(r(2));
            var i = t.Type.def;
            var n = t.Type.or;
            var s = e.use(r(4)).defaults;
            i("Flow").bases("Node");
            i("FlowType").bases("Flow");
            i("AnyTypeAnnotation").bases("FlowType").build();
            i("EmptyTypeAnnotation").bases("FlowType").build();
            i("MixedTypeAnnotation").bases("FlowType").build();
            i("VoidTypeAnnotation").bases("FlowType").build();
            i("NumberTypeAnnotation").bases("FlowType").build();
            i("NumberLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Number).field("raw", String);
            i("NumericLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Number).field("raw", String);
            i("StringTypeAnnotation").bases("FlowType").build();
            i("StringLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", String).field("raw", String);
            i("BooleanTypeAnnotation").bases("FlowType").build();
            i("BooleanLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Boolean).field("raw", String);
            i("TypeAnnotation").bases("Node").build("typeAnnotation").field("typeAnnotation", i("FlowType"));
            i("NullableTypeAnnotation").bases("FlowType").build("typeAnnotation").field("typeAnnotation", i("FlowType"));
            i("NullLiteralTypeAnnotation").bases("FlowType").build();
            i("NullTypeAnnotation").bases("FlowType").build();
            i("ThisTypeAnnotation").bases("FlowType").build();
            i("ExistsTypeAnnotation").bases("FlowType").build();
            i("ExistentialTypeParam").bases("FlowType").build();
            i("FunctionTypeAnnotation").bases("FlowType").build("params", "returnType", "rest", "typeParameters").field("params", [ i("FunctionTypeParam") ]).field("returnType", i("FlowType")).field("rest", n(i("FunctionTypeParam"), null)).field("typeParameters", n(i("TypeParameterDeclaration"), null));
            i("FunctionTypeParam").bases("Node").build("name", "typeAnnotation", "optional").field("name", i("Identifier")).field("typeAnnotation", i("FlowType")).field("optional", Boolean);
            i("ArrayTypeAnnotation").bases("FlowType").build("elementType").field("elementType", i("FlowType"));
            i("ObjectTypeAnnotation").bases("FlowType").build("properties", "indexers", "callProperties").field("properties", [ n(i("ObjectTypeProperty"), i("ObjectTypeSpreadProperty")) ]).field("indexers", [ i("ObjectTypeIndexer") ], s.emptyArray).field("callProperties", [ i("ObjectTypeCallProperty") ], s.emptyArray).field("exact", Boolean, s["false"]);
            i("Variance").bases("Node").build("kind").field("kind", n("plus", "minus"));
            var a = n(i("Variance"), "plus", "minus", null);
            i("ObjectTypeProperty").bases("Node").build("key", "value", "optional").field("key", n(i("Literal"), i("Identifier"))).field("value", i("FlowType")).field("optional", Boolean).field("variance", a, s["null"]);
            i("ObjectTypeIndexer").bases("Node").build("id", "key", "value").field("id", i("Identifier")).field("key", i("FlowType")).field("value", i("FlowType")).field("variance", a, s["null"]);
            i("ObjectTypeCallProperty").bases("Node").build("value").field("value", i("FunctionTypeAnnotation")).field("static", Boolean, s["false"]);
            i("QualifiedTypeIdentifier").bases("Node").build("qualification", "id").field("qualification", n(i("Identifier"), i("QualifiedTypeIdentifier"))).field("id", i("Identifier"));
            i("GenericTypeAnnotation").bases("FlowType").build("id", "typeParameters").field("id", n(i("Identifier"), i("QualifiedTypeIdentifier"))).field("typeParameters", n(i("TypeParameterInstantiation"), null));
            i("MemberTypeAnnotation").bases("FlowType").build("object", "property").field("object", i("Identifier")).field("property", n(i("MemberTypeAnnotation"), i("GenericTypeAnnotation")));
            i("UnionTypeAnnotation").bases("FlowType").build("types").field("types", [ i("FlowType") ]);
            i("IntersectionTypeAnnotation").bases("FlowType").build("types").field("types", [ i("FlowType") ]);
            i("TypeofTypeAnnotation").bases("FlowType").build("argument").field("argument", i("FlowType"));
            i("ObjectTypeSpreadProperty").bases("Node").build("argument").field("argument", i("FlowType"));
            i("Identifier").field("typeAnnotation", n(i("TypeAnnotation"), null), s["null"]);
            i("ObjectPattern").field("typeAnnotation", n(i("TypeAnnotation"), null), s["null"]);
            i("TypeParameterDeclaration").bases("Node").build("params").field("params", [ i("TypeParameter") ]);
            i("TypeParameterInstantiation").bases("Node").build("params").field("params", [ i("FlowType") ]);
            i("TypeParameter").bases("FlowType").build("name", "variance", "bound").field("name", String).field("variance", a, s["null"]).field("bound", n(i("TypeAnnotation"), null), s["null"]);
            i("Function").field("returnType", n(i("TypeAnnotation"), null), s["null"]).field("typeParameters", n(i("TypeParameterDeclaration"), null), s["null"]);
            i("ClassProperty").build("key", "value", "typeAnnotation", "static").field("value", n(i("Expression"), null)).field("typeAnnotation", n(i("TypeAnnotation"), null)).field("static", Boolean, s["false"]).field("variance", a, s["null"]);
            [ "ClassDeclaration", "ClassExpression" ].forEach(function(e) {
                i(e).field("typeParameters", n(i("TypeParameterDeclaration"), null), s["null"]).field("superTypeParameters", n([ i("GenericTypeAnnotation") ], null), s["null"]);
            });
            i("ClassImplements").bases("Node").build("id").field("id", i("Identifier")).field("superClass", n(i("Expression"), null), s["null"]).field("typeParameters", n(i("TypeParameterInstantiation"), null), s["null"]);
            [ "ClassDeclaration", "ClassExpression" ].forEach(function(e) {
                i(e).field("implements", [ i("ClassImplements") ], s.emptyArray);
            });
            i("InterfaceDeclaration").bases("Declaration").build("id", "body", "extends").field("id", i("Identifier")).field("typeParameters", n(i("TypeParameterDeclaration"), null), s["null"]).field("body", i("ObjectTypeAnnotation")).field("extends", [ i("InterfaceExtends") ]);
            i("DeclareInterface").bases("InterfaceDeclaration").build("id", "body", "extends");
            i("InterfaceExtends").bases("Node").build("id").field("id", i("Identifier")).field("typeParameters", n(i("TypeParameterInstantiation"), null));
            i("TypeAlias").bases("Declaration").build("id", "typeParameters", "right").field("id", i("Identifier")).field("typeParameters", n(i("TypeParameterDeclaration"), null)).field("right", i("FlowType"));
            i("OpaqueType").bases("Declaration").build("id", "typeParameters", "impltype", "supertype").field("id", i("Identifier")).field("typeParameters", n(i("TypeParameterDeclaration"), null)).field("implType", i("FlowType")).field("superType", i("FlowType"));
            i("DeclareTypeAlias").bases("TypeAlias").build("id", "typeParameters", "right");
            i("DeclareOpaqueType").bases("TypeAlias").build("id", "typeParameters", "supertype");
            i("TypeCastExpression").bases("Expression").build("expression", "typeAnnotation").field("expression", i("Expression")).field("typeAnnotation", i("TypeAnnotation"));
            i("TupleTypeAnnotation").bases("FlowType").build("types").field("types", [ i("FlowType") ]);
            i("DeclareVariable").bases("Statement").build("id").field("id", i("Identifier"));
            i("DeclareFunction").bases("Statement").build("id").field("id", i("Identifier"));
            i("DeclareClass").bases("InterfaceDeclaration").build("id");
            i("DeclareModule").bases("Statement").build("id", "body").field("id", n(i("Identifier"), i("Literal"))).field("body", i("BlockStatement"));
            i("DeclareModuleExports").bases("Statement").build("typeAnnotation").field("typeAnnotation", i("TypeAnnotation"));
            i("DeclareExportDeclaration").bases("Declaration").build("default", "declaration", "specifiers", "source").field("default", Boolean).field("declaration", n(i("DeclareVariable"), i("DeclareFunction"), i("DeclareClass"), i("FlowType"), null)).field("specifiers", [ n(i("ExportSpecifier"), i("ExportBatchSpecifier")) ], s.emptyArray).field("source", n(i("Literal"), null), s["null"]);
            i("DeclareExportAllDeclaration").bases("Declaration").build("source").field("source", n(i("Literal"), null), s["null"]);
            i("FlowPredicate").bases("Flow");
            i("InferredPredicate").bases("FlowPredicate").build();
            i("DeclaredPredicate").bases("FlowPredicate").build("value").field("value", i("Expression"));
        };
    }, function(e, t, r) {
        "use strict";
        var i = Array.prototype;
        var n = i.slice;
        var s = i.map;
        var a = Object.prototype;
        var o = a.hasOwnProperty;
        e.exports = function(e) {
            var t = e.use(r(2));
            var i = t.builtInTypes.array;
            var n = t.builtInTypes.number;
            function s(e, t, r) {
                if (!(this instanceof s)) {
                    throw new Error("Path constructor cannot be invoked without 'new'");
                }
                if (t) {
                    if (!(t instanceof s)) {
                        throw new Error("");
                    }
                } else {
                    t = null;
                    r = null;
                }
                this.value = e;
                this.parentPath = t;
                this.name = r;
                this.__childCache = null;
            }
            var a = s.prototype;
            function u(e) {
                return e.__childCache || (e.__childCache = Object.create(null));
            }
            function l(e, t) {
                var r = u(e);
                var i = e.getValueProperty(t);
                var n = r[t];
                if (!o.call(r, t) || n.value !== i) {
                    n = r[t] = new e.constructor(i, e, t);
                }
                return n;
            }
            a.getValueProperty = function e(t) {
                return this.value[t];
            };
            a.get = function e(t) {
                var r = this;
                var i = arguments;
                var n = i.length;
                for (var s = 0; s < n; ++s) {
                    r = l(r, i[s]);
                }
                return r;
            };
            a.each = function e(t, r) {
                var i = [];
                var n = this.value.length;
                var s = 0;
                for (var s = 0; s < n; ++s) {
                    if (o.call(this.value, s)) {
                        i[s] = this.get(s);
                    }
                }
                r = r || this;
                for (s = 0; s < n; ++s) {
                    if (o.call(i, s)) {
                        t.call(r, i[s]);
                    }
                }
            };
            a.map = function e(t, r) {
                var i = [];
                this.each(function(e) {
                    i.push(t.call(this, e));
                }, r);
                return i;
            };
            a.filter = function e(t, r) {
                var i = [];
                this.each(function(e) {
                    if (t.call(this, e)) {
                        i.push(e);
                    }
                }, r);
                return i;
            };
            function c() {}
            function h(e, t, r, s) {
                i.assert(e.value);
                if (t === 0) {
                    return c;
                }
                var a = e.value.length;
                if (a < 1) {
                    return c;
                }
                var l = arguments.length;
                if (l === 2) {
                    r = 0;
                    s = a;
                } else if (l === 3) {
                    r = Math.max(r, 0);
                    s = a;
                } else {
                    r = Math.max(r, 0);
                    s = Math.min(s, a);
                }
                n.assert(r);
                n.assert(s);
                var h = Object.create(null);
                var p = u(e);
                for (var f = r; f < s; ++f) {
                    if (o.call(e.value, f)) {
                        var d = e.get(f);
                        if (d.name !== f) {
                            throw new Error("");
                        }
                        var m = f + t;
                        d.name = m;
                        h[m] = d;
                        delete p[f];
                    }
                }
                delete p.length;
                return function() {
                    for (var t in h) {
                        var r = h[t];
                        if (r.name !== +t) {
                            throw new Error("");
                        }
                        p[t] = r;
                        e.value[t] = r.value;
                    }
                };
            }
            a.shift = function e() {
                var t = h(this, -1);
                var r = this.value.shift();
                t();
                return r;
            };
            a.unshift = function e(t) {
                var r = h(this, arguments.length);
                var i = this.value.unshift.apply(this.value, arguments);
                r();
                return i;
            };
            a.push = function e(t) {
                i.assert(this.value);
                delete u(this).length;
                return this.value.push.apply(this.value, arguments);
            };
            a.pop = function e() {
                i.assert(this.value);
                var t = u(this);
                delete t[this.value.length - 1];
                delete t.length;
                return this.value.pop();
            };
            a.insertAt = function e(t, r) {
                var i = arguments.length;
                var n = h(this, i - 1, t);
                if (n === c) {
                    return this;
                }
                t = Math.max(t, 0);
                for (var s = 1; s < i; ++s) {
                    this.value[t + s - 1] = arguments[s];
                }
                n();
                return this;
            };
            a.insertBefore = function e(t) {
                var r = this.parentPath;
                var i = arguments.length;
                var n = [ this.name ];
                for (var s = 0; s < i; ++s) {
                    n.push(arguments[s]);
                }
                return r.insertAt.apply(r, n);
            };
            a.insertAfter = function e(t) {
                var r = this.parentPath;
                var i = arguments.length;
                var n = [ this.name + 1 ];
                for (var s = 0; s < i; ++s) {
                    n.push(arguments[s]);
                }
                return r.insertAt.apply(r, n);
            };
            function p(e) {
                if (!(e instanceof s)) {
                    throw new Error("");
                }
                var t = e.parentPath;
                if (!t) {
                    return e;
                }
                var r = t.value;
                var n = u(t);
                if (r[e.name] === e.value) {
                    n[e.name] = e;
                } else if (i.check(r)) {
                    var a = r.indexOf(e.value);
                    if (a >= 0) {
                        n[e.name = a] = e;
                    }
                } else {
                    r[e.name] = e.value;
                    n[e.name] = e;
                }
                if (r[e.name] !== e.value) {
                    throw new Error("");
                }
                if (e.parentPath.get(e.name) !== e) {
                    throw new Error("");
                }
                return e;
            }
            a.replace = function e(t) {
                var r = [];
                var n = this.parentPath.value;
                var s = u(this.parentPath);
                var a = arguments.length;
                p(this);
                if (i.check(n)) {
                    var o = n.length;
                    var l = h(this.parentPath, a - 1, this.name + 1);
                    var c = [ this.name, 1 ];
                    for (var f = 0; f < a; ++f) {
                        c.push(arguments[f]);
                    }
                    var d = n.splice.apply(n, c);
                    if (d[0] !== this.value) {
                        throw new Error("");
                    }
                    if (n.length !== o - 1 + a) {
                        throw new Error("");
                    }
                    l();
                    if (a === 0) {
                        delete this.value;
                        delete s[this.name];
                        this.__childCache = null;
                    } else {
                        if (n[this.name] !== t) {
                            throw new Error("");
                        }
                        if (this.value !== t) {
                            this.value = t;
                            this.__childCache = null;
                        }
                        for (f = 0; f < a; ++f) {
                            r.push(this.parentPath.get(this.name + f));
                        }
                        if (r[0] !== this) {
                            throw new Error("");
                        }
                    }
                } else if (a === 1) {
                    if (this.value !== t) {
                        this.__childCache = null;
                    }
                    this.value = n[this.name] = t;
                    r.push(this);
                } else if (a === 0) {
                    delete n[this.name];
                    delete this.value;
                    this.__childCache = null;
                } else {
                    throw new Error("Could not replace path");
                }
                return r;
            };
            return s;
        };
    }, function(e, t, r) {
        var i, n, s;
        (function(e) {
            "use strict";
            var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
                return typeof e;
            } : function(e) {
                return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            };
            (function a(o, u) {
                if ((false ? "undefined" : r(t)) === "object" && (false ? "undefined" : r(e)) === "object") e.exports = u(); else if (true) !(n = [], 
                i = u, s = typeof i === "function" ? i.apply(t, n) : i, s !== undefined && (e.exports = s)); else if ((typeof t === "undefined" ? "undefined" : r(t)) === "object") t["esprima"] = u(); else o["esprima"] = u();
            })(undefined, function() {
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
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var i = r(1);
                    var n = r(3);
                    var s = r(8);
                    var a = r(15);
                    function o(e, t, r) {
                        var a = null;
                        var o = function e(t, i) {
                            if (r) {
                                r(t, i);
                            }
                            if (a) {
                                a.visit(t, i);
                            }
                        };
                        var u = typeof r === "function" ? o : null;
                        var l = false;
                        if (t) {
                            l = typeof t.comment === "boolean" && t.comment;
                            var c = typeof t.attachComment === "boolean" && t.attachComment;
                            if (l || c) {
                                a = new i.CommentHandler();
                                a.attach = c;
                                t.comment = true;
                                u = o;
                            }
                        }
                        var h = false;
                        if (t && typeof t.sourceType === "string") {
                            h = t.sourceType === "module";
                        }
                        var p;
                        if (t && typeof t.jsx === "boolean" && t.jsx) {
                            p = new n.JSXParser(e, t, u);
                        } else {
                            p = new s.Parser(e, t, u);
                        }
                        var f = h ? p.parseModule() : p.parseScript();
                        var d = f;
                        if (l && a) {
                            d.comments = a.comments;
                        }
                        if (p.config.tokens) {
                            d.tokens = p.tokens;
                        }
                        if (p.config.tolerant) {
                            d.errors = p.errorHandler.errors;
                        }
                        return d;
                    }
                    t.parse = o;
                    function u(e, t, r) {
                        var i = t || {};
                        i.sourceType = "module";
                        return o(e, i, r);
                    }
                    t.parseModule = u;
                    function l(e, t, r) {
                        var i = t || {};
                        i.sourceType = "script";
                        return o(e, i, r);
                    }
                    t.parseScript = l;
                    function c(e, t, r) {
                        var i = new a.Tokenizer(e, t);
                        var n;
                        n = [];
                        try {
                            while (true) {
                                var s = i.getNextToken();
                                if (!s) {
                                    break;
                                }
                                if (r) {
                                    s = r(s);
                                }
                                n.push(s);
                            }
                        } catch (e) {
                            i.errorHandler.tolerate(e);
                        }
                        if (i.errorHandler.tolerant) {
                            n.errors = i.errors();
                        }
                        return n;
                    }
                    t.tokenize = c;
                    var h = r(2);
                    t.Syntax = h.Syntax;
                    t.version = "4.0.1";
                }, function(e, t, r) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var i = r(2);
                    var n = function() {
                        function e() {
                            this.attach = false;
                            this.comments = [];
                            this.stack = [];
                            this.leading = [];
                            this.trailing = [];
                        }
                        e.prototype.insertInnerComments = function(e, t) {
                            if (e.type === i.Syntax.BlockStatement && e.body.length === 0) {
                                var r = [];
                                for (var n = this.leading.length - 1; n >= 0; --n) {
                                    var s = this.leading[n];
                                    if (t.end.offset >= s.start) {
                                        r.unshift(s.comment);
                                        this.leading.splice(n, 1);
                                        this.trailing.splice(n, 1);
                                    }
                                }
                                if (r.length) {
                                    e.innerComments = r;
                                }
                            }
                        };
                        e.prototype.findTrailingComments = function(e) {
                            var t = [];
                            if (this.trailing.length > 0) {
                                for (var r = this.trailing.length - 1; r >= 0; --r) {
                                    var i = this.trailing[r];
                                    if (i.start >= e.end.offset) {
                                        t.unshift(i.comment);
                                    }
                                }
                                this.trailing.length = 0;
                                return t;
                            }
                            var n = this.stack[this.stack.length - 1];
                            if (n && n.node.trailingComments) {
                                var s = n.node.trailingComments[0];
                                if (s && s.range[0] >= e.end.offset) {
                                    t = n.node.trailingComments;
                                    delete n.node.trailingComments;
                                }
                            }
                            return t;
                        };
                        e.prototype.findLeadingComments = function(e) {
                            var t = [];
                            var r;
                            while (this.stack.length > 0) {
                                var i = this.stack[this.stack.length - 1];
                                if (i && i.start >= e.start.offset) {
                                    r = i.node;
                                    this.stack.pop();
                                } else {
                                    break;
                                }
                            }
                            if (r) {
                                var n = r.leadingComments ? r.leadingComments.length : 0;
                                for (var s = n - 1; s >= 0; --s) {
                                    var a = r.leadingComments[s];
                                    if (a.range[1] <= e.start.offset) {
                                        t.unshift(a);
                                        r.leadingComments.splice(s, 1);
                                    }
                                }
                                if (r.leadingComments && r.leadingComments.length === 0) {
                                    delete r.leadingComments;
                                }
                                return t;
                            }
                            for (var s = this.leading.length - 1; s >= 0; --s) {
                                var i = this.leading[s];
                                if (i.start <= e.start.offset) {
                                    t.unshift(i.comment);
                                    this.leading.splice(s, 1);
                                }
                            }
                            return t;
                        };
                        e.prototype.visitNode = function(e, t) {
                            if (e.type === i.Syntax.Program && e.body.length > 0) {
                                return;
                            }
                            this.insertInnerComments(e, t);
                            var r = this.findTrailingComments(t);
                            var n = this.findLeadingComments(t);
                            if (n.length > 0) {
                                e.leadingComments = n;
                            }
                            if (r.length > 0) {
                                e.trailingComments = r;
                            }
                            this.stack.push({
                                node: e,
                                start: t.start.offset
                            });
                        };
                        e.prototype.visitComment = function(e, t) {
                            var r = e.type[0] === "L" ? "Line" : "Block";
                            var i = {
                                type: r,
                                value: e.value
                            };
                            if (e.range) {
                                i.range = e.range;
                            }
                            if (e.loc) {
                                i.loc = e.loc;
                            }
                            this.comments.push(i);
                            if (this.attach) {
                                var n = {
                                    comment: {
                                        type: r,
                                        value: e.value,
                                        range: [ t.start.offset, t.end.offset ]
                                    },
                                    start: t.start.offset
                                };
                                if (e.loc) {
                                    n.comment.loc = e.loc;
                                }
                                e.type = r;
                                this.leading.push(n);
                                this.trailing.push(n);
                            }
                        };
                        e.prototype.visit = function(e, t) {
                            if (e.type === "LineComment") {
                                this.visitComment(e, t);
                            } else if (e.type === "BlockComment") {
                                this.visitComment(e, t);
                            } else if (this.attach) {
                                this.visitNode(e, t);
                            }
                        };
                        return e;
                    }();
                    t.CommentHandler = n;
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    t.Syntax = {
                        AssignmentExpression: "AssignmentExpression",
                        AssignmentPattern: "AssignmentPattern",
                        ArrayExpression: "ArrayExpression",
                        ArrayPattern: "ArrayPattern",
                        ArrowFunctionExpression: "ArrowFunctionExpression",
                        AwaitExpression: "AwaitExpression",
                        BlockStatement: "BlockStatement",
                        BinaryExpression: "BinaryExpression",
                        BreakStatement: "BreakStatement",
                        CallExpression: "CallExpression",
                        CatchClause: "CatchClause",
                        ClassBody: "ClassBody",
                        ClassDeclaration: "ClassDeclaration",
                        ClassExpression: "ClassExpression",
                        ConditionalExpression: "ConditionalExpression",
                        ContinueStatement: "ContinueStatement",
                        DoWhileStatement: "DoWhileStatement",
                        DebuggerStatement: "DebuggerStatement",
                        EmptyStatement: "EmptyStatement",
                        ExportAllDeclaration: "ExportAllDeclaration",
                        ExportDefaultDeclaration: "ExportDefaultDeclaration",
                        ExportNamedDeclaration: "ExportNamedDeclaration",
                        ExportSpecifier: "ExportSpecifier",
                        ExpressionStatement: "ExpressionStatement",
                        ForStatement: "ForStatement",
                        ForOfStatement: "ForOfStatement",
                        ForInStatement: "ForInStatement",
                        FunctionDeclaration: "FunctionDeclaration",
                        FunctionExpression: "FunctionExpression",
                        Identifier: "Identifier",
                        IfStatement: "IfStatement",
                        ImportDeclaration: "ImportDeclaration",
                        ImportDefaultSpecifier: "ImportDefaultSpecifier",
                        ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
                        ImportSpecifier: "ImportSpecifier",
                        Literal: "Literal",
                        LabeledStatement: "LabeledStatement",
                        LogicalExpression: "LogicalExpression",
                        MemberExpression: "MemberExpression",
                        MetaProperty: "MetaProperty",
                        MethodDefinition: "MethodDefinition",
                        NewExpression: "NewExpression",
                        ObjectExpression: "ObjectExpression",
                        ObjectPattern: "ObjectPattern",
                        Program: "Program",
                        Property: "Property",
                        RestElement: "RestElement",
                        ReturnStatement: "ReturnStatement",
                        SequenceExpression: "SequenceExpression",
                        SpreadElement: "SpreadElement",
                        Super: "Super",
                        SwitchCase: "SwitchCase",
                        SwitchStatement: "SwitchStatement",
                        TaggedTemplateExpression: "TaggedTemplateExpression",
                        TemplateElement: "TemplateElement",
                        TemplateLiteral: "TemplateLiteral",
                        ThisExpression: "ThisExpression",
                        ThrowStatement: "ThrowStatement",
                        TryStatement: "TryStatement",
                        UnaryExpression: "UnaryExpression",
                        UpdateExpression: "UpdateExpression",
                        VariableDeclaration: "VariableDeclaration",
                        VariableDeclarator: "VariableDeclarator",
                        WhileStatement: "WhileStatement",
                        WithStatement: "WithStatement",
                        YieldExpression: "YieldExpression"
                    };
                }, function(e, t, r) {
                    "use strict";
                    var i = this && this.__extends || function() {
                        var e = Object.setPrototypeOf || {
                            __proto__: []
                        } instanceof Array && function(e, t) {
                            e.__proto__ = t;
                        } || function(e, t) {
                            for (var r in t) {
                                if (t.hasOwnProperty(r)) e[r] = t[r];
                            }
                        };
                        return function(t, r) {
                            e(t, r);
                            function i() {
                                this.constructor = t;
                            }
                            t.prototype = r === null ? Object.create(r) : (i.prototype = r.prototype, new i());
                        };
                    }();
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var n = r(4);
                    var s = r(5);
                    var a = r(6);
                    var o = r(7);
                    var u = r(8);
                    var l = r(13);
                    var c = r(14);
                    l.TokenName[100] = "JSXIdentifier";
                    l.TokenName[101] = "JSXText";
                    function h(e) {
                        var t;
                        switch (e.type) {
                          case a.JSXSyntax.JSXIdentifier:
                            var r = e;
                            t = r.name;
                            break;

                          case a.JSXSyntax.JSXNamespacedName:
                            var i = e;
                            t = h(i.namespace) + ":" + h(i.name);
                            break;

                          case a.JSXSyntax.JSXMemberExpression:
                            var n = e;
                            t = h(n.object) + "." + h(n.property);
                            break;

                          default:
                            break;
                        }
                        return t;
                    }
                    var p = function(e) {
                        i(t, e);
                        function t(t, r, i) {
                            return e.call(this, t, r, i) || this;
                        }
                        t.prototype.parsePrimaryExpression = function() {
                            return this.match("<") ? this.parseJSXRoot() : e.prototype.parsePrimaryExpression.call(this);
                        };
                        t.prototype.startJSX = function() {
                            this.scanner.index = this.startMarker.index;
                            this.scanner.lineNumber = this.startMarker.line;
                            this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
                        };
                        t.prototype.finishJSX = function() {
                            this.nextToken();
                        };
                        t.prototype.reenterJSX = function() {
                            this.startJSX();
                            this.expectJSX("}");
                            if (this.config.tokens) {
                                this.tokens.pop();
                            }
                        };
                        t.prototype.createJSXNode = function() {
                            this.collectComments();
                            return {
                                index: this.scanner.index,
                                line: this.scanner.lineNumber,
                                column: this.scanner.index - this.scanner.lineStart
                            };
                        };
                        t.prototype.createJSXChildNode = function() {
                            return {
                                index: this.scanner.index,
                                line: this.scanner.lineNumber,
                                column: this.scanner.index - this.scanner.lineStart
                            };
                        };
                        t.prototype.scanXHTMLEntity = function(e) {
                            var t = "&";
                            var r = true;
                            var i = false;
                            var s = false;
                            var a = false;
                            while (!this.scanner.eof() && r && !i) {
                                var o = this.scanner.source[this.scanner.index];
                                if (o === e) {
                                    break;
                                }
                                i = o === ";";
                                t += o;
                                ++this.scanner.index;
                                if (!i) {
                                    switch (t.length) {
                                      case 2:
                                        s = o === "#";
                                        break;

                                      case 3:
                                        if (s) {
                                            a = o === "x";
                                            r = a || n.Character.isDecimalDigit(o.charCodeAt(0));
                                            s = s && !a;
                                        }
                                        break;

                                      default:
                                        r = r && !(s && !n.Character.isDecimalDigit(o.charCodeAt(0)));
                                        r = r && !(a && !n.Character.isHexDigit(o.charCodeAt(0)));
                                        break;
                                    }
                                }
                            }
                            if (r && i && t.length > 2) {
                                var u = t.substr(1, t.length - 2);
                                if (s && u.length > 1) {
                                    t = String.fromCharCode(parseInt(u.substr(1), 10));
                                } else if (a && u.length > 2) {
                                    t = String.fromCharCode(parseInt("0" + u.substr(1), 16));
                                } else if (!s && !a && c.XHTMLEntities[u]) {
                                    t = c.XHTMLEntities[u];
                                }
                            }
                            return t;
                        };
                        t.prototype.lexJSX = function() {
                            var e = this.scanner.source.charCodeAt(this.scanner.index);
                            if (e === 60 || e === 62 || e === 47 || e === 58 || e === 61 || e === 123 || e === 125) {
                                var t = this.scanner.source[this.scanner.index++];
                                return {
                                    type: 7,
                                    value: t,
                                    lineNumber: this.scanner.lineNumber,
                                    lineStart: this.scanner.lineStart,
                                    start: this.scanner.index - 1,
                                    end: this.scanner.index
                                };
                            }
                            if (e === 34 || e === 39) {
                                var r = this.scanner.index;
                                var i = this.scanner.source[this.scanner.index++];
                                var s = "";
                                while (!this.scanner.eof()) {
                                    var a = this.scanner.source[this.scanner.index++];
                                    if (a === i) {
                                        break;
                                    } else if (a === "&") {
                                        s += this.scanXHTMLEntity(i);
                                    } else {
                                        s += a;
                                    }
                                }
                                return {
                                    type: 8,
                                    value: s,
                                    lineNumber: this.scanner.lineNumber,
                                    lineStart: this.scanner.lineStart,
                                    start: r,
                                    end: this.scanner.index
                                };
                            }
                            if (e === 46) {
                                var o = this.scanner.source.charCodeAt(this.scanner.index + 1);
                                var u = this.scanner.source.charCodeAt(this.scanner.index + 2);
                                var t = o === 46 && u === 46 ? "..." : ".";
                                var r = this.scanner.index;
                                this.scanner.index += t.length;
                                return {
                                    type: 7,
                                    value: t,
                                    lineNumber: this.scanner.lineNumber,
                                    lineStart: this.scanner.lineStart,
                                    start: r,
                                    end: this.scanner.index
                                };
                            }
                            if (e === 96) {
                                return {
                                    type: 10,
                                    value: "",
                                    lineNumber: this.scanner.lineNumber,
                                    lineStart: this.scanner.lineStart,
                                    start: this.scanner.index,
                                    end: this.scanner.index
                                };
                            }
                            if (n.Character.isIdentifierStart(e) && e !== 92) {
                                var r = this.scanner.index;
                                ++this.scanner.index;
                                while (!this.scanner.eof()) {
                                    var a = this.scanner.source.charCodeAt(this.scanner.index);
                                    if (n.Character.isIdentifierPart(a) && a !== 92) {
                                        ++this.scanner.index;
                                    } else if (a === 45) {
                                        ++this.scanner.index;
                                    } else {
                                        break;
                                    }
                                }
                                var l = this.scanner.source.slice(r, this.scanner.index);
                                return {
                                    type: 100,
                                    value: l,
                                    lineNumber: this.scanner.lineNumber,
                                    lineStart: this.scanner.lineStart,
                                    start: r,
                                    end: this.scanner.index
                                };
                            }
                            return this.scanner.lex();
                        };
                        t.prototype.nextJSXToken = function() {
                            this.collectComments();
                            this.startMarker.index = this.scanner.index;
                            this.startMarker.line = this.scanner.lineNumber;
                            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                            var e = this.lexJSX();
                            this.lastMarker.index = this.scanner.index;
                            this.lastMarker.line = this.scanner.lineNumber;
                            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                            if (this.config.tokens) {
                                this.tokens.push(this.convertToken(e));
                            }
                            return e;
                        };
                        t.prototype.nextJSXText = function() {
                            this.startMarker.index = this.scanner.index;
                            this.startMarker.line = this.scanner.lineNumber;
                            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                            var e = this.scanner.index;
                            var t = "";
                            while (!this.scanner.eof()) {
                                var r = this.scanner.source[this.scanner.index];
                                if (r === "{" || r === "<") {
                                    break;
                                }
                                ++this.scanner.index;
                                t += r;
                                if (n.Character.isLineTerminator(r.charCodeAt(0))) {
                                    ++this.scanner.lineNumber;
                                    if (r === "\r" && this.scanner.source[this.scanner.index] === "\n") {
                                        ++this.scanner.index;
                                    }
                                    this.scanner.lineStart = this.scanner.index;
                                }
                            }
                            this.lastMarker.index = this.scanner.index;
                            this.lastMarker.line = this.scanner.lineNumber;
                            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                            var i = {
                                type: 101,
                                value: t,
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: e,
                                end: this.scanner.index
                            };
                            if (t.length > 0 && this.config.tokens) {
                                this.tokens.push(this.convertToken(i));
                            }
                            return i;
                        };
                        t.prototype.peekJSXToken = function() {
                            var e = this.scanner.saveState();
                            this.scanner.scanComments();
                            var t = this.lexJSX();
                            this.scanner.restoreState(e);
                            return t;
                        };
                        t.prototype.expectJSX = function(e) {
                            var t = this.nextJSXToken();
                            if (t.type !== 7 || t.value !== e) {
                                this.throwUnexpectedToken(t);
                            }
                        };
                        t.prototype.matchJSX = function(e) {
                            var t = this.peekJSXToken();
                            return t.type === 7 && t.value === e;
                        };
                        t.prototype.parseJSXIdentifier = function() {
                            var e = this.createJSXNode();
                            var t = this.nextJSXToken();
                            if (t.type !== 100) {
                                this.throwUnexpectedToken(t);
                            }
                            return this.finalize(e, new s.JSXIdentifier(t.value));
                        };
                        t.prototype.parseJSXElementName = function() {
                            var e = this.createJSXNode();
                            var t = this.parseJSXIdentifier();
                            if (this.matchJSX(":")) {
                                var r = t;
                                this.expectJSX(":");
                                var i = this.parseJSXIdentifier();
                                t = this.finalize(e, new s.JSXNamespacedName(r, i));
                            } else if (this.matchJSX(".")) {
                                while (this.matchJSX(".")) {
                                    var n = t;
                                    this.expectJSX(".");
                                    var a = this.parseJSXIdentifier();
                                    t = this.finalize(e, new s.JSXMemberExpression(n, a));
                                }
                            }
                            return t;
                        };
                        t.prototype.parseJSXAttributeName = function() {
                            var e = this.createJSXNode();
                            var t;
                            var r = this.parseJSXIdentifier();
                            if (this.matchJSX(":")) {
                                var i = r;
                                this.expectJSX(":");
                                var n = this.parseJSXIdentifier();
                                t = this.finalize(e, new s.JSXNamespacedName(i, n));
                            } else {
                                t = r;
                            }
                            return t;
                        };
                        t.prototype.parseJSXStringLiteralAttribute = function() {
                            var e = this.createJSXNode();
                            var t = this.nextJSXToken();
                            if (t.type !== 8) {
                                this.throwUnexpectedToken(t);
                            }
                            var r = this.getTokenRaw(t);
                            return this.finalize(e, new o.Literal(t.value, r));
                        };
                        t.prototype.parseJSXExpressionAttribute = function() {
                            var e = this.createJSXNode();
                            this.expectJSX("{");
                            this.finishJSX();
                            if (this.match("}")) {
                                this.tolerateError("JSX attributes must only be assigned a non-empty expression");
                            }
                            var t = this.parseAssignmentExpression();
                            this.reenterJSX();
                            return this.finalize(e, new s.JSXExpressionContainer(t));
                        };
                        t.prototype.parseJSXAttributeValue = function() {
                            return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
                        };
                        t.prototype.parseJSXNameValueAttribute = function() {
                            var e = this.createJSXNode();
                            var t = this.parseJSXAttributeName();
                            var r = null;
                            if (this.matchJSX("=")) {
                                this.expectJSX("=");
                                r = this.parseJSXAttributeValue();
                            }
                            return this.finalize(e, new s.JSXAttribute(t, r));
                        };
                        t.prototype.parseJSXSpreadAttribute = function() {
                            var e = this.createJSXNode();
                            this.expectJSX("{");
                            this.expectJSX("...");
                            this.finishJSX();
                            var t = this.parseAssignmentExpression();
                            this.reenterJSX();
                            return this.finalize(e, new s.JSXSpreadAttribute(t));
                        };
                        t.prototype.parseJSXAttributes = function() {
                            var e = [];
                            while (!this.matchJSX("/") && !this.matchJSX(">")) {
                                var t = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
                                e.push(t);
                            }
                            return e;
                        };
                        t.prototype.parseJSXOpeningElement = function() {
                            var e = this.createJSXNode();
                            this.expectJSX("<");
                            var t = this.parseJSXElementName();
                            var r = this.parseJSXAttributes();
                            var i = this.matchJSX("/");
                            if (i) {
                                this.expectJSX("/");
                            }
                            this.expectJSX(">");
                            return this.finalize(e, new s.JSXOpeningElement(t, i, r));
                        };
                        t.prototype.parseJSXBoundaryElement = function() {
                            var e = this.createJSXNode();
                            this.expectJSX("<");
                            if (this.matchJSX("/")) {
                                this.expectJSX("/");
                                var t = this.parseJSXElementName();
                                this.expectJSX(">");
                                return this.finalize(e, new s.JSXClosingElement(t));
                            }
                            var r = this.parseJSXElementName();
                            var i = this.parseJSXAttributes();
                            var n = this.matchJSX("/");
                            if (n) {
                                this.expectJSX("/");
                            }
                            this.expectJSX(">");
                            return this.finalize(e, new s.JSXOpeningElement(r, n, i));
                        };
                        t.prototype.parseJSXEmptyExpression = function() {
                            var e = this.createJSXChildNode();
                            this.collectComments();
                            this.lastMarker.index = this.scanner.index;
                            this.lastMarker.line = this.scanner.lineNumber;
                            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                            return this.finalize(e, new s.JSXEmptyExpression());
                        };
                        t.prototype.parseJSXExpressionContainer = function() {
                            var e = this.createJSXNode();
                            this.expectJSX("{");
                            var t;
                            if (this.matchJSX("}")) {
                                t = this.parseJSXEmptyExpression();
                                this.expectJSX("}");
                            } else {
                                this.finishJSX();
                                t = this.parseAssignmentExpression();
                                this.reenterJSX();
                            }
                            return this.finalize(e, new s.JSXExpressionContainer(t));
                        };
                        t.prototype.parseJSXChildren = function() {
                            var e = [];
                            while (!this.scanner.eof()) {
                                var t = this.createJSXChildNode();
                                var r = this.nextJSXText();
                                if (r.start < r.end) {
                                    var i = this.getTokenRaw(r);
                                    var n = this.finalize(t, new s.JSXText(r.value, i));
                                    e.push(n);
                                }
                                if (this.scanner.source[this.scanner.index] === "{") {
                                    var a = this.parseJSXExpressionContainer();
                                    e.push(a);
                                } else {
                                    break;
                                }
                            }
                            return e;
                        };
                        t.prototype.parseComplexJSXElement = function(e) {
                            var t = [];
                            while (!this.scanner.eof()) {
                                e.children = e.children.concat(this.parseJSXChildren());
                                var r = this.createJSXChildNode();
                                var i = this.parseJSXBoundaryElement();
                                if (i.type === a.JSXSyntax.JSXOpeningElement) {
                                    var n = i;
                                    if (n.selfClosing) {
                                        var o = this.finalize(r, new s.JSXElement(n, [], null));
                                        e.children.push(o);
                                    } else {
                                        t.push(e);
                                        e = {
                                            node: r,
                                            opening: n,
                                            closing: null,
                                            children: []
                                        };
                                    }
                                }
                                if (i.type === a.JSXSyntax.JSXClosingElement) {
                                    e.closing = i;
                                    var u = h(e.opening.name);
                                    var l = h(e.closing.name);
                                    if (u !== l) {
                                        this.tolerateError("Expected corresponding JSX closing tag for %0", u);
                                    }
                                    if (t.length > 0) {
                                        var o = this.finalize(e.node, new s.JSXElement(e.opening, e.children, e.closing));
                                        e = t[t.length - 1];
                                        e.children.push(o);
                                        t.pop();
                                    } else {
                                        break;
                                    }
                                }
                            }
                            return e;
                        };
                        t.prototype.parseJSXElement = function() {
                            var e = this.createJSXNode();
                            var t = this.parseJSXOpeningElement();
                            var r = [];
                            var i = null;
                            if (!t.selfClosing) {
                                var n = this.parseComplexJSXElement({
                                    node: e,
                                    opening: t,
                                    closing: i,
                                    children: r
                                });
                                r = n.children;
                                i = n.closing;
                            }
                            return this.finalize(e, new s.JSXElement(t, r, i));
                        };
                        t.prototype.parseJSXRoot = function() {
                            if (this.config.tokens) {
                                this.tokens.pop();
                            }
                            this.startJSX();
                            var e = this.parseJSXElement();
                            this.finishJSX();
                            return e;
                        };
                        t.prototype.isStartOfExpression = function() {
                            return e.prototype.isStartOfExpression.call(this) || this.match("<");
                        };
                        return t;
                    }(u.Parser);
                    t.JSXParser = p;
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var r = {
                        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
                        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
                    };
                    t.Character = {
                        fromCodePoint: function e(t) {
                            return t < 65536 ? String.fromCharCode(t) : String.fromCharCode(55296 + (t - 65536 >> 10)) + String.fromCharCode(56320 + (t - 65536 & 1023));
                        },
                        isWhiteSpace: function e(t) {
                            return t === 32 || t === 9 || t === 11 || t === 12 || t === 160 || t >= 5760 && [ 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279 ].indexOf(t) >= 0;
                        },
                        isLineTerminator: function e(t) {
                            return t === 10 || t === 13 || t === 8232 || t === 8233;
                        },
                        isIdentifierStart: function e(i) {
                            return i === 36 || i === 95 || i >= 65 && i <= 90 || i >= 97 && i <= 122 || i === 92 || i >= 128 && r.NonAsciiIdentifierStart.test(t.Character.fromCodePoint(i));
                        },
                        isIdentifierPart: function e(i) {
                            return i === 36 || i === 95 || i >= 65 && i <= 90 || i >= 97 && i <= 122 || i >= 48 && i <= 57 || i === 92 || i >= 128 && r.NonAsciiIdentifierPart.test(t.Character.fromCodePoint(i));
                        },
                        isDecimalDigit: function e(t) {
                            return t >= 48 && t <= 57;
                        },
                        isHexDigit: function e(t) {
                            return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
                        },
                        isOctalDigit: function e(t) {
                            return t >= 48 && t <= 55;
                        }
                    };
                }, function(e, t, r) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var i = r(6);
                    var n = function() {
                        function e(e) {
                            this.type = i.JSXSyntax.JSXClosingElement;
                            this.name = e;
                        }
                        return e;
                    }();
                    t.JSXClosingElement = n;
                    var s = function() {
                        function e(e, t, r) {
                            this.type = i.JSXSyntax.JSXElement;
                            this.openingElement = e;
                            this.children = t;
                            this.closingElement = r;
                        }
                        return e;
                    }();
                    t.JSXElement = s;
                    var a = function() {
                        function e() {
                            this.type = i.JSXSyntax.JSXEmptyExpression;
                        }
                        return e;
                    }();
                    t.JSXEmptyExpression = a;
                    var o = function() {
                        function e(e) {
                            this.type = i.JSXSyntax.JSXExpressionContainer;
                            this.expression = e;
                        }
                        return e;
                    }();
                    t.JSXExpressionContainer = o;
                    var u = function() {
                        function e(e) {
                            this.type = i.JSXSyntax.JSXIdentifier;
                            this.name = e;
                        }
                        return e;
                    }();
                    t.JSXIdentifier = u;
                    var l = function() {
                        function e(e, t) {
                            this.type = i.JSXSyntax.JSXMemberExpression;
                            this.object = e;
                            this.property = t;
                        }
                        return e;
                    }();
                    t.JSXMemberExpression = l;
                    var c = function() {
                        function e(e, t) {
                            this.type = i.JSXSyntax.JSXAttribute;
                            this.name = e;
                            this.value = t;
                        }
                        return e;
                    }();
                    t.JSXAttribute = c;
                    var h = function() {
                        function e(e, t) {
                            this.type = i.JSXSyntax.JSXNamespacedName;
                            this.namespace = e;
                            this.name = t;
                        }
                        return e;
                    }();
                    t.JSXNamespacedName = h;
                    var p = function() {
                        function e(e, t, r) {
                            this.type = i.JSXSyntax.JSXOpeningElement;
                            this.name = e;
                            this.selfClosing = t;
                            this.attributes = r;
                        }
                        return e;
                    }();
                    t.JSXOpeningElement = p;
                    var f = function() {
                        function e(e) {
                            this.type = i.JSXSyntax.JSXSpreadAttribute;
                            this.argument = e;
                        }
                        return e;
                    }();
                    t.JSXSpreadAttribute = f;
                    var d = function() {
                        function e(e, t) {
                            this.type = i.JSXSyntax.JSXText;
                            this.value = e;
                            this.raw = t;
                        }
                        return e;
                    }();
                    t.JSXText = d;
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    t.JSXSyntax = {
                        JSXAttribute: "JSXAttribute",
                        JSXClosingElement: "JSXClosingElement",
                        JSXElement: "JSXElement",
                        JSXEmptyExpression: "JSXEmptyExpression",
                        JSXExpressionContainer: "JSXExpressionContainer",
                        JSXIdentifier: "JSXIdentifier",
                        JSXMemberExpression: "JSXMemberExpression",
                        JSXNamespacedName: "JSXNamespacedName",
                        JSXOpeningElement: "JSXOpeningElement",
                        JSXSpreadAttribute: "JSXSpreadAttribute",
                        JSXText: "JSXText"
                    };
                }, function(e, t, r) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var i = r(2);
                    var n = function() {
                        function e(e) {
                            this.type = i.Syntax.ArrayExpression;
                            this.elements = e;
                        }
                        return e;
                    }();
                    t.ArrayExpression = n;
                    var s = function() {
                        function e(e) {
                            this.type = i.Syntax.ArrayPattern;
                            this.elements = e;
                        }
                        return e;
                    }();
                    t.ArrayPattern = s;
                    var a = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ArrowFunctionExpression;
                            this.id = null;
                            this.params = e;
                            this.body = t;
                            this.generator = false;
                            this.expression = r;
                            this.async = false;
                        }
                        return e;
                    }();
                    t.ArrowFunctionExpression = a;
                    var o = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.AssignmentExpression;
                            this.operator = e;
                            this.left = t;
                            this.right = r;
                        }
                        return e;
                    }();
                    t.AssignmentExpression = o;
                    var u = function() {
                        function e(e, t) {
                            this.type = i.Syntax.AssignmentPattern;
                            this.left = e;
                            this.right = t;
                        }
                        return e;
                    }();
                    t.AssignmentPattern = u;
                    var l = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ArrowFunctionExpression;
                            this.id = null;
                            this.params = e;
                            this.body = t;
                            this.generator = false;
                            this.expression = r;
                            this.async = true;
                        }
                        return e;
                    }();
                    t.AsyncArrowFunctionExpression = l;
                    var c = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.FunctionDeclaration;
                            this.id = e;
                            this.params = t;
                            this.body = r;
                            this.generator = false;
                            this.expression = false;
                            this.async = true;
                        }
                        return e;
                    }();
                    t.AsyncFunctionDeclaration = c;
                    var h = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.FunctionExpression;
                            this.id = e;
                            this.params = t;
                            this.body = r;
                            this.generator = false;
                            this.expression = false;
                            this.async = true;
                        }
                        return e;
                    }();
                    t.AsyncFunctionExpression = h;
                    var p = function() {
                        function e(e) {
                            this.type = i.Syntax.AwaitExpression;
                            this.argument = e;
                        }
                        return e;
                    }();
                    t.AwaitExpression = p;
                    var f = function() {
                        function e(e, t, r) {
                            var n = e === "||" || e === "&&";
                            this.type = n ? i.Syntax.LogicalExpression : i.Syntax.BinaryExpression;
                            this.operator = e;
                            this.left = t;
                            this.right = r;
                        }
                        return e;
                    }();
                    t.BinaryExpression = f;
                    var d = function() {
                        function e(e) {
                            this.type = i.Syntax.BlockStatement;
                            this.body = e;
                        }
                        return e;
                    }();
                    t.BlockStatement = d;
                    var m = function() {
                        function e(e) {
                            this.type = i.Syntax.BreakStatement;
                            this.label = e;
                        }
                        return e;
                    }();
                    t.BreakStatement = m;
                    var v = function() {
                        function e(e, t) {
                            this.type = i.Syntax.CallExpression;
                            this.callee = e;
                            this.arguments = t;
                        }
                        return e;
                    }();
                    t.CallExpression = v;
                    var y = function() {
                        function e(e, t) {
                            this.type = i.Syntax.CatchClause;
                            this.param = e;
                            this.body = t;
                        }
                        return e;
                    }();
                    t.CatchClause = y;
                    var x = function() {
                        function e(e) {
                            this.type = i.Syntax.ClassBody;
                            this.body = e;
                        }
                        return e;
                    }();
                    t.ClassBody = x;
                    var g = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ClassDeclaration;
                            this.id = e;
                            this.superClass = t;
                            this.body = r;
                        }
                        return e;
                    }();
                    t.ClassDeclaration = g;
                    var b = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ClassExpression;
                            this.id = e;
                            this.superClass = t;
                            this.body = r;
                        }
                        return e;
                    }();
                    t.ClassExpression = b;
                    var E = function() {
                        function e(e, t) {
                            this.type = i.Syntax.MemberExpression;
                            this.computed = true;
                            this.object = e;
                            this.property = t;
                        }
                        return e;
                    }();
                    t.ComputedMemberExpression = E;
                    var S = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ConditionalExpression;
                            this.test = e;
                            this.consequent = t;
                            this.alternate = r;
                        }
                        return e;
                    }();
                    t.ConditionalExpression = S;
                    var D = function() {
                        function e(e) {
                            this.type = i.Syntax.ContinueStatement;
                            this.label = e;
                        }
                        return e;
                    }();
                    t.ContinueStatement = D;
                    var C = function() {
                        function e() {
                            this.type = i.Syntax.DebuggerStatement;
                        }
                        return e;
                    }();
                    t.DebuggerStatement = C;
                    var A = function() {
                        function e(e, t) {
                            this.type = i.Syntax.ExpressionStatement;
                            this.expression = e;
                            this.directive = t;
                        }
                        return e;
                    }();
                    t.Directive = A;
                    var k = function() {
                        function e(e, t) {
                            this.type = i.Syntax.DoWhileStatement;
                            this.body = e;
                            this.test = t;
                        }
                        return e;
                    }();
                    t.DoWhileStatement = k;
                    var w = function() {
                        function e() {
                            this.type = i.Syntax.EmptyStatement;
                        }
                        return e;
                    }();
                    t.EmptyStatement = w;
                    var T = function() {
                        function e(e) {
                            this.type = i.Syntax.ExportAllDeclaration;
                            this.source = e;
                        }
                        return e;
                    }();
                    t.ExportAllDeclaration = T;
                    var F = function() {
                        function e(e) {
                            this.type = i.Syntax.ExportDefaultDeclaration;
                            this.declaration = e;
                        }
                        return e;
                    }();
                    t.ExportDefaultDeclaration = F;
                    var P = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ExportNamedDeclaration;
                            this.declaration = e;
                            this.specifiers = t;
                            this.source = r;
                        }
                        return e;
                    }();
                    t.ExportNamedDeclaration = P;
                    var N = function() {
                        function e(e, t) {
                            this.type = i.Syntax.ExportSpecifier;
                            this.exported = t;
                            this.local = e;
                        }
                        return e;
                    }();
                    t.ExportSpecifier = N;
                    var I = function() {
                        function e(e) {
                            this.type = i.Syntax.ExpressionStatement;
                            this.expression = e;
                        }
                        return e;
                    }();
                    t.ExpressionStatement = I;
                    var _ = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ForInStatement;
                            this.left = e;
                            this.right = t;
                            this.body = r;
                            this.each = false;
                        }
                        return e;
                    }();
                    t.ForInStatement = _;
                    var B = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.ForOfStatement;
                            this.left = e;
                            this.right = t;
                            this.body = r;
                        }
                        return e;
                    }();
                    t.ForOfStatement = B;
                    var L = function() {
                        function e(e, t, r, n) {
                            this.type = i.Syntax.ForStatement;
                            this.init = e;
                            this.test = t;
                            this.update = r;
                            this.body = n;
                        }
                        return e;
                    }();
                    t.ForStatement = L;
                    var M = function() {
                        function e(e, t, r, n) {
                            this.type = i.Syntax.FunctionDeclaration;
                            this.id = e;
                            this.params = t;
                            this.body = r;
                            this.generator = n;
                            this.expression = false;
                            this.async = false;
                        }
                        return e;
                    }();
                    t.FunctionDeclaration = M;
                    var O = function() {
                        function e(e, t, r, n) {
                            this.type = i.Syntax.FunctionExpression;
                            this.id = e;
                            this.params = t;
                            this.body = r;
                            this.generator = n;
                            this.expression = false;
                            this.async = false;
                        }
                        return e;
                    }();
                    t.FunctionExpression = O;
                    var j = function() {
                        function e(e) {
                            this.type = i.Syntax.Identifier;
                            this.name = e;
                        }
                        return e;
                    }();
                    t.Identifier = j;
                    var R = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.IfStatement;
                            this.test = e;
                            this.consequent = t;
                            this.alternate = r;
                        }
                        return e;
                    }();
                    t.IfStatement = R;
                    var X = function() {
                        function e(e, t) {
                            this.type = i.Syntax.ImportDeclaration;
                            this.specifiers = e;
                            this.source = t;
                        }
                        return e;
                    }();
                    t.ImportDeclaration = X;
                    var V = function() {
                        function e(e) {
                            this.type = i.Syntax.ImportDefaultSpecifier;
                            this.local = e;
                        }
                        return e;
                    }();
                    t.ImportDefaultSpecifier = V;
                    var U = function() {
                        function e(e) {
                            this.type = i.Syntax.ImportNamespaceSpecifier;
                            this.local = e;
                        }
                        return e;
                    }();
                    t.ImportNamespaceSpecifier = U;
                    var J = function() {
                        function e(e, t) {
                            this.type = i.Syntax.ImportSpecifier;
                            this.local = e;
                            this.imported = t;
                        }
                        return e;
                    }();
                    t.ImportSpecifier = J;
                    var z = function() {
                        function e(e, t) {
                            this.type = i.Syntax.LabeledStatement;
                            this.label = e;
                            this.body = t;
                        }
                        return e;
                    }();
                    t.LabeledStatement = z;
                    var q = function() {
                        function e(e, t) {
                            this.type = i.Syntax.Literal;
                            this.value = e;
                            this.raw = t;
                        }
                        return e;
                    }();
                    t.Literal = q;
                    var W = function() {
                        function e(e, t) {
                            this.type = i.Syntax.MetaProperty;
                            this.meta = e;
                            this.property = t;
                        }
                        return e;
                    }();
                    t.MetaProperty = W;
                    var K = function() {
                        function e(e, t, r, n, s) {
                            this.type = i.Syntax.MethodDefinition;
                            this.key = e;
                            this.computed = t;
                            this.value = r;
                            this.kind = n;
                            this.static = s;
                        }
                        return e;
                    }();
                    t.MethodDefinition = K;
                    var G = function() {
                        function e(e) {
                            this.type = i.Syntax.Program;
                            this.body = e;
                            this.sourceType = "module";
                        }
                        return e;
                    }();
                    t.Module = G;
                    var H = function() {
                        function e(e, t) {
                            this.type = i.Syntax.NewExpression;
                            this.callee = e;
                            this.arguments = t;
                        }
                        return e;
                    }();
                    t.NewExpression = H;
                    var Y = function() {
                        function e(e) {
                            this.type = i.Syntax.ObjectExpression;
                            this.properties = e;
                        }
                        return e;
                    }();
                    t.ObjectExpression = Y;
                    var $ = function() {
                        function e(e) {
                            this.type = i.Syntax.ObjectPattern;
                            this.properties = e;
                        }
                        return e;
                    }();
                    t.ObjectPattern = $;
                    var Q = function() {
                        function e(e, t, r, n, s, a) {
                            this.type = i.Syntax.Property;
                            this.key = t;
                            this.computed = r;
                            this.value = n;
                            this.kind = e;
                            this.method = s;
                            this.shorthand = a;
                        }
                        return e;
                    }();
                    t.Property = Q;
                    var Z = function() {
                        function e(e, t, r, n) {
                            this.type = i.Syntax.Literal;
                            this.value = e;
                            this.raw = t;
                            this.regex = {
                                pattern: r,
                                flags: n
                            };
                        }
                        return e;
                    }();
                    t.RegexLiteral = Z;
                    var ee = function() {
                        function e(e) {
                            this.type = i.Syntax.RestElement;
                            this.argument = e;
                        }
                        return e;
                    }();
                    t.RestElement = ee;
                    var te = function() {
                        function e(e) {
                            this.type = i.Syntax.ReturnStatement;
                            this.argument = e;
                        }
                        return e;
                    }();
                    t.ReturnStatement = te;
                    var re = function() {
                        function e(e) {
                            this.type = i.Syntax.Program;
                            this.body = e;
                            this.sourceType = "script";
                        }
                        return e;
                    }();
                    t.Script = re;
                    var ie = function() {
                        function e(e) {
                            this.type = i.Syntax.SequenceExpression;
                            this.expressions = e;
                        }
                        return e;
                    }();
                    t.SequenceExpression = ie;
                    var ne = function() {
                        function e(e) {
                            this.type = i.Syntax.SpreadElement;
                            this.argument = e;
                        }
                        return e;
                    }();
                    t.SpreadElement = ne;
                    var se = function() {
                        function e(e, t) {
                            this.type = i.Syntax.MemberExpression;
                            this.computed = false;
                            this.object = e;
                            this.property = t;
                        }
                        return e;
                    }();
                    t.StaticMemberExpression = se;
                    var ae = function() {
                        function e() {
                            this.type = i.Syntax.Super;
                        }
                        return e;
                    }();
                    t.Super = ae;
                    var oe = function() {
                        function e(e, t) {
                            this.type = i.Syntax.SwitchCase;
                            this.test = e;
                            this.consequent = t;
                        }
                        return e;
                    }();
                    t.SwitchCase = oe;
                    var ue = function() {
                        function e(e, t) {
                            this.type = i.Syntax.SwitchStatement;
                            this.discriminant = e;
                            this.cases = t;
                        }
                        return e;
                    }();
                    t.SwitchStatement = ue;
                    var le = function() {
                        function e(e, t) {
                            this.type = i.Syntax.TaggedTemplateExpression;
                            this.tag = e;
                            this.quasi = t;
                        }
                        return e;
                    }();
                    t.TaggedTemplateExpression = le;
                    var ce = function() {
                        function e(e, t) {
                            this.type = i.Syntax.TemplateElement;
                            this.value = e;
                            this.tail = t;
                        }
                        return e;
                    }();
                    t.TemplateElement = ce;
                    var he = function() {
                        function e(e, t) {
                            this.type = i.Syntax.TemplateLiteral;
                            this.quasis = e;
                            this.expressions = t;
                        }
                        return e;
                    }();
                    t.TemplateLiteral = he;
                    var pe = function() {
                        function e() {
                            this.type = i.Syntax.ThisExpression;
                        }
                        return e;
                    }();
                    t.ThisExpression = pe;
                    var fe = function() {
                        function e(e) {
                            this.type = i.Syntax.ThrowStatement;
                            this.argument = e;
                        }
                        return e;
                    }();
                    t.ThrowStatement = fe;
                    var de = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.TryStatement;
                            this.block = e;
                            this.handler = t;
                            this.finalizer = r;
                        }
                        return e;
                    }();
                    t.TryStatement = de;
                    var me = function() {
                        function e(e, t) {
                            this.type = i.Syntax.UnaryExpression;
                            this.operator = e;
                            this.argument = t;
                            this.prefix = true;
                        }
                        return e;
                    }();
                    t.UnaryExpression = me;
                    var ve = function() {
                        function e(e, t, r) {
                            this.type = i.Syntax.UpdateExpression;
                            this.operator = e;
                            this.argument = t;
                            this.prefix = r;
                        }
                        return e;
                    }();
                    t.UpdateExpression = ve;
                    var ye = function() {
                        function e(e, t) {
                            this.type = i.Syntax.VariableDeclaration;
                            this.declarations = e;
                            this.kind = t;
                        }
                        return e;
                    }();
                    t.VariableDeclaration = ye;
                    var xe = function() {
                        function e(e, t) {
                            this.type = i.Syntax.VariableDeclarator;
                            this.id = e;
                            this.init = t;
                        }
                        return e;
                    }();
                    t.VariableDeclarator = xe;
                    var ge = function() {
                        function e(e, t) {
                            this.type = i.Syntax.WhileStatement;
                            this.test = e;
                            this.body = t;
                        }
                        return e;
                    }();
                    t.WhileStatement = ge;
                    var be = function() {
                        function e(e, t) {
                            this.type = i.Syntax.WithStatement;
                            this.object = e;
                            this.body = t;
                        }
                        return e;
                    }();
                    t.WithStatement = be;
                    var Ee = function() {
                        function e(e, t) {
                            this.type = i.Syntax.YieldExpression;
                            this.argument = e;
                            this.delegate = t;
                        }
                        return e;
                    }();
                    t.YieldExpression = Ee;
                }, function(e, t, r) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var i = r(9);
                    var n = r(10);
                    var s = r(11);
                    var a = r(7);
                    var o = r(12);
                    var u = r(2);
                    var l = r(13);
                    var c = "ArrowParameterPlaceHolder";
                    var h = function() {
                        function e(e, t, r) {
                            if (t === void 0) {
                                t = {};
                            }
                            this.config = {
                                range: typeof t.range === "boolean" && t.range,
                                loc: typeof t.loc === "boolean" && t.loc,
                                source: null,
                                tokens: typeof t.tokens === "boolean" && t.tokens,
                                comment: typeof t.comment === "boolean" && t.comment,
                                tolerant: typeof t.tolerant === "boolean" && t.tolerant
                            };
                            if (this.config.loc && t.source && t.source !== null) {
                                this.config.source = String(t.source);
                            }
                            this.delegate = r;
                            this.errorHandler = new n.ErrorHandler();
                            this.errorHandler.tolerant = this.config.tolerant;
                            this.scanner = new o.Scanner(e, this.errorHandler);
                            this.scanner.trackComment = this.config.comment;
                            this.operatorPrecedence = {
                                ")": 0,
                                ";": 0,
                                ",": 0,
                                "=": 0,
                                "]": 0,
                                "||": 1,
                                "&&": 2,
                                "|": 3,
                                "^": 4,
                                "&": 5,
                                "==": 6,
                                "!=": 6,
                                "===": 6,
                                "!==": 6,
                                "<": 7,
                                ">": 7,
                                "<=": 7,
                                ">=": 7,
                                "<<": 8,
                                ">>": 8,
                                ">>>": 8,
                                "+": 9,
                                "-": 9,
                                "*": 11,
                                "/": 11,
                                "%": 11
                            };
                            this.lookahead = {
                                type: 2,
                                value: "",
                                lineNumber: this.scanner.lineNumber,
                                lineStart: 0,
                                start: 0,
                                end: 0
                            };
                            this.hasLineTerminator = false;
                            this.context = {
                                isModule: false,
                                await: false,
                                allowIn: true,
                                allowStrictDirective: true,
                                allowYield: true,
                                firstCoverInitializedNameError: null,
                                isAssignmentTarget: false,
                                isBindingElement: false,
                                inFunctionBody: false,
                                inIteration: false,
                                inSwitch: false,
                                labelSet: {},
                                strict: false
                            };
                            this.tokens = [];
                            this.startMarker = {
                                index: 0,
                                line: this.scanner.lineNumber,
                                column: 0
                            };
                            this.lastMarker = {
                                index: 0,
                                line: this.scanner.lineNumber,
                                column: 0
                            };
                            this.nextToken();
                            this.lastMarker = {
                                index: this.scanner.index,
                                line: this.scanner.lineNumber,
                                column: this.scanner.index - this.scanner.lineStart
                            };
                        }
                        e.prototype.throwError = function(e) {
                            var t = [];
                            for (var r = 1; r < arguments.length; r++) {
                                t[r - 1] = arguments[r];
                            }
                            var n = Array.prototype.slice.call(arguments, 1);
                            var s = e.replace(/%(\d)/g, function(e, t) {
                                i.assert(t < n.length, "Message reference must be in range");
                                return n[t];
                            });
                            var a = this.lastMarker.index;
                            var o = this.lastMarker.line;
                            var u = this.lastMarker.column + 1;
                            throw this.errorHandler.createError(a, o, u, s);
                        };
                        e.prototype.tolerateError = function(e) {
                            var t = [];
                            for (var r = 1; r < arguments.length; r++) {
                                t[r - 1] = arguments[r];
                            }
                            var n = Array.prototype.slice.call(arguments, 1);
                            var s = e.replace(/%(\d)/g, function(e, t) {
                                i.assert(t < n.length, "Message reference must be in range");
                                return n[t];
                            });
                            var a = this.lastMarker.index;
                            var o = this.scanner.lineNumber;
                            var u = this.lastMarker.column + 1;
                            this.errorHandler.tolerateError(a, o, u, s);
                        };
                        e.prototype.unexpectedTokenError = function(e, t) {
                            var r = t || s.Messages.UnexpectedToken;
                            var i;
                            if (e) {
                                if (!t) {
                                    r = e.type === 2 ? s.Messages.UnexpectedEOS : e.type === 3 ? s.Messages.UnexpectedIdentifier : e.type === 6 ? s.Messages.UnexpectedNumber : e.type === 8 ? s.Messages.UnexpectedString : e.type === 10 ? s.Messages.UnexpectedTemplate : s.Messages.UnexpectedToken;
                                    if (e.type === 4) {
                                        if (this.scanner.isFutureReservedWord(e.value)) {
                                            r = s.Messages.UnexpectedReserved;
                                        } else if (this.context.strict && this.scanner.isStrictModeReservedWord(e.value)) {
                                            r = s.Messages.StrictReservedWord;
                                        }
                                    }
                                }
                                i = e.value;
                            } else {
                                i = "ILLEGAL";
                            }
                            r = r.replace("%0", i);
                            if (e && typeof e.lineNumber === "number") {
                                var n = e.start;
                                var a = e.lineNumber;
                                var o = this.lastMarker.index - this.lastMarker.column;
                                var u = e.start - o + 1;
                                return this.errorHandler.createError(n, a, u, r);
                            } else {
                                var n = this.lastMarker.index;
                                var a = this.lastMarker.line;
                                var u = this.lastMarker.column + 1;
                                return this.errorHandler.createError(n, a, u, r);
                            }
                        };
                        e.prototype.throwUnexpectedToken = function(e, t) {
                            throw this.unexpectedTokenError(e, t);
                        };
                        e.prototype.tolerateUnexpectedToken = function(e, t) {
                            this.errorHandler.tolerate(this.unexpectedTokenError(e, t));
                        };
                        e.prototype.collectComments = function() {
                            if (!this.config.comment) {
                                this.scanner.scanComments();
                            } else {
                                var e = this.scanner.scanComments();
                                if (e.length > 0 && this.delegate) {
                                    for (var t = 0; t < e.length; ++t) {
                                        var r = e[t];
                                        var i = void 0;
                                        i = {
                                            type: r.multiLine ? "BlockComment" : "LineComment",
                                            value: this.scanner.source.slice(r.slice[0], r.slice[1])
                                        };
                                        if (this.config.range) {
                                            i.range = r.range;
                                        }
                                        if (this.config.loc) {
                                            i.loc = r.loc;
                                        }
                                        var n = {
                                            start: {
                                                line: r.loc.start.line,
                                                column: r.loc.start.column,
                                                offset: r.range[0]
                                            },
                                            end: {
                                                line: r.loc.end.line,
                                                column: r.loc.end.column,
                                                offset: r.range[1]
                                            }
                                        };
                                        this.delegate(i, n);
                                    }
                                }
                            }
                        };
                        e.prototype.getTokenRaw = function(e) {
                            return this.scanner.source.slice(e.start, e.end);
                        };
                        e.prototype.convertToken = function(e) {
                            var t = {
                                type: l.TokenName[e.type],
                                value: this.getTokenRaw(e)
                            };
                            if (this.config.range) {
                                t.range = [ e.start, e.end ];
                            }
                            if (this.config.loc) {
                                t.loc = {
                                    start: {
                                        line: this.startMarker.line,
                                        column: this.startMarker.column
                                    },
                                    end: {
                                        line: this.scanner.lineNumber,
                                        column: this.scanner.index - this.scanner.lineStart
                                    }
                                };
                            }
                            if (e.type === 9) {
                                var r = e.pattern;
                                var i = e.flags;
                                t.regex = {
                                    pattern: r,
                                    flags: i
                                };
                            }
                            return t;
                        };
                        e.prototype.nextToken = function() {
                            var e = this.lookahead;
                            this.lastMarker.index = this.scanner.index;
                            this.lastMarker.line = this.scanner.lineNumber;
                            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                            this.collectComments();
                            if (this.scanner.index !== this.startMarker.index) {
                                this.startMarker.index = this.scanner.index;
                                this.startMarker.line = this.scanner.lineNumber;
                                this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                            }
                            var t = this.scanner.lex();
                            this.hasLineTerminator = e.lineNumber !== t.lineNumber;
                            if (t && this.context.strict && t.type === 3) {
                                if (this.scanner.isStrictModeReservedWord(t.value)) {
                                    t.type = 4;
                                }
                            }
                            this.lookahead = t;
                            if (this.config.tokens && t.type !== 2) {
                                this.tokens.push(this.convertToken(t));
                            }
                            return e;
                        };
                        e.prototype.nextRegexToken = function() {
                            this.collectComments();
                            var e = this.scanner.scanRegExp();
                            if (this.config.tokens) {
                                this.tokens.pop();
                                this.tokens.push(this.convertToken(e));
                            }
                            this.lookahead = e;
                            this.nextToken();
                            return e;
                        };
                        e.prototype.createNode = function() {
                            return {
                                index: this.startMarker.index,
                                line: this.startMarker.line,
                                column: this.startMarker.column
                            };
                        };
                        e.prototype.startNode = function(e, t) {
                            if (t === void 0) {
                                t = 0;
                            }
                            var r = e.start - e.lineStart;
                            var i = e.lineNumber;
                            if (r < 0) {
                                r += t;
                                i--;
                            }
                            return {
                                index: e.start,
                                line: i,
                                column: r
                            };
                        };
                        e.prototype.finalize = function(e, t) {
                            if (this.config.range) {
                                t.range = [ e.index, this.lastMarker.index ];
                            }
                            if (this.config.loc) {
                                t.loc = {
                                    start: {
                                        line: e.line,
                                        column: e.column
                                    },
                                    end: {
                                        line: this.lastMarker.line,
                                        column: this.lastMarker.column
                                    }
                                };
                                if (this.config.source) {
                                    t.loc.source = this.config.source;
                                }
                            }
                            if (this.delegate) {
                                var r = {
                                    start: {
                                        line: e.line,
                                        column: e.column,
                                        offset: e.index
                                    },
                                    end: {
                                        line: this.lastMarker.line,
                                        column: this.lastMarker.column,
                                        offset: this.lastMarker.index
                                    }
                                };
                                this.delegate(t, r);
                            }
                            return t;
                        };
                        e.prototype.expect = function(e) {
                            var t = this.nextToken();
                            if (t.type !== 7 || t.value !== e) {
                                this.throwUnexpectedToken(t);
                            }
                        };
                        e.prototype.expectCommaSeparator = function() {
                            if (this.config.tolerant) {
                                var e = this.lookahead;
                                if (e.type === 7 && e.value === ",") {
                                    this.nextToken();
                                } else if (e.type === 7 && e.value === ";") {
                                    this.nextToken();
                                    this.tolerateUnexpectedToken(e);
                                } else {
                                    this.tolerateUnexpectedToken(e, s.Messages.UnexpectedToken);
                                }
                            } else {
                                this.expect(",");
                            }
                        };
                        e.prototype.expectKeyword = function(e) {
                            var t = this.nextToken();
                            if (t.type !== 4 || t.value !== e) {
                                this.throwUnexpectedToken(t);
                            }
                        };
                        e.prototype.match = function(e) {
                            return this.lookahead.type === 7 && this.lookahead.value === e;
                        };
                        e.prototype.matchKeyword = function(e) {
                            return this.lookahead.type === 4 && this.lookahead.value === e;
                        };
                        e.prototype.matchContextualKeyword = function(e) {
                            return this.lookahead.type === 3 && this.lookahead.value === e;
                        };
                        e.prototype.matchAssign = function() {
                            if (this.lookahead.type !== 7) {
                                return false;
                            }
                            var e = this.lookahead.value;
                            return e === "=" || e === "*=" || e === "**=" || e === "/=" || e === "%=" || e === "+=" || e === "-=" || e === "<<=" || e === ">>=" || e === ">>>=" || e === "&=" || e === "^=" || e === "|=";
                        };
                        e.prototype.isolateCoverGrammar = function(e) {
                            var t = this.context.isBindingElement;
                            var r = this.context.isAssignmentTarget;
                            var i = this.context.firstCoverInitializedNameError;
                            this.context.isBindingElement = true;
                            this.context.isAssignmentTarget = true;
                            this.context.firstCoverInitializedNameError = null;
                            var n = e.call(this);
                            if (this.context.firstCoverInitializedNameError !== null) {
                                this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
                            }
                            this.context.isBindingElement = t;
                            this.context.isAssignmentTarget = r;
                            this.context.firstCoverInitializedNameError = i;
                            return n;
                        };
                        e.prototype.inheritCoverGrammar = function(e) {
                            var t = this.context.isBindingElement;
                            var r = this.context.isAssignmentTarget;
                            var i = this.context.firstCoverInitializedNameError;
                            this.context.isBindingElement = true;
                            this.context.isAssignmentTarget = true;
                            this.context.firstCoverInitializedNameError = null;
                            var n = e.call(this);
                            this.context.isBindingElement = this.context.isBindingElement && t;
                            this.context.isAssignmentTarget = this.context.isAssignmentTarget && r;
                            this.context.firstCoverInitializedNameError = i || this.context.firstCoverInitializedNameError;
                            return n;
                        };
                        e.prototype.consumeSemicolon = function() {
                            if (this.match(";")) {
                                this.nextToken();
                            } else if (!this.hasLineTerminator) {
                                if (this.lookahead.type !== 2 && !this.match("}")) {
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                                this.lastMarker.index = this.startMarker.index;
                                this.lastMarker.line = this.startMarker.line;
                                this.lastMarker.column = this.startMarker.column;
                            }
                        };
                        e.prototype.parsePrimaryExpression = function() {
                            var e = this.createNode();
                            var t;
                            var r, i;
                            switch (this.lookahead.type) {
                              case 3:
                                if ((this.context.isModule || this.context.await) && this.lookahead.value === "await") {
                                    this.tolerateUnexpectedToken(this.lookahead);
                                }
                                t = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(e, new a.Identifier(this.nextToken().value));
                                break;

                              case 6:
                              case 8:
                                if (this.context.strict && this.lookahead.octal) {
                                    this.tolerateUnexpectedToken(this.lookahead, s.Messages.StrictOctalLiteral);
                                }
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                                r = this.nextToken();
                                i = this.getTokenRaw(r);
                                t = this.finalize(e, new a.Literal(r.value, i));
                                break;

                              case 1:
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                                r = this.nextToken();
                                i = this.getTokenRaw(r);
                                t = this.finalize(e, new a.Literal(r.value === "true", i));
                                break;

                              case 5:
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                                r = this.nextToken();
                                i = this.getTokenRaw(r);
                                t = this.finalize(e, new a.Literal(null, i));
                                break;

                              case 10:
                                t = this.parseTemplateLiteral();
                                break;

                              case 7:
                                switch (this.lookahead.value) {
                                  case "(":
                                    this.context.isBindingElement = false;
                                    t = this.inheritCoverGrammar(this.parseGroupExpression);
                                    break;

                                  case "[":
                                    t = this.inheritCoverGrammar(this.parseArrayInitializer);
                                    break;

                                  case "{":
                                    t = this.inheritCoverGrammar(this.parseObjectInitializer);
                                    break;

                                  case "/":
                                  case "/=":
                                    this.context.isAssignmentTarget = false;
                                    this.context.isBindingElement = false;
                                    this.scanner.index = this.startMarker.index;
                                    r = this.nextRegexToken();
                                    i = this.getTokenRaw(r);
                                    t = this.finalize(e, new a.RegexLiteral(r.regex, i, r.pattern, r.flags));
                                    break;

                                  default:
                                    t = this.throwUnexpectedToken(this.nextToken());
                                }
                                break;

                              case 4:
                                if (!this.context.strict && this.context.allowYield && this.matchKeyword("yield")) {
                                    t = this.parseIdentifierName();
                                } else if (!this.context.strict && this.matchKeyword("let")) {
                                    t = this.finalize(e, new a.Identifier(this.nextToken().value));
                                } else {
                                    this.context.isAssignmentTarget = false;
                                    this.context.isBindingElement = false;
                                    if (this.matchKeyword("function")) {
                                        t = this.parseFunctionExpression();
                                    } else if (this.matchKeyword("this")) {
                                        this.nextToken();
                                        t = this.finalize(e, new a.ThisExpression());
                                    } else if (this.matchKeyword("class")) {
                                        t = this.parseClassExpression();
                                    } else {
                                        t = this.throwUnexpectedToken(this.nextToken());
                                    }
                                }
                                break;

                              default:
                                t = this.throwUnexpectedToken(this.nextToken());
                            }
                            return t;
                        };
                        e.prototype.parseSpreadElement = function() {
                            var e = this.createNode();
                            this.expect("...");
                            var t = this.inheritCoverGrammar(this.parseAssignmentExpression);
                            return this.finalize(e, new a.SpreadElement(t));
                        };
                        e.prototype.parseArrayInitializer = function() {
                            var e = this.createNode();
                            var t = [];
                            this.expect("[");
                            while (!this.match("]")) {
                                if (this.match(",")) {
                                    this.nextToken();
                                    t.push(null);
                                } else if (this.match("...")) {
                                    var r = this.parseSpreadElement();
                                    if (!this.match("]")) {
                                        this.context.isAssignmentTarget = false;
                                        this.context.isBindingElement = false;
                                        this.expect(",");
                                    }
                                    t.push(r);
                                } else {
                                    t.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                                    if (!this.match("]")) {
                                        this.expect(",");
                                    }
                                }
                            }
                            this.expect("]");
                            return this.finalize(e, new a.ArrayExpression(t));
                        };
                        e.prototype.parsePropertyMethod = function(e) {
                            this.context.isAssignmentTarget = false;
                            this.context.isBindingElement = false;
                            var t = this.context.strict;
                            var r = this.context.allowStrictDirective;
                            this.context.allowStrictDirective = e.simple;
                            var i = this.isolateCoverGrammar(this.parseFunctionSourceElements);
                            if (this.context.strict && e.firstRestricted) {
                                this.tolerateUnexpectedToken(e.firstRestricted, e.message);
                            }
                            if (this.context.strict && e.stricted) {
                                this.tolerateUnexpectedToken(e.stricted, e.message);
                            }
                            this.context.strict = t;
                            this.context.allowStrictDirective = r;
                            return i;
                        };
                        e.prototype.parsePropertyMethodFunction = function() {
                            var e = false;
                            var t = this.createNode();
                            var r = this.context.allowYield;
                            this.context.allowYield = true;
                            var i = this.parseFormalParameters();
                            var n = this.parsePropertyMethod(i);
                            this.context.allowYield = r;
                            return this.finalize(t, new a.FunctionExpression(null, i.params, n, e));
                        };
                        e.prototype.parsePropertyMethodAsyncFunction = function() {
                            var e = this.createNode();
                            var t = this.context.allowYield;
                            var r = this.context.await;
                            this.context.allowYield = false;
                            this.context.await = true;
                            var i = this.parseFormalParameters();
                            var n = this.parsePropertyMethod(i);
                            this.context.allowYield = t;
                            this.context.await = r;
                            return this.finalize(e, new a.AsyncFunctionExpression(null, i.params, n));
                        };
                        e.prototype.parseObjectPropertyKey = function() {
                            var e = this.createNode();
                            var t = this.nextToken();
                            var r;
                            switch (t.type) {
                              case 8:
                              case 6:
                                if (this.context.strict && t.octal) {
                                    this.tolerateUnexpectedToken(t, s.Messages.StrictOctalLiteral);
                                }
                                var i = this.getTokenRaw(t);
                                r = this.finalize(e, new a.Literal(t.value, i));
                                break;

                              case 3:
                              case 1:
                              case 5:
                              case 4:
                                r = this.finalize(e, new a.Identifier(t.value));
                                break;

                              case 7:
                                if (t.value === "[") {
                                    r = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                    this.expect("]");
                                } else {
                                    r = this.throwUnexpectedToken(t);
                                }
                                break;

                              default:
                                r = this.throwUnexpectedToken(t);
                            }
                            return r;
                        };
                        e.prototype.isPropertyKey = function(e, t) {
                            return e.type === u.Syntax.Identifier && e.name === t || e.type === u.Syntax.Literal && e.value === t;
                        };
                        e.prototype.parseObjectProperty = function(e) {
                            var t = this.createNode();
                            var r = this.lookahead;
                            var i;
                            var n = null;
                            var o = null;
                            var u = false;
                            var l = false;
                            var c = false;
                            var h = false;
                            if (r.type === 3) {
                                var p = r.value;
                                this.nextToken();
                                u = this.match("[");
                                h = !this.hasLineTerminator && p === "async" && !this.match(":") && !this.match("(") && !this.match("*") && !this.match(",");
                                n = h ? this.parseObjectPropertyKey() : this.finalize(t, new a.Identifier(p));
                            } else if (this.match("*")) {
                                this.nextToken();
                            } else {
                                u = this.match("[");
                                n = this.parseObjectPropertyKey();
                            }
                            var f = this.qualifiedPropertyName(this.lookahead);
                            if (r.type === 3 && !h && r.value === "get" && f) {
                                i = "get";
                                u = this.match("[");
                                n = this.parseObjectPropertyKey();
                                this.context.allowYield = false;
                                o = this.parseGetterMethod();
                            } else if (r.type === 3 && !h && r.value === "set" && f) {
                                i = "set";
                                u = this.match("[");
                                n = this.parseObjectPropertyKey();
                                o = this.parseSetterMethod();
                            } else if (r.type === 7 && r.value === "*" && f) {
                                i = "init";
                                u = this.match("[");
                                n = this.parseObjectPropertyKey();
                                o = this.parseGeneratorMethod();
                                l = true;
                            } else {
                                if (!n) {
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                                i = "init";
                                if (this.match(":") && !h) {
                                    if (!u && this.isPropertyKey(n, "__proto__")) {
                                        if (e.value) {
                                            this.tolerateError(s.Messages.DuplicateProtoProperty);
                                        }
                                        e.value = true;
                                    }
                                    this.nextToken();
                                    o = this.inheritCoverGrammar(this.parseAssignmentExpression);
                                } else if (this.match("(")) {
                                    o = h ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
                                    l = true;
                                } else if (r.type === 3) {
                                    var p = this.finalize(t, new a.Identifier(r.value));
                                    if (this.match("=")) {
                                        this.context.firstCoverInitializedNameError = this.lookahead;
                                        this.nextToken();
                                        c = true;
                                        var d = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                        o = this.finalize(t, new a.AssignmentPattern(p, d));
                                    } else {
                                        c = true;
                                        o = p;
                                    }
                                } else {
                                    this.throwUnexpectedToken(this.nextToken());
                                }
                            }
                            return this.finalize(t, new a.Property(i, n, u, o, l, c));
                        };
                        e.prototype.parseObjectInitializer = function() {
                            var e = this.createNode();
                            this.expect("{");
                            var t = [];
                            var r = {
                                value: false
                            };
                            while (!this.match("}")) {
                                t.push(this.parseObjectProperty(r));
                                if (!this.match("}")) {
                                    this.expectCommaSeparator();
                                }
                            }
                            this.expect("}");
                            return this.finalize(e, new a.ObjectExpression(t));
                        };
                        e.prototype.parseTemplateHead = function() {
                            i.assert(this.lookahead.head, "Template literal must start with a template head");
                            var e = this.createNode();
                            var t = this.nextToken();
                            var r = t.value;
                            var n = t.cooked;
                            return this.finalize(e, new a.TemplateElement({
                                raw: r,
                                cooked: n
                            }, t.tail));
                        };
                        e.prototype.parseTemplateElement = function() {
                            if (this.lookahead.type !== 10) {
                                this.throwUnexpectedToken();
                            }
                            var e = this.createNode();
                            var t = this.nextToken();
                            var r = t.value;
                            var i = t.cooked;
                            return this.finalize(e, new a.TemplateElement({
                                raw: r,
                                cooked: i
                            }, t.tail));
                        };
                        e.prototype.parseTemplateLiteral = function() {
                            var e = this.createNode();
                            var t = [];
                            var r = [];
                            var i = this.parseTemplateHead();
                            r.push(i);
                            while (!i.tail) {
                                t.push(this.parseExpression());
                                i = this.parseTemplateElement();
                                r.push(i);
                            }
                            return this.finalize(e, new a.TemplateLiteral(r, t));
                        };
                        e.prototype.reinterpretExpressionAsPattern = function(e) {
                            switch (e.type) {
                              case u.Syntax.Identifier:
                              case u.Syntax.MemberExpression:
                              case u.Syntax.RestElement:
                              case u.Syntax.AssignmentPattern:
                                break;

                              case u.Syntax.SpreadElement:
                                e.type = u.Syntax.RestElement;
                                this.reinterpretExpressionAsPattern(e.argument);
                                break;

                              case u.Syntax.ArrayExpression:
                                e.type = u.Syntax.ArrayPattern;
                                for (var t = 0; t < e.elements.length; t++) {
                                    if (e.elements[t] !== null) {
                                        this.reinterpretExpressionAsPattern(e.elements[t]);
                                    }
                                }
                                break;

                              case u.Syntax.ObjectExpression:
                                e.type = u.Syntax.ObjectPattern;
                                for (var t = 0; t < e.properties.length; t++) {
                                    this.reinterpretExpressionAsPattern(e.properties[t].value);
                                }
                                break;

                              case u.Syntax.AssignmentExpression:
                                e.type = u.Syntax.AssignmentPattern;
                                delete e.operator;
                                this.reinterpretExpressionAsPattern(e.left);
                                break;

                              default:
                                break;
                            }
                        };
                        e.prototype.parseGroupExpression = function() {
                            var e;
                            this.expect("(");
                            if (this.match(")")) {
                                this.nextToken();
                                if (!this.match("=>")) {
                                    this.expect("=>");
                                }
                                e = {
                                    type: c,
                                    params: [],
                                    async: false
                                };
                            } else {
                                var t = this.lookahead;
                                var r = [];
                                if (this.match("...")) {
                                    e = this.parseRestElement(r);
                                    this.expect(")");
                                    if (!this.match("=>")) {
                                        this.expect("=>");
                                    }
                                    e = {
                                        type: c,
                                        params: [ e ],
                                        async: false
                                    };
                                } else {
                                    var i = false;
                                    this.context.isBindingElement = true;
                                    e = this.inheritCoverGrammar(this.parseAssignmentExpression);
                                    if (this.match(",")) {
                                        var n = [];
                                        this.context.isAssignmentTarget = false;
                                        n.push(e);
                                        while (this.lookahead.type !== 2) {
                                            if (!this.match(",")) {
                                                break;
                                            }
                                            this.nextToken();
                                            if (this.match(")")) {
                                                this.nextToken();
                                                for (var s = 0; s < n.length; s++) {
                                                    this.reinterpretExpressionAsPattern(n[s]);
                                                }
                                                i = true;
                                                e = {
                                                    type: c,
                                                    params: n,
                                                    async: false
                                                };
                                            } else if (this.match("...")) {
                                                if (!this.context.isBindingElement) {
                                                    this.throwUnexpectedToken(this.lookahead);
                                                }
                                                n.push(this.parseRestElement(r));
                                                this.expect(")");
                                                if (!this.match("=>")) {
                                                    this.expect("=>");
                                                }
                                                this.context.isBindingElement = false;
                                                for (var s = 0; s < n.length; s++) {
                                                    this.reinterpretExpressionAsPattern(n[s]);
                                                }
                                                i = true;
                                                e = {
                                                    type: c,
                                                    params: n,
                                                    async: false
                                                };
                                            } else {
                                                n.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                                            }
                                            if (i) {
                                                break;
                                            }
                                        }
                                        if (!i) {
                                            e = this.finalize(this.startNode(t), new a.SequenceExpression(n));
                                        }
                                    }
                                    if (!i) {
                                        this.expect(")");
                                        if (this.match("=>")) {
                                            if (e.type === u.Syntax.Identifier && e.name === "yield") {
                                                i = true;
                                                e = {
                                                    type: c,
                                                    params: [ e ],
                                                    async: false
                                                };
                                            }
                                            if (!i) {
                                                if (!this.context.isBindingElement) {
                                                    this.throwUnexpectedToken(this.lookahead);
                                                }
                                                if (e.type === u.Syntax.SequenceExpression) {
                                                    for (var s = 0; s < e.expressions.length; s++) {
                                                        this.reinterpretExpressionAsPattern(e.expressions[s]);
                                                    }
                                                } else {
                                                    this.reinterpretExpressionAsPattern(e);
                                                }
                                                var o = e.type === u.Syntax.SequenceExpression ? e.expressions : [ e ];
                                                e = {
                                                    type: c,
                                                    params: o,
                                                    async: false
                                                };
                                            }
                                        }
                                        this.context.isBindingElement = false;
                                    }
                                }
                            }
                            return e;
                        };
                        e.prototype.parseArguments = function() {
                            this.expect("(");
                            var e = [];
                            if (!this.match(")")) {
                                while (true) {
                                    var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
                                    e.push(t);
                                    if (this.match(")")) {
                                        break;
                                    }
                                    this.expectCommaSeparator();
                                    if (this.match(")")) {
                                        break;
                                    }
                                }
                            }
                            this.expect(")");
                            return e;
                        };
                        e.prototype.isIdentifierName = function(e) {
                            return e.type === 3 || e.type === 4 || e.type === 1 || e.type === 5;
                        };
                        e.prototype.parseIdentifierName = function() {
                            var e = this.createNode();
                            var t = this.nextToken();
                            if (!this.isIdentifierName(t)) {
                                this.throwUnexpectedToken(t);
                            }
                            return this.finalize(e, new a.Identifier(t.value));
                        };
                        e.prototype.parseNewExpression = function() {
                            var e = this.createNode();
                            var t = this.parseIdentifierName();
                            i.assert(t.name === "new", "New expression must start with `new`");
                            var r;
                            if (this.match(".")) {
                                this.nextToken();
                                if (this.lookahead.type === 3 && this.context.inFunctionBody && this.lookahead.value === "target") {
                                    var n = this.parseIdentifierName();
                                    r = new a.MetaProperty(t, n);
                                } else {
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                            } else {
                                var s = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
                                var o = this.match("(") ? this.parseArguments() : [];
                                r = new a.NewExpression(s, o);
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                            }
                            return this.finalize(e, r);
                        };
                        e.prototype.parseAsyncArgument = function() {
                            var e = this.parseAssignmentExpression();
                            this.context.firstCoverInitializedNameError = null;
                            return e;
                        };
                        e.prototype.parseAsyncArguments = function() {
                            this.expect("(");
                            var e = [];
                            if (!this.match(")")) {
                                while (true) {
                                    var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
                                    e.push(t);
                                    if (this.match(")")) {
                                        break;
                                    }
                                    this.expectCommaSeparator();
                                    if (this.match(")")) {
                                        break;
                                    }
                                }
                            }
                            this.expect(")");
                            return e;
                        };
                        e.prototype.parseLeftHandSideExpressionAllowCall = function() {
                            var e = this.lookahead;
                            var t = this.matchContextualKeyword("async");
                            var r = this.context.allowIn;
                            this.context.allowIn = true;
                            var i;
                            if (this.matchKeyword("super") && this.context.inFunctionBody) {
                                i = this.createNode();
                                this.nextToken();
                                i = this.finalize(i, new a.Super());
                                if (!this.match("(") && !this.match(".") && !this.match("[")) {
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                            } else {
                                i = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression);
                            }
                            while (true) {
                                if (this.match(".")) {
                                    this.context.isBindingElement = false;
                                    this.context.isAssignmentTarget = true;
                                    this.expect(".");
                                    var n = this.parseIdentifierName();
                                    i = this.finalize(this.startNode(e), new a.StaticMemberExpression(i, n));
                                } else if (this.match("(")) {
                                    var s = t && e.lineNumber === this.lookahead.lineNumber;
                                    this.context.isBindingElement = false;
                                    this.context.isAssignmentTarget = false;
                                    var o = s ? this.parseAsyncArguments() : this.parseArguments();
                                    i = this.finalize(this.startNode(e), new a.CallExpression(i, o));
                                    if (s && this.match("=>")) {
                                        for (var u = 0; u < o.length; ++u) {
                                            this.reinterpretExpressionAsPattern(o[u]);
                                        }
                                        i = {
                                            type: c,
                                            params: o,
                                            async: true
                                        };
                                    }
                                } else if (this.match("[")) {
                                    this.context.isBindingElement = false;
                                    this.context.isAssignmentTarget = true;
                                    this.expect("[");
                                    var n = this.isolateCoverGrammar(this.parseExpression);
                                    this.expect("]");
                                    i = this.finalize(this.startNode(e), new a.ComputedMemberExpression(i, n));
                                } else if (this.lookahead.type === 10 && this.lookahead.head) {
                                    var l = this.parseTemplateLiteral();
                                    i = this.finalize(this.startNode(e), new a.TaggedTemplateExpression(i, l));
                                } else {
                                    break;
                                }
                            }
                            this.context.allowIn = r;
                            return i;
                        };
                        e.prototype.parseSuper = function() {
                            var e = this.createNode();
                            this.expectKeyword("super");
                            if (!this.match("[") && !this.match(".")) {
                                this.throwUnexpectedToken(this.lookahead);
                            }
                            return this.finalize(e, new a.Super());
                        };
                        e.prototype.parseLeftHandSideExpression = function() {
                            i.assert(this.context.allowIn, "callee of new expression always allow in keyword.");
                            var e = this.startNode(this.lookahead);
                            var t = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression);
                            while (true) {
                                if (this.match("[")) {
                                    this.context.isBindingElement = false;
                                    this.context.isAssignmentTarget = true;
                                    this.expect("[");
                                    var r = this.isolateCoverGrammar(this.parseExpression);
                                    this.expect("]");
                                    t = this.finalize(e, new a.ComputedMemberExpression(t, r));
                                } else if (this.match(".")) {
                                    this.context.isBindingElement = false;
                                    this.context.isAssignmentTarget = true;
                                    this.expect(".");
                                    var r = this.parseIdentifierName();
                                    t = this.finalize(e, new a.StaticMemberExpression(t, r));
                                } else if (this.lookahead.type === 10 && this.lookahead.head) {
                                    var n = this.parseTemplateLiteral();
                                    t = this.finalize(e, new a.TaggedTemplateExpression(t, n));
                                } else {
                                    break;
                                }
                            }
                            return t;
                        };
                        e.prototype.parseUpdateExpression = function() {
                            var e;
                            var t = this.lookahead;
                            if (this.match("++") || this.match("--")) {
                                var r = this.startNode(t);
                                var i = this.nextToken();
                                e = this.inheritCoverGrammar(this.parseUnaryExpression);
                                if (this.context.strict && e.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(e.name)) {
                                    this.tolerateError(s.Messages.StrictLHSPrefix);
                                }
                                if (!this.context.isAssignmentTarget) {
                                    this.tolerateError(s.Messages.InvalidLHSInAssignment);
                                }
                                var n = true;
                                e = this.finalize(r, new a.UpdateExpression(i.value, e, n));
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                            } else {
                                e = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
                                if (!this.hasLineTerminator && this.lookahead.type === 7) {
                                    if (this.match("++") || this.match("--")) {
                                        if (this.context.strict && e.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(e.name)) {
                                            this.tolerateError(s.Messages.StrictLHSPostfix);
                                        }
                                        if (!this.context.isAssignmentTarget) {
                                            this.tolerateError(s.Messages.InvalidLHSInAssignment);
                                        }
                                        this.context.isAssignmentTarget = false;
                                        this.context.isBindingElement = false;
                                        var o = this.nextToken().value;
                                        var n = false;
                                        e = this.finalize(this.startNode(t), new a.UpdateExpression(o, e, n));
                                    }
                                }
                            }
                            return e;
                        };
                        e.prototype.parseAwaitExpression = function() {
                            var e = this.createNode();
                            this.nextToken();
                            var t = this.parseUnaryExpression();
                            return this.finalize(e, new a.AwaitExpression(t));
                        };
                        e.prototype.parseUnaryExpression = function() {
                            var e;
                            if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
                                var t = this.startNode(this.lookahead);
                                var r = this.nextToken();
                                e = this.inheritCoverGrammar(this.parseUnaryExpression);
                                e = this.finalize(t, new a.UnaryExpression(r.value, e));
                                if (this.context.strict && e.operator === "delete" && e.argument.type === u.Syntax.Identifier) {
                                    this.tolerateError(s.Messages.StrictDelete);
                                }
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                            } else if (this.context.await && this.matchContextualKeyword("await")) {
                                e = this.parseAwaitExpression();
                            } else {
                                e = this.parseUpdateExpression();
                            }
                            return e;
                        };
                        e.prototype.parseExponentiationExpression = function() {
                            var e = this.lookahead;
                            var t = this.inheritCoverGrammar(this.parseUnaryExpression);
                            if (t.type !== u.Syntax.UnaryExpression && this.match("**")) {
                                this.nextToken();
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                                var r = t;
                                var i = this.isolateCoverGrammar(this.parseExponentiationExpression);
                                t = this.finalize(this.startNode(e), new a.BinaryExpression("**", r, i));
                            }
                            return t;
                        };
                        e.prototype.binaryPrecedence = function(e) {
                            var t = e.value;
                            var r;
                            if (e.type === 7) {
                                r = this.operatorPrecedence[t] || 0;
                            } else if (e.type === 4) {
                                r = t === "instanceof" || this.context.allowIn && t === "in" ? 7 : 0;
                            } else {
                                r = 0;
                            }
                            return r;
                        };
                        e.prototype.parseBinaryExpression = function() {
                            var e = this.lookahead;
                            var t = this.inheritCoverGrammar(this.parseExponentiationExpression);
                            var r = this.lookahead;
                            var i = this.binaryPrecedence(r);
                            if (i > 0) {
                                this.nextToken();
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                                var n = [ e, this.lookahead ];
                                var s = t;
                                var o = this.isolateCoverGrammar(this.parseExponentiationExpression);
                                var u = [ s, r.value, o ];
                                var l = [ i ];
                                while (true) {
                                    i = this.binaryPrecedence(this.lookahead);
                                    if (i <= 0) {
                                        break;
                                    }
                                    while (u.length > 2 && i <= l[l.length - 1]) {
                                        o = u.pop();
                                        var c = u.pop();
                                        l.pop();
                                        s = u.pop();
                                        n.pop();
                                        var h = this.startNode(n[n.length - 1]);
                                        u.push(this.finalize(h, new a.BinaryExpression(c, s, o)));
                                    }
                                    u.push(this.nextToken().value);
                                    l.push(i);
                                    n.push(this.lookahead);
                                    u.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
                                }
                                var p = u.length - 1;
                                t = u[p];
                                var f = n.pop();
                                while (p > 1) {
                                    var d = n.pop();
                                    var m = f && f.lineStart;
                                    var h = this.startNode(d, m);
                                    var c = u[p - 1];
                                    t = this.finalize(h, new a.BinaryExpression(c, u[p - 2], t));
                                    p -= 2;
                                    f = d;
                                }
                            }
                            return t;
                        };
                        e.prototype.parseConditionalExpression = function() {
                            var e = this.lookahead;
                            var t = this.inheritCoverGrammar(this.parseBinaryExpression);
                            if (this.match("?")) {
                                this.nextToken();
                                var r = this.context.allowIn;
                                this.context.allowIn = true;
                                var i = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                this.context.allowIn = r;
                                this.expect(":");
                                var n = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                t = this.finalize(this.startNode(e), new a.ConditionalExpression(t, i, n));
                                this.context.isAssignmentTarget = false;
                                this.context.isBindingElement = false;
                            }
                            return t;
                        };
                        e.prototype.checkPatternParam = function(e, t) {
                            switch (t.type) {
                              case u.Syntax.Identifier:
                                this.validateParam(e, t, t.name);
                                break;

                              case u.Syntax.RestElement:
                                this.checkPatternParam(e, t.argument);
                                break;

                              case u.Syntax.AssignmentPattern:
                                this.checkPatternParam(e, t.left);
                                break;

                              case u.Syntax.ArrayPattern:
                                for (var r = 0; r < t.elements.length; r++) {
                                    if (t.elements[r] !== null) {
                                        this.checkPatternParam(e, t.elements[r]);
                                    }
                                }
                                break;

                              case u.Syntax.ObjectPattern:
                                for (var r = 0; r < t.properties.length; r++) {
                                    this.checkPatternParam(e, t.properties[r].value);
                                }
                                break;

                              default:
                                break;
                            }
                            e.simple = e.simple && t instanceof a.Identifier;
                        };
                        e.prototype.reinterpretAsCoverFormalsList = function(e) {
                            var t = [ e ];
                            var r;
                            var i = false;
                            switch (e.type) {
                              case u.Syntax.Identifier:
                                break;

                              case c:
                                t = e.params;
                                i = e.async;
                                break;

                              default:
                                return null;
                            }
                            r = {
                                simple: true,
                                paramSet: {}
                            };
                            for (var n = 0; n < t.length; ++n) {
                                var a = t[n];
                                if (a.type === u.Syntax.AssignmentPattern) {
                                    if (a.right.type === u.Syntax.YieldExpression) {
                                        if (a.right.argument) {
                                            this.throwUnexpectedToken(this.lookahead);
                                        }
                                        a.right.type = u.Syntax.Identifier;
                                        a.right.name = "yield";
                                        delete a.right.argument;
                                        delete a.right.delegate;
                                    }
                                } else if (i && a.type === u.Syntax.Identifier && a.name === "await") {
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                                this.checkPatternParam(r, a);
                                t[n] = a;
                            }
                            if (this.context.strict || !this.context.allowYield) {
                                for (var n = 0; n < t.length; ++n) {
                                    var a = t[n];
                                    if (a.type === u.Syntax.YieldExpression) {
                                        this.throwUnexpectedToken(this.lookahead);
                                    }
                                }
                            }
                            if (r.message === s.Messages.StrictParamDupe) {
                                var o = this.context.strict ? r.stricted : r.firstRestricted;
                                this.throwUnexpectedToken(o, r.message);
                            }
                            return {
                                simple: r.simple,
                                params: t,
                                stricted: r.stricted,
                                firstRestricted: r.firstRestricted,
                                message: r.message
                            };
                        };
                        e.prototype.parseAssignmentExpression = function() {
                            var e;
                            if (!this.context.allowYield && this.matchKeyword("yield")) {
                                e = this.parseYieldExpression();
                            } else {
                                var t = this.lookahead;
                                var r = t;
                                e = this.parseConditionalExpression();
                                if (r.type === 3 && r.lineNumber === this.lookahead.lineNumber && r.value === "async") {
                                    if (this.lookahead.type === 3 || this.matchKeyword("yield")) {
                                        var i = this.parsePrimaryExpression();
                                        this.reinterpretExpressionAsPattern(i);
                                        e = {
                                            type: c,
                                            params: [ i ],
                                            async: true
                                        };
                                    }
                                }
                                if (e.type === c || this.match("=>")) {
                                    this.context.isAssignmentTarget = false;
                                    this.context.isBindingElement = false;
                                    var n = e.async;
                                    var o = this.reinterpretAsCoverFormalsList(e);
                                    if (o) {
                                        if (this.hasLineTerminator) {
                                            this.tolerateUnexpectedToken(this.lookahead);
                                        }
                                        this.context.firstCoverInitializedNameError = null;
                                        var l = this.context.strict;
                                        var h = this.context.allowStrictDirective;
                                        this.context.allowStrictDirective = o.simple;
                                        var p = this.context.allowYield;
                                        var f = this.context.await;
                                        this.context.allowYield = true;
                                        this.context.await = n;
                                        var d = this.startNode(t);
                                        this.expect("=>");
                                        var m = void 0;
                                        if (this.match("{")) {
                                            var v = this.context.allowIn;
                                            this.context.allowIn = true;
                                            m = this.parseFunctionSourceElements();
                                            this.context.allowIn = v;
                                        } else {
                                            m = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                        }
                                        var y = m.type !== u.Syntax.BlockStatement;
                                        if (this.context.strict && o.firstRestricted) {
                                            this.throwUnexpectedToken(o.firstRestricted, o.message);
                                        }
                                        if (this.context.strict && o.stricted) {
                                            this.tolerateUnexpectedToken(o.stricted, o.message);
                                        }
                                        e = n ? this.finalize(d, new a.AsyncArrowFunctionExpression(o.params, m, y)) : this.finalize(d, new a.ArrowFunctionExpression(o.params, m, y));
                                        this.context.strict = l;
                                        this.context.allowStrictDirective = h;
                                        this.context.allowYield = p;
                                        this.context.await = f;
                                    }
                                } else {
                                    if (this.matchAssign()) {
                                        if (!this.context.isAssignmentTarget) {
                                            this.tolerateError(s.Messages.InvalidLHSInAssignment);
                                        }
                                        if (this.context.strict && e.type === u.Syntax.Identifier) {
                                            var x = e;
                                            if (this.scanner.isRestrictedWord(x.name)) {
                                                this.tolerateUnexpectedToken(r, s.Messages.StrictLHSAssignment);
                                            }
                                            if (this.scanner.isStrictModeReservedWord(x.name)) {
                                                this.tolerateUnexpectedToken(r, s.Messages.StrictReservedWord);
                                            }
                                        }
                                        if (!this.match("=")) {
                                            this.context.isAssignmentTarget = false;
                                            this.context.isBindingElement = false;
                                        } else {
                                            this.reinterpretExpressionAsPattern(e);
                                        }
                                        r = this.nextToken();
                                        var g = r.value;
                                        var b = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                        e = this.finalize(this.startNode(t), new a.AssignmentExpression(g, e, b));
                                        this.context.firstCoverInitializedNameError = null;
                                    }
                                }
                            }
                            return e;
                        };
                        e.prototype.parseExpression = function() {
                            var e = this.lookahead;
                            var t = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            if (this.match(",")) {
                                var r = [];
                                r.push(t);
                                while (this.lookahead.type !== 2) {
                                    if (!this.match(",")) {
                                        break;
                                    }
                                    this.nextToken();
                                    r.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                                }
                                t = this.finalize(this.startNode(e), new a.SequenceExpression(r));
                            }
                            return t;
                        };
                        e.prototype.parseStatementListItem = function() {
                            var e;
                            this.context.isAssignmentTarget = true;
                            this.context.isBindingElement = true;
                            if (this.lookahead.type === 4) {
                                switch (this.lookahead.value) {
                                  case "export":
                                    if (!this.context.isModule) {
                                        this.tolerateUnexpectedToken(this.lookahead, s.Messages.IllegalExportDeclaration);
                                    }
                                    e = this.parseExportDeclaration();
                                    break;

                                  case "import":
                                    if (!this.context.isModule) {
                                        this.tolerateUnexpectedToken(this.lookahead, s.Messages.IllegalImportDeclaration);
                                    }
                                    e = this.parseImportDeclaration();
                                    break;

                                  case "const":
                                    e = this.parseLexicalDeclaration({
                                        inFor: false
                                    });
                                    break;

                                  case "function":
                                    e = this.parseFunctionDeclaration();
                                    break;

                                  case "class":
                                    e = this.parseClassDeclaration();
                                    break;

                                  case "let":
                                    e = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({
                                        inFor: false
                                    }) : this.parseStatement();
                                    break;

                                  default:
                                    e = this.parseStatement();
                                    break;
                                }
                            } else {
                                e = this.parseStatement();
                            }
                            return e;
                        };
                        e.prototype.parseBlock = function() {
                            var e = this.createNode();
                            this.expect("{");
                            var t = [];
                            while (true) {
                                if (this.match("}")) {
                                    break;
                                }
                                t.push(this.parseStatementListItem());
                            }
                            this.expect("}");
                            return this.finalize(e, new a.BlockStatement(t));
                        };
                        e.prototype.parseLexicalBinding = function(e, t) {
                            var r = this.createNode();
                            var i = [];
                            var n = this.parsePattern(i, e);
                            if (this.context.strict && n.type === u.Syntax.Identifier) {
                                if (this.scanner.isRestrictedWord(n.name)) {
                                    this.tolerateError(s.Messages.StrictVarName);
                                }
                            }
                            var o = null;
                            if (e === "const") {
                                if (!this.matchKeyword("in") && !this.matchContextualKeyword("of")) {
                                    if (this.match("=")) {
                                        this.nextToken();
                                        o = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                    } else {
                                        this.throwError(s.Messages.DeclarationMissingInitializer, "const");
                                    }
                                }
                            } else if (!t.inFor && n.type !== u.Syntax.Identifier || this.match("=")) {
                                this.expect("=");
                                o = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            }
                            return this.finalize(r, new a.VariableDeclarator(n, o));
                        };
                        e.prototype.parseBindingList = function(e, t) {
                            var r = [ this.parseLexicalBinding(e, t) ];
                            while (this.match(",")) {
                                this.nextToken();
                                r.push(this.parseLexicalBinding(e, t));
                            }
                            return r;
                        };
                        e.prototype.isLexicalDeclaration = function() {
                            var e = this.scanner.saveState();
                            this.scanner.scanComments();
                            var t = this.scanner.lex();
                            this.scanner.restoreState(e);
                            return t.type === 3 || t.type === 7 && t.value === "[" || t.type === 7 && t.value === "{" || t.type === 4 && t.value === "let" || t.type === 4 && t.value === "yield";
                        };
                        e.prototype.parseLexicalDeclaration = function(e) {
                            var t = this.createNode();
                            var r = this.nextToken().value;
                            i.assert(r === "let" || r === "const", "Lexical declaration must be either let or const");
                            var n = this.parseBindingList(r, e);
                            this.consumeSemicolon();
                            return this.finalize(t, new a.VariableDeclaration(n, r));
                        };
                        e.prototype.parseBindingRestElement = function(e, t) {
                            var r = this.createNode();
                            this.expect("...");
                            var i = this.parsePattern(e, t);
                            return this.finalize(r, new a.RestElement(i));
                        };
                        e.prototype.parseArrayPattern = function(e, t) {
                            var r = this.createNode();
                            this.expect("[");
                            var i = [];
                            while (!this.match("]")) {
                                if (this.match(",")) {
                                    this.nextToken();
                                    i.push(null);
                                } else {
                                    if (this.match("...")) {
                                        i.push(this.parseBindingRestElement(e, t));
                                        break;
                                    } else {
                                        i.push(this.parsePatternWithDefault(e, t));
                                    }
                                    if (!this.match("]")) {
                                        this.expect(",");
                                    }
                                }
                            }
                            this.expect("]");
                            return this.finalize(r, new a.ArrayPattern(i));
                        };
                        e.prototype.parsePropertyPattern = function(e, t) {
                            var r = this.createNode();
                            var i = false;
                            var n = false;
                            var s = false;
                            var o;
                            var u;
                            if (this.lookahead.type === 3) {
                                var l = this.lookahead;
                                o = this.parseVariableIdentifier();
                                var c = this.finalize(r, new a.Identifier(l.value));
                                if (this.match("=")) {
                                    e.push(l);
                                    n = true;
                                    this.nextToken();
                                    var h = this.parseAssignmentExpression();
                                    u = this.finalize(this.startNode(l), new a.AssignmentPattern(c, h));
                                } else if (!this.match(":")) {
                                    e.push(l);
                                    n = true;
                                    u = c;
                                } else {
                                    this.expect(":");
                                    u = this.parsePatternWithDefault(e, t);
                                }
                            } else {
                                i = this.match("[");
                                o = this.parseObjectPropertyKey();
                                this.expect(":");
                                u = this.parsePatternWithDefault(e, t);
                            }
                            return this.finalize(r, new a.Property("init", o, i, u, s, n));
                        };
                        e.prototype.parseObjectPattern = function(e, t) {
                            var r = this.createNode();
                            var i = [];
                            this.expect("{");
                            while (!this.match("}")) {
                                i.push(this.parsePropertyPattern(e, t));
                                if (!this.match("}")) {
                                    this.expect(",");
                                }
                            }
                            this.expect("}");
                            return this.finalize(r, new a.ObjectPattern(i));
                        };
                        e.prototype.parsePattern = function(e, t) {
                            var r;
                            if (this.match("[")) {
                                r = this.parseArrayPattern(e, t);
                            } else if (this.match("{")) {
                                r = this.parseObjectPattern(e, t);
                            } else {
                                if (this.matchKeyword("let") && (t === "const" || t === "let")) {
                                    this.tolerateUnexpectedToken(this.lookahead, s.Messages.LetInLexicalBinding);
                                }
                                e.push(this.lookahead);
                                r = this.parseVariableIdentifier(t);
                            }
                            return r;
                        };
                        e.prototype.parsePatternWithDefault = function(e, t) {
                            var r = this.lookahead;
                            var i = this.parsePattern(e, t);
                            if (this.match("=")) {
                                this.nextToken();
                                var n = this.context.allowYield;
                                this.context.allowYield = true;
                                var s = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                this.context.allowYield = n;
                                i = this.finalize(this.startNode(r), new a.AssignmentPattern(i, s));
                            }
                            return i;
                        };
                        e.prototype.parseVariableIdentifier = function(e) {
                            var t = this.createNode();
                            var r = this.nextToken();
                            if (r.type === 4 && r.value === "yield") {
                                if (this.context.strict) {
                                    this.tolerateUnexpectedToken(r, s.Messages.StrictReservedWord);
                                } else if (!this.context.allowYield) {
                                    this.throwUnexpectedToken(r);
                                }
                            } else if (r.type !== 3) {
                                if (this.context.strict && r.type === 4 && this.scanner.isStrictModeReservedWord(r.value)) {
                                    this.tolerateUnexpectedToken(r, s.Messages.StrictReservedWord);
                                } else {
                                    if (this.context.strict || r.value !== "let" || e !== "var") {
                                        this.throwUnexpectedToken(r);
                                    }
                                }
                            } else if ((this.context.isModule || this.context.await) && r.type === 3 && r.value === "await") {
                                this.tolerateUnexpectedToken(r);
                            }
                            return this.finalize(t, new a.Identifier(r.value));
                        };
                        e.prototype.parseVariableDeclaration = function(e) {
                            var t = this.createNode();
                            var r = [];
                            var i = this.parsePattern(r, "var");
                            if (this.context.strict && i.type === u.Syntax.Identifier) {
                                if (this.scanner.isRestrictedWord(i.name)) {
                                    this.tolerateError(s.Messages.StrictVarName);
                                }
                            }
                            var n = null;
                            if (this.match("=")) {
                                this.nextToken();
                                n = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            } else if (i.type !== u.Syntax.Identifier && !e.inFor) {
                                this.expect("=");
                            }
                            return this.finalize(t, new a.VariableDeclarator(i, n));
                        };
                        e.prototype.parseVariableDeclarationList = function(e) {
                            var t = {
                                inFor: e.inFor
                            };
                            var r = [];
                            r.push(this.parseVariableDeclaration(t));
                            while (this.match(",")) {
                                this.nextToken();
                                r.push(this.parseVariableDeclaration(t));
                            }
                            return r;
                        };
                        e.prototype.parseVariableStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("var");
                            var t = this.parseVariableDeclarationList({
                                inFor: false
                            });
                            this.consumeSemicolon();
                            return this.finalize(e, new a.VariableDeclaration(t, "var"));
                        };
                        e.prototype.parseEmptyStatement = function() {
                            var e = this.createNode();
                            this.expect(";");
                            return this.finalize(e, new a.EmptyStatement());
                        };
                        e.prototype.parseExpressionStatement = function() {
                            var e = this.createNode();
                            var t = this.parseExpression();
                            this.consumeSemicolon();
                            return this.finalize(e, new a.ExpressionStatement(t));
                        };
                        e.prototype.parseIfClause = function() {
                            if (this.context.strict && this.matchKeyword("function")) {
                                this.tolerateError(s.Messages.StrictFunction);
                            }
                            return this.parseStatement();
                        };
                        e.prototype.parseIfStatement = function() {
                            var e = this.createNode();
                            var t;
                            var r = null;
                            this.expectKeyword("if");
                            this.expect("(");
                            var i = this.parseExpression();
                            if (!this.match(")") && this.config.tolerant) {
                                this.tolerateUnexpectedToken(this.nextToken());
                                t = this.finalize(this.createNode(), new a.EmptyStatement());
                            } else {
                                this.expect(")");
                                t = this.parseIfClause();
                                if (this.matchKeyword("else")) {
                                    this.nextToken();
                                    r = this.parseIfClause();
                                }
                            }
                            return this.finalize(e, new a.IfStatement(i, t, r));
                        };
                        e.prototype.parseDoWhileStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("do");
                            var t = this.context.inIteration;
                            this.context.inIteration = true;
                            var r = this.parseStatement();
                            this.context.inIteration = t;
                            this.expectKeyword("while");
                            this.expect("(");
                            var i = this.parseExpression();
                            if (!this.match(")") && this.config.tolerant) {
                                this.tolerateUnexpectedToken(this.nextToken());
                            } else {
                                this.expect(")");
                                if (this.match(";")) {
                                    this.nextToken();
                                }
                            }
                            return this.finalize(e, new a.DoWhileStatement(r, i));
                        };
                        e.prototype.parseWhileStatement = function() {
                            var e = this.createNode();
                            var t;
                            this.expectKeyword("while");
                            this.expect("(");
                            var r = this.parseExpression();
                            if (!this.match(")") && this.config.tolerant) {
                                this.tolerateUnexpectedToken(this.nextToken());
                                t = this.finalize(this.createNode(), new a.EmptyStatement());
                            } else {
                                this.expect(")");
                                var i = this.context.inIteration;
                                this.context.inIteration = true;
                                t = this.parseStatement();
                                this.context.inIteration = i;
                            }
                            return this.finalize(e, new a.WhileStatement(r, t));
                        };
                        e.prototype.parseForStatement = function() {
                            var e = null;
                            var t = null;
                            var r = null;
                            var i = true;
                            var n, o;
                            var l = this.createNode();
                            this.expectKeyword("for");
                            this.expect("(");
                            if (this.match(";")) {
                                this.nextToken();
                            } else {
                                if (this.matchKeyword("var")) {
                                    e = this.createNode();
                                    this.nextToken();
                                    var c = this.context.allowIn;
                                    this.context.allowIn = false;
                                    var h = this.parseVariableDeclarationList({
                                        inFor: true
                                    });
                                    this.context.allowIn = c;
                                    if (h.length === 1 && this.matchKeyword("in")) {
                                        var p = h[0];
                                        if (p.init && (p.id.type === u.Syntax.ArrayPattern || p.id.type === u.Syntax.ObjectPattern || this.context.strict)) {
                                            this.tolerateError(s.Messages.ForInOfLoopInitializer, "for-in");
                                        }
                                        e = this.finalize(e, new a.VariableDeclaration(h, "var"));
                                        this.nextToken();
                                        n = e;
                                        o = this.parseExpression();
                                        e = null;
                                    } else if (h.length === 1 && h[0].init === null && this.matchContextualKeyword("of")) {
                                        e = this.finalize(e, new a.VariableDeclaration(h, "var"));
                                        this.nextToken();
                                        n = e;
                                        o = this.parseAssignmentExpression();
                                        e = null;
                                        i = false;
                                    } else {
                                        e = this.finalize(e, new a.VariableDeclaration(h, "var"));
                                        this.expect(";");
                                    }
                                } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
                                    e = this.createNode();
                                    var f = this.nextToken().value;
                                    if (!this.context.strict && this.lookahead.value === "in") {
                                        e = this.finalize(e, new a.Identifier(f));
                                        this.nextToken();
                                        n = e;
                                        o = this.parseExpression();
                                        e = null;
                                    } else {
                                        var c = this.context.allowIn;
                                        this.context.allowIn = false;
                                        var h = this.parseBindingList(f, {
                                            inFor: true
                                        });
                                        this.context.allowIn = c;
                                        if (h.length === 1 && h[0].init === null && this.matchKeyword("in")) {
                                            e = this.finalize(e, new a.VariableDeclaration(h, f));
                                            this.nextToken();
                                            n = e;
                                            o = this.parseExpression();
                                            e = null;
                                        } else if (h.length === 1 && h[0].init === null && this.matchContextualKeyword("of")) {
                                            e = this.finalize(e, new a.VariableDeclaration(h, f));
                                            this.nextToken();
                                            n = e;
                                            o = this.parseAssignmentExpression();
                                            e = null;
                                            i = false;
                                        } else {
                                            this.consumeSemicolon();
                                            e = this.finalize(e, new a.VariableDeclaration(h, f));
                                        }
                                    }
                                } else {
                                    var d = this.lookahead;
                                    var c = this.context.allowIn;
                                    this.context.allowIn = false;
                                    e = this.inheritCoverGrammar(this.parseAssignmentExpression);
                                    this.context.allowIn = c;
                                    if (this.matchKeyword("in")) {
                                        if (!this.context.isAssignmentTarget || e.type === u.Syntax.AssignmentExpression) {
                                            this.tolerateError(s.Messages.InvalidLHSInForIn);
                                        }
                                        this.nextToken();
                                        this.reinterpretExpressionAsPattern(e);
                                        n = e;
                                        o = this.parseExpression();
                                        e = null;
                                    } else if (this.matchContextualKeyword("of")) {
                                        if (!this.context.isAssignmentTarget || e.type === u.Syntax.AssignmentExpression) {
                                            this.tolerateError(s.Messages.InvalidLHSInForLoop);
                                        }
                                        this.nextToken();
                                        this.reinterpretExpressionAsPattern(e);
                                        n = e;
                                        o = this.parseAssignmentExpression();
                                        e = null;
                                        i = false;
                                    } else {
                                        if (this.match(",")) {
                                            var m = [ e ];
                                            while (this.match(",")) {
                                                this.nextToken();
                                                m.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                                            }
                                            e = this.finalize(this.startNode(d), new a.SequenceExpression(m));
                                        }
                                        this.expect(";");
                                    }
                                }
                            }
                            if (typeof n === "undefined") {
                                if (!this.match(";")) {
                                    t = this.parseExpression();
                                }
                                this.expect(";");
                                if (!this.match(")")) {
                                    r = this.parseExpression();
                                }
                            }
                            var v;
                            if (!this.match(")") && this.config.tolerant) {
                                this.tolerateUnexpectedToken(this.nextToken());
                                v = this.finalize(this.createNode(), new a.EmptyStatement());
                            } else {
                                this.expect(")");
                                var y = this.context.inIteration;
                                this.context.inIteration = true;
                                v = this.isolateCoverGrammar(this.parseStatement);
                                this.context.inIteration = y;
                            }
                            return typeof n === "undefined" ? this.finalize(l, new a.ForStatement(e, t, r, v)) : i ? this.finalize(l, new a.ForInStatement(n, o, v)) : this.finalize(l, new a.ForOfStatement(n, o, v));
                        };
                        e.prototype.parseContinueStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("continue");
                            var t = null;
                            if (this.lookahead.type === 3 && !this.hasLineTerminator) {
                                var r = this.parseVariableIdentifier();
                                t = r;
                                var i = "$" + r.name;
                                if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, i)) {
                                    this.throwError(s.Messages.UnknownLabel, r.name);
                                }
                            }
                            this.consumeSemicolon();
                            if (t === null && !this.context.inIteration) {
                                this.throwError(s.Messages.IllegalContinue);
                            }
                            return this.finalize(e, new a.ContinueStatement(t));
                        };
                        e.prototype.parseBreakStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("break");
                            var t = null;
                            if (this.lookahead.type === 3 && !this.hasLineTerminator) {
                                var r = this.parseVariableIdentifier();
                                var i = "$" + r.name;
                                if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, i)) {
                                    this.throwError(s.Messages.UnknownLabel, r.name);
                                }
                                t = r;
                            }
                            this.consumeSemicolon();
                            if (t === null && !this.context.inIteration && !this.context.inSwitch) {
                                this.throwError(s.Messages.IllegalBreak);
                            }
                            return this.finalize(e, new a.BreakStatement(t));
                        };
                        e.prototype.parseReturnStatement = function() {
                            if (!this.context.inFunctionBody) {
                                this.tolerateError(s.Messages.IllegalReturn);
                            }
                            var e = this.createNode();
                            this.expectKeyword("return");
                            var t = !this.match(";") && !this.match("}") && !this.hasLineTerminator && this.lookahead.type !== 2 || this.lookahead.type === 8 || this.lookahead.type === 10;
                            var r = t ? this.parseExpression() : null;
                            this.consumeSemicolon();
                            return this.finalize(e, new a.ReturnStatement(r));
                        };
                        e.prototype.parseWithStatement = function() {
                            if (this.context.strict) {
                                this.tolerateError(s.Messages.StrictModeWith);
                            }
                            var e = this.createNode();
                            var t;
                            this.expectKeyword("with");
                            this.expect("(");
                            var r = this.parseExpression();
                            if (!this.match(")") && this.config.tolerant) {
                                this.tolerateUnexpectedToken(this.nextToken());
                                t = this.finalize(this.createNode(), new a.EmptyStatement());
                            } else {
                                this.expect(")");
                                t = this.parseStatement();
                            }
                            return this.finalize(e, new a.WithStatement(r, t));
                        };
                        e.prototype.parseSwitchCase = function() {
                            var e = this.createNode();
                            var t;
                            if (this.matchKeyword("default")) {
                                this.nextToken();
                                t = null;
                            } else {
                                this.expectKeyword("case");
                                t = this.parseExpression();
                            }
                            this.expect(":");
                            var r = [];
                            while (true) {
                                if (this.match("}") || this.matchKeyword("default") || this.matchKeyword("case")) {
                                    break;
                                }
                                r.push(this.parseStatementListItem());
                            }
                            return this.finalize(e, new a.SwitchCase(t, r));
                        };
                        e.prototype.parseSwitchStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("switch");
                            this.expect("(");
                            var t = this.parseExpression();
                            this.expect(")");
                            var r = this.context.inSwitch;
                            this.context.inSwitch = true;
                            var i = [];
                            var n = false;
                            this.expect("{");
                            while (true) {
                                if (this.match("}")) {
                                    break;
                                }
                                var o = this.parseSwitchCase();
                                if (o.test === null) {
                                    if (n) {
                                        this.throwError(s.Messages.MultipleDefaultsInSwitch);
                                    }
                                    n = true;
                                }
                                i.push(o);
                            }
                            this.expect("}");
                            this.context.inSwitch = r;
                            return this.finalize(e, new a.SwitchStatement(t, i));
                        };
                        e.prototype.parseLabelledStatement = function() {
                            var e = this.createNode();
                            var t = this.parseExpression();
                            var r;
                            if (t.type === u.Syntax.Identifier && this.match(":")) {
                                this.nextToken();
                                var i = t;
                                var n = "$" + i.name;
                                if (Object.prototype.hasOwnProperty.call(this.context.labelSet, n)) {
                                    this.throwError(s.Messages.Redeclaration, "Label", i.name);
                                }
                                this.context.labelSet[n] = true;
                                var o = void 0;
                                if (this.matchKeyword("class")) {
                                    this.tolerateUnexpectedToken(this.lookahead);
                                    o = this.parseClassDeclaration();
                                } else if (this.matchKeyword("function")) {
                                    var l = this.lookahead;
                                    var c = this.parseFunctionDeclaration();
                                    if (this.context.strict) {
                                        this.tolerateUnexpectedToken(l, s.Messages.StrictFunction);
                                    } else if (c.generator) {
                                        this.tolerateUnexpectedToken(l, s.Messages.GeneratorInLegacyContext);
                                    }
                                    o = c;
                                } else {
                                    o = this.parseStatement();
                                }
                                delete this.context.labelSet[n];
                                r = new a.LabeledStatement(i, o);
                            } else {
                                this.consumeSemicolon();
                                r = new a.ExpressionStatement(t);
                            }
                            return this.finalize(e, r);
                        };
                        e.prototype.parseThrowStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("throw");
                            if (this.hasLineTerminator) {
                                this.throwError(s.Messages.NewlineAfterThrow);
                            }
                            var t = this.parseExpression();
                            this.consumeSemicolon();
                            return this.finalize(e, new a.ThrowStatement(t));
                        };
                        e.prototype.parseCatchClause = function() {
                            var e = this.createNode();
                            this.expectKeyword("catch");
                            this.expect("(");
                            if (this.match(")")) {
                                this.throwUnexpectedToken(this.lookahead);
                            }
                            var t = [];
                            var r = this.parsePattern(t);
                            var i = {};
                            for (var n = 0; n < t.length; n++) {
                                var o = "$" + t[n].value;
                                if (Object.prototype.hasOwnProperty.call(i, o)) {
                                    this.tolerateError(s.Messages.DuplicateBinding, t[n].value);
                                }
                                i[o] = true;
                            }
                            if (this.context.strict && r.type === u.Syntax.Identifier) {
                                if (this.scanner.isRestrictedWord(r.name)) {
                                    this.tolerateError(s.Messages.StrictCatchVariable);
                                }
                            }
                            this.expect(")");
                            var l = this.parseBlock();
                            return this.finalize(e, new a.CatchClause(r, l));
                        };
                        e.prototype.parseFinallyClause = function() {
                            this.expectKeyword("finally");
                            return this.parseBlock();
                        };
                        e.prototype.parseTryStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("try");
                            var t = this.parseBlock();
                            var r = this.matchKeyword("catch") ? this.parseCatchClause() : null;
                            var i = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
                            if (!r && !i) {
                                this.throwError(s.Messages.NoCatchOrFinally);
                            }
                            return this.finalize(e, new a.TryStatement(t, r, i));
                        };
                        e.prototype.parseDebuggerStatement = function() {
                            var e = this.createNode();
                            this.expectKeyword("debugger");
                            this.consumeSemicolon();
                            return this.finalize(e, new a.DebuggerStatement());
                        };
                        e.prototype.parseStatement = function() {
                            var e;
                            switch (this.lookahead.type) {
                              case 1:
                              case 5:
                              case 6:
                              case 8:
                              case 10:
                              case 9:
                                e = this.parseExpressionStatement();
                                break;

                              case 7:
                                var t = this.lookahead.value;
                                if (t === "{") {
                                    e = this.parseBlock();
                                } else if (t === "(") {
                                    e = this.parseExpressionStatement();
                                } else if (t === ";") {
                                    e = this.parseEmptyStatement();
                                } else {
                                    e = this.parseExpressionStatement();
                                }
                                break;

                              case 3:
                                e = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                                break;

                              case 4:
                                switch (this.lookahead.value) {
                                  case "break":
                                    e = this.parseBreakStatement();
                                    break;

                                  case "continue":
                                    e = this.parseContinueStatement();
                                    break;

                                  case "debugger":
                                    e = this.parseDebuggerStatement();
                                    break;

                                  case "do":
                                    e = this.parseDoWhileStatement();
                                    break;

                                  case "for":
                                    e = this.parseForStatement();
                                    break;

                                  case "function":
                                    e = this.parseFunctionDeclaration();
                                    break;

                                  case "if":
                                    e = this.parseIfStatement();
                                    break;

                                  case "return":
                                    e = this.parseReturnStatement();
                                    break;

                                  case "switch":
                                    e = this.parseSwitchStatement();
                                    break;

                                  case "throw":
                                    e = this.parseThrowStatement();
                                    break;

                                  case "try":
                                    e = this.parseTryStatement();
                                    break;

                                  case "var":
                                    e = this.parseVariableStatement();
                                    break;

                                  case "while":
                                    e = this.parseWhileStatement();
                                    break;

                                  case "with":
                                    e = this.parseWithStatement();
                                    break;

                                  default:
                                    e = this.parseExpressionStatement();
                                    break;
                                }
                                break;

                              default:
                                e = this.throwUnexpectedToken(this.lookahead);
                            }
                            return e;
                        };
                        e.prototype.parseFunctionSourceElements = function() {
                            var e = this.createNode();
                            this.expect("{");
                            var t = this.parseDirectivePrologues();
                            var r = this.context.labelSet;
                            var i = this.context.inIteration;
                            var n = this.context.inSwitch;
                            var s = this.context.inFunctionBody;
                            this.context.labelSet = {};
                            this.context.inIteration = false;
                            this.context.inSwitch = false;
                            this.context.inFunctionBody = true;
                            while (this.lookahead.type !== 2) {
                                if (this.match("}")) {
                                    break;
                                }
                                t.push(this.parseStatementListItem());
                            }
                            this.expect("}");
                            this.context.labelSet = r;
                            this.context.inIteration = i;
                            this.context.inSwitch = n;
                            this.context.inFunctionBody = s;
                            return this.finalize(e, new a.BlockStatement(t));
                        };
                        e.prototype.validateParam = function(e, t, r) {
                            var i = "$" + r;
                            if (this.context.strict) {
                                if (this.scanner.isRestrictedWord(r)) {
                                    e.stricted = t;
                                    e.message = s.Messages.StrictParamName;
                                }
                                if (Object.prototype.hasOwnProperty.call(e.paramSet, i)) {
                                    e.stricted = t;
                                    e.message = s.Messages.StrictParamDupe;
                                }
                            } else if (!e.firstRestricted) {
                                if (this.scanner.isRestrictedWord(r)) {
                                    e.firstRestricted = t;
                                    e.message = s.Messages.StrictParamName;
                                } else if (this.scanner.isStrictModeReservedWord(r)) {
                                    e.firstRestricted = t;
                                    e.message = s.Messages.StrictReservedWord;
                                } else if (Object.prototype.hasOwnProperty.call(e.paramSet, i)) {
                                    e.stricted = t;
                                    e.message = s.Messages.StrictParamDupe;
                                }
                            }
                            if (typeof Object.defineProperty === "function") {
                                Object.defineProperty(e.paramSet, i, {
                                    value: true,
                                    enumerable: true,
                                    writable: true,
                                    configurable: true
                                });
                            } else {
                                e.paramSet[i] = true;
                            }
                        };
                        e.prototype.parseRestElement = function(e) {
                            var t = this.createNode();
                            this.expect("...");
                            var r = this.parsePattern(e);
                            if (this.match("=")) {
                                this.throwError(s.Messages.DefaultRestParameter);
                            }
                            if (!this.match(")")) {
                                this.throwError(s.Messages.ParameterAfterRestParameter);
                            }
                            return this.finalize(t, new a.RestElement(r));
                        };
                        e.prototype.parseFormalParameter = function(e) {
                            var t = [];
                            var r = this.match("...") ? this.parseRestElement(t) : this.parsePatternWithDefault(t);
                            for (var i = 0; i < t.length; i++) {
                                this.validateParam(e, t[i], t[i].value);
                            }
                            e.simple = e.simple && r instanceof a.Identifier;
                            e.params.push(r);
                        };
                        e.prototype.parseFormalParameters = function(e) {
                            var t;
                            t = {
                                simple: true,
                                params: [],
                                firstRestricted: e
                            };
                            this.expect("(");
                            if (!this.match(")")) {
                                t.paramSet = {};
                                while (this.lookahead.type !== 2) {
                                    this.parseFormalParameter(t);
                                    if (this.match(")")) {
                                        break;
                                    }
                                    this.expect(",");
                                    if (this.match(")")) {
                                        break;
                                    }
                                }
                            }
                            this.expect(")");
                            return {
                                simple: t.simple,
                                params: t.params,
                                stricted: t.stricted,
                                firstRestricted: t.firstRestricted,
                                message: t.message
                            };
                        };
                        e.prototype.matchAsyncFunction = function() {
                            var e = this.matchContextualKeyword("async");
                            if (e) {
                                var t = this.scanner.saveState();
                                this.scanner.scanComments();
                                var r = this.scanner.lex();
                                this.scanner.restoreState(t);
                                e = t.lineNumber === r.lineNumber && r.type === 4 && r.value === "function";
                            }
                            return e;
                        };
                        e.prototype.parseFunctionDeclaration = function(e) {
                            var t = this.createNode();
                            var r = this.matchContextualKeyword("async");
                            if (r) {
                                this.nextToken();
                            }
                            this.expectKeyword("function");
                            var i = r ? false : this.match("*");
                            if (i) {
                                this.nextToken();
                            }
                            var n;
                            var o = null;
                            var u = null;
                            if (!e || !this.match("(")) {
                                var l = this.lookahead;
                                o = this.parseVariableIdentifier();
                                if (this.context.strict) {
                                    if (this.scanner.isRestrictedWord(l.value)) {
                                        this.tolerateUnexpectedToken(l, s.Messages.StrictFunctionName);
                                    }
                                } else {
                                    if (this.scanner.isRestrictedWord(l.value)) {
                                        u = l;
                                        n = s.Messages.StrictFunctionName;
                                    } else if (this.scanner.isStrictModeReservedWord(l.value)) {
                                        u = l;
                                        n = s.Messages.StrictReservedWord;
                                    }
                                }
                            }
                            var c = this.context.await;
                            var h = this.context.allowYield;
                            this.context.await = r;
                            this.context.allowYield = !i;
                            var p = this.parseFormalParameters(u);
                            var f = p.params;
                            var d = p.stricted;
                            u = p.firstRestricted;
                            if (p.message) {
                                n = p.message;
                            }
                            var m = this.context.strict;
                            var v = this.context.allowStrictDirective;
                            this.context.allowStrictDirective = p.simple;
                            var y = this.parseFunctionSourceElements();
                            if (this.context.strict && u) {
                                this.throwUnexpectedToken(u, n);
                            }
                            if (this.context.strict && d) {
                                this.tolerateUnexpectedToken(d, n);
                            }
                            this.context.strict = m;
                            this.context.allowStrictDirective = v;
                            this.context.await = c;
                            this.context.allowYield = h;
                            return r ? this.finalize(t, new a.AsyncFunctionDeclaration(o, f, y)) : this.finalize(t, new a.FunctionDeclaration(o, f, y, i));
                        };
                        e.prototype.parseFunctionExpression = function() {
                            var e = this.createNode();
                            var t = this.matchContextualKeyword("async");
                            if (t) {
                                this.nextToken();
                            }
                            this.expectKeyword("function");
                            var r = t ? false : this.match("*");
                            if (r) {
                                this.nextToken();
                            }
                            var i;
                            var n = null;
                            var o;
                            var u = this.context.await;
                            var l = this.context.allowYield;
                            this.context.await = t;
                            this.context.allowYield = !r;
                            if (!this.match("(")) {
                                var c = this.lookahead;
                                n = !this.context.strict && !r && this.matchKeyword("yield") ? this.parseIdentifierName() : this.parseVariableIdentifier();
                                if (this.context.strict) {
                                    if (this.scanner.isRestrictedWord(c.value)) {
                                        this.tolerateUnexpectedToken(c, s.Messages.StrictFunctionName);
                                    }
                                } else {
                                    if (this.scanner.isRestrictedWord(c.value)) {
                                        o = c;
                                        i = s.Messages.StrictFunctionName;
                                    } else if (this.scanner.isStrictModeReservedWord(c.value)) {
                                        o = c;
                                        i = s.Messages.StrictReservedWord;
                                    }
                                }
                            }
                            var h = this.parseFormalParameters(o);
                            var p = h.params;
                            var f = h.stricted;
                            o = h.firstRestricted;
                            if (h.message) {
                                i = h.message;
                            }
                            var d = this.context.strict;
                            var m = this.context.allowStrictDirective;
                            this.context.allowStrictDirective = h.simple;
                            var v = this.parseFunctionSourceElements();
                            if (this.context.strict && o) {
                                this.throwUnexpectedToken(o, i);
                            }
                            if (this.context.strict && f) {
                                this.tolerateUnexpectedToken(f, i);
                            }
                            this.context.strict = d;
                            this.context.allowStrictDirective = m;
                            this.context.await = u;
                            this.context.allowYield = l;
                            return t ? this.finalize(e, new a.AsyncFunctionExpression(n, p, v)) : this.finalize(e, new a.FunctionExpression(n, p, v, r));
                        };
                        e.prototype.parseDirective = function() {
                            var e = this.lookahead;
                            var t = this.createNode();
                            var r = this.parseExpression();
                            var i = r.type === u.Syntax.Literal ? this.getTokenRaw(e).slice(1, -1) : null;
                            this.consumeSemicolon();
                            return this.finalize(t, i ? new a.Directive(r, i) : new a.ExpressionStatement(r));
                        };
                        e.prototype.parseDirectivePrologues = function() {
                            var e = null;
                            var t = [];
                            while (true) {
                                var r = this.lookahead;
                                if (r.type !== 8) {
                                    break;
                                }
                                var i = this.parseDirective();
                                t.push(i);
                                var n = i.directive;
                                if (typeof n !== "string") {
                                    break;
                                }
                                if (n === "use strict") {
                                    this.context.strict = true;
                                    if (e) {
                                        this.tolerateUnexpectedToken(e, s.Messages.StrictOctalLiteral);
                                    }
                                    if (!this.context.allowStrictDirective) {
                                        this.tolerateUnexpectedToken(r, s.Messages.IllegalLanguageModeDirective);
                                    }
                                } else {
                                    if (!e && r.octal) {
                                        e = r;
                                    }
                                }
                            }
                            return t;
                        };
                        e.prototype.qualifiedPropertyName = function(e) {
                            switch (e.type) {
                              case 3:
                              case 8:
                              case 1:
                              case 5:
                              case 6:
                              case 4:
                                return true;

                              case 7:
                                return e.value === "[";

                              default:
                                break;
                            }
                            return false;
                        };
                        e.prototype.parseGetterMethod = function() {
                            var e = this.createNode();
                            var t = false;
                            var r = this.context.allowYield;
                            this.context.allowYield = !t;
                            var i = this.parseFormalParameters();
                            if (i.params.length > 0) {
                                this.tolerateError(s.Messages.BadGetterArity);
                            }
                            var n = this.parsePropertyMethod(i);
                            this.context.allowYield = r;
                            return this.finalize(e, new a.FunctionExpression(null, i.params, n, t));
                        };
                        e.prototype.parseSetterMethod = function() {
                            var e = this.createNode();
                            var t = false;
                            var r = this.context.allowYield;
                            this.context.allowYield = !t;
                            var i = this.parseFormalParameters();
                            if (i.params.length !== 1) {
                                this.tolerateError(s.Messages.BadSetterArity);
                            } else if (i.params[0] instanceof a.RestElement) {
                                this.tolerateError(s.Messages.BadSetterRestParameter);
                            }
                            var n = this.parsePropertyMethod(i);
                            this.context.allowYield = r;
                            return this.finalize(e, new a.FunctionExpression(null, i.params, n, t));
                        };
                        e.prototype.parseGeneratorMethod = function() {
                            var e = this.createNode();
                            var t = true;
                            var r = this.context.allowYield;
                            this.context.allowYield = true;
                            var i = this.parseFormalParameters();
                            this.context.allowYield = false;
                            var n = this.parsePropertyMethod(i);
                            this.context.allowYield = r;
                            return this.finalize(e, new a.FunctionExpression(null, i.params, n, t));
                        };
                        e.prototype.isStartOfExpression = function() {
                            var e = true;
                            var t = this.lookahead.value;
                            switch (this.lookahead.type) {
                              case 7:
                                e = t === "[" || t === "(" || t === "{" || t === "+" || t === "-" || t === "!" || t === "~" || t === "++" || t === "--" || t === "/" || t === "/=";
                                break;

                              case 4:
                                e = t === "class" || t === "delete" || t === "function" || t === "let" || t === "new" || t === "super" || t === "this" || t === "typeof" || t === "void" || t === "yield";
                                break;

                              default:
                                break;
                            }
                            return e;
                        };
                        e.prototype.parseYieldExpression = function() {
                            var e = this.createNode();
                            this.expectKeyword("yield");
                            var t = null;
                            var r = false;
                            if (!this.hasLineTerminator) {
                                var i = this.context.allowYield;
                                this.context.allowYield = false;
                                r = this.match("*");
                                if (r) {
                                    this.nextToken();
                                    t = this.parseAssignmentExpression();
                                } else if (this.isStartOfExpression()) {
                                    t = this.parseAssignmentExpression();
                                }
                                this.context.allowYield = i;
                            }
                            return this.finalize(e, new a.YieldExpression(t, r));
                        };
                        e.prototype.parseClassElement = function(e) {
                            var t = this.lookahead;
                            var r = this.createNode();
                            var i = "";
                            var n = null;
                            var o = null;
                            var u = false;
                            var l = false;
                            var c = false;
                            var h = false;
                            if (this.match("*")) {
                                this.nextToken();
                            } else {
                                u = this.match("[");
                                n = this.parseObjectPropertyKey();
                                var p = n;
                                if (p.name === "static" && (this.qualifiedPropertyName(this.lookahead) || this.match("*"))) {
                                    t = this.lookahead;
                                    c = true;
                                    u = this.match("[");
                                    if (this.match("*")) {
                                        this.nextToken();
                                    } else {
                                        n = this.parseObjectPropertyKey();
                                    }
                                }
                                if (t.type === 3 && !this.hasLineTerminator && t.value === "async") {
                                    var f = this.lookahead.value;
                                    if (f !== ":" && f !== "(" && f !== "*") {
                                        h = true;
                                        t = this.lookahead;
                                        n = this.parseObjectPropertyKey();
                                        if (t.type === 3 && t.value === "constructor") {
                                            this.tolerateUnexpectedToken(t, s.Messages.ConstructorIsAsync);
                                        }
                                    }
                                }
                            }
                            var d = this.qualifiedPropertyName(this.lookahead);
                            if (t.type === 3) {
                                if (t.value === "get" && d) {
                                    i = "get";
                                    u = this.match("[");
                                    n = this.parseObjectPropertyKey();
                                    this.context.allowYield = false;
                                    o = this.parseGetterMethod();
                                } else if (t.value === "set" && d) {
                                    i = "set";
                                    u = this.match("[");
                                    n = this.parseObjectPropertyKey();
                                    o = this.parseSetterMethod();
                                }
                            } else if (t.type === 7 && t.value === "*" && d) {
                                i = "init";
                                u = this.match("[");
                                n = this.parseObjectPropertyKey();
                                o = this.parseGeneratorMethod();
                                l = true;
                            }
                            if (!i && n && this.match("(")) {
                                i = "init";
                                o = h ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
                                l = true;
                            }
                            if (!i) {
                                this.throwUnexpectedToken(this.lookahead);
                            }
                            if (i === "init") {
                                i = "method";
                            }
                            if (!u) {
                                if (c && this.isPropertyKey(n, "prototype")) {
                                    this.throwUnexpectedToken(t, s.Messages.StaticPrototype);
                                }
                                if (!c && this.isPropertyKey(n, "constructor")) {
                                    if (i !== "method" || !l || o && o.generator) {
                                        this.throwUnexpectedToken(t, s.Messages.ConstructorSpecialMethod);
                                    }
                                    if (e.value) {
                                        this.throwUnexpectedToken(t, s.Messages.DuplicateConstructor);
                                    } else {
                                        e.value = true;
                                    }
                                    i = "constructor";
                                }
                            }
                            return this.finalize(r, new a.MethodDefinition(n, u, o, i, c));
                        };
                        e.prototype.parseClassElementList = function() {
                            var e = [];
                            var t = {
                                value: false
                            };
                            this.expect("{");
                            while (!this.match("}")) {
                                if (this.match(";")) {
                                    this.nextToken();
                                } else {
                                    e.push(this.parseClassElement(t));
                                }
                            }
                            this.expect("}");
                            return e;
                        };
                        e.prototype.parseClassBody = function() {
                            var e = this.createNode();
                            var t = this.parseClassElementList();
                            return this.finalize(e, new a.ClassBody(t));
                        };
                        e.prototype.parseClassDeclaration = function(e) {
                            var t = this.createNode();
                            var r = this.context.strict;
                            this.context.strict = true;
                            this.expectKeyword("class");
                            var i = e && this.lookahead.type !== 3 ? null : this.parseVariableIdentifier();
                            var n = null;
                            if (this.matchKeyword("extends")) {
                                this.nextToken();
                                n = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
                            }
                            var s = this.parseClassBody();
                            this.context.strict = r;
                            return this.finalize(t, new a.ClassDeclaration(i, n, s));
                        };
                        e.prototype.parseClassExpression = function() {
                            var e = this.createNode();
                            var t = this.context.strict;
                            this.context.strict = true;
                            this.expectKeyword("class");
                            var r = this.lookahead.type === 3 ? this.parseVariableIdentifier() : null;
                            var i = null;
                            if (this.matchKeyword("extends")) {
                                this.nextToken();
                                i = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
                            }
                            var n = this.parseClassBody();
                            this.context.strict = t;
                            return this.finalize(e, new a.ClassExpression(r, i, n));
                        };
                        e.prototype.parseModule = function() {
                            this.context.strict = true;
                            this.context.isModule = true;
                            this.scanner.isModule = true;
                            var e = this.createNode();
                            var t = this.parseDirectivePrologues();
                            while (this.lookahead.type !== 2) {
                                t.push(this.parseStatementListItem());
                            }
                            return this.finalize(e, new a.Module(t));
                        };
                        e.prototype.parseScript = function() {
                            var e = this.createNode();
                            var t = this.parseDirectivePrologues();
                            while (this.lookahead.type !== 2) {
                                t.push(this.parseStatementListItem());
                            }
                            return this.finalize(e, new a.Script(t));
                        };
                        e.prototype.parseModuleSpecifier = function() {
                            var e = this.createNode();
                            if (this.lookahead.type !== 8) {
                                this.throwError(s.Messages.InvalidModuleSpecifier);
                            }
                            var t = this.nextToken();
                            var r = this.getTokenRaw(t);
                            return this.finalize(e, new a.Literal(t.value, r));
                        };
                        e.prototype.parseImportSpecifier = function() {
                            var e = this.createNode();
                            var t;
                            var r;
                            if (this.lookahead.type === 3) {
                                t = this.parseVariableIdentifier();
                                r = t;
                                if (this.matchContextualKeyword("as")) {
                                    this.nextToken();
                                    r = this.parseVariableIdentifier();
                                }
                            } else {
                                t = this.parseIdentifierName();
                                r = t;
                                if (this.matchContextualKeyword("as")) {
                                    this.nextToken();
                                    r = this.parseVariableIdentifier();
                                } else {
                                    this.throwUnexpectedToken(this.nextToken());
                                }
                            }
                            return this.finalize(e, new a.ImportSpecifier(r, t));
                        };
                        e.prototype.parseNamedImports = function() {
                            this.expect("{");
                            var e = [];
                            while (!this.match("}")) {
                                e.push(this.parseImportSpecifier());
                                if (!this.match("}")) {
                                    this.expect(",");
                                }
                            }
                            this.expect("}");
                            return e;
                        };
                        e.prototype.parseImportDefaultSpecifier = function() {
                            var e = this.createNode();
                            var t = this.parseIdentifierName();
                            return this.finalize(e, new a.ImportDefaultSpecifier(t));
                        };
                        e.prototype.parseImportNamespaceSpecifier = function() {
                            var e = this.createNode();
                            this.expect("*");
                            if (!this.matchContextualKeyword("as")) {
                                this.throwError(s.Messages.NoAsAfterImportNamespace);
                            }
                            this.nextToken();
                            var t = this.parseIdentifierName();
                            return this.finalize(e, new a.ImportNamespaceSpecifier(t));
                        };
                        e.prototype.parseImportDeclaration = function() {
                            if (this.context.inFunctionBody) {
                                this.throwError(s.Messages.IllegalImportDeclaration);
                            }
                            var e = this.createNode();
                            this.expectKeyword("import");
                            var t;
                            var r = [];
                            if (this.lookahead.type === 8) {
                                t = this.parseModuleSpecifier();
                            } else {
                                if (this.match("{")) {
                                    r = r.concat(this.parseNamedImports());
                                } else if (this.match("*")) {
                                    r.push(this.parseImportNamespaceSpecifier());
                                } else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword("default")) {
                                    r.push(this.parseImportDefaultSpecifier());
                                    if (this.match(",")) {
                                        this.nextToken();
                                        if (this.match("*")) {
                                            r.push(this.parseImportNamespaceSpecifier());
                                        } else if (this.match("{")) {
                                            r = r.concat(this.parseNamedImports());
                                        } else {
                                            this.throwUnexpectedToken(this.lookahead);
                                        }
                                    }
                                } else {
                                    this.throwUnexpectedToken(this.nextToken());
                                }
                                if (!this.matchContextualKeyword("from")) {
                                    var i = this.lookahead.value ? s.Messages.UnexpectedToken : s.Messages.MissingFromClause;
                                    this.throwError(i, this.lookahead.value);
                                }
                                this.nextToken();
                                t = this.parseModuleSpecifier();
                            }
                            this.consumeSemicolon();
                            return this.finalize(e, new a.ImportDeclaration(r, t));
                        };
                        e.prototype.parseExportSpecifier = function() {
                            var e = this.createNode();
                            var t = this.parseIdentifierName();
                            var r = t;
                            if (this.matchContextualKeyword("as")) {
                                this.nextToken();
                                r = this.parseIdentifierName();
                            }
                            return this.finalize(e, new a.ExportSpecifier(t, r));
                        };
                        e.prototype.parseExportDeclaration = function() {
                            if (this.context.inFunctionBody) {
                                this.throwError(s.Messages.IllegalExportDeclaration);
                            }
                            var e = this.createNode();
                            this.expectKeyword("export");
                            var t;
                            if (this.matchKeyword("default")) {
                                this.nextToken();
                                if (this.matchKeyword("function")) {
                                    var r = this.parseFunctionDeclaration(true);
                                    t = this.finalize(e, new a.ExportDefaultDeclaration(r));
                                } else if (this.matchKeyword("class")) {
                                    var r = this.parseClassDeclaration(true);
                                    t = this.finalize(e, new a.ExportDefaultDeclaration(r));
                                } else if (this.matchContextualKeyword("async")) {
                                    var r = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
                                    t = this.finalize(e, new a.ExportDefaultDeclaration(r));
                                } else {
                                    if (this.matchContextualKeyword("from")) {
                                        this.throwError(s.Messages.UnexpectedToken, this.lookahead.value);
                                    }
                                    var r = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression();
                                    this.consumeSemicolon();
                                    t = this.finalize(e, new a.ExportDefaultDeclaration(r));
                                }
                            } else if (this.match("*")) {
                                this.nextToken();
                                if (!this.matchContextualKeyword("from")) {
                                    var i = this.lookahead.value ? s.Messages.UnexpectedToken : s.Messages.MissingFromClause;
                                    this.throwError(i, this.lookahead.value);
                                }
                                this.nextToken();
                                var n = this.parseModuleSpecifier();
                                this.consumeSemicolon();
                                t = this.finalize(e, new a.ExportAllDeclaration(n));
                            } else if (this.lookahead.type === 4) {
                                var r = void 0;
                                switch (this.lookahead.value) {
                                  case "let":
                                  case "const":
                                    r = this.parseLexicalDeclaration({
                                        inFor: false
                                    });
                                    break;

                                  case "var":
                                  case "class":
                                  case "function":
                                    r = this.parseStatementListItem();
                                    break;

                                  default:
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                                t = this.finalize(e, new a.ExportNamedDeclaration(r, [], null));
                            } else if (this.matchAsyncFunction()) {
                                var r = this.parseFunctionDeclaration();
                                t = this.finalize(e, new a.ExportNamedDeclaration(r, [], null));
                            } else {
                                var o = [];
                                var u = null;
                                var l = false;
                                this.expect("{");
                                while (!this.match("}")) {
                                    l = l || this.matchKeyword("default");
                                    o.push(this.parseExportSpecifier());
                                    if (!this.match("}")) {
                                        this.expect(",");
                                    }
                                }
                                this.expect("}");
                                if (this.matchContextualKeyword("from")) {
                                    this.nextToken();
                                    u = this.parseModuleSpecifier();
                                    this.consumeSemicolon();
                                } else if (l) {
                                    var i = this.lookahead.value ? s.Messages.UnexpectedToken : s.Messages.MissingFromClause;
                                    this.throwError(i, this.lookahead.value);
                                } else {
                                    this.consumeSemicolon();
                                }
                                t = this.finalize(e, new a.ExportNamedDeclaration(null, o, u));
                            }
                            return t;
                        };
                        return e;
                    }();
                    t.Parser = h;
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    function r(e, t) {
                        if (!e) {
                            throw new Error("ASSERT: " + t);
                        }
                    }
                    t.assert = r;
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var r = function() {
                        function e() {
                            this.errors = [];
                            this.tolerant = false;
                        }
                        e.prototype.recordError = function(e) {
                            this.errors.push(e);
                        };
                        e.prototype.tolerate = function(e) {
                            if (this.tolerant) {
                                this.recordError(e);
                            } else {
                                throw e;
                            }
                        };
                        e.prototype.constructError = function(e, t) {
                            var r = new Error(e);
                            try {
                                throw r;
                            } catch (e) {
                                if (Object.create && Object.defineProperty) {
                                    r = Object.create(e);
                                    Object.defineProperty(r, "column", {
                                        value: t
                                    });
                                }
                            }
                            return r;
                        };
                        e.prototype.createError = function(e, t, r, i) {
                            var n = "Line " + t + ": " + i;
                            var s = this.constructError(n, r);
                            s.index = e;
                            s.lineNumber = t;
                            s.description = i;
                            return s;
                        };
                        e.prototype.throwError = function(e, t, r, i) {
                            throw this.createError(e, t, r, i);
                        };
                        e.prototype.tolerateError = function(e, t, r, i) {
                            var n = this.createError(e, t, r, i);
                            if (this.tolerant) {
                                this.recordError(n);
                            } else {
                                throw n;
                            }
                        };
                        return e;
                    }();
                    t.ErrorHandler = r;
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    t.Messages = {
                        BadGetterArity: "Getter must not have any formal parameters",
                        BadSetterArity: "Setter must have exactly one formal parameter",
                        BadSetterRestParameter: "Setter function argument must not be a rest parameter",
                        ConstructorIsAsync: "Class constructor may not be an async method",
                        ConstructorSpecialMethod: "Class constructor may not be an accessor",
                        DeclarationMissingInitializer: "Missing initializer in %0 declaration",
                        DefaultRestParameter: "Unexpected token =",
                        DuplicateBinding: "Duplicate binding %0",
                        DuplicateConstructor: "A class may only have one constructor",
                        DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
                        ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
                        GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
                        IllegalBreak: "Illegal break statement",
                        IllegalContinue: "Illegal continue statement",
                        IllegalExportDeclaration: "Unexpected token",
                        IllegalImportDeclaration: "Unexpected token",
                        IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
                        IllegalReturn: "Illegal return statement",
                        InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
                        InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
                        InvalidLHSInAssignment: "Invalid left-hand side in assignment",
                        InvalidLHSInForIn: "Invalid left-hand side in for-in",
                        InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
                        InvalidModuleSpecifier: "Unexpected token",
                        InvalidRegExp: "Invalid regular expression",
                        LetInLexicalBinding: "let is disallowed as a lexically bound name",
                        MissingFromClause: "Unexpected token",
                        MultipleDefaultsInSwitch: "More than one default clause in switch statement",
                        NewlineAfterThrow: "Illegal newline after throw",
                        NoAsAfterImportNamespace: "Unexpected token",
                        NoCatchOrFinally: "Missing catch or finally after try",
                        ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
                        Redeclaration: "%0 '%1' has already been declared",
                        StaticPrototype: "Classes may not have static property named prototype",
                        StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
                        StrictDelete: "Delete of an unqualified identifier in strict mode.",
                        StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
                        StrictFunctionName: "Function name may not be eval or arguments in strict mode",
                        StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
                        StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                        StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
                        StrictModeWith: "Strict mode code may not include a with statement",
                        StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
                        StrictParamDupe: "Strict mode function may not have duplicate parameter names",
                        StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
                        StrictReservedWord: "Use of future reserved word in strict mode",
                        StrictVarName: "Variable name may not be eval or arguments in strict mode",
                        TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
                        UnexpectedEOS: "Unexpected end of input",
                        UnexpectedIdentifier: "Unexpected identifier",
                        UnexpectedNumber: "Unexpected number",
                        UnexpectedReserved: "Unexpected reserved word",
                        UnexpectedString: "Unexpected string",
                        UnexpectedTemplate: "Unexpected quasi %0",
                        UnexpectedToken: "Unexpected token %0",
                        UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
                        UnknownLabel: "Undefined label '%0'",
                        UnterminatedRegExp: "Invalid regular expression: missing /"
                    };
                }, function(e, t, r) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var i = r(9);
                    var n = r(4);
                    var s = r(11);
                    function a(e) {
                        return "0123456789abcdef".indexOf(e.toLowerCase());
                    }
                    function o(e) {
                        return "01234567".indexOf(e);
                    }
                    var u = function() {
                        function e(e, t) {
                            this.source = e;
                            this.errorHandler = t;
                            this.trackComment = false;
                            this.isModule = false;
                            this.length = e.length;
                            this.index = 0;
                            this.lineNumber = e.length > 0 ? 1 : 0;
                            this.lineStart = 0;
                            this.curlyStack = [];
                        }
                        e.prototype.saveState = function() {
                            return {
                                index: this.index,
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart
                            };
                        };
                        e.prototype.restoreState = function(e) {
                            this.index = e.index;
                            this.lineNumber = e.lineNumber;
                            this.lineStart = e.lineStart;
                        };
                        e.prototype.eof = function() {
                            return this.index >= this.length;
                        };
                        e.prototype.throwUnexpectedToken = function(e) {
                            if (e === void 0) {
                                e = s.Messages.UnexpectedTokenIllegal;
                            }
                            return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, e);
                        };
                        e.prototype.tolerateUnexpectedToken = function(e) {
                            if (e === void 0) {
                                e = s.Messages.UnexpectedTokenIllegal;
                            }
                            this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, e);
                        };
                        e.prototype.skipSingleLineComment = function(e) {
                            var t = [];
                            var r, i;
                            if (this.trackComment) {
                                t = [];
                                r = this.index - e;
                                i = {
                                    start: {
                                        line: this.lineNumber,
                                        column: this.index - this.lineStart - e
                                    },
                                    end: {}
                                };
                            }
                            while (!this.eof()) {
                                var s = this.source.charCodeAt(this.index);
                                ++this.index;
                                if (n.Character.isLineTerminator(s)) {
                                    if (this.trackComment) {
                                        i.end = {
                                            line: this.lineNumber,
                                            column: this.index - this.lineStart - 1
                                        };
                                        var a = {
                                            multiLine: false,
                                            slice: [ r + e, this.index - 1 ],
                                            range: [ r, this.index - 1 ],
                                            loc: i
                                        };
                                        t.push(a);
                                    }
                                    if (s === 13 && this.source.charCodeAt(this.index) === 10) {
                                        ++this.index;
                                    }
                                    ++this.lineNumber;
                                    this.lineStart = this.index;
                                    return t;
                                }
                            }
                            if (this.trackComment) {
                                i.end = {
                                    line: this.lineNumber,
                                    column: this.index - this.lineStart
                                };
                                var a = {
                                    multiLine: false,
                                    slice: [ r + e, this.index ],
                                    range: [ r, this.index ],
                                    loc: i
                                };
                                t.push(a);
                            }
                            return t;
                        };
                        e.prototype.skipMultiLineComment = function() {
                            var e = [];
                            var t, r;
                            if (this.trackComment) {
                                e = [];
                                t = this.index - 2;
                                r = {
                                    start: {
                                        line: this.lineNumber,
                                        column: this.index - this.lineStart - 2
                                    },
                                    end: {}
                                };
                            }
                            while (!this.eof()) {
                                var i = this.source.charCodeAt(this.index);
                                if (n.Character.isLineTerminator(i)) {
                                    if (i === 13 && this.source.charCodeAt(this.index + 1) === 10) {
                                        ++this.index;
                                    }
                                    ++this.lineNumber;
                                    ++this.index;
                                    this.lineStart = this.index;
                                } else if (i === 42) {
                                    if (this.source.charCodeAt(this.index + 1) === 47) {
                                        this.index += 2;
                                        if (this.trackComment) {
                                            r.end = {
                                                line: this.lineNumber,
                                                column: this.index - this.lineStart
                                            };
                                            var s = {
                                                multiLine: true,
                                                slice: [ t + 2, this.index - 2 ],
                                                range: [ t, this.index ],
                                                loc: r
                                            };
                                            e.push(s);
                                        }
                                        return e;
                                    }
                                    ++this.index;
                                } else {
                                    ++this.index;
                                }
                            }
                            if (this.trackComment) {
                                r.end = {
                                    line: this.lineNumber,
                                    column: this.index - this.lineStart
                                };
                                var s = {
                                    multiLine: true,
                                    slice: [ t + 2, this.index ],
                                    range: [ t, this.index ],
                                    loc: r
                                };
                                e.push(s);
                            }
                            this.tolerateUnexpectedToken();
                            return e;
                        };
                        e.prototype.scanComments = function() {
                            var e;
                            if (this.trackComment) {
                                e = [];
                            }
                            var t = this.index === 0;
                            while (!this.eof()) {
                                var r = this.source.charCodeAt(this.index);
                                if (n.Character.isWhiteSpace(r)) {
                                    ++this.index;
                                } else if (n.Character.isLineTerminator(r)) {
                                    ++this.index;
                                    if (r === 13 && this.source.charCodeAt(this.index) === 10) {
                                        ++this.index;
                                    }
                                    ++this.lineNumber;
                                    this.lineStart = this.index;
                                    t = true;
                                } else if (r === 47) {
                                    r = this.source.charCodeAt(this.index + 1);
                                    if (r === 47) {
                                        this.index += 2;
                                        var i = this.skipSingleLineComment(2);
                                        if (this.trackComment) {
                                            e = e.concat(i);
                                        }
                                        t = true;
                                    } else if (r === 42) {
                                        this.index += 2;
                                        var i = this.skipMultiLineComment();
                                        if (this.trackComment) {
                                            e = e.concat(i);
                                        }
                                    } else {
                                        break;
                                    }
                                } else if (t && r === 45) {
                                    if (this.source.charCodeAt(this.index + 1) === 45 && this.source.charCodeAt(this.index + 2) === 62) {
                                        this.index += 3;
                                        var i = this.skipSingleLineComment(3);
                                        if (this.trackComment) {
                                            e = e.concat(i);
                                        }
                                    } else {
                                        break;
                                    }
                                } else if (r === 60 && !this.isModule) {
                                    if (this.source.slice(this.index + 1, this.index + 4) === "!--") {
                                        this.index += 4;
                                        var i = this.skipSingleLineComment(4);
                                        if (this.trackComment) {
                                            e = e.concat(i);
                                        }
                                    } else {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            }
                            return e;
                        };
                        e.prototype.isFutureReservedWord = function(e) {
                            switch (e) {
                              case "enum":
                              case "export":
                              case "import":
                              case "super":
                                return true;

                              default:
                                return false;
                            }
                        };
                        e.prototype.isStrictModeReservedWord = function(e) {
                            switch (e) {
                              case "implements":
                              case "interface":
                              case "package":
                              case "private":
                              case "protected":
                              case "public":
                              case "static":
                              case "yield":
                              case "let":
                                return true;

                              default:
                                return false;
                            }
                        };
                        e.prototype.isRestrictedWord = function(e) {
                            return e === "eval" || e === "arguments";
                        };
                        e.prototype.isKeyword = function(e) {
                            switch (e.length) {
                              case 2:
                                return e === "if" || e === "in" || e === "do";

                              case 3:
                                return e === "var" || e === "for" || e === "new" || e === "try" || e === "let";

                              case 4:
                                return e === "this" || e === "else" || e === "case" || e === "void" || e === "with" || e === "enum";

                              case 5:
                                return e === "while" || e === "break" || e === "catch" || e === "throw" || e === "const" || e === "yield" || e === "class" || e === "super";

                              case 6:
                                return e === "return" || e === "typeof" || e === "delete" || e === "switch" || e === "export" || e === "import";

                              case 7:
                                return e === "default" || e === "finally" || e === "extends";

                              case 8:
                                return e === "function" || e === "continue" || e === "debugger";

                              case 10:
                                return e === "instanceof";

                              default:
                                return false;
                            }
                        };
                        e.prototype.codePointAt = function(e) {
                            var t = this.source.charCodeAt(e);
                            if (t >= 55296 && t <= 56319) {
                                var r = this.source.charCodeAt(e + 1);
                                if (r >= 56320 && r <= 57343) {
                                    var i = t;
                                    t = (i - 55296) * 1024 + r - 56320 + 65536;
                                }
                            }
                            return t;
                        };
                        e.prototype.scanHexEscape = function(e) {
                            var t = e === "u" ? 4 : 2;
                            var r = 0;
                            for (var i = 0; i < t; ++i) {
                                if (!this.eof() && n.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                                    r = r * 16 + a(this.source[this.index++]);
                                } else {
                                    return null;
                                }
                            }
                            return String.fromCharCode(r);
                        };
                        e.prototype.scanUnicodeCodePointEscape = function() {
                            var e = this.source[this.index];
                            var t = 0;
                            if (e === "}") {
                                this.throwUnexpectedToken();
                            }
                            while (!this.eof()) {
                                e = this.source[this.index++];
                                if (!n.Character.isHexDigit(e.charCodeAt(0))) {
                                    break;
                                }
                                t = t * 16 + a(e);
                            }
                            if (t > 1114111 || e !== "}") {
                                this.throwUnexpectedToken();
                            }
                            return n.Character.fromCodePoint(t);
                        };
                        e.prototype.getIdentifier = function() {
                            var e = this.index++;
                            while (!this.eof()) {
                                var t = this.source.charCodeAt(this.index);
                                if (t === 92) {
                                    this.index = e;
                                    return this.getComplexIdentifier();
                                } else if (t >= 55296 && t < 57343) {
                                    this.index = e;
                                    return this.getComplexIdentifier();
                                }
                                if (n.Character.isIdentifierPart(t)) {
                                    ++this.index;
                                } else {
                                    break;
                                }
                            }
                            return this.source.slice(e, this.index);
                        };
                        e.prototype.getComplexIdentifier = function() {
                            var e = this.codePointAt(this.index);
                            var t = n.Character.fromCodePoint(e);
                            this.index += t.length;
                            var r;
                            if (e === 92) {
                                if (this.source.charCodeAt(this.index) !== 117) {
                                    this.throwUnexpectedToken();
                                }
                                ++this.index;
                                if (this.source[this.index] === "{") {
                                    ++this.index;
                                    r = this.scanUnicodeCodePointEscape();
                                } else {
                                    r = this.scanHexEscape("u");
                                    if (r === null || r === "\\" || !n.Character.isIdentifierStart(r.charCodeAt(0))) {
                                        this.throwUnexpectedToken();
                                    }
                                }
                                t = r;
                            }
                            while (!this.eof()) {
                                e = this.codePointAt(this.index);
                                if (!n.Character.isIdentifierPart(e)) {
                                    break;
                                }
                                r = n.Character.fromCodePoint(e);
                                t += r;
                                this.index += r.length;
                                if (e === 92) {
                                    t = t.substr(0, t.length - 1);
                                    if (this.source.charCodeAt(this.index) !== 117) {
                                        this.throwUnexpectedToken();
                                    }
                                    ++this.index;
                                    if (this.source[this.index] === "{") {
                                        ++this.index;
                                        r = this.scanUnicodeCodePointEscape();
                                    } else {
                                        r = this.scanHexEscape("u");
                                        if (r === null || r === "\\" || !n.Character.isIdentifierPart(r.charCodeAt(0))) {
                                            this.throwUnexpectedToken();
                                        }
                                    }
                                    t += r;
                                }
                            }
                            return t;
                        };
                        e.prototype.octalToDecimal = function(e) {
                            var t = e !== "0";
                            var r = o(e);
                            if (!this.eof() && n.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                                t = true;
                                r = r * 8 + o(this.source[this.index++]);
                                if ("0123".indexOf(e) >= 0 && !this.eof() && n.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                                    r = r * 8 + o(this.source[this.index++]);
                                }
                            }
                            return {
                                code: r,
                                octal: t
                            };
                        };
                        e.prototype.scanIdentifier = function() {
                            var e;
                            var t = this.index;
                            var r = this.source.charCodeAt(t) === 92 ? this.getComplexIdentifier() : this.getIdentifier();
                            if (r.length === 1) {
                                e = 3;
                            } else if (this.isKeyword(r)) {
                                e = 4;
                            } else if (r === "null") {
                                e = 5;
                            } else if (r === "true" || r === "false") {
                                e = 1;
                            } else {
                                e = 3;
                            }
                            if (e !== 3 && t + r.length !== this.index) {
                                var i = this.index;
                                this.index = t;
                                this.tolerateUnexpectedToken(s.Messages.InvalidEscapedReservedWord);
                                this.index = i;
                            }
                            return {
                                type: e,
                                value: r,
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: t,
                                end: this.index
                            };
                        };
                        e.prototype.scanPunctuator = function() {
                            var e = this.index;
                            var t = this.source[this.index];
                            switch (t) {
                              case "(":
                              case "{":
                                if (t === "{") {
                                    this.curlyStack.push("{");
                                }
                                ++this.index;
                                break;

                              case ".":
                                ++this.index;
                                if (this.source[this.index] === "." && this.source[this.index + 1] === ".") {
                                    this.index += 2;
                                    t = "...";
                                }
                                break;

                              case "}":
                                ++this.index;
                                this.curlyStack.pop();
                                break;

                              case ")":
                              case ";":
                              case ",":
                              case "[":
                              case "]":
                              case ":":
                              case "?":
                              case "~":
                                ++this.index;
                                break;

                              default:
                                t = this.source.substr(this.index, 4);
                                if (t === ">>>=") {
                                    this.index += 4;
                                } else {
                                    t = t.substr(0, 3);
                                    if (t === "===" || t === "!==" || t === ">>>" || t === "<<=" || t === ">>=" || t === "**=") {
                                        this.index += 3;
                                    } else {
                                        t = t.substr(0, 2);
                                        if (t === "&&" || t === "||" || t === "==" || t === "!=" || t === "+=" || t === "-=" || t === "*=" || t === "/=" || t === "++" || t === "--" || t === "<<" || t === ">>" || t === "&=" || t === "|=" || t === "^=" || t === "%=" || t === "<=" || t === ">=" || t === "=>" || t === "**") {
                                            this.index += 2;
                                        } else {
                                            t = this.source[this.index];
                                            if ("<>=!+-*%&|^/".indexOf(t) >= 0) {
                                                ++this.index;
                                            }
                                        }
                                    }
                                }
                            }
                            if (this.index === e) {
                                this.throwUnexpectedToken();
                            }
                            return {
                                type: 7,
                                value: t,
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: e,
                                end: this.index
                            };
                        };
                        e.prototype.scanHexLiteral = function(e) {
                            var t = "";
                            while (!this.eof()) {
                                if (!n.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                                    break;
                                }
                                t += this.source[this.index++];
                            }
                            if (t.length === 0) {
                                this.throwUnexpectedToken();
                            }
                            if (n.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
                                this.throwUnexpectedToken();
                            }
                            return {
                                type: 6,
                                value: parseInt("0x" + t, 16),
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: e,
                                end: this.index
                            };
                        };
                        e.prototype.scanBinaryLiteral = function(e) {
                            var t = "";
                            var r;
                            while (!this.eof()) {
                                r = this.source[this.index];
                                if (r !== "0" && r !== "1") {
                                    break;
                                }
                                t += this.source[this.index++];
                            }
                            if (t.length === 0) {
                                this.throwUnexpectedToken();
                            }
                            if (!this.eof()) {
                                r = this.source.charCodeAt(this.index);
                                if (n.Character.isIdentifierStart(r) || n.Character.isDecimalDigit(r)) {
                                    this.throwUnexpectedToken();
                                }
                            }
                            return {
                                type: 6,
                                value: parseInt(t, 2),
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: e,
                                end: this.index
                            };
                        };
                        e.prototype.scanOctalLiteral = function(e, t) {
                            var r = "";
                            var i = false;
                            if (n.Character.isOctalDigit(e.charCodeAt(0))) {
                                i = true;
                                r = "0" + this.source[this.index++];
                            } else {
                                ++this.index;
                            }
                            while (!this.eof()) {
                                if (!n.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                                    break;
                                }
                                r += this.source[this.index++];
                            }
                            if (!i && r.length === 0) {
                                this.throwUnexpectedToken();
                            }
                            if (n.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || n.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                this.throwUnexpectedToken();
                            }
                            return {
                                type: 6,
                                value: parseInt(r, 8),
                                octal: i,
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: t,
                                end: this.index
                            };
                        };
                        e.prototype.isImplicitOctalLiteral = function() {
                            for (var e = this.index + 1; e < this.length; ++e) {
                                var t = this.source[e];
                                if (t === "8" || t === "9") {
                                    return false;
                                }
                                if (!n.Character.isOctalDigit(t.charCodeAt(0))) {
                                    return true;
                                }
                            }
                            return true;
                        };
                        e.prototype.scanNumericLiteral = function() {
                            var e = this.index;
                            var t = this.source[e];
                            i.assert(n.Character.isDecimalDigit(t.charCodeAt(0)) || t === ".", "Numeric literal must start with a decimal digit or a decimal point");
                            var r = "";
                            if (t !== ".") {
                                r = this.source[this.index++];
                                t = this.source[this.index];
                                if (r === "0") {
                                    if (t === "x" || t === "X") {
                                        ++this.index;
                                        return this.scanHexLiteral(e);
                                    }
                                    if (t === "b" || t === "B") {
                                        ++this.index;
                                        return this.scanBinaryLiteral(e);
                                    }
                                    if (t === "o" || t === "O") {
                                        return this.scanOctalLiteral(t, e);
                                    }
                                    if (t && n.Character.isOctalDigit(t.charCodeAt(0))) {
                                        if (this.isImplicitOctalLiteral()) {
                                            return this.scanOctalLiteral(t, e);
                                        }
                                    }
                                }
                                while (n.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                    r += this.source[this.index++];
                                }
                                t = this.source[this.index];
                            }
                            if (t === ".") {
                                r += this.source[this.index++];
                                while (n.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                    r += this.source[this.index++];
                                }
                                t = this.source[this.index];
                            }
                            if (t === "e" || t === "E") {
                                r += this.source[this.index++];
                                t = this.source[this.index];
                                if (t === "+" || t === "-") {
                                    r += this.source[this.index++];
                                }
                                if (n.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                    while (n.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                        r += this.source[this.index++];
                                    }
                                } else {
                                    this.throwUnexpectedToken();
                                }
                            }
                            if (n.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
                                this.throwUnexpectedToken();
                            }
                            return {
                                type: 6,
                                value: parseFloat(r),
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: e,
                                end: this.index
                            };
                        };
                        e.prototype.scanStringLiteral = function() {
                            var e = this.index;
                            var t = this.source[e];
                            i.assert(t === "'" || t === '"', "String literal must starts with a quote");
                            ++this.index;
                            var r = false;
                            var a = "";
                            while (!this.eof()) {
                                var o = this.source[this.index++];
                                if (o === t) {
                                    t = "";
                                    break;
                                } else if (o === "\\") {
                                    o = this.source[this.index++];
                                    if (!o || !n.Character.isLineTerminator(o.charCodeAt(0))) {
                                        switch (o) {
                                          case "u":
                                            if (this.source[this.index] === "{") {
                                                ++this.index;
                                                a += this.scanUnicodeCodePointEscape();
                                            } else {
                                                var u = this.scanHexEscape(o);
                                                if (u === null) {
                                                    this.throwUnexpectedToken();
                                                }
                                                a += u;
                                            }
                                            break;

                                          case "x":
                                            var l = this.scanHexEscape(o);
                                            if (l === null) {
                                                this.throwUnexpectedToken(s.Messages.InvalidHexEscapeSequence);
                                            }
                                            a += l;
                                            break;

                                          case "n":
                                            a += "\n";
                                            break;

                                          case "r":
                                            a += "\r";
                                            break;

                                          case "t":
                                            a += "\t";
                                            break;

                                          case "b":
                                            a += "\b";
                                            break;

                                          case "f":
                                            a += "\f";
                                            break;

                                          case "v":
                                            a += "\v";
                                            break;

                                          case "8":
                                          case "9":
                                            a += o;
                                            this.tolerateUnexpectedToken();
                                            break;

                                          default:
                                            if (o && n.Character.isOctalDigit(o.charCodeAt(0))) {
                                                var c = this.octalToDecimal(o);
                                                r = c.octal || r;
                                                a += String.fromCharCode(c.code);
                                            } else {
                                                a += o;
                                            }
                                            break;
                                        }
                                    } else {
                                        ++this.lineNumber;
                                        if (o === "\r" && this.source[this.index] === "\n") {
                                            ++this.index;
                                        }
                                        this.lineStart = this.index;
                                    }
                                } else if (n.Character.isLineTerminator(o.charCodeAt(0))) {
                                    break;
                                } else {
                                    a += o;
                                }
                            }
                            if (t !== "") {
                                this.index = e;
                                this.throwUnexpectedToken();
                            }
                            return {
                                type: 8,
                                value: a,
                                octal: r,
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: e,
                                end: this.index
                            };
                        };
                        e.prototype.scanTemplate = function() {
                            var e = "";
                            var t = false;
                            var r = this.index;
                            var i = this.source[r] === "`";
                            var a = false;
                            var o = 2;
                            ++this.index;
                            while (!this.eof()) {
                                var u = this.source[this.index++];
                                if (u === "`") {
                                    o = 1;
                                    a = true;
                                    t = true;
                                    break;
                                } else if (u === "$") {
                                    if (this.source[this.index] === "{") {
                                        this.curlyStack.push("${");
                                        ++this.index;
                                        t = true;
                                        break;
                                    }
                                    e += u;
                                } else if (u === "\\") {
                                    u = this.source[this.index++];
                                    if (!n.Character.isLineTerminator(u.charCodeAt(0))) {
                                        switch (u) {
                                          case "n":
                                            e += "\n";
                                            break;

                                          case "r":
                                            e += "\r";
                                            break;

                                          case "t":
                                            e += "\t";
                                            break;

                                          case "u":
                                            if (this.source[this.index] === "{") {
                                                ++this.index;
                                                e += this.scanUnicodeCodePointEscape();
                                            } else {
                                                var l = this.index;
                                                var c = this.scanHexEscape(u);
                                                if (c !== null) {
                                                    e += c;
                                                } else {
                                                    this.index = l;
                                                    e += u;
                                                }
                                            }
                                            break;

                                          case "x":
                                            var h = this.scanHexEscape(u);
                                            if (h === null) {
                                                this.throwUnexpectedToken(s.Messages.InvalidHexEscapeSequence);
                                            }
                                            e += h;
                                            break;

                                          case "b":
                                            e += "\b";
                                            break;

                                          case "f":
                                            e += "\f";
                                            break;

                                          case "v":
                                            e += "\v";
                                            break;

                                          default:
                                            if (u === "0") {
                                                if (n.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                                    this.throwUnexpectedToken(s.Messages.TemplateOctalLiteral);
                                                }
                                                e += "\0";
                                            } else if (n.Character.isOctalDigit(u.charCodeAt(0))) {
                                                this.throwUnexpectedToken(s.Messages.TemplateOctalLiteral);
                                            } else {
                                                e += u;
                                            }
                                            break;
                                        }
                                    } else {
                                        ++this.lineNumber;
                                        if (u === "\r" && this.source[this.index] === "\n") {
                                            ++this.index;
                                        }
                                        this.lineStart = this.index;
                                    }
                                } else if (n.Character.isLineTerminator(u.charCodeAt(0))) {
                                    ++this.lineNumber;
                                    if (u === "\r" && this.source[this.index] === "\n") {
                                        ++this.index;
                                    }
                                    this.lineStart = this.index;
                                    e += "\n";
                                } else {
                                    e += u;
                                }
                            }
                            if (!t) {
                                this.throwUnexpectedToken();
                            }
                            if (!i) {
                                this.curlyStack.pop();
                            }
                            return {
                                type: 10,
                                value: this.source.slice(r + 1, this.index - o),
                                cooked: e,
                                head: i,
                                tail: a,
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: r,
                                end: this.index
                            };
                        };
                        e.prototype.testRegExp = function(e, t) {
                            var r = "￿";
                            var i = e;
                            var n = this;
                            if (t.indexOf("u") >= 0) {
                                i = i.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function(e, t, i) {
                                    var a = parseInt(t || i, 16);
                                    if (a > 1114111) {
                                        n.throwUnexpectedToken(s.Messages.InvalidRegExp);
                                    }
                                    if (a <= 65535) {
                                        return String.fromCharCode(a);
                                    }
                                    return r;
                                }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, r);
                            }
                            try {
                                RegExp(i);
                            } catch (e) {
                                this.throwUnexpectedToken(s.Messages.InvalidRegExp);
                            }
                            try {
                                return new RegExp(e, t);
                            } catch (e) {
                                return null;
                            }
                        };
                        e.prototype.scanRegExpBody = function() {
                            var e = this.source[this.index];
                            i.assert(e === "/", "Regular expression literal must start with a slash");
                            var t = this.source[this.index++];
                            var r = false;
                            var a = false;
                            while (!this.eof()) {
                                e = this.source[this.index++];
                                t += e;
                                if (e === "\\") {
                                    e = this.source[this.index++];
                                    if (n.Character.isLineTerminator(e.charCodeAt(0))) {
                                        this.throwUnexpectedToken(s.Messages.UnterminatedRegExp);
                                    }
                                    t += e;
                                } else if (n.Character.isLineTerminator(e.charCodeAt(0))) {
                                    this.throwUnexpectedToken(s.Messages.UnterminatedRegExp);
                                } else if (r) {
                                    if (e === "]") {
                                        r = false;
                                    }
                                } else {
                                    if (e === "/") {
                                        a = true;
                                        break;
                                    } else if (e === "[") {
                                        r = true;
                                    }
                                }
                            }
                            if (!a) {
                                this.throwUnexpectedToken(s.Messages.UnterminatedRegExp);
                            }
                            return t.substr(1, t.length - 2);
                        };
                        e.prototype.scanRegExpFlags = function() {
                            var e = "";
                            var t = "";
                            while (!this.eof()) {
                                var r = this.source[this.index];
                                if (!n.Character.isIdentifierPart(r.charCodeAt(0))) {
                                    break;
                                }
                                ++this.index;
                                if (r === "\\" && !this.eof()) {
                                    r = this.source[this.index];
                                    if (r === "u") {
                                        ++this.index;
                                        var i = this.index;
                                        var s = this.scanHexEscape("u");
                                        if (s !== null) {
                                            t += s;
                                            for (e += "\\u"; i < this.index; ++i) {
                                                e += this.source[i];
                                            }
                                        } else {
                                            this.index = i;
                                            t += "u";
                                            e += "\\u";
                                        }
                                        this.tolerateUnexpectedToken();
                                    } else {
                                        e += "\\";
                                        this.tolerateUnexpectedToken();
                                    }
                                } else {
                                    t += r;
                                    e += r;
                                }
                            }
                            return t;
                        };
                        e.prototype.scanRegExp = function() {
                            var e = this.index;
                            var t = this.scanRegExpBody();
                            var r = this.scanRegExpFlags();
                            var i = this.testRegExp(t, r);
                            return {
                                type: 9,
                                value: "",
                                pattern: t,
                                flags: r,
                                regex: i,
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: e,
                                end: this.index
                            };
                        };
                        e.prototype.lex = function() {
                            if (this.eof()) {
                                return {
                                    type: 2,
                                    value: "",
                                    lineNumber: this.lineNumber,
                                    lineStart: this.lineStart,
                                    start: this.index,
                                    end: this.index
                                };
                            }
                            var e = this.source.charCodeAt(this.index);
                            if (n.Character.isIdentifierStart(e)) {
                                return this.scanIdentifier();
                            }
                            if (e === 40 || e === 41 || e === 59) {
                                return this.scanPunctuator();
                            }
                            if (e === 39 || e === 34) {
                                return this.scanStringLiteral();
                            }
                            if (e === 46) {
                                if (n.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
                                    return this.scanNumericLiteral();
                                }
                                return this.scanPunctuator();
                            }
                            if (n.Character.isDecimalDigit(e)) {
                                return this.scanNumericLiteral();
                            }
                            if (e === 96 || e === 125 && this.curlyStack[this.curlyStack.length - 1] === "${") {
                                return this.scanTemplate();
                            }
                            if (e >= 55296 && e < 57343) {
                                if (n.Character.isIdentifierStart(this.codePointAt(this.index))) {
                                    return this.scanIdentifier();
                                }
                            }
                            return this.scanPunctuator();
                        };
                        return e;
                    }();
                    t.Scanner = u;
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    t.TokenName = {};
                    t.TokenName[1] = "Boolean";
                    t.TokenName[2] = "<end>";
                    t.TokenName[3] = "Identifier";
                    t.TokenName[4] = "Keyword";
                    t.TokenName[5] = "Null";
                    t.TokenName[6] = "Numeric";
                    t.TokenName[7] = "Punctuator";
                    t.TokenName[8] = "String";
                    t.TokenName[9] = "RegularExpression";
                    t.TokenName[10] = "Template";
                }, function(e, t) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    t.XHTMLEntities = {
                        quot: '"',
                        amp: "&",
                        apos: "'",
                        gt: ">",
                        nbsp: " ",
                        iexcl: "¡",
                        cent: "¢",
                        pound: "£",
                        curren: "¤",
                        yen: "¥",
                        brvbar: "¦",
                        sect: "§",
                        uml: "¨",
                        copy: "©",
                        ordf: "ª",
                        laquo: "«",
                        not: "¬",
                        shy: "­",
                        reg: "®",
                        macr: "¯",
                        deg: "°",
                        plusmn: "±",
                        sup2: "²",
                        sup3: "³",
                        acute: "´",
                        micro: "µ",
                        para: "¶",
                        middot: "·",
                        cedil: "¸",
                        sup1: "¹",
                        ordm: "º",
                        raquo: "»",
                        frac14: "¼",
                        frac12: "½",
                        frac34: "¾",
                        iquest: "¿",
                        Agrave: "À",
                        Aacute: "Á",
                        Acirc: "Â",
                        Atilde: "Ã",
                        Auml: "Ä",
                        Aring: "Å",
                        AElig: "Æ",
                        Ccedil: "Ç",
                        Egrave: "È",
                        Eacute: "É",
                        Ecirc: "Ê",
                        Euml: "Ë",
                        Igrave: "Ì",
                        Iacute: "Í",
                        Icirc: "Î",
                        Iuml: "Ï",
                        ETH: "Ð",
                        Ntilde: "Ñ",
                        Ograve: "Ò",
                        Oacute: "Ó",
                        Ocirc: "Ô",
                        Otilde: "Õ",
                        Ouml: "Ö",
                        times: "×",
                        Oslash: "Ø",
                        Ugrave: "Ù",
                        Uacute: "Ú",
                        Ucirc: "Û",
                        Uuml: "Ü",
                        Yacute: "Ý",
                        THORN: "Þ",
                        szlig: "ß",
                        agrave: "à",
                        aacute: "á",
                        acirc: "â",
                        atilde: "ã",
                        auml: "ä",
                        aring: "å",
                        aelig: "æ",
                        ccedil: "ç",
                        egrave: "è",
                        eacute: "é",
                        ecirc: "ê",
                        euml: "ë",
                        igrave: "ì",
                        iacute: "í",
                        icirc: "î",
                        iuml: "ï",
                        eth: "ð",
                        ntilde: "ñ",
                        ograve: "ò",
                        oacute: "ó",
                        ocirc: "ô",
                        otilde: "õ",
                        ouml: "ö",
                        divide: "÷",
                        oslash: "ø",
                        ugrave: "ù",
                        uacute: "ú",
                        ucirc: "û",
                        uuml: "ü",
                        yacute: "ý",
                        thorn: "þ",
                        yuml: "ÿ",
                        OElig: "Œ",
                        oelig: "œ",
                        Scaron: "Š",
                        scaron: "š",
                        Yuml: "Ÿ",
                        fnof: "ƒ",
                        circ: "ˆ",
                        tilde: "˜",
                        Alpha: "Α",
                        Beta: "Β",
                        Gamma: "Γ",
                        Delta: "Δ",
                        Epsilon: "Ε",
                        Zeta: "Ζ",
                        Eta: "Η",
                        Theta: "Θ",
                        Iota: "Ι",
                        Kappa: "Κ",
                        Lambda: "Λ",
                        Mu: "Μ",
                        Nu: "Ν",
                        Xi: "Ξ",
                        Omicron: "Ο",
                        Pi: "Π",
                        Rho: "Ρ",
                        Sigma: "Σ",
                        Tau: "Τ",
                        Upsilon: "Υ",
                        Phi: "Φ",
                        Chi: "Χ",
                        Psi: "Ψ",
                        Omega: "Ω",
                        alpha: "α",
                        beta: "β",
                        gamma: "γ",
                        delta: "δ",
                        epsilon: "ε",
                        zeta: "ζ",
                        eta: "η",
                        theta: "θ",
                        iota: "ι",
                        kappa: "κ",
                        lambda: "λ",
                        mu: "μ",
                        nu: "ν",
                        xi: "ξ",
                        omicron: "ο",
                        pi: "π",
                        rho: "ρ",
                        sigmaf: "ς",
                        sigma: "σ",
                        tau: "τ",
                        upsilon: "υ",
                        phi: "φ",
                        chi: "χ",
                        psi: "ψ",
                        omega: "ω",
                        thetasym: "ϑ",
                        upsih: "ϒ",
                        piv: "ϖ",
                        ensp: " ",
                        emsp: " ",
                        thinsp: " ",
                        zwnj: "‌",
                        zwj: "‍",
                        lrm: "‎",
                        rlm: "‏",
                        ndash: "–",
                        mdash: "—",
                        lsquo: "‘",
                        rsquo: "’",
                        sbquo: "‚",
                        ldquo: "“",
                        rdquo: "”",
                        bdquo: "„",
                        dagger: "†",
                        Dagger: "‡",
                        bull: "•",
                        hellip: "…",
                        permil: "‰",
                        prime: "′",
                        Prime: "″",
                        lsaquo: "‹",
                        rsaquo: "›",
                        oline: "‾",
                        frasl: "⁄",
                        euro: "€",
                        image: "ℑ",
                        weierp: "℘",
                        real: "ℜ",
                        trade: "™",
                        alefsym: "ℵ",
                        larr: "←",
                        uarr: "↑",
                        rarr: "→",
                        darr: "↓",
                        harr: "↔",
                        crarr: "↵",
                        lArr: "⇐",
                        uArr: "⇑",
                        rArr: "⇒",
                        dArr: "⇓",
                        hArr: "⇔",
                        forall: "∀",
                        part: "∂",
                        exist: "∃",
                        empty: "∅",
                        nabla: "∇",
                        isin: "∈",
                        notin: "∉",
                        ni: "∋",
                        prod: "∏",
                        sum: "∑",
                        minus: "−",
                        lowast: "∗",
                        radic: "√",
                        prop: "∝",
                        infin: "∞",
                        ang: "∠",
                        and: "∧",
                        or: "∨",
                        cap: "∩",
                        cup: "∪",
                        int: "∫",
                        there4: "∴",
                        sim: "∼",
                        cong: "≅",
                        asymp: "≈",
                        ne: "≠",
                        equiv: "≡",
                        le: "≤",
                        ge: "≥",
                        sub: "⊂",
                        sup: "⊃",
                        nsub: "⊄",
                        sube: "⊆",
                        supe: "⊇",
                        oplus: "⊕",
                        otimes: "⊗",
                        perp: "⊥",
                        sdot: "⋅",
                        lceil: "⌈",
                        rceil: "⌉",
                        lfloor: "⌊",
                        rfloor: "⌋",
                        loz: "◊",
                        spades: "♠",
                        clubs: "♣",
                        hearts: "♥",
                        diams: "♦",
                        lang: "⟨",
                        rang: "⟩"
                    };
                }, function(e, t, r) {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: true
                    });
                    var i = r(10);
                    var n = r(12);
                    var s = r(13);
                    var a = function() {
                        function e() {
                            this.values = [];
                            this.curly = this.paren = -1;
                        }
                        e.prototype.beforeFunctionExpression = function(e) {
                            return [ "(", "{", "[", "in", "typeof", "instanceof", "new", "return", "case", "delete", "throw", "void", "=", "+=", "-=", "*=", "**=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", ",", "+", "-", "*", "**", "/", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=", "<=", "<", ">", "!=", "!==" ].indexOf(e) >= 0;
                        };
                        e.prototype.isRegexStart = function() {
                            var e = this.values[this.values.length - 1];
                            var t = e !== null;
                            switch (e) {
                              case "this":
                              case "]":
                                t = false;
                                break;

                              case ")":
                                var r = this.values[this.paren - 1];
                                t = r === "if" || r === "while" || r === "for" || r === "with";
                                break;

                              case "}":
                                t = false;
                                if (this.values[this.curly - 3] === "function") {
                                    var i = this.values[this.curly - 4];
                                    t = i ? !this.beforeFunctionExpression(i) : false;
                                } else if (this.values[this.curly - 4] === "function") {
                                    var i = this.values[this.curly - 5];
                                    t = i ? !this.beforeFunctionExpression(i) : true;
                                }
                                break;

                              default:
                                break;
                            }
                            return t;
                        };
                        e.prototype.push = function(e) {
                            if (e.type === 7 || e.type === 4) {
                                if (e.value === "{") {
                                    this.curly = this.values.length;
                                } else if (e.value === "(") {
                                    this.paren = this.values.length;
                                }
                                this.values.push(e.value);
                            } else {
                                this.values.push(null);
                            }
                        };
                        return e;
                    }();
                    var o = function() {
                        function e(e, t) {
                            this.errorHandler = new i.ErrorHandler();
                            this.errorHandler.tolerant = t ? typeof t.tolerant === "boolean" && t.tolerant : false;
                            this.scanner = new n.Scanner(e, this.errorHandler);
                            this.scanner.trackComment = t ? typeof t.comment === "boolean" && t.comment : false;
                            this.trackRange = t ? typeof t.range === "boolean" && t.range : false;
                            this.trackLoc = t ? typeof t.loc === "boolean" && t.loc : false;
                            this.buffer = [];
                            this.reader = new a();
                        }
                        e.prototype.errors = function() {
                            return this.errorHandler.errors;
                        };
                        e.prototype.getNextToken = function() {
                            if (this.buffer.length === 0) {
                                var e = this.scanner.scanComments();
                                if (this.scanner.trackComment) {
                                    for (var t = 0; t < e.length; ++t) {
                                        var r = e[t];
                                        var i = this.scanner.source.slice(r.slice[0], r.slice[1]);
                                        var n = {
                                            type: r.multiLine ? "BlockComment" : "LineComment",
                                            value: i
                                        };
                                        if (this.trackRange) {
                                            n.range = r.range;
                                        }
                                        if (this.trackLoc) {
                                            n.loc = r.loc;
                                        }
                                        this.buffer.push(n);
                                    }
                                }
                                if (!this.scanner.eof()) {
                                    var a = void 0;
                                    if (this.trackLoc) {
                                        a = {
                                            start: {
                                                line: this.scanner.lineNumber,
                                                column: this.scanner.index - this.scanner.lineStart
                                            },
                                            end: {}
                                        };
                                    }
                                    var o = this.scanner.source[this.scanner.index] === "/" && this.reader.isRegexStart();
                                    var u = o ? this.scanner.scanRegExp() : this.scanner.lex();
                                    this.reader.push(u);
                                    var l = {
                                        type: s.TokenName[u.type],
                                        value: this.scanner.source.slice(u.start, u.end)
                                    };
                                    if (this.trackRange) {
                                        l.range = [ u.start, u.end ];
                                    }
                                    if (this.trackLoc) {
                                        a.end = {
                                            line: this.scanner.lineNumber,
                                            column: this.scanner.index - this.scanner.lineStart
                                        };
                                        l.loc = a;
                                    }
                                    if (u.type === 9) {
                                        var c = u.pattern;
                                        var h = u.flags;
                                        l.regex = {
                                            pattern: c,
                                            flags: h
                                        };
                                    }
                                    this.buffer.push(l);
                                }
                            }
                            return this.buffer.shift();
                        };
                        return e;
                    }();
                    t.Tokenizer = o;
                } ]);
            });
        }).call(t, r(93)(e));
    }, function(e, t) {
        "use strict";
        var r = Object;
        var i = Object.defineProperty;
        var n = Object.create;
        function s(e, t, n) {
            if (i) try {
                i.call(r, e, t, {
                    value: n
                });
            } catch (r) {
                e[t] = n;
            } else {
                e[t] = n;
            }
        }
        function a(e) {
            if (e) {
                s(e, "call", e.call);
                s(e, "apply", e.apply);
            }
            return e;
        }
        a(i);
        a(n);
        var o = a(Object.prototype.hasOwnProperty);
        var u = a(Number.prototype.toString);
        var l = a(String.prototype.slice);
        var c = function e() {};
        function h(e) {
            if (n) {
                return n.call(r, e);
            }
            c.prototype = e || null;
            return new c();
        }
        var p = Math.random;
        var f = h(null);
        function d() {
            do {
                var e = m(l.call(u.call(p(), 36), 2));
            } while (o.call(f, e));
            return f[e] = e;
        }
        function m(e) {
            var t = {};
            t[e] = true;
            return Object.keys(t)[0];
        }
        t.makeUniqueKey = d;
        var v = Object.getOwnPropertyNames;
        Object.getOwnPropertyNames = function e(t) {
            for (var r = v(t), i = 0, n = 0, s = r.length; i < s; ++i) {
                if (!o.call(f, r[i])) {
                    if (i > n) {
                        r[n] = r[i];
                    }
                    ++n;
                }
            }
            r.length = n;
            return r;
        };
        function y(e) {
            return h(null);
        }
        function x(e) {
            var t = d();
            var r = h(null);
            e = e || y;
            function i(i) {
                var n;
                function a(t, s) {
                    if (t === r) {
                        return s ? n = null : n || (n = e(i));
                    }
                }
                s(i, t, a);
            }
            function n(e) {
                if (!o.call(e, t)) i(e);
                return e[t](r);
            }
            n.forget = function(e) {
                if (o.call(e, t)) e[t](r, true);
            };
            return n;
        }
        t.makeAccessor = x;
    }, function(e, t, r) {
        "use strict";
        var i = r(8);
        var n = r(6);
        var s = n.namedTypes;
        var a = n.builtInTypes.array;
        var o = n.builtInTypes.object;
        var u = r(14);
        var l = u.fromString;
        var c = u.Lines;
        var h = u.concat;
        var p = r(9);
        var f = p.comparePos;
        var d = r(44).makeUniqueKey();
        function m(e, t, r) {
            if (!e) {
                return;
            }
            p.fixFaultyLocations(e, t);
            if (r) {
                if (s.Node.check(e) && s.SourceLocation.check(e.loc)) {
                    for (var i = r.length - 1; i >= 0; --i) {
                        if (f(r[i].loc.end, e.loc.start) <= 0) {
                            break;
                        }
                    }
                    r.splice(i + 1, 0, e);
                    return;
                }
            } else if (e[d]) {
                return e[d];
            }
            var u;
            if (a.check(e)) {
                u = Object.keys(e);
            } else if (o.check(e)) {
                u = n.getFieldNames(e);
            } else {
                return;
            }
            if (!r) {
                Object.defineProperty(e, d, {
                    value: r = [],
                    enumerable: false
                });
            }
            for (var i = 0, l = u.length; i < l; ++i) {
                m(e[u[i]], t, r);
            }
            return r;
        }
        function v(e, t, r) {
            var i = m(e, r);
            var n = 0, s = i.length;
            while (n < s) {
                var a = n + s >> 1;
                var o = i[a];
                if (f(o.loc.start, t.loc.start) <= 0 && f(t.loc.end, o.loc.end) <= 0) {
                    v(t.enclosingNode = o, t, r);
                    return;
                }
                if (f(o.loc.end, t.loc.start) <= 0) {
                    var u = o;
                    n = a + 1;
                    continue;
                }
                if (f(t.loc.end, o.loc.start) <= 0) {
                    var l = o;
                    s = a;
                    continue;
                }
                throw new Error("Comment location overlaps with node location");
            }
            if (u) {
                t.precedingNode = u;
            }
            if (l) {
                t.followingNode = l;
            }
        }
        t.attach = function(e, t, r) {
            if (!a.check(e)) {
                return;
            }
            var n = [];
            e.forEach(function(e) {
                e.loc.lines = r;
                v(t, e, r);
                var s = e.precedingNode;
                var a = e.enclosingNode;
                var o = e.followingNode;
                if (s && o) {
                    var u = n.length;
                    if (u > 0) {
                        var l = n[u - 1];
                        i.strictEqual(l.precedingNode === e.precedingNode, l.followingNode === e.followingNode);
                        if (l.followingNode !== e.followingNode) {
                            y(n, r);
                        }
                    }
                    n.push(e);
                } else if (s) {
                    y(n, r);
                    E(s, e);
                } else if (o) {
                    y(n, r);
                    g(o, e);
                } else if (a) {
                    y(n, r);
                    b(a, e);
                } else {
                    throw new Error("AST contains no nodes at all?");
                }
            });
            y(n, r);
            e.forEach(function(e) {
                delete e.precedingNode;
                delete e.enclosingNode;
                delete e.followingNode;
            });
        };
        function y(e, t) {
            var r = e.length;
            if (r === 0) {
                return;
            }
            var n = e[0].precedingNode;
            var s = e[0].followingNode;
            var a = s.loc.start;
            for (var o = r; o > 0; --o) {
                var u = e[o - 1];
                i.strictEqual(u.precedingNode, n);
                i.strictEqual(u.followingNode, s);
                var l = t.sliceString(u.loc.end, a);
                if (/\S/.test(l)) {
                    break;
                }
                a = u.loc.start;
            }
            while (o <= r && (u = e[o]) && (u.type === "Line" || u.type === "CommentLine") && u.loc.start.column > s.loc.start.column) {
                ++o;
            }
            e.forEach(function(e, t) {
                if (t < o) {
                    E(n, e);
                } else {
                    g(s, e);
                }
            });
            e.length = 0;
        }
        function x(e, t) {
            var r = e.comments || (e.comments = []);
            r.push(t);
        }
        function g(e, t) {
            t.leading = true;
            t.trailing = false;
            x(e, t);
        }
        function b(e, t) {
            t.leading = false;
            t.trailing = false;
            x(e, t);
        }
        function E(e, t) {
            t.leading = false;
            t.trailing = true;
            x(e, t);
        }
        function S(e, t) {
            var r = e.getValue();
            s.Comment.assert(r);
            var i = r.loc;
            var n = i && i.lines;
            var a = [ t(e) ];
            if (r.trailing) {
                a.push("\n");
            } else if (n instanceof c) {
                var o = n.slice(i.end, n.skipSpaces(i.end));
                if (o.length === 1) {
                    a.push(o);
                } else {
                    a.push(new Array(o.length).join("\n"));
                }
            } else {
                a.push("\n");
            }
            return h(a);
        }
        function D(e, t) {
            var r = e.getValue(e);
            s.Comment.assert(r);
            var i = r.loc;
            var n = i && i.lines;
            var a = [];
            if (n instanceof c) {
                var o = n.skipSpaces(i.start, true) || n.firstPos();
                var u = n.slice(o, i.start);
                if (u.length === 1) {
                    a.push(u);
                } else {
                    a.push(new Array(u.length).join("\n"));
                }
            }
            a.push(t(e));
            return h(a);
        }
        t.printComments = function(e, t) {
            var r = e.getValue();
            var i = t(e);
            var a = s.Node.check(r) && n.getFieldValue(r, "comments");
            if (!a || a.length === 0) {
                return i;
            }
            var o = [];
            var u = [ i ];
            e.each(function(e) {
                var i = e.getValue();
                var a = n.getFieldValue(i, "leading");
                var l = n.getFieldValue(i, "trailing");
                if (a || l && !(s.Statement.check(r) || i.type === "Block" || i.type === "CommentBlock")) {
                    o.push(S(e, t));
                } else if (l) {
                    u.push(D(e, t));
                }
            }, "comments");
            o.push.apply(o, u);
            return h(o);
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(8);
        var n = r(6);
        var s = n.namedTypes;
        var a = s.Node;
        var o = n.builtInTypes.array;
        var u = n.builtInTypes.number;
        var l = r(9);
        function c(e) {
            i.ok(this instanceof c);
            this.stack = [ e ];
        }
        var h = c.prototype;
        e.exports = c;
        c.from = function(e) {
            if (e instanceof c) {
                return e.copy();
            }
            if (e instanceof n.NodePath) {
                var t = Object.create(c.prototype);
                var r = [ e.value ];
                for (var i; i = e.parentPath; e = i) {
                    r.push(e.name, i.value);
                }
                t.stack = r.reverse();
                return t;
            }
            return new c(e);
        };
        h.copy = function e() {
            var e = Object.create(c.prototype);
            e.stack = this.stack.slice(0);
            return e;
        };
        h.getName = function e() {
            var t = this.stack;
            var r = t.length;
            if (r > 1) {
                return t[r - 2];
            }
            return null;
        };
        h.getValue = function e() {
            var t = this.stack;
            return t[t.length - 1];
        };
        h.valueIsDuplicate = function() {
            var e = this.stack;
            var t = e.length - 1;
            return e.lastIndexOf(e[t], t - 1) >= 0;
        };
        function p(e, t) {
            var r = e.stack;
            for (var i = r.length - 1; i >= 0; i -= 2) {
                var n = r[i];
                if (s.Node.check(n) && --t < 0) {
                    return n;
                }
            }
            return null;
        }
        h.getNode = function e(t) {
            return p(this, ~~t);
        };
        h.getParentNode = function e(t) {
            return p(this, ~~t + 1);
        };
        h.getRootValue = function e() {
            var t = this.stack;
            if (t.length % 2 === 0) {
                return t[1];
            }
            return t[0];
        };
        h.call = function e(t) {
            var r = this.stack;
            var i = r.length;
            var n = r[i - 1];
            var s = arguments.length;
            for (var a = 1; a < s; ++a) {
                var o = arguments[a];
                n = n[o];
                r.push(o, n);
            }
            var u = t(this);
            r.length = i;
            return u;
        };
        h.each = function e(t) {
            var r = this.stack;
            var i = r.length;
            var n = r[i - 1];
            var s = arguments.length;
            for (var a = 1; a < s; ++a) {
                var o = arguments[a];
                n = n[o];
                r.push(o, n);
            }
            for (var a = 0; a < n.length; ++a) {
                if (a in n) {
                    r.push(a, n[a]);
                    t(this);
                    r.length -= 2;
                }
            }
            r.length = i;
        };
        h.map = function e(t) {
            var r = this.stack;
            var i = r.length;
            var n = r[i - 1];
            var s = arguments.length;
            for (var a = 1; a < s; ++a) {
                var o = arguments[a];
                n = n[o];
                r.push(o, n);
            }
            var u = new Array(n.length);
            for (var a = 0; a < n.length; ++a) {
                if (a in n) {
                    r.push(a, n[a]);
                    u[a] = t(this, a);
                    r.length -= 2;
                }
            }
            r.length = i;
            return u;
        };
        h.hasParens = function() {
            var e = this.getNode();
            var t = this.getPrevToken(e);
            if (!t) {
                return false;
            }
            var r = this.getNextToken(e);
            if (!r) {
                return false;
            }
            if (t.value === "(") {
                if (r.value === ")") {
                    return true;
                }
                var i = !this.canBeFirstInStatement() && this.firstInStatement() && !this.needsParens(true);
                if (i) {
                    return true;
                }
            }
            return false;
        };
        h.getPrevToken = function(e) {
            e = e || this.getNode();
            var t = e && e.loc;
            var r = t && t.tokens;
            if (r && t.start.token > 0) {
                var i = r[t.start.token - 1];
                if (i) {
                    var n = this.getRootValue().loc;
                    if (l.comparePos(n.start, i.loc.start) <= 0) {
                        return i;
                    }
                }
            }
            return null;
        };
        h.getNextToken = function(e) {
            e = e || this.getNode();
            var t = e && e.loc;
            var r = t && t.tokens;
            if (r && t.end.token < r.length) {
                var i = r[t.end.token];
                if (i) {
                    var n = this.getRootValue().loc;
                    if (l.comparePos(i.loc.end, n.end) <= 0) {
                        return i;
                    }
                }
            }
            return null;
        };
        h.needsParens = function(e) {
            var t = this.getNode();
            if (t.type === "AssignmentExpression" && t.left.type === "ObjectPattern") {
                return true;
            }
            var r = this.getParentNode();
            if (!r) {
                return false;
            }
            var n = this.getName();
            if (this.getValue() !== t) {
                return false;
            }
            if (s.Statement.check(t)) {
                return false;
            }
            if (t.type === "Identifier") {
                return false;
            }
            if (r.type === "ParenthesizedExpression") {
                return false;
            }
            switch (t.type) {
              case "UnaryExpression":
              case "SpreadElement":
              case "SpreadProperty":
                return r.type === "MemberExpression" && n === "object" && r.object === t;

              case "BinaryExpression":
              case "LogicalExpression":
                switch (r.type) {
                  case "CallExpression":
                    return n === "callee" && r.callee === t;

                  case "UnaryExpression":
                  case "SpreadElement":
                  case "SpreadProperty":
                    return true;

                  case "MemberExpression":
                    return n === "object" && r.object === t;

                  case "BinaryExpression":
                  case "LogicalExpression":
                    var a = r.operator;
                    var o = m[a];
                    var l = t.operator;
                    var c = m[l];
                    if (o > c) {
                        return true;
                    }
                    if (o === c && n === "right") {
                        i.strictEqual(r.right, t);
                        return true;
                    }

                  default:
                    return false;
                }

              case "SequenceExpression":
                switch (r.type) {
                  case "ReturnStatement":
                    return false;

                  case "ForStatement":
                    return false;

                  case "ExpressionStatement":
                    return n !== "expression";

                  default:
                    return true;
                }

              case "YieldExpression":
                switch (r.type) {
                  case "BinaryExpression":
                  case "LogicalExpression":
                  case "UnaryExpression":
                  case "SpreadElement":
                  case "SpreadProperty":
                  case "CallExpression":
                  case "MemberExpression":
                  case "NewExpression":
                  case "ConditionalExpression":
                  case "YieldExpression":
                    return true;

                  default:
                    return false;
                }

              case "IntersectionTypeAnnotation":
              case "UnionTypeAnnotation":
                return r.type === "NullableTypeAnnotation";

              case "Literal":
                return r.type === "MemberExpression" && u.check(t.value) && n === "object" && r.object === t;

              case "NumericLiteral":
                return r.type === "MemberExpression" && n === "object" && r.object === t;

              case "AssignmentExpression":
              case "ConditionalExpression":
                switch (r.type) {
                  case "UnaryExpression":
                  case "SpreadElement":
                  case "SpreadProperty":
                  case "BinaryExpression":
                  case "LogicalExpression":
                    return true;

                  case "CallExpression":
                  case "NewExpression":
                    return n === "callee" && r.callee === t;

                  case "ConditionalExpression":
                    return n === "test" && r.test === t;

                  case "MemberExpression":
                    return n === "object" && r.object === t;

                  default:
                    return false;
                }

              case "ArrowFunctionExpression":
                if (s.CallExpression.check(r) && n === "callee") {
                    return true;
                }
                if (s.MemberExpression.check(r) && n === "object") {
                    return true;
                }
                return f(r);

              case "ObjectExpression":
                if (r.type === "ArrowFunctionExpression" && n === "body") {
                    return true;
                }
                break;

              case "CallExpression":
                if (n === "declaration" && s.ExportDefaultDeclaration.check(r) && s.FunctionExpression.check(t.callee)) {
                    return true;
                }
            }
            if (r.type === "NewExpression" && n === "callee" && r.callee === t) {
                return v(t);
            }
            if (e !== true && !this.canBeFirstInStatement() && this.firstInStatement()) {
                return true;
            }
            return false;
        };
        function f(e) {
            return s.BinaryExpression.check(e) || s.LogicalExpression.check(e);
        }
        function d(e) {
            return s.UnaryExpression.check(e) || s.SpreadElement && s.SpreadElement.check(e) || s.SpreadProperty && s.SpreadProperty.check(e);
        }
        var m = {};
        [ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "%", "**" ] ].forEach(function(e, t) {
            e.forEach(function(e) {
                m[e] = t;
            });
        });
        function v(e) {
            if (s.CallExpression.check(e)) {
                return true;
            }
            if (o.check(e)) {
                return e.some(v);
            }
            if (s.Node.check(e)) {
                return n.someField(e, function(e, t) {
                    return v(t);
                });
            }
            return false;
        }
        h.canBeFirstInStatement = function() {
            var e = this.getNode();
            if (s.FunctionExpression.check(e)) {
                return false;
            }
            if (s.ObjectExpression.check(e)) {
                return false;
            }
            if (s.ClassExpression.check(e)) {
                return false;
            }
            return true;
        };
        h.firstInStatement = function() {
            var e = this.stack;
            var t, r;
            var n, a;
            for (var o = e.length - 1; o >= 0; o -= 2) {
                if (s.Node.check(e[o])) {
                    n = t;
                    a = r;
                    t = e[o - 1];
                    r = e[o];
                }
                if (!r || !a) {
                    continue;
                }
                if (s.BlockStatement.check(r) && t === "body" && n === 0) {
                    i.strictEqual(r.body[0], a);
                    return true;
                }
                if (s.ExpressionStatement.check(r) && n === "expression") {
                    i.strictEqual(r.expression, a);
                    return true;
                }
                if (s.AssignmentExpression.check(r) && n === "left") {
                    i.strictEqual(r.left, a);
                    return true;
                }
                if (s.ArrowFunctionExpression.check(r) && n === "body") {
                    i.strictEqual(r.body, a);
                    return true;
                }
                if (s.SequenceExpression.check(r) && t === "expressions" && n === 0) {
                    i.strictEqual(r.expressions[0], a);
                    continue;
                }
                if (s.CallExpression.check(r) && n === "callee") {
                    i.strictEqual(r.callee, a);
                    continue;
                }
                if (s.MemberExpression.check(r) && n === "object") {
                    i.strictEqual(r.object, a);
                    continue;
                }
                if (s.ConditionalExpression.check(r) && n === "test") {
                    i.strictEqual(r.test, a);
                    continue;
                }
                if (f(r) && n === "left") {
                    i.strictEqual(r.left, a);
                    continue;
                }
                if (s.UnaryExpression.check(r) && !r.prefix && n === "argument") {
                    i.strictEqual(r.argument, a);
                    continue;
                }
                return false;
            }
            return true;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(8);
        var n = r(14);
        var s = r(6);
        var a = s.getFieldValue;
        var o = s.namedTypes.Node;
        var u = s.namedTypes.Printable;
        var l = s.namedTypes.Expression;
        var c = s.namedTypes.ReturnStatement;
        var h = s.namedTypes.SourceLocation;
        var p = r(9);
        var f = p.comparePos;
        var d = r(46);
        var m = s.builtInTypes.object;
        var v = s.builtInTypes.array;
        var y = s.builtInTypes.string;
        var x = /[0-9a-z_$]/i;
        function g(e) {
            i.ok(this instanceof g);
            i.ok(e instanceof n.Lines);
            var t = this, r = [];
            t.replace = function(e, t) {
                if (y.check(t)) t = n.fromString(t);
                r.push({
                    lines: t,
                    start: e.start,
                    end: e.end
                });
            };
            t.get = function(t) {
                t = t || {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: e.length,
                        column: e.getLineLength(e.length)
                    }
                };
                var s = t.start, a = [];
                function o(t, r) {
                    i.ok(f(t, r) <= 0);
                    a.push(e.slice(t, r));
                }
                r.sort(function(e, t) {
                    return f(e.start, t.start);
                }).forEach(function(e) {
                    if (f(s, e.start) > 0) {} else {
                        o(s, e.start);
                        a.push(e.lines);
                        s = e.end;
                    }
                });
                o(s, t.end);
                return n.concat(a);
            };
        }
        t.Patcher = g;
        var b = g.prototype;
        b.tryToReprintComments = function(e, t, r) {
            var n = this;
            if (!e.comments && !t.comments) {
                return true;
            }
            var s = d.from(e);
            var a = d.from(t);
            s.stack.push("comments", E(e));
            a.stack.push("comments", E(t));
            var o = [];
            var u = k(s, a, o);
            if (u && o.length > 0) {
                o.forEach(function(e) {
                    var t = e.oldPath.getValue();
                    i.ok(t.leading || t.trailing);
                    n.replace(t.loc, r(e.newPath).indentTail(t.loc.indent));
                });
            }
            return u;
        };
        function E(e) {
            var t = [];
            if (e.comments && e.comments.length > 0) {
                e.comments.forEach(function(e) {
                    if (e.leading || e.trailing) {
                        t.push(e);
                    }
                });
            }
            return t;
        }
        b.deleteComments = function(e) {
            if (!e.comments) {
                return;
            }
            var t = this;
            e.comments.forEach(function(r) {
                if (r.leading) {
                    t.replace({
                        start: r.loc.start,
                        end: e.loc.lines.skipSpaces(r.loc.end, false, false)
                    }, "");
                } else if (r.trailing) {
                    t.replace({
                        start: e.loc.lines.skipSpaces(r.loc.start, true, false),
                        end: r.loc.end
                    }, "");
                }
            });
        };
        t.getReprinter = function(e) {
            i.ok(e instanceof d);
            var t = e.getValue();
            if (!u.check(t)) return;
            var r = t.original;
            var s = r && r.loc;
            var a = s && s.lines;
            var o = [];
            if (!a || !C(e, o)) return;
            return function(t) {
                var i = new g(a);
                o.forEach(function(e) {
                    var r = e.newPath.getValue();
                    var s = e.oldPath.getValue();
                    h.assert(s.loc, true);
                    var o = !i.tryToReprintComments(r, s, t);
                    if (o) {
                        i.deleteComments(s);
                    }
                    var u = t(e.newPath, {
                        includeComments: o,
                        avoidRootParens: s.type === r.type && e.oldPath.hasParens()
                    }).indentTail(s.loc.indent);
                    var l = S(a, s.loc, u);
                    var c = D(a, s.loc, u);
                    if (l || c) {
                        var p = [];
                        l && p.push(" ");
                        p.push(u);
                        c && p.push(" ");
                        u = n.concat(p);
                    }
                    i.replace(s.loc, u);
                });
                var u = i.get(s).indentTail(-r.loc.indent);
                if (e.needsParens()) {
                    return n.concat([ "(", u, ")" ]);
                }
                return u;
            };
        };
        function S(e, t, r) {
            var i = p.copyPos(t.start);
            var n = e.prevPos(i) && e.charAt(i);
            var s = r.charAt(r.firstPos());
            return n && x.test(n) && s && x.test(s);
        }
        function D(e, t, r) {
            var i = e.charAt(t.end);
            var n = r.lastPos();
            var s = r.prevPos(n) && r.charAt(n);
            return s && x.test(s) && i && x.test(i);
        }
        function C(e, t) {
            var r = e.getValue();
            u.assert(r);
            var n = r.original;
            u.assert(n);
            i.deepEqual(t, []);
            if (r.type !== n.type) {
                return false;
            }
            var s = new d(n);
            var a = T(e, s, t);
            if (!a) {
                t.length = 0;
            }
            return a;
        }
        function A(e, t, r) {
            var i = e.getValue();
            var n = t.getValue();
            if (i === n) return true;
            if (v.check(i)) return k(e, t, r);
            if (m.check(i)) return w(e, t, r);
            return false;
        }
        function k(e, t, r) {
            var i = e.getValue();
            var n = t.getValue();
            if (i === n || e.valueIsDuplicate() || t.valueIsDuplicate()) {
                return true;
            }
            v.assert(i);
            var s = i.length;
            if (!(v.check(n) && n.length === s)) return false;
            for (var a = 0; a < s; ++a) {
                e.stack.push(a, i[a]);
                t.stack.push(a, n[a]);
                var o = A(e, t, r);
                e.stack.length -= 2;
                t.stack.length -= 2;
                if (!o) {
                    return false;
                }
            }
            return true;
        }
        function w(e, t, r) {
            var i = e.getValue();
            m.assert(i);
            if (i.original === null) {
                return false;
            }
            var n = t.getValue();
            if (!m.check(n)) return false;
            if (i === n || e.valueIsDuplicate() || t.valueIsDuplicate()) {
                return true;
            }
            if (u.check(i)) {
                if (!u.check(n)) {
                    return false;
                }
                if (i.type === n.type) {
                    var s = [];
                    if (T(e, t, s)) {
                        r.push.apply(r, s);
                    } else if (n.loc) {
                        r.push({
                            oldPath: t.copy(),
                            newPath: e.copy()
                        });
                    } else {
                        return false;
                    }
                    return true;
                }
                if (l.check(i) && l.check(n) && n.loc) {
                    r.push({
                        oldPath: t.copy(),
                        newPath: e.copy()
                    });
                    return true;
                }
                return false;
            }
            return T(e, t, r);
        }
        function T(e, t, r) {
            var i = e.getValue();
            var n = t.getValue();
            m.assert(i);
            m.assert(n);
            if (i.original === null) {
                return false;
            }
            if (e.needsParens() && !t.hasParens()) {
                return false;
            }
            var a = p.getUnionOfKeys(n, i);
            if (n.type === "File" || i.type === "File") {
                delete a.tokens;
            }
            delete a.loc;
            var o = r.length;
            for (var u in a) {
                if (u.charAt(0) === "_") {
                    continue;
                }
                e.stack.push(u, s.getFieldValue(i, u));
                t.stack.push(u, s.getFieldValue(n, u));
                var l = A(e, t, r);
                e.stack.length -= 2;
                t.stack.length -= 2;
                if (!l) {
                    return false;
                }
            }
            if (c.check(e.getNode()) && r.length > o) {
                return false;
            }
            return true;
        }
    }, function(e, t, r) {
        "use strict";
        var i = r(15);
        var n = Object.prototype.hasOwnProperty;
        var s = typeof Map !== "undefined";
        function a() {
            this._array = [];
            this._set = s ? new Map() : Object.create(null);
        }
        a.fromArray = function e(t, r) {
            var i = new a();
            for (var n = 0, s = t.length; n < s; n++) {
                i.add(t[n], r);
            }
            return i;
        };
        a.prototype.size = function e() {
            return s ? this._set.size : Object.getOwnPropertyNames(this._set).length;
        };
        a.prototype.add = function e(t, r) {
            var a = s ? t : i.toSetString(t);
            var o = s ? this.has(t) : n.call(this._set, a);
            var u = this._array.length;
            if (!o || r) {
                this._array.push(t);
            }
            if (!o) {
                if (s) {
                    this._set.set(t, u);
                } else {
                    this._set[a] = u;
                }
            }
        };
        a.prototype.has = function e(t) {
            if (s) {
                return this._set.has(t);
            } else {
                var r = i.toSetString(t);
                return n.call(this._set, r);
            }
        };
        a.prototype.indexOf = function e(t) {
            if (s) {
                var r = this._set.get(t);
                if (r >= 0) {
                    return r;
                }
            } else {
                var a = i.toSetString(t);
                if (n.call(this._set, a)) {
                    return this._set[a];
                }
            }
            throw new Error('"' + t + '" is not in the set.');
        };
        a.prototype.at = function e(t) {
            if (t >= 0 && t < this._array.length) {
                return this._array[t];
            }
            throw new Error("No element indexed by " + t);
        };
        a.prototype.toArray = function e() {
            return this._array.slice();
        };
        t.ArraySet = a;
    }, function(e, t, r) {
        "use strict";
        var i = r(86);
        var n = 5;
        var s = 1 << n;
        var a = s - 1;
        var o = s;
        function u(e) {
            return e < 0 ? (-e << 1) + 1 : (e << 1) + 0;
        }
        function l(e) {
            var t = (e & 1) === 1;
            var r = e >> 1;
            return t ? -r : r;
        }
        t.encode = function e(t) {
            var r = "";
            var s;
            var l = u(t);
            do {
                s = l & a;
                l >>>= n;
                if (l > 0) {
                    s |= o;
                }
                r += i.encode(s);
            } while (l > 0);
            return r;
        };
        t.decode = function e(t, r, s) {
            var u = t.length;
            var c = 0;
            var h = 0;
            var p, f;
            do {
                if (r >= u) {
                    throw new Error("Expected more digits in base 64 VLQ value.");
                }
                f = i.decode(t.charCodeAt(r++));
                if (f === -1) {
                    throw new Error("Invalid base64 digit: " + t.charAt(r - 1));
                }
                p = !!(f & o);
                f &= a;
                c = c + (f << h);
                h += n;
            } while (p);
            s.value = l(c);
            s.rest = r;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(49);
        var n = r(15);
        var s = r(48).ArraySet;
        var a = r(88).MappingList;
        function o(e) {
            if (!e) {
                e = {};
            }
            this._file = n.getArg(e, "file", null);
            this._sourceRoot = n.getArg(e, "sourceRoot", null);
            this._skipValidation = n.getArg(e, "skipValidation", false);
            this._sources = new s();
            this._names = new s();
            this._mappings = new a();
            this._sourcesContents = null;
        }
        o.prototype._version = 3;
        o.fromSourceMap = function e(t) {
            var r = t.sourceRoot;
            var i = new o({
                file: t.file,
                sourceRoot: r
            });
            t.eachMapping(function(e) {
                var t = {
                    generated: {
                        line: e.generatedLine,
                        column: e.generatedColumn
                    }
                };
                if (e.source != null) {
                    t.source = e.source;
                    if (r != null) {
                        t.source = n.relative(r, t.source);
                    }
                    t.original = {
                        line: e.originalLine,
                        column: e.originalColumn
                    };
                    if (e.name != null) {
                        t.name = e.name;
                    }
                }
                i.addMapping(t);
            });
            t.sources.forEach(function(e) {
                var s = e;
                if (r !== null) {
                    s = n.relative(r, e);
                }
                if (!i._sources.has(s)) {
                    i._sources.add(s);
                }
                var a = t.sourceContentFor(e);
                if (a != null) {
                    i.setSourceContent(e, a);
                }
            });
            return i;
        };
        o.prototype.addMapping = function e(t) {
            var r = n.getArg(t, "generated");
            var i = n.getArg(t, "original", null);
            var s = n.getArg(t, "source", null);
            var a = n.getArg(t, "name", null);
            if (!this._skipValidation) {
                this._validateMapping(r, i, s, a);
            }
            if (s != null) {
                s = String(s);
                if (!this._sources.has(s)) {
                    this._sources.add(s);
                }
            }
            if (a != null) {
                a = String(a);
                if (!this._names.has(a)) {
                    this._names.add(a);
                }
            }
            this._mappings.add({
                generatedLine: r.line,
                generatedColumn: r.column,
                originalLine: i != null && i.line,
                originalColumn: i != null && i.column,
                source: s,
                name: a
            });
        };
        o.prototype.setSourceContent = function e(t, r) {
            var i = t;
            if (this._sourceRoot != null) {
                i = n.relative(this._sourceRoot, i);
            }
            if (r != null) {
                if (!this._sourcesContents) {
                    this._sourcesContents = Object.create(null);
                }
                this._sourcesContents[n.toSetString(i)] = r;
            } else if (this._sourcesContents) {
                delete this._sourcesContents[n.toSetString(i)];
                if (Object.keys(this._sourcesContents).length === 0) {
                    this._sourcesContents = null;
                }
            }
        };
        o.prototype.applySourceMap = function e(t, r, i) {
            var a = r;
            if (r == null) {
                if (t.file == null) {
                    throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, " + 'or the source map\'s "file" property. Both were omitted.');
                }
                a = t.file;
            }
            var o = this._sourceRoot;
            if (o != null) {
                a = n.relative(o, a);
            }
            var u = new s();
            var l = new s();
            this._mappings.unsortedForEach(function(e) {
                if (e.source === a && e.originalLine != null) {
                    var r = t.originalPositionFor({
                        line: e.originalLine,
                        column: e.originalColumn
                    });
                    if (r.source != null) {
                        e.source = r.source;
                        if (i != null) {
                            e.source = n.join(i, e.source);
                        }
                        if (o != null) {
                            e.source = n.relative(o, e.source);
                        }
                        e.originalLine = r.line;
                        e.originalColumn = r.column;
                        if (r.name != null) {
                            e.name = r.name;
                        }
                    }
                }
                var s = e.source;
                if (s != null && !u.has(s)) {
                    u.add(s);
                }
                var c = e.name;
                if (c != null && !l.has(c)) {
                    l.add(c);
                }
            }, this);
            this._sources = u;
            this._names = l;
            t.sources.forEach(function(e) {
                var r = t.sourceContentFor(e);
                if (r != null) {
                    if (i != null) {
                        e = n.join(i, e);
                    }
                    if (o != null) {
                        e = n.relative(o, e);
                    }
                    this.setSourceContent(e, r);
                }
            }, this);
        };
        o.prototype._validateMapping = function e(t, r, i, n) {
            if (r && typeof r.line !== "number" && typeof r.column !== "number") {
                throw new Error("original.line and original.column are not numbers -- you probably meant to omit " + "the original mapping entirely and only map the generated position. If so, pass " + "null for the original mapping instead of an object with empty or null values.");
            }
            if (t && "line" in t && "column" in t && t.line > 0 && t.column >= 0 && !r && !i && !n) {
                return;
            } else if (t && "line" in t && "column" in t && r && "line" in r && "column" in r && t.line > 0 && t.column >= 0 && r.line > 0 && r.column >= 0 && i) {
                return;
            } else {
                throw new Error("Invalid mapping: " + JSON.stringify({
                    generated: t,
                    source: i,
                    original: r,
                    name: n
                }));
            }
        };
        o.prototype._serializeMappings = function e() {
            var t = 0;
            var r = 1;
            var s = 0;
            var a = 0;
            var o = 0;
            var u = 0;
            var l = "";
            var c;
            var h;
            var p;
            var f;
            var d = this._mappings.toArray();
            for (var m = 0, v = d.length; m < v; m++) {
                h = d[m];
                c = "";
                if (h.generatedLine !== r) {
                    t = 0;
                    while (h.generatedLine !== r) {
                        c += ";";
                        r++;
                    }
                } else {
                    if (m > 0) {
                        if (!n.compareByGeneratedPositionsInflated(h, d[m - 1])) {
                            continue;
                        }
                        c += ",";
                    }
                }
                c += i.encode(h.generatedColumn - t);
                t = h.generatedColumn;
                if (h.source != null) {
                    f = this._sources.indexOf(h.source);
                    c += i.encode(f - u);
                    u = f;
                    c += i.encode(h.originalLine - 1 - a);
                    a = h.originalLine - 1;
                    c += i.encode(h.originalColumn - s);
                    s = h.originalColumn;
                    if (h.name != null) {
                        p = this._names.indexOf(h.name);
                        c += i.encode(p - o);
                        o = p;
                    }
                }
                l += c;
            }
            return l;
        };
        o.prototype._generateSourcesContent = function e(t, r) {
            return t.map(function(e) {
                if (!this._sourcesContents) {
                    return null;
                }
                if (r != null) {
                    e = n.relative(r, e);
                }
                var t = n.toSetString(e);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, t) ? this._sourcesContents[t] : null;
            }, this);
        };
        o.prototype.toJSON = function e() {
            var t = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            if (this._file != null) {
                t.file = this._file;
            }
            if (this._sourceRoot != null) {
                t.sourceRoot = this._sourceRoot;
            }
            if (this._sourcesContents) {
                t.sourcesContent = this._generateSourcesContent(t.sources, t.sourceRoot);
            }
            return t;
        };
        o.prototype.toString = function e() {
            return JSON.stringify(this.toJSON());
        };
        t.SourceMapGenerator = o;
    }, , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    i.enumerable = i.enumerable || false;
                    i.configurable = true;
                    if ("value" in i) i.writable = true;
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, r, i) {
                if (r) e(t.prototype, r);
                if (i) e(t, i);
                return t;
            };
        }();
        var n = function e(t, r, i) {
            if (t === null) t = Function.prototype;
            var n = Object.getOwnPropertyDescriptor(t, r);
            if (n === undefined) {
                var s = Object.getPrototypeOf(t);
                if (s === null) {
                    return undefined;
                } else {
                    return e(s, r, i);
                }
            } else if ("value" in n) {
                return n.value;
            } else {
                var a = n.get;
                if (a === undefined) {
                    return undefined;
                }
                return a.call(i);
            }
        };
        function s(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function a(e, t) {
            if (!e) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t && (typeof t === "object" || typeof t === "function") ? t : e;
        }
        function o(e, t) {
            if (typeof t !== "function" && t !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
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
        var u = r(61);
        var l = /^[\da-fA-F]+$/;
        var c = /^\d+$/;
        var h = r(38);
        var p = h.tokTypes;
        var f = h.TokContext;
        var d = h.tokContexts;
        var m = h.TokenType;
        var v = h.isNewLine;
        var y = h.isIdentifierStart;
        var x = h.isIdentifierChar;
        var g = new f("<tag", false);
        var b = new f("</tag", false);
        var E = new f("<tag>...</tag>", true, true);
        var S = {
            jsxName: new m("jsxName"),
            jsxText: new m("jsxText", {
                beforeExpr: true
            }),
            jsxTagStart: new m("jsxTagStart"),
            jsxTagEnd: new m("jsxTagEnd")
        };
        S.jsxTagStart.updateContext = function() {
            this.context.push(E);
            this.context.push(g);
            this.exprAllowed = false;
        };
        S.jsxTagEnd.updateContext = function(e) {
            var t = this.context.pop();
            if (t === g && e === p.slash || t === b) {
                this.context.pop();
                this.exprAllowed = this.curContext() === E;
            } else {
                this.exprAllowed = true;
            }
        };
        function D(e) {
            if (!e) return e;
            if (e.type === "JSXIdentifier") return e.name;
            if (e.type === "JSXNamespacedName") return e.namespace.name + ":" + e.name.name;
            if (e.type === "JSXMemberExpression") return D(e.object) + "." + D(e.property);
        }
        e.exports = function(e) {
            e = e || {};
            return function(t) {
                return C({
                    allowNamespaces: e.allowNamespaces !== false,
                    allowNamespacedObjects: !!e.allowNamespacedObjects
                }, t);
            };
        };
        e.exports.tokTypes = S;
        function C(e, t) {
            return function(t) {
                o(r, t);
                function r() {
                    s(this, r);
                    return a(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
                }
                i(r, [ {
                    key: "jsx_readToken",
                    value: function e() {
                        var t = "", r = this.pos;
                        for (;;) {
                            if (this.pos >= this.input.length) this.raise(this.start, "Unterminated JSX contents");
                            var i = this.input.charCodeAt(this.pos);
                            switch (i) {
                              case 60:
                              case 123:
                                if (this.pos === this.start) {
                                    if (i === 60 && this.exprAllowed) {
                                        ++this.pos;
                                        return this.finishToken(S.jsxTagStart);
                                    }
                                    return this.getTokenFromCode(i);
                                }
                                t += this.input.slice(r, this.pos);
                                return this.finishToken(S.jsxText, t);

                              case 38:
                                t += this.input.slice(r, this.pos);
                                t += this.jsx_readEntity();
                                r = this.pos;
                                break;

                              default:
                                if (v(i)) {
                                    t += this.input.slice(r, this.pos);
                                    t += this.jsx_readNewLine(true);
                                    r = this.pos;
                                } else {
                                    ++this.pos;
                                }
                            }
                        }
                    }
                }, {
                    key: "jsx_readNewLine",
                    value: function e(t) {
                        var r = this.input.charCodeAt(this.pos);
                        var i = void 0;
                        ++this.pos;
                        if (r === 13 && this.input.charCodeAt(this.pos) === 10) {
                            ++this.pos;
                            i = t ? "\n" : "\r\n";
                        } else {
                            i = String.fromCharCode(r);
                        }
                        if (this.options.locations) {
                            ++this.curLine;
                            this.lineStart = this.pos;
                        }
                        return i;
                    }
                }, {
                    key: "jsx_readString",
                    value: function e(t) {
                        var r = "", i = ++this.pos;
                        for (;;) {
                            if (this.pos >= this.input.length) this.raise(this.start, "Unterminated string constant");
                            var n = this.input.charCodeAt(this.pos);
                            if (n === t) break;
                            if (n === 38) {
                                r += this.input.slice(i, this.pos);
                                r += this.jsx_readEntity();
                                i = this.pos;
                            } else if (v(n)) {
                                r += this.input.slice(i, this.pos);
                                r += this.jsx_readNewLine(false);
                                i = this.pos;
                            } else {
                                ++this.pos;
                            }
                        }
                        r += this.input.slice(i, this.pos++);
                        return this.finishToken(p.string, r);
                    }
                }, {
                    key: "jsx_readEntity",
                    value: function e() {
                        var t = "", r = 0, i = void 0;
                        var n = this.input[this.pos];
                        if (n !== "&") this.raise(this.pos, "Entity must start with an ampersand");
                        var s = ++this.pos;
                        while (this.pos < this.input.length && r++ < 10) {
                            n = this.input[this.pos++];
                            if (n === ";") {
                                if (t[0] === "#") {
                                    if (t[1] === "x") {
                                        t = t.substr(2);
                                        if (l.test(t)) i = String.fromCharCode(parseInt(t, 16));
                                    } else {
                                        t = t.substr(1);
                                        if (c.test(t)) i = String.fromCharCode(parseInt(t, 10));
                                    }
                                } else {
                                    i = u[t];
                                }
                                break;
                            }
                            t += n;
                        }
                        if (!i) {
                            this.pos = s;
                            return "&";
                        }
                        return i;
                    }
                }, {
                    key: "jsx_readWord",
                    value: function e() {
                        var t = void 0, r = this.pos;
                        do {
                            t = this.input.charCodeAt(++this.pos);
                        } while (x(t) || t === 45);
                        return this.finishToken(S.jsxName, this.input.slice(r, this.pos));
                    }
                }, {
                    key: "jsx_parseIdentifier",
                    value: function e() {
                        var t = this.startNode();
                        if (this.type === S.jsxName) t.name = this.value; else if (this.type.keyword) t.name = this.type.keyword; else this.unexpected();
                        this.next();
                        return this.finishNode(t, "JSXIdentifier");
                    }
                }, {
                    key: "jsx_parseNamespacedName",
                    value: function t() {
                        var r = this.start, i = this.startLoc;
                        var n = this.jsx_parseIdentifier();
                        if (!e.allowNamespaces || !this.eat(p.colon)) return n;
                        var s = this.startNodeAt(r, i);
                        s.namespace = n;
                        s.name = this.jsx_parseIdentifier();
                        return this.finishNode(s, "JSXNamespacedName");
                    }
                }, {
                    key: "jsx_parseElementName",
                    value: function t() {
                        if (this.type === S.jsxTagEnd) return "";
                        var r = this.start, i = this.startLoc;
                        var n = this.jsx_parseNamespacedName();
                        if (this.type === p.dot && n.type === "JSXNamespacedName" && !e.allowNamespacedObjects) {
                            this.unexpected();
                        }
                        while (this.eat(p.dot)) {
                            var s = this.startNodeAt(r, i);
                            s.object = n;
                            s.property = this.jsx_parseIdentifier();
                            n = this.finishNode(s, "JSXMemberExpression");
                        }
                        return n;
                    }
                }, {
                    key: "jsx_parseAttributeValue",
                    value: function e() {
                        switch (this.type) {
                          case p.braceL:
                            var t = this.jsx_parseExpressionContainer();
                            if (t.expression.type === "JSXEmptyExpression") this.raise(t.start, "JSX attributes must only be assigned a non-empty expression");
                            return t;

                          case S.jsxTagStart:
                          case p.string:
                            return this.parseExprAtom();

                          default:
                            this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
                        }
                    }
                }, {
                    key: "jsx_parseEmptyExpression",
                    value: function e() {
                        var t = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
                        return this.finishNodeAt(t, "JSXEmptyExpression", this.start, this.startLoc);
                    }
                }, {
                    key: "jsx_parseExpressionContainer",
                    value: function e() {
                        var t = this.startNode();
                        this.next();
                        t.expression = this.type === p.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
                        this.expect(p.braceR);
                        return this.finishNode(t, "JSXExpressionContainer");
                    }
                }, {
                    key: "jsx_parseAttribute",
                    value: function e() {
                        var t = this.startNode();
                        if (this.eat(p.braceL)) {
                            this.expect(p.ellipsis);
                            t.argument = this.parseMaybeAssign();
                            this.expect(p.braceR);
                            return this.finishNode(t, "JSXSpreadAttribute");
                        }
                        t.name = this.jsx_parseNamespacedName();
                        t.value = this.eat(p.eq) ? this.jsx_parseAttributeValue() : null;
                        return this.finishNode(t, "JSXAttribute");
                    }
                }, {
                    key: "jsx_parseOpeningElementAt",
                    value: function e(t, r) {
                        var i = this.startNodeAt(t, r);
                        i.attributes = [];
                        var n = this.jsx_parseElementName();
                        if (n) i.name = n;
                        while (this.type !== p.slash && this.type !== S.jsxTagEnd) {
                            i.attributes.push(this.jsx_parseAttribute());
                        }
                        i.selfClosing = this.eat(p.slash);
                        this.expect(S.jsxTagEnd);
                        return this.finishNode(i, n ? "JSXOpeningElement" : "JSXOpeningFragment");
                    }
                }, {
                    key: "jsx_parseClosingElementAt",
                    value: function e(t, r) {
                        var i = this.startNodeAt(t, r);
                        var n = this.jsx_parseElementName();
                        if (n) i.name = n;
                        this.expect(S.jsxTagEnd);
                        return this.finishNode(i, n ? "JSXClosingElement" : "JSXClosingFragment");
                    }
                }, {
                    key: "jsx_parseElementAt",
                    value: function e(t, r) {
                        var i = this.startNodeAt(t, r);
                        var n = [];
                        var s = this.jsx_parseOpeningElementAt(t, r);
                        var a = null;
                        if (!s.selfClosing) {
                            e: for (;;) {
                                switch (this.type) {
                                  case S.jsxTagStart:
                                    t = this.start;
                                    r = this.startLoc;
                                    this.next();
                                    if (this.eat(p.slash)) {
                                        a = this.jsx_parseClosingElementAt(t, r);
                                        break e;
                                    }
                                    n.push(this.jsx_parseElementAt(t, r));
                                    break;

                                  case S.jsxText:
                                    n.push(this.parseExprAtom());
                                    break;

                                  case p.braceL:
                                    n.push(this.jsx_parseExpressionContainer());
                                    break;

                                  default:
                                    this.unexpected();
                                }
                            }
                            if (D(a.name) !== D(s.name)) {
                                this.raise(a.start, "Expected corresponding JSX closing tag for <" + D(s.name) + ">");
                            }
                        }
                        var o = s.name ? "Element" : "Fragment";
                        i["opening" + o] = s;
                        i["closing" + o] = a;
                        i.children = n;
                        if (this.type === p.relational && this.value === "<") {
                            this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
                        }
                        return this.finishNode(i, "JSX" + o);
                    }
                }, {
                    key: "jsx_parseText",
                    value: function e(t) {
                        var r = this.parseLiteral(t);
                        r.type = "JSXText";
                        return r;
                    }
                }, {
                    key: "jsx_parseElement",
                    value: function e() {
                        var t = this.start, r = this.startLoc;
                        this.next();
                        return this.jsx_parseElementAt(t, r);
                    }
                }, {
                    key: "parseExprAtom",
                    value: function e(t) {
                        if (this.type === S.jsxText) return this.jsx_parseText(this.value); else if (this.type === S.jsxTagStart) return this.jsx_parseElement(); else return n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "parseExprAtom", this).call(this, t);
                    }
                }, {
                    key: "readToken",
                    value: function e(t) {
                        var i = this.curContext();
                        if (i === E) return this.jsx_readToken();
                        if (i === g || i === b) {
                            if (y(t)) return this.jsx_readWord();
                            if (t == 62) {
                                ++this.pos;
                                return this.finishToken(S.jsxTagEnd);
                            }
                            if ((t === 34 || t === 39) && i == g) return this.jsx_readString(t);
                        }
                        if (t === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33) {
                            ++this.pos;
                            return this.finishToken(S.jsxTagStart);
                        }
                        return n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "readToken", this).call(this, t);
                    }
                }, {
                    key: "updateContext",
                    value: function e(t) {
                        if (this.type == p.braceL) {
                            var i = this.curContext();
                            if (i == g) this.context.push(d.b_expr); else if (i == E) this.context.push(d.b_tmpl); else n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "updateContext", this).call(this, t);
                            this.exprAllowed = true;
                        } else if (this.type === p.slash && t === S.jsxTagStart) {
                            this.context.length -= 2;
                            this.context.push(b);
                            this.exprAllowed = false;
                        } else {
                            return n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "updateContext", this).call(this, t);
                        }
                    }
                } ]);
                return r;
            }(t);
        }
    }, function(e, t) {
        "use strict";
        e.exports = {
            quot: '"',
            amp: "&",
            apos: "'",
            lt: "<",
            gt: ">",
            nbsp: " ",
            iexcl: "¡",
            cent: "¢",
            pound: "£",
            curren: "¤",
            yen: "¥",
            brvbar: "¦",
            sect: "§",
            uml: "¨",
            copy: "©",
            ordf: "ª",
            laquo: "«",
            not: "¬",
            shy: "­",
            reg: "®",
            macr: "¯",
            deg: "°",
            plusmn: "±",
            sup2: "²",
            sup3: "³",
            acute: "´",
            micro: "µ",
            para: "¶",
            middot: "·",
            cedil: "¸",
            sup1: "¹",
            ordm: "º",
            raquo: "»",
            frac14: "¼",
            frac12: "½",
            frac34: "¾",
            iquest: "¿",
            Agrave: "À",
            Aacute: "Á",
            Acirc: "Â",
            Atilde: "Ã",
            Auml: "Ä",
            Aring: "Å",
            AElig: "Æ",
            Ccedil: "Ç",
            Egrave: "È",
            Eacute: "É",
            Ecirc: "Ê",
            Euml: "Ë",
            Igrave: "Ì",
            Iacute: "Í",
            Icirc: "Î",
            Iuml: "Ï",
            ETH: "Ð",
            Ntilde: "Ñ",
            Ograve: "Ò",
            Oacute: "Ó",
            Ocirc: "Ô",
            Otilde: "Õ",
            Ouml: "Ö",
            times: "×",
            Oslash: "Ø",
            Ugrave: "Ù",
            Uacute: "Ú",
            Ucirc: "Û",
            Uuml: "Ü",
            Yacute: "Ý",
            THORN: "Þ",
            szlig: "ß",
            agrave: "à",
            aacute: "á",
            acirc: "â",
            atilde: "ã",
            auml: "ä",
            aring: "å",
            aelig: "æ",
            ccedil: "ç",
            egrave: "è",
            eacute: "é",
            ecirc: "ê",
            euml: "ë",
            igrave: "ì",
            iacute: "í",
            icirc: "î",
            iuml: "ï",
            eth: "ð",
            ntilde: "ñ",
            ograve: "ò",
            oacute: "ó",
            ocirc: "ô",
            otilde: "õ",
            ouml: "ö",
            divide: "÷",
            oslash: "ø",
            ugrave: "ù",
            uacute: "ú",
            ucirc: "û",
            uuml: "ü",
            yacute: "ý",
            thorn: "þ",
            yuml: "ÿ",
            OElig: "Œ",
            oelig: "œ",
            Scaron: "Š",
            scaron: "š",
            Yuml: "Ÿ",
            fnof: "ƒ",
            circ: "ˆ",
            tilde: "˜",
            Alpha: "Α",
            Beta: "Β",
            Gamma: "Γ",
            Delta: "Δ",
            Epsilon: "Ε",
            Zeta: "Ζ",
            Eta: "Η",
            Theta: "Θ",
            Iota: "Ι",
            Kappa: "Κ",
            Lambda: "Λ",
            Mu: "Μ",
            Nu: "Ν",
            Xi: "Ξ",
            Omicron: "Ο",
            Pi: "Π",
            Rho: "Ρ",
            Sigma: "Σ",
            Tau: "Τ",
            Upsilon: "Υ",
            Phi: "Φ",
            Chi: "Χ",
            Psi: "Ψ",
            Omega: "Ω",
            alpha: "α",
            beta: "β",
            gamma: "γ",
            delta: "δ",
            epsilon: "ε",
            zeta: "ζ",
            eta: "η",
            theta: "θ",
            iota: "ι",
            kappa: "κ",
            lambda: "λ",
            mu: "μ",
            nu: "ν",
            xi: "ξ",
            omicron: "ο",
            pi: "π",
            rho: "ρ",
            sigmaf: "ς",
            sigma: "σ",
            tau: "τ",
            upsilon: "υ",
            phi: "φ",
            chi: "χ",
            psi: "ψ",
            omega: "ω",
            thetasym: "ϑ",
            upsih: "ϒ",
            piv: "ϖ",
            ensp: " ",
            emsp: " ",
            thinsp: " ",
            zwnj: "‌",
            zwj: "‍",
            lrm: "‎",
            rlm: "‏",
            ndash: "–",
            mdash: "—",
            lsquo: "‘",
            rsquo: "’",
            sbquo: "‚",
            ldquo: "“",
            rdquo: "”",
            bdquo: "„",
            dagger: "†",
            Dagger: "‡",
            bull: "•",
            hellip: "…",
            permil: "‰",
            prime: "′",
            Prime: "″",
            lsaquo: "‹",
            rsaquo: "›",
            oline: "‾",
            frasl: "⁄",
            euro: "€",
            image: "ℑ",
            weierp: "℘",
            real: "ℜ",
            trade: "™",
            alefsym: "ℵ",
            larr: "←",
            uarr: "↑",
            rarr: "→",
            darr: "↓",
            harr: "↔",
            crarr: "↵",
            lArr: "⇐",
            uArr: "⇑",
            rArr: "⇒",
            dArr: "⇓",
            hArr: "⇔",
            forall: "∀",
            part: "∂",
            exist: "∃",
            empty: "∅",
            nabla: "∇",
            isin: "∈",
            notin: "∉",
            ni: "∋",
            prod: "∏",
            sum: "∑",
            minus: "−",
            lowast: "∗",
            radic: "√",
            prop: "∝",
            infin: "∞",
            ang: "∠",
            and: "∧",
            or: "∨",
            cap: "∩",
            cup: "∪",
            int: "∫",
            there4: "∴",
            sim: "∼",
            cong: "≅",
            asymp: "≈",
            ne: "≠",
            equiv: "≡",
            le: "≤",
            ge: "≥",
            sub: "⊂",
            sup: "⊃",
            nsub: "⊄",
            sube: "⊆",
            supe: "⊇",
            oplus: "⊕",
            otimes: "⊗",
            perp: "⊥",
            sdot: "⋅",
            lceil: "⌈",
            rceil: "⌉",
            lfloor: "⌊",
            rfloor: "⌋",
            lang: "〈",
            rang: "〉",
            loz: "◊",
            spades: "♠",
            clubs: "♣",
            hearts: "♥",
            diams: "♦"
        };
    }, function(e, t) {
        "use strict";
        if (typeof Object.create === "function") {
            e.exports = function e(t, r) {
                t.super_ = r;
                t.prototype = Object.create(r.prototype, {
                    constructor: {
                        value: t,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            };
        } else {
            e.exports = function e(t, r) {
                t.super_ = r;
                var i = function e() {};
                i.prototype = r.prototype;
                t.prototype = new i();
                t.prototype.constructor = t;
            };
        }
    }, function(e, t) {
        "use strict";
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        e.exports = function e(t) {
            return t && (typeof t === "undefined" ? "undefined" : r(t)) === "object" && typeof t.copy === "function" && typeof t.fill === "function" && typeof t.readUInt8 === "function";
        };
    }, function(e, t, r) {
        (function(e) {
            "use strict";
            var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
                return typeof e;
            } : function(e) {
                return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            };
            var n = /%[sdj%]/g;
            t.format = function(e) {
                if (!S(e)) {
                    var t = [];
                    for (var r = 0; r < arguments.length; r++) {
                        t.push(o(arguments[r]));
                    }
                    return t.join(" ");
                }
                var r = 1;
                var i = arguments;
                var s = i.length;
                var a = String(e).replace(n, function(e) {
                    if (e === "%%") return "%";
                    if (r >= s) return e;
                    switch (e) {
                      case "%s":
                        return String(i[r++]);

                      case "%d":
                        return Number(i[r++]);

                      case "%j":
                        try {
                            return JSON.stringify(i[r++]);
                        } catch (e) {
                            return "[Circular]";
                        }

                      default:
                        return e;
                    }
                });
                for (var u = i[r]; r < s; u = i[++r]) {
                    if (g(u) || !k(u)) {
                        a += " " + u;
                    } else {
                        a += " " + o(u);
                    }
                }
                return a;
            };
            t.deprecate = function(r, i) {
                if (C(e.process)) {
                    return function() {
                        return t.deprecate(r, i).apply(this, arguments);
                    };
                }
                if (process.noDeprecation === true) {
                    return r;
                }
                var n = false;
                function s() {
                    if (!n) {
                        if (process.throwDeprecation) {
                            throw new Error(i);
                        } else if (process.traceDeprecation) {
                            console.trace(i);
                        } else {
                            console.error(i);
                        }
                        n = true;
                    }
                    return r.apply(this, arguments);
                }
                return s;
            };
            var s = {};
            var a;
            t.debuglog = function(e) {
                if (C(a)) a = process.env.NODE_DEBUG || "";
                e = e.toUpperCase();
                if (!s[e]) {
                    if (new RegExp("\\b" + e + "\\b", "i").test(a)) {
                        var r = process.pid;
                        s[e] = function() {
                            var i = t.format.apply(t, arguments);
                            console.error("%s %d: %s", e, r, i);
                        };
                    } else {
                        s[e] = function() {};
                    }
                }
                return s[e];
            };
            function o(e, r) {
                var i = {
                    seen: [],
                    stylize: l
                };
                if (arguments.length >= 3) i.depth = arguments[2];
                if (arguments.length >= 4) i.colors = arguments[3];
                if (x(r)) {
                    i.showHidden = r;
                } else if (r) {
                    t._extend(i, r);
                }
                if (C(i.showHidden)) i.showHidden = false;
                if (C(i.depth)) i.depth = 2;
                if (C(i.colors)) i.colors = false;
                if (C(i.customInspect)) i.customInspect = true;
                if (i.colors) i.stylize = u;
                return h(i, e, i.depth);
            }
            t.inspect = o;
            o.colors = {
                bold: [ 1, 22 ],
                italic: [ 3, 23 ],
                underline: [ 4, 24 ],
                inverse: [ 7, 27 ],
                white: [ 37, 39 ],
                grey: [ 90, 39 ],
                black: [ 30, 39 ],
                blue: [ 34, 39 ],
                cyan: [ 36, 39 ],
                green: [ 32, 39 ],
                magenta: [ 35, 39 ],
                red: [ 31, 39 ],
                yellow: [ 33, 39 ]
            };
            o.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            };
            function u(e, t) {
                var r = o.styles[t];
                if (r) {
                    return "[" + o.colors[r][0] + "m" + e + "[" + o.colors[r][1] + "m";
                } else {
                    return e;
                }
            }
            function l(e, t) {
                return e;
            }
            function c(e) {
                var t = {};
                e.forEach(function(e, r) {
                    t[e] = true;
                });
                return t;
            }
            function h(e, r, i) {
                if (e.customInspect && r && F(r.inspect) && r.inspect !== t.inspect && !(r.constructor && r.constructor.prototype === r)) {
                    var n = r.inspect(i, e);
                    if (!S(n)) {
                        n = h(e, n, i);
                    }
                    return n;
                }
                var s = p(e, r);
                if (s) {
                    return s;
                }
                var a = Object.keys(r);
                var o = c(a);
                if (e.showHidden) {
                    a = Object.getOwnPropertyNames(r);
                }
                if (T(r) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) {
                    return f(r);
                }
                if (a.length === 0) {
                    if (F(r)) {
                        var u = r.name ? ": " + r.name : "";
                        return e.stylize("[Function" + u + "]", "special");
                    }
                    if (A(r)) {
                        return e.stylize(RegExp.prototype.toString.call(r), "regexp");
                    }
                    if (w(r)) {
                        return e.stylize(Date.prototype.toString.call(r), "date");
                    }
                    if (T(r)) {
                        return f(r);
                    }
                }
                var l = "", x = false, g = [ "{", "}" ];
                if (y(r)) {
                    x = true;
                    g = [ "[", "]" ];
                }
                if (F(r)) {
                    var b = r.name ? ": " + r.name : "";
                    l = " [Function" + b + "]";
                }
                if (A(r)) {
                    l = " " + RegExp.prototype.toString.call(r);
                }
                if (w(r)) {
                    l = " " + Date.prototype.toUTCString.call(r);
                }
                if (T(r)) {
                    l = " " + f(r);
                }
                if (a.length === 0 && (!x || r.length == 0)) {
                    return g[0] + l + g[1];
                }
                if (i < 0) {
                    if (A(r)) {
                        return e.stylize(RegExp.prototype.toString.call(r), "regexp");
                    } else {
                        return e.stylize("[Object]", "special");
                    }
                }
                e.seen.push(r);
                var E;
                if (x) {
                    E = d(e, r, i, o, a);
                } else {
                    E = a.map(function(t) {
                        return m(e, r, i, o, t, x);
                    });
                }
                e.seen.pop();
                return v(E, l, g);
            }
            function p(e, t) {
                if (C(t)) return e.stylize("undefined", "undefined");
                if (S(t)) {
                    var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(r, "string");
                }
                if (E(t)) return e.stylize("" + t, "number");
                if (x(t)) return e.stylize("" + t, "boolean");
                if (g(t)) return e.stylize("null", "null");
            }
            function f(e) {
                return "[" + Error.prototype.toString.call(e) + "]";
            }
            function d(e, t, r, i, n) {
                var s = [];
                for (var a = 0, o = t.length; a < o; ++a) {
                    if (L(t, String(a))) {
                        s.push(m(e, t, r, i, String(a), true));
                    } else {
                        s.push("");
                    }
                }
                n.forEach(function(n) {
                    if (!n.match(/^\d+$/)) {
                        s.push(m(e, t, r, i, n, true));
                    }
                });
                return s;
            }
            function m(e, t, r, i, n, s) {
                var a, o, u;
                u = Object.getOwnPropertyDescriptor(t, n) || {
                    value: t[n]
                };
                if (u.get) {
                    if (u.set) {
                        o = e.stylize("[Getter/Setter]", "special");
                    } else {
                        o = e.stylize("[Getter]", "special");
                    }
                } else {
                    if (u.set) {
                        o = e.stylize("[Setter]", "special");
                    }
                }
                if (!L(i, n)) {
                    a = "[" + n + "]";
                }
                if (!o) {
                    if (e.seen.indexOf(u.value) < 0) {
                        if (g(r)) {
                            o = h(e, u.value, null);
                        } else {
                            o = h(e, u.value, r - 1);
                        }
                        if (o.indexOf("\n") > -1) {
                            if (s) {
                                o = o.split("\n").map(function(e) {
                                    return "  " + e;
                                }).join("\n").substr(2);
                            } else {
                                o = "\n" + o.split("\n").map(function(e) {
                                    return "   " + e;
                                }).join("\n");
                            }
                        }
                    } else {
                        o = e.stylize("[Circular]", "special");
                    }
                }
                if (C(a)) {
                    if (s && n.match(/^\d+$/)) {
                        return o;
                    }
                    a = JSON.stringify("" + n);
                    if (a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                        a = a.substr(1, a.length - 2);
                        a = e.stylize(a, "name");
                    } else {
                        a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                        a = e.stylize(a, "string");
                    }
                }
                return a + ": " + o;
            }
            function v(e, t, r) {
                var i = 0;
                var n = e.reduce(function(e, t) {
                    i++;
                    if (t.indexOf("\n") >= 0) i++;
                    return e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
                }, 0);
                if (n > 60) {
                    return r[0] + (t === "" ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1];
                }
                return r[0] + t + " " + e.join(", ") + " " + r[1];
            }
            function y(e) {
                return Array.isArray(e);
            }
            t.isArray = y;
            function x(e) {
                return typeof e === "boolean";
            }
            t.isBoolean = x;
            function g(e) {
                return e === null;
            }
            t.isNull = g;
            function b(e) {
                return e == null;
            }
            t.isNullOrUndefined = b;
            function E(e) {
                return typeof e === "number";
            }
            t.isNumber = E;
            function S(e) {
                return typeof e === "string";
            }
            t.isString = S;
            function D(e) {
                return (typeof e === "undefined" ? "undefined" : i(e)) === "symbol";
            }
            t.isSymbol = D;
            function C(e) {
                return e === void 0;
            }
            t.isUndefined = C;
            function A(e) {
                return k(e) && N(e) === "[object RegExp]";
            }
            t.isRegExp = A;
            function k(e) {
                return (typeof e === "undefined" ? "undefined" : i(e)) === "object" && e !== null;
            }
            t.isObject = k;
            function w(e) {
                return k(e) && N(e) === "[object Date]";
            }
            t.isDate = w;
            function T(e) {
                return k(e) && (N(e) === "[object Error]" || e instanceof Error);
            }
            t.isError = T;
            function F(e) {
                return typeof e === "function";
            }
            t.isFunction = F;
            function P(e) {
                return e === null || typeof e === "boolean" || typeof e === "number" || typeof e === "string" || (typeof e === "undefined" ? "undefined" : i(e)) === "symbol" || typeof e === "undefined";
            }
            t.isPrimitive = P;
            t.isBuffer = r(63);
            function N(e) {
                return Object.prototype.toString.call(e);
            }
            function I(e) {
                return e < 10 ? "0" + e.toString(10) : e.toString(10);
            }
            var _ = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            function B() {
                var e = new Date();
                var t = [ I(e.getHours()), I(e.getMinutes()), I(e.getSeconds()) ].join(":");
                return [ e.getDate(), _[e.getMonth()], t ].join(" ");
            }
            t.log = function() {
                console.log("%s - %s", B(), t.format.apply(t, arguments));
            };
            t.inherits = r(62);
            t._extend = function(e, t) {
                if (!t || !k(t)) return e;
                var r = Object.keys(t);
                var i = r.length;
                while (i--) {
                    e[r[i]] = t[r[i]];
                }
                return e;
            };
            function L(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }
        }).call(t, function() {
            return this;
        }());
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(39));
            e.use(r(41));
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(12));
            var t = e.use(r(2));
            var i = t.Type.def;
            var n = t.Type.or;
            i("XMLDefaultDeclaration").bases("Declaration").field("namespace", i("Expression"));
            i("XMLAnyName").bases("Expression");
            i("XMLQualifiedIdentifier").bases("Expression").field("left", n(i("Identifier"), i("XMLAnyName"))).field("right", n(i("Identifier"), i("Expression"))).field("computed", Boolean);
            i("XMLFunctionQualifiedIdentifier").bases("Expression").field("right", n(i("Identifier"), i("Expression"))).field("computed", Boolean);
            i("XMLAttributeSelector").bases("Expression").field("attribute", i("Expression"));
            i("XMLFilterExpression").bases("Expression").field("left", i("Expression")).field("right", i("Expression"));
            i("XMLElement").bases("XML", "Expression").field("contents", [ i("XML") ]);
            i("XMLList").bases("XML", "Expression").field("contents", [ i("XML") ]);
            i("XML").bases("Node");
            i("XMLEscape").bases("XML").field("expression", i("Expression"));
            i("XMLText").bases("XML").field("text", String);
            i("XMLStartTag").bases("XML").field("contents", [ i("XML") ]);
            i("XMLEndTag").bases("XML").field("contents", [ i("XML") ]);
            i("XMLPointTag").bases("XML").field("contents", [ i("XML") ]);
            i("XMLName").bases("XML").field("contents", n(String, [ i("XML") ]));
            i("XMLAttribute").bases("XML").field("value", String);
            i("XMLCdata").bases("XML").field("contents", String);
            i("XMLComment").bases("XML").field("contents", String);
            i("XMLProcessingInstruction").bases("XML").field("target", String).field("contents", n(String, null));
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(12));
            var t = e.use(r(2));
            var i = t.Type;
            var n = t.Type.def;
            var s = i.or;
            var a = e.use(r(4));
            var o = a.defaults;
            n("OptionalMemberExpression").bases("MemberExpression").build("object", "property", "computed", "optional").field("optional", Boolean, o["true"]);
            n("OptionalCallExpression").bases("CallExpression").build("callee", "arguments", "optional").field("optional", Boolean, o["true"]);
            var u = s("||", "&&", "??");
            n("LogicalExpression").field("operator", u);
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(13));
            var t = e.use(r(2));
            var i = e.use(r(4)).defaults;
            var n = t.Type.def;
            var s = t.Type.or;
            n("VariableDeclaration").field("declarations", [ s(n("VariableDeclarator"), n("Identifier")) ]);
            n("Property").field("value", s(n("Expression"), n("Pattern")));
            n("ArrayPattern").field("elements", [ s(n("Pattern"), n("SpreadElement"), null) ]);
            n("ObjectPattern").field("properties", [ s(n("Property"), n("PropertyPattern"), n("SpreadPropertyPattern"), n("SpreadProperty")) ]);
            n("ExportSpecifier").bases("ModuleSpecifier").build("id", "name");
            n("ExportBatchSpecifier").bases("Specifier").build();
            n("ExportDeclaration").bases("Declaration").build("default", "declaration", "specifiers", "source").field("default", Boolean).field("declaration", s(n("Declaration"), n("Expression"), null)).field("specifiers", [ s(n("ExportSpecifier"), n("ExportBatchSpecifier")) ], i.emptyArray).field("source", s(n("Literal"), null), i["null"]);
            n("Block").bases("Comment").build("value", "leading", "trailing");
            n("Line").bases("Comment").build("value", "leading", "trailing");
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(13));
            var t = e.use(r(2));
            var i = t.Type.def;
            var n = t.Type.or;
            var s = e.use(r(4)).defaults;
            i("JSXAttribute").bases("Node").build("name", "value").field("name", n(i("JSXIdentifier"), i("JSXNamespacedName"))).field("value", n(i("Literal"), i("JSXExpressionContainer"), null), s["null"]);
            i("JSXIdentifier").bases("Identifier").build("name").field("name", String);
            i("JSXNamespacedName").bases("Node").build("namespace", "name").field("namespace", i("JSXIdentifier")).field("name", i("JSXIdentifier"));
            i("JSXMemberExpression").bases("MemberExpression").build("object", "property").field("object", n(i("JSXIdentifier"), i("JSXMemberExpression"))).field("property", i("JSXIdentifier")).field("computed", Boolean, s.false);
            var a = n(i("JSXIdentifier"), i("JSXNamespacedName"), i("JSXMemberExpression"));
            i("JSXSpreadAttribute").bases("Node").build("argument").field("argument", i("Expression"));
            var o = [ n(i("JSXAttribute"), i("JSXSpreadAttribute")) ];
            i("JSXExpressionContainer").bases("Expression").build("expression").field("expression", i("Expression"));
            i("JSXElement").bases("Expression").build("openingElement", "closingElement", "children").field("openingElement", i("JSXOpeningElement")).field("closingElement", n(i("JSXClosingElement"), null), s["null"]).field("children", [ n(i("JSXElement"), i("JSXExpressionContainer"), i("JSXFragment"), i("JSXText"), i("Literal")) ], s.emptyArray).field("name", a, function() {
                return this.openingElement.name;
            }, true).field("selfClosing", Boolean, function() {
                return this.openingElement.selfClosing;
            }, true).field("attributes", o, function() {
                return this.openingElement.attributes;
            }, true);
            i("JSXOpeningElement").bases("Node").build("name", "attributes", "selfClosing").field("name", a).field("attributes", o, s.emptyArray).field("selfClosing", Boolean, s["false"]);
            i("JSXClosingElement").bases("Node").build("name").field("name", a);
            i("JSXFragment").bases("Expression").build("openingElement", "closingElement", "children").field("openingElement", i("JSXOpeningFragment")).field("closingElement", i("JSXClosingFragment")).field("children", [ n(i("JSXElement"), i("JSXExpressionContainer"), i("JSXFragment"), i("JSXText"), i("Literal")) ], s.emptyArray);
            i("JSXOpeningFragment").bases("Node").build();
            i("JSXClosingFragment").bases("Node").build();
            i("JSXText").bases("Literal").build("value").field("value", String);
            i("JSXEmptyExpression").bases("Expression").build();
            i("JSXSpreadChild").bases("Expression").build("expression").field("expression", i("Expression"));
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(12));
            var t = e.use(r(2));
            var i = t.Type.def;
            var n = t.Type.or;
            var s = e.use(r(4));
            var a = s.geq;
            var o = s.defaults;
            i("Function").field("body", n(i("BlockStatement"), i("Expression")));
            i("ForInStatement").build("left", "right", "body", "each").field("each", Boolean, o["false"]);
            i("LetStatement").bases("Statement").build("head", "body").field("head", [ i("VariableDeclarator") ]).field("body", i("Statement"));
            i("LetExpression").bases("Expression").build("head", "body").field("head", [ i("VariableDeclarator") ]).field("body", i("Expression"));
            i("GraphExpression").bases("Expression").build("index", "expression").field("index", a(0)).field("expression", i("Literal"));
            i("GraphIndexExpression").bases("Expression").build("index").field("index", a(0));
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.use(r(39));
            var t = e.use(r(2));
            var i = t.namedTypes;
            var n = t.Type.def;
            var s = t.Type.or;
            var a = e.use(r(4)).defaults;
            var o = new t.Type(function(e, t) {
                if (i.StringLiteral && i.StringLiteral.check(e, t)) {
                    return true;
                }
                if (i.Literal && i.Literal.check(e, t) && typeof e.value === "string") {
                    return true;
                }
                return false;
            }, "StringLiteral");
            n("TSType").bases("Node");
            var u = s(n("Identifier"), n("TSQualifiedName"));
            n("TSTypeReference").bases("TSType").build("typeName", "typeParameters").field("typeName", u).field("typeParameters", s(n("TSTypeParameterInstantiation"), null), a["null"]);
            n("TSHasOptionalTypeParameters").field("typeParameters", s(n("TSTypeParameterDeclaration"), null), a["null"]);
            n("TSHasOptionalTypeAnnotation").field("typeAnnotation", s(n("TSTypeAnnotation"), null), a["null"]);
            n("TSQualifiedName").bases("Node").build("left", "right").field("left", u).field("right", u);
            n("TSAsExpression").bases("Expression").build("expression").field("expression", n("Expression")).field("typeAnnotation", n("TSType")).field("extra", s({
                parenthesized: Boolean
            }, null), a["null"]);
            n("TSNonNullExpression").bases("Expression").build("expression").field("expression", n("Expression"));
            [ "TSAnyKeyword", "TSBooleanKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword", "TSThisType" ].forEach(function(e) {
                n(e).bases("TSType").build();
            });
            n("TSArrayType").bases("TSType").build("elementType").field("elementType", n("TSType"));
            n("TSLiteralType").bases("TSType").build("literal").field("literal", s(n("NumericLiteral"), n("StringLiteral"), n("BooleanLiteral")));
            [ "TSUnionType", "TSIntersectionType" ].forEach(function(e) {
                n(e).bases("TSType").build("types").field("types", [ n("TSType") ]);
            });
            n("TSConditionalType").bases("TSType").build("checkType", "extendsType", "trueType", "falseType").field("checkType", n("TSType")).field("extendsType", n("TSType")).field("trueType", n("TSType")).field("falseType", n("TSType"));
            n("TSInferType").bases("TSType").build("typeParameter").field("typeParameter", n("TSTypeParameter"));
            n("TSParenthesizedType").bases("TSType").build("typeAnnotation").field("typeAnnotation", n("TSType"));
            var l = [ s(n("Identifier"), n("RestElement")) ];
            [ "TSFunctionType", "TSConstructorType" ].forEach(function(e) {
                n(e).bases("TSType", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("parameters").field("parameters", l);
            });
            n("TSDeclareFunction").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "params", "returnType").field("declare", Boolean, a["false"]).field("async", Boolean, a["false"]).field("generator", Boolean, a["false"]).field("id", s(n("Identifier"), null), a["null"]).field("params", [ n("Pattern") ]).field("returnType", s(n("TSTypeAnnotation"), n("Noop"), null), a["null"]);
            n("TSDeclareMethod").bases("Declaration", "TSHasOptionalTypeParameters").build("key", "params", "returnType").field("async", Boolean, a["false"]).field("generator", Boolean, a["false"]).field("params", [ n("Pattern") ]).field("abstract", Boolean, a["false"]).field("accessibility", s("public", "private", "protected", void 0), a["undefined"]).field("static", Boolean, a["false"]).field("computed", Boolean, a["false"]).field("optional", Boolean, a["false"]).field("key", s(n("Identifier"), n("StringLiteral"), n("NumericLiteral"), n("Expression"))).field("kind", s("get", "set", "method", "constructor"), function e() {
                return "method";
            }).field("access", s("public", "private", "protected", void 0), a["undefined"]).field("decorators", s([ n("Decorator") ], null), a["null"]).field("returnType", s(n("TSTypeAnnotation"), n("Noop"), null), a["null"]);
            n("TSMappedType").bases("TSType").build("typeParameter", "typeAnnotation").field("readonly", Boolean, a["false"]).field("typeParameter", n("TSTypeParameter")).field("optional", Boolean, a["false"]).field("typeAnnotation", s(n("TSType"), null), a["null"]);
            n("TSTupleType").bases("TSType").build("elementTypes").field("elementTypes", [ n("TSType") ]);
            n("TSRestType").bases("TSType").build("typeAnnotation").field("typeAnnotation", n("TSType"));
            n("TSOptionalType").bases("TSType").build("typeAnnotation").field("typeAnnotation", n("TSType"));
            n("TSIndexedAccessType").bases("TSType").build("objectType", "indexType").field("objectType", n("TSType")).field("indexType", n("TSType"));
            n("TSTypeOperator").bases("TSType").build("operator").field("operator", String).field("typeAnnotation", n("TSType"));
            n("TSTypeAnnotation").bases("Node").build("typeAnnotation").field("typeAnnotation", s(n("TSType"), n("TSTypeAnnotation")));
            n("TSIndexSignature").bases("Declaration", "TSHasOptionalTypeAnnotation").build("parameters").field("parameters", [ n("Identifier") ]).field("readonly", Boolean, a["false"]);
            n("TSPropertySignature").bases("Declaration", "TSHasOptionalTypeAnnotation").build("key").field("key", n("Expression")).field("computed", Boolean, a["false"]).field("readonly", Boolean, a["false"]).field("optional", Boolean, a["false"]).field("initializer", s(n("Expression"), null), a["null"]);
            n("TSMethodSignature").bases("Declaration", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("key").field("key", n("Expression")).field("computed", Boolean, a["false"]).field("optional", Boolean, a["false"]).field("parameters", l);
            n("TSTypePredicate").bases("TSTypeAnnotation").build("parameterName", "typeAnnotation").field("parameterName", s(n("Identifier"), n("TSThisType"))).field("typeAnnotation", n("TSTypeAnnotation"));
            [ "TSCallSignatureDeclaration", "TSConstructSignatureDeclaration" ].forEach(function(e) {
                n(e).bases("Declaration", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("parameters").field("parameters", l);
            });
            n("TSEnumMember").bases("Node").build("id", "initializer").field("id", s(n("Identifier"), o)).field("initializer", s(n("Expression"), null), a["null"]);
            n("TSTypeQuery").bases("TSType").build("exprName").field("exprName", n("Identifier"));
            var c = s(n("TSCallSignatureDeclaration"), n("TSConstructSignatureDeclaration"), n("TSIndexSignature"), n("TSMethodSignature"), n("TSPropertySignature"));
            n("TSTypeLiteral").bases("TSType").build("members").field("members", [ c ]);
            n("TSTypeParameter").bases("Identifier").field("name", String).field("constraint", s(n("TSType"), null), a["null"]).field("default", s(n("TSType"), null), a["null"]);
            n("TSTypeAssertion").bases("Expression").build("typeAnnotation", "expression").field("typeAnnotation", n("TSType")).field("expression", n("Expression")).field("extra", s({
                parenthesized: Boolean
            }, null), a["null"]);
            n("TSTypeParameterDeclaration").bases("Declaration").build("params").field("params", [ n("TSTypeParameter") ]);
            n("TSTypeParameterInstantiation").bases("Node").build("params").field("params", [ n("TSType") ]);
            n("TSEnumDeclaration").bases("Declaration").build("id", "members").field("id", n("Identifier")).field("const", Boolean, a["false"]).field("declare", Boolean, a["false"]).field("members", [ n("TSEnumMember") ]).field("initializer", s(n("Expression"), null), a["null"]);
            n("TSTypeAliasDeclaration").bases("Declaration", "TSHasOptionalTypeParameters").build("id").field("id", n("Identifier")).field("declare", Boolean, a["false"]).field("typeAnnotation", n("TSType"));
            n("TSModuleBlock").bases("Node").build("body").field("body", [ n("Statement") ]);
            n("TSModuleDeclaration").bases("Declaration").build("id", "body").field("id", s(o, u)).field("declare", Boolean, a["false"]).field("global", Boolean, a["false"]).field("body", s(n("TSModuleBlock"), n("TSModuleDeclaration"), null), a["null"]);
            n("TSImportEqualsDeclaration").bases("Declaration").build("id", "moduleReference").field("id", n("Identifier")).field("isExport", Boolean, a["false"]).field("moduleReference", s(u, n("TSExternalModuleReference")));
            n("TSExternalModuleReference").bases("Declaration").build("expression").field("expression", o);
            n("TSExportAssignment").bases("Statement").build("expression").field("expression", n("Expression"));
            n("TSNamespaceExportDeclaration").bases("Declaration").build("id").field("id", n("Identifier"));
            n("TSInterfaceBody").bases("Node").build("body").field("body", [ c ]);
            n("TSExpressionWithTypeArguments").bases("TSType").build("expression", "typeParameters").field("expression", u).field("typeParameters", s(n("TSTypeParameterInstantiation"), null), a["null"]);
            n("TSInterfaceDeclaration").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "body").field("id", u).field("declare", Boolean, a["false"]).field("extends", s([ n("TSExpressionWithTypeArguments") ], null), a["null"]).field("body", n("TSInterfaceBody"));
            [ "ClassDeclaration", "ClassExpression" ].forEach(function(e) {
                n(e).field("implements", [ n("TSExpressionWithTypeArguments") ], a.emptyArray);
            });
            n("TSParameterProperty").bases("Pattern").build("parameter").field("accessibility", s("public", "private", "protected", void 0), a["undefined"]).field("readonly", Boolean, a["false"]).field("parameter", s(n("Identifier"), n("AssignmentPattern")));
            n("ClassBody").field("body", [ s(n("MethodDefinition"), n("VariableDeclarator"), n("ClassPropertyDefinition"), n("ClassProperty"), n("ClassMethod"), n("TSDeclareMethod"), c) ]);
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            var t = [];
            var i = [];
            var n = {};
            function s(e) {
                var r = t.indexOf(e);
                if (r === -1) {
                    r = t.length;
                    t.push(e);
                    i[r] = e(n);
                }
                return i[r];
            }
            n.use = s;
            var a = s(r(2));
            e.forEach(s);
            a.finalize();
            var o = {
                Type: a.Type,
                builtInTypes: a.builtInTypes,
                namedTypes: a.namedTypes,
                builders: a.builders,
                defineMethod: a.defineMethod,
                getFieldNames: a.getFieldNames,
                getFieldValue: a.getFieldValue,
                eachField: a.eachField,
                someField: a.someField,
                getSupertypeNames: a.getSupertypeNames,
                astNodesAreEquivalent: s(r(73)),
                finalize: a.finalize,
                Path: s(r(42)),
                NodePath: s(r(21)),
                PathVisitor: s(r(74)),
                use: s
            };
            o.visit = o.PathVisitor.visit;
            return o;
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            var t = e.use(r(2));
            var i = t.getFieldNames;
            var n = t.getFieldValue;
            var s = t.builtInTypes.array;
            var a = t.builtInTypes.object;
            var o = t.builtInTypes.Date;
            var u = t.builtInTypes.RegExp;
            var l = Object.prototype.hasOwnProperty;
            function c(e, t, r) {
                if (s.check(r)) {
                    r.length = 0;
                } else {
                    r = null;
                }
                return p(e, t, r);
            }
            c.assert = function(e, t) {
                var r = [];
                if (!c(e, t, r)) {
                    if (r.length === 0) {
                        if (e !== t) {
                            throw new Error("Nodes must be equal");
                        }
                    } else {
                        throw new Error("Nodes differ in the following path: " + r.map(h).join(""));
                    }
                }
            };
            function h(e) {
                if (/[_$a-z][_$a-z0-9]*/i.test(e)) {
                    return "." + e;
                }
                return "[" + JSON.stringify(e) + "]";
            }
            function p(e, t, r) {
                if (e === t) {
                    return true;
                }
                if (s.check(e)) {
                    return f(e, t, r);
                }
                if (a.check(e)) {
                    return d(e, t, r);
                }
                if (o.check(e)) {
                    return o.check(t) && +e === +t;
                }
                if (u.check(e)) {
                    return u.check(t) && e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.ignoreCase === t.ignoreCase;
                }
                return e == t;
            }
            function f(e, t, r) {
                s.assert(e);
                var i = e.length;
                if (!s.check(t) || t.length !== i) {
                    if (r) {
                        r.push("length");
                    }
                    return false;
                }
                for (var n = 0; n < i; ++n) {
                    if (r) {
                        r.push(n);
                    }
                    if (n in e !== n in t) {
                        return false;
                    }
                    if (!p(e[n], t[n], r)) {
                        return false;
                    }
                    if (r) {
                        var a = r.pop();
                        if (a !== n) {
                            throw new Error("" + a);
                        }
                    }
                }
                return true;
            }
            function d(e, t, r) {
                a.assert(e);
                if (!a.check(t)) {
                    return false;
                }
                if (e.type !== t.type) {
                    if (r) {
                        r.push("type");
                    }
                    return false;
                }
                var s = i(e);
                var o = s.length;
                var u = i(t);
                var c = u.length;
                if (o === c) {
                    for (var h = 0; h < o; ++h) {
                        var f = s[h];
                        var d = n(e, f);
                        var m = n(t, f);
                        if (r) {
                            r.push(f);
                        }
                        if (!p(d, m, r)) {
                            return false;
                        }
                        if (r) {
                            var v = r.pop();
                            if (v !== f) {
                                throw new Error("" + v);
                            }
                        }
                    }
                    return true;
                }
                if (!r) {
                    return false;
                }
                var y = Object.create(null);
                for (h = 0; h < o; ++h) {
                    y[s[h]] = true;
                }
                for (h = 0; h < c; ++h) {
                    f = u[h];
                    if (!l.call(y, f)) {
                        r.push(f);
                        return false;
                    }
                    delete y[f];
                }
                for (f in y) {
                    r.push(f);
                    break;
                }
                return false;
            }
            return c;
        };
    }, function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = Object.prototype.hasOwnProperty;
        e.exports = function(e) {
            var t = e.use(r(2));
            var s = e.use(r(21));
            var a = t.namedTypes.Printable;
            var o = t.builtInTypes.array;
            var u = t.builtInTypes.object;
            var l = t.builtInTypes.function;
            var c;
            function h() {
                if (!(this instanceof h)) {
                    throw new Error("PathVisitor constructor cannot be invoked without 'new'");
                }
                this._reusableContextStack = [];
                this._methodNameTable = p(this);
                this._shouldVisitComments = n.call(this._methodNameTable, "Block") || n.call(this._methodNameTable, "Line");
                this.Context = v(this);
                this._visiting = false;
                this._changeReported = false;
            }
            function p(e) {
                var r = Object.create(null);
                for (var i in e) {
                    if (/^visit[A-Z]/.test(i)) {
                        r[i.slice("visit".length)] = true;
                    }
                }
                var n = t.computeSupertypeLookupTable(r);
                var s = Object.create(null);
                var r = Object.keys(n);
                var a = r.length;
                for (var o = 0; o < a; ++o) {
                    var u = r[o];
                    i = "visit" + n[u];
                    if (l.check(e[i])) {
                        s[u] = i;
                    }
                }
                return s;
            }
            h.fromMethodsObject = function e(t) {
                if (t instanceof h) {
                    return t;
                }
                if (!u.check(t)) {
                    return new h();
                }
                function r() {
                    if (!(this instanceof r)) {
                        throw new Error("Visitor constructor cannot be invoked without 'new'");
                    }
                    h.call(this);
                }
                var i = r.prototype = Object.create(d);
                i.constructor = r;
                f(i, t);
                f(r, h);
                l.assert(r.fromMethodsObject);
                l.assert(r.visit);
                return new r();
            };
            function f(e, t) {
                for (var r in t) {
                    if (n.call(t, r)) {
                        e[r] = t[r];
                    }
                }
                return e;
            }
            h.visit = function e(t, r) {
                return h.fromMethodsObject(r).visit(t);
            };
            var d = h.prototype;
            d.visit = function() {
                if (this._visiting) {
                    throw new Error("Recursively calling visitor.visit(path) resets visitor state. " + "Try this.visit(path) or this.traverse(path) instead.");
                }
                this._visiting = true;
                this._changeReported = false;
                this._abortRequested = false;
                var e = arguments.length;
                var t = new Array(e);
                for (var r = 0; r < e; ++r) {
                    t[r] = arguments[r];
                }
                if (!(t[0] instanceof s)) {
                    t[0] = new s({
                        root: t[0]
                    }).get("root");
                }
                this.reset.apply(this, t);
                try {
                    var i = this.visitWithoutReset(t[0]);
                    var n = true;
                } finally {
                    this._visiting = false;
                    if (!n && this._abortRequested) {
                        return t[0].value;
                    }
                }
                return i;
            };
            d.AbortRequest = function e() {};
            d.abort = function() {
                var e = this;
                e._abortRequested = true;
                var t = new e.AbortRequest();
                t.cancel = function() {
                    e._abortRequested = false;
                };
                throw t;
            };
            d.reset = function(e) {};
            d.visitWithoutReset = function(e) {
                if (this instanceof this.Context) {
                    return this.visitor.visitWithoutReset(e);
                }
                if (!(e instanceof s)) {
                    throw new Error("");
                }
                var t = e.value;
                var r = t && (typeof t === "undefined" ? "undefined" : i(t)) === "object" && typeof t.type === "string" && this._methodNameTable[t.type];
                if (r) {
                    var n = this.acquireContext(e);
                    try {
                        return n.invokeVisitorMethod(r);
                    } finally {
                        this.releaseContext(n);
                    }
                } else {
                    return m(e, this);
                }
            };
            function m(e, r) {
                if (!(e instanceof s)) {
                    throw new Error("");
                }
                if (!(r instanceof h)) {
                    throw new Error("");
                }
                var i = e.value;
                if (o.check(i)) {
                    e.each(r.visitWithoutReset, r);
                } else if (!u.check(i)) {} else {
                    var a = t.getFieldNames(i);
                    if (r._shouldVisitComments && i.comments && a.indexOf("comments") < 0) {
                        a.push("comments");
                    }
                    var l = a.length;
                    var c = [];
                    for (var p = 0; p < l; ++p) {
                        var f = a[p];
                        if (!n.call(i, f)) {
                            i[f] = t.getFieldValue(i, f);
                        }
                        c.push(e.get(f));
                    }
                    for (var p = 0; p < l; ++p) {
                        r.visitWithoutReset(c[p]);
                    }
                }
                return e.value;
            }
            d.acquireContext = function(e) {
                if (this._reusableContextStack.length === 0) {
                    return new this.Context(e);
                }
                return this._reusableContextStack.pop().reset(e);
            };
            d.releaseContext = function(e) {
                if (!(e instanceof this.Context)) {
                    throw new Error("");
                }
                this._reusableContextStack.push(e);
                e.currentPath = null;
            };
            d.reportChanged = function() {
                this._changeReported = true;
            };
            d.wasChangeReported = function() {
                return this._changeReported;
            };
            function v(e) {
                function t(r) {
                    if (!(this instanceof t)) {
                        throw new Error("");
                    }
                    if (!(this instanceof h)) {
                        throw new Error("");
                    }
                    if (!(r instanceof s)) {
                        throw new Error("");
                    }
                    Object.defineProperty(this, "visitor", {
                        value: e,
                        writable: false,
                        enumerable: true,
                        configurable: false
                    });
                    this.currentPath = r;
                    this.needToCallTraverse = true;
                    Object.seal(this);
                }
                if (!(e instanceof h)) {
                    throw new Error("");
                }
                var r = t.prototype = Object.create(e);
                r.constructor = t;
                f(r, y);
                return t;
            }
            var y = Object.create(null);
            y.reset = function e(t) {
                if (!(this instanceof this.Context)) {
                    throw new Error("");
                }
                if (!(t instanceof s)) {
                    throw new Error("");
                }
                this.currentPath = t;
                this.needToCallTraverse = true;
                return this;
            };
            y.invokeVisitorMethod = function e(t) {
                if (!(this instanceof this.Context)) {
                    throw new Error("");
                }
                if (!(this.currentPath instanceof s)) {
                    throw new Error("");
                }
                var r = this.visitor[t].call(this, this.currentPath);
                if (r === false) {
                    this.needToCallTraverse = false;
                } else if (r !== c) {
                    this.currentPath = this.currentPath.replace(r)[0];
                    if (this.needToCallTraverse) {
                        this.traverse(this.currentPath);
                    }
                }
                if (this.needToCallTraverse !== false) {
                    throw new Error("Must either call this.traverse or return false in " + t);
                }
                var i = this.currentPath;
                return i && i.value;
            };
            y.traverse = function e(t, r) {
                if (!(this instanceof this.Context)) {
                    throw new Error("");
                }
                if (!(t instanceof s)) {
                    throw new Error("");
                }
                if (!(this.currentPath instanceof s)) {
                    throw new Error("");
                }
                this.needToCallTraverse = false;
                return m(t, h.fromMethodsObject(r || this.visitor));
            };
            y.visit = function e(t, r) {
                if (!(this instanceof this.Context)) {
                    throw new Error("");
                }
                if (!(t instanceof s)) {
                    throw new Error("");
                }
                if (!(this.currentPath instanceof s)) {
                    throw new Error("");
                }
                this.needToCallTraverse = false;
                return h.fromMethodsObject(r || this.visitor).visitWithoutReset(t);
            };
            y.reportChanged = function e() {
                this.visitor.reportChanged();
            };
            y.abort = function e() {
                this.needToCallTraverse = false;
                this.visitor.abort();
            };
            return h;
        };
    }, function(e, t, r) {
        "use strict";
        var i = Object.prototype.hasOwnProperty;
        e.exports = function(e) {
            var t = e.use(r(2));
            var n = t.Type;
            var s = t.namedTypes;
            var a = s.Node;
            var o = s.Expression;
            var u = t.builtInTypes.array;
            var l = t.builders;
            function c(t, i) {
                if (!(this instanceof c)) {
                    throw new Error("Scope constructor cannot be invoked without 'new'");
                }
                if (!(t instanceof e.use(r(21)))) {
                    throw new Error("");
                }
                p.assert(t.value);
                var n;
                if (i) {
                    if (!(i instanceof c)) {
                        throw new Error("");
                    }
                    n = i.depth + 1;
                } else {
                    i = null;
                    n = 0;
                }
                Object.defineProperties(this, {
                    path: {
                        value: t
                    },
                    node: {
                        value: t.value
                    },
                    isGlobal: {
                        value: !i,
                        enumerable: true
                    },
                    depth: {
                        value: n
                    },
                    parent: {
                        value: i
                    },
                    bindings: {
                        value: {}
                    },
                    types: {
                        value: {}
                    }
                });
            }
            var h = [ s.Program, s.Function, s.CatchClause ];
            var p = n.or.apply(n, h);
            c.isEstablishedBy = function(e) {
                return p.check(e);
            };
            var f = c.prototype;
            f.didScan = false;
            f.declares = function(e) {
                this.scan();
                return i.call(this.bindings, e);
            };
            f.declaresType = function(e) {
                this.scan();
                return i.call(this.types, e);
            };
            f.declareTemporary = function(e) {
                if (e) {
                    if (!/^[a-z$_]/i.test(e)) {
                        throw new Error("");
                    }
                } else {
                    e = "t$";
                }
                e += this.depth.toString(36) + "$";
                this.scan();
                var r = 0;
                while (this.declares(e + r)) {
                    ++r;
                }
                var i = e + r;
                return this.bindings[i] = t.builders.identifier(i);
            };
            f.injectTemporary = function(e, t) {
                e || (e = this.declareTemporary());
                var r = this.path.get("body");
                if (s.BlockStatement.check(r.value)) {
                    r = r.get("body");
                }
                r.unshift(l.variableDeclaration("var", [ l.variableDeclarator(e, t || null) ]));
                return e;
            };
            f.scan = function(e) {
                if (e || !this.didScan) {
                    for (var t in this.bindings) {
                        delete this.bindings[t];
                    }
                    d(this.path, this.bindings, this.types);
                    this.didScan = true;
                }
            };
            f.getBindings = function() {
                this.scan();
                return this.bindings;
            };
            f.getTypes = function() {
                this.scan();
                return this.types;
            };
            function d(e, t, r) {
                var i = e.value;
                p.assert(i);
                if (s.CatchClause.check(i)) {
                    x(e.get("param"), t);
                } else {
                    m(e, t, r);
                }
            }
            function m(e, r, i) {
                var n = e.value;
                if (e.parent && s.FunctionExpression.check(e.parent.node) && e.parent.node.id) {
                    x(e.parent.get("id"), r);
                }
                if (!n) {} else if (u.check(n)) {
                    e.each(function(e) {
                        y(e, r, i);
                    });
                } else if (s.Function.check(n)) {
                    e.get("params").each(function(e) {
                        x(e, r);
                    });
                    y(e.get("body"), r, i);
                } else if (s.TypeAlias && s.TypeAlias.check(n)) {
                    g(e.get("id"), i);
                } else if (s.VariableDeclarator.check(n)) {
                    x(e.get("id"), r);
                    y(e.get("init"), r, i);
                } else if (n.type === "ImportSpecifier" || n.type === "ImportNamespaceSpecifier" || n.type === "ImportDefaultSpecifier") {
                    x(e.get(n.local ? "local" : n.name ? "name" : "id"), r);
                } else if (a.check(n) && !o.check(n)) {
                    t.eachField(n, function(t, n) {
                        var s = e.get(t);
                        if (!v(s, n)) {
                            throw new Error("");
                        }
                        y(s, r, i);
                    });
                }
            }
            function v(e, t) {
                if (e.value === t) {
                    return true;
                }
                if (Array.isArray(e.value) && e.value.length === 0 && Array.isArray(t) && t.length === 0) {
                    return true;
                }
                return false;
            }
            function y(e, t, r) {
                var n = e.value;
                if (!n || o.check(n)) {} else if (s.FunctionDeclaration.check(n) && n.id !== null) {
                    x(e.get("id"), t);
                } else if (s.ClassDeclaration && s.ClassDeclaration.check(n)) {
                    x(e.get("id"), t);
                } else if (p.check(n)) {
                    if (s.CatchClause.check(n)) {
                        var a = n.param.name;
                        var u = i.call(t, a);
                        m(e.get("body"), t, r);
                        if (!u) {
                            delete t[a];
                        }
                    }
                } else {
                    m(e, t, r);
                }
            }
            function x(e, t) {
                var r = e.value;
                s.Pattern.assert(r);
                if (s.Identifier.check(r)) {
                    if (i.call(t, r.name)) {
                        t[r.name].push(e);
                    } else {
                        t[r.name] = [ e ];
                    }
                } else if (s.AssignmentPattern && s.AssignmentPattern.check(r)) {
                    x(e.get("left"), t);
                } else if (s.ObjectPattern && s.ObjectPattern.check(r)) {
                    e.get("properties").each(function(e) {
                        var r = e.value;
                        if (s.Pattern.check(r)) {
                            x(e, t);
                        } else if (s.Property.check(r)) {
                            x(e.get("value"), t);
                        } else if (s.SpreadProperty && s.SpreadProperty.check(r)) {
                            x(e.get("argument"), t);
                        }
                    });
                } else if (s.ArrayPattern && s.ArrayPattern.check(r)) {
                    e.get("elements").each(function(e) {
                        var r = e.value;
                        if (s.Pattern.check(r)) {
                            x(e, t);
                        } else if (s.SpreadElement && s.SpreadElement.check(r)) {
                            x(e.get("argument"), t);
                        }
                    });
                } else if (s.PropertyPattern && s.PropertyPattern.check(r)) {
                    x(e.get("pattern"), t);
                } else if (s.SpreadElementPattern && s.SpreadElementPattern.check(r) || s.SpreadPropertyPattern && s.SpreadPropertyPattern.check(r)) {
                    x(e.get("argument"), t);
                }
            }
            function g(e, t) {
                var r = e.value;
                s.Pattern.assert(r);
                if (s.Identifier.check(r)) {
                    if (i.call(t, r.name)) {
                        t[r.name].push(e);
                    } else {
                        t[r.name] = [ e ];
                    }
                }
            }
            f.lookup = function(e) {
                for (var t = this; t; t = t.parent) {
                    if (t.declares(e)) break;
                }
                return t;
            };
            f.lookupType = function(e) {
                for (var t = this; t; t = t.parent) {
                    if (t.declaresType(e)) break;
                }
                return t;
            };
            f.getGlobalScope = function() {
                var e = this;
                while (!e.isGlobal) {
                    e = e.parent;
                }
                return e;
            };
            return c;
        };
    }, function(e, t, r) {
        "use strict";
        e.exports = r(72)([ r(12), r(40), r(13), r(70), r(66), r(69), r(41), r(68), r(65), r(71), r(67) ]);
    }, , , , , function(e, t) {
        "use strict";
        t.endianness = function() {
            return "LE";
        };
        t.hostname = function() {
            if (typeof location !== "undefined") {
                return location.hostname;
            } else return "";
        };
        t.loadavg = function() {
            return [];
        };
        t.uptime = function() {
            return 0;
        };
        t.freemem = function() {
            return Number.MAX_VALUE;
        };
        t.totalmem = function() {
            return Number.MAX_VALUE;
        };
        t.cpus = function() {
            return [];
        };
        t.type = function() {
            return "Browser";
        };
        t.release = function() {
            if (typeof navigator !== "undefined") {
                return navigator.appVersion;
            }
            return "";
        };
        t.networkInterfaces = t.getNetworkInterfaces = function() {
            return {};
        };
        t.arch = function() {
            return "javascript";
        };
        t.platform = function() {
            return "browser";
        };
        t.tmpdir = t.tmpDir = function() {
            return "/tmp";
        };
        t.EOL = "\n";
    }, function(e, t, r) {
        "use strict";
        var i = r(8);
        var n = r(6);
        var s = n.builtInTypes.string;
        var a = n.builtInTypes.number;
        var o = n.namedTypes.SourceLocation;
        var u = n.namedTypes.Position;
        var l = r(14);
        var c = r(9).comparePos;
        function h(e, t, r) {
            i.ok(this instanceof h);
            i.ok(e instanceof l.Lines);
            o.assert(t);
            if (r) {
                i.ok(a.check(r.start.line) && a.check(r.start.column) && a.check(r.end.line) && a.check(r.end.column));
            } else {
                r = t;
            }
            Object.defineProperties(this, {
                sourceLines: {
                    value: e
                },
                sourceLoc: {
                    value: t
                },
                targetLoc: {
                    value: r
                }
            });
        }
        var p = h.prototype;
        e.exports = h;
        p.slice = function(e, t, r) {
            i.ok(e instanceof l.Lines);
            u.assert(t);
            if (r) {
                u.assert(r);
            } else {
                r = e.lastPos();
            }
            var n = this.sourceLines;
            var s = this.sourceLoc;
            var a = this.targetLoc;
            function o(o) {
                var u = s[o];
                var l = a[o];
                var c = t;
                if (o === "end") {
                    c = r;
                } else {
                    i.strictEqual(o, "start");
                }
                return m(n, u, e, l, c);
            }
            if (c(t, a.start) <= 0) {
                if (c(a.end, r) <= 0) {
                    a = {
                        start: d(a.start, t.line, t.column),
                        end: d(a.end, t.line, t.column)
                    };
                } else if (c(r, a.start) <= 0) {
                    return null;
                } else {
                    s = {
                        start: s.start,
                        end: o("end")
                    };
                    a = {
                        start: d(a.start, t.line, t.column),
                        end: d(r, t.line, t.column)
                    };
                }
            } else {
                if (c(a.end, t) <= 0) {
                    return null;
                }
                if (c(a.end, r) <= 0) {
                    s = {
                        start: o("start"),
                        end: s.end
                    };
                    a = {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: d(a.end, t.line, t.column)
                    };
                } else {
                    s = {
                        start: o("start"),
                        end: o("end")
                    };
                    a = {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: d(r, t.line, t.column)
                    };
                }
            }
            return new h(this.sourceLines, s, a);
        };
        p.add = function(e, t) {
            return new h(this.sourceLines, this.sourceLoc, {
                start: f(this.targetLoc.start, e, t),
                end: f(this.targetLoc.end, e, t)
            });
        };
        function f(e, t, r) {
            return {
                line: e.line + t - 1,
                column: e.line === 1 ? e.column + r : e.column
            };
        }
        p.subtract = function(e, t) {
            return new h(this.sourceLines, this.sourceLoc, {
                start: d(this.targetLoc.start, e, t),
                end: d(this.targetLoc.end, e, t)
            });
        };
        function d(e, t, r) {
            return {
                line: e.line - t + 1,
                column: e.line === t ? e.column - r : e.column
            };
        }
        p.indent = function(e, t, r) {
            if (e === 0) {
                return this;
            }
            var i = this.targetLoc;
            var n = i.start.line;
            var s = i.end.line;
            if (t && n === 1 && s === 1) {
                return this;
            }
            i = {
                start: i.start,
                end: i.end
            };
            if (!t || n > 1) {
                var a = i.start.column + e;
                i.start = {
                    line: n,
                    column: r ? Math.max(0, a) : a
                };
            }
            if (!t || s > 1) {
                var o = i.end.column + e;
                i.end = {
                    line: s,
                    column: r ? Math.max(0, o) : o
                };
            }
            return new h(this.sourceLines, this.sourceLoc, i);
        };
        function m(e, t, r, n, s) {
            i.ok(e instanceof l.Lines);
            i.ok(r instanceof l.Lines);
            u.assert(t);
            u.assert(n);
            u.assert(s);
            var a = c(n, s);
            if (a === 0) {
                return t;
            }
            if (a < 0) {
                var o = e.skipSpaces(t);
                var h = r.skipSpaces(n);
                var p = s.line - h.line;
                o.line += p;
                h.line += p;
                if (p > 0) {
                    o.column = 0;
                    h.column = 0;
                } else {
                    i.strictEqual(p, 0);
                }
                while (c(h, s) < 0 && r.nextPos(h, true)) {
                    i.ok(e.nextPos(o, true));
                    i.strictEqual(e.charAt(o), r.charAt(h));
                }
            } else {
                var o = e.skipSpaces(t, true);
                var h = r.skipSpaces(n, true);
                var p = s.line - h.line;
                o.line += p;
                h.line += p;
                if (p < 0) {
                    o.column = e.getLineLength(o.line);
                    h.column = r.getLineLength(h.line);
                } else {
                    i.strictEqual(p, 0);
                }
                while (c(s, h) < 0 && r.prevPos(h, true)) {
                    i.ok(e.prevPos(o, true));
                    i.strictEqual(e.charAt(o), r.charAt(h));
                }
            }
            return o;
        }
    }, function(e, t, r) {
        "use strict";
        var i = r(8);
        var n = r(6);
        var s = n.namedTypes;
        var a = n.builders;
        var o = n.builtInTypes.object;
        var u = n.builtInTypes.array;
        var l = n.builtInTypes.function;
        var c = r(47).Patcher;
        var h = r(22).normalize;
        var p = r(14).fromString;
        var f = r(45).attach;
        var d = r(9);
        t.parse = function e(t, i) {
            i = h(i);
            var n = p(t, i);
            var s = n.toString({
                tabWidth: i.tabWidth,
                reuseWhitespace: false,
                useTabs: false
            });
            var o = [];
            var u = i.parser.parse(s, {
                jsx: true,
                loc: true,
                locations: true,
                range: i.range,
                comment: true,
                onComment: o,
                tolerant: d.getOption(i, "tolerant", true),
                ecmaVersion: 6,
                sourceType: d.getOption(i, "sourceType", "module")
            });
            var l = Array.isArray(u.tokens) ? u.tokens : r(43).tokenize(s, {
                loc: true
            });
            delete u.tokens;
            l.forEach(function(e) {
                if (typeof e.value !== "string") {
                    e.value = n.sliceString(e.loc.start, e.loc.end);
                }
            });
            if (Array.isArray(u.comments)) {
                o = u.comments;
                delete u.comments;
            }
            if (u.loc) {
                d.fixFaultyLocations(u, n);
            } else {
                u.loc = {
                    start: n.firstPos(),
                    end: n.lastPos()
                };
            }
            u.loc.lines = n;
            u.loc.indent = 0;
            var c = void 0;
            var v = void 0;
            if (u.type === "Program") {
                v = u;
                c = a.file(u, i.sourceFileName || null);
                c.loc = {
                    start: n.firstPos(),
                    end: n.lastPos(),
                    lines: n,
                    indent: 0
                };
            } else if (u.type === "File") {
                c = u;
                v = c.program;
            }
            if (i.tokens) {
                c.tokens = l;
            }
            var y = d.getTrueLoc({
                type: v.type,
                loc: v.loc,
                body: [],
                comments: o
            }, n);
            v.loc.start = y.start;
            v.loc.end = y.end;
            f(o, v.body.length ? c.program : c, n);
            return new m(n, l).copy(c);
        };
        function m(e, t) {
            i.ok(this instanceof m);
            this.lines = e;
            this.tokens = t;
            this.startTokenIndex = 0;
            this.endTokenIndex = t.length;
            this.indent = 0;
            this.seen = new Map();
        }
        var v = m.prototype;
        v.copy = function(e) {
            if (this.seen.has(e)) {
                return this.seen.get(e);
            }
            if (u.check(e)) {
                var t = new Array(e.length);
                this.seen.set(e, t);
                e.forEach(function(e, r) {
                    t[r] = this.copy(e);
                }, this);
                return t;
            }
            if (!o.check(e)) {
                return e;
            }
            d.fixFaultyLocations(e, this.lines);
            var t = Object.create(Object.getPrototypeOf(e), {
                original: {
                    value: e,
                    configurable: false,
                    enumerable: false,
                    writable: true
                }
            });
            this.seen.set(e, t);
            var r = e.loc;
            var i = this.indent;
            var n = i;
            var s = this.startTokenIndex;
            var a = this.endTokenIndex;
            if (r) {
                if (e.type === "Block" || e.type === "Line" || e.type === "CommentBlock" || e.type === "CommentLine" || this.lines.isPrecededOnlyByWhitespace(r.start)) {
                    n = this.indent = r.start.column;
                }
                r.lines = this.lines;
                r.tokens = this.tokens;
                r.indent = n;
                this.findTokenRange(r);
            }
            var l = Object.keys(e);
            var c = l.length;
            for (var h = 0; h < c; ++h) {
                var p = l[h];
                if (p === "loc") {
                    t[p] = e[p];
                } else if (p === "tokens" && e.type === "File") {
                    t[p] = e[p];
                } else {
                    t[p] = this.copy(e[p]);
                }
            }
            this.indent = i;
            this.startTokenIndex = s;
            this.endTokenIndex = a;
            return t;
        };
        v.findTokenRange = function(e) {
            while (this.startTokenIndex > 0) {
                var t = e.tokens[this.startTokenIndex];
                if (d.comparePos(e.start, t.loc.start) < 0) {
                    --this.startTokenIndex;
                } else break;
            }
            while (this.endTokenIndex < e.tokens.length) {
                var r = e.tokens[this.endTokenIndex];
                if (d.comparePos(r.loc.end, e.end) < 0) {
                    ++this.endTokenIndex;
                } else break;
            }
            while (this.startTokenIndex < this.endTokenIndex) {
                var i = e.tokens[this.startTokenIndex];
                if (d.comparePos(i.loc.start, e.start) < 0) {
                    ++this.startTokenIndex;
                } else break;
            }
            e.start.token = this.startTokenIndex;
            while (this.endTokenIndex > this.startTokenIndex) {
                var n = e.tokens[this.endTokenIndex - 1];
                if (d.comparePos(e.end, n.loc.end) < 0) {
                    --this.endTokenIndex;
                } else break;
            }
            e.end.token = this.endTokenIndex;
        };
    }, function(e, t, r) {
        "use strict";
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        var n = Object.assign || function(e) {
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
        var s = r(8);
        var a = r(23);
        var o = r(45).printComments;
        var u = r(14);
        var l = u.fromString;
        var c = u.concat;
        var h = r(22).normalize;
        var f = r(47).getReprinter;
        var d = r(6);
        var m = d.namedTypes;
        var v = d.builtInTypes.string;
        var y = d.builtInTypes.object;
        var x = r(46);
        var g = r(9);
        function b(e, t) {
            s.ok(this instanceof b);
            v.assert(e);
            this.code = e;
            if (t) {
                y.assert(t);
                this.map = t;
            }
        }
        var E = b.prototype;
        var S = false;
        E.toString = function() {
            if (!S) {
                console.warn("Deprecation warning: recast.print now returns an object with " + "a .code property. You appear to be treating the object as a " + "string, which might still work but is strongly discouraged.");
                S = true;
            }
            return this.code;
        };
        var D = new b("");
        function C(e) {
            s.ok(this instanceof C);
            var t = e && e.tabWidth;
            e = h(e);
            e.sourceFileName = null;
            function r(e, t) {
                e = n({}, e, t);
                return function(t) {
                    return i(t, e);
                };
            }
            function i(n, a) {
                s.ok(n instanceof x);
                a = a || {};
                if (a.includeComments) {
                    return o(n, r(a, {
                        includeComments: false
                    }));
                }
                var u = e.tabWidth;
                if (!t) {
                    var l = n.getNode().loc;
                    if (l && l.lines && l.lines.guessTabWidth) {
                        e.tabWidth = l.lines.guessTabWidth();
                    }
                }
                var c = f(n);
                var h = c ? c(i) : A(n, e, a, r(a, {
                    includeComments: true,
                    avoidRootParens: false
                }));
                e.tabWidth = u;
                return h;
            }
            this.print = function(t) {
                if (!t) {
                    return D;
                }
                var r = i(x.from(t), {
                    includeComments: true,
                    avoidRootParens: false
                });
                return new b(r.toString(e), g.composeSourceMaps(e.inputSourceMap, r.getSourceMap(e.sourceMapName, e.sourceRoot)));
            };
            this.printGenerically = function(t) {
                if (!t) {
                    return D;
                }
                function r(t) {
                    return o(t, function(t) {
                        return A(t, e, {
                            includeComments: true,
                            avoidRootParens: false
                        }, r);
                    });
                }
                var i = x.from(t);
                var n = e.reuseWhitespace;
                e.reuseWhitespace = false;
                var s = new b(r(i).toString(e));
                e.reuseWhitespace = n;
                return s;
            };
        }
        t.Printer = C;
        function A(e, t, r, i) {
            s.ok(e instanceof x);
            var n = e.getValue();
            var a = [];
            var o = k(e, t, i);
            if (!n || o.isEmpty()) {
                return o;
            }
            var u = false;
            var l = w(e, i);
            if (l.isEmpty()) {
                if (!r.avoidRootParens) {
                    u = e.needsParens();
                }
            } else {
                a.push(l);
            }
            if (u) {
                a.unshift("(");
            }
            a.push(o);
            if (u) {
                a.push(")");
            }
            return c(a);
        }
        function k(e, t, r) {
            var n = e.getValue();
            if (!n) {
                return l("");
            }
            if (typeof n === "string") {
                return l(n, t);
            }
            m.Printable.assert(n);
            var a = [];
            switch (n.type) {
              case "File":
                return e.call(r, "program");

              case "Program":
                if (n.directives) {
                    e.each(function(e) {
                        a.push(r(e), ";\n");
                    }, "directives");
                }
                a.push(e.call(function(e) {
                    return T(e, t, r);
                }, "body"));
                return c(a);

              case "Noop":
              case "EmptyStatement":
                return l("");

              case "ExpressionStatement":
                return c([ e.call(r, "expression"), ";" ]);

              case "ParenthesizedExpression":
                return c([ "(", e.call(r, "expression"), ")" ]);

              case "BinaryExpression":
              case "LogicalExpression":
              case "AssignmentExpression":
                return l(" ").join([ e.call(r, "left"), n.operator, e.call(r, "right") ]);

              case "AssignmentPattern":
                return c([ e.call(r, "left"), " = ", e.call(r, "right") ]);

              case "MemberExpression":
              case "OptionalMemberExpression":
                a.push(e.call(r, "object"));
                var o = e.call(r, "property");
                var u = n.type === "OptionalMemberExpression";
                if (n.computed) {
                    a.push(u ? "?.[" : "[", o, "]");
                } else {
                    a.push(u ? "?." : ".", o);
                }
                return c(a);

              case "MetaProperty":
                return c([ e.call(r, "meta"), ".", e.call(r, "property") ]);

              case "BindExpression":
                if (n.object) {
                    a.push(e.call(r, "object"));
                }
                a.push("::", e.call(r, "callee"));
                return c(a);

              case "Path":
                return l(".").join(n.body);

              case "Identifier":
                return c([ l(n.name, t), n.optional ? "?" : "", e.call(r, "typeAnnotation") ]);

              case "SpreadElement":
              case "SpreadElementPattern":
              case "RestProperty":
              case "SpreadProperty":
              case "SpreadPropertyPattern":
              case "ObjectTypeSpreadProperty":
              case "RestElement":
                return c([ "...", e.call(r, "argument"), e.call(r, "typeAnnotation") ]);

              case "FunctionDeclaration":
              case "FunctionExpression":
              case "TSDeclareFunction":
                if (n.declare) {
                    a.push("declare ");
                }
                if (n.async) {
                    a.push("async ");
                }
                a.push("function");
                if (n.generator) a.push("*");
                if (n.id) {
                    a.push(" ", e.call(r, "id"), e.call(r, "typeParameters"));
                }
                a.push("(", I(e, t, r), ")", e.call(r, "returnType"));
                if (n.body) {
                    a.push(" ", e.call(r, "body"));
                }
                return c(a);

              case "ArrowFunctionExpression":
                if (n.async) {
                    a.push("async ");
                }
                if (n.typeParameters) {
                    a.push(e.call(r, "typeParameters"));
                }
                if (!t.arrowParensAlways && n.params.length === 1 && !n.rest && n.params[0].type === "Identifier" && !n.params[0].typeAnnotation && !n.returnType) {
                    a.push(e.call(r, "params", 0));
                } else {
                    a.push("(", I(e, t, r), ")", e.call(r, "returnType"));
                }
                a.push(" => ", e.call(r, "body"));
                return c(a);

              case "MethodDefinition":
                return P(e, t, r);

              case "YieldExpression":
                a.push("yield");
                if (n.delegate) a.push("*");
                if (n.argument) a.push(" ", e.call(r, "argument"));
                return c(a);

              case "AwaitExpression":
                a.push("await");
                if (n.all) a.push("*");
                if (n.argument) a.push(" ", e.call(r, "argument"));
                return c(a);

              case "ModuleDeclaration":
                a.push("module", e.call(r, "id"));
                if (n.source) {
                    s.ok(!n.body);
                    a.push("from", e.call(r, "source"));
                } else {
                    a.push(e.call(r, "body"));
                }
                return l(" ").join(a);

              case "ImportSpecifier":
                if (n.importKind && n.importKind !== "value") {
                    a.push(n.importKind + " ");
                }
                if (n.imported) {
                    a.push(e.call(r, "imported"));
                    if (n.local && n.local.name !== n.imported.name) {
                        a.push(" as ", e.call(r, "local"));
                    }
                } else if (n.id) {
                    a.push(e.call(r, "id"));
                    if (n.name) {
                        a.push(" as ", e.call(r, "name"));
                    }
                }
                return c(a);

              case "ExportSpecifier":
                if (n.local) {
                    a.push(e.call(r, "local"));
                    if (n.exported && n.exported.name !== n.local.name) {
                        a.push(" as ", e.call(r, "exported"));
                    }
                } else if (n.id) {
                    a.push(e.call(r, "id"));
                    if (n.name) {
                        a.push(" as ", e.call(r, "name"));
                    }
                }
                return c(a);

              case "ExportBatchSpecifier":
                return l("*");

              case "ImportNamespaceSpecifier":
                a.push("* as ");
                if (n.local) {
                    a.push(e.call(r, "local"));
                } else if (n.id) {
                    a.push(e.call(r, "id"));
                }
                return c(a);

              case "ImportDefaultSpecifier":
                if (n.local) {
                    return e.call(r, "local");
                }
                return e.call(r, "id");

              case "TSExportAssignment":
                return c([ "export = ", e.call(r, "expression") ]);

              case "ExportDeclaration":
              case "ExportDefaultDeclaration":
              case "ExportNamedDeclaration":
                return _(e, t, r);

              case "ExportAllDeclaration":
                a.push("export *");
                if (n.exported) {
                    a.push(" as ", e.call(r, "exported"));
                }
                a.push(" from ", e.call(r, "source"));
                return c(a);

              case "TSNamespaceExportDeclaration":
                a.push("export as namespace ", e.call(r, "id"));
                return V(c(a));

              case "ExportNamespaceSpecifier":
                return c([ "* as ", e.call(r, "exported") ]);

              case "ExportDefaultSpecifier":
                return e.call(r, "exported");

              case "Import":
                return l("import", t);

              case "ImportDeclaration":
                {
                    a.push("import ");
                    if (n.importKind && n.importKind !== "value") {
                        a.push(n.importKind + " ");
                    }
                    if (n.specifiers && n.specifiers.length > 0) {
                        var h = [];
                        var f = [];
                        e.each(function(e) {
                            var t = e.getValue();
                            if (t.type === "ImportSpecifier") {
                                f.push(r(e));
                            } else if (t.type === "ImportDefaultSpecifier" || t.type === "ImportNamespaceSpecifier") {
                                h.push(r(e));
                            }
                        }, "specifiers");
                        h.forEach(function(e, t) {
                            if (t > 0) {
                                a.push(", ");
                            }
                            a.push(e);
                        });
                        if (f.length > 0) {
                            var d = l(", ").join(f);
                            if (d.getLineLength(1) > t.wrapColumn) {
                                d = c([ l(",\n").join(f).indent(t.tabWidth), "," ]);
                            }
                            if (h.length > 0) {
                                a.push(", ");
                            }
                            if (d.length > 1) {
                                a.push("{\n", d, "\n}");
                            } else if (t.objectCurlySpacing) {
                                a.push("{ ", d, " }");
                            } else {
                                a.push("{", d, "}");
                            }
                        }
                        a.push(" from ");
                    }
                    a.push(e.call(r, "source"), ";");
                    return c(a);
                }

              case "BlockStatement":
                var v = e.call(function(e) {
                    return T(e, t, r);
                }, "body");
                if (v.isEmpty()) {
                    if (!n.directives || n.directives.length === 0) {
                        return l("{}");
                    }
                }
                a.push("{\n");
                if (n.directives) {
                    e.each(function(e) {
                        a.push(r(e).indent(t.tabWidth), ";", n.directives.length > 1 || !v.isEmpty() ? "\n" : "");
                    }, "directives");
                }
                a.push(v.indent(t.tabWidth));
                a.push("\n}");
                return c(a);

              case "ReturnStatement":
                a.push("return");
                if (n.argument) {
                    var y = e.call(r, "argument");
                    if (y.startsWithComment() || y.length > 1 && m.JSXElement && m.JSXElement.check(n.argument)) {
                        a.push(" (\n", y.indent(t.tabWidth), "\n)");
                    } else {
                        a.push(" ", y);
                    }
                }
                a.push(";");
                return c(a);

              case "CallExpression":
              case "OptionalCallExpression":
                var a = [ e.call(r, "callee") ];
                if (n.type === "OptionalCallExpression" && n.callee.type !== "OptionalMemberExpression") {
                    a.push("?.");
                }
                a.push(N(e, t, r));
                return c(a);

              case "ObjectExpression":
              case "ObjectPattern":
              case "ObjectTypeAnnotation":
                var x = false;
                var b = n.type === "ObjectTypeAnnotation";
                var E = t.flowObjectCommas ? "," : b ? ";" : ",";
                var S = [];
                if (b) {
                    S.push("indexers", "callProperties");
                }
                S.push("properties");
                var D = 0;
                S.forEach(function(e) {
                    D += n[e].length;
                });
                var C = b && D === 1 || D === 0;
                var A = n.exact ? "{|" : "{";
                var k = n.exact ? "|}" : "}";
                a.push(C ? A : A + "\n");
                var w = a.length - 1;
                var F = 0;
                S.forEach(function(i) {
                    e.each(function(e) {
                        var i = r(e);
                        if (!C) {
                            i = i.indent(t.tabWidth);
                        }
                        var n = !b && i.length > 1;
                        if (n && x) {
                            a.push("\n");
                        }
                        a.push(i);
                        if (F < D - 1) {
                            a.push(E + (n ? "\n\n" : "\n"));
                            x = !n;
                        } else if (D !== 1 && b) {
                            a.push(E);
                        } else if (!C && g.isTrailingCommaEnabled(t, "objects")) {
                            a.push(E);
                        }
                        F++;
                    }, i);
                });
                a.push(C ? k : "\n" + k);
                if (F !== 0 && C && t.objectCurlySpacing) {
                    a[w] = A + " ";
                    a[a.length - 1] = " " + k;
                }
                if (n.typeAnnotation) {
                    a.push(e.call(r, "typeAnnotation"));
                }
                return c(a);

              case "PropertyPattern":
                return c([ e.call(r, "key"), ": ", e.call(r, "pattern") ]);

              case "ObjectProperty":
              case "Property":
                if (n.method || n.kind === "get" || n.kind === "set") {
                    return P(e, t, r);
                }
                var O = e.call(r, "key");
                if (n.computed) {
                    a.push("[", O, "]");
                } else {
                    a.push(O);
                }
                if (!n.shorthand) {
                    a.push(": ", e.call(r, "value"));
                }
                return c(a);

              case "ClassMethod":
              case "ObjectMethod":
              case "TSDeclareMethod":
                return P(e, t, r);

              case "Decorator":
                return c([ "@", e.call(r, "expression") ]);

              case "ArrayExpression":
              case "ArrayPattern":
                var R = n.elements, D = R.length;
                var U = e.map(r, "elements");
                var J = l(", ").join(U);
                var C = J.getLineLength(1) <= t.wrapColumn;
                if (C) {
                    if (t.arrayBracketSpacing) {
                        a.push("[ ");
                    } else {
                        a.push("[");
                    }
                } else {
                    a.push("[\n");
                }
                e.each(function(e) {
                    var r = e.getName();
                    var i = e.getValue();
                    if (!i) {
                        a.push(",");
                    } else {
                        var n = U[r];
                        if (C) {
                            if (r > 0) a.push(" ");
                        } else {
                            n = n.indent(t.tabWidth);
                        }
                        a.push(n);
                        if (r < D - 1 || !C && g.isTrailingCommaEnabled(t, "arrays")) a.push(",");
                        if (!C) a.push("\n");
                    }
                }, "elements");
                if (C && t.arrayBracketSpacing) {
                    a.push(" ]");
                } else {
                    a.push("]");
                }
                return c(a);

              case "SequenceExpression":
                return l(", ").join(e.map(r, "expressions"));

              case "ThisExpression":
                return l("this");

              case "Super":
                return l("super");

              case "NullLiteral":
                return l("null");

              case "RegExpLiteral":
                return l(n.extra.raw);

              case "BigIntLiteral":
                return l(n.value + "n");

              case "NumericLiteral":
                if (n.extra && typeof n.extra.raw === "string" && Number(n.extra.raw) === n.value) {
                    return l(n.extra.raw, t);
                }
                return l(n.value, t);

              case "BooleanLiteral":
              case "StringLiteral":
              case "Literal":
                if (typeof n.value === "number" && typeof n.raw === "string" && Number(n.raw) === n.value) {
                    return l(n.raw, t);
                }
                if (typeof n.value !== "string") {
                    return l(n.value, t);
                }
                return l(X(n.value, t), t);

              case "Directive":
                return e.call(r, "value");

              case "DirectiveLiteral":
                return l(X(n.value, t));

              case "ModuleSpecifier":
                if (n.local) {
                    throw new Error("The ESTree ModuleSpecifier type should be abstract");
                }
                return l(X(n.value, t), t);

              case "UnaryExpression":
                a.push(n.operator);
                if (/[a-z]$/.test(n.operator)) a.push(" ");
                a.push(e.call(r, "argument"));
                return c(a);

              case "UpdateExpression":
                a.push(e.call(r, "argument"), n.operator);
                if (n.prefix) a.reverse();
                return c(a);

              case "ConditionalExpression":
                return c([ e.call(r, "test"), " ? ", e.call(r, "consequent"), " : ", e.call(r, "alternate") ]);

              case "NewExpression":
                a.push("new ", e.call(r, "callee"));
                var z = n.arguments;
                if (z) {
                    a.push(N(e, t, r));
                }
                return c(a);

              case "VariableDeclaration":
                if (n.declare) {
                    a.push("declare ");
                }
                a.push(n.kind, " ");
                var q = 0;
                var U = e.map(function(e) {
                    var t = r(e);
                    q = Math.max(t.length, q);
                    return t;
                }, "declarations");
                if (q === 1) {
                    a.push(l(", ").join(U));
                } else if (U.length > 1) {
                    a.push(l(",\n").join(U).indentTail(n.kind.length + 1));
                } else {
                    a.push(U[0]);
                }
                var W = e.getParentNode();
                if (!m.ForStatement.check(W) && !m.ForInStatement.check(W) && !(m.ForOfStatement && m.ForOfStatement.check(W)) && !(m.ForAwaitStatement && m.ForAwaitStatement.check(W))) {
                    a.push(";");
                }
                return c(a);

              case "VariableDeclarator":
                return n.init ? l(" = ").join([ e.call(r, "id"), e.call(r, "init") ]) : e.call(r, "id");

              case "WithStatement":
                return c([ "with (", e.call(r, "object"), ") ", e.call(r, "body") ]);

              case "IfStatement":
                var K = M(e.call(r, "consequent"), t), a = [ "if (", e.call(r, "test"), ")", K ];
                if (n.alternate) a.push(j(K) ? " else" : "\nelse", M(e.call(r, "alternate"), t));
                return c(a);

              case "ForStatement":
                var G = e.call(r, "init"), H = G.length > 1 ? ";\n" : "; ", Y = "for (", $ = l(H).join([ G, e.call(r, "test"), e.call(r, "update") ]).indentTail(Y.length), Q = c([ Y, $, ")" ]), Z = M(e.call(r, "body"), t), a = [ Q ];
                if (Q.length > 1) {
                    a.push("\n");
                    Z = Z.trimLeft();
                }
                a.push(Z);
                return c(a);

              case "WhileStatement":
                return c([ "while (", e.call(r, "test"), ")", M(e.call(r, "body"), t) ]);

              case "ForInStatement":
                return c([ n.each ? "for each (" : "for (", e.call(r, "left"), " in ", e.call(r, "right"), ")", M(e.call(r, "body"), t) ]);

              case "ForOfStatement":
              case "ForAwaitStatement":
                a.push("for ");
                if (n.await || n.type === "ForAwaitStatement") {
                    a.push("await ");
                }
                a.push("(", e.call(r, "left"), " of ", e.call(r, "right"), ")", M(e.call(r, "body"), t));
                return c(a);

              case "DoWhileStatement":
                var ee = c([ "do", M(e.call(r, "body"), t) ]), a = [ ee ];
                if (j(ee)) a.push(" while"); else a.push("\nwhile");
                a.push(" (", e.call(r, "test"), ");");
                return c(a);

              case "DoExpression":
                var te = e.call(function(e) {
                    return T(e, t, r);
                }, "body");
                return c([ "do {\n", te.indent(t.tabWidth), "\n}" ]);

              case "BreakStatement":
                a.push("break");
                if (n.label) a.push(" ", e.call(r, "label"));
                a.push(";");
                return c(a);

              case "ContinueStatement":
                a.push("continue");
                if (n.label) a.push(" ", e.call(r, "label"));
                a.push(";");
                return c(a);

              case "LabeledStatement":
                return c([ e.call(r, "label"), ":\n", e.call(r, "body") ]);

              case "TryStatement":
                a.push("try ", e.call(r, "block"));
                if (n.handler) {
                    a.push(" ", e.call(r, "handler"));
                } else if (n.handlers) {
                    e.each(function(e) {
                        a.push(" ", r(e));
                    }, "handlers");
                }
                if (n.finalizer) {
                    a.push(" finally ", e.call(r, "finalizer"));
                }
                return c(a);

              case "CatchClause":
                a.push("catch ");
                if (n.param) {
                    a.push("(", e.call(r, "param"));
                }
                if (n.guard) {
                    a.push(" if ", e.call(r, "guard"));
                }
                if (n.param) {
                    a.push(") ");
                }
                a.push(e.call(r, "body"));
                return c(a);

              case "ThrowStatement":
                return c([ "throw ", e.call(r, "argument"), ";" ]);

              case "SwitchStatement":
                return c([ "switch (", e.call(r, "discriminant"), ") {\n", l("\n").join(e.map(r, "cases")), "\n}" ]);

              case "SwitchCase":
                if (n.test) a.push("case ", e.call(r, "test"), ":"); else a.push("default:");
                if (n.consequent.length > 0) {
                    a.push("\n", e.call(function(e) {
                        return T(e, t, r);
                    }, "consequent").indent(t.tabWidth));
                }
                return c(a);

              case "DebuggerStatement":
                return l("debugger;");

              case "JSXAttribute":
                a.push(e.call(r, "name"));
                if (n.value) a.push("=", e.call(r, "value"));
                return c(a);

              case "JSXIdentifier":
                return l(n.name, t);

              case "JSXNamespacedName":
                return l(":").join([ e.call(r, "namespace"), e.call(r, "name") ]);

              case "JSXMemberExpression":
                return l(".").join([ e.call(r, "object"), e.call(r, "property") ]);

              case "JSXSpreadAttribute":
                return c([ "{...", e.call(r, "argument"), "}" ]);

              case "JSXSpreadChild":
                return c([ "{...", e.call(r, "expression"), "}" ]);

              case "JSXExpressionContainer":
                return c([ "{", e.call(r, "expression"), "}" ]);

              case "JSXElement":
              case "JSXFragment":
                var re = "opening" + (n.type === "JSXElement" ? "Element" : "Fragment");
                var ie = "closing" + (n.type === "JSXElement" ? "Element" : "Fragment");
                var ne = e.call(r, re);
                if (n[re].selfClosing) {
                    s.ok(!n[ie], "unexpected " + ie + " element in self-closing " + n.type);
                    return ne;
                }
                var se = c(e.map(function(e) {
                    var t = e.getValue();
                    if (m.Literal.check(t) && typeof t.value === "string") {
                        if (/\S/.test(t.value)) {
                            return t.value.replace(/^\s+|\s+$/g, "");
                        } else if (/\n/.test(t.value)) {
                            return "\n";
                        }
                    }
                    return r(e);
                }, "children")).indentTail(t.tabWidth);
                var ae = e.call(r, ie);
                return c([ ne, se, ae ]);

              case "JSXOpeningElement":
                a.push("<", e.call(r, "name"));
                var oe = [];
                e.each(function(e) {
                    oe.push(" ", r(e));
                }, "attributes");
                var ue = c(oe);
                var le = ue.length > 1 || ue.getLineLength(1) > t.wrapColumn;
                if (le) {
                    oe.forEach(function(e, t) {
                        if (e === " ") {
                            s.strictEqual(t % 2, 0);
                            oe[t] = "\n";
                        }
                    });
                    ue = c(oe).indentTail(t.tabWidth);
                }
                a.push(ue, n.selfClosing ? " />" : ">");
                return c(a);

              case "JSXClosingElement":
                return c([ "</", e.call(r, "name"), ">" ]);

              case "JSXOpeningFragment":
                return l("<>");

              case "JSXClosingFragment":
                return l("</>");

              case "JSXText":
                return l(n.value, t);

              case "JSXEmptyExpression":
                return l("");

              case "TypeAnnotatedIdentifier":
                return c([ e.call(r, "annotation"), " ", e.call(r, "identifier") ]);

              case "ClassBody":
                if (n.body.length === 0) {
                    return l("{}");
                }
                return c([ "{\n", e.call(function(e) {
                    return T(e, t, r);
                }, "body").indent(t.tabWidth), "\n}" ]);

              case "ClassPropertyDefinition":
                a.push("static ", e.call(r, "definition"));
                if (!m.MethodDefinition.check(n.definition)) a.push(";");
                return c(a);

              case "ClassProperty":
                if (typeof n.accessibility === "string") {
                    a.push(n.accessibility, " ");
                }
                if (n.static) {
                    a.push("static ");
                }
                if (n.abstract) {
                    a.push("abstract ");
                }
                if (n.readonly) {
                    a.push("readonly ");
                }
                var O = e.call(r, "key");
                if (n.computed) {
                    O = c([ "[", O, "]" ]);
                }
                if (n.variance) {
                    O = c([ L(e, r), O ]);
                }
                a.push(O);
                if (n.optional) {
                    a.push("?");
                }
                if (n.typeAnnotation) {
                    a.push(e.call(r, "typeAnnotation"));
                }
                if (n.value) {
                    a.push(" = ", e.call(r, "value"));
                }
                a.push(";");
                return c(a);

              case "ClassDeclaration":
              case "ClassExpression":
                if (n.declare) {
                    a.push("declare ");
                }
                if (n.abstract) {
                    a.push("abstract ");
                }
                a.push("class");
                if (n.id) {
                    a.push(" ", e.call(r, "id"));
                }
                if (n.typeParameters) {
                    a.push(e.call(r, "typeParameters"));
                }
                if (n.superClass) {
                    a.push(" extends ", e.call(r, "superClass"), e.call(r, "superTypeParameters"));
                }
                if (n["implements"] && n["implements"].length > 0) {
                    a.push(" implements ", l(", ").join(e.map(r, "implements")));
                }
                a.push(" ", e.call(r, "body"));
                return c(a);

              case "TemplateElement":
                return l(n.value.raw, t).lockIndentTail();

              case "TemplateLiteral":
                var ce = e.map(r, "expressions");
                a.push("`");
                e.each(function(e) {
                    var t = e.getName();
                    a.push(r(e));
                    if (t < ce.length) {
                        a.push("${", ce[t], "}");
                    }
                }, "quasis");
                a.push("`");
                return c(a).lockIndentTail();

              case "TaggedTemplateExpression":
                return c([ e.call(r, "tag"), e.call(r, "quasi") ]);

              case "Node":
              case "Printable":
              case "SourceLocation":
              case "Position":
              case "Statement":
              case "Function":
              case "Pattern":
              case "Expression":
              case "Declaration":
              case "Specifier":
              case "NamedSpecifier":
              case "Comment":
              case "Flow":
              case "FlowType":
              case "FlowPredicate":
              case "MemberTypeAnnotation":
              case "Type":
              case "TSHasOptionalTypeParameters":
              case "TSHasOptionalTypeAnnotation":
                throw new Error("unprintable type: " + JSON.stringify(n.type));

              case "CommentBlock":
              case "Block":
                return c([ "/*", l(n.value, t), "*/" ]);

              case "CommentLine":
              case "Line":
                return c([ "//", l(n.value, t) ]);

              case "TypeAnnotation":
                if (n.typeAnnotation) {
                    if (n.typeAnnotation.type !== "FunctionTypeAnnotation") {
                        a.push(": ");
                    }
                    a.push(e.call(r, "typeAnnotation"));
                    return c(a);
                }
                return l("");

              case "ExistentialTypeParam":
              case "ExistsTypeAnnotation":
                return l("*", t);

              case "EmptyTypeAnnotation":
                return l("empty", t);

              case "AnyTypeAnnotation":
                return l("any", t);

              case "MixedTypeAnnotation":
                return l("mixed", t);

              case "ArrayTypeAnnotation":
                return c([ e.call(r, "elementType"), "[]" ]);

              case "TupleTypeAnnotation":
                var U = e.map(r, "types");
                var J = l(", ").join(U);
                var C = J.getLineLength(1) <= t.wrapColumn;
                if (C) {
                    if (t.arrayBracketSpacing) {
                        a.push("[ ");
                    } else {
                        a.push("[");
                    }
                } else {
                    a.push("[\n");
                }
                e.each(function(e) {
                    var r = e.getName();
                    var i = e.getValue();
                    if (!i) {
                        a.push(",");
                    } else {
                        var s = U[r];
                        if (C) {
                            if (r > 0) a.push(" ");
                        } else {
                            s = s.indent(t.tabWidth);
                        }
                        a.push(s);
                        if (r < n.types.length - 1 || !C && g.isTrailingCommaEnabled(t, "arrays")) a.push(",");
                        if (!C) a.push("\n");
                    }
                }, "types");
                if (C && t.arrayBracketSpacing) {
                    a.push(" ]");
                } else {
                    a.push("]");
                }
                return c(a);

              case "BooleanTypeAnnotation":
                return l("boolean", t);

              case "BooleanLiteralTypeAnnotation":
                s.strictEqual(i(n.value), "boolean");
                return l("" + n.value, t);

              case "DeclareClass":
                return B(e, [ "class ", e.call(r, "id"), " ", e.call(r, "body") ]);

              case "DeclareFunction":
                return B(e, [ "function ", e.call(r, "id"), ";" ]);

              case "DeclareModule":
                return B(e, [ "module ", e.call(r, "id"), " ", e.call(r, "body") ]);

              case "DeclareModuleExports":
                return B(e, [ "module.exports", e.call(r, "typeAnnotation") ]);

              case "DeclareVariable":
                return B(e, [ "var ", e.call(r, "id"), ";" ]);

              case "DeclareExportDeclaration":
              case "DeclareExportAllDeclaration":
                return c([ "declare ", _(e, t, r) ]);

              case "InferredPredicate":
                return l("%checks", t);

              case "DeclaredPredicate":
                return c([ "%checks(", e.call(r, "value"), ")" ]);

              case "FunctionTypeAnnotation":
                var he = e.getParentNode(0);
                var pe = !(m.ObjectTypeCallProperty.check(he) || m.DeclareFunction.check(e.getParentNode(2)));
                var fe = pe && !m.FunctionTypeParam.check(he);
                if (fe) {
                    a.push(": ");
                }
                a.push("(", l(", ").join(e.map(r, "params")), ")");
                if (n.returnType) {
                    a.push(pe ? " => " : ": ", e.call(r, "returnType"));
                }
                return c(a);

              case "FunctionTypeParam":
                return c([ e.call(r, "name"), n.optional ? "?" : "", ": ", e.call(r, "typeAnnotation") ]);

              case "GenericTypeAnnotation":
                return c([ e.call(r, "id"), e.call(r, "typeParameters") ]);

              case "DeclareInterface":
                a.push("declare ");

              case "InterfaceDeclaration":
              case "TSInterfaceDeclaration":
                if (n.declare) {
                    a.push("declare ");
                }
                a.push("interface ", e.call(r, "id"), e.call(r, "typeParameters"), " ");
                if (n["extends"] && n["extends"].length > 0) {
                    a.push("extends ", l(", ").join(e.map(r, "extends")), " ");
                }
                if (n.body) {
                    a.push(e.call(r, "body"));
                }
                return c(a);

              case "ClassImplements":
              case "InterfaceExtends":
                return c([ e.call(r, "id"), e.call(r, "typeParameters") ]);

              case "IntersectionTypeAnnotation":
                return l(" & ").join(e.map(r, "types"));

              case "NullableTypeAnnotation":
                return c([ "?", e.call(r, "typeAnnotation") ]);

              case "NullLiteralTypeAnnotation":
                return l("null", t);

              case "ThisTypeAnnotation":
                return l("this", t);

              case "NumberTypeAnnotation":
                return l("number", t);

              case "ObjectTypeCallProperty":
                return e.call(r, "value");

              case "ObjectTypeIndexer":
                return c([ L(e, r), "[", e.call(r, "id"), ": ", e.call(r, "key"), "]: ", e.call(r, "value") ]);

              case "ObjectTypeProperty":
                return c([ L(e, r), e.call(r, "key"), n.optional ? "?" : "", ": ", e.call(r, "value") ]);

              case "QualifiedTypeIdentifier":
                return c([ e.call(r, "qualification"), ".", e.call(r, "id") ]);

              case "StringLiteralTypeAnnotation":
                return l(X(n.value, t), t);

              case "NumberLiteralTypeAnnotation":
              case "NumericLiteralTypeAnnotation":
                s.strictEqual(i(n.value), "number");
                return l(JSON.stringify(n.value), t);

              case "StringTypeAnnotation":
                return l("string", t);

              case "DeclareTypeAlias":
                a.push("declare ");

              case "TypeAlias":
                return c([ "type ", e.call(r, "id"), e.call(r, "typeParameters"), " = ", e.call(r, "right"), ";" ]);

              case "DeclareOpaqueType":
                a.push("declare ");

              case "OpaqueType":
                a.push("opaque type ", e.call(r, "id"), e.call(r, "typeParameters"));
                if (n["supertype"]) {
                    a.push(": ", e.call(r, "supertype"));
                }
                if (n["impltype"]) {
                    a.push(" = ", e.call(r, "impltype"));
                }
                a.push(";");
                return c(a);

              case "TypeCastExpression":
                return c([ "(", e.call(r, "expression"), e.call(r, "typeAnnotation"), ")" ]);

              case "TypeParameterDeclaration":
              case "TypeParameterInstantiation":
                return c([ "<", l(", ").join(e.map(r, "params")), ">" ]);

              case "Variance":
                if (n.kind === "plus") {
                    return l("+");
                }
                if (n.kind === "minus") {
                    return l("-");
                }
                return l("");

              case "TypeParameter":
                if (n.variance) {
                    a.push(L(e, r));
                }
                a.push(e.call(r, "name"));
                if (n.bound) {
                    a.push(e.call(r, "bound"));
                }
                if (n["default"]) {
                    a.push("=", e.call(r, "default"));
                }
                return c(a);

              case "TypeofTypeAnnotation":
                return c([ l("typeof ", t), e.call(r, "argument") ]);

              case "UnionTypeAnnotation":
                return l(" | ").join(e.map(r, "types"));

              case "VoidTypeAnnotation":
                return l("void", t);

              case "NullTypeAnnotation":
                return l("null", t);

              case "TSType":
                throw new Error("unprintable type: " + JSON.stringify(n.type));

              case "TSNumberKeyword":
                return l("number", t);

              case "TSObjectKeyword":
                return l("object", t);

              case "TSBooleanKeyword":
                return l("boolean", t);

              case "TSStringKeyword":
                return l("string", t);

              case "TSSymbolKeyword":
                return l("symbol", t);

              case "TSAnyKeyword":
                return l("any", t);

              case "TSVoidKeyword":
                return l("void", t);

              case "TSThisType":
                return l("this", t);

              case "TSNullKeyword":
                return l("null", t);

              case "TSUndefinedKeyword":
                return l("undefined", t);

              case "TSUnknownKeyword":
                return l("unknown", t);

              case "TSNeverKeyword":
                return l("never", t);

              case "TSArrayType":
                return c([ e.call(r, "elementType"), "[]" ]);

              case "TSLiteralType":
                return e.call(r, "literal");

              case "TSUnionType":
                return l(" | ").join(e.map(r, "types"));

              case "TSIntersectionType":
                return l(" & ").join(e.map(r, "types"));

              case "TSConditionalType":
                a.push(e.call(r, "checkType"), " extends ", e.call(r, "extendsType"), " ? ", e.call(r, "trueType"), " : ", e.call(r, "falseType"));
                return c(a);

              case "TSInferType":
                a.push("infer ", e.call(r, "typeParameter"));
                return c(a);

              case "TSParenthesizedType":
                return c([ "(", e.call(r, "typeAnnotation"), ")" ]);

              case "TSFunctionType":
              case "TSConstructorType":
                return c([ e.call(r, "typeParameters"), "(", I(e, t, r), ")", e.call(r, "typeAnnotation") ]);

              case "TSMappedType":
                {
                    a.push(n.readonly ? "readonly " : "", "[", e.call(r, "typeParameter"), "]", n.optional ? "?" : "");
                    if (n.typeAnnotation) {
                        a.push(": ", e.call(r, "typeAnnotation"), ";");
                    }
                    return c([ "{\n", c(a).indent(t.tabWidth), "\n}" ]);
                }

              case "TSTupleType":
                return c([ "[", l(", ").join(e.map(r, "elementTypes")), "]" ]);

              case "TSRestType":
                return c([ "...", e.call(r, "typeAnnotation"), "[]" ]);

              case "TSOptionalType":
                return c([ e.call(r, "typeAnnotation"), "?" ]);

              case "TSIndexedAccessType":
                return c([ e.call(r, "objectType"), "[", e.call(r, "indexType"), "]" ]);

              case "TSTypeOperator":
                return c([ e.call(r, "operator"), " ", e.call(r, "typeAnnotation") ]);

              case "TSTypeLiteral":
                {
                    var de = l(",\n").join(e.map(r, "members"));
                    if (de.isEmpty()) {
                        return l("{}", t);
                    }
                    a.push("{\n", de.indent(t.tabWidth), "\n}");
                    return c(a);
                }

              case "TSEnumMember":
                a.push(e.call(r, "id"));
                if (n.initializer) {
                    a.push(" = ", e.call(r, "initializer"));
                }
                return c(a);

              case "TSTypeQuery":
                return c([ "typeof ", e.call(r, "exprName") ]);

              case "TSParameterProperty":
                if (n.accessibility) {
                    a.push(n.accessibility, " ");
                }
                if (n.export) {
                    a.push("export ");
                }
                if (n.static) {
                    a.push("static ");
                }
                if (n.readonly) {
                    a.push("readonly ");
                }
                a.push(e.call(r, "parameter"));
                return c(a);

              case "TSTypeReference":
                return c([ e.call(r, "typeName"), e.call(r, "typeParameters") ]);

              case "TSQualifiedName":
                return c([ e.call(r, "left"), ".", e.call(r, "right") ]);

              case "TSAsExpression":
                {
                    var me = n.extra && n.extra.parenthesized === true;
                    a = [];
                    if (me) a.push("(");
                    a.push(e.call(r, "expression"), l(" as "), e.call(r, "typeAnnotation"));
                    if (me) a.push(")");
                    return c(a);
                }

              case "TSNonNullExpression":
                return c([ e.call(r, "expression"), "!" ]);

              case "TSTypeAnnotation":
                {
                    var he = e.getParentNode(0);
                    var ve = ": ";
                    var ye = m.TSFunctionType.check(he);
                    if (m.TSFunctionType.check(he)) {
                        ve = " => ";
                    }
                    if (m.TSTypePredicate.check(he)) {
                        ve = " is ";
                    }
                    return c([ ve, e.call(r, "typeAnnotation") ]);
                }

              case "TSIndexSignature":
                return c([ n.readonly ? "readonly " : "", "[", e.map(r, "parameters"), "]", e.call(r, "typeAnnotation") ]);

              case "TSPropertySignature":
                a.push(L(e, r), n.readonly ? "readonly " : "");
                if (n.computed) {
                    a.push("[", e.call(r, "key"), "]");
                } else {
                    a.push(e.call(r, "key"));
                }
                a.push(n.optional ? "?" : "", e.call(r, "typeAnnotation"));
                return c(a);

              case "TSMethodSignature":
                if (n.computed) {
                    a.push("[", e.call(r, "key"), "]");
                } else {
                    a.push(e.call(r, "key"));
                }
                if (n.optional) {
                    a.push("?");
                }
                a.push(e.call(r, "typeParameters"), "(", I(e, t, r), ")", e.call(r, "typeAnnotation"));
                return c(a);

              case "TSTypePredicate":
                return c([ e.call(r, "parameterName"), e.call(r, "typeAnnotation") ]);

              case "TSCallSignatureDeclaration":
                return c([ e.call(r, "typeParameters"), "(", I(e, t, r), ")", e.call(r, "typeAnnotation") ]);

              case "TSConstructSignatureDeclaration":
                if (n.typeParameters) {
                    a.push("new", e.call(r, "typeParameters"));
                } else {
                    a.push("new ");
                }
                a.push("(", I(e, t, r), ")", e.call(r, "typeAnnotation"));
                return c(a);

              case "TSTypeAliasDeclaration":
                return c([ n.declare ? "declare " : "", "type ", e.call(r, "id"), e.call(r, "typeParameters"), " = ", e.call(r, "typeAnnotation"), ";" ]);

              case "TSTypeParameter":
                a.push(e.call(r, "name"));
                var he = e.getParentNode(0);
                var xe = m.TSMappedType.check(he);
                if (n.constraint) {
                    a.push(xe ? " in " : " extends ", e.call(r, "constraint"));
                }
                if (n["default"]) {
                    a.push(" = ", e.call(r, "default"));
                }
                return c(a);

              case "TSTypeAssertion":
                var me = n.extra && n.extra.parenthesized === true;
                if (me) {
                    a.push("(");
                }
                a.push("<", e.call(r, "typeAnnotation"), "> ", e.call(r, "expression"));
                if (me) {
                    a.push(")");
                }
                return c(a);

              case "TSTypeParameterDeclaration":
              case "TSTypeParameterInstantiation":
                return c([ "<", l(", ").join(e.map(r, "params")), ">" ]);

              case "TSEnumDeclaration":
                a.push(n.declare ? "declare " : "", n.const ? "const " : "", "enum ", e.call(r, "id"));
                var ge = l(",\n").join(e.map(r, "members"));
                if (ge.isEmpty()) {
                    a.push(" {}");
                } else {
                    a.push(" {\n", ge.indent(t.tabWidth), "\n}");
                }
                return c(a);

              case "TSExpressionWithTypeArguments":
                return c([ e.call(r, "expression"), e.call(r, "typeParameters") ]);

              case "TSInterfaceBody":
                var be = l(";\n").join(e.map(r, "body"));
                if (be.isEmpty()) {
                    return l("{}", t);
                }
                return c([ "{\n", be.indent(t.tabWidth), ";", "\n}" ]);

              case "TSImportEqualsDeclaration":
                if (n.isExport) {
                    a.push("export ");
                }
                a.push("import ", e.call(r, "id"), " = ", e.call(r, "moduleReference"));
                return V(c(a));

              case "TSExternalModuleReference":
                return c([ "require(", e.call(r, "expression"), ")" ]);

              case "TSModuleDeclaration":
                {
                    var Ee = e.getParentNode();
                    if (Ee.type === "TSModuleDeclaration") {
                        a.push(".");
                    } else {
                        if (n.declare) {
                            a.push("declare ");
                        }
                        if (!n.global) {
                            var Se = n.id.type === "StringLiteral" || n.id.type === "Literal" && typeof n.id.value === "string";
                            if (Se) {
                                a.push("module ");
                            } else if (n.loc && n.loc.lines && n.id.loc) {
                                var De = n.loc.lines.sliceString(n.loc.start, n.id.loc.start);
                                if (De.indexOf("module") >= 0) {
                                    a.push("module ");
                                } else {
                                    a.push("namespace ");
                                }
                            } else {
                                a.push("namespace ");
                            }
                        }
                    }
                    a.push(e.call(r, "id"));
                    if (n.body && n.body.type === "TSModuleDeclaration") {
                        a.push(e.call(r, "body"));
                    } else if (n.body) {
                        var Ce = e.call(r, "body");
                        if (Ce.isEmpty()) {
                            a.push(" {}");
                        } else {
                            a.push(" {\n", Ce.indent(t.tabWidth), "\n}");
                        }
                    }
                    return c(a);
                }

              case "TSModuleBlock":
                return e.call(function(e) {
                    return T(e, t, r);
                }, "body");

              case "ClassHeritage":
              case "ComprehensionBlock":
              case "ComprehensionExpression":
              case "Glob":
              case "GeneratorExpression":
              case "LetStatement":
              case "LetExpression":
              case "GraphExpression":
              case "GraphIndexExpression":
              case "XMLDefaultDeclaration":
              case "XMLAnyName":
              case "XMLQualifiedIdentifier":
              case "XMLFunctionQualifiedIdentifier":
              case "XMLAttributeSelector":
              case "XMLFilterExpression":
              case "XML":
              case "XMLElement":
              case "XMLList":
              case "XMLEscape":
              case "XMLText":
              case "XMLStartTag":
              case "XMLEndTag":
              case "XMLPointTag":
              case "XMLName":
              case "XMLAttribute":
              case "XMLCdata":
              case "XMLComment":
              case "XMLProcessingInstruction":
              default:
                debugger;
                throw new Error("unknown type: " + JSON.stringify(n.type));
            }
            return p;
        }
        function w(e, t) {
            var r = [];
            var i = e.getValue();
            if (i.decorators && i.decorators.length > 0 && !g.getParentExportDeclaration(e)) {
                e.each(function(e) {
                    r.push(t(e), "\n");
                }, "decorators");
            } else if (g.isExportDeclaration(i) && i.declaration && i.declaration.decorators) {
                e.each(function(e) {
                    r.push(t(e), "\n");
                }, "declaration", "decorators");
            }
            return c(r);
        }
        function T(e, t, r) {
            var i = m.ClassBody && m.ClassBody.check(e.getParentNode());
            var n = [];
            var a = false;
            var o = false;
            e.each(function(e) {
                var t = e.getName();
                var i = e.getValue();
                if (!i) {
                    return;
                }
                if (i.type === "EmptyStatement" && !(i.comments && i.comments.length > 0)) {
                    return;
                }
                if (m.Comment.check(i)) {
                    a = true;
                } else if (m.Statement.check(i)) {
                    o = true;
                } else {
                    v.assert(i);
                }
                n.push({
                    node: i,
                    printed: r(e)
                });
            });
            if (a) {
                s.strictEqual(o, false, "Comments may appear as statements in otherwise empty statement " + "lists, but may not coexist with non-Comment nodes.");
            }
            var u = null;
            var l = n.length;
            var h = [];
            n.forEach(function(e, r) {
                var i = e.printed;
                var n = e.node;
                var s = i.length > 1;
                var a = r > 0;
                var o = r < l - 1;
                var c;
                var p;
                var f = n && n.loc && n.loc.lines;
                var d = f && t.reuseWhitespace && g.getTrueLoc(n, f);
                if (a) {
                    if (d) {
                        var m = f.skipSpaces(d.start, true);
                        var v = m ? m.line : 1;
                        var y = d.start.line - v;
                        c = Array(y + 1).join("\n");
                    } else {
                        c = s ? "\n\n" : "\n";
                    }
                } else {
                    c = "";
                }
                if (o) {
                    if (d) {
                        var x = f.skipSpaces(d.end);
                        var b = x ? x.line : f.length;
                        var E = b - d.end.line;
                        p = Array(E + 1).join("\n");
                    } else {
                        p = s ? "\n\n" : "\n";
                    }
                } else {
                    p = "";
                }
                h.push(F(u, c), i);
                if (o) {
                    u = p;
                } else if (p) {
                    h.push(p);
                }
            });
            return c(h);
        }
        function F(e, t) {
            if (!e && !t) {
                return l("");
            }
            if (!e) {
                return l(t);
            }
            if (!t) {
                return l(e);
            }
            var r = l(e);
            var i = l(t);
            if (i.length > r.length) {
                return i;
            }
            return r;
        }
        function P(e, t, r) {
            var i = e.getNode();
            var n = i.kind;
            var s = [];
            var a = i.value;
            if (!m.FunctionExpression.check(a)) {
                a = i;
            }
            var o = i.accessibility || i.access;
            if (typeof o === "string") {
                s.push(o, " ");
            }
            if (i.static) {
                s.push("static ");
            }
            if (i.abstract) {
                s.push("abstract ");
            }
            if (i.readonly) {
                s.push("readonly ");
            }
            if (a.async) {
                s.push("async ");
            }
            if (a.generator) {
                s.push("*");
            }
            if (n === "get" || n === "set") {
                s.push(n, " ");
            }
            var u = e.call(r, "key");
            if (i.computed) {
                u = c([ "[", u, "]" ]);
            }
            s.push(u);
            if (i.optional) {
                s.push("?");
            }
            if (i === a) {
                s.push(e.call(r, "typeParameters"), "(", I(e, t, r), ")", e.call(r, "returnType"));
                if (i.body) {
                    s.push(" ", e.call(r, "body"));
                } else {
                    s.push(";");
                }
            } else {
                s.push(e.call(r, "value", "typeParameters"), "(", e.call(function(e) {
                    return I(e, t, r);
                }, "value"), ")", e.call(r, "value", "returnType"));
                if (a.body) {
                    s.push(" ", e.call(r, "value", "body"));
                } else {
                    s.push(";");
                }
            }
            return c(s);
        }
        function N(e, t, r) {
            var i = e.map(r, "arguments");
            var n = g.isTrailingCommaEnabled(t, "parameters");
            var s = l(", ").join(i);
            if (s.getLineLength(1) > t.wrapColumn) {
                s = l(",\n").join(i);
                return c([ "(\n", s.indent(t.tabWidth), n ? ",\n)" : "\n)" ]);
            }
            return c([ "(", s, ")" ]);
        }
        function I(e, t, r) {
            var i = e.getValue();
            if (i.params) {
                var n = i.params;
                var s = e.map(r, "params");
            } else if (i.parameters) {
                n = i.parameters;
                s = e.map(r, "parameters");
            }
            if (i.defaults) {
                e.each(function(e) {
                    var t = e.getName();
                    var i = s[t];
                    if (i && e.getValue()) {
                        s[t] = c([ i, " = ", r(e) ]);
                    }
                }, "defaults");
            }
            if (i.rest) {
                s.push(c([ "...", e.call(r, "rest") ]));
            }
            var a = l(", ").join(s);
            if (a.length > 1 || a.getLineLength(1) > t.wrapColumn) {
                a = l(",\n").join(s);
                if (g.isTrailingCommaEnabled(t, "parameters") && !i.rest && n[n.length - 1].type !== "RestElement") {
                    a = c([ a, ",\n" ]);
                } else {
                    a = c([ a, "\n" ]);
                }
                return c([ "\n", a.indent(t.tabWidth) ]);
            }
            return a;
        }
        function _(e, t, r) {
            var i = e.getValue();
            var n = [ "export " ];
            if (i.exportKind && i.exportKind !== "value") {
                n.push(i.exportKind + " ");
            }
            var s = t.objectCurlySpacing;
            m.Declaration.assert(i);
            if (i["default"] || i.type === "ExportDefaultDeclaration") {
                n.push("default ");
            }
            if (i.declaration) {
                n.push(e.call(r, "declaration"));
            } else if (i.specifiers) {
                if (i.specifiers.length === 1 && i.specifiers[0].type === "ExportBatchSpecifier") {
                    n.push("*");
                } else if (i.specifiers.length === 0) {
                    n.push("{}");
                } else if (i.specifiers[0].type === "ExportDefaultSpecifier") {
                    var a = [];
                    var o = [];
                    e.each(function(e) {
                        var t = e.getValue();
                        if (t.type === "ExportDefaultSpecifier") {
                            a.push(r(e));
                        } else {
                            o.push(r(e));
                        }
                    }, "specifiers");
                    a.forEach(function(e, t) {
                        if (t > 0) {
                            n.push(", ");
                        }
                        n.push(e);
                    });
                    if (o.length > 0) {
                        var u = l(", ").join(o);
                        if (u.getLineLength(1) > t.wrapColumn) {
                            u = c([ l(",\n").join(o).indent(t.tabWidth), "," ]);
                        }
                        if (a.length > 0) {
                            n.push(", ");
                        }
                        if (u.length > 1) {
                            n.push("{\n", u, "\n}");
                        } else if (t.objectCurlySpacing) {
                            n.push("{ ", u, " }");
                        } else {
                            n.push("{", u, "}");
                        }
                    }
                } else {
                    n.push(s ? "{ " : "{", l(", ").join(e.map(r, "specifiers")), s ? " }" : "}");
                }
                if (i.source) {
                    n.push(" from ", e.call(r, "source"));
                }
            }
            var h = c(n);
            if (O(h) !== ";" && !(i.declaration && (i.declaration.type === "FunctionDeclaration" || i.declaration.type === "ClassDeclaration" || i.declaration.type === "TSModuleDeclaration" || i.declaration.type === "TSInterfaceDeclaration" || i.declaration.type === "TSEnumDeclaration"))) {
                h = c([ h, ";" ]);
            }
            return h;
        }
        function B(e, t) {
            var r = g.getParentExportDeclaration(e);
            if (r) {
                s.strictEqual(r.type, "DeclareExportDeclaration");
            } else {
                t.unshift("declare ");
            }
            return c(t);
        }
        function L(e, t) {
            return e.call(function(e) {
                var r = e.getValue();
                if (r) {
                    if (r === "plus") {
                        return l("+");
                    }
                    if (r === "minus") {
                        return l("-");
                    }
                    return t(e);
                }
                return l("");
            }, "variance");
        }
        function M(e, t) {
            if (e.length > 1) return c([ " ", e ]);
            return c([ "\n", V(e).indent(t.tabWidth) ]);
        }
        function O(e) {
            var t = e.lastPos();
            do {
                var r = e.charAt(t);
                if (/\S/.test(r)) return r;
            } while (e.prevPos(t));
        }
        function j(e) {
            return O(e) === "}";
        }
        function R(e) {
            return e.replace(/['"]/g, function(e) {
                return e === '"' ? "'" : '"';
            });
        }
        function X(e, t) {
            v.assert(e);
            switch (t.quote) {
              case "auto":
                var r = JSON.stringify(e);
                var i = R(JSON.stringify(R(e)));
                return r.length > i.length ? i : r;

              case "single":
                return R(JSON.stringify(R(e)));

              case "double":
              default:
                return JSON.stringify(e);
            }
        }
        function V(e) {
            var t = O(e);
            if (!t || "\n};".indexOf(t) < 0) return c([ e, ";" ]);
            return e;
        }
    }, function(e, t, r) {
        "use strict";
        var i = r(6);
        var n = r(83).parse;
        var s = r(84).Printer;
        function a(e, t) {
            return new s(t).print(e);
        }
        function o(e, t) {
            return new s(t).printGenerically(e);
        }
        function u(e, t) {
            return l(process.argv[2], e, t);
        }
        function l(e, t, i) {
            r(164).readFile(e, "utf-8", function(e, r) {
                if (e) {
                    console.error(e);
                    return;
                }
                h(r, t, i);
            });
        }
        function c(e) {
            process.stdout.write(e);
        }
        function h(e, t, r) {
            var i = r && r.writeback || c;
            t(n(e, r), function(e) {
                i(a(e, r).code);
            });
        }
        Object.defineProperties(t, {
            parse: {
                enumerable: true,
                value: n
            },
            visit: {
                enumerable: true,
                value: i.visit
            },
            print: {
                enumerable: true,
                value: a
            },
            prettyPrint: {
                enumerable: false,
                value: o
            },
            types: {
                enumerable: false,
                value: i
            },
            run: {
                enumerable: false,
                value: u
            }
        });
    }, function(e, t) {
        "use strict";
        var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        t.encode = function(e) {
            if (0 <= e && e < r.length) {
                return r[e];
            }
            throw new TypeError("Must be between 0 and 63: " + e);
        };
        t.decode = function(e) {
            var t = 65;
            var r = 90;
            var i = 97;
            var n = 122;
            var s = 48;
            var a = 57;
            var o = 43;
            var u = 47;
            var l = 26;
            var c = 52;
            if (t <= e && e <= r) {
                return e - t;
            }
            if (i <= e && e <= n) {
                return e - i + l;
            }
            if (s <= e && e <= a) {
                return e - s + c;
            }
            if (e == o) {
                return 62;
            }
            if (e == u) {
                return 63;
            }
            return -1;
        };
    }, function(e, t) {
        "use strict";
        t.GREATEST_LOWER_BOUND = 1;
        t.LEAST_UPPER_BOUND = 2;
        function r(e, i, n, s, a, o) {
            var u = Math.floor((i - e) / 2) + e;
            var l = a(n, s[u], true);
            if (l === 0) {
                return u;
            } else if (l > 0) {
                if (i - u > 1) {
                    return r(u, i, n, s, a, o);
                }
                if (o == t.LEAST_UPPER_BOUND) {
                    return i < s.length ? i : -1;
                } else {
                    return u;
                }
            } else {
                if (u - e > 1) {
                    return r(e, u, n, s, a, o);
                }
                if (o == t.LEAST_UPPER_BOUND) {
                    return u;
                } else {
                    return e < 0 ? -1 : e;
                }
            }
        }
        t.search = function e(i, n, s, a) {
            if (n.length === 0) {
                return -1;
            }
            var o = r(-1, n.length, i, n, s, a || t.GREATEST_LOWER_BOUND);
            if (o < 0) {
                return -1;
            }
            while (o - 1 >= 0) {
                if (s(n[o], n[o - 1], true) !== 0) {
                    break;
                }
                --o;
            }
            return o;
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(15);
        function n(e, t) {
            var r = e.generatedLine;
            var n = t.generatedLine;
            var s = e.generatedColumn;
            var a = t.generatedColumn;
            return n > r || n == r && a >= s || i.compareByGeneratedPositionsInflated(e, t) <= 0;
        }
        function s() {
            this._array = [];
            this._sorted = true;
            this._last = {
                generatedLine: -1,
                generatedColumn: 0
            };
        }
        s.prototype.unsortedForEach = function e(t, r) {
            this._array.forEach(t, r);
        };
        s.prototype.add = function e(t) {
            if (n(this._last, t)) {
                this._last = t;
                this._array.push(t);
            } else {
                this._sorted = false;
                this._array.push(t);
            }
        };
        s.prototype.toArray = function e() {
            if (!this._sorted) {
                this._array.sort(i.compareByGeneratedPositionsInflated);
                this._sorted = true;
            }
            return this._array;
        };
        t.MappingList = s;
    }, function(e, t) {
        "use strict";
        function r(e, t, r) {
            var i = e[t];
            e[t] = e[r];
            e[r] = i;
        }
        function i(e, t) {
            return Math.round(e + Math.random() * (t - e));
        }
        function n(e, t, s, a) {
            if (s < a) {
                var o = i(s, a);
                var u = s - 1;
                r(e, o, a);
                var l = e[a];
                for (var c = s; c < a; c++) {
                    if (t(e[c], l) <= 0) {
                        u += 1;
                        r(e, u, c);
                    }
                }
                r(e, u + 1, c);
                var h = u + 1;
                n(e, t, s, h - 1);
                n(e, t, h + 1, a);
            }
        }
        t.quickSort = function(e, t) {
            n(e, t, 0, e.length - 1);
        };
    }, function(e, t, r) {
        "use strict";
        var i = r(15);
        var n = r(87);
        var s = r(48).ArraySet;
        var a = r(49);
        var o = r(89).quickSort;
        function u(e, t) {
            var r = e;
            if (typeof e === "string") {
                r = i.parseSourceMapInput(e);
            }
            return r.sections != null ? new h(r, t) : new l(r, t);
        }
        u.fromSourceMap = function(e, t) {
            return l.fromSourceMap(e, t);
        };
        u.prototype._version = 3;
        u.prototype.__generatedMappings = null;
        Object.defineProperty(u.prototype, "_generatedMappings", {
            configurable: true,
            enumerable: true,
            get: function e() {
                if (!this.__generatedMappings) {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }
                return this.__generatedMappings;
            }
        });
        u.prototype.__originalMappings = null;
        Object.defineProperty(u.prototype, "_originalMappings", {
            configurable: true,
            enumerable: true,
            get: function e() {
                if (!this.__originalMappings) {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }
                return this.__originalMappings;
            }
        });
        u.prototype._charIsMappingSeparator = function e(t, r) {
            var i = t.charAt(r);
            return i === ";" || i === ",";
        };
        u.prototype._parseMappings = function e(t, r) {
            throw new Error("Subclasses must implement _parseMappings");
        };
        u.GENERATED_ORDER = 1;
        u.ORIGINAL_ORDER = 2;
        u.GREATEST_LOWER_BOUND = 1;
        u.LEAST_UPPER_BOUND = 2;
        u.prototype.eachMapping = function e(t, r, n) {
            var s = r || null;
            var a = n || u.GENERATED_ORDER;
            var o;
            switch (a) {
              case u.GENERATED_ORDER:
                o = this._generatedMappings;
                break;

              case u.ORIGINAL_ORDER:
                o = this._originalMappings;
                break;

              default:
                throw new Error("Unknown order of iteration.");
            }
            var l = this.sourceRoot;
            o.map(function(e) {
                var t = e.source === null ? null : this._sources.at(e.source);
                t = i.computeSourceURL(l, t, this._sourceMapURL);
                return {
                    source: t,
                    generatedLine: e.generatedLine,
                    generatedColumn: e.generatedColumn,
                    originalLine: e.originalLine,
                    originalColumn: e.originalColumn,
                    name: e.name === null ? null : this._names.at(e.name)
                };
            }, this).forEach(t, s);
        };
        u.prototype.allGeneratedPositionsFor = function e(t) {
            var r = i.getArg(t, "line");
            var s = {
                source: i.getArg(t, "source"),
                originalLine: r,
                originalColumn: i.getArg(t, "column", 0)
            };
            s.source = this._findSourceIndex(s.source);
            if (s.source < 0) {
                return [];
            }
            var a = [];
            var o = this._findMapping(s, this._originalMappings, "originalLine", "originalColumn", i.compareByOriginalPositions, n.LEAST_UPPER_BOUND);
            if (o >= 0) {
                var u = this._originalMappings[o];
                if (t.column === undefined) {
                    var l = u.originalLine;
                    while (u && u.originalLine === l) {
                        a.push({
                            line: i.getArg(u, "generatedLine", null),
                            column: i.getArg(u, "generatedColumn", null),
                            lastColumn: i.getArg(u, "lastGeneratedColumn", null)
                        });
                        u = this._originalMappings[++o];
                    }
                } else {
                    var c = u.originalColumn;
                    while (u && u.originalLine === r && u.originalColumn == c) {
                        a.push({
                            line: i.getArg(u, "generatedLine", null),
                            column: i.getArg(u, "generatedColumn", null),
                            lastColumn: i.getArg(u, "lastGeneratedColumn", null)
                        });
                        u = this._originalMappings[++o];
                    }
                }
            }
            return a;
        };
        t.SourceMapConsumer = u;
        function l(e, t) {
            var r = e;
            if (typeof e === "string") {
                r = i.parseSourceMapInput(e);
            }
            var n = i.getArg(r, "version");
            var a = i.getArg(r, "sources");
            var o = i.getArg(r, "names", []);
            var u = i.getArg(r, "sourceRoot", null);
            var l = i.getArg(r, "sourcesContent", null);
            var c = i.getArg(r, "mappings");
            var h = i.getArg(r, "file", null);
            if (n != this._version) {
                throw new Error("Unsupported version: " + n);
            }
            if (u) {
                u = i.normalize(u);
            }
            a = a.map(String).map(i.normalize).map(function(e) {
                return u && i.isAbsolute(u) && i.isAbsolute(e) ? i.relative(u, e) : e;
            });
            this._names = s.fromArray(o.map(String), true);
            this._sources = s.fromArray(a, true);
            this._absoluteSources = this._sources.toArray().map(function(e) {
                return i.computeSourceURL(u, e, t);
            });
            this.sourceRoot = u;
            this.sourcesContent = l;
            this._mappings = c;
            this._sourceMapURL = t;
            this.file = h;
        }
        l.prototype = Object.create(u.prototype);
        l.prototype.consumer = u;
        l.prototype._findSourceIndex = function(e) {
            var t = e;
            if (this.sourceRoot != null) {
                t = i.relative(this.sourceRoot, t);
            }
            if (this._sources.has(t)) {
                return this._sources.indexOf(t);
            }
            var r;
            for (r = 0; r < this._absoluteSources.length; ++r) {
                if (this._absoluteSources[r] == e) {
                    return r;
                }
            }
            return -1;
        };
        l.fromSourceMap = function e(t, r) {
            var n = Object.create(l.prototype);
            var a = n._names = s.fromArray(t._names.toArray(), true);
            var u = n._sources = s.fromArray(t._sources.toArray(), true);
            n.sourceRoot = t._sourceRoot;
            n.sourcesContent = t._generateSourcesContent(n._sources.toArray(), n.sourceRoot);
            n.file = t._file;
            n._sourceMapURL = r;
            n._absoluteSources = n._sources.toArray().map(function(e) {
                return i.computeSourceURL(n.sourceRoot, e, r);
            });
            var h = t._mappings.toArray().slice();
            var p = n.__generatedMappings = [];
            var f = n.__originalMappings = [];
            for (var d = 0, m = h.length; d < m; d++) {
                var v = h[d];
                var y = new c();
                y.generatedLine = v.generatedLine;
                y.generatedColumn = v.generatedColumn;
                if (v.source) {
                    y.source = u.indexOf(v.source);
                    y.originalLine = v.originalLine;
                    y.originalColumn = v.originalColumn;
                    if (v.name) {
                        y.name = a.indexOf(v.name);
                    }
                    f.push(y);
                }
                p.push(y);
            }
            o(n.__originalMappings, i.compareByOriginalPositions);
            return n;
        };
        l.prototype._version = 3;
        Object.defineProperty(l.prototype, "sources", {
            get: function e() {
                return this._absoluteSources.slice();
            }
        });
        function c() {
            this.generatedLine = 0;
            this.generatedColumn = 0;
            this.source = null;
            this.originalLine = null;
            this.originalColumn = null;
            this.name = null;
        }
        l.prototype._parseMappings = function e(t, r) {
            var n = 1;
            var s = 0;
            var u = 0;
            var l = 0;
            var h = 0;
            var p = 0;
            var f = t.length;
            var d = 0;
            var m = {};
            var v = {};
            var y = [];
            var x = [];
            var g, b, E, S, D;
            while (d < f) {
                if (t.charAt(d) === ";") {
                    n++;
                    d++;
                    s = 0;
                } else if (t.charAt(d) === ",") {
                    d++;
                } else {
                    g = new c();
                    g.generatedLine = n;
                    for (S = d; S < f; S++) {
                        if (this._charIsMappingSeparator(t, S)) {
                            break;
                        }
                    }
                    b = t.slice(d, S);
                    E = m[b];
                    if (E) {
                        d += b.length;
                    } else {
                        E = [];
                        while (d < S) {
                            a.decode(t, d, v);
                            D = v.value;
                            d = v.rest;
                            E.push(D);
                        }
                        if (E.length === 2) {
                            throw new Error("Found a source, but no line and column");
                        }
                        if (E.length === 3) {
                            throw new Error("Found a source and line, but no column");
                        }
                        m[b] = E;
                    }
                    g.generatedColumn = s + E[0];
                    s = g.generatedColumn;
                    if (E.length > 1) {
                        g.source = h + E[1];
                        h += E[1];
                        g.originalLine = u + E[2];
                        u = g.originalLine;
                        g.originalLine += 1;
                        g.originalColumn = l + E[3];
                        l = g.originalColumn;
                        if (E.length > 4) {
                            g.name = p + E[4];
                            p += E[4];
                        }
                    }
                    x.push(g);
                    if (typeof g.originalLine === "number") {
                        y.push(g);
                    }
                }
            }
            o(x, i.compareByGeneratedPositionsDeflated);
            this.__generatedMappings = x;
            o(y, i.compareByOriginalPositions);
            this.__originalMappings = y;
        };
        l.prototype._findMapping = function e(t, r, i, s, a, o) {
            if (t[i] <= 0) {
                throw new TypeError("Line must be greater than or equal to 1, got " + t[i]);
            }
            if (t[s] < 0) {
                throw new TypeError("Column must be greater than or equal to 0, got " + t[s]);
            }
            return n.search(t, r, a, o);
        };
        l.prototype.computeColumnSpans = function e() {
            for (var t = 0; t < this._generatedMappings.length; ++t) {
                var r = this._generatedMappings[t];
                if (t + 1 < this._generatedMappings.length) {
                    var i = this._generatedMappings[t + 1];
                    if (r.generatedLine === i.generatedLine) {
                        r.lastGeneratedColumn = i.generatedColumn - 1;
                        continue;
                    }
                }
                r.lastGeneratedColumn = Infinity;
            }
        };
        l.prototype.originalPositionFor = function e(t) {
            var r = {
                generatedLine: i.getArg(t, "line"),
                generatedColumn: i.getArg(t, "column")
            };
            var n = this._findMapping(r, this._generatedMappings, "generatedLine", "generatedColumn", i.compareByGeneratedPositionsDeflated, i.getArg(t, "bias", u.GREATEST_LOWER_BOUND));
            if (n >= 0) {
                var s = this._generatedMappings[n];
                if (s.generatedLine === r.generatedLine) {
                    var a = i.getArg(s, "source", null);
                    if (a !== null) {
                        a = this._sources.at(a);
                        a = i.computeSourceURL(this.sourceRoot, a, this._sourceMapURL);
                    }
                    var o = i.getArg(s, "name", null);
                    if (o !== null) {
                        o = this._names.at(o);
                    }
                    return {
                        source: a,
                        line: i.getArg(s, "originalLine", null),
                        column: i.getArg(s, "originalColumn", null),
                        name: o
                    };
                }
            }
            return {
                source: null,
                line: null,
                column: null,
                name: null
            };
        };
        l.prototype.hasContentsOfAllSources = function e() {
            if (!this.sourcesContent) {
                return false;
            }
            return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(e) {
                return e == null;
            });
        };
        l.prototype.sourceContentFor = function e(t, r) {
            if (!this.sourcesContent) {
                return null;
            }
            var n = this._findSourceIndex(t);
            if (n >= 0) {
                return this.sourcesContent[n];
            }
            var s = t;
            if (this.sourceRoot != null) {
                s = i.relative(this.sourceRoot, s);
            }
            var a;
            if (this.sourceRoot != null && (a = i.urlParse(this.sourceRoot))) {
                var o = s.replace(/^file:\/\//, "");
                if (a.scheme == "file" && this._sources.has(o)) {
                    return this.sourcesContent[this._sources.indexOf(o)];
                }
                if ((!a.path || a.path == "/") && this._sources.has("/" + s)) {
                    return this.sourcesContent[this._sources.indexOf("/" + s)];
                }
            }
            if (r) {
                return null;
            } else {
                throw new Error('"' + s + '" is not in the SourceMap.');
            }
        };
        l.prototype.generatedPositionFor = function e(t) {
            var r = i.getArg(t, "source");
            r = this._findSourceIndex(r);
            if (r < 0) {
                return {
                    line: null,
                    column: null,
                    lastColumn: null
                };
            }
            var n = {
                source: r,
                originalLine: i.getArg(t, "line"),
                originalColumn: i.getArg(t, "column")
            };
            var s = this._findMapping(n, this._originalMappings, "originalLine", "originalColumn", i.compareByOriginalPositions, i.getArg(t, "bias", u.GREATEST_LOWER_BOUND));
            if (s >= 0) {
                var a = this._originalMappings[s];
                if (a.source === n.source) {
                    return {
                        line: i.getArg(a, "generatedLine", null),
                        column: i.getArg(a, "generatedColumn", null),
                        lastColumn: i.getArg(a, "lastGeneratedColumn", null)
                    };
                }
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            };
        };
        t.BasicSourceMapConsumer = l;
        function h(e, t) {
            var r = e;
            if (typeof e === "string") {
                r = i.parseSourceMapInput(e);
            }
            var n = i.getArg(r, "version");
            var a = i.getArg(r, "sections");
            if (n != this._version) {
                throw new Error("Unsupported version: " + n);
            }
            this._sources = new s();
            this._names = new s();
            var o = {
                line: -1,
                column: 0
            };
            this._sections = a.map(function(e) {
                if (e.url) {
                    throw new Error("Support for url field in sections not implemented.");
                }
                var r = i.getArg(e, "offset");
                var n = i.getArg(r, "line");
                var s = i.getArg(r, "column");
                if (n < o.line || n === o.line && s < o.column) {
                    throw new Error("Section offsets must be ordered and non-overlapping.");
                }
                o = r;
                return {
                    generatedOffset: {
                        generatedLine: n + 1,
                        generatedColumn: s + 1
                    },
                    consumer: new u(i.getArg(e, "map"), t)
                };
            });
        }
        h.prototype = Object.create(u.prototype);
        h.prototype.constructor = u;
        h.prototype._version = 3;
        Object.defineProperty(h.prototype, "sources", {
            get: function e() {
                var t = [];
                for (var r = 0; r < this._sections.length; r++) {
                    for (var i = 0; i < this._sections[r].consumer.sources.length; i++) {
                        t.push(this._sections[r].consumer.sources[i]);
                    }
                }
                return t;
            }
        });
        h.prototype.originalPositionFor = function e(t) {
            var r = {
                generatedLine: i.getArg(t, "line"),
                generatedColumn: i.getArg(t, "column")
            };
            var s = n.search(r, this._sections, function(e, t) {
                var r = e.generatedLine - t.generatedOffset.generatedLine;
                if (r) {
                    return r;
                }
                return e.generatedColumn - t.generatedOffset.generatedColumn;
            });
            var a = this._sections[s];
            if (!a) {
                return {
                    source: null,
                    line: null,
                    column: null,
                    name: null
                };
            }
            return a.consumer.originalPositionFor({
                line: r.generatedLine - (a.generatedOffset.generatedLine - 1),
                column: r.generatedColumn - (a.generatedOffset.generatedLine === r.generatedLine ? a.generatedOffset.generatedColumn - 1 : 0),
                bias: t.bias
            });
        };
        h.prototype.hasContentsOfAllSources = function e() {
            return this._sections.every(function(e) {
                return e.consumer.hasContentsOfAllSources();
            });
        };
        h.prototype.sourceContentFor = function e(t, r) {
            for (var i = 0; i < this._sections.length; i++) {
                var n = this._sections[i];
                var s = n.consumer.sourceContentFor(t, true);
                if (s) {
                    return s;
                }
            }
            if (r) {
                return null;
            } else {
                throw new Error('"' + t + '" is not in the SourceMap.');
            }
        };
        h.prototype.generatedPositionFor = function e(t) {
            for (var r = 0; r < this._sections.length; r++) {
                var n = this._sections[r];
                if (n.consumer._findSourceIndex(i.getArg(t, "source")) === -1) {
                    continue;
                }
                var s = n.consumer.generatedPositionFor(t);
                if (s) {
                    var a = {
                        line: s.line + (n.generatedOffset.generatedLine - 1),
                        column: s.column + (n.generatedOffset.generatedLine === s.line ? n.generatedOffset.generatedColumn - 1 : 0)
                    };
                    return a;
                }
            }
            return {
                line: null,
                column: null
            };
        };
        h.prototype._parseMappings = function e(t, r) {
            this.__generatedMappings = [];
            this.__originalMappings = [];
            for (var n = 0; n < this._sections.length; n++) {
                var s = this._sections[n];
                var a = s.consumer._generatedMappings;
                for (var u = 0; u < a.length; u++) {
                    var l = a[u];
                    var c = s.consumer._sources.at(l.source);
                    c = i.computeSourceURL(s.consumer.sourceRoot, c, this._sourceMapURL);
                    this._sources.add(c);
                    c = this._sources.indexOf(c);
                    var h = null;
                    if (l.name) {
                        h = s.consumer._names.at(l.name);
                        this._names.add(h);
                        h = this._names.indexOf(h);
                    }
                    var p = {
                        source: c,
                        generatedLine: l.generatedLine + (s.generatedOffset.generatedLine - 1),
                        generatedColumn: l.generatedColumn + (s.generatedOffset.generatedLine === l.generatedLine ? s.generatedOffset.generatedColumn - 1 : 0),
                        originalLine: l.originalLine,
                        originalColumn: l.originalColumn,
                        name: h
                    };
                    this.__generatedMappings.push(p);
                    if (typeof p.originalLine === "number") {
                        this.__originalMappings.push(p);
                    }
                }
            }
            o(this.__generatedMappings, i.compareByGeneratedPositionsDeflated);
            o(this.__originalMappings, i.compareByOriginalPositions);
        };
        t.IndexedSourceMapConsumer = h;
    }, function(e, t, r) {
        "use strict";
        var i = r(50).SourceMapGenerator;
        var n = r(15);
        var s = /(\r?\n)/;
        var a = 10;
        var o = "$$$isSourceNode$$$";
        function u(e, t, r, i, n) {
            this.children = [];
            this.sourceContents = {};
            this.line = e == null ? null : e;
            this.column = t == null ? null : t;
            this.source = r == null ? null : r;
            this.name = n == null ? null : n;
            this[o] = true;
            if (i != null) this.add(i);
        }
        u.fromStringWithSourceMap = function e(t, r, i) {
            var a = new u();
            var o = t.split(s);
            var l = 0;
            var c = function e() {
                var t = i();
                var r = i() || "";
                return t + r;
                function i() {
                    return l < o.length ? o[l++] : undefined;
                }
            };
            var h = 1, p = 0;
            var f = null;
            r.eachMapping(function(e) {
                if (f !== null) {
                    if (h < e.generatedLine) {
                        d(f, c());
                        h++;
                        p = 0;
                    } else {
                        var t = o[l] || "";
                        var r = t.substr(0, e.generatedColumn - p);
                        o[l] = t.substr(e.generatedColumn - p);
                        p = e.generatedColumn;
                        d(f, r);
                        f = e;
                        return;
                    }
                }
                while (h < e.generatedLine) {
                    a.add(c());
                    h++;
                }
                if (p < e.generatedColumn) {
                    var t = o[l] || "";
                    a.add(t.substr(0, e.generatedColumn));
                    o[l] = t.substr(e.generatedColumn);
                    p = e.generatedColumn;
                }
                f = e;
            }, this);
            if (l < o.length) {
                if (f) {
                    d(f, c());
                }
                a.add(o.splice(l).join(""));
            }
            r.sources.forEach(function(e) {
                var t = r.sourceContentFor(e);
                if (t != null) {
                    if (i != null) {
                        e = n.join(i, e);
                    }
                    a.setSourceContent(e, t);
                }
            });
            return a;
            function d(e, t) {
                if (e === null || e.source === undefined) {
                    a.add(t);
                } else {
                    var r = i ? n.join(i, e.source) : e.source;
                    a.add(new u(e.originalLine, e.originalColumn, r, t, e.name));
                }
            }
        };
        u.prototype.add = function e(t) {
            if (Array.isArray(t)) {
                t.forEach(function(e) {
                    this.add(e);
                }, this);
            } else if (t[o] || typeof t === "string") {
                if (t) {
                    this.children.push(t);
                }
            } else {
                throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + t);
            }
            return this;
        };
        u.prototype.prepend = function e(t) {
            if (Array.isArray(t)) {
                for (var r = t.length - 1; r >= 0; r--) {
                    this.prepend(t[r]);
                }
            } else if (t[o] || typeof t === "string") {
                this.children.unshift(t);
            } else {
                throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + t);
            }
            return this;
        };
        u.prototype.walk = function e(t) {
            var r;
            for (var i = 0, n = this.children.length; i < n; i++) {
                r = this.children[i];
                if (r[o]) {
                    r.walk(t);
                } else {
                    if (r !== "") {
                        t(r, {
                            source: this.source,
                            line: this.line,
                            column: this.column,
                            name: this.name
                        });
                    }
                }
            }
        };
        u.prototype.join = function e(t) {
            var r;
            var i;
            var n = this.children.length;
            if (n > 0) {
                r = [];
                for (i = 0; i < n - 1; i++) {
                    r.push(this.children[i]);
                    r.push(t);
                }
                r.push(this.children[i]);
                this.children = r;
            }
            return this;
        };
        u.prototype.replaceRight = function e(t, r) {
            var i = this.children[this.children.length - 1];
            if (i[o]) {
                i.replaceRight(t, r);
            } else if (typeof i === "string") {
                this.children[this.children.length - 1] = i.replace(t, r);
            } else {
                this.children.push("".replace(t, r));
            }
            return this;
        };
        u.prototype.setSourceContent = function e(t, r) {
            this.sourceContents[n.toSetString(t)] = r;
        };
        u.prototype.walkSourceContents = function e(t) {
            for (var r = 0, i = this.children.length; r < i; r++) {
                if (this.children[r][o]) {
                    this.children[r].walkSourceContents(t);
                }
            }
            var s = Object.keys(this.sourceContents);
            for (var r = 0, i = s.length; r < i; r++) {
                t(n.fromSetString(s[r]), this.sourceContents[s[r]]);
            }
        };
        u.prototype.toString = function e() {
            var t = "";
            this.walk(function(e) {
                t += e;
            });
            return t;
        };
        u.prototype.toStringWithSourceMap = function e(t) {
            var r = {
                code: "",
                line: 1,
                column: 0
            };
            var n = new i(t);
            var s = false;
            var o = null;
            var u = null;
            var l = null;
            var c = null;
            this.walk(function(e, t) {
                r.code += e;
                if (t.source !== null && t.line !== null && t.column !== null) {
                    if (o !== t.source || u !== t.line || l !== t.column || c !== t.name) {
                        n.addMapping({
                            source: t.source,
                            original: {
                                line: t.line,
                                column: t.column
                            },
                            generated: {
                                line: r.line,
                                column: r.column
                            },
                            name: t.name
                        });
                    }
                    o = t.source;
                    u = t.line;
                    l = t.column;
                    c = t.name;
                    s = true;
                } else if (s) {
                    n.addMapping({
                        generated: {
                            line: r.line,
                            column: r.column
                        }
                    });
                    o = null;
                    s = false;
                }
                for (var i = 0, h = e.length; i < h; i++) {
                    if (e.charCodeAt(i) === a) {
                        r.line++;
                        r.column = 0;
                        if (i + 1 === h) {
                            o = null;
                            s = false;
                        } else if (s) {
                            n.addMapping({
                                source: t.source,
                                original: {
                                    line: t.line,
                                    column: t.column
                                },
                                generated: {
                                    line: r.line,
                                    column: r.column
                                },
                                name: t.name
                            });
                        }
                    } else {
                        r.column++;
                    }
                }
            });
            this.walkSourceContents(function(e, t) {
                n.setSourceContent(e, t);
            });
            return {
                code: r.code,
                map: n
            };
        };
        t.SourceNode = u;
    }, function(e, t, r) {
        "use strict";
        var i = r(9).getOption;
        t.parse = function(e, t) {
            var n = [];
            var s = r(43).parse(e, {
                loc: true,
                locations: true,
                comment: true,
                onComment: n,
                range: i(t, "range", false),
                tolerant: i(t, "tolerant", true),
                tokens: true
            });
            if (!Array.isArray(s.comments)) {
                s.comments = n;
            }
            return s;
        };
    }, function(e, t) {
        "use strict";
        e.exports = function(e) {
            if (!e.webpackPolyfill) {
                e.deprecate = function() {};
                e.paths = [];
                e.children = [];
                e.webpackPolyfill = 1;
            }
            return e;
        };
    }, , , , , , , , , , , , , function(e, t, r) {
        "use strict";
        var i = r(85);
        var n = r(38);
        var s = r(60);
        var a = n.Parser.extend(s());
        var o = i.types.builders;
        var u = "JSXElement";
        var l = "JSXText";
        var c = "JSXExpressionContainer";
        var h = [ "body", "expression", "right", "declarations", "init" ];
        var p = function e(t, r, i) {
            if (!t) return;
            if (r(t)) {
                return i(t);
            }
            if (Array.isArray(t)) {
                t.forEach(function(n, s) {
                    var a = e(n, r, i);
                    a && (t[s] = a);
                });
                return;
            }
            h.forEach(function(n) {
                var s = e(t[n], r, i);
                s && (t[n] = s);
            });
            e(t.arguments, r, i);
        };
        var f = function e(t) {
            var r = t.openingElement.attributes.map(function(e) {
                var t = o.property("init", e.name, e.value.type === c ? e.value.expression : e.value);
                return t;
            });
            var i = t.openingElement.name.name;
            if (t.children) {
                var n = t.children.filter(function(e) {
                    return e.type === u;
                });
                if (n.length) {
                    r.push(o.property("init", o.identifier("children"), o.arrayExpression(n.map(e))));
                }
                var s = t.children.filter(function(e) {
                    return e.type === l && String.prototype.trim.call(e.raw);
                });
                if (s.length) {
                    r.push(o.property("init", o.identifier("text"), o.literal(s.map(function(e) {
                        return String.prototype.trim.call(e.raw);
                    }).join("\n"))));
                }
            }
            var a = o.objectExpression(r);
            var h = o.newExpression(o.identifier(i), [ a ]);
            return h;
        };
        var d = function e(t) {
            var r = a.parse(t, {
                sourceType: "module"
            });
            var n = false;
            p(r, function(e) {
                return e.type === u && (n = true);
            }, f);
            return n ? i.print(r).code : t;
        };
        var m = function e(t, r) {
            var i = d(t);
            this.callback(null, i, r);
        };
        var v = typeof window !== "undefined";
        if (v) {
            window.EasycanvasJSXTransformer = d;
        }
        e.exports = m;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t) {} ]);
});

