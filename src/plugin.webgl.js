/** ********** *
 *
 * Support webgl rendering
 * - Usage: set {webgl: true} in config on registering your canvas instance.
 *
 * ********** **/

import _webglM4 from 'lib/m4.js';

import webglShapes from './plugins/webgl-shapes.js';
import webglShaders from './plugins/webgl-shaders.js';
import { arrayRepeat } from './plugins/webgl-utils';

import utils from 'utils/utils.js';

import rectMeet from 'utils/math.rect-meet';
import img2base64 from 'utils/img2base64.js';

const m4 = _webglM4();

const inBrowser = typeof window !== 'undefined';

const err = function (msg) {
    console.error('[Easycanvas-webgl] ' + msg);
};

const createShader = (function () {
    var shaderCachePool = {};

    return function (gl, type, colorOrTex, light) {
        let cacheKey = '' + type + colorOrTex + light;

        if (shaderCachePool[cacheKey]) {
            return shaderCachePool[cacheKey];
        }

        let sourceCode = webglShaders.factory(gl, type)(colorOrTex, light);

        // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
        var shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(shader);
            throw 'Could not compile WebGL program. \n\n' + info;
        }

        shaderCachePool[cacheKey] = shader;

        return shader;
    }
})();

const createProgram = function (gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();

    // Attach pre-existing shaders
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var info = gl.getProgramInfoLog(program);
        throw 'Could not compile WebGL program. \n\n' + info;
    }

    return program;
}

// 0-color 1-textcoord
const toggleShader = (function () {
    var lastType;

    return function (gl, type, light) {
        if (lastType === type) return;

        lastType = type;

        var shaderVertexColor, shaderFragmentColor;
        shaderVertexColor = createShader(gl, gl.VERTEX_SHADER, type, light);
        shaderFragmentColor = createShader(gl, gl.FRAGMENT_SHADER, type, light);

        gl.program = createProgram(gl, shaderVertexColor, shaderFragmentColor);

        gl.useProgram(gl.program);

        // look up where the vertex data needs to go.
        gl.positionLocation = gl.getAttribLocation(gl.program, 'a_position');
        gl.normalLocation = gl.getAttribLocation(gl.program, "a_normal");
        if (type === 0) {
            gl.colorLocation = gl.getAttribLocation(gl.program, 'a_color');
        } else {
            gl.texcoordLocation = gl.getAttribLocation(gl.program, 'a_texcoord');
        }

        // light
        // if (type === 0) {
            gl.worldViewProjectionLocation = gl.getUniformLocation(gl.program, "u_worldViewProjection");
            gl.worldInverseTransposeLocation = gl.getUniformLocation(gl.program, "u_worldInverseTranspose");
            gl.reverseLightDirectionLocation = gl.getUniformLocation(gl.program, "u_reverseLightDirection");
        // }

        // lookup uniforms
        gl.matrixLocation = gl.getUniformLocation(gl.program, 'u_matrix');
        if (type === 0) {
            gl.textureLocation = gl.getUniformLocation(gl.program, 'u_texture');
        } else {
            gl.textureMatrixLocation = gl.getUniformLocation(gl.program, 'u_textureMatrix');
        }

        gl.enableVertexAttribArray(gl.positionLocation);
        light && gl.enableVertexAttribArray(gl.normalLocation);
        gl.enableVertexAttribArray(gl.texcoordLocation);
        gl.enableVertexAttribArray(gl.colorLocation);
    };
})();

