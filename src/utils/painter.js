import tick from './tick.js';
import utils from './utils.js';
import positionCompare from './position-compare.js';

var painter = function () {};

var protoData = {
    paintContext: null,
    nextTickTime: 0,
    pausing: false,
    fps: 0,
    fpsCalculateTime: 0,
    fpsHandler: null,
    contextWidth: 0,
    contextHeight: 0,
    missingEvents: {
        click: null
    },
    paintList: [],
    eHoldingFlag: false,
    eLastMouseHover: null,
    maxFps: 0,
    lastPaintTime: 0,
};

var protoFunction = {
    clear: function () {
        this.paintList.splice(0);
    },

    setFpsHandler: function (callback) {
        this.fpsHandler = callback;
    },

    setMaxFps: function (val) {
        this.maxFps = val || 0;
    },

    pause: function (val) {
        this.pausing = val === undefined ? true : val;
    },

    /*
     *  item {
     *    img,
     *    sx, // source margin-left for cutting
     *    sy,
     *    sw(auto), // source width for cutting
     *    sh(auto),
     *    tx, // target position-X
     *    ty,
     *    tw(auto), // target width
     *    th(auto),
     *    
     *    loop: {
     *      x, // margin-X per tick or divides(if below 0)
     *      y,
     *      index, // default 0
     *      circle, // default true
     *    }
     *  }
     *
     */

    preAdd: function (item) {
        var _img = utils.funcOrValue(item.img);

        item.zIndex = item.zIndex || 0;
        item.sx = item.sx || 0;
        item.sy = item.sy || 0;
        item.tx = item.tx || 0;
        item.ty = item.ty || 0;
        item.sw = item.sw || _img.width;
        item.sh = item.sh || _img.height;
        item.tw = item.tw || 0;
        item.th = item.th || 0;
        item.rx = item.rx;
        item.ry = item.ry;
        item.mirrX = item.mirrX || 0;
        item.opacity = item.opacity || 1;
        item.marginX = item.marginX || 0;
        item.marginY = item.marginY || 0;
        item.events = item.events || {};
        item.eIndex = item.eIndex || 0;
        item.locate = item.locate || 'center';
        item.visible = item.visible;

        return item;
    },

    add: function (item) {
        if (!item) return;

        var _item = item;
        var _img = utils.funcOrValue(_item.img);

        this.preAdd(_item);

        // avoid muti calculate of function values (may include some movement operations)
        _item.$cache = {
            tx: _item.tx,
            ty: _item.ty,
            tw: _item.tw,
            th: _item.th
        };

        if (_item.dragable) {
            // add drag events to item
            var startDragPosition = {
                x: 0,
                y: 0
            };
            var draggingFlag = false;
            var oMousedown = _item.events.mousedown || _item.events.touchstart;
            _item.events.touchstart = _item.events.mousedown = function (e) {
                draggingFlag = true;

                // if dragable is a object, it means the range of dragable area
                if (typeof _item.dragable === 'object') {
                    var relativeX = e.layerX - this.tx;
                    var relativeY = e.layerY - this.ty;
                    if (!positionCompare.pointInRect(
                            relativeX, relativeY,
                            utils.funcOrValue(_item.dragable.x1, _item),
                            utils.funcOrValue(_item.dragable.x2, _item),
                            utils.funcOrValue(_item.dragable.y1, _item),
                            utils.funcOrValue(_item.dragable.y2, _item),
                    )) {
                        draggingFlag = false;
                        return oMousedown ? oMousedown.call(_item, e) : undefined;
                    }
                }

                startDragPosition.x = e.screenX || e.layerX;
                startDragPosition.y = e.screenY || e.layerY;
                return oMousedown ? oMousedown.call(_item, e) : 'drag';
            }.bind(_item);
            var oMousehold = _item.events.mousehold;
            _item.events.touchmove = _item.events.mousemove = function (e) {
                if (draggingFlag) {
                    this.tx += (e.screenX || e.layerX) - startDragPosition.x;
                    this.ty += (e.screenY || e.layerY) - startDragPosition.y;
                    startDragPosition.x = e.screenX || e.layerX;
                    startDragPosition.y = e.screenY || e.layerY;
                }
                return oMousehold ? oMousehold.call(_item, e) : 'drag';
            }.bind(_item);
            var oMouseup = _item.events.mouseup || _item.events.touchend;
            _item.events.touchend = _item.events.mouseup = function (e) {
                draggingFlag = false;
                return oMouseup ? oMouseup.call(_item, e) : 'drag';
            }
            var oMouseout = _item.events.mouseout;
            _item.events.mouseout = function (e) {
                draggingFlag = false;
                return oMouseout ? oMouseout.call(_item, e) : 'drag';
            }
            var oClick = _item.events.click;
            _item.events.click = function (e) {
                var relativeX = e.layerX - this.tx;
                var relativeY = e.layerY - this.ty;
                if (positionCompare.pointInRect(
                        relativeX, relativeY,
                        utils.funcOrValue(_item.dragable.x1, _item),
                        utils.funcOrValue(_item.dragable.x2, _item),
                        utils.funcOrValue(_item.dragable.y1, _item),
                        utils.funcOrValue(_item.dragable.y2, _item),
                )) {
                    e.preventDefault();
                    return oClick ? oClick.call(_item, e) : true;
                }
                return oClick ? oClick.call(_item, e) : false;
            }
        }

        if (_item.loop) {
            if (_item.loop.x > 0) {
                _item.loop.x = 0 - (_img.width / _item.loop.x);
            }
            if (_item.loop.y > 0) {
                _item.loop.y = 0 - (_img.height / _item.loop.y);
            }

            var px = (_img.width / (0 - _item.loop.x));
            var py = (_img.height / (0 - _item.loop.y));

            _item.tw = _item.tw || px;
            _item.th = _item.th || py;
            _item.loop.px = px;
            _item.loop.py = py;

            _item.loop.index = _item.loop.index || 0;
            _item.loop.interval = _item.loop.interval || 16;
            _item.loop.lastTickTime = 0;

            if (_item.loop.circle === undefined) {
                _item.loop.circle = true;   
            }
        }

        this.paintList.push(_item);

        return _item;
    },

    remove: function (item, del) {
        item.visible = false;
        if (del) {
            this.paintList.splice(this.paintList.indexOf(item), 1);
        }
    },

    register: function (dom, option) {
        for (var i in protoData) {
            this[i] = JSON.parse(JSON.stringify(protoData[i]));
        }

        this.paintContext = dom.getContext('2d');
        this.contextWidth = dom.width;
        this.contextHeight = dom.height;

        var _option = option || {};
        this.missingEvents = _option.events || {};

        var _this = this;
        dom.addEventListener('click', _this.$handler.bind(_this));
        dom.addEventListener('dblclick', _this.$handler.bind(_this));
        dom.addEventListener('mousedown', _this.$handler.bind(_this));
        dom.addEventListener('mouseup', _this.$handler.bind(_this));
        dom.addEventListener('mousemove', _this.$handler.bind(_this));
        dom.addEventListener('touchstart', _this.$handler.bind(_this));
        dom.addEventListener('touchend', _this.$handler.bind(_this));
        dom.addEventListener('touchmove', _this.$handler.bind(_this));

        setInterval(function () {
            if (this.eHoldingFlag) {
                var e = this.eHoldingFlag;
                this.$handler.call(this, {
                    layerX: e.layerX,
                    layerY: e.layerY,
                    screenX: e.screenX || e.layerX,
                    screenY: e.screenY || e.layerY,
                    type: 'mousehold',
                });
            }
        }.bind(_this), 40);
    },

    $visibles: function () {
        return this.paintList
            .filter(function (i) {
                if (utils.funcOrValue(i.visible, i) === false) {
                    return false;
                }
                return true;
            });
    },

    $handler: function (e) {
        if (!e.layerX && e.touches && e.touches[0]) {
            e.layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
            e.layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
        }

        var _this = this;
        var caughts = _this.paintList
            .filter(function (i) {
                if (utils.funcOrValue(i.visible, i) === false) {
                    return false;
                }

                if (!i.$cache) {
                    i.$cache = {};
                }

                var _tx = i.$cache.tx || utils.funcOrValue(i.tx, i);
                var _ty = i.$cache.ty || utils.funcOrValue(i.ty, i);
                var _tw = i.$cache.tw || utils.funcOrValue(i.tw, i);
                var _th = i.$cache.th || utils.funcOrValue(i.th, i);
                if (i.$cache.tx === undefined && i.locate === 'center') {
                    _tx = _tx - 0.5 * _tw;
                    _ty = _ty - 0.5 * _th;
                }

                // 兼容 !!TODO!!
                return positionCompare.pointInRect(
                    e.layerX, e.layerY,
                    _tx, _tx + _tw,
                    _ty, _ty + _th
                );
            })
            .sort(function (a, b) {
                return a.eIndex < b.eIndex;
            });

        if (!_this.eHoldingFlag && (e.type === 'mousedown' || e.type === 'touchstart')) {
            _this.eHoldingFlag = e;
        } else if (_this.eHoldingFlag && (e.type === 'mouseup' || e.type === 'touchend')) {
            _this.eHoldingFlag = false;
        } else if (_this.eHoldingFlag && (e.type === 'mousemove' || e.type === 'touchmove')) {
            _this.eHoldingFlag = e;
        }

        for (var i = 0; i < caughts.length; i++) {
            var handler = caughts[i]['events'][e.type];

            // hover更替，触发mouseout
            if (_this.eLastMouseHover && _this.eLastMouseHover !== caughts[i]) {
                var eMouseout = _this.eLastMouseHover['events']['mouseout'];
                if (eMouseout) {
                    eMouseout.call(_this.eLastMouseHover, e);
                }
            }

            if (handler) {
                _this.eLastMouseHover = caughts[i];
                var result = handler.call(caughts[i], e);
                if (result === true) {
                    _this.eHoldingFlag = false;
                    return;
                } else if (result === 'drag') {
                    _this.eHoldingFlag = false;
                    return;
                }
            }
        }

        if (!caughts.length && _this.eLastMouseHover) {
            // hover更替，触发mouseout
            var eMouseout = _this.eLastMouseHover['events']['mouseout'];
            if (eMouseout) {
                eMouseout.call(_this.eLastMouseHover, e);
            }
            _this.eLastMouseHover = null;
        }

        var handler = _this.missingEvents[e.type];
        if (handler) {
            if (handler(e)) {
                _this.eHoldingFlag = false;
                return;
            }
        }
    },

    start: function () {
        this.$rAFer(this.paint.bind(this));
    },

    write: function (text) {
        this.paintContext.font = text.font;
        this.paintContext.strokeStyle = text.style;
        this.paintContext.fillStyle = text.style;

        var content = utils.funcOrValue(text.content);

        this.paintContext[text.type || 'strokeText'](content, text.tx, text.ty);
    },

    paint: function () {
        if (this.pausing) return;

        this.paintContext.clearRect(0, 0, this.contextWidth, this.contextHeight);

        var _this = this;
        this.paintList.sort(function (a, b) {
            return utils.funcOrValue(a.zIndex, a) > utils.funcOrValue(b.zIndex, b) ? 1 : -1;
        }).forEach(function (perItem, index) {
            _this.$perPaint(perItem, index);
        });

        this.fps++;
    },

    $perPaint: function (i, index) {
        if (utils.funcOrValue(i.visible, i) === false) {
            return;
        }

        var that = this;

        if (i.belowAddon) {
            i.belowAddon.forEach(function (c, _index) {
                that.$perPaint.call(that, that.preAdd(c), _index);
            });
        }

        var _sx = utils.funcOrValue(i.sx, i);
        var _sy = utils.funcOrValue(i.sy, i);
        var _tx = utils.funcOrValue(i.tx, i) + i.marginX;
        var _ty = utils.funcOrValue(i.ty, i) + i.marginY;
        var _sw = utils.funcOrValue(i.sw, i);
        var _sh = utils.funcOrValue(i.sh, i);
        var _tw = utils.funcOrValue(i.tw, i);
        var _th = utils.funcOrValue(i.th, i);
        var _img = utils.funcOrValue(i.img);
        var _opacity = utils.funcOrValue(i.opacity, i);
        var _r = utils.funcOrValue(i.rotate, i);
        var _rx = utils.funcOrValue(i.rx, i);
        var _ry = utils.funcOrValue(i.ry, i);
        var _mirrX = utils.funcOrValue(i.mirrX, i);
        // var _sx = i.sx;
        // var _sy = i.sy;
        // var _sw = i.sw;
        // var _sh = i.sh;
        // var _tw = i.tw;
        // var _th = i.th;

        if (_img.width === 0) {
            return;
        }

        if (i.loop) {
            var px = i.loop.px;
            var py = i.loop.py;
            var loopIndex = i.loop.index;
            // var loopLast = i.loop.last;
            if (loopIndex < 0) {
                // 前几帧不变
                loopIndex = 0;
            }

            _sx = loopIndex % (0 - i.loop.x) * px;
            _sy = parseInt(loopIndex / (0 - i.loop.x)) % (0 - i.loop.y) * py;

            if (!i.loop.circle && loopIndex > 0 && _sx === 0 && _sy === 0) {
                this.paintList.splice(index, 1);
                return;
            }

            if (this.nextTickTime - i.loop.lastTickTime >= i.loop.interval) {
                i.loop.lastTickTime = this.nextTickTime;
                i.loop.index++;
            }

            _sw = px;
            _sh = py;
            _tw = _tw || px;
            _th = _th || py;
        }

        _tw = _tw || _sw || _img.width;
        _th = _th || _sh || _img.height;

        if (i.locate === 'center') {
            _tx = _tx - 0.5 * _tw;
            _ty = _ty - 0.5 * _th;
        }

        if (_r) {
            this.paintContext.save();
            var transX = _rx !== undefined ? _rx : _tx + 0.5 * _tw;
            var transY = _ry !== undefined ? _ry : _ty + 0.5 * _th;
            this.paintContext.translate(transX, transY);
            this.paintContext.rotate(-_r * Math.PI / 180);
            this.paintContext.translate(-transX, -transY);
        }

        if (_mirrX) {
            this.paintContext.save();
            this.paintContext.translate(this.contextWidth, 0);
            this.paintContext.scale(-1, 1);
            _tx = this.contextWidth - _tx - _tw;
        }


        // console.log(_sx, _sy, _sw, _sh, _tx, _ty, _tw, _th);
        // this.paintContext.fillRect(_tx, _ty, _tw, _th);
        if (i.opacity !== 1) {
            this.paintContext.globalAlpha = _opacity;
        }

        i.$cache = {
            tx: _tx,
            ty: _ty,
            tw: _tw,
            th: _th
        };

        if (_sw && _sh) {
            this.paintContext.drawImage(_img, _sx, _sy, _sw, _sh, _tx, _ty, _tw, _th);
        }

        if (i.text) {
            i.text.forEach(function (_item) {
                var item = utils.funcOrValue(_item);
                if (item) {
                        that.write({
                        tx: _tx + item.tx,
                        ty: _ty + item.ty,
                        content: item.content,
                        font: item.font || '30',
                        style: item.style || 'white',
                        type: item.type || 'fillText',
                    });
                }
            });
        }

        // cache computed w/h
        i.tw = i.tw || _tw;
        i.th = i.th || _th;

        if (i.opacity !== 1) {
            this.paintContext.globalAlpha = 1;
        }

        if (_r) {
            this.paintContext.restore();
        }
        if (_mirrX) {
            this.paintContext.restore();
        }

        if (i.aboveAddon) {
            i.aboveAddon.forEach(function (c, _index) {
                that.$perPaint.call(that, that.preAdd(c), _index);
            });
        }
    },

    // $stop: function () {

    // },

    $rAFer: function (f) {
        var time = new Date().getTime();
        this.nextTickTime = time;

        if (time - this.fpsCalculateTime > 1000) {
            this.fpsCalculateTime = time;
            if (this.fpsHandler) {
                this.fpsHandler(this.fps);
            }
            this.fps = 0;
        }

        tick(function () {
            f();
            this.$rAFer(f);
        }.bind(this));
    }
};

// Object.assign(painter.prototype, protoFunction);
for (var i in protoFunction) {
    if (Object.prototype.hasOwnProperty.call(protoFunction, i)) {
        painter.prototype[i] = protoFunction[i];
    }
}

module.exports = painter;
