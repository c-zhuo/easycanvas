/** ********** *
 *
 * CORE painting function
 * - Controlling canvas context, Transfer $children to rendered sprite.
 * - Includes some optimization.
 *
 * ********** **/

import utils from 'utils/utils.js';

let render = function ($sprite, i) {
    let $canvas = this;
    
    /*
        props(Array)
        @0    image/canvas Object
        @1~4  source x, y, w, h
        @5~8  target x, y, w, h
    */
    let props = $sprite.props;

    /*
        Jump useless paintings, by calculating border size
    */
    let isUseless = false;
    if ($sprite.type === 'img') {
        // 当前图层不太小的时候，判断是否可以跳过绘制
        let currentImgSize = props[7] * props[8];
        let $children = $canvas.$children;
        if (currentImgSize > 200 * 200) {
            for (let j = $children.length - 1; j > i; j--) {
                let $tmpSprite = $children[j];

                if ($tmpSprite.$cannotCover) {
                    // 被判断为不能遮挡当前绘制的直接跳过
                    continue;
                }

                let tmpProps = $tmpSprite.props;

                if (!tmpProps[0]) {
                    // 不是图片
                    $tmpSprite.$cannotCover = true;
                    continue;
                }

                if (tmpProps[7] * tmpProps[8] < currentImgSize) {
                    // 太小的图片不认为可以遮挡当前图片，不能跳过当前图片的绘制
                    // 只是对于当前图片来说cannotCover，对其它图片有可能，所以不设置$cannotCover
                    continue;
                }

                if (!tmpProps[0].$noAlpha) {
                    // 带alpha通道的图片不会遮挡当前图片，不能跳过当前图片的绘制
                    $tmpSprite.$cannotCover = true;
                    continue;
                }

                let tmpSpriteSettings = $tmpSprite.settings;

                // 带rotate的元素暂时不考虑，需要复杂的计算
                if (tmpSpriteSettings.globalAlpha !== 1 ||
                    tmpSpriteSettings.globalCompositeOperation ||
                    tmpSpriteSettings.rotate) {
                    $tmpSprite.$cannotCover = true;
                    continue;
                }

                if (utils.pointInRect(
                        props[5], props[6],
                        tmpProps[5], tmpProps[5] + tmpProps[7],
                        tmpProps[6], tmpProps[6] + tmpProps[8],
                    ) && utils.pointInRect(
                        props[5] + props[7], props[6] + props[8],
                        tmpProps[5], tmpProps[5] + tmpProps[7],
                        tmpProps[6], tmpProps[6] + tmpProps[8],
                    )
                ) {
                    if (process.env.NODE_ENV !== 'production') {
                        $sprite.$origin.$useless = true;
                        $canvas.$plugin.jumpRender($canvas, props);
                    }

                    isUseless = true;
                    // console.log('useless');

                    return;
                }
            }
        }
    // } else if ($sprite.type === 'text') {
        // 文本绘制消耗性能较少，毋需优化
    }

    if (process.env.NODE_ENV !== 'production') {
        if ($sprite.$origin) {
            $sprite.$origin.$useless = false;
        }
    }
    // console.log('useful');

    let settings = $sprite.settings;

    if ($canvas.$isWebgl && window.Easycanvas.$webglPainter) {
        props[0] && props[0].texture && window.Easycanvas.$webglPainter(
            $canvas,
            props[0].texture,
            props[0].width,
            props[0].height,
            props[1], props[2], props[3], props[4],
            props[5], props[6], props[7], props[8],
            settings);
        return;
    }

    /*
        Rendering operation
    */
    let saved = false;
    let cxt = $canvas.$paintContext;

    if (settings.globalCompositeOperation) {
        if (!saved) {
            cxt.save();
            saved = true;
        }
        cxt.globalCompositeOperation = settings.globalCompositeOperation;
    }

    if (settings.globalAlpha !== 1 && !isNaN(settings.globalAlpha)) {
        if (!saved) {
            cxt.save();
            saved = true;
        }
        cxt.globalAlpha = settings.globalAlpha;
    }

    if (settings.translate) {
        if (!saved) {
            cxt.save();
            saved = true;
        }
        cxt.translate(settings.translate[0] || 0, settings.translate[1] || 0);
    }

    if (settings.rotate) {
        if (!saved) {
            cxt.save();
            saved = true;
        }
        cxt.translate(settings.beforeRotate[0] || 0, settings.beforeRotate[1] || 0);
        cxt.rotate(settings.rotate || 0);
        cxt.translate(settings.afterRotate[0] || 0, settings.afterRotate[1] || 0);
    }

    if (settings.scale) {
        if (!saved) {
            cxt.save();
            saved = true;
        }
        cxt.scale(settings.scale[0] || 1, settings.scale[1] || 1);
    }

    if (settings.transform) {
        if (!saved) {
            cxt.save();
            saved = true;
        }
        cxt.transform(
            1, settings.transform.fh,
            settings.transform.fv, 1,
            settings.transform.fx, settings.transform.fy
        );
    }

    if ($sprite.type === 'img') {
        cxt.drawImage(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8]);
        if (process.env.NODE_ENV !== 'production') {
            $canvas.$plugin.drawImage($canvas, props);
        }
    } else if ($sprite.type === 'text' && props.content) {
        cxt.font = props.font;
        cxt.fillStyle = cxt.strokeStyle = props.color || 'white';
        cxt.textAlign = props.align;
        cxt[props.type || 'fillText'](props.content, props.tx, props.ty);
    }

    if (saved) {
        cxt.restore();
    }
};

module.exports = function () {
    let $canvas = this;

    $canvas.$children.forEach(render.bind($canvas));
};
