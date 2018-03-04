/** ********** *
 *
 * Sprite Structure
 * {
 *     style: {
 *         tx, ty, tw, th,
 *         zIndex, opacity, scale, rotate, rx, ry,
 *         sx, sy, sw, sh, locate, // useless for content.text
 *         fh, fv, fx, fy, // transfrom
 *         align, font, color, // useless for content.img
 *         visible, // visible false equals inexistence
 *         mirrX, mirrY, // visible false equals inexistence
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
 *     $cache: {
 *         tx, ty, tw, th, ...
 *     },
 *
 * }
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';

import on from '../painter/apiOuter/on.js';
import off from '../painter/apiOuter/off.js';
import trigger from '../painter/apiOuter/trigger.js';
import broadcast from '../painter/apiOuter/broadcast.js';
import bindDrag from '../painter/apiInner/bindDrag.js';

const preAdd = function (item) {
    if (process.env.NODE_ENV !== 'production') {
        if (item.events && typeof item.events.eIndex === 'undefined') {
            console.warn('[Easycanvas] This sprite has no "eIndex", 0 is set by default.');
        }

        // if (item.content && item.style && typeof item.style.zIndex === 'undefined') {
        //     console.warn('[Easycanvas] This sprite has no "zIndex", 0 is set by default.');
        // }
    }

    let $canvas = item.$canvas;

    if (!item.$id) {
        item.$id = Math.random().toString(36).substr(2);
    }

    item.content = item.content || {};

    item.style = item.style || {};

    item.style.zIndex = item.style.zIndex || 0;
    item.style.mirrX = item.style.mirrX || 0;

    item.style.opacity = item.style.opacity === undefined ? 1 : item.style.opacity;
    item.style.locate = item.style.locate || 'center';
    // item.style.rotate = item.style.rotate || 0;
    item.style.scale = item.style.scale || 1;
    // item.style.display = item.style.display;

    let _img = utils.funcOrValue(item.content.img);
    if (_img === undefined) {
        _img = {
            width: 0,
            height: 0,
        };
    }

    constants.xywh.forEach(function (key) {
        item.style[key] = item.style[key] || 0;
    });

    item.inherit = item.inherit || ['tx', 'ty', 'scale'];
    item.drag = item.drag || {};

    item.events = item.events || {};
    item.events.eIndex = item.events.eIndex || 0;
    // item.events.through = !!item.events.through;

    item.scroll = item.scroll || {};
    item.scroll.scrollX = item.scroll.scrollX || 0;
    item.scroll.scrollY = item.scroll.scrollY || 0;

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
    item.children.forEach(function (c) {
        c.$canvas = item.$canvas;
        c.$parent = item;

        c = new sprite(c);
    });

    item.$cache = {};
    item.$scroll = {
        speedX: 0,
        speedY: 0,
    };

    return item;
};

let sprite = function (opt) {
    let _opt = preAdd(opt);

	for (let i in _opt) {
    	if (Object.prototype.hasOwnProperty.call(_opt, i)) {
    		this[i] = _opt[i];
    	}
	}

	return this;
};

sprite.prototype.add = function (child) {
	this.children = this.children || [];

	child.$canvas = this.$canvas;
	child.$parent = this;

    if (!child.$id) {
        child = new sprite(child);
    }

    bindDrag.bind(child);

    child.children.forEach(function (c, i) {
        child.children[i] = new sprite(c);
        child.children[i].$canvas = child.$canvas;
        child.children[i].$parent = child;
    });

	this.children.push(child);

    return child;
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
}

sprite.prototype.on = on;
sprite.prototype.off = off;
sprite.prototype.trigger = trigger;
sprite.prototype.broadcast = broadcast;

module.exports = sprite;
