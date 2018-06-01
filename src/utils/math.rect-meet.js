// 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
// 用于跳过绘制的判断
// 用中心点模糊判断

import pointRotate from './math.point-rotate.js';

module.exports = function (x1, y1, w1 = 0, h1 = 0, x2, y2, w2, h2, rx, ry, deg) {
    var cx = x1 + w1 / 2;
    var cy = y1 + h1 / 2;

    var distance = Math.max(w1, h1) + Math.max(w2, h2);

    if (deg) {
        var newxy = pointRotate(cx, cy, rx, ry, deg);
        cx = newxy.x, cy = newxy.y;
    }

    return Math.pow((cx - (x2 + w2 / 2)), 2) + Math.pow((cy - (y2 + y2 / 2)), 2) < Math.pow(distance, 2);
};
