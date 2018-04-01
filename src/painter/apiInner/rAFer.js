/** ********** *
 *
 * Execute function(@f) in each frame
 * - Limit by browsers, adjusting the time not being a multiple of RAF's interval (16.7ms).
 * - See https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
 *
 * ********** **/

import tick from 'utils/tick.js';

module.exports = function (f) {
    let time = new Date().getTime();
    window.Easycanvas.transition.$lastPaintTime = this.$nextTickTime = time;

    if (time - this.fpsCalculateTime >= 1000) {
        this.fpsCalculateTime = time;
        if (this.fpsHandler) {
            this.fpsHandler.call(this, this.fps);
        }
        this.lastFps = this.fps;
        this.fps = 0;
    }

    tick(function (rafTime) {
        this.$rafTime = rafTime;
        this.$rAFer(f);
        if (this.maxFps > 0 && this.maxFps < 60) {
            if (time - this.$lastPaintTime <= 1000 / this.maxFps) {
                return;
            }
            // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
            this.$lastPaintTime = time - (time - this.$lastPaintTime) % (1000 / this.maxFps);
        }
        f();
    }.bind(this));
};
