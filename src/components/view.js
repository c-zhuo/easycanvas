/** ********** *
 *
 * Image
 *
 * ********** **/

import browserRegister from './browserRegister.js';

const component = function (Sprite, opt) {
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

browserRegister(component, 'view');

export default component;
