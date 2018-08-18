/** ********** *
 *
 * Handle wheel events on canvas
 * - Wheel events pass in from eventHandler.js.
 * - Includes touch scroll and mouse wheel scroll.
 *
 * ********** **/

import utils from 'utils/utils.js';
import tick from 'utils/tick.js';

let startPos = {};
let scrolling = false;

let tickPool = [];

let scrollFuncs = {
    stop: function () {
        scrolling = false;
    },

    tick: function () {
        tick(scrollFuncs.looper);
    },

    looper: function () {
        tickPool.forEach(function ($sprite, index) {
            let speedX = $sprite.$scroll.speedX;
            let speedY = $sprite.$scroll.speedY;

            if (Math.abs($sprite.$scroll.speedX) > 1) {
                $sprite.$scroll.speedX *= $sprite.scroll.smooth || 0.8;
            } else {
                $sprite.$scroll.speedX = 0;
            }
            if (Math.abs($sprite.$scroll.speedY) > 1) {
                $sprite.$scroll.speedY *= $sprite.scroll.smooth || 0.8;
            } else {
                $sprite.$scroll.speedY = 0;
            }

            if (Math.abs($sprite.$scroll.speedX) <= 1 && Math.abs($sprite.$scroll.speedY) <= 1) {
                tickPool.splice(index, 1);
                return;
            }

            $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
            $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

            let minScrollX = utils.funcOrValue($sprite.scroll.minScrollX, $sprite);
            let maxScrollX = utils.funcOrValue($sprite.scroll.maxScrollX, $sprite);
            let minScrollY = utils.funcOrValue($sprite.scroll.minScrollY, $sprite);
            let maxScrollY = utils.funcOrValue($sprite.scroll.maxScrollY, $sprite);

            if (!isNaN(minScrollY) && $sprite.scroll.scrollY < minScrollY) {
                $sprite.scroll.scrollY = minScrollY;
            } else if (!isNaN(maxScrollY) && $sprite.scroll.scrollY > maxScrollY) {
                $sprite.scroll.scrollY = maxScrollY;
            }

            if (!isNaN(minScrollX) && $sprite.scroll.scrollX < minScrollX) {
                $sprite.scroll.scrollX = minScrollX;
            } else if (!isNaN(maxScrollX) && $sprite.scroll.scrollX > maxScrollX) {
                $sprite.scroll.scrollX = maxScrollX;
            }
        });

        scrollFuncs.tick();
    },

    touch: function ($sprite, $e) {
        if (!$sprite.scroll.scrollable) return false;

        if (!scrolling) {
            // start scroll
            scrolling = Date.now();
            startPos.x = $e.canvasX;
            startPos.y = $e.canvasY;
        } else {
            if (tickPool.indexOf($sprite) === -1) {
                tickPool.push($sprite);
            }

            let absX = Math.abs($e.canvasX - startPos.x);
            let absY = Math.abs($e.canvasY - startPos.y);
            let deltaTime = Date.now() - scrolling;
            scrolling = Date.now();
            deltaTime /= 10;
            if (absX / deltaTime > 1 && deltaTime > 1) {
                $sprite.$scroll.speedX += ($e.canvasX - startPos.x) / deltaTime;
            }
            if (absY / deltaTime > 1 && deltaTime > 1) {
                $sprite.$scroll.speedY += ($e.canvasY - startPos.y) / deltaTime;
            }

            startPos.x = $e.canvasX;
            startPos.y = $e.canvasY;

            $e.event.preventDefault();
            return true;
        }
    },

    wheel: function ($sprite, $e) {
        if (!$sprite.scroll.scrollable) return false;

        if (tickPool.indexOf($sprite) === -1) {
            tickPool.push($sprite);
        }

        $sprite.$scroll.speedX = $e.event.wheelDeltaX;
        $sprite.$scroll.speedY = $e.event.wheelDeltaY;

        $e.event.preventDefault();
        return true;
    }
};

module.exports = scrollFuncs;

