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

const getFinalStyle = window.getFinalStyle = function ($sprite, $canvas, key) {
	let currentValue = utils.funcOrValue($sprite.style[key], $sprite);

    if ($sprite.$parent && $sprite.inherit.indexOf(key) >= 0) {
    	if (key === 'tx') {
    		currentValue -= $sprite.$parent.scroll.scrollX;
    	} else if (key === 'ty') {
    		currentValue -= $sprite.$parent.scroll.scrollY;
    	}

    	if (key === 'opacity' || key === 'scale') {
	    	return (
	    		utils.firstValuable(getFinalStyle($sprite.$parent, $canvas, key), 1)
    		) * (currentValue || 1);
    	}

    	return (
    		utils.firstValuable(getFinalStyle($sprite.$parent, $canvas, key), 0)
		) + (currentValue || 0);
    }

    return currentValue;
};


module.exports = function ($sprite, $canvas) {
    let _props = {};

    for (let i in $sprite.content) {
        _props[i] = utils.funcOrValue($sprite.content[i], $sprite);
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

            let wTimes = parseInt(_img.width / pw);
            let hTimes = parseInt(_img.height / ph);

            if (config.h) {
                _props.sx = index % wTimes * pw;
                _props.sy = parseInt(index / wTimes) % hTimes * ph;
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
