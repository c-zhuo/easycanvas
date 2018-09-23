/** ********** *
 *
 * Button
 * - TODO: Toggle state.
 *
 * ********** **/

import text2image from './text2image.js';

const inBrowser = typeof window !== 'undefined';

const defaultStyle = {
    padding: 0,
    width: 300,
    family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

let ec;

const component = function (opt) {
    let $sprite;

    let option = opt || {};
    opt.props = opt.props || {};

    const buttonStyleNormal = Object.assign(defaultStyle, {
        minWidth: opt.style.tw,
        lineHeight: opt.style.th,
        padding: 0,
    }, opt.props.normal);
    const buttonStyleHovered = Object.assign({}, buttonStyleNormal, opt.props.hovered);
    const buttonStylePressed = Object.assign({}, buttonStyleNormal, opt.props.pressed);
    // const buttonStyleToggled = Object.assign({}, buttonStyleNormal, opt.props.toggled);

    const imageNormal = text2image(opt.props.text || '', buttonStyleNormal);
    const imageHovered = opt.props.hovered && text2image(opt.props.text || '', buttonStyleHovered);
    const imagePressed = opt.props.pressed && text2image(opt.props.text || '', buttonStylePressed);
    // const imageToggled = text2image(opt.props.text || '', buttonStyleToggled);

    const events = {};
    opt.events = opt.events || {};
    events.touchmove = events.mousemove = () => {
        $sprite.content.img = imageHovered || imageNormal;
    };
    events.touchstart = events.mousedown = () => {
        $sprite.content.img = imagePressed || imageHovered || imageNormal;
    };
    events.touchend = events.touchout = events.mouseout = () => {
        $sprite.content.img = imageNormal;
    };
    events.mouseup = () => {
        $sprite.content.img = imageHovered || imageNormal;
    };
    events.click = (e) => {
        opt.events.click && opt.events.click.call($sprite, e);
    };

    $sprite = new ec.class.sprite({
        name: opt.name || 'button',
        content: {
            img: imageNormal,
        },
        style: opt.style,
        props: opt.props,
        events: events,
        hooks: opt.hooks,
    });

    // $sprite.on('ticked', () => {
    //     if (ec.utils.funcOrValue($sprite.props.toggled, $sprite)) {
    //         $sprite.content.img = imageToggled;
    //     } else {
    //         $sprite.content.img = imageNormal;
    //     }
    // });

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
    Easycanvas.class.button = component;
} else {
    module.exports = init;
}
