/** ********** *
 *
 * Support webgl rendering
 * - Usage: set {webgl: true} in config on registering your canvas instance.
 *
 * ********** **/

import _webglUtils from 'lib/webgl-utils.js';
import _webglM4 from 'lib/m4.js';
import utils from './utils/utils.js';
import rectMeet from 'utils/math.rect-meet';

import img2base64 from 'utils/img2base64.js';

const err = function (msg) {
    console.error('[Easycanvas-webgl] ' + msg);
};

const Shader_Vertex_Color = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    uniform float u_fudgeFactor; // 透射

    uniform mat4 u_matrix;

    varying vec4 v_color;

    void main() {
        // Multiply the position by the matrix.
        // gl_Position = u_matrix * a_position;

        // 透射
        // 调整除数
        vec4 position = u_matrix * a_position;
        // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor
        float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射
        gl_Position = vec4(position.xy / zToDivideBy, position.zw);

        v_color = a_color;
    }
`;
const Shader_Vertex_Textcoord = `
    attribute vec4 a_position;
    attribute vec2 a_texcoord;
    uniform float u_fudgeFactor; // 透射

    uniform mat4 u_matrix;

    varying vec2 v_texcoord;

    void main() {
        // Multiply the position by the matrix.
        // gl_Position = u_matrix * a_position;

        // 透射
        // 调整除数
        vec4 position = u_matrix * a_position;
        // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor
        float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射
        gl_Position = vec4(position.xy / zToDivideBy, position.zw);

        v_texcoord = a_texcoord;
    }
`;

const Shader_Fragment_Textcoord = `
    precision mediump float;

    varying vec2 v_texcoord;

    uniform sampler2D u_texture;

    void main() {
       gl_FragColor = texture2D(u_texture, v_texcoord);
    }
`;
const Shader_Fragment_Color = `
    precision mediump float;

    varying vec4 v_color;

    uniform sampler2D u_texture;

    void main() {
       gl_FragColor = v_color;
    }
