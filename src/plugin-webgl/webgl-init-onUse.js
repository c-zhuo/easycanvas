import utils from 'utils/utils.js';

import webglShapes from './webgl-shapes.js';
import { arrayRepeat, default0s, default1s } from './webgl-utils';

export default function (easycanvas) {
    easycanvas.webglShapes = webglShapes;

    easycanvas.sprite.prototype.getWebglStyle = function (key) {
        let $sprite = this;
        let currentValue;

        if (default1s.indexOf(key) >= 0) currentValue = 1;
        if (default0s.indexOf(key) >= 0) currentValue = 0;

        if ($sprite.webgl) {
            currentValue = utils.funcOrValue($sprite.webgl[key], $sprite) || currentValue;
        }

        if ($sprite.$parent) {
            if (default1s.indexOf(key) >= 0) {
                currentValue *= utils.firstValuable($sprite.$parent.getWebglStyle(key), 1);
            } else if (default0s.indexOf(key) >= 0) {
                // rx, ry, rz
                currentValue += utils.firstValuable($sprite.$parent.getWebglStyle(key), 0);
            }
        }

        return currentValue;
    };

    easycanvas.sprite.prototype.updateWebglStyle = function (key, value) {
        let $sprite = this;

        if ($sprite.webgl && $sprite.webgl[key]) {
            $sprite.$canvas.$gl.deleteBuffer($sprite.webgl[key].$cacheBuffer);
            $sprite.webgl[key].$cacheBuffer = undefined;

            if (key === 'colors' && value) {
                let repeatTimes = $sprite.webgl.vertices.length / value.length;
                $sprite.webgl.colors = new Uint8Array(arrayRepeat(value, repeatTimes));
            }
        }
    };

    const originRemove = easycanvas.sprite.prototype.remove;
    easycanvas.sprite.prototype.remove = function (child) {
        const $sprite = this;

        if ($sprite.webgl) {
            for (let key in $sprite.webgl) {
                if ($sprite.webgl[key].$cacheBuffer) {
                    $sprite.$canvas.$gl.deleteBuffer($sprite.webgl[key].$cacheBuffer);
                    $sprite.webgl[key].$cacheBuffer = undefined;
                }
            }
        }

        originRemove.call($sprite, child);
    };
};
