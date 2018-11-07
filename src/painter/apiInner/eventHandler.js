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

const isMobile = typeof wx !== 'undefined' ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
 */
const hitSprite = function ($sprite, e) {
    let rect = $sprite.getRect();

    return utils.pointInRect(
        e.canvasX, e.canvasY,
        rect.tx, rect.tx + rect.tw,
        rect.ty, rect.ty + rect.th
    );
};

/**
 * Sort all the sprites(including children), then put to @caughts
 * - Child is above the parent only if Index >= 0
 */
const looper = function (arr, e, caughts) {
    if (!arr || !arr.length) return;
    if (e.$stopPropagation) return;

    let l = arr.length;
    for (let i = 0; i < l; i++) {
        let item = arr[i];
        if (utils.funcOrValue(item.style.visible, item) === false) continue;
        if (item.events && item.events.pointerEvents === 'none') continue;

        if (hitSprite(item, e)) {
            let interceptor = item.events.interceptor;

            if (process.env.NODE_ENV !== 'production') {
                if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                    // 选取Sprite时禁掉捕获，以免事件被阻止，导致无法选中
                    interceptor = false;
                }
            }

            if (interceptor) {
                var result = utils.firstValuable(interceptor.call(item, e), e);
                if (!result || result.$stopPropagation) return;
            }
        }

        let children = item.$combine ? item.$combine.children : item.children;
        if (process.env.NODE_ENV !== 'production') {
            if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                // 选取Sprite时不选取内部Sprite
                children = item.children;
            }
        }

        if (children.length) {
            // Children above
            looper(sortByIndex(children.filter(function (a) {
                if (process.env.NODE_ENV !== 'production') {
                    if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                        return utils.funcOrValue(a.style.zIndex, a) >= 0;
                    }
                }

                return utils.funcOrValue(utils.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0;
            })), e, caughts);
        }

        if (e.$stopPropagation) break;

        if (hitSprite(item, e)) {
            if (process.env.NODE_ENV !== 'production') {
                // 开发者工具select模式下为选取元素
                if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                    if (item.name !== constants.devFlag) {
                        e.stopPropagation();
                        if (item.$canvas.$plugin.selectSprite(e.type === 'click' || e.type === 'touchend', item.$canvas, item)) {
                            return;
                        }
                    }
                    continue;
                }
            }

            triggerEventOnSprite(item, e, caughts);
            e.stopPropagation();
            return;
        }

        if (children.length) {
            // Children below
            looper(sortByIndex(children.filter(function (a) {
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

const extend = function ($e, caughts) {
    this.$extendList.forEach((plugin) => {
        if (plugin.onEvent) {
            plugin.onEvent.call(this, $e, caughts);
        }
    });
};

const triggerEventOnSprite = function ($sprite, $e, caughts) {
    caughts && caughts.push($sprite);

    if ($sprite.events[$e.type]) {
        $sprite.events[$e.type].call($sprite, $e);
        if ($e.$stopPropagation) return;
    }

    if ($sprite.$parent) {
        triggerEventOnSprite($sprite.$parent, $e, caughts);
    } else {
        if ($sprite.$canvas && !$e.$stopPropagation) {
            triggerEventOnSprite($sprite.$canvas, $e);
            $e.stopPropagation();
        }
    }
};

const fastclick = {
    x: 0, y: 0, timeStamp: 0,
};

var eventHandler;
eventHandler = function (e, _$e) {
    let $canvas = this;

    let layerX;
    let layerY;
    let scaleX = 1;
    let scaleY = 1;

    if (!_$e) {
        if (!e.layerX && e.targetTouches && e.targetTouches[0]) {
            layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
            layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
        } else if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
            layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
            layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
        } else {
            layerX = e.layerX;
            layerY = e.layerY;
        }

        let isRotated = false; // TODO

        if (this.$dom.getBoundingClientRect) {
            let bcr = this.$dom.getBoundingClientRect();
            bcr.width > bcr.height !== this.width > this.height

            scaleX = Math.floor(bcr[isRotated ? 'height' : 'width']) / this.width;
            scaleY = Math.floor(bcr[isRotated ? 'width' : 'height']) / this.height;
        }

    }

    let $e = _$e || {
        type: e.type,
        canvasX: layerX / scaleX,
        canvasY: layerY / scaleY,
        event: e
    };

    if (isMobile && $canvas.fastclick) {
        if ($e.type === 'click' && !$e.$fakeClick) {
            return;
        } else if ($e.type === 'touchstart') {
            fastclick.x = $e.canvasX;
            fastclick.y = $e.canvasY;
            fastclick.timeStamp = Date.now();
        } else if ($e.type === 'touchend') {
            if (Math.abs(fastclick.x - $e.canvasX) < 30 && Math.abs(fastclick.y - $e.canvasY) < 30 && Date.now() - fastclick.timeStamp < 200) {
                eventHandler.call(this, null, {
                    $fakeClick: true,
                    type: 'click',
                    canvasX: fastclick.x,
                    canvasY: fastclick.y,
                    event: e
                });
            }
        }
    }

    $e.stopPropagation = function () {
        $e.$stopPropagation = true;
    };

    if ($canvas.events.interceptor) {
        $e = utils.firstValuable($canvas.events.interceptor.call($canvas, $e), $e);
        if (!$e || $e.$stopPropagation) return;
    }

    let caughts = [];

    // if ($canvas.$flags.dragging && $canvas.$flags.dragging.$id) {
    //     // 拖拽状态下，拖拽中的sprite优先触发事件
    //     caughts.push($canvas.$flags.dragging);
    // }

    looper(sortByIndex($canvas.children), $e, caughts);

    // utils.execFuncs($canvas.hooks.afterEvent, $canvas, $e);
    // $canvas.hooks.afterEvent = null;

    extend.call($canvas, $e, caughts);

    // Create a new event: 'hold' (suits both mobile and pc)
    // if (!$canvas.eHoldingFlag && ($e.type === 'mousedown' || $e.type === 'touchstart')) {
    //     $canvas.eHoldingFlag = $e;
    // } else if ($canvas.eHoldingFlag && ($e.type === 'mouseup' || $e.type === 'touchend')) {
    //     $canvas.eHoldingFlag = false;
    // } else if ($canvas.eHoldingFlag && ($e.type === 'mousemove' || $e.type === 'touchmove')) {
    //     $canvas.eHoldingFlag = $e;
    // }// else if (!$canvas.eHoldingFlag && e.type === 'contextmenu') {

    // trigger 'mouseout' or 'touchout' event 
    if (
        ($e.type === 'mousemove' || $e.type === 'touchmove') &&
        $canvas.eLastMouseHover &&
        caughts.indexOf($canvas.eLastMouseHover) === -1
    ) {
        // touchout待移除（目前可能不触发）
        let eMouseout = $canvas.eLastMouseHover['events']['mouseout'] || $canvas.eLastMouseHover['events']['touchout'];
        if (eMouseout) {
            eMouseout.call($canvas.eLastMouseHover, $e);
        }
    }
    $canvas.eLastMouseHover = caughts[0];

    if (!caughts.length && $canvas.eLastMouseHover) {
        // hover更替，触发mouseout
        let eMouseout = $canvas.eLastMouseHover['events']['mouseout'];
        if (eMouseout) {
            eMouseout.call($canvas.eLastMouseHover, $e);
        }
        $canvas.eLastMouseHover = null;
    }

    let handler = $canvas.events[$e.type];
    if (handler && !$e.$stopPropagation) {
        if (handler.call($canvas, $e)) {
            $canvas.eHoldingFlag = false;
            return true;
        }
    }
};

module.exports = eventHandler;
