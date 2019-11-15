// 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
// 用于跳过绘制的判断
// 用中心点距离+上下左右分离的方式模糊判断

import pointRotate from './math.point-rotate.js';

const PI = 3.141593;

export default function (x, y, x2, y2, w2, h2, rx, ry, deg) {
    let _deg = deg ? -deg / 180 * PI : 0;

    if (_deg) {
        x = (x - rx) * Math.cos(_deg) - (y - ry) * Math.sin(_deg) + rx;
        y = (x - rx) * Math.sin(_deg) + (y - ry) * Math.cos(_deg) + ry;
    }

    return x >= x2 && x <= x2 + w2 &&
        y >= y2 && y <= y2 + h2;
};
