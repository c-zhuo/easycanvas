module.exports = {
    funcOrValue: function (funcOrValue, _this) {
        if (typeof funcOrValue === 'function') {
            var res = funcOrValue.call(_this);
            return res && res.$$value ? res.$$value : res;
        }

        return funcOrValue;
    },

    cent2value: function (cent, full) {
        if (typeof cent !== 'string' || !cent || !full) return cent;
        if (cent[cent.length - 1] === '%') return full * Number(cent.substr(0, cent.length - 1)) / 100;
        return cent;
    },

    getMinFromArray: function (arr) {
        var res = arr[0];
        arr.forEach(function (item) {
            if (item < res) res = item;
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
};
