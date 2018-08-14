import utils from 'utils/utils.js';
import rectMeet from 'utils/math.rect-meet';

import { default0s, default1s, styleKeys } from './webgl-utils';
import webglRender3d from './webgl-render-3d.js';
import webglRender2d from './webgl-render-2d.js';

const textCachePool = {};
const webglRender = function ($sprite, settings, $canvas) {
    var props = $sprite.props;
    var webgl = $sprite.webgl;
    var gl = $canvas.$gl;

    if ($sprite.type !== '3d') {
        if (!props[0] && props.content) {
            var cacheKey = props.content + props.font + props.align + props.color;
            var cacheValue = textCachePool[cacheKey];

            if (!cacheValue) {
                // text
                var tex = gl.createTexture();
                var textCtx = document.createElement('canvas').getContext('2d');
                textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);

                textCtx.canvas.width = props.content.length * parseInt(props.font) * 2;
                textCtx.canvas.height = parseInt(props.font) + 5;
                textCtx.font = props.font;
                textCtx.textAlign = props.align;
                textCtx.fillStyle = props.color;
                textCtx.fillText(props.content,
                    props.align === 'right' ? textCtx.canvas.width : (props.align === 'center' ? textCtx.canvas.width / 2 : 0),
                    textCtx.canvas.height - 5);

                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCtx.canvas);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                cacheValue = textCachePool[cacheKey] = {
                    texture: tex,
                    width: textCtx.canvas.width,
                    height: textCtx.canvas.height,
                    img: textCtx.canvas,
                    canvas: textCtx.canvas,
                };
            }

            props = [
                cacheValue,
                0, 0, cacheValue.canvas.width, cacheValue.canvas.height,
                props.align === 'right' ? props.tx - cacheValue.canvas.width :
                (props.align === 'center' ? props.tx - cacheValue.canvas.width / 2 : props.tx),
                props.ty - cacheValue.canvas.height + 5,
                cacheValue.canvas.width, cacheValue.canvas.height,
            ];
        }

        if (props[0] && props[0].texture) {
            // 跳过绘制
            var meet = rectMeet(
                props[5], props[6], props[7], props[8],
                0, 0, $canvas.width, $canvas.height,
                settings.beforeRotate && settings.beforeRotate[0],
                settings.beforeRotate && settings.beforeRotate[1],
                settings.rotate);
            if (!meet) {
                // console.log('miss 2d');
                return;
            }

            if (props[0].img.width === 0) return;

            // 2d
            gl.bindTexture(gl.TEXTURE_2D, props[0].texture);
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, props[0].img);

            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            webglRender2d(
                $canvas,
                props[0].texture,
                props[0].width,
                props[0].height,
                props[1], props[2], props[3], props[4],
                props[5], props[6], props[7], props[8],
                settings
            );
        }
    } else if ($sprite.type === '3d' && (webgl.img || webgl.colors)) {
        if (webgl.img && webgl.img.texture) {
            gl.bindTexture(gl.TEXTURE_2D, webgl.img.texture);
        }
        // loading img
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        // 跳过绘制

        if (webgl.longSide && !$canvas.webgl.$camera) {
            var longSide = webgl.longSide * 1.8; // ~三维根号3
            var depth = $canvas.webgl.$depth;
            var meet = rectMeet(
                webgl.tx - longSide, webgl.ty - longSide,
                longSide * 2, longSide * 2,
                (webgl.tz) / depth * $canvas.width / 2,
                (webgl.tz) / depth * $canvas.height / 2,
                $canvas.width - (webgl.tz) / depth * $canvas.width / 2,
                $canvas.height - (webgl.tz) / depth * $canvas.height / 2,
                0, 0, 0);
            if (!meet) {
                // console.log('miss');
                return;
            }
        }

        webglRender3d(
            $canvas, webgl
        );
    }
};

module.exports = function ($sprite, settings) {
    let $canvas = this;

    if ($canvas.$isWebgl) {
        webglRender($sprite, settings, $canvas);

        if (process.env.NODE_ENV !== 'production') {
            $canvas.$plugin.drawImage($canvas);
        }

        return true;
    }
};
