/** ********** *
 *
 * Set fps handler
 * - Same to new Easycanvas.painter().fpsHandler = callback
 *
 * ********** **/

module.exports = function (callback) {
    this.fpsHandler = callback;
};
