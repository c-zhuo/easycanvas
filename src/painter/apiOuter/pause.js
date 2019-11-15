/** ********** *
 *
 * Stop painting in paint function.
 *
 * ********** **/

export default function (val) {
    this.$pausing = val === undefined ? true : val;
};
