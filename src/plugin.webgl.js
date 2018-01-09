/** ********** *
 *
 * Support webgl rendering
 * - Usage: set {webgl: true} in config on registering your canvas instance.
 *
 * ********** **/

import webglUtils from 'lib/webgl-utils.js';
import m4 from 'lib/m4.js';

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

window.m4 = m4();
window.webglUtils = webglUtils();