const textCachePool = {};
const webglRender = function ($sprite, settings, $canvas) {
    var props = $sprite.props;
    var webgl = $sprite.webgl;
    var gl = $canvas.$gl;

    if (process.env.NODE_ENV !== 'production') {
        if (props && props[0] && !props[0].texture && props[0].src) {
            err('Texture not found, make sure using Painter.imgLoader instead of Easycanvas.imgLoader.')
        }
    }

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
        if (webgl.longSide) {
            var longSide = webgl.longSide * 1.8; // 三维根号3
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
}

function degToRad(d) {
    return d * Math.PI / 180;
}

var webglRender3d = function ($canvas, webgl) {
    if ((!webgl.colors || !webgl.colors.length) && (!webgl.textures || !webgl.textures.length)) return;

    let gl = $canvas.$gl;

    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    if (webgl.opacity) {
        gl.disable(gl.DEPTH_TEST);
    }

    var positionBuffer = webgl.vertices.$cacheBuffer,
        colorBuffer, texcoordBuffer, indicesBuffer, normalsBuffer;

    if (!positionBuffer) {
        positionBuffer = gl.createBuffer();
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Put the positions in the buffer
        gl.bufferData(gl.ARRAY_BUFFER, webgl.vertices, gl.STATIC_DRAW);
        webgl.vertices.$cacheBuffer = positionBuffer;
    }

    if (webgl.colors) {
        colorBuffer = webgl.colors.$cacheBuffer;
        if (!colorBuffer) {
            colorBuffer = gl.createBuffer();
            // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            // color buffer
            gl.bufferData(gl.ARRAY_BUFFER, webgl.colors, gl.STATIC_DRAW);
            webgl.colors.$cacheBuffer = colorBuffer;
        }
    } else {
        texcoordBuffer = webgl.textures.$cacheBuffer;
        if (!texcoordBuffer) {
            // provide texture coordinates for the rectangle.
            texcoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            // Set Texcoords.
            gl.bufferData(gl.ARRAY_BUFFER, webgl.textures, gl.STATIC_DRAW);
            webgl.textures.$cacheBuffer = texcoordBuffer;
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
        toggleShader(gl, 0, $canvas.webgl.light);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        var size = 3;                 // 3 components per iteration
        var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
        var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;               // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.colorLocation, size, type, normalize, stride, offset)
    } else if (texcoordBuffer) {
        toggleShader(gl, 1, $canvas.webgl.light);
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.texcoordLocation, size, type, normalize, stride, offset);
    }

    if (webgl.vertices) {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.positionLocation, size, type, normalize, stride, offset);
    }

    if (webgl.normals) {
        gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(gl.normalLocation, size, type, normalize, stride, offset);
    }

    if ($canvas.webgl.$fudgeFactor) {
        var fudgeLocation = gl.getUniformLocation(gl.program, "u_fudgeFactor");
        var fudgeFactor = $canvas.webgl.$fudgeFactor;
        gl.uniform1f(fudgeLocation, fudgeFactor);
    }

    {
        // // Compute the matrices
        // var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 500);
        var matrix = gl.orthographic;
        matrix = m4.translate(matrix, webgl.tx || 0, webgl.ty || 0, webgl.tz || 0);
        matrix = m4.xRotate(matrix, degToRad(webgl.rx) || 0);
        matrix = m4.yRotate(matrix, degToRad(webgl.ry) || 0);
        matrix = m4.zRotate(matrix, degToRad(webgl.rz) || 0);
        matrix = m4.scale(matrix,
            (webgl.scaleX !== 1 ? webgl.scaleX : webgl.scale) || 1,
            (webgl.scaleY !== 1 ? webgl.scaleY : webgl.scale) || 1,
            (webgl.scaleZ !== 1 ? webgl.scaleZ : webgl.scale) || 1);
        var projectionMatrix = matrix;
    }

    if ($canvas.webgl.camera) {
        // camera
        // var fieldOfViewRadians = degToRad(60);
        // var modelXRotationRadians = degToRad(0);
        // var modelYRotationRadians = degToRad(0);

        // // Compute the projection matrix
        // // 投射投影
        // var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        // var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

        var cameraPosition = [
            degToRad(utils.funcOrValue($canvas.webgl.camera.rx || 0, $canvas)),
            degToRad(utils.funcOrValue($canvas.webgl.camera.ry || 0, $canvas)),
            // degToRad(utils.funcOrValue($canvas.webgl.camera.rz || 0, $canvas)),
            // utils.funcOrValue($canvas.webgl.camera.rz, $canvas),
            1,
        ];
        // cameraPosition = [degToRad(0), 0, 1];
        var up = [0, 1, 0];

        // // Compute the camera's matrix using look at.
        var cameraMatrix = m4.lookAt(cameraPosition, projectionMatrix, up);

        // // Make a view matrix from the camera matrix.
        var viewMatrix = m4.inverse(cameraMatrix);

        var projectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    }

    if ($canvas.webgl.light) {
        // 光照变换
        gl.uniformMatrix4fv(gl.worldViewProjectionLocation, false, matrix);
        gl.uniformMatrix4fv(gl.worldInverseTransposeLocation, false, m4.transpose(projectionMatrix));
    }

    // 耗性能
    gl.uniformMatrix4fv(gl.matrixLocation, false, projectionMatrix);

    if ($canvas.webgl.light) {
        var colorLocation = gl.getUniformLocation(gl.program, "a_color");
        gl.uniform4fv(colorLocation, [1, 1, 1, 1]); // color
        gl.uniform3fv(gl.reverseLightDirectionLocation, m4.normalize([0, 1, 0]));
    }

    // Tell the shader to use texture unit 0 for u_texture
    gl.uniform1i(gl.textureLocation, 0);

    if (indicesBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        // gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLES, webgl.indices.length, gl.UNSIGNED_SHORT, 0);
    } else {
        gl.drawArrays(gl.TRIANGLES, 0, webgl.vertices.length / 3);
    }
};

var cacheBuffer2d;
var webglRender2d = function ($canvas,
    texture, texWidth, texHeight,
    srcX, srcY, srcWidth, srcHeight,
    dstX, dstY, dstWidth, dstHeight,
    settings) {

    let gl = $canvas.$gl;

    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // // Tell WebGL how to convert from clip space to pixels
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    toggleShader(gl, 1);

    // Create a buffer.
    if (!cacheBuffer2d) {
        cacheBuffer2d = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
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
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, cacheBuffer2d);
    gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Create a buffer for texture coords
    // gl.texcoordBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, gl.texcoordBuffer);

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

const webglRegister = function ($canvas, option) {
    $canvas.$isWebgl = true;

    $canvas.webgl = {};
    Object.assign($canvas.webgl, option.webgl);
    $canvas.webgl.depth = $canvas.webgl.depth || 10000;

    var gl = $canvas.$gl = $canvas.$paintContext;

    gl.clearColor(0, 0, 0, 0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
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
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

                        callback && callback(textureInfo);
                    });
                    img.src = url;
                }
                loadImageAndCreateTextureInfo(base64url, callback);
            });

            return textureInfo;
        }
    }
};

