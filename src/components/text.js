/** ********** *
 *
 * Text
 * - TODO.
 *
 * ********** **/

import text2image from './text2image.js';

const inBrowser = typeof window !== 'undefined';

const defaultStyle = {
    padding: 0,
    width: 300,
    lineHeight: 100,
    family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

let ec;

const setImage = function ($sprite) {
    $sprite.content.img = $sprite.props ? text2image($sprite.props.text, Object.assign({}, defaultStyle, {
        lineHeight: $sprite.props.size,
    }, $sprite.props)) : undefined;
};

const component = function (config) {
    let $sprite;

    $sprite = new ec.class.sprite(config);

    setImage($sprite);

    $sprite.update = function (obj) {
        this.__proto__.update.call(this, obj);
        setImage(this);
    };

    return $sprite;
}

const init = function (Easycanvas, namespace) {
    ec = Easycanvas;
    if (namespace) {
        Easycanvas.class[namespace] = component;
    }
    return component;
};

if (inBrowser && window.Easycanvas) {
    ec = Easycanvas;
    Easycanvas.class.text = component;
} else {
    module.exports = init;
}
