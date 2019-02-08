import utils from 'utils/utils.js';

import { default0s, default1s, styleKeys } from './webgl-utils';

module.exports = function () {
    let $sprite = this;
    let $canvas = this.$canvas;

    if ($sprite.webgl && $sprite.webgl.vertices) {
        $sprite.$rendered = true;

        if ($sprite.webgl.img) {
            if (typeof $sprite.webgl.img === 'string') {
                $sprite.webgl.img = $canvas.imgLoader($sprite.webgl.img);
            } else if ($sprite.webgl.img.src) {
                $sprite.webgl.img = $canvas.imgLoader($sprite.webgl.img.src);
            }
        }

        let _webgl = {
            tx: $sprite.getStyle('left'),
            ty: $sprite.getStyle('top'),
            tz: utils.funcOrValue($sprite.webgl.tz, $sprite) || 0,
        };

        for (let key in $sprite.webgl) {
            _webgl[key] = utils.funcOrValue($sprite.webgl[key], $sprite) || 0;
        }

        styleKeys.forEach((key) => {
            _webgl[key] = $sprite.getWebglStyle(key);
        });

        let $paintSprite = {
            $id: $sprite.$id,
            type: '3d',
            webgl: _webgl,
        };

        // if (process.env.NODE_ENV !== 'production') {
        //     // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = $sprite;
        // };

        $canvas.$children.push($paintSprite);
    }

    if ($sprite.content.img) {
        if (typeof $sprite.content.img === 'string') {
            $sprite.content.img = $canvas.imgLoader($sprite.content.img);
        } else if ($sprite.content.img.src) {
            $sprite.content.img = $canvas.imgLoader($sprite.content.img.src);
        }
    }
};