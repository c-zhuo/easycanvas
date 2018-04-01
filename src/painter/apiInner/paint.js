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
        // jump checking，if too many elements and it is a small image
        let currentImgSize = props[7] * props[8];
        if ($canvas.$children.length < 200 || currentImgSize > 200 * 200) {
            for (let j = $canvas.$children.length - 1; j > i; j--) {
                let $tmpSprite = $canvas.$children[j];

                let tmpProps = $tmpSprite.props;

                if (!tmpProps[0]) {
                    // 不是图片
                    continue;
                }

                if (tmpProps[7] * tmpProps[8] < currentImgSize) {
                    // 太小的图片不认为可以遮挡当前图片
                    continue;
                }

                if (!tmpProps[0].$noAlpha) {
                    // 带alpha通道的图片不会遮挡当前图片，不能跳过当前图片的绘制
                    continue;
                }

                let tmpSpriteSettings = $tmpSprite.settings;

                // 带alpha、混合的元素不能作为是否跳过绘制的优化参考对象
                // 带rotate的元素暂时不考虑，需要复杂的计算
                if (tmpSpriteSettings.globalAlpha !== 1 ||
                    tmpSpriteSettings.globalCompositeOperation ||
                    tmpSpriteSettings.rotate) {
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
            $canvas.$plugin.hook.drawImage($canvas, {
                img: props[0],
                tx: props[1],
                ty: props[2],
                tw: props[3],
                th: props[4],
            });
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
