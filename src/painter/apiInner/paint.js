/** ********** *
 *
 * CORE painting function
 * - Controlling canvas context, Transfer $paintList to rendered sprite.
 * - Includes some optimization.
 *
 * ********** **/

import utils from 'utils/utils.js';
import positionCompare from 'utils/position-compare.js';

let f = function ($sprite, i) {
    let $canvas = this;

    let isUseless = false;
    
    let props = $sprite.props;
    let settings = $sprite.settings;

    if ($sprite.type === 'img') {
        // 小图性能优化收益未必正向，200尺寸是否恰当待评估
        if ($canvas.$paintList.length < 200 || props[7] * props[8] > 200 * 200) {
            for (let j = i + 1, l = $canvas.$paintList.length; j < l; j++) {
                let $tmpSprite = $canvas.$paintList[j];

                if ($tmpSprite.type !== 'img') continue;

                if ($tmpSprite.imgType !== '*') {
                    // PNG元素不能作为是否跳过绘制的优化参考对象
                    continue;
                }

                if ($tmpSprite.settings.globalAlpha !== 1) {
                    // 带alpha的元素不能作为是否跳过绘制的优化参考对象
                    continue;
                }

                if ($tmpSprite.settings.rotate) {
                    // 带rotate的元素暂时不考虑，需要复杂的计算
                    continue;
                }

                let tmpProps = $tmpSprite.props;

                if (positionCompare.pointInRect(
                        props[5], props[6],
                        tmpProps[5], tmpProps[5] + tmpProps[7],
                        tmpProps[6], tmpProps[6] + tmpProps[8],
                    ) && positionCompare.pointInRect(
                        props[5] + props[7], props[6] + props[8],
                        tmpProps[5], tmpProps[5] + tmpProps[7],
                        tmpProps[6], tmpProps[6] + tmpProps[8],
                    )
                ) {
                    isUseless = true;
                    return;
                }
            }
        }
    // } else if ($sprite.type === 'text') {
    // 文本绘制消耗性能较少，毋需优化
    }

    // DOM渲染 - 由于Hilo.js有专利，此处只调研实现，不开放
    // {
    //     let newSprite = false;
    //     if (!document.getElementById($sprite.$id)) {
    //         newSprite = true;
    //         let $dom = document.createElement('div');
    //         $dom.style.position = 'fixed';
    //         $dom.id = $sprite.$id;
    //         $dom.className = 'XXXXX';
    //         $dom.style['-webkit-transform'] = 'translateZ(0)';
    //         $dom.style['transform'] = 'translateZ(0)';
    //     } else {
    //         let $dom = document.getElementById($sprite.$id);
    //         $dom.toDelete = 0;
    //     }
    //     $dom.style.left = props[5] / $canvas.contextWidth * 100 + '%';
    //     $dom.style.top = props[6] / $canvas.contextHeight * 100 + '%';
    //     $dom.style.width = props[7] / $canvas.contextWidth * 100 + '%';
    //     $dom.style.height = props[8] / $canvas.contextHeight * 100 + '%';
    //     $dom.style['background-repeat'] = 'no-repeat';
    //     $dom.style['background-image'] = 'url(' + props[0].src + ')';
    //     $dom.style['background-position'] = (props[1] / props[0].$width * 100 + '%') + ' ' + (props[2] / $sprite.props[0].$height * 100 + '%')
    //     $dom.style['background-position'] = -(props[1] / props[0].$width * ($sprite.props[0].$width / props[3] * props[7]) + 'px') + ' ' +
    //         (-(props[2] / props[0].$height * ($sprite.props[0].$height / props[4] * props[8]) + 'px'));
    //     $dom.style['background-size'] = ($sprite.props[0].$width / props[3] * props[7] + 'px') + ' ' + ($sprite.props[0].$height / props[4] * props[8] + 'px');
    //     if (newSprite) {
    //         document.body.appendChild($dom);
    //     }
    //     return;
    // }

    let saved = false;

    if (settings.globalAlpha !== 1 && !isNaN(settings.globalAlpha)) {
        if (!saved) {
            $canvas.$paintContext.save();
            saved = true;
        }
        $canvas.$paintContext.globalAlpha = settings.globalAlpha;
    }

    if (settings.translate) {
        if (!saved) {
            $canvas.$paintContext.save();
            saved = true;
        }
        $canvas.$paintContext.translate(settings.translate[0] || 0, settings.translate[1] || 0);
    }
    if (settings.rotate) {
        if (!saved) {
            $canvas.$paintContext.save();
            saved = true;
        }
        $canvas.$paintContext.translate(settings.translateBeforeRotate[0] || 0, settings.translateBeforeRotate[1] || 0);
        $canvas.$paintContext.rotate(settings.rotate || 0);
        $canvas.$paintContext.translate(settings.translateAfterRotate[0] || 0, settings.translateAfterRotate[1] || 0);
    }
    if (settings.scale) {
        if (!saved) {
            $canvas.$paintContext.save();
            saved = true;
        }
        $canvas.$paintContext.scale(settings.scale[0] || 1, settings.scale[1] || 1);
    }
    if (settings.transform) {
        if (!saved) {
            $canvas.$paintContext.save();
            saved = true;
        }
        $canvas.$paintContext.transform(
            1, settings.transform.fh,
            settings.transform.fv, 1,
            settings.transform.fx, settings.transform.fy
        );
    }

    if ($sprite.type === 'img') {
        // area += props[7] * props[8];
        // times++;
        // props[0].src='test';
        // console.log(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8]);
        $canvas.$paintContext.drawImage(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8]);
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
        $canvas.$write.call($canvas, props);
    }

    if (saved) {
        $canvas.$paintContext.restore();
    }
};

module.exports = function () {
    let $canvas = this;

    $canvas.$paintList.forEach(f.bind($canvas));
};
