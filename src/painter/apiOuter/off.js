/** ********** *
 *
 * Remove current hook
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function (event, func) {
    if (!this.hooks[event]) return;

    if (this.hooks[event] === func || !func) {
        delete this.hooks[event];
    } else if (utils.isArray(this.hooks[event])) {
        this.hooks[event][this.hooks[event].indexOf(func)] = undefined;
    }
};