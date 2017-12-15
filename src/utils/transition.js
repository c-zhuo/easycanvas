import utils from './utils.js';

const transitions = [];

// Math.PI wastes some performace
const PI = 3.141593;

const second2frame = function (second) {
    return second / 1000 * 60;
};

let transFuncs = {
    linear: function (a, b, duration) {
        let l = transitions.length;
        transitions.push(a);

        let loop = false;

        let resFunc = function () {
            let current = transitions[l];
            if ((current >= a && current < b) || (current > b && current <= a)) {
                transitions[l] += (b - a) / second2frame(duration);
            } else {
                if (loop) {
                    transitions[l] = a;
                }

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

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };

        return resFunc;
    },

    pendulum: function (a, b, duration, _config) {
        let config = _config || {};
        config.start = utils.firstValuable(config.start, -PI);
        config.end = utils.firstValuable(config.end, PI);
        config.cycle = utils.firstValuable(config.cycle, 2 * PI);

        let l = transitions.length;
        transitions.push(config.start);

        let loop = false;
        let stay = false;

        let resFunc = function () {
            let current = Math.cos(transitions[l]) + 1; // 0 ~ 2
            transitions[l] += PI / second2frame(duration);

            if (transitions[l] > config.end) {
                if (loop) {
                    transitions[l] -= config.cycle;
                } else {
                    transitions[l] = config.end;
                }
            }

            return {
                $$value: utils.funcOrValue(a) + (utils.funcOrValue(b) - utils.funcOrValue(a)) * current / 2,
                $$over: !stay && transitions[l] >= config.end,
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

    halfPendulum: function (a, b, duration) {
        return transFuncs.pendulum(a, b, duration, {
            start: -PI,
            end: 0,
            cycle: PI,
        });
    },

    oneByOne: function (_arr) {
        let arr = _arr;
        let loop = false;

        let resFunc = function () {
            for (let i = 0; i < arr.length; i++) {
                let res = arr[i]();
                if (typeof res === 'object') {
                    if (!res.$$over) {
                        return res.$$value;
                    }
                } else if (res !== false) {
                    return res;
                }
            }

            if (loop) {
                let res;
                for (let i = 0; i < arr.length; i++) {
                    let tmp = arr[i]();
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
