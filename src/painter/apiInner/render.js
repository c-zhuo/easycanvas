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

module.exports = function (_ctx, _children, renderAll) {
    let $canvas = this;
    let $children = _children || $canvas.$children;

    if (!renderAll && !$canvas.webgl) {
        $children = $children.filter(($child) => {
            if ($child.type !== 'img') return true;
            return $child.props.$insight !== false;
        });
    }

    $children.forEach(($sprite, i) => {
        if (process.env.NODE_ENV !== 'production') {
            if ($sprite.$origin) {
                // 先标记为true，绘制的时候改为false
                $sprite.$origin.$useless = true;
            }
        }

        let props = $sprite.props;

        /*
            Jump useless paintings, by calculating border size
        */
        let currentSize;
        // let isText = $sprite.type === 'text';

        // 一些扩展插件的绘制可能没有props
        if (props && $sprite.type !== 'clip' && $sprite.type !== 'rotateStart' && $sprite.type !== 'rotateEnd' && $sprite.type !== 'text' && $sprite.type !== 'clipOver' && $sprite.type !== 'line') {
            // if (isText) {
            //     let length = props.content.length;

            //     currentSize = props.fontsize * props.fontsize * 9 * length;

            //     props.left = props.left - props.fontsize * 1.5 * length;
            //     if (props.left < 0) props.left = 0;
            //     props.top = props.top - props.fontsize * 1.5;
            //     if (props.top < 0) props.top = 0;
            //     props.width = props.fontsize * 3 * length;
            //     if (props.left + props.width > $canvas.width) props.width = $canvas.width - props.left;
            //     props.height = props.fontsize * 3;
            //     if (props.top + props.height > $canvas.height) props.height = $canvas.height - props.top;
            // } else {
                currentSize = props.width * props.height;
            // }

            // 当前图层不太小的时候，判断是否可以跳过绘制
            if ((currentSize > 200 * 200) &&
                !$sprite.settings.transform &&
                !$sprite.settings.rotate
            ) {
                let l = $children.length;

                for (let j = i + 1; j < l; j++) {
                    let $tmpSprite = $children[j];

                    if ($tmpSprite.$cannotCover) {
                        // 被判断为不能遮挡当前绘制的直接跳过
                        continue;
                    }

                    if ($tmpSprite.type === 'clip') {
                        // clip到clipOver之间的不进行判断
                        // 这些sprite可能无法遮挡当前要绘制的sprite
                        while (j < l && $children[++j].type !== 'clipOver') {
                            // do nothing
                            // 仅仅是j自增1
                        }
                        continue;
                    }

                    let tmpSpriteSettings = $tmpSprite.settings;

                    if (!$tmpSprite.type || $tmpSprite.type !== 'img') {
                        // 不是图片
                        // 但fillRect可能还有透明度
                        if (!($tmpSprite.type === 'fillRect' && tmpSpriteSettings.fillRect.indexOf('rgba') === -1)) {
                            $tmpSprite.$cannotCover = true;
                            continue;
                        }
                    }

                    let tmpProps = $tmpSprite.props;

                    if (tmpProps.width * tmpProps.height < 200 * 200) {
                        // 太小的图片不认为可以遮挡
                        $tmpSprite.$cannotCover = true;
                        continue;
                    }

                    if (tmpProps.width * tmpProps.height < currentSize) {
                        continue;
                    }

                    if ($tmpSprite.img && !$tmpSprite.img.$noAlpha) {
                        // 带alpha通道的图片不会遮挡当前图片，不能跳过当前图片的绘制
                        $tmpSprite.$cannotCover = true;
                        continue;
                    }

                    // 带rotate的元素暂时不考虑，需要复杂的计算
                    if (tmpSpriteSettings.globalAlpha !== 1 ||
                        tmpSpriteSettings.globalCompositeOperation ||
                        tmpSpriteSettings.transform ||
                        tmpSpriteSettings.rotate) {
                        $tmpSprite.$cannotCover = true;
                        continue;
                    }

                    if (utils.pointInRect(
                            props.left, props.top,
                            tmpProps.left, tmpProps.left + tmpProps.width,
                            tmpProps.top, tmpProps.top + tmpProps.height,
                        ) && utils.pointInRect(
                            props.left + props.width, props.top + props.height,
                            tmpProps.left, tmpProps.left + tmpProps.width,
                            tmpProps.top, tmpProps.top + tmpProps.height,
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

        let ctx = _ctx || $canvas.$paintContext;

        if ($sprite.type === 'rotateStart') {
            ctx.save();
            ctx.translate(settings.beforeRotate[0] || 0, settings.beforeRotate[1] || 0);
            ctx.rotate(settings.rotate || 0);
            ctx.translate(settings.afterRotate[0] || 0, settings.afterRotate[1] || 0);
        }

        if ($sprite.type === 'clip') { 
            ctx.save();
            // rect会导致FPS逐渐降低，怀疑未清理导致
            // ctx.rect(props.left, props.ty, props.width, props.height);
            ctx.beginPath();
            ctx.moveTo(props.left, props.top);
            ctx.lineTo(props.left + props.width, props.top);
            ctx.lineTo(props.left + props.width, props.top + props.height);
            ctx.lineTo(props.left, props.top + props.height);
            ctx.lineTo(props.left, props.top);
            ctx.closePath();
            ctx.clip();
        }

        /*
            Rendering operation
        */
        let saved = false;

        if (settings.globalCompositeOperation) {
            if (!saved) {
                ctx.save();
                saved = true;
            }
            ctx.globalCompositeOperation = settings.globalCompositeOperation;
        }

        if (ctx.$globalAlpha !== settings.globalAlpha) {
            ctx.$globalAlpha = ctx.globalAlpha = settings.globalAlpha;
        }
        // if (settings.globalAlpha !== 1 && !isNaN(settings.globalAlpha)) {
        //     if (!saved) {
        //         ctx.save();
        //         saved = true;
        //     }
        //     ctx.globalAlpha = settings.globalAlpha;
        // }

        if (settings.translate) {
            if (!saved) {
                ctx.save();
                saved = true;
            }
            ctx.translate(settings.translate[0] || 0, settings.translate[1] || 0);
        }

        if (settings.scale) {
            if (!saved) {
                ctx.save();
                saved = true;
            }
            ctx.scale(settings.scale[0] || 1, settings.scale[1] || 1);
        }

        if (settings.transform) {
            if (!saved) {
                ctx.save();
                saved = true;
            }
            ctx.transform(
                1, settings.transform.fh,
                settings.transform.fv, 1,
                settings.transform.fx, settings.transform.fy
            );
        }

        if ($sprite.type === 'img') {
            ctx.drawImage($sprite.img, props.cutLeft, props.cutTop, props.cutWidth, props.cutHeight, props.left, props.top, props.width, props.height);
            if (process.env.NODE_ENV !== 'production') {
                if ($canvas.$plugin) {
                    $canvas.$plugin.drawImage($canvas, props);
                }
            }
        } else if ($sprite.type === 'text' && props.content) {
            ctx.font = props.font;
            ctx.fillStyle = props.color || 'black';
            ctx.textAlign = props.align;
            ctx.textBaseline = props.baseline;
            ctx[props.type || 'fillText'](props.content, props.left, props.top);
        } else if ($sprite.type === 'fillRect') { 
            ctx.fillStyle = settings.fillRect;
            ctx.fillRect(props.left,props.top,props.width,props.height);
        } else if ($sprite.type === 'line') {
            ctx.beginPath();

            let strokeStyle = props.borderColor || 'black';
            ctx.strokeStyle = strokeStyle;
            // if (ctx._strokeStyle !== strokeStyle)
            //     ctx._strokeStyle = ctx.strokeStyle = strokeStyle;

            let borderWidth = ctx.lineWidth = props.borderWidth || 1;
            ctx.moveTo(props.left - borderWidth, props.top - borderWidth);
            ctx.lineTo(props.left + props.width + borderWidth, props.top - borderWidth);
            ctx.lineTo(props.left + props.width + borderWidth, props.top + props.height + borderWidth);
            ctx.lineTo(props.left - borderWidth, props.top + props.height + borderWidth);
            // ctx.lineTo(props.left, props.top);

            // let lineWidth = props.borderWidth || 1;
            // ctx.lineWidth = lineWidth;
            // ctx.moveTo(props.left - lineWidth, props.top - lineWidth);
            // ctx.lineTo(props.left + props.width + lineWidth, props.top - lineWidth);
            // ctx.lineTo(props.left + props.width + lineWidth, props.top + props.height + lineWidth);
            // ctx.lineTo(props.left - lineWidth, props.top + props.height + lineWidth);
            // // ctx.lineTo(props.left - lineWidth, props.top - lineWidth);

            ctx.closePath();
            ctx.stroke();
        } else if ($sprite.type === 'rotateEnd') {
            ctx.$globalAlpha = false;
            ctx.restore();
            // ctx.save();
            // ctx.translate(settings.beforeRotate[0] || 0, settings.beforeRotate[1] || 0);
            // ctx.rotate(settings.rotate || 0);
            // ctx.translate(settings.afterRotate[0] || 0, settings.afterRotate[1] || 0);
        } else if ($sprite.type === 'clipOver') {
            ctx.$globalAlpha = false;
            ctx.restore();
        }

        if (saved) {
            ctx.$globalAlpha = false;
            ctx.restore();
        }        
    });
};
