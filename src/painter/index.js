/** ********** *
 *
 * Exports an Easycanvas Prototype
 * - Merge apis to its prototypes.
 *
 * ********** **/

import apiOuter from './apiOuter.js';
import apiInner from './apiInner.js';

import $prototype from './prototype.js';

let painter = function (config) {
    this.imgLoader = Easycanvas.imgLoader;

    for (let i in $prototype) {
        // Avoid muti instances from sharing data
        this[i] = this[i] || JSON.parse(JSON.stringify($prototype[i]));
    }


    if (!config) {
        return;
    }

    if (!config.el) {
        config = {
            el: config,
        };
    }

    if (config.el) {
        this.register(
            typeof config.el === 'string' ?
                document.querySelector(config.el) : config.el,
            config
        );
    }
};

painter.prototype.$extendList = [];

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
