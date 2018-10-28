// 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
// 用于跳过绘制的判断
// 用中心点距离+上下左右分离的方式模糊判断

import pointRotate from './math.point-rotate.js';
import pointInRect from './math.point-in-rect.js';

// module.exports = function (x1, y1, w1, h1, x2, y2, w2, h2, rx, ry, deg) {
//     var cx = x1 + w1 / 2;
//     var cy = y1 + h1 / 2;

//     var distance = Math.max(w1, h1) + Math.max(w2, h2);

//     if (deg) {
//         var newxy = pointRotate(cx, cy, rx, ry, deg);
//         cx = newxy.x, cy = newxy.y;
//     }

//     // 中心点距离太远一定不meet
//     var meet = Math.pow((cx - (x2 + w2 / 2)), 2) + Math.pow((cy - (y2 + y2 / 2)), 2) < Math.pow(distance, 2);
//     if (!meet) return false;

//     if (deg) {
//         // 没必要计算4个点
//         var point1 = pointRotate(x1, y1, rx, ry, deg);
//         // var point2 = pointRotate(x1 + w1, y1, rx, ry, deg);
//         var point3 = pointRotate(x1, y1 + h1, rx, ry, deg);
//         // var point4 = pointRotate(x1 + w1, y1 + h1, rx, ry, deg);
//         meet = Math.max(point1.x, point3) > x2 &&
//             Math.min(point1.x, point3.x) < x2 + w2 &&
//             Math.max(point1.y, point3.y) > y2 &&
//             Math.min(point1.y, point3.y) < y2 + h2;
//         // meet = Math.max(point1.x, point2.x, point3.x, point4.x) > x2 &&
//         //  Math.min(point1.x, point2.x, point3.x, point4.x) < x2 + w2 &&
//         //  Math.max(point1.y, point2.y, point3.y, point4.y) > y2 &&
//         //  Math.min(point1.y, point2.y, point3.y, point4.y) < y2 + h2;

//     } else {
//         meet = Math.max(x1 + w1, x2 + w2) - Math.min(x1, x2) < w1 + w2 &&
//             Math.max(y1 + h1, y2 + h2) - Math.min(y1, y2) < h1 + h2;
//     }

//     return meet;
// };

module.exports = function (x1, y1, w1, h1, x2, y2, w2, h2, rx, ry, deg) {
    if (!deg) {
        // 先快速判断几个明显不相交的场景，提升性能
        if (y1 > y2 + h2) return false;
        if (y2 > y1 + h1) return false;
        if (x1 > x2 + w2) return false;
        if (x2 > x1 + w1) return false;
    }

    var aMeetB = pointInRect(x1, y1, x2, y2, w2, h2, rx, ry, deg) ||
        pointInRect(x1 + w1, y1, x2, y2, w2, h2, rx, ry, deg) ||
        pointInRect(x1, y1 + h1, x2, y2, w2, h2, rx, ry, deg) ||
        pointInRect(x1 + w1, y1 + h1, x2, y2, w2, h2, rx, ry, deg);

    if (aMeetB) return true;

    // 将矩形1设置为原点，矩形2的xywh为：
    var bMeetA = pointInRect(x2, y2, x1, y1, w1, h1, rx, ry, -deg) ||
        pointInRect(x2 + w2, y2, x1, y1, w1, h1, rx, ry, -deg) ||
        pointInRect(x2, y2 + h2, x1, y1, w1, h1, rx, ry, -deg) ||
        pointInRect(x2 + w2, y2 + h2, x1, y1, w1, h1, rx, ry, -deg);

    if (bMeetA) return true;

    // 十字形
    if (y1 > y2 && y1 + h1 < y2 + h2 && x1 < x2 && x1 + w1 > x2 + w2) return true;
    if (x1 > x2 && x1 + w1 < x2 + w2 && y1 < y2 && y1 + h1 > y2 + h2) return true;

    return false;
};
