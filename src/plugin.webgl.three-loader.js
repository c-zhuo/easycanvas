/** ********** *
 *
 * Support threejs loaders
 * - Based on some modules in threejs.
 *
 * ********** **/

// import { FileLoader } from './plugin-webgl/threeLoaders/FileLoader.js';
import MMDLoader from './plugin-webgl/threeLoaders/MMDLoader.js';
import FBXLoader from './plugin-webgl/threeLoaders/FBXLoader.js';
import DDSLoader from './plugin-webgl/threeLoaders/DDSLoader.js';

const inBrowser = typeof window !== 'undefined';

const loaders = {
    // FileLoader,
    MMDLoader,
    FBXLoader: function (url, onLoad, onProgress, onError) {
        let loader = new FBXLoader();
        loader.load(url, (data) => {
            for (var i in data.Objects.Geometry) {
                var item = data.Objects.Geometry[i];

                item.PolygonVertexIndex.a = item.PolygonVertexIndex.a.map((number, index) => {
                    if (number < 0) return -number - 1;
                    return number;
                });
            }

            onLoad(data);
        }, onProgress, onError);
    },
    DDSLoader,
};

const plugin = {
    onCreate: function (option) {
        if (this.$isWebgl) {
            const gl = this.$gl;

            this.ddsLoader = function (url, callback) {
                if (!url) return;

                var tex = gl.createTexture();

                var ext = (
                  gl.getExtension('WEBGL_compressed_texture_s3tc') ||
                  gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
                  gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc')
                );

                var textureInfo = {
                    width: 0,
                    height: 0,
                };

                var DDSloader = new DDSLoader();

                DDSloader.load(
                    url,
                    function (map) {
                        gl.bindTexture(gl.TEXTURE_2D, tex);
                        gl.compressedTexImage2D(gl.TEXTURE_2D, 0, map.format, map.image.width, map.image.height, 0, map.mipmaps[0].data); 
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                        textureInfo.width = map.image.width;
                        textureInfo.height = map.image.height;
                        textureInfo.texture = tex;

                        callback && callback(map);
                    },
                    null,
                    null
                );

                return textureInfo;
            }
        }
    }
};

// fileloader usage
// var f = new Easycanvas.threeLoaders.FileLoader();
// f.load('../resource/fbxdds/mx.fbx', function (object) {
//     console.log(object); // unreadable
// }, console.log, console.warn);

if (inBrowser && window.Easycanvas) {
    Easycanvas.loaders = loaders;
    Easycanvas.use(plugin);
} else {
    module.exports = loaders;
}
