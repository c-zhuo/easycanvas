/** ********** *
 *
 * Set max fps
 * - @fps -1 means Infinity
 *
 * ********** **/

module.exports = function (fps) {
    this.maxFps = fps || -1;
};
