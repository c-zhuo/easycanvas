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
            let e = this.eHoldingFlag;
            this.$eventHandler.call(this, {
                layerX: e.layerX,
                layerY: e.layerY,
                screenX: e.screenX || e.layerX,
                screenY: e.screenY || e.layerY,
                type: 'hold',
            });
        }
    }, 40); // TODO
};
