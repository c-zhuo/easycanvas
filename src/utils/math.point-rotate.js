const PI = 3.141593;

module.exports = function (x, y, rx0, ry0, d, returnArr) {
    let deg = d ? -d / 180 * PI : 0;
    let _x = x, _y = y;

    if (d) {
        _x = (x - rx0) * Math.cos(deg) - (y - ry0) * Math.sin(deg) + rx0;
        _y = (x - rx0) * Math.sin(deg) + (y - ry0) * Math.cos(deg) + ry0;
    }

    if (returnArr) {
        return [_x, _y];
    }

    return {
        x: _x,
        y: _y  
    };
};
