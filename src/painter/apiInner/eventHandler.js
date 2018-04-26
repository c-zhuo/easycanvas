/** ********** *
 *
 * Handle events on canvas (Includes both user's events and debugging events)
 * - Compare event's coordinate and the coordinate of every sprite in
 *   Easycanvas.children, and check sprite's handlers one by one.
 * - Events: mousedown, mousemove, mouseup, touchstart, touchmove, touchend,
 *   click, contextmenu
 * - Expanded events: hold, touchout
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';

import eventScroll from './eventHandler.scroll.js';

/**
 * Sort sprite
 * - Order by eIndex dev-tool's in events' triggering
 * - Order by zIndex in dev-tool's select mode
 */
const sortByIndex = function (arr) {
    return arr.sort(function (a, b) {
        if (process.env.NODE_ENV !== 'production') {
            if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                return utils.funcOrValue(a.style.zIndex, a) < utils.funcOrValue(b.style.zIndex, b) ? 1 : -1;
            }
        }

        return utils.funcOrValue(utils.firstValuable(a.events.eIndex, a.style.zIndex), a) < utils.funcOrValue(utils.firstValuable(b.events.eIndex, b.style.zIndex), b) ? 1 : -1;
    });
};

/**
 * Check whether the event hits certain sprite
 * - Use $sprite.$cache to compare 
 * - Sprite in first frame will not captrue any event [?]
 */
const isVisible = function ($sprite) {
    if ($sprite.$parent && !isVisible($sprite.$parent)) {
        return false;
    }
    return utils.funcOrValue($sprite.style.visible, $sprite) !== false;
};
const hitSprite = function ($sprite, e) {
    if (isVisible($sprite) === false) {
        return false;
    }

    if (!$sprite.$cache) {
        return;
    }

    let _tx = $sprite.$cache.tx;
    let _ty = $sprite.$cache.ty;
    let _tw = $sprite.$cache.tw;
    let _th = $sprite.$cache.th;

    // 第一帧没有$cache
    if (typeof _tx === 'undefined') return false;

    return utils.pointInRect(
        e.canvasX, e.canvasY,
        _tx, _tx + _tw,
        _ty, _ty + _th
    );
};

/**
 * Sort all the sprites(including children), then put to @caughts
 * - Child is above the parent only if Index >= 0
 */
const looper = function (arr, e, caughts) {
    if (!arr || !arr.length) return;

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.children.length) {
            // Children above
            looper(sortByIndex(item.children.filter(function (a) {
                if (process.env.NODE_ENV !== 'production') {
                    if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                        return utils.funcOrValue(a.style.zIndex, a) >= 0;
                    }
                }

                return utils.funcOrValue(utils.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0;
            })), e, caughts);
        }
        if (hitSprite(item, e)) {
            caughts.push(item);
        }
        if (item.children.length) {
            // Children below
            looper(sortByIndex(item.children.filter(function (a) {
                if (process.env.NODE_ENV !== 'production') {
                    if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                        return utils.funcOrValue(a.style.zIndex, a) < 0;
                    }
                }

                return !(utils.funcOrValue(utils.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0);
            })), e, caughts);
        }
    }
};

module.exports = function (e) {
    let $canvas = this;

    if (!e.layerX && e.touches && e.touches[0]) {
        e.layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
        e.layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
    }
    if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
        e.layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
        e.layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
    }

    let isRotated = this.$dom.getBoundingClientRect().width > this.$dom.getBoundingClientRect().height !== this.width > this.height

    let scaleX = Math.floor(this.$dom.getBoundingClientRect()[isRotated ? 'height' : 'width']) / this.width;
    let scaleY = Math.floor(this.$dom.getBoundingClientRect()[isRotated ? 'width' : 'height']) / this.height;

    scaleX = scaleX || 1;
    scaleY = scaleY || 1;

    let $e = {
        type: e.type,
        canvasX: e.layerX / scaleX,
        canvasY: e.layerY / scaleY,
        event: e
    };

    if ($canvas.events.interceptor) {
        $e = $canvas.events.interceptor($e);
    }

    let caughts = [];

    if ($canvas.$flags.dragging && $canvas.$flags.dragging.$id) {
        caughts.push($canvas.$flags.dragging);
    }

    looper(sortByIndex($canvas.children), $e, caughts);

    if (process.env.NODE_ENV !== 'production') {
        // 开发者工具select模式下为选取元素
        if (window[constants.devFlag] && window[constants.devFlag].selectMode && caughts.length) {
            let chooseSprite = caughts[0];
            if (chooseSprite.name === constants.devFlag) {
                // 选中mask不算
                chooseSprite = caughts[1];
            }

            if (chooseSprite && $canvas.$plugin.selectSprite(e.type === 'click' || e.type === 'touchend', $canvas, chooseSprite)) {
                return;
            }
        }
    }

    // Create a new event: 'hold' (suits both mobile and pc)
    if (!$canvas.eHoldingFlag && ($e.type === 'mousedown' || $e.type === 'touchstart')) {
        $canvas.eHoldingFlag = e;
    } else if ($canvas.eHoldingFlag && ($e.type === 'mouseup' || $e.type === 'touchend')) {
        $canvas.eHoldingFlag = false;
        eventScroll.stop();
    } else if ($canvas.eHoldingFlag && ($e.type === 'mousemove' || $e.type === 'touchmove')) {
        $canvas.eHoldingFlag = e;
    }// else if (!$canvas.eHoldingFlag && e.type === 'contextmenu') {

    for (let i = 0; i < caughts.length; i++) {
        // trigger 'mouseout' or 'touchout' event 
        if (
            ($e.type === 'mousemove' || $e.type === 'touchmove') &&
            $canvas.eLastMouseHover && $canvas.eLastMouseHover !== caughts[i] &&
            caughts.indexOf($canvas.eLastMouseHover) === -1
        ) {
            // touchout待移除（目前可能不触发）
            let eMouseout = $canvas.eLastMouseHover['events']['mouseout'] || $canvas.eLastMouseHover['events']['touchout'];
            if (eMouseout) {
                eMouseout.call($canvas.eLastMouseHover, $e);
            }
        }

        if ($e.type === 'mousewheel') {
            eventScroll.wheel(caughts[i], $e);
        } else if ($canvas.eHoldingFlag && $e.type === 'touchmove') {
            if (eventScroll.touch(caughts[i], $e)) {
                return;
            }
        }

        if (!caughts[i]['events']) continue; // TODO to remove

        let handler = caughts[i]['events'][$e.type];
        if (handler) {
            $canvas.eLastMouseHover = caughts[i];
            let result = handler.call(caughts[i], $e);
            // stop then chain and cancel 'hold' event's flag
            if (result === true) {
                $canvas.eHoldingFlag = false;
                return result;
            } else if (result === 'drag') {
                $canvas.eHoldingFlag = false;
                return result;
            }
        }

        if (caughts[i].events.through === false) {
            return;
        }
    }

    if (!caughts.length && $canvas.eLastMouseHover) {
        // hover更替，触发mouseout
        let eMouseout = $canvas.eLastMouseHover['events']['mouseout'];
        if (eMouseout) {
            eMouseout.call($canvas.eLastMouseHover, $e);
        }
        $canvas.eLastMouseHover = null;
    }

    let handler = $canvas.events[$e.type];
    if (handler) {
        if (handler.call($canvas, $e)) {
            $canvas.eHoldingFlag = false;
            return true;
        }
    }
};
