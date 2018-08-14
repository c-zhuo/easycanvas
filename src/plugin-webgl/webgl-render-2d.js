import utils from 'utils/utils.js';
import _webglM4 from 'lib/m4.js';

import { degToRad } from './webgl-utils';
import toggleShader from './webgl-shader-toggle.js';

const m4 = _webglM4();

var cacheBuffer2d;

module.exports = function ($canvas,
    texture, texWidth, texHeight,
    srcX, srcY, srcWidth, srcHeight,
    dstX, dstY, dstWidth, dstHeight,
    settings) {

    let gl = $canvas.$gl;

    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    toggleShader(gl, 1);

    if (!cacheBuffer2d) {
        cacheBuffer2d = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
        const textureCoordinates = [
            // 0, 0,
            // 1, 0,
            // 0, 1,
            // 1, 1,
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                    gl.STATIC_DRAW);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
    gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    var matrix = gl.orthographic;

    matrix = m4.translate(matrix, dstX, dstY, 0);

    if (settings.rotate) {
        matrix = m4.translate(matrix, -dstX + settings.beforeRotate[0] || 0, -dstY + settings.beforeRotate[1] || 0, 0);
        matrix = m4.zRotate(matrix, settings.rotate);
        matrix = m4.translate(matrix, dstX + settings.afterRotate[0] || 0, dstY + settings.afterRotate[1] || 0, 0);
    }

    matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

    gl.uniformMatrix4fv(gl.matrixLocation, false, matrix);

    if (srcX || srcY || (srcWidth !== texWidth) || (srcHeight !== texHeight)) {
        var texMatrix = m4.translation(srcX / texWidth, srcY / texHeight, 0);
        texMatrix = m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);
        gl.uniformMatrix4fv(gl.textureMatrixLocation, false, texMatrix);
    }

    // gl.uniform1i(gl.textureLocation, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
};
