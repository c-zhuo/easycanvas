/** ********** *
 *
 * CORE painting function
 * - Controlling canvas context, Transfer $children to rendered sprite.
 * - Includes some optimization.
 *
 * ********** **/

import utils from 'utils/utils.js';

const extend = function ($sprite, settings) {
    let stopDefault = false;

    this.$extendList.forEach((plugin) => {
        if (plugin.onRender) {
            let res = plugin.onRender.call(this, $sprite, settings);
            if (res) {
                stopDefault = res;
            }
        }
    });

    return stopDefault;
};

const render = function ($sprite, i) {
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
    // if ($sprite.type === 'img' || $sprite.type === 'fillRect') {
    let currentSize;
    let isText = $sprite.type === 'text';

    // 一些扩展插件的绘制可能没有props
    if (props) {
        if (isText) {
            let length = props.content.length;

            currentSize = props.fontsize * props.fontsize * 9 * length;

            props[5] = props.tx - props.fontsize * 1.5 * length;
            if (props[5] < 0) props[5] = 0;
            props[6] = props.ty - props.fontsize * 1.5;
            if (props[6] < 0) props[6] = 0;
            props[7] = props.fontsize * 3 * length;
            if (props[5] + props[7] > $canvas.width) props[7] = $canvas.width - props[5];
            props[8] = props.fontsize * 3;
            if (props[6] + props[8] > $canvas.height) props[8] = $canvas.height - props[6];
        } else {
            currentSize = props.tw * props.th;
        }

        // 当前图层不太小的时候，判断是否可以跳过绘制
        if ((currentSize > 200 * 200 || isText) &&
            !$sprite.settings.transform &&
            !$sprite.settings.rotate
        ) {
            let $children = $canvas.$children;

            for (let j = $children.length - 1; j > i; j--) {
                let $tmpSprite = $children[j];

                if ($tmpSprite.$cannotCover) {
                    // 被判断为不能遮挡当前绘制的直接跳过
                    continue;
                }

                if ($tmpSprite.type === 'text' || !$tmpSprite.type) {
                    // 不是图片
                    $tmpSprite.$cannotCover = true;
                    continue;
                }

                let tmpProps = $tmpSprite.props;

                if (tmpProps.tw * tmpProps.th < 200 * 200) {
                    // 太小的图片不认为可以遮挡
                    $tmpSprite.$cannotCover = true;
                    continue;
                }

                if (tmpProps.tw * tmpProps.th < currentSize) {
                    continue;
                }

                if ($tmpSprite.img && !$tmpSprite.img.$noAlpha) {
                    // 带alpha通道的图片不会遮挡当前图片，不能跳过当前图片的绘制
                    $tmpSprite.$cannotCover = true;
                    continue;
                }

                let tmpSpriteSettings = $tmpSprite.settings;

                // 带rotate的元素暂时不考虑，需要复杂的计算
                if (tmpSpriteSettings.globalAlpha !== 1 ||
                    tmpSpriteSettings.globalCompositeOperation ||
                    tmpSpriteSettings.transform ||
                    tmpSpriteSettings.rotate) {
                    $tmpSprite.$cannotCover = true;
                    continue;
                }

                if (utils.pointInRect(
                        props.tx, props.ty,
                        tmpProps.tx, tmpProps.tx + tmpProps.tw,
                        tmpProps.ty, tmpProps.ty + tmpProps.th,
                    ) && utils.pointInRect(
                        props.tx + props.tw, props.ty + props.th,
                        tmpProps.tx, tmpProps.tx + tmpProps.tw,
                        tmpProps.ty, tmpProps.ty + tmpProps.th,
                    )
                ) {
                    if (process.env.NODE_ENV !== 'production') {
                        $sprite.$origin.$useless = true;
                        // props格式换了
                        // $canvas.$plugin.jumpRender($canvas, props);
                    }

                    // console.log('useless');

                    return;
                }
            }
        }
    }

    let settings = $sprite.settings || {};

    if (extend.call($canvas, $sprite, settings)) {
        return;
    }

    if (process.env.NODE_ENV !== 'production') {
        if ($sprite.$origin) {
            $sprite.$origin.$useless = false;
        }
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

    // if (settings.textBaseline) {
    //     if (!saved) {
    //         cxt.save();
    //         saved = true;
    //     }
    //     cxt.textBaseline = settings.textBaseline;
    // }

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
        cxt.drawImage($sprite.img,props.sx,props.sy,props.sw,props.sh,props.tx,props.ty,props.tw,props.th);
        if (process.env.NODE_ENV !== 'production') {
            $canvas.$plugin.drawImage($canvas, props);
        }
    } else if ($sprite.type === 'text' && props.content) {
        cxt.font = props.font;
        cxt.fillStyle = props.color || 'white';
        cxt.textAlign = props.align;
        cxt.textBaseline = props.baseline;
        cxt[props.type || 'fillText'](props.content, props.tx, props.ty);
    } else if ($sprite.type === 'fillRect') { 
        cxt.fillStyle = settings.fillRect;
        cxt.fillRect(props.tx,props.ty,props.tw,props.th);
    }

    if (saved) {
        cxt.restore();
    }
};

module.exports = function () {
    let $canvas = this;

    $canvas.$children.forEach(render.bind($canvas));
};
