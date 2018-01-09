/** ********** *
 *
 * CORE painting function
 * - Controlling canvas context, Transfer $paintList to rendered sprite.
 * - Includes some optimization.
 *
 * ********** **/

import utils from 'utils/utils.js';
import positionCompare from 'utils/position-compare.js';

// Unlike images, textures do not have a width and height associated
// with them so we'll pass in the width and height of the texture
let glDrawImage = function ($canvas,
    texture, texWidth, texHeight,
    srcX, srcY, srcWidth, srcHeight,
    dstX, dstY, dstWidth, dstHeight,
    settings) {

    let gl = $canvas.$gl;

    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // // Tell WebGL how to convert from clip space to pixels
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.bindTexture(gl.TEXTURE_2D, texture);

    // this matirx will convert from pixels to clip space
    // var matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
    var matrix = gl.matrix;

    // this matrix will translate our quad to dstX, dstY
    matrix = m4.translate(matrix, dstX, dstY, 0);
    // We need to pick a place to rotate around

    // We'll move to the middle, rotate, then move back
    if (settings.rotate) {
        matrix = m4.translate(matrix, -dstX + settings.translateBeforeRotate[0] || 0, -dstY + settings.translateBeforeRotate[1] || 0, 0);
        matrix = m4.zRotate(matrix, settings.rotate);
        matrix = m4.translate(matrix, dstX +settings.translateAfterRotate[0] || 0, dstY + settings.translateAfterRotate[1] || 0, 0);
    }

    // this matrix will scale our 1 unit quad
    // from 1 unit to texWidth, texHeight units
    matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

    // Set the matrix.
    gl.uniformMatrix4fv(gl.matrixLocation, false, matrix);

    // Because texture coordinates go from 0 to 1
    // and because our texture coordinates are already a unit quad
    // we can select an area of the texture by scaling the unit quad
    // down
    var texMatrix = m4.translation(srcX / texWidth, srcY / texHeight, 0);
    texMatrix = m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);

    // Set the texture matrix.
    gl.uniformMatrix4fv(gl.textureMatrixLocation, false, texMatrix);

    // Tell the shader to get the texture from texture unit 0
    // gl.uniform1i(gl.textureLocation, 0);

    // draw the quad (2 triangles, 6 vertices)
    // gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}

let render = function ($sprite, i) {
    let $canvas = this;
    
    /*
        props(Array)
        @0    image/canvas Object
        @1~4  source x, y, w, h
        @5~8  target x, y, w, h
    */
    let props = $sprite.props;
    let settings = $sprite.settings;

    /*
        Jump useless paintings, by calculating border size
    */
    let isUseless = false;
    if ($sprite.type === 'img') {
        // jump checking，if too many elements or it is a small image
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

    if ($canvas.$isWebgl) {
        props[0] && props[0].texture && glDrawImage(
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
        cxt.translate(settings.translateBeforeRotate[0] || 0, settings.translateBeforeRotate[1] || 0);
        cxt.rotate(settings.rotate || 0);
        cxt.translate(settings.translateAfterRotate[0] || 0, settings.translateAfterRotate[1] || 0);
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
        cxt.strokeStyle = props.color;
        cxt.fillStyle = props.color;
        cxt.textAlign = props.align;
        cxt[props.type || 'fillText'](props.content, props.tx, props.ty);
    }

    if (saved) {
        cxt.restore();
    }
};

module.exports = function () {
    let $canvas = this;

    $canvas.$paintList.forEach(render.bind($canvas));
};
