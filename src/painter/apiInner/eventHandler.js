/** ********** *
 *
 * Handle events on canvas (Includes both user's events and debugging events)
 * - Compare event's coordinate and the coordinate of every sprite in
 *   Easycanvas.children, and check sprite's handlers one by one.
 * - Events: 'contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown',
 *   'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'
 * - Expanded events: touchout(deprecated)
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';

const isMobile = typeof wx !== 'undefined' ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/**
 * Sprite排序
 * - Order by eIndex dev-tool's in events' triggering
 * - Order by zIndex in dev-tool's select mode
 */
const sortByIndex = function (arr) {
    return arr.sort(function (a, b) {
        if (process.env.NODE_ENV !== 'production') {
            // Chrome开发者工具选取元素时，按照可见顺序(zIndex)触发事件，更符合开发者的习惯
            if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                return utils.funcOrValue(a.style.zIndex, a) < utils.funcOrValue(b.style.zIndex, b) ? 1 : -1;
            }
        }

        return utils.funcOrValue(utils.firstValuable(a.events.eIndex, a.style.zIndex), a) < utils.funcOrValue(utils.firstValuable(b.events.eIndex, b.style.zIndex), b) ? 1 : -1;
    });
};

// 需要根据eIndex或者zIndex对所有子节点进行排序，可能时间开销较大，因此对排序结果进行缓存
// 为了避免影响用户体验，缓存有效期控制在50ms以内
// js的sort的复杂度为O(nlogn)，近似认为n，
// 因此，根据数组长度计算真正的缓存有效期 = Math.min(50, 50 * length / 1000)
const sortMaxCacheExpire = 50;

const hitSprite = function ($sprite, e) {
    let rect = $sprite.getRect(true/* from cache */);

    return utils.pointInRect(
        e.canvasX, e.canvasY,
        rect.left, rect.right,
        rect.top, rect.bottom
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
        let $sprite = arr[i];
        if (utils.funcOrValue($sprite.style.visible, $sprite) === false) continue;
        if ($sprite.events && $sprite.events.pointerEvents === 'none') continue;

        if (hitSprite($sprite, e)) {
            let interceptor = $sprite.events.interceptor;

            if (process.env.NODE_ENV !== 'production') {
                if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                    // 选取Sprite时禁掉捕获，以免事件被阻止，导致无法选中
                    interceptor = false;
                }
            }

            if (interceptor) {
                // var result = utils.firstValuable(interceptor.call($sprite, e), e);
                // if (!result || result.$stopPropagation) return;

                utils.execFuncs(interceptor, $sprite, [e]);
                if (e.$stopPropagation) return;
            }
        }

        let children = $sprite.$combine && $sprite.$combine.children ? $sprite.$combine.children : $sprite.children;
        if (process.env.NODE_ENV !== 'production') {
            if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                // 选取Sprite时不选取内部Combine的Sprite
                children = $sprite.children;
            }
        }

        const lastPaintTime = $sprite.$canvas.$lastPaintTime;
        const cacheTime = Math.min(sortMaxCacheExpire, sortMaxCacheExpire * children.length / 1000);

        if (children.length) {
            // Children above
            const aboveChildrenInOrder = $sprite.$cache.aboveChildrenGenTime + cacheTime > lastPaintTime && $sprite.$cache.aboveChildrenInOrder || sortByIndex(children.filter(function (a) {
                if (process.env.NODE_ENV !== 'production') {
                    if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                        return utils.funcOrValue(a.style.zIndex, a) >= 0;
                    }
                }

                return utils.funcOrValue(utils.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0;
            }));
            $sprite.$cache.aboveChildrenInOrder = aboveChildrenInOrder;
            $sprite.$cache.aboveChildrenGenTime = lastPaintTime;

            looper(aboveChildrenInOrder, e, caughts);
        }

        if (e.$stopPropagation) break;

        if (hitSprite($sprite, e)) {
            if (process.env.NODE_ENV !== 'production') {
                // 开发者工具select模式下为选取元素
                if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                    if ($sprite.name !== constants.devFlag) {
                        e.stopPropagation();
                        if ($sprite.$canvas.$plugin.selectSprite(e.type === 'click' || e.type === 'touchend', $sprite.$canvas, $sprite)) {
                            return;
                        }
                    }
                    continue;
                }
            }

            triggerEventOnSprite($sprite, e, caughts);
            e.stopPropagation();
            return;
        }

        if (children.length) {
            // Children below
            const belowChildrenInOrder = $sprite.$cache.belowChildrenGenTime + cacheTime > lastPaintTime && $sprite.$cache.aboveChildrenInOrder || sortByIndex(children.filter(function (a) {
                if (process.env.NODE_ENV !== 'production') {
                    if (window[constants.devFlag] && window[constants.devFlag].selectMode) {
                        return utils.funcOrValue(a.style.zIndex, a) < 0;
                    }
                }

                return !(utils.funcOrValue(utils.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0);
            }));
            $sprite.$cache.belowChildrenInOrder = belowChildrenInOrder;
            $sprite.$cache.belowChildrenGenTime = lastPaintTime;

            looper(belowChildrenInOrder, e, caughts);
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
        utils.execFuncs($sprite.events[$e.type], $sprite, [$e]);
        // $sprite.events[$e.type].call($sprite, $e);
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

var eventHandler = function (e, _$e) {
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
            // 已经触发过模拟的click，不再触发原生click事件
            return;
        } else if ($e.type === 'touchstart') {
            fastclick.x = $e.canvasX;
            fastclick.y = $e.canvasY;
            fastclick.timeStamp = Date.now();
        } else if ($e.type === 'touchend') {
            // 满足fastclick条件，touchend后立刻触发模拟的click
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

    $e.preventDefault = function () {
        $e.event.preventDefault();
    };

    if ($canvas.events.interceptor) {
        // $e = utils.firstValuable($canvas.events.interceptor.call($canvas, $e), $e);
        // if (!$e || $e.$stopPropagation) return;

        utils.execFuncs($canvas.events.interceptor, $canvas, [$e]);
        if (e.$stopPropagation) return;
    }

    let caughts = [];

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
        utils.execFuncs(handler, $canvas, [$e]);
        // if (handler.call($canvas, $e)) {
        //     $canvas.eHoldingFlag = false;
        //     return true;
        // }
    }
};

export default eventHandler;
