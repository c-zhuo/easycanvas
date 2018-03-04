/** ********** *
 *
 * Bind drag events to EVERY SPRITE.
 * - Whether to trigger handlers, is decided by '$Sprite.scroll.scrollable'.
 * - Drag events FISRT, scroll events FOLLOWING. Drags will stop events' bubbling.
 * - TODO: Move 'bindings' to event handlers
 *
 * ********** **/

import utils from 'utils/utils.js';

let draggingFlag = false;

const setFlag = function ($sprite, value) {
    $sprite.drag.draggingFlag = value;
    draggingFlag = value;
};

const dragHandler = function (originHandler, item, e, dragEnabled) {
    return originHandler ? originHandler.call(item, e) : (dragEnabled ? 'drag' : false);
};

module.exports = {
    bind: function ($sprite) {
        let startDragPosition = {
            x: 0,
            y: 0
        };
        $sprite.drag.draggingFlag = false;

        let oMousedown = $sprite.events.mousedown || $sprite.events.touchstart;
        $sprite.events.touchstart = $sprite.events.mousedown = function (e) {
            // if dragable is a object, it means the range of dragable area
            if ($sprite.drag.dragable) {
                setFlag($sprite, true);
                let relativeX = e.canvasX - this.$cache.tx;
                let relativeY = e.canvasY - this.$cache.ty;

                startDragPosition.x = e.canvasX;
                startDragPosition.y = e.canvasY;
            }

            return dragHandler(oMousedown, $sprite, e, $sprite.drag.dragable);
        }.bind($sprite);

        let oMousehold = $sprite.events.hold || $sprite.events.mousemove; //TODO 不规范？
        $sprite.events.touchmove = $sprite.events.mousemove = function (e) {
            let worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
            if (worked) {
                this.style.tx += e.canvasX - startDragPosition.x;
                this.style.ty += e.canvasY - startDragPosition.y;

                startDragPosition.x = e.canvasX;
                startDragPosition.y = e.canvasY;
            }
            return dragHandler(oMousehold, $sprite, e, worked);
        }.bind($sprite);

        let oMouseup = $sprite.events.mouseup || $sprite.events.touchend;
        $sprite.events.touchend = $sprite.events.mouseup = function (e) {
            let worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
            if ($sprite.drag.draggingFlag && $sprite.drag.dragable) {
                setFlag($sprite, false);
            }
            return dragHandler(oMouseup, $sprite, e, worked);
        };

        let oMouseout = $sprite.events.mouseout;
        $sprite.events.mouseout = function (e) {
            let worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
            setFlag($sprite, false);
            return dragHandler(oMouseout, $sprite, e, worked);
        };

        let oClick = $sprite.events.click;
        $sprite.events.click = function (e) {
            let worked = $sprite.drag.dragable;
            if (worked) {
                let relativeX = e.canvasX - $sprite.$cache.tx;
                let relativeY = e.canvasY - $sprite.$cache.ty;
                return oClick ? oClick.call($sprite, e) : true;
            }
            return dragHandler(oClick, $sprite, e, worked);
        };
    },
};
