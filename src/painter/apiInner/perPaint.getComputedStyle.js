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

const getFinalStyle = function ($sprite, $canvas, key) {
    let currentValue = utils.funcOrValue($sprite.style[key], $sprite);

    if ($sprite.$parent && $sprite.inherit.indexOf(key) >= 0) {
        // 额外处理滚动
        if (key === 'tx') {
            currentValue -= $sprite.$parent.scroll.scrollX || 0;
        }
        else if (key === 'ty') {
            currentValue -= $sprite.$parent.scroll.scrollY || 0;
        }

        if (key === 'tw' || key === 'th') {
            return utils.firstValuable(currentValue, getFinalStyle($sprite.$parent, $canvas, key));
        }
        else if (key === 'opacity' || key === 'scale') {
            return (
                utils.firstValuable(getFinalStyle($sprite.$parent, $canvas, key), 1)
            ) * (currentValue || 1);
        } else {
            return (
                utils.firstValuable(getFinalStyle($sprite.$parent, $canvas, key), 0)
            ) + (currentValue || 0);
        }

    }

    return currentValue;
};


module.exports = function ($sprite, $canvas) {
    let _props = {};

    for (let i in $sprite.content) {
        _props[i] = utils.funcOrValue($sprite.content[i], $sprite);
    }

    // 正常情况下，add阶段会进行string2object的转换
    // 此处是防止动态修改了某个img为string
    if (typeof _props.img === 'string') {
        _props.img = $sprite.content.img = $canvas.imgLoader(_props.img);
    }

    for (let i in $sprite.style) {
        _props[i] = getFinalStyle($sprite, $canvas, i);
    }
    $sprite.inherit.forEach(function (i) {
        _props[i] = getFinalStyle($sprite, $canvas, i);
    });

    // Maybe a plgin is better ?
    if (_props.sequence) {
        let _img = _props.img;
        let config = _props.sequence;
        _props.sequence.index = _props.sequence.index || 0;
        let index = _props.sequence.index || 0;
        if (index < 0) index = 0;

        let pw, ph;
        if (config.w || config.h) {
            if (config.w < 0) {
                pw = _img.width / (0 - config.w);
            } else if (config.w > 0) {
                pw = config.w;
            } else {
                pw = _img.width;
            }
            if (config.h < 0) {
                ph = _img.height / (0 - config.h);
            } else if (config.h > 0) {
                ph = config.h;
            } else {
                ph = _img.height;
            }

            let wTimes = Math.floor(_img.width / pw);
            let hTimes = Math.floor(_img.height / ph);

            if (config.h) {
                _props.sx = index % wTimes * pw;
                _props.sy = utils.firstValuable(config.y * ph, Math.floor(index / wTimes) % hTimes * ph);
            }
        }
        if (!config.loop && index > 0 && _props.sx === 0 && _props.sy === 0) {
            _props.img = undefined;
            $sprite.remove();
        }

        _props.sequence.lastTickTime = _props.sequence.lastTickTime || 0;
        if ($canvas.$nextTickTime - _props.sequence.lastTickTime >= utils.funcOrValue(_props.sequence.interval, $sprite)) {
            config.lastTickTime = $canvas.$nextTickTime;
            _props.sequence.index++;
            _props.sequence.lastTickTime = $canvas.$nextTickTime;
        }

        _props.sw = _props.sw || pw;
        _props.sh = _props.sh || ph;
        _props.tw = _props.tw || pw;
        _props.th = _props.th || ph;
    }

    return _props;
};
