/** ********** *
 *
 * Image
 *
 * ********** **/

import Sprite from '../class/sprite.js';

const component = function (opt) {
    let $sprite;

    let option = opt || {};
    option.name = option.name || 'View';

    $sprite = new Sprite(option);

    return $sprite;
}

// const init = function (Easycanvas, namespace) {
//     ec = Easycanvas;
//     if (namespace) {
//         Easycanvas.class[namespace] = component;
//     }
//     return component;
// };

const inBrowser = typeof window !== 'undefined';
if (inBrowser && window.Easycanvas) {
    Easycanvas.class.View = component;
}

module.exports = component;
