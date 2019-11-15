import shaderVertexFactory from './webgl-shaders-vertexFactory';
import shaderVertexFinal from './webgl-shaders-vertexFinal';
import shaderFragmentFactory from './webgl-shaders-fragmentFactory';
import shaderFragmentFinal from './webgl-shaders-fragmentFinal';

export default {
    factory: function (gl, type) {
        return type === gl.FRAGMENT_SHADER ? shaderFragmentFactory : shaderVertexFactory;
    },
    final: function (gl, type) {
        return type === gl.FRAGMENT_SHADER ? shaderFragmentFinal : shaderVertexFinal;
    },
};
