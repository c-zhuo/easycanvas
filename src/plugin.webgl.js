/** ********** *
 *
 * Support webgl rendering
 * - Usage: set {webgl: true} in config on registering your canvas instance.
 *
 * ********** **/

import _webglUtils from 'lib/webgl-utils.js';
import _webglM4 from 'lib/m4.js';

import img2base64 from 'utils/img2base64.js';

var parentNode = document.body || document.head || document;

var script1 = document.createElement('script');
script1.id = 'drawImage-vertex-shader';
script1.type = 'x-shader/x-vertex';
script1.innerHTML = `
	attribute vec4 a_position;
	attribute vec2 a_texcoord;

	uniform mat4 u_matrix;
	uniform mat4 u_textureMatrix;

	varying vec2 v_texcoord;

	void main() {
	   gl_Position = u_matrix * a_position;
	   v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;
	}
`;
parentNode.appendChild(script1);

var script2 = document.createElement('script');
script2.id = 'drawImage-fragment-shader';
script2.type = 'x-shader/x-fragment';
script2.innerHTML = `
	precision mediump float;

	varying vec2 v_texcoord;

	uniform sampler2D u_texture;

	void main() {
	   gl_FragColor = texture2D(u_texture, v_texcoord);
	    // vec4 color = texture2D(u_texture, v_texcoord);
	    // gl_FragColor = vec4(color.rgb, 0.9 * color.b);
	}
`;
parentNode.appendChild(script2);

window.m4 = _webglM4();
window.webglUtils = _webglUtils();

// Unlike images, textures do not have a width and height associated
// with them so we'll pass in the width and height of the texture
window.Easycanvas.$webglPainter = function ($canvas,
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
    var texMatrix = m4.translation(srcX / texWidth, srcY / texHeight, 0);
    texMatrix = m4.scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);

    // Set the texture matrix.
    gl.uniformMatrix4fv(gl.textureMatrixLocation, false, texMatrix);

    // Tell the shader to get the texture from texture unit 0
    // gl.uniform1i(gl.textureLocation, 0);

    // draw the quad (2 triangles, 6 vertices)
    // gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
};

window.Easycanvas.$webglRegister = function ($canvas) {
    var gl = $canvas.$gl = $canvas.$paintContext;
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
        $canvas.imgLoader = function (url, callback) {
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
};
