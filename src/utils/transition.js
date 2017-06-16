import utils from './utils.js';

var transitions = [];

var PI = 3.141593;

var second2frame = function (second) {
    return second / 1000 * 60;
};

var transFuncs = {
    linear: function (a, b, duration) {
        var l = transitions.length;
        transitions.push(a);
        var resFunc = function () {
            var current = transitions[l];
            if ((current >= a && current < b) || (current > b && current <= a)) {
                transitions[l] += (b - a) / second2frame(duration);
            } else {
                return {
                    $$value: b,
                    $$over: true,
                    $$loop: function () {
                        transitions[l] = a;
                    }
                };
            }
            return {
                $$value: current,
                $$over: false
            };
        };
        return resFunc;
    },

    pendulum: function (a, b, duration) {
        var l = transitions.length;
        transitions.push(-PI);

        var loop = false;
        var stay = false;

        var resFunc = function () {
            var current = Math.cos(transitions[l]) + 1; // 0 ~ 2
            transitions[l] += PI / second2frame(duration);

            if (stay && transitions[l] >= 1 * PI) {
                transitions[l] = 1 * PI;
            } else if (loop && transitions[l] >= 1 * PI) {
                transitions[l] -= 2 * PI;
            }

            return {
                $$value: utils.funcOrValue(a) + (utils.funcOrValue(b) - utils.funcOrValue(a)) * current / 2,
                $$over: !stay && transitions[l] >= 1 * PI,
                $$loop: function () {
                    transitions[l] = -PI;
                }
            };
        };

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };
        resFunc.stay = function () {
            stay = true;
            return resFunc;
        };

        return resFunc;
    },

    oneByOne: function (_arr) {
        var arr = _arr;
        var loop = false;

        var resFunc = function () {
            for (var i = 0; i < arr.length; i++) {
                var res = arr[i]();
                if (typeof res === 'object') {
                    if (!res.$$over) {
                        return res.$$value;
                    }
                } else if (res !== false) {
                    return res;
                }
            }

            if (loop) {
                var res;
                for (var i = 0; i < arr.length; i++) {
                    var tmp = arr[i]();
                    if (tmp && tmp.$$loop) {
                        tmp.$$loop();
                        res = res || arr[i]();
                    }
                }
                return res;
            }
        };

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };

        return resFunc;
    },
};

module.exports = transFuncs;
