/** ********** *
 *
 * Stop painting in paint function.
 *
 * ********** **/

module.exports = function (val) {
    this.$pausing = val === undefined ? true : val;
};