const onCreate = function (_option) {
    if (_option.webgl) {
        // 获取webgl对象
        this.$paintContext = this.$dom.getContext('webgl', {
            alpha: true,
            premultipliedAlpha: false,
        });

        // 检测是否支持webgl
        if (this.$paintContext) {
            webglRegister(this, _option);

            // 挂载每帧的事件监听
            this.on('beforeTick', () => {
                // 把每帧只需要计算一次的属性放到钩子里
                // 后面可以增加camera.rx、light等参数，进一步优化性能
                this.webgl.$depth = utils.funcOrValue(utils.firstValuable(this.webgl.depth, 0), this);
                this.webgl.$fudgeFactor = utils.funcOrValue(utils.firstValuable(this.webgl.fudgeFactor, 0), this);
                this.$paintContext.orthographic = m4.orthographic(0, this.width, this.height, 0, -this.webgl.$depth, this.webgl.$depth);
            });
        } else {
            if (process.env.NODE_ENV !== 'production') {
                err('Webgl is not supported in current browser, using canvas2d instead.');
            }

            if (_option.webgl.fallback) {
                _option.webgl.fallback.call(this);
            }
        }
    }
};

const default0s = ['rx', 'ry', 'rz'];
const default1s = ['scale', 'scaleX', 'scaleY', 'scaleZ'];
const styleKeys = default0s.concat(default1s);

const onPaint = function () {
    let $sprite = this;
    let $canvas = this.$canvas;

    if ($sprite.webgl && $sprite.webgl.vertices) {
        $sprite.$rendered = true;

        if ($sprite.webgl.img) {
            if (typeof $sprite.webgl.img === 'string') {
                $sprite.webgl.img = $canvas.imgLoader($sprite.webgl.img);
            } else if ($sprite.webgl.img.src) {
                $sprite.webgl.img = $canvas.imgLoader($sprite.webgl.img.src);
            }
        }

        let _webgl = {
            tx: $sprite.getStyle('tx'),
            ty: $sprite.getStyle('ty'),
            tz: utils.funcOrValue($sprite.webgl.tz, $sprite) || 0,
        };

        for (let key in $sprite.webgl) {
            _webgl[key] = utils.funcOrValue($sprite.webgl[key], $sprite) || 0;
        }

        styleKeys.forEach((key) => {
            _webgl[key] = $sprite.getWebglStyle(key);
        });

        let $paintSprite = {
            $id: $sprite.$id,
            type: '3d',
            webgl: _webgl,
        };

        if (process.env.NODE_ENV !== 'production') {
            // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = $sprite;
        };

        $canvas.$children.push($paintSprite);
    }
};

const onRender = function ($sprite, settings) {
    let $canvas = this;

    if ($canvas.$isWebgl) {
        webglRender($sprite, settings, $canvas);

        if (process.env.NODE_ENV !== 'production') {
            $canvas.$plugin.drawImage($canvas);
        }

        return true;
    }
};

const onUse = function (easycanvas) {
    easycanvas.webglShapes = webglShapes;

    easycanvas.sprite.prototype.getWebglStyle = function (key) {
        let $sprite = this;
        let currentValue;

        if (default1s.indexOf(key) >= 0) currentValue = 1;
        if (default0s.indexOf(key) >= 0) currentValue = 0;

        if ($sprite.webgl) {
            currentValue = utils.funcOrValue($sprite.webgl[key], $sprite) || currentValue;
        }

        if ($sprite.$parent) {
            if (default1s.indexOf(key) >= 0) {
                currentValue *= utils.firstValuable($sprite.$parent.getWebglStyle(key), 1);
            } else if (default0s.indexOf(key) >= 0) {
                // rx, ry, rz
                currentValue += utils.firstValuable($sprite.$parent.getWebglStyle(key), 0);
            }
        }

        return currentValue;
    };

    easycanvas.sprite.prototype.updateWebglStyle = function (key, value) {
        let $sprite = this;

        if ($sprite.webgl && $sprite.webgl[key]) {
            $sprite.webgl[key].$cacheBuffer = undefined;

            if (key === 'colors' && value) {
                let repeatTimes = $sprite.webgl.vertices.length / value.length;
                $sprite.webgl.colors = new Uint8Array(arrayRepeat(value, repeatTimes));
            }
        }
    };
};

const plugin = {
    onCreate,
    onPaint,
    onRender,
    onUse,
};

if (inBrowser && window.Easycanvas) {
    Easycanvas.use(plugin);
} else {
    module.exports = plugin;
}
