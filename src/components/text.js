/** ********** *
 *
 * Text
 * - TODO.
 *
 * ********** **/

import text2image from './text-text2image.js';
import browserRegister from './browserRegister.js';

const defaultStyle = {
    padding: 0,
    width: 300,
    lineHeight: 100,
    family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

const setImage = function ($sprite) {
    $sprite.content.img = $sprite.text ? text2image($sprite.text, Object.assign({}, defaultStyle, {
        lineHeight: $sprite.style.fontSize,
    }, $sprite.style)) : undefined;
};

const component = function (Sprite, config) {
    let $sprite;
    config.name = config.name || 'Text';

    $sprite = new Sprite(config);
    // $sprite.content.text = config.text;

    setImage($sprite);

    Object.defineProperty($sprite, 'text', {
        get () {
            return $sprite.content.text;
        },

        set (value) {
            $sprite.content.img = text;
        },
    });

    $sprite.update = function (obj) {
        this.__proto__.update.call(this, obj);
        setImage(this);
    };

    return $sprite;
}

// const init = function (Easycanvas, namespace) {
//     ec = Easycanvas;
//     if (namespace) {
//         Easycanvas.class[namespace] = component;
//     }
//     return component;
// };

browserRegister(component, 'text');

export default component;
