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

    if (option.children && option.children.length === 1) {
        if (process.env.NODE_ENV !== 'production') {
            if (option.content.text) {
                console.error(`[Easycanvas] Text Component can not has both content.text and children`, opt);
            }
        }

        option.content.text = option.children[0];
        option.children = undefined;
    }

    $sprite = new Easycanvas.Sprite(option);

    const textProperty = {
        get () {
            return $sprite.content.text || '';
        },

        set (value) {
            $sprite.content.text = value;
        },
    };

    Object.defineProperty($sprite, 'text', textProperty);

    // $sprite.update = function (obj) {
    //     this.__proto__.update.call(this, obj);
    // };

    return $sprite;
};

browserRegister(component, 'Text');

export default component;
