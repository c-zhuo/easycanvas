/** ********** *
 *
 * Remove current hook
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function (event, func) {
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