import webglShaders from './webgl-shaders.js';

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

var lastType;

module.exports = function (gl, type, light, primitive) {
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