`;

var parentNode = document.body || document.head || document;

var script1 = document.createElement('script');
script1.id = 'drawImage-vertex-shader';
script1.type = 'x-shader/x-vertex';
parentNode.appendChild(script1);

var script2 = document.createElement('script');
script2.id = 'drawImage-fragment-shader';
script2.type = 'x-shader/x-fragment';
parentNode.appendChild(script2);

// 0-color 1-textcoord
var lastType;
var toggleShader = function (gl, type) {
    if (lastType === type) return;

    lastType = type;

    if (type === 0) {
        script1.innerHTML = Shader_Vertex_Color;
        script2.innerHTML = Shader_Fragment_Color;
    } else {
        script1.innerHTML = Shader_Vertex_Textcoord;
        script2.innerHTML = Shader_Fragment_Textcoord;
    }
    gl.program = webglUtils.createProgramFromScripts(gl, ["drawImage-vertex-shader", "drawImage-fragment-shader"]);
    gl.useProgram(gl.program);

    // look up where the vertex data needs to go.
    gl.positionLocation = gl.getAttribLocation(gl.program, "a_position");
    if (type === 0) {
        gl.colorLocation = gl.getAttribLocation(gl.program, "a_color");
    } else {
        gl.texcoordLocation = gl.getAttribLocation(gl.program, "a_texcoord");
    }

    // lookup uniforms
    gl.matrixLocation = gl.getUniformLocation(gl.program, "u_matrix");
    if (type === 0) {
        gl.textureLocation = gl.getUniformLocation(gl.program, "u_texture");
    } else {
        gl.textureMatrixLocation = gl.getUniformLocation(gl.program, "u_textureMatrix");
    }
};

window.m4 = _webglM4();
window.webglUtils = _webglUtils();

// Unlike images, textures do not have a width and height associated
// with them so we'll pass in the width and height of the texture
window.Easycanvas.$webglPainter = function ($sprite, settings, $canvas) {
    var props = $sprite.props;
    var webgl = $sprite.webgl;
    var gl = $canvas.$gl;

    // if (process.env.NODE_ENV !== 'production') {
    //     if (!props[0] || !props[0].texture) {
    //         err('Texture not found, make sure using Painter.imgLoader instead of Easycanvas.imgLoader.')
    //     }
    // }

    if ($sprite.type !== '3d') {

        if (!props[0] && props.content) {
            // text
            var textCtx = document.createElement('canvas').getContext('2d');
            textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);
            
            // Puts text in center of canvas.
            textCtx.canvas.width  = props.content.length * parseInt(props.font) * 2;
            textCtx.canvas.height = parseInt(props.font) + 5;
            textCtx.font = props.font;
            textCtx.textAlign = props.align;
            // textCtx.textBaseline = "middle";
            textCtx.fillStyle = props.color;
            textCtx.fillText(props.content,
                props.align === 'right' ? textCtx.canvas.width : (props.align === 'center' ? textCtx.canvas.width / 2 : 0),
                textCtx.canvas.height - 5);

            var tex = gl.createTexture();
            // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

            props = [
                {
                    texture: tex,
                    width: textCtx.canvas.width,
                    height: textCtx.canvas.height,
                    img: textCtx.canvas,
                },
                0, 0, textCtx.canvas.width, textCtx.canvas.height,
                props.align === 'right' ? props.tx - textCtx.canvas.width :
                (props.align === 'center' ? props.tx - textCtx.canvas.width / 2 : props.tx),
                props.ty - textCtx.canvas.height + 5,
                textCtx.canvas.width, textCtx.canvas.height,
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
        var longSide = webgl.longSide * 1.8; // 三维根号3
        var meet = rectMeet(
            webgl.tx - longSide, webgl.ty - longSide,
            longSide * 2, longSide * 2,
            (webgl.tz) / 10000 * $canvas.width / 2,
            (webgl.tz) / 10000 * $canvas.height / 2,
            $canvas.width - (webgl.tz) / 10000 * $canvas.width / 2,
            $canvas.height - (webgl.tz) / 10000 * $canvas.height / 2,
            0, 0, 0);
        if (!meet) {
            // console.log('miss');
            return;
        }

        // webgl.tx 

        webglRender3d(
            $canvas, webgl
        );
    }
}

function degToRad(d) {
    return d * Math.PI / 180;
}

var lastVertices, lastTextures, lastIndices, lastColors;

var webglRender3d = function ($canvas, webgl) {
    let gl = $canvas.$gl;

    if (lastVertices !== webgl.vertices) {
        lastVertices = webgl.vertices;

        gl.positionBuffer = gl.createBuffer();
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
        // Put the positions in the buffer
        gl.bufferData(gl.ARRAY_BUFFER, webgl.vertices, gl.STATIC_DRAW);
    }

    if (lastColors !== webgl.colors) {
        lastColors = webgl.colors;

        if (webgl.colors) {
            gl.colorBuffer = gl.createBuffer();
            // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.colorBuffer);
            // color buffer
            gl.bufferData(gl.ARRAY_BUFFER, webgl.colors, gl.STATIC_DRAW);
        }
    }

    if (lastTextures !== webgl.textures) {
        lastTextures = webgl.textures;

        if (webgl.textures) {
            const indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

            // provide texture coordinates for the rectangle.
            gl.texcoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.texcoordBuffer);
            // Set Texcoords.
            gl.bufferData(gl.ARRAY_BUFFER, webgl.textures, gl.STATIC_DRAW);
        }
    }

    if (lastIndices !== webgl.indices) {
        lastIndices = webgl.indices;

        if (webgl.indices) {
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, webgl.indices, gl.STATIC_DRAW);
        }
    }

    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    // gl.enable(gl.DEPTH_TEST); // 加了不透明了？

    if (lastColors) {
        toggleShader(gl, 0);
        // Turn on the color attribute
        gl.enableVertexAttribArray(gl.colorLocation);
        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.colorBuffer);
        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3;                 // 3 components per iteration
        var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
        var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;               // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.colorLocation, size, type, normalize, stride, offset)
    } else if (lastTextures) {
        toggleShader(gl, 1);
        // Turn on the teccord attribute
        gl.enableVertexAttribArray(gl.texcoordLocation);
        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.texcoordBuffer);
        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.texcoordLocation, size, type, normalize, stride, offset);
    }

    if (lastVertices) {
        // Turn on the position attribute
        gl.enableVertexAttribArray(gl.positionLocation);
        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.positionLocation, size, type, normalize, stride, offset);
    }

    {
        if ($canvas.webgl.fudgeFactor) {
            var fudgeLocation = gl.getUniformLocation(gl.program, "u_fudgeFactor");
            var fudgeFactor = $canvas.webgl.fudgeFactor;
            gl.uniform1f(fudgeLocation, fudgeFactor);
        }
    }
    {
        // // Compute the matrices
        // var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 500);
        var matrix = gl.orthographic;
        matrix = m4.translate(matrix, webgl.tx || 0, webgl.ty || 0, webgl.tz || 0);
        matrix = m4.xRotate(matrix, degToRad(webgl.rx) || 0);
        matrix = m4.yRotate(matrix, degToRad(webgl.ry) || 0);
        matrix = m4.zRotate(matrix, degToRad(webgl.rz) || 0);
        matrix = m4.scale(matrix, webgl.scaleX || 1, webgl.scaleY || 1, webgl.scaleZ || 1);
        var projectionMatrix = matrix;
    }
    // {
    //     // camera
    //     var fieldOfViewRadians = degToRad(60);
    //     var modelXRotationRadians = degToRad(0);
    //     var modelYRotationRadians = degToRad(0);

    //     // // Compute the projection matrix
    //     // // 投射投影
    //     // var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    //     // var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    //     var cameraPosition = [
    //         degToRad(utils.funcOrValue($canvas.webgl.camera.rx, $canvas)),
    //         degToRad(utils.funcOrValue($canvas.webgl.camera.ry, $canvas)),
    //         // utils.funcOrValue($canvas.webgl.camera.rz, $canvas),
    //         1,
    //     ];
    //     // cameraPosition = [degToRad(0), 0, 1];
    //     var up = [0, 1, 0];

    //     // // Compute the camera's matrix using look at.
    //     var cameraMatrix = m4.lookAt(cameraPosition, projectionMatrix, up);

    //     // // Make a view matrix from the camera matrix.
    //     var viewMatrix = m4.inverse(cameraMatrix);

    //     var projectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    // }

    // 耗性能
    gl.uniformMatrix4fv(gl.matrixLocation, false, projectionMatrix);

    // Tell the shader to use texture unit 0 for u_texture
    gl.uniform1i(gl.textureLocation, 0);

    if (!webgl.indices) {
        gl.drawArrays(gl.TRIANGLES, 0, webgl.vertices.length / 3);
    } else {
        gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
    }
};

var webglRender2d = function ($canvas,
    texture, texWidth, texHeight,
    srcX, srcY, srcWidth, srcHeight,
    dstX, dstY, dstWidth, dstHeight,
    settings) {

    let gl = $canvas.$gl;

    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // // Tell WebGL how to convert from clip space to pixels
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    toggleShader(gl, 1);

    if (lastVertices !== '2d') {
        lastVertices = '2d';
        lastTextures = lastIndices = undefined;

        // Create a buffer.
        gl.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
        gl.enableVertexAttribArray(gl.positionLocation);
        gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(gl.texcoordLocation);
        gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        // Put a unit quad in the buffer
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
        // const indexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // Create a buffer for texture coords
        gl.texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.texcoordBuffer);
    }

    // this matirx will convert from pixels to clip space
    var matrix = gl.orthographic;

    // this matrix will translate our quad to dstX, dstY
    matrix = m4.translate(matrix, dstX, dstY, 0);
    // We need to pick a place to rotate around

    // We'll move to the middle, rotate, then move back
    if (settings.rotate) {
        matrix = m4.translate(matrix, -dstX + settings.beforeRotate[0] || 0, -dstY + settings.beforeRotate[1] || 0, 0);
        matrix = m4.zRotate(matrix, settings.rotate);
        matrix = m4.translate(matrix, dstX + settings.afterRotate[0] || 0, dstY + settings.afterRotate[1] || 0, 0);
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
    if (srcX || srcY || (srcWidth !== texWidth) || (srcHeight !== texHeight)) {
        var texMatrix = m4.translation(srcX / texWidth, srcY / texHeight, 0);
        texMatrix = m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);

        // Set the texture matrix.
        gl.uniformMatrix4fv(gl.textureMatrixLocation, false, texMatrix);
    }

    // Tell the shader to get the texture from texture unit 0
    // gl.uniform1i(gl.textureLocation, 0);

    // draw the quad (2 triangles, 6 vertices)
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    // gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
};

window.Easycanvas.$webglRegister = function ($canvas, option) {
    var gl = $canvas.$gl = $canvas.$paintContext;

    $canvas.webgl = {
        depth: option.webgl.depth || 10000,
        fudgeFactor: option.webgl.fudgeFactor || 0,
    };

    gl.orthographic = m4.orthographic(0, $canvas.width, $canvas.height, 0, -$canvas.webgl.depth, $canvas.webgl.depth);

    gl.clearColor(0, 0, 0, 0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);   
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    toggleShader(gl, 0);

    {
        $canvas.imgLoader = function (url, callback) {
            var tex = gl.createTexture();

            var textureInfo = {
                width: 0,   // we don't know the size until it loads
                height: 0,
            };

            img2base64(url, function (base64url) {
                function loadImageAndCreateTextureInfo(url) {
                    var img = new Image();
                    img.addEventListener('load', function() {
                        textureInfo.width = img.width;
                        textureInfo.height = img.height;
                        textureInfo.texture = tex;
                        textureInfo.img = img;

                        gl.bindTexture(gl.TEXTURE_2D, tex);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                        callback && callback(textureInfo); //
                    });
                    img.src = url;
                }
                loadImageAndCreateTextureInfo(base64url, callback);
            });

            return textureInfo;
        }
    }
};

var arrayRepeat = function (arr, n) {
    let str = arr.join(',');
    let tmp = '';
    for (var i = 1; i <= n; i++) {
        tmp += str;
        if (i < n) {
            tmp += ',';
        }
    }
    return tmp.split(',');
};

var createShapeWithCachedArray = (() => {
    const cachePool = {};

    const blockTextures = new Float32Array(arrayRepeat([
        0, 0,
        0, 1,
        1, 1,
        1, 0,
    ], 6));
    const blockIndices = new Uint16Array([
        0, 1, 2,   0, 2, 3,    // front  
        4, 5, 6,   4, 6, 7,    // right  
        8, 9,10,   8,10,11,    // up  
        12,13,14,  12,14,15,   // left  
        16,17,18,  16,18,19,   // down  
        20,21,22,  20,22,23,   // back  
    ]);

    return (shape, args, colors = []) => {
        var key = shape + args.join(',') + colors.join(',');

        var result = {};

        if (shape === 'block') {
            var a = args[0] / 2;
            var b = args[1] / 2;
            var c = args[2] / 2;

            var vertices = cachePool[key + 'v'] || new Float32Array([
                a, b, c,
                -a, b, c,
                -a, -b, c,
                a, -b, c,
                a, b, c,
                a, -b, c,
                a, -b, -c,
                a, b, -c,
                a, b, c,
                a, b, -c,
                -a, b, -c,
                -a, b, c,
                -a, b, c,
                -a, b, -c,
                -a, -b, -c,
                -a, -b, c,
                -a, -b, -c,
                a, -b, -c,
                a, -b, c,
                -a, -b, c,
                a, -b, -c,
                -a, -b, -c,
                -a, b, -c,
                a, b, -c
            ]);

            var longSide = cachePool[key + 'l'] || Math.max(Math.max.apply(this, vertices), -Math.min.apply(this, vertices));

            result.vertices = cachePool[key + 'v'] = vertices;
            result.indices = blockIndices;
            result.textures = blockTextures;
            result.longSide = cachePool[key + 'l'] = longSide;
        } else {
            // ball
            var vertexPositionData = cachePool[key + 'v'] || [];
            var indexData = cachePool[key + 'i'] || [];
            var textureCoordData = cachePool[key + 't'] || [];

            if (!vertexPositionData.length) {
                var normalData = [];
                var radius = args[0];
                var latitudeBands = args[1], longitudeBands = args[2];

                for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
                    var theta = latNumber * Math.PI / latitudeBands;
                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);

                    for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                        var phi = longNumber * 2 * Math.PI / longitudeBands;
                        var sinPhi = Math.sin(phi);
                        var cosPhi = Math.cos(phi);

                        var x = cosPhi * sinTheta;
                        var y = cosTheta;
                        var z = sinPhi * sinTheta;
                        var u = 1 - (longNumber / longitudeBands);
                        var v = 1 - (latNumber / latitudeBands);

                        normalData.push(x);
                        normalData.push(y);
                        normalData.push(z);
                        textureCoordData.push(u);
                        textureCoordData.push(v);
                        vertexPositionData.push(radius * x);
                        vertexPositionData.push(radius * y);
                        vertexPositionData.push(radius * z);
                    }
                }

                for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
                    for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
                        var first = (latNumber * (longitudeBands + 1)) + longNumber;
                        var second = first + longitudeBands + 1;
                        indexData.push(first);
                        indexData.push(second);
                        indexData.push(first + 1);

                        indexData.push(second);
                        indexData.push(second + 1);
                        indexData.push(first + 1);
                    }
                }

                cachePool[key + 'v'] = new Float32Array(vertexPositionData);
                cachePool[key + 'i'] = new Uint16Array(indexData);
                cachePool[key + 't'] = new Float32Array(textureCoordData);
                cachePool[key + 'l'] = Math.max(Math.max.apply(this, vertices), -Math.min.apply(this, vertexPositionData));
            }

            result.vertices = cachePool[key + 'v'];
            result.indices = cachePool[key + 'i'];
            result.textures = cachePool[key + 't'];
            result.longSide = cachePool[key + 'l'];
        }

        if (colors.length) {
            // 优先走缓存
            result.colors = cachePool[key + 'c'];

            if (!result.colors) {
                var colorRepeatTimes = result.vertices.length / colors.length;
                // var colorRepeatTimes = (result.indices || result.vertices).length / colors.length;
                if (colorRepeatTimes > 1) {
                    result.colors = new Uint8Array(arrayRepeat(colors, Math.ceil(colorRepeatTimes)));
                }

                cachePool[key + 'c'] = result.colors;
            }
        }

        return result;
    };
})();

var wrapper = function (structure, opt) {
    for (var key in opt) {
        if (!structure[key]) {
            structure[key] = opt[key]
        }
    }

    return structure;
};

window.Easycanvas.webglShapes = {
    block: function (opt) {
        var structure = createShapeWithCachedArray('block', [opt.a, opt.b, opt.c], opt.colors);
        return wrapper(structure, opt);
    },

    ball: function (opt) {
        var structure = createShapeWithCachedArray('ball', [opt.r, opt.b || opt.lat || 20, opt.b || opt.lng || 20], opt.colors);
        return wrapper(structure, opt);
    },
};
