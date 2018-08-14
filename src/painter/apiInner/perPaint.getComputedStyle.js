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

// const inBrowser = typeof window !== 'undefined';

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
        _props[i] = $sprite.getStyle(i);
    }
    $sprite.inherit.forEach(function (i) {
        _props[i] = $sprite.getStyle(i);
    });

    // Maybe a plgin is better ?
    // @interval 可以是function，其它的必须常量
    if (_props.sequence) {
        let _img = _props.img;
        let config = _props.sequence;

        // 确立index
        _props.sequence.index = _props.sequence.index || 0;
        let index = _props.sequence.index || 0;
        if (index < 0) index = 0;

        // 计算每帧的宽高
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

            _props.sx = index % wTimes * pw;
            _props.sy = Math.floor(index / wTimes) % hTimes * ph;
        }

        // 不循环的精灵动画自动移除
        if (!config.loop && index > 0 && _props.sx === 0 && _props.sy === 0) {
            _props.img = undefined;
            if (config.onOver) {
                config.onOver.call($sprite);
            } else {
                $sprite.remove();
            }
        }

        // 判断是否应该下一帧
        _props.sequence.lastTickTime = _props.sequence.lastTickTime || 0;
        if ($canvas.$nextTickTime - _props.sequence.lastTickTime >= utils.funcOrValue(_props.sequence.interval, $sprite)) {
            config.lastTickTime = $canvas.$nextTickTime;
            _props.sequence.index++;
            _props.sequence.lastTickTime = $canvas.$nextTickTime;
        }

        // 默认的读取和绘制尺寸等于每帧尺寸
        _props.sw = _props.sw || pw;
        _props.sh = _props.sh || ph;
        _props.tw = _props.tw || pw;
        _props.th = _props.th || ph;
    }

    return _props;
};
