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
    height: 100,
    family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

let ec;

const component = function (opt) {
    let $sprite;

    let option = opt || {};

    $sprite = new ec.class.sprite({
        name: opt.name || 'text',
        content: {
            img: text2image(opt.content.text, Object.assign({}, defaultStyle, {
                lineHeight: opt.props.size,
            }, opt.props)),
        },
        style: opt.style,
        events: opt.events,
        hooks: opt.hooks,
    });

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
