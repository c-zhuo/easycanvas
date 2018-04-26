/** ********** *
 *
 * Sort the sprite and call inner functions
 * - Will be called in each frame after the 'start' function called.
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function () {
    if (this.$pausing || document.hidden) return;

    let $canvas = this;

    utils.execFuncs($canvas.hooks.ticked, $canvas, [$canvas.$rafTime]);

    if (this.$isWebgl) {
        let gl = this.$gl;
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // gl.colorMask(true, false, false, true);
        gl.clear(gl.COLOR_BUFFER_BIT);
    } else {
        $canvas.$paintContext.clearRect(0, 0, this.width, this.height);
        // $canvas.$paintContext.fillStyle = 'rgba(255, 0, 0, 0.1)';
        // $canvas.$paintContext.fillRect(0, 0, this.width, this.height);
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

    $canvas.$paint();

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'END');
    }

    this.fps++;

    if ($canvas.hooks.nextTick) {
        utils.execFuncs($canvas.hooks.beforeTick, $canvas, [$canvas.$rafTime]);
        delete $canvas.hooks.nextTick;
    }
};
