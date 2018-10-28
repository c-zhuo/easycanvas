/** ********** *
 *
 * Send children to be painted
 * - Children will be rendered above the parent, if zIndex >= 0
 * - Even the same zIndex, chilren will be render in differrent orders
 *   in different environments, like Chrome and PhantomJs.
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function ($canvas, children, part) {
    children.filter(function (item) {
        let zIndex = utils.funcOrValue(item.style.zIndex, item);
        if (part < 0) {
            return zIndex < 0;
        }
        return zIndex >= 0;
    }).sort(function (a, b) {
        let za = utils.funcOrValue(a.style.zIndex, a);
        let zb = utils.funcOrValue(b.style.zIndex, b);
        if (za === zb) return 0;
        return za > zb ? 1 : -1;
    }).forEach(function (c, _index) {
        $canvas.$perPaint.call($canvas, c, _index);
    });
};
