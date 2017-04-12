var detector = require('./utils/active-detect.js');

var option,
    t0,
    fps = -1,
    fpsTotal = 0,
    fpsLength = 0;

var sender = function () {
    if (!fpsLength) return;

    var ave = parseInt(fpsTotal / fpsLength);
    var href = window.location.href.split('?')[0].split('/');

    var n = href.pop().replace('.', '_');
    n = 'FPS_' + href.pop() + '_' + n;

    if (option.develop) {
        console.log('FPS', ave);
        return;
    }
    
    if (window.mta) {
        if (typeof window.mta === 'function' && fpsLength) {
            window.mta('timing', option.key || n, ave);
        }
    }
};

var res = function (_option) {
    option = _option || {};

    option.start = option.start || 1000;
    option.end = option.end || 4500;

    if (option.start >= option.end - 1000) {
        return;
    }

    if (!window.__rAF) {
        window.__rAF = window.requestAnimationFrame  ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.oRequestAnimationFrame       ||
            window.msRequestAnimationFrame      ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        // 休眠、切换tab等操作时，砍掉dirty的一个指标
        var isLastDirty = false;
        var setDirty = function () {
            isLastDirty = true;
        };

        if (!option.lite) {
            detector(setDirty, setDirty);
        }

        var tick = function () {
            var t = new Date().getTime();
            fps++;

            if (t - t0 > 1000) {
                if (!isLastDirty) {
                    fpsTotal += fps;
                    fpsLength++;
                } else {
                    isLastDirty = false;
                }

                fps = -1;
                t0 = t;
            }

            window.__rAF(tick);
        };

        setTimeout(function () {
            t0 = new Date().getTime();
            tick();
        }, option.start);

        setTimeout(function () {
            sender(option);
        }, option.end);
    }
};

res.send = sender;

module.exports = res;
