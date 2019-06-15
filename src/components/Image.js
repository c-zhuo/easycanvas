/** ********** *
 *
 * Image
 *
 * ********** **/

import browserRegister from './_browserRegister.js';

const component = function (opt, Easycanvas) {
    let $sprite;

    let option = opt || {};
    option.name = option.name || 'Image';

    $sprite = new Easycanvas.Sprite(option);
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
};

browserRegister(component, 'Image');

export default component;
