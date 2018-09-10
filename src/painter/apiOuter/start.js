/** ********** *
 *
 * Start rAF loop
 * - Cannot called twice on same instance
 *
 * ********** **/

module.exports = function () {
    this.fpsCalculateTime = Date.now();
    this.$rAFer(this.paint.bind(this));

    setInterval(() => {
        if (this.eHoldingFlag) {
            let $e = this.eHoldingFlag;
            $e.type = 'hold';

            this.$eventHandler.call(this, null, $e);
        }
    }, 40); // TODO

    return this;
};
