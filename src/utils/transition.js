// Math.PI wastes some performace
const PI = Math.PI;

import { funcOrValue } from './utils.js';

const getLastPaintTime = function (transitions) {
    return transitions.$lastPaintTime || Date.now();
};

const types = {
    linear: function (a, b, duration) {
        let startTime = getLastPaintTime(this);

        let loop = false;
        let callback;

        let resFunc = function () {
            let currentTime = this.$lastPaintTime;
            let progress = (currentTime - startTime) / duration;
            let result = (b - a) * progress + a;

            if (loop) {
                if (b > a) {
                    while (result > b) {
                        result -= b - a;
                    }
                } else {
                    while (result < b) {
                        result += a - b;
                    }
                }
            } else {
                if (b > a && result > b) {
                    resFunc.$done = true;
                    result = b;
                } else if (b < a && result < b) {
                    resFunc.$done = true;
                    result = b;
                }
            }

            if (progress >= 1 && callback) {
                callback.call(this, result);
                callback = null;
            }

            return result;
        }.bind(this);

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };

        resFunc.restart = function () {
            startTime = getLastPaintTime(this);
            return resFunc;
        };

        resFunc.then = function (cb) {
            callback = cb;
            return resFunc;
        };

        return resFunc;
    },

    pendulum: function (a, b, duration, _config) {
        let startTime = getLastPaintTime(this);

        let config = _config || {};
        config.start = config.start || 0;

        let loop = false;
        let callback;
        let cycle = config.cycle || 1;

        let resFunc = function () {
            let currentTime = getLastPaintTime(this);
            let progress = (currentTime - startTime) / duration;

            if (!loop) {
                if (cycle) {
                    if (progress > cycle) {
                        progress = cycle;
                        resFunc.$done = true;
                        progress = cycle;
                    }
                } else if (progress > 1) {
                    resFunc.$done = true;
                    progress = 1;
                }
            } else {
                if (cycle) {
                    progress %= cycle;
                }
            }

            let deg = progress * PI * 2 - (PI / 2) + config.start / 360 * PI;
            let result = (b - a) * (Math.sin(deg) + 1) / 2 + a;

            if (progress >= cycle && callback) {
                callback.call(this, result);
                callback = null;
            }

            return result;
        }.bind(this);

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };

        resFunc.restart = function () {
            startTime = getLastPaintTime(this);
            return resFunc;
        };

        resFunc.then = function (cb) {
            callback = cb;
            return resFunc;
        };

        return resFunc;
    },

    ease: function (a, b, duration) {
        return this.pendulum(a, b, duration * 2, {
            cycle: 0.5,
        });
    },

    oneByOne: function (_arr) {
        let arr = _arr;
        let loop = false;

        let resFunc = function () {
            for (let i = 0; i < arr.length; i++) {
                if (!arr[i].$done) {
                    return arr[i]();
                } else if (!arr[i].$nextRestart) {
                    arr[i].$nextRestart = true;
                    if (arr[i + 1]) {
                        arr[i + 1].restart();
                        return arr[i + 1]();
                    }
                }
            }

            if (loop) {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].$done = false;
                    arr[i].$nextRestart = false;
                    arr[i].restart();
                }
                return arr[0]();
            }

            return arr[arr.length - 1]();
        };

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };

        return resFunc;
    },
};

const transition = function (sprite, key, type, end, duration) {
    let current = funcOrValue(sprite[key]);

    if (process.env.NODE_ENV !== 'production') {
        if (typeof current === 'undefined') {
            console.warn('[Easycanvas] start value in transition is undefined, using 0 instead.');
        }
    }

    current = current || 0;

    sprite[key] = types[type].bind(transition)(current, end, duration);
};

for (var i in types) {
    transition[i] = types[i];
}

module.exports = transition;
