/** ********** *
 *
 * Get computed style of a sprite
 * - Returns a COPY of current props.
 * - Used in perPaint.js ONLY.
 * - May waste some performance, but not much.
 * - TODO: performace improving.
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';

module.exports = function ($sprite, $canvas) {
    let res = {};

    for (let i in $sprite.content) {
        res[i] = utils.funcOrValue($sprite.content[i], $sprite);
    }

    for (let i in $sprite.style) {
        res[i] = utils.funcOrValue($sprite.style[i], $sprite);
    }

    res.img = $sprite.content.img;

    if (res.img && res.img.type === 'sequence-diagram') {
        let config = res.img.config;
        let index = res.img.index;

        let pw, ph;
        if (config.w < 0) {
            pw = res.img.img.width / (0 - config.w);
        } else if (config.w > 0) {
            pw = config.w;
        } else {
            pw = res.img.img.width;
        }
        if (config.h < 0) {
            ph = res.img.img.height / (0 - config.h);
        } else if (config.h > 0) {
            ph = config.h;
        } else {
            ph = res.img.img.height;
        }

        let wTimes = parseInt(res.img.img.width / pw);
        let hTimes = parseInt(res.img.img.height / ph);

        if (config.h) {
            res.sx = index % wTimes * pw;
            res.sy = parseInt(index / wTimes) % hTimes * ph;
        }

        if (!config.loop && index > 0 && res.sx === 0 && res.sy === 0) {
            res.img.img = {};
            // $canvas.remove($sprite);
        }

        res.img.lastTickTime = res.img.lastTickTime || 0;
        if ($canvas.$nextTickTime - res.img.lastTickTime >= utils.funcOrValue(config.interval, $sprite)) {
            config.lastTickTime = $canvas.$nextTickTime;
            res.img.index++;
            res.img.lastTickTime = $canvas.$nextTickTime;
        }

        res.sw = pw || res.sw;
        res.sh = ph || res.sh;
        res.tw = res.tw || pw;
        res.th = res.th || ph;

        res.img = res.img.img;
    }

    $sprite.$tmp = res;

// debugger;
    return res;
};
