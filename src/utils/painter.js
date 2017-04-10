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
    eLastMouseHover: null
};

var protoFunction = {
    clear: function () {
        this.paintList.splice(0);
    },

    setFpsHandler: function (callback) {
        this.fpsHandler = callback;
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
    add: function (item) {
        if (!item) return;

        var _item = item;
        var _img = utils.funcOrValue(_item.img);

        _item.zindex = _item.zindex || 0;
        _item.sx = _item.sx || 0;
        _item.sy = _item.sy || 0;
        _item.tx = _item.tx || 0;
        _item.ty = _item.ty || 0;
        _item.sw = _item.sw || _img.width;
        _item.sh = _item.sh || _img.height;
        _item.tw = _item.tw || 0;
        _item.th = _item.th || 0;
        _item.mirrX = _item.mirrX || 0;
        _item.opacity = _item.opacity || 1;
        _item.marginX = _item.marginX || 0;
        _item.marginY = _item.marginY || 0;
        _item.events = _item.events || {};
        _item.eIndex = _item.eIndex || 0;
        _item.locate = _item.locate || 'center';

        _item.visible = _item.visible;

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
            var oMousedown = _item.events.mousedown;
            _item.events.mousedown = function (e) {
                draggingFlag = true;

                // if dragable is a object, it means the range of dragable area
                if (typeof _item.dragable === 'object') {
                    var relativeX = e.layerX - this.tx;
                    var relativeY = e.layerY - this.ty;
                    if (positionCompare.pointInRect(
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

                startDragPosition.x = e.screenX;
                startDragPosition.y = e.screenY;
                return oMousedown ? oMousedown.call(_item, e) : 'drag';
            }.bind(_item);
            var oMousehold = _item.events.mousehold;
            _item.events.mousemove = function (e) {
                if (draggingFlag) {
                    this.tx += (e.screenX - startDragPosition.x);
                    this.ty += (e.screenY - startDragPosition.y);
                    startDragPosition.x = e.screenX;
                    startDragPosition.y = e.screenY;
                }
                return oMousehold ? oMousehold.call(_item, e) : 'drag';
            }.bind(_item);
            var oMouseup = _item.events.mouseup;
            _item.events.mouseup = function (e) {
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
                    return oClick ? oClick.call(_item, e) : true;
                }
                e.preventDefault();
                return true;
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

    remove: function (item) {
        this.paintList.splice(this.paintList.indexOf(item), 1);
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
        dom.addEventListener('mousedown', _this.$handler.bind(_this));
        dom.addEventListener('mouseup', _this.$handler.bind(_this));
        dom.addEventListener('mousemove', _this.$handler.bind(_this));

        setInterval(function () {
            if (this.eHoldingFlag) {
                var e = this.eHoldingFlag;
                this.$handler.call(this, {
                    layerX: e.layerX,
                    layerY: e.layerY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    type: 'mousehold',
                });
            }
        }.bind(_this), 40);
    },

    $handler: function (e) {
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
                if (!i.$cache.tx && i.locate === 'center') {
                    _tx = _tx - 0.5 * _tw;
                    _ty = _ty - 0.5 * _th;
                }

                // 兼容 !!TODO!!
                return (e.layerX > _tx) && (e.layerX < _tx + _tw) &&
                    (e.layerY > _ty) && (e.layerY < _ty + _th);
            })
            .sort(function (a, b) {
                return a.eIndex < b.eIndex;
            });

        if (!_this.eHoldingFlag && e.type === 'mousedown') {
            _this.eHoldingFlag = e;
        } else if (_this.eHoldingFlag && e.type === 'mouseup') {
            _this.eHoldingFlag = false;
        } else if (_this.eHoldingFlag && e.type === 'mousemove') {
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
                if (handler.call(caughts[i], e) === true) {
                    _this.eHoldingFlag = false;
                    return;
                } else if (handler.call(caughts[i], e) === 'drag') {
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
        this.paintContext.strokeText(text.content, text.tx, text.ty);
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

        var _sx = utils.funcOrValue(i.sx, i);
        var _sy = utils.funcOrValue(i.sy, i);
        var _tx = utils.funcOrValue(i.tx, i) + i.marginX;
        var _ty = utils.funcOrValue(i.ty, i) + i.marginY;
        var _sw = utils.funcOrValue(i.sw, i);
        var _sh = utils.funcOrValue(i.sh, i);
        var _tw = utils.funcOrValue(i.tw, i);
        var _th = utils.funcOrValue(i.th, i);
        var _img = utils.funcOrValue(i.img);
        var _r = utils.funcOrValue(i.rotate, i);
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
            this.paintContext.translate(_tx + 0.5 * _tw, _ty + 0.5 * _th);
            this.paintContext.rotate(-_r * Math.PI / 180);//旋转47度
            this.paintContext.translate(-_tx - 0.5 * _tw, -_ty - 0.5 * _th);
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
            this.paintContext.globalAlpha = i.opacity;
        }

        i.$cache = {
            tx: _tx,
            ty: _ty,
            tw: _tw,
            th: _th
        };

        this.paintContext.drawImage(_img, _sx, _sy, _sw, _sh, _tx, _ty, _tw, _th);

        if (i.text) {
            i.text.forEach(function (item) {
                that.write({
                    tx: _tx + item.tx,
                    ty: _ty + item.ty,
                    content: item.content,
                    font: item.font,
                    style: item.style,
                });
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
