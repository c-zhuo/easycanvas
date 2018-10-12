// /** ********** *
//  *
//  * Bind drag events to EVERY SPRITE.
//  * - Whether to trigger handlers, is decided by '$Sprite.scroll.scrollable'.
//  * - Drag events FISRT, scroll events FOLLOWING. Drags will stop events' bubbling.
//  * - TODO: Move 'bindings' to event handlers
//  * - WARN: Hold will not trigger on draging
//  *
//  * ********** **/

// import utils from 'utils/utils.js';

// let draggingFlag = false;

// const setFlag = function ($sprite, value) {
//     $sprite.drag.draggingFlag = value;
//     draggingFlag = value;
// };

// const dragHandler = function (originHandler, item, e, dragEnabled) {
//     return originHandler ? originHandler.call(item, e) : (dragEnabled ? 'drag' : false);
// };

// const isMobile = typeof wx !== 'undefined' ||
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// module.exports = {
//     bind: function ($sprite) {
//         let startDragPosition = {
//             x: 0,
//             y: 0
//         };

//         $sprite.drag = $sprite.drag || {};

//         $sprite.drag.draggingFlag = false;

//         let oMousedown = $sprite.events.mousedown || $sprite.events.touchstart;
//         $sprite.events[isMobile ? 'touchstart' : 'mousedown'] = function (e) {
//             // if dragable is a object, it means the range of dragable area
//             if ($sprite.drag.dragable) {
//                 setFlag($sprite, true);
//                 let relativeX = e.canvasX - this.getStyle('tx');
//                 let relativeY = e.canvasY - this.getStyle('ty');

//                 startDragPosition.x = e.canvasX;
//                 startDragPosition.y = e.canvasY;
//             }

//             return dragHandler(oMousedown, $sprite, e, $sprite.drag.dragable);
//         }.bind($sprite);

//         let oMousemove = $sprite.events.mousemove || $sprite.events.touchmove;
//         $sprite.events[isMobile ? 'touchmove' : 'mousemove'] = function (e) {
//             let worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
//             if (worked) {
//                 this.style.tx += e.canvasX - startDragPosition.x;
//                 this.style.ty += e.canvasY - startDragPosition.y;

//                 // 立即更新cache，否则拖拽太快可能触发跟不上
//                 this.$canvas.$flags.dragging = this;

//                 startDragPosition.x = e.canvasX;
//                 startDragPosition.y = e.canvasY;
//             }
//             return dragHandler(oMousemove, $sprite, e, worked);
//         }.bind($sprite);

//         let oMouseup = $sprite.events.mouseup || $sprite.events.touchend;
//         $sprite.events[isMobile ? 'touchend' : 'mouseup'] = function (e) {
//             let worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;

//             this.$canvas.$flags.dragging = undefined;

//             if ($sprite.drag.draggingFlag && $sprite.drag.dragable) {
//                 setFlag($sprite, false);
//             }
//             return dragHandler(oMouseup, $sprite, e, worked);
//         };

//         let oMouseout = $sprite.events.mouseout;
//         $sprite.events.mouseout = function (e) {
//             let worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
//             setFlag($sprite, false);
//             return dragHandler(oMouseout, $sprite, e, worked);
//         };

//         let oClick = $sprite.events.click;
//         $sprite.events.click = function (e) {
//             let worked = $sprite.drag.dragable;
//             if (worked) {
//                 let relativeX = e.canvasX - $sprite.getStyle('tx');
//                 let relativeY = e.canvasY - $sprite.getStyle('ty');
//                 return oClick ? oClick.call($sprite, e) : true;
//             }
//             return dragHandler(oClick, $sprite, e, worked);
//         };
//     },
// };
