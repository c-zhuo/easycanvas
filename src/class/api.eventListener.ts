/** ********** *
 *
 * Add current event
 *
 * ********** **/

import utils from 'utils/utils.js';

export const addEventListener = function (name, func, throttle) {
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

export const removeEventListener = function (event, func) {
    if (!this.events[event]) return;

    if (this.events[event] === func || this.events[event].$handle === func || !func) {
        delete this.events[event];
    } else if (utils.isArray(this.events[event])) {
    	if (this.events[event].indexOf(func) >= 0) {
    		this.events[event][this.events[event].indexOf(func)] = undefined;
    	} else if (this.events[event].indexOf(func.$handle) >= 0) {
       	 	this.events[event][this.events[event].indexOf(func.$handle)] = undefined;
    	}
    }
};
