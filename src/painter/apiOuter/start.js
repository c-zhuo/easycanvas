/** ********** *
 *
 * Start rAF loop
 * - Cannot called twice on same instance
 *
 * ********** **/

import tick from 'utils/tick.js';
import transition from 'utils/transition.js';

const rAFer = function () {
    let time = Date.now();
    transition.$lastPaintTime = this.$nextTickTime = time;

    // calculating fps
    if (time - this.fpsCalculateTime >= 1000) {
        this.fpsCalculateTime = time;
        if (this.fpsHandler) {
            this.fpsHandler.call(this, this.fps);
        }
        this.lastFps = this.fps;
        this.fps = 0;
    }

    tick(loop.bind(this));
};

const loop = function (rafTime) {
    this.$rafTime = rafTime;
    rAFer.call(this);
    if (this.maxFps > 0 && this.maxFps < 60) {
        if (time - this.$lastPaintTime <= 1000 / this.maxFps) {
            return;
        }

        // 让$lastPaintTime不带有小尾巴（101，199，202，298这种变成100，200，300，400）
        // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
        this.$lastPaintTime = time - (time - this.$lastPaintTime) % (1000 / this.maxFps);
    } else {
        this.$lastPaintTime = Date.now();
    }
    this.fps++;
    this.paint();
};

module.exports = function () {
    this.fpsCalculateTime = Date.now();


    rAFer.call(this);

    // setInterval(() => {
    //     if (this.eHoldingFlag) {
    //         let $e = this.eHoldingFlag;
    //         $e.type = 'hold';

    //         this.$eventHandler.call(this, null, $e);
    //     }
    // }, 100); // TODO

    return this;
};
