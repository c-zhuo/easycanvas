// @primitive: 0-points
export default function (type, useLight, primitive) {
    let shaderString = `
        precision mediump float;

        ${
            [
                'varying vec4 v_color;',
                'varying vec2 v_texcoord;'
            ][type] || ''
        }

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

            ${
                [
                    'gl_FragColor = v_color;',
                    'gl_FragColor = texture2D(u_texture, v_texcoord);'
                ][type] || ''
            }

            ${primitive === 0 && `
                float dist = distance( gl_PointCoord, vec2(0.5) );
                float alpha = 1.0 - smoothstep(0.1,0.5,dist);
                // float alpha = 1.0 - smoothstep(0.45,0.5,dist);
                gl_FragColor.a *= alpha;
            ` || ''}

            ${useLight && `
                light += 2.0;
                light *= 0.5;
                gl_FragColor.rgb *= light;
            ` || ''}
        }
    `;

    return shaderString;
};
