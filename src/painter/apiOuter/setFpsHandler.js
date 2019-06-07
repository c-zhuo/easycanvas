/** ********** *
 *
 * Set fps handler
 * - Same to new Easycanvas.Painter().fpsHandler = callback
 *
 * ********** **/

module.exports = function (callback) {
    this.fpsHandler = callback;
};
