/** ********** *
 *
 * Sprite Structure
 * {
 *     style: {
 *         tx, ty, tw, th,
 *         zIndex, opacity, scale, rotate, rx, ry,
 *         sx, sy, sw, sh, locate, // useless for content.text
 *         fh, fv, fx, fy, // transform
 *         textAlign, textFont, color, // useless for content.img
 *         visible, // visible false equals inexistence
 *         mirrX, mirrY,
 *     },
 *     content: {
 *         img,
 *         text,
 *         sequence: {} // for animate sprite
 *     },
 *     events: {
 *         eIndex,
 *         click / touchstart / contextmenu / ... / hold / touchout,
 *         through,
 *     },
 *     children: [
 *         { Sprite }, { Sprite } ...
 *     ],
 *     inherit: ['tx', 'ty', ...] // inherit from parent, default is ['tx', 'ty', 'scale']
 *     hooks: {
 *         created, mounted, painted, ticked
 *     },
 *
 *     $parent: { Sprite },
 *
 * }
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';

import on from '../painter/apiOuter/on.js';
import off from '../painter/apiOuter/off.js';
import clear from '../painter/apiOuter/clear.js';
import nextTick from '../painter/apiOuter/nextTick.js';
import trigger from '../painter/apiOuter/trigger.js';
import broadcast from '../painter/apiOuter/broadcast.js';
// import bindDrag from '../painter/apiInner/bindDrag.js';

import getOuterRect from './api.getOuterRect.js';

const ChangeChildrenToSprite = function ($parent) {
    if ($parent.children) {
        $parent.children.forEach((child, i) => {
            if (!child.$id) {
                $parent.children[i] = new sprite(child);
            }
            if ($parent.$id && !$parent.$dom) {
                $parent.children[i].$canvas = $parent.$canvas;
                $parent.children[i].$parent = $parent;
            } else {
                $parent.children[i].$canvas = $parent;
            }

            // if (typeof $parent.children[i].content.img === 'string') {
            //     $parent.children[i].content.img = $parent.children[i].$canvas.imgLoader($parent.children[i].content.img);
            // }

            ChangeChildrenToSprite($parent.children[i]);
        });
    }
};

// Set default values to sprite
const preAdd = function (_item) {
    let item = _item || {};

    if (!item.$id) {
        item.$id = Math.random().toString(36).substr(2);
    }

    item.$tickedTimes = item.$tickedTimes || 0;

    item.content = item.content || {};

    item.style = item.style || {};

    item.style.tx = item.style.tx || 0;
    item.style.ty = item.style.ty || 0;
    item.style.scale = utils.firstValuable(item.style.scale, 1);
    item.style.opacity = utils.firstValuable(item.style.opacity, 1);

    item.style.zIndex = item.style.zIndex || 0;
    item.style.mirrX = item.style.mirrX || 0;

    item.style.locate = item.style.locate || 'center';
    // item.style.rotate = item.style.rotate || 0;

    let _img = utils.funcOrValue(item.content.img);

    constants.xywh.forEach((key) => {
        item.style[key] = item.style[key] || 0;
    });

    item.inherit = item.inherit;
    // item.inherit = item.inherit || ['tx', 'ty', 'scale', 'opacity'];
    item.drag = item.drag || {};

    item.events = item.events || {};
    if (process.env.NODE_ENV !== 'production') {
        for (var i in item.events) {
            if (typeof item.events[i] !== 'function' && i !== 'eIndex') {
                console.warn(`[Easycanvas] Handler ${i} is not a function.`, item.events[i]);
            }
        }
    }

    item.events.eIndex = item.events.eIndex;
    // item.events.through = !!item.events.through;

    item.hooks = item.hooks || {};

    if (process.env.NODE_ENV !== 'production') {
        item.$perf = {};
    }

    if (process.env.NODE_ENV !== 'production') {
        if (!item.name && item.content.img && item.content.img.src) {
            let fileName = item.content.img.src.match(/.*\/([^\/]*)$/);
            if (fileName && fileName[1]) {
                item.name = fileName[1];
            }
        }
        item.name = item.name || 'Unnamed Easycanvas Object';
    }

    item.children = item.children || [];

    ChangeChildrenToSprite(item);

    item.$cache = {};
    item.$styleCacheTime = {};

    return item;
};

const extend = function (opt) {
    this.$extendList.forEach((plugin) => {
        plugin.call(this, opt);
    });
};

let sprite = function (opt) {
    let _opt = preAdd(opt);

    for (let i in _opt) {
        if (Object.prototype.hasOwnProperty.call(_opt, i)) {
            this[i] = _opt[i];
        }
    }

    extend.call(this, _opt);

    return this;
};

sprite.prototype.$extendList = [];

sprite.prototype.add = function (child) {
    if (!child) {
        return;
    }

    this.children.push(child);

    ChangeChildrenToSprite(this);

    // bindDrag.bind(this.children[this.children.length - 1]);

    return this.children[this.children.length - 1];
};

sprite.prototype.getRect = function () {
    let res = {};

    constants.txywh.forEach((key) => {
        res[key] = this.getStyle(key);
    });

    if (res.tw === 0 && this.content.img) {
        let img = utils.funcOrValue(this.content.img, this);
        res.tw = img.width;
        res.th = img.height;
    }

    let locate = this.getStyle('locate');
    if (locate === 'lt') {
    } else if (locate === 'ld') {
        res.ty -= res.th;
    } else if (locate === 'rt') {
        res.tx -= res.tw;
    } else if (locate === 'rd') {
        res.tx -= res.tw;
        res.ty -= res.th;
    } else { // center
        res.tx -= res.tw >> 1;
        res.ty -= res.th >> 1;
    }

    return res;
};

// sprite.prototype.getRender = function () {

//     if (!this.$canvas) return {};

//     let res = this.$canvas.$children.filter(($children) => {
//         return $children.$id === this.$id;
//     });

//     return res && res[0];
// };

sprite.prototype.getSelfStyle = function (key) {
    let res = {};

    if (key) {
        return utils.funcOrValue(this.style[key], this);
    }

    for (let key in this.style) {
        res[key] = utils.funcOrValue(this.style[key], this);
    }

    return res;
};

sprite.prototype.getStyle = function (key) {
    let $sprite = this;
    let lastPaintTime = $sprite.$canvas.$lastPaintTime;

    if ($sprite.$styleCacheTime[key] === lastPaintTime) {
        return $sprite.$cache[key];
    }

    let currentValue = utils.funcOrValue($sprite.style[key], $sprite);

    if ($sprite.$parent) {
        let needInherit;

        if ($sprite.inherit) {
            needInherit = $sprite.inherit.indexOf(key) >= 0;
        } else {
            needInherit = key === 'tx' || key === 'ty' || key === 'scale' || key === 'opacity';
        }

        if (needInherit) {
            let parentValue = $sprite.$parent.getStyle(key);

            if (key === 'opacity' || key === 'scale') {
                parentValue = utils.firstValuable(parentValue, 1);

                $sprite.$parent.$styleCacheTime[key] = lastPaintTime;
                $sprite.$parent.$cache[key] = parentValue;

                return (
                    parentValue
                ) * utils.firstValuable(currentValue, 1);
            } else {
                parentValue = utils.firstValuable(parentValue, 0);

                $sprite.$parent.$styleCacheTime[key] = lastPaintTime;
                $sprite.$parent.$cache[key] = parentValue;

                return (
                    parentValue
                ) + utils.firstValuable(currentValue, 0);
            }
        }
    }

    return currentValue;
};

sprite.prototype.remove = function (child) {
    if (child) {
        this.$canvas.remove(child);
        utils.execFuncs(child.hooks.removed, child);
        return;
    }

    if (this.$parent) {
        this.$parent.remove(this);
    } else {
        this.$canvas.remove(this);
    }
    utils.execFuncs(this.hooks.removed, this);
};

sprite.prototype.update = function (opt) {
    if (!opt) return;

    for (var i in opt) {
        if (typeof opt[i] === 'object') {
            for (var j in opt[i]) {
                this[i][j] = opt[i][j];
            }
        } else {
            this[i] = opt[i];
        }
    }
};

sprite.prototype.getAllChildren = function (includeSelf) {
    let $sprite = this;

    let childrenSet = includeSelf ? [$sprite] : [];

    $sprite.children.forEach((child) => {
        childrenSet = childrenSet.concat(child.getAllChildren(true));
    });

    return childrenSet;
};

sprite.prototype.getOuterRect = getOuterRect;

const COMBINE_DONE = 1;
const COMBINE_FAIL = 2;
const COMBINE_DELAY = 3;

sprite.prototype.combine = function (force) {
    if (this.$combine) return COMBINE_DONE;

    let $sprite = this;
    let $canvas = this.$canvas;

    let allChildrenInCombine = $sprite.getAllChildren(true);
    for (let i = 0; i < allChildrenInCombine.length; i++) {
        let $child = allChildrenInCombine[i];
        let img = $child.content.img;
        if (img && img.src) {
            if ($child.content.img.width === 0 || img.complete === false || img.naturalHeight === 0) {
                // 存在未加载完的子对象，不进行合并
                return COMBINE_DELAY;
            }
        }
    }

    let rect = $sprite.getRect();
    let outerRect = $sprite.getOuterRect();

    outerRect.tx = Math.floor(outerRect.tx);
    outerRect.ty = Math.floor(outerRect.ty);
    outerRect.tw = Math.round(outerRect.tw);
    outerRect.th = Math.round(outerRect.th);
    outerRect.tr = Math.round(outerRect.tr);
    outerRect.tb = Math.round(outerRect.tb);

    if (!force) {
        if (outerRect.tx < 0 || outerRect.tr > $canvas.width) return COMBINE_FAIL;
        if (outerRect.ty < 0 || outerRect.tb > $canvas.height) return COMBINE_FAIL;
    }

    // 绘制一帧，清除连续combine时，前一个combine新产生的对象没有进入$canvas.$children，导致下一个combine获取不到的问题
    $canvas.paint();

    let $renders = $canvas.$children.filter(($child) => {
        for (let i = 0; i < allChildrenInCombine.length; i++) {
            if (allChildrenInCombine[i].$id === $child.$id) return true;
        } 
    });

    // for (let i = 0; i < allChildrenInCombine.length; i++) {
    //     let $child = allChildrenInCombine[i];

    //     if ($child.content.img && $renders.filter(($render) => {
    //         return $render.img && $render.img.width > 0 && $render.img === $child.content.img;
    //     }).length === 0) {
    //         return;
    //     }
    // }

    let originChildren = $canvas.$children;
    $canvas.$children = $renders;
    $canvas.$paintContext.clearRect(0, 0, $canvas.width, $canvas.height);
    // if ($sprite.name === 'hotel-feature') {
    //     console.warn($canvas.$children[3].img.width)
    //     debugger;
    // }
    $canvas.$render();

    let canvas = document.createElement('canvas');
    // document.body.prepend(canvas);
    canvas.width = outerRect.tw;
    canvas.height = outerRect.th;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(
        $canvas.$dom,
        outerRect.tx,
        outerRect.ty,
        outerRect.tw,
        outerRect.th,
        0,
        0,
        outerRect.tw,
        outerRect.th,
    );

    $sprite.$combine = {
        content: $sprite.content,
        children: $sprite.children,
        style: $sprite.style,
    };
    $sprite.children = [];
    $sprite.content = {
        img: canvas,
    };

    let newTx = $sprite.getSelfStyle('tx') - (Math.floor(rect.tx) - outerRect.tx);
    let newTy = $sprite.getSelfStyle('ty') - (Math.floor(rect.ty) - outerRect.ty);
    $sprite.style = Object.assign({}, $sprite.style, {
        opacity: 1,
        scale: 1,
        tx: newTx,
        ty: newTy,
        tw: canvas.width,
        th: canvas.height,
    });

    // 拦截事件，确保children可以触发事件
    $sprite.events.interceptor = function ($e) {
        $sprite.children = $sprite.$combine.children;

        $canvas.on('afterEvent', () => {
            $sprite.children = [];
        });

        return $e;
    };

    // $canvas.paint();
    $canvas.$children = originChildren;
    $canvas.$render();

    $sprite.off('ticked', tryToCombine);

    return COMBINE_DONE;
};

sprite.prototype.uncombine = function () {
    Object.assign(this, this.$combine);

    this.$combine = false;
};

const tryToCombine = function () {
    this.combine();
};

sprite.prototype.combineAsync = function () {
    this.on('ticked', tryToCombine, 200);

    return this;
};

sprite.prototype.nextTick = nextTick;
sprite.prototype.on = on;
sprite.prototype.off = off;
sprite.prototype.clear = clear;
sprite.prototype.trigger = trigger;
sprite.prototype.broadcast = broadcast;

module.exports = sprite;
