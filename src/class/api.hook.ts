/** ********** *
 *
 * Remove current hook
 *
 * ********** **/

import utils from 'utils/utils.js';

export const off = function (this: sprite ,event: string, func) {
    if (!this.hooks[event]) return;

    if (this.hooks[event] === func || this.hooks[event].$handle === func || !func) {
        delete this.hooks[event];
    } else if (utils.isArray(this.hooks[event])) {
    	if (this.hooks[event].indexOf(func) >= 0) {
    		this.hooks[event][this.hooks[event].indexOf(func)] = undefined;
    	} else if (this.hooks[event].indexOf(func.$handle) >= 0) {
       	 	this.hooks[event][this.hooks[event].indexOf(func.$handle)] = undefined;
    	}
    }
};

export const on = function (name, func, throttle) {
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

    if (!this.hooks[name]) {
        this.hooks[name] = handle;
    } else if (utils.isArray(this.hooks[name])) {
        this.hooks[name].push(handle);
    } else {
        this.hooks[name] = [this.hooks[name], handle];
    }
};

export const trigger = function () {
    let arg = Array.prototype.slice.call(arguments);
    let name = arg.shift();

    if (this.hooks[name]) {
        return utils.execFuncs(this.hooks[name], this, arg);
        // this.hooks[name].apply(this, arg);
    }
};

export const distribute = function () {
    let arg = Array.prototype.slice.call(arguments);
    let name = arg.shift();

    arg.unshift(name);

    // let children = this.$combine ? this.$combine.children : this.children;
    let children = this.children;

    children && children.forEach((child) => {
        child.broadcast.apply(child, arg);
    });
};

export const broadcast = function () {
    let arg = Array.prototype.slice.call(arguments);
    let name = arg.shift();

    if (this.hooks[name]) {
        utils.execFuncs(this.hooks[name], this, arg);
        // this.hooks[name].apply(this, arg);
    }

    arg.unshift(name);

    // let children = this.$combine ? this.$combine.children : this.children;
    let children = this.children;

    children && children.forEach((child) => {
        child.broadcast.apply(child, arg);
    });
};
