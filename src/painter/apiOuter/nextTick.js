/** ********** *
 *
 * Trigger event only once on next painting-tick
 * - Removed after triggering.
 *
 * ********** **/

export default function (func) {
    let _func = function () {
        func.apply(this, arguments);
        this.off('ticked', _func);
    }

    this.on('ticked', _func);
};
