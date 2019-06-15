/** ********** *
 *
 * Remove current event
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function (event, func) {
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