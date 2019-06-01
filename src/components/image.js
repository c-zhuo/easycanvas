/** ********** *
 *
 * Image
 *
 * ********** **/

import browserRegister from './browserRegister.js';

const component = function (Sprite, opt) {
    let $sprite;

    let option = opt || {};
    option.name = option.name || 'Image';

    $sprite = new Sprite(option);
    $sprite.content.img = option.src;

    Object.defineProperty($sprite, 'src', {
        get () {
            return $sprite.content.img ? $sprite.content.img.src : '';
        },

        set (value) {
            $sprite.content.img = value;
        },
    });

    // $sprite.update = function (obj) {
    //     this.__proto__.update.call(this, obj);
    // };

    return $sprite;
}

// const init = function (Easycanvas, namespace) {
//     ec = Easycanvas;
//     if (namespace) {
//         Easycanvas.class[namespace] = component;
//     }
//     return component;
// };

browserRegister(component, 'image');

export default component;
