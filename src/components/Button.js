/** ********** *
 *
 * Button
 * - TODO: Toggle state.
 *
 * ********** **/

import text2image from './_text2image.js';
import browserRegister from './_browserRegister.js';

const defaultStyle = {
    padding: 0,
    width: 300,
    family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

const setStyle = function (buttonStyle, config) {
    buttonStyle.buttonStyleNormal = Object.assign(defaultStyle, {
        minWidth: config.style.width,
        lineHeight: config.style.height,
        padding: 0,
    }, config.normal);
    buttonStyle.buttonStyleHovered = Object.assign({},
        buttonStyle.buttonStyleNormal, config.hovered);
    buttonStyle.buttonStylePressed = Object.assign({},
        buttonStyle.buttonStyleNormal, config.pressed);
    // const buttonStyleToggled = Object.assign({}, buttonStyleNormal, opt.toggled);

    buttonStyle.imageNormal = text2image(config.text || '', buttonStyle.buttonStyleNormal);
    buttonStyle.imageHovered = config.hovered && text2image(config.text || '', buttonStyle.buttonStyleHovered);
    buttonStyle.imagePressed = config.pressed && text2image(config.text || '', buttonStyle.buttonStylePressed);
    // const imageToggled = text2image(opt.text || '', buttonStyleToggled);
};

const component = function (opt, Easycanvas) {
    let $sprite;

    const buttonStyle = {
        buttonStyleNormal: undefined,
        buttonStyleHovered: undefined,
        buttonStylePressed: undefined,
        imageNormal: undefined,
        imageHovered: undefined,
        imagePressed: undefined,
    };

    setStyle(buttonStyle, opt);

    const events = {};
    opt.events = opt.events || {};
    events.touchmove = events.mousemove = () => {
        $sprite.content.img = buttonStyle.imageHovered || buttonStyle.imageNormal;
    };
    events.touchstart = events.mousedown = () => {
        $sprite.content.img = buttonStyle.imagePressed || buttonStyle.imageHovered || buttonStyle.imageNormal;
    };
    events.touchend = events.touchout = events.mouseout = () => {
        $sprite.content.img = buttonStyle.imageNormal;
    };
    events.mouseup = () => {
        $sprite.content.img = buttonStyle.imageHovered || buttonStyle.imageNormal;
    };
    events.click = (e) => {
        opt.events.click && opt.events.click.call($sprite, e);
    };

    $sprite = new Easycanvas.Sprite({
        name: opt.name || ('Button_' + opt.text),
        content: {
            img: buttonStyle.imageNormal,
        },
        style: opt.style,
        events: events,
        hooks: opt.hooks,
    });

    // $sprite.on('ticked', () => {
    //     if (ec.utils.funcOrValue($sprite.toggled, $sprite)) {
    //         $sprite.content.img = imageToggled;
    //     } else {
    //         $sprite.content.img = imageNormal;
    //     }
    // });

    $sprite.update = function (obj) {
        this.__proto__.update.call(this, obj);
        setStyle(buttonStyle, this);
        $sprite.content.img = buttonStyle.imageNormal;
    };

    return $sprite;
};

browserRegister(component, 'Button');

export default component;
