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
                };
            }
            return {
                $$value: current,
                $$over: false,
            };
        };
        return resFunc;
    },

    pendulum: function (a, b, duration) {
        var l = transitions.length;
        transitions.push(-PI);
        var resFunc = function () {
            var current = Math.cos(transitions[l]) + 1; // 0 ~ 2
            transitions[l] += PI / second2frame(duration);
            return {
                $$value: utils.funcOrValue(a) + (utils.funcOrValue(b) - utils.funcOrValue(a)) * current / 2,
                $$over: transitions[l] >= 3 * PI,
            };
        };
        return resFunc;
    },

    oneByOne: function (arr) {
        return function () {
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
        };
    },
};

module.exports = transFuncs;
