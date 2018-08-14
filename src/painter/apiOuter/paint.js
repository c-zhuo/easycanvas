/** ********** *
 *
 * Sort the sprite and call inner functions
 * - Will be called in each frame after the 'start' function called.
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function () {
    if (this.$pausing || (this.$inBrowser && document.hidden)) return;

    let $canvas = this;

    utils.execFuncs($canvas.hooks.beforeTick, $canvas, [$canvas.$rafTime]);

    if ($canvas.$paintContext.clearRect) {
        // $canvas.$paintContext.clearRect(0, 0, this.width, this.height);
    }

    if (!$canvas.$freezing) {
        $canvas.$children = [];

        if (process.env.NODE_ENV !== 'production') {
            $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'START');
        }

        this.children.sort(function (a, b) {
            let za = utils.funcOrValue(a.style.zIndex, a);
            let zb = utils.funcOrValue(b.style.zIndex, b);
            if (za === zb) return 0;
            return za > zb ? 1 : -1;
        }).forEach(function (perItem, index) {
            $canvas.$perPaint(perItem, index);
        });

        if (process.env.NODE_ENV !== 'production') {
            $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'END');
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'START');
    }

    $canvas.$render();

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'END');
    }

    this.fps++;

    utils.execFuncs($canvas.hooks.ticked, $canvas, [$canvas.$rafTime]);

    if ($canvas.hooks.nextTick) {
        utils.execFuncs($canvas.hooks.nextTick, $canvas, [$canvas.$rafTime]);
        delete $canvas.hooks.nextTick;
    }
};
