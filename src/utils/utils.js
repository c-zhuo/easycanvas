module.exports = {
    funcOrValue: function (funcOrValue, _this) {
        if (typeof funcOrValue === 'function') {
            let res = funcOrValue.call(_this);
            return res && typeof res.$$value !== 'undefined' ? res.$$value : res;
        }

        return funcOrValue;
    },

    execFuncs: function (funcOrArray, _this, _arg) {
        if (typeof funcOrArray === 'function') {
            funcOrArray.apply(_this, _arg);
        } else if (Array.prototype.isPrototypeOf(funcOrArray)) {
            funcOrArray.forEach((f) => {
                f && f.apply(_this);
            });
        }
    },

    getMinFromArray: function (arr) {
        let res = arr[0];
        arr.forEach(function (item) {
            if (item < res) {
                res = item;
            }
        });
        return res;
    },

    getCharFromKey: function (k) {
        return k.key || String.fromCharCode(k.keyCode);
    },

    noop: function () {},

    firstValuable: function (a, b) {
        return typeof a === 'undefined' ? b : a;
    },

    assign: function (target, source) {
        for (let i in source) {
            if (Object.prototype.hasOwnProperty.call(source, i)) {
                target[i] = source[i];
            }
        }
        return target;
    },
};
