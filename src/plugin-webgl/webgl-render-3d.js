import utils from 'utils/utils.js';
import _webglM4 from 'lib/m4.js';

import { degToRad } from './webgl-utils';
import toggleShader from './webgl-shader-toggle.js';

const m4 = _webglM4();

export default function ($canvas, webgl) {
    if ((!webgl.colors || !webgl.colors.length) && (!webgl.textures || !webgl.textures.length)) return;

    let gl = $canvas.$gl;

    if (webgl.hasAlpha) {
        gl.disable(gl.DEPTH_TEST);
        // gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
    } else {
        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
    }

    var positionBuffer = webgl.vertices.$cacheBuffer,
        colorBuffer, texcoordBuffer, indicesBuffer, normalsBuffer, sizeBuffer;

    if (!positionBuffer) {
        positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, webgl.vertices, gl.STATIC_DRAW);
        webgl.vertices.$cacheBuffer = positionBuffer;
    }

    var colors = gl.eventing ? webgl.$eventFlag : webgl.colors;

    if (colors) {
        colorBuffer = colors.$cacheBuffer;
        if (!colorBuffer) {
            colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            colors.$cacheBuffer = colorBuffer;
        }
    } else {
        texcoordBuffer = webgl.textures.$cacheBuffer;
        if (!texcoordBuffer) {
            texcoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, webgl.textures, gl.STATIC_DRAW);
            webgl.textures.$cacheBuffer = texcoordBuffer;
        }
    }

    if (webgl.pointSizes) {
        sizeBuffer = webgl.pointSizes.$cacheBuffer;
        if (!sizeBuffer) {
            sizeBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, webgl.pointSizes, gl.STATIC_DRAW);
            webgl.pointSizes.$cacheBuffer = sizeBuffer;
        }
    }

    if (webgl.indices) {
        indicesBuffer = webgl.indices.$cacheBuffer;
        if (!indicesBuffer) {
            indicesBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, webgl.indices, gl.STATIC_DRAW);
            webgl.indices.$cacheBuffer = indicesBuffer;
        }
    }

    if (webgl.normals) {
        normalsBuffer = webgl.normals.$cacheBuffer;
        if (!normalsBuffer) {
            normalsBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, webgl.normals, gl.STATIC_DRAW);
            webgl.normals.$cacheBuffer = normalsBuffer;
        }
    }

    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // gl.enable(gl.CULL_FACE);

    if (colorBuffer) {
        toggleShader(gl, 0, $canvas.webgl.light, webgl.primitive);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        let step = webgl.hasAlpha && !gl.eventing ? 4 : 3;
        gl.vertexAttribPointer(gl.colorLocation, step, gl.UNSIGNED_BYTE, true, 0, 0)
    } else if (texcoordBuffer) {
        toggleShader(gl, 1, $canvas.webgl.light, webgl.primitive);
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    }

    if (webgl.pointSizes) {
        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
        // var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        // var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.sizeLocation, 1, gl.FLOAT, false, 0, 0);
    }

    if (webgl.vertices) {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(gl.positionLocation, 3, gl.FLOAT, false, 0, 0);
    }

    if (webgl.normals) {
        gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
        gl.vertexAttribPointer(gl.normalLocation, 3, gl.FLOAT, false, 0, 0);
    }

    // fudgeFactor改到tick钩子里
    if ($canvas.webgl.$fudgeFactor) {
        var fudgeLocation = gl.getUniformLocation(gl.program, "u_fudgeFactor");
        var fudgeFactor = $canvas.webgl.$fudgeFactor;
        gl.uniform1f(fudgeLocation, fudgeFactor);
    }

    var projectMatrix;

    if (!$canvas.webgl.$camera) {
        projectMatrix = gl.orthographic;
    } else {
        projectMatrix = $canvas.webgl.$camera.viewProjectionMatrix;
    }

    projectMatrix = m4.translate(projectMatrix, webgl.tx || 0, webgl.ty || 0, webgl.tz || 0);
    webgl.rx && (projectMatrix = m4.xRotate(projectMatrix, degToRad(webgl.rx)));
    webgl.ry && (projectMatrix = m4.yRotate(projectMatrix, degToRad(webgl.ry)));
    webgl.rz && (projectMatrix = m4.zRotate(projectMatrix, degToRad(webgl.rz)));
    projectMatrix = m4.scale(projectMatrix,
        (webgl.scaleX !== 1 ? webgl.scaleX : webgl.scale) || 1,
        (webgl.scaleY !== 1 ? webgl.scaleY : webgl.scale) || 1,
        (webgl.scaleZ !== 1 ? webgl.scaleZ : webgl.scale) || 1);

    if ($canvas.webgl.light) {
        // 光照变换
        gl.uniformMatrix4fv(gl.worldViewProjectionLocation, false, projectMatrix);
        gl.uniformMatrix4fv(gl.worldInverseTransposeLocation, false, m4.transpose(projectMatrix));
    }

    gl.uniformMatrix4fv(gl.matrixLocation, false, projectMatrix);

    if ($canvas.webgl.light) {
        var colorLocation = gl.getUniformLocation(gl.program, "a_color");
        gl.uniform4fv(colorLocation, [1, 1, 1, 1]); // color
        gl.uniform3fv(gl.reverseLightDirectionLocation, m4.normalize([0, 1, 0]));
    }

    // Tell the shader to use texture unit 0 for u_texture
    gl.uniform1i(gl.textureLocation, 0);

    var fShaderTypeLocation = gl.getUniformLocation(gl.program, "f_shaderType");
    gl.uniform1i(fShaderTypeLocation, utils.firstValuable(webgl.primitive, 2));
    var vShaderTypeLocation = gl.getUniformLocation(gl.program, "v_shaderType");
    gl.uniform1i(vShaderTypeLocation, utils.firstValuable(webgl.primitive, 2));

    if (indicesBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        // gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
    } else {
        gl.drawArrays(webgl.primitive === 0 ? gl.POINTS : gl.TRIANGLES, 0, webgl.vertices.length / 3);
    }
};
