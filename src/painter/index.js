/** ********** *
 *
 * Exports an Easycanvas Prototype
 * - Merge apis to its prototypes.
 *
 * ********** **/

import apiOuter from './apiOuter.js';
import apiInner from './apiInner.js';

let painter = function () {};

for (let i in apiInner) {
    if (Object.prototype.hasOwnProperty.call(apiInner, i)) {
        painter.prototype[i] = apiInner[i];
    }
}

for (let i in apiOuter) {
    if (Object.prototype.hasOwnProperty.call(apiOuter, i)) {
        painter.prototype[i] = apiOuter[i];
    }
}

module.exports = painter;
