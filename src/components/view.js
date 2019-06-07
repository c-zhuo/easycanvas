/** ********** *
 *
 * Image
 *
 * ********** **/

import browserRegister from './_browserRegister.js';

const component = function (opt, Easycanvas) {
    let $sprite;

    let option = opt || {};
    option.name = option.name || 'View';

    $sprite = new Easycanvas.Sprite(option);

    return $sprite;
}

browserRegister(component, 'View');

export default component;
