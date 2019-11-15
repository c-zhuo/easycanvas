import constants from '../constants';

import Painter from './painter/index.js';
import tick from 'utils/tick.js';
// import mirror from 'utils/mirror.js';
import utils from 'utils/utils.js';
import Transition from 'utils/transition.js';
import ImgLoader from 'utils/img-loader.js';
import ImgPretreat from 'utils/img-pretreat.js';
import sprite from './class/sprite';
import extend from './class/extend.js';

import './bridge/chrome-devtool.js';

interface TEasycanvas {
    use: typeof use
    Painter: typeof Painter
    ImgLoader: typeof ImgLoader
    ImgPretreat: typeof ImgPretreat
    Transition: typeof Transition
    tick: typeof tick
    utils: typeof utils
    extend: typeof extend
    class: {
        sprite: typeof sprite
    }
    sprite: typeof sprite
    Sprite: typeof sprite
    // for JSX
    createElement: Function
}

declare global {
    interface Window {
        Easycanvas?: TEasycanvas
    }
}

// const $version = constants.version;

const Sprite = sprite;

const use = function (pluginHook) {
    let $extendList = Easycanvas.Painter.prototype.$extendList;

    if ($extendList.indexOf(pluginHook) >= 0) return;

    if (pluginHook.onUse) {
        pluginHook.onUse(Easycanvas);
    }

    $extendList.push(pluginHook);
};

const Easycanvas: TEasycanvas = {
    Painter,
    ImgLoader,
    ImgPretreat,
    Transition,
    tick,
    use,
    utils,
    extend,
    // mirror,
    // 兼容老版本写法“new Easycanvas.class.sprite(opt);”
    class: {
        sprite: sprite,
    },
    sprite,
    Sprite,
    // for JSX
    createElement: (Component, props, ...children): typeof sprite => {
        var _props = props || {};
        _props.children = children || [];
        return new Component(_props, Easycanvas);
    },
};

const inBrowser = typeof window !== 'undefined';

if (inBrowser) {
// if (process.env.UMD === 'true') {
    if (window.Easycanvas) {
        console.warn('[Easycanvas] already loaded, it should be loaded only once.');
    } else {
        if (process.env.NODE_ENV !== 'production') {
            setTimeout(() => {
                console.log(`%c Easycanvas %c You are using the develop version ${constants.version} %c`,
                    "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff",
                    "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff",
                    "background:transparent");
            }, 500);
        }
        window.Easycanvas = Easycanvas;
    }
}

export default Easycanvas;

export {
    Painter,
    ImgLoader,
    ImgPretreat,
    Transition,
    tick,
    utils,
    extend,
    Sprite,
};
