/** ********** *
 *
 * Add current hook
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function (name, func, debounce) {
    var handle = func;

    if (debounce) {
        func.$lastTriggerTime = -1;

        handle = function () {
            let now = Date.now();

            if (now > func.$lastTriggerTime + debounce) {
                func.$lastTriggerTime = now;
                let args = Array.prototype.slice.call(arguments);
                args.shift();
                func.apply(this, args);
            }
        };
    }

    if (!this.hooks[name]) {
        this.hooks[name] = handle;
    } else if (utils.isArray(this.hooks[name])) {
        this.hooks[name].push(handle);
    } else {
        this.hooks[name] = [this.hooks[name], handle];
    }
};
