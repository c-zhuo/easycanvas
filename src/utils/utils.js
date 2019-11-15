const utils = {
    isArray: Array.isArray || ((arg) => {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }),

    funcOrValue: (funcOrValue, _this) => {
        if (typeof funcOrValue === 'function') {
            return funcOrValue.call(_this, _this);
        }

        return funcOrValue;
    },

    // 执行钩子函数或者钩子函数队列
    execFuncs: (funcOrArray, _this, _arg) => {
        if (funcOrArray) {
            if (!utils.isArray(_arg)) {
                _arg = [_arg];
            }
        }

        if (typeof funcOrArray === 'function') {
            // return funcOrArray.apply(_this, _arg);
            funcOrArray.apply(_this, _arg);
        } else if (utils.isArray(funcOrArray)) {
            // 返回值没用到
            // let res = [];
            // funcOrArray.length && funcOrArray.forEach((f) => {
            //     res.push(f && f.apply(_this, _arg));
            // });
            // return res;

            funcOrArray.length && funcOrArray.forEach((f) => {
                f && f.apply(_this, _arg);
            });
        }
    },

    blend: ['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],

    pointInRect: (x, y, x1, x2, y1, y2) => {
        return !(x < x1 || x > x2 || y < y1 || y > y2);
    },

    firstValuable: (a, b, c) => {
        // 效率低
        // for (let i = 0; i < arguments.length; i++) {
        //     if (typeof arguments[i] !== 'undefined') {
        //         return arguments[i];
        //     }
        // }
        // return a === undefined ? (b === undefined ? c : b) : a;
        return typeof a === 'undefined' ? (typeof b === 'undefined' ? c : b) : a;
    },
};

export default utils;
