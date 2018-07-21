// Math.PI wastes some performace
const PI = 3.141593;

const second2frame = function (second) {
    return second / 1000 * 60;
};

const getLastPaintTime = function (transitions) {
    return transitions.$lastPaintTime || Date.now();
};

const transFuncs = {
    linear: function (a, b, duration) {
        if (a === b) return a;

        let startTime = getLastPaintTime(this);

        let loop = false;

        let resFunc = function () {
            let currentTime = this.$lastPaintTime;
            let result = (b - a) * (currentTime - startTime) / duration + a;

            if (loop) {
                if (b > a) {
                    while (result > b) {
                        result -= b - a;
                    }
                } else {
                    while (result < b) {
                        result += b - a;
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

            return result;
        }.bind(this);

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };

        resFunc.restart = function () {
            startTime = getLastPaintTime(this);
        };

        return resFunc;
    },

    pendulum: function (a, b, duration, _config) {
        if (a === b) return a;

        let startTime = getLastPaintTime(this);

        let config = _config || {};
        config.start = config.start || 0;

        let loop = false;

        let resFunc = function () {
            let currentTime = getLastPaintTime(this);
            let passTime = (currentTime - startTime) / duration;

            if (!loop) {
                if (config.cycle) {
                    if (config.cycle < passTime) {
                        resFunc.$done = true;
                        passTime = config.cycle;
                    }
                } else if (passTime > 1) {
                    resFunc.$done = true;
                    passTime = 1;
                }
            } else {
                if (config.cycle) {
                    passTime %= config.cycle;
                }
            }

            let deg = passTime * PI * 2 - (PI / 2) + config.start / 360 * PI;
            let result = (b - a) * (Math.sin(deg) + 1) / 2 + a;

            return result;
        }.bind(this);

        resFunc.loop = function () {
            loop = true;
            return resFunc;
        };

        resFunc.restart = function () {
            startTime = getLastPaintTime(this);
        };

        return resFunc;
    },

    ease: function (a, b, duration) {
        return this.pendulum(a, b, duration, {
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

module.exports = transFuncs;
