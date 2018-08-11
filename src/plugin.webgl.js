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

    return function (gl, type, colorOrTex, light, primitive) {
        let cacheKey = '' + type + colorOrTex + light + primitive;
        if (gl.singleShader) {
            cacheKey = 'singleShader' + type;
        }

        if (shaderCachePool[cacheKey]) {
            return shaderCachePool[cacheKey];
        }

        // let sourceCode = webglShaders.factory(gl, type)(colorOrTex, light, primitive);
        let sourceCode = webglShaders[gl.singleShader ? 'final' : 'factory'](gl, type)(colorOrTex, light, primitive);

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

    return function (gl, type, light, primitive) {
        let lastFlag = '' + type + light + primitive;
        if (gl.singleShader) {
            lastFlag = 'singleShader';
        }

        if (lastType === lastFlag) return;
        lastType = lastFlag;

        var shaderVertexColor, shaderFragmentColor;
        shaderVertexColor = createShader(gl, gl.VERTEX_SHADER, type, light, primitive);
        shaderFragmentColor = createShader(gl, gl.FRAGMENT_SHADER, type, light, primitive);

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

        gl.sizeLocation = gl.getAttribLocation(gl.program, "u_size");

        // light
        gl.worldViewProjectionLocation = gl.getUniformLocation(gl.program, "u_worldViewProjection");
        gl.worldInverseTransposeLocation = gl.getUniformLocation(gl.program, "u_worldInverseTranspose");
        gl.reverseLightDirectionLocation = gl.getUniformLocation(gl.program, "u_reverseLightDirection");
        gl.vShaderTypeLocation = gl.getUniformLocation(gl.program, "v_shaderType");
        gl.fShaderTypeLocation = gl.getUniformLocation(gl.program, "f_shaderType");

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

        // disableVertexAttribArray // todo
    };
})();

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
}

function degToRad(d) {
    return d * Math.PI / 180;
}

var webglRender3d = function ($canvas, webgl) {
    if ((!webgl.colors || !webgl.colors.length) && (!webgl.textures || !webgl.textures.length)) return;

    let gl = $canvas.$gl;

    if (webgl.hasAlpha) {
        gl.disable(gl.DEPTH_TEST);
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

    if (webgl.colors) {
        colorBuffer = webgl.colors.$cacheBuffer;
        if (!colorBuffer) {
            colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, webgl.colors, gl.STATIC_DRAW);
            webgl.colors.$cacheBuffer = colorBuffer;
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
        // var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        gl.vertexAttribPointer(gl.colorLocation, webgl.hasAlpha ? 4 : 3, gl.UNSIGNED_BYTE, true, 0, 0)
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

const webglRegister = function ($canvas, option) {
    $canvas.$isWebgl = true;

    $canvas.webgl = {};
    Object.assign($canvas.webgl, option.webgl);
    $canvas.webgl.depth = $canvas.webgl.depth || 10000;
    $canvas.webgl.singleShader = $canvas.webgl.singleShader || 0;
    $canvas.webgl.camera = $canvas.webgl.camera || {};
    $canvas.webgl.camera.current = $canvas.webgl.camera.current || {};
    $canvas.webgl.camera.target = $canvas.webgl.camera.target || {};

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
                this.$paintContext.clear(this.$paintContext.COLOR_BUFFER_BIT | this.$paintContext.DEPTH_BUFFER_BIT);

                // 把每帧只需要计算一次的属性放到钩子里
                // 后面可以增加camera.rx、light等参数，进一步优化性能

                // webgl configs
                this.webgl.$depth = utils.funcOrValue(utils.firstValuable(this.webgl.depth, 0), this);
                this.webgl.$camera = this.webgl.camera.enable ? {} : false;
                this.webgl.$fudgeFactor = utils.funcOrValue(utils.firstValuable(this.webgl.fudgeFactor, 0), this);

                if (this.webgl.$camera) {
                    // camera
                    var camera = this.webgl.camera;
                    var aspect = this.width / this.height;
                    // var cameraAngleRadians = 60;
                    var projectionMatrix = m4.perspective(degToRad(60), aspect, 1, 10000);

                    var cameraPosition = [
                        utils.funcOrValue(camera.current.x || 0, this),
                        utils.funcOrValue(camera.current.y || 0, this),
                        utils.funcOrValue(camera.current.z || 0, this),
                    ];

                    var up = [0, -1, 0];
                    if (camera.rotate) {
                        up = [
                            utils.funcOrValue(camera.rotate.x, this),
                            utils.funcOrValue(camera.rotate.y, this),
                            utils.funcOrValue(camera.rotate.z, this),
                        ];
                    }

                    var fPosition = [
                        utils.funcOrValue(camera.target.x || 0, this),
                        utils.funcOrValue(camera.target.y || 0, this),
                        utils.funcOrValue(camera.target.z || 0, this),
                    ];

                    var cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);
                    var viewMatrix = m4.inverse(cameraMatrix);
                    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

                    this.webgl.$camera.viewProjectionMatrix = viewProjectionMatrix;
                }

                // gl props
                this.$paintContext.orthographic = m4.orthographic(0, this.width, this.height, 0, this.webgl.$depth, -this.webgl.$depth);
                this.$paintContext.singleShader = this.webgl.singleShader;
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
