/** ********** *
 *
 * Trigger event on current sprite and its children
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

    arg.unshift(name);

    // let children = this.$combine ? this.$combine.children : this.children;
    let children = this.children;

    children && children.forEach((child) => {
        child.broadcast.apply(child, arg);
    });
};
