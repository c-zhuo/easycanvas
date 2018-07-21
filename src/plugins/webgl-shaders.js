// @type: 0-color 1-textcoord
const shaderVertexFactory = function (type, useLight) {
    let shaderString = `
        attribute vec4 a_position;
        ${type === 0 ? 
            'attribute vec4 a_color;' :
            'attribute vec2 a_texcoord;'}
        ${useLight && `
            attribute vec3 a_normal;
            uniform mat4 u_worldViewProjection;
            uniform mat4 u_worldInverseTranspose;
        ` || ''}
        uniform float u_fudgeFactor; // 透射

        uniform mat4 u_matrix;

        ${type === 0 ? 
            'varying vec4 v_color;' :
            'varying vec2 v_texcoord;'}
        ${useLight && `
            varying vec3 v_normal;
        ` || ''}

        void main() {
            // Multiply the position by the matrix.
            // gl_Position = u_matrix * a_position;

            // 透射
            // 调整除数
            vec4 position = u_matrix * a_position;
            // 由于裁减空间中的 Z 值是 -1 到 +1 的，所以 +1 是为了让 zToDivideBy 变成 0 到 +2 * fudgeFactor
            float zToDivideBy = 1.0 + position.z * u_fudgeFactor; // 透射

            ${useLight ? 
                'gl_Position = u_worldViewProjection * a_position;' : // 和投射冲突了 TODO
                'gl_Position = vec4(position.xy / zToDivideBy, position.zw);'}

            // gl_Position = u_worldViewProjection * vec4(position.xy / zToDivideBy, position.zw);

            ${type === 0 ? 
                'v_color = a_color;' :
                'v_texcoord = a_texcoord;'}

                ${useLight && `
                    v_normal = mat3(u_worldInverseTranspose) * a_normal;
                ` || ''}
        }
    `;

    return shaderString;
};

const shaderFragmentFactory = function (type, useLight) {
    let shaderString = `
        precision mediump float;

        ${type === 0 ? 
            'varying vec4 v_color;' :
            'varying vec2 v_texcoord;'}

        uniform sampler2D u_texture;

        ${useLight && `
            varying vec3 v_normal;
            uniform vec3 u_reverseLightDirection;
        ` || ''}

        void main() {
            ${useLight && `
                vec3 normal = normalize(v_normal);
                float light = dot(normal, u_reverseLightDirection);
            ` || ''}

            ${type === 0 ? 
                'gl_FragColor = v_color;' :
                'gl_FragColor = texture2D(u_texture, v_texcoord);'}

            ${useLight && `
                light += 2.0;
                light *= 0.5;
                gl_FragColor.rgb *= light;
            ` || ''}
        }
    `;

    return shaderString;
};

module.exports = {
    shaderVertexFactory,
    shaderFragmentFactory,
    factory: function (gl, type) {
        return type === gl.FRAGMENT_SHADER ? shaderFragmentFactory : shaderVertexFactory;
    }
};
