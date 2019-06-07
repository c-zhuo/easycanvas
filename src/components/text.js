/** ********** *
 *
 * Text
 * - TODO.
 *
 * ********** **/

import browserRegister from './_browserRegister.js';

const component = function (opt, Easycanvas) {
    let $sprite;

    let option = opt || {};
    option.name = option.name || 'Text';

    option.content = option.content || {};
    option.content.text = option.text;

    $sprite = new Easycanvas.Sprite(option);

    Object.defineProperty($sprite, 'text', {
        get () {
            return $sprite.content.text || '';
        },

        set (value) {
            $sprite.content.text = value;
        },
    });

    // $sprite.update = function (obj) {
    //     this.__proto__.update.call(this, obj);
    // };

    return $sprite;
}

browserRegister(component, 'Text');

export default component;
