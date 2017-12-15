/** ********** *
 *
 * Start rAF loop
 * - Cannot called twice on same instance
 *
 * ********** **/

module.exports = function () {
	this.fpsCalculateTime = new Date().getTime();
    this.$rAFer(this.paint.bind(this));
};
