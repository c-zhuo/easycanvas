(function t(e, n) {
    if (typeof exports === "object" && typeof module === "object") module.exports = n(); else if (typeof define === "function" && define.amd) define([], n); else {
        var r = n();
        for (var i in r) (typeof exports === "object" ? exports : e)[i] = r[i];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function n(r) {
            if (e[r]) return e[r].exports;
            var i = e[r] = {
                exports: {},
                id: r,
                loaded: false
            };
            t[r].call(i.exports, i, i.exports, n);
            i.loaded = true;
            return i.exports;
        }
        n.m = t;
        n.c = e;
        n.p = "";
        return n(0);
    }({
        0: function(t, e, n) {
            t.exports = n(83);
        },
        33: function(t, e, n) {
            var r;
            var r;
            var i, o, s;
            (function(n) {
                "use strict";
                var a = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
                    return typeof t;
                } : function(t) {
                    return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                };
                !function t(e, n, i) {
                    function o(a, u) {
                        if (!n[a]) {
                            if (!e[a]) {
                                var c = "function" == typeof r && r;
                                if (!u && c) return r(a, !0);
                                if (s) return s(a, !0);
                                var l = new Error("Cannot find module '" + a + "'");
                                throw l.code = "MODULE_NOT_FOUND", l;
                            }
                            var f = n[a] = {
                                exports: {}
                            };
                            e[a][0].call(f.exports, function(t) {
                                var n = e[a][1][t];
                                return o(n ? n : t);
                            }, f, f.exports, t, e, n, i);
                        }
                        return n[a].exports;
                    }
                    for (var s = "function" == typeof r && r, a = 0; a < i.length; a++) {
                        o(i[a]);
                    }
                    return o;
                }({
                    1: [ function(t, e, n) {
                        var r, i, o, s, a, u, c = function t(e, n) {
                            return function() {
                                return e.apply(n, arguments);
                            };
                        };
                        s = t("omggif").GifReader, a = t("bluebird"), u = function t(e) {
                            var n, r, i;
                            return i = new XMLHttpRequest(), i.open("GET", e, n = !0), i.responseType = "arraybuffer", 
                            r = new a(function(t, e) {
                                return i.onload = function(e) {
                                    return t(this.response);
                                };
                            }), i.send(), new o(r);
                        }, o = function() {
                            function t(t) {
                                this._animatorPromise = t.then(function(t) {
                                    var e;
                                    return e = new s(new Uint8Array(t)), i.decodeFramesAsync(e).then(function(t) {
                                        return new r(e, t);
                                    });
                                });
                            }
                            return t.getCanvasElement = function(t) {
                                var e, n;
                                if ("string" == typeof t && "CANVAS" === (null != (n = e = document.querySelector(t)) ? n.tagName : void 0)) return e;
                                if ("CANVAS" === (null != t ? t.tagName : void 0)) return t;
                                throw new Error("Unexpected selector type. Valid types are query-selector-string/canvas-element");
                            }, t.prototype.animate = function(e) {
                                var n;
                                return n = t.getCanvasElement(e), this._animatorPromise.then(function(t) {
                                    return t.animateInCanvas(n);
                                });
                            }, t.prototype.frames = function(e, n, r) {
                                var i;
                                return null == r && (r = !1), i = t.getCanvasElement(e), this._animatorPromise.then(function(t) {
                                    return t.onDrawFrame = n, t.animateInCanvas(i, r);
                                });
                            }, t.prototype.get = function(t) {
                                return this._animatorPromise;
                            }, t;
                        }(), i = function() {
                            function t() {}
                            return t.decodeFramesSync = function(e) {
                                var n;
                                return function() {
                                    n = [];
                                    for (var t = 0, r = e.numFrames(); r >= 0 ? r > t : t > r; r >= 0 ? t++ : t--) {
                                        n.push(t);
                                    }
                                    return n;
                                }.apply(this).map(function(n) {
                                    return t.decodeFrame(e, n);
                                });
                            }, t.decodeFramesAsync = function(e) {
                                var n, r;
                                return a.map(function() {
                                    r = [];
                                    for (var t = 0, n = e.numFrames(); n >= 0 ? n > t : t > n; n >= 0 ? t++ : t--) {
                                        r.push(t);
                                    }
                                    return r;
                                }.apply(this), function(n) {
                                    return t.decodeFrame(e, n);
                                }, n = 1);
                            }, t.decodeFrame = function(t, e) {
                                var n;
                                return n = t.frameInfo(e), n.pixels = new Uint8ClampedArray(t.width * t.height * 4), 
                                t.decodeAndBlitFrameRGBA(e, n.pixels), n;
                            }, t;
                        }(), r = function() {
                            function t(t, e) {
                                var n;
                                this._reader = t, this._frames = e, this._advanceFrame = c(this._advanceFrame, this), 
                                this._nextFrameRender = c(this._nextFrameRender, this), this._nextFrame = c(this._nextFrame, this), 
                                n = this._reader, this.width = n.width, this.height = n.height, this._loopCount = this._reader.loopCount(), 
                                this._loops = 0, this._frameIndex = 0, this._running = !1;
                            }
                            return t.createBufferCanvas = function(t, e, n) {
                                var r, i, o;
                                return r = document.createElement("canvas"), i = r.getContext("2d"), r.width = t.width, 
                                r.height = t.height, o = i.createImageData(e, n), o.data.set(t.pixels), i.putImageData(o, -t.x, -t.y), 
                                r;
                            }, t.prototype.start = function() {
                                return this._lastTime = new Date().valueOf(), this._delayCompensation = 0, this._running = !0, 
                                setTimeout(this._nextFrame, 0), this;
                            }, t.prototype.stop = function() {
                                return this._running = !1, this;
                            }, t.prototype.reset = function() {
                                return this._frameIndex = 0, this._loops = 0, this;
                            }, t.prototype.running = function() {
                                return this._running;
                            }, t.prototype._nextFrame = function() {
                                requestAnimationFrame(this._nextFrameRender);
                            }, t.prototype._nextFrameRender = function() {
                                var t, e;
                                if (this._running) return t = this._frames[this._frameIndex], null != (e = this.onFrame) && e.apply(this, [ t, this._frameIndex ]), 
                                this._enqueueNextFrame();
                            }, t.prototype._advanceFrame = function() {
                                this._frameIndex += 1, this._frameIndex >= this._frames.length && (0 !== this._loopCount && this._loopCount === this._loops ? this.stop() : (this._frameIndex = 0, 
                                this._loops += 1));
                            }, t.prototype._enqueueNextFrame = function() {
                                var t, e, n, r;
                                for (this._advanceFrame(); this._running; ) {
                                    if (n = this._frames[this._frameIndex], e = new Date().valueOf() - this._lastTime, 
                                    this._lastTime += e, this._delayCompensation += e, r = 10 * n.delay, t = r - this._delayCompensation, 
                                    this._delayCompensation -= r, !(0 > t)) {
                                        setTimeout(this._nextFrame, t);
                                        break;
                                    }
                                    this._advanceFrame();
                                }
                            }, t.prototype.animateInCanvas = function(e, n) {
                                var r;
                                return null == n && (n = !0), n && (e.width = this.width, e.height = this.height), 
                                r = e.getContext("2d"), null == this.onDrawFrame && (this.onDrawFrame = function(t, e, n) {
                                    return t.drawImage(e.buffer, e.x, e.y);
                                }), null == this.onFrame && (this.onFrame = function(n) {
                                    return function(i, o) {
                                        var s, a;
                                        switch (null == i.buffer && (i.buffer = t.createBufferCanvas(i, n.width, n.height)), 
                                        "function" == typeof n.disposeFrame && n.disposeFrame(), i.disposal) {
                                          case 2:
                                            n.disposeFrame = function() {
                                                return r.clearRect(0, 0, e.width, e.height);
                                            };
                                            break;

                                          case 3:
                                            a = r.getImageData(0, 0, e.width, e.height), n.disposeFrame = function() {
                                                return r.putImageData(a, 0, 0);
                                            };
                                            break;

                                          default:
                                            n.disposeFrame = null;
                                        }
                                        return null != (s = n.onDrawFrame) ? s.apply(n, [ r, i, o ]) : void 0;
                                    };
                                }(this)), this.start(), this;
                            }, t;
                        }(), u.Gif = o, u.Decoder = i, u.Animator = r, "undefined" != typeof window && null !== window && (window.gifler = u), 
                        "undefined" != typeof e && null !== e && (e.exports = u);
                    }, {
                        bluebird: 2,
                        omggif: 4
                    } ],
                    2: [ function(r, u, c) {
                        (function(n, r) {
                            !function(n) {
                                if ("object" == (typeof c === "undefined" ? "undefined" : a(c)) && "undefined" != typeof u) u.exports = n(); else if (true) !(o = [], 
                                i = n, s = typeof i === "function" ? i.apply(e, o) : i, s !== undefined && (t.exports = s)); else {
                                    var l;
                                    "undefined" != typeof window ? l = window : "undefined" != typeof r ? l = r : "undefined" != typeof self && (l = self), 
                                    l.Promise = n();
                                }
                            }(function() {
                                var t, e, i;
                                return function t(e, n, r) {
                                    function i(s, a) {
                                        if (!n[s]) {
                                            if (!e[s]) {
                                                var u = "function" == typeof _dereq_ && _dereq_;
                                                if (!a && u) return u(s, !0);
                                                if (o) return o(s, !0);
                                                var c = new Error("Cannot find module '" + s + "'");
                                                throw c.code = "MODULE_NOT_FOUND", c;
                                            }
                                            var l = n[s] = {
                                                exports: {}
                                            };
                                            e[s][0].call(l.exports, function(t) {
                                                var n = e[s][1][t];
                                                return i(n ? n : t);
                                            }, l, l.exports, t, e, n, r);
                                        }
                                        return n[s].exports;
                                    }
                                    for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < r.length; s++) {
                                        i(r[s]);
                                    }
                                    return i;
                                }({
                                    1: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(t) {
                                            function e(t) {
                                                var e = new n(t), r = e.promise();
                                                return e.setHowMany(1), e.setUnwrap(), e.init(), r;
                                            }
                                            var n = t._SomePromiseArray;
                                            t.any = function(t) {
                                                return e(t);
                                            }, t.prototype.any = function() {
                                                return e(this);
                                            };
                                        };
                                    }, {} ],
                                    2: [ function(t, e, r) {
                                        "use strict";
                                        function i() {
                                            this._isTickUsed = !1, this._lateQueue = new l(16), this._normalQueue = new l(16), 
                                            this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
                                            var t = this;
                                            this.drainQueues = function() {
                                                t._drainQueues();
                                            }, this._schedule = c.isStatic ? c(this.drainQueues) : c;
                                        }
                                        function o(t, e, n) {
                                            this._lateQueue.push(t, e, n), this._queueTick();
                                        }
                                        function s(t, e, n) {
                                            this._normalQueue.push(t, e, n), this._queueTick();
                                        }
                                        function a(t) {
                                            this._normalQueue._pushOne(t), this._queueTick();
                                        }
                                        var u;
                                        try {
                                            throw new Error();
                                        } catch (t) {
                                            u = t;
                                        }
                                        var c = t("./schedule"), l = t("./queue"), f = t("./util");
                                        i.prototype.disableTrampolineIfNecessary = function() {
                                            f.hasDevTools && (this._trampolineEnabled = !1);
                                        }, i.prototype.haveItemsQueued = function() {
                                            return this._isTickUsed || this._haveDrainedQueues;
                                        }, i.prototype.fatalError = function(t, e) {
                                            e ? (n.stderr.write("Fatal " + (t instanceof Error ? t.stack : t)), n.exit(2)) : this.throwLater(t);
                                        }, i.prototype.throwLater = function(t, e) {
                                            if (1 === arguments.length && (e = t, t = function t() {
                                                throw e;
                                            }), "undefined" != typeof setTimeout) setTimeout(function() {
                                                t(e);
                                            }, 0); else try {
                                                this._schedule(function() {
                                                    t(e);
                                                });
                                            } catch (t) {
                                                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                                            }
                                        }, f.hasDevTools ? (c.isStatic && (c = function t(e) {
                                            setTimeout(e, 0);
                                        }), i.prototype.invokeLater = function(t, e, n) {
                                            this._trampolineEnabled ? o.call(this, t, e, n) : this._schedule(function() {
                                                setTimeout(function() {
                                                    t.call(e, n);
                                                }, 100);
                                            });
                                        }, i.prototype.invoke = function(t, e, n) {
                                            this._trampolineEnabled ? s.call(this, t, e, n) : this._schedule(function() {
                                                t.call(e, n);
                                            });
                                        }, i.prototype.settlePromises = function(t) {
                                            this._trampolineEnabled ? a.call(this, t) : this._schedule(function() {
                                                t._settlePromises();
                                            });
                                        }) : (i.prototype.invokeLater = o, i.prototype.invoke = s, i.prototype.settlePromises = a), 
                                        i.prototype.invokeFirst = function(t, e, n) {
                                            this._normalQueue.unshift(t, e, n), this._queueTick();
                                        }, i.prototype._drainQueue = function(t) {
                                            for (;t.length() > 0; ) {
                                                var e = t.shift();
                                                if ("function" == typeof e) {
                                                    var n = t.shift(), r = t.shift();
                                                    e.call(n, r);
                                                } else e._settlePromises();
                                            }
                                        }, i.prototype._drainQueues = function() {
                                            this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, 
                                            this._drainQueue(this._lateQueue);
                                        }, i.prototype._queueTick = function() {
                                            this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
                                        }, i.prototype._reset = function() {
                                            this._isTickUsed = !1;
                                        }, e.exports = i, e.exports.firstLineError = u;
                                    }, {
                                        "./queue": 26,
                                        "./schedule": 29,
                                        "./util": 36
                                    } ],
                                    3: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(t, e, n, r) {
                                            var i = !1, o = function t(e, n) {
                                                this._reject(n);
                                            }, s = function t(e, n) {
                                                n.promiseRejectionQueued = !0, n.bindingPromise._then(o, o, null, this, e);
                                            }, a = function t(e, n) {
                                                0 === (50397184 & this._bitField) && this._resolveCallback(n.target);
                                            }, u = function t(e, n) {
                                                n.promiseRejectionQueued || this._reject(e);
                                            };
                                            t.prototype.bind = function(o) {
                                                i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());
                                                var c = n(o), l = new t(e);
                                                l._propagateFrom(this, 1);
                                                var f = this._target();
                                                if (l._setBoundTo(c), c instanceof t) {
                                                    var h = {
                                                        promiseRejectionQueued: !1,
                                                        promise: l,
                                                        target: f,
                                                        bindingPromise: c
                                                    };
                                                    f._then(e, s, void 0, l, h), c._then(a, u, void 0, l, h), l._setOnCancel(c);
                                                } else l._resolveCallback(f);
                                                return l;
                                            }, t.prototype._setBoundTo = function(t) {
                                                void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField;
                                            }, t.prototype._isBound = function() {
                                                return 2097152 === (2097152 & this._bitField);
                                            }, t.bind = function(e, n) {
                                                return t.resolve(n).bind(e);
                                            };
                                        };
                                    }, {} ],
                                    4: [ function(t, e, n) {
                                        "use strict";
                                        function r() {
                                            try {
                                                Promise === o && (Promise = i);
                                            } catch (t) {}
                                            return o;
                                        }
                                        var i;
                                        "undefined" != typeof Promise && (i = Promise);
                                        var o = t("./promise")();
                                        o.noConflict = r, e.exports = o;
                                    }, {
                                        "./promise": 22
                                    } ],
                                    5: [ function(t, e, n) {
                                        "use strict";
                                        var r = Object.create;
                                        if (r) {
                                            var i = r(null), o = r(null);
                                            i[" size"] = o[" size"] = 0;
                                        }
                                        e.exports = function(e) {
                                            function n(t, n) {
                                                var r;
                                                if (null != t && (r = t[n]), "function" != typeof r) {
                                                    var i = "Object " + a.classString(t) + " has no method '" + a.toString(n) + "'";
                                                    throw new e.TypeError(i);
                                                }
                                                return r;
                                            }
                                            function r(t) {
                                                var e = this.pop(), r = n(t, e);
                                                return r.apply(t, this);
                                            }
                                            function i(t) {
                                                return t[this];
                                            }
                                            function o(t) {
                                                var e = +this;
                                                return 0 > e && (e = Math.max(0, e + t.length)), t[e];
                                            }
                                            var s, a = t("./util"), u = a.canEvaluate;
                                            a.isIdentifier;
                                            e.prototype.call = function(t) {
                                                var e = [].slice.call(arguments, 1);
                                                return e.push(t), this._then(r, void 0, void 0, e, void 0);
                                            }, e.prototype.get = function(t) {
                                                var e, n = "number" == typeof t;
                                                if (n) e = o; else if (u) {
                                                    var r = s(t);
                                                    e = null !== r ? r : i;
                                                } else e = i;
                                                return this._then(e, void 0, void 0, t, void 0);
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    6: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i) {
                                            var o = t("./util"), s = o.tryCatch, a = o.errorObj, u = e._async;
                                            e.prototype.break = e.prototype.cancel = function() {
                                                if (!i.cancellation()) return this._warn("cancellation is disabled");
                                                for (var t = this, e = t; t.isCancellable(); ) {
                                                    if (!t._cancelBy(e)) {
                                                        e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                                                        break;
                                                    }
                                                    var n = t._cancellationParent;
                                                    if (null == n || !n.isCancellable()) {
                                                        t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                                                        break;
                                                    }
                                                    t._isFollowing() && t._followee().cancel(), e = t, t = n;
                                                }
                                            }, e.prototype._branchHasCancelled = function() {
                                                this._branchesRemainingToCancel--;
                                            }, e.prototype._enoughBranchesHaveCancelled = function() {
                                                return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
                                            }, e.prototype._cancelBy = function(t) {
                                                return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), 
                                                !0) : (this._branchHasCancelled(), this._enoughBranchesHaveCancelled() ? (this._invokeOnCancel(), 
                                                !0) : !1);
                                            }, e.prototype._cancelBranched = function() {
                                                this._enoughBranchesHaveCancelled() && this._cancel();
                                            }, e.prototype._cancel = function() {
                                                this.isCancellable() && (this._setCancelled(), u.invoke(this._cancelPromises, this, void 0));
                                            }, e.prototype._cancelPromises = function() {
                                                this._length() > 0 && this._settlePromises();
                                            }, e.prototype._unsetOnCancel = function() {
                                                this._onCancelField = void 0;
                                            }, e.prototype.isCancellable = function() {
                                                return this.isPending() && !this.isCancelled();
                                            }, e.prototype._doInvokeOnCancel = function(t, e) {
                                                if (o.isArray(t)) for (var n = 0; n < t.length; ++n) {
                                                    this._doInvokeOnCancel(t[n], e);
                                                } else if (void 0 !== t) if ("function" == typeof t) {
                                                    if (!e) {
                                                        var r = s(t).call(this._boundValue());
                                                        r === a && (this._attachExtraTrace(r.e), u.throwLater(r.e));
                                                    }
                                                } else t._resultCancelled(this);
                                            }, e.prototype._invokeOnCancel = function() {
                                                var t = this._onCancel();
                                                this._unsetOnCancel(), u.invoke(this._doInvokeOnCancel, this, t);
                                            }, e.prototype._invokeInternalOnCancel = function() {
                                                this.isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
                                            }, e.prototype._resultCancelled = function() {
                                                this.cancel();
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    7: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e) {
                                            function n(t, n, a) {
                                                return function(u) {
                                                    var c = a._boundValue();
                                                    t: for (var l = 0; l < t.length; ++l) {
                                                        var f = t[l];
                                                        if (f === Error || null != f && f.prototype instanceof Error) {
                                                            if (u instanceof f) return o(n).call(c, u);
                                                        } else if ("function" == typeof f) {
                                                            var h = o(f).call(c, u);
                                                            if (h === s) return h;
                                                            if (h) return o(n).call(c, u);
                                                        } else if (r.isObject(u)) {
                                                            for (var p = i(f), _ = 0; _ < p.length; ++_) {
                                                                var d = p[_];
                                                                if (f[d] != u[d]) continue t;
                                                            }
                                                            return o(n).call(c, u);
                                                        }
                                                    }
                                                    return e;
                                                };
                                            }
                                            var r = t("./util"), i = t("./es5").keys, o = r.tryCatch, s = r.errorObj;
                                            return n;
                                        };
                                    }, {
                                        "./es5": 13,
                                        "./util": 36
                                    } ],
                                    8: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(t) {
                                            function e() {
                                                this._trace = new e.CapturedTrace(r());
                                            }
                                            function n() {
                                                return i ? new e() : void 0;
                                            }
                                            function r() {
                                                var t = o.length - 1;
                                                return t >= 0 ? o[t] : void 0;
                                            }
                                            var i = !1, o = [];
                                            return t.prototype._promiseCreated = function() {}, t.prototype._pushContext = function() {}, 
                                            t.prototype._popContext = function() {
                                                return 0;
                                            }, t._peekContext = t.prototype._peekContext = function() {}, e.prototype._pushContext = function() {
                                                void 0 !== this._trace && (this._trace._promisesCreated = 0, o.push(this._trace));
                                            }, e.prototype._popContext = function() {
                                                if (void 0 !== this._trace) {
                                                    var t = o.pop(), e = t._promisesCreated;
                                                    return t._promisesCreated = 0, e;
                                                }
                                                return 0;
                                            }, e.CapturedTrace = null, e.create = n, e.activateLongStackTraces = function() {
                                                i = !0, t.prototype._pushContext = e.prototype._pushContext, t.prototype._popContext = e.prototype._popContext, 
                                                t._peekContext = t.prototype._peekContext = r, t.prototype._promiseCreated = function() {
                                                    var t = this._peekContext();
                                                    t && t._promisesCreated++;
                                                };
                                            }, e;
                                        };
                                    }, {} ],
                                    9: [ function(t, e, r) {
                                        "use strict";
                                        e.exports = function(e, r) {
                                            function i(t, e, n) {
                                                var r = this;
                                                try {
                                                    t(e, n, function(t) {
                                                        if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + L.toString(t));
                                                        r._attachCancellationCallback(t);
                                                    });
                                                } catch (t) {
                                                    return t;
                                                }
                                            }
                                            function o(t) {
                                                if (!this.isCancellable()) return this;
                                                var e = this._onCancel();
                                                void 0 !== e ? L.isArray(e) ? e.push(t) : this._setOnCancel([ e, t ]) : this._setOnCancel(t);
                                            }
                                            function s() {
                                                return this._onCancelField;
                                            }
                                            function u(t) {
                                                this._onCancelField = t;
                                            }
                                            function c() {
                                                this._cancellationParent = void 0, this._onCancelField = void 0;
                                            }
                                            function l(t, e) {
                                                if (0 !== (1 & e)) {
                                                    this._cancellationParent = t;
                                                    var n = t._branchesRemainingToCancel;
                                                    void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1;
                                                }
                                                0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
                                            }
                                            function f(t, e) {
                                                0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
                                            }
                                            function h() {
                                                var t = this._boundTo;
                                                return void 0 !== t && t instanceof e ? t.isFulfilled() ? t.value() : void 0 : t;
                                            }
                                            function p() {
                                                this._trace = new A(this._peekContext());
                                            }
                                            function _(t, e) {
                                                if (N(t)) {
                                                    var n = this._trace;
                                                    if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t); else if (!t.__stackCleaned__) {
                                                        var r = j(t);
                                                        L.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), L.notEnumerableProp(t, "__stackCleaned__", !0);
                                                    }
                                                }
                                            }
                                            function d(t, e, n, r) {
                                                if (void 0 === t && e > 0 && Z.longStackTraces && Z.warnings) {
                                                    var i = "a promise was created in a " + n + " handler but was not returned from it";
                                                    r._warn(i);
                                                }
                                            }
                                            function v(t, e) {
                                                var n = t + " is deprecated and will be removed in a future version.";
                                                return e && (n += " Use " + e + " instead."), y(n);
                                            }
                                            function y(t, n, r) {
                                                if (Z.warnings) {
                                                    var i, o = new H(t);
                                                    if (n) r._attachExtraTrace(o); else if (Z.longStackTraces && (i = e._peekContext())) i.attachExtraTrace(o); else {
                                                        var s = j(o);
                                                        o.stack = s.message + "\n" + s.stack.join("\n");
                                                    }
                                                    F(o, "", !0);
                                                }
                                            }
                                            function m(t, e) {
                                                for (var n = 0; n < e.length - 1; ++n) {
                                                    e[n].push("From previous event:"), e[n] = e[n].join("\n");
                                                }
                                                return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n");
                                            }
                                            function g(t) {
                                                for (var e = 0; e < t.length; ++e) {
                                                    (0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), 
                                                    e--);
                                                }
                                            }
                                            function b(t) {
                                                for (var e = t[0], n = 1; n < t.length; ++n) {
                                                    for (var r = t[n], i = e.length - 1, o = e[i], s = -1, a = r.length - 1; a >= 0; --a) {
                                                        if (r[a] === o) {
                                                            s = a;
                                                            break;
                                                        }
                                                    }
                                                    for (var a = s; a >= 0; --a) {
                                                        var u = r[a];
                                                        if (e[i] !== u) break;
                                                        e.pop(), i--;
                                                    }
                                                    e = r;
                                                }
                                            }
                                            function w(t) {
                                                for (var e = [], n = 0; n < t.length; ++n) {
                                                    var r = t[n], i = "    (No stack trace)" === r || M.test(r), o = i && W(r);
                                                    i && !o && (q && " " !== r.charAt(0) && (r = "    " + r), e.push(r));
                                                }
                                                return e;
                                            }
                                            function C(t) {
                                                for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                                                    var r = e[n];
                                                    if ("    (No stack trace)" === r || M.test(r)) break;
                                                }
                                                return n > 0 && (e = e.slice(n)), e;
                                            }
                                            function j(t) {
                                                var e = t.stack, n = t.toString();
                                                return e = "string" == typeof e && e.length > 0 ? C(t) : [ "    (No stack trace)" ], 
                                                {
                                                    message: n,
                                                    stack: w(e)
                                                };
                                            }
                                            function F(t, e, n) {
                                                if ("undefined" != typeof console) {
                                                    var r;
                                                    if (L.isObject(t)) {
                                                        var i = t.stack;
                                                        r = e + B(i, t);
                                                    } else r = e + String(t);
                                                    "function" == typeof I ? I(r, n) : ("function" == typeof console.log || "object" == a(console.log)) && console.log(r);
                                                }
                                            }
                                            function k(t, e, n, r) {
                                                var i = !1;
                                                try {
                                                    "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r));
                                                } catch (t) {
                                                    V.throwLater(t);
                                                }
                                                var o = !1;
                                                try {
                                                    o = Y(t, n, r);
                                                } catch (t) {
                                                    o = !0, V.throwLater(t);
                                                }
                                                var s = !1;
                                                if (K) try {
                                                    s = K(t.toLowerCase(), {
                                                        reason: n,
                                                        promise: r
                                                    });
                                                } catch (t) {
                                                    s = !0, V.throwLater(t);
                                                }
                                                o || i || s || "unhandledRejection" !== t || F(n, "Unhandled rejection ");
                                            }
                                            function x(t) {
                                                var e;
                                                if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]"; else {
                                                    e = t && "function" == typeof t.toString ? t.toString() : L.toString(t);
                                                    var n = /\[object [a-zA-Z0-9$_]+\]/;
                                                    if (n.test(e)) try {
                                                        var r = JSON.stringify(t);
                                                        e = r;
                                                    } catch (t) {}
                                                    0 === e.length && (e = "(empty array)");
                                                }
                                                return "(<" + E(e) + ">, no stack trace)";
                                            }
                                            function E(t) {
                                                var e = 41;
                                                return t.length < e ? t : t.substr(0, e - 3) + "...";
                                            }
                                            function T() {
                                                return "function" == typeof J;
                                            }
                                            function P(t) {
                                                var e = t.match(X);
                                                return e ? {
                                                    fileName: e[1],
                                                    line: parseInt(e[2], 10)
                                                } : void 0;
                                            }
                                            function R(t, e) {
                                                if (T()) {
                                                    for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), s = -1, a = -1, u = 0; u < i.length; ++u) {
                                                        var c = P(i[u]);
                                                        if (c) {
                                                            n = c.fileName, s = c.line;
                                                            break;
                                                        }
                                                    }
                                                    for (var u = 0; u < o.length; ++u) {
                                                        var c = P(o[u]);
                                                        if (c) {
                                                            r = c.fileName, a = c.line;
                                                            break;
                                                        }
                                                    }
                                                    0 > s || 0 > a || !n || !r || n !== r || s >= a || (W = function t(e) {
                                                        if (U.test(e)) return !0;
                                                        var r = P(e);
                                                        return r && r.fileName === n && s <= r.line && r.line <= a ? !0 : !1;
                                                    });
                                                }
                                            }
                                            function A(t) {
                                                this._parent = t, this._promisesCreated = 0;
                                                var e = this._length = 1 + (void 0 === t ? 0 : t._length);
                                                J(this, A), e > 32 && this.uncycle();
                                            }
                                            var S, O, I, D = e._getDomain, V = e._async, H = t("./errors").Warning, L = t("./util"), N = L.canAttachTrace, U = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, M = null, B = null, q = !1, Q = !0, $ = !(0 == L.env("BLUEBIRD_WARNINGS") || !Q && !L.env("BLUEBIRD_WARNINGS")), G = !(0 == L.env("BLUEBIRD_LONG_STACK_TRACES") || !Q && !L.env("BLUEBIRD_LONG_STACK_TRACES"));
                                            e.prototype.suppressUnhandledRejections = function() {
                                                var t = this._target();
                                                t._bitField = -1048577 & t._bitField | 2097152;
                                            }, e.prototype._ensurePossibleRejectionHandled = function() {
                                                0 === (2097152 & this._bitField) && (this._setRejectionIsUnhandled(), V.invokeLater(this._notifyUnhandledRejection, this, void 0));
                                            }, e.prototype._notifyUnhandledRejectionIsHandled = function() {
                                                k("rejectionHandled", S, void 0, this);
                                            }, e.prototype._notifyUnhandledRejection = function() {
                                                if (this._isRejectionUnhandled()) {
                                                    var t = this._settledValue();
                                                    this._setUnhandledRejectionIsNotified(), k("unhandledRejection", O, t, this);
                                                }
                                            }, e.prototype._setUnhandledRejectionIsNotified = function() {
                                                this._bitField = 262144 | this._bitField;
                                            }, e.prototype._unsetUnhandledRejectionIsNotified = function() {
                                                this._bitField = -262145 & this._bitField;
                                            }, e.prototype._isUnhandledRejectionNotified = function() {
                                                return (262144 & this._bitField) > 0;
                                            }, e.prototype._setRejectionIsUnhandled = function() {
                                                this._bitField = 1048576 | this._bitField;
                                            }, e.prototype._unsetRejectionIsUnhandled = function() {
                                                this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), 
                                                this._notifyUnhandledRejectionIsHandled());
                                            }, e.prototype._isRejectionUnhandled = function() {
                                                return (1048576 & this._bitField) > 0;
                                            }, e.prototype._warn = function(t, e) {
                                                return y(t, e, this);
                                            }, e.onPossiblyUnhandledRejection = function(t) {
                                                var e = D();
                                                O = "function" == typeof t ? null === e ? t : e.bind(t) : void 0;
                                            }, e.onUnhandledRejectionHandled = function(t) {
                                                var e = D();
                                                S = "function" == typeof t ? null === e ? t : e.bind(t) : void 0;
                                            }, e.longStackTraces = function() {
                                                if (V.haveItemsQueued() && !Z.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                                !Z.longStackTraces && T() && (Z.longStackTraces = !0, e.prototype._captureStackTrace = p, 
                                                e.prototype._attachExtraTrace = _, r.activateLongStackTraces(), V.disableTrampolineIfNecessary());
                                            }, e.hasLongStackTraces = function() {
                                                return Z.longStackTraces && T();
                                            }, e.config = function(t) {
                                                if (t = Object(t), "longStackTraces" in t && t.longStackTraces && e.longStackTraces(), 
                                                "warnings" in t && (Z.warnings = !!t.warnings), "cancellation" in t && t.cancellation && !Z.cancellation) {
                                                    if (V.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                                                    e.prototype._clearCancellationData = c, e.prototype._propagateFrom = l, e.prototype._onCancel = s, 
                                                    e.prototype._setOnCancel = u, e.prototype._attachCancellationCallback = o, e.prototype._execute = i, 
                                                    z = l, Z.cancellation = !0;
                                                }
                                            }, e.prototype._execute = function(t, e, n) {
                                                try {
                                                    t(e, n);
                                                } catch (t) {
                                                    return t;
                                                }
                                            }, e.prototype._onCancel = function() {}, e.prototype._setOnCancel = function(t) {}, 
                                            e.prototype._attachCancellationCallback = function(t) {}, e.prototype._captureStackTrace = function() {}, 
                                            e.prototype._attachExtraTrace = function() {}, e.prototype._clearCancellationData = function() {}, 
                                            e.prototype._propagateFrom = function(t, e) {};
                                            var z = f, W = function t() {
                                                return !1;
                                            }, X = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                                            L.inherits(A, Error), r.CapturedTrace = A, A.prototype.uncycle = function() {
                                                var t = this._length;
                                                if (!(2 > t)) {
                                                    for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) {
                                                        e.push(i), i = i._parent;
                                                    }
                                                    t = this._length = r;
                                                    for (var r = t - 1; r >= 0; --r) {
                                                        var o = e[r].stack;
                                                        void 0 === n[o] && (n[o] = r);
                                                    }
                                                    for (var r = 0; t > r; ++r) {
                                                        var s = e[r].stack, a = n[s];
                                                        if (void 0 !== a && a !== r) {
                                                            a > 0 && (e[a - 1]._parent = void 0, e[a - 1]._length = 1), e[r]._parent = void 0, 
                                                            e[r]._length = 1;
                                                            var u = r > 0 ? e[r - 1] : this;
                                                            t - 1 > a ? (u._parent = e[a + 1], u._parent.uncycle(), u._length = u._parent._length + 1) : (u._parent = void 0, 
                                                            u._length = 1);
                                                            for (var c = u._length + 1, l = r - 2; l >= 0; --l) {
                                                                e[l]._length = c, c++;
                                                            }
                                                            return;
                                                        }
                                                    }
                                                }
                                            }, A.prototype.attachExtraTrace = function(t) {
                                                if (!t.__stackCleaned__) {
                                                    this.uncycle();
                                                    for (var e = j(t), n = e.message, r = [ e.stack ], i = this; void 0 !== i; ) {
                                                        r.push(w(i.stack.split("\n"))), i = i._parent;
                                                    }
                                                    b(r), g(r), L.notEnumerableProp(t, "stack", m(n, r)), L.notEnumerableProp(t, "__stackCleaned__", !0);
                                                }
                                            };
                                            var K, J = function() {
                                                var t = /^\s*at\s*/, e = function t(e, n) {
                                                    return "string" == typeof e ? e : void 0 !== n.name && void 0 !== n.message ? n.toString() : x(n);
                                                };
                                                if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                                                    Error.stackTraceLimit += 6, M = t, B = e;
                                                    var n = Error.captureStackTrace;
                                                    return W = function t(e) {
                                                        return U.test(e);
                                                    }, function(t, e) {
                                                        Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6;
                                                    };
                                                }
                                                var r = new Error();
                                                if ("string" == typeof r.stack && r.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return M = /@/, 
                                                B = e, q = !0, function(t) {
                                                    t.stack = new Error().stack;
                                                };
                                                var i;
                                                try {
                                                    throw new Error();
                                                } catch (t) {
                                                    i = "stack" in t;
                                                }
                                                return "stack" in r || !i || "number" != typeof Error.stackTraceLimit ? (B = function t(e, n) {
                                                    return "string" == typeof e ? e : "object" != (typeof n === "undefined" ? "undefined" : a(n)) && "function" != typeof n || void 0 === n.name || void 0 === n.message ? x(n) : n.toString();
                                                }, null) : (M = t, B = e, function(t) {
                                                    Error.stackTraceLimit += 6;
                                                    try {
                                                        throw new Error();
                                                    } catch (e) {
                                                        t.stack = e.stack;
                                                    }
                                                    Error.stackTraceLimit -= 6;
                                                });
                                            }([]), Y = function() {
                                                if (L.isNode) return function(t, e, r) {
                                                    return "rejectionHandled" === t ? n.emit(t, r) : n.emit(t, e, r);
                                                };
                                                var t = !1, e = !0;
                                                try {
                                                    var r = new self.CustomEvent("test");
                                                    t = r instanceof CustomEvent;
                                                } catch (t) {}
                                                if (!t) try {
                                                    var i = document.createEvent("CustomEvent");
                                                    i.initCustomEvent("testingtheevent", !1, !0, {}), self.dispatchEvent(i);
                                                } catch (t) {
                                                    e = !1;
                                                }
                                                e && (K = function e(n, r) {
                                                    var i;
                                                    return t ? i = new self.CustomEvent(n, {
                                                        detail: r,
                                                        bubbles: !1,
                                                        cancelable: !0
                                                    }) : self.dispatchEvent && (i = document.createEvent("CustomEvent"), i.initCustomEvent(n, !1, !0, r)), 
                                                    i ? !self.dispatchEvent(i) : !1;
                                                });
                                                var o = {};
                                                return o.unhandledRejection = "onunhandledRejection".toLowerCase(), o.rejectionHandled = "onrejectionHandled".toLowerCase(), 
                                                function(t, e, n) {
                                                    var r = o[t], i = self[r];
                                                    return i ? ("rejectionHandled" === t ? i.call(self, n) : i.call(self, e, n), !0) : !1;
                                                };
                                            }();
                                            "undefined" != typeof console && "undefined" != typeof console.warn && (I = function t(e) {
                                                console.warn(e);
                                            }, L.isNode && n.stderr.isTTY ? I = function t(e, r) {
                                                var i = r ? "[33m" : "[31m";
                                                n.stderr.write(i + e + "[0m\n");
                                            } : L.isNode || "string" != typeof new Error().stack || (I = function t(e, n) {
                                                console.warn("%c" + e, n ? "color: darkorange" : "color: red");
                                            }));
                                            var Z = {
                                                warnings: $,
                                                longStackTraces: !1,
                                                cancellation: !1
                                            };
                                            return G && e.longStackTraces(), {
                                                longStackTraces: function t() {
                                                    return Z.longStackTraces;
                                                },
                                                warnings: function t() {
                                                    return Z.warnings;
                                                },
                                                cancellation: function t() {
                                                    return Z.cancellation;
                                                },
                                                propagateFromFunction: function t() {
                                                    return z;
                                                },
                                                boundValueFunction: function t() {
                                                    return h;
                                                },
                                                checkForgottenReturns: d,
                                                setBounds: R,
                                                warn: y,
                                                deprecated: v,
                                                CapturedTrace: A
                                            };
                                        };
                                    }, {
                                        "./errors": 12,
                                        "./util": 36
                                    } ],
                                    10: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(t) {
                                            function e() {
                                                return this.value;
                                            }
                                            function n() {
                                                throw this.reason;
                                            }
                                            t.prototype.return = t.prototype.thenReturn = function(n) {
                                                return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, {
                                                    value: n
                                                }, void 0);
                                            }, t.prototype.throw = t.prototype.thenThrow = function(t) {
                                                return this._then(n, void 0, void 0, {
                                                    reason: t
                                                }, void 0);
                                            }, t.prototype.catchThrow = function(t) {
                                                if (arguments.length <= 1) return this._then(void 0, n, void 0, {
                                                    reason: t
                                                }, void 0);
                                                var e = arguments[1], r = function t() {
                                                    throw e;
                                                };
                                                return this.caught(t, r);
                                            }, t.prototype.catchReturn = function(n) {
                                                if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), 
                                                this._then(void 0, e, void 0, {
                                                    value: n
                                                }, void 0);
                                                var r = arguments[1];
                                                r instanceof t && r.suppressUnhandledRejections();
                                                var i = function t() {
                                                    return r;
                                                };
                                                return this.caught(n, i);
                                            };
                                        };
                                    }, {} ],
                                    11: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(t, e) {
                                            function n() {
                                                return o(this);
                                            }
                                            function r(t, n) {
                                                return i(t, n, e, e);
                                            }
                                            var i = t.reduce, o = t.all;
                                            t.prototype.each = function(t) {
                                                return this.mapSeries(t)._then(n, void 0, void 0, this, void 0);
                                            }, t.prototype.mapSeries = function(t) {
                                                return i(this, t, e, e);
                                            }, t.each = function(t, e) {
                                                return r(t, e)._then(n, void 0, void 0, t, void 0);
                                            }, t.mapSeries = r;
                                        };
                                    }, {} ],
                                    12: [ function(t, e, n) {
                                        "use strict";
                                        function r(t, e) {
                                            function n(r) {
                                                return this instanceof n ? (f(this, "message", "string" == typeof r ? r : e), f(this, "name", t), 
                                                void (Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new n(r);
                                            }
                                            return l(n, Error), n;
                                        }
                                        function i(t) {
                                            return this instanceof i ? (f(this, "name", "OperationalError"), f(this, "message", t), 
                                            this.cause = t, this.isOperational = !0, void (t instanceof Error ? (f(this, "message", t.message), 
                                            f(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new i(t);
                                        }
                                        var o, s, a = t("./es5"), u = a.freeze, c = t("./util"), l = c.inherits, f = c.notEnumerableProp, h = r("Warning", "warning"), p = r("CancellationError", "cancellation error"), _ = r("TimeoutError", "timeout error"), d = r("AggregateError", "aggregate error");
                                        try {
                                            o = TypeError, s = RangeError;
                                        } catch (t) {
                                            o = r("TypeError", "type error"), s = r("RangeError", "range error");
                                        }
                                        for (var v = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), y = 0; y < v.length; ++y) {
                                            "function" == typeof Array.prototype[v[y]] && (d.prototype[v[y]] = Array.prototype[v[y]]);
                                        }
                                        a.defineProperty(d.prototype, "length", {
                                            value: 0,
                                            configurable: !1,
                                            writable: !0,
                                            enumerable: !0
                                        }), d.prototype.isOperational = !0;
                                        var m = 0;
                                        d.prototype.toString = function() {
                                            var t = Array(4 * m + 1).join(" "), e = "\n" + t + "AggregateError of:\n";
                                            m++, t = Array(4 * m + 1).join(" ");
                                            for (var n = 0; n < this.length; ++n) {
                                                for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) {
                                                    i[o] = t + i[o];
                                                }
                                                r = i.join("\n"), e += r + "\n";
                                            }
                                            return m--, e;
                                        }, l(i, Error);
                                        var g = Error.__BluebirdErrorTypes__;
                                        g || (g = u({
                                            CancellationError: p,
                                            TimeoutError: _,
                                            OperationalError: i,
                                            RejectionError: i,
                                            AggregateError: d
                                        }), f(Error, "__BluebirdErrorTypes__", g)), e.exports = {
                                            Error: Error,
                                            TypeError: o,
                                            RangeError: s,
                                            CancellationError: g.CancellationError,
                                            OperationalError: g.OperationalError,
                                            TimeoutError: g.TimeoutError,
                                            AggregateError: g.AggregateError,
                                            Warning: h
                                        };
                                    }, {
                                        "./es5": 13,
                                        "./util": 36
                                    } ],
                                    13: [ function(t, e, n) {
                                        var r = function() {
                                            "use strict";
                                            return void 0 === this;
                                        }();
                                        if (r) e.exports = {
                                            freeze: Object.freeze,
                                            defineProperty: Object.defineProperty,
                                            getDescriptor: Object.getOwnPropertyDescriptor,
                                            keys: Object.keys,
                                            names: Object.getOwnPropertyNames,
                                            getPrototypeOf: Object.getPrototypeOf,
                                            isArray: Array.isArray,
                                            isES5: r,
                                            propertyIsWritable: function t(e, n) {
                                                var r = Object.getOwnPropertyDescriptor(e, n);
                                                return !(r && !r.writable && !r.set);
                                            }
                                        }; else {
                                            var i = {}.hasOwnProperty, o = {}.toString, s = {}.constructor.prototype, a = function t(e) {
                                                var n = [];
                                                for (var r in e) {
                                                    i.call(e, r) && n.push(r);
                                                }
                                                return n;
                                            }, u = function t(e, n) {
                                                return {
                                                    value: e[n]
                                                };
                                            }, c = function t(e, n, r) {
                                                return e[n] = r.value, e;
                                            }, l = function t(e) {
                                                return e;
                                            }, f = function t(e) {
                                                try {
                                                    return Object(e).constructor.prototype;
                                                } catch (t) {
                                                    return s;
                                                }
                                            }, h = function t(e) {
                                                try {
                                                    return "[object Array]" === o.call(e);
                                                } catch (t) {
                                                    return !1;
                                                }
                                            };
                                            e.exports = {
                                                isArray: h,
                                                keys: a,
                                                names: a,
                                                defineProperty: c,
                                                getDescriptor: u,
                                                freeze: l,
                                                getPrototypeOf: f,
                                                isES5: r,
                                                propertyIsWritable: function t() {
                                                    return !0;
                                                }
                                            };
                                        }
                                    }, {} ],
                                    14: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(t, e) {
                                            var n = t.map;
                                            t.prototype.filter = function(t, r) {
                                                return n(this, t, r, e);
                                            }, t.filter = function(t, r, i) {
                                                return n(t, r, i, e);
                                            };
                                        };
                                    }, {} ],
                                    15: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n) {
                                            function r(t) {
                                                this.finallyHandler = t;
                                            }
                                            function i(t, e) {
                                                return null != t.cancelPromise ? (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), 
                                                t.cancelPromise = null, !0) : !1;
                                            }
                                            function o() {
                                                return a.call(this, this.promise._target()._settledValue());
                                            }
                                            function s(t) {
                                                return i(this, t) ? void 0 : (l.e = t, l);
                                            }
                                            function a(t) {
                                                var a = this.promise, u = this.handler;
                                                if (!this.called) {
                                                    this.called = !0;
                                                    var f = 0 === this.type ? u.call(a._boundValue()) : u.call(a._boundValue(), t);
                                                    if (void 0 !== f) {
                                                        var h = n(f, a);
                                                        if (h instanceof e) {
                                                            if (null != this.cancelPromise) {
                                                                if (h.isCancelled()) {
                                                                    var p = new c("late cancellation observer");
                                                                    return a._attachExtraTrace(p), l.e = p, l;
                                                                }
                                                                h.isPending() && h._attachCancellationCallback(new r(this));
                                                            }
                                                            return h._then(o, s, void 0, this, void 0);
                                                        }
                                                    }
                                                }
                                                return a.isRejected() ? (i(this), l.e = t, l) : (i(this), t);
                                            }
                                            var u = t("./util"), c = e.CancellationError, l = u.errorObj;
                                            return r.prototype._resultCancelled = function() {
                                                i(this.finallyHandler);
                                            }, e.prototype._passThrough = function(t, e, n, r) {
                                                return "function" != typeof t ? this.then() : this._then(n, r, void 0, {
                                                    promise: this,
                                                    handler: t,
                                                    called: !1,
                                                    cancelPromise: null,
                                                    type: e
                                                }, void 0);
                                            }, e.prototype.lastly = e.prototype.finally = function(t) {
                                                return this._passThrough(t, 0, a, a);
                                            }, e.prototype.tap = function(t) {
                                                return this._passThrough(t, 1, a);
                                            }, a;
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    16: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i, o, s) {
                                            function a(t, n, r) {
                                                for (var o = 0; o < n.length; ++o) {
                                                    r._pushContext();
                                                    var s = p(n[o])(t);
                                                    if (r._popContext(), s === h) {
                                                        r._pushContext();
                                                        var a = e.reject(h.e);
                                                        return r._popContext(), a;
                                                    }
                                                    var u = i(s, r);
                                                    if (u instanceof e) return u;
                                                }
                                                return null;
                                            }
                                            function u(t, n, i, o) {
                                                var s = this._promise = new e(r);
                                                s._captureStackTrace(), s._setOnCancel(this), this._stack = o, this._generatorFunction = t, 
                                                this._receiver = n, this._generator = void 0, this._yieldHandlers = "function" == typeof i ? [ i ].concat(_) : _, 
                                                this._yieldedPromise = null;
                                            }
                                            var c = t("./errors"), l = c.TypeError, f = t("./util"), h = f.errorObj, p = f.tryCatch, _ = [];
                                            f.inherits(u, o), u.prototype._isResolved = function() {
                                                return null === this.promise;
                                            }, u.prototype._cleanup = function() {
                                                this._promise = this._generator = null;
                                            }, u.prototype._promiseCancelled = function() {
                                                if (!this._isResolved()) {
                                                    var t, n = "undefined" != typeof this._generator.return;
                                                    if (n) this._promise._pushContext(), t = p(this._generator.return).call(this._generator, void 0), 
                                                    this._promise._popContext(); else {
                                                        var r = new e.CancellationError("generator .return() sentinel");
                                                        e.coroutine.returnSentinel = r, this._promise._attachExtraTrace(r), this._promise._pushContext(), 
                                                        t = p(this._generator.throw).call(this._generator, r), this._promise._popContext(), 
                                                        t === h && t.e === r && (t = null);
                                                    }
                                                    var i = this._promise;
                                                    this._cleanup(), t === h ? i._rejectCallback(t.e, !1) : i.cancel();
                                                }
                                            }, u.prototype._promiseFulfilled = function(t) {
                                                this._yieldedPromise = null, this._promise._pushContext();
                                                var e = p(this._generator.next).call(this._generator, t);
                                                this._promise._popContext(), this._continue(e);
                                            }, u.prototype._promiseRejected = function(t) {
                                                this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
                                                var e = p(this._generator.throw).call(this._generator, t);
                                                this._promise._popContext(), this._continue(e);
                                            }, u.prototype._resultCancelled = function() {
                                                if (this._yieldedPromise instanceof e) {
                                                    var t = this._yieldedPromise;
                                                    this._yieldedPromise = null, t.cancel();
                                                }
                                            }, u.prototype.promise = function() {
                                                return this._promise;
                                            }, u.prototype._run = function() {
                                                this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, 
                                                this._promiseFulfilled(void 0);
                                            }, u.prototype._continue = function(t) {
                                                var n = this._promise;
                                                if (t === h) return this._cleanup(), n._rejectCallback(t.e, !1);
                                                var r = t.value;
                                                if (t.done === !0) return this._cleanup(), n._resolveCallback(r);
                                                var o = i(r, this._promise);
                                                if (!(o instanceof e) && (o = a(o, this._yieldHandlers, this._promise), null === o)) return void this._promiseRejected(new l("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", r) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                                                o = o._target();
                                                var s = o._bitField;
                                                0 === (50397184 & s) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 !== (33554432 & s) ? this._promiseFulfilled(o._value()) : 0 !== (16777216 & s) ? this._promiseRejected(o._reason()) : this._promiseCancelled();
                                            }, e.coroutine = function(t, e) {
                                                if ("function" != typeof t) throw new l("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                                var n = Object(e).yieldHandler, r = u, i = new Error().stack;
                                                return function() {
                                                    var e = t.apply(this, arguments), o = new r(void 0, void 0, n, i), s = o.promise();
                                                    return o._generator = e, o._promiseFulfilled(void 0), s;
                                                };
                                            }, e.coroutine.addYieldHandler = function(t) {
                                                if ("function" != typeof t) throw new l("expecting a function but got " + f.classString(t));
                                                _.push(t);
                                            }, e.spawn = function(t) {
                                                if (s.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                                var r = new u(t, this), i = r.promise();
                                                return r._run(e.spawn), i;
                                            };
                                        };
                                    }, {
                                        "./errors": 12,
                                        "./util": 36
                                    } ],
                                    17: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i) {
                                            var o = t("./util");
                                            o.canEvaluate, o.tryCatch, o.errorObj;
                                            e.join = function() {
                                                var t, e = arguments.length - 1;
                                                if (e > 0 && "function" == typeof arguments[e]) {
                                                    t = arguments[e];
                                                    var r;
                                                }
                                                var i = [].slice.call(arguments);
                                                t && i.pop();
                                                var r = new n(i).promise();
                                                return void 0 !== t ? r.spread(t) : r;
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    18: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i, o, s) {
                                            function u(t, e, n, r) {
                                                this.constructor$(t), this._promise._captureStackTrace();
                                                var i = l();
                                                this._callback = null === i ? e : i.bind(e), this._preservedValues = r === o ? new Array(this.length()) : null, 
                                                this._limit = n, this._inFlight = 0, this._queue = n >= 1 ? [] : _, this._init$(void 0, -2);
                                            }
                                            function c(t, e, n, i) {
                                                if ("function" != typeof e) return r("expecting a function but got " + f.classString(e));
                                                var o = "object" == (typeof n === "undefined" ? "undefined" : a(n)) && null !== n ? n.concurrency : 0;
                                                return o = "number" == typeof o && isFinite(o) && o >= 1 ? o : 0, new u(t, e, o, i).promise();
                                            }
                                            var l = e._getDomain, f = t("./util"), h = f.tryCatch, p = f.errorObj, _ = [];
                                            f.inherits(u, n), u.prototype._init = function() {}, u.prototype._promiseFulfilled = function(t, n) {
                                                var r = this._values, o = this.length(), a = this._preservedValues, u = this._limit;
                                                if (0 > n) {
                                                    if (n = -1 * n - 1, r[n] = t, u >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0;
                                                } else {
                                                    if (u >= 1 && this._inFlight >= u) return r[n] = t, this._queue.push(n), !1;
                                                    null !== a && (a[n] = t);
                                                    var c = this._promise, l = this._callback, f = c._boundValue();
                                                    c._pushContext();
                                                    var _ = h(l).call(f, t, n, o), d = c._popContext();
                                                    if (s.checkForgottenReturns(_, d, null !== a ? "Promise.filter" : "Promise.map", c), 
                                                    _ === p) return this._reject(_.e), !0;
                                                    var v = i(_, this._promise);
                                                    if (v instanceof e) {
                                                        v = v._target();
                                                        var y = v._bitField;
                                                        if (0 === (50397184 & y)) return u >= 1 && this._inFlight++, r[n] = v, v._proxy(this, -1 * (n + 1)), 
                                                        !1;
                                                        if (0 === (33554432 & y)) return 0 !== (16777216 & y) ? (this._reject(v._reason()), 
                                                        !0) : (this._cancel(), !0);
                                                        _ = v._value();
                                                    }
                                                    r[n] = _;
                                                }
                                                var m = ++this._totalResolved;
                                                return m >= o ? (null !== a ? this._filter(r, a) : this._resolve(r), !0) : !1;
                                            }, u.prototype._drainQueue = function() {
                                                for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e; ) {
                                                    if (this._isResolved()) return;
                                                    var r = t.pop();
                                                    this._promiseFulfilled(n[r], r);
                                                }
                                            }, u.prototype._filter = function(t, e) {
                                                for (var n = e.length, r = new Array(n), i = 0, o = 0; n > o; ++o) {
                                                    t[o] && (r[i++] = e[o]);
                                                }
                                                r.length = i, this._resolve(r);
                                            }, u.prototype.preservedValues = function() {
                                                return this._preservedValues;
                                            }, e.prototype.map = function(t, e) {
                                                return c(this, t, e, null);
                                            }, e.map = function(t, e, n, r) {
                                                return c(t, e, n, r);
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    19: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i, o) {
                                            var s = t("./util"), a = s.tryCatch;
                                            e.method = function(t) {
                                                if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + s.classString(t));
                                                return function() {
                                                    var r = new e(n);
                                                    r._captureStackTrace(), r._pushContext();
                                                    var i = a(t).apply(this, arguments);
                                                    return r._popContext(), r._resolveFromSyncValue(i), r;
                                                };
                                            }, e.attempt = e.try = function(t) {
                                                if ("function" != typeof t) return i("expecting a function but got " + s.classString(t));
                                                var r = new e(n);
                                                r._captureStackTrace(), r._pushContext();
                                                var u;
                                                if (arguments.length > 1) {
                                                    o.deprecated("calling Promise.try with more than 1 argument");
                                                    var c = arguments[1], l = arguments[2];
                                                    u = s.isArray(c) ? a(t).apply(l, c) : a(t).call(l, c);
                                                } else u = a(t)();
                                                return r._popContext(), r._resolveFromSyncValue(u), r;
                                            }, e.prototype._resolveFromSyncValue = function(t) {
                                                t === s.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0);
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    20: [ function(t, e, n) {
                                        "use strict";
                                        function r(t) {
                                            return t instanceof Error && l.getPrototypeOf(t) === Error.prototype;
                                        }
                                        function i(t) {
                                            var e;
                                            if (r(t)) {
                                                e = new c(t), e.name = t.name, e.message = t.message, e.stack = t.stack;
                                                for (var n = l.keys(t), i = 0; i < n.length; ++i) {
                                                    var o = n[i];
                                                    f.test(o) || (e[o] = t[o]);
                                                }
                                                return e;
                                            }
                                            return s.markAsOriginatingFromRejection(t), t;
                                        }
                                        function o(t, e) {
                                            return function(n, r) {
                                                if (null !== t) {
                                                    if (n) {
                                                        var o = i(a(n));
                                                        t._attachExtraTrace(o), t._reject(o);
                                                    } else if (e) {
                                                        var s = [].slice.call(arguments, 1);
                                                        t._fulfill(s);
                                                    } else t._fulfill(r);
                                                    t = null;
                                                }
                                            };
                                        }
                                        var s = t("./util"), a = s.maybeWrapAsError, u = t("./errors"), c = u.OperationalError, l = t("./es5"), f = /^(?:name|message|stack|cause)$/;
                                        e.exports = o;
                                    }, {
                                        "./errors": 12,
                                        "./es5": 13,
                                        "./util": 36
                                    } ],
                                    21: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e) {
                                            function n(t, e) {
                                                var n = this;
                                                if (!o.isArray(t)) return r.call(n, t, e);
                                                var i = a(e).apply(n._boundValue(), [ null ].concat(t));
                                                i === u && s.throwLater(i.e);
                                            }
                                            function r(t, e) {
                                                var n = this, r = n._boundValue(), i = void 0 === t ? a(e).call(r, null) : a(e).call(r, null, t);
                                                i === u && s.throwLater(i.e);
                                            }
                                            function i(t, e) {
                                                var n = this;
                                                if (!t) {
                                                    var r = new Error(t + "");
                                                    r.cause = t, t = r;
                                                }
                                                var i = a(e).call(n._boundValue(), t);
                                                i === u && s.throwLater(i.e);
                                            }
                                            var o = t("./util"), s = e._async, a = o.tryCatch, u = o.errorObj;
                                            e.prototype.asCallback = e.prototype.nodeify = function(t, e) {
                                                if ("function" == typeof t) {
                                                    var o = r;
                                                    void 0 !== e && Object(e).spread && (o = n), this._then(o, i, void 0, this, t);
                                                }
                                                return this;
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    22: [ function(t, e, r) {
                                        "use strict";
                                        e.exports = function() {
                                            function e() {}
                                            function r(t, e) {
                                                if ("function" != typeof e) throw new m("expecting a function but got " + p.classString(e));
                                                if (t.constructor !== i) throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                                            }
                                            function i(t) {
                                                this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, 
                                                this._promise0 = void 0, this._receiver0 = void 0, t !== b && (r(this, t), this._resolveFromExecutor(t)), 
                                                this._promiseCreated();
                                            }
                                            function o(t) {
                                                this.promise._resolveCallback(t);
                                            }
                                            function s(t) {
                                                this.promise._rejectCallback(t, !1);
                                            }
                                            function a(t) {
                                                var e = new i(b);
                                                e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t;
                                            }
                                            var u, c = function t() {
                                                return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
                                            }, l = function t() {
                                                return new i.PromiseInspection(this._target());
                                            }, f = function t(e) {
                                                return i.reject(new m(e));
                                            }, h = {}, p = t("./util");
                                            u = p.isNode ? function() {
                                                var t = n.domain;
                                                return void 0 === t && (t = null), t;
                                            } : function() {
                                                return null;
                                            }, p.notEnumerableProp(i, "_getDomain", u);
                                            var _ = t("./es5"), d = t("./async"), v = new d();
                                            _.defineProperty(i, "_async", {
                                                value: v
                                            });
                                            var y = t("./errors"), m = i.TypeError = y.TypeError;
                                            i.RangeError = y.RangeError;
                                            var g = i.CancellationError = y.CancellationError;
                                            i.TimeoutError = y.TimeoutError, i.OperationalError = y.OperationalError, i.RejectionError = y.OperationalError, 
                                            i.AggregateError = y.AggregateError;
                                            var b = function t() {}, w = {}, C = {}, j = t("./thenables")(i, b), F = t("./promise_array")(i, b, j, f, e), k = t("./context")(i), x = k.create, E = t("./debuggability")(i, k), T = (E.CapturedTrace, 
                                            t("./finally")(i, j)), P = t("./catch_filter")(C), R = t("./nodeback"), A = p.errorObj, S = p.tryCatch;
                                            return i.prototype.toString = function() {
                                                return "[object Promise]";
                                            }, i.prototype.caught = i.prototype.catch = function(t) {
                                                var e = arguments.length;
                                                if (e > 1) {
                                                    var n, r = new Array(e - 1), i = 0;
                                                    for (n = 0; e - 1 > n; ++n) {
                                                        var o = arguments[n];
                                                        if (!p.isObject(o)) return f("expecting an object but got " + p.classString(o));
                                                        r[i++] = o;
                                                    }
                                                    return r.length = i, t = arguments[n], this.then(void 0, P(r, t, this));
                                                }
                                                return this.then(void 0, t);
                                            }, i.prototype.reflect = function() {
                                                return this._then(l, l, void 0, this, void 0);
                                            }, i.prototype.then = function(t, e) {
                                                if (E.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
                                                    var n = ".then() only accepts functions but was passed: " + p.classString(t);
                                                    arguments.length > 1 && (n += ", " + p.classString(e)), this._warn(n);
                                                }
                                                return this._then(t, e, void 0, void 0, void 0);
                                            }, i.prototype.done = function(t, e) {
                                                var n = this._then(t, e, void 0, void 0, void 0);
                                                n._setIsFinal();
                                            }, i.prototype.spread = function(t) {
                                                return "function" != typeof t ? f("expecting a function but got " + p.classString(t)) : this.all()._then(t, void 0, void 0, w, void 0);
                                            }, i.prototype.toJSON = function() {
                                                var t = {
                                                    isFulfilled: !1,
                                                    isRejected: !1,
                                                    fulfillmentValue: void 0,
                                                    rejectionReason: void 0
                                                };
                                                return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), 
                                                t.isRejected = !0), t;
                                            }, i.prototype.all = function() {
                                                return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), 
                                                new F(this).promise();
                                            }, i.prototype.error = function(t) {
                                                return this.caught(p.originatesFromRejection, t);
                                            }, i.is = function(t) {
                                                return t instanceof i;
                                            }, i.fromNode = i.fromCallback = function(t) {
                                                var e = new i(b), n = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : !1, r = S(t)(R(e, n));
                                                return r === A && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), 
                                                e;
                                            }, i.all = function(t) {
                                                return new F(t).promise();
                                            }, i.cast = function(t) {
                                                var e = j(t);
                                                return e instanceof i || (e = new i(b), e._setFulfilled(), e._rejectionHandler0 = t), 
                                                e;
                                            }, i.resolve = i.fulfilled = i.cast, i.reject = i.rejected = function(t) {
                                                var e = new i(b);
                                                return e._captureStackTrace(), e._rejectCallback(t, !0), e;
                                            }, i.setScheduler = function(t) {
                                                if ("function" != typeof t) throw new m("expecting a function but got " + p.classString(t));
                                                var e = v._schedule;
                                                return v._schedule = t, e;
                                            }, i.prototype._then = function(t, e, n, r, o) {
                                                var s = void 0 !== o, a = s ? o : new i(b), c = this._target(), l = c._bitField;
                                                s || (a._propagateFrom(this, 3), a._captureStackTrace(), void 0 === r && 0 !== (2097152 & this._bitField) && (r = 0 !== (50397184 & l) ? this._boundValue() : c === this ? void 0 : this._boundTo));
                                                var f = u();
                                                if (0 !== (50397184 & l)) {
                                                    var h, p, _ = c._settlePromiseCtx;
                                                    0 !== (33554432 & l) ? (p = c._rejectionHandler0, h = t) : 0 !== (16777216 & l) ? (p = c._fulfillmentHandler0, 
                                                    h = e, c._unsetRejectionIsUnhandled()) : (_ = c._settlePromiseLateCancellationObserver, 
                                                    p = new g("late cancellation observer"), c._attachExtraTrace(p), h = e), v.invoke(_, c, {
                                                        handler: null === f ? h : "function" == typeof h && f.bind(h),
                                                        promise: a,
                                                        receiver: r,
                                                        value: p
                                                    });
                                                } else c._addCallbacks(t, e, a, r, f);
                                                return a;
                                            }, i.prototype._length = function() {
                                                return 65535 & this._bitField;
                                            }, i.prototype._isFateSealed = function() {
                                                return 0 !== (117506048 & this._bitField);
                                            }, i.prototype._isFollowing = function() {
                                                return 67108864 === (67108864 & this._bitField);
                                            }, i.prototype._setLength = function(t) {
                                                this._bitField = -65536 & this._bitField | 65535 & t;
                                            }, i.prototype._setFulfilled = function() {
                                                this._bitField = 33554432 | this._bitField;
                                            }, i.prototype._setRejected = function() {
                                                this._bitField = 16777216 | this._bitField;
                                            }, i.prototype._setFollowing = function() {
                                                this._bitField = 67108864 | this._bitField;
                                            }, i.prototype._setIsFinal = function() {
                                                this._bitField = 4194304 | this._bitField;
                                            }, i.prototype._isFinal = function() {
                                                return (4194304 & this._bitField) > 0;
                                            }, i.prototype._unsetCancelled = function() {
                                                this._bitField = -65537 & this._bitField;
                                            }, i.prototype._setCancelled = function() {
                                                this._bitField = 65536 | this._bitField;
                                            }, i.prototype._setAsyncGuaranteed = function() {
                                                this._bitField = 134217728 | this._bitField;
                                            }, i.prototype._receiverAt = function(t) {
                                                var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
                                                return e === h ? void 0 : void 0 === e && this._isBound() ? this._boundValue() : e;
                                            }, i.prototype._promiseAt = function(t) {
                                                return this[4 * t - 4 + 2];
                                            }, i.prototype._fulfillmentHandlerAt = function(t) {
                                                return this[4 * t - 4 + 0];
                                            }, i.prototype._rejectionHandlerAt = function(t) {
                                                return this[4 * t - 4 + 1];
                                            }, i.prototype._boundValue = function() {}, i.prototype._migrateCallback0 = function(t) {
                                                var e = (t._bitField, t._fulfillmentHandler0), n = t._rejectionHandler0, r = t._promise0, i = t._receiverAt(0);
                                                void 0 === i && (i = h), this._addCallbacks(e, n, r, i, null);
                                            }, i.prototype._migrateCallbackAt = function(t, e) {
                                                var n = t._fulfillmentHandlerAt(e), r = t._rejectionHandlerAt(e), i = t._promiseAt(e), o = t._receiverAt(e);
                                                void 0 === o && (o = h), this._addCallbacks(n, r, i, o, null);
                                            }, i.prototype._addCallbacks = function(t, e, n, r, i) {
                                                var o = this._length();
                                                if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = r, 
                                                "function" == typeof t && (this._fulfillmentHandler0 = null === i ? t : i.bind(t)), 
                                                "function" == typeof e && (this._rejectionHandler0 = null === i ? e : i.bind(e)); else {
                                                    var s = 4 * o - 4;
                                                    this[s + 2] = n, this[s + 3] = r, "function" == typeof t && (this[s + 0] = null === i ? t : i.bind(t)), 
                                                    "function" == typeof e && (this[s + 1] = null === i ? e : i.bind(e));
                                                }
                                                return this._setLength(o + 1), o;
                                            }, i.prototype._proxy = function(t, e) {
                                                this._addCallbacks(void 0, void 0, e, t, null);
                                            }, i.prototype._resolveCallback = function(t, e) {
                                                if (0 === (117506048 & this._bitField)) {
                                                    if (t === this) return this._rejectCallback(c(), !1);
                                                    var n = j(t, this);
                                                    if (!(n instanceof i)) return this._fulfill(t);
                                                    e && this._propagateFrom(n, 2);
                                                    var r = n._target(), o = r._bitField;
                                                    if (0 === (50397184 & o)) {
                                                        var s = this._length();
                                                        s > 0 && r._migrateCallback0(this);
                                                        for (var a = 1; s > a; ++a) {
                                                            r._migrateCallbackAt(this, a);
                                                        }
                                                        this._setFollowing(), this._setLength(0), this._setFollowee(r);
                                                    } else if (0 !== (33554432 & o)) this._fulfill(r._value()); else if (0 !== (16777216 & o)) this._reject(r._reason()); else {
                                                        var u = new g("late cancellation observer");
                                                        r._attachExtraTrace(u), this._reject(u);
                                                    }
                                                }
                                            }, i.prototype._rejectCallback = function(t, e) {
                                                var n = p.ensureErrorObject(t), r = n === t;
                                                if (!r && E.warnings()) {
                                                    var i = "a promise was rejected with a non-error: " + p.classString(t);
                                                    this._warn(i, !0);
                                                }
                                                this._attachExtraTrace(n, e ? r : !1), this._reject(t);
                                            }, i.prototype._resolveFromExecutor = function(t) {
                                                var e = this;
                                                this._captureStackTrace(), this._pushContext();
                                                var n = !0, r = this._execute(t, function(t) {
                                                    e._resolveCallback(t);
                                                }, function(t) {
                                                    e._rejectCallback(t, n);
                                                });
                                                n = !1, this._popContext(), void 0 !== r && e._rejectCallback(r, !0);
                                            }, i.prototype._settlePromiseFromHandler = function(t, e, n, r) {
                                                var i = r._bitField;
                                                if (0 === (65536 & i)) {
                                                    r._pushContext();
                                                    var o;
                                                    e === w ? n && "number" == typeof n.length ? o = S(t).apply(this._boundValue(), n) : (o = A, 
                                                    o.e = new m("cannot .spread() a non-array: " + p.classString(n))) : o = S(t).call(e, n);
                                                    var s = r._popContext();
                                                    if (i = r._bitField, 0 === (65536 & i)) if (o === C) r._reject(n); else if (o === A || o === r) {
                                                        var a = o === r ? c() : o.e;
                                                        r._rejectCallback(a, !1);
                                                    } else void 0 === o && s > 0 && E.longStackTraces() && E.warnings() && r._warn("a promise was created in a handler but none were returned from it", !0), 
                                                    r._resolveCallback(o);
                                                }
                                            }, i.prototype._target = function() {
                                                for (var t = this; t._isFollowing(); ) {
                                                    t = t._followee();
                                                }
                                                return t;
                                            }, i.prototype._followee = function() {
                                                return this._rejectionHandler0;
                                            }, i.prototype._setFollowee = function(t) {
                                                this._rejectionHandler0 = t;
                                            }, i.prototype._settlePromise = function(t, n, r, o) {
                                                var s = t instanceof i, a = this._bitField, u = 0 !== (134217728 & a);
                                                0 !== (65536 & a) ? (s && t._invokeInternalOnCancel(), n === T ? (r.cancelPromise = t, 
                                                S(n).call(r, o) === A && t._reject(A.e)) : n === l ? t._fulfill(l.call(r)) : r instanceof e ? r._promiseCancelled(t) : s || t instanceof F ? t._cancel() : r.cancel()) : "function" == typeof n ? s ? (u && t._setAsyncGuaranteed(), 
                                                this._settlePromiseFromHandler(n, r, o, t)) : n.call(r, o, t) : r instanceof e ? r._isResolved() || (0 !== (33554432 & a) ? r._promiseFulfilled(o, t) : r._promiseRejected(o, t)) : s && (u && t._setAsyncGuaranteed(), 
                                                0 !== (33554432 & a) ? t._fulfill(o) : t._reject(o));
                                            }, i.prototype._settlePromiseLateCancellationObserver = function(t) {
                                                var e = t.handler, n = t.promise, r = t.receiver, o = t.value;
                                                "function" == typeof e ? n instanceof i ? this._settlePromiseFromHandler(e, r, o, n) : e.call(r, o, n) : n instanceof i && n._reject(o);
                                            }, i.prototype._settlePromiseCtx = function(t) {
                                                this._settlePromise(t.promise, t.handler, t.receiver, t.value);
                                            }, i.prototype._settlePromise0 = function(t, e, n) {
                                                var r = this._promise0, i = this._receiverAt(0);
                                                this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, i, e);
                                            }, i.prototype._clearCallbackDataAtIndex = function(t) {
                                                var e = 4 * t - 4;
                                                this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0;
                                            }, i.prototype._fulfill = function(t) {
                                                var e = this._bitField;
                                                if (!((117506048 & e) >>> 16)) {
                                                    if (t === this) {
                                                        var n = c();
                                                        return this._attachExtraTrace(n), this._reject(n);
                                                    }
                                                    this._setFulfilled(), this._rejectionHandler0 = t, (65535 & e) > 0 && (0 !== (134217728 & e) ? this._settlePromises() : v.settlePromises(this));
                                                }
                                            }, i.prototype._reject = function(t) {
                                                var e = this._bitField;
                                                if (!((117506048 & e) >>> 16)) return this._setRejected(), this._fulfillmentHandler0 = t, 
                                                this._isFinal() ? v.fatalError(t, p.isNode) : void ((65535 & e) > 0 ? 0 !== (134217728 & e) ? this._settlePromises() : v.settlePromises(this) : this._ensurePossibleRejectionHandled());
                                            }, i.prototype._fulfillPromises = function(t, e) {
                                                for (var n = 1; t > n; n++) {
                                                    var r = this._fulfillmentHandlerAt(n), i = this._promiseAt(n), o = this._receiverAt(n);
                                                    this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
                                                }
                                            }, i.prototype._rejectPromises = function(t, e) {
                                                for (var n = 1; t > n; n++) {
                                                    var r = this._rejectionHandlerAt(n), i = this._promiseAt(n), o = this._receiverAt(n);
                                                    this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
                                                }
                                            }, i.prototype._settlePromises = function() {
                                                var t = this._bitField, e = 65535 & t;
                                                if (e > 0) {
                                                    if (0 !== (16842752 & t)) {
                                                        var n = this._fulfillmentHandler0;
                                                        this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n);
                                                    } else {
                                                        var r = this._rejectionHandler0;
                                                        this._settlePromise0(this._fulfillmentHandler0, r, t), this._fulfillPromises(e, r);
                                                    }
                                                    this._setLength(0);
                                                }
                                                this._clearCancellationData();
                                            }, i.prototype._settledValue = function() {
                                                var t = this._bitField;
                                                return 0 !== (33554432 & t) ? this._rejectionHandler0 : 0 !== (16777216 & t) ? this._fulfillmentHandler0 : void 0;
                                            }, i.defer = i.pending = function() {
                                                E.deprecated("Promise.defer", "new Promise");
                                                var t = new i(b);
                                                return {
                                                    promise: t,
                                                    resolve: o,
                                                    reject: s
                                                };
                                            }, p.notEnumerableProp(i, "_makeSelfResolutionError", c), t("./method")(i, b, j, f, E), 
                                            t("./bind")(i, b, j, E), t("./cancel")(i, F, f, E), t("./direct_resolve")(i), t("./synchronous_inspection")(i), 
                                            t("./join")(i, F, j, b, E), i.Promise = i, t("./map.js")(i, F, f, j, b, E), t("./using.js")(i, f, j, x, b, E), 
                                            t("./timers.js")(i, b), t("./generators.js")(i, f, b, j, e, E), t("./nodeify.js")(i), 
                                            t("./call_get.js")(i), t("./props.js")(i, F, j, f), t("./race.js")(i, b, j, f), 
                                            t("./reduce.js")(i, F, f, j, b, E), t("./settle.js")(i, F, E), t("./some.js")(i, F, f), 
                                            t("./promisify.js")(i, b), t("./any.js")(i), t("./each.js")(i, b), t("./filter.js")(i, b), 
                                            p.toFastProperties(i), p.toFastProperties(i.prototype), a({
                                                a: 1
                                            }), a({
                                                b: 2
                                            }), a({
                                                c: 3
                                            }), a(1), a(function() {}), a(void 0), a(!1), a(new i(b)), E.setBounds(d.firstLineError, p.lastLineError), 
                                            i;
                                        };
                                    }, {
                                        "./any.js": 1,
                                        "./async": 2,
                                        "./bind": 3,
                                        "./call_get.js": 5,
                                        "./cancel": 6,
                                        "./catch_filter": 7,
                                        "./context": 8,
                                        "./debuggability": 9,
                                        "./direct_resolve": 10,
                                        "./each.js": 11,
                                        "./errors": 12,
                                        "./es5": 13,
                                        "./filter.js": 14,
                                        "./finally": 15,
                                        "./generators.js": 16,
                                        "./join": 17,
                                        "./map.js": 18,
                                        "./method": 19,
                                        "./nodeback": 20,
                                        "./nodeify.js": 21,
                                        "./promise_array": 23,
                                        "./promisify.js": 24,
                                        "./props.js": 25,
                                        "./race.js": 27,
                                        "./reduce.js": 28,
                                        "./settle.js": 30,
                                        "./some.js": 31,
                                        "./synchronous_inspection": 32,
                                        "./thenables": 33,
                                        "./timers.js": 34,
                                        "./using.js": 35,
                                        "./util": 36
                                    } ],
                                    23: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i, o) {
                                            function s(t) {
                                                switch (t) {
                                                  case -2:
                                                    return [];

                                                  case -3:
                                                    return {};
                                                }
                                            }
                                            function a(t) {
                                                var r = this._promise = new e(n);
                                                t instanceof e && r._propagateFrom(t, 3), r._setOnCancel(this), this._values = t, 
                                                this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
                                            }
                                            var u = t("./util");
                                            u.isArray;
                                            return u.inherits(a, o), a.prototype.length = function() {
                                                return this._length;
                                            }, a.prototype.promise = function() {
                                                return this._promise;
                                            }, a.prototype._init = function t(n, o) {
                                                var a = r(this._values, this._promise);
                                                if (a instanceof e) {
                                                    a = a._target();
                                                    var c = a._bitField;
                                                    if (this._values = a, 0 === (50397184 & c)) return this._promise._setAsyncGuaranteed(), 
                                                    a._then(t, this._reject, void 0, this, o);
                                                    if (0 === (33554432 & c)) return 0 !== (16777216 & c) ? this._reject(a._reason()) : this._cancel();
                                                    a = a._value();
                                                }
                                                if (a = u.asArray(a), null === a) {
                                                    var l = i("expecting an array or an iterable object but got " + u.classString(a)).reason();
                                                    return void this._promise._rejectCallback(l, !1);
                                                }
                                                return 0 === a.length ? void (-5 === o ? this._resolveEmptyArray() : this._resolve(s(o))) : void this._iterate(a);
                                            }, a.prototype._iterate = function(t) {
                                                var n = this.getActualLength(t.length);
                                                this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;
                                                for (var i = this._promise, o = !1, s = null, a = 0; n > a; ++a) {
                                                    var u = r(t[a], i);
                                                    u instanceof e ? (u = u._target(), s = u._bitField) : s = null, o ? null !== s && u.suppressUnhandledRejections() : null !== s ? 0 === (50397184 & s) ? (u._proxy(this, a), 
                                                    this._values[a] = u) : o = 0 !== (33554432 & s) ? this._promiseFulfilled(u._value(), a) : 0 !== (16777216 & s) ? this._promiseRejected(u._reason(), a) : this._promiseCancelled(a) : o = this._promiseFulfilled(u, a);
                                                }
                                                o || i._setAsyncGuaranteed();
                                            }, a.prototype._isResolved = function() {
                                                return null === this._values;
                                            }, a.prototype._resolve = function(t) {
                                                this._values = null, this._promise._fulfill(t);
                                            }, a.prototype._cancel = function() {
                                                !this._isResolved() && this._promise.isCancellable() && (this._values = null, this._promise._cancel());
                                            }, a.prototype._reject = function(t) {
                                                this._values = null, this._promise._rejectCallback(t, !1);
                                            }, a.prototype._promiseFulfilled = function(t, e) {
                                                this._values[e] = t;
                                                var n = ++this._totalResolved;
                                                return n >= this._length ? (this._resolve(this._values), !0) : !1;
                                            }, a.prototype._promiseCancelled = function() {
                                                return this._cancel(), !0;
                                            }, a.prototype._promiseRejected = function(t) {
                                                return this._totalResolved++, this._reject(t), !0;
                                            }, a.prototype._resultCancelled = function() {
                                                if (!this._isResolved()) {
                                                    var t = this._values;
                                                    if (this._cancel(), t instanceof e) t.cancel(); else for (var n = 0; n < t.length; ++n) {
                                                        t[n] instanceof e && t[n].cancel();
                                                    }
                                                }
                                            }, a.prototype.shouldCopyValues = function() {
                                                return !0;
                                            }, a.prototype.getActualLength = function(t) {
                                                return t;
                                            }, a;
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    24: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n) {
                                            function r(t) {
                                                return !j.test(t);
                                            }
                                            function i(t) {
                                                try {
                                                    return t.__isPromisified__ === !0;
                                                } catch (t) {
                                                    return !1;
                                                }
                                            }
                                            function o(t, e, n) {
                                                var r = _.getDataPropertyOrDefault(t, e + n, w);
                                                return r ? i(r) : !1;
                                            }
                                            function s(t, e, n) {
                                                for (var r = 0; r < t.length; r += 2) {
                                                    var i = t[r];
                                                    if (n.test(i)) for (var o = i.replace(n, ""), s = 0; s < t.length; s += 2) {
                                                        if (t[s] === o) throw new g("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e));
                                                    }
                                                }
                                            }
                                            function u(t, e, n, r) {
                                                for (var a = _.inheritedDataKeys(t), u = [], c = 0; c < a.length; ++c) {
                                                    var l = a[c], f = t[l], h = r === F ? !0 : F(l, f, t);
                                                    "function" != typeof f || i(f) || o(t, l, e) || !r(l, f, t, h) || u.push(l, f);
                                                }
                                                return s(u, e, n), u;
                                            }
                                            function c(t, r, i, o, s, a) {
                                                function u() {
                                                    var i = r;
                                                    r === p && (i = this);
                                                    var o = new e(n);
                                                    o._captureStackTrace();
                                                    var s = "string" == typeof l && this !== c ? this[l] : t, u = d(o, a);
                                                    try {
                                                        s.apply(i, v(arguments, u));
                                                    } catch (t) {
                                                        o._rejectCallback(y(t), !0);
                                                    }
                                                    return o._isFateSealed() || o._setAsyncGuaranteed(), o;
                                                }
                                                var c = function() {
                                                    return this;
                                                }(), l = t;
                                                return "string" == typeof l && (t = o), _.notEnumerableProp(u, "__isPromisified__", !0), 
                                                u;
                                            }
                                            function l(t, e, n, r, i) {
                                                for (var o = new RegExp(k(e) + "$"), s = u(t, e, o, n), a = 0, c = s.length; c > a; a += 2) {
                                                    var l = s[a], f = s[a + 1], h = l + e;
                                                    if (r === x) t[h] = x(l, p, l, f, e, i); else {
                                                        var d = r(f, function() {
                                                            return x(l, p, l, f, e, i);
                                                        });
                                                        _.notEnumerableProp(d, "__isPromisified__", !0), t[h] = d;
                                                    }
                                                }
                                                return _.toFastProperties(t), t;
                                            }
                                            function f(t, e, n) {
                                                return x(t, e, void 0, t, null, n);
                                            }
                                            var h, p = {}, _ = t("./util"), d = t("./nodeback"), v = _.withAppended, y = _.maybeWrapAsError, m = _.canEvaluate, g = t("./errors").TypeError, b = "Async", w = {
                                                __isPromisified__: !0
                                            }, C = [ "arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__" ], j = new RegExp("^(?:" + C.join("|") + ")$"), F = function t(e) {
                                                return _.isIdentifier(e) && "_" !== e.charAt(0) && "constructor" !== e;
                                            }, k = function t(e) {
                                                return e.replace(/([$])/, "\\$");
                                            }, x = m ? h : c;
                                            e.promisify = function(t, e) {
                                                if ("function" != typeof t) throw new g("expecting a function but got " + _.classString(t));
                                                if (i(t)) return t;
                                                e = Object(e);
                                                var n = void 0 === e.context ? p : e.context, o = !!e.multiArgs, s = f(t, n, o);
                                                return _.copyDescriptors(t, s, r), s;
                                            }, e.promisifyAll = function(t, e) {
                                                if ("function" != typeof t && "object" != (typeof t === "undefined" ? "undefined" : a(t))) throw new g("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                                                e = Object(e);
                                                var n = !!e.multiArgs, r = e.suffix;
                                                "string" != typeof r && (r = b);
                                                var i = e.filter;
                                                "function" != typeof i && (i = F);
                                                var o = e.promisifier;
                                                if ("function" != typeof o && (o = x), !_.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                                                for (var s = _.inheritedDataKeys(t), u = 0; u < s.length; ++u) {
                                                    var c = t[s[u]];
                                                    "constructor" !== s[u] && _.isClass(c) && (l(c.prototype, r, i, o, n), l(c, r, i, o, n));
                                                }
                                                return l(t, r, i, o, n);
                                            };
                                        };
                                    }, {
                                        "./errors": 12,
                                        "./nodeback": 20,
                                        "./util": 36
                                    } ],
                                    25: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i) {
                                            function o(t) {
                                                var e, n = !1;
                                                if (void 0 !== a && t instanceof a) e = f(t), n = !0; else {
                                                    var r = l.keys(t), i = r.length;
                                                    e = new Array(2 * i);
                                                    for (var o = 0; i > o; ++o) {
                                                        var s = r[o];
                                                        e[o] = t[s], e[o + i] = s;
                                                    }
                                                }
                                                this.constructor$(e), this._isMap = n, this._init$(void 0, -3);
                                            }
                                            function s(t) {
                                                var n, s = r(t);
                                                return c(s) ? (n = s instanceof e ? s._then(e.props, void 0, void 0, void 0, void 0) : new o(s).promise(), 
                                                s instanceof e && n._propagateFrom(s, 2), n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
                                            }
                                            var a, u = t("./util"), c = u.isObject, l = t("./es5");
                                            "function" == typeof Map && (a = Map);
                                            var f = function() {
                                                function t(t, r) {
                                                    this[e] = t, this[e + n] = r, e++;
                                                }
                                                var e = 0, n = 0;
                                                return function(r) {
                                                    n = r.size, e = 0;
                                                    var i = new Array(2 * r.size);
                                                    return r.forEach(t, i), i;
                                                };
                                            }(), h = function t(e) {
                                                for (var n = new a(), r = e.length / 2 | 0, i = 0; r > i; ++i) {
                                                    var o = e[r + i], s = e[i];
                                                    n.set(o, s);
                                                }
                                                return n;
                                            };
                                            u.inherits(o, n), o.prototype._init = function() {}, o.prototype._promiseFulfilled = function(t, e) {
                                                this._values[e] = t;
                                                var n = ++this._totalResolved;
                                                if (n >= this._length) {
                                                    var r;
                                                    if (this._isMap) r = h(this._values); else {
                                                        r = {};
                                                        for (var i = this.length(), o = 0, s = this.length(); s > o; ++o) {
                                                            r[this._values[o + i]] = this._values[o];
                                                        }
                                                    }
                                                    return this._resolve(r), !0;
                                                }
                                                return !1;
                                            }, o.prototype.shouldCopyValues = function() {
                                                return !1;
                                            }, o.prototype.getActualLength = function(t) {
                                                return t >> 1;
                                            }, e.prototype.props = function() {
                                                return s(this);
                                            }, e.props = function(t) {
                                                return s(t);
                                            };
                                        };
                                    }, {
                                        "./es5": 13,
                                        "./util": 36
                                    } ],
                                    26: [ function(t, e, n) {
                                        "use strict";
                                        function r(t, e, n, r, i) {
                                            for (var o = 0; i > o; ++o) {
                                                n[o + r] = t[o + e], t[o + e] = void 0;
                                            }
                                        }
                                        function i(t) {
                                            this._capacity = t, this._length = 0, this._front = 0;
                                        }
                                        i.prototype._willBeOverCapacity = function(t) {
                                            return this._capacity < t;
                                        }, i.prototype._pushOne = function(t) {
                                            var e = this.length();
                                            this._checkCapacity(e + 1);
                                            var n = this._front + e & this._capacity - 1;
                                            this[n] = t, this._length = e + 1;
                                        }, i.prototype._unshiftOne = function(t) {
                                            var e = this._capacity;
                                            this._checkCapacity(this.length() + 1);
                                            var n = this._front, r = (n - 1 & e - 1 ^ e) - e;
                                            this[r] = t, this._front = r, this._length = this.length() + 1;
                                        }, i.prototype.unshift = function(t, e, n) {
                                            this._unshiftOne(n), this._unshiftOne(e), this._unshiftOne(t);
                                        }, i.prototype.push = function(t, e, n) {
                                            var r = this.length() + 3;
                                            if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
                                            var i = this._front + r - 3;
                                            this._checkCapacity(r);
                                            var o = this._capacity - 1;
                                            this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r;
                                        }, i.prototype.shift = function() {
                                            var t = this._front, e = this[t];
                                            return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, 
                                            e;
                                        }, i.prototype.length = function() {
                                            return this._length;
                                        }, i.prototype._checkCapacity = function(t) {
                                            this._capacity < t && this._resizeTo(this._capacity << 1);
                                        }, i.prototype._resizeTo = function(t) {
                                            var e = this._capacity;
                                            this._capacity = t;
                                            var n = this._front, i = this._length, o = n + i & e - 1;
                                            r(this, 0, this, e, o);
                                        }, e.exports = i;
                                    }, {} ],
                                    27: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i) {
                                            function o(t, o) {
                                                var u = r(t);
                                                if (u instanceof e) return a(u);
                                                if (t = s.asArray(t), null === t) return i("expecting an array or an iterable object but got " + s.classString(t));
                                                var c = new e(n);
                                                void 0 !== o && c._propagateFrom(o, 3);
                                                for (var l = c._fulfill, f = c._reject, h = 0, p = t.length; p > h; ++h) {
                                                    var _ = t[h];
                                                    (void 0 !== _ || h in t) && e.cast(_)._then(l, f, void 0, c, null);
                                                }
                                                return c;
                                            }
                                            var s = t("./util"), a = function t(e) {
                                                return e.then(function(t) {
                                                    return o(t, e);
                                                });
                                            };
                                            e.race = function(t) {
                                                return o(t, void 0);
                                            }, e.prototype.race = function() {
                                                return o(this, void 0);
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    28: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i, o, s) {
                                            function a(t, n, r, i) {
                                                this.constructor$(t);
                                                var s = h();
                                                this._fn = null === s ? n : s.bind(n), void 0 !== r && (r = e.resolve(r), r._attachCancellationCallback(this)), 
                                                this._initialValue = r, this._currentCancellable = null, this._eachValues = i === o ? [] : void 0, 
                                                this._promise._captureStackTrace(), this._init$(void 0, -5);
                                            }
                                            function u(t, e) {
                                                this.isFulfilled() ? e._resolve(t) : e._reject(t);
                                            }
                                            function c(t, e, n, i) {
                                                if ("function" != typeof e) return r("expecting a function but got " + p.classString(e));
                                                var o = new a(t, e, n, i);
                                                return o.promise();
                                            }
                                            function l(t) {
                                                this.accum = t, this.array._gotAccum(t);
                                                var n = i(this.value, this.array._promise);
                                                return n instanceof e ? (this.array._currentCancellable = n, n._then(f, void 0, void 0, this, void 0)) : f.call(this, n);
                                            }
                                            function f(t) {
                                                var n = this.array, r = n._promise, i = _(n._fn);
                                                r._pushContext();
                                                var o;
                                                o = void 0 !== n._eachValues ? i.call(r._boundValue(), t, this.index, this.length) : i.call(r._boundValue(), this.accum, t, this.index, this.length), 
                                                o instanceof e && (n._currentCancellable = o);
                                                var a = r._popContext();
                                                return s.checkForgottenReturns(o, a, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r), 
                                                o;
                                            }
                                            var h = e._getDomain, p = t("./util"), _ = p.tryCatch;
                                            p.inherits(a, n), a.prototype._gotAccum = function(t) {
                                                void 0 !== this._eachValues && t !== o && this._eachValues.push(t);
                                            }, a.prototype._eachComplete = function(t) {
                                                return this._eachValues.push(t), this._eachValues;
                                            }, a.prototype._init = function() {}, a.prototype._resolveEmptyArray = function() {
                                                this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
                                            }, a.prototype.shouldCopyValues = function() {
                                                return !1;
                                            }, a.prototype._resolve = function(t) {
                                                this._promise._resolveCallback(t), this._values = null;
                                            }, a.prototype._resultCancelled = function(t) {
                                                return t === this._initialValue ? this._cancel() : void (this._isResolved() || (this._resultCancelled$(), 
                                                this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel()));
                                            }, a.prototype._iterate = function(t) {
                                                this._values = t;
                                                var n, r, i = t.length;
                                                if (void 0 !== this._initialValue ? (n = this._initialValue, r = 0) : (n = e.resolve(t[0]), 
                                                r = 1), this._currentCancellable = n, !n.isRejected()) for (;i > r; ++r) {
                                                    var o = {
                                                        accum: null,
                                                        value: t[r],
                                                        index: r,
                                                        length: i,
                                                        array: this
                                                    };
                                                    n = n._then(l, void 0, void 0, o, void 0);
                                                }
                                                void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), 
                                                n._then(u, u, void 0, n, this);
                                            }, e.prototype.reduce = function(t, e) {
                                                return c(this, t, e, null);
                                            }, e.reduce = function(t, e, n, r) {
                                                return c(t, e, n, r);
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    29: [ function(t, e, i) {
                                        "use strict";
                                        var o, s = t("./util"), a = function t() {
                                            throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                                        };
                                        if (s.isNode && "undefined" == typeof MutationObserver) {
                                            var u = r.setImmediate, c = n.nextTick;
                                            o = s.isRecentNode ? function(t) {
                                                u.call(r, t);
                                            } : function(t) {
                                                c.call(n, t);
                                            };
                                        } else "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && window.navigator.standalone ? o = "undefined" != typeof setImmediate ? function(t) {
                                            setImmediate(t);
                                        } : "undefined" != typeof setTimeout ? function(t) {
                                            setTimeout(t, 0);
                                        } : a : (o = function t(e) {
                                            var n = document.createElement("div"), r = new MutationObserver(e);
                                            return r.observe(n, {
                                                attributes: !0
                                            }), function() {
                                                n.classList.toggle("foo");
                                            };
                                        }, o.isStatic = !0);
                                        e.exports = o;
                                    }, {
                                        "./util": 36
                                    } ],
                                    30: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r) {
                                            function i(t) {
                                                this.constructor$(t);
                                            }
                                            var o = e.PromiseInspection, s = t("./util");
                                            s.inherits(i, n), i.prototype._promiseResolved = function(t, e) {
                                                this._values[t] = e;
                                                var n = ++this._totalResolved;
                                                return n >= this._length ? (this._resolve(this._values), !0) : !1;
                                            }, i.prototype._promiseFulfilled = function(t, e) {
                                                var n = new o();
                                                return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n);
                                            }, i.prototype._promiseRejected = function(t, e) {
                                                var n = new o();
                                                return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n);
                                            }, e.settle = function(t) {
                                                return r.deprecated(".settle()", ".reflect()"), new i(t).promise();
                                            }, e.prototype.settle = function() {
                                                return e.settle(this);
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    31: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r) {
                                            function i(t) {
                                                this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
                                            }
                                            function o(t, e) {
                                                if ((0 | e) !== e || 0 > e) return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                                                var n = new i(t), o = n.promise();
                                                return n.setHowMany(e), n.init(), o;
                                            }
                                            var s = t("./util"), a = t("./errors").RangeError, u = t("./errors").AggregateError, c = s.isArray, l = {};
                                            s.inherits(i, n), i.prototype._init = function() {
                                                if (this._initialized) {
                                                    if (0 === this._howMany) return void this._resolve([]);
                                                    this._init$(void 0, -5);
                                                    var t = c(this._values);
                                                    !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
                                                }
                                            }, i.prototype.init = function() {
                                                this._initialized = !0, this._init();
                                            }, i.prototype.setUnwrap = function() {
                                                this._unwrap = !0;
                                            }, i.prototype.howMany = function() {
                                                return this._howMany;
                                            }, i.prototype.setHowMany = function(t) {
                                                this._howMany = t;
                                            }, i.prototype._promiseFulfilled = function(t) {
                                                return this._addFulfilled(t), this._fulfilled() === this.howMany() ? (this._values.length = this.howMany(), 
                                                1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), 
                                                !0) : !1;
                                            }, i.prototype._promiseRejected = function(t) {
                                                return this._addRejected(t), this._checkOutcome();
                                            }, i.prototype._promiseCancelled = function() {
                                                return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(l), 
                                                this._checkOutcome());
                                            }, i.prototype._checkOutcome = function() {
                                                if (this.howMany() > this._canPossiblyFulfill()) {
                                                    for (var t = new u(), e = this.length(); e < this._values.length; ++e) {
                                                        this._values[e] !== l && t.push(this._values[e]);
                                                    }
                                                    return t.length > 0 ? this._reject(t) : this._cancel(), !0;
                                                }
                                                return !1;
                                            }, i.prototype._fulfilled = function() {
                                                return this._totalResolved;
                                            }, i.prototype._rejected = function() {
                                                return this._values.length - this.length();
                                            }, i.prototype._addRejected = function(t) {
                                                this._values.push(t);
                                            }, i.prototype._addFulfilled = function(t) {
                                                this._values[this._totalResolved++] = t;
                                            }, i.prototype._canPossiblyFulfill = function() {
                                                return this.length() - this._rejected();
                                            }, i.prototype._getRangeError = function(t) {
                                                var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
                                                return new a(e);
                                            }, i.prototype._resolveEmptyArray = function() {
                                                this._reject(this._getRangeError(0));
                                            }, e.some = function(t, e) {
                                                return o(t, e);
                                            }, e.prototype.some = function(t) {
                                                return o(this, t);
                                            }, e._SomePromiseArray = i;
                                        };
                                    }, {
                                        "./errors": 12,
                                        "./util": 36
                                    } ],
                                    32: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(t) {
                                            function e(t) {
                                                void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, 
                                                this._settledValueField = void 0);
                                            }
                                            e.prototype._settledValue = function() {
                                                return this._settledValueField;
                                            };
                                            var n = e.prototype.value = function() {
                                                if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                                                return this._settledValue();
                                            }, r = e.prototype.error = e.prototype.reason = function() {
                                                if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                                                return this._settledValue();
                                            }, i = e.prototype.isFulfilled = function() {
                                                return 0 !== (33554432 & this._bitField);
                                            }, o = e.prototype.isRejected = function() {
                                                return 0 !== (16777216 & this._bitField);
                                            }, s = e.prototype.isPending = function() {
                                                return 0 === (50397184 & this._bitField);
                                            }, a = e.prototype.isResolved = function() {
                                                return 0 !== (50331648 & this._bitField);
                                            };
                                            e.prototype.isCancelled = t.prototype._isCancelled = function() {
                                                return 65536 === (65536 & this._bitField);
                                            }, t.prototype.isCancelled = function() {
                                                return this._target()._isCancelled();
                                            }, t.prototype.isPending = function() {
                                                return s.call(this._target());
                                            }, t.prototype.isRejected = function() {
                                                return o.call(this._target());
                                            }, t.prototype.isFulfilled = function() {
                                                return i.call(this._target());
                                            }, t.prototype.isResolved = function() {
                                                return a.call(this._target());
                                            }, t.prototype.value = function() {
                                                return n.call(this._target());
                                            }, t.prototype.reason = function() {
                                                var t = this._target();
                                                return t._unsetRejectionIsUnhandled(), r.call(t);
                                            }, t.prototype._value = function() {
                                                return this._settledValue();
                                            }, t.prototype._reason = function() {
                                                return this._unsetRejectionIsUnhandled(), this._settledValue();
                                            }, t.PromiseInspection = e;
                                        };
                                    }, {} ],
                                    33: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n) {
                                            function r(t, r) {
                                                if (l(t)) {
                                                    if (t instanceof e) return t;
                                                    var i = o(t);
                                                    if (i === c) {
                                                        r && r._pushContext();
                                                        var u = e.reject(i.e);
                                                        return r && r._popContext(), u;
                                                    }
                                                    if ("function" == typeof i) {
                                                        if (s(t)) {
                                                            var u = new e(n);
                                                            return t._then(u._fulfill, u._reject, void 0, u, null), u;
                                                        }
                                                        return a(t, i, r);
                                                    }
                                                }
                                                return t;
                                            }
                                            function i(t) {
                                                return t.then;
                                            }
                                            function o(t) {
                                                try {
                                                    return i(t);
                                                } catch (t) {
                                                    return c.e = t, c;
                                                }
                                            }
                                            function s(t) {
                                                return f.call(t, "_promise0");
                                            }
                                            function a(t, r, i) {
                                                function o(t) {
                                                    a && (a._resolveCallback(t), a = null);
                                                }
                                                function s(t) {
                                                    a && (a._rejectCallback(t, f), a = null);
                                                }
                                                var a = new e(n), l = a;
                                                i && i._pushContext(), a._captureStackTrace(), i && i._popContext();
                                                var f = !0, h = u.tryCatch(r).call(t, o, s);
                                                return f = !1, a && h === c && (a._rejectCallback(h.e, !0), a = null), l;
                                            }
                                            var u = t("./util"), c = u.errorObj, l = u.isObject, f = {}.hasOwnProperty;
                                            return r;
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    34: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n) {
                                            function r(t) {
                                                var e = this;
                                                return e instanceof Number && (e = +e), clearTimeout(e), t;
                                            }
                                            function i(t) {
                                                var e = this;
                                                throw e instanceof Number && (e = +e), clearTimeout(e), t;
                                            }
                                            var o = t("./util"), s = e.TimeoutError, a = function t(e, n) {
                                                if (e.isPending()) {
                                                    var r;
                                                    r = "string" != typeof n ? n instanceof Error ? n : new s("operation timed out") : new s(n), 
                                                    o.markAsOriginatingFromRejection(r), e._attachExtraTrace(r), e._reject(r);
                                                }
                                            }, u = function t(e) {
                                                return c(+this).thenReturn(e);
                                            }, c = e.delay = function(t, r) {
                                                var i;
                                                return void 0 !== r ? i = e.resolve(r)._then(u, null, null, t, void 0) : (i = new e(n), 
                                                setTimeout(function() {
                                                    i._fulfill();
                                                }, +t)), i._setAsyncGuaranteed(), i;
                                            };
                                            e.prototype.delay = function(t) {
                                                return c(t, this);
                                            }, e.prototype.timeout = function(t, e) {
                                                t = +t;
                                                var n = this.then(), o = setTimeout(function() {
                                                    a(n, e);
                                                }, t);
                                                return n._then(r, i, void 0, o, void 0);
                                            };
                                        };
                                    }, {
                                        "./util": 36
                                    } ],
                                    35: [ function(t, e, n) {
                                        "use strict";
                                        e.exports = function(e, n, r, i, o, s) {
                                            function a(t) {
                                                setTimeout(function() {
                                                    throw t;
                                                }, 0);
                                            }
                                            function u(t) {
                                                var e = r(t);
                                                return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), 
                                                e;
                                            }
                                            function c(t, n) {
                                                function i() {
                                                    if (s >= c) return l._fulfill();
                                                    var o = u(t[s++]);
                                                    if (o instanceof e && o._isDisposable()) {
                                                        try {
                                                            o = r(o._getDisposer().tryDispose(n), t.promise);
                                                        } catch (t) {
                                                            return a(t);
                                                        }
                                                        if (o instanceof e) return o._then(i, a, null, null, null);
                                                    }
                                                    i();
                                                }
                                                var s = 0, c = t.length, l = new e(o);
                                                return i(), l;
                                            }
                                            function l(t, e, n) {
                                                this._data = t, this._promise = e, this._context = n;
                                            }
                                            function f(t, e, n) {
                                                this.constructor$(t, e, n);
                                            }
                                            function h(t) {
                                                return l.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t;
                                            }
                                            function p(t) {
                                                this.length = t, this.promise = null, this[t - 1] = null;
                                            }
                                            var _ = t("./util"), d = t("./errors").TypeError, v = t("./util").inherits, y = _.errorObj, m = _.tryCatch;
                                            l.prototype.data = function() {
                                                return this._data;
                                            }, l.prototype.promise = function() {
                                                return this._promise;
                                            }, l.prototype.resource = function() {
                                                return this.promise().isFulfilled() ? this.promise().value() : null;
                                            }, l.prototype.tryDispose = function(t) {
                                                var e = this.resource(), n = this._context;
                                                void 0 !== n && n._pushContext();
                                                var r = null !== e ? this.doDispose(e, t) : null;
                                                return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, 
                                                r;
                                            }, l.isDisposer = function(t) {
                                                return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose;
                                            }, v(f, l), f.prototype.doDispose = function(t, e) {
                                                var n = this.data();
                                                return n.call(t, t, e);
                                            }, p.prototype._resultCancelled = function() {
                                                for (var t = this.length, n = 0; t > n; ++n) {
                                                    var r = this[n];
                                                    r instanceof e && r.cancel();
                                                }
                                            }, e.using = function() {
                                                var t = arguments.length;
                                                if (2 > t) return n("you must pass at least 2 arguments to Promise.using");
                                                var i = arguments[t - 1];
                                                if ("function" != typeof i) return n("expecting a function but got " + _.classString(i));
                                                var o, a = !0;
                                                2 === t && Array.isArray(arguments[0]) ? (o = arguments[0], t = o.length, a = !1) : (o = arguments, 
                                                t--);
                                                for (var u = new p(t), f = 0; t > f; ++f) {
                                                    var d = o[f];
                                                    if (l.isDisposer(d)) {
                                                        var v = d;
                                                        d = d.promise(), d._setDisposable(v);
                                                    } else {
                                                        var g = r(d);
                                                        g instanceof e && (d = g._then(h, null, null, {
                                                            resources: u,
                                                            index: f
                                                        }, void 0));
                                                    }
                                                    u[f] = d;
                                                }
                                                for (var b = new Array(u.length), f = 0; f < b.length; ++f) {
                                                    b[f] = e.resolve(u[f]).reflect();
                                                }
                                                var w = e.all(b).then(function(t) {
                                                    for (var e = 0; e < t.length; ++e) {
                                                        var n = t[e];
                                                        if (n.isRejected()) return y.e = n.error(), y;
                                                        if (!n.isFulfilled()) return void w.cancel();
                                                        t[e] = n.value();
                                                    }
                                                    C._pushContext(), i = m(i);
                                                    var r = a ? i.apply(void 0, t) : i(t), o = C._popContext();
                                                    return s.checkForgottenReturns(r, o, "Promise.using", C), r;
                                                }), C = w.lastly(function() {
                                                    var t = new e.PromiseInspection(w);
                                                    return c(u, t);
                                                });
                                                return u.promise = C, C._setOnCancel(u), C;
                                            }, e.prototype._setDisposable = function(t) {
                                                this._bitField = 131072 | this._bitField, this._disposer = t;
                                            }, e.prototype._isDisposable = function() {
                                                return (131072 & this._bitField) > 0;
                                            }, e.prototype._getDisposer = function() {
                                                return this._disposer;
                                            }, e.prototype._unsetDisposable = function() {
                                                this._bitField = -131073 & this._bitField, this._disposer = void 0;
                                            }, e.prototype.disposer = function(t) {
                                                if ("function" == typeof t) return new f(t, this, i());
                                                throw new d();
                                            };
                                        };
                                    }, {
                                        "./errors": 12,
                                        "./util": 36
                                    } ],
                                    36: [ function(t, e, r) {
                                        "use strict";
                                        function i() {
                                            try {
                                                var t = T;
                                                return T = null, t.apply(this, arguments);
                                            } catch (t) {
                                                return E.e = t, E;
                                            }
                                        }
                                        function o(t) {
                                            return T = t, i;
                                        }
                                        function s(t) {
                                            return null == t || t === !0 || t === !1 || "string" == typeof t || "number" == typeof t;
                                        }
                                        function u(t) {
                                            return "function" == typeof t || "object" == (typeof t === "undefined" ? "undefined" : a(t)) && null !== t;
                                        }
                                        function c(t) {
                                            return s(t) ? new Error(m(t)) : t;
                                        }
                                        function l(t, e) {
                                            var n, r = t.length, i = new Array(r + 1);
                                            for (n = 0; r > n; ++n) {
                                                i[n] = t[n];
                                            }
                                            return i[n] = e, i;
                                        }
                                        function f(t, e, n) {
                                            if (!k.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                                            var r = Object.getOwnPropertyDescriptor(t, e);
                                            return null != r ? null == r.get && null == r.set ? r.value : n : void 0;
                                        }
                                        function h(t, e, n) {
                                            if (s(t)) return t;
                                            var r = {
                                                value: n,
                                                configurable: !0,
                                                enumerable: !1,
                                                writable: !0
                                            };
                                            return k.defineProperty(t, e, r), t;
                                        }
                                        function p(t) {
                                            throw t;
                                        }
                                        function _(t) {
                                            try {
                                                if ("function" == typeof t) {
                                                    var e = k.names(t.prototype), n = k.isES5 && e.length > 1, r = e.length > 0 && !(1 === e.length && "constructor" === e[0]), i = A.test(t + "") && k.names(t).length > 0;
                                                    if (n || r || i) return !0;
                                                }
                                                return !1;
                                            } catch (t) {
                                                return !1;
                                            }
                                        }
                                        function d(t) {
                                            function e() {}
                                            e.prototype = t;
                                            for (var n = 8; n--; ) {
                                                new e();
                                            }
                                            return t;
                                        }
                                        function v(t) {
                                            return S.test(t);
                                        }
                                        function y(t, e, n) {
                                            for (var r = new Array(t), i = 0; t > i; ++i) {
                                                r[i] = e + i + n;
                                            }
                                            return r;
                                        }
                                        function m(t) {
                                            try {
                                                return t + "";
                                            } catch (t) {
                                                return "[no string representation]";
                                            }
                                        }
                                        function g(t) {
                                            try {
                                                h(t, "isOperational", !0);
                                            } catch (t) {}
                                        }
                                        function b(t) {
                                            return null == t ? !1 : t instanceof Error.__BluebirdErrorTypes__.OperationalError || t.isOperational === !0;
                                        }
                                        function w(t) {
                                            return t instanceof Error && k.propertyIsWritable(t, "stack");
                                        }
                                        function C(t) {
                                            return {}.toString.call(t);
                                        }
                                        function j(t, e, n) {
                                            for (var r = k.names(t), i = 0; i < r.length; ++i) {
                                                var o = r[i];
                                                if (n(o)) try {
                                                    k.defineProperty(e, o, k.getDescriptor(t, o));
                                                } catch (t) {}
                                            }
                                        }
                                        function F(t, e) {
                                            return V ? n.env[t] : e;
                                        }
                                        var k = t("./es5"), x = "undefined" == typeof navigator, E = {
                                            e: {}
                                        }, T, P = function t(e, n) {
                                            function r() {
                                                this.constructor = e, this.constructor$ = n;
                                                for (var t in n.prototype) {
                                                    i.call(n.prototype, t) && "$" !== t.charAt(t.length - 1) && (this[t + "$"] = n.prototype[t]);
                                                }
                                            }
                                            var i = {}.hasOwnProperty;
                                            return r.prototype = n.prototype, e.prototype = new r(), e.prototype;
                                        }, R = function() {
                                            var t = [ Array.prototype, Object.prototype, Function.prototype ], e = function e(n) {
                                                for (var r = 0; r < t.length; ++r) {
                                                    if (t[r] === n) return !0;
                                                }
                                                return !1;
                                            };
                                            if (k.isES5) {
                                                var n = Object.getOwnPropertyNames;
                                                return function(t) {
                                                    for (var r = [], i = Object.create(null); null != t && !e(t); ) {
                                                        var o;
                                                        try {
                                                            o = n(t);
                                                        } catch (t) {
                                                            return r;
                                                        }
                                                        for (var s = 0; s < o.length; ++s) {
                                                            var a = o[s];
                                                            if (!i[a]) {
                                                                i[a] = !0;
                                                                var u = Object.getOwnPropertyDescriptor(t, a);
                                                                null != u && null == u.get && null == u.set && r.push(a);
                                                            }
                                                        }
                                                        t = k.getPrototypeOf(t);
                                                    }
                                                    return r;
                                                };
                                            }
                                            var r = {}.hasOwnProperty;
                                            return function(n) {
                                                if (e(n)) return [];
                                                var i = [];
                                                t: for (var o in n) {
                                                    if (r.call(n, o)) i.push(o); else {
                                                        for (var s = 0; s < t.length; ++s) {
                                                            if (r.call(t[s], o)) continue t;
                                                        }
                                                        i.push(o);
                                                    }
                                                }
                                                return i;
                                            };
                                        }(), A = /this\s*\.\s*\S+\s*=/, S = /^[a-z$_][a-z$_0-9]*$/i, O = function() {
                                            return "stack" in new Error() ? function(t) {
                                                return w(t) ? t : new Error(m(t));
                                            } : function(t) {
                                                if (w(t)) return t;
                                                try {
                                                    throw new Error(m(t));
                                                } catch (t) {
                                                    return t;
                                                }
                                            };
                                        }(), I = function t(e) {
                                            return k.isArray(e) ? e : null;
                                        };
                                        if ("undefined" != typeof Symbol && Symbol.iterator) {
                                            var D = "function" == typeof Array.from ? function(t) {
                                                return Array.from(t);
                                            } : function(t) {
                                                for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done; ) {
                                                    n.push(e.value);
                                                }
                                                return n;
                                            };
                                            I = function t(e) {
                                                return k.isArray(e) ? e : null != e && "function" == typeof e[Symbol.iterator] ? D(e) : null;
                                            };
                                        }
                                        var V = "undefined" != typeof n && "[object process]" === C(n).toLowerCase(), H = {
                                            isClass: _,
                                            isIdentifier: v,
                                            inheritedDataKeys: R,
                                            getDataPropertyOrDefault: f,
                                            thrower: p,
                                            isArray: k.isArray,
                                            asArray: I,
                                            notEnumerableProp: h,
                                            isPrimitive: s,
                                            isObject: u,
                                            canEvaluate: x,
                                            errorObj: E,
                                            tryCatch: o,
                                            inherits: P,
                                            withAppended: l,
                                            maybeWrapAsError: c,
                                            toFastProperties: d,
                                            filledRange: y,
                                            toString: m,
                                            canAttachTrace: w,
                                            ensureErrorObject: O,
                                            originatesFromRejection: b,
                                            markAsOriginatingFromRejection: g,
                                            classString: C,
                                            copyDescriptors: j,
                                            hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
                                            isNode: V,
                                            env: F
                                        };
                                        H.isRecentNode = H.isNode && function() {
                                            var t = n.versions.node.split(".").map(Number);
                                            return 0 === t[0] && t[1] > 10 || t[0] > 0;
                                        }(), H.isNode && H.toFastProperties(n);
                                        try {
                                            throw new Error();
                                        } catch (t) {
                                            H.lastLineError = t;
                                        }
                                        e.exports = H;
                                    }, {
                                        "./es5": 13
                                    } ]
                                }, {}, [ 4 ])(4);
                            }), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);
                        }).call(this, r("_process"), "undefined" != typeof n ? n : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                    }, {
                        _process: 3
                    } ],
                    3: [ function(t, e, n) {
                        function r() {
                            l = !1, a.length ? c = a.concat(c) : f = -1, c.length && i();
                        }
                        function i() {
                            if (!l) {
                                var t = setTimeout(r);
                                l = !0;
                                for (var e = c.length; e; ) {
                                    for (a = c, c = []; ++f < e; ) {
                                        a && a[f].run();
                                    }
                                    f = -1, e = c.length;
                                }
                                a = null, l = !1, clearTimeout(t);
                            }
                        }
                        function o(t, e) {
                            this.fun = t, this.array = e;
                        }
                        function s() {}
                        var a, u = e.exports = {}, c = [], l = !1, f = -1;
                        u.nextTick = function(t) {
                            var e = new Array(arguments.length - 1);
                            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
                                e[n - 1] = arguments[n];
                            }
                            c.push(new o(t, e)), 1 !== c.length || l || setTimeout(i, 0);
                        }, o.prototype.run = function() {
                            this.fun.apply(null, this.array);
                        }, u.title = "browser", u.browser = !0, u.env = {}, u.argv = [], u.version = "", 
                        u.versions = {}, u.on = s, u.addListener = s, u.once = s, u.off = s, u.removeListener = s, 
                        u.removeAllListeners = s, u.emit = s, u.binding = function(t) {
                            throw new Error("process.binding is not supported");
                        }, u.cwd = function() {
                            return "/";
                        }, u.chdir = function(t) {
                            throw new Error("process.chdir is not supported");
                        }, u.umask = function() {
                            return 0;
                        };
                    }, {} ],
                    4: [ function(t, e, n) {
                        function r(t, e, n, r) {
                            function o(t) {
                                var e = t.length;
                                if (2 > e || e > 256 || e & e - 1) throw "Invalid code/color length, must be power of 2 and 2 .. 256.";
                                return e;
                            }
                            var s = 0, r = void 0 === r ? {} : r, a = void 0 === r.loop ? null : r.loop, u = void 0 === r.palette ? null : r.palette;
                            if (0 >= e || 0 >= n || e > 65535 || n > 65535) throw "Width/Height invalid.";
                            t[s++] = 71, t[s++] = 73, t[s++] = 70, t[s++] = 56, t[s++] = 57, t[s++] = 97;
                            var c = 0, l = 0;
                            if (null !== u) {
                                for (var f = o(u); f >>= 1; ) {
                                    ++c;
                                }
                                if (f = 1 << c, --c, void 0 !== r.background) {
                                    if (l = r.background, l >= f) throw "Background index out of range.";
                                    if (0 === l) throw "Background index explicitly passed as 0.";
                                }
                            }
                            if (t[s++] = 255 & e, t[s++] = e >> 8 & 255, t[s++] = 255 & n, t[s++] = n >> 8 & 255, 
                            t[s++] = (null !== u ? 128 : 0) | c, t[s++] = l, t[s++] = 0, null !== u) for (var h = 0, p = u.length; p > h; ++h) {
                                var _ = u[h];
                                t[s++] = _ >> 16 & 255, t[s++] = _ >> 8 & 255, t[s++] = 255 & _;
                            }
                            if (null !== a) {
                                if (0 > a || a > 65535) throw "Loop count invalid.";
                                t[s++] = 33, t[s++] = 255, t[s++] = 11, t[s++] = 78, t[s++] = 69, t[s++] = 84, t[s++] = 83, 
                                t[s++] = 67, t[s++] = 65, t[s++] = 80, t[s++] = 69, t[s++] = 50, t[s++] = 46, t[s++] = 48, 
                                t[s++] = 3, t[s++] = 1, t[s++] = 255 & a, t[s++] = a >> 8 & 255, t[s++] = 0;
                            }
                            var d = !1;
                            this.addFrame = function(e, n, r, a, c, l) {
                                if (d === !0 && (--s, d = !1), l = void 0 === l ? {} : l, 0 > e || 0 > n || e > 65535 || n > 65535) throw "x/y invalid.";
                                if (0 >= r || 0 >= a || r > 65535 || a > 65535) throw "Width/Height invalid.";
                                if (c.length < r * a) throw "Not enough pixels for the frame size.";
                                var f = !0, h = l.palette;
                                if ((void 0 === h || null === h) && (f = !1, h = u), void 0 === h || null === h) throw "Must supply either a local or global palette.";
                                for (var p = o(h), _ = 0; p >>= 1; ) {
                                    ++_;
                                }
                                p = 1 << _;
                                var v = void 0 === l.delay ? 0 : l.delay, y = void 0 === l.disposal ? 0 : l.disposal;
                                if (0 > y || y > 3) throw "Disposal out of range.";
                                var m = !1, g = 0;
                                if (void 0 !== l.transparent && null !== l.transparent && (m = !0, g = l.transparent, 
                                0 > g || g >= p)) throw "Transparent color index.";
                                if ((0 !== y || m || 0 !== v) && (t[s++] = 33, t[s++] = 249, t[s++] = 4, t[s++] = y << 2 | (m === !0 ? 1 : 0), 
                                t[s++] = 255 & v, t[s++] = v >> 8 & 255, t[s++] = g, t[s++] = 0), t[s++] = 44, t[s++] = 255 & e, 
                                t[s++] = e >> 8 & 255, t[s++] = 255 & n, t[s++] = n >> 8 & 255, t[s++] = 255 & r, 
                                t[s++] = r >> 8 & 255, t[s++] = 255 & a, t[s++] = a >> 8 & 255, t[s++] = f === !0 ? 128 | _ - 1 : 0, 
                                f === !0) for (var b = 0, w = h.length; w > b; ++b) {
                                    var C = h[b];
                                    t[s++] = C >> 16 & 255, t[s++] = C >> 8 & 255, t[s++] = 255 & C;
                                }
                                s = i(t, s, 2 > _ ? 2 : _, c);
                            }, this.end = function() {
                                return d === !1 && (t[s++] = 59, d = !0), s;
                            };
                        }
                        function i(t, e, n, r) {
                            function i(n) {
                                for (;h >= n; ) {
                                    t[e++] = 255 & p, p >>= 8, h -= 8, e === s + 256 && (t[s] = 255, s = e++);
                                }
                            }
                            function o(t) {
                                p |= t << h, h += f, i(8);
                            }
                            t[e++] = n;
                            var s = e++, a = 1 << n, u = a - 1, c = a + 1, l = c + 1, f = n + 1, h = 0, p = 0, _ = r[0] & u, d = {};
                            o(a);
                            for (var v = 1, y = r.length; y > v; ++v) {
                                var m = r[v] & u, g = _ << 8 | m, b = d[g];
                                if (void 0 === b) {
                                    for (p |= _ << h, h += f; h >= 8; ) {
                                        t[e++] = 255 & p, p >>= 8, h -= 8, e === s + 256 && (t[s] = 255, s = e++);
                                    }
                                    4096 === l ? (o(a), l = c + 1, f = n + 1, d = {}) : (l >= 1 << f && ++f, d[g] = l++), 
                                    _ = m;
                                } else _ = b;
                            }
                            return o(_), o(c), i(1), s + 1 === e ? t[s] = 0 : (t[s] = e - s - 1, t[e++] = 0), 
                            e;
                        }
                        function o(t) {
                            var e = 0;
                            if (71 !== t[e++] || 73 !== t[e++] || 70 !== t[e++] || 56 !== t[e++] || 56 !== (t[e++] + 1 & 253) || 97 !== t[e++]) throw "Invalid GIF 87a/89a header.";
                            var n = t[e++] | t[e++] << 8, r = t[e++] | t[e++] << 8, i = t[e++], o = i >> 7, a = 7 & i, u = 1 << a + 1;
                            t[e++];
                            t[e++];
                            var c = null;
                            o && (c = e, e += 3 * u);
                            var l = !0, f = [], h = 0, p = null, _ = 0, d = null;
                            for (this.width = n, this.height = r; l && e < t.length; ) {
                                switch (t[e++]) {
                                  case 33:
                                    switch (t[e++]) {
                                      case 255:
                                        if (11 !== t[e] || 78 == t[e + 1] && 69 == t[e + 2] && 84 == t[e + 3] && 83 == t[e + 4] && 67 == t[e + 5] && 65 == t[e + 6] && 80 == t[e + 7] && 69 == t[e + 8] && 50 == t[e + 9] && 46 == t[e + 10] && 48 == t[e + 11] && 3 == t[e + 12] && 1 == t[e + 13] && 0 == t[e + 16]) e += 14, 
                                        d = t[e++] | t[e++] << 8, e++; else for (e += 12; ;) {
                                            var v = t[e++];
                                            if (0 === v) break;
                                            e += v;
                                        }
                                        break;

                                      case 249:
                                        if (4 !== t[e++] || 0 !== t[e + 4]) throw "Invalid graphics extension block.";
                                        var y = t[e++];
                                        h = t[e++] | t[e++] << 8, p = t[e++], 0 === (1 & y) && (p = null), _ = y >> 2 & 7, 
                                        e++;
                                        break;

                                      case 254:
                                        for (;;) {
                                            var v = t[e++];
                                            if (0 === v) break;
                                            e += v;
                                        }
                                        break;

                                      default:
                                        throw "Unknown graphic control label: 0x" + t[e - 1].toString(16);
                                    }
                                    break;

                                  case 44:
                                    var m = t[e++] | t[e++] << 8, g = t[e++] | t[e++] << 8, b = t[e++] | t[e++] << 8, w = t[e++] | t[e++] << 8, C = t[e++], j = C >> 7, F = C >> 6 & 1, k = 7 & C, x = 1 << k + 1, E = c, T = !1;
                                    if (j) {
                                        var T = !0;
                                        E = e, e += 3 * x;
                                    }
                                    var P = e;
                                    for (e++; ;) {
                                        var v = t[e++];
                                        if (0 === v) break;
                                        e += v;
                                    }
                                    f.push({
                                        x: m,
                                        y: g,
                                        width: b,
                                        height: w,
                                        has_local_palette: T,
                                        palette_offset: E,
                                        data_offset: P,
                                        data_length: e - P,
                                        transparent_index: p,
                                        interlaced: !!F,
                                        delay: h,
                                        disposal: _
                                    });
                                    break;

                                  case 59:
                                    l = !1;
                                    break;

                                  default:
                                    throw "Unknown gif block: 0x" + t[e - 1].toString(16);
                                }
                            }
                            this.numFrames = function() {
                                return f.length;
                            }, this.loopCount = function() {
                                return d;
                            }, this.frameInfo = function(t) {
                                if (0 > t || t >= f.length) throw "Frame index out of range.";
                                return f[t];
                            }, this.decodeAndBlitFrameBGRA = function(e, r) {
                                var i = this.frameInfo(e), o = i.width * i.height, a = new Uint8Array(o);
                                s(t, i.data_offset, a, o);
                                var u = i.palette_offset, c = i.transparent_index;
                                null === c && (c = 256);
                                var l = i.width, f = n - l, h = l, p = 4 * (i.y * n + i.x), _ = 4 * ((i.y + i.height) * n + i.x), d = p, v = 4 * f;
                                i.interlaced === !0 && (v += 4 * n * 7);
                                for (var y = 8, m = 0, g = a.length; g > m; ++m) {
                                    var b = a[m];
                                    if (0 === h && (d += v, h = l, d >= _ && (v = 4 * f + 4 * n * (y - 1), d = p + (l + f) * (y << 1), 
                                    y >>= 1)), b === c) d += 4; else {
                                        var w = t[u + 3 * b], C = t[u + 3 * b + 1], j = t[u + 3 * b + 2];
                                        r[d++] = j, r[d++] = C, r[d++] = w, r[d++] = 255;
                                    }
                                    --h;
                                }
                            }, this.decodeAndBlitFrameRGBA = function(e, r) {
                                var i = this.frameInfo(e), o = i.width * i.height, a = new Uint8Array(o);
                                s(t, i.data_offset, a, o);
                                var u = i.palette_offset, c = i.transparent_index;
                                null === c && (c = 256);
                                var l = i.width, f = n - l, h = l, p = 4 * (i.y * n + i.x), _ = 4 * ((i.y + i.height) * n + i.x), d = p, v = 4 * f;
                                i.interlaced === !0 && (v += 4 * n * 7);
                                for (var y = 8, m = 0, g = a.length; g > m; ++m) {
                                    var b = a[m];
                                    if (0 === h && (d += v, h = l, d >= _ && (v = 4 * f + 4 * n * (y - 1), d = p + (l + f) * (y << 1), 
                                    y >>= 1)), b === c) d += 4; else {
                                        var w = t[u + 3 * b], C = t[u + 3 * b + 1], j = t[u + 3 * b + 2];
                                        r[d++] = w, r[d++] = C, r[d++] = j, r[d++] = 255;
                                    }
                                    --h;
                                }
                            };
                        }
                        function s(t, e, n, r) {
                            for (var i = t[e++], o = 1 << i, s = o + 1, a = s + 1, u = i + 1, c = (1 << u) - 1, l = 0, f = 0, h = 0, p = t[e++], _ = new Int32Array(4096), d = null; ;) {
                                for (;16 > l && 0 !== p; ) {
                                    f |= t[e++] << l, l += 8, 1 === p ? p = t[e++] : --p;
                                }
                                if (u > l) break;
                                var v = f & c;
                                if (f >>= u, l -= u, v !== o) {
                                    if (v === s) break;
                                    for (var y = a > v ? v : d, m = 0, g = y; g > o; ) {
                                        g = _[g] >> 8, ++m;
                                    }
                                    var b = g, w = h + m + (y !== v ? 1 : 0);
                                    if (w > r) return void console.log("Warning, gif stream longer than expected.");
                                    n[h++] = b, h += m;
                                    var C = h;
                                    for (y !== v && (n[h++] = b), g = y; m--; ) {
                                        g = _[g], n[--C] = 255 & g, g >>= 8;
                                    }
                                    null !== d && 4096 > a && (_[a++] = d << 8 | b, a >= c + 1 && 12 > u && (++u, c = c << 1 | 1)), 
                                    d = v;
                                } else a = s + 1, u = i + 1, c = (1 << u) - 1, d = null;
                            }
                            return h !== r && console.log("Warning, gif stream shorter than expected."), n;
                        }
                        try {
                            n.GifWriter = r, n.GifReader = o;
                        } catch (t) {}
                    }, {} ]
                }, {}, [ 1 ]);
            }).call(e, function() {
                return this;
            }());
        },
        83: function(t, e, n) {
            "use strict";
            var r = n(33);
            var i = o(r);
            function o(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            var s = {};
            var a = "processing";
            var u = void 0;
            var c = function t(e, n) {
                var r = JSON.stringify({
                    url: e
                });
                if (s[r] && s[r] !== a) {
                    n(s[r]);
                    return;
                }
                if (s[r] === a) {
                    setTimeout(function() {
                        t(e, n);
                    }, 100);
                    return;
                }
                s[r] = a;
                u.imgLoader(e, function(t) {
                    var e = document.createElement("canvas");
                    e.width = t.width;
                    e.height = t.height;
                    window.gifler(t.src).animate(e).done(function() {
                        s[r] = e;
                        n(e);
                    });
                });
            };
            if (window && window.Easycanvas) {
                u = window.Easycanvas;
                u.gif2canvas = c;
            }
            t.exports = function(t) {
                u = t;
                t.gif2canvas = c;
            };
        }
    });
});

