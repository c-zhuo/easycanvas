/** ********** *
 *
 * Add current hook
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function (event, func) {
	if (!this.hooks[event]) {
		this.hooks[event] = func;
	} else if (utils.isArray(this.hooks[event])) {
		this.hooks[event].push(func);
	} else {
		this.hooks[event] = [this.hooks[event], func];
	}
};
