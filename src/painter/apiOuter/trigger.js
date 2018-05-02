/** ********** *
 *
 * Trigger event on current sprite without its children
 * - Current sprite first, children following.
 * - Can pass arguments.
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function () {
    let arg = Array.prototype.slice.call(arguments);
    let name = arg.shift();

    if (this.hooks[name]) {
        utils.execFuncs(this.hooks[name], this, arg);
        // this.hooks[name].apply(this, arg);
    }
};
