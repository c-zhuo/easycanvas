/** ********** *
 *
 * RichText
 * - Actually it is a image.
 *
 * ********** **/

import browserRegister from './_browserRegister.js';
import text2image from './_text2image.js';

const defaultStyle = {
    padding: 0,
    width: 300,
    lineHeight: 100,
    family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

const setImage = function ($sprite) {
    $sprite.content.img = $sprite.text ? text2image($sprite.text, Object.assign({}, defaultStyle, {
        lineHeight: $sprite.style.fontSize,
        textAlign: 'left',
    }, $sprite.style)) : undefined;
};

const component = function (opt, Easycanvas) {
    let $sprite;
    opt.name = opt.name || 'Text';

    $sprite = new Easycanvas.Sprite(opt);
    // $sprite.content.text = opt.text;

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
};

browserRegister(component, 'RichText');

export default component;
