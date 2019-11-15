/** ********** *
 *
 * Sprite Structure
 * {
 *     style: {
 *         left, top, width, height,
 *         zIndex, opacity, scale, rotate, rx, ry,
 *         cutLeft, cutTop, cutWidth, cutHeight, locate, // useless for content.text
 *         fh, fv, fx, fy, // transform
 *         textAlign, fontSize/fontFamily, color, // useless for content.img
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
import constants from '../../constants';

import { on, off, trigger, broadcast, distribute } from './api.hook';
import { addEventListener, removeEventListener } from './api.eventListener';
import clear from '../painter/apiOuter/clear.js';
import nextTick from '../painter/apiOuter/nextTick.js';

import getOuterRect from './api.getOuterRect.js';
import combine from './api.combine.js';
import uncombine from './api.uncombine.js';
import recalculate from './api.recalculate.js';

import TSprite from 'type/sprite'

function flat (arr, depth = 1) {
    return depth ? Array.prototype.reduce.call(arr, function (acc, cur) {
        if (Array.isArray(cur)) {
            acc.push.apply(acc, flat(cur, depth - 1));
        } else {
            acc.push(cur);
        }

        return acc;
    }, []) : Array.prototype.slice.call(arr);
}

// 记录sprite创建的顺序，用于调试工具的排序
let $addIndex = 0;

const ChangeChildrenToSprite = function ($parent) {
    if ($parent.children) {

        if (process.env.NODE_ENV !== 'production') {
            if ($parent.children && !Array.isArray($parent.children)) {
                console.error(`[Easycanvas] Children is not an array`, $parent.children);
            }
        }

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
const preAdd = function (_item, $instance) {
    let item = _item || {};

    if (!item.$id) {
        item.$id = Math.random().toString(36).substr(2);
    }

    item.$tickedTimes = item.$tickedTimes || 0;

    item.content = item.content || {};

    item.style = item.style || {};

    item.style.scale = utils.firstValuable(item.style.scale, 1);
    item.style.opacity = utils.firstValuable(item.style.opacity, 1);
    item.style.borderWidth = utils.firstValuable(item.style.borderWidth, 0);

    item.style.zIndex = item.style.zIndex || 0;
    // item.style.mirrX = item.style.mirrX || 0;

    item.style.locate = item.style.locate || 'center';
    // item.style.rotate = item.style.rotate || 0;

    // let _img = utils.funcOrValue(item.content.img);

    $instance.$cache = {}; // 当前最终style
    $instance.$render = {}; // 当前渲染style
    $instance.$style = {}; // 当前自身style
    $instance.$self = {}; // 当前自身style的缓存

    // sprite是自身发生变化还是因为继承导致有更新，如果是后者，那么可以与父级合并，优化性能
    $instance.$selfChanged = false;

    $instance.$needUpdate = {};

    item.hooks = item.hooks || {};

    constants.styles.concat(['visible']).forEach((key) => {
        $instance.$cache[key] = undefined;
        $instance.$style[key] = item.style[key];

        if (typeof item.style[key] === 'function') {
            $instance.$style[key] = item.style[key].bind($instance);
        }

        if (constants.xywh.indexOf(key) > -1) {
            $instance.$style[key] = $instance.$style[key] || (key === 'width' || key === 'height' ? undefined : 0);
        } else if (['opacity', 'scale'].indexOf(key) > -1) {
            $instance.$style[key] = utils.firstValuable($instance.$style[key], 1);
        }

        $instance.$needUpdate[key] = 1;

        Object.defineProperty(item.style, key, {
            get () {
                return $instance.$style[key];
            },

            set (v) {
                if ($instance.$style[key] === v) return;

                $instance.$style[key] = v;

                $instance.$needUpdate[key] = 1;
            },
        });
    });

    // ['img', 'text'].forEach((key) => {
    //     $instance.$cache[key] = undefined;
    //     $instance.$style[key] = item.content[key];
    //     $instance.$needUpdate = true;

    //     let lastSelfValue;
    //     let needRecalculate = true;

    //     if (typeof item.content[key] === 'function') {
    //         $instance.$style[key] = item.content[key].bind($instance);
    //     }

    //     Object.defineProperty(item.content, key, {
    //         get () {
    //             return $instance.$style[key];
    //         },

    //         set (v) {
    //             if ($instance.$style[key] === v) return;

    //             $instance.$style[key] = v;

    //             $instance.$needUpdate = true;
    //         },
    //     });
    // });

    item.events = item.events || {};
    if (process.env.NODE_ENV !== 'production') {
        for (var i in item.events) {
            if (typeof item.events[i] !== 'function' && i !== 'eIndex') {
                console.warn(`[Easycanvas] Handler ${i} is not a function.`, item.events[i]);
            }
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        item.$addIndex = $addIndex++;
    }

    // item.events.eIndex = item.events.eIndex;

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
        item.name = item.name || 'Unnamed Sprite';
    }

    item.children = item.children || [];
    // JSX可能有[[a,b],c]的数据结构
    item.children = flat(item.children, Infinity);

    ChangeChildrenToSprite(item);

    item.$styleCacheTime = {};

    return item;
};

const extend = function (opt) {
    this.$extendList.forEach((plugin) => {
        plugin.call(this, opt);
    });
};

interface TStyle {
    left?: any
    top?: any
    width?: any
    height?: any
    right?: any
    bottom?: any
}

class Sprite implements TSprite {
    $cache = {}
    content: any = {}
    style: any = {}
    events: any = {}
    hooks: any = {}
    $parent: any = null
    $canvas = null;
    $style = null;
    $extendList = []
    $combine: any = {}
    children = []

    constructor (opt) {
        let _opt = preAdd(opt, this);

        for (let i in _opt) {
            if (Object.prototype.hasOwnProperty.call(_opt, i)) {
                this[i] = _opt[i];
            }
        }

        if (opt.ref) {
            opt.ref(this);
        }

        extend.call(this, _opt);

        return this;
    }

    add (child) {
        if (!child) {
            return;
        }
    
        this.children.push(child);
    
        ChangeChildrenToSprite(this);
    
        return this.children[this.children.length - 1];
    }

    getImage () {
        let img = utils.funcOrValue(this.content.img, this);
        if (typeof img === 'string' && this.$canvas) {
            return this.$canvas.imgLoader(img);
        }
    
        return img;
    }

    getRect (fromCache) {
        let res: TStyle = {};
    
        constants.txywh.forEach((key) => {
            res[key] = this.getStyle(key, fromCache) || 0;
        });
    
        // if (res.width === 0 && this.content.img && !notImg) {
        //     let img = utils.funcOrValue(this.content.img, this);
        //     res.width = img.width;
        //     res.height = img.height;
        // }
    
        let locate = this.getStyle('locate');
        if (locate === 'lt') {
        } else if (locate === 'ld') {
            res.top -= res.height;
        } else if (locate === 'rt') {
            res.left -= res.width;
        } else if (locate === 'rd') {
            res.left -= res.width;
            res.top -= res.height;
        } else { // center
            res.left -= res.width >> 1;
            res.top -= res.height >> 1;
        }
    
        res.right = res.left + res.width;
        res.bottom = res.top + res.height;
    
        return res;
    }

    getSelfStyle (key) {
        if (key) {
            return utils.funcOrValue(this.style[key], this);
        }
    
        let res = {};
    
        for (let key in this.style) {
            res[key] = utils.funcOrValue(this.style[key], this);
        }
    
        return res;
    }

    getStyle (key, fromCache?: boolean): TStyle | String | Number | Boolean {
        let $sprite = this;
        // let lastPaintTime = $sprite.$canvas.$lastPaintTime;
    
        // if ($sprite.$styleCacheTime[key] === lastPaintTime) {
        //     return $sprite.$cache[key];
        // }
    
        if (fromCache && $sprite.$cache[key] !== undefined) {
            return $sprite.$cache[key];
        }
    
        let currentValue = utils.funcOrValue($sprite.$style[key], $sprite);
    
        if ($sprite.$parent) {
            let parentValue = $sprite.$parent.getStyle(key);
    
            if (key === 'left' || key === 'top') {
                parentValue = utils.firstValuable(parentValue, 0);
    
                // $sprite.$parent.$styleCacheTime[key] = lastPaintTime;
                // $sprite.$parent.$cache[key] = parentValue;
    
                return (
                    parentValue
                ) + utils.firstValuable(currentValue, 0);
            } else if (key === 'scale' || key === 'opacity') {
                parentValue = utils.firstValuable(parentValue, 1);
    
                // $sprite.$parent.$styleCacheTime[key] = lastPaintTime;
                // $sprite.$parent.$cache[key] = parentValue;
    
                return (
                    parentValue
                ) * utils.firstValuable(currentValue, 1);
            } else if (key === 'visible') {
                if (parentValue === false) return false;
                // $sprite.$parent.$styleCacheTime[key] = lastPaintTime;
                // $sprite.$parent.$cache[key] = parentValue;
    
                return currentValue;
            } else if (key === 'width' || key === 'height' || typeof currentValue === 'undefined') {
                currentValue = $sprite.$cache[key];
    
                return currentValue;
            }
        }
    
        return currentValue;
    }

    remove (child) {
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
    }

    update (opt) {
        if (!opt) return;
    
        for (var i in opt) {
            if (typeof opt[i] === 'object') {
                for (var j in opt[i]) {
                    if (!this[i]) {
                        this[i] = {};
                    }
    
                    this[i][j] = opt[i][j];
                }
            } else {
                this[i] = opt[i];
            }
        }
    
        if (this.$canvas) {
            this.recalculate(true); // if painted, force update
        }
        return this;
    }

    getAllChildren (includeSelf) {
        let $sprite = this;
    
        let childrenSet = includeSelf ? [$sprite] : [];
    
        $sprite.children.forEach((child) => {
            childrenSet = childrenSet.concat(child.getAllChildren(true));
        });
    
        return childrenSet;
    }

    getAllVisibleChildren (includeSelf) {
        let $sprite = this;
    
        if (utils.funcOrValue($sprite.style.visible, $sprite) === false) {
            return [];
        }
    
        let childrenSet = includeSelf ? [$sprite] : [];
    
        $sprite.children.forEach((child) => {
            childrenSet = childrenSet.concat(child.getAllVisibleChildren(true));
        });
    
        return childrenSet;
    }

    getOuterRect = getOuterRect
    combine= combine
    uncombine = uncombine
    recalculate = recalculate
    nextTick = nextTick
    on = on
    off = off
    addEventListener = addEventListener
    removeEventListener = removeEventListener
    clear = clear
    trigger = trigger
    broadcast = broadcast
    distribute = distribute

    combineAsync () {
        if (this.$combine) return this;
    
        this.off('ticked', this.combine);
        this.on('ticked', this.combine, 100);
    
        return this;
    }
}

export default Sprite;
