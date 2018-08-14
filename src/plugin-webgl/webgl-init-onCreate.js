import utils from 'utils/utils.js';
import img2base64 from 'utils/img2base64.js';
import _webglM4 from 'lib/m4.js';

import { degToRad, err } from './webgl-utils';
// import toggleShader from './webgl-shader-toggle.js';

const m4 = _webglM4();

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
    
    // toggleShader(gl, 0);

    {
        $canvas.imgLoader = function (url, callback) {
            var tex = gl.createTexture();

            var textureInfo = {
                width: 0,
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

module.exports = function (_option) {
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
