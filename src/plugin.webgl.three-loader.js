/** ********** *
 *
 * Support threejs loaders
 * - Based on some modules in threejs.
 *
 * ********** **/

// import { FileLoader } from './plugin-webgl/threeLoaders/FileLoader.js';
import MMDLoader from './plugin-webgl/threeLoaders/MMDLoader.js';
import FBXLoader from './plugin-webgl/threeLoaders/FBXLoader.js';

const inBrowser = typeof window !== 'undefined';

const loaders = {
	// FileLoader,
	MMDLoader,
	FBXLoader,
};

// fileloader usage
// var f = new Easycanvas.threeLoaders.FileLoader();
// f.load('../resource/fbxdds/mx.fbx', function (object) {
//     console.log(object); // unreadable
// }, console.log, console.warn);

if (inBrowser && window.Easycanvas) {
    Easycanvas.threeLoaders = loaders;
} else {
    module.exports = loaders;
}
