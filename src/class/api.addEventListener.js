/** ********** *
 *
 * Add current event
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function (name, func, throttle) {
    var handle = func;

    if (throttle) {
        var that = this;
        handle = function () {
            let now = Date.now();

            if (now > handle.$lastTriggerTime + throttle) {
                handle.$lastTriggerTime = now;
                let args = Array.prototype.slice.call(arguments);
                func.apply(that, args);
            }
        };
        handle.$lastTriggerTime = -1;
        handle.$handle = func;
    }

    if (!this.events[name]) {
        this.events[name] = handle;
    } else if (utils.isArray(this.events[name])) {
        this.events[name].push(handle);
    } else {
        this.events[name] = [this.events[name], handle];
    }
};
