/** ********** *
 *
 * Support three loaders
 * - ...
 *
 * ********** **/

import { FileLoader } from './plugin-webgl/threeLoaders/FileLoader.js';
import MMDLoader from './plugin-webgl/threeLoaders/MMDLoader.js';

const inBrowser = typeof window !== 'undefined';

const loaders = {
	FileLoader,
	MMDLoader,
};

if (inBrowser && window.Easycanvas) {
    Easycanvas.threeLoaders = loaders;
} else {
    module.exports = loaders;
}
