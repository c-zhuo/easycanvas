/** ********** *
 *
 * Trigger event only once on next painting-tick
 * - Removed after triggering.
 *
 * ********** **/

module.exports = function (func) {
	let _func = function () {
	    func.apply(this, arguments);
	    this.off('nextTick', _func);
	}
	this.on('nextTick', _func.bind(this));
};
