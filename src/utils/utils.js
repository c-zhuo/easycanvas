module.exports = {
    funcOrValue: function (funcOrValue, _this) {
        if (typeof funcOrValue === 'function') {
            let res = funcOrValue.call(_this);
            return res && typeof res.$$value !== 'undefined' ? res.$$value : res;
        }

        return funcOrValue;
    },

    // 执行钩子函数或者钩子函数队列
    execFuncs: function (funcOrArray, _this, _arg) {
        if (typeof funcOrArray === 'function') {
            funcOrArray.apply(_this, _arg);
        } else if (Array.prototype.isPrototypeOf(funcOrArray)) {
            funcOrArray.forEach((f) => {
                f && f.apply(_this);
            });
        }
    },

    blend: ['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],

    pointInRect: function (x, y, x1, x2, y1, y2) {
        return !(x < x1 || x > x2 || y < y1 || y > y2);
    },

    firstValuable: function (a, b) {
        return typeof a === 'undefined' ? b : a;
    },
};
