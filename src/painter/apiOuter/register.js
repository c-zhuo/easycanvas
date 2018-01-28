/** ********** *
 *
 * Create an Easycanvas instance on current dom
 * - Start the 'hold' event judging interval(may includes a memory waste after destroyed).
 *
 * ********** **/

import $protoData from './register.protoData.js';
import eventScroll from '../apiInner/eventHandler.scroll.js';
import img2base64 from 'utils/img2base64.js';

module.exports = function (dom, option) {
    for (let i in $protoData) {
        // Avoid muti instances from sharing data
        this[i] = JSON.parse(JSON.stringify($protoData[i]));
        // this[i] = $protoData[i];
    }

    if (process.env.NODE_ENV !== 'production') {
        this.fpsHandler = function (fps) {
            if (this.maxFps > 0 && fps < this.maxFps * 0.5) {
                console.warn(`Low FPS detected(${fps}), max FPS in settings is ${this.maxFps}.`);
            }
        };
    }

    let _option = option || {};

    this.$dom = dom;

    if (_option.fullScreen) {
        dom.width = dom.style.width = document.body.clientWidth || document.documentElement.clientWidth;
        dom.height = dom.style.height = document.body.clientHeight || document.documentElement.clientHeight;
    }

    if (process.env.NODE_ENV !== 'production') {
        if (
            (_option.width && dom.width && _option.width !== dom.width) ||
            (_option.height && dom.height && _option.height !== dom.height)
        ) {
            console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
        }
    }

    this.width = this.contextWidth = _option.width || dom.width;
    this.height = this.contextHeight = _option.height || dom.height;

    this.imageLoader = Easycanvas.imageLoader;

    if (_option.webgl) {
        this.$paintContext = dom.getContext('webgl', {
            alpha: true
        });
        if (this.$paintContext) {
            this.$isWebgl = true;
            var gl = this.$gl = this.$paintContext;
            gl.matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);

            {
                gl.clearColor(0,0,0,0);
                // gl.enable(gl.DEPTH_TEST);
                gl.enable(gl.BLEND);   
                // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);  
                // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                // setup GLSL program
                gl.program = webglUtils.createProgramFromScripts(gl, ["drawImage-vertex-shader", "drawImage-fragment-shader"]);
                gl.useProgram(gl.program);

                // look up where the vertex data needs to go.
                gl.positionLocation = gl.getAttribLocation(gl.program, "a_position");
                gl.texcoordLocation = gl.getAttribLocation(gl.program, "a_texcoord");

                // lookup uniforms
                gl.matrixLocation = gl.getUniformLocation(gl.program, "u_matrix");
                gl.textureMatrixLocation = gl.getUniformLocation(gl.program, "u_textureMatrix");
                gl.textureLocation = gl.getUniformLocation(gl.program, "u_texture");

                // Create a buffer.
                gl.positionBuffer = gl.positionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, gl.positionBuffer);
                gl.enableVertexAttribArray(gl.positionLocation);
                gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(gl.texcoordLocation);
                gl.vertexAttribPointer(gl.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

                // Put a unit quad in the buffer
                const textureCoordinates = [
                    0, 0,
                    1, 0,
                    0, 1,
                    1, 1,
                    // 0, 0,
                    // 0, 1,
                    // 1, 0,
                    // 1, 0,
                    // 0, 1,
                    // 1, 1,
                ];
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                            gl.STATIC_DRAW);
                const indexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

                // Create a buffer for texture coords
                gl.texcoordBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, gl.texcoordBuffer);

                // Put texcoords in the buffer
                var texcoords = [
                    0, 0,
                    1, 0,
                    0, 1,
                    1, 1,
                ];
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

                const indices = [
                    0, 1, 2, 2, 1, 3
                ];

                // Now send the element array to GL
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(indices), gl.STATIC_DRAW);
            }

            {
                this.imgLoader = function (url, callback) {
                    var tex = gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, tex);

                    // Fill the texture with a 1x1 blue pixel.
                    // chenzhuo04: loading img
                    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                    //               new Uint8Array([0, 0, 255, 255]));

                    // let's assume all images are not a power of 2
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    var textureInfo = {
                        width: 0,   // we don't know the size until it loads
                        height: 0,
                        texture: tex,
                    };

                    img2base64(url, function (base64url) {
                        function loadImageAndCreateTextureInfo(url) {
                            var img = new Image();
                            img.addEventListener('load', function() {
                                textureInfo.width = img.width;
                                textureInfo.height = img.height;

                                gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
                                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                                callback && callback(textureInfo); //
                            });
                            img.src = url;
                        }
                        loadImageAndCreateTextureInfo(base64url, callback);
                    });

                    return textureInfo;
                }
            }
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('[Easycanvas] Webgl is not supported in current browser, using canvas2d instead.');
            }
        }
    }

    this.$paintContext = this.$paintContext || dom.getContext('2d');
    this.imgLoader = this.imgLoader || Easycanvas.imgLoader;

    if (process.env.NODE_ENV !== 'production') {
        this.$plugin.hook.register(this);
    }

    this.events = _option.events || {};

    // this.scroll = _option.scroll || {};
    this.hooks = _option.hooks || {};

    let eventList = ['contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'];
    eventList.forEach((e) => {
        dom.addEventListener(e, this.$eventHandler.bind(this));
    });

    eventScroll.tick();
    // this.$bindScroll.bind(_this);

    setInterval(() => {
        if (this.eHoldingFlag) {
            let e = this.eHoldingFlag;
            this.$eventHandler.call(this, {
                layerX: e.layerX,
                layerY: e.layerY,
                screenX: e.screenX || e.layerX,
                screenY: e.screenY || e.layerY,
                type: 'hold',
            });
        }
    }, 40); // TODO
};
