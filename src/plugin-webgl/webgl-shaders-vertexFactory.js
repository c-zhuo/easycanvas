// @type: 0-color 1-textcoord
// @primitive: 0-points
module.exports = function (type, useLight, primitive) {
    let shaderString = `
        precision mediump float;
        attribute vec4 a_position;
        ${
            [
                'attribute vec4 a_color;',
                'attribute vec2 a_texcoord;',
            ][type] || ''
        }

        ${primitive === 0 && `
            attribute float u_size; // 点精灵大小
        ` || ''}

        ${useLight && `
            attribute vec3 a_normal;
            uniform mat4 u_worldViewProjection;
            uniform mat4 u_worldInverseTranspose;
        ` || ''}

        uniform float u_fudgeFactor; // 透射

        uniform mat4 u_matrix;

        ${
            [
                'varying vec4 v_color;',
                'varying vec2 v_texcoord;',
            ][type] || ''
        }

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

            ${
                [
                    'v_color = a_color;',
                    'v_texcoord = a_texcoord;',
                ][type] || ''
            }

            ${primitive === 0 && `
                gl_PointSize = u_size;
            ` || ''}

            ${useLight && `
                v_normal = mat3(u_worldInverseTranspose) * a_normal;
            ` || ''}
        }
    `;

    return shaderString;
};
