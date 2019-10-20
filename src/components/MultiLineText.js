/** ********** *
 *
 * MultiLineText
 * - Actually it is a image.
 *
 * ********** **/

import browserRegister from './_browserRegister.js';
import text2image from './_text2image.js';

const defaultStyle = {
    padding: 0,
    width: 300,
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

const setImage = function ($sprite, text) {
    $sprite.content.img = $sprite.text ? text2image(text, Object.assign({}, defaultStyle, {
        lineHeight: $sprite.style.fontSize,
        textAlign: 'left',
    }, $sprite.style)) : undefined;

    $sprite.style.width = $sprite.content.img.width;
    $sprite.style.height = $sprite.content.img.height;
};

const component = function (opt, Easycanvas) {
    let $sprite;
    opt.name = opt.name || 'Text';

    $sprite = new Easycanvas.Sprite(opt);
    // $sprite.content.text = opt.text;

    setImage($sprite, $sprite.opt.text || '');

    let selfText;

    Object.defineProperty($sprite, 'text', {
        get () {
            return selfText;
        },

        set (text) {
            selfText = text;
            setImage($sprite, text);
        },
    });

    $sprite.update = function (obj) {
        this.__proto__.update.call(this, obj);
        setImage(this, selfText);
    };

    return $sprite;
};

browserRegister(component, 'MultiLineText');

export default component;
