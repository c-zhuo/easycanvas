/** ********** *
 *
 * Mock THREE Object
 * - Based on and modified from threejs.
 *
 * ********** **/

import { FileLoader } from './FileLoader.js';
import { LoaderUtils } from './LoaderUtils.js';
import { Interpolant } from './Interpolant.js';
import { CompressedTextureLoader } from './CompressedTextureLoader.js';

module.exports = {
    FileLoader,
    LoaderUtils,
    Interpolant,
    CompressedTextureLoader,

    RGB_S3TC_DXT1_Format: 33776,
    RGBA_S3TC_DXT1_Format: 33777,
    RGBA_S3TC_DXT3_Format: 33778,
    RGBA_S3TC_DXT5_Format: 33779,
};
