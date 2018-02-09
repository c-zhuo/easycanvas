/** ********** *
 *
 * Sort the sprite and call inner functions
 * - Will be called in each frame after the 'start' function called.
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function () {
    if (this.$pausing) return;
    if (document.hidden) return;

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
        $canvas.$paintContext.clearRect(0, 0, this.contextWidth, this.contextHeight);
    }

    if (!$canvas.$freezing) {
        $canvas.$paintList = [];

        this.paintList.sort(function (a, b) {
            let za = utils.funcOrValue(a.style.zIndex, a);
            let zb = utils.funcOrValue(b.style.zIndex, b);
            if (za === zb) return 0;
            return za > zb ? 1 : -1;
        }).forEach(function (perItem, index) {
            $canvas.$perPaint(perItem, index);
        });
    }

    // let xxxx = document.getElementsByClassName('XXXXX');
    // for (let i = 0; i < xxxx.length; i++) {
    //     xxxx[i].toDelete = 1;
    //     // xxxx[i].remove();
    // }

    $canvas.$paint();

    // for (let i = 0; i < xxxx.length; i++) {
    //     if (xxxx[i].toDelete)
    //         xxxx[i].remove();
    // }

    this.fps++;

    if ($canvas.hooks.nextTick) {
        utils.execFuncs($canvas.hooks.beforeTick, $canvas, [$canvas.$rafTime]);
        delete $canvas.hooks.nextTick;
    }
};
